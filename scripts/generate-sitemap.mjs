#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Location data for dynamic pages
const locations = [
  'malaysia',
  'usa', 
  'uae',
  'vietnam',
  'france',
  'bulgaria'
];

// Static pages data
const staticPages = [
  {
    url: 'https://effectivemarketer.com/',
    priority: '1.0',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/Effective%20Marketer.jpg',
      title: 'Effective Marketer - AI SEO Agency',
      caption: 'Leading AI SEO agency specializing in Google autosuggests optimization'
    }
  },
  {
    url: 'https://effectivemarketer.com/google-autosuggest-ranking',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/googleautosuggests.jpg',
      title: 'Google Autosuggest Ranking Services',
      caption: 'Get Google Autosuggest rankings in 45-60 days with SEO optimization'
    }
  },
  {
    url: 'https://effectivemarketer.com/ai-seo',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/Effective%20Marketer.jpg',
      title: 'AI SEO Agency Services',
      caption: 'AI platform visibility, Reddit growth, and advanced AI Topical Maps'
    }
  },
  {
    url: 'https://effectivemarketer.com/ai-topical-map',
    priority: '0.9',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/topicalmape.png',
      title: 'AI Topical Map Services',
      caption: 'Entity-rich blueprints built for Generative Intent'
    }
  },
  {
    url: 'https://effectivemarketer.com/lead-gen-ai-automation',
    priority: '0.8',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/leadgen.png',
      title: 'AI Lead Generation Automation',
      caption: 'Automated multi-channel lead generation with AI'
    }
  },
  {
    url: 'https://effectivemarketer.com/case-studies',
    priority: '0.8',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/Effective%20Marketer.jpg',
      title: 'Case Studies - Effective Marketer',
      caption: 'Client success stories and proven AI SEO results'
    }
  },
  {
    url: 'https://effectivemarketer.com/ai-seo-for-saas-companies',
    priority: '0.8',
    changefreq: 'weekly',
    image: {
      loc: 'https://effectivemarketer.com/og-image-saas.jpg',
      title: 'AI SEO Services for SaaS Companies',
      caption: 'Dominate Google Autocomplete and AI platforms for SaaS keywords'
    }
  },
  {
    url: 'https://effectivemarketer.com/onboarding',
    priority: '0.5',
    changefreq: 'monthly',
    image: null
  }
];

// Generate location pages
const locationPages = locations.map(location => ({
  url: `https://effectivemarketer.com/ai-seo-agency-${location}`,
  priority: '0.7',
  changefreq: 'weekly',
  image: {
    loc: `https://effectivemarketer.com/og-image-${location}.jpg`,
    title: `Best AI SEO Agency in ${location.charAt(0).toUpperCase() + location.slice(1)}`,
    caption: `Leading AI SEO agency specializing in Google Autosuggest ranking in ${location.charAt(0).toUpperCase() + location.slice(1)}`
  }
}));

// Combine all pages
const allPages = [...staticPages, ...locationPages];

// Generate XML sitemap
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  allPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
    
    if (page.image) {
      sitemap += `
    <image:image>
      <image:loc>${page.image.loc}</image:loc>
      <image:title>${page.image.title}</image:title>
      <image:caption>${page.image.caption}</image:caption>
    </image:image>`;
    }
    
    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const sitemapContent = generateSitemap();
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

try {
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ Sitemap generated successfully!');
  console.log(`📄 Location: ${sitemapPath}`);
  console.log(`📊 Total pages: ${allPages.length}`);
  console.log(`📅 Last modified: ${getCurrentDate()}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
