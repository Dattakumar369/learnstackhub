import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ContributionProvider } from './context/ContributionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import Sitemap from './pages/Sitemap';
import { initGA } from './config/analytics';
import { usePageTracking } from './hooks/usePageTracking';
import './App.css';

// Component to initialize GA and track routes
function AppWithTracking() {
  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tutorial/:topicId" element={<Tutorial />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="sitemap.xml" element={<Sitemap />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContributionProvider>
        <Router basename="/">
          <AppWithTracking />
        </Router>
      </ContributionProvider>
    </AuthProvider>
  );
}

export default App;
