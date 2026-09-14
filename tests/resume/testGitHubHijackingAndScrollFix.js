const assert = require('assert');
const analyzer = require('../../js/pages/resumeAnalyzer.js');

async function main() {
  console.log('Testing GitHub Hijacking Fix & Clean Profile Resolution...\n');

  // 1. Verify invalid handle (like github.c) is NOT hijacked to 2k25adityasharma
  const sampleResultWithProjects = {
    projectsAnalysis: {
      details: [
        { githubUrl: 'https://github.com/2k25adityasharma/soniqx-audiometer' },
        { githubUrl: 'https://github.com/2k25adityasharma/northpeak-digital' }
      ]
    },
    structuredResume: {
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/github.c', username: 'github.c', isClickable: true }
      ]
    }
  };

  const mockContainer = {
    classes: new Set(),
    querySelector(sel) {
      if (sel === '#contact-link-github') {
        const self = this;
        return {
          dataset: { username: 'github.c' },
          classList: {
            add(c) { self.classes.add(c); },
            remove(c) { self.classes.delete(c); }
          }
        };
      }
      if (sel === '#badge-github-verify') return this.badgeEl;
      if (sel === '#github-meta-details') return this.metaEl;
      return null;
    },
    badgeEl: { className: '', innerHTML: '' },
    metaEl: { innerHTML: '', textContent: '' }
  };

  await analyzer.verifyGitHubProfileLive(sampleResultWithProjects, mockContainer);

  console.log('Badge HTML:', mockContainer.badgeEl.innerHTML);
  console.log('Meta HTML:', mockContainer.metaEl.innerHTML);

  // Must NOT contain 2k25adityasharma or Real Verified!
  assert.ok(!mockContainer.badgeEl.innerHTML.includes('Real Verified'), 'Must NOT mark invalid username as Real Verified');
  assert.ok(!mockContainer.metaEl.innerHTML.includes('2k25adityasharma'), 'Must NOT substitute 2k25adityasharma');
  assert.ok(mockContainer.badgeEl.innerHTML.includes('Account Not Found (404)'), 'Must report 404 Account Not Found');
  assert.ok(mockContainer.metaEl.innerHTML.includes('github.c'), 'Must report error specifically for github.c');
  console.log('✓ Test 1 Passed: Invalid GitHub handle is NOT hijacked by project repos\n');

  // 2. Verify resume without header GitHub does NOT treat project repo as personal profile
  const resumeTextWithoutGithub = [
    'Jane Doe',
    'Senior Frontend Engineer',
    'jane.doe@example.dev | +1 555-0199 | San Francisco, CA | linkedin.com/in/janedoe',
    '',
    'EXPERIENCE',
    'Software Engineer at TechCorp (2022 - Present)',
    '• Built scalable web applications',
    '',
    'PROJECTS',
    'Open Source Framework',
    '• Core contributor to react library: github.com/facebook/react',
    'Enterprise Cloud Platform',
    '• Deployed services on kubernetes: github.com/kubernetes/kubernetes'
  ].join('\n');

  const extractedLinks = analyzer.extractDeterministicLinks(resumeTextWithoutGithub);
  console.log('Extracted GitHub link for Jane Doe:', extractedLinks.github);
  assert.strictEqual(extractedLinks.github, null, 'Must NOT extract facebook or kubernetes as Jane Doe personal profile');
  console.log('✓ Test 2 Passed: Project repos are not falsely extracted as candidate personal profiles\n');

  // 3. Verify resume WITH personal GitHub in header is correctly extracted
  const resumeWithPersonalGithub = [
    'John Smith',
    'Full Stack Engineer',
    'john.smith@example.dev | github.com/johnsmithdev | linkedin.com/in/johnsmith',
    '',
    'PROJECTS',
    'Cloud Suite | github.com/johnsmithdev/cloud-suite'
  ].join('\n');

  const linksWithPersonal = analyzer.extractDeterministicLinks(resumeWithPersonalGithub);
  console.log('Extracted personal GitHub:', linksWithPersonal.github?.username);
  assert.strictEqual(linksWithPersonal.github?.username, 'johnsmithdev', 'Must extract personal GitHub profile from header');
  console.log('✓ Test 3 Passed: Personal GitHub profile in header is extracted accurately\n');

  console.log('====================================================');
  console.log(' ALL GITHUB HIJACKING & LINK EXTRACTION TESTS PASSED!');
  console.log('====================================================');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
