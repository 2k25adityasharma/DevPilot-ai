/**
 * DevPilot-AI — Automated Resume Analyzer Test Suite
 * Tests 10 realistic document scenarios to verify classification,
 * confidence gating, consistency checking, and evidence extraction.
 */

const assert = require('assert');
const analyzer = require('../../js/pages/resumeAnalyzer.js');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
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
    return false;
  }
}

console.log(`${colors.blue}====================================================`);
console.log(` DevPilot-AI: Running Resume Analyzer Test Suite (10 Tests)`);
console.log(`====================================================${colors.reset}\n`);

let passedCount = 0;
let totalCount = 10;

// ----------------------------------------------------
// TEST 1: Valid Student Resume -> PASS
// ----------------------------------------------------
if (runTest('TEST 1: Valid student resume with projects and education', () => {
  const resumeText = `
Aditya Sharma
Kanpur, UP, India | +91 96160 32564 | 2k25aiml2513475@gmail.com
github.com/2k25adityasharma | linkedin.com/in/aditya-sharma | leetcode.com/u/adityasharma9616

PROFESSIONAL SUMMARY
Passionate Full Stack & AI Developer with practical experience developing modern web applications, responsive frontend architectures, and real-time AI solutions. Proficient in JavaScript, React, Node.js, and CS fundamentals.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, C++, Python, HTML5, CSS3, SQL
Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Responsive Design
Backend: Node.js, Express.js, REST APIs, WebSockets
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS, Firebase
Tools: Git, GitHub, Docker, Postman, VS Code, Linux

PROJECTS
SONIQX — Web Audiometer & Hearing Diagnostic Suite | github.com/2k25adityasharma/soniqx
• Architected modern responsive web UI supporting 2 distinct screening modes, reducing workflow completion time by 30%.
• Engineered pure-tone audiometry test protocols across 125Hz-8000Hz with 98% calibration accuracy.
• Integrated responsive audiogram visualization and export pipeline reducing diagnostic time by 40%.

AI Chatbot & Conversational Assistant | github.com/2k25adityasharma/ai-chatbot
• Engineered responsive UI using JavaScript and RESTful APIs, handling real-time prompt flows with sub-250ms latency.
• Integrated Redis caching layer reducing external API latency by 45% on recurring query patterns.
• Deployed containerized Docker services handling 1,000+ daily developer prompts.

EDUCATION
Dr. A.P.J. Abdul Kalam Technical University
B.Tech in Computer Science & Engineering (AI & ML) | 2022 - 2026 | CGPA: 8.5 / 10.0

ACHIEVEMENTS
• Solved 170+ Data Structures & Algorithms (DSA) problems on LeetCode with a 100+ day streak.
• Finalist in National Level Innovation Hackathon competing among 300+ teams.

CERTIFICATIONS
• Full Stack Web Development Professional Specialization — Meta / Coursera (2024)
• AWS Certified Solutions Architect — Amazon Web Services (2025)
  `;

  const classification = analyzer.classifyDocument(resumeText);
  assert.strictEqual(classification.isResume, true, 'Should classify as resume');
  assert.ok(classification.confidence > 75, `Confidence must be > 75, got ${classification.confidence}`);
  assert.strictEqual(classification.status, 'CONFIDENT');

  const parsedSections = analyzer.parseResumeSections(resumeText);
  const contactInfo = analyzer.extractContactInfo(resumeText);
  const skills = analyzer.extractSkills(resumeText, parsedSections);
  const profile = analyzer.buildStructuredResumeProfile({
    resumeText, contactInfo, skills,
    summaryAnalysis: analyzer.analyzeProfessionalSummary(resumeText, parsedSections, skills),
    experienceAnalysis: analyzer.analyzeExperience(resumeText, parsedSections.sectionContent),
    projectsAnalysis: analyzer.analyzeProjects(resumeText, parsedSections.sectionContent),
    educationAnalysis: analyzer.analyzeEducation(resumeText, parsedSections),
    certificationsAnalysis: analyzer.analyzeCertifications(resumeText, parsedSections),
    achievementsAnalysis: analyzer.analyzeAchievements(resumeText, parsedSections)
  });

  assert.strictEqual(profile.isFresher, true, 'Student mode should be active');
  assert.ok(skills.all.includes('React'), 'React skill should be found');
  assert.ok(skills.all.includes('JavaScript'), 'JavaScript skill should be found');
  assert.ok(skills.all.includes('C++'), 'C++ skill should be found');
})) passedCount++;

