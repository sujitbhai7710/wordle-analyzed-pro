const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const viewport = page.viewportSize();
  
  // Test 1: Blog post - how to play wordle
  console.log('Testing /blog/how-to-play-wordle...');
  await page.goto('https://wordleanalyzer.dev/blog/how-to-play-wordle', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Check H1
  const h1 = await page.textContent('h1');
  console.log('H1:', h1?.substring(0, 80));
  
  // Check H2s in content
  const h2s = await page.$$eval('.blog-content h2', els => els.map(e => e.textContent));
  console.log('H2 count:', h2s.length, '- First 3:', h2s.slice(0, 3));
  
  // Check H3s
  const h3s = await page.$$eval('.blog-content h3', els => els.map(e => e.textContent));
  console.log('H3 count:', h3s.length);
  
  // Check tables
  const tables = await page.$$('.blog-content table');
  console.log('Tables:', tables.length);
  
  // Check callouts
  const callouts = await page.$$('.blog-content .callout');
  console.log('Callouts:', callouts.length);
  
  // Check Wordle demos
  const demos = await page.$$('.blog-content .wordle-demo');
  console.log('Wordle demos:', demos.length);
  
  // Check key takeaways
  const takeaways = await page.$$('.blog-content .key-takeaways');
  console.log('Key takeaways boxes:', takeaways.length);
  
  // Check FAQ sections
  const faqs = await page.$$('.blog-content .faq-section');
  console.log('FAQ sections:', faqs.length);
  
  // Check stat grids
  const statGrids = await page.$$('.blog-content .stat-grid');
  console.log('Stat grids:', statGrids.length);
  
  // Check bar charts
  const barCharts = await page.$$('.blog-content .bar-chart');
  console.log('Bar charts:', barCharts.length);
  
  // Take screenshot
  await page.screenshot({ path: '/home/z/my-project/download/blog-how-to-play.png', fullPage: false });
  console.log('Screenshot saved!');
  
  // Test 2: Another blog post
  console.log('\nTesting /blog/best-wordle-starting-words...');
  await page.goto('https://wordleanalyzer.dev/blog/best-wordle-starting-words', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const h2s2 = await page.$$eval('.blog-content h2', els => els.map(e => e.textContent));
  console.log('H2 count:', h2s2.length);
  
  const tables2 = await page.$$('.blog-content table');
  console.log('Tables:', tables2.length);
  
  const callouts2 = await page.$$('.blog-content .callout');
  console.log('Callouts:', callouts2.length);
  
  const demos2 = await page.$$('.blog-content .wordle-demo');
  console.log('Wordle demos:', demos2.length);
  
  await page.screenshot({ path: '/home/z/my-project/download/blog-best-words.png', fullPage: false });
  console.log('Screenshot saved!');
  
  // Test 3: Blog index
  console.log('\nTesting /blog...');
  await page.goto('https://wordleanalyzer.dev/blog', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const blogLinks = await page.$$eval('a[href^="/blog/"]', els => els.length);
  console.log('Blog links:', blogLinks);
  
  await page.screenshot({ path: '/home/z/my-project/download/blog-index.png', fullPage: false });
  console.log('Blog index screenshot saved!');
  
  // Test 4: Check reading progress bar on another post
  console.log('\nTesting /blog/wordle-strategy-guide...');
  await page.goto('https://wordleanalyzer.dev/blog/wordle-strategy-guide', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const progressBar = await page.$('.fixed.top-0');
  console.log('Reading progress bar found:', !!progressBar);
  
  // Check Quick Navigation sidebar
  const navHeadings = await page.$$('.sticky .text-xs');
  console.log('Sidebar nav items:', navHeadings.length);
  
  // Test 5: Test a few more blog posts
  const testPosts = [
    'common-wordle-mistakes',
    'wordle-vs-quordle',
    'history-of-wordle',
    'letter-frequency-wordle',
    'wordle-elimination-science'
  ];
  
  for (const slug of testPosts) {
    await page.goto(`https://wordleanalyzer.dev/blog/${slug}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    const postH2s = await page.$$eval('.blog-content h2', els => els.length);
    const postTables = await page.$$('.blog-content table');
    const postCallouts = await page.$$('.blog-content .callout');
    const postTakeaways = await page.$$('.blog-content .key-takeaways');
    const postFAQs = await page.$$('.blog-content .faq-section');
    console.log(`  ${slug}: H2s=${postH2s}, Tables=${postTables.length}, Callouts=${postCallouts.length}, Takeaways=${postTakeaways.length}, FAQs=${postFAQs.length}`);
  }
  
  await browser.close();
  console.log('\nAll tests completed!');
})();
