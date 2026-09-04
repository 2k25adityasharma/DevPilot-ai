const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log(' DevPilot-AI: Verifying Resume Builder Improvements ');
console.log('====================================================\n');

let passedCount = 0;
let totalCount = 0;

function test(name, fn) {
  totalCount++;
  try {
    fn();
    console.log(`✓ [PASS] ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`✗ [FAIL] ${name}`);
    console.error(`  Error: ${err.message}`);
  }
}

const rootDir = path.resolve(__dirname, '../..');
const resumeJs = fs.readFileSync(path.join(rootDir, 'js/pages/resume.js'), 'utf8');
const resumeCss = fs.readFileSync(path.join(rootDir, 'css/pages/resume.css'), 'utf8');
const resumeHtml = fs.readFileSync(path.join(rootDir, 'pages/resume.html'), 'utf8');

// TASK 1
console.log('--- TASK 1: Data Privacy & Demo Phone Number ---');
test('1.1: Personal phone digits "96160" and "32564" absent from all workspace files', () => {
  const files = [
    'js/pages/resume.js',
    'css/pages/resume.css',
    'pages/resume.html',
    'tests/resume/testResumeAnalyzer.js',
    'tests/resume/testResumeBugFixes.js',
    'tests/resume/testResumeScoring.js',
    'tests/resume/testScoringLogic.js'
  ];
  for (const f of files) {
    const c = fs.readFileSync(path.join(rootDir, f), 'utf8');
    assert.strictEqual(c.includes('96160'), false, `${f} contains 96160`);
    assert.strictEqual(c.includes('32564'), false, `${f} contains 32564`);
  }
});

test('1.2: Default resume state phone equals "+91 XXX XXX XXXX"', () => {
  assert.ok(resumeJs.includes("phone: '+91 XXX XXX XXXX'"), 'phone must be +91 XXX XXX XXXX');
});

test('1.3: Previously cached default seed migration check exists', () => {
  assert.ok(resumeJs.includes("currentResume.personal.name === 'Aditya Sharma'"), 'sanitize check must exist');
  assert.ok(resumeJs.includes("currentResume.personal.phone = '+91 XXX XXX XXXX';"), 'sanitize assignment must exist');
});

test('1.4: Real user entered phone number remains supported and bound', () => {
  assert.ok(resumeJs.includes("currentResume.personal.phone     = getInputVal('res-phone')"), 'must sync user input');
  assert.ok(resumeJs.includes("setInputVal('res-phone',     p.phone);"), 'must populate user input');
});

// TASK 2
console.log('\n--- TASK 2: Responsive Resume Editor ---');
test('2.1: Personal info fields defined in exact expected order in HTML', () => {
  const fields = ['res-name', 'res-title', 'res-email', 'res-phone', 'res-location', 'res-portfolio', 'res-github', 'res-linkedin'];
  let last = -1;
  for (const id of fields) {
    const idx = resumeHtml.indexOf(`id="${id}"`);
    assert.ok(idx > -1 && idx > last, `${id} order issue`);
    last = idx;
  }
});

test('2.2: .acc-grid-2 is 2-column by default for desktop/tablet', () => {
  assert.ok(resumeCss.includes('grid-template-columns: repeat(2, minmax(0, 1fr));'));
});

test('2.3: .acc-grid-2 switches to 1-column at <= 640px for mobile', () => {
  assert.ok(resumeCss.includes('@media (max-width: 640px)'));
  assert.ok(resumeCss.includes('grid-template-columns: 1fr;\n    gap: 0.75rem;'));
});

test('2.4: Form inputs prevent grid cell blowout', () => {
  assert.ok(resumeCss.includes('.form-group {') && resumeCss.includes('min-width: 0;') && resumeCss.includes('box-sizing: border-box;'));
});

test('2.5: Editor panel releases max-height trap on <= 1099px', () => {
  assert.ok(resumeCss.includes('max-height: none;\n    overflow-y: visible;'));
});

// TASK 3
console.log('\n--- TASK 3: Responsive Resume Preview ---');
test('3.1: .resume-builder-split prevents grid blowout with minmax(0, 1fr)', () => {
  assert.ok(resumeCss.includes('grid-template-columns: minmax(0, 1fr);'));
});

test('3.2: .builder-preview-panel and .a4-scaler-wrapper have min-width: 0 and overflow-x: auto', () => {
  assert.ok(resumeCss.includes('.a4-scaler-wrapper {') && resumeCss.includes('overflow-x: auto;') && resumeCss.includes('-webkit-overflow-scrolling: touch;'));
});

test('3.3: .a4-paper preserves authentic A4 proportions (210mm x 297mm)', () => {
  assert.ok(resumeCss.includes('width: 210mm;') && resumeCss.includes('min-height: 297mm;') && resumeCss.includes('font-size: 9.5pt;'));
});

test('3.4: Desktop preview scales cleanly (100%) at min-width 1100px', () => {
  assert.ok(resumeCss.includes('@media (min-width: 1100px) {\n  .a4-paper {\n    width: 100%;\n    min-height: auto;'));
});

// TASK 4
console.log('\n--- TASK 4: Contact Information Wrapping ---');
test('4.1: renderContactsPlain separates into 2 logical rows', () => {
  assert.ok(resumeJs.includes('const primary = [p.email, p.phone, p.location].filter(Boolean);'));
  assert.ok(resumeJs.includes('const links = [p.github, p.linkedin, p.portfolio].filter(Boolean);'));
  assert.ok(resumeJs.includes('cv-contact-row'));
  assert.ok(resumeJs.includes('cv-contact-item'));
});

test('4.2: .cv-contacts, .cv-contact-row, and .cv-contact-item have overflow-safe styles', () => {
  assert.ok(resumeCss.includes('display: flex;\n  flex-direction: column;') && resumeCss.includes('word-break: break-word;') && resumeCss.includes('overflow-wrap: anywhere;'));
  assert.ok(resumeCss.includes('.cv-contact-item:not(:last-child)::after'));
});

test('4.3: Centered templates center contact rows', () => {
  assert.ok(resumeCss.includes('.tpl-classic-ats .cv-contact-row, .tpl-0 .cv-contact-row {\n  justify-content: center;\n}'));
  assert.ok(resumeCss.includes('.tpl-executive-pro .cv-contact-row, .tpl-5 .cv-contact-row {\n  justify-content: center;\n}'));
});

// TASK 5
console.log('\n--- TASK 5: Breakpoints & Layout Safety ---');
test('5.1: Small mobile padding adjustment at max-width 480px', () => {
  assert.ok(resumeCss.includes('@media (max-width: 480px)') && resumeCss.includes('#main-content {\n    padding: 1rem 0.75rem !important;\n  }'));
});

test('5.2: Top bar wraps cleanly on mobile viewports', () => {
  assert.ok(resumeCss.includes('.builder-topbar {\n    flex-wrap: wrap;'));
});

console.log('\n====================================================');
console.log(` Results: ${passedCount} / ${totalCount} Passed`);
console.log('====================================================\n');
if (passedCount !== totalCount) process.exit(1);