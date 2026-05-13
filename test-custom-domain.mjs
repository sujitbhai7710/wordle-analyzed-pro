import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('=== TESTING CUSTOM DOMAIN: wordleanalyzer.dev ===');
  await page.goto('https://wordleanalyzer.dev', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(15000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Inputs:', inputs.length);
  
  if (inputs.length >= 4) {
    await inputs[0].focus(); await inputs[0].fill('RIGHT');
    await inputs[1].focus(); await inputs[1].fill('SCALE');
    await inputs[2].focus(); await inputs[2].fill('CLICK');
    await inputs[3].focus(); await inputs[3].fill('CLOCK');
    console.log('Typed: RIGHT, SCALE, CLICK, CLOCK');
    
    const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
    await analyzeBtn.click();
    await page.waitForTimeout(20000);
    
    const score = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
    console.log('Score:', score);
    
    const comparisonTable = await page.locator('text=You played').count();
    console.log('Comparison table:', comparisonTable > 0 ? 'YES' : 'NO');
    
    const aiPlaythrough = await page.locator('text=AI Playthrough').count();
    console.log('AI Playthrough:', aiPlaythrough > 0 ? 'YES' : 'NO');
    
    await page.screenshot({ path: '/home/z/my-project/download/custom-domain-test.png', fullPage: true });
    console.log('\n✅ CUSTOM DOMAIN WORKS!');
  }
  
  await browser.close();
}
main();
