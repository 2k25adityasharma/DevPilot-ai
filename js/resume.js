/**
 * DevPilot-AI - Developer Resume Builder Module
 */

const defaultResumeState = {
  personal: {
    name: 'Aditya Sharma',
    title: 'Full Stack Software Engineer',
    email: 'aditya.sharma@example.dev',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    github: 'github.com/adityasharma-dev',
    linkedin: 'linkedin.com/in/adityasharma',
    summary: 'Passionate Full Stack Developer with 3+ years of experience building modern web applications, high-performance distributed systems, and intuitive user experiences. Adept in modern JavaScript frameworks, C++, and cloud architectures.'
  },
  skills: {
    languages: 'JavaScript (ES6+), TypeScript, C++, Python, HTML5, CSS3/Tailwind',
    frameworks: 'React, Next.js, Node.js, Express, Redux Toolkit, REST APIs, GraphQL',
    tools: 'Git & GitHub, Docker, AWS, PostgreSQL, MongoDB, Vite, Jest, CI/CD'
  },
  experience: [
    {
      role: 'Full Stack Developer Intern',
      company: 'TechVentures Labs',
      duration: 'Jun 2025 - Present',
      location: 'San Francisco, CA',
      description: 'Architected and implemented responsive SaaS components reducing initial bundle load by 35%. Integrated automated CI/CD deployment pipelines using GitHub Actions.'
    },
    {
      role: 'Frontend Engineering Fellow',
      company: 'OpenCode Initiative',
      duration: 'Jan 2025 - May 2025',
      location: 'Remote',
      description: 'Engineered high-performance data visualization dashboards using Chart.js & Tailwind CSS. Collaborated with a team of 8 engineers on code reviews and test coverage.'
    }
  ],
  projects: [
    {
      title: 'DevPilot-AI Developer Workspace',
      tech: 'JavaScript, Tailwind CSS, LocalStorage API, AI Prompts',
      description: 'All-in-one developer productivity platform featuring LeetCode habit trackers, live resume builder, AI code assistant, and code snippet vaults.'
    },
    {
      title: 'Distributed DSA Problem Visualizer',
      tech: 'C++, WebAssembly, React, HTML5 Canvas',
      description: 'Interactive visualizer for complex graph traversals and tree balancing algorithms used by 5,000+ computer science students.'
    }
  ],
  education: [
    {
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'State University of Technology',
      year: '2022 - 2026',
      gpa: '3.9 / 4.0 GPA'
    }
  ]
};

let currentResume = Storage.get('resume_data', defaultResumeState);

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  populateFormFields();
  updateLivePreview();
  bindFormEvents();
  bindActionButtons();
});

// Accordions toggle logic
function initAccordions() {
  const accordions = document.querySelectorAll('.form-accordion');
  accordions.forEach((acc, idx) => {
    const header = acc.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = acc.classList.contains('active');
        // Toggle current
        if (isActive) {
          acc.classList.remove('active');
        } else {
          acc.classList.add('active');
        }
      });
    }
    // Open the first one by default
    if (idx === 0) acc.classList.add('active');
  });
}

function populateFormFields() {
  // Personal Info
  setVal('res-name', currentResume.personal.name);
  setVal('res-title', currentResume.personal.title);
  setVal('res-email', currentResume.personal.email);
  setVal('res-phone', currentResume.personal.phone);
  setVal('res-location', currentResume.personal.location);
  setVal('res-github', currentResume.personal.github);
  setVal('res-linkedin', currentResume.personal.linkedin);
  setVal('res-summary', currentResume.personal.summary);

  // Skills
  setVal('res-skills-languages', currentResume.skills.languages);
  setVal('res-skills-frameworks', currentResume.skills.frameworks);
  setVal('res-skills-tools', currentResume.skills.tools);

  // Experience
  if (currentResume.experience[0]) {
    setVal('res-exp-role', currentResume.experience[0].role);
    setVal('res-exp-company', currentResume.experience[0].company);
    setVal('res-exp-duration', currentResume.experience[0].duration);
    setVal('res-exp-desc', currentResume.experience[0].description);
  }

  // Projects
  if (currentResume.projects[0]) {
    setVal('res-proj-title', currentResume.projects[0].title);
    setVal('res-proj-tech', currentResume.projects[0].tech);
    setVal('res-proj-desc', currentResume.projects[0].description);
  }

  // Education
  if (currentResume.education[0]) {
    setVal('res-edu-degree', currentResume.education[0].degree);
    setVal('res-edu-school', currentResume.education[0].institution);
    setVal('res-edu-year', currentResume.education[0].year);
  }
}

function bindFormEvents() {
  const inputs = document.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      syncStateFromForm();
      updateLivePreview();
    });
  });
}

