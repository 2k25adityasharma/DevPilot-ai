/**
 * DevPilot-AI — Resume Workspace Module
 * Handles: Hub, Resume Builder (9 real professional formats, live A4 preview, dynamic sections),
 *          Resume Analyzer (ATS checks, job match, GitHub correlation, AI recs)
 */

/* ============================================================
   DEFAULT STATE (FICTIONAL DEMO / SEED DATA)
   ============================================================ */
const defaultResumeState = {
  personal: {
    name: 'Aditya Sharma',
    title: 'Full Stack Engineer & AI Developer',
    email: '2k25aiml2513475@gmail.com',
    phone: '+91 XXX XXX XXXX',
    location: 'Kanpur, UP, India',
    github: 'github.com/2k25adityasharma',
    linkedin: 'linkedin.com/in/aditya-sharma-a93387410',
    portfolio: 'leetcode.com/u/adityasharma9616/'
  },
  summary: 'Performance-driven Full Stack Engineer with extensive experience developing scalable web applications, responsive frontend architectures, and real-time AI solutions. Proficient in modern JavaScript/TypeScript, React, Node.js, and CS fundamentals with 170+ solved algorithm challenges and a 100+ day streak.',
  skills: {
    languages: 'JavaScript (ES6+), TypeScript, C++, Python, HTML5, CSS3, SQL',
    frontend: 'React, Next.js, Redux Toolkit, Tailwind CSS, Responsive Design',
    backend: 'Node.js, Express.js, REST APIs, Asynchronous JavaScript, WebSockets',
    databases: 'PostgreSQL, MongoDB, Redis, AWS, Firebase',
    tools: 'Git & GitHub, Docker, Postman, VS Code, CI/CD, Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), System Architecture'
  },
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'DevPilot Systems',
      location: 'Kanpur, UP, India',
      startDate: 'Jan 2025',
      endDate: 'Present',
      description: '• Architected full-stack developer workspace modules reducing initial payload by 35% across all core views.\n• Engineered real-time WebSocket communication and automated CI/CD deployment pipelines on Cloudflare.\n• Integrated comprehensive REST APIs and client-side deterministic evaluation algorithms.'
    }
  ],
  projects: [
    {
      name: 'SONIQX — Web Audiometer & Hearing Diagnostic Suite',
      tech: 'JavaScript (ES6+), Web Audio API, Canvas API, Tailwind CSS',
      description: '• Architected modern responsive web UI supporting 2 distinct screening modes, reducing workflow step completion time by 30%.\n• Engineered pure-tone audiometry test protocols across 125Hz-8000Hz with 98% calibration accuracy.\n• Integrated responsive audiogram visualization and export pipeline reducing diagnostic time by 40%.\n• Maintained 100% open-source codebase with 500+ simulated test runs.',
      github: 'github.com/2k25adityasharma/soniqx-audiometer',
      demo: 'soniqx.devpilot.example.com'
    },
    {
      name: 'NorthPeak Digital — High-Performance Enterprise Platform',
      tech: 'React, TypeScript, Tailwind CSS, Vite, Cloudflare',
      description: '• Architected responsive frontend architecture achieving 99/100 Google Lighthouse performance score.\n• Engineered custom reusable component library reducing page load time by 35% across 10+ core pages.\n• Integrated modern SEO metadata and automated CI/CD deployment pipelines on Cloudflare Pages.\n• Collaborated on client design specifications delivering 100% accessible WCAG 2.1 AA compliant UI.',
      github: 'github.com/2k25adityasharma/northpeak-digital',
      demo: 'northpeak.devpilot.example.com'
    },
    {
      name: 'AI Chatbot & Conversational Assistant',
      tech: 'Node.js, Express.js, OpenAI API, WebSockets, Redis',
      description: '• Engineered responsive UI using JavaScript (ES6) and RESTful APIs, handling real-time prompt flows with sub-250ms latency.\n• Integrated Redis caching layer reducing external API latency by 45% on recurring query patterns.\n• Deployed containerized Docker services with 99.5% uptime handling 1,000+ daily developer prompts.\n• Architected prompt orchestration pipeline with fallback resilience and rate-limiting middleware.',
      github: 'github.com/2k25adityasharma/ai-chatbot-app',
      demo: 'chatbot.devpilot.example.com'
    },
    {
      name: 'Web Utility & Developer Productivity Suite',
      tech: 'JavaScript (ES6+), LocalStorage API, CSS Grid, HTML5',
      description: '• Developed suite of 4 responsive web tools, handling state management and DOM manipulation across 100+ simulated user interactions.\n• Optimized memory utilization with zero external dependencies and 100% client-side execution.\n• Implemented persistent session state management using structured LocalStorage abstractions.\n• Achieved 100% cross-browser compatibility with responsive mobile and desktop viewports.',
      github: 'github.com/2k25adityasharma/web-utility-suite',
      demo: 'utils.devpilot.example.com'
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
      institution: 'Dr. A.P.J. Abdul Kalam Technical University',
      startDate: '2022',
      endDate: '2026',
      gpa: '8.5 / 10.0 CGPA'
    }
  ],
  achievements: [
    {
      title: 'Solved 170+ Data Structures & Algorithms (DSA) Problems',
      org: 'LeetCode & Competitive Platforms',
      date: '2024 - Present',
      description: 'Solved 170+ Data Structures & Algorithms (DSA) problems with a 100+ day streak, ranking in the top tier of active college coders.'
    },
    {
      title: 'Finalist — National Level Innovation Hackathon',
      org: 'National Innovation Council',
      date: 'Oct 2024',
      description: 'Developed AI-powered medical diagnostic tooling in 36-hour sprint competing among 300+ national teams.'
    }
  ],
  certifications: [
    {
      name: 'Full Stack Web Development Professional Specialization',
      issuer: 'Meta / Coursera',
      date: '2024',
      credentialId: 'META-FS-839210'
    },
    {
      name: 'AWS Certified Solutions Architect — Associate Foundation',
      issuer: 'Amazon Web Services',
      date: '2025',
      credentialId: 'AWS-SAA-29104'
    }
  ]
};

/* ============================================================
   REAL PROFESSIONAL TEMPLATE DEFINITIONS (9 REAL FORMATS)
   ============================================================ */
const TEMPLATES = [
  {
    id: 0,
    key: 'classic-ats',
    name: 'Classic ATS',
    category: 'ats',
    atsLabel: 'ATS Optimized',
    atsClass: 'badge-success',
    desc: 'Traditional single-column layout for maximum ATS compatibility'
  },
  {
    id: 1,
    key: 'modern-ats',
    name: 'Modern ATS',
    category: 'ats',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-primary',
    desc: 'Clean modern hierarchy with contemporary typography'
  },
  {
    id: 2,
    key: 'reverse-chronological',
    name: 'Reverse Chronological',
    category: 'professional',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-primary',
    desc: 'Experience-first timeline format prioritizing career growth'
  },
  {
    id: 3,
    key: 'minimal-pro',
    name: 'Minimal Professional',
    category: 'professional',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-neutral',
    desc: 'Minimalist elegance with generous whitespace and clean typography'
  },
  {
    id: 4,
    key: 'modern-developer',
    name: 'Modern Developer',
    category: 'developer',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-primary',
    desc: 'Technical two-column layout tailored for software engineers'
  },
  {
    id: 5,
    key: 'executive-pro',
    name: 'Executive Professional',
    category: 'professional',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-primary',
    desc: 'Senior leadership format with core competencies matrix'
  },
  {
    id: 6,
    key: 'academic-cv',
    name: 'Academic CV',
    category: 'academic',
    atsLabel: 'Academic Format',
    atsClass: 'badge-warning',
    desc: 'Scholarly format prioritizing education and research projects'
  },
  {
    id: 7,
    key: 'student-entry',
    name: 'Entry-Level / Student',
    category: 'student',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-success',
    desc: 'Education & projects-first layout for students and freshers'
  },
  {
    id: 8,
    key: 'custom',
    name: 'Custom',
    category: 'developer',
    atsLabel: 'ATS Friendly',
    atsClass: 'badge-neutral',
    desc: 'Flexible custom layout using DevPilot modular styling'
  }
];

/* ============================================================
   STATE
   ============================================================ */
let currentResume   = Storage.get('resume_data', defaultResumeState);
// Sanitize any previously cached default seed data so placeholder is strictly used
if (currentResume && currentResume.personal && currentResume.personal.name === 'Aditya Sharma' && currentResume.personal.email === '2k25aiml2513475@gmail.com') {
  if (currentResume.personal.phone !== '+91 XXX XXX XXXX') {
    currentResume.personal.phone = '+91 XXX XXX XXXX';
  }
}
let activeTemplate  = getInitialTemplate();
let currentView     = 'hub';    // 'hub' | 'builder' | 'analyzer'
let analyzerData    = null;     // holds analysis results
let undoStack       = [];
let redoStack       = [];
const MAX_UNDO      = 30;

