import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wordleanalyzer.dev"),
  title: {
    default: "Wordle Analyzer- your free wordlebot",
    template: "%s | Wordle Analyzer",
  },
  description:
    "Wordle Analyzer is your free wordlebot for analyzing Wordle gameplay. Discover your luck rating, guess quality, and AI-recommended optimal plays with our Wordle Analyzer wordlebot tool.",
  keywords: [
    "Wordle Analyzer",
    "wordlebot",
    "Wordle analyzer",
    "Wordle analysis",
    "Wordle solver",
    "Wordle strategy",
    "Wordle tips",
    "best Wordle starting words",
    "Wordle luck rating",
    "Wordle guess quality",
    "Wordle helper",
    "wordlebot tool",
    "free wordlebot",
    "improve Wordle",
    "Wordle optimal play",
  ],
  authors: [{ name: "Dwayne K. Richardson", url: "https://wordleanalyzer.dev/about" }],
  creator: "Dwayne K. Richardson",
  publisher: "Wordle Analyzer",
  icons: {
    icon: "/logo.svg",
  },
  alternates: {
    canonical: "https://wordleanalyzer.dev",
  },
  openGraph: {
    title: "Wordle Analyzer- your free wordlebot",
    description:
      "Wordle Analyzer is your free wordlebot for analyzing Wordle gameplay. Discover your luck rating, guess quality, and AI-recommended optimal plays.",
    url: "https://wordleanalyzer.dev",
    siteName: "Wordle Analyzer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wordle Analyzer- your free wordlebot",
    description:
      "Wordle Analyzer is your free wordlebot for analyzing Wordle gameplay. Discover your luck rating, guess quality, and AI-recommended optimal plays.",
    creator: "@wordleanalyzer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "Games",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://wordleanalyzer.dev",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wordle Analyzer",
  url: "https://wordleanalyzer.dev",
  description:
    "Free Wordle analysis tool that evaluates your gameplay with luck ratings, guess quality scores, and AI-recommended optimal plays.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://wordleanalyzer.dev/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Domain redirect: wordle-analyzer.pages.dev → wordleanalyzer.dev */}
        <Script id="domain-redirect" strategy="beforeInteractive">
          {`
            if (window.location.hostname === 'wordle-analyzer.pages.dev') {
              window.location.replace('https://wordleanalyzer.dev' + window.location.pathname + window.location.search + window.location.hash);
            }
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TMZQS9R3HB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TMZQS9R3HB');
          `}
        </Script>
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
