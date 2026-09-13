/**
 * DevPilot-AI — Career Roadmap: Data Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const dataEngineerRoadmap = {
  roleId: 'data-engineer',
  roadmapId: 'dataEngineer',
  title: 'Data Engineer',
  category: 'data-ai',
  description: 'Design and build resilient, automated data platforms and pipelines: distributed SQL data modeling, ETL/ELT workflows, data warehouses (Snowflake / BigQuery), Apache Spark, Airflow orchestration, and streaming with Kafka.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Python for data engineering, advanced SQL, relational databases, and Linux/Git foundations.',
      skills: [
        {
          id: 'de-python-sql',
          title: 'Advanced SQL & Python for Data Engineering',
          category: 'Programming & Querying',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master core data engineering programming: Python file I/O, generator pipelines, advanced SQL (window functions, CTEs, indexing), and database connectivity (SQLAlchemy/psycopg2).',
          whatToLearn: [
            'Python generators and iterators (yield) for streaming multi-gigabyte datasets without memory blowup',
            'File formats: CSV, JSON lines, Parquet (columnar storage, compression with Snappy), and Avro',
            'Advanced SQL: complex multi-table joins, window functions (ROW_NUMBER, DENSE_RANK, LAG, LEAD), CTEs',
            'Database programming: connection pooling, parameterized queries, and batch bulk insertions (COPY FROM)',
            'Handling database transactions, isolation levels, and ACID properties in data extraction scripts'
          ],
          whyItMatters: 'Data engineers write data extraction scripts that run continuously on server clusters. Inefficient memory usage or SQL queries crash production pipelines.',
          productionUse: 'Extracting data from operational transactional databases, parsing raw logs, and staging raw files.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate batch database insertion scripts; verify connection pool sizes and memory consumption on large files.',
          handsOnTask: 'Write a Python generator pipeline that streams a 2GB raw JSON log file, cleans anomalies, and bulk-inserts validated rows into PostgreSQL.',
          projectApplication: 'Serves as the data extraction foundation for the Batch Data Warehouse project.',
          resources: [
            { title: 'Python for Data Analysis by Wes McKinney', url: 'https://wesmckinney.com/book/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'de-data-modeling',
          title: 'Data Modeling: Dimensional Modeling & Normalization',
          category: 'Data Architecture',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['de-python-sql'],
          description: 'Master analytical data modeling: OLTP vs OLAP, 3NF normalization vs Kimball Dimensional Modeling (Fact tables, Dimension tables, Star & Snowflake schemas).',
          whatToLearn: [
            'OLTP (Online Transaction Processing) vs OLAP (Online Analytical Processing) architectures',
            'Kimball Dimensional Modeling: Star Schema, Snowflake Schema, Galaxy Schema',
            'Fact table types: Transaction facts, Periodic snapshot facts, Accumulating snapshot facts',
            'Dimension table design: Conformed dimensions, Role-playing dimensions, Degenerate dimensions',
            'Slowly Changing Dimensions (SCD): Type 0 (Retain), Type 1 (Overwrite), Type 2 (Add new row with effective dates), Type 3 (Add column)'
          ],
          whyItMatters: 'A poorly modeled data warehouse leads to agonizingly slow analytical queries and constant confusion among data analysts.',
          productionUse: 'Architecting enterprise data warehouse schemas in Snowflake, BigQuery, and Databricks.',
          aiRelevance: 'Low',
          aiWorkflow: 'Dimensional modeling requires understanding company business metrics; AI often proposes overly normalized 3NF schemas inappropriate for OLAP.',
          handsOnTask: 'Design a Kimball Star Schema with Type 2 Slowly Changing Dimensions for a ride-sharing business modeling riders, drivers, trips, and fares.',
          projectApplication: 'Provides the dimensional schema for the Enterprise Cloud Data Warehouse project.',
          resources: [
            { title: 'The Data Warehouse Toolkit by Ralph Kimball', url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-toolkit/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Cloud data warehouses (Snowflake / BigQuery), modern ELT with dbt, and automated data quality testing.',
      skills: [
        {
          id: 'de-cloud-warehouse',
          title: 'Cloud Data Warehousing: Snowflake & Google BigQuery',
          category: 'Data Warehouses',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['de-data-modeling'],
          description: 'Master modern cloud data warehouses: Snowflake / BigQuery architecture, columnar storage, micro-partitioning, clustering keys, and cost optimization.',
          whatToLearn: [
            'Cloud warehouse architecture: separation of compute and storage (Snowflake Virtual Warehouses / BigQuery Slots)',
            'Columnar storage formats and how they dramatically accelerate analytical aggregation queries',
            'Micro-partitioning and data clustering keys to prune unneeded partitions during scans',
            'Data staging and loading: external stages (AWS S3, GCS), COPY INTO commands, and Snowpipe automated continuous ingestion',
            'Time Travel, Zero-Copy Cloning, and Data Sharing features in Snowflake'
          ],
          whyItMatters: 'Cloud data warehouses are the central nervous system of modern enterprise analytics, storing petabytes of business data queryable in seconds.',
          productionUse: 'Enterprise business intelligence storage, customer data platforms, and cross-department analytics.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate DDL scripts and external table staging definitions for cloud storage buckets.',
          handsOnTask: 'Configure a Snowflake/BigQuery warehouse, load 10 million rows from an S3 external stage, and optimize partition clustering keys to reduce query scan costs.',
          projectApplication: 'Houses the data storage layer for the Enterprise Cloud Data Warehouse project.',
          resources: [
            { title: 'Snowflake Documentation', url: 'https://docs.snowflake.com/', type: 'documentation' },
            { title: 'Google BigQuery Documentation', url: 'https://cloud.google.com/bigquery/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'de-dbt-transformation',
          title: 'Data Transformation with dbt (data build tool)',
          category: 'Data Transformation',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['de-cloud-warehouse'],
          description: 'Master modular data transformations with dbt: Jinja templating, models (views, tables, incremental), lineage DAGs, generic and custom data quality tests, and documentation generation.',
          whatToLearn: [
            'The Modern Data Stack (MDS) ELT paradigm: Extract & Load first, then Transform in-warehouse with dbt',
            'dbt model layering: Staging (stg_), Intermediate (int_), and Marts (fct_, dim_) models',
            'Materialization strategies: view, table, ephemeral, and incremental (merge vs append strategies)',
            'Jinja templating and dbt macros for reusable transformation logic across tables',
            'Automated data quality testing in dbt: unique, not_null, accepted_values, relationships (referential integrity)',
            'Auto-generating interactive data lineage dependency graphs (DAGs) and data catalog documentation'
          ],
          whyItMatters: 'dbt brings software engineering best practices (version control, modularity, automated testing, CI/CD) to SQL data transformations.',
          productionUse: 'Standard data transformation layer across modern technology companies.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to scaffold dbt YAML model documentation and schema test configurations; verify incremental SQL logic carefully.',
          handsOnTask: 'Build a multi-layered dbt project with 15 models, incremental materialization, automated data tests, and a deployed lineage documentation site.',
          projectApplication: 'Transforms raw staged data into analytics-ready tables in the Enterprise Cloud Data Warehouse project.',
          resources: [
            { title: 'dbt Official Tutorial', url: 'https://docs.getdbt.com/docs/build/projects', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Pipeline orchestration with Apache Airflow, distributed processing with Apache Spark / PySpark, and Docker.',
      skills: [
        {
          id: 'de-airflow-orchestration',
          title: 'Workflow Orchestration with Apache Airflow',
          category: 'Orchestration',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['de-dbt-transformation'],
          description: 'Orchestrate complex dependent data pipelines: Directed Acyclic Graphs (DAGs), Operators, Sensors, Taskflow API, scheduling (cron), retries, and backfilling.',
          whatToLearn: [
            'Airflow architecture: Webserver, Scheduler, Metadata Database, and Workers (Celery / Kubernetes executor)',
            'Defining DAGs in Python: dependencies (task_a >> task_b), default args, schedule intervals (cron / timetable)',
            'Operators: BashOperator, PythonOperator, PostgresOperator, DockerOperator, and custom operators',
            'Sensors: FileSensor, ExternalTaskSensor, and poke vs reschedule mode for efficient resource usage',
            'Taskflow API (@dag, @task decorators) for clean, idiomatic Python pipeline definitions',
            'Pipeline reliability: SLA alerts, retries with exponential delay, catchup=False, and safe historical backfilling'
          ],
          whyItMatters: 'Data pipelines fail constantly due to network timeouts, schema changes, and upstream delays. Airflow coordinates retries and alerts automatically.',
          productionUse: 'Running daily and hourly batch pipelines, triggering dbt runs, and orchestrating ML feature updates.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate boilerplate Airflow DAG definitions and cron expressions; verify execution timeouts and sensor reschedule modes.',
          handsOnTask: 'Build an Airflow DAG with 6 interconnected tasks that extracts external API data, stages it, runs dbt transformations, and alerts Slack upon failure.',
          projectApplication: 'Provides automated pipeline orchestration for the End-to-End Automated Data Platform.',
          resources: [
            { title: 'Apache Airflow Official Documentation', url: 'https://airflow.apache.org/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'de-spark-distributed',
          title: 'Distributed Big Data Processing with Apache Spark & PySpark',
          category: 'Distributed Computing',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['de-python-sql'],
          description: 'Process massive multi-terabyte datasets across distributed clusters: Spark architecture (Driver vs Executors), PySpark DataFrames, partitions, shuffles, and broadcast joins.',
          whatToLearn: [
            'Spark architecture: Driver node, Cluster Manager, Worker nodes, Executors, memory storage vs execution fractions',
            'Transformations (lazy evaluation, map, filter) vs Actions (eager execution, count, collect, write)',
            'PySpark DataFrame API: filtering, grouping, aggregating, window functions, and user-defined functions (UDFs)',
            'Data partitioning: repartition vs coalesce, partition pruning, and avoiding data skew in keys',
            'Shuffle operations: wide dependencies vs narrow dependencies, and optimizing with Broadcast Joins',
            'Optimized data lake formats: reading and writing Parquet and Delta Lake tables with ACID guarantees'
          ],
          whyItMatters: 'When data exceeds what a single machine can hold in RAM or disk, distributed computing engines like Spark are mandatory.',
          productionUse: 'ETL on terabyte-scale clickstream logs, financial transactions, and feature extraction for machine learning models.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft PySpark DataFrame queries; inspect the Spark Web UI DAG physical plan to eliminate expensive shuffles manually.',
          handsOnTask: 'Process a 20-million row public dataset (e.g., NYC Taxi trip records) in PySpark, apply transformations, and write partitioned Parquet files.',
          projectApplication: 'Powers the heavy distributed compute engine in the Lakehouse Architecture project.',
          resources: [
            { title: 'Spark: The Definitive Guide by Bill Chambers & Matei Zaharia', url: 'https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Real-time streaming with Apache Kafka, lakehouse architectures (Delta Lake), data contracts, and data quality testing.',
      skills: [
        {
          id: 'de-kafka-streaming',
          title: 'Real-Time Event Streaming with Apache Kafka',
          category: 'Streaming Systems',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['de-airflow-orchestration'],
          description: 'Build real-time event streaming pipelines: Kafka topics, partitions, producers, consumer groups, offsets, Schema Registry, and Spark Structured Streaming.',
          whatToLearn: [
            'Kafka architecture: Brokers, Topics, Partitions, Replicas, Leader vs Follower, ZooKeeper vs KRaft mode',
            'Producers: message keys, partitioners, acknowledgments (acks=all), idempotence, and retries',
            'Consumers: Consumer Groups, offset commits (auto vs manual), rebalancing, and consumer lag monitoring',
            'Schema Registry: Avro / Protobuf schema enforcement, schema evolution (backward/forward compatibility)',
            'Spark Structured Streaming: reading from Kafka streams, watermarking, sliding windows, and writing to sink tables'
          ],
          whyItMatters: 'Modern businesses cannot wait 24 hours for daily batch jobs to discover fraud or inventory shortages; data must flow in milliseconds.',
          productionUse: 'Real-time fraud detection, live user telemetry streaming, IoT sensor ingestion, and event-driven microservice communication.',
          aiRelevance: 'Low',
          aiWorkflow: 'Streaming semantics (at-least-once, exactly-once, watermarking) are intricate; test partition failure scenarios on real Kafka clusters.',
          handsOnTask: 'Build a real-time event pipeline where simulated IoT sensor events are published to Kafka, processed with Spark Structured Streaming, and saved to a live database.',
          projectApplication: 'Core streaming engine for the Real-Time Clickstream & Fraud Ingestion Platform.',
          resources: [
            { title: 'Kafka: The Definitive Guide by Gwen Shapira et al.', url: 'https://www.oreilly.com/library/view/kafka-the-definitive/9781492043072/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'de-data-quality-contracts',
          title: 'Data Quality, Data Contracts & Lakehouse Architecture (Delta Lake)',
          category: 'Data Governance & Lakehouse',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['de-spark-distributed'],
          description: 'Prevent upstream data breakage: Data Contracts, automated quality validation with Great Expectations / Soda, and Lakehouse architectures using Delta Lake / Apache Iceberg.',
          whatToLearn: [
            'The Lakehouse paradigm: combining the flexibility of object storage (S3/GCS) with the ACID transactions of warehouses',
            'Delta Lake / Apache Iceberg features: ACID transactions, schema enforcement, schema evolution, and time travel',
            'Data Quality testing: Great Expectations test suites (expect_column_values_to_not_be_null, expect_column_values_to_be_between)',
            'Data Contracts: defining strict producer-consumer API schemas to prevent upstream developers from breaking analytical pipelines',
            'Data Observability: tracking freshness, volume anomalies, schema drift, and lineage tracing (OpenLineage)'
          ],
          whyItMatters: 'Bad data flowing into machine learning models and dashboards causes incorrect business decisions and damages organizational trust in data teams.',
          productionUse: 'Ensuring enterprise regulatory compliance (GDPR), preventing data downtime, and providing reliable data to AI teams.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate initial Great Expectations suite JSON configurations from sample datasets.',
          handsOnTask: 'Implement a Delta Lake pipeline with automated Great Expectations assertions that automatically quarantines corrupt records without halting the pipeline.',
          projectApplication: 'Provides data quality gates and ACID lakehouse storage for the capstone projects.',
          resources: [
            { title: 'Delta Lake Official Documentation', url: 'https://docs.delta.io/', type: 'documentation' },
            { title: 'Great Expectations Documentation', url: 'https://docs.greatexpectations.io/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Cloud infrastructure deployment, data engineering system design interviews, and portfolio showcase.',
      skills: [
        {
          id: 'de-system-design',
          title: 'Data Engineering System Design & Technical Interviews',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['de-kafka-streaming', 'de-data-quality-contracts'],
          description: 'Master data engineering interviews: distributed pipeline system design (e.g., designing Uber’s surge pricing pipeline or Netflix’s viewing history platform), SQL/Python live coding, and back-of-the-envelope storage estimation.',
          whatToLearn: [
            'System Design for Data: Batch vs Streaming architectures, Lambda vs Kappa architecture tradeoffs',
            'Back-of-the-envelope estimation for storage, throughput, network bandwidth, and partition counts',
            'Classic Data System Design problems: Design a Web Crawler Pipeline, Real-Time Top-K Leaderboard, Financial Transaction Ingestion Engine',
            'Data modeling interview rounds: designing star schemas under ambiguous business requirements on a whiteboard',
            'Behavioral interviews using STAR: communicating pipeline downtime incidents, handling technical debt, and cross-team SLAs'
          ],
          whyItMatters: 'Senior data engineering roles are won or lost in distributed system design and data modeling whiteboard rounds.',
          productionUse: 'Architecting scalable cloud data platforms that serve company-wide analytics and machine learning.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as a mock interviewer to challenge your pipeline architectures on data skew, partition bottlenecks, and failover recovery.',
          handsOnTask: 'Complete 5 full-length mock Data Engineering System Design architectural specifications detailing ingest, storage, transform, and serving tiers.',
          projectApplication: 'Prepares you directly for top-tier data engineering technical loops.',
          resources: [
            { title: 'Data Engineering System Design Guide (GitHub)', url: 'https://github.com/datastacktv/data-engineer-roadmap', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'de-portfolio-resume',
          title: 'Data Engineering Portfolio, Architecture Diagrams & Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['de-system-design'],
          description: 'Package your data pipelines into an engineering portfolio: architecture diagrams, reproducible Docker Compose setups, data lineage graphs, and a quantifiable ATS resume.',
          whatToLearn: [
            'Documenting data pipelines: clear architectural flowcharts (Draw.io/Excalidraw/Mermaid) showing raw, staged, and serving layers',
            'Providing one-command local reproduction: docker-compose up running Airflow, Postgres, and Spark clusters locally',
            'Writing quantifiable data engineering resume bullets (e.g., "Reduced daily pipeline latency by 45% by migrating from...")',
            'Targeting high-value keywords matching enterprise data engineering job descriptions'
          ],
          whyItMatters: 'Data engineers work under the hood without a visual UI; clean architecture diagrams and reproducible code repositories prove you can build real platforms.',
          productionUse: 'Demonstrating technical credibility to data engineering managers and hiring committees.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to audit resume bullets for measurable engineering impact metrics and pipeline scale keywords.',
          handsOnTask: 'Publish your capstone data platform repository with a one-command Docker Compose setup, comprehensive architecture diagram, and automated CI tests.',
          projectApplication: 'Presents your complete data engineering body of work to hiring teams.',
          resources: [
            { title: 'Awesome Data Engineering Resources', url: 'https://github.com/igorbarinov/awesome-data-engineering', type: 'showcase' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'de-proj-1',
      title: 'Automated Batch Data Warehouse & dbt Transformation Pipeline',
      difficulty: 'Beginner',
      estimatedTime: '3-4 weeks',
      objective: 'Build an automated dimensional data warehouse using PostgreSQL or Snowflake, dimensional Kimball modeling, dbt transformations, and data quality tests.',
      technologies: ['Python', 'PostgreSQL / Snowflake', 'dbt-core', 'Docker', 'Git'],
      skillsPracticed: ['Star schema modeling', 'dbt staging and marts', 'Incremental models', 'Data quality testing', 'Data lineage documentation'],
      requirements: [
        'Extract raw transaction records from external source files and load into raw warehouse staging tables',
        'Kimball dimensional model with 1 fact table (fct_orders) and 3 dimension tables (dim_customers, dim_products, dim_dates)',
        'dbt project with staging, intermediate, and marts layers utilizing incremental table materializations',
        'Automated dbt schema tests verifying unique keys, non-null values, and referential integrity'
      ],
      deliverables: [
        'GitHub repository with complete dbt project and Docker Compose environment',
        'Auto-generated dbt documentation site displaying data catalog and lineage DAG',
        'Technical write-up explaining dimensional modeling trade-offs'
      ],
      productionExpectations: [
        '100% passing data quality tests on automated runs',
        'Idempotent data transformations that can be re-run without creating duplicate rows'
      ],
      aiIntegration: 'Use AI to generate mock transactional order datasets and validate dbt YAML schema test syntax.'
    },
    {
      id: 'de-proj-2',
      title: 'End-to-End Orchestrated Data Platform with Airflow & Spark',
      difficulty: 'Intermediate',
      estimatedTime: '5 weeks',
      objective: 'Develop a production-grade data platform running in Docker: Apache Airflow orchestrating PySpark data processing, dbt transformations, and automated Slack failure alerts.',
      technologies: ['Apache Airflow', 'Apache Spark (PySpark)', 'Snowflake / BigQuery', 'Docker Compose', 'Great Expectations', 'Slack Webhooks'],
      skillsPracticed: ['Airflow DAG authoring', 'PySpark distributed processing', 'Data quality validation', 'Task dependency management', 'Error alerting'],
      requirements: [
        'Airflow DAG scheduled daily that extracts multi-gigabyte raw files, triggers a PySpark processing job, and loads staged Parquet files',
        'PySpark transformation script performing deduplication, schema validation, and partition optimizations',
        'Automated Great Expectations validation step that halts downstream jobs if data quality thresholds fail',
        'Integrated Slack webhook operator sending instant alerts with execution logs upon pipeline failures'
      ],
      deliverables: [
        'Complete Docker Compose cluster running Airflow (Webserver, Scheduler, Celery Worker, Postgres)',
        'Documented DAG Python files adhering to Airflow Taskflow API conventions',
        'Data quality validation report showing automated assertion results'
      ],
      productionExpectations: [
        'Safe historical backfilling support with catchup=False and deterministic execution dates',
        'Zero resource starvation on Airflow worker nodes'
      ],
      aiIntegration: 'Use AI to generate sample Airflow Taskflow Python snippets and formulate Great Expectations assertion suites.'
    },
    {
      id: 'de-proj-3',
      title: 'Real-Time Clickstream Ingestion & Streaming Lakehouse Platform',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise real-time streaming platform using Apache Kafka, Spark Structured Streaming, and Delta Lake with sub-minute analytical queries.',
      technologies: ['Apache Kafka', 'Spark Structured Streaming', 'Delta Lake / Iceberg', 'Python', 'Docker & AWS S3', 'Grafana'],
      skillsPracticed: ['Real-time streaming', 'Kafka partition management', 'Watermarking', 'Lakehouse ACID transactions', 'Stream monitoring'],
      requirements: [
        'High-throughput Python event producer streaming synthetic e-commerce clickstream events into partitioned Kafka topics',
        'Spark Structured Streaming job consuming Kafka streams, applying 10-minute watermarking to handle late-arriving events',
        'Writing clean, deduplicated events directly into an ACID Delta Lake storage table on AWS S3 / MinIO',
        'Grafana dashboard monitoring Kafka consumer group lag, message throughput per second, and Spark micro-batch processing latency'
      ],
      deliverables: [
        'Fully reproducible multi-container streaming environment with complete setup scripts',
        'Architecture RFC document detailing stream partitioning, watermark retention, and failure recovery',
        'Benchmark report proving the pipeline sustains 10,000 events/second with sub-10 second end-to-end latency'
      ],
      productionExpectations: [
        'Exactly-once processing semantics through Kafka checkpointing and Delta Lake idempotent writes',
        'Zero data loss during simulated broker crash and restart scenarios'
      ],
      aiIntegration: 'Use AI to simulate randomized clickstream event generation patterns and evaluate Kafka consumer group rebalancing behavior.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Advanced SQL fluency: complex multi-table joins, window functions, and CTEs',
      'Python data engineering proficiency: generators, file parsing, and database drivers',
      'Kimball Dimensional Modeling: Fact tables, Dimension tables, and Star Schemas',
      'Cloud data warehouse mastery (Snowflake or Google BigQuery)',
      'Data transformation with dbt: staging/marts layers, incremental models, and macros',
      'Workflow orchestration with Apache Airflow: DAGs, Taskflow API, and sensors',
      'Distributed computing with Apache Spark & PySpark: DataFrames, partitioning, and shuffles',
      'Real-time streaming with Apache Kafka: topics, partitions, consumer groups, and schemas',
      'Data quality automation with Great Expectations or dbt tests',
      'Modern Lakehouse architectures: Delta Lake or Apache Iceberg with ACID transactions'
    ],
    projects: [
      'Automated batch data warehouse with dimensional modeling and dbt transformations',
      'End-to-end orchestrated data platform with Apache Airflow, PySpark, and alerts',
      'Real-time streaming clickstream ingestion platform with Kafka, Spark, and Delta Lake',
      'All projects containerized with Docker and reproducible via single commands'
    ],
    csFundamentals: [
      'Distributed computing theory: map-reduce, partitioning, shuffles, data skew',
      'Database storage engines: row-oriented (B-Tree) vs columnar (Parquet/ORC) storage',
      'Streaming theory: event time vs processing time, watermarks, exactly-once semantics',
      'Networking and cluster architecture: master-worker nodes, distributed consensus (ZooKeeper/KRaft)'
    ],
    tools: [
      'Orchestration platforms: Apache Airflow, Prefect, or Dagster',
      'Cloud warehouses: Snowflake, BigQuery, or Databricks',
      'Data transformation tools: dbt-core and SQLFluff linter',
      'Docker and Docker Compose for local multi-service data cluster simulation'
    ],
    deployment: [
      'Deploying containerized Airflow and Spark workloads to cloud infrastructure',
      'Managing external cloud storage stages (AWS S3, Google Cloud Storage)',
      'Automated CI/CD pipelines testing dbt models and validating SQL syntax before merge',
      'Secrets and connection management using Airflow connections and environment variables'
    ],
    portfolio: [
      'Data engineering portfolio featuring comprehensive system architecture flowcharts',
      'In-depth technical write-ups detailing pipeline data modeling and performance benchmarks',
      'Auto-generated dbt data catalog documentation and lineage DAG links',
      'Clear documentation explaining business value, data throughput, and cost optimizations'
    ],
    github: [
      'Public GitHub repositories with clean docker-compose.yml setups for immediate testing',
      'Comprehensive READMEs with architecture diagrams and sample data outputs',
      'Automated CI testing badges verifying dbt compile and Python unit tests',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-optimized Data Engineer resume in standard PDF format',
      'Bullet points highlighting pipeline scale: data volume (TB/PB), throughput (QPS), and latency reduction',
      'Direct links to GitHub repositories, architecture diagrams, and LinkedIn profile',
      'Targeted keywords matching data platform engineer, analytics engineer, and ETL developer roles'
    ],
    interviewReadiness: [
      'Mastery of live advanced SQL coding challenges under 30-minute time constraints',
      'Fluency in distributed Data Engineering System Design whiteboard interviews',
      'Ability to explain streaming concepts (watermarking, consumer lag, exactly-once delivery)',
      'Structured STAR stories detailing past pipeline outages, data quality bugs, and scale migrations'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['dataEngineer'] = dataEngineerRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dataEngineerRoadmap;
}
