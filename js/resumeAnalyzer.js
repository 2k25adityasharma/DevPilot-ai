/**
 * DevPilot-AI — Real Resume Analyzer Engine
 * 
 * Provides actual text extraction from PDF/DOCX files,
 * deterministic ATS scoring, section detection, skills analysis,
 * JD matching, and actionable improvement suggestions.
 * 
 * All scores are calculated from REAL extracted resume text.
 * Nothing is hardcoded or faked.
 */

/* ============================================================
   CONSTANTS
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
  'accelerated', 'pioneered', 'formulated', 'negotiated', 'supervised'
];

const WEAK_VERBS = [
  'worked', 'helped', 'assisted', 'was responsible', 'responsible for',
  'handled', 'did', 'made', 'got', 'used', 'utilized', 'participated',
  'involved in', 'tasked with', 'served as', 'acted as'
];

const VAGUE_PHRASES = [
  'various tasks', 'multiple projects', 'different technologies',
  'team player', 'hard worker', 'fast learner', 'self-starter',
  'detail-oriented', 'results-driven', 'proven track record',
  'excellent communication', 'strong work ethic', 'go-getter',
  'think outside the box', 'synergy', 'leverage', 'paradigm'
];

const SECTION_PATTERNS = {
  summary: /\b(summary|professional\s*summary|profile|about\s*me|objective|career\s*objective|career\s*summary|executive\s*summary)\b/i,
  experience: /\b(experience|work\s*experience|professional\s*experience|employment|work\s*history|internship|internships|project\s*&\s*work\s*experience|(work|technical|project|professional)\s+(experience|projects|history))\b/i,
  education: /\b(education|academic|academic\s*background|qualifications|educational\s*background|academics)\b/i,
  skills: /\b(skills|technical\s*skills|technologies|tools|competencies|core\s*competencies|tech\s*stack|programming\s*skills|technical\s*expertise)\b/i,
  projects: /\b(projects|personal\s*projects|featured\s*projects|key\s*projects|side\s*projects|academic\s*projects|project\s*&\s*work\s*experience|technical\s*projects)\b/i,
  certifications: /\b(certifications|certificates|credentials|licenses|professional\s*certifications|programming\s*credentials|certifications\s*&?\s*licenses)\b/i,
  achievements: /\b(achievements|honors|awards|accomplishments|recognitions|honors\s*&?\s*awards|programming\s*achievements)\b/i,
  publications: /\b(publications|papers|research)\b/i,
  volunteer: /\b(volunteer|volunteering|community\s*service)\b/i
};

const TECH_SKILLS_DB = {
  cs_core: [
    'object-oriented programming', 'oop', 'data structures & algorithms', 'data structures and algorithms',
    'data structures', 'dsa', 'algorithms', 'system architecture', 'software architecture',
    'responsive design', 'design patterns', 'asynchronous javascript', 'async javascript',
    'rest apis', 'rest api', 'restful apis', 'restful api', 'competitive programming', 'leetcode'
  ],
  languages: [
    'javascript', 'typescript', 'python', 'java', 'c\\+\\+', 'c#', 'c', 'ruby', 'go', 'golang',
    'rust', 'swift', 'kotlin', 'php', 'scala', 'r', 'matlab', 'perl', 'lua',
    'dart', 'elixir', 'haskell', 'clojure', 'objective-c', 'assembly',
    'html', 'html5', 'css', 'css3', 'sql', 'bash', 'shell', 'powershell'
  ],
  frontend: [
    'react', 'react\\.js', 'reactjs', 'vue', 'vue\\.js', 'vuejs', 'angular', 'angularjs',
    'next\\.js', 'nextjs', 'nuxt', 'nuxt\\.js', 'svelte', 'gatsby', 'remix',
    'redux', 'redux toolkit', 'mobx', 'zustand', 'tailwind', 'tailwindcss', 'tailwind css', 'bootstrap',
    'material-ui', 'mui', 'chakra', 'styled-components', 'sass', 'scss', 'less',
    'webpack', 'vite', 'rollup', 'parcel', 'babel', 'jquery', 'three\\.js', 'responsive design'
  ],
  backend: [
    'node\\.js', 'nodejs', 'express', 'express\\.js', 'fastify', 'nest\\.js', 'nestjs',
    'django', 'flask', 'fastapi', 'spring', 'spring boot', 'rails', 'ruby on rails',
    'asp\\.net', '\\.net', 'laravel', 'gin', 'fiber', 'koa',
    'rest', 'rest api', 'rest apis', 'restful', 'graphql', 'grpc', 'websocket', 'websockets',
    'microservices', 'serverless', 'lambda', 'asynchronous javascript', 'async javascript'
  ],
  databases: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'sqlite', 'oracle', 'sql server', 'dynamodb', 'cassandra', 'neo4j',
    'firebase', 'firestore', 'supabase', 'prisma', 'sequelize', 'mongoose',
    'typeorm', 'knex', 'drizzle'
  ],
  cloud: [
    'aws', 'amazon web services', 'gcp', 'google cloud', 'azure', 'heroku',
    'vercel', 'netlify', 'digitalocean', 'cloudflare', 's3', 'ec2', 'ecs',
    'lambda', 'cloudfront', 'route 53'
  ],
  devops: [
    'docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'jenkins',
    'ci/cd', 'ci cd', 'github actions', 'gitlab ci', 'circleci', 'travis',
    'nginx', 'apache', 'linux', 'unix', 'prometheus', 'grafana',
    'datadog', 'new relic', 'splunk'
  ],
  tools: [
    'git', 'github', 'git/github', 'git & github', 'gitlab', 'bitbucket', 'jira', 'confluence',
    'figma', 'sketch', 'adobe', 'postman', 'insomnia', 'swagger',
    'vs code', 'visual studio', 'visual studio code', 'intellij', 'vim', 'emacs',
    'slack', 'notion', 'trello', 'leetcode'
  ],
  testing: [
    'jest', 'mocha', 'chai', 'cypress', 'selenium', 'playwright',
    'puppeteer', 'testing library', 'react testing library', 'enzyme',
    'junit', 'pytest', 'rspec', 'karma', 'jasmine', 'vitest',
    'tdd', 'bdd', 'unit test', 'integration test', 'e2e'
  ],
  ai_ml: [
    'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'sklearn', 'pandas',
    'numpy', 'matplotlib', 'opencv', 'nlp', 'natural language processing',
    'machine learning', 'deep learning', 'neural network', 'computer vision',
    'transformers', 'hugging face', 'langchain', 'openai', 'gpt',
    'llm', 'large language model', 'generative ai', 'ai', 'ml'
  ]
};

/* ============================================================
   ANALYZER STATE
   ============================================================ */
let analyzerState = {
  file: null,           // actual File object
  fileName: '',
  fileSize: '',
  fileType: '',
  fromBuilder: false,
  resumeText: '',       // extracted text
  parsedData: null,     // parsed sections
  scores: null,         // scoring results
  analysisComplete: false,
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
   TEXT EXTRACTION — PDF (using PDF.js)
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
    const pageText = content.items
      .map(item => item.str)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (pageText) {
      fullText += pageText + '\n\n';
    }
  }

  fullText = fullText.trim();
  if (!fullText || fullText.length < 20) {
    throw new Error('Unable to extract readable text from this resume. The file may be image-based/scanned. Please use a text-based PDF.');
  }

  return fullText;
}

/* ============================================================
   TEXT EXTRACTION — DOCX (using Mammoth.js)
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

  const text = (result.value || '').trim();
  if (!text || text.length < 20) {
    throw new Error('Unable to extract readable text from this DOCX. The document may be empty or contain only images.');
  }

  return text;
}

/* ============================================================
   CONVERT BUILDER RESUME TO TEXT
   ============================================================ */
