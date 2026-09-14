/**
 * DevPilot-AI - AI Prompt Library Vault Dataset
 * Static structured dataset containing 130+ engineered developer prompts across 8 core domains.
 */

const PROMPT_CATEGORIES = [
  {
    "name": "Development",
    "subcategories": [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "HTML/CSS",
      "REST API",
      "Full Stack Development"
    ]
  },
  {
    "name": "DSA & Interview",
    "subcategories": [
      "DSA Practice",
      "DSA Debugging",
      "Complexity Analysis",
      "LeetCode Hints",
      "LeetCode Review",
      "Competitive Programming",
      "Interview Questions",
      "No-Spoiler Mentorship"
    ]
  },
  {
    "name": "Database",
    "subcategories": [
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "DBMS",
      "Database Design",
      "Query Optimization"
    ]
  },
  {
    "name": "Core Computer Science",
    "subcategories": [
      "OOP",
      "Operating Systems",
      "Computer Networks",
      "DBMS Concepts",
      "Computer Architecture"
    ]
  },
  {
    "name": "Engineering",
    "subcategories": [
      "Code Refactoring",
      "Clean Code",
      "SOLID",
      "Design Patterns",
      "System Design",
      "API Design",
      "Architecture Review",
      "Performance Optimization",
      "Security Review",
      "Testing",
      "Code Review"
    ]
  },
  {
    "name": "DevOps / Cloud",
    "subcategories": [
      "Git",
      "GitHub",
      "Linux",
      "Docker",
      "AWS",
      "CI/CD",
      "Deployment",
      "Production Debugging"
    ]
  },
  {
    "name": "AI / ML",
    "subcategories": [
      "Python AI/ML",
      "Machine Learning",
      "Data Analysis",
      "AI Integration",
      "LLM Applications",
      "Prompt Engineering",
      "RAG",
      "AI API Integration"
    ]
  },
  {
    "name": "Career",
    "subcategories": [
      "Resume",
      "Resume ATS Optimization",
      "LinkedIn",
      "Interview Preparation",
      "HR Interview",
      "Technical Interview",
      "Project Explanation",
      "Behavioral Questions",
      "Career Roadmap"
    ]
  }
];

const PROMPT_COLLECTIONS = [
  {
    "id": "all",
    "name": "✨ All Prompts",
    "filterType": "all",
    "icon": "apps"
  },
  {
    "id": "leetcode-mastery",
    "name": "🔥 LeetCode Mastery",
    "filterType": "category",
    "target": "DSA & Interview",
    "icon": "alt_route"
  },
  {
    "id": "js-deep-dive",
    "name": "💻 JavaScript Deep Dive",
    "filterType": "subcategory",
    "target": "JavaScript",
    "icon": "code"
  },
  {
    "id": "react-mastery",
    "name": "⚛️ React & Frontend",
    "filterType": "subcategory",
    "target": "React",
    "icon": "web"
  },
  {
    "id": "fullstack-dev",
    "name": "🌐 Full Stack Dev",
    "filterType": "subcategory",
    "target": "Full Stack Development",
    "icon": "layers"
  },
  {
    "id": "sql-dbms",
    "name": "🗄 SQL & DBMS Interview",
    "filterType": "category",
    "target": "Database",
    "icon": "database"
  },
  {
    "id": "core-cs",
    "name": "🧠 Core CS Interview",
    "filterType": "category",
    "target": "Core Computer Science",
    "icon": "memory"
  },
  {
    "id": "sys-design",
    "name": "🏗 System Design",
    "filterType": "subcategory",
    "target": "System Design",
    "icon": "account_tree"
  },
  {
    "id": "debugging-toolkit",
    "name": "🐛 Debugging Toolkit",
    "filterType": "useCase",
    "target": "Debugging",
    "icon": "pest_control"
  },
  {
    "id": "cloud-devops",
    "name": "☁️ Cloud & DevOps",
    "filterType": "category",
    "target": "DevOps / Cloud",
    "icon": "cloud"
  },
  {
    "id": "ai-ml-dev",
    "name": "🤖 AI/ML Development",
    "filterType": "category",
    "target": "AI / ML",
    "icon": "smart_toy"
  },
  {
    "id": "resume-career",
    "name": "📄 Resume & Career",
    "filterType": "category",
    "target": "Career",
    "icon": "description"
  },
  {
    "id": "tech-interview",
    "name": "🎯 Technical Interview",
    "filterType": "difficulty",
    "target": "Interview",
    "icon": "psychology"
  }
];

const PROMPTS_DATA = [
  {
    "id": "p1",
    "title": "Root Cause & Asynchronous Race Condition Debugger",
    "category": "Engineering",
    "subcategory": "Debugging",
    "description": "Pinpoints elusive concurrency bugs, stale state closures in React, and unhandled promise rejections.",
    "prompt": "Act as a Principal Software Engineer and debugging expert. I am encountering an intermittent bug in the following code snippet.\n\nProblem Context:\n{{ERROR_OR_SYMPTOM}}\n\nCode:\n{{CODE}}\n\nTasks:\n1. Conduct a deep Root Cause Analysis (RCA) to identify any race conditions, stale closures, unhandled promise rejections, or memory leaks.\n2. Provide a line-by-line explanation of why the failure occurs under specific timing sequences.\n3. Rewrite the code defensively with proper synchronization, cleanup routines, and error boundaries.\n4. Provide unit tests reproducing the failure and confirming the fix.\n5. Identify any potential regressions or architectural trade-offs introduced by the fix.\n\nConstraints:\n- Do not rewrite unrelated business logic.\n- Do not introduce heavy third-party dependencies unless strictly necessary.\n- Preserve existing function signatures.\n\nExpected Output Format:\n1. Root Cause Identification\n2. Timing / Race Condition Trace\n3. Corrected Implementation\n4. Regression Risk Assessment\n5. Reproduction Test Case",
    "promptText": "Act as a Principal Software Engineer and debugging expert. I am encountering an intermittent bug in the following code snippet.\n\nProblem Context:\n{{ERROR_OR_SYMPTOM}}\n\nCode:\n{{CODE}}\n\nTasks:\n1. Conduct a deep Root Cause Analysis (RCA) to identify any race conditions, stale closures, unhandled promise rejections, or memory leaks.\n2. Provide a line-by-line explanation of why the failure occurs under specific timing sequences.\n3. Rewrite the code defensively with proper synchronization, cleanup routines, and error boundaries.\n4. Provide unit tests reproducing the failure and confirming the fix.\n5. Identify any potential regressions or architectural trade-offs introduced by the fix.\n\nConstraints:\n- Do not rewrite unrelated business logic.\n- Do not introduce heavy third-party dependencies unless strictly necessary.\n- Preserve existing function signatures.\n\nExpected Output Format:\n1. Root Cause Identification\n2. Timing / Race Condition Trace\n3. Corrected Implementation\n4. Regression Risk Assessment\n5. Reproduction Test Case",
    "tags": [
      "debugging",
      "async",
      "concurrency",
      "race-conditions",
      "promises"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{ERROR_OR_SYMPTOM}}",
      "{{CODE}}"
    ],
    "expectedOutput": "Root cause + timing trace + corrected code + regression assessment + test case",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "p2",
    "title": "Clean Architecture & SOLID Refactoring",
    "category": "Engineering",
    "subcategory": "Code Refactoring",
    "description": "Transforms monolithic functions into decoupled, testable modules conforming to SOLID principles.",
    "prompt": "Act as a Senior Software Architect. Analyze the following function/module and refactor it for long-term production maintainability.\n\nTarget Code:\n{{CODE}}\n\nProject Context:\n{{PROJECT_CONTEXT}}\n\nTasks:\n1. Audit the code against all 5 SOLID principles and identify violations (e.g. Single Responsibility, Open/Closed, Dependency Inversion).\n2. Decouple side-effects, I/O operations, and database/network calls from pure domain business logic.\n3. Restructure the code into modular classes or pure composable functions with clean interfaces.\n4. Add comprehensive TypeScript interface definitions or strict type annotations.\n5. Provide unit tests using Jest/Vitest with 100% branch and edge-case coverage.\n\nConstraints:\n- Preserve existing public API contracts and return types.\n- Avoid over-engineering; keep patterns pragmatic and idiomatic.\n\nExpected Output Format:\n1. SOLID Violation Audit\n2. Refactored Architecture Breakdown\n3. Clean Production-Ready Code\n4. TypeScript Interfaces / Types\n5. Comprehensive Test Suite",
    "promptText": "Act as a Senior Software Architect. Analyze the following function/module and refactor it for long-term production maintainability.\n\nTarget Code:\n{{CODE}}\n\nProject Context:\n{{PROJECT_CONTEXT}}\n\nTasks:\n1. Audit the code against all 5 SOLID principles and identify violations (e.g. Single Responsibility, Open/Closed, Dependency Inversion).\n2. Decouple side-effects, I/O operations, and database/network calls from pure domain business logic.\n3. Restructure the code into modular classes or pure composable functions with clean interfaces.\n4. Add comprehensive TypeScript interface definitions or strict type annotations.\n5. Provide unit tests using Jest/Vitest with 100% branch and edge-case coverage.\n\nConstraints:\n- Preserve existing public API contracts and return types.\n- Avoid over-engineering; keep patterns pragmatic and idiomatic.\n\nExpected Output Format:\n1. SOLID Violation Audit\n2. Refactored Architecture Breakdown\n3. Clean Production-Ready Code\n4. TypeScript Interfaces / Types\n5. Comprehensive Test Suite",
    "tags": [
      "refactoring",
      "clean-code",
      "solid",
      "architecture",
      "typescript"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Review",
    "variables": [
      "{{CODE}}",
      "{{PROJECT_CONTEXT}}"
    ],
    "expectedOutput": "SOLID audit + refactored modular code + types + complete test suite",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "p3",
    "title": "Distributed System Architecture & Scale Assessment",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Designs resilient high-throughput cloud architectures handling millions of concurrent requests.",
    "prompt": "Act as a Principal Cloud Architect and Distributed Systems Specialist. Design a highly scalable, fault-tolerant system for the following requirements.\n\nTarget System:\n{{TARGET_SYSTEM}}\n\nScale Assumptions & Traffic:\n{{SCALE_REQUIREMENTS}}\n\nTasks:\n1. Functional & Non-Functional Requirements (Latency SLAs, Availability, Durability).\n2. Back-of-the-envelope capacity estimations (QPS, storage, bandwidth).\n3. API Design (REST / gRPC / WebSocket contracts).\n4. Data Modeling & Database Choice: Justify SQL vs NoSQL vs In-Memory store based on access patterns.\n5. High-Level Architecture Diagram (Load Balancer, API Gateway, Microservices, Message Queues, Caching Layer).\n6. Deep Dives:\n   - Handling extreme peak concurrency & partition tolerance (CAP theorem trade-offs).\n   - Distributed locking, idempotency keys, and deduplication.\n   - Cache invalidation and multi-region replication.\n7. Observability, Rate-Limiting, and Graceful Degradation under partial failure.\n\nConstraints:\n- Address single points of failure (SPOF) explicitly.\n- Propose concrete open-source technologies (e.g., Redis, Kafka, PostgreSQL, Nginx).\n\nExpected Output Format:\nStructured 8-section High-Level Design document with API specs, schema, component interactions, and trade-off matrix.",
    "promptText": "Act as a Principal Cloud Architect and Distributed Systems Specialist. Design a highly scalable, fault-tolerant system for the following requirements.\n\nTarget System:\n{{TARGET_SYSTEM}}\n\nScale Assumptions & Traffic:\n{{SCALE_REQUIREMENTS}}\n\nTasks:\n1. Functional & Non-Functional Requirements (Latency SLAs, Availability, Durability).\n2. Back-of-the-envelope capacity estimations (QPS, storage, bandwidth).\n3. API Design (REST / gRPC / WebSocket contracts).\n4. Data Modeling & Database Choice: Justify SQL vs NoSQL vs In-Memory store based on access patterns.\n5. High-Level Architecture Diagram (Load Balancer, API Gateway, Microservices, Message Queues, Caching Layer).\n6. Deep Dives:\n   - Handling extreme peak concurrency & partition tolerance (CAP theorem trade-offs).\n   - Distributed locking, idempotency keys, and deduplication.\n   - Cache invalidation and multi-region replication.\n7. Observability, Rate-Limiting, and Graceful Degradation under partial failure.\n\nConstraints:\n- Address single points of failure (SPOF) explicitly.\n- Propose concrete open-source technologies (e.g., Redis, Kafka, PostgreSQL, Nginx).\n\nExpected Output Format:\nStructured 8-section High-Level Design document with API specs, schema, component interactions, and trade-off matrix.",
    "tags": [
      "system-design",
      "distributed-systems",
      "scalability",
      "cloud",
      "architecture"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{TARGET_SYSTEM}}",
      "{{SCALE_REQUIREMENTS}}"
    ],
    "expectedOutput": "End-to-end HLD document: APIs, data schema, components, scaling strategy & bottlenecks",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "p4",
    "title": "DSA Time & Space Complexity Optimizer ($O(N)$)",
    "category": "DSA & Interview",
    "subcategory": "Complexity Analysis",
    "description": "Refactors brute-force algorithm solutions into optimal time/space complexity approaches.",
    "prompt": "Act as a Competitive Programming Champion and FAANG Senior Technical Interviewer. Analyze my current solution for the following DSA problem and guide me to the mathematically optimal approach.\n\nProblem Description / Constraints:\n{{PROBLEM}}\n\nMy Current Solution:\n{{CODE}}\n\nTasks:\n1. Step-by-step Big-O Time & Auxiliary Space complexity analysis of my current code (formal derivation).\n2. Identify the fundamental algorithmic bottleneck causing sub-optimal performance (e.g. redundant recalculations, nested loops, unsorted scanning).\n3. Recommend the optimal algorithmic pattern (e.g. Two Pointers, Monotonic Deque, Sliding Window, Prefix Sum + Hash Map, Segment Tree, or DP).\n4. Provide the optimal solution in clean, commented production-ready code with invariant explanations.\n5. Trace execution through an edge case (e.g. empty input, single element, duplicates, negative numbers, extreme scale).\n\nConstraints:\n- Optimal Big-O must match the theoretical lower bound for this problem.\n- Explain trade-offs between Time and Auxiliary Memory.\n\nExpected Output Format:\n1. Current Complexity Breakdown\n2. Bottleneck Analysis\n3. Recommended Paradigm & Mathematical Invariant\n4. Optimal Solution Code\n5. Edge-Case Walkthrough Table",
    "promptText": "Act as a Competitive Programming Champion and FAANG Senior Technical Interviewer. Analyze my current solution for the following DSA problem and guide me to the mathematically optimal approach.\n\nProblem Description / Constraints:\n{{PROBLEM}}\n\nMy Current Solution:\n{{CODE}}\n\nTasks:\n1. Step-by-step Big-O Time & Auxiliary Space complexity analysis of my current code (formal derivation).\n2. Identify the fundamental algorithmic bottleneck causing sub-optimal performance (e.g. redundant recalculations, nested loops, unsorted scanning).\n3. Recommend the optimal algorithmic pattern (e.g. Two Pointers, Monotonic Deque, Sliding Window, Prefix Sum + Hash Map, Segment Tree, or DP).\n4. Provide the optimal solution in clean, commented production-ready code with invariant explanations.\n5. Trace execution through an edge case (e.g. empty input, single element, duplicates, negative numbers, extreme scale).\n\nConstraints:\n- Optimal Big-O must match the theoretical lower bound for this problem.\n- Explain trade-offs between Time and Auxiliary Memory.\n\nExpected Output Format:\n1. Current Complexity Breakdown\n2. Bottleneck Analysis\n3. Recommended Paradigm & Mathematical Invariant\n4. Optimal Solution Code\n5. Edge-Case Walkthrough Table",
    "tags": [
      "dsa",
      "leetcode",
      "algorithms",
      "optimization",
      "complexity"
    ],
    "difficulty": "Intermediate",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM}}",
      "{{CODE}}"
    ],
    "expectedOutput": "Current complexity audit + bottleneck explanation + optimal algorithm code + edge-case trace",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "p5",
    "title": "Unit Test Suite Generator with Edge Cases",
    "category": "Engineering",
    "subcategory": "Testing",
    "description": "Generates comprehensive unit tests covering boundary values, null checks, and error branches.",
    "prompt": "Act as a Principal QA Automation and Software Test Engineer. Generate an exhaustive unit and integration test suite for the following module.\n\nCode Under Test:\n{{CODE}}\n\nTesting Framework:\n{{TEST_FRAMEWORK}}\n\nRequirements:\n1. Happy Path Coverage: Standard valid inputs with expected outputs.\n2. Boundary & Edge Cases:\n   - Zero, empty collections, single elements, max/min integer limits.\n   - Null, undefined, malformed structures, unexpected property types.\n3. Fault Injection & Rejection Paths:\n   - Network failure mocks, timeout rejections, disk/database errors.\n4. Security & Validation Fuzzing:\n   - Injection payloads, oversized inputs, special characters.\n5. Setup & Teardown:\n   - Proper lifecycle hooks (beforeEach, afterEach), mocked external timers, isolated sandbox spies.\n\nConstraints:\n- Test names must follow the convention: \"should [expected behavior] when [condition/input]\".\n- Assertions must be deterministic and free of race conditions.\n\nExpected Output Format:\nFully executable test file with imports, mock setups, organized describe/it blocks, and inline explanations for subtle edge cases.",
    "promptText": "Act as a Principal QA Automation and Software Test Engineer. Generate an exhaustive unit and integration test suite for the following module.\n\nCode Under Test:\n{{CODE}}\n\nTesting Framework:\n{{TEST_FRAMEWORK}}\n\nRequirements:\n1. Happy Path Coverage: Standard valid inputs with expected outputs.\n2. Boundary & Edge Cases:\n   - Zero, empty collections, single elements, max/min integer limits.\n   - Null, undefined, malformed structures, unexpected property types.\n3. Fault Injection & Rejection Paths:\n   - Network failure mocks, timeout rejections, disk/database errors.\n4. Security & Validation Fuzzing:\n   - Injection payloads, oversized inputs, special characters.\n5. Setup & Teardown:\n   - Proper lifecycle hooks (beforeEach, afterEach), mocked external timers, isolated sandbox spies.\n\nConstraints:\n- Test names must follow the convention: \"should [expected behavior] when [condition/input]\".\n- Assertions must be deterministic and free of race conditions.\n\nExpected Output Format:\nFully executable test file with imports, mock setups, organized describe/it blocks, and inline explanations for subtle edge cases.",
    "tags": [
      "testing",
      "unit-tests",
      "jest",
      "vitest",
      "edge-cases",
      "qa"
    ],
    "difficulty": "Intermediate",
    "useCase": "Testing",
    "variables": [
      "{{CODE}}",
      "{{TEST_FRAMEWORK}}"
    ],
    "expectedOutput": "Complete production test file with describe/it blocks covering happy, boundary, and error paths",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "p6",
    "title": "REST to GraphQL Schema & Resolver Migration",
    "category": "Engineering",
    "subcategory": "Code Refactoring",
    "description": "Translates legacy REST endpoints into strongly typed GraphQL SDL schemas and resolvers.",
    "prompt": "Act as a Senior API Architect. Transform the following REST API endpoints into an idiomatic, production-ready GraphQL Schema Definition Language (SDL) schema and resolver implementation.\n\nREST Endpoints & Payloads:\n{{REST_ENDPOINTS}}\n\nTasks:\n1. Design strongly typed GraphQL Object Types, Input Types, Enums, and Custom Scalars.\n2. Formulate clean Query and Mutation schemas following GraphQL best practices (e.g. nested sub-fields, pagination arguments).\n3. Write clean resolver functions with context, authentication checks, and error masking.\n4. Propose DataLoader implementations to eliminate the N+1 database query problem during field resolution.\n5. Provide sample GraphQL query payloads demonstrating how clients query the new schema.\n\nConstraints:\n- Prevent unbounded query depths and circular queries.\n- Ensure backwards compatibility with existing business entities.\n\nExpected Output Format:\n1. GraphQL SDL Schema (.graphql)\n2. Resolver Implementation (Node.js/TypeScript)\n3. DataLoader Batching Setup\n4. Example Client Queries & Mutations",
    "promptText": "Act as a Senior API Architect. Transform the following REST API endpoints into an idiomatic, production-ready GraphQL Schema Definition Language (SDL) schema and resolver implementation.\n\nREST Endpoints & Payloads:\n{{REST_ENDPOINTS}}\n\nTasks:\n1. Design strongly typed GraphQL Object Types, Input Types, Enums, and Custom Scalars.\n2. Formulate clean Query and Mutation schemas following GraphQL best practices (e.g. nested sub-fields, pagination arguments).\n3. Write clean resolver functions with context, authentication checks, and error masking.\n4. Propose DataLoader implementations to eliminate the N+1 database query problem during field resolution.\n5. Provide sample GraphQL query payloads demonstrating how clients query the new schema.\n\nConstraints:\n- Prevent unbounded query depths and circular queries.\n- Ensure backwards compatibility with existing business entities.\n\nExpected Output Format:\n1. GraphQL SDL Schema (.graphql)\n2. Resolver Implementation (Node.js/TypeScript)\n3. DataLoader Batching Setup\n4. Example Client Queries & Mutations",
    "tags": [
      "graphql",
      "rest-api",
      "api-design",
      "backend",
      "architecture"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture",
    "variables": [
      "{{REST_ENDPOINTS}}"
    ],
    "expectedOutput": "SDL schema + resolver functions + DataLoader batching pattern + sample client queries",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-no-spoiler-level1",
    "title": "DSA No-Spoiler Mentor: Level 1 Concept Hint",
    "category": "DSA & Interview",
    "subcategory": "No-Spoiler Mentorship",
    "description": "Provides only a conceptual nudge or mental model without revealing the algorithmic pattern or any code.",
    "prompt": "Act as an expert DSA Coach and Socratic Interviewer. My goal is to build deep problem-solving intuition without having the answer spoiled.\n\nProblem Statement:\n{{PROBLEM_DESCRIPTION}}\n\nMy Current Thoughts / Approach:\n{{MY_ATTEMPT_OR_THOUGHTS}}\n\nRules:\n- DO NOT reveal the algorithm name (e.g. do not say \"use Sliding Window\" or \"use Monotonic Stack\").\n- DO NOT write any pseudocode or code.\n- DO NOT provide the optimal time complexity yet.\n- Ask me 2 to 3 targeted guiding questions about the input properties, constraints, or invariants that will trigger the \"Aha!\" moment.\n- Highlight any hidden assumption I might be making in my current thoughts.\n\nExpected Output Format:\n1. Socratic Observation on My Attempt\n2. Conceptual Guiding Questions (2-3 questions)\n3. One Invariant to Think About (e.g., \"What happens as the right boundary expands?\")",
    "promptText": "Act as an expert DSA Coach and Socratic Interviewer. My goal is to build deep problem-solving intuition without having the answer spoiled.\n\nProblem Statement:\n{{PROBLEM_DESCRIPTION}}\n\nMy Current Thoughts / Approach:\n{{MY_ATTEMPT_OR_THOUGHTS}}\n\nRules:\n- DO NOT reveal the algorithm name (e.g. do not say \"use Sliding Window\" or \"use Monotonic Stack\").\n- DO NOT write any pseudocode or code.\n- DO NOT provide the optimal time complexity yet.\n- Ask me 2 to 3 targeted guiding questions about the input properties, constraints, or invariants that will trigger the \"Aha!\" moment.\n- Highlight any hidden assumption I might be making in my current thoughts.\n\nExpected Output Format:\n1. Socratic Observation on My Attempt\n2. Conceptual Guiding Questions (2-3 questions)\n3. One Invariant to Think About (e.g., \"What happens as the right boundary expands?\")",
    "tags": [
      "dsa",
      "leetcode",
      "hints",
      "no-spoiler",
      "interview-prep",
      "socratic"
    ],
    "difficulty": "Beginner",
    "useCase": "Learning & Hints",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{MY_ATTEMPT_OR_THOUGHTS}}"
    ],
    "expectedOutput": "Socratic observation + 2-3 guiding questions + invariant hint (zero spoilers or code)",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-no-spoiler-level2",
    "title": "DSA No-Spoiler Mentor: Level 2 Pattern Hint",
    "category": "DSA & Interview",
    "subcategory": "No-Spoiler Mentorship",
    "description": "Reveals the algorithmic category and explains why the problem constraints mathematically point to this pattern.",
    "prompt": "Act as a Senior DSA Coach. I understand the basic problem statement, but I need guidance on which algorithmic pattern fits best.\n\nProblem & Constraints:\n{{PROBLEM_AND_CONSTRAINTS}}\n\nMy Analysis So Far:\n{{MY_ANALYSIS}}\n\nTasks:\n1. Reveal the matching algorithmic pattern (e.g. Two Pointers, Monotonic Stack, Sliding Window, Prefix Sum + Hashing, TopoSort, DP).\n2. Justify WHY this pattern applies by analyzing the problem constraints (e.g. N <= 10^5 implies O(N) or O(N log N)).\n3. Identify the core data structure needed and its role (e.g. \"We need a Deque to maintain maximums in a sliding window\").\n4. State the condition when elements enter or leave the data structure.\n5. DO NOT provide pseudocode or the full solution yet.\n\nExpected Output Format:\n1. Algorithmic Pattern Name\n2. Constraint & Big-O Deduction\n3. Core Data Structure & Its Invariant\n4. Transition / Window Shift Rule",
    "promptText": "Act as a Senior DSA Coach. I understand the basic problem statement, but I need guidance on which algorithmic pattern fits best.\n\nProblem & Constraints:\n{{PROBLEM_AND_CONSTRAINTS}}\n\nMy Analysis So Far:\n{{MY_ANALYSIS}}\n\nTasks:\n1. Reveal the matching algorithmic pattern (e.g. Two Pointers, Monotonic Stack, Sliding Window, Prefix Sum + Hashing, TopoSort, DP).\n2. Justify WHY this pattern applies by analyzing the problem constraints (e.g. N <= 10^5 implies O(N) or O(N log N)).\n3. Identify the core data structure needed and its role (e.g. \"We need a Deque to maintain maximums in a sliding window\").\n4. State the condition when elements enter or leave the data structure.\n5. DO NOT provide pseudocode or the full solution yet.\n\nExpected Output Format:\n1. Algorithmic Pattern Name\n2. Constraint & Big-O Deduction\n3. Core Data Structure & Its Invariant\n4. Transition / Window Shift Rule",
    "tags": [
      "dsa",
      "pattern-recognition",
      "leetcode",
      "no-spoiler",
      "hints"
    ],
    "difficulty": "Intermediate",
    "useCase": "Learning & Hints",
    "variables": [
      "{{PROBLEM_AND_CONSTRAINTS}}",
      "{{MY_ANALYSIS}}"
    ],
    "expectedOutput": "Pattern name + constraint deduction + data structure invariant + shift condition",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-no-spoiler-level3",
    "title": "DSA No-Spoiler Mentor: Level 3 Approach & Algorithm Blueprint",
    "category": "DSA & Interview",
    "subcategory": "No-Spoiler Mentorship",
    "description": "Outlines the high-level step-by-step algorithm blueprint and invariants without giving away concrete code.",
    "prompt": "Act as a Technical Interview Mentor. I know the pattern for this problem, but I need the step-by-step algorithmic blueprint to implement it myself.\n\nProblem & Pattern:\n{{PROBLEM_AND_CHOSEN_PATTERN}}\n\nTasks:\n1. Formulate the state invariants (what must remain true before and after each loop iteration).\n2. Provide a clear 4-to-6 step textual algorithm blueprint (plain English, no code syntax).\n3. Specify the exact base cases and termination criteria.\n4. Detail how to handle edge conditions (e.g., negative values, duplicates, empty bounds).\n5. State the target Time and Auxiliary Space complexities.\n\nConstraints:\n- Do NOT write C++, Java, or Python syntax. Keep it strictly conceptual blueprint format.\n\nExpected Output Format:\n1. Invariants to Maintain\n2. Step-by-Step Algorithmic Logic\n3. Termination & Boundary Rules\n4. Complexity Target",
    "promptText": "Act as a Technical Interview Mentor. I know the pattern for this problem, but I need the step-by-step algorithmic blueprint to implement it myself.\n\nProblem & Pattern:\n{{PROBLEM_AND_CHOSEN_PATTERN}}\n\nTasks:\n1. Formulate the state invariants (what must remain true before and after each loop iteration).\n2. Provide a clear 4-to-6 step textual algorithm blueprint (plain English, no code syntax).\n3. Specify the exact base cases and termination criteria.\n4. Detail how to handle edge conditions (e.g., negative values, duplicates, empty bounds).\n5. State the target Time and Auxiliary Space complexities.\n\nConstraints:\n- Do NOT write C++, Java, or Python syntax. Keep it strictly conceptual blueprint format.\n\nExpected Output Format:\n1. Invariants to Maintain\n2. Step-by-Step Algorithmic Logic\n3. Termination & Boundary Rules\n4. Complexity Target",
    "tags": [
      "dsa",
      "approach",
      "blueprint",
      "leetcode",
      "algorithms"
    ],
    "difficulty": "Intermediate",
    "useCase": "Learning & Hints",
    "variables": [
      "{{PROBLEM_AND_CHOSEN_PATTERN}}"
    ],
    "expectedOutput": "Step-by-step plain English algorithm blueprint + loop invariants + boundary rules",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-no-spoiler-level4",
    "title": "DSA No-Spoiler Mentor: Level 4 Pseudocode & Invariant Contract",
    "category": "DSA & Interview",
    "subcategory": "No-Spoiler Mentorship",
    "description": "Provides structured language-agnostic pseudocode with loop conditions and state updates.",
    "prompt": "Act as a Staff Algorithm Specialist. I need structured, language-agnostic pseudocode for the following algorithm.\n\nAlgorithm Objective & Constraints:\n{{ALGORITHM_OBJECTIVE}}\n\nTasks:\n1. Write clean, indented pseudocode (using FUNCTION, FOR, WHILE, IF/ELSE, RETURN).\n2. Clearly declare pointer initialization and state variables.\n3. Annotate the loop invariants with comments.\n4. Show exact condition when pointers advance or data structures pop.\n5. Explicitly handle return value for edge cases (e.g., target not found -> return -1).\n\nExpected Output Format:\n1. State Variables Definition\n2. Structured Pseudocode\n3. Loop Invariant Comments\n4. Complexity Proof",
    "promptText": "Act as a Staff Algorithm Specialist. I need structured, language-agnostic pseudocode for the following algorithm.\n\nAlgorithm Objective & Constraints:\n{{ALGORITHM_OBJECTIVE}}\n\nTasks:\n1. Write clean, indented pseudocode (using FUNCTION, FOR, WHILE, IF/ELSE, RETURN).\n2. Clearly declare pointer initialization and state variables.\n3. Annotate the loop invariants with comments.\n4. Show exact condition when pointers advance or data structures pop.\n5. Explicitly handle return value for edge cases (e.g., target not found -> return -1).\n\nExpected Output Format:\n1. State Variables Definition\n2. Structured Pseudocode\n3. Loop Invariant Comments\n4. Complexity Proof",
    "tags": [
      "dsa",
      "pseudocode",
      "leetcode",
      "algorithms",
      "structure"
    ],
    "difficulty": "Intermediate",
    "useCase": "Learning & Hints",
    "variables": [
      "{{ALGORITHM_OBJECTIVE}}"
    ],
    "expectedOutput": "Structured language-agnostic pseudocode + invariant annotations + complexity proof",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-no-spoiler-level5",
    "title": "DSA Master: Level 5 Production-Grade Solution & Proof",
    "category": "DSA & Interview",
    "subcategory": "No-Spoiler Mentorship",
    "description": "Generates the optimal, production-ready implementation in your preferred language with line-by-line comments and proof of correctness.",
    "prompt": "Act as a Principal Competitive Programmer and FAANG Interviewer. Provide the optimal production-grade solution for this problem.\n\nProblem Details:\n{{PROBLEM_DETAILS}}\n\nTarget Language:\n{{PROGRAMMING_LANGUAGE}}\n\nTasks:\n1. Deliver the mathematically optimal solution in {{PROGRAMMING_LANGUAGE}} with clean variable names, const-correctness, and comprehensive comments.\n2. Provide formal mathematical proof of correctness (Loop Invariant / Greedy Choice Property / Optimal Substructure).\n3. State exact Time Complexity and Auxiliary Space Complexity with derivation.\n4. Detail all edge cases handled (e.g. INT_MIN / INT_MAX overflow, empty collections, single items, duplicate elements).\n5. Add 3 canonical test cases with dry-run trace table.\n\nExpected Output Format:\n1. Optimal Implementation Code\n2. Mathematical Correctness Proof\n3. Big-O Complexity Breakdown\n4. Edge Case Handling Rationale\n5. Trace Table Example",
    "promptText": "Act as a Principal Competitive Programmer and FAANG Interviewer. Provide the optimal production-grade solution for this problem.\n\nProblem Details:\n{{PROBLEM_DETAILS}}\n\nTarget Language:\n{{PROGRAMMING_LANGUAGE}}\n\nTasks:\n1. Deliver the mathematically optimal solution in {{PROGRAMMING_LANGUAGE}} with clean variable names, const-correctness, and comprehensive comments.\n2. Provide formal mathematical proof of correctness (Loop Invariant / Greedy Choice Property / Optimal Substructure).\n3. State exact Time Complexity and Auxiliary Space Complexity with derivation.\n4. Detail all edge cases handled (e.g. INT_MIN / INT_MAX overflow, empty collections, single items, duplicate elements).\n5. Add 3 canonical test cases with dry-run trace table.\n\nExpected Output Format:\n1. Optimal Implementation Code\n2. Mathematical Correctness Proof\n3. Big-O Complexity Breakdown\n4. Edge Case Handling Rationale\n5. Trace Table Example",
    "tags": [
      "dsa",
      "solution",
      "leetcode",
      "production-code",
      "complexity"
    ],
    "difficulty": "Advanced",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DETAILS}}",
      "{{PROGRAMMING_LANGUAGE}}"
    ],
    "expectedOutput": "Production-ready optimal code + correctness proof + complexity derivation + dry-run table",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-problem-clarification",
    "title": "LeetCode Problem Deconstruction & Clarifying Questions",
    "category": "DSA & Interview",
    "subcategory": "Interview Questions",
    "description": "Analyzes a raw problem statement, generates 5 essential interview clarifying questions, and identifies hidden constraints.",
    "prompt": "Act as a FAANG Interview Candidate and Senior Engineer. I am looking at a new algorithm problem statement.\n\nProblem Statement:\n{{PROBLEM_STATEMENT}}\n\nTasks:\n1. Summarize the core problem in 2 clear sentences.\n2. List 5 high-impact clarifying questions an elite candidate must ask the interviewer before writing code (e.g., input size, mutation rules, space limits, duplicate handling, negative values).\n3. Identify the implicit constraints (e.g., what does N <= 10^5 tell us about Big-O?).\n4. Provide 3 custom test cases:\n   - Typical case\n   - Tricky boundary case\n   - Maximum scale stress test\n\nExpected Output Format:\n1. 2-Sentence Problem Essence\n2. 5 Critical Clarifying Questions\n3. Constraint Deduction Matrix\n4. 3 Curated Edge Cases with Expected Outputs",
    "promptText": "Act as a FAANG Interview Candidate and Senior Engineer. I am looking at a new algorithm problem statement.\n\nProblem Statement:\n{{PROBLEM_STATEMENT}}\n\nTasks:\n1. Summarize the core problem in 2 clear sentences.\n2. List 5 high-impact clarifying questions an elite candidate must ask the interviewer before writing code (e.g., input size, mutation rules, space limits, duplicate handling, negative values).\n3. Identify the implicit constraints (e.g., what does N <= 10^5 tell us about Big-O?).\n4. Provide 3 custom test cases:\n   - Typical case\n   - Tricky boundary case\n   - Maximum scale stress test\n\nExpected Output Format:\n1. 2-Sentence Problem Essence\n2. 5 Critical Clarifying Questions\n3. Constraint Deduction Matrix\n4. 3 Curated Edge Cases with Expected Outputs",
    "tags": [
      "dsa",
      "interview-prep",
      "clarifying-questions",
      "leetcode",
      "problem-solving"
    ],
    "difficulty": "Beginner",
    "useCase": "Interview Preparation",
    "variables": [
      "{{PROBLEM_STATEMENT}}"
    ],
    "expectedOutput": "Problem summary + 5 clarifying interview questions + constraint deduction + edge cases",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-brute-to-optimal",
    "title": "Brute Force to Optimal Algorithm Evolution",
    "category": "DSA & Interview",
    "subcategory": "Complexity Analysis",
    "description": "Takes a naive O(N^2) or O(2^N) brute-force solution and systematically evolves it into an optimal O(N) or O(N log N) solution.",
    "prompt": "Act as a Computer Science Professor and Algorithms Specialist. Analyze my brute-force solution and walk through the systematic transformation into an optimal solution.\n\nProblem:\n{{PROBLEM_DESCRIPTION}}\n\nMy Brute-Force Code:\n{{BRUTE_FORCE_CODE}}\n\nTasks:\n1. Calculate the exact Time and Space complexity of the brute force solution.\n2. Pinpoint the \"Redundant Work\" or \"Repeated Calculation\" that brute force performs.\n3. Show how caching, precomputation (Prefix Sum), sorting, or auxiliary data structures eliminate the redundant work.\n4. Step-by-step refactoring:\n   - Step A: Naive approach (O(N^2) or O(2^N))\n   - Step B: Intermediate optimization (e.g. O(N log N))\n   - Step C: Optimal linear/log-linear approach (O(N))\n5. Provide the final optimal code with comparison table.\n\nExpected Output Format:\n1. Brute Force Complexity & Flaw\n2. Redundant Work Analysis\n3. Evolution Steps (A -> B -> C)\n4. Final Optimal Code\n5. Side-by-Side Complexity Comparison Table",
    "promptText": "Act as a Computer Science Professor and Algorithms Specialist. Analyze my brute-force solution and walk through the systematic transformation into an optimal solution.\n\nProblem:\n{{PROBLEM_DESCRIPTION}}\n\nMy Brute-Force Code:\n{{BRUTE_FORCE_CODE}}\n\nTasks:\n1. Calculate the exact Time and Space complexity of the brute force solution.\n2. Pinpoint the \"Redundant Work\" or \"Repeated Calculation\" that brute force performs.\n3. Show how caching, precomputation (Prefix Sum), sorting, or auxiliary data structures eliminate the redundant work.\n4. Step-by-step refactoring:\n   - Step A: Naive approach (O(N^2) or O(2^N))\n   - Step B: Intermediate optimization (e.g. O(N log N))\n   - Step C: Optimal linear/log-linear approach (O(N))\n5. Provide the final optimal code with comparison table.\n\nExpected Output Format:\n1. Brute Force Complexity & Flaw\n2. Redundant Work Analysis\n3. Evolution Steps (A -> B -> C)\n4. Final Optimal Code\n5. Side-by-Side Complexity Comparison Table",
    "tags": [
      "dsa",
      "optimization",
      "brute-force",
      "complexity",
      "refactoring"
    ],
    "difficulty": "Intermediate",
    "useCase": "Optimization",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{BRUTE_FORCE_CODE}}"
    ],
    "expectedOutput": "Redundant work analysis + evolutionary optimization steps + optimal code + comparison table",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-dry-run-tracer",
    "title": "Algorithm Execution Dry Run & State Table Tracer",
    "category": "DSA & Interview",
    "subcategory": "DSA Debugging",
    "description": "Performs an exhaustive step-by-step trace of variables, pointers, and memory state on a specific test input.",
    "prompt": "Act as a Precise Execution Engine and DSA Tutor. Dry-run the following algorithm on the provided test case.\n\nAlgorithm Code:\n{{CODE}}\n\nTest Case Input:\n{{TEST_INPUT}}\n\nTasks:\n1. Trace every iteration of loops and recursive calls.\n2. Output a Markdown State Table showing:\n   - Step / Iteration Number\n   - Active Pointer / Index positions\n   - Data structure state (Stack / Queue / Array / Hash Map snapshot)\n   - Condition evaluations (True / False)\n   - Variable modifications\n3. Explain why the return value matches or fails the expected output.\n4. If an off-by-one or boundary violation happens, pinpoint the exact line and iteration.\n\nExpected Output Format:\n1. Markdown Variable Trace Table\n2. State Evolution Commentary\n3. Final Return Value & Correctness Check",
    "promptText": "Act as a Precise Execution Engine and DSA Tutor. Dry-run the following algorithm on the provided test case.\n\nAlgorithm Code:\n{{CODE}}\n\nTest Case Input:\n{{TEST_INPUT}}\n\nTasks:\n1. Trace every iteration of loops and recursive calls.\n2. Output a Markdown State Table showing:\n   - Step / Iteration Number\n   - Active Pointer / Index positions\n   - Data structure state (Stack / Queue / Array / Hash Map snapshot)\n   - Condition evaluations (True / False)\n   - Variable modifications\n3. Explain why the return value matches or fails the expected output.\n4. If an off-by-one or boundary violation happens, pinpoint the exact line and iteration.\n\nExpected Output Format:\n1. Markdown Variable Trace Table\n2. State Evolution Commentary\n3. Final Return Value & Correctness Check",
    "tags": [
      "dsa",
      "dry-run",
      "trace",
      "debugging",
      "pointers"
    ],
    "difficulty": "Easy",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{TEST_INPUT}}"
    ],
    "expectedOutput": "Step-by-step markdown trace table + variable states per iteration + return verification",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-debug-wrong-answer",
    "title": "DSA Wrong Answer & Off-By-One Bug Diagnostic",
    "category": "DSA & Interview",
    "subcategory": "DSA Debugging",
    "description": "Diagnoses why a LeetCode submission failed on a specific hidden test case, identifying off-by-one errors and integer overflows.",
    "prompt": "Act as a Senior Competitive Programmer. My LeetCode/DSA submission failed on a test case (Wrong Answer or Runtime Error).\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nMy Code:\n{{CODE}}\n\nFailing Test Input:\n{{FAILING_INPUT}}\n\nExpected Output:\n{{EXPECTED_OUTPUT}}\n\nActual Output:\n{{ACTUAL_OUTPUT}}\n\nTasks:\n1. Trace the exact line of code where the state diverges from the expected behavior on this input.\n2. Classify the bug category (e.g. Off-by-one boundary, Integer overflow, Unhandled empty state, Stale pointer, Comparator strict-weak ordering violation).\n3. Explain WHY the bug triggered specifically on this input.\n4. Provide the minimal surgical fix (highlighting before vs after lines).\n5. List 2 other corner cases that could have exposed the same vulnerability.\n\nExpected Output Format:\n1. Divergence Point & Bug Category\n2. Root Cause Mechanics\n3. Minimal Code Diff (Before vs After)\n4. Corrected Full Code\n5. Additional Corner Cases to Guard Against",
    "promptText": "Act as a Senior Competitive Programmer. My LeetCode/DSA submission failed on a test case (Wrong Answer or Runtime Error).\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nMy Code:\n{{CODE}}\n\nFailing Test Input:\n{{FAILING_INPUT}}\n\nExpected Output:\n{{EXPECTED_OUTPUT}}\n\nActual Output:\n{{ACTUAL_OUTPUT}}\n\nTasks:\n1. Trace the exact line of code where the state diverges from the expected behavior on this input.\n2. Classify the bug category (e.g. Off-by-one boundary, Integer overflow, Unhandled empty state, Stale pointer, Comparator strict-weak ordering violation).\n3. Explain WHY the bug triggered specifically on this input.\n4. Provide the minimal surgical fix (highlighting before vs after lines).\n5. List 2 other corner cases that could have exposed the same vulnerability.\n\nExpected Output Format:\n1. Divergence Point & Bug Category\n2. Root Cause Mechanics\n3. Minimal Code Diff (Before vs After)\n4. Corrected Full Code\n5. Additional Corner Cases to Guard Against",
    "tags": [
      "dsa",
      "debugging",
      "wrong-answer",
      "leetcode",
      "off-by-one"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{CODE}}",
      "{{FAILING_INPUT}}",
      "{{EXPECTED_OUTPUT}}",
      "{{ACTUAL_OUTPUT}}"
    ],
    "expectedOutput": "Bug classification + divergence point + minimal diff + corrected code + corner cases",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-dp-state-formulation",
    "title": "Dynamic Programming State & Recurrence Relation Formulator",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Systematically guides the derivation of DP state representation, recurrence relations, base cases, and space optimization.",
    "prompt": "Act as a Dynamic Programming Expert. Help me break down this complex problem into a clean DP recurrence relation.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Identify whether this problem exhibits Optimal Substructure and Overlapping Subproblems.\n2. State Formulation:\n   - What does `dp[i]` or `dp[i][j]` represent in plain English?\n   - What are the state dimensions and why are they necessary?\n3. Transition / Recurrence Relation:\n   - Express the mathematical formula connecting current state to prior states.\n   - Explain the choice at each step (e.g. Take vs Skip, Min vs Max).\n4. Base Cases:\n   - Identify the boundary initialization values (e.g., dp[0] = 0, dp[0][0] = 1).\n5. Evaluation Order:\n   - Bottom-up topological ordering (iterative loop directions).\n6. Space Optimization:\n   - Can the 2D DP table be compressed into a 1D rolling array? Show how and specify loop direction (e.g., backward for 0/1 knapsack).\n7. Full working code in {{PREFERRED_LANGUAGE}}.\n\nExpected Output Format:\n1. DP State Definition\n2. Mathematical Recurrence Relation\n3. Base Cases & Edge Cases\n4. Space-Optimized Implementation\n5. Time & Space Complexity",
    "promptText": "Act as a Dynamic Programming Expert. Help me break down this complex problem into a clean DP recurrence relation.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Identify whether this problem exhibits Optimal Substructure and Overlapping Subproblems.\n2. State Formulation:\n   - What does `dp[i]` or `dp[i][j]` represent in plain English?\n   - What are the state dimensions and why are they necessary?\n3. Transition / Recurrence Relation:\n   - Express the mathematical formula connecting current state to prior states.\n   - Explain the choice at each step (e.g. Take vs Skip, Min vs Max).\n4. Base Cases:\n   - Identify the boundary initialization values (e.g., dp[0] = 0, dp[0][0] = 1).\n5. Evaluation Order:\n   - Bottom-up topological ordering (iterative loop directions).\n6. Space Optimization:\n   - Can the 2D DP table be compressed into a 1D rolling array? Show how and specify loop direction (e.g., backward for 0/1 knapsack).\n7. Full working code in {{PREFERRED_LANGUAGE}}.\n\nExpected Output Format:\n1. DP State Definition\n2. Mathematical Recurrence Relation\n3. Base Cases & Edge Cases\n4. Space-Optimized Implementation\n5. Time & Space Complexity",
    "tags": [
      "dsa",
      "dynamic-programming",
      "dp",
      "algorithms",
      "recurrence"
    ],
    "difficulty": "Advanced",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{PREFERRED_LANGUAGE}}"
    ],
    "expectedOutput": "State definition + mathematical recurrence + base cases + space optimization + clean code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-sliding-window-template",
    "title": "Sliding Window Pattern: Fixed vs Dynamic Window Formulator",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Guides the implementation of Fixed-size or Dynamic-size sliding window algorithms with state tracking.",
    "prompt": "Act as a FAANG Coding Interviewer. Design a robust Sliding Window solution for the following problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Classify the window type: Fixed-size (length K) vs Dynamic-size (shrink when condition violated / expand to find minimum).\n2. Define the Window Invariant: What condition must be maintained inside [left, right]?\n3. State Tracking Data Structure: What tracks window state (Hash Map frequency counter, sum integer, Monotonic Deque)?\n4. Formulate the loop structure:\n   - Expansion step (right pointer loop)\n   - Contraction step (while loop condition for left pointer)\n   - Answer recording step (record before or after shrinking?)\n5. Provide clean, production-ready code with comments highlighting pointer movements.\n6. Verify against edge cases (e.g. window size > array length, all duplicate characters, empty array).\n\nExpected Output Format:\n1. Window Classification & Invariant\n2. Left/Right Pointer Contraction Rules\n3. Production Code Implementation\n4. Time O(N) & Space O(K) Complexity Derivation",
    "promptText": "Act as a FAANG Coding Interviewer. Design a robust Sliding Window solution for the following problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Classify the window type: Fixed-size (length K) vs Dynamic-size (shrink when condition violated / expand to find minimum).\n2. Define the Window Invariant: What condition must be maintained inside [left, right]?\n3. State Tracking Data Structure: What tracks window state (Hash Map frequency counter, sum integer, Monotonic Deque)?\n4. Formulate the loop structure:\n   - Expansion step (right pointer loop)\n   - Contraction step (while loop condition for left pointer)\n   - Answer recording step (record before or after shrinking?)\n5. Provide clean, production-ready code with comments highlighting pointer movements.\n6. Verify against edge cases (e.g. window size > array length, all duplicate characters, empty array).\n\nExpected Output Format:\n1. Window Classification & Invariant\n2. Left/Right Pointer Contraction Rules\n3. Production Code Implementation\n4. Time O(N) & Space O(K) Complexity Derivation",
    "tags": [
      "dsa",
      "sliding-window",
      "two-pointers",
      "arrays",
      "strings"
    ],
    "difficulty": "Intermediate",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}"
    ],
    "expectedOutput": "Window classification + invariant condition + pointer contraction rule + O(N) code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-two-pointers-technique",
    "title": "Two Pointers: Collision vs Parallel Fast/Slow Pattern Guide",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Determines whether opposite-end collision or fast/slow pointer cycle detection is appropriate and produces optimal code.",
    "prompt": "Act as an Algorithms Specialist. Formulate the optimal Two Pointers strategy for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Categorize the pointer strategy:\n   - Converging / Collision pointers (left = 0, right = n-1 moving inward on sorted data).\n   - Fast and Slow pointers (Tortoise & Hare for cycle detection or linked list midpoint).\n   - Parallel read/write pointers (in-place array deduplication/partitioning).\n2. State the invariant condition that guarantees no candidate pairs are missed.\n3. Detail how duplicate values are skipped to prevent redundant combinations (e.g. 3Sum pattern).\n4. Provide optimal code in {{LANGUAGE}} with defensive checks.\n5. Prove why the time complexity is strictly O(N) or O(N log N) if sorting is required.\n\nExpected Output Format:\n1. Strategy Categorization & Invariant Proof\n2. Duplicate Skipping Logic\n3. Optimal Implementation\n4. Complexity Analysis",
    "promptText": "Act as an Algorithms Specialist. Formulate the optimal Two Pointers strategy for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Categorize the pointer strategy:\n   - Converging / Collision pointers (left = 0, right = n-1 moving inward on sorted data).\n   - Fast and Slow pointers (Tortoise & Hare for cycle detection or linked list midpoint).\n   - Parallel read/write pointers (in-place array deduplication/partitioning).\n2. State the invariant condition that guarantees no candidate pairs are missed.\n3. Detail how duplicate values are skipped to prevent redundant combinations (e.g. 3Sum pattern).\n4. Provide optimal code in {{LANGUAGE}} with defensive checks.\n5. Prove why the time complexity is strictly O(N) or O(N log N) if sorting is required.\n\nExpected Output Format:\n1. Strategy Categorization & Invariant Proof\n2. Duplicate Skipping Logic\n3. Optimal Implementation\n4. Complexity Analysis",
    "tags": [
      "dsa",
      "two-pointers",
      "fast-slow",
      "arrays",
      "leetcode"
    ],
    "difficulty": "Easy",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{LANGUAGE}}"
    ],
    "expectedOutput": "Pointer strategy categorization + invariant proof + duplicate skip logic + O(N) code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-monotonic-stack-guide",
    "title": "Monotonic Stack & Deque Pattern Formulator",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Solves Next Greater Element, Daily Temperatures, or Histogram problems using monotonic stacks.",
    "prompt": "Act as a Competitive Programming Master. Guide me through designing a Monotonic Stack or Monotonic Deque solution for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Determine the monotonicity requirement: Monotonically Increasing vs Monotonically Decreasing.\n2. Element storage choice: Store raw values or array indices? (Explain why storing indices is almost always superior).\n3. Traversal direction: Traverse from left-to-right (0 to n-1) or right-to-left (n-1 down to 0)?\n4. Eviction Condition: What is the exact `while (!stack.empty() && ...)` comparison that pops elements?\n5. What does an element's pop signify (e.g. finding its Next Greater Element or determining rectangle boundary)?\n6. Provide clean, well-commented code in {{PREFERRED_LANGUAGE}} with O(N) amortized time proof.\n\nExpected Output Format:\n1. Monotonicity Choice (Increasing vs Decreasing)\n2. Index vs Value Strategy\n3. Eviction Rule & Pop Semantics\n4. Complete O(N) Implementation Code\n5. Amortized O(1) Per Element Push/Pop Proof",
    "promptText": "Act as a Competitive Programming Master. Guide me through designing a Monotonic Stack or Monotonic Deque solution for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Determine the monotonicity requirement: Monotonically Increasing vs Monotonically Decreasing.\n2. Element storage choice: Store raw values or array indices? (Explain why storing indices is almost always superior).\n3. Traversal direction: Traverse from left-to-right (0 to n-1) or right-to-left (n-1 down to 0)?\n4. Eviction Condition: What is the exact `while (!stack.empty() && ...)` comparison that pops elements?\n5. What does an element's pop signify (e.g. finding its Next Greater Element or determining rectangle boundary)?\n6. Provide clean, well-commented code in {{PREFERRED_LANGUAGE}} with O(N) amortized time proof.\n\nExpected Output Format:\n1. Monotonicity Choice (Increasing vs Decreasing)\n2. Index vs Value Strategy\n3. Eviction Rule & Pop Semantics\n4. Complete O(N) Implementation Code\n5. Amortized O(1) Per Element Push/Pop Proof",
    "tags": [
      "dsa",
      "monotonic-stack",
      "stack",
      "queue",
      "next-greater-element"
    ],
    "difficulty": "Intermediate",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{PREFERRED_LANGUAGE}}"
    ],
    "expectedOutput": "Monotonicity choice + eviction condition + index strategy + O(N) implementation code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-binary-search-on-answer",
    "title": "Binary Search on Answer (Predicate Monotonicity)",
    "category": "DSA & Interview",
    "subcategory": "Competitive Programming",
    "description": "Identifies problems solvable by binary searching the answer space using a monotonic predicate function (e.g., Koko Eating Bananas, Capacity To Ship Packages).",
    "prompt": "Act as a Senior Competitive Programming Coach. Formulate a \"Binary Search on Answer\" solution for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Prove the Monotonicity Condition: Show that if condition F(mid) is feasible, all values >= mid (or <= mid) are also feasible.\n2. Define the Search Space:\n   - What is `low` (minimum possible answer)?\n   - What is `high` (maximum theoretical answer)?\n3. Design the Feasibility Function `isValid(candidate, ...)`:\n   - What does it calculate?\n   - What is its Time Complexity (must be O(N))?\n4. Write the Binary Search boundary template:\n   - Prevent infinite loops: `while (low <= high)` vs `while (low < high)`.\n   - Middle element overflow protection: `mid = low + (high - low) / 2`.\n   - Update rules: `high = mid - 1` vs `low = mid + 1`.\n5. Provide complete code in {{LANGUAGE}} with O(N * log(Range)) complexity derivation.\n\nExpected Output Format:\n1. Monotonicity Proof\n2. Search Bounds (Low, High)\n3. Feasibility Function Logic\n4. Robust Binary Search Implementation\n5. Complexity Proof",
    "promptText": "Act as a Senior Competitive Programming Coach. Formulate a \"Binary Search on Answer\" solution for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Prove the Monotonicity Condition: Show that if condition F(mid) is feasible, all values >= mid (or <= mid) are also feasible.\n2. Define the Search Space:\n   - What is `low` (minimum possible answer)?\n   - What is `high` (maximum theoretical answer)?\n3. Design the Feasibility Function `isValid(candidate, ...)`:\n   - What does it calculate?\n   - What is its Time Complexity (must be O(N))?\n4. Write the Binary Search boundary template:\n   - Prevent infinite loops: `while (low <= high)` vs `while (low < high)`.\n   - Middle element overflow protection: `mid = low + (high - low) / 2`.\n   - Update rules: `high = mid - 1` vs `low = mid + 1`.\n5. Provide complete code in {{LANGUAGE}} with O(N * log(Range)) complexity derivation.\n\nExpected Output Format:\n1. Monotonicity Proof\n2. Search Bounds (Low, High)\n3. Feasibility Function Logic\n4. Robust Binary Search Implementation\n5. Complexity Proof",
    "tags": [
      "dsa",
      "binary-search",
      "binary-search-on-answer",
      "predicate",
      "competitive-programming"
    ],
    "difficulty": "Advanced",
    "useCase": "Competitive Programming",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{LANGUAGE}}"
    ],
    "expectedOutput": "Monotonicity proof + search bounds + isValid predicate + complete binary search code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-tree-traversal-mastery",
    "title": "Binary Tree & BST: Iterative Traversal & Invariants",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Designs recursion-safe, iterative tree solutions (BFS Level Order, DFS Pre/In/Post Order, LCA, BST Validation).",
    "prompt": "Act as an Algorithms Specialist. Formulate the optimal tree traversal or BST validation solution for this problem.\n\nProblem Details:\n{{PROBLEM_DETAILS}}\n\nTasks:\n1. Traversal Strategy: Iterative BFS (Queue) vs Iterative DFS (Stack) vs Recursive.\n2. For BST problems: Formulate the range invariant `(min_val < node.val < max_val)` to prevent false positives with local checks.\n3. Base Cases & Null Pointers: Guarantee zero segmentation faults or null reference errors on empty trees or single leaves.\n4. If BFS level-order: How is the level boundary maintained (e.g. `int levelSize = queue.size()` snapshot)?\n5. Provide production code in {{LANGUAGE}} with Time O(N) and Auxiliary Space O(H) (height of tree).\n\nExpected Output Format:\n1. Strategy Rationale & Invariant\n2. Stack/Queue State Lifecycle\n3. Complete Implementation Code\n4. Edge Case Validation (Skewed Tree, Empty Root)",
    "promptText": "Act as an Algorithms Specialist. Formulate the optimal tree traversal or BST validation solution for this problem.\n\nProblem Details:\n{{PROBLEM_DETAILS}}\n\nTasks:\n1. Traversal Strategy: Iterative BFS (Queue) vs Iterative DFS (Stack) vs Recursive.\n2. For BST problems: Formulate the range invariant `(min_val < node.val < max_val)` to prevent false positives with local checks.\n3. Base Cases & Null Pointers: Guarantee zero segmentation faults or null reference errors on empty trees or single leaves.\n4. If BFS level-order: How is the level boundary maintained (e.g. `int levelSize = queue.size()` snapshot)?\n5. Provide production code in {{LANGUAGE}} with Time O(N) and Auxiliary Space O(H) (height of tree).\n\nExpected Output Format:\n1. Strategy Rationale & Invariant\n2. Stack/Queue State Lifecycle\n3. Complete Implementation Code\n4. Edge Case Validation (Skewed Tree, Empty Root)",
    "tags": [
      "dsa",
      "trees",
      "bst",
      "bfs",
      "dfs",
      "level-order"
    ],
    "difficulty": "Intermediate",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DETAILS}}",
      "{{LANGUAGE}}"
    ],
    "expectedOutput": "Traversal strategy + BST range invariants + iterative queue/stack code + complexity",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-graph-bfs-dfs-dijkstra",
    "title": "Graph Traversal & Shortest Path: BFS, DFS, TopoSort, Dijkstra",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Selects the right graph algorithm (BFS for unweighted, Dijkstra for weighted, Kahn for DAG cycle/topo, DFS for components).",
    "prompt": "Act as a Graph Theory and Algorithms Specialist. Formulate the optimal graph solution for the following problem.\n\nProblem Statement & Graph Type:\n{{PROBLEM_STATEMENT}}\n\nTasks:\n1. Graph Modeling:\n   - Directed vs Undirected, Weighted vs Unweighted, Cyclic vs DAG.\n   - Adjacency List representation structure.\n2. Algorithm Selection & Justification:\n   - Unweighted shortest path -> BFS O(V + E)\n   - Weighted non-negative shortest path -> Dijkstra with Min-Heap O((V + E) log V)\n   - Dependency ordering / cycle detection -> Kahn's In-Degree BFS or DFS coloring\n   - Connected components / islands -> DFS / BFS / Disjoint Set Union (Union-Find)\n3. Visited state management: Avoid infinite cycles in cyclic graphs.\n4. Provide complete, clean implementation in {{LANGUAGE}}.\n5. Trace on a disconnected or cyclic edge case.\n\nExpected Output Format:\n1. Graph Classification & Adjacency Representation\n2. Algorithm Selection Justification\n3. Complete Implementation Code\n4. Visited / Cycle Detection Mechanics\n5. Time O(V + E) & Space O(V + E) Proof",
    "promptText": "Act as a Graph Theory and Algorithms Specialist. Formulate the optimal graph solution for the following problem.\n\nProblem Statement & Graph Type:\n{{PROBLEM_STATEMENT}}\n\nTasks:\n1. Graph Modeling:\n   - Directed vs Undirected, Weighted vs Unweighted, Cyclic vs DAG.\n   - Adjacency List representation structure.\n2. Algorithm Selection & Justification:\n   - Unweighted shortest path -> BFS O(V + E)\n   - Weighted non-negative shortest path -> Dijkstra with Min-Heap O((V + E) log V)\n   - Dependency ordering / cycle detection -> Kahn's In-Degree BFS or DFS coloring\n   - Connected components / islands -> DFS / BFS / Disjoint Set Union (Union-Find)\n3. Visited state management: Avoid infinite cycles in cyclic graphs.\n4. Provide complete, clean implementation in {{LANGUAGE}}.\n5. Trace on a disconnected or cyclic edge case.\n\nExpected Output Format:\n1. Graph Classification & Adjacency Representation\n2. Algorithm Selection Justification\n3. Complete Implementation Code\n4. Visited / Cycle Detection Mechanics\n5. Time O(V + E) & Space O(V + E) Proof",
    "tags": [
      "dsa",
      "graphs",
      "bfs",
      "dfs",
      "dijkstra",
      "topological-sort"
    ],
    "difficulty": "Advanced",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_STATEMENT}}",
      "{{LANGUAGE}}"
    ],
    "expectedOutput": "Graph classification + algorithm justification + adjacency list code + cycle handling",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-backtracking-template",
    "title": "Backtracking & Pruning Template: Subsets, Permutations & Combinations",
    "category": "DSA & Interview",
    "subcategory": "DSA Practice",
    "description": "Systematic backtracking framework with decision trees, state rollbacks, and branch pruning for subsets and permutations.",
    "prompt": "Act as a Senior Algorithms Tutor. Formulate a structured Backtracking solution with optimal branch pruning for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Visualize the Decision Tree:\n   - What represents a Decision at depth D?\n   - What are the Choices available at this node?\n   - What are the Constraints / Pruning conditions that allow discarding an entire branch early?\n2. Backtracking Template Application:\n   - Choose: Modify path state.\n   - Explore: Recursive call to depth + 1.\n   - Unchoose: Rollback state (pop from path / restore boolean visited flag).\n3. Deduplication Strategy: If input has duplicates, how do we sort and skip identical elements at the same tree depth?\n4. Base Case: When is a valid combination added to the global result?\n5. Complete, well-structured code in {{LANGUAGE}} with complexity derivation.\n\nExpected Output Format:\n1. Decision Tree & Choice Space\n2. Pruning Condition Formulation\n3. Deduplication Invariant\n4. Complete Backtracking Implementation Code\n5. State Rollback Walkthrough",
    "promptText": "Act as a Senior Algorithms Tutor. Formulate a structured Backtracking solution with optimal branch pruning for this problem.\n\nProblem Description:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Visualize the Decision Tree:\n   - What represents a Decision at depth D?\n   - What are the Choices available at this node?\n   - What are the Constraints / Pruning conditions that allow discarding an entire branch early?\n2. Backtracking Template Application:\n   - Choose: Modify path state.\n   - Explore: Recursive call to depth + 1.\n   - Unchoose: Rollback state (pop from path / restore boolean visited flag).\n3. Deduplication Strategy: If input has duplicates, how do we sort and skip identical elements at the same tree depth?\n4. Base Case: When is a valid combination added to the global result?\n5. Complete, well-structured code in {{LANGUAGE}} with complexity derivation.\n\nExpected Output Format:\n1. Decision Tree & Choice Space\n2. Pruning Condition Formulation\n3. Deduplication Invariant\n4. Complete Backtracking Implementation Code\n5. State Rollback Walkthrough",
    "tags": [
      "dsa",
      "backtracking",
      "recursion",
      "pruning",
      "permutations",
      "subsets"
    ],
    "difficulty": "Intermediate",
    "useCase": "DSA Practice",
    "variables": [
      "{{PROBLEM_DESCRIPTION}}",
      "{{LANGUAGE}}"
    ],
    "expectedOutput": "Decision tree analysis + pruning rules + deduplication skip + complete backtracking code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "dsa-mock-technical-interview",
    "title": "FAANG Mock Coding Interviewer Simulation",
    "category": "DSA & Interview",
    "subcategory": "Interview Questions",
    "description": "Simulates a real 45-minute FAANG technical interview: presents problem, probes thought process, gives hints, and evaluates communication.",
    "prompt": "Act as a Staff Software Engineer at Google conducting a 45-minute technical coding interview.\n\nProblem for Today's Session:\n{{PROBLEM_NAME_OR_TOPIC}}\n\nRules of Engagement:\n1. Start by presenting the problem statement clearly with input constraints and a small example.\n2. Ask me how I plan to approach the problem before writing any code. Wait for my response.\n3. When I share my approach:\n   - If it's brute-force, validate it and politely ask: \"Can we do better in time or space?\"\n   - If I'm stuck, provide a subtle Level 1 concept hint.\n   - Do NOT write the code for me.\n4. When I provide code:\n   - Review my code for readability, edge cases, and off-by-one errors.\n   - Ask me to walk through a test case manually.\n   - Ask me to state and prove the Time and Space complexity.\n5. Conclude with a constructive scoring rubric:\n   - Problem Solving & Intuition (1-5)\n   - Code Quality & Cleanliness (1-5)\n   - Communication & Thought Process (1-5)\n   - Verification & Edge Cases (1-5)\n\nBegin now by welcoming me to the interview and presenting the problem.",
    "promptText": "Act as a Staff Software Engineer at Google conducting a 45-minute technical coding interview.\n\nProblem for Today's Session:\n{{PROBLEM_NAME_OR_TOPIC}}\n\nRules of Engagement:\n1. Start by presenting the problem statement clearly with input constraints and a small example.\n2. Ask me how I plan to approach the problem before writing any code. Wait for my response.\n3. When I share my approach:\n   - If it's brute-force, validate it and politely ask: \"Can we do better in time or space?\"\n   - If I'm stuck, provide a subtle Level 1 concept hint.\n   - Do NOT write the code for me.\n4. When I provide code:\n   - Review my code for readability, edge cases, and off-by-one errors.\n   - Ask me to walk through a test case manually.\n   - Ask me to state and prove the Time and Space complexity.\n5. Conclude with a constructive scoring rubric:\n   - Problem Solving & Intuition (1-5)\n   - Code Quality & Cleanliness (1-5)\n   - Communication & Thought Process (1-5)\n   - Verification & Edge Cases (1-5)\n\nBegin now by welcoming me to the interview and presenting the problem.",
    "tags": [
      "mock-interview",
      "faang",
      "google",
      "interview-prep",
      "dsa",
      "coding-interview"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{PROBLEM_NAME_OR_TOPIC}}"
    ],
    "expectedOutput": "Interactive interview simulation: problem presentation + probing questions + scoring rubric",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-event-loop-analyzer",
    "title": "JavaScript Event Loop & Microtask/Macrotask Execution Order",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Explains the exact execution order between Call Stack, Promise microtasks, queueMicrotask, setTimeout, and requestAnimationFrame.",
    "prompt": "Act as a V8 JavaScript Engine Specialist and Senior Web Architect. Analyze the following code snippet and explain the exact runtime execution sequence.\n\nCode Snippet:\n{{CODE}}\n\nTasks:\n1. Predict the exact console output order with zero ambiguity.\n2. Step-by-step breakdown:\n   - Call Stack synchronous execution.\n   - Microtask Queue (Promises, queueMicrotask, MutationObserver).\n   - Task/Macrotask Queue (setTimeout, setInterval, setImmediate, I/O).\n   - Render / Animation frame timing (requestAnimationFrame).\n3. Explain WHY microtasks are prioritized over macrotasks after the call stack clears.\n4. Highlight any potential starvation risks (e.g. infinite microtask recursion blocking the UI).\n\nExpected Output Format:\n1. Exact Console Output Sequence\n2. Step-by-Step Call Stack & Queue Trace\n3. V8 Event Loop Mechanics Explanation\n4. Common Misconceptions & Gotchas",
    "promptText": "Act as a V8 JavaScript Engine Specialist and Senior Web Architect. Analyze the following code snippet and explain the exact runtime execution sequence.\n\nCode Snippet:\n{{CODE}}\n\nTasks:\n1. Predict the exact console output order with zero ambiguity.\n2. Step-by-step breakdown:\n   - Call Stack synchronous execution.\n   - Microtask Queue (Promises, queueMicrotask, MutationObserver).\n   - Task/Macrotask Queue (setTimeout, setInterval, setImmediate, I/O).\n   - Render / Animation frame timing (requestAnimationFrame).\n3. Explain WHY microtasks are prioritized over macrotasks after the call stack clears.\n4. Highlight any potential starvation risks (e.g. infinite microtask recursion blocking the UI).\n\nExpected Output Format:\n1. Exact Console Output Sequence\n2. Step-by-Step Call Stack & Queue Trace\n3. V8 Event Loop Mechanics Explanation\n4. Common Misconceptions & Gotchas",
    "tags": [
      "javascript",
      "event-loop",
      "microtasks",
      "macrotasks",
      "v8",
      "async"
    ],
    "difficulty": "Intermediate",
    "useCase": "Learning & Explanation",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Exact output sequence + queue trace table + V8 event loop mechanics explanation",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-async-await-race-condition",
    "title": "Async/Await Race Condition & Stale Response Elimination",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Eliminates out-of-order API response bugs where slower early requests overwrite newer user requests.",
    "prompt": "Act as a Staff Frontend Engineer. I have an asynchronous function where rapid user triggers cause race conditions (e.g. searching, tab switching, or filtering).\n\nProblematic Code:\n{{CODE}}\n\nSymptoms / Bug:\n{{BUG_SYMPTOM}}\n\nTasks:\n1. Diagnose why out-of-order network responses overwrite newer user state.\n2. Provide 3 distinct production solutions:\n   - Solution A: AbortController cancellation of previous in-flight requests.\n   - Solution B: Monotonically increasing request ID / sequence counter check.\n   - Solution C: Debounced trigger with cancellation.\n3. Compare the trade-offs of all 3 approaches (network bandwidth vs UI complexity).\n4. Provide the complete refactored implementation using the best approach for this scenario.\n\nExpected Output Format:\n1. Race Condition Root Cause Trace\n2. 3 Solution Patterns Comparison\n3. Refactored Production Code\n4. Automated Test Case Simulating Out-of-Order Responses",
    "promptText": "Act as a Staff Frontend Engineer. I have an asynchronous function where rapid user triggers cause race conditions (e.g. searching, tab switching, or filtering).\n\nProblematic Code:\n{{CODE}}\n\nSymptoms / Bug:\n{{BUG_SYMPTOM}}\n\nTasks:\n1. Diagnose why out-of-order network responses overwrite newer user state.\n2. Provide 3 distinct production solutions:\n   - Solution A: AbortController cancellation of previous in-flight requests.\n   - Solution B: Monotonically increasing request ID / sequence counter check.\n   - Solution C: Debounced trigger with cancellation.\n3. Compare the trade-offs of all 3 approaches (network bandwidth vs UI complexity).\n4. Provide the complete refactored implementation using the best approach for this scenario.\n\nExpected Output Format:\n1. Race Condition Root Cause Trace\n2. 3 Solution Patterns Comparison\n3. Refactored Production Code\n4. Automated Test Case Simulating Out-of-Order Responses",
    "tags": [
      "javascript",
      "async",
      "race-condition",
      "abort-controller",
      "promises"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{BUG_SYMPTOM}}"
    ],
    "expectedOutput": "Race condition diagnostic + 3 solution patterns + production code + test simulation",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-memory-leak-detector",
    "title": "JavaScript Memory Leak & Retained Object Analyzer",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Pinpoints memory leaks caused by lingering event listeners, detached DOM nodes, closures holding parent scopes, and global caches.",
    "prompt": "Act as a Senior Chrome DevTools & Memory Profiling Expert. Analyze the following JavaScript code for memory leaks and uncontrolled heap growth.\n\nSuspect Code / Component:\n{{CODE}}\n\nObserved Behavior:\n{{MEMORY_GROWTH_SYMPTOM}}\n\nTasks:\n1. Identify all retained object paths preventing Garbage Collection:\n   - Forgotten event listeners / observers (ResizeObserver, MutationObserver).\n   - Accidental global variables.\n   - Closures enclosing large parent scope references.\n   - Detached DOM elements kept in JavaScript array/object references.\n   - Uncleared intervals and timeouts.\n2. Explain the V8 Garbage Collector (Mark & Sweep / Orinoco) mechanics causing the leak.\n3. Rewrite the code with explicit cleanup lifecycles, WeakMap/WeakSet where applicable, and teardown routines.\n4. Provide step-by-step Chrome DevTools Memory Heap Snapshot inspection steps to verify the fix.\n\nExpected Output Format:\n1. Leaking Reference Identification\n2. V8 Retainer Tree Analysis\n3. Remediated Code with Teardown Hooks\n4. Heap Snapshot Verification Guide",
    "promptText": "Act as a Senior Chrome DevTools & Memory Profiling Expert. Analyze the following JavaScript code for memory leaks and uncontrolled heap growth.\n\nSuspect Code / Component:\n{{CODE}}\n\nObserved Behavior:\n{{MEMORY_GROWTH_SYMPTOM}}\n\nTasks:\n1. Identify all retained object paths preventing Garbage Collection:\n   - Forgotten event listeners / observers (ResizeObserver, MutationObserver).\n   - Accidental global variables.\n   - Closures enclosing large parent scope references.\n   - Detached DOM elements kept in JavaScript array/object references.\n   - Uncleared intervals and timeouts.\n2. Explain the V8 Garbage Collector (Mark & Sweep / Orinoco) mechanics causing the leak.\n3. Rewrite the code with explicit cleanup lifecycles, WeakMap/WeakSet where applicable, and teardown routines.\n4. Provide step-by-step Chrome DevTools Memory Heap Snapshot inspection steps to verify the fix.\n\nExpected Output Format:\n1. Leaking Reference Identification\n2. V8 Retainer Tree Analysis\n3. Remediated Code with Teardown Hooks\n4. Heap Snapshot Verification Guide",
    "tags": [
      "javascript",
      "memory-leak",
      "garbage-collection",
      "performance",
      "devtools"
    ],
    "difficulty": "Advanced",
    "useCase": "Performance Optimization",
    "variables": [
      "{{CODE}}",
      "{{MEMORY_GROWTH_SYMPTOM}}"
    ],
    "expectedOutput": "Retained path analysis + GC mechanics + remediated code + heap snapshot verification",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-closures-stale-state",
    "title": "Closures, Lexical Scope & Stale State Diagnostic",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Diagnoses why asynchronous callbacks or event handlers capture old variable snapshots instead of live state.",
    "prompt": "Act as a JavaScript Core Architect. I am encountering a stale closure bug where my callback references obsolete data.\n\nCode:\n{{CODE}}\n\nCurrent Behavior vs Expected:\n{{BEHAVIOR}}\n\nTasks:\n1. Explain the lexical scope and closure creation mechanics at the exact moment the function was instantiated.\n2. Why is the captured variable frozen in time despite subsequent updates in the outer scope?\n3. Provide the idiomatic solution:\n   - For Vanilla JS: Using mutable ref wrappers or parameter passing.\n   - For React (if applicable): Using useRef or functional state updater (prev => ...).\n4. Provide the corrected code with before-and-after comparison.\n5. Create a minimal reproduction illustrating the fix.\n\nExpected Output Format:\n1. Lexical Scope Breakdown\n2. Stale Closure Root Cause\n3. Before vs After Code Comparison\n4. Production-Ready Fix",
    "promptText": "Act as a JavaScript Core Architect. I am encountering a stale closure bug where my callback references obsolete data.\n\nCode:\n{{CODE}}\n\nCurrent Behavior vs Expected:\n{{BEHAVIOR}}\n\nTasks:\n1. Explain the lexical scope and closure creation mechanics at the exact moment the function was instantiated.\n2. Why is the captured variable frozen in time despite subsequent updates in the outer scope?\n3. Provide the idiomatic solution:\n   - For Vanilla JS: Using mutable ref wrappers or parameter passing.\n   - For React (if applicable): Using useRef or functional state updater (prev => ...).\n4. Provide the corrected code with before-and-after comparison.\n5. Create a minimal reproduction illustrating the fix.\n\nExpected Output Format:\n1. Lexical Scope Breakdown\n2. Stale Closure Root Cause\n3. Before vs After Code Comparison\n4. Production-Ready Fix",
    "tags": [
      "javascript",
      "closures",
      "lexical-scope",
      "stale-state",
      "react"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{BEHAVIOR}}"
    ],
    "expectedOutput": "Lexical scope analysis + stale closure root cause + before/after code + production fix",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-this-binding-context",
    "title": "`this` Binding Context & Arrow Function Mechanics",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Resolves unexpected `undefined` or global window `this` bindings across class methods, callbacks, and DOM listeners.",
    "prompt": "Act as a JavaScript Language Specialist. Diagnose and fix the broken `this` context binding in the following code.\n\nCode:\n{{CODE}}\n\nError / Symptom:\n{{ERROR_SYMPTOM}}\n\nTasks:\n1. Trace the 4 rules of JavaScript `this` binding (Default, Implicit, Explicit call/apply/bind, and new keyword) on this code.\n2. Explain why the execution context lost its receiver (e.g. passing method as callback detaches receiver).\n3. Compare 3 ways to fix it:\n   - Explicit `.bind(this)` in constructor.\n   - Class field arrow functions (lexical `this`).\n   - Wrapping call in inline arrow function.\n4. Explain performance and memory implications of arrow methods on prototypes vs instance properties.\n5. Provide the recommended corrected implementation.\n\nExpected Output Format:\n1. Context Loss Diagnosis\n2. 4-Rule Binding Evaluation\n3. Prototype vs Instance Trade-offs\n4. Corrected Implementation Code",
    "promptText": "Act as a JavaScript Language Specialist. Diagnose and fix the broken `this` context binding in the following code.\n\nCode:\n{{CODE}}\n\nError / Symptom:\n{{ERROR_SYMPTOM}}\n\nTasks:\n1. Trace the 4 rules of JavaScript `this` binding (Default, Implicit, Explicit call/apply/bind, and new keyword) on this code.\n2. Explain why the execution context lost its receiver (e.g. passing method as callback detaches receiver).\n3. Compare 3 ways to fix it:\n   - Explicit `.bind(this)` in constructor.\n   - Class field arrow functions (lexical `this`).\n   - Wrapping call in inline arrow function.\n4. Explain performance and memory implications of arrow methods on prototypes vs instance properties.\n5. Provide the recommended corrected implementation.\n\nExpected Output Format:\n1. Context Loss Diagnosis\n2. 4-Rule Binding Evaluation\n3. Prototype vs Instance Trade-offs\n4. Corrected Implementation Code",
    "tags": [
      "javascript",
      "this-binding",
      "arrow-functions",
      "context",
      "oop"
    ],
    "difficulty": "Easy",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{ERROR_SYMPTOM}}"
    ],
    "expectedOutput": "Context loss diagnostic + 4-rule evaluation + prototype trade-offs + corrected code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-prototype-inheritance-classes",
    "title": "Prototypes, Prototype Chain & ES6 Class Transpilation",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Explains prototype delegation, __proto__, Object.create, and what ES6 `class`, `super`, and `extends` do under the hood.",
    "prompt": "Act as an ECMAScript Standards Committee Contributor. Explain the prototypal inheritance model and resolve the prototype bug in this code.\n\nCode:\n{{CODE}}\n\nObjective:\n{{OBJECTIVE}}\n\nTasks:\n1. Diagram the Prototype Chain for the given objects/classes up to Object.prototype.\n2. Explain property lookup delegation: what happens when a property is read vs written.\n3. Compare ES6 `class` syntax with classical functional prototypes:\n   - What does `extends` and `super()` compile into in ES5?\n   - How does `Object.setPrototypeOf` or `Object.create` establish the chain?\n4. Fix any broken prototype linkages, constructor shadowing, or shared reference mutations.\n5. Provide clean, modern code implementing the desired inheritance model.\n\nExpected Output Format:\n1. ASCII Prototype Chain Diagram\n2. Delegation Lookup Trace\n3. Corrected Modern Implementation\n4. ES5 Transpilation Insight",
    "promptText": "Act as an ECMAScript Standards Committee Contributor. Explain the prototypal inheritance model and resolve the prototype bug in this code.\n\nCode:\n{{CODE}}\n\nObjective:\n{{OBJECTIVE}}\n\nTasks:\n1. Diagram the Prototype Chain for the given objects/classes up to Object.prototype.\n2. Explain property lookup delegation: what happens when a property is read vs written.\n3. Compare ES6 `class` syntax with classical functional prototypes:\n   - What does `extends` and `super()` compile into in ES5?\n   - How does `Object.setPrototypeOf` or `Object.create` establish the chain?\n4. Fix any broken prototype linkages, constructor shadowing, or shared reference mutations.\n5. Provide clean, modern code implementing the desired inheritance model.\n\nExpected Output Format:\n1. ASCII Prototype Chain Diagram\n2. Delegation Lookup Trace\n3. Corrected Modern Implementation\n4. ES5 Transpilation Insight",
    "tags": [
      "javascript",
      "prototypes",
      "inheritance",
      "classes",
      "es6"
    ],
    "difficulty": "Intermediate",
    "useCase": "Learning & Explanation",
    "variables": [
      "{{CODE}}",
      "{{OBJECTIVE}}"
    ],
    "expectedOutput": "Prototype chain diagram + lookup delegation mechanics + corrected code + transpilation notes",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-event-delegation-bugs",
    "title": "DOM Event Delegation with closest() & Dynamic Elements",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Fixes event delegation issues where clicking nested SVGs or child spans inside dynamic buttons fails matching logic.",
    "prompt": "Act as a Senior Frontend DOM Engineer. Fix the broken event delegation implementation in this code.\n\nDOM Structure & Event Handler:\n{{CODE}}\n\nFailing Interaction:\n{{FAILING_INTERACTION}}\n\nTasks:\n1. Explain Event Bubbling and Capturing phases.\n2. Diagnose why `event.target.matches()` or `event.target.id` fails when clicking inner text, spans, or SVGs inside the button.\n3. Rewrite the handler using `event.target.closest(selector)` with container boundary checks (`container.contains()`).\n4. Ensure dynamic elements added asynchronously via fetch are handled seamlessly without re-attaching listeners.\n5. Provide complete, bulletproof vanilla JavaScript code.\n\nExpected Output Format:\n1. Bubbling & Target Mismatch Diagnostic\n2. Idiomatic `closest()` Pattern Implementation\n3. Edge Case Handling (Clicks on borders, nested icons)\n4. Full Executable Script",
    "promptText": "Act as a Senior Frontend DOM Engineer. Fix the broken event delegation implementation in this code.\n\nDOM Structure & Event Handler:\n{{CODE}}\n\nFailing Interaction:\n{{FAILING_INTERACTION}}\n\nTasks:\n1. Explain Event Bubbling and Capturing phases.\n2. Diagnose why `event.target.matches()` or `event.target.id` fails when clicking inner text, spans, or SVGs inside the button.\n3. Rewrite the handler using `event.target.closest(selector)` with container boundary checks (`container.contains()`).\n4. Ensure dynamic elements added asynchronously via fetch are handled seamlessly without re-attaching listeners.\n5. Provide complete, bulletproof vanilla JavaScript code.\n\nExpected Output Format:\n1. Bubbling & Target Mismatch Diagnostic\n2. Idiomatic `closest()` Pattern Implementation\n3. Edge Case Handling (Clicks on borders, nested icons)\n4. Full Executable Script",
    "tags": [
      "javascript",
      "dom",
      "event-delegation",
      "closest",
      "events"
    ],
    "difficulty": "Easy",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{FAILING_INTERACTION}}"
    ],
    "expectedOutput": "Target mismatch diagnostic + closest() pattern code + edge cases + full script",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-fetch-abort-timeout-retry",
    "title": "Resilient Fetch API: AbortController, Timeout & Exponential Backoff",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Builds an enterprise-ready HTTP wrapper with automated timeout cancellation, exponential backoff jitter, and HTTP error parsing.",
    "prompt": "Act as a Principal Web Architect. Build a bulletproof, production-grade HTTP client wrapper around the native `fetch` API.\n\nRequirements & Needs:\n{{REQUIREMENTS}}\n\nTasks:\n1. Build `async function fetchClient(url, options = {}, timeoutMs = 8000, maxRetries = 3)`.\n2. Features to implement:\n   - Configurable timeout using native `AbortController` (must cancel pending TCP socket).\n   - Retry logic with Exponential Backoff + Jitter for 5xx server errors and network drops (never retry 4xx user errors).\n   - Automatic HTTP error throwing for non-ok status codes (`!response.ok`) with parsed error body.\n   - Clean up timeouts in `finally` blocks to prevent memory leaks in Node/browsers.\n   - Support for custom request cancellation from the outside caller.\n3. Provide unit tests with mocked `fetch` verifying: timeout trigger, retry succession, and 400 rejection.\n\nExpected Output Format:\n1. Production HTTP Client Code\n2. TypeScript Type Definitions\n3. Exponential Backoff Formula Explanation\n4. Mock Unit Tests",
    "promptText": "Act as a Principal Web Architect. Build a bulletproof, production-grade HTTP client wrapper around the native `fetch` API.\n\nRequirements & Needs:\n{{REQUIREMENTS}}\n\nTasks:\n1. Build `async function fetchClient(url, options = {}, timeoutMs = 8000, maxRetries = 3)`.\n2. Features to implement:\n   - Configurable timeout using native `AbortController` (must cancel pending TCP socket).\n   - Retry logic with Exponential Backoff + Jitter for 5xx server errors and network drops (never retry 4xx user errors).\n   - Automatic HTTP error throwing for non-ok status codes (`!response.ok`) with parsed error body.\n   - Clean up timeouts in `finally` blocks to prevent memory leaks in Node/browsers.\n   - Support for custom request cancellation from the outside caller.\n3. Provide unit tests with mocked `fetch` verifying: timeout trigger, retry succession, and 400 rejection.\n\nExpected Output Format:\n1. Production HTTP Client Code\n2. TypeScript Type Definitions\n3. Exponential Backoff Formula Explanation\n4. Mock Unit Tests",
    "tags": [
      "javascript",
      "fetch",
      "abort-controller",
      "retry",
      "exponential-backoff",
      "http"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{REQUIREMENTS}}"
    ],
    "expectedOutput": "Production fetch wrapper + AbortController timeout + exponential backoff + test suite",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-promise-concurrency-all-settled",
    "title": "Promise Concurrency: Promise.all vs allSettled vs Bottleneck Pool",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Architects parallel async batching: prevents fast-fail cascade with allSettled and implements a concurrency-limited worker pool.",
    "prompt": "Act as a Senior Performance Engineer. We need to process a large batch of asynchronous operations concurrently without crashing the server or exhausting browser connection limits.\n\nTask List / API Operation:\n{{OPERATIONS_DESCRIPTION}}\n\nTasks:\n1. Explain why `Promise.all()` is dangerous for batch jobs with potential single-point failures (fast-fail behavior).\n2. Compare `Promise.all()` vs `Promise.allSettled()` with typed results filtering (`fulfilled` vs `rejected`).\n3. Build a Concurrency-Limited Batch Pool:\n   - Takes array of tasks and concurrency limit `limit` (e.g. 5 concurrent requests at a time).\n   - Dynamically pulls the next task as soon as any active task finishes.\n   - Returns all results in original input order.\n4. Add rate-limit delay / throttle between batches.\n5. Provide complete, dependency-free JavaScript code.\n\nExpected Output Format:\n1. Failure Modes Analysis\n2. Concurrency Pool Implementation (`pLimit` equivalent without external dependencies)\n3. Usage Example Processing 100 Tasks with Concurrency of 5\n4. Error Handling & Partial Success Aggregation",
    "promptText": "Act as a Senior Performance Engineer. We need to process a large batch of asynchronous operations concurrently without crashing the server or exhausting browser connection limits.\n\nTask List / API Operation:\n{{OPERATIONS_DESCRIPTION}}\n\nTasks:\n1. Explain why `Promise.all()` is dangerous for batch jobs with potential single-point failures (fast-fail behavior).\n2. Compare `Promise.all()` vs `Promise.allSettled()` with typed results filtering (`fulfilled` vs `rejected`).\n3. Build a Concurrency-Limited Batch Pool:\n   - Takes array of tasks and concurrency limit `limit` (e.g. 5 concurrent requests at a time).\n   - Dynamically pulls the next task as soon as any active task finishes.\n   - Returns all results in original input order.\n4. Add rate-limit delay / throttle between batches.\n5. Provide complete, dependency-free JavaScript code.\n\nExpected Output Format:\n1. Failure Modes Analysis\n2. Concurrency Pool Implementation (`pLimit` equivalent without external dependencies)\n3. Usage Example Processing 100 Tasks with Concurrency of 5\n4. Error Handling & Partial Success Aggregation",
    "tags": [
      "javascript",
      "promises",
      "concurrency",
      "promise-all",
      "rate-limiting"
    ],
    "difficulty": "Advanced",
    "useCase": "Performance Optimization",
    "variables": [
      "{{OPERATIONS_DESCRIPTION}}"
    ],
    "expectedOutput": "Failure modes audit + dependency-free concurrency pool code + usage example + error aggregation",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-object-destructuring-transforms",
    "title": "Modern ES6+ Object Transformations, Destructuring & Invariants",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Mastery over nested destructuring with fallback defaults, property renaming, Object.fromEntries, and immutable state updates.",
    "prompt": "Act as a JavaScript Functional Programming Specialist. Transform and normalize the following complex nested data structure cleanly without mutations.\n\nInput Data Structure:\n{{INPUT_DATA}}\n\nDesired Output Target:\n{{DESIRED_TARGET}}\n\nTasks:\n1. Write an idiomatic transformation pipeline using modern ES6+:\n   - Nested destructuring with aliases and fallback defaults.\n   - Rest/Spread operations (`...rest`) for shallow copies.\n   - `Object.entries()` and `Object.fromEntries()` for dictionary filtering/mapping.\n2. Ensure 100% immutability: original inputs must never be modified.\n3. Handle missing, null, or undefined keys gracefully without throwing `TypeError: Cannot read properties of undefined`.\n4. Provide clean, readable code and explain each transformation step.\n\nExpected Output Format:\n1. Transformation Function Implementation\n2. Step-by-Step Pipeline Explanation\n3. Edge Case Handling (Null inputs, empty objects)\n4. Verification Test Assertion",
    "promptText": "Act as a JavaScript Functional Programming Specialist. Transform and normalize the following complex nested data structure cleanly without mutations.\n\nInput Data Structure:\n{{INPUT_DATA}}\n\nDesired Output Target:\n{{DESIRED_TARGET}}\n\nTasks:\n1. Write an idiomatic transformation pipeline using modern ES6+:\n   - Nested destructuring with aliases and fallback defaults.\n   - Rest/Spread operations (`...rest`) for shallow copies.\n   - `Object.entries()` and `Object.fromEntries()` for dictionary filtering/mapping.\n2. Ensure 100% immutability: original inputs must never be modified.\n3. Handle missing, null, or undefined keys gracefully without throwing `TypeError: Cannot read properties of undefined`.\n4. Provide clean, readable code and explain each transformation step.\n\nExpected Output Format:\n1. Transformation Function Implementation\n2. Step-by-Step Pipeline Explanation\n3. Edge Case Handling (Null inputs, empty objects)\n4. Verification Test Assertion",
    "tags": [
      "javascript",
      "destructuring",
      "objects",
      "immutability",
      "functional-programming"
    ],
    "difficulty": "Easy",
    "useCase": "Code Refactoring",
    "variables": [
      "{{INPUT_DATA}}",
      "{{DESIRED_TARGET}}"
    ],
    "expectedOutput": "Transformation pipeline + immutability guarantee + null safety + verification assertions",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-functional-array-pipelines",
    "title": "Functional Array Pipelines: map, filter, reduce Optimization",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Refactors chained multi-pass array iterations into clean, high-performance single-pass reductions or transducers.",
    "prompt": "Act as a High-Performance JavaScript Engineer. Optimize the following array manipulation pipeline.\n\nCurrent Pipeline Code:\n{{CODE}}\n\nData Volume:\n{{DATA_VOLUME}}\n\nTasks:\n1. Analyze the performance cost of multiple intermediate arrays created by chaining `.filter().map().filter().reduce()`.\n2. Rewrite into an optimal single-pass reduction (`reduce`) or composed loop that visits each item exactly once.\n3. Compare readability vs memory allocation overhead for large datasets (100k+ records).\n4. Preserve pure functional determinism without global side effects.\n5. Provide benchmark metrics comparison.\n\nExpected Output Format:\n1. Intermediate Allocation Audit\n2. Optimized Single-Pass Implementation\n3. Readability vs Performance Trade-Off Breakdown\n4. Benchmarking Snippet (performance.now())",
    "promptText": "Act as a High-Performance JavaScript Engineer. Optimize the following array manipulation pipeline.\n\nCurrent Pipeline Code:\n{{CODE}}\n\nData Volume:\n{{DATA_VOLUME}}\n\nTasks:\n1. Analyze the performance cost of multiple intermediate arrays created by chaining `.filter().map().filter().reduce()`.\n2. Rewrite into an optimal single-pass reduction (`reduce`) or composed loop that visits each item exactly once.\n3. Compare readability vs memory allocation overhead for large datasets (100k+ records).\n4. Preserve pure functional determinism without global side effects.\n5. Provide benchmark metrics comparison.\n\nExpected Output Format:\n1. Intermediate Allocation Audit\n2. Optimized Single-Pass Implementation\n3. Readability vs Performance Trade-Off Breakdown\n4. Benchmarking Snippet (performance.now())",
    "tags": [
      "javascript",
      "arrays",
      "map",
      "filter",
      "reduce",
      "performance"
    ],
    "difficulty": "Intermediate",
    "useCase": "Performance Optimization",
    "variables": [
      "{{CODE}}",
      "{{DATA_VOLUME}}"
    ],
    "expectedOutput": "Intermediate allocation analysis + single-pass reduce code + trade-off breakdown + benchmark",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-dom-layout-thrashing-reflow",
    "title": "DOM Reflow, Repaint & Layout Thrashing Elimination",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Eliminates 60fps frame drops and layout thrashing caused by interleaved DOM reads (offsetHeight) and writes (style.top).",
    "prompt": "Act as a Web Performance Guru. Diagnose and eliminate layout thrashing in this animation / DOM update script.\n\nScript:\n{{CODE}}\n\nTasks:\n1. Identify the Interleaved DOM Reads & Writes (Forced Synchronous Layout):\n   - Highlight properties that invalidate layout (e.g. `offsetWidth`, `scrollTop`, `getBoundingClientRect`).\n2. Explain what the browser render pipeline (Recalculate Style -> Layout -> Paint -> Composite) does on each read/write cycle.\n3. Refactor the code using:\n   - Batching Reads first, then Batching Writes.\n   - `requestAnimationFrame` (rAF) scheduling.\n   - `DocumentFragment` or CSS transforms (transform: translate3d) for GPU-accelerated compositing.\n4. Show before-and-after Performance Timeline traces.\n\nExpected Output Format:\n1. Forced Layout Thrashing Points\n2. Browser Rendering Engine Breakdown\n3. Refactored GPU-Accelerated Implementation\n4. FPS & Performance Verification",
    "promptText": "Act as a Web Performance Guru. Diagnose and eliminate layout thrashing in this animation / DOM update script.\n\nScript:\n{{CODE}}\n\nTasks:\n1. Identify the Interleaved DOM Reads & Writes (Forced Synchronous Layout):\n   - Highlight properties that invalidate layout (e.g. `offsetWidth`, `scrollTop`, `getBoundingClientRect`).\n2. Explain what the browser render pipeline (Recalculate Style -> Layout -> Paint -> Composite) does on each read/write cycle.\n3. Refactor the code using:\n   - Batching Reads first, then Batching Writes.\n   - `requestAnimationFrame` (rAF) scheduling.\n   - `DocumentFragment` or CSS transforms (transform: translate3d) for GPU-accelerated compositing.\n4. Show before-and-after Performance Timeline traces.\n\nExpected Output Format:\n1. Forced Layout Thrashing Points\n2. Browser Rendering Engine Breakdown\n3. Refactored GPU-Accelerated Implementation\n4. FPS & Performance Verification",
    "tags": [
      "javascript",
      "dom",
      "performance",
      "layout-thrashing",
      "reflow",
      "animation"
    ],
    "difficulty": "Advanced",
    "useCase": "Performance Optimization",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Layout thrashing points + browser pipeline mechanics + refactored rAF code + FPS verification",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-deep-clone-circular",
    "title": "Deep Clone with Circular Reference & Special Type Handling",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Builds a robust deep-clone utility handling nested structures, circular loops, Dates, RegExps, Sets, and Maps.",
    "prompt": "Act as a Senior JavaScript Algorithms Engineer. Build a robust deep clone utility.\n\nRequirements & Edge Cases:\n{{EDGE_CASES}}\n\nTasks:\n1. Explain why `JSON.parse(JSON.stringify(obj))` fails catastrophically on Dates, undefined, functions, BigInts, NaN, and Circular References.\n2. Evaluate modern `structuredClone()`: What are its capabilities, browser support, and remaining limitations?\n3. Implement a fallback `deepClone(value, hash = new WeakMap())` that handles:\n   - Primitives and null/undefined.\n   - Circular references using `WeakMap` caching.\n   - Special objects: Date, RegExp, Map, Set.\n   - Prototype and own enumerable property preservation.\n4. Provide comprehensive unit tests proving circular references do not cause infinite recursion stack overflow.\n\nExpected Output Format:\n1. JSON Serialization Flaws Table\n2. structuredClone Assessment\n3. Bulletproof deepClone Implementation\n4. Circular Reference Test Cases",
    "promptText": "Act as a Senior JavaScript Algorithms Engineer. Build a robust deep clone utility.\n\nRequirements & Edge Cases:\n{{EDGE_CASES}}\n\nTasks:\n1. Explain why `JSON.parse(JSON.stringify(obj))` fails catastrophically on Dates, undefined, functions, BigInts, NaN, and Circular References.\n2. Evaluate modern `structuredClone()`: What are its capabilities, browser support, and remaining limitations?\n3. Implement a fallback `deepClone(value, hash = new WeakMap())` that handles:\n   - Primitives and null/undefined.\n   - Circular references using `WeakMap` caching.\n   - Special objects: Date, RegExp, Map, Set.\n   - Prototype and own enumerable property preservation.\n4. Provide comprehensive unit tests proving circular references do not cause infinite recursion stack overflow.\n\nExpected Output Format:\n1. JSON Serialization Flaws Table\n2. structuredClone Assessment\n3. Bulletproof deepClone Implementation\n4. Circular Reference Test Cases",
    "tags": [
      "javascript",
      "deep-clone",
      "circular-reference",
      "weakmap",
      "structured-clone"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Refactoring",
    "variables": [
      "{{EDGE_CASES}}"
    ],
    "expectedOutput": "JSON flaws comparison + structuredClone audit + WeakMap deepClone code + circular tests",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-web-worker-cpu-offload",
    "title": "Web Workers: Offloading Heavy Computations from UI Thread",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Keeps the browser UI responsive at 60fps by offloading heavy data processing or cryptography to a dedicated Web Worker thread.",
    "prompt": "Act as a High-Performance Frontend Architect. Offload the following CPU-intensive task to a Web Worker to prevent UI thread freezing.\n\nHeavy Computation Function:\n{{HEAVY_FUNCTION}}\n\nTasks:\n1. Explain why JavaScript is single-threaded on the main execution thread and how long tasks (>50ms) trigger \"Page Unresponsive\" warnings.\n2. Implement a complete Web Worker solution:\n   - Main thread controller (spawning worker, sending payload via `postMessage`, listening to `onmessage`, error handling).\n   - Worker script (listening to `onmessage`, processing data in background, transferring results).\n   - Support for Transferable Objects (ArrayBuffer) to avoid structured clone serialization overhead.\n   - Promise wrapper: Expose an async function `runWorkerTask(payload): Promise<Result>`.\n3. Worker termination & lifecycle cleanup on component unmount.\n\nExpected Output Format:\n1. Main Thread vs Worker Architecture\n2. Web Worker Script Code (worker.js)\n3. Main Thread Promise Client Wrapper\n4. Transferable Objects Performance Note",
    "promptText": "Act as a High-Performance Frontend Architect. Offload the following CPU-intensive task to a Web Worker to prevent UI thread freezing.\n\nHeavy Computation Function:\n{{HEAVY_FUNCTION}}\n\nTasks:\n1. Explain why JavaScript is single-threaded on the main execution thread and how long tasks (>50ms) trigger \"Page Unresponsive\" warnings.\n2. Implement a complete Web Worker solution:\n   - Main thread controller (spawning worker, sending payload via `postMessage`, listening to `onmessage`, error handling).\n   - Worker script (listening to `onmessage`, processing data in background, transferring results).\n   - Support for Transferable Objects (ArrayBuffer) to avoid structured clone serialization overhead.\n   - Promise wrapper: Expose an async function `runWorkerTask(payload): Promise<Result>`.\n3. Worker termination & lifecycle cleanup on component unmount.\n\nExpected Output Format:\n1. Main Thread vs Worker Architecture\n2. Web Worker Script Code (worker.js)\n3. Main Thread Promise Client Wrapper\n4. Transferable Objects Performance Note",
    "tags": [
      "javascript",
      "web-workers",
      "multithreading",
      "performance",
      "ui-thread"
    ],
    "difficulty": "Advanced",
    "useCase": "Performance Optimization",
    "variables": [
      "{{HEAVY_FUNCTION}}"
    ],
    "expectedOutput": "Worker architecture + worker script + main thread client wrapper + transferable objects pattern",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "js-clean-architecture-modules",
    "title": "Clean JavaScript Architecture: Decoupled Modules & Dependency Injection",
    "category": "Development",
    "subcategory": "JavaScript",
    "description": "Refactors messy spaghetti JavaScript code into clean layers (API, Repository, Service, UI Controller) with Dependency Injection.",
    "prompt": "Act as a Principal Software Architect. Refactor this unstructured JavaScript file into a clean, modular architecture.\n\nCurrent Spaghetti Code:\n{{CODE}}\n\nTasks:\n1. Separate concerns into clean architectural layers:\n   - Data / API Layer (fetching, serialization).\n   - Domain / Service Layer (pure business rules, validation).\n   - Presentation / Controller Layer (DOM event listeners, UI rendering).\n2. Implement Dependency Injection (pass API client to service, pass service to controller) for 100% testability.\n3. Remove all global state and magic strings.\n4. Provide the refactored ES Modules structure with export/import conventions.\n5. Provide a unit test demonstrating how to test the service layer with a mocked API layer.\n\nExpected Output Format:\n1. Architectural Separation Plan\n2. Refactored Modular Code\n3. Dependency Injection Pattern Demonstration\n4. Unit Test with Mocked Dependencies",
    "promptText": "Act as a Principal Software Architect. Refactor this unstructured JavaScript file into a clean, modular architecture.\n\nCurrent Spaghetti Code:\n{{CODE}}\n\nTasks:\n1. Separate concerns into clean architectural layers:\n   - Data / API Layer (fetching, serialization).\n   - Domain / Service Layer (pure business rules, validation).\n   - Presentation / Controller Layer (DOM event listeners, UI rendering).\n2. Implement Dependency Injection (pass API client to service, pass service to controller) for 100% testability.\n3. Remove all global state and magic strings.\n4. Provide the refactored ES Modules structure with export/import conventions.\n5. Provide a unit test demonstrating how to test the service layer with a mocked API layer.\n\nExpected Output Format:\n1. Architectural Separation Plan\n2. Refactored Modular Code\n3. Dependency Injection Pattern Demonstration\n4. Unit Test with Mocked Dependencies",
    "tags": [
      "javascript",
      "clean-code",
      "architecture",
      "dependency-injection",
      "modular"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Refactoring",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Layered architecture plan + refactored modular code + DI pattern + mocked unit test",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-use-effect-dependency-audit",
    "title": "React useEffect Dependency Array & Stale Closure Audit",
    "category": "Development",
    "subcategory": "React",
    "description": "Diagnoses infinite loops, missing dependency warnings (eslint-plugin-react-hooks), and stale state in useEffect.",
    "prompt": "Act as a React Core Specialist. Analyze this useEffect hook that is causing unexpected behavior or ESLint dependency warnings.\n\nComponent Code:\n{{CODE}}\n\nProblem / Symptom:\n{{SYMPTOM}}\n\nTasks:\n1. Explain WHY the missing or extra dependencies cause the bug (e.g. Infinite render loop vs Stale closure referencing initial props/state).\n2. Detail how object and function references change on every render, triggering unwanted effect reruns.\n3. Provide the idiomatic React fix:\n   - Moving functions inside useEffect.\n   - Using functional state updates: `setCount(c => c + 1)` to remove state from dependencies.\n   - Using `useCallback` / `useMemo` appropriately.\n   - Using `useRef` for mutable non-reactive values.\n4. Provide the refactored component code adhering strictly to exhaustive-deps rules.\n\nExpected Output Format:\n1. Dependency Array & Closure Diagnosis\n2. Object Reference Instability Analysis\n3. Refactored Component Code\n4. Verification Steps",
    "promptText": "Act as a React Core Specialist. Analyze this useEffect hook that is causing unexpected behavior or ESLint dependency warnings.\n\nComponent Code:\n{{CODE}}\n\nProblem / Symptom:\n{{SYMPTOM}}\n\nTasks:\n1. Explain WHY the missing or extra dependencies cause the bug (e.g. Infinite render loop vs Stale closure referencing initial props/state).\n2. Detail how object and function references change on every render, triggering unwanted effect reruns.\n3. Provide the idiomatic React fix:\n   - Moving functions inside useEffect.\n   - Using functional state updates: `setCount(c => c + 1)` to remove state from dependencies.\n   - Using `useCallback` / `useMemo` appropriately.\n   - Using `useRef` for mutable non-reactive values.\n4. Provide the refactored component code adhering strictly to exhaustive-deps rules.\n\nExpected Output Format:\n1. Dependency Array & Closure Diagnosis\n2. Object Reference Instability Analysis\n3. Refactored Component Code\n4. Verification Steps",
    "tags": [
      "react",
      "use-effect",
      "hooks",
      "stale-closure",
      "exhaustive-deps"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{SYMPTOM}}"
    ],
    "expectedOutput": "Dependency analysis + reference stability breakdown + refactored code + exhaustive-deps guarantee",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-re-render-optimization",
    "title": "React Re-render Audit: memo, useMemo & useCallback Tuning",
    "category": "Development",
    "subcategory": "React",
    "description": "Eliminates unnecessary component tree re-renders and audits premature or ineffective useMemo/useCallback usage.",
    "prompt": "Act as a Senior React Performance Engineer. Profile and eliminate unnecessary re-renders in the following component hierarchy.\n\nComponent Hierarchy Code:\n{{CODE}}\n\nProfiler Findings:\n{{PROFILER_NOTES}}\n\nTasks:\n1. Identify the Render Trigger: What state or prop change caused the root or child components to re-render?\n2. Audit existing `useMemo` and `useCallback` usages: Are they actually preventing re-renders, or are they overhead that gets broken by inline objects/callbacks?\n3. Apply optimization strategies:\n   - State Colocation: Moving state down to where it is used.\n   - Component Composition: Passing children (`props.children`) to avoid re-rendering heavy subtrees.\n   - `React.memo` with custom comparator where necessary.\n4. Show before-and-after component code.\n5. Provide a test demonstrating that child components remain untouched when unrelated parent state updates.\n\nExpected Output Format:\n1. Render Cascade Root Cause\n2. useMemo/useCallback Effectiveness Audit\n3. Refactored Component Architecture\n4. Re-render Verification Test Case",
    "promptText": "Act as a Senior React Performance Engineer. Profile and eliminate unnecessary re-renders in the following component hierarchy.\n\nComponent Hierarchy Code:\n{{CODE}}\n\nProfiler Findings:\n{{PROFILER_NOTES}}\n\nTasks:\n1. Identify the Render Trigger: What state or prop change caused the root or child components to re-render?\n2. Audit existing `useMemo` and `useCallback` usages: Are they actually preventing re-renders, or are they overhead that gets broken by inline objects/callbacks?\n3. Apply optimization strategies:\n   - State Colocation: Moving state down to where it is used.\n   - Component Composition: Passing children (`props.children`) to avoid re-rendering heavy subtrees.\n   - `React.memo` with custom comparator where necessary.\n4. Show before-and-after component code.\n5. Provide a test demonstrating that child components remain untouched when unrelated parent state updates.\n\nExpected Output Format:\n1. Render Cascade Root Cause\n2. useMemo/useCallback Effectiveness Audit\n3. Refactored Component Architecture\n4. Re-render Verification Test Case",
    "tags": [
      "react",
      "performance",
      "re-renders",
      "memoization",
      "use-callback",
      "use-memo"
    ],
    "difficulty": "Advanced",
    "useCase": "Performance Optimization",
    "variables": [
      "{{CODE}}",
      "{{PROFILER_NOTES}}"
    ],
    "expectedOutput": "Render cascade root cause + memoization audit + refactored component tree + test verification",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-custom-hook-extraction",
    "title": "Custom Hook Extraction & Headless Logic Decoupling",
    "category": "Development",
    "subcategory": "React",
    "description": "Extracts complex stateful logic (fetching, pagination, debounce, window dimensions) into a clean, reusable custom hook.",
    "prompt": "Act as a Senior React Architect. Extract the stateful business logic from this cluttered component into a clean, testable Custom Hook.\n\nCluttered Component Code:\n{{CODE}}\n\nLogic to Extract:\n{{TARGET_LOGIC}}\n\nTasks:\n1. Design the Custom Hook signature: parameters, return value object, and types.\n2. Encapsulate all internal state, effects, and helper callbacks cleanly inside the hook.\n3. Ensure proper cleanup routines on unmount (canceling in-flight requests, removing event listeners).\n4. Refactor the original component to be a lean, presentation-only view consuming the hook.\n5. Provide a unit test for the custom hook using `@testing-library/react-hooks` or `renderHook`.\n\nExpected Output Format:\n1. Custom Hook Implementation (useSomething.ts)\n2. Lean Refactored Component Code\n3. Hook API Contract Documentation\n4. renderHook Unit Test File",
    "promptText": "Act as a Senior React Architect. Extract the stateful business logic from this cluttered component into a clean, testable Custom Hook.\n\nCluttered Component Code:\n{{CODE}}\n\nLogic to Extract:\n{{TARGET_LOGIC}}\n\nTasks:\n1. Design the Custom Hook signature: parameters, return value object, and types.\n2. Encapsulate all internal state, effects, and helper callbacks cleanly inside the hook.\n3. Ensure proper cleanup routines on unmount (canceling in-flight requests, removing event listeners).\n4. Refactor the original component to be a lean, presentation-only view consuming the hook.\n5. Provide a unit test for the custom hook using `@testing-library/react-hooks` or `renderHook`.\n\nExpected Output Format:\n1. Custom Hook Implementation (useSomething.ts)\n2. Lean Refactored Component Code\n3. Hook API Contract Documentation\n4. renderHook Unit Test File",
    "tags": [
      "react",
      "custom-hooks",
      "refactoring",
      "clean-code",
      "headless-ui"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Refactoring",
    "variables": [
      "{{CODE}}",
      "{{TARGET_LOGIC}}"
    ],
    "expectedOutput": "Custom hook file + lean presentation component + hook contract + renderHook test",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-context-vs-zustand-audit",
    "title": "Global State Architecture: React Context vs Zustand / Redux",
    "category": "Development",
    "subcategory": "React",
    "description": "Fixes React Context performance pitfalls where updating one property forces every consumer component to re-render.",
    "prompt": "Act as a React State Management Specialist. Audit our global state architecture and resolve the performance re-render problem.\n\nCurrent Context Implementation:\n{{CODE}}\n\nProblem:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Explain why React Context is NOT a state management tool, but a dependency injection mechanism that invalidates all consumers on value change.\n2. Provide 2 architectural solutions:\n   - Solution A: Splitting Context into StateContext and DispatchContext + memoized selectors.\n   - Solution B: Migrating to a lightweight external atomic store (e.g. Zustand) with fine-grained subscription selectors.\n3. Compare both approaches on bundle size, boilerplate, and re-render performance.\n4. Provide complete code for the recommended solution.\n\nExpected Output Format:\n1. Context Re-render Bottleneck Breakdown\n2. Context Splitting vs External Store Comparison\n3. Refactored State Architecture Code\n4. Consumer Component Selector Usage",
    "promptText": "Act as a React State Management Specialist. Audit our global state architecture and resolve the performance re-render problem.\n\nCurrent Context Implementation:\n{{CODE}}\n\nProblem:\n{{PROBLEM_DESCRIPTION}}\n\nTasks:\n1. Explain why React Context is NOT a state management tool, but a dependency injection mechanism that invalidates all consumers on value change.\n2. Provide 2 architectural solutions:\n   - Solution A: Splitting Context into StateContext and DispatchContext + memoized selectors.\n   - Solution B: Migrating to a lightweight external atomic store (e.g. Zustand) with fine-grained subscription selectors.\n3. Compare both approaches on bundle size, boilerplate, and re-render performance.\n4. Provide complete code for the recommended solution.\n\nExpected Output Format:\n1. Context Re-render Bottleneck Breakdown\n2. Context Splitting vs External Store Comparison\n3. Refactored State Architecture Code\n4. Consumer Component Selector Usage",
    "tags": [
      "react",
      "context-api",
      "state-management",
      "zustand",
      "performance"
    ],
    "difficulty": "Intermediate",
    "useCase": "Architecture Review",
    "variables": [
      "{{CODE}}",
      "{{PROBLEM_DESCRIPTION}}"
    ],
    "expectedOutput": "Context bottleneck analysis + architecture comparison + refactored store code + selector usage",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-form-state-architecture",
    "title": "React Form State: Controlled vs Uncontrolled vs React Hook Form",
    "category": "Development",
    "subcategory": "React",
    "description": "Architects complex multi-step forms with schema validation (Zod), error handling, and minimal re-renders per keystroke.",
    "prompt": "Act as a Senior Frontend Engineer. Design a high-performance, robust form architecture for the following requirements.\n\nForm Requirements & Fields:\n{{FORM_REQUIREMENTS}}\n\nTasks:\n1. Compare Controlled Components vs Uncontrolled Components vs React Hook Form (RHF) for this form complexity.\n2. Implement the form using React Hook Form + Zod resolver schema validation:\n   - Type-safe schema definition with custom validation rules.\n   - Real-time field error feedback without re-rendering the entire form on every keystroke.\n   - Dynamic array fields (e.g. adding/removing item lines).\n   - Async submit handler with loading state and server-side validation error mapping.\n3. Ensure accessible form inputs (aria-invalid, aria-describedby for error labels).\n4. Provide complete, copy-paste ready code with TypeScript types.\n\nExpected Output Format:\n1. Zod Validation Schema\n2. Form Component Implementation\n3. Accessibility & Keyboard Navigation Annotations\n4. Server Error Mapping Pattern",
    "promptText": "Act as a Senior Frontend Engineer. Design a high-performance, robust form architecture for the following requirements.\n\nForm Requirements & Fields:\n{{FORM_REQUIREMENTS}}\n\nTasks:\n1. Compare Controlled Components vs Uncontrolled Components vs React Hook Form (RHF) for this form complexity.\n2. Implement the form using React Hook Form + Zod resolver schema validation:\n   - Type-safe schema definition with custom validation rules.\n   - Real-time field error feedback without re-rendering the entire form on every keystroke.\n   - Dynamic array fields (e.g. adding/removing item lines).\n   - Async submit handler with loading state and server-side validation error mapping.\n3. Ensure accessible form inputs (aria-invalid, aria-describedby for error labels).\n4. Provide complete, copy-paste ready code with TypeScript types.\n\nExpected Output Format:\n1. Zod Validation Schema\n2. Form Component Implementation\n3. Accessibility & Keyboard Navigation Annotations\n4. Server Error Mapping Pattern",
    "tags": [
      "react",
      "forms",
      "react-hook-form",
      "zod",
      "validation",
      "accessibility"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{FORM_REQUIREMENTS}}"
    ],
    "expectedOutput": "Zod schema + React Hook Form component + accessibility annotations + server error mapper",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-error-boundary-suspense",
    "title": "React Error Boundaries, Suspense & Graceful Degradation",
    "category": "Development",
    "subcategory": "React",
    "description": "Builds fault-tolerant component trees with Error Boundaries, Sentry error logging, and Suspense fallback skeletons.",
    "prompt": "Act as a Staff Frontend Reliability Engineer. Implement robust error boundaries and suspense fallbacks for this component tree.\n\nComponent Tree:\n{{CODE}}\n\nTasks:\n1. Explain why JavaScript errors inside component rendering unmount the entire React root if uncaught.\n2. Implement an idiomatic React Error Boundary class component:\n   - `static getDerivedStateFromError` for fallback state.\n   - `componentDidCatch` for external telemetry / error reporting (e.g. Sentry).\n   - \"Try Again\" recovery button that resets boundary state and retries rendering.\n3. Integrate React `Suspense` with a custom skeleton loader for asynchronous child fetching.\n4. Demonstrate where boundaries should be placed (granular widget-level vs global page-level).\n5. Provide complete, production-ready code.\n\nExpected Output Format:\n1. Error Cascade Mechanism Explanation\n2. Reusable ErrorBoundary Component Code\n3. Widget-Level Boundary Placement Pattern\n4. Sentry Telemetry Hookup Example",
    "promptText": "Act as a Staff Frontend Reliability Engineer. Implement robust error boundaries and suspense fallbacks for this component tree.\n\nComponent Tree:\n{{CODE}}\n\nTasks:\n1. Explain why JavaScript errors inside component rendering unmount the entire React root if uncaught.\n2. Implement an idiomatic React Error Boundary class component:\n   - `static getDerivedStateFromError` for fallback state.\n   - `componentDidCatch` for external telemetry / error reporting (e.g. Sentry).\n   - \"Try Again\" recovery button that resets boundary state and retries rendering.\n3. Integrate React `Suspense` with a custom skeleton loader for asynchronous child fetching.\n4. Demonstrate where boundaries should be placed (granular widget-level vs global page-level).\n5. Provide complete, production-ready code.\n\nExpected Output Format:\n1. Error Cascade Mechanism Explanation\n2. Reusable ErrorBoundary Component Code\n3. Widget-Level Boundary Placement Pattern\n4. Sentry Telemetry Hookup Example",
    "tags": [
      "react",
      "error-boundary",
      "suspense",
      "reliability",
      "error-handling"
    ],
    "difficulty": "Intermediate",
    "useCase": "Clean Code",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Error cascade explanation + ErrorBoundary code + granular boundary pattern + telemetry hookup",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-composition-vs-prop-drilling",
    "title": "Component Composition: Eliminating Deep Prop Drilling",
    "category": "Development",
    "subcategory": "React",
    "description": "Refactors deeply nested prop drilling chains into clean component composition using children and compound component patterns.",
    "prompt": "Act as a React Software Design Specialist. Refactor this deeply nested component hierarchy that suffers from severe prop drilling.\n\nCurrent Code Hierarchy:\n{{CODE}}\n\nProp Being Drilled:\n{{DRILLED_PROPS}}\n\nTasks:\n1. Trace the prop drilling chain across intermediate components that do not need the prop themselves.\n2. Refactor using Component Composition (`props.children` / slotted props):\n   - Lift the leaf component instantiation to the parent and pass it down as children.\n   - Or apply the Compound Component Pattern (e.g. `<Card><Card.Header /><Card.Body /></Card>`).\n3. Explain why composition improves performance and simplifies component interfaces.\n4. Provide the clean, refactored component code.\n\nExpected Output Format:\n1. Prop Drilling Coupling Diagnosis\n2. Refactored Compound / Composition Pattern Code\n3. Clean Component Interface Comparison\n4. Unit Testing Simplicity Benefit",
    "promptText": "Act as a React Software Design Specialist. Refactor this deeply nested component hierarchy that suffers from severe prop drilling.\n\nCurrent Code Hierarchy:\n{{CODE}}\n\nProp Being Drilled:\n{{DRILLED_PROPS}}\n\nTasks:\n1. Trace the prop drilling chain across intermediate components that do not need the prop themselves.\n2. Refactor using Component Composition (`props.children` / slotted props):\n   - Lift the leaf component instantiation to the parent and pass it down as children.\n   - Or apply the Compound Component Pattern (e.g. `<Card><Card.Header /><Card.Body /></Card>`).\n3. Explain why composition improves performance and simplifies component interfaces.\n4. Provide the clean, refactored component code.\n\nExpected Output Format:\n1. Prop Drilling Coupling Diagnosis\n2. Refactored Compound / Composition Pattern Code\n3. Clean Component Interface Comparison\n4. Unit Testing Simplicity Benefit",
    "tags": [
      "react",
      "prop-drilling",
      "composition",
      "clean-architecture",
      "compound-components"
    ],
    "difficulty": "Easy",
    "useCase": "Code Refactoring",
    "variables": [
      "{{CODE}}",
      "{{DRILLED_PROPS}}"
    ],
    "expectedOutput": "Prop drilling trace + compound component refactoring + clean interface comparison",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-server-vs-client-components",
    "title": "React Server Components (RSC) vs Client Components Architecture",
    "category": "Development",
    "subcategory": "React",
    "description": "Decouples Next.js / React 19 applications into optimized Server Components (zero bundle size) and Client Components (interactivity).",
    "prompt": "Act as a Next.js and React Server Components Specialist. Review and refactor this component to take full advantage of React Server Components (RSC).\n\nCurrent Component Code:\n{{CODE}}\n\nTasks:\n1. Identify what parts of this component belong on the Server:\n   - Direct database / ORM queries.\n   - Sensitive environment variables and secret tokens.\n   - Large dependencies (markdown parsers, date libraries) that shouldn't inflate client bundle.\n2. Identify what parts require `'use client'`:\n   - Interactive hooks (`useState`, `useEffect`, `useContext`).\n   - Browser APIs (`window`, `localStorage`, `navigator`).\n   - Event handlers (`onClick`, `onChange`).\n3. Refactor into an optimal split: Server Component fetching data + Client Component handling UI interactions.\n4. Ensure zero waterfall fetching and explain the bundle size reduction.\n\nExpected Output Format:\n1. Server vs Client Responsibility Matrix\n2. Server Component Code (Zero bundle footprint)\n3. Client Component Code (Minimal interactivity island)\n4. Bundle Size & Security Audit",
    "promptText": "Act as a Next.js and React Server Components Specialist. Review and refactor this component to take full advantage of React Server Components (RSC).\n\nCurrent Component Code:\n{{CODE}}\n\nTasks:\n1. Identify what parts of this component belong on the Server:\n   - Direct database / ORM queries.\n   - Sensitive environment variables and secret tokens.\n   - Large dependencies (markdown parsers, date libraries) that shouldn't inflate client bundle.\n2. Identify what parts require `'use client'`:\n   - Interactive hooks (`useState`, `useEffect`, `useContext`).\n   - Browser APIs (`window`, `localStorage`, `navigator`).\n   - Event handlers (`onClick`, `onChange`).\n3. Refactor into an optimal split: Server Component fetching data + Client Component handling UI interactions.\n4. Ensure zero waterfall fetching and explain the bundle size reduction.\n\nExpected Output Format:\n1. Server vs Client Responsibility Matrix\n2. Server Component Code (Zero bundle footprint)\n3. Client Component Code (Minimal interactivity island)\n4. Bundle Size & Security Audit",
    "tags": [
      "react",
      "nextjs",
      "rsc",
      "server-components",
      "client-components",
      "performance"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture Review",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "RSC responsibility matrix + Server Component code + Client Component code + bundle audit",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-accessibility-aria-audit",
    "title": "React Accessibility (a11y) & WCAG 2.1 AA Compliance Audit",
    "category": "Development",
    "subcategory": "React",
    "description": "Audits custom React UI components (modals, dropdowns, tabs) for keyboard navigation, focus traps, and screen reader ARIA roles.",
    "prompt": "Act as a Web Accessibility (a11y) and WCAG 2.1 AA Compliance Auditor. Audit and fix accessibility barriers in this custom React component.\n\nCustom Component Code:\n{{CODE}}\n\nComponent Type:\n{{COMPONENT_TYPE}}\n\nTasks:\n1. Audit for WCAG 2.1 AA violations:\n   - Missing keyboard navigation (Tab order, Enter/Space trigger, Escape to close).\n   - Missing or incorrect ARIA roles, states, and properties (`role=\"dialog\"`, `aria-modal`, `aria-expanded`, `aria-labelledby`).\n   - Focus management: Lack of focus trap in modals or failure to restore focus on close.\n   - Color contrast and visible focus indicators (`:focus-visible`).\n2. Rewrite the component with full keyboard accessibility and screen-reader announcements.\n3. Provide an automated testing snippet using `jest-axe` to verify compliance.\n\nExpected Output Format:\n1. WCAG Violation Checklist\n2. Fully Accessible Component Code with Focus Trap\n3. Keyboard Interaction Specification Table\n4. jest-axe Automated Test Case",
    "promptText": "Act as a Web Accessibility (a11y) and WCAG 2.1 AA Compliance Auditor. Audit and fix accessibility barriers in this custom React component.\n\nCustom Component Code:\n{{CODE}}\n\nComponent Type:\n{{COMPONENT_TYPE}}\n\nTasks:\n1. Audit for WCAG 2.1 AA violations:\n   - Missing keyboard navigation (Tab order, Enter/Space trigger, Escape to close).\n   - Missing or incorrect ARIA roles, states, and properties (`role=\"dialog\"`, `aria-modal`, `aria-expanded`, `aria-labelledby`).\n   - Focus management: Lack of focus trap in modals or failure to restore focus on close.\n   - Color contrast and visible focus indicators (`:focus-visible`).\n2. Rewrite the component with full keyboard accessibility and screen-reader announcements.\n3. Provide an automated testing snippet using `jest-axe` to verify compliance.\n\nExpected Output Format:\n1. WCAG Violation Checklist\n2. Fully Accessible Component Code with Focus Trap\n3. Keyboard Interaction Specification Table\n4. jest-axe Automated Test Case",
    "tags": [
      "react",
      "accessibility",
      "a11y",
      "wcag",
      "aria",
      "screen-readers"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Review",
    "variables": [
      "{{CODE}}",
      "{{COMPONENT_TYPE}}"
    ],
    "expectedOutput": "WCAG violation checklist + fully accessible component code + keyboard spec + axe test",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-security-xss-audit",
    "title": "React Frontend Security & XSS Vulnerability Audit",
    "category": "Development",
    "subcategory": "React",
    "description": "Prevents Cross-Site Scripting (XSS) in React: audit dangerouslySetInnerHTML, malicious href javascript: protocols, and untrusted props.",
    "prompt": "Act as a Web Application Security Engineer and Pentester. Audit this React component for Cross-Site Scripting (XSS) and client-side vulnerabilities.\n\nComponent Code:\n{{CODE}}\n\nTasks:\n1. Identify all vectors where untrusted user input enters the DOM:\n   - `dangerouslySetInnerHTML` usage without sanitization.\n   - Links with user-provided URLs: `<a href={userUrl}>` (vulnerable to `javascript:alert(1)`).\n   - Markdown or HTML rendering from external APIs.\n   - Insecure localStorage token handling vs HttpOnly cookies.\n2. Demonstrate how an attacker could exploit these vectors.\n3. Provide the secured remediation:\n   - Integration of DOMPurify for HTML sanitization.\n   - Safe URL protocol validation (whitelist http/https).\n   - Secure external link attributes (`rel=\"noopener noreferrer\"`).\n4. Provide the hardened component code.\n\nExpected Output Format:\n1. Vulnerability & Attack Vector Analysis\n2. Exploitation Proof of Concept\n3. Hardened Production Code\n4. Security Checklist for Pull Requests",
    "promptText": "Act as a Web Application Security Engineer and Pentester. Audit this React component for Cross-Site Scripting (XSS) and client-side vulnerabilities.\n\nComponent Code:\n{{CODE}}\n\nTasks:\n1. Identify all vectors where untrusted user input enters the DOM:\n   - `dangerouslySetInnerHTML` usage without sanitization.\n   - Links with user-provided URLs: `<a href={userUrl}>` (vulnerable to `javascript:alert(1)`).\n   - Markdown or HTML rendering from external APIs.\n   - Insecure localStorage token handling vs HttpOnly cookies.\n2. Demonstrate how an attacker could exploit these vectors.\n3. Provide the secured remediation:\n   - Integration of DOMPurify for HTML sanitization.\n   - Safe URL protocol validation (whitelist http/https).\n   - Secure external link attributes (`rel=\"noopener noreferrer\"`).\n4. Provide the hardened component code.\n\nExpected Output Format:\n1. Vulnerability & Attack Vector Analysis\n2. Exploitation Proof of Concept\n3. Hardened Production Code\n4. Security Checklist for Pull Requests",
    "tags": [
      "react",
      "security",
      "xss",
      "owasp",
      "sanitization",
      "dompurify"
    ],
    "difficulty": "Advanced",
    "useCase": "Security Review",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Vulnerability audit + attack vector POC + hardened DOMPurify code + PR security checklist",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "react-state-normalization-entities",
    "title": "Normalized Entity State Architecture (IDs & Dictionaries)",
    "category": "Development",
    "subcategory": "React",
    "description": "Refactors deeply nested array state into a relational normalized structure (byId, allIds) for O(1) lookups and zero mutation bugs.",
    "prompt": "Act as a Senior Frontend Architecture Specialist. Normalize the following nested state structure to prevent deep cloning and rendering bugs.\n\nCurrent Nested State:\n{{NESTED_STATE}}\n\nTasks:\n1. Explain why deeply nested array state leads to difficult updates, O(N) searches, and accidental reference mutations in React.\n2. Design a Normalized Entity Schema:\n   - Dictionary of entities by ID: `byId: { [id]: Entity }`\n   - Array of IDs for order preservation: `allIds: string[]`\n   - Relational foreign keys for parent-child relations.\n3. Provide CRUD action reducers / helper functions:\n   - `addEntity(item)`\n   - `updateEntity(id, patch)` - O(1) update!\n   - `deleteEntity(id)`\n4. Provide complete, type-safe implementation in TypeScript.\n\nExpected Output Format:\n1. Nested vs Normalized Architecture Comparison\n2. Normalized State Type Definitions\n3. O(1) CRUD Helper Functions\n4. Example Usage in React State Hook",
    "promptText": "Act as a Senior Frontend Architecture Specialist. Normalize the following nested state structure to prevent deep cloning and rendering bugs.\n\nCurrent Nested State:\n{{NESTED_STATE}}\n\nTasks:\n1. Explain why deeply nested array state leads to difficult updates, O(N) searches, and accidental reference mutations in React.\n2. Design a Normalized Entity Schema:\n   - Dictionary of entities by ID: `byId: { [id]: Entity }`\n   - Array of IDs for order preservation: `allIds: string[]`\n   - Relational foreign keys for parent-child relations.\n3. Provide CRUD action reducers / helper functions:\n   - `addEntity(item)`\n   - `updateEntity(id, patch)` - O(1) update!\n   - `deleteEntity(id)`\n4. Provide complete, type-safe implementation in TypeScript.\n\nExpected Output Format:\n1. Nested vs Normalized Architecture Comparison\n2. Normalized State Type Definitions\n3. O(1) CRUD Helper Functions\n4. Example Usage in React State Hook",
    "tags": [
      "react",
      "state-normalization",
      "clean-code",
      "architecture",
      "redux"
    ],
    "difficulty": "Intermediate",
    "useCase": "Architecture Review",
    "variables": [
      "{{NESTED_STATE}}"
    ],
    "expectedOutput": "Nested vs normalized comparison + normalized types + O(1) CRUD helpers + React hook example",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-controller-service-separation",
    "title": "Express REST API: Clean Controller-Service-Repository Architecture",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Refactors bloated Express route files into clean architectural layers: Routers, Controllers, Services, and Repositories.",
    "prompt": "Act as a Staff Backend Engineer. Refactor this cluttered Express.js route handler into a clean, maintainable 3-tier architecture.\n\nCurrent Route Handler:\n{{CODE}}\n\nTasks:\n1. Separate concerns into 3 distinct layers:\n   - Route & Controller Layer: HTTP concerns only (extracting params/body, invoking service, sending HTTP status code 200/201/400).\n   - Service Layer: Pure business logic, authorization checks, and orchestrations (zero `req`/`res` objects).\n   - Repository / Model Layer: Database queries and data persistence.\n2. Ensure asynchronous error handling is clean and bubbles errors to the centralized error middleware.\n3. Provide the refactored files with proper modular exports and imports.\n4. Demonstrate how this separation enables easy unit testing of business logic without mocking Express `req` and `res`.\n\nExpected Output Format:\n1. Architectural Layer Directory Structure\n2. Controller Implementation\n3. Service Implementation (Pure Business Logic)\n4. Route Definition\n5. Unit Test for Service Layer",
    "promptText": "Act as a Staff Backend Engineer. Refactor this cluttered Express.js route handler into a clean, maintainable 3-tier architecture.\n\nCurrent Route Handler:\n{{CODE}}\n\nTasks:\n1. Separate concerns into 3 distinct layers:\n   - Route & Controller Layer: HTTP concerns only (extracting params/body, invoking service, sending HTTP status code 200/201/400).\n   - Service Layer: Pure business logic, authorization checks, and orchestrations (zero `req`/`res` objects).\n   - Repository / Model Layer: Database queries and data persistence.\n2. Ensure asynchronous error handling is clean and bubbles errors to the centralized error middleware.\n3. Provide the refactored files with proper modular exports and imports.\n4. Demonstrate how this separation enables easy unit testing of business logic without mocking Express `req` and `res`.\n\nExpected Output Format:\n1. Architectural Layer Directory Structure\n2. Controller Implementation\n3. Service Implementation (Pure Business Logic)\n4. Route Definition\n5. Unit Test for Service Layer",
    "tags": [
      "nodejs",
      "express",
      "rest-api",
      "clean-architecture",
      "backend"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Refactoring",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Layer directory structure + Controller + Service + Route + Unit test",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-global-error-middleware",
    "title": "Express Centralized Error Handling & AppError Hierarchy",
    "category": "Development",
    "subcategory": "Express.js",
    "description": "Builds an enterprise error handling pipeline: custom AppError class, async wrapper (express-async-errors), and production error masking.",
    "prompt": "Act as a Principal Backend Architect. Build an enterprise-grade error handling system for an Express.js production API.\n\nCurrent Error Handling (or lack thereof):\n{{CURRENT_ERROR_SETUP}}\n\nTasks:\n1. Design a custom `AppError` class extending native `Error`:\n   - `statusCode` (e.g. 400, 401, 403, 404, 500).\n   - `status` ('fail' for 4xx, 'error' for 5xx).\n   - `isOperational` flag (distinguishing expected operational errors from unknown programmer bugs).\n2. Create an `asyncHandler` wrapper or configure async error handling so unhandled promise rejections don't hang requests or crash the process.\n3. Build the 4-argument Global Error Middleware `(err, req, res, next)`:\n   - Development Mode: Return full error stack trace, original error object, and details.\n   - Production Mode: Mask unhandled 500 errors (\"Something went wrong\") while safely returning operational error messages.\n   - Specific Handler: Handle Mongoose CastError, Duplicate Key (11000), and JWT expiration errors gracefully.\n4. Provide complete, copy-paste-ready code.\n\nExpected Output Format:\n1. Custom AppError Class Code\n2. asyncHandler Utility\n3. Global Error Middleware Implementation\n4. Example Route Demonstration",
    "promptText": "Act as a Principal Backend Architect. Build an enterprise-grade error handling system for an Express.js production API.\n\nCurrent Error Handling (or lack thereof):\n{{CURRENT_ERROR_SETUP}}\n\nTasks:\n1. Design a custom `AppError` class extending native `Error`:\n   - `statusCode` (e.g. 400, 401, 403, 404, 500).\n   - `status` ('fail' for 4xx, 'error' for 5xx).\n   - `isOperational` flag (distinguishing expected operational errors from unknown programmer bugs).\n2. Create an `asyncHandler` wrapper or configure async error handling so unhandled promise rejections don't hang requests or crash the process.\n3. Build the 4-argument Global Error Middleware `(err, req, res, next)`:\n   - Development Mode: Return full error stack trace, original error object, and details.\n   - Production Mode: Mask unhandled 500 errors (\"Something went wrong\") while safely returning operational error messages.\n   - Specific Handler: Handle Mongoose CastError, Duplicate Key (11000), and JWT expiration errors gracefully.\n4. Provide complete, copy-paste-ready code.\n\nExpected Output Format:\n1. Custom AppError Class Code\n2. asyncHandler Utility\n3. Global Error Middleware Implementation\n4. Example Route Demonstration",
    "tags": [
      "nodejs",
      "express",
      "error-handling",
      "middleware",
      "production-readiness"
    ],
    "difficulty": "Intermediate",
    "useCase": "Clean Code",
    "variables": [
      "{{CURRENT_ERROR_SETUP}}"
    ],
    "expectedOutput": "AppError class + asyncHandler utility + production error middleware + route example",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-jwt-auth-refresh-tokens",
    "title": "JWT Authentication & Refresh Token Rotation with HttpOnly Cookies",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Implements secure JWT authentication: short-lived access tokens, refresh token rotation in HttpOnly cookies, and revocation.",
    "prompt": "Act as a Senior Application Security Engineer. Design a complete, secure JWT authentication system in Node.js and Express.\n\nRequirements:\n{{AUTH_REQUIREMENTS}}\n\nTasks:\n1. Architectural Security Blueprint:\n   - Short-lived Access Token (15 min) passed in Authorization header or secure cookie.\n   - Long-lived Refresh Token (7 days) stored strictly in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie (preventing XSS access).\n   - Refresh Token Rotation: Generating a new refresh token on every refresh and revoking the old one (preventing replay attacks).\n2. Implement:\n   - `authenticateToken` middleware verifying the Access Token and attaching `req.user`.\n   - `/login` controller generating both tokens.\n   - `/refresh-token` controller handling token rotation and database revocation checks.\n   - `/logout` controller clearing cookies and invalidating tokens.\n3. Provide complete, production-ready code.\n\nExpected Output Format:\n1. JWT Token Strategy & Security Diagram\n2. Authentication Middleware Code\n3. Login & Token Refresh Controller Code\n4. Cookie Security Flags Configuration",
    "promptText": "Act as a Senior Application Security Engineer. Design a complete, secure JWT authentication system in Node.js and Express.\n\nRequirements:\n{{AUTH_REQUIREMENTS}}\n\nTasks:\n1. Architectural Security Blueprint:\n   - Short-lived Access Token (15 min) passed in Authorization header or secure cookie.\n   - Long-lived Refresh Token (7 days) stored strictly in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie (preventing XSS access).\n   - Refresh Token Rotation: Generating a new refresh token on every refresh and revoking the old one (preventing replay attacks).\n2. Implement:\n   - `authenticateToken` middleware verifying the Access Token and attaching `req.user`.\n   - `/login` controller generating both tokens.\n   - `/refresh-token` controller handling token rotation and database revocation checks.\n   - `/logout` controller clearing cookies and invalidating tokens.\n3. Provide complete, production-ready code.\n\nExpected Output Format:\n1. JWT Token Strategy & Security Diagram\n2. Authentication Middleware Code\n3. Login & Token Refresh Controller Code\n4. Cookie Security Flags Configuration",
    "tags": [
      "nodejs",
      "jwt",
      "authentication",
      "cookies",
      "security",
      "express"
    ],
    "difficulty": "Advanced",
    "useCase": "Security Review",
    "variables": [
      "{{AUTH_REQUIREMENTS}}"
    ],
    "expectedOutput": "Security blueprint + auth middleware + token refresh rotation code + cookie flags",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-rbac-authorization-middleware",
    "title": "Role-Based Access Control (RBAC) & Permission Middleware",
    "category": "Development",
    "subcategory": "Express.js",
    "description": "Enforces fine-grained permissions and role authorization (Admin, Manager, User) on Express routes.",
    "prompt": "Act as a Backend Security Specialist. Implement a flexible Role-Based Access Control (RBAC) and permission system for Express.js.\n\nRoles & Resource Permissions:\n{{ROLES_AND_PERMISSIONS}}\n\nTasks:\n1. Design an authorization middleware factory: `authorize(...allowedRoles)` or `requirePermission(permission)`.\n2. Ensure the middleware checks `req.user` (populated by authentication) and returns a clean 403 Forbidden with a clear reason if unauthorized.\n3. Handle hierarchical roles (e.g. SuperAdmin inherits Admin which inherits User).\n4. Support resource-level ownership checks (e.g., a user can edit their OWN profile, but an Admin can edit ANY profile).\n5. Provide complete, tested middleware code.\n\nExpected Output Format:\n1. Role & Permission Matrix Definition\n2. Authorization Middleware Implementation\n3. Resource Ownership Guard Pattern\n4. Example Express Route Bindings",
    "promptText": "Act as a Backend Security Specialist. Implement a flexible Role-Based Access Control (RBAC) and permission system for Express.js.\n\nRoles & Resource Permissions:\n{{ROLES_AND_PERMISSIONS}}\n\nTasks:\n1. Design an authorization middleware factory: `authorize(...allowedRoles)` or `requirePermission(permission)`.\n2. Ensure the middleware checks `req.user` (populated by authentication) and returns a clean 403 Forbidden with a clear reason if unauthorized.\n3. Handle hierarchical roles (e.g. SuperAdmin inherits Admin which inherits User).\n4. Support resource-level ownership checks (e.g., a user can edit their OWN profile, but an Admin can edit ANY profile).\n5. Provide complete, tested middleware code.\n\nExpected Output Format:\n1. Role & Permission Matrix Definition\n2. Authorization Middleware Implementation\n3. Resource Ownership Guard Pattern\n4. Example Express Route Bindings",
    "tags": [
      "nodejs",
      "express",
      "rbac",
      "authorization",
      "security",
      "middleware"
    ],
    "difficulty": "Intermediate",
    "useCase": "Security Review",
    "variables": [
      "{{ROLES_AND_PERMISSIONS}}"
    ],
    "expectedOutput": "Role matrix + authorize middleware + resource ownership guard + route bindings",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-cors-helmet-security-hardening",
    "title": "Express Security Hardening: Helmet, Strict CORS & Body Limits",
    "category": "Development",
    "subcategory": "Express.js",
    "description": "Hardens Express APIs against common web vulnerabilities: strict origin CORS, CSP headers via Helmet, and payload size limiting.",
    "prompt": "Act as an OWASP Security Auditor and Penetration Tester. Harden this Express application against common web attacks.\n\nCurrent Express App Configuration:\n{{CODE}}\n\nTasks:\n1. Configure `cors` with a dynamic whitelist supporting local development and multiple production domains with credentials support.\n2. Configure `helmet` with appropriate Content Security Policy (CSP), Cross-Origin Resource Policy, and HSTS headers.\n3. Mitigate Denial of Service (DoS) body flood attacks by configuring `express.json({ limit: '10kb' })`.\n4. Add HTTP Parameter Pollution (hpp) and NoSQL injection protection.\n5. Provide the complete hardened Express setup file.\n\nExpected Output Format:\n1. Vulnerability Risk Checklist (CORS wildcard dangers, missing security headers)\n2. Production Hardened Express Configuration Code\n3. Security Headers Verification Guide (curl commands)",
    "promptText": "Act as an OWASP Security Auditor and Penetration Tester. Harden this Express application against common web attacks.\n\nCurrent Express App Configuration:\n{{CODE}}\n\nTasks:\n1. Configure `cors` with a dynamic whitelist supporting local development and multiple production domains with credentials support.\n2. Configure `helmet` with appropriate Content Security Policy (CSP), Cross-Origin Resource Policy, and HSTS headers.\n3. Mitigate Denial of Service (DoS) body flood attacks by configuring `express.json({ limit: '10kb' })`.\n4. Add HTTP Parameter Pollution (hpp) and NoSQL injection protection.\n5. Provide the complete hardened Express setup file.\n\nExpected Output Format:\n1. Vulnerability Risk Checklist (CORS wildcard dangers, missing security headers)\n2. Production Hardened Express Configuration Code\n3. Security Headers Verification Guide (curl commands)",
    "tags": [
      "nodejs",
      "express",
      "security",
      "helmet",
      "cors",
      "owasp"
    ],
    "difficulty": "Intermediate",
    "useCase": "Security Review",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Security checklist + hardened Express config code + curl verification commands",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-request-validation-zod",
    "title": "Type-Safe Request Validation with Zod Middleware",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Builds a reusable Express middleware validating req.body, req.query, and req.params against Zod schemas before hitting controllers.",
    "prompt": "Act as a Senior TypeScript Backend Developer. Build a reusable request validation middleware for Express using Zod.\n\nRequirements / Target Endpoints:\n{{ENDPOINTS_OR_SCHEMAS}}\n\nTasks:\n1. Build a generic validation middleware `validate(schema: AnyZodObject)` that validates `req.body`, `req.query`, and `req.params`.\n2. Format validation failures into a clean, human-readable 400 Bad Request error payload listing specific field paths and messages.\n3. Automatically strip unknown fields to prevent mass assignment vulnerabilities.\n4. Ensure TypeScript types infer directly from the Zod schema into the Express request handler.\n5. Provide complete code with sample schemas (e.g. User registration, pagination query).\n\nExpected Output Format:\n1. Reusable Validation Middleware Code\n2. Clean 400 Error Response Shape\n3. Sample Zod Schemas\n4. Controller Handler with Inferred Types",
    "promptText": "Act as a Senior TypeScript Backend Developer. Build a reusable request validation middleware for Express using Zod.\n\nRequirements / Target Endpoints:\n{{ENDPOINTS_OR_SCHEMAS}}\n\nTasks:\n1. Build a generic validation middleware `validate(schema: AnyZodObject)` that validates `req.body`, `req.query`, and `req.params`.\n2. Format validation failures into a clean, human-readable 400 Bad Request error payload listing specific field paths and messages.\n3. Automatically strip unknown fields to prevent mass assignment vulnerabilities.\n4. Ensure TypeScript types infer directly from the Zod schema into the Express request handler.\n5. Provide complete code with sample schemas (e.g. User registration, pagination query).\n\nExpected Output Format:\n1. Reusable Validation Middleware Code\n2. Clean 400 Error Response Shape\n3. Sample Zod Schemas\n4. Controller Handler with Inferred Types",
    "tags": [
      "nodejs",
      "express",
      "zod",
      "validation",
      "typescript",
      "api"
    ],
    "difficulty": "Easy",
    "useCase": "Clean Code",
    "variables": [
      "{{ENDPOINTS_OR_SCHEMAS}}"
    ],
    "expectedOutput": "Validation middleware code + formatted 400 error shape + sample schemas + inferred controller",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-rate-limiting-ddos-protection",
    "title": "Express Rate Limiting & Brute-Force Protection with Redis",
    "category": "Development",
    "subcategory": "Express.js",
    "description": "Implements sliding-window rate limiting for public endpoints and strict login attempt throttling backed by Redis.",
    "prompt": "Act as a Senior Backend Systems Engineer. Implement distributed rate limiting and brute-force protection in Express.\n\nAPI Traffic & Attack Surface:\n{{TRAFFIC_AND_ENDPOINTS}}\n\nTasks:\n1. Design multi-tier rate limits:\n   - General API rate limit (e.g. 100 requests per 15 minutes per IP).\n   - Strict Auth rate limit (e.g. 5 failed login attempts per 15 minutes per account/IP).\n2. Implement using `express-rate-limit` with Redis store (`rate-limit-redis`) for distributed multi-instance deployment.\n3. Configure standard rate limit HTTP headers (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `Retry-After`).\n4. Return a structured 429 Too Many Requests response.\n5. Provide complete code and Redis connection setup.\n\nExpected Output Format:\n1. Rate Limiting Strategy Matrix\n2. Redis Rate Limiter Implementation Code\n3. Route-Level Attachment Examples\n4. Testing Rate Limits with ab / autocannon",
    "promptText": "Act as a Senior Backend Systems Engineer. Implement distributed rate limiting and brute-force protection in Express.\n\nAPI Traffic & Attack Surface:\n{{TRAFFIC_AND_ENDPOINTS}}\n\nTasks:\n1. Design multi-tier rate limits:\n   - General API rate limit (e.g. 100 requests per 15 minutes per IP).\n   - Strict Auth rate limit (e.g. 5 failed login attempts per 15 minutes per account/IP).\n2. Implement using `express-rate-limit` with Redis store (`rate-limit-redis`) for distributed multi-instance deployment.\n3. Configure standard rate limit HTTP headers (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `Retry-After`).\n4. Return a structured 429 Too Many Requests response.\n5. Provide complete code and Redis connection setup.\n\nExpected Output Format:\n1. Rate Limiting Strategy Matrix\n2. Redis Rate Limiter Implementation Code\n3. Route-Level Attachment Examples\n4. Testing Rate Limits with ab / autocannon",
    "tags": [
      "nodejs",
      "express",
      "rate-limiting",
      "redis",
      "security",
      "ddos"
    ],
    "difficulty": "Intermediate",
    "useCase": "Security Review",
    "variables": [
      "{{TRAFFIC_AND_ENDPOINTS}}"
    ],
    "expectedOutput": "Strategy matrix + Redis rate limiter code + route attachments + autocannon test command",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-stream-file-upload-multer",
    "title": "Streaming File Upload with Multer / Busboy & Cloud Storage",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Handles multi-gigabyte file uploads efficiently using streams to prevent server RAM exhaustion and crashes.",
    "prompt": "Act as a High-Performance Backend Architect. Implement streaming file uploads in Node.js and Express without buffering files in RAM.\n\nUpload Requirements (File types, max size, destination):\n{{UPLOAD_REQUIREMENTS}}\n\nTasks:\n1. Explain why buffering multipart file uploads in server RAM crashes Node.js processes under concurrent uploads.\n2. Implement streaming upload using Multer (memoryStorage vs diskStorage) or Busboy direct streaming to cloud storage (e.g. AWS S3).\n3. Validate:\n   - Magic byte MIME type verification (preventing disguised malicious executables).\n   - Max file size limits strictly enforced at the stream level.\n   - Filename sanitization to prevent directory traversal attacks (`../../etc/passwd`).\n4. Handle client disconnection mid-stream and clean up orphan temporary files.\n5. Provide complete, production-ready code.\n\nExpected Output Format:\n1. Memory Exhaustion Risk Analysis\n2. Streaming Upload Middleware Code\n3. Magic Byte Security Validator\n4. Cleanup on Error / Disconnect Handler",
    "promptText": "Act as a High-Performance Backend Architect. Implement streaming file uploads in Node.js and Express without buffering files in RAM.\n\nUpload Requirements (File types, max size, destination):\n{{UPLOAD_REQUIREMENTS}}\n\nTasks:\n1. Explain why buffering multipart file uploads in server RAM crashes Node.js processes under concurrent uploads.\n2. Implement streaming upload using Multer (memoryStorage vs diskStorage) or Busboy direct streaming to cloud storage (e.g. AWS S3).\n3. Validate:\n   - Magic byte MIME type verification (preventing disguised malicious executables).\n   - Max file size limits strictly enforced at the stream level.\n   - Filename sanitization to prevent directory traversal attacks (`../../etc/passwd`).\n4. Handle client disconnection mid-stream and clean up orphan temporary files.\n5. Provide complete, production-ready code.\n\nExpected Output Format:\n1. Memory Exhaustion Risk Analysis\n2. Streaming Upload Middleware Code\n3. Magic Byte Security Validator\n4. Cleanup on Error / Disconnect Handler",
    "tags": [
      "nodejs",
      "multer",
      "file-upload",
      "streaming",
      "security",
      "s3"
    ],
    "difficulty": "Advanced",
    "useCase": "Full Stack Development",
    "variables": [
      "{{UPLOAD_REQUIREMENTS}}"
    ],
    "expectedOutput": "Memory exhaustion audit + streaming upload code + magic byte validator + cleanup handler",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-mongoose-connection-pooling-schema",
    "title": "MongoDB Mongoose Production Setup: Pooling, Indexing & Hooks",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Configures robust Mongoose connections with connection pooling, retry logic, compound indexing, and pre-save hooks.",
    "prompt": "Act as a Database and Backend Specialist. Design a production-grade MongoDB Mongoose connection and schema architecture.\n\nDomain Entity Requirements:\n{{ENTITY_REQUIREMENTS}}\n\nTasks:\n1. Resilient Connection Setup:\n   - Connection pooling (`maxPoolSize: 20`, `minPoolSize: 5`).\n   - Auto-reconnect with exponential backoff and timeout parameters (`serverSelectionTimeoutMS`).\n   - Logging connection events (connected, error, disconnected).\n2. Schema Design:\n   - Strict field validations, custom regex, and default values.\n   - Password hashing pre-save hook (ensuring `isModified('password')` check).\n   - Indexes: Single-field, compound, and sparse/unique indexes.\n   - Virtual properties and JSON transform removing sensitive fields (`password`, `__v`).\n3. Provide complete, modular code.\n\nExpected Output Format:\n1. Mongoose Connection Manager File\n2. Production Schema & Model Implementation\n3. Indexing Performance Rationale\n4. Querying Example with Lean Optimization (`.lean()`)",
    "promptText": "Act as a Database and Backend Specialist. Design a production-grade MongoDB Mongoose connection and schema architecture.\n\nDomain Entity Requirements:\n{{ENTITY_REQUIREMENTS}}\n\nTasks:\n1. Resilient Connection Setup:\n   - Connection pooling (`maxPoolSize: 20`, `minPoolSize: 5`).\n   - Auto-reconnect with exponential backoff and timeout parameters (`serverSelectionTimeoutMS`).\n   - Logging connection events (connected, error, disconnected).\n2. Schema Design:\n   - Strict field validations, custom regex, and default values.\n   - Password hashing pre-save hook (ensuring `isModified('password')` check).\n   - Indexes: Single-field, compound, and sparse/unique indexes.\n   - Virtual properties and JSON transform removing sensitive fields (`password`, `__v`).\n3. Provide complete, modular code.\n\nExpected Output Format:\n1. Mongoose Connection Manager File\n2. Production Schema & Model Implementation\n3. Indexing Performance Rationale\n4. Querying Example with Lean Optimization (`.lean()`)",
    "tags": [
      "nodejs",
      "mongodb",
      "mongoose",
      "database",
      "connection-pooling"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{ENTITY_REQUIREMENTS}}"
    ],
    "expectedOutput": "Connection manager file + production schema with hooks + indexing rationale + lean query",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-graceful-shutdown-healthcheck",
    "title": "Graceful Shutdown & Kubernetes Healthcheck Endpoints",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Implements graceful shutdown on SIGTERM/SIGINT, draining active HTTP connections, and exposes liveness/readiness probes.",
    "prompt": "Act as a DevOps and Backend Reliability Engineer. Implement graceful shutdown and health check probes for an Express production service.\n\nApp Stack (Database, Cache, Background workers):\n{{APP_STACK}}\n\nTasks:\n1. Implement Kubernetes / Container Health Endpoints:\n   - `/health/live` (Liveness Probe: Is the Node process responsive?).\n   - `/health/ready` (Readiness Probe: Can the service talk to DB and Redis?).\n2. Implement Graceful Shutdown on `SIGTERM` and `SIGINT`:\n   - Stop accepting new incoming HTTP connections (`server.close()`).\n   - Allow in-flight requests a grace period (e.g. 15 seconds) to complete.\n   - Safely close database connections (MongoDB / Postgres pool) and Redis clients.\n   - Force kill if shutdown exceeds deadline.\n3. Provide complete, copy-paste-ready code.\n\nExpected Output Format:\n1. Container Lifecycle State Machine\n2. Liveness & Readiness Endpoints Code\n3. Graceful Shutdown Signal Handler Implementation\n4. Docker / Kubernetes Manifest Probe Example",
    "promptText": "Act as a DevOps and Backend Reliability Engineer. Implement graceful shutdown and health check probes for an Express production service.\n\nApp Stack (Database, Cache, Background workers):\n{{APP_STACK}}\n\nTasks:\n1. Implement Kubernetes / Container Health Endpoints:\n   - `/health/live` (Liveness Probe: Is the Node process responsive?).\n   - `/health/ready` (Readiness Probe: Can the service talk to DB and Redis?).\n2. Implement Graceful Shutdown on `SIGTERM` and `SIGINT`:\n   - Stop accepting new incoming HTTP connections (`server.close()`).\n   - Allow in-flight requests a grace period (e.g. 15 seconds) to complete.\n   - Safely close database connections (MongoDB / Postgres pool) and Redis clients.\n   - Force kill if shutdown exceeds deadline.\n3. Provide complete, copy-paste-ready code.\n\nExpected Output Format:\n1. Container Lifecycle State Machine\n2. Liveness & Readiness Endpoints Code\n3. Graceful Shutdown Signal Handler Implementation\n4. Docker / Kubernetes Manifest Probe Example",
    "tags": [
      "nodejs",
      "express",
      "devops",
      "kubernetes",
      "graceful-shutdown",
      "reliability"
    ],
    "difficulty": "Intermediate",
    "useCase": "Production Readiness",
    "variables": [
      "{{APP_STACK}}"
    ],
    "expectedOutput": "Lifecycle state machine + liveness/readiness probes + graceful shutdown code + k8s probe config",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "node-env-validation-zod",
    "title": "Fail-Fast Environment Variable Validation with Zod",
    "category": "Development",
    "subcategory": "Node.js",
    "description": "Prevents silent production failures by validating all process.env configuration variables on startup with strict Zod types.",
    "prompt": "Act as a Senior Backend Infrastructure Engineer. Implement a fail-fast environment variable validation module for Node.js using Zod.\n\nExpected Environment Variables:\n{{ENV_VARIABLES_LIST}}\n\nTasks:\n1. Build a type-safe `config/env.ts` module using Zod.\n2. Validate:\n   - `NODE_ENV` (restricted to 'development', 'test', 'production').\n   - `PORT` (coerced number between 1024 and 65535).\n   - Database URLs, Secret keys (minimum 32-character length), and external API keys.\n3. Fail-Fast Mechanism: If any variable is missing or malformed, format a clear terminal error banner and exit the process immediately (`process.exit(1)`).\n4. Export a strongly typed, immutable configuration object with full IDE autocomplete.\n5. Provide complete code.\n\nExpected Output Format:\n1. Zod Environment Schema Implementation\n2. Fail-Fast Startup Handler\n3. Clean Terminal Error Formatting\n4. Typed Config Usage Example in Express App",
    "promptText": "Act as a Senior Backend Infrastructure Engineer. Implement a fail-fast environment variable validation module for Node.js using Zod.\n\nExpected Environment Variables:\n{{ENV_VARIABLES_LIST}}\n\nTasks:\n1. Build a type-safe `config/env.ts` module using Zod.\n2. Validate:\n   - `NODE_ENV` (restricted to 'development', 'test', 'production').\n   - `PORT` (coerced number between 1024 and 65535).\n   - Database URLs, Secret keys (minimum 32-character length), and external API keys.\n3. Fail-Fast Mechanism: If any variable is missing or malformed, format a clear terminal error banner and exit the process immediately (`process.exit(1)`).\n4. Export a strongly typed, immutable configuration object with full IDE autocomplete.\n5. Provide complete code.\n\nExpected Output Format:\n1. Zod Environment Schema Implementation\n2. Fail-Fast Startup Handler\n3. Clean Terminal Error Formatting\n4. Typed Config Usage Example in Express App",
    "tags": [
      "nodejs",
      "env",
      "zod",
      "configuration",
      "devops",
      "fail-fast"
    ],
    "difficulty": "Easy",
    "useCase": "Clean Code",
    "variables": [
      "{{ENV_VARIABLES_LIST}}"
    ],
    "expectedOutput": "Zod env schema + fail-fast startup handler + terminal error banner + typed config usage",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "fullstack-feature-architecture",
    "title": "End-to-End Full Stack Feature Architecture & Data Flow",
    "category": "Development",
    "subcategory": "Full Stack Development",
    "description": "Designs a complete vertical slice: React UI state, API client with shared TypeScript types, Express route/controller, and PostgreSQL migration.",
    "prompt": "Act as a Principal Full-Stack Architect. Design the complete vertical slice implementation for this new application feature.\n\nFeature Requirements:\n{{FEATURE_REQUIREMENTS}}\n\nTech Stack:\n{{TECH_STACK}}\n\nTasks:\n1. Data Model & Database Migration:\n   - DDL schema changes (PostgreSQL / MySQL) with foreign keys, indexes, and constraints.\n2. Backend API Endpoint:\n   - Route definition, Zod request validator, controller handler, and database service method.\n   - Standard HTTP response status codes and error scenarios (400, 401, 404, 500).\n3. Shared Contract & Type Safety:\n   - TypeScript interfaces shared between frontend and backend.\n4. Frontend Client & UI State:\n   - API client function calling the endpoint.\n   - React component handling loading, error, and optimistic UI update states.\n5. End-to-End Verification Checklist.\n\nExpected Output Format:\n1. End-to-End Data Flow Diagram (Client -> API -> DB)\n2. Database DDL Migration Script\n3. Express Backend Controller & Route Code\n4. React Frontend Component & State Hook Code\n5. Shared TypeScript Interface Definitions",
    "promptText": "Act as a Principal Full-Stack Architect. Design the complete vertical slice implementation for this new application feature.\n\nFeature Requirements:\n{{FEATURE_REQUIREMENTS}}\n\nTech Stack:\n{{TECH_STACK}}\n\nTasks:\n1. Data Model & Database Migration:\n   - DDL schema changes (PostgreSQL / MySQL) with foreign keys, indexes, and constraints.\n2. Backend API Endpoint:\n   - Route definition, Zod request validator, controller handler, and database service method.\n   - Standard HTTP response status codes and error scenarios (400, 401, 404, 500).\n3. Shared Contract & Type Safety:\n   - TypeScript interfaces shared between frontend and backend.\n4. Frontend Client & UI State:\n   - API client function calling the endpoint.\n   - React component handling loading, error, and optimistic UI update states.\n5. End-to-End Verification Checklist.\n\nExpected Output Format:\n1. End-to-End Data Flow Diagram (Client -> API -> DB)\n2. Database DDL Migration Script\n3. Express Backend Controller & Route Code\n4. React Frontend Component & State Hook Code\n5. Shared TypeScript Interface Definitions",
    "tags": [
      "full-stack",
      "react",
      "nodejs",
      "express",
      "postgresql",
      "typescript",
      "architecture"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{FEATURE_REQUIREMENTS}}",
      "{{TECH_STACK}}"
    ],
    "expectedOutput": "Data flow diagram + DB migration + Express controller + React component + shared types",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "fullstack-auth-session-sync",
    "title": "Full-Stack Auth: Frontend Session Sync & Backend JWT Cookies",
    "category": "Development",
    "subcategory": "Full Stack Development",
    "description": "Coordinates seamless authentication across React SPA and Express: silent refresh, Axios interceptors, and protected routes.",
    "prompt": "Act as a Full-Stack Security and Authentication Specialist. Build an integrated frontend + backend authentication flow.\n\nFrontend Framework (React / Next.js):\n{{FRONTEND_FRAMEWORK}}\n\nBackend Framework (Express.js):\n{{BACKEND_FRAMEWORK}}\n\nTasks:\n1. Backend Token Management:\n   - Access token in memory / short-lived cookie.\n   - Refresh token in HttpOnly, Secure, SameSite cookie with rotation.\n2. Frontend Axios / Fetch Interceptors:\n   - Attaching Bearer tokens automatically to outbound requests.\n   - Catching 401 Unauthorized responses, pausing pending requests, calling silent `/refresh-token`, and retrying original requests without logging out the user.\n3. Protected Route Guards:\n   - React ProtectedRoute wrapper component checking session state and redirecting unauthorized visitors to `/login` with `from` redirect state.\n4. Provide complete, working code for both frontend and backend.\n\nExpected Output Format:\n1. Auth Handshake Sequence Diagram\n2. Express Token Refresh Endpoint Code\n3. Frontend Axios Interceptor Client Code\n4. React ProtectedRoute Component Code",
    "promptText": "Act as a Full-Stack Security and Authentication Specialist. Build an integrated frontend + backend authentication flow.\n\nFrontend Framework (React / Next.js):\n{{FRONTEND_FRAMEWORK}}\n\nBackend Framework (Express.js):\n{{BACKEND_FRAMEWORK}}\n\nTasks:\n1. Backend Token Management:\n   - Access token in memory / short-lived cookie.\n   - Refresh token in HttpOnly, Secure, SameSite cookie with rotation.\n2. Frontend Axios / Fetch Interceptors:\n   - Attaching Bearer tokens automatically to outbound requests.\n   - Catching 401 Unauthorized responses, pausing pending requests, calling silent `/refresh-token`, and retrying original requests without logging out the user.\n3. Protected Route Guards:\n   - React ProtectedRoute wrapper component checking session state and redirecting unauthorized visitors to `/login` with `from` redirect state.\n4. Provide complete, working code for both frontend and backend.\n\nExpected Output Format:\n1. Auth Handshake Sequence Diagram\n2. Express Token Refresh Endpoint Code\n3. Frontend Axios Interceptor Client Code\n4. React ProtectedRoute Component Code",
    "tags": [
      "full-stack",
      "auth",
      "jwt",
      "react",
      "express",
      "cookies",
      "security"
    ],
    "difficulty": "Advanced",
    "useCase": "Full Stack Development",
    "variables": [
      "{{FRONTEND_FRAMEWORK}}",
      "{{BACKEND_FRAMEWORK}}"
    ],
    "expectedOutput": "Auth sequence diagram + Express refresh endpoint + Axios interceptor + React route guard",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-explain-analyze-optimizer",
    "title": "SQL Query Execution Plan (EXPLAIN ANALYZE) & Index Optimizer",
    "category": "Database",
    "subcategory": "Query Optimization",
    "description": "Diagnoses Seq Scans, nested loops, high cost nodes, and temp disk spills in EXPLAIN ANALYZE output and designs covering indexes.",
    "prompt": "Act as a Database Administrator (DBA) and PostgreSQL/MySQL Performance Tuning Specialist. Analyze this slow SQL query and its execution plan.\n\nQuery:\n{{SQL_QUERY}}\n\nEXPLAIN ANALYZE Output:\n{{EXPLAIN_OUTPUT}}\n\nTasks:\n1. Break down the Execution Plan nodes:\n   - Identify Sequential Scans (Seq Scan) on large tables.\n   - Analyze actual time vs estimated cost divergence (outdated table statistics).\n   - Identify Sort / Hash aggregate memory spills to disk (work_mem exhaustion).\n2. Root Cause: Why is this query slow? (Missing index, non-sargable WHERE predicate, suboptimal join order).\n3. Recommended Remediation:\n   - Specific Composite / Partial / Covering Indexes (`CREATE INDEX ... INCLUDE (...)`).\n   - Query rewrites (e.g. converting subqueries to JOINs, removing functions from indexed columns).\n   - Server parameter tuning (e.g. `work_mem`, `random_page_cost`).\n4. Show the optimized SQL and predicted new execution plan.\n\nExpected Output Format:\n1. Execution Plan Bottleneck Breakdown\n2. Root Cause Analysis\n3. Targeted Index DDL Statements\n4. Optimized Query Rewrite\n5. Expected Performance Improvement Multiplier",
    "promptText": "Act as a Database Administrator (DBA) and PostgreSQL/MySQL Performance Tuning Specialist. Analyze this slow SQL query and its execution plan.\n\nQuery:\n{{SQL_QUERY}}\n\nEXPLAIN ANALYZE Output:\n{{EXPLAIN_OUTPUT}}\n\nTasks:\n1. Break down the Execution Plan nodes:\n   - Identify Sequential Scans (Seq Scan) on large tables.\n   - Analyze actual time vs estimated cost divergence (outdated table statistics).\n   - Identify Sort / Hash aggregate memory spills to disk (work_mem exhaustion).\n2. Root Cause: Why is this query slow? (Missing index, non-sargable WHERE predicate, suboptimal join order).\n3. Recommended Remediation:\n   - Specific Composite / Partial / Covering Indexes (`CREATE INDEX ... INCLUDE (...)`).\n   - Query rewrites (e.g. converting subqueries to JOINs, removing functions from indexed columns).\n   - Server parameter tuning (e.g. `work_mem`, `random_page_cost`).\n4. Show the optimized SQL and predicted new execution plan.\n\nExpected Output Format:\n1. Execution Plan Bottleneck Breakdown\n2. Root Cause Analysis\n3. Targeted Index DDL Statements\n4. Optimized Query Rewrite\n5. Expected Performance Improvement Multiplier",
    "tags": [
      "database",
      "sql",
      "explain-analyze",
      "indexing",
      "performance",
      "postgres"
    ],
    "difficulty": "Advanced",
    "useCase": "Query Optimization",
    "variables": [
      "{{SQL_QUERY}}",
      "{{EXPLAIN_OUTPUT}}"
    ],
    "expectedOutput": "Plan bottleneck breakdown + root cause + targeted index DDL + query rewrite + performance gain",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-joins-comprehensive-guide",
    "title": "SQL Joins Master: INNER, LEFT, RIGHT, FULL OUTER & Anti-Joins",
    "category": "Database",
    "subcategory": "SQL",
    "description": "Constructs relational joins with ASCII Venn diagrams, anti-join patterns for finding orphan records, and performance comparisons.",
    "prompt": "Act as a Database Expert and Technical Interviewer. I need to formulate a complex multi-table query using appropriate JOIN strategies.\n\nTables & Relations:\n{{TABLES_AND_RELATIONS}}\n\nQuery Goal:\n{{QUERY_GOAL}}\n\nTasks:\n1. Explain which JOIN type is required (INNER, LEFT, RIGHT, FULL OUTER, or Cross Join) and why.\n2. Demonstrate how to implement an Anti-Join (finding records in Table A that have NO match in Table B using `LEFT JOIN ... WHERE B.id IS NULL` vs `NOT EXISTS`).\n3. Detail the impact of placing filter conditions in the `ON` clause vs the `WHERE` clause in outer joins.\n4. Provide the production-ready SQL query with clean table aliases and indentation.\n5. Provide sample input tables and the exact output result table.\n\nExpected Output Format:\n1. Join Type Selection & ASCII Venn Visualization\n2. ON vs WHERE Clause Evaluation\n3. Production SQL Query\n4. Sample Input & Output Trace Table",
    "promptText": "Act as a Database Expert and Technical Interviewer. I need to formulate a complex multi-table query using appropriate JOIN strategies.\n\nTables & Relations:\n{{TABLES_AND_RELATIONS}}\n\nQuery Goal:\n{{QUERY_GOAL}}\n\nTasks:\n1. Explain which JOIN type is required (INNER, LEFT, RIGHT, FULL OUTER, or Cross Join) and why.\n2. Demonstrate how to implement an Anti-Join (finding records in Table A that have NO match in Table B using `LEFT JOIN ... WHERE B.id IS NULL` vs `NOT EXISTS`).\n3. Detail the impact of placing filter conditions in the `ON` clause vs the `WHERE` clause in outer joins.\n4. Provide the production-ready SQL query with clean table aliases and indentation.\n5. Provide sample input tables and the exact output result table.\n\nExpected Output Format:\n1. Join Type Selection & ASCII Venn Visualization\n2. ON vs WHERE Clause Evaluation\n3. Production SQL Query\n4. Sample Input & Output Trace Table",
    "tags": [
      "database",
      "sql",
      "joins",
      "left-join",
      "inner-join",
      "anti-join"
    ],
    "difficulty": "Easy",
    "useCase": "Database Design",
    "variables": [
      "{{TABLES_AND_RELATIONS}}",
      "{{QUERY_GOAL}}"
    ],
    "expectedOutput": "Join selection + ASCII visualization + ON vs WHERE evaluation + production query + sample trace",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-recursive-cte-hierarchies",
    "title": "SQL Recursive CTE: Hierarchical Trees & Graph Traversal",
    "category": "Database",
    "subcategory": "SQL",
    "description": "Traverses recursive organizational charts, category trees, and breadcrumbs using Common Table Expressions (WITH RECURSIVE).",
    "prompt": "Act as an Advanced SQL Specialist. Build a Recursive Common Table Expression (CTE) to traverse this hierarchical tree structure.\n\nTable Schema & Hierarchy Context:\n{{HIERARCHICAL_DATA_SCHEMA}}\n\nTraversal Objective:\n{{OBJECTIVE}}\n\nTasks:\n1. Structure the Recursive CTE:\n   - Anchor Member: Base query that selects root nodes (e.g. `parent_id IS NULL`).\n   - Recursive Member: Query that joins the CTE back to the base table on parent-child foreign keys.\n   - Termination Condition: Natural termination when no further children exist.\n2. Track hierarchy metadata:\n   - Level / Depth counter (e.g. level 1 = CEO, level 2 = VP).\n   - Breadcrumb path array (e.g. `root -> electronics -> laptops`).\n   - Cycle prevention guard (protecting against infinite loops in cyclic graphs).\n3. Provide the complete SQL query.\n\nExpected Output Format:\n1. Recursive CTE Mechanics & Execution Flow\n2. Complete SQL Query with Cycle Guard\n3. Output Table Schema with Level & Path Columns\n4. Performance & Maximum Recursion Limit Note",
    "promptText": "Act as an Advanced SQL Specialist. Build a Recursive Common Table Expression (CTE) to traverse this hierarchical tree structure.\n\nTable Schema & Hierarchy Context:\n{{HIERARCHICAL_DATA_SCHEMA}}\n\nTraversal Objective:\n{{OBJECTIVE}}\n\nTasks:\n1. Structure the Recursive CTE:\n   - Anchor Member: Base query that selects root nodes (e.g. `parent_id IS NULL`).\n   - Recursive Member: Query that joins the CTE back to the base table on parent-child foreign keys.\n   - Termination Condition: Natural termination when no further children exist.\n2. Track hierarchy metadata:\n   - Level / Depth counter (e.g. level 1 = CEO, level 2 = VP).\n   - Breadcrumb path array (e.g. `root -> electronics -> laptops`).\n   - Cycle prevention guard (protecting against infinite loops in cyclic graphs).\n3. Provide the complete SQL query.\n\nExpected Output Format:\n1. Recursive CTE Mechanics & Execution Flow\n2. Complete SQL Query with Cycle Guard\n3. Output Table Schema with Level & Path Columns\n4. Performance & Maximum Recursion Limit Note",
    "tags": [
      "database",
      "sql",
      "cte",
      "recursive-cte",
      "trees",
      "hierarchies"
    ],
    "difficulty": "Advanced",
    "useCase": "Database Design",
    "variables": [
      "{{HIERARCHICAL_DATA_SCHEMA}}",
      "{{OBJECTIVE}}"
    ],
    "expectedOutput": "CTE mechanics + complete SQL query with cycle guard + output schema with depth + recursion note",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-window-functions-ranking",
    "title": "SQL Window Functions: ROW_NUMBER, RANK, DENSE_RANK & LAG/LEAD",
    "category": "Database",
    "subcategory": "SQL",
    "description": "Solves complex ranking, running totals, and moving averages using window functions and the OVER (PARTITION BY ... ORDER BY ...) clause.",
    "prompt": "Act as a Senior Data Engineer. Formulate an advanced SQL query using Window Functions for the following analytics problem.\n\nTable Schema:\n{{SCHEMA}}\n\nAnalytics Goal (e.g. Top 3 highest salaries per department / Month-over-month growth):\n{{ANALYTICS_GOAL}}\n\nTasks:\n1. Choose the appropriate window function:\n   - Difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` on tie values.\n   - Use of `LAG()` and `LEAD()` for period-over-period percentage comparisons.\n   - Use of running totals (`SUM(...) OVER (PARTITION BY ... ORDER BY ...)`).\n2. Construct the `OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)` framing clause.\n3. Wrap in a subquery or CTE if filtering on the computed window column is required (since window functions cannot appear directly in WHERE).\n4. Provide the complete SQL query with sample output data.\n\nExpected Output Format:\n1. Window Function Choice & Tie Behavior Analysis\n2. Frame Specification Breakdown\n3. Complete SQL Query\n4. Sample Input & Output Verification Table",
    "promptText": "Act as a Senior Data Engineer. Formulate an advanced SQL query using Window Functions for the following analytics problem.\n\nTable Schema:\n{{SCHEMA}}\n\nAnalytics Goal (e.g. Top 3 highest salaries per department / Month-over-month growth):\n{{ANALYTICS_GOAL}}\n\nTasks:\n1. Choose the appropriate window function:\n   - Difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` on tie values.\n   - Use of `LAG()` and `LEAD()` for period-over-period percentage comparisons.\n   - Use of running totals (`SUM(...) OVER (PARTITION BY ... ORDER BY ...)`).\n2. Construct the `OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)` framing clause.\n3. Wrap in a subquery or CTE if filtering on the computed window column is required (since window functions cannot appear directly in WHERE).\n4. Provide the complete SQL query with sample output data.\n\nExpected Output Format:\n1. Window Function Choice & Tie Behavior Analysis\n2. Frame Specification Breakdown\n3. Complete SQL Query\n4. Sample Input & Output Verification Table",
    "tags": [
      "database",
      "sql",
      "window-functions",
      "rank",
      "dense-rank",
      "analytics"
    ],
    "difficulty": "Intermediate",
    "useCase": "Database Design",
    "variables": [
      "{{SCHEMA}}",
      "{{ANALYTICS_GOAL}}"
    ],
    "expectedOutput": "Window function comparison + frame specification + complete SQL query + verification table",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-schema-normalization-bcnf",
    "title": "Database Normalization: 1NF to BCNF & Strategic Denormalization",
    "category": "Database",
    "subcategory": "DBMS Concepts",
    "description": "Normalizes relational schemas systematically through 1NF, 2NF, 3NF, and BCNF, and explains when to strategically denormalize for scale.",
    "prompt": "Act as a Relational Database Architect and DBMS Professor. Normalize this raw unnormalized table schema systematically.\n\nUnnormalized Table & Functional Dependencies:\n{{RAW_SCHEMA_AND_DEPENDENCIES}}\n\nTasks:\n1. 1st Normal Form (1NF): Eliminate repeating groups and ensure atomic values.\n2. 2nd Normal Form (2NF): Eliminate partial functional dependencies (where a non-key attribute depends on part of a composite primary key).\n3. 3rd Normal Form (3NF): Eliminate transitive dependencies (non-key attribute depending on another non-key attribute).\n4. Boyce-Codd Normal Form (BCNF): Ensure every determinant is a candidate key.\n5. Trade-off Analysis: When does high normalization hurt read performance, and what strategic denormalization (e.g. caching pre-computed totals) is acceptable in high-read systems?\n6. Provide final DDL CREATE TABLE statements with primary and foreign key constraints.\n\nExpected Output Format:\n1. Step-by-Step Normalization Breakdown (1NF -> 2NF -> 3NF -> BCNF)\n2. Dependency Diagrams\n3. Final Normalized DDL Schema\n4. Strategic Denormalization Recommendations",
    "promptText": "Act as a Relational Database Architect and DBMS Professor. Normalize this raw unnormalized table schema systematically.\n\nUnnormalized Table & Functional Dependencies:\n{{RAW_SCHEMA_AND_DEPENDENCIES}}\n\nTasks:\n1. 1st Normal Form (1NF): Eliminate repeating groups and ensure atomic values.\n2. 2nd Normal Form (2NF): Eliminate partial functional dependencies (where a non-key attribute depends on part of a composite primary key).\n3. 3rd Normal Form (3NF): Eliminate transitive dependencies (non-key attribute depending on another non-key attribute).\n4. Boyce-Codd Normal Form (BCNF): Ensure every determinant is a candidate key.\n5. Trade-off Analysis: When does high normalization hurt read performance, and what strategic denormalization (e.g. caching pre-computed totals) is acceptable in high-read systems?\n6. Provide final DDL CREATE TABLE statements with primary and foreign key constraints.\n\nExpected Output Format:\n1. Step-by-Step Normalization Breakdown (1NF -> 2NF -> 3NF -> BCNF)\n2. Dependency Diagrams\n3. Final Normalized DDL Schema\n4. Strategic Denormalization Recommendations",
    "tags": [
      "database",
      "dbms",
      "normalization",
      "3nf",
      "bcnf",
      "database-design"
    ],
    "difficulty": "Intermediate",
    "useCase": "Database Design",
    "variables": [
      "{{RAW_SCHEMA_AND_DEPENDENCIES}}"
    ],
    "expectedOutput": "Normalization steps breakdown + dependency diagrams + final DDL schema + denormalization analysis",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-acid-transaction-isolation",
    "title": "ACID Properties & Transaction Isolation Levels Demystified",
    "category": "Database",
    "subcategory": "DBMS Concepts",
    "description": "Explains Dirty Reads, Non-Repeatable Reads, and Phantom Reads across Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
    "prompt": "Act as an ACID and Concurrency Control Specialist. Explain transaction isolation levels and diagnose concurrency anomalies in this scenario.\n\nConcurrent Transaction Scenario:\n{{TRANSACTION_SCENARIO}}\n\nTasks:\n1. Define the 4 ACID properties (Atomicity, Consistency, Isolation, Durability) and how the Write-Ahead Log (WAL) guarantees them.\n2. Analyze the 3 read phenomena:\n   - Dirty Read\n   - Non-Repeatable Read (Fuzzy Read)\n   - Phantom Read\n3. Compare the 4 ANSI SQL Isolation Levels in a Markdown Matrix:\n   - Read Uncommitted\n   - Read Committed (Postgres default)\n   - Repeatable Read\n   - Serializable\n4. Explain how Multi-Version Concurrency Control (MVCC) works in modern databases to allow readers not to block writers and writers not to block readers.\n5. Provide SQL code demonstrating how to set transaction isolation and prevent the specified concurrency bug.\n\nExpected Output Format:\n1. ACID & WAL Architecture Summary\n2. Concurrency Anomalies Matrix Table\n3. MVCC Snapshot Mechanics Explanation\n4. Corrective SQL Transaction Block with Explicit Isolation Level",
    "promptText": "Act as an ACID and Concurrency Control Specialist. Explain transaction isolation levels and diagnose concurrency anomalies in this scenario.\n\nConcurrent Transaction Scenario:\n{{TRANSACTION_SCENARIO}}\n\nTasks:\n1. Define the 4 ACID properties (Atomicity, Consistency, Isolation, Durability) and how the Write-Ahead Log (WAL) guarantees them.\n2. Analyze the 3 read phenomena:\n   - Dirty Read\n   - Non-Repeatable Read (Fuzzy Read)\n   - Phantom Read\n3. Compare the 4 ANSI SQL Isolation Levels in a Markdown Matrix:\n   - Read Uncommitted\n   - Read Committed (Postgres default)\n   - Repeatable Read\n   - Serializable\n4. Explain how Multi-Version Concurrency Control (MVCC) works in modern databases to allow readers not to block writers and writers not to block readers.\n5. Provide SQL code demonstrating how to set transaction isolation and prevent the specified concurrency bug.\n\nExpected Output Format:\n1. ACID & WAL Architecture Summary\n2. Concurrency Anomalies Matrix Table\n3. MVCC Snapshot Mechanics Explanation\n4. Corrective SQL Transaction Block with Explicit Isolation Level",
    "tags": [
      "database",
      "acid",
      "transactions",
      "isolation-levels",
      "mvcc",
      "concurrency"
    ],
    "difficulty": "Intermediate",
    "useCase": "Interview Preparation",
    "variables": [
      "{{TRANSACTION_SCENARIO}}"
    ],
    "expectedOutput": "ACID summary + anomaly matrix table + MVCC mechanics + SQL transaction block",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-postgres-row-level-locking",
    "title": "PostgreSQL Row-Level Locking & High-Concurrency Queues",
    "category": "Database",
    "subcategory": "PostgreSQL",
    "description": "Implements non-blocking concurrent job queues in PostgreSQL using SELECT FOR UPDATE SKIP LOCKED and pessimistic locks.",
    "prompt": "Act as a High-Scale PostgreSQL Architect. Design a bulletproof, concurrent task-processing queue directly inside PostgreSQL.\n\nQueue Requirements & Worker Concurrency:\n{{QUEUE_REQUIREMENTS}}\n\nTasks:\n1. Explain the difference between optimistic locking (version column) and pessimistic locking (`SELECT FOR UPDATE`).\n2. Explain why naive `SELECT ... FOR UPDATE` causes worker lock contention and serial execution bottlenecks under high concurrency.\n3. Implement the optimal pattern: `SELECT ... FOR UPDATE SKIP LOCKED` (allowing concurrent workers to pick unique jobs without waiting on each other's locks).\n4. Address:\n   - Transaction boundary duration (keeping locked transactions ultra-short).\n   - Handling worker crash mid-task (retry timeouts and status reset).\n   - Index requirements for the queue query.\n5. Provide complete SQL DDL, enqueue query, worker fetch query, and complete query.\n\nExpected Output Format:\n1. Locking Mechanics Comparison (Optimistic vs Pessimistic vs Skip Locked)\n2. Queue Table DDL with Indexes\n3. Worker Task Acquisition Query\n4. Crash Recovery Strategy",
    "promptText": "Act as a High-Scale PostgreSQL Architect. Design a bulletproof, concurrent task-processing queue directly inside PostgreSQL.\n\nQueue Requirements & Worker Concurrency:\n{{QUEUE_REQUIREMENTS}}\n\nTasks:\n1. Explain the difference between optimistic locking (version column) and pessimistic locking (`SELECT FOR UPDATE`).\n2. Explain why naive `SELECT ... FOR UPDATE` causes worker lock contention and serial execution bottlenecks under high concurrency.\n3. Implement the optimal pattern: `SELECT ... FOR UPDATE SKIP LOCKED` (allowing concurrent workers to pick unique jobs without waiting on each other's locks).\n4. Address:\n   - Transaction boundary duration (keeping locked transactions ultra-short).\n   - Handling worker crash mid-task (retry timeouts and status reset).\n   - Index requirements for the queue query.\n5. Provide complete SQL DDL, enqueue query, worker fetch query, and complete query.\n\nExpected Output Format:\n1. Locking Mechanics Comparison (Optimistic vs Pessimistic vs Skip Locked)\n2. Queue Table DDL with Indexes\n3. Worker Task Acquisition Query\n4. Crash Recovery Strategy",
    "tags": [
      "postgres",
      "locking",
      "concurrency",
      "skip-locked",
      "queues",
      "database"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture Review",
    "variables": [
      "{{QUEUE_REQUIREMENTS}}"
    ],
    "expectedOutput": "Locking comparison + queue table DDL + skip locked worker query + crash recovery strategy",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-mongo-aggregation-pipeline-builder",
    "title": "MongoDB Aggregation Pipeline: Multi-Stage Filtering, Grouping & Joins",
    "category": "Database",
    "subcategory": "MongoDB",
    "description": "Architects complex MongoDB aggregation pipelines ($match, $unwind, $group, $lookup, $project) with index optimization.",
    "prompt": "Act as a Senior MongoDB Solutions Architect. Build a high-performance aggregation pipeline for this analytics requirement.\n\nCollections Schema:\n{{COLLECTIONS_SCHEMA}}\n\nAnalytics Objective:\n{{ANALYTICS_OBJECTIVE}}\n\nTasks:\n1. Design the multi-stage aggregation pipeline:\n   - `$match` stage placed first to leverage indexes and prune working dataset early.\n   - `$unwind` for nested arrays.\n   - `$group` with accumulators (`$sum`, `$avg`, `$addToSet`).\n   - `$lookup` for collection joins with custom pipeline projection.\n   - `$project` / `$addFields` for clean response shape.\n   - `$sort` and `$limit` for pagination.\n2. Explain the 100MB RAM stage limit and when `allowDiskUse: true` is required.\n3. Propose compound indexes that allow the initial `$match` and `$sort` to be covered entirely by index.\n4. Provide the complete aggregation query in JavaScript / Node.js Mongoose format.\n\nExpected Output Format:\n1. Stage-by-Stage Pipeline Diagram\n2. Production Aggregation Code (Node.js/Mongo Shell)\n3. Index Optimization Specification\n4. Memory & Performance Best Practices",
    "promptText": "Act as a Senior MongoDB Solutions Architect. Build a high-performance aggregation pipeline for this analytics requirement.\n\nCollections Schema:\n{{COLLECTIONS_SCHEMA}}\n\nAnalytics Objective:\n{{ANALYTICS_OBJECTIVE}}\n\nTasks:\n1. Design the multi-stage aggregation pipeline:\n   - `$match` stage placed first to leverage indexes and prune working dataset early.\n   - `$unwind` for nested arrays.\n   - `$group` with accumulators (`$sum`, `$avg`, `$addToSet`).\n   - `$lookup` for collection joins with custom pipeline projection.\n   - `$project` / `$addFields` for clean response shape.\n   - `$sort` and `$limit` for pagination.\n2. Explain the 100MB RAM stage limit and when `allowDiskUse: true` is required.\n3. Propose compound indexes that allow the initial `$match` and `$sort` to be covered entirely by index.\n4. Provide the complete aggregation query in JavaScript / Node.js Mongoose format.\n\nExpected Output Format:\n1. Stage-by-Stage Pipeline Diagram\n2. Production Aggregation Code (Node.js/Mongo Shell)\n3. Index Optimization Specification\n4. Memory & Performance Best Practices",
    "tags": [
      "mongodb",
      "aggregation",
      "nosql",
      "lookup",
      "database",
      "queries"
    ],
    "difficulty": "Advanced",
    "useCase": "Database Design",
    "variables": [
      "{{COLLECTIONS_SCHEMA}}",
      "{{ANALYTICS_OBJECTIVE}}"
    ],
    "expectedOutput": "Pipeline diagram + production aggregation code + index optimization + memory guidelines",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-sharding-partitioning-architecture",
    "title": "Database Scaling: Partitioning, Sharding & Replication Architecture",
    "category": "Database",
    "subcategory": "Database Design",
    "description": "Architects scale-out strategies: declarative table partitioning (range/hash/list), sharding keys, and master-replica failover.",
    "prompt": "Act as a Principal Database Infrastructure Architect. Design a database scaling strategy for a table growing by 50 million rows per month.\n\nData Scale & Access Patterns:\n{{DATA_SCALE_AND_ACCESS_PATTERNS}}\n\nTasks:\n1. Compare Scaling Dimensions:\n   - Vertical Scaling vs Read Replicas.\n   - Table Partitioning (PostgreSQL declarative Range/List/Hash partitioning on a single node).\n   - Horizontal Sharding (Distributing partitions across multiple independent database nodes).\n2. Choose a Sharding / Partition Key:\n   - Analyze hot-spot risks (e.g. why timestamp as shard key creates write hotspots).\n   - Hash-based vs Range-based routing.\n   - Cross-shard join penalties.\n3. Replication Topology:\n   - Primary-Replica with asynchronous vs synchronous replication.\n   - Replication lag mitigation and read-after-write consistency.\n4. Provide concrete DDL for table partitioning.\n\nExpected Output Format:\n1. Scaling Decision Matrix\n2. Shard Key Evaluation & Trade-offs\n3. Partitioning DDL Implementation (PostgreSQL)\n4. Replication Topology Diagram & Consistency Strategy",
    "promptText": "Act as a Principal Database Infrastructure Architect. Design a database scaling strategy for a table growing by 50 million rows per month.\n\nData Scale & Access Patterns:\n{{DATA_SCALE_AND_ACCESS_PATTERNS}}\n\nTasks:\n1. Compare Scaling Dimensions:\n   - Vertical Scaling vs Read Replicas.\n   - Table Partitioning (PostgreSQL declarative Range/List/Hash partitioning on a single node).\n   - Horizontal Sharding (Distributing partitions across multiple independent database nodes).\n2. Choose a Sharding / Partition Key:\n   - Analyze hot-spot risks (e.g. why timestamp as shard key creates write hotspots).\n   - Hash-based vs Range-based routing.\n   - Cross-shard join penalties.\n3. Replication Topology:\n   - Primary-Replica with asynchronous vs synchronous replication.\n   - Replication lag mitigation and read-after-write consistency.\n4. Provide concrete DDL for table partitioning.\n\nExpected Output Format:\n1. Scaling Decision Matrix\n2. Shard Key Evaluation & Trade-offs\n3. Partitioning DDL Implementation (PostgreSQL)\n4. Replication Topology Diagram & Consistency Strategy",
    "tags": [
      "database",
      "sharding",
      "partitioning",
      "scalability",
      "replication",
      "postgres"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{DATA_SCALE_AND_ACCESS_PATTERNS}}"
    ],
    "expectedOutput": "Scaling matrix + shard key evaluation + PostgreSQL partitioning DDL + replication topology",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-sql-vs-nosql-decision-framework",
    "title": "SQL vs NoSQL: High-Stakes Database Selection Framework",
    "category": "Database",
    "subcategory": "Database Design",
    "description": "Evaluates Relational (Postgres/MySQL), Document (MongoDB), Key-Value (Redis), Wide-Column (Cassandra), and Graph (Neo4j) for a system.",
    "prompt": "Act as a Chief Technology Officer (CTO) and Principal Data Architect. Deliver a comprehensive database selection analysis for this application.\n\nSystem Requirements & Data Model:\n{{SYSTEM_REQUIREMENTS}}\n\nTasks:\n1. Compare suitability across:\n   - Relational (RDBMS - PostgreSQL, MySQL): ACID, complex joins, schema integrity.\n   - Document Store (MongoDB): Dynamic schema, hierarchical JSON documents, rapid prototyping.\n   - Key-Value Store (Redis): Microsecond in-memory caching, session management.\n   - Wide-Column Store (Cassandra, ScyllaDB): High write-throughput time-series, linear scale.\n2. Evaluate against CAP Theorem (Consistency vs Availability during network partition).\n3. Evaluate Polyglot Persistence: Should multiple specialized databases be used together (e.g. Postgres for financial ledger + Redis for active sessions + ElasticSearch for text search)?\n4. Provide final recommendation with clear cost, operational complexity, and scale justifications.\n\nExpected Output Format:\n1. Comparison Scorecard Matrix\n2. CAP Theorem & Access Pattern Fit\n3. Polyglot Architecture Diagram\n4. Final Architectural Decision Record (ADR)",
    "promptText": "Act as a Chief Technology Officer (CTO) and Principal Data Architect. Deliver a comprehensive database selection analysis for this application.\n\nSystem Requirements & Data Model:\n{{SYSTEM_REQUIREMENTS}}\n\nTasks:\n1. Compare suitability across:\n   - Relational (RDBMS - PostgreSQL, MySQL): ACID, complex joins, schema integrity.\n   - Document Store (MongoDB): Dynamic schema, hierarchical JSON documents, rapid prototyping.\n   - Key-Value Store (Redis): Microsecond in-memory caching, session management.\n   - Wide-Column Store (Cassandra, ScyllaDB): High write-throughput time-series, linear scale.\n2. Evaluate against CAP Theorem (Consistency vs Availability during network partition).\n3. Evaluate Polyglot Persistence: Should multiple specialized databases be used together (e.g. Postgres for financial ledger + Redis for active sessions + ElasticSearch for text search)?\n4. Provide final recommendation with clear cost, operational complexity, and scale justifications.\n\nExpected Output Format:\n1. Comparison Scorecard Matrix\n2. CAP Theorem & Access Pattern Fit\n3. Polyglot Architecture Diagram\n4. Final Architectural Decision Record (ADR)",
    "tags": [
      "database",
      "sql-vs-nosql",
      "system-design",
      "architecture",
      "cap-theorem",
      "polyglot"
    ],
    "difficulty": "Intermediate",
    "useCase": "Architecture Review",
    "variables": [
      "{{SYSTEM_REQUIREMENTS}}"
    ],
    "expectedOutput": "Comparison scorecard + CAP theorem fit + polyglot architecture + final ADR document",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-technical-interview-questions-generator",
    "title": "Database Technical Interview Questions & Model Answers",
    "category": "Database",
    "subcategory": "Interview Questions",
    "description": "Generates high-yield database interview questions (Indexing, ACID, Joins, Normalization) with beginner, intermediate, and staff-level answers.",
    "prompt": "Act as a Senior Database Engineering Interviewer at Amazon. Generate 5 challenging, real-world database interview questions based on this topic.\n\nDatabase Topic:\n{{DATABASE_TOPIC}}\n\nCandidate Target Level:\n{{TARGET_LEVEL}}\n\nFor each question provide:\n1. The Question as asked in the interview.\n2. What the interviewer is evaluating (hidden traps, depth of understanding).\n3. Mediocre / Junior Answer (what common candidates say).\n4. Senior / Elite Model Answer (including internal engine mechanics, storage pages, B-Tree pointers, or MVCC snapshots).\n5. Follow-Up Curveball Question to test true mastery under pressure.\n\nExpected Output Format:\n5 Structured Question Cards with Junior vs Senior model answers and follow-ups.",
    "promptText": "Act as a Senior Database Engineering Interviewer at Amazon. Generate 5 challenging, real-world database interview questions based on this topic.\n\nDatabase Topic:\n{{DATABASE_TOPIC}}\n\nCandidate Target Level:\n{{TARGET_LEVEL}}\n\nFor each question provide:\n1. The Question as asked in the interview.\n2. What the interviewer is evaluating (hidden traps, depth of understanding).\n3. Mediocre / Junior Answer (what common candidates say).\n4. Senior / Elite Model Answer (including internal engine mechanics, storage pages, B-Tree pointers, or MVCC snapshots).\n5. Follow-Up Curveball Question to test true mastery under pressure.\n\nExpected Output Format:\n5 Structured Question Cards with Junior vs Senior model answers and follow-ups.",
    "tags": [
      "database",
      "sql",
      "interview-prep",
      "dbms",
      "technical-interview"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{DATABASE_TOPIC}}",
      "{{TARGET_LEVEL}}"
    ],
    "expectedOutput": "5 technical interview questions + evaluation criteria + junior vs senior answers + curveballs",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "db-postgres-deadlock-investigator",
    "title": "PostgreSQL Deadlock Diagnostic & Lock Graph Resolver",
    "category": "Database",
    "subcategory": "PostgreSQL",
    "description": "Diagnoses PostgreSQL deadlocks, analyzes pg_stat_activity lock trees, and restructures query ordering to eliminate mutual blocking.",
    "prompt": "Act as a PostgreSQL Internals Specialist. Diagnose and eliminate deadlocks in this high-concurrency database environment.\n\nDeadlock Log Message:\n{{DEADLOCK_LOG}}\n\nTransactions Involved:\n{{TRANSACTION_QUERIES}}\n\nTasks:\n1. Reconstruct the Deadlock Graph:\n   - Which transaction holds Lock A and is waiting for Lock B?\n   - Which transaction holds Lock B and is waiting for Lock A?\n2. Identify why the lock order inverted (e.g. updating items in random order instead of sorted ID order).\n3. Detail how PostgreSQL's Deadlock Detector (`deadlock_timeout`) detects cycles and chooses a transaction to abort.\n4. Provide the architectural fix:\n   - Consistent resource locking order (sorting entity IDs before batch update).\n   - Advisory locks or optimistic concurrency.\n   - Retry loops with exponential backoff on serialization failures.\n5. Provide the corrected application queries.\n\nExpected Output Format:\n1. Deadlock Cycle Visualization\n2. Lock Inversion Root Cause\n3. Corrected Application Transaction Logic (with ID sorting)\n4. Application-Level Retry Pattern (Postgres Error 40P01)",
    "promptText": "Act as a PostgreSQL Internals Specialist. Diagnose and eliminate deadlocks in this high-concurrency database environment.\n\nDeadlock Log Message:\n{{DEADLOCK_LOG}}\n\nTransactions Involved:\n{{TRANSACTION_QUERIES}}\n\nTasks:\n1. Reconstruct the Deadlock Graph:\n   - Which transaction holds Lock A and is waiting for Lock B?\n   - Which transaction holds Lock B and is waiting for Lock A?\n2. Identify why the lock order inverted (e.g. updating items in random order instead of sorted ID order).\n3. Detail how PostgreSQL's Deadlock Detector (`deadlock_timeout`) detects cycles and chooses a transaction to abort.\n4. Provide the architectural fix:\n   - Consistent resource locking order (sorting entity IDs before batch update).\n   - Advisory locks or optimistic concurrency.\n   - Retry loops with exponential backoff on serialization failures.\n5. Provide the corrected application queries.\n\nExpected Output Format:\n1. Deadlock Cycle Visualization\n2. Lock Inversion Root Cause\n3. Corrected Application Transaction Logic (with ID sorting)\n4. Application-Level Retry Pattern (Postgres Error 40P01)",
    "tags": [
      "database",
      "postgres",
      "deadlocks",
      "locking",
      "concurrency",
      "debugging"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{DEADLOCK_LOG}}",
      "{{TRANSACTION_QUERIES}}"
    ],
    "expectedOutput": "Deadlock cycle visualization + root cause + sorted lock order logic + 40P01 retry pattern",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-process-vs-thread-deep-dive",
    "title": "Process vs Thread: Memory Layout, Context Switching & IPC",
    "category": "Core Computer Science",
    "subcategory": "Operating Systems",
    "description": "Deconstructs the precise distinction between Processes and Threads: address spaces, PCB/TCB, context switch overhead, and IPC mechanisms.",
    "prompt": "Act as an Operating Systems Professor and Systems Programming Interviewer. Deliver a masterclass explanation and interview defense on Process vs Thread.\n\nContext / Scenario:\n{{SCENARIO_OR_QUESTION}}\n\nTasks:\n1. Architectural Memory Layout:\n   - Diagram what is shared between threads of the same process (Code segment, Data segment, BSS, Heap, Open file descriptors, Sockets).\n   - Diagram what is private to each individual thread (Stack, Thread Local Storage, Registers, Program Counter, TCB).\n2. Context Switching Cost:\n   - What happens during a Process Context Switch (flushing TLB, switching page directory / CR3 register in x86, cache misses).\n   - What happens during a Thread Context Switch (register swap, stack pointer swap; TLB remains hot).\n3. Inter-Process Communication (IPC):\n   - Pipes, Named Pipes (FIFOs), Shared Memory, Message Queues, Unix Domain Sockets.\n4. Five-Tier Explanation Framework:\n   - Simple Explanation (ELI5 analogy).\n   - Technical Deep-Dive (Kernel data structures: task_struct in Linux).\n   - Real-World Production Example (Node.js single-thread worker threads vs Python multiprocessing vs Chrome multi-process tabs).\n   - Ideal Interview Answer (compact 90-second answer).\n   - 3 Tough Follow-Up Questions an interviewer might ask.\n\nExpected Output Format:\nStructured 5-Tier Masterclass document with ASCII memory diagrams and interview answers.",
    "promptText": "Act as an Operating Systems Professor and Systems Programming Interviewer. Deliver a masterclass explanation and interview defense on Process vs Thread.\n\nContext / Scenario:\n{{SCENARIO_OR_QUESTION}}\n\nTasks:\n1. Architectural Memory Layout:\n   - Diagram what is shared between threads of the same process (Code segment, Data segment, BSS, Heap, Open file descriptors, Sockets).\n   - Diagram what is private to each individual thread (Stack, Thread Local Storage, Registers, Program Counter, TCB).\n2. Context Switching Cost:\n   - What happens during a Process Context Switch (flushing TLB, switching page directory / CR3 register in x86, cache misses).\n   - What happens during a Thread Context Switch (register swap, stack pointer swap; TLB remains hot).\n3. Inter-Process Communication (IPC):\n   - Pipes, Named Pipes (FIFOs), Shared Memory, Message Queues, Unix Domain Sockets.\n4. Five-Tier Explanation Framework:\n   - Simple Explanation (ELI5 analogy).\n   - Technical Deep-Dive (Kernel data structures: task_struct in Linux).\n   - Real-World Production Example (Node.js single-thread worker threads vs Python multiprocessing vs Chrome multi-process tabs).\n   - Ideal Interview Answer (compact 90-second answer).\n   - 3 Tough Follow-Up Questions an interviewer might ask.\n\nExpected Output Format:\nStructured 5-Tier Masterclass document with ASCII memory diagrams and interview answers.",
    "tags": [
      "core-cs",
      "operating-systems",
      "processes",
      "threads",
      "context-switch",
      "ipc",
      "interview-prep"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{SCENARIO_OR_QUESTION}}"
    ],
    "expectedOutput": "5-tier masterclass + memory layout diagram + context switch breakdown + IPC comparison + interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-deadlock-coffman-prevention",
    "title": "Deadlock: The 4 Coffman Conditions & Prevention Strategies",
    "category": "Core Computer Science",
    "subcategory": "Operating Systems",
    "description": "Analyzes deadlocks through Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait, and details prevention and avoidance algorithms.",
    "prompt": "Act as a Concurrency and OS Specialist. Break down Deadlocks, the Coffman conditions, and concrete prevention strategies.\n\nScenario or Concurrency Problem:\n{{DEADLOCK_SCENARIO}}\n\nTasks:\n1. Explain the 4 Coffman Conditions (all 4 must hold simultaneously for a deadlock to exist):\n   - Mutual Exclusion\n   - Hold and Wait\n   - No Preemption\n   - Circular Wait\n2. How to break each condition programmatically:\n   - Breaking Circular Wait: Strict global ordering of resource acquisition (sorting lock IDs).\n   - Breaking Hold and Wait: Atomic acquisition of all locks (all-or-nothing with tryLock).\n   - Breaking No Preemption: Preempting resource or timed timeout rollbacks.\n   - Breaking Mutual Exclusion: Lock-free atomic data structures (CAS, compare-and-swap).\n3. Deadlock Avoidance: Banker's Algorithm (Safe vs Unsafe states).\n4. Deadlock Detection: Resource Allocation Graphs (RAG) and cycle finding.\n5. Provide code demonstrating a deadlocked pattern and its resolved lock-ordered version.\n\nExpected Output Format:\n1. Coffman Conditions Breakdown\n2. Prevention Strategies Matrix\n3. Code Before vs After (Lock Ordering Fix)\n4. Interview Model Answer",
    "promptText": "Act as a Concurrency and OS Specialist. Break down Deadlocks, the Coffman conditions, and concrete prevention strategies.\n\nScenario or Concurrency Problem:\n{{DEADLOCK_SCENARIO}}\n\nTasks:\n1. Explain the 4 Coffman Conditions (all 4 must hold simultaneously for a deadlock to exist):\n   - Mutual Exclusion\n   - Hold and Wait\n   - No Preemption\n   - Circular Wait\n2. How to break each condition programmatically:\n   - Breaking Circular Wait: Strict global ordering of resource acquisition (sorting lock IDs).\n   - Breaking Hold and Wait: Atomic acquisition of all locks (all-or-nothing with tryLock).\n   - Breaking No Preemption: Preempting resource or timed timeout rollbacks.\n   - Breaking Mutual Exclusion: Lock-free atomic data structures (CAS, compare-and-swap).\n3. Deadlock Avoidance: Banker's Algorithm (Safe vs Unsafe states).\n4. Deadlock Detection: Resource Allocation Graphs (RAG) and cycle finding.\n5. Provide code demonstrating a deadlocked pattern and its resolved lock-ordered version.\n\nExpected Output Format:\n1. Coffman Conditions Breakdown\n2. Prevention Strategies Matrix\n3. Code Before vs After (Lock Ordering Fix)\n4. Interview Model Answer",
    "tags": [
      "core-cs",
      "os",
      "deadlocks",
      "coffman-conditions",
      "concurrency",
      "multithreading"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{DEADLOCK_SCENARIO}}"
    ],
    "expectedOutput": "Coffman conditions breakdown + prevention matrix + code before/after + interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-mutex-semaphore-synchronization",
    "title": "Mutex vs Semaphore vs Spinlock Concurrency Primitives",
    "category": "Core Computer Science",
    "subcategory": "Operating Systems",
    "description": "Demystifies synchronization primitives: binary semaphore vs mutex (ownership & priority inversion), counting semaphore, and spinlocks.",
    "prompt": "Act as a Systems Programming and OS Concurrency Engineer. Compare and contrast synchronization primitives with precision.\n\nTopic: Mutex vs Binary Semaphore vs Counting Semaphore vs Spinlock.\n\nSpecific Code / Concurrency Problem:\n{{CONCURRENCY_PROBLEM}}\n\nTasks:\n1. Critical Distinctions:\n   - Ownership: Why a Mutex can ONLY be unlocked by the thread that locked it, whereas a Semaphore can be signaled/posted by ANY thread.\n   - Priority Inversion: How Priority Inheritance Protocols solve priority inversion with Mutexes, but fail with Semaphores.\n   - Spinlock vs Mutex: When busy-waiting on CPU (spin) is faster than kernel context-switching a sleeping thread.\n2. Classical Producer-Consumer Problem:\n   - Demonstrate solution using 1 Mutex + 2 Counting Semaphores (emptyCount, fullCount).\n3. Five-Tier Explanation:\n   - ELI5 Metaphor (Single toilet key vs Parking lot counter).\n   - Technical Engine Mechanics.\n   - Real-World Use Cases.\n   - Model Interview Answer.\n   - 3 Follow-up Questions.\n\nExpected Output Format:\n1. Technical Comparison Table (Mutex vs Semaphore vs Spinlock)\n2. Producer-Consumer Implementation Code\n3. Priority Inversion Deep-Dive\n4. Model Interview Answer",
    "promptText": "Act as a Systems Programming and OS Concurrency Engineer. Compare and contrast synchronization primitives with precision.\n\nTopic: Mutex vs Binary Semaphore vs Counting Semaphore vs Spinlock.\n\nSpecific Code / Concurrency Problem:\n{{CONCURRENCY_PROBLEM}}\n\nTasks:\n1. Critical Distinctions:\n   - Ownership: Why a Mutex can ONLY be unlocked by the thread that locked it, whereas a Semaphore can be signaled/posted by ANY thread.\n   - Priority Inversion: How Priority Inheritance Protocols solve priority inversion with Mutexes, but fail with Semaphores.\n   - Spinlock vs Mutex: When busy-waiting on CPU (spin) is faster than kernel context-switching a sleeping thread.\n2. Classical Producer-Consumer Problem:\n   - Demonstrate solution using 1 Mutex + 2 Counting Semaphores (emptyCount, fullCount).\n3. Five-Tier Explanation:\n   - ELI5 Metaphor (Single toilet key vs Parking lot counter).\n   - Technical Engine Mechanics.\n   - Real-World Use Cases.\n   - Model Interview Answer.\n   - 3 Follow-up Questions.\n\nExpected Output Format:\n1. Technical Comparison Table (Mutex vs Semaphore vs Spinlock)\n2. Producer-Consumer Implementation Code\n3. Priority Inversion Deep-Dive\n4. Model Interview Answer",
    "tags": [
      "core-cs",
      "os",
      "mutex",
      "semaphore",
      "spinlock",
      "concurrency",
      "synchronization"
    ],
    "difficulty": "Intermediate",
    "useCase": "Interview Preparation",
    "variables": [
      "{{CONCURRENCY_PROBLEM}}"
    ],
    "expectedOutput": "Comparison table + producer-consumer code + priority inversion deep-dive + model interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-virtual-memory-paging-tlb",
    "title": "Virtual Memory, Paging, TLB & Page Faults Architecture",
    "category": "Core Computer Science",
    "subcategory": "Operating Systems",
    "description": "Explains how the MMU translates virtual addresses to physical RAM: Page Tables, TLB hits/misses, Page Fault handling, and Thrashing.",
    "prompt": "Act as a Computer Architecture and OS Kernel Specialist. Explain the end-to-end journey of an address translation through Virtual Memory.\n\nQuestion / Problem:\n{{QUESTION_OR_TOPIC}}\n\nTasks:\n1. Virtual Memory Fundamentals: Why do modern operating systems provide virtual address spaces instead of direct physical RAM addressing (protection, fragmentation, isolation)?\n2. Address Translation Walk (MMU):\n   - Virtual Address format: Page Number + Offset.\n   - Translation Lookaside Buffer (TLB): What happens on TLB Hit vs TLB Miss.\n   - Multi-Level Page Tables: Why 64-bit systems require 4 or 5-level page tables to save RAM.\n3. Anatomy of a Page Fault:\n   - Step-by-step kernel sequence from CPU trap to disk swap-in to resume instruction.\n4. Thrashing & Page Replacement:\n   - What causes Thrashing (Working Set size > Physical RAM).\n   - Page replacement algorithms: LRU vs Clock / Second-Chance vs FIFO.\n5. Provide a model interview answer suitable for a Systems / Backend Engineering role.\n\nExpected Output Format:\n1. Architectural Memory Journey Diagram\n2. Step-by-Step Page Fault Lifecyle (1 to 7 steps)\n3. Multi-Level Page Table Math Example\n4. Model Technical Interview Answer",
    "promptText": "Act as a Computer Architecture and OS Kernel Specialist. Explain the end-to-end journey of an address translation through Virtual Memory.\n\nQuestion / Problem:\n{{QUESTION_OR_TOPIC}}\n\nTasks:\n1. Virtual Memory Fundamentals: Why do modern operating systems provide virtual address spaces instead of direct physical RAM addressing (protection, fragmentation, isolation)?\n2. Address Translation Walk (MMU):\n   - Virtual Address format: Page Number + Offset.\n   - Translation Lookaside Buffer (TLB): What happens on TLB Hit vs TLB Miss.\n   - Multi-Level Page Tables: Why 64-bit systems require 4 or 5-level page tables to save RAM.\n3. Anatomy of a Page Fault:\n   - Step-by-step kernel sequence from CPU trap to disk swap-in to resume instruction.\n4. Thrashing & Page Replacement:\n   - What causes Thrashing (Working Set size > Physical RAM).\n   - Page replacement algorithms: LRU vs Clock / Second-Chance vs FIFO.\n5. Provide a model interview answer suitable for a Systems / Backend Engineering role.\n\nExpected Output Format:\n1. Architectural Memory Journey Diagram\n2. Step-by-Step Page Fault Lifecyle (1 to 7 steps)\n3. Multi-Level Page Table Math Example\n4. Model Technical Interview Answer",
    "tags": [
      "core-cs",
      "os",
      "virtual-memory",
      "paging",
      "tlb",
      "page-faults",
      "memory-management"
    ],
    "difficulty": "Advanced",
    "useCase": "Interview Preparation",
    "variables": [
      "{{QUESTION_OR_TOPIC}}"
    ],
    "expectedOutput": "Memory journey diagram + page fault lifecycle + page table math + model interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-cpu-scheduling-algorithms",
    "title": "CPU Scheduling Algorithms: FCFS, Round Robin, Priority & MLFQ",
    "category": "Core Computer Science",
    "subcategory": "Operating Systems",
    "description": "Compares CPU scheduling algorithms: calculating Turnaround Time and Waiting Time for FCFS, SJF, Round Robin, and Linux CFS (Completely Fair Scheduler).",
    "prompt": "Act as an Operating Systems Professor. Analyze CPU scheduling algorithms and calculate performance metrics for this workload.\n\nProcess Workload (Arrival times & Burst times):\n{{PROCESS_BURST_TIMES}}\n\nTasks:\n1. Compare Scheduling Algorithms:\n   - FCFS (First-Come, First-Served) - Convoy effect.\n   - SJF / SRTF (Shortest Job First / Shortest Remaining Time First) - Starvation risk.\n   - Round Robin (RR) - Time quantum tuning (too large -> FCFS; too small -> context switch thrashing).\n   - Multi-Level Feedback Queue (MLFQ) - Dynamic priority aging.\n   - Linux CFS (Completely Fair Scheduler) - Red-black tree and vruntime.\n2. Draw a Gantt Chart for the specified workload under Round Robin and calculate:\n   - Turnaround Time per process and average.\n   - Waiting Time per process and average.\n3. Provide an elite interview response explaining the trade-offs of CPU-bound vs I/O-bound scheduling.\n\nExpected Output Format:\n1. Gantt Chart Visualization\n2. Turnaround & Waiting Time Math Calculation Table\n3. Scheduling Algorithm Trade-Off Matrix\n4. Modern Linux CFS (vruntime) Insight",
    "promptText": "Act as an Operating Systems Professor. Analyze CPU scheduling algorithms and calculate performance metrics for this workload.\n\nProcess Workload (Arrival times & Burst times):\n{{PROCESS_BURST_TIMES}}\n\nTasks:\n1. Compare Scheduling Algorithms:\n   - FCFS (First-Come, First-Served) - Convoy effect.\n   - SJF / SRTF (Shortest Job First / Shortest Remaining Time First) - Starvation risk.\n   - Round Robin (RR) - Time quantum tuning (too large -> FCFS; too small -> context switch thrashing).\n   - Multi-Level Feedback Queue (MLFQ) - Dynamic priority aging.\n   - Linux CFS (Completely Fair Scheduler) - Red-black tree and vruntime.\n2. Draw a Gantt Chart for the specified workload under Round Robin and calculate:\n   - Turnaround Time per process and average.\n   - Waiting Time per process and average.\n3. Provide an elite interview response explaining the trade-offs of CPU-bound vs I/O-bound scheduling.\n\nExpected Output Format:\n1. Gantt Chart Visualization\n2. Turnaround & Waiting Time Math Calculation Table\n3. Scheduling Algorithm Trade-Off Matrix\n4. Modern Linux CFS (vruntime) Insight",
    "tags": [
      "core-cs",
      "os",
      "cpu-scheduling",
      "round-robin",
      "turnaround-time",
      "gantt-chart"
    ],
    "difficulty": "Intermediate",
    "useCase": "Interview Preparation",
    "variables": [
      "{{PROCESS_BURST_TIMES}}"
    ],
    "expectedOutput": "Gantt chart + calculation table + scheduling matrix + Linux CFS vruntime insight",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-osi-vs-tcpip-model",
    "title": "OSI 7-Layer vs TCP/IP Protocol Suite & Packet Encapsulation",
    "category": "Core Computer Science",
    "subcategory": "Computer Networks",
    "description": "Walks through every layer of the network stack from Application (HTTP) down to Physical bits, detailing packet encapsulation and headers.",
    "prompt": "Act as a Senior Network Architect. Provide an exhaustive, interview-grade breakdown of the OSI 7-Layer Model versus the TCP/IP Protocol Suite.\n\nQuestion Context:\n{{QUESTION_OR_SCENARIO}}\n\nTasks:\n1. Side-by-Side Comparison:\n   - Map each OSI layer (Application, Presentation, Session, Transport, Network, Data Link, Physical) to the 4/5-layer TCP/IP Model.\n2. Packet Encapsulation & Decapsulation (PDU Journey):\n   - Trace a user clicking a button in a browser: Data -> Segment (TCP header with ports) -> Packet (IP header with IP addresses) -> Frame (Ethernet header with MAC addresses) -> Bits (Physical wire/radio).\n3. Hardware Mapping:\n   - Which device operates at which layer? (Layer 7 Load Balancers, Layer 4 Proxies, Layer 3 Routers, Layer 2 Switches, Layer 1 Hubs/Cables).\n4. Five-Tier Explanation:\n   - ELI5 Postal Service Analogy.\n   - Technical Packet Headers Deep-Dive.\n   - Real-World Production Example (Why Wireshark shows encapsulated frames).\n   - Model Interview Answer.\n   - 3 Follow-Up Curveball Questions.\n\nExpected Output Format:\n1. Layer Mapping Matrix Table\n2. Packet Encapsulation Diagram (Headers Added at Each Stage)\n3. Layer Hardware & Protocol Catalog\n4. Model Interview Answer",
    "promptText": "Act as a Senior Network Architect. Provide an exhaustive, interview-grade breakdown of the OSI 7-Layer Model versus the TCP/IP Protocol Suite.\n\nQuestion Context:\n{{QUESTION_OR_SCENARIO}}\n\nTasks:\n1. Side-by-Side Comparison:\n   - Map each OSI layer (Application, Presentation, Session, Transport, Network, Data Link, Physical) to the 4/5-layer TCP/IP Model.\n2. Packet Encapsulation & Decapsulation (PDU Journey):\n   - Trace a user clicking a button in a browser: Data -> Segment (TCP header with ports) -> Packet (IP header with IP addresses) -> Frame (Ethernet header with MAC addresses) -> Bits (Physical wire/radio).\n3. Hardware Mapping:\n   - Which device operates at which layer? (Layer 7 Load Balancers, Layer 4 Proxies, Layer 3 Routers, Layer 2 Switches, Layer 1 Hubs/Cables).\n4. Five-Tier Explanation:\n   - ELI5 Postal Service Analogy.\n   - Technical Packet Headers Deep-Dive.\n   - Real-World Production Example (Why Wireshark shows encapsulated frames).\n   - Model Interview Answer.\n   - 3 Follow-Up Curveball Questions.\n\nExpected Output Format:\n1. Layer Mapping Matrix Table\n2. Packet Encapsulation Diagram (Headers Added at Each Stage)\n3. Layer Hardware & Protocol Catalog\n4. Model Interview Answer",
    "tags": [
      "core-cs",
      "computer-networks",
      "osi-model",
      "tcp-ip",
      "networking",
      "encapsulation"
    ],
    "difficulty": "Beginner",
    "useCase": "Interview Preparation",
    "variables": [
      "{{QUESTION_OR_SCENARIO}}"
    ],
    "expectedOutput": "Layer mapping matrix + encapsulation diagram + hardware catalog + model interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-tcp-handshake-flow-congestion",
    "title": "TCP 3-Way Handshake, Flow Control, AIMD & 4-Way Teardown",
    "category": "Core Computer Science",
    "subcategory": "Computer Networks",
    "description": "Explains reliable transport mechanics: SYN-SYN/ACK-ACK handshake, sequence/ack numbers, Sliding Window flow control, and TCP Congestion Control (AIMD).",
    "prompt": "Act as a Transport Layer Protocol Engineer. Deliver an in-depth technical analysis of TCP connection lifecycles and reliability mechanics.\n\nQuestion / Problem:\n{{TOPIC_OR_SCENARIO}}\n\nTasks:\n1. Connection Establishment (3-Way Handshake):\n   - Step 1: SYN (Seq=X).\n   - Step 2: SYN-ACK (Seq=Y, Ack=X+1).\n   - Step 3: ACK (Seq=X+1, Ack=Y+1).\n   - Why 3 steps instead of 2? (Preventing old delayed duplicate connections).\n   - SYN Flood attacks & SYN Cookies defense.\n2. Reliability & Flow Control:\n   - Sliding Window Protocol: Receiver Window (rwnd) advertising buffer capacity.\n3. Congestion Control:\n   - Slow Start, Congestion Avoidance (AIMD - Additive Increase Multiplicative Decrease), Fast Retransmit (3 duplicate ACKs), Fast Recovery.\n4. Connection Termination (4-Way Handshake):\n   - FIN -> ACK -> FIN -> ACK.\n   - Why the `TIME_WAIT` state (2*MSL) is essential (draining delayed packets and ensuring final ACK was received).\n5. Model Interview Answer.\n\nExpected Output Format:\n1. 3-Way Handshake Diagram with Sequence Numbers\n2. Flow Control vs Congestion Control Distinction\n3. 4-Way Teardown & TIME_WAIT Explanation\n4. 90-Second Interview Pitch",
    "promptText": "Act as a Transport Layer Protocol Engineer. Deliver an in-depth technical analysis of TCP connection lifecycles and reliability mechanics.\n\nQuestion / Problem:\n{{TOPIC_OR_SCENARIO}}\n\nTasks:\n1. Connection Establishment (3-Way Handshake):\n   - Step 1: SYN (Seq=X).\n   - Step 2: SYN-ACK (Seq=Y, Ack=X+1).\n   - Step 3: ACK (Seq=X+1, Ack=Y+1).\n   - Why 3 steps instead of 2? (Preventing old delayed duplicate connections).\n   - SYN Flood attacks & SYN Cookies defense.\n2. Reliability & Flow Control:\n   - Sliding Window Protocol: Receiver Window (rwnd) advertising buffer capacity.\n3. Congestion Control:\n   - Slow Start, Congestion Avoidance (AIMD - Additive Increase Multiplicative Decrease), Fast Retransmit (3 duplicate ACKs), Fast Recovery.\n4. Connection Termination (4-Way Handshake):\n   - FIN -> ACK -> FIN -> ACK.\n   - Why the `TIME_WAIT` state (2*MSL) is essential (draining delayed packets and ensuring final ACK was received).\n5. Model Interview Answer.\n\nExpected Output Format:\n1. 3-Way Handshake Diagram with Sequence Numbers\n2. Flow Control vs Congestion Control Distinction\n3. 4-Way Teardown & TIME_WAIT Explanation\n4. 90-Second Interview Pitch",
    "tags": [
      "core-cs",
      "tcp",
      "networking",
      "handshake",
      "congestion-control",
      "time-wait"
    ],
    "difficulty": "Advanced",
    "useCase": "Interview Preparation",
    "variables": [
      "{{TOPIC_OR_SCENARIO}}"
    ],
    "expectedOutput": "Handshake diagram + flow/congestion control distinction + teardown analysis + model interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-dns-resolution-walkthrough",
    "title": "What Happens When You Type a URL in a Browser: DNS to Render",
    "category": "Core Computer Science",
    "subcategory": "Computer Networks",
    "description": "The canonical software engineering interview question: step-by-step trace from browser keystroke to DNS resolution, TCP handshake, TLS 1.3, HTTP/2, and DOM parsing.",
    "prompt": "Act as a Senior FAANG Engineering Interviewer. Provide the definitive, exhaustive answer to: \"What happens when you type https://www.google.com in a browser and press Enter?\"\n\nDetail Level:\n{{TARGET_DEPTH}}\n\nTasks:\n1. Keystroke & Browser Prep:\n   - HSTS preload check, URL parsing, browser cache inspection.\n2. DNS Resolution Walk:\n   - Browser DNS Cache -> OS Cache (hosts file / DNS client) -> Local DNS Resolver (ISP/Router) -> Root Nameservers (.) -> TLD Nameservers (.com) -> Authoritative Nameservers.\n   - Record types (A, AAAA, CNAME).\n3. Transport & Security Handshake:\n   - ARP resolution for local gateway MAC address.\n   - TCP 3-Way Handshake.\n   - TLS 1.3 Handshake (ClientHello, Key Share, ServerHello, encrypted extensions, session resumption).\n4. HTTP Request & Server Processing:\n   - HTTP GET request sent over TLS tunnel.\n   - Load balancer / Reverse Proxy (Nginx) terminating TLS and routing to web server.\n5. Browser Rendering Engine Pipeline:\n   - Critical Rendering Path: HTML parsing -> DOM tree -> CSSOM tree -> Render Tree -> Layout (Reflow) -> Paint -> Compositing.\n6. Summary / 2-minute elevator pitch for an interview.\n\nExpected Output Format:\nChronological 6-phase journey with protocols labeled at every hop + concise 2-minute interview summary.",
    "promptText": "Act as a Senior FAANG Engineering Interviewer. Provide the definitive, exhaustive answer to: \"What happens when you type https://www.google.com in a browser and press Enter?\"\n\nDetail Level:\n{{TARGET_DEPTH}}\n\nTasks:\n1. Keystroke & Browser Prep:\n   - HSTS preload check, URL parsing, browser cache inspection.\n2. DNS Resolution Walk:\n   - Browser DNS Cache -> OS Cache (hosts file / DNS client) -> Local DNS Resolver (ISP/Router) -> Root Nameservers (.) -> TLD Nameservers (.com) -> Authoritative Nameservers.\n   - Record types (A, AAAA, CNAME).\n3. Transport & Security Handshake:\n   - ARP resolution for local gateway MAC address.\n   - TCP 3-Way Handshake.\n   - TLS 1.3 Handshake (ClientHello, Key Share, ServerHello, encrypted extensions, session resumption).\n4. HTTP Request & Server Processing:\n   - HTTP GET request sent over TLS tunnel.\n   - Load balancer / Reverse Proxy (Nginx) terminating TLS and routing to web server.\n5. Browser Rendering Engine Pipeline:\n   - Critical Rendering Path: HTML parsing -> DOM tree -> CSSOM tree -> Render Tree -> Layout (Reflow) -> Paint -> Compositing.\n6. Summary / 2-minute elevator pitch for an interview.\n\nExpected Output Format:\nChronological 6-phase journey with protocols labeled at every hop + concise 2-minute interview summary.",
    "tags": [
      "core-cs",
      "dns",
      "networking",
      "url-to-browser",
      "interview-prep",
      "critical-rendering-path"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{TARGET_DEPTH}}"
    ],
    "expectedOutput": "Chronological 6-phase journey from DNS to render + protocols breakdown + 2-minute interview summary",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-http-evolution-http3-quic",
    "title": "HTTP Evolution: HTTP/1.1 vs HTTP/2 (Multiplexing) vs HTTP/3 (QUIC)",
    "category": "Core Computer Science",
    "subcategory": "Computer Networks",
    "description": "Traces the evolution of web protocols: Head-of-Line blocking in HTTP/1.1, binary framing in HTTP/2, and UDP-based QUIC in HTTP/3.",
    "prompt": "Act as a Web Protocols and Performance Specialist. Contrast HTTP/1.1, HTTP/2, and HTTP/3.\n\nDiscussion Context:\n{{CONTEXT}}\n\nTasks:\n1. HTTP/1.1 Limitations:\n   - Head-of-Line (HoL) Blocking at the application layer.\n   - Domain sharding and browser 6-connection limits per host.\n   - Heavy uncompressed plaintext headers.\n2. HTTP/2 Innovations & Remaining Flaw:\n   - Binary Framing Layer.\n   - Multiplexing: Multiple bi-directional streams over a single TCP connection.\n   - HPACK header compression.\n   - Server Push.\n   - TCP-Level Head-of-Line Blocking: A single dropped packet stalls ALL multiplexed streams!\n3. HTTP/3 with QUIC (Quick UDP Internet Connections):\n   - Why QUIC is built on UDP instead of TCP.\n   - Independent streams (packet loss on stream A does not stall stream B).\n   - 0-RTT Connection Establishment (combining transport and TLS 1.3 handshakes).\n   - Connection Migration (surviving IP changes from Wi-Fi to Cellular).\n4. Side-by-side comparison table and interview answer.\n\nExpected Output Format:\n1. Protocol Evolution Timeline\n2. Head-of-Line Blocking Mechanics Comparison\n3. Technical Scorecard Table (Transport, Framing, Encryption, Handshake RTT)\n4. Model Interview Answer",
    "promptText": "Act as a Web Protocols and Performance Specialist. Contrast HTTP/1.1, HTTP/2, and HTTP/3.\n\nDiscussion Context:\n{{CONTEXT}}\n\nTasks:\n1. HTTP/1.1 Limitations:\n   - Head-of-Line (HoL) Blocking at the application layer.\n   - Domain sharding and browser 6-connection limits per host.\n   - Heavy uncompressed plaintext headers.\n2. HTTP/2 Innovations & Remaining Flaw:\n   - Binary Framing Layer.\n   - Multiplexing: Multiple bi-directional streams over a single TCP connection.\n   - HPACK header compression.\n   - Server Push.\n   - TCP-Level Head-of-Line Blocking: A single dropped packet stalls ALL multiplexed streams!\n3. HTTP/3 with QUIC (Quick UDP Internet Connections):\n   - Why QUIC is built on UDP instead of TCP.\n   - Independent streams (packet loss on stream A does not stall stream B).\n   - 0-RTT Connection Establishment (combining transport and TLS 1.3 handshakes).\n   - Connection Migration (surviving IP changes from Wi-Fi to Cellular).\n4. Side-by-side comparison table and interview answer.\n\nExpected Output Format:\n1. Protocol Evolution Timeline\n2. Head-of-Line Blocking Mechanics Comparison\n3. Technical Scorecard Table (Transport, Framing, Encryption, Handshake RTT)\n4. Model Interview Answer",
    "tags": [
      "core-cs",
      "http",
      "http2",
      "http3",
      "quic",
      "networking",
      "performance"
    ],
    "difficulty": "Intermediate",
    "useCase": "Interview Preparation",
    "variables": [
      "{{CONTEXT}}"
    ],
    "expectedOutput": "Protocol timeline + HoL blocking comparison + technical scorecard + model interview answer",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-realtime-websockets-vs-sse",
    "title": "Real-Time Web: WebSockets vs Server-Sent Events (SSE) vs Polling",
    "category": "Core Computer Science",
    "subcategory": "Computer Networks",
    "description": "Selects the right real-time architecture: bidirectional full-duplex WebSockets vs unidirectional HTTP-native Server-Sent Events vs Short/Long Polling.",
    "prompt": "Act as a Real-Time Systems Architect. Compare and select the optimal real-time communication protocol for this application.\n\nApplication Use Case:\n{{APPLICATION_USE_CASE}}\n\nTasks:\n1. Protocol Mechanics Breakdown:\n   - Short Polling: Periodic HTTP requests (high overhead, server flooding).\n   - Long Polling: Server holds connection open until data arrives (connection churn).\n   - Server-Sent Events (SSE): Unidirectional server-to-client streaming over standard HTTP/2 (automatic reconnects, simple text protocol, proxy-friendly).\n   - WebSockets: Full-duplex bidirectional TCP stream initiated via HTTP Upgrade handshake (low latency, custom binary/text frames, stateful connections).\n2. Evaluation Criteria:\n   - Directionality (Is client-to-server traffic frequent?).\n   - Connection statefulness and load balancing difficulty.\n   - Firewall and corporate proxy compatibility.\n   - Mobile battery and reconnection resilience.\n3. Final Architecture Recommendation with code snippets (client and server).\n\nExpected Output Format:\n1. Protocol Comparison Matrix\n2. Architectural Trade-offs & Decision Logic\n3. Server-Sent Events Implementation Snippet\n4. WebSocket Implementation Snippet",
    "promptText": "Act as a Real-Time Systems Architect. Compare and select the optimal real-time communication protocol for this application.\n\nApplication Use Case:\n{{APPLICATION_USE_CASE}}\n\nTasks:\n1. Protocol Mechanics Breakdown:\n   - Short Polling: Periodic HTTP requests (high overhead, server flooding).\n   - Long Polling: Server holds connection open until data arrives (connection churn).\n   - Server-Sent Events (SSE): Unidirectional server-to-client streaming over standard HTTP/2 (automatic reconnects, simple text protocol, proxy-friendly).\n   - WebSockets: Full-duplex bidirectional TCP stream initiated via HTTP Upgrade handshake (low latency, custom binary/text frames, stateful connections).\n2. Evaluation Criteria:\n   - Directionality (Is client-to-server traffic frequent?).\n   - Connection statefulness and load balancing difficulty.\n   - Firewall and corporate proxy compatibility.\n   - Mobile battery and reconnection resilience.\n3. Final Architecture Recommendation with code snippets (client and server).\n\nExpected Output Format:\n1. Protocol Comparison Matrix\n2. Architectural Trade-offs & Decision Logic\n3. Server-Sent Events Implementation Snippet\n4. WebSocket Implementation Snippet",
    "tags": [
      "core-cs",
      "websockets",
      "sse",
      "realtime",
      "networking",
      "system-design"
    ],
    "difficulty": "Intermediate",
    "useCase": "Architecture Review",
    "variables": [
      "{{APPLICATION_USE_CASE}}"
    ],
    "expectedOutput": "Comparison matrix + trade-off decision logic + SSE code snippet + WebSocket code snippet",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "cs-oop-solid-design-patterns",
    "title": "OOP 4 Pillars, SOLID Principles & Design Patterns Framework",
    "category": "Core Computer Science",
    "subcategory": "OOP",
    "description": "Synthesizes Encapsulation, Inheritance, Polymorphism, Abstraction, and SOLID principles with real-world design pattern implementations.",
    "prompt": "Act as an Object-Oriented Software Design Specialist and Interviewer. Deliver a rigorous technical breakdown of OOP principles and design patterns.\n\nTarget Concept or Question:\n{{OOP_CONCEPT_OR_QUESTION}}\n\nTasks:\n1. The 4 Pillars of OOP:\n   - Encapsulation: Data hiding and access modifiers.\n   - Abstraction: Hiding implementation complexity behind contracts.\n   - Inheritance: Code reuse (\"is-a\" relationship) and why Composition is preferred over Inheritance.\n   - Polymorphism: Compile-time (method overloading / templates) vs Runtime (Virtual Tables / dynamic dispatch).\n2. The 5 SOLID Principles:\n   - Single Responsibility (SRP)\n   - Open/Closed (OCP)\n   - Liskov Substitution (LSP)\n   - Interface Segregation (ISP)\n   - Dependency Inversion (DIP)\n3. Canonical Design Pattern Implementation:\n   - Provide clean code demonstrating a matching pattern (Factory, Singleton, Observer, Strategy, or Decorator) in {{PREFERRED_LANGUAGE}}.\n4. Model interview answer explaining how you apply these in daily production engineering.\n\nExpected Output Format:\n1. 4 Pillars Mechanics & VTable Explanation\n2. SOLID Principles with Code Counter-Examples\n3. Design Pattern Implementation in {{PREFERRED_LANGUAGE}}\n4. Model Interview Pitch",
    "promptText": "Act as an Object-Oriented Software Design Specialist and Interviewer. Deliver a rigorous technical breakdown of OOP principles and design patterns.\n\nTarget Concept or Question:\n{{OOP_CONCEPT_OR_QUESTION}}\n\nTasks:\n1. The 4 Pillars of OOP:\n   - Encapsulation: Data hiding and access modifiers.\n   - Abstraction: Hiding implementation complexity behind contracts.\n   - Inheritance: Code reuse (\"is-a\" relationship) and why Composition is preferred over Inheritance.\n   - Polymorphism: Compile-time (method overloading / templates) vs Runtime (Virtual Tables / dynamic dispatch).\n2. The 5 SOLID Principles:\n   - Single Responsibility (SRP)\n   - Open/Closed (OCP)\n   - Liskov Substitution (LSP)\n   - Interface Segregation (ISP)\n   - Dependency Inversion (DIP)\n3. Canonical Design Pattern Implementation:\n   - Provide clean code demonstrating a matching pattern (Factory, Singleton, Observer, Strategy, or Decorator) in {{PREFERRED_LANGUAGE}}.\n4. Model interview answer explaining how you apply these in daily production engineering.\n\nExpected Output Format:\n1. 4 Pillars Mechanics & VTable Explanation\n2. SOLID Principles with Code Counter-Examples\n3. Design Pattern Implementation in {{PREFERRED_LANGUAGE}}\n4. Model Interview Pitch",
    "tags": [
      "core-cs",
      "oop",
      "solid",
      "design-patterns",
      "polymorphism",
      "inheritance"
    ],
    "difficulty": "Intermediate",
    "useCase": "Interview Preparation",
    "variables": [
      "{{OOP_CONCEPT_OR_QUESTION}}",
      "{{PREFERRED_LANGUAGE}}"
    ],
    "expectedOutput": "4 pillars with VTable mechanics + SOLID counter-examples + design pattern code + interview pitch",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-interview-master-template",
    "title": "System Design Interview: 45-Minute Master Blueprint",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "The definitive 7-step FAANG framework for driving a 45-minute High-Level System Design interview from ambiguity to deep dives.",
    "prompt": "Act as a Staff Principal Architect at Meta/Google and System Design Interviewer. Conduct a complete 45-minute system design interview session for:\n\nTarget System:\n{{SYSTEM_NAME}}\n\nExpected Scale:\n{{SCALE_METRICS}}\n\nStructure the design strictly following this 7-step framework:\n1. Requirements & Scope Clarification (5 mins):\n   - Functional Requirements (top 3-4 features).\n   - Non-Functional Requirements (Availability, Latency SLAs, Durability, Consistency model).\n2. Back-of-the-Envelope Capacity Estimations (5 mins):\n   - Daily Active Users (DAU), Read/Write QPS (Queries Per Second), Storage per year, Bandwidth ingress/egress.\n3. API Design (5 mins):\n   - Core REST / gRPC endpoint definitions with payload schemas and idempotency headers.\n4. Data Modeling & Database Selection (5 mins):\n   - Relational vs NoSQL choice. Schema entities, primary keys, foreign keys, and indexes.\n5. High-Level Architecture Diagram (10 mins):\n   - Client -> DNS / CDN -> Load Balancers (L4 vs L7) -> API Gateway -> Microservices -> Cache Layer -> Database -> Async Message Queues (Kafka).\n6. Deep-Dive Bottlenecks & Edge Cases (10 mins):\n   - Single points of failure (SPOF), partition tolerance, hot partitions / celebrity problem, cache stampede mitigation.\n7. Trade-offs & Summary (5 mins):\n   - CAP theorem compromises, operational complexity, and monitoring/alerting.\n\nExpected Output Format:\nComprehensive, structured System Design Document with ASCII component architecture diagram and mathematical capacity derivation.",
    "promptText": "Act as a Staff Principal Architect at Meta/Google and System Design Interviewer. Conduct a complete 45-minute system design interview session for:\n\nTarget System:\n{{SYSTEM_NAME}}\n\nExpected Scale:\n{{SCALE_METRICS}}\n\nStructure the design strictly following this 7-step framework:\n1. Requirements & Scope Clarification (5 mins):\n   - Functional Requirements (top 3-4 features).\n   - Non-Functional Requirements (Availability, Latency SLAs, Durability, Consistency model).\n2. Back-of-the-Envelope Capacity Estimations (5 mins):\n   - Daily Active Users (DAU), Read/Write QPS (Queries Per Second), Storage per year, Bandwidth ingress/egress.\n3. API Design (5 mins):\n   - Core REST / gRPC endpoint definitions with payload schemas and idempotency headers.\n4. Data Modeling & Database Selection (5 mins):\n   - Relational vs NoSQL choice. Schema entities, primary keys, foreign keys, and indexes.\n5. High-Level Architecture Diagram (10 mins):\n   - Client -> DNS / CDN -> Load Balancers (L4 vs L7) -> API Gateway -> Microservices -> Cache Layer -> Database -> Async Message Queues (Kafka).\n6. Deep-Dive Bottlenecks & Edge Cases (10 mins):\n   - Single points of failure (SPOF), partition tolerance, hot partitions / celebrity problem, cache stampede mitigation.\n7. Trade-offs & Summary (5 mins):\n   - CAP theorem compromises, operational complexity, and monitoring/alerting.\n\nExpected Output Format:\nComprehensive, structured System Design Document with ASCII component architecture diagram and mathematical capacity derivation.",
    "tags": [
      "system-design",
      "architecture",
      "scalability",
      "interview-prep",
      "hld",
      "faang"
    ],
    "difficulty": "Interview",
    "useCase": "System Design",
    "variables": [
      "{{SYSTEM_NAME}}",
      "{{SCALE_METRICS}}"
    ],
    "expectedOutput": "Complete 7-step HLD document with capacity math, API contracts, schema, ASCII architecture, and deep dives",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-url-shortener",
    "title": "Design a High-Scale URL Shortener (TinyURL / Bitly)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Designs a globally distributed URL shortener handling 100M new URLs/month: Base62 encoding, Key Generation Service (KGS), 301 vs 302 redirects, and caching.",
    "prompt": "Act as a Principal Cloud Architect. Deliver an end-to-end High-Level System Design for a scalable URL shortener service (like TinyURL or Bitly).\n\nScale & Constraints:\n{{SCALE_AND_CONSTRAINTS}}\n\nTasks:\n1. Functional Requirements:\n   - Given a long URL, generate a short alias (e.g. 7 characters).\n   - Given a short alias, redirect the user to original long URL in <10ms.\n   - Custom aliases and optional URL expiration.\n2. Capacity Estimation:\n   - 100M URLs generated per month -> QPS write, QPS read (100:1 read-to-write ratio).\n   - Storage calculation for 5 years retention.\n3. Core Hash / Shortening Algorithm:\n   - MD5 / SHA-256 truncation vs Base62 Encoding ([a-z, A-Z, 0-9] = 62^7 = 3.5 trillion URLs).\n   - Collision resolution: Key Generation Service (KGS) pre-generating unique random keys to eliminate database collision checks.\n4. Redirection Status Code:\n   - 301 Permanent Redirect (Browser caches, reduces server load, but loses analytics) vs 302 Found (Every request hits server for click analytics).\n5. Architecture & Caching:\n   - Redis cluster caching top 20% URLs (80/20 Pareto rule).\n   - Relational DB (PostgreSQL) vs NoSQL (Cassandra/DynamoDB) justification.\n\nExpected Output Format:\n1. Capacity Estimation Math\n2. Base62 & KGS Architecture Design\n3. 301 vs 302 Trade-off Analysis\n4. End-to-End System Architecture Diagram\n5. Database Schema & Indexing",
    "promptText": "Act as a Principal Cloud Architect. Deliver an end-to-end High-Level System Design for a scalable URL shortener service (like TinyURL or Bitly).\n\nScale & Constraints:\n{{SCALE_AND_CONSTRAINTS}}\n\nTasks:\n1. Functional Requirements:\n   - Given a long URL, generate a short alias (e.g. 7 characters).\n   - Given a short alias, redirect the user to original long URL in <10ms.\n   - Custom aliases and optional URL expiration.\n2. Capacity Estimation:\n   - 100M URLs generated per month -> QPS write, QPS read (100:1 read-to-write ratio).\n   - Storage calculation for 5 years retention.\n3. Core Hash / Shortening Algorithm:\n   - MD5 / SHA-256 truncation vs Base62 Encoding ([a-z, A-Z, 0-9] = 62^7 = 3.5 trillion URLs).\n   - Collision resolution: Key Generation Service (KGS) pre-generating unique random keys to eliminate database collision checks.\n4. Redirection Status Code:\n   - 301 Permanent Redirect (Browser caches, reduces server load, but loses analytics) vs 302 Found (Every request hits server for click analytics).\n5. Architecture & Caching:\n   - Redis cluster caching top 20% URLs (80/20 Pareto rule).\n   - Relational DB (PostgreSQL) vs NoSQL (Cassandra/DynamoDB) justification.\n\nExpected Output Format:\n1. Capacity Estimation Math\n2. Base62 & KGS Architecture Design\n3. 301 vs 302 Trade-off Analysis\n4. End-to-End System Architecture Diagram\n5. Database Schema & Indexing",
    "tags": [
      "system-design",
      "tinyurl",
      "url-shortener",
      "base62",
      "caching",
      "redis"
    ],
    "difficulty": "Intermediate",
    "useCase": "System Design",
    "variables": [
      "{{SCALE_AND_CONSTRAINTS}}"
    ],
    "expectedOutput": "Capacity math + Base62/KGS design + 301 vs 302 comparison + architecture diagram + DB schema",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-realtime-chat",
    "title": "Design a Real-Time Scalable Chat App (WhatsApp / Slack)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects a real-time messaging platform: persistent WebSocket gateways, message fan-out via Kafka, presence servers, and message delivery receipts.",
    "prompt": "Act as a Distributed Systems Specialist. Design a real-time 1-on-1 and group chat system capable of handling 500 million active users.\n\nRequirements & Scale:\n{{CHAT_REQUIREMENTS}}\n\nTasks:\n1. Network & Protocol Layer:\n   - Persistent WebSocket connections vs HTTP long-polling.\n   - Connection Gateway Servers: Managing millions of concurrent idle TCP/WebSocket connections.\n2. Message Delivery Lifecycle:\n   - User A sends message -> Gateway -> Message Service -> Kafka Partition -> Target Gateway -> User B.\n   - Message Delivery Status Receipts: Sent (1 check), Delivered (2 checks), Read (blue checks).\n3. Offline Messaging:\n   - Storing undelivered messages in a queue and pushing via APNs / FCM push notifications when user is offline.\n4. Presence Service:\n   - Tracking online/offline status using heartbeat pings in Redis with TTL expiration.\n5. Group Chat Fan-Out:\n   - Small groups (fan-out on write to all participant queues).\n   - Large channels (fan-out on read).\n6. Data Store Selection:\n   - Cassandra / HBase for high-write chat history vs PostgreSQL for user profiles.\n\nExpected Output Format:\n1. Message Delivery Sequence Diagram\n2. WebSocket Gateway Cluster Architecture\n3. Presence Service Architecture\n4. Database Schema (Messages, Conversations, Participants)\n5. Group Chat Scaling Strategy",
    "promptText": "Act as a Distributed Systems Specialist. Design a real-time 1-on-1 and group chat system capable of handling 500 million active users.\n\nRequirements & Scale:\n{{CHAT_REQUIREMENTS}}\n\nTasks:\n1. Network & Protocol Layer:\n   - Persistent WebSocket connections vs HTTP long-polling.\n   - Connection Gateway Servers: Managing millions of concurrent idle TCP/WebSocket connections.\n2. Message Delivery Lifecycle:\n   - User A sends message -> Gateway -> Message Service -> Kafka Partition -> Target Gateway -> User B.\n   - Message Delivery Status Receipts: Sent (1 check), Delivered (2 checks), Read (blue checks).\n3. Offline Messaging:\n   - Storing undelivered messages in a queue and pushing via APNs / FCM push notifications when user is offline.\n4. Presence Service:\n   - Tracking online/offline status using heartbeat pings in Redis with TTL expiration.\n5. Group Chat Fan-Out:\n   - Small groups (fan-out on write to all participant queues).\n   - Large channels (fan-out on read).\n6. Data Store Selection:\n   - Cassandra / HBase for high-write chat history vs PostgreSQL for user profiles.\n\nExpected Output Format:\n1. Message Delivery Sequence Diagram\n2. WebSocket Gateway Cluster Architecture\n3. Presence Service Architecture\n4. Database Schema (Messages, Conversations, Participants)\n5. Group Chat Scaling Strategy",
    "tags": [
      "system-design",
      "chat",
      "websockets",
      "kafka",
      "cassandra",
      "whatsapp",
      "slack"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{CHAT_REQUIREMENTS}}"
    ],
    "expectedOutput": "Message sequence diagram + WebSocket gateway cluster + presence service + DB schema + group chat scaling",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-video-streaming",
    "title": "Design a Video Streaming Platform (YouTube / Netflix)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects video ingestion, chunking, adaptive bitrate transcoding (HLS/DASH), geo-distributed CDN caching, and recommendation feeds.",
    "prompt": "Act as a Media Infrastructure and Cloud Systems Architect. Design a video upload, transcoding, and global streaming architecture like YouTube or Netflix.\n\nScale & Requirements:\n{{STREAMING_REQUIREMENTS}}\n\nTasks:\n1. Video Ingestion Pipeline:\n   - Chunked / Resumable multi-part upload to Object Storage (AWS S3).\n   - Message queue triggering asynchronous video transcoding.\n2. Transcoding & Adaptive Bitrate Streaming:\n   - Encoding into multiple resolutions (1080p, 720p, 480p, 360p) and formats (H.264, VP9, AV1).\n   - Chunking video into 4-6 second segments using HLS (.m3u8 index) and MPEG-DASH.\n   - Client dynamically switching bitrates based on available bandwidth.\n3. Content Delivery Network (CDN):\n   - Edge CDN caching strategy (caching initial chunks for instant video start).\n   - Geo-distributed Edge caching and cache purge policies.\n4. Metadata & View Count Architecture:\n   - High-throughput video metadata queries.\n   - Distributed view count aggregation using Redis and Kafka to prevent database write bottlenecks.\n\nExpected Output Format:\n1. Ingestion & Transcoding Pipeline Diagram\n2. Adaptive Bitrate (HLS/DASH) Architecture\n3. CDN Caching & Edge Optimization\n4. View Count Write-Aggregation Architecture",
    "promptText": "Act as a Media Infrastructure and Cloud Systems Architect. Design a video upload, transcoding, and global streaming architecture like YouTube or Netflix.\n\nScale & Requirements:\n{{STREAMING_REQUIREMENTS}}\n\nTasks:\n1. Video Ingestion Pipeline:\n   - Chunked / Resumable multi-part upload to Object Storage (AWS S3).\n   - Message queue triggering asynchronous video transcoding.\n2. Transcoding & Adaptive Bitrate Streaming:\n   - Encoding into multiple resolutions (1080p, 720p, 480p, 360p) and formats (H.264, VP9, AV1).\n   - Chunking video into 4-6 second segments using HLS (.m3u8 index) and MPEG-DASH.\n   - Client dynamically switching bitrates based on available bandwidth.\n3. Content Delivery Network (CDN):\n   - Edge CDN caching strategy (caching initial chunks for instant video start).\n   - Geo-distributed Edge caching and cache purge policies.\n4. Metadata & View Count Architecture:\n   - High-throughput video metadata queries.\n   - Distributed view count aggregation using Redis and Kafka to prevent database write bottlenecks.\n\nExpected Output Format:\n1. Ingestion & Transcoding Pipeline Diagram\n2. Adaptive Bitrate (HLS/DASH) Architecture\n3. CDN Caching & Edge Optimization\n4. View Count Write-Aggregation Architecture",
    "tags": [
      "system-design",
      "youtube",
      "netflix",
      "streaming",
      "cdn",
      "hls",
      "video-processing"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{STREAMING_REQUIREMENTS}}"
    ],
    "expectedOutput": "Ingestion pipeline diagram + HLS/DASH architecture + CDN caching + view count aggregation",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-news-feed-social",
    "title": "Design a Social Media News Feed (Instagram / Twitter)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Designs social media activity feeds: Fan-out on Write vs Fan-out on Read, solving the Celebrity / Hotspot problem, and chronological vs ranked feeds.",
    "prompt": "Act as a Principal Distributed Systems Engineer. Design a scalable social news feed system like Twitter or Instagram.\n\nScale & Traffic Assumptions:\n{{FEED_SCALE}}\n\nTasks:\n1. Feed Generation Paradigms:\n   - Push Model (Fan-out on Write): Writing new post to all followers' feed caches immediately. (Fast reads, expensive writes).\n   - Pull Model (Fan-out on Read): Querying all followed users upon request and merging. (Fast writes, slow reads).\n2. The Celebrity / Influencer Problem:\n   - Why Fan-out on Write collapses when a user with 50M followers posts.\n   - Hybrid Architecture: Push for standard users, Pull for celebrities + dynamic merging in cache.\n3. Feed Storage & Cache Structure:\n   - Redis Sorted Sets (`ZADD`) storing post IDs indexed by timestamp for O(log N) pagination.\n4. Feed Ranking Pipeline:\n   - Chronological feed vs Machine Learning ranking service pipeline.\n\nExpected Output Format:\n1. Fan-out on Write vs Read Comparison Matrix\n2. Celebrity Problem Hybrid Architecture Diagram\n3. Redis Sorted Set Feed Cache Design\n4. News Feed Generation Flowchart",
    "promptText": "Act as a Principal Distributed Systems Engineer. Design a scalable social news feed system like Twitter or Instagram.\n\nScale & Traffic Assumptions:\n{{FEED_SCALE}}\n\nTasks:\n1. Feed Generation Paradigms:\n   - Push Model (Fan-out on Write): Writing new post to all followers' feed caches immediately. (Fast reads, expensive writes).\n   - Pull Model (Fan-out on Read): Querying all followed users upon request and merging. (Fast writes, slow reads).\n2. The Celebrity / Influencer Problem:\n   - Why Fan-out on Write collapses when a user with 50M followers posts.\n   - Hybrid Architecture: Push for standard users, Pull for celebrities + dynamic merging in cache.\n3. Feed Storage & Cache Structure:\n   - Redis Sorted Sets (`ZADD`) storing post IDs indexed by timestamp for O(log N) pagination.\n4. Feed Ranking Pipeline:\n   - Chronological feed vs Machine Learning ranking service pipeline.\n\nExpected Output Format:\n1. Fan-out on Write vs Read Comparison Matrix\n2. Celebrity Problem Hybrid Architecture Diagram\n3. Redis Sorted Set Feed Cache Design\n4. News Feed Generation Flowchart",
    "tags": [
      "system-design",
      "news-feed",
      "twitter",
      "instagram",
      "fan-out",
      "redis-sorted-sets"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{FEED_SCALE}}"
    ],
    "expectedOutput": "Fan-out comparison matrix + celebrity hybrid architecture + Redis sorted set design + flow diagram",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-distributed-rate-limiter",
    "title": "Design an Enterprise Distributed Rate Limiter",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects a high-throughput distributed rate limiter: Token Bucket algorithm, Redis Lua script atomicity, and sliding window counter.",
    "prompt": "Act as an Infrastructure Security Architect. Design a globally distributed rate-limiting service protecting downstream microservices.\n\nRequirements & Scale:\n{{RATE_LIMITER_SPECS}}\n\nTasks:\n1. Algorithm Evaluation:\n   - Token Bucket vs Leaky Bucket vs Fixed Window Counter vs Sliding Window Log vs Sliding Window Counter.\n   - Justify selecting Token Bucket or Sliding Window Counter for production.\n2. High-Concurrency Distributed Architecture:\n   - Why naive `GET -> increment -> SET` in Redis causes race conditions under concurrent requests.\n   - Atomic evaluation using Redis Lua Scripts.\n3. Architecture Placement:\n   - Client-side vs API Gateway (Kong, Envoy) vs Dedicated Microservice.\n4. Handling Failures & Edge Cases:\n   - What happens when the Redis rate limiter cluster fails? (Fail-open vs Fail-closed policy).\n   - Multi-datacenter synchronization and local in-memory caching with batch sync.\n5. Provide the exact Redis Lua script implementing the Token Bucket algorithm.\n\nExpected Output Format:\n1. Rate Limiting Algorithm Comparison Table\n2. Distributed Architecture Diagram with Redis Cluster\n3. Production Redis Lua Script (Atomic Token Bucket)\n4. Fail-Open / Fail-Closed Strategy & Metrics",
    "promptText": "Act as an Infrastructure Security Architect. Design a globally distributed rate-limiting service protecting downstream microservices.\n\nRequirements & Scale:\n{{RATE_LIMITER_SPECS}}\n\nTasks:\n1. Algorithm Evaluation:\n   - Token Bucket vs Leaky Bucket vs Fixed Window Counter vs Sliding Window Log vs Sliding Window Counter.\n   - Justify selecting Token Bucket or Sliding Window Counter for production.\n2. High-Concurrency Distributed Architecture:\n   - Why naive `GET -> increment -> SET` in Redis causes race conditions under concurrent requests.\n   - Atomic evaluation using Redis Lua Scripts.\n3. Architecture Placement:\n   - Client-side vs API Gateway (Kong, Envoy) vs Dedicated Microservice.\n4. Handling Failures & Edge Cases:\n   - What happens when the Redis rate limiter cluster fails? (Fail-open vs Fail-closed policy).\n   - Multi-datacenter synchronization and local in-memory caching with batch sync.\n5. Provide the exact Redis Lua script implementing the Token Bucket algorithm.\n\nExpected Output Format:\n1. Rate Limiting Algorithm Comparison Table\n2. Distributed Architecture Diagram with Redis Cluster\n3. Production Redis Lua Script (Atomic Token Bucket)\n4. Fail-Open / Fail-Closed Strategy & Metrics",
    "tags": [
      "system-design",
      "rate-limiter",
      "redis",
      "lua",
      "token-bucket",
      "security"
    ],
    "difficulty": "Intermediate",
    "useCase": "System Design",
    "variables": [
      "{{RATE_LIMITER_SPECS}}"
    ],
    "expectedOutput": "Algorithm comparison table + Redis cluster architecture + atomic Lua script + failure policies",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-distributed-cache",
    "title": "Design a Distributed In-Memory Cache (Redis / Memcached)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects an in-memory key-value cache: Consistent Hashing with virtual nodes, cache invalidation strategies, and thundering herd mitigation.",
    "prompt": "Act as a Senior Infrastructure Engineer. Design a distributed in-memory caching system like Redis or Memcached.\n\nCache Scale & Access Patterns:\n{{CACHE_SCALE_AND_PATTERNS}}\n\nTasks:\n1. Node Partitioning & Routing:\n   - Why modular hashing (`hash(key) % N`) triggers massive cache invalidation when servers are added/removed.\n   - Implement Consistent Hashing Ring with Virtual Nodes to ensure uniform key distribution and minimal re-hashing on node changes.\n2. Eviction Policies:\n   - LRU (Least Recently Used), LFU (Least Frequently Used), and FIFO. Detail data structures for O(1) LRU (Hash Map + Doubly Linked List).\n3. Cache Writing Strategies:\n   - Cache-Aside (Lazy Loading).\n   - Write-Through.\n   - Write-Behind (Write-Back).\n4. Cache Pitfalls & Mitigations:\n   - Cache Stampede / Thundering Herd: Mutex locking on cache miss or probabilistic early expiration (XFetch).\n   - Cache Penetration: Caching null values or using Bloom Filters.\n   - Cache Avalanche: Adding random TTL jitter.\n\nExpected Output Format:\n1. Consistent Hashing Ring with Virtual Nodes Diagram\n2. O(1) LRU Cache Data Structure Architecture\n3. Writing Strategies Comparison Matrix\n4. Cache Stampede & Avalanche Defense Blueprint",
    "promptText": "Act as a Senior Infrastructure Engineer. Design a distributed in-memory caching system like Redis or Memcached.\n\nCache Scale & Access Patterns:\n{{CACHE_SCALE_AND_PATTERNS}}\n\nTasks:\n1. Node Partitioning & Routing:\n   - Why modular hashing (`hash(key) % N`) triggers massive cache invalidation when servers are added/removed.\n   - Implement Consistent Hashing Ring with Virtual Nodes to ensure uniform key distribution and minimal re-hashing on node changes.\n2. Eviction Policies:\n   - LRU (Least Recently Used), LFU (Least Frequently Used), and FIFO. Detail data structures for O(1) LRU (Hash Map + Doubly Linked List).\n3. Cache Writing Strategies:\n   - Cache-Aside (Lazy Loading).\n   - Write-Through.\n   - Write-Behind (Write-Back).\n4. Cache Pitfalls & Mitigations:\n   - Cache Stampede / Thundering Herd: Mutex locking on cache miss or probabilistic early expiration (XFetch).\n   - Cache Penetration: Caching null values or using Bloom Filters.\n   - Cache Avalanche: Adding random TTL jitter.\n\nExpected Output Format:\n1. Consistent Hashing Ring with Virtual Nodes Diagram\n2. O(1) LRU Cache Data Structure Architecture\n3. Writing Strategies Comparison Matrix\n4. Cache Stampede & Avalanche Defense Blueprint",
    "tags": [
      "system-design",
      "distributed-cache",
      "redis",
      "consistent-hashing",
      "lru",
      "caching"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{CACHE_SCALE_AND_PATTERNS}}"
    ],
    "expectedOutput": "Consistent hashing ring diagram + O(1) LRU architecture + writing strategies + stampede defense",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-ridesharing-uber",
    "title": "Design a Ride-Sharing Matching Platform (Uber / Lyft)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Designs real-time geospatial ride matching: QuadTree vs Google S2 / Uber H3 geospatial indexing, location ingestion, and trip dispatching.",
    "prompt": "Act as a Staff Systems Architect. Design a real-time ride-matching platform like Uber or Lyft.\n\nScale & Requirements:\n{{RIDESHARING_REQUIREMENTS}}\n\nTasks:\n1. Geospatial Data Ingestion:\n   - Drivers streaming GPS coordinates every 3-5 seconds via WebSockets.\n   - Managing millions of location updates per second without overwhelming the database.\n2. Geospatial Indexing:\n   - Compare Geo-hashing, QuadTrees, Google S2 Cells, and Uber H3 hexagonal hierarchical spatial index.\n   - In-memory geospatial index in Redis (GEOADD, GEORADIUS) for sub-millisecond location queries.\n3. Driver-Rider Matching Engine:\n   - Finding top N closest available drivers within radius R.\n   - Dispatch workflow, driver acceptance timeout, and optimistic locking to prevent double-booking.\n4. Dynamic Surge Pricing:\n   - Aggregating demand (rider requests) vs supply (available drivers) per geospatial cell in real-time.\n\nExpected Output Format:\n1. Geospatial Indexing Comparison (QuadTree vs H3 vs S2)\n2. GPS Location Ingestion Pipeline Diagram\n3. Driver Matching & Dispatch Flowchart\n4. Surge Pricing Calculation Architecture",
    "promptText": "Act as a Staff Systems Architect. Design a real-time ride-matching platform like Uber or Lyft.\n\nScale & Requirements:\n{{RIDESHARING_REQUIREMENTS}}\n\nTasks:\n1. Geospatial Data Ingestion:\n   - Drivers streaming GPS coordinates every 3-5 seconds via WebSockets.\n   - Managing millions of location updates per second without overwhelming the database.\n2. Geospatial Indexing:\n   - Compare Geo-hashing, QuadTrees, Google S2 Cells, and Uber H3 hexagonal hierarchical spatial index.\n   - In-memory geospatial index in Redis (GEOADD, GEORADIUS) for sub-millisecond location queries.\n3. Driver-Rider Matching Engine:\n   - Finding top N closest available drivers within radius R.\n   - Dispatch workflow, driver acceptance timeout, and optimistic locking to prevent double-booking.\n4. Dynamic Surge Pricing:\n   - Aggregating demand (rider requests) vs supply (available drivers) per geospatial cell in real-time.\n\nExpected Output Format:\n1. Geospatial Indexing Comparison (QuadTree vs H3 vs S2)\n2. GPS Location Ingestion Pipeline Diagram\n3. Driver Matching & Dispatch Flowchart\n4. Surge Pricing Calculation Architecture",
    "tags": [
      "system-design",
      "uber",
      "lyft",
      "geospatial",
      "redis",
      "quadtree",
      "h3"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{RIDESHARING_REQUIREMENTS}}"
    ],
    "expectedOutput": "Geospatial indexing comparison + GPS ingestion pipeline + matching flowchart + surge pricing architecture",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-payment-gateway-stripe",
    "title": "Design an Idempotent Payment Processing Gateway (Stripe)",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects payment processing with zero double-charging guarantees: idempotency keys, two-phase commits, double-entry ledgers, and webhooks.",
    "prompt": "Act as a Fintech and Payment Systems Architect. Design a high-reliability, zero-loss payment gateway like Stripe.\n\nPayment Workflow & Compliance:\n{{PAYMENT_WORKFLOW}}\n\nTasks:\n1. Zero Double-Charging Guarantee:\n   - Idempotency Keys: Client generates UUID sent in `Idempotency-Key` header.\n   - Database uniqueness constraint and atomic distributed lock during processing.\n2. Double-Entry Bookkeeping Ledger:\n   - Every financial transaction must be recorded as balanced Debits and Credits (`Debit Total == Credit Total`).\n   - Immutability: Ledger records are append-only; mistakes are corrected via reversal entries, never updates or deletes.\n3. Distributed State Machine & Retries:\n   - Handling timeout during acquirer network call (Did the bank charge the user or not?).\n   - Reconciliation jobs and asynchronous webhooks with exponential backoff and HMAC-SHA256 signatures.\n4. Data Security:\n   - PCI-DSS tokenization (sensitive credit card numbers never touch core application servers).\n\nExpected Output Format:\n1. Idempotency Key Processing Lifecycle Flowchart\n2. Double-Entry Ledger Schema & Sample Journal Entries\n3. Payment State Machine Diagram\n4. Webhook Delivery & Signature Verification Architecture",
    "promptText": "Act as a Fintech and Payment Systems Architect. Design a high-reliability, zero-loss payment gateway like Stripe.\n\nPayment Workflow & Compliance:\n{{PAYMENT_WORKFLOW}}\n\nTasks:\n1. Zero Double-Charging Guarantee:\n   - Idempotency Keys: Client generates UUID sent in `Idempotency-Key` header.\n   - Database uniqueness constraint and atomic distributed lock during processing.\n2. Double-Entry Bookkeeping Ledger:\n   - Every financial transaction must be recorded as balanced Debits and Credits (`Debit Total == Credit Total`).\n   - Immutability: Ledger records are append-only; mistakes are corrected via reversal entries, never updates or deletes.\n3. Distributed State Machine & Retries:\n   - Handling timeout during acquirer network call (Did the bank charge the user or not?).\n   - Reconciliation jobs and asynchronous webhooks with exponential backoff and HMAC-SHA256 signatures.\n4. Data Security:\n   - PCI-DSS tokenization (sensitive credit card numbers never touch core application servers).\n\nExpected Output Format:\n1. Idempotency Key Processing Lifecycle Flowchart\n2. Double-Entry Ledger Schema & Sample Journal Entries\n3. Payment State Machine Diagram\n4. Webhook Delivery & Signature Verification Architecture",
    "tags": [
      "system-design",
      "fintech",
      "payments",
      "stripe",
      "idempotency",
      "ledger",
      "acid"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{PAYMENT_WORKFLOW}}"
    ],
    "expectedOutput": "Idempotency lifecycle flowchart + double-entry ledger schema + state machine + webhook architecture",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-web-crawler-scale",
    "title": "Design a Distributed Web Crawler at Scale",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects a distributed web crawler: URL Frontier priority queue, Bloom filters for deduplication, robots.txt compliance, and worker politeness.",
    "prompt": "Act as a Search Engine Infrastructure Architect. Design a distributed web crawler that crawls 1 billion pages per month.\n\nScale & Target:\n{{CRAWLER_REQUIREMENTS}}\n\nTasks:\n1. Crawling Pipeline:\n   - URL Frontier: Priority Queues managing crawling priority (PageRank) and Politeness (per-host rate-limiting).\n   - Fetcher & HTML Parser.\n   - Content Extraction and Duplicate Document Elimination (SimHash / MinHash).\n2. URL Deduplication:\n   - Checking whether a discovered URL has already been visited.\n   - Memory calculation: Why storing 1 billion URLs in a Hash Set is too large for RAM.\n   - Bloom Filters: Memory-efficient probabilistic membership testing.\n3. Politeness & Robots.txt:\n   - Obeying `robots.txt` crawl-delay and disallow paths.\n   - Caching parsed `robots.txt` per domain.\n4. Fault Tolerance:\n   - Handling dead links, spider traps (infinite calendar loops), and unresponsive servers.\n\nExpected Output Format:\n1. End-to-End Crawler Pipeline Architecture Diagram\n2. URL Frontier (Priority & Politeness Queues) Design\n3. Bloom Filter Sizing & False Positive Math\n4. Spider Trap Detection Strategy",
    "promptText": "Act as a Search Engine Infrastructure Architect. Design a distributed web crawler that crawls 1 billion pages per month.\n\nScale & Target:\n{{CRAWLER_REQUIREMENTS}}\n\nTasks:\n1. Crawling Pipeline:\n   - URL Frontier: Priority Queues managing crawling priority (PageRank) and Politeness (per-host rate-limiting).\n   - Fetcher & HTML Parser.\n   - Content Extraction and Duplicate Document Elimination (SimHash / MinHash).\n2. URL Deduplication:\n   - Checking whether a discovered URL has already been visited.\n   - Memory calculation: Why storing 1 billion URLs in a Hash Set is too large for RAM.\n   - Bloom Filters: Memory-efficient probabilistic membership testing.\n3. Politeness & Robots.txt:\n   - Obeying `robots.txt` crawl-delay and disallow paths.\n   - Caching parsed `robots.txt` per domain.\n4. Fault Tolerance:\n   - Handling dead links, spider traps (infinite calendar loops), and unresponsive servers.\n\nExpected Output Format:\n1. End-to-End Crawler Pipeline Architecture Diagram\n2. URL Frontier (Priority & Politeness Queues) Design\n3. Bloom Filter Sizing & False Positive Math\n4. Spider Trap Detection Strategy",
    "tags": [
      "system-design",
      "web-crawler",
      "bloom-filter",
      "distributed-systems",
      "search-engine"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{CRAWLER_REQUIREMENTS}}"
    ],
    "expectedOutput": "Crawler pipeline diagram + URL frontier design + Bloom filter math + spider trap defense",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-notification-service",
    "title": "Design a Multi-Channel Notification Platform",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Architects a notification hub supporting Email, SMS, and Mobile Push: user preference matrices, rate limits, templating, and provider failover.",
    "prompt": "Act as a Cloud Messaging Architect. Design a unified notification delivery service supporting millions of alerts per minute.\n\nChannels & Requirements:\n{{NOTIFICATION_REQUIREMENTS}}\n\nTasks:\n1. Multi-Channel Dispatch:\n   - Unified API endpoint: `POST /api/v1/notifications`.\n   - Channels: Email (SendGrid/SES), SMS (Twilio), Push (APNs/FCM), In-App WebSockets.\n2. User Notification Preferences:\n   - Opt-in/opt-out matrix per topic and channel (e.g. Email for invoices, Push for messages, No SMS).\n   - Quiet hours and time-zone aware delivery windows.\n3. Priority Queuing & Rate Limiting:\n   - Priority queues: High-priority (OTP verification codes) vs Low-priority (marketing newsletters).\n   - User-level rate limiting: Prevent spamming a user with 50 notifications in 10 minutes.\n4. Third-Party Provider Failover & Idempotency:\n   - Automatic failover if primary SMS provider experiences downtime.\n   - Deduplication keys to prevent sending duplicate notifications on retry.\n\nExpected Output Format:\n1. Notification Platform Architecture Diagram\n2. Priority Queue & Worker Scheduling Flow\n3. User Preference Schema & Filter Logic\n4. Provider Failover & Deduplication Strategy",
    "promptText": "Act as a Cloud Messaging Architect. Design a unified notification delivery service supporting millions of alerts per minute.\n\nChannels & Requirements:\n{{NOTIFICATION_REQUIREMENTS}}\n\nTasks:\n1. Multi-Channel Dispatch:\n   - Unified API endpoint: `POST /api/v1/notifications`.\n   - Channels: Email (SendGrid/SES), SMS (Twilio), Push (APNs/FCM), In-App WebSockets.\n2. User Notification Preferences:\n   - Opt-in/opt-out matrix per topic and channel (e.g. Email for invoices, Push for messages, No SMS).\n   - Quiet hours and time-zone aware delivery windows.\n3. Priority Queuing & Rate Limiting:\n   - Priority queues: High-priority (OTP verification codes) vs Low-priority (marketing newsletters).\n   - User-level rate limiting: Prevent spamming a user with 50 notifications in 10 minutes.\n4. Third-Party Provider Failover & Idempotency:\n   - Automatic failover if primary SMS provider experiences downtime.\n   - Deduplication keys to prevent sending duplicate notifications on retry.\n\nExpected Output Format:\n1. Notification Platform Architecture Diagram\n2. Priority Queue & Worker Scheduling Flow\n3. User Preference Schema & Filter Logic\n4. Provider Failover & Deduplication Strategy",
    "tags": [
      "system-design",
      "notifications",
      "push-notifications",
      "queues",
      "kafka",
      "messaging"
    ],
    "difficulty": "Intermediate",
    "useCase": "System Design",
    "variables": [
      "{{NOTIFICATION_REQUIREMENTS}}"
    ],
    "expectedOutput": "Platform architecture diagram + priority queue worker flow + user preference schema + failover strategy",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "sys-design-ecommerce-flash-sale",
    "title": "Design an E-Commerce Flash Sale & Inventory System",
    "category": "Engineering",
    "subcategory": "System Design",
    "description": "Prevents overselling under extreme traffic spikes: Redis atomic pre-decrement, message queue order buffering, and database optimistic locks.",
    "prompt": "Act as an E-Commerce High-Concurrency Architect. Design a Flash Sale system selling 10,000 limited-stock items to 1 million concurrent buyers.\n\nSale Specifications:\n{{FLASH_SALE_SPECS}}\n\nTasks:\n1. The Overselling Problem:\n   - Why traditional relational database transactions (`UPDATE stock = stock - 1`) cause lock contention and database crashes under 100k requests/sec.\n2. Three-Tier Inventory Architecture:\n   - Tier 1: Static Edge CDN caching flash sale landing page and asset bundles.\n   - Tier 2: In-Memory Redis inventory pre-decrement using atomic Lua scripts (`stock = DECR(item_key); if stock < 0 then INCR(item_key) return nil`).\n   - Tier 3: Async Order Queue (Kafka / RabbitMQ) decoupling order placement from payment processing.\n3. Inventory Reservation & Expiration:\n   - Holding inventory for 10 minutes while user completes checkout.\n   - Releasing inventory back to stock if payment times out using delayed queues or Redis key expiration.\n4. Bot Mitigation:\n   - Dynamic CAPTCHA triggers, rate limiting, and URL token encryption until sale starts.\n\nExpected Output Format:\n1. High-Concurrency Flash Sale Flowchart\n2. Atomic Redis Inventory Lua Script\n3. Inventory Reservation & Expiration Lifecycle\n4. Database Fallback & Concurrency Safeguards",
    "promptText": "Act as an E-Commerce High-Concurrency Architect. Design a Flash Sale system selling 10,000 limited-stock items to 1 million concurrent buyers.\n\nSale Specifications:\n{{FLASH_SALE_SPECS}}\n\nTasks:\n1. The Overselling Problem:\n   - Why traditional relational database transactions (`UPDATE stock = stock - 1`) cause lock contention and database crashes under 100k requests/sec.\n2. Three-Tier Inventory Architecture:\n   - Tier 1: Static Edge CDN caching flash sale landing page and asset bundles.\n   - Tier 2: In-Memory Redis inventory pre-decrement using atomic Lua scripts (`stock = DECR(item_key); if stock < 0 then INCR(item_key) return nil`).\n   - Tier 3: Async Order Queue (Kafka / RabbitMQ) decoupling order placement from payment processing.\n3. Inventory Reservation & Expiration:\n   - Holding inventory for 10 minutes while user completes checkout.\n   - Releasing inventory back to stock if payment times out using delayed queues or Redis key expiration.\n4. Bot Mitigation:\n   - Dynamic CAPTCHA triggers, rate limiting, and URL token encryption until sale starts.\n\nExpected Output Format:\n1. High-Concurrency Flash Sale Flowchart\n2. Atomic Redis Inventory Lua Script\n3. Inventory Reservation & Expiration Lifecycle\n4. Database Fallback & Concurrency Safeguards",
    "tags": [
      "system-design",
      "flash-sale",
      "e-commerce",
      "redis",
      "inventory",
      "concurrency",
      "queues"
    ],
    "difficulty": "Advanced",
    "useCase": "System Design",
    "variables": [
      "{{FLASH_SALE_SPECS}}"
    ],
    "expectedOutput": "Flash sale flowchart + atomic Redis Lua script + reservation lifecycle + database safeguards",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-senior-pr-review",
    "title": "Staff Engineer Pull Request (PR) Code Review",
    "category": "Engineering",
    "subcategory": "Code Review",
    "description": "Delivers a senior code review categorizing findings into CRITICAL, HIGH, MEDIUM, LOW, and OPTIONAL with constructive rationale.",
    "prompt": "Act as a Staff Software Engineer conducting an exhaustive, constructive code review on a pull request.\n\nPull Request Code Diff:\n{{CODE_DIFF}}\n\nPR Description & Business Objective:\n{{PR_DESCRIPTION}}\n\nReview Guidelines:\n1. Audit across 5 core dimensions:\n   - Correctness & Edge Cases: Does the code solve the problem without regressions?\n   - Architecture & Modularity: Does it violate SOLID principles or introduce circular couplings?\n   - Performance: Are there O(N^2) loops, unnecessary database queries (N+1), or unmemoized allocations?\n   - Security: OWASP Top 10 risks (SQL injection, XSS, insecure deserialization, sensitive data logging).\n   - Test Quality: Are unit and integration tests covering happy paths, boundaries, and failure states?\n2. Group ALL feedback strictly by severity:\n   - [CRITICAL] Showstopper bugs, data corruption, or security vulnerabilities (Must block merge).\n   - [HIGH] Significant performance regressions, missing error handling, or architecture violations.\n   - [MEDIUM] Code smells, missing test cases, or minor logic oversights.\n   - [LOW] Naming inconsistencies, formatting, or documentation gaps.\n   - [OPTIONAL] Nitpicks or alternative architectural suggestions.\n3. For every issue provide:\n   - Problem statement and affected line range.\n   - Why it matters (the business or operational impact).\n   - Evidence or failure scenario.\n   - Concrete suggested code replacement.\n\nExpected Output Format:\nStructured Severity-Tagged Review comments + Summary Verdict (Approve / Request Changes).",
    "promptText": "Act as a Staff Software Engineer conducting an exhaustive, constructive code review on a pull request.\n\nPull Request Code Diff:\n{{CODE_DIFF}}\n\nPR Description & Business Objective:\n{{PR_DESCRIPTION}}\n\nReview Guidelines:\n1. Audit across 5 core dimensions:\n   - Correctness & Edge Cases: Does the code solve the problem without regressions?\n   - Architecture & Modularity: Does it violate SOLID principles or introduce circular couplings?\n   - Performance: Are there O(N^2) loops, unnecessary database queries (N+1), or unmemoized allocations?\n   - Security: OWASP Top 10 risks (SQL injection, XSS, insecure deserialization, sensitive data logging).\n   - Test Quality: Are unit and integration tests covering happy paths, boundaries, and failure states?\n2. Group ALL feedback strictly by severity:\n   - [CRITICAL] Showstopper bugs, data corruption, or security vulnerabilities (Must block merge).\n   - [HIGH] Significant performance regressions, missing error handling, or architecture violations.\n   - [MEDIUM] Code smells, missing test cases, or minor logic oversights.\n   - [LOW] Naming inconsistencies, formatting, or documentation gaps.\n   - [OPTIONAL] Nitpicks or alternative architectural suggestions.\n3. For every issue provide:\n   - Problem statement and affected line range.\n   - Why it matters (the business or operational impact).\n   - Evidence or failure scenario.\n   - Concrete suggested code replacement.\n\nExpected Output Format:\nStructured Severity-Tagged Review comments + Summary Verdict (Approve / Request Changes).",
    "tags": [
      "engineering",
      "code-review",
      "pull-request",
      "clean-code",
      "quality",
      "pr-review"
    ],
    "difficulty": "Advanced",
    "useCase": "Code Review",
    "variables": [
      "{{CODE_DIFF}}",
      "{{PR_DESCRIPTION}}"
    ],
    "expectedOutput": "Structured severity-tagged PR review (CRITICAL to OPTIONAL) + code diffs + merge verdict",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-security-owasp-audit",
    "title": "Security Vulnerability Audit (OWASP Top 10 & Zero-Trust)",
    "category": "Engineering",
    "subcategory": "Security Review",
    "description": "Audits source code for OWASP Top 10 vulnerabilities: Injection, Broken Auth, IDOR, SSRF, Sensitive Data Exposure, and Cryptographic Failures.",
    "prompt": "Act as an Application Security (AppSec) Engineer and Certified Ethical Hacker. Perform a comprehensive security audit of this codebase.\n\nSource Code:\n{{CODE}}\n\nApplication Context:\n{{APPLICATION_CONTEXT}}\n\nTasks:\n1. Scan for OWASP Top 10 Vulnerabilities:\n   - A01: Broken Access Control (IDOR, missing role checks on endpoints).\n   - A02: Cryptographic Failures (hardcoded secrets, weak hashing like MD5/SHA1, missing salt).\n   - A03: Injection (SQL injection, Command injection, NoSQL injection, XSS).\n   - A04: Insecure Design (Lack of rate limiting, unvalidated business flows).\n   - A05: Security Misconfiguration (Permissive CORS, default credentials, exposed stack traces).\n   - A07: Identification and Authentication Failures (Brute-force vulnerabilities, weak session cookies).\n   - A08: Software and Data Integrity Failures (Insecure deserialization).\n   - A10: Server-Side Request Forgery (SSRF on outbound fetch/webhook URLs).\n2. For each identified vulnerability:\n   - Attack vector description and proof of concept payload.\n   - Exploit impact (CVSS score severity estimation: Critical/High/Medium).\n   - Remediated code implementing defense-in-depth.\n\nExpected Output Format:\n1. Vulnerability Findings Table with CVSS Severity\n2. Detailed Vulnerability Breakdown & Exploit Scenarios\n3. Hardened Production Code Diffs\n4. Automated Security Testing Rule (e.g. Semgrep or ESLint security rule)",
    "promptText": "Act as an Application Security (AppSec) Engineer and Certified Ethical Hacker. Perform a comprehensive security audit of this codebase.\n\nSource Code:\n{{CODE}}\n\nApplication Context:\n{{APPLICATION_CONTEXT}}\n\nTasks:\n1. Scan for OWASP Top 10 Vulnerabilities:\n   - A01: Broken Access Control (IDOR, missing role checks on endpoints).\n   - A02: Cryptographic Failures (hardcoded secrets, weak hashing like MD5/SHA1, missing salt).\n   - A03: Injection (SQL injection, Command injection, NoSQL injection, XSS).\n   - A04: Insecure Design (Lack of rate limiting, unvalidated business flows).\n   - A05: Security Misconfiguration (Permissive CORS, default credentials, exposed stack traces).\n   - A07: Identification and Authentication Failures (Brute-force vulnerabilities, weak session cookies).\n   - A08: Software and Data Integrity Failures (Insecure deserialization).\n   - A10: Server-Side Request Forgery (SSRF on outbound fetch/webhook URLs).\n2. For each identified vulnerability:\n   - Attack vector description and proof of concept payload.\n   - Exploit impact (CVSS score severity estimation: Critical/High/Medium).\n   - Remediated code implementing defense-in-depth.\n\nExpected Output Format:\n1. Vulnerability Findings Table with CVSS Severity\n2. Detailed Vulnerability Breakdown & Exploit Scenarios\n3. Hardened Production Code Diffs\n4. Automated Security Testing Rule (e.g. Semgrep or ESLint security rule)",
    "tags": [
      "engineering",
      "security",
      "owasp",
      "appsec",
      "vulnerability",
      "penetration-testing"
    ],
    "difficulty": "Advanced",
    "useCase": "Security Review",
    "variables": [
      "{{CODE}}",
      "{{APPLICATION_CONTEXT}}"
    ],
    "expectedOutput": "Vulnerability findings table with CVSS + exploit scenarios + hardened code + security rules",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-cyclomatic-complexity-reducer",
    "title": "Cyclomatic Complexity Reducer & Cognitive Load Minimizer",
    "category": "Engineering",
    "subcategory": "Clean Code",
    "description": "Refactors deeply nested if-else ladders and switch statements into clean early returns, guard clauses, and strategy pattern dictionaries.",
    "prompt": "Act as a Clean Code and Refactoring Guru. Refactor this complex function that has high cyclomatic complexity and unreadable nesting.\n\nComplex Function:\n{{CODE}}\n\nTasks:\n1. Calculate Cyclomatic Complexity (number of independent linear paths through source code).\n2. Identify readability anti-patterns:\n   - Arrow Anti-Pattern (deeply nested if/else blocks forming a pyramid of doom).\n   - Flag arguments (boolean parameters switching entire execution flows).\n   - Side effects hidden deep within condition branches.\n3. Refactoring Techniques to Apply:\n   - Guard Clauses / Early Return (fail fast at the top of the function).\n   - Lookup Tables / Strategy Pattern dictionary instead of 20-case switch statements.\n   - Extract Method / Decomposition into small single-purpose pure functions.\n4. Provide the refactored code with a side-by-side complexity comparison (e.g. Complexity reduced from 18 to 3).\n\nExpected Output Format:\n1. Initial Complexity Metric & Flaw Identification\n2. Refactoring Strategy Breakdown\n3. Clean Refactored Code\n4. Before vs After Complexity Comparison Table",
    "promptText": "Act as a Clean Code and Refactoring Guru. Refactor this complex function that has high cyclomatic complexity and unreadable nesting.\n\nComplex Function:\n{{CODE}}\n\nTasks:\n1. Calculate Cyclomatic Complexity (number of independent linear paths through source code).\n2. Identify readability anti-patterns:\n   - Arrow Anti-Pattern (deeply nested if/else blocks forming a pyramid of doom).\n   - Flag arguments (boolean parameters switching entire execution flows).\n   - Side effects hidden deep within condition branches.\n3. Refactoring Techniques to Apply:\n   - Guard Clauses / Early Return (fail fast at the top of the function).\n   - Lookup Tables / Strategy Pattern dictionary instead of 20-case switch statements.\n   - Extract Method / Decomposition into small single-purpose pure functions.\n4. Provide the refactored code with a side-by-side complexity comparison (e.g. Complexity reduced from 18 to 3).\n\nExpected Output Format:\n1. Initial Complexity Metric & Flaw Identification\n2. Refactoring Strategy Breakdown\n3. Clean Refactored Code\n4. Before vs After Complexity Comparison Table",
    "tags": [
      "engineering",
      "clean-code",
      "refactoring",
      "cyclomatic-complexity",
      "guard-clauses"
    ],
    "difficulty": "Easy",
    "useCase": "Clean Code",
    "variables": [
      "{{CODE}}"
    ],
    "expectedOutput": "Complexity metric audit + refactoring strategy + clean early-return code + comparison table",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-monolith-to-modular-migration",
    "title": "Monolith to Modular Architecture Migration Strategy",
    "category": "Engineering",
    "subcategory": "Architecture Review",
    "description": "Guides the safe decomposition of a monolithic spaghetti codebase into modular domains (Package by Feature / Hexagonal Architecture).",
    "prompt": "Act as a Principal Software Architect. Formulate a migration plan to decompose this monolithic, tightly coupled codebase into a clean modular architecture.\n\nCurrent Monolith Description / File Structure:\n{{MONOLITH_STRUCTURE}}\n\nPain Points & Scaling Goals:\n{{PAIN_POINTS}}\n\nTasks:\n1. Boundary Identification:\n   - Apply Domain-Driven Design (DDD) to discover Bounded Contexts (e.g., Billing, Auth, Catalog, Notifications).\n   - Identify shared database tables and circular dependency entanglements.\n2. Architecture Target:\n   - Package by Feature / Modular Monolith (Clean Architecture / Hexagonal Ports & Adapters) BEFORE jumping prematurely to microservices.\n   - Decouple inter-module communication using synchronous internal interfaces and asynchronous domain events.\n3. Step-by-Step Strangler Fig Migration:\n   - Phase 1: In-process decoupling and interface extraction.\n   - Phase 2: Database schema isolation per domain.\n   - Phase 3: Independent service deployment (if justified by team topology).\n4. Provide directory layout and an example domain event interface.\n\nExpected Output Format:\n1. Domain Bounded Context Breakdown\n2. Target Modular Directory Structure\n3. Inter-Module Interface & Domain Event Code Example\n4. 4-Phase Strangler Migration Roadmap",
    "promptText": "Act as a Principal Software Architect. Formulate a migration plan to decompose this monolithic, tightly coupled codebase into a clean modular architecture.\n\nCurrent Monolith Description / File Structure:\n{{MONOLITH_STRUCTURE}}\n\nPain Points & Scaling Goals:\n{{PAIN_POINTS}}\n\nTasks:\n1. Boundary Identification:\n   - Apply Domain-Driven Design (DDD) to discover Bounded Contexts (e.g., Billing, Auth, Catalog, Notifications).\n   - Identify shared database tables and circular dependency entanglements.\n2. Architecture Target:\n   - Package by Feature / Modular Monolith (Clean Architecture / Hexagonal Ports & Adapters) BEFORE jumping prematurely to microservices.\n   - Decouple inter-module communication using synchronous internal interfaces and asynchronous domain events.\n3. Step-by-Step Strangler Fig Migration:\n   - Phase 1: In-process decoupling and interface extraction.\n   - Phase 2: Database schema isolation per domain.\n   - Phase 3: Independent service deployment (if justified by team topology).\n4. Provide directory layout and an example domain event interface.\n\nExpected Output Format:\n1. Domain Bounded Context Breakdown\n2. Target Modular Directory Structure\n3. Inter-Module Interface & Domain Event Code Example\n4. 4-Phase Strangler Migration Roadmap",
    "tags": [
      "engineering",
      "architecture",
      "clean-architecture",
      "domain-driven-design",
      "modular-monolith"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture Review",
    "variables": [
      "{{MONOLITH_STRUCTURE}}",
      "{{PAIN_POINTS}}"
    ],
    "expectedOutput": "Bounded context breakdown + modular directory layout + domain event interface + migration roadmap",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-api-contract-breaking-change-audit",
    "title": "API Contract & Breaking Change Backward-Compatibility Audit",
    "category": "Engineering",
    "subcategory": "API Design",
    "description": "Audits REST / GraphQL API schema changes to ensure zero breaking changes for existing mobile and web clients in production.",
    "prompt": "Act as an API Governance and Platform Architect. Audit this proposed API schema change for breaking changes against existing production clients.\n\nCurrent API Contract (v1):\n{{CURRENT_API_CONTRACT}}\n\nProposed Modified API Contract:\n{{PROPOSED_API_CONTRACT}}\n\nTasks:\n1. Breaking vs Non-Breaking Change Classification:\n   - Identify Breaking Changes: Removing/renaming fields, changing data types, changing HTTP status codes, adding mandatory (non-optional) query/body parameters.\n   - Identify Non-Breaking Changes: Adding optional fields, expanding enum choices (with caveats).\n2. Backward Compatibility Strategy:\n   - URL versioning (`/v1` vs `/v2`) vs Header versioning vs Schema evolution (field deprecation).\n   - Field deprecation lifecycle: `@deprecated` annotation, telemetry logging of deprecated field usage, migration timeline.\n3. Provide the revised, 100% backward-compatible API contract that achieves the new feature requirements without breaking existing v1 clients.\n\nExpected Output Format:\n1. Breaking Changes Risk Assessment Table\n2. Client Impact Analysis (Mobile apps that cannot be force-updated)\n3. Backward-Compatible Contract Revision\n4. Deprecation & Sunsetting Policy Timeline",
    "promptText": "Act as an API Governance and Platform Architect. Audit this proposed API schema change for breaking changes against existing production clients.\n\nCurrent API Contract (v1):\n{{CURRENT_API_CONTRACT}}\n\nProposed Modified API Contract:\n{{PROPOSED_API_CONTRACT}}\n\nTasks:\n1. Breaking vs Non-Breaking Change Classification:\n   - Identify Breaking Changes: Removing/renaming fields, changing data types, changing HTTP status codes, adding mandatory (non-optional) query/body parameters.\n   - Identify Non-Breaking Changes: Adding optional fields, expanding enum choices (with caveats).\n2. Backward Compatibility Strategy:\n   - URL versioning (`/v1` vs `/v2`) vs Header versioning vs Schema evolution (field deprecation).\n   - Field deprecation lifecycle: `@deprecated` annotation, telemetry logging of deprecated field usage, migration timeline.\n3. Provide the revised, 100% backward-compatible API contract that achieves the new feature requirements without breaking existing v1 clients.\n\nExpected Output Format:\n1. Breaking Changes Risk Assessment Table\n2. Client Impact Analysis (Mobile apps that cannot be force-updated)\n3. Backward-Compatible Contract Revision\n4. Deprecation & Sunsetting Policy Timeline",
    "tags": [
      "engineering",
      "api-design",
      "breaking-changes",
      "backward-compatibility",
      "rest",
      "graphql"
    ],
    "difficulty": "Intermediate",
    "useCase": "API Design",
    "variables": [
      "{{CURRENT_API_CONTRACT}}",
      "{{PROPOSED_API_CONTRACT}}"
    ],
    "expectedOutput": "Breaking changes risk table + client impact analysis + backward-compatible contract + deprecation policy",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-production-readiness-checklist",
    "title": "Production Readiness & Operational Resiliency Audit",
    "category": "Engineering",
    "subcategory": "Architecture Review",
    "description": "Comprehensive 360-degree production readiness review: timeouts, circuit breakers, retries with jitter, logging, and observability.",
    "prompt": "Act as a Site Reliability Engineer (SRE) and Production Readiness Gatekeeper. Audit this service for production launch readiness.\n\nService Architecture & Tech Stack:\n{{SERVICE_TECH_STACK}}\n\nTasks:\n1. Resiliency & Fault Tolerance:\n   - Are outbound network calls protected with timeouts and circuit breakers (e.g. Cockatiel / Opossum)?\n   - Are retries bounded and backed by exponential backoff with randomized jitter?\n2. Observability & Telemetry:\n   - Structured JSON logging with trace/span IDs (OpenTelemetry / correlation IDs).\n   - Health probes (Liveness / Readiness) and RED metrics (Rate, Errors, Duration).\n3. Security & Secrets:\n   - No secrets in git or environment logs.\n   - Least privilege IAM roles and database permissions.\n4. Graceful Degradation:\n   - Fallback responses when downstream caches or recommendation services fail.\n5. Provide a Go / No-Go Launch Scorecard and concrete remediation code for missing items.\n\nExpected Output Format:\n1. Production Readiness Scorecard (Pass / Warning / Fail across 5 categories)\n2. Critical Blockers & Vulnerabilities\n3. Resiliency Pattern Implementations (Circuit Breaker & Retry Code)\n4. Grafana / Prometheus Alerting Rules",
    "promptText": "Act as a Site Reliability Engineer (SRE) and Production Readiness Gatekeeper. Audit this service for production launch readiness.\n\nService Architecture & Tech Stack:\n{{SERVICE_TECH_STACK}}\n\nTasks:\n1. Resiliency & Fault Tolerance:\n   - Are outbound network calls protected with timeouts and circuit breakers (e.g. Cockatiel / Opossum)?\n   - Are retries bounded and backed by exponential backoff with randomized jitter?\n2. Observability & Telemetry:\n   - Structured JSON logging with trace/span IDs (OpenTelemetry / correlation IDs).\n   - Health probes (Liveness / Readiness) and RED metrics (Rate, Errors, Duration).\n3. Security & Secrets:\n   - No secrets in git or environment logs.\n   - Least privilege IAM roles and database permissions.\n4. Graceful Degradation:\n   - Fallback responses when downstream caches or recommendation services fail.\n5. Provide a Go / No-Go Launch Scorecard and concrete remediation code for missing items.\n\nExpected Output Format:\n1. Production Readiness Scorecard (Pass / Warning / Fail across 5 categories)\n2. Critical Blockers & Vulnerabilities\n3. Resiliency Pattern Implementations (Circuit Breaker & Retry Code)\n4. Grafana / Prometheus Alerting Rules",
    "tags": [
      "engineering",
      "sre",
      "production-readiness",
      "resilience",
      "circuit-breaker",
      "observability"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture Review",
    "variables": [
      "{{SERVICE_TECH_STACK}}"
    ],
    "expectedOutput": "Readiness scorecard + critical blockers + circuit breaker code + Prometheus alert rules",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-junior-mentorship-code-review",
    "title": "Constructive Junior Developer Mentorship Code Review",
    "category": "Engineering",
    "subcategory": "Code Review",
    "description": "Transforms code review into a high-impact teaching moment: explains the \"why\" behind conventions with encouragement and references.",
    "prompt": "Act as an Empathetic Engineering Mentor and Staff Engineer. Review this code written by a junior developer, providing constructive, educational feedback.\n\nJunior Developer Code:\n{{CODE}}\n\nLearning Goals / Context:\n{{CONTEXT}}\n\nReview Principles:\n1. Praise Good Choices First: Highlight 2 specific things the developer did well (clean naming, good test, proper intent).\n2. Teach the \"Why\", Not Just the \"What\": Instead of saying \"Don't do X, do Y\", explain the underlying engine mechanics or future maintenance pitfall of X.\n3. Socratic Questions: Ask 1-2 thought-provoking questions that help them discover edge cases independently.\n4. Provide Bite-Sized Examples: Show small, readable code snippets comparing the current approach with the idiomatic pattern.\n5. Provide External Curated Links / Concepts: Mention the canonical design pattern or MDN/V8 doc to read further.\n\nExpected Output Format:\nWarm, highly educational, and encouraging GitHub PR Review comment.",
    "promptText": "Act as an Empathetic Engineering Mentor and Staff Engineer. Review this code written by a junior developer, providing constructive, educational feedback.\n\nJunior Developer Code:\n{{CODE}}\n\nLearning Goals / Context:\n{{CONTEXT}}\n\nReview Principles:\n1. Praise Good Choices First: Highlight 2 specific things the developer did well (clean naming, good test, proper intent).\n2. Teach the \"Why\", Not Just the \"What\": Instead of saying \"Don't do X, do Y\", explain the underlying engine mechanics or future maintenance pitfall of X.\n3. Socratic Questions: Ask 1-2 thought-provoking questions that help them discover edge cases independently.\n4. Provide Bite-Sized Examples: Show small, readable code snippets comparing the current approach with the idiomatic pattern.\n5. Provide External Curated Links / Concepts: Mention the canonical design pattern or MDN/V8 doc to read further.\n\nExpected Output Format:\nWarm, highly educational, and encouraging GitHub PR Review comment.",
    "tags": [
      "engineering",
      "mentorship",
      "code-review",
      "clean-code",
      "learning",
      "culture"
    ],
    "difficulty": "Easy",
    "useCase": "Code Review",
    "variables": [
      "{{CODE}}",
      "{{CONTEXT}}"
    ],
    "expectedOutput": "Encouraging mentorship review comment with positive feedback + educational \"why\" + bite-sized diffs",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-tech-debt-prioritization-matrix",
    "title": "Technical Debt Audit & RICE Prioritization Matrix",
    "category": "Engineering",
    "subcategory": "Architecture Review",
    "description": "Audits legacy technical debt items and scores them using the RICE framework (Reach, Impact, Confidence, Effort) to build an executive engineering roadmap.",
    "prompt": "Act as an Engineering Director and Technical Strategy Consultant. Audit our backlog of technical debt and formulate a prioritized refactoring roadmap.\n\nIdentified Tech Debt Items:\n{{TECH_DEBT_LIST}}\n\nTeam Capacity & Business Goals:\n{{TEAM_CAPACITY}}\n\nTasks:\n1. Categorize Tech Debt:\n   - Architecture Debt (tight coupling, monolith bloat).\n   - Code Debt (dead code, duplicate utilities, untested modules).\n   - Infrastructure Debt (outdated runtimes, deprecated dependencies, slow CI builds).\n   - Documentation & Knowledge Debt (tribal knowledge, missing runbooks).\n2. Score every item using the RICE Framework:\n   - Reach (How many engineers / requests affected per month: 1 - 10).\n   - Impact (Massive = 3x, High = 2x, Medium = 1x, Low = 0.5x).\n   - Confidence (High = 100%, Medium = 80%, Low = 50%).\n   - Effort (Person-weeks: e.g. 2 weeks).\n   - Formula: `RICE Score = (Reach * Impact * Confidence) / Effort`.\n3. Deliver a quarterly refactoring roadmap defending engineering time to executive stakeholders.\n\nExpected Output Format:\n1. Tech Debt Classification Table\n2. RICE Scoring Matrix (Sorted by Priority)\n3. Executive Summary / ROI Justification for Business Stakeholders\n4. Step-by-Step Refactoring Milestones",
    "promptText": "Act as an Engineering Director and Technical Strategy Consultant. Audit our backlog of technical debt and formulate a prioritized refactoring roadmap.\n\nIdentified Tech Debt Items:\n{{TECH_DEBT_LIST}}\n\nTeam Capacity & Business Goals:\n{{TEAM_CAPACITY}}\n\nTasks:\n1. Categorize Tech Debt:\n   - Architecture Debt (tight coupling, monolith bloat).\n   - Code Debt (dead code, duplicate utilities, untested modules).\n   - Infrastructure Debt (outdated runtimes, deprecated dependencies, slow CI builds).\n   - Documentation & Knowledge Debt (tribal knowledge, missing runbooks).\n2. Score every item using the RICE Framework:\n   - Reach (How many engineers / requests affected per month: 1 - 10).\n   - Impact (Massive = 3x, High = 2x, Medium = 1x, Low = 0.5x).\n   - Confidence (High = 100%, Medium = 80%, Low = 50%).\n   - Effort (Person-weeks: e.g. 2 weeks).\n   - Formula: `RICE Score = (Reach * Impact * Confidence) / Effort`.\n3. Deliver a quarterly refactoring roadmap defending engineering time to executive stakeholders.\n\nExpected Output Format:\n1. Tech Debt Classification Table\n2. RICE Scoring Matrix (Sorted by Priority)\n3. Executive Summary / ROI Justification for Business Stakeholders\n4. Step-by-Step Refactoring Milestones",
    "tags": [
      "engineering",
      "tech-debt",
      "refactoring",
      "rice-framework",
      "management",
      "roadmap"
    ],
    "difficulty": "Intermediate",
    "useCase": "Architecture Review",
    "variables": [
      "{{TECH_DEBT_LIST}}",
      "{{TEAM_CAPACITY}}"
    ],
    "expectedOutput": "Classification table + RICE scoring matrix + executive business justification + roadmap milestones",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-performance-profiling-audit",
    "title": "Full-Stack Performance & Bottleneck Profiling Audit",
    "category": "Engineering",
    "subcategory": "Performance Optimization",
    "description": "Identifies latency bottlenecks across client network, server CPU/event-loop, and database queries to achieve sub-100ms response times.",
    "prompt": "Act as a Principal Full-Stack Performance Architect. Diagnose latency and throughput bottlenecks in this application stack.\n\nPerformance Metrics / Symptoms:\n{{PERFORMANCE_SYMPTOMS}}\n\nStack & Architecture:\n{{TECH_STACK}}\n\nTasks:\n1. Triaging the Latency Budget (where are the milliseconds going?):\n   - Client Network / DNS / SSL Handshake time.\n   - Reverse Proxy / Load Balancer queue time.\n   - Node.js / Backend Event Loop lag & synchronous CPU bottlenecks.\n   - Database query execution vs network transport time.\n   - Downstream 3rd-party API latency.\n2. Formulate concrete optimization actions:\n   - Caching layer (HTTP cache headers, Redis in-memory query cache).\n   - Query tuning (indexes, projection limiting, batch fetching).\n   - Node.js event-loop offloading (Worker Threads, streaming response pipelines).\n   - Connection reuse (HTTP Keep-Alive, DB connection pooling).\n3. Provide code implementations for the top 2 highest-ROI optimizations.\n\nExpected Output Format:\n1. Latency Budget Breakdown Waterfall\n2. Bottleneck Root Causes\n3. Concrete Code Implementations (Top 2 Fixes)\n4. Benchmarking Verification Script (Autocannon / k6)",
    "promptText": "Act as a Principal Full-Stack Performance Architect. Diagnose latency and throughput bottlenecks in this application stack.\n\nPerformance Metrics / Symptoms:\n{{PERFORMANCE_SYMPTOMS}}\n\nStack & Architecture:\n{{TECH_STACK}}\n\nTasks:\n1. Triaging the Latency Budget (where are the milliseconds going?):\n   - Client Network / DNS / SSL Handshake time.\n   - Reverse Proxy / Load Balancer queue time.\n   - Node.js / Backend Event Loop lag & synchronous CPU bottlenecks.\n   - Database query execution vs network transport time.\n   - Downstream 3rd-party API latency.\n2. Formulate concrete optimization actions:\n   - Caching layer (HTTP cache headers, Redis in-memory query cache).\n   - Query tuning (indexes, projection limiting, batch fetching).\n   - Node.js event-loop offloading (Worker Threads, streaming response pipelines).\n   - Connection reuse (HTTP Keep-Alive, DB connection pooling).\n3. Provide code implementations for the top 2 highest-ROI optimizations.\n\nExpected Output Format:\n1. Latency Budget Breakdown Waterfall\n2. Bottleneck Root Causes\n3. Concrete Code Implementations (Top 2 Fixes)\n4. Benchmarking Verification Script (Autocannon / k6)",
    "tags": [
      "engineering",
      "performance",
      "profiling",
      "latency",
      "optimization",
      "caching"
    ],
    "difficulty": "Advanced",
    "useCase": "Performance Optimization",
    "variables": [
      "{{PERFORMANCE_SYMPTOMS}}",
      "{{TECH_STACK}}"
    ],
    "expectedOutput": "Latency budget breakdown + root causes + high-ROI code fixes + k6 benchmark script",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-design-patterns-real-world",
    "title": "Design Patterns in Action: Strategy, Factory, Observer & Decorator",
    "category": "Engineering",
    "subcategory": "Design Patterns",
    "description": "Applies classic Gang of Four (GoF) design patterns to solve real-world software engineering challenges with clean, decoupled code.",
    "prompt": "Act as a Senior Software Design Architect. Implement an idiomatic, modern Design Pattern solution for this engineering requirement.\n\nBusiness Problem:\n{{BUSINESS_PROBLEM}}\n\nTarget Language:\n{{TARGET_LANGUAGE}}\n\nTasks:\n1. Pattern Selection:\n   - Strategy Pattern (Interchangeable algorithms e.g. Payment processors, Shipping rate calculators).\n   - Factory / Abstract Factory Pattern (Decoupling object instantiation from client code).\n   - Observer / Pub-Sub Pattern (Event-driven notification broadcast).\n   - Decorator / Middleware Pattern (Dynamically adding cross-cutting concerns like logging or caching).\n   - Adapter Pattern (Normalizing incompatible third-party vendor APIs).\n2. Justify why this pattern adheres to the Open/Closed Principle (OCP) and simplifies maintenance.\n3. Provide clean, fully commented implementation in {{TARGET_LANGUAGE}} with TypeScript types or modern idioms.\n4. Demonstrate client usage showing how adding a new requirement requires zero modifications to existing classes.\n\nExpected Output Format:\n1. Pattern Selection Justification & UML/ASCII Class Diagram\n2. Production Code Implementation\n3. Client Usage Example\n4. Extensibility Proof (Adding a new feature without code modification)",
    "promptText": "Act as a Senior Software Design Architect. Implement an idiomatic, modern Design Pattern solution for this engineering requirement.\n\nBusiness Problem:\n{{BUSINESS_PROBLEM}}\n\nTarget Language:\n{{TARGET_LANGUAGE}}\n\nTasks:\n1. Pattern Selection:\n   - Strategy Pattern (Interchangeable algorithms e.g. Payment processors, Shipping rate calculators).\n   - Factory / Abstract Factory Pattern (Decoupling object instantiation from client code).\n   - Observer / Pub-Sub Pattern (Event-driven notification broadcast).\n   - Decorator / Middleware Pattern (Dynamically adding cross-cutting concerns like logging or caching).\n   - Adapter Pattern (Normalizing incompatible third-party vendor APIs).\n2. Justify why this pattern adheres to the Open/Closed Principle (OCP) and simplifies maintenance.\n3. Provide clean, fully commented implementation in {{TARGET_LANGUAGE}} with TypeScript types or modern idioms.\n4. Demonstrate client usage showing how adding a new requirement requires zero modifications to existing classes.\n\nExpected Output Format:\n1. Pattern Selection Justification & UML/ASCII Class Diagram\n2. Production Code Implementation\n3. Client Usage Example\n4. Extensibility Proof (Adding a new feature without code modification)",
    "tags": [
      "engineering",
      "design-patterns",
      "strategy-pattern",
      "factory-pattern",
      "observer",
      "clean-code"
    ],
    "difficulty": "Intermediate",
    "useCase": "Clean Code",
    "variables": [
      "{{BUSINESS_PROBLEM}}",
      "{{TARGET_LANGUAGE}}"
    ],
    "expectedOutput": "Pattern selection justification + ASCII diagram + production implementation + extensibility proof",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-testing-strategy-pyramid",
    "title": "Automated Testing Strategy: Unit vs Integration vs E2E",
    "category": "Engineering",
    "subcategory": "Testing",
    "description": "Designs an optimal Testing Pyramid: fast unit tests, database-backed integration tests, and critical-path Cypress/Playwright E2E tests.",
    "prompt": "Act as a Quality Engineering (QE) Architect. Design a comprehensive automated testing strategy for this feature / service.\n\nFeature Requirements & Architecture:\n{{FEATURE_DETAILS}}\n\nTasks:\n1. The Testing Pyramid Breakdown:\n   - Unit Tests (70%): Pure functions, domain calculations, isolated service methods using mocks.\n   - Integration Tests (20%): Real API endpoints hitting a containerized test database (Testcontainers) testing queries, transactions, and middlewares.\n   - End-to-End (E2E) Tests (10%): User journey smoke tests (Playwright / Cypress) covering critical revenue paths.\n2. Mocking Strategy:\n   - What to mock (External third-party APIs like Stripe/SendGrid, current clock time, random UUIDs).\n   - What NOT to mock (In-memory business logic, database queries in integration tests).\n3. Code Deliverables:\n   - 1 Unit Test file (Jest/Vitest).\n   - 1 Integration Test file with real DB transactions and rollback.\n   - 1 Playwright E2E test script.\n\nExpected Output Format:\n1. Testing Pyramid Strategy Matrix\n2. Mocking Boundary Guidelines\n3. Unit Test Code File\n4. Integration Test Code File\n5. Playwright E2E Test Code File",
    "promptText": "Act as a Quality Engineering (QE) Architect. Design a comprehensive automated testing strategy for this feature / service.\n\nFeature Requirements & Architecture:\n{{FEATURE_DETAILS}}\n\nTasks:\n1. The Testing Pyramid Breakdown:\n   - Unit Tests (70%): Pure functions, domain calculations, isolated service methods using mocks.\n   - Integration Tests (20%): Real API endpoints hitting a containerized test database (Testcontainers) testing queries, transactions, and middlewares.\n   - End-to-End (E2E) Tests (10%): User journey smoke tests (Playwright / Cypress) covering critical revenue paths.\n2. Mocking Strategy:\n   - What to mock (External third-party APIs like Stripe/SendGrid, current clock time, random UUIDs).\n   - What NOT to mock (In-memory business logic, database queries in integration tests).\n3. Code Deliverables:\n   - 1 Unit Test file (Jest/Vitest).\n   - 1 Integration Test file with real DB transactions and rollback.\n   - 1 Playwright E2E test script.\n\nExpected Output Format:\n1. Testing Pyramid Strategy Matrix\n2. Mocking Boundary Guidelines\n3. Unit Test Code File\n4. Integration Test Code File\n5. Playwright E2E Test Code File",
    "tags": [
      "engineering",
      "testing",
      "unit-tests",
      "integration-tests",
      "playwright",
      "testcontainers",
      "qa"
    ],
    "difficulty": "Intermediate",
    "useCase": "Testing",
    "variables": [
      "{{FEATURE_DETAILS}}"
    ],
    "expectedOutput": "Testing pyramid matrix + mocking guidelines + unit test code + integration test code + Playwright E2E",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "eng-solid-principles-refactoring",
    "title": "Refactor Monolithic Spaghetti Code with SOLID Principles",
    "category": "Engineering",
    "subcategory": "SOLID",
    "description": "Deconstructs god-objects and tight couplings into single-responsibility classes adhering to Open/Closed and Dependency Inversion.",
    "prompt": "Act as a Clean Code and Software Architecture Specialist. Refactor this violation-heavy code by applying the SOLID principles.\n\nViolating Code:\n{{CODE}}\n\nTasks:\n1. Identify specific violations of each of the 5 SOLID principles:\n   - Single Responsibility Principle (SRP): Multiple reasons to change.\n   - Open/Closed Principle (OCP): Requires editing existing code to add new types.\n   - Liskov Substitution Principle (LSP): Subclasses throwing unexpected errors or changing contracts.\n   - Interface Segregation Principle (ISP): Fat interfaces forcing unused method implementations.\n   - Dependency Inversion Principle (DIP): High-level modules importing concrete low-level implementations.\n2. Step-by-step refactoring plan.\n3. Clean, refactored implementation in {{LANGUAGE}} using dependency injection and interfaces.\n4. Unit tests proving that mocking dependencies is now trivial.\n\nExpected Output Format:\n1. SOLID Violation Audit Checklist\n2. Architectural Refactoring Steps\n3. Clean Refactored Implementation\n4. Testability Demonstration with Mocked Dependencies",
    "promptText": "Act as a Clean Code and Software Architecture Specialist. Refactor this violation-heavy code by applying the SOLID principles.\n\nViolating Code:\n{{CODE}}\n\nTasks:\n1. Identify specific violations of each of the 5 SOLID principles:\n   - Single Responsibility Principle (SRP): Multiple reasons to change.\n   - Open/Closed Principle (OCP): Requires editing existing code to add new types.\n   - Liskov Substitution Principle (LSP): Subclasses throwing unexpected errors or changing contracts.\n   - Interface Segregation Principle (ISP): Fat interfaces forcing unused method implementations.\n   - Dependency Inversion Principle (DIP): High-level modules importing concrete low-level implementations.\n2. Step-by-step refactoring plan.\n3. Clean, refactored implementation in {{LANGUAGE}} using dependency injection and interfaces.\n4. Unit tests proving that mocking dependencies is now trivial.\n\nExpected Output Format:\n1. SOLID Violation Audit Checklist\n2. Architectural Refactoring Steps\n3. Clean Refactored Implementation\n4. Testability Demonstration with Mocked Dependencies",
    "tags": [
      "engineering",
      "solid",
      "clean-code",
      "refactoring",
      "oop",
      "architecture"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Refactoring",
    "variables": [
      "{{CODE}}",
      "{{LANGUAGE}}"
    ],
    "expectedOutput": "SOLID violation checklist + refactoring steps + clean implementation + mocked testability demo",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-stack-trace-rca",
    "title": "Runtime Error & Stack Trace Root Cause Analysis (RCA)",
    "category": "Engineering",
    "subcategory": "Production Debugging",
    "description": "Deconstructs cryptic runtime error stack traces, unmasks minified source maps, and provides a defensive fix.",
    "prompt": "Act as a Production Incident Commander and Senior Debugging Specialist. Perform a rigorous Root Cause Analysis (RCA) on this runtime error.\n\nStack Trace & Error Message:\n{{STACK_TRACE}}\n\nAssociated Source Code:\n{{CODE}}\n\nTasks:\n1. Deconstruct the stack trace frame-by-frame:\n   - Identify the exact origin line of the error.\n   - Separate user code frames from third-party / node internal frames.\n2. Root Cause: Explain the underlying mechanism that threw the exception (e.g. TypeError, null dereference, unhandled edge case).\n3. Evidence & Reproduction: Provide the exact input or state condition that triggered the failure.\n4. Minimal Surgical Fix: Provide the cleanest defensive fix without side effects.\n5. Regression Risk & Test Case: Add a unit test reproducing the exact stack trace condition and verifying the fix.\n\nExpected Output Format:\n1. Root Cause Summary (50 words)\n2. Stack Trace Frame Walkthrough\n3. Corrective Code Diff (Before vs After)\n4. Reproduction Unit Test Case\n5. Defensive Invariant to Prevent Similar Bugs",
    "promptText": "Act as a Production Incident Commander and Senior Debugging Specialist. Perform a rigorous Root Cause Analysis (RCA) on this runtime error.\n\nStack Trace & Error Message:\n{{STACK_TRACE}}\n\nAssociated Source Code:\n{{CODE}}\n\nTasks:\n1. Deconstruct the stack trace frame-by-frame:\n   - Identify the exact origin line of the error.\n   - Separate user code frames from third-party / node internal frames.\n2. Root Cause: Explain the underlying mechanism that threw the exception (e.g. TypeError, null dereference, unhandled edge case).\n3. Evidence & Reproduction: Provide the exact input or state condition that triggered the failure.\n4. Minimal Surgical Fix: Provide the cleanest defensive fix without side effects.\n5. Regression Risk & Test Case: Add a unit test reproducing the exact stack trace condition and verifying the fix.\n\nExpected Output Format:\n1. Root Cause Summary (50 words)\n2. Stack Trace Frame Walkthrough\n3. Corrective Code Diff (Before vs After)\n4. Reproduction Unit Test Case\n5. Defensive Invariant to Prevent Similar Bugs",
    "tags": [
      "debugging",
      "stack-trace",
      "rca",
      "error-handling",
      "production-debugging",
      "troubleshooting"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{STACK_TRACE}}",
      "{{CODE}}"
    ],
    "expectedOutput": "RCA summary + frame walkthrough + corrective code diff + unit test + defensive invariant",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-async-unhandled-rejections",
    "title": "Async Unhandled Promise Rejection & Hanging Request Triage",
    "category": "Engineering",
    "subcategory": "Production Debugging",
    "description": "Diagnoses missing catch blocks, hanging un-resolved promises, and unhandled promise rejections that crash Node.js.",
    "prompt": "Act as a Node.js Core and Async Diagnostics Engineer. Resolve this unhandled promise rejection or hanging asynchronous operation.\n\nCode & Async Flow:\n{{CODE}}\n\nError Log or Observed Hang:\n{{ERROR_LOG}}\n\nTasks:\n1. Trace the promise chain or async/await lifecycle:\n   - Why was the rejection not caught by local try/catch blocks? (e.g. Fire-and-forget promise, event emitter callback, un-awaited async function).\n   - If hanging: Why did the promise never settle? (Missing resolve/reject branch, un-acknowledged stream).\n2. Explain how unhandled rejections trigger `process.on('unhandledRejection')` and why they terminate modern Node.js processes.\n3. Rewrite the code using proper error boundaries, `Promise.allSettled`, or async error middleware.\n4. Add global process-level crash safety handlers.\n\nExpected Output Format:\n1. Unhandled Rejection Mechanics Breakdown\n2. Corrected Asynchronous Code\n3. Process-Level Unhandled Rejection Safety Guard\n4. Reproduction & Verification Test",
    "promptText": "Act as a Node.js Core and Async Diagnostics Engineer. Resolve this unhandled promise rejection or hanging asynchronous operation.\n\nCode & Async Flow:\n{{CODE}}\n\nError Log or Observed Hang:\n{{ERROR_LOG}}\n\nTasks:\n1. Trace the promise chain or async/await lifecycle:\n   - Why was the rejection not caught by local try/catch blocks? (e.g. Fire-and-forget promise, event emitter callback, un-awaited async function).\n   - If hanging: Why did the promise never settle? (Missing resolve/reject branch, un-acknowledged stream).\n2. Explain how unhandled rejections trigger `process.on('unhandledRejection')` and why they terminate modern Node.js processes.\n3. Rewrite the code using proper error boundaries, `Promise.allSettled`, or async error middleware.\n4. Add global process-level crash safety handlers.\n\nExpected Output Format:\n1. Unhandled Rejection Mechanics Breakdown\n2. Corrected Asynchronous Code\n3. Process-Level Unhandled Rejection Safety Guard\n4. Reproduction & Verification Test",
    "tags": [
      "debugging",
      "async",
      "promises",
      "unhandled-rejection",
      "nodejs",
      "reliability"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{ERROR_LOG}}"
    ],
    "expectedOutput": "Rejection mechanics breakdown + corrected async code + process safety guard + test case",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-memory-leak-heap-snapshot",
    "title": "Heap Snapshot Memory Leak & Retained Size Investigator",
    "category": "Engineering",
    "subcategory": "Performance Optimization",
    "description": "Analyzes Chrome DevTools / Node.js heap snapshot comparisons, identifies retainer trees, and resolves runaway memory growth.",
    "prompt": "Act as a V8 Garbage Collection and Memory Leak Specialist. Investigate this memory leak based on heap snapshot metrics.\n\nHeap Snapshot Metrics / Profiler Findings:\n{{HEAP_METRICS}}\n\nSuspect Source Code:\n{{CODE}}\n\nTasks:\n1. Understand the Metrics:\n   - Difference between Shallow Size (memory allocated to object itself) and Retained Size (memory freed if object is garbage collected).\n   - Identify the \"Distance\" from GC Root.\n2. Retainer Tree Analysis:\n   - What root object is holding the reference? (Global window, closure context, active timer, detached DOM node).\n3. Fix the Leak:\n   - Nullify dangling references.\n   - Clean up event listeners in teardown lifecycles.\n   - Use `WeakMap` or `WeakRef` for caching.\n4. Provide the before-and-after code and explain the GC reclamation proof.\n\nExpected Output Format:\n1. Retainer Tree Root Cause Diagram\n2. Shallow vs Retained Size Explanation\n3. Remediated Source Code\n4. Chrome DevTools Heap Verification Procedure",
    "promptText": "Act as a V8 Garbage Collection and Memory Leak Specialist. Investigate this memory leak based on heap snapshot metrics.\n\nHeap Snapshot Metrics / Profiler Findings:\n{{HEAP_METRICS}}\n\nSuspect Source Code:\n{{CODE}}\n\nTasks:\n1. Understand the Metrics:\n   - Difference between Shallow Size (memory allocated to object itself) and Retained Size (memory freed if object is garbage collected).\n   - Identify the \"Distance\" from GC Root.\n2. Retainer Tree Analysis:\n   - What root object is holding the reference? (Global window, closure context, active timer, detached DOM node).\n3. Fix the Leak:\n   - Nullify dangling references.\n   - Clean up event listeners in teardown lifecycles.\n   - Use `WeakMap` or `WeakRef` for caching.\n4. Provide the before-and-after code and explain the GC reclamation proof.\n\nExpected Output Format:\n1. Retainer Tree Root Cause Diagram\n2. Shallow vs Retained Size Explanation\n3. Remediated Source Code\n4. Chrome DevTools Heap Verification Procedure",
    "tags": [
      "debugging",
      "memory-leak",
      "heap-snapshot",
      "v8",
      "garbage-collection",
      "performance"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{HEAP_METRICS}}",
      "{{CODE}}"
    ],
    "expectedOutput": "Retainer tree diagram + shallow vs retained explanation + remediated code + heap verification steps",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-database-lock-timeout",
    "title": "Database Lock Contention & Lock Wait Timeout Triage",
    "category": "Database",
    "subcategory": "Query Optimization",
    "description": "Diagnoses database lock wait timeouts (Error 1205 / 55P03), identifies blocking queries via pg_stat_activity, and resolves lock queues.",
    "prompt": "Act as a Senior Database Administrator and PostgreSQL / MySQL Incident Responder. Triage this database lock timeout crisis in production.\n\nDatabase Lock Alert / Error:\n{{LOCK_ERROR}}\n\nActive Queries / pg_stat_activity Output:\n{{ACTIVE_QUERIES}}\n\nTasks:\n1. Emergency Triage (P0 Incident):\n   - Query to identify the blocking PID (Root Blocker) vs the blocked victim PIDs.\n   - Safe command to terminate or cancel the blocking query (`pg_cancel_backend` vs `pg_terminate_backend`).\n2. Root Cause Analysis:\n   - Why did the query hold an exclusive lock for so long? (Long transaction doing network I/O, full table scan inside transaction, unindexed foreign key).\n3. Architectural Prevention:\n   - Lowering `lock_timeout` and `idle_in_transaction_session_timeout`.\n   - Splitting large batch updates into chunks.\n   - Using `NOWAIT` or `SKIP LOCKED` where appropriate.\n4. Provide the complete SQL diagnostic scripts and application code fixes.\n\nExpected Output Format:\n1. Emergency Blocker Identification Query\n2. Incident Triage Steps (Safe termination)\n3. Architectural Root Cause & Prevention Rules\n4. Application Transaction Code Fix",
    "promptText": "Act as a Senior Database Administrator and PostgreSQL / MySQL Incident Responder. Triage this database lock timeout crisis in production.\n\nDatabase Lock Alert / Error:\n{{LOCK_ERROR}}\n\nActive Queries / pg_stat_activity Output:\n{{ACTIVE_QUERIES}}\n\nTasks:\n1. Emergency Triage (P0 Incident):\n   - Query to identify the blocking PID (Root Blocker) vs the blocked victim PIDs.\n   - Safe command to terminate or cancel the blocking query (`pg_cancel_backend` vs `pg_terminate_backend`).\n2. Root Cause Analysis:\n   - Why did the query hold an exclusive lock for so long? (Long transaction doing network I/O, full table scan inside transaction, unindexed foreign key).\n3. Architectural Prevention:\n   - Lowering `lock_timeout` and `idle_in_transaction_session_timeout`.\n   - Splitting large batch updates into chunks.\n   - Using `NOWAIT` or `SKIP LOCKED` where appropriate.\n4. Provide the complete SQL diagnostic scripts and application code fixes.\n\nExpected Output Format:\n1. Emergency Blocker Identification Query\n2. Incident Triage Steps (Safe termination)\n3. Architectural Root Cause & Prevention Rules\n4. Application Transaction Code Fix",
    "tags": [
      "debugging",
      "database",
      "postgres",
      "mysql",
      "locks",
      "incident-response"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{LOCK_ERROR}}",
      "{{ACTIVE_QUERIES}}"
    ],
    "expectedOutput": "Blocker query + emergency termination command + root cause prevention + app transaction fix",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-react-infinite-loop-render",
    "title": "React Infinite Loop: \"Maximum Update Depth Exceeded\" Triage",
    "category": "Development",
    "subcategory": "React",
    "description": "Diagnoses and fixes the classic React error \"Maximum update depth exceeded\" triggered by unconditional state updates during render.",
    "prompt": "Act as a React Internals Specialist. Fix this critical React infinite render loop.\n\nReact Error & Stack Trace:\n{{ERROR_MESSAGE}}\n\nComponent Code:\n{{CODE}}\n\nTasks:\n1. Pinpoint the trigger:\n   - State setter invoked unconditionally during render: `onClick={handleClick()}` instead of `onClick={() => handleClick()}`.\n   - `useEffect` updating state that is included in its own dependency array.\n   - Derived state incorrectly stored in `useState` instead of calculated inline during render.\n2. Explain the React Fiber reconciliation cycle and why it aborts after 50 consecutive loops to protect browser RAM.\n3. Provide the clean, refactored component eliminating the infinite cycle.\n4. Provide an ESLint rule / best practice to catch this during development.\n\nExpected Output Format:\n1. Render Loop Trigger Identification\n2. Fiber Reconciliation Cycle Breakdown\n3. Refactored Component Code\n4. Prevention Guide",
    "promptText": "Act as a React Internals Specialist. Fix this critical React infinite render loop.\n\nReact Error & Stack Trace:\n{{ERROR_MESSAGE}}\n\nComponent Code:\n{{CODE}}\n\nTasks:\n1. Pinpoint the trigger:\n   - State setter invoked unconditionally during render: `onClick={handleClick()}` instead of `onClick={() => handleClick()}`.\n   - `useEffect` updating state that is included in its own dependency array.\n   - Derived state incorrectly stored in `useState` instead of calculated inline during render.\n2. Explain the React Fiber reconciliation cycle and why it aborts after 50 consecutive loops to protect browser RAM.\n3. Provide the clean, refactored component eliminating the infinite cycle.\n4. Provide an ESLint rule / best practice to catch this during development.\n\nExpected Output Format:\n1. Render Loop Trigger Identification\n2. Fiber Reconciliation Cycle Breakdown\n3. Refactored Component Code\n4. Prevention Guide",
    "tags": [
      "debugging",
      "react",
      "infinite-loop",
      "maximum-update-depth",
      "use-effect",
      "state"
    ],
    "difficulty": "Easy",
    "useCase": "Debugging",
    "variables": [
      "{{ERROR_MESSAGE}}",
      "{{CODE}}"
    ],
    "expectedOutput": "Loop trigger identification + Fiber cycle explanation + refactored component + prevention guide",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-500-internal-server-triage",
    "title": "HTTP 500 Internal Server Error & 502/504 Gateway Triage",
    "category": "Engineering",
    "subcategory": "Production Debugging",
    "description": "Step-by-step incident triage for HTTP 500, 502 Bad Gateway, and 504 Gateway Timeout across Nginx, Node.js, and upstream services.",
    "prompt": "Act as a Senior DevOps and Site Reliability Engineer (SRE). Triage and resolve this production HTTP error spike.\n\nHTTP Error Status (500, 502, or 504):\n{{STATUS_CODE}}\n\nServer Logs / Nginx Access & Error Logs:\n{{SERVER_LOGS}}\n\nTasks:\n1. Decouple Error Origins:\n   - 500 Internal Server Error: Unhandled application exception in Node.js/Python backend.\n   - 502 Bad Gateway: Reverse proxy (Nginx) cannot connect to upstream (process crashed, OOM killed, wrong port/socket).\n   - 504 Gateway Timeout: Upstream server took longer than proxy timeout (hanging DB query, synchronous loop).\n2. Diagnostic Commands (Linux / Docker):\n   - Check if process is alive: `ps aux | grep node`, `docker ps`, `systemctl status`.\n   - Check memory / OOM kills: `dmesg -T | grep -i oom`.\n   - Check listening ports & sockets: `netstat -tlpn`, `curl -I localhost:5000`.\n3. Root Cause Analysis & Fix:\n   - Provide the exact configuration or source code fix.\n4. Add automated monitoring alerts to catch this within 60 seconds of occurrence.\n\nExpected Output Format:\n1. Error Origin Classification (500 vs 502 vs 504)\n2. Linux Diagnostic Triage Commands\n3. Root Cause Remediation Code / Config\n4. Prometheus Alert Rule",
    "promptText": "Act as a Senior DevOps and Site Reliability Engineer (SRE). Triage and resolve this production HTTP error spike.\n\nHTTP Error Status (500, 502, or 504):\n{{STATUS_CODE}}\n\nServer Logs / Nginx Access & Error Logs:\n{{SERVER_LOGS}}\n\nTasks:\n1. Decouple Error Origins:\n   - 500 Internal Server Error: Unhandled application exception in Node.js/Python backend.\n   - 502 Bad Gateway: Reverse proxy (Nginx) cannot connect to upstream (process crashed, OOM killed, wrong port/socket).\n   - 504 Gateway Timeout: Upstream server took longer than proxy timeout (hanging DB query, synchronous loop).\n2. Diagnostic Commands (Linux / Docker):\n   - Check if process is alive: `ps aux | grep node`, `docker ps`, `systemctl status`.\n   - Check memory / OOM kills: `dmesg -T | grep -i oom`.\n   - Check listening ports & sockets: `netstat -tlpn`, `curl -I localhost:5000`.\n3. Root Cause Analysis & Fix:\n   - Provide the exact configuration or source code fix.\n4. Add automated monitoring alerts to catch this within 60 seconds of occurrence.\n\nExpected Output Format:\n1. Error Origin Classification (500 vs 502 vs 504)\n2. Linux Diagnostic Triage Commands\n3. Root Cause Remediation Code / Config\n4. Prometheus Alert Rule",
    "tags": [
      "debugging",
      "500-error",
      "502-bad-gateway",
      "504-timeout",
      "nginx",
      "devops",
      "sre"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{STATUS_CODE}}",
      "{{SERVER_LOGS}}"
    ],
    "expectedOutput": "Origin classification + Linux diagnostic commands + remediation code/config + Prometheus alert",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-cors-preflight-failures",
    "title": "CORS Origin Mismatch & OPTIONS Preflight Failure Triage",
    "category": "Development",
    "subcategory": "Express.js",
    "description": "Resolves \"No Access-Control-Allow-Origin header is present on the requested resource\" across browsers, API gateways, and Express.",
    "prompt": "Act as a Web Security and Browser Networking Specialist. Resolve this CORS (Cross-Origin Resource Sharing) failure.\n\nBrowser Console CORS Error:\n{{CONSOLE_ERROR}}\n\nRequest Details (Origin, Method, Headers, Cookies):\n{{REQUEST_DETAILS}}\n\nBackend Server Framework / Config:\n{{BACKEND_CONFIG}}\n\nTasks:\n1. Explain the Same-Origin Policy (SOP) and why the browser blocked the response (not the server!).\n2. Preflight Request (OPTIONS) Analysis:\n   - Why was a preflight triggered? (Custom headers, non-simple method like PUT/DELETE/PATCH, JSON content-type).\n   - What headers must the server return on OPTIONS? (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials`).\n3. Credentials & Wildcard Conflict:\n   - Why `Access-Control-Allow-Origin: *` crashes when `credentials: 'include'` is set (cookie authentication).\n4. Provide the exact backend configuration fix (Express CORS, Nginx, or Spring/FastAPI).\n\nExpected Output Format:\n1. SOP & Preflight Trigger Breakdown\n2. Request/Response Header Trace\n3. Corrected Backend CORS Configuration Code\n4. Verification Curl Command Simulating Preflight OPTIONS",
    "promptText": "Act as a Web Security and Browser Networking Specialist. Resolve this CORS (Cross-Origin Resource Sharing) failure.\n\nBrowser Console CORS Error:\n{{CONSOLE_ERROR}}\n\nRequest Details (Origin, Method, Headers, Cookies):\n{{REQUEST_DETAILS}}\n\nBackend Server Framework / Config:\n{{BACKEND_CONFIG}}\n\nTasks:\n1. Explain the Same-Origin Policy (SOP) and why the browser blocked the response (not the server!).\n2. Preflight Request (OPTIONS) Analysis:\n   - Why was a preflight triggered? (Custom headers, non-simple method like PUT/DELETE/PATCH, JSON content-type).\n   - What headers must the server return on OPTIONS? (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials`).\n3. Credentials & Wildcard Conflict:\n   - Why `Access-Control-Allow-Origin: *` crashes when `credentials: 'include'` is set (cookie authentication).\n4. Provide the exact backend configuration fix (Express CORS, Nginx, or Spring/FastAPI).\n\nExpected Output Format:\n1. SOP & Preflight Trigger Breakdown\n2. Request/Response Header Trace\n3. Corrected Backend CORS Configuration Code\n4. Verification Curl Command Simulating Preflight OPTIONS",
    "tags": [
      "debugging",
      "cors",
      "preflight",
      "options",
      "security",
      "browser-networking"
    ],
    "difficulty": "Easy",
    "useCase": "Debugging",
    "variables": [
      "{{CONSOLE_ERROR}}",
      "{{REQUEST_DETAILS}}",
      "{{BACKEND_CONFIG}}"
    ],
    "expectedOutput": "SOP/preflight breakdown + header trace + corrected backend CORS config + curl test command",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-css-layout-overflow-breaks",
    "title": "CSS Layout Break, Flexbox/Grid Overflow & Scrollbar Diagnostic",
    "category": "Development",
    "subcategory": "HTML/CSS",
    "description": "Diagnoses accidental horizontal page scrolling, shrinking flex items, broken grid layouts, and z-index stacking context bugs.",
    "prompt": "Act as a CSS Master and Modern Layout Specialist. Diagnose and fix the broken layout in this HTML/CSS component.\n\nHTML & CSS Code:\n{{CODE}}\n\nVisual Glitch / Bug (e.g. Unwanted horizontal scrollbar / Flex item collapsing / z-index not working):\n{{VISUAL_GLITCH}}\n\nTasks:\n1. Diagnose the Root Cause:\n   - Accidental Horizontal Scrollbar: Unconstrained elements, 100vw including scrollbar width, negative margins, missing `box-sizing: border-box`.\n   - Flexbox Shrink Bug: `min-width: auto` default preventing text truncation (fix: `min-width: 0`).\n   - Stacking Context Bug: Why `z-index: 9999` fails when parent has `opacity < 1`, `transform`, or `isolation: isolate`.\n2. Inspect the computed styles and container boundaries.\n3. Provide the minimal, elegant CSS fix using modern CSS standards (Flexbox, Grid, container queries, logical properties).\n4. Ensure responsive stability across mobile (375px), tablet (768px), and desktop (1440px).\n\nExpected Output Format:\n1. CSS Layout Engine Mechanics Breakdown\n2. Minimal Surgical CSS Diff (Before vs After)\n3. Responsive Verification Checklist\n4. Complete Working Code",
    "promptText": "Act as a CSS Master and Modern Layout Specialist. Diagnose and fix the broken layout in this HTML/CSS component.\n\nHTML & CSS Code:\n{{CODE}}\n\nVisual Glitch / Bug (e.g. Unwanted horizontal scrollbar / Flex item collapsing / z-index not working):\n{{VISUAL_GLITCH}}\n\nTasks:\n1. Diagnose the Root Cause:\n   - Accidental Horizontal Scrollbar: Unconstrained elements, 100vw including scrollbar width, negative margins, missing `box-sizing: border-box`.\n   - Flexbox Shrink Bug: `min-width: auto` default preventing text truncation (fix: `min-width: 0`).\n   - Stacking Context Bug: Why `z-index: 9999` fails when parent has `opacity < 1`, `transform`, or `isolation: isolate`.\n2. Inspect the computed styles and container boundaries.\n3. Provide the minimal, elegant CSS fix using modern CSS standards (Flexbox, Grid, container queries, logical properties).\n4. Ensure responsive stability across mobile (375px), tablet (768px), and desktop (1440px).\n\nExpected Output Format:\n1. CSS Layout Engine Mechanics Breakdown\n2. Minimal Surgical CSS Diff (Before vs After)\n3. Responsive Verification Checklist\n4. Complete Working Code",
    "tags": [
      "debugging",
      "css",
      "flexbox",
      "grid",
      "overflow",
      "z-index",
      "responsive"
    ],
    "difficulty": "Easy",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{VISUAL_GLITCH}}"
    ],
    "expectedOutput": "CSS layout engine breakdown + surgical CSS diff + responsive checklist + working code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-docker-container-crashloop",
    "title": "Docker Container CrashLoopBackOff & Exit Code Triage",
    "category": "DevOps / Cloud",
    "subcategory": "Docker",
    "description": "Triages Docker container unexpected terminations (Exit code 137 OOM, 139 segfault, 127 command not found, 1 application error).",
    "prompt": "Act as a Container Infrastructure and Kubernetes SRE. Diagnose why this Docker container terminates unexpectedly or enters CrashLoopBackOff.\n\nContainer Logs:\n{{CONTAINER_LOGS}}\n\nDockerfile & Compose Config:\n{{DOCKERFILE_CONTENT}}\n\nContainer Exit Code:\n{{EXIT_CODE}}\n\nTasks:\n1. Exit Code Translation:\n   - Exit 137: SIGKILL (128 + 9) -> Out of Memory (OOM Killer) by Linux kernel.\n   - Exit 143: SIGTERM (128 + 15) -> Graceful shutdown deadline exceeded.\n   - Exit 127: Command or executable not found (missing PATH or wrong shell).\n   - Exit 1: General application crash (unhandled exception on startup).\n2. Diagnostic commands:\n   - `docker logs --tail 100 [container_id]`\n   - `docker inspect [container_id] --format='{{json .State}}'`\n   - Inspecting entrypoint and CMD execution.\n3. Provide the exact Dockerfile or configuration remediation.\n4. Add memory resource limits and healthcheck definitions to prevent silent failure.\n\nExpected Output Format:\n1. Exit Code Meaning & Root Cause Analysis\n2. Container Inspection Commands\n3. Corrected Dockerfile / docker-compose.yml\n4. Resource Limits & Healthcheck Definition",
    "promptText": "Act as a Container Infrastructure and Kubernetes SRE. Diagnose why this Docker container terminates unexpectedly or enters CrashLoopBackOff.\n\nContainer Logs:\n{{CONTAINER_LOGS}}\n\nDockerfile & Compose Config:\n{{DOCKERFILE_CONTENT}}\n\nContainer Exit Code:\n{{EXIT_CODE}}\n\nTasks:\n1. Exit Code Translation:\n   - Exit 137: SIGKILL (128 + 9) -> Out of Memory (OOM Killer) by Linux kernel.\n   - Exit 143: SIGTERM (128 + 15) -> Graceful shutdown deadline exceeded.\n   - Exit 127: Command or executable not found (missing PATH or wrong shell).\n   - Exit 1: General application crash (unhandled exception on startup).\n2. Diagnostic commands:\n   - `docker logs --tail 100 [container_id]`\n   - `docker inspect [container_id] --format='{{json .State}}'`\n   - Inspecting entrypoint and CMD execution.\n3. Provide the exact Dockerfile or configuration remediation.\n4. Add memory resource limits and healthcheck definitions to prevent silent failure.\n\nExpected Output Format:\n1. Exit Code Meaning & Root Cause Analysis\n2. Container Inspection Commands\n3. Corrected Dockerfile / docker-compose.yml\n4. Resource Limits & Healthcheck Definition",
    "tags": [
      "debugging",
      "docker",
      "containers",
      "crashloop",
      "kubernetes",
      "devops",
      "oom"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{CONTAINER_LOGS}}",
      "{{DOCKERFILE_CONTENT}}",
      "{{EXIT_CODE}}"
    ],
    "expectedOutput": "Exit code translation + inspection commands + corrected Dockerfile/compose + resource limits",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-network-latency-packet-drop",
    "title": "Network Packet Drop, TCP Retransmission & Latency Triage",
    "category": "Core Computer Science",
    "subcategory": "Computer Networks",
    "description": "Diagnoses high round-trip latency, TCP retransmissions, MTU size blackholes, and dropped packets using ping, traceroute, and curl.",
    "prompt": "Act as a Network Reliability Engineer (NRE). Investigate this high latency and packet loss issue between microservices.\n\nNetwork Symptoms / Ping & Curl Metrics:\n{{NETWORK_METRICS}}\n\nNetwork Topology:\n{{NETWORK_TOPOLOGY}}\n\nTasks:\n1. Layer-by-Layer Network Triage:\n   - Layer 3 (IP / ICMP): `ping` packet loss rate and RTT variance (jitter).\n   - Layer 4 (TCP): Retransmission rate, TCP window size exhaustion, SYN-ACK delay.\n   - Layer 7 (HTTP / TLS): Time to First Byte (TTFB), DNS lookup time, TLS handshake time via `curl -w \"@curl-format.txt\"`.\n2. Path Diagnostics:\n   - Running `traceroute` / `mtr` to find the specific congested hop or routing loop.\n   - MTU / MSS issues: Packet fragmentation and Path MTU Discovery (PMTUD) blackholes.\n3. Provide actionable remediation:\n   - TCP Keep-Alive and connection pooling.\n   - Adjusting socket buffer sizes (`SO_RCVBUF`, `SO_SNDBUF`).\n   - Regional deployment closer to users.\n\nExpected Output Format:\n1. Latency Breakdown Matrix (DNS, TCP, TLS, TTFB)\n2. Network Diagnostic CLI Toolkit (curl, mtr, tcpdump commands)\n3. Root Cause Hop Identification\n4. Socket & Connection Pooling Configuration Code",
    "promptText": "Act as a Network Reliability Engineer (NRE). Investigate this high latency and packet loss issue between microservices.\n\nNetwork Symptoms / Ping & Curl Metrics:\n{{NETWORK_METRICS}}\n\nNetwork Topology:\n{{NETWORK_TOPOLOGY}}\n\nTasks:\n1. Layer-by-Layer Network Triage:\n   - Layer 3 (IP / ICMP): `ping` packet loss rate and RTT variance (jitter).\n   - Layer 4 (TCP): Retransmission rate, TCP window size exhaustion, SYN-ACK delay.\n   - Layer 7 (HTTP / TLS): Time to First Byte (TTFB), DNS lookup time, TLS handshake time via `curl -w \"@curl-format.txt\"`.\n2. Path Diagnostics:\n   - Running `traceroute` / `mtr` to find the specific congested hop or routing loop.\n   - MTU / MSS issues: Packet fragmentation and Path MTU Discovery (PMTUD) blackholes.\n3. Provide actionable remediation:\n   - TCP Keep-Alive and connection pooling.\n   - Adjusting socket buffer sizes (`SO_RCVBUF`, `SO_SNDBUF`).\n   - Regional deployment closer to users.\n\nExpected Output Format:\n1. Latency Breakdown Matrix (DNS, TCP, TLS, TTFB)\n2. Network Diagnostic CLI Toolkit (curl, mtr, tcpdump commands)\n3. Root Cause Hop Identification\n4. Socket & Connection Pooling Configuration Code",
    "tags": [
      "debugging",
      "networking",
      "latency",
      "packet-loss",
      "tcp",
      "ttfb",
      "mtr"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{NETWORK_METRICS}}",
      "{{NETWORK_TOPOLOGY}}"
    ],
    "expectedOutput": "Latency breakdown matrix + CLI diagnostic commands + root cause hop + socket pooling code",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "debug-silent-logic-undefined-hunter",
    "title": "Silent Logic Bug & Falsy Value Misconception Hunter",
    "category": "Engineering",
    "subcategory": "Clean Code",
    "description": "Tracks down elusive silent logic bugs caused by falsy JavaScript comparisons (0, \"\", NaN, false) and operator precedence.",
    "prompt": "Act as an Elite Bug Hunter and Code Detective. Find the subtle, silent logic error in this code that executes without crashing but produces wrong results.\n\nCode:\n{{CODE}}\n\nExpected Behavior vs Actual Result:\n{{SYMPTOMS}}\n\nTasks:\n1. Identify the hidden logic bug:\n   - Falsy value coercion: Using `val || default` where `0` or `\"\"` or `false` are valid values (should use Nullish Coalescing `??`).\n   - Equality bugs: Abstract equality (`==`) vs Strict equality (`===`).\n   - Array reference comparison: `[1] === [1]` evaluating to false.\n   - Mutating array during iteration.\n   - Operator precedence: `typeof x === 'object' && x !== null` vs bitwise/ternary misplacements.\n2. Step-by-step trace showing the exact condition where execution takes the wrong branch.\n3. Provide the corrected code with strict type-safety.\n4. Provide a regression test suite catching the subtle boundary values.\n\nExpected Output Format:\n1. Silent Bug Discovery & Line Reference\n2. Falsy / Operator Precedence Mechanism Explanation\n3. Refactored Code with Nullish Coalescing / Strict Checks\n4. Comprehensive Boundary Value Unit Tests",
    "promptText": "Act as an Elite Bug Hunter and Code Detective. Find the subtle, silent logic error in this code that executes without crashing but produces wrong results.\n\nCode:\n{{CODE}}\n\nExpected Behavior vs Actual Result:\n{{SYMPTOMS}}\n\nTasks:\n1. Identify the hidden logic bug:\n   - Falsy value coercion: Using `val || default` where `0` or `\"\"` or `false` are valid values (should use Nullish Coalescing `??`).\n   - Equality bugs: Abstract equality (`==`) vs Strict equality (`===`).\n   - Array reference comparison: `[1] === [1]` evaluating to false.\n   - Mutating array during iteration.\n   - Operator precedence: `typeof x === 'object' && x !== null` vs bitwise/ternary misplacements.\n2. Step-by-step trace showing the exact condition where execution takes the wrong branch.\n3. Provide the corrected code with strict type-safety.\n4. Provide a regression test suite catching the subtle boundary values.\n\nExpected Output Format:\n1. Silent Bug Discovery & Line Reference\n2. Falsy / Operator Precedence Mechanism Explanation\n3. Refactored Code with Nullish Coalescing / Strict Checks\n4. Comprehensive Boundary Value Unit Tests",
    "tags": [
      "debugging",
      "clean-code",
      "logic-bug",
      "nullish-coalescing",
      "type-coercion",
      "javascript"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{SYMPTOMS}}"
    ],
    "expectedOutput": "Silent bug identification + operator mechanics explanation + refactored code + boundary unit tests",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-metric-selection-formulation",
    "title": "Machine Learning Problem Formulation & Metric Selection",
    "category": "AI / ML",
    "subcategory": "Machine Learning",
    "description": "Translates raw business problems into ML tasks (Regression, Classification, Ranking) and selects non-misleading evaluation metrics (PR-AUC vs ROC-AUC).",
    "prompt": "Act as a Principal Machine Learning Scientist. Formulate an end-to-end ML strategy for this business problem.\n\nBusiness Problem & Objective:\n{{BUSINESS_PROBLEM}}\n\nData Characteristics (Imbalance ratio, sample size, feature types):\n{{DATA_CHARACTERISTICS}}\n\nTasks:\n1. Problem Formulation:\n   - Frame as Supervised, Unsupervised, or Self-Supervised task.\n   - Classification vs Regression vs Ranking vs Anomaly Detection.\n2. Metric Selection & Justification:\n   - Why Accuracy is misleading for imbalanced datasets (e.g. 99% accuracy predicting non-fraud when 1% is fraud).\n   - Precision (minimizing false positives) vs Recall (minimizing false negatives).\n   - F1-Score, PR-AUC (Precision-Recall Curve) vs ROC-AUC selection rationale.\n3. Baseline Model: Propose a simple heuristic or logistic regression baseline before deep learning.\n4. Evaluation Protocol: Stratified K-Fold Cross Validation vs Time-Series Rolling Window split.\n\nExpected Output Format:\n1. ML Problem Formulation Card\n2. Evaluation Metric Matrix & Business Trade-offs\n3. Baseline Model Proposal\n4. Cross-Validation Protocol Specification",
    "promptText": "Act as a Principal Machine Learning Scientist. Formulate an end-to-end ML strategy for this business problem.\n\nBusiness Problem & Objective:\n{{BUSINESS_PROBLEM}}\n\nData Characteristics (Imbalance ratio, sample size, feature types):\n{{DATA_CHARACTERISTICS}}\n\nTasks:\n1. Problem Formulation:\n   - Frame as Supervised, Unsupervised, or Self-Supervised task.\n   - Classification vs Regression vs Ranking vs Anomaly Detection.\n2. Metric Selection & Justification:\n   - Why Accuracy is misleading for imbalanced datasets (e.g. 99% accuracy predicting non-fraud when 1% is fraud).\n   - Precision (minimizing false positives) vs Recall (minimizing false negatives).\n   - F1-Score, PR-AUC (Precision-Recall Curve) vs ROC-AUC selection rationale.\n3. Baseline Model: Propose a simple heuristic or logistic regression baseline before deep learning.\n4. Evaluation Protocol: Stratified K-Fold Cross Validation vs Time-Series Rolling Window split.\n\nExpected Output Format:\n1. ML Problem Formulation Card\n2. Evaluation Metric Matrix & Business Trade-offs\n3. Baseline Model Proposal\n4. Cross-Validation Protocol Specification",
    "tags": [
      "ai-ml",
      "machine-learning",
      "metrics",
      "classification",
      "data-science",
      "pr-auc"
    ],
    "difficulty": "Intermediate",
    "useCase": "Architecture Review",
    "variables": [
      "{{BUSINESS_PROBLEM}}",
      "{{DATA_CHARACTERISTICS}}"
    ],
    "expectedOutput": "ML problem formulation card + metric selection matrix + baseline proposal + CV protocol",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-data-preprocessing-pipeline",
    "title": "Data Preprocessing & Feature Engineering Pipeline (Pandas & Sklearn)",
    "category": "AI / ML",
    "subcategory": "Data Analysis",
    "description": "Builds an end-to-end data cleaning and transformation pipeline: missing value imputation, outlier handling, categorical encoding, and scaling.",
    "prompt": "Act as a Senior Data Scientist. Build an automated data preprocessing and feature engineering pipeline using Python, Pandas, and Scikit-Learn.\n\nDataset Description & Raw Columns:\n{{DATASET_DESCRIPTION}}\n\nTasks:\n1. Missing Value Strategy:\n   - Numerical: Median / KNN Imputation.\n   - Categorical: Mode / Missing indicator flag.\n2. Categorical Encoding:\n   - One-Hot Encoding (low cardinality) vs Target Encoding / Frequency Encoding (high cardinality).\n3. Numerical Transformations & Scaling:\n   - Handling skewed distributions (Log transform / Box-Cox).\n   - RobustScaler vs StandardScaler vs MinMaxScaler.\n4. Outlier Detection: IQR (Interquartile Range) clipping vs Isolation Forest.\n5. Encapsulate into an idiomatic `sklearn.pipeline.Pipeline` with `ColumnTransformer` to prevent data leakage.\n\nExpected Output Format:\n1. Preprocessing Strategy Architecture\n2. Python Scikit-Learn ColumnTransformer Code\n3. Data Leakage Prevention Checkpoints\n4. Verification Script Output",
    "promptText": "Act as a Senior Data Scientist. Build an automated data preprocessing and feature engineering pipeline using Python, Pandas, and Scikit-Learn.\n\nDataset Description & Raw Columns:\n{{DATASET_DESCRIPTION}}\n\nTasks:\n1. Missing Value Strategy:\n   - Numerical: Median / KNN Imputation.\n   - Categorical: Mode / Missing indicator flag.\n2. Categorical Encoding:\n   - One-Hot Encoding (low cardinality) vs Target Encoding / Frequency Encoding (high cardinality).\n3. Numerical Transformations & Scaling:\n   - Handling skewed distributions (Log transform / Box-Cox).\n   - RobustScaler vs StandardScaler vs MinMaxScaler.\n4. Outlier Detection: IQR (Interquartile Range) clipping vs Isolation Forest.\n5. Encapsulate into an idiomatic `sklearn.pipeline.Pipeline` with `ColumnTransformer` to prevent data leakage.\n\nExpected Output Format:\n1. Preprocessing Strategy Architecture\n2. Python Scikit-Learn ColumnTransformer Code\n3. Data Leakage Prevention Checkpoints\n4. Verification Script Output",
    "tags": [
      "ai-ml",
      "data-science",
      "preprocessing",
      "feature-engineering",
      "pandas",
      "scikit-learn"
    ],
    "difficulty": "Intermediate",
    "useCase": "Code Refactoring",
    "variables": [
      "{{DATASET_DESCRIPTION}}"
    ],
    "expectedOutput": "Preprocessing architecture + ColumnTransformer code + leakage prevention checkpoints + verification script",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-data-leakage-audit",
    "title": "Train-Test Data Leakage Audit & Cross-Validation Diagnostic",
    "category": "AI / ML",
    "subcategory": "ML Preprocessing",
    "description": "Diagnoses unrealistically high model performance (99.9% accuracy) caused by target leakage, future feature leakage, or pre-split scaling.",
    "prompt": "Act as a Machine Learning Validation and Ethics Auditor. Audit this ML training pipeline for subtle Data Leakage flaws.\n\nModel Training Code:\n{{CODE}}\n\nSuspicious Results (e.g. 99.8% test accuracy, but fails in production):\n{{RESULTS}}\n\nTasks:\n1. Identify Data Leakage Vectors:\n   - Pre-split transformation leakage: Fitting scalers, encoders, or imputers on the entire dataset prior to `train_test_split`.\n   - Target Leakage: Features inadvertently proxying the target variable (e.g. including refund date when predicting return likelihood).\n   - Temporal / Time-Series Leakage: Using future information to predict past events (random train-test split on time-series instead of temporal cut).\n   - Duplicate / Group Leakage: Multiple records from the same user across train and test sets (requires `GroupKFold`).\n2. Provide the corrected, leak-free pipeline using `Pipeline(steps=[...])` ensuring fit occurs ONLY on training folds.\n3. Show before-and-after realistic performance expectations.\n\nExpected Output Format:\n1. Leakage Vector Audit Findings\n2. Mechanism of Production Failure Explanation\n3. Corrected Leak-Free Training Pipeline Code\n4. Group / Time-Series Splitting Verification",
    "promptText": "Act as a Machine Learning Validation and Ethics Auditor. Audit this ML training pipeline for subtle Data Leakage flaws.\n\nModel Training Code:\n{{CODE}}\n\nSuspicious Results (e.g. 99.8% test accuracy, but fails in production):\n{{RESULTS}}\n\nTasks:\n1. Identify Data Leakage Vectors:\n   - Pre-split transformation leakage: Fitting scalers, encoders, or imputers on the entire dataset prior to `train_test_split`.\n   - Target Leakage: Features inadvertently proxying the target variable (e.g. including refund date when predicting return likelihood).\n   - Temporal / Time-Series Leakage: Using future information to predict past events (random train-test split on time-series instead of temporal cut).\n   - Duplicate / Group Leakage: Multiple records from the same user across train and test sets (requires `GroupKFold`).\n2. Provide the corrected, leak-free pipeline using `Pipeline(steps=[...])` ensuring fit occurs ONLY on training folds.\n3. Show before-and-after realistic performance expectations.\n\nExpected Output Format:\n1. Leakage Vector Audit Findings\n2. Mechanism of Production Failure Explanation\n3. Corrected Leak-Free Training Pipeline Code\n4. Group / Time-Series Splitting Verification",
    "tags": [
      "ai-ml",
      "machine-learning",
      "data-leakage",
      "cross-validation",
      "scikit-learn",
      "debugging"
    ],
    "difficulty": "Advanced",
    "useCase": "Debugging",
    "variables": [
      "{{CODE}}",
      "{{RESULTS}}"
    ],
    "expectedOutput": "Leakage vector audit + production failure explanation + leak-free pipeline code + splitting verification",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-overfitting-underfitting-tuning",
    "title": "Bias-Variance Trade-Off: Overfitting vs Underfitting Diagnostic",
    "category": "AI / ML",
    "subcategory": "Machine Learning",
    "description": "Diagnoses learning curves: high bias (underfitting) vs high variance (overfitting) and applies regularization, pruning, or model capacity.",
    "prompt": "Act as a Machine Learning Tuning Specialist. Diagnose and resolve the overfitting or underfitting problem in this model.\n\nTraining vs Validation Curves / Metrics:\n{{TRAIN_VAL_METRICS}}\n\nModel Architecture & Hyperparameters:\n{{MODEL_SETUP}}\n\nTasks:\n1. Diagnose Bias vs Variance:\n   - High Bias (Underfitting): Low training score + low validation score (model is too simple to capture patterns).\n   - High Variance (Overfitting): High training score (99%) + low validation score (75%) (model memorized noise).\n2. Systematic Remedies:\n   - For Overfitting: Regularization (L1 Lasso, L2 Ridge, Dropout), reducing tree depth (max_depth), early stopping, data augmentation, feature pruning.\n   - For Underfitting: Increasing model capacity, adding polynomial/interaction features, decreasing regularization, training longer.\n3. Provide hyperparameter tuning script using Optuna or GridSearchCV.\n4. Deliver the remediated model code with optimal regularization.\n\nExpected Output Format:\n1. Learning Curve Diagnostic Analysis\n2. Remediation Strategy Roadmap\n3. Optuna / GridSearchCV Hyperparameter Search Code\n4. Final Regularized Model Configuration",
    "promptText": "Act as a Machine Learning Tuning Specialist. Diagnose and resolve the overfitting or underfitting problem in this model.\n\nTraining vs Validation Curves / Metrics:\n{{TRAIN_VAL_METRICS}}\n\nModel Architecture & Hyperparameters:\n{{MODEL_SETUP}}\n\nTasks:\n1. Diagnose Bias vs Variance:\n   - High Bias (Underfitting): Low training score + low validation score (model is too simple to capture patterns).\n   - High Variance (Overfitting): High training score (99%) + low validation score (75%) (model memorized noise).\n2. Systematic Remedies:\n   - For Overfitting: Regularization (L1 Lasso, L2 Ridge, Dropout), reducing tree depth (max_depth), early stopping, data augmentation, feature pruning.\n   - For Underfitting: Increasing model capacity, adding polynomial/interaction features, decreasing regularization, training longer.\n3. Provide hyperparameter tuning script using Optuna or GridSearchCV.\n4. Deliver the remediated model code with optimal regularization.\n\nExpected Output Format:\n1. Learning Curve Diagnostic Analysis\n2. Remediation Strategy Roadmap\n3. Optuna / GridSearchCV Hyperparameter Search Code\n4. Final Regularized Model Configuration",
    "tags": [
      "ai-ml",
      "overfitting",
      "underfitting",
      "bias-variance",
      "hyperparameters",
      "optuna"
    ],
    "difficulty": "Intermediate",
    "useCase": "Performance Optimization",
    "variables": [
      "{{TRAIN_VAL_METRICS}}",
      "{{MODEL_SETUP}}"
    ],
    "expectedOutput": "Learning curve diagnostic + remediation roadmap + Optuna tuning script + regularized model config",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-prompt-engineering-optimizer",
    "title": "System Prompt Engineering & Meta-Prompt Optimizer",
    "category": "AI / ML",
    "subcategory": "Prompt Engineering",
    "description": "Rewrites weak, vague prompts into high-performance, deterministic system prompts using XML tagging, few-shot examples, and output contracts.",
    "prompt": "Act as a Principal Prompt Engineer and LLM Alignment Specialist. Rewrite and optimize this basic prompt for maximum reliability and deterministic output.\n\nOriginal Vague Prompt:\n{{ORIGINAL_PROMPT}}\n\nTarget Model & Desired Output Format:\n{{TARGET_MODEL_AND_FORMAT}}\n\nTasks:\n1. Analyze the weaknesses of the original prompt (ambiguity, lack of negative constraints, risk of hallucination).\n2. Engineer the optimized prompt using gold-standard techniques:\n   - Clear Persona & Role definition.\n   - Context & Background framing.\n   - Explicit step-by-step reasoning instructions (Chain of Thought).\n   - Strict Input/Output Boundaries using structured XML tags (`<context>`, `<instructions>`, `<input>`, `<output>`).\n   - Negative Constraints (\"What NOT to do\").\n   - 2 High-Quality Few-Shot Examples demonstrating input-to-output mapping.\n   - Fallback instruction for edge cases / unknown inputs (\"If uncertain, output...\").\n3. Provide the final, production-ready system prompt ready for integration.\n\nExpected Output Format:\n1. Prompt Flaws Deconstruction\n2. Advanced Prompt Engineering Strategy\n3. Production-Ready Engineered Prompt (with XML tags and few-shots)\n4. Evaluation Test Prompts to Validate Edge Cases",
    "promptText": "Act as a Principal Prompt Engineer and LLM Alignment Specialist. Rewrite and optimize this basic prompt for maximum reliability and deterministic output.\n\nOriginal Vague Prompt:\n{{ORIGINAL_PROMPT}}\n\nTarget Model & Desired Output Format:\n{{TARGET_MODEL_AND_FORMAT}}\n\nTasks:\n1. Analyze the weaknesses of the original prompt (ambiguity, lack of negative constraints, risk of hallucination).\n2. Engineer the optimized prompt using gold-standard techniques:\n   - Clear Persona & Role definition.\n   - Context & Background framing.\n   - Explicit step-by-step reasoning instructions (Chain of Thought).\n   - Strict Input/Output Boundaries using structured XML tags (`<context>`, `<instructions>`, `<input>`, `<output>`).\n   - Negative Constraints (\"What NOT to do\").\n   - 2 High-Quality Few-Shot Examples demonstrating input-to-output mapping.\n   - Fallback instruction for edge cases / unknown inputs (\"If uncertain, output...\").\n3. Provide the final, production-ready system prompt ready for integration.\n\nExpected Output Format:\n1. Prompt Flaws Deconstruction\n2. Advanced Prompt Engineering Strategy\n3. Production-Ready Engineered Prompt (with XML tags and few-shots)\n4. Evaluation Test Prompts to Validate Edge Cases",
    "tags": [
      "ai-ml",
      "prompt-engineering",
      "llm",
      "system-prompts",
      "few-shot",
      "meta-prompting"
    ],
    "difficulty": "Intermediate",
    "useCase": "Prompt Engineering",
    "variables": [
      "{{ORIGINAL_PROMPT}}",
      "{{TARGET_MODEL_AND_FORMAT}}"
    ],
    "expectedOutput": "Prompt flaws audit + engineering strategy + production prompt with XML/few-shots + validation test inputs",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-rag-architecture-chunking",
    "title": "RAG Architecture: Document Chunking, Overlap & Vector Search",
    "category": "AI / ML",
    "subcategory": "RAG",
    "description": "Architects an enterprise Retrieval-Augmented Generation (RAG) pipeline: recursive character chunking, semantic overlap, and hybrid search.",
    "prompt": "Act as a RAG (Retrieval-Augmented Generation) Systems Architect. Design a production-grade RAG pipeline for this document repository.\n\nDocument Corpus Description (Length, formats, domain):\n{{CORPUS_DESCRIPTION}}\n\nTarget User Queries:\n{{USER_QUERIES}}\n\nTasks:\n1. Chunking Strategy:\n   - Compare Fixed-size chunking vs Recursive Character chunking vs Semantic / Markdown header chunking.\n   - Optimize Chunk Size (e.g. 512 tokens) and Chunk Overlap (e.g. 10% / 50 tokens) to preserve context across boundaries without duplication.\n2. Embedding Model Selection:\n   - Dimension size, context window, and language performance (e.g. OpenAI text-embedding-3-small vs HuggingFace BGE / E5).\n3. Retrieval & Re-ranking:\n   - Hybrid Search: Combining Dense Semantic Vector Search + Sparse Lexical Keyword Search (BM25) via Reciprocal Rank Fusion (RRF).\n   - Cross-Encoder Re-ranker (Cohere / BGE-Reranker) on top 20 retrieved chunks.\n4. Context Injection & Hallucination Guardrails:\n   - Strict prompt template demanding citations and rejecting queries when context is insufficient.\n5. Provide complete Python code using LangChain, LlamaIndex, or vanilla SDK.\n\nExpected Output Format:\n1. RAG Architecture Diagram & Data Flow\n2. Chunking Parameter Justification\n3. Hybrid Search & Re-Ranking Pipeline Code (Python)\n4. Context-Augmented System Prompt with Strict Citation Guard",
    "promptText": "Act as a RAG (Retrieval-Augmented Generation) Systems Architect. Design a production-grade RAG pipeline for this document repository.\n\nDocument Corpus Description (Length, formats, domain):\n{{CORPUS_DESCRIPTION}}\n\nTarget User Queries:\n{{USER_QUERIES}}\n\nTasks:\n1. Chunking Strategy:\n   - Compare Fixed-size chunking vs Recursive Character chunking vs Semantic / Markdown header chunking.\n   - Optimize Chunk Size (e.g. 512 tokens) and Chunk Overlap (e.g. 10% / 50 tokens) to preserve context across boundaries without duplication.\n2. Embedding Model Selection:\n   - Dimension size, context window, and language performance (e.g. OpenAI text-embedding-3-small vs HuggingFace BGE / E5).\n3. Retrieval & Re-ranking:\n   - Hybrid Search: Combining Dense Semantic Vector Search + Sparse Lexical Keyword Search (BM25) via Reciprocal Rank Fusion (RRF).\n   - Cross-Encoder Re-ranker (Cohere / BGE-Reranker) on top 20 retrieved chunks.\n4. Context Injection & Hallucination Guardrails:\n   - Strict prompt template demanding citations and rejecting queries when context is insufficient.\n5. Provide complete Python code using LangChain, LlamaIndex, or vanilla SDK.\n\nExpected Output Format:\n1. RAG Architecture Diagram & Data Flow\n2. Chunking Parameter Justification\n3. Hybrid Search & Re-Ranking Pipeline Code (Python)\n4. Context-Augmented System Prompt with Strict Citation Guard",
    "tags": [
      "ai-ml",
      "rag",
      "embeddings",
      "chunking",
      "vector-search",
      "hybrid-search",
      "llm"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture Review",
    "variables": [
      "{{CORPUS_DESCRIPTION}}",
      "{{USER_QUERIES}}"
    ],
    "expectedOutput": "RAG pipeline diagram + chunking math + hybrid search code + citation system prompt",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-vector-database-indexing",
    "title": "Vector Database Indexing: HNSW vs IVF-Flat vs Cosine Distance",
    "category": "AI / ML",
    "subcategory": "RAG",
    "description": "Evaluates vector database indexes (HNSW, IVFFlat, Annoy) and distance metrics (Cosine vs Dot Product vs L2 Euclidean) for latency vs recall.",
    "prompt": "Act as a Vector Search and Information Retrieval Specialist. Design the vector indexing strategy for our high-scale embedding store.\n\nVector Dimension, Scale & Latency SLAs:\n{{VECTOR_SCALE_AND_SLAS}}\n\nTasks:\n1. Approximate Nearest Neighbors (ANN) Index Algorithms:\n   - Flat / Exact Search (100% recall, O(N) linear time, too slow for >1M vectors).\n   - IVFFlat (Inverted File Index): Clustering space into Voronoi cells (fast build, lower RAM, sensitive to nprobe).\n   - HNSW (Hierarchical Navigable Small World): Multi-layer proximity graph (gold standard for sub-10ms queries, high build time and RAM).\n2. Distance Metric Selection:\n   - Cosine Similarity vs Dot Product (Inner Product) vs Euclidean Distance (L2). Explain why normalized vectors make Dot Product equivalent to Cosine at 3x speed.\n3. Database Selection:\n   - Dedicated (Pinecone, Qdrant, Weaviate, Milvus) vs Extension (pgvector in PostgreSQL). When is pgvector sufficient?\n4. Provide pgvector DDL schema and HNSW index creation statement with parameter tuning (m=16, ef_construction=64).\n\nExpected Output Format:\n1. ANN Algorithm Comparison Matrix (Recall, Latency, Index Build Time, RAM)\n2. Distance Metric Mathematical Proof\n3. pgvector / Qdrant DDL & Index Tuning Code\n4. Hardware Sizing & RAM Calculation Formula",
    "promptText": "Act as a Vector Search and Information Retrieval Specialist. Design the vector indexing strategy for our high-scale embedding store.\n\nVector Dimension, Scale & Latency SLAs:\n{{VECTOR_SCALE_AND_SLAS}}\n\nTasks:\n1. Approximate Nearest Neighbors (ANN) Index Algorithms:\n   - Flat / Exact Search (100% recall, O(N) linear time, too slow for >1M vectors).\n   - IVFFlat (Inverted File Index): Clustering space into Voronoi cells (fast build, lower RAM, sensitive to nprobe).\n   - HNSW (Hierarchical Navigable Small World): Multi-layer proximity graph (gold standard for sub-10ms queries, high build time and RAM).\n2. Distance Metric Selection:\n   - Cosine Similarity vs Dot Product (Inner Product) vs Euclidean Distance (L2). Explain why normalized vectors make Dot Product equivalent to Cosine at 3x speed.\n3. Database Selection:\n   - Dedicated (Pinecone, Qdrant, Weaviate, Milvus) vs Extension (pgvector in PostgreSQL). When is pgvector sufficient?\n4. Provide pgvector DDL schema and HNSW index creation statement with parameter tuning (m=16, ef_construction=64).\n\nExpected Output Format:\n1. ANN Algorithm Comparison Matrix (Recall, Latency, Index Build Time, RAM)\n2. Distance Metric Mathematical Proof\n3. pgvector / Qdrant DDL & Index Tuning Code\n4. Hardware Sizing & RAM Calculation Formula",
    "tags": [
      "ai-ml",
      "vector-database",
      "hnsw",
      "embeddings",
      "pgvector",
      "qdrant",
      "pinecone"
    ],
    "difficulty": "Advanced",
    "useCase": "Architecture Review",
    "variables": [
      "{{VECTOR_SCALE_AND_SLAS}}"
    ],
    "expectedOutput": "ANN comparison matrix + distance metric proof + pgvector HNSW DDL + RAM sizing math",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-openai-function-calling",
    "title": "LLM Function Calling & Strict JSON Structured Output",
    "category": "AI / ML",
    "subcategory": "AI Integration",
    "description": "Implements OpenAI / Anthropic Function Calling with JSON Schema validation to reliably trigger tools and extract structured data.",
    "prompt": "Act as a Senior AI Applications Engineer. Build a robust tool-calling integration where an LLM calls backend functions and returns strict structured JSON.\n\nTools to Expose to LLM:\n{{TOOLS_DESCRIPTION}}\n\nDesired Structured Output:\n{{OUTPUT_SCHEMA}}\n\nTasks:\n1. Define the Function Tools Schema using JSON Schema (types, required fields, enum constraints, field descriptions).\n2. Implement the Orchestration Loop:\n   - Send prompt + tools to API.\n   - Detect when model returns `tool_calls`.\n   - Safely execute the local function with validated arguments.\n   - Return the tool output back to the conversation thread.\n   - Extract the final response in strict JSON mode (`response_format: { type: \"json_object\" }` or Pydantic).\n3. Handle Hallucinated Tool Arguments:\n   - Validate incoming arguments against a Pydantic model and send validation errors back to the model for self-correction.\n4. Provide complete, runnable Python code.\n\nExpected Output Format:\n1. Tool Definition JSON Schema\n2. Multi-Turn Function Execution Loop Code\n3. Pydantic Argument Validator\n4. Self-Correction on Error Handler",
    "promptText": "Act as a Senior AI Applications Engineer. Build a robust tool-calling integration where an LLM calls backend functions and returns strict structured JSON.\n\nTools to Expose to LLM:\n{{TOOLS_DESCRIPTION}}\n\nDesired Structured Output:\n{{OUTPUT_SCHEMA}}\n\nTasks:\n1. Define the Function Tools Schema using JSON Schema (types, required fields, enum constraints, field descriptions).\n2. Implement the Orchestration Loop:\n   - Send prompt + tools to API.\n   - Detect when model returns `tool_calls`.\n   - Safely execute the local function with validated arguments.\n   - Return the tool output back to the conversation thread.\n   - Extract the final response in strict JSON mode (`response_format: { type: \"json_object\" }` or Pydantic).\n3. Handle Hallucinated Tool Arguments:\n   - Validate incoming arguments against a Pydantic model and send validation errors back to the model for self-correction.\n4. Provide complete, runnable Python code.\n\nExpected Output Format:\n1. Tool Definition JSON Schema\n2. Multi-Turn Function Execution Loop Code\n3. Pydantic Argument Validator\n4. Self-Correction on Error Handler",
    "tags": [
      "ai-ml",
      "function-calling",
      "tools",
      "openai",
      "llm-agents",
      "json-schema"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{TOOLS_DESCRIPTION}}",
      "{{OUTPUT_SCHEMA}}"
    ],
    "expectedOutput": "JSON schema tool definition + multi-turn execution loop + Pydantic validation + self-correction handler",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-fastapi-model-serving",
    "title": "FastAPI Production ML Model Serving Endpoint with Pydantic",
    "category": "AI / ML",
    "subcategory": "FastAPI",
    "description": "Builds a high-throughput async FastAPI inference service: model preloading in lifespan, request validation, batch prediction, and healthchecks.",
    "prompt": "Act as an MLOps and High-Performance Python Backend Engineer. Build a production-grade FastAPI microservice serving a machine learning model.\n\nModel Type & Input Features:\n{{MODEL_DETAILS}}\n\nTasks:\n1. High-Performance Architecture:\n   - Use FastAPI `lifespan` context manager to load the model into memory once on startup (never reload per request).\n   - Async endpoint with offloading CPU-bound `model.predict()` to threadpool (`run_in_threadpool`) so the event loop is never blocked.\n2. Request & Response Validation:\n   - Pydantic models with field constraints, descriptions, and examples.\n3. Batch Inference Support:\n   - Accept single item or batch array of items for vectorized scoring.\n4. Production Observability:\n   - Inference latency tracking header (`X-Inference-Time-Ms`).\n   - Liveness/readiness health check verifying model is warm in RAM.\n5. Provide complete, copy-paste ready Python code.\n\nExpected Output Format:\n1. FastAPI Production Inference Service Code (main.py)\n2. Pydantic Request & Response Schemas\n3. Threadpool Concurrency Proof\n4. Dockerfile & Gunicorn/Uvicorn Command",
    "promptText": "Act as an MLOps and High-Performance Python Backend Engineer. Build a production-grade FastAPI microservice serving a machine learning model.\n\nModel Type & Input Features:\n{{MODEL_DETAILS}}\n\nTasks:\n1. High-Performance Architecture:\n   - Use FastAPI `lifespan` context manager to load the model into memory once on startup (never reload per request).\n   - Async endpoint with offloading CPU-bound `model.predict()` to threadpool (`run_in_threadpool`) so the event loop is never blocked.\n2. Request & Response Validation:\n   - Pydantic models with field constraints, descriptions, and examples.\n3. Batch Inference Support:\n   - Accept single item or batch array of items for vectorized scoring.\n4. Production Observability:\n   - Inference latency tracking header (`X-Inference-Time-Ms`).\n   - Liveness/readiness health check verifying model is warm in RAM.\n5. Provide complete, copy-paste ready Python code.\n\nExpected Output Format:\n1. FastAPI Production Inference Service Code (main.py)\n2. Pydantic Request & Response Schemas\n3. Threadpool Concurrency Proof\n4. Dockerfile & Gunicorn/Uvicorn Command",
    "tags": [
      "ai-ml",
      "fastapi",
      "mlops",
      "model-serving",
      "python",
      "pydantic",
      "async"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{MODEL_DETAILS}}"
    ],
    "expectedOutput": "FastAPI service code + Pydantic schemas + threadpool concurrency pattern + Dockerfile command",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-shap-model-explainability",
    "title": "Model Explainability: Feature Importance, SHAP & LIME",
    "category": "AI / ML",
    "subcategory": "Data Analysis",
    "description": "Explains black-box machine learning predictions using SHAP (Shapley Additive Explanations) and feature attribution waterfalls.",
    "prompt": "Act as an AI Ethics and Explainable AI (XAI) Specialist. Implement model explainability using SHAP for this trained model.\n\nModel Type & Dataset:\n{{MODEL_AND_DATASET}}\n\nTasks:\n1. Theory of Shapley Values:\n   - Game theory origin: Fairly distributing the \"payout\" (prediction divergence from base value) among \"players\" (features).\n2. SHAP Implementation:\n   - TreeExplainer for Tree-based models (XGBoost, Random Forest, LightGBM) or KernelExplainer for black-box models.\n   - Calculate global feature importance (Summary plot).\n   - Calculate local individual prediction attribution (Waterfall / Force plot).\n3. Translate mathematical SHAP values into plain-English business reasons (e.g. for loan denial or churn prevention).\n4. Provide complete Python code.\n\nExpected Output Format:\n1. Shapley Values Conceptual Primer\n2. Python SHAP Explainer Pipeline Code\n3. Global vs Local Interpretability Visualizations\n4. Plain-English Business Translation Template",
    "promptText": "Act as an AI Ethics and Explainable AI (XAI) Specialist. Implement model explainability using SHAP for this trained model.\n\nModel Type & Dataset:\n{{MODEL_AND_DATASET}}\n\nTasks:\n1. Theory of Shapley Values:\n   - Game theory origin: Fairly distributing the \"payout\" (prediction divergence from base value) among \"players\" (features).\n2. SHAP Implementation:\n   - TreeExplainer for Tree-based models (XGBoost, Random Forest, LightGBM) or KernelExplainer for black-box models.\n   - Calculate global feature importance (Summary plot).\n   - Calculate local individual prediction attribution (Waterfall / Force plot).\n3. Translate mathematical SHAP values into plain-English business reasons (e.g. for loan denial or churn prevention).\n4. Provide complete Python code.\n\nExpected Output Format:\n1. Shapley Values Conceptual Primer\n2. Python SHAP Explainer Pipeline Code\n3. Global vs Local Interpretability Visualizations\n4. Plain-English Business Translation Template",
    "tags": [
      "ai-ml",
      "shap",
      "xai",
      "explainability",
      "feature-importance",
      "data-science"
    ],
    "difficulty": "Intermediate",
    "useCase": "Data Analysis",
    "variables": [
      "{{MODEL_AND_DATASET}}"
    ],
    "expectedOutput": "Shapley values primer + Python SHAP pipeline code + interpretability visualizations + business template",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "ai-ml-llm-rag-hallucination-evaluator",
    "title": "RAG Hallucination & Faithfulness Evaluation Framework",
    "category": "AI / ML",
    "subcategory": "RAG",
    "description": "Builds an automated evaluation harness (Ragas / TruLens style) scoring Faithfulness, Answer Relevance, and Context Precision.",
    "prompt": "Act as an LLM Evaluation (Evals) and Quality Assurance Architect. Build an automated evaluation harness to test our RAG system against hallucinations.\n\nRAG System Description & Golden Test Dataset:\n{{RAG_SYSTEM_DETAILS}}\n\nTasks:\n1. Core Evaluation Triad (Ragas Metrics):\n   - Faithfulness: Is the generated answer grounded strictly in the retrieved context? (Detecting hallucinations).\n   - Answer Relevance: Does the answer directly address the user query without rambling?\n   - Context Precision / Recall: Did the retrieval engine fetch the relevant chunks without noisy distractors?\n2. Automated LLM-as-a-Judge Pipeline:\n   - Design structured evaluation prompts that grade each metric on a 1-5 scale with justification.\n3. Regression CI/CD Integration:\n   - Script that runs the test suite across 50 golden queries and fails if Faithfulness drops below 90%.\n4. Provide complete Python evaluation script.\n\nExpected Output Format:\n1. RAG Triad Evaluation Methodology\n2. LLM-as-a-Judge Evaluation Prompts\n3. Automated Evaluation Pipeline Code (Python)\n4. CI/CD Threshold Assertion Script",
    "promptText": "Act as an LLM Evaluation (Evals) and Quality Assurance Architect. Build an automated evaluation harness to test our RAG system against hallucinations.\n\nRAG System Description & Golden Test Dataset:\n{{RAG_SYSTEM_DETAILS}}\n\nTasks:\n1. Core Evaluation Triad (Ragas Metrics):\n   - Faithfulness: Is the generated answer grounded strictly in the retrieved context? (Detecting hallucinations).\n   - Answer Relevance: Does the answer directly address the user query without rambling?\n   - Context Precision / Recall: Did the retrieval engine fetch the relevant chunks without noisy distractors?\n2. Automated LLM-as-a-Judge Pipeline:\n   - Design structured evaluation prompts that grade each metric on a 1-5 scale with justification.\n3. Regression CI/CD Integration:\n   - Script that runs the test suite across 50 golden queries and fails if Faithfulness drops below 90%.\n4. Provide complete Python evaluation script.\n\nExpected Output Format:\n1. RAG Triad Evaluation Methodology\n2. LLM-as-a-Judge Evaluation Prompts\n3. Automated Evaluation Pipeline Code (Python)\n4. CI/CD Threshold Assertion Script",
    "tags": [
      "ai-ml",
      "rag",
      "evals",
      "hallucination",
      "llm-as-a-judge",
      "testing"
    ],
    "difficulty": "Advanced",
    "useCase": "Testing",
    "variables": [
      "{{RAG_SYSTEM_DETAILS}}"
    ],
    "expectedOutput": "Evaluation methodology + LLM-as-a-judge prompts + automated pipeline code + CI/CD assertions",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-git-rebase-conflict-rescuer",
    "title": "Git Interactive Rebase & Complex Merge Conflict Rescuer",
    "category": "DevOps / Cloud",
    "subcategory": "Git",
    "description": "Guides interactive rebase (git rebase -i), squashing commits, resolving three-way merge conflicts, and recovering with git reflog.",
    "prompt": "Act as a Git Internals and Version Control Master. Help me resolve a complex rebase conflict and clean up my branch commit history.\n\nCurrent Git State & Branches:\n{{GIT_STATUS_AND_BRANCHES}}\n\nDesired Objective (e.g. Squash 8 commits into 1, rebase on latest main, resolve conflicts):\n{{OBJECTIVE}}\n\nTasks:\n1. Explain the difference between `git merge` and `git rebase` (rewriting commit hash history vs creating a merge commit).\n2. Step-by-Step Interactive Rebase Guide:\n   - Command: `git rebase -i main`.\n   - Actions explained: `pick`, `squash` (s), `reword` (r), `fixup` (f), `drop` (d).\n3. Conflict Resolution Protocol:\n   - Understanding conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`).\n   - Resolving and continuing (`git add .` -> `git rebase --continue`).\n4. Disaster Recovery Safety Net:\n   - How to abort safely if things go wrong: `git rebase --abort`.\n   - Using `git reflog` to find the previous HEAD SHA and reset if commits are lost.\n5. Provide the exact CLI command sequence.\n\nExpected Output Format:\n1. Safety Backup Command (creating rescue branch first)\n2. Interactive Rebase Todo List Configuration\n3. Conflict Resolution Commands\n4. `git reflog` Disaster Recovery Instructions",
    "promptText": "Act as a Git Internals and Version Control Master. Help me resolve a complex rebase conflict and clean up my branch commit history.\n\nCurrent Git State & Branches:\n{{GIT_STATUS_AND_BRANCHES}}\n\nDesired Objective (e.g. Squash 8 commits into 1, rebase on latest main, resolve conflicts):\n{{OBJECTIVE}}\n\nTasks:\n1. Explain the difference between `git merge` and `git rebase` (rewriting commit hash history vs creating a merge commit).\n2. Step-by-Step Interactive Rebase Guide:\n   - Command: `git rebase -i main`.\n   - Actions explained: `pick`, `squash` (s), `reword` (r), `fixup` (f), `drop` (d).\n3. Conflict Resolution Protocol:\n   - Understanding conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`).\n   - Resolving and continuing (`git add .` -> `git rebase --continue`).\n4. Disaster Recovery Safety Net:\n   - How to abort safely if things go wrong: `git rebase --abort`.\n   - Using `git reflog` to find the previous HEAD SHA and reset if commits are lost.\n5. Provide the exact CLI command sequence.\n\nExpected Output Format:\n1. Safety Backup Command (creating rescue branch first)\n2. Interactive Rebase Todo List Configuration\n3. Conflict Resolution Commands\n4. `git reflog` Disaster Recovery Instructions",
    "tags": [
      "devops",
      "git",
      "rebase",
      "merge-conflicts",
      "reflog",
      "git-workflow"
    ],
    "difficulty": "Intermediate",
    "useCase": "DevOps & Tools",
    "variables": [
      "{{GIT_STATUS_AND_BRANCHES}}",
      "{{OBJECTIVE}}"
    ],
    "expectedOutput": "Safety backup command + rebase todo list + conflict resolution steps + reflog recovery",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-git-bisect-bug-hunt",
    "title": "Git Bisect: Binary Search to Pinpoint the Exact Regression Commit",
    "category": "DevOps / Cloud",
    "subcategory": "Git",
    "description": "Uses git bisect to binary search through hundreds of commits and find the exact commit that introduced a production regression.",
    "prompt": "Act as a Software Reliability and Git Forensic Specialist. Walk me through using `git bisect` to isolate a regression bug in our repository.\n\nRegression Symptom:\n{{REGRESSION_SYMPTOM}}\n\nKnown Good Commit / Tag:\n{{KNOWN_GOOD_COMMIT}}\n\nKnown Bad Commit (e.g. main/HEAD):\n{{KNOWN_BAD_COMMIT}}\n\nTasks:\n1. Explain how `git bisect` performs binary search across the commit graph in O(log N) tests.\n2. Step-by-Step Manual Bisect Protocol:\n   - `git bisect start`\n   - `git bisect bad [commit]`\n   - `git bisect good [commit]`\n   - Testing each checkout and marking `git bisect good` or `git bisect bad`.\n   - Concluding with `git bisect reset`.\n3. Fully Automated Bisect with Test Script:\n   - Writing a bash script that returns exit code 0 on pass and 1 on fail.\n   - Running `git bisect run ./test-script.sh` to automatically pinpoint the culprit in 30 seconds.\n4. Provide the complete shell command sequence and automation script.\n\nExpected Output Format:\n1. Binary Search Math (Number of steps for N commits)\n2. Manual Bisect Workflow Walkthrough\n3. Automated Bisect Script (`run-test.sh`)\n4. Post-Identification Forensic Steps (Inspecting commit diff and author)",
    "promptText": "Act as a Software Reliability and Git Forensic Specialist. Walk me through using `git bisect` to isolate a regression bug in our repository.\n\nRegression Symptom:\n{{REGRESSION_SYMPTOM}}\n\nKnown Good Commit / Tag:\n{{KNOWN_GOOD_COMMIT}}\n\nKnown Bad Commit (e.g. main/HEAD):\n{{KNOWN_BAD_COMMIT}}\n\nTasks:\n1. Explain how `git bisect` performs binary search across the commit graph in O(log N) tests.\n2. Step-by-Step Manual Bisect Protocol:\n   - `git bisect start`\n   - `git bisect bad [commit]`\n   - `git bisect good [commit]`\n   - Testing each checkout and marking `git bisect good` or `git bisect bad`.\n   - Concluding with `git bisect reset`.\n3. Fully Automated Bisect with Test Script:\n   - Writing a bash script that returns exit code 0 on pass and 1 on fail.\n   - Running `git bisect run ./test-script.sh` to automatically pinpoint the culprit in 30 seconds.\n4. Provide the complete shell command sequence and automation script.\n\nExpected Output Format:\n1. Binary Search Math (Number of steps for N commits)\n2. Manual Bisect Workflow Walkthrough\n3. Automated Bisect Script (`run-test.sh`)\n4. Post-Identification Forensic Steps (Inspecting commit diff and author)",
    "tags": [
      "devops",
      "git",
      "git-bisect",
      "debugging",
      "regression",
      "binary-search"
    ],
    "difficulty": "Intermediate",
    "useCase": "Debugging",
    "variables": [
      "{{REGRESSION_SYMPTOM}}",
      "{{KNOWN_GOOD_COMMIT}}",
      "{{KNOWN_BAD_COMMIT}}"
    ],
    "expectedOutput": "Binary search math + manual bisect workflow + automated test script + forensic diff steps",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-dockerfile-multistage-production",
    "title": "Multi-Stage Production Dockerfile Optimization (Security & Size)",
    "category": "DevOps / Cloud",
    "subcategory": "Docker",
    "description": "Compresses image sizes from 1.5GB down to 80MB using multi-stage builds, Alpine/Distroless bases, caching layers, and non-root users.",
    "prompt": "Act as a Container Security and Docker Optimization Specialist. Transform this bloated, insecure Dockerfile into a lean production image.\n\nCurrent Inefficient Dockerfile:\n{{DOCKERFILE_CONTENT}}\n\nApplication Framework & Runtime:\n{{APP_FRAMEWORK}}\n\nTasks:\n1. Multi-Stage Build Architecture:\n   - Stage 1 (Builder): Heavy dev dependencies, build tools, TypeScript compilation, node_modules.\n   - Stage 2 (Runner): Minimal Alpine or Distroless base image containing ONLY compiled assets and production dependencies.\n2. Layer Caching Optimization:\n   - Copying `package.json` and lockfile BEFORE source code to maximize Docker cache hits.\n3. Security Hardening:\n   - Running as non-root user (`USER node` or `USER 10001`) to prevent container breakout exploits.\n   - Eliminating build secrets and SSH keys from image layers.\n   - Setting `NODE_ENV=production`.\n4. Add clean `.dockerignore` file.\n5. Provide complete, production-ready Dockerfile and before-and-after size comparison.\n\nExpected Output Format:\n1. Vulnerability & Size Audit of Original Image\n2. Optimized Multi-Stage Dockerfile Code\n3. Production .dockerignore File\n4. Verification & Scan Commands (Docker Scout / Trivy)",
    "promptText": "Act as a Container Security and Docker Optimization Specialist. Transform this bloated, insecure Dockerfile into a lean production image.\n\nCurrent Inefficient Dockerfile:\n{{DOCKERFILE_CONTENT}}\n\nApplication Framework & Runtime:\n{{APP_FRAMEWORK}}\n\nTasks:\n1. Multi-Stage Build Architecture:\n   - Stage 1 (Builder): Heavy dev dependencies, build tools, TypeScript compilation, node_modules.\n   - Stage 2 (Runner): Minimal Alpine or Distroless base image containing ONLY compiled assets and production dependencies.\n2. Layer Caching Optimization:\n   - Copying `package.json` and lockfile BEFORE source code to maximize Docker cache hits.\n3. Security Hardening:\n   - Running as non-root user (`USER node` or `USER 10001`) to prevent container breakout exploits.\n   - Eliminating build secrets and SSH keys from image layers.\n   - Setting `NODE_ENV=production`.\n4. Add clean `.dockerignore` file.\n5. Provide complete, production-ready Dockerfile and before-and-after size comparison.\n\nExpected Output Format:\n1. Vulnerability & Size Audit of Original Image\n2. Optimized Multi-Stage Dockerfile Code\n3. Production .dockerignore File\n4. Verification & Scan Commands (Docker Scout / Trivy)",
    "tags": [
      "devops",
      "docker",
      "dockerfile",
      "multi-stage",
      "security",
      "containers",
      "alpine"
    ],
    "difficulty": "Intermediate",
    "useCase": "DevOps & Tools",
    "variables": [
      "{{DOCKERFILE_CONTENT}}",
      "{{APP_FRAMEWORK}}"
    ],
    "expectedOutput": "Size audit + multi-stage Dockerfile + .dockerignore + security vulnerability scan command",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-docker-compose-production",
    "title": "Docker Compose Full-Stack Orchestration (API + DB + Redis)",
    "category": "DevOps / Cloud",
    "subcategory": "Docker",
    "description": "Orchestrates multi-container local and production stacks with healthcheck dependencies, named persistent volumes, and bridge networks.",
    "prompt": "Act as a Cloud Infrastructure and Docker Compose Engineer. Build a robust `docker-compose.yml` orchestrating this full-stack environment.\n\nServices Required (e.g. Node API, PostgreSQL, Redis, Nginx):\n{{SERVICES_REQUIRED}}\n\nTasks:\n1. Design Multi-Container Services:\n   - API service building from local Dockerfile with hot-reloading for dev or optimized for prod.\n   - Database service (PostgreSQL/MySQL) with persistent named volume mount.\n   - Cache service (Redis) with memory limits.\n2. Startup Dependency Management:\n   - Using `depends_on` with `condition: service_healthy` (ensuring API only starts AFTER Postgres is fully ready to accept queries).\n3. Networking & Security:\n   - Custom bridge network isolating database from public host ports.\n   - Environment variables using `.env` file.\n4. Healthchecks:\n   - Concrete healthcheck commands for each service (e.g. `pg_isready`, `redis-cli ping`).\n5. Provide complete, tested `docker-compose.yml`.\n\nExpected Output Format:\n1. Service Topology Diagram\n2. Production docker-compose.yml File\n3. Sample .env Configuration Template\n4. One-Command Startup & Teardown Cheatsheet",
    "promptText": "Act as a Cloud Infrastructure and Docker Compose Engineer. Build a robust `docker-compose.yml` orchestrating this full-stack environment.\n\nServices Required (e.g. Node API, PostgreSQL, Redis, Nginx):\n{{SERVICES_REQUIRED}}\n\nTasks:\n1. Design Multi-Container Services:\n   - API service building from local Dockerfile with hot-reloading for dev or optimized for prod.\n   - Database service (PostgreSQL/MySQL) with persistent named volume mount.\n   - Cache service (Redis) with memory limits.\n2. Startup Dependency Management:\n   - Using `depends_on` with `condition: service_healthy` (ensuring API only starts AFTER Postgres is fully ready to accept queries).\n3. Networking & Security:\n   - Custom bridge network isolating database from public host ports.\n   - Environment variables using `.env` file.\n4. Healthchecks:\n   - Concrete healthcheck commands for each service (e.g. `pg_isready`, `redis-cli ping`).\n5. Provide complete, tested `docker-compose.yml`.\n\nExpected Output Format:\n1. Service Topology Diagram\n2. Production docker-compose.yml File\n3. Sample .env Configuration Template\n4. One-Command Startup & Teardown Cheatsheet",
    "tags": [
      "devops",
      "docker",
      "docker-compose",
      "containers",
      "full-stack",
      "postgres",
      "redis"
    ],
    "difficulty": "Intermediate",
    "useCase": "Full Stack Development",
    "variables": [
      "{{SERVICES_REQUIRED}}"
    ],
    "expectedOutput": "Service topology diagram + docker-compose.yml + .env template + startup cheatsheet",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-linux-log-analysis-cli",
    "title": "Linux Log Analysis & Text Processing (grep, awk, sed, xargs)",
    "category": "DevOps / Cloud",
    "subcategory": "Linux",
    "description": "Analyzes multi-gigabyte production server logs using bash one-liners: finding top 10 offending IPs, error spikes, and slow endpoints.",
    "prompt": "Act as a Senior Linux Systems Administrator and CLI Wizard. Formulate bash one-liner pipelines to extract critical telemetry from server logs.\n\nLog Format Sample:\n{{LOG_SAMPLE}}\n\nInvestigation Objective (e.g. Top 10 IP addresses causing 500 errors / Peak traffic hours):\n{{INVESTIGATION_OBJECTIVE}}\n\nTasks:\n1. Provide the optimized command pipeline using standard POSIX utilities:\n   - `grep` / `zgrep` for pattern filtering.\n   - `awk` for column extraction and arithmetic summing.\n   - `sed` for string replacement and regex normalization.\n   - `sort` and `uniq -c` for frequency aggregation.\n2. Explain each flag and piping stage in plain English.\n3. Optimize for performance on large files (10GB+): avoiding memory buffering, using `LC_ALL=C` for 10x faster sorting.\n4. Show sample output generated by the command.\n\nExpected Output Format:\n1. Optimized Bash One-Liner Pipeline\n2. Step-by-Step Pipe Stage Explanation\n3. Performance Tuning Flags (LC_ALL=C, mmap)\n4. Sample Output Analysis",
    "promptText": "Act as a Senior Linux Systems Administrator and CLI Wizard. Formulate bash one-liner pipelines to extract critical telemetry from server logs.\n\nLog Format Sample:\n{{LOG_SAMPLE}}\n\nInvestigation Objective (e.g. Top 10 IP addresses causing 500 errors / Peak traffic hours):\n{{INVESTIGATION_OBJECTIVE}}\n\nTasks:\n1. Provide the optimized command pipeline using standard POSIX utilities:\n   - `grep` / `zgrep` for pattern filtering.\n   - `awk` for column extraction and arithmetic summing.\n   - `sed` for string replacement and regex normalization.\n   - `sort` and `uniq -c` for frequency aggregation.\n2. Explain each flag and piping stage in plain English.\n3. Optimize for performance on large files (10GB+): avoiding memory buffering, using `LC_ALL=C` for 10x faster sorting.\n4. Show sample output generated by the command.\n\nExpected Output Format:\n1. Optimized Bash One-Liner Pipeline\n2. Step-by-Step Pipe Stage Explanation\n3. Performance Tuning Flags (LC_ALL=C, mmap)\n4. Sample Output Analysis",
    "tags": [
      "devops",
      "linux",
      "bash",
      "awk",
      "grep",
      "sed",
      "log-analysis",
      "cli"
    ],
    "difficulty": "Intermediate",
    "useCase": "DevOps & Tools",
    "variables": [
      "{{LOG_SAMPLE}}",
      "{{INVESTIGATION_OBJECTIVE}}"
    ],
    "expectedOutput": "Bash pipeline + pipe stage explanation + performance flags + sample output",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-nginx-reverse-proxy-ssl",
    "title": "Nginx Reverse Proxy: SSL Termination, WebSocket Proxy & Gzip",
    "category": "DevOps / Cloud",
    "subcategory": "Linux",
    "description": "Configures a production nginx.conf: SSL/TLS termination, HTTP/2, WebSocket upgrades, client IP header preservation, and rate limiting.",
    "prompt": "Act as a Web Server and Nginx Traffic Engineer. Build a high-performance, secure `nginx.conf` configuration file.\n\nDomain & Upstream Services:\n{{DOMAIN_AND_UPSTREAM}}\n\nTasks:\n1. HTTP to HTTPS Redirection (301 Permanent Redirect on port 80).\n2. SSL/TLS 1.3 Hardening on port 443:\n   - Modern ciphers, SSL session caching, and HSTS headers.\n3. Upstream Proxying:\n   - `proxy_pass` to upstream cluster with keepalive connections.\n   - Preserving client identity headers: `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`.\n4. WebSocket Support:\n   - `Upgrade` and `Connection \"upgrade\"` headers for real-time traffic.\n5. Performance:\n   - Gzip and Brotli compression for text, json, and js MIME types.\n   - Client request body size limits (`client_max_body_size`).\n6. Provide complete `nginx.conf` ready for Certbot / Let's Encrypt.\n\nExpected Output Format:\n1. Traffic Architecture Flow Diagram\n2. Production nginx.conf Configuration Code\n3. SSL Verification & Test Commands (openssl / curl)\n4. Nginx Reload & Syntax Check Command (`nginx -t`)",
    "promptText": "Act as a Web Server and Nginx Traffic Engineer. Build a high-performance, secure `nginx.conf` configuration file.\n\nDomain & Upstream Services:\n{{DOMAIN_AND_UPSTREAM}}\n\nTasks:\n1. HTTP to HTTPS Redirection (301 Permanent Redirect on port 80).\n2. SSL/TLS 1.3 Hardening on port 443:\n   - Modern ciphers, SSL session caching, and HSTS headers.\n3. Upstream Proxying:\n   - `proxy_pass` to upstream cluster with keepalive connections.\n   - Preserving client identity headers: `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`.\n4. WebSocket Support:\n   - `Upgrade` and `Connection \"upgrade\"` headers for real-time traffic.\n5. Performance:\n   - Gzip and Brotli compression for text, json, and js MIME types.\n   - Client request body size limits (`client_max_body_size`).\n6. Provide complete `nginx.conf` ready for Certbot / Let's Encrypt.\n\nExpected Output Format:\n1. Traffic Architecture Flow Diagram\n2. Production nginx.conf Configuration Code\n3. SSL Verification & Test Commands (openssl / curl)\n4. Nginx Reload & Syntax Check Command (`nginx -t`)",
    "tags": [
      "devops",
      "nginx",
      "ssl",
      "reverse-proxy",
      "websockets",
      "linux",
      "security"
    ],
    "difficulty": "Intermediate",
    "useCase": "DevOps & Tools",
    "variables": [
      "{{DOMAIN_AND_UPSTREAM}}"
    ],
    "expectedOutput": "Traffic flow diagram + production nginx.conf + SSL verification commands + reload command",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-github-actions-cicd-pipeline",
    "title": "GitHub Actions CI/CD Pipeline: Lint, Test, Docker & Deploy",
    "category": "DevOps / Cloud",
    "subcategory": "CI/CD",
    "description": "Builds an automated GitHub Actions workflow: parallel matrix testing, dependency caching, Docker image build/push, and staging deployment.",
    "prompt": "Act as a CI/CD and DevOps Automation Architect. Build an automated, production-grade GitHub Actions workflow (`.github/workflows/deploy.yml`).\n\nRepository Stack & Deployment Target:\n{{STACK_AND_DEPLOY_TARGET}}\n\nTasks:\n1. Workflow Triggers:\n   - Pull Requests to `main`: Lint, Type-Check, and Run Tests.\n   - Push to `main`: Build Docker image and Deploy to Staging/Production.\n2. Speed Optimization:\n   - Caching dependencies (`actions/setup-node` with npm/yarn cache).\n   - Docker layer caching using GitHub Actions cache (`type=gha`).\n3. Security & Secrets:\n   - Zero hardcoded tokens (referencing `${{ secrets.DEPLOY_TOKEN }}`).\n   - Least-privilege permissions (`permissions: contents: read`).\n4. Automated Notification:\n   - Posting deployment status to Slack or PR comment.\n5. Provide complete, copy-paste-ready YAML file.\n\nExpected Output Format:\n1. CI/CD Stage Pipeline Flowchart\n2. Complete GitHub Actions YAML Workflow File\n3. Secrets Configuration Checklist\n4. Branch Protection Rule Recommendations",
    "promptText": "Act as a CI/CD and DevOps Automation Architect. Build an automated, production-grade GitHub Actions workflow (`.github/workflows/deploy.yml`).\n\nRepository Stack & Deployment Target:\n{{STACK_AND_DEPLOY_TARGET}}\n\nTasks:\n1. Workflow Triggers:\n   - Pull Requests to `main`: Lint, Type-Check, and Run Tests.\n   - Push to `main`: Build Docker image and Deploy to Staging/Production.\n2. Speed Optimization:\n   - Caching dependencies (`actions/setup-node` with npm/yarn cache).\n   - Docker layer caching using GitHub Actions cache (`type=gha`).\n3. Security & Secrets:\n   - Zero hardcoded tokens (referencing `${{ secrets.DEPLOY_TOKEN }}`).\n   - Least-privilege permissions (`permissions: contents: read`).\n4. Automated Notification:\n   - Posting deployment status to Slack or PR comment.\n5. Provide complete, copy-paste-ready YAML file.\n\nExpected Output Format:\n1. CI/CD Stage Pipeline Flowchart\n2. Complete GitHub Actions YAML Workflow File\n3. Secrets Configuration Checklist\n4. Branch Protection Rule Recommendations",
    "tags": [
      "devops",
      "github-actions",
      "ci-cd",
      "automation",
      "docker",
      "deployment"
    ],
    "difficulty": "Intermediate",
    "useCase": "DevOps & Tools",
    "variables": [
      "{{STACK_AND_DEPLOY_TARGET}}"
    ],
    "expectedOutput": "Pipeline flowchart + GitHub Actions YAML + secrets checklist + branch protection rules",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-kubernetes-pod-hpa-deployment",
    "title": "Kubernetes Deployment: Pods, Services, Ingress & HPA Autoscaling",
    "category": "DevOps / Cloud",
    "subcategory": "Deployment",
    "description": "Architects Kubernetes production manifests: Deployment with rolling updates, Horizontal Pod Autoscaler (HPA), and Resource Limits.",
    "prompt": "Act as a Certified Kubernetes Administrator (CKA). Create complete, production-ready Kubernetes YAML manifests for this microservice.\n\nMicroservice Requirements & Traffic:\n{{MICROSERVICE_SPECS}}\n\nTasks:\n1. Deployment Manifest:\n   - Container image, port definitions, and environment variables from Secret / ConfigMap.\n   - CPU and Memory `requests` and `limits` (preventing noisy-neighbor CPU starvation and OOM kills).\n   - Liveness Probe and Readiness Probe HTTP configurations.\n   - Rolling Update Strategy: `maxSurge: 25%`, `maxUnavailable: 0` for zero-downtime deploys.\n2. Service & Ingress Manifests:\n   - ClusterIP Service routing traffic to pod selector labels.\n   - Ingress resource with TLS annotations.\n3. Horizontal Pod Autoscaler (HPA):\n   - Scaling from min 3 replicas to max 20 replicas based on 70% CPU and 80% Memory utilization.\n4. Provide complete multi-document YAML file.\n\nExpected Output Format:\n1. Kubernetes Architecture Topology\n2. Complete k8s Manifests (Deployment, Service, Ingress, HPA)\n3. kubectl Deploy & Verification Commands\n4. Resource Sizing & Capacity Math",
    "promptText": "Act as a Certified Kubernetes Administrator (CKA). Create complete, production-ready Kubernetes YAML manifests for this microservice.\n\nMicroservice Requirements & Traffic:\n{{MICROSERVICE_SPECS}}\n\nTasks:\n1. Deployment Manifest:\n   - Container image, port definitions, and environment variables from Secret / ConfigMap.\n   - CPU and Memory `requests` and `limits` (preventing noisy-neighbor CPU starvation and OOM kills).\n   - Liveness Probe and Readiness Probe HTTP configurations.\n   - Rolling Update Strategy: `maxSurge: 25%`, `maxUnavailable: 0` for zero-downtime deploys.\n2. Service & Ingress Manifests:\n   - ClusterIP Service routing traffic to pod selector labels.\n   - Ingress resource with TLS annotations.\n3. Horizontal Pod Autoscaler (HPA):\n   - Scaling from min 3 replicas to max 20 replicas based on 70% CPU and 80% Memory utilization.\n4. Provide complete multi-document YAML file.\n\nExpected Output Format:\n1. Kubernetes Architecture Topology\n2. Complete k8s Manifests (Deployment, Service, Ingress, HPA)\n3. kubectl Deploy & Verification Commands\n4. Resource Sizing & Capacity Math",
    "tags": [
      "devops",
      "kubernetes",
      "k8s",
      "deployment",
      "hpa",
      "autoscaling",
      "cloud"
    ],
    "difficulty": "Advanced",
    "useCase": "Deployment",
    "variables": [
      "{{MICROSERVICE_SPECS}}"
    ],
    "expectedOutput": "k8s topology + complete YAML manifests (Deploy, Service, Ingress, HPA) + kubectl commands",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-blue-green-deployment-strategy",
    "title": "Zero-Downtime Deployment: Blue-Green vs Canary Releases",
    "category": "DevOps / Cloud",
    "subcategory": "Deployment",
    "description": "Designs zero-downtime release strategies: Blue-Green traffic flipping vs Canary percentage rollouts with automated rollback triggers.",
    "prompt": "Act as a Release Engineering Architect. Design a zero-downtime deployment strategy for a mission-critical web service.\n\nSystem Architecture & Database Schema:\n{{SYSTEM_ARCHITECTURE}}\n\nDeployment Strategy Choice (Blue-Green vs Canary):\n{{STRATEGY_CHOICE}}\n\nTasks:\n1. Comparison:\n   - Blue-Green Deployment: Running identical Green environment; instant DNS/router switch; instant rollback capability; doubles infrastructure cost during deploy.\n   - Canary Deployment: Routing 5% traffic to new version; monitoring error rate; incrementally increasing to 100%.\n2. The Database Migration Challenge (Expand & Contract Pattern):\n   - Why breaking database changes break Blue-Green deploys.\n   - Three-phase schema evolution: Expand (add nullable column), Migrate data, Contract (drop old column after deploy).\n3. Automated Rollback Trigger:\n   - Monitoring HTTP 5xx error rate and p99 latency; automatic traffic rollback if thresholds are breached within 5 minutes.\n4. Provide concrete Nginx or Kubernetes routing rules implementing the strategy.\n\nExpected Output Format:\n1. Release Strategy Architecture Diagram\n2. Expand-Contract Database Migration Lifecycle\n3. Automated Health Verification & Rollback Script\n4. Traffic Flipping Configuration Snippet",
    "promptText": "Act as a Release Engineering Architect. Design a zero-downtime deployment strategy for a mission-critical web service.\n\nSystem Architecture & Database Schema:\n{{SYSTEM_ARCHITECTURE}}\n\nDeployment Strategy Choice (Blue-Green vs Canary):\n{{STRATEGY_CHOICE}}\n\nTasks:\n1. Comparison:\n   - Blue-Green Deployment: Running identical Green environment; instant DNS/router switch; instant rollback capability; doubles infrastructure cost during deploy.\n   - Canary Deployment: Routing 5% traffic to new version; monitoring error rate; incrementally increasing to 100%.\n2. The Database Migration Challenge (Expand & Contract Pattern):\n   - Why breaking database changes break Blue-Green deploys.\n   - Three-phase schema evolution: Expand (add nullable column), Migrate data, Contract (drop old column after deploy).\n3. Automated Rollback Trigger:\n   - Monitoring HTTP 5xx error rate and p99 latency; automatic traffic rollback if thresholds are breached within 5 minutes.\n4. Provide concrete Nginx or Kubernetes routing rules implementing the strategy.\n\nExpected Output Format:\n1. Release Strategy Architecture Diagram\n2. Expand-Contract Database Migration Lifecycle\n3. Automated Health Verification & Rollback Script\n4. Traffic Flipping Configuration Snippet",
    "tags": [
      "devops",
      "deployment",
      "blue-green",
      "canary",
      "zero-downtime",
      "database-migration"
    ],
    "difficulty": "Advanced",
    "useCase": "Deployment",
    "variables": [
      "{{SYSTEM_ARCHITECTURE}}",
      "{{STRATEGY_CHOICE}}"
    ],
    "expectedOutput": "Release strategy diagram + Expand-Contract DB lifecycle + automated rollback script + traffic config",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-aws-s3-cloudfront-hosting",
    "title": "AWS S3 & CloudFront Static Site Hosting with Origin Access Control",
    "category": "DevOps / Cloud",
    "subcategory": "AWS",
    "description": "Secures and accelerates static SPA hosting (React/Vue) on AWS S3, CloudFront global CDN, SSL certificate, and custom error page redirects.",
    "prompt": "Act as an AWS Certified Solutions Architect. Design a secure, global static web hosting architecture using AWS S3 and CloudFront.\n\nWebsite Domain & SPA Routing Needs:\n{{DOMAIN_AND_SPA_DETAILS}}\n\nTasks:\n1. S3 Bucket Hardening:\n   - Block All Public Access enabled (bucket is completely private).\n   - Origin Access Control (OAC) allowing ONLY CloudFront distribution to read objects.\n2. CloudFront Global CDN Distribution:\n   - Custom domain name with AWS Certificate Manager (ACM) SSL certificate.\n   - HTTP to HTTPS redirect.\n   - Gzip and Brotli compression enabled.\n   - Cache-Control headers: Long TTL for hashed assets (js/css), zero-cache (`no-cache`) for `index.html`.\n3. SPA Client-Side Routing Fix:\n   - Custom Error Response (403 and 404 response mapped to `/index.html` with 200 OK status) allowing React Router / Vue Router to handle paths.\n4. Provide AWS CLI commands or Terraform script.\n\nExpected Output Format:\n1. AWS Infrastructure Architecture Diagram\n2. S3 Bucket Policy with CloudFront OAC\n3. CloudFront Distribution Configuration\n4. Terraform Manifest or AWS CLI Deployment Script",
    "promptText": "Act as an AWS Certified Solutions Architect. Design a secure, global static web hosting architecture using AWS S3 and CloudFront.\n\nWebsite Domain & SPA Routing Needs:\n{{DOMAIN_AND_SPA_DETAILS}}\n\nTasks:\n1. S3 Bucket Hardening:\n   - Block All Public Access enabled (bucket is completely private).\n   - Origin Access Control (OAC) allowing ONLY CloudFront distribution to read objects.\n2. CloudFront Global CDN Distribution:\n   - Custom domain name with AWS Certificate Manager (ACM) SSL certificate.\n   - HTTP to HTTPS redirect.\n   - Gzip and Brotli compression enabled.\n   - Cache-Control headers: Long TTL for hashed assets (js/css), zero-cache (`no-cache`) for `index.html`.\n3. SPA Client-Side Routing Fix:\n   - Custom Error Response (403 and 404 response mapped to `/index.html` with 200 OK status) allowing React Router / Vue Router to handle paths.\n4. Provide AWS CLI commands or Terraform script.\n\nExpected Output Format:\n1. AWS Infrastructure Architecture Diagram\n2. S3 Bucket Policy with CloudFront OAC\n3. CloudFront Distribution Configuration\n4. Terraform Manifest or AWS CLI Deployment Script",
    "tags": [
      "devops",
      "aws",
      "s3",
      "cloudfront",
      "cdn",
      "spa",
      "cloud"
    ],
    "difficulty": "Intermediate",
    "useCase": "Deployment",
    "variables": [
      "{{DOMAIN_AND_SPA_DETAILS}}"
    ],
    "expectedOutput": "AWS architecture diagram + S3 bucket policy with OAC + CloudFront config + Terraform script",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "devops-systemd-service-configuration",
    "title": "Linux Systemd Service Unit Configuration & Daemonizing",
    "category": "DevOps / Cloud",
    "subcategory": "Linux",
    "description": "Daemonizes Node.js or Python backend applications as persistent systemd services with auto-restart, logging, and security sandboxing.",
    "prompt": "Act as a Linux System Administrator. Configure a robust systemd service unit to daemonize a backend application on Ubuntu / Debian / RHEL.\n\nApplication Runtime & Executable Path:\n{{APP_DETAILS}}\n\nTasks:\n1. Create `/etc/systemd/system/myapp.service`:\n   - `[Unit]`: Description, after network.target dependency.\n   - `[Service]`: User/Group (non-root), WorkingDirectory, ExecStart command, Environment variables file.\n   - Auto-Restart Policy: `Restart=always`, `RestartSec=5s` on unexpected failure.\n   - Security Sandboxing: `NoNewPrivileges=true`, `ProtectSystem=full`, `PrivateTmp=true`.\n   - Logging: Capturing stdout and stderr to journald.\n2. Systemd CLI Management Commands:\n   - Reload daemon, start, stop, restart, enable on boot.\n   - Inspecting real-time logs with `journalctl -u myapp -f`.\n3. Provide complete, tested systemd unit file and management commands.\n\nExpected Output Format:\n1. Complete systemd Service Unit File (.service)\n2. Security Hardening Directives Explanation\n3. CLI Management Commands Cheatsheet\n4. Journalctl Log Inspection Cheatsheet",
    "promptText": "Act as a Linux System Administrator. Configure a robust systemd service unit to daemonize a backend application on Ubuntu / Debian / RHEL.\n\nApplication Runtime & Executable Path:\n{{APP_DETAILS}}\n\nTasks:\n1. Create `/etc/systemd/system/myapp.service`:\n   - `[Unit]`: Description, after network.target dependency.\n   - `[Service]`: User/Group (non-root), WorkingDirectory, ExecStart command, Environment variables file.\n   - Auto-Restart Policy: `Restart=always`, `RestartSec=5s` on unexpected failure.\n   - Security Sandboxing: `NoNewPrivileges=true`, `ProtectSystem=full`, `PrivateTmp=true`.\n   - Logging: Capturing stdout and stderr to journald.\n2. Systemd CLI Management Commands:\n   - Reload daemon, start, stop, restart, enable on boot.\n   - Inspecting real-time logs with `journalctl -u myapp -f`.\n3. Provide complete, tested systemd unit file and management commands.\n\nExpected Output Format:\n1. Complete systemd Service Unit File (.service)\n2. Security Hardening Directives Explanation\n3. CLI Management Commands Cheatsheet\n4. Journalctl Log Inspection Cheatsheet",
    "tags": [
      "devops",
      "linux",
      "systemd",
      "daemons",
      "sysadmin",
      "ubuntu"
    ],
    "difficulty": "Easy",
    "useCase": "DevOps & Tools",
    "variables": [
      "{{APP_DETAILS}}"
    ],
    "expectedOutput": "systemd service file + security directives explanation + CLI management cheatsheet + journalctl commands",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-resume-ats-keyword-optimizer",
    "title": "Resume ATS Keyword Optimization & Job Description Matcher",
    "category": "Career",
    "subcategory": "Resume ATS Optimization",
    "description": "Compares your current resume text against a target Job Description, identifies missing technical keywords, and scores ATS compatibility.",
    "prompt": "Act as a Senior Technical Recruiter at Google and ATS (Applicant Tracking System) Algorithm Specialist. Perform a rigorous gap analysis on my resume against this job posting.\n\nTarget Job Description (JD):\n{{JOB_DESCRIPTION}}\n\nMy Current Resume Content:\n{{RESUME_TEXT}}\n\nTasks:\n1. ATS Keyword Gap Analysis:\n   - Identify High-Priority Technical Keywords present in the JD but missing from my resume (Frameworks, Cloud tools, Architecture terms).\n   - Identify Soft Skills / Methodologies (Agile, Cross-functional collaboration, Mentorship).\n2. Quantified ATS Match Score (0 - 100%):\n   - Explain what is dragging the score down.\n3. Surgical Resume Bullet Enhancements:\n   - Rewrite 3 to 5 of my existing bullets to naturally incorporate the missing high-value keywords without buzzword stuffing.\n4. Formatting & Parser Hazards:\n   - Identify any formatting traps (tables, multi-column layouts, graphics) that break ATS parsers like Workday, Greenhouse, or Taleo.\n\nExpected Output Format:\n1. ATS Keyword Match Scorecard\n2. Missing High-Impact Keywords List (Categorized by Domain)\n3. 5 Before-and-After Enhanced Resume Bullets\n4. ATS Formatting Compliance Checklist",
    "promptText": "Act as a Senior Technical Recruiter at Google and ATS (Applicant Tracking System) Algorithm Specialist. Perform a rigorous gap analysis on my resume against this job posting.\n\nTarget Job Description (JD):\n{{JOB_DESCRIPTION}}\n\nMy Current Resume Content:\n{{RESUME_TEXT}}\n\nTasks:\n1. ATS Keyword Gap Analysis:\n   - Identify High-Priority Technical Keywords present in the JD but missing from my resume (Frameworks, Cloud tools, Architecture terms).\n   - Identify Soft Skills / Methodologies (Agile, Cross-functional collaboration, Mentorship).\n2. Quantified ATS Match Score (0 - 100%):\n   - Explain what is dragging the score down.\n3. Surgical Resume Bullet Enhancements:\n   - Rewrite 3 to 5 of my existing bullets to naturally incorporate the missing high-value keywords without buzzword stuffing.\n4. Formatting & Parser Hazards:\n   - Identify any formatting traps (tables, multi-column layouts, graphics) that break ATS parsers like Workday, Greenhouse, or Taleo.\n\nExpected Output Format:\n1. ATS Keyword Match Scorecard\n2. Missing High-Impact Keywords List (Categorized by Domain)\n3. 5 Before-and-After Enhanced Resume Bullets\n4. ATS Formatting Compliance Checklist",
    "tags": [
      "career",
      "resume",
      "ats",
      "job-description",
      "interview-prep",
      "recruiting"
    ],
    "difficulty": "Intermediate",
    "useCase": "Career & Resume",
    "variables": [
      "{{JOB_DESCRIPTION}}",
      "{{RESUME_TEXT}}"
    ],
    "expectedOutput": "ATS match scorecard + missing keywords list + 5 enhanced bullets + ATS compliance checklist",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-star-bullet-enhancer",
    "title": "Resume Action-Verb STAR Bullet Enhancer (Google XYZ Formula)",
    "category": "Career",
    "subcategory": "Resume",
    "description": "Transforms weak, passive resume bullets into punchy, metric-driven achievements using Google's formula: \"Accomplished [X], as measured by [Y], by doing [Z]\".",
    "prompt": "Act as an Executive Tech Resume Writer. Transform my weak, passive resume bullets into high-impact, quantified achievement statements using Google's XYZ Formula.\n\nMy Current Draft Bullets:\n{{DRAFT_BULLETS}}\n\nTarget Engineering Level (Junior, Mid, Senior, Staff):\n{{TARGET_LEVEL}}\n\nTasks:\n1. Deconstruct the weakness in each original bullet (passive voice, task description instead of outcome, missing business impact, lack of numbers).\n2. Apply Google's Formula: \"Accomplished [X] as measured by [Y] by doing [Z]\":\n   - Start with powerful action verbs (Spearheaded, Architected, Engineered, Optimized, Automated).\n   - Quantify results (Latency reduced by 40%, throughput scaled to 10k QPS, $50k monthly cloud cost saved).\n   - Highlight the specific engineering approach (Redis caching, asynchronous worker queues, zero-downtime migration).\n3. Provide 2 variations per bullet:\n   - Variation A: Metric-heavy (percentages, latency, revenue).\n   - Variation B: Architectural / Scale-heavy (concurrency, reliability, code quality).\n\nExpected Output Format:\n1. Bullet Weakness Diagnosis\n2. Transformed XYZ Bullets (2 variations per bullet)\n3. Action Verb Glossary for Software Engineers",
    "promptText": "Act as an Executive Tech Resume Writer. Transform my weak, passive resume bullets into high-impact, quantified achievement statements using Google's XYZ Formula.\n\nMy Current Draft Bullets:\n{{DRAFT_BULLETS}}\n\nTarget Engineering Level (Junior, Mid, Senior, Staff):\n{{TARGET_LEVEL}}\n\nTasks:\n1. Deconstruct the weakness in each original bullet (passive voice, task description instead of outcome, missing business impact, lack of numbers).\n2. Apply Google's Formula: \"Accomplished [X] as measured by [Y] by doing [Z]\":\n   - Start with powerful action verbs (Spearheaded, Architected, Engineered, Optimized, Automated).\n   - Quantify results (Latency reduced by 40%, throughput scaled to 10k QPS, $50k monthly cloud cost saved).\n   - Highlight the specific engineering approach (Redis caching, asynchronous worker queues, zero-downtime migration).\n3. Provide 2 variations per bullet:\n   - Variation A: Metric-heavy (percentages, latency, revenue).\n   - Variation B: Architectural / Scale-heavy (concurrency, reliability, code quality).\n\nExpected Output Format:\n1. Bullet Weakness Diagnosis\n2. Transformed XYZ Bullets (2 variations per bullet)\n3. Action Verb Glossary for Software Engineers",
    "tags": [
      "career",
      "resume",
      "google-xyz",
      "action-verbs",
      "star-method",
      "metrics"
    ],
    "difficulty": "Easy",
    "useCase": "Career & Resume",
    "variables": [
      "{{DRAFT_BULLETS}}",
      "{{TARGET_LEVEL}}"
    ],
    "expectedOutput": "Weakness diagnosis + transformed XYZ bullets (2 variations) + action verb glossary",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-project-explanation-defense",
    "title": "Technical Project Deep-Dive & Architecture Defense",
    "category": "Career",
    "subcategory": "Project Explanation",
    "description": "Structures your personal or work project into an impressive 3-minute interview story covering architecture, toughest technical bug, and trade-offs.",
    "prompt": "Act as a Staff Software Engineer and Hiring Committee Member. Help me craft an impressive, technical project walkthrough story for my interviews.\n\nProject Overview & Tech Stack:\n{{PROJECT_DETAILS}}\n\nTasks:\n1. 30-Second High-Level Pitch:\n   - What problem does this solve, for whom, and what is the core tech stack?\n2. Architectural Deep-Dive (2 minutes):\n   - Client -> API -> Database -> Background worker architecture.\n   - Why did you pick this specific tech stack over alternatives? (e.g. PostgreSQL over MongoDB).\n3. The \"Toughest Technical Challenge / Bug\":\n   - Frame a realistic, complex engineering challenge you solved (e.g. race condition, query bottleneck, caching inconsistency).\n   - Symptom -> Investigation -> Root Cause -> Fix -> Measured Outcome.\n4. Anticipated Interviewer Grilling Questions:\n   - 4 tough technical questions an interviewer will ask to verify you actually built the project yourself rather than copying a tutorial.\n\nExpected Output Format:\n1. 30-Second Elevator Pitch Script\n2. Architectural Walkthrough Outline\n3. Toughest Bug STAR Story (Situation, Task, Action, Result)\n4. 4 Tough Interview Defense Questions with Model Answers",
    "promptText": "Act as a Staff Software Engineer and Hiring Committee Member. Help me craft an impressive, technical project walkthrough story for my interviews.\n\nProject Overview & Tech Stack:\n{{PROJECT_DETAILS}}\n\nTasks:\n1. 30-Second High-Level Pitch:\n   - What problem does this solve, for whom, and what is the core tech stack?\n2. Architectural Deep-Dive (2 minutes):\n   - Client -> API -> Database -> Background worker architecture.\n   - Why did you pick this specific tech stack over alternatives? (e.g. PostgreSQL over MongoDB).\n3. The \"Toughest Technical Challenge / Bug\":\n   - Frame a realistic, complex engineering challenge you solved (e.g. race condition, query bottleneck, caching inconsistency).\n   - Symptom -> Investigation -> Root Cause -> Fix -> Measured Outcome.\n4. Anticipated Interviewer Grilling Questions:\n   - 4 tough technical questions an interviewer will ask to verify you actually built the project yourself rather than copying a tutorial.\n\nExpected Output Format:\n1. 30-Second Elevator Pitch Script\n2. Architectural Walkthrough Outline\n3. Toughest Bug STAR Story (Situation, Task, Action, Result)\n4. 4 Tough Interview Defense Questions with Model Answers",
    "tags": [
      "career",
      "interview-prep",
      "projects",
      "project-explanation",
      "technical-interview",
      "portfolio"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{PROJECT_DETAILS}}"
    ],
    "expectedOutput": "30s pitch + architectural walkthrough + toughest bug STAR story + 4 interview defense questions",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-tell-me-about-yourself",
    "title": "\"Tell Me About Yourself\" Executive Elevator Pitch Generator",
    "category": "Career",
    "subcategory": "HR Interview",
    "description": "Crafts a compelling 90-second answer to \"Tell me about yourself\" following the Present-Past-Future narrative framework.",
    "prompt": "Act as an Executive Tech Career Coach. Craft a compelling, confident 90-second response to \"Tell me about yourself\" for my upcoming interview.\n\nMy Background (Current role, key skills, past experience, career transition):\n{{MY_BACKGROUND}}\n\nTarget Role & Company:\n{{TARGET_ROLE_AND_COMPANY}}\n\nTasks:\n1. Apply the \"Present -> Past -> Future\" Framework:\n   - Present (30s): Who you are today, current engineering focus, and core technical strengths.\n   - Past (30s): 1 or 2 standout achievements or inflection points that demonstrate trajectory and problem-solving grit.\n   - Future (30s): Why this specific company and role is the natural, exciting next chapter of your journey.\n2. Cut the fluff: Eliminate personal life history, hobbies, or reciting your resume chronologically.\n3. Natural, conversational tone: Make it sound confident, authentic, and engaging.\n4. Provide 2 delivery variations:\n   - Standard Senior Engineer tone.\n   - High-Growth Startup / Founder-mentality tone.\n\nExpected Output Format:\n1. Present-Past-Future Script (Word count: ~180 words, 90 seconds spoken)\n2. Delivery Variations (Enterprise vs Startup)\n3. Delivery Tips (Pacing, eye contact, tone inflection)",
    "promptText": "Act as an Executive Tech Career Coach. Craft a compelling, confident 90-second response to \"Tell me about yourself\" for my upcoming interview.\n\nMy Background (Current role, key skills, past experience, career transition):\n{{MY_BACKGROUND}}\n\nTarget Role & Company:\n{{TARGET_ROLE_AND_COMPANY}}\n\nTasks:\n1. Apply the \"Present -> Past -> Future\" Framework:\n   - Present (30s): Who you are today, current engineering focus, and core technical strengths.\n   - Past (30s): 1 or 2 standout achievements or inflection points that demonstrate trajectory and problem-solving grit.\n   - Future (30s): Why this specific company and role is the natural, exciting next chapter of your journey.\n2. Cut the fluff: Eliminate personal life history, hobbies, or reciting your resume chronologically.\n3. Natural, conversational tone: Make it sound confident, authentic, and engaging.\n4. Provide 2 delivery variations:\n   - Standard Senior Engineer tone.\n   - High-Growth Startup / Founder-mentality tone.\n\nExpected Output Format:\n1. Present-Past-Future Script (Word count: ~180 words, 90 seconds spoken)\n2. Delivery Variations (Enterprise vs Startup)\n3. Delivery Tips (Pacing, eye contact, tone inflection)",
    "tags": [
      "career",
      "interview-prep",
      "tell-me-about-yourself",
      "elevator-pitch",
      "hr-interview"
    ],
    "difficulty": "Beginner",
    "useCase": "Interview Preparation",
    "variables": [
      "{{MY_BACKGROUND}}",
      "{{TARGET_ROLE_AND_COMPANY}}"
    ],
    "expectedOutput": "90-second script (Present-Past-Future) + delivery variations + vocal pacing tips",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-behavioral-star-story-builder",
    "title": "Behavioral Interview STAR Story Builder (Conflict, Failure, Leadership)",
    "category": "Career",
    "subcategory": "Behavioral Questions",
    "description": "Structures behavioral stories into Amazon Leadership Principle / STAR format: Situation, Task, Action (60%), and Result (metrics & learning).",
    "prompt": "Act as a Senior Bar Raiser at Amazon. Help me structure my experience into a high-scoring STAR behavioral interview response.\n\nTarget Behavioral Question (e.g. Tell me about a time you had a technical disagreement / Tell me about a failure):\n{{BEHAVIORAL_QUESTION}}\n\nRaw Experience / Incident Notes:\n{{RAW_EXPERIENCE_NOTES}}\n\nTasks:\n1. Format into the STAR Framework with proper time allocation:\n   - Situation (15%): Set the stage, scale, and stakes concisely.\n   - Task (10%): Your specific responsibility (not the team's).\n   - Action (60%): Deep technical and interpersonal steps YOU took. Explain your reasoning, options evaluated, and how you communicated.\n   - Result (15%): Tangible business outcome, quantified metrics, and what you learned or adopted team-wide.\n2. Eliminate \"We\": Replace passive \"We decided\" with active \"I analyzed, I proposed, I built\".\n3. Add emotional intelligence: Show humility, data-driven compromise, and post-incident ownership.\n\nExpected Output Format:\n1. Complete STAR Script (Spoken duration: ~2.5 minutes)\n2. Breakdown of Evaluated Competencies (e.g. Bias for Action, Disagree & Commit)\n3. Potential Follow-Up Probing Questions from the Interviewer",
    "promptText": "Act as a Senior Bar Raiser at Amazon. Help me structure my experience into a high-scoring STAR behavioral interview response.\n\nTarget Behavioral Question (e.g. Tell me about a time you had a technical disagreement / Tell me about a failure):\n{{BEHAVIORAL_QUESTION}}\n\nRaw Experience / Incident Notes:\n{{RAW_EXPERIENCE_NOTES}}\n\nTasks:\n1. Format into the STAR Framework with proper time allocation:\n   - Situation (15%): Set the stage, scale, and stakes concisely.\n   - Task (10%): Your specific responsibility (not the team's).\n   - Action (60%): Deep technical and interpersonal steps YOU took. Explain your reasoning, options evaluated, and how you communicated.\n   - Result (15%): Tangible business outcome, quantified metrics, and what you learned or adopted team-wide.\n2. Eliminate \"We\": Replace passive \"We decided\" with active \"I analyzed, I proposed, I built\".\n3. Add emotional intelligence: Show humility, data-driven compromise, and post-incident ownership.\n\nExpected Output Format:\n1. Complete STAR Script (Spoken duration: ~2.5 minutes)\n2. Breakdown of Evaluated Competencies (e.g. Bias for Action, Disagree & Commit)\n3. Potential Follow-Up Probing Questions from the Interviewer",
    "tags": [
      "career",
      "behavioral-interview",
      "star-method",
      "amazon-leadership",
      "hr-interview"
    ],
    "difficulty": "Intermediate",
    "useCase": "Interview Preparation",
    "variables": [
      "{{BEHAVIORAL_QUESTION}}",
      "{{RAW_EXPERIENCE_NOTES}}"
    ],
    "expectedOutput": "Complete STAR script (Action-focused) + evaluated competencies + follow-up questions",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-linkedin-profile-optimizer",
    "title": "LinkedIn Headline, About Section & Experience Optimizer",
    "category": "Career",
    "subcategory": "LinkedIn",
    "description": "Optimizes your LinkedIn profile for recruiter search visibility (SEO): keyword-dense headline, compelling About summary, and featured projects.",
    "prompt": "Act as a Tech Recruiter and LinkedIn Personal Branding Consultant. Transform my LinkedIn profile to maximize inbound recruiter messages.\n\nCurrent Profile Information:\n{{CURRENT_PROFILE}}\n\nTarget Job Title & Domain (e.g. Senior Full Stack Engineer / Backend Distributed Systems):\n{{TARGET_TITLE_AND_DOMAIN}}\n\nTasks:\n1. Headline Optimization (220 characters max):\n   - Combine Role + Core Tech Stack + Business Value + Social Proof (e.g. \"Senior Software Engineer @ Ex-Unicorn | Distributed Systems | Node.js • Go • AWS | Scaling High-Throughput APIs\").\n   - Provide 3 distinct headline styles (Keyword-Optimized, Outcome-Focused, Clean & Punchy).\n2. About / Summary Section Rewrite:\n   - Hook in first 3 lines (before \"see more\" fold).\n   - Narrative of your technical passion and core problem-solving identity.\n   - \"Core Technical Expertise\" bulleted list for recruiter search indexing.\n   - Clear Call-to-Action (email/contact info).\n3. Experience Section Polish:\n   - Convert job descriptions into accomplishment bullets with metrics.\n\nExpected Output Format:\n1. 3 Tailored Headline Options\n2. Complete About Section Copy (with markdown and formatting)\n3. Experience Section Template\n4. Top 15 Skills to Add for Recruiter Search Algorithms",
    "promptText": "Act as a Tech Recruiter and LinkedIn Personal Branding Consultant. Transform my LinkedIn profile to maximize inbound recruiter messages.\n\nCurrent Profile Information:\n{{CURRENT_PROFILE}}\n\nTarget Job Title & Domain (e.g. Senior Full Stack Engineer / Backend Distributed Systems):\n{{TARGET_TITLE_AND_DOMAIN}}\n\nTasks:\n1. Headline Optimization (220 characters max):\n   - Combine Role + Core Tech Stack + Business Value + Social Proof (e.g. \"Senior Software Engineer @ Ex-Unicorn | Distributed Systems | Node.js • Go • AWS | Scaling High-Throughput APIs\").\n   - Provide 3 distinct headline styles (Keyword-Optimized, Outcome-Focused, Clean & Punchy).\n2. About / Summary Section Rewrite:\n   - Hook in first 3 lines (before \"see more\" fold).\n   - Narrative of your technical passion and core problem-solving identity.\n   - \"Core Technical Expertise\" bulleted list for recruiter search indexing.\n   - Clear Call-to-Action (email/contact info).\n3. Experience Section Polish:\n   - Convert job descriptions into accomplishment bullets with metrics.\n\nExpected Output Format:\n1. 3 Tailored Headline Options\n2. Complete About Section Copy (with markdown and formatting)\n3. Experience Section Template\n4. Top 15 Skills to Add for Recruiter Search Algorithms",
    "tags": [
      "career",
      "linkedin",
      "personal-branding",
      "recruiter-seo",
      "networking"
    ],
    "difficulty": "Easy",
    "useCase": "Career & Resume",
    "variables": [
      "{{CURRENT_PROFILE}}",
      "{{TARGET_TITLE_AND_DOMAIN}}"
    ],
    "expectedOutput": "3 headline options + complete About section copy + experience template + top 15 skills list",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-salary-negotiation-scripts",
    "title": "Tech Salary & Total Compensation (TC) Negotiation Strategy",
    "category": "Career",
    "subcategory": "Career Roadmap",
    "description": "Provides psychological negotiation scripts and counter-offer emails to negotiate Base Salary, Equity (RSUs/Options), and Sign-on bonuses.",
    "prompt": "Act as a Professional Tech Compensation & Offer Negotiation Coach. Guide me through negotiating this job offer for maximum Total Compensation (TC).\n\nCurrent Offer Details (Base, Equity/RSUs, Bonus, Location):\n{{OFFER_DETAILS}}\n\nCompeting Offers or Market Benchmarks:\n{{COMPETING_OFFERS_OR_BENCHMARKS}}\n\nTasks:\n1. Evaluate Offer Competitiveness:\n   - Compare against Levels.fyi market percentiles (25th, 50th, 75th, 90th percentile).\n2. Negotiation Strategy & Leverage Identification:\n   - Identifying levers: Base Salary, Sign-on Bonus (easiest for companies to grant), Equity/RSUs (long-term wealth), Remote flexibility.\n3. Word-for-Word Scripts:\n   - Script for initial phone call with recruiter when offer is presented (\"anchor prevention\").\n   - Professional Counter-Offer Email balancing gratitude with firm, data-backed justification.\n   - Script for handling multiple competing offers.\n4. What to do if they say \"This is our final offer\".\n\nExpected Output Format:\n1. Compensation Competitiveness Analysis\n2. Strategic Levers Breakdown\n3. Word-for-Word Recruiter Phone Script\n4. Professional Counter-Offer Email Template\n5. Fallback Tactics if Offer is Fixed",
    "promptText": "Act as a Professional Tech Compensation & Offer Negotiation Coach. Guide me through negotiating this job offer for maximum Total Compensation (TC).\n\nCurrent Offer Details (Base, Equity/RSUs, Bonus, Location):\n{{OFFER_DETAILS}}\n\nCompeting Offers or Market Benchmarks:\n{{COMPETING_OFFERS_OR_BENCHMARKS}}\n\nTasks:\n1. Evaluate Offer Competitiveness:\n   - Compare against Levels.fyi market percentiles (25th, 50th, 75th, 90th percentile).\n2. Negotiation Strategy & Leverage Identification:\n   - Identifying levers: Base Salary, Sign-on Bonus (easiest for companies to grant), Equity/RSUs (long-term wealth), Remote flexibility.\n3. Word-for-Word Scripts:\n   - Script for initial phone call with recruiter when offer is presented (\"anchor prevention\").\n   - Professional Counter-Offer Email balancing gratitude with firm, data-backed justification.\n   - Script for handling multiple competing offers.\n4. What to do if they say \"This is our final offer\".\n\nExpected Output Format:\n1. Compensation Competitiveness Analysis\n2. Strategic Levers Breakdown\n3. Word-for-Word Recruiter Phone Script\n4. Professional Counter-Offer Email Template\n5. Fallback Tactics if Offer is Fixed",
    "tags": [
      "career",
      "salary-negotiation",
      "compensation",
      "counter-offer",
      "levels-fyi"
    ],
    "difficulty": "Advanced",
    "useCase": "Career & Resume",
    "variables": [
      "{{OFFER_DETAILS}}",
      "{{COMPETING_OFFERS_OR_BENCHMARKS}}"
    ],
    "expectedOutput": "Comp analysis + strategic levers + recruiter phone script + counter-offer email + fallback tactics",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-recruiter-cold-message-outreach",
    "title": "LinkedIn & Cold Email Recruiter Outreach Templates",
    "category": "Career",
    "subcategory": "LinkedIn",
    "description": "Generates high-conversion, personalized outreach messages to Engineering Managers and Recruiters that get replies instead of being ignored.",
    "prompt": "Act as a Top Tech Recruiter and Outbound Messaging Specialist. Write high-conversion cold outreach messages to get my foot in the door.\n\nTarget Company & Role:\n{{TARGET_COMPANY_AND_ROLE}}\n\nTarget Recipient (Technical Recruiter vs Engineering Hiring Manager):\n{{RECIPIENT_TYPE}}\n\nMy Unique Selling Proposition (USP) / Relevant Project:\n{{MY_USP}}\n\nTasks:\n1. Rules for High-Conversion Tech Outreach:\n   - Under 120 words (respecting their busy schedule).\n   - Hook: Genuine company-specific connection or appreciation of their recent launch/post.\n   - Value Proposition: Highlighting 1 specific achievement matching their team's stack.\n   - Low-friction Call-to-Action (e.g. \"Open to a brief 10-minute chat next week?\").\n2. Provide 3 Customized Templates:\n   - Template A: InMail / Connection request to a Technical Recruiter.\n   - Template B: Direct Email / Message to an Engineering Manager / Director.\n   - Template C: Polite follow-up message after 5 business days of silence.\n\nExpected Output Format:\n1. Outreach Psychology & Rules of Engagement\n2. Template A (Technical Recruiter)\n3. Template B (Hiring Manager)\n4. Template C (Polite 5-Day Follow-Up)",
    "promptText": "Act as a Top Tech Recruiter and Outbound Messaging Specialist. Write high-conversion cold outreach messages to get my foot in the door.\n\nTarget Company & Role:\n{{TARGET_COMPANY_AND_ROLE}}\n\nTarget Recipient (Technical Recruiter vs Engineering Hiring Manager):\n{{RECIPIENT_TYPE}}\n\nMy Unique Selling Proposition (USP) / Relevant Project:\n{{MY_USP}}\n\nTasks:\n1. Rules for High-Conversion Tech Outreach:\n   - Under 120 words (respecting their busy schedule).\n   - Hook: Genuine company-specific connection or appreciation of their recent launch/post.\n   - Value Proposition: Highlighting 1 specific achievement matching their team's stack.\n   - Low-friction Call-to-Action (e.g. \"Open to a brief 10-minute chat next week?\").\n2. Provide 3 Customized Templates:\n   - Template A: InMail / Connection request to a Technical Recruiter.\n   - Template B: Direct Email / Message to an Engineering Manager / Director.\n   - Template C: Polite follow-up message after 5 business days of silence.\n\nExpected Output Format:\n1. Outreach Psychology & Rules of Engagement\n2. Template A (Technical Recruiter)\n3. Template B (Hiring Manager)\n4. Template C (Polite 5-Day Follow-Up)",
    "tags": [
      "career",
      "recruiting",
      "cold-email",
      "linkedin",
      "networking",
      "job-search"
    ],
    "difficulty": "Easy",
    "useCase": "Career & Resume",
    "variables": [
      "{{TARGET_COMPANY_AND_ROLE}}",
      "{{RECIPIENT_TYPE}}",
      "{{MY_USP}}"
    ],
    "expectedOutput": "Outreach rules + 3 customized templates (Recruiter, Hiring Manager, Follow-up)",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-tech-lead-behavioral-grilling",
    "title": "Senior Engineer & Tech Lead Behavioral Interview Preparation",
    "category": "Career",
    "subcategory": "Technical Interview",
    "description": "Prepares senior engineers for leadership grilling: driving cross-team consensus, technical disagreements, mentoring, and technical vision.",
    "prompt": "Act as a VP of Engineering conducting a Senior / Tech Lead Behavioral Interview. Challenge me with high-level architectural leadership scenarios.\n\nMy Experience Level & Target Role:\n{{MY_LEVEL_AND_TARGET}}\n\nTasks:\n1. Present 4 High-Stakes Leadership Scenarios:\n   - Scenario 1: A senior product manager wants to cut corners on architecture to hit a deadline; how do you push back with data?\n   - Scenario 2: Two senior engineers on your team are in a deadlock over choosing technology X vs technology Y; how do you resolve it?\n   - Scenario 3: How do you balance shipping customer features with paying down critical technical debt?\n   - Scenario 4: Tell me about a junior engineer you mentored who was underperforming.\n2. For each scenario:\n   - What the executive interviewer is looking for (Influence without authority, Pragmatism, Empathy, Business alignment).\n   - Junior/Mid Answer (Tactical mistakes to avoid).\n   - Principal / Staff Engineer Model Answer.\n\nExpected Output Format:\n4 Comprehensive Leadership Scenario Cards with Evaluation Criteria and Model Staff Answers.",
    "promptText": "Act as a VP of Engineering conducting a Senior / Tech Lead Behavioral Interview. Challenge me with high-level architectural leadership scenarios.\n\nMy Experience Level & Target Role:\n{{MY_LEVEL_AND_TARGET}}\n\nTasks:\n1. Present 4 High-Stakes Leadership Scenarios:\n   - Scenario 1: A senior product manager wants to cut corners on architecture to hit a deadline; how do you push back with data?\n   - Scenario 2: Two senior engineers on your team are in a deadlock over choosing technology X vs technology Y; how do you resolve it?\n   - Scenario 3: How do you balance shipping customer features with paying down critical technical debt?\n   - Scenario 4: Tell me about a junior engineer you mentored who was underperforming.\n2. For each scenario:\n   - What the executive interviewer is looking for (Influence without authority, Pragmatism, Empathy, Business alignment).\n   - Junior/Mid Answer (Tactical mistakes to avoid).\n   - Principal / Staff Engineer Model Answer.\n\nExpected Output Format:\n4 Comprehensive Leadership Scenario Cards with Evaluation Criteria and Model Staff Answers.",
    "tags": [
      "career",
      "tech-lead",
      "leadership",
      "staff-engineer",
      "behavioral-interview",
      "management"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{MY_LEVEL_AND_TARGET}}"
    ],
    "expectedOutput": "4 leadership scenario cards + evaluation criteria + tactical mistakes + staff model answers",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-system-design-communication-framework",
    "title": "System Design Interview Communication & Pacing Strategy",
    "category": "Career",
    "subcategory": "Technical Interview",
    "description": "Master the interpersonal and communication techniques of a system design interview: signposting, whiteboarding pacing, and handling interviewer interruptions.",
    "prompt": "Act as a Staff Systems Interview Coach. Train me on the communication and pacing strategies to ace a System Design interview.\n\nInterview Type & Target Level:\n{{INTERVIEW_TYPE_AND_LEVEL}}\n\nTasks:\n1. The 45-Minute Time Budget:\n   - 00-05m: Requirements & Clarifications (Scope, SLAs).\n   - 05-10m: Estimations (Traffic, Storage).\n   - 10-15m: API Contracts.\n   - 15-20m: High-Level Architecture.\n   - 20-35m: Component Deep-Dives.\n   - 35-42m: Bottlenecks, Failover & Trade-offs.\n   - 42-45m: Wrap-up & Q&A.\n2. Verbal Signposting Techniques:\n   - Phrases to transition smoothly between sections (\"Now that we've bounded our write volume, let's look at the database tier...\").\n3. Handling Interviewer Interruptions & Curveballs:\n   - How to respond gracefully when the interviewer changes requirements mid-interview (\"What if traffic suddenly spikes by 100x?\").\n4. Driving vs Passive Collaboration:\n   - How to maintain the driver's seat while actively soliciting feedback (\"Does this data model align with what you'd like to explore, or should we dive into the caching layer?\").\n\nExpected Output Format:\n1. 45-Minute Pacing Clock Diagram\n2. Verbal Signposting Phrasebook\n3. Dealing with Curveballs / Pushback Scripts\n4. Top 5 Disqualifying Communication Mistakes to Avoid",
    "promptText": "Act as a Staff Systems Interview Coach. Train me on the communication and pacing strategies to ace a System Design interview.\n\nInterview Type & Target Level:\n{{INTERVIEW_TYPE_AND_LEVEL}}\n\nTasks:\n1. The 45-Minute Time Budget:\n   - 00-05m: Requirements & Clarifications (Scope, SLAs).\n   - 05-10m: Estimations (Traffic, Storage).\n   - 10-15m: API Contracts.\n   - 15-20m: High-Level Architecture.\n   - 20-35m: Component Deep-Dives.\n   - 35-42m: Bottlenecks, Failover & Trade-offs.\n   - 42-45m: Wrap-up & Q&A.\n2. Verbal Signposting Techniques:\n   - Phrases to transition smoothly between sections (\"Now that we've bounded our write volume, let's look at the database tier...\").\n3. Handling Interviewer Interruptions & Curveballs:\n   - How to respond gracefully when the interviewer changes requirements mid-interview (\"What if traffic suddenly spikes by 100x?\").\n4. Driving vs Passive Collaboration:\n   - How to maintain the driver's seat while actively soliciting feedback (\"Does this data model align with what you'd like to explore, or should we dive into the caching layer?\").\n\nExpected Output Format:\n1. 45-Minute Pacing Clock Diagram\n2. Verbal Signposting Phrasebook\n3. Dealing with Curveballs / Pushback Scripts\n4. Top 5 Disqualifying Communication Mistakes to Avoid",
    "tags": [
      "career",
      "system-design",
      "communication",
      "interview-prep",
      "pacing",
      "faang"
    ],
    "difficulty": "Interview",
    "useCase": "Interview Preparation",
    "variables": [
      "{{INTERVIEW_TYPE_AND_LEVEL}}"
    ],
    "expectedOutput": "45-minute pacing clock + verbal signposting phrasebook + curveball scripts + top 5 mistakes",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-30-day-technical-skill-gap-plan",
    "title": "30-Day Accelerated Technical Skill Gap Roadmap",
    "category": "Career",
    "subcategory": "Career Roadmap",
    "description": "Builds a realistic, intensive 30-day curriculum to bridge technical gaps (e.g. learning Docker, System Design, or AWS) before interviews.",
    "prompt": "Act as an Engineering Education Architect. Build an intensive, high-yield 30-day learning curriculum to master this missing technical skill.\n\nSkill or Domain to Master:\n{{TARGET_SKILL}}\n\nCurrent Skill Level & Available Hours/Day:\n{{CURRENT_LEVEL_AND_HOURS}}\n\nTasks:\n1. 4-Week Progressive Curriculum:\n   - Week 1: Core Mechanics & Mental Models (Theory, architecture, fundamentals).\n   - Week 2: Hands-On Implementation & Patterns (Building real code, solving exercises).\n   - Week 3: Production Hardening, Edge Cases & Failure Modes (Debugging, metrics, trade-offs).\n   - Week 4: Interview Defense & Portfolio Capstone (Mock questions, explaining trade-offs).\n2. Curated Resource Recommendations:\n   - Free documentation, whitepapers, interactive tutorials, or open-source repos.\n3. Daily 2-Hour Breakdown:\n   - 45 mins active reading/theory -> 60 mins hands-on coding -> 15 mins flashcard/spaced-repetition review.\n4. Capstone Project Specification:\n   - A single, impressive mini-project demonstrating mastery to show on a resume/GitHub.\n\nExpected Output Format:\n1. 30-Day Day-by-Day Milestone Table\n2. Capstone Project Architecture Specification\n3. Top Curated Learning Resources\n4. Interview Readiness Self-Assessment Quiz",
    "promptText": "Act as an Engineering Education Architect. Build an intensive, high-yield 30-day learning curriculum to master this missing technical skill.\n\nSkill or Domain to Master:\n{{TARGET_SKILL}}\n\nCurrent Skill Level & Available Hours/Day:\n{{CURRENT_LEVEL_AND_HOURS}}\n\nTasks:\n1. 4-Week Progressive Curriculum:\n   - Week 1: Core Mechanics & Mental Models (Theory, architecture, fundamentals).\n   - Week 2: Hands-On Implementation & Patterns (Building real code, solving exercises).\n   - Week 3: Production Hardening, Edge Cases & Failure Modes (Debugging, metrics, trade-offs).\n   - Week 4: Interview Defense & Portfolio Capstone (Mock questions, explaining trade-offs).\n2. Curated Resource Recommendations:\n   - Free documentation, whitepapers, interactive tutorials, or open-source repos.\n3. Daily 2-Hour Breakdown:\n   - 45 mins active reading/theory -> 60 mins hands-on coding -> 15 mins flashcard/spaced-repetition review.\n4. Capstone Project Specification:\n   - A single, impressive mini-project demonstrating mastery to show on a resume/GitHub.\n\nExpected Output Format:\n1. 30-Day Day-by-Day Milestone Table\n2. Capstone Project Architecture Specification\n3. Top Curated Learning Resources\n4. Interview Readiness Self-Assessment Quiz",
    "tags": [
      "career",
      "learning-roadmap",
      "skill-gap",
      "career-growth",
      "curriculum"
    ],
    "difficulty": "Intermediate",
    "useCase": "Career & Resume",
    "variables": [
      "{{TARGET_SKILL}}",
      "{{CURRENT_LEVEL_AND_HOURS}}"
    ],
    "expectedOutput": "Day-by-day milestone table + capstone architecture spec + curated resources + readiness quiz",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  },
  {
    "id": "career-github-portfolio-readme-optimizer",
    "title": "GitHub Portfolio & Project README Showcase Optimizer",
    "category": "Career",
    "subcategory": "Project Explanation",
    "description": "Transforms messy GitHub project READMEs into elite developer portfolios: architecture diagrams, demo GIFs, tech decisions, and local setup.",
    "prompt": "Act as a Staff Open Source Maintainer and Hiring Manager. Transform this raw project description into an elite, portfolio-grade GitHub README.md.\n\nProject Name & Features:\n{{PROJECT_NAME_AND_FEATURES}}\n\nTech Stack:\n{{TECH_STACK}}\n\nTasks:\n1. README Architecture Structure:\n   - Badges (Build, License, Tech stack).\n   - Catchy Hero Tagline & Problem Statement.\n   - Interactive Demo / GIF placeholder.\n   - Architecture & Data Flow Diagram (Mermaid or ASCII).\n   - Key Engineering Challenges & How They Were Solved (proves you didn't just follow a tutorial).\n   - Quick Start / Local Development Guide (`git clone`, `docker compose up`, `.env.example`).\n   - Automated Testing instructions (`npm test`).\n2. Provide the complete markdown file ready to commit to GitHub.\n\nExpected Output Format:\n1. Complete, production-grade README.md file in markdown\n2. Architectural Diagram block (Mermaid.js)\n3. Resume Bullet Extraction derived from this project",
    "promptText": "Act as a Staff Open Source Maintainer and Hiring Manager. Transform this raw project description into an elite, portfolio-grade GitHub README.md.\n\nProject Name & Features:\n{{PROJECT_NAME_AND_FEATURES}}\n\nTech Stack:\n{{TECH_STACK}}\n\nTasks:\n1. README Architecture Structure:\n   - Badges (Build, License, Tech stack).\n   - Catchy Hero Tagline & Problem Statement.\n   - Interactive Demo / GIF placeholder.\n   - Architecture & Data Flow Diagram (Mermaid or ASCII).\n   - Key Engineering Challenges & How They Were Solved (proves you didn't just follow a tutorial).\n   - Quick Start / Local Development Guide (`git clone`, `docker compose up`, `.env.example`).\n   - Automated Testing instructions (`npm test`).\n2. Provide the complete markdown file ready to commit to GitHub.\n\nExpected Output Format:\n1. Complete, production-grade README.md file in markdown\n2. Architectural Diagram block (Mermaid.js)\n3. Resume Bullet Extraction derived from this project",
    "tags": [
      "career",
      "github",
      "portfolio",
      "readme",
      "open-source",
      "projects"
    ],
    "difficulty": "Easy",
    "useCase": "Career & Resume",
    "variables": [
      "{{PROJECT_NAME_AND_FEATURES}}",
      "{{TECH_STACK}}"
    ],
    "expectedOutput": "Production-grade README.md + Mermaid diagram + derived resume bullets",
    "tips": "Customize the variable values before executing in AI Chat for maximal contextual precision."
  }
];

// Helper functions
function getPromptById(id) {
  return PROMPTS_DATA.find(p => p.id === id) || null;
}

function getRelatedPrompts(currentPrompt, limit = 4) {
  if (!currentPrompt) return [];
  return PROMPTS_DATA
    .filter(p => p.id !== currentPrompt.id)
    .map(p => {
      let score = 0;
      if (p.subcategory === currentPrompt.subcategory) score += 5;
      if (p.category === currentPrompt.category) score += 3;
      if (p.useCase === currentPrompt.useCase) score += 2;
      if (Array.isArray(p.tags) && Array.isArray(currentPrompt.tags)) {
        const overlap = p.tags.filter(t => currentPrompt.tags.includes(t)).length;
        score += overlap * 2;
      }
      return { prompt: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.prompt);
}

// Export for browser and Node.js environments
if (typeof window !== 'undefined') {
  window.PROMPT_CATEGORIES = PROMPT_CATEGORIES;
  window.PROMPT_COLLECTIONS = PROMPT_COLLECTIONS;
  window.PROMPTS_DATA = PROMPTS_DATA;
  window.getPromptById = getPromptById;
  window.getRelatedPrompts = getRelatedPrompts;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PROMPT_CATEGORIES,
    PROMPT_COLLECTIONS,
    PROMPTS_DATA,
    getPromptById,
    getRelatedPrompts
  };
}
