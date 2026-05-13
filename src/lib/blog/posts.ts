import { articlesGroup1 } from './articles-group1';
import { articlesGroup2 } from '../../data/articles-group-2';
import { articlesGroup3 } from './articles-group3';
import { articlesGroup4 } from './articles-group4';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  authorBio: string;
  datePublished: string;
  dateModified: string;
  category: string;
  tags: string[];
  readTime: string;
  imageDescription: string;
}

export const AUTHOR_NAME = "Dwayne K. Richardson";
export const AUTHOR_BIO = "Dwayne K. Richardson is a Wordle enthusiast and puzzle analyst who has been playing Wordle since January 2022. With a current streak of 340+ days, Dwayne combines statistical analysis with practical gameplay experience to help players improve their Wordle skills. He is the author of all blog posts on Wordle Analyzer.";

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-play-wordle",
    title: "How to Play Wordle: A Complete Beginner's Guide",
    description: "Learn everything you need to know about Wordle, from the basic rules to your first game. Our comprehensive beginner's guide covers all the essentials.",
    content: articlesGroup1["how-to-play-wordle"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
    category: "Guides",
    tags: ["wordle", "beginner", "how to play", "rules", "guide"],
    readTime: "8 min read",
    imageDescription: "A colorful Wordle game grid showing a completed puzzle with green, yellow, and gray tiles"
  },
  {
    slug: "best-wordle-starting-words",
    title: "The Best Wordle Starting Words According to Math and Data",
    description: "Discover the mathematically optimal Wordle starting words based on information theory and frequency analysis. Data-driven recommendations for your first guess.",
    content: articlesGroup1["best-wordle-starting-words"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-01-20",
    dateModified: "2025-01-20",
    category: "Strategy",
    tags: ["starting words", "math", "data", "optimal play", "information theory"],
    readTime: "10 min read",
    imageDescription: "A chart showing letter frequency distribution in Wordle answers with highlighted top starting words"
  },
  {
    slug: "wordle-strategy-guide",
    title: "Wordle Strategy Guide: Tips From a 200+ Day Streak Player",
    description: "Proven Wordle strategies from a player with a 340+ day streak. Learn the techniques that consistently lead to solving Wordle in 3-4 guesses.",
    content: articlesGroup1["wordle-strategy-guide"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-02-01",
    dateModified: "2025-02-01",
    category: "Strategy",
    tags: ["strategy", "tips", "streak", "advanced", "consistency"],
    readTime: "12 min read",
    imageDescription: "A Wordle streak calendar showing months of consecutive successful puzzles"
  },
  {
    slug: "wordle-color-system-explained",
    title: "Understanding Wordle's Color System: Green, Yellow, and Gray Explained",
    description: "A deep dive into Wordle's three-color feedback system. Learn exactly what green, yellow, and gray mean, including how duplicate letters are handled.",
    content: articlesGroup1["wordle-color-system-explained"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-02-10",
    dateModified: "2025-02-10",
    category: "Guides",
    tags: ["colors", "green", "yellow", "gray", "feedback", "duplicate letters"],
    readTime: "7 min read",
    imageDescription: "Three Wordle tiles showing green (correct), yellow (present), and gray (absent) with explanatory labels"
  },
  {
    slug: "wordle-hard-mode",
    title: "Wordle Hard Mode: Is It Really Harder? An Honest Analysis",
    description: "We analyze whether Wordle's Hard Mode is actually more difficult, and explore the strategic differences between normal and hard mode play.",
    content: articlesGroup1["wordle-hard-mode"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-02-15",
    dateModified: "2025-02-15",
    category: "Analysis",
    tags: ["hard mode", "difficulty", "comparison", "strategy", "rules"],
    readTime: "9 min read",
    imageDescription: "Side-by-side comparison of Wordle normal mode vs hard mode gameplay"
  },
  {
    slug: "math-behind-wordle",
    title: "The Math Behind Wordle: Information Theory and Optimal Play",
    description: "Explore the fascinating mathematics behind Wordle, from information theory to entropy calculations. Understand why certain words are mathematically superior.",
    content: articlesGroup1["math-behind-wordle"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-02-20",
    dateModified: "2025-02-20",
    category: "Analysis",
    tags: ["math", "information theory", "entropy", "probability", "optimal play"],
    readTime: "14 min read",
    imageDescription: "A mathematical diagram showing entropy calculations for Wordle guess evaluation"
  },
  {
    slug: "common-wordle-mistakes",
    title: "7 Common Wordle Mistakes Even Experienced Players Make",
    description: "Avoid these seven common Wordle pitfalls that trip up even veteran players. From ignoring letter patterns to poor second-guess strategy.",
    content: articlesGroup2["common-wordle-mistakes"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-03-01",
    dateModified: "2025-03-01",
    category: "Strategy",
    tags: ["mistakes", "common errors", "improvement", "tips", "gameplay"],
    readTime: "8 min read",
    imageDescription: "An illustration of common Wordle mistakes with X marks over incorrect strategies"
  },
  {
    slug: "wordle-streak-survival",
    title: "Wordle Streak Survival Guide: How to Never Lose Your Streak",
    description: "Protect your Wordle streak with our comprehensive survival guide. Strategies for the toughest puzzles and emergency tactics when you're stuck.",
    content: articlesGroup2["wordle-streak-survival"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-03-05",
    dateModified: "2025-03-05",
    category: "Strategy",
    tags: ["streak", "survival", "consistency", "emergency", "tactics"],
    readTime: "10 min read",
    imageDescription: "A flame icon representing a Wordle streak alongside a shield symbol for streak protection"
  },
  {
    slug: "best-second-words",
    title: "Best Second Words to Guess in Wordle After Your Opener",
    description: "What should your second Wordle guess be? We analyze the best follow-up words based on your first guess results and remaining possibilities.",
    content: articlesGroup2["best-second-words"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-03-10",
    dateModified: "2025-03-10",
    category: "Strategy",
    tags: ["second word", "follow-up", "opener", "strategy", "guessing"],
    readTime: "9 min read",
    imageDescription: "A Wordle grid showing the first two guesses with optimal letter coverage"
  },
  {
    slug: "wordle-vs-quordle",
    title: "Wordle vs. Quordle vs. Octordle: Which Puzzle Game Is Right for You?",
    description: "A comprehensive comparison of Wordle and its multi-word variants. Find out which daily word puzzle best matches your skill level and play style.",
    content: articlesGroup2["wordle-vs-quordle"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-03-15",
    dateModified: "2025-03-15",
    category: "Culture",
    tags: ["quordle", "octordle", "comparison", "puzzle games", "variants"],
    readTime: "11 min read",
    imageDescription: "Side-by-side screenshots of Wordle, Quordle, and Octordle game interfaces"
  },
  {
    slug: "analyze-wordle-gameplay",
    title: "How to Analyze Your Wordle Gameplay Like a Pro",
    description: "Learn how to use Wordle analyzers to evaluate your guesses, understand your luck rating, and identify areas for improvement in your gameplay.",
    content: articlesGroup2["analyze-wordle-gameplay"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-03-20",
    dateModified: "2025-03-20",
    category: "Tools",
    tags: ["analyzer", "gameplay", "improvement", "analysis", "tools"],
    readTime: "10 min read",
    imageDescription: "A Wordle Analyzer interface showing detailed gameplay analysis with color-coded tiles and statistics"
  },
  {
    slug: "psychology-of-wordle",
    title: "The Psychology of Wordle: Why We're Obsessed With Five Letters",
    description: "Explore the psychological factors that make Wordle so addictive, from the Zeigarnik effect to social sharing and daily ritual formation.",
    content: articlesGroup2["psychology-of-wordle"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-03-25",
    dateModified: "2025-03-25",
    category: "Culture",
    tags: ["psychology", "addiction", "habits", "social", "behavior"],
    readTime: "12 min read",
    imageDescription: "An abstract illustration representing the psychology of puzzle-solving and daily habits"
  },
  {
    slug: "wordle-alternatives",
    title: "15 Wordle Alternatives Worth Trying in 2025",
    description: "Discover the best Wordle alternatives and spin-offs, from word variants like Quordle to entirely different puzzle types that scratch the same itch.",
    content: articlesGroup3["wordle-alternatives"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-04-01",
    dateModified: "2025-04-01",
    category: "Culture",
    tags: ["alternatives", "spin-offs", "puzzle games", "word games", "variants"],
    readTime: "13 min read",
    imageDescription: "A collage of different Wordle alternative game logos and interfaces"
  },
  {
    slug: "wordle-answer-algorithm",
    title: "How Wordle's Algorithm Works: Inside the Answer List",
    description: "An in-depth look at how Wordle selects its daily answer, the structure of the answer list, and why some words are more likely than others.",
    content: articlesGroup3["wordle-answer-algorithm"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-04-05",
    dateModified: "2025-04-05",
    category: "Analysis",
    tags: ["algorithm", "answer list", "NYT", "how it works", "word selection"],
    readTime: "11 min read",
    imageDescription: "A flowchart diagram showing how Wordle's answer selection algorithm works"
  },
  {
    slug: "wordle-solver-tools",
    title: "Wordle Solver Tools: Which Ones Actually Work?",
    description: "We tested the most popular Wordle solver tools and helpers to find out which ones provide genuinely useful assistance and which fall short.",
    content: articlesGroup3["wordle-solver-tools"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-04-10",
    dateModified: "2025-04-10",
    category: "Tools",
    tags: ["solver", "tools", "helper", "comparison", "review"],
    readTime: "10 min read",
    imageDescription: "Screenshots of different Wordle solver tools with ratings and comparison badges"
  },
  {
    slug: "history-of-wordle",
    title: "The History of Wordle: From Josh Wardle to the New York Times",
    description: "The complete story of Wordle's creation, its viral explosion, and the New York Times acquisition. How a love letter became a global phenomenon.",
    content: articlesGroup3["history-of-wordle"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-04-15",
    dateModified: "2025-04-15",
    category: "Culture",
    tags: ["history", "Josh Wardle", "NYT", "origins", "viral"],
    readTime: "12 min read",
    imageDescription: "A timeline graphic showing key milestones in Wordle's history from creation to NYT acquisition"
  },
  {
    slug: "wordle-etiquette",
    title: "Wordle Etiquette: The Unspoken Rules of Sharing Your Score",
    description: "Navigate the social norms of Wordle sharing — when to post, what not to reveal, and how to share your score without spoiling the fun for others.",
    content: articlesGroup3["wordle-etiquette"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-04-20",
    dateModified: "2025-04-20",
    category: "Culture",
    tags: ["etiquette", "sharing", "social media", "spoilers", "community"],
    readTime: "7 min read",
    imageDescription: "Social media icons with Wordle score sharing examples showing proper and improper sharing"
  },
  {
    slug: "improve-wordle-average",
    title: "How to Improve Your Wordle Average Score: A Data-Driven Approach",
    description: "Use data and statistical analysis to systematically improve your Wordle average. Track your performance and identify specific areas for growth.",
    content: articlesGroup4["improve-wordle-average"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-04-25",
    dateModified: "2025-04-25",
    category: "Strategy",
    tags: ["average", "improvement", "data", "tracking", "statistics"],
    readTime: "11 min read",
    imageDescription: "A performance dashboard showing Wordle statistics and improvement trends over time"
  },
  {
    slug: "letter-frequency-wordle",
    title: "Letter Frequency in Wordle: Which Letters Appear Most Often",
    description: "A comprehensive analysis of letter frequency in Wordle answers, including position-specific data. Use this knowledge to make better guesses.",
    content: articlesGroup4["letter-frequency-wordle"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-05-01",
    dateModified: "2025-05-01",
    category: "Analysis",
    tags: ["letter frequency", "data", "statistics", "positions", "analysis"],
    readTime: "10 min read",
    imageDescription: "A bar chart showing letter frequency distribution across all Wordle answers"
  },
  {
    slug: "advanced-wordle-strategies",
    title: "Advanced Wordle Strategies: Beyond the Basics",
    description: "Take your Wordle game to the next level with advanced strategies including vowel positioning, consonant clustering, and endgame optimization.",
    content: articlesGroup4["advanced-wordle-strategies"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-05-05",
    dateModified: "2025-05-05",
    category: "Strategy",
    tags: ["advanced", "vowels", "consonants", "endgame", "optimization"],
    readTime: "13 min read",
    imageDescription: "An advanced Wordle strategy board showing letter positioning and elimination patterns"
  },
  {
    slug: "why-some-answers-harder",
    title: "Why Some Wordle Answers Are Harder Than Others",
    description: "An analysis of what makes certain Wordle answers more difficult, from uncommon letter patterns to ambiguous word endings and tricky duplicates.",
    content: articlesGroup4["why-some-answers-harder"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-05-10",
    dateModified: "2025-05-10",
    category: "Analysis",
    tags: ["difficulty", "hard words", "patterns", "duplicates", "analysis"],
    readTime: "9 min read",
    imageDescription: "A visualization showing the difficulty distribution of Wordle answers from easy to hard"
  },
  {
    slug: "wordle-elimination-science",
    title: "The Science of Elimination: How to Narrow Down Answers Faster",
    description: "Master the art of elimination in Wordle using systematic approaches to rule out words efficiently and solve puzzles in fewer guesses.",
    content: articlesGroup4["wordle-elimination-science"],
    author: AUTHOR_NAME,
    authorBio: AUTHOR_BIO,
    datePublished: "2025-05-15",
    dateModified: "2025-05-15",
    category: "Strategy",
    tags: ["elimination", "efficiency", "systematic", "narrowing", "solving"],
    readTime: "10 min read",
    imageDescription: "A funnel diagram showing how elimination reduces possible answers from thousands to one"
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return blogPosts;
  return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const current = getBlogPost(currentSlug);
  if (!current) return blogPosts.slice(0, count);

  // Prioritize same category, then same tags
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;
      score += post.tags.filter((t) => current.tags.includes(t)).length;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post);

  return related.slice(0, count);
}

export const BLOG_CATEGORIES = ['All', 'Strategy', 'Guides', 'Analysis', 'Culture', 'Tools'];
