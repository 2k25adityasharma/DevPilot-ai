/**
 * DevPilot-AI — Career Roadmap: Cloud Security Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const cloudSecurityRoadmap = {
  roleId: 'cloud-security-engineer',
  roadmapId: 'cloudSecurity',
  title: 'Cloud Security Engineer',
  category: 'security-qa',
  description: 'Protect cloud-native infrastructure, data, and workloads: Cloud IAM hardening, Zero Trust network architectures, container & Kubernetes security, secrets management, automated compliance (SOC 2, CIS benchmarks), and threat detection.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Security fundamentals, cryptography, cloud security models, and Linux security auditing.',
      skills: [
        {
          id: 'sec-foundations-crypto',
          title: 'Security Fundamentals & Cryptographic Primitives',
          category: 'Security Basics',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: [],
          description: 'Master core cybersecurity concepts: CIA Triad (Confidentiality, Integrity, Availability), symmetric vs asymmetric encryption (AES, RSA, ECC), cryptographic hashing (SHA-256), digital signatures, and public key infrastructure (PKI).',
          whatToLearn: [
            'CIA Triad: Confidentiality, Integrity, and Availability principles in cloud systems',
            'Symmetric encryption (AES-256-GCM) vs Asymmetric encryption (RSA, Elliptic Curve Cryptography / ECC)',
            'Cryptographic hashing: SHA-256, HMAC for message authentication, salt, collision resistance',
            'Public Key Infrastructure (PKI): Certificate Authorities (CAs), X.509 certificates, SSL/TLS handshake, mutual TLS (mTLS)',
            'Common attack vectors: eavesdropping, man-in-the-middle (MITM), replay attacks, brute force'
          ],
          whyItMatters: 'Cryptography is the mathematical foundation of all data security. Improper cipher choices or flawed key management expose sensitive data to decryption.',
          productionUse: 'Encrypting data at rest, establishing secure transport tunnels, and validating message integrity.',
          aiRelevance: 'Low',
          aiWorkflow: 'Learn cryptographic protocols through official NIST and RFC standards; never write custom cryptographic algorithms.',
          handsOnTask: 'Write a script that securely encrypts and decrypts sensitive payload data using AES-256-GCM with authenticated tags and random initialization vectors (IVs).',
          projectApplication: 'Provides the cryptographic foundation for all secure cloud architectures.',
          resources: [
            { title: 'NIST Computer Security Resource Center', url: 'https://csrc.nist.gov/', type: 'standard' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sec-cloud-iam-hardening',
          title: 'Cloud IAM Architecture & Least-Privilege Hardening',
          category: 'Identity & Access',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sec-foundations-crypto'],
          description: 'Master cloud identity governance: IAM policies, least-privilege principle, multi-factor authentication (MFA), role assumption, session policies, and automated IAM credential rotation.',
          whatToLearn: [
            'IAM policy evaluation logic: Explicit Deny beats Allow, resource-based vs identity-based policies',
            'Enforcing Principle of Least Privilege: eliminating wildcard permissions ("*", "Action": "*")',
            'Temporary credentials: AWS STS (AssumeRole, AssumeRoleWithWebIdentity for Kubernetes workloads)',
            'Multi-Factor Authentication (MFA) enforcement policies and conditional access based on IP/geography',
            'Auditing permissions: AWS IAM Access Analyzer, detecting cross-account access and unused credentials'
          ],
          whyItMatters: 'Over-permissioned cloud credentials are the #1 attack vector in cloud environments, allowing attackers to escalate privileges from a compromised instance.',
          productionUse: 'Hardening cloud infrastructure against credential theft and privilege escalation.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to audit IAM JSON policies against least-privilege standards; verify conditions and resource ARNs carefully.',
          handsOnTask: 'Perform an automated audit on an AWS account to identify and revoke all unused credentials, wildcard policies, and non-MFA root users.',
          projectApplication: 'Secures all access layers in the Automated Cloud Security Compliance project.',
          resources: [
            { title: 'CIS AWS Foundations Benchmark', url: 'https://www.cisecurity.org/benchmark/amazon_web_services', type: 'benchmark' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Zero Trust network security, secrets management (HashiCorp Vault / AWS Secrets Manager), and cloud security posture.',
      skills: [
        {
          id: 'sec-network-zerotrust',
          title: 'Cloud Network Security & Zero Trust Architecture',
          category: 'Network Security',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sec-cloud-iam-hardening'],
          description: 'Implement Zero Trust networking: private VPC architectures, micro-segmentation with security groups, Web Application Firewalls (AWS WAF), DDoS mitigation with AWS Shield, and private VPC Endpoints.',
          whatToLearn: [
            'Zero Trust architecture principles: "Never Trust, Always Verify", assume breach, least privilege per session',
            'Network micro-segmentation: restricting east-west traffic between microservices using granular Security Groups',
            'Web Application Firewall (AWS WAF): defending against SQL injection, cross-site scripting (XSS), rate limiting, bot control',
            'Private VPC Endpoints (AWS PrivateLink): routing cloud service traffic internally without touching the public internet',
            'DDoS mitigation strategies: AWS Shield Standard vs Advanced, rate-based rules, CloudFront edge caching absorption'
          ],
          whyItMatters: 'Perimeter firewalls are no longer sufficient. If an attacker breaches one server, Zero Trust network segmentation prevents lateral movement to databases.',
          productionUse: 'Protecting corporate APIs against automated scrapers, volumetric DDoS attacks, and unauthorized lateral network traffic.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft AWS WAF regex inspection rules; test against simulated malicious payloads in a test environment.',
          handsOnTask: 'Configure AWS WAF with rate-limiting rules, SQLi/XSS inspection sets, and deploy PrivateLink endpoints for internal S3 access.',
          projectApplication: 'Hardens the network perimeter for the Zero Trust Cloud Architecture project.',
          resources: [
            { title: 'NIST Zero Trust Architecture (SP 800-207)', url: 'https://csrc.nist.gov/publications/detail/sp/800-207/final', type: 'standard' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sec-secrets-encryption',
          title: 'Secrets Management & Key Management Services (KMS / Vault)',
          category: 'Secrets & Encryption',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['sec-network-zerotrust'],
          description: 'Secure enterprise secrets and data encryption: AWS KMS (customer-managed keys, envelope encryption), AWS Secrets Manager (automated database credential rotation), and HashiCorp Vault.',
          whatToLearn: [
            'Envelope encryption: Key Encryption Keys (KEKs) protecting Data Encryption Keys (DEKs) locally',
            'AWS Key Management Service (KMS): key policies, key rotation, separating cryptographer role from operator role',
            'AWS Secrets Manager: automated credential rotation for RDS databases using Lambda rotators',
            'HashiCorp Vault: dynamic secrets, transit encryption engine, policy enforcement, PKI engine',
            'Preventing secret leaks in Git: pre-commit hooks with Gitleaks / TruffleHog'
          ],
          whyItMatters: 'Hardcoded API keys in Git repositories are discovered by automated bot scrapers in seconds. Dynamic secrets eliminate static credentials.',
          productionUse: 'Securing database passwords, API keys, and sensitive financial data across enterprise cloud applications.',
          aiRelevance: 'Low',
          aiWorkflow: 'Never feed real API keys or secrets into AI tools; test rotation scripts in staging environments with ephemeral test credentials.',
          handsOnTask: 'Set up an automated secret rotation pipeline where an AWS Lambda function rotates an RDS database password every 30 days without application downtime.',
          projectApplication: 'Provides secrets and encryption management across all cloud deliverables.',
          resources: [
            { title: 'AWS KMS Cryptographic Details Whitepaper', url: 'https://docs.aws.amazon.com/kms/latest/cryptographic-details/welcome.html', type: 'whitepaper' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Container security, Kubernetes security (RBAC, NetworkPolicies, admission controllers), and static code analysis.',
      skills: [
        {
          id: 'sec-container-kubernetes',
          title: 'Container & Kubernetes Security Hardening',
          category: 'Workload Security',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['sec-secrets-encryption'],
          description: 'Harden cloud-native workloads: vulnerability scanning with Trivy, Kubernetes RBAC, NetworkPolicies, Pod Security Standards (PSS), Kyverno / OPA Gatekeeper admission controllers, and Falco runtime security.',
          whatToLearn: [
            'Container image hardening: minimal base images, non-root users, read-only root filesystems, dropping Linux capabilities',
            'Kubernetes Role-Based Access Control (RBAC): Role, ClusterRole, RoleBinding, avoiding cluster-admin over-permissioning',
            'Kubernetes NetworkPolicies: default deny-all ingress/egress policies and white-listing specific inter-pod communication',
            'Admission Controllers: enforcing security policies at deployment time with Kyverno or OPA Gatekeeper',
            'Runtime threat detection with Falco: detecting unauthorized shell executions, sensitive file reads (/etc/shadow), and privilege escalation inside running containers'
          ],
          whyItMatters: 'Containers are ephemeral and share the host Linux kernel. A compromised container without security constraints allows attackers to break out and compromise the host node.',
          productionUse: 'Securing multi-tenant Kubernetes clusters in financial, healthcare, and enterprise environments.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft Kubernetes NetworkPolicies; test policy blocking behavior on live clusters to ensure valid traffic is not accidentally severed.',
          handsOnTask: 'Implement default-deny NetworkPolicies on a Kubernetes cluster, configure Kyverno admission control to block root containers, and verify Falco alerts on shell spawning.',
          projectApplication: 'Core security layer for the Hardened Kubernetes Platform project.',
          resources: [
            { title: 'Kubernetes Official Security Best Practices', url: 'https://kubernetes.io/docs/concepts/security/security-checklist/', type: 'documentation' },
            { title: 'Falco Cloud Native Runtime Security', url: 'https://falco.org/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sec-devsecops-iac',
          title: 'DevSecOps & Infrastructure as Code Security (Checkov / tfsec)',
          category: 'DevSecOps',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['sec-container-kubernetes'],
          description: 'Shift security left: static analysis for IaC (Checkov, tfsec), Software Composition Analysis (Snyk / Dependabot), SAST code scanning, and CI/CD security quality gates.',
          whatToLearn: [
            'Shifting security left: catching misconfigurations during code review before resources are provisioned in the cloud',
            'Static Application Security Testing (SAST) and Software Composition Analysis (SCA) to detect vulnerable dependencies',
            'IaC security scanning with Checkov / tfsec: detecting unencrypted S3 buckets, open security groups, and missing logging',
            'Automated CI/CD security gates in GitHub Actions: blocking pull requests that introduce High or Critical security policy violations'
          ],
          whyItMatters: 'Fixing a security vulnerability in production costs 10x more than catching it during code review. Automated security linters prevent vulnerable infrastructure from ever being deployed.',
          productionUse: 'Enforcing organizational security policies across all developer pull requests automatically.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate custom Checkov Python policy rules tailored to internal compliance standards.',
          handsOnTask: 'Integrate Checkov and Trivy into a GitHub Actions CI pipeline that automatically scans Terraform code and container images, blocking PR merges on failures.',
          projectApplication: 'Enforces security quality gates across all portfolio repositories.',
          resources: [
            { title: 'Checkov Documentation', url: 'https://www.checkov.io/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Cloud threat detection, SIEM log analysis, AWS GuardDuty / Security Hub, and automated incident response.',
      skills: [
        {
          id: 'sec-threat-detection-siem',
          title: 'Threat Detection, Cloud SIEM & AWS GuardDuty / Security Hub',
          category: 'Threat Detection',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['sec-devsecops-iac'],
          description: 'Detect and investigate intrusions: AWS GuardDuty (anomaly detection, cryptomining, compromised credentials), Security Hub, VPC Flow Logs analysis, CloudTrail auditing, and centralized SIEM log pipelines.',
          whatToLearn: [
            'AWS GuardDuty: continuous threat detection analyzing VPC Flow Logs, DNS query logs, CloudTrail management/data events, and EKS audit logs',
            'AWS Security Hub: centralizing security alerts, compliance scores against CIS AWS Benchmarks and PCI DSS standards',
            'Analyzing VPC Flow Logs: detecting port scans, beaconing traffic to known malicious IPs, and data exfiltration spikes',
            'Centralized Security Information and Event Management (SIEM): aggregating cloud audit logs into OpenSearch / Splunk / Datadog for forensic analysis',
            'Threat hunting: searching for IOCs (Indicators of Compromise) across multi-account cloud environments'
          ],
          whyItMatters: 'Preventive controls can be bypassed. Real-time threat detection spots active adversaries within minutes instead of months.',
          productionUse: 'Operating a Cloud Security Operations Center (SOC) and responding to active security alerts.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to summarize complex multi-line CloudTrail JSON logs and formulate Athena SQL log investigation queries.',
          handsOnTask: 'Simulate an unauthorized cloud reconnaissance attack in an isolated AWS sandbox, observe GuardDuty alerts, and query VPC Flow Logs using Athena.',
          projectApplication: 'Core threat detection engine for the Automated Cloud Security & Incident Response Platform.',
          resources: [
            { title: 'AWS GuardDuty Documentation', url: 'https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sec-incident-response-automation',
          title: 'Automated Cloud Incident Response & Forensics',
          category: 'Incident Response',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sec-threat-detection-siem'],
          description: 'Automate security containment: EventBridge triggered Lambda remediation (quarantining compromised EC2 instances, revoking compromised IAM sessions), snapshot forensics, and memory analysis.',
          whatToLearn: [
            'Automated response workflows: AWS EventBridge rules triggering remediation Lambda functions upon GuardDuty findings',
            'Automated containment actions: detaching IAM roles, attaching isolation security groups, revoking active STS tokens',
            'Forensic acquisition: taking immediate EBS volume snapshots of compromised instances for forensic disk analysis',
            'Cloud forensics investigation: mounting snapshots to an isolated analysis VM, timeline analysis, recovering malware artifacts'
          ],
          whyItMatters: 'Human incident response takes hours; automated remediation contains compromised servers in seconds, preventing ransomware from spreading.',
          productionUse: 'Automated SOC containment pipelines in high-threat enterprise cloud environments.',
          aiRelevance: 'Low',
          aiWorkflow: 'Incident response playbooks must be rigorously tested in sandboxes to ensure automated actions do not inadvertently take down production services.',
          handsOnTask: 'Build an automated incident response pipeline with EventBridge and Lambda that immediately isolates an EC2 instance with an isolation security group when GuardDuty flags malware.',
          projectApplication: 'Powers automated containment for the Automated Cloud Security & Incident Response Platform.',
          resources: [
            { title: 'AWS Security Incident Response Guide', url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Cloud security interviews, compliance frameworks (SOC 2, ISO 27001), and security portfolio.',
      skills: [
        {
          id: 'sec-compliance-frameworks',
          title: 'Cloud Compliance Frameworks: SOC 2, HIPAA & CIS Benchmarks',
          category: 'Compliance & Governance',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['sec-incident-response-automation'],
          description: 'Align cloud infrastructure with regulatory mandates: SOC 2 Trust Services Criteria, ISO/IEC 27001, HIPAA security rules, PCI DSS for payment cards, and automated compliance tracking.',
          whatToLearn: [
            'SOC 2 Type I and Type II compliance: Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy)',
            'ISO/IEC 27001 Information Security Management Systems (ISMS) controls',
            'Health Insurance Portability and Accountability Act (HIPAA) Security Rule for healthcare data in the cloud',
            'Automating compliance evidence collection using AWS Audit Manager and cloud security posture tools'
          ],
          whyItMatters: 'Enterprise B2B SaaS deals stall without SOC 2 certification. Cloud security engineers lead the technical implementation required to pass audits.',
          productionUse: 'Preparing corporate cloud platforms for annual security audits and customer security questionnaires.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to cross-reference cloud infrastructure configurations against specific SOC 2 and CIS benchmark controls.',
          handsOnTask: 'Conduct a comprehensive compliance gap assessment on an AWS environment against the CIS AWS Foundations Benchmark, generating remediation scripts for all non-compliant findings.',
          projectApplication: 'Provides the compliance audit framework for the capstone project.',
          resources: [
            { title: 'AWS Compliance Center', url: 'https://aws.amazon.com/compliance/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sec-interview-portfolio',
          title: 'Cloud Security Engineer Interviews & Portfolio Showcase',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['sec-compliance-frameworks'],
          description: 'Excel in cloud security technical interviews: threat modeling (STRIDE), cloud security architecture whiteboards, incident triage scenarios, and an ATS resume.',
          whatToLearn: [
            'Threat modeling methodologies: STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)',
            'Cloud Security Architecture whiteboard rounds: designing a secure multi-account AWS architecture for a fintech application',
            'Incident response scenarios: walking interviewers through diagnosing compromised access keys and containing active breaches',
            'Crafting resume bullets highlighting compliance milestones (SOC 2 Type II passed), automated vulnerability reduction percentages, and threat containment speed'
          ],
          whyItMatters: 'Cloud security hiring managers look for candidates who balance uncompromising security standards with developer productivity.',
          productionUse: 'Securing Cloud Security Engineer, DevSecOps Engineer, and Information Security Architect positions.',
          aiRelevance: 'High',
          aiWorkflow: 'Conduct mock threat modeling sessions with AI on complex cloud architectures to practice identifying edge-case vulnerabilities.',
          handsOnTask: 'Complete a formal STRIDE threat modeling document and Terraform security blueprint for an enterprise payment processing cloud application.',
          projectApplication: 'Presents your complete cloud security engineering portfolio to hiring leads.',
          resources: [
            { title: 'OWASP Threat Modeling Guide', url: 'https://owasp.org/www-community/Threat_Modeling', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'sec-proj-1',
      title: 'Automated Cloud Security Compliance & Auditing Pipeline',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build an automated cloud compliance scanner that evaluates an AWS account against the CIS AWS Foundations Benchmark, generates security reports, and alerts on critical misconfigurations.',
      technologies: ['Python (boto3)', 'AWS Config', 'AWS IAM', 'Terraform', 'Slack Webhooks'],
      skillsPracticed: ['IAM auditing', 'CIS benchmark compliance', 'Python boto3 SDK', 'Security automation', 'Alerting'],
      requirements: [
        'Automated Python audit script querying AWS IAM, S3, and VPC configurations via boto3 SDK',
        'Verifying compliance against CIS benchmarks: checking root MFA, password policies, unencrypted S3 buckets, and open port 22/3389 security groups',
        'Generating a structured JSON and executive HTML audit report detailing compliance score and remediation steps',
        'Sending automated Slack alerts when non-compliant high-severity security findings are detected'
      ],
      deliverables: [
        'GitHub repository with complete Python auditing tool and automated execution instructions',
        'Sample HTML compliance audit report demonstrating CIS benchmark scoring',
        'Terraform scripts providing automated remediation for common misconfigurations'
      ],
      productionExpectations: [
        'Read-only IAM permissions for the scanner ensuring zero accidental production modification',
        'Execution completes in under 60 seconds across standard cloud accounts'
      ],
      aiIntegration: 'Use AI to generate CIS benchmark policy verification check functions in Python.'
    },
    {
      id: 'sec-proj-2',
      title: 'Hardened Kubernetes Platform with Kyverno, Falco & NetworkPolicies',
      difficulty: 'Intermediate',
      estimatedTime: '5 weeks',
      objective: 'Deploy and secure a multi-tenant Kubernetes cluster with strict NetworkPolicies, Kyverno admission control, Trivy image scanning, and Falco runtime threat detection.',
      technologies: ['Kubernetes', 'Kyverno', 'Falco', 'Trivy', 'Helm', 'Prometheus'],
      skillsPracticed: ['Kubernetes hardening', 'Network micro-segmentation', 'Admission control policies', 'Runtime threat detection', 'Container scanning'],
      requirements: [
        'Default-deny Kubernetes NetworkPolicies restricting inter-namespace and inter-pod traffic to explicitly allowed connections',
        'Kyverno admission controller policies blocking root containers, requiring read-only root filesystems, and enforcing resource limits',
        'Trivy automated image scanning integrated into the deployment pipeline blocking images with Critical CVEs',
        'Falco runtime threat engine configured with custom rules detecting unauthorized shell execution and sensitive file access with Slack alerts'
      ],
      deliverables: [
        'GitHub repository containing all Kubernetes security manifests, Kyverno policies, and Helm configurations',
        'Security test verification report demonstrating admission controller blocking of non-compliant pods',
        'Live Falco alert logs capturing simulated container privilege escalation attempts'
      ],
      productionExpectations: [
        'Zero privileged containers permitted to run on the cluster',
        'Full compliance with CIS Kubernetes Benchmark standards'
      ],
      aiIntegration: 'Use AI to assist in drafting complex Kyverno policy validation rules and Falco macro expressions.'
    },
    {
      id: 'sec-proj-3',
      title: 'Automated Cloud Threat Detection & Incident Response Platform',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise automated cloud security platform featuring AWS GuardDuty, Security Hub, EventBridge, and Lambda automated containment playbooks.',
      technologies: ['AWS (GuardDuty, Security Hub, EventBridge, Lambda, KMS)', 'Terraform', 'Python', 'Athena', 'Slack API'],
      skillsPracticed: ['Threat detection', 'Automated containment', 'Cloud forensics', 'VPC Flow Log analysis', 'EventBridge automation'],
      requirements: [
        'Centralized AWS GuardDuty and Security Hub deployment monitoring multi-account cloud telemetry',
        'EventBridge rules intercepting high-severity GuardDuty findings (e.g., Trojan, Cryptomining, Compromised IAM credentials)',
        'Automated Lambda containment playbooks: immediately revoking compromised IAM user access keys, attaching an isolation security group to compromised EC2 instances, and taking an immediate forensic EBS snapshot',
        'Amazon Athena queries pre-configured to search VPC Flow Logs and CloudTrail logs for attacker IP activity and data exfiltration volume',
        'Rich Slack notification cards detailing finding severity, compromised asset ID, and automated actions taken'
      ],
      deliverables: [
        'Production Terraform repository provisioning the complete detection, routing, and response architecture',
        'Automated Lambda containment source code with comprehensive unit test coverage',
        'Comprehensive Cloud Incident Response Playbook documentation detailing manual follow-up forensic procedures'
      ],
      productionExpectations: [
        'Sub-30 second automated containment execution from GuardDuty alert generation to instance isolation',
        'Zero disruption to non-compromised production workloads verified through strict tagging gates'
      ],
      aiIntegration: 'Use AI to generate Athena SQL query templates for hunting compromised IP addresses across gigabytes of CloudTrail logs.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Cybersecurity fundamentals: CIA Triad, symmetric/asymmetric cryptography, and PKI/TLS',
      'Cloud Identity and Access Management (IAM): least privilege, policy evaluation, and temporary credentials (STS)',
      'Zero Trust network security: VPC subnets, micro-segmentation, AWS WAF, and PrivateLink endpoints',
      'Secrets management and data encryption: AWS KMS (envelope encryption) and AWS Secrets Manager',
      'Container and Kubernetes security: non-root containers, NetworkPolicies, and Pod Security Standards',
      'Admission controllers and policy-as-code: Kyverno or Open Policy Agent (OPA) Gatekeeper',
      'Runtime threat detection: Falco and container anomaly monitoring',
      'DevSecOps: shifting security left with Checkov, tfsec, and Trivy in GitHub Actions CI/CD',
      'Cloud threat detection: AWS GuardDuty, Security Hub, and VPC Flow Log analysis',
      'Automated incident response with EventBridge and Lambda containment playbooks'
    ],
    projects: [
      'Automated cloud security compliance and auditing pipeline with Python and CIS benchmarks',
      'Hardened Kubernetes platform with Kyverno admission control, NetworkPolicies, and Falco',
      'Enterprise automated threat detection and incident response platform on AWS',
      'All security infrastructure codified in public GitHub repositories with architecture diagrams'
    ],
    csFundamentals: [
      'Cryptographic algorithms: AES-GCM, RSA, Elliptic Curve (ECDSA), SHA-256 collision resistance',
      'Network security protocols: TLS 1.3 cryptographic handshakes, IPsec, firewall state tracking',
      'Operating systems security: Linux namespaces, cgroups, capabilities, seccomp, AppArmor',
      'Threat modeling methodologies: STRIDE, Attack Trees, and MITRE ATT&CK for Cloud matrix'
    ],
    tools: [
      'Cloud security tools: AWS GuardDuty, Security Hub, CloudTrail, AWS WAF, AWS KMS',
      'Container & IaC security tools: Trivy, Checkov, tfsec, Kyverno, Falco',
      'Infrastructure as Code: Terraform and OpenTofu',
      'Forensics and analysis: Amazon Athena, Wireshark, tcpdump'
    ],
    deployment: [
      'Deploying security monitoring and automated remediation infrastructure using Terraform',
      'Managing automated CI/CD security scanning gates in GitHub Actions',
      'Configuring automated certificate renewal and encryption key rotation policies',
      'Deploying multi-tenant Kubernetes security controllers and admission policies'
    ],
    portfolio: [
      'Cloud security portfolio showcasing architectural network isolation diagrams',
      'In-depth technical write-ups detailing threat models, incident response playbooks, and compliance audits',
      'Live demonstration screenshots capturing automated incident containment in action',
      'Clear documentation detailing risk reduction metrics, vulnerability remediation timelines, and SOC 2 alignment'
    ],
    github: [
      'Public GitHub repositories with clean, modular Terraform security configurations',
      'Comprehensive READMEs with architecture diagrams, threat models, and setup runbooks',
      'Passing CI workflow badges demonstrating automated security scanning with Checkov and Trivy',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant Cloud Security Engineer resume in PDF format',
      'Bullet points highlighting measurable security achievements: vulnerabilities remediated, SOC 2 compliance attained, containment speed',
      'Direct links to GitHub repositories, incident response playbooks, and LinkedIn profile',
      'Targeted keywords matching cloud security engineer, DevSecOps engineer, and security architect roles'
    ],
    interviewReadiness: [
      'Mastery of STRIDE threat modeling on cloud architectures during whiteboard interviews',
      'Fluency in live incident response triage scenarios (compromised access keys, ransomware containment)',
      'Ability to clearly articulate IAM policy evaluation logic and Zero Trust networking principles',
      'Structured STAR behavioral stories communicating cross-team security influence and incident leadership'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['cloudSecurity'] = cloudSecurityRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cloudSecurityRoadmap;
}
