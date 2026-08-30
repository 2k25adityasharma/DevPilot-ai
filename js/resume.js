/**
 * DevPilot-AI — Resume Workspace Module
 * Handles: Hub, Resume Builder (10 templates, live A4 preview, dynamic sections),
 *          Resume Analyzer (ATS checks, job match, GitHub correlation, AI recs)
 */

/* ============================================================
   DEFAULT STATE
   ============================================================ */
const defaultResumeState = {
  personal: {
    name: 'Aditya Sharma',
    title: 'Full Stack Software Engineer',
    email: 'aditya.sharma@example.dev',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    github: 'github.com/adityasharma-dev',
    linkedin: 'linkedin.com/in/adityasharma',
    portfolio: 'adityasharma.dev'
  },
  summary: 'Passionate Full Stack Developer with 3+ years of experience building modern web applications, high-performance distributed systems, and intuitive developer tools. Adept in modern JavaScript frameworks, C++, and cloud architectures.',
  skills: {
    languages: 'JavaScript (ES6+), TypeScript, C++, Python, HTML5, CSS3',
    frontend: 'React, Next.js, Redux Toolkit, Tailwind CSS',
    backend: 'Node.js, Express, REST APIs, GraphQL',
    databases: 'PostgreSQL, MongoDB, Redis',
    tools: 'Git & GitHub, Docker, AWS, Vite, Jest, CI/CD'
  },
  experience: [
    {
      role: 'Full Stack Developer Intern',
      company: 'TechVentures Labs',
      location: 'San Francisco, CA',
      startDate: 'Jun 2025',
      endDate: 'Present',
      description: 'Architected and implemented responsive SaaS components reducing initial bundle load by 35%.\nIntegrated automated CI/CD deployment pipelines using GitHub Actions.\nBuilt RESTful APIs consumed by 3 downstream services.'
    },
    {
      role: 'Frontend Engineering Fellow',
      company: 'OpenCode Initiative',
      location: 'Remote',
      startDate: 'Jan 2025',
      endDate: 'May 2025',
      description: 'Engineered high-performance data visualization dashboards with Chart.js & Tailwind CSS.\nCollaborated with a team of 8 engineers on code reviews and test coverage.\nIncreased test coverage from 42% to 78% using Jest and React Testing Library.'
    }
  ],
  projects: [
    {
      name: 'DevPilot-AI Developer Workspace',
      tech: 'JavaScript, Tailwind CSS, LocalStorage API',
      description: 'All-in-one developer productivity platform featuring LeetCode habit trackers, live resume builder, AI code assistant, and code snippet vaults.',
      github: 'github.com/adityasharma-dev/devpilot-ai',
      demo: 'devpilot.adityasharma.dev'
    },
    {
      name: 'Distributed DSA Visualizer',
      tech: 'C++, WebAssembly, React, HTML5 Canvas',
      description: 'Interactive visualizer for complex graph traversals and tree balancing algorithms used by 5,000+ computer science students.',
      github: 'github.com/adityasharma-dev/dsa-viz',
      demo: ''
    }
  ],
  education: [
    {
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'State University of Technology',
      startDate: '2022',
      endDate: '2026',
      gpa: '3.9 / 4.0 GPA'
    }
  ],
  achievements: [],
  certifications: []
};

/* ============================================================
   TEMPLATE DEFINITIONS
   ============================================================ */
const TEMPLATES = [
  { id: 0, name: 'DevPilot Classic', category: 'developer', accent: '#4F46E5' },
  { id: 1, name: 'Minimal ATS',      category: 'ats',       accent: '#334155' },
  { id: 2, name: 'Modern Developer', category: 'modern',    accent: '#4F46E5' },
  { id: 3, name: 'Clean Professional', category: 'minimal', accent: '#0f172a' },
  { id: 4, name: 'Google-inspired',  category: 'company',   accent: '#1a73e8' },
  { id: 5, name: 'Amazon-inspired',  category: 'company',   accent: '#e47911' },
  { id: 6, name: 'Microsoft-inspired', category: 'company', accent: '#00188f' },
  { id: 7, name: 'Adobe-inspired',   category: 'company',   accent: '#d40010' },
  { id: 8, name: 'Meta-inspired',    category: 'company',   accent: '#1877f2' },
  { id: 9, name: 'Custom',           category: 'minimal',   accent: '#4F46E5' }
];

/* ============================================================
   STATE
   ============================================================ */
