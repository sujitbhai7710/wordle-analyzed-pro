import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('1. Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.screenshot({ path: '/home/z/my-project/download/test-1-initial.png', fullPage: false });
  console.log('Screenshot 1: Initial page saved');

  // Find hidden inputs
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  console.log(`Found ${inputs.length} text inputs`);

  // Type RIGHT in row 1
  console.log('2. Typing RIGHT in row 1...');
  await inputs[0].focus();
  await inputs[0].fill('RIGHT');
  await page.waitForTimeout(300);

  // Type SCALE in row 2
  console.log('3. Typing SCALE in row 2...');
  await inputs[1].focus();
  await inputs[1].fill('SCALE');
  await page.waitForTimeout(300);

  // Type CLICK in row 3
  console.log('4. Typing CLICK in row 3...');
  await inputs[2].focus();
  await inputs[2].fill('CLICK');
  await page.waitForTimeout(300);

  // Type CLOCK in row 4 (the answer)
  console.log('5. Typing CLOCK in row 4 (answer)...');
  await inputs[3].focus();
  await inputs[3].fill('CLOCK');
  await page.waitForTimeout(300);

  await page.screenshot({ path: '/home/z/my-project/download/test-2-filled.png', fullPage: false });
  console.log('Screenshot 2: Filled grid saved');

  // Check that grid tiles have no color backgrounds (only border colors)
  const gridContainer = page.locator('[role="grid"]');
  const coloredTilesInGrid = await gridContainer.locator('[class*="bg-[#6aaa64]"], [class*="bg-[#c9b458]"], [class*="bg-[#787c7e]"]').count();
  console.log(`Colored tiles in grid during input: ${coloredTilesInGrid}`);
  
  if (coloredTilesInGrid === 0) {
    console.log('✅ PASS: No color tiles in grid during input (matches original)');
  } else {
    console.log('❌ FAIL: Colors are showing in grid during input');
  }

  // Verify grid has correct letters
  const gridTexts = await gridContainer.locator('button').allTextContents();
  const letterTexts = gridTexts.filter(t => t.trim() && t.trim().length === 1);
  console.log('Grid letters:', letterTexts.join(''));

  // Click the Analyze button (use specific selector)
  console.log('6. Clicking Analyze button...');
  // The Analyze button is inside the Card below the grid
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(5000); // Wait for analysis

  await page.screenshot({ path: '/home/z/my-project/download/test-3-analysis.png', fullPage: true });
  console.log('Screenshot 3: After analysis saved');

  // Check analysis results
  const guessHeaders = await page.locator('text=/Guess \\d:/').count();
  console.log(`Found ${guessHeaders} guess headers`);

  // Check green tiles (should be present now in analysis)
  const greenAfter = await page.locator('[class*="bg-[#6aaa64]"]').count();
  console.log(`Green elements after analysis: ${greenAfter}`);

  // Check the play summary  
  const playText = await page.locator('text=Your play').count();
  console.log(`Found "Your play" text: ${playText}`);

  // Verify CLOCK row shows as all green (it's the answer)
  const clockHeader = await page.locator('text=Guess 4: CLOCK').count();
  console.log(`Found "Guess 4: CLOCK": ${clockHeader}`);

  // Check for AI Recommendation section
  const aiRec = await page.locator('text=AI Recommendation').count();
  console.log(`Found "AI Recommendation": ${aiRec}`);

  // Check for Luck badge
  const luckBadge = await page.locator('text=Lucky').first().count();
  console.log(`Found "Lucky" badge: ${luckBadge}`);

  // Take final screenshot
  await page.screenshot({ path: '/home/z/my-project/download/test-4-final.png', fullPage: true });
  console.log('Screenshot 4: Final state saved');

  console.log('\n=== TEST SUMMARY ===');
  if (coloredTilesInGrid === 0 && greenAfter > 0 && playText > 0 && guessHeaders >= 3) {
    console.log('✅ OVERALL PASS: Tool works correctly!');
    console.log('  - No colors during input (like original)');
    console.log('  - Colors computed during analysis');
    console.log('  - Analysis shows turn-by-turn breakdown');
  } else {
    console.log('❌ OVERALL: Some issues detected');
    console.log(`  - Colors during input: ${coloredTilesInGrid} (should be 0)`);
    console.log(`  - Green tiles after analysis: ${greenAfter} (should be > 0)`);
    console.log(`  - Guess headers: ${guessHeaders} (should be >= 3)`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
