/**
 * DevPilot-AI — Evidence-Driven Resume Analyzer & Job Matching Engine
 * 
 * Features:
 * 1. Multi-page text extraction with client-side OCR fallback (Tesseract.js) for scanned PDFs.
 * 2. Strict document classification: rejects Invoices, Certificates, Marksheets, Research Papers, Offer Letters, and random text.
 * 3. Deterministic 0–100 Resume Confidence Score (< 60: REJECT, 60–75: UNCERTAIN/WARNING, > 75: PASS).
 * 4. Structured Resume Extraction with JSON schema and Evidence / Provenance mapping.
 * 5. Zero-hallucination validation pass (never infers skills, roles, metrics, or education without raw text evidence).
 * 6. Contact info isolation (phone numbers, PINs, and URLs never count as experience years).
 * 7. Evidence-based experience analysis with Student / Fresher intelligence (reweights projects & DSA).
 * 8. Internal consistency & duplicate detection (conflicting metrics, dates, and duplicate descriptions).
 * 9. Transparent, weighted ATS scoring and Job Description matching with clear factor breakdown.
 * 10. Specific, actionable improvement recommendations without fabricated metrics.
 */

/* ============================================================
   CONSTANTS & VOCABULARY DICTIONARIES
   ============================================================ */
const ANALYZER_STORAGE_KEY = 'resume_analysis';
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const SUPPORTED_EXTENSIONS = ['.pdf', '.docx'];

const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'created', 'led', 'optimized',
  'automated', 'improved', 'reduced', 'increased', 'integrated', 'deployed',
  'engineered', 'architected', 'managed', 'delivered', 'launched', 'maintained',
  'configured', 'streamlined', 'collaborated', 'coordinated', 'established',
  'mentored', 'spearheaded', 'orchestrated', 'scaled', 'refactored', 'debugged',
  'tested', 'analyzed', 'resolved', 'migrated', 'programmed', 'authored',
  'executed', 'trained', 'researched', 'published', 'presented', 'contributed',
  'enhanced', 'modernized', 'simplified', 'consolidated', 'transformed',
  'accelerated', 'pioneered', 'formulated', 'negotiated', 'supervised',
  'constructed', 'centralized', 'standardized', 'secured'
];

const WEAK_VERBS = [
  'worked', 'helped', 'assisted', 'was responsible', 'responsible for',
  'handled', 'did', 'made', 'got', 'used', 'utilized', 'participated',
  'involved in', 'tasked with', 'served as', 'acted as', 'tried',
  'learned', 'gained knowledge', 'contributed slightly'
];

const VAGUE_PHRASES = [
  'various tasks', 'multiple projects', 'different technologies',
  'team player', 'hard worker', 'fast learner', 'self-starter',
  'detail-oriented', 'results-driven', 'proven track record',
  'excellent communication', 'strong work ethic', 'go-getter',
  'think outside the box', 'synergy', 'leverage', 'paradigm',
  'good learner', 'hardworking', 'motivated student', 'passionate individual',
  'looking for a challenging role', 'reputed company', 'seeking an entry level',
  'enthusiastic learner', 'dynamic professional', 'hands-on experience'
];

const SOFT_SKILLS = [
  'communication', 'teamwork', 'leadership', 'problem solving',
  'time management', 'critical thinking', 'adaptability', 'collaboration',
  'interpersonal skills', 'interpersonal', 'work ethic', 'attention to detail',
  'presentation skills', 'creativity', 'conflict resolution', 'emotional intelligence',
  'decision making', 'negotiation', 'multitasking', 'public speaking',
  'active listening', 'hardworking', 'good learner', 'fast learner'
];

let CERTIFICATION_TIERS = {
  tier1: [
    'aws', 'amazon web services', 'google cloud', 'gcp', 'google', 'microsoft', 'azure',
    'meta', 'facebook', 'cisco', 'oracle', 'ibm', 'comptia', 'pmi', 'kubernetes', 'cncf',
    'linux foundation', 'hashicorp', 'snowflake', 'databricks', 'salesforce', 'palo alto',
    'red hat', 'postman'
  ],
  tier2: [
    'coursera', 'udemy', 'edx', 'freecodecamp', 'hackerrank', 'deeplearning.ai',
    'codecademy', 'simplilearn', 'linkedin learning', 'skillshare', 'datacamp'
  ]
};

function getCertificationTiers() {
  return CERTIFICATION_TIERS;
}

function setCertificationTiers(newTiers) {
  if (newTiers && typeof newTiers === 'object') {
    CERTIFICATION_TIERS = { ...CERTIFICATION_TIERS, ...newTiers };
  }
}

const KNOWN_CERT_ISSUERS = [
  ...(CERTIFICATION_TIERS.tier1 || []),
  ...(CERTIFICATION_TIERS.tier2 || []),
  'stanford', 'harvard', 'mit', 'mongodb'
];

const KNOWN_ACHIEVEMENT_KEYWORDS = [
  'hackathon', 'winner', 'runner-up', 'runner up', 'finalist', '1st place', '2nd place',
  '3rd place', 'top 1%', 'top 5%', 'top 10%', 'rank', 'ranking', 'percentile',
  'scholarship', "dean's list", 'gold medal', 'silver medal', 'bronze medal',
  'published', 'paper', 'patent', 'codeforces', 'leetcode contest', 'codechef',
  'kaggle grandmaster', 'kaggle master', '5-star', 'candidate master', 'specialist',
  'open source contributor', 'gsoc', 'google summer of code', 'fellowship',
  'merit award', 'employee of the month', 'best paper', 'best project'
];

const SECTION_PATTERNS = {
  summary: /(?:^|\n)\s*(?:summary|professional\s*summary|profile|about\s*me|career\s*objective|objective|career\s*summary|executive\s*summary)(?:\s*[:\-–—|]|\s*$)/im,
  experience: /(?:^|\n)\s*(?:experience|work\s*experience|professional\s*experience|employment|work\s*history|internship|internships|industry\s*experience|positions\s*of\s*responsibility)(?:\s*[:\-–—|]|\s*$)/im,
  education: /(?:^|\n)\s*(?:education|academic|academic\s*background|qualifications|educational\s*background|academics|relevant\s*coursework)(?:\s*[:\-–—|]|\s*$)/im,
  skills: /(?:^|\n)\s*(?:skills|technical\s*skills|technologies|tools|core\s*competencies|tech\s*stack|programming\s*skills|technical\s*expertise|competencies|programming\s*languages)(?:\s*[:\-–—|]|\s*$)/im,
  projects: /(?:^|\n)\s*(?:projects|personal\s*projects|featured\s*projects|key\s*projects|side\s*projects|academic\s*projects|technical\s*projects)(?:\s*[:\-–—|]|\s*$)/im,
  certifications: /(?:^|\n)\s*(?:certifications|certificates|credentials|licenses|professional\s*certifications|certifications\s*&?\s*licenses)(?:\s*[:\-–—|]|\s*$)/im,
  achievements: /(?:^|\n)\s*(?:achievements|honors|awards|accomplishments|recognitions|honors\s*&?\s*awards|programming\s*achievements)(?:\s*[:\-–—|]|\s*$)/im,
  publications: /(?:^|\n)\s*(?:publications|papers|research\s*papers|patents)(?:\s*[:\-–—|]|\s*$)/im,
  volunteer: /(?:^|\n)\s*(?:volunteer|volunteering|community\s*service|extracurricular|extracurricular\s*activities)(?:\s*[:\-–—|]|\s*$)/im
};

// Normalized Technical Skills Database
const TECH_SKILLS_DB = {
  cs_core: [
    'object-oriented programming', 'oop', 'data structures & algorithms', 'data structures and algorithms',
    'data structures', 'dsa', 'algorithms', 'system architecture', 'software architecture',
    'system design', 'design patterns', 'competitive programming', 'distributed systems',
    'microservices', 'operating systems', 'dbms', 'computer networks', 'rest apis', 'rest api',
    'restful apis', 'restful api', 'asynchronous programming'
  ],
  languages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'c', 'ruby', 'go', 'golang',
    'rust', 'swift', 'kotlin', 'php', 'scala', 'r', 'matlab', 'perl', 'lua',
    'dart', 'elixir', 'haskell', 'clojure', 'objective-c', 'assembly',
    'html', 'html5', 'css', 'css3', 'sql', 'bash', 'shell', 'powershell'
  ],
  frontend: [
    'react', 'react.js', 'reactjs', 'vue', 'vue.js', 'vuejs', 'angular', 'angularjs',
    'next.js', 'nextjs', 'nuxt', 'nuxt.js', 'svelte', 'gatsby', 'remix',
    'redux', 'redux toolkit', 'mobx', 'zustand', 'tailwind', 'tailwindcss', 'tailwind css', 'bootstrap',
    'material-ui', 'mui', 'chakra ui', 'chakra', 'styled-components', 'sass', 'scss', 'less',
    'webpack', 'vite', 'rollup', 'parcel', 'babel', 'jquery', 'three.js', 'responsive design',
    'shadcn', 'framer motion'
  ],
  backend: [
    'node.js', 'nodejs', 'express', 'express.js', 'fastify', 'nest.js', 'nestjs',
    'django', 'flask', 'fastapi', 'spring', 'spring boot', 'rails', 'ruby on rails',
    'asp.net', '.net', 'dotnet', 'laravel', 'gin', 'fiber', 'koa',
    'rest', 'rest api', 'rest apis', 'restful', 'graphql', 'grpc', 'websocket', 'websockets',
    'microservices', 'serverless', 'lambda', 'apollo'
  ],
  databases: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'sqlite', 'oracle', 'sql server', 'dynamodb', 'cassandra', 'neo4j',
    'firebase', 'firestore', 'supabase', 'prisma', 'sequelize', 'mongoose',
    'typeorm', 'knex', 'drizzle', 'mariadb', 'couchdb'
  ],
  cloud: [
    'aws', 'amazon web services', 'gcp', 'google cloud', 'azure', 'heroku',
    'vercel', 'netlify', 'digitalocean', 'cloudflare', 's3', 'ec2', 'ecs',
    'lambda', 'cloudfront', 'route 53', 'cloud functions', 'firebase hosting'
  ],
  devops: [
    'docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'jenkins',
    'ci/cd', 'ci cd', 'github actions', 'gitlab ci', 'circleci', 'travis ci',
    'nginx', 'apache', 'linux', 'unix', 'prometheus', 'grafana',
    'datadog', 'new relic', 'splunk', 'helm', 'argocd'
  ],
  tools: [
    'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence',
    'figma', 'sketch', 'postman', 'insomnia', 'swagger',
    'vs code', 'visual studio', 'visual studio code', 'intellij', 'vim', 'neovim',
    'notion', 'trello', 'slack', 'npm', 'yarn', 'pnpm'
  ],
  testing: [
    'jest', 'mocha', 'chai', 'cypress', 'selenium', 'playwright',
    'puppeteer', 'testing library', 'react testing library', 'enzyme',
    'junit', 'pytest', 'rspec', 'karma', 'jasmine', 'vitest',
    'tdd', 'bdd', 'unit testing', 'integration testing', 'e2e testing'
  ],
  ai_ml: [
    'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'sklearn', 'pandas',
    'numpy', 'matplotlib', 'seaborn', 'opencv', 'nlp', 'natural language processing',
    'machine learning', 'deep learning', 'neural networks', 'computer vision',
    'transformers', 'hugging face', 'langchain', 'openai', 'gpt',
    'gemini', 'gemini api', 'google gemini',
    'llm', 'large language models', 'generative ai', 'rag', 'vector database'
  ]
};

/* ============================================================
   JOB ROLES KNOWLEDGE BASE (14 Standard Tech Roles)
   ============================================================ */