let currentResume   = Storage.get('resume_data', defaultResumeState);
let activeTemplate  = Storage.get('resume_template', 0);
let currentView     = 'hub';    // 'hub' | 'builder' | 'analyzer'
let analyzerData    = null;     // holds analysis results
let undoStack       = [];
let redoStack       = [];
const MAX_UNDO      = 30;

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Merge missing keys from default (guards against old saved data)
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

  // "Use Builder Resume" from analyzer top bar
  const useBuilderTop = document.getElementById('btn-use-builder-resume');
  if (useBuilderTop) useBuilderTop.addEventListener('click', () => runAnalysis(true));
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
    : TEMPLATES.filter(t => t.category === category);

  grid.innerHTML = filtered.map(tpl => `
    <div class="template-card${activeTemplate === tpl.id ? ' selected' : ''}"
         data-tpl-id="${tpl.id}"
         role="button"
         tabindex="0"
         aria-label="Select ${tpl.name} template">
      <div class="template-card-preview">
        ${buildTemplateThumb(tpl)}
      </div>
      <div class="tcard-name">${escHtml(tpl.name)}</div>
      <div class="tcard-category">${capitalize(tpl.category)}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.template-card').forEach(card => {
    const select = () => {
      const id = parseInt(card.dataset.tplId, 10);
      selectTemplate(id);
    };
    card.addEventListener('click', select);
    card.addEventListener('keydown', e => e.key === 'Enter' && select());
  });
}

function buildTemplateThumb(tpl) {
  const c = tpl.accent;
  return `
    <div style="width:100%;height:100%;padding:5px;display:flex;flex-direction:column;gap:3px;">
      <div class="tcard-line tcard-line-title" style="background:${c};opacity:0.8;"></div>
      <div class="tcard-line-sm" style="height:3px;background:${c};opacity:0.5;border-radius:2px;width:45%;"></div>
      <div class="tcard-divider"></div>
      <div class="tcard-line" style="width:60%;background:#cbd5e1;"></div>
      <div class="tcard-line" style="width:80%;background:#e2e8f0;"></div>
      <div class="tcard-line" style="width:55%;background:#e2e8f0;"></div>
      <div class="tcard-divider"></div>
      <div class="tcard-dots">
        <div style="width:18px;height:3px;border-radius:2px;background:${c};opacity:0.6;"></div>
        <div style="width:14px;height:3px;border-radius:2px;background:${c};opacity:0.4;"></div>
        <div style="width:20px;height:3px;border-radius:2px;background:${c};opacity:0.3;"></div>
      </div>
    </div>
  `;
}

function selectTemplate(id) {
  activeTemplate = id;
  Storage.set('resume_template', id);
  updateLivePreview();
  updateHubStatTemplate();
  const label = TEMPLATES[id] ? TEMPLATES[id].name : 'DevPilot Classic';
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
  if (labelEl) labelEl.textContent = TEMPLATES[activeTemplate]?.name || 'DevPilot Classic';
  const badgeEl = document.getElementById('template-badge-preview');
  if (badgeEl) badgeEl.textContent = TEMPLATES[activeTemplate]?.name || 'DevPilot Classic';
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

/* ---------- Experience ---------- */
function renderExperienceList() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  if (!currentResume.experience.length) {
    container.innerHTML = '<p class="acc-field-hint" style="margin-bottom:0.5rem;">No experience added yet.</p>';
    return;
  }

  container.innerHTML = currentResume.experience.map((exp, i) => `
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
  `).join('');

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
   LIVE RESUME PREVIEW (A4 Paper)
   ============================================================ */
function updateLivePreview() {
  const paper = document.getElementById('printable-resume-paper');
  if (!paper) return;

  const tplId = activeTemplate;
  paper.className = `a4-paper tpl-${tplId}`;

  const p   = currentResume.personal;
  const sk  = currentResume.skills;
  const exp = currentResume.experience;
  const prj = currentResume.projects;
  const edu = currentResume.education;
  const ach = currentResume.achievements;
  const crt = currentResume.certifications;

  // Build contact items
  const contacts = [
    p.email    ? `<span class="cv-contact-item">✉ ${escHtml(p.email)}</span>` : '',
    p.phone    ? `<span class="cv-contact-item">📞 ${escHtml(p.phone)}</span>` : '',
    p.location ? `<span class="cv-contact-item">📍 ${escHtml(p.location)}</span>` : '',
    p.github   ? `<span class="cv-contact-item">⌥ ${escHtml(p.github)}</span>` : '',
    p.linkedin ? `<span class="cv-contact-item">in ${escHtml(p.linkedin)}</span>` : '',
    p.portfolio? `<span class="cv-contact-item">🌐 ${escHtml(p.portfolio)}</span>` : ''
  ].filter(Boolean).join('');

  // Skills block
  const skillLines = [
    sk.languages ? `<div class="cv-skill-line"><span class="cv-skill-key">Languages: </span>${pillify(sk.languages)}</div>` : '',
    sk.frontend  ? `<div class="cv-skill-line"><span class="cv-skill-key">Frontend: </span>${pillify(sk.frontend)}</div>` : '',
    sk.backend   ? `<div class="cv-skill-line"><span class="cv-skill-key">Backend: </span>${pillify(sk.backend)}</div>` : '',
    sk.databases ? `<div class="cv-skill-line"><span class="cv-skill-key">Databases: </span>${pillify(sk.databases)}</div>` : '',
    sk.tools     ? `<div class="cv-skill-line"><span class="cv-skill-key">Tools &amp; Cloud: </span>${pillify(sk.tools)}</div>` : ''
  ].filter(Boolean).join('');

  // Experience block
  const expHtml = exp.filter(e => e.role || e.company).map(e => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <span class="cv-exp-role">${escHtml(e.role)}<span class="cv-exp-company" style="font-weight:500;"> @ ${escHtml(e.company)}</span></span>
        <span class="cv-exp-meta">${escHtml(e.startDate)}${e.endDate ? ' – ' + escHtml(e.endDate) : ''}${e.location ? ' · ' + escHtml(e.location) : ''}</span>
      </div>
      ${e.description ? `<div class="cv-exp-desc">${escHtml(e.description)}</div>` : ''}
    </div>
  `).join('');

  // Projects block
  const projHtml = prj.filter(pr => pr.name).map(pr => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <span class="cv-proj-title">${escHtml(pr.name)}</span>
        <span class="cv-proj-tech">${escHtml(pr.tech)}</span>
      </div>
      ${pr.description ? `<div class="cv-proj-desc">${escHtml(pr.description)}</div>` : ''}
      ${(pr.github || pr.demo) ? `<div class="cv-proj-tech" style="margin-top:0.25em;">${pr.github ? '⌥ ' + escHtml(pr.github) : ''}${pr.demo ? '  🌐 ' + escHtml(pr.demo) : ''}</div>` : ''}
    </div>
  `).join('');

  // Education block
  const eduHtml = edu.filter(e => e.degree || e.institution).map(e => `
    <div class="cv-entry">
      <div class="cv-entry-row">
        <div>
          <div class="cv-edu-degree">${escHtml(e.degree)}</div>
          <div class="cv-edu-school">${escHtml(e.institution)}</div>
        </div>
        <div style="text-align:right;">
          <div class="cv-exp-meta">${escHtml(e.startDate)}${e.endDate ? ' – ' + escHtml(e.endDate) : ''}</div>
          ${e.gpa ? `<div class="cv-exp-meta">${escHtml(e.gpa)}</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Achievements block
  const achHtml = ach.filter(a => a.title).length ? `
    ${sectionHeader('Achievements')}
    ${ach.filter(a => a.title).map(a => `
      <div class="cv-entry">
        <div class="cv-entry-row">
          <span class="cv-exp-role">${escHtml(a.title)}</span>
          <span class="cv-exp-meta">${escHtml(a.date)}</span>
        </div>
        ${a.org ? `<div class="cv-exp-meta" style="margin-top:0.15em;">${escHtml(a.org)}</div>` : ''}
        ${a.description ? `<div class="cv-exp-desc">${escHtml(a.description)}</div>` : ''}
      </div>
    `).join('')}
  ` : '';

  // Certifications block
  const crtHtml = crt.filter(c => c.name).length ? `
    ${sectionHeader('Certifications')}
    ${crt.filter(c => c.name).map(c => `
      <div class="cv-entry">
        <div class="cv-entry-row">
          <span class="cv-exp-role">${escHtml(c.name)}</span>
          <span class="cv-exp-meta">${escHtml(c.date)}</span>
        </div>
        <div class="cv-exp-meta">${escHtml(c.issuer)}${c.credentialId ? ' · ' + escHtml(c.credentialId) : ''}</div>
      </div>
    `).join('')}
  ` : '';

  // Special header for template 2 (Modern Developer dark header)
  const isModern = tplId === 2;
  const headerBlock = isModern
    ? `<div class="cv-header-block">
         <div class="cv-name">${escHtml(p.name || 'Your Name')}</div>
         <div class="cv-title">${escHtml(p.title || '')}</div>
         <div class="cv-contacts">${contacts || '<span style="opacity:0.5">Add contact info...</span>'}</div>
       </div>`
    : `<div style="margin-bottom:0.25em;">
         <div class="cv-name">${escHtml(p.name || 'Your Name')}</div>
         <div class="cv-title">${escHtml(p.title || '')}</div>
         <div class="cv-contacts">${contacts || '<span style="color:#94a3b8;">Add contact info...</span>'}</div>
       </div>`;

  paper.innerHTML = `
    ${headerBlock}
    ${currentResume.summary ? `${sectionHeader('Summary')}<p style="font-size:0.8em;color:#475569;line-height:1.6;">${escHtml(currentResume.summary)}</p>` : ''}
    ${skillLines ? `${sectionHeader('Technical Skills')}${skillLines}` : ''}
    ${expHtml ? `${sectionHeader('Experience')}${expHtml}` : ''}
    ${projHtml ? `${sectionHeader('Projects')}${projHtml}` : ''}
    ${eduHtml ? `${sectionHeader('Education')}${eduHtml}` : ''}
    ${achHtml}
    ${crtHtml}
  `;
}

function sectionHeader(label) {
  return `<div class="cv-section-title">${label}<div class="cv-section-divider" style="flex:1;margin-left:0.5em;"></div></div>`;
}

function pillify(str) {
  if (!str) return '';
  return str.split(',').map(s => s.trim()).filter(Boolean)
    .map(s => `<span class="cv-skill-pill">${escHtml(s)}</span>`).join('');
}

/* ============================================================
   ATS SCORE
   ============================================================ */
function updateAtsScore() {
  let score = 0;
  const p  = currentResume.personal;
  const sk = currentResume.skills;

  // Personal fields
  if (p.name)      score += 8;
  if (p.email)     score += 8;
  if (p.phone)     score += 5;
  if (p.location)  score += 5;
  if (p.github)    score += 6;
  if (p.linkedin)  score += 5;
  if (p.portfolio) score += 3;

  // Summary
  if (currentResume.summary && currentResume.summary.length > 50) score += 10;

  // Skills
  if (sk.languages) score += 8;
  if (sk.frontend)  score += 5;
  if (sk.backend)   score += 5;
  if (sk.databases) score += 4;
  if (sk.tools)     score += 5;

  // Experience
  if (currentResume.experience.length > 0) score += 10;
  if (currentResume.experience.length > 1) score += 5;

  // Projects
  if (currentResume.projects.length > 0) score += 7;
  if (currentResume.projects.length > 1) score += 4;

  // Education
  if (currentResume.education.length > 0) score += 8;

  score = Math.min(score, 100);

  const badge = document.getElementById('ats-badge');
  const scoreDisplay = document.getElementById('ats-score-display');

  if (badge && scoreDisplay) {
    scoreDisplay.textContent = `${score}%`;
    badge.classList.remove('ats-low', 'ats-mid');
    if (score < 50)       badge.classList.add('ats-low');
    else if (score < 75)  badge.classList.add('ats-mid');
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
  if (el) el.textContent = TEMPLATES[activeTemplate]?.name || 'Classic';
}

/* ============================================================
   SAVE DRAFT & EXPORT
   ============================================================ */
function saveDraft() {
  syncStateFromForm();
  Storage.set('resume_data', currentResume);
  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const savedEl = document.getElementById('hub-stat-saved');
  if (savedEl) savedEl.textContent = now;
  showToast('Resume draft saved!', 'success');
}

function exportPDF() {
  // Switch to builder view to ensure the paper is visible
  const prevView = currentView;
  if (prevView !== 'builder') switchView('builder');
  setTimeout(() => {
    window.print();
    if (prevView !== 'builder') setTimeout(() => switchView(prevView), 500);
  }, 150);
}

/* ============================================================
   AI SUMMARY ASSIST (Simulated)
   ============================================================ */
function aiImproveSummary() {
  const summaryEl = document.getElementById('res-summary');
  if (!summaryEl) return;

  const current = summaryEl.value.trim();
  const name  = currentResume.personal.name || 'Developer';
  const title = currentResume.personal.title || 'Software Engineer';
  const skills = [
    currentResume.skills.languages,
    currentResume.skills.frontend,
    currentResume.skills.backend
  ].filter(Boolean).join(', ');

  const improved = `Highly motivated ${title} with a strong background in ${skills || 'modern web technologies'}. Proven ability to design and deliver scalable, high-quality software solutions that drive measurable business impact. Experienced in collaborating with cross-functional teams to ship features on time. Passionate about clean code, performance optimization, and developer experience.`;

  pushUndo();
  summaryEl.value = improved;
  currentResume.summary = improved;
  updateLivePreview();
  updateAtsScore();
  showToast('Summary improved with AI ✨', 'success');
}

/* ============================================================
   RESUME ANALYZER
   ============================================================ */
function initAnalyzerControls() {
  // Drag and drop
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('file-upload-input');
  const removeFileBtn = document.getElementById('btn-remove-file');

  if (dropzone) {
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      const file = e.dataTransfer?.files?.[0];
      if (file) handleFileSelected(file);
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) handleFileSelected(fileInput.files[0]);
    });
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', () => {
      if (fileInput) fileInput.value = '';
      document.getElementById('file-preview-strip').style.display = 'none';
      analyzerData = null;
    });
  }

  // Analyze Builder Resume
  const analyzeBuilderBtn = document.getElementById('btn-analyze-builder');
  if (analyzeBuilderBtn) analyzeBuilderBtn.addEventListener('click', () => runAnalysis(true));

  // Run Analysis button (top bar)
  const runBtn = document.getElementById('btn-run-analysis');
  if (runBtn) runBtn.addEventListener('click', () => runAnalysis(analyzerData?.fromBuilder || false));

  // Re-analyze
  const reanalyzeBtn = document.getElementById('btn-reanalyze');
  if (reanalyzeBtn) reanalyzeBtn.addEventListener('click', () => {
    document.getElementById('analyzer-results-state').style.display = 'none';
    document.getElementById('analyzer-upload-state').style.display = 'block';
  });

  // Job Description Matcher
  const matchBtn = document.getElementById('btn-match-jd');
  if (matchBtn) matchBtn.addEventListener('click', runJDMatch);
}

function handleFileSelected(file) {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|docx)$/i)) {
    showToast('Please upload a PDF or DOCX file', 'error');
    return;
  }

  const strip = document.getElementById('file-preview-strip');
  const nameEl = document.getElementById('file-name-display');
  const metaEl = document.getElementById('file-meta-display');

  const size = (file.size / 1024).toFixed(0);
  const sizeStr = size > 1024 ? `${(size/1024).toFixed(1)} MB` : `${size} KB`;
  const type = file.name.endsWith('.pdf') ? 'PDF' : 'DOCX';

  if (nameEl) nameEl.textContent = file.name;
  if (metaEl) metaEl.textContent = `${sizeStr} · ${type}`;
  if (strip)  strip.style.display = 'flex';

  analyzerData = { fileName: file.name, fileSize: sizeStr, fileType: type, fromBuilder: false };
  showToast(`File "${file.name}" loaded. Click Analyze to continue.`, 'info');
}

function runAnalysis(fromBuilder = false) {
  syncStateFromForm();

  const hasData = fromBuilder || analyzerData;
  if (!hasData) {
    showToast('Please upload a resume file or use your Builder resume first.', 'error');
    return;
  }

  const runBtn = document.getElementById('btn-run-analysis');
  if (runBtn) {
    runBtn.disabled = true;
    runBtn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span><span>Analyzing...</span>`;
  }

  // Simulate async analysis
  setTimeout(() => {
    const scores = computeAnalyzerScores(currentResume);
    renderAnalyzerResults(scores, fromBuilder);

    if (runBtn) {
      runBtn.disabled = false;
      runBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">play_arrow</span><span>Analyze</span>`;
    }

    document.getElementById('analyzer-upload-state').style.display = 'none';
    document.getElementById('analyzer-results-state').style.display = 'block';

    // Update analyzed file strip
    const fn = fromBuilder ? 'Resume (Builder)' : analyzerData?.fileName || 'Resume';
    const fmeta = fromBuilder ? 'From Resume Builder · Analyzed just now' : `${analyzerData?.fileSize || ''} · Analyzed just now`;
    setElText('analyzed-file-name', fn);
    setElText('analyzed-file-meta', fmeta);

    showToast('Analysis complete!', 'success');

    // Animate score rings
    setTimeout(() => animateScoreRings(scores), 100);
  }, 1400);
}