function getInitialTemplate() {
  const saved = Storage.get('resume_template', 0);
  if (typeof saved === 'number' && saved >= 0 && saved < TEMPLATES.length) {
    return saved;
  }
  if (typeof saved === 'string') {
    const idx = TEMPLATES.findIndex(t => t.key === saved || t.name.toLowerCase() === saved.toLowerCase());
    if (idx !== -1) return idx;
  }
  return 0; // Default to Classic ATS
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  currentResume = deepMerge(defaultResumeState, currentResume);

  initViewNavigation();
  initAccordions();
  initTemplatePicker();
  initBuilderControls();
  initAnalyzerControls();
  populateFormFields();
  renderDynamicLists();
  updateLivePreview();
  updateHubStats();
  updateAtsScore();
  updateHubStatTemplate();
});

/* ============================================================
   VIEW NAVIGATION
   ============================================================ */
function initViewNavigation() {
  // Hub → Builder
  const hubBuilder = document.getElementById('hub-go-builder');
  if (hubBuilder) {
    hubBuilder.addEventListener('click', () => switchView('builder'));
    hubBuilder.addEventListener('keydown', e => e.key === 'Enter' && switchView('builder'));
  }

  // Hub → Analyzer
  const hubAnalyzer = document.getElementById('hub-go-analyzer');
  if (hubAnalyzer) {
    hubAnalyzer.addEventListener('click', () => switchView('analyzer'));
    hubAnalyzer.addEventListener('keydown', e => e.key === 'Enter' && switchView('analyzer'));
  }

  // Builder ← Back
  const builderBack = document.getElementById('builder-back-btn');
  if (builderBack) builderBack.addEventListener('click', () => switchView('hub'));

  // Analyzer ← Back
  const analyzerBack = document.getElementById('analyzer-back-btn');
  if (analyzerBack) analyzerBack.addEventListener('click', () => switchView('hub'));
}

function switchView(view) {
  currentView = view;
  const views = ['hub', 'builder', 'analyzer'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.style.display = (v === view) ? 'block' : 'none';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   ACCORDIONS
   ============================================================ */
function initAccordions() {
  document.querySelectorAll('.form-accordion').forEach((acc, idx) => {
    const header = acc.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      acc.classList.toggle('active');
    });
  });
}

/* ============================================================
   TEMPLATE PICKER
   ============================================================ */
function initTemplatePicker() {
  renderTemplateCards('all');

  const openBtn  = document.getElementById('btn-template-picker');
  const closeBtn = document.getElementById('close-template-modal');
  const backdrop = document.getElementById('template-modal-backdrop');

  if (openBtn)  openBtn.addEventListener('click', () => {
    if (backdrop) backdrop.style.display = 'flex';
  });
  if (closeBtn) closeBtn.addEventListener('click', closeTemplateModal);
  if (backdrop) backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeTemplateModal();
  });

  // Category filter tabs
  document.querySelectorAll('#template-category-tabs .filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#template-category-tabs .filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTemplateCards(tab.dataset.category);
    });
  });
}

function closeTemplateModal() {
  const backdrop = document.getElementById('template-modal-backdrop');
  if (backdrop) backdrop.style.display = 'none';
}

