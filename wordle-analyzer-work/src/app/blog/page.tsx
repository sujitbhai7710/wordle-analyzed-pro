import type { Metadata } from 'next';
import { BlogPageClient } from './BlogPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Wordle Blog - Strategy Tips, Guides & Analysis',
  description:
    'Expert Wordle strategy guides, tips, and analysis. Learn the best starting words, advanced strategies, and improve your Wordle game with data-driven insights.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/blog',
  },
  openGraph: {
    title: 'Wordle Blog - Strategy Tips, Guides & Analysis',
    description:
      'Expert Wordle strategy guides, tips, and analysis. Learn the best starting words, advanced strategies, and improve your Wordle game with data-driven insights.',
    url: 'https://wordleanalyzer.dev/blog',
    type: 'website',
    siteName: 'Wordle Analyzer',
    images: [
      {
        url: 'https://wordleanalyzer.dev/og-image.png',
        width: 1152,
        height: 864,
        alt: 'Wordle Blog - Wordle Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wordle Blog - Strategy Tips, Guides & Analysis',
    description: 'Expert Wordle strategy guides, tips, and data-driven analysis.',
    images: ['https://wordleanalyzer.dev/og-image.png'],
  },
};

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Wordle Analyzer Blog',
    description: 'Expert Wordle strategy guides, tips, and analysis.',
    url: 'https://wordleanalyzer.dev/blog',
    author: {
      '@type': 'Person',
      name: 'Dwayne K. Richardson',
      url: 'https://wordleanalyzer.dev/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wordle Analyzer',
      url: 'https://wordleanalyzer.dev',
    },
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wordle Blog',
    description: 'All blog posts about Wordle strategy, tips, and analysis.',
    url: 'https://wordleanalyzer.dev/blog',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://wordleanalyzer.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://wordleanalyzer.dev/blog',
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogPageClient />
    </>
  );
}