function computeAnalyzerScores(resume) {
  const p  = resume.personal;
  const sk = resume.skills;
  const exp = resume.experience;
  const prj = resume.projects;
  const edu = resume.education;

  let ats = 0;
  const atsChecks = [];

  // ATS Rules
  const sections = {
    'Contact information present': !!(p.name && p.email && p.phone),
    'Standard section headings used': true, // Always true for builder
    'Skills section filled': !!(sk.languages || sk.tools),
    'Experience section present': exp.length > 0,
    'Education section present': edu.length > 0,
    'GitHub / portfolio links present': !!(p.github || p.portfolio),
    'Professional summary written': !!(resume.summary && resume.summary.length > 30),
    'Projects section present': prj.length > 0
  };

  Object.entries(sections).forEach(([label, pass]) => {
    atsChecks.push({ label, pass });
    if (pass) ats += Math.floor(100 / Object.keys(sections).length);
  });

  const warnings = [];
  if (!p.github)    warnings.push('Missing GitHub profile link');
  if (!p.portfolio) warnings.push('Consider adding a portfolio URL');
  if (exp.length && !exp[0].description) warnings.push('Add bullet-point descriptions to experience');
  if (resume.summary && resume.summary.length < 60) warnings.push('Professional summary is too short (aim for 2-3 sentences)');

  ats = Math.min(ats, 100);

  // Content score
  let content = 0;
  if (resume.summary && resume.summary.length > 50) content += 20;
  if (prj.length >= 1) content += 20;
  if (prj.length >= 2) content += 10;
  if (exp.length >= 1) content += 25;
  if (sk.languages)    content += 15;
  if (edu.length)      content += 10;
  content = Math.min(content, 100);

  // Readability score
  let readability = 60;
  if (resume.summary && resume.summary.split(' ').length < 80) readability += 15;
  if (!resume.summary || resume.summary.split(' ').length < 40) readability -= 10;
  exp.forEach(e => { if (e.description && e.description.length > 20) readability += 5; });
  readability = Math.min(Math.max(readability, 40), 100);

  // Overall
  const overall = Math.round((ats * 0.35) + (content * 0.35) + (readability * 0.30));

  // Skills extraction
  const allSkills = [sk.languages, sk.frontend, sk.backend, sk.databases, sk.tools]
    .filter(Boolean)
    .join(', ')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Content quality by section
  const contentQuality = [
    { label: 'Summary',    score: resume.summary && resume.summary.length > 60 ? 88 : 50 },
    { label: 'Projects',   score: prj.length >= 2 ? 90 : prj.length === 1 ? 70 : 30 },
    { label: 'Experience', score: exp.length >= 2 ? 85 : exp.length === 1 ? 68 : 25 },
    { label: 'Skills',     score: allSkills.length >= 10 ? 95 : allSkills.length >= 5 ? 80 : 50 },
    { label: 'Education',  score: edu.length ? 90 : 0 }
  ];

  // GitHub correlation
  const githubData = getGitHubCorrelation(allSkills);

  return {
    overall, ats, content, readability,
    atsChecks, warnings, allSkills, contentQuality, githubData
  };
}

