/**
 * Preserved original prompts (p1 to p6) enriched with full schema
 */
module.exports = [
  {
    id: 'p1',
    title: 'Root Cause & Asynchronous Race Condition Debugger',
    category: 'Engineering',
    subcategory: 'Debugging',
    description: 'Pinpoints elusive concurrency bugs, stale state closures in React, and unhandled promise rejections.',
    prompt: `Act as a Principal Software Engineer and debugging expert. I am encountering an intermittent bug in the following code snippet.

Problem Context:
{{ERROR_OR_SYMPTOM}}

Code:
{{CODE}}

Tasks:
1. Conduct a deep Root Cause Analysis (RCA) to identify any race conditions, stale closures, unhandled promise rejections, or memory leaks.
2. Provide a line-by-line explanation of why the failure occurs under specific timing sequences.
3. Rewrite the code defensively with proper synchronization, cleanup routines, and error boundaries.
4. Provide unit tests reproducing the failure and confirming the fix.
5. Identify any potential regressions or architectural trade-offs introduced by the fix.

Constraints:
- Do not rewrite unrelated business logic.
- Do not introduce heavy third-party dependencies unless strictly necessary.
- Preserve existing function signatures.

Expected Output Format:
1. Root Cause Identification
2. Timing / Race Condition Trace
3. Corrected Implementation
4. Regression Risk Assessment
5. Reproduction Test Case`,
    tags: ['debugging', 'async', 'concurrency', 'race-conditions', 'promises'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{ERROR_OR_SYMPTOM}}', "{{CODE}}"],
    expectedOutput: 'Root cause + timing trace + corrected code + regression assessment + test case'
  },
  {
    id: 'p2',
    title: 'Clean Architecture & SOLID Refactoring',
    category: 'Engineering',
    subcategory: 'Code Refactoring',
    description: 'Transforms monolithic functions into decoupled, testable modules conforming to SOLID principles.',
    prompt: `Act as a Senior Software Architect. Analyze the following function/module and refactor it for long-term production maintainability.

Target Code:
{{CODE}}

Project Context:
{{PROJECT_CONTEXT}}

Tasks:
1. Audit the code against all 5 SOLID principles and identify violations (e.g. Single Responsibility, Open/Closed, Dependency Inversion).
2. Decouple side-effects, I/O operations, and database/network calls from pure domain business logic.
3. Restructure the code into modular classes or pure composable functions with clean interfaces.
4. Add comprehensive TypeScript interface definitions or strict type annotations.
5. Provide unit tests using Jest/Vitest with 100% branch and edge-case coverage.

Constraints:
- Preserve existing public API contracts and return types.
- Avoid over-engineering; keep patterns pragmatic and idiomatic.

Expected Output Format:
1. SOLID Violation Audit
2. Refactored Architecture Breakdown
3. Clean Production-Ready Code
4. TypeScript Interfaces / Types
5. Comprehensive Test Suite`,
    tags: ['refactoring', 'clean-code', 'solid', 'architecture', 'typescript'],
    difficulty: 'Intermediate',
    useCase: 'Code Review',
    variables: ['{{CODE}}', '{{PROJECT_CONTEXT}}'],
    expectedOutput: 'SOLID audit + refactored modular code + types + complete test suite'
  },
  {
    id: 'p3',
    title: 'Distributed System Architecture & Scale Assessment',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Designs resilient high-throughput cloud architectures handling millions of concurrent requests.',
    prompt: `Act as a Principal Cloud Architect and Distributed Systems Specialist. Design a highly scalable, fault-tolerant system for the following requirements.

Target System:
{{TARGET_SYSTEM}}

Scale Assumptions & Traffic:
{{SCALE_REQUIREMENTS}}

Tasks:
1. Functional & Non-Functional Requirements (Latency SLAs, Availability, Durability).
2. Back-of-the-envelope capacity estimations (QPS, storage, bandwidth).
3. API Design (REST / gRPC / WebSocket contracts).
4. Data Modeling & Database Choice: Justify SQL vs NoSQL vs In-Memory store based on access patterns.
5. High-Level Architecture Diagram (Load Balancer, API Gateway, Microservices, Message Queues, Caching Layer).
6. Deep Dives:
   - Handling extreme peak concurrency & partition tolerance (CAP theorem trade-offs).
   - Distributed locking, idempotency keys, and deduplication.
   - Cache invalidation and multi-region replication.
7. Observability, Rate-Limiting, and Graceful Degradation under partial failure.

Constraints:
- Address single points of failure (SPOF) explicitly.
- Propose concrete open-source technologies (e.g., Redis, Kafka, PostgreSQL, Nginx).

Expected Output Format:
Structured 8-section High-Level Design document with API specs, schema, component interactions, and trade-off matrix.`,
    tags: ['system-design', 'distributed-systems', 'scalability', 'cloud', 'architecture'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{TARGET_SYSTEM}}', '{{SCALE_REQUIREMENTS}}'],
    expectedOutput: 'End-to-end HLD document: APIs, data schema, components, scaling strategy & bottlenecks'
  },
  {
    id: 'p4',
    title: 'DSA Time & Space Complexity Optimizer ($O(N)$)',
    category: 'DSA & Interview',
    subcategory: 'Complexity Analysis',
    description: 'Refactors brute-force algorithm solutions into optimal time/space complexity approaches.',
    prompt: `Act as a Competitive Programming Champion and FAANG Senior Technical Interviewer. Analyze my current solution for the following DSA problem and guide me to the mathematically optimal approach.

Problem Description / Constraints:
{{PROBLEM}}

My Current Solution:
{{CODE}}

Tasks:
1. Step-by-step Big-O Time & Auxiliary Space complexity analysis of my current code (formal derivation).
2. Identify the fundamental algorithmic bottleneck causing sub-optimal performance (e.g. redundant recalculations, nested loops, unsorted scanning).
3. Recommend the optimal algorithmic pattern (e.g. Two Pointers, Monotonic Deque, Sliding Window, Prefix Sum + Hash Map, Segment Tree, or DP).
4. Provide the optimal solution in clean, commented production-ready code with invariant explanations.
5. Trace execution through an edge case (e.g. empty input, single element, duplicates, negative numbers, extreme scale).

Constraints:
- Optimal Big-O must match the theoretical lower bound for this problem.
- Explain trade-offs between Time and Auxiliary Memory.

Expected Output Format:
1. Current Complexity Breakdown
2. Bottleneck Analysis
3. Recommended Paradigm & Mathematical Invariant
4. Optimal Solution Code
5. Edge-Case Walkthrough Table`,
    tags: ['dsa', 'leetcode', 'algorithms', 'optimization', 'complexity'],
    difficulty: 'Intermediate',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM}}', '{{CODE}}'],
    expectedOutput: 'Current complexity audit + bottleneck explanation + optimal algorithm code + edge-case trace'
  },
  {
    id: 'p5',
    title: 'Unit Test Suite Generator with Edge Cases',
    category: 'Engineering',
    subcategory: 'Testing',
    description: 'Generates comprehensive unit tests covering boundary values, null checks, and error branches.',
    prompt: `Act as a Principal QA Automation and Software Test Engineer. Generate an exhaustive unit and integration test suite for the following module.

Code Under Test:
{{CODE}}

Testing Framework:
{{TEST_FRAMEWORK}}

Requirements:
1. Happy Path Coverage: Standard valid inputs with expected outputs.
2. Boundary & Edge Cases:
   - Zero, empty collections, single elements, max/min integer limits.
   - Null, undefined, malformed structures, unexpected property types.
3. Fault Injection & Rejection Paths:
   - Network failure mocks, timeout rejections, disk/database errors.
4. Security & Validation Fuzzing:
   - Injection payloads, oversized inputs, special characters.
5. Setup & Teardown:
   - Proper lifecycle hooks (beforeEach, afterEach), mocked external timers, isolated sandbox spies.

Constraints:
- Test names must follow the convention: "should [expected behavior] when [condition/input]".
- Assertions must be deterministic and free of race conditions.

Expected Output Format:
Fully executable test file with imports, mock setups, organized describe/it blocks, and inline explanations for subtle edge cases.`,
    tags: ['testing', 'unit-tests', 'jest', 'vitest', 'edge-cases', 'qa'],
    difficulty: 'Intermediate',
    useCase: 'Testing',
    variables: ['{{CODE}}', '{{TEST_FRAMEWORK}}'],
    expectedOutput: 'Complete production test file with describe/it blocks covering happy, boundary, and error paths'
  },
  {
    id: 'p6',
    title: 'REST to GraphQL Schema & Resolver Migration',
    category: 'Engineering',
    subcategory: 'Code Refactoring',
    description: 'Translates legacy REST endpoints into strongly typed GraphQL SDL schemas and resolvers.',
    prompt: `Act as a Senior API Architect. Transform the following REST API endpoints into an idiomatic, production-ready GraphQL Schema Definition Language (SDL) schema and resolver implementation.

REST Endpoints & Payloads:
{{REST_ENDPOINTS}}

Tasks:
1. Design strongly typed GraphQL Object Types, Input Types, Enums, and Custom Scalars.
2. Formulate clean Query and Mutation schemas following GraphQL best practices (e.g. nested sub-fields, pagination arguments).
3. Write clean resolver functions with context, authentication checks, and error masking.
4. Propose DataLoader implementations to eliminate the N+1 database query problem during field resolution.
5. Provide sample GraphQL query payloads demonstrating how clients query the new schema.

Constraints:
- Prevent unbounded query depths and circular queries.
- Ensure backwards compatibility with existing business entities.

Expected Output Format:
1. GraphQL SDL Schema (.graphql)
2. Resolver Implementation (Node.js/TypeScript)
3. DataLoader Batching Setup
4. Example Client Queries & Mutations`,
    tags: ['graphql', 'rest-api', 'api-design', 'backend', 'architecture'],
    difficulty: 'Advanced',
    useCase: 'Architecture',
    variables: ['{{REST_ENDPOINTS}}'],
    expectedOutput: 'SDL schema + resolver functions + DataLoader batching pattern + sample client queries'
  }
];