// ----------------------------------------------------
// TEST 2: Experienced Software Engineer Resume -> PASS
// ----------------------------------------------------
if (runTest('TEST 2: Experienced software engineer resume', () => {
  const resumeText = `
Sarah Connor
San Francisco, CA | sarah.connor@example.com | +1 (555) 234-5678 | linkedin.com/in/sarah-connor | github.com/sconnor

PROFESSIONAL SUMMARY
Senior Software Engineer with 5+ years of experience building high-throughput distributed backend services, cloud-native microservices, and event-driven architectures.

WORK EXPERIENCE
Senior Backend Engineer | CloudScale Systems Inc. | Mar 2021 – Present
• Architected and deployed distributed event streaming microservices in Go and Kafka processing 50M+ daily events.
• Optimized PostgreSQL query execution plans reducing P99 latency by 42% across core database clusters.
• Led cloud migration to AWS EKS (Kubernetes) cutting annual cloud infrastructure expenses by $180,000.
• Mentored a team of 6 junior and mid-level software engineers on system design and TDD practices.

Software Engineer | Apex FinTech Labs | Jan 2019 – Feb 2021
• Engineered secure RESTful APIs in Python and FastAPI handling $12M in monthly financial transactions.
• Built automated CI/CD pipelines with GitHub Actions and Docker reducing release cycle from 3 days to 25 minutes.

TECHNICAL SKILLS
Languages: Python, Go, TypeScript, SQL, Bash
Backend & Systems: FastAPI, Django, PostgreSQL, Redis, Kafka, gRPC, Microservices
Cloud & DevOps: AWS, Docker, Kubernetes, Terraform, CI/CD, Linux, Prometheus
CS Core: System Design, Distributed Systems, Data Structures, Algorithms

EDUCATION
University of California, Berkeley
Bachelor of Science in Computer Science | 2014 – 2018 | GPA: 3.8 / 4.0

CERTIFICATIONS
• AWS Certified Solutions Architect — Associate
  `;

  const classification = analyzer.classifyDocument(resumeText);
  assert.strictEqual(classification.isResume, true);
  assert.ok(classification.confidence >= 85, `Confidence must be >= 85, got ${classification.confidence}`);

  const parsedSections = analyzer.parseResumeSections(resumeText);
  const exp = analyzer.analyzeExperience(resumeText, parsedSections.sectionContent);
  assert.strictEqual(exp.isFresher, false, 'Should be detected as experienced');
  assert.ok(exp.score >= 15, `Experience score should be >= 15, got ${exp.score}`);
})) passedCount++;

// ----------------------------------------------------
// TEST 3: Certificate PDF -> REJECT
// ----------------------------------------------------
if (runTest('TEST 3: Certificate PDF -> REJECT (<60 confidence)', () => {
  const certText = `
CERTIFICATE OF COMPLETION
This is to certify that
Rohan Verma
has successfully completed the 8-week intensive course in
Python for Beginners and Data Analytics
Given this day of October 12, 2024
Authorized Signatory: Dr. Angela Smith, Director
Course Completion Certificate ID: CERT-PY-889104
Online Learning Academy International
  `;

  const classification = analyzer.classifyDocument(certText);
  assert.strictEqual(classification.isResume, false, 'Must not be classified as a resume');
  assert.strictEqual(classification.status, 'REJECTED');
  assert.strictEqual(classification.detectedType, 'certificate');
  assert.ok(classification.confidence < 60, `Confidence must be < 60, got ${classification.confidence}`);
})) passedCount++;

