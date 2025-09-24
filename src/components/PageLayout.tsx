import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import SEOHead from './SEOHead';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object | object[];
  noIndex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  structuredData,
  noIndex = false,
  breadcrumbs
}) => {
  const breadcrumbStructuredData = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.label,
          ...(item.href ? { "item": typeof window !== 'undefined' && item.href.startsWith('http') ? item.href : `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}` } : {})
        }))
      }
    : undefined;

  const combinedStructuredData = breadcrumbStructuredData
    ? (Array.isArray(structuredData) ? [...structuredData, breadcrumbStructuredData] : structuredData ? [structuredData, breadcrumbStructuredData] : [breadcrumbStructuredData])
    : structuredData;

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <SEOHead
          title={title}
          description={description}
          keywords={keywords}
          canonical={canonical}
          ogTitle={ogTitle}
          ogDescription={ogDescription}
          ogImage={ogImage}
          ogType={ogType}
          structuredData={combinedStructuredData}
        />
        
        <Header />
        
        {/* breadcrumbs intentionally not rendered; prop is referenced to avoid unused warnings */}
        {breadcrumbs && null}
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default PageLayout;