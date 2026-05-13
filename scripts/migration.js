const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6sxnslmm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-04-30',
  token: process.env.SANITY_API_TOKEN,
});

// Full Production URL List (29 Verified URLs)
const urlsToCrawl = [
  'https://electroalfa.ro/produse-servicii/sf6-free/',
  'https://electroalfa.ro/produse-servicii/sf6-free/alfa-blue/',
  'https://electroalfa.ro/produse-servicii/sf6-free/alfa-green/',
  'https://electroalfa.ro/produse-servicii/sf6-free/alfa-airset/',
  'https://electroalfa.ro/divizii/echipamente-electrice/',
  'https://electroalfa.ro/divizii/energie-verde/',
  'https://electroalfa.ro/divizii/sheltere-ehouse/',
  'https://electroalfa.ro/divizii/antrepriza/',
  'https://electroalfa.ro/divizii/licitatii-internationale/',
  'https://electroalfa.ro/divizii/masison-dabris/',
  'https://electroalfa.ro/proiecte-realizate/',
  'https://electroalfa.ro/products-services/sf6-free-en/',
  'https://electroalfa.ro/products-services/sf6-free-en/alfa-blue-en/',
  'https://electroalfa.ro/products-services/sf6-free-en/alfa-green-en/',
  'https://electroalfa.ro/products-services/sf6-free-en/airset-en/',
  'https://electroalfa.ro/produits-et-services/sf6-free-fr/',
  'https://electroalfa.ro/produits-et-services/sf6-free-fr/alfa-blue-fr/',
  'https://electroalfa.ro/produits-et-services/sf6-free-fr/alfa-green-fr/',
  'https://electroalfa.ro/produits-et-services/sf6-free-fr/airset-fr/',
  'https://electroalfa.ro/produkte-und-dienstleistungen/sf6-free-de/',
  'https://electroalfa.ro/produkte-und-dienstleistungen/sf6-free-de/alfa-blue-de/',
  'https://electroalfa.ro/produkte-und-dienstleistungen/sf6-free-de/alfa-green-de/',
  'https://electroalfa.ro/produkte-und-dienstleistungen/sf6-free-de/airset-de/',
  'https://electroalfa.ro/prodotti-e-servizi/sf6-free-it/',
  'https://electroalfa.ro/prodotti-e-servizi/sf6-free-it/alfa-blue-it/',
  'https://electroalfa.ro/prodotti-e-servizi/sf6-free-it/alfa-green-it/',
  'https://electroalfa.ro/prodotti-e-servizi/sf6-free-it/airset-it/',
  'https://electroalfa.ro/noutati/electroalfa-sgb-inaugurare/',
  'https://electroalfa.ro/noutati/noua-fabrica-medie-tensiune/'
];

function detectLanguage($, url) {
  // Check URL suffixes first
  if (url.endsWith('-en/') || url.includes('-en/')) return 'en';
  if (url.endsWith('-fr/') || url.includes('-fr/')) return 'fr';
  if (url.endsWith('-de/') || url.includes('-de/')) return 'de';
  if (url.endsWith('-it/') || url.includes('-it/')) return 'it';

  try {
    const urlObj = new URL(url);
    const langParam = urlObj.searchParams.get('language');
    if (langParam) return langParam.toLowerCase();
  } catch(e) {}
  
  let lang = $('html').attr('lang');
  if (lang) {
    lang = lang.split('-')[0].toLowerCase();
    if (['ro', 'en', 'de', 'fr', 'it'].includes(lang)) return lang;
  }
  return 'ro';
}

function parseTechnicalTables($) {
  const specifications = [];
  $('table').each((_, table) => {
    $(table).find('tr').each((_, row) => {
      const cells = $(row).children('td, th');
      if (cells.length >= 2) {
        const label = $(cells[0]).text().trim();
        const value = $(cells[1]).text().trim();
        if (label && value && label.length < 100 && value.length < 500) {
          specifications.push({
            _key: Math.random().toString(36).substring(2, 9),
            label: { ro: label }, // For now, label is stored as RO but used as key
            value: { ro: value }
          });
        }
      }
    });
  });
  return specifications;
}

async function crawlAndMigrate() {
  console.log('--- STARTING FULL PRODUCTION MIGRATION ---');
  console.log(`Targeting ${urlsToCrawl.length} URLs in batches of 10...`);
  
  const logs = { successful: [], failed: [] };
  const BATCH_SIZE = 10;
  
  for (let i = 0; i < urlsToCrawl.length; i += BATCH_SIZE) {
    const batch = urlsToCrawl.slice(i, i + BATCH_SIZE);
    console.log(`\nProcessing Batch ${Math.floor(i / BATCH_SIZE) + 1}...`);
    
    await Promise.all(batch.map(async (url) => {
      let attempts = 0;
      const MAX_ATTEMPTS = 3;
      let success = false;

      while (attempts < MAX_ATTEMPTS && !success) {
        try {
          const { data } = await axios.get(url, { 
            timeout: 20000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          });
          success = true;
          const $ = cheerio.load(data);
          const lang = detectLanguage($, url);
          const title = $('title').text().trim().split('|')[0].trim() || $('h1').first().text().trim();
          const description = $('meta[name="description"]').attr('content') || $('p').first().text().trim() || '';
          
          // Generate a stable ID based on the base path (ignoring lang suffix)
          const basePath = url.replace(/-(en|fr|de|it)\/$/, '/').split('?')[0];
          const urlPath = new URL(basePath).pathname;
          const docId = `migrated-page-${Buffer.from(urlPath).toString('base64').substring(0, 15).replace(/[^a-zA-Z0-9]/g, '')}`;
          
          const specs = parseTechnicalTables($);
          
          let catId = 'cat-medium-voltage';
          if (url.includes('joasa') || title.toLowerCase().includes('joasă')) {
            catId = 'cat-low-voltage';
          } else if (url.includes('metalic') || title.toLowerCase().includes('metalic')) {
            catId = 'cat-steel-parts';
          }

          const mutations = {
            [`title.${lang}`]: title,
            [`description.${lang}`]: description,
            category: {
              _type: 'reference',
              _ref: catId
            },
            image: null,
            datasheet: null,
          };
          
          const document = {
            _id: docId,
            _type: 'product',
          };

          await client.transaction()
            .createIfNotExists(document)
            .patch(docId, p => p.set(mutations))
            .commit();
            
          logs.successful.push({ url, docId, lang });
          console.log(`✓ [${lang.toUpperCase()}] Migrated: ${url}`);
          
        } catch (error) {
          attempts++;
          if (attempts >= MAX_ATTEMPTS) {
            logs.failed.push({ url, error: error.message });
            console.error(`✗ FAILED: ${url} - ${error.message}`);
          } else {
            console.warn(`! Retrying (${attempts}/${MAX_ATTEMPTS}): ${url}`);
            await new Promise(r => setTimeout(r, 2000 * attempts));
          }
        }
      }
    }));
    
    if (i + BATCH_SIZE < urlsToCrawl.length) {
      console.log('Cooling down for 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  fs.writeFileSync('migration-log.json', JSON.stringify(logs, null, 2));
  console.log('\n--- MIGRATION COMPLETE ---');
  console.log(`Successful: ${logs.successful.length}`);
  console.log(`Failed: ${logs.failed.length}`);
  console.log('Validation log saved to migration-log.json');
}

crawlAndMigrate();
