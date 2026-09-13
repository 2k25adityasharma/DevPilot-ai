/**
 * DevPilot-AI — Career Roadmap: Site Reliability Engineer (SRE)
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const sreRoadmap = {
  roleId: 'site-reliability-engineer',
  roadmapId: 'sre',
  title: 'Site Reliability Engineer (SRE)',
  category: 'devops-cloud',
  description: 'Apply software engineering to operations systems: define and defend Service Level Objectives (SLOs), manage error budgets, automate incident response, conduct chaos engineering, and scale distributed infrastructure.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Systems programming in Go/Python, Linux performance profiling, networking fundamentals, and SRE principles.',
      skills: [
        {
          id: 'sre-systems-prog',
          title: 'Systems Programming for SRE (Go & Python Automation)',
          category: 'Automation Programming',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master systems programming for automation and tooling: Go fundamentals (goroutines, channels, interfaces, HTTP services) or Python, interacting with cloud APIs, and automating operational toil.',
          whatToLearn: [
            'Go systems programming: structs, interfaces, pointers, error handling, goroutines, channels, and context packages',
            'Building operational CLI tools in Go using Cobra and Viper',
            'Automating repetitive operational tasks (toil reduction) with Python scripts and cloud SDKs (boto3)',
            'Interacting programmatically with Kubernetes APIs (client-go) and Docker APIs',
            'Writing unit tests and integration tests for reliability automation tools'
          ],
          whyItMatters: 'The core SRE philosophy is: "Treat operations as a software problem." SREs write code to eliminate manual operational toil.',
          productionUse: 'Developing automated remediation daemons, custom Prometheus exporters, and Kubernetes controllers.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to scaffold Go CLI tools using Cobra; review concurrency primitives and goroutine leak prevention manually.',
          handsOnTask: 'Build a production-grade CLI utility in Go that queries cloud infrastructure health, checks SSL certificate expirations, and outputs structured JSON alerts.',
          projectApplication: 'Serves as the programming foundation for all custom SRE reliability automation tools.',
          resources: [
            { title: 'The Go Programming Language by Donovan & Kernighan', url: 'https://www.gopl.io/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sre-linux-troubleshooting',
          title: 'Linux Performance Analysis & Systems Troubleshooting',
          category: 'Systems Analysis',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sre-systems-prog'],
          description: 'Master systems-level performance debugging: Brendan Gregg’s USE Method (Utilization, Saturation, Errors), kernel profiling, vmstat, iostat, strace, perf, and memory leak analysis.',
          whatToLearn: [
            'Brendan Gregg’s USE Method: Utilization, Saturation, and Errors across CPU, Memory, Disk I/O, and Network interfaces',
            'Linux performance analysis tools: uptime, dmesg, vmstat 1, iostat -xz 1, free -m, sar, mpstat',
            'Deep process inspection: strace (system call tracing), lsof (open file handles), /proc file system introspection',
            'Diagnosing Out Of Memory (OOM) killer events: dmesg analysis, swap space tuning, and cgroup memory limits',
            'Network troubleshooting: netstat/ss, tcpdump, analyzing packet retransmissions, TCP connection resets'
          ],
          whyItMatters: 'When a critical production service stalls, SREs must quickly determine whether the root cause is CPU starvation, memory paging, disk I/O wait, or network congestion.',
          productionUse: 'Diagnosing production server freezes, high latency spikes, and container crash loops in real time.',
          aiRelevance: 'Low',
          aiWorkflow: 'Analyze real system metrics with terminal CLI tools; AI cannot inspect live Linux kernel memory or run strace traces.',
          handsOnTask: 'Use strace and vmstat to diagnose and resolve a deliberately stalled Linux process suffering from I/O blocking and file handle exhaustion.',
          projectApplication: 'Used in live incident triage and performance tuning across all SRE projects.',
          resources: [
            { title: 'Brendan Gregg: Linux Performance Analysis in 60 Seconds', url: 'https://www.brendangregg.com/linuxperf.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'The SRE framework: SLIs, SLOs, SLAs, Error Budgets, and alerting principles.',
      skills: [
        {
          id: 'sre-sli-slo-errorbudgets',
          title: 'Service Level Objectives (SLIs / SLOs) & Error Budget Management',
          category: 'SRE Methodology',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sre-linux-troubleshooting'],
          description: 'Implement Google SRE reliability principles: Service Level Indicators (SLIs), Service Level Objectives (SLOs), Service Level Agreements (SLAs), Error Budgets, and error budget policy enforcement.',
          whatToLearn: [
            'Definitions: SLI (what you measure), SLO (internal target, e.g., 99.9%), SLA (contractual promise with penalties)',
            'Measuring SLIs: Availability (good requests / total valid requests) and Latency (requests faster than threshold / total valid requests)',
            'Error Budgets: 100% - SLO (e.g., 99.9% SLO allows 0.1% error budget, or 43 minutes of downtime per month)',
            'Error Budget Policies: freezing feature releases and shifting engineering focus to reliability when error budgets are exhausted',
            'Multi-window multi-burn-rate alerting: alerting based on how fast the error budget is burning (e.g., burning 2% in 1 hour) to eliminate alert fatigue'
          ],
          whyItMatters: '100% reliability is the wrong target; it is prohibitively expensive and halts feature innovation. SLOs and Error Budgets balance developer velocity against user satisfaction.',
          productionUse: 'Establishing quantitative reliability standards between product managers and engineering teams.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate PromQL burn rate alert expressions; establish error budget thresholds in direct partnership with product stakeholders.',
          handsOnTask: 'Define a formal Service Level Objective (SLO) for an e-commerce checkout API and write PromQL queries calculating real-time error budget burn rates.',
          projectApplication: 'Provides the reliability framework for the Automated SLO & Error Budget Defense Platform project.',
          resources: [
            { title: 'Google SRE Book: Service Level Objectives', url: 'https://sre.google/sre-book/service-level-objectives/', type: 'book' },
            { title: 'The Site Reliability Workbook', url: 'https://sre.google/workbook/table-of-contents/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sre-observability-prometheus',
          title: 'Advanced Observability: Prometheus, OpenTelemetry & Distributed Tracing',
          category: 'Telemetry',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sre-sli-slo-errorbudgets'],
          description: 'Implement end-to-end telemetry: OpenTelemetry instrumentation, Prometheus metrics (histograms, quantiles), Grafana dashboards, Jaeger distributed tracing, and symptom-based alerting.',
          whatToLearn: [
            'The Four Golden Signals: Latency, Traffic, Errors, and Saturation',
            'Prometheus metrics: Counters, Gauges, Histograms (calculating p95/p99 latency percentiles with histogram_quantile)',
            'OpenTelemetry (OTel): instrumenting microservices with trace contexts, span attributes, and exporting to Jaeger / Tempo',
            'Symptom-based vs cause-based alerting: alerting on high error rates and customer impact rather than CPU spikes',
            'Grafana dashboard design: building executive SLO overview panels alongside deep-dive diagnostic drilldowns'
          ],
          whyItMatters: 'Distributed microservice requests touch dozens of independent services. Distributed tracing is the only way to track where a 2-second delay originates.',
          productionUse: 'Monitoring enterprise microservices, tracking SLO compliance, and speeding up incident resolution.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to write PromQL queries for histogram quantile calculations; verify bucket configurations to prevent quantile distortions.',
          handsOnTask: 'Instrument a multi-service application with OpenTelemetry and Prometheus, create a Grafana SLO dashboard, and configure burn rate alerts.',
          projectApplication: 'Core monitoring layer for the Automated SLO & Error Budget Platform project.',
          resources: [
            { title: 'OpenTelemetry Documentation', url: 'https://opentelemetry.io/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Incident response, on-call management, blameless post-mortems, and automated self-healing.',
      skills: [
        {
          id: 'sre-incident-management',
          title: 'Incident Management, Triage & Blameless Post-Mortems',
          category: 'Incident Operations',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['sre-observability-prometheus'],
          description: 'Lead high-severity incident response: Incident Commander (IC) role, communications leads, PagerDuty on-call escalation, blameless post-mortems, and Root Cause Analysis (RCA).',
          whatToLearn: [
            'Incident Command System (ICS): Incident Commander, Operations Lead, Communications Lead, Scribe',
            'On-call hygiene: PagerDuty / Opsgenie escalation policies, reducing alert fatigue, keeping actionable pages only',
            'Incident communication: drafting internal stakeholder updates and external public status page communications (Statuspage.io)',
            'Blameless Post-Mortem methodology: analyzing systemic causes rather than blaming human error, establishing "Five Whys" analysis',
            'Action item tracking: turning outage findings into high-priority engineering tasks to prevent recurrence'
          ],
          whyItMatters: 'Outages happen to every company. High-performing SRE teams treat incidents as learning opportunities to make systems permanently more resilient.',
          productionUse: 'Leading corporate SEV-1 and SEV-2 outage response teams and maintaining transparency with executive leadership.',
          aiRelevance: 'Low',
          aiWorkflow: 'Incident command requires human leadership, clear communication, and calm judgment under intense pressure.',
          handsOnTask: 'Run a simulated live production outage drill acting as Incident Commander, coordinate the team triage response, and author a comprehensive blameless post-mortem.',
          projectApplication: 'Direct preparation for real-world on-call rotations and incident management.',
          resources: [
            { title: 'PagerDuty Incident Response Documentation', url: 'https://response.pagerduty.com/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sre-automation-selfhealing',
          title: 'Automated Remediation & Self-Healing Infrastructure',
          category: 'Reliability Automation',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sre-incident-management'],
          description: 'Automate system recovery: automated pod restarts, auto-scaling healing, automated runbook execution with event-driven webhooks, and Kubernetes health checks.',
          whatToLearn: [
            'Automated runbook execution: triggering automated recovery scripts via Alertmanager / PagerDuty webhooks',
            'Kubernetes self-healing: Liveness, Readiness, and Startup probes, container restart policies, Pod Disruption Budgets (PDB)',
            'Circuit Breaker pattern and automatic traffic shed during backend database distress',
            'Graceful degradation: serving stale cached data or shedding non-critical features during high-load spikes'
          ],
          whyItMatters: 'If a known fix requires restarting a stuck process or clearing a disk cache, a computer should do it automatically within seconds without waking up an engineer.',
          productionUse: 'Automatically resolving routine infrastructure anomalies with zero human intervention.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate automated recovery runbook scripts; test automated restart sequences in staging to prevent cascading restart loops.',
          handsOnTask: 'Build an automated self-healing controller that detects deadlocked worker processes via health check timeouts and safely recycles them without dropping in-flight jobs.',
          projectApplication: 'Powers the automated self-healing tier of the Production SRE Platform.',
          resources: [
            { title: 'Kubernetes Pod Lifecycle & Probes', url: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Chaos engineering (Chaos Mesh / LitmusChaos), load testing with k6, and capacity planning.',
      skills: [
        {
          id: 'sre-chaos-engineering',
          title: 'Chaos Engineering & Fault Injection (Chaos Mesh / LitmusChaos)',
          category: 'Chaos & Resilience',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['sre-automation-selfhealing'],
          description: 'Proactively test system resilience: Chaos Engineering principles, fault injection (Chaos Mesh / LitmusChaos), simulating pod kills, network latency, packet loss, and disk fills in production-like environments.',
          whatToLearn: [
            'Principles of Chaos Engineering: formulating hypotheses, defining steady state, introducing real-world events, observing outcomes',
            'Fault injection categories: Pod crashes (pod-kill), network chaos (latency, packet loss, corrupt packets, network partitions), I/O chaos (disk fills, latency)',
            'Chaos Mesh / LitmusChaos on Kubernetes: defining chaos experiments via custom resource definitions (CRDs)',
            'GameDay exercises: coordinating live fire drills where engineers test system resilience and observability visibility',
            'Blast radius containment: ensuring chaos experiments can be aborted immediately if customer-facing SLOs are threatened'
          ],
          whyItMatters: 'You do not know if your failover system works until it is tested under realistic failure conditions. Chaos engineering exposes weaknesses before real outages occur.',
          productionUse: 'Validating multi-region failovers, verifying circuit breaker triggers, and building resilient distributed systems.',
          aiRelevance: 'Low',
          aiWorkflow: 'Chaos experiments must be observed on live telemetry dashboards; never run unmonitored automated chaos experiments in production.',
          handsOnTask: 'Execute a Chaos Mesh experiment on a Kubernetes cluster that injects 300ms network latency and 10% packet loss, verifying that circuit breakers trigger as expected.',
          projectApplication: 'Validates resilience in the Chaos Engineering & Automated Resilience Test Platform project.',
          resources: [
            { title: 'Chaos Mesh Documentation', url: 'https://chaos-mesh.org/docs/', type: 'documentation' },
            { title: 'Principles of Chaos Engineering', url: 'https://principlesofchaos.org/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sre-capacity-loadtesting',
          title: 'Capacity Planning, Load Testing (k6) & Auto-Tuning',
          category: 'Capacity Planning',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['sre-chaos-engineering'],
          description: 'Plan infrastructure capacity: load and stress testing with k6, identifying breaking points, modeling organic growth, rightsizing cloud resources, and auto-tuning garbage collection.',
          whatToLearn: [
            'Load testing methodologies: Smoke test, Load test, Stress test (finding the breaking point), Spike test, Soak/Endurance test (memory leaks)',
            'Scripting realistic load tests with k6: virtual users, ramping stages, custom metrics, and thresholds',
            'Capacity modeling: organic user growth projections, provisioning compute/memory buffers for seasonal traffic surges',
            'JVM / Node / Go runtime tuning: garbage collection profiling, thread pool sizing, database connection pool limits'
          ],
          whyItMatters: 'Traffic spikes (Black Friday, product launches) crash systems that have never been tested beyond standard traffic levels. Capacity planning prevents scaling emergencies.',
          productionUse: 'Preparing infrastructure for major product launches and preventing cloud resource over-provisioning.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate k6 load testing scenarios with realistic user behavior pacing (think time).',
          handsOnTask: 'Execute an endurance soak test with k6 simulating 5,000 concurrent users for 2 hours to uncover a subtle database connection leak.',
          projectApplication: 'Establishes capacity benchmarks for the Capstone SRE Platform.',
          resources: [
            { title: 'k6 Documentation', url: 'https://k6.io/docs/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'SRE system design interviews, reliability architecture, and engineering portfolio.',
      skills: [
        {
          id: 'sre-interview-sysdesign',
          title: 'SRE System Design Interviews & Non-Abstract Large System Design',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['sre-capacity-loadtesting'],
          description: 'Master senior SRE interview loops: Non-Abstract Large System Design (NALSD), defining SLOs on the whiteboard, failure mode and effects analysis (FMEA), and on-call behavioral interviews.',
          whatToLearn: [
            'Non-Abstract Large System Design (NALSD): designing scalable distributed systems with concrete hardware constraints (RAM, disk I/O, bandwidth)',
            'Failure Mode and Effects Analysis (FMEA): identifying single points of failure, cascading failures, and thundering herd problems',
            'Graceful degradation strategies: load shedding, rate limiting, and priority queues during overload',
            'Behavioral interviews: communicating technical trade-offs with product managers and leading post-mortem retrospectives'
          ],
          whyItMatters: 'Senior SRE interviews focus heavily on how you handle ambiguity, catastrophic hardware failures, and cascading outages under pressure.',
          productionUse: 'Leading enterprise reliability engineering and platform architecture.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive interviewer to challenge your NALSD system designs with simulated hardware component failures.',
          handsOnTask: 'Complete 5 full NALSD whiteboard designs covering a globally distributed video streaming platform and high-frequency trading matching engine.',
          projectApplication: 'Direct preparation for top-tier SRE and production engineering interview panels.',
          resources: [
            { title: 'Google SRE Book: Non-Abstract Large System Design', url: 'https://sre.google/workbook/non-abstract-design/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'sre-portfolio-resume',
          title: 'SRE Portfolio, Blameless Post-Mortems & Quantifiable Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['sre-interview-sysdesign'],
          description: 'Package your reliability engineering work: publishing post-mortem case studies, open-source automation tools on GitHub, SLO dashboards, and an ATS-optimized SRE resume.',
          whatToLearn: [
            'Documenting reliability: publishing realistic blameless post-mortems demonstrating root cause analysis maturity',
            'Crafting quantifiable SRE resume bullets: highlighting MTTR reductions, availability milestones (e.g., 99.99%), and toil reduction percentages',
            'Showcasing open-source automation tools: publishing custom Go CLI utilities or Kubernetes controllers with clean documentation'
          ],
          whyItMatters: 'Demonstrating real post-mortems and automated remediation tools proves you have hands-on operational maturity and software engineering capabilities.',
          productionUse: 'Securing Site Reliability Engineer, Production Engineer, and Platform Reliability Lead positions.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to audit resume bullets to ensure balanced representation of software engineering and systems operations achievements.',
          handsOnTask: 'Publish your capstone SRE repository with a complete SLO framework, Grafana dashboard, automated self-healing scripts, and a sample post-mortem.',
          projectApplication: 'Presents your complete reliability engineering portfolio to hiring leads.',
          resources: [
            { title: 'Awesome Site Reliability Engineering (GitHub)', url: 'https://github.com/dastergon/awesome-sre', type: 'showcase' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'sre-proj-1',
      title: 'Automated SLO & Error Budget Defense Platform',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build a production monitoring and alerting platform with Prometheus, Grafana, and Alertmanager implementing multi-window multi-burn-rate SLO alerting.',
      technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'Docker Compose', 'Go / Python'],
      skillsPracticed: ['SLO and SLI definitions', 'PromQL multi-window burn rates', 'Grafana SLO dashboards', 'Alertmanager routing', 'Error budget calculation'],
      requirements: [
        'Define 99.9% availability and 95% latency (<200ms) SLOs for a sample microservice API',
        'Write PromQL queries calculating error budget burn rates over 1-hour (14.4x rate) and 6-hour (6x rate) windows',
        'Build an executive Grafana dashboard displaying real-time remaining error budget percentages and burn rate gauges',
        'Configure Alertmanager to trigger Slack notifications when the error budget is burning rapidly enough to exhaust in 24 hours'
      ],
      deliverables: [
        'Complete Docker Compose environment with Prometheus, Alertmanager, Grafana, and test service',
        'Documented PromQL rule files with multi-burn-rate alerting logic',
        'Technical write-up detailing the Service Level Objective specification'
      ],
      productionExpectations: [
        'Zero false alerts under temporary single-request transient failures',
        'Immediate alert dispatch within 2 minutes of sustained 10% error rate injection'
      ],
      aiIntegration: 'Use AI to formulate complex multi-window PromQL histogram quantile queries.'
    },
    {
      id: 'sre-proj-2',
      title: 'Chaos Engineering & Automated Resilience Test Platform',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Implement an automated chaos engineering platform on Kubernetes using Chaos Mesh and k6, injecting network partitions, pod kills, and validating self-healing recovery.',
      technologies: ['Kubernetes', 'Chaos Mesh', 'k6', 'Prometheus', 'Grafana', 'Go'],
      skillsPracticed: ['Chaos engineering', 'Fault injection', 'k6 load testing', 'Self-healing validation', 'Resilience reporting'],
      requirements: [
        'Deploy a multi-tier microservice architecture to a local Kubernetes cluster (Kind / Minikube)',
        'Define automated Chaos Mesh experiments simulating network delays (500ms), packet loss (20%), and random pod terminations',
        'Execute continuous k6 traffic load during chaos experiments to measure end-to-end user impact on error rate and latency',
        'Implement circuit breakers and automated retries in the application tier to maintain availability during network partitions'
      ],
      deliverables: [
        'GitHub repository containing Chaos Mesh experiment YAML manifests and k6 test scripts',
        'Grafana dashboard recording steady-state vs chaos-state metrics during experiment execution',
        'Comprehensive Chaos GameDay report detailing system failure points and remediation patches'
      ],
      productionExpectations: [
        'Application maintains 99%+ success rate during simulated node and pod termination experiments',
        'Instantaneous automated abort of chaos experiments if error rates breach safety limits'
      ],
      aiIntegration: 'Use AI to draft Chaos Mesh custom resource definitions and summarize GameDay experimental findings.'
    },
    {
      id: 'sre-proj-3',
      title: 'Production Autonomous Self-Healing & Incident Remediation Platform',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise autonomous remediation engine in Go that listens to Prometheus alerts, executes automated runbooks (pod recycling, circuit breaking, cache flushing), and generates blameless incident reports.',
      technologies: ['Go', 'Kubernetes client-go', 'Prometheus Alertmanager', 'Redis', 'Docker', 'PagerDuty API'],
      skillsPracticed: ['Go systems programming', 'Kubernetes controller logic', 'Automated runbook execution', 'Self-healing architecture', 'Incident automation'],
      requirements: [
        'Custom Go daemon listening to Alertmanager webhook notifications for critical service alerts',
        'Automated runbook engine executing targeted remediation actions (e.g., draining malfunctioning Kubernetes nodes, restarting stuck pods, flushing poison pill caches)',
        'Safety guardrails: rate-limiting automated restarts to prevent cascading reboot storms across the cluster',
        'Automated incident logging: generating a drafted incident timeline and post-mortem summary document with metric snapshots'
      ],
      deliverables: [
        'Containerized Go service with complete Kubernetes deployment manifests and RBAC permissions',
        'Automated integration test suite simulating alert webhooks and verifying self-healing actions',
        'Comprehensive architecture RFC document detailing safety guardrails and rollback protocols'
      ],
      productionExpectations: [
        'Sub-15 second end-to-end automated remediation from alert trigger to service recovery',
        'Zero runaway remediation loops through strict circuit-breaker safety limits'
      ],
      aiIntegration: 'Use AI to parse alert JSON payloads and formulate initial incident post-mortem narrative outlines.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Systems programming for SRE tooling in Go or Python',
      'Linux performance troubleshooting: Brendan Gregg’s USE Method, strace, vmstat, and iostat',
      'Networking protocols: TCP/IP flow control, DNS, TLS handshakes, and packet analysis',
      'Service Level Objectives (SLOs), Service Level Indicators (SLIs), and Error Budget Policies',
      'Multi-window multi-burn-rate alerting to eliminate operational alert fatigue',
      'Observability telemetry: Prometheus metrics, PromQL, Grafana dashboards, and OpenTelemetry tracing',
      'Incident management: Incident Command System (ICS), on-call triage, and blameless post-mortems',
      'Automated remediation and self-healing infrastructure design on Kubernetes',
      'Chaos Engineering: fault injection with Chaos Mesh or LitmusChaos and GameDay drills',
      'Capacity planning and load testing with k6 to identify breaking points and eliminate bottlenecks'
    ],
    projects: [
      'Automated SLO and error budget defense platform with multi-burn-rate PromQL alerts',
      'Chaos engineering and automated resilience test platform with Chaos Mesh and k6',
      'Production autonomous self-healing and incident remediation platform in Go',
      'All projects codified in public GitHub repositories with reproducible environments'
    ],
    csFundamentals: [
      'Operating systems: process scheduling, memory paging, I/O subsystems, system calls',
      'Distributed systems theory: CAP theorem, distributed consensus, cascading failure prevention',
      'Statistical mathematics applied to telemetry: percentiles (p95/p99), histograms, variance',
      'Queueing theory and Little’s Law applied to request concurrency and latency under load'
    ],
    tools: [
      'Programming languages: Go and Python',
      'Telemetry and alerting: Prometheus, Grafana, Alertmanager, Jaeger, OpenTelemetry',
      'Chaos and load testing: Chaos Mesh, LitmusChaos, k6',
      'Container platforms: Kubernetes, Docker, client-go'
    ],
    deployment: [
      'Deploying monitoring and self-healing infrastructure to production Kubernetes clusters',
      'Automated CI/CD pipelines executing load tests and chaos resilience assertions',
      'Managing Prometheus alerting rules and Alertmanager webhook notification endpoints',
      'Configuring automated PagerDuty / Opsgenie on-call escalation policies'
    ],
    portfolio: [
      'SRE engineering portfolio showcasing live Grafana SLO dashboards and architecture diagrams',
      'Published blameless post-mortem case studies demonstrating root-cause diagnostic maturity',
      'Open-source Go automation tools and custom Prometheus exporters on GitHub',
      'Clear documentation detailing MTTR reductions, availability metrics (99.99%), and toil elimination'
    ],
    github: [
      'Public GitHub repositories with clean Go code and complete Kubernetes manifests',
      'Comprehensive READMEs with architecture diagrams and sample incident timelines',
      'Passing CI workflow badges demonstrating automated testing and Go linting',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant Site Reliability Engineer resume in PDF format',
      'Bullet points highlighting measurable reliability metrics: 99.99% availability, MTTR reductions, automated toil reduction',
      'Direct links to GitHub repositories, post-mortem write-ups, and LinkedIn profile',
      'Targeted keywords matching SRE, production engineer, and platform reliability roles'
    ],
    interviewReadiness: [
      'Mastery of Non-Abstract Large System Design (NALSD) whiteboard interviews under hardware constraints',
      'Fluency in live Linux and network diagnostic scenarios (diagnosing high load, memory leaks, packet drops)',
      'Ability to clearly articulate SLOs, error budget policies, and blameless post-mortem culture',
      'Structured STAR behavioral stories communicating high-severity outage leadership and root-cause discovery'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['sre'] = sreRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = sreRoadmap;
}