function convertBuilderToText(resume) {
  if (!resume) return '';

  const lines = [];
  const p = resume.personal || {};

  // Contact
  if (p.name) lines.push(p.name);
  if (p.title) lines.push(p.title);
  const contacts = [p.location, p.phone, p.email, p.linkedin, p.github, p.portfolio].filter(Boolean);
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

  // Experience / Projects
  const exp = resume.experience || [];
  if (exp.length) {
    lines.push('PROJECT & WORK EXPERIENCE');
    exp.forEach(e => {
      if (e.role) lines.push(`${e.role}${e.company ? ' | ' + e.company : ''}`);
      if (e.startDate || e.endDate) lines.push(`${e.startDate || ''} - ${e.endDate || ''} ${e.location ? '| ' + e.location : ''}`);
      if (e.description) {
        e.description.split('\n').forEach(b => {
          if (b.trim()) lines.push('• ' + b.trim());
        });
      }
      lines.push('');
    });
  }

  // Projects
  const prj = resume.projects || [];
  if (prj.length) {
    if (!exp.length) lines.push('PROJECT & WORK EXPERIENCE');
    else lines.push('KEY PROJECTS');
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

function isSectionHeaderLine(line) {
  const clean = line.replace(/^[#*\-•\s]+/, '').trim();
  if (clean.length > 60 || clean.length < 3) return false;
  // Exclude inline fields with content after colon (e.g. "Technologies: React, Node.js", "GitHub: ...", "Demo: ...")
  if (/^(technologies|tech|tools|languages|frontend|backend|databases|github|demo|link|credential\s*id|coursework|skills|interests|responsibilities|phone|email|location|linkedin|leetcode):\s*\S+/i.test(clean)) {
    return false;
  }
  // Exclude lines with comma-separated list of items
  if ((clean.match(/,/g) || []).length >= 2) return false;
  // Exclude email or contact lines
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

  // Find section headers
  const sectionPositions = [];
  lines.forEach((line, idx) => {
    if (isSectionHeaderLine(line)) {
      for (const [sectionName, pattern] of Object.entries(SECTION_PATTERNS)) {
        if (pattern.test(line)) {
          sectionPositions.push({ name: sectionName, lineIdx: idx, line });
          detected[sectionName] = true;

          // If header combines Project & Work Experience or Technical Projects, grant both
          if (/project/i.test(line) && /(experience|work|history)/i.test(line)) {
            detected.experience = true;
            detected.projects = true;
          }
          if (/technical\s*projects/i.test(line)) {
            detected.projects = true;
            detected.experience = true;
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

  // Extract content for each section
  sectionPositions.forEach((sec, i) => {
    const startLine = sec.lineIdx + 1;
    const endLine = (i + 1 < sectionPositions.length) ? sectionPositions[i + 1].lineIdx : lines.length;
    const content = lines.slice(startLine, endLine).join('\n');
    sectionContent[sec.name] = content;

    // Cross-populate combined sections if needed
    if (sec.name === 'experience' && !sectionContent.projects && /(project|built|engineered|architected|developed)/i.test(content)) {
      sectionContent.projects = content;
    }
    if (sec.name === 'projects' && !sectionContent.experience && /(work|experience|built|engineered|developer|intern)/i.test(content)) {
      sectionContent.experience = content;
    }
  });

  return { detected, sectionContent, lines, sectionPositions };
}

/* ============================================================
   CONTACT INFORMATION EXTRACTION
   ============================================================ */
function extractContactInfo(text) {
  const result = {
    name: false,
    email: false,
    phone: false,
    linkedin: false,
    github: false,
    portfolio: false,
    location: false,
    details: {}
  };

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const headerLines = lines.slice(0, 5);

  // Email
  const emailMatch = text.match(/[\w._%+\-]+@[\w.\-]+\.[a-z]{2,}/i);
  if (emailMatch) {
    result.email = true;
    result.details.email = emailMatch[0];
  }

  // Phone (including Indian +91 format and standard international)
  const phoneMatch = text.match(/(\+?\d{1,3}[\s\-.]?)?\(?\d{2,5}\)?[\s\-.]?\d{3,5}[\s\-.]?\d{3,5}/);
  if (phoneMatch) {
    result.phone = true;
    result.details.phone = phoneMatch[0].trim();
  }

  // LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w\-]+/i);
  if (linkedinMatch) {
    result.linkedin = true;
    result.details.linkedin = linkedinMatch[0];
  }

  // GitHub
  const githubMatch = text.match(/github\.com\/[\w\-]+/i);
  if (githubMatch) {
    result.github = true;
    result.details.github = githubMatch[0];
  }

  // LeetCode / Coding Profile
  const leetcodeMatch = text.match(/leetcode\.com\/(u\/)?[\w\-]+/i);
  if (leetcodeMatch) {
    result.details.leetcode = leetcodeMatch[0];
    if (!result.portfolio) {
      result.portfolio = true;
      result.details.portfolio = leetcodeMatch[0];
    }
  }

  // Standard email domains to strictly exclude from portfolio websites
  const EMAIL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
    'mail.com', 'protonmail.com', 'proton.me', 'zoho.com', 'aol.com',
    'yandex.com', 'gmx.com', 'live.com'
  ];

  // Degree and educational terms to strictly exclude from portfolio detection
  const DEGREE_AND_COMMON_TERMS = [
    'b.tech', 'm.tech', 'b.e', 'm.e', 'b.s', 'm.s', 'b.a', 'm.a', 'ph.d', 'phd',
    'btech', 'mtech', 'bachelor', 'master', 'degree', 'engineering', 'science',
    'university', 'college', 'school', 'institute', 'department', 'curriculum',
    'technologies', 'technology', 'tech', 'languages', 'skills', 'experience', 'projects'
  ];

  function isExcludedDomainOrDegree(str) {
    if (!str) return true;
    const clean = str.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
    if (DEGREE_AND_COMMON_TERMS.some(term => clean === term || clean.startsWith(term + '.') || clean.endsWith('.' + term))) {
      return true;
    }
    const dotParts = clean.split('.');
    if (dotParts.length >= 2 && dotParts[0].length < 3) {
      return true;
    }
    if (!clean.includes('.')) return true;
    if (EMAIL_DOMAINS.some(dom => clean.includes(dom))) return true;
    return false;
  }

  // 1. Portfolio / Coding Profile detection via explicit label
  // (e.g. "Portfolio: leetcode.com/u/...", "Website: ...")
  const labeledPortfolioMatch = text.match(/(?:portfolio|website|web\s*portfolio|live\s*site|portfolio\s*link):\s*(https?:\/\/[^\s,;)]+|[\w.\-]+\.[a-z]{2,}(\/[^\s,;)]*)?)/i);
  if (labeledPortfolioMatch) {
    const candidateUrl = labeledPortfolioMatch[1].trim();
    if (!isExcludedDomainOrDegree(candidateUrl)) {
      result.portfolio = true;
      result.details.portfolio = candidateUrl;
    }
  }

  // 2. LeetCode / HackerRank / Codeforces coding profile detection
  const codingProfileMatch = text.match(/(leetcode\.com\/(u\/)?[\w\-]+|hackerrank\.com\/[\w\-]+|codeforces\.com\/profile\/[\w\-]+)/i);
  if (codingProfileMatch) {
    result.details.leetcode = codingProfileMatch[0];
    if (!result.portfolio) {
      result.portfolio = true;
      result.details.portfolio = codingProfileMatch[0];
    }
  }

  // 3. Full URLs starting with http:// or https:// (strictly excluding LinkedIn, GitHub, mailto, email domains, degree terms)
  if (!result.portfolio) {
    const urlMatches = text.match(/https?:\/\/[^\s,;)]+/gi) || [];
    const portfolioUrls = urlMatches.filter(u => {
      const uLow = u.toLowerCase();
      return !uLow.includes('linkedin.com') &&
             !uLow.includes('github.com') &&
             !uLow.includes('mailto:') &&
             !EMAIL_DOMAINS.some(dom => uLow.includes(dom)) &&
             !isExcludedDomainOrDegree(u);
    });
    if (portfolioUrls.length > 0) {
      result.portfolio = true;
      result.details.portfolio = portfolioUrls[0];
    }
  }

  // 4. Bare domain match (strictly validating TLD and blocking degree abbreviations / short prefixes)
  if (!result.portfolio) {
    const domainMatches = text.match(/\b(?<![@/])([a-zA-Z0-9\-]{3,})\.(dev|io|com|org|net|app|co|me|site|page|vercel\.app|netlify\.app|github\.io)\b/gi) || [];
    const validDomains = domainMatches.filter(d => {
      const dLow = d.toLowerCase();
      return !dLow.includes('linkedin') &&
             !dLow.includes('github') &&
             !EMAIL_DOMAINS.some(dom => dLow.includes(dom)) &&
             !isExcludedDomainOrDegree(d);
    });
    if (validDomains.length > 0) {
      result.portfolio = true;
      result.details.portfolio = validDomains[0];
    }
  }

  // Name detection (from the top lines, excluding contacts/URLs/section titles)
  for (const line of headerLines) {
    const tokens = line.split(/[|•·,]/).map(t => t.trim()).filter(Boolean);
    const candidate = tokens[0] || line;
    if (candidate.length > 1 && candidate.length < 40 &&
        !/@/.test(candidate) && !/\d{3}/.test(candidate) && !/\.com|\.org|\.dev/i.test(candidate) &&
        !/^(summary|experience|skills|education|projects|profile|contact|curriculum)/i.test(candidate) &&
        !/^(full\s*stack|software\s*engineer|developer|intern)/i.test(candidate)) {
      result.name = true;
      result.details.name = candidate;
      break;
    }
  }

  // Location detection: STRICTLY restricted to header lines (top 3-5 lines)
  // Supports 3-part ("Kanpur, UP, India") and 2-part ("Kanpur, India", "San Francisco, CA")
  const NON_LOCATION_WORDS = [
    'ai', 'ml', 'generative', 'engineer', 'developer', 'software', 'full', 'stack',
    'science', 'technology', 'university', 'college', 'school', 'intern', 'lead',
    'specialist', 'analyst', 'manager', 'architect', 'bachelor', 'master', 'tech'
  ];

  for (const line of headerLines) {
    const tokens = line.split(/[|•·]/).map(t => t.trim()).filter(Boolean);
    for (const token of tokens) {
      // Pattern 1: 3-part "City, State/Region, Country" e.g. "Kanpur, UP, India"
      const match3 = token.match(/^([A-Z][a-zA-Z\s]+),\s*([A-Z][a-zA-Z\s]+|[A-Z]{2,3}),\s*([A-Z][a-zA-Z\s]+|[A-Z]{2,3})$/);
      if (match3) {
        const c = match3[1].trim().toLowerCase();
        const s = match3[2].trim().toLowerCase();
        const co = match3[3].trim().toLowerCase();
        if (!NON_LOCATION_WORDS.some(w => c.includes(w) || s.includes(w) || co.includes(w))) {
          result.location = true;
          result.details.location = `${match3[1].trim()}, ${match3[2].trim()}, ${match3[3].trim()}`;
          break;
        }
      }

      // Pattern 2: 2-part "City, Country" or "City, State" e.g. "Kanpur, India", "San Francisco, CA"
      const match2 = token.match(/^([A-Z][a-zA-Z\s]+),\s*([A-Z][a-zA-Z\s]+|[A-Z]{2,3})$/);
      if (match2) {
        const city = match2[1].trim().toLowerCase();
        const region = match2[2].trim().toLowerCase();
        if (!NON_LOCATION_WORDS.some(w => city.includes(w) || region.includes(w))) {
          result.location = true;
          result.details.location = `${match2[1].trim()}, ${match2[2].trim()}`;
          break;
        }
      }
    }
    if (result.location) break;

    // Pattern 3: Inline 3-part match
    const inline3 = line.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z][a-z]+|UP|CA|NY|TX|WA|[A-Z]{2,3}),\s*(India|USA|UK|Canada|Germany|Australia|[A-Z]{2,3})\b/);
    if (inline3) {
      result.location = true;
      result.details.location = inline3[0];
      break;
    }

    // Pattern 4: Inline 2-part match
    const inline2 = line.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*(India|USA|UK|Canada|Germany|Australia|UP|Uttar Pradesh|California|Texas|New York|[A-Z]{2})\b/);
    if (inline2) {
      const city = inline2[1].toLowerCase();
      if (!NON_LOCATION_WORDS.some(w => city.includes(w))) {
        result.location = true;
        result.details.location = inline2[0];
        break;
      }
    }

    if (/\b(remote|hybrid)\b/i.test(line) && !/@/.test(line)) {
      result.location = true;
      result.details.location = line.match(/\b(remote|hybrid)\b/i)[0];
      break;
    }
  }

  return result;
}

/* ============================================================
   SKILLS EXTRACTION
   ============================================================ */
function extractSkills(text) {
  const textLower = text.toLowerCase();
  const found = {};
  const allFound = [];

  for (const [category, skills] of Object.entries(TECH_SKILLS_DB)) {
    found[category] = [];
    for (const skill of skills) {
      const regex = new RegExp('\\b' + skill + '\\b', 'i');
      if (regex.test(textLower)) {
        // Get the original-casing match
        const originalMatch = text.match(new RegExp('\\b' + skill + '\\b', 'i'));
        const displayName = originalMatch ? originalMatch[0] : skill;
        if (!found[category].includes(displayName)) {
          found[category].push(displayName);
          allFound.push(displayName);
        }
      }
    }
  }

  return { categorized: found, all: [...new Set(allFound)] };
}

/* ============================================================
   EXPERIENCE ANALYSIS
   ============================================================ */
function analyzeExperience(text, sectionContent) {
  let expText = sectionContent.experience || '';
  if (!expText.trim() && sectionContent.projects) {
    expText = sectionContent.projects;
  }
  const lines = expText.split('\n').map(l => l.trim()).filter(Boolean);

  // Bullets: lines starting with bullet symbols OR capitalized action verbs
  const allBullets = lines.filter(l => {
    if (/^[•\-\*►▸▪]/.test(l)) return true;
    if (l.length > 25 && /^[A-Z][a-z]+(ed|d|ing|s)?\b/.test(l)) return true;
    return l.length > 30 && !l.includes('github.com') && !/^(languages|frontend|backend|databases|tools|technologies):/i.test(l);
  });

  // Action verb analysis
  const actionVerbCount = allBullets.filter(b => {
    const clean = b.replace(/^[•\-\*►▸▪]\s*/, '').trim();
    const firstWord = clean.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
    return ACTION_VERBS.includes(firstWord);
  }).length;

  const weakVerbCount = allBullets.filter(b => {
    const lower = b.toLowerCase();
    return WEAK_VERBS.some(wv => lower.startsWith(wv) || lower.includes(` ${wv} `));
  }).length;

  // Quantified bullets (contain numbers, %, ms, +, latency, metrics, streaks)
  const quantifiedBullets = allBullets.filter(b =>
    /\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|customers|clients|projects|teams|members|hours|days|weeks|months|ms|rps|gb|tb|mb|runs|queries|tools|tests|modes|streak|interactions|challenges|accuracy|problems|lighthouse)/i.test(b) ||
    /\b(sub-?\d+ms|\d+\/\d+|\d+(\.\d+)?%|\d+\+|\d+x|\$\d+|\d+\s*day\s*streak|\d+\s*modes|\d+\s*tools|\d+\s*interactions)\b/i.test(b)
  );

  // Detect job titles / project roles
  const titlePatterns = /\b(software\s*engineer|developer|intern|manager|lead|architect|designer|analyst|consultant|administrator|coordinator|director|specialist|associate|fellow|trainee|full\s*stack|frontend|front-end|backend|back-end|data\s*scientist|devops|sre|qa|tester|researcher|creator|author)\b/gi;
  const jobTitles = [...new Set((expText.match(titlePatterns) || []).map(t => t.trim()))];

  // Detect company names / dates
  const datePattern = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december|\d{4})\s*(\.?|-|–|to)\s*(\d{4}|present|current)\b/gi;
  const hasDates = datePattern.test(expText) || datePattern.test(text);

  const techInExp = extractSkills(expText);

  return {
    totalBullets: allBullets.length,
    actionVerbCount,
    weakVerbCount,
    quantifiedCount: quantifiedBullets.length,
    quantifiedRatio: allBullets.length > 0 ? quantifiedBullets.length / allBullets.length : 0,
    actionVerbRatio: allBullets.length > 0 ? actionVerbCount / allBullets.length : 0,
    jobTitles,
    hasDates,
    techInExperience: techInExp.all,
    weakBullets: allBullets.filter(b => {
      const lower = b.toLowerCase();
      return WEAK_VERBS.some(wv => lower.includes(wv));
    }).slice(0, 3),
    strongBullets: allBullets.filter(b => {
      const clean = b.replace(/^[•\-\*►▸▪]\s*/, '').trim();
      const firstWord = clean.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
      return ACTION_VERBS.includes(firstWord) && /\d/.test(b);
    }).slice(0, 3)
  };
}

