import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('Navigating...');
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000); // Wait longer for hydration
  
  // Check what's on the page
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check for input elements
  const allInputs = await page.locator('input').count();
  console.log('All input elements:', allInputs);
  
  const textInputs = await page.locator('input[type="text"]').count();
  console.log('Text inputs:', textInputs);
  
  // Try a different selector
  const maxlengthInputs = await page.locator('input[maxlength="5"]').count();
  console.log('Maxlength 5 inputs:', maxlengthInputs);
  
  // Try typing directly on the page
  console.log('Trying keyboard input...');
  await page.click('body');
  await page.waitForTimeout(500);
  
  // Check for the grid
  const grid = await page.locator('[role="grid"]').count();
  console.log('Grid found:', grid);
  
  // Try typing with keyboard directly
  await page.keyboard.type('CRANE');
  await page.waitForTimeout(500);
  
  const buttons = await page.locator('button').count();
  console.log('Buttons found:', buttons);
  
  await page.screenshot({ path: '/home/z/my-project/download/test-debug.png' });
  
  await browser.close();
}
main();
