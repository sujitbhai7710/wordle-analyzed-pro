import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('=== FINAL WORDLE ANALYZER TEST ===\n');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Step 1: Check initial state
  console.log('Step 1: Check initial page...');
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log(`  Found ${inputs.length} input rows (expected 7)`);

  // Step 2: Type RIGHT, SCALE, CLICK, CLOCK
  console.log('\nStep 2: Fill in guesses and answer...');
  await inputs[0].focus(); await inputs[0].fill('RIGHT');
  await inputs[1].focus(); await inputs[1].fill('SCALE');
  await inputs[2].focus(); await inputs[2].fill('CLICK');
  await inputs[3].focus(); await inputs[3].fill('CLOCK');
  console.log('  Typed: RIGHT, SCALE, CLICK, CLOCK');

  // Step 3: Verify no colors in grid
  console.log('\nStep 3: Verify no colors during input...');
  const gridContainer = page.locator('[role="grid"]');
  const coloredTiles = await gridContainer.locator('[class*="bg-[#6aaa64]"], [class*="bg-[#c9b458]"], [class*="bg-[#787c7e]"]').count();
  if (coloredTiles === 0) {
    console.log('  ✅ PASS: No colored tiles during input');
  } else {
    console.log(`  ❌ FAIL: Found ${coloredTiles} colored tiles during input`);
  }

  // Step 4: Verify letters are shown
  console.log('\nStep 4: Verify letters in grid...');
  const letters = await gridContainer.locator('button').allTextContents();
  const letterStr = letters.filter(t => t.trim() && t.trim().length === 1).join('');
  if (letterStr === 'RIGHTSCALECLICKCLOCK') {
    console.log('  ✅ PASS: All letters showing correctly');
  } else {
    console.log(`  ❌ FAIL: Letters are "${letterStr}"`);
  }

  // Step 5: Click Analyze
  console.log('\nStep 5: Click Analyze and verify results...');
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(5000);

  // Step 6: Verify analysis results
  console.log('\nStep 6: Verify analysis results...');
  
  // Check score display
  const playScore = await page.locator('text=/Your play: [0-9X]/').first().textContent().catch(() => '');
  console.log(`  Score display: "${playScore}"`);
  if (playScore && playScore.includes('4/6')) {
    console.log('  ✅ PASS: Score shows 4/6 (solved in 4 guesses)');
  } else {
    console.log('  ❌ FAIL: Score should show 4/6 but shows: ' + playScore);
  }

  // Check "Solved" text
  const solvedText = await page.locator('text=Solved in 4').count();
  if (solvedText > 0) {
    console.log('  ✅ PASS: Shows "Solved in 4 guesses"');
  } else {
    console.log('  ❌ FAIL: Should show "Solved in 4 guesses"');
  }

  // Check green tiles appear after analysis
  const greenAfter = await page.locator('div[class*="bg-[#6aaa64]"]').count();
  if (greenAfter > 0) {
    console.log(`  ✅ PASS: ${greenAfter} green tiles after analysis`);
  } else {
    console.log('  ❌ FAIL: No green tiles after analysis');
  }

  // Check guess details
  for (let i = 1; i <= 3; i++) {
    const guessHeader = await page.locator(`text=/Guess ${i}:/`).count();
    if (guessHeader > 0) {
      console.log(`  ✅ Guess ${i} header found`);
    }
  }

  // Check for luck, quality, AI recommendation
  const luckCount = await page.locator('text=/Lucky|Unlucky|Neutral/').count();
  const aiCount = await page.locator('text=AI Recommendation').count();
  console.log(`  Luck badges: ${luckCount}, AI recommendations: ${aiCount}`);

  // Take final screenshot
  await page.screenshot({ path: '/home/z/my-project/download/test-final-analysis.png', fullPage: true });

  console.log('\n=== TEST COMPLETE ===');
  console.log('Screenshots saved to /home/z/my-project/download/');

  await browser.close();
}

main().catch(console.error);