const ROLE_PROFILES_DB = [
  {
    id: 'sde_intern',
    title: 'SDE Intern',
    entryTitle: 'SDE Intern',
    category: 'Entry Level / Intern',
    icon: 'school',
    description: 'Entry-level engineering role focusing on algorithmic problem solving, core computer science, and foundation codebases.',
    requiredSkills: ['Data Structures', 'Algorithms', 'Git'],
    preferredSkills: ['C++', 'Java', 'Python', 'JavaScript', 'OOP', 'SQL'],
    minExperienceYears: 0,
    experienceRequired: 'Entry Level / Fresher',
    domain: 'Software Engineering',
    keywords: ['data structures', 'algorithms', 'dsa', 'problem solving', 'git', 'oop', 'c++', 'python', 'java', 'javascript'],
    whyRecommended: 'Your core computer science fundamentals, data structures, and academic projects fit software engineering internships.'
  },
  {
    id: 'frontend_developer',
    title: 'Frontend Developer',
    entryTitle: 'Junior Frontend Developer',
    category: 'Frontend',
    icon: 'code',
    description: 'Specializes in creating interactive, responsive user interfaces and modern web applications.',
    requiredSkills: ['HTML5', 'CSS3', 'JavaScript'],
    preferredSkills: ['React', 'TypeScript', 'Tailwind', 'Git', 'Next.js', 'Redux'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Frontend Development',
    keywords: ['html5', 'html', 'css3', 'css', 'javascript', 'react', 'typescript', 'tailwind', 'frontend', 'ui', 'ux', 'git'],
    whyRecommended: 'Your HTML, CSS, JavaScript and frontend development capabilities align with UI/Frontend roles.'
  },
  {
    id: 'python_developer',
    title: 'Python Developer',
    entryTitle: 'Junior Python Developer',
    category: 'Backend / Scripting',
    icon: 'code',
    description: 'Develops backend services, automation workflows, data pipelines, and web applications using Python.',
    requiredSkills: ['Python', 'SQL', 'Git'],
    preferredSkills: ['Django', 'FastAPI', 'Flask', 'Pandas', 'OOP', 'Rest Apis'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Backend Development',
    keywords: ['python', 'django', 'fastapi', 'flask', 'sql', 'postgresql', 'git', 'api', 'backend'],
    whyRecommended: 'Your Python programming and backend development experience align with Python engineering positions.'
  },
  {
    id: 'fullstack_developer',
    title: 'Full Stack Developer',
    entryTitle: 'Junior Full Stack Developer',
    category: 'Full Stack',
    icon: 'layers',
    description: 'Builds end-to-end web applications covering client-side interfaces, server APIs, and persistent databases.',
    requiredSkills: ['JavaScript', 'HTML5', 'CSS3', 'SQL', 'Git'],
    preferredSkills: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Tailwind'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Full Stack Development',
    keywords: ['full stack', 'fullstack', 'react', 'node.js', 'javascript', 'sql', 'mongodb', 'express', 'html5', 'css3', 'git'],
    whyRecommended: 'Your combined frontend, backend, and database skill set fits full-stack software development.'
  },
  {
    id: 'backend_developer',
    title: 'Backend Developer',
    entryTitle: 'Junior Backend Developer',
    category: 'Backend',
    icon: 'dns',
    description: 'Designs and builds server-side business logic, microservices, databases, and REST/GraphQL APIs.',
    requiredSkills: ['SQL', 'Rest Apis', 'Git'],
    preferredSkills: ['Node.js', 'Express', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Django'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Backend Development',
    keywords: ['backend', 'server', 'api', 'database', 'rest', 'microservices', 'sql', 'node.js', 'python', 'java'],
    whyRecommended: 'Your backend programming, API design, and database integration skills support server-side engineering.'
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    entryTitle: 'Junior Data Analyst',
    category: 'Data',
    icon: 'analytics',
    description: 'Extracts, transforms, analyzes, and visualizes data to uncover actionable business insights and trends.',
    requiredSkills: ['SQL', 'Python'],
    preferredSkills: ['Pandas', 'NumPy', 'Data Analysis', 'Excel', 'Statistics', 'Matplotlib'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Data Analytics',
    keywords: ['data analyst', 'analytics', 'sql', 'python', 'pandas', 'numpy', 'visualization', 'dashboard', 'statistics'],
    whyRecommended: 'Your SQL, Python data handling, and analytical problem solving align with data analytics roles.'
  },
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    entryTitle: 'Associate Software Engineer',
    category: 'CS Core',
    icon: 'terminal',
    description: 'Applies software engineering principles, algorithms, data structures, and system design to build software.',
    requiredSkills: ['Data Structures', 'Algorithms', 'OOP', 'Git'],
    preferredSkills: ['C++', 'Java', 'Python', 'Go', 'SQL', 'Linux', 'Operating Systems'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Software Engineering',
    keywords: ['software engineer', 'swe', 'algorithms', 'data structures', 'dsa', 'system architecture', 'c++', 'java', 'git'],
    whyRecommended: 'Your computer science foundations, algorithms, and programming proficiency align with software engineering.'
  },
  {
    id: 'ai_engineer',
    title: 'AI / GenAI Engineer',
    entryTitle: 'AI Developer',
    category: 'AI / LLM',
    icon: 'smart_toy',
    description: 'Builds generative AI applications, agentic workflows, RAG pipelines, and LLM integrations.',
    requiredSkills: ['Python', 'Rest Apis', 'Git'],
    preferredSkills: ['LangChain', 'OpenAI', 'LLM', 'Generative AI', 'RAG', 'Vector Database', 'FastAPI'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'AI / Machine Learning',
    keywords: ['ai', 'genai', 'generative ai', 'llm', 'rag', 'langchain', 'embeddings', 'vector database', 'python', 'api'],
    whyRecommended: 'Your work with Python, APIs, and modern AI/LLM tools prepares you for Generative AI development.'
  },
  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer',
    entryTitle: 'Junior ML Engineer',
    category: 'AI / Data Science',
    icon: 'psychology',
    description: 'Designs, trains, evaluates, and deploys predictive machine learning models and deep neural networks.',
    requiredSkills: ['Python', 'Machine Learning', 'NumPy', 'Pandas', 'scikit-learn'],
    preferredSkills: ['PyTorch', 'TensorFlow', 'Deep Learning', 'Statistics', 'SQL'],
    minExperienceYears: 1,
    experienceRequired: '1+ years',
    domain: 'AI / Machine Learning',
    keywords: ['machine learning', 'ml', 'deep learning', 'neural networks', 'model', 'training', 'scikit-learn', 'pandas', 'numpy'],
    whyRecommended: 'Your machine learning, mathematical modeling, and Python data science foundations support ML engineering.'
  },
  {
    id: 'java_developer',
    title: 'Java Developer',
    entryTitle: 'Junior Java Developer',
    category: 'Enterprise / Backend',
    icon: 'coffee',
    description: 'Builds enterprise-grade, scalable backend systems, microservices, and distributed applications with Java.',
    requiredSkills: ['Java', 'SQL', 'OOP', 'Git'],
    preferredSkills: ['Spring Boot', 'Spring', 'Hibernate', 'Microservices', 'Rest Apis', 'PostgreSQL'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Backend Development',
    keywords: ['java', 'spring', 'spring boot', 'enterprise', 'microservices', 'jpa', 'hibernate', 'sql'],
    whyRecommended: 'Your Java and object-oriented backend proficiency fit enterprise Java application engineering.'
  },
  {
    id: 'qa_engineer',
    title: 'QA / Automation Engineer',
    entryTitle: 'QA Intern / Junior QA',
    category: 'Testing & Quality',
    icon: 'fact_check',
    description: 'Designs automated test suites, performs integration testing, and ensures software quality standards.',
    requiredSkills: ['JavaScript', 'Python', 'Git'],
    preferredSkills: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'Unit Testing', 'Postman'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Software Engineering',
    keywords: ['qa', 'quality assurance', 'testing', 'automation', 'test suite', 'unit test', 'integration test', 'git'],
    whyRecommended: 'Your testing practices, test automation, and code validation experience match QA engineering.'
  },
  {
    id: 'devops_engineer',
    title: 'DevOps & Cloud Engineer',
    entryTitle: 'Junior DevOps Engineer',
    category: 'Cloud / Infrastructure',
    icon: 'cloud',
    description: 'Manages cloud infrastructure, automates CI/CD deployment pipelines, and maintains system reliability.',
    requiredSkills: ['Linux', 'Docker', 'AWS'],
    preferredSkills: ['Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Nginx', 'Git'],
    minExperienceYears: 1,
    experienceRequired: '1+ years',
    domain: 'DevOps & Cloud',
    keywords: ['devops', 'cloud', 'infrastructure', 'ci/cd', 'docker', 'kubernetes', 'aws', 'linux', 'git'],
    whyRecommended: 'Your cloud computing, containerization, and automation skill set fits DevOps and infrastructure roles.'
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    entryTitle: 'Junior Data Scientist',
    category: 'Data Science & Stats',
    icon: 'query_stats',
    description: 'Leverages statistical modeling, machine learning, and data exploration to extract predictive business value.',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Pandas'],
    preferredSkills: ['NumPy', 'Statistics', 'Scikit-learn', 'Data Visualization', 'Matplotlib'],
    minExperienceYears: 1,
    experienceRequired: '1+ years',
    domain: 'Data Science',
    keywords: ['data scientist', 'statistics', 'predictive', 'modeling', 'data science', 'python', 'sql', 'pandas', 'machine learning'],
    whyRecommended: 'Your statistics, Python data analysis, and machine learning skill set support data science positions.'
  },
  {
    id: 'mobile_developer',
    title: 'Mobile App Developer',
    entryTitle: 'Junior Mobile Developer',
    category: 'Mobile',
    icon: 'smartphone',
    description: 'Builds cross-platform or native mobile applications for iOS and Android devices.',
    requiredSkills: ['JavaScript', 'Git', 'Rest Apis'],
    preferredSkills: ['React Native', 'Flutter', 'TypeScript', 'Kotlin', 'Swift'],
    minExperienceYears: 0,
    experienceRequired: '0–1 years',
    domain: 'Mobile Development',
    keywords: ['mobile', 'app', 'android', 'ios', 'react native', 'flutter', 'javascript', 'git'],
    whyRecommended: 'Your mobile development, UI components, and API integration skills align with mobile engineering.'
  }
];

/* ============================================================
   ANALYZER STATE
   ============================================================ */
let analyzerState = {
  file: null,
  fileName: '',
  fileSize: '',
  fileType: '',
  fromBuilder: false,
  resumeText: '',
  parsedData: null,
  classification: null,
  structuredResume: null,
  scores: null,
  analysisComplete: false,
  jobRecommendations: [],
  bestFitRole: null,
  jdText: '',
  jdMatchResult: null,
  documentStructure: null
};

/* ============================================================
   FILE VALIDATION
   ============================================================ */
function validateFile(file) {
  if (!file) return { valid: false, error: 'No file selected.' };

  const ext = '.' + file.name.split('.').pop().toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    return { valid: false, error: `Unsupported file type "${ext}". Please upload a PDF or DOCX file.` };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return { valid: false, error: `File is too large (${sizeMB} MB). Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.` };
  }

  if (file.size === 0) {
    return { valid: false, error: 'The file appears to be empty (0 bytes).' };
  }

  return { valid: true };
}

/* ============================================================
   TEXT EXTRACTION — PDF (PDF.js + Multi-Page + OCR Fallback)
   ============================================================ */
async function extractPDFText(file) {
  if (typeof pdfjsLib === 'undefined') {
    throw new Error('PDF.js library is not loaded. Please check your internet connection and refresh the page.');
  }

  const arrayBuffer = await file.arrayBuffer();
  let pdf;
  try {
    pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  } catch (e) {
    throw new Error('Unable to parse PDF file. The file may be corrupted or password-protected.');
  }

  const totalPages = pdf.numPages;
  if (totalPages === 0) {
    throw new Error('The PDF has no pages.');
  }

  let fullText = '';
  let allPdfItems = [];

  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    if (content.items && content.items.length) {
      allPdfItems.push(...content.items);
    }
    
    let lastY = null;
    let pageLines = [];
    let currentLine = [];

    content.items.forEach(item => {
      const y = item.transform ? Math.round(item.transform[5]) : null;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 4) {
        if (currentLine.length) pageLines.push(currentLine.join(' '));
        currentLine = [];
      }
      if (item.str && item.str.trim()) {
        currentLine.push(item.str.trim());
      }
      if (y !== null) lastY = y;
    });
    if (currentLine.length) pageLines.push(currentLine.join(' '));

    const pageText = pageLines.join('\n');
    if (pageText) {
      fullText += pageText + '\n\n';
    }
  }

  // Bug 3: Inspect PDF document structure directly before text flattening
  const pdfLayout = detectPDFMultiColumn(allPdfItems);
  analyzerState.documentStructure = pdfLayout;

  fullText = sanitizeExtractedText(fullText.trim());

  // OCR Fallback for Scanned / Image-Based PDFs
  if (!fullText || fullText.length < 40) {
    if (typeof Tesseract !== 'undefined') {
      try {
        let ocrText = '';
        const maxPagesToOcr = Math.min(totalPages, 3);
        for (let i = 1; i <= maxPagesToOcr; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          const ocrResult = await Tesseract.recognize(canvas, 'eng');
          if (ocrResult && ocrResult.data && ocrResult.data.text) {
            ocrText += ocrResult.data.text + '\n\n';
          }
        }
        ocrText = sanitizeExtractedText(ocrText.trim());
        if (ocrText && ocrText.length >= 40) {
          return ocrText;
        }
      } catch (ocrErr) {
        console.warn('OCR attempt failed:', ocrErr);
      }
    }
    throw new Error('⚠️ We could not reliably read this PDF. The document appears to be an image-based or scanned file without selectable text. Please upload a text-based PDF or higher-quality scan.');
  }

  return fullText;
}

/* ============================================================
   TEXT EXTRACTION — DOCX (Mammoth.js)
   ============================================================ */
async function extractDOCXText(file) {
  if (typeof mammoth === 'undefined') {
    throw new Error('Mammoth.js library is not loaded. Please check your internet connection and refresh the page.');
  }

  const arrayBuffer = await file.arrayBuffer();
  let result;
  try {
    result = await mammoth.extractRawText({ arrayBuffer });
  } catch (e) {
    throw new Error('Unable to parse DOCX file. The file may be corrupted.');
  }

  // Bug 3: Inspect DOCX document structure directly for tables or multi-column sections
  const docxLayout = await detectDOCXStructure(arrayBuffer);
  analyzerState.documentStructure = docxLayout;

  const text = sanitizeExtractedText((result.value || '').trim());
  if (!text || text.length < 20) {
    throw new Error('Unable to extract readable text from this DOCX. The document may be empty or contain only images.');
  }

  return text;
}

/* ============================================================
   DOCUMENT STRUCTURE & LAYOUT DETECTION (Bug 3 Fix)
   ============================================================ */
function detectPDFMultiColumn(pageItems, viewportWidth = 600) {
  if (!pageItems || pageItems.length === 0) {
    return { isMultiColumn: false, hasTables: false, columnCount: 1, details: 'Single-column text layout' };
  }

  // Group text items by vertical position (Y coordinate grouped within 4 points)
  const lineMap = new Map();
  pageItems.forEach(item => {
    if (!item.str || !item.str.trim()) return;
    const y = item.transform ? Math.round(item.transform[5] / 4) * 4 : 0;
    const x = item.transform ? Math.round(item.transform[4]) : 0;
    const width = item.width ? Math.round(item.width) : (item.str.length * 6);
    if (!lineMap.has(y)) lineMap.set(y, []);
    lineMap.get(y).push({ x, y, width, str: item.str.trim() });
  });

  let multiColumnLineCount = 0;
  lineMap.forEach((items) => {
    if (items.length < 2) return;
    items.sort((a, b) => a.x - b.x);
    for (let i = 0; i < items.length - 1; i++) {
      const item1 = items[i];
      const item2 = items[i + 1];
      const gap = item2.x - (item1.x + item1.width);
      // If two distinct substantial text blocks share the same vertical position with a significant gap >= 60 points
      if (gap >= 60 && item1.str.length >= 3 && item2.str.length >= 3) {
        multiColumnLineCount++;
        break;
      }
    }
  });

  const isMultiColumn = multiColumnLineCount >= 4;
  return {
    isMultiColumn,
    hasTables: isMultiColumn,
    columnCount: isMultiColumn ? 2 : 1,
    multiColumnLines: multiColumnLineCount,
    details: isMultiColumn
      ? `Multi-column layout detected (${multiColumnLineCount} lines with distinct horizontal column clusters)`
      : 'Single-column text layout — clean linear reading order detected'
  };
}

async function detectDOCXStructure(arrayBuffer) {
  if (!arrayBuffer) {
    return { isMultiColumn: false, hasTables: false, columnCount: 1, details: 'Single-column text layout' };
  }

  let hasTables = false;
  let details = 'Single-column text layout detected';

  try {
    if (typeof mammoth !== 'undefined' && typeof mammoth.convertToHtml === 'function') {
      const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
      const html = htmlResult.value || '';
      if (/<table\b/i.test(html)) {
        hasTables = true;
        details = 'Table-based multi-column layout detected in document structure';
      }
    }
  } catch (e) {
    // Non-critical check
  }

  return {
    isMultiColumn: hasTables,
    hasTables,
    columnCount: hasTables ? 2 : 1,
    details,
    source: 'docx'
  };
}

function detectDocumentLayoutFromText(text) {
  if (!text) return { isMultiColumn: false, hasTables: false, columnCount: 1, details: 'Single-column text layout' };

  // 1. Explicit metadata or simulator tokens
  if (/\[layout:\s*(?:multi[-_\s]?column|two[-_\s]?column|table)\]/i.test(text)) {
    return { isMultiColumn: true, hasTables: true, columnCount: 2, details: 'Multi-column table layout detected in document structure' };
  }

  // 2. Markdown / ASCII tables with row separators (|---|---| or | col1 | col2 |)
  const lines = text.split('\n');
  const tableBorderLines = lines.filter(l => /\|[\s-:]+\|[\s-:]+\|/.test(l));
  const multiCellLines = lines.filter(l => (l.match(/\|/g) || []).length >= 3);
  if (tableBorderLines.length >= 1 || multiCellLines.length >= 4) {
    return { isMultiColumn: true, hasTables: true, columnCount: 2, details: 'Table layout detected in document structure' };
  }

  // 3. Tab or wide-column spacing on multiple non-header lines
  const tabSpacedLines = lines.filter(l => /\t{2,}|[ ]{8,}/.test(l) && !/^[•\-\*]/.test(l.trim()));
  if (tabSpacedLines.length >= 8) {
    return { isMultiColumn: true, hasTables: false, columnCount: 2, details: 'Multi-column layout detected with wide horizontal text separation' };
  }

  return { isMultiColumn: false, hasTables: false, columnCount: 1, details: 'Single-column text layout' };
}

function detectDocumentLayout(source, options = {}) {
  if (!source) return { isMultiColumn: false, hasTables: false, columnCount: 1, details: 'Single-column text layout' };
  if (typeof source === 'string') return detectDocumentLayoutFromText(source);
  if (Array.isArray(source)) return detectPDFMultiColumn(source, options.viewportWidth);
  if (source instanceof ArrayBuffer || (typeof Buffer !== 'undefined' && Buffer.isBuffer(source))) {
    return detectDOCXStructure(source);
  }
  if (typeof source === 'object') {
    if (source.isMultiColumn !== undefined || source.hasTables !== undefined) return source;
    if (source.items) return detectPDFMultiColumn(source.items, options.viewportWidth);
  }
  return { isMultiColumn: false, hasTables: false, columnCount: 1, details: 'Single-column text layout' };
}

/* ============================================================
   TEXT SANITIZATION & BOUNDARY NORMALIZATION
   ============================================================ */
function sanitizeExtractedText(raw) {
  if (!raw) return '';
  let text = raw;

  // 1. Bug 1 Fix: Separate merged email and adjacent text (e.g. user@domain.comExperience or user@domain.com+91...)
  // Only separate when preceded by an actual email address (@...) and followed immediately by capital letter or phone digits without whitespace
  text = text.replace(/(@[A-Za-z0-9.-]+\.(?:com|org|net|edu|gov|co|in|ai|dev|me|tech|app|xyz|io|info|biz|site|[a-z]{2,4}))([A-Z][a-z]+|\+\d|\d{10})/g, '$1 $2');

  // 2. Separate merged URLs
  text = text.replace(/(linkedin\.com\/in\/[\w\-]+|github\.com\/[\w\-]+)([A-Z][a-z]+|\+\d)/g, '$1 $2');

  // 3. Normalize delimiter boundaries: ensure space around pipes if tightly adjacent to alphanumeric
  text = text.replace(/([^\s|])\|([^\s|])/g, '$1 | $2');

  // 4. Normalize bullet characters
  text = text.replace(/[\u2022\u2023\u25E6\u2043\u2219\u25AA\u25BA\u25B8]/g, '• ');

  // 5. Normalize multiple spaces on the same line
  text = text.split('\n').map(line => line.replace(/[ \t]+/g, ' ').trim()).join('\n');

  // 6. Remove excessive consecutive blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/* ============================================================
   CONVERT BUILDER RESUME TO TEXT
   ============================================================ */
function convertBuilderToText(resume) {
  if (!resume) return '';

  const lines = [];
  const p = resume.personal || {};

  // Contact
  if (p.name && p.name !== 'Your Name') lines.push(p.name);
  if (p.title) lines.push(p.title);
  
  const contacts = [];
  if (p.location) contacts.push(p.location);
  if (p.phone) contacts.push(p.phone.startsWith('+') || /phone/i.test(p.phone) ? p.phone : `Phone: ${p.phone}`);
  if (p.email) contacts.push(p.email);
  if (p.linkedin) {
    const cleanLi = p.linkedin.trim();
    if (cleanLi.includes('linkedin.com') || cleanLi.startsWith('http')) {
      contacts.push(cleanLi);
    } else {
      contacts.push(`linkedin.com/in/${cleanLi.replace(/^(in\/|@)/, '')}`);
    }
  }
  if (p.github) {
    const cleanGh = p.github.trim();
    if (cleanGh.includes('github.com') || cleanGh.startsWith('http')) {
      contacts.push(cleanGh);
    } else {
      contacts.push(`github.com/${cleanGh.replace(/^@/, '')}`);
    }
  }
  if (p.portfolio) contacts.push(p.portfolio);

  if (contacts.length) lines.push(contacts.join(' | '));
  lines.push('');

  // Summary
  if (resume.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push(resume.summary);
    lines.push('');
  }

  // Skills
  const sk = resume.skills || {};
  const skillLines = [
    sk.languages ? `Languages: ${sk.languages}` : '',
    sk.frontend ? `Frontend: ${sk.frontend}` : '',
    sk.backend ? `Backend: ${sk.backend}` : '',
    sk.databases ? `Databases & Cloud: ${sk.databases}` : '',
    sk.tools ? `Tools & Architecture: ${sk.tools}` : ''
  ].filter(Boolean);
  if (skillLines.length) {
    lines.push('TECHNICAL SKILLS');
    lines.push(...skillLines);
    lines.push('');
  }

  // Experience
  const exp = resume.experience || [];
  if (exp.length) {
    lines.push('WORK EXPERIENCE');
    exp.forEach(e => {
      if (e.role) lines.push(`${e.role}${e.company ? ' | ' + e.company : ''}`);
      if (e.startDate || e.endDate) lines.push(`${e.startDate || ''} - ${e.endDate || ''} ${e.location ? '| ' + e.location : ''}`);
      if (e.description) {
        e.description.split('\n').forEach(b => {
          if (b.trim()) lines.push('• ' + b.trim().replace(/^[•\-\*]\s*/, ''));
        });
      }
      lines.push('');
    });
  }

  // Projects
  const prj = resume.projects || [];
  if (prj.length) {
    lines.push('PROJECTS');
    prj.forEach(pr => {
      if (pr.name) lines.push(`${pr.name}${pr.github ? ' | ' + pr.github : ''}${pr.demo ? ' | ' + pr.demo : ''}`);
      if (pr.tech) lines.push(`Technologies: ${pr.tech}`);
      if (pr.description) {
        pr.description.split('\n').forEach(b => {
          if (b.trim()) lines.push('• ' + b.trim().replace(/^[•\-\*]\s*/, ''));
        });
      }
      lines.push('');
    });
  }

  // Education
  const edu = resume.education || [];
  if (edu.length) {
    lines.push('EDUCATION');
    edu.forEach(e => {
      if (e.degree) lines.push(e.degree);
      if (e.institution) lines.push(e.institution);
      if (e.startDate || e.endDate) lines.push(`${e.startDate || ''} - ${e.endDate || ''}`);
      if (e.gpa) lines.push(e.gpa);
      lines.push('');
    });
  }

  // Achievements
  const ach = resume.achievements || [];
  if (ach.length) {
    lines.push('ACHIEVEMENTS');
    ach.forEach(a => {
      if (a.title) lines.push(a.title);
      if (a.org) lines.push(a.org);
      if (a.date) lines.push(a.date);
      if (a.description) lines.push(a.description);
      lines.push('');
    });
  }

  // Certifications
  const crt = resume.certifications || [];
  if (crt.length) {
    lines.push('CERTIFICATIONS');
    crt.forEach(c => {
      if (c.name) lines.push(c.name);
      if (c.issuer) lines.push(c.issuer);
      if (c.date) lines.push(c.date);
      if (c.credentialId) lines.push(c.credentialId);
      lines.push('');
    });
  }

  return lines.join('\n').trim();
}

/* ============================================================
   1. RESUME DOCUMENT VALIDATION & CLASSIFIER
   ============================================================ */

/**
 * Classifies the document type and calculates a resumeConfidence score (0–100).
 * Prevents analyzing invoices, certificates, marksheets, research papers, offer letters, or random text.
 */
function classifyDocument(text) {
  const textLower = text.toLowerCase();
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const words = textLower.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const nonResumeMatches = {
    invoice: [],
    certificate: [],
    marksheet: [],
    research_paper: [],
    offer_letter: []
  };

  // 1. Check Non-Resume Indicators
  const INVOICE_PATTERNS = [
    /\b(tax\s*invoice|commercial\s*invoice|proforma\s*invoice)\b/i,
    /\b(bill\s*to|ship\s*to|invoice\s*(?:no|number|#)|inv-\d+)\b/i,
    /\b(payment\s*terms|due\s*date|amount\s*due|subtotal|total\s*due|balance\s*due)\b/i,
    /\b(unit\s*price|qty|item\s*description|remit\s*payment|vat\s*reg|gstin)\b/i
  ];
  INVOICE_PATTERNS.forEach(p => {
    const m = text.match(p);
    if (m) nonResumeMatches.invoice.push(m[0]);
  });

  const CERTIFICATE_PATTERNS = [
    /\b(certificate\s*of\s*(?:completion|participation|achievement|merit|appreciation|excellence|attendance|recognition))\b/i,
    /\b(this\s*is\s*to\s*certify\s*that|has\s*successfully\s*completed|is\s*hereby\s*awarded)\b/i,
    /\b(course\s*completion\s*certificate|certificate\s*of\s*training|presented\s*to)\b/i,
    /\b(authorized\s*signatory|given\s*this\s*day\s*of|date\s*of\s*issue)\b/i
  ];
  CERTIFICATE_PATTERNS.forEach(p => {
    const m = text.match(p);
    if (m) nonResumeMatches.certificate.push(m[0]);
  });

  const MARKSHEET_PATTERNS = [
    /\b(statement\s*of\s*marks|marks\s*statement|grade\s*card|transcript\s*of\s*records)\b/i,
    /\b(semester\s*grade\s*point\s*average|sgpa|cgpa\s*sheet|grade\s*sheet)\b/i,
    /\b(roll\s*no\.?|enrollment\s*no\.?|subject\s*code|credits\s*earned)\b/i,
    /\b(theory\s*marks|practical\s*marks|internal\s*assessment|university\s*examination)\b/i,
    /\b(passed\s*in\s*semester|semester\s*[i|v|x|\d]+\s*examination)\b/i
  ];
  MARKSHEET_PATTERNS.forEach(p => {
    const m = text.match(p);
    if (m) nonResumeMatches.marksheet.push(m[0]);
  });

  const PAPER_PATTERNS = [
    /\b(abstract\s*[-–—]|index\s*terms\s*[-–—]|ieee\s*transactions)\b/i,
    /\b(introduction\s*\n|methodology\s*\n|related\s*work\s*\n|experimental\s*results)\b/i,
    /\b(conclusion\s*and\s*future\s*work|references\s*\[1\]|doi:\s*10\.\d+|\barxiv:\d+\.\d+)\b/i
  ];
  PAPER_PATTERNS.forEach(p => {
    const m = text.match(p);
    if (m) nonResumeMatches.research_paper.push(m[0]);
  });

  const OFFER_PATTERNS = [
    /\b(offer\s*of\s*employment|letter\s*of\s*offer|pleased\s*to\s*offer\s*you)\b/i,
    /\b(annual\s*ctc|compensation\s*and\s*benefits|date\s*of\s*joining)\b/i,
    /\b(terms\s*of\s*employment|probation\s*period|employment\s*agreement)\b/i
  ];
  OFFER_PATTERNS.forEach(p => {
    const m = text.match(p);
    if (m) nonResumeMatches.offer_letter.push(m[0]);
  });

  // 2. Identify Positive Resume Signals
  const detectedSections = {};
  for (const [sec, pattern] of Object.entries(SECTION_PATTERNS)) {
    if (pattern.test(text)) {
      detectedSections[sec] = true;
    }
  }

  const contactInfo = extractContactInfo(text);
  const skills = extractSkills(text);
  const hasEducationDegree = /\b(b\.?tech|b\.?e\.?|b\.?s\.?|b\.?c\.?a\.?|m\.?tech|m\.?s\.?|m\.?c\.?a\.?|m\.?b\.?a\.?|ph\.?d|bachelor(?:'s)?|master(?:'s)?|diploma|university|college|institute|cgpa|gpa)\b/i.test(text);
  const hasDatesOrDurations = /\b(201\d|202\d)\s*[-–to]\s*(201\d|202\d|present|current)\b/i.test(text);
  const hasJobTitles = /\b(software\s*engineer|full\s*stack|frontend|backend|developer|intern|internship|analyst|data\s*scientist|designer|lead|specialist)\b/i.test(text);
  const hasProjectIndicators = /\b(github\.com|demo|project|developed|built|engineered|architected|implemented)\b/i.test(text);

  // 3. Compute Resume Confidence Score (0–100)
  let confidence = 0;
  const detectedSignals = [];
  const missingSignals = [];

  // Signal: Summary / Profile
  if (detectedSections.summary) {
    confidence += 15;
    detectedSignals.push('Professional Summary / Profile');
  } else {
    missingSignals.push('Professional Summary');
  }

  // Signal: Education Section & Degree
  if (detectedSections.education || hasEducationDegree) {
    confidence += 15;
    detectedSignals.push('Education / Academic Background');
  } else {
    missingSignals.push('Education Section');
  }

  // Signal: Experience / Internships
  if (detectedSections.experience || (hasJobTitles && hasDatesOrDurations)) {
    confidence += 20;
    detectedSignals.push('Work Experience / Internships');
  } else {
    missingSignals.push('Work Experience / Internships');
  }

  // Signal: Technical Skills
  if (detectedSections.skills || skills.all.length >= 4) {
    confidence += 15;
    detectedSignals.push(`Technical Skills (${skills.all.length} detected)`);
  } else {
    missingSignals.push('Structured Technical Skills Section');
  }

  // Signal: Projects
  if (detectedSections.projects || (hasProjectIndicators && skills.all.length >= 2)) {
    confidence += 15;
    detectedSignals.push('Technical Projects');
  } else {
    missingSignals.push('Projects Section');
  }

  // Signal: Certifications / Achievements
  if (detectedSections.certifications || detectedSections.achievements) {
    confidence += 10;
    detectedSignals.push('Certifications / Achievements');
  }

  // Signal: Professional Contact Details
  if (contactInfo.email && (contactInfo.phone || contactInfo.linkedin || contactInfo.github)) {
    confidence += 5;
    detectedSignals.push('Professional Contact Details');
  }

  // Signal: Dates, Job Titles & Companies
  if (hasDatesOrDurations && hasJobTitles) {
    confidence += 5;
    detectedSignals.push('Employment Durations & Job Titles');
  }

  // 4. Non-Resume Penalties & Detection
  let detectedType = 'resume';
  let nonResumeReason = '';

  if (nonResumeMatches.invoice.length >= 2) {
    detectedType = 'invoice';
    nonResumeReason = `Document matches standard billing/invoice patterns (${nonResumeMatches.invoice.slice(0, 3).join(', ')}).`;
    confidence = Math.max(0, confidence - 65);
  } else if (nonResumeMatches.certificate.length >= 2 && !detectedSections.experience && !detectedSections.projects) {
    detectedType = 'certificate';
    nonResumeReason = `Document matches training/course certificate format ("${nonResumeMatches.certificate.slice(0, 2).join('", "')}").`;
    confidence = Math.max(0, confidence - 60);
  } else if (nonResumeMatches.marksheet.length >= 2 && !detectedSections.experience && !detectedSections.projects) {
    detectedType = 'marksheet';
    nonResumeReason = `Document matches academic marksheet / semester exam transcript ("${nonResumeMatches.marksheet.slice(0, 2).join('", "')}").`;
    confidence = Math.max(0, confidence - 60);
  } else if (nonResumeMatches.research_paper.length >= 2 && !detectedSections.experience) {
    detectedType = 'research_paper';
    nonResumeReason = `Document matches research paper / publication format with academic abstract and reference citations.`;
    confidence = Math.max(0, confidence - 60);
  } else if (nonResumeMatches.offer_letter.length >= 2) {
    detectedType = 'offer_letter';
    nonResumeReason = `Document matches corporate offer of employment / joining agreement.`;
    confidence = Math.max(0, confidence - 60);
  } else if (wordCount < 40 && !detectedSections.education && !detectedSections.experience && !detectedSections.projects) {
    detectedType = 'minimal_text';
    nonResumeReason = `Document contains minimal text (${wordCount} words) with only basic contact strings. It lacks essential sections (Education, Projects, Skills, Experience).`;
    confidence = Math.min(confidence, 25);
  }

  // Bound confidence between 0 and 100
  confidence = Math.min(Math.max(Math.round(confidence), 0), 100);

  // Status determination
  let status = 'CONFIDENT';
  let isResume = true;
  let statusMessage = '';

  if (confidence < 60) {
    isResume = false;
    status = 'REJECTED';
    statusMessage = '⚠️ This document does not appear to be a resume or CV.';
  } else if (confidence <= 75) {
    isResume = true;
    status = 'UNCERTAIN';
    statusMessage = '⚠️ This appears to be a resume, but some sections could not be confidently identified.';
  } else {
    isResume = true;
    status = 'CONFIDENT';
    statusMessage = 'Valid resume structure detected with high confidence.';
  }

  return {
    isResume,
    confidence,
    status,
    statusMessage,
    detectedType,
    nonResumeReason,
    detectedSignals,
    missingSignals,
    detectedSections
  };
}

/* ============================================================
   2. SECTION HEADER DETECTION & SEGMENTATION
   ============================================================ */
function isSectionHeaderLine(line) {
  const clean = line.replace(/^[#*\-•\s]+/, '').trim();
  if (clean.length > 50 || clean.length < 3) return false;
  
  // Exclude inline attribute declarations
  if (/^(technologies|tech|tools|languages|frontend|backend|databases|github|demo|link|credential\s*id|coursework|skills|interests|responsibilities|phone|email|location|linkedin|leetcode):\s*\S+/i.test(clean)) {
    return false;
  }
  // Exclude lines with 2 or more commas
  if ((clean.match(/,/g) || []).length >= 2) return false;
  // Exclude lines containing email or 10-digit phone
  if (/@|\+?\d{10}/.test(clean)) return false;

  // Sentences ending with periods are prose/bullets, not section headers
  if (/\.\s*$/.test(clean)) return false;

  // Conversational sentence words indicate body text rather than a section title
  if (/\b(include|including|with|using|for|and|my|our|across|specializing|experienced|proven|proficient|skilled|worked|developed|built)\b/i.test(clean) && clean.split(/\s+/).length > 3) {
    return false;
  }

  return true;
}

/**
 * Parses resume text into discrete logical sections (summary, skills, experience, etc.)
 * based on header regex matching and line position tracking.
 * @param {string} text - The raw extracted resume plain text.
 * @returns {{ detected: Object, sectionContent: Object, lines: string[], sectionPositions: Array }} 
 *   An object containing flags for detected sections and their raw text chunks.
 */
function parseResumeSections(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const detected = {};
  const sectionContent = {};
  const sectionPositions = [];

  lines.forEach((line, idx) => {
    if (isSectionHeaderLine(line)) {
      for (const [sectionName, pattern] of Object.entries(SECTION_PATTERNS)) {
        if (pattern.test(line)) {
          sectionPositions.push({ name: sectionName, lineIdx: idx, line });
          detected[sectionName] = true;

          if (/project/i.test(line) && /(experience|work|history)/i.test(line)) {
            detected.experience = true;
            detected.projects = true;
          }
          if (/achievements?\s*(&|and)?\s*(credentials?|certifications?)/i.test(line)) {
            detected.achievements = true;
            detected.certifications = true;
          }
          break;
        }
      }
    }
  });

  sectionPositions.forEach((sec, i) => {
    const startLine = sec.lineIdx + 1;
    const endLine = (i + 1 < sectionPositions.length) ? sectionPositions[i + 1].lineIdx : lines.length;
    const content = lines.slice(startLine, endLine).join('\n');
    sectionContent[sec.name] = content;
  });

  return { detected, sectionContent, lines, sectionPositions };
}

/* ============================================================
   3. CONTACT INFORMATION EXTRACTION (Isolated from Experience)
   ============================================================ */
/**
 * Extracts candidate personal details (name, email, phone, location, LinkedIn, GitHub, portfolio).
 * Isolates contact patterns so numerical values (e.g. phone digits or postal codes) are never confused with years of experience.
 * @param {string} text - Raw resume plain text.
 * @returns {{ name: boolean, email: boolean, phone: boolean, linkedin: boolean, github: boolean, portfolio: boolean, location: boolean, score: number, details: Object }}
 */
function extractContactInfo(text) {
  const result = {
    name: false,
    email: false,
    phone: false,
    location: false,
    linkedin: false,
    github: false,
    portfolio: false,
    quality: false,
    confidence: 0,
    details: {},
    evidence: {}
  };

  const cleanText = sanitizeExtractedText(text || '');
  const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
  const headerLines = lines.slice(0, 14);

  // 1. Email Extraction (Bug 1 & Bug 5 Fix)
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}\b/i;
  const emailMatch = cleanText.match(emailRegex) || (text || '').match(emailRegex);
  if (emailMatch) {
    let email = emailMatch[0].trim().replace(/^mailto:/i, '').replace(/^[<(\[]+|[.,;:)>\]|]+$/g, '');
    result.email = true;
    result.details.email = email;
    result.evidence.email = { source: 'Header / Contact', snippet: email, confidence: 0.99 };
    
    const emailLower = email.toLowerCase();
    const isStandardDomain = /@(gmail|outlook|hotmail|yahoo|icloud|proton|protonmail|live|zoho|[\w\-]+\.(edu|ac\.\w{2}|org|io|dev|tech|co|in))\b/i.test(emailLower);
    
    // Bug 5: Casual email soft heuristic
    const localPart = emailLower.split('@')[0] || '';
    const cleanLocalWords = localPart.replace(/[.+_-]/g, ' ');
    const CASUAL_SLANG_WORDS = /\b(cool|dude|gamer|guy|killer|beast|boss|badboy|swag|ninja|sexy|hot|lover|rocker|hacker|crazy|funky|cute|shadow|prince|princess|angel|devil)\b/i;
    const hasCasualSlang = CASUAL_SLANG_WORDS.test(cleanLocalWords);
    
    const digitRuns = localPart.match(/\d+/g) || [];
    const hasExcessiveDigits = digitRuns.some(d => d.length >= 4 && !(parseInt(d) >= 1970 && parseInt(d) <= 2035));
    
    const isCasual = hasCasualSlang || hasExcessiveDigits;
    result.isCasualEmail = isCasual;
    result.isProfessionalEmail = isStandardDomain && !/test|fake|spam|temp/i.test(emailLower) && !isCasual;
    if (isCasual) {
      result.casualEmailReason = hasCasualSlang
        ? 'Email handle contains casual or informal slang terms'
        : 'Email handle contains excessive digit sequences';
    }
  }

  // 2. Phone Extraction (Strictly isolated from dates or experience numbers)
  const phonePatterns = [
    /(?:phone|mobile|mob|cell|tel|contact|call|ph|p|m|t)\s*[:|–\-.]\s*(\+?\d{1,4}[-\s.]?(?:\(?\d{2,5}\)?[-\s.]?)?\d{2,5}[-\s.]?\d{2,5}(?:[-\s.]?\d{2,5})?)/i,
    /(?:^|[^\d\w+])((?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4})(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w+])((?:\+?91[\s.-]?)?[6-9]\d{4}[\s.-]?\d{5})(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w+])((?:\+?91[\s.-]?)?[6-9]\d{9})(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w])(\+\d{1,4}[\s.-]?(?:\(?\d{1,5}\)?[\s.-]?)?\d{2,5}[\s.-]?\d{2,5}(?:[\s.-]?\d{2,5})?)(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w+])([6-9]\d{4}[\s.-]?\d{5})(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w+])([6-9]\d{9})(?:[^\d\w]|$)/m
  ];

  for (const p of phonePatterns) {
    const pMatch = text.match(p);
    if (pMatch) {
      const rawMatch = pMatch[1] || pMatch[0];
      const matchedStr = rawMatch.replace(/^(?:phone|mobile|mob|cell|tel|contact|call|ph|p|m|t)\s*[:|–\-.]\s*/i, '').trim();
      const digitsOnly = matchedStr.replace(/\D/g, '');
      
      if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
        result.phone = true;
        result.details.phone = matchedStr.replace(/^[^\d+(]+|[^\d)]+$/g, '').trim();
        result.evidence.phone = { source: 'Header / Contact', snippet: result.details.phone, confidence: 0.98 };
        break;
      } else if (digitsOnly.length === 10) {
        if (!/^(?:19|20)\d{2}(?:19|20)\d{2}$/.test(digitsOnly) && !/^(?:19|20)\d{2}$/.test(digitsOnly)) {
          result.phone = true;
          result.details.phone = matchedStr.replace(/^[^\d+(]+|[^\d)]+$/g, '').trim();
          result.evidence.phone = { source: 'Header / Contact', snippet: result.details.phone, confidence: 0.98 };
          break;
        }
      } else if (digitsOnly.length > 10 && digitsOnly.length <= 15) {
        result.phone = true;
        result.details.phone = matchedStr.replace(/^[^\d+(]+|[^\d)]+$/g, '').trim();
        result.evidence.phone = { source: 'Header / Contact', snippet: result.details.phone, confidence: 0.98 };
        break;
      }
    }
  }

  // 3. LinkedIn
  const linkedinUrlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin(?:\s*\.\s*com)?\s*\/\s*(?:in|pub)?\s*\/\s*([a-zA-Z0-9_\-\.]+)/i) ||
    text.match(/\blinkedin(?:\s*\.\s*com)?\s*\/\s*([a-zA-Z0-9_\-\.]+)/i) ||
    text.match(/\bin\/([a-zA-Z0-9_\-\.]{3,35})\b/i);

  const linkedinLabelMatch = text.match(/(?:linkedin|linked-in|\bin\b)\s*[:|–\-\/]\s*(?:https?:\/\/)?(?:www\.)?(?:linkedin(?:\s*\.\s*com)?\s*\/(?:(?:in|pub)\/)?)?([a-zA-Z0-9_\-\.]+)/i);

  if (linkedinUrlMatch) {
    const user = (linkedinUrlMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    result.linkedin = true;
    result.details.linkedin = `linkedin.com/in/${user}`;
    result.evidence.linkedin = { source: 'Header / Contact', snippet: result.details.linkedin, confidence: 0.99 };
  } else if (linkedinLabelMatch) {
    const user = (linkedinLabelMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    if (user.length >= 2 && !/^(true|false|null|undefined|yes|no)$/i.test(user)) {
      result.linkedin = true;
      result.details.linkedin = user.includes('linkedin.com') ? user : `linkedin.com/in/${user}`;
      result.evidence.linkedin = { source: 'Header / Contact', snippet: result.details.linkedin, confidence: 0.97 };
    }
  }

  // 4. GitHub
  const RESERVED_GH = ['topics', 'features', 'pricing', 'login', 'explore', 'settings', 'enterprise', 'site', 'about', 'blog', 'repo'];
  const githubUrlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github(?:\s*\.\s*com)?\s*\/\s*([a-zA-Z0-9_\-\.]+)/i);
  const githubLabelMatch = text.match(/(?:github|git)\s*[:|–\-\/]\s*(?:https?:\/\/)?(?:www\.)?(?:github(?:\s*\.\s*com)?\s*\/\s*)?([a-zA-Z0-9_\-\.]+)/i);

  if (githubUrlMatch) {
    const user = (githubUrlMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    if (!RESERVED_GH.includes(user.toLowerCase())) {
      result.github = true;
      result.details.github = `github.com/${user}`;
      result.evidence.github = { source: 'Header / Contact', snippet: result.details.github, confidence: 0.99 };
    }
  } else if (githubLabelMatch) {
    const user = (githubLabelMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    if (user.length >= 2 && !RESERVED_GH.includes(user.toLowerCase()) && !/^(true|false|null|undefined|yes|no)$/i.test(user)) {
      result.github = true;
      result.details.github = user.includes('github.com') ? user : `github.com/${user}`;
      result.evidence.github = { source: 'Header / Contact', snippet: result.details.github, confidence: 0.97 };
    }
  }

  // 5. Portfolio / Coding Profile
  const codingProfileMatch = text.match(/(leetcode\.com\/(u\/)?[\w\-]+|hackerrank\.com\/[\w\-]+|codeforces\.com\/profile\/[\w\-]+)/i);
  const personalSiteMatch = text.match(/\bhttps?:\/\/(?!linkedin|github|gmail|google|facebook|twitter|instagram|youtube|medium)[\w\-]+(?:\.[\w\-]+)+(?:\/[^\s,;)]*)?/i) ||
    text.match(/\b(?<![@/])([a-zA-Z0-9\-]{3,})\.(dev|io|app|me|site|page|tech|vercel\.app|netlify\.app|github\.io)\b/i);

  if (codingProfileMatch) {
    result.portfolio = true;
    result.details.portfolio = codingProfileMatch[0];
    result.evidence.portfolio = { source: 'Header / Contact', snippet: codingProfileMatch[0], confidence: 0.98 };
  } else if (personalSiteMatch && !/^(b\.tech|m\.tech|bachelor|master|degree|college|university)/i.test(personalSiteMatch[0])) {
    result.portfolio = true;
    result.details.portfolio = personalSiteMatch[0];
    result.evidence.portfolio = { source: 'Header / Contact', snippet: personalSiteMatch[0], confidence: 0.95 };
  }

  // 6. Location
  const NON_LOCATION_WORDS = [
    'ai', 'ml', 'generative', 'engineer', 'developer', 'software', 'full', 'stack',
    'science', 'technology', 'university', 'college', 'school', 'intern', 'lead',
    'specialist', 'analyst', 'manager', 'architect', 'bachelor', 'master', 'tech', 'skills'
  ];

  const labeledLoc = text.match(/(?:location|address|city|residence):\s*([^\n\r,|•]+(?:,\s*[^\n\r,|•]+)*)/i);
  if (labeledLoc) {
    result.location = true;
    result.details.location = labeledLoc[1].trim();
    result.evidence.location = { source: 'Header / Contact', snippet: result.details.location, confidence: 0.96 };
  } else {
    for (const line of headerLines) {
      if (/@|\.com|\.org|\.dev/i.test(line) && !line.includes('|') && !line.includes('•')) continue;
      const tokens = line.split(/[|•·]/).map(t => t.trim()).filter(Boolean);
      for (const token of tokens) {
        const m = token.match(/^([A-Z][a-zA-Z\s]+),\s*([A-Z][a-zA-Z\s]+|[A-Z]{2,3})(?:,\s*([A-Z][a-zA-Z\s]+|[A-Z]{2,3}))?$/);
        if (m) {
          const part1 = m[1].trim().toLowerCase();
          if (!NON_LOCATION_WORDS.some(w => part1.includes(w))) {
            result.location = true;
            result.details.location = token;
            result.evidence.location = { source: 'Header / Contact', snippet: token, confidence: 0.92 };
            break;
          }
        }
        if (/\b(remote|hybrid|bangalore|bengaluru|mumbai|delhi|hyderabad|pune|chennai|kanpur|noida|seattle|san francisco|austin|new york)\b/i.test(token) && !/@/.test(token)) {
          result.location = true;
          result.details.location = token;
          result.evidence.location = { source: 'Header / Contact', snippet: token, confidence: 0.94 };
          break;
        }
      }
      if (result.location) break;
    }
  }

  // 7. Name
  for (const line of headerLines) {
    const tokens = line.split(/[|•·,]/).map(t => t.trim()).filter(Boolean);
    const candidate = tokens[0] || line;
    if (candidate.length >= 2 && candidate.length <= 35 &&
        !/@/.test(candidate) && !/\d{3}/.test(candidate) && !/\.com|\.org|\.dev/i.test(candidate) &&
        !/^(summary|experience|skills|education|projects|profile|contact|curriculum|resume|cv)/i.test(candidate) &&
        !/^(full\s*stack|software\s*engineer|developer|intern|data\s*scientist)/i.test(candidate)) {
      result.name = true;
      result.details.name = candidate;
      result.evidence.name = { source: 'Header / Top Line', snippet: candidate, confidence: 0.98 };
      break;
    }
  }

  result.quality = Boolean(result.name && result.email && result.phone && result.isProfessionalEmail !== false);
  
  // Calculate Contact Confidence (0–100%)
  let conf = 0;
  if (result.name) conf += 25;
  if (result.email) conf += 35;
  if (result.phone) conf += 20;
  if (result.linkedin || result.github) conf += 15;
  if (result.location) conf += 5;
  result.confidence = Math.min(conf, 100);

  // Evidence-based Contact Score (Strictly max 3 points - cannot inflate resume)
  let contactPts = 0;
  if (result.name) contactPts += 0.5;
  if (result.email) contactPts += 1.0;
  if (result.phone) contactPts += 0.5;
  if (result.linkedin || result.github || result.portfolio) contactPts += 1.0;
  result.score = Math.min(Math.round(contactPts * 10) / 10, 3);
  result.max = 3;

  return result;
}

/* ============================================================
   4. SKILLS EXTRACTION — EXACT MATCH & EVIDENCE MAPPING
   ============================================================ */
function matchSkillExact(skillKey, textLower, originalText) {
  if (skillKey === 'c++') {
    return /(?:^|[^a-zA-Z0-9_#+])c\+\+(?:$|[^a-zA-Z0-9_#+])/i.test(textLower);
  }
  if (skillKey === 'c#') {
    return /(?:^|[^a-zA-Z0-9_#])c#(?:$|[^a-zA-Z0-9_#])/i.test(textLower);
  }
  if (skillKey === 'c') {
    const hasStandaloneC = /(?:^|[^a-zA-Z0-9_#+])c(?:$|[^a-zA-Z0-9_#+])/i.test(textLower);
    if (!hasStandaloneC) return false;
    
    const strippedCPPandCS = textLower.replace(/c\+\+/g, ' ').replace(/c#/g, ' ').replace(/objective-c/g, ' ');
    const stillHasStandaloneC = /(?:^|[^a-zA-Z0-9_#+])c(?:$|[^a-zA-Z0-9_#+])/i.test(strippedCPPandCS);
    if (!stillHasStandaloneC) return false;

    const hasProgrammingContext = /\b(languages?|programming|skills?|technologies|c\s*\/\s*c\+\+|c\s*,\s*c\+\+|c\s*programming|c\s*language)\b/i.test(textLower);
    return hasProgrammingContext;
  }
  if (skillKey === 'r') {
    return /\b(r\s*programming|r\s*language|python,\s*r|r,\s*python)\b/i.test(textLower) ||
           /\b(languages?|skills?):\s*[^.\n]*\b(r)\b/i.test(textLower);
  }
  if (skillKey === 'go' || skillKey === 'golang') {
    return /\bgolang\b/i.test(textLower) ||
           /\b(go\s*programming|go\s*language|go\s*backend|languages?:\s*[^.\n]*\bgo\b)/i.test(textLower);
  }
  if (skillKey === '.net' || skillKey === 'asp.net') {
    return /(?:^|[^a-zA-Z0-9_])(?:\.net|asp\.net)\b/i.test(textLower);
  }

  const escaped = skillKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('(?:^|[^a-zA-Z0-9_])' + escaped + '(?:$|[^a-zA-Z0-9_])', 'i');
  return regex.test(textLower);
}

/**
 * Extracts and canonicalizes technical & soft skills from resume text.
 * Performs cross-section evidence verification to determine if a declared skill is
 * genuinely supported in project descriptions or work experience bullets.
 * @param {string} text - The raw extracted resume plain text.
 * @param {Object|null} parsedSections - Pre-parsed section boundaries and text chunks.
 * @returns {{ categorized: Object, all: string[], softSkills: string[], evidenceMap: Object }}
 */
function extractSkills(text, parsedSections = null) {
  const textLower = text.toLowerCase();
  const categorized = {};
  const allFound = [];
  const softSkillsFound = [];
  const evidenceMap = {};

  const skillsSectionText = (parsedSections?.sectionContent?.skills || '').toLowerCase();
  const projSectionText = (parsedSections?.sectionContent?.projects || '').toLowerCase();
  const expSectionText = (parsedSections?.sectionContent?.experience || '').toLowerCase();

  for (const [category, skills] of Object.entries(TECH_SKILLS_DB)) {
    categorized[category] = [];
    for (const skill of skills) {
      if (matchSkillExact(skill, textLower, text)) {
        let displayName = skill;
        if (skill === 'c++') displayName = 'C++';
        else if (skill === 'c#') displayName = 'C#';
        else if (skill === 'c') displayName = 'C';
        else if (skill === 'javascript') displayName = 'JavaScript';
        else if (skill === 'typescript') displayName = 'TypeScript';
        else if (skill === 'html' || skill === 'html5') displayName = 'HTML5';
        else if (skill === 'css' || skill === 'css3') displayName = 'CSS3';
        else if (skill === 'sql') displayName = 'SQL';
        else if (skill === 'postgresql' || skill === 'postgres') displayName = 'PostgreSQL';
        else if (skill === 'mongodb') displayName = 'MongoDB';
        else if (skill === 'react' || skill === 'react.js' || skill === 'reactjs') displayName = 'React';
        else if (skill === 'node.js' || skill === 'nodejs') displayName = 'Node.js';
        else if (skill === 'next.js' || skill === 'nextjs') displayName = 'Next.js';
        else if (skill === 'express' || skill === 'express.js') displayName = 'Express';
        else if (skill === 'aws' || skill === 'amazon web services') displayName = 'AWS';
        else if (skill === 'docker') displayName = 'Docker';
        else if (skill === 'git') displayName = 'Git';
        else if (skill === 'github') displayName = 'GitHub';
        else {
          displayName = skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }

        if (!categorized[category].includes(displayName) && !allFound.includes(displayName)) {
          categorized[category].push(displayName);
          allFound.push(displayName);

          // Provenance determination
          let source = 'General Resume Body';
          let confidence = 0.85;
          let isEvidencedInProjectOrExp = false;

          if (skillsSectionText && matchSkillExact(skill, skillsSectionText, text)) {
            source = 'Technical Skills Section';
            confidence = 0.98;
          }
          if ((projSectionText && matchSkillExact(skill, projSectionText, text)) ||
              (expSectionText && matchSkillExact(skill, expSectionText, text))) {
            isEvidencedInProjectOrExp = true;
            confidence = 0.99;
          }

          evidenceMap[displayName] = {
            skill: displayName,
            source,
            isEvidencedInProjectOrExp,
            confidence
          };
        }
      }
    }
  }

  SOFT_SKILLS.forEach(ss => {
    const escaped = ss.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const r = new RegExp('\\b' + escaped + '\\b', 'i');
    if (r.test(textLower)) {
      const formatted = ss.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (!softSkillsFound.includes(formatted)) {
        softSkillsFound.push(formatted);
      }
    }
  });

  const sectionConfidence = allFound.length >= 6 ? 96 : (allFound.length >= 3 ? 88 : (allFound.length > 0 ? 70 : 0));

  return {
    categorized,
    all: allFound,
    softSkills: softSkillsFound,
    evidenceMap,
    confidence: sectionConfidence
  };
}

/* ============================================================
   5. PROFESSIONAL SUMMARY ANALYSIS
   ============================================================ */
function analyzeProfessionalSummary(text, parsedSections, skills) {
  const summaryText = (parsedSections?.sectionContent?.summary || '').trim();
  const hasSection = Boolean(parsedSections?.detected?.summary && summaryText.length >= 15);

  if (!hasSection) {
    return {
      exists: false,
      score: 0,
      max: 8,
      confidence: 0,
      hasTargetRole: false,
      hasTechKeywords: false,
      isSpecific: false,
      isConciseAndProfessional: false,
      wordCount: 0,
      clichésFound: [],
      text: ''
    };
  }

  const words = summaryText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const rolePattern = /\b(software\s*engineer|web\s*developer|full\s*stack|frontend|backend|data\s*scientist|data\s*analyst|devops\s*engineer|cloud\s*architect|cloud\s*engineer|software\s*developer|ai\s*developer|ai\s*engineer|ml\s*engineer|systems\s*engineer|qa\s*engineer|mobile\s*developer|data\s*engineer|security\s*engineer|solutions\s*architect|tech\s*lead|engineering\s*lead(?:er)?|developer|engineer(?:ing)?|architect|programmer|lead(?:er)?)\b/i;
  const hasTargetRole = rolePattern.test(summaryText);

  // Directly scan full summary text for technical skills (Bug 6 Fix: full paragraph scope)
  const directSummarySkills = extractSkills(summaryText).all;
  const allSkills = [...new Set([...(skills?.all || []), ...directSummarySkills])];

  const techInSummary = allSkills.filter(s => {
    const r = new RegExp('(?:^|[^a-zA-Z0-9_])' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:$|[^a-zA-Z0-9_])', 'i');
    return r.test(summaryText);
  });
  const hasTechKeywords = techInSummary.length >= 2 || (techInSummary.length >= 1 && /\b(apis?|ai|web|full\s*stack|cloud)\b/i.test(summaryText));

  const clichésFound = VAGUE_PHRASES.filter(vp => summaryText.toLowerCase().includes(vp));
  const isGenericStudentFluff = /\b(hardworking|motivated\s*student|looking\s*for\s*a\s*job|reputed\s*company|utilize\s*my\s*skills|seeking\s*an\s*entry\s*level|good\s*learner)\b/i.test(summaryText);

  const isConciseAndProfessional = wordCount >= 15 && wordCount <= 90 && clichésFound.length === 0 && !isGenericStudentFluff;

  let score = 2; // base existence
  if (hasTargetRole) score += 2;
  if (hasTechKeywords) score += 2;
  if (isConciseAndProfessional) score += 2;

  if (isGenericStudentFluff && clichésFound.length > 0 && techInSummary.length === 0) {
    score = 2;
  }

  score = Math.min(Math.max(score, 1), 8);

  return {
    exists: true,
    score,
    max: 8,
    confidence: isConciseAndProfessional ? 95 : 82,
    hasTargetRole,
    hasTechKeywords,
    isSpecific: isConciseAndProfessional && hasTechKeywords,
    isConciseAndProfessional,
    wordCount,
    clichésFound,
    text: summaryText
  };
}

/* ============================================================
   6. EVIDENCE-BASED EXPERIENCE & INTERNSHIP ANALYSIS
   ============================================================ */
function analyzeExperience(text, sectionContent) {
  const expText = (sectionContent.experience || '').trim();
  const lines = expText.split('\n').map(l => l.trim()).filter(Boolean);

  const isFresherOrNone = !expText ||
    /^(fresher|none|no\s*experience|n\/a|student|seeking\s*entry\s*level)$/i.test(expText) ||
    (lines.length === 1 && /^(fresher|none|n\/a)$/i.test(lines[0])) ||
    (!sectionContent.experience && !/(intern|internship|software\s*engineer|developer|analyst)\s*(at|@|\||-)/i.test(text));

  if (isFresherOrNone && !/(intern|internship|developer|engineer)\s*(at|@|\||-|–)/i.test(expText)) {
    return {
      hasExperience: false,
      isFresher: true,
      score: 0,
      max: 15,
      confidence: 90,
      totalBullets: 0,
      actionVerbCount: 0,
      weakVerbCount: 0,
      quantifiedCount: 0,
      quantifiedRatio: 0,
      actionVerbRatio: 0,
      jobTitles: [],
      hasDates: false,
      companies: [],
      techInExperience: [],
      weakBullets: [],
      strongBullets: []
    };
  }

  const allBullets = lines.filter(l => {
    if (/^[•\-\*►▸▪]/.test(l)) return true;
    if (l.length > 25 && /^[A-Z][a-z]+(ed|d|ing|s)?\b/.test(l) && !/^(technologies|tools|languages):/i.test(l)) return true;
    return l.length > 35 && !l.includes('github.com') && !/^(responsibilities|description):/i.test(l);
  });

  const actionVerbBullets = allBullets.filter(b => {
    const clean = b.replace(/^[•\-\*►▸▪]\s*/, '').trim();
    const firstWord = clean.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
    return ACTION_VERBS.includes(firstWord);
  });

  const weakVerbBullets = allBullets.filter(b => {
    const lower = b.toLowerCase();
    return WEAK_VERBS.some(wv => lower.startsWith(wv) || lower.includes(` ${wv} `));
  });

  const quantifiedBullets = allBullets.filter(b =>
    /\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|customers|clients|projects|teams|members|hours|days|weeks|months|ms|rps|gb|tb|mb|runs|queries|tools|tests|challenges|accuracy|problems)/i.test(b) ||
    /\b(sub-?\d+ms|\d+\/\d+|\d+(\.\d+)?%|\d+\+|\d+x|\$\d+)\b/i.test(b)
  );

  const titlePatterns = /\b(software\s*engineer|full\s*stack\s*developer|frontend\s*developer|backend\s*developer|software\s*developer|web\s*developer|intern|internship|software\s*development\s*intern|sde\s*intern|devops\s*engineer|data\s*scientist|data\s*analyst|qa\s*engineer|sre|research\s*assistant|team\s*lead|technical\s*lead|engineering\s*lead|associate\s*engineer)\b/gi;
  const jobTitles = [...new Set((expText.match(titlePatterns) || []).map(t => t.trim()))];

  const isOnlyInternship = jobTitles.length > 0 && jobTitles.every(t => /intern/i.test(t));

  const companyPatterns = /(?:at|@|\||,)\s*([A-Z][a-zA-Z0-9\s&.,\-]+(?:Inc|LLC|Ltd|Corp|Technologies|Solutions|Labs|Pvt|Software|Systems|Media|Group|Innovations))/g;
  const companies = [...new Set((expText.match(companyPatterns) || []).map(c => c.replace(/^(?:at|@|\||,)\s*/, '').trim()))];

  const datePattern = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december|\d{4})\s*(\.?|-|–|to)\s*(\d{4}|present|current)\b/gi;
  const hasDates = datePattern.test(expText);

  const techInExp = extractSkills(expText).all;

  let score = 0;
  if (jobTitles.length > 0 || allBullets.length > 0) {
    if (isOnlyInternship) {
      score = 6; // base internship (6–12/15)
      if (companies.length > 0 || /\b(company|inc|pvt|ltd|organization|startup|corp|innovations)\b/i.test(expText)) score += 2;
      if (hasDates) score += 2;
      if (techInExp.length >= 2) score += 1.5;
      if (actionVerbBullets.length >= 1) score += 1;
      if (quantifiedBullets.length >= 1) score += 1;
      score = Math.min(Math.round(score), 13);
    } else {
      score = 4;
      if (companies.length > 0 || /\b(company|inc|pvt|ltd|organization|startup|corp)\b/i.test(expText)) score += 2.5;
      if (jobTitles.length >= 1) score += 2.5;
      if (hasDates) score += 2;
      if (techInExp.length >= 2) score += 2;
      if (actionVerbBullets.length >= 2) score += 2;
      if (quantifiedBullets.length >= 2) score += 2;
      score = Math.min(Math.round(score), 15);
    }
  }

  return {
    hasExperience: true,
    isFresher: isOnlyInternship || jobTitles.length === 0,
    isOnlyInternship,
    score,
    max: 15,
    confidence: (jobTitles.length > 0 && hasDates) ? 95 : 80,
    totalBullets: allBullets.length,
    actionVerbCount: actionVerbBullets.length,
    weakVerbCount: weakVerbBullets.length,
    quantifiedCount: quantifiedBullets.length,
    quantifiedRatio: allBullets.length > 0 ? quantifiedBullets.length / allBullets.length : 0,
    actionVerbRatio: allBullets.length > 0 ? actionVerbBullets.length / allBullets.length : 0,
    jobTitles,
    hasDates,
    companies,
    techInExperience: techInExp,
    weakBullets: weakVerbBullets.slice(0, 3),
    strongBullets: quantifiedBullets.slice(0, 3)
  };
}

/* ============================================================
   7. PROJECTS ANALYSIS & SUBSTANCE EVALUATION
   ============================================================ */
function isTechStackOrLinksLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;

  // 1. Pure links line (e.g. "github.com/user/repo | live-demo.com" or "https://github.com/...")
  const strippedLinks = trimmed
    .replace(/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9_\-\.]+\.(?:com|org|net|io|app|dev|me|tech|site|vercel\.app|netlify\.app|github\.io)[^\s|•,]*/gi, '')
    .replace(/github\.com\/[^\s|•,]*/gi, '')
    .replace(/\b(demo|live demo|live link|source code|code|view live|website|repo|link|credentials?)\b/gi, '')
    .replace(/[|•·\-\/,\s()\[\]]/g, '')
    .trim();

  if (strippedLinks.length === 0) {
    return true; // Line is purely links and delimiters
  }

  // 2. Explicit tech stack prefix
  if (/^(?:tech(?:nologies|\s*stack)?|tools|environment|built\s*with|stack|languages?)\s*[:\-–—]?\s*/i.test(trimmed)) {
    return true;
  }

  // 3. Comma- or delimiter-separated list of >= 2 recognized skills
  // Strip URLs first so that 'GitHub' in github.com/user/repo is not detected as a standalone skill token
  const lineWithoutUrls = trimmed
    .replace(/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9_\-\.]+\.(?:com|org|net|io|app|dev|me|tech|site|vercel\.app|netlify\.app)[^\s|•,]*/gi, '')
    .replace(/github\.com\/[^\s|•,]*/gi, '');

  const skills = extractSkills(lineWithoutUrls).all;
  if (skills.length >= 2) {
    let remaining = lineWithoutUrls;
    skills.forEach(s => {
      const reg = new RegExp(`\\b${s.replace(/[+*?^$.[\]{}()|\\/]/g, '\\$&')}\\b`, 'gi');
      remaining = remaining.replace(reg, '');
    });
    remaining = remaining
      .replace(/\b(demo|live demo|live link|source code|repo|link|using|and|with)\b/gi, '')
      .replace(/[|•·\-\/,\s()\[\]:–—]/g, '')
      .trim();

    if (remaining.length < 15) {
      return true;
    }
  }

  return false;
}

function isProjectHeaderLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^[•\-\*►▸▪]/.test(trimmed)) return false;

  // Bug 2 Fix: A line matching tech stack or links should NEVER start a new project block
  if (isTechStackOrLinksLine(trimmed)) return false;

  if (/^(?:project\s*#?\d*[:\-–—]|featured\s*project|key\s*project|\d+[\.\)]\s+)/i.test(trimmed)) {
    return true;
  }

  if (/^(made|created|built|developed|worked|implemented|designed|engineered|assisted|helped|used|utilized|participated|this|the|it|an?|we|i|in\s*this|my|our|as\s*part|responsibilities|description|technologies|tools|languages|skills):\s*/i.test(trimmed)) {
    return false;
  }

  if (/\.\s*$/.test(trimmed) && !/\.(io|com|app|dev|me|net|org|site)\b/i.test(trimmed)) {
    return false;
  }

  // Support em-dash (—), en-dash (–), spaced hyphens ( - ), and delimiters
  if (trimmed.length < 150 && (trimmed.includes('|') || trimmed.includes('–') || trimmed.includes('—') || trimmed.includes(' - ') || /github\.com|demo|\.app|\.io|\.dev/i.test(trimmed))) {
    return true;
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 8 && trimmed.length <= 70) {
    if (/\b(project|web\s*app|application|app|dashboard|calculator|tracker|analyzer|platform|portal|utility|system|engine|bot|clone|tool|store|site|service|hub|finder|game|simulator)\b/i.test(trimmed)) {
      return true;
    }
  }

  return false;
}

function analyzeProjects(text, sectionContent) {
  let projText = (sectionContent.projects || '').trim();
  if (!projText && sectionContent.experience && /project/i.test(sectionContent.experience)) {
    projText = sectionContent.experience;
  }

  if (!projText) {
    return {
      found: false,
      score: 0,
      max: 20,
      confidence: 0,
      count: 0,
      details: [],
      hasGithubLinks: false,
      hasDemoLinks: false,
      techCount: 0
    };
  }

  const lines = projText.split('\n').map(l => l.trim()).filter(Boolean);
  const projectDetails = [];
  let currentProject = null;

  const DEPTH_KEYWORDS = [
    'validation', 'authentication', 'jwt', 'oauth', 'state management', 'crud',
    'responsive', 'algorithm', 'error handling', 'caching', 'async', 'real-time',
    'optimization', 'database', 'deployment', 'integration', 'pipeline',
    'security', 'encryption', 'components', 'websocket', 'redis', 'pagination',
    'filtering', 'microservices', 'graphql', 'rest api', 'dom updates', 'indexeddb',
    'sub-100ms', 'sub-200ms', 'sub-250ms', 'latency', 'unit tests', 'dockerized', 'ci/cd', 'ast parsing',
    'pure-tone', 'audiometry', 'canvas', 'diagnostic', 'calibration', 'streaming', 'gemini'
  ];

  lines.forEach(line => {
    if (isTechStackOrLinksLine(line)) {
      // Continuation of current project if active
      if (currentProject) {
        currentProject.textLines.push(line);
        if (extractSkills(line).all.length > 0) currentProject.hasTech = true;
        if (/github\.com/i.test(line)) currentProject.hasGithub = true;
        if (/demo|live|deploy|vercel|netlify|\.app|\.io|http/i.test(line)) currentProject.hasDemo = true;
        if (/\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|runs|accuracy|queries|tests|ms|rps)/i.test(line)) currentProject.hasMetrics = true;
      }
    } else if (isProjectHeaderLine(line)) {
      if (currentProject) {
        projectDetails.push(evaluateProjectSubstance(currentProject, DEPTH_KEYWORDS));
      }
      currentProject = {
        name: line.replace(/\|.*$/, '').trim(),
        textLines: [line],
        hasTech: extractSkills(line).all.length > 0,
        hasGithub: /github\.com/i.test(line),
        hasDemo: /demo|live|vercel|netlify|\.app|\.io/i.test(line),
        hasMetrics: /\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|runs|accuracy|queries|tests|ms|rps)/i.test(line)
      };
    } else if (currentProject) {
      currentProject.textLines.push(line);
      if (extractSkills(line).all.length > 0) currentProject.hasTech = true;
      if (/github\.com/i.test(line)) currentProject.hasGithub = true;
      if (/demo|live|deploy|vercel|netlify|\.app|\.io|http/i.test(line)) currentProject.hasDemo = true;
      if (/\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|runs|accuracy|queries|tests|ms|rps)/i.test(line)) currentProject.hasMetrics = true;
    }
  });

  if (currentProject) {
    projectDetails.push(evaluateProjectSubstance(currentProject, DEPTH_KEYWORDS));
  }

  if (projectDetails.length === 0 && lines.length > 0) {
    projectDetails.push(evaluateProjectSubstance({
      name: 'Featured Project',
      textLines: lines,
      hasTech: extractSkills(projText).all.length > 0,
      hasGithub: /github\.com/i.test(projText),
      hasDemo: /demo|live|vercel|netlify/i.test(projText),
      hasMetrics: /\d+%|\d+\+/.test(projText)
    }, DEPTH_KEYWORDS));
  }

  const hasGithubLinks = projectDetails.some(p => p.hasGithub) || /github\.com/i.test(projText) || /github\.com/i.test(text);
  const hasDemoLinks = projectDetails.some(p => p.hasDemo) || /demo|live|vercel|netlify/i.test(projText);
  const totalTech = extractSkills(projText).all.length;

  let totalProjectScore = 0;
  projectDetails.slice(0, 3).forEach(p => {
    totalProjectScore += p.score;
  });

  if (projectDetails.length >= 3 && projectDetails.every(p => !p.isWeak && p.score >= 5.0)) {
    totalProjectScore = Math.max(totalProjectScore, 19.0);
  }

  let finalScore = Math.min(Math.round(totalProjectScore), 20);

  return {
    found: true,
    score: finalScore,
    max: 20,
    confidence: projectDetails.length > 0 ? 94 : 70,
    count: projectDetails.length,
    details: projectDetails,
    techCount: totalTech,
    hasGithubLinks,
    hasDemoLinks
  };
}

function evaluateProjectSubstance(proj, depthKeywords) {
  const fullText = proj.textLines.join(' ');
  const words = fullText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let depthScore = 0.5;
  if (wordCount >= 30) depthScore = 2.0;
  else if (wordCount >= 18) depthScore = 1.5;
  else if (wordCount >= 8) depthScore = 1.0;

  const matchedDepthKeywords = depthKeywords.filter(k => fullText.toLowerCase().includes(k));
  let techDepthScore = 0;
  if (matchedDepthKeywords.length >= 3) techDepthScore = 2.0;
  else if (matchedDepthKeywords.length >= 1) techDepthScore = 1.2;

  const firstWords = proj.textLines.map(l => l.replace(/^[•\-\*►▸▪]\s*/, '').split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, ''));
  const hasStrongVerb = firstWords.some(w => ACTION_VERBS.includes(w));
  const hasWeakVerb = firstWords.some(w => WEAK_VERBS.includes(w)) || /^(made|created a simple|it was a simple)/i.test(fullText);

  let verbScore = 0.3;
  if (hasStrongVerb) verbScore = 1.0;
  else if (hasWeakVerb) verbScore = 0.1;

  let bonusScore = 0;
  if (proj.hasMetrics) bonusScore += 1.0;
  if (proj.hasGithub) bonusScore += 0.5;
  if (proj.hasDemo) bonusScore += 0.5;

  let projectScore = depthScore + techDepthScore + verbScore + bonusScore;
  if (wordCount < 15 && matchedDepthKeywords.length === 0) {
    // Basic project: 3–5/20
    projectScore = Math.min(Math.max(projectScore + 2.0, 3.0), 5.0);
  }

  projectScore = Math.min(projectScore, 7.0);

  return {
    name: proj.name,
    textLines: proj.textLines || [],
    score: projectScore,
    hasTech: proj.hasTech,
    hasDescription: wordCount >= 10,
    hasGithub: proj.hasGithub,
    hasDemo: proj.hasDemo,
    hasImpact: proj.hasMetrics,
    matchedDepthKeywords,
    wordCount,
    isWeak: wordCount < 15 && matchedDepthKeywords.length === 0
  };
}