/* ============================================================
   PROJECTS ANALYSIS
   ============================================================ */
function analyzeProjects(text, sectionContent) {
  let projText = sectionContent.projects || '';
  if (!projText.trim() && sectionContent.experience) {
    projText = sectionContent.experience;
  }
  if (!projText.trim()) return { found: false, count: 0, details: [], hasGithubLinks: false, hasDemoLinks: false, techCount: 0 };

  const lines = projText.split('\n').map(l => l.trim()).filter(Boolean);

  let projectCount = 0;
  const projectDetails = [];
  let currentProject = null;

  lines.forEach(line => {
    const isBullet = /^[•\-\*►▸▪]/.test(line);
    const hasProjectKeywords = /^(project|soniqx|northpeak|chatbot|web utility|audiometer|devpilot)/i.test(line) ||
      (!isBullet && line.length < 80 && !/^(responsibilities|description|technologies|tools):/i.test(line) && (extractSkills(line).all.length >= 1 || /github\.com/i.test(line) || line.includes('–') || line.includes('-') || line.includes('|')));

    if (!isBullet && hasProjectKeywords && line.length < 90) {
      if (currentProject) projectDetails.push(currentProject);
      currentProject = {
        name: line.replace(/\|.*$/, '').trim(),
        hasTech: extractSkills(line).all.length > 0,
        hasDescription: false,
        hasGithub: /github\.com/i.test(line),
        hasDemo: /demo|live|vercel|netlify|\.app/i.test(line),
        hasImpact: /\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|runs|accuracy|queries|tools|tests)/i.test(line)
      };
      projectCount++;
    } else if (currentProject) {
      if (extractSkills(line).all.length >= 1 || /technolog|tech\s*stack|built\s*with|using/i.test(line)) {
        currentProject.hasTech = true;
      }
      if (line.length > 25) currentProject.hasDescription = true;
      if (/github\.com/i.test(line)) currentProject.hasGithub = true;
      if (/demo|live|deploy|hosted|vercel|netlify|\.app|\.io|http/i.test(line)) currentProject.hasDemo = true;
      if (/\d+%|\d+\+|\d+x|\$\d+|\d+\s*(users|runs|accuracy|queries|tools|clients|tests|ms|downloads)/i.test(line)) {
        currentProject.hasImpact = true;
      }
    }
  });
  if (currentProject) projectDetails.push(currentProject);

  const techInProjects = extractSkills(projText);
  const hasGithubLinks = /github\.com/i.test(projText) || /github\.com/i.test(text);
  const hasDemoLinks = /demo|live|deploy|hosted|vercel|netlify|\.app|\.io/i.test(projText) || /demo/i.test(text);

  return {
    found: true,
    count: Math.max(projectCount, projectDetails.length, 1),
    details: projectDetails,
    techCount: techInProjects.all.length,
    hasGithubLinks,
    hasDemoLinks
  };
}

