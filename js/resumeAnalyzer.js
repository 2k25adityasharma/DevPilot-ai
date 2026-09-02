/**
 * DevPilot-AI — Real Resume Analyzer & Job Matching Engine
 * 
 * Provides:
 * 1. Text extraction from PDF/DOCX files
 * 2. Deterministic 100-point ATS scoring across 10 categories
 * 3. Section detection, skills analysis, content quality analysis
 * 4. "Best Fit Role" identification
 * 5. "Your Best Job Matches" (5–6 dynamic recommendations with match %, skill gaps, and roadmaps)
 * 6. "Check Your Resume Against a Job" (Advanced JD Matcher & Application Compatibility Analyzer)
 * 
 * All results are calculated directly from the extracted resume text and JD text.
 * Nothing is hardcoded, faked, or randomized.
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

const KNOWN_CERT_ISSUERS = [
  'google', 'aws', 'amazon web services', 'microsoft', 'azure', 'meta', 'facebook',
  'cisco', 'oracle', 'ibm', 'coursera', 'udemy', 'edx', 'comptia', 'stanford',
  'harvard', 'mit', 'freecodecamp', 'deeplearning.ai', 'linux foundation',
  'cncf', 'kubernetes', 'hashicorp', 'mongodb', 'snowflake', 'databricks',
  'salesforce', 'palo alto', 'red hat', 'hackerrank', 'postman'
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
  summary: /\b(summary|professional\s*summary|profile|about\s*me|career\s*objective|objective|career\s*summary|executive\s*summary)\b/i,
  experience: /\b(experience|work\s*experience|professional\s*experience|employment|work\s*history|internship|internships|industry\s*experience)\b/i,
  education: /\b(education|academic|academic\s*background|qualifications|educational\s*background|academics)\b/i,
  skills: /\b(skills|technical\s*skills|technologies|tools|core\s*competencies|tech\s*stack|programming\s*skills|technical\s*expertise|competencies)\b/i,
  projects: /\b(projects|personal\s*projects|featured\s*projects|key\s*projects|side\s*projects|academic\s*projects|technical\s*projects)\b/i,
  certifications: /\b(certifications|certificates|credentials|licenses|professional\s*certifications|programming\s*credentials|certifications\s*&?\s*licenses)\b/i,
  achievements: /\b(achievements|honors|awards|accomplishments|recognitions|honors\s*&?\s*awards|programming\s*achievements)\b/i,
  publications: /\b(publications|papers|research\s*papers|patents)\b/i,
  volunteer: /\b(volunteer|volunteering|community\s*service|extracurricular)\b/i
};

// Normalized Technical Skills DB
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
    'llm', 'large language models', 'generative ai', 'rag', 'vector database'
  ]
};

/* ============================================================
   JOB ROLES KNOWLEDGE BASE (Structured Requirements Dataset)
   ============================================================ */