// ----------------------------------------------------
// TEST 4: College Marksheet -> REJECT
// ----------------------------------------------------
if (runTest('TEST 4: College marksheet / transcript -> REJECT (<60 confidence)', () => {
  const marksheetText = `
STATE TECHNICAL UNIVERSITY
STATEMENT OF MARKS
SEMESTER IV EXAMINATION (2023-2024)
Roll No: 220091384012 | Enrollment No: EN20220918
Candidate Name: Amit Kumar | Branch: Computer Science & Engineering

Subject Code | Subject Name | Credits | Theory Marks | Practical Marks | Grade Point
CS401 | Database Management Systems | 4 | 76/100 | 45/50 | 8.5
CS402 | Operating Systems | 4 | 82/100 | 48/50 | 9.0
CS403 | Computer Networks | 4 | 68/100 | 42/50 | 7.5
CS404 | Software Engineering | 3 | 74/100 | 44/50 | 8.0

Semester Grade Point Average (SGPA): 8.25
Cumulative Grade Point Average (CGPA): 8.18
Result: PASSED IN FIRST DIVISION
Date of Issue: 18-07-2024 | Controller of Examinations
  `;

  const classification = analyzer.classifyDocument(marksheetText);
  assert.strictEqual(classification.isResume, false);
  assert.strictEqual(classification.status, 'REJECTED');
  assert.strictEqual(classification.detectedType, 'marksheet');
  assert.ok(classification.confidence < 60, `Confidence must be < 60, got ${classification.confidence}`);
})) passedCount++;

// ----------------------------------------------------
// TEST 5: Research Paper -> REJECT
// ----------------------------------------------------
if (runTest('TEST 5: Research paper / publication -> REJECT (<60 confidence)', () => {
  const paperText = `
An Efficient Graph Neural Network for Large-Scale Traffic Flow Prediction
IEEE Transactions on Intelligent Transportation Systems, vol. 18, no. 4, 2024
doi: 10.1109/TITS.2024.9928104

Abstract — Traffic flow forecasting is a critical component of intelligent transportation systems. In this paper, we propose a spatio-temporal graph convolutional network (ST-GCN) that integrates dynamic attention mechanisms.

Index Terms — Graph neural networks, traffic prediction, deep learning, spatio-temporal modeling.

I. INTRODUCTION
Urban traffic congestion leads to substantial economic losses worldwide. Existing statistical models struggle to capture nonlinear spatial dependencies.

II. METHODOLOGY AND MATHEMATICAL FORMULATION
Let G = (V, E, W) represent the road network graph where V denotes sensor nodes...

III. EXPERIMENTAL RESULTS AND EVALUATION
We evaluated our proposed architecture on the METR-LA and PEMS-BAY benchmark datasets.

IV. CONCLUSION AND FUTURE WORK
We demonstrated superior accuracy with 14% lower Mean Absolute Error.

REFERENCES
[1] J. Smith and K. Doe, "Deep learning on graphs," IEEE Trans. Pattern Anal. Mach. Intell., 2021.
[2] A. Vaswani et al., "Attention is all you need," in NeurIPS, 2017.
  `;

  const classification = analyzer.classifyDocument(paperText);
  assert.strictEqual(classification.isResume, false);
  assert.strictEqual(classification.status, 'REJECTED');
  assert.strictEqual(classification.detectedType, 'research_paper');
  assert.ok(classification.confidence < 60, `Confidence must be < 60, got ${classification.confidence}`);
})) passedCount++;

// ----------------------------------------------------
// TEST 6: Invoice -> REJECT
// ----------------------------------------------------
if (runTest('TEST 6: Invoice / Commercial bill -> REJECT (<60 confidence)', () => {
  const invoiceText = `
TAX INVOICE
Acme Cloud Hosting & SaaS Solutions LLC
100 Silicon Ave, Suite 400, San Jose, CA 95112
GSTIN / VAT Reg: 09AAACA1234F1Z5

Invoice No: INV-2024-10928
Invoice Date: August 14, 2024
Due Date: August 28, 2024
Payment Terms: Net 14 Days

Bill To:
TechCorp Global Enterprises
Attn: Accounts Payable
450 Lexington Ave, New York, NY 10017

Item Description | Qty | Unit Price | Total Amount
Cloud Kubernetes Cluster Enterprise Plan (July 2024) | 1 | $1,200.00 | $1,200.00
Dedicated Redis Caching Instance (64GB) | 2 | $150.00 | $300.00
Automated Backup Storage (5TB) | 1 | $75.00 | $75.00

Subtotal: $1,575.00
Tax (10%): $157.50
Total Due: $1,732.50
Amount Due: $1,732.50

Remit Payment To: Silicon Valley Bank, Routing #121000358, Account #987654321
  `;

  const classification = analyzer.classifyDocument(invoiceText);
  assert.strictEqual(classification.isResume, false);
  assert.strictEqual(classification.status, 'REJECTED');
  assert.strictEqual(classification.detectedType, 'invoice');
  assert.ok(classification.confidence < 60, `Confidence must be < 60, got ${classification.confidence}`);
})) passedCount++;