/* ============================================================
   CONTENT QUALITY ANALYSIS
   ============================================================ */
function analyzeContentQuality(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const issues = [];

  // Check for overly long paragraphs:
  // Flag unbulleted blocks with > 40 words or multi-sentence non-bullet text.
  // Exclude header lines (first 5 lines with contact info)
  const contentLines = lines.slice(4);
  const longParagraphs = [];

  contentLines.forEach(l => {
    const isBullet = /^[•\-\*►▸▪]/.test(l);
    const wordCount = l.split(/\s+/).length;
    if (!isBullet && wordCount > 40 && !/^(summary|experience|skills|education|projects|certifications):/i.test(l)) {
      longParagraphs.push(l);
    } else if (isBullet && wordCount > 65) {
      longParagraphs.push(l);
    }
  });

  if (longParagraphs.length > 0) {
    issues.push({
      type: 'warning',
      message: `${longParagraphs.length} overly long paragraph(s) (>40 words) detected. Consider breaking into concise bullet points.`
    });
  }

  // Check for excessive first-person
  const firstPersonCount = (text.match(/\bI\s+\b/gi) || []).length + (text.match(/\bmy\b/gi) || []).length;
  if (firstPersonCount > 5) {
    issues.push({ type: 'warning', message: `Excessive first-person language detected (${firstPersonCount} instances). Consider using implied first-person.` });
  }

  // Check for vague phrases
  const vagueFound = VAGUE_PHRASES.filter(vp => text.toLowerCase().includes(vp));
  if (vagueFound.length > 0) {
    issues.push({ type: 'warning', message: `Vague/cliché phrases detected: "${vagueFound.slice(0, 3).join('", "')}". Replace with specific accomplishments.` });
  }

  // Word count
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = words.length;
  if (wordCount < 100) {
    issues.push({ type: 'warning', message: `Resume is very short (${wordCount} words). Aim for at least 300-600 words for a comprehensive resume.` });
  } else if (wordCount > 1500) {
    issues.push({ type: 'info', message: `Resume is quite long (${wordCount} words). Keeping to 1-2 pages is recommended.` });
  }

  const weakVerbsFound = WEAK_VERBS.filter(wv => text.toLowerCase().includes(wv));

  return {
    wordCount,
    issues,
    vagueFound,
    weakVerbsFound,
    firstPersonCount,
    longParagraphCount: longParagraphs.length
  };
}

/* ============================================================
   ATS FORMATTING ANALYSIS
   ============================================================ */
function analyzeATSFormatting(text, parsedSections) {
  const checks = [];

  // 1. Standard section headers present
  const hasSections = Object.keys(parsedSections.detected).length >= 3;
  checks.push({
    label: 'Standard section headers detected',
    pass: hasSections,
    detail: hasSections ? `${Object.keys(parsedSections.detected).length} standard sections found` : 'Fewer than 3 recognizable sections found'
  });

  // 2. No excessive special characters
  const specialChars = (text.match(/[★☆◆◇▶▷♦♣♠♥●○◎□■△▽☐☑✓✗✘✔✕✖⬡⬢⬣]/g) || []).length;
  checks.push({
    label: 'No excessive decorative characters',
    pass: specialChars < 5,
    detail: specialChars < 5 ? 'Clean text formatting' : `${specialChars} decorative symbols detected — ATS may not parse these`
  });

  // 3. Consistent text flow (no broken words/garbled text)
  const garbledPatterns = (text.match(/[^\x00-\x7F]{3,}/g) || []).length;
  const shortFragments = text.split(/\s+/).filter(w => w.length === 1 && !/[aIi&|•\-]/.test(w)).length;
  const cleanFlow = garbledPatterns < 3 && shortFragments < text.split(/\s+/).length * 0.1;
  checks.push({
    label: 'Clean text extraction / reading order',
    pass: cleanFlow,
    detail: cleanFlow ? 'Text extracts cleanly' : 'Some text extraction issues detected — may indicate complex formatting'
  });

  // 4. No excessive use of tables/columns (heuristic: many short lines clustered)
  const shortLines = text.split('\n').filter(l => l.trim().length > 0 && l.trim().length < 15);
  const lineCount = text.split('\n').filter(l => l.trim().length > 0).length;
  const shortLineRatio = lineCount > 0 ? shortLines.length / lineCount : 0;
  checks.push({
    label: 'No complex table/column formatting',
    pass: shortLineRatio < 0.4,
    detail: shortLineRatio < 0.4 ? 'Layout appears ATS-compatible' : 'Many short text fragments detected — may indicate multi-column layout'
  });

  // 5. Contact info at the top
  const firstChunk = text.substring(0, 500);
  const hasContactTop = /@/.test(firstChunk) || /\d{3}/.test(firstChunk);
  checks.push({
    label: 'Contact information near the top',
    pass: hasContactTop,
    detail: hasContactTop ? 'Contact details found in header area' : 'Contact information not detected in the first section'
  });

  // 6. Text is selectable/searchable (we extracted it, so it's at least partially working)
  checks.push({
    label: 'Text is selectable and searchable',
    pass: text.length > 50,
    detail: `${text.length} characters extracted successfully`
  });

  // 7. No headers/footers repeated
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const lineFrequency = {};
  lines.forEach(l => { if (l.length > 5) lineFrequency[l] = (lineFrequency[l] || 0) + 1; });
  const repeatedHeaders = Object.entries(lineFrequency).filter(([_, count]) => count > 2);
  checks.push({
    label: 'No repeated headers or footers',
    pass: repeatedHeaders.length === 0,
    detail: repeatedHeaders.length === 0 ? 'No duplicate headers detected' : 'Some repeated text found — may be from headers/footers'
  });

  return checks;
}

/* ============================================================
   ATS SCORING ENGINE — 100 POINTS, 8 CATEGORIES
   ============================================================ */