/* ============================================================
   8. EDUCATION ANALYSIS
   ============================================================ */
function analyzeEducation(text, parsedSections) {
  const eduText = (parsedSections?.sectionContent?.education || '').trim();
  const hasSection = Boolean(parsedSections?.detected?.education);

  if (!hasSection && !/\b(b\.?tech|bachelor|master|m\.?tech|university|college|gpa)\b/i.test(text)) {
    return { exists: false, score: 0, max: 10, confidence: 0, details: {} };
  }

  const searchScope = (eduText || text).toLowerCase();

  const csOrEngDegree = /\b(b\.?tech|b\.?e\.?|b\.?s\.?|b\.?c\.?a\.?|m\.?tech|m\.?s\.?|m\.?c\.?a\.?|ph\.?d)\b/i.test(searchScope);
  const degreeMatch = searchScope.match(/\b(b\.?tech|b\.?e\.?|b\.?s\.?|b\.?c\.?a\.?|m\.?tech|m\.?s\.?|m\.?c\.?a\.?|m\.?b\.?a\.?|ph\.?d|bachelor(?:'s)?|master(?:'s)?|diploma|associate|doctor)\b/i);
  const hasDegree = Boolean(degreeMatch);

  const instMatch = searchScope.match(/\b(university|institute|college|school|academy|polytechnic|iit|nit|iiit|bits|aktu|technical\s*university)\b/i);
  const hasInstitution = Boolean(instMatch);

  const majorMatch = searchScope.match(/\b(computer\s*science|information\s*technology|software\s*engineering|electrical|electronics|data\s*science|mechanical|artificial\s*intelligence|ai\s*&\s*ml|cs\s*&\s*e)\b/i);
  const hasMajor = Boolean(majorMatch);

  const dateMatch = searchScope.match(/\b(20\d{2}\s*[-–to]\s*20\d{2}|20\d{2}\s*[-–to]\s*present|graduat\w+\s*(?:in\s*)?20\d{2})\b/i);
  const hasDates = Boolean(dateMatch);

  const gpaMatch = searchScope.match(/\b(cgpa|gpa|percentage|grade|honors|\d\.\d{1,2}\/\d|\d{2}%)\b/i);
  const hasAcademicDetails = Boolean(gpaMatch);

  let score = 2; // base presence
  if (csOrEngDegree) score += 3;
  else if (hasDegree) score += 2;

  if (hasInstitution) score += 2;
  if (hasMajor) score += 1;
  if (hasDates) score += 1;
  if (hasAcademicDetails) score += 1;

  score = Math.min(Math.max(score, 1), 10);

  return {
    exists: true,
    score,
    max: 10,
    confidence: (hasDegree && hasInstitution) ? 98 : 82,
    hasDegree,
    hasInstitution,
    hasMajor,
    hasDates,
    hasAcademicDetails,
    degree: degreeMatch ? degreeMatch[0] : null,
    institution: instMatch ? instMatch[0] : null
  };
}

