# DevPilot-AI

An all-in-one developer productivity workspace designed for tracking DSA practice, managing learning roadmaps, integrating GitHub activity, crafting professional resumes, and boosting daily coding productivity.

---

# Codebase Architecture

DevPilot-AI is organized as a clean, modular, zero-build client-side application using HTML5, Tailwind CSS utilities, vanilla CSS design tokens, and modular vanilla JavaScript.

```text
/
├── index.html                           # Main entry point (Dashboard workspace)
├── README.md                            # Documentation & Architecture Map
│
├── pages/                               # Specialized workspace modules
│   ├── chat.html                        # AI Coding Assistant
│   ├── github.html                      # GitHub Profile & Repo Deep Analyzer
│   ├── habits.html                      # Habit & Daily Consistency Tracker
│   ├── notes.html                       # Developer Notes Vault
│   ├── prompts.html                     # AI Prompt Library
│   ├── resume.html                      # Resume Builder & Evidence ATS Analyzer
│   ├── settings.html                    # Developer Profile & Settings
│   ├── snippets.html                    # Code Snippet Vault
│   └── timer.html                       # Pomodoro Focus Timer
│
├── css/
│   ├── base/                            # Core styles shared across the entire app
│   │   ├── global.css                   # CSS design tokens, resets, typography, utilities
│   │   ├── components.css               # Buttons, cards, badges, modal, toast notifications
│   │   └── responsive.css               # Media queries, mobile drawer, responsive layouts
│   │
│   └── pages/                           # Page-specific stylesheets
│       ├── chat.css                     # Chat message bubbles, code blocks, syntax header
│       ├── dashboard.css                # Dashboard widgets, stats cards, quick timer
│       ├── github.css                   # GitHub audit score rings, language bars, repository cards
│       ├── notes.css                    # Note cards, tags, modal editor styling
│       ├── resume.css                   # Resume builder forms, 9 print templates, ATS radar/gauges
│       └── settings.css                 # Settings tabs, API key toggles, preferences
│
├── js/
│   ├── core/                            # Shared foundational runtime logic
│   │   ├── app.js                       # Sidebar drawer, active route highlighting, focus handling
│   │   └── utils.js                     # Toast manager, clipboard, Storage wrapper, escapeHtml
│   │
│   └── pages/                           # Page-specific controllers and domain engines
│       ├── chat.js                      # AI Chat assistant controller & mock response engine
│       ├── dashboard.js                 # Dashboard task checkboxes, contribution heatmap, palette
│       ├── github.js                    # GitHub REST API integration & 100-point audit engine
│       ├── habit.js                     # Daily habit toggle, streak manager & activity grid
│       ├── notes.js                     # Notes vault CRUD, tag filtering & search
│       ├── prompt.js                    # Prompt library categorization & AI Chat handoff
│       ├── resume.js                    # Resume Hub & Builder controller (9 formats, PDF/JSON export)
│       ├── resumeAnalyzer.js            # Deterministic ATS parser, document classifier & scorer
│       ├── settings.js                  # Settings form persistence & API key visibility toggles
│       ├── snippets.js                  # Snippet vault filtering, search & clipboard copying
│       └── timer.js                     # Pomodoro timer, round counter & animated SVG ring
│
├── assets/                              # Static media & asset storage (reserved)
│
└── tests/
    ├── resume/                          # Automated Node.js testing suites
    │   ├── testResumeAnalyzer.js        # 14-scenario document classification & confidence test suite
    │   ├── testResumeScoring.js         # Controlled weak vs. strong resume scoring verification
    │   └── testScoringLogic.js          # Scoring constants and baseline comparison harness
    │
    └── README.md                        # Test runner instructions
```

---

## 1. What `index.html` Does
`index.html` serves as the primary dashboard and command center. It provides an immediate overview of daily developer activity:
- **DSA & Project Tasks**: Interactive checklist with persistent state in `localStorage`.
- **Contribution Heatmap**: 28-week activity matrix representing daily coding consistency.
- **Quick Focus Timer**: Quick-start Pomodoro session directly from the header.
- **Navigation Sidebar**: Responsive sidebar linking to all 9 specialized workspace tools.

