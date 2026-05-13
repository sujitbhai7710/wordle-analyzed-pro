import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  // Navigate with longer wait
  const response = await page.goto('http://localhost:3000', { timeout: 60000 });
  console.log('Status:', response?.status());
  
  // Wait for JS to execute
  await page.waitForTimeout(8000);
  
  const html = await page.content();
  console.log('HTML length:', html.length);
  console.log('Has __next:', html.includes('__next'));
  console.log('Has grid:', html.includes('grid'));
  console.log('Has input:', html.includes('input'));
  
  // Take screenshot
  await page.screenshot({ path: '/home/z/my-project/download/test-debug-page.png' });
  
  await browser.close();
}
main();