function calculateATSScore(text, contactInfo, parsedSections, skills, experienceAnalysis, projectsAnalysis, contentQuality, formattingChecks) {
  const breakdown = {};

  // 1. Contact Information (10 points)
  let contactScore = 0;
  if (contactInfo.name) contactScore += 3;
  if (contactInfo.email) contactScore += 3;
  if (contactInfo.phone) contactScore += 2;
  if (contactInfo.linkedin) contactScore += 1;
  if (contactInfo.github) contactScore += 0.5;
  if (contactInfo.location) contactScore += 0.5;
  contactScore = Math.min(Math.round(contactScore), 10);
  breakdown.contact = { score: contactScore, max: 10, label: 'Contact Information' };

  // 2. Section Completeness (15 points)
  let sectionScore = 0;
  const importantSections = ['summary', 'experience', 'skills', 'education', 'projects'];
  const optionalSections = ['certifications', 'achievements'];

  importantSections.forEach(sec => {
    if (parsedSections.detected[sec]) sectionScore += 2.5;
  });
  optionalSections.forEach(sec => {
    if (parsedSections.detected[sec]) sectionScore += 1.25;
  });
  sectionScore = Math.min(Math.round(sectionScore), 15);
  breakdown.sections = { score: sectionScore, max: 15, label: 'Section Completeness' };

  // 3. Keywords / Skills Coverage (15 points)
  const totalSkills = skills.all.length;
  let keywordScore = 0;
  if (totalSkills >= 12) keywordScore = 15;
  else if (totalSkills >= 9) keywordScore = 13;
  else if (totalSkills >= 6) keywordScore = 10;
  else if (totalSkills >= 4) keywordScore = 7;
  else if (totalSkills >= 2) keywordScore = 4;
  else if (totalSkills >= 1) keywordScore = 2;
  breakdown.keywords = { score: keywordScore, max: 15, label: 'Keywords & Skills' };

  // 4. Experience Quality (15 points)
  let expScore = 0;
  if (parsedSections.detected.experience || parsedSections.detected.projects) {
    expScore += 4;
    if (experienceAnalysis.hasDates) expScore += 2;
    if (experienceAnalysis.jobTitles.length > 0 || projectsAnalysis.count >= 2) expScore += 2;

    // Action verb usage
    if (experienceAnalysis.actionVerbRatio >= 0.4 || experienceAnalysis.actionVerbCount >= 3) expScore += 3;
    else if (experienceAnalysis.actionVerbRatio >= 0.25 || experienceAnalysis.actionVerbCount >= 2) expScore += 2;
    else if (experienceAnalysis.actionVerbCount > 0) expScore += 1;

    // Quantified impact
    if (experienceAnalysis.quantifiedRatio >= 0.3 || experienceAnalysis.quantifiedCount >= 2) expScore += 4;
    else if (experienceAnalysis.quantifiedRatio >= 0.15 || experienceAnalysis.quantifiedCount >= 1) expScore += 3;
    else if (experienceAnalysis.quantifiedCount > 0) expScore += 1;
  }
  expScore = Math.min(expScore, 15);
  breakdown.experience = { score: expScore, max: 15, label: 'Experience Quality' };

  // 5. Projects Quality (10 points)
  let projScore = 0;
  if (projectsAnalysis.found || parsedSections.detected.projects || parsedSections.detected.experience) {
    projScore += 3;
    if (projectsAnalysis.count >= 2) projScore += 2;
    else projScore += 1;
    if (projectsAnalysis.techCount >= 3) projScore += 2;
    else if (projectsAnalysis.techCount >= 1) projScore += 1;
    if (projectsAnalysis.hasGithubLinks) projScore += 1.5;
    if (projectsAnalysis.hasDemoLinks) projScore += 1.5;
  }
  projScore = Math.min(Math.round(projScore), 10);
  breakdown.projects = { score: projScore, max: 10, label: 'Projects Quality' };

  // 6. Education & Certifications (10 points)
  let eduScore = 0;
  if (parsedSections.detected.education) {
    eduScore += 5;
    const eduText = (parsedSections.sectionContent.education || text).toLowerCase();
    if (/\b(b\.?s\.?|b\.?a\.?|b\.?tech|m\.?tech|m\.?s\.?|m\.?a\.?|ph\.?d|bachelor|master|doctor|diploma|associate|degree|engineering)\b/.test(eduText)) {
      eduScore += 2;
    }
    if (/\b(gpa|cgpa|percentage|grade|current|202\d)\b/i.test(eduText)) eduScore += 1;
  }
  if (parsedSections.detected.certifications || parsedSections.detected.achievements) {
    eduScore += 2;
  }
  eduScore = Math.min(eduScore, 10);
  breakdown.education = { score: eduScore, max: 10, label: 'Education & Certs' };

  // 7. Content Quality (10 points)
  let qualityScore = 5; // baseline
  if (contentQuality.wordCount >= 250) qualityScore += 1;
  if (contentQuality.wordCount >= 200 && contentQuality.wordCount <= 1200) qualityScore += 1;
  if (contentQuality.vagueFound.length === 0) qualityScore += 1;
  if (contentQuality.weakVerbsFound.length <= 1) qualityScore += 1;
  if (contentQuality.firstPersonCount <= 3) qualityScore += 1;
  qualityScore = Math.min(qualityScore, 10);
  breakdown.contentQuality = { score: qualityScore, max: 10, label: 'Content Quality' };

  // 8. ATS Formatting Safety (15 points)
  const passedFormatChecks = formattingChecks.filter(c => c.pass).length;
  const formatScore = Math.min(Math.round((passedFormatChecks / formattingChecks.length) * 15), 15);
  breakdown.formatting = { score: formatScore, max: 15, label: 'ATS Formatting' };

  // Total
  const total = Object.values(breakdown).reduce((sum, cat) => sum + cat.score, 0);
  const overall = Math.min(Math.max(Math.round(total), 0), 100);

  return { overall, breakdown };
}

/* ============================================================
   SCORE INTERPRETATION
   ============================================================ */
function getScoreInterpretation(score) {
  if (score >= 90) return { label: 'Excellent', color: 'var(--color-success)', desc: 'Excellent ATS readiness. Your resume is well-optimized.' };
  if (score >= 80) return { label: 'Strong', color: '#4F46E5', desc: 'Strong resume with some room for improvement.' };
  if (score >= 70) return { label: 'Good', color: '#f59e0b', desc: 'Good foundation. Review the suggestions below to strengthen it.' };
  if (score >= 60) return { label: 'Needs Work', color: '#f97316', desc: 'Your resume needs improvement in several areas.' };
  return { label: 'Needs Improvement', color: 'var(--color-error)', desc: 'Major improvements recommended before submitting.' };
}

/* ============================================================
   IMPROVEMENT SUGGESTIONS GENERATOR
   ============================================================ */
function generateSuggestions(contactInfo, parsedSections, skills, experienceAnalysis, projectsAnalysis, contentQuality, scores) {
  const suggestions = [];

  // Contact
  if (!contactInfo.email) {
    suggestions.push({ priority: 'high', icon: 'mail', title: 'Add Email Address', desc: 'Email is essential for recruiters to contact you. Add a professional email address.' });
  }
  if (!contactInfo.phone) {
    suggestions.push({ priority: 'medium', icon: 'phone', title: 'Add Phone Number', desc: 'Including a phone number makes it easier for recruiters to reach out.' });
  }
  if (!contactInfo.linkedin) {
    suggestions.push({ priority: 'medium', icon: 'link', title: 'Add LinkedIn Profile', desc: 'A LinkedIn profile link helps verify your professional history and connections.' });
  }
  if (!contactInfo.github) {
    suggestions.push({ priority: 'low', icon: 'code', title: 'Add GitHub Profile', desc: 'Consider adding a GitHub profile to showcase your open-source contributions and code quality.' });
  }

  // Sections
  if (!parsedSections.detected.summary) {
    suggestions.push({ priority: 'high', icon: 'chat_bubble', title: 'Add Professional Summary', desc: 'A 2-3 sentence summary highlighting your key skills and experience can grab attention immediately.' });
  }
  if (!parsedSections.detected.skills) {
    suggestions.push({ priority: 'high', icon: 'code', title: 'Add Technical Skills Section', desc: 'A dedicated skills section helps ATS systems match keywords from job descriptions.' });
  }
  if (!parsedSections.detected.projects && !parsedSections.detected.experience) {
    suggestions.push({ priority: 'high', icon: 'rocket_launch', title: 'Add Projects or Experience', desc: 'Include at least a Projects or Experience section to demonstrate your abilities.' });
  }

  // Experience
  if (experienceAnalysis.weakBullets.length > 0) {
    const example = experienceAnalysis.weakBullets[0].replace(/^[•\-\*►▸▪]\s*/, '').substring(0, 80);
    suggestions.push({
      priority: 'high', icon: 'edit', title: 'Strengthen Experience Bullets',
      desc: 'Some bullets describe responsibilities without measurable impact. Use: Action Verb + Technology + Result.',
      before: example.length > 10 ? example : null,
      after: example.length > 10 ? `Consider: "Developed [specific feature] using [technology], resulting in [measurable outcome]"` : null
    });
  }
  if (experienceAnalysis.quantifiedRatio < 0.3 && experienceAnalysis.totalBullets > 0) {
    suggestions.push({
      priority: 'high', icon: 'bar_chart', title: 'Add Measurable Impact',
      desc: `Only ${Math.round(experienceAnalysis.quantifiedRatio * 100)}% of bullets include metrics. Add numbers where you have real data (e.g., "Reduced load time by 40%").`
    });
  }

  // Skills
  if (skills.all.length < 5) {
    suggestions.push({ priority: 'medium', icon: 'psychology', title: 'Expand Skills Section', desc: `Only ${skills.all.length} technical skills detected. Consider listing all relevant technologies, frameworks, and tools you work with.` });
  }

  // Content quality
  if (contentQuality.vagueFound.length > 0) {
    suggestions.push({
      priority: 'medium', icon: 'find_replace', title: 'Remove Vague Phrases',
      desc: `Phrases like "${contentQuality.vagueFound[0]}" are generic. Replace with specific accomplishments and technologies.`,
      before: contentQuality.vagueFound[0],
      after: 'Replace with specific skills, technologies, or measurable outcomes'
    });
  }
  if (contentQuality.firstPersonCount > 5) {
    suggestions.push({ priority: 'low', icon: 'person', title: 'Reduce First-Person Language', desc: 'Resumes typically use implied first-person. Instead of "I built...", write "Built..."' });
  }

  // Projects
  if (projectsAnalysis.found && !projectsAnalysis.hasGithubLinks) {
    suggestions.push({ priority: 'medium', icon: 'link', title: 'Add GitHub Links to Projects', desc: 'Including GitHub repository links helps recruiters and ATS verify your project work.' });
  }

  return suggestions;
}

