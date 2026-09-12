/**
 * Test Suite: Resume Analyzer Rendering & Null-Safety
 * Verifies that renderAllResults and all sub-renderers execute safely
 * without throwing "Cannot read properties of undefined" for any resume profile
 * (student, experienced, senior, missing sections, partial AI schema).
 */

const assert = require('assert');

// Mock a minimal DOM environment
global.document = {
  getElementById: (id) => {
    return {
      id,
      style: {},
      innerHTML: '',
      textContent: '',
      dataset: {},
      querySelectorAll: () => [],
      addEventListener: () => {}
    };
  }
};

const analyzer = require('../../js/pages/resumeAnalyzer.js');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function runTest(testName, fn) {
  try {
    fn();
    console.log(`${colors.green}✓ [PASS] ${testName}${colors.reset}`);
    return true;
  } catch (err) {
    console.error(`${colors.red}✗ [FAIL] ${testName}${colors.reset}`);
    console.error(`  Error: ${err.message}`);
    console.error(err.stack);
    return false;
  }
}

console.log(`${colors.blue}====================================================`);
console.log(` DevPilot-AI: Resume Rendering Null-Safety Tests`);
console.log(`====================================================${colors.reset}\n`);

let passed = 0;
let total = 0;

// Test 1: Full student resume analysisResult render
total++;
if (runTest('TEST 1: Student / Fresher resume analysisResult renders cleanly', () => {
  const evalResult = analyzer.executeMasterAiEvaluation(`
Aditya Sharma
Kanpur, UP, India | +91 98765 43210 | aditya@gmail.com
github.com/aditya | linkedin.com/in/aditya

PROFESSIONAL SUMMARY
Full Stack & AI Developer with experience in React and Node.js.

TECHNICAL SKILLS
Languages: JavaScript, Python, C++, SQL
Frontend: React, Tailwind CSS
Backend: Node.js, Express, PostgreSQL
Tools: Git, Docker

PROJECTS
Soniqx Web Audiometer | github.com/aditya/soniqx
• Built responsive web UI with pure-tone audiometry protocols.
• Integrated audiogram visualization with 98% accuracy.

EDUCATION
Bachelor of Technology in Computer Science (2026)
AKTU University, GPA: 8.5
`);

  // Build the analysisResult object using the same mapping as runRealAnalysis
  const verified = evalResult.skills?.verifiedSkills || [];
  const listed = evalResult.skills?.listedOnlySkills || [];
  const allSkills = [...new Set(verified.concat(listed))];
  const dynamicRoles = analyzer.detectDynamicRoles(
    { all: allSkills },
    evalResult.projects?.entries || [],
    evalResult.experience?.entries || [],
    evalResult.candidate?.careerStage || 'Student'
  );

  const analysisResult = {
    timestamp: new Date().toISOString(),
    fileName: 'student_resume.pdf',
    fileType: 'PDF',
    fileSize: '45 KB',
    fromBuilder: false,
    resumeText: '...',
    scores: {
      overall: evalResult.scores.overallResumeScore,
      breakdown: {
        summary: { score: 7, max: 8, label: 'Professional Summary' },
        keywords: { score: 14, max: 15, label: 'Technical Skills' },
        projects: { score: 18, max: 20, label: 'Technical Projects' },
        experience: { score: 10, max: 15, label: 'Work / Internship Experience' },
        education: { score: 10, max: 10, label: 'Education' },
        achievements: { score: 8, max: 10, label: 'Achievements / DSA' },
        certifications: { score: 4, max: 5, label: 'Certifications' },
        formatting: { score: 7, max: 7, label: 'ATS & Structure' },
        contact: { score: 3, max: 3, label: 'Contact Information' },
        contentQuality: { score: 6, max: 7, label: 'Content Quality & Impact' }
      }
    },
    candidate: evalResult.candidate,
    structuredResume: { experienceLevel: 'Student' },
    contactInfo: {
      confidence: 95,
      details: evalResult.contact,
      name: evalResult.contact?.name,
      email: evalResult.contact?.email,
      phone: evalResult.contact?.phone,
      linkedin: evalResult.contact?.linkedin,
      github: evalResult.contact?.github,
      score: 3,
      max: 3
    },
    parsedSections: { detected: { skills: true, projects: true, education: true } },
    summaryAnalysis: { exists: true, score: 7, confidence: 90, strengths: [], issues: [] },
    skills: { all: allSkills, categorized: evalResult.skills, confidence: 95 },
    experienceAnalysis: {
      isFresher: true,
      hasExperience: false,
      count: 0,
      details: [],
      jobTitles: [],
      techInExperience: [],
      totalBullets: 0,
      actionVerbCount: 0,
      quantifiedCount: 0,
      quantifiedRatio: 0
    },
    projectsAnalysis: {
      found: true,
      count: evalResult.projects.count,
      details: evalResult.projects.entries.map(p => ({
        name: p.name,
        hasTech: true,
        hasDescription: true,
        matchedDepthKeywords: ['REST APIs'],
        hasGithub: true,
        hasImpact: true
      })),
      techCount: 5,
      hasGithubLinks: true,
      hasDemoLinks: false
    },
    educationAnalysis: { exists: true, hasDegree: true, hasInstitution: true, degree: 'B.Tech', score: 10, max: 10 },
    certificationsAnalysis: { exists: false, count: 0, score: 0, max: 5 },
    achievementsAnalysis: { exists: false, count: 0, score: 0, max: 10 },
    contentQuality: { score: 6, wordCount: 150, actionVerbCount: 8, metricsCount: 4, vagueFound: [], issues: [] },
    formattingChecks: [{ pass: true, label: 'Standard layout', detail: 'Pass' }],
    suggestions: [{ priority: 'high', icon: 'bolt', title: 'Tip', desc: 'Add cloud details' }],
    bestFitRole: dynamicRoles.bestFit,
    jobRecommendations: dynamicRoles.topRecommendations,
    careerStageEvidence: evalResult.careerStageEvidence || []
  };

  assert.doesNotThrow(() => {
    analyzer.renderAllResults(analysisResult);
  });
})) passed++;

