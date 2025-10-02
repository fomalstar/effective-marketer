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
  structuredData?: object | object[];
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Google Autosuggests & AI SEO Agency - Effective Marketer",
  description = "Leading AI SEO agency delivering advanced autosuggests solutions to optimize your ranking and dominate Google Autocomplete. Our specialized agency provides cutting-edge AI SEO strategies that optimize your brand for maximum visibility in ChatGPT, Gemini, and AI Overviews.",
  keywords = "AI SEO agency, Google autosuggests optimization, AI SEO solutions, autosuggests ranking, Google Autocomplete optimization, AI SEO services, search suggestion optimization, ranking optimization, digital marketing agency, SEO agency, ChatGPT ranking, Gemini optimization, AI Overviews, generative engine optimization, GEO, AI platform visibility",
  canonical = "https://effectivemarketer.com",
  ogTitle,
  ogDescription,
  ogImage = "https://effectivemarketer.com/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false
}) => {
  const defaultStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Effective Marketer",
      "description": "Leading AI SEO agency specializing in Google autosuggests optimization and advanced ranking solutions",
      "url": "https://effectivemarketer.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://effectivemarketer.com/EM%20LOGO.png"
      },
      "sameAs": [
        "https://www.linkedin.com/company/effective-marketer",
        "https://www.facebook.com/effectivemarketercom"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@effectivemarketer.com",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Effective Marketer",
      "url": "https://effectivemarketer.com/",
      "description": "Leading AI SEO agency specializing in Google autosuggests optimization and advanced ranking solutions"
    }
  ];

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
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Effective Marketer" />
      <meta name="copyright" content="© 2024 Effective Marketer. All rights reserved." />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      
      
      {/* Structured Data */}
      {Array.isArray(structuredData) ? (
        structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(structuredData || defaultStructuredData)}
        </script>
      )}
      
      {/* Performance and Core Web Vitals Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://calendly.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://effectivemarketer.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Critical Resource Hints */}
      
      {/* Additional Performance and SEO Tags */}
      <meta name="theme-color" content="#ff312b" />
      <meta name="msapplication-TileColor" content="#ff312b" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Performance Hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
};

export default SEOHead;