function getGitHubCorrelation(skills) {
  // Attempt to read GitHub analyzer data from localStorage
  let ghLanguages = [];
  try {
    const ghData = JSON.parse(localStorage.getItem('devpilot_github_analysis') || 'null');
    if (ghData && ghData.languages) {
      ghLanguages = Object.keys(ghData.languages).map(l => l.toLowerCase());
    }
  } catch (e) { /* no data */ }

  // Fallback demo languages if no GitHub data
  if (!ghLanguages.length) {
    ghLanguages = ['javascript', 'typescript', 'python', 'html', 'css'];
  }

  return skills.slice(0, 8).map(skill => {
    const sl = skill.toLowerCase().replace(/[^a-z]/g, '');
    const found = ghLanguages.some(l => l.includes(sl) || sl.includes(l));
    return { skill, status: found ? 'confirmed' : 'not-in-github' };
  });
}

function renderAnalyzerResults(scores, fromBuilder) {
  // ATS Checks
  const atsList = document.getElementById('ats-checks-list');
  if (atsList) {
    const passItems = scores.atsChecks.filter(c => c.pass).map(c => `
      <div class="ats-check-item ats-pass">
        <span class="material-symbols-outlined ats-check-icon" style='font-variation-settings:"FILL" 1;'>check_circle</span>
        <span>${escHtml(c.label)}</span>
      </div>
    `).join('');

    const warnItems = scores.warnings.map(w => `
      <div class="ats-check-item ats-warn">
        <span class="material-symbols-outlined ats-check-icon" style='font-variation-settings:"FILL" 1;'>warning</span>
        <span>${escHtml(w)}</span>
      </div>
    `).join('');

    const failItems = scores.atsChecks.filter(c => !c.pass).map(c => `
      <div class="ats-check-item ats-fail">
        <span class="material-symbols-outlined ats-check-icon" style='font-variation-settings:"FILL" 1;'>cancel</span>
        <span>${escHtml(c.label)}</span>
      </div>
    `).join('');

    atsList.innerHTML = passItems + warnItems + failItems;
  }

  // Content Quality
  const cqList = document.getElementById('content-quality-list');
  if (cqList) {
    cqList.innerHTML = scores.contentQuality.map(cq => `
      <div class="cq-row">
        <div class="cq-row-header">
          <span class="cq-label">${escHtml(cq.label)}</span>
          <span class="cq-score">${cq.score}%</span>
        </div>
        <div class="cq-bar-bg">
          <div class="cq-bar-fill" style="width:0%" data-target="${cq.score}%"></div>
        </div>
      </div>
    `).join('');

    setTimeout(() => {
      cqList.querySelectorAll('.cq-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.target;
      });
    }, 200);
  }

  // Score display values
  setElText('score-overall-val', scores.overall);
  setElText('score-ats-val', scores.ats);
  setElText('score-content-val', scores.content);
  setElText('score-read-val', scores.readability);

  setElText('score-overall-sub', scoreLabel(scores.overall));
  setElText('score-ats-sub', scoreLabel(scores.ats));
  setElText('score-content-sub', scoreLabel(scores.content));
  setElText('score-read-sub', scoreLabel(scores.readability));

  // Strong skills
  const strongList = document.getElementById('strong-skills-list');
  if (strongList) {
    strongList.innerHTML = scores.allSkills.slice(0, 10).map(s => `
      <span class="skill-pill-found">
        <span class="material-symbols-outlined" style="font-size:11px;">check</span>
        ${escHtml(s)}
      </span>
    `).join('');
  }

  // Recommended skills
  const recList = document.getElementById('recommended-skills-list');
  if (recList) {
    const POPULAR = ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Docker', 'AWS', 'PostgreSQL', 'Redis', 'GraphQL', 'Kubernetes'];
    const existing = scores.allSkills.map(s => s.toLowerCase());
    const recs = POPULAR.filter(s => !existing.some(e => e.includes(s.toLowerCase()))).slice(0, 6);
    recList.innerHTML = recs.map(s => `
      <span class="skill-pill-rec">
        <span class="material-symbols-outlined" style="font-size:11px;">add</span>
        ${escHtml(s)}
      </span>
    `).join('');
  }

  // GitHub Correlation
  const ghList = document.getElementById('github-correlation-list');
  if (ghList) {
    ghList.innerHTML = scores.githubData.map(g => {
      const cls = g.status === 'confirmed' ? 'corr-confirmed' : 'corr-partial';
      const icon = g.status === 'confirmed' ? 'check_circle' : 'help';
      const label = g.status === 'confirmed' ? 'GitHub Evidence' : 'No GitHub Evidence';
      return `
        <div class="github-corr-item">
          <span class="github-corr-skill">${escHtml(g.skill)}</span>
          <span class="github-corr-status ${cls}">
            <span class="material-symbols-outlined" style='font-size:14px;font-variation-settings:"FILL" 1;'>${icon}</span>
            ${label}
          </span>
        </div>
      `;
    }).join('') || '<p class="acc-field-hint">Connect GitHub Analyzer to see correlation data.</p>';
  }

  // AI Recommendations
  renderAIRecs(scores);
}

