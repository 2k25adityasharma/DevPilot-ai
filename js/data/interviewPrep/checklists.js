/**
 * DevPilot-AI — Core Interview Checklists
 * Comprehensive, independently trackable checklists for the 8 core CS/IT interview subjects.
 * Persisted in localStorage (devpilot_interview_prep_checklists).
 */

(function () {
  'use strict';

  const coreChecklists = {
    dbms: {
      id: "dbms",
      title: "DBMS Core Checklist",
      subject: "Database Management Systems",
      icon: "database",
      description: "Must-know database architecture, ACID transactions, normal forms, indexing, and storage fundamentals.",
      items: [
        { id: "dbms-chk-01", label: "DBMS vs RDBMS Architecture", important: true },
        { id: "dbms-chk-02", label: "Primary Key & Unique Key Constraints", important: true },
        { id: "dbms-chk-03", label: "Foreign Key & Referential Integrity", important: true },
        { id: "dbms-chk-04", label: "Candidate Key & Super Key Differences", important: false },
        { id: "dbms-chk-05", label: "Composite Key & Surrogate Keys", important: false },
        { id: "dbms-chk-06", label: "Functional Dependencies & Trivial FDs", important: false },
        { id: "dbms-chk-07", label: "First Normal Form (1NF: Atomic values)", important: true },
        { id: "dbms-chk-08", label: "Second Normal Form (2NF: No partial dependency)", important: true },
        { id: "dbms-chk-09", label: "Third Normal Form (3NF: No transitive dependency)", important: true },
        { id: "dbms-chk-10", label: "Boyce-Codd Normal Form (BCNF)", important: true },
        { id: "dbms-chk-11", label: "Transactions Lifecycle & States", important: true },
        { id: "dbms-chk-12", label: "ACID Properties (Atomicity, Consistency, Isolation, Durability)", important: true },
        { id: "dbms-chk-13", label: "Transaction Isolation Levels (Read Uncommitted to Serializable)", important: true },
        { id: "dbms-chk-14", label: "Serializability & Conflict Serializability", important: false },
        { id: "dbms-chk-15", label: "Concurrency Anomalies (Dirty Read, Non-repeatable Read, Phantom)", important: true },
        { id: "dbms-chk-16", label: "Two-Phase Locking Protocol (2PL & Strict 2PL)", important: false },
        { id: "dbms-chk-17", label: "Deadlocks in Databases (Detection, Wait-for Graphs, Prevention)", important: true },
        { id: "dbms-chk-18", label: "Clustered vs Non-Clustered Indexes", important: true },
        { id: "dbms-chk-19", label: "B-Tree vs B+ Tree in Database Indexing", important: true },
        { id: "dbms-chk-20", label: "Views & Materialized Views", important: false },
        { id: "dbms-chk-21", label: "Stored Procedures, Functions & Triggers", important: false },
        { id: "dbms-chk-22", label: "SQL vs NoSQL (Document, Key-Value, Columnar, Graph)", important: true },
        { id: "dbms-chk-23", label: "Database Security, SQL Injection Prevention & Role-based Access", important: true },
        { id: "dbms-chk-24", label: "WAL (Write-Ahead Logging) & Crash Recovery (ARIES)", important: false }
      ]
    },

    os: {
      id: "os",
      title: "Operating Systems Core Checklist",
      subject: "Operating Systems",
      icon: "memory",
      description: "Processes, threads, CPU scheduling algorithms, memory management, and synchronization primitives.",
      items: [
        { id: "os-chk-01", label: "Process vs Thread Architecture & Memory Layout", important: true },
        { id: "os-chk-02", label: "Process Control Block (PCB) & Process States", important: true },
        { id: "os-chk-03", label: "Context Switching & Overhead", important: true },
        { id: "os-chk-04", label: "CPU Scheduling Algorithms (FCFS, SJF, Round Robin, Priority)", important: true },
        { id: "os-chk-05", label: "Preemptive vs Non-Preemptive Scheduling", important: false },
        { id: "os-chk-06", label: "Inter-Process Communication (Pipes, Sockets, Shared Memory, Message Queues)", important: true },
        { id: "os-chk-07", label: "Race Conditions & Critical Section Problem", important: true },
        { id: "os-chk-08", label: "Peterson's Algorithm & Test-and-Set Hardware Instructions", important: false },
        { id: "os-chk-09", label: "Mutex Locks vs Binary/Counting Semaphores", important: true },
        { id: "os-chk-10", label: "Four Coffman Conditions for Deadlock", important: true },
        { id: "os-chk-11", label: "Deadlock Prevention, Avoidance & Banker's Algorithm", important: true },
        { id: "os-chk-12", label: "Contiguous vs Non-Contiguous Memory Allocation", important: false },
        { id: "os-chk-13", label: "Paging Concept, Page Tables & Frame Allocation", important: true },
        { id: "os-chk-14", label: "Translation Lookaside Buffer (TLB) & Effective Access Time", important: true },
        { id: "os-chk-15", label: "Segmentation vs Paging", important: false },
        { id: "os-chk-16", label: "Virtual Memory & Demand Paging", important: true },
        { id: "os-chk-17", label: "Page Fault Handling Mechanism", important: true },
        { id: "os-chk-18", label: "Page Replacement Algorithms (FIFO, LRU, Optimal, Clock)", important: true },
        { id: "os-chk-19", label: "Belady's Anomaly in FIFO Page Replacement", important: true },
        { id: "os-chk-20", label: "Thrashing & Working Set Model", important: false },
        { id: "os-chk-21", label: "File Systems Architecture, Inodes & Directories", important: false },
        { id: "os-chk-22", label: "System Calls (fork(), exec(), wait(), exit(), read(), write())", important: true }
      ]
    },

    cn: {
      id: "cn",
      title: "Computer Networks Core Checklist",
      subject: "Computer Networks",
      icon: "hub",
      description: "Layered networking models, TCP/IP, IP addressing, DNS resolution, and security protocols.",
      items: [
        { id: "cn-chk-01", label: "OSI 7-Layer Model & Functions of Each Layer", important: true },
        { id: "cn-chk-02", label: "TCP/IP 4-Layer Architecture vs OSI Model", important: true },
        { id: "cn-chk-03", label: "TCP vs UDP (Reliability, Overhead, Header Size, Use Cases)", important: true },
        { id: "cn-chk-04", label: "TCP 3-Way Handshake (SYN, SYN-ACK, ACK)", important: true },
        { id: "cn-chk-05", label: "TCP 4-Way Teardown (FIN, ACK, FIN, ACK & TIME_WAIT)", important: true },
        { id: "cn-chk-06", label: "TCP Flow Control (Sliding Window Protocol)", important: true },
        { id: "cn-chk-07", label: "TCP Congestion Control (Slow Start, AIMD, Fast Retransmit)", important: true },
        { id: "cn-chk-08", label: "IPv4 vs IPv6 Addressing & Headers", important: true },
        { id: "cn-chk-09", label: "Subnetting, Subnet Masks & CIDR Notation", important: true },
        { id: "cn-chk-10", label: "Classful vs Classless Addressing (Class A, B, C, Private IPs)", important: false },
        { id: "cn-chk-11", label: "DNS Resolution Flow (Root, TLD, Authoritative, Recursive Resolver)", important: true },
        { id: "cn-chk-12", label: "DHCP Protocol & DORA Process (Discover, Offer, Request, Ack)", important: false },
        { id: "cn-chk-13", label: "HTTP 1.1 vs HTTP/2 (Multiplexing) vs HTTP/3 (QUIC/UDP)", important: true },
        { id: "cn-chk-14", label: "HTTPS & TLS/SSL Handshake Process (Public/Private Keys, Certificates)", important: true },
        { id: "cn-chk-15", label: "Routing Protocols (Distance Vector / RIP, Link State / OSPF, BGP)", important: false },
        { id: "cn-chk-16", label: "Address Resolution Protocol (ARP) & ARP Poisoning", important: true },
        { id: "cn-chk-17", label: "Network Address Translation (NAT) & PAT", important: true },
        { id: "cn-chk-18", label: "Firewalls (Stateful vs Stateless Packet Filtering, WAF)", important: false },
        { id: "cn-chk-19", label: "Network Security: DDoS, Man-in-the-Middle (MitM), Port Scanning", important: true },
        { id: "cn-chk-20", label: "Step-by-step: What happens when you type google.com in a browser", important: true }
      ]
    },

    oop: {
      id: "oop",
      title: "OOP Core Checklist",
      subject: "Object-Oriented Programming",
      icon: "category",
      description: "Classes, encapsulation, inheritance, polymorphism, design patterns, and SOLID principles.",
      items: [
        { id: "oop-chk-01", label: "Class vs Object & Memory Representation", important: true },
        { id: "oop-chk-02", label: "Encapsulation & Data Hiding (Access Specifiers: private, protected, public)", important: true },
        { id: "oop-chk-03", label: "Abstraction (Abstract Classes vs Pure Virtual / Interfaces)", important: true },
        { id: "oop-chk-04", label: "Inheritance Types (Single, Multilevel, Multiple, Hierarchical, Hybrid)", important: true },
        { id: "oop-chk-05", label: "The Diamond Problem in Multiple Inheritance & Virtual Base Classes", important: true },
        { id: "oop-chk-06", label: "Compile-Time Polymorphism (Method Overloading & Operator Overloading)", important: true },
        { id: "oop-chk-07", label: "Run-Time Polymorphism (Method Overriding & Dynamic Dispatch)", important: true },
        { id: "oop-chk-08", label: "Constructors (Default, Parameterized, Copy Constructor) & Deep vs Shallow Copy", important: true },
        { id: "oop-chk-09", label: "Destructors & Virtual Destructors (Preventing Memory Leaks)", important: true },
        { id: "oop-chk-10", label: "Virtual Functions & Virtual Method Table (vtable / vptr)", important: true },
        { id: "oop-chk-11", label: "Interface vs Abstract Class (When to use which)", important: true },
        { id: "oop-chk-12", label: "SOLID: Single Responsibility Principle (SRP)", important: true },
        { id: "oop-chk-13", label: "SOLID: Open/Closed Principle (OCP)", important: true },
        { id: "oop-chk-14", label: "SOLID: Liskov Substitution Principle (LSP)", important: true },
        { id: "oop-chk-15", label: "SOLID: Interface Segregation Principle (ISP)", important: true },
        { id: "oop-chk-16", label: "SOLID: Dependency Inversion Principle (DIP)", important: true },
        { id: "oop-chk-17", label: "Composition over Inheritance Principle", important: true },
        { id: "oop-chk-18", label: "Static Keyword (Static Variables, Methods, Blocks)", important: false },
        { id: "oop-chk-19", label: "Common Design Patterns: Singleton, Factory, Observer, Strategy", important: true }
      ]
    },

    sql: {
      id: "sql",
      title: "SQL Core Checklist",
      subject: "Structured Query Language",
      icon: "terminal",
      description: "Query writing, joins, subqueries, CTEs, window functions, indexing, and transactional locking.",
      items: [
        { id: "sql-chk-01", label: "SELECT, WHERE, DISTINCT & Aliasing", important: true },
        { id: "sql-chk-02", label: "ORDER BY & Pagination (LIMIT / OFFSET)", important: true },
        { id: "sql-chk-03", label: "GROUP BY and Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)", important: true },
        { id: "sql-chk-04", label: "HAVING Clause vs WHERE Clause Difference", important: true },
        { id: "sql-chk-05", label: "INNER JOIN, LEFT (OUTER) JOIN, RIGHT JOIN, FULL OUTER JOIN", important: true },
        { id: "sql-chk-06", label: "CROSS JOIN and SELF JOIN Use Cases", important: true },
        { id: "sql-chk-07", label: "Scalar, Multiple-row, and Correlated Subqueries", important: true },
        { id: "sql-chk-08", label: "Common Table Expressions (CTEs) & WITH Clause", important: true },
        { id: "sql-chk-09", label: "Recursive CTEs (Hierarchical & Organizational Data)", important: false },
        { id: "sql-chk-10", label: "Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK()", important: true },
        { id: "sql-chk-11", label: "Analytical Window Functions: LEAD(), LAG(), FIRST_VALUE(), NTILE()", important: true },
        { id: "sql-chk-12", label: "CASE WHEN ... THEN ... ELSE ... END Statements", important: true },
        { id: "sql-chk-13", label: "NULL Handling: IS NULL, COALESCE(), NULLIF()", important: true },
        { id: "sql-chk-14", label: "INSERT INTO ... ON CONFLICT / MERGE (Upsert)", important: false },
        { id: "sql-chk-15", label: "UPDATE and DELETE with Subqueries & WHERE Safety", important: true },
        { id: "sql-chk-16", label: "Database Constraints: PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT", important: true },
        { id: "sql-chk-17", label: "Query Optimization with EXPLAIN ANALYZE and Index Scans", important: true },
        { id: "sql-chk-18", label: "Transactions: BEGIN, COMMIT, ROLLBACK, SAVEPOINT", important: true },
        { id: "sql-chk-19", label: "Nth Highest Salary Query (Dense_Rank vs Offset)", important: true }
      ]
    },

    systemDesign: {
      id: "systemDesign",
      title: "System Design Core Checklist",
      subject: "System Design & Architecture",
      icon: "account_tree",
      description: "Distributed system concepts, trade-offs, scaling patterns, message queues, and high-level design.",
      items: [
        { id: "sys-chk-01", label: "Vertical Scaling (Scale-up) vs Horizontal Scaling (Scale-out)", important: true },
        { id: "sys-chk-02", label: "High Availability & SLAs (99.9% vs 99.99% downtime calculation)", important: true },
        { id: "sys-chk-03", label: "Latency vs Throughput & Response Time Optimization", important: true },
        { id: "sys-chk-04", label: "Load Balancers (L4 vs L7) & Algorithms (Round Robin, Least Connections, Consistent Hashing)", important: true },
        { id: "sys-chk-05", label: "Caching Strategies (Cache-Aside, Write-Through, Write-Behind, Write-Around)", important: true },
        { id: "sys-chk-06", label: "Cache Eviction Policies (LRU, LFU, FIFO)", important: true },
        { id: "sys-chk-07", label: "Database Replication (Master-Slave / Leader-Follower vs Multi-Leader)", important: true },
        { id: "sys-chk-08", label: "Database Sharding & Partitioning Strategies (Range, Hash, Directory)", important: true },
        { id: "sys-chk-09", label: "CAP Theorem (Consistency, Availability, Partition Tolerance trade-offs)", important: true },
        { id: "sys-chk-10", label: "Strong Consistency vs Eventual Consistency", important: true },
        { id: "sys-chk-11", label: "Message Queues & Event Streaming (Kafka vs RabbitMQ)", important: true },
        { id: "sys-chk-12", label: "Content Delivery Networks (CDNs) for Static Asset Acceleration", important: true },
        { id: "sys-chk-13", label: "Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window Counter)", important: true },
        { id: "sys-chk-14", label: "API Paradigms: REST vs GraphQL vs gRPC", important: true },
        { id: "sys-chk-15", label: "Idempotency in Distributed APIs & Payment Processing", important: true },
        { id: "sys-chk-16", label: "Authentication & Authorization (JWT, OAuth 2.0, RBAC)", important: true },
        { id: "sys-chk-17", label: "Monitoring, Alerting & Observability (Metrics, Distributed Tracing, Logs)", important: true },
        { id: "sys-chk-18", label: "Design Blueprint: URL Shortener (TinyURL)", important: true },
        { id: "sys-chk-19", label: "Design Blueprint: Rate Limiter Service", important: true },
        { id: "sys-chk-20", label: "Design Blueprint: Real-time Chat Architecture (WebSockets)", important: true }
      ]
    },

    computerOrganization: {
      id: "computerOrganization",
      title: "Computer Organization Checklist",
      subject: "Computer Organization & Architecture",
      icon: "developer_board",
      description: "Digital logic, boolean algebra, CPU architecture, memory hierarchy, cache mapping, and instruction cycles.",
      items: [
        { id: "co-chk-01", label: "Number Base Conversions (Binary, Octal, Decimal, Hexadecimal)", important: true },
        { id: "co-chk-02", label: "Binary Arithmetic & 1's and 2's Complement Representation", important: true },
        { id: "co-chk-03", label: "Floating Point Representation (IEEE 754 Standard: Sign, Exponent, Mantissa)", important: false },
        { id: "co-chk-04", label: "Boolean Algebra Laws & De Morgan's Theorems", important: true },
        { id: "co-chk-05", label: "Logic Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) & Universal Gates", important: true },
        { id: "co-chk-06", label: "K-Maps (Karnaugh Maps) Minimization", important: false },
        { id: "co-chk-07", label: "Combinational Circuits (Half/Full Adder, Multiplexers, Decoders)", important: true },
        { id: "co-chk-08", label: "Sequential Circuits (Latches, Flip-Flops: SR, JK, D, T)", important: true },
        { id: "co-chk-09", label: "Von Neumann vs Harvard Architecture", important: true },
        { id: "co-chk-10", label: "Memory Hierarchy (Registers, L1/L2/L3 Cache, Main Memory, Secondary Storage)", important: true },
        { id: "co-chk-11", label: "Cache Mapping Techniques (Direct Mapped, Fully Associative, Set-Associative)", important: true },
        { id: "co-chk-12", label: "Cache Hit, Miss, and Hit Ratio Calculations", important: true },
        { id: "co-chk-13", label: "CPU Registers: Program Counter (PC), Instruction Register (IR), Accumulator, MAR, MBR", important: true },
        { id: "co-chk-14", label: "Instruction Cycle: Fetch, Decode, Execute, Write-back", important: true },
        { id: "co-chk-15", label: "Pipelining Concepts & Pipeline Hazards (Data, Structural, Control)", important: true },
        { id: "co-chk-16", label: "Interrupt Handling & Direct Memory Access (DMA)", important: false }
      ]
    },

    softwareEngineering: {
      id: "softwareEngineering",
      title: "Software Engineering Checklist",
      subject: "Software Engineering & Testing",
      icon: "construction",
      description: "SDLC lifecycle models, Agile/Scrum, testing methodologies, CI/CD pipelines, and software design principles.",
      items: [
        { id: "se-chk-01", label: "Software Development Life Cycle (SDLC) Phases", important: true },
        { id: "se-chk-02", label: "Waterfall Model vs Agile Methodology", important: true },
        { id: "se-chk-03", label: "Scrum Framework: Roles (Scrum Master, Product Owner), Ceremonies, Artifacts", important: true },
        { id: "se-chk-04", label: "Kanban vs Scrum Differences", important: false },
        { id: "se-chk-05", label: "Functional vs Non-Functional Requirements (SRS)", important: true },
        { id: "se-chk-06", label: "Verification vs Validation Difference", important: true },
        { id: "se-chk-07", label: "Testing Hierarchy: Unit, Integration, System, Acceptance (UAT)", important: true },
        { id: "se-chk-08", label: "Test-Driven Development (TDD) Cycle: Red-Green-Refactor", important: true },
        { id: "se-chk-09", label: "Regression Testing & Smoke vs Sanity Testing", important: true },
        { id: "se-chk-10", label: "Black-Box vs White-Box Testing Techniques", important: true },
        { id: "se-chk-11", label: "Continuous Integration & Continuous Deployment (CI/CD) Principles", important: true },
        { id: "se-chk-12", label: "Code Review Best Practices & Static Code Analysis", important: true },
        { id: "se-chk-13", label: "Software Design Principles: DRY, KISS, YAGNI, Separation of Concerns", important: true },
        { id: "se-chk-14", label: "Semantic Versioning (MAJOR.MINOR.PATCH)", important: false }
      ]
    }
  };

  // Expose to Browser
  if (typeof window !== 'undefined') {
    window.interviewPrepChecklists = coreChecklists;
  }

  // Expose to Node.js / CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = coreChecklists;
  }
})();
