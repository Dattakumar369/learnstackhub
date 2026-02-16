import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FAQSection({ topicId, courseTitle }) {
  // FAQ data for different topics
  const faqData = {
    'jdbc-introduction': [
      {
        question: 'What is JDBC and why is it important?',
        answer: 'JDBC (Java Database Connectivity) is a Java API that allows Java applications to connect and interact with databases. It\'s essential because it provides a standard way to access relational databases from Java programs, enabling you to perform CRUD operations, execute SQL queries, and manage database transactions.'
      },
      {
        question: 'What databases can I use with JDBC?',
        answer: 'JDBC can work with any database that has a JDBC driver. Popular databases include MySQL, PostgreSQL, Oracle, SQL Server, SQLite, and H2. Each database requires its specific JDBC driver (JAR file) to be added to your project.'
      },
      {
        question: 'What is the difference between Statement and PreparedStatement?',
        answer: 'Statement is used for static SQL queries, while PreparedStatement is used for parameterized queries. PreparedStatement is preferred because it prevents SQL injection attacks, improves performance through query caching, and makes code more readable and maintainable.'
      },
      {
        question: 'How do I handle database connections properly?',
        answer: 'Always close database connections, statements, and result sets in a finally block or use try-with-resources statement. This ensures resources are released even if an exception occurs. Never leave connections open as they consume database resources.'
      }
    ],
    'servlet-lifecycle': [
      {
        question: 'What is the Servlet lifecycle?',
        answer: 'The Servlet lifecycle consists of four phases: Loading & Instantiation (servlet class is loaded and instance created), Initialization (init() method called once), Request Handling (service() method called for each request), and Destruction (destroy() method called when servlet is removed).'
      },
      {
        question: 'When is init() method called?',
        answer: 'The init() method is called only once when the servlet is first loaded by the container. It\'s used to initialize resources like database connections, configuration parameters, or other expensive operations that should happen once.'
      },
      {
        question: 'What is the difference between service(), doGet(), and doPost()?',
        answer: 'service() is the main method that handles all requests and delegates to doGet() or doPost() based on the HTTP method. doGet() handles GET requests (retrieving data), while doPost() handles POST requests (submitting data).'
      },
      {
        question: 'Can I create multiple instances of a servlet?',
        answer: 'No, the servlet container creates only one instance of each servlet class. This single instance handles all requests, making servlets thread-safe by design. However, you must be careful with instance variables to avoid thread-safety issues.'
      }
    ],
    'jsp-implicit-objects': [
      {
        question: 'What are JSP implicit objects?',
        answer: 'JSP implicit objects are automatically available in JSP pages without explicit declaration. They include request, response, session, application, out, page, pageContext, config, and exception. These objects are created by the JSP container.'
      },
      {
        question: 'What is the difference between request and response objects?',
        answer: 'The request object (HttpServletRequest) contains client request information like parameters, headers, and cookies. The response object (HttpServletResponse) is used to send data back to the client, set headers, cookies, and write output.'
      },
      {
        question: 'When should I use session vs application scope?',
        answer: 'Use session scope for user-specific data that should persist across multiple requests from the same user (like login information). Use application scope for data shared across all users and sessions (like global counters or shared resources).'
      },
      {
        question: 'What is the out implicit object?',
        answer: 'The out object is a JspWriter instance used to write content to the response. It\'s similar to System.out.println() but writes to the HTTP response instead of the console. You can use out.print() or out.println() to output content.'
      }
    ],
    'hibernate-configuration': [
      {
        question: 'What is Hibernate configuration?',
        answer: 'Hibernate configuration involves setting up the connection between your Java application and the database. This includes database connection details (URL, username, password), dialect settings, and other Hibernate properties in hibernate.cfg.xml or through annotations.'
      },
      {
        question: 'What is a Hibernate dialect?',
        answer: 'A Hibernate dialect is a class that tells Hibernate how to generate SQL queries for a specific database. Each database (MySQL, PostgreSQL, Oracle) has its own dialect. For example, MySQL uses org.hibernate.dialect.MySQLDialect.'
      },
      {
        question: 'What is the difference between hibernate.cfg.xml and annotations?',
        answer: 'hibernate.cfg.xml is an XML-based configuration file where you define database connection properties and mapping files. Annotations (@Entity, @Table, @Column) are used directly in Java classes to map entities to database tables. Both can be used together.'
      },
      {
        question: 'How do I configure Hibernate with Maven?',
        answer: 'Add Hibernate dependencies to your pom.xml file, including hibernate-core and your database driver (like mysql-connector-java). Then create hibernate.cfg.xml in the src/main/resources folder with your database configuration.'
      }
    ]
  };

  const faqs = faqData[topicId] || [];
  const [openIndex, setOpenIndex] = useState(null);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <div className="faq-section" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.75rem', 
        marginBottom: '1.5rem', 
        color: 'var(--text-primary)',
        borderBottom: '2px solid var(--accent-primary)',
        paddingBottom: '0.5rem'
      }}>
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="faq-item"
            style={{
              marginBottom: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: openIndex === index ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                transition: 'all 0.2s'
              }}
            >
              <span>{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div 
                className="faq-answer"
                style={{
                  padding: '1rem 1.5rem',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;


