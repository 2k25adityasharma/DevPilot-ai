const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock localStorage and window for Node environment
const store = {};
global.localStorage = {
  getItem: (key) => (key in store ? store[key] : null),
  setItem: (key, val) => { store[key] = String(val); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};

const DashboardDataService = require('../../js/core/dashboardDataService.js');

function runTest(name, fn) {
  try {
    fn();
    console.log(`✓ [PASS] ${name}`);
  } catch (err) {
    console.error(`✗ [FAIL] ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('====================================================');
console.log(' Testing AI Suggestion (No Auto-Send) & GitHub Card');
console.log('====================================================\n');

// TEST 1: AI Suggestion targetUrl does not contain autoSend=true
runTest('TEST 1: AI Suggestion targetUrl excludes autoSend=true', () => {
  const suggestion = DashboardDataService.getAISuggestion();
  assert.ok(suggestion, 'Suggestion should exist');
  assert.ok(suggestion.targetUrl, 'TargetUrl must exist');
  assert.ok(suggestion.targetUrl.startsWith('pages/chat.html?prompt='), 'TargetUrl must point to chat.html with prompt');
  assert.strictEqual(suggestion.targetUrl.includes('autoSend=true'), false, 'TargetUrl must NOT contain autoSend=true');
  assert.ok(suggestion.chatPrompt, 'chatPrompt must be populated');
  assert.ok(suggestion.chatPrompt.length > 10, 'chatPrompt should contain descriptive question');
});

// TEST 2: Index.html contains verified badge and account link in GitHub Activity Card
runTest('TEST 2: index.html contains GitHub account link and verified badge', () => {
  const indexPath = path.join(__dirname, '../../index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  assert.ok(indexHtml.includes('id="github-user-profile-link"'), 'Must have #github-user-profile-link');
  assert.ok(indexHtml.includes('id="github-username-display"'), 'Must have #github-username-display');
  assert.ok(indexHtml.includes('target="_blank"'), 'GitHub link must open in new tab');
  assert.ok(indexHtml.includes('rel="noopener noreferrer"'), 'GitHub link must have secure rel');
  assert.ok(indexHtml.includes('https://github.com/2k25adityasharma'), 'Default GitHub link should point to user profile');
  assert.ok(indexHtml.includes('verified'), 'Must include verified badge icon');
  assert.ok(indexHtml.includes('Verified'), 'Must include Verified text label');
});

// TEST 3: chat.js checkIncomingPrompt pre-fills without auto-sending
runTest('TEST 3: chat.js correctly reads prompt and does NOT trigger auto-send', () => {
  const chatJsPath = path.join(__dirname, '../../js/pages/chat.js');
  const chatJs = fs.readFileSync(chatJsPath, 'utf8');

  // Verify checkIncomingPrompt logic in chat.js
  assert.ok(chatJs.includes('checkIncomingPrompt()'), 'chat.js must define and call checkIncomingPrompt');
  assert.ok(chatJs.includes('urlParams.get(\'prompt\')'), 'Must support URL query param prompt');
  assert.ok(chatJs.includes('devpilot_prompt_to_run'), 'Must support devpilot_prompt_to_run storage');
  assert.ok(chatJs.includes('textarea.value = incoming.trim();'), 'Must assign incoming prompt to textarea.value');
  assert.ok(chatJs.includes('textarea.focus()'), 'Must focus textarea');

  // Verify that checkIncomingPrompt does NOT call sendMessage
  const checkPromptFunctionMatch = chatJs.match(/function checkIncomingPrompt\(\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(checkPromptFunctionMatch, 'Must find checkIncomingPrompt function');
  const funcBody = checkPromptFunctionMatch[1];
  assert.strictEqual(funcBody.includes('sendMessage('), false, 'checkIncomingPrompt must NOT call sendMessage');
  assert.strictEqual(funcBody.includes('dispatchEvent'), false, 'checkIncomingPrompt must NOT dispatch Enter key event');
});

// TEST 4: dashboard.js click handler safely stores prompt in localStorage
runTest('TEST 4: dashboard.js binds AI prompt transfer and GitHub profile update', () => {
  const dashboardJsPath = path.join(__dirname, '../../js/pages/dashboard.js');
  const dashboardJs = fs.readFileSync(dashboardJsPath, 'utf8');

  assert.ok(dashboardJs.includes('devpilot_prompt_to_run'), 'dashboard.js must store devpilot_prompt_to_run on startBtn click');
  assert.ok(dashboardJs.includes('github-user-profile-link'), 'dashboard.js must update #github-user-profile-link');
  assert.ok(dashboardJs.includes('github-username-display'), 'dashboard.js must update #github-username-display');
});

console.log('\n----------------------------------------------------');
console.log('All AI Suggestion & GitHub Verification Tests Passed!');
console.log('----------------------------------------------------\n');
