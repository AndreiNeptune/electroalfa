const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './.env.local' });

async function reconcileData() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: '2024-04-30',
    token: process.env.SANITY_API_TOKEN,
  });

  console.log('--- Data Reconciliation Report ---');
  
  // 1. Read the migration log
  let logData;
  try {
    logData = JSON.parse(fs.readFileSync('./migration-log.json', 'utf8'));
  } catch (e) {
    console.error('Could not find migration-log.json');
    return;
  }

  const successfulCount = logData.successful.length;
  console.log(`Successful entries in log: ${successfulCount}`);

  // 2. Query Sanity for actual document count
  try {
    const sanityCount = await client.fetch('count(*[_type == "product"])');
    console.log(`Documents found in Sanity: ${sanityCount}`);

    if (sanityCount >= successfulCount) {
      console.log('✓ SUCCESS: Sanity count matches or exceeds the migration log.');
      if (sanityCount > successfulCount) {
        console.log(`Note: There are ${sanityCount - successfulCount} extra products in Sanity (possibly from previous runs or manual entries).`);
      }
    } else {
      console.log('⚠ WARNING: Sanity count is LOWER than the successful log count. Some documents might have failed to persist.');
    }
  } catch (error) {
    console.error('Failed to query Sanity:', error.message);
  }
}

reconcileData();