// ----------------------------------------------------
// TEST 7: Random PDF (Name/Phone/Email only) -> REJECT
// ----------------------------------------------------
if (runTest('TEST 7: Random text with only name, phone and email -> REJECT', () => {
  const randomText = `
Aditya Sharma
+91 96160 32564
email@example.com
Kanpur, India
  `;

  const classification = analyzer.classifyDocument(randomText);
  assert.strictEqual(classification.isResume, false);
  assert.strictEqual(classification.status, 'REJECTED');
  assert.ok(classification.confidence < 60, `Confidence must be < 60, got ${classification.confidence}`);
  assert.ok(classification.missingSignals.includes('Education Section'));
  assert.ok(classification.missingSignals.includes('Projects Section'));
})) passedCount++;

// ----------------------------------------------------
// TEST 8: Scanned Image Resume (Readable OCR Text) -> PASS
// ----------------------------------------------------
if (runTest('TEST 8: Scanned image resume with OCR extracted text -> PASS', () => {
  const ocrText = `
ALEX JOHNSON
alex.johnson@devmail.io | +1 415 555 0199 | github.com/alexj-dev | San Francisco, CA

SUMMARY
Full stack web developer with 2 years of experience building modern React and Node.js applications.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, HTML5, CSS3
Frameworks: React, Express, Node.js, Tailwind CSS
Databases: MongoDB, PostgreSQL, Redis
Tools: Git, GitHub, Docker, Postman

EXPERIENCE
Frontend Developer | WebCraft Digital | June 2023 – Present
• Developed interactive dashboard interfaces in React and TypeScript reducing load time by 30%.
• Integrated REST APIs and optimized state management.

PROJECTS
DevHub Community Portal | github.com/alexj-dev/devhub
• Built full stack collaborative portal using React, Node.js, and MongoDB with user authentication.

EDUCATION
San Francisco State University
B.S. in Computer Science | 2019 – 2023
  `;

  const classification = analyzer.classifyDocument(ocrText);
  assert.strictEqual(classification.isResume, true);
  assert.ok(classification.confidence >= 75);
})) passedCount++;

// ----------------------------------------------------
// TEST 9: Resume with Missing Sections -> PASS WITH WARNINGS
// ----------------------------------------------------
if (runTest('TEST 9: Resume with missing sections -> PASS WITH WARNINGS (60-75 confidence)', () => {
  // Missing summary, certifications, achievements, experience, but has valid education, skills, and projects
  const partialResume = `
Vikram Malhotra
vikram.m@example.com | +91 98765 43210 | Bangalore, India | github.com/vikram-code

TECHNICAL SKILLS
JavaScript, React, Node.js, Express, MongoDB, HTML, CSS, Git

PROJECTS
E-Commerce Shopping App | github.com/vikram-code/shop-app
• Developed full stack shopping cart with payment gateway and product filters in React and Node.js.

Task Manager Application | github.com/vikram-code/task-mgr
• Built responsive task tracking board with local storage persistence and drag-and-drop support.

EDUCATION
Visvesvaraya Technological University
Bachelor of Engineering in Information Science | 2020 – 2024
  `;

  const classification = analyzer.classifyDocument(partialResume);
  assert.strictEqual(classification.isResume, true);
  assert.ok(classification.confidence >= 60 && classification.confidence <= 75, `Confidence must be between 60-75, got ${classification.confidence}`);
  assert.strictEqual(classification.status, 'UNCERTAIN');
  assert.ok(classification.missingSignals.includes('Professional Summary'));
})) passedCount++;

