import servletIntroduction from './ServletIntroduction';
import servletLifecycle from './ServletLifecycle';
import servletAPI from './ServletAPI';
import servletConfig from './ServletConfig';
import httpServletRequestResponse from './HttpServletRequestResponse';
import sessionManagement from './SessionManagement';
import filtersListeners from './FiltersListeners';
import servletAnnotations from './ServletAnnotations';
import servletSecurity from './ServletSecurity';

export const servlets = {
  id: 'servlets',
  title: 'Servlets',
  description: 'Learn Java Servlet technology for building dynamic web applications',
  icon: '🌐',
  topics: [
    {
      id: 'servlet-basics',
      title: 'Servlet Basics',
      topics: [
        servletIntroduction,
        servletLifecycle,
        servletAPI
      ]
    },
    {
      id: 'servlet-configuration',
      title: 'Configuration',
      topics: [
        servletConfig,
        servletAnnotations
      ]
    },
    {
      id: 'request-response',
      title: 'Request & Response',
      topics: [
        httpServletRequestResponse,
        sessionManagement
      ]
    },
    {
      id: 'advanced-servlets',
      title: 'Advanced Topics',
      topics: [
        filtersListeners,
        servletSecurity
      ]
    }
  ]
};

export default servlets;



