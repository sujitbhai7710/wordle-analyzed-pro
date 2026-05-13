import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('=== TESTING LIVE SITE ===');
  await page.goto('https://wordle-analyzer.pages.dev', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000); // Wait for hydration
  
  // Check what's on the page
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Found', inputs.length, 'inputs');
  
  // Check for GA
  const pageContent = await page.content();
  const hasGA = pageContent.includes('G-TMZQS9R3HB');
  console.log('Google Analytics:', hasGA ? 'YES' : 'NO');
  const hasNewDomain = pageContent.includes('wordleanalyzer.dev');
  console.log('New domain:', hasNewDomain ? 'YES' : 'NO');
  
  if (inputs.length < 4) {
    console.log('Not enough inputs - checking page...');
    await page.screenshot({ path: '/home/z/my-project/download/live-debug.png' });
    await browser.close();
    return;
  }
  
  // Type CRANE, SLOTH, SPIRE, SHIRE
  await inputs[0].focus(); await inputs[0].fill('CRANE');
  await inputs[1].focus(); await inputs[1].fill('SLOTH');
  await inputs[2].focus(); await inputs[2].fill('SPIRE');
  await inputs[3].focus(); await inputs[3].fill('SHIRE');
  console.log('Typed: CRANE, SLOTH, SPIRE, SHIRE');
  
  // Click Analyze
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(20000);
  
  await page.screenshot({ path: '/home/z/my-project/download/live-analysis.png', fullPage: true });
  
  const score = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
  console.log('Score:', score);
  const tableHeaders = await page.locator('text=You played').count();
  console.log('Comparison table:', tableHeaders > 0 ? 'YES' : 'NO');
  const strategy = await page.locator('text=/Eliminate likely/').first().textContent().catch(() => 'N/A');
  console.log('Strategy:', strategy);
  const aiSection = await page.locator('text=AI Playthrough').count();
  console.log('AI Playthrough:', aiSection > 0 ? 'YES' : 'NO');
  
  console.log('\n=== LIVE SITE TEST DONE ===');
  await browser.close();
}
main();