// ----------------------------------------------------
// TEST 10: Resume with Contradictory Information -> PASS + CONSISTENCY WARNING
// ----------------------------------------------------
if (runTest('TEST 10: Resume with contradictory info -> PASS + CONSISTENCY WARNING', () => {
  const contradictoryResume = `
Rahul Gupta
rahul.gupta@example.com | +91 99887 76655 | Delhi, India | github.com/rahul-dev

PROFESSIONAL SUMMARY
Dynamic software engineer with 5+ years of experience in JavaScript, React, and solving 150+ LeetCode problems.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, C++, HTML, CSS, SQL, JavaScript, React, JavaScript
Frameworks: React, Node.js, Express

PROJECTS
Task Tracker Pro | github.com/rahul-dev/task-pro
• Architected modern responsive web UI supporting 2 distinct screening modes, reducing workflow completion time by 30%.
• Architected modern responsive web UI supporting 2 distinct screening modes, reducing workflow completion time by 30%.

EDUCATION
Delhi Technological University
B.Tech in Computer Science | 2022 - 2026

ACHIEVEMENTS
• Solved 170+ LeetCode challenges with high contest rating.
  `;

  const classification = analyzer.classifyDocument(contradictoryResume);
  assert.strictEqual(classification.isResume, true);

  const parsedSections = analyzer.parseResumeSections(contradictoryResume);
  const structured = analyzer.buildStructuredResumeProfile({
    resumeText: contradictoryResume,
    contactInfo: analyzer.extractContactInfo(contradictoryResume),
    skills: analyzer.extractSkills(contradictoryResume, parsedSections),
    summaryAnalysis: analyzer.analyzeProfessionalSummary(contradictoryResume, parsedSections, analyzer.extractSkills(contradictoryResume)),
    experienceAnalysis: analyzer.analyzeExperience(contradictoryResume, parsedSections.sectionContent),
    projectsAnalysis: analyzer.analyzeProjects(contradictoryResume, parsedSections.sectionContent),
    educationAnalysis: analyzer.analyzeEducation(contradictoryResume, parsedSections),
    certificationsAnalysis: analyzer.analyzeCertifications(contradictoryResume, parsedSections),
    achievementsAnalysis: analyzer.analyzeAchievements(contradictoryResume, parsedSections)
  });

  const consistency = analyzer.checkInternalConsistency(contradictoryResume, { experienceAnalysis: { isFresher: true } }, parsedSections);
  assert.strictEqual(consistency.hasContradictions, true, 'Must detect contradictions');
  assert.ok(consistency.contradictions.some(c => c.includes('problem counts') || c.includes('years of experience')), 'Must flag LeetCode or years discrepancy');
  assert.strictEqual(consistency.hasDuplicates, true, 'Must detect duplicate project bullets or skills');
})) passedCount++;

// ----------------------------------------------------
// TEST 11: Controlled Weak Test Resume -> Score 25–50
// ----------------------------------------------------
if (runTest('TEST 11: Controlled weak test resume -> Score in 25–50 range', () => {
  const weakResume = `
John Doe
+1 555-0199
john.doe@example.com

OBJECTIVE
Hardworking and motivated student looking for a challenging role at a reputed company to utilize my skills and learn new technologies.

SKILLS
HTML, CSS

PROJECTS
Calculator
Made a simple calculator using HTML and CSS for college project.

EDUCATION
State College
Bachelor of Arts | 2023
  `;

  const parsed = analyzer.parseResumeSections(weakResume);
  const contact = analyzer.extractContactInfo(weakResume);
  const skills = analyzer.extractSkills(weakResume, parsed);
  const summary = analyzer.analyzeProfessionalSummary(weakResume, parsed, skills);
  const exp = analyzer.analyzeExperience(weakResume, parsed.sectionContent);
  const proj = analyzer.analyzeProjects(weakResume, parsed.sectionContent);
  const edu = analyzer.analyzeEducation(weakResume, parsed);
  const cert = analyzer.analyzeCertifications(weakResume, parsed);
  const ach = analyzer.analyzeAchievements(weakResume, parsed);
  const cq = analyzer.analyzeContentQuality(weakResume, exp, proj);
  const fmt = analyzer.analyzeATSFormatting(weakResume, parsed);

  const scores = analyzer.calculateATSScore(
    weakResume, contact, summary, skills, exp, proj, edu, cert, ach, cq, fmt
  );

  assert.ok(scores.overall >= 25 && scores.overall <= 50, `Weak resume score must be 25–50, got ${scores.overall}`);
  assert.strictEqual(scores.breakdown.experience.score, 0, 'No experience should yield 0');
  assert.ok(scores.breakdown.contact.score <= 3, 'Contact score must not exceed 3');
})) passedCount++;

