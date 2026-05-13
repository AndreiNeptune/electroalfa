const { createClient } = require('@sanity/client');
require('dotenv').config({ path: './.env.local' });

async function setupCategoriesAndProducts() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2024-04-30',
    token: process.env.SANITY_API_TOKEN,
  });

  const categories = [
    { _id: 'cat-medium-voltage', _type: 'category', title: 'Medium Voltage', slug: { _type: 'slug', current: 'medium-voltage' } },
    { _id: 'cat-low-voltage', _type: 'category', title: 'Low Voltage', slug: { _type: 'slug', current: 'low-voltage' } },
    { _id: 'cat-steel-parts', _type: 'category', title: 'Steel Parts', slug: { _type: 'slug', current: 'steel-parts' } }
  ];

  console.log('Creating categories...');
  for (const cat of categories) {
    await client.createIfNotExists(cat);
    console.log(`Ensured category: ${cat.title}`);
  }

  console.log('\nFetching products...');
  const products = await client.fetch('*[_type == "product"]{_id, "title": title.ro}');
  
  console.log(`Found ${products.length} products. Updating them...`);
  
  for (const p of products) {
    // Basic heuristic to assign categories
    let catId = 'cat-medium-voltage';
    if (p.title && p.title.toLowerCase().includes('joasa')) {
      catId = 'cat-low-voltage';
    } else if (p.title && p.title.toLowerCase().includes('metalice')) {
      catId = 'cat-steel-parts';
    }

    await client.patch(p._id)
      .set({
        category: {
          _type: 'reference',
          _ref: catId
        }
      })
      .commit();
      
    console.log(`Updated product ${p._id} (${p.title}) -> ${catId}`);
  }

  // Also create a dummy news article so we can see it live
  console.log('\nCreating a dummy news article...');
  await client.createIfNotExists({
    _id: 'dummy-news-1',
    _type: 'newsArticle',
    title: { ro: 'Electroalfa lansează noi produse', en: 'Electroalfa launches new products' },
    slug: { _type: 'slug', current: 'electroalfa-lanseaza-noi-produse' },
    publishDate: new Date().toISOString().split('T')[0],
  });

  console.log('Done!');
}

setupCategoriesAndProducts().catch(console.error);