const JOB_ROLES_DB = [
  {
    id: 'frontend_developer',
    title: 'Frontend Developer',
    category: 'Frontend',
    icon: 'code',
    description: 'Specializes in creating interactive, responsive user interfaces and modern web applications.',
    essentialSkills: ['HTML5', 'CSS3', 'JavaScript'],
    importantSkills: ['React', 'TypeScript', 'Tailwind', 'Git', 'Next.js', 'Redux', 'Responsive Design'],
    bonusSkills: ['Vue', 'Angular', 'Webpack', 'Vite', 'Jest', 'Figma', 'Rest Apis', 'GraphQL', 'Sass'],
    domainKeywords: ['frontend', 'ui', 'ux', 'web', 'client', 'browser', 'dom', 'spa', 'component', 'styling'],
    projectKeywords: ['website', 'web application', 'dashboard', 'e-commerce', 'landing page', 'portfolio', 'ui'],
    roleSummary: 'Your HTML, CSS, JavaScript and frontend development capabilities align with UI/Frontend roles.'
  },
  {
    id: 'backend_developer',
    title: 'Backend Developer',
    category: 'Backend',
    icon: 'dns',
    description: 'Designs and builds server-side business logic, microservices, databases, and REST/GraphQL APIs.',
    essentialSkills: ['SQL', 'Rest Apis', 'Git'],
    importantSkills: ['Node.js', 'Express', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Django', 'FastAPI', 'Spring Boot', 'Go'],
    bonusSkills: ['Redis', 'Docker', 'GraphQL', 'Microservices', 'AWS', 'gRPC', 'WebSockets'],
    domainKeywords: ['backend', 'server', 'api', 'database', 'rest', 'microservice', 'crud', 'authentication', 'query', 'jwt'],
    projectKeywords: ['api', 'backend', 'server', 'database', 'rest api', 'microservice', 'authentication', 'crud'],
    roleSummary: 'Your backend programming, API design, and database integration skills support server-side engineering.'
  },
  {
    id: 'fullstack_developer',
    title: 'Full Stack Developer',
    category: 'Full Stack',
    icon: 'layers',
    description: 'Builds end-to-end web applications covering client-side interfaces, server APIs, and persistent databases.',
    essentialSkills: ['JavaScript', 'HTML5', 'CSS3', 'SQL', 'Git'],
    importantSkills: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Tailwind', 'Next.js'],
    bonusSkills: ['Docker', 'AWS', 'Redis', 'GraphQL', 'Rest Apis', 'CI/CD'],
    domainKeywords: ['full stack', 'fullstack', 'end-to-end', 'web application', 'frontend and backend', 'mern', 'client-server'],
    projectKeywords: ['full stack', 'full-stack', 'e-commerce', 'web store', 'platform', 'app', 'portal'],
    roleSummary: 'Your combined frontend, backend, and database skill set fits full-stack software development.'
  },
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    category: 'CS Core',
    icon: 'terminal',
    description: 'Applies software engineering principles, algorithms, data structures, and system design to build software.',
    essentialSkills: ['Data Structures', 'Algorithms', 'OOP', 'Git'],
    importantSkills: ['C++', 'Java', 'Python', 'Go', 'System Design', 'SQL', 'Operating Systems', 'DBMS', 'Linux'],
    bonusSkills: ['Distributed Systems', 'Docker', 'Competitive Programming', 'Design Patterns', 'Unit Testing'],
    domainKeywords: ['software engineer', 'swe', 'algorithms', 'data structures', 'dsa', 'system architecture', 'object-oriented', 'problem solving'],
    projectKeywords: ['engine', 'compiler', 'algorithm', 'system', 'tool', 'cache', 'simulator', 'application'],
    roleSummary: 'Your computer science foundations, algorithms, and programming proficiency align with software engineering.'
  },
  {
    id: 'python_developer',
    title: 'Python Developer',
    category: 'Backend / Scripting',
    icon: 'code',
    description: 'Develops backend services, automation workflows, data pipelines, and web applications using Python.',
    essentialSkills: ['Python', 'SQL', 'Git'],
    importantSkills: ['Django', 'Flask', 'FastAPI', 'Pandas', 'OOP', 'Rest Apis', 'PostgreSQL'],
    bonusSkills: ['Docker', 'Redis', 'NumPy', 'Celery', 'AWS', 'PyTest'],
    domainKeywords: ['python', 'scripting', 'automation', 'django', 'flask', 'fastapi', 'backend'],
    projectKeywords: ['python', 'automation', 'scraper', 'bot', 'api', 'django', 'fastapi'],
    roleSummary: 'Your Python programming and development experience align directly with Python-centric engineering roles.'
  },
  {
    id: 'java_developer',
    title: 'Java Developer',
    category: 'Enterprise / Backend',
    icon: 'coffee',
    description: 'Builds enterprise-grade, scalable backend systems, microservices, and distributed applications with Java.',
    essentialSkills: ['Java', 'SQL', 'OOP', 'Git'],
    importantSkills: ['Spring Boot', 'Spring', 'Hibernate', 'Microservices', 'Rest Apis', 'PostgreSQL', 'MySQL'],
    bonusSkills: ['Docker', 'Kubernetes', 'Kafka', 'Redis', 'JUnit', 'AWS'],
    domainKeywords: ['java', 'spring', 'spring boot', 'enterprise', 'microservices', 'jpa', 'hibernate', 'jvm'],
    projectKeywords: ['java', 'spring', 'enterprise', 'management system', 'backend', 'banking', 'portal'],
    roleSummary: 'Your Java and object-oriented backend proficiency fit enterprise Java application engineering.'
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    category: 'Data',
    icon: 'analytics',
    description: 'Extracts, transforms, analyzes, and visualizes data to uncover actionable business insights and trends.',
    essentialSkills: ['SQL', 'Python'],
    importantSkills: ['Pandas', 'NumPy', 'Data Analysis', 'Excel', 'Statistics', 'Matplotlib', 'Seaborn'],
    bonusSkills: ['Tableau', 'Power BI', 'PostgreSQL', 'Data Visualization', 'Scikit-learn'],
    domainKeywords: ['data analyst', 'analytics', 'insights', 'visualization', 'reporting', 'dashboard', 'metrics', 'trends', 'querying'],
    projectKeywords: ['analysis', 'dashboard', 'data analysis', 'visualizer', 'dataset', 'trends', 'report'],
    roleSummary: 'Your SQL, Python data handling, and analytical problem solving align with data analytics roles.'
  },
  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer',
    category: 'AI / Data Science',
    icon: 'psychology',
    description: 'Designs, trains, evaluates, and deploys predictive machine learning models and deep neural networks.',
    essentialSkills: ['Python', 'Machine Learning', 'Data Structures'],
    importantSkills: ['Scikit-learn', 'Pandas', 'NumPy', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Statistics', 'SQL'],
    bonusSkills: ['Computer Vision', 'NLP', 'Docker', 'Transformers', 'Hugging Face', 'Model Evaluation', 'MLOps'],
    domainKeywords: ['machine learning', 'ml', 'deep learning', 'neural networks', 'model', 'training', 'accuracy', 'classification', 'regression'],
    projectKeywords: ['model', 'prediction', 'classifier', 'detection', 'nlp', 'vision', 'dataset', 'recommendation'],
    roleSummary: 'Your machine learning, mathematical modeling, and Python data science foundations support ML engineering.'
  },
  {
    id: 'ai_engineer',
    title: 'AI / GenAI Engineer',
    category: 'AI / LLM',
    icon: 'smart_toy',
    description: 'Builds generative AI applications, agentic workflows, RAG pipelines, and LLM integrations.',
    essentialSkills: ['Python', 'Rest Apis', 'Git'],
    importantSkills: ['LangChain', 'OpenAI', 'LLM', 'Generative AI', 'RAG', 'Vector Database', 'Transformers'],
    bonusSkills: ['FastAPI', 'PyTorch', 'Docker', 'Hugging Face', 'Prompt Engineering'],
    domainKeywords: ['ai', 'artificial intelligence', 'genai', 'generative ai', 'llm', 'rag', 'langchain', 'embeddings', 'vector database'],
    projectKeywords: ['ai', 'chatbot', 'assistant', 'rag', 'llm', 'gpt', 'generator', 'agent'],
    roleSummary: 'Your work with Python, APIs, and modern AI/LLM tools prepares you for Generative AI development.'
  },
  {
    id: 'devops_engineer',
    title: 'DevOps & Cloud Engineer',
    category: 'Cloud / Infrastructure',
    icon: 'cloud',
    description: 'Manages cloud infrastructure, automates CI/CD deployment pipelines, and maintains system reliability.',
    essentialSkills: ['Linux', 'Docker', 'AWS'],
    importantSkills: ['Kubernetes', 'CI/CD', 'GitHub Actions', 'Terraform', 'Nginx', 'Git', 'Bash'],
    bonusSkills: ['GCP', 'Azure', 'Ansible', 'Prometheus', 'Grafana', 'Security', 'Microservices'],
    domainKeywords: ['devops', 'cloud', 'infrastructure', 'ci/cd', 'deployment', 'container', 'orchestration', 'pipeline', 'automation'],
    projectKeywords: ['deployment', 'pipeline', 'cloud', 'dockerized', 'infrastructure', 'terraform', 'cluster'],
    roleSummary: 'Your cloud computing, containerization, and automation skill set fits DevOps and infrastructure roles.'
  },
  {
    id: 'qa_engineer',
    title: 'QA / Automation Engineer',
    category: 'Testing & Quality',
    icon: 'fact_check',
    description: 'Designs automated test suites, performs integration testing, and ensures software quality standards.',
    essentialSkills: ['JavaScript', 'Python', 'Git'],
    importantSkills: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'Unit Testing', 'Integration Testing', 'Postman'],
    bonusSkills: ['CI/CD', 'Docker', 'TDD', 'BDD', 'PyTest', 'Puppeteer'],
    domainKeywords: ['qa', 'quality assurance', 'testing', 'automation', 'test suite', 'e2e', 'unit test', 'integration test', 'bug tracking'],
    projectKeywords: ['test', 'testing', 'automation', 'framework', 'suite', 'validator'],
    roleSummary: 'Your testing practices, test automation, and code validation experience match QA engineering.'
  },
  {
    id: 'mobile_developer',
    title: 'Mobile App Developer',
    category: 'Mobile',
    icon: 'smartphone',
    description: 'Builds cross-platform or native mobile applications for iOS and Android devices.',
    essentialSkills: ['JavaScript', 'Git', 'Rest Apis'],
    importantSkills: ['React Native', 'Flutter', 'TypeScript', 'Kotlin', 'Swift', 'Dart', 'Responsive Design'],
    bonusSkills: ['Redux', 'Firebase', 'Mobile UI', 'GraphQL', 'Tailwind'],
    domainKeywords: ['mobile', 'app', 'android', 'ios', 'react native', 'flutter', 'cross-platform', 'smartphone'],
    projectKeywords: ['mobile app', 'app', 'android', 'ios', 'react native', 'flutter'],
    roleSummary: 'Your mobile development, UI components, and API integration skills align with mobile engineering.'
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
  scores: null,
  analysisComplete: false,
  jobRecommendations: [],
  bestFitRole: null,
  jdText: '',
  jdMatchResult: null
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
   TEXT EXTRACTION — PDF (PDF.js)
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
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    
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

  fullText = sanitizeExtractedText(fullText.trim());
  if (!fullText || fullText.length < 20) {
    throw new Error('Unable to extract readable text from this resume. The file may be image-based/scanned. Please use a text-based PDF.');
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

  const text = sanitizeExtractedText((result.value || '').trim());
  if (!text || text.length < 20) {
    throw new Error('Unable to extract readable text from this DOCX. The document may be empty or contain only images.');
  }

  return text;
}

/* ============================================================
   TEXT SANITIZATION & BOUNDARY NORMALIZATION
   ============================================================ */
function sanitizeExtractedText(raw) {
  if (!raw) return '';
  let text = raw;

  // 1. Separate merged email and adjacent text (e.g. .comLocation -> .com \n Location)
  text = text.replace(/(\.(?:com|in|org|net|io|edu|gov|co|ai|dev|me|tech|app|xyz|info))([A-Z][a-z]+|\+?\d|\b)/g, '$1 $2');

  // 2. Separate merged URLs
  text = text.replace(/(linkedin\.com\/in\/[\w\-]+|github\.com\/[\w\-]+)([A-Z][a-z]+|\+?\d)/g, '$1 $2');

  // 3. Normalize bullet characters to standard bullet
  text = text.replace(/[\u2022\u2023\u25E6\u2043\u2219\u25AA\u25BA\u25B8]/g, '• ');

  // 4. Normalize multiple spaces on the same line without destroying line breaks
  text = text.split('\n').map(line => line.replace(/[ \t]+/g, ' ').trim()).join('\n');

  // 5. Remove excessive consecutive blank lines
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
   SECTION HEADER DETECTION
   ============================================================ */
function isSectionHeaderLine(line) {
  const clean = line.replace(/^[#*\-•\s]+/, '').trim();
  if (clean.length > 50 || clean.length < 3) return false;
  
  // Exclude inline attribute declarations (e.g. "Technologies: React, Node", "Email: ...")
  if (/^(technologies|tech|tools|languages|frontend|backend|databases|github|demo|link|credential\s*id|coursework|skills|interests|responsibilities|phone|email|location|linkedin|leetcode):\s*\S+/i.test(clean)) {
    return false;
  }
  // Exclude lines with 2 or more commas
  if ((clean.match(/,/g) || []).length >= 2) return false;
  // Exclude lines containing email or 10-digit phone
  if (/@|\+?\d{10}/.test(clean)) return false;

  return true;
}

/* ============================================================
   RESUME PARSER — SECTION DETECTION
   ============================================================ */
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
   CONTACT INFORMATION EXTRACTION & QUALITY
   ============================================================ */
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
    details: {}
  };

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const headerLines = lines.slice(0, 12);

  // 1. Email Extraction
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(?:com|org|net|edu|gov|co|in|ai|dev|me|tech|app|xyz|io|[a-z]{2,})\b/i;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    let email = emailMatch[0].trim().replace(/[.,;:)]+$/, '');
    result.email = true;
    result.details.email = email;
    
    const emailLower = email.toLowerCase();
    const isStandardDomain = /@(gmail|outlook|hotmail|yahoo|icloud|proton|protonmail|live|zoho|[\w\-]+\.(edu|ac\.\w{2}|org))\b/i.test(emailLower);
    result.isProfessionalEmail = isStandardDomain && !/test|fake|spam|temp/i.test(emailLower);
  }

  // 2. Phone Extraction (All international, Indian, US/Canada, and domestic formats)
  const phonePatterns = [
    // Labeled phone: Phone: +91 9876543210, Mob: 9876543210, Tel: (555) 123-4567, etc.
    /(?:phone|mobile|mob|cell|tel|contact|call|ph|p|m|t)\s*[:|–\-.]\s*(\+?\d{1,4}[-\s.]?(?:\(?\d{2,5}\)?[-\s.]?)?\d{2,5}[-\s.]?\d{2,5}(?:[-\s.]?\d{2,5})?)/i,
    // North American: (555) 123-4567 or +1 (555) 123-4567 or 555-123-4567
    /(?:^|[^\d\w+])((?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4})(?:[^\d\w]|$)/m,
    // +91 with 10 digits
    /(?:^|[^\d\w+])((?:\+?91[\s.-]?)?[6-9]\d{4}[\s.-]?\d{5})(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w+])((?:\+?91[\s.-]?)?[6-9]\d{9})(?:[^\d\w]|$)/m,
    // International general format +XX ... (10-15 digits)
    /(?:^|[^\d\w])(\+\d{1,4}[\s.-]?(?:\(?\d{1,5}\)?[\s.-]?)?\d{2,5}[\s.-]?\d{2,5}(?:[\s.-]?\d{2,5})?)(?:[^\d\w]|$)/m,
    // General 10-digit number
    /(?:^|[^\d\w+])([6-9]\d{4}[\s.-]?\d{5})(?:[^\d\w]|$)/m,
    /(?:^|[^\d\w+])([6-9]\d{9})(?:[^\d\w]|$)/m
  ];

  for (const p of phonePatterns) {
    const pMatch = text.match(p);
    if (pMatch) {
      const rawMatch = pMatch[1] || pMatch[0];
      const matchedStr = rawMatch.replace(/^(?:phone|mobile|mob|cell|tel|contact|call|ph|p|m|t)\s*[:|–\-.]\s*/i, '').trim();
      const digitsOnly = matchedStr.replace(/\D/g, '');
      if (digitsOnly.length >= 10 && digitsOnly.length <= 15) {
        if (!/^(?:19|20)\d{2}(?:19|20)\d{2}$/.test(digitsOnly) && !/^(?:19|20)\d{2}$/.test(digitsOnly)) {
          result.phone = true;
          result.details.phone = matchedStr.replace(/^[^\d+(]+|[^\d)]+$/g, '').trim();
          break;
        }
      }
    }
  }

  // 3. LinkedIn Extraction
  const linkedinUrlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin(?:\s*\.\s*com)?\s*\/\s*(?:in|pub)?\s*\/\s*([a-zA-Z0-9_\-\.]+)/i) ||
    text.match(/\blinkedin(?:\s*\.\s*com)?\s*\/\s*([a-zA-Z0-9_\-\.]+)/i) ||
    text.match(/\bin\/([a-zA-Z0-9_\-\.]{3,35})\b/i);

  const linkedinLabelMatch = text.match(/(?:linkedin|linked-in|\bin\b)\s*[:|–\-\/]\s*(?:https?:\/\/)?(?:www\.)?(?:linkedin(?:\s*\.\s*com)?\s*\/(?:(?:in|pub)\/)?)?([a-zA-Z0-9_\-\.]+)/i);

  if (linkedinUrlMatch) {
    const user = (linkedinUrlMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    result.linkedin = true;
    result.details.linkedin = `linkedin.com/in/${user}`;
  } else if (linkedinLabelMatch) {
    const user = (linkedinLabelMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    if (user.length >= 2 && !/^(true|false|null|undefined|yes|no)$/i.test(user)) {
      result.linkedin = true;
      result.details.linkedin = user.includes('linkedin.com') ? user : `linkedin.com/in/${user}`;
    }
  }

  // 4. GitHub Extraction
  const RESERVED_GH = ['topics', 'features', 'pricing', 'login', 'explore', 'settings', 'enterprise', 'site', 'about', 'blog', 'repo'];
  
  const githubUrlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github(?:\s*\.\s*com)?\s*\/\s*([a-zA-Z0-9_\-\.]+)/i);
  const githubLabelMatch = text.match(/(?:github|git)\s*[:|–\-\/]\s*(?:https?:\/\/)?(?:www\.)?(?:github(?:\s*\.\s*com)?\s*\/\s*)?([a-zA-Z0-9_\-\.]+)/i);

  if (githubUrlMatch) {
    const user = (githubUrlMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    if (!RESERVED_GH.includes(user.toLowerCase())) {
      result.github = true;
      result.details.github = `github.com/${user}`;
    }
  } else if (githubLabelMatch) {
    const user = (githubLabelMatch[1] || '').replace(/[.,;:)]+$/, '').trim();
    if (user.length >= 2 && !RESERVED_GH.includes(user.toLowerCase()) && !/^(true|false|null|undefined|yes|no)$/i.test(user)) {
      result.github = true;
      result.details.github = user.includes('github.com') ? user : `github.com/${user}`;
    }
  }

  // 5. Portfolio / Website Extraction
  const codingProfileMatch = text.match(/(leetcode\.com\/(u\/)?[\w\-]+|hackerrank\.com\/[\w\-]+|codeforces\.com\/profile\/[\w\-]+)/i);
  const personalSiteMatch = text.match(/\bhttps?:\/\/(?!linkedin|github|gmail|google|facebook|twitter|instagram|youtube|medium)[\w\-]+(?:\.[\w\-]+)+(?:\/[^\s,;)]*)?/i) ||
    text.match(/\b(?<![@/])([a-zA-Z0-9\-]{3,})\.(dev|io|app|me|site|page|tech|vercel\.app|netlify\.app|github\.io)\b/i);

  if (codingProfileMatch) {
    result.portfolio = true;
    result.details.portfolio = codingProfileMatch[0];
  } else if (personalSiteMatch && !/^(b\.tech|m\.tech|bachelor|master|degree|college|university)/i.test(personalSiteMatch[0])) {
    result.portfolio = true;
    result.details.portfolio = personalSiteMatch[0];
  }

  // 6. Location Detection
  const NON_LOCATION_WORDS = [
    'ai', 'ml', 'generative', 'engineer', 'developer', 'software', 'full', 'stack',
    'science', 'technology', 'university', 'college', 'school', 'intern', 'lead',
    'specialist', 'analyst', 'manager', 'architect', 'bachelor', 'master', 'tech', 'skills'
  ];

  const labeledLoc = text.match(/(?:location|address|city|residence):\s*([^\n\r,|•]+(?:,\s*[^\n\r,|•]+)*)/i);
  if (labeledLoc) {
    result.location = true;
    result.details.location = labeledLoc[1].trim();
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
            break;
          }
        }
        if (/\b(remote|hybrid|bangalore|bengaluru|mumbai|delhi|hyderabad|pune|chennai|seattle|san francisco|austin|new york)\b/i.test(token) && !/@/.test(token)) {
          result.location = true;
          result.details.location = token;
          break;
        }
      }
      if (result.location) break;
    }
  }

  // 7. Name Extraction
  for (const line of headerLines) {
    const tokens = line.split(/[|•·,]/).map(t => t.trim()).filter(Boolean);
    const candidate = tokens[0] || line;
    if (candidate.length >= 2 && candidate.length <= 35 &&
        !/@/.test(candidate) && !/\d{3}/.test(candidate) && !/\.com|\.org|\.dev/i.test(candidate) &&
        !/^(summary|experience|skills|education|projects|profile|contact|curriculum|resume|cv)/i.test(candidate) &&
        !/^(full\s*stack|software\s*engineer|developer|intern|data\s*scientist)/i.test(candidate)) {
      result.name = true;
      result.details.name = candidate;
      break;
    }
  }

  result.quality = Boolean(result.name && result.email && result.phone && result.isProfessionalEmail !== false);

  return result;
}

