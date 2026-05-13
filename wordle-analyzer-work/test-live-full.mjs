import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('=== LIVE SITE FULL TEST ===');
  await page.goto('https://wordle-analyzer.pages.dev', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(15000);
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Inputs:', inputs.length);
  
  if (inputs.length < 4) {
    console.log('Not enough inputs');
    await browser.close();
    return;
  }
  
  // Type test words
  await inputs[0].focus(); await inputs[0].fill('RIGHT');
  await inputs[1].focus(); await inputs[1].fill('SCALE');
  await inputs[2].focus(); await inputs[2].fill('CLICK');
  await inputs[3].focus(); await inputs[3].fill('CLOCK');
  console.log('Typed: RIGHT, SCALE, CLICK, CLOCK');
  
  // Click Analyze
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(20000);
  
  // Check results
  const score = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
  console.log('Score:', score);
  
  const comparisonTable = await page.locator('text=You played').count();
  console.log('Comparison table:', comparisonTable > 0 ? 'YES' : 'NO');
  
  const strategy = await page.locator('text=/Eliminate likely|Take a punt/').first().textContent().catch(() => 'N/A');
  console.log('Strategy:', strategy);
  
  const aiPlaythrough = await page.locator('text=AI Playthrough').count();
  console.log('AI Playthrough:', aiPlaythrough > 0 ? 'YES' : 'NO');
  
  const possibleAnswer = await page.locator('text=Possible answer').count();
  console.log('Possible answer:', possibleAnswer > 0 ? 'YES' : 'NO');
  
  const likelyWord = await page.locator('text=Likely word').count();
  console.log('Likely word:', likelyWord > 0 ? 'YES' : 'NO');
  
  const answerDisplay = await page.locator('text=The answer was').count();
  console.log('Answer display:', answerDisplay > 0 ? 'YES' : 'NO');
  
  // Check domain & GA in page source
  const content = await page.content();
  console.log('Google Analytics:', content.includes('G-TMZQS9R3HB') ? 'YES' : 'NO');
  console.log('New domain:', content.includes('wordleanalyzer.dev') ? 'YES' : 'NO');
  
  await page.screenshot({ path: '/home/z/my-project/download/live-final-full.png', fullPage: true });
  
  console.log('\n=== TEST COMPLETE ===');
  await browser.close();
}
main();
