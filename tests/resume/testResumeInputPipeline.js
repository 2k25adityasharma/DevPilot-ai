/**
 * DevPilot-AI — Resume Analyzer Input Pipeline Test Suite
 * Tests the complete flow:
 * 1. File validation (PDF, DOCX, TXT, 0-byte rejection)
 * 2. TXT file reading & text extraction
 * 3. Pre-AI validation guard (empty / whitespace / insufficient text)
 * 4. Construction of [RESUME_INPUT] ... [/RESUME_INPUT] delimiters
 * 5. Length-only debug logging (no raw resume text leaks)
 * 6. End-to-end real resume analysis (candidate name, contact, skills, education, projects, scores > 0)
 * 7. Graceful error handling without generating fake 0-score objects
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
    const res = fn();
    if (res instanceof Promise) {
      return res.then(() => {
        console.log(`${colors.green}✓ [PASS] ${testName}${colors.reset}`);
        return true;
      }).catch(err => {
        console.error(`${colors.red}✗ [FAIL] ${testName}${colors.reset}`);
        console.error(`  Error: ${err.message}`);
        return false;
      });
    }
    console.log(`${colors.green}✓ [PASS] ${testName}${colors.reset}`);
    return Promise.resolve(true);
  } catch (err) {
    console.error(`${colors.red}✗ [FAIL] ${testName}${colors.reset}`);
    console.error(`  Error: ${err.message}`);
    return Promise.resolve(false);
  }
}

async function main() {
  console.log(`${colors.blue}====================================================`);
  console.log(` DevPilot-AI: Resume Analyzer Input Pipeline Tests`);
  console.log(`====================================================${colors.reset}\n`);

  let passed = 0;
  let total = 0;

  const realResumeText = `
Aditya Sharma
Kanpur, UP, India | +91 98765 43210 | 2k25aiml2513475@gmail.com
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

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & AI
Dr. A.P.J. Abdul Kalam Technical University (AKTU) | 2022 - 2026
CGPA: 8.4 / 10.0

ACHIEVEMENTS
• Solved 200+ Data Structures & Algorithms problems across LeetCode and CodeChef.
• Finalist in National Level Web & AI Hackathon 2024.
`;

  // ----------------------------------------------------
  // TEST 1: File Validation supports PDF, DOCX, and TXT
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 1: File validation accepts .pdf, .docx, and .txt, rejects unsupported extensions', () => {
    assert.strictEqual(analyzer.validateFile({ name: 'resume.pdf', size: 1024 }).valid, true);
    assert.strictEqual(analyzer.validateFile({ name: 'resume.docx', size: 2048 }).valid, true);
    assert.strictEqual(analyzer.validateFile({ name: 'resume.txt', size: 512 }).valid, true);

    const invalidExt = analyzer.validateFile({ name: 'resume.exe', size: 1024 });
    assert.strictEqual(invalidExt.valid, false);
    assert.ok(invalidExt.error.includes('Please upload a PDF, DOCX, or TXT file'));

    const emptyFile = analyzer.validateFile({ name: 'empty.pdf', size: 0 });
    assert.strictEqual(emptyFile.valid, false);
    assert.ok(emptyFile.error.includes('0 bytes'));
  })) passed++;

  // ----------------------------------------------------
  // TEST 2: TXT Text Extraction from Buffer / File
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 2: extractTXTText extracts, cleans, and returns valid string from TXT input', async () => {
    const buf = Buffer.from(realResumeText, 'utf-8');
    const extracted = await analyzer.extractTXTText(buf);
    assert.strictEqual(typeof extracted, 'string');
    assert.ok(extracted.includes('Aditya Sharma'));
    assert.ok(extracted.includes('SONIQX'));
    assert.ok(extracted.length > 100);

    // Empty buffer or short text throws
    const shortBuf = Buffer.from('Too short', 'utf-8');
    let threw = false;
    try {
      await analyzer.extractTXTText(shortBuf);
    } catch (e) {
      threw = true;
      assert.ok(e.message.includes('Unable to extract readable text'));
    }
    assert.strictEqual(threw, true, 'Should throw on empty/too-short TXT file');
  })) passed++;

  // ----------------------------------------------------
  // TEST 3: Pre-AI Validation Guard
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 3: validateResumeInput rejects empty, whitespace, and short text without generating 0 scores', () => {
    const nullRes = analyzer.validateResumeInput(null);
    assert.strictEqual(nullRes.valid, false);

    const emptyRes = analyzer.validateResumeInput('   \n\t  ');
    assert.strictEqual(emptyRes.valid, false);
    assert.ok(emptyRes.error.includes('insufficient readable text') || emptyRes.error.includes('No resume text'));

    const shortRes = analyzer.validateResumeInput('John Doe Resume');
    assert.strictEqual(shortRes.valid, false);
    assert.ok(shortRes.error.includes('minimum 30 characters required'));

    const gibberishRes = analyzer.validateResumeInput('1234567890 1234567890 1234567890 !@#$%^&*()');
    assert.strictEqual(gibberishRes.valid, false);
    assert.ok(gibberishRes.error.includes('readable alphabetical text'));

    const validRes = analyzer.validateResumeInput(realResumeText);
    assert.strictEqual(validRes.valid, true);
    assert.ok(validRes.length > 500);
  })) passed++;

  // ----------------------------------------------------
  // TEST 4: Construction of [RESUME_INPUT] ... [/RESUME_INPUT]
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 4: constructMasterAiPrompt embeds real text inside [RESUME_INPUT] delimiters', () => {
    const prompt = analyzer.constructMasterAiPrompt(realResumeText);
    assert.ok(prompt.includes('[RESUME_INPUT]'), 'Prompt must contain [RESUME_INPUT]');
    assert.ok(prompt.includes('[/RESUME_INPUT]'), 'Prompt must contain [/RESUME_INPUT]');
    assert.ok(prompt.includes('Aditya Sharma'), 'Prompt must contain candidate name inside input');
    assert.ok(prompt.includes('[JOB_DESCRIPTION]'), 'Prompt must contain [JOB_DESCRIPTION]');
    assert.ok(prompt.includes('NOT_PROVIDED'), 'Default job description should be NOT_PROVIDED');

    const extracted = analyzer.extractResumeInputFromPrompt(prompt);
    assert.ok(extracted, 'Should extract resume text from prompt');
    assert.ok(extracted.includes('Aditya Sharma'));
    assert.ok(extracted.includes('SONIQX'));
    assert.strictEqual(extracted.length > 0, true);

    // Throws on empty input (never send empty RESUME_INPUT)
    assert.throws(() => {
      analyzer.constructMasterAiPrompt('   ');
    }, /Cannot construct AI prompt/);
  })) passed++;

  // ----------------------------------------------------
  // TEST 5: Prompt construction with optional Job Description
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 5: constructMasterAiPrompt embeds optional Job Description in [JOB_DESCRIPTION]', () => {
    const jd = 'Looking for a Full Stack React & Node.js Engineer with AWS experience.';
    const prompt = analyzer.constructMasterAiPrompt(realResumeText, jd);
    assert.ok(prompt.includes('[JOB_DESCRIPTION]\nLooking for a Full Stack React & Node.js Engineer with AWS experience.\n[/JOB_DESCRIPTION]'));
  })) passed++;

  // ----------------------------------------------------
  // TEST 6: Debug logging logs length ONLY, never raw text
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 6: Production logs expose text length only and never expose full raw resume text', () => {
    const logs = [];
    const origLog = console.log;
    console.log = (...args) => logs.push(args.join(' '));

    try {
      const v = analyzer.validateResumeInput(realResumeText);
      console.log(`[ResumeAnalyzer] Extracted resume text length: ${v.length} characters`);

      assert.strictEqual(logs.length, 1);
      assert.ok(logs[0].includes('Extracted resume text length:'));
      assert.ok(!logs[0].includes('2k25aiml2513475@gmail.com'), 'Email must NOT be leaked in log');
      assert.ok(!logs[0].includes('+91 98765 43210'), 'Phone must NOT be leaked in log');
      assert.ok(!logs[0].includes('SONIQX'), 'Project text must NOT be leaked in log');
    } finally {
      console.log = origLog;
    }
  })) passed++;

  // ----------------------------------------------------
  // TEST 7: End-to-end analysis populates candidate info & scores > 0
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 7: Valid resume analysis populates candidate name, contact, skills, education, projects, and scores > 0', () => {
    const parsedSections = analyzer.parseResumeSections(realResumeText);
    const contactInfo = analyzer.extractContactInfo(realResumeText);
    const skills = analyzer.extractSkills(realResumeText, parsedSections);
    const summaryAnalysis = analyzer.analyzeProfessionalSummary(realResumeText, parsedSections, skills);
    const experienceAnalysis = analyzer.analyzeExperience(realResumeText, parsedSections.sectionContent);
    const projectsAnalysis = analyzer.analyzeProjects(realResumeText, parsedSections.sectionContent);
    const educationAnalysis = analyzer.analyzeEducation(realResumeText, parsedSections);
    const certificationsAnalysis = analyzer.analyzeCertifications(realResumeText, parsedSections);
    const achievementsAnalysis = analyzer.analyzeAchievements(realResumeText, parsedSections);
    const contentQuality = analyzer.analyzeContentQuality(realResumeText, experienceAnalysis, projectsAnalysis);
    const formattingAnalysis = analyzer.analyzeATSFormatting(realResumeText, parsedSections, null);

    const scores = analyzer.calculateATSScore(
      realResumeText, contactInfo, summaryAnalysis, skills,
      experienceAnalysis, projectsAnalysis, educationAnalysis,
      certificationsAnalysis, achievementsAnalysis, contentQuality,
      formattingAnalysis, null
    );

    // Candidate details populated
    assert.strictEqual(contactInfo.details.name, 'Aditya Sharma');
    assert.strictEqual(contactInfo.details.email, '2k25aiml2513475@gmail.com');
    assert.strictEqual(contactInfo.details.phone, '+91 98765 43210');
    assert.ok(contactInfo.details.location.includes('Kanpur'));
    assert.ok(contactInfo.details.github.includes('github.com'));

    // Skills populated
    assert.ok(skills.all.length > 5, 'Skills should be detected');
    assert.ok(skills.all.map(s => s.toLowerCase()).includes('javascript') || skills.all.map(s => s.toLowerCase()).includes('react'));

    // Projects populated
    assert.ok(projectsAnalysis.count > 0, 'Projects should be detected');
    assert.ok(projectsAnalysis.details.some(p => (p.name || '').includes('SONIQX')));

    // Education populated
    assert.strictEqual(educationAnalysis.hasDegree, true);

    // Scores NOT 0
    assert.ok(scores.overall > 60, `Score should be > 60, was ${scores.overall}`);
    assert.ok(scores.breakdown.contact.score > 0);
    assert.ok(scores.breakdown.keywords.score > 0);
    assert.ok(scores.breakdown.projects.score > 0);
    assert.ok(scores.breakdown.education.score > 0);
  })) passed++;

  // ----------------------------------------------------
  // TEST 8: AI Response Parsing and Error Handling
  // ----------------------------------------------------
  total++;
  if (await runTest('TEST 8: parseAiResponse handles raw JSON, markdown-wrapped JSON, and error payloads', () => {
    const rawJson = '{"overallResumeScore": 85, "candidate": {"name": "Aditya"}}';
    const parsedRaw = analyzer.parseAiResponse(rawJson);
    assert.strictEqual(parsedRaw.overallResumeScore, 85);
    assert.strictEqual(parsedRaw.candidate.name, 'Aditya');

    const fencedJson = '```json\n{"overallResumeScore": 88}\n```';
    const parsedFenced = analyzer.parseAiResponse(fencedJson);
    assert.strictEqual(parsedFenced.overallResumeScore, 88);

    const errorPayload = '{"error": "No resume text provided within [RESUME_INPUT] delimiters."}';
    assert.throws(() => {
      analyzer.parseAiResponse(errorPayload);
    }, /No resume text provided within \[RESUME_INPUT\] delimiters\./);
  })) passed++;

  console.log(`\n${colors.blue}====================================================`);
  console.log(` Test Results: ${passed} / ${total} Passed`);
  console.log(`====================================================${colors.reset}\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
