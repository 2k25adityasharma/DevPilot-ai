// js/data/interviewPrep/cloudDevOps.js
// Complete Question Bank for Cloud & DevOps Fundamentals (11 topics * 10 = 110 MCQs)

window.interviewPrepCloudDevOps = {
  id: 'cloud_devops',
  title: 'Cloud Computing & DevOps Fundamentals',
  icon: 'cloud',
  description: 'Master Cloud service models, AWS core services, Docker containerization, Kubernetes, CI/CD pipelines, Terraform IaC, Observability, and SRE principles.',
  totalQuestions: 110,
  topics: [
    'Cloud Service Models',
    'Cloud Deployment Models',
    'AWS Core Services',
    'Containerization & Docker',
    'Docker Networking & Compose',
    'Container Orchestration & Kubernetes',
    'CI/CD Pipeline Design & Automation',
    'Infrastructure as Code',
    'Observability, Logging & Monitoring',
    'Cloud Security & Secrets Management',
    'SRE Principles'
  ],
  questions: [
  {
    "id": "cld_sm_1",
    "topic": "Cloud Service Models",
    "difficulty": "Easy",
    "question": "Which cloud service model provides virtualized computing infrastructure (VMs, storage, firewalls) where users manage the OS and middleware?",
    "options": [
      "SaaS (Software as a Service)",
      "IaaS (Infrastructure as a Service)",
      "PaaS (Platform as a Service)",
      "FaaS (Function as a Service)"
    ],
    "correctAnswer": 1,
    "explanation": "IaaS (e.g. AWS EC2, Google Compute Engine) provides raw virtualized hardware infrastructure, leaving OS installation, patching, runtime, and software management to the customer."
  },
  {
    "id": "cld_sm_2",
    "topic": "Cloud Service Models",
    "difficulty": "Easy",
    "question": "Which cloud service model allows developers to deploy code without managing the underlying OS, runtime, or server infrastructure?",
    "options": [
      "IaaS",
      "PaaS (Platform as a Service)",
      "Bare Metal Server",
      "On-Premises Hardware"
    ],
    "correctAnswer": 1,
    "explanation": "PaaS (e.g. Heroku, AWS Elastic Beanstalk, Google App Engine) provides a managed application platform including the OS, runtime environment, and web server, letting developers focus purely on code."
  },
  {
    "id": "cld_sm_3",
    "topic": "Cloud Service Models",
    "difficulty": "Easy",
    "question": "Which model describes ready-to-use end-user software delivered over the internet on a subscription basis (e.g. Gmail, Salesforce, Microsoft 365)?",
    "options": [
      "SaaS (Software as a Service)",
      "IaaS",
      "PaaS",
      "FaaS"
    ],
    "correctAnswer": 0,
    "explanation": "SaaS delivers complete, fully managed applications to end users over the browser, abstracting away all infrastructure, software maintenance, and updates."
  },
  {
    "id": "cld_sm_4",
    "topic": "Cloud Service Models",
    "difficulty": "Easy",
    "question": "What is FaaS (Function as a Service / Serverless)?",
    "options": [
      "A service for hiring freelance developers",
      "An event-driven execution model where small stateless functions execute on demand in ephemeral containers without provisioning servers (e.g. AWS Lambda)",
      "A model with no internet connection",
      "A dedicated physical hardware server"
    ],
    "correctAnswer": 1,
    "explanation": "FaaS allows deploying individual functions that execute in response to events (HTTP requests, queue messages). Cloud providers manage provisioning, autoscaling, and billing strictly per execution duration."
  },
  {
    "id": "cld_sm_5",
    "topic": "Cloud Service Models",
    "difficulty": "Medium",
    "question": "In the Cloud \"Shared Responsibility Model\", who is responsible for securing customer data and IAM user credentials in IaaS?",
    "options": [
      "The Cloud Provider exclusively (e.g. AWS)",
      "The Customer",
      "The Internet Service Provider",
      "The hardware manufacturer"
    ],
    "correctAnswer": 1,
    "explanation": "In the Shared Responsibility Model, the cloud provider secures \"OF the cloud\" (physical data centers, host hardware, hypervisors), while the customer is responsible for security \"IN the cloud\" (OS patching, firewall rules, IAM credentials, and data encryption)."
  },
  {
    "id": "cld_sm_6",
    "topic": "Cloud Service Models",
    "difficulty": "Medium",
    "question": "What is \"Serverless\" computing's primary pricing model characteristic?",
    "options": [
      "Paying a fixed monthly flat rate regardless of traffic",
      "True pay-as-you-go: you pay strictly for execution time (in milliseconds) and memory consumed; zero cost when code is idle",
      "Paying per gigabyte of hard drive space only",
      "Hourly reservations for 3 years"
    ],
    "correctAnswer": 1,
    "explanation": "Serverless eliminates paying for idle capacity: charges accrue strictly when functions execute based on duration and memory allocated, scaling down to zero when inactive."
  },
  {
    "id": "cld_sm_7",
    "topic": "Cloud Service Models",
    "difficulty": "Medium",
    "question": "What is a \"Cold Start\" in Serverless / FaaS architectures?",
    "options": [
      "A server freezing in cold climates",
      "The latency delay experienced when a function is invoked after inactivity, requiring the provider to spin up a new container and initialize runtime dependencies",
      "Booting up a computer in safe mode",
      "A compiler warming error"
    ],
    "correctAnswer": 1,
    "explanation": "When a serverless function has not been invoked recently, the cloud platform must provision a container, download code, and initialize runtime environments, adding 100ms - 2s of latency on that initial invocation."
  },
  {
    "id": "cld_sm_8",
    "topic": "Cloud Service Models",
    "difficulty": "Medium",
    "question": "Which of the following is a classic example of Backend as a Service (BaaS)?",
    "options": [
      "AWS EC2",
      "Firebase / Supabase (providing managed auth, database, and storage APIs)",
      "Ubuntu Linux",
      "Docker Hub"
    ],
    "correctAnswer": 1,
    "explanation": "BaaS platforms like Firebase or Supabase provide plug-and-play backend capabilities (authentication, real-time database, cloud storage, push notifications) via client SDKs without writing server code."
  },
  {
    "id": "cld_sm_9",
    "topic": "Cloud Service Models",
    "difficulty": "Hard",
    "question": "In an enterprise migration from on-premise to cloud, what are the \"6 Rs\" of cloud migration strategy (Gartner/AWS)?",
    "options": [
      "Run, Reboot, Restore, Retry, Reset, Release",
      "Rehost (lift-and-shift), Replatform (lift-and-reshape), Refactor (re-architect), Repurchase (switch to SaaS), Retain, and Retire",
      "Red, Read, Write, Route, Render, Refactor",
      "React, Redux, Relay, Rest, Rust, Ruby"
    ],
    "correctAnswer": 1,
    "explanation": "The 6 Rs: Rehost (move VM as-is), Replatform (minor cloud optimizations), Refactor (rewrite cloud-native), Repurchase (move to SaaS), Retain (keep on-prem), and Retire (decommission unneeded apps)."
  },
  {
    "id": "cld_sm_10",
    "topic": "Cloud Service Models",
    "difficulty": "Hard",
    "question": "How do Cloud Outposts / Hybrid Cloud Appliances (e.g. AWS Outposts, Azure Stack) operate?",
    "options": [
      "They replace local Wi-Fi routers",
      "Physical cloud hardware racks installed inside on-premise corporate data centers, managed seamlessly by cloud provider control planes to satisfy strict data sovereignty/latency requirements",
      "They run purely off solar power",
      "They are software-only simulators"
    ],
    "correctAnswer": 1,
    "explanation": "Cloud appliances deploy physical provider hardware directly on customer premises while extending provider APIs, management, and tooling locally for ultra-low latency or regulatory compliance."
  },
  {
    "id": "cld_dm_1",
    "topic": "Cloud Deployment Models",
    "difficulty": "Easy",
    "question": "What is a \"Public Cloud\"?",
    "options": [
      "A cloud managed by government agencies only",
      "Computing infrastructure owned and operated by a third-party cloud provider and delivered over the public internet, shared among multiple tenants",
      "A cloud open to anyone without passwords",
      "A local computer lab in a university"
    ],
    "correctAnswer": 1,
    "explanation": "In a public cloud (AWS, Azure, GCP), physical hardware, networks, and facilities are owned by the provider and multi-tenanted across global customers with logical isolation."
  },
  {
    "id": "cld_dm_2",
    "topic": "Cloud Deployment Models",
    "difficulty": "Easy",
    "question": "What defines a \"Private Cloud\"?",
    "options": [
      "A cloud where code cannot be viewed by employees",
      "Cloud computing infrastructure operated exclusively for a single organization, hosted either on-premise or by a third-party hosting provider",
      "A cloud running without an internet connection",
      "A personal laptop running Docker"
    ],
    "correctAnswer": 1,
    "explanation": "A private cloud offers cloud self-service and agility dedicated exclusively to one enterprise, providing maximum control and compliance isolation."
  },
  {
    "id": "cld_dm_3",
    "topic": "Cloud Deployment Models",
    "difficulty": "Easy",
    "question": "What is a \"Hybrid Cloud\"?",
    "options": [
      "A computer running both Windows and Linux",
      "An environment combining public cloud and private cloud/on-premises infrastructure, allowing data and apps to be shared between them",
      "A cloud powered by hybrid cars",
      "A cloud that supports both SQL and NoSQL"
    ],
    "correctAnswer": 1,
    "explanation": "Hybrid cloud integrates on-premise private data centers with public cloud resources, enabling flexible workload migration and cloud bursting."
  },
  {
    "id": "cld_dm_4",
    "topic": "Cloud Deployment Models",
    "difficulty": "Easy",
    "question": "What is a \"Multi-Cloud\" strategy?",
    "options": [
      "Running code on multiple computer monitors",
      "Using cloud services from multiple distinct public cloud providers (e.g. AWS and GCP simultaneously) to prevent vendor lock-in and optimize best-of-breed services",
      "Deploying an app across two different Wi-Fi networks",
      "Using two databases on one server"
    ],
    "correctAnswer": 1,
    "explanation": "Multi-cloud uses multiple independent cloud vendors (e.g. AWS for computing, GCP for BigQuery AI/ML) to avoid single-vendor dependency and improve resilience."
  },
  {
    "id": "cld_dm_5",
    "topic": "Cloud Deployment Models",
    "difficulty": "Medium",
    "question": "What is \"Cloud Bursting\" in hybrid cloud architectures?",
    "options": [
      "A catastrophic failure in cloud cooling systems",
      "An application configuration where workloads run normally on private cloud, but automatically burst into public cloud capacity when demand spikes",
      "Deleting old cloud instances",
      "A DDoS attack on cloud servers"
    ],
    "correctAnswer": 1,
    "explanation": "Cloud bursting maintains steady-state baseline operations on cheaper private infrastructure, while automatically provisioning elastic public cloud instances during high-traffic promotional peaks."
  },
  {
    "id": "cld_dm_6",
    "topic": "Cloud Deployment Models",
    "difficulty": "Medium",
    "question": "What is \"Vendor Lock-In\" in cloud computing and how is it mitigated?",
    "options": [
      "A physical lock on server racks",
      "Difficulty and expense of migrating away from a cloud provider due to proprietary APIs and architectures; mitigated by using containers, open standards (Kubernetes), and IaC (Terraform)",
      "Contract disputes with cloud salespeople",
      "A user password reset failure"
    ],
    "correctAnswer": 1,
    "explanation": "Vendor lock-in occurs when systems rely deeply on proprietary provider-specific services. Using portable containers, open-source databases, and standard tools mitigates migration barriers."
  },
  {
    "id": "cld_dm_7",
    "topic": "Cloud Deployment Models",
    "difficulty": "Medium",
    "question": "What is an \"Availability Zone\" (AZ) within a Cloud Region?",
    "options": [
      "A country border",
      "One or more discrete physical data centers with redundant power, networking, and cooling, isolated from other AZs within the same geographic region",
      "A specific time zone",
      "A cloud security group"
    ],
    "correctAnswer": 1,
    "explanation": "A Cloud Region contains multiple isolated Availability Zones (typically 3+) connected via low-latency private fiber. Deploying across multiple AZs guarantees high availability if a data center fails."
  },
  {
    "id": "cld_dm_8",
    "topic": "Cloud Deployment Models",
    "difficulty": "Medium",
    "question": "What is \"Data Sovereignty\" and how does it influence cloud deployment choices?",
    "options": [
      "The price of hard drives in different countries",
      "Legal regulations (e.g. GDPR, HIPAA) requiring that sensitive digital data must reside within the physical borders of the nation where it was generated",
      "Encrypting hard drives with proprietary keys",
      "Cloud providers owning customer data"
    ],
    "correctAnswer": 1,
    "explanation": "Data sovereignty laws mandate that certain customer and financial data must never leave specific geographical or national boundaries, requiring deployment in dedicated regional data centers."
  },
  {
    "id": "cld_dm_9",
    "topic": "Cloud Deployment Models",
    "difficulty": "Hard",
    "question": "What is an \"Edge Cloud\" / Edge Computing architecture?",
    "options": [
      "Deploying servers on the edge of cliffs",
      "Placing compute, storage, and networking resources physically closer to end devices/users (at cell towers, PoPs, local gateways) to provide ultra-low latency (< 10 ms)",
      "Running code only in browser console",
      "Deploying on experimental hardware"
    ],
    "correctAnswer": 1,
    "explanation": "Edge computing moves processing close to data sources (IoT, autonomous cars, mobile users), slashing backhaul network latency and bandwidth costs compared to centralized distant data centers."
  },
  {
    "id": "cld_dm_10",
    "topic": "Cloud Deployment Models",
    "difficulty": "Hard",
    "question": "What is \"Egress Traffic Cost\" in public cloud providers and why is it a primary financial trap in multi-cloud?",
    "options": [
      "The cost of buying domain names",
      "Cloud providers generally allow free inbound data transfer (ingress) but charge expensive rates per gigabyte for outbound data leaving their network (egress) to internet or other clouds",
      "The cost of CPU cooling electricity",
      "The cost of developer salaries"
    ],
    "correctAnswer": 1,
    "explanation": "Public clouds encourage data accumulation with free ingress, but impose heavy bandwidth egress fees when transferring data out to another cloud or on-premise center, creating financial gravity."
  },
  {
    "id": "cld_aws_1",
    "topic": "AWS Core Services",
    "difficulty": "Easy",
    "question": "What is Amazon EC2 (Elastic Compute Cloud)?",
    "options": [
      "An email service",
      "A web service providing resizable virtual computing capacity (Virtual Machines) in the cloud",
      "A relational database",
      "A DNS management tool"
    ],
    "correctAnswer": 1,
    "explanation": "Amazon EC2 provides on-demand virtual compute servers (instances) where you can choose CPU, RAM, OS, and storage configurations."
  },
  {
    "id": "cld_aws_2",
    "topic": "AWS Core Services",
    "difficulty": "Easy",
    "question": "What is Amazon S3 (Simple Storage Service)?",
    "options": [
      "A high-speed relational database",
      "An object storage service offering industry-leading scalability, data availability, security, and performance for unstructured data (images, backups, static files)",
      "A CPU cache manager",
      "A virtual router"
    ],
    "correctAnswer": 1,
    "explanation": "Amazon S3 is a distributed object store designed for 99.999999999% (11 9s) durability, organizing files into Buckets accessible over HTTP/HTTPS."
  },
  {
    "id": "cld_aws_3",
    "topic": "AWS Core Services",
    "difficulty": "Easy",
    "question": "What is Amazon RDS (Relational Database Service)?",
    "options": [
      "A NoSQL document database",
      "A managed service that simplifies setting up, operating, and scaling relational databases (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server)",
      "A database for audio files",
      "A serverless function"
    ],
    "correctAnswer": 1,
    "explanation": "Amazon RDS automates tedious database administrative tasks: hardware provisioning, database setup, automated backups, OS patching, and multi-AZ replication."
  },
  {
    "id": "cld_aws_4",
    "topic": "AWS Core Services",
    "difficulty": "Easy",
    "question": "What is AWS Lambda?",
    "options": [
      "A quantum computer chip",
      "A serverless compute service that runs code in response to events and automatically manages the underlying compute resources",
      "A Python interpreter",
      "A cloud monitoring dashboard"
    ],
    "correctAnswer": 1,
    "explanation": "AWS Lambda is the premier serverless FaaS service: you upload code, configure triggers, and AWS executes the code automatically with zero server management."
  },
  {
    "id": "cld_aws_5",
    "topic": "AWS Core Services",
    "difficulty": "Medium",
    "question": "What is an Amazon VPC (Virtual Private Cloud)?",
    "options": [
      "A physical computer case",
      "A logically isolated, customizable virtual network within AWS where you launch AWS resources with full control over IP address ranges, subnets, and route tables",
      "A VPN client on your phone",
      "A public chat room"
    ],
    "correctAnswer": 1,
    "explanation": "Amazon VPC provides a secure private network in AWS, allowing you to define subnets (public/private), Internet Gateways, NAT Gateways, and Network ACLs."
  },
  {
    "id": "cld_aws_6",
    "topic": "AWS Core Services",
    "difficulty": "Medium",
    "question": "In AWS VPC, what is the difference between a Public Subnet and a Private Subnet?",
    "options": [
      "Public subnets have no passwords",
      "A Public Subnet has a direct route to an Internet Gateway (can assign public IPs); a Private Subnet lacks direct internet routing (accesses internet outbound via NAT Gateway only)",
      "Private subnets are in another country",
      "Public subnets cannot host EC2 instances"
    ],
    "correctAnswer": 1,
    "explanation": "Public subnets route traffic to the Internet Gateway (for load balancers and web servers). Private subnets have no inbound internet access (for databases and backend workers), reaching internet outbound via a NAT Gateway."
  },
  {
    "id": "cld_aws_7",
    "topic": "AWS Core Services",
    "difficulty": "Medium",
    "question": "What is AWS IAM (Identity and Access Management) and what is the \"Principle of Least Privilege\"?",
    "options": [
      "A password storage spreadsheet",
      "A service that manages permissions for users, groups, and roles; Least Privilege dictates granting entities strictly the minimum permissions required to perform their job and nothing more",
      "An encryption key generator",
      "A tool for managing AWS invoices"
    ],
    "correctAnswer": 1,
    "explanation": "IAM manages authentication and authorization across AWS. The Principle of Least Privilege ensures that users and services only have explicit permissions necessary for their tasks, minimizing breach impact."
  },
  {
    "id": "cld_aws_8",
    "topic": "AWS Core Services",
    "difficulty": "Medium",
    "question": "What is an IAM Role and why is it preferred over hardcoding IAM Access Keys in application code?",
    "options": [
      "An IAM Role is a user with a long password",
      "An IAM Role provides temporary security credentials that AWS automatically generates and rotates, eliminating hardcoded secret keys in code or Git repositories",
      "IAM Roles can only be used by root accounts",
      "IAM Roles cost extra money"
    ],
    "correctAnswer": 1,
    "explanation": "IAM Roles grant temporary, automatically rotating STS credentials to EC2 instances or Lambda functions. Hardcoding long-term access keys in code risks catastrophic credential leakage."
  },
  {
    "id": "cld_aws_9",
    "topic": "AWS Core Services",
    "difficulty": "Hard",
    "question": "What is Amazon Route 53 and what are its routing policies (e.g. Latency, Geolocation, Failover)?",
    "options": [
      "A highway navigation app",
      "A highly available and scalable cloud Domain Name System (DNS) web service supporting advanced routing: Simple, Weighted, Latency-based, Geolocation, and Health-check Failover",
      "A load balancer for TCP sockets",
      "A firewall for HTTP headers"
    ],
    "correctAnswer": 1,
    "explanation": "Route 53 is AWS's authoritative global DNS service. It routes user traffic to optimal regional endpoints based on network latency, geographical location, weighted splits (canary testing), or automated health checks."
  },
  {
    "id": "cld_aws_10",
    "topic": "AWS Core Services",
    "difficulty": "Hard",
    "question": "What is Amazon DynamoDB and how does it achieve single-digit millisecond latency at any scale?",
    "options": [
      "A relational database using SQL joins",
      "A fully managed distributed NoSQL key-value and document database that automatically partitions data across SSD storage clusters based on partition keys with synchronous triple-AZ replication",
      "A cache running on user browsers",
      "A hard drive file system"
    ],
    "correctAnswer": 1,
    "explanation": "DynamoDB partitions data across distributed SSD storage nodes using consistent hashing on partition keys. It automatically scales throughput and storage infinitely with predictable single-digit millisecond latency."
  },
  {
    "id": "cld_dk_1",
    "topic": "Containerization & Docker",
    "difficulty": "Easy",
    "question": "What is the fundamental difference between a Virtual Machine (VM) and a Docker Container?",
    "options": [
      "VMs are written in C; containers in JavaScript",
      "A VM includes a full Guest OS and virtualizes hardware via a hypervisor; a Container shares the host OS kernel and isolates processes using Linux namespaces and cgroups (lightweight)",
      "Containers are much slower than VMs",
      "Containers require dedicated hardware per container"
    ],
    "correctAnswer": 1,
    "explanation": "VMs virtualize the hardware and each run a heavy guest OS. Containers share the host OS kernel and run as isolated processes using kernel namespaces and control groups, starting in milliseconds."
  },
  {
    "id": "cld_dk_2",
    "topic": "Containerization & Docker",
    "difficulty": "Easy",
    "question": "What is the difference between a Docker Image and a Docker Container?",
    "options": [
      "An image is running; a container is stopped",
      "A Docker Image is an immutable, read-only template with instructions; a Docker Container is a runnable, live isolated instance created from that image with a thin writable layer",
      "They are exact synonyms",
      "Images only contain text files"
    ],
    "correctAnswer": 1,
    "explanation": "An image is like a class/blueprint (read-only layers). A container is an instantiated object (a running process with an ephemeral read/write container layer on top)."
  },
  {
    "id": "cld_dk_3",
    "topic": "Containerization & Docker",
    "difficulty": "Easy",
    "question": "What command runs a container from the `nginx` image in detached (background) mode, mapping host port 80 to container port 80?",
    "options": [
      "docker create nginx 80:80",
      "docker run -d -p 80:80 nginx",
      "docker start nginx --port 80",
      "docker execute -b nginx"
    ],
    "correctAnswer": 1,
    "explanation": "`docker run -d -p 80:80 nginx` runs the container in detached mode (`-d`) and publishes container port 80 to host port 80 (`-p host:container`)."
  },
  {
    "id": "cld_dk_4",
    "topic": "Containerization & Docker",
    "difficulty": "Easy",
    "question": "What is a `Dockerfile`?",
    "options": [
      "A log file generated when Docker crashes",
      "A text document containing sequential instructions (FROM, RUN, COPY, CMD) that Docker uses to automatically build a container image",
      "A list of Docker hub passwords",
      "A configuration file for Kubernetes pods"
    ],
    "correctAnswer": 1,
    "explanation": "A Dockerfile defines the blueprint for an image: base OS image, dependencies, environment variables, exposed ports, and the entrypoint startup command."
  },
  {
    "id": "cld_dk_5",
    "topic": "Containerization & Docker",
    "difficulty": "Medium",
    "question": "What are the two underlying Linux kernel features that power Docker container isolation and resource constraints?",
    "options": [
      "EXT4 and Swap space",
      "Namespaces (provides isolation: PID, NET, MNT, IPC, UTS) and Control Groups / cgroups (limits resources: CPU, Memory, I/O)",
      "Systemd and Cron",
      "GRUB and BIOS"
    ],
    "correctAnswer": 1,
    "explanation": "Linux Namespaces isolate what a container process can SEE (process tree, network interfaces, filesystem mounts). Control Groups (cgroups) limit what a container process can USE (CPU cores, RAM limits, I/O bandwidth)."
  },
  {
    "id": "cld_dk_6",
    "topic": "Containerization & Docker",
    "difficulty": "Medium",
    "question": "What is Docker Image Layering and how does Layer Caching speed up builds?",
    "options": [
      "Images are compressed into 7z archives",
      "Each instruction in a Dockerfile generates an immutable, cached read-only layer; unchanged layers are reused from cache during subsequent builds rather than re-executing",
      "Layers are added to browser memory",
      "Layer caching deletes old images"
    ],
    "correctAnswer": 1,
    "explanation": "Docker builds images as stacked layers. If code changes but `package.json` did not, Docker reuses cached layers for `npm install`, rebuilding only the modified application copy step in seconds."
  },
  {
    "id": "cld_dk_7",
    "topic": "Containerization & Docker",
    "difficulty": "Medium",
    "question": "What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile?",
    "options": [
      "`CMD` is run at build time; `ENTRYPOINT` at runtime",
      "`ENTRYPOINT` defines the base executable that will always run when the container starts; `CMD` provides default arguments to that executable that can be easily overridden via CLI arguments",
      "`CMD` cannot take parameters",
      "There is no difference in Docker"
    ],
    "correctAnswer": 1,
    "explanation": "`ENTRYPOINT [\"node\", \"server.js\"]` defines the immutable process. `CMD [\"--port\", \"3000\"]` specifies default arguments. Passing CLI arguments to `docker run` overrides `CMD` while preserving `ENTRYPOINT`."
  },
  {
    "id": "cld_dk_8",
    "topic": "Containerization & Docker",
    "difficulty": "Medium",
    "question": "What happens to data written inside a Docker container's filesystem when the container is stopped and deleted without using Volumes?",
    "options": [
      "Data is uploaded to Docker Hub",
      "All data written to the container's writable layer is permanently lost and destroyed",
      "Data is saved in `/tmp` of host machine",
      "Data is transferred to a new container"
    ],
    "correctAnswer": 1,
    "explanation": "Containers are ephemeral: data written directly to the container layer is deleted upon container removal. Persistent data must be mounted via Docker Volumes or Bind Mounts."
  },
  {
    "id": "cld_dk_9",
    "topic": "Containerization & Docker",
    "difficulty": "Hard",
    "question": "What is a \"Multi-Stage Build\" in Docker and why is it essential for production images?",
    "options": [
      "Building images across multiple computers simultaneously",
      "Using multiple `FROM` instructions in a single Dockerfile: one stage with compilers/build tools to build binaries, and a lean final stage copying only artifacts, shrinking image size drastically",
      "Building 3 containers in one command",
      "Running Docker on Kubernetes"
    ],
    "correctAnswer": 1,
    "explanation": "Multi-stage builds separate build environment from runtime. Compilers, SDKs, and source files stay in the build stage; only the final production binary is copied into a minimal image (like Alpine or distroless), slashing image size from 1 GB to 20 MB."
  },
  {
    "id": "cld_dk_10",
    "topic": "Containerization & Docker",
    "difficulty": "Hard",
    "question": "Why should you never run production container processes as the `root` user (`UID 0`)?",
    "options": [
      "Because root user consumes double the memory",
      "If a container breakout vulnerability occurs, an attacker escaping to the host kernel inherits full root privileges on the host machine, compromising the entire infrastructure",
      "Because Docker images fail to start as root",
      "Linux disables networking for root containers"
    ],
    "correctAnswer": 1,
    "explanation": "By default, container `root` maps to host `UID 0`. A security exploit breaking out of container isolation grants the attacker unrestricted root control over the host operating system. Production images must specify `USER node` or non-root user."
  },
  {
    "id": "cld_dc_1",
    "topic": "Docker Networking & Compose",
    "difficulty": "Easy",
    "question": "What is Docker Compose?",
    "options": [
      "A text editor for Dockerfiles",
      "A tool for defining and running multi-container Docker applications using a declarative YAML file (`docker-compose.yml`)",
      "A compiler for Docker images",
      "A tool to convert Docker to Kubernetes"
    ],
    "correctAnswer": 1,
    "explanation": "Docker Compose coordinates multi-container stacks (e.g. web app, PostgreSQL, Redis) with shared networks and volumes through simple commands like `docker compose up`."
  },
  {
    "id": "cld_dc_2",
    "topic": "Docker Networking & Compose",
    "difficulty": "Easy",
    "question": "How do containers communicate with each other within the same custom user-defined Docker bridge network?",
    "options": [
      "By scanning random IP addresses",
      "Through automatic embedded DNS resolution using their container/service names as hostnames (e.g. `postgres://db:5432`)",
      "Via USB cables",
      "Through the host loopback `127.0.0.1`"
    ],
    "correctAnswer": 1,
    "explanation": "Docker provides built-in DNS resolution on user-defined networks: containers can resolve each other directly using their service or container names (e.g. connecting to `db:5432`)."
  },
  {
    "id": "cld_dc_3",
    "topic": "Docker Networking & Compose",
    "difficulty": "Easy",
    "question": "What is the default network driver assigned to standalone containers if no network is specified?",
    "options": [
      "host",
      "bridge (default bridge `bridge`)",
      "overlay",
      "none"
    ],
    "correctAnswer": 1,
    "explanation": "Standalone containers attach to the default `bridge` network unless a custom network is created or specified via `--network`."
  },
  {
    "id": "cld_dc_4",
    "topic": "Docker Networking & Compose",
    "difficulty": "Easy",
    "question": "What command stops and deletes all containers, networks, and volumes defined in a `docker-compose.yml`?",
    "options": [
      "docker compose exit",
      "docker compose down -v",
      "docker compose clean",
      "docker compose destroy"
    ],
    "correctAnswer": 1,
    "explanation": "`docker compose down -v` halts running services, deletes created containers and default networks, and removes declared named volumes (`-v`)."
  },
  {
    "id": "cld_dc_5",
    "topic": "Docker Networking & Compose",
    "difficulty": "Medium",
    "question": "What does `network_mode: \"host\"` do in Docker container networking?",
    "options": [
      "Connects container to internet via satellite",
      "Removes network isolation between the container and Docker host, allowing container to share the host's network namespace and IP directly without port mapping",
      "Encrypts all container packets",
      "Isolates container with no networking"
    ],
    "correctAnswer": 1,
    "explanation": "In `host` network mode, the container does not get its own virtual IP; it binds directly to the host's network interfaces and ports with zero NAT translation overhead."
  },
  {
    "id": "cld_dc_6",
    "topic": "Docker Networking & Compose",
    "difficulty": "Medium",
    "question": "What is the difference between a Named Volume and a Bind Mount in Docker?",
    "options": [
      "Named volumes only work on Windows",
      "Named Volumes are managed completely by Docker inside its storage directory (portable and isolated); Bind Mounts map a specific host directory path directly into the container",
      "Bind mounts are faster for all databases",
      "Named volumes delete data on restart"
    ],
    "correctAnswer": 1,
    "explanation": "Named volumes (`docker volume create my-data`) are managed safely within Docker's storage space and are portable across environments. Bind mounts (`-v /my/local/code:/app`) map exact host paths into containers (ideal for live development)."
  },
  {
    "id": "cld_dc_7",
    "topic": "Docker Networking & Compose",
    "difficulty": "Medium",
    "question": "What is an \"Overlay\" network driver in Docker used for?",
    "options": [
      "Connecting containers across multiple physical Docker host machines (Docker Swarm / multi-host clustering)",
      "Rendering CSS overlays",
      "Local testing on one laptop",
      "Connecting to Bluetooth devices"
    ],
    "correctAnswer": 0,
    "explanation": "Overlay networks encapsulate VXLAN network packets to enable secure container-to-container communication across multiple distributed physical host nodes in a swarm cluster."
  },
  {
    "id": "cld_dc_8",
    "topic": "Docker Networking & Compose",
    "difficulty": "Medium",
    "question": "What does the `depends_on` directive control in `docker-compose.yml`?",
    "options": [
      "The amount of RAM allocated",
      "The startup and shutdown dependency order of services (e.g. ensuring `db` starts before `web`)",
      "The Docker version required",
      "The Git branch to pull"
    ],
    "correctAnswer": 1,
    "explanation": "`depends_on` defines dependency sequencing. When combined with health checks (`condition: service_healthy`), it prevents application containers from starting until databases are fully ready to accept connections."
  },
  {
    "id": "cld_dc_9",
    "topic": "Docker Networking & Compose",
    "difficulty": "Hard",
    "question": "How do Docker Multi-Stage builds prevent build secrets (like SSH keys or NPM tokens) from leaking into production images?",
    "options": [
      "By encrypting images with AES-256",
      "By using secret mounts (`--mount=type=secret`) in the build stage, secrets are accessible only during instruction execution in memory and are never committed into any persistent image layer",
      "By deleting the Dockerfile after build",
      "By storing secrets in environment variables"
    ],
    "correctAnswer": 1,
    "explanation": "Using BuildKit secret mounts (`RUN --mount=type=secret,id=npmrc npm install`), credentials are exposed ephemerally to the process in RAM and leave zero trace in any image layer or history."
  },
  {
    "id": "cld_dc_10",
    "topic": "Docker Networking & Compose",
    "difficulty": "Hard",
    "question": "What is a \"Distroless\" container image (e.g. Google distroless)?",
    "options": [
      "An image with no Linux distribution",
      "An ultra-minimal image containing strictly your compiled application binary and runtime dependencies, omitting package managers (apt/yum), shells (bash/sh), and standard utilities to maximize security",
      "An image with no operating system",
      "A corrupted Docker image"
    ],
    "correctAnswer": 1,
    "explanation": "Distroless images strip away all non-essential binaries: no package managers, no shells, and no standard coreutils. This reduces attack surface drastically, preventing attackers from executing commands even if an RCE vulnerability exists."
  },
  {
    "id": "cld_k8s_1",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Easy",
    "question": "What is Kubernetes (K8s)?",
    "options": [
      "A programming language developed by Google",
      "An open-source container orchestration platform for automating the deployment, scaling, and management of containerized applications",
      "A database for Docker images",
      "A tool for writing Dockerfiles"
    ],
    "correctAnswer": 1,
    "explanation": "Kubernetes coordinates distributed clusters of machines to run containerized workloads reliably, managing autoscaling, self-healing, rolling updates, and service discovery."
  },
  {
    "id": "cld_k8s_2",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Easy",
    "question": "What is the smallest deployable computing unit in Kubernetes?",
    "options": [
      "A Container",
      "A Pod (encapsulating one or more tightly coupled containers)",
      "A Node",
      "A Cluster"
    ],
    "correctAnswer": 1,
    "explanation": "A Pod is the atomic unit in Kubernetes. It encapsulates one (or more) co-located containers that share storage volumes, IP address, and localhost network namespace."
  },
  {
    "id": "cld_k8s_3",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Easy",
    "question": "What component in the Kubernetes Control Plane serves as the single source of truth and distributed key-value store for cluster state?",
    "options": [
      "kube-apiserver",
      "etcd",
      "kube-scheduler",
      "kubelet"
    ],
    "correctAnswer": 1,
    "explanation": "`etcd` is a strongly consistent, distributed key-value store holding the complete state, configuration, and secrets of the entire Kubernetes cluster."
  },
  {
    "id": "cld_k8s_4",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Easy",
    "question": "What is the primary agent running on each worker node in a Kubernetes cluster to ensure containers are running in Pods?",
    "options": [
      "kube-proxy",
      "kubelet",
      "kube-controller-manager",
      "containerd"
    ],
    "correctAnswer": 1,
    "explanation": "`kubelet` is the primary node agent that registers the node with the API server, watches for assigned PodSpecs, and interacts with the container runtime to launch and monitor containers."
  },
  {
    "id": "cld_k8s_5",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Medium",
    "question": "What is the difference between a Kubernetes `Deployment` and a `StatefulSet`?",
    "options": [
      "Deployments are for databases; StatefulSets are for web apps",
      "`Deployment` manages stateless applications where pods are interchangeable with random IDs; `StatefulSet` manages stateful workloads requiring unique, persistent identities, ordinal indexes (pod-0, pod-1), and dedicated persistent storage",
      "Deployments cannot scale",
      "StatefulSets cannot run containers"
    ],
    "correctAnswer": 1,
    "explanation": "Deployments are ideal for stateless web frontends (interchangeable pods). StatefulSets are designed for distributed databases (ZooKeeper, Kafka, MongoDB) where each pod needs a predictable hostname and stable storage."
  },
  {
    "id": "cld_k8s_6",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Medium",
    "question": "What are the four types of Kubernetes `Service` abstractions for networking?",
    "options": [
      "Alpha, Beta, Gamma, Delta",
      "ClusterIP (default internal), NodePort, LoadBalancer (cloud external), and ExternalName",
      "TCP, UDP, HTTP, HTTPS",
      "Pod, Node, Cluster, Gateway"
    ],
    "correctAnswer": 1,
    "explanation": "Kubernetes Service types: ClusterIP (internal cluster IP only), NodePort (opens a static high port on every node), LoadBalancer (provisions cloud provider load balancer), and ExternalName (DNS alias)."
  },
  {
    "id": "cld_k8s_7",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Medium",
    "question": "What is a Kubernetes `Ingress` controller?",
    "options": [
      "A tool that formats JSON",
      "An API object and reverse proxy controller (e.g. Nginx, Traefik) managing external HTTP/HTTPS routing into cluster Services, supporting SSL termination and host/path-based routing",
      "A security group in AWS",
      "A pod scheduler"
    ],
    "correctAnswer": 1,
    "explanation": "Ingress consolidates external HTTP/S routing rules into a single resource, routing traffic to backend Services based on domain name (`api.domain.com`) or URI path (`/auth`), terminating SSL certificates at the edge."
  },
  {
    "id": "cld_k8s_8",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Medium",
    "question": "What is the difference between a \"Liveness Probe\" and a \"Readiness Probe\" in Kubernetes?",
    "options": [
      "Liveness is for databases; Readiness is for web apps",
      "Liveness probe determines if the container is alive (if it fails, kubelet kills and restarts the container); Readiness probe determines if the container is ready to accept traffic (if it fails, pod is removed from Service endpoints)",
      "Readiness probe restarts the pod; Liveness does not",
      "They are exact synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "Liveness probe checks if application is in a deadlock/frozen state: failure triggers container restart. Readiness probe checks if app is fully booted and ready to handle traffic: failure temporarily stops routing requests to it."
  },
  {
    "id": "cld_k8s_9",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Hard",
    "question": "What is a Kubernetes `DaemonSet` and what is its primary use case?",
    "options": [
      "A set of background demons on Linux",
      "A controller ensuring that a copy of a specific Pod runs on ALL (or selected) worker nodes in the cluster, used for node-level logging (Fluentd), monitoring (Node Exporter), and networking (Calico)",
      "A batch job running once a day",
      "A set of root containers"
    ],
    "correctAnswer": 1,
    "explanation": "DaemonSets guarantee that exactly one instance of a pod runs on every active node in the cluster, automatically adding pods to newly joined nodes (essential for cluster-wide logging and metrics agents)."
  },
  {
    "id": "cld_k8s_10",
    "topic": "Container Orchestration & Kubernetes",
    "difficulty": "Hard",
    "question": "What is the \"Horizontal Pod Autoscaler\" (HPA) and how does it scale workloads?",
    "options": [
      "It buys more physical computer servers",
      "It automatically scales the number of Pod replicas in a deployment up or down based on observed CPU utilization, memory metrics, or custom metrics (e.g. queue length)",
      "It increases pod CPU allocation",
      "It scales pods horizontally on the screen"
    ],
    "correctAnswer": 1,
    "explanation": "HPA periodically queries the metrics server and adjusts the `replicas` field of a Deployment/StatefulSet based on target thresholds (e.g. average CPU utilization > 70%), autoscaling pods horizontally."
  },
  {
    "id": "cld_ci_1",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Easy",
    "question": "What is the primary objective of a Continuous Integration (CI) pipeline?",
    "options": [
      "To invoice clients automatically",
      "To automatically build, test, and validate every code commit pushed to a repository to catch errors early and maintain software quality",
      "To publish marketing blog posts",
      "To format code indentation only"
    ],
    "correctAnswer": 1,
    "explanation": "CI pipelines automate compilation, static analysis, and automated unit/integration testing on every commit, ensuring that bugs are detected immediately before merging into mainline branches."
  },
  {
    "id": "cld_ci_2",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Easy",
    "question": "Where are GitHub Actions workflow files defined in a repository?",
    "options": [
      ".github/workflows/*.yml",
      ".git/ci/*.json",
      "src/workflows/",
      "package.json"
    ],
    "correctAnswer": 0,
    "explanation": "GitHub Actions detects declarative workflow definitions stored as YAML files inside the `.github/workflows/` directory in the repository root."
  },
  {
    "id": "cld_ci_3",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Easy",
    "question": "What is a \"Pipeline Artifact\" in CI/CD?",
    "options": [
      "An antique piece of computer hardware",
      "A file or collection of files (binaries, compiled bundles, test coverage reports, Docker images) produced by a pipeline job to be saved or passed to subsequent stages",
      "A bug reported by a user",
      "A Git commit SHA"
    ],
    "correctAnswer": 1,
    "explanation": "Artifacts are compiled binaries, packages, or test reports generated during a CI job, uploaded and stored for deployment in later downstream pipeline stages."
  },
  {
    "id": "cld_ci_4",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Easy",
    "question": "What is the difference between a Job and a Step in GitHub Actions?",
    "options": [
      "Steps contain jobs",
      "A Job is a collection of steps that execute on the same virtual runner; Steps are individual tasks (running commands or actions) executed sequentially within that job",
      "Jobs run on laptops; Steps run in cloud",
      "They are exact synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "A GitHub Actions workflow consists of one or more Jobs (which can run in parallel on separate runners). Each Job executes a sequence of Steps running in order on the same runner machine."
  },
  {
    "id": "cld_ci_5",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Medium",
    "question": "How should sensitive secrets (API keys, deployment passwords) be managed in CI/CD pipelines?",
    "options": [
      "Committed directly in the `workflow.yml` file",
      "Stored in encrypted Secret Vaults / CI Secret Stores (e.g. GitHub Repository Secrets) and injected as masked environment variables at runtime",
      "Saved in a public text file",
      "Printed to console logs"
    ],
    "correctAnswer": 1,
    "explanation": "CI/CD secrets should always reside in encrypted secret managers and injected into runner environments at runtime, ensuring values are never committed to Git and are masked from build console output."
  },
  {
    "id": "cld_ci_6",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Medium",
    "question": "What is the purpose of \"Matrix Builds\" in CI pipelines?",
    "options": [
      "Rendering 3D graphics in the cloud",
      "Running a job simultaneously across multiple combinations of parameters (e.g. testing against Node 18, 20, 22 on Ubuntu, macOS, and Windows) in parallel",
      "Connecting CI to movie streaming",
      "Building 4 Docker images at once"
    ],
    "correctAnswer": 1,
    "explanation": "Matrix strategies create multiple parallel job configurations from a set of variables, allowing comprehensive cross-platform and multi-version compatibility testing with minimal configuration lines."
  },
  {
    "id": "cld_ci_7",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Medium",
    "question": "What is the \"Fail Fast\" behavior in CI pipeline matrix jobs?",
    "options": [
      "Failing all tests immediately upon startup",
      "If any single job in the matrix fails, GitHub Actions cancels all other currently running in-progress matrix jobs immediately to conserve runner minutes",
      "Failing if tests take > 1 second",
      "Deploying code before tests complete"
    ],
    "correctAnswer": 1,
    "explanation": "Under `fail-fast: true` (default in GitHub Actions), the moment one variation in a matrix fails, the pipeline aborts the remaining running jobs, saving billable compute time."
  },
  {
    "id": "cld_ci_8",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Medium",
    "question": "How does Dependency Caching (e.g. caching `~/.npm` or `~/.cache/pip`) accelerate CI pipelines?",
    "options": [
      "By compiling code without tests",
      "By preserving downloaded packages across pipeline runs, eliminating redundant downloads from package registries and cutting build times by 50-80%",
      "By skipping lint checks",
      "By compressing source files"
    ],
    "correctAnswer": 1,
    "explanation": "Actions like `actions/cache` store dependencies indexed by hash of lockfiles. When unchanged, packages are restored from cache in seconds rather than redownloading thousands of modules over the network."
  },
  {
    "id": "cld_ci_9",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Hard",
    "question": "What is OpenID Connect (OIDC) authentication in GitHub Actions for cloud deployment?",
    "options": [
      "Logging into GitHub with a Google account",
      "A mechanism allowing GitHub Actions to exchange short-lived OIDC tokens directly with cloud providers (AWS, Azure, GCP) to assume roles without storing long-lived secret access keys",
      "A password manager for developers",
      "A two-factor authentication app"
    ],
    "correctAnswer": 1,
    "explanation": "OIDC eliminates hardcoded cloud credentials. The CI runner obtains a cryptographic JWT from GitHub, which AWS/GCP verifies and trades for temporary, scoped IAM credentials via STS."
  },
  {
    "id": "cld_ci_10",
    "topic": "CI/CD Pipeline Design & Automation",
    "difficulty": "Hard",
    "question": "What is a \"Self-Hosted Runner\" in CI/CD and when is it required?",
    "options": [
      "Running unit tests manually on a whiteboard",
      "Executing CI jobs on dedicated private physical servers or cloud VMs owned by the company, required for proprietary hardware access, GPU testing, or internal network access",
      "A developer laptop running tests",
      "A tool to run CI offline"
    ],
    "correctAnswer": 1,
    "explanation": "Self-hosted runners run the CI runner agent inside private corporate networks or customized hardware (e.g. on-premise Kubernetes clusters, GPUs), enabling access to private internal assets without exposing them to public cloud runners."
  },
  {
    "id": "cld_iac_1",
    "topic": "Infrastructure as Code",
    "difficulty": "Easy",
    "question": "What does Infrastructure as Code (IaC) mean?",
    "options": [
      "Writing code inside computer microchips",
      "Managing and provisioning computing infrastructure (networks, VMs, databases, load balancers) through version-controlled configuration files rather than manual UI clicks",
      "Writing documentation in markdown",
      "Setting up Wi-Fi routers"
    ],
    "correctAnswer": 1,
    "explanation": "IaC defines infrastructure declaratively in code, bringing software engineering discipline (version control, automated testing, code review, repeatable deployments) to infrastructure management."
  },
  {
    "id": "cld_iac_2",
    "topic": "Infrastructure as Code",
    "difficulty": "Easy",
    "question": "Which declarative tool developed by HashiCorp is the industry standard for multi-cloud IaC provisioning?",
    "options": [
      "Ansible",
      "Terraform",
      "Docker",
      "Kubernetes"
    ],
    "correctAnswer": 1,
    "explanation": "Terraform is the leading open-source declarative IaC tool, allowing developers to define infrastructure across AWS, Azure, GCP, and dozens of providers using HashiCorp Configuration Language (HCL)."
  },
  {
    "id": "cld_iac_3",
    "topic": "Infrastructure as Code",
    "difficulty": "Easy",
    "question": "What is the primary difference between Declarative IaC and Imperative IaC?",
    "options": [
      "Declarative is for databases; Imperative is for web apps",
      "Declarative defines the desired end-state of infrastructure (\"what\" you want, e.g. Terraform); Imperative specifies sequential procedural steps (\"how\" to build it, e.g. Bash/Python scripts)",
      "Imperative uses YAML; Declarative uses JSON",
      "Declarative requires manual approval"
    ],
    "correctAnswer": 1,
    "explanation": "Declarative IaC declares the final desired state; the engine calculates diffs and reconciles infrastructure. Imperative IaC executes procedural step-by-step commands, which can cause drift if runs fail midway."
  },
  {
    "id": "cld_iac_4",
    "topic": "Infrastructure as Code",
    "difficulty": "Easy",
    "question": "What are the core sequential commands in a standard Terraform workflow?",
    "options": [
      "`init`, `plan`, `apply`, `destroy`",
      "`start`, `run`, `stop`, `delete`",
      "`compile`, `test`, `build`, `deploy`",
      "`create`, `check`, `commit`, `push`"
    ],
    "correctAnswer": 0,
    "explanation": "Terraform core workflow: `terraform init` (downloads providers/modules), `terraform plan` (previews proposed state changes), `terraform apply` (provisions resources), and `terraform destroy` (tears down)."
  },
  {
    "id": "cld_iac_5",
    "topic": "Infrastructure as Code",
    "difficulty": "Medium",
    "question": "What is the \"Terraform State File\" (`terraform.tfstate`) and why is Remote State with State Locking essential in teams?",
    "options": [
      "A list of developer passwords",
      "A JSON file mapping declared configuration resources to real-world cloud resource IDs; remote state (S3 + DynamoDB locking) prevents team members from corrupting state by executing conflicting simultaneous runs",
      "A temporary cache deleted after apply",
      "A backup copy of source code"
    ],
    "correctAnswer": 1,
    "explanation": "The state file tracks real-world cloud resource mappings and metadata. Storing it remotely (e.g. in AWS S3 with DynamoDB locking) prevents race conditions and ensures all engineers share a synchronized view of infrastructure."
  },
  {
    "id": "cld_iac_6",
    "topic": "Infrastructure as Code",
    "difficulty": "Medium",
    "question": "What is \"Configuration Drift\" in infrastructure management?",
    "options": [
      "Servers floating on water",
      "The divergence between the documented/declared IaC code and the actual real-world state of the infrastructure (caused by manual out-of-band edits in cloud web consoles)",
      "Clock desynchronization between servers",
      "Network latency spikes"
    ],
    "correctAnswer": 1,
    "explanation": "Configuration drift occurs when engineers make manual adjustments in the AWS/Azure web console without updating IaC scripts, leading to unexpected overwrites on the next `terraform apply`."
  },
  {
    "id": "cld_iac_7",
    "topic": "Infrastructure as Code",
    "difficulty": "Medium",
    "question": "What is the difference between Ansible and Terraform in DevOps tooling?",
    "options": [
      "Ansible is for cloud; Terraform is for on-premise",
      "Terraform specializes in orchestrating and provisioning infrastructure resources (IaaS/PaaS setup); Ansible specializes in configuration management and application deployment on existing servers (agentless via SSH)",
      "They cannot be used together",
      "Ansible requires a compiler"
    ],
    "correctAnswer": 1,
    "explanation": "Terraform is an infrastructure provisioner (creates VPCs, VMs, databases). Ansible is a configuration management tool (installs software, packages, config files on existing servers via SSH). They complement each other."
  },
  {
    "id": "cld_iac_8",
    "topic": "Infrastructure as Code",
    "difficulty": "Medium",
    "question": "What are Terraform Modules and why are they used?",
    "options": [
      "Hardware microchips plugged into servers",
      "Self-contained packages of Terraform configurations that group resources together to promote reusability, standardization, and prevent duplication across environments",
      "Terraform plugins written in C++",
      "Tools for encrypting passwords"
    ],
    "correctAnswer": 1,
    "explanation": "Terraform modules encapsulate complex resource sets (e.g. a complete VPC with public/private subnets and NAT) into reusable components parameterized via input variables."
  },
  {
    "id": "cld_iac_9",
    "topic": "Infrastructure as Code",
    "difficulty": "Hard",
    "question": "What is \"Immutable Infrastructure\" compared to \"Mutable Infrastructure\"?",
    "options": [
      "Immutable infrastructure never changes passwords",
      "In Immutable Infrastructure, servers are never modified or patched in-place; when changes occur, brand new server instances/images (AMIs/containers) are provisioned and old ones destroyed",
      "Mutable infrastructure is always serverless",
      "Immutable infrastructure cannot be upgraded"
    ],
    "correctAnswer": 1,
    "explanation": "Mutable infrastructure allows in-place configuration changes, leading to snowflake servers and configuration drift. Immutable infrastructure builds replacement artifacts from scratch, ensuring consistency across environments."
  },
  {
    "id": "cld_iac_10",
    "topic": "Infrastructure as Code",
    "difficulty": "Hard",
    "question": "What is AWS Cloud Development Kit (AWS CDK) and how does it differ from raw CloudFormation?",
    "options": [
      "A hardware development kit sold by Amazon",
      "A framework allowing developers to define cloud infrastructure using familiar general-purpose programming languages (TypeScript, Python, Java) which synthesize into standard CloudFormation JSON/YAML templates",
      "A mobile app development toolkit",
      "A replacement for Docker"
    ],
    "correctAnswer": 1,
    "explanation": "AWS CDK brings object-oriented abstraction, loops, conditionals, and type safety to IaC by letting engineers write infrastructure using TypeScript/Python while compiling to native AWS CloudFormation."
  },
  {
    "id": "cld_obs_1",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Easy",
    "question": "What are the \"Three Pillars of Observability\"?",
    "options": [
      "Speed, Security, Scalability",
      "Metrics, Logs, and Distributed Traces",
      "CPU, RAM, and Disk",
      "Alerts, Dashboards, and Reports"
    ],
    "correctAnswer": 1,
    "explanation": "Observability is built upon three telemetry signals: Metrics (numerical aggregations over time), Logs (timestamped discrete event records), and Traces (request journeys through distributed systems)."
  },
  {
    "id": "cld_obs_2",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Easy",
    "question": "What is Prometheus in cloud-native monitoring?",
    "options": [
      "A cloud database for images",
      "An open-source monitoring system and time-series database that collects metrics via a pull model (scraping HTTP metrics endpoints) and provides PromQL query language",
      "A log aggregation tool replacing Elasticsearch",
      "A load balancer"
    ],
    "correctAnswer": 1,
    "explanation": "Prometheus scrapes `/metrics` HTTP endpoints from instrumented applications, storing numerical time-series data and evaluating alerting rules."
  },
  {
    "id": "cld_obs_3",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Easy",
    "question": "Which open-source visualization tool is widely paired with Prometheus to render real-time dashboards?",
    "options": [
      "Grafana",
      "Tableau",
      "Excel",
      "Photoshop"
    ],
    "correctAnswer": 0,
    "explanation": "Grafana is the industry-standard visualization engine for time-series telemetry, rendering interactive charts, dashboards, and alerts from Prometheus, InfluxDB, and Elasticsearch."
  },
  {
    "id": "cld_obs_4",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Easy",
    "question": "What tools constitute the classic \"ELK Stack\" for centralized logging?",
    "options": [
      "Elasticsearch (search engine), Logstash (log ingestion pipeline), and Kibana (visualization UI)",
      "EC2, Lambda, and Kubernetes",
      "Ethernet, Linux, and Kernel",
      "Express, Lodash, and Koa"
    ],
    "correctAnswer": 0,
    "explanation": "The ELK Stack: Logstash ingests and parses log data; Elasticsearch indexes and searches high-volume logs; Kibana provides a rich web interface for searching and querying log events."
  },
  {
    "id": "cld_obs_5",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Medium",
    "question": "What is \"Distributed Tracing\" and why is it critical in microservice architectures?",
    "options": [
      "Tracing network fiber cables",
      "A method to track the entire lifecycle and latency of a single user request as it traverses across multiple microservices, message queues, and databases using a shared Correlation ID / Trace ID",
      "Tracing source code execution in an IDE",
      "Tracking employee work hours"
    ],
    "correctAnswer": 1,
    "explanation": "When a single user click invokes 10 microservices, isolated logs cannot explain where latency occurred. Distributed tracing (OpenTelemetry, Jaeger) passes a `trace_id` in headers to reconstruct the full end-to-end call tree."
  },
  {
    "id": "cld_obs_6",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Medium",
    "question": "What is OpenTelemetry (OTel)?",
    "options": [
      "A competitor to telecom companies",
      "A CNCF open-source vendor-neutral observability framework providing standardized APIs, SDKs, and tooling to generate, collect, and export telemetry data (traces, metrics, logs)",
      "A new network cable standard",
      "A cloud hosting service"
    ],
    "correctAnswer": 1,
    "explanation": "OpenTelemetry standardizes telemetry collection: developers instrument applications once using vendor-agnostic OTel APIs, routing telemetry to any backend (Datadog, New Relic, Jaeger, Prometheus) seamlessly."
  },
  {
    "id": "cld_obs_7",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Medium",
    "question": "What are the \"Four Golden Signals\" of monitoring defined in the Google SRE Handbook?",
    "options": [
      "CPU, Memory, Disk, and Network",
      "Latency, Traffic, Errors, and Saturation",
      "Read, Write, Delete, and Update",
      "Uptime, Downtime, Reboot, and Restore"
    ],
    "correctAnswer": 1,
    "explanation": "Google SRE Golden Signals: Latency (time to serve requests), Traffic (demand/throughput), Errors (rate of failed requests), and Saturation (how full service resources are)."
  },
  {
    "id": "cld_obs_8",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Medium",
    "question": "What is \"Structured Logging\" (e.g. JSON logging) and why is it preferred over plain text strings?",
    "options": [
      "Writing logs in capital letters",
      "Emitting log entries as structured key-value pairs (JSON format) containing consistent fields (timestamp, level, trace_id, user_id, message), making logs easily parseable, filterable, and indexable by machines",
      "Writing logs on paper forms",
      "Encrypting log messages with AES"
    ],
    "correctAnswer": 1,
    "explanation": "Plain text logs require fragile regex to parse. Structured JSON logs allow search engines (Elasticsearch/Loki) to ingest and query specific fields (`level: \"ERROR\" AND duration_ms > 500`) with high speed and zero parsing errors."
  },
  {
    "id": "cld_obs_9",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Hard",
    "question": "What is \"High Cardinality\" in time-series metrics and why does it crash traditional monitoring systems?",
    "options": [
      "A high number of servers in a cluster",
      "Labels/dimensions that contain an astronomical number of unique values (like `user_id` or `uuid`), creating millions of distinct time-series streams and causing exponential RAM explosion in Prometheus",
      "High network latency on fiber lines",
      "Measuring CPU at high clock speeds"
    ],
    "correctAnswer": 1,
    "explanation": "In time-series databases, each unique combination of key-value labels creates an independent time series. Tagging metrics with high-cardinality values (e.g. `order_id`) multiplies time series into millions, exhausting memory."
  },
  {
    "id": "cld_obs_10",
    "topic": "Observability, Logging & Monitoring",
    "difficulty": "Hard",
    "question": "What is the difference between Pull-based (Prometheus) and Push-based (StatsD / Pushgateway) metrics collection?",
    "options": [
      "Pull is for servers; Push is for mobile only",
      "Pull: monitoring server periodically connects to targets and scrapes metrics endpoints; Push: application agents initiate outbound connections to push metrics to a central collector (ideal for short-lived batch/serverless jobs)",
      "Push cannot collect numbers",
      "Pull requires running on the same host"
    ],
    "correctAnswer": 1,
    "explanation": "Pull-based systems simplify service discovery and health monitoring (if scraper can't reach target, target is down). Push-based systems excel for ephemeral workloads (like Lambda functions or batch jobs that terminate before a scraper runs)."
  },
  {
    "id": "cld_sec_1",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Easy",
    "question": "What is the principle of \"Defense in Depth\" in cloud security?",
    "options": [
      "Placing servers deep underground",
      "Layering multiple independent security controls (perimeter firewalls, IAM, network segmentation, host protection, data encryption) so that if one layer fails, others stop the breach",
      "Using passwords with at least 50 characters",
      "Backing up data to 10 hard drives"
    ],
    "correctAnswer": 1,
    "explanation": "Defense in Depth assumes any single security barrier can be compromised, deploying multiple concentric defense layers (WAF -> VPC -> Subnet NACL -> Security Group -> IAM -> KMS Encryption)."
  },
  {
    "id": "cld_sec_2",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Easy",
    "question": "What is the difference between \"Encryption at Rest\" and \"Encryption in Transit\"?",
    "options": [
      "Encryption at rest is for sleeping servers",
      "Encryption at Rest protects stored data on disks/S3 using cryptographic algorithms (e.g. AES-256); Encryption in Transit protects data moving across network connections using TLS/SSL",
      "Encryption in transit only works with Wi-Fi",
      "They use the exact same certificates"
    ],
    "correctAnswer": 1,
    "explanation": "Encryption at rest encrypts data written to physical storage media (protecting against physical theft). Encryption in transit encrypts data travelling over networks using TLS (protecting against eavesdropping and MITM)."
  },
  {
    "id": "cld_sec_3",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Easy",
    "question": "What is HashiCorp Vault?",
    "options": [
      "A physical safe installed in data centers",
      "An identity-based tool for securely managing, storing, and rotating secrets, API keys, passwords, and dynamic database credentials with strict auditing",
      "A code repository tool",
      "A tool for managing AWS invoices"
    ],
    "correctAnswer": 1,
    "explanation": "HashiCorp Vault provides a unified API to securely store secrets, generate dynamic short-lived credentials on the fly, and encrypt sensitive application data in transit."
  },
  {
    "id": "cld_sec_4",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Easy",
    "question": "What is a Web Application Firewall (WAF) and what attacks does it intercept?",
    "options": [
      "A physical brick firewall in server rooms",
      "A Layer 7 security service that inspects incoming HTTP/HTTPS traffic to filter and block application-level attacks (SQL injection, XSS, rate-based bot scraping)",
      "A tool to speed up CSS downloading",
      "An operating system firewall"
    ],
    "correctAnswer": 1,
    "explanation": "A WAF inspects HTTP payloads before reaching web applications, enforcing rules against OWASP Top 10 exploits, malicious bots, and geo-blocked IP addresses."
  },
  {
    "id": "cld_sec_5",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Medium",
    "question": "In AWS Security Groups vs Network ACLs (NACLs), what is the difference regarding statefulness?",
    "options": [
      "NACLs are stateful; Security Groups are stateless",
      "Security Groups are Stateful (if inbound traffic is allowed, outbound return traffic is automatically permitted); NACLs are Stateless (rules must be explicitly defined in both directions)",
      "Both are completely stateless",
      "Security Groups only apply to routers"
    ],
    "correctAnswer": 1,
    "explanation": "Security Groups operate at the instance/ENI level and are stateful: return traffic is tracked and automatically allowed. NACLs operate at the subnet boundary and are stateless, requiring explicit inbound and outbound rules."
  },
  {
    "id": "cld_sec_6",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Medium",
    "question": "What is AWS KMS (Key Management Service) and what is \"Envelope Encryption\"?",
    "options": [
      "A mailing service for letters",
      "KMS manages master encryption keys (KMS keys); Envelope Encryption uses a master key to encrypt a local Data Encryption Key (DEK), which in turn encrypts actual plaintext data",
      "A postal service API",
      "A password manager app"
    ],
    "correctAnswer": 1,
    "explanation": "Envelope encryption combines performance with security: massive datasets are encrypted locally with a symmetric Data Key (DEK), and the small DEK itself is encrypted using a centralized HSM master key in KMS."
  },
  {
    "id": "cld_sec_7",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Medium",
    "question": "What is a \"Bastion Host\" (Jump Box) in cloud network architecture?",
    "options": [
      "A server that broadcasts radio signals",
      "A hardened, tightly monitored public EC2 instance acting as a secure single entry-point for administrators to SSH/RDP into private subnet instances",
      "A backup web server",
      "A database replica"
    ],
    "correctAnswer": 1,
    "explanation": "Private instances cannot be reached from the public internet. A Bastion Host sits in a public subnet with strict SSH access controls, allowing authorized engineers to jump securely into private backend instances."
  },
  {
    "id": "cld_sec_8",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Medium",
    "question": "What is a \"Zero Trust\" security architecture model?",
    "options": [
      "Never hiring external software developers",
      "\"Never trust, always verify\": assumes threats exist both inside and outside the network, requiring continuous authentication, authorization, and encryption for every request regardless of origin network",
      "A network without firewalls",
      "Using only cash for cloud bills"
    ],
    "correctAnswer": 1,
    "explanation": "Zero Trust abandons traditional perimeter defense (\"trusted internal network\"). Every user, device, and service-to-service call must be explicitly authenticated, authorized, and encrypted continuously."
  },
  {
    "id": "cld_sec_9",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Hard",
    "question": "What is \"Dynamic Secrets\" generation in HashiCorp Vault?",
    "options": [
      "Generating random numbers for passwords",
      "Vault generates unique, short-lived credentials on demand for specific services (e.g. temporary PostgreSQL user with 1-hour TTL) and automatically revokes them when expired",
      "Encrypting hard drives on boot",
      "Creating dynamic DNS records"
    ],
    "correctAnswer": 1,
    "explanation": "Dynamic secrets eliminate static credentials: applications request credentials from Vault, which dynamically provisions a unique database user with limited privileges and an automated expiration lease, neutralizing stolen credential risks."
  },
  {
    "id": "cld_sec_10",
    "topic": "Cloud Security & Secrets Management",
    "difficulty": "Hard",
    "question": "What is AWS IAM \"Policy Evaluation Logic\" when conflicting Allow and Deny statements exist?",
    "options": [
      "The statement written first in JSON takes precedence",
      "An Explicit Deny ALWAYS overrides any Allow statement, regardless of where the deny is defined (Explicit Deny > Explicit Allow > Default Deny)",
      "Allow always wins over Deny",
      "AWS throws a syntax error"
    ],
    "correctAnswer": 1,
    "explanation": "AWS evaluates permissions deterministically: by default, all access is denied. An explicit allow grants access, BUT any matching explicit DENY immediately and irrevocably overrides all allows."
  },
  {
    "id": "cld_sre_1",
    "topic": "SRE Principles",
    "difficulty": "Easy",
    "question": "What does SRE stand for and who pioneered the discipline?",
    "options": [
      "Software Regression Engineering (Microsoft)",
      "Site Reliability Engineering, pioneered by Google to apply software engineering practices to infrastructure and operations problems",
      "System Routing Engine (Cisco)",
      "Standard Reliability Evaluation (IBM)"
    ],
    "correctAnswer": 1,
    "explanation": "Site Reliability Engineering (SRE), pioneered by Google's Ben Treynor Sloss: \"what happens when a software engineer is tasked with what used to be called operations.\""
  },
  {
    "id": "cld_sre_2",
    "topic": "SRE Principles",
    "difficulty": "Easy",
    "question": "What is the difference between SLI, SLO, and SLA in SRE terminology?",
    "options": [
      "They are identical terms",
      "SLI is a metric measuring actual service performance; SLO is the internal target reliability goal agreed upon by engineering; SLA is the legal/business contract promising reliability to customers with penalties for breach",
      "SLA is internal; SLO is legal",
      "SLI is a hardware chip"
    ],
    "correctAnswer": 1,
    "explanation": "SLI (Service Level Indicator) = actual measured metric (e.g. 99.8% requests < 200ms). SLO (Service Level Objective) = internal target (e.g. 99.9%). SLA (Service Level Agreement) = customer contractual commitment with financial consequences."
  },
  {
    "id": "cld_sre_3",
    "topic": "SRE Principles",
    "difficulty": "Easy",
    "question": "What is an \"Error Budget\" in Site Reliability Engineering?",
    "options": [
      "The monetary budget allocated to pay for bug bounties",
      "The allowable room for unreliability (100% - SLO) that a service can tolerate within a time window, used as a balance between releasing new features and investing in reliability",
      "A pool of funds for replacing broken servers",
      "The number of bugs allowed in a sprint"
    ],
    "correctAnswer": 1,
    "explanation": "If SLO is 99.9% uptime, the Error Budget is 0.1% downtime. Product teams can ship features aggressively as long as the error budget is intact; if exhausted, feature launches pause to focus on stability."
  },
  {
    "id": "cld_sre_4",
    "topic": "SRE Principles",
    "difficulty": "Easy",
    "question": "What is \"Toil\" in SRE terminology?",
    "options": [
      "Working overtime on weekends",
      "Repetitive, mundane, operational work related to running a service that is manual, lack enduring value, and scales linearly as the service grows (target: capped at < 50% SRE time)",
      "Writing difficult algorithms",
      "Attending Scrum standups"
    ],
    "correctAnswer": 1,
    "explanation": "Toil is manual, repetitive work that could be automated (e.g. manually restarting servers or running DB scripts). SRE caps toil at 50%, dedicating the remaining time to engineering long-term automation."
  },
  {
    "id": "cld_sre_5",
    "topic": "SRE Principles",
    "difficulty": "Medium",
    "question": "What is the primary purpose of a \"Blameless Post-Mortem\" (Incident Review)?",
    "options": [
      "To identify and fire the engineer who made the mistake",
      "To investigate the systemic and organizational causes of an incident without assigning personal blame, learning lessons and creating actionable engineering items to prevent recurrence",
      "To calculate monetary losses for accounting",
      "To report the outage to news media"
    ],
    "correctAnswer": 1,
    "explanation": "Blameless culture assumes well-intentioned engineers do not make mistakes on purpose. Pointing fingers hides systemic problems; blameless reviews uncover tooling gaps, process flaws, and missing guardrails."
  },
  {
    "id": "cld_sre_6",
    "topic": "SRE Principles",
    "difficulty": "Medium",
    "question": "What is MTTR (Mean Time to Resolution) versus MTTD (Mean Time to Detection)?",
    "options": [
      "They are unrelated to outages",
      "MTTD is the average time between an incident starting and the team detecting it; MTTR is the average time from detection to restoring the service to full operational health",
      "MTTR is always shorter than MTTD",
      "Both measure employee response speed to emails"
    ],
    "correctAnswer": 1,
    "explanation": "MTTD reflects monitoring and alerting effectiveness. MTTR reflects operational diagnostics, rollbacks, and recovery speed. Reducing MTTR preserves the error budget."
  },
  {
    "id": "cld_sre_7",
    "topic": "SRE Principles",
    "difficulty": "Medium",
    "question": "What is the difference between High Availability (HA) and Disaster Recovery (DR)?",
    "options": [
      "HA is for software; DR is for hardware",
      "HA minimizes downtime during routine localized failures using automatic redundancy (e.g. multi-AZ clustering); DR provides plans and infrastructure to recover from catastrophic regional outages or data destruction",
      "HA only applies to databases",
      "DR prevents all system failures"
    ],
    "correctAnswer": 1,
    "explanation": "HA ensures continuous operation through redundant active components that failover instantaneously. DR focuses on business continuity and data restoration following massive catastrophic events (e.g. data center destruction)."
  },
  {
    "id": "cld_sre_8",
    "topic": "SRE Principles",
    "difficulty": "Medium",
    "question": "What are RPO (Recovery Point Objective) and RTO (Recovery Time Objective) in disaster recovery?",
    "options": [
      "RPO is time; RTO is money",
      "RPO is the maximum acceptable data loss measured in time (e.g. last 15 minutes of backup); RTO is the maximum acceptable duration of system downtime to restore operations",
      "RPO measures CPU performance; RTO measures network",
      "Both are legal terms for contracts"
    ],
    "correctAnswer": 1,
    "explanation": "RPO defines \"how much data can we afford to lose?\" (backup frequency). RTO defines \"how long can we afford to be down?\" (recovery speed). Lower RPO/RTO requires significantly more expensive architecture."
  },
  {
    "id": "cld_sre_9",
    "topic": "SRE Principles",
    "difficulty": "Hard",
    "question": "What is the \"Graceful Degradation\" (Shedding Load) pattern during catastrophic traffic overloads?",
    "options": [
      "Crashing the entire system to protect data",
      "Strategically dropping non-essential features (e.g. recommendations, comments) and throttling low-priority requests to preserve core transactional capabilities (e.g. checkout)",
      "Shutting down internet routers",
      "Rebooting servers in safe mode"
    ],
    "correctAnswer": 1,
    "explanation": "Under extreme load exceeding capacity, graceful degradation drops auxiliary non-critical functionality to keep the primary business path functional rather than suffering a cascading total outage."
  },
  {
    "id": "cld_sre_10",
    "topic": "SRE Principles",
    "difficulty": "Hard",
    "question": "How does Google SRE implement automated Canaries and Automated Rollback with Error Budgets?",
    "options": [
      "By asking managers for manual sign-off on Slack",
      "Canary deployments automatically route 1-5% of live traffic to the new version; telemetry pipelines compare error rates against the baseline and trigger instant automated rollback if error budget burn rate spikes",
      "By deploying only at 3 AM",
      "By disabling monitoring during rollouts"
    ],
    "correctAnswer": 1,
    "explanation": "Automated canary analysis continuously calculates error budget burn rates. If the canary exhibits abnormal latency or 5xx spikes, the deployment pipeline executes an automated rollback within seconds without human intervention."
  }
]
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.interviewPrepCloudDevOps;
}