function syncStateFromForm() {
  currentResume.personal.name = getVal('res-name') || 'Your Name';
  currentResume.personal.title = getVal('res-title') || 'Developer Title';
  currentResume.personal.email = getVal('res-email') || '';
  currentResume.personal.phone = getVal('res-phone') || '';
  currentResume.personal.location = getVal('res-location') || '';
  currentResume.personal.github = getVal('res-github') || '';
  currentResume.personal.linkedin = getVal('res-linkedin') || '';
  currentResume.personal.summary = getVal('res-summary') || '';

  currentResume.skills.languages = getVal('res-skills-languages') || '';
  currentResume.skills.frameworks = getVal('res-skills-frameworks') || '';
  currentResume.skills.tools = getVal('res-skills-tools') || '';

  currentResume.experience[0] = {
    role: getVal('res-exp-role') || '',
    company: getVal('res-exp-company') || '',
    duration: getVal('res-exp-duration') || '',
    description: getVal('res-exp-desc') || ''
  };

  currentResume.projects[0] = {
    title: getVal('res-proj-title') || '',
    tech: getVal('res-proj-tech') || '',
    description: getVal('res-proj-desc') || ''
  };

  currentResume.education[0] = {
    degree: getVal('res-edu-degree') || '',
    institution: getVal('res-edu-school') || '',
    year: getVal('res-edu-year') || ''
  };
}

function updateLivePreview() {
  // Header Info
  setText('preview-name', currentResume.personal.name);
  setText('preview-title', currentResume.personal.title);
  
  // Contacts
  const contactsContainer = document.getElementById('preview-contacts');
  if (contactsContainer) {
    const contacts = [
      currentResume.personal.email,
      currentResume.personal.phone,
      currentResume.personal.location,
      currentResume.personal.github,
      currentResume.personal.linkedin
    ].filter(Boolean);

    contactsContainer.innerHTML = contacts.map(c => `
      <span class="flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
        ${escapeHtml(c)}
      </span>
    `).join('');
  }

  // Summary
  setText('preview-summary', currentResume.personal.summary);

  // Technical Skills
  const skillsContainer = document.getElementById('preview-skills');
  if (skillsContainer) {
    skillsContainer.innerHTML = `
      <div class="mb-1 text-xs"><strong>Languages:</strong> ${escapeHtml(currentResume.skills.languages)}</div>
      <div class="mb-1 text-xs"><strong>Frameworks & Libs:</strong> ${escapeHtml(currentResume.skills.frameworks)}</div>
      <div class="text-xs"><strong>Tools & Cloud:</strong> ${escapeHtml(currentResume.skills.tools)}</div>
    `;
  }

  // Experience
  const expContainer = document.getElementById('preview-experience');
  if (expContainer) {
    expContainer.innerHTML = currentResume.experience.map(exp => `
      <div class="mb-3">
        <div class="flex justify-between items-baseline font-bold text-sm text-slate-900">
          <span>${escapeHtml(exp.role)} <span class="text-primary font-medium">@ ${escapeHtml(exp.company)}</span></span>
          <span class="text-xs font-normal text-slate-500">${escapeHtml(exp.duration)}</span>
        </div>
        <p class="text-xs text-slate-600 mt-1 leading-relaxed">${escapeHtml(exp.description)}</p>
      </div>
    `).join('');
  }

  // Projects
  const projContainer = document.getElementById('preview-projects');
  if (projContainer) {
    projContainer.innerHTML = currentResume.projects.map(proj => `
      <div class="mb-3">
        <div class="flex justify-between items-baseline font-bold text-sm text-slate-900">
          <span>${escapeHtml(proj.title)}</span>
          <span class="text-xs font-medium text-primary">${escapeHtml(proj.tech)}</span>
        </div>
        <p class="text-xs text-slate-600 mt-1 leading-relaxed">${escapeHtml(proj.description)}</p>
      </div>
    `).join('');
  }

  // Education
  const eduContainer = document.getElementById('preview-education');
  if (eduContainer) {
    eduContainer.innerHTML = currentResume.education.map(edu => `
      <div class="flex justify-between items-baseline">
        <div>
          <div class="font-bold text-sm text-slate-900">${escapeHtml(edu.degree)}</div>
          <div class="text-xs text-slate-600">${escapeHtml(edu.institution)}</div>
        </div>
        <span class="text-xs font-normal text-slate-500">${escapeHtml(edu.year)}</span>
      </div>
    `).join('');
  }
}

function bindActionButtons() {
  const exportBtn = document.getElementById('btn-export-pdf');
  const saveBtn = document.getElementById('btn-save-draft');
  const resetBtn = document.getElementById('btn-reset-resume');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      syncStateFromForm();
      Storage.set('resume_data', currentResume);
      showToast('Resume draft saved successfully!', 'success');
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset resume to default template values?')) {
        currentResume = JSON.parse(JSON.stringify(defaultResumeState));
        populateFormFields();
        updateLivePreview();
        Storage.set('resume_data', currentResume);
        showToast('Resume reset to default template', 'info');
      }
    });
  }
}

// Helpers
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