// Test 2: 3-Year Experienced Software Engineer Resume (isFresher: false)
// This is the EXACT scenario that previously failed with:
// "Cannot read property 'length' of undefined" on exp.techInExperience!
total++;
if (runTest('TEST 2: Experienced Software Engineer (isFresher: false) with active techInExperience renders cleanly', () => {
  const evalResult = analyzer.executeMasterAiEvaluation(`
Jane Doe
Senior Full Stack Engineer
San Francisco, CA | jane.doe@techcorp.com | (555) 123-4567
linkedin.com/in/janedoe | github.com/janedoe

PROFESSIONAL SUMMARY
Senior Software Engineer with 4 years of experience architecting high-throughput distributed microservices in Go, Node.js, and React.

EXPERIENCE
Software Engineer | Stripe | 2022 - Present
• Architected payment processing pipeline handling 50k RPS with 99.99% availability using Go, Redis, and Kafka.
• Reduced API p99 latency by 45% through database query optimization and connection pooling in PostgreSQL.
• Led frontend migration to Next.js and TypeScript, improving Core Web Vitals by 35%.

Junior Software Developer | TechCorp | 2020 - 2022
• Engineered RESTful microservices in Node.js and Express.
• Automated CI/CD deployment pipelines using Docker and GitHub Actions.

TECHNICAL SKILLS
Languages: Go, JavaScript, TypeScript, Python, SQL
Frameworks: React, Next.js, Node.js, Express
Databases & Cache: PostgreSQL, Redis, Kafka, MongoDB
Infrastructure: Docker, Kubernetes, AWS, Git

PROJECTS
OpenSource Gateway | github.com/janedoe/gateway
• Built lightweight API gateway in Go with rate limiting and JWT authentication.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2020)
`);

  assert.strictEqual(evalResult.candidate.careerStage, 'Mid-Level', 'Should identify as Mid-Level / Experienced, not Student');

  const verified = evalResult.skills?.verifiedSkills || [];
  const listed = evalResult.skills?.listedOnlySkills || [];
  const allSkills = [...new Set(verified.concat(listed))];
  const dynamicRoles = analyzer.detectDynamicRoles(
    { all: allSkills },
    evalResult.projects?.entries || [],
    evalResult.experience?.entries || [],
    evalResult.candidate?.careerStage || 'Mid-Level'
  );

  const expEntries = evalResult.experience?.entries || [];
  const expTechInContext = Array.from(new Set(expEntries.flatMap(e => Array.isArray(e.technologies) ? e.technologies : [])));

  const analysisResult = {
    timestamp: new Date().toISOString(),
    fileName: 'experienced_engineer.pdf',
    fileType: 'PDF',
    fileSize: '80 KB',
    fromBuilder: false,
    resumeText: '...',
    scores: {
      overall: evalResult.scores.overallResumeScore,
      breakdown: {
        summary: { score: 8, max: 8, label: 'Professional Summary' },
        keywords: { score: 15, max: 15, label: 'Technical Skills' },
        projects: { score: 18, max: 20, label: 'Technical Projects' },
        experience: { score: 15, max: 15, label: 'Work / Internship Experience' },
        education: { score: 10, max: 10, label: 'Education' },
        achievements: { score: 8, max: 10, label: 'Achievements / DSA' },
        certifications: { score: 3, max: 5, label: 'Certifications' },
        formatting: { score: 7, max: 7, label: 'ATS & Structure' },
        contact: { score: 3, max: 3, label: 'Contact Information' },
        contentQuality: { score: 7, max: 7, label: 'Content Quality & Impact' }
      }
    },
    candidate: evalResult.candidate,
    structuredResume: { experienceLevel: 'Mid-Level' },
    contactInfo: {
      confidence: 95,
      details: evalResult.contact,
      name: evalResult.contact?.name,
      email: evalResult.contact?.email,
      phone: evalResult.contact?.phone,
      linkedin: evalResult.contact?.linkedin,
      github: evalResult.contact?.github,
      score: 3,
      max: 3
    },
    parsedSections: { detected: { summary: true, experience: true, skills: true, projects: true, education: true } },
    summaryAnalysis: { exists: true, score: 8, confidence: 95, strengths: [], issues: [] },
    skills: { all: allSkills, categorized: evalResult.skills, confidence: 95 },
    experienceAnalysis: {
      isFresher: false,
      hasExperience: true,
      count: expEntries.length,
      details: expEntries,
      entries: expEntries,
      jobTitles: expEntries.map(e => e.title),
      totalBullets: 5,
      actionVerbCount: 4,
      weakVerbCount: 0,
      quantifiedCount: 3,
      quantifiedRatio: 0.6,
      techInExperience: expTechInContext,
      confidence: 95,
      score: 15
    },
    projectsAnalysis: {
      found: true,
      count: evalResult.projects.count,
      details: evalResult.projects.entries.map(p => ({
        name: p.name,
        hasTech: true,
        hasDescription: true,
        matchedDepthKeywords: ['Architecture'],
        hasGithub: true,
        hasImpact: true
      })),
      techCount: 6,
      hasGithubLinks: true,
      hasDemoLinks: false
    },
    educationAnalysis: { exists: true, hasDegree: true, hasInstitution: true, degree: 'BS Computer Science', score: 10, max: 10 },
    certificationsAnalysis: { exists: false, count: 0, score: 0, max: 5 },
    achievementsAnalysis: { exists: false, count: 0, score: 0, max: 10 },
    contentQuality: { score: 7, wordCount: 280, actionVerbCount: 12, metricsCount: 6, vagueFound: [], issues: [] },
    formattingChecks: [{ pass: true, label: 'Standard layout', detail: 'Pass' }],
    suggestions: [],
    bestFitRole: dynamicRoles.bestFit,
    jobRecommendations: dynamicRoles.topRecommendations,
    careerStageEvidence: evalResult.careerStageEvidence || []
  };

  assert.doesNotThrow(() => {
    analyzer.renderAllResults(analysisResult);
  });
})) passed++;