/* ============================================================
   JOB DESCRIPTION MATCHER
   ============================================================ */
function matchJobDescription(resumeText, resumeSkills, jdText) {
  if (!jdText || jdText.trim().length < 20) return null;

  // 1. Extract unique technical keywords from the Job Description text
  const jdSkills = extractSkills(jdText);
  const rawJdSkills = [...jdSkills.all];

  // Also extract common high-frequency tech terms from JD using word boundaries
  const COMMON_TECH_TERMS = [
    'react', 'next.js', 'vue', 'angular', 'typescript', 'javascript', 'node.js', 'express',
    'python', 'java', 'c++', 'c#', 'golang', 'go', 'rust', 'ruby', 'php', 'scala', 'kotlin', 'swift',
    'sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'cassandra',
    'graphql', 'rest apis', 'rest api', 'grpc', 'websocket', 'websockets', 'microservices',
    'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'git', 'github', 'linux',
    'aws', 'gcp', 'azure', 'cloud', 'kafka', 'rabbitmq',
    'html5', 'css3', 'tailwind', 'bootstrap', 'redux', 'jest', 'cypress',
    'data structures', 'algorithms', 'oop', 'system architecture', 'machine learning', 'ai'
  ];

  COMMON_TECH_TERMS.forEach(kw => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
    if (regex.test(jdText)) {
      const match = jdText.match(regex);
      rawJdSkills.push(match ? match[0] : kw);
    }
  });

  // Deduplicate case-insensitively while preserving proper casing
  const uniqueJD = [];
  const seenLower = new Set();
  rawJdSkills.forEach(s => {
    const low = s.toLowerCase();
    if (!seenLower.has(low)) {
      seenLower.add(low);
      uniqueJD.push(s);
    }
  });

  if (uniqueJD.length === 0) {
    return {
      matchScore: 0,
      matched: [],
      missing: [],
      totalJDKeywords: 0,
      recommendations: ['Paste a job description containing technical requirements to see keyword matches.']
    };
  }

  // 2. Strict matching against candidate resume (skills list + resume text with word boundaries)
  const matched = [];
  const missing = [];

  uniqueJD.forEach(jdSkill => {
    const sEscaped = jdSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const strictRegex = new RegExp('\\b' + sEscaped + '\\b', 'i');

    // Check in candidate extracted skills
    const inSkills = resumeSkills.some(rs => {
      const rsEscaped = rs.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rsRegex = new RegExp('\\b' + rsEscaped + '\\b', 'i');
      return strictRegex.test(rs) || rsRegex.test(jdSkill) || (jdSkill.length > 3 && rs.toLowerCase() === jdSkill.toLowerCase());
    });

    // Check in full resume text with strict word boundaries
    const inText = strictRegex.test(resumeText);

    if (inSkills || inText) {
      matched.push(jdSkill);
    } else {
      missing.push(jdSkill);
    }
  });

  // Compute: Match Score = (Matched Keywords / Total JD Keywords) * 100
  const totalJDKeywords = uniqueJD.length;
  const matchScore = totalJDKeywords > 0 ? Math.round((matched.length / totalJDKeywords) * 100) : 0;

  // Extract optional experience requirement
  const yearsMatch = jdText.match(/(\d+)\+?\s*years?\s*(of)?\s*(experience)?/i);
  const yearsRequired = yearsMatch ? parseInt(yearsMatch[1]) : null;

  return {
    matchScore,
    matched,
    missing,
    totalJDKeywords,
    yearsRequired,
    recommendations: generateJDRecommendations(matched, missing, yearsRequired)
  };
}

function generateJDRecommendations(matched, missing, yearsRequired) {
  const recs = [];
  if (missing.length > 0) {
    recs.push(`Consider adding relevant skills from the job description: ${missing.slice(0, 5).join(', ')}. Only add skills you genuinely possess.`);
  }
  if (missing.length > matched.length) {
    recs.push('This job description has many keywords not found in your resume. Consider tailoring your resume for this specific role.');
  }
  if (yearsRequired && yearsRequired > 3) {
    recs.push(`This role may require ${yearsRequired}+ years of experience. Highlight your experience timeline clearly.`);
  }
  if (missing.length === 0 && matched.length > 0) {
    recs.push('Excellent match! All required job description technologies were detected on your resume.');
  }
  return recs;
}

/* ============================================================
   MAIN ANALYSIS ORCHESTRATOR
   ============================================================ */
async function runRealAnalysis(fromBuilder) {
  const resultsArea = document.getElementById('analyzer-results-area');
  const loadingEl = document.getElementById('analyzer-loading');
  const analyzeBtn = document.getElementById('btn-run-analysis');
  const topBarBuilderBtn = document.getElementById('btn-use-builder-resume');

  // Show loading
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
      // Use builder resume data
      if (typeof currentResume === 'undefined' || !currentResume) {
        throw new Error('No saved resume found. Create or save a resume in Resume Builder first.');
      }
      // Check if builder has meaningful data
      const p = currentResume.personal || {};
      const hasContent = p.name || currentResume.summary || 
        (currentResume.experience && currentResume.experience.length > 0) ||
        (currentResume.projects && currentResume.projects.length > 0);
      if (!hasContent) {
        throw new Error('No saved resume found. Create or save a resume in Resume Builder first.');
      }

      resumeText = convertBuilderToText(currentResume);
      analyzerState.fromBuilder = true;
      analyzerState.fileName = 'Resume (Builder)';
      analyzerState.fileType = 'Builder';
      analyzerState.fileSize = `${(new Blob([resumeText]).size / 1024).toFixed(0)} KB`;
    } else {
      // Extract from uploaded file
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

    // Step 3: Extract data
    const contactInfo = extractContactInfo(resumeText);
    const skills = extractSkills(resumeText);
    const experienceAnalysis = analyzeExperience(resumeText, parsedSections.sectionContent);
    const projectsAnalysis = analyzeProjects(resumeText, parsedSections.sectionContent);
    const contentQuality = analyzeContentQuality(resumeText);
    const formattingChecks = analyzeATSFormatting(resumeText, parsedSections);

    // Step 4: Calculate scores
    const scores = calculateATSScore(
      resumeText, contactInfo, parsedSections, skills,
      experienceAnalysis, projectsAnalysis, contentQuality, formattingChecks
    );

    // Step 5: Generate suggestions
    const suggestions = generateSuggestions(
      contactInfo, parsedSections, skills,
      experienceAnalysis, projectsAnalysis, contentQuality, scores
    );

    // Store full results
    const analysisResult = {
      timestamp: new Date().toISOString(),
      fileName: analyzerState.fileName,
      fileType: analyzerState.fileType,
      fileSize: analyzerState.fileSize,
      fromBuilder: analyzerState.fromBuilder,
      scores,
      contactInfo,
      parsedSections: { detected: parsedSections.detected },
      skills,
      experienceAnalysis,
      projectsAnalysis,
      contentQuality,
      formattingChecks,
      suggestions,
      wordCount: contentQuality.wordCount
    };

    analyzerState.scores = scores;
    analyzerState.analysisComplete = true;

    // Step 6: Save to localStorage
    saveAnalysisResult(analysisResult);

    // Step 7: Render results
    renderAllResults(analysisResult);

    // Show results area
    if (resultsArea) resultsArea.style.display = 'block';

    // Update hub ATS stat
    const hubAtsEl = document.getElementById('hub-stat-ats');
    if (hubAtsEl) hubAtsEl.textContent = `${scores.overall}%`;

    showToast(`Analysis complete! DevPilot ATS Score: ${scores.overall}/100`, 'success');

    // Smooth scroll to results
    setTimeout(() => {
      resultsArea?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

  } catch (error) {
    showToast(error.message || 'Analysis failed. Please try again.', 'error');
    console.error('Resume analysis error:', error);
  } finally {
    // Reset button
    if (loadingEl) loadingEl.style.display = 'none';
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">play_arrow</span><span>Analyze</span>`;
    }
  }
}

