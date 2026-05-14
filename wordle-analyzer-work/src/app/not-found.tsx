import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved. Return to Wordle Analyzer homepage or browse our blog.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
      <div className="flex justify-center gap-1 mb-6">
        <div className="w-12 h-12 rounded-lg bg-[#787c7e] flex items-center justify-center text-white text-xl font-bold">4</div>
        <div className="w-12 h-12 rounded-lg bg-[#c9b458] flex items-center justify-center text-white text-xl font-bold">0</div>
        <div className="w-12 h-12 rounded-lg bg-[#6aaa64] flex items-center justify-center text-white text-xl font-bold">4</div>
      </div>
      <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Looks like this word isn&apos;t in our dictionary. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#6aaa64] hover:bg-[#5a9a54] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 border border-border hover:bg-accent font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Read the Blog
        </Link>
      </div>
    </div>
  );
}