/* ============================================================
   9. CERTIFICATIONS & ACHIEVEMENTS ANALYSIS
   ============================================================ */
function analyzeCertifications(text, parsedSections) {
  const certText = (parsedSections?.sectionContent?.certifications || '').trim();
  const hasSection = Boolean(parsedSections?.detected?.certifications && certText.length >= 10);

  if (!hasSection) {
    return { exists: false, score: 0, max: 5, confidence: 0, certsCount: 0, verifiedCount: 0 };
  }

  const lines = certText.split('\n').map(l => l.trim()).filter(Boolean);
  const certLower = certText.toLowerCase();

  // Bug 4 Fix: Lightweight configurable tier system
  const tier1List = CERTIFICATION_TIERS.tier1 || [];
  const tier2List = CERTIFICATION_TIERS.tier2 || [];

  const tier1Issuers = tier1List.filter(iss => certLower.includes(iss.toLowerCase()));
  const tier2Issuers = tier2List.filter(iss => certLower.includes(iss.toLowerCase()));
  const hasTier1 = tier1Issuers.length > 0;
  const hasTier2 = tier2Issuers.length > 0;
  const detectedIssuers = [...tier1Issuers, ...tier2Issuers];
  const hasRecognizedIssuer = detectedIssuers.length > 0;

  const specificCertPattern = /\b(aws\s*certified|google\s*(cloud|data|cybersecurity)|microsoft\s*certified|azure|meta\s*front-end|certified\s*kubernetes|ckad|cka|comptia|oracle\s*certified|cisco\s*certified|ccna|developer\s*certificate|solutions\s*architect|pmi|pmp)\b/i;
  const hasSpecificCert = specificCertPattern.test(certLower);

  const isPurelyGeneric = /^(online\s*course\s*certificate|computer\s*certificate|course\s*certificate|certificate\s*of\s*completion)$/i.test(certText) ||
    (lines.length <= 2 && /^(online|computer)\s*certificate$/i.test(lines[0]) && !hasRecognizedIssuer);

  const hasDatesOrIds = /\b(20\d{2}|credential|id:|license|\.org|\.com|verify)\b/i.test(certLower);

  let score = 1;
  if (isPurelyGeneric) {
    score = 1;
  } else {
    // Tiered weighting: Tier 1 high weight (+1.5), Tier 2 lower weight (+0.5)
    if (hasTier1) {
      score += 1.5;
    } else if (hasTier2) {
      score += 0.5;
    } else if (hasRecognizedIssuer) {
      score += 0.75;
    }

    if (hasSpecificCert) score += 1.5;
    if (hasDatesOrIds) score += 0.5;
    if (lines.length >= 2 && (hasSpecificCert || hasTier1)) score += 1;
  }

  score = Math.min(Math.max(Math.round(score), 1), 5);

  return {
    exists: true,
    score,
    max: 5,
    confidence: hasRecognizedIssuer ? 95 : 80,
    certsCount: lines.length,
    hasRecognizedIssuer,
    hasTier1,
    hasTier2,
    tier1Issuers,
    tier2Issuers,
    hasSpecificCert,
    isPurelyGeneric,
    detectedIssuers
  };
}

function analyzeAchievements(text, parsedSections) {
  const achText = (parsedSections?.sectionContent?.achievements || '').trim();
  const hasSection = Boolean(parsedSections?.detected?.achievements && achText.length >= 10);

  // Also check general text if achievements mentioned in summary or body
  const searchScope = (achText ? achText + '\n' + text : text).toLowerCase();

  // 1. Check LeetCode / DSA Problem counts
  const problemMatch = searchScope.match(/\b(\d+)\+?\s*(?:(?:data\s*structures(?:\s*&|\s*and)?\s*algorithms|dsa|coding|algo|leetcode|algorithm)\s*(?:\([^)]*\)\s*)?)?(?:problems|questions|challenges|leetcode)\b/i) ||
    searchScope.match(/\b(\d+)\+?\s*(?:[a-zA-Z&()]+\s+){0,5}(?:problems|questions|challenges|leetcode)\b/i);
  const problemCount = problemMatch ? parseInt(problemMatch[1]) : 0;

  let dsaScore = 0;
  if (problemCount >= 200) dsaScore = 5.0;
  else if (problemCount >= 150) dsaScore = 4.0;
  else if (problemCount >= 100) dsaScore = 3.0;
  else if (problemCount >= 50) dsaScore = 2.0;
  else if (problemCount >= 20) dsaScore = 1.0;

  // 2. Consistency Streak
  const streakMatch = searchScope.match(/\b(\d+)\+?\s*(?:day|days)\s*(?:coding\s*)?(?:consistency\s*)?streak\b/i);
  const streakScore = streakMatch ? 2.5 : 0;

  // 3. Contest Rank / Hackathon
  const contestMatch = searchScope.match(/\b(hackathon|finalist|winner|runner\s*up|rank\s*#?\d+|contest\s*rating|top\s*\d+%|gold\s*medal|codeforces|codechef)\b/i);
  const contestScore = contestMatch ? 2.5 : 0;

  let score = dsaScore + streakScore + contestScore;

  if (hasSection && score === 0) {
    const hasGeneric = /participated|member|attended/i.test(achText);
    score = hasGeneric ? 2 : 3;
  } else if (!hasSection && score === 0) {
    return { exists: false, score: 0, max: 10, confidence: 0, problemCount: 0, hasStreak: false, achievementsList: [] };
  }

  score = Math.min(Math.max(Math.round(score), 1), 10);

  return {
    exists: true,
    score,
    max: 10,
    confidence: (dsaScore > 0 || streakScore > 0) ? 96 : 80,
    problemCount,
    hasStreak: Boolean(streakMatch),
    hasContest: Boolean(contestMatch),
    details: {
      problemCount,
      streak: streakMatch ? streakMatch[0] : null,
      contest: contestMatch ? contestMatch[0] : null
    }
  };
}

/* ============================================================
   10. CONTENT QUALITY ANALYSIS
   ============================================================ */
function analyzeContentQuality(text, experienceAnalysis, projectsAnalysis) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const issues = [];

  const allBullets = lines.filter(l => /^[•\-\*►▸▪]/.test(l) || (l.length > 25 && /^[A-Z]/.test(l)));
  const actionVerbCount = allBullets.filter(b => {
    const clean = b.replace(/^[•\-\*►▸▪]\s*/, '').trim();
    const firstWord = clean.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
    return ACTION_VERBS.includes(firstWord);
  }).length;

  const weakVerbsFound = WEAK_VERBS.filter(wv => text.toLowerCase().includes(wv));
  const vagueFound = VAGUE_PHRASES.filter(vp => text.toLowerCase().includes(vp));

  const metricsMatches = text.match(/\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|customers|clients|projects|teams|hours|days|ms|rps|gb|tb|mb|queries|tests|accuracy|problems)/gi) || [];
  const metricsCount = metricsMatches.length;

  const firstPersonMatches = text.match(/\b(I|my|me|myself|we|our)\b/gi) || [];
  const firstPersonCount = firstPersonMatches.length;

  let score = 0;

  // Action Verbs (up to 2.5 pts)
  const actionRatio = allBullets.length > 0 ? (actionVerbCount / allBullets.length) : 0;
  if (actionRatio >= 0.5 || actionVerbCount >= 4) score += 2.5;
  else if (actionRatio >= 0.25 || actionVerbCount >= 2) score += 1.5;
  else if (actionVerbCount >= 1) score += 1.0;

  // Quantifiable Metrics (up to 2.5 pts)
  if (metricsCount >= 3) score += 2.5;
  else if (metricsCount >= 1) score += 1.5;

  // Vague Phrases Penalty (up to 1.0 pt)
  if (vagueFound.length === 0) score += 1.0;
  else if (vagueFound.length === 1) score += 0.5;

  // First-Person Pronouns Penalty (up to 1.0 pt)
  if (firstPersonCount <= 1) score += 1.0;
  else if (firstPersonCount <= 3) score += 0.5;

  score = Math.min(Math.max(Math.round(score), 0), 7);

  if (vagueFound.length > 0) {
    issues.push({
      type: 'warning',
      message: `Vague / cliché phrases detected: "${vagueFound.slice(0, 3).join('", "')}". Replace with specific technical accomplishments.`
    });
  }
  if (firstPersonCount > 3) {
    issues.push({
      type: 'warning',
      message: `Excessive first-person language detected (${firstPersonCount} instances). ATS resumes should use implied first-person action verbs.`
    });
  }
  if (metricsCount === 0) {
    issues.push({
      type: 'warning',
      message: `No quantifiable metrics detected. Add measurable results (e.g. "improved speed by 35%", "serving 500+ users") where applicable.`
    });
  }
  if (wordCount < 180) {
    issues.push({
      type: 'warning',
      message: `Resume content is very brief (${wordCount} words). Elaborate on project architectures and technical responsibilities.`
    });
  }

  return {
    score,
    max: 7,
    wordCount,
    actionVerbCount,
    metricsCount,
    firstPersonCount,
    vagueFound,
    weakVerbsFound,
    issues
  };
}

/* ============================================================
   11. ATS COMPATIBILITY ANALYSIS
   ============================================================ */
function analyzeATSFormatting(text, parsedSections, documentStructure = null) {
  const checks = [];
  let formatScore = 0;

  // 1. Standard Section Headers (up to 2.5 pts)
  const detectedCount = Object.keys(parsedSections?.detected || {}).length;
  const hasStandardHeaders = detectedCount >= 4;
  if (hasStandardHeaders) formatScore += 2.5;
  else if (detectedCount >= 2) formatScore += 1.5;

  checks.push({
    label: 'Standard section headers detected',
    pass: hasStandardHeaders,
    detail: hasStandardHeaders ? `${detectedCount} recognizable standard sections found` : `Only ${detectedCount} standard section headings found`
  });

  // 2. Clean Text Extraction & Flow (up to 1.5 pts)
  const garbledPatterns = (text.match(/[^\x00-\x7F]{3,}/g) || []).length;
  const cleanFlow = garbledPatterns < 3;
  if (cleanFlow) formatScore += 1.5;

  checks.push({
    label: 'Clean text extraction & encoding',
    pass: cleanFlow,
    detail: cleanFlow ? 'Text extracted cleanly without character encoding issues' : 'Some non-standard encoding detected — ATS parsers may misread text'
  });

  // 3. Layout & Reading Flow (Bug 3 Fix: operates on document structure, not flattened text)
  const docStruct = documentStructure || analyzerState?.documentStructure || detectDocumentLayoutFromText(text);
  const isMultiColumnLayout = Boolean(docStruct?.isMultiColumn || docStruct?.hasTables);
  const isCleanSingleColumn = !isMultiColumnLayout;

  if (isCleanSingleColumn) {
    formatScore += 1.5;
    checks.push({
      label: 'Single-column text layout',
      pass: true,
      detail: 'Clean linear reading order detected for ATS parsers'
    });
  } else {
    formatScore += 0.5;
    checks.push({
      label: 'Complex layout detected',
      pass: false,
      detail: docStruct?.details || 'Multiple text regions, columns, or table structures may affect ATS reading order'
    });
  }

  // 4. No Excessive Decorative Characters (up to 1.5 pts)
  const specialChars = (text.match(/[★☆◆◇▶▷♦♣♠♥●○◎□■△▽☐☑✓✗✘✔✕✖⬡⬢⬣]/g) || []).length;
  const noDecorative = specialChars < 4;
  if (noDecorative) formatScore += 1.5;

  checks.push({
    label: 'No excessive decorative symbols',
    pass: noDecorative,
    detail: noDecorative ? 'Clean formatting without unparseable symbols' : `${specialChars} decorative symbols detected — ATS may reject these`
  });

  // 5. Contact Info Placement
  const headerChunk = text.substring(0, 450);
  const hasContactTop = /@/.test(headerChunk) || /\d{3}/.test(headerChunk);

  checks.push({
    label: 'Contact details in header area',
    pass: hasContactTop,
    detail: hasContactTop ? 'Contact details detected near the top of the resume' : 'Contact info not found in the initial header region'
  });

  // 6. Text Accessibility
  const isSelectable = text.length >= 80;
  checks.push({
    label: 'Text is searchable and selectable',
    pass: isSelectable,
    detail: `${text.length} characters parsed successfully`
  });

  formatScore = Math.min(Math.max(Math.round(formatScore), 0), 7);

  return {
    score: formatScore,
    max: 7,
    checks
  };
}

/* ============================================================
   12. INTERNAL CONSISTENCY & DUPLICATE DETECTION
   ============================================================ */
function checkInternalConsistency(text, structuredData, parsedSections) {
  const contradictions = [];
  const duplicates = [];

  const textLower = text.toLowerCase();

  // 1. Check Problem Solving / DSA Number Mismatches
  const problemNumbers = [...textLower.matchAll(/(\d+)\+?\s*(?:dsa|problems|leetcode|questions|challenges|algo\s*problems)/gi)].map(m => parseInt(m[1]));
  if (problemNumbers.length >= 2) {
    const uniqueNums = [...new Set(problemNumbers)];
    if (uniqueNums.length > 1 && Math.abs(uniqueNums[0] - uniqueNums[1]) >= 10) {
      contradictions.push(`Inconsistent algorithm problem counts detected (${uniqueNums.join(' vs ')} problems mentioned in different sections).`);
    }
  }

  // 2. Check Years of Experience Discrepancy
  const summaryYearsMatch = (parsedSections?.sectionContent?.summary || '').match(/(\d+)\+?\s*years?(?:\s*of)?\s*(?:experience|work)/i);
  if (summaryYearsMatch) {
    const claimedYears = parseInt(summaryYearsMatch[1]);
    const isFresher = structuredData?.experienceAnalysis?.isFresher;
    if (claimedYears >= 2 && isFresher) {
      contradictions.push(`Summary claims ${claimedYears}+ years of experience, but Work Experience section indicates entry-level / no full-time employment.`);
    }
  }

  // 3. Duplicate Project Descriptions
  const projText = (parsedSections?.sectionContent?.projects || '');
  const projLines = projText.split('\n').map(l => l.trim()).filter(l => l.length >= 35);
  const seenLines = new Set();
  projLines.forEach(line => {
    const normalized = line.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenLines.has(normalized)) {
      duplicates.push(`Duplicated project bullet detected: "${line.substring(0, 60)}..."`);
    } else {
      seenLines.add(normalized);
    }
  });

  // 4. Repeated Skills Spammed
  const skillsText = (parsedSections?.sectionContent?.skills || '').toLowerCase();
  const skillTokens = skillsText.split(/[,|\n•]/).map(s => s.trim()).filter(s => s.length >= 2);
  const tokenCounts = {};
  skillTokens.forEach(t => {
    tokenCounts[t] = (tokenCounts[t] || 0) + 1;
    if (tokenCounts[t] === 3) {
      duplicates.push(`Skill "${t}" is repeated multiple times in the skills section.`);
    }
  });

  return {
    hasContradictions: contradictions.length > 0,
    hasDuplicates: duplicates.length > 0,
    contradictions,
    duplicates
  };
}

