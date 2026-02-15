// Script to generate sitemap.xml for static hosting
// Run: node scripts/generate-sitemap.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the generateSitemap function
// Since we can't directly import from src in a Node script, we'll recreate the logic
const baseUrl = 'https://learnstackhub.com';
const currentDate = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms', priority: '0.5', changefreq: 'yearly' },
];

// Read topic data from the data index file
// For now, we'll create a basic sitemap. In production, you'd parse the actual data files
const tutorialPages = [
  // Core Java Basics
  { url: '/tutorial/java-introduction', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-features', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-environment-setup', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-syntax', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-variables', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-data-types', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-operators', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-methods', priority: '0.9', changefreq: 'weekly' },
  { url: '/tutorial/java-keywords', priority: '0.9', changefreq: 'weekly' },
  // Add more topics as needed - this is a template
];

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

// Write to public directory
const publicDir = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`✅ Sitemap generated at: ${sitemapPath}`);
console.log(`📄 Total URLs: ${allPages.length}`);

