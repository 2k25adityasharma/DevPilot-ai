/**
 * DevPilot-AI — Career Roles Catalog Dataset
 * 20 authentic industry career roles categorized across:
 * - Development
 * - Data & AI
 * - DevOps & Cloud
 * - Security & QA
 */

const careerCategories = [
  {
    id: 'development',
    name: 'Development',
    icon: 'code',
    description: 'Build user-facing web, mobile, desktop, game, and decentralized applications.'
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    icon: 'psychology',
    description: 'Extract insights, train predictive models, architect pipelines, and build generative AI systems.'
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & Cloud',
    icon: 'cloud',
    description: 'Scale cloud infrastructure, automate deployment pipelines, and ensure high availability.'
  },
  {
    id: 'security-qa',
    name: 'Security & QA',
    icon: 'verified_user',
    description: 'Secure networks, audit cloud assets, automate software testing, and ensure enterprise reliability.'
  }
];

const careerRoles = [
  // ==========================================
  // CATEGORY: DEVELOPMENT (7 Roles)
  // ==========================================
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'development',
    roadmapId: 'frontend',
    tagline: 'Build modern, interactive, accessible web user interfaces from fundamentals to production.',
    description: 'Master HTML5, CSS3, modern JavaScript, React, TypeScript, state management, web performance, testing, and modern deployment pipelines.',
    icon: 'desktop_windows',
    difficulty: 'Intermediate',
    estimatedWeeks: 24,
    featuredTech: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vite', 'Git'],
    isPriority: true
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'development',
    roadmapId: 'backend',
    tagline: 'Design resilient server architectures, scalable REST & GraphQL APIs, and robust database layers.',
    description: 'Master server-side programming, HTTP protocols, Node.js/Python, databases, caching, authentication, Docker containerization, and cloud deployment.',
    icon: 'dns',
    difficulty: 'Intermediate',
    estimatedWeeks: 26,
    featuredTech: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'REST APIs', 'Git'],
    isPriority: true
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'development',
    roadmapId: 'fullstack',
    tagline: 'Connect client interfaces with server systems, databases, authentication, and cloud infrastructure.',
    description: 'Master modern frontend (React/TypeScript), scalable backend (Node.js/Express/PostgreSQL), CI/CD, system design, and production deployment.',
    icon: 'layers',
    difficulty: 'Advanced',
    estimatedWeeks: 32,
    featuredTech: ['React', 'TypeScript', 'Node.js', 'Express', 'Next.js', 'PostgreSQL', 'Docker', 'REST APIs', 'System Design'],
    isPriority: true
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    category: 'development',
    roadmapId: 'mobile',
    tagline: 'Engineer high-performance native and cross-platform applications for iOS and Android.',
    description: 'Master React Native, Flutter, mobile UI patterns, local SQLite persistence, push notifications, offline syncing, and app store deployment.',
    icon: 'phone_iphone',
    difficulty: 'Intermediate',
    estimatedWeeks: 24,
    featuredTech: ['React Native', 'Flutter', 'Dart', 'TypeScript', 'iOS', 'Android', 'SQLite', 'Firebase'],
    isPriority: false
  },
  {
    id: 'game-developer',
    title: 'Game Developer',
    category: 'development',
    roadmapId: 'game',
    tagline: 'Create 2D/3D interactive games, physics engines, and graphics rendering workflows.',
    description: 'Master C++, C#, Unity, Unreal Engine, 3D math, physics simulation, audio design, asset pipelines, and performance profiling.',
    icon: 'sports_esports',
    difficulty: 'Advanced',
    estimatedWeeks: 30,
    featuredTech: ['C#', 'C++', 'Unity', 'Unreal Engine', 'OpenGL', 'Shaders', 'Physics', 'Git'],
    isPriority: false
  },
  {
    id: 'web3-developer',
    title: 'Web3 Developer',
    category: 'development',
    roadmapId: 'web3',
    tagline: 'Develop smart contracts, decentralized applications (dApps), and blockchain protocols.',
    description: 'Master Solidity, EVM architecture, ethers.js/viem, IPFS, DeFi protocols, smart contract auditing, and zero-knowledge primitives.',
    icon: 'token',
    difficulty: 'Advanced',
    estimatedWeeks: 28,
    featuredTech: ['Solidity', 'Ethereum', 'Ethers.js', 'Hardhat', 'IPFS', 'TypeScript', 'Web3.js'],
    isPriority: false
  },
  {
    id: 'embedded-systems-engineer',
    title: 'Embedded Systems Engineer',
    category: 'development',
    roadmapId: 'embedded',
    tagline: 'Program low-level microcontrollers, real-time operating systems (RTOS), and IoT devices.',
    description: 'Master C, C++, ARM Cortex architectures, FreeRTOS, hardware communication protocols (SPI, I2C, UART), and firmware debugging.',
    icon: 'memory',
    difficulty: 'Advanced',
    estimatedWeeks: 30,
    featuredTech: ['C', 'C++', 'ARM', 'FreeRTOS', 'I2C', 'SPI', 'UART', 'Linux', 'PCB'],
    isPriority: false
  },

  // ==========================================
  // CATEGORY: DATA & AI (7 Roles)
  // ==========================================
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'data-ai',
    roadmapId: 'data-analyst',
    tagline: 'Transform raw data into business intelligence, KPI dashboards, and actionable insights.',
    description: 'Master advanced SQL, Python data manipulation (Pandas), Tableau/Power BI, statistical analysis, and executive data storytelling.',
    icon: 'query_stats',
    difficulty: 'Beginner',
    estimatedWeeks: 18,
    featuredTech: ['SQL', 'Python', 'Pandas', 'Excel', 'Tableau', 'Power BI', 'Statistics'],
    isPriority: false
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    category: 'data-ai',
    roadmapId: 'data-engineer',
    tagline: 'Architect distributed pipelines, data warehouses, ETL workflows, and lakehouse platforms.',
    description: 'Master Python, SQL, Apache Spark, Kafka, Airflow, dbt, Snowflake, BigQuery, and scalable cloud data streaming.',
    icon: 'dataset',
    difficulty: 'Advanced',
    estimatedWeeks: 28,
    featuredTech: ['Python', 'SQL', 'Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'PostgreSQL'],
    isPriority: false
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'data-ai',
    roadmapId: 'data-scientist',
    tagline: 'Derive predictive models, run hypothesis testing, and apply machine learning to solve problems.',
    description: 'Master probability & statistics, Python scientific stack, feature engineering, Scikit-learn, regression/classification, and model interpretation.',
    icon: 'insights',
    difficulty: 'Intermediate',
    estimatedWeeks: 24,
    featuredTech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Statistics', 'Matplotlib', 'SQL'],
    isPriority: false
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'data-ai',
    roadmapId: 'ai-engineer',
    tagline: 'Engineer end-to-end deep learning, computer vision, NLP, and multimodal AI solutions.',
    description: 'Master Python, PyTorch, neural networks, transformers, model fine-tuning, embeddings, vector databases, and inference optimization.',
    icon: 'smart_toy',
    difficulty: 'Advanced',
    estimatedWeeks: 30,
    featuredTech: ['Python', 'PyTorch', 'Transformers', 'Hugging Face', 'Vector DBs', 'FastAPI', 'NumPy', 'Docker'],
    isPriority: true
  },
  {
    id: 'ai-research-engineer',
    title: 'AI Research Engineer',
    category: 'data-ai',
    roadmapId: 'ai-research',
    tagline: 'Bridge scientific AI publications and cutting-edge neural architecture implementations.',
    description: 'Master advanced tensor calculus, custom attention mechanisms, distributed GPU training (Megatron/Deepspeed), and scientific experimentation.',
    icon: 'science',
    difficulty: 'Advanced',
    estimatedWeeks: 36,
    featuredTech: ['Python', 'PyTorch', 'CUDA', 'JAX', 'Distributed Training', 'Transformers', 'Math'],
    isPriority: false
  },
  {
    id: 'llm-genai-engineer',
    title: 'LLM & GenAI Engineer',
    category: 'data-ai',
    roadmapId: 'llm-genai',
    tagline: 'Build production GenAI applications with LLMs, RAG, prompt engineering, and autonomous agents.',
    description: 'Master Prompt Engineering, LangChain, LlamaIndex, Retrieval-Augmented Generation (RAG), vector databases, tool calling, and LLM observability.',
    icon: 'auto_awesome',
    difficulty: 'Intermediate',
    estimatedWeeks: 22,
    featuredTech: ['Python', 'OpenAI API', 'LangChain', 'LlamaIndex', 'Vector Databases', 'RAG', 'Prompt Engineering', 'FastAPI'],
    isPriority: true
  },
  {
    id: 'mlops-engineer',
    title: 'MLOps Engineer',
    category: 'data-ai',
    roadmapId: 'mlops',
    tagline: 'Deploy, automate, monitor, and maintain machine learning models in high-throughput production.',
    description: 'Master MLflow, Kubeflow, model registries, feature stores, drift detection, Docker, Kubernetes, and automated retraining pipelines.',
    icon: 'hub',
    difficulty: 'Advanced',
    estimatedWeeks: 28,
    featuredTech: ['Python', 'Docker', 'Kubernetes', 'MLflow', 'Kubeflow', 'Airflow', 'CI/CD', 'Prometheus'],
    isPriority: false
  },

  // ==========================================
  // CATEGORY: DEVOPS & CLOUD (3 Roles)
  // ==========================================
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'devops-cloud',
    roadmapId: 'devops',
    tagline: 'Automate CI/CD pipelines, containerize workloads, and maintain infrastructure as code.',
    description: 'Master Linux administration, Git workflows, Docker, Kubernetes, GitHub Actions, Terraform, Prometheus/Grafana monitoring, and cloud fundamentals.',
    icon: 'all_inclusive',
    difficulty: 'Intermediate',
    estimatedWeeks: 26,
    featuredTech: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Prometheus', 'Bash'],
    isPriority: true
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'devops-cloud',
    roadmapId: 'cloud',
    tagline: 'Architect secure, fault-tolerant, scalable cloud solutions across compute, storage, and networking.',
    description: 'Master AWS/Azure/GCP core services, IAM policies, VPC networking, serverless compute, microservices architecture, and cloud cost management.',
    icon: 'cloud_done',
    difficulty: 'Intermediate',
    estimatedWeeks: 26,
    featuredTech: ['AWS', 'GCP', 'Azure', 'IAM', 'VPC', 'Terraform', 'Docker', 'Kubernetes', 'Serverless'],
    isPriority: true
  },
  {
    id: 'sre-engineer',
    title: 'Site Reliability Engineer (SRE)',
    category: 'devops-cloud',
    roadmapId: 'sre',
    tagline: 'Apply software engineering practices to infrastructure operations, reliability, and incident response.',
    description: 'Master SLI/SLO/SLA definitions, error budgets, chaos engineering, incident management, automated self-healing, and distributed tracing.',
    icon: 'monitoring',
    difficulty: 'Advanced',
    estimatedWeeks: 28,
    featuredTech: ['Linux', 'Python', 'Go', 'Kubernetes', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Chaos Mesh'],
    isPriority: false
  },

  // ==========================================
  // CATEGORY: SECURITY & QA (3 Roles)
  // ==========================================
  {
    id: 'cloud-security-engineer',
    title: 'Cloud Security Engineer',
    category: 'security-qa',
    roadmapId: 'cloud-security',
    tagline: 'Safeguard cloud infrastructure, automate compliance audits, and enforce zero-trust policies.',
    description: 'Master Cloud Security Posture Management (CSPM), identity governance (IAM), secrets management, container security, and network firewalls.',
    icon: 'lock',
    difficulty: 'Advanced',
    estimatedWeeks: 26,
    featuredTech: ['AWS Security', 'IAM', 'Vault', 'Trivy', 'Falco', 'Terraform', 'Zero Trust', 'Linux'],
    isPriority: false
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'security-qa',
    roadmapId: 'cybersecurity',
    tagline: 'Defend organizational assets, analyze threat vectors, conduct vulnerability scans, and respond to incidents.',
    description: 'Master network protocols (TCP/IP, DNS), SIEM platforms (Splunk), threat hunting, vulnerability assessment, cryptography, and SOC response.',
    icon: 'shield',
    difficulty: 'Intermediate',
    estimatedWeeks: 24,
    featuredTech: ['Wireshark', 'SIEM', 'Linux', 'Network Security', 'Cryptography', 'Nmap', 'Python'],
    isPriority: false
  },
  {
    id: 'qa-sdet-engineer',
    title: 'QA / SDET Engineer',
    category: 'security-qa',
    roadmapId: 'qa-sdet',
    tagline: 'Build automated end-to-end testing frameworks, performance benchmarks, and quality suites.',
    description: 'Master Playwright, Cypress, Jest, API testing with Postman/Newman, performance testing with k6, CI test automation, and AI output validation.',
    icon: 'fact_check',
    difficulty: 'Intermediate',
    estimatedWeeks: 22,
    featuredTech: ['Playwright', 'Cypress', 'JavaScript', 'Python', 'Jest', 'Postman', 'k6', 'CI/CD'],
    isPriority: false
  }
];

// Browser & CommonJS Node.js export pattern
if (typeof window !== 'undefined') {
  window.careerCategories = careerCategories;
  window.careerRoles = careerRoles;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { careerCategories, careerRoles };
}