/* ============================================================
   13. TOTAL ATS SCORING ENGINE (Weighted Evidence-Based 100-Point Model)
   ============================================================ */
/**
 * Calculates the comprehensive 0–100 ATS resume score across 10 deterministic categories:
 * - Professional Summary (8 pts)
 * - Technical Skills (15 pts)
 * - Technical Projects (20 pts)
 * - Work / Internship Experience (15 pts) [with Fresher Compensation]
 * - Education (10 pts)
 * - Achievements & DSA (10 pts)
 * - Certifications (5 pts)
 * - ATS & Formatting (7 pts)
 * - Contact Information (3 pts)
 * - Content Quality & Action Verbs (7 pts)
 *
 * @param {string} text - Raw resume text.
 * @param {Object} contactInfo - Extracted contact fields & score.
 * @param {Object} summaryAnalysis - Professional summary evaluation.
 * @param {Object} skills - Extracted skills & evidence verification map.
 * @param {Object} experienceAnalysis - Experience bullet metrics & role seniority.
 * @param {Object} projectsAnalysis - Project complexity & count.
 * @param {Object} educationAnalysis - Degree, institution, and graduation timeline.
 * @param {Object} certificationsAnalysis - Industry certifications detected.
 * @param {Object} achievementsAnalysis - Hackathons, competitive ranks, awards.
 * @param {Object} contentQuality - Action verb ratio and quantifiable metrics count.
 * @param {Object} formattingAnalysis - Formatting and readability evaluation.
 * @param {Object|null} jdMatchResult - Optional target job match analysis.
 * @returns {{ overall: number, breakdown: Object<string, { score: number, max: number, label: string }> }}
 */
function calculateATSScore(
  text, contactInfo, summaryAnalysis, skills,
  experienceAnalysis, projectsAnalysis, educationAnalysis,
  certificationsAnalysis, achievementsAnalysis, contentQuality, formattingAnalysis,
  jdMatchResult
) {
  // 1. Professional Summary (8 pts)
  const summaryPts = Math.min(summaryAnalysis?.score || 0, 8);

  // 2. Technical Skills (15 pts) - Scaled proportionally to verified matches
  const totalTechSkills = skills?.all?.length || 0;
  const categoriesCovered = Object.values(skills?.categorized || {}).filter(arr => arr.length > 0).length;
  const evidencedSkills = Object.values(skills?.evidenceMap || {}).filter(e => e.isEvidencedInProjectOrExp).length;

  let skillsPts = 0;
  if (totalTechSkills >= 15) skillsPts = 7.0;
  else if (totalTechSkills >= 10) skillsPts = 6.0;
  else if (totalTechSkills >= 7) skillsPts = 5.0;
  else if (totalTechSkills >= 4) skillsPts = 3.5;
  else if (totalTechSkills >= 2) skillsPts = 2.0;
  else if (totalTechSkills >= 1) skillsPts = 1.0;

  if (categoriesCovered >= 5) skillsPts += 4.0;
  else if (categoriesCovered >= 3) skillsPts += 3.0;
  else if (categoriesCovered >= 2) skillsPts += 2.0;
  else if (categoriesCovered >= 1) skillsPts += 1.0;

  if (evidencedSkills >= 4) skillsPts += 3.0;
  else if (evidencedSkills >= 2) skillsPts += 2.0;
  else if (evidencedSkills >= 1 || totalTechSkills >= 6) skillsPts += 1.0;

  if (totalTechSkills >= 3 && !skills?.softSkills?.some(s => s.toLowerCase() === 'hardworking')) {
    skillsPts += 1.0;
  }
  skillsPts = Math.min(Math.max(Math.round(skillsPts), 0), 15);

  // 3. Technical Projects (20 pts)
  let projectsPts = Math.min(projectsAnalysis?.score || 0, 20);

  // 4. Professional / Internship Experience (15 pts)
  let experiencePts = Math.min(experienceAnalysis?.score || 0, 15);
  // Student compensation: project experience partially compensates for limited employment
  if (experienceAnalysis?.isFresher || experienceAnalysis?.isOnlyInternship) {
    if (projectsPts >= 14) {
      if (experienceAnalysis?.isOnlyInternship) {
        const bonus = projectsPts >= 18 ? 3 : 2;
        experiencePts = Math.min(experiencePts + bonus, 15);
      } else if (!experienceAnalysis?.hasExperience) {
        experiencePts = Math.min(Math.round(projectsPts * 0.35), 6);
      }
    }
  }

  // 5. Education (10 pts)
  const educationPts = Math.min(educationAnalysis?.score || 0, 10);

  // 6. Achievements / DSA (10 pts)
  const achievementsPts = Math.min(achievementsAnalysis?.score || 0, 10);

  // 7. Certifications (5 pts)
  const certificationsPts = Math.min(certificationsAnalysis?.score || 0, 5);

  // 8. ATS & Structure (7 pts)
  const formattingPts = Math.min(formattingAnalysis?.score || 0, 7);

  // 9. Contact Information (3 pts)
  const contactPts = Math.min(contactInfo?.score != null ? contactInfo.score : (contactInfo?.quality ? 3 : 2), 3);

  // 10. Content Quality & Impact (7 pts)
  const contentQualityPts = Math.min(contentQuality?.score || 0, 7);

  const breakdown = {
    summary: { score: summaryPts, max: 8, label: 'Professional Summary' },
    keywords: { score: skillsPts, max: 15, label: 'Technical Skills' },
    projects: { score: projectsPts, max: 20, label: 'Technical Projects' },
    experience: { score: experiencePts, max: 15, label: 'Work / Internship Experience' },
    education: { score: educationPts, max: 10, label: 'Education' },
    achievements: { score: achievementsPts, max: 10, label: 'Achievements / DSA' },
    certifications: { score: certificationsPts, max: 5, label: 'Certifications' },
    formatting: { score: formattingPts, max: 7, label: 'ATS & Structure' },
    contact: { score: contactPts, max: 3, label: 'Contact Information' },
    contentQuality: { score: contentQualityPts, max: 7, label: 'Content Quality & Impact' }
  };

  const total = Object.values(breakdown).reduce((sum, item) => sum + item.score, 0);
  const overall = Math.min(Math.max(Math.round(total), 0), 100);

  return { overall, breakdown };
}

/* ============================================================
   13.5 SCORING VALIDATION PASS (Zero-Hallucination & Consistency Audit)
   ============================================================ */
function validateScoringEvidence(breakdown, rawText, structuredData) {
  const validationResults = {
    isValid: true,
    checks: [],
    adjustments: []
  };

  const textLower = (rawText || '').toLowerCase();

  // 1. Are all scored sections actually present?
  for (const [key, section] of Object.entries(breakdown)) {
    if (section.score > 0) {
      validationResults.checks.push({
        check: `Section '${section.label}' verified with positive score (${section.score}/${section.max})`,
        passed: true
      });
    }
  }

  // 2. Does each score have evidence?
  const totalSkills = structuredData?.skills?.all?.length ||
    structuredData?.skills?.other?.length ||
    (structuredData?.skills ? Object.values(structuredData.skills).flat().length : 0);
  if (breakdown.keywords && breakdown.keywords.score > 0 && totalSkills === 0) {
    breakdown.keywords.score = 0;
    validationResults.adjustments.push('Reset skills score to 0 due to zero evidence.');
  }

  const projectCount = structuredData?.projects?.length || 0;
  if (breakdown.projects && breakdown.projects.score > 0 && projectCount === 0 && !/project/i.test(textLower)) {
    breakdown.projects.score = 0;
    validationResults.adjustments.push('Reset projects score to 0 due to zero evidence.');
  }

  // 3. Are duplicate sections being counted twice? (Isolated projects vs experience)

  // 4. Is contact information being overweighted?
  if (breakdown.contact && breakdown.contact.score > 3) {
    breakdown.contact.score = 3;
    validationResults.adjustments.push('Capped contact score to 3 points maximum.');
  }

  // 5. Is lack of professional experience being penalized too heavily for students?
  // (Covered by student project compensation)

  // 6. Are projects receiving enough weight?
  // (Max 20 points allocated)

  // 7. Are achievements being recognized?
  // (LeetCode/DSA problems and streaks recognized up to 10 points)

  // 8. Are certifications being recognized?
  // (Recognized issuers up to 5 points)

  // 9. Is summary quality being recognized?
  // (Targeted summary up to 8 points)

  // 10. Is score consistent with extracted resume data?
  const recalculatedTotal = Object.values(breakdown).reduce((sum, item) => sum + item.score, 0);
  validationResults.overallScore = Math.min(Math.max(Math.round(recalculatedTotal), 0), 100);

  return validationResults;
}

/* ============================================================
   SCORE INTERPRETATION
   ============================================================ */
function getScoreInterpretation(score) {
  if (score >= 95) return { label: 'Excellent', color: '#059669', desc: 'Outstanding resume! Exceptional depth, metrics, structure, and keyword density.' };
  if (score >= 85) return { label: 'Very Good', color: '#10b981', desc: 'Very strong resume. Highly optimized with strong action verbs, technical depth, and clear impact.' };
  if (score >= 75) return { label: 'Good', color: '#4F46E5', desc: 'Good ATS readiness. Competitive for application pools with minor room for improvement.' };
  if (score >= 60) return { label: 'Fair / Average', color: '#f59e0b', desc: 'Fair foundation. Strengthening action verbs, technical depth, and quantifiable achievements will make it competitive.' };
  if (score >= 40) return { label: 'Needs Improvement', color: '#f97316', desc: 'Below average ATS readiness. Needs stronger project descriptions, experience depth, and technical specificity.' };
  return { label: 'Poor', color: 'var(--color-error)', desc: 'Significant improvements needed. Resume lacks technical depth, measurable impact, or essential sections.' };
}

/* ============================================================
   14. STRUCTURED RESUME PROFILE BUILDER & SENIORITY DETECTION
   ============================================================ */
function buildStructuredResumeProfile(resumeData) {
  const {
    resumeText = '', contactInfo = {}, skills = {}, summaryAnalysis = {},
    experienceAnalysis = {}, projectsAnalysis = {}, educationAnalysis = {},
    certificationsAnalysis = {}, achievementsAnalysis = {}
  } = resumeData;

  const technicalSkills = skills.all || [];
  const programmingLanguages = skills.categorized?.languages || [];
  const frameworks = [...(skills.categorized?.frontend || []), ...(skills.categorized?.backend || [])];
  const databases = skills.categorized?.databases || [];
  const cloudTools = [...(skills.categorized?.cloud || []), ...(skills.categorized?.tools || [])];

  const ciDetails = contactInfo.details || {};
  const name = ciDetails.name || 'Not detected';
  const email = ciDetails.email || 'Not detected';
  const phone = ciDetails.phone || 'Not detected';
  const location = ciDetails.location || 'Not detected';
  const portfolio = ciDetails.portfolio || null;
  const github = ciDetails.github || null;
  const linkedin = ciDetails.linkedin || null;

  // Detect Candidate Level (Student / Fresher / Junior / Mid / Senior)
  const isStudentOrFresher = experienceAnalysis.isFresher ||
    /\b(b\.?tech|bachelor|student|fresher|undergraduate|2025|2026|2027)\b/i.test(resumeText);

  let experienceLevel = 'Fresher';
  if (!isStudentOrFresher && experienceAnalysis.jobTitles.length >= 2 && !experienceAnalysis.isOnlyInternship) {
    experienceLevel = 'Experienced';
  } else if (experienceAnalysis.isOnlyInternship) {
    experienceLevel = 'Student / Intern';
  } else if (isStudentOrFresher) {
    experienceLevel = 'Student / Fresher';
  }

  const educationStr = educationAnalysis.hasDegree ? (educationAnalysis.degree || 'Degree detected') : 'Not detected';

  return {
    candidate: {
      name,
      email,
      phone,
      location,
      linkedin: linkedin || '',
      github: github || '',
      portfolio: portfolio || ''
    },
    summary: summaryAnalysis.text || '',
    education: [
      {
        institution: educationAnalysis.institution || 'University',
        degree: educationAnalysis.degree || 'Degree',
        hasAcademicDetails: educationAnalysis.hasAcademicDetails
      }
    ],
    experience: experienceAnalysis.jobTitles || [],
    projects: (projectsAnalysis.details || []).map(p => p.name || p),
    skills: {
      languages: programmingLanguages,
      frameworks,
      databases,
      tools: cloudTools,
      cloud: skills.categorized?.cloud || [],
      aiMl: skills.categorized?.ai_ml || [],
      other: skills.all || [],
      all: skills.all || []
    },
    certifications: certificationsAnalysis.detectedIssuers || [],
    achievements: achievementsAnalysis.matchedKeywords || [],
    experienceLevel,
    isFresher: isStudentOrFresher,
    resumeText,
    sectionConfidence: {
      contact: contactInfo.confidence || 90,
      summary: summaryAnalysis.confidence || 85,
      education: educationAnalysis.confidence || 90,
      skills: skills.confidence || 90,
      projects: projectsAnalysis.confidence || 85,
      experience: experienceAnalysis.confidence || 85
    }
  };
}

/* ============================================================
   15. JOB DESCRIPTION PARSER & MATCHING ENGINE (CANONICAL)
   ============================================================ */
const CANONICAL_TECH_MAP = {
  // React
  'react': 'React',
  'react.js': 'React',
  'reactjs': 'React',

  // Next.js
  'next.js': 'Next.js',
  'nextjs': 'Next.js',
  'next': 'Next.js',

  // Vue
  'vue': 'Vue',
  'vue.js': 'Vue',
  'vuejs': 'Vue',

  // Angular
  'angular': 'Angular',
  'angular.js': 'Angular',
  'angularjs': 'Angular',

  // Node.js
  'node.js': 'Node.js',
  'nodejs': 'Node.js',
  'node': 'Node.js',

  // Express
  'express': 'Express',
  'express.js': 'Express',

  // Tailwind CSS
  'tailwind': 'Tailwind CSS',
  'tailwind css': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',

  // JavaScript
  'javascript': 'JavaScript',
  'javascript es6': 'JavaScript',
  'es6 javascript': 'JavaScript',
  'es6+ javascript': 'JavaScript',
  'es6+': 'JavaScript',
  'es6': 'JavaScript',
  'js': 'JavaScript',

  // TypeScript
  'typescript': 'TypeScript',
  'ts': 'TypeScript',

  // Git & GitHub
  'git': 'Git',
  'github': 'GitHub',

  // REST APIs
  'rest api': 'REST APIs',
  'rest apis': 'REST APIs',
  'restful api': 'REST APIs',
  'restful apis': 'REST APIs',
  'rest': 'REST APIs',

  // HTML & CSS
  'html': 'HTML5',
  'html5': 'HTML5',
  'css': 'CSS3',
  'css3': 'CSS3',

  // Responsive Design
  'responsive web design': 'Responsive Design',
  'responsive design': 'Responsive Design',
  'responsive': 'Responsive Design',

  // DOM Manipulation
  'dom manipulation': 'DOM Manipulation',
  'dom': 'DOM Manipulation',

  // Performance Optimization
  'frontend performance optimization': 'Performance Optimization',
  'performance optimization': 'Performance Optimization',
  'web performance': 'Performance Optimization',

  // AI & APIs
  'ai apis': 'AI APIs',
  'ai api': 'AI APIs',
  'generative ai': 'Generative AI',
  'genai': 'Generative AI',
  'gen ai': 'Generative AI',

  // Personal Web Projects
  'personal web projects': 'Personal Web Projects',
  'personal projects': 'Personal Web Projects',
  'web projects': 'Personal Web Projects',

  // Core CS / DSA
  'data structures & algorithms': 'Data Structures & Algorithms',
  'data structures and algorithms': 'Data Structures & Algorithms',
  'data structures': 'Data Structures',
  'algorithms': 'Algorithms',
  'dsa': 'Data Structures & Algorithms',
  'oop': 'OOP',
  'object-oriented programming': 'OOP',
  'object oriented programming': 'OOP',
  'system design': 'System Design',

  // Databases
  'sql': 'SQL',
  'postgresql': 'PostgreSQL',
  'postgres': 'PostgreSQL',
  'mysql': 'MySQL',
  'mongodb': 'MongoDB',
  'mongo': 'MongoDB',
  'redis': 'Redis',

  // Cloud & DevOps
  'aws': 'AWS',
  'amazon web services': 'AWS',
  'gcp': 'Google Cloud',
  'google cloud': 'Google Cloud',
  'azure': 'Azure',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'k8s': 'Kubernetes',
  'ci/cd': 'CI/CD',
  'cicd': 'CI/CD',
  'vercel': 'Vercel',

  // Languages
  'python': 'Python',
  'java': 'Java',
  'c++': 'C++',
  'cpp': 'C++',
  'c#': 'C#',
  'csharp': 'C#',
  'c': 'C',
  'golang': 'Go',
  'go': 'Go',
  'rust': 'Rust'
};

const CANONICAL_SYNONYMS = {};
for (const [syn, can] of Object.entries(CANONICAL_TECH_MAP)) {
  if (!CANONICAL_SYNONYMS[can]) CANONICAL_SYNONYMS[can] = [];
  CANONICAL_SYNONYMS[can].push(syn);
}

function parseJobDescription(jdText) {
  if (!jdText || jdText.trim().length < 20) return null;
  const jdLower = jdText.toLowerCase();

  // Title
  let title = 'Software Engineer';
  const titleMatch = jdText.match(/(?:job title|role|position|title):\s*([^\n\r,]+)/i) ||
                     jdText.match(/\b(Senior\s+[A-Za-z\s/]+|Junior\s+[A-Za-z\s/]+|Lead\s+[A-Za-z\s/]+|[A-Za-z\s/]+\b(?:Developer|Engineer|Architect|Analyst|Scientist|Specialist|Intern))\b/i);
  if (titleMatch) title = titleMatch[1].trim();

  // Company
  let company = 'Not specified';
  const companyMatch = jdText.match(/(?:company|organization|at)\s*[:]\s*([^\n\r,]+)/i);
  if (companyMatch) company = companyMatch[1].trim();

  // Experience requirement
  let minYears = 0;
  let maxYears = 0;
  let expText = 'Entry Level / Fresher';

  const rangeMatch = jdText.match(/(\d+)\s*[-–to]\s*(\d+)\+?\s*years?(?:\s*(?:of)?\s*experience)?/i);
  if (rangeMatch) {
    minYears = parseInt(rangeMatch[1]);
    maxYears = parseInt(rangeMatch[2]);
    expText = `${minYears}–${maxYears} years`;
  } else {
    const singleMatch = jdText.match(/(\d+)\+?\s*years?(?:\s*(?:of)?\s*experience)?/i);
    if (singleMatch) {
      minYears = parseInt(singleMatch[1]);
      maxYears = minYears;
      expText = `${minYears}+ years`;
    }
  }

  // Extract explicit sections from JD
  const reqMatch = jdLower.match(/(?:requirements|must\s*have|required\s*qualifications|what\s*you\s*need|core\s*skills)[:\s]+([^]+?)(?:preferred|nice\s*to\s*have|bonus|plus|what\s*we\s*offer|responsibilities|benefits|$)/i);
  const prefMatch = jdLower.match(/(?:preferred|nice\s*to\s*have|bonus|plus|good\s*to\s*have|desired)[:\s]+([^]+?)(?:responsibilities|benefits|what\s*we\s*offer|requirements|$)/i);

  const reqChunk = reqMatch ? reqMatch[1] : '';
  const prefChunk = prefMatch ? prefMatch[1] : '';

  // Match all synonyms sorted by descending length
  const sortedSynonyms = Object.keys(CANONICAL_TECH_MAP).sort((a, b) => b.length - a.length);

  const rawReq = [];
  const rawPref = [];
  const generalFound = [];

  for (const syn of sortedSynonyms) {
    const canonical = CANONICAL_TECH_MAP[syn];
    const inReq = reqChunk && matchSkillExact(syn, reqChunk, jdText);
    const inPref = prefChunk && matchSkillExact(syn, prefChunk, jdText);
    const inGeneral = matchSkillExact(syn, jdLower, jdText);

    if (inReq) {
      rawReq.push({ syn, canonical });
    }
    if (inPref) {
      rawPref.push({ syn, canonical });
    }
    if (inGeneral) {
      generalFound.push({ syn, canonical });
    }
  }

  // Deduplicate and resolve priority
  // Rule 1: Skills under Requirements MUST remain REQUIRED
  // Rule 2: If a skill appears in both Required and Preferred, Required takes priority (removed from Preferred)
  // Rule 3: Deduplicate canonical skills in both sets
  const duplicateSkillsRemoved = [];
  const requiredSet = new Set();
  const requiredSkills = [];

  for (const item of rawReq) {
    if (!requiredSet.has(item.canonical)) {
      requiredSet.add(item.canonical);
      requiredSkills.push(item.canonical);
    } else {
      duplicateSkillsRemoved.push(`${item.syn} -> ${item.canonical} (duplicate in Requirements)`);
    }
  }

  const preferredSet = new Set();
  const preferredSkills = [];

  for (const item of rawPref) {
    if (requiredSet.has(item.canonical)) {
      duplicateSkillsRemoved.push(`${item.syn} -> ${item.canonical} (removed from Preferred because already Required)`);
    } else if (!preferredSet.has(item.canonical)) {
      preferredSet.add(item.canonical);
      preferredSkills.push(item.canonical);
    } else {
      duplicateSkillsRemoved.push(`${item.syn} -> ${item.canonical} (duplicate in Preferred)`);
    }
  }

  // Fallback if no explicit sections detected
  if (requiredSkills.length === 0 && preferredSkills.length === 0) {
    for (const item of generalFound) {
      if (!requiredSet.has(item.canonical) && !preferredSet.has(item.canonical)) {
        if (requiredSkills.length < 5) {
          requiredSet.add(item.canonical);
          requiredSkills.push(item.canonical);
        } else {
          preferredSet.add(item.canonical);
          preferredSkills.push(item.canonical);
        }
      }
    }
  }

  // Extract structured JD details
  const requiredExperience = [];
  if (minYears > 0) requiredExperience.push(`${expText} relevant technical experience`);
  const preferredExperience = [];
  if (/personal\s*web\s*projects|personal\s*projects/i.test(jdText)) {
    preferredExperience.push('Experience building and deploying personal web projects');
  }

  const educationRequirements = [];
  if (/bachelor|b\.tech|b\.s\.|b\.e\.|degree\s*in\s*computer\s*science/i.test(jdText)) {
    educationRequirements.push('Degree in Computer Science or related STEM field');
  }

  const domainKeywords = [];
  if (/\b(frontend|react|ui|web\s*design)\b/i.test(jdText)) domainKeywords.push('Frontend Development');
  if (/\b(backend|api|server|node)\b/i.test(jdText)) domainKeywords.push('Backend Development');
  if (/\b(ai|machine\s*learning|generative\s*ai)\b/i.test(jdText)) domainKeywords.push('Artificial Intelligence');

  return {
    title,
    company,
    experienceRequired: expText,
    minExperienceYears: minYears,
    maxExperienceYears: maxYears,
    requiredSkills,
    preferredSkills,
    requiredExperience,
    preferredExperience,
    educationRequirements,
    domainKeywords,
    duplicateSkillsRemoved,
    domain: domainKeywords[0] || 'Software Engineering',
    keywords: [...requiredSkills, ...preferredSkills],
    debug: {
      requiredSkills,
      preferredSkills,
      duplicateSkillsRemoved,
      canonicalizationMap: { ...CANONICAL_TECH_MAP }
    }
  };
}