// ----------------------------------------------------
// TEST 12: Controlled Strong Test Resume -> Score 90–99
// ----------------------------------------------------
if (runTest('TEST 12: Controlled strong test resume -> Score in 90–99 range', () => {
  const strongResume = `
Aditya Sharma
Kanpur, UP, India | +91 96160 32564 | aditya@example.com
github.com/2k25adityasharma | linkedin.com/in/aditya-sharma | leetcode.com/u/aditya

PROFESSIONAL SUMMARY
Passionate Full Stack & AI Developer with practical experience developing modern web applications, responsive frontend architectures, and real-time AI solutions using C++, JavaScript, REST APIs, and Gemini API.

TECHNICAL SKILLS
Languages: C++, JavaScript, TypeScript, HTML5, CSS3, SQL
Frontend: React, Next.js, Tailwind CSS, Responsive Design
Backend & APIs: Node.js, Express.js, REST APIs, Gemini API
Cloud & Deployment: Vercel, AWS, Git, GitHub
Core CS: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP)

WORK EXPERIENCE
Software Development Intern | TechWave Innovations | Jan 2024 – June 2024
• Developed and deployed responsive full-stack features using JavaScript and REST APIs, improving user engagement by 28%.
• Optimized database queries and backend endpoints reducing average response latency by 35%.
• Collaborated with senior engineering team to integrate automated CI/CD deployment pipelines on Vercel.

PROJECTS
SONIQX — Web Audiometer & Hearing Diagnostic Suite | github.com/aditya/soniqx
• Architected modern responsive web UI supporting 2 distinct screening modes, reducing workflow completion time by 30%.
• Engineered pure-tone audiometry test protocols across 125Hz-8000Hz with 98% calibration accuracy using JavaScript and HTML5.
• Deployed production application on Vercel with responsive diagnostic visualization.

AI Conversational Assistant with Gemini API | github.com/aditya/gemini-bot
• Engineered responsive AI assistant leveraging Google Gemini API and Node.js REST APIs for real-time prompt completion.
• Implemented client-side caching and streaming responses with sub-200ms latency.
• Containerized and deployed application on Vercel handling 1,500+ daily developer prompts.

Algorithm Visualizer & Graph Suite | github.com/aditya/algo-visualizer
• Built interactive algorithm visualizer for complex graph traversals and sorting algorithms in C++ and JavaScript.
• Engineered dynamic Canvas API rendering running smoothly at 60 FPS across all devices.

EDUCATION
Dr. A.P.J. Abdul Kalam Technical University
Bachelor of Technology (B.Tech) in Computer Science & Engineering | 2022 – 2026 | CGPA: 8.5 / 10.0

ACHIEVEMENTS
• Solved 220+ Data Structures & Algorithms (DSA) problems on LeetCode with a 120+ day coding consistency streak.
• Finalist in National Level Innovation Hackathon competing among 300+ engineering teams.

CERTIFICATIONS
• AWS Certified Solutions Architect — Amazon Web Services (2025)
• Full Stack Web Development Professional Specialization — Meta (2024)
  `;

  const parsed = analyzer.parseResumeSections(strongResume);
  const contact = analyzer.extractContactInfo(strongResume);
  const skills = analyzer.extractSkills(strongResume, parsed);
  const summary = analyzer.analyzeProfessionalSummary(strongResume, parsed, skills);
  const exp = analyzer.analyzeExperience(strongResume, parsed.sectionContent);
  const proj = analyzer.analyzeProjects(strongResume, parsed.sectionContent);
  const edu = analyzer.analyzeEducation(strongResume, parsed);
  const cert = analyzer.analyzeCertifications(strongResume, parsed);
  const ach = analyzer.analyzeAchievements(strongResume, parsed);
  const cq = analyzer.analyzeContentQuality(strongResume, exp, proj);
  const fmt = analyzer.analyzeATSFormatting(strongResume, parsed);

  const scores = analyzer.calculateATSScore(
    strongResume, contact, summary, skills, exp, proj, edu, cert, ach, cq, fmt
  );

  assert.ok(scores.overall >= 90 && scores.overall <= 100, `Strong resume score must be 90–100, got ${scores.overall}`);
  assert.strictEqual(scores.breakdown.summary.score, 8, 'Strong summary should score 8/8');
  assert.strictEqual(scores.breakdown.keywords.score, 15, 'Skills should score 15/15');
  assert.ok(scores.breakdown.projects.score >= 18, 'Strong projects should score >= 18/20');
  assert.strictEqual(scores.breakdown.experience.score, 15, 'Internship + student project compensation should score 15/15');
  assert.strictEqual(scores.breakdown.education.score, 10, 'B.Tech CSE with university, dates, CGPA should score 10/10');
  assert.strictEqual(scores.breakdown.achievements.score, 10, '220+ LeetCode + streak + hackathon should score 10/10');
  assert.strictEqual(scores.breakdown.certifications.score, 5, 'AWS + Meta certs should score 5/5');
  assert.strictEqual(scores.breakdown.contact.score, 3, 'Contact should score 3/3');
})) passedCount++;

