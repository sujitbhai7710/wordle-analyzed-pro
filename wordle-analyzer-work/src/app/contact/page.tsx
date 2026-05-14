import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us - Wordle Analyzer',
  description:
    'Get in touch with the Wordle Analyzer team. Send us feedback, questions, or suggestions about our Wordle analysis tool and strategy guides.',
  alternates: {
    canonical: 'https://wordleanalyzer.dev/contact',
  },
  openGraph: {
    title: 'Contact Us - Wordle Analyzer',
    description:
      'Get in touch with the Wordle Analyzer team. Send us feedback, questions, or suggestions.',
    url: 'https://wordleanalyzer.dev/contact',
    type: 'website',
    siteName: 'Wordle Analyzer',
    images: [
      {
        url: 'https://wordleanalyzer.dev/og-image.png',
        width: 1152,
        height: 864,
        alt: 'Contact Wordle Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Wordle Analyzer',
    description: 'Get in touch with the Wordle Analyzer team.',
    images: ['https://wordleanalyzer.dev/og-image.png'],
  },
};

export default function ContactPage() {
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
        name: 'Contact',
        item: 'https://wordleanalyzer.dev/contact',
      },
    ],
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Wordle Analyzer',
    description: 'Get in touch with the Wordle Analyzer team.',
    url: 'https://wordleanalyzer.dev/contact',
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactSchema} />
      <ContactPageClient />
    </>
  );
}
