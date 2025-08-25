import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://effectivemarketer.com${item.href}` : undefined
    }))
  };

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Visual Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center">
              <a
                href="/"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
                aria-label="Home"
              >
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </a>
            </li>
            
            {items.slice(1).map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;