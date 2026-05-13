import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  const url = 'https://60af1a94.wordle-analyzer.pages.dev';
  console.log('Testing:', url);
  
  // Enable JavaScript console monitoring
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('Console error:', msg.text());
  });
  page.on('pageerror', err => console.log('Page error:', err.message));
  
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(15000); // Extra long wait
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Inputs found:', inputs.length);
  
  // Check what's actually visible
  const gridButtons = await page.locator('button[type="button"]').count();
  console.log('Grid buttons:', gridButtons);
  
  const bodyText = await page.locator('body').textContent().catch(() => '');
  console.log('Body text length:', bodyText.length);
  console.log('Body text preview:', bodyText.substring(0, 200));
  
  await page.screenshot({ path: '/home/z/my-project/download/live-deploy2.png' });
  
  await browser.close();
}
main();
