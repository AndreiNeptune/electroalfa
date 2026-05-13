const { createClient } = require('@sanity/client');
require('dotenv').config({ path: './.env.local' });

async function debugQuery() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2024-04-30',
  });

  const categorySlug = 'medium-voltage';
  
  const p1 = await client.fetch('*[_type == "product" && defined(category)]');
  console.log('Products with any category count:', p1.length);

  const p2 = await client.fetch('*[_type == "product" && category->slug.current == $categorySlug]', { categorySlug });
  console.log('Products for medium-voltage count:', p2.length);

  const c = await client.fetch('*[_type == "category"]');
  console.log('Categories count:', c.length);
}

debugQuery().catch(console.error);
