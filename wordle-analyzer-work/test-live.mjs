import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const LIVE_URL = 'https://wordle-analyzer.pages.dev';
  console.log(`=== TESTING LIVE SITE: ${LIVE_URL} ===\n`);

  console.log('1. Navigating to live site...');
  await page.goto(LIVE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Take initial screenshot
  await page.screenshot({ path: '/home/z/my-project/download/live-1-initial.png', fullPage: false });
  console.log('  Initial screenshot saved');

  // Find hidden inputs
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log(`  Found ${inputs.length} input rows`);

  if (inputs.length < 4) {
    console.log('  ❌ FAIL: Not enough input rows found');
    await browser.close();
    return;
  }

  // Type the test words
  console.log('\n2. Typing RIGHT, SCALE, CLICK, CLOCK...');
  await inputs[0].focus(); await inputs[0].fill('RIGHT');
  await inputs[1].focus(); await inputs[1].fill('SCALE');
  await inputs[2].focus(); await inputs[2].fill('CLICK');
  await inputs[3].focus(); await inputs[3].fill('CLOCK');

  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/download/live-2-filled.png', fullPage: false });
  console.log('  Filled grid screenshot saved');

  // Verify no colors during input
  const gridContainer = page.locator('[role="grid"]');
  const coloredTiles = await gridContainer.locator('[class*="bg-[#6aaa64]"], [class*="bg-[#c9b458]"], [class*="bg-[#787c7e]"]').count();
  console.log(`  Colored tiles during input: ${coloredTiles}`);
  if (coloredTiles === 0) {
    console.log('  ✅ No colors during input');
  } else {
    console.log('  ❌ Colors showing during input');
  }

  // Verify letters
  const letters = await gridContainer.locator('button').allTextContents();
  const letterStr = letters.filter(t => t.trim() && t.trim().length === 1).join('');
  console.log(`  Grid letters: ${letterStr}`);

  // Click Analyze
  console.log('\n3. Clicking Analyze...');
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(8000); // Longer wait for live site

  await page.screenshot({ path: '/home/z/my-project/download/live-3-analysis.png', fullPage: true });
  console.log('  Analysis screenshot saved');

  // Check results
  console.log('\n4. Verifying analysis results...');
  
  const playScore = await page.locator('text=/Your play: [0-9X]/').first().textContent().catch(() => 'N/A');
  console.log(`  Score: "${playScore}"`);
  
  if (playScore && playScore.includes('4/6')) {
    console.log('  ✅ PASS: Score shows 4/6');
  } else {
    console.log('  ❌ FAIL: Score should be 4/6');
  }

  const solvedText = await page.locator('text=Solved in 4').count();
  if (solvedText > 0) {
    console.log('  ✅ Shows "Solved in 4 guesses"');
  } else {
    console.log('  ❌ Missing "Solved in 4 guesses"');
  }

  const greenAfter = await page.locator('div[class*="bg-[#6aaa64]"]').count();
  console.log(`  Green tiles: ${greenAfter}`);

  const guessHeaders = await page.locator('text=/Guess \\d:/').count();
  console.log(`  Guess headers: ${guessHeaders}`);

  const aiRec = await page.locator('text=AI Recommendation').count();
  console.log(`  AI Recommendations: ${aiRec}`);

  const luckBadges = await page.locator('text=/Lucky|Unlucky|Neutral/').count();
  console.log(`  Luck badges: ${luckBadges}`);

  // Final screenshot
  await page.screenshot({ path: '/home/z/my-project/download/live-4-final.png', fullPage: true });

  console.log('\n=== LIVE SITE TEST COMPLETE ===');
  if (playScore && playScore.includes('4/6') && solvedText > 0 && greenAfter > 0) {
    console.log('✅ LIVE SITE IS WORKING CORRECTLY!');
  } else {
    console.log('❌ Some issues detected on live site');
  }

  await browser.close();
}

main().catch(console.error);
