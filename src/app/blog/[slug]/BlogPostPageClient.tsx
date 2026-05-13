'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Share2, Clock, User, BookOpen, CheckCircle2, Lightbulb, AlertTriangle, Info, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BlogCard } from '@/components/blog/BlogCard';
import { getRelatedPosts } from '@/lib/blog/posts';
import type { BlogPost } from '@/lib/blog/posts';
import { toast } from '@/hooks/use-toast';

interface Props {
  post: BlogPost;
}

export function BlogPostPageClient({ post }: Props) {
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadingProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Initialize interactive elements after content renders
  useEffect(() => {
    // Add click handlers to details/summary for smooth toggling
    const detailsElements = document.querySelectorAll('.blog-content details');
    detailsElements.forEach((detail) => {
      detail.addEventListener('toggle', () => {
        const content = detail.querySelector('details > div, details > p, details > ul, details > ol');
        if (content instanceof HTMLElement) {
          if (detail.open) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
          } else {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
          }
        }
      });
    });

    // Add wordle-tile click animation
    const tiles = document.querySelectorAll('.wordle-demo-tile');
    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        tile.classList.toggle('flipped');
      });
    });
  }, [post.content]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied!', description: 'The article link has been copied to your clipboard.' });
    } catch {
      toast({ title: 'Could not copy', description: 'Please copy the URL manually.', variant: 'destructive' });
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-[#6aaa64] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pt-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#6aaa64] transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-[#6aaa64] transition-colors">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-[#6aaa64]/10 text-[#6aaa64] border-[#6aaa64]/20 hover:bg-[#6aaa64]/20">
                  {post.category}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  Article
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-5 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.description}
              </p>

              {/* Author Card */}
              <div className="flex items-center gap-4 p-5 rounded-xl bg-muted/50 border border-border/50">
                <div className="w-12 h-12 rounded-full bg-[#6aaa64] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  DR
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold flex items-center gap-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {post.author}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {post.authorBio}
                  </p>
                </div>
                <div className="ml-auto text-right text-sm text-muted-foreground shrink-0 hidden sm:block">
                  <div>Published</div>
                  <div className="font-medium text-foreground">
                    {new Date(post.datePublished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="blog-content prose prose-lg prose-gray dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/50
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
              prose-p:text-base prose-p:leading-[1.8] prose-p:my-5
              prose-li:my-1 prose-li:text-base
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-[#6aaa64] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-sm
              prose-blockquote:border-l-[#6aaa64] prose-blockquote:bg-[#6aaa64]/5 prose-blockquote:rounded-r-lg prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic
            ">
              {post.content === 'BLOG_CONTENT_PLACEHOLDER' ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg font-medium mb-2">Content Coming Soon</p>
                  <p className="text-sm">This article is being written. Check back soon for the full guide!</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>

            <Separator className="my-10" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs py-1 px-3 hover:bg-[#6aaa64]/5 hover:border-[#6aaa64]/30 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium">Share this article:</span>
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 hover:bg-[#6aaa64]/5 hover:border-[#6aaa64]/30">
                <Share2 className="h-3.5 w-3.5" />
                Copy Link
              </Button>
            </div>

            {/* Back */}
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#6aaa64] hover:underline font-medium">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>
          </motion.article>

          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-12 space-y-6">
              {/* Quick Navigation */}
              <QuickNav content={post.content} />

              {/* Related Posts */}
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Related Posts</h3>
                <div className="space-y-3">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="block p-3 rounded-lg border hover:border-[#6aaa64]/30 hover:bg-[#6aaa64]/5 transition-all duration-200"
                    >
                      <div className="text-xs text-[#6aaa64] font-medium mb-1">{rp.category}</div>
                      <div className="text-sm font-medium line-clamp-2">{rp.title}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#6aaa64]/10 to-[#6aaa64]/5 border border-[#6aaa64]/20">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="text-[#6aaa64]">⬛</span>
                  Try the Analyzer
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Analyze your Wordle gameplay with our free tool. Get detailed insights into your strategy.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center text-xs font-semibold text-[#6aaa64] hover:underline"
                >
                  Go to Analyzer &rarr;
                </Link>
              </div>

              {/* Key Takeaways CTA */}
              <div className="p-5 rounded-xl bg-muted/50 border border-border/50">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#6aaa64]" />
                  Daily Wordle Tips
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Sign up for our newsletter to get daily Wordle tips and strategies delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-1 focus:ring-[#6aaa64]"
                  />
                  <Button size="sm" className="bg-[#6aaa64] hover:bg-[#5a9a54] text-white text-xs px-3">
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts (mobile + bottom) */}
        <section className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Continue Reading</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map((rp) => (
              <BlogCard key={rp.slug} post={rp} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function QuickNav({ content }: { content: string }) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Extract headings from the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');
    const extracted: { id: string; text: string; level: number }[] = [];

    headingElements.forEach((el, i) => {
      const text = el.textContent || '';
      const id = `section-${i}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      extracted.push({ id, text, level: parseInt(el.tagName[1]) });
    });

    setHeadings(extracted);

    // Add IDs to actual headings in the DOM
    const contentEl = document.querySelector('.blog-content');
    if (contentEl) {
      const actualHeadings = contentEl.querySelectorAll('h2, h3');
      actualHeadings.forEach((el, i) => {
        if (extracted[i]) {
          el.id = extracted[i].id;
        }
      });
    }
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Quick Navigation</h3>
      <nav className="space-y-1 max-h-[40vh] overflow-y-auto">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block text-xs py-1 hover:text-[#6aaa64] transition-colors truncate ${
              h.level === 3 ? 'pl-4 text-muted-foreground' : 'text-foreground/80'
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
