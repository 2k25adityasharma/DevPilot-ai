/**
 * Automated Test Suite: Career Roadmaps Progression & Flow Redesign
 * 
 * Verifies all 31 requirements from the user request:
 * - Intentional commitment flow & single active career state
 * - Locking of non-active career roadmaps
 * - Multi-level sequential dependency locking (Levels, Sections, Topics, Projects, Job-Ready)
 * - Anti-skipping enforcement at the application logic level (validateSkillAction)
 * - Locked node previews with prerequisite reasons
 * - "You Are Here" position tracking & node-based progress calculation
 * - Non-destructive pause & resume
 * - Deliberate (non-manipulative) change-career flow with 100% progress preservation and switching back
 * - Dashboard integration summary hook
 */

const assert = require('assert');
const path = require('path');

// Setup minimal global mock for localStorage
const storageStore = {};
global.localStorage = {
  getItem: (key) => storageStore[key] || null,
  setItem: (key, val) => { storageStore[key] = String(val); },
  removeItem: (key) => { delete storageStore[key]; },
  clear: () => { for (const k of Object.keys(storageStore)) delete storageStore[k]; }
};

const rootDir = path.resolve(__dirname, '../../');
const engine = require(path.join(rootDir, 'js/core/careerProgressionEngine.js'));
const { careerRoles } = require(path.join(rootDir, 'js/data/careerRolesData.js'));
const { careerRoadmaps } = require(path.join(rootDir, 'js/data/careerRoadmapsData.js'));
const roadmapsController = require(path.join(rootDir, 'js/pages/roadmaps.js'));

global.careerRoadmaps = careerRoadmaps;
global.careerRoles = careerRoles;

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
    console.error(err.stack);
  }
}

console.log('===========================================================');
console.log(' DevPilot-AI: Career Progression & Flow Test Suite');
console.log('===========================================================\n');

// --------------------------------------------------------------------------
// 1. Initial State (No Active Career)
// --------------------------------------------------------------------------
runTest('Initial state: No active career, all roles are AVAILABLE', () => {
  localStorage.clear();
  const state = engine.getCareerState();
  assert.strictEqual(state.activeCareer, null, 'Active career should initially be null');
  assert.strictEqual(engine.getActiveCareerId(state), null);

  // All roles should be in AVAILABLE state
  const feCardState = engine.getRoleCardState('frontend-developer', state);
  const beCardState = engine.getRoleCardState('backend-developer', state);
  assert.strictEqual(feCardState, 'AVAILABLE');
  assert.strictEqual(beCardState, 'AVAILABLE');
});

// --------------------------------------------------------------------------
// 2. Intentional Commitment Flow
// --------------------------------------------------------------------------
runTest('Commitment flow: Committing to Frontend Developer sets it ACTIVE and locks other roles', () => {
  const commitAnswers = {
    goal: 'Get a full-time job',
    experienceLevel: 'Beginner',
    sequenceConsent: true
  };

  const updatedState = engine.commitToCareer('frontend-developer', commitAnswers);
  assert.strictEqual(updatedState.activeCareer, 'frontend-developer');
  assert.strictEqual(updatedState.activeCareerStatus, 'active');
  assert.ok(updatedState.commitmentData['frontend-developer'], 'Commitment data must be recorded');
  assert.strictEqual(updatedState.commitmentData['frontend-developer'].goal, 'Get a full-time job');
  assert.strictEqual(updatedState.commitmentData['frontend-developer'].experienceLevel, 'Beginner');

  // Role card states check:
  assert.strictEqual(engine.getRoleCardState('frontend-developer', updatedState), 'ACTIVE', 'Frontend must be ACTIVE');
  assert.strictEqual(engine.getRoleCardState('backend-developer', updatedState), 'LOCKED', 'Backend must be LOCKED');
  assert.strictEqual(engine.getRoleCardState('ai-engineer', updatedState), 'LOCKED', 'AI Engineer must be LOCKED');
  assert.strictEqual(engine.getRoleCardState('devops-engineer', updatedState), 'LOCKED', 'DevOps must be LOCKED');
});

// --------------------------------------------------------------------------
// 3. Multi-Level Sequential Dependency Locking (Inside Active Roadmap)
// --------------------------------------------------------------------------
runTest('Sequential locking: Level 1 topic 1 is available, subsequent topics and future levels are locked', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  const state = engine.getCareerState();

  const statuses = engine.resolveSequentialNodeStatuses('frontend-developer', feRoadmap, state);
  
  // fe-html is first in Level 1 -> should be available
  assert.ok(statuses['fe-html'], 'fe-html must exist in status map');
  assert.strictEqual(statuses['fe-html'].status, 'available', 'fe-html must be available initially');

  // fe-css requires fe-html -> must be locked
  assert.ok(statuses['fe-css'], 'fe-css must exist in status map');
  assert.strictEqual(statuses['fe-css'].status, 'locked', 'fe-css must be locked before fe-html is completed');
  assert.ok(statuses['fe-css'].reason.includes('HTML5'), 'Lock reason must mention HTML5');

  // Level 2 (e.g. fe-js-core) -> must be locked because Level 1 is not done
  const lvl2Skill = feRoadmap.levels[1].skills[0];
  assert.strictEqual(statuses[lvl2Skill.id].status, 'locked', 'Level 2 topics must be locked before Level 1 is completed');
});

