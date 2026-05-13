import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('Detailed analysis test...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Fill in the grid
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  await inputs[0].focus(); await inputs[0].fill('RIGHT');
  await inputs[1].focus(); await inputs[1].fill('SCALE');
  await inputs[2].focus(); await inputs[2].fill('CLICK');
  await inputs[3].focus(); await inputs[3].fill('CLOCK');

  // Click Analyze
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(5000);

  // Get all guess headers
  const headers = await page.locator('[class*="CardTitle"], h3, div').filter({ hasText: /Guess \d/ }).allTextContents();
  console.log('Guess headers found:', headers.filter(h => h.includes('Guess')).join(' | '));

  // Get the summary text
  const summary = await page.locator('text=/Your play:/').first().textContent().catch(() => 'N/A');
  console.log('Summary:', summary);

  // Check each turn's details
  for (let i = 1; i <= 4; i++) {
    const guessText = await page.locator(`text=/Guess ${i}:/`).count();
    if (guessText > 0) {
      console.log(`  Guess ${i}: Found`);
    }
  }

  // Count total green/yellow/gray tiles in analysis
  const greenTiles = await page.locator('div[class*="bg-[#6aaa64]"]').count();
  const yellowTiles = await page.locator('div[class*="bg-[#c9b458]"]').count();
  const grayTiles = await page.locator('div[class*="bg-[#787c7e]"]').count();
  console.log(`\nTotal colored tiles: Green=${greenTiles}, Yellow=${yellowTiles}, Gray=${grayTiles}`);

  // The last guess (CLOCK = answer) should have 5 green tiles
  // Previous guesses should have various colors based on CLOCK as the answer
  // RIGHT vs CLOCK: R=absent, I=absent, G=absent, H=absent, T=absent (no common letters except none actually)
  // Wait: RIGHT vs CLOCK - R not in CLOCK? C,L,O,C,K - no R,I,G,H,T - all absent
  // SCALE vs CLOCK: S=absent, C=present(pos 0 vs pos 0 in CLOCK?), A=absent, L=present, E=absent
  // Wait: C is in CLOCK at pos 0 AND pos 3. SCALE has C at pos 1. So C at pos 1 in SCALE = present
  // CLICK vs CLOCK: C=correct(pos 0), L=correct(pos 1), I=absent, C=present? K=correct(pos 4)
  // Hmm let me recalculate: CLICK vs CLOCK
  // C vs C (pos 0) = correct
  // L vs L (pos 1) = correct
  // I vs O (pos 2) = absent
  // C vs C (pos 3) = C is already matched at pos 0, but there's another C at pos 3 = present
  // K vs K (pos 4) = correct
  // So CLICK: green, green, gray, yellow, green

  console.log('\nExpected results (answer=CLOCK):');
  console.log('  RIGHT: all gray (no common letters)');
  console.log('  SCALE: gray, yellow(C), gray, yellow(L), gray');
  console.log('  CLICK: green(C), green(L), gray(I), yellow(C-pos3), green(K)');
  console.log('  CLOCK: all green (it IS the answer)');

  await browser.close();
}

main().catch(console.error);
