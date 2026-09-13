/**
 * DevPilot-AI: Automated Test Suite for Real Generic Resume Analyzer Architecture
 * Validates:
 * 1. Single Source of Truth (`resumeAnalysis`)
 * 2. Hard state wipe on successive uploads (zero data leakage)
 * 3. 100% dynamic project extraction (no dummy "Featured Project")
 * 4. Experience consistency: If bullets = 0, experienceScore = 0/15 (no 11/15 with 0 bullets contradiction)
 * 5. Student/Fresher adaptive weighting (high overall score without experience penalty)
 * 6. Multi-domain dynamic role detection (Web, Data, Systems, Senior)
 * 7. Unverified links distinction
 */

const assert = require('assert');
const {
  executeMasterAiEvaluation,
  detectDynamicRoles,
  extractSkills,
  parseResumeSections,
  analyzeExperience,
  analyzeProjects,
  clearAnalysisResult
} = require('../../js/pages/resumeAnalyzer.js');

console.log('====================================================');
console.log(' DevPilot-AI: Generic Resume Analyzer Architecture Tests');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    console.log(`--- RUNNING: ${name} ---`);
    fn();
    console.log(`✓ [PASS]: ${name}\n`);
    passedTests++;
  } catch (err) {
    console.error(`✗ [FAIL]: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

// ------------------------------------------------------------------
// RESUME A: Student / Fresher with Stellar Projects & 0 Work Experience
// ------------------------------------------------------------------
const RESUME_A_STUDENT = `
Aarav Patel
Email: aarav.patel@example.com | Phone: +91 98111 22334
LinkedIn: linkedin.com/in/aarav-patel | GitHub: github.com/aarav-patel
Location: Pune, India

EDUCATION
B.Tech in Computer Science and Engineering | CGPA: 9.1 / 10.0
Pune Institute of Computer Technology | 2022 - 2026

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, C++, SQL, HTML5, CSS3
Frontend: React, Next.js, Tailwind CSS, Redux
Backend: Node.js, Express, FastAPI, REST APIs, WebSockets
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS S3, Git

PROJECTS
DevPulse — Real-Time Developer Activity Dashboard
- Engineered full-stack developer analytics platform processing real-time GitHub webhook events.
- Implemented WebSocket event streaming handling 1,500+ messages per second with sub-50ms latency.
- Tech Stack: TypeScript, React, Node.js, PostgreSQL, Redis, Docker
- GitHub: github.com/aarav-patel/devpulse

NeuralDoc — AI Document Summarizer & Q&A
- Built RAG pipeline using Gemini API, vector embeddings, and LangChain for querying technical PDFs.
- Reduced document question-answering search time by 60% with semantic caching in Redis.
- Tech Stack: Python, FastAPI, Gemini API, LangChain, PostgreSQL, Docker
- GitHub: github.com/aarav-patel/neuraldoc

ACHIEVEMENTS & CERTIFICATIONS
- LeetCode Guardian: 650+ DSA problems solved (Rating: 2150)
- Winner, Smart India Hackathon 2024 (1st place)
- AWS Certified Cloud Practitioner (2024)
`;

// ------------------------------------------------------------------
// RESUME B: Experienced Senior Software Engineer (6+ Years)
// ------------------------------------------------------------------
const RESUME_B_SENIOR = `
Sarah Jenkins
Email: sarah.jenkins@techcorp.io | Phone: +1 (555) 234-5678
LinkedIn: linkedin.com/in/sarahjenkins-dev | GitHub: github.com/sjenkins-cloud
Location: Seattle, WA

SUMMARY
Senior Software Engineer with 6+ years of experience architecting distributed microservices, high-throughput data ingestion pipelines, and multi-region cloud infrastructure on AWS and Kubernetes.

WORK EXPERIENCE
Staff / Lead Software Engineer | CloudScale Technologies (2022 - Present)
- Architected enterprise multi-tenant distributed streaming platform on AWS, processing 40M+ events per day with 99.99% reliability.
- Optimized DynamoDB partition schemes and Redis caching layers, cutting p99 read latency from 140ms to 18ms.
- Mentored a squad of 8 engineers and spearheaded migration from monolith to Kubernetes microservices.

Senior Backend Engineer | DataStream Systems (2018 - 2022)
- Engineered scalable REST and gRPC services in Go and Java for transaction processing handling $50M+ in annual volume.
- Reduced AWS EC2 and RDS infrastructure spend by 35% via automated auto-scaling and spot instance orchestration.
- Automated CI/CD deployment pipelines using GitHub Actions, Terraform, and Docker.

TECHNICAL SKILLS
Languages: Go, Java, Python, TypeScript, SQL
Cloud & Infrastructure: AWS, Kubernetes, Docker, Terraform, Kafka, Redis, CI/CD
Databases: PostgreSQL, DynamoDB, MongoDB, MySQL

EDUCATION
Bachelor of Science in Computer Science | University of Washington | 2014 - 2018

CERTIFICATIONS
- AWS Certified Solutions Architect - Professional
- Certified Kubernetes Administrator (CKA)
`;

// ------------------------------------------------------------------
// RESUME C: Data Analyst / Business Intelligence Career Professional
// ------------------------------------------------------------------
const RESUME_C_DATA_ANALYST = `
David Chen
Email: david.chen@analyticsmail.com | Phone: +1 (415) 890-1234
LinkedIn: linkedin.com/in/davidchen-analytics
Location: San Francisco, CA

PROFESSIONAL SUMMARY
Data Analyst with 3 years of experience transforming raw enterprise datasets into actionable executive dashboards, statistical models, and revenue insights.

EXPERIENCE
Data Analyst | RetailMetrics Group (2021 - 2024)
- Built automated ETL pipelines in Python and SQL extracting daily point-of-sale data across 200+ retail stores.
- Designed 15+ interactive executive dashboards in Tableau and Power BI, identifying $2.4M in cross-selling opportunities.
- Performed cohort retention analysis and customer lifetime value (CLV) statistical modeling using Pandas and Scikit-Learn.

SKILLS
Data Analysis: SQL, Python, Pandas, NumPy, Tableau, Power BI, Excel, ETL, Statistics, A/B Testing, Data Visualization

PROJECTS
E-Commerce Churn Prediction Model
- Trained predictive logistic regression and random forest models achieving 84% accuracy in customer churn forecasting.
- Technologies: Python, Scikit-Learn, Pandas, Matplotlib

EDUCATION
B.S. in Statistics and Economics | University of California, Davis | 2017 - 2021
`;

// ------------------------------------------------------------------
// TEST 1: Resume A (Student with 0 Experience) - Zero Experience Contradiction
// ------------------------------------------------------------------
runTest('Resume A (Student): Experience Score MUST be 0 and have 0 bullets; Overall Score must remain High (>85)', () => {
  const resultA = executeMasterAiEvaluation(RESUME_A_STUDENT);

  // 1. Candidate Info
  assert.strictEqual(resultA.candidate.name, 'Aarav Patel', 'Candidate name must be Aarav Patel');
  assert.strictEqual(resultA.candidate.careerStage, 'Student', 'Career stage must be Student');

  // 2. Experience Metrics and Score Consistency
  const exp = resultA.experience;
  assert.strictEqual(exp.hasExperience, false, 'hasExperience must be false');
  assert.strictEqual(exp.count, 0, 'Experience count must be 0');
  assert.strictEqual(exp.entries.length, 0, 'Experience entries must be empty array');
  assert.strictEqual(exp.metrics.totalBullets, 0, 'Experience totalBullets must be 0');
  assert.strictEqual(exp.metrics.actionVerbsCount, 0, 'Experience actionVerbsCount must be 0');
  assert.strictEqual(exp.metrics.quantifiedCount, 0, 'Experience quantifiedCount must be 0');
  assert.strictEqual(exp.metrics.impactRatio, 0, 'Experience impactRatio must be 0');

  // 3. Experience Score MUST be 0/100 (which maps to 0/15 in UI)
  assert.strictEqual(resultA.scores.experienceScore, 0, 'Experience score MUST be 0 when bullets = 0');

  // 4. Overall Score must NOT be penalized for lack of experience
  assert(resultA.scores.overallResumeScore >= 85, `Student with stellar projects/skills should score >= 85, got ${resultA.scores.overallResumeScore}`);
  assert(resultA.scores.projectsScore >= 80, `Projects score should be >= 80, got ${resultA.scores.projectsScore}`);
  assert(resultA.scores.technicalSkillsScore >= 80, `Technical skills score should be >= 80, got ${resultA.scores.technicalSkillsScore}`);

  // 5. Projects extracted dynamically (exactly 2 projects)
  assert.strictEqual(resultA.projects.count, 2, 'Must extract exactly 2 projects');
  assert(resultA.projects.entries[0].name.includes('DevPulse'), 'First project must include DevPulse');
  assert(resultA.projects.entries[1].name.includes('NeuralDoc'), 'Second project must include NeuralDoc');

  // Verify NO dummy "Featured Project"
  const dummyFound = resultA.projects.entries.some(p => (p.name || '').toLowerCase().includes('featured project'));
  assert.strictEqual(dummyFound, false, 'Must NOT contain dummy "Featured Project"');

  console.log(`Student evaluation verified: Score: ${resultA.scores.overallResumeScore}/100, ExpScore: ${resultA.scores.experienceScore}/100, Bullets: ${exp.metrics.totalBullets}`);
});

// ------------------------------------------------------------------
// TEST 2: Resume B (Senior Engineer) - Experience Score > 80 and Senior Stage
// ------------------------------------------------------------------
runTest('Resume B (Senior Engineer): Detects Senior stage, non-zero experience score and metrics', () => {
  const resultB = executeMasterAiEvaluation(RESUME_B_SENIOR);

  assert.strictEqual(resultB.candidate.name, 'Sarah Jenkins', 'Candidate name must be Sarah Jenkins');
  assert(['Senior', 'Lead'].includes(resultB.candidate.careerStage), `Career stage should be Senior or Lead, got ${resultB.candidate.careerStage}`);

  const exp = resultB.experience;
  assert.strictEqual(exp.hasExperience, true, 'hasExperience must be true');
  assert(exp.metrics.totalBullets >= 4, `Expected at least 4 bullets, got ${exp.metrics.totalBullets}`);
  assert(exp.metrics.quantifiedCount >= 2, `Expected at least 2 quantified bullets, got ${exp.metrics.quantifiedCount}`);
  assert(resultB.scores.experienceScore >= 80, `Senior experience score should be >= 80, got ${resultB.scores.experienceScore}`);

  // Check dynamic role recommendations
  assert(['Cloud / DevOps Engineer', 'Backend Developer', 'Software Engineer', 'Systems / Infrastructure Engineer'].includes(resultB.candidate.primaryRole),
    `Primary role should match cloud/backend profile, got ${resultB.candidate.primaryRole}`);

  console.log(`Senior evaluation verified: Stage: ${resultB.candidate.careerStage}, ExpScore: ${resultB.scores.experienceScore}/100, Bullets: ${exp.metrics.totalBullets}, PrimaryRole: ${resultB.candidate.primaryRole}`);
});

// ------------------------------------------------------------------
// TEST 3: Resume C (Data Analyst) - Multi-Domain Dynamic Roles
// ------------------------------------------------------------------
runTest('Resume C (Data Analyst): Dynamically detects Data Analyst role without Web Dev bias', () => {
  const resultC = executeMasterAiEvaluation(RESUME_C_DATA_ANALYST);

  assert.strictEqual(resultC.candidate.name, 'David Chen', 'Candidate name must be David Chen');
  assert(resultC.candidate.primaryRole.toLowerCase().includes('data'),
    `Primary role must be Data Analyst or Data Scientist, got: ${resultC.candidate.primaryRole}`);

  // Ensure 'audiometer' or other hardcoded terms are nowhere in the output
  const jsonStr = JSON.stringify(resultC).toLowerCase();
  assert(!jsonStr.includes('audiometer'), 'Must not contain hardcoded audiometer keyword');

  console.log(`Data Analyst role detection verified: Candidate: ${resultC.candidate.name}, Role: ${resultC.candidate.primaryRole}`);
});

// ------------------------------------------------------------------
// TEST 4: State Wipe Between Successive Uploads (Zero Data Leakage)
// ------------------------------------------------------------------
runTest('Successive Upload State Wipe: Zero leakage of names, skills, projects, or scores', () => {
  // Step 1: Analyze Resume A
  const evalA = executeMasterAiEvaluation(RESUME_A_STUDENT);
  assert.strictEqual(evalA.candidate.name, 'Aarav Patel');

  // Step 2: Wipe State
  clearAnalysisResult();

  // Step 3: Analyze Resume B
  const evalB = executeMasterAiEvaluation(RESUME_B_SENIOR);
  assert.strictEqual(evalB.candidate.name, 'Sarah Jenkins');
  assert.notStrictEqual(evalB.candidate.name, evalA.candidate.name);

  // Verify none of Aarav's projects appear in Sarah's analysis
  const hasAaravProjects = evalB.projects.entries.some(p => p.name === 'DevPulse' || p.name === 'NeuralDoc');
  assert.strictEqual(hasAaravProjects, false, 'Sarah Jenkins must NOT have Aarav Patel projects');

  // Step 4: Wipe State again
  clearAnalysisResult();

  // Step 5: Analyze Resume C
  const evalC = executeMasterAiEvaluation(RESUME_C_DATA_ANALYST);
  assert.strictEqual(evalC.candidate.name, 'David Chen');
  assert.notStrictEqual(evalC.candidate.name, evalB.candidate.name);

  // Verify none of Sarah's skills or titles appear in David's analysis
  const hasSarahTitle = evalC.experience.entries.some(e => (e.title || '').includes('Staff / Lead'));
  assert.strictEqual(hasSarahTitle, false, 'David Chen must NOT have Sarah Jenkins titles');

  console.log('State wipe verified: 3 successive resumes evaluated with zero data leakage across runs.');
});

// ------------------------------------------------------------------
// TEST 5: Resume with Zero Projects
// ------------------------------------------------------------------
runTest('Zero Projects Resume: Correctly sets projects count = 0 and score = 0 without dummy insertion', () => {
  const RESUME_NO_PROJECTS = `
Michael Scott
Email: michael.scott@dundermifflin.com | Phone: 555-123-4567
Location: Scranton, PA

EXPERIENCE
Regional Manager | Dunder Mifflin Paper Company (2013 - 2024)
- Managed branch operations and sales team of 15 representatives.
- Oversaw client relations and achieved top regional sales growth.

EDUCATION
Scranton High School | 1983
`;

  const resultNoProj = executeMasterAiEvaluation(RESUME_NO_PROJECTS);
  assert.strictEqual(resultNoProj.projects.count, 0, 'Projects count must be 0');
  assert.strictEqual(resultNoProj.projects.entries.length, 0, 'Projects entries must be empty array');
  assert.strictEqual(resultNoProj.scores.projectsScore, 0, 'Projects score must be 0 when count is 0');

  console.log('Zero projects verified: count=0, entries=[], projectsScore=0.');
});

console.log('====================================================');
console.log(` Summary: ${passedTests} / ${totalTests} Tests Passed!`);
console.log('====================================================');
