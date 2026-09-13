/**
 * DevPilot-AI — Career Roadmap: DevOps Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const devopsRoadmap = {
  roleId: 'devops-engineer',
  roadmapId: 'devops',
  title: 'DevOps Engineer',
  category: 'devops-cloud',
  description: 'Automate software delivery, scale cloud infrastructure, and guarantee 99.99% system reliability: Linux systems, Docker containerization, Kubernetes orchestration, Terraform Infrastructure as Code (IaC), automated CI/CD pipelines, and observability.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Linux systems administration, networking, Bash/Python automation scripting, and Git collaboration.',
      skills: [
        {
          id: 'dev-linux-admin',
          title: 'Linux Systems Administration & Shell Automation',
          category: 'Operating Systems',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master enterprise Linux: process management, systemd service units, user permissions (chmod, chown, sudo), file systems, Bash automation, and SSH key management.',
          whatToLearn: [
            'Linux file systems (FHS): /etc, /var/log, /proc, /sys, /dev, mount points, and disk partitioning (fdisk, df, du)',
            'Process and resource management: ps, top, htop, systemd (systemctl, journalctl), signals (SIGTERM, SIGKILL)',
            'User, group, and permission management: chmod, chown, umask, sticky bits, sudoers configuration',
            'Bash shell scripting: loops, conditionals, functions, exit codes ($?), pipe streams (|, >, >>), and cron scheduling',
            'Secure remote access: SSH key generation (ed25519), ssh-agent, ~/.ssh/config, hardening sshd_config'
          ],
          whyItMatters: 'Every cloud server, Docker container, and Kubernetes pod runs on Linux. Fluency in Linux CLI is the bedrock of all infrastructure engineering.',
          productionUse: 'Administering cloud virtual machines, configuring system daemons, and automating operating system patch maintenance.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Bash utility scripts; verify root command execution and file permission arguments manually.',
          handsOnTask: 'Write a robust Bash backup automation script that creates compressed tar archives of application logs, rotates backups older than 7 days, and logs to systemd.',
          projectApplication: 'Serves as the systems foundation for all automated server deployments.',
          resources: [
            { title: 'The Linux Command Line by William Shotts', url: 'https://linuxcommand.org/tlcl.php', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'dev-networking-protocols',
          title: 'Networking Fundamentals, DNS & Web Protocols',
          category: 'Networking',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['dev-linux-admin'],
          description: 'Master production networking: TCP/IP stack, CIDR subnetting, DNS resolution, HTTP/HTTPS, SSL/TLS certificates, firewalls (iptables/ufw), and network diagnostics.',
          whatToLearn: [
            'OSI and TCP/IP models: IP addressing, IPv4 vs IPv6, CIDR subnet math (/24, /16), private vs public IP ranges',
            'Transport layer: TCP 3-way handshake, SYN flood attacks, UDP packet streaming tradeoffs',
            'Domain Name System (DNS): Root servers, authoritative nameservers, record types (A, AAAA, CNAME, MX, TXT), TTL, dig/nslookup',
            'Application protocols: HTTP/1.1 vs HTTP/2 vs HTTP/3, SSL/TLS handshakes, Let’s Encrypt Certbot automation',
            'Network troubleshooting tools: ping, traceroute, netstat, ss, curl, tcpdump, Wireshark, and firewall configuration with ufw/iptables'
          ],
          whyItMatters: 'When servers cannot communicate, it is almost always a networking, routing, or firewall issue. Systematic network debugging avoids hours of downtime.',
          productionUse: 'Designing cloud Virtual Private Clouds (VPCs), subnets, routing tables, and debugging service-to-service connectivity.',
          aiRelevance: 'Low',
          aiWorkflow: 'Use networking CLI tools (curl, dig, tcpdump) directly to capture packet flows and analyze connection bottlenecks.',
          handsOnTask: 'Configure a Linux server with custom ufw firewall rules, generate an automated SSL certificate using Certbot, and capture traffic with tcpdump.',
          projectApplication: 'Informs VPC and security group network design for cloud deployments.',
          resources: [
            { title: 'Cloudflare Learning Center: How Does the Internet Work?', url: 'https://www.cloudflare.com/learning/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Docker containerization, automated CI/CD pipelines, and Infrastructure as Code with Terraform.',
      skills: [
        {
          id: 'dev-docker-containers',
          title: 'Docker Containerization & Multi-Container Orchestration',
          category: 'Containers',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['dev-linux-admin'],
          description: 'Package applications into immutable containers: writing production Dockerfiles, multi-stage builds, non-root security, container registries, and Docker Compose networking.',
          whatToLearn: [
            'Container internals: Linux namespaces (PID, NET, MNT), control groups (cgroups), union file systems (overlay2)',
            'Writing production Dockerfiles: minimal base images (Alpine/Distroless), caching build layers, multi-stage builds',
            'Container security: running as non-root user (USER 1001), scanning vulnerabilities with Trivy, eliminating secrets in build args',
            'Docker networking: bridge networks, port publishing, inter-container DNS resolution',
            'Docker Compose: orchestrating multi-container environments with named volumes and health check dependencies'
          ],
          whyItMatters: 'Containers are the universal packaging format of modern cloud software, guaranteeing identical behavior from developer laptops to Kubernetes clusters.',
          productionUse: 'Containerizing microservices, building immutable deployment artifacts, and setting up reproducible CI/CD environments.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft multi-stage Dockerfiles and compose files; always audit image base layers and vulnerability scan outputs.',
          handsOnTask: 'Build a hardened multi-stage Dockerfile for a full-stack application that reduces image size by 80% and passes a zero-CVE Trivy security audit.',
          projectApplication: 'Containerizes all deployment workloads in the CI/CD and Kubernetes projects.',
          resources: [
            { title: 'Docker Official Best Practices Guide', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'dev-cicd-github-actions',
          title: 'CI/CD Pipelines with GitHub Actions & GitLab CI',
          category: 'Continuous Integration',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['dev-docker-containers'],
          description: 'Build enterprise automated delivery pipelines: GitHub Actions workflows, matrix testing, Docker build-and-push to registries (GHCR / AWS ECR), environment protection rules, and automated rollbacks.',
          whatToLearn: [
            'Continuous Integration (CI) vs Continuous Delivery (CD) vs Continuous Deployment principles',
            'GitHub Actions architecture: triggers (push, pull_request, schedule), workflows, jobs, matrix builds, self-hosted runners',
            'Building and pushing container images: Docker Buildx, multi-architecture images (amd64/arm64), container registries (ECR, GHCR)',
            'Pipeline security: OpenID Connect (OIDC) for passwordless AWS authentication, managing secrets, vulnerability scanning gates',
            'Deployment strategies: Automated staging deployments, manual production approvals, semantic version tag automation'
          ],
          whyItMatters: 'Manual deployments cause outages and human error. Automated CI/CD allows engineering teams to deploy dozens of times a day with complete confidence.',
          productionUse: 'Automating build, test, scan, and deployment stages for enterprise software applications.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate GitHub Actions YAML pipelines; verify secrets handling and OIDC permissions manually.',
          handsOnTask: 'Build a production GitHub Actions CI/CD pipeline that lints, tests, builds multi-arch Docker images, scans for CVEs, and deploys to staging.',
          projectApplication: 'Automates delivery for the Automated Multi-Environment Deployment Pipeline project.',
          resources: [
            { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Infrastructure as Code (IaC) with Terraform, cloud infrastructure on AWS, and reverse proxies (Nginx).',
      skills: [
        {
          id: 'dev-terraform-iac',
          title: 'Infrastructure as Code (IaC) with Terraform',
          category: 'Infrastructure as Code',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['dev-cicd-github-actions', 'dev-networking-protocols'],
          description: 'Provision cloud infrastructure programmatically: HashiCorp Configuration Language (HCL), state file management, remote backends (S3 + DynamoDB locking), reusable modules, and plan/apply workflows.',
          whatToLearn: [
            'Terraform fundamentals: providers (AWS), resources, data sources, variables, outputs, and local values',
            'State management: terraform.tfstate, remote state backends (S3 bucket), state locking with DynamoDB to prevent concurrent writes',
            'Terraform execution lifecycle: init, plan, apply, destroy, and state drift detection',
            'Writing modular infrastructure: reusable custom modules (VPC module, ECS cluster module, RDS module)',
            'IaC security and linting: tflint, tfsec / Checkov to detect misconfigured security groups and unencrypted storage'
          ],
          whyItMatters: 'Clicking around cloud consoles creates unrepeatable, undocumented snowflake infrastructure. Terraform defines entire cloud data centers in version-controlled code.',
          productionUse: 'Provisioning VPCs, Kubernetes clusters, databases, and load balancers across multi-region cloud environments.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate boilerplate Terraform HCL module definitions; always review terraform plan diffs before executing terraform apply.',
          handsOnTask: 'Write a modular Terraform configuration that provisions an AWS VPC with public/private subnets, NAT gateways, and an ECS cluster with remote S3 state locking.',
          projectApplication: 'Provisions the cloud infrastructure for the Enterprise Kubernetes Cluster project.',
          resources: [
            { title: 'Terraform Official Documentation', url: 'https://developer.hashicorp.com/terraform/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'dev-reverse-proxy-nginx',
          title: 'Reverse Proxies, Load Balancing & Nginx',
          category: 'Traffic Management',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Essential',
          estimatedTime: '2 weeks',
          prerequisites: ['dev-networking-protocols'],
          description: 'Route and secure web traffic: Nginx reverse proxy, load balancing algorithms, SSL termination, HTTP caching, rate limiting, and gzip/brotli compression.',
          whatToLearn: [
            'Nginx architecture: master vs worker processes, event-driven non-blocking I/O model',
            'Configuration structure: http, server, location blocks, proxy_pass, and header forwarding (X-Forwarded-For)',
            'Load balancing algorithms: Round Robin, Least Connections, IP Hash, and upstream health checks',
            'SSL/TLS termination: offloading encryption overhead at the proxy before routing plaintext traffic to internal services',
            'Security and performance: rate limiting (limit_req), connection limiting, request buffering, and static asset caching'
          ],
          whyItMatters: 'Nginx acts as the front door for backend services, providing load distribution, SSL termination, and protection against traffic spikes.',
          productionUse: 'Ingress controllers, API gateways, and web application reverse proxy routing.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft complex Nginx rewrite rules and location regex blocks; test syntax validity with nginx -t.',
          handsOnTask: 'Configure an Nginx reverse proxy with SSL termination, upstream load balancing across 3 backend containers, and rate limiting.',
          projectApplication: 'Manages incoming traffic in the multi-container deployment projects.',
          resources: [
            { title: 'Nginx Official Documentation', url: 'https://nginx.org/en/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Kubernetes container orchestration, Helm package management, GitOps with ArgoCD, and observability.',
      skills: [
        {
          id: 'dev-kubernetes-orchestration',
          title: 'Container Orchestration with Kubernetes (K8s)',
          category: 'Orchestration',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '4-5 weeks',
          prerequisites: ['dev-terraform-iac', 'dev-docker-containers'],
          description: 'Master industry-standard container orchestration: Kubernetes architecture (Control Plane vs Worker Nodes), Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, and Autoscaling.',
          whatToLearn: [
            'Kubernetes architecture: API Server, etcd, Scheduler, Controller Manager, kubelet, kube-proxy, Container Runtime (containerd)',
            'Workload primitives: Pods, ReplicaSets, Deployments (rolling updates, rollbacks), StatefulSets, DaemonSets, Jobs/CronJobs',
            'Networking: ClusterIP, NodePort, LoadBalancer services, Ingress controllers (Nginx/Traefik), and CoreDNS',
            'Configuration: ConfigMaps, Secrets, environment variables, mounting volumes from persistent volume claims (PVCs)',
            'High availability: Horizontal Pod Autoscaler (HPA), Cluster Autoscaler, resource requests and limits, readiness/liveness probes'
          ],
          whyItMatters: 'Kubernetes is the modern operating system of cloud infrastructure. Every high-growth tech company runs its application fleets on Kubernetes.',
          productionUse: 'Managing self-healing, auto-scaling container fleets across AWS EKS, Google GKE, and Azure AKS.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Kubernetes YAML manifests and Helm templates; audit resource requests and security contexts carefully.',
          handsOnTask: 'Deploy a multi-tier web application to a local Kubernetes cluster (Minikube/Kind) with an Ingress controller, HPA autoscaler, and zero-downtime rolling updates.',
          projectApplication: 'Core infrastructure for the Enterprise Kubernetes Cluster project.',
          resources: [
            { title: 'Kubernetes Official Documentation', url: 'https://kubernetes.io/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'dev-gitops-argocd',
          title: 'GitOps Continuous Delivery with ArgoCD & Helm',
          category: 'GitOps & Delivery',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['dev-kubernetes-orchestration'],
          description: 'Implement declarative GitOps delivery: Helm charts (values.yaml, templates), Kustomize, ArgoCD continuous deployment, automated synchronization, and progressive delivery.',
          whatToLearn: [
            'Helm packaging: creating custom Helm charts, templates, values.yaml, built-in objects, and chart repositories',
            'GitOps principles: Git as the single source of truth for infrastructure and application state',
            'ArgoCD architecture: Application controller, API server, repo server, and declarative application manifests',
            'Automated synchronization: tracking Git repository changes and automatically reconciling cluster state',
            'Progressive delivery: Blue/Green and Canary rollouts with automated metric analysis using Argo Rollouts'
          ],
          whyItMatters: 'GitOps eliminates manual kubectl commands and configuration drift, creating an auditable, automated release pipeline directly from Git commits.',
          productionUse: 'Managing production Kubernetes cluster state across multiple environments (Dev, Staging, Prod).',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Helm templating loops and ArgoCD application YAML definitions.',
          handsOnTask: 'Package an application into a Helm chart, configure ArgoCD in a Kubernetes cluster, and demonstrate an automated Canary deployment triggered by a Git commit.',
          projectApplication: 'Provides the GitOps delivery engine for the Enterprise Kubernetes Cluster project.',
          resources: [
            { title: 'ArgoCD Documentation', url: 'https://argo-cd.readthedocs.io/', type: 'documentation' },
            { title: 'Helm Official Guide', url: 'https://helm.sh/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'dev-observability-prometheus',
          title: 'Cloud Observability: Prometheus, Grafana & ELK / Loki',
          category: 'Observability & Monitoring',
          level: 'Level 4: Advanced',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['dev-kubernetes-orchestration'],
          description: 'Implement full-stack infrastructure telemetry: metrics with Prometheus, visualization with Grafana, centralized logging with Grafana Loki / ELK, Alertmanager alerting, and distributed tracing.',
          whatToLearn: [
            'The Three Pillars of Observability: Metrics, Logs, and Distributed Traces',
            'Prometheus architecture: pull-based metric scraping, PromQL query language, recording rules, exporters (node_exporter, kube-state-metrics)',
            'Alertmanager: routing alerts to PagerDuty/Slack, alert silencing, inhibition rules, and preventing alert fatigue',
            'Grafana visualization: building dashboards for cluster health, CPU/RAM saturation, network I/O, and service error rates',
            'Centralized log aggregation: Grafana Loki with Promtail or ELK stack (Elasticsearch, Logstash, Kibana) for structured log querying'
          ],
          whyItMatters: 'You cannot fix what you cannot see. Observability platforms alert engineers to outages before customers notice and pinpoint the exact failing service.',
          productionUse: 'Monitoring production server clusters, container fleets, and meeting 99.99% availability Service Level Agreements (SLAs).',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft PromQL alert expressions; verify alert thresholds against historical traffic variance.',
          handsOnTask: 'Deploy the Prometheus Operator (kube-prometheus-stack) on Kubernetes, build a Grafana dashboard for cluster saturation, and configure an Alertmanager Slack alert.',
          projectApplication: 'Provides continuous monitoring for the Capstone Infrastructure Platform.',
          resources: [
            { title: 'Prometheus Official Documentation', url: 'https://prometheus.io/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'DevOps system design interviews, cloud security, disaster recovery, and engineering portfolio.',
      skills: [
        {
          id: 'dev-interview-sysdesign',
          title: 'DevOps System Design Interviews & Reliability Scenarios',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['dev-gitops-argocd', 'dev-observability-prometheus'],
          description: 'Master senior DevOps interviews: multi-region high availability architectures, disaster recovery (RTO / RPO), incident triage post-mortems, and live infrastructure whiteboard scenarios.',
          whatToLearn: [
            'High Availability System Design: designing multi-region active-active and active-passive cloud architectures',
            'Disaster Recovery (DR): Recovery Time Objective (RTO) vs Recovery Point Objective (RPO), backup replication, failover testing',
            'Live incident management: triage methodology, root cause analysis (RCA), writing blameless post-mortems',
            'DevOps culture and collaboration: breaking silos, DORA metrics (Deployment Frequency, Lead Time, Change Failure Rate, MTTR)'
          ],
          whyItMatters: 'Senior DevOps roles evaluate your ability to architect fault-tolerant systems and remain calm during high-severity production outages.',
          productionUse: 'Leading infrastructure strategy and incident response at scale.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive interviewer to simulate live production outage scenarios and critique your troubleshooting tree.',
          handsOnTask: 'Draft a comprehensive Disaster Recovery Architecture Plan and blameless post-mortem document for a simulated 45-minute database outage.',
          projectApplication: 'Prepares you directly for senior DevOps and cloud infrastructure interview loops.',
          resources: [
            { title: 'Google SRE Book: Incident Management', url: 'https://sre.google/sre-book/incident-management/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'dev-portfolio-resume',
          title: 'DevOps Engineering Portfolio, IaC Repositories & Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 11,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['dev-interview-sysdesign'],
          description: 'Package your infrastructure code into an engineering portfolio: clear architectural network diagrams, clean Terraform modules on GitHub, automated CI badges, and an ATS-optimized resume.',
          whatToLearn: [
            'Documenting infrastructure: architectural flowcharts (Draw.io / Excalidraw) illustrating VPCs, subnets, load balancers, and Kubernetes pods',
            'Writing quantifiable DevOps resume bullets: highlighting cloud cost reductions, deployment frequency improvements, and MTTR metrics',
            'GitHub repository hygiene: committing clean, modular Terraform code and Helm charts with complete README instructions and pre-commit checks'
          ],
          whyItMatters: 'DevOps engineers work behind the scenes. High-clarity architecture diagrams and cleanly structured Terraform modules provide tangible proof of engineering mastery.',
          productionUse: 'Securing DevOps Engineer, Cloud Infrastructure Engineer, and Platform Engineer positions.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to tailor resume bullet points to emphasize automation, security, and measurable reliability metrics.',
          handsOnTask: 'Publish your capstone infrastructure repository with an end-to-end architecture diagram, automated GitHub Actions CI pipeline, and setup runbook.',
          projectApplication: 'Presents your complete DevOps engineering body of work to hiring teams.',
          resources: [
            { title: 'DevOps Roadmap (roadmap.sh)', url: 'https://roadmap.sh/devops', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'dev-proj-1',
      title: 'Automated Multi-Environment CI/CD Delivery Pipeline',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build an automated continuous delivery pipeline using GitHub Actions, Docker multi-stage builds, Trivy security scanning, and automated deployment to cloud staging.',
      technologies: ['GitHub Actions', 'Docker', 'Trivy', 'Linux', 'AWS S3 / ECR', 'Bash'],
      skillsPracticed: ['CI/CD workflow design', 'Multi-stage Docker builds', 'Container security scanning', 'Environment variables', 'Automated releases'],
      requirements: [
        'GitHub Actions workflow triggered on pull requests and pushes to main',
        'Multi-stage Dockerfile producing a minimal, non-root production container image',
        'Automated vulnerability scanning with Trivy that fails the pipeline if Critical/High CVEs are found',
        'Automated deployment to a staging server on AWS EC2 or digital cloud host upon merge to main'
      ],
      deliverables: [
        'GitHub repository with passing CI/CD workflow badges',
        'Trivy security scan reports demonstrating zero critical vulnerabilities',
        'Technical write-up documenting the CI/CD pipeline lifecycle'
      ],
      productionExpectations: [
        'Zero secrets stored in code; all credentials accessed securely via GitHub Secrets',
        'Sub-5 minute total pipeline execution time using Docker layer caching'
      ],
      aiIntegration: 'Use AI to generate sample matrix test configurations and troubleshoot GitHub Actions syntax errors.'
    },
    {
      id: 'dev-proj-2',
      title: 'Modular Cloud Infrastructure as Code with Terraform & AWS',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Provision a complete, highly available cloud environment on AWS using modular Terraform with remote state locking, private VPC subnets, and an Application Load Balancer.',
      technologies: ['Terraform (HCL)', 'AWS (VPC, ECS, RDS, ALB, IAM)', 'DynamoDB', 'S3', 'tflint'],
      skillsPracticed: ['Terraform modules', 'Remote state management', 'VPC network architecture', 'IAM least-privilege policies', 'Infrastructure drift detection'],
      requirements: [
        'Modular Terraform architecture: VPC module, Database module, and ECS Fargate cluster module',
        'Multi-AZ VPC with public and private subnets, NAT Gateways, and strict Security Group rules',
        'Remote state storage in Amazon S3 with state locking via DynamoDB to prevent concurrent executions',
        'Application Load Balancer (ALB) routing traffic to a containerized web application in private subnets'
      ],
      deliverables: [
        'Modular, reusable Terraform repository adhering to HashiCorp best practices',
        'Architecture diagram illustrating AWS VPC subnets, gateways, and compute tiers',
        'tflint and tfsec security audit reports with clean passing status'
      ],
      productionExpectations: [
        '100% reproducible cloud infrastructure; can be cleanly created with terraform apply and destroyed with terraform destroy',
        'Zero hardcoded IP addresses or AWS credentials in code'
      ],
      aiIntegration: 'Use AI to draft initial Terraform module variable declarations and output schemas.'
    },
    {
      id: 'dev-proj-3',
      title: 'Enterprise Kubernetes Platform with GitOps, ArgoCD & Prometheus',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise-scale Kubernetes platform featuring GitOps continuous delivery with ArgoCD, Helm chart packaging, Prometheus monitoring, and automated canary rollouts.',
      technologies: ['Kubernetes (EKS / Minikube)', 'Helm', 'ArgoCD', 'Argo Rollouts', 'Prometheus & Grafana', 'GitHub Actions'],
      skillsPracticed: ['Kubernetes cluster administration', 'GitOps with ArgoCD', 'Helm packaging', 'Canary rollouts', 'Prometheus monitoring and alerts'],
      requirements: [
        'Deploy a multi-node Kubernetes cluster with Ingress controller, cert-manager for automated SSL, and persistent storage',
        'Package application microservices into reusable Helm charts with environment-specific values.yaml',
        'Configure ArgoCD GitOps engine to automatically synchronize cluster state with the GitHub configuration repository',
        'Implement automated Canary releases with Argo Rollouts that gradually shifts traffic based on live error rate metrics',
        'Deploy the Prometheus Operator with custom Grafana dashboards and Alertmanager alerts routed to Slack'
      ],
      deliverables: [
        'Complete GitOps repository containing Helm charts, ArgoCD application manifests, and monitoring rules',
        'Live Grafana dashboard visualizing cluster CPU/memory saturation, HTTP request throughput, and error rates',
        'Comprehensive architecture RFC document detailing the GitOps release workflow and disaster recovery runbooks'
      ],
      productionExpectations: [
        'Zero-downtime rolling updates verified under simulated production load',
        'Automatic rollback triggered within 30 seconds if a canary deployment error rate spikes above 1%'
      ],
      aiIntegration: 'Use AI to generate Grafana dashboard JSON models and formulate PromQL alert expressions.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Linux systems administration: file systems, process management (systemd), and Bash scripting',
      'Networking fundamentals: TCP/IP, CIDR subnetting, DNS, HTTP/HTTPS, SSL/TLS, and firewalls',
      'Docker containerization: production Dockerfiles, multi-stage builds, non-root security, and Compose',
      'CI/CD pipeline automation: GitHub Actions, matrix builds, secrets management, and container registries',
      'Infrastructure as Code (IaC): Terraform (HCL), remote S3 state backends, and reusable modules',
      'Reverse proxies and load balancers: Nginx configuration, SSL termination, and rate limiting',
      'Container orchestration with Kubernetes: Pods, Deployments, Services, Ingress, and Autoscaling (HPA)',
      'GitOps continuous delivery: Helm chart packaging and ArgoCD automated cluster synchronization',
      'Full-stack observability: Prometheus metrics, PromQL queries, Grafana dashboards, and Alertmanager',
      'High availability architecture, Disaster Recovery planning (RTO/RPO), and blameless incident post-mortems'
    ],
    projects: [
      'Automated multi-environment CI/CD pipeline with GitHub Actions and Trivy scanning',
      'Modular cloud infrastructure on AWS provisioned with Terraform and remote state locking',
      'Enterprise Kubernetes platform with GitOps (ArgoCD), Helm, canary rollouts, and Prometheus',
      'All infrastructure codified in public GitHub repositories with architectural diagrams'
    ],
    csFundamentals: [
      'Operating systems theory: kernel namespaces, cgroups, process scheduling, memory virtualization',
      'Distributed systems principles: high availability, fault tolerance, split-brain, consensus (etcd)',
      'Networking protocols: TCP flow control, DNS hierarchy, TLS cryptographic handshakes',
      'Software release paradigms: Blue/Green, Canary, Rolling updates, and immutable infrastructure'
    ],
    tools: [
      'Infrastructure as Code tools: Terraform and OpenTofu',
      'Container platforms: Docker, containerd, and Kubernetes (EKS, GKE, K3s, Minikube)',
      'CI/CD and GitOps tools: GitHub Actions, GitLab CI, ArgoCD, Helm',
      'Monitoring and logging tools: Prometheus, Grafana, Alertmanager, Grafana Loki, ELK'
    ],
    deployment: [
      'Provisioning and managing cloud resources on Amazon Web Services (AWS) or Google Cloud (GCP)',
      'Managing production Kubernetes clusters and deploying services via declarative GitOps',
      'Automated GitHub Actions CI/CD pipelines deploying infrastructure updates via Terraform',
      'Configuring automated domain DNS routing, SSL certificates, and security group firewalls'
    ],
    portfolio: [
      'DevOps portfolio showcasing comprehensive cloud and Kubernetes architecture diagrams',
      'In-depth technical write-ups detailing GitOps workflows, disaster recovery plans, and post-mortems',
      'Live Grafana monitoring dashboard screenshots showcasing cluster health telemetry',
      'Clear documentation detailing automation ROI, deployment frequency gains, and MTTR reductions'
    ],
    github: [
      'Public GitHub repositories with clean, modular Terraform HCL and Helm chart structures',
      'Comprehensive READMEs with architecture diagrams, pre-commit checks, and setup runbooks',
      'Passing CI workflow badges demonstrating automated linting and security scanning',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-optimized DevOps Engineer resume in standard PDF format',
      'Bullet points highlighting measurable operational impact: deployment frequency, MTTR, cloud cost savings',
      'Direct links to GitHub infrastructure repositories, architecture diagrams, and LinkedIn profile',
      'Targeted keywords matching DevOps engineer, cloud platform engineer, and SRE openings'
    ],
    interviewReadiness: [
      'Mastery of DevOps System Design whiteboard interviews (Multi-Region HA, Global Web Architecture)',
      'Fluency in live Linux and network troubleshooting scenarios (resolving DNS failures, high CPU, crash loops)',
      'Ability to explain GitOps principles, Kubernetes networking, and state management trade-offs',
      'Structured STAR behavioral stories communicating high-severity outage responses and post-mortems'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['devops'] = devopsRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = devopsRoadmap;
}
