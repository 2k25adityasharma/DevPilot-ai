/**
 * DevPilot-AI — Career Roadmap: Cloud Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const cloudRoadmap = {
  roleId: 'cloud-engineer',
  roadmapId: 'cloud',
  title: 'Cloud Engineer',
  category: 'devops-cloud',
  description: 'Design, architect, and manage enterprise cloud infrastructure: AWS / Azure core services, VPC networking, IAM security, compute (EC2, ECS, Lambda), managed databases, Infrastructure as Code (Terraform), and high-availability cloud architecture.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Cloud computing concepts, Linux administration, networking fundamentals, and AWS core primitives.',
      skills: [
        {
          id: 'cld-cloud-foundations',
          title: 'Cloud Architecture Fundamentals & AWS Core Services',
          category: 'Cloud Basics',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: [],
          description: 'Master cloud computing fundamentals: IaaS vs PaaS vs SaaS, Shared Responsibility Model, AWS Regions and Availability Zones, billing management, and AWS CLI.',
          whatToLearn: [
            'Cloud service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS)',
            'Public vs Private vs Hybrid cloud architectures',
            'AWS Global Infrastructure: Regions, Availability Zones (AZs), Edge Locations, and low-latency networking',
            'AWS Shared Responsibility Model: Security OF the cloud (AWS) vs Security IN the cloud (Customer)',
            'AWS CLI configuration: programmatic access keys, AWS profiles, and managing resources from terminal'
          ],
          whyItMatters: 'Understanding multi-AZ redundancy and the shared responsibility model prevents single-point-of-failure architectures and security violations.',
          productionUse: 'Architecting disaster-resilient cloud applications and interacting with cloud provider APIs.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to explain AWS pricing calculators and service tier differences; verify billing limits and MFA manually.',
          handsOnTask: 'Configure an AWS account with multi-factor authentication (MFA), billing budget alerts, and launch an EC2 instance via AWS CLI.',
          projectApplication: 'Provides the account and credential foundation for all cloud infrastructure projects.',
          resources: [
            { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', type: 'course' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cld-vpc-networking',
          title: 'Cloud Networking: Amazon VPC, Subnets & Routing',
          category: 'Cloud Networking',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cld-cloud-foundations'],
          description: 'Design isolated cloud network topologies: Virtual Private Cloud (VPC), public vs private subnets, Internet Gateways, NAT Gateways, Route Tables, Security Groups, and Network ACLs.',
          whatToLearn: [
            'Amazon VPC design: CIDR block allocation (/16 primary block, /24 subnet blocks)',
            'Public subnets (Internet Gateway attached) vs Private subnets (NAT Gateway for outbound internet)',
            'Route Tables: managing traffic routing rules between subnets, gateways, and VPC endpoints',
            'Network security controls: Security Groups (stateful instance firewall) vs Network ACLs (stateless subnet firewall)',
            'VPC Peering, Transit Gateway basics, and private VPC Endpoints (AWS PrivateLink) to keep traffic internal'
          ],
          whyItMatters: 'Improper network design leaves databases and private servers exposed directly to the public internet, inviting automated attacks.',
          productionUse: 'Creating secure, isolated network perimeters for enterprise databases and backend application clusters.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to verify CIDR subnet mathematical calculations and cross-AZ routing tables.',
          handsOnTask: 'Build a production multi-AZ VPC from scratch with 2 public subnets, 2 private subnets, NAT Gateways, and isolated database subnets.',
          projectApplication: 'Core network foundation for the High-Availability Multi-Tier Web Application project.',
          resources: [
            { title: 'AWS VPC Documentation', url: 'https://docs.aws.amazon.com/vpc/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'IAM security, compute services (EC2, Auto Scaling, Lambda), and object/block storage (S3, EBS).',
      skills: [
        {
          id: 'cld-iam-security',
          title: 'Cloud Security & Identity and Access Management (IAM)',
          category: 'Security & Access',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['cld-vpc-networking'],
          description: 'Enforce enterprise security: IAM Users, Groups, Roles, Policies (JSON), Principle of Least Privilege, temporary credentials (STS), and AWS Organizations / SCPs.',
          whatToLearn: [
            'IAM entities: Root user security, IAM Users vs federated Single Sign-On (SSO / IAM Identity Center)',
            'IAM Policies: JSON policy structure (Version, Statement, Effect, Principal, Action, Resource, Condition)',
            'IAM Roles and Instance Profiles: granting EC2 instances and Lambda functions temporary permissions without static keys',
            'AWS Security Token Service (STS) and cross-account access assume role patterns',
            'Service Control Policies (SCPs) in multi-account AWS Organizations architectures'
          ],
          whyItMatters: 'Over-permissive IAM policies and hardcoded static credentials account for the majority of cloud data breaches.',
          productionUse: 'Securing cloud access, granting microservices least-privilege permissions, and complying with SOC2/ISO 27001.',
          aiRelevance: 'Low',
          aiWorkflow: 'Never trust AI-generated IAM policies with wildcards ("Action": "*"); always audit IAM access analyzer reports.',
          handsOnTask: 'Create an IAM Role with least-privilege permissions that allows an EC2 instance to read from a specific S3 bucket and write to CloudWatch logs with zero static credentials.',
          projectApplication: 'Secures all server instances and database access across all cloud projects.',
          resources: [
            { title: 'AWS IAM Best Practices', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cld-compute-storage',
          title: 'Compute & Storage: EC2, Auto Scaling, S3 & EBS',
          category: 'Compute & Storage',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cld-iam-security'],
          description: 'Master core compute and storage: Amazon EC2 instance families, Auto Scaling Groups (ASG), Launch Templates, Elastic Load Balancers (ALB), Elastic Block Store (EBS), and Amazon S3.',
          whatToLearn: [
            'EC2 instance selection: General purpose (t4g, m6i), Compute optimized (c6i), Memory optimized (r6i), Spot instances',
            'Elastic Block Store (EBS): Volume types (gp3, io2), snapshots, volume encryption with AWS KMS',
            'High availability compute: Launch Templates, Auto Scaling Groups (target tracking scaling policies, health checks)',
            'Application Load Balancers (ALB): path-based routing, target groups, SSL offloading, and health checks',
            'Amazon S3: Storage classes (Standard, Infrequent Access, Glacier), bucket policies, lifecycle rules, versioning, presigned URLs'
          ],
          whyItMatters: 'Combining Auto Scaling Groups with Application Load Balancers ensures applications survive traffic surges and server crashes automatically.',
          productionUse: 'Hosting scalable web platforms, serving static assets globally, and managing persistent database block storage.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate EC2 user-data startup bash scripts; verify IAM role attachments and security group port rules manually.',
          handsOnTask: 'Deploy an auto-scaling cluster of web servers across 2 Availability Zones behind an Application Load Balancer with automated health-check replacement.',
          projectApplication: 'Core compute layer for the High-Availability Multi-Tier Web Application project.',
          resources: [
            { title: 'AWS EC2 User Guide', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Relational & NoSQL databases (RDS, DynamoDB), Infrastructure as Code with Terraform, and domain routing with Route 53.',
      skills: [
        {
          id: 'cld-databases-storage',
          title: 'Managed Cloud Databases: Amazon RDS & DynamoDB',
          category: 'Cloud Databases',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cld-compute-storage'],
          description: 'Deploy enterprise managed database services: Amazon RDS (PostgreSQL/MySQL), Multi-AZ failover, Read Replicas, automated backups, and Amazon DynamoDB NoSQL design.',
          whatToLearn: [
            'Amazon RDS: Subnet groups in private subnets, instance sizing, automated backups and point-in-time recovery (PITR)',
            'High availability: RDS Multi-AZ synchronous replication for automated disaster failover',
            'Scalability: RDS Read Replicas for offloading read traffic and scaling read throughput',
            'Amazon Aurora: cloud-native storage engine, multi-region replication, Aurora Serverless v2',
            'Amazon DynamoDB: single-table design, partition keys, sort keys, Global Secondary Indexes (GSI), DynamoDB Streams'
          ],
          whyItMatters: 'Managing self-hosted databases on raw EC2 requires round-the-clock maintenance. Managed RDS handles automated patching, replication, and disaster recovery.',
          productionUse: 'Storing customer data, high-concurrency shopping carts, and transactional ledgers.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft DynamoDB single-table access pattern schemas; review partition key cardinality to avoid hot partitions.',
          handsOnTask: 'Provision an RDS PostgreSQL Multi-AZ cluster in private subnets and configure an automated backup snapshot and replica failover test.',
          projectApplication: 'Provides the persistent database tier for the High-Availability Multi-Tier Web Application project.',
          resources: [
            { title: 'Amazon RDS User Guide', url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cld-terraform-cloud',
          title: 'Cloud Infrastructure as Code with Terraform',
          category: 'Infrastructure as Code',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['cld-databases-storage'],
          description: 'Codify entire cloud architectures with Terraform: modular infrastructure, remote S3 state backends with DynamoDB locking, environment parameterization (Dev, Staging, Prod), and tfsec auditing.',
          whatToLearn: [
            'HashiCorp Configuration Language (HCL) syntax: resources, data sources, variables, outputs, and local values',
            'Remote state architecture: storing state in versioned S3 buckets, state locking with DynamoDB, preventing concurrent corruption',
            'Reusable custom Terraform modules: VPC module, Compute module, RDS module, Security module',
            'Managing multi-environment infrastructure: workspaces vs directory-based environment segregation',
            'Infrastructure security auditing with tfsec and Checkov to detect misconfigurations before deployment'
          ],
          whyItMatters: 'Manual configuration leads to configuration drift and unrepeatable deployments. Terraform defines your entire cloud footprint as reproducible code.',
          productionUse: 'Provisioning multi-account cloud landing zones, automated staging environments, and production clusters.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate boilerplate Terraform module blocks; always inspect terraform plan diffs before applying changes.',
          handsOnTask: 'Write a modular Terraform configuration that provisions a complete multi-tier AWS environment (VPC, ALB, Auto Scaling EC2, RDS PostgreSQL) with remote state.',
          projectApplication: 'Automates provisioning for all cloud project deliverables.',
          resources: [
            { title: 'Terraform AWS Provider Documentation', url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Serverless architectures (Lambda, API Gateway), container services (ECS Fargate), and cloud observability with CloudWatch.',
      skills: [
        {
          id: 'cld-serverless-containers',
          title: 'Serverless Architectures (AWS Lambda) & Containers (ECS Fargate)',
          category: 'Serverless & Containers',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['cld-terraform-cloud'],
          description: 'Architect modern microservices: AWS Lambda, API Gateway, EventBridge event routing, Amazon ECS with AWS Fargate (serverless containers), and AWS ECR.',
          whatToLearn: [
            'AWS Lambda: event-driven compute, cold starts, memory allocation, execution timeouts, VPC networking integration',
            'Amazon API Gateway: REST APIs, HTTP APIs, request throttling, authorizers, and CORS configuration',
            'Amazon EventBridge & SQS/SNS: asynchronous event-driven decoupling and fan-out notification architectures',
            'Amazon Elastic Container Service (ECS): Task Definitions, Services, cluster management, AWS Fargate serverless launch type',
            'Amazon Elastic Container Registry (ECR): automated image scanning, lifecycle policies, and immutable image tags'
          ],
          whyItMatters: 'Serverless and managed containers eliminate operating system patch management and automatically scale from zero to thousands of concurrent requests.',
          productionUse: 'Building microservice APIs, background event processors, webhook listeners, and scheduled cron workflows.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Serverless Framework or AWS SAM template YAML; inspect Lambda execution role permissions manually.',
          handsOnTask: 'Build a serverless REST API using API Gateway, AWS Lambda, DynamoDB, and Cognito user authentication with automated Terraform deployment.',
          projectApplication: 'Core architecture for the Serverless Event-Driven Microservices Platform project.',
          resources: [
            { title: 'Serverless Land (AWS Serverless Patterns)', url: 'https://serverlessland.com/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cld-observability-governance',
          title: 'Cloud Monitoring, Logging & Cost Optimization (CloudWatch & FinOps)',
          category: 'Monitoring & FinOps',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['cld-serverless-containers'],
          description: 'Monitor, audit, and optimize cloud systems: Amazon CloudWatch (Metrics, Logs Insights, Alarms), AWS CloudTrail audit logging, AWS Config compliance, and FinOps cloud cost optimization.',
          whatToLearn: [
            'Amazon CloudWatch: custom metrics, CloudWatch Alarms with SNS notifications, CloudWatch Logs Insights query syntax',
            'AWS CloudTrail: tracking API calls, auditing security events, detecting unauthorized access attempts',
            'AWS Config: continuous compliance monitoring, automated remediation rules for non-compliant resources',
            'Cloud financial management (FinOps): AWS Cost Explorer, Budgets, Savings Plans, Reserved Instances, right-sizing unutilized resources'
          ],
          whyItMatters: 'Unmonitored cloud environments lead to silent system outages and shocking six-figure surprise cloud bills at the end of the month.',
          productionUse: 'Tracking production cloud health, auditing regulatory compliance, and cutting corporate cloud spending by 30-50%.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate CloudWatch Logs Insights queries to pinpoint application error spikes in log files.',
          handsOnTask: 'Create an automated CloudWatch dashboard, configure alarm notifications to Slack for 5xx errors, and run AWS Cost Explorer optimization audits.',
          projectApplication: 'Monitors and audits all cloud infrastructure deliverables.',
          resources: [
            { title: 'AWS Well-Architected Framework: Cost Optimization Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'AWS Solutions Architect design interviews, multi-region disaster recovery, and engineering portfolio.',
      skills: [
        {
          id: 'cld-interview-wellarchitected',
          title: 'AWS Solutions Architecture Interviews & Well-Architected Framework',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cld-observability-governance'],
          description: 'Master senior cloud architecture interviews: AWS Well-Architected Framework (Operational Excellence, Security, Reliability, Performance, Cost, Sustainability), and multi-region disaster recovery.',
          whatToLearn: [
            'The 6 Pillars of the AWS Well-Architected Framework: applying trade-offs systematically to business scenarios',
            'Multi-Region Disaster Recovery architectures: Backup & Restore, Pilot Light, Warm Standby, Multi-Region Active-Active',
            'Route 53 DNS routing policies: Latency-based, Geolocation, Weighted, and Failover routing with health checks',
            'Cloud architecture whiteboard interview rounds: designing Netflix streaming on AWS, high-traffic gaming backend, or banking data residency'
          ],
          whyItMatters: 'Solutions Architect and Cloud Engineer interviews evaluate your ability to make defensible cloud design decisions balancing cost against availability.',
          productionUse: 'Leading enterprise cloud migrations and architecting mission-critical platforms.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive interviewer to probe your multi-region architecture designs for single points of failure.',
          handsOnTask: 'Produce a comprehensive AWS Well-Architected Review document for an enterprise financial services application detailing security, RTO/RPO, and cost models.',
          projectApplication: 'Prepares you directly for AWS Solutions Architect and Cloud Engineer interview loops.',
          resources: [
            { title: 'AWS Well-Architected Tool & Documentation', url: 'https://aws.amazon.com/architecture/well-architected/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cld-portfolio-resume',
          title: 'Cloud Engineering Portfolio, Architecture Case Studies & Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['cld-interview-wellarchitected'],
          description: 'Package cloud projects into an engineering portfolio: high-resolution cloud architecture diagrams, clean Terraform codebases, and an ATS-optimized resume.',
          whatToLearn: [
            'Creating publication-quality AWS architecture diagrams adhering to official AWS Architecture Icon guidelines',
            'Writing technical cloud case studies: Business Context, Architectural Decisions, Failure Mode Analysis, Cost Projections',
            'Crafting quantifiable resume bullets highlighting high availability metrics (99.99%), cloud cost savings ($K/month), and automated provisioning',
            'Preparing for cloud certification discussions (AWS Solutions Architect Associate / Professional)'
          ],
          whyItMatters: 'Demonstrating modular Terraform repositories and clear architecture diagrams sets you apart from candidates who only possess theoretical multiple-choice certifications.',
          productionUse: 'Securing Cloud Engineer, Solutions Architect, and Cloud Infrastructure Developer positions.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to audit resume bullet points against enterprise cloud job postings for missing technical competencies.',
          handsOnTask: 'Publish your capstone cloud infrastructure repository with a comprehensive official AWS architecture diagram, Terraform code, and setup documentation.',
          projectApplication: 'Presents your complete cloud engineering portfolio to hiring teams.',
          resources: [
            { title: 'Official AWS Architecture Icons', url: 'https://aws.amazon.com/architecture/icons/', type: 'tool' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'cld-proj-1',
      title: 'High-Availability Multi-Tier Web Architecture on AWS',
      difficulty: 'Beginner',
      estimatedTime: '3-4 weeks',
      objective: 'Architect and deploy a fault-tolerant multi-tier web application on AWS with public/private subnets, Auto Scaling EC2 web servers, and an RDS PostgreSQL database with Multi-AZ failover.',
      technologies: ['AWS (VPC, EC2, ALB, RDS, IAM)', 'Terraform', 'PostgreSQL', 'Nginx', 'Route 53'],
      skillsPracticed: ['Multi-AZ VPC networking', 'Auto Scaling Groups', 'Application Load Balancer', 'RDS Multi-AZ failover', 'Terraform provisioning'],
      requirements: [
        'Custom multi-AZ VPC with 2 public subnets, 2 private application subnets, and 2 isolated database subnets',
        'Auto Scaling Group dynamically scaling EC2 instances across Availability Zones based on CPU utilization',
        'Application Load Balancer routing public HTTP/HTTPS traffic to private web servers with health checks',
        'Amazon RDS PostgreSQL instance deployed in Multi-AZ configuration with automated daily snapshots'
      ],
      deliverables: [
        'Complete Terraform configuration repository provisioning the entire architecture',
        'Official AWS architecture diagram illustrating traffic flow and security boundaries',
        'Documented failover test report demonstrating zero data loss when simulating an AZ outage'
      ],
      productionExpectations: [
        'Zero public internet accessibility to backend application servers or database instances',
        'All resources codified in Terraform with clean modular separation'
      ],
      aiIntegration: 'Use AI to validate security group ingress/egress rules and generate sample EC2 user-data scripts.'
    },
    {
      id: 'cld-proj-2',
      title: 'Serverless Event-Driven Microservices Platform with Lambda & DynamoDB',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Develop a fully serverless, event-driven order processing platform using Amazon API Gateway, AWS Lambda, DynamoDB single-table design, EventBridge, and SQS/SNS fan-out.',
      technologies: ['AWS Lambda', 'Amazon API Gateway', 'DynamoDB', 'Amazon EventBridge', 'Amazon SQS / SNS', 'Terraform'],
      skillsPracticed: ['Serverless microservices', 'DynamoDB single-table design', 'Event-driven architecture', 'SQS dead-letter queues', 'IAM least privilege'],
      requirements: [
        'API Gateway exposing RESTful endpoints integrated with AWS Lambda authorizers and compute handlers',
        'Amazon DynamoDB database utilizing single-table design access patterns with Global Secondary Indexes',
        'Amazon EventBridge bus dispatching asynchronous order events to downstream notification and analytics services',
        'SQS queues with Dead-Letter Queues (DLQ) ensuring zero message loss during downstream processing outages'
      ],
      deliverables: [
        'Terraform repository provisioning all serverless functions, tables, and event subscriptions',
        'Postman collection testing order creation, fulfillment, and cancellation workflows',
        'Technical write-up detailing cold start latency optimizations and DynamoDB access patterns'
      ],
      productionExpectations: [
        'Sub-100ms p95 execution latency for non-cold-start Lambda invocations',
        'Strict least-privilege IAM execution roles assigned to each individual Lambda function'
      ],
      aiIntegration: 'Use AI to draft single-table DynamoDB partition/sort key schema structures.'
    },
    {
      id: 'cld-proj-3',
      title: 'Enterprise Container Platform on AWS ECS Fargate with Multi-Region Failover',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise containerized microservice platform on AWS ECS Fargate across multiple AWS regions, featuring Route 53 latency routing, CloudWatch monitoring, and automated FinOps budget controls.',
      technologies: ['AWS ECS (Fargate)', 'Terraform', 'Amazon ECR', 'Route 53', 'Amazon CloudWatch', 'AWS KMS'],
      skillsPracticed: ['ECS Fargate containers', 'Multi-region disaster recovery', 'Route 53 DNS failover', 'CloudWatch alarms and dashboards', 'KMS encryption'],
      requirements: [
        'Production Amazon ECS Fargate cluster running containerized microservices across multiple availability zones',
        'Multi-region deployment (Primary in us-east-1, Secondary in us-west-2) connected via Route 53 health-checked DNS failover',
        'End-to-end data encryption: EBS and S3 encrypted with customer-managed AWS KMS keys, HTTPS in transit',
        'Comprehensive CloudWatch monitoring dashboard visualizing ECS CPU/memory utilization, ALB response codes, and automated alerts to Slack',
        'FinOps cost governance: AWS Budgets configured with automated alarms triggering when spend exceeds monthly budget threshold'
      ],
      deliverables: [
        'Production Terraform repository with multi-region provider configurations and modular components',
        'Official AWS Architecture diagram detailing the global multi-region failover topology',
        'Disaster recovery drill report demonstrating automated Route 53 traffic redirection upon primary region failure'
      ],
      productionExpectations: [
        'RTO < 2 minutes and RPO < 1 minute during multi-region disaster failover simulations',
        '100% compliance with AWS Well-Architected Security and Reliability pillar benchmarks'
      ],
      aiIntegration: 'Use AI to formulate CloudWatch alarm metric math expressions and simulate DNS health check timeouts.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Cloud computing fundamentals: IaaS/PaaS/SaaS, Regions, Availability Zones, Shared Responsibility',
      'Amazon VPC networking: CIDR blocks, public/private subnets, Route Tables, NAT Gateways, Security Groups',
      'Identity and Access Management (IAM): Users, Roles, Policies (JSON), and least-privilege security',
      'Compute and storage: EC2, Auto Scaling Groups, Application Load Balancers, EBS, and Amazon S3',
      'Managed cloud databases: Amazon RDS (PostgreSQL/MySQL) Multi-AZ, Read Replicas, and DynamoDB',
      'Infrastructure as Code: Modular Terraform (HCL) with remote S3 state backends and DynamoDB locking',
      'Serverless computing: AWS Lambda, Amazon API Gateway, EventBridge, and SQS/SNS messaging',
      'Container platforms: Amazon ECS with AWS Fargate serverless containers and Amazon ECR',
      'Observability and governance: Amazon CloudWatch (Metrics, Logs, Alarms), CloudTrail, and AWS Config',
      'AWS Well-Architected Framework: Reliability, Security, Cost Optimization, and Multi-Region Disaster Recovery'
    ],
    projects: [
      'High-availability multi-tier web architecture on AWS with Auto Scaling and RDS Multi-AZ',
      'Serverless event-driven microservices platform with Lambda, API Gateway, and DynamoDB',
      'Enterprise container platform on AWS ECS Fargate with multi-region Route 53 failover',
      'All infrastructure codified in public GitHub repositories using modular Terraform'
    ],
    csFundamentals: [
      'Distributed systems architecture: fault domains, high availability, stateless compute tiers',
      'Networking protocols: TCP/IP, CIDR subnetting, DNS resolution, TLS cryptographic handshakes',
      'Data replication models: synchronous (Multi-AZ) vs asynchronous (Read Replicas, Multi-Region)',
      'Security engineering: encryption at rest (KMS), encryption in transit (TLS), least-privilege access'
    ],
    tools: [
      'Cloud CLI and management tools: AWS CLI, AWS Management Console, AWS CloudShell',
      'Infrastructure as Code tools: Terraform and OpenTofu',
      'Security and auditing tools: tfsec, Checkov, AWS IAM Access Analyzer',
      'Diagramming tools: Draw.io or Lucidchart using official AWS Architecture Icons'
    ],
    deployment: [
      'Provisioning multi-environment cloud infrastructure using automated Terraform pipelines',
      'Deploying containerized microservices to AWS ECS Fargate clusters',
      'Configuring automated domain DNS routing, health checks, and SSL certificates with Route 53 and ACM',
      'Managing automated database snapshot backups and cross-region replication'
    ],
    portfolio: [
      'Cloud engineering portfolio featuring publication-grade official AWS architecture diagrams',
      'In-depth technical case studies detailing architectural trade-offs, disaster recovery drills, and cost optimization',
      'Public GitHub repositories with clean, modular Terraform code and pre-commit checks',
      'Clear documentation detailing high availability metrics (99.99%), RTO/RPO, and monthly cloud cost projections'
    ],
    github: [
      'Public GitHub repositories with clean Terraform HCL code and comprehensive READMEs',
      'Architecture diagrams embedded in project README files alongside setup instructions',
      'Passing CI workflow badges demonstrating automated terraform validate and security scanning',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant Cloud Engineer resume in PDF format',
      'Bullet points highlighting operational scale: high availability (99.99%), cloud cost savings ($K/yr), and automated provisioning',
      'Direct links to GitHub infrastructure repositories, architecture diagrams, and LinkedIn profile',
      'Targeted keywords matching cloud engineer, AWS solutions architect, and cloud platform developer roles'
    ],
    interviewReadiness: [
      'Mastery of AWS Solutions Architecture whiteboard interviews (Multi-Tier Web App, Serverless Microservices)',
      'Deep understanding of multi-region disaster recovery topologies (Pilot Light, Warm Standby, Active-Active)',
      'Ability to explain cloud networking, VPC routing, and IAM security boundaries under questioning',
      'Structured STAR behavioral stories communicating high-availability designs and cost reduction initiatives'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['cloud'] = cloudRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cloudRoadmap;
}