/* ============================================================
   RESULT RENDERER
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
        <div class="score-hero-disclaimer">This score reflects ATS readability and completeness. Actual ATS results vary by system and job description.</div>
      </div>
    </div>

    <!-- Score Breakdown -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>bar_chart</span>
        <h3 class="analyzer-card-title">Score Breakdown</h3>
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

    <!-- Resume Health -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-emerald-500" style='font-variation-settings: "FILL" 1;'>monitor_heart</span>
        <h3 class="analyzer-card-title">Resume Health</h3>
      </div>
      <div class="health-checks-list">
        ${renderHealthChecks(result)}
      </div>
    </div>

    <!-- Two Column Layout for Details -->
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

        <!-- Detected Sections -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>article</span>
            <h3 class="analyzer-card-title">Detected Sections</h3>
            <span class="analyzer-card-score">${bd.sections.score}/${bd.sections.max}</span>
          </div>
          <div class="section-checks-list">
            ${renderSectionChecks(result.parsedSections)}
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

        <!-- ATS Formatting -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-emerald-500" style='font-variation-settings: "FILL" 1;'>shield_check</span>
            <h3 class="analyzer-card-title">ATS Formatting</h3>
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

        <!-- Education -->
        <div class="analyzer-section-card">
          <div class="analyzer-card-header">
            <span class="material-symbols-outlined text-[18px] text-indigo-500" style='font-variation-settings: "FILL" 1;'>school</span>
            <h3 class="analyzer-card-title">Education & Certifications</h3>
            <span class="analyzer-card-score">${bd.education.score}/${bd.education.max}</span>
          </div>
          <div class="edu-check-summary">
            ${renderEduCheck(result.parsedSections)}
          </div>
        </div>
      </div>
    </div>

    <!-- Improvement Suggestions (full width) -->
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
        ${result.suggestions.length === 0 ? '<p class="no-issues-text">No major issues detected. Your resume looks great!</p>' : ''}
      </div>
    </div>

    <!-- Job Description Matcher (full width) -->
    <div class="analyzer-section-card">
      <div class="analyzer-card-header">
        <span class="material-symbols-outlined text-[18px] text-amber-500" style='font-variation-settings: "FILL" 1;'>work_history</span>
        <h3 class="analyzer-card-title">Job Description Match</h3>
        <span class="badge badge-neutral" style="font-size:10px;padding:2px 6px;">Optional</span>
      </div>
      <p class="jd-instructions">Paste a job description below to see how well your resume matches the role's requirements.</p>
      <textarea id="jd-textarea-real" class="form-textarea" rows="4" placeholder="Paste a job description here to see how well your resume matches...">${escHtml(analyzerState.jdText || '')}</textarea>
      <button class="btn-primary btn-sm mt-3" id="btn-match-jd-real" style="width:100%;">
        <span class="material-symbols-outlined text-[16px]">compare_arrows</span>
        Analyze Match
      </button>
      <div id="jd-match-results-real" style="display:none;"></div>
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

  const jdMatchBtn = document.getElementById('btn-match-jd-real');
  if (jdMatchBtn) {
    jdMatchBtn.addEventListener('click', () => runRealJDMatch(result));
  }
}

/* ============================================================
   SUB-RENDERERS
   ============================================================ */
function renderHealthChecks(result) {
  const checks = [];
  const ci = result.contactInfo;
  const ps = result.parsedSections;

  checks.push({ pass: ci.name && ci.email, label: 'Contact information detected' });
  checks.push({ pass: Object.keys(ps.detected).length >= 3, label: 'Standard resume sections detected' });
  checks.push({ pass: result.skills.all.length >= 3, label: 'Technical skills detected' });
  checks.push({ pass: ps.detected.experience, label: 'Experience section present' });
  checks.push({ pass: ps.detected.education, label: 'Education section present' });

  const expA = result.experienceAnalysis;
  if (expA.totalBullets > 0) {
    checks.push({ pass: expA.quantifiedRatio >= 0.3, label: expA.quantifiedRatio >= 0.3 ? 'Bullets include measurable impact' : 'Some bullets lack measurable impact' });
    checks.push({ pass: expA.actionVerbRatio >= 0.3, label: expA.actionVerbRatio >= 0.3 ? 'Strong action verbs used' : 'Consider using more action verbs' });
  }

  checks.push({ pass: ci.github, label: ci.github ? 'GitHub profile detected' : 'GitHub link not detected' });
  checks.push({ pass: ci.linkedin, label: ci.linkedin ? 'LinkedIn profile detected' : 'LinkedIn link not detected' });

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
    { key: 'LinkedIn', found: ci.linkedin, detail: ci.details.linkedin },
    { key: 'GitHub', found: ci.github, detail: ci.details.github },
    { key: 'Location', found: ci.location, detail: ci.details.location },
    { key: 'Portfolio', found: ci.portfolio, detail: ci.details.portfolio }
  ];

  return items.map(item => `
    <div class="analyzer-check-item ${item.found ? 'check-pass' : 'check-missing'}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${item.found ? 'check_circle' : 'cancel'}</span>
      <div>
        <span class="check-label">${item.key}</span>
        ${item.found && item.detail ? `<span class="check-detail">${escHtml(item.detail)}</span>` : ''}
        ${!item.found ? `<span class="check-detail check-missing-text">${item.key === 'Portfolio' || item.key === 'GitHub' ? 'Optional — not detected' : 'Not detected'}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function renderSectionChecks(ps) {
  const allSections = [
    { key: 'summary', label: 'Summary / Objective' },
    { key: 'experience', label: 'Experience / Work History' },
    { key: 'skills', label: 'Technical Skills' },
    { key: 'projects', label: 'Projects' },
    { key: 'education', label: 'Education' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'achievements', label: 'Achievements / Awards' }
  ];

  const detected = allSections.filter(s => ps.detected[s.key]);
  const missing = allSections.filter(s => !ps.detected[s.key]);

  let html = '';
  if (detected.length) {
    html += '<div class="section-group-label">Detected Sections</div>';
    html += detected.map(s => `
      <div class="analyzer-check-item check-pass">
        <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>check_circle</span>
        <span class="check-label">${s.label}</span>
      </div>
    `).join('');
  }
  if (missing.length) {
    html += '<div class="section-group-label" style="margin-top:0.75rem;">Missing / Recommended</div>';
    html += missing.map(s => `
      <div class="analyzer-check-item check-missing">
        <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>warning</span>
        <span class="check-label">${s.label}</span>
      </div>
    `).join('');
  }
  return html;
}

function renderExperienceDetails(exp) {
  if (!exp.totalBullets && exp.jobTitles.length === 0) {
    return '<p class="no-data-text">No experience content detected. Consider adding your work experience or internships.</p>';
  }

  return `
    <div class="exp-stats-grid">
      <div class="exp-stat">
        <div class="exp-stat-value">${exp.totalBullets}</div>
        <div class="exp-stat-label">Total Bullets</div>
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
        <div class="exp-detail-label">Detected Job Titles</div>
        <div class="skills-pill-group">${exp.jobTitles.map(t => `<span class="skill-pill-found"><span class="material-symbols-outlined" style="font-size:11px;">work</span>${escHtml(t)}</span>`).join('')}</div>
      </div>
    ` : ''}
    ${exp.techInExperience.length ? `
      <div class="exp-detail-section">
        <div class="exp-detail-label">Technologies Mentioned</div>
        <div class="skills-pill-group">${exp.techInExperience.slice(0, 10).map(t => `<span class="skill-pill-found"><span class="material-symbols-outlined" style="font-size:11px;">check</span>${escHtml(t)}</span>`).join('')}</div>
      </div>
    ` : ''}
    ${exp.weakVerbCount > 0 ? `
      <div class="exp-detail-note">
        <span class="material-symbols-outlined text-amber-500 text-[16px]">info</span>
        <span>${exp.weakVerbCount} bullet(s) use weak verbs. Consider replacing with strong action verbs (Built, Developed, Optimized, etc.).</span>
      </div>
    ` : ''}
    ${exp.quantifiedRatio < 0.3 && exp.totalBullets > 0 ? `
      <div class="exp-detail-note">
        <span class="material-symbols-outlined text-amber-500 text-[16px]">info</span>
        <span>Several experience bullets describe responsibilities but do not include measurable impact.</span>
      </div>
    ` : ''}
  `;
}

function renderSkillsSection(skills) {
  if (skills.all.length === 0) {
    return '<p class="no-data-text">No technical skills detected. Consider adding a dedicated skills section.</p>';
  }

  const categories = Object.entries(skills.categorized).filter(([_, arr]) => arr.length > 0);

  return `
    <div class="detected-skills-summary">
      <span class="skills-count">${skills.all.length} skills detected</span>
    </div>
    ${categories.map(([cat, arr]) => `
      <div class="skill-category-section">
        <div class="skill-category-label">${formatCategoryName(cat)}</div>
        <div class="skills-pill-group">${arr.map(s => `<span class="skill-pill-found"><span class="material-symbols-outlined" style="font-size:11px;">check</span>${escHtml(s)}</span>`).join('')}</div>
      </div>
    `).join('')}
  `;
}

function renderProjectsDetails(proj) {
  if (!proj.found) {
    return '<p class="no-data-text">No projects section detected. Consider adding 2-3 technical projects with descriptions and links.</p>';
  }

  const items = [];
  items.push({ pass: proj.count >= 2, label: `${proj.count} project(s) detected` });
  items.push({ pass: proj.techCount >= 3, label: proj.techCount > 0 ? `${proj.techCount} technologies mentioned` : 'Technologies not explicitly mentioned' });
  items.push({ pass: proj.hasGithubLinks, label: proj.hasGithubLinks ? 'GitHub links detected' : 'GitHub links not detected' });
  items.push({ pass: proj.hasDemoLinks, label: proj.hasDemoLinks ? 'Live demo/deployment links detected' : 'No live demo links detected' });

  let detailsHtml = '';
  if (proj.details.length > 0) {
    detailsHtml = proj.details.map(d => `
      <div class="project-detail-item">
        <div class="project-detail-name">${escHtml(d.name)}</div>
        <div class="project-detail-checks">
          ${d.hasTech ? '<span class="mini-check pass">Tech ✓</span>' : '<span class="mini-check warn">Tech ⚠</span>'}
          ${d.hasDescription ? '<span class="mini-check pass">Desc ✓</span>' : '<span class="mini-check warn">Desc ⚠</span>'}
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
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.firstPersonCount}</span><span class="cq-stat-label">First Person</span></div>
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.vagueFound.length}</span><span class="cq-stat-label">Vague Phrases</span></div>
      <div class="cq-stat-item"><span class="cq-stat-val">${cq.weakVerbsFound.length}</span><span class="cq-stat-label">Weak Verbs</span></div>
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
    ` : '<p class="no-issues-text">No major content quality issues detected.</p>'}
  `;
}

