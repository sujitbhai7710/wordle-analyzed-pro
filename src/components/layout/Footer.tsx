import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Wordle Analyzer - Home">
              <div className="flex gap-0.5" aria-hidden="true">
                <div className="w-4 h-4 rounded bg-[#6aaa64] flex items-center justify-center text-white text-[6px] font-bold">W</div>
                <div className="w-4 h-4 rounded bg-[#c9b458] flex items-center justify-center text-white text-[6px] font-bold">O</div>
                <div className="w-4 h-4 rounded bg-[#787c7e] flex items-center justify-center text-white text-[6px] font-bold">R</div>
              </div>
              <span className="text-sm font-bold tracking-tight">
                Wordle <span className="text-[#6aaa64]">Analyzer</span> <span className="text-[#c9b458] font-extrabold text-xs">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Free, data-driven Wordle analysis tool. Discover your luck rating, guess quality, and optimal plays — all processed locally in your browser for complete privacy.
            </p>
            {/* Social proof */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#6aaa64]/10 text-[#6aaa64] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6aaa64]" aria-hidden="true" />
                Trusted by 25,000+ players · Now with Pro features
              </span>
            </div>
          </div>

          {/* Analysis Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Analysis Tools</h3>
            <ul className="space-y-2.5" role="list">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Wordle Analyzer Pro</Link></li>
              <li><Link href="/tools/best-words" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Best Starting Words</Link></li>
              <li><Link href="/tools/letter-frequency" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Letter Frequency Tool</Link></li>
            </ul>
          </div>

          {/* Strategy & Guides */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Strategy & Guides</h3>
            <ul className="space-y-2.5" role="list">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">All Blog Posts</Link></li>
              <li><Link href="/blog/best-wordle-starting-words" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Best Starting Words Guide</Link></li>
              <li><Link href="/blog/wordle-strategy-guide" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Strategy Guide</Link></li>
              <li><Link href="/blog/common-wordle-mistakes" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Common Mistakes</Link></li>
              <li><Link href="/blog/advanced-wordle-strategies" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Advanced Strategies</Link></li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">About & Legal</h3>
            <ul className="space-y-2.5" role="list">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors">Privacy Policy</Link></li>
              <li>
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#6aaa64] transition-colors inline-flex items-center gap-1"
                >
                  How Google Uses Data
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & compliance bar */}
        <div className="mt-8 pt-6 border-t border-border/40">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-[#6aaa64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              100% Browser-Based — No Data Stored on Servers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-[#6aaa64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Privacy-First Analysis
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-[#6aaa64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              AdSense Compliant
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Wordle Analyzer Pro. All rights reserved. Not affiliated with the New York Times or Wordle.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with data-driven methodology · <Link href="/privacy" className="hover:text-[#6aaa64] transition-colors">Privacy</Link> · <Link href="/contact" className="hover:text-[#6aaa64] transition-colors">Contact</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