// Test 3: Completely Barebones / Degraded Analysis Result (Null fields, missing arrays)
// Tests that null guards protect against any runtime crashes
total++;
if (runTest('TEST 3: Barebones / Malformed result with missing nested arrays does not throw', () => {
  const degradedResult = {
    timestamp: new Date().toISOString(),
    fileName: 'minimal.txt',
    fileType: 'TXT',
    fileSize: '1 KB',
    scores: {
      overall: 45,
      breakdown: {}
    },
    candidate: {},
    structuredResume: {},
    contactInfo: {},
    parsedSections: {},
    summaryAnalysis: {},
    skills: { all: [] },
    experienceAnalysis: { isFresher: false }, // techInExperience missing, jobTitles missing
    projectsAnalysis: {},
    educationAnalysis: {},
    certificationsAnalysis: {},
    achievementsAnalysis: {},
    contentQuality: {},
    formattingChecks: null, // null check
    suggestions: null, // null check
    bestFitRole: null,
    jobRecommendations: null
  };

  assert.doesNotThrow(() => {
    analyzer.renderAllResults(degradedResult);
  });
})) passed++;

// Test 4: Job Match Result Rendering Null Safety
total++;
if (runTest('TEST 4: Job Match rendering with partial fields does not throw', () => {
  const partialJdResult = {
    applyRecommendation: 'APPLY NOW',
    matchLevel: 'Strong Match',
    applyReason: 'Good qualifications',
    matchScore: 82,
    eligibility: 'ELIGIBLE',
    eligibilityColor: '#059669',
    matchColor: '#059669',
    statusClass: 'status-pass',
    hasExperienceGap: false,
    factors: {
      skills: { label: 'Skills', score: 8, max: 10 }
    },
    allMatched: ['React', 'Node.js'],
    whyYouMatch: ['Strong React experience'],
    missingRequirementsDisplay: { required: ['Docker'], preferred: [] },
    actionPlan: [{ priority: 'HIGH', reason: 'Missing Docker', whatToLearn: 'Learn containerization' }]
  };

  const resultWithJd = {
    scores: { overall: 75, breakdown: {} },
    skills: { all: [] },
    experienceAnalysis: { isFresher: true },
    projectsAnalysis: { found: false, count: 0 },
    educationAnalysis: {},
    certificationsAnalysis: {},
    achievementsAnalysis: {},
    contentQuality: {},
    formattingChecks: [],
    suggestions: [],
    jobRecommendations: [],
    jdMatchResult: partialJdResult
  };

  assert.doesNotThrow(() => {
    analyzer.renderAllResults(resultWithJd);
  });
})) passed++;

console.log(`\n====================================================`);
console.log(` Results: ${passed} / ${total} Passed`);
console.log(`====================================================`);

process.exit(passed === total ? 0 : 1);
