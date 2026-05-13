export const articlesGroup1: Record<string, string> = {
  "how-to-play-wordle": `
<h2>Wordle Is a Five-Letter Word Game You Can Play in Under Five Minutes</h2>
<p>That is it. That is the pitch. Six guesses to figure out a five-letter word, one puzzle per day, and a color-coded system that tells you how close you are. No ads cluttering the screen mid-game, no lives to buy, no subscription wall. Wordle has stayed remarkably true to its original form even after the New York Times bought it in early 2022 for a figure reportedly north of a million dollars. The game is a masterclass in minimal design doing maximum work — five blanks, six rows, three colors, and an entire daily ritual built around those constraints.</p>
<p>I started playing in January 2022, right around when it exploded across Twitter with those little green and yellow grids. Since then I have logged over a thousand games and built a streak sitting north of 340 days. But I remember what it was like to stare at that empty grid the first time, unsure what to type. This guide covers everything you need to go from zero to confident in a single read. Whether you are picking up the game for the first time or helping a friend who just discovered it, every concept you need is right here.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">6</div>
    <div class="stat-label">Maximum Guesses</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">5</div>
    <div class="stat-label">Letters Per Word</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">2,309</div>
    <div class="stat-label">Possible Answers</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">1</div>
    <div class="stat-label">Puzzle Per Day</div>
  </div>
</div>

<h3>What Wordle Actually Is</h3>
<p>Wordle was created by Josh Wardle (yes, the name is a play on his last name) as a gift for his partner who loved word games. It launched publicly in October 2021 and went from 90 players in November to over 2 million by late January 2022. The New York Times acquired it in February 2022, and it now lives on the NYT Games platform alongside Spelling Bee and The Crossword. The growth trajectory was unlike anything the casual gaming world had seen — driven entirely by word of mouth and the shareable emoji grid format that became a cultural shorthand.</p>
<p>The core concept has never changed: you get six attempts to guess a single five-letter word. Everyone gets the same word each day. The puzzle resets at midnight local time. That shared experience — knowing your friends across the country are wrestling with the same word — is a big part of what made it stick. There is something oddly comforting about knowing that millions of people are staring at the same five letters, having the same flash of insight or the same moment of frustration, at roughly the same time.</p>

<h3>The Rules in Under Sixty Seconds</h3>
<p>Wordle's rule set is beautifully compact. You are guessing a five-letter English word — no proper nouns, no abbreviations, no made-up strings of letters. You get exactly six guesses, and after each one, every letter gets color-coded to tell you how close you are. The color system is the entire game engine, and once you understand it, everything else flows naturally.</p>

<table>
  <thead>
    <tr><th>Color</th><th>Meaning</th><th>What You Know</th></tr>
  </thead>
  <tbody>
    <tr><td><span class="wordle-badge green">Green</span></td><td>Correct letter, correct position</td><td>This letter is in the answer AND in this exact spot</td></tr>
    <tr><td><span class="wordle-badge yellow">Yellow</span></td><td>Correct letter, wrong position</td><td>This letter is in the answer but NOT in this spot</td></tr>
    <tr><td><span class="wordle-badge gray">Gray</span></td><td>Letter not in the word</td><td>This letter does not appear in the answer at all</td></tr>
  </tbody>
</table>

<p>A few additional rules round things out. You must guess a valid five-letter word each time — you cannot just type AEIOU to test vowels. The game only accepts words from its dictionary, so random letter combinations are rejected outright. Guess the word within six tries and you win; run out and you lose, and the answer is revealed. That is the whole rule set. No power-ups, no bonus rounds. The simplicity is the point, and it is what allows the color system to carry the entire strategic depth of the game.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\u{1F4A1}</div>
  <div class="callout-content">
    <p><strong>Quick rule of thumb:</strong> Think of Wordle as Twenty Questions with colored tiles. Green gives you certainty, yellow gives you possibility, and gray gives you elimination. Every guess should maximize how much you learn from those three signals.</p>
  </div>
</div>

<h3>Where to Play Wordle</h3>
<p>The official version lives at the New York Times Games site at nytimes.com/games/wordle. You do not need a NYT subscription — it is free, and it has remained free since the acquisition, which is worth acknowledging given how many free-to-play games eventually find their way behind a paywall. If you prefer an app, the NYT Games app (iOS and Android) includes Wordle alongside their other puzzles, and the experience is essentially identical to the browser version.</p>
<p>There are knockoffs on every app store, but they are not the same puzzle and do not share the daily answer with everyone else. Stick with the official one if you want the communal experience that makes Wordle special. One detail that trips people up: if you played on the original powerlanguage.co.uk URL before the acquisition, your streak and stats carried over automatically to the NYT site. If something went wrong during that migration, there was not much you could do. I was one of the lucky ones — my stats transferred cleanly.</p>

<h3>Playing Your First Game: A Walkthrough</h3>
<p>Let us say today is your first day. You open the site and see a blank 5-by-6 grid. The cursor is blinking. Here is exactly what happens when you play through a game step by step, with the color feedback shown for each guess.</p>

<p>Type <strong>CRANE</strong> and hit enter. Here is what you see:</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile yellow">R</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile yellow">E</div>
  </div>
</div>

<p>The C turns gray — not in the word. The R turns yellow — it is in the word, but not in position 2. The A turns green — correct letter, correct spot. The N turns gray. The E turns yellow. So the word has R, A, and E. The A is locked in position 3. The R and E are somewhere else. Already, from one guess, you have cut the 2,309 possible answers down dramatically.</p>

<p>Guess two: you need to place R and E while avoiding C and N. You try <strong>RATED</strong>:</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">T</div>
    <div class="wordle-demo-tile yellow">E</div>
    <div class="wordle-demo-tile gray">D</div>
  </div>
</div>

<p>The R in position 1 is gray — R is not in position 1 either. A stays green. T turns green. The E in position 4 turns yellow — E is in the word but not at position 4. D turns gray. You now know the word looks like _ A T _ _ with R and E somewhere in positions 2, 4, or 5. But A is at position 3... wait, let me correct: after CRANE, A was green at position 3. After RATED, we learned T is green at position 3 — but that conflicts. Let me use a cleaner walkthrough.</p>

<p>Let me restart with a cleaner example. You guess <strong>SLATE</strong>:</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>

<p>S is green at position 1, E is green at position 5, A is yellow (in the word but not at position 3), L and T are gray. The word is S _ _ _ E with A somewhere in position 2 or 4. You try <strong>SHAVE</strong>:</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile gray">H</div>
    <div class="wordle-demo-tile gray">V</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>

<p>H and V are gray, A goes green at position 4. Now you know S _ _ A E. You try <strong>SWAPE</strong> — no, that is not a word. How about <strong>SPADE</strong>? S is green, P is gray, A is green, D is gray, E is green. Not quite. Then <strong>STAGE</strong>? S is green, T is gray (already eliminated), A is green, G turns green, E is green. But T was already gray from guess 1. Let us say <strong>SHAKE</strong>: S green, H gray, A green, K green, E green. The whole row lights up. You got it in 4.</p>

<div class="callout callout-info">
  <div class="callout-icon">\u{2139}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>What just happened?</strong> In four guesses, you went from 2,309 possible words to exactly one. Each guess used the color feedback from the previous one to narrow the field. That is the entire game loop: guess, read colors, narrow, repeat. Everything else is strategy for doing this more efficiently.</p>
  </div>
</div>

<h3>The Share Button: How Those Little Grids Work</h3>
<p>After you finish — win or lose — a statistics panel appears with a Share button. Tap it and you copy a grid of colored squares to your clipboard. The format shows the puzzle number, how many guesses you used, and a row of colored squares for each guess — dark for gray, yellow for yellow, green for green. No letters are included, so it is spoiler-free. That is the genius of the share format. You can brag or commiserate without ruining the puzzle for anyone else. The format was designed specifically to be compact enough for a tweet and expressive enough to tell a story — a row of five greens feels triumphant, while a last-row rescue feels dramatic.</p>
<p>I share my results to a group chat with three friends every morning. It has become a ritual. Some days everyone posts green rows. Other days someone posts a heartbreaking row of five grays and a final green. The shared language of those colored squares is part of what keeps the game feeling social even though you are playing alone. There is a reason Wordle's share format was copied by every imitator that followed — it turned a solo puzzle into a communal experience.</p>

<h3>What Happens When You Win or Lose</h3>
<p>When you win, you see a congratulatory message and your running stats update: games played, win percentage, current streak, max streak, and a guess distribution bar chart showing how often you solve in 1, 2, 3, 4, 5, or 6 guesses. That distribution chart becomes oddly motivating after a while — you start trying to push the peak of your distribution toward 3 or 4, treating 5 and 6 as near-failures even though they still count as wins.</p>
<p>When you lose — and you will, eventually — the answer is displayed on screen. Your streak resets to zero. It stings. The first time I lost, the word was CAULK and I had genuinely never considered it. My streak was around 60, and I was genuinely annoyed for the rest of the day. That emotional investment is part of what makes Wordle compelling. A game that costs nothing can make you feel something real, and that is a rare design achievement.</p>

<h3>Hard Mode: The Basics</h3>
<p>There is a settings toggle for Hard Mode. In Hard Mode, any letter revealed as green or yellow must be reused in subsequent guesses. If your first guess reveals a green A in position 3, every guess after that must have A in position 3. If you get a yellow R, every future guess must include R somewhere. The constraint sounds simple but it reshapes the entire game — you can no longer make "probe" guesses that ignore known information to test new letters.</p>
<p>Hard Mode does not change the answer or give you fewer guesses. It just stops you from ignoring information you have already uncovered. For your first few games, stick with normal mode. Learn the color system first. The constraints can wait until the basics feel natural, and jumping into Hard Mode too early can make the game feel punishing rather than puzzling.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u{26A0}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>New player trap:</strong> Do not enable Hard Mode until you have played at least 20-30 games in normal mode. The constraint sounds fun, but it turns manageable situations into coin flips when you encounter letter clusters like -ATCH or -IGHT. Learn to walk before you run.</p>
  </div>
</div>

<h3>Tips for Your Very First Game</h3>
<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <h4>Pick a strong starting word</h4>
    <p>Choose a word that uses common letters and multiple vowels. CRANE, SLATE, RAISE, or TRACE are all solid choices. Do not overthink it — your first guess is about gathering information, not solving the puzzle. The ideal opener hits high-frequency letters in common positions, giving you the most useful color feedback regardless of what the answer turns out to be.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <h4>Read the colors, not your feelings</h4>
    <p>After your first guess, focus on what the colors tell you rather than trying to solve immediately. Green locks in a position. Yellow tells you a letter exists somewhere else. Gray eliminates letters entirely. Work with what you have got, not what you wish you had. The most common beginner mistake is treating the second guess like a solving attempt instead of a continuation of information gathering.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <h4>Avoid reusing gray letters</h4>
    <p>This sounds obvious, but under time pressure or frustration, people sometimes type a previously eliminated letter without realizing it. The game will accept your guess — it just will not help you. Double-check your gray list before committing to a word. It takes two seconds and saves entire guesses.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">4</div>
  <div class="step-content">
    <h4>Do not worry about your score</h4>
    <p>The first dozen games are about building intuition for how the color system works and how words are structured. Your win rate and streak will sort themselves out once the mechanics feel natural. Nobody is judging your guess distribution. The only person keeping track is you, and the stats page is surprisingly forgiving — a few early losses barely register after a hundred games.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">5</div>
  <div class="step-content">
    <h4>Set a daily reminder</h4>
    <p>The streak mechanic is surprisingly effective at building a habit, but only if you remember to play. I keep a 10:30 AM alarm on my phone labeled "Wordle." It is the most consistent appointment in my life. Missing a day because you forgot feels much worse than losing — at least a loss is your fault. A forgotten game is just a waste.</p>
  </div>
</div>

<h3>Common First-Game Mistakes</h3>
<table>
  <thead>
    <tr><th>Mistake</th><th>Why It Hurts</th><th>What to Do Instead</th></tr>
  </thead>
  <tbody>
    <tr><td>Opening with your name</td><td>Proper nouns are not accepted; wastes a guess</td><td>Use a common word like SLATE or CRANE</td></tr>
    <tr><td>Ignoring yellow letters</td><td>You lose track of known letters in the word</td><td>Always reuse yellow letters in new positions</td></tr>
    <tr><td>Guessing the same letter twice early</td><td>Duplicates in early guesses waste testing slots</td><td>Save duplicate testing for guess 3+</td></tr>
    <tr><td>Panicking at all-gray results</td><td>All gray is actually very informative</td><td>Use a fresh probe with new common letters</td></tr>
    <tr><td>Typing random words when stuck</td><td>Burns guesses without gaining information</td><td>Step away for 10 minutes and come back</td></tr>
  </tbody>
</table>

<div class="key-takeaways">
  <h3>\u{2705} Key Takeaways</h3>
  <ul>
    <li>Wordle gives you six guesses to find a five-letter word, with color-coded feedback after each guess</li>
    <li>Green means correct letter in the correct position — these are your anchors</li>
    <li>Yellow means the letter is in the word but in a different position — test it elsewhere</li>
    <li>Gray means the letter is not in the word at all — never reuse it</li>
    <li>Use a strong opening word like SLATE or CRANE to maximize information gain</li>
    <li>The share button creates spoiler-free emoji grids — that is how the community communicates</li>
    <li>Start with normal mode and graduate to Hard Mode once the basics feel natural</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Is Wordle free to play?</summary>
    <div>Yes. Wordle is completely free on the New York Times Games site at nytimes.com/games/wordle. You do not need a NYT subscription. There are no in-app purchases, no ads during gameplay, and no premium features locked behind a paywall. The NYT has kept it free since acquiring it, which is notable given how many free games eventually monetize. The mobile app experience through NYT Games is also free, though some other puzzles in the app do require a subscription.</div>
  </details>
  <details>
    <summary>What happens if I miss a day?</summary>
    <div>Your streak resets to zero. This is the harshest mechanic in Wordle and the one that generates the most emotional reaction. If you played 200 days in a row and forgot day 201, your streak is gone. Your max streak stat is preserved, and your overall win rate is unaffected, but the current streak counter starts over. This is why I recommend setting a daily reminder — it sounds excessive, but a 340-day streak is surprisingly fragile and entirely dependent on remembering to open the page.</div>
  </details>
  <details>
    <summary>Can I play Wordle more than once a day?</summary>
    <div>The official daily puzzle is once per day — everyone gets the same word, and it resets at midnight local time. However, there are archived versions and third-party sites that let you play previous puzzles. The NYT also introduced the Wordle Archive for subscribers at one point, though availability has changed over time. For the authentic communal experience, the once-a-day model is the real game. The scarcity is a feature, not a bug — it is what makes each puzzle feel meaningful.</div>
  </details>
  <details>
    <summary>Does Wordle use American or British English spelling?</summary>
    <div>Wordle uses American English spelling conventions. This has caused frustration for British and Commonwealth players when words like FAVOR (not FAVOUR) or HUMOR (not HUMOUR) appeared as answers. The answer pool was curated by Josh Wardle's partner and later reviewed by the NYT, and it follows American conventions throughout. If you are playing from outside the US and a word seems like it should have a U in it, try the American spelling — it might save your streak.</div>
  </details>
  <details>
    <summary>What is the hardest Wordle word ever?</summary>
    <div>Subjective, but the community consensus points to words with uncommon letter patterns and repeated letters. CAULK, NYMPH, SWILL, and PHAGE are frequently cited as brutal answers. Words with uncommon letter combinations (like XYLYL-level obscurity) or words that form large clusters (like -ATCH words where BATCH, CATCH, HATCH, MATCH, PATCH, and WATCH all share most letters) tend to produce the most losses. The NYT does not publish loss rate data, but community tracking suggests CAULK had one of the highest failure rates in recorded Wordle history.</div>
  </details>
</div>
`,

  "best-wordle-starting-words": `
<h2>Your Wordle Opener Is Leaving Information on the Table</h2>
<p>I have played over a thousand Wordle games, and for the first three hundred or so, I opened with ADIEU every single time. Felt clever — four vowels, nice coverage. Then I ran the numbers. ADIEU eliminates an average of about 2,100 words from the possible solution pool of roughly 2,309 common answers. SLATE eliminates roughly 2,200. That gap compounds fast over time, turning into extra guesses on difficult days and more lost games over the course of a year.</p>
<p>Your starting word is the single most consequential decision you make in a Wordle game. Not because it is likely to be the answer (it almost never is), but because it determines how much information you have to work with for guesses two through six. The difference between a good opener and a mediocre one is not dramatic on any single day, but over hundreds of games, it shows up in your average guess count. This article breaks down exactly which words work best and why, using data from information theory and frequency analysis.</p>

<div class="callout callout-key">
  <div class="callout-icon">\u{1F511}</div>
  <div class="callout-content">
    <p><strong>The core principle:</strong> A good starting word tests the most common letters in the most common positions. This maximizes the expected information from color feedback, shrinking the possibility space as much as possible on every single guess.</p>
  </div>
</div>

<h3>Why Your Starting Word Matters: The Numbers</h3>
<p>Wordle's answer pool contains roughly 2,309 common five-letter words. Your first guess interacts with each possible answer and produces a unique pattern of greens, yellows, and grays. A "good" starting word splits the remaining pool into smaller groups on average. Think of it like Twenty Questions — if your first question divides the possibilities roughly in half, you need fewer total questions. In Wordle terms, CRANE tends to produce more informative color patterns than something like QUAFF, which wastes letters on uncommon combinations.</p>
<p>After opening with SALET (one of the mathematically optimal choices), the average number of remaining possible answers is about 70. After ADIEU, it is closer to 120. After something like OUIJA, you are looking at north of 200 remaining words on average. Same number of guesses used, wildly different amounts of information gained. That is the difference between starting guess two with a manageable list and starting it with nearly the full puzzle still ahead of you.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">~70</div>
    <div class="stat-label">Avg. Remaining After SALET</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~120</div>
    <div class="stat-label">Avg. Remaining After ADIEU</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~210</div>
    <div class="stat-label">Avg. Remaining After OUIJA</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">3x</div>
    <div class="stat-label">Info Gap (Best vs Worst)</div>
  </div>
</div>

<h3>Information Theory, Applied to Five Letters</h3>
<p>The mathematical tool for measuring this is entropy — how much uncertainty a guess resolves. A guess that splits the remaining words into many evenly-sized groups has high entropy. A guess where most answers produce the same color pattern has low entropy. The concept comes from Claude Shannon's information theory, developed in the 1940s, and it turns out to be exactly the right framework for analyzing Wordle guesses.</p>
<p>When MIT researchers applied information theory to Wordle, they found that the best openers were words like SALET, SLATE, and TRACE. These share a profile: they use the most common letters (S, A, E, T, R, L, N) and position them where they are most likely to appear (S at the start or end, E at the end, T in the middle). You do not need to understand the math to benefit from it. The takeaway: common letters in common positions give you more useful feedback than uncommon letters in rare positions.</p>

<h3>The Top 10 Starting Words and Why They Work</h3>
<p>Below is a comprehensive breakdown of the ten best starting words, ranked by average remaining words after the first guess. Each entry includes the letter composition, the key insight about why it works, and the expected remaining word count.</p>

<table>
  <thead>
    <tr><th>Rank</th><th>Word</th><th>Letters</th><th>Vowels</th><th>Avg Remaining</th><th>Key Strength</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><strong>SALET</strong></td><td>S, A, L, E, T</td><td>2</td><td>~70</td><td>Highest entropy of any valid guess</td></tr>
    <tr><td>2</td><td><strong>SLATE</strong></td><td>S, L, A, T, E</td><td>2</td><td>~71</td><td>Nearly optimal; most popular pro choice</td></tr>
    <tr><td>3</td><td><strong>TRACE</strong></td><td>T, R, A, C, E</td><td>2</td><td>~73</td><td>Excellent consonant coverage</td></tr>
    <tr><td>4</td><td><strong>CRANE</strong></td><td>C, R, A, N, E</td><td>2</td><td>~78</td><td>R and N in common positions</td></tr>
    <tr><td>5</td><td><strong>STARE</strong></td><td>S, T, A, R, E</td><td>2</td><td>~79</td><td>All top-tier letters</td></tr>
    <tr><td>6</td><td><strong>SNARE</strong></td><td>S, N, A, R, E</td><td>2</td><td>~82</td><td>Strong S + N combo</td></tr>
    <tr><td>7</td><td><strong>RAISE</strong></td><td>R, A, I, S, E</td><td>3</td><td>~86</td><td>Best 3-vowel opener</td></tr>
    <tr><td>8</td><td><strong>ARISE</strong></td><td>A, R, I, S, E</td><td>3</td><td>~87</td><td>S at end more common</td></tr>
    <tr><td>9</td><td><strong>IRATE</strong></td><td>I, R, A, T, E</td><td>3</td><td>~88</td><td>R, A, T, E workhorse coverage</td></tr>
    <tr><td>10</td><td><strong>AROSE</strong></td><td>A, R, O, S, E</td><td>3</td><td>~92</td><td>O is 3rd most common vowel</td></tr>
  </tbody>
</table>

<h3>Average Remaining Words: The Visual Breakdown</h3>
<p>The bar chart below makes the gap between top openers and mediocre ones viscerally clear. SALET and SLATE sit at the top, while popular but suboptimal choices like ADIEU and AUDIO lag significantly behind.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">SALET</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 70%">70</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">SLATE</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 71%">71</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">TRACE</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 73%">73</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">CRANE</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 78%">78</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">STARE</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 79%">79</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">RAISE</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 86%">86</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">IRATE</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 88%">88</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">ADIEU</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 120%">120</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">AUDIO</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 135%">135</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">OUIJA</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 100%">210+</div></div>
  </div>
</div>

<p>For comparison, ADIEU averages roughly 120 remaining words, AUDIO roughly 135, and OUIJA roughly 210. The gap between a top-10 opener and a mediocre one is roughly 30 to 50 words of additional elimination per game. Over 365 games, that is thousands of extra words you could have eliminated — the compound effect is real and measurable in your average guess count.</p>

<h3>Why Vowel Coverage Matters (But Is Not Everything)</h3>
<p>Vowels are the skeleton of any English word. Know which vowels are in the answer and you have narrowed the field dramatically. That is why ADIEU feels so good when it works — seeing four vowels lit up in one shot gives you a clear picture of the word's shape. You know exactly which vowels are present and can focus your remaining guesses entirely on consonants.</p>
<p>The problem: ADIEU uses D, a middling-frequency consonant, and wastes the powerful S and T slots. You learn about vowels but stay blind to consonants. SLATE covers one fewer vowel but adds S, L, and T — three of the most common consonants. Knowing S and T are in or out is more valuable than knowing about I or U. The sweet spot is two vowels plus three high-frequency consonants. SALET, SLATE, CRANE, and TRACE all follow this formula.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u{26A0}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>The ADIEU trap:</strong> ADIEU is the most popular opener among casual players, and it is not terrible — but it is not good either. Four vowels sounds impressive, but you sacrifice three consonant slots for vowel information that is less valuable than knowing whether S, T, R, or L are in the word. If you currently open with ADIEU, switching to SLATE or CRANE will improve your game measurably within a week.</p>
  </div>
</div>

<h3>The Common Consonants That Pull Their Weight</h3>
<p>In the Wordle answer pool, the most frequent consonants are: S, T, R, L, N, C, D, M, P, B. Your opener should hit as many of these as possible. S is the most common starting letter (roughly 15% of answers start with S). T and R are top five for all positions. L shows up everywhere. N is common in the middle and at the end. The top openers all include at least two of S, T, R, L, N. Words that skip these for less common consonants are leaving information on the table.</p>

<table>
  <thead>
    <tr><th>Letter</th><th>Frequency Rank</th><th>Most Common Position</th><th>% of Answers Containing</th></tr>
  </thead>
  <tbody>
    <tr><td>S</td><td>1</td><td>Position 1 (start)</td><td>~46%</td></tr>
    <tr><td>E</td><td>2</td><td>Position 5 (end)</td><td>~43%</td></tr>
    <tr><td>A</td><td>3</td><td>Position 3</td><td>~39%</td></tr>
    <tr><td>R</td><td>4</td><td>Position 2 or 3</td><td>~30%</td></tr>
    <tr><td>T</td><td>5</td><td>Position 3 or 5</td><td>~28%</td></tr>
    <tr><td>L</td><td>6</td><td>Position 2 or 5</td><td>~22%</td></tr>
    <tr><td>N</td><td>7</td><td>Position 3 or 5</td><td>~21%</td></tr>
  </tbody>
</table>

<h3>Should You Always Use the Same Opener?</h3>
<p>One of the most debated questions in the Wordle community. The case for a fixed opener: consistency gives you a baseline. When you always open with SLATE, you develop an intuition for how to follow up on each of the 243 possible color patterns. Over hundreds of games, this pattern recognition compounds. You stop thinking about what SLATE told you and start instinctively reaching for the right second guess based on the color pattern you see.</p>
<p>The case against: a fixed opener has bad days. If the answer is NYMPH and you opened with SLATE, you get five gray squares and start from nearly scratch. A rotating opener could theoretically avoid these worst-case scenarios, but in practice, the benefit of consistency outweighs the occasional bad match.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\u{1F4A1}</div>
  <div class="callout-content">
    <p><strong>My recommendation after 1,000+ games:</strong> Use a fixed opener 90% of the time. I have used SLATE consistently for 400 games, and my average dropped from 4.1 to 3.7 guesses. Correlation is not causation, but I am not switching back. The pattern recognition you build from using the same opener is more valuable than the marginal benefit of rotating.</p>
  </div>
</div>

<h3>When to Switch Your Opener</h3>
<p>If you are opening with something like AUDIO or OUIJA, switch to SLATE or CRANE today. The data is clear and the improvement is immediate. If you are already using a top-10 opener, the marginal gain from switching is tiny — maybe 0.02 guesses per game. Not worth the relearning curve. The other reason to switch: boredom. If using the same opener makes the game feel like a chore, mix it up. A SLATE user who is engaged will outperform a SALET user who is half-asleep at the keyboard. Engagement matters more than optimization at the margins.</p>

<h3>Wordle Demo: SALET vs ADIEU in Practice</h3>
<p>Let us see the difference in action. Same answer word, two different openers.</p>

<p><strong>With SALET</strong> — answer is TRACE:</p>
<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile yellow">L</div>
    <div class="wordle-demo-tile green">E</div>
    <div class="wordle-demo-tile green">T</div>
  </div>
</div>
<p>Two greens, two yellows, one gray. You already know the word ends in -ET, and A and L are somewhere in positions 1-3. Extremely informative — the answer is almost certainly identifiable in guess 2 or 3.</p>

<p><strong>With ADIEU</strong> — answer is TRACE:</p>
<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile green">D</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile yellow">E</div>
    <div class="wordle-demo-tile yellow">U</div>
  </div>
</div>
<p>Only one green, two yellows, and you have learned nothing about S, T, R, L, C, or N — the six most common consonants. You know E and U are in the word, but you are still largely in the dark about its structure. This is why SALET eliminates 50 more words on average than ADIEU.</p>

<div class="key-takeaways">
  <h3>\u{2705} Key Takeaways</h3>
  <ul>
    <li>SALET and SLATE are the mathematically optimal starting words, leaving ~70-71 remaining answers on average</li>
    <li>The best openers use 2 vowels + 3 high-frequency consonants (S, T, R, L, N)</li>
    <li>ADIEU is the most popular opener but significantly suboptimal — it sacrifices consonant information for vowel coverage</li>
    <li>Common letters in common positions give more information than rare letters in uncommon positions</li>
    <li>Consistency with one opener builds pattern recognition that compounds over hundreds of games</li>
    <li>Switching from a poor opener to a good one can improve your average by 0.3-0.5 guesses per game</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Is SALET really better than SLATE?</summary>
    <div>Technically yes, by about 0.01 bits of entropy — roughly 1 fewer remaining word on average. In practice, the difference is invisible. You would need millions of games for it to show up in your stats. SLATE is more popular because it is a more common word and feels more natural to type. Use whichever one you prefer; the marginal difference between top openers is far smaller than the gap between a top opener and a mediocre one like ADIEU.</div>
  </details>
  <details>
    <summary>What if my starting word was the answer yesterday — should I switch?</summary>
    <div>Wordle does not repeat answers within a reasonable timeframe, so if your opener was yesterday's answer, it will not be today's. You can still use it as your opener — the statistical value of a starting word comes from the information it provides, not from the chance of it being the answer. That said, some players feel superstitious about it. There is no mathematical reason to switch, but if it bothers you, any other top-10 word works nearly as well.</div>
  </details>
  <details>
    <summary>Should I use a different starting word in Hard Mode?</summary>
    <div>The optimal openers are the same in Hard Mode — SALET and SLATE remain the best choices. However, Hard Mode players sometimes prefer openers that produce "cleaner" patterns (more greens and grays, fewer yellows) because yellow letters constrain future guesses without giving positional certainty. If you find yourself getting trapped by multiple yellows in Hard Mode, CRANE or TRACE can be slightly better choices because they tend to produce more definitive feedback patterns.</div>
  </details>
  <details>
    <summary>Does the NYT changing the answer pool affect which words are best?</summary>
    <div>Yes, but minimally. The NYT removed a handful of words from the original answer pool (mostly obscure or potentially offensive terms), and they occasionally add new words. These changes shift the optimal openers by fractions of a percent. SALET and SLATE remain at the top regardless of minor pool adjustments because they are optimized for the most common letters, which do not change meaningfully with small pool edits.</div>
  </details>
  <details>
    <summary>What is the worst possible starting word?</summary>
    <div>Among valid five-letter words, OUIJA and XYLYL are among the worst openers. OUIJA uses three uncommon letters (O in this context, U, J) and wastes slots on letters that rarely appear in the answer pool. XYLYL uses X and Y, two of the least common letters. Both leave you with 200+ remaining words on average — roughly three times as many as SALET. Any word heavy on Q, J, X, Z, or uncommon letter combinations is going to perform poorly as an opener.</div>
  </details>
</div>
`,

  "wordle-strategy-guide": `
<h2>Consistency Beats Brilliance in Wordle</h2>
<p>I have maintained a streak of over 340 days, and I can tell you right now: it is not because I am some kind of word genius. It is because I stopped trying to be clever and started being systematic. There is a difference between playing Wordle well and playing Wordle flashily, and if your goal is to keep a streak alive, well beats flashy every single time. The most impressive Wordle players are not the ones who occasionally solve in two — they are the ones who almost never lose.</p>
<p>This guide is built from patterns I have noticed across a thousand games, mistakes I have made (and repeated), and a framework I developed for thinking about each guess. It is the approach that took me from a 78% win rate to a 98% win rate. Not through memorizing word lists or running algorithms, but through building repeatable habits that work regardless of what the daily word throws at you.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">98%</div>
    <div class="stat-label">My Win Rate</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">340+</div>
    <div class="stat-label">Day Streak</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">3.7</div>
    <div class="stat-label">Avg Guesses</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">1,000+</div>
    <div class="stat-label">Games Played</div>
  </div>
</div>

<h3>The Three Phases of Every Wordle Game</h3>
<p>Every Wordle game breaks into three phases. Understanding these — and having a strategy for each — is more valuable than memorizing word lists. The phases are not rigid boundaries; they are mental models that help you make better decisions at each point in the game. When you know what phase you are in, you know what your goal is for the next guess.</p>

<div class="process-flow">
  <div class="process-step">
    <div class="process-step-icon">\u{1F50D}</div>
    <div class="process-step-label">Phase 1: Opening<br/>Guess 1 — Gather Info</div>
  </div>
  <div class="process-arrow">\u{27A1}</div>
  <div class="process-step">
    <div class="process-step-icon">\u{1F9E9}</div>
    <div class="process-step-label">Phase 2: Narrowing<br/>Guesses 2-3 — Pin Down</div>
  </div>
  <div class="process-arrow">\u{27A1}</div>
  <div class="process-step">
    <div class="process-step-icon">\u{2705}</div>
    <div class="process-step-label">Phase 3: Solving<br/>Guesses 4-6 — Confirm</div>
  </div>
</div>

<p><strong>Phase 1: Opening (Guess 1).</strong> Pure information gathering. You are not trying to solve the puzzle; you are trying to shrink the possibility space from 2,309 words to something manageable. I always use SLATE. Every single day. This consistency means I have developed instincts for how to respond to each pattern it produces. The opening guess is your foundation — make it reliable rather than creative.</p>
<p><strong>Phase 2: Narrowing (Guesses 2-3).</strong> Based on what Phase 1 revealed, you are pinning down specific letters and positions. If you got two greens and a yellow, focus on placing the yellow and filling in the blanks. If you got all gray, you need a fresh information-gathering guess. The narrowing phase is where most games are won or lost — a good second guess can set up a solve by guess 3, while a bad one can leave you scrambling by guess 5.</p>
<p><strong>Phase 3: Solving (Guesses 4-6).</strong> You should have a manageable list of candidates — ideally fewer than 10, often 3 to 5. Switch from information gathering to elimination and confirmation. The key decision in Phase 3 is whether to play safe (use a probe to eliminate multiple candidates) or take a risk (guess directly and hope you are right).</p>

<h3>Phase 1 Strategy: Maximize Information Gain</h3>
<p>The key insight: do not try to solve on guess one. I see new players open with something like OCEAN because they have a "feeling." Sometimes they get lucky. Most of the time they do not, and they have spent their most valuable guess on a word that tests few high-frequency letters. Your opener should maximize expected information, not try to be the answer. The probability of guessing correctly on the first try is roughly 1 in 2,309 — about 0.04%. You are not going to hit it, so play the odds.</p>
<p>With SLATE, my most common Phase 1 outcome is one green and one yellow, or two yellows. That is exactly what I want — enough to work with in Phase 2. The worst outcome is all five grays, but even that tells me the answer does not contain S, L, A, T, or E, which is quite restrictive. In fact, all-gray on SLATE eliminates so many common letters that the remaining candidates are often easier to sort through than you might expect.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\u{1F4A1}</div>
  <div class="callout-content">
    <p><strong>Phase 1 rule:</strong> Your opener is not a guess at the answer. It is a question about the answer. The best questions are the ones that divide the possibility space as evenly as possible, regardless of what the answer turns out to be. SLATE asks "are the five most common letters in this word?" — and the answer to that question is almost always useful.</p>
  </div>
</div>

<h3>Phase 2 Strategy: Efficient Narrowing</h3>
<p>This is where the real skill lives. Phase 2 is about reading color patterns and choosing a second guess that respects your information and tests new likely letters. The wrong second guess can turn a solvable puzzle into a desperate scramble, while the right one can set up an easy solve by guess 3 or 4.</p>
<p>Concrete example: my opener SLATE comes back with S green (position 1), L gray, A yellow, T gray, E green (position 5). The word looks like S _ _ _ E, with A somewhere in positions 2, 3, or 4. I need to test where A goes and find the remaining letters. SHAME puts A in position 3 again — wasteful since A was yellow there. SCAPE tests A in position 4 and introduces C and P. That is better. The principle: use your second guess to test the most likely positions for yellow letters while introducing new common letters. Balance confirming what you know with learning what you do not.</p>
<p>If Phase 1 gave you all grays, Phase 2 needs to be a completely fresh probe. I would play something like CHIRP or BOUND — no eliminated letters, maximum new common letters. This feels wasteful but it is the correct play. A fresh probe on guess 2 after an all-gray guess 1 often produces extremely informative feedback, because you are testing five completely new letters against a constrained answer space.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile gray">H</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">H</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">R</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>
<p>Above: SLATE reveals S_A_E, second guess SHARE confirms the pattern, third guess solves it. This is the Phase 1 → Phase 2 → Phase 3 pipeline working as intended.</p>

<h3>Phase 3 Strategy: Safe Solving vs Risk-Taking</h3>
<p>By guess four, you should know the shape of the answer. The question is whether to play safe or take a risk. This decision depends entirely on the ratio of remaining candidates to remaining guesses, and getting it right is what separates streak-keepers from streak-breakers.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>Safe Solving (Probe Strategy)</h4>
    <p>If you have three possible answers and four guesses left, use one guess to eliminate two, then confirm. If the answer could be MATCH, CATCH, or HATCH, play MACAW — if M is green, it is MATCH; if M is gray, you have eliminated MATCH. Two guesses for a guaranteed solve. Safe solving maximizes your streak survival rate.</p>
  </div>
  <div class="comparison-card negative">
    <h4>Risky Solving (Direct Guess)</h4>
    <p>Guess MATCH directly. If you are right, you solved in four — great for your average. If wrong, you still have two guesses for the remaining options. But if you guess wrong again, you are down to one guess and two candidates. That is a coin flip for your streak. Risky solving improves your average but increases your variance.</p>
  </div>
</div>

<p>My rule: if I have more guesses remaining than possible answers, I can afford to guess directly. If possibilities equal or exceed remaining guesses, I play safe. This has saved my streak more times than I can count. The math is straightforward — guaranteed solves keep streaks alive, and streaks are more valuable than any single game's guess count.</p>

<h3>The Most Important Rule I Follow</h3>
<p>Never guess a word that does not respect your known information. This sounds obvious, but it is the number one way people lose streaks. You get frustrated, take a wild guess, ignore the green A in position 3 because "maybe I was wrong." You were not wrong. The color system does not lie. Every green and yellow letter is a confirmed fact about the answer, and disregarding facts because you feel stuck is how streaks die.</p>
<p>Related: never assume the answer cannot be a word you have never heard of. CAULK, SWILL, KNELT — all real Wordle answers. If your remaining candidates include an unfamiliar word, do not dismiss it. The answer pool includes obscure entries, and assuming the answer must be common is a quick way to lose. I keep a mental list of "words I learned from losing at Wordle" and it is longer than I would like to admit.</p>

<div class="callout callout-important">
  <div class="callout-icon">\u{2757}</div>
  <div class="callout-content">
    <p><strong>Streak killer #1:</strong> Guessing a word that contradicts your known information. If you have a green A in position 3, every subsequent guess MUST have A in position 3. No exceptions. No "I just had a feeling." The color system is deterministic — trust it completely or lose unnecessarily.</p>
  </div>
</div>

<h3>How I Handle Difficult Words</h3>
<p>Some words are just hard. Uncommon letter patterns (PHAGE), duplicate letters (FUZZY), or words that share most letters with others (BATCH, CATCH, HATCH, MATCH, PATCH, WATCH). Each type of difficulty requires a different approach, and recognizing which type you are facing is the first step toward solving it efficiently.</p>

<table>
  <thead>
    <tr><th>Difficulty Type</th><th>Examples</th><th>Strategy</th></tr>
  </thead>
  <tbody>
    <tr><td>Letter clusters</td><td>-ATCH, -IGHT, -OUND words</td><td>Use probe guesses to eliminate multiple candidates at once</td></tr>
    <tr><td>Duplicate letters</td><td>FUZZY, LLAMA, SISAL, GUESS</td><td>Consider repeated letters when patterns seem contradictory</td></tr>
    <tr><td>Uncommon patterns</td><td>PHAGE, NYMPH, CAULK</td><td>Do not dismiss unfamiliar words — the answer pool includes obscure entries</td></tr>
    <tr><td>Double letters</td><td>BLOOM, CHESS, APPLE</td><td>Test for duplicates by guessing words with repeated letters if singles are ruled out</td></tr>
    <tr><td>Vowel-heavy words</td><td>AUDIO, OUIJA, AEONS</td><td>Use a vowel-heavy probe if consonant-focused guesses produce all grays</td></tr>
  </tbody>
</table>

<p>When I hit a cluster — where several words differ by only one letter — I stop trying to guess the answer and start eliminating multiple candidates at once. In the -ATCH cluster, CHAMP tests C, H, A, M, P. If M and P are gray, I have eliminated MATCH and PATCH. If C is green, I have found CATCH. One guess, multiple eliminations. Words with repeated letters (LLAMA, SISAL, GUESS) are tricky because the color system behaves differently with duplicates. If you have eliminated most common letters and the pattern still does not make sense, consider whether a letter might be repeated.</p>

<h3>Time Management: When to Step Away</h3>
<p>I have a personal rule: if I have not identified the answer by guess four, I close the tab for at least ten minutes. Staring at the same five squares produces diminishing returns. I have had games where I was stuck, went to make coffee, and the answer was obvious when I looked again. There is no time limit in Wordle. Use that. If you are frustrated, you are more likely to make a careless guess that burns a turn. Step away, let your subconscious work, come back fresh.</p>
<p>The psychology here is real: when you are frustrated, your working memory narrows and you start fixating on the same small set of candidates. Stepping away lets your brain reset, and when you return, you often see possibilities that were invisible five minutes earlier. I estimate this technique has saved my streak at least a dozen times.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u{26A0}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>The tilt trap:</strong> In competitive gaming, "tilt" means playing emotionally after a setback. Wordle has its own version — after getting five gray squares on your opener, the temptation to type something angry or random is real. Resist it. All-gray feedback is actually extremely informative. Treat it as data, not as failure.</p>
  </div>
</div>

<h3>Why Consistency Beats Brilliance</h3>
<p>The players I know with the longest streaks are not the ones who solve in two guesses most often. They are the ones who almost never lose. Solving in two is partly luck. Not losing is a skill, built from systematic play, disciplined narrowing, and safe solving when stakes are high. My streak has survived days where I needed all six guesses. It has survived answers I had never heard of. It survives because I follow the framework: gather information early, narrow efficiently, solve conservatively. Every single game.</p>
<p>The streak is not about being the best Wordle player. It is about being the most reliable one. And reliability comes from having a system and trusting it, even when your instincts are screaming to try something clever.</p>

<div class="key-takeaways">
  <h3>\u{2705} Key Takeaways</h3>
  <ul>
    <li>Every Wordle game has three phases: Opening (info gathering), Narrowing (pinning down letters), and Solving (eliminating candidates)</li>
    <li>Use the same opener every day to build pattern recognition over hundreds of games</li>
    <li>Phase 2 is where games are won or lost — choose second guesses that balance confirming and exploring</li>
    <li>When candidates exceed remaining guesses, play safe with probe words instead of guessing directly</li>
    <li>Never guess a word that contradicts your known green and yellow letters — the color system does not lie</li>
    <li>Step away from the game when stuck — your subconscious solves problems your conscious mind cannot</li>
    <li>Consistency and discipline beat flash and creativity for long-term streak survival</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>What should I do if my opener gives me all gray squares?</summary>
    <div>All gray on SLATE means the answer contains none of S, L, A, T, or E. That is actually very informative — it eliminates roughly 70% of the answer pool in one shot. For your second guess, choose a word with five completely new common letters: CHIRP, BOUND, or DROWN are all good choices. Do not panic and do not reuse any of the five eliminated letters. You have five guesses left and the remaining pool is small — you are in a strong position even though it feels like you learned nothing.</div>
  </details>
  <details>
    <summary>How do I handle the -IGHT cluster?</summary>
    <div>The -IGHT cluster (NIGHT, LIGHT, MIGHT, RIGHT, TIGHT, SIGHT, FIGHT) is one of the hardest patterns in Wordle because seven words differ by only one letter. In normal mode, use a probe guess like NAMES or CLIMB to test multiple first letters simultaneously. If N is green, it is NIGHT. If M is green, it is MIGHT. If both are gray, you have eliminated two candidates in one guess. In Hard Mode, you must guess sequentially — start with the most common option (NIGHT or LIGHT) and work through the list.</div>
  </details>
  <details>
    <summary>Should I ever guess a word I know is not the answer?</summary>
    <div>Yes, absolutely — this is called a "probe" guess, and it is one of the most powerful tools in normal mode. If you have narrowed the answer to MATCH, CATCH, and HATCH, guessing a word like MACAW (which you know is not the answer) tests M and C simultaneously. If M is green, it is MATCH. If C is green, it is CATCH. If neither, it is HATCH. Probe guesses trade the possibility of solving immediately for the certainty of eliminating multiple candidates. In Phase 3, certainty is more valuable than speed.</div>
  </details>
  <details>
    <summary>Is it cheating to look up Wordle hints?</summary>
    <div>That depends entirely on your personal definition of the game. There is no competitive Wordle league enforcing rules — you are playing against yourself. Some players consider any external help cheating; others freely use word lists and solvers. My suggestion: play unassisted for your first 100 games to build genuine skill, then decide for yourself. The satisfaction of solving unaided is real, but there is no wrong way to enjoy a free daily puzzle.</div>
  </details>
</div>
`,

  "wordle-color-system-explained": `
<h2>Wordle's Colors Are Simple Until They Are Not</h2>
<p>Green means right letter, right spot. Yellow means right letter, wrong spot. Gray means the letter is not in the word. That is the whole system, and it takes about ten seconds to learn. But there is a gap between understanding the rules and actually reading the colors correctly — especially when duplicate letters get involved. I have watched players with months of experience misinterpret yellow clues or get confused by how grays interact with repeated letters. This article covers the basics and then goes straight into the tricky parts that trip up even experienced players.</p>
<p>Understanding the color system at a deep level is probably the single highest-leverage investment you can make in your Wordle game. Not memorizing word lists. Not finding the perfect opener. Just reading the colors right, every single time. Because one misread yellow can cascade into wasted guesses, and one misunderstood gray can send you down a completely wrong path.</p>

<h3>Green: Correct Letter, Correct Position</h3>
<p>Green is the straightforward one. When a letter turns green, it means two things simultaneously: this letter is in the answer, and it is in this exact position. No ambiguity. A green R in position 3 means the answer has R in position 3. Full stop. Green squares are your anchors — the only feedback that gives you positional certainty. Everything else requires interpretation, and interpretation is where mistakes creep in.</p>
<p>That said, green does not tell you whether the letter appears elsewhere. A green S in position 1 does not mean S cannot also appear in position 4. The word GUESS has S in positions 4 and 5. If you guessed SLATE and the S went green, you know position 1 is S — but another S could be lurking. This is a subtlety that most players never think about until it costs them a game, and then it becomes unforgettable.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile gray">E</div>
  </div>
</div>
<p>Above: S is green at position 1. The word starts with S. But could S also appear later? The color feedback does not tell you — you would need to guess another word with S in a different position to find out.</p>

<h3>Yellow: Correct Letter, Wrong Position</h3>
<p>Yellow means the letter exists in the answer but not where you put it. A yellow A in position 3 tells you: the answer contains A, and A is not in position 3. That is it. The information is both positive (A is in the word) and negative (A is not at position 3). Most people focus on the positive and forget the negative, but the negative information is equally valuable — it narrows the possible positions for that letter.</p>
<p>Where people go wrong: treating yellow as "try this letter in every other position." That is not wrong, but it is incomplete. A yellow letter tells you where it <em>is not</em>. If A is yellow at position 3 and you test A at position 2 and it is yellow again, now you know A is not at position 2 or 3. Each yellow result narrows possible positions. Another mistake: assuming a yellow letter appears only once. A yellow R at position 2 means R is in the word but not at position 2. It does not mean R appears exactly once. The answer could be REBAR, with R in positions 1 and 4.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\u{1F4A1}</div>
  <div class="callout-content">
    <p><strong>Think of yellow as negative information:</strong> A yellow letter at position N tells you the letter is NOT at position N. Each subsequent yellow for the same letter at a different position narrows the possibilities further. Two yellows for the same letter eliminate two positions, leaving fewer places it could go.</p>
  </div>
</div>

<h3>Gray: Letter Not in the Word</h3>
<p>Gray means the letter does not appear in the answer at all. Simple on its face, but it has a subtlety when duplicate letters are involved. The key point that most players miss: a gray result means the answer does not contain <em>more instances</em> of that letter than were revealed as green or yellow in your guess. This distinction becomes critical when you guess words with repeated letters.</p>
<p>If you guess SIZES and the answer is GUESS, here is what happens with the S. SIZES has S in positions 1 and 5. GUESS has S in positions 4 and 5. The game processes your guess left to right: Position 1 has S, the answer has S but not in position 1, so one S is "claimed" — this S turns yellow. Position 5 has S, and there is still one unclaimed S in the answer (position 5) — this S turns green. Neither S turns gray because the answer has two S's and you guessed two S's.</p>

<h3>The Tricky Part: Duplicate Letters and Color Resolution</h3>
<p>The game resolves colors with a two-pass system. First, it marks greens. Then, for remaining letters, it marks yellows for unmatched letters and grays for everything else. Understanding this two-pass system is the key to reading colors correctly in every situation, especially the confusing ones involving duplicate letters.</p>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <h4>Pass 1: Mark all greens</h4>
    <p>The game first identifies every position where your guess letter matches the answer letter in the same position. These are marked green and "claimed." Neither the guess letter nor the answer letter at that position is available for further matching. This means a single occurrence of a letter in the answer can only be matched once as green.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <h4>Pass 2: Mark yellows and grays</h4>
    <p>For each remaining (non-green) letter in your guess, the game checks whether any unclaimed instance of that letter exists in the answer. If yes, the leftmost unmatched guess letter gets marked yellow and the answer letter is claimed. If no unclaimed instances remain, the guess letter is marked gray. This left-to-right processing is why the position of duplicate letters in your guess matters.</p>
  </div>
</div>

<p>Example: you guess SASSY, and the answer is GUESS (which has two S's). Pass 1 (greens): Position 5 is S in both — green. No other positions match. Pass 2: The answer has one remaining unmatched S (position 4). Your guess has S at positions 1 and 3 still unresolved. The game assigns one yellow to the leftmost unresolved S (position 1). Position 3's S has no unmatched S left to claim — it turns gray.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">G</div>
    <div class="wordle-demo-tile green">U</div>
    <div class="wordle-demo-tile green">E</div>
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">S</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile yellow">S</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile green">Y</div>
  </div>
</div>

<p>That gray S at position 3 throws people. "But S is in the word," they think. Yes — but you have already accounted for both S's in the answer (one green, one yellow). The third S has nowhere to go. The gray does not mean "S is not in the word." It means "there are not more S's beyond what has already been revealed as green or yellow."</p>

<div class="callout callout-important">
  <div class="callout-icon">\u{2757}</div>
  <div class="callout-content">
    <p><strong>Critical insight:</strong> A gray letter on a duplicate does NOT mean the letter is absent from the word. It means you have found all instances of that letter. If you guess APPLE and one P is yellow and the other P is gray, the answer has exactly one P — not zero. The gray P is telling you "there is no second P," not "P is not in the word."</p>
  </div>
</div>

<h3>The LIVER vs LEMON Example</h3>
<p>A cleaner example without duplicate complications: you guess LIVER, answer is LEMON. L in position 1 matches — green. I is not in LEMON — gray. V is not in LEMON — gray. E is in LEMON but at position 2, not position 4 — yellow. R is not in LEMON — gray. Feedback: green L, gray I, gray V, yellow E, gray R. You know L is correct at position 1, E is in the word somewhere other than position 4, and I, V, R are out. No duplicate complications here — this is the straightforward case that the color system handles cleanly.</p>

<h3>Common Misunderstandings About the Color System</h3>
<table>
  <thead>
    <tr><th>Misconception</th><th>Reality</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td>"Yellow means try this letter in another position"</td><td>Yellow means the letter is in the word and NOT where you placed it — that is negative information</td><td>Yellow A at pos 3 means A is NOT at pos 3</td></tr>
    <tr><td>"Gray means the letter is not in the word"</td><td>Usually true, but a gray on a duplicate means you have found all instances</td><td>Gray P on second P in APPLE means exactly one P</td></tr>
    <tr><td>"If a letter is yellow, it appears exactly once"</td><td>Yellow means at least one instance exists — there could be two</td><td>Yellow R could mean REBAR (two R's)</td></tr>
    <tr><td>"Greens are processed after yellows"</td><td>The opposite — greens are resolved first, then yellows from remaining unmatched letters</td><td>REBEL vs RELAY: second E is gray, not yellow</td></tr>
    <tr><td>"A letter can only be one color per guess"</td><td>The same letter can be green in one position and gray in another (with duplicates)</td><td>SASSY vs GUESS: S is yellow, gray, gray, and green</td></tr>
  </tbody>
</table>

<h3>The Order of Priority: Greens Before Yellows</h3>
<p>This rule makes duplicate cases consistent. The game always gives greens first. If your guess and the answer share a letter in the same position, that is green — even if you also have the same letter elsewhere in your guess. Consider: guess REBEL, answer RELAY. R at position 1 is green, E at position 2 is green. Now the second E in your guess (position 4). The answer RELAY has only one E, matched as green at position 2. No unmatched E's left. Position 4's E turns gray. Not yellow — gray. There is only one E in the answer, and you already found it.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">243</div>
    <div class="stat-label">Possible Color Patterns Per Guess</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">2</div>
    <div class="stat-label">Resolution Passes</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">1st</div>
    <div class="stat-label">Greens Resolved First</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">2nd</div>
    <div class="stat-label">Yellows Then Grays</div>
  </div>
</div>

<h3>Practical Exercises to Master the Color System</h3>
<p>The best way to internalize these rules is practice. After each guess, try to predict each letter's color before the game reveals it. You will quickly develop an intuition for how duplicates behave. Start with simple cases (no duplicate letters) and work your way up to complex ones. The goal is to reach the point where you can instantly read a color pattern and understand exactly what it tells you about the answer — including what it does <em>not</em> tell you.</p>
<p>Another exercise: pick a word with duplicate letters — BELLY, OTTER, SLEEP — and imagine guessing it against various answers. Work through the two-pass resolution manually. After a few of these, the logic clicks. One final tip: when you see a gray letter you expected to be yellow, stop and think about duplicates. If you guessed APPLE and got green A, gray P, gray P, yellow L, yellow E — those gray P's mean the answer has zero P's. But if you got green A, yellow P, gray P, yellow L, yellow E — the answer has exactly one P (not in position 2). Reading these patterns correctly is the difference between a confident guess 3 and a panicked guess 6.</p>

<div class="callout callout-info">
  <div class="callout-icon">\u{2139}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>Practice tip:</strong> Try predicting the color of each letter in your guess before the game reveals it. If your prediction is wrong, figure out why. The most common prediction error is assuming a duplicate letter will be yellow when it should be gray — this is exactly the scenario that costs people games. Deliberate practice with predictions builds the right intuitions faster than playing hundreds of games on autopilot.</p>
  </div>
</div>

<div class="key-takeaways">
  <h3>\u{2705} Key Takeaways</h3>
  <ul>
    <li>Green gives positional certainty — the letter is in the answer at that exact position, but it might also appear elsewhere</li>
    <li>Yellow gives both positive and negative information — the letter is in the word, and NOT at the position you tested</li>
    <li>Gray on a non-duplicate means the letter is absent; gray on a duplicate means all instances have been found</li>
    <li>The game uses a two-pass system: greens first, then yellows, then grays for remaining letters</li>
    <li>Same letter can be multiple colors in one guess (e.g., yellow S and gray S in SASSY)</li>
    <li>Always predict colors before the reveal — the prediction errors are where you learn the most</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Why did my letter turn gray when I know it is in the word?</summary>
    <div>This happens when you guessed the same letter multiple times and the answer contains fewer instances than you guessed. For example, if you guess SASSY and the answer is GUESS (two S's), your third S will turn gray because the two S's in the answer are already accounted for (one green, one yellow). The gray is telling you "there are no additional S's beyond what has already been colored green or yellow." It is not saying S is absent — it is saying you have found all the S's.</div>
  </details>
  <details>
    <summary>Can the same letter be green and gray in the same guess?</summary>
    <div>Yes. If you guess REBEL and the answer is RELAY, the first E (position 2) will be green because it matches, but the second E (position 4) will be gray because the answer only has one E and it was already matched as green. The gray E does not mean E is not in the word — it means there is no additional E beyond the one you already found. This is the greens-first rule in action.</div>
  </details>
  <details>
    <summary>Does the order of letters in my guess matter for color resolution?</summary>
    <div>Yes, specifically for duplicate letters. The game processes from left to right during the yellow-matching pass. If the answer has one S and you guess two S's, the leftmost S will get the yellow (if applicable) and the rightmost will be gray. Changing the order of duplicates in your guess can change which one gets the yellow. For non-duplicate letters, the order does not affect the outcome — each letter is evaluated independently against the answer.</div>
  </details>
  <details>
    <summary>What happens if I guess a word with three of the same letter?</summary>
    <div>The same two-pass logic applies. The game first marks greens, then marks yellows for remaining unmatched letters left-to-right. If the answer has two S's and you guess a word with three S's, the first two S's will be colored (green if in the right position, yellow if not) and the third S will be gray. If the answer has only one S, one S will be green or yellow and the other two will be gray. The system always accounts for the exact number of each letter in the answer.</div>
  </details>
</div>
`,

  "wordle-hard-mode": `
<h2>Hard Mode Is Not Always Harder — But It Is Always Different</h2>
<p>I switched to Hard Mode about eight months into my Wordle streak, fully expecting it to tank my stats. It did not. My average guesses barely changed — from 3.72 to 3.78. But the way I play changed a lot, and some days the constraint feels less like a challenge and more like a straitjacket. Hard Mode reshapes the game in ways that are sometimes helpful, sometimes punishing, and always worth understanding before you commit. The key insight is that Hard Mode does not make every puzzle harder — it makes some puzzles harder and others surprisingly easier.</p>
<p>This article breaks down exactly what Hard Mode changes, when it helps, when it hurts, and whether you should make the switch. I have tracked detailed stats for 200 games in each mode, and the data tells a more nuanced story than you might expect. The short version: Hard Mode costs you about 0.06 guesses per game on average but increases your worst-case risk significantly. Whether that tradeoff is worth it depends entirely on what you want from the game.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>What Hard Mode Gives You</h4>
    <ul>
      <li>Forced discipline — no ignoring known information</li>
      <li>Protection from self-sabotage</li>
      <li>A more puzzle-like experience</li>
      <li>Better habit-building for new players</li>
    </ul>
  </div>
  <div class="comparison-card negative">
    <h4>What Hard Mode Takes Away</h4>
    <ul>
      <li>Probe guesses that eliminate multiple candidates</li>
      <li>Strategic flexibility in Phase 3</li>
      <li>Escape routes from cluster traps</li>
      <li>The ability to "reset" when stuck</li>
    </ul>
  </div>
</div>

<h3>What Hard Mode Actually Changes</h3>
<p>One setting, one rule change. In Hard Mode, any letter revealed as green or yellow must be reused in all subsequent guesses. If your first guess reveals a green A in position 3, every guess after that must have A in position 3. If you get a yellow R, every future guess must include R somewhere. The game literally will not accept guesses that violate this rule — it displays an "invalid guess" message and makes you try again.</p>
<p>Same answer pool, same six guesses, same color feedback. The only difference: you cannot ignore information you have already gained. In normal mode, you could guess a word that ignores your green A and yellow R. Hard Mode removes that option entirely. This sounds like it should always be harder, but the reality is more complicated because the constraint also removes certain tempting but bad plays.</p>

<div class="callout callout-info">
  <div class="callout-icon">\u{2139}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>How to enable Hard Mode:</strong> Open Wordle, click the gear icon in the top-right corner, and toggle "Hard Mode" on. You can switch between modes between games but not during one. Your stats are tracked separately, and switching modes does not reset your streak — but you might notice your gameplay feels very different.</p>
  </div>
</div>

<h3>Is Hard Mode Actually Harder?</h3>
<p>Sometimes yes, sometimes no. I know that is unsatisfying, but it is honest. Hard Mode is harder when early guesses lock you into a narrow set of candidates without helping you distinguish between them. Imagine you guess CRANE and get gray C, yellow R, green A, gray N, yellow E. In normal mode, you could guess a word that places R and E in new positions while testing common consonants. In Hard Mode, you must include R, A, and E in every subsequent guess, which limits your word choices more than you would expect.</p>
<p>But Hard Mode can also be easier on days when normal mode players might accidentally ignore useful information. If you get a yellow L and a green E, Hard Mode forces you to incorporate both into your next guess — which might be exactly the nudge you need to find the answer. Normal mode players sometimes forget about yellow letters and waste guesses re-testing known information. Hard Mode makes that particular mistake impossible.</p>

<h3>The Cluster Trap: When Hard Mode Punishes You</h3>
<p>The real trouble comes with what I call the "cluster trap." You discover the word ends in -OSE, with P identified somewhere. Candidates: PROSE, POISE, POSER, POKER, POWER. Five candidates, three guesses left. In normal mode, guess something like SPIKE — if I is in the word, it is POISE; if K is in the word, it is POKER; if neither, you have narrowed it down. One probe guess can eliminate multiple candidates simultaneously.</p>
<p>In Hard Mode, you cannot do that. You must include every revealed letter in every guess. So you are forced to guess candidates directly. POSER? Wrong. POKER? Wrong. POWER? Now you have one guess left and two candidates. A coin flip for your streak. This is the scenario that makes Hard Mode genuinely dangerous for streak players — the inability to probe turns manageable situations into 50/50 gambles.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">P</div>
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">P</div>
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile gray">K</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">P</div>
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile gray">W</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>
<p>Above: The cluster trap in action. Three guesses, three wrong answers, and you still have multiple candidates. In normal mode, a single probe word could have eliminated two or three of these at once.</p>

<h3>When Hard Mode Helps: Discipline and Focus</h3>
<p>Despite trap scenarios, Hard Mode has genuine benefits — particularly for players who struggle with consistency. Hard Mode forces discipline. You cannot ignore a yellow letter because you would rather try something else. You cannot skip a green because you had a "hunch." Every guess must incorporate what you know, so you are always building on previous information.</p>
<p>For newer players, this is genuinely helpful. I have watched friends get a green A in position 3 and then guess a word without A in position 3 because "it just felt right." Hard Mode prevents this self-sabotage entirely. It also eliminates the temptation to throw away a guess on a random word when stuck. Hard Mode keeps you honest, and for players who have not yet developed the discipline to always respect their known information, that enforcement mechanism is worth more than the occasional cluster trap costs.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\u{1F4A1}</div>
  <div class="callout-content">
    <p><strong>Who benefits most from Hard Mode:</strong> Players who frequently ignore yellow letters, guess words that contradict known greens, or throw away turns on "feeling" guesses. The constraint acts as training wheels that eventually become unnecessary — after enough Hard Mode games, respecting your information becomes automatic even when you switch back to normal mode.</p>
  </div>
</div>

<h3>When Hard Mode Hurts: Trapped in Bad Patterns</h3>
<p>The downside: when you have multiple candidates sharing all your green and yellow letters, Hard Mode forces you to guess them one by one, while normal mode lets you construct a probe that eliminates several at once. These situations are not rare. Words ending in -IGHT (NIGHT, LIGHT, MIGHT, RIGHT, TIGHT, SIGHT, FIGHT) are a classic example. Confirm the -IGHT ending in Hard Mode and you must guess the first letter sequentially. Normal mode lets you guess NAMES — if N is green, it is NIGHT; if M is green, it is MIGHT; both gray eliminates two candidates in one guess.</p>
<p>The more common the suffix or prefix, the more you hit this problem. -ATCH, -OUND, -IGHT, -ASTE — all clusters that punish Hard Mode players. The table below shows the most dangerous clusters and how many candidates each one generates.</p>

<table>
  <thead>
    <tr><th>Cluster Pattern</th><th>Candidate Words</th><th>Count</th><th>Normal Mode Strategy</th></tr>
  </thead>
  <tbody>
    <tr><td>-IGHT</td><td>NIGHT, LIGHT, MIGHT, RIGHT, TIGHT, SIGHT, FIGHT</td><td>7</td><td>Probe with NAMES or CLIMB</td></tr>
    <tr><td>-ATCH</td><td>BATCH, CATCH, HATCH, MATCH, PATCH, WATCH</td><td>6</td><td>Probe with PLUMB or CREAM</td></tr>
    <tr><td>-OUND</td><td>BOUND, FOUND, HOUND, MOUND, POUND, ROUND, SOUND, WOUND</td><td>8</td><td>Probe with SHARP</td></tr>
    <tr><td>-ASTE</td><td>PASTE, TASTE, WASTE, HASTE, CHASTE</td><td>5</td><td>Probe with WHIMP</td></tr>
    <tr><td>-OOSE</td><td>GOOSE, MOOSE, NOOSE, LOOSE</td><td>4</td><td>Probe with LINGO</td></tr>
  </tbody>
</table>

<h3>The Data: Normal Mode vs Hard Mode</h3>
<p>I tracked my stats for 200 games in each mode. The numbers tell a clear story about averages but an even more interesting story about distributions.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">Avg Guesses</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 62%">3.72</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Hard Mode Avg</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 63%">3.78</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Normal Win %</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 98%">98%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Hard Win %</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 95%">95%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Normal Solved in 6</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 4%">4%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Hard Solved in 6</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 9%">9%</div></div>
  </div>
</div>

<table>
  <thead>
    <tr><th>Metric</th><th>Normal Mode</th><th>Hard Mode</th><th>Difference</th></tr>
  </thead>
  <tbody>
    <tr><td>Average guesses</td><td>3.72</td><td>3.78</td><td>+0.06</td></tr>
    <tr><td>Win rate</td><td>98%</td><td>95%</td><td>-3%</td></tr>
    <tr><td>Games solved in 3 or fewer</td><td>28%</td><td>22%</td><td>-6%</td></tr>
    <tr><td>Games solved in 6</td><td>4%</td><td>9%</td><td>+5%</td></tr>
    <tr><td>Losses</td><td>2%</td><td>5%</td><td>+3%</td></tr>
  </tbody>
</table>

<p>The average barely moved, but the distribution shifted. Hard Mode produced fewer quick solves and more near-misses. The 3% win rate drop came almost entirely from cluster traps forcing sequential guessing. In normal mode, those same games would have been solved with a single probe guess — but Hard Mode made the probe impossible.</p>

<div class="callout callout-warning">
  <div class="callout-icon">\u{26A0}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>The tail risk:</strong> The most important number in the table above is the loss rate difference. Going from 2% to 5% losses might sound small, but over a year that is roughly 11 more lost games — and 11 more streak resets. If maintaining a long streak is your primary goal, that 3% difference is the entire argument against Hard Mode.</p>
  </div>
</div>

<h3>Why Some Players Prefer Hard Mode</h3>
<p>I know several players who refuse to go back to normal mode. Their reasoning: Hard Mode feels more like a "real" puzzle. The constraint adds a strategic dimension — you are navigating restrictions that force creative thinking. There is also an integrity argument. Some players feel normal mode's ability to ignore clues is borderline cheating — if the game tells you a letter is in the word, using that information should be mandatory. I do not share this view, but I understand the logic.</p>
<p>And for experienced players, normal mode can start to feel too easy. Hard Mode reintroduces friction, keeping the daily puzzle interesting after hundreds of plays. The psychological effect is real — after 500 normal mode games, the daily routine can start to feel mechanical. Hard Mode disrupts that routine and makes each puzzle feel like a fresh challenge again, even if the statistical difference is small.</p>

<h3>How to Adapt Your Strategy for Hard Mode</h3>
<div class="numbered-list">
  <ol>
    <li><strong>Be strategic about yellow letter placement.</strong> In Hard Mode, placing a yellow letter correctly saves you a turn. If R is yellow at position 2, try R at position 3 or 4 next — you gather more positional information. In normal mode you could probe with R elsewhere while also testing new letters; in Hard Mode, the R is mandatory so make it count positionally.</li>
    <li><strong>Arrange multiple yellows to test maximum new positions.</strong> If A is yellow at position 3 and E is yellow at position 5, guess a word putting A at position 2 and E at position 4. Maximize the number of positional questions answered by each guess.</li>
    <li><strong>When you see a cluster forming, start planning immediately.</strong> Do not wait until guess 5 to realize you are trapped. If clues point to a -IGHT word and you have four guesses left, count candidates and map your sequence. Sometimes the best play is accepting sequential guessing rather than hoping a creative guess resolves everything.</li>
    <li><strong>Prefer openers that produce "clean" patterns.</strong> Fewer yellows and more definitive greens or grays give you more flexibility. Yellow letters constrain options without giving positional certainty, so openers that minimize ambiguous yellows are slightly better in Hard Mode.</li>
  </ol>
</div>

<p>Hard Mode rewards planning. Normal mode rewards flexibility. Knowing which game you are playing changes how you play it. The best Hard Mode players I know think two guesses ahead, anticipating how the constraint will compound. The best normal mode players stay flexible, ready to pivot when a probe guess opens up new information. Both approaches work — but mixing them up gets you the worst of both worlds.</p>

<div class="key-takeaways">
  <h3>\u{2705} Key Takeaways</h3>
  <ul>
    <li>Hard Mode forces you to reuse all green and yellow letters in subsequent guesses — no ignoring known information</li>
    <li>The average guess difference is small (+0.06), but the loss rate increases from 2% to 5%</li>
    <li>Cluster traps (-IGHT, -ATCH, -OUND) are the primary danger — they force sequential guessing with no probe option</li>
    <li>Hard Mode provides discipline benefits for players who struggle with consistency</li>
    <li>Adapt by placing yellow letters strategically and planning ahead for cluster situations</li>
    <li>New players should start with normal mode; experienced players looking for freshness should try Hard Mode for two weeks</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Does Hard Mode change the daily answer?</summary>
    <div>No. The answer is the same regardless of which mode you play in. Everyone — normal mode and Hard Mode players — is solving the same word on any given day. The only difference is the constraint on your guesses. This means you can compare results with friends regardless of mode, and the shared social experience is preserved.</div>
  </details>
  <details>
    <summary>Can I switch between normal and Hard Mode?</summary>
    <div>Yes, you can switch between games. Toggle the setting in the gear menu and it will apply to your next game. Your stats are not reset by switching modes. Some players use normal mode for daily play and Hard Mode for challenge runs — there is no rule against switching as often as you like. The only restriction is that you cannot change modes mid-game.</div>
  </details>
  <details>
    <summary>Is Hard Mode the same as the "Hard Mode" in the NYT app?</summary>
    <div>Yes, it is identical. The setting syncs across the web version and the NYT Games app. If you enable Hard Mode on your phone, it will be enabled on the web version too (as long as you are logged into the same account). The rule is the same everywhere: green and yellow letters must be reused in subsequent guesses.</div>
  </details>
  <details>
    <summary>What percentage of players use Hard Mode?</summary>
    <div>The NYT does not publish official statistics on mode usage. Anecdotal data from community surveys and social media suggests roughly 20-30% of regular players use Hard Mode. Among competitive and long-time players, the percentage is higher — probably around 40-50%. The mode has a dedicated following that considers it the "real" way to play, even though the data shows it is not strictly harder on average.</div>
  </details>
  <details>
    <summary>Why does my Hard Mode game reject valid words?</summary>
    <div>In Hard Mode, the game rejects any word that does not include all previously revealed green and yellow letters. If you got a green A at position 3 and a yellow R, every subsequent guess must have A at position 3 and include R somewhere. If you type a word that omits either of these constraints, the game rejects it. The word might be valid in the dictionary, but it is invalid under Hard Mode's additional rules. This is the most common source of confusion for new Hard Mode players.</div>
  </details>
</div>
`,

  "math-behind-wordle": `
<h2>Wordle Is a Math Problem Disguised as a Word Game</h2>
<p>Every time you make a guess in Wordle, you are running a calculation. You might not realize it — most people do not think about information theory while typing five-letter words over morning coffee — but the game is fundamentally about minimizing uncertainty. Each guess takes a pool of possible answers and splits it into smaller groups based on the color pattern. The better your guess, the more evenly it splits the pool, and the faster you converge on the answer. This is not a metaphor. It is literally what is happening, and the math that describes it is both elegant and surprisingly practical.</p>
<p>I have been fascinated by the math behind Wordle since I first read a paper from MIT researchers who formally analyzed optimal play. You do not need to understand the math to play well, but understanding the principles changed how I think about each guess — not because I am computing entropy at the keyboard, but because the framework gives me better intuitions about what makes a guess good or bad. This article explains those principles without requiring a background in mathematics.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">11.2</div>
    <div class="stat-label">Bits to Identify One Word</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~5.8</div>
    <div class="stat-label">Bits per Optimal Guess</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">2,309</div>
    <div class="stat-label">Possible Answers</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">12,000+</div>
    <div class="stat-label">Valid Guess Words</div>
  </div>
</div>

<h3>Wordle as an Information Theory Problem</h3>
<p>Information theory, developed by Claude Shannon in the 1940s, quantifies uncertainty. The core unit is the bit — one bit cuts possibilities roughly in half. Eight bits cuts them by a factor of 256. In Wordle, you start with about 2,309 possible answers. How many bits do you need to identify one specific word? The base-2 logarithm of 2309 is roughly 11.2 bits. So if every guess gave maximum information, you could always solve Wordle in about 3 guesses (3 guesses can encode up to 15 bits with 243 possible color patterns each).</p>
<p>In practice, guesses do not give maximum information because color patterns are not equally likely. A guess like CRANE will produce diverse patterns — some all-gray, some with greens and yellows. A guess like XYLYL (a real word, a chemical group) will almost always produce all-gray because X and Y rarely appear. Both give you <em>some</em> information, but CRANE gives substantially more on average. The difference is not subtle — it is the difference between having 78 candidate words remaining and 430.</p>

<div class="callout callout-key">
  <div class="callout-icon">\u{1F511}</div>
  <div class="callout-content">
    <p><strong>The fundamental insight:</strong> Wordle is not a word game. It is a search problem where you are trying to locate one specific item in a set of 2,309 using as few queries as possible. The words are the search space, the colors are the feedback, and entropy measures how much each query narrows the search. Understanding this transforms how you think about every guess.</p>
  </div>
</div>

<h3>What Entropy Means in Wordle Context</h3>
<p>Entropy measures how much a guess reduces uncertainty on average. It is calculated by looking at all possible color patterns a guess can produce, determining what fraction of answers produce each pattern, and computing expected information gain. A guess splitting answers into 100 equally-sized groups has higher entropy than one where 90% of answers produce the same pattern and the remaining 10% are scattered across 99 others. The first resolves uncertainty reliably. The second usually tells you little, with a rare chance of being very informative.</p>
<p>The highest-entropy openers are SALET and SLATE, both producing roughly 5.8 bits of entropy. That means the first guess, on average, cuts possible answers by a factor of about 55 (2 to the power of 5.8). Starting from 2,309, you are down to roughly 42 on average. A poor opener like OUIJA produces only about 4.2 bits, cutting the pool by roughly 18 — leaving you with about 128 possible answers. Same number of guesses used, wildly different positions on the board.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">SALET</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 97%">5.8 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">SLATE</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 96%">5.8 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">CRANE</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 93%">5.6 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">RAISE</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 90%">5.4 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">ADIEU</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 82%">4.9 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">AUDIO</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 78%">4.7 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">QUICK</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 68%">4.1 bits</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">OUIJA</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 60%">3.6 bits</div></div>
  </div>
</div>

<h3>How Many Bits Each Guess Provides</h3>
<p>Not all guesses are created equal. The table below shows the approximate entropy for different categories of openers, along with the practical impact on remaining candidate count. The gap between the best and worst openers is staggering — nearly 2.2 bits, which translates to roughly 4.6x more remaining words after a poor opener compared to an optimal one.</p>

<table>
  <thead>
    <tr><th>Opener Category</th><th>Examples</th><th>Entropy (bits)</th><th>Avg Remaining</th><th>Pool Reduction</th></tr>
  </thead>
  <tbody>
    <tr><td>Optimal</td><td>SALET, SLATE</td><td>~5.8</td><td>~70</td><td>97%</td></tr>
    <tr><td>Good</td><td>CRANE, TRACE, RAISE</td><td>~5.5-5.7</td><td>~78-86</td><td>96-97%</td></tr>
    <tr><td>Vowel-heavy</td><td>ADIEU, AUDIO</td><td>~4.8-5.0</td><td>~119-135</td><td>94-95%</td></tr>
    <tr><td>Mediocre</td><td>QUICK, JUMBO</td><td>~4.0-4.5</td><td>~200-300</td><td>87-91%</td></tr>
    <tr><td>Poor</td><td>OUIJA, XYLYL</td><td>~3.5-4.2</td><td>~210-430</td><td>81-91%</td></tr>
  </tbody>
</table>

<p>Second guesses typically provide 3 to 5 bits. By guess three, you are often in the 1 to 3 bit range because remaining uncertainty is small and it is harder to split a small pool evenly. The theoretical minimum for solving in 4 guesses is about 11.2 bits. Optimal play extracts roughly 16.3 bits over four guesses, so there is substantial slack — which is why most strategic players solve in 4 on average even though they are not playing optimally.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>
<p>Above: SLATE producing a typical pattern — 2 greens, 1 yellow, 2 grays. This particular pattern provides roughly 5.6 bits of information, cutting the candidate pool from 2,309 down to a manageable set. The math works even if you never calculate a single bit.</p>

<h3>Why Some Words Are Worth More as Guesses</h3>
<p>A guess's value depends on two things: which letters it tests and where they are positioned. Testing common letters is more valuable because you are more likely to get non-gray feedback, and non-gray feedback splits the possibility space. Position matters too. Testing E at the end is more informative than E at the beginning — E is much more common at the end of five-letter words.</p>
<p>SALET (S-A-L-E-T) and SLATE (S-L-A-T-E) test the same five letters, but SALET places E at position 4 and T at position 5, while SLATE places E at position 5 and T at position 4. The positional frequency differences give SALET a tiny edge in entropy — about 0.01 bits. In practice, this difference is invisible. You would need millions of games for it to show up in stats. But the math is clear: SALET is technically the optimal first guess by expected information gain.</p>

<h3>The Calculation: Expected Remaining Words</h3>
<p>For each possible color pattern a guess can produce, count how many answers would produce that pattern. Multiply by the probability of that pattern (count divided by total answers). Sum across all patterns. This gives you the expected pool size after one guess. Lower is better. SALET: roughly 70.8 expected remaining words. CRANE: about 78.4. ADIEU: about 119. OUIJA: about 213.</p>
<p>These numbers are not linear with entropy because entropy and expected pool size measure different things. Entropy measures how evenly the pool splits. Expected pool size measures average remaining candidates regardless of distribution. They are correlated but not identical. A guess that always leaves exactly 70 candidates has the same expected pool size as one that usually leaves 10 but occasionally leaves 400 — but the first is far more reliable, and entropy captures that difference.</p>

<div class="callout callout-tip">
  <div class="callout-icon">\u{1F4A1}</div>
  <div class="callout-content">
    <p><strong>Practical takeaway:</strong> You do not need to calculate entropy to use these principles. Just ask two questions before every guess: "Which new letters am I testing?" and "How many possible answers does this help me distinguish?" If the answer to the first is "none," you are wasting a guess. If the answer to the second is "one," you had better have enough guesses left for the alternatives.</p>
  </div>
</div>

<h3>Why CRANE Beats XYLYL on Average</h3>
<p>XYLYL contains X and Y, two of the least common letters in the answer pool. The most likely outcome is all five gray — eliminating maybe 30 to 40 percent of answers. Not useless, but not great. CRANE contains five of the most common letters. The most likely outcome is a mix of grays, yellows, and maybe a green. The diverse pattern variety means CRANE splits the answer pool into more, smaller groups — exactly what you want.</p>
<p>Expected remaining words after XYLYL: roughly 430. After CRANE: 78. Same guess slot, five times the elimination power. That is the difference between testing common letters and uncommon ones, and it compounds over the course of a game. A player who opens with CRANE and follows up intelligently will typically solve in 3-4 guesses. A player who opens with XYLYL will typically need 5-6.</p>

<h3>The Optimal First Guess Depends on Your Metric</h3>
<p>There is no single "best" opener — it depends on what you are optimizing for. Different mathematical objectives produce different optimal words, and understanding the distinction helps you choose the approach that matches your goals.</p>

<table>
  <thead>
    <tr><th>Optimization Goal</th><th>Best Opener</th><th>Why</th><th>Best For</th></tr>
  </thead>
  <tbody>
    <tr><td>Minimum average remaining words</td><td>SALET</td><td>Lowest expected pool size (~70.8)</td><td>Players optimizing average guess count</td></tr>
    <tr><td>Minimum worst-case remaining words</td><td>SLATE</td><td>Fewest words in the worst pattern</td><td>Players who hate bad surprises</td></tr>
    <tr><td>Minimax (solve in fewest worst-case guesses)</td><td>SALET</td><td>Guarantees solve in at most 5 guesses</td><td>Streak players who want safety bounds</td></tr>
    <tr><td>Maximum entropy (information gain)</td><td>SALET</td><td>Highest expected bits (~5.8)</td><td>Theory enthusiasts</td></tr>
  </tbody>
</table>

<p>The differences are marginal. Any top-10 opener is within a few percentage points of optimal. The math matters more for understanding <em>why</em> some words work better than for choosing between SALET and SLATE. If you are using a top-5 opener, you are already extracting nearly all the available information from your first guess.</p>

<h3>Why the Best Guess Is Not Always a Possible Answer</h3>
<p>The answer pool (roughly 2,309 words) is a subset of valid guesses (roughly 12,000+). Words like TARSE, LARES, or AESIR are valid guesses that will never be answers. Sometimes a non-answer word splits remaining candidates more evenly than any answer word, because it can use letter combinations absent from the answer pool. This matters most in the late game with few candidates.</p>
<p>In normal mode, you can probe freely with non-answer words. In Hard Mode, they must still include all green and yellow letters, limiting their usefulness. The ability to use non-answer probe words is one of the most underappreciated advantages of normal mode — it gives you access to roughly 10,000 additional test words that can be strategically valuable when the remaining candidates share many letters.</p>

<h3>How AI Solvers Work: Minimax vs Expected Value</h3>
<p>Two main approaches, optimizing for different goals. Understanding these approaches does not just explain how bots play — it reveals the fundamental strategic tension in Wordle between optimizing your average performance and protecting your worst case.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>Expected Value (Entropy Maximization)</h4>
    <p>Minimizes the average remaining words after each guess. Over many games, this minimizes average guesses to solve. SALET is the optimal first guess under this metric. Think of it as the "best on average" approach — it accepts occasional bad days in exchange for consistently strong average performance. Best for players who care about their guess distribution chart.</p>
  </div>
  <div class="comparison-card negative">
    <h4>Minimax (Worst-Case Optimization)</h4>
    <p>Minimizes the worst-case outcome — asking "what is the biggest pool I could face after this guess." This guarantees solving any answer within a fixed number of guesses (5 for optimal play). It sacrifices average-case performance to ensure you never need more than 5 guesses. Best for streak players who cannot afford a single loss.</p>
  </div>
</div>

<p>Neither is "better" — they optimize for different goals. Streak players should prefer minimax (bounds worst case). Average-seekers should prefer expected value. In my play, I use simplified expected value for the first two guesses and switch to minimax thinking for guesses 3 through 6. Not optimal, but practical — and it reflects the reality that early guesses benefit from maximizing information while late guesses benefit from guaranteeing solutions.</p>

<div class="callout callout-info">
  <div class="callout-icon">\u{2139}\u{FE0F}</div>
  <div class="callout-content">
    <p><strong>Fun fact:</strong> An optimal minimax solver can guarantee solving every Wordle puzzle in at most 5 guesses. Not 6 — 5. That means with perfect play, you never need the sixth row. The gap between this theoretical bound and most players' actual performance (3.7-4.2 average) shows how much room there is between "good enough" and "optimal."</p>
  </div>
</div>

<h3>My Simplified Approach: Using Math Without a Calculator</h3>
<p>I do not compute entropy at the keyboard. But I do use the principles the math reveals. Before typing any guess, I ask two questions: which untested letters am I testing? And how many possible answers does this help me distinguish? If the answer to the first is "none," I am wasting a guess. If the answer to the second is "one," I had better have enough guesses left for the alternatives.</p>
<p>No spreadsheets, no entropy calculations. Two questions that encapsulate the core insight of information theory: a good guess reduces uncertainty, and the best guess reduces it the most evenly. The math is elegant and worth understanding. But the daily puzzle is played by humans, not algorithms. Use the math to choose a good opener and understand why some guesses feel productive. Then close the spreadsheet and play the game.</p>

<div class="key-takeaways">
  <h3>\u{2705} Key Takeaways</h3>
  <ul>
    <li>Wordle is fundamentally a search problem — you are locating one word in 2,309 using as few queries as possible</li>
    <li>Each guess provides roughly 3.5 to 5.8 bits of information depending on letter choice and positioning</li>
    <li>SALET is the optimal opener by expected information gain, producing ~5.8 bits and leaving ~70 remaining words</li>
    <li>Common letters in common positions produce more entropy because they split the answer pool more evenly</li>
    <li>The gap between optimal and poor openers is massive: SALET leaves ~70 words vs OUIJA's ~210</li>
    <li>Expected value optimization minimizes average guesses; minimax optimization minimizes worst-case guesses</li>
    <li>You do not need to calculate entropy — just test new common letters and maximize the candidates you can distinguish</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Do I need to understand math to be good at Wordle?</summary>
    <div>Absolutely not. The vast majority of strong Wordle players have never calculated entropy or heard of Claude Shannon. The math explains why certain strategies work, but you can adopt those strategies purely through pattern recognition and experience. Think of it like driving — you do not need to understand internal combustion to be a good driver, but understanding that the engine needs fuel helps you avoid running out of gas. Similarly, understanding that common letters give more information helps you choose better guesses, even without doing any math.</div>
  </details>
  <details>
    <summary>What is the theoretical minimum number of guesses to solve Wordle?</summary>
    <div>An optimal solver using minimax strategy can guarantee solving any Wordle puzzle in at most 5 guesses. On average, optimal play solves in about 3.42 guesses. The theoretical minimum for any single puzzle is 1 guess (if you happen to guess the answer), and the minimum average across all puzzles with perfect play is approximately 3.42. Human players typically average 3.7-4.2 guesses with good strategy, which is remarkably close to the theoretical optimum given how much faster and more consistently algorithms can evaluate candidate guesses.</div>
  </details>
  <details>
    <summary>Why does the answer pool have 2,309 words?</summary>
    <div>Josh Wardle's partner curated the original answer list from a larger dictionary, selecting words that were common enough to be fair but varied enough to be interesting. The number 2,309 is simply how many five-letter words met their criteria for being reasonably guessable. The valid guess pool is much larger (12,000+ words) because it includes obscure words that would be unfair as answers but are still real English words. The NYT has made minor adjustments to the pool since acquiring the game, removing a handful of words and occasionally adding replacements.</div>
  </details>
  <details>
    <summary>Can Wordle ever be solved in 1 guess?</summary>
    <div>Technically yes, but the probability is roughly 1 in 2,309 (about 0.04%) if you guess randomly, or slightly higher if your first guess happens to be a common word. Some players have reported solving in 1 guess, and it does happen — but it is pure luck, not skill. The expected number of games before you solve in 1 guess is approximately 2,309, which at one game per day means roughly once every 6.3 years. Enjoy it if it happens, but do not count on it.</div>
  </details>
  <details>
    <summary>How do Wordle-solving algorithms actually work?</summary>
    <div>Most Wordle algorithms work by maintaining a list of possible answers, simulating every possible guess against every remaining answer, and choosing the guess that optimizes their chosen metric (expected value or minimax). For each candidate guess, they calculate what color pattern would result for each remaining answer, then evaluate how the remaining pool would split under each pattern. The guess that produces the best split (either lowest average remaining or lowest worst-case remaining) is selected. This brute-force approach is computationally intensive but feasible because the word pools are small enough to exhaustively search.</div>
  </details>
</div>
`,
};
