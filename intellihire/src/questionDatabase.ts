import { InterviewQuestion, Role, Difficulty } from './types';

export const questionDatabase: Record<Role, Record<Difficulty, InterviewQuestion[]>> = {
  frontend: {
    junior: [
      {
        id: 'fe-jr-1',
        question: 'What is the difference between let, const, and var in JavaScript?',
        type: 'technical',
        category: 'JavaScript Fundamentals',
        difficulty: 'junior',
        expectedKeywords: ['scope', 'hoisting', 'block scope', 'function scope', 'reassignment', 'immutable'],
        sampleAnswer: 'var has function scope and is hoisted, let has block scope and is not hoisted, const has block scope and cannot be reassigned.'
      },
      {
        id: 'fe-jr-2',
        question: 'Explain the difference between == and === in JavaScript.',
        type: 'technical',
        category: 'JavaScript Fundamentals',
        difficulty: 'junior',
        expectedKeywords: ['strict equality', 'type coercion', 'comparison', 'type conversion', 'triple equals'],
        sampleAnswer: '== performs type coercion before comparison, while === compares both value and type without conversion.'
      },
      {
        id: 'fe-jr-3',
        question: 'What is the box model in CSS?',
        type: 'technical',
        category: 'CSS Fundamentals',
        difficulty: 'junior',
        expectedKeywords: ['content', 'padding', 'border', 'margin', 'box-sizing', 'width', 'height'],
        sampleAnswer: 'The box model consists of content, padding, border, and margin. It determines how elements are sized and spaced.'
      },
      {
        id: 'fe-jr-4',
        question: 'How do you center a div horizontally and vertically?',
        type: 'technical',
        category: 'CSS Layout',
        difficulty: 'junior',
        expectedKeywords: ['flexbox', 'grid', 'justify-content', 'align-items', 'center', 'margin auto'],
        sampleAnswer: 'You can use flexbox with justify-content: center and align-items: center, or CSS Grid with place-items: center.'
      },
      {
        id: 'fe-jr-5',
        question: 'What are the different data types in JavaScript?',
        type: 'technical',
        category: 'JavaScript Fundamentals',
        difficulty: 'junior',
        expectedKeywords: ['primitive', 'object', 'string', 'number', 'boolean', 'undefined', 'null', 'symbol', 'bigint'],
        sampleAnswer: 'JavaScript has primitive types (string, number, boolean, undefined, null, symbol, bigint) and object types.'
      },
      {
        id: 'fe-jr-6',
        question: 'Why did you choose frontend development as your career path?',
        type: 'behavioral',
        category: 'Career Motivation',
        difficulty: 'junior',
        expectedKeywords: ['user experience', 'visual', 'creative', 'interactive', 'problem solving', 'learning'],
        sampleAnswer: 'I enjoy creating user interfaces and seeing immediate visual results of my code, plus the creative aspect of frontend development.'
      }
    ],
    'mid-level': [
      {
        id: 'fe-mid-1',
        question: 'Explain the concept of closures in JavaScript with an example.',
        type: 'technical',
        category: 'JavaScript Advanced',
        difficulty: 'mid-level',
        expectedKeywords: ['closure', 'lexical scope', 'inner function', 'outer function', 'encapsulation', 'private variables'],
        sampleAnswer: 'A closure is when an inner function has access to variables from its outer function even after the outer function has returned.'
      },
      {
        id: 'fe-mid-2',
        question: 'What is the Virtual DOM and how does it work in React?',
        type: 'technical',
        category: 'React',
        difficulty: 'mid-level',
        expectedKeywords: ['virtual dom', 'reconciliation', 'diffing', 'performance', 'react', 'real dom', 'rendering'],
        sampleAnswer: 'Virtual DOM is a JavaScript representation of the real DOM. React uses it to efficiently update the UI by comparing changes and updating only what changed.'
      },
      {
        id: 'fe-mid-3',
        question: 'Explain the difference between CSS Grid and Flexbox.',
        type: 'technical',
        category: 'CSS Layout',
        difficulty: 'mid-level',
        expectedKeywords: ['grid', 'flexbox', '2d', '1d', 'layout', 'container', 'items', 'axis'],
        sampleAnswer: 'CSS Grid is for 2D layouts (rows and columns), while Flexbox is for 1D layouts (either row or column). Grid is better for complex layouts.'
      },
      {
        id: 'fe-mid-4',
        question: 'How do you optimize website performance?',
        type: 'technical',
        category: 'Performance',
        difficulty: 'mid-level',
        expectedKeywords: ['optimization', 'minification', 'compression', 'caching', 'lazy loading', 'bundling', 'cdn'],
        sampleAnswer: 'Through code splitting, lazy loading, image optimization, minification, compression, caching, and using CDNs.'
      },
      {
        id: 'fe-mid-5',
        question: 'Describe a challenging bug you encountered and how you solved it.',
        type: 'behavioral',
        category: 'Problem Solving',
        difficulty: 'mid-level',
        expectedKeywords: ['debugging', 'problem solving', 'tools', 'systematic', 'root cause', 'solution'],
        sampleAnswer: 'I had a memory leak in a React app. I used dev tools to identify the issue, found event listeners not being cleaned up, and fixed it with proper cleanup in useEffect.'
      }
    ],
    senior: [
      {
        id: 'fe-sr-1',
        question: 'Design a scalable architecture for a large-scale React application.',
        type: 'system-design',
        category: 'Architecture',
        difficulty: 'senior',
        expectedKeywords: ['microservices', 'micro-frontends', 'state management', 'routing', 'bundling', 'testing', 'ci/cd'],
        sampleAnswer: 'I would use micro-frontends with module federation, implement proper state management, set up comprehensive testing, and establish CI/CD pipelines.'
      },
      {
        id: 'fe-sr-2',
        question: 'How would you implement a custom hook for data fetching with caching?',
        type: 'technical',
        category: 'React Advanced',
        difficulty: 'senior',
        expectedKeywords: ['custom hook', 'caching', 'useEffect', 'useState', 'useMemo', 'useCallback', 'stale-while-revalidate'],
        sampleAnswer: 'I would create a custom hook using useState for data state, useEffect for fetching, and implement caching with Map or localStorage.'
      },
      {
        id: 'fe-sr-3',
        question: 'Explain your approach to leading a frontend team and mentoring junior developers.',
        type: 'behavioral',
        category: 'Leadership',
        difficulty: 'senior',
        expectedKeywords: ['leadership', 'mentoring', 'code review', 'best practices', 'team collaboration', 'knowledge sharing'],
        sampleAnswer: 'I focus on code reviews, pair programming, establishing coding standards, and creating a collaborative learning environment.'
      },
      {
        id: 'fe-sr-4',
        question: 'How do you ensure accessibility in your applications?',
        type: 'technical',
        category: 'Accessibility',
        difficulty: 'senior',
        expectedKeywords: ['accessibility', 'a11y', 'wcag', 'screen readers', 'keyboard navigation', 'aria', 'semantic html'],
        sampleAnswer: 'I use semantic HTML, ARIA attributes, ensure keyboard navigation, test with screen readers, and follow WCAG guidelines.'
      }
    ]
  },
  backend: {
    junior: [
      {
        id: 'be-jr-1',
        question: 'What is the difference between SQL and NoSQL databases?',
        type: 'technical',
        category: 'Database',
        difficulty: 'junior',
        expectedKeywords: ['sql', 'nosql', 'relational', 'document', 'acid', 'schema', 'scalability'],
        sampleAnswer: 'SQL databases are relational with fixed schemas, while NoSQL databases are non-relational with flexible schemas.'
      },
      {
        id: 'be-jr-2',
        question: 'Explain what REST API is and its principles.',
        type: 'technical',
        category: 'API Design',
        difficulty: 'junior',
        expectedKeywords: ['rest', 'api', 'http', 'stateless', 'crud', 'resources', 'endpoints'],
        sampleAnswer: 'REST is an architectural style for APIs that uses HTTP methods, is stateless, and treats everything as resources.'
      },
      {
        id: 'be-jr-3',
        question: 'What are HTTP status codes and give examples?',
        type: 'technical',
        category: 'HTTP',
        difficulty: 'junior',
        expectedKeywords: ['status codes', '200', '404', '500', '201', '400', '401', '403'],
        sampleAnswer: '200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Internal Server Error).'
      }
    ],
    'mid-level': [
      {
        id: 'be-mid-1',
        question: 'Explain database indexing and its impact on performance.',
        type: 'technical',
        category: 'Database',
        difficulty: 'mid-level',
        expectedKeywords: ['indexing', 'performance', 'query optimization', 'b-tree', 'clustered', 'non-clustered'],
        sampleAnswer: 'Database indexes improve query performance by creating shortcuts to data, but they slow down writes and consume storage.'
      },
      {
        id: 'be-mid-2',
        question: 'How do you handle authentication and authorization in APIs?',
        type: 'technical',
        category: 'Security',
        difficulty: 'mid-level',
        expectedKeywords: ['authentication', 'authorization', 'jwt', 'oauth', 'rbac', 'session', 'token'],
        sampleAnswer: 'I use JWT tokens for authentication, implement role-based access control for authorization, and secure endpoints with middleware.'
      }
    ],
    senior: [
      {
        id: 'be-sr-1',
        question: 'Design a scalable microservices architecture for an e-commerce platform.',
        type: 'system-design',
        category: 'Architecture',
        difficulty: 'senior',
        expectedKeywords: ['microservices', 'scalability', 'load balancing', 'database sharding', 'message queues', 'caching'],
        sampleAnswer: 'I would separate services by domain (user, product, order), implement API gateways, use message queues for communication, and implement caching strategies.'
      }
    ]
  },
  fullstack: {
    junior: [
      {
        id: 'fs-jr-1',
        question: 'How do you connect a frontend application to a backend API?',
        type: 'technical',
        category: 'Integration',
        difficulty: 'junior',
        expectedKeywords: ['api', 'fetch', 'axios', 'http', 'cors', 'endpoints', 'json'],
        sampleAnswer: 'I use fetch or axios to make HTTP requests to backend endpoints, handle CORS, and parse JSON responses.'
      }
    ],
    'mid-level': [
      {
        id: 'fs-mid-1',
        question: 'Describe the full lifecycle of a web request from frontend to database.',
        type: 'technical',
        category: 'Full Stack',
        difficulty: 'mid-level',
        expectedKeywords: ['http request', 'routing', 'middleware', 'controller', 'database', 'response', 'orm'],
        sampleAnswer: 'Frontend sends HTTP request → Backend routes to controller → Controller processes request → Database query via ORM → Response sent back to frontend.'
      }
    ],
    senior: [
      {
        id: 'fs-sr-1',
        question: 'How would you architect a real-time chat application?',
        type: 'system-design',
        category: 'Real-time Systems',
        difficulty: 'senior',
        expectedKeywords: ['websockets', 'socket.io', 'real-time', 'message queues', 'scaling', 'database', 'redis'],
        sampleAnswer: 'I would use WebSockets for real-time communication, implement message queues for scalability, use Redis for caching, and design a scalable database schema.'
      }
    ]
  },
  'data-science': {
    junior: [
      {
        id: 'ds-jr-1',
        question: 'What is the difference between supervised and unsupervised learning?',
        type: 'technical',
        category: 'Machine Learning',
        difficulty: 'junior',
        expectedKeywords: ['supervised', 'unsupervised', 'labeled data', 'clustering', 'classification', 'regression'],
        sampleAnswer: 'Supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data.'
      }
    ],
    'mid-level': [
      {
        id: 'ds-mid-1',
        question: 'Explain the bias-variance tradeoff in machine learning.',
        type: 'technical',
        category: 'Machine Learning',
        difficulty: 'mid-level',
        expectedKeywords: ['bias', 'variance', 'overfitting', 'underfitting', 'model complexity', 'generalization'],
        sampleAnswer: 'Bias is error from oversimplifying assumptions, variance is error from sensitivity to small fluctuations. High bias leads to underfitting, high variance to overfitting.'
      }
    ],
    senior: [
      {
        id: 'ds-sr-1',
        question: 'How would you design a recommendation system for a streaming platform?',
        type: 'system-design',
        category: 'Recommendation Systems',
        difficulty: 'senior',
        expectedKeywords: ['collaborative filtering', 'content-based', 'hybrid', 'matrix factorization', 'deep learning', 'scalability'],
        sampleAnswer: 'I would use a hybrid approach combining collaborative filtering and content-based methods, implement matrix factorization, and use deep learning for complex patterns.'
      }
    ]
  },
  'product-manager': {
    junior: [
      {
        id: 'pm-jr-1',
        question: 'How do you prioritize features in a product backlog?',
        type: 'behavioral',
        category: 'Product Management',
        difficulty: 'junior',
        expectedKeywords: ['prioritization', 'user value', 'business impact', 'effort', 'roadmap', 'stakeholders'],
        sampleAnswer: 'I prioritize based on user value, business impact, and development effort using frameworks like MoSCoW or RICE.'
      }
    ],
    'mid-level': [
      {
        id: 'pm-mid-1',
        question: 'Describe your process for conducting user research and gathering requirements.',
        type: 'behavioral',
        category: 'User Research',
        difficulty: 'mid-level',
        expectedKeywords: ['user research', 'interviews', 'surveys', 'personas', 'user stories', 'requirements'],
        sampleAnswer: 'I conduct user interviews, create surveys, develop personas, and translate insights into user stories and requirements.'
      }
    ],
    senior: [
      {
        id: 'pm-sr-1',
        question: 'How would you launch a new product in a competitive market?',
        type: 'behavioral',
        category: 'Product Strategy',
        difficulty: 'senior',
        expectedKeywords: ['go-to-market', 'competitive analysis', 'positioning', 'pricing', 'marketing', 'metrics'],
        sampleAnswer: 'I would develop a go-to-market strategy, conduct competitive analysis, define positioning, set pricing, and establish success metrics.'
      }
    ]
  },
  devops: {
    junior: [
      {
        id: 'do-jr-1',
        question: 'What is the difference between continuous integration and continuous deployment?',
        type: 'technical',
        category: 'CI/CD',
        difficulty: 'junior',
        expectedKeywords: ['ci', 'cd', 'automation', 'testing', 'deployment', 'pipeline', 'integration'],
        sampleAnswer: 'CI automatically integrates code changes and runs tests, while CD automatically deploys tested code to production.'
      }
    ],
    'mid-level': [
      {
        id: 'do-mid-1',
        question: 'Explain containerization and its benefits using Docker.',
        type: 'technical',
        category: 'Containerization',
        difficulty: 'mid-level',
        expectedKeywords: ['docker', 'containers', 'isolation', 'portability', 'microservices', 'orchestration'],
        sampleAnswer: 'Containerization packages applications with their dependencies into portable containers, providing isolation and consistency across environments.'
      }
    ],
    senior: [
      {
        id: 'do-sr-1',
        question: 'How would you design a highly available and scalable infrastructure?',
        type: 'system-design',
        category: 'Infrastructure',
        difficulty: 'senior',
        expectedKeywords: ['high availability', 'scalability', 'load balancing', 'redundancy', 'monitoring', 'auto-scaling'],
        sampleAnswer: 'I would implement load balancing, redundancy across multiple zones, auto-scaling, comprehensive monitoring, and disaster recovery procedures.'
      }
    ]
  }
};