/* ============================================================
   SKILLS EXTRACTION — EXACT TOKEN & BOUNDARY MATCHING
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

function extractSkills(text) {
  const textLower = text.toLowerCase();
  const categorized = {};
  const allFound = [];
  const softSkillsFound = [];

  // 1. Extract technical skills by category
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
        }
      }
    }
  }

  // 2. Extract soft skills separately
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

  return { categorized, all: allFound, softSkills: softSkillsFound };
}

/* ============================================================
   1. PROFESSIONAL SUMMARY ANALYSIS (5 Points)
   ============================================================ */
function analyzeProfessionalSummary(text, parsedSections, skills) {
  const summaryText = (parsedSections.sectionContent.summary || '').trim();
  const hasSection = Boolean(parsedSections.detected.summary && summaryText.length >= 15);

  if (!hasSection) {
    return {
      exists: false,
      score: 0,
      max: 5,
      hasTargetRole: false,
      hasTechKeywords: false,
      isSpecific: false,
      isConciseAndProfessional: false,
      wordCount: 0,
      clichésFound: []
    };
  }

  const words = summaryText.split(/\s+/);
  const wordCount = words.length;

  const rolePattern = /\b(software\s*engineer|web\s*developer|full\s*stack|frontend|backend|data\s*scientist|data\s*analyst|devops\s*engineer|cloud\s*architect|software\s*developer|ai\s*engineer|ml\s*engineer|systems\s*engineer|qa\s*engineer|mobile\s*developer)\b/i;
  const hasTargetRole = rolePattern.test(summaryText);

  const techInSummary = skills.all.filter(s => {
    const r = new RegExp('\\b' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    return r.test(summaryText);
  });
  const hasTechKeywords = techInSummary.length >= 2;

  const specificityPattern = /\b(\d+\+?\s*years?|scalable|distributed|high-throughput|cloud-native|microservices|architecture|optimization|production|enterprise|specializ\w+)\b/i;
  const isSpecific = specificityPattern.test(summaryText) && techInSummary.length >= 1;

  const clichésFound = VAGUE_PHRASES.filter(vp => summaryText.toLowerCase().includes(vp));
  const isGenericStudentFluff = /\b(hardworking|motivated\s*student|looking\s*for\s*a\s*job|reputed\s*company|utilize\s*my\s*skills|seeking\s*an\s*entry\s*level|good\s*learner)\b/i.test(summaryText);

  const isConciseAndProfessional = wordCount >= 20 && wordCount <= 90 && clichésFound.length === 0 && !isGenericStudentFluff;

  let score = 1;
  if (hasTargetRole) score += 1;
  if (hasTechKeywords) score += 1;
  if (isSpecific) score += 1;
  if (isConciseAndProfessional) score += 1;

  if (isGenericStudentFluff && clichésFound.length > 0 && techInSummary.length === 0) {
    score = 1;
  }

  score = Math.min(Math.max(score, 1), 5);

  return {
    exists: true,
    score,
    max: 5,
    hasTargetRole,
    hasTechKeywords,
    isSpecific,
    isConciseAndProfessional,
    wordCount,
    clichésFound,
    text: summaryText
  };
}

/* ============================================================
   2. EXPERIENCE ANALYSIS (20 Points)
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
      max: 20,
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

  const titlePatterns = /\b(software\s*engineer|full\s*stack\s*developer|frontend\s*developer|backend\s*developer|software\s*developer|web\s*developer|intern|internship|devops\s*engineer|data\s*scientist|data\s*analyst|qa\s*engineer|sre|research\s*assistant|team\s*lead|technical\s*lead|engineering\s*lead|associate\s*engineer)\b/gi;
  const jobTitles = [...new Set((expText.match(titlePatterns) || []).map(t => t.trim()))];

  const isOnlyInternship = jobTitles.length > 0 && jobTitles.every(t => /intern/i.test(t)) && allBullets.length <= 5;

  const companyPatterns = /(?:at|@|\||,)\s*([A-Z][a-zA-Z0-9\s&.,\-]+(?:Inc|LLC|Ltd|Corp|Technologies|Solutions|Labs|Pvt|Software|Systems|Media|Group))/g;
  const companies = [...new Set((expText.match(companyPatterns) || []).map(c => c.replace(/^(?:at|@|\||,)\s*/, '').trim()))];

  const datePattern = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december|\d{4})\s*(\.?|-|–|to)\s*(\d{4}|present|current)\b/gi;
  const hasDates = datePattern.test(expText);

  const techInExp = extractSkills(expText).all;

  let score = 0;
  if (jobTitles.length > 0 || allBullets.length > 0) {
    if (isOnlyInternship) {
      score = 3;
      if (companies.length > 0 || /\b(company|inc|pvt|ltd|organization|startup|corp)\b/i.test(expText)) score += 2;
      if (hasDates) score += 1.5;
      if (techInExp.length >= 2) score += 1.5;
      if (actionVerbBullets.length >= 1) score += 1;
      if (quantifiedBullets.length >= 1) score += 1;
      score = Math.min(Math.round(score), 11);
    } else {
      score = 3;
      if (companies.length > 0 || /\b(company|inc|pvt|ltd|organization|startup|corp)\b/i.test(expText)) score += 3;
      if (jobTitles.length >= 2 || (jobTitles.length >= 1 && !isOnlyInternship)) score += 2.5;
      if (hasDates) score += 2.5;
      if (techInExp.length >= 3) score += 3;
      else if (techInExp.length >= 1) score += 1.5;

      const actionVerbRatio = allBullets.length > 0 ? (actionVerbBullets.length / allBullets.length) : 0;
      if (actionVerbRatio >= 0.5 || actionVerbBullets.length >= 3) score += 3;
      else if (actionVerbRatio >= 0.25 || actionVerbBullets.length >= 1) score += 1.5;

      const quantifiedRatio = allBullets.length > 0 ? (quantifiedBullets.length / allBullets.length) : 0;
      if (quantifiedRatio >= 0.35 || quantifiedBullets.length >= 3) score += 4;
      else if (quantifiedRatio >= 0.15 || quantifiedBullets.length >= 1) score += 2;

      score = Math.min(Math.round(score), 20);
    }
  }

  return {
    hasExperience: true,
    isFresher: false,
    score,
    max: 20,
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
   3. PROJECTS ANALYSIS (15 Points)
   ============================================================ */
function isProjectHeaderLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;

  if (/^[•\-\*►▸▪]/.test(trimmed)) return false;

  if (/^(?:project\s*#?\d*[:\-–]|featured\s*project|key\s*project|\d+[\.\)]\s+)/i.test(trimmed)) {
    return true;
  }

  if (/^(made|created|built|developed|worked|implemented|designed|engineered|assisted|helped|used|utilized|participated|this|the|it|an?|we|i|in\s*this|my|our|as\s*part|responsibilities|description|technologies|tools|languages|skills):\s*/i.test(trimmed)) {
    return false;
  }

  if (/\.\s*$/.test(trimmed) && !/\.(io|com|app|dev|me|net|org|site)\b/i.test(trimmed)) {
    return false;
  }

  if (trimmed.length < 150 && (trimmed.includes('|') || trimmed.includes('–') || /github\.com|demo|\.app|\.io|\.dev/i.test(trimmed))) {
    return true;
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 7 && trimmed.length <= 60) {
    if (/\b(project|web\s*app|application|app|dashboard|calculator|tracker|analyzer|platform|portal|utility|system|engine|bot|clone|tool|store|site|service|hub|finder|game)\b/i.test(trimmed)) {
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
      max: 15,
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
    'sub-100ms', 'latency', 'unit tests', 'dockerized', 'ci/cd', 'ast parsing'
  ];

  lines.forEach(line => {
    if (isProjectHeaderLine(line)) {
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

  let finalScore = Math.min(Math.round(totalProjectScore), 15);

  return {
    found: true,
    score: finalScore,
    max: 15,
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
  if (wordCount >= 30) depthScore = 1.5;
  else if (wordCount >= 15) depthScore = 1.0;

  const matchedDepthKeywords = depthKeywords.filter(k => fullText.toLowerCase().includes(k));
  let techDepthScore = 0;
  if (matchedDepthKeywords.length >= 3) techDepthScore = 1.8;
  else if (matchedDepthKeywords.length >= 1) techDepthScore = 1.0;

  const firstWords = proj.textLines.map(l => l.replace(/^[•\-\*►▸▪]\s*/, '').split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, ''));
  const hasStrongVerb = firstWords.some(w => ACTION_VERBS.includes(w));
  const hasWeakVerb = firstWords.some(w => WEAK_VERBS.includes(w)) || /^(made|created a simple|it was a simple)/i.test(fullText);

  let verbScore = 0.2;
  if (hasStrongVerb) verbScore = 1.0;
  else if (hasWeakVerb) verbScore = 0.1;

  let bonusScore = 0;
  if (proj.hasMetrics) bonusScore += 0.8;
  if (proj.hasGithub) bonusScore += 0.6;
  if (proj.hasDemo) bonusScore += 0.5;

  let projectScore = depthScore + techDepthScore + verbScore + bonusScore;
  if (wordCount < 15 && matchedDepthKeywords.length === 0) {
    projectScore = Math.min(projectScore, 1.2);
  }

  projectScore = Math.min(projectScore, 5);

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
   4. EDUCATION ANALYSIS (5 Points)
   ============================================================ */
function analyzeEducation(text, parsedSections) {
  const eduText = (parsedSections.sectionContent.education || '').trim();
  const hasSection = Boolean(parsedSections.detected.education);

  if (!hasSection && !/\b(b\.?tech|bachelor|master|m\.?tech|university|college|gpa)\b/i.test(text)) {
    return { exists: false, score: 0, max: 5, details: {} };
  }

  const searchScope = (eduText || text).toLowerCase();

  const degreeMatch = searchScope.match(/\b(b\.?tech|b\.?e\.?|b\.?s\.?|b\.?c\.?a\.?|m\.?tech|m\.?s\.?|m\.?c\.?a\.?|m\.?b\.?a\.?|ph\.?d|bachelor(?:'s)?|master(?:'s)?|diploma|associate|doctor)\b/i);
  const hasDegree = Boolean(degreeMatch);

  const instMatch = searchScope.match(/\b(university|institute|college|school|academy|polytechnic|iit|nit|iiit|bits)\b/i);
  const hasInstitution = Boolean(instMatch);

  const majorMatch = searchScope.match(/\b(computer\s*science|information\s*technology|software\s*engineering|electrical|electronics|data\s*science|mechanical|artificial\s*intelligence)\b/i);
  const hasMajor = Boolean(majorMatch);

  const gpaMatch = searchScope.match(/\b(cgpa|gpa|percentage|grade|honors|\d\.\d{1,2}\/\d|\d{2}%)\b/i);
  const hasAcademicDetails = Boolean(gpaMatch);

  let score = 1;
  if (hasDegree) score += 1;
  if (hasInstitution) score += 1;
  if (hasMajor) score += 1;
  if (hasAcademicDetails) score += 1;

  score = Math.min(Math.max(score, 1), 5);

  return {
    exists: true,
    score,
    max: 5,
    hasDegree,
    hasInstitution,
    hasMajor,
    hasAcademicDetails,
    degree: degreeMatch ? degreeMatch[0] : null,
    institution: instMatch ? instMatch[0] : null
  };
}

/* ============================================================
   5. CERTIFICATIONS ANALYSIS (5 Points)
   ============================================================ */
function analyzeCertifications(text, parsedSections) {
  const certText = (parsedSections.sectionContent.certifications || '').trim();
  const hasSection = Boolean(parsedSections.detected.certifications && certText.length >= 10);

  if (!hasSection) {
    return { exists: false, score: 0, max: 5, certsCount: 0, verifiedCount: 0 };
  }

  const lines = certText.split('\n').map(l => l.trim()).filter(Boolean);
  const certLower = certText.toLowerCase();

  const detectedIssuers = KNOWN_CERT_ISSUERS.filter(iss => certLower.includes(iss));
  const hasRecognizedIssuer = detectedIssuers.length > 0;

  const specificCertPattern = /\b(aws\s*certified|google\s*(cloud|data|cybersecurity)|microsoft\s*certified|azure|meta\s*front-end|certified\s*kubernetes|ckad|cka|comptia|oracle\s*certified|cisco\s*certified|ccna|developer\s*certificate|solutions\s*architect)\b/i;
  const hasSpecificCert = specificCertPattern.test(certLower);

  const isPurelyGeneric = /^(online\s*course\s*certificate|computer\s*certificate|course\s*certificate|certificate\s*of\s*completion)$/i.test(certText) ||
    (lines.length <= 2 && /^(online|computer)\s*certificate$/i.test(lines[0]) && !hasRecognizedIssuer);

  const hasDatesOrIds = /\b(20\d{2}|credential|id:|license|\.org|\.com|verify)\b/i.test(certLower);

  let score = 1;
  if (isPurelyGeneric) {
    score = 1;
  } else {
    if (hasRecognizedIssuer) score += 1;
    if (hasSpecificCert) score += 1.5;
    if (hasDatesOrIds) score += 0.5;
    if (lines.length >= 2 && hasSpecificCert) score += 1;
  }

  score = Math.min(Math.max(Math.round(score), 1), 5);

  return {
    exists: true,
    score,
    max: 5,
    certsCount: lines.length,
    hasRecognizedIssuer,
    hasSpecificCert,
    isPurelyGeneric,
    detectedIssuers
  };
}

/* ============================================================
   6. ACHIEVEMENTS ANALYSIS (5 Points)
   ============================================================ */
function analyzeAchievements(text, parsedSections) {
  const achText = (parsedSections.sectionContent.achievements || '').trim();
  const hasSection = Boolean(parsedSections.detected.achievements && achText.length >= 10);

  if (!hasSection) {
    return { exists: false, score: 0, max: 5, isGeneric: false, achievementsList: [] };
  }

  const achLower = achText.toLowerCase();

  const matchedKeywords = KNOWN_ACHIEVEMENT_KEYWORDS.filter(kw => achLower.includes(kw));
  const hasMetrics = /\b(\d+\/\d+|\d+(?:st|nd|rd|th)\s*place|rank\s*#?\d+|rating\s*#?\d+|\$\d+|top\s*\d+%|stars?)\b/i.test(achLower);

  const isGeneric = (matchedKeywords.length === 0 && !hasMetrics) ||
    /^(participated\s*in\s*college\s*events|participated\s*in\s*coding\s*activities|good\s*learner|active\s*member)\.?$/i.test(achText.trim());

  let score = 1;
  if (isGeneric) {
    score = 1;
  } else {
    if (matchedKeywords.length >= 2 || (matchedKeywords.length >= 1 && hasMetrics)) {
      score += 2.5;
    } else if (matchedKeywords.length === 1) {
      score += 1.5;
    }
    if (hasMetrics) score += 1.5;
  }

  score = Math.min(Math.max(Math.round(score), 1), 5);

  return {
    exists: true,
    score,
    max: 5,
    isGeneric,
    matchedKeywords,
    hasMetrics
  };
}

/* ============================================================
   7. CONTENT QUALITY ANALYSIS (10 Points)
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

  const metricsMatches = text.match(/\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|customers|clients|projects|teams|hours|days|ms|rps|gb|tb|mb|queries|tests|accuracy)/gi) || [];
  const metricsCount = metricsMatches.length;

  const firstPersonMatches = text.match(/\b(I|my|me|myself|we|our)\b/gi) || [];
  const firstPersonCount = firstPersonMatches.length;

  let score = 0;

  // Action Verbs (up to 3 pts)
  const actionRatio = allBullets.length > 0 ? (actionVerbCount / allBullets.length) : 0;
  if (actionRatio >= 0.5 || actionVerbCount >= 4) score += 3;
  else if (actionRatio >= 0.25 || actionVerbCount >= 2) score += 2;
  else if (actionVerbCount >= 1) score += 1;

  // Quantifiable Metrics (up to 2.5 pts)
  if (metricsCount >= 3) score += 2.5;
  else if (metricsCount >= 1) score += 1.5;

  // Vague Phrases Penalty (up to 2 pts)
  if (vagueFound.length === 0) score += 2;
  else if (vagueFound.length === 1) score += 1;

  // First-Person Pronouns Penalty (up to 1.5 pts)
  if (firstPersonCount <= 1) score += 1.5;
  else if (firstPersonCount <= 3) score += 0.5;

  // Word Count Depth (up to 1 pt)
  if (wordCount >= 250 && wordCount <= 850) score += 1;
  else if (wordCount >= 150 && wordCount <= 1100) score += 0.5;

  score = Math.min(Math.max(Math.round(score), 0), 10);

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
    max: 10,
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
   8. ATS COMPATIBILITY ANALYSIS (10 Points)
   ============================================================ */
function analyzeATSFormatting(text, parsedSections) {
  const checks = [];
  let formatScore = 0;

  // 1. Standard Section Headers (up to 2.5 pts)
  const detectedCount = Object.keys(parsedSections.detected).length;
  const hasStandardHeaders = detectedCount >= 4;
  if (hasStandardHeaders) formatScore += 2.5;
  else if (detectedCount >= 2) formatScore += 1.5;

  checks.push({
    label: 'Standard section headers detected',
    pass: hasStandardHeaders,
    detail: hasStandardHeaders ? `${detectedCount} recognizable standard sections found` : `Only ${detectedCount} standard section headings found`
  });

  // 2. Clean Text Extraction & Flow (up to 2 pts)
  const garbledPatterns = (text.match(/[^\x00-\x7F]{3,}/g) || []).length;
  const cleanFlow = garbledPatterns < 3;
  if (cleanFlow) formatScore += 2;

  checks.push({
    label: 'Clean text extraction & encoding',
    pass: cleanFlow,
    detail: cleanFlow ? 'Text extracted cleanly without character encoding issues' : 'Some non-standard encoding detected — ATS parsers may misread text'
  });

  // 3. Layout & Reading Flow (Single Consistent Check) (up to 2 pts)
  const tabOrColumnSpacings = (text.match(/[ \t]{8,}/g) || []).length;
  const isMultiColumnLayout = tabOrColumnSpacings > 10;
  const isCleanSingleColumn = !isMultiColumnLayout;

  if (isCleanSingleColumn) {
    formatScore += 2;
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
      detail: 'Multiple text regions or column structures may affect ATS reading order'
    });
  }

  // 4. No Decorative / Unparseable Characters (up to 1 pt)
  const specialChars = (text.match(/[★☆◆◇▶▷♦♣♠♥●○◎□■△▽☐☑✓✗✘✔✕✖⬡⬢⬣]/g) || []).length;
  const noDecorative = specialChars < 4;
  if (noDecorative) formatScore += 1;

  checks.push({
    label: 'No excessive decorative symbols',
    pass: noDecorative,
    detail: noDecorative ? 'Clean formatting without unparseable symbols' : `${specialChars} decorative symbols detected — ATS may reject these`
  });

  // 5. Contact Info Placement (up to 1.5 pts)
  const headerChunk = text.substring(0, 450);
  const hasContactTop = /@/.test(headerChunk) || /\d{3}/.test(headerChunk);
  if (hasContactTop) formatScore += 1.5;

  checks.push({
    label: 'Contact details in header area',
    pass: hasContactTop,
    detail: hasContactTop ? 'Contact details detected near the top of the resume' : 'Contact info not found in the initial header region'
  });

  // 6. Text Accessibility & Searchability (up to 1 pt)
  const isSelectable = text.length >= 80;
  if (isSelectable) formatScore += 1;

  checks.push({
    label: 'Text is searchable and selectable',
    pass: isSelectable,
    detail: `${text.length} characters parsed successfully`
  });

  formatScore = Math.min(Math.max(Math.round(formatScore), 0), 10);

  return {
    score: formatScore,
    max: 10,
    checks
  };
}

/* ============================================================
   TOTAL ATS SCORING ENGINE — 100 POINTS, 10 CATEGORIES
   ============================================================ */
function calculateATSScore(
  text, contactInfo, summaryAnalysis, skills,
  experienceAnalysis, projectsAnalysis, educationAnalysis,
  certificationsAnalysis, achievementsAnalysis, contentQuality, formattingAnalysis,
  jdMatchResult
) {
  // 1. Contact Information (10 pts)
  let contactPts = 0;
  if (contactInfo.name) contactPts += 1;
  if (contactInfo.email) contactPts += 2;
  if (contactInfo.phone) contactPts += 2;
  if (contactInfo.location) contactPts += 1;
  if (contactInfo.linkedin) contactPts += 1;
  if (contactInfo.github) contactPts += 1;
  if (contactInfo.portfolio) contactPts += 1;
  if (contactInfo.quality) contactPts += 1;
  contactPts = Math.min(Math.round(contactPts), 10);

  // 2. Professional Summary (5 pts)
  const summaryPts = summaryAnalysis.score;

  // 3. Skills & Keywords (15 pts)
  const totalTechSkills = skills.all.length;
  const categoriesCovered = Object.values(skills.categorized).filter(arr => arr.length > 0).length;

  let skillsPts = 0;
  if (totalTechSkills >= 15) skillsPts = 12;
  else if (totalTechSkills >= 11) skillsPts = 10;
  else if (totalTechSkills >= 7) skillsPts = 7;
  else if (totalTechSkills >= 4) skillsPts = 4.5;
  else if (totalTechSkills >= 2) skillsPts = 2.5;
  else if (totalTechSkills >= 1) skillsPts = 1.5;

  if (categoriesCovered >= 5) skillsPts += 3;
  else if (categoriesCovered >= 3) skillsPts += 1.5;
  else if (categoriesCovered >= 2) skillsPts += 0.5;

  if (jdMatchResult && jdMatchResult.totalJDKeywords > 0) {
    const jdFactor = jdMatchResult.matchScore / 100;
    skillsPts = Math.round(skillsPts * 0.5 + (jdFactor * 15) * 0.5);
  }
  skillsPts = Math.min(Math.max(Math.round(skillsPts), 0), 15);

  // 4. Experience (20 pts)
  const experiencePts = experienceAnalysis.score;

  // 5. Projects Quality (15 pts)
  const projectsPts = projectsAnalysis.score;

  // 6. Education (5 pts)
  const educationPts = educationAnalysis.score;

  // 7. Certifications (5 pts)
  const certificationsPts = certificationsAnalysis.score;

  // 8. Achievements (5 pts)
  const achievementsPts = achievementsAnalysis.score;

  // 9. Content Quality (10 pts)
  const contentQualityPts = contentQuality.score;

  // 10. ATS Formatting Safety (10 pts)
  const formattingPts = formattingAnalysis.score;

  const breakdown = {
    contact: { score: contactPts, max: 10, label: 'Contact Information' },
    summary: { score: summaryPts, max: 5, label: 'Professional Summary' },
    keywords: { score: skillsPts, max: 15, label: 'Skills & Keywords' },
    experience: { score: experiencePts, max: 20, label: 'Work Experience' },
    projects: { score: projectsPts, max: 15, label: 'Projects Quality' },
    education: { score: educationPts, max: 5, label: 'Education' },
    certifications: { score: certificationsPts, max: 5, label: 'Certifications' },
    achievements: { score: achievementsPts, max: 5, label: 'Achievements' },
    contentQuality: { score: contentQualityPts, max: 10, label: 'Content Quality' },
    formatting: { score: formattingPts, max: 10, label: 'ATS Compatibility' }
  };

  const total = Object.values(breakdown).reduce((sum, item) => sum + item.score, 0);
  const overall = Math.min(Math.max(Math.round(total), 0), 100);

  return { overall, breakdown };
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
   JOB MATCHING & RECOMMENDATION ENGINE
   ============================================================ */
function calculateJobRoleMatches(resumeData) {
  const { resumeText, skills, projectsAnalysis, experienceAnalysis, educationAnalysis } = resumeData;
  const textLower = resumeText.toLowerCase();
  const candidateSkillsLower = skills.all.map(s => s.toLowerCase());

  const hasGit = candidateSkillsLower.includes('git') || candidateSkillsLower.includes('github') || candidateSkillsLower.includes('github actions');
  const hasDocker = candidateSkillsLower.includes('docker') || candidateSkillsLower.includes('kubernetes');

  const roleMatches = [];

  JOB_ROLES_DB.forEach(role => {
    // 1. Skills Match Factor (35%)
    let essentialMatched = 0;
    const haveSkills = [];
    const missingEssential = [];
    const missingImportant = [];
    const missingBonus = [];

    role.essentialSkills.forEach(req => {
      let isPresent = candidateSkillsLower.includes(req.toLowerCase()) || matchSkillExact(req.toLowerCase(), textLower, resumeText);
      if (!isPresent && req === 'Git' && hasGit) isPresent = true;
      if (!isPresent && req === 'Docker' && hasDocker) isPresent = true;

      if (isPresent) {
        essentialMatched++;
        if (!haveSkills.includes(req)) haveSkills.push(req);
      } else {
        missingEssential.push(req);
      }
    });

    let importantMatched = 0;
    role.importantSkills.forEach(imp => {
      let isPresent = candidateSkillsLower.includes(imp.toLowerCase()) || matchSkillExact(imp.toLowerCase(), textLower, resumeText);
      if (!isPresent && imp === 'Git' && hasGit) isPresent = true;
      if (!isPresent && imp === 'Docker' && hasDocker) isPresent = true;

      if (isPresent) {
        importantMatched++;
        if (!haveSkills.includes(imp)) haveSkills.push(imp);
      } else {
        missingImportant.push(imp);
      }
    });

    let bonusMatched = 0;
    role.bonusSkills.forEach(bon => {
      let isPresent = candidateSkillsLower.includes(bon.toLowerCase()) || matchSkillExact(bon.toLowerCase(), textLower, resumeText);
      if (isPresent) {
        bonusMatched++;
        if (!haveSkills.includes(bon)) haveSkills.push(bon);
      } else {
        missingBonus.push(bon);
      }
    });

    const essentialRatio = role.essentialSkills.length > 0 ? (essentialMatched / role.essentialSkills.length) : 1;
    const importantRatio = role.importantSkills.length > 0 ? (importantMatched / Math.min(role.importantSkills.length, 3)) : 0;
    const bonusRatio = role.bonusSkills.length > 0 ? (bonusMatched / Math.min(role.bonusSkills.length, 2)) : 0;

    const skillsScore = (essentialRatio * 20) + (Math.min(importantRatio, 1) * 10) + (Math.min(bonusRatio, 1) * 5);

    // 2. Project Relevance Factor (20%)
    let projectScore = 0;
    if (projectsAnalysis.found && projectsAnalysis.count > 0) {
      let matchedProjectKeywords = 0;
      role.projectKeywords.forEach(pk => {
        if (textLower.includes(pk.toLowerCase())) matchedProjectKeywords++;
      });
      let projectTechMatched = 0;
      haveSkills.forEach(hs => {
        if (projectsAnalysis.details.some(p => (p.textLines || []).some(l => l.toLowerCase().includes(hs.toLowerCase())))) {
          projectTechMatched++;
        }
      });
      projectScore = Math.min((matchedProjectKeywords * 3.5) + (projectTechMatched * 4) + (projectsAnalysis.count >= 2 ? 4 : 2), 20);
    }

    // 3. Experience Relevance Factor (15%)
    let expScore = 0;
    if (experienceAnalysis.hasExperience && !experienceAnalysis.isFresher) {
      let matchedTitles = 0;
      experienceAnalysis.jobTitles.forEach(t => {
        if (role.domainKeywords.some(dk => t.toLowerCase().includes(dk))) matchedTitles++;
      });
      let expTechMatched = 0;
      haveSkills.forEach(hs => {
        if (experienceAnalysis.techInExperience.some(te => te.toLowerCase() === hs.toLowerCase())) expTechMatched++;
      });
      expScore = Math.min((matchedTitles * 6) + (expTechMatched * 3.5) + (experienceAnalysis.totalBullets >= 2 ? 4 : 2), 15);
    } else {
      // Fresher: Evaluates project depth and technical execution for entry-level suitability
      expScore = Math.min(Math.round(projectScore * 0.7), 13);
    }

    // 4. Education Relevance Factor (10%)
    let eduScore = 5;
    if (educationAnalysis.exists) {
      if (educationAnalysis.hasMajor) eduScore = 10;
      else if (educationAnalysis.hasDegree) eduScore = 8;
    }

    // 5. Tools & Frameworks Alignment (10%)
    const toolSkills = ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'VS Code', 'CI/CD'];
    const matchedTools = toolSkills.filter(t => candidateSkillsLower.includes(t.toLowerCase())).length;
    const toolsScore = Math.min(matchedTools * 3.5, 10);

    // 6. Domain Keywords & Summary Alignment (10%)
    let domainMatchedCount = 0;
    role.domainKeywords.forEach(dk => {
      if (textLower.includes(dk)) domainMatchedCount++;
    });
    const domainScore = Math.min(domainMatchedCount * 2.5, 10);

    // Total Match Score (0 - 100%)
    const rawTotal = skillsScore + projectScore + expScore + eduScore + toolsScore + domainScore;
    let matchScore = Math.min(Math.max(Math.round(rawTotal), 0), 100);

    // If candidate has 0 essential skills, cap maximum match score to prevent fake alignment
    if (essentialMatched === 0 && role.essentialSkills.length > 0) {
      matchScore = Math.min(matchScore, 35);
    }

    // Match Level Label
    let matchLevel = '';
    let matchColor = '';
    if (matchScore >= 90) { matchLevel = 'Excellent Match'; matchColor = '#059669'; }
    else if (matchScore >= 80) { matchLevel = 'Strong Match'; matchColor = '#10b981'; }
    else if (matchScore >= 70) { matchLevel = 'Good Match'; matchColor = '#4F46E5'; }
    else if (matchScore >= 60) { matchLevel = 'Potential Match'; matchColor = '#f59e0b'; }
    else if (matchScore >= 40) { matchLevel = 'Needs Skill Development'; matchColor = '#f97316'; }
    else { matchLevel = 'Low Match'; matchColor = 'var(--color-error)'; }

    // Application Readiness & Skill Gap
    const totalMissingCore = missingEssential.length + missingImportant.length;
    let readiness = '';
    let readinessBadge = '';
    let readinessColor = '';
    let readinessClass = '';
    let readinessMsg = '';

    const hasAllEssential = missingEssential.length === 0;
    const isWellQualified = hasAllEssential && (importantMatched >= 2 || missingImportant.length <= 1) && matchScore >= 75;

    if (isWellQualified) {
      readiness = 'READY TO APPLY';
      readinessBadge = 'Ready to Apply';
      readinessColor = '#10b981';
      readinessClass = 'readiness-ready';
      readinessMsg = `You meet all essential requirements and have strong alignment with entry-level and junior ${role.title} positions.`;
    } else if (totalMissingCore <= 3 && matchScore >= 45) {
      readiness = 'ALMOST READY';
      readinessBadge = 'Almost Job Ready';
      readinessColor = '#f59e0b';
      readinessClass = 'readiness-almost';
      const keyMissing = missingEssential.concat(missingImportant).slice(0, 2);
      readinessMsg = `You are close to being job-ready for this role. Learning ${keyMissing.join(' and ')} and building a focused project could significantly improve your eligibility.`;
    } else {
      readiness = 'NEEDS SKILL DEVELOPMENT';
      readinessBadge = 'Significant Skill Gap';
      readinessColor = '#ef4444';
      readinessClass = 'readiness-gap';
      const keyMissing = missingEssential.concat(missingImportant).slice(0, 3);
      readinessMsg = `This role currently requires substantial skill development. Build your core foundations in ${keyMissing.join(', ')} before targeting this role.`;
    }

    // Dynamic Personalized Learning Roadmap
    const roadmapSteps = [];
    const topMissing = missingEssential.concat(missingImportant).slice(0, 2);
    if (topMissing.length > 0) {
      roadmapSteps.push(`Learn & master fundamentals of ${topMissing[0]}`);
      if (topMissing.length > 1) {
        roadmapSteps.push(`Learn ${topMissing[1]} and explore standard design patterns`);
      }
      roadmapSteps.push(`Build a full-featured ${role.title} project implementing ${topMissing.join(' + ')}`);
      roadmapSteps.push(`Deploy the live project and showcase the GitHub repository on your resume`);
    } else {
      roadmapSteps.push(`Continue building production-grade ${role.title} projects`);
      roadmapSteps.push(`Contribute to open-source or complete system design exercises`);
    }

    // Why You Match Bullets
    const whyYouMatch = [];
    if (haveSkills.length > 0) {
      whyYouMatch.push(`Technical skills: ${haveSkills.slice(0, 4).join(', ')}`);
    }
    if (projectsAnalysis.count > 0 && projectScore >= 8) {
      whyYouMatch.push(`Practical project implementation aligned with ${role.category}`);
    }
    if (experienceAnalysis.hasExperience && !experienceAnalysis.isFresher) {
      whyYouMatch.push(`Relevant engineering experience and workflow familiarity`);
    } else if (educationAnalysis.hasDegree) {
      whyYouMatch.push(`Academic foundation in computer science / engineering`);
    }

    const nextSkillToLearn = topMissing[0] || (missingBonus[0] || 'System Architecture');

    roleMatches.push({
      ...role,
      matchScore,
      matchLevel,
      matchColor,
      readiness,
      readinessBadge,
      readinessColor,
      readinessClass,
      readinessMsg,
      haveSkills,
      missingEssential,
      missingImportant,
      missingBonus,
      whyYouMatch,
      nextSkillToLearn,
      roadmapSteps
    });
  });

  // Sort by match score descending
  roleMatches.sort((a, b) => b.matchScore - a.matchScore);

  const bestFit = roleMatches[0];
  const topRecommendations = roleMatches.slice(0, 6);

  return { bestFit, topRecommendations, allMatches: roleMatches };
}

/* ============================================================
   ADVANCED JOB DESCRIPTION MATCHER
   ============================================================ */
function analyzeJobDescriptionMatch(resumeData, jdText) {
  if (!jdText || jdText.trim().length < 25) return null;

  const { resumeText, skills, projectsAnalysis, experienceAnalysis, educationAnalysis } = resumeData;
  const resumeTextLower = resumeText.toLowerCase();
  const jdLower = jdText.toLowerCase();
  const candidateSkillsLower = skills.all.map(s => s.toLowerCase());

  // 1. Extract technical skills mentioned in the JD
  const jdExtracted = extractSkills(jdText);
  const rawJdSkills = [...jdExtracted.all];

  // Common technical terms check
  const COMMON_TECH_TERMS = [
    'react', 'next.js', 'vue', 'angular', 'typescript', 'javascript', 'node.js', 'express',
    'python', 'java', 'c++', 'c#', 'golang', 'go', 'rust', 'ruby', 'php', 'scala', 'kotlin', 'swift',
    'sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'cassandra',
    'graphql', 'rest apis', 'rest api', 'grpc', 'websocket', 'websockets', 'microservices',
    'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'git', 'github', 'linux',
    'aws', 'gcp', 'azure', 'cloud', 'kafka', 'rabbitmq',
    'html5', 'css3', 'tailwind', 'bootstrap', 'redux', 'jest', 'cypress',
    'data structures', 'algorithms', 'oop', 'system architecture', 'machine learning', 'ai', 'langchain'
  ];

  COMMON_TECH_TERMS.forEach(kw => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
    if (regex.test(jdText)) {
      const match = jdText.match(regex);
      rawJdSkills.push(match ? match[0] : kw);
    }
  });

  const uniqueJDSkills = [];
  const seenLower = new Set();
  rawJdSkills.forEach(s => {
    const low = s.toLowerCase();
    if (!seenLower.has(low)) {
      seenLower.add(low);
      uniqueJDSkills.push(s);
    }
  });

  // Separate into Required vs Preferred
  const requiredSkills = [];
  const preferredSkills = [];

  const reqSectionMatch = jdLower.match(/(?:requirements|must have|required qualifications|what you need|qualifications|core skills)[:\s]+([^]+?)(?:preferred|nice to have|bonus|plus|what we offer|responsibilities|$)/i);
  const prefSectionMatch = jdLower.match(/(?:preferred|nice to have|bonus|plus|good to have)[:\s]+([^]+?)(?:responsibilities|benefits|what we offer|$)/i);

  const reqText = reqSectionMatch ? reqSectionMatch[1] : '';
  const prefText = prefSectionMatch ? prefSectionMatch[1] : '';

  uniqueJDSkills.forEach(skill => {
    if (prefText && prefText.includes(skill.toLowerCase())) {
      preferredSkills.push(skill);
    } else if (reqText && reqText.includes(skill.toLowerCase())) {
      requiredSkills.push(skill);
    } else {
      // Default first half as required
      if (requiredSkills.length <= 4) requiredSkills.push(skill);
      else preferredSkills.push(skill);
    }
  });

  // Check matched vs missing
  const matchedRequired = [];
  const missingRequired = [];
  requiredSkills.forEach(s => {
    const isPresent = candidateSkillsLower.includes(s.toLowerCase()) || matchSkillExact(s.toLowerCase(), resumeTextLower, resumeText);
    if (isPresent) matchedRequired.push(s);
    else missingRequired.push(s);
  });

  const matchedPreferred = [];
  const missingPreferred = [];
  preferredSkills.forEach(s => {
    const isPresent = candidateSkillsLower.includes(s.toLowerCase()) || matchSkillExact(s.toLowerCase(), resumeTextLower, resumeText);
    if (isPresent) matchedPreferred.push(s);
    else missingPreferred.push(s);
  });

  const allMatched = [...matchedRequired, ...matchedPreferred];
  const allMissing = [...missingRequired, ...missingPreferred];

  // 2. Extract Experience Requirements
  const yearsMatch = jdText.match(/(\d+)\+?\s*years?\s*(?:of)?\s*(?:experience|working)/i);
  const yearsRequired = yearsMatch ? parseInt(yearsMatch[1]) : 0;

  let expMatchScore = 100;
  if (yearsRequired > 0) {
    if (experienceAnalysis.isFresher) {
      expMatchScore = yearsRequired <= 1 ? 75 : (yearsRequired <= 2 ? 45 : 20);
    } else {
      expMatchScore = 90;
    }
  }

  // 3. Calculate Weighted Sub-Scores
  const reqRatio = requiredSkills.length > 0 ? (matchedRequired.length / requiredSkills.length) : (allMatched.length > 0 ? 0.8 : 0.4);
  const prefRatio = preferredSkills.length > 0 ? (matchedPreferred.length / preferredSkills.length) : 1;

  const reqScore = Math.round(reqRatio * 35);
  const prefScore = Math.round(prefRatio * 15);
  const expScore = Math.round((expMatchScore / 100) * 20);
  
  // Project Relevance to JD Tech Stack
  let projMatchCount = 0;
  allMatched.forEach(s => {
    if (projectsAnalysis.details.some(p => (p.textLines || []).some(l => l.toLowerCase().includes(s.toLowerCase())))) {
      projMatchCount++;
    }
  });
  const projScore = Math.min(Math.round((projMatchCount / Math.max(allMatched.length, 1)) * 15) + (projectsAnalysis.count > 0 ? 4 : 0), 15);

  const eduScore = educationAnalysis.exists ? 5 : 2;
  const keywordScore = Math.min(Math.round((allMatched.length / Math.max(uniqueJDSkills.length, 1)) * 10), 10);

  const totalMatchScore = Math.min(Math.max(reqScore + prefScore + expScore + projScore + eduScore + keywordScore, 0), 100);

  // 4. Compatibility Status & Realistic Answer
  let statusBadge = '';
  let statusAnswer = '';
  let statusDesc = '';
  let statusClass = '';
  let statusColor = '';

  if (totalMatchScore >= 85) {
    statusBadge = '🟢 Strong Match';
    statusAnswer = 'Yes — your resume aligns exceptionally well with this role.';
    statusDesc = 'You satisfy almost all core requirements, tech stacks, and domain qualifications.';
    statusClass = 'match-strong';
    statusColor = '#059669';
  } else if (totalMatchScore >= 70) {
    statusBadge = '🟢 Good Match';
    statusAnswer = 'Yes — you meet many of the important requirements.';
    statusDesc = 'Your background is competitive. Addressing the minor missing tools will further elevate your application.';
    statusClass = 'match-good';
    statusColor = '#4F46E5';
  } else if (totalMatchScore >= 55) {
    statusBadge = '🟡 Partial Match';
    statusAnswer = 'You can apply, but you have noticeable skill gaps.';
    statusDesc = 'You have a foundation in related technologies, but several essential requirements in the job description are missing.';
    statusClass = 'match-partial';
    statusColor = '#f59e0b';
  } else if (totalMatchScore >= 40) {
    statusBadge = '🟠 Skill Gap';
    statusAnswer = 'You can apply as a stretch candidate, but multiple key requirements are missing.';
    statusDesc = 'Consider building targeted projects with the missing technologies before submitting your application.';
    statusClass = 'match-gap';
    statusColor = '#f97316';
  } else {
    statusBadge = '🔴 Low Match';
    statusAnswer = 'This role currently has a substantial gap with your profile.';
    statusDesc = 'The position requires tools, frameworks, and qualifications that are not yet represented on your resume.';
    statusClass = 'match-low';
    statusColor = 'var(--color-error)';
  }

  // 5. Action Plan
  const actionPlan = [];
  if (missingRequired.length > 0) {
    actionPlan.push(`Learn and gain hands-on practice with core required skill(s): ${missingRequired.slice(0, 2).join(', ')}`);
  }
  if (missingPreferred.length > 0) {
    actionPlan.push(`Familiarize yourself with preferred tool(s): ${missingPreferred.slice(0, 2).join(', ')}`);
  }
  actionPlan.push(`Build or adapt a project demonstrating implementation of the target tech stack`);
  actionPlan.push(`Add the project to your GitHub repository and link it on your resume`);

  return {
    matchScore: totalMatchScore,
    statusBadge,
    statusAnswer,
    statusDesc,
    statusClass,
    statusColor,
    factors: {
      requiredSkills: { score: reqScore, max: 35, label: 'Required Skills Match' },
      preferredSkills: { score: prefScore, max: 15, label: 'Preferred Skills Match' },
      experience: { score: expScore, max: 20, label: 'Experience Match' },
      projects: { score: projScore, max: 15, label: 'Project Relevance' },
      education: { score: eduScore, max: 5, label: 'Education Match' },
      keywords: { score: keywordScore, max: 10, label: 'Keyword Match' }
    },
    matchedRequired,
    missingRequired,
    matchedPreferred,
    missingPreferred,
    allMatched,
    allMissing,
    yearsRequired,
    actionPlan
  };
}

/* ============================================================
   IMPROVEMENT SUGGESTIONS GENERATOR
   ============================================================ */
function generateSuggestions(
  contactInfo, parsedSections, summaryAnalysis, skills,
  experienceAnalysis, projectsAnalysis, educationAnalysis,
  certificationsAnalysis, achievementsAnalysis, contentQuality, scores
) {
  const suggestions = [];

  if (!contactInfo.email) {
    suggestions.push({ priority: 'high', icon: 'mail', title: 'Add Professional Email', desc: 'A valid email address is mandatory for recruiter contact.' });
  }
  if (!contactInfo.phone) {
    suggestions.push({ priority: 'high', icon: 'phone', title: 'Add Phone Number', desc: 'Include a direct contact phone number with country code.' });
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
      after: 'Example: "Full Stack Engineer with 2+ years of experience specializing in React, Node.js, and cloud architectures."'
    });
  }

  if (experienceAnalysis.isFresher || !experienceAnalysis.hasExperience) {
    suggestions.push({
      priority: 'high', icon: 'work', title: 'Highlight Practical Experience or Internships',
      desc: 'If you have completed internships, open-source work, freelance gigs, or research assistant roles, list them under Experience to demonstrate practical capability.'
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
        desc: `Only ${Math.round(experienceAnalysis.quantifiedRatio * 100)}% of bullets include metrics. Add numbers where real data exists (e.g., "Reduced response latency by 40%").`
      });
    }
  }

  if (!projectsAnalysis.found || projectsAnalysis.count === 0) {
    suggestions.push({ priority: 'high', icon: 'rocket_launch', title: 'Add Technical Projects', desc: 'Include 2-3 detailed projects demonstrating end-to-end implementation, tech stack, and live demos.' });
  } else {
    const weakProjects = projectsAnalysis.details.filter(p => p.isWeak);
    if (weakProjects.length > 0) {
      suggestions.push({
        priority: 'high', icon: 'build', title: 'Add Technical Depth to Projects',
        desc: `Project descriptions like "${weakProjects[0].name}" lack technical substance. Explain the problem, architecture, state management, APIs, and key features.`,
        before: weakProjects[0].name,
        after: 'Describe: Architecture + Tech Stack + Challenges Solved + Performance / Results'
      });
    }
    if (!projectsAnalysis.hasGithubLinks) {
      suggestions.push({ priority: 'medium', icon: 'link', title: 'Add GitHub Links to Projects', desc: 'Link to your public repositories so recruiters can review code quality and git habits.' });
    }
  }

  if (skills.all.length < 6) {
    suggestions.push({ priority: 'high', icon: 'psychology', title: 'Expand Technical Skills Section', desc: `Only ${skills.all.length} technical skills detected. Group skills into Languages, Frameworks, Databases, and Cloud/Tools.` });
  }

  if (certificationsAnalysis.isPurelyGeneric) {
    suggestions.push({ priority: 'medium', icon: 'verified', title: 'Specify Certification Details', desc: 'Replace generic "Computer Certificate" with the specific title, issuing organization (e.g. AWS, Google), and completion date.' });
  }
  if (achievementsAnalysis.isGeneric) {
    suggestions.push({ priority: 'medium', icon: 'military_tech', title: 'Quantify Achievements', desc: 'Include specific contest rankings, hackathon awards, scholarships, or measurable milestones.' });
  }

  if (contentQuality.vagueFound.length > 0) {
    suggestions.push({
      priority: 'medium', icon: 'find_replace', title: 'Remove Cliché Phrases',
      desc: `Phrases like "${contentQuality.vagueFound[0]}" add no ATS value. Replace with concrete tools and results.`
    });
  }

  return suggestions;
}

/* ============================================================
   MAIN ANALYSIS ORCHESTRATOR
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

    // Step 1: Extract text
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

    // Step 2: Parse sections
    const parsedSections = parseResumeSections(resumeText);
    analyzerState.parsedData = parsedSections;

    // Step 3: Extract and analyze categories
    const contactInfo = extractContactInfo(resumeText);
    const skills = extractSkills(resumeText);
    const summaryAnalysis = analyzeProfessionalSummary(resumeText, parsedSections, skills);
    const experienceAnalysis = analyzeExperience(resumeText, parsedSections.sectionContent);
    const projectsAnalysis = analyzeProjects(resumeText, parsedSections.sectionContent);
    const educationAnalysis = analyzeEducation(resumeText, parsedSections);
    const certificationsAnalysis = analyzeCertifications(resumeText, parsedSections);
    const achievementsAnalysis = analyzeAchievements(resumeText, parsedSections);
    const contentQuality = analyzeContentQuality(resumeText, experienceAnalysis, projectsAnalysis);
    const formattingAnalysis = analyzeATSFormatting(resumeText, parsedSections);

    // Step 4: Calculate deterministic 100-point score across 10 categories
    const scores = calculateATSScore(
      resumeText, contactInfo, summaryAnalysis, skills,
      experienceAnalysis, projectsAnalysis, educationAnalysis,
      certificationsAnalysis, achievementsAnalysis, contentQuality,
      formattingAnalysis, null
    );

    // Step 5: Generate suggestions
    const suggestions = generateSuggestions(
      contactInfo, parsedSections, summaryAnalysis, skills,
      experienceAnalysis, projectsAnalysis, educationAnalysis,
      certificationsAnalysis, achievementsAnalysis, contentQuality, scores
    );

    // Step 6: Calculate Job Matches & Best Fit Role
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
    const jobMatchData = calculateJobRoleMatches(resumeData);
    analyzerState.jobRecommendations = jobMatchData.topRecommendations;
    analyzerState.bestFitRole = jobMatchData.bestFit;

    // Step 7: Optional JD Match if already input
    let jdMatchResult = null;
    const jdTextarea = document.getElementById('jd-textarea-enhanced-input');
    const existingJD = jdTextarea?.value?.trim() || analyzerState.jdText;
    if (existingJD && existingJD.length > 25) {
      jdMatchResult = analyzeJobDescriptionMatch(resumeData, existingJD);
      analyzerState.jdMatchResult = jdMatchResult;
    }

    // Full analysis result bundle
    const analysisResult = {
      timestamp: new Date().toISOString(),
      fileName: analyzerState.fileName,
      fileType: analyzerState.fileType,
      fileSize: analyzerState.fileSize,
      fromBuilder: analyzerState.fromBuilder,
      resumeText,
      scores,
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

    // Save to storage
    saveAnalysisResult(analysisResult);

    // Render all results (ATS analysis + Best Fit + Job Recommendations + JD Matcher)
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
   RESULT RENDERER (Preserves existing UI structure & CSS classes)
   ============================================================ */
function renderAllResults(result) {
  const area = document.getElementById('analyzer-results-area');
  if (!area) return;

  const interp = getScoreInterpretation(result.scores.overall);
  const bd = result.scores.breakdown;

  area.innerHTML = `
    <!-- Analyzed File Info -->
    <div class="analyzer-file-info-bar" id="analyzed-file-bar">
      <span class="material-symbols-outlined text-emerald-500 text-[22px]" style='font-variation-settings: "FILL" 1;'>task_alt</span>
      <div class="file-preview-info">
        <div class="file-preview-name">${escHtml(result.fileName || 'Resume')}</div>
        <div class="file-preview-meta">${escHtml(result.fileSize || '')} · Analyzed ${timeAgo(result.timestamp)}</div>
      </div>
      <button class="btn-secondary btn-sm" id="btn-reanalyze-real">
        <span class="material-symbols-outlined text-[14px]">refresh</span>
        Re-analyze
      </button>
    </div>

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
        <div class="score-hero-disclaimer">Score is calculated directly from extracted text, technical depth, action verbs, and quantifiable metrics.</div>
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
            <span class="analyzer-card-score">${bd.contact.score}/${bd.contact.max}</span>
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
            <span class="analyzer-card-score">${bd.summary.score}/${bd.summary.max}</span>
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
            <span class="analyzer-card-score">${bd.experience.score}/${bd.experience.max}</span>
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
            <span class="analyzer-card-score">${bd.keywords.score}/${bd.keywords.max}</span>
          </div>
          ${renderSkillsSection(result.skills)}
        </div>

        <!-- Projects Analysis -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>rocket_launch</span>
            <h3 class="analyzer-card-title">Projects Analysis</h3>
            <span class="analyzer-card-score">${bd.projects.score}/${bd.projects.max}</span>
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
            <h3 class="analyzer-card-title">Education, Certifications & Achievements</h3>
            <span class="analyzer-card-score">${bd.education.score + bd.certifications.score + bd.achievements.score}/15</span>
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

    <!-- ============================================================ -->
    <!-- SECTION 1: 🏆 BEST FIT FOR YOUR RESUME                         -->
    <!-- ============================================================ -->
    ${renderBestFitRole(result.bestFitRole)}

    <!-- ============================================================ -->
    <!-- SECTION 2: 🎯 RECOMMENDED JOBS FOR YOU                        -->
    <!-- ============================================================ -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-emerald-500" style='font-variation-settings: "FILL" 1;'>work_outline</span>
        <h3 class="analyzer-card-title">🎯 Recommended Jobs For You</h3>
        <span class="badge badge-neutral" style="font-size:10px;padding:2px 6px;">${result.jobRecommendations.length} roles</span>
      </div>
      <p class="jd-instructions">Based on your resume, skills, projects, education, experience, and technical profile.</p>
      <div class="job-recommendations-grid">
        ${renderJobRecommendations(result.jobRecommendations)}
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- SECTION 3: 🔍 CHECK YOUR RESUME AGAINST A JOB                 -->
    <!-- ============================================================ -->
    <div class="analyzer-section-card" id="jd-matcher-section">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>manage_search</span>
        <h3 class="analyzer-card-title">🔍 Check Your Resume Against a Job</h3>
        <span class="badge badge-neutral" style="font-size:10px;padding:2px 6px;">JD Matcher</span>
      </div>
      <p class="jd-instructions">Paste any complete Job Description below to evaluate your compatibility, skill gaps, and application readiness.</p>
      
      <div class="jd-matcher-container">
        <div class="jd-matcher-input-area">
          <textarea id="jd-textarea-enhanced-input" class="jd-textarea-enhanced" placeholder="Paste the complete job description here (including requirements, responsibilities, and qualifications)...">${escHtml(analyzerState.jdText || '')}</textarea>
          <button class="btn-primary btn-sm" id="btn-run-jd-match-enhanced" style="width:100%;">
            <span class="material-symbols-outlined text-[16px]">compare_arrows</span>
            Analyze Job Match
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

    // Animate breakdown bars
    area.querySelectorAll('.breakdown-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target;
    });

    // Animate job recommendation bars
    area.querySelectorAll('.job-rec-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target;
    });
  }, 150);

  // Bind event handlers
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
   SUB-RENDERERS — JOB MATCHES & BEST FIT ROLE
   ============================================================ */
function renderBestFitRole(bestFit) {
  if (!bestFit) return '';

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
        </div>
        <div class="best-fit-score-box">
          <div class="best-fit-score-num">${bestFit.matchScore}%</div>
          <div class="best-fit-score-label">${escHtml(bestFit.matchLevel)}</div>
        </div>
      </div>
      
      <div class="section-group-label" style="margin-bottom:0.5rem;">Why this is your strongest match:</div>
      <div class="best-fit-reasons-list">
        ${bestFit.whyYouMatch.map(r => `
          <div class="best-fit-reason-item">
            <span class="material-symbols-outlined text-emerald-500 text-[16px]" style='font-variation-settings: "FILL" 1;'>check_circle</span>
            <span>${escHtml(r)}</span>
          </div>
        `).join('')}
      </div>

      <div class="best-fit-next-skill">
        <span class="material-symbols-outlined text-amber-500 text-[18px]">bolt</span>
        <div><strong>Top skill to learn next:</strong> ${escHtml(bestFit.nextSkillToLearn)} — Adding this will maximize your job readiness for ${escHtml(bestFit.title)} positions.</div>
      </div>
    </div>
  `;
}

function renderJobRecommendations(recommendations) {
  if (!recommendations || recommendations.length === 0) {
    return '<p class="no-data-text">Not enough information to confidently recommend technical roles. Add more skills and projects.</p>';
  }

  return recommendations.map(role => `
    <div class="job-rec-card">
      <div class="job-rec-header">
        <div class="job-rec-title-wrap">
          <div class="job-rec-role-title">${escHtml(role.title)}</div>
          <div class="job-rec-role-category">${escHtml(role.category)}</div>
        </div>
        <div class="job-rec-match-badge">
          <div class="job-rec-match-percent" style="color:${role.matchColor};">${role.matchScore}%</div>
          <div class="job-rec-match-level" style="color:${role.matchColor};">${escHtml(role.matchLevel)}</div>
        </div>
      </div>

      <div class="job-rec-bar-bg">
        <div class="job-rec-bar-fill" style="width: 0%; background: ${role.matchColor};" data-target="${role.matchScore}%"></div>
      </div>

      <div class="readiness-badge ${role.readinessClass}">
        <span class="material-symbols-outlined text-[13px]">${role.readiness === 'READY TO APPLY' ? 'check_circle' : (role.readiness === 'ALMOST READY' ? 'pending' : 'error')}</span>
        <span>${escHtml(role.readinessBadge)}</span>
      </div>

      <div class="job-rec-skills-section">
        <!-- Skills You Have -->
        <div class="job-rec-skill-group">
          <div class="job-rec-skill-group-label">Skills You Have (${role.haveSkills.length})</div>
          <div class="job-rec-pills">
            ${role.haveSkills.length
              ? role.haveSkills.slice(0, 5).map(s => `<span class="skill-tag-have"><span class="material-symbols-outlined text-[11px]">check</span>${escHtml(s)}</span>`).join('')
              : '<span class="check-missing-text text-[11px]">None detected yet</span>'}
          </div>
        </div>

        <!-- Missing Skills -->
        ${(role.missingEssential.length > 0 || role.missingImportant.length > 0) ? `
          <div class="job-rec-skill-group" style="margin-top:0.35rem;">
            <div class="job-rec-skill-group-label">Skills You Are Missing</div>
            <div class="job-rec-pills">
              ${role.missingEssential.slice(0, 2).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-high">HIGH</span>${escHtml(s)}</span>`).join('')}
              ${role.missingImportant.slice(0, 2).map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-med">MED</span>${escHtml(s)}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Roadmap Box -->
      <div class="job-rec-roadmap-box">
        <div class="job-rec-roadmap-header">
          <span class="material-symbols-outlined text-[15px]">trending_up</span>
          <span>Personalized Roadmap</span>
        </div>
        <div class="job-rec-roadmap-steps">
          ${role.roadmapSteps.slice(0, 3).map((step, idx) => `
            <div class="roadmap-step-item">
              <span class="roadmap-step-num">${idx + 1}</span>
              <span>${escHtml(step)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderJDMatchResults(jdResult) {
  if (!jdResult) return '';

  return `
    <!-- Hero Status Banner -->
    <div class="jd-results-hero ${jdResult.statusClass}">
      <div>
        <div class="jd-status-badge" style="color:${jdResult.statusColor};">${escHtml(jdResult.statusBadge)}</div>
        <div class="jd-status-answer">${escHtml(jdResult.statusAnswer)}</div>
        <div class="jd-status-desc">${escHtml(jdResult.statusDesc)}</div>
      </div>
      <div class="jd-score-circle-wrap">
        <div class="jd-score-circle-num" style="color:${jdResult.statusColor};">${jdResult.matchScore}%</div>
        <div class="jd-score-circle-lbl">JD Match</div>
      </div>
    </div>

    <!-- Match Factors Grid -->
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

    <!-- Two Column Gap Details -->
    <div class="analyzer-details-grid" style="margin-bottom:1rem;">
      <!-- Matched Skills -->
      <div class="analyzer-section-card" style="margin-bottom:0;">
        <div class="analyzer-card-header">
          <span class="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
          <h4 class="analyzer-card-title">Why You Match (${jdResult.allMatched.length})</h4>
        </div>
        <div class="job-rec-pills" style="margin-top:0.5rem;">
          ${jdResult.allMatched.length
            ? jdResult.allMatched.map(s => `<span class="skill-tag-have"><span class="material-symbols-outlined text-[11px]">check</span>${escHtml(s)}</span>`).join('')
            : '<span class="no-data-text">No direct skills matched from this job description.</span>'}
        </div>
      </div>

      <!-- Missing Skills -->
      <div class="analyzer-section-card" style="margin-bottom:0;">
        <div class="analyzer-card-header">
          <span class="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
          <h4 class="analyzer-card-title">What You're Missing (${jdResult.allMissing.length})</h4>
        </div>
        <div class="job-rec-pills" style="margin-top:0.5rem;">
          ${jdResult.missingRequired.map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-high">REQUIRED</span>${escHtml(s)}</span>`).join('')}
          ${jdResult.missingPreferred.map(s => `<span class="skill-tag-missing"><span class="skill-priority-tag priority-tag-med">PREFERRED</span>${escHtml(s)}</span>`).join('')}
          ${jdResult.allMissing.length === 0 ? '<span class="no-issues-text">All key requirements in this job description were found on your resume!</span>' : ''}
        </div>
      </div>
    </div>

    <!-- Action Plan Box -->
    <div class="job-rec-roadmap-box" style="background:var(--color-surface);border:1.5px solid rgba(79, 70, 229, 0.25);">
      <div class="job-rec-roadmap-header">
        <span class="material-symbols-outlined text-indigo-500 text-[18px]">assignment_turned_in</span>
        <span style="font-size:0.875rem;">Action Plan: How To Become Eligible For This Role</span>
      </div>
      <div class="job-rec-roadmap-steps" style="margin-top:0.5rem;">
        ${jdResult.actionPlan.map((step, idx) => `
          <div class="roadmap-step-item">
            <span class="roadmap-step-num">${idx + 1}</span>
            <span style="font-size:0.8125rem;">${escHtml(step)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function executeEnhancedJDMatch(analysisResult) {
  const jdTextarea = document.getElementById('jd-textarea-enhanced-input');
  const jdText = jdTextarea?.value?.trim();

  if (!jdText || jdText.length < 25) {
    showToast('Please paste a complete job description (at least a few lines).', 'error');
    return;
  }

  analyzerState.jdText = jdText;

  const resumeData = {
    resumeText: analyzerState.resumeText,
    skills: analysisResult.skills,
    projectsAnalysis: analysisResult.projectsAnalysis,
    experienceAnalysis: analysisResult.experienceAnalysis,
    educationAnalysis: analysisResult.educationAnalysis
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

  showToast(`JD Match: ${matchResult.matchScore}% · ${matchResult.statusBadge.replace(/^[^\s]+\s*/, '')}`, matchResult.matchScore >= 70 ? 'success' : 'info');
}

/* ============================================================
   SUB-RENDERERS — ATS ANALYSIS
   ============================================================ */
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
    } else {
      checks.push({ pass: false, label: 'Professional summary is generic / lacks technical keywords' });
    }
  } else {
    checks.push({ pass: false, label: 'Professional summary section missing' });
  }

  if (exp.isFresher || !exp.hasExperience) {
    checks.push({ pass: false, label: 'No professional work experience detected (Fresher candidate)' });
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

  if (cq.metricsCount === 0) {
    checks.push({ pass: false, label: 'No quantifiable metrics or measurable achievements detected' });
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
  if (exp.isFresher || !exp.hasExperience) {
    return `
      <div class="exp-detail-note" style="margin-top:0.5rem;">
        <span class="material-symbols-outlined text-amber-500 text-[18px]">info</span>
        <span>No professional work experience detected (Fresher candidate). Ensure your projects and certifications provide strong practical evidence.</span>
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
      <span class="skills-count">${skills.all.length} technical skills detected</span>
    </div>
    ${categories.map(([cat, arr]) => `
      <div class="skill-category-section">
        <div class="skill-category-label">${formatCategoryName(cat)}</div>
        <div class="skills-pill-group">${arr.map(s => `<span class="skill-pill-found"><span class="material-symbols-outlined" style="font-size:11px;">check</span>${escHtml(s)}</span>`).join('')}</div>
      </div>
    `).join('')}
    ${skills.softSkills && skills.softSkills.length > 0 ? `
      <div class="skill-category-section" style="margin-top:0.75rem;">
        <div class="skill-category-label" style="color:var(--color-outline);">Soft Skills (Separated from Tech Score)</div>
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
        <div class="check-label">Education (${edu.score}/5)</div>
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
        <div class="check-label">Achievements & Awards (${ach.score}/5)</div>
        <div class="check-detail">${achPass ? `Recognized achievement (${ach.matchedKeywords.slice(0, 2).join(', ')})` : (ach.isGeneric ? 'Generic participation statements' : (ach.exists ? 'Achievements detected' : 'Optional / Not detected'))}</div>
      </div>
    </div>
  `;
}

/* ============================================================
   PERSISTENCE
   ============================================================ */
function saveAnalysisResult(result) {
  try {
    const toSave = {
      timestamp: result.timestamp,
      fileName: result.fileName,
      fileType: result.fileType,
      fileSize: result.fileSize,
      fromBuilder: result.fromBuilder,
      scores: result.scores,
      contactInfo: result.contactInfo,
      parsedSections: result.parsedSections,
      summaryAnalysis: result.summaryAnalysis,
      skills: { all: result.skills.all.slice(0, 30), categorized: result.skills.categorized, softSkills: result.skills.softSkills },
      experienceAnalysis: {
        hasExperience: result.experienceAnalysis.hasExperience,
        isFresher: result.experienceAnalysis.isFresher,
        score: result.experienceAnalysis.score,
        max: result.experienceAnalysis.max,
        totalBullets: result.experienceAnalysis.totalBullets,
        actionVerbCount: result.experienceAnalysis.actionVerbCount,
        weakVerbCount: result.experienceAnalysis.weakVerbCount,
        quantifiedCount: result.experienceAnalysis.quantifiedCount,
        quantifiedRatio: result.experienceAnalysis.quantifiedRatio,
        actionVerbRatio: result.experienceAnalysis.actionVerbRatio,
        jobTitles: result.experienceAnalysis.jobTitles,
        hasDates: result.experienceAnalysis.hasDates,
        companies: result.experienceAnalysis.companies,
        techInExperience: result.experienceAnalysis.techInExperience.slice(0, 15),
        weakBullets: [],
        strongBullets: []
      },
      projectsAnalysis: result.projectsAnalysis,
      educationAnalysis: result.educationAnalysis,
      certificationsAnalysis: result.certificationsAnalysis,
      achievementsAnalysis: result.achievementsAnalysis,
      contentQuality: result.contentQuality,
      formattingChecks: result.formattingChecks,
      suggestions: result.suggestions,
      bestFitRole: result.bestFitRole,
      jobRecommendations: result.jobRecommendations,
      jdMatchResult: result.jdMatchResult,
      wordCount: result.wordCount
    };
    Storage.set(ANALYZER_STORAGE_KEY, toSave);
  } catch (e) {
    console.warn('Failed to save analysis result:', e);
  }
}

function loadAnalysisResult() {
  return Storage.get(ANALYZER_STORAGE_KEY, null);
}

function clearAnalysisResult() {
  Storage.remove(ANALYZER_STORAGE_KEY);
  analyzerState = {
    file: null, fileName: '', fileSize: '', fileType: '',
    fromBuilder: false, resumeText: '', parsedData: null,
    scores: null, analysisComplete: false, jobRecommendations: [],
    bestFitRole: null, jdText: '', jdMatchResult: null
  };
}

/* ============================================================
   RESTORE SAVED ANALYSIS ON LOAD
   ============================================================ */
function restoreSavedAnalysis() {
  const saved = loadAnalysisResult();
  if (!saved || !saved.scores) return;

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
   ANALYZER CONTROLS INITIALIZATION
   ============================================================ */
function initRealAnalyzerControls() {
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
      } else if (analyzerState.fromBuilder) {
        runRealAnalysis(true);
      } else {
        showToast('Please upload a resume file or use your Builder resume first.', 'error');
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

  showToast(`File "${file.name}" loaded. Click Analyze to continue.`, 'info');
}

function resetAnalyzerState() {
  const fileInput = document.getElementById('file-upload-input');
  if (fileInput) fileInput.value = '';

  const strip = document.getElementById('file-preview-strip');
  if (strip) strip.style.display = 'none';

  const resultsArea = document.getElementById('analyzer-results-area');
  if (resultsArea) { resultsArea.style.display = 'none'; resultsArea.innerHTML = ''; }

  clearAnalysisResult();
  showToast('File removed. Upload a new resume to analyze.', 'info');
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

// Export for testing in Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
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
    calculateJobRoleMatches,
    analyzeJobDescriptionMatch,
    getScoreInterpretation,
    JOB_ROLES_DB
  };
}
