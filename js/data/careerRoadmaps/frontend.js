/**
 * DevPilot-AI — Career Roadmap: Frontend Developer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const frontendRoadmap = {
  roleId: 'frontend-developer',
  roadmapId: 'frontend',
  title: 'Frontend Developer',
  category: 'development',
  description: 'Master client-side engineering from semantic web fundamentals and modern CSS systems to high-performance React architectures, accessibility, and production deployment.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Core web architecture, semantic markup, responsive styling systems, and version control.',
      skills: [
        {
          id: 'fe-html',
          title: 'HTML5 & Semantic Web Architecture',
          category: 'Web Foundations',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '1-2 weeks',
          prerequisites: [],
          description: 'Master document outline algorithms, semantic content sectioning, accessible forms, metadata, and SEO fundamentals.',
          whatToLearn: [
            'Document structure: DOCTYPE, html, head, body, meta viewport',
            'Semantic structural elements (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>)',
            'Content elements (<figure>, <figcaption>, <details>, <summary>, <dialog>)',
            'Accessible form controls (<fieldset>, <legend>, <label>, <input type="...">, <datalist>)',
            'Form validation attributes (required, pattern, min/max, step, maxlength)',
            'Media tags (<picture>, <source>, <video>, <audio>, responsive srcset/sizes)',
            'Technical SEO meta tags, Open Graph protocol, and Twitter Card specifications',
            'DOM tree creation, critical rendering path, and parsing order'
          ],
          whyItMatters: 'Semantic HTML directly impacts search engine indexability, screen-reader accessibility (WCAG), and browser rendering performance.',
          productionUse: 'Used in every enterprise web application to ensure compliance with ADA accessibility mandates, fast First Contentful Paint (FCP), and optimal search discoverability.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI coding assistants to draft initial accessible form schemas and semantic layouts, then manually audit tab order, aria-labels, and semantic tag validity.',
          handsOnTask: 'Build a multi-page accessible product marketing site with a complex multi-step application form using zero JavaScript for native form validations.',
          projectApplication: 'Serves as the foundation for the portfolio website and accessible UI component systems in later projects.',
          resources: [
            { title: 'MDN Web Docs: HTML Semantics', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics', type: 'documentation' },
            { title: 'W3C HTML5 Specification', url: 'https://html.spec.whatwg.org/multipage/', type: 'spec' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-css',
          title: 'Modern CSS3, Flexbox & Grid Systems',
          category: 'Styling & Layout',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-html'],
          description: 'Master the box model, responsive layouts with Flexbox and CSS Grid, custom properties (CSS variables), and modern cascade layers.',
          whatToLearn: [
            'CSS Box Model: margin collapsing, padding, border, content, and box-sizing: border-box',
            'Specificity hierarchy, inheritance, cascade layers (@layer), and the !important rule',
            'Flexbox: main/cross axes, flex-direction, justify-content, align-items, flex-grow/shrink/basis',
            'CSS Grid: grid-template-columns/rows, grid-template-areas, repeat(), minmax(), auto-fit vs auto-fill',
            'Responsive design: media queries, container queries (@container), fluid typography with clamp()',
            'CSS Custom Properties (design tokens for light/dark themes)',
            'Transitions, cubic-bezier curves, keyframe animations, and will-change optimization'
          ],
          whyItMatters: 'Modern CSS eliminates brittle layout hacks and enables resilient, responsive layouts that adapt smoothly across mobile, tablet, and 4K desktop screens.',
          productionUse: 'Creating cohesive design systems, fluid responsive layouts, theme engines, and micro-interactions in SaaS web products.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Ask AI to generate tricky grid templates or keyframe sequences, but verify browser compatibility, responsive wrapping, and CSS specificity hygiene.',
          handsOnTask: 'Create an e-commerce dashboard with a responsive product grid that switches from 1 to 4 columns using CSS Grid minmax() without any JavaScript.',
          projectApplication: 'Provides layout and responsive styling for the Responsive Multi-Page SaaS Landing Page.',
          resources: [
            { title: 'A Complete Guide to Flexbox (CSS-Tricks)', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'guide' },
            { title: 'A Complete Guide to CSS Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-git',
          title: 'Git Version Control & GitHub Workflows',
          category: 'Developer Tools',
          level: 'Level 1: Foundation',
          order: 3,
          difficulty: 'Beginner',
          importance: 'Essential',
          estimatedTime: '1 week',
          prerequisites: [],
          description: 'Learn distributed version control fundamentals, atomic commits, trunk-based development, branching, and pull request reviews.',
          whatToLearn: [
            'Git internals: working directory, staging index, commit tree, and HEAD pointer',
            'Essential commands: git init, clone, add, commit, status, diff, log, checkout, switch',
            'Branching workflows: feature branches, merge vs rebase, resolving merge conflicts',
            'Remote collaboration: git fetch, pull, push, upstream tracking, stash',
            'GitHub collaboration: pull requests, peer code reviews, issues, labels, milestones',
            'Commit hygiene: Conventional Commits standard (feat, fix, refactor, docs)'
          ],
          whyItMatters: 'Every software team tracks code through Git; failure to manage commits and resolve conflicts blocks delivery pipelines.',
          productionUse: 'Collaborating on enterprise repositories, CI/CD pipeline triggers, code review gates, and rollback management.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate meaningful Conventional Commit messages and review PR diff summaries, but always inspect the exact staged changes before pushing.',
          handsOnTask: 'Initialize a repository, create 3 feature branches with deliberate merge conflicts, resolve them cleanly via CLI, and publish a structured PR on GitHub.',
          projectApplication: 'Used continuously across every portfolio project to maintain professional Git history.',
          resources: [
            { title: 'Pro Git Book (Official)', url: 'https://git-scm.com/book/en/v2', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Deep vanilla JavaScript fundamentals, DOM manipulation, asynchronous programming, browser APIs, and package management.',
      skills: [
        {
          id: 'fe-js-core',
          title: 'JavaScript Fundamentals & ES6+ Syntax',
          category: 'Programming Core',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fe-html', 'fe-css'],
          description: 'Master JavaScript runtime execution, lexical scope, closures, prototypes, event loops, and modern ES6+ language capabilities.',
          whatToLearn: [
            'Data types: primitives (string, number, boolean, null, undefined, symbol, bigint) vs reference objects',
            'Variable declaration rules: let, const, var, temporal dead zone, and lexical scoping',
            'Execution context, creation vs execution phases, variable hoisting, and call stack',
            'Closures, private variable encapsulation, and higher-order functions',
            'this keyword binding rules (implicit, explicit call/apply/bind, new binding, arrow functions)',
            'Modern ES6+: destructuring, rest/spread operators, template literals, optional chaining (?.), nullish coalescing (??)',
            'Object methods: Object.keys/values/entries, Object.assign, Object.freeze, structuredClone',
            'Array functional methods: map, filter, reduce, find, some, every, flatMap, sort'
          ],
          whyItMatters: 'Frameworks come and go, but JavaScript fundamentals power all frontend code. Deep JS knowledge prevents subtle memory leaks and UI bugs.',
          productionUse: 'Core language for building client logic, state transforms, calculations, and custom user interactions.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to explain tricky closures or edge-case coercion bugs; write unit tests with AI to test edge conditions.',
          handsOnTask: 'Build a fully functional in-memory Data Structure & Algorithm visualization tool using pure ES6+ classes, closures, and higher-order functions.',
          projectApplication: 'Powers the core logic for the Interactive Kanban Project Board application.',
          resources: [
            { title: 'JavaScript.info (Modern JS Tutorial)', url: 'https://javascript.info/', type: 'tutorial' },
            { title: 'You Don’t Know JS Yet by Kyle Simpson', url: 'https://github.com/getify/You-Dont-Know-JS', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-dom-events',
          title: 'DOM Manipulation & Browser Event Architecture',
          category: 'Browser APIs',
          level: 'Level 2: Core',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['fe-js-core'],
          description: 'Master programmatic document manipulation, event capturing/bubbling, event delegation, and browser performance optimization.',
          whatToLearn: [
            'DOM query methods (querySelector, querySelectorAll, getElementById) and live vs static NodeLists',
            'Node creation, manipulation, insertion (append, prepend, replaceChildren), and DocumentFragment',
            'Event propagation lifecycle: capturing phase, target phase, bubbling phase, stopPropagation()',
            'Event delegation pattern for high-performance dynamic element event handling',
            'Keyboard, mouse, pointer, touch, scroll, and input event handling with preventDefault()',
            'Browser rendering pipeline: reflow (layout), repaint, compositing, and requestAnimationFrame',
            'IntersectionObserver API (lazy loading, infinite scroll) and ResizeObserver API'
          ],
          whyItMatters: 'Understanding raw DOM manipulation and browser rendering cycles allows developers to optimize UI responsiveness and understand what frameworks do under the hood.',
          productionUse: 'Building drag-and-drop interfaces, infinite-scroll feeds, virtualized lists, and custom interactive widgets.',
          aiRelevance: 'Low',
          aiWorkflow: 'Rely primarily on official MDN documentation for browser event specifications; verify AI suggestions against browser performance best practices.',
          handsOnTask: 'Build a drag-and-drop Kanban board with column reordering, smooth drop animations, and zero third-party libraries.',
          projectApplication: 'Directly applied in the Interactive Kanban Board project.',
          resources: [
            { title: 'MDN Web Docs: Introduction to the DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-async-fetch',
          title: 'Asynchronous JavaScript & RESTful APIs',
          category: 'Network & Async',
          level: 'Level 2: Core',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-js-core'],
          description: 'Master promises, async/await syntax, browser event loop (microtasks vs macrotasks), Fetch API, error handling, and web storage.',
          whatToLearn: [
            'JavaScript Event Loop: Call Stack, Web APIs, Task Queue, Microtask Queue (Promises)',
            'Promise lifecycle states (pending, fulfilled, rejected) and chaining (.then, .catch, .finally)',
            'Promise concurrency combinators: Promise.all, Promise.allSettled, Promise.race, Promise.any',
            'async/await syntax, try/catch/finally blocks, and custom error classes',
            'Fetch API: request methods (GET, POST, PUT, PATCH, DELETE), headers, body, CORS, status codes',
            'AbortController API for cancelling in-flight requests and preventing race conditions',
            'Client-side persistence: localStorage, sessionStorage, IndexedDB, and cookies'
          ],
          whyItMatters: 'Modern frontend applications are distributed client nodes that query backend APIs constantly. Robust async handling prevents UI freezes and data race bugs.',
          productionUse: 'Fetching backend services, offline caching, caching JWT session tokens, and handling intermittent network disconnects.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate mock API endpoints and simulate network failures, but manually write robust error boundaries and retry logic.',
          handsOnTask: 'Build a multi-source weather and flight tracker with auto-refresh, AbortController request cancellation, and offline localStorage fallback.',
          projectApplication: 'Used for remote data fetching in all intermediate and production projects.',
          resources: [
            { title: 'Jake Archibald: In the Loop (Event Loop Video)', url: 'https://www.youtube.com/watch?v=cCOL7MC4Pl0', type: 'video' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-npm-tooling',
          title: 'npm, Package Management & Build Tooling',
          category: 'Developer Tools',
          level: 'Level 2: Core',
          order: 7,
          difficulty: 'Beginner',
          importance: 'Essential',
          estimatedTime: '1 week',
          prerequisites: ['fe-git'],
          description: 'Understand Node.js runtime fundamentals, package.json configuration, dependencies vs devDependencies, and modern bundlers like Vite.',
          whatToLearn: [
            'Node.js runtime basics, npm CLI commands (install, uninstall, update, audit)',
            'package.json & package-lock.json semantic versioning rules (^, ~, exact versions)',
            'dependencies vs devDependencies vs peerDependencies',
            'npm scripts execution, npx runner, and environment variable configuration (.env)',
            'Modern bundlers: Vite architecture, Hot Module Replacement (HMR), esbuild, and Rollup builds',
            'Code quality tooling: ESLint configuration, Prettier formatting, and Husky pre-commit git hooks'
          ],
          whyItMatters: 'Every modern frontend project relies on dependency trees and build pipelines. Proper tooling setup guarantees consistent code quality across team members.',
          productionUse: 'Setting up repository toolchains, bundling production-ready assets, tree-shaking dead code, and preventing vulnerable dependencies.',
          aiRelevance: 'Low',
          aiWorkflow: 'Use AI to troubleshoot npm peer dependency conflicts or generate ESLint configs; always check npm audit reports manually.',
          handsOnTask: 'Configure a clean Vite + Vanilla JS project with strict ESLint, Prettier, Husky pre-commit hooks, and production build optimization.',
          projectApplication: 'Serves as the project scaffold and build environment for all React and Next.js applications.',
          resources: [
            { title: 'Vite Official Guide', url: 'https://vitejs.dev/guide/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'React component architectures, reactive state management, TypeScript type safety, routing, and component lifecycles.',
      skills: [
        {
          id: 'fe-react-core',
          title: 'React Fundamentals, JSX & Component Architecture',
          category: 'Frontend Frameworks',
          level: 'Level 3: Intermediate',
          order: 8,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fe-dom-events', 'fe-async-fetch', 'fe-npm-tooling'],
          description: 'Master declarative UI patterns, Virtual DOM reconciliation, JSX syntax, props, component composition, and unidirectional data flow.',
          whatToLearn: [
            'Declarative vs imperative UI paradigms, Virtual DOM diffing, and fiber reconciliation',
            'JSX syntax rules, embedding expressions, conditional rendering, and list mapping with unique keys',
            'Functional components, props passing, default props, and children prop composition pattern',
            'Unidirectional data flow, lifting state up, and container vs presentational component patterns',
            'Controlled vs uncontrolled form elements and ref forwarding with useRef'
          ],
          whyItMatters: 'React is the dominant enterprise UI library worldwide. Mastering component composition is essential for scalable frontend engineering.',
          productionUse: 'Building reusable enterprise design libraries, customer-facing web apps, and dynamic enterprise portals.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to scaffold boilerplate component interfaces and generate unit test cases, while retaining strict ownership over component boundaries and prop contracts.',
          handsOnTask: 'Build an interactive multi-step product configurator with live preview, dynamic form fields, and reusable UI component primitives.',
          projectApplication: 'Provides the UI layer for the Production E-Commerce & Analytics Dashboard application.',
          resources: [
            { title: 'React Official Documentation (react.dev)', url: 'https://react.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-react-hooks',
          title: 'React Hooks, State Management & Custom Hooks',
          category: 'Frontend Frameworks',
          level: 'Level 3: Intermediate',
          order: 9,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['fe-react-core'],
          description: 'Master standard React hooks (useState, useEffect, useMemo, useCallback, useContext, useReducer) and authoring custom hooks.',
          whatToLearn: [
            'useState: state immutability, updater functions, and batching in React 18',
            'useEffect: side effects, dependency array semantics, cleanup functions, and avoiding infinite re-renders',
            'useRef: DOM node references, persisting mutable values across renders without re-rendering',
            'Performance hooks: useMemo for expensive calculations, useCallback for memoized callback references',
            'useReducer: state machines, action dispatching, and managing complex multi-branch state',
            'useContext: avoiding prop drilling for global themes, user auth sessions, and notifications',
            'Authoring reusable custom hooks (e.g., useDebounce, useLocalStorage, useMediaQuery, useFetch)'
          ],
          whyItMatters: 'Writing idiomatic hooks ensures clean separation of stateful logic from UI rendering, reducing component complexity and preventing performance bottlenecks.',
          productionUse: 'Managing global app state, coordinating live server subscriptions, encapsulating business logic, and optimizing re-renders in large apps.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to draft custom hook abstractions and identify dependency array omissions; verify memoization necessity to avoid premature optimization.',
          handsOnTask: 'Create an extensible custom hook library containing useDebounce, useLocalStorage, useWindowSize, and useInfiniteScroll with complete test coverage.',
          projectApplication: 'Core state engine for the Production E-Commerce Platform.',
          resources: [
            { title: 'React Hooks Reference', url: 'https://react.dev/reference/react', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-typescript',
          title: 'TypeScript for Production React Applications',
          category: 'Type Systems',
          level: 'Level 3: Intermediate',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fe-react-hooks'],
          description: 'Master static type analysis, interfaces, type aliases, generics, union types, utility types, and typing React components.',
          whatToLearn: [
            'TypeScript compiler (tsc), tsconfig.json strict configuration options',
            'Basic types, type inference, literal types, unions, intersections, and discriminated unions',
            'Interfaces vs Type Aliases, extending interfaces, declaration merging',
            'Generics in functions, interfaces, classes, and type constraints (extends keyof)',
            'Utility types: Partial, Required, Readonly, Pick, Omit, Record, ReturnType, Exclude',
            'Typing React components: ComponentProps, FC, props with children, ReactNode vs JSX.Element',
            'Typing React events (MouseEvent, ChangeEvent, FormEvent) and HTML element refs'
          ],
          whyItMatters: 'TypeScript catches over 15% of runtime bugs at compile time and provides self-documenting codebases with rich IDE autocomplete in large teams.',
          productionUse: 'Standard industry requirement for all modern frontend codebases in commercial tech companies.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to infer complex generic return types or convert JSON payload samples into clean TypeScript interfaces.',
          handsOnTask: 'Refactor an untyped JavaScript React application to 100% strict TypeScript with zero `any` types and fully typed API responses.',
          projectApplication: 'Applied across all production deliverables to guarantee zero runtime null pointer bugs.',
          resources: [
            { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'handbook' },
            { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-routing-state',
          title: 'Client Routing (React Router) & Global State',
          category: 'Frontend Architecture',
          level: 'Level 3: Intermediate',
          order: 11,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-typescript'],
          description: 'Master client-side Single Page Application (SPA) routing, nested routes, loaders/actions, and server state management with TanStack Query or Redux Toolkit / Zustand.',
          whatToLearn: [
            'React Router v6+: createBrowserRouter, Routes, Route, Outlet, dynamic route params (:id)',
            'Navigation: Link, NavLink, useNavigate, useSearchParams, and protected private route wrappers',
            'Data loaders, actions, error boundaries, and optimistic UI updates',
            'Server State vs Client State distinction: caching, background refetching, and cache invalidation',
            'TanStack Query (React Query): useQuery, useMutation, query keys, pagination, infinite queries',
            'Client State Management: lightweight stores with Zustand vs Redux Toolkit slices and selectors'
          ],
          whyItMatters: 'Separating server cache from client UI state eliminates massive Redux boilerplate and provides instant, snappy navigation experiences.',
          productionUse: 'Powers navigation and caching in complex SaaS web platforms, e-commerce storefronts, and admin dashboards.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to scaffold query hooks and mutation patterns; manually audit cache invalidation triggers and token refresh interceptors.',
          handsOnTask: 'Build a multi-page authenticated admin portal with protected routes, search query param synchronization, and TanStack Query data caching.',
          projectApplication: 'Forms the routing and remote data layer of the Full-Stack Cloud SaaS Application.',
          resources: [
            { title: 'React Router Documentation', url: 'https://reactrouter.com/', type: 'documentation' },
            { title: 'TanStack Query Docs', url: 'https://tanstack.com/query/latest', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Automated testing, Core Web Vitals performance optimization, web security, accessibility standards (WCAG), and CI/CD pipelines.',
      skills: [
        {
          id: 'fe-testing',
          title: 'Automated Testing: Unit, Integration & E2E',
          category: 'Quality & Testing',
          level: 'Level 4: Advanced',
          order: 12,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['fe-routing-state'],
          description: 'Master unit and component integration testing with Vitest & React Testing Library, mock service workers (MSW), and End-to-End browser testing with Playwright.',
          whatToLearn: [
            'The Testing Trophy: Unit tests vs Component integration tests vs End-to-End tests',
            'Vitest / Jest test runner setup, assertions, matchers, test suites, and code coverage reports',
            'React Testing Library philosophy: test user behavior, not implementation details',
            'RTL queries (getByRole, findByText, queryByLabelText) and userEvent simulations',
            'Mock Service Worker (MSW) for declarative network request mocking in tests',
            'End-to-End testing with Playwright: page objects, cross-browser test runs, and headless CI runs'
          ],
          whyItMatters: 'Automated test suites allow teams to ship multiple times a day with total confidence, preventing regressions and reducing QA bottlenecks.',
          productionUse: 'Mandatory pre-merge PR verification gates in all high-performing tech organizations.',
          aiRelevance: 'High',
          aiWorkflow: 'Prompt AI to generate initial unit test cases for complex pure functions and component edge cases, then verify assertions against user behaviors.',
          handsOnTask: 'Write a comprehensive test suite for a checkout workflow with MSW API mocks and a Playwright E2E test verifying order completion.',
          projectApplication: 'Integrates automated test suites into all progressive portfolio projects.',
          resources: [
            { title: 'React Testing Library Documentation', url: 'https://testing-library.com/docs/react-testing-library/intro/', type: 'documentation' },
            { title: 'Playwright Documentation', url: 'https://playwright.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-performance',
          title: 'Web Performance Optimization & Core Web Vitals',
          category: 'Performance',
          level: 'Level 4: Advanced',
          order: 13,
          difficulty: 'Advanced',
          importance: 'Essential',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-testing'],
          description: 'Master Google Core Web Vitals (LCP, INP, CLS), Chrome DevTools performance profiling, bundle splitting, asset optimization, and rendering efficiency.',
          whatToLearn: [
            'Google Core Web Vitals metrics: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS)',
            'Chrome DevTools Performance panel: recording timelines, identifying long tasks (>50ms), and analyzing layout shifts',
            'JavaScript bundle optimization: code splitting with dynamic import() and React.lazy / Suspense',
            'Tree shaking, dead code elimination, and bundle analysis with rollup-plugin-visualizer',
            'Image & font optimization: next-gen formats (WebP, AVIF), font-display: swap, self-hosting fonts',
            'Caching strategies: HTTP Cache-Control headers, stale-while-revalidate, and CDN edge delivery'
          ],
          whyItMatters: 'Every 100ms improvement in load time increases conversion rates by up to 8%. Poor Core Web Vitals directly degrade Google organic search ranking.',
          productionUse: 'Auditing and optimizing enterprise storefronts, high-traffic SaaS landing pages, and web apps.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to parse bundle analyzer JSON reports and recommend lightweight library alternatives for heavy npm dependencies.',
          handsOnTask: 'Take a deliberately unoptimized React site with poor Lighthouse scores (<40) and refactor it to achieve 95+ across all Lighthouse categories.',
          projectApplication: 'Optimizes production deliverables to meet top-tier industry Lighthouse and CWV standards.',
          resources: [
            { title: 'web.dev Core Web Vitals Guide', url: 'https://web.dev/explore/learn-core-web-vitals', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-a11y-sec',
          title: 'Web Accessibility (WCAG 2.2) & Frontend Security',
          category: 'Compliance & Security',
          level: 'Level 4: Advanced',
          order: 14,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['fe-testing'],
          description: 'Master WCAG 2.2 AA accessibility standards, ARIA roles, keyboard focus management, XSS prevention, Content Security Policy, and CSRF defense.',
          whatToLearn: [
            'WCAG 2.2 principles: Perceivable, Operable, Understandable, Robust (POUR)',
            'Keyboard navigation: focus rings, tab indexing (tabindex="0" vs "-1"), focus traps in modals',
            'WAI-ARIA: roles, states, properties (aria-expanded, aria-hidden, aria-live, aria-labelledby)',
            'Screen reader testing using NVDA, VoiceOver, and automated axe-core linter audits',
            'Frontend security threats: Cross-Site Scripting (XSS), sanitizing HTML with DOMPurify',
            'Cross-Site Request Forgery (CSRF) defenses and secure cookie flags (SameSite=Strict, HttpOnly, Secure)',
            'Content Security Policy (CSP) headers, Subresource Integrity (SRI), and dependency vulnerability scans'
          ],
          whyItMatters: 'Accessibility is legally required for public and enterprise software. Security flaws in frontend code expose user sessions to data theft.',
          productionUse: 'Ensuring enterprise software complies with Section 508 / ADA regulations and passes enterprise SOC2 security audits.',
          aiRelevance: 'Low',
          aiWorkflow: 'Never rely on AI alone for accessibility compliance; always test manually with screen readers and keyboard navigation.',
          handsOnTask: 'Build an accessible modal and combobox widget from scratch that achieves 100% WCAG 2.2 AA compliance and zero axe-core audit warnings.',
          projectApplication: 'Integrated into all project component libraries and production portals.',
          resources: [
            { title: 'W3C Web Accessibility Initiative (WAI)', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/', type: 'spec' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-cicd-deploy',
          title: 'CI/CD Pipelines & Cloud Edge Deployment',
          category: 'DevOps for Frontend',
          level: 'Level 4: Advanced',
          order: 15,
          difficulty: 'Intermediate',
          importance: 'Essential',
          estimatedTime: '1-2 weeks',
          prerequisites: ['fe-testing'],
          description: 'Configure automated GitHub Actions pipelines to lint, test, build, and deploy production static sites to modern cloud edge networks (Vercel, Cloudflare Pages, AWS S3/CloudFront).',
          whatToLearn: [
            'GitHub Actions workflows: triggers on push/PR, runners, matrix testing, and secrets management',
            'Automated pipeline steps: checkout, node setup, dependency caching, linting, unit testing, build verification',
            'Preview deployments: ephemeral branch preview environments on Vercel and Netlify',
            'Static asset hosting on edge networks: Cloudflare Pages, AWS S3 + CloudFront CDN distribution',
            'Custom domains, SSL/TLS certificate automation, and DNS CNAME configuration',
            'Production environment variable management and build time vs runtime variables'
          ],
          whyItMatters: 'Automated CI/CD removes human error during deployments and enables continuous delivery of features to global edge users in seconds.',
          productionUse: 'Powering automated release cycles for SaaS companies with zero downtime deployments.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate boilerplate GitHub Actions YAML configs; verify syntax and permissions manually.',
          handsOnTask: 'Create a GitHub Actions workflow that runs ESLint, TypeScript check, Vitest, builds the application, and deploys to preview URLs on every PR.',
          projectApplication: 'Automates deployment and continuous testing for all portfolio repositories.',
          resources: [
            { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-ai-integration',
          title: 'AI UI Integration & Real-Time Streaming Interfaces',
          category: 'Modern Web Architecture',
          level: 'Level 4: Advanced',
          order: 16,
          difficulty: 'Advanced',
          importance: 'Recommended',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-async-fetch', 'fe-react-core'],
          description: 'Master real-time AI interface engineering including streaming LLM responses, Server-Sent Events (SSE), token streaming, markdown parsing, and optimistic UI updates.',
          whatToLearn: [
            'Server-Sent Events (SSE) and chunked Transfer-Encoding handling via the Fetch API and ReadableStream',
            'Vercel AI SDK (useChat, useCompletion, assistant UI hooks)',
            'Streaming Markdown rendering (stream-down, remark/rehype with syntax highlighting)',
            'Optimistic UI state updates and abort controllers for cancelling active completions',
            'Handling LLM rate limits, 429 retries with exponential backoff, and partial error recovery',
            'Token counter estimators and token usage visualization UI'
          ],
          whyItMatters: 'Modern web applications increasingly integrate conversational and generative AI. Rendering tokens smoothly without UI jank is now an expected frontend capability.',
          productionUse: 'Powers real-time chat interfaces, AI copilot sidebars, code completion widgets, and interactive document summarizers.',
          aiRelevance: 'Core',
          aiWorkflow: 'Build robust client-side streaming consumers that gracefully degrade if model inference latencies spike or websocket/SSE connections drop.',
          handsOnTask: 'Build a streaming AI playground with token-by-token markdown typing effect, message history branch switching, and stream cancellation controls.',
          projectApplication: 'Applied in the Production E-Commerce & Analytics Platform to power an AI product advisor and support assistant.',
          technologies: ['Server-Sent Events (SSE)', 'ReadableStream', 'Vercel AI SDK', 'Fetch API', 'AbortController', 'Streaming Markdown'],
          resources: [
            { title: 'MDN Web Docs: Using Server-Sent Events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events', type: 'documentation' },
            { title: 'Vercel AI SDK Documentation', url: 'https://sdk.vercel.ai/docs', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Production-grade project architecture, frontend system design, technical interview mastery, and hiring portfolio preparation.',
      skills: [
        {
          id: 'fe-nextjs-ssr',
          title: 'Full-Stack React with Next.js & Server Components',
          category: 'Modern Frameworks',
          level: 'Level 5: Job Ready',
          order: 16,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['fe-routing-state', 'fe-performance'],
          description: 'Master the Next.js App Router, React Server Components (RSC), Server Actions, static site generation (SSG), server-side rendering (SSR), and streaming architectures.',
          whatToLearn: [
            'App Router directory architecture (layout.tsx, page.tsx, loading.tsx, error.tsx, not-found.tsx)',
            'React Server Components (RSC) vs Client Components ("use client"): composition rules and bundle benefits',
            'Rendering paradigms: Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR)',
            'Server Actions for seamless backend mutations without manual API route boilerplate',
            'Route Handlers (API endpoints) and Edge Runtime vs Node.js runtime execution',
            'Streaming UI with Suspense boundaries and partial pre-rendering'
          ],
          whyItMatters: 'Next.js is the primary framework choice for modern React engineering positions, bridging client-side reactivity with server-side performance.',
          productionUse: 'Architecting SEO-critical consumer websites, high-speed media portals, and full-stack enterprise web platforms.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to scaffold Server Action handlers and Zod validation schemas; ensure sensitive secrets are never leaked to client components.',
          handsOnTask: 'Build a production-grade content platform with Next.js App Router featuring ISR, Server Actions, streaming search, and dynamic OpenGraph image generation.',
          projectApplication: 'Core framework for the Capstone Production Web Application.',
          resources: [
            { title: 'Next.js Official Documentation', url: 'https://nextjs.org/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-system-design',
          title: 'Frontend System Design & Architecture',
          category: 'System Architecture',
          level: 'Level 5: Job Ready',
          order: 17,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-nextjs-ssr', 'fe-performance'],
          description: 'Learn to architect large-scale frontend systems: micro-frontends, component library design systems, state caching strategies, real-time WebSockets, and offline synchronization.',
          whatToLearn: [
            'System Design Framework: requirements gathering, scope definition, data modeling, API contracts, component tree',
            'Design system architecture: atomic design principles, token-based design, headless UI primitives (Radix, HeadlessUI)',
            'State management tradeoffs: global stores vs URL state vs server caching vs localized component state',
            'Real-time communication: WebSockets, Server-Sent Events (SSE), and optimistic UI synchronization',
            'Micro-frontends vs Monorepos (Turborepo, Nx) for multi-team enterprise codebases',
            'Observability & monitoring: Sentry error tracking, user session replay, and performance logging'
          ],
          whyItMatters: 'Senior frontend interviews evaluate your ability to make sound architectural tradeoffs under ambiguity rather than memorizing trivia.',
          productionUse: 'Designing multi-million user web architectures that scale across distributed engineering teams.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to brainstorm architecture trade-off tables (e.g., SSR vs SPA for specific user personas), but construct the final architectural rationale independently.',
          handsOnTask: 'Draft a comprehensive frontend architecture design document for an enterprise Collaborative Document Editor (like Notion or Google Docs).',
          projectApplication: 'Directly informs the architecture of your Capstone project and interview presentations.',
          resources: [
            { title: 'GreatFrontEnd Frontend System Design Guide', url: 'https://www.greatfrontend.com/system-design', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-interview-prep',
          title: 'Frontend Coding Interviews & DOM Machine Coding',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 18,
          difficulty: 'Advanced',
          importance: 'Essential',
          estimatedTime: '2-3 weeks',
          prerequisites: ['fe-system-design'],
          description: 'Master live machine coding rounds, DOM algorithms, polyfills (Promise.all, Array.prototype.flat, debounce/throttle), and behavioral STAR storytelling.',
          whatToLearn: [
            'Polyfilling core JavaScript features: Promise, Promise.all, Function.prototype.bind, debounce, throttle, deepClone',
            'Machine coding challenges under timed conditions (Autocomplete with debouncing, Star Rating widget, Virtualized Table)',
            'Common DSA algorithms applied to frontend: Tree traversals (DOM tree), Trie for autocomplete, LRU Cache for assets',
            'Behavioral interviews using the STAR method (Situation, Task, Action, Result) for frontend engineering projects',
            'Effective code walk-throughs: explaining trade-offs, edge cases, and accessibility considerations during live pair coding'
          ],
          whyItMatters: 'Technical talent must be demonstrated in live high-pressure coding rounds to convert applications into competitive job offers.',
          productionUse: 'Writing bulletproof, maintainable algorithms that solve real user problems under constraints.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate mock technical interview questions and critique your live algorithm explanations.',
          handsOnTask: 'Implement complete polyfills for Promise.all, Array.prototype.reduce, and debounce with leading/trailing execution flags from memory.',
          projectApplication: 'Direct preparation for top-tier frontend technical screens.',
          resources: [
            { title: 'JavaScript Algorithms and Data Structures', url: 'https://github.com/trekhleb/javascript-algorithms', type: 'code' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'fe-portfolio-resume',
          title: 'Engineering Portfolio, GitHub Polish & ATS Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 19,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['fe-interview-prep'],
          description: 'Build an engineering portfolio website, write impact-driven ATS-optimized resume bullet points, and polish GitHub repositories with live demos and architecture diagrams.',
          whatToLearn: [
            'Engineering resume formatting: ATS compatibility, Google XYZ formula ("Accomplished [X], as measured by [Y], by doing [Z]")',
            'GitHub repository hygiene: professional READMEs, live demo links, architecture diagrams, tech stack badges, clean commit history',
            'Portfolio design: fast load times (<1s), responsive showcase, readable project case studies highlighting technical challenges',
            'Writing technical case studies: Problem, Architecture, Technical Challenges Overcome, Metrics/Results',
            'LinkedIn and GitHub profile optimization for tech recruiter inbound search algorithms'
          ],
          whyItMatters: 'Even exceptional engineers get ignored if their resume fails ATS screeners or their portfolio lacks verifiable live demonstrations.',
          productionUse: 'Presenting professional credibility to engineering managers, recruiters, and hiring committees.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to audit resume bullet points against target job descriptions and identify missing technical keywords; ensure all stated metrics represent honest achievements.',
          handsOnTask: 'Write 4 quantifiable impact bullet points for each of your portfolio projects and record a 2-minute video walkthrough of your capstone app.',
          projectApplication: 'Packages all completed roadmap projects into a compelling hiring profile.',
          resources: [
            { title: 'Tech Interview Handbook: Resume Guide', url: 'https://www.techinterviewhandbook.org/resume/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'fe-proj-1',
      title: 'Responsive Multi-Page SaaS Landing Page',
      difficulty: 'Beginner',
      estimatedTime: '2 weeks',
      objective: 'Build a production-ready, fully responsive marketing website with modern CSS Grid, Flexbox, accessible forms, and dark mode toggling.',
      technologies: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Vanilla JavaScript', 'Vite'],
      skillsPracticed: ['Semantic markup', 'Fluid responsive layout', 'Design tokens', 'DOM theme toggling', 'Lighthouse 95+ score'],
      requirements: [
        'Multi-page navigation (Home, Features, Pricing, Contact)',
        'Responsive navigation with accessible mobile drawer menu and focus trapping',
        'Interactive pricing tier switcher (Monthly vs Annual billing) with animated calculation',
        'Contact form with client-side regex and accessibility validation attributes',
        'Dark mode toggle with localStorage persistence and OS preference detection'
      ],
      deliverables: [
        'Live deployment on Cloudflare Pages or Vercel',
        'Clean GitHub repository with Conventional Commits history',
        '100% Mobile responsiveness on screens from 320px to 4K'
      ],
      productionExpectations: [
        'Perfect 95+ score on Google Lighthouse across Performance, Accessibility, Best Practices, and SEO',
        'Zero layout shifts (CLS < 0.05)',
        'Semantic HTML validated through W3C Markup Validation Service'
      ],
      aiIntegration: 'Use AI to draft initial CSS color palette variants and copy, but manually inspect all layout breakpoints and keyboard accessibility.'
    },
    {
      id: 'fe-proj-2',
      title: 'Interactive Collaborative Kanban Board',
      difficulty: 'Intermediate',
      estimatedTime: '3-4 weeks',
      objective: 'Develop a feature-rich, drag-and-drop task management application in TypeScript and React with complex state, filters, and offline persistence.',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'HTML5 Drag & Drop API', 'Vitest', 'React Testing Library'],
      skillsPracticed: ['Custom hooks', 'Component composition', 'TypeScript interfaces', 'Local storage synchronization', 'Unit & integration testing'],
      requirements: [
        'Custom drag-and-drop column reordering and card sorting',
        'Rich task creation modal with markdown descriptions, due dates, subtasks, and priority badges',
        'Real-time search filtering across task titles, tags, and assignee names',
        'Undo/Redo state history stack for accidental card deletions',
        'Full keyboard navigation support for moving cards across columns'
      ],
      deliverables: [
        'Live deployed application with sample test board data',
        'Vitest test suite covering task reducers, custom hooks, and UI interaction states',
        'GitHub README detailing architecture and component hierarchy diagrams'
      ],
      productionExpectations: [
        'Strict TypeScript compilation with zero `any` types',
        'Optimized re-renders verified via React DevTools Profiler',
        'Graceful offline persistence recovering state between browser tabs'
      ],
      aiIntegration: 'Use AI to generate mock data fixtures and assist with complex drag-and-drop boundary calculation edge cases.'
    },
    {
      id: 'fe-proj-3',
      title: 'Production E-Commerce & Analytics Platform',
      difficulty: 'Production',
      estimatedTime: '5-6 weeks',
      objective: 'Architect an enterprise-scale full-stack e-commerce web platform with Next.js App Router, Server Components, streaming search, auth, checkout, and test automation.',
      technologies: ['Next.js 14 (App Router)', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Stripe API', 'Playwright', 'GitHub Actions'],
      skillsPracticed: ['React Server Components', 'Server Actions', 'Payment gateway integration', 'Automated E2E testing', 'CI/CD pipeline'],
      requirements: [
        'Server-rendered product catalog with dynamic filtering, sorting, and pagination via URL params',
        'Instant optimistic shopping cart with local persistence and server sync',
        'Secure user authentication with session management and protected account orders page',
        'Integrated Stripe checkout flow with webhook confirmation handlers',
        'Admin dashboard with sales charts, inventory management, and low-stock alerts'
      ],
      deliverables: [
        'High-performance production deployment on Vercel',
        'Automated CI/CD pipeline running Playwright E2E tests on pull requests',
        'Comprehensive documentation including system design architecture diagrams'
      ],
      productionExpectations: [
        'Core Web Vitals passing: LCP < 1.5s, INP < 100ms, CLS < 0.05 on mobile networks',
        'Security hardened against XSS, CSRF, and SQL/NoSQL injection',
        'Full WCAG 2.2 AA accessibility compliance across all checkout and catalog flows'
      ],
      aiIntegration: 'Implement an optional AI-assisted product recommendation or semantic search assistant using vector embeddings.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Semantic HTML5 & document outline architecture',
      'Modern CSS3, Flexbox, and CSS Grid responsive systems',
      'JavaScript ES6+ core (closures, prototypes, event loop, async/await)',
      'React component architecture, lifecycle, and modern hooks',
      'TypeScript strict typing, generics, and React component typings',
      'Client-side routing and server state caching (TanStack Query / SWR)',
      'Automated testing: Vitest, React Testing Library, and Playwright',
      'Web Performance & Core Web Vitals profiling (LCP, INP, CLS)',
      'Web accessibility WCAG 2.2 AA compliance and WAI-ARIA',
      'Next.js App Router, Server Components, and Server Actions'
    ],
    projects: [
      'Responsive multi-page marketing landing page with 95+ Lighthouse score',
      'Feature-rich React + TypeScript Kanban board with state persistence and unit tests',
      'Production Next.js e-commerce or SaaS platform with authentication and payments',
      'All projects deployed with live HTTPS URLs and public GitHub repositories'
    ],
    csFundamentals: [
      'HTTP/HTTPS protocols, request/response headers, and REST API conventions',
      'Browser rendering engine architecture (DOM, CSSOM, Render Tree, Layout, Paint)',
      'Data structures applied to frontend: Hash Maps, Trees, Stacks, Queues',
      'Algorithms: Sorting, Binary Search, Tree Traversals, Debouncing/Throttling'
    ],
    tools: [
      'Git distributed version control & GitHub pull request workflows',
      'Chrome DevTools (Performance profiling, Network waterfall, Memory leak detection)',
      'Vite & modern build tools (ESLint, Prettier, Husky pre-commit hooks)',
      'Package management with npm/pnpm and semantic versioning'
    ],
    deployment: [
      'Automated GitHub Actions CI/CD pipeline for linting, testing, and building',
      'Deployment on modern edge networks (Vercel, Cloudflare Pages, Netlify)',
      'Custom domain configuration, DNS records, and automated SSL/TLS certificates',
      'Environment variable management separating staging and production secrets'
    ],
    portfolio: [
      'Fast-loading personal engineering portfolio site (<1.5s LCP)',
      'In-depth technical case studies for each major project explaining engineering tradeoffs',
      'Accessible contact methods and direct links to live demo deployments',
      'Mobile-responsive layout with seamless light and dark mode support'
    ],
    github: [
      'Professional GitHub profile with pinned highlight repositories',
      'Rich README files with architecture diagrams, setup instructions, and demo GIFs',
      'Consistent commit history following Conventional Commits standard',
      'Public pull requests showing code review hygiene and clean branch management'
    ],
    resume: [
      'Clean, single-page ATS-optimized resume in standard PDF format',
      'Bullet points crafted using the Google XYZ formula with quantifiable business metrics',
      'Targeted technical skill keywords matching current frontend job descriptions',
      'Direct clickable links to GitHub, LinkedIn, and live project deployments'
    ],
    interviewReadiness: [
      'Fluency in live DOM machine coding challenges under 45-minute time constraints',
      'Mastery of core JavaScript polyfills (Promise.all, debounce, deepClone, bind)',
      'Frontend System Design interview preparation for large-scale distributed web applications',
      'Structured behavioral interview stories rehearsed via the STAR framework'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['frontend'] = frontendRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = frontendRoadmap;
}
