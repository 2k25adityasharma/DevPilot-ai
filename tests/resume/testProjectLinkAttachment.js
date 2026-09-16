const assert = require('assert');
const analyzer = require('../../js/pages/resumeAnalyzer.js');

function analyze(projectsText) {
  const text = `PROJECTS\n${projectsText}\nEDUCATION\nB.Tech, Example University, 2022 - 2026`;
  const parsed = analyzer.parseResumeSections(text);
  return analyzer.analyzeProjects(text, parsed.sectionContent);
}

// Same line, next bullet, live demo bullet, both separate, no links, and
// adjacent projects must all retain their real project boundaries.
const result = analyze(`
NorthPeak Digital Website — Frontend Developer | GitHub: https://github.com/acme/northpeak
- Built a responsive website using JavaScript and HTML5.
- Live Demo: https://northpeak.vercel.app

Task Tracker — Full Stack Project
- Built REST APIs using Node.js and PostgreSQL.
- Git hub - https://github.com/acme/task-tracker
- Live Web - https://task-tracker.vercel.app

Offline Notes App — Personal Project
- Built local-first note taking with JavaScript.
`);

assert.strictEqual(result.count, 3, 'Only actual project headings count as projects');
assert.deepStrictEqual(result.details.map(project => project.name), [
  'NorthPeak Digital Website — Frontend Developer',
  'Task Tracker — Full Stack Project',
  'Offline Notes App — Personal Project'
]);
assert.strictEqual(result.details[0].githubUrl, 'https://github.com/acme/northpeak');
assert.strictEqual(result.details[0].demoUrl, 'https://northpeak.vercel.app');
assert.strictEqual(result.details[1].githubUrl, 'https://github.com/acme/task-tracker');
assert.strictEqual(result.details[1].demoUrl, 'https://task-tracker.vercel.app');
assert.strictEqual(result.details[2].githubUrl, null, 'Projects without links stay linkless');
assert.strictEqual(result.details[2].demoUrl, null, 'Projects without links stay linkless');
assert.ok(result.details.every(project => !/^(?:git\s*hub|repository|repo|live|demo)/i.test(project.name)), 'Link labels never become project names');

console.log('Project link attachment tests passed.');
