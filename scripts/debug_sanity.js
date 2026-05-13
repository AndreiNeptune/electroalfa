const { createClient } = require('@sanity/client');
require('dotenv').config({ path: './.env.local' });

async function checkSanity() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2024-04-30',
    token: process.env.SANITY_API_TOKEN,
  });

  console.log('--- Categories in Sanity ---');
  const categories = await client.fetch('*[_type == "category"]{title, "slug": slug.current}');
  console.log(JSON.stringify(categories, null, 2));

  console.log('\n--- Products in Sanity ---');
  console.log('\n--- News Articles in Sanity ---');
  const news = await client.fetch('*[_type == "newsArticle"]{title, "slug": slug.current}');
  console.log(JSON.stringify(news, null, 2));

  console.log('\n--- Investor Documents in Sanity ---');
  const investors = await client.fetch('*[_type == "investorDocument"]{title, category}');
  console.log(JSON.stringify(investors, null, 2));
}

checkSanity();
