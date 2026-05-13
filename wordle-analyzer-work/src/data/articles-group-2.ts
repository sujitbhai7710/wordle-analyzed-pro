export const articlesGroup2: Record<string, string> = {
  "common-wordle-mistakes": `
<h2>You've Played 400 Games of Wordle and You Still Make These Mistakes</h2>

<p>I've been analyzing my own Wordle data for over a year now, and here's the uncomfortable truth: the mistakes that cost me guesses aren't the ones I made as a beginner. They're subtle, insidious habits that creep in when you think you've got the game figured out. After reviewing hundreds of my own games and tracking every guess, I've identified seven mistakes that even seasoned players make regularly. Some of them cost you a guess. Some of them cost you a streak. The worst part? You probably don't even realize you're making most of them.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">7</div>
    <div class="stat-label">Common Mistakes</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">4.1 → 3.7</div>
    <div class="stat-label">Avg After Fixes</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~30%</div>
    <div class="stat-label">Games Affected</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">6x</div>
    <div class="stat-label">Gray Letter Reuses</div>
  </div>
</div>

<h3>1. Reusing gray letters when the clock is ticking</h3>

<p>This one feels too basic to mention until it happens to you at 11:52 PM with your streak on the line. You type <strong>SHARK</strong>, get all gray, and three guesses later you're typing <strong>CHANT</strong> without realizing the A was already eliminated. It happens because your brain doesn't store negative information as efficiently as positive information. Greens and yellows stick in your memory. Grays fade. This is a well-documented cognitive bias called "positive information preference," and Wordle exploits it ruthlessly every single day.</p>

<p><strong>The real cost:</strong> I tracked this over two months and caught myself reusing a gray letter six times. Four of those times, it wasted an entire guess — not just a suboptimal guess, but a completely useless one. That's the difference between solving in 4 and solving in 5, or between solving in 6 and failing entirely. Each wasted guess compounds the problem because you're now one guess shorter with the same number of unknowns remaining.</p>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>The Fix:</strong> Before you hit enter, physically scan the on-screen keyboard. The Wordle interface grays out letters for exactly this reason. If you're typing on a physical keyboard, make it a habit to glance at the on-screen keyboard after each guess. I also keep a mental "dead letter pile" that I actively rehearse before each guess: "No S, no H, no R..."</p>
  </div>
</div>

<h3>2. Fixating on green letters instead of narrowing the field</h3>

<p>You get a green <strong>_R___</strong> on guess two, and suddenly your brain locks onto <strong>TRAIN, TRAIL, TRACK, TRASH</strong>. You spend guesses three, four, and five trying to fill in around that R instead of using those guesses to eliminate large groups of letters. It's the most natural thing in the world — you got a hit, you want to build on it. But it's often the wrong play, and understanding why requires fighting against every instinct the game has trained into you.</p>

<p><strong>Why it's tempting:</strong> Wordle rewards you with green. Green feels like progress. The game's entire visual design reinforces this — green is success, green is good. But a single green letter at guess two doesn't mean you're close to the answer. It means you know one letter in one position, and there are still hundreds of possible words that could fit the pattern.</p>

<p><strong>The cost:</strong> Let's say you have <strong>_R___</strong> and there are 40 possible words that fit. If you guess <strong>TRAIN</strong> and get all gray on the remaining letters, you've eliminated maybe 5 possibilities. If instead you guess <strong>SPOKE</strong> (using no confirmed letters but testing five new high-frequency ones), you might eliminate 25 possibilities in one shot. The math is not even close.</p>

<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <p><strong>Warning:</strong> If you have more than 8 possible answers left, you should still be in information-gathering mode. Greens are anchors for later guesses, not a sprint toward the finish line. The most common mistake is treating every green as an invitation to solve immediately.</p>
  </div>
</div>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>✅ Narrow the Field First</h4>
    <p>Guess <strong>SPOKE</strong> — tests 5 new high-frequency letters, potentially eliminates 25 of 40 possibilities in one guess. Sets up clean solve in guesses 4-5.</p>
  </div>
  <div class="comparison-card negative">
    <h4>❌ Fixate on the Green</h4>
    <p>Guess <strong>TRAIN</strong> — only eliminates ~5 possibilities if wrong. You're still left with 35 candidates and burning through guesses without gaining information.</p>
  </div>
</div>

<h3>3. Ignoring letter frequency when choosing your next guess</h3>

<p>There are 26 letters in the alphabet, but they don't show up equally in five-letter words. E appears in roughly 11% of Wordle answers. X appears in about 0.3%. And yet, under pressure, I've guessed <strong>FLUX</strong> when <strong>CLERK</strong> was a perfectly valid option that tested far more likely letters. The difference between these two choices isn't subtle — it's the difference between testing letters that appear in thousands of words versus letters that appear in dozens.</p>

<p><strong>The specific scenario:</strong> You've eliminated A, E, and O. The remaining vowels could be I, U, or Y. You also need consonants. Instead of testing high-frequency consonants like R, S, T, N, L, you guess something like <strong>PUCKY</strong> because you're trying to force a solve. P, C, K, and Y are all in the bottom half of letter frequency. You're testing unlikely letters when likely ones remain untested, and every low-frequency letter you test is a wasted opportunity to eliminate a large chunk of possibilities.</p>

<table>
  <thead>
    <tr>
      <th>Tier</th>
      <th>Letters</th>
      <th>Avg. Frequency in Answers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Top Tier</strong></td>
      <td>E, A, R, O, T, L, I, S, N</td>
      <td>6–11%</td>
    </tr>
    <tr>
      <td><strong>Mid Tier</strong></td>
      <td>C, U, D, P, M, H, Y, G, B</td>
      <td>2–5%</td>
    </tr>
    <tr>
      <td><strong>Low Tier</strong></td>
      <td>F, K, W, V, Z, X, Q, J</td>
      <td>0.3–2%</td>
    </tr>
  </tbody>
</table>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">E</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 100%">11.0%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">A</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 85%">8.5%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">R</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 75%">7.5%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">O</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 65%">6.5%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">T</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 60%">6.0%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">X</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 3%">0.3%</div></div>
  </div>
</div>

<div class="callout callout-key">
  <div class="callout-icon">🔑</div>
  <div class="callout-content">
    <p><strong>Key Principle:</strong> Memorize the rough order of letter frequency: E, A, R, O, T, L, I, S, N, C, U, D, P, M, H, Y, G, B, F, K, W, V, Z, X, Q, J. When building a guess, prioritize untested letters from the top of this list. A guess testing R, S, T, N is worth far more than one testing Z, X, Q, J.</p>
  </div>
</div>

<h3>4. Forgetting about duplicate letters</h3>

<p>Wordle answers can — and do — contain duplicate letters. <strong>SILLY, FLOOD, BALSA, TEETH, COMMA</strong>. About 7% of Wordle answers contain a repeated letter. But when you're staring at a yellow L and trying to figure out where it goes, the thought "what if there are two Ls?" rarely crosses your mind until it's too late. Your brain naturally treats each slot as independent, and that assumption costs you guesses in roughly one out of every fourteen games.</p>

<p><strong>The example that haunts me:</strong> I had <strong>_OUND</strong> after guess three. I guessed <strong>ROUND, BOUND, HOUND, MOUND</strong>, and <strong>FOUND</strong> across guesses four through... wait, that's only five guesses total. But the answer was <strong>WOUND</strong>, which I didn't consider because I'd already mentally checked off W. Except I hadn't — I was so focused on filling that first slot that I forgot W was still in play. The even costlier mistake is when the answer is something like <strong>SLEEP</strong> and you never think about the double E because your brain treats each letter slot as independent.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile green">U</div>
    <div class="wordle-demo-tile green">N</div>
    <div class="wordle-demo-tile green">D</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">B</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile green">U</div>
    <div class="wordle-demo-tile green">N</div>
    <div class="wordle-demo-tile green">D</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">W</div>
    <div class="wordle-demo-tile green">O</div>
    <div class="wordle-demo-tile green">U</div>
    <div class="wordle-demo-tile green">N</div>
    <div class="wordle-demo-tile green">D</div>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>Repeated Pair</th>
      <th>Frequency</th>
      <th>Example Words</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>LL</strong></td>
      <td>Most common</td>
      <td>SILLY, BELLY, JELLY</td>
    </tr>
    <tr>
      <td><strong>SS</strong></td>
      <td>Very common</td>
      <td>CLASS, GLASS, BLISS</td>
    </tr>
    <tr>
      <td><strong>EE</strong></td>
      <td>Very common</td>
      <td>SLEEP, STEEP, BEEFY</td>
    </tr>
    <tr>
      <td><strong>OO</strong></td>
      <td>Common</td>
      <td>FLOOD, BLOOM, SCOOT</td>
    </tr>
    <tr>
      <td><strong>TT / RR / FF / CC</strong></td>
      <td>Less common</td>
      <td>ATTIC, CARRY, OFFAL, ACCUR</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>The Fix:</strong> When you're stuck with 3-4 possibilities and none of your guesses are working, explicitly ask: "Could any of these have a repeated letter?" If you've got a yellow L and can't place it, always consider the double-L possibility. This single habit has saved me from at least a dozen failures.</p>
  </div>
</div>

<h3>5. Playing too fast</h3>

<p>My average solve time dropped from 4.2 guesses to 3.8 guesses when I started spending more time on each guess. That sounds counterintuitive — shouldn't faster intuition be better? Not in Wordle. Speed leads to lazy guesses. Speed leads to reusing gray letters (see mistake 1). Speed leads to guessing the first word that fits your greens instead of the best word that fits your strategy. The data is unambiguous: every second you spend thinking before submitting improves your average outcome.</p>

<p><strong>The scenario:</strong> You're on guess three. You have <strong>_A_E_</strong> with yellows on R and T. You immediately type <strong>LATER</strong> because it fits. But you didn't consider <strong>CARET, PAYER, RATED</strong>, or the elimination guess <strong>STRIP</strong> that would test S, I, P and help you narrow much faster. You went with the first thing that popped into your head, and the first thing that pops into your head is almost never the optimal play.</p>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <p><strong>Pause 30 seconds minimum</strong> between seeing results and submitting your next guess. Scan the board, check dead letters, and consider at least two options before committing.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <p><strong>Generate alternatives.</strong> Force yourself to think of at least one other valid guess before submitting. Even if you go with your first instinct, the act of considering alternatives often reveals better options.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <p><strong>Ask: "Am I gathering info or solving?"</strong> If you still have 8+ possibilities, you should be gathering information. Don't sprint to an answer when the field is still wide open.</p>
  </div>
</div>

<h3>6. Not considering positional probability</h3>

<p>Not all letters are equally likely in all positions. Y is extremely common at the end of a word (<strong>FUNNY, JUICY, NASTY</strong>) but rare at the beginning. S is the most common starting letter in the English language but a mediocre ending letter in Wordle answers (plural words were largely removed from the answer list). T and D are common endings. Consonant clusters like STR, SCR, and SPL are common starters. Positional thinking transforms yellows from vague hints into powerful constraints.</p>

<p><strong>The mistake in action:</strong> You have a yellow S and you're trying to figure out where it goes. You try it in position 3 (<strong>__S__</strong>) or position 4 (<strong>___S_</strong>) before trying it in position 1 (<strong>S____</strong>). But S starts roughly 15% of Wordle answers. Testing it in the most likely position first saves guesses on average, even though it feels more creative to experiment with unusual placements.</p>

<table>
  <thead>
    <tr>
      <th>Position</th>
      <th>Most Common Letters</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1st</strong></td>
      <td>S, C, B, P, T, F</td>
      <td>Consonant-heavy; S dominates at ~15%</td>
    </tr>
    <tr>
      <td><strong>2nd</strong></td>
      <td>A, O, R, E, I, H</td>
      <td>Vowels dominate; A most common</td>
    </tr>
    <tr>
      <td><strong>3rd</strong></td>
      <td>A, I, O, E, N, R</td>
      <td>Mixed; still vowel-leaning</td>
    </tr>
    <tr>
      <td><strong>4th</strong></td>
      <td>E, N, S, A, L, I</td>
      <td>E most common; transition position</td>
    </tr>
    <tr>
      <td><strong>5th</strong></td>
      <td>Y, D, E, T, K</td>
      <td>Y dominates; consonant endings common</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <p><strong>Positional Heuristic:</strong> When you have a yellow letter, try it in its most common position before experimenting with unlikely ones. Vowels dominate positions 2 and 4. S, C, B, P dominate position 1. Y, D, E, T dominate position 5. This simple rule eliminates the most possibilities fastest.</p>
  </div>
</div>

<h3>7. Refusing to make elimination guesses</h3>

<p>This is the hardest habit to break because it goes against every instinct. When you have <strong>_IGHT</strong> after guess three, you have at least 8 possibilities: <strong>NIGHT, LIGHT, SIGHT, MIGHT, RIGHT, TIGHT, FIGHT, WIGHT</strong>. You want to guess one of them. You want to solve it. But guessing <strong>NIGHT</strong> is a 1-in-8 shot, and if you're wrong, you've only eliminated one possibility. You've turned a puzzle into a coin flip, and the stakes are your streak.</p>

<p><strong>The alternative:</strong> Guess <strong>SNARL</strong>. It's not a possible answer given your constraints, but it tests S, N, R, L — four consonants that differentiate between those 8 words. If S comes up green or yellow, you know it's SIGHT. If N shows up, it's NIGHT. If both are gray, you've eliminated both in one guess. This is called an elimination guess, and it's the single most powerful technique in advanced Wordle play.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile green">I</div>
    <div class="wordle-demo-tile green">G</div>
    <div class="wordle-demo-tile green">H</div>
    <div class="wordle-demo-tile green">T</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile yellow">S</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">R</div>
    <div class="wordle-demo-tile gray">L</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">I</div>
    <div class="wordle-demo-tile green">G</div>
    <div class="wordle-demo-tile green">H</div>
    <div class="wordle-demo-tile green">T</div>
  </div>
</div>

<div class="callout callout-important">
  <div class="callout-icon">❗</div>
  <div class="callout-content">
    <p><strong>Critical Point:</strong> If you have more than 4 viable answers left at guess 4 or later, consider an elimination guess. Find a word that tests the maximum number of differentiating letters between your candidates. I started using elimination guesses systematically about six months ago, and my average dropped from 4.1 to 3.7. The math is clear: elimination guesses save you guesses on average compared to blind guessing.</p>
  </div>
</div>

<div class="key-takeaways">
  <h3>✅ Key Takeaways</h3>
  <ul>
    <li>Always scan for gray letters before submitting — your brain discards negative information faster than positive information</li>
    <li>Greens are anchors, not solutions — with 8+ possibilities left, prioritize information gathering over solving</li>
    <li>Test high-frequency letters first; a guess using R, S, T, N eliminates far more than one using Z, X, Q, J</li>
    <li>Always consider duplicate letters when stuck; LL, SS, and EE appear in roughly 7% of answers</li>
    <li>Force a 30-second pause before each guess; speed kills in Wordle</li>
    <li>Use positional probability to place yellow letters in their most common positions first</li>
    <li>Elimination guesses feel wasteful but save guesses on average when you have 4+ candidates remaining</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>What's the single most costly mistake on this list?</summary>
    <div>Refusing to make elimination guesses (mistake 7) costs the most guesses on average. When you have 8+ possibilities and guess blindly instead of narrowing, you're essentially gambling with your streak. Players who adopt elimination guesses consistently see their average drop by 0.3-0.5 guesses — the equivalent of discovering a better opener. Combined with mistake 2 (fixating on greens), these two habits account for the majority of suboptimal games.</div>
  </details>
  <details>
    <summary>How do I remember to check for gray letters under time pressure?</summary>
    <div>Build the habit during low-stakes games. Every time you submit a guess, before looking at the results, verbally list the gray letters so far. ("No S, no H, no R...") This forces your brain to actively maintain the negative information rather than letting it fade. After a few weeks, the scan becomes automatic. You can also use the on-screen keyboard as a visual reminder — the grayed-out letters are your "do not use" list.</div>
  </details>
  <details>
    <summary>Are elimination guesses ever a bad idea?</summary>
    <div>Yes — when you have 3 or fewer remaining possibilities, it's almost always better to guess one of them directly. The elimination guess advantage only applies when the number of candidates is large enough that narrowing is more efficient than guessing. At 3 candidates, a direct guess gives you a 33% chance of solving; at 8 candidates, it's only 12.5%. That's the threshold where narrowing becomes the mathematically superior strategy.</div>
  </details>
  <details>
    <summary>How often do duplicate letters actually appear in Wordle answers?</summary>
    <div>Roughly 7% of Wordle answers contain a repeated letter, which means you'll encounter one about once every two weeks. LL, SS, and EE are by far the most common repeated pairs. The key insight isn't the frequency — it's that duplicate-letter answers disproportionately appear in your hardest games, because the repeated letter makes them harder to deduce through normal elimination logic.</div>
  </details>
  <details>
    <summary>Should I change my opener if I'm making these mistakes?</summary>
    <div>Your opener isn't the problem — your decision-making after the opener is. That said, if your opener doesn't include at least two vowels and three of the top-10 most common consonants (E, A, R, O, T, L, I, S, N), you're starting at a disadvantage. SLATE, CRANE, and TRACE are all strong openers that set up good second-guess decisions. The mistakes on this list happen on guesses 2-6, not guess 1.</div>
  </details>
</div>
`,

  "wordle-streak-survival": `
<h2>340 Days and Counting: What It Actually Takes to Never Lose a Wordle Streak</h2>

<p>My current Wordle streak sits at 347 days as I write this. That sounds impressive, but honestly, it's less about skill and more about paranoia. I've come close to losing it at least a dozen times — down to my sixth guess with my heart rate elevated, staring at a keyboard that seemed to offer no good options. What I've learned from keeping a streak alive this long is that streak survival is a different skill from Wordle skill. You can be great at the game and still lose your streak if you don't protect it with specific habits and strategies designed for worst-case scenarios.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">347</div>
    <div class="stat-label">Current Streak</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">12+</div>
    <div class="stat-label">Near-Death Games</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~8</div>
    <div class="stat-label">Saves From Breaks</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">0</div>
    <div class="stat-label">Times Played After 9 PM</div>
  </div>
</div>

<h3>Why your streak matters more than you think</h3>

<p>I know people who say "it's just a number" and reset without caring. That's fine for them. But for a lot of us, the streak represents something specific: consistency, discipline, a small daily commitment honored. It's a promise you made to yourself that you've kept every single day. When you're on day 200, the idea of breaking that chain is genuinely unpleasant, and that's not irrational — it's the same psychology that makes "Don't Break The Chain" calendars work for Jerry Seinfeld and thousands of others. The streak isn't about bragging rights. It's about the satisfaction of a sustained commitment.</p>

<p>And here's the thing: the longer your streak gets, the more protective you become, and the more carefully you play. This creates a virtuous cycle — your paranoia makes you a better player, which extends your streak, which makes you more paranoid. The streak itself becomes a performance-enhancing pressure, as long as it doesn't cross into anxiety territory.</p>

<h3>The number one rule: never play when you're rushed</h3>

<p>Every near-death experience I've had with my streak shares one thing in common: I was playing while doing something else. Waiting for a meeting to start, standing in line at the grocery store, sitting at a red light. When you're distracted, you make lazy guesses. You don't consider elimination options. You reuse gray letters. You go with the first word that fits instead of the best word. Rushed Wordle is bad Wordle, and bad Wordle is how streaks die.</p>

<p>I have a hard rule now: I don't open Wordle unless I have at least 10 clear minutes ahead of me. Not 10 minutes where I might be interrupted. 10 minutes where I'm sitting down, focused, and able to think through each guess properly. This single habit has saved my streak more times than any strategic insight or clever opener ever could. The best strategy in the world fails when you don't give yourself time to execute it.</p>

<div class="callout callout-important">
  <div class="callout-icon">❗</div>
  <div class="callout-content">
    <p><strong>Non-Negotiable Rule:</strong> Never play Wordle when you can't give it your full attention for at least 10 minutes. Every streak-ending loss I've witnessed in my social circle happened during a rushed, distracted session. The game gives you exactly enough rope to hang yourself — don't add distractions to the noose.</p>
  </div>
</div>

<h3>The 5-minute minimum for thinking through tough spots</h3>

<p>Most Wordle games, I can solve in under two minutes. The first three guesses often flow naturally. But when I hit a wall — when guess three leaves me with a pattern that has 15 possible answers — I force myself to stop. Not for 30 seconds. For at least 5 minutes. I'll set my phone down, get a glass of water, come back with fresh eyes. You'd be amazed how often the answer becomes obvious after a short break. Your subconscious keeps working on the problem while your conscious brain is pouring water, and the solution it surfaces is almost always better than the one you'd have forced under pressure.</p>

<div class="process-flow">
  <div class="process-step">
    <div class="process-step-icon">🎯</div>
    <div class="process-step-label">Hit a Wall</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">📱</div>
    <div class="process-step-label">Put Phone Down</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">⏱️</div>
    <div class="process-step-label">Wait 5+ Min</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">🔄</div>
    <div class="process-step-label">Return Fresh</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">✅</div>
    <div class="process-step-label">Solve It</div>
  </div>
</div>

<h3>Stuck on guess 4 with 15+ possibilities</h3>

<p>This is the most dangerous scenario for your streak. You've got <strong>_A_ER</strong> or <strong>_OINT</strong> or some other maddening pattern with too many solutions and too few guesses. Here's exactly what I do, step by step, every single time:</p>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <p><strong>List the possibilities mentally (or on paper).</strong> For <strong>_OINT</strong>, you've got JOINT, POINT... and that might be it. Sometimes listing them out reveals there are fewer than you feared. The panic comes from imagining infinite possibilities; the paper reveals finite ones.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <p><strong>Look for the differentiating letters.</strong> If your candidates are NIGHT, LIGHT, SIGHT, MIGHT, RIGHT, TIGHT, FIGHT, and WIGHT — the differentiating letters are N, L, S, M, R, T (at position 1), F, and W. You need to test as many of these as possible in one guess.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <p><strong>Play the elimination guess.</strong> A word like <strong>SNARL</strong> tests S, N, R, and L in positions that help differentiate. One guess can cut your possibilities from 8 to 2 or 3.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">4</div>
  <div class="step-content">
    <p><strong>Don't try to solve — try to narrow.</strong> At guess 4 with many possibilities, your job isn't to guess the answer. Your job is to make guess 5 manageable. The solve comes on guess 5 or 6; guess 4 is for setting up the kill.</p>
  </div>
</div>

<h3>The "give up a guess to gain information" tactic</h3>

<p>This is the single most counterintuitive streak-saving strategy, and it took me months to accept it. When you sacrifice a guess to gain information — by guessing a word that can't possibly be the answer but tests multiple unknown letters — you're trading a guess for certainty. And in streak protection mode, certainty is worth more than hope. Hope is what gets you killed; certainty is what keeps your streak alive for another day.</p>

<p>Concrete example: I had <strong>_ASTE</strong> on guess 3. Possible answers included PASTE, TASTE, WASTE, CASTE, HASTE, and BASTE. Instead of guessing one of these, I guessed <strong>CHIMP</strong>. It tested C, H, M, and P — four letters that would immediately narrow my list. The H came up yellow. HASTE it was. Solved on guess 5, streak intact. If I'd guessed PASTE and been wrong, I'd have been down to guess 5 with 5 remaining possibilities — a coin flip for my streak.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile empty">_</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">T</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile yellow">H</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile gray">M</div>
    <div class="wordle-demo-tile gray">P</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">H</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">S</div>
    <div class="wordle-demo-tile green">T</div>
    <div class="wordle-demo-tile green">E</div>
  </div>
</div>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>Streak-Saving Heuristic:</strong> When you have 6+ possibilities at guess 3, or 4+ at guess 4, don't guess a candidate — guess an eliminator. The CHIMP approach (testing differentiating letters) turned a 1-in-6 shot into a near-certain solve. Streak survival is about risk management, not heroics.</p>
  </div>
</div>

<h3>Handling uncommon letter patterns</h3>

<p>Some of the scariest Wordle moments come from answers with unusual patterns: words starting with X or Z, words with Q but no U, words ending in -PT (<strong>ADAPT, EXCEPT</strong>) or -MB (<strong>THUMB, PLUMB</strong>). These are dangerous because they don't fit the common patterns your brain defaults to, and your brain's default patterns are what you rely on when you're under pressure.</p>

<p>My approach: when I'm stuck and the common patterns aren't working, I explicitly run through a mental checklist of unusual patterns. Does the word start with an uncommon letter? Could there be a consonant cluster I'm missing? Is there a repeated letter I haven't considered? Words like <strong>NYMPH, CRYPT, GYPSY</strong> — they break the normal vowel-consonant patterns and they're exactly the ones that eat your guesses and threaten your streak.</p>

<table>
  <thead>
    <tr>
      <th>Unusual Pattern</th>
      <th>Examples</th>
      <th>Why It's Dangerous</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Vowel-less words</strong></td>
      <td>CRYPT, GYPSY, NYMPH</td>
      <td>Y as only "vowel" breaks elimination logic</td>
    </tr>
    <tr>
      <td><strong>Uncommon clusters</strong></td>
      <td>SPHINX, TWANG, PHLOX</td>
      <td>Consonant groups you rarely test</td>
    </tr>
    <tr>
      <td><strong>Y-as-vowel words</strong></td>
      <td>LYMPH, PYGMY, TRYST</td>
      <td>Vowel-heavy guesses miss entirely</td>
    </tr>
    <tr>
      <td><strong>-MB endings</strong></td>
      <td>THUMB, PLUMB, NUMB</td>
      <td>B is silent; you stop at the M</td>
    </tr>
    <tr>
      <td><strong>-PT endings</strong></td>
      <td>ADAPT, EXCEPT, INEPT</td>
      <td>Rare ending cluster; often overlooked</td>
    </tr>
  </tbody>
</table>

<h3>The late-night trap</h3>

<p>I almost lost my streak at day 89 because of this. It was 11:47 PM, I was exhausted after a long day, and I thought "I'll just do Wordle quickly before bed." I blazed through three guesses without really thinking, hit a wall on guess 4, and suddenly realized I had 8 minutes left and no clear path. I barely solved it on guess 6 with sweaty palms and a racing heart. That experience fundamentally changed how I approach the game, not from a strategy perspective but from a life-management one.</p>

<p>Now I have a rule: no Wordle after 9 PM. Full stop. If I haven't played by then, I'll set an alarm for the next morning and play first thing. Your cognitive processing drops significantly when you're tired, and Wordle rewards careful, deliberate thinking. Late-night Wordle is the enemy of streaks.</p>

<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <p><strong>The Midnight Trap:</strong> I know someone who lost a 280-day streak because she fell asleep mid-game at 11:50 PM. The midnight reset came and went while her phone was on her chest. That's the kind of loss that makes you question your life choices. Don't let it happen to you. Set a hard deadline and treat it like a curfew.</p>
  </div>
</div>

<h3>Setting a daily routine that protects your streak</h3>

<p>The most reliable streak-protecting strategy is also the simplest: play at the same time every day. My routine is coffee at 7 AM, Wordle at 7:15 AM. I'm alert, I'm focused, and nothing is rushing me. The routine eliminates the "when will I squeeze this in" anxiety that leads to rushed games. It also means I never face the 11:50 PM panic. Psychologists call this "habit stacking" — attaching a new behavior to an existing one. "After I finish my morning coffee, I play Wordle" is much easier to maintain than "I need to remember to play Wordle at some point."</p>

<table>
  <thead>
    <tr>
      <th>Time Slot</th>
      <th>Pros</th>
      <th>Cons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>7:00-8:00 AM</strong></td>
      <td>Alert, no time pressure, pairs with coffee</td>
      <td>Requires morning routine</td>
    </tr>
    <tr>
      <td><strong>Lunch break</strong></td>
      <td>Natural pause in the day</td>
      <td>May be interrupted by work</td>
    </tr>
    <tr>
      <td><strong>After dinner</strong></td>
      <td>Relaxed, post-work decompression</td>
      <td>Risk of forgetting, getting too late</td>
    </tr>
    <tr>
      <td><strong>Before 9 PM deadline</strong></td>
      <td>Forces consistency</td>
      <td>Can feel rushed if day was busy</td>
    </tr>
  </tbody>
</table>

<h3>Real games I almost lost</h3>

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-date">Day 203</div>
    <h4>CAULK — The Uncommon Vowel Trap</h4>
    <p>I had <strong>_A_L_</strong> after guess three, and cycled through BALMY, VALVE, and SALVE before landing on CAULK on guess 6. The problem? I never considered that U-after-A pattern. My brain was stuck on common vowel placements. The lesson: uncommon vowel combinations exist, and you need to consider them when common patterns fail.</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">Day 278</div>
    <h4>NASTY — The Uncommon Starter</h4>
    <p>I had <strong>_A_TY</strong> after guess four and guessed PASTY, then wasted a guess on DAIRY (which reused the A and Y I already knew about). Finally got NASTY on guess 6. That game reminded me to always consider less common starting letters and to never waste a guess reusing confirmed letters in the same positions.</p>
  </div>
  <div class="timeline-item">
    <div class="timeline-date">Day 312</div>
    <h4>KNACK — The Double Letter Surprise</h4>
    <p>After getting <strong>K_A__</strong> on guess three, I was stumped because words starting with K are rare. I guessed KAYAK (reusing the K unnecessarily), and barely recovered. Lesson learned: when an uncommon letter shows up green, slow down even more and list out the possibilities before you guess.</p>
  </div>
</div>

<div class="key-takeaways">
  <h3>✅ Key Takeaways</h3>
  <ul>
    <li>Never play Wordle when rushed or distracted — every near-loss shares this factor</li>
    <li>Take a 5-minute break when stuck; your subconscious solves better than your stressed conscious mind</li>
    <li>Elimination guesses are your best friend in streak protection mode — certainty beats hope</li>
    <li>Set a hard 9 PM deadline and pair Wordle with an existing habit for consistency</li>
    <li>Keep a mental list of unusual patterns (vowel-less words, Y-as-vowel, uncommon clusters)</li>
    <li>Your streak is only as strong as your worst day — optimize for your worst, not your best</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>What should I do if I'm about to miss the daily reset?</summary>
    <div>If it's approaching midnight and you haven't played, stop whatever you're doing and play immediately — but play carefully, not frantically. Take deep breaths between guesses. The clock doesn't change the optimal strategy; it only changes your emotional state. If you regularly find yourself in this situation, that's a sign your daily routine needs adjusting. Move your Wordle time earlier in the day permanently.</div>
  </details>
  <details>
    <summary>Is it cheating to take breaks during a game?</summary>
    <div>Absolutely not. Wordle has no time limit per game, only a daily reset. Taking a break to clear your head is a legitimate strategy, not a cheat. In fact, the game's creator has said the daily format was designed to encourage thoughtful play. A 5-minute break that saves your streak is smarter than a 5-minute grind that costs it.</div>
  </details>
  <details>
    <summary>Should I use a different opener when protecting a long streak?</summary>
    <div>No — changing your opener adds unnecessary variability. Your opener should be consistent regardless of streak length. The streak-protection strategies happen on guesses 2-6: slower play, elimination guesses, and careful consideration. Changing your opener mid-streak introduces uncertainty right where you need consistency most. Stick with what you know.</div>
  </details>
  <details>
    <summary>What's the longest Wordle streak ever recorded?</summary>
    <div>There's no official registry, but verified streaks of 500+ days exist in the Wordle community. The theoretical maximum is around 1,100+ days (since Wordle launched in October 2021). What matters more than the number is the consistency — any streak over 100 days represents genuine daily commitment and solid gameplay under pressure.</div>
  </details>
</div>
`,

  "best-second-words": `
<h2>Your Second Wordle Guess Determines Everything — Here's How to Get It Right</h2>

<p>Most people put all their strategic energy into picking the perfect opener. SLATE, CRANE, TRACE, ADIEU — there are entire online communities dedicated to debating which first guess is best. But here's what I've learned from analyzing hundreds of my own games: your second guess matters more. Your opener is a fixed strategy. Your second guess is where the real decision-making happens, and it's the guess most people get wrong. This is the moment where Wordle transforms from a guessing game into a thinking game, and your choice here ripples through every remaining guess.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">3.4</div>
    <div class="stat-label">Avg w/ 3+ New Letters</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">4.3</div>
    <div class="stat-label">Avg Reusing Knowns</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">0.9</div>
    <div class="stat-label">Guess Difference</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">3.5</div>
    <div class="stat-label">Hybrid Approach Avg</div>
  </div>
</div>

<h3>Why guess two is the critical pivot point</h3>

<p>Your first guess is essentially a coin flip — you're throwing five letters at the wall and seeing what sticks. But your second guess is your first <em>informed</em> decision. You have real data now. You know which letters are in the word, which aren't, and (sometimes) where they go. This is the guess that sets up your entire solve trajectory. A good second guess can make the rest of the game feel effortless, like tumblers falling into place. A bad one can leave you fumbling through guesses three, four, and five with too many possibilities and too few remaining guesses.</p>

<p>In my tracked games, I solve in an average of 3.4 guesses when my second guess tests at least three new letters, compared to 4.3 guesses when my second guess only reuses letters I already know something about. That's nearly a full guess difference based on one decision — the single most impactful decision in the entire game. Not your opener. Your second guess.</p>

<h3>The two schools of thought</h3>

<p>There are two competing philosophies for second guesses, and both have merit depending on the situation. Understanding both — and knowing when to apply each — is what separates average players from great ones.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>✅ "Maximize New Information"</h4>
    <p>Ignore what you learned and test five entirely new letters. If SLATE gives you a yellow A and a yellow E, guess <strong>CHORD</strong> or <strong>POUND</strong> to test C, H, O, R, D or P, O, U, N, D. Average solve: <strong>3.6 guesses</strong>. Best for early-game situations with limited information.</p>
  </div>
  <div class="comparison-card negative">
    <h4>❌ "Build on What You Know"</h4>
    <p>Use the green and yellow letters from your first guess and try to find the word. If SLATE gives you a yellow A and a yellow E, guess <strong>RAISE</strong> or <strong>CRANE</strong>. Average solve: <strong>4.2 guesses</strong>. Satisfying when it works, but leaves too many unknowns on average.</p>
  </div>
</div>

<p>The data is pretty clear: the maximize-information approach produces better average solve counts, especially when your first guess doesn't hit much. But the build-on-what-you-know approach can produce spectacular single-game results when it works. The trick is knowing when to use each one, and that depends entirely on what your first guess revealed.</p>

<h3>When your opener gets zero hits (all gray)</h3>

<p>An all-gray first guess feels devastating, but it's actually an opportunity. You've eliminated five letters and you still have five full guesses to work with. This is where the maximize-information strategy shines brightest, because you have the most to gain and the most guesses left to gain it with.</p>

<table>
  <thead>
    <tr>
      <th>Second Guess</th>
      <th>New Letters Tested</th>
      <th>Best After Opener</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>IRONY</strong></td>
      <td>I, R, O, N, Y</td>
      <td>SLATE (zero overlap)</td>
    </tr>
    <tr>
      <td><strong>COULD</strong></td>
      <td>C, O, U, L, D</td>
      <td>SLATE, TRACE</td>
    </tr>
    <tr>
      <td><strong>CHORD</strong></td>
      <td>C, H, O, R, D</td>
      <td>SLATE, TRACE</td>
    </tr>
    <tr>
      <td><strong>BUMPS</strong></td>
      <td>B, U, M, P, S</td>
      <td>Vowel-heavy openers</td>
    </tr>
    <tr>
      <td><strong>POUND</strong></td>
      <td>P, O, U, N, D</td>
      <td>SLATE, CRANE</td>
    </tr>
  </tbody>
</table>

<p>After two guesses with no overlap, you've tested 10 distinct letters. That covers roughly 70% of all letters that appear in Wordle answers. You're almost guaranteed to have multiple hits by this point, which sets up a clean solve in guesses three and four. The all-gray opener isn't bad luck — it's a structured opportunity to cast a very wide net.</p>

<h3>When you get one yellow letter</h3>

<p>A single yellow is the trickiest outcome because it gives you information but not much of it. You know one letter is in the word, but you don't know where. The temptation is to immediately try to place that letter. Resist — at least partially. One yellow letter is not enough information to start solving. It's a starting point for gathering more information, not a solution in progress.</p>

<p><strong>My approach:</strong> Include the yellow letter in a new position (to test if it goes elsewhere) but make sure the other four letters in your guess are entirely new and high-frequency. For example, if <strong>SLATE</strong> gives you a yellow A in position 3, I might guess <strong>CHAIR</strong>. It moves the A to position 4 (testing a new spot), and it tests C, H, I, R — four new letters.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile gray">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile gray">H</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile gray">R</div>
  </div>
</div>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>What NOT to do:</strong> Don't guess <strong>SMART</strong> after a yellow A from SLATE. It reuses S, T (which you already know aren't in helpful positions), and only tests two new letters (M, R). That's a wasted opportunity when you could be gathering much more information with four new letters.</p>
  </div>
</div>

<h3>When you get one green letter</h3>

<p>A single green is slightly better than a single yellow because you've pinned down a position, but it's still early enough that building around it is often premature. The key factor is <em>where</em> the green is. Position 2 and 4 greens (typically vowels) are high-information; position 1 and 5 greens are low-information because they're common positions with many possible completions.</p>

<table>
  <thead>
    <tr>
      <th>Green Position</th>
      <th>Information Level</th>
      <th>Recommended Approach</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Position 1</strong> (e.g., T____)</td>
      <td>Low — very common start</td>
      <td>Keep letter, test 4 new ones (e.g., THINK)</td>
    </tr>
    <tr>
      <td><strong>Position 2</strong> (e.g., _A___)</td>
      <td>High — vowel placement</td>
      <td>Consider building (e.g., GAMES)</td>
    </tr>
    <tr>
      <td><strong>Position 3-4</strong> (e.g., __A__ or ___E_)</td>
      <td>Very high — constrains structure</td>
      <td>Build around it; word shape is narrowed</td>
    </tr>
    <tr>
      <td><strong>Position 5</strong> (e.g., ____E)</td>
      <td>Low — common ending</td>
      <td>Treat like position 1; test new letters</td>
    </tr>
  </tbody>
</table>

<h3>When you get multiple hits</h3>

<p>Two or more greens/yellows on your first guess is the dream scenario, but it comes with its own trap: the temptation to solve immediately. You've got <strong>_RAIN</strong> on guess one and you want to guess <strong>TRAIN</strong> immediately. But what if it's <strong>BRAIN, GRAIN, DRAIN</strong>? You don't know, and you have plenty of guesses left to find out. My rule of thumb: if I can count the remaining possibilities on one hand, I'll try to solve. If I can't, I'll narrow. The border is roughly 5 possibilities.</p>

<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <p><strong>The 5-Possibility Threshold:</strong> With 5 or fewer candidates, the odds of solving are good enough to take a direct shot. With more than 5, information gathering is still the better play. This threshold is based on expected value calculations — below 5, the expected cost of a wrong guess is low enough that the potential reward of solving justifies the risk.</p>
  </div>
</div>

<h3>The vowel sweep strategy for guess two</h3>

<p>If your opener was consonant-heavy (like <strong>CRANE</strong>), you've already tested A and E but not I, O, or U. Your second guess should sweep the remaining vowels. Words like <strong>POISE</strong> (tests O, I) or <strong>OUTER</strong> (tests O, U) are excellent for this. Knowing which vowels are in the word narrows the possibilities dramatically — vowels are the skeleton of any five-letter word, and knowing the skeleton tells you a lot about the shape of the answer.</p>

<p>I use a vowel-heavy second guess roughly 60% of the time, specifically when my opener only tested one or two vowels. The data supports this strongly: when I know all the vowels in a word by guess two, I solve in an average of 3.5 guesses. When I'm still missing a vowel at guess three, that average jumps to 4.4. That's almost a full guess penalty for delaying vowel discovery.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">POISE</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 90%">O, I + P, S, E</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">OUTER</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 85%">O, U + T, E, R</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">AUDIO</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 80%">A, U, I, O + D</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">IRONY</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 75%">I, O + R, N, Y</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">COULD</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 70%">O, U + C, L, D</div></div>
  </div>
</div>

<h3>What the data says about second-guess strategies</h3>

<p>I analyzed 500 of my own games and categorized my second guesses into three types: "building" (using most revealed letters), "sweeping" (testing mostly new letters), and "hybrid" (including one revealed letter plus new letters). The results were clear and have fundamentally changed how I approach every game.</p>

<table>
  <thead>
    <tr>
      <th>Strategy</th>
      <th>Avg Solve</th>
      <th>Description</th>
      <th>Best When</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Building</strong></td>
      <td>4.2 guesses</td>
      <td>Reuses most revealed letters</td>
      <td>3 or fewer candidates</td>
    </tr>
    <tr>
      <td><strong>Sweeping</strong></td>
      <td>3.6 guesses</td>
      <td>Tests mostly new letters</td>
      <td>Gray-heavy first guess</td>
    </tr>
    <tr>
      <td><strong>Hybrid</strong></td>
      <td>3.5 guesses</td>
      <td>One revealed + 4 new letters</td>
      <td>1-2 yellows from opener</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-key">
  <div class="callout-icon">🔑</div>
  <div class="callout-content">
    <p><strong>Winning Strategy:</strong> The hybrid approach — including one piece of known information while testing four new letters — edges out pure sweeping by a small margin. It's what I now default to in most situations. The building approach, while satisfying when it works, produces the worst average outcomes because it leaves too many unknowns for guesses three and beyond.</p>
  </div>
</div>

<div class="key-takeaways">
  <h3>✅ Key Takeaways</h3>
  <ul>
    <li>Your second guess has more impact on your final solve count than any other guess — including your opener</li>
    <li>The hybrid strategy (1 revealed letter + 4 new high-frequency letters) produces the best average results at 3.5 guesses</li>
    <li>When your opener gets all gray, treat it as an opportunity — test 5 completely new high-frequency letters</li>
    <li>A single yellow is not enough to start solving; include it but prioritize testing new letters</li>
    <li>Sweep remaining vowels on guess two when your opener only tested 1-2 vowels — it saves nearly a full guess on average</li>
    <li>Position 2 and 4 greens are high-information; positions 1 and 5 greens are low-information</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Should I ever use my second guess to try to solve the word directly?</summary>
    <div>Only if you have 3 or fewer candidates after your first guess. With 1-2 greens and 1-2 yellows that together narrow the possibilities to a handful, taking a direct shot makes sense. But most first guesses don't produce that level of constraint. If you have more than 5 possibilities, you should still be in information-gathering mode on guess two.</div>
  </details>
  <details>
    <summary>What if my opener and second guess both get no hits?</summary>
    <div>This is rare but not disastrous. After testing 10 letters with no hits, you've eliminated roughly 70% of common letters. Your third guess should focus on the remaining high-frequency letters you haven't tested. Words built from the remaining common letters (whatever they are for your specific openers) will almost certainly hit something. With 4 guesses remaining and only ~30% of letters to search, you're in good shape.</div>
  </details>
  <details>
    <summary>Does the hybrid strategy work with any opener?</summary>
    <div>Yes, but it works best with openers that test high-frequency letters. If your opener is something unusual like FUZZY, the hybrid approach is less effective because the information from your first guess is lower-quality. The strategy assumes your opener gave you meaningful data to work with — which is another reason to use a strong, consistent opener like SLATE or CRANE.</div>
  </details>
  <details>
    <summary>How important is it to test vowels on the second guess?</summary>
    <div>Very important if your opener only tested one vowel. The difference between knowing your vowels by guess 2 (3.5 avg) versus guess 3 (4.4 avg) is nearly a full guess. Vowels are the structural backbone of five-letter words — knowing which ones are present eliminates enormous swaths of the dictionary. If your opener was CRANE (tested A, E), your second guess should target O, I, or U.</div>
  </details>
  <details>
    <summary>Why does building on known letters perform so poorly?</summary>
    <div>Because it sacrifices information gain for the illusion of progress. When you reuse 3-4 known letters in your second guess, you're only testing 1-2 new letters. Those new letters have to cover all the remaining unknowns. It's like searching a house one room at a time versus searching all rooms simultaneously — the broad approach finds the answer faster on average, even though the focused approach occasionally gets lucky.</div>
  </details>
</div>
`,

  "wordle-vs-quordle": `
<h2>One Word or Eight? Finding the Wordle Variant That Matches How Your Brain Works</h2>

<p>I started playing Wordle in January 2022, like everyone else. By March, I was looking for something harder. By June, I was deep in the multi-word variant rabbit hole. I've now spent hundreds of hours across Wordle, Quordle, Octordle, Dordle, and yes, even Sedecordle. Each one scratches a different itch, and each one requires a fundamentally different strategy. Here's my honest assessment of which variant is worth your time based on how you actually think, not how you wish you thought.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">1→16</div>
    <div class="stat-label">Words to Solve</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">6→21</div>
    <div class="stat-label">Guesses Available</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">97%</div>
    <div class="stat-label">Dordle Success Rate</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~80%</div>
    <div class="stat-label">Octordle Success Rate</div>
  </div>
</div>

<h3>Wordle: the one that started everything</h3>

<p>One word. Six guesses. Twenty-four hours between puzzles. Wordle is the distilled version of this entire genre, and its simplicity is its strength. You have exactly enough guesses to solve the puzzle if you play well, and exactly few enough to fail if you don't. The margins are thin, and that's what makes it compelling. Every letter matters, every guess is a commitment, and the daily cadence creates a ritual that no variant has successfully replicated.</p>

<p><strong>Time commitment:</strong> 3-8 minutes per day. Most games are over in under 5 minutes for experienced players. <strong>Who it's for:</strong> Everyone. Wordle is the gateway. If you only have time for one daily puzzle, this is the one. It's also the best version for streak obsessives — the daily reset creates a genuine sense of commitment that the variants don't quite match. <strong>Strategy summary:</strong> Information-maximizing opener, disciplined second guess, elimination guesses when needed. It's a precision game where every letter matters.</p>

<h3>Dordle: the warm-up act</h3>

<p>Two words simultaneously. Seven guesses. Dordle is what happens when you take Wordle and add just one more board. It sounds trivial — one extra word, one extra guess — but it fundamentally changes how you play. You can't afford to be inefficient because every guess needs to work toward solving both words. The extra guess seems generous, but it disappears quickly when one board is stubborn and demands multiple dedicated guesses.</p>

<p>In Dordle, you start treating guesses as pure information gathering for the first 3-4 guesses. You're not trying to solve either word — you're trying to learn enough about both words to solve them efficiently in your final guesses. This mindset shift is essential for the harder variants, and Dordle is the perfect training ground for learning it. I've failed Dordle about 3% of the time, always because I spent too many guesses on one board and ran out of room for the other.</p>

<h3>Quordle: the one that ruins Wordle for you (in a good way)</h3>

<p>Four words. Nine guesses. Quordle is where this genre gets serious. You're managing four simultaneous puzzles with a shared pool of guesses, and the strategy is completely different from Wordle. In Wordle, every guess should ideally be a possible answer. In Quordle, your first 4-5 guesses should be pure information bombs that are never intended to be answers. This inversion of strategy — from "solve" to "scan" — is what makes Quordle transformative, and it changes how you think about Wordle itself.</p>

<div class="callout callout-key">
  <div class="callout-icon">🔑</div>
  <div class="callout-content">
    <p><strong>The Sacrifice Guess:</strong> In Quordle, there comes a moment where you have one board nearly solved and another that's a mess. The temptation is to solve the easy board. Don't. Instead, make a "sacrifice guess" — a word chosen to maximize information across the unsolved boards. You sacrifice the satisfaction of solving one board immediately, but you gain information that helps solve the harder ones. This single technique improved my Quordle success rate from about 80% to 95%.</p>
  </div>
</div>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile gray">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile gray">H</div>
    <div class="wordle-demo-tile gray">O</div>
    <div class="wordle-demo-tile yellow">R</div>
    <div class="wordle-demo-tile gray">D</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">P</div>
    <div class="wordle-demo-tile gray">I</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile gray">H</div>
  </div>
</div>

<h3>Octordle: where it gets genuinely hard</h3>

<p>Eight words. Thirteen guesses. Octordle is a different animal entirely. You can't hold eight word patterns in your working memory — nobody can. So you develop systems: you focus on the boards that are closest to being solved, you use each guess to chip away at multiple boards simultaneously, and you accept that some boards will be solved on the last possible guess. The hardest part isn't the word solving — it's the bookkeeping. By guess 7, you have partial information on 8 boards and you need to track it all.</p>

<p>In Octordle, your first 5-6 guesses should be completely agnostic to any specific board. You're casting the widest possible net, testing the most common letters across all positions. Words like <strong>SLATE, CRANE, POINT, HUMID</strong> in sequence will give you something on nearly every board. Only after guess 6 do you start targeting specific boards. I've started keeping a physical notepad next to my computer for Octordle games. It feels low-tech, but it works. Trying to hold all that information in your head leads to mistakes — reusing gray letters, forgetting greens, missing obvious solutions on boards you haven't looked at in three guesses.</p>

<h3>Sedecordle: for the truly obsessed</h3>

<p>Sixteen words. Twenty-one guesses. I'm not going to pretend Sedecordle is for everyone, because it absolutely isn't. It takes 40-60 minutes. It requires a spreadsheet-level approach to tracking which letters you've tested on which boards. It's more project management than puzzle solving. And yet, there's something deeply satisfying about watching 16 boards slowly yield to a systematic information-gathering approach. My success rate is about 85%, and every failure stings because of the time investment.</p>

<table>
  <thead>
    <tr>
      <th>Variant</th>
      <th>Words</th>
      <th>Guesses</th>
      <th>Time</th>
      <th>Success Rate</th>
      <th>Difficulty</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Wordle</strong></td>
      <td>1</td>
      <td>6</td>
      <td>3-8 min</td>
      <td>~98%</td>
      <td>⭐⭐</td>
    </tr>
    <tr>
      <td><strong>Dordle</strong></td>
      <td>2</td>
      <td>7</td>
      <td>5-12 min</td>
      <td>~97%</td>
      <td>⭐⭐⭐</td>
    </tr>
    <tr>
      <td><strong>Quordle</strong></td>
      <td>4</td>
      <td>9</td>
      <td>10-25 min</td>
      <td>~90%</td>
      <td>⭐⭐⭐⭐</td>
    </tr>
    <tr>
      <td><strong>Octordle</strong></td>
      <td>8</td>
      <td>13</td>
      <td>20-45 min</td>
      <td>~80%</td>
      <td>⭐⭐⭐⭐⭐</td>
    </tr>
    <tr>
      <td><strong>Sedecordle</strong></td>
      <td>16</td>
      <td>21</td>
      <td>40-75 min</td>
      <td>~75%</td>
      <td>⭐⭐⭐⭐⭐+</td>
    </tr>
  </tbody>
</table>

<h3>How strategy changes across variants</h3>

<p>The fundamental shift from Wordle to multi-word variants is this: in Wordle, you play to solve. In Quordle and beyond, you play to gather information. The more boards you're managing, the more your early guesses should resemble a data collection exercise rather than an attempt to solve any particular puzzle. This is the single most important mindset shift when moving between variants.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">Wordle</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 20%">Info: 20%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Dordle</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 40%">Info: 40%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Quordle</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 60%">Info: 60%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Octordle</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 80%">Info: 80%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Sedecordle</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 95%">Info: 95%</div></div>
  </div>
</div>

<p>Notice the pattern: as boards increase, your early guesses become less about solving and more about data collection. This is the single most important mindset shift when moving from Wordle to any variant. If you bring a Wordle mentality to Quordle — trying to solve boards as fast as possible — you will fail regularly. The game punishes efficiency-seeking behavior and rewards patient information gathering.</p>

<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <p><strong>Common Trap:</strong> Players who excel at Wordle often struggle initially with Quordle because they try to solve each board independently. In multi-board variants, your guesses must serve multiple boards simultaneously. A guess that's perfect for one board but useless for the other three is a bad guess in Quordle.</p>
  </div>
</div>

<h3>Recommended opener sequences by variant</h3>

<table>
  <thead>
    <tr>
      <th>Variant</th>
      <th>Opening Sequence</th>
      <th>Rationale</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Wordle</strong></td>
      <td>SLATE → hybrid 2nd</td>
      <td>One strong opener + adaptive second guess</td>
    </tr>
    <tr>
      <td><strong>Dordle</strong></td>
      <td>SLATE → CHORD</td>
      <td>Two guesses cover 10 common letters across both boards</td>
    </tr>
    <tr>
      <td><strong>Quordle</strong></td>
      <td>SLATE → CRANE → POINT → HUMID</td>
      <td>Four guesses cover 18+ distinct letters across all four boards</td>
    </tr>
    <tr>
      <td><strong>Octordle</strong></td>
      <td>SLATE → CRANE → POINT → HUMID → BAWDY</td>
      <td>Five guesses maximize coverage; then target easiest boards</td>
    </tr>
    <tr>
      <td><strong>Sedecordle</strong></td>
      <td>8-guess fixed sequence</td>
      <td>Automated coverage phase; puzzle starts at guess 9</td>
    </tr>
  </tbody>
</table>

<h3>My personal ranking and why</h3>

<p>Quordle is my favorite. Here's why: it's hard enough to be consistently challenging, but fast enough to play daily. Octordle is too time-consuming for a daily habit, and Dordle became too easy after a few weeks. Quordle hits the sweet spot where I still fail occasionally (maybe 5% of games), which keeps it interesting. Wordle is my daily anchor — I'll never stop playing it because of my streak, and because a well-played Wordle game is genuinely satisfying in a way that the multi-board variants can't match.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>✅ Ranked by Enjoyment</h4>
    <p>Quordle → Wordle → Octordle → Dordle → Sedecordle. Quordle hits the challenge/daily-playability sweet spot. Wordle remains the most satisfying single-solve experience.</p>
  </div>
  <div class="comparison-card negative">
    <h4>❌ Ranked by Time Efficiency</h4>
    <p>Sedecordle → Octordle → Quordle → Dordle → Wordle (worst). More boards don't equal more fun per minute. The marginal enjoyment drops sharply after Quordle.</p>
  </div>
</div>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>Where to start:</strong> If you're considering branching out from Wordle, start with Dordle. Give it a week. If it feels too easy, move to Quordle. If Quordle clicks with you, you'll know whether you want to go further. The beauty of this genre is that each variant rewards a different type of thinking, and finding the one that matches how your brain works is half the fun.</p>
  </div>
</div>

<div class="key-takeaways">
  <h3>✅ Key Takeaways</h3>
  <ul>
    <li>Strategy fundamentally shifts from "solve" to "gather information" as the number of boards increases</li>
    <li>The sacrifice guess is Quordle's essential technique — it improved success rates from ~80% to ~95%</li>
    <li>Quordle hits the sweet spot of challenge and daily playability; Octordle+ require significant time investment</li>
    <li>Use fixed opener sequences in multi-board variants to maximize letter coverage before targeting specific boards</li>
    <li>Bookkeeping becomes the hardest part at 8+ boards — use a notepad for Octordle and Sedecordle</li>
    <li>Your Wordle skills transfer but your Wordle <em>mindset</em> doesn't — unlearn "solve fast" to succeed in variants</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Will playing Quordle make me worse at Wordle?</summary>
    <div>Actually, the opposite tends to happen. Quordle teaches you the information-gathering mindset that most Wordle players lack. When you return to Wordle, you'll find yourself making better second guesses and more effective elimination guesses. The only risk is that Quordle's forgiving guess count might make you sloppy about efficiency — but if you're already tracking your Wordle performance, this is unlikely to be an issue.</div>
  </details>
  <details>
    <summary>How much time should I budget for each variant?</summary>
    <div>Wordle: 5-10 minutes. Dordle: 10-15 minutes. Quordle: 15-25 minutes. Octordle: 30-45 minutes. Sedecordle: 45-75 minutes. These assume you're playing thoughtfully, not rushing. If you're finishing significantly faster, you might be playing too impulsively and leaving information on the table.</div>
  </details>
  <details>
    <summary>Is the sacrifice guess really necessary in Quordle?</summary>
    <div>Not every game requires one, but the situations where it's needed are the games you'd otherwise lose. The sacrifice guess is most valuable when one board is nearly solved but others are wide open. Solving the easy board gives you emotional satisfaction but wastes a guess that could have narrowed two harder boards simultaneously. Think of it as the Quordle equivalent of an elimination guess in Wordle.</div>
  </details>
  <details>
    <summary>Can I use the same opener for all variants?</summary>
    <div>Yes for your first guess — SLATE or CRANE work well across all variants. But your subsequent guesses should differ dramatically. In Wordle, your second guess is adaptive. In Quordle+, you should use a fixed sequence of high-coverage words before switching to targeted solving. Using a Wordle approach in Quordle (adapting each guess to one board) is a recipe for running out of guesses.</div>
  </details>
  <details>
    <summary>Which variant has the most active community?</summary>
    <div>Wordle has the largest community by far, thanks to the NYT platform and social sharing. Quordle has the most active competitive community among the variants, with daily discussions and strategy sharing. Octordle and Sedecordle have smaller but dedicated communities. If community interaction matters to you, Quordle is the best variant to invest time in beyond Wordle.</div>
  </details>
</div>
`,

  "analyze-wordle-gameplay": `
<h2>I Analyzed 500 of My Own Wordle Games — Here's What Actually Makes You Better</h2>

<p>Most Wordle advice is based on theory: letter frequency tables, optimal opener calculations, mathematical models of information gain. That stuff is useful, but it's abstract. I wanted to know what was actually happening in <em>my</em> games. So about 18 months ago, I started analyzing every Wordle game I played using the Wordle Analyzer tool. That's over 500 games of data about my own decision-making, and the patterns I found surprised me. The gap between how I thought I played and how I actually played was wider than I expected — and closing that gap improved my results more than any strategic tip ever did.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">500+</div>
    <div class="stat-label">Games Analyzed</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">65% → 76%</div>
    <div class="stat-label">Guess Quality</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">48%</div>
    <div class="stat-label">Average Luck</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">0.4</div>
    <div class="stat-label">Guesses Improved</div>
  </div>
</div>

<h3>Why analysis matters</h3>

<p>You can't improve what you don't measure. Before I started analyzing, I had a vague sense that I was "pretty good" at Wordle. My average was around 4.0, which I knew was decent. But I had no idea <em>why</em> I was decent, or where my weaknesses were. Analysis turned vague self-assessment into specific, actionable data. The first thing I learned: I was lucky more often than I was good. About 30% of my "good" games (solving in 3 or fewer) involved a lucky hit on a guess that wasn't well-reasoned. I was crediting skill for outcomes that were partially chance.</p>

<p>Knowing this changed how I evaluate my performance — I now care less about my guess count and more about my guess quality. A lucky 3-guess solve tells me nothing about my skill. A skillful 5-guess solve where I played optimally but got unlucky tells me everything about my improvement trajectory. This reframe — from outcomes to process — is the single most valuable thing analysis has given me.</p>

<h3>What the Wordle Analyzer tool actually does</h3>

<p>The Wordle Analyzer takes your completed game and evaluates each guess against the remaining possible answers. It tells you three critical things about every guess you made, not just whether it was "right" or "wrong" but how efficiently it moved you toward the solution.</p>

<div class="step-card">
  <div class="step-number">1</div>
  <div class="step-content">
    <p><strong>Luck rating:</strong> How lucky were your guesses? A guess that happens to hit the answer is 100% lucky. A guess that eliminates 90% of remaining possibilities is 0% lucky — it's pure skill. This separates your good outcomes from your good decisions.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">2</div>
  <div class="step-content">
    <p><strong>Guess quality score:</strong> How much information did each guess provide relative to the best possible guess? Measured as a percentage of the theoretical maximum information gain. A score of 85% means your guess eliminated 85% as many possibilities as the mathematically optimal guess would have.</p>
  </div>
</div>
<div class="step-card">
  <div class="step-number">3</div>
  <div class="step-content">
    <p><strong>AI recommendation:</strong> What would an optimal strategy have guessed at each step, and how does your actual guess compare? Not to copy the AI, but to understand the principles behind its recommendations.</p>
  </div>
</div>

<h3>How to interpret luck ratings</h3>

<p>Luck is not a moral judgment. A high luck rating means the outcome was better than your guesses deserved. A low luck rating means you got less reward than your strategy warranted. Both are informative, and both teach you something different about your game that raw guess counts can't reveal.</p>

<table>
  <thead>
    <tr>
      <th>Luck Level</th>
      <th>Outcome</th>
      <th>Interpretation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>High Luck</strong></td>
      <td>Good (3 or fewer)</td>
      <td>Lucky hit — don't credit your strategy. This was a speculative guess that paid off.</td>
    </tr>
    <tr>
      <td><strong>Low Luck</strong></td>
      <td>Good (3 or fewer)</td>
      <td>Gold standard — solid, information-maximizing guesses. Your process was good.</td>
    </tr>
    <tr>
      <td><strong>High Luck</strong></td>
      <td>Poor (5-6 guesses)</td>
      <td>Red flag — lucky hits but still struggled. Strategy after the lucky hit was poor.</td>
    </tr>
    <tr>
      <td><strong>Low Luck</strong></td>
      <td>Poor (5-6 guesses)</td>
      <td>Good process, bad outcome. Don't change your strategy — it was sound.</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <p><strong>Key Insight:</strong> Luck ratings help you separate process from outcome. A 3-guess solve where your luck was 80% tells you little about your skill. A 5-guess solve where your luck was 10% tells you your strategy is working even when results don't show it. Over 500 games, my luck averaged 48% — almost exactly random chance. This was reassuring: my results were driven by skill over the long run, not luck.</p>
  </div>
</div>

<h3>How to interpret guess quality scores</h3>

<p>Guess quality is more useful for improvement because it measures your decision-making independent of outcomes. A score of 85% means your guess eliminated 85% as many possibilities as the mathematically optimal guess. A score of 40% means you left a lot of information on the table — your guess was functional but far from optimal. My worst guesses weren't my wild guesses — they were my "reasonable" guesses that felt smart but were actually suboptimal.</p>

<p>When I had <strong>_ASTE</strong> and guessed <strong>TASTE</strong>, the analyzer showed that an elimination guess testing multiple first-letter options would have been significantly higher quality. My guess felt right — it was a possible answer — but it tested so little new information that it was strategically weak. The lesson: "reasonable" and "optimal" are often very different things in Wordle.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">Guess 1</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 88%">88%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Guess 2</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 62%">62%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Guess 3</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 78%">78%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Guess 4</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 72%">72%</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Guess 5</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 70%">70%</div></div>
  </div>
</div>

<p>My guess quality follows a clear pattern: highest on guess 1 (fixed opener), drops on guess 2 (most suboptimal decisions), recovers on guess 3 (focused and engaged), and varies on guesses 4-6. Knowing this helps me focus improvement efforts on the right phase — specifically, my second guess, which was consistently the weakest link in my game.</p>

<h3>What AI recommendations taught me</h3>

<p>The AI's optimal play is often a word you'd never think of — something like <strong>TORSI</strong> that maximizes letter coverage but isn't natural. I don't try to play like the AI. But I pay attention when it recommends a common English word I should have considered. The biggest lesson: I was consistently underusing elimination guesses. The AI's optimal second guess after a weak first-guess result was almost always a word testing five new letters, not building on existing information. I was playing too conservatively, trying to solve too early.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile gray">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">M</div>
    <div class="wordle-demo-tile gray">Y</div>
    <div class="wordle-demo-tile gray">C</div>
    <div class="wordle-demo-tile gray">O</div>
    <div class="wordle-demo-tile gray">R</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">B</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile gray">N</div>
    <div class="wordle-demo-tile gray">D</div>
    <div class="wordle-demo-tile gray">S</div>
  </div>
</div>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>AI Threshold:</strong> The AI switches from information-gathering to answer-guessing at roughly 4-5 remaining possibilities. Below that, take your shot. Above that, gather information. This threshold has become central to how I play, and it's the single most actionable insight from analysis data.</p>
  </div>
</div>

<h3>What I learned from 500+ analyzed games</h3>

<p>The patterns that emerged from 500 games of data were both humbling and empowering. Humbling because my self-assessment was often wrong — I was crediting skill for luck and blaming luck for poor strategy. Empowering because once I identified the specific weaknesses, I could target them directly and measure the improvement.</p>

<table>
  <thead>
    <tr>
      <th>Finding</th>
      <th>Before Analysis</th>
      <th>After Targeted Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Guess 2 quality</strong></td>
      <td>62% average</td>
      <td>78% average (hybrid approach)</td>
    </tr>
    <tr>
      <td><strong>Duplicate letter avg</strong></td>
      <td>4.8 guesses</td>
      <td>4.2 guesses (explicit consideration)</td>
    </tr>
    <tr>
      <td><strong>Overall guess quality</strong></td>
      <td>65%</td>
      <td>76%</td>
    </tr>
    <tr>
      <td><strong>Average solve count</strong></td>
      <td>4.1</td>
      <td>3.7</td>
    </tr>
  </tbody>
</table>

<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <p><strong>Common Pattern in Worst Games:</strong> Nearly all 5+ guess games involved either failing to consider an uncommon starting letter or fixating on a single green letter instead of eliminating. These two patterns accounted for the majority of suboptimal play, and they're both fixable with conscious effort.</p>
  </div>
</div>

<h3>The three player profiles</h3>

<p>After seeing enough analyzed games, players tend to fall into three profiles. Identifying which one you are is the first step toward targeted improvement, because each profile has a different path to getting better.</p>

<div class="comparison-grid">
  <div class="comparison-card positive">
    <h4>✅ The Skilled Player</h4>
    <p>Low-to-moderate luck, high guess quality. Makes good decisions consistently. Solve distribution is tight — mostly 3s and 4s. <strong>This is the profile analysis helps you achieve.</strong> Average quality: 75%+.</p>
  </div>
  <div class="comparison-card negative">
    <h4>⚠️ The Lucky Winner</h4>
    <p>High luck, moderate guess quality. Solves in 3-4 often, but from lucky hits not good strategy. Results are inconsistent — a 3-guess solve followed by a 6-guess struggle. Average quality: 55-65%.</p>
  </div>
</div>

<p>The third profile — <strong>The Persistent Solver</strong> — has low luck and moderate guess quality, grinding through games in 5-6 guesses. Not making terrible decisions, but not maximizing information either. The fix for this profile is studying elimination guesses and second-guess strategy, which directly addresses the information-gathering gap.</p>

<h3>Setting up a tracking system</h3>

<p>A simple note with three numbers per game — average luck, average guess quality, and guess count — is enough to spot trends. If you want to go deeper, track quality by guess number to identify your weakest phase. I keep a running note with my last 30 games and scan it weekly for patterns. It takes 5 minutes and has been more valuable than any strategic insight I've read online. The key is consistency — 5 games a week for a year gives you 260 data points, which is plenty to identify meaningful patterns.</p>

<div class="key-takeaways">
  <h3>✅ Key Takeaways</h3>
  <ul>
    <li>You can't improve what you don't measure — analysis turns vague self-assessment into specific, actionable data</li>
    <li>About 30% of "good" games involve luck; separate process from outcome using luck ratings</li>
    <li>Guess quality is the metric that matters most — it measures your decision-making independent of results</li>
    <li>Guess 2 is most players' weakest point; the hybrid approach raised my quality from 62% to 78%</li>
    <li>The AI's 4-5 possibility threshold for switching from gathering to solving is the most actionable insight</li>
    <li>Consistency matters more than peak performance — a steady 78% beats oscillating between 50% and 95%</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>What's the Wordle Analyzer tool and where can I find it?</summary>
    <div>The Wordle Analyzer (available at various online tools) evaluates your completed game against all possible remaining answers at each guess point. It calculates how much information each guess provided versus the theoretical maximum, assigns luck ratings, and suggests optimal alternatives. Some versions are browser-based; others require manual input of your guesses. The key feature is the guess quality score — without it, you're just guessing at how well you guessed.</div>
  </details>
  <details>
    <summary>How often should I analyze my games?</summary>
    <div>I recommend analyzing at least 5 out of 7 games per week. Consistency matters more than analyzing every single game. I find it more useful to analyze at the end of the week, when I have some distance from the emotional experience of playing. The heat of the moment makes you defensive about your choices; distance makes you honest. A weekly review of 5-7 games takes about 15-20 minutes and reveals patterns that daily analysis might miss.</div>
  </details>
  <details>
    <summary>My guess quality is around 55%. Is that bad?</summary>
    <div>It's below average for experienced players (who typically range from 65-80%), but it's a starting point, not a verdict. The key insight from analysis is that improvement comes from targeting specific weaknesses, not from trying to get "better at Wordle" in general. Identify which guess number has your lowest quality (usually guess 2), understand why (usually building instead of sweeping), and focus your improvement efforts there. A 10-point quality improvement in your weakest guess often translates to 0.3-0.5 guesses better overall.</div>
  </details>
  <details>
    <summary>Should I try to play like the AI recommends?</summary>
    <div>No — the AI often recommends words that maximize information but aren't natural for humans to think of (like TORSI). Instead, look at the principle behind the recommendation. When the AI suggests a word you've never heard of, ask what letters it's testing and why. The principle (test more new letters, use elimination guesses) is what you should internalize, not the specific words. Over time, you'll develop your own vocabulary of high-quality guesses that feel natural to you.</div>
  </details>
</div>
`,

  "psychology-of-wordle": `
<h2>The Real Reason You Can't Stop Playing Wordle Has Nothing to Do with Words</h2>

<p>I've been thinking about this for a while, and I'm now fairly certain that Wordle isn't a word game. It's a psychology experiment that happens to use words as its interface. Everything about it — the once-per-day release, the streak counter, the sharing grid, the five-letter constraint — hooks into specific cognitive mechanisms that make it nearly impossible to stop playing. The more I study the psychology behind it while maintaining my 340+ day streak, the more I realize that my "choice" to play Wordle every day is about as voluntary as breathing. And understanding why hasn't made it any less compulsive — it's just made me more impressed by the design.</p>

<div class="stat-grid">
  <div class="stat-card">
    <div class="stat-value">7</div>
    <div class="stat-label">Psychological Hooks</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">~25</div>
    <div class="stat-label">Micro-Rewards Per Game</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">90%+</div>
    <div class="stat-label">Daily Retention</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">Day ~60</div>
    <div class="stat-label">Habit Formation Point</div>
  </div>
</div>

<h3>The Zeigarnik effect: your brain hates unfinished tasks</h3>

<p>In the 1920s, psychologist Bluma Zeigarnik noticed that waiters could remember unpaid orders perfectly but forgot them once the bill was settled. Incomplete tasks create cognitive tension — your brain holds onto them, refusing to let go until resolved. Wordle is a Zeigarnik machine. Every morning, a new unfinished task appears, creating a low-level hum of cognitive discomfort until you complete it. This is why you check the Wordle page even when you don't intend to play — the task exists, it's unfinished, and your brain wants to close the loop.</p>

<p>The once-per-day cadence means the loop reopens every 24 hours — just long enough to enjoy completion before the next cycle begins. If Wordle released puzzles hourly, the Zeigarnik effect would weaken because the tasks wouldn't feel special. If it released weekly, the urgency would fade. The 24-hour cycle is the exact frequency that maximizes the "open loop" tension without letting it dissipate from neglect or overwhelm from frequency.</p>

<div class="callout callout-info">
  <div class="callout-icon">ℹ️</div>
  <div class="callout-content">
    <p><strong>The Zeigarnik Effect in Action:</strong> This is the same reason Netflix autoplays the next episode and why you can't stop reading a book at a chapter cliffhanger. Incomplete tasks create a cognitive itch that demands scratching. Wordle creates a new itch every 24 hours — just often enough to become a habit, just infrequent enough to feel special each time.</p>
  </div>
</div>

<h3>Why one puzzle per day beats unlimited play</h3>

<p>If Wordle let you play unlimited puzzles, most people would burn out in a week. The daily limit creates scarcity — one shot at today's puzzle, no redos, no practice. This transforms each game from a casual diversion into a high-stakes event. Scarcity increases perceived value, and the daily reset creates a natural commitment device. Compare this to unlimited-play clones: they're fun for a few days, but they don't create the same pull. Without the daily constraint, there's no urgency, and without urgency, there's no reason to prioritize playing today over playing tomorrow.</p>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Wordle (Daily)</th>
      <th>Unlimited Clones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Scarcity</strong></td>
      <td>High — one puzzle per day</td>
      <td>Low — infinite puzzles</td>
    </tr>
    <tr>
      <td><strong>Perceived value</strong></td>
      <td>Each puzzle matters</td>
      <td>Individual puzzles feel disposable</td>
    </tr>
    <tr>
      <td><strong>Social sharing</strong></td>
      <td>Everyone has the same puzzle</td>
      <td>No shared experience</td>
    </tr>
    <tr>
      <td><strong>Long-term retention</strong></td>
      <td>90%+ daily retention</td>
      <td>Drop-off after ~1 week</td>
    </tr>
    <tr>
      <td><strong>Streak motivation</strong></td>
      <td>Strong — daily commitment</td>
      <td>Weak — always another puzzle</td>
    </tr>
  </tbody>
</table>

<h3>Social sharing and FOMO</h3>

<p>Those green-and-yellow grids are genius, and not for the reason most people think. They create social proof and fear of missing out simultaneously. When your timeline is full of grids and you haven't played yet, you feel excluded from a shared experience. The format is carefully designed: it reveals your performance without revealing the answer. This creates a social hierarchy — people who solve in 2 or 3 get implicit status — without spoiling the puzzle. It's competitive without being confrontational, and that delicate balance is what makes the sharing format so sticky.</p>

<p>The grid is also an identity statement. A timeline full of 3s says "I'm sharp." A timeline with 6s and fails says "I'm honest." Either way, you're participating in a daily social ritual that reinforces your commitment to the game. The people who don't share? They're playing too, but without the social accountability that makes quitting harder. Sharing isn't bragging — it's commitment anchoring.</p>

<h3>Sunk cost and the streak mentality</h3>

<p>My streak is 347 days. If I lose it tomorrow, I can always start a new streak. But that's not how it feels. It feels like losing something I invested in, something I built. This is the sunk cost fallacy in its purest form — the past investment shouldn't matter for future decisions, but it feels like it does because of what the streak represents.</p>

<p>The streak counter converts a series of independent decisions into a single ongoing commitment. Each day, you're deciding whether to preserve or destroy 347 days of consistency. The cost of losing grows every day, making the motivation to play stronger every day. I've talked to people who set alarms to remind themselves to play, who ask friends to play for them when traveling, who have genuinely rearranged their schedules around a five-minute word game. This isn't casual gaming — it's commitment maintenance, and the streak is the anchor that makes it feel non-negotiable.</p>

<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div class="callout-content">
    <p><strong>The Breaking Point:</strong> And breaking a streak is often followed by quitting entirely, because once the investment is gone, the motivation vanishes. The streak isn't just a number — it's the primary mechanism keeping most long-term players engaged. This is why the post-streak quitting rate is so high: without the sunk cost, there's no remaining hook for many players.</p>
  </div>
</div>

<h3>The flow state: challenge matching skill</h3>

<p>Psychologist Mihaly Csikszentmihalyi described "flow" as the state you enter when a challenge perfectly matches your skill level. Too easy and you're bored. Too hard and you're frustrated. Wordle hits this sweet spot for millions of people. Most games are solvable but not trivial. The six-guess limit creates enough pressure to keep you focused without causing paralyzing anxiety. And the daily reset ensures you get just enough flow to crave it again tomorrow — the flow state is inherently rewarding, and your brain learns to seek it out.</p>

<div class="wordle-demo">
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile gray">S</div>
    <div class="wordle-demo-tile gray">L</div>
    <div class="wordle-demo-tile yellow">A</div>
    <div class="wordle-demo-tile gray">T</div>
    <div class="wordle-demo-tile gray">E</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">C</div>
    <div class="wordle-demo-tile green">H</div>
    <div class="wordle-demo-tile gray">A</div>
    <div class="wordle-demo-tile green">I</div>
    <div class="wordle-demo-tile gray">R</div>
  </div>
  <div class="wordle-demo-row">
    <div class="wordle-demo-tile green">C</div>
    <div class="wordle-demo-tile green">H</div>
    <div class="wordle-demo-tile green">A</div>
    <div class="wordle-demo-tile green">I</div>
    <div class="wordle-demo-tile green">N</div>
  </div>
</div>

<p>Each tile flip is a micro-decision point. Green = dopamine. Yellow = partial reward. Gray = recalibration. That's 25 micro-reward cycles in a typical 5-guess game, each one providing just enough neurological feedback to maintain the flow state. The tile-flip animation adds suspense before each color reveal, amplifying the dopamine response. It's a perfectly calibrated feedback loop.</p>

<h3>Variable rewards and the dopamine engine</h3>

<p>Every Wordle game is different. Some start with multiple greens, some with all gray. This variability is crucial — if every game felt the same, you'd habituate. The unpredictability keeps your brain's reward system engaged. This is the same mechanism that makes slot machines addictive: variable-ratio reinforcement — rewards at unpredictable intervals — produces the strongest behavioral patterns. B.F. Skinner discovered this in the 1950s, and Wordle applies it with elegant precision.</p>

<div class="bar-chart">
  <div class="bar-row">
    <div class="bar-label">Variable</div>
    <div class="bar-track"><div class="bar-fill green" style="width: 95%">Strongest Reinforcement</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Fixed</div>
    <div class="bar-track"><div class="bar-fill yellow" style="width: 50%">Moderate Reinforcement</div></div>
  </div>
  <div class="bar-row">
    <div class="bar-label">Constant</div>
    <div class="bar-track"><div class="bar-fill gray" style="width: 20%">Weakest Reinforcement</div></div>
  </div>
</div>

<p>The green-yellow-gray feedback system contributes to the variable reward cycle. Each guess produces a mini-reward (green), mini-frustration (gray), or partial reward (yellow). The tile-flip animation adds suspense before each color reveal, amplifying the dopamine response. That's 25 micro-reward cycles in a typical 5-guess game — more than enough to create a strong conditioned response that keeps you coming back.</p>

<h3>The mere ownership effect: my streak, my identity</h3>

<p>The "endowment effect" means people value things more simply because they own them. A 200-day streak isn't just a number — it's <em>your</em> 200-day streak, part of your identity as someone who shows up every day. When I describe myself as "someone with a 340+ day streak," I'm not just reporting a fact — I'm making an identity claim. The more it becomes part of my identity, the harder it is to let go, because losing it would mean losing a piece of who I've decided I am.</p>

<div class="callout callout-important">
  <div class="callout-icon">❗</div>
  <div class="callout-content">
    <p><strong>Loss Aversion + Endowment = Sticky Habit:</strong> Loss aversion means losses feel roughly twice as painful as equivalent gains feel good. The endowment effect means you overvalue what you already have. Combined, they create a powerful lock-in effect: the longer your streak, the more painful losing it becomes, and the harder you work to maintain it. This isn't weakness — it's a well-documented cognitive bias that Wordle exploits with surgical precision.</p>
  </div>
</div>

<h3>Why Wordle feels personal even though it's the same for everyone</h3>

<p>Everyone gets the same word. Yet every game feels intensely personal. Your path to the answer is unique. This dual nature — shared experience, personal journey — is what makes Wordle discussable and shareable in ways that single-player games aren't. It also creates an illusion of agency: when you solve in 3, you feel like you earned it; when you struggle to 6, you feel like you failed. That sense of agency is deeply motivating, even when luck plays a huge role in the outcome. The personal narrative — "I'm a Wordle person" — becomes more compelling than the actual game mechanics.</p>

<h3>The morning ritual and habit formation</h3>

<p>For many, Wordle has become part of their morning routine — right up there with coffee. Morning routines are the easiest habits to form because they're anchored to a consistent trigger (waking up) and provide immediate satisfaction. Habits form through a three-part loop: cue, routine, reward. For Wordle, the cue is your morning wake-up, the routine is the game, the reward is the satisfaction of solving plus social sharing. The daily cadence is the optimal frequency — weekly would be too infrequent to form a habit, hourly would lose its specialness and become noise.</p>

<div class="process-flow">
  <div class="process-step">
    <div class="process-step-icon">⏰</div>
    <div class="process-step-label">Cue: Wake Up</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">🎮</div>
    <div class="process-step-label">Routine: Play</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">✅</div>
    <div class="process-step-label">Reward: Solve</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">📤</div>
    <div class="process-step-label">Share: Grid</div>
  </div>
  <div class="process-arrow">→</div>
  <div class="process-step">
    <div class="process-step-icon">🔄</div>
    <div class="process-step-label">Repeat: Tomorrow</div>
  </div>
</div>

<h3>The dark side: when a daily puzzle becomes anxiety</h3>

<p>For some people, the streak stops being fun and starts being an obligation. The fear of losing it creates genuine anxiety. I've felt it — the quickened heartbeat on guess 5 with no clear answer, the physical tension in my shoulders as I stare at the keyboard. People who quit Wordle tend to quit after their streak breaks. Without the streak, the commitment evaporates, and they discover they don't miss the game — they missed the streak. This is the dark side of the endowment effect: the thing you value becomes the thing that controls you.</p>

<p>I've noticed my relationship with Wordle shifts based on what else is happening in my life. During low-stress periods, it's a pleasant ritual. During high-stress periods, it becomes another to-do list item. Recognizing this has helped me be more forgiving on days when Wordle feels more like a chore than a game. The game hasn't changed — my cognitive load has. And that's important context for anyone who finds themselves dreading their daily Wordle.</p>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div class="callout-content">
    <p><strong>Self-Check:</strong> If Wordle consistently feels like an obligation rather than a pleasure, that's a signal. The healthiest relationship with the game includes moments of genuine enjoyment, not just streak-maintenance anxiety. If you can't remember the last time you enjoyed a game for its own sake, consider whether the streak is serving you or you're serving the streak.</p>
  </div>
</div>

<h3>What Wordle reveals about habit formation</h3>

<p>Wordle is a masterclass in habit formation. It combines a clear cue (daily reset), a defined routine (5-10 minutes of play), a variable reward (different outcomes each day), a social component (sharing), and a commitment device (the streak). These are the core ingredients of any persistent habit, in exactly the right proportions. If you want to build a daily habit — exercise, writing, meditation — study Wordle's design. Make it time-limited. Make it variable. Make it shareable. Make the cost of skipping feel real.</p>

<table>
  <thead>
    <tr>
      <th>Habit Ingredient</th>
      <th>Wordle Implementation</th>
      <th>Application to Other Habits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Clear Cue</strong></td>
      <td>Daily reset at midnight</td>
      <td>Set a fixed daily trigger (alarm, event)</td>
    </tr>
    <tr>
      <td><strong>Defined Routine</strong></td>
      <td>5-10 minutes of play</td>
      <td>Keep sessions short and bounded</td>
    </tr>
    <tr>
      <td><strong>Variable Reward</strong></td>
      <td>Different outcomes each game</td>
      <td>Introduce randomness or challenge variety</td>
    </tr>
    <tr>
      <td><strong>Social Component</strong></td>
      <td>Sharing grids, comparing results</td>
      <td>Add accountability partner or sharing</td>
    </tr>
    <tr>
      <td><strong>Commitment Device</strong></td>
      <td>Streak counter, loss aversion</td>
      <td>Track streaks, make skipping visible</td>
    </tr>
  </tbody>
</table>

<div class="key-takeaways">
  <h3>✅ Key Takeaways</h3>
  <ul>
    <li>Wordle's addictiveness comes from seven overlapping psychological mechanisms, not from the word puzzle itself</li>
    <li>The Zeigarnik effect creates daily cognitive tension — your brain can't let go of an unfinished puzzle</li>
    <li>The daily scarcity model is more engaging than unlimited play; scarcity creates urgency and perceived value</li>
    <li>The streak converts independent daily decisions into a single ongoing commitment through sunk cost and loss aversion</li>
    <li>Variable rewards (different outcomes each game) produce the strongest behavioral reinforcement patterns</li>
    <li>Wordle's habit formation design is a template for building any daily habit — study the ingredients, not just the game</li>
  </ul>
</div>

<div class="faq-section">
  <h3>Frequently Asked Questions</h3>
  <details>
    <summary>Is Wordle actually addictive in a clinical sense?</summary>
    <div>Wordle uses the same behavioral reinforcement mechanisms that underlie many addictive behaviors — variable rewards, sunk cost, social proof — but at a much lower intensity than things we'd clinically classify as addictions. The daily time investment is small (5-10 minutes), and the negative consequences are minimal. That said, for some people, the streak anxiety can become genuinely distressing. If Wordle causes more anxiety than enjoyment, that's a signal to reevaluate your relationship with it, regardless of whether it meets a clinical threshold.</div>
  </details>
  <details>
    <summary>Why do most people quit after losing their streak?</summary>
    <div>It's a combination of sunk cost loss and identity disruption. The streak was the primary motivation — not the game itself. Once it's gone, the endowment effect reverses: you no longer "own" the streak, so its motivational power disappears. Studies of habit discontinuity show that major life transitions (moving, changing jobs) are the most common times habits break. Losing a streak is a mini life transition for Wordle players — the old habit structure collapses and doesn't automatically rebuild.</div>
  </details>
  <details>
    <summary>Was Wordle's psychology designed intentionally?</summary>
    <div>Partially. Josh Wardle has said the daily limit and sharing format were designed to avoid the "doomscrolling" pattern of other online games. The streak counter was added after launch based on player demand. Some of the psychological hooks were intentional (scarcity, sharing), while others emerged organically (the streak culture, the social comparison). The genius of Wordle's design is that even the accidental hooks work together seamlessly — the intentional architecture created space for emergent behaviors that reinforced engagement.</div>
  </details>
  <details>
    <summary>Can understanding the psychology help me enjoy Wordle more?</summary>
    <div>Absolutely. Recognizing the mechanisms at play gives you agency over your engagement. When you know the Zeigarnik effect is making you anxious to play, you can consciously decide "I'll play after lunch, not right now." When you know the streak is leveraging sunk cost, you can evaluate whether maintaining it still brings you joy. Understanding the psychology doesn't diminish the enjoyment — it transforms you from a passive participant into an informed one who can choose when and how to engage.</div>
  </details>
  <details>
    <summary>What can Wordle teach us about building better daily habits?</summary>
    <div>Five key lessons: (1) Keep sessions short and bounded — 5-10 minutes is enough. (2) Create a daily cue that's hard to ignore. (3) Introduce variability to prevent habituation. (4) Make progress visible and the cost of skipping tangible. (5) Add a social component for accountability. Whether you're building a writing habit, exercise routine, or meditation practice, these same principles apply. Wordle isn't just a game — it's a template for behavioral design that happens to use five-letter words as its medium.</div>
  </details>
</div>
`,
};
