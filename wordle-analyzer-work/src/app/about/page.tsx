import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About Wordle Analyzer - Our Mission, Methodology & Team',
  description:
    'Learn about Wordle Analyzer, our rigorous data-driven methodology, and meet the team. Founded by Dwayne K. Richardson and Harry L. Winter, combining puzzle expertise with technical excellence.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/about',
  },
  openGraph: {
    title: 'About Wordle Analyzer - Our Mission, Methodology & Team',
    description:
      'Learn about Wordle Analyzer, our rigorous data-driven methodology, and meet the team behind the tool.',
    url: 'https://wordleanalyzer.dev/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wordle Analyzer',
    url: 'https://wordleanalyzer.dev',
    description: 'Free Wordle analysis tool and strategy resource, trusted by 10,000+ players worldwide.',
    founder: {
      '@type': 'Person',
      name: 'Dwayne K. Richardson',
      jobTitle: 'Puzzle Analyst & Author',
      knowsAbout: ['Statistics', 'Information Theory', 'Wordle Strategy', 'Puzzle Analysis'],
    },
    foundingDate: '2023-01',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 2,
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dwayne K. Richardson',
    jobTitle: 'Puzzle Analyst & Author',
    description: 'Dwayne K. Richardson is a Wordle enthusiast and puzzle analyst who has been playing Wordle since January 2022. With a current streak of 340+ days, Dwayne combines statistical analysis with practical gameplay experience. He is the author of all blog posts on Wordle Analyzer.',
    url: 'https://wordleanalyzer.dev/about',
    knowsAbout: ['Statistics', 'Information Theory', 'Wordle', 'Data Analysis', 'Puzzle Strategy'],
    sameAs: ['https://wordleanalyzer.dev/about'],
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
        name: 'About',
        item: 'https://wordleanalyzer.dev/about',
      },
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AboutPageClient />
    </>
  );
}