// ----------------------------------------------------
// TEST 13: Estimated Role Fit vs Real Job Match distinction
// ----------------------------------------------------
if (runTest('TEST 13: Estimated Role Fit vs Real Job Match distinction', () => {
  const resumeText = `
Aditya Sharma
aditya@example.com | +91 96160 32564
TECHNICAL SKILLS: C++, JavaScript, Data Structures & Algorithms, React, Node.js, Git
PROJECTS:
Algorithm Visualizer in C++ and JavaScript.
EDUCATION:
B.Tech in Computer Science | 2022 - 2026
EXPERIENCE:
Software Development Intern | Jan 2024 - June 2024
  `;

  const parsed = analyzer.parseResumeSections(resumeText);
  const resumeData = {
    resumeText,
    contactInfo: analyzer.extractContactInfo(resumeText),
    skills: analyzer.extractSkills(resumeText, parsed),
    summaryAnalysis: analyzer.analyzeProfessionalSummary(resumeText, parsed, analyzer.extractSkills(resumeText)),
    experienceAnalysis: analyzer.analyzeExperience(resumeText, parsed.sectionContent),
    projectsAnalysis: analyzer.analyzeProjects(resumeText, parsed.sectionContent),
    educationAnalysis: analyzer.analyzeEducation(resumeText, parsed),
    certificationsAnalysis: analyzer.analyzeCertifications(resumeText, parsed),
    achievementsAnalysis: analyzer.analyzeAchievements(resumeText, parsed)
  };

  // 1. Role Fit without JD
  const roleMatches = analyzer.calculateJobRoleMatches(resumeData);
  assert.ok(roleMatches.bestFit, 'Should have best fit role');
  assert.ok(roleMatches.bestFit.roleFitScore != null, 'Must define roleFitScore');
  assert.ok(roleMatches.topRecommendations.every(r => r.roleFitScore != null), 'Every recommendation must have roleFitScore');

  // 2. Real Job Match with actual JD
  const sampleJD = `
Job Title: C++ Software Engineer
Requirements: C++, Data Structures, Algorithms, 2+ years of experience
Preferred: React, Python
  `;
  const jdMatch = analyzer.analyzeJobDescriptionMatch(resumeData, sampleJD);
  assert.ok(jdMatch != null, 'Must calculate JD match');
  assert.ok(jdMatch.matchedRequired.includes('C++'), 'C++ should be in matchedRequired');
  assert.strictEqual(jdMatch.factors.requiredSkills.max, 30);
  assert.strictEqual(jdMatch.factors.preferredSkills.max, 10);
  assert.strictEqual(jdMatch.factors.experience.max, 20);
})) passedCount++;

