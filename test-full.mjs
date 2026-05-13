import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  
  // Wait for hydration - look for the grid
  await page.waitForSelector('[role="grid"]', { timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Found', inputs.length, 'inputs');
  
  if (inputs.length === 0) {
    console.log('ERROR: No inputs found');
    await browser.close();
    return;
  }
  
  // Type test words
  await inputs[0].focus(); await inputs[0].fill('CRANE');
  await inputs[1].focus(); await inputs[1].fill('SLOTH');
  await inputs[2].focus(); await inputs[2].fill('SPIRE');
  await inputs[3].focus(); await inputs[3].fill('SHIRE');
  console.log('Typed: CRANE, SLOTH, SPIRE, SHIRE');
  
  // Click Analyze
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  console.log('Clicking Analyze...');
  const start = Date.now();
  await analyzeBtn.click();
  await page.waitForSelector('text=/Your play:/', { timeout: 60000 });
  console.log('Analysis took:', Date.now() - start, 'ms');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '/home/z/my-project/download/test-improved-analysis.png', fullPage: true });
  
  // Feature checks
  console.log('\n--- FEATURE CHECK ---');
  const score = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
  console.log('1. Score:', score);
  
  const tableHeaders = await page.locator('text=You played').count();
  console.log('2. Comparison table:', tableHeaders > 0 ? 'YES' : 'NO');
  
  const strategy = await page.locator('text=/Eliminate likely|Take a punt/').first().textContent().catch(() => 'N/A');
  console.log('3. Strategy:', strategy);
  
  const aiSection = await page.locator('text=AI Playthrough').count();
  console.log('4. AI Playthrough:', aiSection > 0 ? 'YES' : 'NO');
  
  const commentary = await page.locator('.bg-muted\\/30').count();
  console.log('5. Commentary boxes:', commentary);
  
  const possibleAnswer = await page.locator('text=Possible answer').count();
  console.log('6. Possible answer check:', possibleAnswer > 0 ? 'YES' : 'NO');
  
  const likelyWord = await page.locator('text=Likely word').count();
  console.log('7. Likely word check:', likelyWord > 0 ? 'YES' : 'NO');
  
  const answerDisplay = await page.locator('text=The answer was').count();
  console.log('8. Answer display:', answerDisplay > 0 ? 'YES' : 'NO');
  
  // Expand AI Playthrough
  await page.locator('text=AI Playthrough').first().click();
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: '/home/z/my-project/download/test-improved-full.png', fullPage: true });
  console.log('\n=== ALL TESTS DONE ===');
  await browser.close();
}
main();