function renderTemplateCards(category) {
  const grid = document.getElementById('template-cards-grid');
  if (!grid) return;

  const filtered = category === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === category || (category === 'developer' && t.id === 8));

  grid.innerHTML = filtered.map(tpl => {
    const isSelected = activeTemplate === tpl.id;
    return `
      <div class="template-card${isSelected ? ' selected' : ''}"
           data-tpl-id="${tpl.id}"
           role="button"
           tabindex="0"
           aria-label="Select ${tpl.name} template">
        <div class="template-card-preview">
          ${buildTemplateThumb(tpl)}
        </div>
        <div class="template-card-content">
          <div class="tcard-top-row">
            <div class="tcard-name">${escHtml(tpl.name)}</div>
            <span class="badge ${tpl.atsClass}" style="font-size:10px;padding:2px 6px;">${tpl.atsLabel}</span>
          </div>
          <div class="tcard-desc">${escHtml(tpl.desc)}</div>
          <div class="tcard-footer">
            <span class="tcard-cat-badge">${capitalize(tpl.category)}</span>
            <button class="btn-use-tpl" tabindex="-1">${isSelected ? 'Selected ✓' : 'Use Template'}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.template-card').forEach(card => {
    const select = () => {
      const id = parseInt(card.dataset.tplId, 10);
      selectTemplate(id);
    };
    card.addEventListener('click', select);
    card.addEventListener('keydown', e => e.key === 'Enter' && select());
  });
}

/* ------------------------------------------------------------
   REALISTIC MINIATURE THUMBNAILS FOR 9 TEMPLATES
   ------------------------------------------------------------ */
function buildTemplateThumb(tpl) {
  switch (tpl.id) {
    case 0: // Classic ATS - Single column, centered name, pure monochrome
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;">
          <div style="width:45%;height:5px;background:#000;border-radius:1px;margin:1px auto;"></div>
          <div style="width:70%;height:2px;background:#666;margin:1px auto;"></div>
          <div style="width:100%;height:1px;background:#000;margin:2px 0;"></div>
          <div style="width:30%;height:3px;background:#000;border-radius:1px;"></div>
          <div style="width:100%;height:2px;background:#888;"></div>
          <div style="width:85%;height:2px;background:#bbb;"></div>
          <div style="width:100%;height:1px;background:#000;margin:2px 0;"></div>
          <div style="width:35%;height:3px;background:#000;border-radius:1px;"></div>
          <div style="width:100%;height:2px;background:#888;"></div>
          <div style="width:75%;height:2px;background:#bbb;"></div>
          <div style="width:100%;height:1px;background:#000;margin:2px 0;"></div>
          <div style="width:25%;height:3px;background:#000;border-radius:1px;"></div>
          <div style="width:90%;height:2px;background:#888;"></div>
        </div>
      `;

    case 1: // Modern ATS - Single column, left name + blue accent line
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;">
          <div style="width:55%;height:5px;background:#0f172a;border-radius:1px;"></div>
          <div style="width:35%;height:3px;background:#4F46E5;border-radius:1px;"></div>
          <div style="width:100%;height:1px;background:#e0e7ff;margin:2px 0;"></div>
          <div style="width:32%;height:3px;background:#4F46E5;border-radius:1px;"></div>
          <div style="width:100%;height:2px;background:#94a3b8;"></div>
          <div style="width:80%;height:2px;background:#cbd5e1;"></div>
          <div style="width:32%;height:3px;background:#4F46E5;border-radius:1px;margin-top:2px;"></div>
          <div style="width:100%;height:2px;background:#94a3b8;"></div>
          <div style="display:flex;gap:2px;margin-top:2px;">
            <div style="width:14px;height:3px;background:#e0e7ff;border-radius:1px;"></div>
            <div style="width:18px;height:3px;background:#e0e7ff;border-radius:1px;"></div>
            <div style="width:16px;height:3px;background:#e0e7ff;border-radius:1px;"></div>
          </div>
        </div>
      `;

    case 2: // Reverse Chronological - Experience & right-aligned dates timeline
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;">
          <div style="width:60%;height:5px;background:#0f172a;border-radius:1px;"></div>
          <div style="width:100%;height:2px;background:#0f172a;margin:2px 0;"></div>
          <div style="width:45%;height:3px;background:#0f172a;font-weight:bold;"></div>
          <div style="display:flex;justify-content:space-between;width:100%;">
            <div style="width:45%;height:3px;background:#334155;"></div>
            <div style="width:25%;height:3px;background:#0f172a;"></div>
          </div>
          <div style="width:90%;height:2px;background:#94a3b8;margin-left:4px;"></div>
          <div style="width:80%;height:2px;background:#cbd5e1;margin-left:4px;"></div>
          <div style="display:flex;justify-content:space-between;width:100%;margin-top:2px;">
            <div style="width:40%;height:3px;background:#334155;"></div>
            <div style="width:25%;height:3px;background:#0f172a;"></div>
          </div>
          <div style="width:85%;height:2px;background:#94a3b8;margin-left:4px;"></div>
          <div style="width:35%;height:3px;background:#0f172a;margin-top:3px;"></div>
          <div style="width:70%;height:2px;background:#94a3b8;"></div>
        </div>
      `;

    case 3: // Minimal Professional - Lots of generous whitespace
      return `
        <div style="width:100%;height:100%;padding:8px 8px;display:flex;flex-direction:column;gap:4px;background:#fff;">
          <div style="width:40%;height:4px;background:#1e293b;border-radius:1px;letter-spacing:1px;"></div>
          <div style="width:60%;height:2px;background:#94a3b8;"></div>
          <div style="width:100%;height:1px;background:#f1f5f9;margin:3px 0;"></div>
          <div style="width:25%;height:2px;background:#64748b;"></div>
          <div style="width:90%;height:2px;background:#cbd5e1;"></div>
          <div style="width:75%;height:2px;background:#e2e8f0;"></div>
          <div style="width:25%;height:2px;background:#64748b;margin-top:3px;"></div>
          <div style="width:85%;height:2px;background:#cbd5e1;"></div>
          <div style="width:65%;height:2px;background:#e2e8f0;"></div>
        </div>
      `;

    case 4: // Modern Developer - Two Column Layout
      return `
        <div style="width:100%;height:100%;padding:4px;display:flex;gap:4px;background:#fff;">
          <!-- Left Col -->
          <div style="width:35%;border-right:1px solid #e0e7ff;padding-right:3px;display:flex;flex-direction:column;gap:3px;background:#f8fafc;">
            <div style="width:80%;height:3px;background:#4F46E5;border-radius:1px;"></div>
            <div style="width:90%;height:2px;background:#94a3b8;"></div>
            <div style="width:70%;height:2px;background:#cbd5e1;"></div>
            <div style="width:80%;height:3px;background:#4F46E5;border-radius:1px;margin-top:2px;"></div>
            <div style="width:100%;height:2px;background:#c7d2fe;"></div>
            <div style="width:85%;height:2px;background:#c7d2fe;"></div>
            <div style="width:80%;height:3px;background:#4F46E5;border-radius:1px;margin-top:2px;"></div>
            <div style="width:90%;height:2px;background:#94a3b8;"></div>
          </div>
          <!-- Right Col -->
          <div style="width:65%;display:flex;flex-direction:column;gap:3px;padding-left:2px;">
            <div style="width:70%;height:5px;background:#0f172a;border-radius:1px;"></div>
            <div style="width:40%;height:3px;background:#4F46E5;border-radius:1px;"></div>
            <div style="width:100%;height:1px;background:#e0e7ff;margin:1px 0;"></div>
            <div style="width:40%;height:3px;background:#4F46E5;border-radius:1px;"></div>
            <div style="width:100%;height:2px;background:#94a3b8;"></div>
            <div style="width:85%;height:2px;background:#cbd5e1;"></div>
            <div style="width:40%;height:3px;background:#4F46E5;border-radius:1px;margin-top:2px;"></div>
            <div style="width:100%;height:2px;background:#94a3b8;"></div>
          </div>
        </div>
      `;

    case 5: // Executive Professional - Centered header + 2x2 Competencies Matrix
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;">
          <div style="width:50%;height:5px;background:#0f172a;border-radius:1px;margin:0 auto;"></div>
          <div style="width:30%;height:3px;background:#4F46E5;border-radius:1px;margin:0 auto;"></div>
          <div style="width:100%;height:2px;background:#1e293b;margin:1px 0;"></div>
          <div style="width:40%;height:3px;background:#0f172a;border-radius:1px;"></div>
          <!-- 2x2 Grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;background:#f8fafc;padding:2px;border:1px solid #e2e8f0;border-radius:1px;">
            <div style="height:3px;background:#cbd5e1;"></div>
            <div style="height:3px;background:#cbd5e1;"></div>
            <div style="height:3px;background:#cbd5e1;"></div>
            <div style="height:3px;background:#cbd5e1;"></div>
          </div>
          <div style="width:45%;height:3px;background:#0f172a;border-radius:1px;margin-top:2px;"></div>
          <div style="width:100%;height:2px;background:#94a3b8;"></div>
          <div style="width:85%;height:2px;background:#cbd5e1;"></div>
        </div>
      `;

    case 6: // Academic CV - Centered academic header, double rule, education top
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;font-family:serif;">
          <div style="width:45%;height:5px;background:#000;border-radius:1px;margin:0 auto;"></div>
          <div style="width:30%;height:2px;background:#555;margin:0 auto;"></div>
          <div style="width:100%;height:1px;background:#374151;margin-top:1px;"></div>
          <div style="width:100%;height:1px;background:#374151;margin-bottom:1px;"></div>
          <div style="width:30%;height:3px;background:#000;border-radius:1px;"></div>
          <div style="width:100%;height:2px;background:#666;"></div>
          <div style="width:75%;height:2px;background:#999;"></div>
          <div style="width:40%;height:3px;background:#000;border-radius:1px;margin-top:2px;"></div>
          <div style="width:100%;height:2px;background:#666;"></div>
          <div style="width:80%;height:2px;background:#999;"></div>
          <div style="width:35%;height:3px;background:#000;border-radius:1px;margin-top:2px;"></div>
          <div style="width:90%;height:2px;background:#666;"></div>
        </div>
      `;

    case 7: // Entry-Level / Student - Prominent green education box + project emphasis
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;">
          <div style="width:50%;height:5px;background:#0f172a;border-radius:1px;"></div>
          <div style="width:35%;height:3px;background:#059669;border-radius:1px;"></div>
          <div style="width:100%;height:1px;background:#d1fae5;margin:1px 0;"></div>
          <!-- Education Highlight -->
          <div style="width:100%;background:#f0fdf4;border:1px solid #bbf7d0;padding:2px;border-radius:2px;">
            <div style="width:40%;height:3px;background:#059669;border-radius:1px;"></div>
            <div style="width:80%;height:2px;background:#065f46;margin-top:1px;"></div>
          </div>
          <div style="width:35%;height:3px;background:#059669;border-radius:1px;margin-top:2px;"></div>
          <div style="display:flex;gap:2px;">
            <div style="width:14px;height:3px;background:#a7f3d0;border-radius:1px;"></div>
            <div style="width:16px;height:3px;background:#a7f3d0;border-radius:1px;"></div>
            <div style="width:12px;height:3px;background:#a7f3d0;border-radius:1px;"></div>
          </div>
          <div style="width:35%;height:3px;background:#059669;border-radius:1px;margin-top:2px;"></div>
          <div style="width:100%;height:2px;background:#94a3b8;"></div>
          <div style="width:80%;height:2px;background:#cbd5e1;"></div>
        </div>
      `;

    case 8: // Custom - DevPilot brand styling
    default:
      return `
        <div style="width:100%;height:100%;padding:4px 6px;display:flex;flex-direction:column;gap:3px;background:#fff;">
          <div style="width:55%;height:5px;background:#4F46E5;border-radius:1px;"></div>
          <div style="width:35%;height:3px;background:#818cf8;border-radius:1px;"></div>
          <div style="width:100%;height:1px;background:#e2e8f0;margin:2px 0;"></div>
          <div style="width:30%;height:3px;background:#4F46E5;border-radius:1px;"></div>
          <div style="width:100%;height:2px;background:#94a3b8;"></div>
          <div style="width:80%;height:2px;background:#cbd5e1;"></div>
          <div style="width:30%;height:3px;background:#4F46E5;border-radius:1px;margin-top:2px;"></div>
          <div style="width:100%;height:2px;background:#94a3b8;"></div>
        </div>
      `;
  }
}

function selectTemplate(id) {
  activeTemplate = id;
  Storage.set('resume_template', id);
  updateLivePreview();
  updateHubStatTemplate();
  updateAtsScore();

  const label = TEMPLATES[id] ? TEMPLATES[id].name : 'Classic ATS';
  const labelEl = document.getElementById('active-template-label');
  if (labelEl) labelEl.textContent = label;
  const badgeEl = document.getElementById('template-badge-preview');
  if (badgeEl) badgeEl.textContent = label;

  // Refresh modal cards to show selected state
  const activeTab = document.querySelector('#template-category-tabs .filter-tab.active');
  if (activeTab) renderTemplateCards(activeTab.dataset.category);
  closeTemplateModal();
  showToast(`Template changed to "${label}"`, 'success');
}

/* ============================================================
   BUILDER CONTROLS
   ============================================================ */
function initBuilderControls() {
  // Save Draft
  const saveBtn = document.getElementById('btn-save-draft');
  if (saveBtn) saveBtn.addEventListener('click', saveDraft);

  // Export PDF
  const pdfBtn = document.getElementById('btn-export-pdf');
  if (pdfBtn) pdfBtn.addEventListener('click', exportPDF);

  // Print Preview
  const previewBtn = document.getElementById('btn-print-preview');
  if (previewBtn) previewBtn.addEventListener('click', () => window.print());

  // Undo / Redo
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');
  if (undoBtn) undoBtn.addEventListener('click', doUndo);
  if (redoBtn) redoBtn.addEventListener('click', doRedo);

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); doUndo(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); doRedo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveDraft(); }
  });

  // AI Summary Assist
  const aiSummaryBtn = document.getElementById('btn-ai-summary');
  if (aiSummaryBtn) aiSummaryBtn.addEventListener('click', aiImproveSummary);

  // Bind live input events
  bindFormInputs();

  // Dynamic entry "add" buttons
  document.getElementById('btn-add-experience')?.addEventListener('click', () => addEntry('experience'));
  document.getElementById('btn-add-project')?.addEventListener('click', () => addEntry('projects'));
  document.getElementById('btn-add-education')?.addEventListener('click', () => addEntry('education'));
  document.getElementById('btn-add-achievement')?.addEventListener('click', () => addEntry('achievements'));
  document.getElementById('btn-add-certification')?.addEventListener('click', () => addEntry('certifications'));

  // Set initial template label
  const labelEl = document.getElementById('active-template-label');
  if (labelEl) labelEl.textContent = TEMPLATES[activeTemplate]?.name || 'Classic ATS';
  const badgeEl = document.getElementById('template-badge-preview');
  if (badgeEl) badgeEl.textContent = TEMPLATES[activeTemplate]?.name || 'Classic ATS';
}

function bindFormInputs() {
  const ids = [
    'res-name', 'res-title', 'res-email', 'res-phone',
    'res-location', 'res-portfolio', 'res-github', 'res-linkedin',
    'res-summary',
    'res-skills-languages', 'res-skills-frontend', 'res-skills-backend',
    'res-skills-db', 'res-skills-tools'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', onFormInput);
  });
}

function onFormInput() {
  pushUndo();
  syncStateFromForm();
  updateLivePreview();
  updateAtsScore();
  updateHubStats();
}

/* ============================================================
   UNDO / REDO
   ============================================================ */
function pushUndo() {
  undoStack.push(JSON.stringify(currentResume));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack = [];
}

function doUndo() {
  if (!undoStack.length) return;
  redoStack.push(JSON.stringify(currentResume));
  currentResume = JSON.parse(undoStack.pop());
  populateFormFields();
  renderDynamicLists();
  updateLivePreview();
  updateAtsScore();
  showToast('Undone', 'info');
}

function doRedo() {
  if (!redoStack.length) return;
  undoStack.push(JSON.stringify(currentResume));
  currentResume = JSON.parse(redoStack.pop());
  populateFormFields();
  renderDynamicLists();
  updateLivePreview();
  updateAtsScore();
  showToast('Redone', 'info');
}

/* ============================================================
   FORM FIELD POPULATION & SYNC
   ============================================================ */
function populateFormFields() {
  const p = currentResume.personal;
  setInputVal('res-name',      p.name);
  setInputVal('res-title',     p.title);
  setInputVal('res-email',     p.email);
  setInputVal('res-phone',     p.phone);
  setInputVal('res-location',  p.location);
  setInputVal('res-portfolio', p.portfolio);
  setInputVal('res-github',    p.github);
  setInputVal('res-linkedin',  p.linkedin);
  setInputVal('res-summary',   currentResume.summary);

  const sk = currentResume.skills;
  setInputVal('res-skills-languages', sk.languages);
  setInputVal('res-skills-frontend',  sk.frontend);
  setInputVal('res-skills-backend',   sk.backend);
  setInputVal('res-skills-db',        sk.databases);
  setInputVal('res-skills-tools',     sk.tools);
}

function syncStateFromForm() {
  currentResume.personal.name      = getInputVal('res-name')      || 'Your Name';
  currentResume.personal.title     = getInputVal('res-title')     || '';
  currentResume.personal.email     = getInputVal('res-email')     || '';
  currentResume.personal.phone     = getInputVal('res-phone')     || '';
  currentResume.personal.location  = getInputVal('res-location')  || '';
  currentResume.personal.portfolio = getInputVal('res-portfolio') || '';
  currentResume.personal.github    = getInputVal('res-github')    || '';
  currentResume.personal.linkedin  = getInputVal('res-linkedin')  || '';
  currentResume.summary            = getInputVal('res-summary')   || '';

  currentResume.skills.languages = getInputVal('res-skills-languages') || '';
  currentResume.skills.frontend  = getInputVal('res-skills-frontend')  || '';
  currentResume.skills.backend   = getInputVal('res-skills-backend')   || '';
  currentResume.skills.databases = getInputVal('res-skills-db')        || '';
  currentResume.skills.tools     = getInputVal('res-skills-tools')     || '';
}

/* ============================================================
   DYNAMIC SECTION LISTS
   ============================================================ */
function renderDynamicLists() {
  renderExperienceList();
  renderProjectsList();
  renderEducationList();
  renderAchievementsList();
  renderCertificationsList();
}

function getTitleAbbrevSuggestion(val) {
  if (!val) return null;
  const ABBREVS = [
    { pattern: /\bInt\b/i, full: 'Intern' },
    { pattern: /\bMgr\b/i, full: 'Manager' },
    { pattern: /\bSr\b(?!\.)/i, full: 'Senior' },
    { pattern: /\bJr\b(?!\.)/i, full: 'Junior' },
    { pattern: /\bEng\b/i, full: 'Engineer' },
    { pattern: /\bDev\b/i, full: 'Developer' },
    { pattern: /\bAsst\b/i, full: 'Assistant' },
    { pattern: /\bDir\b/i, full: 'Director' }
  ];
  for (const a of ABBREVS) {
    if (a.pattern.test(val)) return a.full;
  }
  return null;
}

/* ---------- Experience ---------- */
function renderExperienceList() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  if (!currentResume.experience.length) {
    container.innerHTML = '<p class="acc-field-hint" style="margin-bottom:0.5rem;">No experience added yet.</p>';
    return;
  }

  container.innerHTML = currentResume.experience.map((exp, i) => {
    const sug = getTitleAbbrevSuggestion(exp.role);
    return `
    <div class="dynamic-entry" data-section="experience" data-index="${i}">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-label">Experience ${i + 1}</span>
        <button class="btn-remove-entry" data-section="experience" data-index="${i}" aria-label="Remove experience ${i+1}">
          <span class="material-symbols-outlined" style="font-size:14px;">close</span>
        </button>
      </div>
      <div class="dynamic-entry-grid-2">
        <div class="form-group">
          <label class="form-label">Role / Position</label>
          <input type="text" class="form-input dyn-field" data-section="experience" data-index="${i}" data-field="role" value="${escAttr(exp.role)}" placeholder="Full Stack Developer Intern"/>
          ${sug ? `<div class="title-abbrev-hint" style="font-size:0.72rem;color:var(--color-primary);margin-top:2px;">💡 Did you mean "${sug}"? Expanding abbreviations improves ATS title recognition.</div>` : ''}
        </div>
        <div class="form-group">
          <label class="form-label">Company</label>
          <input type="text" class="form-input dyn-field" data-section="experience" data-index="${i}" data-field="company" value="${escAttr(exp.company)}" placeholder="TechVentures Labs"/>
        </div>
        <div class="form-group">
          <label class="form-label">Start Date</label>
          <input type="text" class="form-input dyn-field" data-section="experience" data-index="${i}" data-field="startDate" value="${escAttr(exp.startDate)}" placeholder="Jun 2025"/>
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="text" class="form-input dyn-field" data-section="experience" data-index="${i}" data-field="endDate" value="${escAttr(exp.endDate)}" placeholder="Present"/>
        </div>
        <div class="form-group" style="grid-column:1/-1;">
          <label class="form-label">Location</label>
          <input type="text" class="form-input dyn-field" data-section="experience" data-index="${i}" data-field="location" value="${escAttr(exp.location)}" placeholder="San Francisco, CA"/>
        </div>
      </div>
      <div class="form-group" style="margin-top:0.5rem;">
        <label class="form-label">Description / Bullet Points</label>
        <textarea class="form-textarea dyn-field" data-section="experience" data-index="${i}" data-field="description" rows="3" placeholder="Key responsibilities and achievements with metrics...">${escHtml(exp.description)}</textarea>
      </div>
    </div>
  `;
  }).join('');

  attachDynamicHandlers(container, 'experience');
}

/* ---------- Projects ---------- */
function renderProjectsList() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  if (!currentResume.projects.length) {
    container.innerHTML = '<p class="acc-field-hint" style="margin-bottom:0.5rem;">No projects added yet.</p>';
    return;
  }

  container.innerHTML = currentResume.projects.map((proj, i) => `
    <div class="dynamic-entry" data-section="projects" data-index="${i}">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-label">Project ${i + 1}</span>
        <button class="btn-remove-entry" data-section="projects" data-index="${i}" aria-label="Remove project ${i+1}">
          <span class="material-symbols-outlined" style="font-size:14px;">close</span>
        </button>
      </div>
      <div class="dynamic-entry-grid-2">
        <div class="form-group">
          <label class="form-label">Project Name</label>
          <input type="text" class="form-input dyn-field" data-section="projects" data-index="${i}" data-field="name" value="${escAttr(proj.name)}" placeholder="DevPilot-AI Workspace"/>
        </div>
        <div class="form-group">
          <label class="form-label">Technologies</label>
          <input type="text" class="form-input dyn-field" data-section="projects" data-index="${i}" data-field="tech" value="${escAttr(proj.tech)}" placeholder="React, Node.js, MongoDB"/>
        </div>
        <div class="form-group">
          <label class="form-label">GitHub URL</label>
          <input type="text" class="form-input dyn-field" data-section="projects" data-index="${i}" data-field="github" value="${escAttr(proj.github)}" placeholder="github.com/user/repo"/>
        </div>
        <div class="form-group">
          <label class="form-label">Live Demo URL</label>
          <input type="text" class="form-input dyn-field" data-section="projects" data-index="${i}" data-field="demo" value="${escAttr(proj.demo)}" placeholder="myproject.vercel.app"/>
        </div>
      </div>
      <div class="form-group" style="margin-top:0.5rem;">
        <label class="form-label">Description</label>
        <textarea class="form-textarea dyn-field" data-section="projects" data-index="${i}" data-field="description" rows="2" placeholder="What problem it solved, key highlights...">${escHtml(proj.description)}</textarea>
      </div>
    </div>
  `).join('');

  attachDynamicHandlers(container, 'projects');
}

/* ---------- Education ---------- */
function renderEducationList() {
  const container = document.getElementById('education-list');
  if (!container) return;

  if (!currentResume.education.length) {
    container.innerHTML = '<p class="acc-field-hint" style="margin-bottom:0.5rem;">No education added yet.</p>';
    return;
  }

  container.innerHTML = currentResume.education.map((edu, i) => `
    <div class="dynamic-entry" data-section="education" data-index="${i}">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-label">Education ${i + 1}</span>
        <button class="btn-remove-entry" data-section="education" data-index="${i}" aria-label="Remove education ${i+1}">
          <span class="material-symbols-outlined" style="font-size:14px;">close</span>
        </button>
      </div>
      <div class="form-group">
        <label class="form-label">Degree &amp; Major</label>
        <input type="text" class="form-input dyn-field" data-section="education" data-index="${i}" data-field="degree" value="${escAttr(edu.degree)}" placeholder="B.S. in Computer Science"/>
      </div>
      <div class="dynamic-entry-grid-2">
        <div class="form-group">
          <label class="form-label">Institution</label>
          <input type="text" class="form-input dyn-field" data-section="education" data-index="${i}" data-field="institution" value="${escAttr(edu.institution)}" placeholder="State University of Technology"/>
        </div>
        <div class="form-group">
          <label class="form-label">GPA / Percentage</label>
          <input type="text" class="form-input dyn-field" data-section="education" data-index="${i}" data-field="gpa" value="${escAttr(edu.gpa)}" placeholder="3.9 / 4.0 GPA"/>
        </div>
        <div class="form-group">
          <label class="form-label">Start Year</label>
          <input type="text" class="form-input dyn-field" data-section="education" data-index="${i}" data-field="startDate" value="${escAttr(edu.startDate)}" placeholder="2022"/>
        </div>
        <div class="form-group">
          <label class="form-label">End Year</label>
          <input type="text" class="form-input dyn-field" data-section="education" data-index="${i}" data-field="endDate" value="${escAttr(edu.endDate)}" placeholder="2026"/>
        </div>
      </div>
    </div>
  `).join('');

  attachDynamicHandlers(container, 'education');
}

/* ---------- Achievements ---------- */
function renderAchievementsList() {
  const container = document.getElementById('achievements-list');
  if (!container) return;

  if (!currentResume.achievements.length) {
    container.innerHTML = '<p class="acc-field-hint" style="margin-bottom:0.5rem;">No achievements added yet.</p>';
    return;
  }

  container.innerHTML = currentResume.achievements.map((ach, i) => `
    <div class="dynamic-entry" data-section="achievements" data-index="${i}">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-label">Achievement ${i + 1}</span>
        <button class="btn-remove-entry" data-section="achievements" data-index="${i}" aria-label="Remove achievement ${i+1}">
          <span class="material-symbols-outlined" style="font-size:14px;">close</span>
        </button>
      </div>
      <div class="dynamic-entry-grid-2">
        <div class="form-group">
          <label class="form-label">Title</label>
          <input type="text" class="form-input dyn-field" data-section="achievements" data-index="${i}" data-field="title" value="${escAttr(ach.title)}" placeholder="Hackathon Winner"/>
        </div>
        <div class="form-group">
          <label class="form-label">Organization</label>
          <input type="text" class="form-input dyn-field" data-section="achievements" data-index="${i}" data-field="org" value="${escAttr(ach.org)}" placeholder="MLH Global Hack Week"/>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="text" class="form-input dyn-field" data-section="achievements" data-index="${i}" data-field="date" value="${escAttr(ach.date)}" placeholder="March 2025"/>
        </div>
      </div>
      <div class="form-group" style="margin-top:0.25rem;">
        <label class="form-label">Description</label>
        <textarea class="form-textarea dyn-field" data-section="achievements" data-index="${i}" data-field="description" rows="2" placeholder="Brief description...">${escHtml(ach.description)}</textarea>
      </div>
    </div>
  `).join('');

  attachDynamicHandlers(container, 'achievements');
}

/* ---------- Certifications ---------- */
function renderCertificationsList() {
  const container = document.getElementById('certifications-list');
  if (!container) return;

  if (!currentResume.certifications.length) {
    container.innerHTML = '<p class="acc-field-hint" style="margin-bottom:0.5rem;">No certifications added yet.</p>';
    return;
  }

  container.innerHTML = currentResume.certifications.map((cert, i) => `
    <div class="dynamic-entry" data-section="certifications" data-index="${i}">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-label">Certification ${i + 1}</span>
        <button class="btn-remove-entry" data-section="certifications" data-index="${i}" aria-label="Remove certification ${i+1}">
          <span class="material-symbols-outlined" style="font-size:14px;">close</span>
        </button>
      </div>
      <div class="dynamic-entry-grid-2">
        <div class="form-group">
          <label class="form-label">Certification Name</label>
          <input type="text" class="form-input dyn-field" data-section="certifications" data-index="${i}" data-field="name" value="${escAttr(cert.name)}" placeholder="AWS Solutions Architect"/>
        </div>
        <div class="form-group">
          <label class="form-label">Issuer</label>
          <input type="text" class="form-input dyn-field" data-section="certifications" data-index="${i}" data-field="issuer" value="${escAttr(cert.issuer)}" placeholder="Amazon Web Services"/>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="text" class="form-input dyn-field" data-section="certifications" data-index="${i}" data-field="date" value="${escAttr(cert.date)}" placeholder="Jan 2025"/>
        </div>
        <div class="form-group">
          <label class="form-label">Credential ID / Link</label>
          <input type="text" class="form-input dyn-field" data-section="certifications" data-index="${i}" data-field="credentialId" value="${escAttr(cert.credentialId)}" placeholder="verify.credly.com/..."/>
        </div>
      </div>
    </div>
  `).join('');

  attachDynamicHandlers(container, 'certifications');
}

/* ---------- Dynamic Event Attachment ---------- */
function attachDynamicHandlers(container, section) {
  // Remove buttons
  container.querySelectorAll(`.btn-remove-entry[data-section="${section}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      pushUndo();
      currentResume[section].splice(idx, 1);
      rerenderSection(section);
      updateLivePreview();
      updateAtsScore();
      updateHubStats();
    });
  });

  // Live input sync
  container.querySelectorAll(`.dyn-field[data-section="${section}"]`).forEach(input => {
    input.addEventListener('input', () => {
      const idx   = parseInt(input.dataset.index, 10);
      const field = input.dataset.field;
      if (!currentResume[section][idx]) return;
      currentResume[section][idx][field] = input.value;
      updateLivePreview();
      updateAtsScore();
      updateHubStats();
    });
  });
}

