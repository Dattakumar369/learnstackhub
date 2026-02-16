import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../config/analytics';

/**
 * Hook to track page views in Google Analytics
 * Automatically tracks route changes in React Router
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};


