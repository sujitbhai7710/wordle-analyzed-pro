import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('JS Error:', msg.text().substring(0, 200));
  });
  
  console.log('Testing wordle-analyzer.pages.dev...');
  try {
    await page.goto('https://wordle-analyzer.pages.dev', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(15000);
    
    const title = await page.title();
    console.log('Title:', title);
    
    const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
    console.log('Inputs found:', inputs.length);
    
    await page.screenshot({ path: '/home/z/my-project/download/live-test3.png' });
  } catch(e) {
    console.log('Error:', e.message.substring(0, 200));
  }
  
  await browser.close();
}
main();
