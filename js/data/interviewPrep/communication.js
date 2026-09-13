/**
 * DevPilot-AI — Communication & Group Discussion Module
 * 100 scenario-based MCQs across 10 communication topics + 10 comprehensive GD Practice Topics.
 */

(function () {
  'use strict';

  const commData = {
    category: "communication",
    title: "Communication & Group Discussion",
    description: "Group discussion dynamics, presentation skills, active listening, leadership, and workplace communication.",
    icon: "forum",
    totalTopics: 10,
    topics: [
  "Group Discussion Fundamentals",
  "GD Opening & Closing",
  "GD Communication Skills",
  "GD Do's & Don'ts",
  "Leadership & Team Behaviour",
  "Extempore",
  "Presentation Skills",
  "Active Listening",
  "Professional Communication",
  "Email & Workplace Communication"
],
    practiceTopics: [
  {
    "id": "gd-topic-01",
    "title": "AI in Education: Boon or Bane?",
    "category": "Technology & Society",
    "openingApproach": "Open by establishing the shift from rote learning to personalized adaptive learning, while emphasizing the ethical risks of plagiarism and erosion of critical thinking.",
    "pointsFor": [
      "Personalized learning paths tailored to individual student speeds and weaknesses",
      "24/7 intelligent tutoring accessible to students in under-resourced regions",
      "Automates administrative grading for teachers, freeing time for one-on-one mentorship",
      "Real-time language translation breaking linguistic barriers for global knowledge"
    ],
    "pointsAgainst": [
      "Over-reliance on AI may atrophy foundational problem-solving and writing skills",
      "Academic integrity and homework verification become difficult to monitor",
      "Digital divide: affluent students gain access to premium models while marginalized lack hardware",
      "AI hallucinations and bias in training data can propagate factual inaccuracies"
    ],
    "examples": [
      "Khan Academy's Khanmigo tutoring assistant acting as a Socratic tutor rather than providing direct answers",
      "Universities reworking curricula toward oral examinations and in-class problem solving to counter generative essays"
    ],
    "conclusionStrategy": "Advocate for AI as a cognitive amplifier and pedagogical co-pilot rather than an autonomous educator; balance technological tooling with human-led critical thinking."
  },
  {
    "id": "gd-topic-02",
    "title": "Will AI Replace Software Engineers or Augment Them?",
    "category": "Employment & Tech Industry",
    "openingApproach": "Acknowledge rapid advances in generative code models (GitHub Copilot, Devin) while grounding the discussion in the reality that engineering is 80% requirements, system design, and communication, and 20% syntax.",
    "pointsFor": [
      "AI handles repetitive boilerplate, CRUD endpoints, and syntax generation with high speed",
      "Junior developers can upskill faster with interactive codebase explainers and instant documentation",
      "Enables smaller engineering teams to build complex, full-scale enterprise products",
      "Automates test generation, static linting, and vulnerability scanning"
    ],
    "pointsAgainst": [
      "AI models struggle with novel domain logic, distributed edge cases, and high-level architectural trade-offs",
      "Generated code often contains subtle security vulnerabilities and subtle hallucinations",
      "Software engineering requires stakeholder negotiation and human empathy, which AI lacks",
      "Over-reliance may produce developers who cannot debug low-level core runtime faults"
    ],
    "examples": [
      "High-level programming languages (C, Java) historically didn't eliminate programmers—they increased overall software demand exponentially",
      "Teams using AI coding assistants report 30-55% faster task completion but still require senior engineers for code review"
    ],
    "conclusionStrategy": "Conclude that AI won't replace engineers, but engineers who skillfully wield AI tools will replace those who do not. Software engineering is shifting toward system architecture and verification."
  },
  {
    "id": "gd-topic-03",
    "title": "Remote Work vs Return to Office: Finding the Balance",
    "category": "Workplace & Culture",
    "openingApproach": "Highlight how the pandemic permanently disrupted the traditional 9-to-5 corporate paradigm, and frame the debate as flexibility and global talent access versus spontaneous collaboration and team culture.",
    "pointsFor": [
      "Elimination of long commutes reduces employee burnout and improves work-life balance",
      "Access to global talent pools without geographical relocation constraints",
      "Substantial cost savings for companies on commercial real estate and utility overhead",
      "Higher uninterrupted focus time for deep programming and creative tasks"
    ],
    "pointsAgainst": [
      "Spontaneous water-cooler innovation and cross-team serendipity are drastically diminished",
      "Onboarding and mentoring fresh graduates and junior engineers is harder asynchronously",
      "Blurred boundaries between professional and personal life can lead to chronic burnout",
      "Isolation and lack of human connection weaken organizational belonging and team cohesion"
    ],
    "examples": [
      "GitLab operating as a fully remote enterprise with asynchronous documentation handbooks",
      "Hybrid models (e.g. 3 days office, 2 days remote) adopted by major tech companies to reconcile both benefits"
    ],
    "conclusionStrategy": "Propose outcome-driven hybrid models with intentional office days dedicated to architecture whiteboard sessions, retrospectives, and social bonding, reserving remote days for deep execution."
  },
  {
    "id": "gd-topic-04",
    "title": "Social Media: Connectivity Catalyst or Mental Health Crisis?",
    "category": "Mental Health & Media",
    "openingApproach": "Acknowledge that while social platforms democratized news and global human connection, algorithmic engagement loops have engineered addictive feedback cycles affecting youth mental wellness.",
    "pointsFor": [
      "Instantaneous global connectivity with friends, communities, and professional networks",
      "Democratization of information, citizen journalism, and independent commerce",
      "Platform for social justice movements and raising awareness on pressing global issues",
      "Micro-learning opportunities and dissemination of educational content"
    ],
    "pointsAgainst": [
      "Algorithmic dopamine loops foster addiction, shortened attention spans, and insomnia",
      "Curated highlights create unrealistic lifestyle comparisons leading to anxiety and depression",
      "Echo chambers and rage-bait engagement models polarize societal discourse",
      "Spread of unverified misinformation and online harassment"
    ],
    "examples": [
      "EU Digital Services Act holding algorithmic platforms accountable for addictive designs targeting minors",
      "Crowdfunding and disaster relief campaigns organizing through viral social networks during crises"
    ],
    "conclusionStrategy": "Advocate for digital hygiene, transparent algorithmic governance, and platform accountability, emphasizing that technology should serve human flourishing rather than monetization of attention."
  },
  {
    "id": "gd-topic-05",
    "title": "Cybersecurity in the Age of Connected Everything (IoT)",
    "category": "Information Security",
    "openingApproach": "Frame the explosion of smart devices as expanding the attack surface into our physical environments—homes, hospitals, power grids, and connected vehicles.",
    "pointsFor": [
      "Connected IoT drives industrial automation, remote patient monitoring, and smart city efficiency",
      "Automated sensor grids detect structural flaws, energy waste, and environmental anomalies early",
      "Increases economic productivity and convenience in everyday consumer lives"
    ],
    "pointsAgainst": [
      "Cheap IoT hardware frequently ships with hardcoded credentials and zero firmware update mechanisms",
      "Compromised consumer devices are co-opted into massive botnets (e.g. Mirai) executing DDoS attacks",
      "Severe physical safety hazards when medical equipment, connected cars, or electrical grids are breached",
      "Intrusive data collection creates persistent surveillance risks in private living spaces"
    ],
    "examples": [
      "The Mirai botnet crippling major internet DNS infrastructure using infected smart cameras and routers",
      "Zero-Trust requirements mandated by defense departments for any connected edge device"
    ],
    "conclusionStrategy": "Recommend security-by-design standards: mandatory security certification for commercial IoT, automated patch distribution, and network segmentation isolating IoT devices from critical infrastructure."
  },
  {
    "id": "gd-topic-06",
    "title": "Climate Change: Technology Solutions vs Lifestyle Changes",
    "category": "Environment & Sustainability",
    "openingApproach": "Frame the climate crisis as requiring both supply-side technological breakthroughs and demand-side cultural and behavioral consumption shifts.",
    "pointsFor": [
      "Renewable energy, nuclear fission/fusion, and green hydrogen provide scalable decarbonization",
      "Direct carbon capture and advanced battery chemistry directly address industrial emissions",
      "Precision agriculture and lab-grown proteins reduce land and water usage at scale"
    ],
    "pointsAgainst": [
      "Technological optimism creates moral hazard, delaying urgent carbon reduction commitments",
      "Hyper-consumerism and infinite economic growth models on a finite planet remain unsustainable",
      "Developing nations bear disproportionate impacts while contributing historical minimums",
      "High costs and raw material extraction (lithium, cobalt) carry ecological consequences"
    ],
    "examples": [
      "Costa Rica powering over 98% of its national grid from renewable energy for consecutive years",
      "Global circular economy regulations mandating right-to-repair to curb electronic waste"
    ],
    "conclusionStrategy": "Synthesize that technology provides the scalable tools, but societal commitment to circular economy, sustainable lifestyle choices, and equitable policy provide the will to avert catastrophe."
  },
  {
    "id": "gd-topic-07",
    "title": "Startup vs MNC for Fresh Engineering Graduates",
    "category": "Career & Corporate Strategy",
    "openingApproach": "Establish that there is no universal right choice; the optimal decision depends entirely on an individual's risk tolerance, desire for breadth versus depth, and long-term career aspirations.",
    "pointsFor": [
      "Startup Advantages: Rapid end-to-end ownership, steep learning curve, direct exposure to founders and business metrics, fast promotion cycles",
      "MNC Advantages: Structured training programs, mentorship from seasoned architects, brand equity on resume, work-life balance, competitive stability"
    ],
    "pointsAgainst": [
      "Startup Disadvantages: High runway risk, lack of formal documentation, potential chaos and long hours, limited compensation stability",
      "MNC Disadvantages: Siloed roles working on narrow features, slower decision-making bureaucracy, feeling like a cog in a machine"
    ],
    "examples": [
      "Engineers at early startups writing backend, DevOps, and frontend code within their first month",
      "Engineers at big tech learning enterprise-scale code review standards and distributed systems handling millions of QPS"
    ],
    "conclusionStrategy": "Conclude by advising freshers to evaluate their personal priorities: choose an MNC for foundational software engineering rigor and stability, or a high-growth startup for accelerated ownership and entrepreneurial hustle."
  },
  {
    "id": "gd-topic-08",
    "title": "College Degrees vs Skill-Based Hiring in Tech",
    "category": "Education & Hiring",
    "openingApproach": "Address the rapid shift in tech recruitment from pedigree-based credentialing toward demonstrated technical competence, public portfolios, and problem-solving ability.",
    "pointsFor": [
      "GitHub repositories, open-source contributions, and live demos prove actual ability far better than GPA",
      "Self-taught engineers and boot camp graduates often exhibit high hunger, agility, and modern framework fluency",
      "Democratizes upward socioeconomic mobility for talented individuals who cannot afford university tuition",
      "Tech stacks evolve faster than traditional university computer science curricula can update"
    ],
    "pointsAgainst": [
      "University computer science degrees instill foundational rigor (DSA, OS, compilers, discrete mathematics)",
      "College provides soft skill development: teamwork, campus placements, diverse peer networks, and research exposure",
      "Without standardized degree filters, enterprise recruitment pipelines face massive screening volumes",
      "Accreditation ensures ethical education and structured evaluation standards"
    ],
    "examples": [
      "Major tech giants (Google, Apple, IBM) officially dropping 4-year degree requirements for software roles",
      "Competitive programming platforms (LeetCode, Codeforces) and hackathons serving as direct recruitment funnels"
    ],
    "conclusionStrategy": "Propose a hybrid hiring reality: while foundational computer science principles are timeless, employers should prioritize demonstrated practical capability and portfolio proof over college pedigree alone."
  },
  {
    "id": "gd-topic-09",
    "title": "Online Privacy vs National Security: The Encryption Dilemma",
    "category": "Law & Cyber Ethics",
    "openingApproach": "Frame the fundamental conflict between civil liberties and state security: should governments possess lawful backdoors to encrypted communications to thwart crime, or does any backdoor inevitably compromise security for all?",
    "pointsFor": [
      "National Security: Law enforcement requires actionable intelligence to intercept terrorism, organized crime, and human trafficking",
      "Accountability: Tech conglomerates should not operate beyond sovereign legal jurisdictions"
    ],
    "pointsAgainst": [
      "Mathematical Reality: There is no such thing as a backdoor only for 'the good guys'—any vulnerability will be exploited by hostile state actors and cybercriminals",
      "Civil Liberties: End-to-end encryption protects journalists, dissidents, banking transactions, and personal privacy",
      "Economic Trust: Global digital commerce relies fundamentally on unbroken cryptographic protocols"
    ],
    "examples": [
      "The Apple vs FBI dispute over unlocking the San Bernardino shooter's iPhone",
      "Signal and WhatsApp upholding end-to-end encryption protocols globally despite government pushback"
    ],
    "conclusionStrategy": "Conclude that cryptographic backdoors undermine the security architecture of the entire internet. Law enforcement must invest in targeted intelligence and endpoint analysis rather than compromising mathematical encryption standards."
  },
  {
    "id": "gd-topic-10",
    "title": "Electric Vehicles (EVs): Are They Truly Green?",
    "category": "Automotive & Energy",
    "openingApproach": "Examine EVs beyond tailpipe emissions, analyzing their full lifecycle environmental footprint from raw material mining and manufacturing to battery recycling and grid electricity generation.",
    "pointsFor": [
      "Zero tailpipe emissions eliminate toxic nitrogen oxides and particulates from dense urban centers",
      "Electric motors are ~85-90% energy efficient compared to internal combustion engines (~20-25%)",
      "As electrical grids transition to renewables (solar/wind), existing EV fleets automatically become cleaner without modifying vehicles"
    ],
    "pointsAgainst": [
      "Battery manufacturing requires lithium, cobalt, and nickel mining with severe ecological and humanitarian impacts",
      "In regions where power grids rely predominantly on coal, charging an EV still carries an indirect carbon burden",
      "Battery recycling infrastructure is currently nascent and capital-intensive",
      "Vehicle weight increases tire wear and roadway microplastic emissions"
    ],
    "examples": [
      "Lifecycle carbon footprint studies showing EVs reach a carbon break-even point with gas cars within 15,000–30,000 km of driving",
      "Advances in Lithium Iron Phosphate (LFP) and sodium-ion batteries eliminating reliance on rare cobalt"
    ],
    "conclusionStrategy": "Conclude that while EVs are not zero-impact, their lifecycle emissions are significantly lower than fossil-fuel vehicles. Sustainable success requires pairing EV adoption with green grid expansion and circular battery recycling."
  }
],
    questions: [
  {
    "id": "comm-gdf-01",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "easy",
    "question": "What is the primary evaluation objective of an interviewer in a Group Discussion?",
    "options": [
      "Assessing interpersonal collaboration, structured thought, and clear communication",
      "Counting how many times you interrupted others",
      "Testing who can shout the loudest to dominate the room",
      "Evaluating who writes the most notes during the discussion"
    ],
    "correctAnswer": 0,
    "explanation": "A GD evaluates interpersonal collaboration, ability to articulate structured viewpoints, listening skills, and leadership in a group setting."
  },
  {
    "id": "comm-gdf-02",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "easy",
    "question": "What is the recommended attitude during a placement group discussion?",
    "options": [
      "Collaborative and assertive",
      "Aggressive and domineering",
      "Completely passive and quiet",
      "Argumentative and dismissive"
    ],
    "correctAnswer": 0,
    "explanation": "An assertive yet collaborative approach demonstrates leadership and team spirit without appearing hostile."
  },
  {
    "id": "comm-gdf-03",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "easy",
    "question": "If you do not have deep knowledge about the given GD topic, what is the best strategy?",
    "options": [
      "Listen intently to initial speakers, analyze their points, and contribute a structured synthesis or fresh angle",
      "Remain completely silent throughout the entire discussion",
      "Make up fictional statistics to sound authoritative",
      "Interrupt the first speaker immediately and change the topic"
    ],
    "correctAnswer": 0,
    "explanation": "Active listening allows you to gather context and contribute meaningfully by summarizing, structuring, or offering logical deductions."
  },
  {
    "id": "comm-gdf-04",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "easy",
    "question": "What role does body language play in a physical or virtual Group Discussion?",
    "options": [
      "Open posture, steady eye contact, and nodding indicate engagement and confidence",
      "Slouching demonstrates that you are relaxed and confident",
      "Avoiding eye contact prevents confrontation with evaluators",
      "Crossing arms tightly projects authority and dominance"
    ],
    "correctAnswer": 0,
    "explanation": "Open posture and natural eye contact signal confidence, professional respect, and attentiveness."
  },
  {
    "id": "comm-gdf-05",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "medium",
    "question": "You notice the GD is degenerating into a chaotic fish market where multiple people are shouting. What is the best leadership action?",
    "options": [
      "Politely and firmly say: 'Friends, we are speaking over each other. Let us hear one speaker at a time so everyone's point is heard.'",
      "Shout louder than everyone else to establish command",
      "Complain directly to the evaluator that the group is undisciplined",
      "Put your head down and wait for time to expire"
    ],
    "correctAnswer": 0,
    "explanation": "Moderating the group with a calm, constructive intervention demonstrates genuine leadership and emotional intelligence."
  },
  {
    "id": "comm-gdf-06",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "medium",
    "question": "How long should an ideal single contribution in a GD last?",
    "options": [
      "30 to 45 seconds",
      "3 to 4 minutes",
      "5 to 10 seconds",
      "As long as you have breath"
    ],
    "correctAnswer": 0,
    "explanation": "Crisp contributions of 30-45 seconds allow you to deliver a sharp point with reasoning while leaving room for healthy group dialogue."
  },
  {
    "id": "comm-gdf-07",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "medium",
    "question": "In a GD, what does generating a 'consensus' mean?",
    "options": [
      "Working toward identifying shared viewpoints and balanced conclusions across diverse perspectives",
      "Forcing all participants to agree with your personal opinion",
      "Taking a majority vote like a political election",
      "Agreeing with the loudest speaker to avoid conflict"
    ],
    "correctAnswer": 0,
    "explanation": "Consensus in GDs means synthesizing the core arguments of the group into a cohesive, balanced conclusion."
  },
  {
    "id": "comm-gdf-08",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "medium",
    "question": "A fellow participant presents a factually incorrect claim during the GD. How should you address it?",
    "options": [
      "'That is an interesting viewpoint; however, recent industry data indicates that...' and state the correct fact politely",
      "'You are completely wrong and do not know what you are talking about.'",
      "Laugh loudly to discredit their argument in front of the evaluator",
      "Stay quiet and allow the evaluator to fail them"
    ],
    "correctAnswer": 0,
    "explanation": "Respectful disagreement using data maintains professional decorum and shows emotional maturity."
  },
  {
    "id": "comm-gdf-09",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "hard",
    "question": "What should you do if an introverted participant has not had an opportunity to speak?",
    "options": [
      "Invite them warmly: 'We have not heard from Rahul yet; Rahul, what are your thoughts on this aspect?'",
      "Keep speaking to fill the silence so the evaluator remains impressed with your fluency",
      "Tell the evaluator that Rahul is not participating",
      "Ignore them because competition is ruthless"
    ],
    "correctAnswer": 0,
    "explanation": "Encouraging silent participants is one of the highest leadership qualities evaluated in placement GDs."
  },
  {
    "id": "comm-gdf-10",
    "category": "communication",
    "topic": "Group Discussion Fundamentals",
    "difficulty": "hard",
    "question": "Which metric is NOT typically scored by corporate GD evaluators?",
    "options": [
      "Physical volume of voice and number of interruptions made",
      "Clarity of thought and logical structuring",
      "Active listening and openness to other viewpoints",
      "Knowledge depth and relevant real-world examples"
    ],
    "correctAnswer": 0,
    "explanation": "Evaluators penalize interruptions and shouting; volume is not a substitute for substance."
  },
  {
    "id": "comm-goc-01",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "easy",
    "question": "What is the primary benefit of initiating (opening) a Group Discussion?",
    "options": [
      "It gives you an early opportunity to set the context and framework for the topic",
      "It guarantees an automatic selection regardless of what you say later",
      "It allows you to finish your quota of speaking early so you can relax",
      "It stops other candidates from expressing their views"
    ],
    "correctAnswer": 0,
    "explanation": "Initiating gives high visibility and sets the stage, provided the opening is meaningful and well-defined."
  },
  {
    "id": "comm-goc-02",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "easy",
    "question": "When is opening a GD dangerous or counter-productive?",
    "options": [
      "When you don't fully understand the topic and make vague, incorrect statements",
      "When you have strong statistics and a clear definition",
      "When you speak in grammatically correct English",
      "When you outline the discussion structure"
    ],
    "correctAnswer": 0,
    "explanation": "Starting without solid knowledge leads to awkward stuttering, incorrect definitions, or flawed frameworks that harm your evaluation."
  },
  {
    "id": "comm-goc-03",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "easy",
    "question": "What constitutes a strong opening statement for a GD on 'Electric Vehicles in India'?",
    "options": [
      "A crisp definition of the EV transition, highlighting environmental benefits and infrastructure hurdles, followed by opening the floor",
      "Saying 'Hello everyone, EVs are good cars and I like them very much.'",
      "Speaking for 3 straight minutes without letting anyone else speak",
      "Asking the evaluator to explain the topic first"
    ],
    "correctAnswer": 0,
    "explanation": "A strong opening defines scope, states core dimensions (pros and challenges), and invites collective discussion."
  },
  {
    "id": "comm-goc-04",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "easy",
    "question": "Who should summarize or conclude the Group Discussion?",
    "options": [
      "A candidate who actively listened, captured the group's diverse arguments, and presents an objective synthesis",
      "The candidate who spoke the most during the discussion",
      "The candidate who disagreed with everyone",
      "The first candidate who looks at their watch"
    ],
    "correctAnswer": 0,
    "explanation": "A good conclusion must be an unbiased reflection of the collective arguments made during the discussion."
  },
  {
    "id": "comm-goc-05",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "medium",
    "question": "What should a strong GD conclusion NOT include?",
    "options": [
      "Introducing brand-new arguments that were never discussed by the group",
      "Summarizing the major points for and against",
      "Highlighting areas where the group found consensus",
      "Delivering a forward-looking balanced perspective"
    ],
    "correctAnswer": 0,
    "explanation": "A conclusion must summarize existing arguments; introducing new points at the closing is a major tactical error."
  },
  {
    "id": "comm-goc-06",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "medium",
    "question": "If the evaluator suddenly announces: 'Time is up. Candidate 12, please conclude the discussion', and you are Candidate 12, what should you do?",
    "options": [
      "Briefly summarize: 'To conclude, our group discussed both sides... on one hand X, on the other hand Y, and we agreed that Z is the way forward.'",
      "Panic and say: 'Sir, I did not know I had to conclude.'",
      "Repeat your own personal opinion for two minutes",
      "Point out who spoke poorly during the round"
    ],
    "correctAnswer": 0,
    "explanation": "A poised candidate synthesizes the main arguments of the room cleanly and presents a balanced summary."
  },
  {
    "id": "comm-goc-07",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "medium",
    "question": "What is an effective quote or hook to initiate a GD on 'Digital Privacy'?",
    "options": [
      "'As the adage goes, if you are not paying for the product, you are the product.'",
      "'Privacy is a secret thing.'",
      "'I think computers are very dangerous.'",
      "'My friend once told me a funny story about passwords.'"
    ],
    "correctAnswer": 0,
    "explanation": "Using a relevant, thought-provoking industry maxim hooks attention and frames the debate with intellectual depth."
  },
  {
    "id": "comm-goc-08",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "medium",
    "question": "Two candidates attempt to start speaking at the exact same second to open the GD. What is the most poised response?",
    "options": [
      "Smile, make eye contact, and say: 'Please go ahead; I will follow up right after you.'",
      "Shout over them to prove you started a millisecond earlier",
      "Complain to the invigilator that they took your turn",
      "Go silent and refuse to participate for the rest of the GD"
    ],
    "correctAnswer": 0,
    "explanation": "Yielding with grace showcases confidence, composure, and exceptional interpersonal maturity."
  },
  {
    "id": "comm-goc-09",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "hard",
    "question": "In a 10-minute GD, approximately when should the group naturally pivot toward conclusion and solutions?",
    "options": [
      "Around the 8th or 9th minute",
      "At the 2nd minute",
      "Never; the debate should end with an argument",
      "In the first 30 seconds"
    ],
    "correctAnswer": 0,
    "explanation": "Allocating the final 1.5–2 minutes to solutions and synthesis ensures the discussion finishes on a constructive, mature note."
  },
  {
    "id": "comm-goc-10",
    "category": "communication",
    "topic": "GD Opening & Closing",
    "difficulty": "hard",
    "question": "What is the difference between a 'Summary' and a 'Conclusion' in a Group Discussion?",
    "options": [
      "A summary recaps the arguments objectively; a conclusion highlights the synthesized consensus and path forward",
      "They are identical in every way",
      "A summary is your personal view; a conclusion is what others said",
      "A summary is done at the start; a conclusion at the end"
    ],
    "correctAnswer": 0,
    "explanation": "A summary recaps the points raised; a conclusion extracts the synthesis, consensus, and actionable recommendations."
  },
  {
    "id": "comm-gcs-01",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "easy",
    "question": "Which tone of voice is most effective in a professional GD?",
    "options": [
      "Audible, calm, and conversational",
      "Monotone and whispering",
      "Aggressively loud and booming",
      "Sarcastic and theatrical"
    ],
    "correctAnswer": 0,
    "explanation": "A calm, well-modulated, audible voice conveys composure and authority."
  },
  {
    "id": "comm-gcs-02",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "easy",
    "question": "What is the best way to structure an argument in a technical or business GD?",
    "options": [
      "PREP framework: Point, Reason, Example, Point",
      "Stating opinions without any facts or reasons",
      "Telling long personal anecdotes",
      "Quoting movie dialogues"
    ],
    "correctAnswer": 0,
    "explanation": "The PREP formula (Point -> Reason -> Example -> Point) provides concise, memorable, and persuasive argumentation."
  },
  {
    "id": "comm-gcs-03",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "easy",
    "question": "How should you transition into a discussion when someone finishes speaking?",
    "options": [
      "'Building upon what Ananya mentioned regarding cloud costs, another critical aspect is...'",
      "'That was boring, listen to me now.'",
      "'You are wrong, here is the truth.'",
      "'Okay, next topic please.'"
    ],
    "correctAnswer": 0,
    "explanation": "Connecting to a peer's point before introducing your perspective demonstrates active listening and collaborative cohesion."
  },
  {
    "id": "comm-gcs-04",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "easy",
    "question": "What should you do when you notice your English vocabulary is slipping during a sentence?",
    "options": [
      "Pause, take a breath, use simpler everyday words, and convey the core thought clearly",
      "Switch entirely to your regional language and yell",
      "Freeze and stop speaking midway through the thought",
      "Apologize repeatedly for poor grammar"
    ],
    "correctAnswer": 0,
    "explanation": "Simple, grammatically clear English is far superior to complex vocabulary that breaks your train of thought."
  },
  {
    "id": "comm-gcs-05",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "medium",
    "question": "Why is articulation and modulation important in group communication?",
    "options": [
      "It emphasizes key points and keeps listeners engaged without sounding monotonous",
      "It tricks the evaluator into thinking you are a native speaker",
      "It ensures nobody else can understand your strategy",
      "It helps you speak twice as fast as others"
    ],
    "correctAnswer": 0,
    "explanation": "Voice modulation helps highlight critical insights and maintains the listener's attention."
  },
  {
    "id": "comm-gcs-06",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "medium",
    "question": "What does 'paraphrasing' mean in a GD context?",
    "options": [
      "Briefly restating someone else's point in your own words before adding your perspective",
      "Copying someone's exact words and claiming them as your idea",
      "Translating a foreign word into English",
      "Writing notes on a piece of paper"
    ],
    "correctAnswer": 0,
    "explanation": "Paraphrasing validates the previous speaker and demonstrates comprehension before extending the discussion."
  },
  {
    "id": "comm-gcs-07",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "medium",
    "question": "When participating in a virtual GD over Zoom/Teams, where should you direct your gaze while speaking?",
    "options": [
      "Directly into the webcam lens to simulate eye contact with participants",
      "At your own thumbnail in the bottom corner",
      "Out the window to appear relaxed",
      "Down at your mobile phone"
    ],
    "correctAnswer": 0,
    "explanation": "Looking into the camera lens creates the psychological perception of direct eye contact for remote evaluators."
  },
  {
    "id": "comm-gcs-08",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "medium",
    "question": "How can you diplomatically interrupt someone who has been monopolizing the conversation for over 2 minutes?",
    "options": [
      "'Pardon the interruption, Arjun—you have raised a very valuable point on scalability; I’d love to quickly add how this impacts cost...'",
      "'Stop talking Arjun, you are speaking too much.'",
      "Clap your hands loudly until they stop",
      "Interrupt their microphone in the meeting settings"
    ],
    "correctAnswer": 0,
    "explanation": "Polite validation combined with an assertive pivot gently reclaims the floor for the group without confrontation."
  },
  {
    "id": "comm-gcs-09",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "hard",
    "question": "What is the danger of using technical jargon excessively in a general placement GD?",
    "options": [
      "It alienates non-technical participants and obscures the clarity of your core argument",
      "It makes you look too intelligent for the job",
      "Evaluators automatically deduct 50% marks for technical terms",
      "Jargon is prohibited by corporate laws"
    ],
    "correctAnswer": 0,
    "explanation": "Effective communicators explain complex concepts in accessible terms; excessive jargon signals poor stakeholder empathy."
  },
  {
    "id": "comm-gcs-10",
    "category": "communication",
    "topic": "GD Communication Skills",
    "difficulty": "hard",
    "question": "Which rhetorical device is most persuasive when discussing policy topics in GDs?",
    "options": [
      "Cause-and-effect reasoning supported by credible empirical precedents",
      "Emotional appeals and personal outrage",
      "Conspiracy theories found on internet forums",
      "Humorous roasting of government figures"
    ],
    "correctAnswer": 0,
    "explanation": "Logical cause-and-effect with empirical precedents creates an intellectually bulletproof argument."
  },
  {
    "id": "comm-dd-01",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "easy",
    "question": "Which of the following is a strict DON'T in a Group Discussion?",
    "options": [
      "Pointing fingers aggressively at other candidates while speaking",
      "Making notes of important points raised by peers",
      "Nodding when another participant makes a valid point",
      "Synthesizing two opposing viewpoints"
    ],
    "correctAnswer": 0,
    "explanation": "Aggressive body language such as finger-pointing or table-thumping leads to severe negative marking."
  },
  {
    "id": "comm-dd-02",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "easy",
    "question": "Which of the following is a recommended DO in a Group Discussion?",
    "options": [
      "Demonstrate active listening through nodding and acknowledging peer contributions",
      "Interrupt every speaker after 5 seconds",
      "Speak continuously for the first 5 minutes to dominate the time",
      "Stare directly at the evaluator to seek approval"
    ],
    "correctAnswer": 0,
    "explanation": "Active listening demonstrates team play, which is a core placement evaluation criterion."
  },
  {
    "id": "comm-dd-03",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "easy",
    "question": "Should you look at the evaluator while speaking in a GD?",
    "options": [
      "No, you should address and maintain eye contact with the fellow candidates",
      "Yes, you should exclusively look at the evaluator because they give the marks",
      "Yes, evaluators expect to be addressed directly as 'Sir/Madam'",
      "You should close your eyes to concentrate"
    ],
    "correctAnswer": 0,
    "explanation": "A GD is an interaction among peers; addressing the evaluator turns it into a speech rather than a group dialogue."
  },
  {
    "id": "comm-dd-04",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "easy",
    "question": "Is it acceptable to change your stance during a Group Discussion if someone presents compelling evidence?",
    "options": [
      "Yes, acknowledging superior logic and evolving your perspective shows intellectual humility and maturity",
      "No, you must stubbornly defend your initial stance at all costs",
      "No, changing views is considered a sign of weakness and cowardice",
      "Only if the evaluator instructs you to switch"
    ],
    "correctAnswer": 0,
    "explanation": "Intellectual humility and adaptability based on data are highly valued corporate leadership traits."
  },
  {
    "id": "comm-dd-05",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "medium",
    "question": "What should you avoid when citing statistics in a GD?",
    "options": [
      "Quoting fabricated numbers without attribution ('100% of people hate remote work')",
      "Citing known organizations like the World Bank, RBI, or Gartner",
      "Using approximate figures ('roughly 60% of the market')",
      "Explaining the significance of the metric"
    ],
    "correctAnswer": 0,
    "explanation": "Fabricated or extreme statistics damage your credibility when evaluated by knowledgeable interviewers."
  },
  {
    "id": "comm-dd-06",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "medium",
    "question": "What is the best way to handle a topic you know nothing about?",
    "options": [
      "Allow others to establish the context, identify key themes, and contribute to logical analysis or process solutions",
      "Pretend you are an expert and invent false facts",
      "Walk out of the room immediately",
      "Argue that the topic is invalid and demand a new one"
    ],
    "correctAnswer": 0,
    "explanation": "Strategic active listening allows you to understand the subject and add value through framework structuring."
  },
  {
    "id": "comm-dd-07",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "medium",
    "question": "Why is taking notes during a GD encouraged?",
    "options": [
      "It helps you remember names and specific points to reference and build upon later",
      "It keeps your hands busy so you don't fidget",
      "The evaluator grades the neatness of your handwriting",
      "It prevents you from having to look at other candidates"
    ],
    "correctAnswer": 0,
    "explanation": "Noting down peer names and points enables personalized, cohesive rebuttals and synthesis."
  },
  {
    "id": "comm-dd-08",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "medium",
    "question": "When a participant is speaking, looking at your wristwatch or phone is viewed as:",
    "options": [
      "Disrespectful, disengaged, and unprofessional",
      "A sign of exceptional time management skills",
      "A demonstration of high productivity",
      "A power move that intimidates the speaker"
    ],
    "correctAnswer": 0,
    "explanation": "Checking watches or phones conveys disinterest and lack of basic professional respect."
  },
  {
    "id": "comm-dd-09",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "hard",
    "question": "What should you do if the topic is an abstract one, like 'Black or White'?",
    "options": [
      "Deconstruct the metaphor (e.g. absolutism vs nuance, binary code vs human complexity, compliance vs innovation)",
      "Complain that the topic makes no sense",
      "Talk about black and white shirts you own",
      "Remain silent until someone brings up politics"
    ],
    "correctAnswer": 0,
    "explanation": "Abstract topics test creative lateral thinking; mapping them to technological, philosophical, or business paradigms shows depth."
  },
  {
    "id": "comm-dd-10",
    "category": "communication",
    "topic": "GD Do's & Don'ts",
    "difficulty": "hard",
    "question": "If you spoke 4 times for 30 seconds with high impact vs someone who spoke once for 4 minutes with rambling filler, who scores higher?",
    "options": [
      "The candidate with concise, high-impact contributions",
      "The candidate with the 4-minute monologue",
      "Both will score identical marks",
      "Neither will pass"
    ],
    "correctAnswer": 0,
    "explanation": "Concise, frequent, high-substance contributions demonstrate precision, agility, and team collaboration."
  },
  {
    "id": "comm-ltb-01",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "easy",
    "question": "In a collaborative corporate setting, what defines authentic leadership?",
    "options": [
      "Empowering teammates, clearing obstacles, and driving collective outcomes",
      "Ordering people around and blaming subordinates for failures",
      "Doing all the work alone to prove superiority",
      "Taking full credit for all team accomplishments"
    ],
    "correctAnswer": 0,
    "explanation": "Servant leadership focuses on enabling team success, alignment, and collaborative problem-solving."
  },
  {
    "id": "comm-ltb-02",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "easy",
    "question": "When your project team encounters an unexpected technical roadblock, the leader should first:",
    "options": [
      "Gather the team to conduct root-cause analysis and brainstorm solutions without assigning blame",
      "Send an angry email to the entire department",
      "Conceal the roadblock from management until deadline day",
      "Immediately resign from the project"
    ],
    "correctAnswer": 0,
    "explanation": "Effective leaders maintain composure, focus on root cause, and foster psychological safety to solve problems."
  },
  {
    "id": "comm-ltb-03",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "easy",
    "question": "What is the hallmark of high psychological safety in an engineering team?",
    "options": [
      "Team members openly share mistakes, challenge ideas, and ask questions without fear of ridicule",
      "Nobody ever disagrees with the manager's technical proposals",
      "Zero bugs are ever reported in production logs",
      "All decisions are made exclusively by the most senior architect"
    ],
    "correctAnswer": 0,
    "explanation": "Psychological safety encourages vulnerability, transparent learning, and rapid innovation."
  },
  {
    "id": "comm-ltb-04",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "easy",
    "question": "How should a software lead handle credit allocation after a major product milestone?",
    "options": [
      "Publicly acknowledge and praise specific team member contributions while shouldering responsibility for shortcomings",
      "Claim the entire architectural success as their personal genius",
      "Distribute praise only to their personal friends",
      "Refuse to celebrate because work is expected"
    ],
    "correctAnswer": 0,
    "explanation": "Great leaders give credit away to their team and absorb responsibility during setbacks."
  },
  {
    "id": "comm-ltb-05",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "medium",
    "question": "Two senior developers have a fundamental architectural disagreement regarding SQL vs NoSQL. As the lead, what is the best resolution approach?",
    "options": [
      "Facilitate a structured spike/proof-of-concept where both options are benchmarked against agreed product requirements",
      "Pick your favorite developer and tell the other to be quiet",
      "Flip a coin to determine the architecture",
      "Cancel the project entirely"
    ],
    "correctAnswer": 0,
    "explanation": "Empirical benchmarking against objective business constraints depersonalizes technical debates."
  },
  {
    "id": "comm-ltb-06",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "medium",
    "question": "What is 'servant leadership' in modern agile software development?",
    "options": [
      "The leader's primary role is removing impediments and serving the team's operational needs",
      "The leader expects team members to act as personal servants",
      "The team works without any leadership or direction",
      "The Scrum Master writes all the code for developers"
    ],
    "correctAnswer": 0,
    "explanation": "Servant leadership flips traditional hierarchy: leaders support and empower autonomous teams."
  },
  {
    "id": "comm-ltb-07",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "medium",
    "question": "When delegating tasks to a junior developer, a good mentor provides:",
    "options": [
      "Clear context on the 'why', expected deliverables, and available guidance while encouraging autonomous problem solving",
      "Zero instructions and complete radio silence",
      "Micro-management by typing on their keyboard every 10 minutes",
      "Tasks with impossible deadlines to test their mental endurance"
    ],
    "correctAnswer": 0,
    "explanation": "Effective delegation balances clear expectations with autonomy and psychological support."
  },
  {
    "id": "comm-ltb-08",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "medium",
    "question": "A sprint deadline is approaching and the team is behind schedule. What is the most constructive action?",
    "options": [
      "Collaborate with the Product Owner to de-scope lower-priority features while protecting quality",
      "Force the team to work 18-hour days over the weekend",
      "Silently commit broken, untested code to claim completion",
      "Blame the QA engineers for taking too long to test"
    ],
    "correctAnswer": 0,
    "explanation": "De-scoping non-critical user stories preserves code quality, prevents burnout, and maintains predictability."
  },
  {
    "id": "comm-ltb-09",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "hard",
    "question": "What is the 'Tuckman model' of team development?",
    "options": [
      "Forming, Storming, Norming, Performing, Adjourning",
      "Planning, Coding, Testing, Deploying, Monitoring",
      "Hiring, Training, Reviewing, Promoting, Retiring",
      "Discovering, Prototyping, Scaling, Monetizing, Exiting"
    ],
    "correctAnswer": 0,
    "explanation": "Bruce Tuckman's model describes the psychological stages teams progress through to achieve peak performance."
  },
  {
    "id": "comm-ltb-10",
    "category": "communication",
    "topic": "Leadership & Team Behaviour",
    "difficulty": "hard",
    "question": "In a blameless post-mortem after an outage, what is the core guiding philosophy?",
    "options": [
      "Failures are systemic vulnerabilities in processes and tooling, not individual moral shortcomings",
      "Identify which developer pushed the bad commit and revoke their commit access",
      "Require the responsible engineer to write an apology letter to the CEO",
      "Pretend the incident never occurred to protect company PR"
    ],
    "correctAnswer": 0,
    "explanation": "Blameless post-mortems treat incidents as opportunities to harden automated safety guards and system architecture."
  },
  {
    "id": "comm-ext-01",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "easy",
    "question": "What does an 'Extempore' round primarily evaluate in a placement drive?",
    "options": [
      "Spontaneous thinking, composure, structured delivery, and fluency under time pressure",
      "Your ability to memorize a 20-page prepared essay",
      "How many fancy vocabulary words you can string together",
      "Your theatrical acting performance"
    ],
    "correctAnswer": 0,
    "explanation": "Extempore tests quick cognitive retrieval, emotional composure, and structured oral articulation with zero preparation."
  },
  {
    "id": "comm-ext-02",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "easy",
    "question": "You are given 1 minute to prepare for an extempore topic. How should you spend that minute?",
    "options": [
      "Structure 3 key points: a compelling hook/opening, 2-3 logical core pillars, and a forward-looking conclusion",
      "Panic and try to write out every single sentence word-for-word",
      "Ask the interviewer to change the topic to cricket",
      "Stare at the wall and wait for your turn"
    ],
    "correctAnswer": 0,
    "explanation": "A 3-pillar outline (Beginning, Middle, End) anchors your impromptu speech and prevents mental rambling."
  },
  {
    "id": "comm-ext-03",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "easy",
    "question": "If you draw the extempore topic: 'Cloud Computing: The Virtual Sky', what is a great opening angle?",
    "options": [
      "Demystify the metaphor: 'The cloud is simply someone else's computer operating at planetary scale with elasticity.'",
      "'Clouds are made of water vapor in the sky.'",
      "'I don't know anything about weather forecasting.'",
      "'Computers are very fast nowadays.'"
    ],
    "correctAnswer": 0,
    "explanation": "Grounding an abstract metaphor into technical and business reality immediately engages evaluators."
  },
  {
    "id": "comm-ext-04",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "easy",
    "question": "What should you do if you freeze for a few seconds during an extempore speech?",
    "options": [
      "Maintain composure, take a deep breath, say 'Excuse me', and smoothly transition to your next structured point",
      "Burst into tears and apologize repeatedly",
      "Sprint out of the interview room",
      "Start speaking gibberish to fill the sound"
    ],
    "correctAnswer": 0,
    "explanation": "A deliberate, composed pause is perceived as thoughtful reflection; panicking exposes loss of emotional control."
  },
  {
    "id": "comm-ext-05",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "medium",
    "question": "What is an effective framework for organizing impromptu extempore speeches?",
    "options": [
      "Past - Present - Future framework",
      "Random stream-of-consciousness",
      "Only talking about your college life",
      "Repeating the topic title 15 times"
    ],
    "correctAnswer": 0,
    "explanation": "The Past-Present-Future framework naturally structures historical context, current industry state, and future trajectory."
  },
  {
    "id": "comm-ext-06",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "medium",
    "question": "What is the recommended speaking duration for a standard placement extempore speech?",
    "options": [
      "1.5 to 2 minutes",
      "10 to 15 seconds",
      "10 to 12 minutes",
      "Until the interviewer cuts the microphone"
    ],
    "correctAnswer": 0,
    "explanation": "A crisp, structured delivery of 90-120 seconds hits all evaluation criteria without diluting substance."
  },
  {
    "id": "comm-ext-07",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "medium",
    "question": "How should you conclude an extempore speech?",
    "options": [
      "Summarize the core takeaway in one memorable line, thank the panel, and step back with a smile",
      "Say 'Yeah, that's all I know, thanks bye.'",
      "Abruptly stop talking mid-sentence when the timer buzzes",
      "Ask the judges what marks they will give you"
    ],
    "correctAnswer": 0,
    "explanation": "A definitive concluding takeaway delivered with gratitude leaves a polished, professional impression."
  },
  {
    "id": "comm-ext-08",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "medium",
    "question": "You are given an abstract topic: 'Zero'. How can you deliver a strong, multi-dimensional response?",
    "options": [
      "Discuss zero in mathematics (Aryabhata), computer science (binary 0 and index 0), and organizational culture (zero-defect mindset)",
      "Say zero is a circle and sit down",
      "Complain that zero has no value",
      "Talk about getting zero marks in a test"
    ],
    "correctAnswer": 0,
    "explanation": "Multi-disciplinary mapping (history, computer science, management) showcases intellectual breadth."
  },
  {
    "id": "comm-ext-09",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "hard",
    "question": "What role does pacing (cadence) play during an impromptu speech?",
    "options": [
      "A steady, measured cadence gives your brain time to formulate the next sentence while projecting confidence",
      "Speaking as fast as humanly possible proves superior intelligence",
      "Speaking so slowly that there are 10-second gaps between words",
      "Alternating between shouting and whispering"
    ],
    "correctAnswer": 0,
    "explanation": "A measured speaking pace (~120-140 words per minute) gives you cognitive runway to think ahead cleanly."
  },
  {
    "id": "comm-ext-10",
    "category": "communication",
    "topic": "Extempore",
    "difficulty": "hard",
    "question": "How should you handle controversial extempore topics (e.g., political or social debates)?",
    "options": [
      "Acknowledge multiple stakeholder perspectives, present objective arguments, and conclude with a balanced, constructive view",
      "Take an extreme, radical partisan stance and attack opponents",
      "Refuse to speak on grounds of personal sensitivity",
      "Claim that everyone who disagrees is evil"
    ],
    "correctAnswer": 0,
    "explanation": "Diplomatic objectivity and nuanced balance demonstrate executive presence and professional detachment."
  },
  {
    "id": "comm-prs-01",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "easy",
    "question": "What is the '10-20-30' rule of PowerPoint presentations popularized by Guy Kawasaki?",
    "options": [
      "10 slides, 20 minutes duration, minimum 30-point font size",
      "10 people in audience, 20 slides, 30 animations",
      "10 minutes, 20 slides, 30 graphics",
      "10 bullet points per slide, 20 words, 30 slides"
    ],
    "correctAnswer": 0,
    "explanation": "The rule enforces brevity and visual legibility: no more than 10 slides, 20 minutes, and 30pt font minimum."
  },
  {
    "id": "comm-prs-02",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "easy",
    "question": "What is the primary purpose of slide visual aids in a technical presentation?",
    "options": [
      "To support and amplify the speaker's narrative with clear diagrams and key takeaways",
      "To act as a complete teleprompter for the speaker to read word-for-word",
      "To cram as much unreadable source code as possible onto the screen",
      "To show fancy flying transitions and sound effects"
    ],
    "correctAnswer": 0,
    "explanation": "Slides exist to support the speaker's story visually, not to serve as a script to read aloud."
  },
  {
    "id": "comm-prs-03",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "easy",
    "question": "How should a speaker maintain engagement with a large audience during a presentation?",
    "options": [
      "Scan different sections of the room, make natural eye contact with individuals, and modulate vocal pitch",
      "Stare fixedly at the projection screen behind them",
      "Look exclusively at their laptop screen",
      "Close their eyes to recite memorized text"
    ],
    "correctAnswer": 0,
    "explanation": "Triangulating eye contact across the room creates an inclusive, conversational connection with the audience."
  },
  {
    "id": "comm-prs-04",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "easy",
    "question": "When presenting your final-year engineering capstone project, what should the first slide establish?",
    "options": [
      "The core problem statement, why it matters, and who is affected",
      "The entire 500-line database schema",
      "Your resume and high school marks",
      "A list of apologies for incomplete features"
    ],
    "correctAnswer": 0,
    "explanation": "Framing the real-world problem and its business/social significance hooks the audience before technical deep-dives."
  },
  {
    "id": "comm-prs-05",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "medium",
    "question": "What is the 'Rule of Thirds' when designing presentation slides?",
    "options": [
      "A visual composition principle placing focal content at intersecting grid points for maximum visual appeal",
      "Dividing every slide into exactly three paragraphs",
      "Giving three presentations every day",
      "Allowing only one-third of the audience to ask questions"
    ],
    "correctAnswer": 0,
    "explanation": "The Rule of Thirds is a design principle ensuring balanced, visually engaging slide layouts."
  },
  {
    "id": "comm-prs-06",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "medium",
    "question": "An audience member asks a tough technical question during Q&A that you do not know the answer to. What is the best response?",
    "options": [
      "'That is a great edge case; we have not evaluated that specific benchmark yet, but I would be glad to investigate and follow up with you after.'",
      "'That question is stupid and irrelevant to my project.'",
      "Invent an answer with fabricated technical terms on the spot",
      "Ignore them and ask for the next question"
    ],
    "correctAnswer": 0,
    "explanation": "Admitting boundaries of current knowledge while offering a professional follow-up displays honesty and integrity."
  },
  {
    "id": "comm-prs-07",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "medium",
    "question": "Why should bullet points on presentation slides be kept concise?",
    "options": [
      "Audience members cannot read dense text while simultaneously listening to the speaker",
      "PowerPoint crashes if you write more than 5 words",
      "Evaluators penalize slides with bullet points",
      "It is illegal under presentation copyright laws"
    ],
    "correctAnswer": 0,
    "explanation": "Cognitive split-attention effect: people read faster than you speak, leading them to tune out your voice."
  },
  {
    "id": "comm-prs-08",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "medium",
    "question": "How should you transition smoothly between two slides in a presentation?",
    "options": [
      "Connect the conclusion of the current slide to the upcoming problem on the next before advancing",
      "Click next and say 'Okay, this slide says...'",
      "Ask the audience what they think the next slide will be",
      "Remain silent for 30 seconds after every click"
    ],
    "correctAnswer": 0,
    "explanation": "Verbal transition bridges create a cohesive narrative flow rather than disjointed slide-by-slide reading."
  },
  {
    "id": "comm-prs-09",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "hard",
    "question": "What is the best way to present architecture diagrams to non-technical executive stakeholders?",
    "options": [
      "Start with a high-level conceptual flow showing user value before drilling into component specifics",
      "Show raw AWS infrastructure configuration JSON files",
      "Tell them architecture is too complicated for them to understand",
      "Skip the architecture entirely and show stock photos"
    ],
    "correctAnswer": 0,
    "explanation": "Executives care about data flow, business value, security, and scalability rather than raw low-level code."
  },
  {
    "id": "comm-prs-10",
    "category": "communication",
    "topic": "Presentation Skills",
    "difficulty": "hard",
    "question": "What is 'death by PowerPoint' and how is it prevented?",
    "options": [
      "Audience fatigue caused by text-heavy, monotonous slides; prevented with visual diagrams, stories, and brevity",
      "A computer virus that corrupts presentation files",
      "Running out of battery during a presentation",
      "Presenting without a laser pointer"
    ],
    "correctAnswer": 0,
    "explanation": "Death by PowerPoint refers to cognitive overload from cluttered slides; remedied by visual storytelling."
  },
  {
    "id": "comm-al-01",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "easy",
    "question": "What is the defining characteristic of 'Active Listening'?",
    "options": [
      "Listening with the intent to fully understand the speaker, rather than just waiting for your turn to reply",
      "Nodding continuously while checking social media on your phone",
      "Interrupting the speaker to complete their sentences for them",
      "Memorizing every word spoken to find logical fallacies"
    ],
    "correctAnswer": 0,
    "explanation": "Active listening focuses completely on understanding the speaker's message, perspective, and underlying emotions."
  },
  {
    "id": "comm-al-02",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "easy",
    "question": "Which non-verbal cue signals active listening during a one-on-one interview or team meeting?",
    "options": [
      "Maintaining attentive eye contact, leaning slightly forward, and occasional affirmative nodding",
      "Looking repeatedly at your watch or the door",
      "Slouching back with arms crossed over your chest",
      "Staring blankly at the ceiling"
    ],
    "correctAnswer": 0,
    "explanation": "Open posture, gentle forward lean, and nodding communicate engagement and respect."
  },
  {
    "id": "comm-al-03",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "easy",
    "question": "What is a verbal technique used in active listening to ensure mutual understanding?",
    "options": [
      "Reflective questioning and summarizing: 'So what you're saying is that the bottleneck occurs during authentication?'",
      "Telling the speaker that you are smarter than them",
      "Saying 'Yeah, yeah, hurry up'",
      "Changing the topic to something you prefer"
    ],
    "correctAnswer": 0,
    "explanation": "Reflective questioning confirms alignment and shows the speaker their thoughts have been registered accurately."
  },
  {
    "id": "comm-al-04",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "easy",
    "question": "In a sprint retrospective, a colleague expresses frustration about deployment delays. How does an active listener respond?",
    "options": [
      "'I hear your frustration with deployment pipeline friction; let's identify what CI steps are causing the slowdown.'",
      "'You complain too much, the pipeline works fine on my laptop.'",
      "'That's not my problem, talk to the DevOps engineer.'",
      "'Cheer up, everything will be fine.'"
    ],
    "correctAnswer": 0,
    "explanation": "Empathic validation paired with constructive problem-solving demonstrates mature listening."
  },
  {
    "id": "comm-al-05",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "medium",
    "question": "What is 'evaluative listening' as opposed to 'empathic listening'?",
    "options": [
      "Evaluative listening critically judges the validity and logic of arguments, while empathic listening seeks to understand emotional states",
      "They are identical terms with no distinction",
      "Evaluative listening is for children; empathic is for adults",
      "Empathic listening is used only in medical settings"
    ],
    "correctAnswer": 0,
    "explanation": "Evaluative listening analyzes facts and evidence; empathic listening connects with feelings and motives."
  },
  {
    "id": "comm-al-06",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "medium",
    "question": "Why is interrupting a speaker before they complete their thought destructive to communication?",
    "options": [
      "It signals that you value your own assumptions over the speaker's actual insight and creates defensiveness",
      "It makes the conversation move twice as fast",
      "It shows the interviewer that you have high energy",
      "It proves that you can predict the future"
    ],
    "correctAnswer": 0,
    "explanation": "Premature interruptions break thought flow, introduce misunderstandings, and disrespect the speaker."
  },
  {
    "id": "comm-al-07",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "medium",
    "question": "What is an 'open-ended question' used by active listeners to invite deeper collaboration?",
    "options": [
      "'What factors contributed to the server timeout during yesterday's stress test?'",
      "'Did the server crash? (Yes/No)'",
      "'Are you done speaking?'",
      "'Do you agree with me?'"
    ],
    "correctAnswer": 0,
    "explanation": "Open-ended questions (starting with What, How, Why) invite expansive analysis and deeper insights."
  },
  {
    "id": "comm-al-08",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "medium",
    "question": "What is the 'listening barrier' known as 'prejudgment'?",
    "options": [
      "Dismissing the speaker's ideas before they finish based on preexisting biases or stereotypes",
      "Listening to a speech before reading the written transcript",
      "Testing audio equipment before a conference call",
      "Taking notes during a lecture"
    ],
    "correctAnswer": 0,
    "explanation": "Prejudgment closes the listener's mind to new data based on assumptions about the speaker's identity or role."
  },
  {
    "id": "comm-al-09",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "hard",
    "question": "During a technical requirement gathering session, a client provides vague requirements. An active listener:",
    "options": [
      "Asks clarifying probing questions and maps user stories with concrete examples to eliminate ambiguity",
      "Builds whatever they feel like and complains about the client later",
      "Nods without asking questions and hopes for the best",
      "Tells the client they don't know what they are doing"
    ],
    "correctAnswer": 0,
    "explanation": "Probing for clarity and documenting concrete examples transforms ambiguous client desires into technical specs."
  },
  {
    "id": "comm-al-10",
    "category": "communication",
    "topic": "Active Listening",
    "difficulty": "hard",
    "question": "In high-stakes technical negotiations, what does the technique of 'mirroring' achieve?",
    "options": [
      "Repeating the last 2-3 critical words of the speaker with an upward inflection to prompt deeper explanation without confrontation",
      "Imitating the speaker's clothes and voice",
      "Reflecting sunlight into the speaker's eyes",
      "Looking into a mirror while negotiating"
    ],
    "correctAnswer": 0,
    "explanation": "Chris Voss's mirroring technique builds subconscious rapport and encourages the counterpart to expand on their thoughts."
  },
  {
    "id": "comm-pc-01",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "easy",
    "question": "What is the cornerstone of professional communication in a software company?",
    "options": [
      "Clarity, brevity, contextual accuracy, and respect for the recipient's time",
      "Using complicated vocabulary to impress management",
      "Writing five-page essays for minor status updates",
      "Communicating solely through memes and emojis"
    ],
    "correctAnswer": 0,
    "explanation": "Professional communication prioritizes actionable clarity, precision, and respectful brevity."
  },
  {
    "id": "comm-pc-02",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "easy",
    "question": "How should you deliver constructive feedback to a peer regarding poor code formatting?",
    "options": [
      "Focus on the code and standards: 'Let's ensure our modules adhere to our team's ESLint config to keep PRs clean.'",
      "Attack the individual: 'You write terrible, unreadable code.'",
      "Complain to the CTO behind their back",
      "Silently delete their code from the repository"
    ],
    "correctAnswer": 0,
    "explanation": "Constructive feedback critiques the work against shared standards, never the person's character."
  },
  {
    "id": "comm-pc-03",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "easy",
    "question": "When working in an asynchronous distributed engineering team, how should you post a technical question on Slack/Teams?",
    "options": [
      "State the context, what you have tried, relevant logs/code snippets, and the specific question in a single message",
      "Post 'Hi' and wait for someone to reply before typing your question",
      "Direct message 10 different people individually with 'Help'",
      "Call senior engineers without warning on their personal phones"
    ],
    "correctAnswer": 0,
    "explanation": "Avoiding the 'no-hello' antipattern by providing full context in the initial post enables efficient async problem solving."
  },
  {
    "id": "comm-pc-04",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "easy",
    "question": "What is the 7 Cs framework of effective communication?",
    "options": [
      "Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous",
      "Clever, Complicated, Casual, Cold, Critical, Cautious, Cyclic",
      "Coding, Compiling, Checking, Committing, Calling, Chatting, Closing",
      "None of the above"
    ],
    "correctAnswer": 0,
    "explanation": "The classic 7 Cs framework guarantees high-quality, professional, and courteous transmission of information."
  },
  {
    "id": "comm-pc-05",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "medium",
    "question": "What is the best way to decline an unrealistic engineering feature deadline requested by sales?",
    "options": [
      "Present the technical estimates, explain the trade-offs on quality and technical debt, and offer viable scope alternatives",
      "Say 'No way, you people are crazy' and hang up",
      "Promise to finish it on time and secretly fail at the deadline",
      "Blame the engineering team for being too slow"
    ],
    "correctAnswer": 0,
    "explanation": "Professional boundary management pairs realistic technical data with constructive alternatives."
  },
  {
    "id": "comm-pc-06",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "medium",
    "question": "In a daily standup meeting, your update should answer which three core questions?",
    "options": [
      "What did I complete yesterday? What will I work on today? Are there any blockers in my path?",
      "What did I have for dinner? What is my favorite movie? Who made mistakes yesterday?",
      "How much do I dislike our current codebase? Why is management wrong? When is lunch?",
      "Reciting every line of code written over the last 24 hours"
    ],
    "correctAnswer": 0,
    "explanation": "The standard Scrum daily standup focuses on yesterday's progress, today's goal, and active blockers."
  },
  {
    "id": "comm-pc-07",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "medium",
    "question": "What is the recommended approach for writing an issue ticket or bug report in Jira/GitHub?",
    "options": [
      "Clear title, reproducible steps, expected vs actual behavior, environment details, and relevant stack trace",
      "Writing 'App is broken, please fix ASAP' without any logs",
      "Attaching a video of your entire desktop for 30 minutes",
      "Creating a ticket without any description"
    ],
    "correctAnswer": 0,
    "explanation": "Actionable bug reports contain deterministic steps to reproduce, environment specifics, and log traces."
  },
  {
    "id": "comm-pc-08",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "medium",
    "question": "What does 'managing up' mean in professional corporate communication?",
    "options": [
      "Proactively keeping your manager informed of project progress, risks, and proposed solutions to make their job easier",
      "Telling your manager what to do in front of everyone",
      "Attempting to take your manager's position through political maneuvering",
      "Ignoring your manager's requests"
    ],
    "correctAnswer": 0,
    "explanation": "Managing up is proactive alignment, anticipating management questions, and bringing solutions rather than just problems."
  },
  {
    "id": "comm-pc-09",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "hard",
    "question": "When communicating technical incidents to executive non-technical leadership, engineers must translate technical failures into:",
    "options": [
      "Business impact: user experience degradation, affected revenue streams, and remediation timeline",
      "Complex kernel panic assembly memory addresses",
      "Excuses explaining why the cloud provider is to blame",
      "Technical jargon that prevents scrutiny"
    ],
    "correctAnswer": 0,
    "explanation": "Executives require visibility into business risk, customer impact, financial exposure, and recovery time."
  },
  {
    "id": "comm-pc-10",
    "category": "communication",
    "topic": "Professional Communication",
    "difficulty": "hard",
    "question": "What is the 'BLUF' (Bottom Line Up Front) communication technique originated by the military?",
    "options": [
      "Placing the core conclusion, recommendation, or action item at the very beginning of the document or message",
      "Writing the most confusing sentence first to stimulate curiosity",
      "Never telling anyone the conclusion until the end of the year",
      "Ending an email with a blunt criticism"
    ],
    "correctAnswer": 0,
    "explanation": "BLUF puts the executive summary or decision request in the first sentence, respecting recipient time."
  },
  {
    "id": "comm-ewc-01",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "easy",
    "question": "What makes an email subject line effective in a workplace context?",
    "options": [
      "Specific, actionable, and informative (e.g. '[Action Required] Review API Architecture Proposal by Friday')",
      "'Hey check this out'",
      "'Urgent!!!!!!!!'",
      "Leaving the subject line completely blank"
    ],
    "correctAnswer": 0,
    "explanation": "Clear subject lines convey urgency, topic, and expected action, improving triage efficiency."
  },
  {
    "id": "comm-ewc-02",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "easy",
    "question": "When should the 'Reply All' button be avoided?",
    "options": [
      "When your response is a simple 'Thank you' or only relevant to the original sender",
      "When the email is an all-hands announcement requiring everyone's attention",
      "When the email is an incident notification to all engineers",
      "Reply All should never be avoided"
    ],
    "correctAnswer": 0,
    "explanation": "Using 'Reply All' for trivial acknowledgments clutters inboxes for hundreds of colleagues unnecessarily."
  },
  {
    "id": "comm-ewc-03",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "easy",
    "question": "What is the function of the 'Bcc' (Blind Carbon Copy) field in business emails?",
    "options": [
      "To send an email to recipients while keeping their email addresses hidden from other recipients",
      "To send an email that deletes itself after 24 hours",
      "To make sure the recipient cannot reply to the email",
      "To send an encrypted cryptographic hash of the email"
    ],
    "correctAnswer": 0,
    "explanation": "Bcc protects recipient privacy when broadcasting to large external mailing lists and prevents accidental 'Reply All' storms."
  },
  {
    "id": "comm-ewc-04",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "easy",
    "question": "What is the recommended turnaround time for responding to internal workplace emails during business hours?",
    "options": [
      "Within 24 hours, or a brief acknowledgment if research is required",
      "Within 10 seconds, regardless of whether you are driving or coding",
      "After 2 weeks, so people stop asking questions",
      "Emails do not require any response"
    ],
    "correctAnswer": 0,
    "explanation": "A 24-hour response (or quick receipt acknowledgment) represents professional etiquette and operational reliability."
  },
  {
    "id": "comm-ewc-05",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "medium",
    "question": "You receive an angry, emotional email from a client criticizing your team's software release. What is the best course of action?",
    "options": [
      "Pause, do not respond immediately in anger, review facts objectively, and draft a calm, factual, solution-focused response",
      "Instantly reply in all-caps insulting their technical competence",
      "Forward the email to social media to publicly humiliate the client",
      "Block the client's email domain on the company mail server"
    ],
    "correctAnswer": 0,
    "explanation": "Emotional detachment and responding calmly with facts and solutions defuses hostility professionally."
  },
  {
    "id": "comm-ewc-06",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "medium",
    "question": "Which greeting and sign-off pairing is most appropriate for formal professional correspondence?",
    "options": [
      "'Dear Mr. Sharma,' ... 'Sincerely, [Your Name]'",
      "'Yo what's up dude,' ... 'Peace out'",
      "'Hey guys,' ... 'Yours eternally'",
      "'To whom it may concern,' ... 'Later'"
    ],
    "correctAnswer": 0,
    "explanation": "'Dear [Name]' and 'Sincerely / Best regards' maintain standard professional respect."
  },
  {
    "id": "comm-ewc-07",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "medium",
    "question": "Why should writing in ALL CAPS be avoided in workplace emails and Slack messages?",
    "options": [
      "It is interpreted across digital communication as shouting and aggression",
      "It consumes twice as much server network bandwidth",
      "Modern email clients reject emails written in capital letters",
      "It is considered grammatically correct only on weekends"
    ],
    "correctAnswer": 0,
    "explanation": "All-caps text is universally perceived as shouting, hostility, or lack of emotional restraint."
  },
  {
    "id": "comm-ewc-08",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "medium",
    "question": "How should attachments be handled in professional business emails?",
    "options": [
      "Reference the attachment in the body text and ensure file names are descriptive and formatted cleanly",
      "Attach an unnamed file called 'Untitled_final_v2_new.pdf' without mentioning it",
      "Send 50 individual high-resolution screenshots without compressing",
      "Paste raw binary files into the text body"
    ],
    "correctAnswer": 0,
    "explanation": "Contextual references and clean file naming ('Q3_Financial_Performance_Report.pdf') ensure clarity."
  },
  {
    "id": "comm-ewc-09",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "hard",
    "question": "What is a professional 'Out of Office' (OOO) auto-responder message?",
    "options": [
      "Specifies exact dates of absence, emergency contact details, and expected response turnaround upon return",
      "States 'I am on vacation, don't bother me'",
      "A blank email that bounces back",
      "An email warning people not to message you"
    ],
    "correctAnswer": 0,
    "explanation": "An effective OOO auto-responder sets expectations by detailing dates away and point of contact for urgent escalations."
  },
  {
    "id": "comm-ewc-10",
    "category": "communication",
    "topic": "Email & Workplace Communication",
    "difficulty": "hard",
    "question": "What legal consideration should software engineers remember when communicating on workplace channels (Slack/Email)?",
    "options": [
      "All corporate communication records are discoverable legal documents and company property",
      "Workplace messages are legally classified as private personal thoughts",
      "Engineers are legally exempt from corporate audit policies",
      "Slack messages are permanently deleted after 1 hour by law"
    ],
    "correctAnswer": 0,
    "explanation": "All corporate communications can be audited or subpoenaed in litigation; professional decorum is mandatory."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['communication'] = commData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = commData;
  }
})();
