import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  const url = 'https://3a063161.wordle-analyzer.pages.dev';
  console.log('Testing:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(8000);
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Inputs found:', inputs.length);
  
  if (inputs.length >= 4) {
    // Type test words
    await inputs[0].focus(); await inputs[0].fill('RIGHT');
    await inputs[1].focus(); await inputs[1].fill('SCALE');
    await inputs[2].focus(); await inputs[2].fill('CLICK');
    await inputs[3].focus(); await inputs[3].fill('CLOCK');
    console.log('Typed: RIGHT, SCALE, CLICK, CLOCK');
    
    // Click Analyze
    const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
    await analyzeBtn.click();
    await page.waitForTimeout(15000);
    
    const score = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
    console.log('Score:', score);
    
    const tableHeaders = await page.locator('text=You played').count();
    console.log('Comparison table:', tableHeaders > 0 ? 'YES' : 'NO');
    
    const aiPlaythrough = await page.locator('text=AI Playthrough').count();
    console.log('AI Playthrough:', aiPlaythrough > 0 ? 'YES' : 'NO');
    
    await page.screenshot({ path: '/home/z/my-project/download/live-final-test.png', fullPage: true });
  } else {
    const bodyText = await page.locator('body').textContent().catch(() => '');
    console.log('Body preview:', bodyText.substring(0, 300));
    await page.screenshot({ path: '/home/z/my-project/download/live-debug2.png' });
  }
  
  // Check GA and domain
  const content = await page.content();
  console.log('Google Analytics:', content.includes('G-TMZQS9R3HB') ? 'YES' : 'NO');
  console.log('New domain:', content.includes('wordleanalyzer.dev') ? 'YES' : 'NO');
  
  await browser.close();
}
main();
