const axios = require('axios');

async function testRedirects() {
  const baseUrl = 'http://localhost:3001';
  const testUrls = [
    '/produse-servicii/sf6-free',
    '/en/products/test-product',
    '/investitori/rapoarte-curente'
  ];

  console.log('Testing Redirects...');
  for (const url of testUrls) {
    try {
      const response = await axios.get(baseUrl + url, { 
        maxRedirects: 0,
        validateStatus: (status) => status >= 300 && status < 400
      });
      console.log(`✓ ${url} -> ${response.headers.location} (${response.status})`);
    } catch (error) {
      if (error.response) {
        console.log(`✗ ${url} failed with status ${error.response.status}`);
      } else {
        console.log(`✗ ${url} error: ${error.message}. Is the dev server running?`);
      }
    }
  }
}

testRedirects();