if (runTest('TEST 14: Canonical skill normalization, deduplication & priority resolution', () => {
  const frontendJD = `
Frontend Developer Intern

Requirements:
- Strong understanding of HTML, CSS, and JavaScript.
- Knowledge of DOM manipulation and ES6+ JavaScript.
- Familiarity with React.js.
- Understanding of responsive web design.
- Basic knowledge of REST APIs.
- Familiarity with Git and GitHub.

Preferred:
- Experience with React, Next.js, or Tailwind CSS.
- Experience building and deploying personal web projects.
- Understanding of frontend performance optimization.
- Experience working with AI APIs or generative AI applications.
  `;

  const parsedJD = analyzer.parseJobDescription(frontendJD);
  assert.ok(parsedJD, 'JD must parse successfully');

  // 1. React must be in Required, not Preferred
  assert.ok(parsedJD.requiredSkills.includes('React'), 'React must be in Required skills');
  assert.ok(!parsedJD.preferredSkills.includes('React'), 'React must NOT be in Preferred skills because it is Required');

  // 2. Canonical forms
  assert.ok(parsedJD.preferredSkills.includes('Next.js'), 'Next.js must be in Preferred');
  assert.ok(parsedJD.preferredSkills.includes('Tailwind CSS'), 'Tailwind CSS must be in Preferred');

  // 3. No duplicate Tailwind or Tailwind CSS entries
  const tailwindCount = parsedJD.preferredSkills.filter(s => s.toLowerCase().includes('tailwind')).length;
  assert.strictEqual(tailwindCount, 1, 'Tailwind CSS must appear only once');

  // 4. Test with candidate resume LACKING React and Tailwind
  const resumeWithoutReact = {
    skills: { all: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub', 'REST APIs', 'Responsive Design'] },
    resumeText: 'HTML5, CSS3, JavaScript, Git, GitHub, REST APIs, responsive design',
    projects: ['Audiometer Diagnostic Suite', 'Graph Visualizer'],
    isFresher: true
  };

  const matchRes = analyzer.matchJobProfileWithResume(resumeWithoutReact, parsedJD);
  assert.ok(matchRes, 'Match result must be generated');

  // 5. Missing Required must contain React
  assert.ok(matchRes.missingRequired.includes('React'), 'React must be classified as MISSING REQUIRED');
  assert.ok(!matchRes.missingPreferred.includes('React'), 'React must NOT appear in missing Preferred');

  // 6. Missing Preferred must contain Tailwind CSS without duplicates
  assert.ok(matchRes.missingPreferred.includes('Tailwind CSS'), 'Tailwind CSS must be in missing Preferred');
  const missingTailwindCount = matchRes.missingPreferred.filter(s => s.toLowerCase().includes('tailwind')).length;
  assert.strictEqual(missingTailwindCount, 1, 'Missing Tailwind CSS must not be duplicated');

  // 7. Internal Debug object presence and structure
  assert.ok(matchRes.debug, 'Debug object must be present');
  assert.ok(Array.isArray(matchRes.debug.requiredSkills), 'debug.requiredSkills must be an array');
  assert.ok(Array.isArray(matchRes.debug.preferredSkills), 'debug.preferredSkills must be an array');
  assert.ok(Array.isArray(matchRes.debug.matchedRequired), 'debug.matchedRequired must be an array');
  assert.ok(Array.isArray(matchRes.debug.missingRequired), 'debug.missingRequired must be an array');
  assert.ok(Array.isArray(matchRes.debug.matchedPreferred), 'debug.matchedPreferred must be an array');
  assert.ok(Array.isArray(matchRes.debug.missingPreferred), 'debug.missingPreferred must be an array');
  assert.ok(Array.isArray(matchRes.debug.duplicateSkillsRemoved), 'debug.duplicateSkillsRemoved must be an array');
  assert.ok(matchRes.debug.canonicalizationMap, 'debug.canonicalizationMap must be present');

  // Verify dynamic scores
  assert.ok(typeof matchRes.reqScore === 'number' && matchRes.reqScore <= 30, 'reqScore must be valid');
  assert.ok(typeof matchRes.prefScore === 'number' && matchRes.prefScore <= 10, 'prefScore must be valid');
  assert.ok(matchRes.matchScore > 0 && matchRes.matchScore <= 100, 'matchScore must be between 0 and 100');
})) passedCount++;

totalCount = 14;

console.log(`\n====================================================`);
console.log(` Test Results: ${passedCount} / ${totalCount} Passed`);
console.log(`====================================================`);

if (passedCount === totalCount) {
  process.exit(0);
} else {
  process.exit(1);
}
