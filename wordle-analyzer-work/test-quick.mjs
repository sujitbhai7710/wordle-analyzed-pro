import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log('Found inputs:', inputs.length);
  await inputs[0].focus(); await inputs[0].fill('CRANE');
  await inputs[1].focus(); await inputs[1].fill('SLOTH');
  await inputs[2].focus(); await inputs[2].fill('SPIRE');
  await inputs[3].focus(); await inputs[3].fill('SHIRE');
  
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  console.log('Clicking analyze...');
  const start = Date.now();
  await analyzeBtn.click();
  await page.waitForTimeout(15000);
  console.log('Analysis took:', Date.now() - start, 'ms');
  
  await page.screenshot({ path: '/home/z/my-project/download/test-improved-1.png', fullPage: true });
  
  const score = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
  console.log('Score:', score);
  const tableHeaders = await page.locator('text=You played').count();
  console.log('Comparison table:', tableHeaders > 0 ? 'YES' : 'NO');
  const strategy = await page.locator('text=/Eliminate likely/').first().textContent().catch(() => 'N/A');
  console.log('Strategy:', strategy);
  const aiSection = await page.locator('text=AI Playthrough').count();
  console.log('AI Playthrough:', aiSection > 0 ? 'YES' : 'NO');
  const commentary = await page.locator('.bg-muted\\/30').count();
  console.log('Commentary boxes:', commentary);
  
  await browser.close();
}
main();
