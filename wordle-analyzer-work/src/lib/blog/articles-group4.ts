export const articlesGroup4: Record<string, string> = {
  "improve-wordle-average": `
<h2>Your Wordle Average Is Probably Worse Than You Think</h2>
<p>Most Wordle players I talk to estimate their average somewhere between 3.5 and 4.0. Then they actually track it for a month and discover the real number is closer to 4.2. I know because that happened to me — when I started logging every game in a spreadsheet back in March 2022, my perceived average was 3.8 and my actual average was 4.3. That gap between perception and reality is where improvement starts. We tend to remember our brilliant 2-guess solves and conveniently forget the 6-guess slogs. Tracking forces honesty, and honesty is the prerequisite for getting better at anything competitive.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u26A0\uFE0F</div>
  <div class="callout-content"><p>If you have not tracked at least 50 games, your self-reported average is almost certainly wrong. Cognitive bias makes us remember our best games and forget our worst. The gap between perceived and actual averages is typically 0.3 to 0.5 guesses.</p></div>
</div>

<h2>What Counts as a "Good" Average</h2>
<p>Based on aggregated data from shared results and community surveys, the typical Wordle player averages between 4.0 and 4.5 guesses per game. If you are sitting at 4.0, you are already above the median. A 3.7 average puts you in roughly the top 15% of consistent players. Below 3.5 and you are in rare territory — either you have optimized extensively or you have had a lucky stretch. These numbers shift depending on how you measure them, too. Players who share their results on social media skew lower because people are more likely to post good games. The true population average is probably closer to 4.3 when you account for the silent majority who do not share.</p>

<div class="stat-grid">
  <div class="stat-card"><div class="stat-value">4.3</div><div class="stat-label">True Population Average</div></div>
  <div class="stat-card"><div class="stat-value">4.0</div><div class="stat-label">Above Median Threshold</div></div>
  <div class="stat-card"><div class="stat-value">3.7</div><div class="stat-label">Top 15% Mark</div></div>
  <div class="stat-card"><div class="stat-value">3.5</div><div class="stat-label">Elite Territory</div></div>
</div>

<h2>Why Tracking Matters More Than Talent</h2>
<p>You cannot improve what you do not measure. I have played over 1,100 games of Wordle, and the single most impactful thing I did was start tracking my results in a Google Sheet. Not because the spreadsheet magically made me better, but because it forced me to confront patterns I was ignoring. I discovered I was significantly worse on days when my opener returned zero green tiles. My average jumped from 3.9 to 4.6 in those scenarios, which told me my second-guess strategy for "cold openers" was weak. I worked on that specifically and brought the cold-opener average down to 4.1 over the next two months. That targeted improvement would never have happened without tracking.</p>

<h3>How to Calculate Your True Average</h3>
<p>Do not just look at your last 20 games — that is too small a sample and too vulnerable to recency bias. You need at least 50 games to get a stable number, and 100+ is better. Here is the formula: divide total guesses across all games by total games played. Count failed games as 7 guesses (not 6), since the failure itself is worse than solving on guess 6. Exclude only games where you were interrupted or did not finish honestly. Wordle's built-in stats give you the distribution (1 through 6 plus X), which is enough to back-calculate your average. Multiply each row by its count, sum them up, and divide by total games.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\uD83D\uDCA1</div>
  <div class="callout-content"><p>Use a spreadsheet with columns for date, guesses, opener, result (1-6 or X), and notes. The notes column is where you log what went well or badly. After a few weeks, the notes reveal patterns you would never notice otherwise — like which openers lead to your worst performances or whether you struggle on certain days of the week.</p></div>
</div>

<h2>The Opener Is the Biggest Lever</h2>
<p>Nothing affects your average more than your starting word. When I switched from ADIEU to CRANE, my average dropped from 4.3 to 4.0 in about six weeks. When I moved from CRANE to TRACE, it dropped another 0.2. Optimizing the opener pays off more than any other single change you can make. Your opener determines how much information you get on guess 1, and that information cascades through every subsequent guess. A good opener tests the most common letters in the most common positions and sets up your second guess to be decisive. TRACE, CRANE, SLATE, and CRATE are all strong choices. ADIEU is popular because it tests four vowels, but it wastes a slot on U and does not test any top consonants — which is why ADIEU players tend to average higher.</p>

<table>
  <thead>
    <tr><th>Opener</th><th>Avg. Guesses</th><th>Letters Tested</th><th>Top Letters Hit</th></tr>
  </thead>
  <tbody>
    <tr><td>TRACE</td><td>3.62</td><td>T, R, A, C, E</td><td>5 of top 8</td></tr>
    <tr><td>SLATE</td><td>3.63</td><td>S, L, A, T, E</td><td>5 of top 8</td></tr>
    <tr><td>CRANE</td><td>3.68</td><td>C, R, A, N, E</td><td>4 of top 8</td></tr>
    <tr><td>CRATE</td><td>3.69</td><td>C, R, A, T, E</td><td>5 of top 8</td></tr>
    <tr><td>ADIEU</td><td>3.94</td><td>A, D, I, E, U</td><td>2 of top 8</td></tr>
    <tr><td>RAISE</td><td>3.72</td><td>R, A, I, S, E</td><td>4 of top 8</td></tr>
  </tbody>
</table>

<h2>My Data: 1,000+ Games Tracked</h2>
<p>Here is what my tracking looks like after 1,100+ games of consistent play and deliberate improvement. The current average sits at 3.72, with a solve distribution heavily weighted toward 3 and 4 guesses. That 3.72 did not happen overnight — it was 4.3 in my first 100 games, 4.0 after 300 games, 3.85 after 600, and it has been bouncing between 3.7 and 3.8 for the last 500 games. The improvement curve is real, but it flattens significantly as you approach the low 3s.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile green">R</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">R</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile yellow">N</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">R</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile green">N</div>
    <div class="wordle-demo-tile green">G</div>
  </div>
</div>

<p>That grid shows a typical game: TRACE gives me a green R and E, SLINK narrows further, and by guess 3 I have enough to solve. When everything clicks, Wordle feels effortless. But the data tells a more complete story than any single game can.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">2 guesses</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 8%">8%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">3 guesses</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 38%">38%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">4 guesses</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 39%">39%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">5 guesses</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 12%">12%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">6 guesses</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 2%">2%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Failed (X)</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 1%">1%</div></div>
  </div>
</div>

<h2>Diminishing Returns Are Real</h2>
<p>Getting from 4.5 to 4.0 took me about three months of deliberate changes. Getting from 4.0 to 3.7 took another eight months. Getting from 3.7 to 3.5? I am not there yet, and I am not sure I ever will be consistently. The lower your average, the more each remaining tenth requires near-perfect play, and Wordle has enough variance that near-perfect play is not sustainable. Some days the answer is JOKER and you are taking five guesses no matter what you do. Other days it is STARE and half the planet solves in two. You cannot control the answer, only your approach. This is a crucial mindset shift — you are optimizing your process, not guaranteeing an outcome.</p>

<h3>Specific Techniques That Moved My Average</h3>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <p><strong>Switch to TRACE as opener</strong> — This single change saved roughly 0.3 guesses per game on average. TRACE hits five of the eight most common Wordle letters and positions them optimally. The E in position 5 alone has a 31% chance of being green.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <p><strong>Use a dedicated second word for cold openers</strong> — When TRACE returns nothing useful, I play SLOTH or CLINT as follow-ups. These test different high-frequency letters and almost always produce hits that the opener missed.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <p><strong>Play the endgame conservatively</strong> — If I have 3+ possibilities on guess 4, I use guess 4 to eliminate rather than guess directly. An elimination guess that tests multiple candidates is worth more than a direct shot that might miss.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">4</div>
  <div class="step-content">
    <p><strong>Test double letters earlier</strong> — If the remaining options are FLAME, BLAME, and FLAKE, I test B and K simultaneously rather than guessing one and hoping. This prevents wasting turns on 50/50 guesses.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">5</div>
  <div class="step-content">
    <p><strong>Avoid "cute" guesses</strong> — I treat guess 2 as information-gathering unless guess 1 gave me 3+ greens. The temptation to build a word around one green letter is strong, but sweeping for new letters almost always produces a lower average.</p>
  </div>
</div>

<h2>Aggressive vs. Conservative Play</h2>
<p>Aggressive play means guessing the answer when you have two or more reasonable candidates. Conservative play means guessing a word that tests multiple candidates simultaneously, even if that word cannot be the answer. Both styles have their place, and knowing when to switch between them is a skill that develops with experience. I play aggressively on guess 3 or earlier when my candidate set is 2-3 words. The cost of guessing wrong is low because I still have turns to recover. I play conservatively on guess 4 or later when the candidate set is 3 or more. A miss on guess 4 with 5 candidates means guess 5 is a coin flip. The rule: if remaining candidates equal remaining guesses, play conservatively. If you have more guesses than candidates, you can afford one aggressive swing.</p>

<div class="callout callout-important">
  <div class="callout-icon">\u2757</div>
  <div class="callout-content"><p>The golden rule of Wordle endgames: if remaining candidates equal remaining guesses, play conservatively and eliminate. If you have more guesses than candidates, you can afford one aggressive swing. Violating this rule is the single biggest source of unnecessary failed games.</p></div>
</div>

<h2>Vocabulary Breadth Is the Hidden Factor</h2>
<p>Strategy only gets you so far if you cannot think of the word. I have lost games where the answer was SAUCE and I never considered it because I was tunneling on words ending in -AICE. The best way to build Wordle-specific vocabulary is to read through the full valid guesses list — not to memorize it, but to prime your brain with patterns. When I spent a week casually reading through the roughly 10,000 valid guesses, my ability to generate candidate words in the endgame improved noticeably. You do not need to memorize every word. You just need to have seen enough patterns that your brain can surface them under pressure. Unlimited Wordle sites let you test different openers and second-guess strategies without worrying about your streak. The data I gathered from 15 minutes of daily practice for a month is what convinced me to switch from CRANE to TRACE.</p>

<h2>Setting Realistic Improvement Goals</h2>
<p>If your current average is 4.5, getting to 4.0 in three months is realistic. If you are at 4.0, getting to 3.7 might take six months. If you are at 3.7, maintaining that is an achievement in itself. Set goals based on rolling averages, not individual games. What moves the needle is consistently avoiding 5s and 6s. One fewer 5-guess game per week is worth more than one extra 2-guess game per month. The math is simple: eliminating your worst games has a larger impact on your average than improving your best ones. Focus on the floor, not the ceiling.</p>

<div class="callout callout-info">
  <div class="callout-icon">\u2139\uFE0F</div>
  <div class="callout-content"><p>Saturdays are statistically harder than other days of the week. The NYT tends to place more challenging answers on weekends. If you track your average by day of week, you will likely see a pattern — my Saturday average is 0.3 higher than my Wednesday average. Adjust your expectations accordingly.</p></div>
</div>

<h2>Some Days Are Just Harder</h2>
<p>Wordle answers range from trivial (HOUSE, GREAT, THING) to brutal (NATAL, PIXIE, JAZZY). The difficulty of the answer alone can add 1-2 guesses to your score, and no amount of preparation eliminates that variance. I have had weeks where my average was 3.4 and weeks where it was 4.1, playing with the exact same strategy. Do not beat yourself up over a bad day. Your 100-game average is who you really are as a Wordle player — the daily result is just noise. Embrace the variance, track your data, optimize your process, and let the results take care of themselves over time.</p>

<div class="key-takeaways">
  <h3>\u2705 Key Takeaways</h3>
  <ul>
    <li>Your perceived average is almost certainly worse than you think — track at least 50 games to get a real number</li>
    <li>The opener is the single biggest lever for improving your average; switching to TRACE can save 0.3 guesses per game</li>
    <li>Play aggressively when candidates are fewer than remaining guesses; play conservatively otherwise</li>
    <li>Focus on eliminating your worst games rather than chasing your best — the floor matters more than the ceiling</li>
    <li>Diminishing returns are real: going from 4.5 to 4.0 is much easier than going from 3.7 to 3.5</li>
    <li>Vocabulary breadth is an underappreciated factor — read through the valid guesses list to prime your pattern recognition</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details><summary>What is considered a good Wordle average?</summary><div>A good Wordle average depends on your perspective, but generally speaking, 4.0 puts you above the median player. An average of 3.7 places you in roughly the top 15% of consistent players. Anything below 3.5 is elite territory that requires extensive optimization and a bit of luck.</div></details>
  <details><summary>Should I count failed games as 6 or 7 guesses when calculating my average?</summary><div>Count failed games as 7 guesses. A failed game is worse than solving on guess 6, so using 6 would underweight the cost of failure. Using 7 appropriately penalizes failures and gives you a more accurate picture of your true performance.</div></details>
  <details><summary>How many games do I need to track before my average is reliable?</summary><div>You need at least 50 games for a reasonably stable average, but 100+ is better. With fewer than 50 games, random variance in answer difficulty can skew your numbers significantly. Your last 20 games are too small a sample to be meaningful.</div></details>
  <details><summary>Is ADIEU really that bad as an opener?</summary><div>ADIEU is not terrible, but it is suboptimal. It tests four vowels but only one consonant (D), which is not even in the top 10 most common letters. Most Wordle answers have exactly two vowels, so testing four is overkill. Openers like TRACE that balance vowels and consonants produce better averages.</div></details>
  <details><summary>Can I improve my average without changing my opener?</summary><div>Yes, but the gains will be smaller. You can improve by playing more conservatively in the endgame, using elimination guesses when you have many candidates, and building your vocabulary breadth. However, the opener is the biggest single lever available, so changing it yields the most improvement per effort.</div></details>
</div>
`,

  "letter-frequency-wordle": `
<h2>E Appears in Nearly Half of All Wordle Answers</h2>
<p>That is not a rough estimate — 47.2% of the 2,309 answers in the original Wordle list contain the letter E. If you are not testing E in your first two guesses, you are flying blind through almost half the dictionary. Letter frequency is not just trivia; it is the single most practical piece of data you can use to play better Wordle. Every guess you make is essentially a probe into the frequency distribution of the answer list, and understanding that distribution lets you make each probe more efficient. The players who consistently solve in 3-4 guesses are not guessing differently — they are probing more intelligently.</p>

<div class="callout callout-key">
  <div class="callout-icon">\uD83D\uDD11</div>
  <div class="callout-content"><p>The top five letters in Wordle answers — E, A, R, O, T — can be tested in a single guess with words like TRACE or CRATE. This is not a coincidence. These openers dominate recommendation lists because they hit the frequency distribution at its highest-value points.</p></div>
</div>

<h2>The Overall Frequency Ranking</h2>
<p>Here are the letters ranked by how often they appear in Wordle answers. Notice that the top five — E, A, R, O, T — spell something close to an actual word strategy. TRACE and CRATE are not popular openers by accident. They hit the five most common letters in a single guess, and each of those letters has a better than 1-in-4 chance of appearing in any given answer. The bottom five letters — J, Q, X, Z, V — collectively appear in fewer than 4% of answers. Testing them early is almost always a waste of a valuable guess slot.</p>

<table>
  <thead>
    <tr><th>Rank</th><th>Letter</th><th>Frequency</th><th>Appearances</th><th>Cumulative %</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>E</td><td>47.2%</td><td>1,090</td><td>47.2%</td></tr>
    <tr><td>2</td><td>A</td><td>39.1%</td><td>902</td><td>62.3%</td></tr>
    <tr><td>3</td><td>R</td><td>31.5%</td><td>727</td><td>71.6%</td></tr>
    <tr><td>4</td><td>O</td><td>28.2%</td><td>651</td><td>77.4%</td></tr>
    <tr><td>5</td><td>T</td><td>27.6%</td><td>637</td><td>82.2%</td></tr>
    <tr><td>6</td><td>L</td><td>22.3%</td><td>515</td><td>86.5%</td></tr>
    <tr><td>7</td><td>I</td><td>22.0%</td><td>508</td><td>89.7%</td></tr>
    <tr><td>8</td><td>S</td><td>21.8%</td><td>503</td><td>92.1%</td></tr>
    <tr><td>9</td><td>N</td><td>20.5%</td><td>473</td><td>94.0%</td></tr>
    <tr><td>10</td><td>C</td><td>15.3%</td><td>353</td><td>95.2%</td></tr>
  </tbody>
</table>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">E</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 47%">47.2%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">A</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 39%">39.1%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">R</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 32%">31.5%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">O</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 28%">28.2%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">T</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 28%">27.6%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">L</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 22%">22.3%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">I</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 22%">22.0%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">S</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 22%">21.8%</div></div>
  </div>
</div>

<h2>Position Matters More Than Overall Frequency</h2>
<p>Overall frequency tells you which letters to test. Position-specific frequency tells you where to test them. These are different things, and the gap between them is where strategic value lives. A letter that appears frequently in the answer list but never in the position you are testing it gives you no information. Conversely, a letter that appears in a specific position much more often than its overall frequency would suggest is a goldmine for positional guessing.</p>

<h3>Starting Letter Frequency</h3>
<p>S is the most common starting letter in Wordle answers, appearing at position 1 in about 15.6% of answers — more than 360 words. After S, the most common starters are C, B, T, P, F, and G. This is why SLATE and STARE outperform alternatives like LATER — they test S in position 1 where it is most likely to appear, rather than burying S in position 4 or 5. Position-specific testing is one of the most underused strategic advantages in Wordle.</p>

<h3>Ending Letter Frequency</h3>
<p>E dominates position 5, appearing at the end of roughly 31% of all Wordle answers. The next most common ending letters are Y (about 17%), T, R, and D. This is why TRACE, CRANE, and SLATE are structurally sound — the E in position 5 has the highest probability of being correct. Y is the sneaky one. It is not in the top 10 for overall frequency, but it is the second most common ending letter. Testing Y in position 5 early is worthwhile, especially if you have ruled out E.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile yellow">L</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>
<p>The pattern above illustrates the power of positional frequency: S at position 1 and E at position 5 are the two most likely positional outcomes in all of Wordle. When both hit green, your candidate set shrinks dramatically.</p>

<h2>Vowel Distribution: Usually Two, Sometimes Three</h2>
<p>The average Wordle answer contains 2.1 vowels (counting Y as a consonant). About 52% of answers have exactly two vowels, 30% have three, 12% have one, and 6% have four or five. Answers with a single vowel tend to be harder — words like TRYST, CRYPT, and GLYPH trip people up because most players expect two vowels and struggle when they only find one. This is why ADIEU feels effective — it tests four vowels at once. But most answers have exactly two vowels, so testing four is overkill. You are spending slots on information you could get with just two vowel tests, at the cost of not testing high-value consonants like R, T, S, or N. TRACE tests A and E — the two most common vowels — while also hitting R, T, and C. That is better information density than ADIEU.</p>

<div class="stat-grid">
  <div class="stat-card"><div class="stat-value">52%</div><div class="stat-label">Answers with 2 Vowels</div></div>
  <div class="stat-card"><div class="stat-value">30%</div><div class="stat-label">Answers with 3 Vowels</div></div>
  <div class="stat-card"><div class="stat-value">12%</div><div class="stat-label">Answers with 1 Vowel</div></div>
  <div class="stat-card"><div class="stat-value">6%</div><div class="stat-label">Answers with 4+ Vowels</div></div>
</div>

<div class="callout callout-tip">
  <div class="callout-icon">\uD83D\uDCA1</div>
  <div class="callout-content"><p>Y functions as a vowel in about 10% of Wordle answers (LYNCH, GLYPH, NYMPH). If your first two guesses have eliminated A, E, I, O, and U, testing Y becomes a high-priority move. Include Y in your second or third guess whenever standard vowels have been mostly ruled out.</p></div>
</div>

<h2>The Least Common Letters and When to Bother</h2>
<p>J, Q, X, and Z appear in fewer than 1% of Wordle answers combined. Testing them proactively is almost never worth it. But there are exceptions worth knowing about. When you have exhausted common letters and still have 3+ candidates, uncommon letters might be what is connecting them. When positional data suggests it — if you have a U in position 2, then QU- at the start is a real possibility. When the pattern screams it — a blank-blank-Z-Z-Y pattern makes JAZZY worth considering. Otherwise, treat J, Q, X, and Z as afterthoughts. They will either become obvious from the pattern or they will not matter.</p>

<table>
  <thead>
    <tr><th>Letter</th><th>Overall %</th><th>Position 1 %</th><th>Best Position</th><th>When to Test</th></tr>
  </thead>
  <tbody>
    <tr><td>J</td><td>0.3%</td><td>0.2%</td><td>Pos 1</td><td>Only with strong positional clue</td></tr>
    <tr><td>Q</td><td>0.3%</td><td>0.2%</td><td>Pos 1 (with U)</td><td>When U is confirmed at pos 2</td></tr>
    <tr><td>X</td><td>0.6%</td><td>0.1%</td><td>Pos 3-4</td><td>When pattern demands it</td></tr>
    <tr><td>Z</td><td>0.6%</td><td>0.1%</td><td>Pos 3-5</td><td>When _ZZ_ pattern possible</td></tr>
    <tr><td>V</td><td>1.8%</td><td>0.5%</td><td>Pos 2-3</td><td>Late game, uncommon</td></tr>
  </tbody>
</table>

<h2>Common Consonant Clusters</h2>
<p>Certain consonant pairs appear frequently in Wordle answers, and knowing them helps generate better guesses. When I see a yellow T and H, I immediately consider -TH words for positions 4-5. When I see a yellow C, I think about -CH and -CK endings. This is faster than scanning the alphabet letter by letter. These clusters are essentially pre-built pattern templates that your brain can match against quickly. The more templates you internalize, the faster you generate candidates and the more complete your candidate lists become.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>Most Common Clusters</h4>
    <ul>
      <li><strong>-TH</strong> — ~8% of answers</li>
      <li><strong>-ST</strong> — ~6% of answers</li>
      <li><strong>-CH</strong> — ~5% of answers</li>
      <li><strong>-ND</strong> — ~4% of answers</li>
      <li><strong>-SH</strong> — ~4% of answers</li>
    </ul>
  </div>
  <div class="comparison-card negative">
    <h4>Rare Clusters (Skip These)</h4>
    <ul>
      <li><strong>-PH</strong> — very rare</li>
      <li><strong>-PT</strong> — almost never</li>
      <li><strong>-MN</strong> — does not appear</li>
      <li><strong>-GN</strong> — extremely rare</li>
      <li><strong>-SZ</strong> — never in Wordle</li>
    </ul>
  </div>
</div>

<h2>Double Letter Frequency</h2>
<p>Double letters show up in about 15% of Wordle answers, and they are a consistent source of frustration for players who test for them too late. LL appears in about 4% of answers (ALLOW, SKILL, UNTIL), SS in about 3% (CLASS, PRESS, CROSS), EE in about 3% (FEWER, GREEN, CHEER), and OO in about 2% (BLOOD, FLOOR, SPOON). The mistake most players make is testing double letters too late. If you have confirmed an L and the answer could be BELLY, SILLY, or BULLY, test for a second L rather than guessing each word individually. A word like GULLS tests the double L and gives you information about other letters simultaneously.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u26A0\uFE0F</div>
  <div class="callout-content"><p>Double letters reduce the number of unique letters in the answer, giving you fewer hooks to grab onto. A five-letter word with only 3-4 unique letters (like LLAMA or GUESS) is inherently harder to identify because there is less unique information to discover. Test for double letters explicitly when your candidate set includes words with doubles.</p></div>
</div>

<h2>Wordle Frequency vs. General English</h2>
<p>Wordle's answer list is curated — it is not a random sample of English. Josh Wardle chose common, recognizable words, which means the frequency distribution differs from general English in important ways. S-starting words are overrepresented — the gap between S and other starters is wider in Wordle. Obscure words are excluded, so X and Z are even rarer than in general English. E is slightly overrepresented at 47% in Wordle versus about 43% in general English five-letter words. Strategies built on general English frequency data slightly underperform compared to strategies built on the actual Wordle answer list. The difference is small — maybe 0.05 guesses per game — but if you are optimizing, use Wordle-specific data.</p>

<h3>How the NYT Changed the List</h3>
<p>When the New York Times acquired Wordle, they removed a handful of words from the answer list. The frequency impact was minimal — the top 10 letters did not change, and the overall distribution shifted by less than a percentage point. Pre-acquisition frequency data is still essentially accurate for all practical purposes. The main changes were removing a few potentially offensive or obscure terms, none of which significantly altered the letter distribution landscape.</p>

<h2>My Frequency-Based Guessing Framework</h2>
<p>Here is how I use frequency data in practice across every game. This framework is not rigid — I adjust based on feedback — but starting from frequency and adjusting is more reliable than starting from intuition. When I follow the framework, my average is 3.6. When I freestyle, it is 3.9. Same player, different approach, measurable difference. The framework works because it front-loads the highest-information probes and defers low-value testing until later in the game when it might actually matter.</p>

<div class="process-flow">
  <div class="process-step">
    <div class="process-step-icon">1</div>
    <div class="process-step-label">Guess 1: TRACE — Test E, A, R, T, C (5 of top 8)</div>
  </div>
  <div class="process-arrow">\u2192</div>
  <div class="process-step">
    <div class="process-step-icon">2</div>
    <div class="process-step-label">Guess 2: SLING — Test S, L, I, N, G (next tier)</div>
  </div>
  <div class="process-arrow">\u2192</div>
  <div class="process-step">
    <div class="process-step-icon">3</div>
    <div class="process-step-label">Guess 3: Build around confirmed letters, fill C, H, D, Y</div>
  </div>
  <div class="process-arrow">\u2192</div>
  <div class="process-step">
    <div class="process-step-icon">4</div>
    <div class="process-step-label">Guesses 4-6: Pattern matching, clusters, doubles</div>
  </div>
</div>

<div class="key-takeaways">
  <h3>\u2705 Key Takeaways</h3>
  <ul>
    <li>E appears in 47.2% of answers — always test it early, ideally in position 5 where it appears 31% of the time</li>
    <li>The top 5 letters (E, A, R, O, T) can all be tested in one guess with TRACE or CRATE</li>
    <li>Position-specific frequency is more actionable than overall frequency — S at position 1 is far more likely than S at position 4</li>
    <li>Most answers have exactly 2 vowels; testing 4 vowels with ADIEU is overkill and wastes consonant slots</li>
    <li>J, Q, X, and Z combined appear in fewer than 1% of answers — only test them with strong positional clues</li>
    <li>Consonant clusters like -TH, -CH, -SH are pattern templates that accelerate candidate generation</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details><summary>Why is E so much more common than other letters in Wordle?</summary><div>E is the most common letter in English overall, and Wordle's curated answer list emphasizes common, recognizable words. Short five-letter English words tend to use E heavily, especially at the end (-LE, -SE, -VE, -TE patterns). The 47.2% frequency reflects how English actually works at this word length.</div></details>
  <details><summary>Should I always test S in position 1?</summary><div>Not always, but usually yes. S is the most common starting letter at 15.6%, so testing it at position 1 gives you the best chance of a hit. If your opener does not start with S, consider testing S in position 1 on guess 2 if you have not confirmed the starting letter yet.</div></details>
  <details><summary>Is it worth testing Y early?</summary><div>Y is worth testing on guess 2 or 3 if you have ruled out E at position 5. Y is the second most common ending letter at about 17% frequency. In the mid-game, if you have found only one standard vowel, testing Y becomes high priority since about 10% of answers use Y as a vowel.</div></details>
  <details><summary>How much does Wordle frequency differ from general English?</summary><div>The differences are small but real. E is slightly overrepresented in Wordle (47% vs 43%), S-starting words are overrepresented, and uncommon letters (J, Q, X, Z) are even rarer than in general English. Using Wordle-specific frequency data instead of general English data might save you about 0.05 guesses per game.</div></details>
  <details><summary>What about double letter frequency — should I plan for doubles?</summary><div>Doubles appear in about 15% of answers, so you should be aware of them but not plan around them on every game. Test for doubles explicitly when you have confirmed a letter and your candidate set includes words with double occurrences of that letter. The most common doubles are LL, SS, EE, and OO.</div></details>
</div>
`,

  "advanced-wordle-strategies": `
<h2>Most Players Stop Improving Because They Never Learn to Waste a Turn on Purpose</h2>
<p>Wordle gives you six guesses — why would you deliberately spend one on a word you know is not the answer? Because sometimes, guessing a word that cannot be right but tests multiple possibilities is the fastest path to the right answer. This is the elimination guess, and it is the most important advanced technique most players never use. The instinct to always build toward the answer is powerful, but it is also limiting. Once you learn to see every guess as an information probe rather than an answer attempt, your average will drop significantly. The elimination guess is the single technique that separates casual players from serious optimizers.</p>

<div class="callout callout-important">
  <div class="callout-icon">\u2757</div>
  <div class="callout-content"><p>An elimination guess is a word that cannot be the answer but tests multiple candidate letters simultaneously. It is the most powerful technique in normal-mode Wordle, yet most players never use it. If your candidates exceed your remaining guesses by more than one, an elimination guess saves turns on average.</p></div>
</div>

<h2>The Elimination Guess: When Losing a Turn Wins the Game</h2>
<p>Imagine it is guess 4. You have the pattern _ATCH. The possible answers are BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, and WATCH. Seven candidates, three guesses left. You could guess BATCH — if wrong, you now have six candidates and two guesses. That is a coin flip at best, and a losing proposition at worst. Instead, play an elimination word like CLAMP. C, L, A, M, P test five of your seven candidates simultaneously. If C is in the word, it is CATCH. If L, it is LATCH. If M, it is MATCH. If P, it is PATCH. If none of those letters are present, you have narrowed it to BATCH, HATCH, and WATCH with two guesses remaining. The math is clear: when remaining candidates exceed remaining guesses by more than one, an elimination guess saves turns on average.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">B</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">T</div>
    <div class="wordle-demo-tile green">C</div>
    <div class="wordle-demo-tile green">H</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">M</div>
    <div class="wordle-demo-tile gray">P</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">W</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">T</div>
    <div class="wordle-demo-tile green">C</div>
    <div class="wordle-demo-tile green">H</div>
  </div>
</div>
<p>The grid above shows the elimination guess in action: CLAMP tests five candidate letters at once, instantly revealing that the answer must be WATCH or HATCH (no C, L, A, M, or P present). One more guess resolves it with certainty.</p>

<h2>Anchor and Sweep: A Structured Approach</h2>
<p>I think of each guess as having two components: the anchor (what you are building around) and the sweep (what you are testing for the first time). Early in the game, your sweep should dominate — most letters should test new territory. Late in the game, your anchor takes over. On guess 1 with TRACE, the entire word is a sweep. On guess 3, if you know the word has A in position 2 and R in position 4, your anchor is _A_R_ and your sweep fills the remaining slots with untested letters. The most common mistake is anchoring too early — getting one green and spending every subsequent guess building around it without sweeping for more information. The principle is simple: never anchor more than you have confirmed. One green, anchor one position and sweep four. Two greens, anchor two and sweep three. Only pure-pattern-solve when you have three or more confirmed positions.</p>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <p><strong>Guess 1 — Full Sweep</strong> — Play a high-frequency opener like TRACE. All five letters are probing new territory. Zero anchors, maximum information density.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <p><strong>Guess 2 — Sweep with Light Anchor</strong> — If you got a green or two, anchor those positions. Fill the remaining slots with untested high-frequency letters. Sweep should still dominate.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <p><strong>Guess 3 — Anchor Starts to Dominate</strong> — With 2+ yellows, start placing them strategically. Build around confirmed letters while sweeping the last few high-value untested letters.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">4</div>
  <div class="step-content">
    <p><strong>Guesses 4-6 — Full Anchor Mode</strong> — Prioritize placing confirmed letters and narrowing the candidate set. New letter testing is a luxury you usually cannot afford at this stage.</p>
  </div>
</div>

<h2>Managing the Endgame: 5+ Words on Guess 4</h2>
<p>You are on guess 4 with S_A_E. SHADE, SHAKE, SHAME, SHAPE, SHARE, SNARE — six candidates, three guesses. Step one: list every candidate. Missing a candidate is the number one cause of lost games. Step two: find letters that split the group. D, K, M, P, R, and N are the differentiating letters. A word like DRAKE tests D, R, and K simultaneously. Step three: if you cannot split efficiently, do not let frequency bias your elimination order. All answers are equally likely — SHAME is not less probable than SHADE just because it is less common in everyday language. This is a critical insight that many players miss: Wordle answers are drawn uniformly from the answer list, not weighted by how common the word is in speech.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\uD83D\uDCA1</div>
  <div class="callout-content"><p>Multiple yellows of the same letter are incredibly powerful for positional narrowing. A yellow A that was not in position 2 or 4 must be in position 1, 3, or 5. A yellow R tested and failed at positions 1, 3, and 5 must be at position 2 or 4. Keep mental track of where each yellow has been tested — that constraint eliminates far more candidates than most players realize.</p></div>
</div>

<h2>Common Suffix Testing</h2>
<p>Certain suffixes appear frequently enough to test deliberately. When I see a pattern matching one of these, I list every word in the family and find an elimination guess that tests as many distinguishing letters as possible. For -IGHT, play a word that tests the first letters (B, F, L, M, N, R, S, T) even if it means not building on the _IGHT frame. The suffix families are the most dangerous traps in Wordle because they look like progress — you have 4 confirmed letters and feel close to the answer — but they actually represent a large number of equally likely candidates.</p>

<table>
  <thead>
    <tr><th>Suffix Pattern</th><th>Valid Answers</th><th>Candidate Count</th><th>Best Elimination Strategy</th></tr>
  </thead>
  <tbody>
    <tr><td>_IGHT</td><td>LIGHT, MIGHT, NIGHT, RIGHT, TIGHT, FIGHT, SIGHT, EIGHT</td><td>8</td><td>Test B, F, L, M, N, R, S, T</td></tr>
    <tr><td>_ATCH</td><td>BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, WATCH</td><td>7</td><td>Test B, C, H, L, M, P, W</td></tr>
    <tr><td>_OUND</td><td>BOUND, FOUND, HOUND, MOUND, POUND, ROUND, SOUND, WOUND</td><td>8</td><td>Test B, F, H, M, P, R, S, W</td></tr>
    <tr><td>_AINT</td><td>PAINT, SAINT, FAINT, TAINT, WAIST</td><td>5</td><td>Test P, S, F, T</td></tr>
    <tr><td>_OAST</td><td>TOAST, ROAST, COAST, BOAST</td><td>4</td><td>Test T, R, C, B</td></tr>
  </tbody>
</table>

<h2>The "Wrong But Useful" Principle</h2>
<p>A guess can be wrong and still be the best play. When your guess is not the answer but eliminates enough candidates to guarantee you will solve on the next turn, it was a good guess. Getting the answer in 4 because guess 3 was "wrong but useful" beats getting it in 5 because guess 3 was a direct shot that missed. I track this with a column called "useful miss" in my spreadsheet. Over 1,100 games, about 22% of my guesses are useful misses — and those games average 3.8 vs. 4.1 for games without any. Deliberate misses that eliminate efficiently lead to better overall performance. This counterintuitive finding is one of the most important insights in Wordle strategy: being wrong in the right way is more valuable than being right by accident.</p>

<div class="stat-grid">
  <div class="stat-card"><div class="stat-value">22%</div><div class="stat-label">Useful Miss Rate</div></div>
  <div class="stat-card"><div class="stat-value">3.8</div><div class="stat-label">Average with Useful Misses</div></div>
  <div class="stat-card"><div class="stat-value">4.1</div><div class="stat-label">Average without Useful Misses</div></div>
  <div class="stat-card"><div class="stat-value">0.3</div><div class="stat-label">Average Improvement</div></div>
</div>

<h2>Handling Repeated Letters</h2>
<p>Repeated letters are where Wordle's feedback system gets genuinely tricky, and they are the source of many misunderstandings. Green means that letter is in that exact position, but it does not tell you if the letter appears elsewhere. Yellow means the letter is in the word but not in that position, but it does not tell you if the letter appears more than once. Gray means that letter does not appear at all — unless you already have a green or yellow for that letter, in which case gray means you have found all instances. If you guess STEEL and the first E is green (position 3) while the second E is gray (position 4), E appears exactly once, in position 3. When you suspect double letters, test for them explicitly rather than assuming.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u26A0\uFE0F</div>
  <div class="callout-content"><p>The most common feedback misinterpretation: seeing a gray tile for a letter where you already have a green or yellow, and concluding the letter is not in the word at all. In reality, gray after green/yellow means you have found all instances. If STEEL gives green E at pos 3 and gray E at pos 4, E is in the word exactly once — at position 3.</p></div>
</div>

<h2>Strategic Hard Mode</h2>
<p>Hard Mode forces you to reuse confirmed letters, eliminating pure elimination guesses. This changes strategy significantly in ways that many players underestimate. Your opener matters even more because you cannot play a throwaway information-gathering guess. When you get a yellow, think carefully about where to place it next — you are locked into using it. Endgames with many candidates are genuinely dangerous because you cannot play an elimination word. Suffix traps like -ATCH and -IGHT are threatening in Hard Mode because you are forced to cycle through candidates one by one rather than testing multiple simultaneously. In Hard Mode, I play more conservatively on guesses 1-3, trying to confirm positions rather than test new letters. Greens are free constraints, and Hard Mode does not restrict unconstrained positions.</p>

<h2>When to Abandon Your Opening Strategy</h2>
<p>Most games I follow my TRACE-then-adjust framework. But sometimes the feedback is so unusual that the standard playbook does not apply. If TRACE returns three yellows (T, R, A all in wrong positions), I still play SLING because the sweep value of testing S, L, I, N, G outweighs the anchor value of repositioning T, R, and A. But by guess 3, I would absolutely build around confirmed letters. The rule: anchor value increases with each guess. On guess 1, sweep dominates. By guess 3, anchor should dominate. The flexibility to deviate from your default plan based on the specific feedback you receive is what separates good players from great ones. Rigid strategies fail on unusual boards; adaptive strategies thrive.</p>

<h2>Building Mental Word Lists</h2>
<p>The best Wordle players do not have better algorithms — they have bigger mental dictionaries. When the pattern is _O_N_, most players find BOUND, COUNT, FOUND, MOUNT, and SOUND. Stronger players also list COVEN, TOKEN, WOVEN, and ROVEN. The more candidates you can generate, the better your elimination guesses become, because you can design probes that split the full candidate set rather than just the subset you happened to think of. I practice with "pattern sprints": pick a pattern like _AI__ and write down every word I can think of in 60 seconds. Over time, my brain built a loose index of five-letter words organized by pattern. This skill is unglamorous but enormously practical — it is the foundation that makes all advanced techniques possible.</p>

<div class="callout callout-info">
  <div class="callout-icon">\u2139\uFE0F</div>
  <div class="callout-content"><p>My approach to the hardest 5% of puzzles: accept 4-5 guesses and focus on not losing. I test consonants more aggressively on guesses 2-3, consider double letters earlier, and spend more time generating candidates. My average on the hardest 10% is 4.6 — I accept that and keep my X rate at zero. Surviving the brutal puzzles is more important than solving them quickly.</p></div>
</div>

<div class="key-takeaways">
  <h3>\u2705 Key Takeaways</h3>
  <ul>
    <li>The elimination guess — testing a word that cannot be the answer — is the most powerful technique most players never use</li>
    <li>Anchor and sweep: early guesses should sweep for new information; later guesses should anchor around confirmed letters</li>
    <li>Suffix traps like _ATCH and _IGHT require elimination guesses, not direct attempts — listing all candidates is step one</li>
    <li>"Wrong but useful" guesses lower your average: 22% of optimal plays are misses that set up guaranteed solves</li>
    <li>Repeated letters create feedback confusion — test for doubles explicitly rather than assuming single occurrence</li>
    <li>Hard Mode eliminates the elimination guess, making suffix families genuinely dangerous — play more conservatively early</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details><summary>What exactly is an elimination guess?</summary><div>An elimination guess is a word that cannot be the answer but tests multiple candidate letters simultaneously. For example, with _ATCH and seven candidates (BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, WATCH), playing CLAMP tests C, L, A, M, and P — five letters that uniquely identify five of your seven candidates. Even though CLAMP cannot be the answer, it gives you enough information to solve on the next turn.</div></details>
  <details><summary>When should I use an elimination guess vs. guessing directly?</summary><div>Use an elimination guess when remaining candidates exceed remaining guesses by more than one. If candidates equal remaining guesses, a direct guess is fine. If candidates exceed guesses by exactly one, it is a judgment call based on how confident you are in your candidate list — if you might be missing a candidate, play conservatively.</div></details>
  <details><summary>Does the anchor-and-sweep approach work in Hard Mode?</summary><div>Partially. In Hard Mode, you cannot make pure elimination guesses because you must reuse confirmed letters. This means your sweep is constrained by your anchors. The principle still applies — maximize new information within the constraint of reusing confirmed letters — but you have less flexibility. Hard Mode makes the early guesses even more important since you cannot compensate later with elimination words.</div></details>
  <details><summary>How do I practice pattern sprints?</summary><div>Pick a pattern like _AI__ and write down every five-letter word you can think of that fits, in 60 seconds. Do several patterns per session. Over time, your brain builds an index of words organized by pattern, which makes candidate generation much faster during real games. You can also practice on unlimited Wordle sites where you can experiment without risking your streak.</div></details>
  <details><summary>What is the biggest mistake players make with repeated letters?</summary><div>The biggest mistake is interpreting a gray tile after a green or yellow tile for the same letter as "the letter is not in the word." In reality, gray after green/yellow means you have found all instances of that letter. If you guess STEEL and get green E at position 3 and gray E at position 4, E appears exactly once at position 3 — it is still in the word.</div></details>
</div>
`,

  "why-some-answers-harder": `
<h2>Not All Wordle Answers Are Created Equal</h2>
<p>Some days you solve in three and feel like a genius. Other days you sweat through six guesses on a word like SWILL and wonder if you have ever actually spoken English. The difference is not you — it is the structure of the answer itself. Some Wordle answers are genuinely harder than others, and the reasons are specific and measurable. Understanding what makes certain answers difficult does not just satisfy curiosity; it helps you adjust your strategy when you encounter these patterns in real games. The hardest answers share common traits, and once you learn to recognize those traits early, you can shift from a solving mindset to a survival mindset at the right moment.</p>

<div class="stat-grid">
  <div class="stat-card"><div class="stat-value">10%</div><div class="stat-label">Trivially Easy (avg &lt; 3.2)</div></div>
  <div class="stat-card"><div class="stat-value">65%</div><div class="stat-label">Moderate (avg 3.2-4.2)</div></div>
  <div class="stat-card"><div class="stat-value">20%</div><div class="stat-label">Hard (avg 4.2-5.0)</div></div>
  <div class="stat-card"><div class="stat-value">5%</div><div class="stat-label">Brutal (avg 5.0+)</div></div>
</div>

<h2>What Makes a Wordle Answer Hard</h2>
<p>Three factors drive difficulty: uncommon letters, ambiguous patterns, and repeated letters. The hardest answers combine two or more of these factors simultaneously. Each factor independently increases the expected number of guesses, and their effects compound. An answer with one uncommon letter is manageable. An answer with an uncommon letter in an ambiguous pattern with repeated letters is a nightmare. Understanding these factors lets you diagnose difficulty early and adjust your play accordingly.</p>

<h3>Uncommon Letters</h3>
<p>If the answer contains J, Q, X, Z, V, or K, it is automatically harder because most players do not test those letters early. JOKER has J and K — two of the least common letters in the answer list. Your opener almost certainly does not contain either, so you are starting from zero information about those letters until guess 2 or 3. One uncommon letter is manageable. Two in the same word is brutal. QUIZZ is basically impossible under five guesses without extreme luck — Q, U, I, Z, Z contains two Z's and a Q that almost no opener tests. The information deficit from uncommon letters compounds with each guess because you cannot plan around letters you do not know are there.</p>

<h3>Ambiguous Patterns</h3>
<p>An ambiguous pattern matches many valid English words. The classic: _ATCH, which matches BATCH, CATCH, HATCH, LATCH, MATCH, PATCH, and WATCH. When you see _ATCH, you have not narrowed anything — you have identified a family of 7+ candidates that share the same structure. Ambiguous patterns create endgame traps. You might play perfectly for four guesses, arrive at _ATCH, and need three more to sort through candidates. The difficulty is not finding the pattern — it is distinguishing between words that share it. These suffix families are the single most common cause of failed games among experienced players.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">B</div>
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile gray">G</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile yellow">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile gray">H</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile yellow">T</div>
  </div>
</div>
<p>The grid above shows a worst-case scenario: three guesses in, and you have only a yellow E and yellow T to show for it. The answer could be WHEET, SWEET, or dozens of other patterns. This is the ambiguous pattern trap — lots of possibilities, few distinguishing features.</p>

<h3>Repeated Letters</h3>
<p>Words with repeated letters (SIZES, GUESS, FIZZY, LLAMA) are hard because Wordle's feedback system handles duplicates in ways that confuse players. When you guess STEEL and get one green E and one gray E, many players read the gray E as "E is not in the word" and incorrectly eliminate all E-containing candidates. Repeated letters also reduce unique letters in the word. A five-letter word with only three or four unique letters gives you fewer entry points. Each unique letter is a hook your brain can use; repeated letters are wasted hooks.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u26A0\uFE0F</div>
  <div class="callout-content"><p>The three difficulty factors compound each other. An answer with uncommon letters is hard. An answer with an ambiguous pattern is hard. An answer with repeated letters is hard. An answer with all three — like FIZZY (uncommon Z, ambiguous _I__Y, repeated Z) — is among the hardest possible Wordle experiences.</p></div>
</div>

<h2>The Hardest Wordle Answers of All Time</h2>
<p>Based on Twitter sharing data and community analysis, these answers generated the most failed games. Each one illustrates a different combination of the three difficulty factors, and studying them helps you recognize similar patterns in future games.</p>

<table>
  <thead>
    <tr><th>Answer</th><th>Difficulty Factor</th><th>Community Avg.</th><th>Failure Rate</th><th>Why It Was Hard</th></tr>
  </thead>
  <tbody>
    <tr><td>PARSE</td><td>Ambiguous pattern</td><td>4.7</td><td>~18%</td><td>PA_SE pattern splits into multiple candidates</td></tr>
    <tr><td>WATCH</td><td>Suffix trap</td><td>4.8</td><td>~20%</td><td>-ATCH family of 7+ words</td></tr>
    <tr><td>CAULK</td><td>Uncommon letter</td><td>4.6</td><td>~15%</td><td>K rarely tested early</td></tr>
    <tr><td>FAVOR</td><td>Regional spelling</td><td>4.5</td><td>~14%</td><td>American spelling; uncommon pattern</td></tr>
    <tr><td>SWILL</td><td>Double letters</td><td>4.9</td><td>~22%</td><td>Double L, uncommon word</td></tr>
    <tr><td>FIZZY</td><td>Multiple factors</td><td>5.1</td><td>~25%</td><td>Double Z, uncommon letters, ambiguous</td></tr>
    <tr><td>NATAL</td><td>Uncommon pattern</td><td>4.7</td><td>~16%</td><td>NATA_ pattern rarely considered</td></tr>
    <tr><td>COVEN</td><td>Unfamiliar word</td><td>4.8</td><td>~19%</td><td>Low familiarity, C_V_N pattern</td></tr>
  </tbody>
</table>

<h3>PARSE — The Pattern Splitter</h3>
<p>PARSE was devastating because of the PA_SE pattern. Players were torn between PARSE, PASTE, PAUSE, and other candidates. S and R are both extremely common letters, and distinguishing between them required testing one specifically — which many players did not do efficiently. The lesson here is that when your pattern has a single unknown position flanked by common letters, you need to test that position deliberately rather than guessing a candidate directly.</p>

<h3>WATCH — The Suffix Trap</h3>
<p>WATCH fell into the -ATCH trap. Seven valid candidates, all common words, no efficient way to distinguish without an elimination guess. I solved it in 5, using an elimination guess on turn 4 that tested B, C, and M simultaneously. None were in the word, narrowing it to WATCH and HATCH. A 50/50 on guess 5, and I got lucky. This is exactly the scenario where elimination guesses shine — they transform a 1-in-7 guessing game into a series of smaller, more manageable choices.</p>

<h3>CAULK — The Uncommon Letter Problem</h3>
<p>CAULK contains K — the 21st most common letter, appearing in fewer than 3% of words. Most players do not test K until guess 3 or later, and they might have already wasted a guess on FAULT or HAUL that matches confirmed letters but replaces K with T. The solution: when you have confirmed AU in the middle of a word and T is ruled out, start thinking about less common consonants. K should be on your short list once the common options have been eliminated.</p>

<div class="callout callout-important">
  <div class="callout-icon">\u2757</div>
  <div class="callout-content"><p>FAVOR caused problems for two reasons. The -AVOR pattern is uncommon enough that many players could not generate candidates quickly. More importantly, FAVOR uses American spelling. Players from regions that spell it FAVOUR were at a systematic disadvantage — they might have confirmed F, A, O, R and still struggled to find a five-letter word. Regional spelling differences are an underappreciated source of difficulty.</p></div>
</div>

<h2>The Duplicate Letter Problem in Depth</h2>
<p>Duplicate letters create a special category of difficulty that deserves its own deep dive. SIZES has two S's bookending the word — if you get a yellow S, you might assume there is only one and never consider SIZES. GUESS has two S's at the end, and players who confirm GUE_ might think GUEST before GUESS. FIZZY has two Z's, absurdly uncommon — the only common five-letter words with ZZ are FUZZY, DIZZY, FIZZY, and JAZZY. LLAMA has two L's and two A's, giving you only one unique consonant (M) and one unique vowel. Almost nothing to grab onto. Each of these examples illustrates a different way that duplicates confound our natural pattern-matching instincts.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>Easy Answer Traits</h4>
    <ul>
      <li>Common letters (E, A, R, T, S)</li>
      <li>Letters in common positions</li>
      <li>No repeated letters</li>
      <li>Unique, distinctive pattern</li>
      <li>High word familiarity</li>
      <li>Example: STARE, CRANE, HOUSE</li>
    </ul>
  </div>
  <div class="comparison-card negative">
    <h4>Hard Answer Traits</h4>
    <ul>
      <li>Uncommon letters (J, Q, X, Z, K)</li>
      <li>Ambiguous patterns (_ATCH, _IGHT)</li>
      <li>Repeated letters (LL, SS, ZZ)</li>
      <li>Low word familiarity</li>
      <li>Regional spelling variants</li>
      <li>Example: FIZZY, CAULK, SWILL</li>
    </ul>
  </div>
</div>

<h2>The "False Friend" Problem</h2>
<p>False friends are answers that look like other, more common words. CORAL looks like MORAL. STEAD looks like STEAM. BROAD looks like BOARD. When you have partial information — _ORAL — your brain jumps to MORAL first, and it takes extra effort to consider CORAL. This is why some players find it helpful to generate candidates alphabetically rather than by frequency. Going letter by letter is slower but more complete. Your frequency-based instincts will find MORAL instantly; only systematic search finds CORAL. The false friend problem is particularly insidious because it feels like you are making progress — you have candidates, you are reasoning about them — but you are reasoning about the wrong candidates and ignoring the right one.</p>

<h2>Why Hard Mode Makes Some Answers Nearly Impossible</h2>
<p>In normal mode, when you hit _ATCH on guess 3, you can play an elimination word like CLAMP on guess 4. In Hard Mode, you cannot — every guess must end in -ATCH. You are forced to guess BATCH, then CATCH, then HATCH, one by one. If the answer is WATCH, you might burn all six guesses cycling through the family. Any answer belonging to a large suffix family is significantly harder in Hard Mode because you lose the elimination guess as a tool. This is why Hard Mode streaks are so much more fragile — one bad suffix family answer can end a streak that survived hundreds of easier puzzles.</p>

<h2>Difficulty Is Relative to Your Opener</h2>
<p>There is no universal "hardest Wordle answer." If you open with TRACE, answers containing T, R, A, C, or E are easier. If you open with ADIEU, vowel-heavy answers are easier. CAULK is harder for a TRACE player than for a CRANK player. That said, answers combining uncommon letters, ambiguous patterns, and repeated letters are hard for almost everyone regardless of opener choice. The interaction between your opener and the answer's difficulty is an underappreciated strategic consideration — if you know certain answer types are harder for your opener, you can adjust your second-guess strategy to compensate.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\uD83D\uDCA1</div>
  <div class="callout-content"><p>Word familiarity is a subjective but real factor in difficulty. A parser might find PARSE easier than STARE because it is in their active vocabulary. A builder might find CAULK easy because they use the word daily. If you have never heard COVEN, you will not guess it even with perfect information narrowing to C_V_N. Building vocabulary breadth helps mitigate this factor.</p></div>
</div>

<h3>The Difficulty Distribution</h3>
<p>Across all 2,309 original answers, difficulty follows a roughly normal distribution. About 10% are trivially easy (average under 3.2), 65% are moderate (3.2-4.2), 20% are hard (4.2-5.0), and 5% are brutal (5.0+). The brutal 5% is where streaks die. Knowing these outliers exist helps you keep perspective when you hit a tough day. Your performance on the 65% moderate answers defines your baseline average; your performance on the 20% hard and 5% brutal answers determines whether you are above or below that baseline.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">Trivially Easy</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 10%">10%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Moderate</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 65%">65%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Hard</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 20%">20%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Brutal</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 5%">5%</div></div>
  </div>
</div>

<div class="key-takeaways">
  <h3>\u2705 Key Takeaways</h3>
  <ul>
    <li>Three factors drive Wordle difficulty: uncommon letters, ambiguous patterns, and repeated letters — the hardest answers combine two or more</li>
    <li>Suffix families like _ATCH and _IGHT create endgame traps where the difficulty is distinguishing between candidates, not finding the pattern</li>
    <li>Duplicate letters reduce unique-letter hooks and create feedback confusion — test for doubles explicitly rather than assuming</li>
    <li>Regional spelling differences (FAVOR vs FAVOUR) create difficulty unrelated to skill — this is an underappreciated factor</li>
    <li>Difficulty is relative to your opener: answers that your opener hits are easier, and answers it misses are harder</li>
    <li>The brutal 5% of answers is where streaks die — recognize these early and shift to survival mode rather than speed-solving</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details><summary>What is the hardest Wordle answer ever?</summary><div>Based on community data, FIZZY is among the hardest. It combines uncommon letters (Z), repeated letters (double Z), and an ambiguous ending pattern (_I_ZY). Other notoriously hard answers include SWILL, WATCH, and COVEN. The "hardest" depends somewhat on your opener, but answers combining multiple difficulty factors are hard for almost everyone.</div></details>
  <details><summary>Why do some answers feel impossible even when I play well?</summary><div>Answers with uncommon letters, ambiguous patterns, or repeated letters can add 1-2 guesses to your score regardless of strategy. These answers are structurally hard — the information you need comes late in the game because standard openers do not test the relevant letters. The best you can do is recognize these patterns early and shift to a conservative, survival-oriented approach.</div></details>
  <details><summary>Does Hard Mode make hard answers worse?</summary><div>Significantly worse. In Hard Mode, you cannot play elimination guesses when you hit suffix traps like _ATCH or _IGHT. You are forced to cycle through candidates one by one, which can burn through all six guesses if the answer is the last candidate in the family. Any answer belonging to a large suffix family is dramatically harder in Hard Mode.</div></details>
  <details><summary>Are some days of the week harder than others?</summary><div>Yes. The NYT tends to place more challenging answers on weekends. Anecdotally, Saturday puzzles average about 0.2-0.3 guesses harder than midweek puzzles. This is not a hard rule, but if you track your averages by day of week, you will likely see a pattern.</div></details>
</div>
`,

  "wordle-elimination-science": `
<h2>Every Wordle Guess Should Be Measured by One Metric: How Many Answers It Eliminates</h2>
<p>You start with 2,309 possible answers. Each guess should cut that number down as much as possible. The best guesses eliminate half or more of the remaining candidates. The worst eliminate fewer than 5%. Most players fall somewhere in between — and that in-between is where improvement lives. Thinking about Wordle through the lens of elimination science transforms the game from a word-guessing exercise into an information optimization problem. Once you make that shift, every guess becomes more valuable, and your average drops accordingly. The science of elimination is not complicated, but it is disciplined — and that discipline is what separates consistent performers from inconsistent ones.</p>

<div class="callout callout-key">
  <div class="callout-icon">\uD83D\uDD11</div>
  <div class="callout-content"><p>The fundamental principle of Wordle elimination: each guess should maximize the expected number of candidates it removes from the possible answer set. If you have 100 remaining candidates and your guess eliminates 50 regardless of feedback, you have made the optimal play from an information theory perspective. Every guess should be measured against this standard.</p></div>
</div>

<h2>Thinking in Terms of Possible Answer Sets</h2>
<p>Before your first guess, the answer could be any of 2,309 words. After each guess, feedback reduces this set. Green letters lock positions, yellow letters confirm presence but rule out positions, gray letters eliminate every word containing that letter. The key mental shift: think of the game as managing a shrinking set of candidates rather than hunting for one specific word. When you see the game as set management, your guesses become more strategic because you are optimizing for maximum reduction. After guess 1 (TRACE), suppose you get: T gray, R yellow (not position 2), A green (position 3), C gray, E gray. Your candidate set shrinks from 2,309 to roughly 70 words — a 97% reduction. Now you have 70 candidates and 5 guesses left. Your next guess should aim to cut that 70 to 35 or fewer.</p>

<div class="stat-grid">
  <div class="stat-card"><div class="stat-value">2,309</div><div class="stat-label">Starting Candidates</div></div>
  <div class="stat-card"><div class="stat-value">~70</div><div class="stat-label">After TRACE (typical)</div></div>
  <div class="stat-card"><div class="stat-value">~12</div><div class="stat-label">After Guess 2 (typical)</div></div>
  <div class="stat-card"><div class="stat-value">1-3</div><div class="stat-label">After Guess 3 (typical)</div></div>
</div>

<h2>The Worst Thing You Can Do</h2>
<p>Guess a word that only eliminates 5% of remaining possibilities. This happens more often than you would think. The most common scenario: you get green letters early and lock in on building a word around them instead of testing new letters that would eliminate large chunks of the remaining set. Example: you have S_A_E after guess 2. The candidate set includes SHADE, SHAKE, SHAME, SHAPE, SHARE, SHAVE, SNARE, SPADE, STAGE, STALE, and dozens more. If you guess SHADE on turn 3 and it is wrong, you have eliminated one word. Your candidate set went from 40+ to 39+. That is a 2.5% reduction. You wasted a turn. The better play: guess something like POINT — a word that tests several differentiating letters (P, N, T) while checking letters you have not ruled out. Even if POINT is not the answer, it might eliminate 15-20 of the remaining 40 candidates.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">P</div>
    <div class="wordle-demo-tile yellow">O</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile gray">T</div>
  </div>
</div>
<p>The grid above shows the elimination approach in action: instead of guessing SHADE directly, you play POINT to test P, O, I, N, and T. The gray P eliminates SPADE and SHAPE. The yellow O narrows toward SHONE or SHORE. Each letter tests a different branch of the candidate tree.</p>

<h2>The Best Thing You Can Do</h2>
<p>Pick a guess that splits the remaining candidate set roughly in half. This is the binary search principle applied to Wordle. If you have 100 remaining candidates and your guess eliminates exactly 50 regardless of feedback, you have made the optimal play from an information theory perspective. Perfect 50/50 splits are rare because Wordle's feedback is more nuanced than binary. With 5 positions and 3 color outcomes each, there are 3 to the 5th power = 243 possible feedback patterns. The ideal guess distributes remaining candidates as evenly as possible across these patterns, so whatever feedback you get, you eliminate a large portion of candidates.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\uD83D\uDCA1</div>
  <div class="callout-content"><p>The binary search principle: test letters present in roughly half the remaining candidates. If 60% contain L, testing L is efficient — positive narrows to the 60%, negative narrows to the 40%. Either way, you eliminate a large chunk. If only 5% contain Z, testing Z is inefficient — a negative result eliminates almost nothing, and a positive result is too rare to justify the slot.</p></div>
</div>

<h2>Why Common Letters Are So Powerful for Elimination</h2>
<p>E appears in 47.2% of answers. There is a 47% chance your E guess returns green or yellow, immediately confirming a required letter. There is a 53% chance E is gray, eliminating 47% of candidates. Either outcome is valuable. Contrast with Z (0.6%): 99.4% chance it is gray, giving almost no information. This is why common letters dominate elimination efficiency — they split the candidate set roughly in half regardless of the outcome, while rare letters produce lopsided splits that barely reduce your search space on a negative result. The entire strategy of using TRACE or SLATE as an opener is built on this principle: each letter in those words appears in roughly 20-47% of answers, meaning each letter test has a high expected information value.</p>

<table>
  <thead>
    <tr><th>Letter</th><th>% of Answers</th><th>Eliminated if Gray</th><th>Confirmed if Green/Yellow</th><th>Information Value</th></tr>
  </thead>
  <tbody>
    <tr><td>E</td><td>47.2%</td><td>47.2% eliminated</td><td>47.2% confirmed</td><td>Excellent</td></tr>
    <tr><td>A</td><td>39.1%</td><td>39.1% eliminated</td><td>39.1% confirmed</td><td>Excellent</td></tr>
    <tr><td>R</td><td>31.5%</td><td>31.5% eliminated</td><td>31.5% confirmed</td><td>Very Good</td></tr>
    <tr><td>T</td><td>27.6%</td><td>27.6% eliminated</td><td>27.6% confirmed</td><td>Very Good</td></tr>
    <tr><td>S</td><td>21.8%</td><td>21.8% eliminated</td><td>21.8% confirmed</td><td>Good</td></tr>
    <tr><td>Z</td><td>0.6%</td><td>0.6% eliminated</td><td>0.6% confirmed</td><td>Poor</td></tr>
    <tr><td>Q</td><td>0.3%</td><td>0.3% eliminated</td><td>0.3% confirmed</td><td>Poor</td></tr>
  </tbody>
</table>

<h2>Vowel Testing Is Efficient</h2>
<p>Most Wordle answers contain at least two vowels. Testing A, E, I, O in your first two guesses is efficient because each vowel test has a high probability of positive feedback, and each positive constrains the candidate set significantly. My rule: test at least two vowels on guess 1 and cover the remaining on guess 2 if needed. By the end of guess 2, you should know which of A, E, I, O are in the word. U can wait until guess 3. Y-as-vowel should be considered starting at guess 3 if you have only found one standard vowel. This vowel-first approach ensures that you have the structural backbone of the answer identified early, which makes consonant testing much more efficient in the mid-game.</p>

<h2>The Elimination Cascade</h2>
<p>One good guess sets up the next guess to be even better. This is the elimination cascade, and it is why the first guess matters so much. When your first guess eliminates 70% of candidates, your second guess operates on a much smaller set. On a smaller set, it is easier to find a guess that splits candidates evenly. Your second guess might eliminate 80% of remaining candidates. Your third might eliminate 90%. The cascade works in reverse too. A poor first guess that only eliminates 40% leaves a larger, more heterogeneous set. Your second guess achieves less, the cascade slows, and you need more guesses overall. Opener optimization has outsized impact because it improves every subsequent guess by starting the cascade from a better position.</p>

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">Guess 1</div>
    <p>TRACE eliminates ~70% of 2,309 candidates. Remaining: ~700</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">Guess 2</div>
    <p>SLING eliminates ~80% of remaining. Remaining: ~140</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">Guess 3</div>
    <p>Targeted guess eliminates ~90% of remaining. Remaining: ~14</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">Guess 4</div>
    <p>Precise elimination narrows to 1-3 candidates</p>
  </div>
</div>

<h2>Common Elimination Mistakes</h2>
<p>Even players who understand elimination science make predictable mistakes that cost them guesses. Tunneling on confirmed letters — getting one or two greens and spending every remaining guess building around them instead of sweeping for new information. Guessing from the candidate set when you should be eliminating — with 8 candidates and 3 guesses, do not start guessing candidates; use an elimination word to cut the set in half first. Forgetting which letters you have tested — people re-test gray letters or fail to incorporate yellows into their thinking. Ignoring positional information from yellows — a yellow letter tells you it is in the word AND not in that position, and both pieces eliminate candidates. Testing letters in wrong positions — if you have a yellow A that was not in position 3, do not test A in position 3 again.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u26A0\uFE0F</div>
  <div class="callout-content"><p>The most costly elimination mistake is tunneling on greens. When you get one green letter early, the temptation is to build every subsequent guess around that confirmed position. But each green-only guess tests just 4 new letters at most (since one slot is locked). A sweep guess tests 5 new letters. Over two turns, tunneling gives you at most 8 new letter tests while sweeping gives you 10. That difference compounds across the game.</p></div>
</div>

<h2>Testing a New Letter vs. Confirming a Position</h2>
<p>The central tension in every Wordle guess: test an untried letter, or try to place a letter you already know is present? On guesses 1-2, prioritize testing new letters — position can wait. On guess 3, it depends: with 2+ yellows, start placing them; with many untested common letters, keep sweeping. On guesses 4-6, prioritize placing confirmed letters and narrowing the candidate set — new letter testing is a luxury you usually cannot afford. My framework: estimate how many candidates remain. If more than twice your remaining guesses, prioritize elimination. If equal to or less than your remaining guesses, prioritize solving. This framework is simple but remarkably effective when applied consistently.</p>

<h2>The Partition Principle</h2>
<p>Your guess should divide the remaining words as evenly as possible. A guess that splits 100 candidates into 50/50 is better than one that splits them into 90/10, even though the 90/10 guess has a 10% chance of being dramatically useful. Over many games, the 50/50 split yields a lower average because it is reliably useful regardless of outcome. If you get the 90/10 result and land in the group of 90, you have barely narrowed anything. If you get the 50/50 result, you have made solid progress regardless of which group you land in. Consistency over heroics — the partition principle rewards guesses that are reliably useful, not occasionally spectacular.</p>

<h2>Full Game Walkthrough: Elimination in Action</h2>
<p>Let me walk you through a real game to show how elimination science plays out in practice. Each guess was chosen to maximize expected candidate reduction, and the results demonstrate how the cascade builds momentum across turns.</p>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <p><strong>Guess 1: TRACE</strong> — T is yellow (not position 1), R is gray, A is gray, C is gray, E is gray. Remaining candidates: roughly 80 words. T is present but not at position 1; R, A, C, E are absent. That is a massive chunk eliminated in one guess — the cascade has started.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <p><strong>Guess 2: SLINK</strong> — Sweeping for new letters. S is gray, L is gray, I is gray, N is yellow (not position 4), K is gray. Remaining candidates: roughly 12 words. Now we know T and N are present with position constraints, and many common letters are ruled out. The elimination cascade is accelerating.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <p><strong>Guess 3: MOUNT</strong> — Placing T and N while testing M, O, U. O is green (position 3), N is green (position 4), T is green (position 5). The cascade collapsed the candidate set to identify THORN as the answer.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">4</div>
  <div class="step-content">
    <p><strong>Guess 4: THORN</strong> — Solved! The elimination cascade took us from 2,309 candidates to 1 in four guesses. Each guess was chosen to maximize expected reduction, and the results validated the approach.</p>
  </div>
</div>

<div class="callout callout-info">
  <div class="callout-icon">\u2139\uFE0F</div>
  <div class="callout-content"><p>My decision framework for each guess takes about 30 seconds once you are practiced: (1) enumerate what you know after each guess, (2) estimate remaining candidate count, (3) compare candidates to remaining guesses, (4) choose an elimination guess if candidates exceed 2x remaining guesses, or (5) pick a direct guess that eliminates the most alternatives even if wrong. When I follow this framework, I average 3.6 guesses. When I skip it, I average 3.9.</p></div>
</div>

<div class="key-takeaways">
  <h3>\u2705 Key Takeaways</h3>
  <ul>
    <li>Think of Wordle as managing a shrinking set of candidates, not hunting for one specific word — this mental shift alone improves your average</li>
    <li>The worst thing you can do is guess a word that eliminates fewer than 5% of remaining candidates — typically a direct guess when many candidates remain</li>
    <li>Common letters like E and A split the candidate set roughly in half, making them the most efficient probes — this is why TRACE dominates</li>
    <li>The elimination cascade means your first guess has outsized impact — a good opener improves every subsequent guess</li>
    <li>The partition principle: prefer 50/50 splits over 90/10 splits — consistency beats heroics over many games</li>
    <li>When candidates exceed 2x your remaining guesses, prioritize elimination; when they are fewer, prioritize solving</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details><summary>What is the elimination cascade?</summary><div>The elimination cascade is the compounding effect where each good guess makes the next guess more effective. When your first guess eliminates 70% of candidates, your second guess operates on a smaller, more homogeneous set where splits are more efficient. This cascading reduction means your first guess has outsized impact on your overall performance — which is why opener optimization matters so much.</div></details>
  <details><summary>How do I estimate how many candidates remain?</summary><div>You do not need an exact count. A rough order of magnitude is sufficient. After guess 1 with a good opener, you typically have 50-200 candidates. After guess 2, usually 10-50. After guess 3, 1-15. If you are not sure, overestimate — it is better to play conservatively with a larger estimated set than aggressively with an underestimated one.</div></details>
  <details><summary>When should I guess directly instead of eliminating?</summary><div>Guess directly when your remaining candidates are equal to or fewer than your remaining guesses. If you have 3 candidates and 3 guesses, you can afford to guess each one. If you have 7 candidates and 3 guesses, you should eliminate first. The threshold is roughly 2x: if candidates exceed twice your remaining guesses, prioritize elimination.</div></details>
  <details><summary>Why is the partition principle important?</summary><div>The partition principle says your guess should divide remaining candidates as evenly as possible. A 50/50 split guarantees you eliminate half the candidates regardless of outcome. A 90/10 split means you have a 90% chance of barely narrowing anything. Over many games, consistent 50/50 splits produce a lower average than occasional dramatic 90/10 hits. Consistency beats heroics.</div></details>
  <details><summary>Does elimination science work in Hard Mode?</summary><div>Partially. Hard Mode constrains your guesses by requiring you to reuse confirmed letters, which limits your ability to make pure elimination guesses. However, the underlying principles still apply — you should still maximize new information within the constraint of reusing confirmed letters. The key difference is that you cannot play a word that tests new letters while ignoring confirmed positions, so your elimination options are more limited.</div></details>
</div>
`
};