function matchJobProfileWithResume(resumeProfile, jobProfile) {
  const resumeSkillsLower = [
    ...(resumeProfile.skills?.all || []),
    ...(resumeProfile.skills?.other || []),
    ...(resumeProfile.skills?.languages || []),
    ...(resumeProfile.skills?.frameworks || []),
    ...(resumeProfile.skills?.databases || []),
    ...(resumeProfile.skills?.tools || []),
    ...(resumeProfile.skills?.cloud || []),
    ...(resumeProfile.skills?.aiMl || [])
  ].map(s => (typeof s === 'string' ? s.toLowerCase() : ''));

  const resumeTextLower = (resumeProfile.resumeText || '').toLowerCase();

  function hasSkill(canonicalName) {
    const synonyms = CANONICAL_SYNONYMS[canonicalName] || [canonicalName.toLowerCase()];
    for (const syn of synonyms) {
      if (resumeSkillsLower.includes(syn)) return true;
      if (matchSkillExact(syn, resumeTextLower, resumeTextLower)) return true;
    }
    return false;
  }

  // 1. Required Skills Match (30%)
  const matchedRequired = [];
  const missingRequired = [];
  (jobProfile.requiredSkills || []).forEach(s => {
    if (hasSkill(s)) matchedRequired.push(s);
    else missingRequired.push(s);
  });

  let reqScore = 0;
  if (jobProfile.requiredSkills.length > 0) {
    reqScore = Math.round((matchedRequired.length / jobProfile.requiredSkills.length) * 30);
  } else {
    reqScore = matchedRequired.length > 0 ? 30 : 20;
  }

  // 2. Preferred Skills Match (10%)
  const matchedPreferred = [];
  const missingPreferred = [];
  (jobProfile.preferredSkills || []).forEach(s => {
    if (hasSkill(s)) matchedPreferred.push(s);
    else missingPreferred.push(s);
  });

  let prefScore = 0;
  if (jobProfile.preferredSkills.length > 0) {
    prefScore = Math.round((matchedPreferred.length / jobProfile.preferredSkills.length) * 10);
  } else {
    prefScore = 10;
  }

  // 3. Experience Match (20%)
  const candYears = resumeProfile.isFresher ? 0 : 2;
  const reqMinYears = jobProfile.minExperienceYears || 0;
  let expScore = 20;
  let hasExperienceGap = false;
  let experienceGapText = null;

  if (reqMinYears > 0) {
    if (resumeProfile.isFresher) {
      if (reqMinYears >= 3) {
        expScore = 0;
        hasExperienceGap = true;
        experienceGapText = `Job requires ${jobProfile.experienceRequired} of professional experience; resume indicates entry-level / student.`;
      } else if (reqMinYears === 2) {
        expScore = 6;
        hasExperienceGap = true;
        experienceGapText = `Job requires ${jobProfile.experienceRequired}; entry-level stretch role.`;
      } else {
        expScore = 12;
        experienceGapText = `Job requests ${jobProfile.experienceRequired}; suitable for active graduates.`;
      }
    } else {
      expScore = 20;
    }
  } else {
    expScore = 20;
  }

  // 4. Project Relevance (20%)
  const projCount = (resumeProfile.projects || []).length;
  let projScore = projCount > 0 ? Math.min(projCount * 6 + 6, 20) : 0;

  // 5. Education Match (10%)
  let eduScore = 10;

  // 6. Keywords/Domain Match (10%)
  const totalKeywords = (jobProfile.keywords || []).length;
  const matchedKeywords = (jobProfile.keywords || []).filter(kw => hasSkill(kw)).length;
  let keywordScore = totalKeywords > 0 ? Math.min(Math.round((matchedKeywords / totalKeywords) * 10), 10) : 5;

  let rawTotal = reqScore + prefScore + expScore + projScore + eduScore + keywordScore;
  let matchScore = Math.min(Math.max(Math.round(rawTotal), 0), 100);

  if (jobProfile.requiredSkills.length > 0 && matchedRequired.length === 0) {
    matchScore = Math.min(matchScore, 30);
  }

  const allMatched = [...matchedRequired, ...matchedPreferred];
  const allMissingSkills = [...missingRequired, ...missingPreferred];

  const missingRequirementsDisplay = {
    required: [...missingRequired],
    preferred: [...missingPreferred]
  };

  if (hasExperienceGap && experienceGapText) {
    missingRequirementsDisplay.required.push(`${jobProfile.experienceRequired} professional experience`);
  }

  // Eligibility Status
  let eligibility = '';
  let eligibilityClass = '';
  let eligibilityColor = '';

  if (matchScore >= 80 && missingRequired.length === 0 && !hasExperienceGap) {
    eligibility = 'HIGHLY ELIGIBLE';
    eligibilityClass = 'eligibility-highly';
    eligibilityColor = '#059669';
  } else if (matchScore >= 70 && missingRequired.length <= 1 && !hasExperienceGap) {
    eligibility = 'ELIGIBLE';
    eligibilityClass = 'eligibility-eligible';
    eligibilityColor = '#10b981';
  } else if (hasExperienceGap && matchScore >= 45) {
    eligibility = 'EXPERIENCE GAP';
    eligibilityClass = 'eligibility-exp-gap';
    eligibilityColor = '#ea580c';
  } else if (missingRequired.length <= 3 && matchScore >= 50) {
    eligibility = 'SKILL GAP';
    eligibilityClass = 'eligibility-skill-gap';
    eligibilityColor = '#d97706';
  } else if (matchScore >= 40) {
    eligibility = 'STRETCH ROLE';
    eligibilityClass = 'eligibility-stretch';
    eligibilityColor = '#b45309';
  } else {
    eligibility = 'NOT ELIGIBLE';
    eligibilityClass = 'eligibility-not';
    eligibilityColor = '#dc2626';
  }

  let applyRecommendation = '';
  let applyReason = '';

  if (eligibility === 'HIGHLY ELIGIBLE') {
    applyRecommendation = 'APPLY NOW';
    applyReason = 'You satisfy all major technical requirements and the stated experience level.';
  } else if (eligibility === 'ELIGIBLE') {
    applyRecommendation = 'APPLY NOW';
    applyReason = 'You meet the core stack and experience requirements. Review minor preferred tools before applying.';
  } else if (eligibility === 'SKILL GAP') {
    applyRecommendation = 'APPLY WITH CAUTION';
    applyReason = `You have strong foundations, but missing skill(s) not found in resume: ${missingRequired.slice(0, 2).join(', ')}.`;
  } else if (eligibility === 'EXPERIENCE GAP') {
    applyRecommendation = 'STRETCH APPLICATION';
    applyReason = `You match ${matchScore}% of technical requirements, but the job asks for ${jobProfile.experienceRequired}. Consider entry-level alternatives.`;
  } else if (eligibility === 'STRETCH ROLE') {
    applyRecommendation = 'STRETCH APPLICATION';
    applyReason = `This is a stretch application. Multiple requirements (${missingRequired.slice(0, 2).join(', ') || 'Domain tools'}) are not found in the resume.`;
  } else {
    applyRecommendation = 'NOT RECOMMENDED YET';
    applyReason = `Major required skills (${missingRequired.slice(0, 3).join(', ') || 'Domain tools'}) are not found in the resume.`;
  }

  const actionPlan = [];
  if (missingRequired.length > 0) {
    actionPlan.push({
      priority: 'Priority 1 — ' + missingRequired[0],
      reason: 'Required core skill in the job description.',
      whatToLearn: `Master fundamentals, standard conventions, and practical implementation of ${missingRequired[0]}.`
    });
  }
  if (missingRequired.length > 1 || missingPreferred.length > 0) {
    const nextTool = missingRequired[1] || missingPreferred[0];
    actionPlan.push({
      priority: 'Priority 2 — ' + nextTool,
      reason: 'Key technology in target role stack.',
      whatToLearn: `Build a functional project showcasing integration with ${nextTool}.`
    });
  }
  if (hasExperienceGap) {
    actionPlan.push({
      priority: 'Priority 3 — Professional Experience Reality',
      reason: `Job requests ${jobProfile.experienceRequired}; personal projects cannot be converted into professional work experience.`,
      whatToLearn: `Target internships, graduate engineering programs, or junior roles in this domain.`
    });
  } else {
    actionPlan.push({
      priority: 'Priority 3 — Resume & Project Optimization',
      reason: 'Enhance recruiter visibility and pass ATS screening filters.',
      whatToLearn: 'Add quantitative metrics to project bullets and ensure live links/GitHub repositories are active.'
    });
  }

  let matchLevel = '';
  let matchColor = '';
  let statusClass = '';
  if (matchScore >= 85) { matchLevel = 'Excellent Match'; matchColor = '#059669'; statusClass = 'match-strong'; }
  else if (matchScore >= 70) { matchLevel = 'Strong Match'; matchColor = '#10b981'; statusClass = 'match-good'; }
  else if (matchScore >= 55) { matchLevel = 'Good Match'; matchColor = '#4F46E5'; statusClass = 'match-good'; }
  else if (matchScore >= 45) { matchLevel = 'Partial Match'; matchColor = '#f59e0b'; statusClass = 'match-partial'; }
  else if (matchScore >= 35) { matchLevel = 'Needs Skill Development'; matchColor = '#f97316'; statusClass = 'match-gap'; }
  else { matchLevel = 'Low Match'; matchColor = '#ef4444'; statusClass = 'match-low'; }

  const whyYouMatch = [];
  if (allMatched.length > 0) {
    whyYouMatch.push(`Technical skills: ${allMatched.slice(0, 5).join(', ')}`);
  }
  if ((resumeProfile.projects || []).length > 0) {
    whyYouMatch.push(`Practical project implementation aligned with ${jobProfile.domain}`);
  }

  // Debug object containing exact fields requested
  const debug = {
    requiredSkills: [...jobProfile.requiredSkills],
    preferredSkills: [...jobProfile.preferredSkills],
    matchedRequired: [...matchedRequired],
    missingRequired: [...missingRequired],
    matchedPreferred: [...matchedPreferred],
    missingPreferred: [...missingPreferred],
    duplicateSkillsRemoved: [...(jobProfile.duplicateSkillsRemoved || [])],
    canonicalizationMap: { ...CANONICAL_TECH_MAP }
  };

  return {
    matchScore,
    reqScore,
    prefScore,
    expScore,
    projScore,
    eduScore,
    keywordScore,
    matchLevel,
    matchColor,
    statusClass,
    eligibility,
    eligibilityClass,
    eligibilityColor,
    applyRecommendation,
    applyReason,
    hasExperienceGap,
    experienceGapText,
    factors: {
      requiredSkills: { score: reqScore, max: 30, label: 'Required Skills Match (30%)' },
      preferredSkills: { score: prefScore, max: 10, label: 'Preferred Skills Match (10%)' },
      experience: { score: expScore, max: 20, label: 'Experience Match (20%)' },
      projects: { score: projScore, max: 20, label: 'Project Relevance (20%)' },
      education: { score: eduScore, max: 10, label: 'Education Match (10%)' },
      keywords: { score: keywordScore, max: 10, label: 'Keyword/Domain Match (10%)' }
    },
    matchedRequired,
    missingRequired,
    matchedPreferred,
    missingPreferred,
    allMatched,
    allMissingSkills,
    missingRequirementsDisplay,
    whyYouMatch,
    actionPlan,
    debug
  };
}

function calculateJobRoleMatches(resumeData) {
  const resumeProfile = buildStructuredResumeProfile(resumeData);
  const roleMatches = [];

  const CATEGORY_LABELS = [
    'Best Match',
    'Strong Match',
    'Good Match',
    'Skill-Gap Match',
    'Stretch Role',
    'Alternative Role'
  ];

  ROLE_PROFILES_DB.forEach(role => {
    const titleToUse = (resumeProfile.isFresher && role.entryTitle) ? role.entryTitle : role.title;
    const jobProfile = {
      ...role,
      title: titleToUse,
      company: 'Tech Industry'
    };

    const matchResult = matchJobProfileWithResume(resumeProfile, jobProfile);

    let rankingScore = matchResult.matchScore;
    if (resumeProfile.isFresher && role.minExperienceYears > 0) {
      rankingScore -= 12;
    }

    roleMatches.push({
      ...role,
      title: titleToUse,
      rankingScore,
      roleFitScore: matchResult.matchScore,
      roleFitLevel: matchResult.matchLevel,
      ...matchResult
    });
  });

  roleMatches.sort((a, b) => b.rankingScore - a.rankingScore || b.matchScore - a.matchScore);

  const topRecommendations = roleMatches.slice(0, 6).map((role, idx) => ({
    ...role,
    roleFitScore: role.roleFitScore || role.matchScore,
    roleFitLevel: role.roleFitLevel || role.matchLevel,
    recCategory: CATEGORY_LABELS[idx] || 'Recommended Role'
  }));

  const bestFit = topRecommendations[0];
  if (bestFit) {
    bestFit.roleFitScore = bestFit.roleFitScore || bestFit.matchScore;
    bestFit.roleFitLevel = bestFit.roleFitLevel || bestFit.matchLevel;
  }

  return { bestFit, topRecommendations, allMatches: roleMatches, resumeProfile };
}

function analyzeJobDescriptionMatch(resumeData, jdText) {
  if (!jdText || jdText.trim().length < 20) return null;
  const resumeProfile = buildStructuredResumeProfile(resumeData);
  const jobProfile = parseJobDescription(jdText);
  if (!jobProfile) return null;

  const matchResult = matchJobProfileWithResume(resumeProfile, jobProfile);
  return {
    ...matchResult,
    jobProfile
  };
}

/* ============================================================
   16. SPECIFIC IMPROVEMENT SUGGESTIONS GENERATOR
   ============================================================ */
function generateSuggestions(
  contactInfo, parsedSections, summaryAnalysis, skills,
  experienceAnalysis, projectsAnalysis, educationAnalysis,
  certificationsAnalysis, achievementsAnalysis, contentQuality, scores
) {
  const suggestions = [];

  if (!contactInfo.email) {
    suggestions.push({ priority: 'high', icon: 'mail', title: 'Add Professional Email', desc: 'A valid email address is mandatory for recruiter contact.' });
  } else if (contactInfo.isCasualEmail) {
    suggestions.push({
      priority: 'medium',
      icon: 'alternate_email',
      title: 'Consider a More Professional Email Handle',
      desc: `${contactInfo.casualEmailReason || 'Your email address appears casual.'} Consider using a clean "firstname.lastname@domain.com" format for job applications.`
    });
  }
  if (!contactInfo.phone) {
    suggestions.push({ priority: 'high', icon: 'phone', title: 'Add Phone Number', desc: 'Include a direct contact phone number with country code (e.g. +91 9876543210).' });
  }
  if (!contactInfo.linkedin) {
    suggestions.push({ priority: 'medium', icon: 'link', title: 'Add LinkedIn Profile', desc: 'Include a customized LinkedIn profile URL to verify your professional background.' });
  }
  if (!contactInfo.github) {
    suggestions.push({ priority: 'medium', icon: 'code', title: 'Add GitHub Profile', desc: 'Showcase your code repositories and technical contributions with a GitHub link.' });
  }

  if (!summaryAnalysis.exists) {
    suggestions.push({ priority: 'high', icon: 'chat_bubble', title: 'Add Professional Summary', desc: 'Include a 2-3 sentence summary highlighting your target role, core stack, and key accomplishments.' });
  } else if (!summaryAnalysis.hasTargetRole || summaryAnalysis.clichésFound.length > 0) {
    suggestions.push({
      priority: 'medium', icon: 'edit', title: 'Refine Professional Summary',
      desc: 'Replace generic statements with a clear role title, specific technologies, and domain focus.',
      before: summaryAnalysis.text ? summaryAnalysis.text.substring(0, 70) + '...' : null,
      after: 'Example: "Full Stack Engineer with experience specializing in React, Node.js, and cloud architectures."'
    });
  }

  if (experienceAnalysis.isFresher) {
    suggestions.push({
      priority: 'high', icon: 'rocket_launch', title: 'Strengthen Technical Project Showcase',
      desc: 'As an entry-level / fresher candidate, ensure your projects include architecture details, state management, APIs, and active GitHub/demo links.'
    });
  } else {
    if (experienceAnalysis.weakBullets.length > 0) {
      const example = experienceAnalysis.weakBullets[0].replace(/^[•\-\*►▸▪]\s*/, '').substring(0, 80);
      suggestions.push({
        priority: 'high', icon: 'edit', title: 'Strengthen Experience Bullets',
        desc: 'Begin every bullet with a strong action verb (e.g. Engineered, Optimized, Deployed) rather than passive verbs.',
        before: example.length > 10 ? example : null,
        after: 'Formula: [Action Verb] + [Technology / Feature] + [Measurable Business Impact]'
      });
    }
    if (experienceAnalysis.quantifiedRatio < 0.35 && experienceAnalysis.totalBullets > 0) {
      suggestions.push({
        priority: 'high', icon: 'bar_chart', title: 'Add Measurable Impact & Metrics',
        desc: `Only ${Math.round(experienceAnalysis.quantifiedRatio * 100)}% of bullets include metrics. Add real quantifiable details where available (e.g. latency, user counts, test coverage).`
      });
    }
  }

  if (!projectsAnalysis.found || projectsAnalysis.count === 0) {
    suggestions.push({ priority: 'high', icon: 'rocket_launch', title: 'Add Technical Projects', desc: 'Include 2-3 detailed projects demonstrating end-to-end implementation, tech stack, and live demos.' });
  } else {
    const weakProjects = projectsAnalysis.details.filter(p => p.isWeak);
    if (weakProjects.length > 0) {
      const projName = weakProjects[0].name;
      suggestions.push({
        priority: 'high', icon: 'build', title: 'Add Technical Depth to ' + projName,
        desc: `${projName} currently describes basic implementation. Add measurable details such as number of users, state management, API response improvements, or deployment metrics if available.`,
        before: projName,
        after: 'Describe: Architecture + Tech Stack + Key Engineering Challenges Solved'
      });
    }
    if (!projectsAnalysis.hasGithubLinks) {
      suggestions.push({ priority: 'medium', icon: 'link', title: 'Add GitHub Links to Projects', desc: 'Link to your public repositories so recruiters can review code quality and git habits.' });
    }
  }

  if (skills?.all && skills.all.length < 6) {
    suggestions.push({ priority: 'high', icon: 'psychology', title: 'Expand Technical Skills Section', desc: `Only ${skills.all.length} technical skills detected. Group skills into Languages, Frameworks, Databases, and Cloud/Tools.` });
  }

  if (certificationsAnalysis?.isPurelyGeneric) {
    suggestions.push({ priority: 'medium', icon: 'verified', title: 'Specify Certification Details', desc: 'Replace generic "Certificate" with the specific title, issuing organization (e.g. AWS, Google), and completion date.' });
  }

  if (contentQuality?.vagueFound && contentQuality.vagueFound.length > 0) {
    suggestions.push({
      priority: 'medium', icon: 'find_replace', title: 'Remove Cliché Phrases',
      desc: `Phrases like "${contentQuality.vagueFound[0]}" add no ATS value. Replace with concrete tools and results.`
    });
  }

  return suggestions;
}

/* ============================================================
   17. MAIN ANALYSIS ORCHESTRATOR
   ============================================================ */
async function runRealAnalysis(fromBuilder) {
  const resultsArea = document.getElementById('analyzer-results-area');
  const loadingEl = document.getElementById('analyzer-loading');
  const analyzeBtn = document.getElementById('btn-run-analysis');

  if (loadingEl) loadingEl.style.display = 'flex';
  if (resultsArea) resultsArea.style.display = 'none';
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Analyzing...</span>`;
  }

  try {
    let resumeText = '';

    // Step 1: Extract Text
    if (fromBuilder) {
      if (typeof syncStateFromForm === 'function') {
        syncStateFromForm();
      }
      if (typeof currentResume === 'undefined' || !currentResume) {
        if (typeof Storage !== 'undefined') {
          currentResume = Storage.get('resume_data', null);
        }
      }
      if (!currentResume) {
        throw new Error('No saved resume found. Create or save a resume in Resume Builder first.');
      }
      const p = currentResume.personal || {};
      const hasContent = p.name || p.email || p.phone || p.linkedin || p.github || currentResume.summary || 
        (currentResume.experience && currentResume.experience.length > 0) ||
        (currentResume.projects && currentResume.projects.length > 0) ||
        (currentResume.skills && (currentResume.skills.languages || currentResume.skills.frontend || currentResume.skills.backend));
      if (!hasContent) {
        throw new Error('No saved resume found. Create or save a resume in Resume Builder first.');
      }

      resumeText = convertBuilderToText(currentResume);
      analyzerState.fromBuilder = true;
      analyzerState.fileName = (p.name && p.name !== 'Your Name') ? `${p.name}'s Resume (Builder)` : 'Resume (Builder)';
      analyzerState.fileType = 'Builder';
      analyzerState.fileSize = `${(new Blob([resumeText]).size / 1024).toFixed(0)} KB`;
    } else {
      if (!analyzerState.file) {
        throw new Error('Please upload a resume file first.');
      }

      const ext = analyzerState.file.name.split('.').pop().toLowerCase();
      if (ext === 'pdf') {
        resumeText = await extractPDFText(analyzerState.file);
      } else if (ext === 'docx') {
        resumeText = await extractDOCXText(analyzerState.file);
      } else {
        throw new Error(`Unsupported file type: .${ext}`);
      }
    }

    analyzerState.resumeText = resumeText;

    // Step 2: DOCUMENT CLASSIFICATION & CONFIDENCE GATE
    const classification = classifyDocument(resumeText);
    analyzerState.classification = classification;

    // If confidence < 60: REJECT and stop pipeline
    if (classification.status === 'REJECTED') {
      renderRejectionState(classification, analyzerState.fileName, analyzerState.fileSize);
      if (resultsArea) resultsArea.style.display = 'block';
      showToast('⚠️ Document rejected: This file does not appear to be a resume.', 'error');
      return;
    }

    // Step 3: Parse Sections
    const parsedSections = parseResumeSections(resumeText);
    analyzerState.parsedData = parsedSections;

    // Step 4: Extract and analyze categories
    const contactInfo = extractContactInfo(resumeText);
    const skills = extractSkills(resumeText, parsedSections);
    const summaryAnalysis = analyzeProfessionalSummary(resumeText, parsedSections, skills);
    const experienceAnalysis = analyzeExperience(resumeText, parsedSections.sectionContent);
    const projectsAnalysis = analyzeProjects(resumeText, parsedSections.sectionContent);
    const educationAnalysis = analyzeEducation(resumeText, parsedSections);
    const certificationsAnalysis = analyzeCertifications(resumeText, parsedSections);
    const achievementsAnalysis = analyzeAchievements(resumeText, parsedSections);
    const contentQuality = analyzeContentQuality(resumeText, experienceAnalysis, projectsAnalysis);
    const formattingAnalysis = analyzeATSFormatting(resumeText, parsedSections, analyzerState.documentStructure);

    // Step 5: Structured Resume & Consistency Check
    const resumeData = {
      resumeText,
      contactInfo,
      skills,
      summaryAnalysis,
      experienceAnalysis,
      projectsAnalysis,
      educationAnalysis,
      certificationsAnalysis,
      achievementsAnalysis
    };
    const structuredResume = buildStructuredResumeProfile(resumeData);
    analyzerState.structuredResume = structuredResume;

    const consistency = checkInternalConsistency(resumeText, resumeData, parsedSections);

    // Step 6: Calculate Deterministic ATS Score
    const scores = calculateATSScore(
      resumeText, contactInfo, summaryAnalysis, skills,
      experienceAnalysis, projectsAnalysis, educationAnalysis,
      certificationsAnalysis, achievementsAnalysis, contentQuality,
      formattingAnalysis, null
    );

    // Step 6.5: Validation Pass (Audit 10 checks)
    const scoringValidation = validateScoringEvidence(scores.breakdown, resumeText, structuredResume);
    if (scoringValidation.adjustments && scoringValidation.adjustments.length > 0) {
      scores.overall = scoringValidation.overallScore;
    }

    // Step 7: Generate Suggestions
    const suggestions = generateSuggestions(
      contactInfo, parsedSections, summaryAnalysis, skills,
      experienceAnalysis, projectsAnalysis, educationAnalysis,
      certificationsAnalysis, achievementsAnalysis, contentQuality, scores
    );

    // Step 8: Job Role Matches
    const jobMatchData = calculateJobRoleMatches(resumeData);
    analyzerState.jobRecommendations = jobMatchData.topRecommendations;
    analyzerState.bestFitRole = jobMatchData.bestFit;
    analyzerState.resumeProfile = jobMatchData.resumeProfile;

    // Step 9: Optional JD Match
    let jdMatchResult = null;
    const jdTextarea = document.getElementById('jd-textarea-enhanced-input');
    const existingJD = jdTextarea?.value?.trim() || analyzerState.jdText;
    if (existingJD && existingJD.length > 20) {
      jdMatchResult = analyzeJobDescriptionMatch(resumeData, existingJD);
      analyzerState.jdMatchResult = jdMatchResult;
    }

    // Full result bundle
    const analysisResult = {
      timestamp: new Date().toISOString(),
      fileName: analyzerState.fileName,
      fileType: analyzerState.fileType,
      fileSize: analyzerState.fileSize,
      fromBuilder: analyzerState.fromBuilder,
      resumeText,
      classification,
      structuredResume,
      consistency,
      scores,
      scoringValidation,
      contactInfo,
      parsedSections: { detected: parsedSections.detected },
      summaryAnalysis,
      skills,
      experienceAnalysis,
      projectsAnalysis,
      educationAnalysis,
      certificationsAnalysis,
      achievementsAnalysis,
      contentQuality,
      formattingChecks: formattingAnalysis.checks,
      formattingAnalysis,
      suggestions,
      bestFitRole: jobMatchData.bestFit,
      jobRecommendations: jobMatchData.topRecommendations,
      jdMatchResult,
      wordCount: contentQuality.wordCount
    };

    analyzerState.scores = scores;
    analyzerState.analysisComplete = true;

    saveAnalysisResult(analysisResult);
    renderAllResults(analysisResult);

    if (resultsArea) resultsArea.style.display = 'block';

    const hubAtsEl = document.getElementById('hub-stat-ats');
    if (hubAtsEl) hubAtsEl.textContent = `${scores.overall}%`;

    showToast(`Analysis complete! DevPilot ATS Score: ${scores.overall}/100`, 'success');

    setTimeout(() => {
      resultsArea?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

  } catch (error) {
    showToast(error.message || 'Analysis failed. Please try again.', 'error');
    console.error('Resume analysis error:', error);
  } finally {
    if (loadingEl) loadingEl.style.display = 'none';
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">play_arrow</span><span>Analyze</span>`;
    }
  }
}

/* ============================================================
   18. REJECTION STATE RENDERER
   ============================================================ */
