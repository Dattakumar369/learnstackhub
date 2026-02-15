// Generate sitemap.xml for SEO
import { getAllTopics } from '../data';

export const generateSitemap = () => {
  const baseUrl = 'https://dattakumar369.github.io/learnstackhub';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  ];

  // Tutorial pages
  const allTopics = getAllTopics();
  const tutorialPages = allTopics.map(topic => ({
    url: `/tutorial/${topic.id}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: currentDate
  }));

  // Combine all pages
  const allPages = [...staticPages, ...tutorialPages];

  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  return xml;
};

