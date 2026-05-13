const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@sanity/client');
const xml2js = require('xml2js');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-04-30',
  token: process.env.SANITY_API_TOKEN,
});

function detectLanguage(url) {
  if (url.endsWith('-en/') || url.includes('-en/')) return 'en';
  if (url.endsWith('-fr/') || url.includes('-fr/')) return 'fr';
  if (url.endsWith('-de/') || url.includes('-de/')) return 'de';
  if (url.endsWith('-it/') || url.includes('-it/')) return 'it';
  return 'ro';
}

function classifyUrl(url) {
  if (url.includes('/noutati/') || url.includes('/news/')) return 'newsArticle';
  if (url.includes('/investitori/')) return 'investorDocument';
  if (url.includes('/produse-servicii/') || url.includes('/divizii/') || url.includes('/products-services/') || url.includes('/produkte-und-dienstleistungen/') || url.includes('/produits-et-services/') || url.includes('/prodotti-e-servizi/')) return 'product';
  return null;
}

async function scrapeEverything() {
  console.log('Fetching sitemap...');
  let sitemapData;
  try {
    const res = await axios.get('https://electroalfa.ro/sitemap.xml');
    sitemapData = res.data;
  } catch (e) {
    console.error('Failed to fetch sitemap:', e.message);
    return;
  }

  const parser = new xml2js.Parser();
  const parsed = await parser.parseStringPromise(sitemapData);
  let urls = parsed.urlset.url.map(u => u.loc[0]);
  
  // Filter for products, news, investors
  let targetUrls = urls.filter(u => classifyUrl(u) !== null);
  
  // Remove duplicates and non-HTML assets
  targetUrls = [...new Set(targetUrls)].filter(u => !u.match(/\.(pdf|jpg|png|gif|zip|doc)$/i));
  
  console.log(`Found ${targetUrls.length} relevant URLs to scrape.`);

  const BATCH_SIZE = 5;
  
  for (let i = 0; i < targetUrls.length; i += BATCH_SIZE) {
    const batch = targetUrls.slice(i, i + BATCH_SIZE);
    console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1} / ${Math.ceil(targetUrls.length/BATCH_SIZE)}`);
    
    await Promise.all(batch.map(async (url) => {
      try {
        const { data } = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(data);
        const lang = detectLanguage(url);
        const type = classifyUrl(url);
        
        const title = $('title').text().split('|')[0].trim() || $('h1').first().text().trim();
        const description = $('meta[name="description"]').attr('content') || '';
        const content = $('div.entry-content').text().trim() || $('p').first().text().trim() || '';

        const basePath = url.replace(/-(en|fr|de|it)\/$/, '/').split('?')[0];
        const urlPath = new URL(basePath).pathname;
        // make sure ID is valid Sanity format (only alphanumeric, dashes, underscores)
        const docId = `migrated-${type}-${Buffer.from(urlPath).toString('base64').substring(0, 15).replace(/[^a-zA-Z0-9_-]/g, '')}`;

        if (type === 'product') {
          let catId = 'cat-medium-voltage';
          if (url.includes('joasa') || title.toLowerCase().includes('joasă')) catId = 'cat-low-voltage';
          else if (url.includes('metalic') || title.toLowerCase().includes('metalic')) catId = 'cat-steel-parts';

          await client.transaction()
            .createIfNotExists({ _id: docId, _type: 'product', slug: { _type: 'slug', current: urlPath.replace(/\//g, '-').replace(/^-|-$/g, '') || 'product' } })
            .patch(docId, p => p.set({
              [`title.${lang}`]: title,
              [`description.${lang}`]: description,
              category: { _type: 'reference', _ref: catId }
            }))
            .commit();
        } 
        else if (type === 'newsArticle') {
          // For news, publishDate is required
          const dateStr = $('time').attr('datetime') || new Date().toISOString();
          const slugStr = urlPath.replace(/\//g, '-').replace(/^-|-$/g, '') || 'news';
          await client.transaction()
            .createIfNotExists({ 
              _id: docId, 
              _type: 'newsArticle', 
              slug: { _type: 'slug', current: slugStr },
              publishDate: dateStr
            })
            .patch(docId, p => p.set({
              [`title.${lang}`]: title,
            }))
            .commit();
        }
        else if (type === 'investorDocument') {
          await client.transaction()
            .createIfNotExists({ _id: docId, _type: 'investorDocument', date: new Date().toISOString() })
            .patch(docId, p => p.set({
              [`title.${lang}`]: title,
              category: 'reports' // default category
            }))
            .commit();
        }

        console.log(`✓ Scraped [${type}] ${lang}: ${title.substring(0, 30)}...`);
      } catch (err) {
        console.error(`✗ Failed ${url}: ${err.message}`);
      }
    }));
    
    // Short delay
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log('--- DONE SCRAPING ---');
}

scrapeEverything().catch(console.error);