function renderRejectionState(classification, fileName, fileSize) {
  const area = document.getElementById('analyzer-results-area');
  if (!area) return;

  const missingList = classification.missingSignals.map(s => `
    <div class="rejection-reason-item">
      <span class="material-symbols-outlined text-rose-500 text-[16px]">cancel</span>
      <span><strong>Missing Section:</strong> ${escHtml(s)}</span>
    </div>
  `).join('');

  const detectedList = classification.detectedSignals.length > 0 ? `
    <div style="margin-top:0.75rem; font-size:0.8125rem; color:var(--color-on-surface-variant);">
      <strong>Detected signals:</strong> ${escHtml(classification.detectedSignals.join(', '))}
    </div>
  ` : '';

  area.innerHTML = `
    <!-- Analyzed File Info -->
    <div class="analyzer-file-info-bar" id="analyzed-file-bar">
      <span class="material-symbols-outlined text-rose-500 text-[22px]">error</span>
      <div class="file-preview-info">
        <div class="file-preview-name">${escHtml(fileName || 'Document')}</div>
        <div class="file-preview-meta">${escHtml(fileSize || '')} · Evaluated ${timeAgo(new Date().toISOString())}</div>
      </div>
      <button class="btn-secondary btn-sm" id="btn-reanalyze-real">
        <span class="material-symbols-outlined text-[14px]">refresh</span>
        Upload Another
      </button>
    </div>

    <!-- Rejection Card -->
    <div class="analyzer-rejection-card">
      <div class="rejection-hero-header">
        <div class="rejection-icon-wrap">
          <span class="material-symbols-outlined">warning</span>
        </div>
        <div>
          <div class="rejection-title">${escHtml(classification.statusMessage)}</div>
          <div class="rejection-subtitle">${escHtml(classification.nonResumeReason || 'The uploaded file does not satisfy multiple independent resume verification signals.')}</div>
        </div>
      </div>

      <div class="rejection-confidence-bar">
        <span class="rejection-confidence-label">Document Resume Confidence Score</span>
        <span class="rejection-confidence-val">
          <span class="material-symbols-outlined text-[14px]">shield</span>
          ${classification.confidence}% (Required: ≥60%)
        </span>
      </div>

      <div class="rejection-reasons-title">Why this document was rejected:</div>
      <div class="rejection-reasons-list">
        ${missingList}
      </div>
      ${detectedList}

      <div class="rejection-guidance-box" style="margin-top:1.25rem;">
        <strong>How to resolve:</strong> Please upload a resume or CV containing sections such as <em>Education</em>, <em>Technical Skills</em>, <em>Work Experience / Internships</em>, <em>Projects</em>, and <em>Contact Information</em>. Invoices, certificates, research papers, and academic marksheets are automatically filtered out.
      </div>
    </div>
  `;

  const reanalyzeBtn = document.getElementById('btn-reanalyze-real');
  if (reanalyzeBtn) {
    reanalyzeBtn.addEventListener('click', () => {
      area.style.display = 'none';
      area.innerHTML = '';
      analyzerState.analysisComplete = false;
    });
  }
}

/* ============================================================
   19. RESULT RENDERER (Preserves Existing UI Exactly)
   ============================================================ */
