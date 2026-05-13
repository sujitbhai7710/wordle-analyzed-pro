import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  // Try the specific deployment URL
  const url = 'https://60af1a94.wordle-analyzer.pages.dev';
  console.log('Testing:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(10000);
  
  const content = await page.content();
  console.log('HTML length:', content.length);
  console.log('Has __next:', content.includes('__next'));
  console.log('Has GA:', content.includes('G-TMZQS9R3HB'));
  console.log('Has new domain:', content.includes('wordleanalyzer.dev'));
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Inputs found:', inputs.length);
  
  await page.screenshot({ path: '/home/z/my-project/download/live-deploy.png' });
  
  await browser.close();
}
main();
