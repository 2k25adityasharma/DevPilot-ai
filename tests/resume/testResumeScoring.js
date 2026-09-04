const analyzer = require('../../js/pages/resumeAnalyzer.js');

const weakResume = `
John Doe
+1 555-0199
john.doe@example.com

OBJECTIVE
Hardworking and motivated student looking for a challenging role at a reputed company to utilize my skills and learn new technologies.

SKILLS
HTML, CSS

PROJECTS
Calculator
Made a simple calculator using HTML and CSS for college project.

EDUCATION
State College
Bachelor of Arts | 2023
`;

const strongResume = `
Aditya Sharma
Kanpur, UP, India | +91 98765 43210 | aditya@example.com
github.com/2k25adityasharma | linkedin.com/in/aditya-sharma | leetcode.com/u/aditya

PROFESSIONAL SUMMARY
Passionate Full Stack & AI Developer with practical experience developing modern web applications, responsive frontend architectures, and real-time AI solutions using C++, JavaScript, REST APIs, and Gemini API.

TECHNICAL SKILLS
Languages: C++, JavaScript, TypeScript, HTML5, CSS3, SQL
Frontend: React, Next.js, Tailwind CSS, Responsive Design
Backend & APIs: Node.js, Express.js, REST APIs, Gemini API
Cloud & Deployment: Vercel, AWS, Git, GitHub
Core CS: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP)

WORK EXPERIENCE
Software Development Intern | TechWave Innovations | Jan 2024 – June 2024
• Developed and deployed responsive full-stack features using JavaScript and REST APIs, improving user engagement by 28%.
• Optimized database queries and backend endpoints reducing average response latency by 35%.
• Collaborated with senior engineering team to integrate automated CI/CD deployment pipelines on Vercel.

PROJECTS
SONIQX — Web Audiometer & Hearing Diagnostic Suite | github.com/aditya/soniqx
• Architected modern responsive web UI supporting 2 distinct screening modes, reducing workflow completion time by 30%.
• Engineered pure-tone audiometry test protocols across 125Hz-8000Hz with 98% calibration accuracy using JavaScript and HTML5.
• Deployed production application on Vercel with responsive diagnostic visualization.

AI Conversational Assistant with Gemini API | github.com/aditya/gemini-bot
• Engineered responsive AI assistant leveraging Google Gemini API and Node.js REST APIs for real-time prompt completion.
• Implemented client-side caching and streaming responses with sub-200ms latency.
• Containerized and deployed application on Vercel handling 1,500+ daily developer prompts.

Algorithm Visualizer & Graph Suite | github.com/aditya/algo-visualizer
• Built interactive algorithm visualizer for complex graph traversals and sorting algorithms in C++ and JavaScript.
• Engineered dynamic Canvas API rendering running smoothly at 60 FPS across all devices.

EDUCATION
Dr. A.P.J. Abdul Kalam Technical University
Bachelor of Technology (B.Tech) in Computer Science & Engineering | 2022 – 2026 | CGPA: 8.5 / 10.0

ACHIEVEMENTS
• Solved 220+ Data Structures & Algorithms (DSA) problems on LeetCode with a 120+ day coding consistency streak.
• Finalist in National Level Innovation Hackathon competing among 300+ engineering teams.

CERTIFICATIONS
• AWS Certified Solutions Architect — Amazon Web Services (2025)
• Full Stack Web Development Professional Specialization — Meta (2024)
`;

function evaluateResume(name, text) {
  const parsed = analyzer.parseResumeSections(text);
  const contact = analyzer.extractContactInfo(text);
  const skills = analyzer.extractSkills(text, parsed);
  const summary = analyzer.analyzeProfessionalSummary(text, parsed, skills);
  const exp = analyzer.analyzeExperience(text, parsed.sectionContent);
  const proj = analyzer.analyzeProjects(text, parsed.sectionContent);
  const edu = analyzer.analyzeEducation(text, parsed);
  const cert = analyzer.analyzeCertifications(text, parsed);
  const ach = analyzer.analyzeAchievements(text, parsed);
  const cq = analyzer.analyzeContentQuality(text, exp, proj);
  const fmt = analyzer.analyzeATSFormatting(text, parsed);

  const scores = analyzer.calculateATSScore(
    text, contact, summary, skills, exp, proj, edu, cert, ach, cq, fmt
  );

  console.log(`\n================== ${name} ==================`);
  console.log(`Overall Score: ${scores.overall} / 100`);
  console.log('Category Breakdown:');
  for (const [key, val] of Object.entries(scores.breakdown)) {
    console.log(`  - ${val.label}: ${val.score} / ${val.max}`);
  }
  return scores.overall;
}

const weakScore = evaluateResume('WEAK RESUME', weakResume);
const strongScore = evaluateResume('STRONG RESUME', strongResume);

console.log('\n=============================================');
console.log(`Weak Resume Result: ${weakScore} (Expected: ~30-50)`);
console.log(`Strong Resume Result: ${strongScore} (Expected: ~90-98)`);
console.log('=============================================');
