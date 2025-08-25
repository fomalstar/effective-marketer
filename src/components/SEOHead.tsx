import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Effective Marketer - AI Engine Optimization & Search Suggestion Mastery",
  description = "Transform your digital presence with cutting-edge AI Engine Optimization and search suggestion mastery. Position your brand as the top choice across ChatGPT, Claude, Gemini, and major search platforms.",
  keywords = "AI Engine Optimization, AEO, search suggestion optimization, ChatGPT optimization, Claude optimization, Gemini optimization, AI platform authority, digital marketing, SEO agency",
  canonical = "https://effectivemarketer.com",
  ogTitle,
  ogDescription,
  ogImage = "https://effectivemarketer.com/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Effective Marketer",
    "description": "Pioneering agency specializing in AI Engine Optimization (AEO) and search suggestion mastery",
    "url": "https://effectivemarketer.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://effectivemarketer.com/logo.png"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "contact@effectivemarketer.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/effective-marketer",
      "https://twitter.com/effectivemarketer",
      "https://www.facebook.com/effectivemarketer"
    ],
    "founder": {
      "@type": "Person",
      "name": "Yavor Stoyanov"
    },
    "numberOfEmployees": "30",
    "foundingDate": "2020",
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "France"
      },
      {
        "@type": "Country",
        "name": "Vietnam"
      },
      {
        "@type": "Country",
        "name": "Bulgaria"
      }
    ],
    "serviceType": [
      "AI Engine Optimization",
      "Search Suggestion Mastery",
      "AI Platform Authority Building",
      "Digital Marketing",
      "Content Intelligence"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Effective Marketer" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@effectivemarketer" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Effective Marketer" />
      <meta name="copyright" content="© 2024 Effective Marketer. All rights reserved." />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Additional Performance and SEO Tags */}
      <meta name="theme-color" content="#ff312b" />
      <meta name="msapplication-TileColor" content="#ff312b" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Helmet>
  );
};

export default SEOHead;