// js/data/interviewPrep/softwareEngineering.js
// Complete Question Bank for Software Engineering (14 topics * 10 = 140 MCQs)

window.interviewPrepSE = {
  id: 'software_engineering',
  title: 'Software Engineering',
  icon: 'engineering',
  description: 'Master SDLC models, Agile/Scrum, requirements engineering, UML, SOLID principles, testing, and DevOps.',
  totalQuestions: 140,
  topics: [
    'SDLC Models',
    'Agile Methodology & Scrum Framework',
    'Requirements Engineering & SRS',
    'Software Architecture Patterns',
    'UML Diagrams',
    'Design Principles',
    'Software Testing Fundamentals',
    'Testing Levels',
    'Test Automation & TDD vs BDD',
    'Software Maintenance, Refactoring & Technical Debt',
    'Software Metrics & Quality Assurance',
    'Software Project Estimation & Models',
    'DevOps Culture, CI/CD & Release Management',
    'Code Review Best Practices & Static Analysis'
  ],
  questions: [
  {
    "id": "se_sdlc_1",
    "topic": "SDLC Models",
    "difficulty": "Easy",
    "question": "Which SDLC model is characterized by sequential, non-overlapping phases where each phase must be completed before the next begins?",
    "options": [
      "Spiral Model",
      "Waterfall Model",
      "Agile Model",
      "RAD Model"
    ],
    "correctAnswer": 1,
    "explanation": "The Waterfall Model is a linear sequential model where phases (Requirements, Design, Implementation, Verification, Maintenance) cascade downwards without overlapping."
  },
  {
    "id": "se_sdlc_2",
    "topic": "SDLC Models",
    "difficulty": "Easy",
    "question": "What is the primary strength of the Spiral Model in software engineering?",
    "options": [
      "Simplicity and linear execution",
      "Heavy emphasis on formal risk analysis and risk management at each iterative spiral loop",
      "Elimination of documentation",
      "Immediate delivery of production code in phase 1"
    ],
    "correctAnswer": 1,
    "explanation": "Proposed by Barry Boehm, the Spiral Model combines iterative prototyping with systematic risk analysis in four quadrants: Determine objectives, Identify and resolve risks, Development and testing, Plan next iteration."
  },
  {
    "id": "se_sdlc_3",
    "topic": "SDLC Models",
    "difficulty": "Easy",
    "question": "What is the key advantage of the Prototyping Model?",
    "options": [
      "Requires no customer interaction",
      "Helps clarify ambiguous or incomplete requirements early by building an interactive mock/prototype for user feedback",
      "Guarantees the lowest total development cost",
      "Is strictly waterfall-based"
    ],
    "correctAnswer": 1,
    "explanation": "Prototyping involves building an early working demonstration of system features so stakeholders can explore, validate, and refine unclear requirements before full-scale engineering."
  },
  {
    "id": "se_sdlc_4",
    "topic": "SDLC Models",
    "difficulty": "Easy",
    "question": "In the V-Model (Validation and Verification Model), what corresponds to the Unit Testing phase?",
    "options": [
      "System Requirements Analysis",
      "Component / Detailed Design",
      "Architectural High-Level Design",
      "Acceptance Testing"
    ],
    "correctAnswer": 1,
    "explanation": "In the V-Model, testing phases correspond symmetrically to development phases: Component/Detailed Design maps directly to Unit Testing, High-Level Design maps to Integration Testing, and System Requirements map to Acceptance Testing."
  },
  {
    "id": "se_sdlc_5",
    "topic": "SDLC Models",
    "difficulty": "Medium",
    "question": "When is the Waterfall model most appropriate to adopt?",
    "options": [
      "When requirements are unstable and changing rapidly",
      "When requirements are well-understood, clearly defined, and stable with proven technology",
      "For cutting-edge AI research projects",
      "When rapid prototype demonstration is needed in 2 weeks"
    ],
    "correctAnswer": 1,
    "explanation": "Waterfall excels when requirements are crisp, comprehensive, and unlikely to change significantly, such as regulatory compliance software or defense infrastructure with fixed specifications."
  },
  {
    "id": "se_sdlc_6",
    "topic": "SDLC Models",
    "difficulty": "Medium",
    "question": "What is the primary difference between Verification and Validation in software engineering?",
    "options": [
      "Verification checks code syntax; Validation formats code",
      "Verification: \"Are we building the product right?\" (conformance to specifications); Validation: \"Are we building the right product?\" (meeting user needs)",
      "Verification is done by clients; Validation by developers",
      "Verification is black-box; Validation is white-box"
    ],
    "correctAnswer": 1,
    "explanation": "Verification evaluates artifacts (reviews, inspections, unit tests) to verify they meet specified requirements. Validation tests the actual working system to validate that it satisfies real customer intent and operational needs."
  },
  {
    "id": "se_sdlc_7",
    "topic": "SDLC Models",
    "difficulty": "Medium",
    "question": "What is the RAD (Rapid Application Development) model?",
    "options": [
      "A model focused on writing assembly language",
      "An adaptive development model focusing on rapid prototyping, component reuse, and short iterative cycles (typically 60-90 days)",
      "A model without any testing phase",
      "A waterfall variant with no customer involvement"
    ],
    "correctAnswer": 1,
    "explanation": "RAD prioritizes rapid iterative prototyping and visual component assembly over extensive upfront planning, enabling functional modules to be built and reviewed in fast 60 to 90-day timeboxes."
  },
  {
    "id": "se_sdlc_8",
    "topic": "SDLC Models",
    "difficulty": "Medium",
    "question": "In the Spiral Model, what occurs in the \"Risk Analysis\" quadrant?",
    "options": [
      "Developers write automated unit tests",
      "Project risks (technical, cost, schedule) are identified, evaluated, and mitigated, often through prototyping or simulation",
      "Code is deployed to cloud production servers",
      "Customer writes the user manual"
    ],
    "correctAnswer": 1,
    "explanation": "The risk assessment quadrant evaluates technical feasibility, resource bottlenecks, and architectural uncertainties, creating benchmarks or prototypes to eliminate risks before progressing."
  },
  {
    "id": "se_sdlc_9",
    "topic": "SDLC Models",
    "difficulty": "Hard",
    "question": "What is the fundamental limitation of the traditional Waterfall Model that led to the Agile revolution?",
    "options": [
      "It produces too many working prototypes",
      "Late integration and validation: working software is delivered only at the very end of the cycle, meaning major design flaws and requirement misalignments are discovered when change is most expensive",
      "It cannot be used for enterprise projects",
      "It lacks a formal documentation phase"
    ],
    "correctAnswer": 1,
    "explanation": "In Waterfall, working software only emerges near deployment. If requirements shift or architectural assumptions prove flawed, rework costs escalate exponentially because all prior phases assumed fixed baselines."
  },
  {
    "id": "se_sdlc_10",
    "topic": "SDLC Models",
    "difficulty": "Hard",
    "question": "How does the Incremental Model differ from the Iterative Model in software engineering?",
    "options": [
      "They are identical terms with no distinction",
      "Incremental delivers the system in fully finished functional chunks (slice by slice); Iterative delivers the entire system in a rough draft initially and progressively refines all parts with each pass",
      "Iterative delivers no working code until release",
      "Incremental requires waterfall for every module"
    ],
    "correctAnswer": 1,
    "explanation": "Incremental development builds and delivers the software product piece by piece (adding new complete features each release). Iterative development refines the entire system iteratively, enhancing quality and depth of all components across iterations."
  },
  {
    "id": "se_ag_1",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Easy",
    "question": "How many core values and principles are defined in the Agile Manifesto (2001)?",
    "options": [
      "2 values, 5 principles",
      "4 values, 12 principles",
      "5 values, 10 principles",
      "3 values, 9 principles"
    ],
    "correctAnswer": 1,
    "explanation": "The Agile Manifesto establishes 4 core values (e.g., Individuals & interactions over processes & tools) and 12 guiding principles for iterative, customer-centric software delivery."
  },
  {
    "id": "se_ag_2",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Easy",
    "question": "What are the three official Scrum Roles defined in the Scrum Guide?",
    "options": [
      "Project Manager, Tech Lead, Tester",
      "Product Owner, Scrum Master, Developers (Development Team)",
      "Architect, Business Analyst, QA Lead",
      "Engineering Director, Product Manager, Scrum Master"
    ],
    "correctAnswer": 1,
    "explanation": "Scrum defines exactly 3 roles: the Product Owner (maximizes product value and manages backlog), the Scrum Master (serves team and enforces Scrum practices), and Developers (build increments)."
  },
  {
    "id": "se_ag_3",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Easy",
    "question": "What is the standard time-box duration for a Daily Scrum (Stand-up) meeting?",
    "options": [
      "15 minutes",
      "30 minutes",
      "45 minutes",
      "1 hour"
    ],
    "correctAnswer": 0,
    "explanation": "The Daily Scrum is strictly time-boxed to 15 minutes for the development team to inspect progress toward the Sprint Goal and adapt the daily plan."
  },
  {
    "id": "se_ag_4",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Easy",
    "question": "What is the primary purpose of a Sprint Retrospective in Scrum?",
    "options": [
      "To demo finished user stories to clients",
      "To inspect how the last sprint went with regards to individuals, processes, and tools, and identify concrete improvements for the next sprint",
      "To assign story point estimates to backlog items",
      "To deploy code to production"
    ],
    "correctAnswer": 1,
    "explanation": "The Sprint Retrospective occurs at the end of each Sprint for the team to reflect on team dynamics, workflows, and obstacles, establishing actionable experiments for continuous process improvement."
  },
  {
    "id": "se_ag_5",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the Definition of Done (DoD) in Scrum?",
    "options": [
      "When the developer pushes code to GitHub",
      "A formal, shared checklist of quality criteria that an increment must satisfy before it is considered releasable (e.g. tests passed, reviewed, documented)",
      "When the Product Owner approves the sprint planning document",
      "When 80% of sprint user stories are coded"
    ],
    "correctAnswer": 1,
    "explanation": "The Definition of Done is a comprehensive standard shared across the Scrum team ensuring transparency; an increment cannot be counted toward velocity or released unless it satisfies every DoD criterion."
  },
  {
    "id": "se_ag_6",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Medium",
    "question": "What is a \"Sprint Burndown Chart\" used for?",
    "options": [
      "Tracking server CPU utilization",
      "Graphically displaying the remaining work (in hours or story points) across sprint days to track progress toward the Sprint Goal",
      "Calculating employee bonuses",
      "Logging bug severity trends over a year"
    ],
    "correctAnswer": 1,
    "explanation": "A Sprint Burndown Chart plots remaining estimated effort against time (days in sprint). The trend line indicates whether the team is ahead, on track, or behind schedule to achieve the sprint commitment."
  },
  {
    "id": "se_ag_7",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Medium",
    "question": "What is the fundamental difference between Scrum and Kanban?",
    "options": [
      "Scrum is for software; Kanban is only for manufacturing",
      "Scrum uses fixed-length iterations (sprints) and cross-functional roles; Kanban is continuous flow with no required roles and limits Work In Progress (WIP)",
      "Kanban has 4-week sprints",
      "Scrum prohibits retrospectives"
    ],
    "correctAnswer": 1,
    "explanation": "Scrum relies on time-boxed sprints, specific events, and defined roles. Kanban operates on a continuous flow model without sprints, focusing on visualizing workflow and enforcing strict WIP (Work In Progress) limits."
  },
  {
    "id": "se_ag_8",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Medium",
    "question": "What does the \"INVEST\" acronym stand for in evaluating good Agile User Stories?",
    "options": [
      "Integrated, Networked, Validated, Estimated, Scaled, Tested",
      "Independent, Negotiable, Valuable, Estimable, Small, Testable",
      "Iterative, Normalized, Verified, Efficient, Structured, Tracked",
      "Immediate, Native, Visible, Explicit, Secure, Timely"
    ],
    "correctAnswer": 1,
    "explanation": "INVEST, coined by Bill Wake: Independent (not coupled), Negotiable (details discussed), Valuable (delivers user value), Estimable (sized properly), Small (fits in sprint), Testable (has acceptance criteria)."
  },
  {
    "id": "se_ag_9",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Hard",
    "question": "What is \"Velocity\" in Scrum and how should it be used responsibly?",
    "options": [
      "A metric to compare and rank different teams across an organization",
      "The measure of work a specific team completes per sprint (in story points), used strictly as an internal capacity planning tool for future sprints",
      "The clock speed of the CI/CD pipeline server",
      "A KPI enforced by executive management to demand 20% increases each quarter"
    ],
    "correctAnswer": 1,
    "explanation": "Velocity is a localized measure of how much backlog effort a team delivers in a sprint. Because estimation is subjective and relative to each team, velocity should never be used to compare teams or set external quotas."
  },
  {
    "id": "se_ag_10",
    "topic": "Agile Methodology & Scrum Framework",
    "difficulty": "Hard",
    "question": "What should happen if a Scrum team realizes mid-sprint that they cannot complete all committed backlog items?",
    "options": [
      "The sprint duration is extended by one week",
      "The developers negotiate with the Product Owner to remove or resize lower-priority items from the Sprint Backlog without compromising the overarching Sprint Goal",
      "The Scrum Master cancels the sprint immediately",
      "Developers skip unit testing to deliver all items on time"
    ],
    "correctAnswer": 1,
    "explanation": "Sprint duration is an inviolable timebox. If work exceeds capacity, the developers consult the Product Owner to remove or simplify scope while protecting quality standards and maintaining the primary Sprint Goal."
  },
  {
    "id": "se_re_1",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Easy",
    "question": "What does SRS stand for in software engineering?",
    "options": [
      "Software Regression Suite",
      "Software Requirements Specification",
      "System Recovery Service",
      "Standard Routing System"
    ],
    "correctAnswer": 1,
    "explanation": "SRS stands for Software Requirements Specification, the official document outlining the complete expected behavior, features, and non-functional constraints of a software system."
  },
  {
    "id": "se_re_2",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Easy",
    "question": "Which of the following is an example of a \"Functional Requirement\"?",
    "options": [
      "The system must respond to user queries within 200 ms",
      "The system shall allow users to reset their password via email verification link",
      "The application must support 99.99% uptime",
      "The codebase must be written in TypeScript"
    ],
    "correctAnswer": 1,
    "explanation": "Functional requirements describe specific behaviors, inputs, calculations, and services the system must execute (e.g. password reset). Speed, uptime, and language constraints are non-functional."
  },
  {
    "id": "se_re_3",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Easy",
    "question": "Which of the following is an example of a \"Non-Functional Requirement\" (NFR)?",
    "options": [
      "User can add products to a shopping cart",
      "User can export reports to PDF format",
      "System must support 10,000 concurrent users with latency under 1 second",
      "Admin can deactivate user accounts"
    ],
    "correctAnswer": 2,
    "explanation": "Non-functional requirements specify quality attributes, system qualities, constraints, and performance targets (e.g., scalability, throughput, latency, security) rather than direct business logic functions."
  },
  {
    "id": "se_re_4",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Easy",
    "question": "What is \"Requirements Elicitation\"?",
    "options": [
      "Writing test automation scripts",
      "The process of gathering, discovering, and uncovering requirements from stakeholders, users, and business documents",
      "Deleting old bug reports",
      "Compiling software requirements into binaries"
    ],
    "correctAnswer": 1,
    "explanation": "Elicitation is the initial phase of requirements engineering where analysts engage stakeholders through interviews, surveys, workshops, and observation to extract underlying needs."
  },
  {
    "id": "se_re_5",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Medium",
    "question": "What standard IEEE document format historically governed the creation of Software Requirements Specifications?",
    "options": [
      "IEEE 802.11",
      "IEEE 829",
      "IEEE 830 / ISO/IEC/IEEE 29148",
      "IEEE 754"
    ],
    "correctAnswer": 2,
    "explanation": "IEEE 830 (superseded by ISO/IEC/IEEE 29148) provides the international standard guidelines and structure for writing comprehensive, high-quality SRS documents."
  },
  {
    "id": "se_re_6",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Medium",
    "question": "What is a \"Traceability Matrix\" (RTM) in software engineering?",
    "options": [
      "A diagram showing database foreign keys",
      "A table that maps each user requirement to corresponding architectural design elements, code modules, and test cases to ensure complete coverage",
      "A tool for tracking Git commit history",
      "A network routing table"
    ],
    "correctAnswer": 1,
    "explanation": "A Requirements Traceability Matrix (RTM) traces requirements bidirectionally through architecture, code, and test cases, proving that all requirements are tested and no untraced features (\"scope creep\") were added."
  },
  {
    "id": "se_re_7",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Medium",
    "question": "What is \"Scope Creep\" and how can it damage a software project?",
    "options": [
      "Software code expanding due to compiler optimization",
      "The uncontrolled, continuous addition of new features or requirements without corresponding adjustments to time, budget, or resources",
      "Database disk space filling up with logs",
      "Git branches diverging too far from main"
    ],
    "correctAnswer": 1,
    "explanation": "Scope creep occurs when new requirements are continuously accepted during development without formal change control, causing missed deadlines, budget overruns, and compromised software stability."
  },
  {
    "id": "se_re_8",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Medium",
    "question": "In requirements analysis, what is the MoSCoW prioritization technique?",
    "options": [
      "A Russian encryption algorithm",
      "A framework classifying requirements into Must have, Should have, Could have, and Won't have (this time)",
      "A model for estimating server cloud costs",
      "A testing pyramid structure"
    ],
    "correctAnswer": 1,
    "explanation": "MoSCoW categorizes backlog items into: Must have (critical for release), Should have (important but workarounds exist), Could have (desirable if time permits), and Won't have (deferred to future releases)."
  },
  {
    "id": "se_re_9",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Hard",
    "question": "Which characteristic is essential for a requirement to be deemed \"verifiable\" or \"testable\"?",
    "options": [
      "It must use words like \"user-friendly\" and \"fast\"",
      "It must be stated in unambiguous, quantifiable, and measurable terms such that a pass/fail test can be executed",
      "It must be approved by at least 10 executives",
      "It must fit on a single line of text"
    ],
    "correctAnswer": 1,
    "explanation": "A verifiable requirement avoids subjective ambiguity (e.g., \"the UI must be responsive\") and specifies concrete measurable thresholds (e.g., \"page initial load time must be < 1.5 seconds over 4G connections\")."
  },
  {
    "id": "se_re_10",
    "topic": "Requirements Engineering & SRS",
    "difficulty": "Hard",
    "question": "What is the difference between User Requirements and System Requirements?",
    "options": [
      "User requirements are written in Python; system requirements in C++",
      "User requirements are high-level statements in natural language with diagrams for clients; System requirements set out detailed functional specifications and operational constraints for developers",
      "System requirements are written by end users",
      "There is no difference"
    ],
    "correctAnswer": 1,
    "explanation": "User requirements express client goals and business expectations in clear non-technical language. System requirements translate those goals into formal, detailed technical specifications used by engineers."
  },
  {
    "id": "se_arch_1",
    "topic": "Software Architecture Patterns",
    "difficulty": "Easy",
    "question": "What is a \"Monolithic Architecture\"?",
    "options": [
      "An architecture running on custom quantum computers",
      "A software system where all components (UI, business logic, data access) are bundled, compiled, and executed as a single unified deployable unit",
      "A system composed of hundreds of Docker containers",
      "An event-driven architecture using Kafka"
    ],
    "correctAnswer": 1,
    "explanation": "A monolith packages all business features, data access routines, and controllers into one unified codebase and deployment artifact running on a shared process runtime."
  },
  {
    "id": "se_arch_2",
    "topic": "Software Architecture Patterns",
    "difficulty": "Easy",
    "question": "What is the core premise of a Microservices Architecture?",
    "options": [
      "Writing code in small fonts",
      "Decomposing an application into a suite of small, independently deployable, loosely coupled services organized around business capabilities and communicating via lightweight protocols (e.g. REST/gRPC)",
      "Deploying one single giant war file",
      "Running all code in browser memory"
    ],
    "correctAnswer": 1,
    "explanation": "Microservices break an enterprise application into discrete independent services, each owning its domain and database, communicating via APIs or event brokers, deployable autonomously."
  },
  {
    "id": "se_arch_3",
    "topic": "Software Architecture Patterns",
    "difficulty": "Easy",
    "question": "What are the typical layers in a standard 3-Tier Layered Architecture?",
    "options": [
      "TCP, IP, Ethernet",
      "Presentation Layer (UI), Business Logic Layer (Application), and Data Access / Persistence Layer (Database)",
      "Frontend, Docker, Kubernetes",
      "Client, Router, Firewall"
    ],
    "correctAnswer": 1,
    "explanation": "The 3-tier architecture organizes software into: Presentation (handles UI/views), Business Logic/Service (domain rules and processing), and Data Layer (database schemas and ORM persistence)."
  },
  {
    "id": "se_arch_4",
    "topic": "Software Architecture Patterns",
    "difficulty": "Easy",
    "question": "In MVC (Model-View-Controller) architecture, what is the role of the Controller?",
    "options": [
      "To render HTML graphics to the screen",
      "To store database records on disk",
      "To act as an intermediary that accepts user input, manipulates the Model, and selects the View to display",
      "To route network cables"
    ],
    "correctAnswer": 2,
    "explanation": "The Controller processes incoming HTTP/UI requests, invokes business logic on the Model, and selects the appropriate View to present the response back to the client."
  },
  {
    "id": "se_arch_5",
    "topic": "Software Architecture Patterns",
    "difficulty": "Medium",
    "question": "What is an \"Event-Driven Architecture\" (EDA)?",
    "options": [
      "An architecture where code executes only during company events",
      "A pattern where decoupled components communicate asynchronously by producing, detecting, and consuming events or messages via a broker",
      "A system where developers manually click buttons to trigger functions",
      "A strictly synchronous architecture"
    ],
    "correctAnswer": 1,
    "explanation": "In EDA, state changes emit events to an event broker (like Kafka or RabbitMQ). Consumer services subscribe and react to events asynchronously, enabling high decoupling and scalability."
  },
  {
    "id": "se_arch_6",
    "topic": "Software Architecture Patterns",
    "difficulty": "Medium",
    "question": "What is the primary trade-off of adopting Microservices over a Monolith?",
    "options": [
      "Microservices have zero network latency",
      "Microservices offer independent scalability and deployment flexibility, but introduce complex distributed system challenges (network failures, data consistency, distributed transactions, observability)",
      "Microservices require no DevOps tooling",
      "Monoliths cannot run on Linux servers"
    ],
    "correctAnswer": 1,
    "explanation": "Microservices decouple teams and enable independent deployments, but exchange in-process simplicity for distributed complexities: network latency, partial failures, distributed tracing, and eventual data consistency."
  },
  {
    "id": "se_arch_7",
    "topic": "Software Architecture Patterns",
    "difficulty": "Medium",
    "question": "What is \"Hexagonal Architecture\" (Ports and Adapters Architecture)?",
    "options": [
      "An architecture with 6 layers of database tables",
      "A pattern that isolates core domain business logic from external dependencies (DB, UI, HTTP) through interfaces (Ports) and concrete implementations (Adapters)",
      "A design pattern for rendering 3D graphics",
      "A Kubernetes cluster topology"
    ],
    "correctAnswer": 1,
    "explanation": "Alistair Cockburn's Hexagonal architecture isolates business logic at the core. Outer technologies (databases, web frameworks, messaging) plug into the core via input/output Ports and Adapters, enabling easy testing and replacement."
  },
  {
    "id": "se_arch_8",
    "topic": "Software Architecture Patterns",
    "difficulty": "Medium",
    "question": "What is CQRS (Command Query Responsibility Segregation)?",
    "options": [
      "A database encryption protocol",
      "An architectural pattern that separates operations that mutate data (Commands) from operations that read data (Queries), often using different models or databases for each",
      "A Git branching strategy",
      "A Scrum estimation method"
    ],
    "correctAnswer": 1,
    "explanation": "CQRS separates read and update operations. Commands handle business validation and state modification; Queries bypass complex domain models to fetch optimized view representations quickly."
  },
  {
    "id": "se_arch_9",
    "topic": "Software Architecture Patterns",
    "difficulty": "Hard",
    "question": "In a distributed microservice architecture, how is the \"Saga Pattern\" used to manage transactions across services?",
    "options": [
      "By using 2-phase commit (2PC) on all databases simultaneously",
      "By orchestrating a sequence of local transactions where each step publishes an event; if a step fails, compensating transactions are executed to undo preceding changes",
      "By locking all tables across all microservices until completion",
      "By rolling back the Git repository"
    ],
    "correctAnswer": 1,
    "explanation": "Because distributed 2PC locks resources and hurts availability, the Saga pattern coordinates a series of local transactions. If a sub-transaction fails, the Saga executes predefined compensating transactions in reverse to preserve eventual consistency."
  },
  {
    "id": "se_arch_10",
    "topic": "Software Architecture Patterns",
    "difficulty": "Hard",
    "question": "What is the \"Strangler Fig Pattern\" in software re-architecture?",
    "options": [
      "A pattern that kills microservices when memory is exceeded",
      "An incremental migration strategy where a legacy monolithic system is gradually replaced by intercepting calls and replacing functionality with microservices piece by piece until the monolith disappears",
      "A security exploit that bypasses firewalls",
      "A code obfuscation technique"
    ],
    "correctAnswer": 1,
    "explanation": "Martin Fowler's Strangler Fig pattern places a facade/API gateway in front of a legacy monolith, incrementally carving out bounded contexts into microservices until the legacy system is completely superseded and retired safely."
  },
  {
    "id": "se_uml_1",
    "topic": "UML Diagrams",
    "difficulty": "Easy",
    "question": "What does UML stand for in software engineering?",
    "options": [
      "Unified Modeling Language",
      "Universal Machine Language",
      "Unified Markup Logic",
      "Universal Module Linker"
    ],
    "correctAnswer": 0,
    "explanation": "UML stands for Unified Modeling Language, the standard visual modeling notation for specifying, visualizing, constructing, and documenting software system artifacts."
  },
  {
    "id": "se_uml_2",
    "topic": "UML Diagrams",
    "difficulty": "Easy",
    "question": "Which UML diagram depicts the static structure of a system by showing classes, attributes, methods, and relationships?",
    "options": [
      "Sequence Diagram",
      "Use Case Diagram",
      "Class Diagram",
      "Activity Diagram"
    ],
    "correctAnswer": 2,
    "explanation": "A Class Diagram is a structural UML diagram modeling classes, interfaces, attributes, operations, and relationships (inheritance, association, aggregation, composition)."
  },
  {
    "id": "se_uml_3",
    "topic": "UML Diagrams",
    "difficulty": "Easy",
    "question": "What does an \"Actor\" represent in a UML Use Case Diagram?",
    "options": [
      "A database table",
      "An external entity (human user, external system, hardware device) that interacts with the system to achieve a goal",
      "A software function or class method",
      "A CPU processor thread"
    ],
    "correctAnswer": 1,
    "explanation": "In Use Case diagrams, an Actor represents an external entity (person, role, organization, or external service) initiating or receiving value from system use cases."
  },
  {
    "id": "se_uml_4",
    "topic": "UML Diagrams",
    "difficulty": "Easy",
    "question": "In a UML Class Diagram, what does a filled solid diamond on an association line represent?",
    "options": [
      "Aggregation (weak has-a)",
      "Composition (strong has-a, where child cannot exist without parent)",
      "Generalization (inheritance)",
      "Interface implementation"
    ],
    "correctAnswer": 1,
    "explanation": "A solid black diamond denotes Composition: strong ownership where the component's lifecycle is bound to the container (e.g. Building and Rooms; if Building is destroyed, Rooms are destroyed). An empty diamond denotes Aggregation."
  },
  {
    "id": "se_uml_5",
    "topic": "UML Diagrams",
    "difficulty": "Medium",
    "question": "What is the primary focus of a UML Sequence Diagram?",
    "options": [
      "Showing database foreign key constraints",
      "Visualizing interactions and message exchanges between objects or components arranged in time sequence",
      "Showing physical server network deployment",
      "Mapping state transitions of a variable"
    ],
    "correctAnswer": 1,
    "explanation": "A Sequence Diagram is an interaction diagram displaying objects along vertical lifelines and chronological message exchanges (synchronous calls, asynchronous signals, return values) horizontally over time."
  },
  {
    "id": "se_uml_6",
    "topic": "UML Diagrams",
    "difficulty": "Medium",
    "question": "In a UML Use Case Diagram, what is the difference between \"<<include>>\" and \"<<extend>>\" relationships?",
    "options": [
      "<<include>> is for classes; <<extend>> is for databases",
      "<<include>> means the base use case unconditionally and mandatory executes the included use case; <<extend>> adds optional behavior under specific extension point conditions",
      "<<include>> is optional; <<extend>> is mandatory",
      "They are synonymous"
    ],
    "correctAnswer": 1,
    "explanation": "<<include>> signifies mandatory invocation (e.g., \"Checkout\" always includes \"Authenticate\"). <<extend>> represents optional or conditional behavior branching from the base use case (e.g., \"Apply Promo Coupon\" extends \"Checkout\")."
  },
  {
    "id": "se_uml_7",
    "topic": "UML Diagrams",
    "difficulty": "Medium",
    "question": "What is a UML State Machine (Statechart) Diagram best suited for modeling?",
    "options": [
      "Data flow through a CI/CD pipeline",
      "The lifecycle, dynamic states, events, and transitions of an individual object or entity (e.g., Order: Placed -> Paid -> Shipped -> Delivered)",
      "Relational database foreign keys",
      "Network IP routing"
    ],
    "correctAnswer": 1,
    "explanation": "State Machine diagrams model the discrete states an entity transitions through in response to internal or external events during its lifecycle."
  },
  {
    "id": "se_uml_8",
    "topic": "UML Diagrams",
    "difficulty": "Medium",
    "question": "What does an open hollow triangle arrowhead at the end of a solid line denote in UML class diagrams?",
    "options": [
      "Dependency",
      "Generalization / Inheritance (Subclass points to Superclass)",
      "Composition",
      "Association"
    ],
    "correctAnswer": 1,
    "explanation": "An empty/hollow arrowhead on a solid line indicates Generalization (Inheritance). If the line is dashed with a hollow triangle, it represents Realization/Implementation of an Interface."
  },
  {
    "id": "se_uml_9",
    "topic": "UML Diagrams",
    "difficulty": "Hard",
    "question": "What is the difference between a UML Activity Diagram and a BPMN (Business Process Model and Notation) Diagram?",
    "options": [
      "Activity diagrams cannot show decisions",
      "Activity diagrams model procedural workflow logic, concurrency, and operational steps within software; BPMN is tailored specifically for business workflows, message flows, and business participant collaboration",
      "BPMN is only for hardware circuits",
      "UML cannot model parallel execution"
    ],
    "correctAnswer": 1,
    "explanation": "UML Activity diagrams are designed for modeling computational control and object flows (concurrency with forks/joins). BPMN focuses on cross-organizational business process workflows, pools, swimlanes, and business messaging."
  },
  {
    "id": "se_uml_10",
    "topic": "UML Diagrams",
    "difficulty": "Hard",
    "question": "What is a UML Deployment Diagram used for in enterprise architecture?",
    "options": [
      "To track Git commit deployments",
      "To model the physical or virtual execution architecture, mapping software artifacts (JARs, containers) onto hardware nodes (servers, cloud VMs, devices)",
      "To design user interface buttons",
      "To write database queries"
    ],
    "correctAnswer": 1,
    "explanation": "Deployment diagrams illustrate the physical infrastructure topology of a system, specifying how software artifacts (executables, binaries, microservice containers) map to hardware processing nodes, execution environments, and communication networks."
  },
  {
    "id": "se_dp_1",
    "topic": "Design Principles",
    "difficulty": "Easy",
    "question": "What does the \"S\" in SOLID design principles stand for?",
    "options": [
      "Scalable Architecture Principle",
      "Single Responsibility Principle (SRP)",
      "System Reliability Principle",
      "Software Reusability Principle"
    ],
    "correctAnswer": 1,
    "explanation": "SRP (Single Responsibility Principle) states: \"A class should have one, and only one, reason to change\", meaning it should encapsulate a single focused responsibility or business concern."
  },
  {
    "id": "se_dp_2",
    "topic": "Design Principles",
    "difficulty": "Easy",
    "question": "What does the DRY principle stand for in software development?",
    "options": [
      "Do Robust Yielding",
      "Don't Repeat Yourself",
      "Deploy Regularly Yourself",
      "Design Reusable Yardsticks"
    ],
    "correctAnswer": 1,
    "explanation": "DRY (Don't Repeat Yourself) states that every piece of knowledge or business logic must have a single, unambiguous, authoritative representation within a system, eliminating duplicate implementations."
  },
  {
    "id": "se_dp_3",
    "topic": "Design Principles",
    "difficulty": "Easy",
    "question": "What does the KISS principle advocate for in software engineering?",
    "options": [
      "Keep It Simple, Stupid / Silly",
      "Key Interface System Security",
      "Keep Iterations Short and Swift",
      "Know Internal System State"
    ],
    "correctAnswer": 0,
    "explanation": "KISS (Keep It Simple, Stupid) emphasizes that software systems work best when designs remain simple and straightforward, avoiding unnecessary abstractions and over-engineering."
  },
  {
    "id": "se_dp_4",
    "topic": "Design Principles",
    "difficulty": "Easy",
    "question": "What does the YAGNI principle caution developers against?",
    "options": [
      "Writing too many unit tests",
      "Implementing features and speculative functionality before they are actually needed (\"You Aren't Gonna Need It\")",
      "Using open-source libraries",
      "Refactoring legacy code"
    ],
    "correctAnswer": 1,
    "explanation": "YAGNI (\"You Aren't Gonna Need It\") is an Extreme Programming principle advising developers never to write speculative code based on imagined future requirements until real use cases demand them."
  },
  {
    "id": "se_dp_5",
    "topic": "Design Principles",
    "difficulty": "Medium",
    "question": "What is the Open/Closed Principle (OCP) in SOLID?",
    "options": [
      "Databases should be open for reading and closed for writing",
      "Software entities (classes, modules, functions) should be open for extension, but closed for modification",
      "Source code should be open-source, but binaries closed-source",
      "Ports should be open for incoming traffic only"
    ],
    "correctAnswer": 1,
    "explanation": "OCP states that system behavior should be extendable (via inheritance, polymorphism, or plugins) without modifying existing, tested source code."
  },
  {
    "id": "se_dp_6",
    "topic": "Design Principles",
    "difficulty": "Medium",
    "question": "What does the Liskov Substitution Principle (LSP) require?",
    "options": [
      "Every class must have a public constructor",
      "Subtypes must be substitutable for their base types without altering the correctness or desirable properties of the program",
      "Inheritance should replace composition in all cases",
      "Methods must return void"
    ],
    "correctAnswer": 1,
    "explanation": "Formulated by Barbara Liskov, LSP requires that derived classes honor the contract and behavior expected of their base classes (preconditions cannot be strengthened, postconditions cannot be weakened)."
  },
  {
    "id": "se_dp_7",
    "topic": "Design Principles",
    "difficulty": "Medium",
    "question": "What does the Interface Segregation Principle (ISP) state?",
    "options": [
      "A class should implement at least 10 interfaces",
      "Clients should not be forced to depend upon interfaces they do not use (prefer small, client-specific interfaces over large, fat ones)",
      "All interfaces must be kept private",
      "Interfaces should never have method signatures"
    ],
    "correctAnswer": 1,
    "explanation": "ISP advocates breaking fat, bloated interfaces into focused, role-specific interfaces so implementing classes only need to implement methods relevant to their actual role."
  },
  {
    "id": "se_dp_8",
    "topic": "Design Principles",
    "difficulty": "Medium",
    "question": "What does the Dependency Inversion Principle (DIP) mandate?",
    "options": [
      "High-level modules should depend on low-level modules",
      "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). Abstractions should not depend on details; details should depend on abstractions",
      "Code should depend directly on SQL queries",
      "Microservices should invert HTTP connections"
    ],
    "correctAnswer": 1,
    "explanation": "DIP decouples modules: high-level business policies should depend on abstract contracts rather than concrete low-level implementations, enabling dependency injection and test mockability."
  },
  {
    "id": "se_dp_9",
    "topic": "Design Principles",
    "difficulty": "Hard",
    "question": "The classic \"Square extends Rectangle\" problem is a textbook violation of which SOLID principle and why?",
    "options": [
      "SRP, because Square has two responsibilities",
      "LSP (Liskov Substitution Principle), because setting Width and Height independently breaks Square's invariant that width must equal height, altering expected Rectangle behavior",
      "DIP, because Square depends on a database",
      "ISP, because Rectangle has too many interfaces"
    ],
    "correctAnswer": 1,
    "explanation": "A Square inheriting from Rectangle violates LSP. If a client expects a Rectangle and invokes `rect.setWidth(5)` followed by `rect.setHeight(10)`, an area of 50 is expected. Modifying a Square forces both dimensions to equal 10, breaking the caller's assumptions."
  },
  {
    "id": "se_dp_10",
    "topic": "Design Principles",
    "difficulty": "Hard",
    "question": "How does the Law of Demeter (Principle of Least Knowledge) prevent tight coupling in object-oriented systems?",
    "options": [
      "By preventing classes from having more than 5 methods",
      "By dictating that a method should only call methods on its own object, its parameters, objects it creates, or its immediate component instances (avoiding chains like `a.getB().getC().doD()`)",
      "By hiding database passwords in config files",
      "By making all variables static"
    ],
    "correctAnswer": 1,
    "explanation": "The Law of Demeter advises: \"Talk only to your immediate friends\". Calling `order.getCustomer().getAddress().getCity()` couples `order` to deep internal structures of `Customer` and `Address`, making refactoring fragile."
  },
  {
    "id": "se_tf_1",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Easy",
    "question": "What is the fundamental difference between White-Box Testing and Black-Box Testing?",
    "options": [
      "White-box is done during daytime; black-box at night",
      "White-Box tests internal logic, control flow, and code structure; Black-Box tests functionality against specifications without knowledge of internal code",
      "White-box is for hardware; black-box is for software",
      "Black-box testing has no inputs"
    ],
    "correctAnswer": 1,
    "explanation": "White-Box (structural) testing inspects source code, paths, branches, and statements. Black-Box (behavioral) testing evaluates software behavior purely against requirement specs without looking into internal code."
  },
  {
    "id": "se_tf_2",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Easy",
    "question": "What is Gray-Box Testing?",
    "options": [
      "Testing outdated software versions",
      "A testing approach combining knowledge of internal data structures/algorithms (partial white-box) with black-box behavioral test execution",
      "Testing software on virtual machines",
      "Automated testing run by AI bots"
    ],
    "correctAnswer": 1,
    "explanation": "Gray-Box testing blends black-box functional testing with partial awareness of underlying architectures, database schemas, or error logs to design more targeted test cases."
  },
  {
    "id": "se_tf_3",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Easy",
    "question": "In Black-Box testing, what is \"Equivalence Partitioning\"?",
    "options": [
      "Dividing server CPU cores equally among tests",
      "Dividing the input domain into partitions of equivalent data from which test cases are derived, assuming all values in a partition yield the same behavior",
      "Sorting test cases alphabetically",
      "Splitting unit tests into equal time slices"
    ],
    "correctAnswer": 1,
    "explanation": "Equivalence partitioning segments input values into valid and invalid classes. Testing one representative value from each class effectively covers the behavior of the entire partition, minimizing redundant tests."
  },
  {
    "id": "se_tf_4",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Easy",
    "question": "What is Boundary Value Analysis (BVA)?",
    "options": [
      "Testing network perimeter firewalls",
      "A testing technique focusing on values at the boundaries of equivalence partitions (e.g. min, min+1, nominal, max-1, max), where bugs cluster most frequently",
      "Measuring hard drive sector boundaries",
      "Testing code boundary markers in syntax"
    ],
    "correctAnswer": 1,
    "explanation": "Experience shows that the majority of software bugs occur at boundary edges (off-by-one errors). BVA rigorously tests minimum, just above minimum, nominal, just below maximum, and maximum values."
  },
  {
    "id": "se_tf_5",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Medium",
    "question": "What is the difference between Statement Coverage and Branch Coverage in White-Box testing?",
    "options": [
      "They are completely equivalent metrics",
      "Statement coverage measures whether every executable line was executed; Branch coverage verifies whether every decision outcome (both True and False branches of every condition) was exercised",
      "Statement coverage requires 100% test success",
      "Branch coverage only tests switch statements"
    ],
    "correctAnswer": 1,
    "explanation": "Statement coverage merely ensures every line runs at least once. Branch coverage is stricter, requiring that both the TRUE and FALSE outcomes of every logical decision branch are traversed by test suites."
  },
  {
    "id": "se_tf_6",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Medium",
    "question": "What is the distinction between an Error, a Fault (Bug), and a Failure?",
    "options": [
      "They are interchangeable synonyms",
      "An Error is a human mistake made by a programmer; a Fault/Bug is the flaw in the code caused by that error; a Failure is the observable incorrect behavior during software execution",
      "A Failure causes an Error, which creates a Fault",
      "Faults happen in production only"
    ],
    "correctAnswer": 1,
    "explanation": "Standard software engineering definitions: A human makes an Error (mental slip). This introduces a Fault / Bug (defect in code). When the faulty code executes in an operational environment, a system Failure occurs."
  },
  {
    "id": "se_tf_7",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Medium",
    "question": "What is \"Mutation Testing\" in software verification?",
    "options": [
      "Testing software after changing operating systems",
      "A technique where small deliberate bugs (mutants) are introduced into source code to evaluate if existing test suites detect and \"kill\" the mutants",
      "Testing genetic AI algorithms",
      "Running tests under fluctuating CPU voltages"
    ],
    "correctAnswer": 1,
    "explanation": "Mutation testing measures test suite quality: fault-injection tools insert minor modifications (mutations) into source code. If a test suite fails when a mutant is introduced, the mutant is \"killed\", proving test suite effectiveness."
  },
  {
    "id": "se_tf_8",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Medium",
    "question": "What is \"Sanity Testing\" versus \"Smoke Testing\"?",
    "options": [
      "Smoke testing tests hardware; Sanity tests software",
      "Smoke testing is a broad, shallow build-verification test to ensure the application is stable enough for deeper testing; Sanity testing is a focused test checking specific bug fixes or features",
      "Sanity testing is automated; Smoke is always manual",
      "There is no difference"
    ],
    "correctAnswer": 1,
    "explanation": "Smoke testing (\"build acceptance test\") verifies basic functionality broadly to reject broken builds immediately. Sanity testing is a targeted subset performed after a bug fix or minor build to quickly verify the fix works before running full regression."
  },
  {
    "id": "se_tf_9",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Hard",
    "question": "What is Modified Condition/Decision Coverage (MC/DC) and where is it mandated?",
    "options": [
      "A metric that checks UI CSS styling",
      "A rigorous white-box testing standard proving that each condition in a boolean decision independently affects the decision outcome, mandated in safety-critical systems (like DO-178C for avionics)",
      "A metric measuring Scrum team story points",
      "A black-box fuzz testing tool"
    ],
    "correctAnswer": 1,
    "explanation": "MC/DC requires showing that each condition in a complex boolean expression (e.g. `(A OR B) AND C`) can independently influence the overall outcome while holding all other conditions constant, required in safety-critical avionic and automotive software."
  },
  {
    "id": "se_tf_10",
    "topic": "Software Testing Fundamentals",
    "difficulty": "Hard",
    "question": "Why is exhaustive software testing theoretically and practically impossible?",
    "options": [
      "Because computers lack sufficient RAM",
      "Due to combinatorial explosion of inputs, complex state permutations, execution timing, and path combinations that require astronomical numbers of test cases",
      "Because modern programming languages prohibit more than 1000 unit tests",
      "Because compilers eliminate edge cases"
    ],
    "correctAnswer": 1,
    "explanation": "Exhaustive testing (testing every possible input combination and execution path) is impossible because the input domain and state space of even simple programs are virtually infinite, necessitating risk-based sampling and partitioning."
  },
  {
    "id": "se_tl_1",
    "topic": "Testing Levels",
    "difficulty": "Easy",
    "question": "What are the four recognized levels of software testing in ascending order?",
    "options": [
      "System, Unit, Integration, Acceptance",
      "Unit Testing, Integration Testing, System Testing, Acceptance Testing",
      "Manual, Automated, Performance, Security",
      "Alpha, Beta, Gamma, Delta"
    ],
    "correctAnswer": 1,
    "explanation": "The standard four testing levels proceed from small to large: 1) Unit Testing (individual methods/classes), 2) Integration Testing (module interactions), 3) System Testing (end-to-end complete system), 4) Acceptance Testing (user validation)."
  },
  {
    "id": "se_tl_2",
    "topic": "Testing Levels",
    "difficulty": "Easy",
    "question": "What is the primary focus of Unit Testing?",
    "options": [
      "Validating end-to-end network latency",
      "Testing individual isolated units, functions, or methods in isolation from external dependencies",
      "Testing user checkout workflows",
      "Testing database disaster recovery"
    ],
    "correctAnswer": 1,
    "explanation": "Unit testing isolates and tests the smallest verifiable pieces of source code (individual functions, methods, classes) using test doubles (mocks/stubs) to remove external environmental noise."
  },
  {
    "id": "se_tl_3",
    "topic": "Testing Levels",
    "difficulty": "Easy",
    "question": "What is \"Regression Testing\"?",
    "options": [
      "Testing software on older hardware versions",
      "Re-running existing test suites after code changes or bug fixes to verify that previously working functionality has not been inadvertently broken",
      "Testing software written in ancient languages",
      "Testing before the requirements phase begins"
    ],
    "correctAnswer": 1,
    "explanation": "Regression testing ensures that new features, performance optimizations, or bug fixes do not introduce regressions (collateral damage or broken existing behaviors) into the codebase."
  },
  {
    "id": "se_tl_4",
    "topic": "Testing Levels",
    "difficulty": "Easy",
    "question": "What is the difference between Alpha Testing and Beta Testing?",
    "options": [
      "Alpha testing uses C++; Beta testing uses Java",
      "Alpha testing is conducted by internal employees/developers in a controlled test environment; Beta testing is conducted by real external users in their actual production environments",
      "Alpha is performed after release; Beta before coding",
      "Beta testing requires source code access"
    ],
    "correctAnswer": 1,
    "explanation": "Alpha testing is internal acceptance testing simulated in-house. Beta testing releases the near-final product to a sample group of real external end users to capture real-world operational feedback and edge cases."
  },
  {
    "id": "se_tl_5",
    "topic": "Testing Levels",
    "difficulty": "Medium",
    "question": "What is the difference between \"Stubs\" and \"Drivers\" in top-down vs bottom-up integration testing?",
    "options": [
      "Stubs are hardware; Drivers are software",
      "In Top-Down integration, Stubs simulate lower-level modules not yet written; in Bottom-Up integration, Drivers simulate higher-level calling modules to trigger the modules under test",
      "Drivers simulate databases only",
      "Stubs are used only in production"
    ],
    "correctAnswer": 1,
    "explanation": "Top-down integration builds high-level logic first, using Stubs (dummy modules) to mock incomplete lower-level dependencies. Bottom-up integration builds low-level components first, using Drivers to invoke and pass test data to them."
  },
  {
    "id": "se_tl_6",
    "topic": "Testing Levels",
    "difficulty": "Medium",
    "question": "What is the primary purpose of End-to-End (E2E) System Testing?",
    "options": [
      "To check code comments and formatting",
      "To validate the complete, integrated software flow from the user interface down through APIs, background jobs, and databases simulating real user scenarios",
      "To benchmark CPU instruction cycle times",
      "To replace unit tests completely"
    ],
    "correctAnswer": 1,
    "explanation": "E2E testing treats the entire application stack as a whole, driving realistic user journeys (e.g. signup -> search -> checkout -> email notification) to ensure all subsystems cooperate properly."
  },
  {
    "id": "se_tl_7",
    "topic": "Testing Levels",
    "difficulty": "Medium",
    "question": "What is the \"Test Pyramid\" concept proposed by Mike Cohn?",
    "options": [
      "A structure where most tests should be manual tests",
      "A recommended testing portfolio with a broad base of fast, cheap Unit Tests, a middle layer of Integration/Service Tests, and a small apex of slow, expensive UI/E2E Tests",
      "A pyramid with 90% E2E tests at the bottom",
      "A diagram showing developer salaries"
    ],
    "correctAnswer": 1,
    "explanation": "The Test Pyramid advocates investing heavily in fast, isolated, reliable Unit Tests at the base, moderate Integration tests in the middle, and minimal brittle, high-maintenance end-to-end UI tests at the top."
  },
  {
    "id": "se_tl_8",
    "topic": "Testing Levels",
    "difficulty": "Medium",
    "question": "What is User Acceptance Testing (UAT)?",
    "options": [
      "Testing whether developers accept the project architecture",
      "The final phase where business stakeholders or clients validate that the completed software meets agreed business contracts and operational workflows before go-live",
      "Unit testing user models in code",
      "Testing website uptime with ping requests"
    ],
    "correctAnswer": 1,
    "explanation": "UAT is performed by real business users/clients against actual business criteria to formally sign off and authorize release into production."
  },
  {
    "id": "se_tl_9",
    "topic": "Testing Levels",
    "difficulty": "Hard",
    "question": "What is \"Contract Testing\" in microservice architectures?",
    "options": [
      "Testing software licensing agreements",
      "A technique that verifies microservices communicate correctly by ensuring that provider services fulfill the explicit API expectations (contracts) defined by consumer services (e.g. using Pact)",
      "Testing database connection strings",
      "Verifying legal terms of service"
    ],
    "correctAnswer": 1,
    "explanation": "Consumer-Driven Contract Testing allows microservices teams to test API compatibility independently without spinning up complex, brittle end-to-end environments, by verifying API payloads against recorded JSON contracts."
  },
  {
    "id": "se_tl_10",
    "topic": "Testing Levels",
    "difficulty": "Hard",
    "question": "What is \"Chaos Engineering\" in high-availability systems testing?",
    "options": [
      "Developers writing code without rules",
      "The discipline of deliberately injecting failures (e.g. killing servers, severing network links, adding latency) into production systems to test and prove resilience (e.g. Chaos Monkey)",
      "Running tests with corrupted RAM",
      "Randomly deleting production databases without backup"
    ],
    "correctAnswer": 1,
    "explanation": "Pioneered by Netflix, Chaos Engineering proactively introduces turbulent conditions (terminating instances, injecting latency) in production to identify weaknesses before they trigger real outages."
  },
  {
    "id": "se_tdd_1",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Easy",
    "question": "What is the core cycle of Test-Driven Development (TDD)?",
    "options": [
      "Code -> Test -> Deploy",
      "Red (Write failing test) -> Green (Write minimal code to pass) -> Refactor (Clean up code)",
      "Design -> Code -> Document",
      "Plan -> Estimate -> Code"
    ],
    "correctAnswer": 1,
    "explanation": "The TDD cycle is: 1) Red: write a unit test that fails initially; 2) Green: implement the minimal code required to pass; 3) Refactor: eliminate duplication and clean design while keeping tests green."
  },
  {
    "id": "se_tdd_2",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Easy",
    "question": "What is the primary syntax structure used to write BDD (Behavior-Driven Development) scenarios?",
    "options": [
      "For / While / Do",
      "Given (Initial context) -> When (Event/Action occurs) -> Then (Observable outcome expected)",
      "Try / Catch / Finally",
      "Input / Process / Output"
    ],
    "correctAnswer": 1,
    "explanation": "BDD scenarios use Gherkin syntax: \"Given [context/precondition], When [action occurs], Then [expected outcome]\"."
  },
  {
    "id": "se_tdd_3",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Easy",
    "question": "What popular tool is widely used to execute Gherkin-based BDD specifications?",
    "options": [
      "Cucumber",
      "Docker",
      "Jenkins",
      "Kubernetes"
    ],
    "correctAnswer": 0,
    "explanation": "Cucumber is the standard BDD framework that parses plain-text Gherkin specifications and executes matching automation glue code across languages."
  },
  {
    "id": "se_tdd_4",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Easy",
    "question": "What is a \"Mock\" object in automated unit testing?",
    "options": [
      "A joke class written for fun",
      "A test double pre-programmed with expectations about which calls/methods it should receive and verified during test teardown",
      "A copy of the production database",
      "A broken unit test"
    ],
    "correctAnswer": 1,
    "explanation": "Mocks are test doubles that register expectations (which methods should be called, with what arguments, how many times) and fail the test if those expectations are violated."
  },
  {
    "id": "se_tdd_5",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Medium",
    "question": "What is the difference between a \"Stub\" and a \"Mock\"?",
    "options": [
      "Stubs are for C; Mocks are for Java",
      "A Stub provides canned, predefined return data to calls made during the test; a Mock also verifies that specific expected method calls actually took place with specific parameters",
      "Stubs are run in CI/CD; Mocks are manual",
      "A Stub connects to real databases"
    ],
    "correctAnswer": 1,
    "explanation": "Stubs provide canned answers to calls made during testing without inspecting behavior. Mocks verify behavioral interactions, asserting that specific methods were invoked with specific parameters."
  },
  {
    "id": "se_tdd_6",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Medium",
    "question": "What is the principal benefit of practicing TDD beyond bug reduction?",
    "options": [
      "It eliminates the need for software architecture",
      "It forces modular, loosely coupled, and highly testable design because code is written strictly to satisfy discrete testable interfaces",
      "It makes code run twice as fast",
      "It doubles compiler efficiency"
    ],
    "correctAnswer": 1,
    "explanation": "TDD is as much a design tool as a testing tool: writing tests first forces developers to think from the consumer's perspective, naturally producing modular, decoupled, and easily testable components."
  },
  {
    "id": "se_tdd_7",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Medium",
    "question": "What is a \"Flaky Test\" in automated testing pipelines and why is it dangerous?",
    "options": [
      "A test that tests floating-point numbers",
      "A test that intermittently passes or fails without any code changes (due to timing, concurrency, or environmental issues), eroding developer trust in test suites",
      "A test that takes less than 1 ms to run",
      "A test written in a dynamic language"
    ],
    "correctAnswer": 1,
    "explanation": "Flaky tests yield non-deterministic results due to race conditions, network latency, or shared test state. They are dangerous because developers learn to ignore test failures, eventually letting real production bugs slip through."
  },
  {
    "id": "se_tdd_8",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Medium",
    "question": "How does BDD improve collaboration between technical and non-technical stakeholders?",
    "options": [
      "By teaching business analysts how to code C++",
      "By expressing software requirements and acceptance criteria in plain, human-readable domain language (Given/When/Then) understandable by business, developers, and QA alike",
      "By eliminating developers from the requirement process",
      "By generating automated PowerPoint slides"
    ],
    "correctAnswer": 1,
    "explanation": "BDD bridges the communication gap by using natural ubiquitous language that business analysts, product owners, developers, and testers can review together, creating living executable documentation."
  },
  {
    "id": "se_tdd_9",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Hard",
    "question": "In automated testing, what does the principle \"Test Behavior, Not Implementation Details\" mean?",
    "options": [
      "Tests should only assert private variable values",
      "Tests should verify the public inputs and observable outputs/side effects of a system rather than asserting internal private methods or variables, allowing internal refactoring without breaking tests",
      "Tests should ignore edge cases",
      "Tests should never use assertions"
    ],
    "correctAnswer": 1,
    "explanation": "Testing implementation details binds tests tightly to internal private mechanics; renaming an internal helper breaks the test even if the feature works. Testing observable behavior allows fearless code refactoring."
  },
  {
    "id": "se_tdd_10",
    "topic": "Test Automation & TDD vs BDD",
    "difficulty": "Hard",
    "question": "What is \"Property-Based Testing\" (e.g. QuickCheck, Hypothesis)?",
    "options": [
      "Testing CSS properties of HTML elements",
      "A testing paradigm where developers specify universal invariants (properties) that must hold true, and the framework generates hundreds of randomized edge-case inputs to find counterexamples",
      "Testing database schema properties only",
      "Testing code ownership properties"
    ],
    "correctAnswer": 1,
    "explanation": "Unlike example-based tests with hand-picked inputs, property-based testing tests universal truths (e.g., `reverse(reverse(list)) == list`). The engine automatically throws hundreds of randomized edge cases (empty strings, huge numbers) to expose flaws."
  },
  {
    "id": "se_maint_1",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Easy",
    "question": "What are the four classical categories of software maintenance?",
    "options": [
      "Alpha, Beta, Release, Patch",
      "Corrective, Adaptive, Perfective, and Preventive maintenance",
      "Frontend, Backend, Database, Cloud",
      "Static, Dynamic, Continuous, Discrete"
    ],
    "correctAnswer": 1,
    "explanation": "The 4 types of maintenance are: Corrective (fixing reported bugs), Adaptive (adapting to new environments/OS), Perfective (enhancing performance or features), and Preventive (refactoring to prevent future failures)."
  },
  {
    "id": "se_maint_2",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Easy",
    "question": "What is the definition of \"Code Refactoring\"?",
    "options": [
      "Adding new features to a codebase",
      "Restructuring existing computer code without changing its external observable behavior to improve internal non-functional attributes (readability, maintainability, simplicity)",
      "Fixing critical security bugs in production",
      "Rewriting code in another programming language"
    ],
    "correctAnswer": 1,
    "explanation": "Martin Fowler defines refactoring as the disciplined process of restructuring existing code, altering its internal structure without changing its external functional behavior, to make it easier to understand and maintain."
  },
  {
    "id": "se_maint_3",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Easy",
    "question": "What does the term \"Technical Debt\" describe?",
    "options": [
      "The monetary cost of software licenses",
      "The implied future cost of additional rework and maintenance caused by choosing an easy, expedience-driven solution now instead of a better architectural approach",
      "Outstanding invoices owed to cloud providers",
      "The salary paid to developers"
    ],
    "correctAnswer": 1,
    "explanation": "Coined by Ward Cunningham, technical debt is a financial metaphor: taking shortcuts to ship faster incurs debt. Just like financial debt, it accumulates \"interest\" in the form of slowed future development until paid down via refactoring."
  },
  {
    "id": "se_maint_4",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Easy",
    "question": "What is a \"Code Smell\"?",
    "options": [
      "A physical odor from hot servers",
      "A surface indication or symptom in source code that often indicates a deeper structural or design problem (e.g., Long Method, God Class, Duplicated Code)",
      "A syntax error caught by a compiler",
      "An expired SSL certificate"
    ],
    "correctAnswer": 1,
    "explanation": "A code smell is not an actual bug or syntax error; it is a recognizable architectural indicator in code suggesting decay or poor design that warrants refactoring before it breeds bugs."
  },
  {
    "id": "se_maint_5",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Medium",
    "question": "Which software maintenance category historically accounts for the largest proportion of total lifecycle maintenance costs?",
    "options": [
      "Corrective maintenance",
      "Adaptive maintenance",
      "Perfective maintenance (adding enhancements, optimizations, and requested changes)",
      "Preventive maintenance"
    ],
    "correctAnswer": 2,
    "explanation": "Studies (e.g. Lientz & Swanson) show that Perfective maintenance accounts for over 50% of maintenance effort, as businesses continually seek new capabilities and performance enhancements for successful systems."
  },
  {
    "id": "se_maint_6",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Medium",
    "question": "What is the \"God Object\" / \"God Class\" anti-pattern?",
    "options": [
      "A class that never throws exceptions",
      "A monolithic class that knows too much or does too much, centralizing system logic and violating the Single Responsibility Principle",
      "A class that manages user authentication",
      "A design pattern created for databases"
    ],
    "correctAnswer": 1,
    "explanation": "A God Class accumulates excessive fields, methods, and responsibilities, turning other classes into passive data holders and making the codebase tightly coupled and fragile to change."
  },
  {
    "id": "se_maint_7",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Medium",
    "question": "What is \"Lehman's First Law of Software Evolution\" (Law of Continuing Change)?",
    "options": [
      "Software should be rewritten every 2 years",
      "An E-type software system must continually adapt to changes in its real-world operating environment, or it becomes progressively less satisfactory",
      "All software bugs will be discovered in 5 years",
      "Developers must change programming languages"
    ],
    "correctAnswer": 1,
    "explanation": "Manny Lehman's First Law states that real-world software must continually adapt to user expectations and evolving business environments, or it will inevitably decline into obsolescence."
  },
  {
    "id": "se_maint_8",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Medium",
    "question": "What is \"Spaghetti Code\"?",
    "options": [
      "Code written by Italian programmers",
      "Unstructured, tangled source code with complex control flow, confusing jumps, and tight coupling, making maintenance extremely difficult",
      "Optimized assembly code",
      "Code formatting rules in Python"
    ],
    "correctAnswer": 1,
    "explanation": "Spaghetti code lacks architectural structure, featuring tangled control flows (like excessive GOTO statements, deeply nested conditionals, and circular dependencies) that resist modular reasoning."
  },
  {
    "id": "se_maint_9",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Hard",
    "question": "What is \"Software Rot\" (Code Decay) and what causes it?",
    "options": [
      "Physical degradation of hard drives over time",
      "The slow deterioration of software performance and responsiveness over time caused by uncoordinated patches, changing operating environments, and accumulated technical debt",
      "Compiler bitrot caused by cosmic rays",
      "Deprecation of HTML standards"
    ],
    "correctAnswer": 1,
    "explanation": "Software does not physically decay, but \"software rot\" occurs when accumulated patches, shifting dependencies, unaligned architectural edits, and outdated libraries gradually degrade software stability and maintainability."
  },
  {
    "id": "se_maint_10",
    "topic": "Software Maintenance, Refactoring & Technical Debt",
    "difficulty": "Hard",
    "question": "What is the \"Boy Scout Rule\" in software engineering maintenance?",
    "options": [
      "Always wear a uniform during code reviews",
      "Always leave the code cleaner than you found it (refactor small blemishes whenever touching a file)",
      "Never change code written by senior developers",
      "Always write tests in C++"
    ],
    "correctAnswer": 1,
    "explanation": "Popularized by Uncle Bob (Robert C. Martin), the Boy Scout Rule states: \"Always check code in cleaner than when you checked it out.\" Gradual, steady micro-refactorings keep codebases healthy and prevent technical debt buildup."
  },
  {
    "id": "se_met_1",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Easy",
    "question": "What does Cyclomatic Complexity measure in a software module?",
    "options": [
      "The number of lines of code in a file",
      "The number of linearly independent execution paths through a program's source code",
      "The total memory consumed by variables",
      "The compilation time in seconds"
    ],
    "correctAnswer": 1,
    "explanation": "Developed by Thomas McCabe, Cyclomatic Complexity measures the number of decision points (if/else, loops, switch cases) plus 1, indicating the minimum number of test cases required for full branch coverage."
  },
  {
    "id": "se_met_2",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Easy",
    "question": "What is the mathematical formula for McCabe's Cyclomatic Complexity V(G) given a control flow graph with E edges, N nodes, and P connected components?",
    "options": [
      "V(G) = E + N - P",
      "V(G) = E - N + 2P",
      "V(G) = N - E + P",
      "V(G) = E * N / P"
    ],
    "correctAnswer": 1,
    "explanation": "In McCabe's graph theory formula: V(G) = E - N + 2P, where E is the number of edges, N is the number of nodes, and P is the number of connected components (usually P = 1 for a single method, yielding E - N + 2)."
  },
  {
    "id": "se_met_3",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Easy",
    "question": "What is \"Defect Density\" metric in software quality assurance?",
    "options": [
      "The weight of computer bugs in grams",
      "The number of confirmed defects identified in a software component divided by the size of that component (typically defects per KLOC - thousand lines of code)",
      "The speed at which bugs are resolved",
      "The number of QA engineers per developer"
    ],
    "correctAnswer": 1,
    "explanation": "Defect Density = (Total Defects Found) / (Size in KLOC or Function Points), providing a standardized metric to compare code quality across modules of varying sizes."
  },
  {
    "id": "se_met_4",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Easy",
    "question": "What is the ideal relationship between Cohesion and Coupling in well-engineered software?",
    "options": [
      "Low Cohesion and High Coupling",
      "High Cohesion and Low Coupling",
      "Low Cohesion and Low Coupling",
      "High Cohesion and High Coupling"
    ],
    "correctAnswer": 1,
    "explanation": "High Cohesion (elements within a module belong together and execute a single focused purpose) combined with Low Coupling (minimal dependencies between different modules) is the hallmark of robust software architecture."
  },
  {
    "id": "se_met_5",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Medium",
    "question": "In Object-Oriented metrics (Chidamber & Kemerer), what does CBO (Coupling Between Objects) measure?",
    "options": [
      "The number of lines of comments in a class",
      "The number of other classes to which a given class is coupled/dependent upon",
      "The number of sub-classes inheriting from a class",
      "The depth of the inheritance tree"
    ],
    "correctAnswer": 1,
    "explanation": "CBO counts the number of other classes to which a class is coupled. High CBO impedes modularity, reduces class reusability, and increases the likelihood that changes in one class will ripple to others."
  },
  {
    "id": "se_met_6",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Medium",
    "question": "What does DIT (Depth of Inheritance Tree) measure and why is excessive DIT dangerous?",
    "options": [
      "The number of folders in a directory",
      "The maximum length from the class to the root class; excessively deep trees increase complexity, make understanding inherited methods difficult, and violate LSP",
      "The number of hard disk partitions",
      "The number of interfaces implemented"
    ],
    "correctAnswer": 1,
    "explanation": "DIT measures how many ancestor classes exist. Excessive DIT makes predicting class behavior difficult, complicates testing, and creates fragile base class hierarchies where superclass edits break deep subclasses."
  },
  {
    "id": "se_met_7",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Medium",
    "question": "What do Halstead's Software Science metrics use as their fundamental building blocks?",
    "options": [
      "CPU clock cycles and RAM cache lines",
      "Counts of unique and total operators and operands present in source code",
      "Story points and sprint velocity",
      "Git pull request counts"
    ],
    "correctAnswer": 1,
    "explanation": "Maurice Halstead's metrics measure program length, vocabulary, volume, difficulty, and effort based on counts of distinct operators (n1), distinct operands (n2), total operators (N1), and total operands (N2)."
  },
  {
    "id": "se_met_8",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Medium",
    "question": "What does a Cyclomatic Complexity score above 20 generally indicate for a single function?",
    "options": [
      "The code is well-structured and optimal",
      "The function has high risk, complex branching logic, is hard to test, and should be refactored into smaller sub-methods",
      "The function cannot be compiled",
      "The function uses too many comments"
    ],
    "correctAnswer": 1,
    "explanation": "A cyclomatic complexity of 1-10 is considered low risk and simple. 11-20 is moderate risk. Values over 20 indicate high complexity and poor maintainability that should be refactored into smaller, modular functions."
  },
  {
    "id": "se_met_9",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Hard",
    "question": "What is the Maintainability Index (MI) and what factors contribute to its calculation?",
    "options": [
      "A metric tracking hard disk life expectancy",
      "A composite metric (typically 0 to 100) computed from Halstead Volume, Cyclomatic Complexity, Lines of Code (LOC), and percentage of comment lines",
      "A developer satisfaction rating",
      "A network bandwidth ratio"
    ],
    "correctAnswer": 1,
    "explanation": "The Maintainability Index calculates a score from 0-100 indicating codebase maintainability, combining Halstead Volume (HV), Cyclomatic Complexity (CC), Lines of Code (LOC), and comment density."
  },
  {
    "id": "se_met_10",
    "topic": "Software Metrics & Quality Assurance",
    "difficulty": "Hard",
    "question": "In Robert C. Martin's package metrics, what does the \"Instability\" (I) metric represent?",
    "options": [
      "The probability of server crashes",
      "The ratio of efferent coupling (outgoing dependencies) to total coupling: I = Ce / (Ca + Ce), where I=0 is maximally stable and I=1 is maximally instable",
      "The number of memory leaks",
      "The frequency of code deployments"
    ],
    "correctAnswer": 1,
    "explanation": "Instability I = Ce / (Ca + Ce), where Ca is afferent coupling (incoming dependencies) and Ce is efferent coupling (outgoing dependencies). A package with Ce=0 (I=0) is maximally stable because many depend on it and it depends on none."
  },
  {
    "id": "se_est_1",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Easy",
    "question": "What does COCOMO stand for in software project estimation?",
    "options": [
      "Continuous Code Monitoring Model",
      "Constructive Cost Model",
      "Coordinated Computing Module",
      "Common Object Component Model"
    ],
    "correctAnswer": 1,
    "explanation": "COCOMO (Constructive Cost Model), formulated by Barry Boehm, is an algorithmic cost estimation model that predicts effort, cost, and schedule based on project size (KLOC)."
  },
  {
    "id": "se_est_2",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Easy",
    "question": "What are the three project modes defined in Basic COCOMO?",
    "options": [
      "Alpha, Beta, Production",
      "Organic, Semi-Detached, and Embedded",
      "Small, Medium, Enterprise",
      "Waterfall, Agile, Hybrid"
    ],
    "correctAnswer": 1,
    "explanation": "Basic COCOMO defines 3 modes: Organic (small, familiar teams, relaxed constraints), Semi-Detached (intermediate team and requirements), and Embedded (tight hardware/software constraints and strict regulations)."
  },
  {
    "id": "se_est_3",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Easy",
    "question": "What unit is commonly used to express development effort in software engineering estimation models?",
    "options": [
      "Kilowatt-hours",
      "Person-Months (or Man-Months)",
      "Gigabytes per second",
      "Lines of code per day"
    ],
    "correctAnswer": 1,
    "explanation": "Effort is traditionally measured in Person-Months (the effort of one person working productively for one month), calculated as Effort = a * (KLOC)^b."
  },
  {
    "id": "se_est_4",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Easy",
    "question": "What is \"Planning Poker\" in Agile estimation?",
    "options": [
      "A card game played during company breaks",
      "A consensus-based estimation technique using Fibonacci-like cards to estimate relative user story points without anchoring bias",
      "A gambling software app",
      "A method to estimate database table sizes"
    ],
    "correctAnswer": 1,
    "explanation": "Planning Poker uses playing cards with modified Fibonacci numbers (1, 2, 3, 5, 8, 13...). Team members reveal their estimates simultaneously, exposing divergent assumptions without anchoring to loud opinions."
  },
  {
    "id": "se_est_5",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Medium",
    "question": "What is the core premise of Function Point Analysis (FPA) compared to LOC-based estimation?",
    "options": [
      "FPA counts the number of C++ functions in source code",
      "FPA measures system size from the user perspective based on functional capabilities (inputs, outputs, inquiries, internal files, external interfaces) independent of programming language",
      "FPA is only used for hardware projects",
      "FPA estimates server RAM consumption"
    ],
    "correctAnswer": 1,
    "explanation": "Allan Albrecht developed Function Point Analysis to evaluate project size based on business functionality delivered to users (external inputs, external outputs, external inquiries, internal logical files, external interface files), avoiding programming language bias."
  },
  {
    "id": "se_est_6",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Medium",
    "question": "In COCOMO II, how does estimation differ from the original 1981 COCOMO model?",
    "options": [
      "COCOMO II eliminates mathematical formulas",
      "COCOMO II provides three tailored sub-models for modern development: Application Composition, Early Design, and Post-Architecture, supporting reusable components and object-oriented paradigms",
      "COCOMO II is exclusively for waterfall projects",
      "COCOMO II only measures cloud costs"
    ],
    "correctAnswer": 1,
    "explanation": "COCOMO II updates Boehm's original model to reflect modern practices (COTS software, rapid application generators, object-oriented design) with sub-models reflecting evolving detail throughout the lifecycle."
  },
  {
    "id": "se_est_7",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Medium",
    "question": "What is the \"Cone of Uncertainty\" in software estimation?",
    "options": [
      "A weather forecasting radar for server rooms",
      "A concept showing that early project estimates have high variance (up to 4x over or under), which narrows progressively as architectural research and development proceed",
      "A visual representation of technical debt",
      "A diagram of database indexes"
    ],
    "correctAnswer": 1,
    "explanation": "Steve McConnell's Cone of Uncertainty illustrates that at initial project inception, estimates can be off by a factor of 4x due to unknowns. As decisions are made and requirements solidify, variance shrinks toward 1.0x."
  },
  {
    "id": "se_est_8",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Medium",
    "question": "What is Parkinson's Law in the context of software project schedules?",
    "options": [
      "Bugs multiply exponentially when developers sleep",
      "\"Work expands so as to fill the time available for its completion\"",
      "Software will always exceed hardware memory",
      "Refactoring increases project cost by 50%"
    ],
    "correctAnswer": 1,
    "explanation": "Parkinson's Law states: \"Work expands so as to fill the time available for its completion.\" If a two-week task is allotted four weeks, developers will overcomplicate or delay it until the entire four weeks are consumed."
  },
  {
    "id": "se_est_9",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Hard",
    "question": "What is Brooks' Law from \"The Mythical Man-Month\"?",
    "options": [
      "Writing code in assembly doubles developer productivity",
      "\"Adding manpower to a late software project makes it later\"",
      "Software estimates should always be multiplied by pi",
      "A project manager can replace 5 programmers"
    ],
    "correctAnswer": 1,
    "explanation": "Fred Brooks observed that adding new people to an already delayed project creates an onboarding burden on existing senior developers and quadratically increases communication overhead (n*(n-1)/2 channels), delaying the project further."
  },
  {
    "id": "se_est_10",
    "topic": "Software Project Estimation & Models",
    "difficulty": "Hard",
    "question": "In three-point PERT estimation, what is the formula used to calculate the Expected Duration (E)?",
    "options": [
      "E = (Optimistic + Pessimistic) / 2",
      "E = (Optimistic + 4 * Most_Likely + Pessimistic) / 6",
      "E = (Optimistic + Most_Likely + Pessimistic) / 3",
      "E = Most_Likely * 1.5"
    ],
    "correctAnswer": 1,
    "explanation": "PERT weighted average formula: E = (O + 4M + P) / 6, where O is optimistic estimate, M is most likely estimate, and P is pessimistic estimate, providing a realistic probability distribution."
  },
  {
    "id": "se_devops_1",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Easy",
    "question": "What does the term \"DevOps\" primarily represent?",
    "options": [
      "A specific brand of cloud server",
      "A cultural and technical philosophy unifying Development (Dev) and IT Operations (Ops) to shorten the development lifecycle and deliver high-quality software continuously",
      "A programming language replacing Python",
      "A tool that automatically writes code"
    ],
    "correctAnswer": 1,
    "explanation": "DevOps is a collaborative culture, set of practices, and toolsets bridging developers and operations teams to automate and accelerate build, test, and release cycles safely."
  },
  {
    "id": "se_devops_2",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Easy",
    "question": "What is Continuous Integration (CI)?",
    "options": [
      "Merging all code once a year",
      "A practice where developers frequently merge code changes into a central repository, triggering automated builds and tests on every commit to detect errors early",
      "Running databases in the cloud",
      "Continuous monitoring of employee work hours"
    ],
    "correctAnswer": 1,
    "explanation": "In CI, developers commit code frequently to a shared trunk. Every commit triggers an automated build and test pipeline, providing immediate feedback on whether the commit broke any existing functionality."
  },
  {
    "id": "se_devops_3",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Easy",
    "question": "What is the difference between Continuous Delivery and Continuous Deployment?",
    "options": [
      "Continuous Delivery is manual; Continuous Deployment is automated",
      "In Continuous Delivery, every passing build is automatically packaged and staged so it is releasable to production at the click of a button; in Continuous Deployment, every passing build is deployed to production automatically without manual approval",
      "They are exact synonyms",
      "Continuous Delivery applies to mobile apps only"
    ],
    "correctAnswer": 1,
    "explanation": "Continuous Delivery ensures code is always in a deployable state and staging is automated, but requires a human business trigger to push to live production. Continuous Deployment deploys every validated build directly to production automatically."
  },
  {
    "id": "se_devops_4",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Easy",
    "question": "What is \"Infrastructure as Code\" (IaC)?",
    "options": [
      "Writing operating systems from scratch",
      "Managing and provisioning computing infrastructure (servers, networks, load balancers) through machine-readable definition files rather than manual hardware configuration",
      "Writing code inside computer BIOS",
      "Printing source code on paper"
    ],
    "correctAnswer": 1,
    "explanation": "IaC (e.g. Terraform, Ansible, CloudFormation) treats server and network configuration as software code: version-controlled, testable, repeatable, and automated."
  },
  {
    "id": "se_devops_5",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Medium",
    "question": "What is \"Blue-Green Deployment\"?",
    "options": [
      "Deploying servers in ocean containers",
      "A zero-downtime release technique using two identical production environments (Blue and Green): one serves live traffic while the new version is deployed and tested on the idle one, after which traffic is switched instantly via the router/load balancer",
      "Deploying only during daylight hours",
      "Color-coding server racks"
    ],
    "correctAnswer": 1,
    "explanation": "Blue-Green deployment runs two identical environments. While Blue serves live production traffic, the new release is deployed and verified on Green. Once verified, the load balancer switches traffic to Green. If an issue arises, immediate rollback to Blue is trivial."
  },
  {
    "id": "se_devops_6",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Medium",
    "question": "What is a \"Canary Deployment\"?",
    "options": [
      "Using birds to detect gas leaks in data centers",
      "Rolling out a new software version to a small subset of real users (e.g. 5%) first, monitoring error rates and performance before gradually expanding traffic to the entire user base",
      "Deploying exclusively to staging environments",
      "Deploying code on developer laptops"
    ],
    "correctAnswer": 1,
    "explanation": "Named after coal mine canaries: Canary releases route a small fraction of real production traffic to the new version. Telemetry and error rates are compared against the stable baseline before rolling out to 100% of users."
  },
  {
    "id": "se_devops_7",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Medium",
    "question": "What is the purpose of \"Feature Toggles\" (Feature Flags) in continuous delivery?",
    "options": [
      "To turn off servers during maintenance",
      "To enable or disable features at runtime in production via configuration without redeploying code, decoupling code deployment from feature release",
      "To toggle dark mode in the IDE",
      "To turn off unit tests in CI"
    ],
    "correctAnswer": 1,
    "explanation": "Feature flags allow developers to continuously merge and deploy incomplete or dark-launched features to production while keeping them dormant for end users until ready, mitigating deployment risk."
  },
  {
    "id": "se_devops_8",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Medium",
    "question": "What are the four \"DORA Metrics\" used to measure high-performing engineering teams?",
    "options": [
      "Lines of code, bugs logged, hours worked, coffee consumed",
      "Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service (MTTR)",
      "CPU usage, memory leaks, disk IO, network latency",
      "Sprint velocity, story points, burndown rate, bug count"
    ],
    "correctAnswer": 1,
    "explanation": "DevOps Research and Assessment (DORA) identified 4 key performance metrics: Deployment Frequency (speed), Lead Time for Changes (speed), Change Failure Rate (stability), and Mean Time to Restore Service (stability)."
  },
  {
    "id": "se_devops_9",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Hard",
    "question": "What is \"GitOps\"?",
    "options": [
      "Using Git exclusively through a GUI client",
      "An operational framework where Git repositories serve as the single source of truth for declarative infrastructure and applications, using automated agents (e.g. ArgoCD) to reconcile desired and actual state",
      "Hosting Git on private USB drives",
      "A Git commit convention for bug fixes"
    ],
    "correctAnswer": 1,
    "explanation": "In GitOps, system state is defined declaratively in Git. Software agents (like ArgoCD or Flux) continuously monitor the Git repo and automatically sync Kubernetes clusters to match the Git state, preventing configuration drift."
  },
  {
    "id": "se_devops_10",
    "topic": "DevOps Culture, CI/CD & Release Management",
    "difficulty": "Hard",
    "question": "What is the role of \"Semantic Versioning\" (SemVer: MAJOR.MINOR.PATCH) in release management?",
    "options": [
      "To assign random numbers to builds",
      "To convey breaking change intent: MAJOR increments for breaking API changes, MINOR for backwards-compatible new features, and PATCH for backwards-compatible bug fixes",
      "To track developer employee IDs",
      "To calculate software price tags"
    ],
    "correctAnswer": 1,
    "explanation": "SemVer (X.Y.Z) provides standard semantic meaning: MAJOR version increments break backwards compatibility; MINOR increments add backwards-compatible features; PATCH increments provide backwards-compatible bug fixes."
  },
  {
    "id": "se_cr_1",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Easy",
    "question": "What is the primary objective of a peer Code Review?",
    "options": [
      "To catch typos and format spaces manually",
      "To identify defects, improve code quality, ensure adherence to architectural standards, and share knowledge across team members",
      "To evaluate developer speed and assign grades",
      "To replace automated unit testing"
    ],
    "correctAnswer": 1,
    "explanation": "Code reviews inspect proposed changes to catch bugs early, ensure maintainability and security, verify architectural alignment, and foster collective codebase ownership and mentorship."
  },
  {
    "id": "se_cr_2",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Easy",
    "question": "What is \"Static Code Analysis\"?",
    "options": [
      "Analyzing code performance while it runs on servers",
      "Analyzing source code without executing it, checking for syntax violations, security vulnerabilities, anti-patterns, and style rules",
      "Reviewing paper printouts of code",
      "Measuring electrical voltages of CPU pins"
    ],
    "correctAnswer": 1,
    "explanation": "Static code analysis examines source code at rest (without runtime execution) using linters and AST analyzers (e.g. SonarQube, ESLint) to catch potential bugs, code smells, and security flaws automatically."
  },
  {
    "id": "se_cr_3",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Easy",
    "question": "What is a \"Linter\"?",
    "options": [
      "A compiler optimization flag",
      "A static analysis tool that flags programming errors, bugs, stylistic errors, and suspicious constructs in source code (e.g. ESLint, Pylint)",
      "A tool that compresses source files",
      "A test runner for unit tests"
    ],
    "correctAnswer": 1,
    "explanation": "Linters parse code against predefined style guides and semantic rules, highlighting syntax problems, unreferenced variables, formatting inconsistencies, and common footguns before review."
  },
  {
    "id": "se_cr_4",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Easy",
    "question": "What is considered best practice regarding Pull Request (PR) size for effective code reviews?",
    "options": [
      "Submit 3,000 lines across 50 files so everything is in one review",
      "Keep PRs small and focused (typically under 200-400 lines) so reviewers can thoroughly review without review fatigue",
      "Never submit PRs; commit directly to main branch",
      "Combine 5 unrelated bug fixes into one single PR"
    ],
    "correctAnswer": 1,
    "explanation": "Studies demonstrate that reviewer effectiveness plummets when inspecting changes over 400 lines of code. Small, atomic PRs receive higher quality scrutiny, faster turnaround, and pose lower deployment risk."
  },
  {
    "id": "se_cr_5",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Medium",
    "question": "What is the difference between Static Analysis and Dynamic Analysis (e.g. Valgrind, Profilers)?",
    "options": [
      "Static analysis runs in the cloud; Dynamic runs on laptops",
      "Static analysis inspects code structure without execution; Dynamic analysis evaluates code behavior during execution, monitoring memory leaks, concurrency races, and runtime performance",
      "Static analysis catches all memory leaks; Dynamic does not",
      "Dynamic analysis checks syntax only"
    ],
    "correctAnswer": 1,
    "explanation": "Static analysis checks source files without running them (finding pattern flaws). Dynamic analysis runs instrumented binaries (finding runtime memory leaks, pointer bugs, lock contention, and cache thrashing)."
  },
  {
    "id": "se_cr_6",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Medium",
    "question": "What is \"Fagan Inspection\" in formal software engineering?",
    "options": [
      "An automated GitHub Action bot",
      "A formal, highly structured team review process involving defined roles (Moderator, Author, Reader, Tester) to systematically inspect documents or code line by line for defects",
      "A technique for writing fast SQL queries",
      "A unit testing library in C++"
    ],
    "correctAnswer": 1,
    "explanation": "Michael Fagan developed this structured inspection method with strict entrance/exit criteria, formal roles, and sequential steps (Planning, Overview, Preparation, Inspection Meeting, Rework, Follow-up)."
  },
  {
    "id": "se_cr_7",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Medium",
    "question": "What is a \"SAST\" (Static Application Security Testing) tool and how does it fit into CI/CD?",
    "options": [
      "A tool that attacks servers from the internet",
      "A security tool integrated into pipelines that analyzes source code for known security vulnerabilities (like SQL injection, XSS, insecure cryptography) before deployment",
      "A firewall hardware appliance",
      "An automated antivirus scanner for email"
    ],
    "correctAnswer": 1,
    "explanation": "SAST tools (e.g. Checkmarx, SonarQube, Snyk) scan repositories in the CI pipeline to uncover OWASP Top 10 vulnerabilities and hardcoded credentials before code is ever merged."
  },
  {
    "id": "se_cr_8",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Medium",
    "question": "What is an \"Egoless Programming\" mindset in code reviews?",
    "options": [
      "Writing code without declaring your name",
      "Separating one's personal self-worth and ego from the code one writes, viewing review critiques objectively as opportunities to improve the collective product rather than personal attacks",
      "Letting AI write all source code",
      "Never reviewing peers' code"
    ],
    "correctAnswer": 1,
    "explanation": "Gerald Weinberg's concept: \"You are not your code.\" A healthy review culture requires accepting that software engineering is collaborative; finding a defect in code is a positive contribution, not an insult to the author."
  },
  {
    "id": "se_cr_9",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Hard",
    "question": "What is \"Bikeshedding\" (Parkinson's Law of Triviality) in code reviews?",
    "options": [
      "Building server sheds for developer bicycles",
      "The tendency for reviewers to spend disproportionate time debating trivial, subjective details (like variable names or comma placement) while glossing over complex architectural decisions",
      "Ignoring code reviews for 3 weeks",
      "Automating styling using Prettier"
    ],
    "correctAnswer": 1,
    "explanation": "Bikeshedding occurs when reviewers focus passionately on trivial points anyone can have an opinion on (e.g., tabs vs spaces), while complex architectural flaws or concurrency race conditions pass without deep analysis."
  },
  {
    "id": "se_cr_10",
    "topic": "Code Review Best Practices & Static Analysis",
    "difficulty": "Hard",
    "question": "How does automated formatting (e.g. Prettier, Black, Clang-Format) combined with git pre-commit hooks elevate code review quality?",
    "options": [
      "It writes unit tests automatically",
      "It eliminates all stylistic debates and bikeshedding from code reviews, letting human reviewers focus purely on architectural soundness, business logic, security, and performance",
      "It doubles compiler execution speed",
      "It prevents merge conflicts permanently"
    ],
    "correctAnswer": 1,
    "explanation": "By enforcing automated formatting via git pre-commit hooks, zero reviewer mental energy is wasted on formatting, indentation, or syntax nuances, preserving human scrutiny for architecture, logic correctness, and edge-case handling."
  }
]
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.interviewPrepSE;
}
