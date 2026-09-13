/**
 * DevPilot-AI — Career Roadmap: Full Stack Developer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const fullstackRoadmap = {
  roleId: 'full-stack-developer',
  roadmapId: 'fullstack',
  title: 'Full Stack Developer',
  category: 'development',
  description: 'Connect client interfaces with server systems, databases, authentication, and cloud infrastructure to deliver end-to-end production web applications.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Web architecture, HTML5/CSS3 responsive layouts, JavaScript fundamentals, and Git workflows.',
      skills: [
        {
          id: 'fs-web-foundations',
          title: 'Web Architecture, HTML5 & Responsive CSS',
          category: 'Web Foundations',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: [],
          description: 'Master client-server architecture, semantic HTML5, Flexbox, CSS Grid, mobile-first responsive design, and CSS custom properties.',
          whatToLearn: [
            'Client-Server model: DNS lookup, TCP connections, HTTP request-response cycle',
            'Semantic markup (<header>, <nav>, <main>, <article>, <section>, <form>)',
            'Responsive layout systems: CSS Flexbox (1D) and CSS Grid (2D) layout algorithms',
            'Mobile-first design with media queries, container queries, and fluid clamp() typography',
            'Form elements, validation attributes, and accessibility (WCAG) essentials'
          ],
          whyItMatters: 'Full stack developers must build functional, accessible client interfaces without relying on bloated libraries for basic UI.',
          productionUse: 'Structuring client frontends and administrative portals across web products.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate responsive grid templates; manually test mobile rendering and form inputs.',
          handsOnTask: 'Build a fully responsive marketing landing page with custom CSS Grid and accessible contact forms.',
          projectApplication: 'Provides the visual presentation layer for the Full-Stack Cloud SaaS Application.',
          resources: [
            { title: 'MDN Web Docs: Web Development Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fs-js-ts-core',
          title: 'Modern JavaScript (ES6+) & TypeScript Core',
          category: 'Programming Languages',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fs-web-foundations'],
          description: 'Master asynchronous JavaScript, modern ES6+ features, and end-to-end type safety with TypeScript shared between frontend and backend.',
          whatToLearn: [
            'JavaScript execution model: call stack, event loop, microtasks, and async/await',
            'Functional programming methods: map, filter, reduce, and immutability practices',
            'TypeScript basics: primitives, interfaces, type aliases, union types, and generics',
            'Sharing TypeScript interfaces and validation schemas across client and server'
          ],
          whyItMatters: 'Using TypeScript end-to-end guarantees complete type safety from database models to frontend UI components.',
          productionUse: 'Standard programming language for modern full stack TypeScript (Node.js/Next.js) codebases.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to transform backend DB entities into shared frontend TypeScript models.',
          handsOnTask: 'Build an interactive in-memory data dashboard using TypeScript with strict type checking and zero runtime errors.',
          projectApplication: 'Powers business logic on both client and server across all projects.',
          resources: [
            { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'handbook' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Component-driven frontends with React, backend server architectures with Node.js/Express, and REST APIs.',
      skills: [
        {
          id: 'fs-react-client',
          title: 'React Component Architecture & State Management',
          category: 'Frontend Engineering',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fs-js-ts-core'],
          description: 'Build modern declarative user interfaces with React, functional components, hooks, client routing, and state management.',
          whatToLearn: [
            'Component lifecycles, Virtual DOM reconciliation, JSX syntax, and props passing',
            'Core hooks: useState, useEffect, useRef, useMemo, useCallback, and custom hooks',
            'Client routing with React Router: protected routes, dynamic parameters, and query state',
            'State management: lightweight global stores (Zustand) and server state caching (TanStack Query)'
          ],
          whyItMatters: 'React enables modular, reusable UI engineering and provides the foundation for full-stack frameworks like Next.js.',
          productionUse: 'Constructing interactive user dashboards, analytics views, and customer onboarding flows.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to scaffold component boilerplates and form logic, while auditing state transitions and re-render efficiency.',
          handsOnTask: 'Build an interactive project management board with drag-and-drop cards and state caching.',
          projectApplication: 'Provides the frontend client for the Collaborative Workspace Platform project.',
          resources: [
            { title: 'React Official Docs', url: 'https://react.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fs-backend-apis',
          title: 'Node.js, Express & RESTful API Engineering',
          category: 'Backend Engineering',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['fs-js-ts-core'],
          description: 'Design robust backend servers: HTTP routing, middleware architecture, request validation (Zod), and error handling.',
          whatToLearn: [
            'Express.js server architecture: routing, middleware chains, static file serving',
            'REST API conventions: status codes, HTTP methods, headers, and CORS configuration',
            'Input validation and sanitization using Zod schemas to protect against malicious payloads',
            'Centralized error handling middleware and structured JSON error responses'
          ],
          whyItMatters: 'Full stack engineers must design secure, clean server endpoints that power client interfaces reliably.',
          productionUse: 'Serving client requests, orchestrating business logic, and validating incoming data.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate OpenAPI route documentation and Zod validation schemas.',
          handsOnTask: 'Build a REST API with authentication middleware, comprehensive Zod validation, and structured error responses.',
          projectApplication: 'Provides server endpoints for the Collaborative Workspace application.',
          resources: [
            { title: 'Express.js Documentation', url: 'https://expressjs.com/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Relational databases with PostgreSQL, authentication workflows, full-stack Next.js, and Docker.',
      skills: [
        {
          id: 'fs-databases-prisma',
          title: 'Relational Databases (PostgreSQL) & Prisma ORM',
          category: 'Data Management',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['fs-backend-apis'],
          description: 'Model relational data with PostgreSQL, manage schema migrations with Prisma ORM, write complex queries, and ensure data integrity.',
          whatToLearn: [
            'Relational data modeling: 1-to-1, 1-to-many, and many-to-many relationships',
            'Prisma schema definition, database migrations, seeding, and type-safe query generation',
            'ACID transactions: ensuring atomic multi-table updates without partial failures',
            'Database indexing basics: improving read query performance and preventing N+1 problems'
          ],
          whyItMatters: 'Data persistence is the foundation of any application. An engineer who cannot model data accurately will build broken features.',
          productionUse: 'Storing user accounts, billing records, application state, and audit logs.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft initial database entity relationship diagrams (ERDs) and seed datasets.',
          handsOnTask: 'Model a multi-tenant project workspace database schema with Prisma and write automated migration scripts.',
          projectApplication: 'Provides the persistent database for the Full-Stack Cloud SaaS Application.',
          resources: [
            { title: 'Prisma Documentation', url: 'https://www.prisma.io/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fs-auth-security',
          title: 'Full-Stack Authentication & Session Security',
          category: 'Security',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['fs-databases-prisma'],
          description: 'Implement secure authentication across client and server: password hashing (bcrypt/Argon2), JWTs, HttpOnly cookies, and OAuth2 social login.',
          whatToLearn: [
            'Password security: salting, slow hashing (Argon2 / bcrypt), and brute-force protection',
            'Session authentication via HttpOnly, Secure, SameSite cookies vs JWT access/refresh tokens',
            'OAuth2.0 social authentication with GitHub and Google using NextAuth / Auth.js',
            'Role-Based Access Control (RBAC): protecting frontend routes and backend API endpoints'
          ],
          whyItMatters: 'Security cannot be bolted on as an afterthought. Improper auth implementation leaks customer data and compromises accounts.',
          productionUse: 'Safeguarding enterprise customer portals, payment endpoints, and user data.',
          aiRelevance: 'Low',
          aiWorkflow: 'Always use established libraries like Auth.js or bcrypt; never invent custom encryption or token logic with AI.',
          handsOnTask: 'Build an authentication system with email/password signup, password reset flow, and GitHub OAuth login with secure cookie sessions.',
          projectApplication: 'Secures all user accounts and team permissions in the Collaborative Workspace Platform.',
          resources: [
            { title: 'Auth.js (NextAuth) Documentation', url: 'https://authjs.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fs-nextjs-fullstack',
          title: 'Modern Full-Stack Frameworks: Next.js App Router',
          category: 'Full-Stack Frameworks',
          level: 'Level 3: Intermediate',
          order: 7,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fs-react-client', 'fs-databases-prisma', 'fs-auth-security'],
          description: 'Master unified full-stack architecture with Next.js: Server Components, Server Actions, route handlers, streaming UI, and SEO optimization.',
          whatToLearn: [
            'Next.js App Router architecture: layouts, pages, loading states, and error boundaries',
            'React Server Components (RSC) vs Client Components: rendering boundaries and performance',
            'Server Actions for handling form submissions and mutations directly on the server',
            'Route Handlers for building public API endpoints and handling webhooks',
            'Optimistic UI updates, caching strategies, and revalidation (revalidatePath, revalidateTag)'
          ],
          whyItMatters: 'Next.js represents modern full-stack development, merging frontend speed with backend data fetching in a single codebase.',
          productionUse: 'Building production SaaS platforms, e-commerce applications, and high-performance portals.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate Server Actions and form handling hooks; verify that secrets stay on the server.',
          handsOnTask: 'Build a full-stack content publishing platform with Next.js App Router, Server Actions, and dynamic tag revalidation.',
          projectApplication: 'Core framework for the Full-Stack Cloud SaaS Application.',
          resources: [
            { title: 'Next.js Documentation', url: 'https://nextjs.org/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'End-to-end testing, Docker containerization, WebSockets, and CI/CD pipelines.',
      skills: [
        {
          id: 'fs-testing-e2e',
          title: 'Full-Stack Automated Testing (Vitest & Playwright)',
          category: 'Testing & Quality',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fs-nextjs-fullstack'],
          description: 'Implement testing across the entire stack: unit tests for business logic with Vitest, API testing with Supertest, and E2E browser tests with Playwright.',
          whatToLearn: [
            'Testing pyramid: balancing unit, integration, and end-to-end tests for maximum ROI',
            'Unit testing domain functions and utilities with Vitest',
            'API integration testing against real test databases',
            'End-to-End browser testing with Playwright: user flows, assertions, and screenshot comparisons',
            'Running automated test suites inside CI pipelines before deployments'
          ],
          whyItMatters: 'Full stack applications have many integration failure points. End-to-end tests guarantee critical user flows never break.',
          productionUse: 'Preventing regressions during rapid multi-deployment release cycles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate comprehensive test matrices and test user scenarios.',
          handsOnTask: 'Write a Playwright test suite that verifies user registration, login, data creation, and logout in an automated headless browser.',
          projectApplication: 'Integrated into all project CI/CD verification gates.',
          resources: [
            { title: 'Playwright Documentation', url: 'https://playwright.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fs-websockets-realtime',
          title: 'Real-Time Communication with WebSockets',
          category: 'Real-Time Systems',
          level: 'Level 4: Advanced',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Essential',
          estimatedTime: '2 weeks',
          prerequisites: ['fs-nextjs-fullstack'],
          description: 'Enable real-time, bi-directional client-server communication using Socket.io / WebSockets, room management, and Redis Pub/Sub for horizontal scaling.',
          whatToLearn: [
            'WebSocket protocol (ws://, wss://) vs HTTP polling and Server-Sent Events (SSE)',
            'Socket.io architecture: connection handling, rooms, broadcasting, and reconnections',
            'Synchronizing collaborative state across multiple concurrent users',
            'Scaling WebSockets horizontally across multiple server nodes using Redis Pub/Sub'
          ],
          whyItMatters: 'Modern applications require real-time updates for collaborative tools, notifications, chat, and live dashboards.',
          productionUse: 'Collaborative workspaces (Figma, Notion), live chat, and notification dispatchers.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft event protocol schemas and message payloads for real-time events.',
          handsOnTask: 'Build a real-time collaborative whiteboarding or document editor with active presence indicators and instant synchronization.',
          projectApplication: 'Enables live collaboration in the Collaborative Workspace Platform project.',
          resources: [
            { title: 'Socket.io Documentation', url: 'https://socket.io/docs/v4/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Cloud deployment, system architecture, interview preparation, and technical portfolio.',
      skills: [
        {
          id: 'fs-cloud-deploy',
          title: 'Cloud Deployment, CI/CD & Production DevOps',
          category: 'DevOps & Cloud',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fs-testing-e2e'],
          description: 'Deploy full-stack applications to cloud platforms (Vercel, AWS, Railway), configure PostgreSQL databases, setup GitHub Actions CI/CD, and manage domain DNS.',
          whatToLearn: [
            'Deploying Next.js to Vercel and Node backends to containerized cloud platforms (AWS ECS / Railway)',
            'Provisioning managed PostgreSQL instances with automated backups and connection pooling (PgBouncer)',
            'Automated GitHub Actions workflows for continuous integration and automated production deployment',
            'Production environment variable and secrets management across staging and production environments'
          ],
          whyItMatters: 'A full stack developer must own the deployment lifecycle from local code to live global production.',
          productionUse: 'Delivering commercial SaaS applications with high availability and automated updates.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate GitHub Actions pipeline YAML and troubleshoot build deployment errors.',
          handsOnTask: 'Set up an automated CI/CD pipeline that tests, builds, and deploys a full-stack Next.js app to production on every push to main.',
          projectApplication: 'Deploys the Capstone Cloud SaaS Application to live production.',
          resources: [
            { title: 'Vercel Deployment Guide', url: 'https://vercel.com/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fs-interview-portfolio',
          title: 'Full Stack Engineering Portfolio, Interviews & Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 11,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['fs-cloud-deploy'],
          description: 'Package full-stack projects into an engineering portfolio, write ATS-optimized resume bullet points, and prepare for system design and live full-stack coding rounds.',
          whatToLearn: [
            'Crafting resume bullets that demonstrate end-to-end ownership: frontend metrics, backend performance, database optimizations',
            'Full Stack System Design interview preparation: designing scalable end-to-end architectures under 45-minute constraints',
            'Live pair programming best practices: communicating trade-offs between client-side and server-side computations',
            'Polishing GitHub repositories with clear architecture diagrams, setup scripts, and live production URLs'
          ],
          whyItMatters: 'Communicating full-stack engineering decisions clearly is essential to passing senior engineering interview panels.',
          productionUse: 'Interviewing and hiring evaluations for engineering roles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to conduct mock full-stack system design interviews and critique architecture answers.',
          handsOnTask: 'Document your full-stack capstone project with an end-to-end architecture diagram, data schema diagram, and live production deployment link.',
          projectApplication: 'Presents your complete engineering body of work to recruiters and hiring teams.',
          resources: [
            { title: 'Full Stack Interview Prep Guide', url: 'https://www.techinterviewhandbook.org/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'fs-proj-1',
      title: 'Responsive Multi-User Task & Notes Manager',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build an interactive full-stack task and notes application with React, Express, PostgreSQL, and JWT authentication.',
      technologies: ['React', 'TypeScript', 'Node.js / Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      skillsPracticed: ['Client-server integration', 'CRUD endpoints', 'JWT auth', 'Database migrations', 'Responsive UI'],
      requirements: [
        'User registration and login with encrypted passwords and JWT tokens',
        'Interactive dashboard for creating, editing, categorizing, and deleting tasks',
        'Filtering tasks by status, priority, and search terms',
        'Prisma schema modeling users, tasks, and tags with relational constraints'
      ],
      deliverables: [
        'Live deployed frontend and backend on cloud hosting',
        'GitHub repository with clear documentation and database seed script',
        'Responsive layout functioning smoothly on mobile and desktop'
      ],
      productionExpectations: [
        'Protected API routes with middleware authentication checks',
        'Strict schema validation using Zod on both client and server'
      ],
      aiIntegration: 'Use AI to generate mock user datasets and test edge cases.'
    },
    {
      id: 'fs-proj-2',
      title: 'Real-Time Collaborative Workspace Platform',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Develop a real-time collaborative workspace with Next.js, WebSockets, PostgreSQL, and team permissions.',
      technologies: ['Next.js 14', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Vitest'],
      skillsPracticed: ['Real-time WebSockets', 'Team permissions (RBAC)', 'Server Actions', 'Optimistic UI', 'Integration testing'],
      requirements: [
        'Multi-tenant workspace architecture where users can invite team members',
        'Real-time collaborative document editing or board updates via WebSockets',
        'Live user presence indicator showing who is currently viewing or editing',
        'Role-Based Access Control: Workspace Owner, Editor, and Viewer permissions'
      ],
      deliverables: [
        'Live deployed application with live multi-user demonstration',
        'Vitest integration tests covering permission guards and API endpoints',
        'Architecture documentation explaining WebSocket connection lifecycle'
      ],
      productionExpectations: [
        'Sub-100ms real-time update propagation between connected clients',
        'Graceful reconnection handling when internet connection drops'
      ],
      aiIntegration: 'Use AI to simulate multiple concurrent WebSocket clients for stress testing.'
    },
    {
      id: 'fs-proj-3',
      title: 'Full-Stack Cloud SaaS Application with Billing & CI/CD',
      difficulty: 'Production',
      estimatedTime: '6 weeks',
      objective: 'Architect a production-grade SaaS platform featuring Next.js App Router, Stripe subscription billing, PostgreSQL, Playwright E2E tests, and automated GitHub Actions CI/CD.',
      technologies: ['Next.js 14 (App Router)', 'TypeScript', 'PostgreSQL (Neon/Supabase)', 'Prisma', 'Stripe API', 'Playwright', 'GitHub Actions'],
      skillsPracticed: ['Subscription billing', 'Webhook handling', 'E2E testing', 'Cloud deployment', 'CI/CD pipeline'],
      requirements: [
        'Subscription pricing plans integrated with Stripe Checkout and customer billing portal',
        'Secure Stripe webhook listener verifying signatures and updating user subscription status',
        'Full customer dashboard with analytics, data export, and account settings',
        'Automated GitHub Actions pipeline running linting, type checks, and Playwright tests',
        'Optimized for Core Web Vitals with server-side rendering and streaming'
      ],
      deliverables: [
        'Live production SaaS deployment with custom domain and SSL',
        'Comprehensive GitHub repository with passing CI/CD badges and test coverage',
        'Detailed system architecture diagram documenting data flows and external integrations'
      ],
      productionExpectations: [
        'Complete test coverage for billing webhook workflows and edge cases',
        'Zero security vulnerabilities across client and server packages'
      ],
      aiIntegration: 'Implement an AI-powered assistant feature within the SaaS product (e.g., text summarization or smart insights).'
    }
  ],
  checklist: {
    technicalSkills: [
      'Semantic HTML5, modern CSS3, Flexbox, and CSS Grid layout systems',
      'Modern JavaScript ES6+ and strict TypeScript across frontend and backend',
      'React component architecture, custom hooks, and state management',
      'Node.js and Express.js RESTful API design with Zod validation',
      'Relational database modeling with PostgreSQL and Prisma ORM',
      'Authentication: password hashing, JWTs, HttpOnly cookies, and OAuth2',
      'Next.js App Router, React Server Components, and Server Actions',
      'Real-time communication using WebSockets and event broadcasting',
      'Automated testing: unit tests with Vitest and E2E with Playwright',
      'Cloud deployment (Vercel, AWS, Railway) and GitHub Actions CI/CD'
    ],
    projects: [
      'Responsive full-stack task manager with auth and database CRUD',
      'Real-time collaborative workspace with WebSockets and team permissions',
      'Production SaaS application with Stripe subscription billing and CI/CD',
      'All projects deployed live with clean public GitHub repositories'
    ],
    csFundamentals: [
      'Client-server architecture, HTTP/HTTPS protocols, and status codes',
      'Core data structures: Hash Maps, Trees, Arrays, Queues, Stacks',
      'Relational database concepts: primary keys, foreign keys, normalization, indexing',
      'Basic system scalability: caching, load balancing, and database connection pooling'
    ],
    tools: [
      'Git version control and GitHub collaborative pull request workflows',
      'Chrome DevTools (Console, Network waterfall, Application storage)',
      'Database GUI tools: Prisma Studio, TablePlus, or DBeaver',
      'API testing tools: Postman and curl'
    ],
    deployment: [
      'Deploying frontend and full-stack Next.js apps to Vercel or cloud hosts',
      'Provisioning cloud PostgreSQL databases with automated backups',
      'Setting up automated GitHub Actions pipelines for linting, testing, and deployment',
      'Managing production environment secrets and domain DNS records'
    ],
    portfolio: [
      'Personal portfolio website demonstrating end-to-end engineering projects',
      'Detailed project case studies highlighting technical architecture and challenges',
      'Live clickable links to working production deployments and demo accounts',
      'Clean responsive design with mobile optimization and dark mode'
    ],
    github: [
      'Well-maintained GitHub profile with pinned highlight projects',
      'Comprehensive READMEs with architecture diagrams and local setup steps',
      'Consistent commit history following Conventional Commits format',
      'Demonstrated code quality with visible test coverage and CI badges'
    ],
    resume: [
      'Clean single-page ATS-compliant full stack developer resume',
      'Impact-driven bullet points showcasing end-to-end feature ownership',
      'Targeted technical keywords matching modern full stack job listings',
      'Direct links to GitHub, live production projects, and LinkedIn'
    ],
    interviewReadiness: [
      'Ability to explain full-stack architecture trade-offs during system design interviews',
      'Confidence in live coding rounds involving data structures, algorithms, and APIs',
      'Clear articulation of authentication, database modeling, and caching mechanics',
      'Structured behavioral interview answers using the STAR method'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['fullstack'] = fullstackRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = fullstackRoadmap;
}
