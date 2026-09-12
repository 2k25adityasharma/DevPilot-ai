/**
 * Automated Test Suite for DevPilot-AI LinkedIn Profile Analyzer
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const rootDir = path.resolve(__dirname, '../../');
const LinkedInAnalyzer = require(path.join(rootDir, 'js/pages/linkedin.js'));

let totalTests = 0;
let passedTests = 0;

function runTest(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✓ [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ [FAIL] ${description}`);
    console.error(`  Error: ${err.message}`);
  }
}

console.log('===========================================================');
console.log(' DevPilot-AI: Running LinkedIn Profile Analyzer Test Suite');
console.log('===========================================================\n');

// 1. Files & Structural Integrity
runTest('All LinkedIn module files exist in workspace', () => {
  assert.ok(fs.existsSync(path.join(rootDir, 'js/pages/linkedin.js')), 'linkedin.js must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'css/pages/linkedin.css')), 'linkedin.css must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'pages/linkedin.html')), 'linkedin.html must exist');
});

runTest('pages/linkedin.html contains required 8-section IDs and UI elements', () => {
  const html = fs.readFileSync(path.join(rootDir, 'pages/linkedin.html'), 'utf8');

  const requiredIds = [
    'li-target-role',
    'li-paste-input',
    'li-pdf-dropzone',
    'btn-analyze-profile',
    'btn-quick-demo',
    'analysis-results',
    'hero-score-val',
    'score-ring-circle',
    'hero-strength-badge',
    'mini-sections-grid',
    'sec-headline',
    'sec-about',
    'sec-analytics',
    'sec-activity',
    'sec-experience',
    'sec-education',
    'sec-certifications',
    'sec-skills',
    'sec-synergies',
    'sec-action-plan',
    'headline-alternatives-grid',
    'about-rewrites-container',
    'skills-taxonomy-grid',
    'plan-fix-items',
    'plan-next-items',
    'plan-optional-items'
  ];

  requiredIds.forEach(id => {
    assert.ok(html.includes(`id="${id}"`), `Missing required element id in HTML: ${id}`);
  });
});

runTest('Sidebar navigation link for LinkedIn Profile is present across all pages', () => {
  const pages = [
    'index.html',
    'pages/github.html',
    'pages/resume.html',
    'pages/dsa.html',
    'pages/chat.html',
    'pages/notes.html',
    'pages/snippets.html',
    'pages/prompts.html',
    'pages/habits.html',
    'pages/timer.html',
    'pages/settings.html',
    'pages/linkedin.html'
  ];

  pages.forEach(p => {
    const filePath = path.join(rootDir, p);
    assert.ok(fs.existsSync(filePath), `${p} should exist`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      content.includes('linkedin.html'),
      `Page ${p} must contain sidebar link to linkedin.html`
    );
  });
});

// 2. Profile Parsing Tests
runTest('LinkedInParser extracts demo profile correctly', () => {
  const demo = LinkedInAnalyzer.DEMO_LINKEDIN_PROFILE;
  assert.ok(demo.name, 'Demo should have name');
  assert.ok(demo.headline, 'Demo should have headline');
  assert.ok(demo.skills.length >= 8, 'Demo should have at least 8 skills');

  const sampleText = `
Aditya Sharma
Senior Full Stack Engineer | React, Node.js, Cloud Architectures
Bengaluru, India

About
Passionate engineer with 4+ years building high-throughput systems.

Experience
Senior Software Engineer - DevCorp (2022 - Present)
- Designed microservices architecture reducing API latency by 35%.
- Led team of 5 engineers delivering core checkout flow.

Education
B.Tech in Computer Science - State University (2018 - 2022)

Licenses & Certifications
AWS Certified Solutions Architect - Amazon Web Services (Credential ID: AWS-882190)

Skills
JavaScript, TypeScript, React, Node.js, Docker, Kubernetes, AWS, PostgreSQL, MongoDB, Redis
`;

  const parsed = LinkedInAnalyzer.LinkedInParser.parseText(sampleText);
  assert.strictEqual(parsed.name, 'Aditya Sharma', 'Parsed name mismatch');
  assert.ok(parsed.headline.includes('Senior Full Stack Engineer'), 'Parsed headline mismatch');
  assert.strictEqual(parsed.location, 'Bengaluru, India', 'Parsed location mismatch');
  assert.ok(parsed.about.length > 20, 'Parsed about should not be empty');
  assert.strictEqual(parsed.experience.length, 1, 'Parsed experience count should be 1');
  assert.strictEqual(parsed.experience[0].title, 'Senior Software Engineer');
  assert.strictEqual(parsed.experience[0].company, 'DevCorp');
  assert.strictEqual(parsed.experience[0].bullets.length, 2);
  assert.strictEqual(parsed.education.length, 1);
  assert.strictEqual(parsed.certifications.length, 1);
  assert.strictEqual(parsed.certifications[0].credentialId, 'AWS-882190');
  assert.ok(parsed.skills.length >= 8, 'Skills should be parsed');
});

runTest('LinkedInParser handles empty or partial input gracefully', () => {
  const emptyParsed = LinkedInAnalyzer.LinkedInParser.parseText('');
  assert.strictEqual(emptyParsed.name, 'Developer Profile');
  assert.strictEqual(emptyParsed.experience.length, 0);
  assert.strictEqual(emptyParsed.skills.length, 0);

  const partialParsed = LinkedInAnalyzer.LinkedInParser.parseText('Just a headline without sections');
  assert.ok(partialParsed.headline);
  assert.strictEqual(partialParsed.about, '');
});

// 3. Section Analyzers Tests
runTest('HeadlineAnalyzer generates scores, strengths, weaknesses, and 3 distinct alternatives', () => {
  const targetRole = LinkedInAnalyzer.TARGET_ROLES.fullstack;
  const analysis = LinkedInAnalyzer.HeadlineAnalyzer.analyze(
    'Software Engineer at TechCorp | Python, React, Cloud',
    targetRole
  );

  assert.ok(analysis.score >= 50 && analysis.score <= 100, `Headline score within expected range: ${analysis.score}`);
  assert.ok(Array.isArray(analysis.strengths) && analysis.strengths.length > 0, 'Should have strengths');
  assert.ok(Array.isArray(analysis.weaknesses), 'Should have weaknesses array');
  assert.ok(analysis.alternatives, 'Should have alternatives object');
  assert.ok(analysis.alternatives.technical, 'Must have technical alternative');
  assert.ok(analysis.alternatives.recruiter, 'Must have recruiter alternative');
  assert.ok(analysis.alternatives.impact, 'Must have impact alternative');
  assert.notStrictEqual(analysis.alternatives.technical, analysis.alternatives.recruiter, 'Alternatives must be distinct');
});

runTest('AboutAnalyzer generates score out of 10, 4 diagnostic buckets, and 3 rewrites', () => {
  const targetRole = LinkedInAnalyzer.TARGET_ROLES.fullstack;
  const aboutText = `
I am a passionate software engineer with 5 years of experience building web applications.
I specialize in JavaScript, React, Node.js, and cloud systems.
Previously reduced application load times by 40% and improved database queries.
Currently open to new full stack opportunities. Contact me at aditya@example.com.
`;
  const res = LinkedInAnalyzer.AboutAnalyzer.analyze(aboutText, targetRole, ['React', 'Node.js', 'PostgreSQL']);

  assert.ok(res.scoreOutOf10 >= 5 && res.scoreOutOf10 <= 10, `About score out of 10: ${res.scoreOutOf10}`);
  assert.ok(res.diagnostics.good.length > 0, "WHAT'S GOOD must not be empty");
  assert.ok(Array.isArray(res.diagnostics.weak), "WHAT'S WEAK must be array");
  assert.ok(Array.isArray(res.diagnostics.missing), "WHAT'S MISSING must be array");
  assert.ok(Array.isArray(res.diagnostics.change), "WHAT TO CHANGE must be array");
  assert.ok(res.rewrites.concise.length > 50, 'Concise rewrite must have content');
  assert.ok(res.rewrites.story.length > 100, 'Story rewrite must have content');
  assert.ok(res.rewrites.technical.length > 100, 'Technical rewrite must have content');
});

runTest('AnalyticsAnalyzer NEVER fabricates numbers when data is absent', () => {
  const resEmpty = LinkedInAnalyzer.AnalyticsAnalyzer.analyze('');
  assert.strictEqual(resEmpty.hasData, false, 'hasData must be false');
  assert.strictEqual(resEmpty.profileViews, null, 'profileViews must be null when absent');
  assert.strictEqual(resEmpty.searchAppearances, null, 'searchAppearances must be null when absent');
  assert.strictEqual(resEmpty.postImpressions, null, 'postImpressions must be null when absent');
  assert.ok(resEmpty.disclaimer.includes('not provided'), 'Disclaimer must mention not provided');

  // When numbers are provided in text
  const resWithData = LinkedInAnalyzer.AnalyticsAnalyzer.analyze('Analytics: 450 profile views in the last 90 days, 120 search appearances');
  assert.strictEqual(resWithData.hasData, true, 'hasData should be true');
  assert.strictEqual(resWithData.profileViews, 450, 'profileViews parsed');
  assert.strictEqual(resWithData.searchAppearances, 120, 'searchAppearances parsed');
});

runTest('ActivityAnalyzer classifies activity and generates 3 recommended post prompts', () => {
  const targetRole = LinkedInAnalyzer.TARGET_ROLES.fullstack;
  const resNoData = LinkedInAnalyzer.ActivityAnalyzer.analyze('', targetRole);
  assert.strictEqual(resNoData.classification, 'NO DATA');
  assert.strictEqual(resNoData.recommendedPrompts.length, 3, 'Must provide 3 post prompts');

  const resActive = LinkedInAnalyzer.ActivityAnalyzer.analyze('Posted 4 times this week about system design and microservices', targetRole);
  assert.strictEqual(resActive.classification, 'ACTIVE');
});

runTest('ExperienceAnalyzer audits roles and provides enhanced metrics bullets', () => {
  const targetRole = LinkedInAnalyzer.TARGET_ROLES.fullstack;
  const roles = [
    {
      title: 'Full Stack Developer',
      company: 'Acme Corp',
      duration: '2021 - Present',
      bullets: [
        'Built web application for users',
        'Helped team with database optimizations and reduced query times by 30%'
      ]
    }
  ];

  const analysis = LinkedInAnalyzer.ExperienceAnalyzer.analyze(roles, targetRole);
  assert.ok(analysis.score > 0, 'Score should be greater than 0');
  assert.strictEqual(analysis.roles.length, 1);
  assert.strictEqual(analysis.roles[0].enhancedBullets.length, 2);
  assert.ok(analysis.roles[0].enhancedBullets[0].improved, 'Must have improved bullet');
});

runTest('SkillsAnalyzer classifies into 8 taxonomy buckets and assigns evidence tiers', () => {
  const parsedSkills = ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'PyTorch', 'Git', 'Leadership'];
  const resumeSkills = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'];
  const githubLangs = ['JavaScript', 'TypeScript', 'HTML'];

  const analysis = LinkedInAnalyzer.SkillsAnalyzer.analyze(parsedSkills, resumeSkills, githubLangs);
  const buckets = analysis.taxonomyBuckets;

  assert.ok(buckets.languages, 'Languages bucket exists');
  assert.ok(buckets.frameworks, 'Frameworks bucket exists');
  assert.ok(buckets.databases, 'Databases bucket exists');
  assert.ok(buckets.cloud, 'Cloud & DevOps bucket exists');
  assert.ok(buckets.aiml, 'AI/ML bucket exists');
  assert.ok(buckets.tools, 'Tools bucket exists');
  assert.ok(buckets.soft, 'Soft skills bucket exists');

  // React is in LinkedIn, Resume, so evidence should be at least moderate or strong
  const reactSkill = analysis.skillsWithEvidence.find(s => s.name.toLowerCase() === 'react');
  assert.ok(reactSkill, 'React should be evaluated');
  assert.ok(['strong', 'moderate'].includes(reactSkill.evidenceTier), `React evidence tier: ${reactSkill.evidenceTier}`);

  // TypeScript is in Resume + GitHub but was missing from LinkedIn!
  const tsSkill = analysis.skillsWithEvidence.find(s => s.name.toLowerCase() === 'typescript');
  assert.ok(tsSkill, 'TypeScript should be caught as missing from LinkedIn');
  assert.strictEqual(tsSkill.evidenceTier, 'missing', 'TypeScript tier should be missing');
});

// 4. Cross-Platform Comparison Tests
runTest('ResumeComparison identifies title discrepancies and missing certifications', () => {
  // Mock Storage in node
  global.Storage = {
    get: (key, def) => {
      if (key === 'resume_data') {
        return {
          personal: { fullName: 'Aditya Sharma', jobTitle: 'Full Stack Engineer' },
          experience: [{ title: 'Staff Software Engineer', company: 'DevCorp' }],
          certifications: [{ name: 'Certified Kubernetes Administrator (CKA)' }],
          skills: ['React', 'Node.js', 'Go', 'Docker']
        };
      }
      return def;
    }
  };

  const parsedProfile = {
    headline: 'Frontend Engineer',
    experience: [{ title: 'Junior Frontend Developer', company: 'DevCorp' }],
    certifications: [{ name: 'AWS Cloud Practitioner' }],
    skills: ['React', 'CSS']
  };

  const comp = LinkedInAnalyzer.ResumeComparison.compare(parsedProfile);
  assert.strictEqual(comp.hasResumeData, true);
  assert.ok(comp.experienceMismatches.length > 0, 'Should flag experience title mismatch');
  assert.ok(comp.missingCertificationsOnLinkedIn.includes('Certified Kubernetes Administrator (CKA)'), 'Should catch missing CKA cert');
});

runTest('GitHubComparison recommends top starred/relevant repos for LinkedIn Featured', () => {
  global.Storage = {
    get: (key, def) => {
      if (key === 'github_analysis_data') {
        return {
          profile: { login: 'octocat', public_repos: 12 },
          repositories: [
            { name: 'cloud-orchestrator', stargazers_count: 85, language: 'Go', description: 'Distributed container system' },
            { name: 'devpilot-ai', stargazers_count: 140, language: 'JavaScript', description: 'AI developer copilot' },
            { name: 'dotfiles', stargazers_count: 2, language: 'Shell', description: 'Personal bash scripts' }
          ]
        };
      }
      return def;
    }
  };

  const recs = LinkedInAnalyzer.GitHubComparison.recommendFeaturedRepos(LinkedInAnalyzer.TARGET_ROLES.fullstack);
  assert.ok(recs.length >= 2, 'Should recommend at least 2 top repos');
  assert.strictEqual(recs[0].name, 'devpilot-ai', 'Highest star repo should be first');
});

// 5. Master analyzeProfile End-to-End Test
runTest('analyzeProfile generates complete 100-point audit and tiered action plan', () => {
  const rawProfile = `
Aditya Sharma
Full Stack Developer | React, Node.js, AWS, System Architecture
Bengaluru, Karnataka, India

About
Results-driven engineer with expertise in distributed microservices and modern frontend architectures.

Experience
Senior Full Stack Engineer - DevCorp (Jan 2022 - Present)
- Architected enterprise cloud services handling 20,000 requests per second.
- Reduced database response latency by 45% through Redis caching strategies.

Education
Bachelor of Technology in Computer Science - State University (2018 - 2022)

Licenses & Certifications
AWS Certified Solutions Architect Associate (Credential ID: AWS-992102)

Skills
JavaScript, TypeScript, React, Node.js, Express, Docker, Kubernetes, AWS, PostgreSQL, Redis, GraphQL
`;

  const result = LinkedInAnalyzer.analyzeProfile(rawProfile, { targetRole: 'fullstack' });

  assert.ok(typeof result.overallScore === 'number', 'Overall score must be number');
  assert.ok(result.overallScore >= 0 && result.overallScore <= 100, `Score out of 100: ${result.overallScore}`);
  assert.ok(result.profileStrength, 'Profile strength must be present');
  assert.ok(result.sectionScores.headline >= 0);
  assert.ok(result.sectionScores.about >= 0);
  assert.ok(result.sectionScores.experience >= 0);
  assert.ok(result.sectionScores.skills >= 0);

  // Action plan tiers
  assert.ok(Array.isArray(result.actionPlan.fixFirst), 'fixFirst must be array');
  assert.ok(Array.isArray(result.actionPlan.next), 'next must be array');
  assert.ok(Array.isArray(result.actionPlan.optional), 'optional must be array');
  assert.ok(
    result.actionPlan.fixFirst.length + result.actionPlan.next.length + result.actionPlan.optional.length > 0,
    'Action plan must have items'
  );
});

console.log('\n===========================================================');
console.log(` Summary: ${passedTests} / ${totalTests} tests passed.`);
console.log('===========================================================');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
