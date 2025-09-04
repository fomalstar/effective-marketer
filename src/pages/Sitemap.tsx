import React, { useEffect, useState } from 'react';
import { generateSitemapData, generateSitemapXML } from '../utils/sitemapGenerator';

const Sitemap: React.FC = () => {
  const [sitemapXML, setSitemapXML] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        const sitemapData = await generateSitemapData();
        const xml = generateSitemapXML(sitemapData);
        setSitemapXML(xml);
      } catch (error) {
        console.error('Error generating sitemap:', error);
        setSitemapXML('Error generating sitemap');
      } finally {
        setIsLoading(false);
      }
    };

    generateSitemap();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating sitemap...</p>
        </div>
      </div>
    );
  }

  // Return XML content with proper headers
  return (
    <pre className="whitespace-pre-wrap text-xs font-mono bg-gray-100 p-4 overflow-auto">
      {sitemapXML}
    </pre>
  );
};

export default Sitemap;

