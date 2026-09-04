const assert = require('assert');

// We will load the updated analyzer functions and run test on both resumes
// Let's create an updated version of the scoring functions in testScript to verify exact numbers.

const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'created', 'led', 'optimized',
  'automated', 'improved', 'reduced', 'increased', 'integrated', 'deployed',
  'engineered', 'architected', 'managed', 'delivered', 'launched', 'maintained',
  'configured', 'streamlined', 'collaborated', 'coordinated', 'established',
  'mentored', 'spearheaded', 'orchestrated', 'scaled', 'refactored', 'debugged',
  'tested', 'analyzed', 'resolved', 'migrated', 'programmed', 'authored',
  'executed', 'trained', 'researched', 'published', 'presented', 'contributed',
  'enhanced', 'modernized', 'simplified', 'consolidated', 'transformed',
  'accelerated', 'pioneered', 'formulated', 'negotiated', 'supervised',
  'constructed', 'centralized', 'standardized', 'secured'
];

const WEAK_VERBS = [
  'worked', 'helped', 'assisted', 'was responsible', 'responsible for',
  'handled', 'did', 'made', 'got', 'used', 'utilized', 'participated',
  'involved in', 'tasked with', 'served as', 'acted as', 'tried',
  'learned', 'gained knowledge', 'contributed slightly'
];

const VAGUE_PHRASES = [
  'various tasks', 'multiple projects', 'different technologies',
  'team player', 'hard worker', 'fast learner', 'self-starter',
  'detail-oriented', 'results-driven', 'proven track record',
  'excellent communication', 'strong work ethic', 'go-getter',
  'think outside the box', 'synergy', 'leverage', 'paradigm',
  'good learner', 'hardworking', 'motivated student', 'passionate individual',
  'looking for a challenging role', 'reputed company', 'seeking an entry level',
  'enthusiastic learner', 'dynamic professional', 'hands-on experience'
];

// Let's test the weak and strong resumes
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

console.log('Script loaded successfully.');