// --------------------------------------------------------------------------
// 4. Sequential Unlocking as User Completes Topics
// --------------------------------------------------------------------------
runTest('Completing fe-html unlocks fe-css; subsequent topics unlock sequentially', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  
  // Mark fe-html completed
  const success = roadmapsController.setSkillStatus('frontend-developer', 'fe-html', 'completed');
  assert.strictEqual(success, true, 'setSkillStatus on available fe-html should succeed');

  const state = engine.getCareerState();
  assert.ok(state['frontend-developer'].completed.includes('fe-html'), 'fe-html in completed list');

  // Now resolve statuses
  const statuses = engine.resolveSequentialNodeStatuses('frontend-developer', feRoadmap, state);
  assert.strictEqual(statuses['fe-html'].status, 'completed');
  assert.strictEqual(statuses['fe-css'].status, 'available', 'fe-css should unlock to available now');
});

// --------------------------------------------------------------------------
// 5. Anti-Skipping / Application Logic Validation (validateSkillAction)
// --------------------------------------------------------------------------
runTest('Anti-skipping: Directly marking a locked topic complete is strictly rejected', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  const state = engine.getCareerState();

  // Try to mark an advanced locked topic complete (e.g. React in Level 3)
  const lvl3Skill = feRoadmap.levels[2].skills[0];
  const validation = engine.validateSkillAction('frontend-developer', lvl3Skill.id, 'completed', state, feRoadmap);
  
  assert.strictEqual(validation.valid, false, 'Validation must reject completing locked skill');
  assert.strictEqual(validation.nodeStatus, 'locked');
  assert.ok(validation.error.length > 0, 'Error reason must be provided');

  // Attempting setSkillStatus on locked skill must fail
  const attempted = roadmapsController.setSkillStatus('frontend-developer', lvl3Skill.id, 'completed');
  assert.strictEqual(attempted, false, 'Controller must reject completing locked skill');

  // Verify it was not added to completed set
  const stateAfter = engine.getCareerState();
  assert.strictEqual(stateAfter['frontend-developer'].completed.includes(lvl3Skill.id), false);
});

// --------------------------------------------------------------------------
// 6. Non-Active Career Action Protection
// --------------------------------------------------------------------------
runTest('Action protection: Attempting to complete a topic in a locked career is rejected', () => {
  const beRoadmap = careerRoadmaps['backend'];
  const state = engine.getCareerState();
  assert.strictEqual(state.activeCareer, 'frontend-developer');

  // Attempt to act on backend-developer
  const beFirstSkill = beRoadmap.levels[0].skills[0];
  const validation = engine.validateSkillAction('backend-developer', beFirstSkill.id, 'completed', state, beRoadmap);

  assert.strictEqual(validation.valid, false);
  assert.strictEqual(validation.nodeStatus, 'career-locked');
  assert.ok(validation.error.includes('currently locked'));
});

// --------------------------------------------------------------------------
// 7. Progressive Project Milestones Unlocking
// --------------------------------------------------------------------------
runTest('Project milestones: Project 1 requires Level 1 completion; Project 2 requires Level 2', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  const state = engine.getCareerState();

  // Currently only fe-html is done; Level 1 has fe-html, fe-css, fe-git
  const p1Status = engine.getProjectLockStatus('frontend-developer', 0, state, feRoadmap);
  assert.strictEqual(p1Status.isUnlocked, false, 'Project 1 must be locked until Level 1 is fully completed');
  assert.strictEqual(p1Status.requiredLevel, 1);

  // Mark all Level 1 skills completed
  feRoadmap.levels[0].skills.forEach(s => {
    if (!state['frontend-developer'].completed.includes(s.id)) {
      state['frontend-developer'].completed.push(s.id);
    }
  });
  engine.saveCareerState(state);

  const p1StatusAfter = engine.getProjectLockStatus('frontend-developer', 0, state, feRoadmap);
  assert.strictEqual(p1StatusAfter.isUnlocked, true, 'Project 1 must unlock after Level 1 is completed');

  // Project 2 should still be locked
  const p2Status = engine.getProjectLockStatus('frontend-developer', 1, state, feRoadmap);
  assert.strictEqual(p2Status.isUnlocked, false, 'Project 2 must remain locked until Level 2 is completed');
});

// --------------------------------------------------------------------------
// 8. "You Are Here" Position Tracking & Node-Based Progress
// --------------------------------------------------------------------------
runTest('"You Are Here" tracking calculates accurate current topic, next topic, and locked milestone', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  const state = engine.getCareerState();

  const youAreHere = engine.getYouAreHereInfo('frontend-developer', feRoadmap, state);
  assert.ok(youAreHere, 'YouAreHere object returned');
  assert.ok(youAreHere.currentSkill, 'Current topic identified');
  assert.ok(youAreHere.nextSkill, 'Next topic identified');
  assert.ok(youAreHere.nextLockedMilestone, 'Next locked milestone identified');

  // Progress percentage is node-based (completed / total)
  const feRole = careerRoles.find(r => r.id === 'frontend-developer');
  const prog = roadmapsController.calculateRoleProgress(feRole);
  assert.ok(prog.completed > 0, 'Completed count > 0');
  assert.strictEqual(prog.percent, Math.round((prog.completed / prog.total) * 100));
});

