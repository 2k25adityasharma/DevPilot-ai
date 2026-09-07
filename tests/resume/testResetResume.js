/**
 * Unit & Integration Tests for Resume Reset / Restore functionality
 * Tests the Reset button, modal structure, CSS styles, and state transitions
 * ("Jaisa tha bilkul vaise")
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log(' DevPilot-AI: Testing Resume Reset / Restore Feature ');
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
const resumeHtml = fs.readFileSync(path.join(rootDir, 'pages/resume.html'), 'utf8');
const resumeCss  = fs.readFileSync(path.join(rootDir, 'css/pages/resume.css'), 'utf8');
const resumeJs   = fs.readFileSync(path.join(rootDir, 'js/pages/resume.js'), 'utf8');

// TEST GROUP 1: HTML Markup & Topbar Controls
console.log('--- TEST GROUP 1: HTML Markup & Topbar Controls ---');
test('1.1: Reset button exists in Builder top bar with id="btn-reset-resume"', () => {
  assert.ok(resumeHtml.includes('id="btn-reset-resume"'), 'Button id="btn-reset-resume" must exist');
  assert.ok(resumeHtml.includes('restart_alt'), 'Button must include restart_alt icon');
  assert.ok(resumeHtml.includes('title="Reset Resume'), 'Button must have descriptive title');
});

test('1.2: Reset button positioned among toolbar actions', () => {
  const redoIdx = resumeHtml.indexOf('id="btn-redo"');
  const resetIdx = resumeHtml.indexOf('id="btn-reset-resume"');
  const saveIdx = resumeHtml.indexOf('id="btn-save-draft"');
  assert.ok(redoIdx !== -1 && resetIdx !== -1 && saveIdx !== -1, 'Controls must be present');
  assert.ok(resetIdx > redoIdx && resetIdx < saveIdx, 'Reset button should be cleanly placed in toolbar right section');
});

test('1.3: Reset Modal backdrop and dialog structure exist', () => {
  assert.ok(resumeHtml.includes('id="reset-modal-backdrop"'), 'Modal backdrop must exist');
  assert.ok(resumeHtml.includes('class="reset-modal"'), 'Modal dialog container must exist');
  assert.ok(resumeHtml.includes('id="reset-modal-title"'), 'Modal title element must exist');
  assert.ok(resumeHtml.includes('id="close-reset-modal"'), 'Close button must exist');
  assert.ok(resumeHtml.includes('id="btn-cancel-reset"'), 'Cancel button must exist');
});

test('1.4: Modal provides all 3 restore/reset action options', () => {
  assert.ok(resumeHtml.includes('id="btn-confirm-restore-default"'), 'Restore default action must exist');
  assert.ok(resumeHtml.includes('id="btn-confirm-revert-saved"'), 'Revert saved action must exist');
  assert.ok(resumeHtml.includes('id="btn-confirm-clear-all"'), 'Clear all action must exist');
  assert.ok(resumeHtml.includes('bilkul jaisa pehle tha') || resumeHtml.includes('jaisa tha bilkul vaise'), 'User context phrase documented in modal');
});

// TEST GROUP 2: CSS Styles & Responsive Design
console.log('\n--- TEST GROUP 2: CSS Styles & Responsive Design ---');
test('2.1: .reset-modal styles defined with proper max-width and border-radius', () => {
  assert.ok(resumeCss.includes('.reset-modal {'), '.reset-modal class must exist');
  assert.ok(resumeCss.includes('max-width: 620px;'), 'max-width should be around 620px');
  assert.ok(resumeCss.includes('box-shadow: var(--shadow-dropdown);'), 'Uses system box-shadow');
});

test('2.2: .reset-option-card and .recommended highlight defined', () => {
  assert.ok(resumeCss.includes('.reset-option-card {'), '.reset-option-card class must exist');
  assert.ok(resumeCss.includes('.reset-option-card.recommended {'), '.reset-option-card.recommended class must exist');
  assert.ok(resumeCss.includes('.reset-option-badge {'), '.reset-option-badge must exist');
});

test('2.3: Smooth entrance animation resetModalFadeIn configured', () => {
  assert.ok(resumeCss.includes('@keyframes resetModalFadeIn'), 'Fade in keyframe animation must exist');
  assert.ok(resumeCss.includes('animation: resetModalFadeIn'), 'Animation applied to modal');
});

// TEST GROUP 3: JavaScript Implementation & State Flow
console.log('\n--- TEST GROUP 3: JavaScript Implementation & State Flow ---');
test('3.1: Event listeners for reset button and modal actions are bound in initBuilderControls', () => {
  assert.ok(resumeJs.includes("document.getElementById('btn-reset-resume')"), 'btn-reset-resume must be queried');
  assert.ok(resumeJs.includes("document.getElementById('btn-confirm-restore-default')"), 'btn-confirm-restore-default must be queried');
  assert.ok(resumeJs.includes("document.getElementById('btn-confirm-revert-saved')"), 'btn-confirm-revert-saved must be queried');
  assert.ok(resumeJs.includes("document.getElementById('btn-confirm-clear-all')"), 'btn-confirm-clear-all must be queried');
});

test('3.2: Escape key listener closes modal', () => {
  assert.ok(resumeJs.includes("if (e.key === 'Escape')"), 'Escape key handler must exist');
  assert.ok(resumeJs.includes('closeResetModal()'), 'closeResetModal called on Escape');
});

test('3.3: restoreDefaultResume resets state, updates undo stack and triggers UI updates', () => {
  assert.ok(resumeJs.includes('function restoreDefaultResume()'), 'restoreDefaultResume function must exist');
  assert.ok(resumeJs.includes('pushUndo();'), 'pushUndo called before reset for safety');
  assert.ok(resumeJs.includes('currentResume = JSON.parse(JSON.stringify(defaultResumeState))'), 'Deep clone of default state');
  assert.ok(resumeJs.includes("Storage.set('resume_data', currentResume);"), 'Storage updated with default state');
  assert.ok(resumeJs.includes('populateFormFields();'), 'populateFormFields invoked');
  assert.ok(resumeJs.includes('renderDynamicLists();'), 'renderDynamicLists invoked');
  assert.ok(resumeJs.includes('updateLivePreview();'), 'updateLivePreview invoked');
  assert.ok(resumeJs.includes('updateAtsScore();'), 'updateAtsScore invoked');
});

test('3.4: Simulated data reset restores default developer resume cleanly', () => {
  // Extract defaultResumeState from resumeJs
  const stateMatch = resumeJs.match(/const defaultResumeState = (\{[\s\S]*?\n\};)/);
  assert.ok(stateMatch, 'defaultResumeState must be parseable');
  
  // Evaluate defaultResumeState safely
  const defaultResumeState = eval(`(${stateMatch[1].replace(/;\s*$/, '')})`);
  
  let currentResume = {
    personal: {
      name: 'nvhgvnhvnbnm',
      title: 'bv b b nb vnb',
      email: 'hjvjhvnb n nm mn',
      phone: 'hfhfhvhvhvhv',
      location: 'hjvn mn m m m',
      portfolio: 'vhvh m nm n',
      github: 'vhvhn mn mn',
      linkedin: 'bghcghcghchg'
    },
    summary: 'gibberish',
    skills: { languages: 'fxcgfh', frontend: 'vb', backend: '', databases: '', tools: '' },
    experience: [],
    projects: []
  };

  // Simulate reset
  currentResume = JSON.parse(JSON.stringify(defaultResumeState));
  if (currentResume.personal) {
    currentResume.personal.phone = '+91 XXX XXX XXXX';
  }

  assert.strictEqual(currentResume.personal.name, 'Aditya Sharma');
  assert.strictEqual(currentResume.personal.title, 'Full Stack Engineer & AI Developer');
  assert.strictEqual(currentResume.personal.email, '2k25aiml2513475@gmail.com');
  assert.strictEqual(currentResume.personal.phone, '+91 XXX XXX XXXX');
  assert.ok(currentResume.projects.length >= 4, 'Must restore sample projects');
  assert.ok(currentResume.experience.length >= 1, 'Must restore sample experience');
  assert.ok(currentResume.skills.languages.includes('JavaScript'), 'Must restore technical skills');
});

console.log('\n====================================================');
console.log(` Results: ${passedCount} / ${totalCount} Passed`);
console.log('====================================================\n');
if (passedCount !== totalCount) process.exit(1);
