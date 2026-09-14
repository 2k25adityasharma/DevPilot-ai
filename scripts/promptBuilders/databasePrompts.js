/**
 * Database Prompts Collection (12 Prompts)
 * Covers SQL, PostgreSQL, MongoDB, Indexing, Transactions, Normalization, and Architecture.
 */
module.exports = [
  {
    id: 'db-explain-analyze-optimizer',
    title: 'SQL Query Execution Plan (EXPLAIN ANALYZE) & Index Optimizer',
    category: 'Database',
    subcategory: 'Query Optimization',
    description: 'Diagnoses Seq Scans, nested loops, high cost nodes, and temp disk spills in EXPLAIN ANALYZE output and designs covering indexes.',
    prompt: `Act as a Database Administrator (DBA) and PostgreSQL/MySQL Performance Tuning Specialist. Analyze this slow SQL query and its execution plan.

Query:
{{SQL_QUERY}}

EXPLAIN ANALYZE Output:
{{EXPLAIN_OUTPUT}}

Tasks:
1. Break down the Execution Plan nodes:
   - Identify Sequential Scans (Seq Scan) on large tables.
   - Analyze actual time vs estimated cost divergence (outdated table statistics).
   - Identify Sort / Hash aggregate memory spills to disk (work_mem exhaustion).
2. Root Cause: Why is this query slow? (Missing index, non-sargable WHERE predicate, suboptimal join order).
3. Recommended Remediation:
   - Specific Composite / Partial / Covering Indexes (\`CREATE INDEX ... INCLUDE (...)\`).
   - Query rewrites (e.g. converting subqueries to JOINs, removing functions from indexed columns).
   - Server parameter tuning (e.g. \`work_mem\`, \`random_page_cost\`).
4. Show the optimized SQL and predicted new execution plan.

Expected Output Format:
1. Execution Plan Bottleneck Breakdown
2. Root Cause Analysis
3. Targeted Index DDL Statements
4. Optimized Query Rewrite
5. Expected Performance Improvement Multiplier`,
    tags: ['database', 'sql', 'explain-analyze', 'indexing', 'performance', 'postgres'],
    difficulty: 'Advanced',
    useCase: 'Query Optimization',
    variables: ['{{SQL_QUERY}}', '{{EXPLAIN_OUTPUT}}'],
    expectedOutput: 'Plan bottleneck breakdown + root cause + targeted index DDL + query rewrite + performance gain'
  },
  {
    id: 'db-joins-comprehensive-guide',
    title: 'SQL Joins Master: INNER, LEFT, RIGHT, FULL OUTER & Anti-Joins',
    category: 'Database',
    subcategory: 'SQL',
    description: 'Constructs relational joins with ASCII Venn diagrams, anti-join patterns for finding orphan records, and performance comparisons.',
    prompt: `Act as a Database Expert and Technical Interviewer. I need to formulate a complex multi-table query using appropriate JOIN strategies.

Tables & Relations:
{{TABLES_AND_RELATIONS}}

Query Goal:
{{QUERY_GOAL}}

Tasks:
1. Explain which JOIN type is required (INNER, LEFT, RIGHT, FULL OUTER, or Cross Join) and why.
2. Demonstrate how to implement an Anti-Join (finding records in Table A that have NO match in Table B using \`LEFT JOIN ... WHERE B.id IS NULL\` vs \`NOT EXISTS\`).
3. Detail the impact of placing filter conditions in the \`ON\` clause vs the \`WHERE\` clause in outer joins.
4. Provide the production-ready SQL query with clean table aliases and indentation.
5. Provide sample input tables and the exact output result table.

Expected Output Format:
1. Join Type Selection & ASCII Venn Visualization
2. ON vs WHERE Clause Evaluation
3. Production SQL Query
4. Sample Input & Output Trace Table`,
    tags: ['database', 'sql', 'joins', 'left-join', 'inner-join', 'anti-join'],
    difficulty: 'Easy',
    useCase: 'Database Design',
    variables: ['{{TABLES_AND_RELATIONS}}', '{{QUERY_GOAL}}'],
    expectedOutput: 'Join selection + ASCII visualization + ON vs WHERE evaluation + production query + sample trace'
  },
  {
    id: 'db-recursive-cte-hierarchies',
    title: 'SQL Recursive CTE: Hierarchical Trees & Graph Traversal',
    category: 'Database',
    subcategory: 'SQL',
    description: 'Traverses recursive organizational charts, category trees, and breadcrumbs using Common Table Expressions (WITH RECURSIVE).',
    prompt: `Act as an Advanced SQL Specialist. Build a Recursive Common Table Expression (CTE) to traverse this hierarchical tree structure.

Table Schema & Hierarchy Context:
{{HIERARCHICAL_DATA_SCHEMA}}

Traversal Objective:
{{OBJECTIVE}}

Tasks:
1. Structure the Recursive CTE:
   - Anchor Member: Base query that selects root nodes (e.g. \`parent_id IS NULL\`).
   - Recursive Member: Query that joins the CTE back to the base table on parent-child foreign keys.
   - Termination Condition: Natural termination when no further children exist.
2. Track hierarchy metadata:
   - Level / Depth counter (e.g. level 1 = CEO, level 2 = VP).
   - Breadcrumb path array (e.g. \`root -> electronics -> laptops\`).
   - Cycle prevention guard (protecting against infinite loops in cyclic graphs).
3. Provide the complete SQL query.

Expected Output Format:
1. Recursive CTE Mechanics & Execution Flow
2. Complete SQL Query with Cycle Guard
3. Output Table Schema with Level & Path Columns
4. Performance & Maximum Recursion Limit Note`,
    tags: ['database', 'sql', 'cte', 'recursive-cte', 'trees', 'hierarchies'],
    difficulty: 'Advanced',
    useCase: 'Database Design',
    variables: ['{{HIERARCHICAL_DATA_SCHEMA}}', '{{OBJECTIVE}}'],
    expectedOutput: 'CTE mechanics + complete SQL query with cycle guard + output schema with depth + recursion note'
  },
  {
    id: 'db-window-functions-ranking',
    title: 'SQL Window Functions: ROW_NUMBER, RANK, DENSE_RANK & LAG/LEAD',
    category: 'Database',
    subcategory: 'SQL',
    description: 'Solves complex ranking, running totals, and moving averages using window functions and the OVER (PARTITION BY ... ORDER BY ...) clause.',
    prompt: `Act as a Senior Data Engineer. Formulate an advanced SQL query using Window Functions for the following analytics problem.

Table Schema:
{{SCHEMA}}

Analytics Goal (e.g. Top 3 highest salaries per department / Month-over-month growth):
{{ANALYTICS_GOAL}}

Tasks:
1. Choose the appropriate window function:
   - Difference between \`ROW_NUMBER()\`, \`RANK()\`, and \`DENSE_RANK()\` on tie values.
   - Use of \`LAG()\` and \`LEAD()\` for period-over-period percentage comparisons.
   - Use of running totals (\`SUM(...) OVER (PARTITION BY ... ORDER BY ...)\`).
2. Construct the \`OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)\` framing clause.
3. Wrap in a subquery or CTE if filtering on the computed window column is required (since window functions cannot appear directly in WHERE).
4. Provide the complete SQL query with sample output data.

Expected Output Format:
1. Window Function Choice & Tie Behavior Analysis
2. Frame Specification Breakdown
3. Complete SQL Query
4. Sample Input & Output Verification Table`,
    tags: ['database', 'sql', 'window-functions', 'rank', 'dense-rank', 'analytics'],
    difficulty: 'Intermediate',
    useCase: 'Database Design',
    variables: ['{{SCHEMA}}', '{{ANALYTICS_GOAL}}'],
    expectedOutput: 'Window function comparison + frame specification + complete SQL query + verification table'
  },
  {
    id: 'db-schema-normalization-bcnf',
    title: 'Database Normalization: 1NF to BCNF & Strategic Denormalization',
    category: 'Database',
    subcategory: 'DBMS Concepts',
    description: 'Normalizes relational schemas systematically through 1NF, 2NF, 3NF, and BCNF, and explains when to strategically denormalize for scale.',
    prompt: `Act as a Relational Database Architect and DBMS Professor. Normalize this raw unnormalized table schema systematically.

Unnormalized Table & Functional Dependencies:
{{RAW_SCHEMA_AND_DEPENDENCIES}}

Tasks:
1. 1st Normal Form (1NF): Eliminate repeating groups and ensure atomic values.
2. 2nd Normal Form (2NF): Eliminate partial functional dependencies (where a non-key attribute depends on part of a composite primary key).
3. 3rd Normal Form (3NF): Eliminate transitive dependencies (non-key attribute depending on another non-key attribute).
4. Boyce-Codd Normal Form (BCNF): Ensure every determinant is a candidate key.
5. Trade-off Analysis: When does high normalization hurt read performance, and what strategic denormalization (e.g. caching pre-computed totals) is acceptable in high-read systems?
6. Provide final DDL CREATE TABLE statements with primary and foreign key constraints.

Expected Output Format:
1. Step-by-Step Normalization Breakdown (1NF -> 2NF -> 3NF -> BCNF)
2. Dependency Diagrams
3. Final Normalized DDL Schema
4. Strategic Denormalization Recommendations`,
    tags: ['database', 'dbms', 'normalization', '3nf', 'bcnf', 'database-design'],
    difficulty: 'Intermediate',
    useCase: 'Database Design',
    variables: ['{{RAW_SCHEMA_AND_DEPENDENCIES}}'],
    expectedOutput: 'Normalization steps breakdown + dependency diagrams + final DDL schema + denormalization analysis'
  },
  {
    id: 'db-acid-transaction-isolation',
    title: 'ACID Properties & Transaction Isolation Levels Demystified',
    category: 'Database',
    subcategory: 'DBMS Concepts',
    description: 'Explains Dirty Reads, Non-Repeatable Reads, and Phantom Reads across Read Uncommitted, Read Committed, Repeatable Read, and Serializable.',
    prompt: `Act as an ACID and Concurrency Control Specialist. Explain transaction isolation levels and diagnose concurrency anomalies in this scenario.

Concurrent Transaction Scenario:
{{TRANSACTION_SCENARIO}}

Tasks:
1. Define the 4 ACID properties (Atomicity, Consistency, Isolation, Durability) and how the Write-Ahead Log (WAL) guarantees them.
2. Analyze the 3 read phenomena:
   - Dirty Read
   - Non-Repeatable Read (Fuzzy Read)
   - Phantom Read
3. Compare the 4 ANSI SQL Isolation Levels in a Markdown Matrix:
   - Read Uncommitted
   - Read Committed (Postgres default)
   - Repeatable Read
   - Serializable
4. Explain how Multi-Version Concurrency Control (MVCC) works in modern databases to allow readers not to block writers and writers not to block readers.
5. Provide SQL code demonstrating how to set transaction isolation and prevent the specified concurrency bug.

Expected Output Format:
1. ACID & WAL Architecture Summary
2. Concurrency Anomalies Matrix Table
3. MVCC Snapshot Mechanics Explanation
4. Corrective SQL Transaction Block with Explicit Isolation Level`,
    tags: ['database', 'acid', 'transactions', 'isolation-levels', 'mvcc', 'concurrency'],
    difficulty: 'Intermediate',
    useCase: 'Interview Preparation',
    variables: ['{{TRANSACTION_SCENARIO}}'],
    expectedOutput: 'ACID summary + anomaly matrix table + MVCC mechanics + SQL transaction block'
  },
  {
    id: 'db-postgres-row-level-locking',
    title: 'PostgreSQL Row-Level Locking & High-Concurrency Queues',
    category: 'Database',
    subcategory: 'PostgreSQL',
    description: 'Implements non-blocking concurrent job queues in PostgreSQL using SELECT FOR UPDATE SKIP LOCKED and pessimistic locks.',
    prompt: `Act as a High-Scale PostgreSQL Architect. Design a bulletproof, concurrent task-processing queue directly inside PostgreSQL.

Queue Requirements & Worker Concurrency:
{{QUEUE_REQUIREMENTS}}

Tasks:
1. Explain the difference between optimistic locking (version column) and pessimistic locking (\`SELECT FOR UPDATE\`).
2. Explain why naive \`SELECT ... FOR UPDATE\` causes worker lock contention and serial execution bottlenecks under high concurrency.
3. Implement the optimal pattern: \`SELECT ... FOR UPDATE SKIP LOCKED\` (allowing concurrent workers to pick unique jobs without waiting on each other's locks).
4. Address:
   - Transaction boundary duration (keeping locked transactions ultra-short).
   - Handling worker crash mid-task (retry timeouts and status reset).
   - Index requirements for the queue query.
5. Provide complete SQL DDL, enqueue query, worker fetch query, and complete query.

Expected Output Format:
1. Locking Mechanics Comparison (Optimistic vs Pessimistic vs Skip Locked)
2. Queue Table DDL with Indexes
3. Worker Task Acquisition Query
4. Crash Recovery Strategy`,
    tags: ['postgres', 'locking', 'concurrency', 'skip-locked', 'queues', 'database'],
    difficulty: 'Advanced',
    useCase: 'Architecture Review',
    variables: ['{{QUEUE_REQUIREMENTS}}'],
    expectedOutput: 'Locking comparison + queue table DDL + skip locked worker query + crash recovery strategy'
  },
  {
    id: 'db-mongo-aggregation-pipeline-builder',
    title: 'MongoDB Aggregation Pipeline: Multi-Stage Filtering, Grouping & Joins',
    category: 'Database',
    subcategory: 'MongoDB',
    description: 'Architects complex MongoDB aggregation pipelines ($match, $unwind, $group, $lookup, $project) with index optimization.',
    prompt: `Act as a Senior MongoDB Solutions Architect. Build a high-performance aggregation pipeline for this analytics requirement.

Collections Schema:
{{COLLECTIONS_SCHEMA}}

Analytics Objective:
{{ANALYTICS_OBJECTIVE}}

Tasks:
1. Design the multi-stage aggregation pipeline:
   - \`$match\` stage placed first to leverage indexes and prune working dataset early.
   - \`$unwind\` for nested arrays.
   - \`$group\` with accumulators (\`$sum\`, \`$avg\`, \`$addToSet\`).
   - \`$lookup\` for collection joins with custom pipeline projection.
   - \`$project\` / \`$addFields\` for clean response shape.
   - \`$sort\` and \`$limit\` for pagination.
2. Explain the 100MB RAM stage limit and when \`allowDiskUse: true\` is required.
3. Propose compound indexes that allow the initial \`$match\` and \`$sort\` to be covered entirely by index.
4. Provide the complete aggregation query in JavaScript / Node.js Mongoose format.

Expected Output Format:
1. Stage-by-Stage Pipeline Diagram
2. Production Aggregation Code (Node.js/Mongo Shell)
3. Index Optimization Specification
4. Memory & Performance Best Practices`,
    tags: ['mongodb', 'aggregation', 'nosql', 'lookup', 'database', 'queries'],
    difficulty: 'Advanced',
    useCase: 'Database Design',
    variables: ['{{COLLECTIONS_SCHEMA}}', '{{ANALYTICS_OBJECTIVE}}'],
    expectedOutput: 'Pipeline diagram + production aggregation code + index optimization + memory guidelines'
  },
  {
    id: 'db-sharding-partitioning-architecture',
    title: 'Database Scaling: Partitioning, Sharding & Replication Architecture',
    category: 'Database',
    subcategory: 'Database Design',
    description: 'Architects scale-out strategies: declarative table partitioning (range/hash/list), sharding keys, and master-replica failover.',
    prompt: `Act as a Principal Database Infrastructure Architect. Design a database scaling strategy for a table growing by 50 million rows per month.

Data Scale & Access Patterns:
{{DATA_SCALE_AND_ACCESS_PATTERNS}}

Tasks:
1. Compare Scaling Dimensions:
   - Vertical Scaling vs Read Replicas.
   - Table Partitioning (PostgreSQL declarative Range/List/Hash partitioning on a single node).
   - Horizontal Sharding (Distributing partitions across multiple independent database nodes).
2. Choose a Sharding / Partition Key:
   - Analyze hot-spot risks (e.g. why timestamp as shard key creates write hotspots).
   - Hash-based vs Range-based routing.
   - Cross-shard join penalties.
3. Replication Topology:
   - Primary-Replica with asynchronous vs synchronous replication.
   - Replication lag mitigation and read-after-write consistency.
4. Provide concrete DDL for table partitioning.

Expected Output Format:
1. Scaling Decision Matrix
2. Shard Key Evaluation & Trade-offs
3. Partitioning DDL Implementation (PostgreSQL)
4. Replication Topology Diagram & Consistency Strategy`,
    tags: ['database', 'sharding', 'partitioning', 'scalability', 'replication', 'postgres'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{DATA_SCALE_AND_ACCESS_PATTERNS}}'],
    expectedOutput: 'Scaling matrix + shard key evaluation + PostgreSQL partitioning DDL + replication topology'
  },
  {
    id: 'db-sql-vs-nosql-decision-framework',
    title: 'SQL vs NoSQL: High-Stakes Database Selection Framework',
    category: 'Database',
    subcategory: 'Database Design',
    description: 'Evaluates Relational (Postgres/MySQL), Document (MongoDB), Key-Value (Redis), Wide-Column (Cassandra), and Graph (Neo4j) for a system.',
    prompt: `Act as a Chief Technology Officer (CTO) and Principal Data Architect. Deliver a comprehensive database selection analysis for this application.

System Requirements & Data Model:
{{SYSTEM_REQUIREMENTS}}

Tasks:
1. Compare suitability across:
   - Relational (RDBMS - PostgreSQL, MySQL): ACID, complex joins, schema integrity.
   - Document Store (MongoDB): Dynamic schema, hierarchical JSON documents, rapid prototyping.
   - Key-Value Store (Redis): Microsecond in-memory caching, session management.
   - Wide-Column Store (Cassandra, ScyllaDB): High write-throughput time-series, linear scale.
2. Evaluate against CAP Theorem (Consistency vs Availability during network partition).
3. Evaluate Polyglot Persistence: Should multiple specialized databases be used together (e.g. Postgres for financial ledger + Redis for active sessions + ElasticSearch for text search)?
4. Provide final recommendation with clear cost, operational complexity, and scale justifications.

Expected Output Format:
1. Comparison Scorecard Matrix
2. CAP Theorem & Access Pattern Fit
3. Polyglot Architecture Diagram
4. Final Architectural Decision Record (ADR)`,
    tags: ['database', 'sql-vs-nosql', 'system-design', 'architecture', 'cap-theorem', 'polyglot'],
    difficulty: 'Intermediate',
    useCase: 'Architecture Review',
    variables: ['{{SYSTEM_REQUIREMENTS}}'],
    expectedOutput: 'Comparison scorecard + CAP theorem fit + polyglot architecture + final ADR document'
  },
  {
    id: 'db-technical-interview-questions-generator',
    title: 'Database Technical Interview Questions & Model Answers',
    category: 'Database',
    subcategory: 'Interview Questions',
    description: 'Generates high-yield database interview questions (Indexing, ACID, Joins, Normalization) with beginner, intermediate, and staff-level answers.',
    prompt: `Act as a Senior Database Engineering Interviewer at Amazon. Generate 5 challenging, real-world database interview questions based on this topic.

Database Topic:
{{DATABASE_TOPIC}}

Candidate Target Level:
{{TARGET_LEVEL}}

For each question provide:
1. The Question as asked in the interview.
2. What the interviewer is evaluating (hidden traps, depth of understanding).
3. Mediocre / Junior Answer (what common candidates say).
4. Senior / Elite Model Answer (including internal engine mechanics, storage pages, B-Tree pointers, or MVCC snapshots).
5. Follow-Up Curveball Question to test true mastery under pressure.

Expected Output Format:
5 Structured Question Cards with Junior vs Senior model answers and follow-ups.`,
    tags: ['database', 'sql', 'interview-prep', 'dbms', 'technical-interview'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{DATABASE_TOPIC}}', '{{TARGET_LEVEL}}'],
    expectedOutput: '5 technical interview questions + evaluation criteria + junior vs senior answers + curveballs'
  },
  {
    id: 'db-postgres-deadlock-investigator',
    title: 'PostgreSQL Deadlock Diagnostic & Lock Graph Resolver',
    category: 'Database',
    subcategory: 'PostgreSQL',
    description: 'Diagnoses PostgreSQL deadlocks, analyzes pg_stat_activity lock trees, and restructures query ordering to eliminate mutual blocking.',
    prompt: `Act as a PostgreSQL Internals Specialist. Diagnose and eliminate deadlocks in this high-concurrency database environment.

Deadlock Log Message:
{{DEADLOCK_LOG}}

Transactions Involved:
{{TRANSACTION_QUERIES}}

Tasks:
1. Reconstruct the Deadlock Graph:
   - Which transaction holds Lock A and is waiting for Lock B?
   - Which transaction holds Lock B and is waiting for Lock A?
2. Identify why the lock order inverted (e.g. updating items in random order instead of sorted ID order).
3. Detail how PostgreSQL's Deadlock Detector (\`deadlock_timeout\`) detects cycles and chooses a transaction to abort.
4. Provide the architectural fix:
   - Consistent resource locking order (sorting entity IDs before batch update).
   - Advisory locks or optimistic concurrency.
   - Retry loops with exponential backoff on serialization failures.
5. Provide the corrected application queries.

Expected Output Format:
1. Deadlock Cycle Visualization
2. Lock Inversion Root Cause
3. Corrected Application Transaction Logic (with ID sorting)
4. Application-Level Retry Pattern (Postgres Error 40P01)`,
    tags: ['database', 'postgres', 'deadlocks', 'locking', 'concurrency', 'debugging'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{DEADLOCK_LOG}}', '{{TRANSACTION_QUERIES}}'],
    expectedOutput: 'Deadlock cycle visualization + root cause + sorted lock order logic + 40P01 retry pattern'
  }
];
