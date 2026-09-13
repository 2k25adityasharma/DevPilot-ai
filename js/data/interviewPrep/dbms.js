/**
 * DevPilot-AI — Database Management Systems Question Bank
 * 140 authentic placement/interview MCQs across 14 topics.
 */

(function () {
  'use strict';

  const dbmsData = {
    category: "dbms",
    title: "Database Management Systems",
    description: "Relational architecture, ER modeling, normal forms, ACID transactions, concurrency, indexing, and B+ Trees.",
    icon: "database",
    totalTopics: 14,
    topics: [
  "DBMS Fundamentals",
  "ER Model",
  "Keys",
  "Functional Dependencies",
  "Normalization",
  "Transactions",
  "ACID Properties",
  "Concurrency Control",
  "Indexing",
  "B-Trees / B+ Trees",
  "Deadlocks",
  "Database Security",
  "SQL vs NoSQL",
  "Relational Databases"
],
    questions: [
  {
    "id": "dbms-fnd-01",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "easy",
    "question": "What is the major drawback of traditional file-processing systems compared to a Database Management System (DBMS)?",
    "options": [
      "Data redundancy, inconsistency, lack of concurrency control, and difficult ad-hoc querying",
      "File systems are slower at reading simple text files",
      "File systems cannot store images",
      "File systems require an internet connection"
    ],
    "correctAnswer": 0,
    "explanation": "File systems suffer from redundant data copies, lack of atomicity, concurrency collisions, and security fragmentation."
  },
  {
    "id": "dbms-fnd-02",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "easy",
    "question": "What are the three levels of the ANSI-SPARC database architecture?",
    "options": [
      "Physical (Internal) level, Conceptual (Logical) level, and External (View) level",
      "Frontend level, Backend level, and Network level",
      "User level, Admin level, and System level",
      "Client level, Server level, and Storage level"
    ],
    "correctAnswer": 0,
    "explanation": "The three-tier abstraction separates physical storage structures from logical schemas and individual user views."
  },
  {
    "id": "dbms-fnd-03",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "easy",
    "question": "What is 'Physical Data Independence'?",
    "options": [
      "The capacity to modify the internal physical storage schema without requiring changes to the conceptual or external schemas",
      "Storing database files on separate physical hard drives",
      "Disconnecting the database from power cables",
      "Backing up databases onto magnetic tapes"
    ],
    "correctAnswer": 0,
    "explanation": "Physical independence means modifying file indexing or disk storage does not alter application-level logical schemas."
  },
  {
    "id": "dbms-fnd-04",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "easy",
    "question": "What is a 'Database Schema'?",
    "options": [
      "The formal structural blueprint and skeleton design of the database, specifying tables, fields, constraints, and relationships",
      "The actual data stored in tables at a given moment",
      "A database backup file",
      "A user login password"
    ],
    "correctAnswer": 0,
    "explanation": "The schema is the invariant structure and metadata; a database instance represents the data at a specific point in time."
  },
  {
    "id": "dbms-fnd-05",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "medium",
    "question": "What is the difference between DDL and DML in SQL/DBMS?",
    "options": [
      "DDL (Data Definition Language) manages schema structure (CREATE, ALTER, DROP); DML (Data Manipulation Language) manages table records (SELECT, INSERT, UPDATE, DELETE)",
      "DDL is for queries; DML is for tables",
      "DDL runs in memory; DML runs on disk",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "DDL defines structural schemas; DML interacts with and mutates data records."
  },
  {
    "id": "dbms-fnd-06",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "medium",
    "question": "What is a 'Data Dictionary' (or System Catalog) in a DBMS?",
    "options": [
      "A repository of metadata containing schema definitions, table structures, constraints, user permissions, and index locations",
      "An English dictionary stored in a database",
      "A list of SQL keywords",
      "A dictionary data structure in Python"
    ],
    "correctAnswer": 0,
    "explanation": "The data dictionary is the internal metadata registry maintaining structural details about every object in the database."
  },
  {
    "id": "dbms-fnd-07",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "medium",
    "question": "What is 'Logical Data Independence'?",
    "options": [
      "The capacity to modify the conceptual logical schema (e.g. adding columns or tables) without altering existing external user views",
      "Moving the database to a different operating system",
      "Running queries without logical operators",
      "Separating SQL from NoSQL"
    ],
    "correctAnswer": 0,
    "explanation": "Logical data independence ensures that business schema additions do not break legacy view contracts for existing applications."
  },
  {
    "id": "dbms-fnd-08",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "medium",
    "question": "What is a Database Administrator (DBA)'s primary responsibility?",
    "options": [
      "Schema design authorization, performance tuning, data security, backup and disaster recovery, and capacity planning",
      "Writing CSS styling for user interfaces",
      "Manufacturing RAM modules",
      "Selling software licenses"
    ],
    "correctAnswer": 0,
    "explanation": "DBAs manage database availability, schema optimization, access governance, disaster recovery, and infrastructure scaling."
  },
  {
    "id": "dbms-fnd-09",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "hard",
    "question": "What is the purpose of a Database Buffer Pool (or Buffer Manager)?",
    "options": [
      "Caches database disk pages in RAM to reduce physical disk I/O reads and writes during transaction processing",
      "Buffers user emails before sending",
      "Stores print jobs sent to the database",
      "Prevents hackers from accessing database ports"
    ],
    "correctAnswer": 0,
    "explanation": "The buffer manager caches pages in memory and manages dirty page eviction strategies (e.g., LRU) to optimize I/O."
  },
  {
    "id": "dbms-fnd-10",
    "category": "dbms",
    "topic": "DBMS Fundamentals",
    "difficulty": "hard",
    "question": "What does the 'Write-Ahead Logging' (WAL) protocol mandate in DBMS architecture?",
    "options": [
      "Log records describing modifications must be written to stable non-volatile storage before the corresponding data page is flushed to disk",
      "Transactions must be logged after 24 hours",
      "Writing data only when RAM is empty",
      "Writing code before writing unit tests"
    ],
    "correctAnswer": 0,
    "explanation": "WAL guarantees Atomicity and Durability (ARIES recovery) by ensuring the log preserves redo/undo records before disk writes."
  },
  {
    "id": "dbms-erm-01",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "easy",
    "question": "What does an Entity represent in the Entity-Relationship (ER) model?",
    "options": [
      "A distinguishable real-world object or concept with attributes (e.g., an Employee, Course, or Product)",
      "A database query",
      "A foreign key constraint",
      "A SQL keyword"
    ],
    "correctAnswer": 0,
    "explanation": "An entity is any distinct real-world thing or concept that possesses properties (attributes) stored in a database."
  },
  {
    "id": "dbms-erm-02",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "easy",
    "question": "In standard Chen ER diagrams, what geometric shape represents an Entity?",
    "options": [
      "Rectangle",
      "Diamond",
      "Ellipse",
      "Triangle"
    ],
    "correctAnswer": 0,
    "explanation": "Rectangles denote entities, diamonds denote relationships, and ellipses denote attributes."
  },
  {
    "id": "dbms-erm-03",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "easy",
    "question": "What geometric shape represents a Relationship in a Chen ER diagram?",
    "options": [
      "Diamond",
      "Rectangle",
      "Circle",
      "Hexagon"
    ],
    "correctAnswer": 0,
    "explanation": "Diamonds symbolize relationships connecting entity sets."
  },
  {
    "id": "dbms-erm-04",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "easy",
    "question": "What is a 'Weak Entity' in an ER diagram?",
    "options": [
      "An entity that cannot be uniquely identified by its own attributes alone and depends on a strong entity for existence via an identifying relationship",
      "An entity with no columns",
      "An entity that was deleted",
      "An entity stored in temporary cache"
    ],
    "correctAnswer": 0,
    "explanation": "Weak entities (e.g. Dependent or OrderItem) require an owner entity's primary key plus a partial discriminator."
  },
  {
    "id": "dbms-erm-05",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "medium",
    "question": "How is a Weak Entity depicted in an ER diagram?",
    "options": [
      "Double Rectangle",
      "Dashed Ellipse",
      "Double Diamond",
      "Dotted Rectangle"
    ],
    "correctAnswer": 0,
    "explanation": "A double rectangle indicates a weak entity set; its identifying relationship is rendered as a double diamond."
  },
  {
    "id": "dbms-erm-06",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "medium",
    "question": "What is a 'Multivalued Attribute' and how is it represented in an ER diagram?",
    "options": [
      "An attribute that can have multiple values for a single entity instance (e.g., phone numbers); represented by a Double Ellipse",
      "An attribute that is calculated; represented by dashed ellipse",
      "A primary key attribute; represented by underlined text",
      "A foreign key attribute"
    ],
    "correctAnswer": 0,
    "explanation": "Multivalued attributes (like multiple email addresses) are depicted with concentric double ellipses."
  },
  {
    "id": "dbms-erm-07",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "medium",
    "question": "What is a 'Derived Attribute' in an ER diagram?",
    "options": [
      "An attribute whose value is computed from another stored attribute (e.g., Age derived from Date of Birth); represented by a Dashed Ellipse",
      "An attribute inherited from a parent class",
      "A column copied from another table",
      "A primary key"
    ],
    "correctAnswer": 0,
    "explanation": "Derived attributes are computed dynamically rather than stored physically, symbolized by dashed ellipses."
  },
  {
    "id": "dbms-erm-08",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "medium",
    "question": "What does 'Cardinality Ratio' specify in an ER relationship?",
    "options": [
      "The number of entity instances of one set that can be associated with entity instances of another set (e.g. 1:1, 1:N, M:N)",
      "The total number of columns in a table",
      "The number of primary keys in a schema",
      "The byte size of a row"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality expresses relationship constraints: one-to-one, one-to-many, or many-to-many."
  },
  {
    "id": "dbms-erm-09",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "hard",
    "question": "How is a Many-to-Many (M:N) relationship between two entities represented when converted into a Relational Schema?",
    "options": [
      "It requires creating a new associative table (junction table) containing foreign keys referencing both participating entities",
      "Adding a foreign key column to only one table",
      "Merging both entities into a single table",
      "It cannot be represented in relational databases"
    ],
    "correctAnswer": 0,
    "explanation": "M:N relationships decompose into two 1:N relationships using an associative junction table with composite keys."
  },
  {
    "id": "dbms-erm-10",
    "category": "dbms",
    "topic": "ER Model",
    "difficulty": "hard",
    "question": "What is the difference between Total Participation and Partial Participation in ER diagrams?",
    "options": [
      "Total participation means every entity in the set must participate in at least one relationship instance (double line); Partial means some may not",
      "Total participation applies only to numbers",
      "Partial participation means the table is half empty",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Total participation (existence dependency) enforces that every entity instance belongs to the relationship, denoted by double lines."
  },
  {
    "id": "dbms-key-01",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "easy",
    "question": "What is a Super Key in a relational database?",
    "options": [
      "A set of one or more attributes that uniquely identifies every tuple (row) within a relation",
      "A key with administrative superuser privileges",
      "The largest numerical primary key in a table",
      "A foreign key that connects to 5 tables"
    ],
    "correctAnswer": 0,
    "explanation": "A super key is any attribute set that uniquely identifies rows; it may contain redundant attributes."
  },
  {
    "id": "dbms-key-02",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "easy",
    "question": "What is a Candidate Key?",
    "options": [
      "A minimal Super Key—a super key from which no attribute can be removed without losing unique identification property",
      "A key that is waiting to be approved by an administrator",
      "A foreign key in a child table",
      "A key that contains duplicate values"
    ],
    "correctAnswer": 0,
    "explanation": "Candidate keys are minimal super keys; any candidate key is eligible to be chosen as the primary key."
  },
  {
    "id": "dbms-key-03",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "easy",
    "question": "What is a Primary Key?",
    "options": [
      "The selected candidate key chosen by the database designer to uniquely identify tuples in a relation; cannot contain NULL values",
      "Any column that contains integers",
      "A column that can be null",
      "The first column defined in a table"
    ],
    "correctAnswer": 0,
    "explanation": "A primary key uniquely identifies rows and strictly enforces uniqueness and NOT NULL constraints."
  },
  {
    "id": "dbms-key-04",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "easy",
    "question": "What is a Foreign Key?",
    "options": [
      "An attribute (or set of attributes) in one table that references the Primary Key (or unique key) of another table, enforcing referential integrity",
      "A key imported from an external international database",
      "A key generated by the operating system",
      "A secondary index"
    ],
    "correctAnswer": 0,
    "explanation": "Foreign keys establish relational links across tables and prevent orphaned child records."
  },
  {
    "id": "dbms-key-05",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "medium",
    "question": "Can a Primary Key column contain a NULL value in an SQL relational table?",
    "options": [
      "No, Entity Integrity strictly prohibits NULL values in any part of a primary key",
      "Yes, at most one NULL value is permitted",
      "Yes, unlimited NULL values are permitted",
      "Only if the database is in maintenance mode"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity constraint dictates that primary key components cannot be NULL, ensuring every row is identifiable."
  },
  {
    "id": "dbms-key-06",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "medium",
    "question": "What is an Alternate Key?",
    "options": [
      "Any candidate key that was NOT chosen as the primary key of the relation",
      "A backup database server key",
      "A foreign key that can be null",
      "A secondary index column"
    ],
    "correctAnswer": 0,
    "explanation": "All candidate keys that are not selected as the primary key are designated as alternate keys."
  },
  {
    "id": "dbms-key-07",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "medium",
    "question": "What is a 'Composite Key'?",
    "options": [
      "A primary or candidate key that consists of two or more attributes combined to guarantee uniqueness",
      "A key encrypted with AES-256",
      "A key that points to a view",
      "A key with floating point numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Composite keys combine multiple columns (e.g. {order_id, product_id}) to uniquely identify tuples."
  },
  {
    "id": "dbms-key-08",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "medium",
    "question": "What is a 'Surrogate Key'?",
    "options": [
      "An artificial, system-generated identifier (e.g. auto-incrementing integer or UUID) having no business or domain meaning",
      "A natural key like Social Security Number",
      "A foreign key from an external API",
      "A temporary key deleted after 1 day"
    ],
    "correctAnswer": 0,
    "explanation": "Surrogate keys (like auto-incremented IDs) decouple database uniqueness from volatile real-world business attributes."
  },
  {
    "id": "dbms-key-09",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "hard",
    "question": "What action does 'ON DELETE CASCADE' perform on a foreign key constraint?",
    "options": [
      "Automatically deletes all child rows in the referencing table when the referenced parent row is deleted",
      "Prevents the parent row from being deleted",
      "Sets the child foreign key column to NULL",
      "Throws an unhandled exception"
    ],
    "correctAnswer": 0,
    "explanation": "CASCADE propagates deletions down to dependent child records, maintaining referential integrity automatically."
  },
  {
    "id": "dbms-key-10",
    "category": "dbms",
    "topic": "Keys",
    "difficulty": "hard",
    "question": "What is the difference between 'ON DELETE SET NULL' and 'ON DELETE RESTRICT'?",
    "options": [
      "SET NULL updates child foreign keys to NULL upon parent deletion; RESTRICT rejects the parent deletion if matching child rows exist",
      "SET NULL deletes child rows; RESTRICT updates them to 0",
      "RESTRICT deletes the parent immediately",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "RESTRICT (or NO ACTION) blocks parent deletion to protect referenced children; SET NULL decouples them."
  },
  {
    "id": "dbms-fd-01",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "easy",
    "question": "What does the Functional Dependency X -> Y signify in a relation R?",
    "options": [
      "For any two tuples in R, if their values for attribute X are identical, their values for attribute Y must also be identical",
      "X is greater than Y",
      "X and Y have the same data type",
      "Y is a primary key of X"
    ],
    "correctAnswer": 0,
    "explanation": "X uniquely determines Y; knowing the value of X deterministically yields a single value for Y."
  },
  {
    "id": "dbms-fd-02",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "easy",
    "question": "What is a 'Trivial Functional Dependency'?",
    "options": [
      "A dependency X -> Y where Y is a subset of X (e.g. {A, B} -> A)",
      "A dependency that has no primary key",
      "A dependency with numbers only",
      "A dependency that is never true"
    ],
    "correctAnswer": 0,
    "explanation": "A dependency is trivial if the right-hand attribute is already included within the left-hand determinant."
  },
  {
    "id": "dbms-fd-03",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "easy",
    "question": "What are Armstrong's Axioms in functional dependency theory?",
    "options": [
      "A set of sound and complete inference rules (Reflexivity, Augmentation, Transitivity) used to deduce all functional dependencies",
      "Hardware rules for building hard drives",
      "SQL guidelines for writing queries",
      "Rules for choosing database passwords"
    ],
    "correctAnswer": 0,
    "explanation": "Armstrong's axioms form the formal mathematical basis for calculating attribute closures and normal forms."
  },
  {
    "id": "dbms-fd-04",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "easy",
    "question": "According to the Reflexivity rule of Armstrong's Axioms:",
    "options": [
      "If Y ⊆ X, then X -> Y",
      "If X -> Y, then Y -> X",
      "If X -> Y and Y -> Z, then X -> Z",
      "If X -> Y, then XZ -> Y"
    ],
    "correctAnswer": 0,
    "explanation": "Reflexivity states that if Y is a subset of X, then X functionally determines Y."
  },
  {
    "id": "dbms-fd-05",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "medium",
    "question": "What is the Transitivity rule in functional dependencies?",
    "options": [
      "If X -> Y and Y -> Z, then X -> Z",
      "If X -> Y, then XZ -> YZ",
      "If X -> Y, then Y -> X",
      "If X -> Y, then Z -> Y"
    ],
    "correctAnswer": 0,
    "explanation": "Transitivity establishes that determinants chain transitively: if X determines Y and Y determines Z, X determines Z."
  },
  {
    "id": "dbms-fd-06",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "medium",
    "question": "What is an 'Attribute Closure' (denoted as X+) of an attribute set X?",
    "options": [
      "The complete set of all attributes that can be functionally determined by X under the given set of dependencies F",
      "The number of rows in a table",
      "The primary key of X",
      "The data type of X"
    ],
    "correctAnswer": 0,
    "explanation": "The closure X+ finds every attribute reachable from X; if X+ contains all relation attributes, X is a super key."
  },
  {
    "id": "dbms-fd-07",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "medium",
    "question": "What is a 'Partial Dependency' in normalization theory?",
    "options": [
      "When a non-prime attribute is functionally determined by a proper subset of a composite candidate key, rather than the whole key",
      "A dependency that is only true on weekends",
      "A dependency that has missing values",
      "A foreign key that is not verified"
    ],
    "correctAnswer": 0,
    "explanation": "Partial dependencies occur when part of a candidate key determines non-prime attributes, violating 2NF."
  },
  {
    "id": "dbms-fd-08",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "medium",
    "question": "What is a 'Transitive Dependency' in normalization theory?",
    "options": [
      "When a non-prime attribute is determined by another non-prime attribute via a functional chain (e.g. X -> Y and Y -> Z, where X is candidate key and Y is not)",
      "A dependency between two servers",
      "A dependency on foreign keys",
      "A dependency that reverses order"
    ],
    "correctAnswer": 0,
    "explanation": "Transitive dependencies (Key -> Non-Key -> Non-Key) introduce update anomalies, violating 3NF."
  },
  {
    "id": "dbms-fd-09",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "hard",
    "question": "What is a 'Canonical Cover' (or Minimal Cover) of a set of functional dependencies?",
    "options": [
      "A simplified, minimal equivalent set of dependencies with no redundant dependencies and no extraneous attributes",
      "A backup copy of the schema",
      "An encrypted database key",
      "A primary key index"
    ],
    "correctAnswer": 0,
    "explanation": "A minimal cover strips all extraneous left/right attributes and redundant dependencies while preserving equivalence."
  },
  {
    "id": "dbms-fd-10",
    "category": "dbms",
    "topic": "Functional Dependencies",
    "difficulty": "hard",
    "question": "What does 'Dependency Preservation' guarantee when decomposing a relation R into R1 and R2?",
    "options": [
      "All functional dependencies in the original relation can be verified by checking individual sub-relations without performing joins",
      "No data is deleted",
      "The primary key stays the same",
      "All foreign keys are removed"
    ],
    "correctAnswer": 0,
    "explanation": "Dependency preservation allows enforcing all business constraints locally in sub-tables without expensive cross-table joins."
  },
  {
    "id": "dbms-nrm-01",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "easy",
    "question": "What is the primary objective of Database Normalization?",
    "options": [
      "To minimize data redundancy, eliminate update/insert/delete anomalies, and maintain data integrity",
      "To make SQL queries run faster without indexes",
      "To convert SQL into NoSQL",
      "To compress database disk space"
    ],
    "correctAnswer": 0,
    "explanation": "Normalization systematically refactors schemas to eliminate anomalies and reduce redundant duplication."
  },
  {
    "id": "dbms-nrm-02",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "easy",
    "question": "What requirement must a table fulfill to be in First Normal Form (1NF)?",
    "options": [
      "All column values must be atomic (indivisible single values), with no repeating groups or arrays",
      "It must have at least 5 columns",
      "It must have a foreign key",
      "It cannot have integer columns"
    ],
    "correctAnswer": 0,
    "explanation": "1NF requires atomic attribute values and disallows multi-valued sets or composite arrays within a single cell."
  },
  {
    "id": "dbms-nrm-03",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "easy",
    "question": "What requirement must a table fulfill to be in Second Normal Form (2NF)?",
    "options": [
      "It must be in 1NF AND have zero partial dependencies (every non-prime attribute must depend on the whole candidate key)",
      "It must have two foreign keys",
      "It must use 2's complement integers",
      "It must have no NULL values"
    ],
    "correctAnswer": 0,
    "explanation": "2NF eliminates partial dependencies where non-key columns depend on only part of a composite key."
  },
  {
    "id": "dbms-nrm-04",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "easy",
    "question": "What requirement must a table fulfill to be in Third Normal Form (3NF)?",
    "options": [
      "It must be in 2NF AND have zero transitive dependencies (no non-prime attribute may determine another non-prime attribute)",
      "It must have three candidate keys",
      "All columns must be strings",
      "It must be stored on 3 hard drives"
    ],
    "correctAnswer": 0,
    "explanation": "3NF eliminates transitive dependencies (for every non-trivial X -> Y, either X is a super key or Y is a prime attribute)."
  },
  {
    "id": "dbms-nrm-05",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "medium",
    "question": "What is Boyce-Codd Normal Form (BCNF)?",
    "options": [
      "A stricter version of 3NF where for EVERY non-trivial functional dependency X -> Y, X must strictly be a Super Key",
      "A normal form for binary code",
      "A normal form that allows duplicate rows",
      "A form with no candidate keys"
    ],
    "correctAnswer": 0,
    "explanation": "BCNF removes the exception in 3NF: determinants X in non-trivial dependencies X -> Y must be super keys."
  },
  {
    "id": "dbms-nrm-06",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "medium",
    "question": "What is the trade-off of normalizing a database to 3NF/BCNF?",
    "options": [
      "Data redundancy is eliminated, but read queries often require more table JOIN operations which can impact query latency",
      "Data integrity is lost",
      "Storage consumption increases 10x",
      "The database cannot accept INSERT queries"
    ],
    "correctAnswer": 0,
    "explanation": "Higher normalization fragments data into separate tables to eliminate anomalies, increasing the need for relational joins."
  },
  {
    "id": "dbms-nrm-07",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "medium",
    "question": "What is 'Denormalization' and when is it strategically used?",
    "options": [
      "Intentionally introducing controlled redundancy into a normalized schema to reduce complex joins and accelerate read performance in analytics/reporting",
      "Corrupting database tables",
      "Deleting foreign keys by accident",
      "Converting tables to 1NF"
    ],
    "correctAnswer": 0,
    "explanation": "Denormalization trades storage and write overhead for faster read throughput in read-heavy and data warehousing workloads."
  },
  {
    "id": "dbms-nrm-08",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "medium",
    "question": "What is a 'Lossless Decomposition' (Lossless-Join Decomposition)?",
    "options": [
      "A decomposition of relation R into R1 and R2 such that R1 ⨝ R2 produces exactly the original relation R with zero spurious tuples",
      "A decomposition that preserves all image files",
      "A database backup that loses no bytes",
      "A query that returns zero rows"
    ],
    "correctAnswer": 0,
    "explanation": "Decomposition is lossless if R1 ∩ R2 forms a super key of either R1 or R2, ensuring no phantom rows appear on join."
  },
  {
    "id": "dbms-nrm-09",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "hard",
    "question": "Which normal form addresses Multi-Valued Dependencies (MVDs)?",
    "options": [
      "Fourth Normal Form (4NF)",
      "Third Normal Form (3NF)",
      "Second Normal Form (2NF)",
      "BCNF"
    ],
    "correctAnswer": 0,
    "explanation": "4NF eliminates independent multi-valued dependencies (X ->> Y) that lead to cartesian product row explosion."
  },
  {
    "id": "dbms-nrm-10",
    "category": "dbms",
    "topic": "Normalization",
    "difficulty": "hard",
    "question": "Which normal form deals with Join Dependencies and lossless n-way decompositions?",
    "options": [
      "Fifth Normal Form (5NF / Project-Join Normal Form)",
      "First Normal Form (1NF)",
      "3NF",
      "BCNF"
    ],
    "correctAnswer": 0,
    "explanation": "5NF eliminates join dependencies where a table cannot be reconstructed losslessly from smaller sub-projections."
  },
  {
    "id": "dbms-txn-01",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What is a Transaction in a DBMS?",
    "options": [
      "A logical unit of database work containing one or more SQL operations executed as a single indivisible operation",
      "A bank transfer between two customers",
      "A user logging into a database",
      "A query that takes more than 1 minute"
    ],
    "correctAnswer": 0,
    "explanation": "A transaction represents an atomic operational sequence that must execute entirely or abort entirely."
  },
  {
    "id": "dbms-txn-02",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What are the standard lifecycle states of a database transaction?",
    "options": [
      "Active -> Partially Committed -> Committed (or Active -> Failed -> Aborted)",
      "Running -> Sleeping -> Dead",
      "Draft -> Review -> Published",
      "Open -> Pending -> Closed"
    ],
    "correctAnswer": 0,
    "explanation": "Transactions transition from Active to Partially Committed upon final statement execution, then Committed; failures lead to Aborted."
  },
  {
    "id": "dbms-txn-03",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What does the 'COMMIT' command do in a database transaction?",
    "options": [
      "Permanently applies all transaction modifications to the database and makes them visible to other transactions",
      "Cancels all changes made so far",
      "Pauses execution for 5 seconds",
      "Closes the database terminal"
    ],
    "correctAnswer": 0,
    "explanation": "COMMIT persists changes irrevocably and releases held transactional locks."
  },
  {
    "id": "dbms-txn-04",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What does the 'ROLLBACK' command do?",
    "options": [
      "Aborts the transaction and undoes all modifications back to the beginning of the transaction or specified savepoint",
      "Deletes all tables in the database",
      "Restarts the database operating system",
      "Executes the transaction twice"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLBACK utilizes the undo log to revert all uncommitted changes, returning state to the pre-transaction baseline."
  },
  {
    "id": "dbms-txn-05",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "What is a 'Savepoint' in transactional SQL?",
    "options": [
      "An intermediate checkpoint within a transaction allowing partial rollbacks without aborting the entire transaction",
      "A database backup created at midnight",
      "A bookmark in a database manual",
      "A hard drive sector"
    ],
    "correctAnswer": 0,
    "explanation": "SAVEPOINT creates named milestones enabling granular rollback (e.g. ROLLBACK TO savepoint_name)."
  },
  {
    "id": "dbms-txn-06",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "What does the 'Partially Committed' state indicate in a transaction lifecycle?",
    "options": [
      "The final statement has executed, but modifications may still reside in volatile memory buffers before stable log flushing",
      "Half of the SQL queries failed",
      "The user disconnected before pressing commit",
      "A transaction pending admin approval"
    ],
    "correctAnswer": 0,
    "explanation": "Partially committed occurs right after the last operation executes; committing becomes final only when the commit log hits disk."
  },
  {
    "id": "dbms-txn-07",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "What is a 'Compensating Transaction' in distributed microservice architectures (e.g. SAGA pattern)?",
    "options": [
      "An explicit transaction that undoes the semantic business effects of a previously committed transaction across distributed services",
      "A transaction that pays cash bonuses",
      "A query that optimizes database memory",
      "An automatic roll-back inside a single database"
    ],
    "correctAnswer": 0,
    "explanation": "In distributed SAGAs where 2PC is impractical, compensating transactions semantically reverse committed microservice steps."
  },
  {
    "id": "dbms-txn-08",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "What is the difference between a 'Schedule' and a 'Transaction'?",
    "options": [
      "A transaction is an individual execution sequence; a schedule is the chronological interleaving order of operations across multiple concurrent transactions",
      "Schedules run on cron jobs; transactions do not",
      "There is no difference",
      "A schedule is a stored procedure"
    ],
    "correctAnswer": 0,
    "explanation": "A schedule reflects the actual chronological interleaved timeline of reads and writes executed concurrently across transactions."
  },
  {
    "id": "dbms-txn-09",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "hard",
    "question": "What is a 'Cascading Rollback' (Cascading Abort) and why is it dangerous?",
    "options": [
      "When the failure of one transaction forces the rollback of multiple other concurrent transactions that read its uncommitted dirty data",
      "When a database server falls off a server rack",
      "A database running out of hard drive space",
      "Rolling back tables sequentially in alphabetical order"
    ],
    "correctAnswer": 0,
    "explanation": "Cascading rollbacks waste CPU cycles and stall throughput; avoided by using strict, cascadeless schedules."
  },
  {
    "id": "dbms-txn-10",
    "category": "dbms",
    "topic": "Transactions",
    "difficulty": "hard",
    "question": "What is a 'Cascadeless Schedule' in DBMS?",
    "options": [
      "A schedule where transactions are only permitted to read data items committed by prior transactions",
      "A schedule that never rolls back",
      "A schedule with only one transaction",
      "A schedule executed on read-only databases"
    ],
    "correctAnswer": 0,
    "explanation": "Cascadelessness requires reading only committed data, ensuring that an abort of transaction T1 never forces an abort of T2."
  },
  {
    "id": "dbms-acd-01",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "easy",
    "question": "What does the acronym 'ACID' stand for in database management?",
    "options": [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Control, Integrity, Distribution",
      "Access, Concurrency, Indexing, Data",
      "Asynchronous, Clustered, Integrated, Durable"
    ],
    "correctAnswer": 0,
    "explanation": "ACID principles define the core guarantees required for reliable transactional database processing."
  },
  {
    "id": "dbms-acd-02",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "easy",
    "question": "What does 'Atomicity' guarantee in a database transaction?",
    "options": [
      "The 'all-or-nothing' property: all operations in the transaction succeed, or the entire transaction is rolled back with zero partial changes",
      "Queries execute at the atomic molecular level",
      "Transactions can only modify one table",
      "Transactions run in under one nanosecond"
    ],
    "correctAnswer": 0,
    "explanation": "Atomicity ensures incomplete transactions cannot leave partial, corrupt state in the database."
  },
  {
    "id": "dbms-acd-03",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "easy",
    "question": "What does 'Consistency' guarantee in ACID?",
    "options": [
      "Transactions transition the database from one valid state to another, strictly adhering to all constraints, triggers, and cascades",
      "All tables must have the same number of rows",
      "Data is formatted in lowercase",
      "Queries return consistent text fonts"
    ],
    "correctAnswer": 0,
    "explanation": "Consistency guarantees that integrity invariants (foreign keys, checks, unique constraints) are preserved."
  },
  {
    "id": "dbms-acd-04",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "easy",
    "question": "What does 'Isolation' guarantee in ACID?",
    "options": [
      "Concurrent execution of multiple transactions yields the same state as if they were executed serially one after another without interference",
      "The database server is isolated from the internet",
      "Users cannot share passwords",
      "Data is stored on isolated hard drives"
    ],
    "correctAnswer": 0,
    "explanation": "Isolation ensures concurrent transactions operate without observing each other's intermediate uncommitted states."
  },
  {
    "id": "dbms-acd-05",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "easy",
    "question": "What does 'Durability' guarantee in ACID?",
    "options": [
      "Once a transaction is committed, its modifications are permanently recorded in non-volatile storage and survive subsequent system crashes",
      "The database hard drive lasts for 100 years",
      "Tables cannot be deleted by users",
      "Passwords never expire"
    ],
    "correctAnswer": 0,
    "explanation": "Durability guarantees that committed data is never lost, enforced via Write-Ahead Logging and non-volatile disk writes."
  },
  {
    "id": "dbms-acd-06",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "medium",
    "question": "Which component of the DBMS engine is primarily responsible for ensuring 'Atomicity'?",
    "options": [
      "Recovery Manager (using Undo Logs)",
      "Concurrency Control Manager",
      "Query Optimizer",
      "Authentication Manager"
    ],
    "correctAnswer": 0,
    "explanation": "The recovery manager maintains undo log records to reverse partial modifications during aborts or power failures."
  },
  {
    "id": "dbms-acd-07",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "medium",
    "question": "Which component of the DBMS is primarily responsible for ensuring 'Isolation'?",
    "options": [
      "Concurrency Control Manager (using Locking, 2PL, or MVCC)",
      "Buffer Manager",
      "Storage Engine",
      "Compiler"
    ],
    "correctAnswer": 0,
    "explanation": "Concurrency control mechanisms (locks, multi-version concurrency control) prevent interleaved transaction conflicts."
  },
  {
    "id": "dbms-acd-08",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "medium",
    "question": "Which ACID property is violated if a bank transfer deducts $500 from Account A, crashes before depositing into Account B, and leaves the deduction intact?",
    "options": [
      "Atomicity",
      "Isolation",
      "Durability",
      "Security"
    ],
    "correctAnswer": 0,
    "explanation": "A partial deduction without the corresponding credit violates the all-or-nothing requirement of Atomicity."
  },
  {
    "id": "dbms-acd-09",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "hard",
    "question": "How do modern relational databases balance 'Isolation' with high-throughput concurrency?",
    "options": [
      "By supporting configurable ANSI SQL Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)",
      "By running only one query at a time",
      "By disabling all transactions",
      "By using NoSQL exclusively"
    ],
    "correctAnswer": 0,
    "explanation": "Configurable isolation levels let engineers choose appropriate trade-offs between absolute serializability and concurrency performance."
  },
  {
    "id": "dbms-acd-10",
    "category": "dbms",
    "topic": "ACID Properties",
    "difficulty": "hard",
    "question": "How does Write-Ahead Logging (WAL) combined with ARIES guarantee 'Durability' during an unexpected power outage?",
    "options": [
      "During recovery, the engine executes Analysis, Redo (repeats all logged actions up to crash), and Undo (rolls back all uncommitted active transactions)",
      "By freezing the CPU registers",
      "By copying data to cloud storage before power goes out",
      "By running the database on solar batteries"
    ],
    "correctAnswer": 0,
    "explanation": "ARIES recovery algorithm processes WAL logs in three phases: Analysis, Redo (history repeat), and Undo (active rollback)."
  },
  {
    "id": "dbms-cnc-01",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "easy",
    "question": "What is a 'Dirty Read' concurrency phenomenon?",
    "options": [
      "A transaction reads uncommitted data written by another concurrent transaction that is subsequently rolled back",
      "Reading data from a corrupted hard drive sector",
      "A query with invalid SQL syntax",
      "Reading data that contains null values"
    ],
    "correctAnswer": 0,
    "explanation": "Dirty read occurs when T1 modifies a row, T2 reads it, and T1 aborts, leaving T2 operating on phantom uncommitted data."
  },
  {
    "id": "dbms-cnc-02",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "easy",
    "question": "What is a 'Non-Repeatable Read' phenomenon?",
    "options": [
      "A transaction re-reads the same row within its transaction lifecycle and finds that values have been modified or deleted by another committed transaction",
      "A query that can only be run once",
      "A query that throws a timeout error",
      "Reading data without an index"
    ],
    "correctAnswer": 0,
    "explanation": "Non-repeatable reads occur when committed updates alter row values between two consecutive reads in the same transaction."
  },
  {
    "id": "dbms-cnc-03",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "easy",
    "question": "What is a 'Phantom Read' phenomenon?",
    "options": [
      "A transaction re-executes a range query and discovers that new rows matching the search condition were inserted by another committed transaction",
      "A row that disappears due to ghost viruses",
      "A deleted row that still appears in views",
      "Reading encrypted data without a key"
    ],
    "correctAnswer": 0,
    "explanation": "Phantom reads involve range scans where newly committed qualifying rows appear upon re-querying."
  },
  {
    "id": "dbms-cnc-04",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "easy",
    "question": "Which ANSI SQL isolation level provides the highest degree of isolation and completely prevents dirty reads, non-repeatable reads, and phantom reads?",
    "options": [
      "SERIALIZABLE",
      "REPEATABLE READ",
      "READ COMMITTED",
      "READ UNCOMMITTED"
    ],
    "correctAnswer": 0,
    "explanation": "SERIALIZABLE eliminates all concurrency anomalies, guaranteeing serial execution equivalence."
  },
  {
    "id": "dbms-cnc-05",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "medium",
    "question": "What is the default transaction isolation level in PostgreSQL?",
    "options": [
      "READ COMMITTED",
      "READ UNCOMMITTED",
      "REPEATABLE READ",
      "SERIALIZABLE"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL defaults to READ COMMITTED, where each statement sees a snapshot of committed data at statement start."
  },
  {
    "id": "dbms-cnc-06",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "medium",
    "question": "What is Two-Phase Locking (2PL) protocol in concurrency control?",
    "options": [
      "A locking protocol with a Growing Phase (locks acquired, none released) and a Shrinking Phase (locks released, none acquired)",
      "A lock that requires two passwords",
      "Locking two tables simultaneously",
      "Locking the database for 2 minutes"
    ],
    "correctAnswer": 0,
    "explanation": "2PL guarantees conflict serializability by ensuring transactions acquire all locks before releasing any."
  },
  {
    "id": "dbms-cnc-07",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "medium",
    "question": "What is the difference between a Shared Lock (S) and an Exclusive Lock (X)?",
    "options": [
      "Shared locks allow multiple concurrent transactions to read a resource; Exclusive locks grant single-transaction exclusive write access",
      "Shared locks are for tables; Exclusive locks are for columns",
      "Exclusive locks allow reads only",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple S locks can coexist for concurrent reading; an X lock requires exclusive isolation for mutation."
  },
  {
    "id": "dbms-cnc-08",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "medium",
    "question": "What is Strict Two-Phase Locking (Strict 2PL)?",
    "options": [
      "A 2PL variant where all Exclusive locks acquired by a transaction are held until the transaction commits or aborts",
      "Locking all tables in the entire database",
      "A lock that cannot be released",
      "Using locks on read operations only"
    ],
    "correctAnswer": 0,
    "explanation": "Strict 2PL holds exclusive locks until transaction completion, preventing dirty reads and cascading rollbacks."
  },
  {
    "id": "dbms-cnc-09",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "hard",
    "question": "What is Multi-Version Concurrency Control (MVCC) used in modern engines like PostgreSQL and MySQL InnoDB?",
    "options": [
      "Readers do not block writers, and writers do not block readers, by maintaining multiple historical version snapshots of rows using transaction IDs",
      "Creating 5 copies of the entire database",
      "A multi-threaded locking manager",
      "A database that runs on multiple operating systems"
    ],
    "correctAnswer": 0,
    "explanation": "MVCC provides snapshot isolation: readers see historical committed versions without waiting on active write locks."
  },
  {
    "id": "dbms-cnc-10",
    "category": "dbms",
    "topic": "Concurrency Control",
    "difficulty": "hard",
    "question": "What is 'Optimistic Concurrency Control' (OCC) and when is it preferred over Pessimistic Locking?",
    "options": [
      "Transactions execute without acquiring locks, verifying conflict-freedom at commit time; preferred in low-contention, read-heavy environments",
      "Assuming the database never crashes",
      "Locking every table before reading",
      "Disabling transaction rollback"
    ],
    "correctAnswer": 0,
    "explanation": "OCC avoids lock overhead by validating during a commit phase; ideal when transaction collisions are rare."
  },
  {
    "id": "dbms-idx-01",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "easy",
    "question": "What is the primary function of an Index in a relational database?",
    "options": [
      "A data structure that accelerates search, lookup, and retrieval operations on table rows at the cost of slower writes and extra disk space",
      "Encrypts sensitive database columns",
      "Prevents duplicate rows",
      "Compresses image files"
    ],
    "correctAnswer": 0,
    "explanation": "Indexes provide fast access paths (e.g. B-Trees) avoiding full table scans, trading off write latency and storage."
  },
  {
    "id": "dbms-idx-02",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "easy",
    "question": "What is a 'Clustered Index'?",
    "options": [
      "An index that determines the physical storage order of rows on disk; a table can have at most ONE clustered index",
      "An index stored on a cloud cluster",
      "An index with multiple columns",
      "An index that cannot be modified"
    ],
    "correctAnswer": 0,
    "explanation": "Because physical records can only be ordered on disk in one sequence, a table can possess only one clustered index (usually the primary key)."
  },
  {
    "id": "dbms-idx-03",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "easy",
    "question": "What is a 'Non-Clustered Index' (Secondary Index)?",
    "options": [
      "An auxiliary index structure stored separately from table data, containing index keys and row pointers (RID or primary key) pointing to actual data rows",
      "An index that is not sorted",
      "An index created without a name",
      "An index deleted by the user"
    ],
    "correctAnswer": 0,
    "explanation": "Non-clustered indexes maintain a separate B-Tree with leaf nodes pointing to physical data locations; tables can have many."
  },
  {
    "id": "dbms-idx-04",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "easy",
    "question": "What is a 'Full Table Scan' in query execution plans?",
    "options": [
      "Sequential scan through every page and row of a table on disk because no suitable index was available to satisfy the query filter",
      "Scanning tables for virus infections",
      "Printing all rows to the screen",
      "Backing up a table to tape"
    ],
    "correctAnswer": 0,
    "explanation": "Full table scans read every block from disk sequentially, leading to high I/O overhead on large tables."
  },
  {
    "id": "dbms-idx-05",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "medium",
    "question": "What is a 'Composite Index' (Multi-Column Index)?",
    "options": [
      "An index constructed on two or more columns of a table (e.g. INDEX(last_name, first_name))",
      "An index that merges two tables",
      "An index with numbers and text",
      "An encrypted index"
    ],
    "correctAnswer": 0,
    "explanation": "Composite indexes accelerate queries filtering on combinations of columns adhering to the leftmost prefix rule."
  },
  {
    "id": "dbms-idx-06",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "medium",
    "question": "What is the 'Leftmost Prefix Rule' in composite B-Tree indexing?",
    "options": [
      "A composite index on (A, B, C) can be utilized by queries filtering on (A), (A, B), or (A, B, C), but NOT queries filtering solely on (B) or (C)",
      "Columns must be named alphabetically",
      "Indexes can only be read from right to left",
      "Only the leftmost table can be queried"
    ],
    "correctAnswer": 0,
    "explanation": "B-Tree keys are ordered hierarchically by the leading column first; skipping the leading column invalidates index tree descent."
  },
  {
    "id": "dbms-idx-07",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "medium",
    "question": "What is a 'Covering Index' in SQL query optimization?",
    "options": [
      "An index that contains all the columns requested by a query (in SELECT, WHERE, and JOIN), allowing the query to be fulfilled entirely from the index without visiting the table heap",
      "An index that covers all tables in a schema",
      "An index with 100% test coverage",
      "An index stored in memory"
    ],
    "correctAnswer": 0,
    "explanation": "Covering indexes eliminate costly table lookups ('index only scan'), boosting query performance significantly."
  },
  {
    "id": "dbms-idx-08",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "medium",
    "question": "Why does having too many indexes degrade INSERT, UPDATE, and DELETE performance?",
    "options": [
      "Every table mutation mandates updating all associated B-Tree index structures on disk, increasing write I/O overhead",
      "Indexes consume all CPU cache",
      "The database stops accepting connections",
      "Indexes cause memory leaks"
    ],
    "correctAnswer": 0,
    "explanation": "Every write requires rebalancing, splitting, and maintaining leaf pages across all active indexes on the mutated table."
  },
  {
    "id": "dbms-idx-09",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "hard",
    "question": "What is the difference between a Dense Index and a Sparse Index?",
    "options": [
      "A dense index has an index entry for every search key value in the table; a sparse index has index entries for only some records (e.g. per disk block)",
      "Dense indexes are larger than the table itself",
      "Sparse indexes can only be used on strings",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Dense indexes index every record; sparse indexes store entries per block and rely on sequential offset scans inside blocks."
  },
  {
    "id": "dbms-idx-10",
    "category": "dbms",
    "topic": "Indexing",
    "difficulty": "hard",
    "question": "What is a Hash Index and what is its primary limitation compared to a B-Tree Index?",
    "options": [
      "Provides O(1) point lookups for equality (=) comparisons, but CANNOT support range queries (<, >, BETWEEN) or sorting (ORDER BY)",
      "Hash indexes use 10x more RAM",
      "Hash indexes cannot store integers",
      "Hash indexes crash on duplicate values"
    ],
    "correctAnswer": 0,
    "explanation": "Hash functions scatter keys pseudo-randomly across buckets, destroying sequential order and precluding range scans."
  },
  {
    "id": "dbms-bt-01",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "easy",
    "question": "Why are B-Trees and B+ Trees preferred over Binary Search Trees (AVL, Red-Black) for database indexing?",
    "options": [
      "They have high fan-out (wide, shallow trees), drastically minimizing costly physical disk block I/O operations",
      "They require zero memory",
      "They are written in binary code",
      "They only work on 64-bit operating systems"
    ],
    "correctAnswer": 0,
    "explanation": "Disk I/O is the primary bottleneck; B-Trees match page sizes with wide fan-out (thousands of keys/node), achieving tree heights of 3-4."
  },
  {
    "id": "dbms-bt-02",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "easy",
    "question": "What is the critical structural difference between a B-Tree and a B+ Tree?",
    "options": [
      "In a B+ Tree, data records/pointers are stored ONLY in leaf nodes, and leaf nodes are linked via a linked list; in a B-Tree, data resides in both internal and leaf nodes",
      "B+ Trees can only store positive numbers",
      "B-Trees are binary trees with 2 children",
      "B+ Trees cannot be balanced"
    ],
    "correctAnswer": 0,
    "explanation": "B+ Tree internal nodes act as pure routers; leaves hold all data and are sequentially linked for lightning-fast range scans."
  },
  {
    "id": "dbms-bt-03",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "easy",
    "question": "Why do B+ Trees excel at range queries (e.g. WHERE age BETWEEN 20 AND 30) compared to B-Trees?",
    "options": [
      "Leaf nodes form a doubly/singly linked list, allowing sequential traversal across leaves without traversing up and down the tree hierarchy",
      "B+ Trees have no leaf nodes",
      "B-Trees cannot store ranges",
      "B+ Trees sort data in reverse"
    ],
    "correctAnswer": 0,
    "explanation": "Once the starting key is located in O(log n), subsequent range items are scanned linearly along the leaf linked list."
  },
  {
    "id": "dbms-bt-04",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "easy",
    "question": "What is the typical search, insert, and delete time complexity for a B+ Tree of n keys?",
    "options": [
      "O(log n)",
      "O(1)",
      "O(n)",
      "O(n log n)"
    ],
    "correctAnswer": 0,
    "explanation": "B+ Trees maintain perfect self-balancing, guaranteeing logarithmic O(log n) operations in worst case."
  },
  {
    "id": "dbms-bt-05",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "medium",
    "question": "In a B-Tree of order m, what is the maximum number of children an internal node can have?",
    "options": [
      "m",
      "m - 1",
      "m / 2",
      "2m"
    ],
    "correctAnswer": 0,
    "explanation": "By definition, a B-tree of order m permits an internal node to possess at most m child pointers and m - 1 keys."
  },
  {
    "id": "dbms-bt-06",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "medium",
    "question": "In a B-Tree of order m, what is the minimum number of children a non-root internal node must have?",
    "options": [
      "ceil(m / 2)",
      "2",
      "m - 1",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "To maintain density and balance, non-root nodes must remain at least half-full with ceil(m / 2) children."
  },
  {
    "id": "dbms-bt-07",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "medium",
    "question": "What happens when an insertion causes a B+ Tree leaf node to exceed its maximum capacity?",
    "options": [
      "The node splits into two nodes at the median, and the median key is copied/promoted up to the parent node",
      "The database crashes",
      "The oldest key is deleted",
      "The key is placed on the heap"
    ],
    "correctAnswer": 0,
    "explanation": "Node splitting preserves capacity bounds; when roots split, tree height increases uniformly by 1 from the top."
  },
  {
    "id": "dbms-bt-08",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "medium",
    "question": "Why can internal nodes of a B+ Tree accommodate a higher fan-out (more child pointers) than internal nodes of a standard B-Tree of the same page size?",
    "options": [
      "B+ Tree internal nodes store only search keys and child pointers without data records, packing more routing keys into a single 4KB/8KB disk page",
      "B+ Trees compress keys with gzip",
      "B-Tree keys are twice as large",
      "Internal nodes have unlimited size"
    ],
    "correctAnswer": 0,
    "explanation": "Without row data payloads in internal nodes, more keys fit per block, maximizing fan-out and reducing tree depth."
  },
  {
    "id": "dbms-bt-09",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "hard",
    "question": "What is the height of a typical production B+ Tree holding 100 million rows with a page fan-out of 1000?",
    "options": [
      "3 to 4 levels",
      "100 levels",
      "1000 levels",
      "50 levels"
    ],
    "correctAnswer": 0,
    "explanation": "With fan-out 1000: Level 1=1, Level 2=1,000, Level 3=1,000,000, Level 4=1,000,000,000. 100M rows fit comfortably in depth 3-4."
  },
  {
    "id": "dbms-bt-10",
    "category": "dbms",
    "topic": "B-Trees / B+ Trees",
    "difficulty": "hard",
    "question": "How do B+ Trees handle node deletions when a node falls below the minimum occupancy threshold (underflow)?",
    "options": [
      "Borrow a key from an adjacent sibling node, or merge with a sibling node if both are half-empty (potentially cascading up)",
      "Delete the entire branch",
      "Leave the node empty forever",
      "Convert the tree into a linked list"
    ],
    "correctAnswer": 0,
    "explanation": "Deletions borrow from siblings (redistribution) or merge nodes, potentially shrinking overall tree height if the root empties."
  },
  {
    "id": "dbms-dlk-01",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "What is a Deadlock in a database management system?",
    "options": [
      "A situation where two or more concurrent transactions are permanently blocked, each waiting for a lock held by the other in a circular dependency",
      "A database server that is locked with a password",
      "A corrupted database file that cannot be opened",
      "When all connections are in use"
    ],
    "correctAnswer": 0,
    "explanation": "Deadlocks occur when transactions form a circular wait graph (e.g. T1 holds lock A waiting for B; T2 holds B waiting for A)."
  },
  {
    "id": "dbms-dlk-02",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "Which tool is commonly used by database engines to detect deadlocks dynamically?",
    "options": [
      "Wait-For Graph (WFG) analysis looking for directed cycles",
      "Antivirus software",
      "Disk defragmentation",
      "Checking table row count"
    ],
    "correctAnswer": 0,
    "explanation": "A Wait-For Graph models transactions as nodes and lock dependencies as directed edges; a cycle represents a deadlock."
  },
  {
    "id": "dbms-dlk-03",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "When a DBMS detects a deadlock, how does it typically resolve it?",
    "options": [
      "Selects one of the deadlocked transactions as a 'victim', aborts/rolls it back, releases its held locks, and returns an error to the client",
      "Restarts the entire database server",
      "Terminates all transactions currently running",
      "Freezes the computer"
    ],
    "correctAnswer": 0,
    "explanation": "The deadlock detector aborts the lowest-cost victim transaction, allowing surviving transactions to complete."
  },
  {
    "id": "dbms-dlk-04",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "How can software developers proactively prevent deadlocks through application design?",
    "options": [
      "Enforcing a global, uniform acquisition order for database locks across all transactions (e.g. always lock Account A before Account B)",
      "Never using transactions",
      "Setting transaction timeout to zero",
      "Running all queries as superuser"
    ],
    "correctAnswer": 0,
    "explanation": "Ordering lock acquisition globally eliminates circular wait conditions mathematically."
  },
  {
    "id": "dbms-dlk-05",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "What is the 'Wait-Die' deadlock prevention scheme based on transaction timestamps?",
    "options": [
      "Non-preemptive scheme: if an older transaction requests a lock held by a younger transaction, it waits; if a younger requests from an older, it dies (aborts)",
      "All transactions wait until midnight",
      "Transactions are killed after 5 seconds",
      "Younger transactions kill older ones"
    ],
    "correctAnswer": 0,
    "explanation": "Wait-Die allows older (higher priority) transactions to wait, while younger transactions requesting from older ones die."
  },
  {
    "id": "dbms-dlk-06",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "What is the 'Wound-Wait' deadlock prevention scheme?",
    "options": [
      "Preemptive scheme: if an older transaction requests a lock held by a younger transaction, it wounds/preempts the younger; younger waiting on older simply waits",
      "Transactions wound the operating system",
      "Transactions are wounded by query optimizers",
      "All transactions wait indefinitely"
    ],
    "correctAnswer": 0,
    "explanation": "Wound-Wait preempts younger transactions immediately when older transactions need their resources."
  },
  {
    "id": "dbms-dlk-07",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "What criteria are used by database engines to choose a 'victim' transaction for abort during a deadlock?",
    "options": [
      "Transaction age, amount of work/updates already completed, number of locks held, and cost of rollback",
      "The transaction with the longest SQL query text",
      "The transaction submitted by the newest employee",
      "Random lottery"
    ],
    "correctAnswer": 0,
    "explanation": "The engine minimizes wasted compute by aborting transactions that have executed minimal writes and cost least to roll back."
  },
  {
    "id": "dbms-dlk-08",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "What is a 'Lock Timeout' mechanism in database concurrency?",
    "options": [
      "A transaction aborts and releases locks if it cannot acquire a requested lock within a configured threshold (e.g. 5 seconds)",
      "The database server logs out users after 15 minutes of inactivity",
      "A query that runs out of CPU time",
      "A lock that expires after 100 queries"
    ],
    "correctAnswer": 0,
    "explanation": "Lock timeouts provide simple, effective deadlock mitigation by failing stalled lock requests after a threshold."
  },
  {
    "id": "dbms-dlk-09",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "hard",
    "question": "Can deadlocks occur with only Shared (Read) locks?",
    "options": [
      "No, Shared locks are mutually compatible; deadlocks require incompatible lock conversions or exclusive locks",
      "Yes, shared locks always deadlock",
      "Only in MySQL, not in PostgreSQL",
      "Only when reading null values"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple shared locks coexist without conflict; deadlocks emerge when transactions upgrade S locks to X locks concurrently."
  },
  {
    "id": "dbms-dlk-10",
    "category": "dbms",
    "topic": "Deadlocks",
    "difficulty": "hard",
    "question": "What is 'Starvation' in concurrency control and how is it prevented during victim selection?",
    "options": [
      "When the same transaction is repeatedly selected as the deadlock victim and never finishes; prevented by tracking retry counts or timestamps",
      "When the database runs out of RAM",
      "When queries are starved of network bandwidth",
      "When a table has zero rows"
    ],
    "correctAnswer": 0,
    "explanation": "Victim selection heuristics factor in past abort counts so repeatedly rolled-back transactions eventually gain priority."
  },
  {
    "id": "dbms-sec-01",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "easy",
    "question": "What is SQL Injection (SQLi)?",
    "options": [
      "A vulnerability where malicious SQL commands are injected into input fields and executed by the database engine, bypassing security checks",
      "A virus that infects the SQL binary",
      "Injecting fast RAM into database servers",
      "Using too many JOIN statements"
    ],
    "correctAnswer": 0,
    "explanation": "SQL injection occurs when untrusted user inputs are concatenated directly into dynamic SQL query strings."
  },
  {
    "id": "dbms-sec-02",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "easy",
    "question": "What is the primary defense against SQL Injection in application software?",
    "options": [
      "Using Parameterized Queries (Prepared Statements) or Object-Relational Mappers (ORMs)",
      "Filtering out spaces from input strings",
      "Writing database queries in capital letters",
      "Hiding the database IP address"
    ],
    "correctAnswer": 0,
    "explanation": "Prepared statements separate SQL code structure from user data, treating all inputs as literal values rather than executable syntax."
  },
  {
    "id": "dbms-sec-03",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "easy",
    "question": "What is the 'Principle of Least Privilege' (PoLP) in database user administration?",
    "options": [
      "Granting database users and service accounts only the absolute minimum permissions necessary to perform their legitimate business tasks",
      "Giving all developers root/superuser access",
      "Giving everyone read-only access to all tables",
      "Assigning passwords with 4 characters"
    ],
    "correctAnswer": 0,
    "explanation": "Least privilege restricts exposure by ensuring application connections cannot drop tables, alter schemas, or read unrelated data."
  },
  {
    "id": "dbms-sec-04",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "easy",
    "question": "What SQL commands are used to manage user permissions in relational databases?",
    "options": [
      "GRANT and REVOKE",
      "ALLOW and DENY",
      "PERMIT and FORBID",
      "LOCK and UNLOCK"
    ],
    "correctAnswer": 0,
    "explanation": "GRANT assigns specific privileges (SELECT, INSERT) on objects; REVOKE withdraws them."
  },
  {
    "id": "dbms-sec-05",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "medium",
    "question": "What is the difference between 'Authentication' and 'Authorization' in a DBMS?",
    "options": [
      "Authentication verifies user identity (who you are); Authorization verifies user permissions (what tables/actions you can access)",
      "Authentication is for tables; Authorization is for columns",
      "They are identical terms",
      "Authorization happens first, then Authentication"
    ],
    "correctAnswer": 0,
    "explanation": "Authentication validates credentials (passwords, certificates); authorization verifies privilege grants."
  },
  {
    "id": "dbms-sec-06",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "medium",
    "question": "What is 'Transparent Data Encryption' (TDE)?",
    "options": [
      "Automatic encryption of database files, data pages, and transaction logs on physical storage (Encryption at Rest) transparent to application clients",
      "Displaying passwords in plain text",
      "Encrypting database monitor screens",
      "Using transparent glass fiber cables"
    ],
    "correctAnswer": 0,
    "explanation": "TDE encrypts data at the file/block storage layer, preventing unauthorized reads if raw hard drives or backups are stolen."
  },
  {
    "id": "dbms-sec-07",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "medium",
    "question": "How should user passwords be stored securely in an authentication database table?",
    "options": [
      "Hashed using a salted, slow cryptographic key-derivation function (e.g. bcrypt, Argon2, PBKDF2)",
      "Encrypted with AES-128 using a hardcoded key",
      "In plain text",
      "Encoded with Base64"
    ],
    "correctAnswer": 0,
    "explanation": "Passwords must be hashed with unique cryptographic salts using adaptive hash functions like Argon2 or bcrypt."
  },
  {
    "id": "dbms-sec-08",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "medium",
    "question": "What is 'Database Auditing'?",
    "options": [
      "Tracking and logging database access events, executed queries, schema modifications, and administrative operations for compliance and forensics",
      "Checking accounting financial records",
      "Deleting old tables every quarter",
      "Testing query performance speed"
    ],
    "correctAnswer": 0,
    "explanation": "Audit trails log security-relevant actions to maintain compliance (SOC2, HIPAA, GDPR) and diagnose breaches."
  },
  {
    "id": "dbms-sec-09",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "hard",
    "question": "What is 'Row-Level Security' (RLS) supported by modern databases like PostgreSQL?",
    "options": [
      "A security mechanism where query execution dynamically filters table rows based on the security context/identity of the executing user",
      "Locking rows so nobody can read them",
      "Limiting tables to at most 100 rows",
      "Storing rows in encrypted folders"
    ],
    "correctAnswer": 0,
    "explanation": "RLS enforces fine-grained access policies at the database layer (e.g. tenant_id = current_setting('app.current_tenant'))."
  },
  {
    "id": "dbms-sec-10",
    "category": "dbms",
    "topic": "Database Security",
    "difficulty": "hard",
    "question": "What is 'Data Masking' (or Dynamic Data Masking)?",
    "options": [
      "Obscuring sensitive data fields (e.g. credit card numbers or SSNs like 'XXXX-XXXX-XXXX-1234') when queried by non-privileged users",
      "Hiding database error messages",
      "Painting server racks",
      "Deleting columns from views"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic data masking sanitizes PII/PCI outputs on-the-fly for unauthorized roles without altering underlying disk storage."
  },
  {
    "id": "dbms-nosql-01",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "easy",
    "question": "What is the primary difference between relational SQL databases and NoSQL databases?",
    "options": [
      "SQL databases are structured, schema-enforced, relational tables with ACID guarantees; NoSQL databases offer flexible schemas and scale horizontally",
      "SQL databases cannot store text",
      "NoSQL databases do not use computers",
      "SQL databases run only on Windows"
    ],
    "correctAnswer": 0,
    "explanation": "SQL provides rigid schemas and relational integrity; NoSQL provides flexible schema structures and partitioned distributed scaling."
  },
  {
    "id": "dbms-nosql-02",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "easy",
    "question": "Which of the following is an example of a Document-oriented NoSQL database?",
    "options": [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Neo4j"
    ],
    "correctAnswer": 0,
    "explanation": "MongoDB stores semi-structured documents in BSON/JSON format."
  },
  {
    "id": "dbms-nosql-03",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "easy",
    "question": "Which of the following is an example of a Key-Value in-memory NoSQL database?",
    "options": [
      "Redis",
      "Oracle Database",
      "Cassandra",
      "SQLite"
    ],
    "correctAnswer": 0,
    "explanation": "Redis is an in-memory key-value data structure store supporting strings, hashes, lists, and sets."
  },
  {
    "id": "dbms-nosql-04",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "easy",
    "question": "What is a Graph Database (e.g. Neo4j) optimized for?",
    "options": [
      "Traversing complex, interconnected relationships and networks (e.g. social networks, fraud detection, recommendation engines)",
      "Storing high-resolution photograph graphs",
      "Running accounting spreadsheets",
      "Logging server temperatures"
    ],
    "correctAnswer": 0,
    "explanation": "Graph databases model nodes, edges, and properties for fast index-free relationship traversal."
  },
  {
    "id": "dbms-nosql-05",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "medium",
    "question": "What is the 'BASE' consistency model in distributed NoSQL systems?",
    "options": [
      "Basically Available, Soft state, Eventual consistency",
      "Binary Access, System Encryption",
      "Balanced Architecture, Scalable Engine",
      "Basic SQL Emulation"
    ],
    "correctAnswer": 0,
    "explanation": "BASE sacrifices strict ACID consistency in favor of high availability and eventual consistency in distributed partitions."
  },
  {
    "id": "dbms-nosql-06",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "medium",
    "question": "What does 'Eventual Consistency' mean in a distributed NoSQL cluster?",
    "options": [
      "If no new updates are made, all replicas across the distributed cluster will eventually converge to yield the same data value",
      "The database will crash eventually",
      "Data is consistent only on weekends",
      "Queries take infinite time"
    ],
    "correctAnswer": 0,
    "explanation": "Replicas sync asynchronously; stale reads may occur temporarily until updates propagate to all nodes."
  },
  {
    "id": "dbms-nosql-07",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "medium",
    "question": "What is a Wide-Column Store (e.g. Apache Cassandra, ScyllaDB) best suited for?",
    "options": [
      "Massive write throughput, time-series data, IoT telemetry, and distributed high-availability across global datacenters",
      "Complex multi-table financial JOIN queries",
      "Small desktop applications",
      "Storing monolithic website code"
    ],
    "correctAnswer": 0,
    "explanation": "Cassandra offers masterless ring architecture with tunable consistency, excelling at high-volume append workloads."
  },
  {
    "id": "dbms-nosql-08",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "medium",
    "question": "When is a relational SQL database preferred over a NoSQL database?",
    "options": [
      "When data requires complex multi-table relational joins, strict ACID transaction guarantees, and structured business constraints (e.g. core banking)",
      "When data has completely random, unpredictable structures",
      "When you want horizontal sharding across 1000 nodes with no joins",
      "When you don't care about data consistency"
    ],
    "correctAnswer": 0,
    "explanation": "Relational models are optimal for transactional integrity, normalized relations, and deterministic financial accounting."
  },
  {
    "id": "dbms-nosql-09",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "hard",
    "question": "What is the CAP Theorem trade-off commonly faced by distributed NoSQL databases?",
    "options": [
      "A distributed system can guarantee at most two of: Consistency, Availability, and Partition Tolerance",
      "Databases can only have two tables",
      "Queries take at most 2 seconds",
      "Passwords must be at least 2 characters"
    ],
    "correctAnswer": 0,
    "explanation": "During network partitions (P), distributed systems must choose between consistency (CP) or availability (AP)."
  },
  {
    "id": "dbms-nosql-10",
    "category": "dbms",
    "topic": "SQL vs NoSQL",
    "difficulty": "hard",
    "question": "What is 'NewSQL' (e.g. CockroachDB, Google Spanner)?",
    "options": [
      "Modern distributed databases that provide the horizontal scalability and fault tolerance of NoSQL while maintaining full relational ACID guarantees",
      "A new version of SQLite",
      "NoSQL with a graphical interface",
      "A programming language that replaces SQL"
    ],
    "correctAnswer": 0,
    "explanation": "NewSQL uses distributed consensus (Raft/Paxos) and TrueTime to combine distributed sharding with serializable ACID."
  },
  {
    "id": "dbms-rdb-01",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "easy",
    "question": "Who proposed the formal Relational Model for Database Management in 1970?",
    "options": [
      "Edgar F. Codd (E.F. Codd)",
      "Alan Turing",
      "Dennis Ritchie",
      "Tim Berners-Lee"
    ],
    "correctAnswer": 0,
    "explanation": "E.F. Codd published the seminal paper establishing the mathematical set-theoretic foundation for relational databases."
  },
  {
    "id": "dbms-rdb-02",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "easy",
    "question": "What is a 'Tuple' in relational database terminology?",
    "options": [
      "A single row (record) in a relational table",
      "A column name",
      "A table constraint",
      "An index"
    ],
    "correctAnswer": 0,
    "explanation": "In formal relational algebra, a relation is a set of tuples (rows)."
  },
  {
    "id": "dbms-rdb-03",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "easy",
    "question": "What is an 'Attribute' in relational database terminology?",
    "options": [
      "A named column (field) in a relation",
      "A table row",
      "A primary key value",
      "A database password"
    ],
    "correctAnswer": 0,
    "explanation": "Attributes represent the domain properties or columns defined across relation tuples."
  },
  {
    "id": "dbms-rdb-04",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "easy",
    "question": "What is the 'Cardinality' of a relational table?",
    "options": [
      "The total number of tuples (rows) in the relation",
      "The total number of columns",
      "The byte size of a table",
      "The number of indexes"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality represents the count of rows; Degree (or arity) represents the count of columns."
  },
  {
    "id": "dbms-rdb-05",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "medium",
    "question": "What is the 'Degree' (or Arity) of a relation?",
    "options": [
      "The total number of attributes (columns) in the relation",
      "The total number of rows",
      "The number of primary keys",
      "The temperature of the database server"
    ],
    "correctAnswer": 0,
    "explanation": "Degree is the number of attributes defining the relation schema."
  },
  {
    "id": "dbms-rdb-06",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "medium",
    "question": "What is a 'Domain' in the relational data model?",
    "options": [
      "The pool of allowable, atomic values from which an attribute can draw its values (data type and constraints)",
      "The web address of the database",
      "The user's permissions",
      "A table in the database"
    ],
    "correctAnswer": 0,
    "explanation": "A domain defines valid data type, format, and range constraints for an attribute."
  },
  {
    "id": "dbms-rdb-07",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "medium",
    "question": "What is 'Referential Integrity' in relational databases?",
    "options": [
      "A rule ensuring that a foreign key value must always reference a valid, existing primary key in the parent relation (or be null)",
      "All tables must have unique names",
      "Passwords must be updated every 30 days",
      "Every column must be an integer"
    ],
    "correctAnswer": 0,
    "explanation": "Referential integrity prevents orphaned child records by strictly enforcing valid foreign key relationships."
  },
  {
    "id": "dbms-rdb-08",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "medium",
    "question": "What is the result of the relational algebra Cartesian Product (R × S) of relation R (5 rows, 3 columns) and S (4 rows, 2 columns)?",
    "options": [
      "20 rows and 5 columns",
      "9 rows and 5 columns",
      "20 rows and 6 columns",
      "12 rows and 5 columns"
    ],
    "correctAnswer": 0,
    "explanation": "Cartesian product rows = 5 * 4 = 20; columns = 3 + 2 = 5."
  },
  {
    "id": "dbms-rdb-09",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "hard",
    "question": "What does the Relational Algebra 'Selection' (σ) operator do?",
    "options": [
      "Filters and returns tuples (rows) that satisfy a specified predicate condition",
      "Selects columns from a table",
      "Sorts table rows",
      "Joins two tables"
    ],
    "correctAnswer": 0,
    "explanation": "Selection (σ_condition(R)) acts as a horizontal filter equivalent to SQL WHERE."
  },
  {
    "id": "dbms-rdb-10",
    "category": "dbms",
    "topic": "Relational Databases",
    "difficulty": "hard",
    "question": "What does the Relational Algebra 'Projection' (π) operator do?",
    "options": [
      "Extracts specified attributes (columns) from a relation, discarding unlisted columns and removing duplicate tuples",
      "Selects rows matching a condition",
      "Creates a 3D model",
      "Projects query execution time"
    ],
    "correctAnswer": 0,
    "explanation": "Projection (π_attributes(R)) acts as a vertical filter equivalent to SQL SELECT column_names."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['dbms'] = dbmsData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dbmsData;
  }
})();