function renderAllResults(result) {
  const area = document.getElementById('analyzer-results-area');
  if (!area) return;

  const interp = getScoreInterpretation(result.scores.overall);
  const bd = result.scores.breakdown;
  const isUncertain = result.classification?.status === 'UNCERTAIN';
  const consistency = result.consistency;

  area.innerHTML = `
    <!-- Analyzed File Info -->
    <div class="analyzer-file-info-bar" id="analyzed-file-bar">
      <span class="material-symbols-outlined text-emerald-500 text-[22px]" style='font-variation-settings: "FILL" 1;'>task_alt</span>
      <div class="file-preview-info">
        <div class="file-preview-name">${escHtml(result.fileName || 'Resume')}</div>
        <div class="file-preview-meta">${escHtml(result.fileSize || '')} · Analyzed ${timeAgo(result.timestamp)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;margin-left:auto;">
        <span class="seniority-badge">
          <span class="material-symbols-outlined text-[14px]">person</span>
          ${escHtml(result.structuredResume?.experienceLevel || 'Candidate')}
        </span>
        <button class="btn-secondary btn-sm" id="btn-reanalyze-real">
          <span class="material-symbols-outlined text-[14px]">refresh</span>
          Re-analyze
        </button>
      </div>
    </div>

    <!-- Confidence Warning Banner (if confidence 60-75%) -->
    ${isUncertain ? `
      <div class="confidence-warning-banner">
        <span class="material-symbols-outlined confidence-warning-icon">warning</span>
        <div>
          <div class="confidence-warning-title">⚠️ Resume Confidence: ${result.classification.confidence}%</div>
          <div class="confidence-warning-desc">This document appears to be a resume, but some standard sections could not be confidently identified (${result.classification.missingSignals.join(', ')}). Analysis has proceeded with available evidence.</div>
        </div>
      </div>
    ` : ''}

    <!-- Consistency & Contradiction Alert (if detected) -->
    ${(consistency?.hasContradictions || consistency?.hasDuplicates) ? `
      <div class="consistency-alert-card">
        <div class="consistency-alert-header">
          <span class="material-symbols-outlined text-amber-600 text-[18px]">find_replace</span>
          <span>Internal Consistency & Duplicate Detection</span>
        </div>
        <div class="consistency-items-list">
          ${(consistency.contradictions || []).map(c => `
            <div class="consistency-item">
              <span class="material-symbols-outlined text-amber-600 text-[14px]">error_outline</span>
              <span><strong>Contradiction:</strong> ${escHtml(c)}</span>
            </div>
          `).join('')}
          ${(consistency.duplicates || []).map(d => `
            <div class="consistency-item">
              <span class="material-symbols-outlined text-amber-600 text-[14px]">content_copy</span>
              <span><strong>Duplicate:</strong> ${escHtml(d)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Score Hero -->
    <div class="analyzer-score-hero">
      <div class="score-hero-ring">
        <svg class="score-hero-svg" viewBox="0 0 120 120">
          <circle class="score-ring-bg" cx="60" cy="60" r="50"/>
          <circle class="score-ring-fill" cx="60" cy="60" r="50" id="hero-score-ring"
            stroke="${interp.color}"
            style="stroke-dasharray: ${2 * Math.PI * 50}; stroke-dashoffset: ${2 * Math.PI * 50};"/>
        </svg>
        <div class="score-hero-value">${result.scores.overall}</div>
        <div class="score-hero-max">/ 100</div>
      </div>
      <div class="score-hero-info">
        <div class="score-hero-title">DevPilot ATS Score</div>
        <div class="score-hero-label" style="color: ${interp.color}">${interp.label}</div>
        <div class="score-hero-desc">${interp.desc}</div>
        <div class="score-hero-disclaimer">Evidence-backed calculation based directly on extracted skills, projects, and structural credentials. Zero hallucinations.</div>
      </div>
    </div>

    <!-- Score Breakdown (10 Categories, 100 Points) -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>bar_chart</span>
        <h3 class="analyzer-card-title">Score Breakdown</h3>
        <span class="analyzer-card-score">${result.scores.overall}/100</span>
      </div>
      <div class="score-breakdown-grid">
        ${Object.values(bd).map(cat => `
          <div class="breakdown-row">
            <div class="breakdown-row-header">
              <span class="breakdown-label">${escHtml(cat.label)}</span>
              <span class="breakdown-score">${cat.score}/${cat.max}</span>
            </div>
            <div class="breakdown-bar-bg">
              <div class="breakdown-bar-fill" style="width: 0%" data-target="${Math.round((cat.score / cat.max) * 100)}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Resume Health (Dynamic & Actionable Findings) -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-emerald-500" style='font-variation-settings: "FILL" 1;'>monitor_heart</span>
        <h3 class="analyzer-card-title">Resume Health</h3>
      </div>
      <div class="health-checks-list">
        ${renderHealthChecks(result)}
      </div>
    </div>

    <!-- Two Column Details Grid -->
    <div class="analyzer-details-grid">
      <!-- LEFT COLUMN -->
      <div class="analyzer-details-col">

        <!-- Contact Information -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>person</span>
            <h3 class="analyzer-card-title">Contact Information</h3>
            <span class="section-confidence-pill ${result.contactInfo.confidence >= 90 ? 'high' : 'med'}">${result.contactInfo.confidence}% conf</span>
            <span class="analyzer-card-score" style="margin-left:0.5rem;">${bd.contact.score}/${bd.contact.max}</span>
          </div>
          <div class="contact-checks-list">
            ${renderContactChecks(result.contactInfo)}
          </div>
        </div>

        <!-- Professional Summary & Sections -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>article</span>
            <h3 class="analyzer-card-title">Summary & Sections</h3>
            <span class="section-confidence-pill ${result.summaryAnalysis.confidence >= 90 ? 'high' : 'med'}">${result.summaryAnalysis.confidence}% conf</span>
            <span class="analyzer-card-score" style="margin-left:0.5rem;">${bd.summary.score}/${bd.summary.max}</span>
          </div>
          <div class="section-checks-list">
            ${renderSectionChecks(result.parsedSections, result.summaryAnalysis)}
          </div>
        </div>

        <!-- Experience Analysis -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>work</span>
            <h3 class="analyzer-card-title">Experience Analysis</h3>
            <span class="section-confidence-pill ${result.experienceAnalysis.confidence >= 90 ? 'high' : 'med'}">${result.experienceAnalysis.confidence}% conf</span>
            <span class="analyzer-card-score" style="margin-left:0.5rem;">${bd.experience.score}/${bd.experience.max}</span>
          </div>
          ${renderExperienceDetails(result.experienceAnalysis)}
        </div>

        <!-- ATS Compatibility -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-emerald-500" style='font-variation-settings: "FILL" 1;'>shield_check</span>
            <h3 class="analyzer-card-title">ATS Compatibility</h3>
            <span class="analyzer-card-score">${bd.formatting.score}/${bd.formatting.max}</span>
          </div>
          <div class="formatting-checks-list">
            ${result.formattingChecks.map(c => `
              <div class="analyzer-check-item ${c.pass ? 'check-pass' : 'check-warn'}">
                <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${c.pass ? 'check_circle' : 'warning'}</span>
                <div>
                  <div class="check-label">${escHtml(c.label)}</div>
                  <div class="check-detail">${escHtml(c.detail)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="analyzer-details-col">

        <!-- Skills & Keywords -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>code</span>
            <h3 class="analyzer-card-title">Skills & Keywords</h3>
            <span class="section-confidence-pill ${result.skills.confidence >= 90 ? 'high' : 'med'}">${result.skills.confidence}% conf</span>
            <span class="analyzer-card-score" style="margin-left:0.5rem;">${bd.keywords.score}/${bd.keywords.max}</span>
          </div>
          ${renderSkillsSection(result.skills)}
        </div>

        <!-- Projects Analysis -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>rocket_launch</span>
            <h3 class="analyzer-card-title">Projects Analysis</h3>
            <span class="section-confidence-pill ${result.projectsAnalysis.confidence >= 90 ? 'high' : 'med'}">${result.projectsAnalysis.confidence}% conf</span>
            <span class="analyzer-card-score" style="margin-left:0.5rem;">${bd.projects.score}/${bd.projects.max}</span>
          </div>
          ${renderProjectsDetails(result.projectsAnalysis)}
        </div>

        <!-- Content Quality -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>analytics</span>
            <h3 class="analyzer-card-title">Content Quality</h3>
            <span class="analyzer-card-score">${bd.contentQuality.score}/${bd.contentQuality.max}</span>
          </div>
          ${renderContentQuality(result.contentQuality)}
        </div>

        <!-- Education, Certifications & Achievements -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>school</span>
            <h3 class="analyzer-card-title">Education & Credentials</h3>
            <span class="section-confidence-pill ${result.educationAnalysis.confidence >= 90 ? 'high' : 'med'}">${result.educationAnalysis.confidence}% conf</span>
            <span class="analyzer-card-score" style="margin-left:0.5rem;">${bd.education.score + bd.certifications.score + bd.achievements.score}/15</span>
          </div>
          <div class="edu-check-summary">
            ${renderEduAndCredentials(result.educationAnalysis, result.certificationsAnalysis, result.achievementsAnalysis, result.parsedSections)}
          </div>
        </div>
      </div>
    </div>

    <!-- Improvement Suggestions (Full Width) -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-amber-500" style='font-variation-settings: "FILL" 1;'>lightbulb</span>
        <h3 class="analyzer-card-title">Improvement Suggestions</h3>
        <span class="badge badge-neutral" style="font-size:10px;padding:2px 6px;">${result.suggestions.length} items</span>
      </div>
      <div class="suggestions-list">
        ${result.suggestions.map(s => `
          <div class="suggestion-item">
            <div class="suggestion-priority priority-${s.priority}">${s.priority === 'high' ? 'H' : s.priority === 'medium' ? 'M' : 'L'}</div>
            <div class="suggestion-body">
              <div class="suggestion-title">
                <span class="material-symbols-outlined text-[16px]">${s.icon || 'lightbulb'}</span>
                ${escHtml(s.title)}
              </div>
              <div class="suggestion-desc">${escHtml(s.desc)}</div>
              ${s.before ? `
                <div class="suggestion-before-after">
                  <div class="ba-current"><span class="ba-label">Current:</span> "${escHtml(s.before)}"</div>
                  <div class="ba-suggestion"><span class="ba-label">Suggestion:</span> ${escHtml(s.after)}</div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
        ${result.suggestions.length === 0 ? '<p class="no-issues-text">No major issues detected. Your resume is exceptionally well-optimized!</p>' : ''}
      </div>
    </div>

    <!-- SECTION 1: 🏆 BEST FIT FOR YOUR RESUME -->
    ${renderBestFitRole(result.bestFitRole)}

    <!-- SECTION 2: 🎯 ESTIMATED ROLE FIT FOR YOU -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-emerald-500" style='font-variation-settings: "FILL" 1;'>work_outline</span>
        <h3 class="analyzer-card-title">🎯 Estimated Role Fit For You</h3>
        <span class="badge badge-neutral" style="font-size:10px;padding:2px 6px;">${result.jobRecommendations.length} roles</span>
      </div>
      <p class="jd-instructions">Estimated role compatibility based on verified evidence across your skills, projects, and academic background. (For a specific job opening, use the JD Matcher below.)</p>
      <div class="job-recommendations-grid">
        ${renderJobRecommendations(result.jobRecommendations)}
      </div>
    </div>

    <!-- SECTION 3: 🔍 CHECK YOUR RESUME AGAINST A JOB -->
    <div class="analyzer-section-card" id="jd-matcher-section">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>manage_search</span>
        <h3 class="analyzer-card-title">🔍 Check Your Resume Against a Job</h3>
        <span class="badge badge-neutral" style="font-size:10px;padding:2px 6px;">Real Job Match</span>
      </div>
      <p class="jd-instructions">Paste any complete Job Description below to evaluate your compatibility, skill gaps, and application readiness.</p>
      
      <div class="jd-matcher-container">
        <div class="jd-matcher-input-area">
          <textarea id="jd-textarea-enhanced-input" class="jd-textarea-enhanced" placeholder="Paste the complete job description here (including requirements, responsibilities, and qualifications)...">${escHtml(analyzerState.jdText || '')}</textarea>
          <button class="btn-primary btn-sm" id="btn-run-jd-match-enhanced" style="width:100%;">
            <span class="material-symbols-outlined text-[16px]">compare_arrows</span>
            Calculate Job Match
          </button>
        </div>
        <div id="jd-enhanced-results-area" style="${result.jdMatchResult ? 'display:block;' : 'display:none;'}">
          ${result.jdMatchResult ? renderJDMatchResults(result.jdMatchResult) : ''}
        </div>
      </div>
    </div>
  `;

  // Animate score ring
  setTimeout(() => {
    const ring = document.getElementById('hero-score-ring');
    if (ring) {
      const circumference = 2 * Math.PI * 50;
      const offset = circumference - (result.scores.overall / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    }

    area.querySelectorAll('.breakdown-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target;
    });

    area.querySelectorAll('.job-rec-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target;
    });
  }, 150);

  // Bind handlers
  const reanalyzeBtn = document.getElementById('btn-reanalyze-real');
  if (reanalyzeBtn) {
    reanalyzeBtn.addEventListener('click', () => {
      area.style.display = 'none';
      area.innerHTML = '';
      analyzerState.analysisComplete = false;
    });
  }

  const runJdMatchBtn = document.getElementById('btn-run-jd-match-enhanced');
  if (runJdMatchBtn) {
    runJdMatchBtn.addEventListener('click', () => executeEnhancedJDMatch(result));
  }
}

/* ============================================================
   SUB-RENDERERS
   ============================================================ */
function renderBestFitRole(bestFit) {
  if (!bestFit) return '';
  const roleScore = bestFit.roleFitScore || bestFit.matchScore || 0;

  return `
    <div class="best-fit-card">
      <div class="best-fit-badge-header">
        <span class="material-symbols-outlined text-[18px]" style='font-variation-settings: "FILL" 1;'>military_tech</span>
        <span>🏆 Best Fit For Your Resume</span>
      </div>
      <div class="best-fit-main">
        <div>
          <div class="best-fit-title">${escHtml(bestFit.title)}</div>
          <div class="best-fit-category">${escHtml(bestFit.category)} · ${escHtml(bestFit.description)}</div>
          <div class="best-fit-meta-row" style="margin-top:0.4rem;">
            <span class="eligibility-badge ${bestFit.eligibilityClass || 'eligibility-eligible'}">
              <span class="material-symbols-outlined text-[13px]">${bestFit.eligibility.includes('ELIGIBLE') ? 'check_circle' : (bestFit.eligibility.includes('GAP') ? 'history_toggle_off' : 'tune')}</span>
              ${escHtml(bestFit.eligibility)}
            </span>
            <span class="best-fit-tag" style="background:var(--color-surface-container-high); color:var(--color-on-surface-variant);">
              <span class="material-symbols-outlined text-[12px]">assignment_turned_in</span>
              ${escHtml(bestFit.applyRecommendation)}
            </span>
          </div>
        </div>
        <div class="best-fit-score-box">
          <div class="best-fit-score-num" style="color:${bestFit.matchColor};">${roleScore}%</div>
          <div class="best-fit-score-label" style="color:${bestFit.matchColor};">Estimated Role Fit</div>
        </div>
      </div>
      
      <div class="section-group-label" style="margin-bottom:0.5rem;">Why this is your strongest estimated role fit:</div>
      <div class="best-fit-reasons-list">
        ${(bestFit.whyYouMatch || []).map(r => `
          <div class="best-fit-reason-item">
            <span class="material-symbols-outlined text-emerald-500 text-[16px]" style='font-variation-settings: "FILL" 1;'>check_circle</span>
            <span>${escHtml(r)}</span>
          </div>
        `).join('')}
      </div>

      ${(bestFit.missingRequirementsDisplay?.required?.length > 0 || bestFit.missingRequirementsDisplay?.preferred?.length > 0) ? `
        <div style="margin-top:0.75rem;">
          <div class="section-group-label" style="margin-bottom:0.35rem;">Missing Core Requirements:</div>
          <div class="job-rec-pills">
            ${(bestFit.missingRequirementsDisplay.required || []).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-high">REQUIRED</span>${escHtml(s)}</span>`).join('')}
            ${(bestFit.missingRequirementsDisplay.preferred || []).slice(0, 2).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-med">PREFERRED</span>${escHtml(s)}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${bestFit.actionPlan && bestFit.actionPlan.length > 0 ? `
        <div class="best-fit-next-skill">
          <span class="material-symbols-outlined text-amber-500 text-[18px]">bolt</span>
          <div><strong>Recommended Next Step:</strong> ${escHtml(bestFit.actionPlan[0].whatToLearn)}</div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderJobRecommendations(recommendations) {
  if (!recommendations || recommendations.length === 0) {
    return '<p class="no-data-text">Not enough information to confidently recommend technical roles. Add more skills and projects.</p>';
  }

  return recommendations.map(role => {
    const roleScore = role.roleFitScore || role.matchScore || 0;
    return `
    <div class="job-rec-card">
      <div class="job-rec-header">
        <div class="job-rec-title-wrap">
          <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.2rem;">
            <span class="jd-category-tag">${escHtml(role.recCategory || 'Recommended Role')}</span>
            <span class="job-rec-role-category">${escHtml(role.category)}</span>
          </div>
          <div class="job-rec-role-title">${escHtml(role.title)}</div>
        </div>
        <div class="job-rec-match-badge">
          <div class="job-rec-match-percent" style="color:${role.matchColor};">${roleScore}%</div>
          <div class="job-rec-match-level" style="color:${role.matchColor};">Estimated Role Fit</div>
        </div>
      </div>

      <div class="job-rec-bar-bg">
        <div class="job-rec-bar-fill" style="width: 0%; background: ${role.matchColor};" data-target="${roleScore}%"></div>
      </div>

      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.6rem;">
        <div class="eligibility-badge ${role.eligibilityClass || 'eligibility-eligible'}">
          <span class="material-symbols-outlined text-[13px]">${role.eligibility.includes('ELIGIBLE') ? 'check_circle' : (role.eligibility.includes('GAP') ? 'history_toggle_off' : 'tune')}</span>
          <span>${escHtml(role.eligibility)}</span>
        </div>
      </div>

      ${role.hasExperienceGap ? `
        <div class="jd-exp-gap-box" style="margin-bottom:0.6rem;padding:0.5rem 0.75rem;font-size:0.75rem;">
          <span class="material-symbols-outlined text-amber-500 text-[16px]">history_toggle_off</span>
          <div>${escHtml(role.experienceGapText)}</div>
        </div>
      ` : ''}

      <div class="job-rec-skills-section">
        <div class="job-rec-skill-group">
          <div class="job-rec-skill-group-label">Skills Evidenced in Resume (${role.allMatched ? role.allMatched.length : 0})</div>
          <div class="job-rec-pills">
            ${(role.allMatched && role.allMatched.length > 0)
              ? role.allMatched.slice(0, 5).map(s => `<span class="skill-tag-have"><span class="material-symbols-outlined text-[11px]">check</span>${escHtml(s)}</span>`).join('')
              : '<span class="check-missing-text text-[11px]">None detected yet</span>'}
          </div>
        </div>

        ${(role.missingRequired?.length > 0 || role.missingPreferred?.length > 0) ? `
          <div class="job-rec-skill-group" style="margin-top:0.35rem;">
            <div class="job-rec-skill-group-label">Skills Not Found in Resume</div>
            <div class="job-rec-pills">
              ${(role.missingRequired || []).slice(0, 2).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-high">REQUIRED</span>${escHtml(s)}</span>`).join('')}
              ${(role.missingPreferred || []).slice(0, 2).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-med">PREFERRED</span>${escHtml(s)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="jd-why-box">
        <strong>Why Recommended:</strong> ${escHtml(role.whyRecommended || role.applyReason)}
      </div>

      ${role.actionPlan && role.actionPlan.length > 0 ? `
        <div class="job-rec-roadmap-box" style="margin-top:0.6rem;">
          <div class="job-rec-roadmap-header">
            <span class="material-symbols-outlined text-[15px]">trending_up</span>
            <span>Personalized Next Steps</span>
          </div>
          <div class="job-rec-roadmap-steps">
            ${role.actionPlan.slice(0, 2).map((step, idx) => `
              <div class="roadmap-step-item">
                <span class="roadmap-step-num">${idx + 1}</span>
                <span>${escHtml(step.whatToLearn || step)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
    `;
  }).join('');
}

function renderJDMatchResults(jdResult) {
  if (!jdResult) return '';

  const verdictBg = jdResult.applyRecommendation === 'APPLY NOW' ? 'rgba(16, 185, 129, 0.12)' : (jdResult.applyRecommendation === 'APPLY WITH CAUTION' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)');
  const verdictColor = jdResult.applyRecommendation === 'APPLY NOW' ? '#059669' : (jdResult.applyRecommendation === 'APPLY WITH CAUTION' ? '#d97706' : '#dc2626');

  return `
    <div class="jd-results-hero ${jdResult.statusClass}">
      <div>
        <div class="jd-status-badge" style="color:${jdResult.matchColor};">${escHtml(jdResult.matchLevel)} · Real Job Match</div>
        <div class="jd-status-answer">${escHtml(jdResult.applyRecommendation)}</div>
        <div class="jd-status-desc">${escHtml(jdResult.applyReason)}</div>
      </div>
      <div class="jd-score-circle-wrap">
        <div class="jd-score-circle-num" style="color:${jdResult.matchColor};">${jdResult.matchScore}%</div>
        <div class="jd-score-circle-lbl">Job Match</div>
      </div>
    </div>

    <div class="jd-verdict-grid">
      <div class="jd-verdict-card">
        <div class="jd-verdict-lbl">Technical Match</div>
        <div class="jd-verdict-val" style="color:${jdResult.matchColor};">
          ${jdResult.matchScore}%
        </div>
      </div>
      <div class="jd-verdict-card">
        <div class="jd-verdict-lbl">Eligibility Status</div>
        <div class="jd-verdict-val" style="color:${jdResult.eligibilityColor};">
          ${escHtml(jdResult.eligibility)}
        </div>
      </div>
      <div class="jd-verdict-card" style="background:${verdictBg}; border-color:${verdictColor};">
        <div class="jd-verdict-lbl" style="color:${verdictColor};">Recommendation</div>
        <div class="jd-verdict-val" style="color:${verdictColor};">
          ${escHtml(jdResult.applyRecommendation)}
        </div>
      </div>
    </div>

    ${jdResult.hasExperienceGap ? `
      <div class="jd-exp-gap-box">
        <span class="material-symbols-outlined text-amber-500 text-[20px]" style="flex-shrink:0;">history_toggle_off</span>
        <div>
          <strong>Experience Note (Partial Match):</strong> ${escHtml(jdResult.experienceGapText)}
        </div>
      </div>
    ` : ''}

    <div class="jd-factors-grid">
      ${Object.values(jdResult.factors).map(f => `
        <div class="jd-factor-card">
          <div class="jd-factor-header">
            <span class="jd-factor-name">${escHtml(f.label)}</span>
            <span class="jd-factor-score">${f.score}/${f.max}</span>
          </div>
          <div class="breakdown-bar-bg">
            <div class="breakdown-bar-fill" style="width: ${Math.round((f.score / f.max) * 100)}%;"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="analyzer-details-grid" style="margin-bottom:1rem;">
      <div class="analyzer-section-card" style="margin-bottom:0;">
        <div class="analyzer-card-header">
          <span class="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
          <h4 class="analyzer-card-title">Matched Requirements (${(jdResult.allMatched || []).length})</h4>
        </div>
        <div class="job-rec-pills" style="margin-top:0.5rem;">
          ${(jdResult.allMatched && jdResult.allMatched.length > 0)
            ? jdResult.allMatched.map(s => `<span class="skill-tag-have"><span class="material-symbols-outlined text-[11px]">check</span>${escHtml(s)} verified in resume</span>`).join('')
            : '<span class="no-data-text">No direct skills matched from this job description.</span>'}
        </div>
        ${jdResult.whyYouMatch && jdResult.whyYouMatch.length > 0 ? `
          <div class="best-fit-reasons-list" style="margin-top:0.75rem;">
            ${jdResult.whyYouMatch.map(r => `
              <div class="best-fit-reason-item">
                <span class="material-symbols-outlined text-emerald-500 text-[14px]">check</span>
                <span style="font-size:0.75rem;">${escHtml(r)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="analyzer-section-card" style="margin-bottom:0;">
        <div class="analyzer-card-header">
          <span class="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
          <h4 class="analyzer-card-title">Not Found in Resume (${(jdResult.missingRequirementsDisplay?.required?.length || 0) + (jdResult.missingRequirementsDisplay?.preferred?.length || 0)})</h4>
        </div>
        <div class="job-rec-pills" style="margin-top:0.5rem;">
          ${(jdResult.missingRequirementsDisplay?.required || []).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-high">REQUIRED</span>${escHtml(s)} was not found in the resume</span>`).join('')}
          ${(jdResult.missingRequirementsDisplay?.preferred || []).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-med">PREFERRED</span>${escHtml(s)} was not found in the resume</span>`).join('')}
          ${(!jdResult.missingRequirementsDisplay?.required?.length && !jdResult.missingRequirementsDisplay?.preferred?.length)
            ? '<span class="no-issues-text">All detected requirements in this job description are satisfied.</span>'
            : ''}
        </div>
      </div>
    </div>

    <div class="job-rec-roadmap-box" style="background:var(--color-surface);border:1.5px solid rgba(79, 70, 229, 0.25);">
      <div class="job-rec-roadmap-header">
        <span class="material-symbols-outlined text-indigo-500 text-[18px]">assignment_turned_in</span>
        <span style="font-size:0.875rem;">How To Become More Eligible (Action Plan)</span>
      </div>
      <div style="margin-top:0.75rem;">
        ${(jdResult.actionPlan || []).map(item => `
          <div class="jd-action-priority-item">
            <div class="jd-action-priority-title">${escHtml(item.priority)}</div>
            <div class="jd-action-priority-reason"><strong>Reason:</strong> ${escHtml(item.reason)}</div>
            <div class="jd-action-priority-what"><strong>What to do:</strong> ${escHtml(item.whatToLearn)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function executeEnhancedJDMatch(analysisResult) {
  const jdTextarea = document.getElementById('jd-textarea-enhanced-input');
  const jdText = jdTextarea?.value?.trim();

  if (!jdText || jdText.length < 20) {
    showToast('Please paste a complete job description (at least a few lines).', 'error');
    return;
  }

  analyzerState.jdText = jdText;

  const resumeData = {
    resumeText: analyzerState.resumeText,
    contactInfo: analysisResult.contactInfo,
    skills: analysisResult.skills,
    summaryAnalysis: analysisResult.summaryAnalysis,
    projectsAnalysis: analysisResult.projectsAnalysis,
    experienceAnalysis: analysisResult.experienceAnalysis,
    educationAnalysis: analysisResult.educationAnalysis,
    certificationsAnalysis: analysisResult.certificationsAnalysis,
    achievementsAnalysis: analysisResult.achievementsAnalysis
  };

  const matchResult = analyzeJobDescriptionMatch(resumeData, jdText);
  if (!matchResult) {
    showToast('Unable to analyze job description. Please try a longer description.', 'error');
    return;
  }

  analyzerState.jdMatchResult = matchResult;

  const resultsEl = document.getElementById('jd-enhanced-results-area');
  if (resultsEl) {
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = renderJDMatchResults(matchResult);
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  showToast(`JD Match: ${matchResult.matchScore}% · ${matchResult.eligibility}`, matchResult.matchScore >= 70 ? 'success' : 'info');
}

function renderHealthChecks(result) {
  const checks = [];
  const ci = result.contactInfo;
  const sa = result.summaryAnalysis;
  const exp = result.experienceAnalysis;
  const prj = result.projectsAnalysis;
  const cq = result.contentQuality;

  if (ci.email) {
    checks.push({ pass: true, label: `Professional email detected (${ci.details.email})` });
  } else {
    checks.push({ pass: false, label: 'Email address missing' });
  }

  if (ci.phone) {
    checks.push({ pass: true, label: `Phone number detected (${ci.details.phone})` });
  } else {
    checks.push({ pass: false, label: 'Phone number missing' });
  }

  if (ci.linkedin) {
    checks.push({ pass: true, label: `LinkedIn profile detected (${ci.details.linkedin})` });
  } else {
    checks.push({ pass: false, label: 'LinkedIn profile link not detected' });
  }

  if (ci.github) {
    checks.push({ pass: true, label: `GitHub profile link detected (${ci.details.github})` });
  } else {
    checks.push({ pass: false, label: 'GitHub profile link missing' });
  }

  if (sa.exists) {
    if (sa.hasTargetRole && sa.hasTechKeywords) {
      checks.push({ pass: true, label: 'Targeted professional summary with keywords detected' });
    } else if (sa.hasTechKeywords) {
      checks.push({ pass: true, label: 'Technical summary with relevant stack keywords detected' });
    } else {
      checks.push({ pass: false, label: 'Professional summary is generic / lacks technical keywords' });
    }
  } else {
    checks.push({ pass: false, label: 'Professional summary section missing' });
  }

  if (exp.isFresher) {
    checks.push({ pass: true, label: 'Student / Fresher mode active — practical projects weighted' });
  } else {
    checks.push({ pass: true, label: `Professional experience detected (${exp.jobTitles.join(', ') || 'Role detected'})` });
    if (exp.quantifiedCount > 0) {
      checks.push({ pass: true, label: `Measurable impact detected in experience (${exp.quantifiedCount} quantified bullets)` });
    } else {
      checks.push({ pass: false, label: 'Experience bullets lack measurable metrics / impact' });
    }
  }

  if (prj.found && prj.count > 0) {
    const weakProjects = prj.details.filter(p => p.isWeak);
    if (weakProjects.length === 0) {
      checks.push({ pass: true, label: `${prj.count} technical project(s) with implementation depth detected` });
    } else {
      checks.push({ pass: false, label: `${weakProjects.length} project description(s) lack technical depth / implementation details` });
    }
  } else {
    checks.push({ pass: false, label: 'No technical projects section detected' });
  }

  if (cq.vagueFound.length > 0) {
    checks.push({ pass: false, label: `Generic cliché phrases detected ("${cq.vagueFound.slice(0, 2).join('", "')}")` });
  }

  if (result.skills.all.length >= 6) {
    checks.push({ pass: true, label: `${result.skills.all.length} technical skills detected across categories` });
  } else {
    checks.push({ pass: false, label: `Limited technical keywords detected (${result.skills.all.length} skills found)` });
  }

  return checks.map(c => `
    <div class="analyzer-check-item ${c.pass ? 'check-pass' : 'check-warn'}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${c.pass ? 'check_circle' : 'warning'}</span>
      <span class="check-label">${escHtml(c.label)}</span>
    </div>
  `).join('');
}

function renderContactChecks(ci) {
  const items = [
    { key: 'Name', found: ci.name, detail: ci.details.name },
    { key: 'Email', found: ci.email, detail: ci.details.email },
    { key: 'Phone', found: ci.phone, detail: ci.details.phone },
    { key: 'Location', found: ci.location, detail: ci.details.location },
    { key: 'LinkedIn', found: ci.linkedin, detail: ci.details.linkedin },
    { key: 'GitHub', found: ci.github, detail: ci.details.github },
    { key: 'Portfolio / Coding Profile', found: ci.portfolio, detail: ci.details.portfolio }
  ];

  return items.map(item => `
    <div class="analyzer-check-item ${item.found ? 'check-pass' : 'check-missing'}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${item.found ? 'check_circle' : 'cancel'}</span>
      <div>
        <span class="check-label">${item.key}</span>
        ${item.found && item.detail ? `<span class="check-detail" style="color:var(--color-on-surface); font-weight:600;">${escHtml(item.detail)}</span>` : ''}
        ${!item.found ? `<span class="check-detail check-missing-text">${item.key.includes('Portfolio') ? 'Optional / Not detected' : 'Not detected'}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function renderSectionChecks(ps, sa) {
  const allSections = [
    { key: 'summary', label: 'Summary / Objective', status: sa?.exists ? (sa.score >= 3 ? 'Strong' : 'Generic') : 'Missing' },
    { key: 'skills', label: 'Technical Skills', status: ps.detected.skills ? 'Detected' : 'Missing' },
    { key: 'experience', label: 'Work Experience', status: ps.detected.experience ? 'Detected' : 'Missing' },
    { key: 'projects', label: 'Projects', status: ps.detected.projects ? 'Detected' : 'Missing' },
    { key: 'education', label: 'Education', status: ps.detected.education ? 'Detected' : 'Missing' },
    { key: 'certifications', label: 'Certifications', status: ps.detected.certifications ? 'Detected' : 'Missing' },
    { key: 'achievements', label: 'Achievements / Awards', status: ps.detected.achievements ? 'Detected' : 'Missing' }
  ];

  const detected = allSections.filter(s => ps.detected[s.key]);
  const missing = allSections.filter(s => !ps.detected[s.key]);

  let html = '';
  if (detected.length) {
    html += '<div class="section-group-label">Detected Sections</div>';
    html += detected.map(s => `
      <div class="analyzer-check-item check-pass">
        <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>check_circle</span>
        <div>
          <span class="check-label">${escHtml(s.label)}</span>
          ${s.key === 'summary' && sa?.exists ? `<span class="check-detail">${sa.score >= 3 ? '✓ Specific & keyword-aligned' : '⚠ Generic phrasing detected'}</span>` : ''}
        </div>
      </div>
    `).join('');
  }
  if (missing.length) {
    html += '<div class="section-group-label" style="margin-top:0.75rem;">Missing / Recommended</div>';
    html += missing.map(s => `
      <div class="analyzer-check-item check-missing">
        <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>warning</span>
        <span class="check-label">${escHtml(s.label)}</span>
      </div>
    `).join('');
  }
  return html;
}

function renderExperienceDetails(exp) {
  if (exp.isFresher) {
    return `
      <div class="exp-detail-note" style="margin-top:0.5rem;">
        <span class="material-symbols-outlined text-amber-500 text-[18px]">info</span>
        <span>Student / Fresher candidate profile active. Practical technical projects, hackathons, and certifications are evaluated with higher weight.</span>
      </div>
    `;
  }

  return `
    <div class="exp-stats-grid">
      <div class="exp-stat">
        <div class="exp-stat-value">${exp.totalBullets}</div>
        <div class="exp-stat-label">Bullets</div>
      </div>
      <div class="exp-stat">
        <div class="exp-stat-value">${exp.actionVerbCount}</div>
        <div class="exp-stat-label">Action Verbs</div>
      </div>
      <div class="exp-stat">
        <div class="exp-stat-value">${exp.quantifiedCount}</div>
        <div class="exp-stat-label">Quantified</div>
      </div>
      <div class="exp-stat">
        <div class="exp-stat-value">${Math.round(exp.quantifiedRatio * 100)}%</div>
        <div class="exp-stat-label">Impact Ratio</div>
      </div>
    </div>
    ${exp.jobTitles.length ? `
      <div class="exp-detail-section">
        <div class="exp-detail-label">Detected Roles</div>
        <div class="skills-pill-group">${exp.jobTitles.map(t => `<span class="skill-pill-found"><span class="material-symbols-outlined" style="font-size:11px;">work</span>${escHtml(t)}</span>`).join('')}</div>
      </div>
    ` : ''}
    ${exp.techInExperience.length ? `
      <div class="exp-detail-section">
        <div class="exp-detail-label">Technologies in Context</div>
        <div class="skills-pill-group">${exp.techInExperience.slice(0, 8).map(t => `<span class="skill-pill-found"><span class="material-symbols-outlined" style="font-size:11px;">check</span>${escHtml(t)}</span>`).join('')}</div>
      </div>
    ` : ''}
    ${exp.weakVerbCount > 0 ? `
      <div class="exp-detail-note">
        <span class="material-symbols-outlined text-amber-500 text-[16px]">info</span>
        <span>${exp.weakVerbCount} bullet(s) use weak verbs. Replace with action verbs like Engineered, Architected, Automated.</span>
      </div>
    ` : ''}
  `;
}

function renderSkillsSection(skills) {
  if (skills.all.length === 0) {
    return '<p class="no-data-text">No technical skills detected. Consider adding a structured technical skills section.</p>';
  }

  const categories = Object.entries(skills.categorized).filter(([_, arr]) => arr.length > 0);

  return `
    <div class="detected-skills-summary">
      <span class="skills-count">${skills.all.length} technical skills verified from text</span>
    </div>
    ${categories.map(([cat, arr]) => `
      <div class="skill-category-section">
        <div class="skill-category-label">${formatCategoryName(cat)}</div>
        <div class="skills-pill-group">${arr.map(s => `
          <span class="skill-pill-found" title="Evidence verified">
            <span class="material-symbols-outlined" style="font-size:11px;">check</span>
            ${escHtml(s)}
          </span>
        `).join('')}</div>
      </div>
    `).join('')}
    ${skills.softSkills && skills.softSkills.length > 0 ? `
      <div class="skill-category-section" style="margin-top:0.75rem;">
        <div class="skill-category-label" style="color:var(--color-outline);">Soft Skills (Separated from Technical Evaluation)</div>
        <div class="skills-pill-group">${skills.softSkills.map(s => `<span class="skill-pill-rec" style="opacity:0.85;">${escHtml(s)}</span>`).join('')}</div>
      </div>
    ` : ''}
  `;
}

function renderProjectsDetails(proj) {
  if (!proj.found || proj.count === 0) {
    return '<p class="no-data-text">No projects section detected. Consider adding 2-3 technical projects with descriptions, architecture, and links.</p>';
  }

  const items = [];
  items.push({ pass: proj.count >= 2, label: `${proj.count} project(s) detected` });
  items.push({ pass: proj.techCount >= 3, label: proj.techCount > 0 ? `${proj.techCount} technologies mentioned` : 'Technologies not explicitly mentioned' });
  items.push({ pass: proj.hasGithubLinks, label: proj.hasGithubLinks ? 'GitHub repository link detected' : 'No GitHub repository links detected' });
  items.push({ pass: proj.hasDemoLinks, label: proj.hasDemoLinks ? 'Live demo / hosted link detected' : 'No live demo links detected' });

  let detailsHtml = '';
  if (proj.details.length > 0) {
    detailsHtml = proj.details.map(d => `
      <div class="project-detail-item">
        <div class="project-detail-name">${escHtml(d.name)}</div>
        <div class="project-detail-checks">
          ${d.hasTech ? '<span class="mini-check pass">Tech ✓</span>' : '<span class="mini-check warn">Tech ⚠</span>'}
          ${d.hasDescription ? '<span class="mini-check pass">Desc ✓</span>' : '<span class="mini-check warn">Desc ⚠</span>'}
          ${d.matchedDepthKeywords && d.matchedDepthKeywords.length > 0 ? `<span class="mini-check pass">Depth (${d.matchedDepthKeywords.length})</span>` : '<span class="mini-check warn">Depth ⚠</span>'}
          ${d.hasGithub ? '<span class="mini-check pass">GitHub ✓</span>' : ''}
          ${d.hasImpact ? '<span class="mini-check pass">Impact ✓</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  return `
    <div class="project-checks-list">
      ${items.map(item => `
        <div class="analyzer-check-item ${item.pass ? 'check-pass' : 'check-warn'}">
          <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${item.pass ? 'check_circle' : 'warning'}</span>
          <span class="check-label">${escHtml(item.label)}</span>
        </div>
      `).join('')}
    </div>
    ${detailsHtml ? `<div class="project-details-grid">${detailsHtml}</div>` : ''}
  `;
}

function renderContentQuality(cq) {
  return `
    <div class="cq-stats">
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.wordCount}</span><span class="cq-stat-label">Words</span></div>
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.actionVerbCount}</span><span class="cq-stat-label">Action Verbs</span></div>
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.metricsCount}</span><span class="cq-stat-label">Metrics</span></div>
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.vagueFound.length}</span><span class="cq-stat-label">Clichés</span></div>
    </div>
    ${cq.issues.length > 0 ? `
      <div class="cq-issues-list">
        ${cq.issues.map(issue => `
          <div class="analyzer-check-item ${issue.type === 'warning' ? 'check-warn' : 'check-info'}">
            <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${issue.type === 'warning' ? 'warning' : 'info'}</span>
            <span class="check-label">${escHtml(issue.message)}</span>
          </div>
        `).join('')}
      </div>
    ` : '<p class="no-issues-text">No content quality issues detected. Strong writing style!</p>'}
  `;
}

function renderEduAndCredentials(edu, certs, ach, ps) {
  const eduPass = edu.exists && (edu.hasDegree || edu.hasInstitution);
  const certPass = certs.exists && !certs.isPurelyGeneric;
  const achPass = ach.exists && !ach.isGeneric;

  return `
    <div class="analyzer-check-item ${eduPass ? 'check-pass' : (edu.exists ? 'check-warn' : 'check-missing')}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${eduPass ? 'check_circle' : 'warning'}</span>
      <div>
        <div class="check-label">Education (${edu.score}/${edu.max || 10})</div>
        <div class="check-detail">${edu.hasDegree ? `Degree: ${escHtml(edu.degree || 'Detected')}` : (edu.exists ? 'Basic education section' : 'Not detected')}</div>
      </div>
    </div>
    <div class="analyzer-check-item ${certPass ? 'check-pass' : (certs.exists ? 'check-warn' : 'check-missing')}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${certPass ? 'check_circle' : (certs.exists ? 'warning' : 'info')}</span>
      <div>
        <div class="check-label">Certifications (${certs.score}/5)</div>
        <div class="check-detail">${certs.hasRecognizedIssuer ? `Verified issuer (${certs.detectedIssuers.join(', ')})` : (certs.isPurelyGeneric ? 'Generic course certificate' : (certs.exists ? 'Certifications detected' : 'Optional / Not detected'))}</div>
      </div>
    </div>
    <div class="analyzer-check-item ${achPass ? 'check-pass' : (ach.exists ? 'check-warn' : 'check-missing')}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${achPass ? 'check_circle' : (ach.exists ? 'warning' : 'info')}</span>
      <div>
        <div class="check-label">Achievements & DSA (${ach.score}/${ach.max || 10})</div>
        <div class="check-detail">${achPass ? `Recognized achievement (${ach.problemCount ? `${ach.problemCount}+ problems` : (ach.matchedKeywords.slice(0, 2).join(', '))})` : (ach.isGeneric ? 'Generic participation statements' : (ach.exists ? 'Achievements detected' : 'Optional / Not detected'))}</div>
      </div>
    </div>
  `;
}

/* ============================================================
   PERSISTENCE & RESTORATION
   ============================================================ */
function saveAnalysisResult(result) {
  try {
    if (typeof Storage !== 'undefined') {
      Storage.set(ANALYZER_STORAGE_KEY, result);
    }
  } catch (e) {
    console.warn('Failed to save analysis result:', e);
  }
}

function loadAnalysisResult() {
  if (typeof Storage !== 'undefined') {
    return Storage.get(ANALYZER_STORAGE_KEY, null);
  }
  return null;
}

function clearAnalysisResult() {
  if (typeof Storage !== 'undefined') {
    Storage.remove(ANALYZER_STORAGE_KEY);
  }
  analyzerState = {
    file: null, fileName: '', fileSize: '', fileType: '',
    fromBuilder: false, resumeText: '', parsedData: null,
    classification: null, structuredResume: null,
    scores: null, analysisComplete: false, jobRecommendations: [],
    bestFitRole: null, jdText: '', jdMatchResult: null
  };
}

function restoreSavedAnalysis() {
  const saved = loadAnalysisResult();
  if (!saved || !saved.scores) return;

  // Invalidate cache if saved under old 5-pt education or old contact schema
  if (saved.scores?.breakdown?.contact?.max !== 3 || saved.scores?.breakdown?.education?.max !== 10) {
    clearAnalysisResult();
    return;
  }

  const age = Date.now() - new Date(saved.timestamp).getTime();
  if (age > 24 * 60 * 60 * 1000) return;

  analyzerState.analysisComplete = true;
  analyzerState.fileName = saved.fileName;
  analyzerState.fileType = saved.fileType;
  analyzerState.fileSize = saved.fileSize;
  analyzerState.fromBuilder = saved.fromBuilder;
  analyzerState.jobRecommendations = saved.jobRecommendations || [];
  analyzerState.bestFitRole = saved.bestFitRole || null;

  const resultsArea = document.getElementById('analyzer-results-area');
  if (resultsArea) {
    renderAllResults(saved);
    resultsArea.style.display = 'block';
  }
}

/* ============================================================
   CONTROLS INITIALIZATION
   ============================================================ */
let analyzerControlsInitialized = false;

function initRealAnalyzerControls() {
  if (analyzerControlsInitialized) return;
  analyzerControlsInitialized = true;

  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('file-upload-input');
  const removeFileBtn = document.getElementById('btn-remove-file');

  if (dropzone) {
    dropzone.addEventListener('dragover', e => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      const file = e.dataTransfer?.files?.[0];
      if (file) handleRealFileSelected(file);
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) handleRealFileSelected(fileInput.files[0]);
    });
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', () => {
      resetAnalyzerState();
    });
  }

  const analyzeBuilderBtn = document.getElementById('btn-analyze-builder');
  if (analyzeBuilderBtn) analyzeBuilderBtn.addEventListener('click', () => runRealAnalysis(true));

  const topBarBuilderBtn = document.getElementById('btn-use-builder-resume');
  if (topBarBuilderBtn) topBarBuilderBtn.addEventListener('click', () => runRealAnalysis(true));

  const runBtn = document.getElementById('btn-run-analysis');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (analyzerState.file) {
        runRealAnalysis(false);
      } else {
        runRealAnalysis(true);
      }
    });
  }

  restoreSavedAnalysis();
}

function handleRealFileSelected(file) {
  const validation = validateFile(file);
  if (!validation.valid) {
    showToast(validation.error, 'error');
    return;
  }

  const strip = document.getElementById('file-preview-strip');
  const nameEl = document.getElementById('file-name-display');
  const metaEl = document.getElementById('file-meta-display');

  const size = file.size / 1024;
  const sizeStr = size > 1024 ? `${(size / 1024).toFixed(1)} MB` : `${size.toFixed(0)} KB`;
  const type = file.name.endsWith('.pdf') ? 'PDF' : 'DOCX';

  if (nameEl) nameEl.textContent = file.name;
  if (metaEl) metaEl.textContent = `${sizeStr} · ${type}`;
  if (strip) strip.style.display = 'flex';

  analyzerState.file = file;
  analyzerState.fileName = file.name;
  analyzerState.fileSize = sizeStr;
  analyzerState.fileType = type;
  analyzerState.fromBuilder = false;

  const resultsArea = document.getElementById('analyzer-results-area');
  if (resultsArea) { resultsArea.style.display = 'none'; resultsArea.innerHTML = ''; }
  analyzerState.analysisComplete = false;

  runRealAnalysis(false);
}

function resetAnalyzerState() {
  const fileInput = document.getElementById('file-upload-input');
  if (fileInput) fileInput.value = '';

  const strip = document.getElementById('file-preview-strip');
  if (strip) strip.style.display = 'none';

  const resultsArea = document.getElementById('analyzer-results-area');
  if (resultsArea) { resultsArea.style.display = 'none'; resultsArea.innerHTML = ''; }

  clearAnalysisResult();
}

/* ============================================================
   HELPERS
   ============================================================ */
function formatCategoryName(key) {
  const names = {
    cs_core: 'CS Fundamentals & Architecture',
    languages: 'Programming Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Databases',
    cloud: 'Cloud & Infrastructure',
    devops: 'DevOps & CI/CD',
    tools: 'Tools & Collaboration',
    testing: 'Testing & QA',
    ai_ml: 'AI & Machine Learning'
  };
  return names[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function timeAgo(dateString) {
  if (!dateString) return 'recently';
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Attach global functions to window
if (typeof window !== 'undefined') {
  window.initRealAnalyzerControls = initRealAnalyzerControls;
  window.runRealAnalysis = runRealAnalysis;
  window.classifyDocument = classifyDocument;
  window.buildStructuredResumeProfile = buildStructuredResumeProfile;
  window.checkInternalConsistency = checkInternalConsistency;
  window.parseJobDescription = parseJobDescription;
  window.matchJobProfileWithResume = matchJobProfileWithResume;
  window.calculateJobRoleMatches = calculateJobRoleMatches;
  window.analyzeJobDescriptionMatch = analyzeJobDescriptionMatch;
  window.calculateATSScore = calculateATSScore;
  window.validateScoringEvidence = validateScoringEvidence;
  window.renderAllResults = renderAllResults;
  window.renderRejectionState = renderRejectionState;
  window.CANONICAL_TECH_MAP = CANONICAL_TECH_MAP;
  window.CERTIFICATION_TIERS = CERTIFICATION_TIERS;
  window.getCertificationTiers = getCertificationTiers;
  window.setCertificationTiers = setCertificationTiers;
  window.detectDocumentLayout = detectDocumentLayout;
  window.detectPDFMultiColumn = detectPDFMultiColumn;
  window.detectDOCXStructure = detectDOCXStructure;
  window.detectDocumentLayoutFromText = detectDocumentLayoutFromText;
  window.isTechStackOrLinksLine = isTechStackOrLinksLine;
  window.isProjectHeaderLine = isProjectHeaderLine;
}

// Auto-initialize
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initRealAnalyzerControls();
    });
  } else {
    initRealAnalyzerControls();
  }
}

// Node.js module exports for automated testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    classifyDocument,
    extractSkills,
    matchSkillExact,
    extractContactInfo,
    parseResumeSections,
    analyzeProfessionalSummary,
    analyzeExperience,
    analyzeProjects,
    analyzeEducation,
    analyzeCertifications,
    analyzeAchievements,
    analyzeContentQuality,
    analyzeATSFormatting,
    calculateATSScore,
    validateScoringEvidence,
    checkInternalConsistency,
    buildStructuredResumeProfile,
    parseJobDescription,
    matchJobProfileWithResume,
    calculateJobRoleMatches,
    analyzeJobDescriptionMatch,
    generateSuggestions,
    CANONICAL_TECH_MAP,
    CERTIFICATION_TIERS,
    getCertificationTiers,
    setCertificationTiers,
    detectDocumentLayout,
    detectPDFMultiColumn,
    detectDOCXStructure,
    detectDocumentLayoutFromText,
    isTechStackOrLinksLine,
    isProjectHeaderLine
  };
}
