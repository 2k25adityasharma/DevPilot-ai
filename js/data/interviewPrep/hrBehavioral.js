/**
 * DevPilot-AI — HR & Behavioral Interview Module
 * 10 Core Placement Interview Frameworks (STAR method, evaluation criteria, traps to avoid, answers)
 * + 10 Situational Judgment Placement MCQs.
 */

(function () {
  'use strict';

  const hrData = {
    category: "hrBehavioral",
    title: "HR & Behavioral Interview",
    description: "Behavioral interview frameworks, STAR storytelling, situational scenarios, and HR round preparation.",
    icon: "psychology_alt",
    totalTopics: 2,
    topics: [
      "Core HR Interview Questions",
      "HR & Behavioral Scenarios"
    ],
    coreQuestions: [
  {
    "id": "hr-core-01",
    "question": "Tell me about yourself.",
    "whatInterviewerIsEvaluating": "Communication clarity, professional trajectory, ability to synthesize background concisely, and relevance of skills to the role.",
    "goodAnswerStructure": "Present-Past-Future Model: 1) Present: Current role/education and primary technical passions. 2) Past: Significant projects, internships, or practical milestones that built your foundation. 3) Future: Why this company and role represent the ideal next step.",
    "whatToAvoid": "Reciting your entire resume line-by-line, sharing irrelevant personal life stories from childhood, rambling for more than 2 minutes without structure, or displaying self-doubt.",
    "exampleAnswerFramework": "'I am a final-year Computer Science student specializing in scalable backend engineering. Over the past two years, I've focused on distributed systems and cloud microservices—most notably architecting an open-source real-time event streaming platform that handles 10,000 events per second. During my recent internship at XYZ Tech, I optimized database queries to reduce API latency by 35%. I am energized by your company's focus on high-throughput distributed infrastructure, and I'm excited to bring my backend design and problem-solving skills to this engineering team.'"
  },
  {
    "id": "hr-core-02",
    "question": "Why should we hire you?",
    "whatInterviewerIsEvaluating": "Self-awareness, understanding of job requirements, alignment of skills with company pain points, and confidence without arrogance.",
    "goodAnswerStructure": "Value-Add Intersection: 1) Acknowledge the core challenge of the role. 2) Provide 2-3 specific technical and collaborative strengths directly addressing those needs. 3) Highlight cultural enthusiasm and fast learning curve.",
    "whatToAvoid": "Generic cliches ('Because I am hardworking'), sounding desperate ('Because I need this job'), or making unsubstantiated claims without project evidence.",
    "exampleAnswerFramework": "'You should hire me because I bridge the gap between strong algorithmic fundamentals and practical production-ready development. For example, in the job description you highlighted the need for engineers who understand both RESTful microservices and asynchronous queue architectures; in my capstone project, I built exactly that using Node.js, Redis, and RabbitMQ, cutting job processing latency in half. Beyond technical execution, I am a collaborative engineer who communicates clearly and embraces constructive code reviews. I can contribute to your production pipeline with minimal onboarding overhead.'"
  },
  {
    "id": "hr-core-03",
    "question": "Why do you want to join this company?",
    "whatInterviewerIsEvaluating": "Genuine company research, alignment with product mission, cultural fit, and long-term interest rather than submitting indiscriminate mass applications.",
    "goodAnswerStructure": "Mission-Product-Growth Trifecta: 1) Specific product or architectural engineering accomplishment by the company you admire. 2) Alignment with their corporate culture or engineering blogs. 3) How the company's technical scale fuels your career growth.",
    "whatToAvoid": "Giving generic flattery that applies to any tech company ('You are a market leader and have great offices'), focusing solely on salary/perks, or revealing you don't know what the company actually builds.",
    "exampleAnswerFramework": "'I have been following your engineering blog, particularly your recent post on migrating your payment infrastructure to event-driven serverless architectures. As an engineer passionate about distributed fault tolerance, solving challenges at your scale—processing millions of daily financial transactions—is the exact environment where I want to test and sharpen my skills. Furthermore, your open-source contributions and commitment to continuous learning align deeply with my personal engineering philosophy.'"
  },
  {
    "id": "hr-core-04",
    "question": "What are your greatest strengths?",
    "whatInterviewerIsEvaluating": "Relevance of strengths to software engineering, self-awareness, and whether claims are substantiated by tangible project proof.",
    "goodAnswerStructure": "Claim-Evidence-Impact Formula: State a clear core strength, back it up with a real technical project example, and describe the measurable positive impact.",
    "whatToAvoid": "Listing 15 unrelated adjectives ('I am smart, punctual, honest, fast...'), choosing irrelevant traits, or sounding boastful without backing evidence.",
    "exampleAnswerFramework": "'My greatest strength is deep analytical debugging and systematic root-cause analysis. When facing ambiguous production issues, I don't guess—I inspect logs, formulate testable hypotheses, and isolate variables. For instance, during our team's hackathon project, our server crashed intermittently under load; by instrumenting distributed tracing with OpenTelemetry, I isolated the issue to an unindexed database foreign key lock, reducing query timeouts to zero. My other strength is technical adaptability—I ramped up on Docker and Kubernetes within two weeks to automate our CI/CD pipeline.'"
  },
  {
    "id": "hr-core-05",
    "question": "What is your greatest weakness?",
    "whatInterviewerIsEvaluating": "Honesty, self-awareness, emotional maturity, and whether you take active, proactive steps to improve upon shortcomings.",
    "goodAnswerStructure": "Real Weakness + Active Remediation: 1) State a genuine professional weakness (not a fatal flaw). 2) Explain how it previously affected your work. 3) Detail the concrete systems/habits you have built to overcome it.",
    "whatToAvoid": "Fake humblebrags ('I work too hard', 'I am too perfectionist'), disqualifying weaknesses ('I hate teamwork', 'I miss deadlines constantly'), or claiming you have zero weaknesses.",
    "exampleAnswerFramework": "'Earlier in my engineering journey, I had a tendency to spend too much time attempting to solve complex technical blockers entirely on my own before reaching out for guidance, which occasionally delayed ticket progression. I recognized that while self-reliance is valuable, team velocity is paramount. To fix this, I adopted a strict 45-minute timebox rule: if I cannot make measurable progress on a bug after 45 minutes of systematic debugging and documentation research, I formulate a clear summary of what I've tried and consult a teammate. This has made my problem-solving much faster and boosted team collaboration.'"
  },
  {
    "id": "hr-core-06",
    "question": "Tell me about a challenging project and how you managed it.",
    "whatInterviewerIsEvaluating": "Technical complexity, project ownership, problem decomposition, resilience under obstacles, and structured STAR storytelling.",
    "goodAnswerStructure": "STAR Model: Situation (context/problem), Task (your specific role/responsibility), Action (the systematic engineering steps you executed), Result (measurable technical/business impact).",
    "whatToAvoid": "Blaming team members for delays, giving a high-level summary without explaining your personal engineering contributions, or picking a trivial homework assignment.",
    "exampleAnswerFramework": "'During my final year, our team built a collaborative code editor with real-time synchronization (Situation). My task was to implement the operational transformation algorithm so simultaneous keystrokes would merge deterministically without race conditions (Task). Initially, network latency caused document desynchronization under rapid concurrent edits. I researched conflict-free replicated data types (CRDTs), benchmarked Yjs vs custom WebSockets, and re-architected our state synchronization into an event-driven CRDT model with client-side caching (Action). As a result, the editor sustained 50 simultaneous users per document with under 15ms sync latency, and our project was selected as the top departmental capstone (Result).'"
  },
  {
    "id": "hr-core-07",
    "question": "Tell me about a time you failed.",
    "whatInterviewerIsEvaluating": "Accountability, resilience, absence of defensiveness, and the ability to extract actionable lessons from setbacks.",
    "goodAnswerStructure": "Accountability-Remediation-Growth: 1) Admit an actual technical or project mistake transparently. 2) Explain the immediate corrective action taken. 3) Highlight the preventative mechanisms put in place so it never happened again.",
    "whatToAvoid": "Claiming you've never failed, blaming colleagues or external tools, or picking an catastrophic ethical violation.",
    "exampleAnswerFramework": "'During my software engineering internship, I pushed a database migration script directly to our staging environment without running our local pre-flight rollback test first (Situation). The migration locked a core table, causing staging integration tests to fail for the entire QA team (Failure). I immediately notified my mentor, owned the mistake, and manually executed the rollback procedure to restore staging within 20 minutes (Action). To ensure this never happened again, I updated our CI pipeline to mandate an automated dry-run rollback check before any migration branch could be merged (Learning/Prevention). That taught me that automated safety rails are always superior to relying on manual developer discipline.'"
  },
  {
    "id": "hr-core-08",
    "question": "Tell me about a conflict in a team and how you handled it.",
    "whatInterviewerIsEvaluating": "Conflict resolution skills, emotional intelligence, empathy, and putting project goals above personal ego.",
    "goodAnswerStructure": "De-escalation to Objective Metrics: 1) Describe the professional disagreement (avoid personal animosity). 2) Explain how you communicated with empathy. 3) Detail the compromise or empirical benchmark used to resolve it.",
    "whatToAvoid": "Depicting your teammate as malicious or incompetent, claiming you forced them to concede, or escalating to management unnecessarily.",
    "exampleAnswerFramework": "'During a hackathon, my teammate and I had a strong disagreement regarding whether to build our backend with Python FastAPI or Go. He wanted Go for raw execution performance, while I advocated for FastAPI due to our tight 24-hour timeline and existing Python machine learning models (Disagreement). Rather than arguing opinions, I suggested a 30-minute timeboxed discussion where we listed our MVP requirements. We realized our bottleneck was ML inference latency, not HTTP routing speed, and FastAPI allowed us to integrate the AI models in 2 hours instead of 8 (De-escalation/Data). He agreed with the reasoning, and we successfully submitted the working MVP on time, winning second place.'"
  },
  {
    "id": "hr-core-09",
    "question": "Where do you see yourself in 5 years?",
    "whatInterviewerIsEvaluating": "Ambition, career intentionality, realistic progression expectations, and whether your growth trajectory aligns with the company's path.",
    "goodAnswerStructure": "Skill Depth to Architectural Leadership: 1) Near term (1-2 years): Master the codebase, achieve autonomous feature delivery, and earn team trust. 2) Mid term (3-5 years): Grow into a technical lead/architect responsible for system design, mentoring juniors, and driving cross-functional projects.",
    "whatToAvoid": "Saying 'I want your job', revealing you plan to leave for graduate school or another industry in two years, or having zero concrete ambitions.",
    "exampleAnswerFramework": "'Over the next two years, my goal is to deeply master your backend ecosystem, write resilient production code, and take complete end-to-end ownership of core service modules. Within five years, I see myself growing into a Senior Software Engineer and Technical Lead—spearheading architectural system design decisions, mentoring junior developers, and translating complex business requirements into scalable software architectures. Ultimately, I want to be recognized as a reliable technical anchor within this engineering organization.'"
  },
  {
    "id": "hr-core-10",
    "question": "Why should we select you over another candidate with similar technical qualifications?",
    "whatInterviewerIsEvaluating": "Differentiating qualities, communication poise, culture add, and passion for the craft.",
    "goodAnswerStructure": "The Complete Package: 1) Acknowledge that other candidates are talented. 2) Highlight your unique blend of technical competence, customer empathy, relentless ownership, and positive team energy.",
    "whatToAvoid": "Belittling other candidates, sounding arrogant, or giving a purely transactional answer.",
    "exampleAnswerFramework": "'While I respect that there are many capable candidates with similar academic credentials, my differentiator is my relentless sense of ownership and cross-functional empathy. I don't just write code to close a Jira ticket—I understand the end-user's pain point, document my architecture thoroughly, and write exhaustive automated tests so my teammates aren't called at 2 AM for regressions. When issues arise, I don't point fingers; I run toward the problem. That combination of engineering discipline, proactive communication, and genuine excitement for this product makes me an immediate culture add to your engineering team.'"
  }
],
    questions: [
  {
    "id": "hr-mcq-01",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "easy",
    "question": "You realize 2 hours before a major client demo that a critical bug has broken the primary checkout flow. What is the most professional response?",
    "options": [
      "Immediately alert your team lead, provide a clear diagnosis of the bug, and propose a fallback script or rollback while working on a hotfix",
      "Conceal the bug and hope the client does not click the checkout button during the presentation",
      "Call in sick and leave the demo to your teammates without warning",
      "Blame the junior developer publicly in front of the client during the demo"
    ],
    "correctAnswer": 0,
    "explanation": "Proactive communication, transparent escalation, and proposing mitigating fallbacks reflect high professional ownership."
  },
  {
    "id": "hr-mcq-02",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "easy",
    "question": "During a code review, a senior engineer leaves critical comments on your pull request pointing out memory leaks in your algorithm. How should you react?",
    "options": [
      "Thank the reviewer for catching the leak, ask clarifying questions if needed, and refactor the code to eliminate the leak",
      "Get defensive and argue that memory is cheap so leaks don't matter",
      "Delete your pull request and complain about the senior engineer to HR",
      "Ignore the comments and merge the code anyway because you have admin privileges"
    ],
    "correctAnswer": 0,
    "explanation": "Constructive code review feedback is an educational opportunity to harden code quality, not a personal attack."
  },
  {
    "id": "hr-mcq-03",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "easy",
    "question": "An interviewer asks you: 'What is your expected salary?' As a campus fresher, what is the best diplomatic response?",
    "options": [
      "'I am focused on finding the right role to launch my career; I am confident the company offers competitive compensation aligned with industry standards for fresh graduates.'",
      "'I want at least double what you are offering to others.'",
      "'Whatever you want to give me, I am desperate.'",
      "'I will not answer until you tell me everyone else's salary.'"
    ],
    "correctAnswer": 0,
    "explanation": "Focusing on role fit and industry-standard competitiveness demonstrates professionalism without prematurely under-pricing or over-pricing yourself."
  },
  {
    "id": "hr-mcq-04",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "easy",
    "question": "When an interviewer asks: 'Do you have any questions for us?' at the end of the interview, what should you do?",
    "options": [
      "Ask thoughtful questions about their engineering culture, technical challenges, or team roadmap",
      "Say 'No, I have no questions' and immediately get up to leave",
      "Ask 'Did I pass the interview and how much bonus do I get?'",
      "Ask what time everyone leaves the office on Fridays"
    ],
    "correctAnswer": 0,
    "explanation": "Asking intelligent questions about engineering culture, deployment pipelines, or team goals proves genuine interest and engagement."
  },
  {
    "id": "hr-mcq-05",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "medium",
    "question": "Your project manager assigns you a feature using a programming language you have never used before. How do you handle it?",
    "options": [
      "Embrace the challenge, research language fundamentals, review existing team repositories for patterns, and estimate a realistic onboarding ramp-up",
      "Refuse the task and insist you only write code in languages you learned in college",
      "Pretend you are an expert and write uncompilable code",
      "Outsource the task to an external freelance forum"
    ],
    "correctAnswer": 0,
    "explanation": "Technical agility and willingness to learn new ecosystems are primary traits evaluated in software hires."
  },
  {
    "id": "hr-mcq-06",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "medium",
    "question": "A teammate takes credit during a company all-hands meeting for a caching architecture that you solely designed and implemented. What is the mature response?",
    "options": [
      "Speak privately with the teammate after the meeting, express your concern calmly, and ensure future commit histories and documentation reflect accurate authorship",
      "Interrupt the all-hands meeting and call them a thief in front of executive management",
      "Sabotage their code repository in secret",
      "File an immediate lawsuit against the company"
    ],
    "correctAnswer": 0,
    "explanation": "Private, direct communication de-escalates conflict while establishing clear boundaries and verifiable documentation."
  },
  {
    "id": "hr-mcq-07",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "medium",
    "question": "You observe a senior colleague repeatedly making dismissive remarks to a new intern during technical design discussions. What is the most ethical action?",
    "options": [
      "Support the intern by actively validating their ideas in the meeting, and discuss the pattern constructively with your engineering manager or mentor",
      "Join in with the senior colleague to gain their personal favor",
      "Ignore it completely because interns don't matter",
      "Post an anonymous rant on a public internet forum naming the colleague"
    ],
    "correctAnswer": 0,
    "explanation": "Fostering inclusive team environments by supporting marginalized peers and utilizing established leadership channels is ethical and effective."
  },
  {
    "id": "hr-mcq-08",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "medium",
    "question": "What is the primary reason interviewers ask behavioral questions like 'Tell me about a time you worked with a difficult person'?",
    "options": [
      "To evaluate your interpersonal empathy, emotional regulation, and ability to separate personal irritation from professional objectives",
      "To hear juicy gossip about your college professors or past employers",
      "To see if you will criticize everyone you have ever worked with",
      "To test if you are a pushover who agrees with abusive behavior"
    ],
    "correctAnswer": 0,
    "explanation": "Interviewers evaluate self-regulation, empathy, and constructive de-escalation when working with challenging personalities."
  },
  {
    "id": "hr-mcq-09",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "hard",
    "question": "You accidentally drop a production database table due to a misconfigured script. Nobody saw you do it. What do you do?",
    "options": [
      "Immediately report the incident to your lead and database administrator, explain what occurred transparently, and assist with point-in-time backup recovery",
      "Delete your command terminal logs and pretend a hacker did it",
      "Blame the cloud provider's availability zone outage",
      "Quietly close your laptop and walk away"
    ],
    "correctAnswer": 0,
    "explanation": "Integrity under crisis is the ultimate test of engineering ethics; immediate disclosure accelerates recovery and protects enterprise data."
  },
  {
    "id": "hr-mcq-10",
    "category": "hrBehavioral",
    "topic": "HR & Behavioral Scenarios",
    "difficulty": "hard",
    "question": "Why is cultural fit/add equally important to raw technical algorithmic score in placement selections?",
    "options": [
      "Because software engineering is a team sport; toxic or uncollaborative engineers drag down overall team velocity and retention regardless of individual coding speed",
      "Because companies prefer employees who have identical personal hobbies",
      "Because technical skills cannot be learned on the job",
      "It is not important; only raw coding speed matters in tech"
    ],
    "correctAnswer": 0,
    "explanation": "Collaboration, psychological safety, and communication velocity dictate long-term engineering organizational success."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['hrBehavioral'] = hrData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = hrData;
  }
})();