## 2. What `pages/` Contains
The `pages/` directory houses independent HTML subpages for each tool:
- `chat.html`: Multi-model AI developer assistant for debugging, refactoring, and DSA explanations.
- `github.html`: Comprehensive GitHub account auditor calculating audit scores, language distribution, commit streaks, and project complexity.
- `habits.html`: Habit tracker for daily DSA, commits, and study streaks.
- `notes.html`: Categorized note-taking vault (DSA, WebDev, System Design, Concepts).
- `prompts.html`: Curated library of production prompts with one-click "Run in AI Chat" redirection.
- `resume.html`: Dual-purpose workspace featuring a 9-template live A4 Resume Builder and an evidence-driven ATS Resume Analyzer.
- `settings.html`: User profile, API keys, compact mode, and notification preferences.
- `snippets.html`: Multi-language code repository (JS, C++, Python, HTML/CSS) with instant copying.
- `timer.html`: Deep work Pomodoro timer with customizable intervals and round tracking.

## 3. What `css/` Contains
CSS is strictly separated into foundational tokens and page-specific layouts:
- `css/base/`:
  - `global.css`: CSS variables (`--color-primary`, `--color-surface`, etc.), base resets, scrollbar styling, and typography.
  - `components.css`: Reusable UI components (`.btn-primary`, `.dev-card`, `.badge`, `.toast`, `.modal`).
  - `responsive.css`: Breakpoint definitions (mobile drawer transitions, table scrolling, responsive grids).
- `css/pages/`:
  - Styles specific to individual pages (`resume.css` with A4 print templates, `github.css` with SVG score gauges, etc.).

## 4. What `js/core/` Contains
Shared infrastructure loaded across all pages:
- `utils.js`:
  - `showToast(message, type)`: Animated toast notifications.
  - `copyToClipboard(text, message)`: Cross-browser async clipboard helper.
  - `Storage`: Safe JSON `localStorage` abstraction with `devpilot_` namespace prefix.
  - `timeAgo(dateString)`: Relative time formatting ("2h ago", "3d ago").
  - `escapeHtml(str)`: XSS-sanitization helper for dynamic innerHTML rendering.
- `app.js`:
  - `initSidebar()`: Desktop collapse toggle and mobile navigation drawer.
  - `highlightActiveRoute()`: Auto-detects current page via `window.location.pathname` and sets active states on navigation links.
  - Non-editable text focus suppression.

## 5. What `js/pages/` Contains
Dedicated page controllers that manage DOM events, user inputs, and local state:
- Each page script initializes on `DOMContentLoaded` and binds cleanly to the corresponding HTML view.
- `resumeAnalyzer.js` is both a client-side module and a CommonJS module (`module.exports`) capable of running in Node.js test environments.

## 6. What `tests/` Contains
Automated verification suites in `tests/resume/` runnable via `node`:
- `testResumeAnalyzer.js`: Runs 14 comprehensive test scenarios verifying document classification (rejecting certificates, transcripts, invoices, bills), OCR processing, confidence gating, and evidence extraction.
- `testResumeScoring.js`: Verifies 100-point scoring accuracy on weak vs. strong resumes.
- `testScoringLogic.js`: Baseline scoring vocabulary test harness.

---

## 7. How Pages Connect to JavaScript
Every page follows an identical, predictable script inclusion pattern at the bottom of `<body>`:

```html
<!-- 1. Shared Utilities (Toast, Storage, Clipboard, Sanitization) -->
<script src="../js/core/utils.js"></script>

<!-- 2. Application Shell (Sidebar, Active Route, Global Handlers) -->
<script src="../js/core/app.js"></script>

<!-- 3. Page Controller (Page-Specific Logic) -->
<script src="../js/pages/<module>.js"></script>
```

In `resume.html`, both `resume.js` (Builder/Hub) and `resumeAnalyzer.js` (Analyzer) are loaded, where `resume.js` delegates analysis execution to `resumeAnalyzer.js`.

## 8. How CSS is Loaded
Every page includes stylesheets in the `<head>` in order of specificity:

```html
<!-- 1. Global Tokens & Typography -->
<link rel="stylesheet" href="../css/base/global.css"/>

<!-- 2. Common Reusable UI Components -->
<link rel="stylesheet" href="../css/base/components.css"/>

<!-- 3. Optional Page-Specific Stylesheet -->
<link rel="stylesheet" href="../css/pages/<module>.css"/>

<!-- 4. Global Responsive Overrides -->
<link rel="stylesheet" href="../css/base/responsive.css"/>
```

---

## 9. How the Resume Analyzer Works

The Resume Analyzer uses an evidence-driven, zero-hallucination evaluation pipeline:

```text
User uploads file (.pdf / .docx)  OR  clicks "Analyze Builder Resume"
                               ↓
    ┌──────────────────────────┴──────────────────────────┐
    ↓                                                     ↓
(File Upload)                                       (Builder Mode)
extractPDFText() / extractDOCXText()                convertBuilderToText()
(with OCR fallback if scanned)                            ↓
    └──────────────────────────┬──────────────────────────┘
                               ↓
                   Raw Resume Text Extracted
                               ↓
classifyDocument(resumeText)
  ├── Inspects word count, section density, and vocabulary
  ├── Rejects (< 60% confidence): Invoices, Certificates, Transcripts, Research Papers
  └── If REJECTED -> renderRejectionState() & stops pipeline
                               ↓
parseResumeSections(resumeText)
  └── Identifies boundaries for Summary, Skills, Experience, Projects, Education, etc.
                               ↓
Category Analysis Modules:
  ├── extractContactInfo(text)
  ├── extractSkills(text, parsedSections) (Canonical mapping & evidence verification)
  ├── analyzeProfessionalSummary(text, parsedSections, skills)
  ├── analyzeExperience(text, sectionContent) (Fresher detection & metrics extraction)
  ├── analyzeProjects(text, sectionContent) (Complexity & tech stack depth)
  ├── analyzeEducation(text, parsedSections)
  ├── analyzeCertifications(text, parsedSections)
  ├── analyzeAchievements(text, parsedSections)
  ├── analyzeContentQuality(text, exp, proj) (Action verbs vs weak fillers)
  └── analyzeATSFormatting(text, parsedSections)
                               ↓
buildStructuredResumeProfile() & checkInternalConsistency()
  └── Audits dates, conflicting metrics, and duplicate entries
                               ↓
calculateATSScore() [100-Point Deterministic Model]
  └── validateScoringEvidence() [Zero-hallucination audit pass]
                               ↓
calculateJobRoleMatches() & analyzeJobDescriptionMatch() (Optional JD Match)
                               ↓
generateSuggestions()
                               ↓
renderAllResults(analysisResult)
  └── Updates DOM: Score Gauge, Breakdown Bars, Evidence Cards, Recommendations
```

---

## 10. How Resume Scoring Works (100-Point Model)

The ATS score is calculated by `calculateATSScore()` in `js/pages/resumeAnalyzer.js` across 10 transparent categories:

| Category | Points | Evaluation Rule |
| :--- | :---: | :--- |
| **Professional Summary** | **8** | 40–120 words, role clarity, tech keyword integration, no vague clichés |
| **Technical Skills** | **15** | Verified skills (≥15), breadth (≥5 categories), evidenced in projects/work |
| **Technical Projects** | **20** | Count (≥2), architectural depth, quantifiable metrics (%, ms, users), active links |
| **Experience / Internships** | **15** | Impact bullets with metrics; Fresher Intelligence (high project scores compensate) |
| **Education** | **10** | Recognized degree, institution name, graduation year, GPA/percentage |
| **Achievements / DSA** | **10** | Hackathons, coding contest ranks, LeetCode streaks, scholarships, awards |
| **Certifications** | **5** | Recognized industry credentials (AWS, Meta, Google, Coursera, etc.) |
| **ATS & Structure** | **7** | Standard section headers, clean text flow, no unparseable formatting |
| **Contact Information** | **3** | Full name, valid email, phone number, LinkedIn/GitHub links |
| **Content Quality & Impact**| **7** | Strong action verbs, measurable numbers (%), absence of weak/vague fillers |
| **TOTAL** | **100** | **Sum of all 10 audited categories (clamped 0–100)** |

After calculation, `validateScoringEvidence()` validates every awarded point against raw text proof to prevent any hallucinated scores.

---

## 11. Where Shared Utilities Are
- All shared utilities reside in `js/core/utils.js`:
  - `showToast(msg, type)`
  - `copyToClipboard(text, successMsg)`
  - `Storage.get(key, defaultVal)`
  - `Storage.set(key, val)`
  - `Storage.remove(key)`
  - `timeAgo(dateString)`
  - `escapeHtml(str)`
  - `capitalize(str)`

## 12. Where Data Flows Through the Application
- **User Settings & API Keys**: Saved in `devpilot_user_settings` via `settings.js`, accessible by other modules via `Storage.get('user_settings')`.
- **AI Chat History**: Persisted in `devpilot_chat_history` via `chat.js`.
- **Prompt Library Handoff**: `prompt.js` saves selected prompt to `devpilot_prompt_to_run` and navigates to `chat.html`; `chat.js` loads it directly into the input textarea upon arrival.
- **Resume Data**: Builder saves draft data to `devpilot_resume_data`; Analyzer reads it directly or accepts uploaded PDF/DOCX files.
- **Analysis Results**: Cached in `devpilot_resume_analysis` for 24 hours so results persist on refresh.