function addEntry(section) {
  pushUndo();
  const defaults = {
    experience:    { role: '', company: '', location: '', startDate: '', endDate: '', description: '' },
    projects:      { name: '', tech: '', description: '', github: '', demo: '' },
    education:     { degree: '', institution: '', startDate: '', endDate: '', gpa: '' },
    achievements:  { title: '', org: '', date: '', description: '' },
    certifications:{ name: '', issuer: '', date: '', credentialId: '' }
  };
  currentResume[section].push({ ...(defaults[section] || {}) });
  rerenderSection(section);
  updateLivePreview();
  updateHubStats();
}

function rerenderSection(section) {
  const fnMap = {
    experience:    renderExperienceList,
    projects:      renderProjectsList,
    education:     renderEducationList,
    achievements:  renderAchievementsList,
    certifications:renderCertificationsList
  };
  if (fnMap[section]) fnMap[section]();
}

/* ============================================================
   SHARED ATS-COMPLIANT RENDER HELPERS (APPLIED GLOBALLY)
   ============================================================ */

function cleanDate(d) {
  if (!d) return '';
  return String(d).replace(/[\u2013\u2014]/g, '-').trim();
}

function formatDateRange(start, end) {
  const s = cleanDate(start);
  const e = cleanDate(end);
  if (!s && !e) return '';
  if (!e) return s;
  return `${s} - ${e}`;
}

