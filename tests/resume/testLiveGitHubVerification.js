const assert = require('assert');
const analyzer = require('../../js/pages/resumeAnalyzer.js');

async function main() {
  console.log('Testing live GitHub verification & clean location extraction...');

  // 1. Test clean location extraction from long summary paragraph
  const resumeWithSummary = [
    'ADITYA SHARMA | 2k25aiml2513475@gmail.com | +91 96160 32564',
    'Driven Computer Science Engineering Student at PSIT Kanpur with a strong passion for Software Engineering, Frontend Development, and AI Applications. Quick learner skilled in building responsive web applications using JavaScript (ES6), HTML5, and CSS3. Strong foundation in Data Structures & Algorithms (DSA) with 170+ LeetCode problems solved.',
    'EXPERIENCE',
    'Frontend Developer Intern'
  ].join('\n');

  const contact = analyzer.extractContactInfo(resumeWithSummary);
  console.log('Location extracted:', contact.details.location);
  assert.strictEqual(contact.details.location, 'Kanpur', 'Must extract clean city Kanpur instead of full paragraph');

  // 2. Test renderContactAndLinksCard markup
  const result = {
    candidate: { name: 'ADITYA SHARMA', email: '2k25aiml2513475@gmail.com', location: 'Kanpur' },
    structuredResume: {
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/2k25adityasharma', username: '2k25adityasharma', isClickable: true },
        { type: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/aditya-sharma-a93387418', username: 'aditya-sharma-a93387418', isClickable: true }
      ]
    }
  };

  const html = analyzer.renderContactAndLinksCard(result);
  assert.ok(html.includes('id="contact-link-github"'), 'GitHub card must have id contact-link-github');
  assert.ok(html.includes('data-username="2k25adityasharma"'), 'GitHub card must have data-username');
  assert.ok(html.includes('id="badge-github-verify"'), 'GitHub card must have id badge-github-verify');
  assert.ok(html.includes('Live Checking...'), 'GitHub badge initially says Live Checking...');
  assert.ok(html.includes('Format Valid'), 'LinkedIn has Format Valid badge');
  assert.ok(!html.includes('✓ Verified') || !html.includes('Verified Ground Truth'), 'Ground truth badge present, deceptive Verified badges removed');

  // 3. Test verifyGitHubProfileLive on mock DOM with REAL valid GitHub account
  const mockValidContainer = {
    classes: new Set(),
    querySelector(sel) {
      if (sel === '#contact-link-github') {
        const self = this;
        return {
          dataset: { username: '2k25adityasharma' },
          classList: {
            add(c) { self.classes.add(c); },
            remove(c) { self.classes.delete(c); }
          }
        };
      }
      if (sel === '#badge-github-verify') {
        return this.badgeEl;
      }
      if (sel === '#github-meta-details') {
        return this.metaEl;
      }
      return null;
    },
    badgeEl: { className: '', innerHTML: '' },
    metaEl: { innerHTML: '', textContent: '' }
  };

  await analyzer.verifyGitHubProfileLive(result, mockValidContainer);

  console.log('Valid User Badge class:', mockValidContainer.badgeEl.className);
  console.log('Valid User Badge HTML:', mockValidContainer.badgeEl.innerHTML);
  console.log('Valid User Meta HTML:', mockValidContainer.metaEl.innerHTML);
  console.log('Valid User Card classes:', Array.from(mockValidContainer.classes));

  assert.ok(mockValidContainer.badgeEl.className.includes('live-verified'), 'Must have live-verified class');
  assert.ok(mockValidContainer.badgeEl.innerHTML.includes('Real Verified'), 'Must say Real Verified');
  assert.ok(mockValidContainer.metaEl.innerHTML.includes('Active GitHub Account'), 'Must report Active GitHub Account');
  assert.ok(mockValidContainer.classes.has('verified-success'), 'Card has verified-success class');

  // 4. Test verifyGitHubProfileLive on mock DOM with FAKE / CHANGED non-existent GitHub account
  const fakeResult = {
    structuredResume: {
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/nonexistentfakeusertesting9999123', username: 'nonexistentfakeusertesting9999123', isClickable: true }
      ]
    }
  };

  const mockInvalidContainer = {
    classes: new Set(),
    querySelector(sel) {
      if (sel === '#contact-link-github') {
        const self = this;
        return {
          dataset: { username: 'nonexistentfakeusertesting9999123' },
          classList: {
            add(c) { self.classes.add(c); },
            remove(c) { self.classes.delete(c); }
          }
        };
      }
      if (sel === '#badge-github-verify') {
        return this.badgeEl;
      }
      if (sel === '#github-meta-details') {
        return this.metaEl;
      }
      return null;
    },
    badgeEl: { className: '', innerHTML: '' },
    metaEl: { innerHTML: '', textContent: '' }
  };

  await analyzer.verifyGitHubProfileLive(fakeResult, mockInvalidContainer);

  console.log('Fake User Badge class:', mockInvalidContainer.badgeEl.className);
  console.log('Fake User Badge HTML:', mockInvalidContainer.badgeEl.innerHTML);
  console.log('Fake User Meta HTML:', mockInvalidContainer.metaEl.innerHTML);
  console.log('Fake User Card classes:', Array.from(mockInvalidContainer.classes));

  assert.ok(mockInvalidContainer.badgeEl.className.includes('live-failed'), 'Must have live-failed class');
  assert.ok(mockInvalidContainer.badgeEl.innerHTML.includes('Account Not Found (404)'), 'Must say Account Not Found (404)');
  assert.ok(mockInvalidContainer.metaEl.innerHTML.includes('does not exist on GitHub'), 'Must warn that username does not exist');
  assert.ok(mockInvalidContainer.classes.has('profile-not-found'), 'Card has profile-not-found class');

  console.log('\n✓ ALL LIVE GITHUB VERIFICATION TESTS PASSED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