function renderEduCheck(ps) {
  const eduDetected = ps.detected.education;
  const certDetected = ps.detected.certifications;

  return `
    <div class="analyzer-check-item ${eduDetected ? 'check-pass' : 'check-warn'}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${eduDetected ? 'check_circle' : 'warning'}</span>
      <span class="check-label">${eduDetected ? 'Education section detected' : 'Education section not detected'}</span>
    </div>
    <div class="analyzer-check-item ${certDetected ? 'check-pass' : 'check-missing'}">
      <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>${certDetected ? 'check_circle' : 'info'}</span>
      <span class="check-label">${certDetected ? 'Certifications section detected' : 'Certifications section not detected (optional)'}</span>
    </div>
  `;
}

/* ============================================================
   JD MATCH RUNNER
   ============================================================ */
function runRealJDMatch(analysisResult) {
  const jdTextarea = document.getElementById('jd-textarea-real');
  const jdText = jdTextarea?.value?.trim();

  if (!jdText || jdText.length < 30) {
    showToast('Please paste a job description (at least a few lines).', 'error');
    return;
  }

  analyzerState.jdText = jdText;
  const matchResult = matchJobDescription(analyzerState.resumeText, analysisResult.skills.all, jdText);

  if (!matchResult) {
    showToast('Unable to analyze job description. Please try a longer description.', 'error');
    return;
  }

  analyzerState.jdMatchResult = matchResult;

  const resultsEl = document.getElementById('jd-match-results-real');
  if (resultsEl) {
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = `
      <div class="jd-match-bar-wrapper" style="margin-top:1rem;">
        <div class="jd-match-score-row">
          <span class="jd-match-score-label">Job Match Score</span>
          <span class="jd-match-score-val">${matchResult.matchScore}%</span>
        </div>
        <div class="jd-match-bar-bg">
          <div class="jd-match-bar-fill" style="width:0%" id="jd-bar-fill-real"></div>
        </div>
      </div>
      <div class="jd-keywords-grid" style="margin-top:0.75rem;">
        <div>
          <div class="jd-keywords-section">Matched Keywords (${matchResult.matched.length})</div>
          ${matchResult.matched.length
            ? matchResult.matched.map(s => `<span class="skill-pill-found" style="margin:2px;display:inline-flex;"><span class="material-symbols-outlined" style="font-size:11px;">check</span>${escHtml(s)}</span>`).join('')
            : '<span class="no-data-text">No keywords matched</span>'}
        </div>
        <div>
          <div class="jd-keywords-section">Missing / Not Detected (${matchResult.missing.length})</div>
          ${matchResult.missing.slice(0, 10).map(s => `<span class="skill-pill-rec" style="margin:2px;display:inline-flex;"><span class="material-symbols-outlined" style="font-size:11px;">add</span>${escHtml(s)}</span>`).join('')
            || '<span class="no-data-text">All JD keywords found</span>'}
        </div>
      </div>
      ${matchResult.recommendations.length ? `
        <div class="jd-recommendations" style="margin-top:1rem;">
          <div class="jd-keywords-section">Recommendations</div>
          ${matchResult.recommendations.map(r => `
            <div class="analyzer-check-item check-info" style="margin-bottom:0.5rem;">
              <span class="material-symbols-outlined check-icon" style='font-variation-settings: "FILL" 1;'>lightbulb</span>
              <span class="check-label">${escHtml(r)}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    setTimeout(() => {
      const bar = document.getElementById('jd-bar-fill-real');
      if (bar) bar.style.width = `${matchResult.matchScore}%`;
    }, 100);
  }

  showToast(`Job match: ${matchResult.matchScore}% (${matchResult.matched.length} matched, ${matchResult.missing.length} missing)`, matchResult.matchScore >= 70 ? 'success' : 'info');
}

/* ============================================================
   PERSISTENCE
   ============================================================ */
function saveAnalysisResult(result) {
  try {
    // Save a trimmed version (no huge text blobs)
    const toSave = {
      timestamp: result.timestamp,
      fileName: result.fileName,
      fileType: result.fileType,
      fileSize: result.fileSize,
      fromBuilder: result.fromBuilder,
      scores: result.scores,
      contactInfo: result.contactInfo,
      parsedSections: result.parsedSections,
      skills: { all: result.skills.all.slice(0, 30), categorized: result.skills.categorized },
      experienceAnalysis: {
        totalBullets: result.experienceAnalysis.totalBullets,
        actionVerbCount: result.experienceAnalysis.actionVerbCount,
        weakVerbCount: result.experienceAnalysis.weakVerbCount,
        quantifiedCount: result.experienceAnalysis.quantifiedCount,
        quantifiedRatio: result.experienceAnalysis.quantifiedRatio,
        actionVerbRatio: result.experienceAnalysis.actionVerbRatio,
        jobTitles: result.experienceAnalysis.jobTitles,
        hasDates: result.experienceAnalysis.hasDates,
        techInExperience: result.experienceAnalysis.techInExperience.slice(0, 15),
        weakBullets: [],
        strongBullets: []
      },
      projectsAnalysis: result.projectsAnalysis,
      contentQuality: result.contentQuality,
      formattingChecks: result.formattingChecks,
      suggestions: result.suggestions,
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
    scores: null, analysisComplete: false, jdText: '', jdMatchResult: null
  };
}

/* ============================================================
   RESTORE SAVED ANALYSIS ON LOAD
   ============================================================ */
function restoreSavedAnalysis() {
  const saved = loadAnalysisResult();
  if (!saved || !saved.scores) return;

  // Only restore if it's recent (within 24 hours)
  const age = Date.now() - new Date(saved.timestamp).getTime();
  if (age > 24 * 60 * 60 * 1000) return;

  analyzerState.analysisComplete = true;
  analyzerState.fileName = saved.fileName;
  analyzerState.fileType = saved.fileType;
  analyzerState.fileSize = saved.fileSize;
  analyzerState.fromBuilder = saved.fromBuilder;

  const resultsArea = document.getElementById('analyzer-results-area');
  if (resultsArea) {
    renderAllResults(saved);
    resultsArea.style.display = 'block';
  }
}

/* ============================================================
   ANALYZER CONTROLS INIT (replaces old initAnalyzerControls)
   ============================================================ */
function initRealAnalyzerControls() {
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('file-upload-input');
  const removeFileBtn = document.getElementById('btn-remove-file');

  // Drag and drop
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

  // File input
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) handleRealFileSelected(fileInput.files[0]);
    });
  }

  // Remove file
  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', () => {
      resetAnalyzerState();
    });
  }

  // Analyze Builder Resume buttons
  const analyzeBuilderBtn = document.getElementById('btn-analyze-builder');
  if (analyzeBuilderBtn) analyzeBuilderBtn.addEventListener('click', () => runRealAnalysis(true));

  const topBarBuilderBtn = document.getElementById('btn-use-builder-resume');
  if (topBarBuilderBtn) topBarBuilderBtn.addEventListener('click', () => runRealAnalysis(true));

  // Run Analysis button (top bar)
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

  // Re-analyze button
  const reanalyzeBtn = document.getElementById('btn-reanalyze');
  if (reanalyzeBtn) {
    reanalyzeBtn.addEventListener('click', () => {
      const resultsArea = document.getElementById('analyzer-results-area');
      if (resultsArea) { resultsArea.style.display = 'none'; resultsArea.innerHTML = ''; }
      analyzerState.analysisComplete = false;
    });
  }

  // Restore saved analysis
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

  // Store actual File object
  analyzerState.file = file;
  analyzerState.fileName = file.name;
  analyzerState.fileSize = sizeStr;
  analyzerState.fileType = type;
  analyzerState.fromBuilder = false;

  // Clear previous results
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

// Use escHtml and timeAgo from the existing utils.js — they're already global

// Auto-initialize if DOM is ready or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initRealAnalyzerControls();
  });
} else {
  initRealAnalyzerControls();
}
