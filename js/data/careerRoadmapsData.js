/**
 * DevPilot-AI — Career Roadmaps Dataset
 * Comprehensive, dependency-ordered learning roadmaps for 20 career roles.
 * Structured across 5 standardized career progression levels:
 * Level 1: Foundation
 * Level 2: Core
 * Level 3: Intermediate
 * Level 4: Advanced
 * Level 5: Job Ready
 */

const careerRoadmaps = {
  // =========================================================================
  // 1. FRONTEND DEVELOPER
  // =========================================================================
  'frontend': {
    roleId: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Master client-side engineering from semantic web fundamentals to high-performance React architectures and production deployment.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Core web architecture, markup, styling, and version control foundations.',
        skills: [
          {
            id: 'fe-html',
            title: 'HTML5 & Semantic Markup',
            category: 'Web Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '1-2 weeks',
            importance: 'essential',
            technologies: ['HTML5', 'Semantic Tags', 'Forms & Inputs', 'SEO Meta'],
            whatToLearn: [
              'Semantic page layout (<header>, <main>, <nav>, <article>, <section>)',
              'Accessible forms, validation attributes, and input types',
              'Document Object Model (DOM) tree representation',
              'Open Graph, meta tags, and technical SEO structure'
            ],
            whyItMatters: 'Semantic HTML is the backbone of search engine indexing, accessibility screen readers, and fast DOM parsing.',
            aiRelevance: 'AI code generators produce semantic HTML quickly; understanding structure helps you audit accessibility and eliminate tag soup.',
            resources: [],
            practice: 'Build a multi-page semantic product brochure with accessible contact and survey forms.'
          },
          {
            id: 'fe-css',
            title: 'Modern CSS3, Flexbox & Grid',
            category: 'Web Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: ['fe-html'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['CSS3', 'Flexbox', 'CSS Grid', 'Custom Properties (Variables)'],
            whatToLearn: [
              'Box model (content, padding, border, margin, box-sizing)',
              '1D layout mastery with Flexbox (axes, alignment, wrapping)',
              '2D layout systems with CSS Grid (template areas, auto-fit, minmax)',
              'CSS custom properties for reusable design tokens and dark mode'
            ],
            whyItMatters: 'Layout bugs and broken alignments immediately undermine user trust. Flexbox and Grid form the core of all modern web UI.',
            aiRelevance: 'AI tools can generate layout classes, but debugging responsive edge cases and fluid typography requires direct CSS intuition.',
            resources: [],
            practice: 'Code a complex responsive dashboard layout combining sidebar grid and fluid flex cards without frameworks.'
          },
          {
            id: 'fe-responsive',
            title: 'Responsive Design & Mobile-First UX',
            category: 'Web Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: ['fe-css'],
            estimatedTime: '1-2 weeks',
            importance: 'essential',
            technologies: ['Media Queries', 'Fluid Typography (clamp)', 'Responsive Images (srcset)', 'Viewport Units'],
            whatToLearn: [
              'Mobile-first layout strategies using min-width media queries',
              'Fluid clamp() scaling for font sizes and margins',
              'Responsive imagery (<picture>, srcset, sizes, WebP/AVIF)',
              'Touch targets, hover vs pointer interactions'
            ],
            whyItMatters: 'Over 60% of web traffic originates on mobile devices. A non-responsive layout is functionally broken for most users.',
            aiRelevance: 'Use AI prompts to test CSS breakpoint matrix edge cases and cross-browser quirks.',
            resources: [],
            practice: 'Transform a complex desktop e-commerce page into a seamless mobile drawer and touch experience.'
          },
          {
            id: 'fe-git',
            title: 'Git & GitHub Version Control',
            category: 'Developer Tools',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '1 week',
            importance: 'essential',
            technologies: ['Git', 'GitHub', 'CLI', 'Branching'],
            whatToLearn: [
              'Branching strategies (feature branches, git pull, merge, rebase)',
              'Conflict resolution and clean atomic commit messages',
              'GitHub Pull Requests, code reviews, and remote syncing',
              '.gitignore conventions and SSH authentication'
            ],
            whyItMatters: 'Every software engineering team depends on Git for distributed collaboration, code review, and version history.',
            aiRelevance: 'AI tools in IDEs (like GitHub Copilot) integrate with Git commits and PR summaries, but merge conflict resolution requires human scrutiny.',
            resources: [],
            practice: 'Create a GitHub repo, submit 3 feature branches via pull requests, and resolve a simulated merge conflict.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'JavaScript fundamentals, DOM manipulation, asynchronous programming, and developer tooling.',
        skills: [
          {
            id: 'fe-js-core',
            title: 'JavaScript Fundamentals & ES6+',
            category: 'JavaScript',
            level: 'beginner',
            levelNum: 2,
            prerequisites: ['fe-html', 'fe-css'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['JavaScript', 'ES6+', 'Destructuring', 'Closures', 'Prototypes'],
            whatToLearn: [
              'Data types, scoping (let, const, var), hoisting, and execution context',
              'First-class functions, arrow functions, and higher-order array methods (map, filter, reduce)',
              'ES6+ features (destructuring, spread/rest, optional chaining, nullish coalescing)',
              'Closures, lexical scoping, and memory references'
            ],
            whyItMatters: 'JavaScript powers 100% of modern client-side web application behavior. Weak fundamentals make learning frameworks painful.',
            aiRelevance: 'AI assistants write JS quickly; deep knowledge of closures and references prevents subtle memory leaks and state bugs.',
            resources: [],
            practice: 'Build an interactive in-memory data store with custom filtering, sorting, and pagination functions.'
          },
          {
            id: 'fe-dom',
            title: 'DOM Manipulation & Event Architecture',
            category: 'JavaScript',
            level: 'beginner',
            levelNum: 2,
            prerequisites: ['fe-js-core'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['DOM API', 'Event Bubbling', 'Event Delegation', 'Web Storage'],
            whatToLearn: [
              'Selecting, mutating, and creating DOM elements efficiently',
              'Event listener lifecycle, bubbling, capturing, and delegation',
              'Form submission handling and synthetic preventDefault() flows',
              'Client storage APIs (localStorage, sessionStorage, cookies)'
            ],
            whyItMatters: 'Frameworks like React abstract the DOM, but understanding the real browser event loop and rendering pipeline is critical for debugging.',
            aiRelevance: 'AI assists in translating design interactions into clean event-driven code.',
            resources: [],
            practice: 'Build a multi-column Kanban board with drag-and-drop cards and persistent localStorage.'
          },
          {
            id: 'fe-async',
            title: 'Async JavaScript, Promises & Fetch API',
            category: 'JavaScript',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['fe-js-core'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Promises', 'async/await', 'Fetch API', 'Event Loop', 'Microtasks'],
            whatToLearn: [
              'The JavaScript Event Loop, call stack, macrotasks, and microtasks',
              'Creating, chaining, and error-handling Promises with Promise.all and Promise.allSettled',
              'async/await patterns and try/catch error boundaries',
              'Consuming REST APIs via native fetch(), handling HTTP status codes, and AbortController'
            ],
            whyItMatters: 'Every modern app communicates asynchronously with backend microservices, authentication servers, and AI endpoints.',
            aiRelevance: 'AI streaming responses (Server-Sent Events / ReadableStream) rely directly on advanced asynchronous JavaScript.',
            resources: [],
            practice: 'Build an API explorer that fetches paginated data, displays loading skeletons, and handles network timeouts cleanly.'
          },
          {
            id: 'fe-devtools',
            title: 'Browser DevTools & Package Managers',
            category: 'Developer Tools',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['fe-git', 'fe-async'],
            estimatedTime: '1 week',
            importance: 'essential',
            technologies: ['Chrome DevTools', 'npm', 'Vite', 'Network Tab', 'Console'],
            whatToLearn: [
              'Debugging JavaScript with breakpoints, call stacks, and watch expressions',
              'Inspecting network requests, payloads, headers, and waterfall timings',
              'npm/yarn/pnpm package management, package.json dependencies, and scripts',
              'Modern bundling with Vite / ES modules'
            ],
            whyItMatters: 'DevTools proficiency cuts debugging time by 80% when diagnosing state bugs, slow assets, and failed requests.',
            aiRelevance: 'AI helps explain cryptic DevTools error stack traces and network CORS rejections.',
            resources: [],
            practice: 'Set up a clean modern Vite development environment and debug an intentional memory leak in DevTools.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Modern component frameworks (React), TypeScript, client routing, and state architecture.',
        skills: [
          {
            id: 'fe-react',
            title: 'React Fundamentals & Component Architecture',
            category: 'Frontend Framework',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fe-async', 'fe-devtools'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['React', 'JSX', 'Components', 'Props', 'Virtual DOM'],
            whatToLearn: [
              'Component thinking: declarative vs imperative UI',
              'JSX rules, fragments, and conditional rendering',
              'Props validation, composition over inheritance, and children props',
              'The Virtual DOM diffing algorithm and key reconciliation'
            ],
            whyItMatters: 'React is the industry standard for production web applications across enterprise and startups worldwide.',
            aiRelevance: 'AI code tools generate repetitive component scaffolding, freeing you to focus on state boundaries and hierarchy.',
            resources: [],
            practice: 'Build a modular component library containing buttons, modal dialogs, and form inputs.'
          },
          {
            id: 'fe-react-hooks',
            title: 'React Hooks & State Management',
            category: 'Frontend Framework',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fe-react'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'Context API', 'Zustand'],
            whatToLearn: [
              'Core hooks: useState for local state and useEffect for lifecycle/side-effects',
              'Referential equality and performance hooks (useMemo, useCallback, useRef)',
              'Rules of hooks and custom hook extraction for reusable logic',
              'Global state strategies: React Context vs lightweight stores (Zustand)'
            ],
            whyItMatters: 'Mastering hooks prevents infinite re-render loops, stale closures, and chaotic prop drilling.',
            aiRelevance: 'AI frequently makes subtle dependency array mistakes in useEffect; you must know the rules to catch them.',
            resources: [],
            practice: 'Build a full shopping cart with custom hooks for currency formatting, local storage syncing, and cart state.'
          },
          {
            id: 'fe-typescript',
            title: 'TypeScript for Frontend Development',
            category: 'TypeScript',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fe-react'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['TypeScript', 'Interfaces', 'Generics', 'React Types', 'tsconfig'],
            whatToLearn: [
              'Primitive types, type inference, union types, and type narrowing',
              'Interfaces vs Type aliases, optional properties, and readonly modifiers',
              'Typing React props, events (React.MouseEvent), hooks, and API responses',
              'Generics for reusable UI components and API fetch wrappers'
            ],
            whyItMatters: 'TypeScript catches over 15% of production bugs at compile time and provides autocomplete across large codebases.',
            aiRelevance: 'AI assistants write significantly better, hallucination-free code when provided strict TypeScript interfaces.',
            resources: [],
            practice: 'Migrate a vanilla JavaScript React dashboard to 100% strict TypeScript with zero `any` types.'
          },
          {
            id: 'fe-routing',
            title: 'Client Routing & Modern Next.js',
            category: 'Frontend Framework',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fe-typescript', 'fe-react-hooks'],
            estimatedTime: '2-3 weeks',
            importance: 'recommended',
            technologies: ['Next.js App Router', 'React Router', 'Dynamic Routes', 'Server Components'],
            whatToLearn: [
              'Single Page App routing concepts, dynamic route parameters, and URL query state',
              'Next.js App Router fundamentals: layouts, pages, loading states, and error boundaries',
              'React Server Components (RSC) vs Client Components ("use client")',
              'Metadata API and server-side pre-rendering (SSR/SSG)'
            ],
            whyItMatters: 'Next.js represents the production standard for full-featured, SEO-friendly React web applications.',
            aiRelevance: 'AI handles Next.js boilerplate routing, but you must know when to keep a component on the server for security and bundle size.',
            resources: [],
            practice: 'Build a multi-page documentation website with dynamic route segments and dark mode state in Next.js.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Production testing, web performance, accessibility, security, and streaming AI integration.',
        skills: [
          {
            id: 'fe-testing',
            title: 'Frontend Testing: Unit, Component & E2E',
            category: 'Testing',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fe-typescript'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['Vitest', 'React Testing Library', 'Playwright', 'Mock Service Worker (MSW)'],
            whatToLearn: [
              'Unit testing pure functions and utilities with Vitest/Jest',
              'Component integration testing with React Testing Library (queries by role/text)',
              'API mocking with Mock Service Worker (MSW) for resilient test suites',
              'End-to-End (E2E) browser automation and user flows with Playwright'
            ],
            whyItMatters: 'Untested code fails in production. Companies evaluate testing rigour heavily in senior candidate interviews.',
            aiRelevance: 'AI can generate test scenarios quickly; your job is ensuring tests assert user behavior rather than implementation details.',
            resources: [],
            practice: 'Write a comprehensive test suite with 80%+ coverage for a multi-step checkout form.'
          },
          {
            id: 'fe-performance',
            title: 'Web Performance & Core Web Vitals',
            category: 'Performance',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fe-routing'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Lighthouse', 'Core Web Vitals', 'LCP', 'CLS', 'INP', 'Code Splitting'],
            whatToLearn: [
              'The 3 Core Web Vitals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), Interaction to Next Paint (INP)',
              'Code splitting and lazy loading components with React.lazy and dynamic imports',
              'Asset optimization: image modern formats (AVIF/WebP), font subsetting, and bundle analysis',
              'Memoization boundaries and eliminating wasteful re-renders'
            ],
            whyItMatters: 'A 1-second delay in page load time reduces conversions by 7%. Google directly ranks sites based on Core Web Vitals.',
            aiRelevance: 'AI can analyze bundle reports and suggest code-splitting points.',
            resources: [],
            practice: 'Audit a bloated web app in Lighthouse, optimize its bundle, and boost its performance score from <50 to 95+.'
          },
          {
            id: 'fe-security',
            title: 'Frontend Web Security & Accessibility (a11y)',
            category: 'Security',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fe-dom'],
            estimatedTime: '1-2 weeks',
            importance: 'essential',
            technologies: ['XSS Prevention', 'CSRF', 'Content Security Policy (CSP)', 'WCAG 2.1 AA', 'ARIA'],
            whatToLearn: [
              'Cross-Site Scripting (XSS) attack vectors and safe sanitization (DOMPurify)',
              'Content Security Policy (CSP) headers and secure iframe sandboxing',
              'WCAG 2.1 AA guidelines: color contrast ratios, focus visible rings, and screen reader testing',
              'ARIA roles, states, and keyboard navigation trap management in dialogs'
            ],
            whyItMatters: 'Accessibility is legally mandated in many regions, and security vulnerabilities leak user credentials and data.',
            aiRelevance: 'AI security scanners flag insecure innerHTML injections and missing ARIA attributes.',
            resources: [],
            practice: 'Build a fully accessible, WCAG-compliant custom modal and tabs component supporting screen readers and full keyboard nav.'
          },
          {
            id: 'fe-ai-integration',
            title: 'AI UI Integration & Streaming Interfaces',
            category: 'AI Integration',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fe-async', 'fe-react-hooks'],
            estimatedTime: '2 weeks',
            importance: 'recommended',
            technologies: ['Server-Sent Events (SSE)', 'ReadableStream', 'Vercel AI SDK', 'Markdown Parsing', 'Optimistic UI'],
            whatToLearn: [
              'Consuming streamed tokens via Fetch API ReadableStream and Server-Sent Events',
              'Building real-time conversational chat interfaces with auto-scroll and markdown rendering',
              'Optimistic UI updates, cancellation tokens, and retry handling for AI endpoints',
              'Responsible AI UX: loading states, citation chips, and confidence indicators'
            ],
            whyItMatters: 'Every modern software company is integrating conversational assistants, copilot bars, and smart generative features.',
            aiRelevance: 'Directly powers modern AI application frontends like ChatGPT, Claude, and DevPilot AI.',
            resources: [],
            practice: 'Build a streaming AI code explainer UI with live syntax highlighting and token stop controls.'
          },
          {
            id: 'fe-deployment',
            title: 'CI/CD & Cloud Edge Deployment',
            category: 'Deployment',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fe-git'],
            estimatedTime: '1 week',
            importance: 'essential',
            technologies: ['Vercel', 'Netlify', 'GitHub Actions', 'Docker Basics', 'Custom Domains'],
            whatToLearn: [
              'Automating build and lint checks using GitHub Actions workflows',
              'Zero-config edge deployments with Vercel and Netlify',
              'Environment variables management (.env.local vs production secrets)',
              'Cache-Control headers, CDN edge caching, and custom domain SSL setup'
            ],
            whyItMatters: 'A frontend engineer must know how code transitions from a Git commit to a global CDN edge server.',
            aiRelevance: 'AI can write GitHub Actions CI YAML configurations effortlessly.',
            resources: [],
            practice: 'Configure a GitHub Actions pipeline that lints, tests, and deploys a Next.js app on every merge to main.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Progressive portfolio projects, system design, and career launch checklist.',
        skills: [
          {
            id: 'fe-proj-beginner',
            title: 'Beginner Milestone: Responsive Interactive Dashboard',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['fe-responsive', 'fe-dom'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage'],
            whatToLearn: [
              'Synthesizing DOM events, local persistence, and responsive CSS into a complete product',
              'Creating theme toggle (dark/light) without page flickers',
              'Structuring clean vanilla JavaScript modules'
            ],
            whyItMatters: 'Proves you understand fundamental web mechanics without hiding behind framework abstractions.',
            aiRelevance: 'Use AI to generate mock data structures and edge case testing ideas.',
            resources: [],
            practice: 'Deploy a live productivity dashboard with tasks, time tracking, and analytics charts.'
          },
          {
            id: 'fe-proj-intermediate',
            title: 'Intermediate Milestone: Modern React SaaS Workspace',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['fe-react-hooks', 'fe-typescript'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Zustand'],
            whatToLearn: [
              'Real-world state management across multiple nested views',
              'Consuming complex external third-party APIs with caching and error toasts',
              'Strict TypeScript typing across components and network models'
            ],
            whyItMatters: 'Demonstrates to employers that you can build enterprise-quality single-page applications independently.',
            aiRelevance: 'Leverage AI for rapid component drafting while maintaining strict TypeScript typing.',
            resources: [],
            practice: 'Build a project management workspace with drag-and-drop boards, member assignments, and live search.'
          },
          {
            id: 'fe-proj-production',
            title: 'Job-Ready Milestone: Full Production Next.js & AI Copilot Platform',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['fe-routing', 'fe-testing', 'fe-ai-integration', 'fe-performance'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'AI Streaming', 'Playwright', 'Vercel'],
            whatToLearn: [
              'Full-stack frontend architecture with server actions and client interactivity',
              'Streaming AI assistance directly into user workflows',
              'Automated end-to-end testing and performance score above 90 on Lighthouse',
              'Production deployment with preview environments and custom domain'
            ],
            whyItMatters: 'This capstone project is the flagship piece of your portfolio that lands technical recruiter interviews.',
            aiRelevance: 'Embeds real streaming LLM interactions directly into a practical developer workflow.',
            resources: [],
            practice: 'Build and deploy an AI-powered code snippet and prompt management workspace with live collaboration and streaming explanation.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'fe-p1',
        title: 'Responsive Productivity Dashboard',
        type: 'Beginner',
        description: 'A modular, responsive developer productivity cockpit built with semantic HTML, fluid CSS Grid/Flexbox, and vanilla JavaScript.',
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage'],
        deliverables: [
          'Fluid mobile-first layout (no horizontal scroll)',
          'Dark/light theme toggle with persistent preference',
          'Interactive task checklist with localStorage sync',
          'Modular code split into clean ES modules'
        ]
      },
      {
        id: 'fe-p2',
        title: 'Collaborative Kanban Workspace',
        type: 'Intermediate',
        description: 'A full-featured project management board in React and TypeScript with column workflows, tag filtering, and API integrations.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'REST APIs'],
        deliverables: [
          'Strict TypeScript interfaces with 0 any types',
          'Drag-and-drop card interaction across workflow columns',
          'Search query filter and multi-tag filtering',
          'Optimistic UI state updates with rollback on failure'
        ]
      },
      {
        id: 'fe-p3',
        title: 'AI Code Assistant & Documentation Studio',
        type: 'Production / Job-Ready',
        description: 'A production Next.js application featuring streaming AI code generation, syntax highlighting, comprehensive Vitest/Playwright tests, and 95+ Lighthouse score.',
        technologies: ['Next.js App Router', 'TypeScript', 'Streaming AI', 'Playwright', 'Tailwind CSS', 'Vercel'],
        deliverables: [
          'Streaming token response with live markdown code parsing',
          'Full E2E Playwright test suite running in GitHub Actions CI',
          'Lighthouse Core Web Vitals score > 90',
          'Deployed on Vercel with automated preview branches'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'fe-c1', label: 'Semantic HTML5, Accessible forms, and clean DOM hierarchy', checked: false },
        { id: 'fe-c2', label: 'CSS Flexbox, CSS Grid, and responsive clamp() layouts', checked: false },
        { id: 'fe-c3', label: 'JavaScript ES6+ mastery (Closures, Promises, Event Loop, Async/Await)', checked: false },
        { id: 'fe-c4', label: 'React architecture (Hooks, Context, component composition, state isolation)', checked: false },
        { id: 'fe-c5', label: 'TypeScript proficiency with strict typing across components and APIs', checked: false },
        { id: 'fe-c6', label: 'Testing with Vitest/React Testing Library and Playwright E2E', checked: false },
        { id: 'fe-c7', label: 'Performance optimization (Core Web Vitals LCP, CLS, INP, code splitting)', checked: false },
        { id: 'fe-c8', label: 'Streaming AI UI integration and responsive design', checked: false }
      ],
      projects: [
        { id: 'fe-cp1', label: '1 Beginner project showcasing fundamental DOM & CSS mastery', checked: false },
        { id: 'fe-cp2', label: '1 Intermediate TypeScript React single-page application', checked: false },
        { id: 'fe-cp3', label: '1 Production-grade Next.js application deployed live with CI/CD', checked: false }
      ],
      csFundamentals: [
        { id: 'fe-cs1', label: 'HTTP protocols (Headers, status codes, CORS, caching, cookies)', checked: false },
        { id: 'fe-cs2', label: 'Browser rendering pipeline (Parsing, DOM/CSSOM, Layout, Paint, Composite)', checked: false },
        { id: 'fe-cs3', label: 'Basic Data Structures (Arrays, Objects, Maps, Sets, Stacks, Queues)', checked: false, link: 'dsa.html' }
      ],
      career: [
        { id: 'fe-car1', label: 'Tailor resume for Frontend Engineer roles in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'fe-car2', label: 'Audit GitHub portfolio and commit consistency in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'fe-car3', label: 'Practice core frontend coding interview patterns in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // 2. BACKEND DEVELOPER
  // =========================================================================
  'backend': {
    roleId: 'backend-developer',
    title: 'Backend Developer',
    description: 'Master server-side engineering, database modeling, REST/GraphQL APIs, microservices, caching, containerization, and cloud deployment.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Server fundamentals, operating systems, networking, and version control.',
        skills: [
          {
            id: 'be-prog',
            title: 'Backend Programming Language (Node.js / Python)',
            category: 'Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Node.js', 'Python', 'JavaScript', 'Object-Oriented Programming'],
            whatToLearn: [
              'Language syntax, data structures, and control flow',
              'Object-Oriented Programming (OOP) and functional design patterns',
              'File system operations, streams, and buffer management',
              'Package managers (npm, pip) and virtual environments'
            ],
            whyItMatters: 'Your core language is the vehicle for expressing business logic, data validations, and server algorithms.',
            aiRelevance: 'AI code generators produce algorithmic backend functions; your role is verifying computational complexity and memory safety.',
            resources: [],
            practice: 'Write a CLI utility that parses, validates, and transforms large JSON and CSV log files.'
          },
          {
            id: 'be-http',
            title: 'HTTP Protocol, Networking & Web Architecture',
            category: 'Networking',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['HTTP/1.1', 'HTTP/2', 'REST', 'TCP/IP', 'DNS', 'TLS/SSL'],
            whatToLearn: [
              'HTTP request/response structure, headers, verbs (GET, POST, PUT, PATCH, DELETE)',
              'Status code semantics (2xx success, 3xx redirects, 4xx client errors, 5xx server failures)',
              'DNS resolution, IP routing, TCP handshakes, and HTTPS encryption',
              'Cross-Origin Resource Sharing (CORS) and security headers'
            ],
            whyItMatters: 'Understanding network fundamentals prevents baffling integration issues and ensures fast, secure API design.',
            aiRelevance: 'Use AI to generate mock HTTP requests and test compliance with RFC specifications.',
            resources: [],
            practice: 'Build a raw HTTP server using low-level sockets or standard library modules without frameworks.'
          },
          {
            id: 'be-git',
            title: 'Git Version Control & Branching Workflows',
            category: 'Developer Tools',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '1 week',
            importance: 'essential',
            technologies: ['Git', 'GitHub', 'CLI', 'Trunk-Based Development'],
            whatToLearn: [
              'Feature branching, rebasing, and squash merging',
              'Tagging releases and semantic versioning (SemVer)',
              'GitHub workflows and code review standards'
            ],
            whyItMatters: 'Enables safe collaboration and traceability across backend releases.',
            aiRelevance: 'AI can draft release notes and changelogs from Git commit trees.',
            resources: [],
            practice: 'Set up automated pre-commit hooks that lint and validate syntax before commits are created.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Server frameworks, RESTful API architecture, relational databases, and input validation.',
        skills: [
          {
            id: 'be-framework',
            title: 'Backend Framework & REST API Design',
            category: 'Frameworks',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['be-prog', 'be-http'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Express.js', 'FastAPI', 'Routing', 'Middleware', 'Controllers'],
            whatToLearn: [
              'Middleware chaining (logging, error handling, body parsing, CORS)',
              'RESTful URI conventions and resource-oriented architecture',
              'Request validation and schema sanitization (Zod, Joi, Pydantic)',
              'Centralized error handling and standard JSON error response envelopes'
            ],
            whyItMatters: 'Clean API design makes your services predictable, easy to consume by clients, and maintainable over years.',
            aiRelevance: 'AI can auto-generate OpenAPI / Swagger documentation from your route schemas.',
            resources: [],
            practice: 'Build a complete CRUD REST API with validated schemas and structured error handling.'
          },
          {
            id: 'be-sql',
            title: 'Relational Databases & SQL (PostgreSQL)',
            category: 'Databases',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['be-prog'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['PostgreSQL', 'SQL', 'Schema Design', 'Normalization', 'Indexes', 'Prisma / TypeORM'],
            whatToLearn: [
              'Relational schema design and normalization (1NF, 2NF, 3NF)',
              'Writing complex queries: JOINs (INNER, LEFT, FULL), GROUP BY, aggregations, subqueries',
              'Foreign keys, constraints, and cascade behaviors',
              'Database indexing strategies (B-tree, composite, EXPLAIN ANALYZE)',
              'Database migrations and ORM/query builder usage (Prisma, Drizzle, or SQLAlchemy)'
            ],
            whyItMatters: 'PostgreSQL is the gold standard for transactional business data integrity in modern software.',
            aiRelevance: 'AI can optimize slow SQL queries and suggest missing composite indexes based on query plans.',
            resources: [],
            practice: 'Design a normalized database schema for an e-commerce platform with orders, products, and inventory constraints.'
          },
          {
            id: 'be-auth',
            title: 'Authentication & Authorization Systems',
            category: 'Security',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['be-framework', 'be-sql'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['JWT', 'Bcrypt', 'OAuth 2.0', 'Role-Based Access Control (RBAC)', 'Cookies'],
            whatToLearn: [
              'Secure password hashing with salt (Bcrypt / Argon2)',
              'JSON Web Tokens (JWT) vs session cookies (HttpOnly, SameSite, Secure)',
              'Refresh token rotation strategies for long-lived sessions',
              'Role-Based Access Control (RBAC) middleware for route authorization',
              'OAuth 2.0 / OpenID Connect login flows (Google, GitHub login)'
            ],
            whyItMatters: 'Authentication failures are the #1 source of data breaches. Understanding secure token lifecycles is mandatory.',
            aiRelevance: 'AI can audit auth middleware for missing role checks and token expiration edge cases.',
            resources: [],
            practice: 'Implement an authentication service with email verification, access/refresh token rotation, and RBAC.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'NoSQL, caching, background jobs, automated testing, and containerization.',
        skills: [
          {
            id: 'be-nosql',
            title: 'NoSQL Databases & Document Stores',
            category: 'Databases',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['be-sql'],
            estimatedTime: '2 weeks',
            importance: 'recommended',
            technologies: ['MongoDB', 'Mongoose', 'Document Model', 'Aggregation Pipeline'],
            whatToLearn: [
              'Document data modeling vs relational modeling (embedding vs referencing)',
              'MongoDB aggregation pipelines for multi-stage data processing',
              'When to choose SQL vs NoSQL based on CAP theorem and data shapes'
            ],
            whyItMatters: 'NoSQL excels for flexible schemas, rapid prototyping, catalog data, and unstructured document storage.',
            aiRelevance: 'AI tools can assist in migrating schemas and writing complex aggregation stages.',
            resources: [],
            practice: 'Build a flexible content management system with custom user-defined schemas in MongoDB.'
          },
          {
            id: 'be-caching',
            title: 'Caching & In-Memory Stores (Redis)',
            category: 'Performance',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['be-framework', 'be-sql'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Redis', 'Cache-Aside', 'TTL', 'Rate Limiting', 'Pub/Sub'],
            whatToLearn: [
              'In-memory data structures (strings, hashes, lists, sets, sorted sets)',
              'Caching patterns: Cache-Aside, Write-Through, and Cache Invalidation strategies',
              'Setting Time-To-Live (TTL) and handling cache stampedes / thundering herd',
              'API rate limiting with sliding window Redis algorithms'
            ],
            whyItMatters: 'Redis reduces database load by 90%+ and allows APIs to serve responses in sub-millisecond speeds.',
            aiRelevance: 'Redis is also widely used as a fast vector store and session cache for AI LLM applications.',
            resources: [],
            practice: 'Add Redis caching and an IP-based sliding window rate limiter to an existing REST API.'
          },
          {
            id: 'be-queues',
            title: 'Message Queues & Background Processing',
            category: 'Architecture',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['be-caching'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['BullMQ', 'Celery', 'RabbitMQ', 'Background Workers', 'Event Driven'],
            whatToLearn: [
              'Decoupling synchronous HTTP requests from heavy background workloads',
              'Job queues (BullMQ / Celery), workers, retry logic, and exponential backoff',
              'Handling long-running tasks: email delivery, PDF generation, video transcoding',
              'Dead-letter queues (DLQ) for failed job auditing'
            ],
            whyItMatters: 'Prevents HTTP request timeouts and enables resilient, decoupled asynchronous workflows.',
            aiRelevance: 'AI model inferences are slow (5-30s); queuing is strictly required to process AI requests without timing out clients.',
            resources: [],
            practice: 'Build an asynchronous report generator that queues jobs, processes them in a worker thread, and notifies clients.'
          },
          {
            id: 'be-docker',
            title: 'Docker & Containerization',
            category: 'DevOps',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['be-framework'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Docker', 'Dockerfile', 'Docker Compose', 'Multi-Stage Builds'],
            whatToLearn: [
              'Container concepts vs virtual machines, image layers, and caching',
              'Writing efficient, minimal multi-stage Dockerfiles',
              'Docker Compose for multi-container local environments (API + Postgres + Redis)',
              'Volume mounts for persistence and container networking'
            ],
            whyItMatters: 'Eliminates "it works on my machine" and forms the universal standard for deploying applications to cloud servers.',
            aiRelevance: 'AI tools can generate Dockerfiles, but you must know how to minimize image size and configure non-root users.',
            resources: [],
            practice: 'Dockerize a full backend stack with API, PostgreSQL, and Redis in a single `docker-compose up` command.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Automated testing, system design, microservices, LLM integration, and cloud observability.',
        skills: [
          {
            id: 'be-testing',
            title: 'Backend Testing: Unit, Integration & Load',
            category: 'Testing',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['be-framework', 'be-sql'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['Jest', 'Supertest', 'Pytest', 'Testcontainers', 'k6'],
            whatToLearn: [
              'Unit testing business services with mocked repositories',
              'Integration testing real API endpoints against ephemeral database containers (Testcontainers)',
              'Testing authentication flows and database rollback transactions',
              'Load testing and concurrency benchmarks with k6'
            ],
            whyItMatters: 'Automated testing guarantees that new features do not silently break existing database records or API contracts.',
            aiRelevance: 'AI can generate boundary test cases and fuzz input values for your controller suites.',
            resources: [],
            practice: 'Write an integration test suite for an ordering system verifying concurrent inventory deductions.'
          },
          {
            id: 'be-system-design',
            title: 'System Design & Scalable Architecture',
            category: 'Architecture',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['be-sql', 'be-caching', 'be-queues'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Load Balancers', 'Sharding', 'Replication', 'CAP Theorem', 'Microservices', 'CDN'],
            whatToLearn: [
              'Horizontal vs vertical scaling, stateless servers, and load balancing algorithms (Round Robin, Least Connections)',
              'Database read replicas, write masters, sharding, and partitioning strategies',
              'Monolith vs microservices trade-offs and service discovery',
              'Idempotency keys for payment processing and distributed transaction patterns'
            ],
            whyItMatters: 'System design is the primary differentiator in mid-to-senior technical interviews and prevents costly architectural rewrites.',
            aiRelevance: 'AI can help brainstorm architectural trade-offs and diagram distributed components.',
            resources: [],
            practice: 'Design an architecture document for a URL shortening service handling 100M daily redirects with sub-10ms latency.'
          },
          {
            id: 'be-ai-integration',
            title: 'AI Services & LLM Backend Integration',
            category: 'AI Integration',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['be-framework', 'be-queues'],
            estimatedTime: '2-3 weeks',
            importance: 'recommended',
            technologies: ['OpenAI SDK', 'LangChain', 'Embeddings', 'Streaming Responses', 'Cost Tracking', 'Vector Search'],
            whatToLearn: [
              'Integrating commercial LLM APIs (OpenAI, Anthropic, Gemini) with structured output parsing (JSON schema mode)',
              'Managing API rate limits, exponential backoff, and model fallback cascades',
              'Generating vector embeddings and querying vector databases (pgvector, Pinecone)',
              'Streaming tokens directly to clients and tracking token usage / cost per tenant'
            ],
            whyItMatters: 'Modern backends orchestrate AI intelligence, enforce access controls, protect secret API keys, and manage token quotas.',
            aiRelevance: 'Directly powers enterprise AI backend capabilities and RAG architectures.',
            resources: [],
            practice: 'Build a backend service that accepts documents, generates vector embeddings, and answers user queries via RAG.'
          },
          {
            id: 'be-observability',
            title: 'Observability, Logging & Cloud Deployment',
            category: 'DevOps',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['be-docker'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Structured Logging (Pino)', 'Prometheus', 'Grafana', 'OpenTelemetry', 'AWS / Render'],
            whatToLearn: [
              'Structured JSON logging with correlation IDs for tracing requests across services',
              'Application health check endpoints (/healthz, /readyz) for orchestrators',
              'Metrics collection (request count, error rates, p95/p99 latency) with Prometheus',
              'Deploying containerized backends to cloud platforms (AWS ECS/App Runner, Render, Fly.io)'
            ],
            whyItMatters: 'Without observability, fixing production outages requires blind guesswork during critical system downtime.',
            aiRelevance: 'AI log analysis tools synthesize root causes from aggregated error traces.',
            resources: [],
            practice: 'Instrument an API with OpenTelemetry tracing and deploy it with automated health check monitoring.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Full portfolio projects, architecture reviews, and production readiness checklist.',
        skills: [
          {
            id: 'be-proj-beginner',
            title: 'Beginner Milestone: Secure Task & Notes REST API',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['be-framework', 'be-sql', 'be-auth'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Zod'],
            whatToLearn: [
              'End-to-end user registration, password hashing, and token-based authentication',
              'CRUD endpoints with strict input validation schemas',
              'Relational queries mapping users to their private resources'
            ],
            whyItMatters: 'Validates that you can build a complete, secure data API from scratch.',
            aiRelevance: 'Use AI to generate mock unit test fixtures and schema validation tests.',
            resources: [],
            practice: 'Build and deploy a REST API with Swagger documentation and automated tests.'
          },
          {
            id: 'be-proj-intermediate',
            title: 'Intermediate Milestone: Multi-Tenant SaaS Backend with Redis & Queues',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['be-caching', 'be-queues', 'be-docker'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Node.js/Python', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker Compose'],
            whatToLearn: [
              'Asynchronous background report generation and email notification delivery',
              'Multi-tier rate limiting by user subscription tier using Redis',
              'Dockerized local environment spinning up all supporting services'
            ],
            whyItMatters: 'Demonstrates distributed system mechanics and asynchronous processing commonly required in mid-level roles.',
            aiRelevance: 'Use AI to stress-test your Redis cache invalidation edge cases.',
            resources: [],
            practice: 'Build an invoice generation service that queues PDF compilation and sends email updates.'
          },
          {
            id: 'be-proj-production',
            title: 'Job-Ready Milestone: High-Throughput E-Commerce Engine with AI Search',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['be-testing', 'be-system-design', 'be-ai-integration', 'be-observability'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['FastAPI/Node.js', 'PostgreSQL', 'pgvector', 'Redis', 'Docker', 'k6', 'CI/CD'],
            whatToLearn: [
              'High-concurrency checkout flow with transactional inventory reservations',
              'Semantic product search powered by vector embeddings and pgvector',
              'Complete test suite with load benchmarks proving 500+ requests/sec',
              'Automated GitHub Actions CI/CD deploying to cloud containers'
            ],
            whyItMatters: 'Proves to hiring managers that you understand database concurrency, AI integration, and production scalability.',
            aiRelevance: 'Integrates vector embeddings directly with transactional database storage.',
            resources: [],
            practice: 'Build and deploy a resilient e-commerce backend engine with semantic search and live monitoring.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'be-p1',
        title: 'Secure Authentication & Content REST API',
        type: 'Beginner',
        description: 'A modular, production-ready REST API featuring secure JWT authentication, password hashing, PostgreSQL persistence, and input validation.',
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Zod'],
        deliverables: [
          'User registration and login with Argon2/Bcrypt password hashing',
          'Access and refresh token lifecycle management',
          'Normalized relational schema with foreign key constraints',
          'Structured JSON error responses and Swagger documentation'
        ]
      },
      {
        id: 'be-p2',
        title: 'Distributed Job Queue & Caching Engine',
        type: 'Intermediate',
        description: 'An asynchronous processing engine with Redis caching, BullMQ background workers, rate limiters, and Docker Compose orchestration.',
        technologies: ['Node.js', 'Redis', 'BullMQ', 'Docker Compose', 'PostgreSQL'],
        deliverables: [
          'Background worker processing asynchronous heavy tasks',
          'Redis Cache-Aside implementation with automated TTL expiry',
          'Sliding-window IP and API-key rate limiting',
          'Multi-container Docker Compose setup for local development'
        ]
      },
      {
        id: 'be-p3',
        title: 'High-Throughput Order Engine with AI Semantic Search',
        type: 'Production / Job-Ready',
        description: 'An enterprise-grade transactional backend capable of handling 500+ concurrent requests/sec with ACID transaction safety, AI vector search, and observability.',
        technologies: ['Node.js / Python', 'PostgreSQL', 'pgvector', 'Redis', 'k6', 'Docker', 'OpenTelemetry'],
        deliverables: [
          'ACID transaction isolation for concurrent inventory deduction',
          'Vector similarity search using pgvector and OpenAI embeddings',
          'k6 load test script validating latency under heavy concurrency',
          'Complete CI/CD pipeline with unit and integration tests'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'be-c1', label: 'Server-side language fluency (Node.js / Python) and async programming', checked: false },
        { id: 'be-c2', label: 'RESTful API architecture, HTTP status semantics, and middleware design', checked: false },
        { id: 'be-c3', label: 'Relational database schema design, indexing, and SQL query optimization', checked: false },
        { id: 'be-c4', label: 'Authentication & authorization (JWT, secure cookies, Bcrypt, RBAC)', checked: false },
        { id: 'be-c5', label: 'Caching with Redis (Cache-Aside, rate limiting, pub/sub)', checked: false },
        { id: 'be-c6', label: 'Asynchronous task queues and background worker management', checked: false },
        { id: 'be-c7', label: 'Docker containerization with multi-stage builds and Docker Compose', checked: false },
        { id: 'be-c8', label: 'Automated testing (Unit, Integration with Testcontainers, Load testing)', checked: false },
        { id: 'be-c9', label: 'System design principles (Horizontal scaling, load balancing, sharding)', checked: false },
        { id: 'be-c10', label: 'AI LLM API integration, vector embeddings, and streaming responses', checked: false }
      ],
      projects: [
        { id: 'be-cp1', label: '1 Beginner REST API with authentication and database migrations', checked: false },
        { id: 'be-cp2', label: '1 Intermediate system with Redis caching and background worker queues', checked: false },
        { id: 'be-cp3', label: '1 Production high-throughput backend with AI search and load test proof', checked: false }
      ],
      csFundamentals: [
        { id: 'be-cs1', label: 'Database indexing internals (B-Trees, Hash, GiST, EXPLAIN analysis)', checked: false },
        { id: 'be-cs2', label: 'Concurrency, Race Conditions, Mutexes, and Deadlocks', checked: false },
        { id: 'be-cs3', label: 'Core Algorithms and Data Structures (Hashing, Trees, Graphs)', checked: false, link: 'dsa.html' }
      ],
      career: [
        { id: 'be-car1', label: 'Document API projects with architecture diagrams and API docs', checked: false },
        { id: 'be-car2', label: 'Optimize Resume for Backend Engineering in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'be-car3', label: 'Audit GitHub repositories for clean README and CI badges in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'be-car4', label: 'Practice backend algorithmic patterns in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // 3. FULL STACK DEVELOPER
  // =========================================================================
  'fullstack': {
    roleId: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Bridge frontend user experience, backend APIs, relational databases, cloud hosting, and production AI integrations into unified software products.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Web foundations, client-side fundamentals, and server execution models.',
        skills: [
          {
            id: 'fs-web-foundations',
            title: 'HTML5, Modern CSS & Responsive Layouts',
            category: 'Frontend',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Tailwind CSS'],
            whatToLearn: ['Semantic elements', 'Flexbox and Grid layout systems', 'Mobile-first responsive styling', 'Utility-first CSS with Tailwind'],
            whyItMatters: 'Full stack engineers must be able to craft clean, responsive UI without relying on a dedicated designer.',
            aiRelevance: 'AI speeds up UI component generation; foundational CSS lets you fix layout breaks quickly.',
            resources: [],
            practice: 'Build a responsive SaaS marketing page with navigation drawer and feature cards.'
          },
          {
            id: 'fs-js-ts',
            title: 'JavaScript ES6+ & TypeScript Mastery',
            category: 'Core Language',
            level: 'beginner',
            levelNum: 1,
            prerequisites: ['fs-web-foundations'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['JavaScript', 'TypeScript', 'Async/Await', 'Generics'],
            whatToLearn: ['ES6+ features', 'Async programming and event loop', 'TypeScript types, interfaces, and generics', 'Shared types across client and server'],
            whyItMatters: 'Using TypeScript end-to-end enables end-to-end type safety between database schemas, APIs, and client views.',
            aiRelevance: 'Full-stack TypeScript types dramatically improve AI code completion accuracy across your stack.',
            resources: [],
            practice: 'Create a shared TypeScript package containing common data models and validation functions.'
          },
          {
            id: 'fs-git',
            title: 'Git, Monorepos & Developer Workflow',
            category: 'Developer Tools',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '1 week',
            importance: 'essential',
            technologies: ['Git', 'GitHub', 'npm workspaces / Turborepo'],
            whatToLearn: ['Branching workflows', 'Monorepo organization', 'Package management scripts'],
            whyItMatters: 'Full stack applications frequently live in unified repositories sharing common types and configs.',
            aiRelevance: 'AI assistants can generate monorepo configs and CI pipelines easily.',
            resources: [],
            practice: 'Configure a monorepo containing a frontend app, a backend API, and a shared types package.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'React client engineering, server frameworks, and relational databases.',
        skills: [
          {
            id: 'fs-react',
            title: 'React & Client State Architecture',
            category: 'Frontend',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['fs-js-ts'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['React', 'Hooks', 'Zustand / TanStack Query', 'Tailwind CSS'],
            whatToLearn: ['Functional components and hooks', 'Server state caching with TanStack Query', 'Client state management', 'Form handling and client validation'],
            whyItMatters: 'React is the dominant frontend framework; full stack engineers must write scalable UI code.',
            aiRelevance: 'AI code generators produce React boilerplate, allowing you to focus on application state and business logic.',
            resources: [],
            practice: 'Build a dynamic dashboard with server-side cached data fetching and optimistic mutations.'
          },
          {
            id: 'fs-backend-api',
            title: 'Node.js, Express & RESTful APIs',
            category: 'Backend',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['fs-js-ts'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Node.js', 'Express', 'REST APIs', 'Middleware', 'Zod'],
            whatToLearn: ['Express routing and middleware architecture', 'Request validation with Zod schemas', 'RESTful CRUD endpoint conventions', 'Error handling middleware'],
            whyItMatters: 'Backend APIs serve as the gateway between user interfaces and persistent databases.',
            aiRelevance: 'Use AI to generate comprehensive test request fixtures and OpenAPI docs.',
            resources: [],
            practice: 'Build a secure REST API with authentication and validated request schemas.'
          },
          {
            id: 'fs-database',
            title: 'PostgreSQL, ORM & Schema Design',
            category: 'Database',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['fs-backend-api'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['PostgreSQL', 'Prisma', 'Drizzle ORM', 'Relational Schema'],
            whatToLearn: ['Relational schema design and foreign keys', 'ORM mapping with Prisma or Drizzle', 'Database migrations and seeding', 'Optimized queries and indexes'],
            whyItMatters: 'Data integrity is the bedrock of every application. Full stack engineers must design clean database models.',
            aiRelevance: 'AI can draft relational schemas and optimize complex multi-table SQL queries.',
            resources: [],
            practice: 'Design and migrate an e-commerce database with users, orders, items, and inventory tracking.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Next.js unified full stack architecture, authentication, and Docker containerization.',
        skills: [
          {
            id: 'fs-nextjs',
            title: 'Unified Full-Stack with Next.js App Router',
            category: 'Full Stack Framework',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fs-react', 'fs-backend-api', 'fs-database'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Next.js', 'Server Components', 'Server Actions', 'Route Handlers'],
            whatToLearn: [
              'React Server Components (RSC) vs Client Components',
              'Next.js Server Actions for direct database mutation without boilerplate API routes',
              'Dynamic routing, parallel routes, and intercepted modal routes',
              'Streaming UI with Suspense boundaries'
            ],
            whyItMatters: 'Next.js unifies frontend and backend into a single productive mental model and deployment target.',
            aiRelevance: 'AI helps scaffold server action patterns with end-to-end type safety.',
            resources: [],
            practice: 'Build a full-stack SaaS portal with Server Actions, loading skeletons, and database mutations.'
          },
          {
            id: 'fs-auth',
            title: 'Full-Stack Authentication & Session Management',
            category: 'Security',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fs-nextjs'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['NextAuth / Auth.js', 'JWT', 'OAuth', 'HttpOnly Cookies', 'RBAC'],
            whatToLearn: ['Social login providers (Google, GitHub)', 'Credentials login with password hashing', 'Secure session cookies and JWT signing', 'Protected routes and middleware verification'],
            whyItMatters: 'Every commercial application requires robust user authentication and role-based permissions.',
            aiRelevance: 'AI can audit auth callback pipelines for missing validation checks.',
            resources: [],
            practice: 'Implement complete social and credential authentication with role-based dashboard access.'
          },
          {
            id: 'fs-docker',
            title: 'Docker & Multi-Service Local Environments',
            category: 'DevOps',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['fs-database'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Docker', 'Docker Compose', 'Multi-Stage Builds', 'Networking'],
            whatToLearn: ['Dockerizing Next.js / Node.js applications', 'Docker Compose orchestrating API, PostgreSQL, and Redis', 'Environment variables across containers', 'Optimizing image build layers'],
            whyItMatters: 'Enables deterministic developer onboarding and seamless cloud parity.',
            aiRelevance: 'AI generates production Dockerfiles with security best practices.',
            resources: [],
            practice: 'Dockerize a full-stack Next.js app with PostgreSQL and Redis in a single compose configuration.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Testing, caching, cloud deployment, system design, and production AI copilot features.',
        skills: [
          {
            id: 'fs-testing',
            title: 'Full-Stack Testing: Component, API & E2E',
            category: 'Testing',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fs-nextjs', 'fs-auth'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['Vitest', 'Playwright', 'Supertest', 'Test Automation'],
            whatToLearn: ['Unit testing utility logic', 'API route integration tests', 'End-to-End browser tests simulating complete user journeys', 'CI pipeline test execution'],
            whyItMatters: 'Gives confidence to deploy changes continuously without regressions.',
            aiRelevance: 'AI generates end-to-end Playwright tests from natural language user story descriptions.',
            resources: [],
            practice: 'Write an E2E test covering registration, cart checkout, and order confirmation.'
          },
          {
            id: 'fs-ai-copilot',
            title: 'AI Copilot Features, RAG & Tool Calling',
            category: 'AI Integration',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fs-nextjs'],
            estimatedTime: '2-3 weeks',
            importance: 'recommended',
            technologies: ['Vercel AI SDK', 'OpenAI API', 'Tool Calling', 'pgvector / Pinecone', 'RAG'],
            whatToLearn: [
              'Streaming AI completions directly to React client views',
              'Function calling / Tool calling (allowing AI to trigger database queries or actions)',
              'Retrieval-Augmented Generation (RAG) over user-uploaded documents',
              'Token usage tracking, rate limits, and cost controls'
            ],
            whyItMatters: 'Full stack engineers who can ship production AI features are in the highest tier of industry demand.',
            aiRelevance: 'Directly powers modern AI SaaS applications and copilot interfaces.',
            resources: [],
            practice: 'Build an AI assistant that can inspect database data via tool calling and summarize analytics for the user.'
          },
          {
            id: 'fs-system-design',
            title: 'System Design, Caching & Cloud Scaling',
            category: 'Architecture',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['fs-docker', 'fs-testing'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Redis', 'CDN', 'Vercel / AWS', 'Database Replication', 'CI/CD'],
            whatToLearn: ['Redis caching and session storage', 'CDN edge caching strategies', 'Database read replicas and connection pooling', 'Microservice vs monolith trade-offs'],
            whyItMatters: 'Ensures your applications remain fast, reliable, and affordable under heavy traffic spikes.',
            aiRelevance: 'Use AI to review system architecture diagrams and calculate capacity planning formulas.',
            resources: [],
            practice: 'Design and deploy a scalable full-stack application with Redis caching and automated GitHub Actions CI/CD.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Complete capstone milestones and technical career readiness.',
        skills: [
          {
            id: 'fs-proj-beginner',
            title: 'Beginner Milestone: Full-Stack Note Vault with Auth',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['fs-react', 'fs-backend-api', 'fs-database'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['React', 'Express', 'PostgreSQL', 'JWT'],
            whatToLearn: ['Connecting client React forms with backend REST endpoints', 'Persisting user records in PostgreSQL', 'Token authentication flow'],
            whyItMatters: 'Proves you can independently connect frontend views with backend databases.',
            aiRelevance: 'AI can draft initial API boilerplate.',
            resources: [],
            practice: 'Build and deploy a secure notes application with tagging, search, and authentication.'
          },
          {
            id: 'fs-proj-intermediate',
            title: 'Intermediate Milestone: Multi-User Collaboration SaaS',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['fs-nextjs', 'fs-auth', 'fs-docker'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Next.js App Router', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
            whatToLearn: ['Server actions for fast mutations', 'Role-based team workspaces and invite systems', 'Containerized development environment'],
            whyItMatters: 'Demonstrates modern full-stack engineering proficiency expected in modern product teams.',
            aiRelevance: 'Use AI to write schema migrations and seed scripts.',
            resources: [],
            practice: 'Build a project management platform with team workspaces and activity feeds.'
          },
          {
            id: 'fs-proj-production',
            title: 'Job-Ready Milestone: Production AI-Powered Knowledge Hub',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['fs-testing', 'fs-ai-copilot', 'fs-system-design'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['Next.js', 'TypeScript', 'pgvector', 'OpenAI API', 'Playwright', 'Vercel / AWS'],
            whatToLearn: [
              'Full-stack architecture with RAG document indexing and vector search',
              'Streaming AI chat with tool calling and citation links',
              'Comprehensive Playwright E2E testing in GitHub Actions',
              'Production deployment with sub-second page loads'
            ],
            whyItMatters: 'The centerpiece of your engineering portfolio that proves you can build, test, and deploy modern AI-augmented applications.',
            aiRelevance: 'Demonstrates end-to-end mastery of production generative AI web engineering.',
            resources: [],
            practice: 'Build and deploy an enterprise knowledge base with document embedding, streaming AI Q&A, and full test coverage.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'fs-p1',
        title: 'Full-Stack Note & Task Vault',
        type: 'Beginner',
        description: 'A complete full-stack web application with React frontend, Express REST API, PostgreSQL database, and JWT authentication.',
        technologies: ['React', 'Express', 'PostgreSQL', 'JWT', 'Tailwind CSS'],
        deliverables: [
          'User registration and login with encrypted password storage',
          'CRUD operations for notes with category filters',
          'Protected API endpoints verifying JWT bearer tokens',
          'Responsive UI with dark mode support'
        ]
      },
      {
        id: 'fs-p2',
        title: 'Multi-Tenant Team Workspace SaaS',
        type: 'Intermediate',
        description: 'A full-stack collaborative workspace in Next.js with Server Actions, Prisma ORM, role-based access control, and Docker Compose.',
        technologies: ['Next.js App Router', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
        deliverables: [
          'Server Actions for low-latency database mutations',
          'Team invite system and Role-Based Access Control (Admin/Member)',
          'Activity audit logs tracking member contributions',
          'Dockerized database and migration scripts'
        ]
      },
      {
        id: 'fs-p3',
        title: 'Production AI Knowledge Hub with RAG & Vector Search',
        type: 'Production / Job-Ready',
        description: 'An enterprise knowledge engine featuring streaming AI responses, vector document embeddings, Playwright E2E tests, and automated CI/CD.',
        technologies: ['Next.js', 'TypeScript', 'pgvector', 'OpenAI API', 'Playwright', 'Vercel'],
        deliverables: [
          'Document upload and automated chunking/embedding pipeline',
          'Vector similarity search using pgvector',
          'Streaming conversational assistant with citations',
          'Complete Playwright test suite and live production deployment'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'fs-c1', label: 'Client UI mastery (HTML5, modern CSS, React, responsive layouts)', checked: false },
        { id: 'fs-c2', label: 'Full-stack TypeScript proficiency across client, server, and database', checked: false },
        { id: 'fs-c3', label: 'Backend API design (RESTful conventions, validation, error envelopes)', checked: false },
        { id: 'fs-c4', label: 'Relational database schema modeling, indexing, and migrations (PostgreSQL)', checked: false },
        { id: 'fs-c5', label: 'Full-stack Next.js App Router (Server Components & Server Actions)', checked: false },
        { id: 'fs-c6', label: 'Authentication & authorization (OAuth, JWT, secure sessions, RBAC)', checked: false },
        { id: 'fs-c7', label: 'Containerization with Docker and multi-container Docker Compose', checked: false },
        { id: 'fs-c8', label: 'Automated testing (Unit, API integration, Playwright E2E)', checked: false },
        { id: 'fs-c9', label: 'Production AI integration (Streaming, tool calling, RAG pipelines)', checked: false },
        { id: 'fs-c10', label: 'Cloud deployment, caching (Redis, CDN), and CI/CD pipelines', checked: false }
      ],
      projects: [
        { id: 'fs-cp1', label: '1 Beginner full-stack CRUD application with authentication', checked: false },
        { id: 'fs-cp2', label: '1 Intermediate multi-tenant SaaS application with Server Actions', checked: false },
        { id: 'fs-cp3', label: '1 Production AI-augmented platform deployed live with CI/CD', checked: false }
      ],
      csFundamentals: [
        { id: 'fs-cs1', label: 'System Design (Horizontal scaling, load balancing, caching, sharding)', checked: false },
        { id: 'fs-cs2', label: 'Network protocols (HTTP/HTTPS, WebSockets, DNS, TCP/IP)', checked: false },
        { id: 'fs-cs3', label: 'Data Structures and Algorithms for technical interviews', checked: false, link: 'dsa.html' }
      ],
      career: [
        { id: 'fs-car1', label: 'Tailor resume for Full Stack Engineer roles in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'fs-car2', label: 'Audit GitHub repositories for clean commit history in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'fs-car3', label: 'Practice full-stack algorithmic interview problems in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // 4. AI ENGINEER
  // =========================================================================
  'ai-engineer': {
    roleId: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Engineer deep learning pipelines, fine-tune foundation models, deploy computer vision and NLP solutions, and scale neural inference systems.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Python mastery, scientific computing, linear algebra, and probability fundamentals.',
        skills: [
          {
            id: 'ai-python',
            title: 'Advanced Python for AI & Data Science',
            category: 'Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Python', 'Object-Oriented Programming', 'Generators', 'Type Hints'],
            whatToLearn: ['List/dict comprehensions and generators', 'OOP and class hierarchies', 'Memory management and profiling', 'Virtual environments and package dependency management'],
            whyItMatters: 'Python is the universal language of artificial intelligence research and production engineering.',
            aiRelevance: 'Foundational baseline for all subsequent AI tooling and libraries.',
            resources: [],
            practice: 'Build an efficient data loader with generators and memory profiling.'
          },
          {
            id: 'ai-math',
            title: 'Mathematics & Statistics for Machine Learning',
            category: 'Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Linear Algebra', 'Multivariate Calculus', 'Probability & Statistics', 'Optimization'],
            whatToLearn: ['Vectors, matrices, dot products, and matrix multiplication', 'Partial derivatives, gradients, and gradient descent', 'Probability distributions, Bayes theorem, and expectation', 'Loss functions and convex optimization'],
            whyItMatters: 'Neural networks are literally parameterized matrix operations optimized by calculus gradients. Without math, ML is pure trial and error.',
            aiRelevance: 'Understanding gradients is required to diagnose vanishing/exploding gradients and training instability.',
            resources: [],
            practice: 'Implement gradient descent from scratch in Python to find the minimum of a multi-variable function.'
          },
          {
            id: 'ai-numpy-pandas',
            title: 'NumPy, Pandas & Tensor Manipulation',
            category: 'Data Processing',
            level: 'beginner',
            levelNum: 1,
            prerequisites: ['ai-python', 'ai-math'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['NumPy', 'Pandas', 'Vectorization', 'Data Cleaning'],
            whatToLearn: ['Broadcasting rules and multi-dimensional tensor indexing', 'Vectorized calculations vs slow Python loops', 'Dataframe filtering, imputation, and feature grouping in Pandas', 'Feature normalization and standardization'],
            whyItMatters: 'High-performance data manipulation directly determines model training speed and feature quality.',
            aiRelevance: 'All neural network inputs must be preprocessed into normalized numeric tensors.',
            resources: [],
            practice: 'Clean and vectorize a messy tabular dataset into normalized training tensors using pure NumPy and Pandas.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Classical machine learning, evaluation metrics, and PyTorch fundamentals.',
        skills: [
          {
            id: 'ai-classic-ml',
            title: 'Classical Machine Learning & Scikit-Learn',
            category: 'Machine Learning',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['ai-numpy-pandas'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Scikit-learn', 'Regression', 'Decision Trees', 'Random Forests', 'XGBoost', 'K-Means'],
            whatToLearn: ['Supervised learning: Linear/Logistic Regression, Decision Trees, Ensemble methods (Random Forest, XGBoost)', 'Unsupervised learning: K-Means clustering and PCA dimensionality reduction', 'Cross-validation, hyperparameter grid search, and regularizers (L1/L2)', 'Evaluation metrics: Precision, Recall, F1-Score, ROC-AUC'],
            whyItMatters: 'Classical ML models are frequently faster, cheaper, and more interpretable than deep learning for tabular data.',
            aiRelevance: 'Establishes the core machine learning paradigm of train/val/test splits and generalization error.',
            resources: [],
            practice: 'Train an XGBoost model on tabular data, optimize hyperparameters, and plot feature importance.'
          },
          {
            id: 'ai-pytorch',
            title: 'PyTorch Deep Learning & Neural Network Architecture',
            category: 'Deep Learning',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['ai-math', 'ai-numpy-pandas'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['PyTorch', 'Autograd', 'nn.Module', 'DataLoader', 'CUDA / GPU'],
            whatToLearn: [
              'Tensors, GPU acceleration (.to("cuda")), and computational graphs',
              'Automatic differentiation with torch.autograd and backpropagation',
              'Building custom models with torch.nn.Module, Linear layers, and Activations (ReLU, GELU)',
              'Writing the canonical training loop: forward pass, loss calculation, optimizer.step()',
              'Custom DataSets and DataLoaders with batching and shuffling'
            ],
            whyItMatters: 'PyTorch is the undisputed primary research and production deep learning framework across the AI industry.',
            aiRelevance: 'The foundational engine underpinning modern LLMs, computer vision models, and diffusion systems.',
            resources: [],
            practice: 'Build a multi-layer perceptron from scratch in PyTorch to classify handwritten digits with 98%+ accuracy.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Computer vision, natural language processing, transformers, and Hugging Face.',
        skills: [
          {
            id: 'ai-computer-vision',
            title: 'Computer Vision & Convolutional Networks (CNNs)',
            category: 'Computer Vision',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['ai-pytorch'],
            estimatedTime: '3 weeks',
            importance: 'recommended',
            technologies: ['CNNs', 'ResNet', 'OpenCV', 'Data Augmentation', 'Object Detection (YOLO)'],
            whatToLearn: ['Convolution kernels, pooling layers, and feature maps', 'Transfer learning with pre-trained backbones (ResNet, EfficientNet)', 'Image data augmentation (Albumentations)', 'Object detection concepts with YOLO'],
            whyItMatters: 'Vision models power autonomous robotics, medical imaging, security, and quality inspection.',
            aiRelevance: 'Vision transformers (ViT) connect visual understanding with multimodal LLMs.',
            resources: [],
            practice: 'Fine-tune a pre-trained ResNet to classify complex image categories with data augmentation.'
          },
          {
            id: 'ai-transformers',
            title: 'Transformers, Attention & Hugging Face',
            category: 'NLP & LLMs',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['ai-pytorch'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['Transformers', 'Self-Attention', 'Hugging Face Transformers', 'Tokenizers', 'BERT', 'GPT'],
            whatToLearn: [
              'The Transformer architecture: Queries, Keys, Values, and Scaled Dot-Product Attention',
              'Multi-Head Attention, Positional Encodings, and Layer Normalization',
              'Encoder-only (BERT) vs Decoder-only (GPT) vs Encoder-Decoder (T5)',
              'Hugging Face ecosystem: AutoTokenizer, AutoModelForSequenceClassification, and Trainer API'
            ],
            whyItMatters: 'The Transformer is the most impactful AI breakthrough of the century, powering all modern LLMs and generative models.',
            aiRelevance: 'The core architecture behind ChatGPT, Claude, Gemini, and Whisper.',
            resources: [],
            practice: 'Fine-tune a transformer model using Hugging Face on a domain classification dataset.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Model fine-tuning (LoRA), vector databases, model quantization, and production inference.',
        skills: [
          {
            id: 'ai-fine-tuning',
            title: 'Parameter-Efficient Fine-Tuning (PEFT & LoRA)',
            category: 'Model Optimization',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['ai-transformers'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['LoRA', 'QLoRA', 'PEFT', 'BitsAndBytes', 'Quantization (4-bit, 8-bit)'],
            whatToLearn: [
              'Why full fine-tuning is impractical for billions of parameters',
              'Low-Rank Adaptation (LoRA) mathematics and adapter weight merging',
              'Quantization techniques (FP16, INT8, INT4, NF4)',
              'Instruction tuning datasets and formatting (Alpaca, ChatML)'
            ],
            whyItMatters: 'Enables fine-tuning 7B+ parameter open-source models on consumer GPUs at a fraction of the compute cost.',
            aiRelevance: 'Crucial for customizing open models (Llama 3, Mistral) for proprietary enterprise domains.',
            resources: [],
            practice: 'Fine-tune an open-source LLM (e.g. Llama 3 or Mistral) on custom domain data using QLoRA.'
          },
          {
            id: 'ai-serving',
            title: 'High-Throughput Model Serving & Inference',
            category: 'Deployment',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['ai-fine-tuning'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['vLLM', 'Triton Inference Server', 'ONNX Runtime', 'FastAPI', 'Docker', 'GPU Optimization'],
            whatToLearn: [
              'Continuous batching and PagedAttention in vLLM',
              'Model export to ONNX and TensorRT for accelerated GPU inference',
              'Building low-latency prediction APIs with FastAPI and Docker',
              'GPU utilization monitoring and memory profiling'
            ],
            whyItMatters: 'Unoptimized model deployment costs thousands of dollars per month in idle cloud GPU bills.',
            aiRelevance: 'vLLM provides 10x-20x higher token throughput compared to vanilla PyTorch serving.',
            resources: [],
            practice: 'Deploy an open LLM with vLLM in Docker and benchmark token throughput under concurrent load.'
          },
          {
            id: 'ai-safety',
            title: 'AI Safety, Evaluation & Guardrails',
            category: 'Safety & Governance',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['ai-transformers'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Ragas', 'Guardrails AI', 'NeMo Guardrails', 'Adversarial Prompting', 'Hallucination Auditing'],
            whatToLearn: [
              'Quantitative evaluation benchmarks (MMLU, HumanEval, RAG metrics)',
              'Input/Output guardrails for content filtering and PII masking',
              'Adversarial prompt injection defense and jailbreak auditing',
              'Hallucination detection and factual grounding checks'
            ],
            whyItMatters: 'Enterprise companies cannot deploy AI models without strict safety, data privacy, and compliance boundaries.',
            aiRelevance: 'Directly protects applications from prompt injections and hallucinated falsehoods.',
            resources: [],
            practice: 'Implement an automated evaluation pipeline measuring RAG answer relevancy and hallucination rate.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Comprehensive AI capstone projects and engineering launch checklist.',
        skills: [
          {
            id: 'ai-proj-beginner',
            title: 'Beginner Milestone: End-to-End Image Classification Pipeline',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['ai-pytorch'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['PyTorch', 'Torchvision', 'FastAPI', 'Docker'],
            whatToLearn: ['Data loading and augmentation', 'Transfer learning model training', 'Exporting model and serving via REST API'],
            whyItMatters: 'Validates basic PyTorch competency and API model deployment.',
            aiRelevance: 'Fundamental deep learning deployment workflow.',
            resources: [],
            practice: 'Train and deploy an image classification API with Swagger docs and containerization.'
          },
          {
            id: 'ai-proj-intermediate',
            title: 'Intermediate Milestone: Domain-Adapted LLM with QLoRA',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['ai-transformers', 'ai-fine-tuning'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['PyTorch', 'Hugging Face', 'QLoRA', 'BitsAndBytes', 'FastAPI'],
            whatToLearn: ['Dataset curation and tokenization', 'QLoRA 4-bit fine-tuning', 'Evaluation benchmarks vs baseline model'],
            whyItMatters: 'Demonstrates specialized model customization, a rare and highly paid industry skill.',
            aiRelevance: 'Practical fine-tuning of open-source foundation models.',
            resources: [],
            practice: 'Fine-tune an open LLM on legal/medical/code datasets and demonstrate verified performance improvement.'
          },
          {
            id: 'ai-proj-production',
            title: 'Job-Ready Milestone: High-Throughput Production AI Engine with vLLM',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['ai-serving', 'ai-safety'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['vLLM', 'FastAPI', 'Docker', 'Guardrails', 'Prometheus', 'Cloud GPU'],
            whatToLearn: [
              'High-throughput model serving with PagedAttention',
              'Integrated safety guardrails and hallucination evaluation',
              'Real-time token streaming and GPU metrics monitoring',
              'Automated deployment pipeline'
            ],
            whyItMatters: 'Proves to AI research labs and tech giants that you can ship production-grade neural systems.',
            aiRelevance: 'Represents the modern state-of-the-art in scalable AI deployment.',
            resources: [],
            practice: 'Deploy a multi-tenant LLM inference cluster with continuous batching, streaming, and safety auditing.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'ai-p1',
        title: 'Deep Learning Vision Classifier & REST API',
        type: 'Beginner',
        description: 'An end-to-end PyTorch deep learning pipeline featuring transfer learning, data augmentation, and Dockerized FastAPI serving.',
        technologies: ['PyTorch', 'Torchvision', 'FastAPI', 'Docker'],
        deliverables: [
          'Transfer learning training script with early stopping and loss plots',
          'FastAPI prediction endpoint with image validation',
          'Docker container packaging model weights and runtime',
          'Evaluation report with confusion matrix and F1-score'
        ]
      },
      {
        id: 'ai-p2',
        title: 'Enterprise Domain-Specific LLM Fine-Tuning',
        type: 'Intermediate',
        description: 'A parameter-efficient fine-tuning project using QLoRA to adapt an open foundation LLM to custom enterprise domain tasks.',
        technologies: ['Hugging Face', 'QLoRA', 'PEFT', 'BitsAndBytes', 'PyTorch'],
        deliverables: [
          'Structured instruction-tuning dataset curation and cleaning',
          '4-bit quantized LoRA fine-tuning training run',
          'Before-and-after benchmark evaluation metrics',
          'Exported adapter weights merged with base model'
        ]
      },
      {
        id: 'ai-p3',
        title: 'Scalable Production LLM Inference Engine',
        type: 'Production / Job-Ready',
        description: 'A production model serving cluster using vLLM, continuous batching, streaming token APIs, safety guardrails, and latency monitoring.',
        technologies: ['vLLM', 'FastAPI', 'Docker', 'Guardrails AI', 'Prometheus'],
        deliverables: [
          'High-throughput serving pipeline with PagedAttention',
          'Content safety guardrails and hallucination detection checks',
          'Streaming API responses via Server-Sent Events',
          'Benchmark report demonstrating sub-50ms Time-To-First-Token (TTFT)'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'ai-c1', label: 'Advanced Python, NumPy vectorized operations, and tensor manipulation', checked: false },
        { id: 'ai-c2', label: 'Linear algebra, multivariate calculus, and gradient optimization', checked: false },
        { id: 'ai-c3', label: 'Classical machine learning algorithms (XGBoost, Random Forests, Scikit-learn)', checked: false },
        { id: 'ai-c4', label: 'PyTorch deep learning architecture (Autograd, custom modules, training loops)', checked: false },
        { id: 'ai-c5', label: 'Transformer architecture (Self-attention, Multi-head attention, Hugging Face)', checked: false },
        { id: 'ai-c6', label: 'Parameter-efficient fine-tuning (LoRA, QLoRA, PEFT, Quantization)', checked: false },
        { id: 'ai-c7', label: 'High-throughput model serving (vLLM, continuous batching, Triton)', checked: false },
        { id: 'ai-c8', label: 'AI safety guardrails, adversarial defense, and quantitative evaluation', checked: false }
      ],
      projects: [
        { id: 'ai-cp1', label: '1 PyTorch vision/audio deep learning model with API deployment', checked: false },
        { id: 'ai-cp2', label: '1 Domain-adapted LLM fine-tuned with QLoRA on specialized data', checked: false },
        { id: 'ai-cp3', label: '1 Production high-throughput inference engine deployed with vLLM', checked: false }
      ],
      csFundamentals: [
        { id: 'ai-cs1', label: 'GPU memory hierarchy, CUDA threads, and VRAM bandwidth bottlenecks', checked: false },
        { id: 'ai-cs2', label: 'Distributed computing paradigms and parallel tensor execution', checked: false },
        { id: 'ai-cs3', label: 'Algorithms and Data Structures relevant to AI systems', checked: false, link: 'dsa.html' }
      ],
      career: [
        { id: 'ai-car1', label: 'Prepare AI research & engineering resume in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'ai-car2', label: 'Publish fine-tuning benchmarks and weights to Hugging Face and GitHub', checked: false, link: 'github.html' },
        { id: 'ai-car3', label: 'Practice core algorithmic problems in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // 5. LLM & GENAI ENGINEER
  // =========================================================================
  'llm-genai': {
    roleId: 'llm-genai-engineer',
    title: 'LLM & GenAI Engineer',
    description: 'Build production generative AI applications using foundation model APIs, RAG architectures, vector databases, autonomous agents, and tool calling.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Prompt engineering principles, model capabilities, tokenization, and API fundamentals.',
        skills: [
          {
            id: 'gen-prompts',
            title: 'Prompt Engineering & In-Context Learning',
            category: 'Prompt Design',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Few-Shot', 'Chain-of-Thought', 'System Prompts', 'Role Prompting'],
            whatToLearn: [
              'Zero-shot, Few-shot, and Chain-of-Thought (CoT) prompting',
              'Structuring system prompts with XML tags, constraints, and personas',
              'Understanding context window limits, tokenization (Byte-Pair Encoding), and truncation',
              'Temperature, Top-P, and frequency penalty tuning'
            ],
            whyItMatters: 'Effective prompt engineering extracts 10x better accuracy from existing models before writing a single line of training code.',
            aiRelevance: 'The foundational interface between software logic and natural language models.',
            resources: [],
            practice: 'Design a robust system prompt that extracts structured information from ambiguous user receipts.'
          },
          {
            id: 'gen-apis',
            title: 'Foundation Model APIs & Structured Outputs',
            category: 'Model APIs',
            level: 'beginner',
            levelNum: 1,
            prerequisites: ['gen-prompts'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['OpenAI API', 'Anthropic Claude API', 'Google Gemini API', 'JSON Schema Mode', 'Pydantic'],
            whatToLearn: [
              'Consuming commercial LLM APIs via Python/TypeScript SDKs',
              'Enforcing strict JSON schema responses using Pydantic / Zod',
              'Handling rate limits, exponential backoff, and model failovers',
              'Token usage tracking and cost calculation'
            ],
            whyItMatters: 'Software backends require deterministic structured data (JSON), not random conversational text.',
            aiRelevance: 'Eliminates parsing errors and turns LLMs into reliable typed data transformers.',
            resources: [],
            practice: 'Build a service that takes unstructured customer emails and returns validated, typed JSON ticket objects.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Embeddings, vector databases, and foundational Retrieval-Augmented Generation (RAG).',
        skills: [
          {
            id: 'gen-embeddings',
            title: 'Vector Embeddings & Semantic Similarity',
            category: 'Embeddings',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['gen-apis'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Embeddings', 'Cosine Similarity', 'Text Chunking', 'OpenAI Embeddings'],
            whatToLearn: [
              'How embedding models map text into high-dimensional vector spaces',
              'Cosine similarity, Euclidean distance, and dot product metrics',
              'Document chunking strategies (fixed-size, recursive character, semantic chunking)',
              'Chunk overlap and metadata tagging for source citations'
            ],
            whyItMatters: 'Embeddings enable search by meaning and concept rather than brittle keyword matching.',
            aiRelevance: 'The universal retrieval foundation of all modern enterprise RAG systems.',
            resources: [],
            practice: 'Implement recursive text chunking and calculate semantic similarity between diverse documents.'
          },
          {
            id: 'gen-vector-dbs',
            title: 'Vector Databases & Similarity Search',
            category: 'Vector Stores',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['gen-embeddings'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['pgvector', 'Pinecone', 'ChromaDB', 'Qdrant', 'HNSW Index'],
            whatToLearn: [
              'Approximate Nearest Neighbor (ANN) algorithms (HNSW, IVF-Flat)',
              'Setting up vector collections, schemas, and metadata filtering',
              'Querying vector databases in Python / TypeScript',
              'Hybrid search combining vector similarity and full-text BM25 keyword search'
            ],
            whyItMatters: 'Vector databases allow sub-second similarity search across millions of enterprise documents.',
            aiRelevance: 'The long-term memory store for generative AI applications.',
            resources: [],
            practice: 'Set up pgvector in PostgreSQL and execute filtered vector similarity queries over thousands of articles.'
          },
          {
            id: 'gen-rag-core',
            title: 'Retrieval-Augmented Generation (RAG) Architecture',
            category: 'RAG',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['gen-vector-dbs'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['LangChain', 'LlamaIndex', 'RAG Pipeline', 'Context Injection', 'Citations'],
            whatToLearn: [
              'The core RAG pipeline: Ingest -> Chunk -> Embed -> Store -> Retrieve -> Augment -> Generate',
              'Building RAG workflows with LangChain or LlamaIndex',
              'Synthesizing grounded answers with explicit page and document citations',
              'Handling "out-of-domain" queries without hallucination'
            ],
            whyItMatters: 'RAG grounds LLMs in current, private company data without requiring expensive retraining.',
            aiRelevance: 'The #1 most demanded enterprise GenAI application pattern.',
            resources: [],
            practice: 'Build a document Q&A assistant that answers questions based strictly on uploaded PDF company policies.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Advanced RAG, re-ranking, tool calling, and structured agent workflows.',
        skills: [
          {
            id: 'gen-advanced-rag',
            title: 'Advanced RAG: Re-ranking, HyDE & Multi-Query',
            category: 'RAG',
            level: 'advanced',
            levelNum: 3,
            prerequisites: ['gen-rag-core'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Cohere Rerank', 'HyDE', 'Query Rewriting', 'Parent-Child Chunking'],
            whatToLearn: [
              'Re-ranking retrieved chunks with cross-encoder models (Cohere Rerank)',
              'Hypothetical Document Embeddings (HyDE) for query enhancement',
              'Multi-query generation to expand search coverage',
              'Hierarchical chunking (small chunks for search, large chunks for LLM context)'
            ],
            whyItMatters: 'Naive RAG frequently retrieves irrelevant context; advanced RAG boosts answer accuracy from ~60% to 90%+.',
            aiRelevance: 'Separates hobbyist demo RAG from enterprise-grade production search systems.',
            resources: [],
            practice: 'Implement a cross-encoder re-ranking stage and demonstrate improved retrieval precision.'
          },
          {
            id: 'gen-tool-calling',
            title: 'Tool Calling, Function Calling & Structured Actions',
            category: 'Agents',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['gen-apis'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['OpenAI Tools', 'Function Calling', 'JSON Schema', 'API Execution'],
            whatToLearn: [
              'Defining tool definitions with parameter schemas and docstrings',
              'Handling model tool-call requests and executing local functions',
              'Feeding tool output back into the conversation context',
              'Multi-step tool execution loops'
            ],
            whyItMatters: 'Transforms LLMs from passive text predictors into active software orchestrators that can query databases and call APIs.',
            aiRelevance: 'The foundational primitive behind all modern AI coding assistants and autonomous agents.',
            resources: [],
            practice: 'Build an AI assistant that can check real-time weather APIs, calculate dates, and query a database via tools.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Autonomous AI agents, multi-agent frameworks, evaluation, and observability.',
        skills: [
          {
            id: 'gen-agents',
            title: 'Autonomous Agents & Multi-Agent Frameworks',
            category: 'Agents',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['gen-tool-calling', 'gen-advanced-rag'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['LangGraph', 'CrewAI', 'ReAct Pattern', 'State Machines', 'Human-in-the-Loop'],
            whatToLearn: [
              'The ReAct (Reason + Act) loop: Thought -> Action -> Observation',
              'Building stateful agentic workflows with LangGraph state graphs',
              'Multi-agent role specialization (Researcher, Writer, Reviewer)',
              'Human-in-the-loop approval checkpoints for sensitive actions'
            ],
            whyItMatters: 'Autonomous agents can tackle complex multi-step tasks that single prompt completions cannot solve.',
            aiRelevance: 'The cutting edge of generative AI application architecture.',
            resources: [],
            practice: 'Build a multi-agent market research team with LangGraph that researches a topic, drafts a report, and edits it.'
          },
          {
            id: 'gen-evaluation',
            title: 'LLM Observability & Automated Evaluation (LLMops)',
            category: 'Evaluation',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['gen-rag-core'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['LangSmith', 'Arize Phoenix', 'Ragas', 'Faithfulness', 'Answer Relevance'],
            whatToLearn: [
              'Tracing prompt chains, latency, and token costs using LangSmith or Phoenix',
              'Automated RAG evaluation metrics: Faithfulness, Answer Relevance, Context Precision',
              'Building golden test evaluation datasets for regression testing',
              'Continuous monitoring for prompt drift and hallucination spikes in production'
            ],
            whyItMatters: 'You cannot optimize what you do not measure. Observability is mandatory for shipping trustworthy AI software.',
            aiRelevance: 'Ensures production GenAI systems maintain accuracy and do not degrade after prompt updates.',
            resources: [],
            practice: 'Set up an automated CI test with Ragas that fails if model faithfulness drops below 0.85.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'End-to-end GenAI capstone projects and production portfolio readiness.',
        skills: [
          {
            id: 'gen-proj-beginner',
            title: 'Beginner Milestone: Structured Document Q&A with Citations',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['gen-rag-core'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Python', 'OpenAI API', 'ChromaDB', 'FastAPI'],
            whatToLearn: ['Document parsing, chunking, and embedding storage', 'Grounded answer generation with exact file citations'],
            whyItMatters: 'Demonstrates clear understanding of basic RAG mechanics.',
            aiRelevance: 'Essential baseline GenAI product pattern.',
            resources: [],
            practice: 'Build a PDF policy assistant with clickable citations linking back to original paragraphs.'
          },
          {
            id: 'gen-proj-intermediate',
            title: 'Intermediate Milestone: Multi-Tool Database Assistant with Reranking',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['gen-advanced-rag', 'gen-tool-calling'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Python', 'Cohere Rerank', 'pgvector', 'Tool Calling', 'FastAPI'],
            whatToLearn: ['Hybrid search + cross-encoder re-ranking', 'Safe SQL tool execution with parameterized queries', 'Streaming token generation'],
            whyItMatters: 'Proves advanced search precision and external system interaction.',
            aiRelevance: 'High-value enterprise assistant architecture.',
            resources: [],
            practice: 'Build an internal analytics copilot that answers questions by querying database tables and document vaults.'
          },
          {
            id: 'gen-proj-production',
            title: 'Job-Ready Milestone: Autonomous Multi-Agent Research & Execution Platform',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['gen-agents', 'gen-evaluation'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['LangGraph', 'OpenAI API', 'Vector DB', 'LangSmith', 'Docker', 'FastAPI'],
            whatToLearn: [
              'Stateful multi-agent collaboration with human approval steps',
              'End-to-end tracing and automated evaluation benchmarks',
              'Production API deployment with user session persistence and streaming'
            ],
            whyItMatters: 'The premier portfolio demonstration proving you can architect and operate autonomous production AI systems.',
            aiRelevance: 'Represents the frontier of production generative AI engineering.',
            resources: [],
            practice: 'Deploy an autonomous research and competitive analysis agent platform with live tracing and evaluation.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'gen-p1',
        title: 'Verifiable Document Q&A RAG Engine',
        type: 'Beginner',
        description: 'A complete RAG application that ingests PDF documents, creates semantic chunks, stores embeddings in ChromaDB, and generates answers with verifiable citations.',
        technologies: ['Python', 'OpenAI API', 'ChromaDB', 'FastAPI', 'LangChain'],
        deliverables: [
          'Document chunking with recursive text splitter and metadata retention',
          'Vector similarity search and context injection',
          'Answer generation with strict citation verification',
          'FastAPI endpoints for document upload and querying'
        ]
      },
      {
        id: 'gen-p2',
        title: 'Advanced Hybrid Search & Tool-Calling Copilot',
        type: 'Intermediate',
        description: 'A production assistant combining hybrid search (BM25 + vector), Cohere cross-encoder re-ranking, and dynamic database tool calling.',
        technologies: ['Python', 'pgvector', 'Cohere Rerank', 'OpenAI Tools', 'FastAPI'],
        deliverables: [
          'Hybrid search combining keyword match and semantic embeddings',
          'Cohere re-ranking boosting top-3 retrieval relevancy',
          'Tool execution loop querying structured SQL database records',
          'Streaming response tokens via Server-Sent Events'
        ]
      },
      {
        id: 'gen-p3',
        title: 'Autonomous Multi-Agent Workflow Engine with LangGraph',
        type: 'Production / Job-Ready',
        description: 'An enterprise multi-agent system built on LangGraph with specialized agent nodes, human-in-the-loop approvals, LangSmith tracing, and automated evaluation.',
        technologies: ['LangGraph', 'OpenAI API', 'LangSmith', 'Ragas', 'Docker', 'FastAPI'],
        deliverables: [
          'Stateful cyclic graph orchestration connecting specialized agents',
          'Human approval gate for sensitive operations (email dispatch, writes)',
          'LangSmith distributed tracing capturing latency and token spend',
          'Automated Ragas evaluation test suite enforcing >85% faithfulness'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'gen-c1', label: 'Prompt engineering (Chain-of-thought, Few-shot, XML structuring, System prompts)', checked: false },
        { id: 'gen-c2', label: 'Foundation model API mastery (OpenAI, Anthropic, Gemini, structured outputs)', checked: false },
        { id: 'gen-c3', label: 'Vector embeddings, chunking strategies, and similarity distance metrics', checked: false },
        { id: 'gen-c4', label: 'Vector database administration and indexing (pgvector, Pinecone, ChromaDB)', checked: false },
        { id: 'gen-c5', label: 'RAG architecture (Ingestion, retrieval, context injection, citations)', checked: false },
        { id: 'gen-c6', label: 'Advanced RAG (Hybrid search, Cross-encoder re-ranking, HyDE, Parent-child)', checked: false },
        { id: 'gen-c7', label: 'Tool calling and function execution loops', checked: false },
        { id: 'gen-c8', label: 'Agentic workflows and state machines (LangGraph, CrewAI)', checked: false },
        { id: 'gen-c9', label: 'LLM observability, cost tracking, and automated evaluation (LangSmith, Ragas)', checked: false },
        { id: 'gen-c10', label: 'Production safety guardrails and prompt injection defenses', checked: false }
      ],
      projects: [
        { id: 'gen-cp1', label: '1 Verifiable RAG document assistant with citation chips', checked: false },
        { id: 'gen-cp2', label: '1 Advanced hybrid search assistant with tool calling and re-ranking', checked: false },
        { id: 'gen-cp3', label: '1 Autonomous multi-agent production platform with LangGraph and tracing', checked: false }
      ],
      csFundamentals: [
        { id: 'gen-cs1', label: 'Context window mechanics, attention caching, and tokenization algorithms', checked: false },
        { id: 'gen-cs2', label: 'API idempotency, rate limiting, and asynchronous queuing for slow inference', checked: false },
        { id: 'gen-cs3', label: 'Algorithms and Data Structures for GenAI technical rounds', checked: false, link: 'dsa.html' }
      ],
      career: [
        { id: 'gen-car1', label: 'Tailor resume for GenAI / LLM Engineer roles in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'gen-car2', label: 'Showcase agent architectures and live demos on GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'gen-car3', label: 'Practice core algorithmic problem-solving in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // 6. DEVOPS ENGINEER
  // =========================================================================
  'devops': {
    roleId: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Automate CI/CD pipelines, containerize multi-service applications, provision cloud infrastructure as code, and ensure 99.99% system availability.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Linux systems administration, shell scripting, networking, and Git workflows.',
        skills: [
          {
            id: 'ops-linux',
            title: 'Linux Systems Administration & Bash Scripting',
            category: 'Operating Systems',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Linux', 'Ubuntu / Debian', 'Bash', 'systemd', 'SSH', 'cron'],
            whatToLearn: [
              'File system hierarchy, permissions (chmod, chown), and user administration',
              'Process management (ps, top, htop, kill) and background services with systemd',
              'Writing automated Bash shell scripts with arguments, pipes, and error handling',
              'SSH key generation, remote tunneling, and scheduled cron jobs'
            ],
            whyItMatters: 'Virtually all cloud servers, containers, and Kubernetes pods run on Linux. Deep Linux mastery is the first rule of DevOps.',
            aiRelevance: 'AI can write bash commands quickly, but you must know how to inspect piped commands to prevent catastrophic data deletion.',
            resources: [],
            practice: 'Write an automated Bash script that backups database dumps, compresses them, and rotates old archives.'
          },
          {
            id: 'ops-networking',
            title: 'Computer Networking & Protocols',
            category: 'Networking',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'Subnets', 'Firewalls (iptables / UFW)'],
            whatToLearn: [
              'OSI model and TCP/IP stack layers',
              'DNS record types (A, CNAME, MX, TXT) and domain routing propagation',
              'IP addressing, CIDR subnetting, and port allocations',
              'Configuring basic firewall rules and SSL/TLS certificates (Let\'s Encrypt)'
            ],
            whyItMatters: 'Infrastructure engineers debug connectivity, firewalls, and DNS daily.',
            aiRelevance: 'AI tools can help visualize subnet masks and diagnose traceroute packet loss.',
            resources: [],
            practice: 'Set up an Nginx reverse proxy with automated Let\'s Encrypt SSL certificate renewal.'
          },
          {
            id: 'ops-git',
            title: 'Git Workflows & Version Control',
            category: 'Version Control',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '1 week',
            importance: 'essential',
            technologies: ['Git', 'GitHub / GitLab', 'Trunk-Based Development', 'SemVer'],
            whatToLearn: ['Branching strategies', 'Semantic versioning and Git tags', 'Handling merge conflicts and rebases'],
            whyItMatters: 'Infrastructure as Code and CI/CD triggers are strictly rooted in Git commits.',
            aiRelevance: 'AI automates Git commit messages and changelogs.',
            resources: [],
            practice: 'Configure branch protection rules requiring status checks and PR approvals.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Docker containerization, CI/CD automation, and cloud fundamentals.',
        skills: [
          {
            id: 'ops-docker',
            title: 'Docker Containerization & Optimization',
            category: 'Containers',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['ops-linux'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Docker', 'Dockerfile', 'Docker Compose', 'Multi-Stage Builds', 'Security'],
            whatToLearn: [
              'Container runtimes, namespaces, cgroups, and image layers',
              'Writing minimal multi-stage Dockerfiles (Alpine, distroless) for small footprint',
              'Docker networking, volume mounts, and secret management',
              'Scanning container images for vulnerabilities (Trivy)'
            ],
            whyItMatters: 'Docker is the universal packaging standard for modern cloud deployments.',
            aiRelevance: 'AI can optimize Docker layer ordering for maximum build caching.',
            resources: [],
            practice: 'Package a multi-service web app into secure, non-root multi-stage Docker images under 100MB.'
          },
          {
            id: 'ops-cicd',
            title: 'Continuous Integration & Delivery (CI/CD)',
            category: 'CI/CD',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['ops-git', 'ops-docker'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['GitHub Actions', 'GitLab CI', 'Workflows', 'Secrets', 'Automated Testing'],
            whatToLearn: [
              'Writing declarative CI/CD pipeline YAML workflows',
              'Automating linting, unit testing, and Docker image builds on pull requests',
              'Managing repository secrets and environment protection rules',
              'Publishing container images to container registries (GHCR, Docker Hub, ECR)'
            ],
            whyItMatters: 'CI/CD automates manual release chores, preventing human deployment errors and enabling multiple daily releases.',
            aiRelevance: 'AI excels at writing CI/CD matrix build configurations and deployment scripts.',
            resources: [],
            practice: 'Build a complete GitHub Actions pipeline that lints, tests, builds a Docker image, and pushes to a registry on tag release.'
          },
          {
            id: 'ops-cloud-core',
            title: 'Cloud Fundamentals (AWS / GCP)',
            category: 'Cloud',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['ops-networking'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['AWS (EC2, S3, IAM, VPC)', 'GCP', 'Cloud Security'],
            whatToLearn: [
              'Virtual machines (EC2 / Compute Engine) and object storage (S3 / Cloud Storage)',
              'Identity and Access Management (IAM): Least-privilege roles, policies, and keys',
              'Virtual Private Cloud (VPC): Public/private subnets, internet gateways, and security groups',
              'Cloud cost monitoring and billing alerts'
            ],
            whyItMatters: 'Modern DevOps is cloud-centric; engineers must know how core cloud compute and networking operate.',
            aiRelevance: 'AI can audit IAM policies for overly permissive wildcard (`"*"`) security risks.',
            resources: [],
            practice: 'Deploy a secure VPC on AWS with isolated private subnets and a public bastion host.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Kubernetes container orchestration and Infrastructure as Code (Terraform).',
        skills: [
          {
            id: 'ops-kubernetes',
            title: 'Kubernetes Container Orchestration',
            category: 'Orchestration',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['ops-docker', 'ops-cloud-core'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['Kubernetes (k8s)', 'Pods', 'Deployments', 'Services', 'Ingress', 'Helm', 'ConfigMaps'],
            whatToLearn: [
              'Kubernetes control plane vs worker nodes architecture',
              'Core primitives: Pods, ReplicaSets, Deployments, and DaemonSets',
              'Networking: ClusterIP, NodePort, LoadBalancer, and Ingress controllers',
              'ConfigMaps, Secrets, and persistent volume claims (PVC)',
              'Package management with Helm charts and templating'
            ],
            whyItMatters: 'Kubernetes is the standard operating system of cloud-native infrastructure at scale.',
            aiRelevance: 'AI can draft complex Kubernetes YAML manifests and Helm chart value files.',
            resources: [],
            practice: 'Deploy a multi-replica web application with zero-downtime rolling updates and Ingress routing in Kubernetes.'
          },
          {
            id: 'ops-terraform',
            title: 'Infrastructure as Code (Terraform)',
            category: 'IaC',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['ops-cloud-core'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Terraform', 'HCL', 'State Management', 'Modules', 'Cloud Providers'],
            whatToLearn: [
              'Declarative infrastructure modeling using HashiCorp Configuration Language (HCL)',
              'Terraform state management (remote S3 backend, state locking with DynamoDB)',
              'Writing reusable, parameterized Terraform modules',
              'Terraform plan, apply, destroy lifecycle, and drift detection'
            ],
            whyItMatters: 'Manual cloud console configuration is unrepeatable. Terraform enables automated, version-controlled cloud environments.',
            aiRelevance: 'AI generates boilerplate Terraform HCL code rapidly, though state lock management requires human care.',
            resources: [],
            practice: 'Write modular Terraform code that provisions a complete cloud VPC, database, and container cluster.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Observability, GitOps, cloud security, and MLOps / AI deployment pipelines.',
        skills: [
          {
            id: 'ops-observability',
            title: 'Observability, Monitoring & Alerting',
            category: 'Observability',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['ops-kubernetes'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'Loki', 'OpenTelemetry'],
            whatToLearn: [
              'The 3 pillars of observability: Metrics, Logs, Traces',
              'Scraping application and cluster metrics with Prometheus',
              'Building operational dashboards in Grafana',
              'Configuring proactive alerts (PagerDuty, Slack) with Alertmanager',
              'Distributed tracing across microservices with OpenTelemetry'
            ],
            whyItMatters: 'DevOps engineers are measured by Mean Time To Detection (MTTD) and Mean Time To Resolution (MTTR).',
            aiRelevance: 'AI log summarization tools synthesize incident root causes from thousands of clustered error logs.',
            resources: [],
            practice: 'Deploy Prometheus and Grafana on a Kubernetes cluster and set up latency threshold alerts.'
          },
          {
            id: 'ops-gitops',
            title: 'GitOps & Continuous Deployment (ArgoCD)',
            category: 'Continuous Deployment',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['ops-kubernetes', 'ops-cicd'],
            estimatedTime: '2 weeks',
            importance: 'recommended',
            technologies: ['ArgoCD', 'GitOps', 'Canary Releases', 'Argo Rollouts'],
            whatToLearn: [
              'The GitOps philosophy: Git as the single source of truth for declared infrastructure state',
              'Automated synchronization and drift self-healing with ArgoCD',
              'Advanced deployment strategies: Blue/Green and Canary releases with automated rollbacks'
            ],
            whyItMatters: 'GitOps provides complete auditability, instant rollbacks, and eliminates manual cluster kubectl access.',
            aiRelevance: 'AI can audit GitOps diffs to warn about breaking configuration drift before synchronization.',
            resources: [],
            practice: 'Set up ArgoCD to automatically deploy updates to a Kubernetes cluster when changes are merged to a Git repo.'
          },
          {
            id: 'ops-mlops-basics',
            title: 'MLOps & AI Infrastructure Fundamentals',
            category: 'AI Infrastructure',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['ops-kubernetes', 'ops-docker'],
            estimatedTime: '2-3 weeks',
            importance: 'recommended',
            technologies: ['NVIDIA Container Toolkit', 'GPU Sharing', 'KServe', 'Model Registries', 'Ray'],
            whatToLearn: [
              'GPU scheduling and pass-through in Docker and Kubernetes',
              'Model deployment patterns and model storage registries',
              'CI/CD pipelines for machine learning models and dataset versioning',
              'Monitoring inference latency and GPU memory saturation'
            ],
            whyItMatters: 'AI models require specialized GPU hardware orchestration and high-throughput model serving pipelines.',
            aiRelevance: 'Directly bridges standard DevOps with AI engineering infrastructure.',
            resources: [],
            practice: 'Configure a Kubernetes node with GPU acceleration and deploy an inference container with auto-scaling.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Production infrastructure capstone projects and DevOps interview checklist.',
        skills: [
          {
            id: 'ops-proj-beginner',
            title: 'Beginner Milestone: Production Docker CI/CD Pipeline',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['ops-docker', 'ops-cicd'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['Docker', 'GitHub Actions', 'Linux', 'Bash'],
            whatToLearn: ['Automated testing and linting in CI', 'Multi-stage Docker build and vulnerability scan', 'Registry publishing'],
            whyItMatters: 'Demonstrates baseline automated delivery pipeline skills.',
            aiRelevance: 'AI can write initial workflow templates.',
            resources: [],
            practice: 'Build a production CI/CD pipeline that lints, scans, and publishes Docker containers.'
          },
          {
            id: 'ops-proj-intermediate',
            title: 'Intermediate Milestone: Terraform Cloud Infrastructure with Observability',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['ops-terraform', 'ops-observability'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Terraform', 'AWS', 'Prometheus', 'Grafana', 'Docker'],
            whatToLearn: ['Modular Terraform provisioning', 'Prometheus/Grafana dashboard setup', 'Automated health alerting'],
            whyItMatters: 'Proves you can provision and monitor real cloud infrastructure as code.',
            aiRelevance: 'AI helps validate Terraform variable definitions.',
            resources: [],
            practice: 'Provision cloud infrastructure with Terraform and monitor service health with Prometheus.'
          },
          {
            id: 'ops-proj-production',
            title: 'Job-Ready Milestone: Enterprise Kubernetes GitOps Platform with ArgoCD',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['ops-kubernetes', 'ops-gitops', 'ops-mlops-basics'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['Kubernetes', 'ArgoCD', 'Helm', 'Terraform', 'Prometheus', 'GitHub Actions'],
            whatToLearn: [
              'Complete Kubernetes cluster provisioned via Terraform',
              'GitOps deployment pipeline with ArgoCD and Helm',
              'Canary deployments with automated rollback on error spikes',
              'Full Prometheus/Grafana cluster monitoring and alerting'
            ],
            whyItMatters: 'The definitive capstone demonstrating enterprise platform engineering capabilities.',
            aiRelevance: 'Includes GPU node provisioning and AI model serving infrastructure.',
            resources: [],
            practice: 'Build and deploy a complete self-healing Kubernetes GitOps platform with automated canary rollouts.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'ops-p1',
        title: 'Hardened Docker Container CI/CD Pipeline',
        type: 'Beginner',
        description: 'An automated GitHub Actions CI/CD pipeline that enforces linting, runs test suites, scans for vulnerabilities with Trivy, and publishes minimal multi-stage Docker images.',
        technologies: ['GitHub Actions', 'Docker', 'Trivy', 'Bash'],
        deliverables: [
          'GitHub Actions workflow with automated test runs',
          'Vulnerability scanning step failing on CRITICAL CVEs',
          'Multi-stage Dockerfile producing a minimal secure image',
          'Automated semantic version tagging and registry push'
        ]
      },
      {
        id: 'ops-p2',
        title: 'Terraform Multi-Tier Cloud Infrastructure with Monitoring',
        type: 'Intermediate',
        description: 'Complete Infrastructure as Code project in Terraform provisioning a cloud VPC, container cluster, database, and Prometheus/Grafana monitoring suite.',
        technologies: ['Terraform', 'AWS', 'Prometheus', 'Grafana', 'Docker'],
        deliverables: [
          'Modular Terraform codebase with remote S3 state locking',
          'VPC with public and private subnets and security groups',
          'Prometheus metrics scraper and Grafana operational dashboard',
          'Configured alerting rules dispatching to Slack / Discord'
        ]
      },
      {
        id: 'ops-p3',
        title: 'Production Kubernetes GitOps Platform with ArgoCD',
        type: 'Production / Job-Ready',
        description: 'An enterprise cloud-native deployment platform utilizing Kubernetes, Helm charts, ArgoCD GitOps synchronization, Canary deployments, and GPU node integration.',
        technologies: ['Kubernetes', 'ArgoCD', 'Helm', 'Terraform', 'Prometheus', 'Grafana'],
        deliverables: [
          'Production Kubernetes cluster configuration with Ingress and TLS',
          'ArgoCD automated GitOps synchronization and drift detection',
          'Canary rollout strategy with automated rollback on error thresholds',
          'Complete observability suite tracking cluster and pod utilization'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'ops-c1', label: 'Linux systems administration (Process management, networking, bash scripting)', checked: false },
        { id: 'ops-c2', label: 'Docker containerization, multi-stage builds, and image security scanning', checked: false },
        { id: 'ops-c3', label: 'CI/CD pipeline automation (GitHub Actions / GitLab CI, automated testing)', checked: false },
        { id: 'ops-c4', label: 'Cloud fundamentals (Compute, storage, IAM least privilege, VPC networking)', checked: false },
        { id: 'ops-c5', label: 'Kubernetes orchestration (Deployments, Services, Ingress, Helm, ConfigMaps)', checked: false },
        { id: 'ops-c6', label: 'Infrastructure as Code with Terraform (State management, reusable modules)', checked: false },
        { id: 'ops-c7', label: 'Observability & Monitoring (Prometheus metrics, Grafana dashboards, Alerting)', checked: false },
        { id: 'ops-c8', label: 'GitOps and continuous deployment with ArgoCD and Canary releases', checked: false },
        { id: 'ops-c9', label: 'MLOps basics (GPU provisioning, model containerization, inference monitoring)', checked: false }
      ],
      projects: [
        { id: 'ops-cp1', label: '1 Automated Docker CI/CD pipeline with security scanning', checked: false },
        { id: 'ops-cp2', label: '1 Terraform infrastructure provisioning project with monitoring', checked: false },
        { id: 'ops-cp3', label: '1 Production Kubernetes GitOps platform with ArgoCD and Canary rollouts', checked: false }
      ],
      csFundamentals: [
        { id: 'ops-cs1', label: 'Operating system kernel internals (Namespaces, cgroups, file descriptors)', checked: false },
        { id: 'ops-cs2', label: 'Computer networking (TCP 3-way handshake, DNS routing, subnetting, TLS)', checked: false },
        { id: 'ops-cs3', label: 'High-availability and disaster recovery architectures', checked: false }
      ],
      career: [
        { id: 'ops-car1', label: 'Tailor resume for DevOps / Platform Engineer in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'ops-car2', label: 'Audit Terraform and CI/CD code in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'ops-car3', label: 'Review core systems interview questions in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // 7. CLOUD ENGINEER
  // =========================================================================
  'cloud': {
    roleId: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Architect secure, fault-tolerant, scalable cloud infrastructure across compute, storage, networking, serverless, and cloud-native services.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Cloud computing concepts, virtualization, networking, and Linux administration.',
        skills: [
          {
            id: 'cld-linux-net',
            title: 'Linux Administration & Cloud Networking Fundamentals',
            category: 'Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Linux', 'Bash', 'TCP/IP', 'CIDR Subnetting', 'DNS', 'Routing'],
            whatToLearn: ['Linux CLI navigation and remote management via SSH', 'CIDR notation and IP subnetting calculations', 'DNS records and resolution workflows', 'Firewalls and network access control lists (NACLs)'],
            whyItMatters: 'Virtual networks in AWS, Azure, and GCP operate directly on foundational networking and Linux operating principles.',
            aiRelevance: 'AI can assist with complex subnet calculations and CIDR block allocations.',
            resources: [],
            practice: 'Calculate a non-overlapping multi-tier subnet scheme for a high-availability cloud architecture.'
          },
          {
            id: 'cld-concepts',
            title: 'Cloud Concepts, Economics & Service Models',
            category: 'Foundations',
            level: 'beginner',
            levelNum: 1,
            prerequisites: [],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['IaaS', 'PaaS', 'SaaS', 'Shared Responsibility Model', 'High Availability'],
            whatToLearn: ['IaaS vs PaaS vs SaaS trade-offs', 'The Cloud Shared Responsibility Model', 'Regions, Availability Zones (AZs), and Edge locations', 'Cloud financial management (FinOps) and cost drivers'],
            whyItMatters: 'Every cloud architectural decision balances cost, redundancy, and management overhead.',
            aiRelevance: 'Use AI to model cloud monthly cost estimates across different VM types.',
            resources: [],
            practice: 'Create a cloud architecture cost projection comparing reserved instances vs on-demand compute.'
          }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Core cloud services (Compute, Storage, Networking, IAM).',
        skills: [
          {
            id: 'cld-iam',
            title: 'Cloud Identity & Access Management (IAM)',
            category: 'Security',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['cld-concepts'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['IAM Policies', 'Roles', 'MFA', 'Least Privilege', 'Service Accounts'],
            whatToLearn: [
              'Principle of Least Privilege (PoLP)',
              'Writing declarative JSON IAM policies (Effect, Action, Resource, Condition)',
              'IAM Roles vs Users vs Groups, and cross-account role assumption',
              'Multi-Factor Authentication (MFA) and access key rotation'
            ],
            whyItMatters: 'Over-permissive IAM permissions are the single most common cause of cloud security breaches.',
            aiRelevance: 'AI tools can parse JSON IAM policies and flag wildcard security exposures.',
            resources: [],
            practice: 'Write least-privilege IAM policies for an application that only needs read access to a specific S3 bucket.'
          },
          {
            id: 'cld-compute-storage',
            title: 'Cloud Compute & Storage Services',
            category: 'Infrastructure',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['cld-iam'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['AWS EC2', 'S3', 'EBS', 'EFS', 'Auto Scaling', 'Load Balancers (ALB)'],
            whatToLearn: [
              'Virtual machine sizing, AMIs, spot vs reserved vs on-demand instances',
              'Block storage (EBS) vs Object storage (S3) vs File storage (EFS)',
              'S3 bucket policies, versioning, lifecycle policies, and encryption at rest (KMS)',
              'Auto Scaling Groups (ASG) and Application Load Balancers (ALB)'
            ],
            whyItMatters: 'Compute and storage represent the core operating engines and data vaults of all cloud workloads.',
            aiRelevance: 'AI helps optimize S3 lifecycle transition rules to archive cold data into Glacier.',
            resources: [],
            practice: 'Configure an Auto Scaling Group behind an Application Load Balancer with automated health checks.'
          },
          {
            id: 'cld-vpc',
            title: 'Virtual Private Cloud (VPC) Architecture',
            category: 'Networking',
            level: 'intermediate',
            levelNum: 2,
            prerequisites: ['cld-linux-net', 'cld-iam'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['VPC', 'Subnets', 'Route Tables', 'Internet Gateway', 'NAT Gateway', 'Security Groups'],
            whatToLearn: [
              'Architecting custom VPCs across multiple Availability Zones',
              'Public subnets vs Private subnets vs Isolated database subnets',
              'Internet Gateways (IGW) and NAT Gateways for outbound internet traffic',
              'Stateful Security Groups vs Stateless Network ACLs (NACLs)'
            ],
            whyItMatters: 'VPC design isolates enterprise assets from the public internet and prevents unauthorized lateral movement.',
            aiRelevance: 'AI can validate routing tables and diagnose NAT gateway traffic bottlenecks.',
            resources: [],
            practice: 'Build a multi-AZ VPC with isolated database subnets and a secure NAT gateway.'
          }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Serverless compute, managed databases, and Infrastructure as Code.',
        skills: [
          {
            id: 'cld-databases',
            title: 'Managed Cloud Databases & Caching',
            category: 'Databases',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['cld-vpc'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['AWS RDS (Postgres/MySQL)', 'DynamoDB', 'ElastiCache (Redis)', 'Aurora'],
            whatToLearn: [
              'Relational managed databases (RDS / Aurora): Multi-AZ replication and Read Replicas',
              'Automated database backups, point-in-time recovery, and snapshots',
              'Serverless NoSQL scaling with DynamoDB (Partition keys, Sort keys, GSI)',
              'In-memory caching with ElastiCache Redis'
            ],
            whyItMatters: 'Managed database services offload patching and high-availability replication to cloud providers.',
            aiRelevance: 'AI tools can calculate DynamoDB capacity planning and RCU/WCU requirements.',
            resources: [],
            practice: 'Deploy an Aurora PostgreSQL database with automated multi-AZ failover and read replicas.'
          },
          {
            id: 'cld-serverless',
            title: 'Serverless Compute & Event-Driven Architecture',
            category: 'Compute',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['cld-iam'],
            estimatedTime: '2-3 weeks',
            importance: 'essential',
            technologies: ['AWS Lambda', 'API Gateway', 'SQS', 'SNS', 'EventBridge'],
            whatToLearn: [
              'Event-driven serverless computing with AWS Lambda / Google Cloud Functions',
              'REST and HTTP API Gateway configuration with authorizers',
              'Decoupling systems with SQS queues and SNS pub/sub topics',
              'Event-driven orchestration with EventBridge'
            ],
            whyItMatters: 'Serverless architectures scale to zero cost when idle and automatically scale to millions of requests without managing servers.',
            aiRelevance: 'Serverless functions are ideal for lightweight AI API proxying and document preprocessing.',
            resources: [],
            practice: 'Build a serverless image thumbnailing pipeline triggered by S3 uploads via Lambda and SQS.'
          },
          {
            id: 'cld-iac',
            title: 'Infrastructure as Code (Terraform / AWS CDK)',
            category: 'Automation',
            level: 'intermediate',
            levelNum: 3,
            prerequisites: ['cld-compute-storage', 'cld-vpc'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['Terraform', 'AWS CDK / CloudFormation', 'State Management', 'Modules'],
            whatToLearn: [
              'Codifying entire cloud environments in reusable Terraform HCL or AWS CDK (TypeScript)',
              'Managing remote state storage and locking',
              'Parameterizing environments (dev, staging, prod) via modular configurations',
              'Automated infrastructure validation in CI/CD'
            ],
            whyItMatters: 'Industry standard for reproducible, audit-proof enterprise cloud environments.',
            aiRelevance: 'AI can generate complete Terraform resource configurations in seconds.',
            resources: [],
            practice: 'Provision an entire multi-tier web application stack using modular Terraform code.'
          }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Managed Kubernetes (EKS), cloud security governance, FinOps, and AI cloud infrastructure.',
        skills: [
          {
            id: 'cld-containers-eks',
            title: 'Managed Containers (ECS / EKS)',
            category: 'Containers',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['cld-vpc', 'cld-iac'],
            estimatedTime: '3 weeks',
            importance: 'essential',
            technologies: ['AWS ECS (Fargate)', 'AWS EKS (Kubernetes)', 'Container Registries (ECR)'],
            whatToLearn: [
              'Serverless container execution with AWS Fargate',
              'Deploying managed Kubernetes with AWS EKS or GCP GKE',
              'Ingress controllers, ALB integration, and IAM roles for service accounts (IRSA)',
              'Cluster autoscaling and node group management'
            ],
            whyItMatters: 'Managed Kubernetes is the standard hosting environment for enterprise microservices.',
            aiRelevance: 'EKS is the primary deployment target for enterprise AI inference clusters.',
            resources: [],
            practice: 'Deploy an Elastic Kubernetes Service (EKS) cluster with Fargate serverless node execution.'
          },
          {
            id: 'cld-ai-infra',
            title: 'Cloud AI Infrastructure & GPU Management',
            category: 'AI Infrastructure',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['cld-compute-storage', 'cld-containers-eks'],
            estimatedTime: '2-3 weeks',
            importance: 'recommended',
            technologies: ['AWS SageMaker', 'GPU Instances (p4d/g5)', 'Model Endpoints', 'Cost Optimization'],
            whatToLearn: [
              'Cloud GPU instance families (NVIDIA A100, H100, L4) and availability',
              'Deploying managed model endpoints with AWS SageMaker / Vertex AI',
              'Auto-scaling inference endpoints based on concurrency queues',
              'Managing storage throughput for large model checkpoints (EFS / S3 Express)'
            ],
            whyItMatters: 'Companies are investing millions into cloud AI; engineers who understand GPU infrastructure and cost control are irreplaceable.',
            aiRelevance: 'Directly powers enterprise foundation model deployment on the cloud.',
            resources: [],
            practice: 'Deploy an auto-scaling open-source LLM endpoint on cloud GPU instances with cost budget caps.'
          },
          {
            id: 'cld-security-finops',
            title: 'Cloud Security Governance, Compliance & FinOps',
            category: 'Governance & Cost',
            level: 'advanced',
            levelNum: 4,
            prerequisites: ['cld-iam', 'cld-iac'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['AWS Security Hub', 'AWS GuardDuty', 'AWS WAF', 'Cost Explorer', 'FinOps'],
            whatToLearn: [
              'Continuous security auditing with AWS Security Hub and GuardDuty',
              'Web Application Firewalls (WAF) to block DDoS and malicious traffic',
              'Data encryption at rest and in transit using customer-managed KMS keys',
              'FinOps strategies: Savings Plans, Reserved Instances, and right-sizing analysis'
            ],
            whyItMatters: 'Ensures cloud platforms satisfy regulatory compliance (SOC2, HIPAA, ISO) while preventing runaway cloud bills.',
            aiRelevance: 'AI analysis tools detect anomalous billing spikes and unauthorized security configuration changes.',
            resources: [],
            practice: 'Conduct a cloud security audit and implement WAF rate limiting rules on an active load balancer.'
          }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Comprehensive cloud architecture capstone projects and certification readiness.',
        skills: [
          {
            id: 'cld-proj-beginner',
            title: 'Beginner Milestone: High-Availability Web App on AWS',
            category: 'Projects',
            level: 'beginner',
            levelNum: 5,
            prerequisites: ['cld-compute-storage', 'cld-vpc'],
            estimatedTime: '2 weeks',
            importance: 'essential',
            technologies: ['AWS EC2', 'ALB', 'Auto Scaling', 'S3', 'RDS'],
            whatToLearn: ['Deploying a multi-AZ web tier behind an Application Load Balancer', 'Connecting to a private RDS database', 'Automated auto-scaling under simulated CPU load'],
            whyItMatters: 'Demonstrates core understanding of resilient cloud infrastructure.',
            aiRelevance: 'Basic foundational cloud architecture.',
            resources: [],
            practice: 'Build and load-test a multi-AZ web application on AWS with automated instance failover.'
          },
          {
            id: 'cld-proj-intermediate',
            title: 'Intermediate Milestone: Serverless Microservices Pipeline in Terraform',
            category: 'Projects',
            level: 'intermediate',
            levelNum: 5,
            prerequisites: ['cld-serverless', 'cld-iac'],
            estimatedTime: '3-4 weeks',
            importance: 'essential',
            technologies: ['Terraform', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'SQS'],
            whatToLearn: ['Codifying an entire event-driven serverless application in Terraform', 'Asynchronous message processing with SQS and Lambda', 'Zero-server maintenance architecture'],
            whyItMatters: 'Proves mastery of Infrastructure as Code and modern cloud-native serverless patterns.',
            aiRelevance: 'Serverless functions can integrate lightweight AI model inference calls.',
            resources: [],
            practice: 'Provision a complete serverless event-driven API using Terraform.'
          },
          {
            id: 'cld-proj-production',
            title: 'Job-Ready Milestone: Multi-Region Enterprise Cloud Platform with AI Inference',
            category: 'Projects',
            level: 'advanced',
            levelNum: 5,
            prerequisites: ['cld-containers-eks', 'cld-ai-infra', 'cld-security-finops'],
            estimatedTime: '4 weeks',
            importance: 'essential',
            technologies: ['AWS EKS', 'Terraform', 'SageMaker / vLLM', 'WAF', 'CloudWatch'],
            whatToLearn: [
              'Enterprise Kubernetes cluster provisioned entirely via Terraform',
              'Auto-scaling GPU inference endpoints integrated with an Application Load Balancer',
              'Complete security hardening with WAF, IAM IRSA, and KMS encryption',
              'Operational monitoring dashboard tracking cost and p99 latency'
            ],
            whyItMatters: 'The definitive cloud engineering portfolio project proving you can architect enterprise-grade cloud platforms.',
            aiRelevance: 'Includes auto-scaling cloud AI model inference architecture.',
            resources: [],
            practice: 'Deploy an enterprise-grade cloud platform in Terraform supporting containerized microservices and AI model endpoints.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'cld-p1',
        title: 'High-Availability Multi-AZ Cloud Web Architecture',
        type: 'Beginner',
        description: 'A resilient, fault-tolerant web application deployment across multiple availability zones using an Application Load Balancer, Auto Scaling Group, and Amazon RDS.',
        technologies: ['AWS VPC', 'EC2', 'ALB', 'Auto Scaling', 'RDS PostgreSQL'],
        deliverables: [
          'Multi-AZ VPC with public and private subnets',
          'Application Load Balancer distributing traffic across EC2 instances',
          'Auto Scaling Group dynamically scaling instances based on CPU utilization',
          'Encrypted RDS PostgreSQL database located in isolated private subnets'
        ]
      },
      {
        id: 'cld-p2',
        title: 'Serverless Event-Driven Processing Engine in Terraform',
        type: 'Intermediate',
        description: 'An asynchronous serverless backend built with AWS Lambda, API Gateway, SQS queues, and DynamoDB, codified entirely in modular Terraform.',
        technologies: ['Terraform', 'AWS Lambda', 'API Gateway', 'SQS', 'DynamoDB'],
        deliverables: [
          'Modular Terraform codebase provisioning all serverless resources',
          'HTTP API Gateway forwarding requests to Lambda functions',
          'Asynchronous background processing via SQS queue and dead-letter queue (DLQ)',
          'DynamoDB table with fine-grained partition and sort key indexing'
        ]
      },
      {
        id: 'cld-p3',
        title: 'Enterprise Kubernetes & AI Inference Platform',
        type: 'Production / Job-Ready',
        description: 'An enterprise cloud platform featuring managed Kubernetes (EKS), auto-scaling GPU model endpoints, AWS WAF security protection, and comprehensive cost governance.',
        technologies: ['AWS EKS', 'Terraform', 'Docker', 'AWS WAF', 'KMS', 'CloudWatch'],
        deliverables: [
          'Terraform-managed EKS cluster with autoscaling node groups',
          'GPU inference deployment for open-source AI models',
          'WAF protection mitigating OWASP Top 10 web vulnerabilities',
          'CloudWatch dashboard tracking p99 request latency and cost budget metrics'
        ]
      }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'cld-c1', label: 'Cloud networking architecture (VPC, CIDR, subnets, route tables, NAT gateways)', checked: false },
        { id: 'cld-c2', label: 'Cloud security & IAM (Principle of least privilege, JSON policies, roles, MFA)', checked: false },
        { id: 'cld-c3', label: 'Compute & storage services (EC2, Auto Scaling, Load Balancers, S3, EBS)', checked: false },
        { id: 'cld-c4', label: 'Managed database architecture (RDS multi-AZ failover, read replicas, DynamoDB)', checked: false },
        { id: 'cld-c5', label: 'Serverless event-driven architecture (Lambda, API Gateway, SQS, SNS)', checked: false },
        { id: 'cld-c6', label: 'Infrastructure as Code mastery with Terraform (State management, modules)', checked: false },
        { id: 'cld-c7', label: 'Containerized orchestration with ECS / EKS and Fargate', checked: false },
        { id: 'cld-c8', label: 'Cloud AI infrastructure & GPU endpoint management (SageMaker / Vertex AI)', checked: false },
        { id: 'cld-c9', label: 'Cloud security governance, compliance (SOC2/HIPAA), WAF, and FinOps', checked: false }
      ],
      projects: [
        { id: 'cld-cp1', label: '1 High-availability multi-AZ compute and database infrastructure', checked: false },
        { id: 'cld-cp2', label: '1 Serverless event-driven architecture codified in Terraform', checked: false },
        { id: 'cld-cp3', label: '1 Production Kubernetes & AI inference cloud platform with WAF and monitoring', checked: false }
      ],
      csFundamentals: [
        { id: 'cld-cs1', label: 'Distributed consensus, CAP theorem, and event consistency models', checked: false },
        { id: 'cld-cs2', label: 'Network routing, BGP, DNS latency routing, and CDN edge networks', checked: false },
        { id: 'cld-cs3', label: 'Algorithms and Data Structures relevant to cloud platforms', checked: false, link: 'dsa.html' }
      ],
      career: [
        { id: 'cld-car1', label: 'Prepare Cloud Architecture resume in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'cld-car2', label: 'Publish modular Terraform blueprints to GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'cld-car3', label: 'Review cloud systems interview topics in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  // =========================================================================
  // REMAINING 13 STRUCTURED ROLES (Scalable architecture)
  // =========================================================================
  'data-analyst': {
    roleId: 'data-analyst',
    title: 'Data Analyst',
    description: 'Master advanced SQL, data wrangling with Python, business intelligence dashboards (Tableau/Power BI), and data storytelling.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Spreadsheet analytics, business statistics, and relational SQL foundations.',
        skills: [
          { id: 'da-excel', title: 'Advanced Excel & Data Modeling', category: 'Spreadsheets', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '2 weeks', importance: 'essential', technologies: ['Excel', 'Pivot Tables', 'VLOOKUP / XLOOKUP', 'Power Query'], whatToLearn: ['Data cleansing', 'Pivot tables and calculated fields', 'XLOOKUP and dynamic arrays'], whyItMatters: 'Excel remains the universal lingua franca of business reporting.', aiRelevance: 'AI can write Excel formulas and macros automatically.', resources: [], practice: 'Build an automated monthly sales reconciler in Excel.' },
          { id: 'da-stats', title: 'Applied Business Statistics', category: 'Statistics', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '2 weeks', importance: 'essential', technologies: ['Descriptive Stats', 'Hypothesis Testing', 'A/B Testing'], whatToLearn: ['Mean, median, standard deviation', 'Correlation vs causation', 'Confidence intervals and p-values'], whyItMatters: 'Prevents making false business conclusions from random noise.', aiRelevance: 'AI assists with calculating p-values and confidence intervals.', resources: [], practice: 'Analyze an A/B test dataset to determine if a website conversion lift was statistically significant.' },
          { id: 'da-sql-basic', title: 'SQL Fundamentals & Querying', category: 'SQL', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['SQL', 'SELECT', 'WHERE', 'JOINs', 'GROUP BY'], whatToLearn: ['Filtering and aggregations', 'Multi-table INNER and LEFT JOINs', 'Subqueries and CASE statements'], whyItMatters: 'SQL is the primary query language for every data warehouse on Earth.', aiRelevance: 'AI writes basic SQL; you must understand schema semantics to verify results.', resources: [], practice: 'Query a retail database to find top-performing categories by quarter.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Advanced SQL, Python data manipulation, and exploratory data analysis.',
        skills: [
          { id: 'da-sql-adv', title: 'Advanced SQL: Window Functions & CTEs', category: 'SQL', level: 'intermediate', levelNum: 2, prerequisites: ['da-sql-basic'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Window Functions', 'RANK', 'LAG/LEAD', 'CTEs'], whatToLearn: ['Window functions (ROW_NUMBER, DENSE_RANK, LAG, LEAD)', 'Common Table Expressions (WITH clauses)', 'Running totals and moving averages'], whyItMatters: 'Window functions solve complex analytical queries without slow self-joins.', aiRelevance: 'AI generates CTE structures cleanly.', resources: [], practice: 'Calculate month-over-month customer retention cohorts using window functions.' },
          { id: 'da-python', title: 'Python for Data Analysis (Pandas & NumPy)', category: 'Python', level: 'intermediate', levelNum: 2, prerequisites: ['da-sql-basic'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Python', 'Pandas', 'NumPy', 'Jupyter'], whatToLearn: ['DataFrame transformations', 'Handling missing values and duplicates', 'Merging and reshaping datasets'], whyItMatters: 'Python automates complex multi-step data pipelines that Excel cannot handle.', aiRelevance: 'AI acts as a copilot for writing Pandas syntax and regex parsing.', resources: [], practice: 'Build a Python script that ingests, cleans, and merges multiple disparate CSV files.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Data visualization, business intelligence dashboards, and KPI design.',
        skills: [
          { id: 'da-bi', title: 'BI Dashboards: Tableau / Power BI', category: 'BI Tools', level: 'intermediate', levelNum: 3, prerequisites: ['da-sql-adv'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Tableau', 'Power BI', 'DAX', 'Data Storytelling'], whatToLearn: ['Data modeling and star schemas', 'Interactive dashboard design', 'Writing DAX measures and calculated columns'], whyItMatters: 'Executives consume insights through interactive visual dashboards, not raw SQL queries.', aiRelevance: 'AI recommends effective chart types based on data distributions.', resources: [], practice: 'Build an executive KPI dashboard with date filtering and drill-down capabilities.' },
          { id: 'da-dataviz', title: 'Data Storytelling & Visualization (Seaborn)', category: 'Visualization', level: 'intermediate', levelNum: 3, prerequisites: ['da-python'], estimatedTime: '2 weeks', importance: 'recommended', technologies: ['Matplotlib', 'Seaborn', 'Storytelling'], whatToLearn: ['Visual hierarchy and color theory', 'Distribution plots, boxplots, heatmaps', 'Presenting findings to non-technical stakeholders'], whyItMatters: 'Insights that are not clearly communicated are never acted upon.', aiRelevance: 'AI can summarize visual charts into executive bullet points.', resources: [], practice: 'Create an analytical presentation highlighting customer churn drivers with clear visual proof.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Cloud data warehouses, dbt data modeling, and AI-assisted data analysis.',
        skills: [
          { id: 'da-warehouse', title: 'Cloud Data Warehouses & Analytics Engineering', category: 'Data Warehousing', level: 'advanced', levelNum: 4, prerequisites: ['da-sql-adv'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Snowflake', 'BigQuery', 'dbt', 'Star Schema'], whatToLearn: ['Columnar storage vs row storage', 'Partitioning and clustering for query cost reduction', 'Transforming data models with dbt'], whyItMatters: 'Modern analytics teams work directly inside Snowflake and BigQuery using dbt.', aiRelevance: 'AI assists in converting legacy stored procedures into dbt models.', resources: [], practice: 'Build dimensional dbt models inside BigQuery or Snowflake.' },
          { id: 'da-ai-analytics', title: 'AI-Assisted Analytics & Natural Language SQL', category: 'AI Analytics', level: 'advanced', levelNum: 4, prerequisites: ['da-warehouse'], estimatedTime: '2 weeks', importance: 'recommended', technologies: ['Text-to-SQL', 'LangChain for Tabular Data', 'Automated Insights'], whatToLearn: ['Building Text-to-SQL assistants with strict schema boundaries', 'Automated anomaly detection in time series', 'AI-generated metric summaries'], whyItMatters: 'Empowers self-service business reporting and speeds up exploratory analysis.', aiRelevance: 'Direct application of generative AI to data analytics workflows.', resources: [], practice: 'Build a natural language query tool that translates business questions into validated SQL queries.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'End-to-end data analytics portfolio projects and business presentation readiness.',
        skills: [
          { id: 'da-proj-capstone', title: 'Job-Ready Milestone: End-to-End Business Intelligence Suite', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['da-bi', 'da-warehouse', 'da-ai-analytics'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['SQL', 'Python', 'Tableau / Power BI', 'Snowflake', 'dbt'], whatToLearn: ['End-to-end data pipeline from raw ingestion to executive dashboard', 'Statistical hypothesis verification and business recommendations', 'Public portfolio presentation'], whyItMatters: 'Proves to hiring managers that you can drive measurable business revenue through data insights.', aiRelevance: 'Integrates automated AI metric summarization.', resources: [], practice: 'Publish a comprehensive business case study with an interactive dashboard and reproducible SQL/Python code.' }
        ]
      }
    ],
    projects: [
      { id: 'da-p1', title: 'E-Commerce Sales & Cohort Retention Analysis', type: 'Intermediate', description: 'Advanced SQL cohort analysis analyzing customer retention, lifetime value, and churn drivers.', technologies: ['PostgreSQL', 'SQL', 'Tableau'], deliverables: ['Cohort retention heatmap', 'LTV calculation queries', 'Interactive Tableau dashboard'] },
      { id: 'da-p2', title: 'Enterprise KPI Dashboard & Anomaly Detection', type: 'Production / Job-Ready', description: 'Cloud data warehouse modeling in dbt and Snowflake with an interactive executive KPI dashboard and automated anomaly detection.', technologies: ['Snowflake', 'dbt', 'Power BI', 'Python'], deliverables: ['Dimensional dbt star schema', 'Power BI executive dashboard', 'Anomaly detection script alerting on revenue dips'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'da-c1', label: 'Advanced SQL (Window functions, CTEs, complex JOINs, query optimization)', checked: false },
        { id: 'da-c2', label: 'Python data manipulation (Pandas, NumPy, data cleaning, reshaping)', checked: false },
        { id: 'da-c3', label: 'BI Dashboard creation in Tableau or Power BI with calculated fields', checked: false },
        { id: 'da-c4', label: 'Applied statistics, A/B testing analysis, and confidence intervals', checked: false },
        { id: 'da-c5', label: 'Cloud data warehousing concepts (Snowflake, BigQuery, dbt dimensional modeling)', checked: false }
      ],
      projects: [{ id: 'da-cp1', label: '1 Complete end-to-end business case study with public interactive dashboard', checked: false }],
      csFundamentals: [{ id: 'da-cs1', label: 'Relational database architecture, indexing, and dimensional star schema design', checked: false }],
      career: [
        { id: 'da-car1', label: 'Tailor resume for Data Analyst roles in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'da-car2', label: 'Showcase analytical projects on GitHub in GitHub Analyzer', checked: false, link: 'github.html' }
      ]
    }
  },

  'data-engineer': {
    roleId: 'data-engineer',
    title: 'Data Engineer',
    description: 'Design distributed data pipelines, architect lakehouses, automate orchestrations with Airflow, and stream real-time events with Kafka.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Advanced Python, SQL, and distributed computing concepts.',
        skills: [
          { id: 'de-python', title: 'Advanced Python for Data Pipelines', category: 'Programming', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Python', 'Generators', 'Multiprocessing', 'Type Hints'], whatToLearn: ['Streaming data processing', 'Object-oriented data pipelines', 'Handling memory constraints with iterators'], whyItMatters: 'Python orchestrates distributed data systems and transforms data payloads.', aiRelevance: 'AI assists with regex data parsing and transformation logic.', resources: [], practice: 'Build a memory-efficient log streaming parser in Python.' },
          { id: 'de-sql', title: 'Advanced SQL & Data Modeling', category: 'Databases', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['PostgreSQL', 'Dimensional Modeling', 'Star Schema', 'Slowly Changing Dimensions (SCD)'], whatToLearn: ['Fact and Dimension tables', 'SCD Type 1, 2, and 3 handling', 'Window aggregations and analytical queries'], whyItMatters: 'Dimensional modeling organizes petabytes of data into clean, queryable business structures.', aiRelevance: 'AI generates DDL schema statements from business requirements.', resources: [], practice: 'Design a dimensional data warehouse schema for a ride-sharing platform.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Distributed processing with Apache Spark, lakehouse architectures, and cloud data warehouses.',
        skills: [
          { id: 'de-spark', title: 'Distributed Data Processing with Apache Spark', category: 'Big Data', level: 'intermediate', levelNum: 2, prerequisites: ['de-python'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['PySpark', 'Spark SQL', 'DataFrame API', 'RDDs', 'Partitioning'], whatToLearn: ['Distributed compute architecture: Driver and Executors', 'Transformations vs Actions and lazy evaluation', 'Partitioning strategies, shuffles, and broadcast joins', 'Handling data skew and out-of-memory errors'], whyItMatters: 'Apache Spark is the industry standard engine for processing petabyte-scale data batches.', aiRelevance: 'AI can help debug Spark execution plans and identify unnecessary shuffles.', resources: [], practice: 'Process 10M+ rows with PySpark, optimize partitions, and write results to Parquet.' },
          { id: 'de-lakehouse', title: 'Data Lakehouses & Columnar Formats', category: 'Storage', level: 'intermediate', levelNum: 2, prerequisites: ['de-spark'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['Delta Lake', 'Apache Iceberg', 'Parquet', 'Snowflake', 'BigQuery'], whatToLearn: ['Columnar storage vs row storage (Parquet vs CSV)', 'ACID transactions on data lakes with Delta Lake and Iceberg', 'Time travel, schema evolution, and file compaction'], whyItMatters: 'Lakehouses combine the flexibility of object storage with the transactional reliability of databases.', aiRelevance: 'Modern AI training datasets are directly stored in lakehouse formats.', resources: [], practice: 'Build a Delta Lake table with ACID upserts and time travel verification.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Workflow orchestration with Apache Airflow and transformation modeling with dbt.',
        skills: [
          { id: 'de-airflow', title: 'Data Pipeline Orchestration (Apache Airflow)', category: 'Orchestration', level: 'intermediate', levelNum: 3, prerequisites: ['de-python'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Airflow', 'DAGs', 'Operators', 'Sensors', 'Task Dependencies'], whatToLearn: ['Authoring Directed Acyclic Graphs (DAGs) in Python', 'Idempotent pipeline design and backfilling', 'Sensors, branching, and automated retries', 'Managing Airflow connection secrets'], whyItMatters: 'Airflow is the de facto scheduler coordinating distributed data extraction and transformation jobs.', aiRelevance: 'AI drafts Airflow DAG definitions and cron expressions effortlessly.', resources: [], practice: 'Build an Airflow DAG that schedules daily ingestion, checks file arrival sensors, and triggers transformations.' },
          { id: 'de-dbt', title: 'Analytics Engineering with dbt', category: 'Transformations', level: 'intermediate', levelNum: 3, prerequisites: ['de-sql'], estimatedTime: '2 weeks', importance: 'essential', technologies: ['dbt', 'SQL', 'Jinja', 'Data Testing', 'Documentation'], whatToLearn: ['Modular SQL models and ref() dependencies', 'Jinja templating and macros', 'Automated schema tests (unique, not_null) and data quality assertions', 'Generating data lineage documentation'], whyItMatters: 'dbt brings software engineering best practices (version control, testing, CI) to data transformations.', aiRelevance: 'AI generates comprehensive dbt schema tests and doc descriptions.', resources: [], practice: 'Build a modular dbt project with automated data quality test suites.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Real-time event streaming with Apache Kafka and vector data pipelines for AI.',
        skills: [
          { id: 'de-kafka', title: 'Real-Time Streaming with Apache Kafka', category: 'Streaming', level: 'advanced', levelNum: 4, prerequisites: ['de-spark'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['Apache Kafka', 'Producers', 'Consumers', 'Consumer Groups', 'Schema Registry', 'Kafka Connect'], whatToLearn: ['Distributed log architecture: Topics, partitions, and offsets', 'Consumer group rebalancing and message ordering guarantees', 'Exactly-once semantics (EOS) and idempotency', 'Schema Registry and Avro serialization'], whyItMatters: 'Kafka powers real-time event-driven data platforms across financial trading, ride-hailing, and telemetry.', aiRelevance: 'Kafka feeds real-time event streams into AI feature stores and streaming RAG pipelines.', resources: [], practice: 'Build a streaming data pipeline with Kafka producers, consumer groups, and schema validation.' },
          { id: 'de-ai-pipelines', title: 'Data Pipelines for AI & Feature Stores', category: 'AI Data', level: 'advanced', levelNum: 4, prerequisites: ['de-lakehouse', 'de-kafka'], estimatedTime: '2-3 weeks', importance: 'recommended', technologies: ['Feast / Hopsworks', 'Embeddings Pipeline', 'Vector Ingestion', 'Chunking at Scale'], whatToLearn: ['Offline vs online feature stores for ML inference', 'High-throughput document chunking and embedding generation at scale', 'Feeding vector databases asynchronously through streaming queues'], whyItMatters: 'AI models require continuous fresh feature data and indexed vector representations.', aiRelevance: 'Directly supports enterprise AI and ML training workflows.', resources: [], practice: 'Build an automated pipeline that streams documents from S3, generates embeddings in PySpark, and writes to pgvector.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Production data engineering capstone projects and technical readiness.',
        skills: [
          { id: 'de-proj-capstone', title: 'Job-Ready Milestone: End-to-End Real-Time Lakehouse Platform', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['de-spark', 'de-airflow', 'de-kafka', 'de-dbt'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Kafka', 'PySpark', 'Delta Lake', 'Airflow', 'dbt', 'Docker'], whatToLearn: ['Combining streaming event ingestion with scheduled batch aggregation', 'Automated data quality checks preventing corrupt pipeline data', 'Complete dockerized multi-service deployment'], whyItMatters: 'The benchmark portfolio project demonstrating senior data platform engineering capabilities.', aiRelevance: 'Feeds clean transformed data directly to downstream analytics and AI models.', resources: [], practice: 'Deploy an end-to-end data platform streaming live events, writing to Delta Lake, and orchestrating transformations via Airflow.' }
        ]
      }
    ],
    projects: [
      { id: 'de-p1', title: 'Batch ETL Pipeline with Airflow & dbt', type: 'Intermediate', description: 'Automated batch pipeline extracting API data, orchestrating via Airflow, and transforming dimensional models with dbt.', technologies: ['Airflow', 'dbt', 'PostgreSQL', 'Docker'], deliverables: ['Airflow DAG with retry and failure alerts', 'dbt modular star schema models', 'Data quality assertion tests'] },
      { id: 'de-p2', title: 'Real-Time Streaming Event Engine with Kafka & Spark', type: 'Production / Job-Ready', description: 'Real-time event streaming pipeline processing high-velocity clickstream logs with Kafka, PySpark Structured Streaming, and Delta Lake.', technologies: ['Kafka', 'PySpark', 'Delta Lake', 'Docker Compose'], deliverables: ['Kafka producer simulating 1,000 events/sec', 'Spark Structured Streaming micro-batch processing', 'Delta Lake ACID upsert storage'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'de-c1', label: 'Python fluency for high-volume data transformation and pipeline orchestration', checked: false },
        { id: 'de-c2', label: 'Advanced SQL and dimensional modeling (Star schema, SCD Type 1/2)', checked: false },
        { id: 'de-c3', label: 'Distributed computing with Apache Spark (PySpark, partitioning, shuffle tuning)', checked: false },
        { id: 'de-c4', label: 'Data lakehouse architectures (Delta Lake, Iceberg, Parquet columnar format)', checked: false },
        { id: 'de-c5', label: 'Pipeline orchestration with Apache Airflow (DAGs, sensors, backfilling)', checked: false },
        { id: 'de-c6', label: 'Analytics engineering with dbt (Macros, schema testing, documentation)', checked: false },
        { id: 'de-c7', label: 'Real-time event streaming with Apache Kafka (Partitions, consumer groups, EOS)', checked: false },
        { id: 'de-c8', label: 'Feature stores and vector data pipelines for AI/ML systems', checked: false }
      ],
      projects: [{ id: 'de-cp1', label: '1 Real-time streaming and lakehouse data engineering portfolio platform', checked: false }],
      csFundamentals: [{ id: 'de-cs1', label: 'Distributed systems, partition fault tolerance, and CAP theorem', checked: false }],
      career: [
        { id: 'de-car1', label: 'Optimize Data Engineering resume in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'de-car2', label: 'Audit pipeline architecture code on GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'de-car3', label: 'Practice data structure problems in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  'data-scientist': {
    roleId: 'data-scientist',
    title: 'Data Scientist',
    description: 'Master statistical inference, predictive modeling, machine learning algorithms, experimental design, and model explainability.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Mathematics, probability, statistics, and scientific Python.',
        skills: [
          { id: 'ds-math', title: 'Probability, Statistics & Linear Algebra', category: 'Mathematics', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['Probability', 'Distributions', 'Hypothesis Testing', 'Linear Algebra'], whatToLearn: ['Bayesian vs Frequentist statistics', 'Normal, Binomial, Poisson distributions', 'T-tests, ANOVA, Chi-Square tests', 'Eigenvalues and matrix decomposition'], whyItMatters: 'Statistical rigor separates genuine predictive signal from random correlation.', aiRelevance: 'Fundamental baseline for all ML algorithms and LLM evaluations.', resources: [], practice: 'Conduct a statistical hypothesis test determining if two user groups behave differently.' },
          { id: 'ds-python', title: 'Python for Data Science (NumPy, Pandas, SciPy)', category: 'Python', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['NumPy', 'Pandas', 'SciPy', 'Jupyter'], whatToLearn: ['Data manipulation with Pandas', 'Vectorized math with NumPy', 'Statistical distributions in SciPy'], whyItMatters: 'The universal workbench for exploratory data science.', aiRelevance: 'AI code tools assist with fast exploratory code in notebooks.', resources: [], practice: 'Perform complete exploratory data analysis (EDA) with statistical summary plots.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Machine learning algorithms, feature engineering, and cross-validation.',
        skills: [
          { id: 'ds-ml', title: 'Supervised & Unsupervised Machine Learning', category: 'Machine Learning', level: 'intermediate', levelNum: 2, prerequisites: ['ds-math', 'ds-python'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Scikit-learn', 'Linear Regression', 'Logistic Regression', 'Trees', 'Ensembles', 'Clustering'], whatToLearn: ['Linear/Logistic regression assumptions and diagnostics', 'Decision trees, Random Forests, and Gradient Boosting (XGBoost, LightGBM)', 'K-Means clustering and hierarchical clustering', 'Cross-validation and hyperparameter tuning'], whyItMatters: 'The core algorithms that solve 90% of business prediction tasks.', aiRelevance: 'Establishes model evaluation and training paradigms.', resources: [], practice: 'Train an ensemble model to predict customer loan defaults with feature importance analysis.' },
          { id: 'ds-fe', title: 'Feature Engineering & Data Preprocessing', category: 'Feature Engineering', level: 'intermediate', levelNum: 2, prerequisites: ['ds-python'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['Imputation', 'One-Hot Encoding', 'Scaling', 'PCA', 'Target Encoding'], whatToLearn: ['Handling missing values and outliers', 'Categorical encoding strategies', 'Feature scaling (Standard vs MinMax)', 'Dimensionality reduction with PCA'], whyItMatters: 'Better features beat better algorithms every time.', aiRelevance: 'AI can brainstorm non-obvious interaction features based on domain context.', resources: [], practice: 'Build a Scikit-learn Pipeline with automated encoding, scaling, and imputation.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Deep learning foundations, NLP, and model interpretability.',
        skills: [
          { id: 'ds-deep-learning', title: 'Deep Learning & PyTorch Basics', category: 'Deep Learning', level: 'intermediate', levelNum: 3, prerequisites: ['ds-ml'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['PyTorch', 'Neural Networks', 'Backprop', 'Loss Functions'], whatToLearn: ['Multi-layer perceptrons (MLP)', 'Activation functions (ReLU, Sigmoid, Softmax)', 'Optimization with Adam and learning rate scheduling', 'Transfer learning basics'], whyItMatters: 'Essential for unstructured data like text, images, and speech.', aiRelevance: 'The foundation of modern generative AI models.', resources: [], practice: 'Build a neural network in PyTorch to classify multi-class text descriptions.' },
          { id: 'ds-explainability', title: 'Model Explainability & Fairness (SHAP / LIME)', category: 'Explainability', level: 'intermediate', levelNum: 3, prerequisites: ['ds-ml'], estimatedTime: '2 weeks', importance: 'essential', technologies: ['SHAP', 'LIME', 'Feature Importance', 'Fairness'], whatToLearn: ['Shapley values for local and global feature attribution', 'LIME local surrogates', 'Detecting demographic parity bias in predictive models'], whyItMatters: 'Regulated industries (finance, healthcare) legally require models to be explainable.', aiRelevance: 'AI models can synthesize SHAP values into natural language explanations.', resources: [], practice: 'Generate SHAP force plots explaining why an ML model rejected a simulated applicant.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'A/B testing, causal inference, and generative AI integration.',
        skills: [
          { id: 'ds-causal', title: 'Causal Inference & Advanced A/B Testing', category: 'Causal Analytics', level: 'advanced', levelNum: 4, prerequisites: ['ds-math', 'ds-ml'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['DoWhy', 'Propensity Score Matching', 'Difference-in-Differences', 'A/B Testing'], whatToLearn: ['Difference-in-Differences (DiD) estimation', 'Propensity score matching for observational studies', 'Sample size determination and power analysis in A/B tests'], whyItMatters: 'Answers the critical business question: "Did our product change actually CAUSE the revenue increase?"', aiRelevance: 'AI helps design causal graphs and identify confounding variables.', resources: [], practice: 'Estimate treatment effects on customer spend using propensity score matching.' },
          { id: 'ds-genai-ds', title: 'Generative AI for Data Science', category: 'GenAI', level: 'advanced', levelNum: 4, prerequisites: ['ds-deep-learning'], estimatedTime: '2-3 weeks', importance: 'recommended', technologies: ['LLM Embeddings', 'Zero-Shot Classification', 'Synthetic Data Generation'], whatToLearn: ['Using LLMs for automated text labeling and data augmentation', 'Generating synthetic data for imbalanced classes', 'Fine-tuning small open models for domain classification'], whyItMatters: 'Augments traditional data science workflows with foundation model intelligence.', aiRelevance: 'Direct integration of LLMs into data science workflows.', resources: [], practice: 'Use an LLM to generate synthetic training examples for an underrepresented class and measure model gain.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'End-to-end data science capstone projects and portfolio presentation.',
        skills: [
          { id: 'ds-proj-capstone', title: 'Job-Ready Milestone: End-to-End Predictive Machine Learning System', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['ds-ml', 'ds-explainability', 'ds-causal'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Python', 'XGBoost', 'PyTorch', 'SHAP', 'FastAPI', 'Docker'], whatToLearn: ['Full lifecycle: problem framing, data cleaning, modeling, explainability, deployment', 'Serving predictions via a containerized REST API', 'Publishing reproducible notebook and documentation'], whyItMatters: 'Demonstrates end-to-end technical autonomy and business impact.', aiRelevance: 'Includes model explainability and generative evaluation.', resources: [], practice: 'Build and deploy a complete predictive machine learning system with live explainability visualizations.' }
        ]
      }
    ],
    projects: [
      { id: 'ds-p1', title: 'Customer Churn Predictor with SHAP Explainability', type: 'Intermediate', description: 'Trained gradient boosting model predicting customer subscription cancellations with individual SHAP explanations.', technologies: ['Python', 'XGBoost', 'SHAP', 'Scikit-learn'], deliverables: ['Trained model with 85%+ ROC-AUC', 'SHAP force plots explaining predictions', 'Actionable retention recommendations'] },
      { id: 'ds-p2', title: 'End-to-End Predictive ML API with Causal Impact Analysis', type: 'Production / Job-Ready', description: 'Containerized machine learning service predicting demand forecasts and estimating causal treatment effects.', technologies: ['PyTorch', 'XGBoost', 'FastAPI', 'Docker', 'DoWhy'], deliverables: ['FastAPI prediction endpoint with input validation', 'Causal inference report on treatment effect', 'Docker container and public documentation'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'ds-c1', label: 'Probability, statistics, and hypothesis testing rigor', checked: false },
        { id: 'ds-c2', label: 'Python data science stack (NumPy, Pandas, Scikit-learn, SciPy)', checked: false },
        { id: 'ds-c3', label: 'Supervised & unsupervised machine learning (Regression, Random Forests, XGBoost)', checked: false },
        { id: 'ds-c4', label: 'Deep learning foundations with PyTorch', checked: false },
        { id: 'ds-c5', label: 'Model explainability using SHAP and LIME', checked: false },
        { id: 'ds-c6', label: 'Causal inference and rigorous A/B testing experiment design', checked: false },
        { id: 'ds-c7', label: 'Model deployment via containerized REST APIs', checked: false }
      ],
      projects: [{ id: 'ds-cp1', label: '1 Complete predictive machine learning project with explainability and deployment', checked: false }],
      csFundamentals: [{ id: 'ds-cs1', label: 'Mathematical optimization, convex loss functions, and algorithmic complexity', checked: false }],
      career: [
        { id: 'ds-car1', label: 'Tailor resume for Data Scientist in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'ds-car2', label: 'Publish data science research and code to GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'ds-car3', label: 'Practice core algorithmic problems in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  'ai-research': {
    roleId: 'ai-research-engineer',
    title: 'AI Research Engineer',
    description: 'Bridge cutting-edge AI publications and production neural systems. Master custom attention mechanisms, distributed GPU training, JAX, and CUDA.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Advanced mathematics, tensor calculus, and GPU hardware architecture.',
        skills: [
          { id: 'res-math', title: 'Multivariate Calculus, Linear Algebra & Information Theory', category: 'Mathematics', level: 'advanced', levelNum: 1, prerequisites: [], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Tensor Calculus', 'Information Theory', 'Entropy', 'KL-Divergence'], whatToLearn: ['Jacobian and Hessian matrices', 'Shannon entropy and Kullback-Leibler (KL) divergence', 'Stochastic differential equations in diffusion models'], whyItMatters: 'Research papers express modern neural discoveries in pure tensor calculus.', aiRelevance: 'Foundational baseline for reading NeurIPS, ICML, and ICLR publications.', resources: [], practice: 'Derive the backpropagation gradient formulas for multi-head attention on paper.' },
          { id: 'res-gpu-arch', title: 'GPU Hardware Architecture & Memory Hierarchy', category: 'Hardware', level: 'advanced', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['CUDA Cores', 'Tensor Cores', 'SRAM vs HBM', 'Memory Bandwidth'], whatToLearn: ['Streaming Multiprocessors (SMs) and thread warps', 'SRAM (Shared Memory) vs High Bandwidth Memory (HBM)', 'Compute bound vs memory bandwidth bound operations (Roofline model)'], whyItMatters: 'FlashAttention and modern speedups originate from understanding memory hierarchy, not model architecture.', aiRelevance: 'Crucial for writing ultra-fast custom neural kernels.', resources: [], practice: 'Analyze a custom layer using the Roofline model to identify if it is memory or compute bound.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Deep PyTorch internals, custom autograd functions, and JAX.',
        skills: [
          { id: 'res-pytorch-internals', title: 'PyTorch Internals & Custom Autograd Functions', category: 'Deep Learning', level: 'advanced', levelNum: 2, prerequisites: ['res-math'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['torch.autograd.Function', 'Memory Profiling', 'C++ Extensions'], whatToLearn: ['Writing custom forward and backward passes', 'In-place operations and memory retention hazards', 'Profiling VRAM allocation with PyTorch Profiler'], whyItMatters: 'Novel research architectures require custom gradient calculations that standard autograd cannot optimize.', aiRelevance: 'Allows writing custom activation and loss functions.', resources: [], practice: 'Implement a custom activation function with handwritten forward and backward passes in PyTorch.' },
          { id: 'res-jax', title: 'JAX & Accelerated Linear Algebra (XLA)', category: 'Functional ML', level: 'advanced', levelNum: 2, prerequisites: ['res-math'], estimatedTime: '3 weeks', importance: 'recommended', technologies: ['JAX', 'grad', 'jit', 'vmap', 'pmap'], whatToLearn: ['Functional programming paradigms in JAX', 'Just-In-Time compilation with XLA (jax.jit)', 'Automatic vectorization (jax.vmap) and parallel device mapping (jax.pmap)'], whyItMatters: 'Widely used in leading research labs (Google DeepMind) for speed and mathematical purity.', aiRelevance: 'Core research framework for large-scale training and reinforcement learning.', resources: [], practice: 'Implement a transformer layer in pure JAX with jit compilation and vmap batching.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Novel attention mechanisms, Transformer optimizations, and paper reproduction.',
        skills: [
          { id: 'res-flash-attention', title: 'FlashAttention & Kernel Optimization', category: 'Attention Mechanisms', level: 'advanced', levelNum: 3, prerequisites: ['res-gpu-arch', 'res-pytorch-internals'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['FlashAttention', 'Tiling', 'Softmax Online Rescaling', 'Triton (OpenAI)'], whatToLearn: ['The quadratic memory bottleneck of naive self-attention', 'Tiling techniques keeping attention in fast GPU SRAM', 'Writing custom GPU kernels in OpenAI Triton'], whyItMatters: 'FlashAttention enables training on 128k+ context windows without running out of VRAM.', aiRelevance: 'The cornerstone optimization behind all modern long-context LLMs.', resources: [], practice: 'Write a custom matrix multiplication kernel in OpenAI Triton and benchmark against PyTorch.' },
          { id: 'res-paper-reproduction', title: 'Scientific Paper Reproduction Workflow', category: 'Research', level: 'advanced', levelNum: 3, prerequisites: ['res-pytorch-internals'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['arXiv', 'Weights & Biases', 'Ablation Studies', 'Reproducibility'], whatToLearn: ['Deconstructing arXiv papers into algorithmic pseudocode', 'Structuring rigorous ablation studies', 'Tracking hyperparameter sweeps with Weights & Biases (WandB)'], whyItMatters: 'The ultimate research engineering skill: translating academic papers into working, benchmarked code.', aiRelevance: 'Directly replicates frontier AI research findings.', resources: [], practice: 'Reproduce a recent NeurIPS/ICLR paper architecture from scratch and publish code with benchmark graphs.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Distributed GPU training, pipeline parallelism, and Reinforcement Learning from Human Feedback (RLHF).',
        skills: [
          { id: 'res-distributed', title: 'Distributed Large-Scale Training (FSDP / DeepSpeed)', category: 'Distributed Training', level: 'advanced', levelNum: 4, prerequisites: ['res-flash-attention'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['FSDP', 'DeepSpeed', 'Megatron-LM', 'Tensor Parallelism', 'Pipeline Parallelism'], whatToLearn: ['Data Parallelism (DDP) vs Fully Sharded Data Parallel (FSDP)', 'ZeRO memory optimization stages (Zero Redundancy Optimizer)', 'Tensor Parallelism and Pipeline Parallelism across multi-node clusters', 'Gradient accumulation and mixed-precision (BF16) stability'], whyItMatters: 'Foundation models cannot fit on a single GPU; distributed parallelism across hundreds of GPUs is mandatory.', aiRelevance: 'The infrastructure technology powering GPT-4, Llama 3, and Gemini training runs.', resources: [], practice: 'Configure an FSDP training run on a simulated multi-GPU cluster with zero parameter redundancy.' },
          { id: 'res-rlhf-dpo', title: 'Post-Training Alignment: RLHF & Direct Preference Optimization (DPO)', category: 'Alignment', level: 'advanced', levelNum: 4, prerequisites: ['res-distributed'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['PPO', 'DPO', 'Reward Modeling', 'Kahneman-Tversky Optimization (KTO)'], whatToLearn: ['Reinforcement Learning from Human Feedback (RLHF) with PPO', 'Direct Preference Optimization (DPO) without separate reward models', 'Preference pair datasets (chosen vs rejected responses)', 'Preventing reward hacking and mode collapse'], whyItMatters: 'Post-training alignment transforms raw text-completing base models into helpful, safe conversational assistants.', aiRelevance: 'Directly responsible for the conversational intelligence of modern AI assistants.', resources: [], practice: 'Align an instruction-tuned model on paired preference data using Direct Preference Optimization (DPO).' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Frontier research implementation and research lab portfolio.',
        skills: [
          { id: 'res-proj-capstone', title: 'Job-Ready Milestone: Novel Attention Architecture with Distributed DPO', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['res-paper-reproduction', 'res-distributed', 'res-rlhf-dpo'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['PyTorch', 'Triton', 'FSDP', 'DPO', 'WandB'], whatToLearn: ['Implementing custom attention kernels', 'Distributed multi-node training', 'Post-training DPO alignment', 'Scientific publication and open-source benchmark suite'], whyItMatters: 'Proves to tier-1 AI labs (OpenAI, DeepMind, Anthropic, Meta FAIR) that you can advance frontier model architecture.', aiRelevance: 'Original contribution to foundation model research.', resources: [], practice: 'Publish a complete research repository reproducing a novel neural architecture with distributed alignment code.' }
        ]
      }
    ],
    projects: [
      { id: 'res-p1', title: 'Custom OpenAI Triton Attention Kernel', type: 'Intermediate', description: 'Handcrafted GPU kernel implementing tiled attention in OpenAI Triton with comparative latency benchmarks against PyTorch.', technologies: ['Triton', 'PyTorch', 'CUDA', 'Python'], deliverables: ['Custom Triton kernel implementation', 'Forward and backward gradient test assertions', 'Benchmarking script comparing VRAM and throughput'] },
      { id: 'res-p2', title: 'End-to-End Foundation Model DPO Alignment Pipeline', type: 'Production / Job-Ready', description: 'Complete distributed post-training alignment pipeline training an open model using Direct Preference Optimization across multiple GPUs with WandB telemetry.', technologies: ['PyTorch', 'FSDP', 'DPO', 'Hugging Face', 'WandB'], deliverables: ['Distributed FSDP training script', 'DPO loss and reference model KL penalty implementation', 'Comprehensive WandB experiment logs and model evaluation'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'res-c1', label: 'Advanced mathematics (Tensor calculus, probability distributions, information theory)', checked: false },
        { id: 'res-c2', label: 'GPU hardware architecture (Streaming multiprocessors, SRAM vs HBM memory hierarchy)', checked: false },
        { id: 'res-c3', label: 'Deep PyTorch internals, custom autograd functions, and profiling', checked: false },
        { id: 'res-c4', label: 'Custom kernel optimization with OpenAI Triton', checked: false },
        { id: 'res-c5', label: 'Academic research paper reproduction from scratch', checked: false },
        { id: 'res-c6', label: 'Distributed GPU training (FSDP, DeepSpeed ZeRO, Pipeline Parallelism)', checked: false },
        { id: 'res-c7', label: 'Post-training alignment algorithms (RLHF, DPO, reward modeling)', checked: false }
      ],
      projects: [{ id: 'res-cp1', label: '1 Open-source scientific paper reproduction with published benchmarks', checked: false }],
      csFundamentals: [{ id: 'res-cs1', label: 'CUDA thread scheduling, warp divergence, and memory coalescing', checked: false }],
      career: [
        { id: 'res-car1', label: 'Format research publications and code in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'res-car2', label: 'Verify open-source research repositories on GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'res-car3', label: 'Review algorithmic and mathematical problem sets in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  'mlops': {
    roleId: 'mlops-engineer',
    title: 'MLOps Engineer',
    description: 'Deploy, automate, monitor, and maintain production machine learning pipelines, feature stores, model registries, and drift detection.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Software engineering principles, Linux, Docker, and ML lifecycle basics.',
        skills: [
          { id: 'mlo-sw-eng', title: 'Production Python & Clean Code for ML', category: 'Software Engineering', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['Python', 'Type Hints', 'Pydantic', 'pytest', 'Git'], whatToLearn: ['Writing modular, testable Python packages', 'Type validation with Pydantic', 'Automated testing with pytest', 'Semantic versioning of ML packages'], whyItMatters: 'ML research code is often messy and non-reproducible. MLOps turns notebook prototypes into enterprise software.', aiRelevance: 'AI helps refactor messy notebooks into clean Python modules.', resources: [], practice: 'Refactor a monolithic Jupyter notebook into a clean, testable Python package.' },
          { id: 'mlo-docker', title: 'Docker for Machine Learning & GPU Runtimes', category: 'Containers', level: 'beginner', levelNum: 1, prerequisites: ['mlo-sw-eng'], estimatedTime: '2 weeks', importance: 'essential', technologies: ['Docker', 'NVIDIA Container Toolkit', 'CUDA Base Images'], whatToLearn: ['Building minimal Docker images with Python dependencies', 'NVIDIA runtime pass-through for GPU acceleration', 'Multi-stage builds for model deployment'], whyItMatters: 'Guarantees that model dependencies (CUDA drivers, PyTorch versions) run identically across cloud environments.', aiRelevance: 'Crucial for reliable model containerization.', resources: [], practice: 'Build a Docker container that executes a PyTorch GPU prediction on an NVIDIA base image.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Experiment tracking, model registries, and data versioning.',
        skills: [
          { id: 'mlo-mlflow', title: 'Experiment Tracking & Model Registry (MLflow)', category: 'Experiment Tracking', level: 'intermediate', levelNum: 2, prerequisites: ['mlo-sw-eng'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['MLflow', 'WandB', 'Model Registry', 'Artifact Tracking'], whatToLearn: ['Logging hyperparameters, metrics, and artifact checkpoints', 'Versioned model registry with deployment stages (Staging, Production, Archived)', 'Model signatures and input/output schema enforcement'], whyItMatters: 'Provides complete lineage: knowing exactly what data, code commit, and hyperparameters produced any given model.', aiRelevance: 'Essential for tracking LLM prompt iterations and fine-tuning runs.', resources: [], practice: 'Set up an MLflow tracking server and register an automated model with versioned artifacts.' },
          { id: 'mlo-dvc', title: 'Data Version Control (DVC)', category: 'Data Versioning', level: 'intermediate', levelNum: 2, prerequisites: ['mlo-sw-eng'], estimatedTime: '2 weeks', importance: 'essential', technologies: ['DVC', 'S3 / GCS', 'Git Integration', 'Data Lineage'], whatToLearn: ['Tracking multi-gigabyte datasets alongside Git code repositories', 'Pushing and pulling dataset versions from remote cloud object storage', 'Building reproducible data pipelines with DVC pipelines'], whyItMatters: 'Git cannot track large datasets; DVC connects specific dataset versions to specific model builds.', aiRelevance: 'Enables deterministic retraining on exact training dataset snapshots.', resources: [], practice: 'Version a 5GB training dataset using DVC linked with a GitHub repository.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Orchestration pipelines (Kubeflow / Airflow) and automated CI/CD for ML.',
        skills: [
          { id: 'mlo-pipelines', title: 'ML Pipeline Orchestration (Kubeflow / Airflow)', category: 'Pipelines', level: 'intermediate', levelNum: 3, prerequisites: ['mlo-mlflow', 'mlo-docker'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['Kubeflow Pipelines (KFP)', 'Apache Airflow', 'Argo Workflows'], whatToLearn: ['Containerized pipeline steps: Ingest -> Preprocess -> Train -> Evaluate -> Deploy', 'Conditional branching based on model evaluation thresholds', 'Automated pipeline scheduling and cloud compute resource requests'], whyItMatters: 'Automates end-to-end retraining when new data arrives without human intervention.', aiRelevance: 'Automates recurring fine-tuning pipelines for LLMs.', resources: [], practice: 'Build an automated Kubeflow pipeline that trains, evaluates, and conditionally registers a model.' },
          { id: 'mlo-cicd', title: 'Continuous Integration & Continuous Training (CI/CD/CT)', category: 'CI/CD', level: 'intermediate', levelNum: 3, prerequisites: ['mlo-pipelines'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['CML (Continuous Machine Learning)', 'GitHub Actions', 'Automated Testing'], whatToLearn: ['Automating model training runs on pull requests via GitHub Actions', 'Generating pull request reports with training metric comparison charts', 'Automated deployment to staging environments upon merge'], whyItMatters: 'Brings modern software delivery automation to machine learning lifecycles.', aiRelevance: 'Prevents deploying models that degrade test set accuracy.', resources: [], practice: 'Configure a GitHub Actions pipeline with CML that generates model performance diffs in PR comments.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Low-latency serving, feature stores, and model monitoring (Drift detection).',
        skills: [
          { id: 'mlo-serving', title: 'Model Serving & Inference Optimization', category: 'Serving', level: 'advanced', levelNum: 4, prerequisites: ['mlo-docker'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Triton Inference Server', 'vLLM', 'TorchServe', 'FastAPI', 'ONNX'], whatToLearn: ['Dynamic batching and concurrent model execution on Triton', 'Exporting models to ONNX and TensorRT for GPU acceleration', 'Shadow deployments and canary rollouts of new model versions'], whyItMatters: 'Maximizes throughput and reduces inference latency from hundreds of milliseconds to single digits.', aiRelevance: 'High-throughput serving for both classical ML models and LLMs.', resources: [], practice: 'Deploy an ONNX-optimized model on Triton Inference Server with dynamic batching.' },
          { id: 'mlo-monitoring', title: 'Model Monitoring, Data Drift & Concept Drift', category: 'Monitoring', level: 'advanced', levelNum: 4, prerequisites: ['mlo-mlflow', 'mlo-serving'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['Evidently AI', 'Prometheus', 'Grafana', 'Drift Detection (KS-Test, PSI)'], whatToLearn: ['Detecting data drift (features changing distribution) using Kolmogorov-Smirnov and Population Stability Index (PSI)', 'Detecting concept drift (relationship between features and target changing)', 'Setting up automated alerting and automated retraining triggers'], whyItMatters: 'Models degrade over time as real-world data drifts. Silent failure leads to massive business losses.', aiRelevance: 'Crucial for monitoring embedding drift and hallucination rates in production AI.', resources: [], practice: 'Build a monitoring pipeline with Evidently AI that alerts when input feature distributions drift.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Production MLOps platform capstone project and technical checklist.',
        skills: [
          { id: 'mlo-proj-capstone', title: 'Job-Ready Milestone: Automated Continuous Training & Deployment Platform', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['mlo-pipelines', 'mlo-cicd', 'mlo-serving', 'mlo-monitoring'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Kubeflow', 'MLflow', 'Triton', 'Evidently AI', 'Docker', 'Kubernetes'], whatToLearn: ['Full MLOps loop: automated ingestion, tracking, containerized training, canary deployment, and drift monitoring', 'Self-healing retraining triggers', 'Production deployment with live monitoring dashboards'], whyItMatters: 'Demonstrates enterprise MLOps engineering capability demanded by tech companies worldwide.', aiRelevance: 'Automates the entire lifecycle of production AI systems.', resources: [], practice: 'Deploy a complete end-to-end MLOps platform with automated drift detection and self-healing retraining.' }
        ]
      }
    ],
    projects: [
      { id: 'mlo-p1', title: 'Automated CI/CD Pipeline with CML & Model Registry', type: 'Intermediate', description: 'A complete GitHub Actions pipeline that triggers model training, evaluates metrics, posts a visual diff to the PR, and registers passing models in MLflow.', technologies: ['GitHub Actions', 'MLflow', 'CML', 'Docker'], deliverables: ['Automated PR workflow training on push', 'Automated visual metric report in PR comment', 'Versioned model registration in MLflow'] },
      { id: 'mlo-p2', title: 'Enterprise Model Serving & Drift Monitoring Platform', type: 'Production / Job-Ready', description: 'Production model serving infrastructure with Triton Inference Server, Prometheus latency metrics, Evidently AI drift detection, and automated retraining triggers.', technologies: ['Triton', 'Evidently AI', 'Prometheus', 'Kubernetes', 'FastAPI'], deliverables: ['High-throughput Triton model deployment', 'Evidently AI automated drift dashboard', 'Automated retraining trigger on statistical drift threshold'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'mlo-c1', label: 'Production Python software engineering (Pydantic, pytest, packaging)', checked: false },
        { id: 'mlo-c2', label: 'Docker containerization with NVIDIA GPU runtime integration', checked: false },
        { id: 'mlo-c3', label: 'Experiment tracking and model registry management (MLflow / WandB)', checked: false },
        { id: 'mlo-c4', label: 'Data and artifact version control with DVC', checked: false },
        { id: 'mlo-c5', label: 'Pipeline orchestration with Kubeflow Pipelines or Apache Airflow', checked: false },
        { id: 'mlo-c6', label: 'Continuous Integration & Continuous Training (CI/CD/CT) with GitHub Actions', checked: false },
        { id: 'mlo-c7', label: 'Optimized model serving (Triton Inference Server, vLLM, ONNX)', checked: false },
        { id: 'mlo-c8', label: 'Production model monitoring and drift detection (Evidently AI, Prometheus)', checked: false }
      ],
      projects: [{ id: 'mlo-cp1', label: '1 Production MLOps platform with automated retraining and drift monitoring', checked: false }],
      csFundamentals: [{ id: 'mlo-cs1', label: 'Distributed computing, GPU cluster scheduling, and container networking', checked: false }],
      career: [
        { id: 'mlo-car1', label: 'Format MLOps platform projects in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'mlo-car2', label: 'Showcase reproducible pipelines on GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'mlo-car3', label: 'Review core engineering algorithms in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  'sre': {
    roleId: 'sre-engineer',
    title: 'Site Reliability Engineer (SRE)',
    description: 'Apply software engineering practices to infrastructure operations, reliability, SLI/SLO error budgets, automated incident remediation, and chaos engineering.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Systems programming (Go/Python), Linux internals, and networking fundamentals.',
        skills: [
          { id: 'sre-systems-prog', title: 'Systems Programming in Go or Python', category: 'Programming', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Go (Golang)', 'Python', 'Concurrency', 'CLI'], whatToLearn: ['Go syntax, goroutines, and channels', 'Building high-performance operational CLI tools', 'Parsing JSON/YAML configurations and system metrics'], whyItMatters: 'SREs write software to eliminate operational toil; Go is the language of cloud-native infrastructure.', aiRelevance: 'AI can write Go boilerplate tools quickly.', resources: [], practice: 'Build a concurrent CLI tool in Go that health-checks hundreds of endpoints simultaneously.' },
          { id: 'sre-linux-internals', title: 'Linux Kernel Internals & Troubleshooting', category: 'Operating Systems', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Linux', 'strace', 'eBPF', 'procfs', 'cgroups', 'systemd'], whatToLearn: ['Tracing system calls with strace and lsof', 'eBPF fundamentals for kernel tracing', 'Inspecting CPU, memory, and disk I/O metrics via /proc and /sys', 'Troubleshooting zombie processes and memory leaks'], whyItMatters: 'During severe production outages, low-level Linux diagnostics pinpoint the exact root cause.', aiRelevance: 'AI helps decode complex strace and dmesg kernel error outputs.', resources: [], practice: 'Diagnose and resolve an intentional memory leak using strace and top.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'SLI / SLO / SLA frameworks, error budgets, and incident management.',
        skills: [
          { id: 'sre-slis-slos', title: 'SLIs, SLOs & Error Budget Management', category: 'Reliability Engineering', level: 'intermediate', levelNum: 2, prerequisites: ['sre-systems-prog'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['SLI', 'SLO', 'SLA', 'Error Budgets', 'Google SRE Book'], whatToLearn: ['Defining meaningful Service Level Indicators (Availability, Latency, Throughput)', 'Setting realistic Service Level Objectives (99.9% vs 99.99%)', 'Calculating and enforcing Error Budgets', 'Balancing feature release velocity vs platform stability'], whyItMatters: 'The foundational philosophy of Site Reliability Engineering pioneered by Google.', aiRelevance: 'AI helps model latency percentiles and error budget burn rates.', resources: [], practice: 'Design an SLO and Error Budget policy for a critical payment gateway service.' },
          { id: 'sre-incident-mgmt', title: 'Incident Response, Postmortems & On-Call', category: 'Incident Operations', level: 'intermediate', levelNum: 2, prerequisites: ['sre-slis-slos'], estimatedTime: '2 weeks', importance: 'essential', technologies: ['PagerDuty', 'Blameless Postmortems', 'Root Cause Analysis', 'Runbooks'], whatToLearn: ['Incident commander role and triage procedures', 'Writing comprehensive, blameless postmortems with corrective actions', 'Authoring actionable runbooks for on-call responders'], whyItMatters: 'Blameless postmortems convert catastrophic outages into permanent systemic resilience.', aiRelevance: 'AI tools can draft initial postmortem chronologies from incident chat logs.', resources: [], practice: 'Write a comprehensive blameless postmortem analyzing a simulated database failover outage.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Advanced distributed observability, Prometheus alerting, and tracing.',
        skills: [
          { id: 'sre-observability-adv', title: 'Advanced Observability & OpenTelemetry', category: 'Observability', level: 'intermediate', levelNum: 3, prerequisites: ['sre-slis-slos'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['OpenTelemetry (OTel)', 'Prometheus', 'Grafana', 'Jaeger', 'PromQL'], whatToLearn: ['Writing complex PromQL queries calculating error budget burn rates', 'Instrumenting microservices with OpenTelemetry distributed traces', 'Correlating trace IDs across distributed services to isolate latency bottlenecks', 'High-cardinality metrics management'], whyItMatters: 'Microservices cannot be debugged without distributed tracing.', aiRelevance: 'AI observability platforms detect anomalous metric spikes before human alerts fire.', resources: [], practice: 'Instrument a microservices application with OpenTelemetry and trace slow cross-service requests.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Chaos engineering, automated self-healing, and capacity planning.',
        skills: [
          { id: 'sre-chaos', title: 'Chaos Engineering & Automated Self-Healing', category: 'Chaos Engineering', level: 'advanced', levelNum: 4, prerequisites: ['sre-observability-adv'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Chaos Mesh', 'Gremlin', 'LitmusChaos', 'Automated Remediation'], whatToLearn: ['Formulating chaos engineering hypotheses', 'Injecting network latency, packet loss, and pod failures in staging', 'Verifying graceful degradation and circuit breaker patterns (Resilience4j)', 'Building automated self-healing operators in Kubernetes'], whyItMatters: 'Validates that systems survive unexpected hardware and network failures before they strike production.', aiRelevance: 'AI can design chaos experiment scenarios based on architectural topologies.', resources: [], practice: 'Execute a chaos experiment injecting 500ms network latency and verify that circuit breakers trip cleanly.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Production SRE capstone project and reliability checklist.',
        skills: [
          { id: 'sre-proj-capstone', title: 'Job-Ready Milestone: Resilient Distributed Platform with Automated SLO Burn Alerts', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['sre-chaos'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Kubernetes', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Chaos Mesh', 'Go'], whatToLearn: ['Full SLO calculation engine with multi-window multi-burn-rate alerts', 'Automated self-healing operator written in Go', 'Chaos engineering validation under heavy synthetic load'], whyItMatters: 'The premier portfolio demonstration proving senior Site Reliability Engineering competency.', aiRelevance: 'Includes automated anomaly detection and self-healing mechanisms.', resources: [], practice: 'Deploy a multi-service platform with automated SLO burn-rate alerting and chaos experiment verification.' }
        ]
      }
    ],
    projects: [
      { id: 'sre-p1', title: 'Multi-Window SLO Burn Rate Alerting Engine', type: 'Intermediate', description: 'Prometheus and Grafana configuration implementing Google SRE multi-window multi-burn-rate alerting for 99.9% availability targets.', technologies: ['Prometheus', 'Grafana', 'PromQL', 'Alertmanager'], deliverables: ['PromQL expressions calculating 1h and 6h burn rates', 'Grafana dashboard visualizing remaining error budget', 'Alertmanager routing to simulated PagerDuty endpoints'] },
      { id: 'sre-p2', title: 'Self-Healing Kubernetes Operator & Chaos Validation', type: 'Production / Job-Ready', description: 'Custom Kubernetes controller in Go that detects stalled pods and automatically remediates them, validated by Chaos Mesh experiments.', technologies: ['Go', 'Kubernetes', 'Chaos Mesh', 'OpenTelemetry'], deliverables: ['Custom Go operator watching pod health metrics', 'Automated self-healing remediation logic', 'Chaos test script validating system recovery in <30 seconds'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'sre-c1', label: 'Systems programming in Go or Python for operational tooling', checked: false },
        { id: 'sre-c2', label: 'Deep Linux kernel troubleshooting (strace, eBPF, /proc diagnostics)', checked: false },
        { id: 'sre-c3', label: 'SLI, SLO, SLA, and Error Budget design and policy enforcement', checked: false },
        { id: 'sre-c4', label: 'Incident management, blameless postmortems, and actionable runbooks', checked: false },
        { id: 'sre-c5', label: 'Advanced observability with OpenTelemetry and PromQL burn rate alerts', checked: false },
        { id: 'sre-c6', label: 'Chaos engineering (Chaos Mesh / Gremlin) and resilience patterns', checked: false }
      ],
      projects: [{ id: 'sre-cp1', label: '1 Complete reliability platform with multi-window burn rate alerts and chaos validation', checked: false }],
      csFundamentals: [{ id: 'sre-cs1', label: 'Distributed consensus (Raft/Paxos), fault domains, and Byzantine fault tolerance', checked: false }],
      career: [
        { id: 'sre-car1', label: 'Format SRE and reliability projects in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'sre-car2', label: 'Audit open-source Go operational tools on GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'sre-car3', label: 'Practice systems algorithms in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  },

  'mobile': {
    roleId: 'mobile-developer',
    title: 'Mobile Developer',
    description: 'Engineer high-performance cross-platform and native mobile apps using React Native, Flutter, offline persistence, and mobile UI design.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'JavaScript / Dart fundamentals, mobile UI patterns, and development environments.',
        skills: [
          { id: 'mob-prog', title: 'Mobile Programming (JavaScript/TypeScript or Dart)', category: 'Programming', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['TypeScript', 'Dart', 'Async/Await', 'OOP'], whatToLearn: ['Language fundamentals', 'Asynchronous streams and futures', 'Object-oriented mobile design patterns'], whyItMatters: 'The core language driving application logic and user interactions.', aiRelevance: 'AI accelerates component and widget scaffolding.', resources: [], practice: 'Build a mobile data manipulation module with asynchronous storage.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'React Native / Flutter framework, UI layouts, navigation, and state.',
        skills: [
          { id: 'mob-framework', title: 'React Native / Flutter Core & Navigation', category: 'Framework', level: 'intermediate', levelNum: 2, prerequisites: ['mob-prog'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['React Native', 'Flutter', 'React Navigation', 'Flexbox'], whatToLearn: ['Mobile layouts with Flexbox', 'Stack, Tab, and Drawer navigation', 'Handling touch gestures and device orientation'], whyItMatters: 'The primary framework for shipping cross-platform mobile apps.', aiRelevance: 'AI generates responsive mobile screen layouts easily.', resources: [], practice: 'Build a multi-screen mobile app with bottom tab navigation and smooth screen transitions.' },
          { id: 'mob-state-storage', title: 'Local Persistence & State Management', category: 'State & Storage', level: 'intermediate', levelNum: 2, prerequisites: ['mob-framework'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['SQLite', 'AsyncStorage', 'Zustand', 'WatermelonDB'], whatToLearn: ['Offline-first SQLite local storage', 'Global mobile state management', 'Syncing local changes when internet connection is restored'], whyItMatters: 'Mobile users expect apps to function seamlessly offline in airplanes and subways.', aiRelevance: 'AI helps design offline sync conflict resolution algorithms.', resources: [], practice: 'Build an offline-first mobile notes app that syncs automatically when connection restores.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Native device APIs, push notifications, and animations.',
        skills: [
          { id: 'mob-device-apis', title: 'Native Device APIs & Push Notifications', category: 'Device APIs', level: 'intermediate', levelNum: 3, prerequisites: ['mob-framework'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Camera API', 'GPS / Location', 'Push Notifications (FCM)', 'Biometrics'], whatToLearn: ['Camera and photo library permissions', 'Background GPS location tracking', 'Firebase Cloud Messaging (FCM) push notifications', 'FaceID / Fingerprint biometric authentication'], whyItMatters: 'Distinguishes true mobile applications from simple mobile web pages.', aiRelevance: 'AI helps handle complex permission request states cleanly.', resources: [], practice: 'Build an app that uses device camera, GPS tagging, and biometric login.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Performance optimization, app store deployment, and on-device AI.',
        skills: [
          { id: 'mob-perf-deploy', title: 'Mobile Performance, App Store Deployment & On-Device AI', category: 'Deployment', level: 'advanced', levelNum: 4, prerequisites: ['mob-device-apis'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['App Store Connect', 'Google Play Console', 'Fastlane', 'On-Device ML (CoreML / TFLite)'], whatToLearn: ['Profiling 60fps frame rate and memory leaks in Xcode / Android Studio', 'Automating build signing and submission with Fastlane', 'Running lightweight on-device ML models for offline speech and vision'], whyItMatters: 'App stores strictly review app stability, performance, and privacy disclosures.', aiRelevance: 'On-device ML models provide instant, private AI inference without cloud latency.', resources: [], practice: 'Package, sign, and automate beta app deployment using Fastlane.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Complete production mobile app capstone and app store launch.',
        skills: [
          { id: 'mob-proj-capstone', title: 'Job-Ready Milestone: Production Cross-Platform Mobile App', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['mob-perf-deploy'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['React Native / Flutter', 'SQLite', 'Fastlane', 'FCM', 'TypeScript'], whatToLearn: ['End-to-end mobile architecture', 'Offline-first sync engine', 'App Store and Google Play release package'], whyItMatters: 'Having a live, published app on the App Store / Google Play is the gold standard for mobile hiring.', aiRelevance: 'Integrates on-device and cloud AI features.', resources: [], practice: 'Build, test, and publish a production-ready mobile application with full offline sync.' }
        ]
      }
    ],
    projects: [
      { id: 'mob-p1', title: 'Offline-First Fitness & Location Tracker', type: 'Intermediate', description: 'Cross-platform mobile app tracking workouts with GPS, offline SQLite storage, and background location services.', technologies: ['React Native', 'SQLite', 'Location API', 'TypeScript'], deliverables: ['GPS route mapping and distance tracking', 'Offline data persistence with SQLite', 'Dark mode UI with 60fps animations'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'mob-c1', label: 'Cross-platform mobile engineering with React Native or Flutter', checked: false },
        { id: 'mob-c2', label: 'Offline-first database persistence (SQLite, WatermelonDB)', checked: false },
        { id: 'mob-c3', label: 'Native device APIs (Camera, GPS, Biometrics, Push Notifications)', checked: false },
        { id: 'mob-c4', label: 'App store release automation with Fastlane and code signing', checked: false }
      ],
      projects: [{ id: 'mob-cp1', label: '1 Live cross-platform mobile app published or submitted to TestFlight/Play Beta', checked: false }],
      csFundamentals: [{ id: 'mob-cs1', label: 'Mobile memory management, battery optimization, and lifecycle states', checked: false }],
      career: [{ id: 'mob-car1', label: 'Showcase mobile app demos and video captures in Resume Builder', checked: false, link: 'resume.html' }]
    }
  },

  'game': {
    roleId: 'game-developer',
    title: 'Game Developer',
    description: 'Create 2D and 3D games, implement physics simulation, program graphics shaders, and master game engine architecture in C++ / C#.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'C++ / C# programming, 3D vector mathematics, and game loop architecture.',
        skills: [
          { id: 'game-math', title: 'Game Mathematics & Physics Fundamentals', category: 'Math & Physics', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['Vectors', 'Matrices', 'Quaternions', 'Trigonometry', 'Physics'], whatToLearn: ['Vector operations (Dot product, Cross product, Normalization)', 'Rotation with Quaternions without gimbal lock', 'Newtonian physics simulation (velocity, acceleration, gravity)'], whyItMatters: 'Everything in 3D game engines relies on vector math and matrix transformations.', aiRelevance: 'AI can explain complex 3D rotation matrix conversions.', resources: [], practice: 'Code a 2D physics simulation with gravity, collision detection, and elastic bounce.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Game engines (Unity / Unreal Engine) and gameplay programming.',
        skills: [
          { id: 'game-engine', title: 'Game Engine Architecture (Unity / Unreal)', category: 'Engine', level: 'intermediate', levelNum: 2, prerequisites: ['game-math'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Unity (C#)', 'Unreal Engine (C++)', 'GameLoop', 'Prefabs'], whatToLearn: ['Component-Entity architecture (ECS)', 'The game loop: Update, FixedUpdate, LateUpdate', 'Player input handling, physics colliders, and raycasting'], whyItMatters: 'Unity and Unreal are the primary engines powering indie and AAA game studios.', aiRelevance: 'AI generates gameplay scripts and state machines rapidly.', resources: [], practice: 'Build a playable 3D character controller with jumping, sprinting, and camera controls.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Animation systems, audio engineering, and game AI.',
        skills: [
          { id: 'game-ai-behavior', title: 'Game AI: State Machines & Behavior Trees', category: 'Game AI', level: 'intermediate', levelNum: 3, prerequisites: ['game-engine'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Behavior Trees', 'Finite State Machines (FSM)', 'NavMesh', 'A* Pathfinding'], whatToLearn: ['Finite State Machines for enemy AI (Patrol, Chase, Attack)', 'Behavior trees for complex NPC decision making', 'NavMesh navigation and dynamic obstacle avoidance'], whyItMatters: 'Engaging, challenging enemy AI makes gameplay satisfying and immersive.', aiRelevance: 'Traditional behavior trees are increasingly augmented with LLM dialogue agents.', resources: [], practice: 'Build an enemy AI patrol and chase system with sight and hearing detection.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Graphics rendering, shaders, and performance profiling.',
        skills: [
          { id: 'game-shaders', title: 'Shaders & Graphics Pipeline (HLSL / GLSL)', category: 'Graphics', level: 'advanced', levelNum: 4, prerequisites: ['game-engine'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['HLSL', 'Shader Graph', 'Post-Processing', 'Lighting', 'Profiling'], whatToLearn: ['Vertex and Fragment shaders', 'PBR (Physically Based Rendering) lighting equations', 'Framerate optimization and draw call batching'], whyItMatters: 'Shaders produce stunning visual effects and water/dissolve animations.', aiRelevance: 'AI generates initial shader algorithms and noise equations.', resources: [], practice: 'Create a custom water shader with animated foam, refraction, and depth fading.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Playable game portfolio milestone.',
        skills: [
          { id: 'game-proj-capstone', title: 'Job-Ready Milestone: Complete Playable 3D Action Game', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['game-ai-behavior', 'game-shaders'], estimatedTime: '5 weeks', importance: 'essential', technologies: ['Unity / Unreal', 'C# / C++', 'Shaders', 'NavMesh'], whatToLearn: ['Complete gameplay loop: menus, gameplay, combat, scoring, game over', 'Polished audio and particle visual effects', 'Optimized build running at stable 60fps'], whyItMatters: 'A playable build published on itch.io or Steam is the best proof of game development skill.', aiRelevance: 'Leverages AI for procedural asset texturing and dialogue generation.', resources: [], practice: 'Build and publish a polished 3D action game with boss AI and shader effects.' }
        ]
      }
    ],
    projects: [
      { id: 'game-p1', title: '3D Dungeon Crawler with Intelligent AI', type: 'Production / Job-Ready', description: 'A complete 3D action dungeon crawler in Unity featuring NavMesh enemy AI, custom shaders, and inventory systems.', technologies: ['Unity', 'C#', 'HLSL', 'NavMesh'], deliverables: ['Playable build published on itch.io', 'Finite state machine boss AI', 'Custom PBR lighting and post-processing'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'game-c1', label: '3D vector mathematics, quaternions, and physics simulation', checked: false },
        { id: 'game-c2', label: 'C# / C++ game programming and game loop lifecycle', checked: false },
        { id: 'game-c3', label: 'Game engine mastery in Unity or Unreal Engine', checked: false },
        { id: 'game-c4', label: 'Enemy AI behavior trees, finite state machines, and pathfinding', checked: false },
        { id: 'game-c5', label: 'Shader programming (HLSL / Shader Graph) and draw call optimization', checked: false }
      ],
      projects: [{ id: 'game-cp1', label: '1 Playable 3D game build published online with gameplay video', checked: false }],
      csFundamentals: [{ id: 'game-cs1', label: 'Memory allocation, garbage collection spikes, and spatial partitioning (Octrees)', checked: false }],
      career: [{ id: 'game-car1', label: 'Document game mechanics and trailer links in Resume Builder', checked: false, link: 'resume.html' }]
    }
  },

  'web3': {
    roleId: 'web3-developer',
    title: 'Web3 Developer',
    description: 'Develop Ethereum smart contracts, decentralized applications (dApps), DeFi protocols, and Web3 security audits.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Blockchain fundamentals, cryptography, and Ethereum architecture.',
        skills: [
          { id: 'w3-crypto', title: 'Cryptography & Blockchain Architecture', category: 'Foundations', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['SHA-256', 'Elliptic Curve (ECDSA)', 'Merkle Trees', 'EVM'], whatToLearn: ['Asymmetric cryptography and digital signatures', 'Merkle trees and proof verification', 'Ethereum Virtual Machine (EVM) architecture and gas mechanics'], whyItMatters: 'Understanding state machines and cryptography is required before writing immutable smart contracts.', aiRelevance: 'AI helps explain complex cryptographic primitives.', resources: [], practice: 'Build a simple proof-of-work blockchain simulation in JavaScript.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Solidity smart contracts and local developer toolchains.',
        skills: [
          { id: 'w3-solidity', title: 'Solidity Smart Contract Engineering', category: 'Smart Contracts', level: 'intermediate', levelNum: 2, prerequisites: ['w3-crypto'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Solidity', 'ERC-20', 'ERC-721', 'Hardhat / Foundry', 'OpenZeppelin'], whatToLearn: ['Solidity syntax, storage vs memory vs calldata', 'Standard tokens: ERC-20 (Fungible) and ERC-721 (NFTs)', 'Testing contracts with Foundry or Hardhat', 'Security patterns: reentrancy guards, checks-effects-interactions'], whyItMatters: 'Smart contracts handle real money; bugs result in unrecoverable multi-million dollar hacks.', aiRelevance: 'AI code tools can audit Solidity code for common vulnerabilities like reentrancy.', resources: [], practice: 'Write, test, and deploy a secure ERC-20 staking contract with Foundry.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Decentralized frontend integration (dApps) with ethers.js / viem.',
        skills: [
          { id: 'w3-dapp', title: 'dApp Frontend & Web3 Integration', category: 'Frontend Integration', level: 'intermediate', levelNum: 3, prerequisites: ['w3-solidity'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['wagmi', 'viem', 'ethers.js', 'MetaMask', 'IPFS'], whatToLearn: ['Connecting user browser wallets (MetaMask, WalletConnect)', 'Calling smart contract read/write functions from React', 'Handling transaction receipts and gas estimation', 'Decentralized storage with IPFS / Arweave'], whyItMatters: 'Connects standard web users to blockchain smart contracts.', aiRelevance: 'AI assists in translating contract ABIs into typed client hooks.', resources: [], practice: 'Build a React dApp that connects wallets, reads token balances, and executes transactions.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Smart contract security, auditing, and DeFi protocols.',
        skills: [
          { id: 'w3-security', title: 'Smart Contract Auditing & DeFi Protocols', category: 'Security & DeFi', level: 'advanced', levelNum: 4, prerequisites: ['w3-dapp'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['Slither', 'Echidna', 'Reentrancy', 'Flash Loans', 'Automated Market Makers (AMM)'], whatToLearn: ['Static analysis with Slither and fuzz testing with Echidna', 'Automated Market Maker (AMM) constant product formula (x * y = k)', 'Flash loan mechanics and price oracle manipulation defenses'], whyItMatters: 'Smart contract auditors are among the highest paid specialists in tech.', aiRelevance: 'AI is widely used in automated static analysis of Solidity code.', resources: [], practice: 'Audit and exploit a simulated vulnerable smart contract in a local test suite.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Production decentralized application capstone.',
        skills: [
          { id: 'w3-proj-capstone', title: 'Job-Ready Milestone: Full-Stack DeFi Staking & Swap dApp', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['w3-security'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Solidity', 'Foundry', 'wagmi', 'Next.js', 'IPFS'], whatToLearn: ['Secure smart contracts deployed to Sepolia testnet', 'Audited code with 100% test coverage in Foundry', 'Production Next.js dApp frontend'], whyItMatters: 'Proves you can ship audited, secure blockchain applications.', aiRelevance: 'Includes automated security audits and AI-assisted contract review.', resources: [], practice: 'Deploy an audited staking dApp to a public testnet with a verified Etherscan contract.' }
        ]
      }
    ],
    projects: [
      { id: 'w3-p1', title: 'DeFi Token Swap & Staking Protocol', type: 'Production / Job-Ready', description: 'Audited smart contracts and Next.js frontend allowing users to stake tokens, earn yield, and execute decentralized swaps.', technologies: ['Solidity', 'Foundry', 'Next.js', 'viem'], deliverables: ['Foundry test suite with invariant fuzzing', 'Deployed and verified contract on Sepolia testnet', 'Responsive dApp interface with wallet integration'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'w3-c1', label: 'EVM architecture, gas optimization, and storage layout', checked: false },
        { id: 'w3-c2', label: 'Solidity smart contract development (ERC-20, ERC-721, OpenZeppelin)', checked: false },
        { id: 'w3-c3', label: 'Smart contract testing and fuzzing with Foundry or Hardhat', checked: false },
        { id: 'w3-c4', label: 'dApp frontend integration (wagmi, viem, ethers.js, WalletConnect)', checked: false },
        { id: 'w3-c5', label: 'Smart contract security vulnerabilities (Reentrancy, oracle attacks, Slither)', checked: false }
      ],
      projects: [{ id: 'w3-cp1', label: '1 Audited smart contract deployed to testnet with responsive dApp frontend', checked: false }],
      csFundamentals: [{ id: 'w3-cs1', label: 'Cryptographic hashing, digital signatures, and consensus algorithms', checked: false }],
      career: [{ id: 'w3-car1', label: 'Link verified Etherscan contracts in Resume Builder', checked: false, link: 'resume.html' }]
    }
  },

  'embedded': {
    roleId: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    description: 'Program microcontrollers, real-time operating systems (RTOS), hardware communication protocols, and IoT firmware in C and C++.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Low-level C programming, bitwise operations, and computer architecture.',
        skills: [
          { id: 'emb-c', title: 'Embedded C & Pointer Arithmetic', category: 'Programming', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['C', 'Pointers', 'Bitwise Operations', 'Volatile', 'Memory Maps'], whatToLearn: ['Memory pointers and direct address dereferencing', 'Bitwise masking, setting, and toggling register flags', 'The volatile keyword and compiler optimization prevention', 'Memory-mapped I/O (MMIO)'], whyItMatters: 'C is the universal language of microcontrollers and low-level firmware.', aiRelevance: 'AI code generators can assist in generating bitmask macros.', resources: [], practice: 'Implement a circular buffer and bit-manipulation driver in C without memory allocation.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Microcontroller peripherals, GPIO, timers, and hardware protocols.',
        skills: [
          { id: 'emb-hardware-protocols', title: 'Hardware Communication Protocols & Peripherals', category: 'Hardware Protocols', level: 'intermediate', levelNum: 2, prerequisites: ['emb-c'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['UART', 'SPI', 'I2C', 'GPIO', 'Timers', 'Interrupts (ISR)'], whatToLearn: ['Configuring General Purpose Input/Output (GPIO) pins', 'Hardware communication: UART serial, I2C bus, high-speed SPI', 'Hardware interrupts and Interrupt Service Routines (ISRs)', 'Timers and Pulse-Width Modulation (PWM)'], whyItMatters: 'Microcontrollers interact with sensors, motors, and displays through these standard protocols.', aiRelevance: 'AI helps debug timing diagrams and protocol framing issues.', resources: [], practice: 'Write a C driver communicating with an I2C temperature sensor and printing via UART.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Real-Time Operating Systems (FreeRTOS) and task synchronization.',
        skills: [
          { id: 'emb-rtos', title: 'Real-Time Operating Systems (FreeRTOS)', category: 'RTOS', level: 'intermediate', levelNum: 3, prerequisites: ['emb-hardware-protocols'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['FreeRTOS', 'Tasks', 'Semaphores', 'Queues', 'Priority Inversion'], whatToLearn: ['Preemptive real-time task scheduling', 'Task synchronization using Mutexes and Semaphores', 'Inter-task communication via Queues', 'Preventing priority inversion and race conditions'], whyItMatters: 'Complex embedded devices (medical, automotive) require guaranteed deterministic execution times.', aiRelevance: 'AI can audit task priorities for potential deadlocks.', resources: [], practice: 'Build a multi-tasking FreeRTOS firmware coordinating sensor polling and motor control.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'ARM Cortex architecture, low-power optimization, and IoT connectivity.',
        skills: [
          { id: 'emb-arm-iot', title: 'ARM Cortex-M Architecture & IoT Security', category: 'Architecture & IoT', level: 'advanced', levelNum: 4, prerequisites: ['emb-rtos'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['ARM Cortex-M', 'STM32', 'BLE / Wi-Fi', 'MQTT', 'Low-Power Modes'], whatToLearn: ['ARM Cortex-M register sets and Nested Vectored Interrupt Controller (NVIC)', 'Low-power sleep modes and battery life optimization', 'Wireless communication (BLE / Wi-Fi) and MQTT telemetry', 'Secure boot and encrypted firmware over-the-air (FOTA) updates'], whyItMatters: 'ARM powers billions of IoT and smart devices worldwide.', aiRelevance: 'TinyML allows deploying quantized neural networks directly to microcontrollers.', resources: [], practice: 'Build a low-power IoT sensor node that sleeps and transmits sensor telemetry over BLE.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Firmware engineering portfolio project.',
        skills: [
          { id: 'emb-proj-capstone', title: 'Job-Ready Milestone: Complete FreeRTOS IoT Device Firmware', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['emb-arm-iot'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['C', 'FreeRTOS', 'STM32 / ESP32', 'I2C', 'MQTT'], whatToLearn: ['Multi-tasking sensor hub with FreeRTOS', 'Secure MQTT communication over Wi-Fi', 'Firmware documentation and schematics'], whyItMatters: 'Demonstrates professional firmware architecture capabilities.', aiRelevance: 'Includes sensor anomaly detection using on-device TinyML.', resources: [], practice: 'Develop and flash a complete FreeRTOS firmware telemetry hub on an ESP32 or STM32.' }
        ]
      }
    ],
    projects: [
      { id: 'emb-p1', title: 'FreeRTOS Environmental Telemetry Hub', type: 'Production / Job-Ready', description: 'Production-grade C firmware on an ARM/ESP32 microcontroller with FreeRTOS task scheduling, sensor drivers, and Wi-Fi MQTT telemetry.', technologies: ['C', 'FreeRTOS', 'ESP32 / STM32', 'MQTT', 'I2C'], deliverables: ['Modular C peripheral drivers (I2C, SPI, UART)', 'Preemptive FreeRTOS task scheduling and queues', 'Documented hardware wiring schematics and code'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'emb-c1', label: 'Embedded C proficiency, pointers, memory-mapped I/O, and volatile keyword', checked: false },
        { id: 'emb-c2', label: 'Hardware protocol implementation (UART, SPI, I2C, GPIO interrupts)', checked: false },
        { id: 'emb-c3', label: 'Real-time operating system task scheduling with FreeRTOS', checked: false },
        { id: 'emb-c4', label: 'ARM Cortex-M architecture, NVIC interrupts, and low-power modes', checked: false },
        { id: 'emb-c5', label: 'Firmware Over-The-Air (FOTA) updates and secure bootloader design', checked: false }
      ],
      projects: [{ id: 'emb-cp1', label: '1 Working firmware repository with documentation and hardware schematics', checked: false }],
      csFundamentals: [{ id: 'emb-cs1', label: 'Computer architecture, cache coherence, and register allocation', checked: false }],
      career: [{ id: 'emb-car1', label: 'Format embedded firmware projects in Resume Builder', checked: false, link: 'resume.html' }]
    }
  },

  'cloud-security': {
    roleId: 'cloud-security-engineer',
    title: 'Cloud Security Engineer',
    description: 'Safeguard cloud infrastructure, automate compliance audits, enforce zero-trust network boundaries, and configure identity governance.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Security fundamentals, Linux hardening, and cloud architecture.',
        skills: [
          { id: 'sec-foundations', title: 'Security Principles, Cryptography & Linux Hardening', category: 'Foundations', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Zero Trust', 'CIA Triad', 'TLS/SSL', 'Linux Hardening', 'CIS Benchmarks'], whatToLearn: ['Confidentiality, Integrity, Availability (CIA) triad', 'Symmetric vs asymmetric encryption and TLS certificates', 'Applying CIS Benchmarks to harden Linux cloud servers'], whyItMatters: 'Foundational security knowledge required before defending enterprise cloud estates.', aiRelevance: 'AI can audit server configurations against CIS compliance benchmarks.', resources: [], practice: 'Harden a Linux server according to CIS benchmark standards.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Cloud IAM governance, network firewalls, and secrets management.',
        skills: [
          { id: 'sec-iam-vault', title: 'Cloud IAM Governance & Secrets Management', category: 'IAM & Secrets', level: 'intermediate', levelNum: 2, prerequisites: ['sec-foundations'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['AWS IAM', 'HashiCorp Vault', 'AWS Secrets Manager', 'MFA'], whatToLearn: ['Enforcing Zero-Trust IAM policies and condition keys', 'Dynamic short-lived credentials with HashiCorp Vault', 'Eliminating hardcoded credentials and secret rotation'], whyItMatters: 'Compromised access keys are the #1 attack vector in cloud environments.', aiRelevance: 'AI tools detect hardcoded secrets and overly permissive IAM policies in code.', resources: [], practice: 'Deploy HashiCorp Vault and configure dynamic credential injection for an application.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Cloud Security Posture Management (CSPM) and container security.',
        skills: [
          { id: 'sec-cspm-containers', title: 'Cloud Security Posture Management (CSPM) & Container Security', category: 'CSPM', level: 'intermediate', levelNum: 3, prerequisites: ['sec-iam-vault'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Trivy', 'Falco', 'AWS Security Hub', 'Checkov'], whatToLearn: ['Static analysis of Terraform code with Checkov / tfsec', 'Container image vulnerability scanning with Trivy', 'Runtime threat detection in Kubernetes using Falco eBPF'], whyItMatters: 'Automates security scanning directly into CI/CD pipelines before deployment.', aiRelevance: 'AI helps triage and prioritize vulnerability alerts by real exploitability.', resources: [], practice: 'Integrate automated Terraform security scanning and container image audits into CI/CD.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Cloud incident response, threat hunting, and compliance automation.',
        skills: [
          { id: 'sec-incident-compliance', title: 'Cloud Threat Detection & Compliance Automation', category: 'Detection & Response', level: 'advanced', levelNum: 4, prerequisites: ['sec-cspm-containers'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['AWS GuardDuty', 'CloudTrail', 'SIEM', 'SOC 2', 'ISO 27001'], whatToLearn: ['Analyzing CloudTrail audit logs for suspicious API calls', 'Automated containment workflows (isolating compromised EC2 instances)', 'Automating compliance checks for SOC 2 and ISO 27001'], whyItMatters: 'Enables rapid containment of cloud intrusions within minutes instead of days.', aiRelevance: 'AI models detect anomalous API call patterns across millions of cloud log events.', resources: [], practice: 'Build an automated incident response pipeline that isolates compromised VMs on GuardDuty alerts.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Cloud security audit and defense capstone.',
        skills: [
          { id: 'sec-proj-capstone', title: 'Job-Ready Milestone: Automated Cloud Security & Compliance Engine', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['sec-incident-compliance'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Terraform', 'AWS Security Hub', 'Checkov', 'Vault', 'Python'], whatToLearn: ['Hardened multi-account cloud architecture', 'Zero-trust network and IAM policies', 'Automated security scanning in CI/CD'], whyItMatters: 'Demonstrates enterprise cloud security engineering capabilities.', aiRelevance: 'Includes automated vulnerability triage using AI.', resources: [], practice: 'Design and deploy a hardened cloud environment with automated compliance auditing.' }
        ]
      }
    ],
    projects: [
      { id: 'sec-p1', title: 'Automated DevSecOps Pipeline & Runtime Threat Detector', type: 'Production / Job-Ready', description: 'Complete security pipeline integrating Checkov IaC scanning, Trivy container image audits, and Falco runtime detection in Kubernetes.', technologies: ['Terraform', 'Checkov', 'Trivy', 'Falco', 'Kubernetes'], deliverables: ['CI/CD pipeline blocking insecure Terraform code', 'Automated container vulnerability scanner', 'Falco runtime alert configuration'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'sec-c1', label: 'Zero-trust architecture and identity governance (IAM least privilege)', checked: false },
        { id: 'sec-c2', label: 'Secrets management and dynamic credentials with HashiCorp Vault', checked: false },
        { id: 'sec-c3', label: 'Infrastructure as Code security scanning (Checkov / tfsec)', checked: false },
        { id: 'sec-c4', label: 'Container security and runtime threat detection (Trivy, Falco)', checked: false },
        { id: 'sec-c5', label: 'Cloud compliance automation (SOC 2, ISO 27001, AWS Security Hub)', checked: false }
      ],
      projects: [{ id: 'sec-cp1', label: '1 Production DevSecOps pipeline with automated security gates and runtime alerts', checked: false }],
      csFundamentals: [{ id: 'sec-cs1', label: 'Asymmetric cryptography, digital certificates, and network protocol security', checked: false }],
      career: [{ id: 'sec-car1', label: 'Highlight cloud security audits and certifications in Resume Builder', checked: false, link: 'resume.html' }]
    }
  },

  'cybersecurity': {
    roleId: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Defend enterprise networks, investigate security alerts in SIEM platforms, conduct vulnerability assessments, and execute incident response.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Networking protocols, security frameworks, and operating system defenses.',
        skills: [
          { id: 'cyber-net', title: 'Network Protocols & Packet Analysis (Wireshark)', category: 'Networking', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Wireshark', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Nmap'], whatToLearn: ['Capturing and analyzing network traffic with Wireshark', 'Port scanning and service enumeration with Nmap', 'Identifying malicious packet signatures and port scans'], whyItMatters: 'Every network attack leaves traces in network packet captures.', aiRelevance: 'AI can analyze packet flow logs to highlight anomalous traffic spikes.', resources: [], practice: 'Analyze a PCAP network capture to reconstruct an attacker\'s brute-force attack.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'Threat landscapes, MITRE ATT&CK, and vulnerability assessments.',
        skills: [
          { id: 'cyber-mitre', title: 'Threat Intelligence & MITRE ATT&CK Framework', category: 'Threat Intelligence', level: 'intermediate', levelNum: 2, prerequisites: ['cyber-net'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['MITRE ATT&CK', 'Threat Intelligence', 'Common Vulnerabilities (CVE)'], whatToLearn: ['Mapping adversary Tactics, Techniques, and Procedures (TTPs)', 'Understanding the Cyber Kill Chain', 'Evaluating CVE severity with CVSS scoring'], whyItMatters: 'MITRE ATT&CK provides the standard vocabulary for analyzing and categorizing cyber attacks.', aiRelevance: 'AI threat intelligence tools correlate disparate attack indicators to MITRE tactics.', resources: [], practice: 'Map an advanced persistent threat (APT) incident report onto the MITRE ATT&CK matrix.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Security Information and Event Management (SIEM) and SOC triage.',
        skills: [
          { id: 'cyber-siem', title: 'SIEM Operations & Threat Detection (Splunk)', category: 'SIEM & SOC', level: 'intermediate', levelNum: 3, prerequisites: ['cyber-mitre'], estimatedTime: '3-4 weeks', importance: 'essential', technologies: ['Splunk', 'Elastic SIEM', 'KQL / SPL', 'Log Aggregation'], whatToLearn: ['Aggregating Windows Event Logs, Syslog, and firewall events', 'Writing detection queries in SPL (Search Processing Language) / KQL', 'Triaging Security Operations Center (SOC) alert tickets', 'Distinguishing true positives from false alarms'], whyItMatters: 'SIEM platforms are the central command center of all enterprise cybersecurity operations.', aiRelevance: 'AI assists in writing detection queries and summarizing alert timelines.', resources: [], practice: 'Build a Splunk detection dashboard identifying failed brute-force logins followed by success.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'Digital forensics, incident response, and malware analysis.',
        skills: [
          { id: 'cyber-forensics', title: 'Digital Forensics & Incident Response (DFIR)', category: 'DFIR', level: 'advanced', levelNum: 4, prerequisites: ['cyber-siem'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Autopsy', 'Volatility', 'YARA', 'Incident Response'], whatToLearn: ['Memory forensics with Volatility to find injected code', 'File system forensics and timeline analysis with Autopsy', 'Writing YARA rules to detect malware signatures', 'Containment, eradication, and recovery workflows'], whyItMatters: 'DFIR specialists determine how attackers entered, what data they touched, and how to evict them.', aiRelevance: 'AI helps decode obfuscated PowerShell scripts and reverse-engineer malicious payloads.', resources: [], practice: 'Perform memory forensics on a compromised memory dump to locate injected malware.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Complete SOC investigation and incident report portfolio.',
        skills: [
          { id: 'cyber-proj-capstone', title: 'Job-Ready Milestone: End-to-End SOC Investigation & Incident Report', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['cyber-forensics'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Splunk', 'Wireshark', 'Volatility', 'MITRE ATT&CK'], whatToLearn: ['Full incident reconstruction from initial breach to remediation', 'Executive and technical incident report writing', 'Actionable remediation and hardening recommendations'], whyItMatters: 'Demonstrates professional Security Operations Center analysis and communication capability.', aiRelevance: 'Includes automated threat intelligence correlation using AI.', resources: [], practice: 'Publish a comprehensive forensic investigation report analyzing a simulated enterprise ransomware intrusion.' }
        ]
      }
    ],
    projects: [
      { id: 'cyber-p1', title: 'Enterprise Threat Hunting & Forensic Investigation Report', type: 'Production / Job-Ready', description: 'End-to-end incident investigation reconstructing an enterprise attack via Splunk SIEM queries, Wireshark PCAPs, and Volatility memory analysis.', technologies: ['Splunk', 'Wireshark', 'Volatility', 'YARA'], deliverables: ['Complete incident chronology mapped to MITRE ATT&CK', 'Custom YARA detection rule targeting malware payload', 'Executive incident report with remediation recommendations'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'cyber-c1', label: 'Network packet analysis and protocol diagnostics with Wireshark and Nmap', checked: false },
        { id: 'cyber-c2', label: 'Threat intelligence and adversary mapping using the MITRE ATT&CK framework', checked: false },
        { id: 'cyber-c3', label: 'SIEM operations, log aggregation, and detection query writing (Splunk / Elastic)', checked: false },
        { id: 'cyber-c4', label: 'Digital forensics and incident response (Memory analysis, YARA rules, timeline analysis)', checked: false }
      ],
      projects: [{ id: 'cyber-cp1', label: '1 Professional forensic investigation report analyzing a simulated cyber intrusion', checked: false }],
      csFundamentals: [{ id: 'cyber-cs1', label: 'Operating system processes, memory paging, and network protocol handshakes', checked: false }],
      career: [{ id: 'cyber-car1', label: 'Highlight SOC investigations and cybersecurity certifications in Resume Builder', checked: false, link: 'resume.html' }]
    }
  },

  'qa-sdet': {
    roleId: 'qa-sdet-engineer',
    title: 'QA / SDET Engineer',
    description: 'Build automated end-to-end testing frameworks, API test suites, load benchmarks, and AI output validation pipelines.',
    levels: [
      {
        levelNum: 1,
        name: 'Foundation',
        description: 'Test methodologies, programming fundamentals, and test case design.',
        skills: [
          { id: 'qa-foundations', title: 'Software Testing Principles & Test Design', category: 'Foundations', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '2 weeks', importance: 'essential', technologies: ['Testing Pyramid', 'Boundary Value Analysis', 'Equivalence Partitioning'], whatToLearn: ['The Testing Pyramid (Unit, Integration, E2E)', 'Test case design: Boundary Value Analysis and Equivalence Partitioning', 'Bug lifecycle tracking and defect reporting standards'], whyItMatters: 'Methodological test design ensures critical edge cases are discovered before users find them.', aiRelevance: 'AI can generate boundary test cases and edge cases from user stories.', resources: [], practice: 'Design a comprehensive test plan and edge case matrix for an e-commerce checkout workflow.' },
          { id: 'qa-prog', title: 'Programming for Test Automation (TypeScript / Python)', category: 'Programming', level: 'beginner', levelNum: 1, prerequisites: [], estimatedTime: '3 weeks', importance: 'essential', technologies: ['TypeScript', 'Python', 'Object-Oriented Programming', 'Async/Await'], whatToLearn: ['Modern language syntax and asynchronous execution', 'Page Object Model (POM) design pattern principles', 'Writing assertions and test runners (Jest / pytest)'], whyItMatters: 'Modern SDETs are software engineers who build robust test automation code.', aiRelevance: 'AI assists in translating manual test cases into executable automation code.', resources: [], practice: 'Build a modular testing utility library with custom assertion helpers.' }
        ]
      },
      {
        levelNum: 2,
        name: 'Core',
        description: 'API testing automation and browser automation frameworks.',
        skills: [
          { id: 'qa-api-testing', title: 'API Test Automation (Postman / Newman / Supertest)', category: 'API Testing', level: 'intermediate', levelNum: 2, prerequisites: ['qa-prog'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['Postman', 'Newman', 'Supertest', 'REST APIs', 'JSON Schema'], whatToLearn: ['Automating REST API status code, header, and payload validation', 'JSON schema validation ensuring backward compatibility', 'Running automated API test collections in CI using Newman'], whyItMatters: 'API tests run 10x faster than browser UI tests and catch server regressions early.', aiRelevance: 'AI generates comprehensive API test payloads and fuzz testing vectors.', resources: [], practice: 'Build an automated API test suite with Newman validating 50+ endpoints in CI.' },
          { id: 'qa-playwright', title: 'Web E2E Automation with Playwright', category: 'E2E Testing', level: 'intermediate', levelNum: 2, prerequisites: ['qa-prog'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Playwright', 'TypeScript', 'Page Object Model', 'Auto-Waiting', 'Locators'], whatToLearn: ['Modern Playwright locators (getByRole, getByText) and auto-waiting', 'Page Object Model (POM) architecture for maintainable test suites', 'Cross-browser testing (Chromium, Firefox, WebKit) and mobile emulation', 'Handling authentication states and storage state reuse'], whyItMatters: 'Playwright is the modern industry standard for resilient, flake-free web automation.', aiRelevance: 'Playwright\'s codegen uses AI to record actions and generate clean locators.', resources: [], practice: 'Build an E2E Playwright test suite using the Page Object Model for a multi-step user flow.' }
        ]
      },
      {
        levelNum: 3,
        name: 'Intermediate',
        description: 'Performance testing and CI/CD test integration.',
        skills: [
          { id: 'qa-perf-testing', title: 'Performance & Load Testing with k6', category: 'Performance', level: 'intermediate', levelNum: 3, prerequisites: ['qa-api-testing'], estimatedTime: '2-3 weeks', importance: 'essential', technologies: ['k6', 'Load Testing', 'Stress Testing', 'Latency Metrics'], whatToLearn: ['Writing load test scripts in JavaScript with k6', 'Simulating virtual users (VUs), ramp-up, and spike testing', 'Validating p95 and p99 latency thresholds under heavy concurrency'], whyItMatters: 'Prevents websites from crashing under real-world traffic spikes (e.g. Black Friday).', aiRelevance: 'AI helps design realistic user traffic distribution curves.', resources: [], practice: 'Write a k6 performance test simulating 500 concurrent users with strict latency assertions.' }
        ]
      },
      {
        levelNum: 4,
        name: 'Advanced',
        description: 'CI/CD pipeline automation and testing AI-powered applications.',
        skills: [
          { id: 'qa-ai-eval', title: 'Testing AI Applications & CI Automation', category: 'AI Testing & CI', level: 'advanced', levelNum: 4, prerequisites: ['qa-playwright', 'qa-perf-testing'], estimatedTime: '3 weeks', importance: 'essential', technologies: ['GitHub Actions', 'AI Output Testing', 'Prompt Regression', 'Ragas'], whatToLearn: ['Parallel test execution and sharding in GitHub Actions CI pipelines', 'Automated testing of AI generative responses (evaluating accuracy and tone)', 'Preventing prompt regressions when foundation models are updated'], whyItMatters: 'Testing non-deterministic AI applications is the newest and most valuable SDET discipline.', aiRelevance: 'Directly applies testing rigor to generative AI applications and prompts.', resources: [], practice: 'Build an automated CI test suite that validates deterministic APIs and asserts AI answer quality.' }
        ]
      },
      {
        levelNum: 5,
        name: 'Job Ready',
        description: 'Complete test automation framework portfolio.',
        skills: [
          { id: 'qa-proj-capstone', title: 'Job-Ready Milestone: Enterprise Test Automation Framework', category: 'Projects', level: 'advanced', levelNum: 5, prerequisites: ['qa-ai-eval'], estimatedTime: '4 weeks', importance: 'essential', technologies: ['Playwright', 'TypeScript', 'k6', 'GitHub Actions', 'Allure Reports'], whatToLearn: ['Complete testing framework with Page Object Model', 'Cross-browser and mobile execution in CI', 'Automated HTML visual test reporting (Allure)'], whyItMatters: 'Proves to engineering teams that you can architect and maintain enterprise-grade test automation.', aiRelevance: 'Includes automated evaluation tests for AI features.', resources: [], practice: 'Build and deploy an enterprise test automation framework running daily in CI with visual reports.' }
        ]
      }
    ],
    projects: [
      { id: 'qa-p1', title: 'Enterprise Playwright & k6 Test Automation Framework', type: 'Production / Job-Ready', description: 'Production test automation framework in TypeScript utilizing Playwright for E2E tests, k6 for load tests, and GitHub Actions for parallel execution.', technologies: ['Playwright', 'TypeScript', 'k6', 'GitHub Actions'], deliverables: ['Page Object Model E2E test suite covering full user journey', 'k6 load test asserting sub-200ms p95 latency under 200 concurrent users', 'GitHub Actions workflow with parallel test sharding and HTML reports'] }
    ],
    jobReadyChecklist: {
      technical: [
        { id: 'qa-c1', label: 'Test methodology (Testing pyramid, boundary value analysis, test planning)', checked: false },
        { id: 'qa-c2', label: 'API test automation and contract testing (Postman, Newman, Supertest)', checked: false },
        { id: 'qa-c3', label: 'E2E browser automation with Playwright using the Page Object Model (POM)', checked: false },
        { id: 'qa-c4', label: 'Performance and load testing with k6 (Virtual users, latency percentiles)', checked: false },
        { id: 'qa-c5', label: 'Testing generative AI applications and evaluating prompt outputs', checked: false },
        { id: 'qa-c6', label: 'CI/CD pipeline test execution, parallel sharding, and test reporting', checked: false }
      ],
      projects: [{ id: 'qa-cp1', label: '1 Complete enterprise test automation framework running in GitHub Actions', checked: false }],
      csFundamentals: [{ id: 'qa-cs1', label: 'Document Object Model (DOM), asynchronous event handling, and HTTP semantics', checked: false }],
      career: [
        { id: 'qa-car1', label: 'Format SDET and test automation frameworks in Resume Builder', checked: false, link: 'resume.html' },
        { id: 'qa-car2', label: 'Showcase clean automation code on GitHub in GitHub Analyzer', checked: false, link: 'github.html' },
        { id: 'qa-car3', label: 'Practice core algorithmic coding problems in DSA Roadmap', checked: false, link: 'dsa.html' }
      ]
    }
  }
};

// Browser & CommonJS Node.js export pattern
if (typeof window !== 'undefined') {
  window.careerRoadmaps = careerRoadmaps;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { careerRoadmaps };
}
