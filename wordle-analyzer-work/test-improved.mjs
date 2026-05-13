import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('=== TESTING IMPROVED WORDLE ANALYZER ===\n');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Fill in the grid
  const inputs = await page.locator('input[type="text"][maxlength="5"]').all();
  await inputs[0].focus(); await inputs[0].fill('CRANE');
  await inputs[1].focus(); await inputs[1].fill('SLOTH');
  await inputs[2].focus(); await inputs[2].fill('SPIRE');
  await inputs[3].focus(); await inputs[3].fill('SHIRE');

  console.log('Typed: CRANE, SLOTH, SPIRE, SHIRE');

  // Click Analyze
  const analyzeBtn = page.locator('button').filter({ hasText: /^Analyze$/ }).first();
  await analyzeBtn.click();
  await page.waitForTimeout(8000);

  await page.screenshot({ path: '/home/z/my-project/download/test-improved-1.png', fullPage: true });
  console.log('Screenshot 1 saved');

  // Check all features
  console.log('\n--- Feature Checklist ---');

  // 1. Score display
  const scoreText = await page.locator('text=/Your play: [0-9X]/').first().textContent().catch(() => 'N/A');
  console.log(`1. Score display: "${scoreText}"`);

  // 2. Commentary
  const commentaryCount = await page.locator('.bg-muted\\/30').count();
  console.log(`2. Commentary boxes: ${commentaryCount}`);

  // 3. Comparison table (You played / AI would have played)
  const tableHeaders = await page.locator('th:has-text("You played"), th:has-text("AI would have played")').count();
  console.log(`3. Comparison table headers: ${tableHeaders}`);

  // 4. Avg remaining words
  const avgRemaining = await page.locator('td:has-text("words"), td >> text=/\\d+\\.?\\d* words/').first().textContent().catch(() => 'N/A');
  console.log(`4. Avg remaining shown: ${avgRemaining !== 'N/A' ? 'Yes' : 'No'}`);

  // 5. Strategy label
  const strategyText = await page.locator('text=/Eliminate likely|Take a punt/').first().textContent().catch(() => 'N/A');
  console.log(`5. AI Strategy label: "${strategyText}"`);

  // 6. Possible answer check
  const possibleAnswer = await page.locator('text=Possible answer').count();
  console.log(`6. Possible answer check: ${possibleAnswer > 0 ? 'Yes' : 'No'}`);

  // 7. Likely word check
  const likelyWord = await page.locator('text=Likely word').count();
  console.log(`7. Likely word check: ${likelyWord > 0 ? 'Yes' : 'No'}`);

  // 8. Guess quality
  const guessQuality = await page.locator('text=Guess quality').count();
  console.log(`8. Guess quality: ${guessQuality > 0 ? 'Yes' : 'No'}`);

  // 9. AI Playthrough
  const aiPlaythrough = await page.locator('text=AI Playthrough').count();
  console.log(`9. AI Playthrough section: ${aiPlaythrough > 0 ? 'Yes' : 'No'}`);

  // 10. Luck levels (more than 3)
  const luckBadges = await page.locator('.bg-green-100, .bg-lime-100, .bg-yellow-100, .bg-orange-100, .bg-red-100, .bg-emerald-100').count();
  console.log(`10. Granular luck badges: ${luckBadges > 0 ? 'Yes' : 'No'} (${luckBadges} found)`);

  // 11. Answer display
  const answerDisplay = await page.locator('text=The answer was').count();
  console.log(`11. Answer display: ${answerDisplay > 0 ? 'Yes' : 'No'}`);

  // 12. Likely words in remaining (★ marker)
  const likelyStars = await page.locator('text=/★/').count();
  console.log(`12. Likely word markers (★): ${likelyStars > 0 ? 'Yes' : 'No'} (${likelyStars} found)`);

  // Expand AI Playthrough and check
  const aiSection = page.locator('text=AI Playthrough').first();
  await aiSection.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/z/my-project/download/test-improved-2-ai.png', fullPage: true });

  const aiGuessDetails = await page.locator('text=/AI Guess \\d/').count();
  console.log(`13. AI guess details after expand: ${aiGuessDetails}`);

  console.log('\n=== TEST COMPLETE ===');

  await browser.close();
}

main().catch(console.error);
