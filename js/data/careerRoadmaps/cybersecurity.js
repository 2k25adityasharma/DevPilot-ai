/**
 * DevPilot-AI — Career Roadmap: Cybersecurity Analyst
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const cybersecurityRoadmap = {
  roleId: 'cybersecurity-analyst',
  roadmapId: 'cybersecurity',
  title: 'Cybersecurity Analyst',
  category: 'security-qa',
  description: 'Detect, investigate, and defend against cyber threats in enterprise Security Operations Centers (SOC): network traffic analysis (Wireshark), SIEM log ingestion (Splunk/ELK), vulnerability management, OWASP web application testing, and digital forensics.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Network protocols, packet capture analysis, Linux security fundamentals, and core defense concepts.',
      skills: [
        {
          id: 'cyb-network-analysis',
          title: 'Network Packet Analysis & Protocol Defense (Wireshark)',
          category: 'Network Defense',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master network traffic forensics: deep packet inspection with Wireshark/tcpdump, identifying malicious traffic (port scans, ARP poisoning, DNS exfiltration, brute force), and OSI security.',
          whatToLearn: [
            'Deep packet analysis with Wireshark: display filters, packet dissection, following TCP/HTTP streams',
            'Analyzing network attack signatures: TCP SYN floods, Nmap port scanning patterns, ARP spoofing, ICMP tunneling',
            'DNS security: DNS tunneling detection, malicious domain lookups, and DNSSEC validation',
            'Command-line packet capture: tcpdump syntax, capturing to .pcap files, analyzing packet headers',
            'Network security controls: firewalls, Intrusion Detection Systems (IDS: Snort, Suricata), and VPN tunnels'
          ],
          whyItMatters: 'Network packets do not lie. When a breach occurs, packet captures (PCAP) provide definitive evidence of what data was transmitted and to which external IPs.',
          productionUse: 'Investigating perimeter firewall alerts, detecting malware command-and-control (C2) beacons, and diagnosing anomalous traffic.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Wireshark display filter syntax; analyze raw packet byte streams manually to identify zero-day payloads.',
          handsOnTask: 'Analyze a real packet capture (.pcap) file of an active malware infection in Wireshark, extract the attacker’s C2 IP address, and reconstruct the downloaded payload.',
          projectApplication: 'Core forensic skill for the SOC Threat Detection & SIEM Investigation project.',
          resources: [
            { title: 'Wireshark User’s Guide', url: 'https://www.wireshark.org/docs/wsug_html_chunked/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cyb-linux-windows-security',
          title: 'Linux & Windows Endpoint Security Hardening',
          category: 'Endpoint Security',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['cyb-network-analysis'],
          description: 'Inspect and harden enterprise endpoints: Windows Event Logs (Sysmon), Linux auditd, process inspection, user account privileges, and registry persistence mechanisms.',
          whatToLearn: [
            'Windows security: Windows Security Event IDs (4624 logon, 4625 failed logon, 4688 process creation)',
            'Sysmon (System Monitor) configuration: detecting process injection, credential dumping (Mimikatz), and DLL hijacking',
            'Linux endpoint security: /var/log/auth.log, auditd framework, checking cron jobs, and inspecting active network connections (ss -tulnp)',
            'Common persistence mechanisms: scheduled tasks, Windows Registry Run keys, Linux systemd services, SSH authorized_keys backdoors',
            'Endpoint Detection and Response (EDR) fundamentals: agent telemetry, behavioral alerts, and endpoint isolation'
          ],
          whyItMatters: 'Attacker activity ultimately lands on endpoints. Analyzing endpoint telemetry allows analysts to spot malicious process spawning before lateral movement occurs.',
          productionUse: 'Triage of suspicious workstation alerts, investigating ransomware activity, and auditing server integrity.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to decode base64-obfuscated PowerShell commands found in Windows event logs.',
          handsOnTask: 'Configure Windows Sysmon on an endpoint, execute a simulated suspicious PowerShell process, and trace the process tree execution in the event log.',
          projectApplication: 'Provides endpoint telemetry for the SOC Incident Response project.',
          resources: [
            { title: 'Microsoft Sysmon Documentation', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'SIEM log analysis (Splunk / Elastic), vulnerability scanning, and OWASP web application security.',
      skills: [
        {
          id: 'cyb-siem-splunk-elk',
          title: 'Security Information and Event Management (SIEM: Splunk / Elastic)',
          category: 'SOC Operations',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['cyb-linux-windows-security'],
          description: 'Master central security monitoring in a SOC: log ingestion, writing detection queries in Splunk (SPL) or Elastic (KQL), correlation searches, alert triage, and dashboard creation.',
          whatToLearn: [
            'SIEM architecture: forwarders, indexers, search heads, data normalization (Splunk CIM / Elastic Common Schema)',
            'Splunk Processing Language (SPL): search, stats, eval, timechart, table, where, transaction, lookup tables',
            'Creating correlation rules: detecting brute-force login attempts (10+ failed logins followed by success within 5 minutes)',
            'SOC Alert Triage: assessing true positives vs false positives, scoping incident severity (Low, Medium, High, Critical)',
            'Building real-time SOC security monitoring dashboards for authentication anomalies and outbound firewall drops'
          ],
          whyItMatters: 'The SIEM is the primary tool used by cybersecurity analysts in a Security Operations Center to detect and investigate threats across the enterprise.',
          productionUse: 'Daily monitoring of corporate network logs, triaging alerts, and identifying security incidents.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to help formulate complex Splunk SPL query aggregations; verify alert logic against real log samples.',
          handsOnTask: 'Ingest enterprise authentication logs into Splunk/Elastic, write SPL correlation searches detecting credential stuffing attacks, and build a live SOC dashboard.',
          projectApplication: 'Core platform for the SOC Threat Detection & SIEM Investigation project.',
          resources: [
            { title: 'Splunk Search Processing Language (SPL) Tutorial', url: 'https://docs.splunk.com/Documentation/Splunk/latest/SearchTutorial/WelcometotheSearchTutorial', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cyb-owasp-web-security',
          title: 'Web Application Security & OWASP Top 10 Assessment',
          category: 'Application Security',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cyb-siem-splunk-elk'],
          description: 'Understand and assess web application vulnerabilities: OWASP Top 10 (SQL Injection, XSS, Broken Access Control, CSRF, SSRF), intercepting proxies (Burp Suite), and remediation advice.',
          whatToLearn: [
            'OWASP Top 10 vulnerabilities: Broken Access Control, Cryptographic Failures, Injection (SQLi), Insecure Design, Security Misconfiguration',
            'SQL Injection (SQLi): in-band, blind, time-based SQLi, and parameterized query remediation',
            'Cross-Site Scripting (XSS): Stored, Reflected, DOM-based XSS, and Content Security Policy (CSP) defense',
            'Server-Side Request Forgery (SSRF): abusing cloud metadata endpoints (169.254.169.254) and defensive input validation',
            'Burp Suite Community: intercepting HTTP requests, modifying parameters, Repeater tool, and Intruder fuzzing'
          ],
          whyItMatters: 'Web applications are exposed to the public internet 24/7. Understanding how attackers exploit OWASP flaws allows analysts to recommend effective developer fixes.',
          productionUse: 'Conducting web application security assessments, auditing new features, and triaging web application firewall (WAF) alerts.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use PortSwigger Web Security Academy for hands-on practice; use AI to explain remediation code patterns in different languages.',
          handsOnTask: 'Identify, exploit, and document remediation code for SQL injection, Stored XSS, and IDOR vulnerabilities in a local testbed (OWASP Juice Shop).',
          projectApplication: 'Produces the security assessment report for the Web Application Vulnerability Assessment project.',
          resources: [
            { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'training' },
            { title: 'OWASP Top 10 Official Document', url: 'https://owasp.org/www-project-top-ten/', type: 'standard' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Threat intelligence, MITRE ATT&CK framework mapping, vulnerability scanning, and incident response lifecycles.',
      skills: [
        {
          id: 'cyb-mitre-threat-intel',
          title: 'Threat Intelligence & MITRE ATT&CK Framework Mapping',
          category: 'Threat Intelligence',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['cyb-owasp-web-security'],
          description: 'Track and map adversarial tactics: MITRE ATT&CK Enterprise Matrix (Tactics, Techniques, Sub-techniques), Indicators of Compromise (IOCs), threat feeds, and the Cyber Kill Chain.',
          whatToLearn: [
            'MITRE ATT&CK Matrix: Reconnaissance, Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Lateral Movement, Exfiltration',
            'The Cyber Kill Chain (Lockheed Martin) vs Unified Kill Chain',
            'Threat intelligence feeds: OpenCTI, AlienVault OTX, VirusTotal, and MISP threat sharing',
            'Pyramid of Pain (David Bianco): Hash values, IP addresses, Domain names, Network artifacts, Tools, and TTPs (Tactics, Techniques, Procedures)',
            'YARA rules: writing signature rules to detect malware strings and binary patterns in files'
          ],
          whyItMatters: 'Mapping alerts to MITRE ATT&CK techniques allows security teams to understand the attacker’s current objective and anticipate their next move.',
          productionUse: 'Enriching security alerts with threat context, hunting for advanced persistent threats (APTs), and prioritizing defensive gaps.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to map raw incident log evidence to specific MITRE ATT&CK technique IDs (e.g., T1059.001 PowerShell).',
          handsOnTask: 'Map an actual ransomware attack campaign (e.g., LockBit) across the MITRE ATT&CK matrix and author custom YARA rules detecting its dropper binary.',
          projectApplication: 'Provides threat modeling and intelligence mapping for the SOC Incident Response project.',
          resources: [
            { title: 'MITRE ATT&CK Navigator', url: 'https://mitre-attack.github.io/attack-navigator/', type: 'tool' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cyb-vulnerability-management',
          title: 'Vulnerability Management & Scanning (Nessus / OpenVAS)',
          category: 'Vulnerability Management',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['cyb-mitre-threat-intel'],
          description: 'Identify and remediate security weaknesses: authenticated vs unauthenticated vulnerability scans (Nessus / OpenVAS), CVSS scoring, patch prioritization, and reporting.',
          whatToLearn: [
            'Vulnerability management lifecycle: Discover, Prioritize, Assess, Remediate, Verify, Report',
            'Vulnerability scanners: configuring Nessus / OpenVAS for credentialed network and host scans',
            'Common Vulnerabilities and Exposures (CVE) and Common Vulnerability Scoring System (CVSS v3.1 / v4.0 metrics)',
            'Prioritizing remediation: balancing CVSS base score with Exploit Prediction Scoring System (EPSS) and CISA Known Exploited Vulnerabilities (KEV) catalog',
            'Writing executive vulnerability assessment reports communicating risk and remediation timelines to IT operations teams'
          ],
          whyItMatters: 'Unpatched software vulnerabilities are an open door for automated ransomware exploits. Systematic vulnerability management closes vulnerabilities before attackers find them.',
          productionUse: 'Running monthly network vulnerability scans, compliance auditing, and managing patch remediation programs.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to parse XML/JSON vulnerability scan outputs and prioritize patch tickets based on asset criticality.',
          handsOnTask: 'Run an authenticated vulnerability scan on an enterprise test network with Nessus/OpenVAS, prioritize findings using CVSS and EPSS, and write an executive remediation report.',
          projectApplication: 'Directly informs the Web Application & Network Vulnerability Assessment project.',
          resources: [
            { title: 'CISA Known Exploited Vulnerabilities Catalog', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog', type: 'database' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Digital forensics, incident response (NIST SP 800-61), memory analysis (Volatility), and malware triage.',
      skills: [
        {
          id: 'cyb-digital-forensics',
          title: 'Digital Forensics & Memory Analysis (Autopsy & Volatility)',
          category: 'Digital Forensics',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['cyb-vulnerability-management'],
          description: 'Conduct post-incident forensic investigations: disk image acquisition (FTK Imager, dd), memory forensics with Volatility 3, file system analysis (Autopsy), and chain of custody.',
          whatToLearn: [
            'Order of volatility: CPU registers/cache, routing tables/RAM, temporary file systems, disk, remote logging',
            'Disk imaging: creating forensic bit-stream copies (E01, RAW/DD) and verifying integrity with SHA-256 hashes',
            'Memory forensics with Volatility 3: analyzing processes (pslist, pstree, malfind), dumped DLLs, network connections (netscan)',
            'Windows artifact forensics: Master File Table ($MFT), Shimcache, Amcache, Prefetch files, shellbags, USB history',
            'Maintaining legal chain of custody and documenting forensic findings for legal evidence'
          ],
          whyItMatters: 'Malware often resides purely in memory (fileless malware) to evade disk antivirus. Memory forensics exposes injected code and active network sockets.',
          productionUse: 'Investigating suspected insider threats, ransomware root causes, and data breach exfiltration.',
          aiRelevance: 'Low',
          aiWorkflow: 'Execute Volatility plugins directly in terminal; correlate memory timestamps manually against network logs.',
          handsOnTask: 'Acquire and analyze a memory dump from a compromised Windows machine using Volatility 3, extract injected shellcode, and identify the initial execution vector.',
          projectApplication: 'Core forensic technique for the Enterprise Incident Response & Forensic Investigation project.',
          resources: [
            { title: 'Volatility Foundation Documentation', url: 'https://volatilityfoundation.org/', type: 'documentation' },
            { title: 'Autopsy Digital Forensics', url: 'https://www.autopsy.com/', type: 'tool' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cyb-incident-response-lifecycle',
          title: 'Incident Response Lifecycle & Security Playbooks (NIST SP 800-61)',
          category: 'Incident Response',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cyb-digital-forensics'],
          description: 'Execute structured incident response: NIST SP 800-61 (Preparation, Detection & Analysis, Containment, Eradication & Recovery, Post-Incident Activity), and authoring SOC playbooks.',
          whatToLearn: [
            'NIST SP 800-61 Rev. 2 Incident Response lifecycle phases and PICERL framework',
            'Containment strategies: network isolation, disabling user accounts, blocking IP/domains at firewall, killing malicious processes',
            'Eradication & Recovery: removing malware artifacts, rebuilding compromised systems, changing all credentials, staged re-entry',
            'Authoring SOC incident response playbooks: Phishing Playbook, Ransomware Playbook, Lost/Stolen Device Playbook',
            'Post-incident review: writing comprehensive incident post-mortems and updating detection rules to prevent repeat incidents'
          ],
          whyItMatters: 'Without standardized incident response playbooks, teams panic during an active ransomware outbreak, making rash decisions that destroy forensic evidence.',
          productionUse: 'Guiding corporate security teams through high-stakes cybersecurity incidents.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft incident response playbook checklists; execute live drills and containment steps manually.',
          handsOnTask: 'Write a comprehensive Ransomware Incident Response Playbook and execute a simulated tabletop exercise containing a multi-host infection.',
          projectApplication: 'Provides the incident response lifecycle framework for the capstone project.',
          resources: [
            { title: 'NIST Computer Security Incident Handling Guide (SP 800-61)', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final', type: 'standard' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'SOC interview preparation, capture the flag (CTF) challenges, and cybersecurity analyst portfolio.',
      skills: [
        {
          id: 'cyb-interview-prep',
          title: 'Cybersecurity Analyst Interviews: Scenario Triage & Technical Drills',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['cyb-incident-response-lifecycle'],
          description: 'Master cybersecurity interview loops: live log analysis scenario triage, explaining the Cyber Kill Chain, networking fundamentals (DNS, TCP 3-way handshake), and behavioral STAR questions.',
          whatToLearn: [
            'Live SOC triage scenarios: "You receive an alert for 50 failed logins followed by a successful login from Russia at 3 AM. What do you do step by step?"',
            'Core technical questions: explaining DNS, ARP, DHCP, difference between IDS and IPS, asymmetric vs symmetric encryption',
            'Explaining how specific attacks work in detail: Pass-the-Hash, SQL Injection, Kerberoasting, Ransomware encryption lifecycles',
            'Behavioral interviews: communicating high-severity security risks clearly to non-technical business leaders'
          ],
          whyItMatters: 'SOC analyst interviews rigorously test your practical investigation instincts and your ability to explain complex technical attacks clearly.',
          productionUse: 'Securing Tier 1/2 SOC Analyst, Incident Responder, and Information Security Specialist roles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive interviewer to throw realistic SOC alert triage scenarios at you and critique your step-by-step investigation methodology.',
          handsOnTask: 'Complete 10 interactive SOC triage scenarios and participate in 3 Blue Team CTF challenges on TryHackMe / LetsDefend.',
          projectApplication: 'Direct preparation for cybersecurity analyst hiring loops.',
          resources: [
            { title: 'LetsDefend: Blue Team Training Platform', url: 'https://letsdefend.io/', type: 'training' },
            { title: 'TryHackMe: SOC Level 1 Pathway', url: 'https://tryhackme.com/path/outline/soclevel1', type: 'training' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'cyb-portfolio-resume',
          title: 'Cybersecurity Portfolio, CTF Write-ups & ATS Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['cyb-interview-prep'],
          description: 'Package your security investigations: publishing detailed incident investigation case studies, Blue Team CTF write-ups on GitHub, and crafting an ATS-optimized cybersecurity resume.',
          whatToLearn: [
            'Writing professional cybersecurity investigation case studies: Summary, Attack Timeline, Technical Evidence, IOC Table, Remediation',
            'Publishing TryHackMe / LetsDefend blue team challenge write-ups highlighting methodology over spoilers',
            'Crafting quantifiable cybersecurity resume bullets: highlighting MTTR triage speeds, vulnerability remediation counts, and compliance audits',
            'Highlighting industry certifications (CompTIA Security+, CySA+, BTL1, SC-200) effectively'
          ],
          whyItMatters: 'Showing detailed incident investigation reports and published CTF write-ups proves to hiring managers that you have real analytical capability.',
          productionUse: 'Attracting recruiter inbound interest and standing out in competitive hiring pools.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to format technical Indicators of Compromise (IOCs) into standardized Defanged format (e.g., hxxp://, 192[.]168[.]1[.]1).',
          handsOnTask: 'Publish a comprehensive investigation report on a simulated ransomware incident detailing the entire attack timeline from initial phishing to domain controller compromise.',
          projectApplication: 'Presents your complete cybersecurity body of work to hiring teams.',
          resources: [
            { title: 'SANS Reading Room Security Whitepapers', url: 'https://www.sans.org/white-papers/', type: 'showcase' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'cyb-proj-1',
      title: 'Web Application & Network Vulnerability Assessment',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Perform a comprehensive vulnerability assessment on a simulated corporate network and web application, identify OWASP Top 10 vulnerabilities, and author a professional remediation report.',
      technologies: ['Nessus / OpenVAS', 'Burp Suite', 'Nmap', 'OWASP Juice Shop', 'CVSS Calculator'],
      skillsPracticed: ['Network scanning', 'OWASP Top 10 exploitation', 'CVSS vulnerability scoring', 'Burp Suite request tampering', 'Remediation reporting'],
      requirements: [
        'Nmap network reconnaissance identifying open ports, service versions, and OS fingerprints across a target subnet',
        'Burp Suite manual web application security assessment identifying SQL Injection, Cross-Site Scripting (XSS), and Insecure Direct Object References (IDOR)',
        'Vulnerability scanning with Nessus or OpenVAS generating an inventory of outdated software and missing security patches',
        'Professional vulnerability assessment report detailing CVSS v3.1 scores, business risk impact, and developer remediation guidelines'
      ],
      deliverables: [
        'Executive vulnerability assessment report in professional PDF format',
        'Proof-of-concept (PoC) screenshots and sanitized HTTP request/response captures',
        'Remediation tracking spreadsheet with prioritized patch timelines'
      ],
      productionExpectations: [
        'Accurate CVSS scoring with detailed justification for vector metrics',
        'Clear, actionable remediation code snippets provided for each identified vulnerability'
      ],
      aiIntegration: 'Use AI to assist in drafting developer remediation code examples across multiple programming languages.'
    },
    {
      id: 'cyb-proj-2',
      title: 'SOC Threat Detection & SIEM Investigation Lab (Splunk)',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Deploy a functional SOC SIEM lab using Splunk, ingest real attack telemetry (Sysmon, firewall, web logs), build automated correlation alerts, and investigate multi-stage cyber attacks.',
      technologies: ['Splunk Enterprise', 'Windows Sysmon', 'Linux auditd', 'Suricata IDS', 'Atomic Red Team'],
      skillsPracticed: ['SIEM deployment', 'SPL query authoring', 'Attack simulation', 'Alert correlation rules', 'Incident triage'],
      requirements: [
        'Deploy a local Splunk SIEM instance ingesting Windows Event Logs, Sysmon, and Linux authentication logs',
        'Simulate adversary techniques using Atomic Red Team (credential dumping, persistence via scheduled tasks, defense evasion)',
        'Write custom Splunk SPL correlation searches detecting suspicious PowerShell execution, lateral movement (PsExec), and brute-force logins',
        'Build an interactive SOC analyst dashboard visualizing real-time threat maps, top targeted accounts, and high-severity alert feeds'
      ],
      deliverables: [
        'GitHub repository containing Splunk saved searches, alert definitions, and dashboard XML manifests',
        'Comprehensive SOC Investigation Report detailing a simulated multi-stage intrusion from initial access to data exfiltration',
        'Live demonstration recording showing alert triggering and step-by-step analyst investigation'
      ],
      productionExpectations: [
        'Low false-positive rate through tuned correlation search thresholds',
        'Full alignment with MITRE ATT&CK Enterprise Matrix technique IDs'
      ],
      aiIntegration: 'Use AI to generate complex Splunk SPL regex extraction queries for custom firewall log formats.'
    },
    {
      id: 'cyb-proj-3',
      title: 'Enterprise Incident Response & Memory Forensics Investigation',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Conduct an end-to-end digital forensic investigation of an advanced persistent threat (APT) intrusion: analyze memory dumps with Volatility 3, analyze disk artifacts with Autopsy, and author a legal-grade incident response report.',
      technologies: ['Volatility 3', 'Autopsy', 'Wireshark', 'FTK Imager', 'YARA', 'CyberChef'],
      skillsPracticed: ['Memory forensics', 'Disk artifact analysis', 'Malware triage', 'Timeline reconstruction', 'Incident response reporting'],
      requirements: [
        'Acquire and analyze a memory dump from a compromised Windows Domain Controller using Volatility 3 plugins (pslist, malfind, netscan, handles)',
        'Analyze disk artifacts using Autopsy to recover deleted attacker staging scripts, Prefetch execution records, and Shimcache entries',
        'Decode obfuscated malware payloads and command-and-control communication strings using CyberChef and Wireshark',
        'Construct an end-to-end incident timeline correlating disk, memory, and network forensic evidence from initial compromise to containment',
        'Author a formal Incident Response and Forensic Investigation Report documenting root cause, compromised assets, and complete Indicator of Compromise (IOC) tables'
      ],
      deliverables: [
        'Professional legal-grade Incident Response Report detailing the full intrusion lifecycle',
        'Complete Indicator of Compromise (IOC) list in standardized STIX/JSON format and custom YARA rules',
        'Forensic analysis notes with command outputs from Volatility 3 and Autopsy'
      ],
      productionExpectations: [
        'Strict adherence to forensic chain of custody standards and evidence integrity hashing (SHA-256)',
        'Defensible root cause conclusion supported by multiple independent forensic artifacts'
      ],
      aiIntegration: 'Use AI to assist in decoding multi-layered base64/hex obfuscated scripts extracted from memory dumps.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Network packet analysis with Wireshark and tcpdump (identifying scans, C2 beacons, exfiltration)',
      'Endpoint security inspection: Windows Event IDs, Sysmon, and Linux auditd logs',
      'SIEM operations: log ingestion, correlation searches, and dashboard design in Splunk (SPL) or Elastic (KQL)',
      'Web application security assessment: OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF) and Burp Suite',
      'Threat intelligence mapping using the MITRE ATT&CK Enterprise Matrix and Cyber Kill Chain',
      'Vulnerability scanning and patch prioritization with Nessus, OpenVAS, CVSS, and EPSS',
      'Digital forensics: memory analysis with Volatility 3 and disk artifact inspection with Autopsy',
      'Incident Response lifecycle execution adhering to NIST SP 800-61 guidelines',
      'Authoring SOC incident response playbooks for Phishing, Ransomware, and Credential Compromise',
      'Malware triage, YARA rule authoring, and deobfuscation with CyberChef'
    ],
    projects: [
      'Web application and network vulnerability assessment with Burp Suite and Nessus',
      'SOC threat detection and SIEM investigation lab in Splunk with Atomic Red Team simulation',
      'Enterprise incident response and memory forensics investigation with Volatility 3 and Autopsy',
      'All investigations documented with professional reports and public GitHub write-ups'
    ],
    csFundamentals: [
      'Operating systems internals: processes, threads, virtual memory, DLL loading, Windows registry',
      'Networking protocols: TCP/IP flow control, DNS resolution hierarchy, ARP, ICMP, TLS handshakes',
      'Cryptography: symmetric/asymmetric ciphers, hashing, digital certificates, and common attack vectors',
      'Information security frameworks: NIST Cybersecurity Framework (CSF), ISO 27001, CIS Controls'
    ],
    tools: [
      'Network and packet analysis: Wireshark, tcpdump, Nmap',
      'SIEM and log tools: Splunk Enterprise, Elastic Stack (ELK), Graylog',
      'Security assessment tools: Burp Suite Community, Nessus, OpenVAS, OWASP ZAP',
      'Forensics tools: Volatility 3, Autopsy, FTK Imager, CyberChef, YARA'
    ],
    deployment: [
      'Deploying local security testing labs and vulnerable testbeds (Juice Shop, Metasploitable)',
      'Configuring SIEM log forwarders (Splunk Universal Forwarder, Elastic Filebeat) on endpoints',
      'Managing automated YARA rule scanning pipelines across file storage systems',
      'Hosting public CTF write-ups and investigation reports on GitHub or personal technical blogs'
    ],
    portfolio: [
      'Cybersecurity portfolio showcasing detailed incident investigation case studies',
      'Published Blue Team CTF write-ups (TryHackMe, LetsDefend) demonstrating systematic methodology',
      'Professional vulnerability assessment reports with CVSS scoring and remediation guidelines',
      'Clean documentation with complete Indicator of Compromise (IOC) tables and MITRE mappings'
    ],
    github: [
      'Public GitHub repositories containing custom detection rules (YARA, Sigma, Splunk SPL)',
      'Comprehensive READMEs with attack timelines, network diagrams, and sample detection logs',
      'Proper defanging of all malicious IP addresses and URLs in documentation (e.g., hxxp://, 192[.]168[.]1[.]1)',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant Cybersecurity Analyst resume in PDF format',
      'Bullet points highlighting operational impact: MTTR incident triage, vulnerabilities remediated, SIEM detections built',
      'Prominent placement of security certifications (Security+, CySA+, BTL1, GCIH)',
      'Direct links to GitHub repositories, CTF write-ups, and LinkedIn profile'
    ],
    interviewReadiness: [
      'Mastery of step-by-step SOC alert triage scenarios (Phishing, Brute Force, C2 Beaconing)',
      'Deep understanding of core networking protocols (DNS, TCP 3-way handshake, ARP, SSL/TLS)',
      'Ability to explain the mechanics of common attacks (SQLi, Pass-the-Hash, Ransomware) and their defenses',
      'Structured STAR behavioral stories communicating incident response leadership and calm triage under pressure'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['cybersecurity'] = cybersecurityRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cybersecurityRoadmap;
}