function renderAIRecs(scores) {
  const list = document.getElementById('ai-recommendations-list');
  if (!list) return;

  const recs = [];
  const p  = currentResume.personal;
  const exp = currentResume.experience;
  const prj = currentResume.projects;

  if (!p.github || !p.portfolio) {
    recs.push({ priority: 'high', title: 'Add GitHub & Portfolio Links', desc: 'Recruiters check these to validate your skills. Missing links reduce your credibility significantly.' });
  }
  if (!currentResume.summary || currentResume.summary.length < 60) {
    recs.push({ priority: 'high', title: 'Write a Strong Professional Summary', desc: 'A compelling 2-3 sentence summary is often the first thing a recruiter reads. Make it count.' });
  }
  if (exp.some(e => !e.description || e.description.length < 40)) {
    recs.push({ priority: 'high', title: 'Add Measurable Impact to Experience', desc: 'Use quantified bullet points (e.g., "Reduced load time by 35%") to stand out from other candidates.' });
  }
  if (prj.length < 2) {
    recs.push({ priority: 'medium', title: 'Add More Projects', desc: 'Aim for 2-3 strong projects with tech stack, description, and links to demonstrate breadth.' });
  }
  const allText = JSON.stringify(currentResume).toLowerCase();
  if (!allText.includes('react') && !allText.includes('typescript')) {
    recs.push({ priority: 'medium', title: 'Add In-Demand Keywords', desc: 'Include keywords like React, TypeScript, REST APIs that appear in most modern job postings.' });
  }
  recs.push({ priority: 'low', title: 'Keep Resume to 1 Page', desc: 'For early-career developers, a single-page resume is preferred by most ATS systems and recruiters.' });

  list.innerHTML = `<div class="ai-rec-list">${recs.slice(0, 5).map(r => `
    <div class="ai-rec-item">
      <div class="ai-rec-priority ${r.priority}">${r.priority === 'high' ? 'H' : r.priority === 'medium' ? 'M' : 'L'}</div>
      <div class="ai-rec-body">
        <div class="ai-rec-title">${escHtml(r.title)}</div>
        <div class="ai-rec-desc">${escHtml(r.desc)}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

function animateScoreRings(scores) {
  const circumference = 2 * Math.PI * 33; // r=33 => ~207.3
  const pairs = [
    { ringId: 'ring-overall', score: scores.overall },
    { ringId: 'ring-ats',     score: scores.ats },
    { ringId: 'ring-content', score: scores.content },
    { ringId: 'ring-read',    score: scores.readability }
  ];
  pairs.forEach(({ ringId, score }) => {
    const ring = document.getElementById(ringId);
    if (ring) {
      const offset = circumference - (score / 100) * circumference;
      ring.style.strokeDasharray  = circumference;
      ring.style.strokeDashoffset = offset;
    }
  });
}

/* ============================================================
   JOB DESCRIPTION MATCH
   ============================================================ */
function runJDMatch() {
  const jdText = document.getElementById('jd-textarea')?.value?.trim();
  if (!jdText || jdText.length < 30) {
    showToast('Please paste a job description (at least a few lines).', 'error');
    return;
  }

  syncStateFromForm();
  const allSkills = [
    currentResume.skills.languages,
    currentResume.skills.frontend,
    currentResume.skills.backend,
    currentResume.skills.databases,
    currentResume.skills.tools
  ].filter(Boolean).join(', ').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  const jdLower = jdText.toLowerCase();
  const matched = allSkills.filter(s => jdLower.includes(s.replace(/[^a-z]/g, '')));
  const missing = allSkills.filter(s => !jdLower.includes(s.replace(/[^a-z]/g, '')));

  // Extract possible keywords from JD
  const jdKeywords = extractKeywords(jdText);
  const recommended = jdKeywords.filter(k => !allSkills.some(s => s.includes(k.toLowerCase())));

  const matchScore = allSkills.length > 0 ? Math.round((matched.length / allSkills.length) * 100) : 0;

  const resultsEl = document.getElementById('jd-match-results');
  if (resultsEl) {
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = `
      <div class="jd-match-bar-wrapper">
        <div class="jd-match-score-row">
          <span class="jd-match-score-label">Job Match Score</span>
          <span class="jd-match-score-val">${matchScore}%</span>
        </div>
        <div class="jd-match-bar-bg">
          <div class="jd-match-bar-fill" style="width:0%" id="jd-bar-fill"></div>
        </div>
      </div>
      <div class="jd-keywords-grid">
        <div>
          <div class="jd-keywords-section">Matched Keywords</div>
          ${matched.length
            ? matched.map(s => `<span class="skill-pill-found" style="margin:2px;display:inline-flex;"><span class="material-symbols-outlined" style="font-size:11px;">check</span>${escHtml(s)}</span>`).join('')
            : '<span class="acc-field-hint">None matched</span>'}
        </div>
        <div>
          <div class="jd-keywords-section">Recommended Keywords</div>
          ${recommended.slice(0, 8).map(s => `<span class="skill-pill-rec" style="margin:2px;display:inline-flex;"><span class="material-symbols-outlined" style="font-size:11px;">add</span>${escHtml(s)}</span>`).join('')
            || '<span class="acc-field-hint">None found</span>'}
        </div>
      </div>
    `;

    setTimeout(() => {
      const bar = document.getElementById('jd-bar-fill');
      if (bar) bar.style.width = `${matchScore}%`;
    }, 100);
  }

  showToast(`Job match score: ${matchScore}%`, matchScore >= 70 ? 'success' : 'info');
}

function extractKeywords(text) {
  const TECH_KEYWORDS = [
    'react', 'vue', 'angular', 'typescript', 'javascript', 'node', 'express',
    'python', 'java', 'c++', 'golang', 'rust', 'sql', 'nosql', 'mongodb',
    'postgresql', 'redis', 'graphql', 'rest', 'api', 'docker', 'kubernetes',
    'aws', 'gcp', 'azure', 'ci/cd', 'git', 'agile', 'scrum', 'linux',
    'microservices', 'machine learning', 'tensorflow', 'pytorch', 'next.js',
    'tailwind', 'figma', 'firebase', 'supabase', 'prisma', 'jest', 'cypress'
  ];
  const lower = text.toLowerCase();
  return TECH_KEYWORDS.filter(k => lower.includes(k));
}

function scoreLabel(n) {
  if (n >= 90) return 'Excellent';
  if (n >= 75) return 'Good';
  if (n >= 55) return 'Needs Work';
  return 'Low';
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
