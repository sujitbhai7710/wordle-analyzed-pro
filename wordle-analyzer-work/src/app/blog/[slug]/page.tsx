import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostPageClient } from './BlogPostPageClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBlogPost, blogPosts } from '@/lib/blog/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://wordleanalyzer.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      url: `https://wordleanalyzer.dev/blog/${post.slug}`,
      siteName: 'Wordle Analyzer',
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
      description: post.authorBio,
      url: 'https://wordleanalyzer.dev/about',
      knowsAbout: ['Statistics', 'Information Theory', 'Wordle Strategy', 'Puzzle Analysis'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wordle Analyzer',
      url: 'https://wordleanalyzer.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wordleanalyzer.dev/logo.svg',
      },
    },
    url: `https://wordleanalyzer.dev/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wordleanalyzer.dev/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
    inLanguage: 'en',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://wordleanalyzer.dev/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogPostPageClient post={post} />
    </>
  );
}