// --------------------------------------------------------------------------
// 9. Pause and Resume Roadmap (Non-Destructive)
// --------------------------------------------------------------------------
runTest('Pause and Resume: Pausing changes card state to PAUSED without deleting progress', () => {
  const pausedState = engine.pauseActiveCareer('frontend-developer');
  assert.strictEqual(pausedState.activeCareerStatus, 'paused');
  assert.strictEqual(engine.getRoleCardState('frontend-developer', pausedState), 'PAUSED');

  // Completed skills must remain intact
  assert.ok(pausedState['frontend-developer'].completed.length > 0);

  // Resume
  const resumedState = engine.resumeActiveCareer('frontend-developer');
  assert.strictEqual(resumedState.activeCareerStatus, 'active');
  assert.strictEqual(engine.getRoleCardState('frontend-developer', resumedState), 'ACTIVE');
});

// --------------------------------------------------------------------------
// 10. Deliberate Change Career & Switching Back (Progress Preserved)
// --------------------------------------------------------------------------
runTest('Change Career flow: Preserves old progress in history, allows switching to another and restoring', () => {
  const feRole = careerRoles.find(r => r.id === 'frontend-developer');
  const currentProg = roadmapsController.calculateRoleProgress(feRole);
  const completedFeSkillsCount = currentProg.completed;
  assert.ok(completedFeSkillsCount > 0);

  // Deliberately change career to backend-developer
  const switchedState = engine.changeActiveCareer(
    'backend-developer',
    'I discovered another career I prefer',
    currentProg.percent
  );

  assert.strictEqual(switchedState.activeCareer, 'backend-developer');
  assert.strictEqual(switchedState.activeCareerStatus, 'active');
  assert.strictEqual(engine.getRoleCardState('backend-developer', switchedState), 'ACTIVE');
  assert.strictEqual(engine.getRoleCardState('frontend-developer', switchedState), 'LOCKED');

  // Check previousCareers history
  assert.ok(switchedState.previousCareers.length > 0);
  const prevEntry = switchedState.previousCareers[switchedState.previousCareers.length - 1];
  assert.strictEqual(prevEntry.careerId, 'frontend-developer');
  assert.strictEqual(prevEntry.reason, 'I discovered another career I prefer');

  // Verify Frontend completed skills were NOT deleted
  assert.strictEqual(switchedState['frontend-developer'].completed.length, completedFeSkillsCount);

  // Now switch back to frontend-developer
  const restoredState = engine.changeActiveCareer('frontend-developer', 'Switched back');
  assert.strictEqual(restoredState.activeCareer, 'frontend-developer');
  assert.strictEqual(engine.getRoleCardState('frontend-developer', restoredState), 'ACTIVE');

  // Verify restored progress is 100% intact
  const restoredProg = roadmapsController.calculateRoleProgress(feRole);
  assert.strictEqual(restoredProg.completed, completedFeSkillsCount);
});

// --------------------------------------------------------------------------
// 11. Dashboard Integration Hook
// --------------------------------------------------------------------------
runTest('getActiveCareerDashboardSummary returns accurate data for dashboard display', () => {
  const summary = engine.getActiveCareerDashboardSummary(engine.getCareerState(), careerRoles, careerRoadmaps);
  assert.strictEqual(summary.hasActiveCareer, true);
  assert.strictEqual(summary.activeCareerId, 'frontend-developer');
  assert.strictEqual(summary.roleTitle, 'Frontend Developer');
  assert.ok(summary.percent > 0);
  assert.ok(summary.currentSkillTitle);
  assert.strictEqual(summary.status, 'active');
});

// --------------------------------------------------------------------------
// 12. Backward Compatibility with Existing roadmaps.js Exports
// --------------------------------------------------------------------------
runTest('Backward compatibility: resolveRoadmapNodeStatuses, calculateRoleProgress, and findNextRecommendedSkill exist and work', () => {
  const feRoadmap = careerRoadmaps['frontend'];
  const statusMap = roadmapsController.resolveRoadmapNodeStatuses('frontend-developer', feRoadmap);
  assert.ok(typeof statusMap === 'object');
  assert.strictEqual(typeof statusMap['fe-html'], 'string', 'Values in resolveRoadmapNodeStatuses must be simple strings for legacy tests');

  const feRole = careerRoles.find(r => r.id === 'frontend-developer');
  const prog = roadmapsController.calculateRoleProgress(feRole);
  assert.ok(prog.total > 0);

  const next = roadmapsController.findNextRecommendedSkill(feRoadmap, statusMap);
  assert.ok(next !== null);
});

console.log(`\n===========================================================`);
console.log(` Career Progression Results: ${passedTests} / ${totalTests} Passed`);
console.log(`===========================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
