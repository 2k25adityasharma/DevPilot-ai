/**
 * DevPilot-AI — Career Roadmap: QA / SDET Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const qaSdetRoadmap = {
  roleId: 'qa-sdet-engineer',
  roadmapId: 'qaSdet',
  title: 'QA / SDET Engineer',
  category: 'security-qa',
  description: 'Design and build enterprise automated test architectures and quality engineering pipelines: test strategy, API testing, UI test automation with Playwright / Cypress, Page Object Model (POM), performance testing with k6, and CI/CD quality gates.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Software testing theory, test case design, defect lifecycles, and programming fundamentals (TypeScript / Python).',
      skills: [
        {
          id: 'qa-testing-theory',
          title: 'Software Testing Theory, Test Design & Defect Lifecycles',
          category: 'Testing Foundations',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: [],
          description: 'Master quality assurance principles: The Testing Pyramid, Black-Box vs White-Box techniques, Equivalence Partitioning, Boundary Value Analysis (BVA), test case authoring, and bug reporting.',
          whatToLearn: [
            'The Testing Pyramid: Unit tests vs Integration tests vs End-to-End (E2E) tests vs Manual exploratory testing',
            'Test case design techniques: Equivalence Class Partitioning, Boundary Value Analysis (BVA), State Transition Testing, Decision Tables',
            'Testing types: Functional, Smoke, Sanity, Regression, Non-Functional (Performance, Security, Accessibility)',
            'Defect lifecycle: New, Assigned, Open, Fixed, Retest, Verified, Closed, Reopened',
            'Authoring professional bug reports: clear reproduction steps, expected vs actual results, logs, screenshots, and environment details'
          ],
          whyItMatters: 'Writing test automation without solid testing design leads to flaky, redundant test suites that test trivial details while missing critical production bugs.',
          productionUse: 'Defining test plans, authoring test suites for feature epics, and triaging production bugs.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to brainstorm edge-case boundary values for complex input validation rules; prioritize test cases based on user risk.',
          handsOnTask: 'Author a comprehensive test plan and 20 detailed test cases with boundary value coverage for an e-commerce checkout and discount coupon system.',
          projectApplication: 'Provides the test design foundation for all test automation deliverables.',
          resources: [
            { title: 'ISTQB Foundation Level Syllabus', url: 'https://www.istqb.org/certifications/certified-tester-foundation-level', type: 'standard' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'qa-programming-lang',
          title: 'Programming for Test Automation (TypeScript / Python)',
          category: 'Automation Programming',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['qa-testing-theory'],
          description: 'Master programming for test automation in TypeScript or Python: Object-Oriented Programming, clean code principles, asynchronous execution (async/await), file parsing, and assertions.',
          whatToLearn: [
            'Object-Oriented Programming (OOP) for automation: classes, objects, encapsulation, inheritance, method overriding',
            'Asynchronous execution: Promises, async/await, handling race conditions, and synchronization delays',
            'Data parsing: reading and parsing JSON, CSV, and Excel test data fixtures',
            'Assertion libraries: Expect assertion syntax, deep object equality, regular expression matching, and custom matchers',
            'Code quality: clean code principles, DRY (Don’t Repeat Yourself), and linting with ESLint / Flake8'
          ],
          whyItMatters: 'An SDET (Software Development Engineer in Test) is a software engineer. Reliable test automation requires clean, modular, maintainable code.',
          productionUse: 'Writing automated test frameworks, test utilities, data generators, and CI test scripts.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate mock data generators (Faker.js / Faker Python); write custom assertion logic and error handlers independently.',
          handsOnTask: 'Build a modular data-driven test utility class in TypeScript/Python that reads parameterized test cases from JSON files and executes assertions.',
          projectApplication: 'Serves as the programming foundation for all automated test frameworks.',
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
      description: 'API testing automation with Postman / Supertest, Newman CLI, and contract testing.',
      skills: [
        {
          id: 'qa-api-automation',
          title: 'API Test Automation: Postman, Newman & RESTful Testing',
          category: 'API Testing',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['qa-programming-lang'],
          description: 'Automate backend API quality: Postman collections, environment variables, pre-request scripts, JavaScript test assertions, Newman CLI headless test runs, and Supertest / Playwright API testing.',
          whatToLearn: [
            'REST API testing fundamentals: status codes, response headers, JSON payload validation, HTTP methods (GET, POST, PUT, DELETE)',
            'Postman test scripting: pm.test, pm.expect, validating response times (<200ms), schema validation (JSON Schema)',
            'Dynamic test workflows: chaining API requests (extracting auth token from login response and passing into subsequent requests)',
            'Headless CLI execution: Newman test runner, generating JUnit XML and HTML test reports for CI integration',
            'Code-based API testing with Playwright request context or Supertest: writing fast headless API regression suites in TypeScript'
          ],
          whyItMatters: 'API tests run 10x faster and are far less flaky than UI tests. A solid API test suite provides rapid feedback on backend regressions.',
          productionUse: 'Validating backend microservice endpoints, webhook handlers, and third-party integrations.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate JSON schema validation definitions from sample API responses; verify status code and edge-case error assertions manually.',
          handsOnTask: 'Build a fully automated Postman/Supertest regression suite covering an e-commerce API (Auth, Products, Cart, Orders) with Newman execution.',
          projectApplication: 'Provides the backend test layer for the Automated API Testing & Quality Pipeline project.',
          resources: [
            { title: 'Postman Learning Center: Writing Tests', url: 'https://learning.postman.com/docs/writing-scripts/test-scripts/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'qa-git-cicd-basics',
          title: 'Git Version Control & CI/CD Test Execution',
          category: 'DevOps for QA',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['qa-api-automation'],
          description: 'Integrate test suites into continuous integration: Git branch management, GitHub Actions workflows, headless browser execution, and automated test reporting.',
          whatToLearn: [
            'Git for test repositories: feature branches, pull requests, avoiding merge conflicts in test data fixtures',
            'GitHub Actions test execution: triggering test runs on pull requests, matrix test execution across browsers, parallelization',
            'Test artifact archiving: saving HTML test reports, failure screenshots, and execution video recordings upon test failure',
            'Quality gates: configuring branch protection rules that block merging if automated test suites fail'
          ],
          whyItMatters: 'Automated tests that only run on a local laptop do not protect production. CI/CD integration ensures tests execute on every pull request automatically.',
          productionUse: 'Running pre-merge test verification gates across engineering teams.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft GitHub Actions YAML workflow templates for headless Playwright test execution.',
          handsOnTask: 'Create a GitHub Actions workflow that executes an API test suite on pull requests, generates an Allure HTML report, and blocks PR merge on failures.',
          projectApplication: 'Automates test execution across all progressive SDET projects.',
          resources: [
            { title: 'GitHub Actions for Automated Testing', url: 'https://docs.github.com/en/actions/automating-builds-and-tests', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Modern UI test automation with Playwright, Page Object Model (POM), and cross-browser testing.',
      skills: [
        {
          id: 'qa-playwright-ui',
          title: 'Modern UI Test Automation with Playwright (TypeScript)',
          category: 'UI Automation',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['qa-api-automation'],
          description: 'Master modern browser automation with Playwright: auto-waiting, resilient locators (getByRole, getByText), multi-browser execution (Chromium, Firefox, WebKit), network interception, and parallel runs.',
          whatToLearn: [
            'Playwright vs legacy Selenium: built-in auto-waiting, isolated browser contexts, zero flaky sleep() calls',
            'Resilient user-facing locators: page.getByRole(), page.getByLabel(), page.getByPlaceholder(), avoiding brittle CSS/XPath selectors',
            'Interactions: click, fill, press, selectOption, dragAndDrop, file upload, dialog handling',
            'Network mocking and interception: page.route() to mock slow or failing backend API responses',
            'Cross-browser and mobile emulation: running tests concurrently across Chromium, Firefox, WebKit, and mobile viewports'
          ],
          whyItMatters: 'Playwright is the modern industry gold standard for UI automation, eliminating the flakiness and maintenance overhead of legacy Selenium suites.',
          productionUse: 'Automating end-to-end user journeys (onboarding, checkout, payment flows) across web applications.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate initial Playwright locator definitions from HTML snippets; audit selectors to ensure they adhere to accessibility role conventions.',
          handsOnTask: 'Write a robust Playwright E2E test suite covering a multi-step user registration, shopping cart, and checkout flow with zero hardcoded sleep delays.',
          projectApplication: 'Core UI testing engine for the Enterprise Playwright E2E Framework project.',
          resources: [
            { title: 'Playwright Official Documentation', url: 'https://playwright.dev/docs/intro', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'qa-page-object-model',
          title: 'Test Architecture: Page Object Model (POM) & Component Fixtures',
          category: 'Test Architecture',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['qa-playwright-ui'],
          description: 'Architect scalable, maintainable test frameworks: Page Object Model (POM) design pattern, reusable page classes, custom Playwright fixtures, and data-driven testing.',
          whatToLearn: [
            'Page Object Model (POM) pattern: separating page structure and action methods from test assertions',
            'Component-driven testing: creating reusable page components (Navbar, ModalDialog, Table, Pagination)',
            'Custom Playwright fixtures (test.extend): pre-authenticated browser states, database cleanup fixtures, custom test contexts',
            'Data-Driven Testing (DDT): parameterizing test suites with external JSON/CSV test data matrices',
            'Reporting: integrating Allure Report or Playwright HTML Reporter for rich trace viewer inspection and video playback'
          ],
          whyItMatters: 'Without the Page Object Model, UI changes require updating locators across hundreds of individual test files. POM encapsulates changes in a single class.',
          productionUse: 'Building enterprise test automation frameworks maintained across large quality engineering teams.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to scaffold boilerplate Page Object classes; verify method encapsulation and assertion boundaries manually.',
          handsOnTask: 'Refactor an ad-hoc test suite into an enterprise Page Object Model architecture with custom authentication fixtures and Allure reporting.',
          projectApplication: 'Provides the architecture for the Enterprise Playwright E2E Framework project.',
          resources: [
            { title: 'Playwright Page Object Models Guide', url: 'https://playwright.dev/docs/pom', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Performance testing with k6, accessibility automation (axe-core), and visual regression testing.',
      skills: [
        {
          id: 'qa-performance-k6',
          title: 'Performance & Load Testing with k6',
          category: 'Performance Testing',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['qa-page-object-model'],
          description: 'Evaluate system capacity and endurance: k6 load testing (JavaScript), virtual users (VUs), ramping stages, latency thresholds (p95/p99), and stress testing backend APIs.',
          whatToLearn: [
            'Performance testing types: Load test, Stress test (finding breaking point), Spike test, Soak test (memory leaks)',
            'Writing k6 test scripts in JavaScript: http.get, http.post, checks, custom metrics (Counter, Trend, Rate, Gauge)',
            'Configuring load stages: ramping up virtual users (VUs), sustained load duration, and cooldown periods',
            'Defining pass/fail thresholds (e.g., http_req_duration: ["p(95)<200"], http_req_failed: ["rate<0.01"])',
            'Analyzing performance bottlenecks: identifying database query stalls, connection pool exhaustion, and memory leaks'
          ],
          whyItMatters: 'A feature that works for 1 user can crash completely under 1,000 concurrent users. Automated load testing guarantees capacity before major marketing releases.',
          productionUse: 'Benchmarking backend microservices, Black Friday readiness testing, and verifying SLA performance commitments.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate k6 user journey simulation scripts; analyze latency percentile graphs and server metrics directly.',
          handsOnTask: 'Write and execute a k6 stress test script simulating 2,000 concurrent users hitting an e-commerce API, determining the exact breaking point and bottleneck.',
          projectApplication: 'Core performance testing engine for the Full-Stack Quality & Load Testing Platform project.',
          resources: [
            { title: 'k6 Documentation', url: 'https://k6.io/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'qa-a11y-visual-regression',
          title: 'Automated Accessibility (axe-core) & Visual Regression Testing',
          category: 'Specialized Testing',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Essential',
          estimatedTime: '2-3 weeks',
          prerequisites: ['qa-page-object-model'],
          description: 'Automate specialized quality checks: automated accessibility auditing with axe-core / Playwright (@axe-core/playwright), WCAG 2.2 compliance, and visual regression testing (pixel-matching).',
          whatToLearn: [
            'Automated accessibility testing: integrating @axe-core/playwright to audit pages for WCAG 2.2 AA violations automatically',
            'Common accessibility checks: color contrast ratios, missing alt attributes, unlabelled form controls, invalid ARIA roles',
            'Visual regression testing: Playwright toHaveScreenshot() pixel-by-pixel visual diffing and baseline image snapshots',
            'Managing visual diff flakiness: masking dynamic content (timestamps, usernames), anti-aliasing thresholds, and cross-platform fonts'
          ],
          whyItMatters: 'Visual bugs (misaligned buttons, overlapping text) and accessibility violations cannot be caught by functional DOM assertions alone.',
          productionUse: 'Auditing design system component libraries, preventing UI styling regressions, and ensuring legal ADA accessibility compliance.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to explain specific WCAG 2.2 failure rules and suggest accessible semantic markup fixes.',
          handsOnTask: 'Build an automated visual regression and axe-core accessibility audit suite in Playwright that catches color contrast errors and visual pixel shifts.',
          projectApplication: 'Integrates visual and accessibility quality gates into the capstone project.',
          resources: [
            { title: 'Playwright Visual Comparisons Guide', url: 'https://playwright.dev/docs/test-snapshots', type: 'guide' },
            { title: 'Axe-core Documentation', url: 'https://www.deque.com/axe/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'SDET system design interviews, test automation frameworks, and career portfolio.',
      skills: [
        {
          id: 'qa-interview-frameworks',
          title: 'SDET Technical Interviews & Test Architecture Design',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['qa-performance-k6', 'qa-a11y-visual-regression'],
          description: 'Master SDET interview loops: live test framework coding, designing automated test architectures from scratch, test case whiteboard design for complex systems, and behavioral questions.',
          whatToLearn: [
            'Test Architecture Design whiteboard: "Design an automated testing platform for a ride-sharing or global payment system"',
            'Live automation coding challenges: writing Playwright / API automation scripts under timed 45-minute sessions',
            'Test strategy scenarios: "How would you test a feature with no specifications?" or "How do you handle flaky tests in CI?"',
            'Behavioral interviews using STAR: pushing back on releasing buggy features and advocating for quality standards with product managers'
          ],
          whyItMatters: 'SDET interview loops evaluate your software engineering capability, testing philosophy, and leadership in establishing engineering quality standards.',
          productionUse: 'Leading quality engineering organizations and establishing test infrastructure.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive interviewer to throw complex system testing scenarios at you and critique your test architecture trade-offs.',
          handsOnTask: 'Complete 5 full-length mock SDET test architecture specifications detailing UI, API, performance, and CI/CD quality gates for a global streaming service.',
          projectApplication: 'Direct preparation for top tech company SDET and QA lead interview panels.',
          resources: [
            { title: 'Test Automation University (Free Courses)', url: 'https://testautomationu.applitools.com/', type: 'training' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'qa-portfolio-resume',
          title: 'SDET Engineering Portfolio, Allure Reports & Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['qa-interview-frameworks'],
          description: 'Package your test engineering frameworks: public GitHub repositories with automated CI test runs, hosted Allure HTML reports, and an ATS-optimized SDET resume.',
          whatToLearn: [
            'Showcasing test automation on GitHub: clean repository structure (Page Objects, tests, fixtures, utilities, reports)',
            'Hosting interactive test reports: publishing Allure Reports on GitHub Pages with execution history and failure trends',
            'Crafting quantifiable SDET resume bullets: highlighting test coverage gains, bug detection before release, and CI execution speedups',
            'Targeting keywords matching SDET, QA Automation Engineer, and Quality Platform Developer job descriptions'
          ],
          whyItMatters: 'A public GitHub repository running automated Playwright and k6 tests on pull requests provides concrete proof of software engineering capability.',
          productionUse: 'Securing SDET, Test Automation Lead, and Quality Engineering positions.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to audit resume bullet points to emphasize automation framework engineering over manual test execution.',
          handsOnTask: 'Publish your capstone test automation framework on GitHub with passing GitHub Actions workflows and a published Allure report on GitHub Pages.',
          projectApplication: 'Presents your complete quality engineering portfolio to hiring managers.',
          resources: [
            { title: 'Allure Report Framework Documentation', url: 'https://allurereport.org/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'qa-proj-1',
      title: 'Automated API Regression Suite with Postman & Newman CI',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build an automated REST API regression test suite covering an e-commerce API with authentication chaining, schema validation, and headless Newman CI execution.',
      technologies: ['Postman', 'Newman CLI', 'JavaScript', 'GitHub Actions', 'JSON Schema'],
      skillsPracticed: ['API testing', 'Token chaining', 'JSON schema validation', 'Newman headless execution', 'CI/CD pipeline'],
      requirements: [
        'Automated test coverage for 15+ API endpoints (Auth, Products, Cart, Checkout, Profile)',
        'Dynamic token extraction: login request automatically captures JWT token and sets it as an environment variable for subsequent requests',
        'Strict JSON Schema validation asserting data types and required fields for all responses',
        'GitHub Actions workflow executing Newman CLI on pull requests and exporting an HTML test execution report'
      ],
      deliverables: [
        'GitHub repository containing the Postman collection, environment JSON files, and GitHub Actions workflow',
        'Auto-generated Newman HTML test execution report with 100% passing tests',
        'Documented test strategy detailing positive, negative, and edge-case boundary test coverage'
      ],
      productionExpectations: [
        'Sub-15 second total test suite execution time for all 15 endpoints',
        'Comprehensive error code verification testing 400 Bad Request, 401 Unauthorized, and 404 Not Found scenarios'
      ],
      aiIntegration: 'Use AI to generate mock JSON schema definitions from sample API payloads.'
    },
    {
      id: 'qa-proj-2',
      title: 'Enterprise Playwright E2E Framework with Page Object Model',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Architect an enterprise-scale UI test automation framework in TypeScript and Playwright featuring the Page Object Model, custom authentication fixtures, and Allure reporting.',
      technologies: ['Playwright', 'TypeScript', 'Page Object Model', 'Allure Report', 'GitHub Actions'],
      skillsPracticed: ['Page Object Model', 'Custom Playwright fixtures', 'Cross-browser testing', 'Network mocking', 'Allure reporting'],
      requirements: [
        'Page Object Model architecture encapsulating page locators and interaction methods across 6 distinct pages',
        'Custom authentication fixture (test.extend) reusing browser storage state to bypass repetitive login steps',
        'Cross-browser parallel test runs across Chromium, Firefox, and WebKit',
        'Network mocking (page.route) verifying graceful UI handling of backend 500 server errors and network timeouts',
        'Allure Report integration publishing interactive test execution dashboards with step-by-step screenshots'
      ],
      deliverables: [
        'Clean, modular TypeScript Playwright repository adhering to enterprise design patterns',
        'Published Allure test report on GitHub Pages showcasing test execution trends and trace viewer links',
        'Technical write-up detailing the framework architecture and flaky test mitigation strategies'
      ],
      productionExpectations: [
        'Zero flaky tests across 10 consecutive CI executions using Playwright auto-waiting',
        'Clean parallel execution cutting total run time by 60%'
      ],
      aiIntegration: 'Use AI to generate initial Page Object class templates from HTML DOM snippets.'
    },
    {
      id: 'qa-proj-3',
      title: 'Full-Stack Quality & Load Testing Platform with Playwright & k6',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect a comprehensive full-stack quality platform combining Playwright E2E tests, axe-core automated accessibility audits, visual regression snapshots, and k6 performance stress testing.',
      technologies: ['Playwright', 'k6', '@axe-core/playwright', 'TypeScript', 'Docker', 'GitHub Actions'],
      skillsPracticed: ['Full-stack test architecture', 'Accessibility automation (WCAG 2.2)', 'Visual regression testing', 'k6 performance load testing', 'CI quality gates'],
      requirements: [
        'End-to-end user journey tests covering complex multi-step workflows with the Page Object Model',
        'Automated accessibility test suite using @axe-core/playwright asserting zero WCAG 2.2 AA violations on all pages',
        'Visual regression test suite using Playwright snapshot testing to catch subtle CSS styling deviations',
        'Comprehensive k6 load testing suite simulating up to 3,000 concurrent virtual users to benchmark API latency and capacity',
        'Automated GitHub Actions pipeline running functional tests, accessibility audits, and k6 threshold gates before pull requests can merge'
      ],
      deliverables: [
        'Complete test automation repository with containerized execution via Docker',
        'k6 performance benchmark report with graphs documenting latency percentiles (p95/p99) under high load',
        'Comprehensive Test Automation Strategy document detailing pyramid allocation, test data management, and CI gating'
      ],
      productionExpectations: [
        'Zero false-positive visual regression failures through configured pixel threshold tolerances',
        'Strict CI/CD quality gate enforcement blocking deployments that degrade p95 latency by more than 10%'
      ],
      aiIntegration: 'Use AI to generate realistic user pacing think-time distributions for k6 load testing scripts.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Software testing methodology: The Testing Pyramid, Equivalence Partitioning, and Boundary Value Analysis',
      'Automation programming in TypeScript or Python (OOP, async/await, clean code, fixtures)',
      'REST API test automation with Postman, Newman CLI, and code-based testing (Supertest / Playwright)',
      'Modern UI test automation with Playwright: locators, auto-waiting, network mocking, and parallel runs',
      'Test framework architecture: Page Object Model (POM) and reusable component patterns',
      'Custom test fixtures for authentication state reuse and database setup/teardown',
      'Performance and stress testing with k6: virtual users, ramping stages, and latency thresholds',
      'Automated accessibility testing with axe-core verifying WCAG 2.2 AA compliance',
      'Visual regression testing with Playwright pixel-matching and baseline snapshot comparisons',
      'Continuous Integration test execution with GitHub Actions and Allure HTML reporting'
    ],
    projects: [
      'Automated API regression suite with Postman, Newman, and GitHub Actions CI',
      'Enterprise Playwright E2E framework with Page Object Model, fixtures, and Allure reports',
      'Full-stack quality and load testing platform with Playwright, axe-core, and k6',
      'All frameworks codified in public GitHub repositories with automated CI execution'
    ],
    csFundamentals: [
      'Software development life cycle (SDLC): Agile, Scrum, and Shift-Left testing practices',
      'HTTP/HTTPS protocols: request/response lifecycles, headers, status codes, and cookies',
      'Browser DOM architecture: elements, shadow DOM, iframe handling, and event loops',
      'System performance fundamentals: concurrency, throughput (QPS), latency percentiles (p95/p99)'
    ],
    tools: [
      'UI automation tools: Playwright, Cypress, Selenium WebDriver',
      'API testing tools: Postman, Newman, Supertest, curl',
      'Performance testing tools: k6 and Apache JMeter',
      'Reporting and quality tools: Allure Report, axe-core, ESLint, Git, GitHub Actions'
    ],
    deployment: [
      'Running automated test suites inside containerized Docker environments',
      'Configuring automated GitHub Actions workflows running tests on pull requests',
      'Publishing interactive HTML test reports (Allure / Playwright) to GitHub Pages',
      'Configuring automated branch protection rules that enforce quality test passes before merge'
    ],
    portfolio: [
      'SDET engineering portfolio showcasing clean automation framework repositories',
      'Hosted Allure test report links displaying test execution history, screenshots, and traces',
      'In-depth test strategy documents detailing pyramid allocation, risk analysis, and coverage',
      'Clear documentation detailing test speedups, flakiness elimination, and bug prevention metrics'
    ],
    github: [
      'Public GitHub repositories with clean TypeScript/Python code and modular POM structure',
      'Comprehensive READMEs with architecture diagrams, setup commands, and report links',
      'Passing CI workflow badges demonstrating automated test execution on pull requests',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant SDET / QA Automation Engineer resume in PDF format',
      'Bullet points highlighting measurable engineering achievements: test coverage gains, execution speedups, CI gates',
      'Direct links to GitHub automation repositories, Allure reports, and LinkedIn profile',
      'Targeted keywords matching SDET, QA automation engineer, and quality engineering roles'
    ],
    interviewReadiness: [
      'Mastery of live test automation coding challenges in Playwright / TypeScript under 45-minute limits',
      'Fluency in SDET Test Architecture Design whiteboard interviews (Ride-Sharing, E-Commerce, Streaming)',
      'Ability to clearly articulate boundary value analysis, flaky test mitigation, and testing pyramid ROI',
      'Structured STAR behavioral stories communicating quality advocacy, bug triage, and cross-team collaboration'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['qaSdet'] = qaSdetRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = qaSdetRoadmap;
}