function renderContactsPlain(p) {
  const primary = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.github, p.linkedin, p.portfolio].filter(Boolean);

  const renderRow = items => {
    if (!items.length) return '';
    const itemsHtml = items.map(c => `<span class="cv-contact-item">${escHtml(c)}</span>`).join('');
    return `<div class="cv-contact-row">${itemsHtml}</div>`;
  };

  if (!primary.length && !links.length) return '';
  return `${renderRow(primary)}${renderRow(links)}`;
}

function renderBulletPoints(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 1) {
    return `<ul class="cv-bullet-list">${lines.map(l => `<li>${escHtml(l.replace(/^[•\-\*]\s*/, ''))}</li>`).join('')}</ul>`;
  }
  return `<div class="cv-exp-desc">${escHtml(text)}</div>`;
}

function renderSummary(summary) {
  if (!summary || !summary.trim()) return '';
  return `<p class="cv-summary-text">${escHtml(summary.trim())}</p>`;
}

function renderSkillLines(sk) {
  const categories = [
    { key: 'Languages', val: sk.languages },
    { key: 'Frontend', val: sk.frontend },
    { key: 'Backend', val: sk.backend },
    { key: 'Databases', val: sk.databases },
    { key: 'Tools & Cloud', val: sk.tools }
  ].filter(c => c.val);

  if (!categories.length) return '';

  return categories.map(c => `
    <div class="cv-skill-line"><span class="cv-skill-key">${c.key}:</span> <span class="cv-skill-val">${escHtml(c.val)}</span></div>
  `).join('');
}

