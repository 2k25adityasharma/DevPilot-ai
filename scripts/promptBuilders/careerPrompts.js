/**
 * Career & Interview Prompts Collection (12 Prompts)
 * Covers Resume ATS, STAR Bullets, LinkedIn, Behavioral Interviews, Salary Negotiation, and Technical Defense.
 */
module.exports = [
  {
    id: 'career-resume-ats-keyword-optimizer',
    title: 'Resume ATS Keyword Optimization & Job Description Matcher',
    category: 'Career',
    subcategory: 'Resume ATS Optimization',
    description: 'Compares your current resume text against a target Job Description, identifies missing technical keywords, and scores ATS compatibility.',
    prompt: `Act as a Senior Technical Recruiter at Google and ATS (Applicant Tracking System) Algorithm Specialist. Perform a rigorous gap analysis on my resume against this job posting.

Target Job Description (JD):
{{JOB_DESCRIPTION}}

My Current Resume Content:
{{RESUME_TEXT}}

Tasks:
1. ATS Keyword Gap Analysis:
   - Identify High-Priority Technical Keywords present in the JD but missing from my resume (Frameworks, Cloud tools, Architecture terms).
   - Identify Soft Skills / Methodologies (Agile, Cross-functional collaboration, Mentorship).
2. Quantified ATS Match Score (0 - 100%):
   - Explain what is dragging the score down.
3. Surgical Resume Bullet Enhancements:
   - Rewrite 3 to 5 of my existing bullets to naturally incorporate the missing high-value keywords without buzzword stuffing.
4. Formatting & Parser Hazards:
   - Identify any formatting traps (tables, multi-column layouts, graphics) that break ATS parsers like Workday, Greenhouse, or Taleo.

Expected Output Format:
1. ATS Keyword Match Scorecard
2. Missing High-Impact Keywords List (Categorized by Domain)
3. 5 Before-and-After Enhanced Resume Bullets
4. ATS Formatting Compliance Checklist`,
    tags: ['career', 'resume', 'ats', 'job-description', 'interview-prep', 'recruiting'],
    difficulty: 'Intermediate',
    useCase: 'Career & Resume',
    variables: ['{{JOB_DESCRIPTION}}', '{{RESUME_TEXT}}'],
    expectedOutput: 'ATS match scorecard + missing keywords list + 5 enhanced bullets + ATS compliance checklist'
  },
  {
    id: 'career-star-bullet-enhancer',
    title: 'Resume Action-Verb STAR Bullet Enhancer (Google XYZ Formula)',
    category: 'Career',
    subcategory: 'Resume',
    description: 'Transforms weak, passive resume bullets into punchy, metric-driven achievements using Google\'s formula: "Accomplished [X], as measured by [Y], by doing [Z]".',
    prompt: `Act as an Executive Tech Resume Writer. Transform my weak, passive resume bullets into high-impact, quantified achievement statements using Google's XYZ Formula.

My Current Draft Bullets:
{{DRAFT_BULLETS}}

Target Engineering Level (Junior, Mid, Senior, Staff):
{{TARGET_LEVEL}}

Tasks:
1. Deconstruct the weakness in each original bullet (passive voice, task description instead of outcome, missing business impact, lack of numbers).
2. Apply Google's Formula: "Accomplished [X] as measured by [Y] by doing [Z]":
   - Start with powerful action verbs (Spearheaded, Architected, Engineered, Optimized, Automated).
   - Quantify results (Latency reduced by 40%, throughput scaled to 10k QPS, $50k monthly cloud cost saved).
   - Highlight the specific engineering approach (Redis caching, asynchronous worker queues, zero-downtime migration).
3. Provide 2 variations per bullet:
   - Variation A: Metric-heavy (percentages, latency, revenue).
   - Variation B: Architectural / Scale-heavy (concurrency, reliability, code quality).

Expected Output Format:
1. Bullet Weakness Diagnosis
2. Transformed XYZ Bullets (2 variations per bullet)
3. Action Verb Glossary for Software Engineers`,
    tags: ['career', 'resume', 'google-xyz', 'action-verbs', 'star-method', 'metrics'],
    difficulty: 'Easy',
    useCase: 'Career & Resume',
    variables: ['{{DRAFT_BULLETS}}', '{{TARGET_LEVEL}}'],
    expectedOutput: 'Weakness diagnosis + transformed XYZ bullets (2 variations) + action verb glossary'
  },
  {
    id: 'career-project-explanation-defense',
    title: 'Technical Project Deep-Dive & Architecture Defense',
    category: 'Career',
    subcategory: 'Project Explanation',
    description: 'Structures your personal or work project into an impressive 3-minute interview story covering architecture, toughest technical bug, and trade-offs.',
    prompt: `Act as a Staff Software Engineer and Hiring Committee Member. Help me craft an impressive, technical project walkthrough story for my interviews.

Project Overview & Tech Stack:
{{PROJECT_DETAILS}}

Tasks:
1. 30-Second High-Level Pitch:
   - What problem does this solve, for whom, and what is the core tech stack?
2. Architectural Deep-Dive (2 minutes):
   - Client -> API -> Database -> Background worker architecture.
   - Why did you pick this specific tech stack over alternatives? (e.g. PostgreSQL over MongoDB).
3. The "Toughest Technical Challenge / Bug":
   - Frame a realistic, complex engineering challenge you solved (e.g. race condition, query bottleneck, caching inconsistency).
   - Symptom -> Investigation -> Root Cause -> Fix -> Measured Outcome.
4. Anticipated Interviewer Grilling Questions:
   - 4 tough technical questions an interviewer will ask to verify you actually built the project yourself rather than copying a tutorial.

Expected Output Format:
1. 30-Second Elevator Pitch Script
2. Architectural Walkthrough Outline
3. Toughest Bug STAR Story (Situation, Task, Action, Result)
4. 4 Tough Interview Defense Questions with Model Answers`,
    tags: ['career', 'interview-prep', 'projects', 'project-explanation', 'technical-interview', 'portfolio'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{PROJECT_DETAILS}}'],
    expectedOutput: '30s pitch + architectural walkthrough + toughest bug STAR story + 4 interview defense questions'
  },
  {
    id: 'career-tell-me-about-yourself',
    title: '"Tell Me About Yourself" Executive Elevator Pitch Generator',
    category: 'Career',
    subcategory: 'HR Interview',
    description: 'Crafts a compelling 90-second answer to "Tell me about yourself" following the Present-Past-Future narrative framework.',
    prompt: `Act as an Executive Tech Career Coach. Craft a compelling, confident 90-second response to "Tell me about yourself" for my upcoming interview.

My Background (Current role, key skills, past experience, career transition):
{{MY_BACKGROUND}}

Target Role & Company:
{{TARGET_ROLE_AND_COMPANY}}

Tasks:
1. Apply the "Present -> Past -> Future" Framework:
   - Present (30s): Who you are today, current engineering focus, and core technical strengths.
   - Past (30s): 1 or 2 standout achievements or inflection points that demonstrate trajectory and problem-solving grit.
   - Future (30s): Why this specific company and role is the natural, exciting next chapter of your journey.
2. Cut the fluff: Eliminate personal life history, hobbies, or reciting your resume chronologically.
3. Natural, conversational tone: Make it sound confident, authentic, and engaging.
4. Provide 2 delivery variations:
   - Standard Senior Engineer tone.
   - High-Growth Startup / Founder-mentality tone.

Expected Output Format:
1. Present-Past-Future Script (Word count: ~180 words, 90 seconds spoken)
2. Delivery Variations (Enterprise vs Startup)
3. Delivery Tips (Pacing, eye contact, tone inflection)`,
    tags: ['career', 'interview-prep', 'tell-me-about-yourself', 'elevator-pitch', 'hr-interview'],
    difficulty: 'Beginner',
    useCase: 'Interview Preparation',
    variables: ['{{MY_BACKGROUND}}', '{{TARGET_ROLE_AND_COMPANY}}'],
    expectedOutput: '90-second script (Present-Past-Future) + delivery variations + vocal pacing tips'
  },
  {
    id: 'career-behavioral-star-story-builder',
    title: 'Behavioral Interview STAR Story Builder (Conflict, Failure, Leadership)',
    category: 'Career',
    subcategory: 'Behavioral Questions',
    description: 'Structures behavioral stories into Amazon Leadership Principle / STAR format: Situation, Task, Action (60%), and Result (metrics & learning).',
    prompt: `Act as a Senior Bar Raiser at Amazon. Help me structure my experience into a high-scoring STAR behavioral interview response.

Target Behavioral Question (e.g. Tell me about a time you had a technical disagreement / Tell me about a failure):
{{BEHAVIORAL_QUESTION}}

Raw Experience / Incident Notes:
{{RAW_EXPERIENCE_NOTES}}

Tasks:
1. Format into the STAR Framework with proper time allocation:
   - Situation (15%): Set the stage, scale, and stakes concisely.
   - Task (10%): Your specific responsibility (not the team's).
   - Action (60%): Deep technical and interpersonal steps YOU took. Explain your reasoning, options evaluated, and how you communicated.
   - Result (15%): Tangible business outcome, quantified metrics, and what you learned or adopted team-wide.
2. Eliminate "We": Replace passive "We decided" with active "I analyzed, I proposed, I built".
3. Add emotional intelligence: Show humility, data-driven compromise, and post-incident ownership.

Expected Output Format:
1. Complete STAR Script (Spoken duration: ~2.5 minutes)
2. Breakdown of Evaluated Competencies (e.g. Bias for Action, Disagree & Commit)
3. Potential Follow-Up Probing Questions from the Interviewer`,
    tags: ['career', 'behavioral-interview', 'star-method', 'amazon-leadership', 'hr-interview'],
    difficulty: 'Intermediate',
    useCase: 'Interview Preparation',
    variables: ['{{BEHAVIORAL_QUESTION}}', '{{RAW_EXPERIENCE_NOTES}}'],
    expectedOutput: 'Complete STAR script (Action-focused) + evaluated competencies + follow-up questions'
  },
  {
    id: 'career-linkedin-profile-optimizer',
    title: 'LinkedIn Headline, About Section & Experience Optimizer',
    category: 'Career',
    subcategory: 'LinkedIn',
    description: 'Optimizes your LinkedIn profile for recruiter search visibility (SEO): keyword-dense headline, compelling About summary, and featured projects.',
    prompt: `Act as a Tech Recruiter and LinkedIn Personal Branding Consultant. Transform my LinkedIn profile to maximize inbound recruiter messages.

Current Profile Information:
{{CURRENT_PROFILE}}

Target Job Title & Domain (e.g. Senior Full Stack Engineer / Backend Distributed Systems):
{{TARGET_TITLE_AND_DOMAIN}}

Tasks:
1. Headline Optimization (220 characters max):
   - Combine Role + Core Tech Stack + Business Value + Social Proof (e.g. "Senior Software Engineer @ Ex-Unicorn | Distributed Systems | Node.js • Go • AWS | Scaling High-Throughput APIs").
   - Provide 3 distinct headline styles (Keyword-Optimized, Outcome-Focused, Clean & Punchy).
2. About / Summary Section Rewrite:
   - Hook in first 3 lines (before "see more" fold).
   - Narrative of your technical passion and core problem-solving identity.
   - "Core Technical Expertise" bulleted list for recruiter search indexing.
   - Clear Call-to-Action (email/contact info).
3. Experience Section Polish:
   - Convert job descriptions into accomplishment bullets with metrics.

Expected Output Format:
1. 3 Tailored Headline Options
2. Complete About Section Copy (with markdown and formatting)
3. Experience Section Template
4. Top 15 Skills to Add for Recruiter Search Algorithms`,
    tags: ['career', 'linkedin', 'personal-branding', 'recruiter-seo', 'networking'],
    difficulty: 'Easy',
    useCase: 'Career & Resume',
    variables: ['{{CURRENT_PROFILE}}', '{{TARGET_TITLE_AND_DOMAIN}}'],
    expectedOutput: '3 headline options + complete About section copy + experience template + top 15 skills list'
  },
  {
    id: 'career-salary-negotiation-scripts',
    title: 'Tech Salary & Total Compensation (TC) Negotiation Strategy',
    category: 'Career',
    subcategory: 'Career Roadmap',
    description: 'Provides psychological negotiation scripts and counter-offer emails to negotiate Base Salary, Equity (RSUs/Options), and Sign-on bonuses.',
    prompt: `Act as a Professional Tech Compensation & Offer Negotiation Coach. Guide me through negotiating this job offer for maximum Total Compensation (TC).

Current Offer Details (Base, Equity/RSUs, Bonus, Location):
{{OFFER_DETAILS}}

Competing Offers or Market Benchmarks:
{{COMPETING_OFFERS_OR_BENCHMARKS}}

Tasks:
1. Evaluate Offer Competitiveness:
   - Compare against Levels.fyi market percentiles (25th, 50th, 75th, 90th percentile).
2. Negotiation Strategy & Leverage Identification:
   - Identifying levers: Base Salary, Sign-on Bonus (easiest for companies to grant), Equity/RSUs (long-term wealth), Remote flexibility.
3. Word-for-Word Scripts:
   - Script for initial phone call with recruiter when offer is presented ("anchor prevention").
   - Professional Counter-Offer Email balancing gratitude with firm, data-backed justification.
   - Script for handling multiple competing offers.
4. What to do if they say "This is our final offer".

Expected Output Format:
1. Compensation Competitiveness Analysis
2. Strategic Levers Breakdown
3. Word-for-Word Recruiter Phone Script
4. Professional Counter-Offer Email Template
5. Fallback Tactics if Offer is Fixed`,
    tags: ['career', 'salary-negotiation', 'compensation', 'counter-offer', 'levels-fyi'],
    difficulty: 'Advanced',
    useCase: 'Career & Resume',
    variables: ['{{OFFER_DETAILS}}', '{{COMPETING_OFFERS_OR_BENCHMARKS}}'],
    expectedOutput: 'Comp analysis + strategic levers + recruiter phone script + counter-offer email + fallback tactics'
  },
  {
    id: 'career-recruiter-cold-message-outreach',
    title: 'LinkedIn & Cold Email Recruiter Outreach Templates',
    category: 'Career',
    subcategory: 'LinkedIn',
    description: 'Generates high-conversion, personalized outreach messages to Engineering Managers and Recruiters that get replies instead of being ignored.',
    prompt: `Act as a Top Tech Recruiter and Outbound Messaging Specialist. Write high-conversion cold outreach messages to get my foot in the door.

Target Company & Role:
{{TARGET_COMPANY_AND_ROLE}}

Target Recipient (Technical Recruiter vs Engineering Hiring Manager):
{{RECIPIENT_TYPE}}

My Unique Selling Proposition (USP) / Relevant Project:
{{MY_USP}}

Tasks:
1. Rules for High-Conversion Tech Outreach:
   - Under 120 words (respecting their busy schedule).
   - Hook: Genuine company-specific connection or appreciation of their recent launch/post.
   - Value Proposition: Highlighting 1 specific achievement matching their team's stack.
   - Low-friction Call-to-Action (e.g. "Open to a brief 10-minute chat next week?").
2. Provide 3 Customized Templates:
   - Template A: InMail / Connection request to a Technical Recruiter.
   - Template B: Direct Email / Message to an Engineering Manager / Director.
   - Template C: Polite follow-up message after 5 business days of silence.

Expected Output Format:
1. Outreach Psychology & Rules of Engagement
2. Template A (Technical Recruiter)
3. Template B (Hiring Manager)
4. Template C (Polite 5-Day Follow-Up)`,
    tags: ['career', 'recruiting', 'cold-email', 'linkedin', 'networking', 'job-search'],
    difficulty: 'Easy',
    useCase: 'Career & Resume',
    variables: ['{{TARGET_COMPANY_AND_ROLE}}', '{{RECIPIENT_TYPE}}', '{{MY_USP}}'],
    expectedOutput: 'Outreach rules + 3 customized templates (Recruiter, Hiring Manager, Follow-up)'
  },
  {
    id: 'career-tech-lead-behavioral-grilling',
    title: 'Senior Engineer & Tech Lead Behavioral Interview Preparation',
    category: 'Career',
    subcategory: 'Technical Interview',
    description: 'Prepares senior engineers for leadership grilling: driving cross-team consensus, technical disagreements, mentoring, and technical vision.',
    prompt: `Act as a VP of Engineering conducting a Senior / Tech Lead Behavioral Interview. Challenge me with high-level architectural leadership scenarios.

My Experience Level & Target Role:
{{MY_LEVEL_AND_TARGET}}

Tasks:
1. Present 4 High-Stakes Leadership Scenarios:
   - Scenario 1: A senior product manager wants to cut corners on architecture to hit a deadline; how do you push back with data?
   - Scenario 2: Two senior engineers on your team are in a deadlock over choosing technology X vs technology Y; how do you resolve it?
   - Scenario 3: How do you balance shipping customer features with paying down critical technical debt?
   - Scenario 4: Tell me about a junior engineer you mentored who was underperforming.
2. For each scenario:
   - What the executive interviewer is looking for (Influence without authority, Pragmatism, Empathy, Business alignment).
   - Junior/Mid Answer (Tactical mistakes to avoid).
   - Principal / Staff Engineer Model Answer.

Expected Output Format:
4 Comprehensive Leadership Scenario Cards with Evaluation Criteria and Model Staff Answers.`,
    tags: ['career', 'tech-lead', 'leadership', 'staff-engineer', 'behavioral-interview', 'management'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{MY_LEVEL_AND_TARGET}}'],
    expectedOutput: '4 leadership scenario cards + evaluation criteria + tactical mistakes + staff model answers'
  },
  {
    id: 'career-system-design-communication-framework',
    title: 'System Design Interview Communication & Pacing Strategy',
    category: 'Career',
    subcategory: 'Technical Interview',
    description: 'Master the interpersonal and communication techniques of a system design interview: signposting, whiteboarding pacing, and handling interviewer interruptions.',
    prompt: `Act as a Staff Systems Interview Coach. Train me on the communication and pacing strategies to ace a System Design interview.

Interview Type & Target Level:
{{INTERVIEW_TYPE_AND_LEVEL}}

Tasks:
1. The 45-Minute Time Budget:
   - 00-05m: Requirements & Clarifications (Scope, SLAs).
   - 05-10m: Estimations (Traffic, Storage).
   - 10-15m: API Contracts.
   - 15-20m: High-Level Architecture.
   - 20-35m: Component Deep-Dives.
   - 35-42m: Bottlenecks, Failover & Trade-offs.
   - 42-45m: Wrap-up & Q&A.
2. Verbal Signposting Techniques:
   - Phrases to transition smoothly between sections ("Now that we've bounded our write volume, let's look at the database tier...").
3. Handling Interviewer Interruptions & Curveballs:
   - How to respond gracefully when the interviewer changes requirements mid-interview ("What if traffic suddenly spikes by 100x?").
4. Driving vs Passive Collaboration:
   - How to maintain the driver's seat while actively soliciting feedback ("Does this data model align with what you'd like to explore, or should we dive into the caching layer?").

Expected Output Format:
1. 45-Minute Pacing Clock Diagram
2. Verbal Signposting Phrasebook
3. Dealing with Curveballs / Pushback Scripts
4. Top 5 Disqualifying Communication Mistakes to Avoid`,
    tags: ['career', 'system-design', 'communication', 'interview-prep', 'pacing', 'faang'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{INTERVIEW_TYPE_AND_LEVEL}}'],
    expectedOutput: '45-minute pacing clock + verbal signposting phrasebook + curveball scripts + top 5 mistakes'
  },
  {
    id: 'career-30-day-technical-skill-gap-plan',
    title: '30-Day Accelerated Technical Skill Gap Roadmap',
    category: 'Career',
    subcategory: 'Career Roadmap',
    description: 'Builds a realistic, intensive 30-day curriculum to bridge technical gaps (e.g. learning Docker, System Design, or AWS) before interviews.',
    prompt: `Act as an Engineering Education Architect. Build an intensive, high-yield 30-day learning curriculum to master this missing technical skill.

Skill or Domain to Master:
{{TARGET_SKILL}}

Current Skill Level & Available Hours/Day:
{{CURRENT_LEVEL_AND_HOURS}}

Tasks:
1. 4-Week Progressive Curriculum:
   - Week 1: Core Mechanics & Mental Models (Theory, architecture, fundamentals).
   - Week 2: Hands-On Implementation & Patterns (Building real code, solving exercises).
   - Week 3: Production Hardening, Edge Cases & Failure Modes (Debugging, metrics, trade-offs).
   - Week 4: Interview Defense & Portfolio Capstone (Mock questions, explaining trade-offs).
2. Curated Resource Recommendations:
   - Free documentation, whitepapers, interactive tutorials, or open-source repos.
3. Daily 2-Hour Breakdown:
   - 45 mins active reading/theory -> 60 mins hands-on coding -> 15 mins flashcard/spaced-repetition review.
4. Capstone Project Specification:
   - A single, impressive mini-project demonstrating mastery to show on a resume/GitHub.

Expected Output Format:
1. 30-Day Day-by-Day Milestone Table
2. Capstone Project Architecture Specification
3. Top Curated Learning Resources
4. Interview Readiness Self-Assessment Quiz`,
    tags: ['career', 'learning-roadmap', 'skill-gap', 'career-growth', 'curriculum'],
    difficulty: 'Intermediate',
    useCase: 'Career & Resume',
    variables: ['{{TARGET_SKILL}}', '{{CURRENT_LEVEL_AND_HOURS}}'],
    expectedOutput: 'Day-by-day milestone table + capstone architecture spec + curated resources + readiness quiz'
  },
  {
    id: 'career-github-portfolio-readme-optimizer',
    title: 'GitHub Portfolio & Project README Showcase Optimizer',
    category: 'Career',
    subcategory: 'Project Explanation',
    description: 'Transforms messy GitHub project READMEs into elite developer portfolios: architecture diagrams, demo GIFs, tech decisions, and local setup.',
    prompt: `Act as a Staff Open Source Maintainer and Hiring Manager. Transform this raw project description into an elite, portfolio-grade GitHub README.md.

Project Name & Features:
{{PROJECT_NAME_AND_FEATURES}}

Tech Stack:
{{TECH_STACK}}

Tasks:
1. README Architecture Structure:
   - Badges (Build, License, Tech stack).
   - Catchy Hero Tagline & Problem Statement.
   - Interactive Demo / GIF placeholder.
   - Architecture & Data Flow Diagram (Mermaid or ASCII).
   - Key Engineering Challenges & How They Were Solved (proves you didn't just follow a tutorial).
   - Quick Start / Local Development Guide (\`git clone\`, \`docker compose up\`, \`.env.example\`).
   - Automated Testing instructions (\`npm test\`).
2. Provide the complete markdown file ready to commit to GitHub.

Expected Output Format:
1. Complete, production-grade README.md file in markdown
2. Architectural Diagram block (Mermaid.js)
3. Resume Bullet Extraction derived from this project`,
    tags: ['career', 'github', 'portfolio', 'readme', 'open-source', 'projects'],
    difficulty: 'Easy',
    useCase: 'Career & Resume',
    variables: ['{{PROJECT_NAME_AND_FEATURES}}', '{{TECH_STACK}}'],
    expectedOutput: 'Production-grade README.md + Mermaid diagram + derived resume bullets'
  }
];
