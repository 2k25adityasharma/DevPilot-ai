/**
 * Engineering Prompts Collection (12 Prompts)
 * Covers Code Review, Refactoring, Clean Code, SOLID, Security Review, Testing, and Technical Debt.
 */
module.exports = [
  {
    id: 'eng-senior-pr-review',
    title: 'Staff Engineer Pull Request (PR) Code Review',
    category: 'Engineering',
    subcategory: 'Code Review',
    description: 'Delivers a senior code review categorizing findings into CRITICAL, HIGH, MEDIUM, LOW, and OPTIONAL with constructive rationale.',
    prompt: `Act as a Staff Software Engineer conducting an exhaustive, constructive code review on a pull request.

Pull Request Code Diff:
{{CODE_DIFF}}

PR Description & Business Objective:
{{PR_DESCRIPTION}}

Review Guidelines:
1. Audit across 5 core dimensions:
   - Correctness & Edge Cases: Does the code solve the problem without regressions?
   - Architecture & Modularity: Does it violate SOLID principles or introduce circular couplings?
   - Performance: Are there O(N^2) loops, unnecessary database queries (N+1), or unmemoized allocations?
   - Security: OWASP Top 10 risks (SQL injection, XSS, insecure deserialization, sensitive data logging).
   - Test Quality: Are unit and integration tests covering happy paths, boundaries, and failure states?
2. Group ALL feedback strictly by severity:
   - [CRITICAL] Showstopper bugs, data corruption, or security vulnerabilities (Must block merge).
   - [HIGH] Significant performance regressions, missing error handling, or architecture violations.
   - [MEDIUM] Code smells, missing test cases, or minor logic oversights.
   - [LOW] Naming inconsistencies, formatting, or documentation gaps.
   - [OPTIONAL] Nitpicks or alternative architectural suggestions.
3. For every issue provide:
   - Problem statement and affected line range.
   - Why it matters (the business or operational impact).
   - Evidence or failure scenario.
   - Concrete suggested code replacement.

Expected Output Format:
Structured Severity-Tagged Review comments + Summary Verdict (Approve / Request Changes).`,
    tags: ['engineering', 'code-review', 'pull-request', 'clean-code', 'quality', 'pr-review'],
    difficulty: 'Advanced',
    useCase: 'Code Review',
    variables: ['{{CODE_DIFF}}', '{{PR_DESCRIPTION}}'],
    expectedOutput: 'Structured severity-tagged PR review (CRITICAL to OPTIONAL) + code diffs + merge verdict'
  },
  {
    id: 'eng-security-owasp-audit',
    title: 'Security Vulnerability Audit (OWASP Top 10 & Zero-Trust)',
    category: 'Engineering',
    subcategory: 'Security Review',
    description: 'Audits source code for OWASP Top 10 vulnerabilities: Injection, Broken Auth, IDOR, SSRF, Sensitive Data Exposure, and Cryptographic Failures.',
    prompt: `Act as an Application Security (AppSec) Engineer and Certified Ethical Hacker. Perform a comprehensive security audit of this codebase.

Source Code:
{{CODE}}

Application Context:
{{APPLICATION_CONTEXT}}

Tasks:
1. Scan for OWASP Top 10 Vulnerabilities:
   - A01: Broken Access Control (IDOR, missing role checks on endpoints).
   - A02: Cryptographic Failures (hardcoded secrets, weak hashing like MD5/SHA1, missing salt).
   - A03: Injection (SQL injection, Command injection, NoSQL injection, XSS).
   - A04: Insecure Design (Lack of rate limiting, unvalidated business flows).
   - A05: Security Misconfiguration (Permissive CORS, default credentials, exposed stack traces).
   - A07: Identification and Authentication Failures (Brute-force vulnerabilities, weak session cookies).
   - A08: Software and Data Integrity Failures (Insecure deserialization).
   - A10: Server-Side Request Forgery (SSRF on outbound fetch/webhook URLs).
2. For each identified vulnerability:
   - Attack vector description and proof of concept payload.
   - Exploit impact (CVSS score severity estimation: Critical/High/Medium).
   - Remediated code implementing defense-in-depth.

Expected Output Format:
1. Vulnerability Findings Table with CVSS Severity
2. Detailed Vulnerability Breakdown & Exploit Scenarios
3. Hardened Production Code Diffs
4. Automated Security Testing Rule (e.g. Semgrep or ESLint security rule)`,
    tags: ['engineering', 'security', 'owasp', 'appsec', 'vulnerability', 'penetration-testing'],
    difficulty: 'Advanced',
    useCase: 'Security Review',
    variables: ['{{CODE}}', '{{APPLICATION_CONTEXT}}'],
    expectedOutput: 'Vulnerability findings table with CVSS + exploit scenarios + hardened code + security rules'
  },
  {
    id: 'eng-cyclomatic-complexity-reducer',
    title: 'Cyclomatic Complexity Reducer & Cognitive Load Minimizer',
    category: 'Engineering',
    subcategory: 'Clean Code',
    description: 'Refactors deeply nested if-else ladders and switch statements into clean early returns, guard clauses, and strategy pattern dictionaries.',
    prompt: `Act as a Clean Code and Refactoring Guru. Refactor this complex function that has high cyclomatic complexity and unreadable nesting.

Complex Function:
{{CODE}}

Tasks:
1. Calculate Cyclomatic Complexity (number of independent linear paths through source code).
2. Identify readability anti-patterns:
   - Arrow Anti-Pattern (deeply nested if/else blocks forming a pyramid of doom).
   - Flag arguments (boolean parameters switching entire execution flows).
   - Side effects hidden deep within condition branches.
3. Refactoring Techniques to Apply:
   - Guard Clauses / Early Return (fail fast at the top of the function).
   - Lookup Tables / Strategy Pattern dictionary instead of 20-case switch statements.
   - Extract Method / Decomposition into small single-purpose pure functions.
4. Provide the refactored code with a side-by-side complexity comparison (e.g. Complexity reduced from 18 to 3).

Expected Output Format:
1. Initial Complexity Metric & Flaw Identification
2. Refactoring Strategy Breakdown
3. Clean Refactored Code
4. Before vs After Complexity Comparison Table`,
    tags: ['engineering', 'clean-code', 'refactoring', 'cyclomatic-complexity', 'guard-clauses'],
    difficulty: 'Easy',
    useCase: 'Clean Code',
    variables: ['{{CODE}}'],
    expectedOutput: 'Complexity metric audit + refactoring strategy + clean early-return code + comparison table'
  },
  {
    id: 'eng-monolith-to-modular-migration',
    title: 'Monolith to Modular Architecture Migration Strategy',
    category: 'Engineering',
    subcategory: 'Architecture Review',
    description: 'Guides the safe decomposition of a monolithic spaghetti codebase into modular domains (Package by Feature / Hexagonal Architecture).',
    prompt: `Act as a Principal Software Architect. Formulate a migration plan to decompose this monolithic, tightly coupled codebase into a clean modular architecture.

Current Monolith Description / File Structure:
{{MONOLITH_STRUCTURE}}

Pain Points & Scaling Goals:
{{PAIN_POINTS}}

Tasks:
1. Boundary Identification:
   - Apply Domain-Driven Design (DDD) to discover Bounded Contexts (e.g., Billing, Auth, Catalog, Notifications).
   - Identify shared database tables and circular dependency entanglements.
2. Architecture Target:
   - Package by Feature / Modular Monolith (Clean Architecture / Hexagonal Ports & Adapters) BEFORE jumping prematurely to microservices.
   - Decouple inter-module communication using synchronous internal interfaces and asynchronous domain events.
3. Step-by-Step Strangler Fig Migration:
   - Phase 1: In-process decoupling and interface extraction.
   - Phase 2: Database schema isolation per domain.
   - Phase 3: Independent service deployment (if justified by team topology).
4. Provide directory layout and an example domain event interface.

Expected Output Format:
1. Domain Bounded Context Breakdown
2. Target Modular Directory Structure
3. Inter-Module Interface & Domain Event Code Example
4. 4-Phase Strangler Migration Roadmap`,
    tags: ['engineering', 'architecture', 'clean-architecture', 'domain-driven-design', 'modular-monolith'],
    difficulty: 'Advanced',
    useCase: 'Architecture Review',
    variables: ['{{MONOLITH_STRUCTURE}}', '{{PAIN_POINTS}}'],
    expectedOutput: 'Bounded context breakdown + modular directory layout + domain event interface + migration roadmap'
  },
  {
    id: 'eng-api-contract-breaking-change-audit',
    title: 'API Contract & Breaking Change Backward-Compatibility Audit',
    category: 'Engineering',
    subcategory: 'API Design',
    description: 'Audits REST / GraphQL API schema changes to ensure zero breaking changes for existing mobile and web clients in production.',
    prompt: `Act as an API Governance and Platform Architect. Audit this proposed API schema change for breaking changes against existing production clients.

Current API Contract (v1):
{{CURRENT_API_CONTRACT}}

Proposed Modified API Contract:
{{PROPOSED_API_CONTRACT}}

Tasks:
1. Breaking vs Non-Breaking Change Classification:
   - Identify Breaking Changes: Removing/renaming fields, changing data types, changing HTTP status codes, adding mandatory (non-optional) query/body parameters.
   - Identify Non-Breaking Changes: Adding optional fields, expanding enum choices (with caveats).
2. Backward Compatibility Strategy:
   - URL versioning (\`/v1\` vs \`/v2\`) vs Header versioning vs Schema evolution (field deprecation).
   - Field deprecation lifecycle: \`@deprecated\` annotation, telemetry logging of deprecated field usage, migration timeline.
3. Provide the revised, 100% backward-compatible API contract that achieves the new feature requirements without breaking existing v1 clients.

Expected Output Format:
1. Breaking Changes Risk Assessment Table
2. Client Impact Analysis (Mobile apps that cannot be force-updated)
3. Backward-Compatible Contract Revision
4. Deprecation & Sunsetting Policy Timeline`,
    tags: ['engineering', 'api-design', 'breaking-changes', 'backward-compatibility', 'rest', 'graphql'],
    difficulty: 'Intermediate',
    useCase: 'API Design',
    variables: ['{{CURRENT_API_CONTRACT}}', '{{PROPOSED_API_CONTRACT}}'],
    expectedOutput: 'Breaking changes risk table + client impact analysis + backward-compatible contract + deprecation policy'
  },
  {
    id: 'eng-production-readiness-checklist',
    title: 'Production Readiness & Operational Resiliency Audit',
    category: 'Engineering',
    subcategory: 'Architecture Review',
    description: 'Comprehensive 360-degree production readiness review: timeouts, circuit breakers, retries with jitter, logging, and observability.',
    prompt: `Act as a Site Reliability Engineer (SRE) and Production Readiness Gatekeeper. Audit this service for production launch readiness.

Service Architecture & Tech Stack:
{{SERVICE_TECH_STACK}}

Tasks:
1. Resiliency & Fault Tolerance:
   - Are outbound network calls protected with timeouts and circuit breakers (e.g. Cockatiel / Opossum)?
   - Are retries bounded and backed by exponential backoff with randomized jitter?
2. Observability & Telemetry:
   - Structured JSON logging with trace/span IDs (OpenTelemetry / correlation IDs).
   - Health probes (Liveness / Readiness) and RED metrics (Rate, Errors, Duration).
3. Security & Secrets:
   - No secrets in git or environment logs.
   - Least privilege IAM roles and database permissions.
4. Graceful Degradation:
   - Fallback responses when downstream caches or recommendation services fail.
5. Provide a Go / No-Go Launch Scorecard and concrete remediation code for missing items.

Expected Output Format:
1. Production Readiness Scorecard (Pass / Warning / Fail across 5 categories)
2. Critical Blockers & Vulnerabilities
3. Resiliency Pattern Implementations (Circuit Breaker & Retry Code)
4. Grafana / Prometheus Alerting Rules`,
    tags: ['engineering', 'sre', 'production-readiness', 'resilience', 'circuit-breaker', 'observability'],
    difficulty: 'Advanced',
    useCase: 'Architecture Review',
    variables: ['{{SERVICE_TECH_STACK}}'],
    expectedOutput: 'Readiness scorecard + critical blockers + circuit breaker code + Prometheus alert rules'
  },
  {
    id: 'eng-junior-mentorship-code-review',
    title: 'Constructive Junior Developer Mentorship Code Review',
    category: 'Engineering',
    subcategory: 'Code Review',
    description: 'Transforms code review into a high-impact teaching moment: explains the "why" behind conventions with encouragement and references.',
    prompt: `Act as an Empathetic Engineering Mentor and Staff Engineer. Review this code written by a junior developer, providing constructive, educational feedback.

Junior Developer Code:
{{CODE}}

Learning Goals / Context:
{{CONTEXT}}

Review Principles:
1. Praise Good Choices First: Highlight 2 specific things the developer did well (clean naming, good test, proper intent).
2. Teach the "Why", Not Just the "What": Instead of saying "Don't do X, do Y", explain the underlying engine mechanics or future maintenance pitfall of X.
3. Socratic Questions: Ask 1-2 thought-provoking questions that help them discover edge cases independently.
4. Provide Bite-Sized Examples: Show small, readable code snippets comparing the current approach with the idiomatic pattern.
5. Provide External Curated Links / Concepts: Mention the canonical design pattern or MDN/V8 doc to read further.

Expected Output Format:
Warm, highly educational, and encouraging GitHub PR Review comment.`,
    tags: ['engineering', 'mentorship', 'code-review', 'clean-code', 'learning', 'culture'],
    difficulty: 'Easy',
    useCase: 'Code Review',
    variables: ['{{CODE}}', '{{CONTEXT}}'],
    expectedOutput: 'Encouraging mentorship review comment with positive feedback + educational "why" + bite-sized diffs'
  },
  {
    id: 'eng-tech-debt-prioritization-matrix',
    title: 'Technical Debt Audit & RICE Prioritization Matrix',
    category: 'Engineering',
    subcategory: 'Architecture Review',
    description: 'Audits legacy technical debt items and scores them using the RICE framework (Reach, Impact, Confidence, Effort) to build an executive engineering roadmap.',
    prompt: `Act as an Engineering Director and Technical Strategy Consultant. Audit our backlog of technical debt and formulate a prioritized refactoring roadmap.

Identified Tech Debt Items:
{{TECH_DEBT_LIST}}

Team Capacity & Business Goals:
{{TEAM_CAPACITY}}

Tasks:
1. Categorize Tech Debt:
   - Architecture Debt (tight coupling, monolith bloat).
   - Code Debt (dead code, duplicate utilities, untested modules).
   - Infrastructure Debt (outdated runtimes, deprecated dependencies, slow CI builds).
   - Documentation & Knowledge Debt (tribal knowledge, missing runbooks).
2. Score every item using the RICE Framework:
   - Reach (How many engineers / requests affected per month: 1 - 10).
   - Impact (Massive = 3x, High = 2x, Medium = 1x, Low = 0.5x).
   - Confidence (High = 100%, Medium = 80%, Low = 50%).
   - Effort (Person-weeks: e.g. 2 weeks).
   - Formula: \`RICE Score = (Reach * Impact * Confidence) / Effort\`.
3. Deliver a quarterly refactoring roadmap defending engineering time to executive stakeholders.

Expected Output Format:
1. Tech Debt Classification Table
2. RICE Scoring Matrix (Sorted by Priority)
3. Executive Summary / ROI Justification for Business Stakeholders
4. Step-by-Step Refactoring Milestones`,
    tags: ['engineering', 'tech-debt', 'refactoring', 'rice-framework', 'management', 'roadmap'],
    difficulty: 'Intermediate',
    useCase: 'Architecture Review',
    variables: ['{{TECH_DEBT_LIST}}', '{{TEAM_CAPACITY}}'],
    expectedOutput: 'Classification table + RICE scoring matrix + executive business justification + roadmap milestones'
  },
  {
    id: 'eng-performance-profiling-audit',
    title: 'Full-Stack Performance & Bottleneck Profiling Audit',
    category: 'Engineering',
    subcategory: 'Performance Optimization',
    description: 'Identifies latency bottlenecks across client network, server CPU/event-loop, and database queries to achieve sub-100ms response times.',
    prompt: `Act as a Principal Full-Stack Performance Architect. Diagnose latency and throughput bottlenecks in this application stack.

Performance Metrics / Symptoms:
{{PERFORMANCE_SYMPTOMS}}

Stack & Architecture:
{{TECH_STACK}}

Tasks:
1. Triaging the Latency Budget (where are the milliseconds going?):
   - Client Network / DNS / SSL Handshake time.
   - Reverse Proxy / Load Balancer queue time.
   - Node.js / Backend Event Loop lag & synchronous CPU bottlenecks.
   - Database query execution vs network transport time.
   - Downstream 3rd-party API latency.
2. Formulate concrete optimization actions:
   - Caching layer (HTTP cache headers, Redis in-memory query cache).
   - Query tuning (indexes, projection limiting, batch fetching).
   - Node.js event-loop offloading (Worker Threads, streaming response pipelines).
   - Connection reuse (HTTP Keep-Alive, DB connection pooling).
3. Provide code implementations for the top 2 highest-ROI optimizations.

Expected Output Format:
1. Latency Budget Breakdown Waterfall
2. Bottleneck Root Causes
3. Concrete Code Implementations (Top 2 Fixes)
4. Benchmarking Verification Script (Autocannon / k6)`,
    tags: ['engineering', 'performance', 'profiling', 'latency', 'optimization', 'caching'],
    difficulty: 'Advanced',
    useCase: 'Performance Optimization',
    variables: ['{{PERFORMANCE_SYMPTOMS}}', '{{TECH_STACK}}'],
    expectedOutput: 'Latency budget breakdown + root causes + high-ROI code fixes + k6 benchmark script'
  },
  {
    id: 'eng-design-patterns-real-world',
    title: 'Design Patterns in Action: Strategy, Factory, Observer & Decorator',
    category: 'Engineering',
    subcategory: 'Design Patterns',
    description: 'Applies classic Gang of Four (GoF) design patterns to solve real-world software engineering challenges with clean, decoupled code.',
    prompt: `Act as a Senior Software Design Architect. Implement an idiomatic, modern Design Pattern solution for this engineering requirement.

Business Problem:
{{BUSINESS_PROBLEM}}

Target Language:
{{TARGET_LANGUAGE}}

Tasks:
1. Pattern Selection:
   - Strategy Pattern (Interchangeable algorithms e.g. Payment processors, Shipping rate calculators).
   - Factory / Abstract Factory Pattern (Decoupling object instantiation from client code).
   - Observer / Pub-Sub Pattern (Event-driven notification broadcast).
   - Decorator / Middleware Pattern (Dynamically adding cross-cutting concerns like logging or caching).
   - Adapter Pattern (Normalizing incompatible third-party vendor APIs).
2. Justify why this pattern adheres to the Open/Closed Principle (OCP) and simplifies maintenance.
3. Provide clean, fully commented implementation in {{TARGET_LANGUAGE}} with TypeScript types or modern idioms.
4. Demonstrate client usage showing how adding a new requirement requires zero modifications to existing classes.

Expected Output Format:
1. Pattern Selection Justification & UML/ASCII Class Diagram
2. Production Code Implementation
3. Client Usage Example
4. Extensibility Proof (Adding a new feature without code modification)`,
    tags: ['engineering', 'design-patterns', 'strategy-pattern', 'factory-pattern', 'observer', 'clean-code'],
    difficulty: 'Intermediate',
    useCase: 'Clean Code',
    variables: ['{{BUSINESS_PROBLEM}}', '{{TARGET_LANGUAGE}}'],
    expectedOutput: 'Pattern selection justification + ASCII diagram + production implementation + extensibility proof'
  },
  {
    id: 'eng-testing-strategy-pyramid',
    title: 'Automated Testing Strategy: Unit vs Integration vs E2E',
    category: 'Engineering',
    subcategory: 'Testing',
    description: 'Designs an optimal Testing Pyramid: fast unit tests, database-backed integration tests, and critical-path Cypress/Playwright E2E tests.',
    prompt: `Act as a Quality Engineering (QE) Architect. Design a comprehensive automated testing strategy for this feature / service.

Feature Requirements & Architecture:
{{FEATURE_DETAILS}}

Tasks:
1. The Testing Pyramid Breakdown:
   - Unit Tests (70%): Pure functions, domain calculations, isolated service methods using mocks.
   - Integration Tests (20%): Real API endpoints hitting a containerized test database (Testcontainers) testing queries, transactions, and middlewares.
   - End-to-End (E2E) Tests (10%): User journey smoke tests (Playwright / Cypress) covering critical revenue paths.
2. Mocking Strategy:
   - What to mock (External third-party APIs like Stripe/SendGrid, current clock time, random UUIDs).
   - What NOT to mock (In-memory business logic, database queries in integration tests).
3. Code Deliverables:
   - 1 Unit Test file (Jest/Vitest).
   - 1 Integration Test file with real DB transactions and rollback.
   - 1 Playwright E2E test script.

Expected Output Format:
1. Testing Pyramid Strategy Matrix
2. Mocking Boundary Guidelines
3. Unit Test Code File
4. Integration Test Code File
5. Playwright E2E Test Code File`,
    tags: ['engineering', 'testing', 'unit-tests', 'integration-tests', 'playwright', 'testcontainers', 'qa'],
    difficulty: 'Intermediate',
    useCase: 'Testing',
    variables: ['{{FEATURE_DETAILS}}'],
    expectedOutput: 'Testing pyramid matrix + mocking guidelines + unit test code + integration test code + Playwright E2E'
  },
  {
    id: 'eng-solid-principles-refactoring',
    title: 'Refactor Monolithic Spaghetti Code with SOLID Principles',
    category: 'Engineering',
    subcategory: 'SOLID',
    description: 'Deconstructs god-objects and tight couplings into single-responsibility classes adhering to Open/Closed and Dependency Inversion.',
    prompt: `Act as a Clean Code and Software Architecture Specialist. Refactor this violation-heavy code by applying the SOLID principles.

Violating Code:
{{CODE}}

Tasks:
1. Identify specific violations of each of the 5 SOLID principles:
   - Single Responsibility Principle (SRP): Multiple reasons to change.
   - Open/Closed Principle (OCP): Requires editing existing code to add new types.
   - Liskov Substitution Principle (LSP): Subclasses throwing unexpected errors or changing contracts.
   - Interface Segregation Principle (ISP): Fat interfaces forcing unused method implementations.
   - Dependency Inversion Principle (DIP): High-level modules importing concrete low-level implementations.
2. Step-by-step refactoring plan.
3. Clean, refactored implementation in {{LANGUAGE}} using dependency injection and interfaces.
4. Unit tests proving that mocking dependencies is now trivial.

Expected Output Format:
1. SOLID Violation Audit Checklist
2. Architectural Refactoring Steps
3. Clean Refactored Implementation
4. Testability Demonstration with Mocked Dependencies`,
    tags: ['engineering', 'solid', 'clean-code', 'refactoring', 'oop', 'architecture'],
    difficulty: 'Intermediate',
    useCase: 'Code Refactoring',
    variables: ['{{CODE}}', '{{LANGUAGE}}'],
    expectedOutput: 'SOLID violation checklist + refactoring steps + clean implementation + mocked testability demo'
  }
];