function renderExperience(exp, reverseOrder = false) {
  const list = reverseOrder ? [...exp].reverse() : exp;
  return list.filter(e => e.role || e.company).map(e => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <span class="cv-exp-role">${escHtml(e.role)}<span class="cv-exp-company"> @ ${escHtml(e.company)}</span></span>
        <span class="cv-exp-meta cv-date-badge">${formatDateRange(e.startDate, e.endDate)}${e.location ? ' | ' + escHtml(e.location) : ''}</span>
      </div>
      ${renderBulletPoints(e.description)}
    </div>
  `).join('');
}

function renderProjects(prj) {
  return prj.filter(pr => pr.name).map(pr => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <span class="cv-proj-title">${escHtml(pr.name)}</span>
        <span class="cv-proj-tech">${escHtml(pr.tech)}</span>
      </div>
      ${renderBulletPoints(pr.description)}
      ${(pr.github || pr.demo) ? `<div class="cv-proj-tech" style="margin-top:0.2em;">${pr.github ? 'GitHub: ' + escHtml(pr.github) : ''}${pr.demo ? (pr.github ? ' | ' : '') + 'Demo: ' + escHtml(pr.demo) : ''}</div>` : ''}
    </div>
  `).join('');
}

function renderEducation(edu) {
  return edu.filter(e => e.degree || e.institution).map(e => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <div>
          <div class="cv-edu-degree">${escHtml(e.degree)}</div>
          <div class="cv-edu-school">${escHtml(e.institution)}</div>
        </div>
        <div style="text-align:right;">
          <div class="cv-exp-meta cv-date-badge">${formatDateRange(e.startDate, e.endDate)}</div>
          ${e.gpa ? `<div class="cv-exp-meta" style="font-weight:600;">${escHtml(e.gpa)}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderAchievements(ach) {
  return ach.filter(a => a.title).map(a => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <span class="cv-exp-role">${escHtml(a.title)}</span>
        <span class="cv-exp-meta">${cleanDate(a.date)}</span>
      </div>
      ${a.org ? `<div class="cv-exp-meta">${escHtml(a.org)}</div>` : ''}
      ${a.description ? `<div class="cv-exp-desc">${escHtml(a.description)}</div>` : ''}
    </div>
  `).join('');
}

function renderCertifications(crt) {
  return crt.filter(c => c.name).map(c => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <span class="cv-exp-role">${escHtml(c.name)}</span>
        <span class="cv-exp-meta">${cleanDate(c.date)}</span>
      </div>
      <div class="cv-exp-meta">${escHtml(c.issuer)}${c.credentialId ? ' | ' + escHtml(c.credentialId) : ''}</div>
    </div>
  `).join('');
}

/* ============================================================
   9 DEDICATED TEMPLATE HTML GENERATORS (ALL SINGLE-COLUMN ATS-SAFE)
   ============================================================ */

/* 1. Classic ATS */
function renderClassicATS(resume) {
  const p = resume.personal;
  return `
    <div style="text-align:center;margin-bottom:0.5em;">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title">PROFESSIONAL SUMMARY</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">PROFESSIONAL EXPERIENCE</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">FEATURED PROJECTS</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title">EDUCATION</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">TECHNICAL SKILLS</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">CERTIFICATIONS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">HONORS & ACHIEVEMENTS</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}
  `;
}

/* 2. Modern ATS */
function renderModernATS(resume) {
  const p = resume.personal;
  return `
    <div style="margin-bottom:0.4em;">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title">Professional Summary</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">Work Experience</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">Key Projects</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">Technical Skills</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title">Education</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">Achievements</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">Certifications</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}
  `;
}

/* 3. Reverse Chronological */
function renderReverseChronological(resume) {
  const p = resume.personal;
  return `
    <div style="margin-bottom:0.5em;border-bottom:2px solid #0f172a;padding-bottom:0.4em;">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts" style="border:none;padding-bottom:0;">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title">PROFESSIONAL SUMMARY</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">PROFESSIONAL EXPERIENCE</div>
      ${renderExperience(resume.experience, false)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title">EDUCATION</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">TECHNICAL EXPERTISE</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">FEATURED PROJECTS</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">CERTIFICATIONS & CREDENTIALS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">SELECTED ACHIEVEMENTS</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}
  `;
}

/* 4. Minimal Professional */
function renderMinimalProfessional(resume) {
  const p = resume.personal;
  return `
    <div style="margin-bottom:0.8em;text-align:left;">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title">Summary</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">Experience</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">Projects</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title">Education</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">Skills &amp; Competencies</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">Certifications</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}
  `;
}

/* 5. Modern Developer (Sequential Single-Column Flow with Modern Styling) */
function renderModernDeveloper(resume) {
  const p = resume.personal;
  return `
    <div style="margin-bottom:0.5em;">
      <h1 class="cv-name" style="font-size:1.7em;color:#0f172a;">${escHtml(p.name)}</h1>
      <div class="cv-title" style="color:#4F46E5;font-weight:700;font-size:0.98em;">${escHtml(p.title)}</div>
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">PROFESSIONAL SUMMARY</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">TECHNICAL SKILLS</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">WORK EXPERIENCE</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">FEATURED PROJECTS</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">EDUCATION</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">CERTIFICATIONS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title" style="color:#4F46E5;border-bottom:1.5px solid #e0e7ff;padding-bottom:0.2em;">ACHIEVEMENTS</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}
  `;
}

/* 6. Executive Professional (Sequential Single-Column Flow with Executive Styling) */
function renderExecutiveProfessional(resume) {
  const p = resume.personal;
  return `
    <div class="cv-header-exec">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts" style="justify-content:center;">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title">EXECUTIVE SUMMARY</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">CORE COMPETENCIES &amp; TECHNICAL DOMAIN</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">PROFESSIONAL EXPERIENCE &amp; LEADERSHIP</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">SELECTED ACHIEVEMENTS &amp; IMPACT</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">KEY PROJECTS &amp; INITIATIVES</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title">EDUCATION &amp; CREDENTIALS</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">CERTIFICATIONS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}
  `;
}

/* 7. Academic CV */
function renderAcademicCV(resume) {
  const p = resume.personal;
  return `
    <div class="cv-header-academic">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.education.length ? `
      <div class="cv-section-title">EDUCATION</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${resume.summary ? `
      <div class="cv-section-title">RESEARCH OVERVIEW &amp; BACKGROUND</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">RESEARCH &amp; TECHNICAL PROJECTS</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">TEACHING &amp; PROFESSIONAL EXPERIENCE</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">TECHNICAL &amp; RESEARCH SKILLS</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">HONORS, AWARDS &amp; FELLOWSHIPS</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">CERTIFICATIONS &amp; ACCREDITATIONS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}
  `;
}

/* 8. Entry-Level / Student */
function renderStudentEntry(resume) {
  const p = resume.personal;
  return `
    <div style="margin-bottom:0.4em;">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      <div class="cv-title" style="color:#059669;font-size:0.95em;font-weight:600;">${escHtml(p.title || 'Computer Science Student')}</div>
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.education.length ? `
      <div class="cv-section-title">EDUCATION</div>
      <div class="cv-edu-highlight">
        ${renderEducation(resume.education)}
      </div>
    ` : ''}

    ${resume.summary ? `
      <div class="cv-section-title">CAREER OBJECTIVE &amp; SUMMARY</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">TECHNICAL SKILLS</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">FEATURED PROJECTS</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">WORK &amp; INTERNSHIP EXPERIENCE</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">ACHIEVEMENTS &amp; ACTIVITIES</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">CERTIFICATIONS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}
  `;
}

/* 9. Custom */
function renderCustom(resume) {
  const p = resume.personal;
  return `
    <div style="margin-bottom:0.4em;">
      <h1 class="cv-name">${escHtml(p.name)}</h1>
      ${p.title ? `<div class="cv-title">${escHtml(p.title)}</div>` : ''}
      <div class="cv-contacts">${renderContactsPlain(p)}</div>
    </div>

    ${resume.summary ? `
      <div class="cv-section-title">PROFESSIONAL SUMMARY</div>
      ${renderSummary(resume.summary)}
    ` : ''}

    ${(resume.skills.languages || resume.skills.tools) ? `
      <div class="cv-section-title">TECHNICAL SKILLS</div>
      ${renderSkillLines(resume.skills)}
    ` : ''}

    ${resume.experience.length ? `
      <div class="cv-section-title">WORK EXPERIENCE</div>
      ${renderExperience(resume.experience)}
    ` : ''}

    ${resume.projects.length ? `
      <div class="cv-section-title">FEATURED PROJECTS</div>
      ${renderProjects(resume.projects)}
    ` : ''}

    ${resume.education.length ? `
      <div class="cv-section-title">EDUCATION</div>
      ${renderEducation(resume.education)}
    ` : ''}

    ${resume.achievements.length ? `
      <div class="cv-section-title">ACHIEVEMENTS</div>
      ${renderAchievements(resume.achievements)}
    ` : ''}

    ${resume.certifications.length ? `
      <div class="cv-section-title">CERTIFICATIONS</div>
      ${renderCertifications(resume.certifications)}
    ` : ''}
  `;
}

/* ============================================================
   LIVE RESUME PREVIEW DISPATCHER
   ============================================================ */
function updateLivePreview() {
  const paper = document.getElementById('printable-resume-paper');
  if (!paper) return;

  const tplId = activeTemplate;
  const currentTpl = TEMPLATES[tplId] || TEMPLATES[0];

  paper.className = `a4-paper tpl-${currentTpl.id} tpl-${currentTpl.key}`;

  const renderers = [
    renderClassicATS,          // 0
    renderModernATS,           // 1
    renderReverseChronological,// 2
    renderMinimalProfessional, // 3
    renderModernDeveloper,     // 4 (Modern Developer single-column sequential!)
    renderExecutiveProfessional,// 5 (Executive Professional single-column sequential!)
    renderAcademicCV,          // 6
    renderStudentEntry,        // 7
    renderCustom               // 8
  ];

  const renderer = renderers[tplId] || renderClassicATS;
  paper.innerHTML = renderer(currentResume);
}

/* ============================================================
   BUILDER ATS SCORING ENGINE (ATS Score Lock: 90+)
   Evaluates ONLY Structure, Formatting & Completeness.
   Score-neutral on specific job titles/skills/equipment.
   ============================================================ */
function computeBuilderAtsScore(resume) {
  const p   = resume.personal || {};
  const sk  = resume.skills || {};
  const exp = resume.experience || [];
  const prj = resume.projects || [];
  const edu = resume.education || [];

  let score = 0;
  const checks = [];
  const nudges = [];

  // 1. Structure & parseability (25 pts)
  // Single logical DOM text flow, standard ATS headers, selectable text
  const structurePts = 25;
  score += structurePts;
  checks.push({ label: 'Single logical text flow & standard ATS headers', pass: true, pts: structurePts });

  // 2. Contact completeness (10 pts)
  let contactPts = 0;
  if (p.name && p.email) contactPts += 6;
  if (p.phone || p.location) contactPts += 4;
  score += contactPts;
  checks.push({ label: 'Contact details present & complete', pass: contactPts === 10, pts: contactPts });
  if (contactPts < 10) nudges.push('Complete your contact details (Email, Phone/Location)');

  // 3. Experience section formatting (20 pts)
  let expPts = 0;
  if (exp.length > 0) {
    expPts += 10;
    const hasDates = exp.every(e => e.startDate);
    if (hasDates) expPts += 5;
    
    // Check action verbs
    const allBullets = exp.flatMap(e => (e.description || '').split('\n').filter(Boolean));
    const actionVerbRegex = /^(built|developed|implemented|designed|architected|automated|optimized|reduced|improved|led|integrated|created|deployed|analyzed|managed|spearheaded|engineered|orchestrated|established|maintained|installed|repaired|configured|executed|coordinated|authored|resolved|streamlined|delivered|scaled|trained|mentored|programmed|tested|debugged|refactored)\b/i;
    const verbStarts = allBullets.filter(b => actionVerbRegex.test(b.trim()));
    const verbRatio = allBullets.length > 0 ? (verbStarts.length / allBullets.length) : 1;
    if (verbRatio >= 0.5 || allBullets.length === 0) expPts += 5;
    else nudges.push('Start experience bullets with action verbs (e.g. Built, Led, Optimized)');
  } else if (edu.length > 0 || prj.length > 0) {
    // For students/entry-level without formal experience, projects/education satisfy structure
    expPts = 18;
  }
  score += expPts;
  checks.push({ label: 'Experience formatting & action verbs', pass: expPts >= 18, pts: expPts });

  // 4. Quantification ratio ≥ 60% (15 pts)
  const allExpAndProjBullets = [
    ...exp.flatMap(e => (e.description || '').split('\n').filter(Boolean)),
    ...prj.flatMap(pr => (pr.description || '').split('\n').filter(Boolean))
  ];
  const metricRegex = /\d+%|\d+\+|\d+k|\$\d+|\d+\s*(users|clients|hours|days|weeks|months|years|members|teams|projects|systems|customers|students|lines|services|rps|ms|mb|gb|tb)/i;
  const quantifiedBullets = allExpAndProjBullets.filter(b => metricRegex.test(b));
  const quantRatio = allExpAndProjBullets.length > 0 ? (quantifiedBullets.length / allExpAndProjBullets.length) : 1;
  
  let quantPts = 0;
  if (quantRatio >= 0.6) {
    quantPts = 15;
  } else if (quantRatio >= 0.3) {
    quantPts = 12;
    nudges.push('Add measurable numbers or % metrics to 1–2 more bullets');
  } else {
    quantPts = 8;
    nudges.push('Quantify achievements with real numbers (e.g. "Reduced load by 35%")');
  }
  score += quantPts;
  checks.push({ label: 'Quantified impact metrics (≥60% of bullets)', pass: quantPts === 15, pts: quantPts });

  // 5. Skills & Equipment section (15 pts) — SCORE-NEUTRAL BY DESIGN
  // Any tools/equipment/skills entered are fully credited
  const hasSkills = !!(sk.languages || sk.frontend || sk.backend || sk.databases || sk.tools);
  const skillsPts = hasSkills ? 15 : 0;
  score += skillsPts;
  checks.push({ label: 'Skills & Tools section filled (Plain text)', pass: hasSkills, pts: skillsPts });
  if (!hasSkills) nudges.push('Add your technical skills, tools, or equipment');

  // 6. Education section (10 pts)
  const hasEdu = edu.length > 0 && edu.some(e => e.degree || e.institution);
  const eduPts = hasEdu ? 10 : 0;
  score += eduPts;
  checks.push({ label: 'Education history formatted', pass: hasEdu, pts: eduPts });
  if (!hasEdu) nudges.push('Add your Education history (Degree & Institution)');

  // 7. Selectable-text PDF export (5 pts)
  const pdfPts = 5;
  score += pdfPts;
  checks.push({ label: 'Selectable-text PDF export compliance', pass: true, pts: pdfPts });

  score = Math.min(Math.max(score, 0), 100);

  return {
    score,
    structurePts,
    contactPts,
    expPts,
    quantPts,
    skillsPts,
    eduPts,
    pdfPts,
    checks,
    nudges
  };
}

/* ============================================================
   ATS SCORE & LABEL
   ============================================================ */
function updateAtsScore() {
  const { score } = computeBuilderAtsScore(currentResume);

  const badge = document.getElementById('ats-badge');
  const scoreDisplay = document.getElementById('ats-score-display');

  const currentTpl = TEMPLATES[activeTemplate] || TEMPLATES[0];

  if (badge && scoreDisplay) {
    scoreDisplay.textContent = `${score}% · ${currentTpl.atsLabel}`;
    badge.classList.remove('ats-low', 'ats-mid');
    if (score < 70)       badge.classList.add('ats-low');
    else if (score < 90)  badge.classList.add('ats-mid');
  }

  return score;
}

/* ============================================================
   HUB STATS
   ============================================================ */
function updateHubStats() {
  const p  = currentResume.personal;
  const sk = currentResume.skills;

  let filled = 0;
  if (p.name && p.email)        filled++;   // Personal
  if (currentResume.summary)    filled++;   // Summary
  if (sk.languages || sk.tools) filled++;   // Skills
  if (currentResume.experience.length) filled++;
  if (currentResume.projects.length)   filled++;
  if (currentResume.education.length)  filled++;
  if (currentResume.achievements.length) filled++;
  if (currentResume.certifications.length) filled++;

  const sectionsEl = document.getElementById('hub-stat-sections');
  if (sectionsEl) sectionsEl.textContent = `${filled} / 8`;

  const atsEl = document.getElementById('hub-stat-ats');
  if (atsEl) atsEl.textContent = `${updateAtsScore()}%`;
}

function updateHubStatTemplate() {
  const el = document.getElementById('hub-stat-template');
  if (el) el.textContent = TEMPLATES[activeTemplate]?.name || 'Classic ATS';
}

/* ============================================================
   SAVE DRAFT & EXPORT (WITH ATS SANITIZATION)
   ============================================================ */
function sanitizeResumeForATS(res) {
  if (!res) return;
  if (res.experience) {
    res.experience.forEach(e => {
      e.startDate = cleanDate(e.startDate);
      e.endDate = cleanDate(e.endDate);
      e.role = (e.role || '').trim();
      e.company = (e.company || '').trim();
    });
  }
  if (res.education) {
    res.education.forEach(e => {
      e.startDate = cleanDate(e.startDate);
      e.endDate = cleanDate(e.endDate);
      e.degree = (e.degree || '').trim();
      e.institution = (e.institution || '').trim();
    });
  }
  if (res.certifications) {
    res.certifications.forEach(c => {
      c.date = cleanDate(c.date);
      c.name = (c.name || '').trim();
    });
  }
  if (res.achievements) {
    res.achievements.forEach(a => {
      a.date = cleanDate(a.date);
      a.title = (a.title || '').trim();
    });
  }
}

function saveDraft() {
  syncStateFromForm();
  sanitizeResumeForATS(currentResume);
  Storage.set('resume_data', currentResume);
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const savedEl = document.getElementById('hub-stat-saved');
  if (savedEl) savedEl.textContent = now;
  showToast('Resume draft saved & ATS-sanitized!', 'success');
}

function exportPDF() {
  syncStateFromForm();
  sanitizeResumeForATS(currentResume);
  updateLivePreview();
  updateAtsScore();
  const prevView = currentView;
  if (prevView !== 'builder') switchView('builder');
  setTimeout(() => {
    window.print();
    if (prevView !== 'builder') setTimeout(() => switchView(prevView), 500);
  }, 150);
}

/* ============================================================
   AI SUMMARY ASSIST (DYNAMIC & PERSONALIZED TO LIVE DATA)
   ============================================================ */
function aiImproveSummary() {
  syncStateFromForm();
  const summaryEl = document.getElementById('res-summary');
  if (!summaryEl) return;

  const p   = currentResume.personal || {};
  const sk  = currentResume.skills || {};
  const exp = currentResume.experience || [];
  const prj = currentResume.projects || [];
  const edu = currentResume.education || [];
  const cert = currentResume.certifications || [];

  const title = (p.title || 'Software Professional').trim();
  
  // Extract all user-entered skills cleanly (preserving exact technologies entered)
  const allSkillItems = [
    sk.languages,
    sk.frontend,
    sk.backend,
    sk.databases,
    sk.tools
  ].filter(Boolean)
   .flatMap(s => s.split(',').map(item => item.trim()).filter(Boolean));

  // Determine seniority / career stage based on actual user data
  const hasInternOrStudent = exp.some(e => /intern|fellow|apprentice|student|trainee/i.test(e.role || '')) ||
                             (edu.length > 0 && exp.length <= 1);
  const hasSeniorOrLead = exp.some(e => /senior|lead|principal|architect|director|staff|manager/i.test(e.role || ''));

  // Highlight top 3-4 core technologies from user's actual skills or projects
  let primaryTech = allSkillItems.slice(0, 4).join(', ');
  if (!primaryTech && prj.length && prj[0].tech) {
    primaryTech = prj[0].tech;
  }

  // Sentence 1: Personalized Profile & Domain
  let s1 = '';
  if (hasSeniorOrLead) {
    s1 = `Accomplished ${title} with a proven track record of designing, scaling, and delivering mission-critical systems${primaryTech ? ` using ${primaryTech}` : ''}.`;
  } else if (hasInternOrStudent) {
    const deg = edu.length && edu[0].degree ? ` with an academic foundation in ${edu[0].degree.replace(/B\.S\.\s*in\s*|M\.S\.\s*in\s*|Bachelor\s*of\s*Science\s*in\s*/i, '')}` : '';
    s1 = `Enthusiastic and results-driven ${title}${deg}, bringing hands-on proficiency in ${primaryTech || 'modern software engineering'}.`;
  } else {
    s1 = `Results-oriented ${title} with demonstrated expertise in building and delivering high-quality, scalable software solutions${primaryTech ? ` utilizing ${primaryTech}` : ''}.`;
  }

  // Sentence 2: Experience & Project Accomplishments
  let s2 = '';
  if (exp.length > 0) {
    const companies = exp.map(e => e.company).filter(Boolean).slice(0, 2).join(' and ');
    // Look for quantified impact or notable achievements in user's bullets
    const bulletWithMetrics = exp.flatMap(e => (e.description || '').split('\n'))
      .find(b => /\d+%|\d+\+|\d+k|\$\d+/i.test(b));

    if (bulletWithMetrics) {
      const cleanMetric = bulletWithMetrics.replace(/^[•\-\*]\s*/, '').trim();
      s2 = `Demonstrated track record at ${companies || 'top technology teams'}, with notable achievements including ${cleanMetric.charAt(0).toLowerCase() + cleanMetric.slice(1)}.`;
    } else if (companies) {
      s2 = `Experienced in driving technical initiatives across ${companies}, collaborating with cross-functional teams to ship reliable features and maintain clean code architecture.`;
    }
  } else if (prj.length > 0) {
    const pNames = prj.map(pr => pr.name).filter(Boolean).slice(0, 2).join(' and ');
    s2 = `Demonstrated ability to architect and deliver functional systems independently, evidenced by key projects including ${pNames}.`;
  }

  // Sentence 3: Specialized Competencies, Tools & Business Value
  let s3 = '';
  const secondarySkills = allSkillItems.slice(4, 8).join(', ');
  if (secondarySkills) {
    s3 = `Adept in ${secondarySkills}, with a focus on performance optimization, automated CI/CD pipelines, and engineering resilient solutions that drive measurable business impact.`;
  } else if (cert.length > 0 && cert[0].name) {
    s3 = `Certified in ${cert[0].name}, committed to modern engineering standards, robust test coverage, and delivering high-reliability systems.`;
  } else {
    s3 = `Passionate about clean architecture, rapid problem-solving, and building high-performance systems that deliver measurable value.`;
  }

  const improved = [s1, s2, s3].filter(Boolean).join(' ');

  pushUndo();
  summaryEl.value = improved;
  currentResume.summary = improved;
  updateLivePreview();
  updateAtsScore();
  updateHubStats();
  showToast('Summary personalized & improved with AI ✨', 'success');
}

/* ============================================================
   RESUME ANALYZER (Delegated to resumeAnalyzer.js)
   ============================================================ */
function initAnalyzerControls() {
  if (typeof initRealAnalyzerControls === 'function') {
    initRealAnalyzerControls();
  }
}

/* ============================================================
   UTILITIES
   ============================================================ */
function getInputVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setInputVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(text ?? '');
}

function escHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function escAttr(str) {
  return escHtml(str).replace(/"/g, '&quot;');
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function deepMerge(defaults, saved) {
  const result = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (saved && saved[key] !== undefined) {
      if (typeof defaults[key] === 'object' && !Array.isArray(defaults[key]) && defaults[key] !== null) {
        result[key] = deepMerge(defaults[key], saved[key]);
      } else {
        result[key] = saved[key];
      }
    }
  }
  return result;
}
