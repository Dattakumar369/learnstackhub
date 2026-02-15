import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTopicById, getAllTopics } from '../data';

function StructuredData({ topicId, type = 'WebSite' }) {
  const location = useLocation();
  const baseUrl = 'https://learnstackhub.com';

  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    let structuredData = {};

    if (type === 'WebSite' || location.pathname === '/') {
      // Homepage - WebSite schema
      const allTopics = getAllTopics();
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LearnStackHub',
        description: 'Your complete journey from Java fundamentals to cloud-ready full-stack development',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        publisher: {
          '@type': 'Organization',
          name: 'LearnStackHub',
          url: baseUrl
        }
      };
    } else if (type === 'Article' && topicId) {
      // Tutorial page - Article schema
      const topic = getTopicById(topicId);
      if (topic) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: topic.title,
          description: topic.description || `Learn ${topic.title} with step-by-step tutorials`,
          url: `${baseUrl}/tutorial/${topic.id}`,
          author: {
            '@type': 'Organization',
            name: 'LearnStackHub'
          },
          publisher: {
            '@type': 'Organization',
            name: 'LearnStackHub',
            url: baseUrl
          },
          datePublished: '2024-01-01',
          dateModified: new Date().toISOString().split('T')[0],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/tutorial/${topic.id}`
          },
          articleSection: topic.courseTitle || 'Java Tutorial',
          keywords: `${topic.title}, Java, ${topic.courseTitle}, Tutorial`
        };
      }
    } else if (type === 'Course' || location.pathname.includes('/tutorial/')) {
      // Course schema for tutorial pages
      const topic = topicId ? getTopicById(topicId) : null;
      if (topic) {
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: topic.title,
          description: topic.description || `Learn ${topic.title}`,
          provider: {
            '@type': 'Organization',
            name: 'LearnStackHub',
            url: baseUrl
          },
          courseCode: topic.id,
          educationalLevel: 'Beginner to Advanced',
          teaches: topic.title
        };
      }
    } else if (type === 'Organization' || location.pathname === '/about') {
      // About page - Organization schema
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LearnStackHub',
        url: baseUrl,
        description: 'Free Java Full Stack Development Tutorials',
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://github.com/Dattakumar369/learnstackhub'
        ]
      };
    }

    // Add structured data to page
    if (Object.keys(structuredData).length > 0) {
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [location.pathname, topicId, type]);

  return null;
}

export default StructuredData;

