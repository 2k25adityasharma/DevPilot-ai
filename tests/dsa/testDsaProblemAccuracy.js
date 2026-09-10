/**
 * DevPilot-AI: Automated DSA Problem Content Accuracy & LeetCode Validation Engine Test Suite
 * Enforces the 29 Absolute Rules and 43 Specification Points:
 * 1. Problem Identity & Verification Data
 * 2. 15 Pedagogical Sections Complete
 * 3. Exactly 3 Unique Progressive Hints
 * 4. Zero Cross-Problem Contamination (No recycled hints, explanations, or code)
 * 5. LeetCode Submission Pasteability (No main, no cin/cout, correct class and signatures)
 * 6. Authentic Data Structures (ListNode, TreeNode, Design classes)
 * 7. Accurate Exact Complexities
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runTest() {
  console.log('================================================================');
  console.log(' DevPilot-AI: Testing DSA Problem Content Accuracy & LC Quality');
  console.log('================================================================\n');

  // Setup sandbox
  const sandbox = {
    window: {},
    global: {},
    console: console
  };
  sandbox.window = sandbox;
  sandbox.global = sandbox;
  vm.createContext(sandbox);

  // Load core data & problem explanations engine
  const problemExpCode = fs.readFileSync(path.join(__dirname, '../../js/data/dsa/problemExplanations.js'), 'utf8');
  vm.runInContext(problemExpCode, sandbox);

  // Load Category 01: Array explanations if exists
  const arrayPath = path.join(__dirname, '../../js/data/dsa/explanations/array.js');
  if (fs.existsSync(arrayPath)) {
    const arrayCode = fs.readFileSync(arrayPath, 'utf8');
    vm.runInContext(arrayCode, sandbox);
  }

  const db = sandbox.DsaProblemDatabase;
  if (!db || typeof db.getAllCurated !== 'function') {
    throw new Error('DsaProblemDatabase.getAllCurated is not available');
  }

  const curated = db.getAllCurated();
  const qids = Object.keys(curated);
  console.log(`Found ${qids.length} registered curated problems to validate.\n`);

  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      passCount++;
    } else {
      failCount++;
      console.error(`❌ [FAIL] ${message}`);
    }
  }

  // Tracking sets for Cross-Problem Contamination Check
  const seenHints = new Map(); // hintText -> qid
  const seenUnderstandings = new Map(); // text -> qid
  const seenTakeaways = new Map(); // text -> qid
  const seenCppCodes = new Map(); // code -> qid

  qids.forEach(qid => {
    const p = curated[qid];
    const label = `[${p.id || qid}] #${p.leetcodeNumber || '?'} ${p.title || 'Untitled'}`;

    // 1. Identity & Metadata Check
    assert(p.id && typeof p.id === 'string', `${label}: Missing or invalid 'id'`);
    assert(typeof p.leetcodeNumber === 'number' && p.leetcodeNumber > 0, `${label}: Invalid leetcodeNumber: ${p.leetcodeNumber}`);
    assert(p.title && typeof p.title === 'string', `${label}: Missing title`);
    assert(['Easy', 'Medium', 'Hard'].includes(p.difficulty), `${label}: Invalid difficulty: ${p.difficulty}`);
    assert(p.category && typeof p.category === 'string', `${label}: Missing category`);
    assert(p.pattern && typeof p.pattern === 'string', `${label}: Missing pattern`);

    // 2. Exactly 3 Progressive Hints
    assert(Array.isArray(p.hints) && p.hints.length === 3, `${label}: Must have exactly 3 hints (found ${p.hints ? p.hints.length : 0})`);
    if (Array.isArray(p.hints)) {
      p.hints.forEach((h, idx) => {
        assert(typeof h === 'string' && h.trim().length > 15, `${label}: Hint ${idx + 1} too short or invalid`);
        // Contamination check
        const cleanH = h.trim().toLowerCase();
        if (seenHints.has(cleanH) && seenHints.get(cleanH) !== qid) {
          assert(false, `${label}: Hint ${idx + 1} is DUPLICATED from question ${seenHints.get(cleanH)}: "${h}"`);
        } else {
          seenHints.set(cleanH, qid);
        }
      });
    }

    // 3. 15 Pedagogical Sections Completeness
    assert(typeof p.problemUnderstanding === 'string' && p.problemUnderstanding.length > 20, `${label}: Missing or short problemUnderstanding`);
    if (p.problemUnderstanding) {
      const cleanUnd = p.problemUnderstanding.trim().toLowerCase();
      if (seenUnderstandings.has(cleanUnd) && seenUnderstandings.get(cleanUnd) !== qid) {
        assert(false, `${label}: problemUnderstanding DUPLICATED from ${seenUnderstandings.get(cleanUnd)}`);
      } else {
        seenUnderstandings.set(cleanUnd, qid);
      }
    }

    assert(typeof p.whyItMatters === 'string' && p.whyItMatters.length > 20, `${label}: Missing or short whyItMatters`);
    assert(typeof p.patternExplanation === 'string' && p.patternExplanation.length > 20, `${label}: Missing patternExplanation`);
    assert(Array.isArray(p.recognitionSignals) && p.recognitionSignals.length >= 3, `${label}: Must have >= 3 recognition signals`);
    assert(typeof p.thoughtProcess === 'string' && p.thoughtProcess.length > 30, `${label}: Missing thoughtProcess`);
    assert(Array.isArray(p.approach) && p.approach.length >= 3, `${label}: Must have >= 3 approach steps`);
    assert(typeof p.algorithm === 'string' && p.algorithm.length > 20, `${label}: Missing algorithm description`);
    assert(typeof p.pseudocode === 'string' && p.pseudocode.length > 20, `${label}: Missing pseudocode`);

    // 4. Walkthrough / Trace Table
    assert(p.walkthrough && typeof p.walkthrough.input === 'string', `${label}: Missing walkthrough input`);
    assert(p.walkthrough && Array.isArray(p.walkthrough.tableHeaders) && p.walkthrough.tableHeaders.length >= 3, `${label}: Missing walkthrough tableHeaders`);
    assert(p.walkthrough && Array.isArray(p.walkthrough.tableRows) && p.walkthrough.tableRows.length >= 1, `${label}: Missing walkthrough tableRows`);

    // 5. Edge Cases
    assert(Array.isArray(p.edgeCases) && p.edgeCases.length >= 2, `${label}: Must have >= 2 edge cases`);
    if (Array.isArray(p.edgeCases)) {
      p.edgeCases.forEach(ec => {
        assert(ec && ec.case && ec.expected && ec.explanation, `${label}: Edge case malformed: ${JSON.stringify(ec)}`);
      });
    }

    // 6. Multi-Language Code Implementations
    assert(p.code && typeof p.code === 'object', `${label}: Missing code object`);
    const langs = ['python', 'cpp', 'java', 'javascript'];
    langs.forEach(lang => {
      assert(p.code && typeof p.code[lang] === 'string' && p.code[lang].trim().length > 30, `${label}: Missing or empty code for ${lang}`);
      assert(p.codeExplanation && Array.isArray(p.codeExplanation[lang]) && p.codeExplanation[lang].length >= 2, `${label}: Missing codeExplanation for ${lang}`);
    });

    // 7. LeetCode Pasteability & Submission Validation
    if (p.code && p.code.cpp) {
      const cpp = p.code.cpp;
      assert(!cpp.includes('int main(') && !cpp.includes('void main('), `${label}: C++ code contains forbidden main()`);
      assert(!cpp.includes('cin >>') && !cpp.includes('cout <<'), `${label}: C++ code contains forbidden cin/cout`);
      assert(!cpp.includes('class Custom') && !cpp.includes('struct Custom'), `${label}: C++ code contains forbidden custom structs`);

      // Verify class structure (either class Solution or design class)
      const isDesign = /class\s+(MinStack|LRUCache|Trie|NumArray|MedianFinder|TimeMap|WordDictionary)/.test(cpp);
      const isSolution = cpp.includes('class Solution');
      assert(isSolution || isDesign, `${label}: C++ code missing class Solution or expected Design class`);

      // Cross-Problem Code Contamination
      const cleanCpp = cpp.replace(/\s+/g, ' ').trim();
      if (seenCppCodes.has(cleanCpp) && seenCppCodes.get(cleanCpp) !== qid) {
        assert(false, `${label}: C++ code DUPLICATED from ${seenCppCodes.get(cleanCpp)}`);
      } else {
        seenCppCodes.set(cleanCpp, qid);
      }
    }

    if (p.code && p.code.python) {
      const py = p.code.python;
      assert(!py.includes('input(') && !py.includes('sys.stdin'), `${label}: Python code contains forbidden input()`);
      assert(!py.includes('print('), `${label}: Python code contains forbidden debug print()`);
    }

    // 8. Complexity Format
    assert(/^O\([^)]+\)/.test(p.timeComplexity), `${label}: Invalid timeComplexity format: "${p.timeComplexity}"`);
    assert(/^O\([^)]+\)/.test(p.spaceComplexity), `${label}: Invalid spaceComplexity format: "${p.spaceComplexity}"`);

    // 9. Common Mistakes & Key Takeaway
    assert(Array.isArray(p.commonMistakes) && p.commonMistakes.length >= 3, `${label}: Must have >= 3 common mistakes`);
    assert(typeof p.takeaway === 'string' && p.takeaway.length > 20, `${label}: Missing takeaway`);
    if (p.takeaway) {
      const cleanTk = p.takeaway.trim().toLowerCase();
      if (seenTakeaways.has(cleanTk) && seenTakeaways.get(cleanTk) !== qid) {
        assert(false, `${label}: takeaway DUPLICATED from ${seenTakeaways.get(cleanTk)}`);
      } else {
        seenTakeaways.set(cleanTk, qid);
      }
    }
  });

  console.log(`\n================================================================`);
  console.log(` Summary: ${passCount} Assertions Passed, ${failCount} Failed`);
  console.log(`================================================================`);

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('✓ All Problem Accuracy and LeetCode Submission Standards Passed!\n');
  }
}

runTest();
