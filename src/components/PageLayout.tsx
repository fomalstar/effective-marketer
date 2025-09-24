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
          structuredData={structuredData}
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