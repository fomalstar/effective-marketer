import React, { useEffect, useState } from 'react';
import { generateSitemapData, generateRSSFeed } from '../utils/sitemapGenerator';

const RSSFeed: React.FC = () => {
  const [rssXML, setRssXML] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateRSS = async () => {
      try {
        const sitemapData = await generateSitemapData();
        const rss = generateRSSFeed(sitemapData);
        setRssXML(rss);
      } catch (error) {
        console.error('Error generating RSS feed:', error);
        setRssXML('Error generating RSS feed');
      } finally {
        setIsLoading(false);
      }
    };

    generateRSS();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating RSS feed...</p>
        </div>
      </div>
    );
  }

  // Return XML content with proper headers
  return (
    <pre className="whitespace-pre-wrap text-xs font-mono bg-gray-100 p-4 overflow-auto">
      {rssXML}
    </pre>
  );
};

export default RSSFeed;

