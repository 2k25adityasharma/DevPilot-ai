/**
 * Builder for Communication & GD (100 scenario MCQs + 10 Practice GD Topics)
 * and HR & Behavioral Interview (10 Framework Guides + 10 Situational MCQs)
 */

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../js/data/interviewPrep');

// =========================================================================
// 1. COMMUNICATION & GROUP DISCUSSION
// =========================================================================
const commTopics = [
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
];

const gdPracticeTopics = [
  {
    id: "gd-topic-01",
    title: "AI in Education: Boon or Bane?",
    category: "Technology & Society",
    openingApproach: "Open by establishing the shift from rote learning to personalized adaptive learning, while emphasizing the ethical risks of plagiarism and erosion of critical thinking.",
    pointsFor: [
      "Personalized learning paths tailored to individual student speeds and weaknesses",
      "24/7 intelligent tutoring accessible to students in under-resourced regions",
      "Automates administrative grading for teachers, freeing time for one-on-one mentorship",
      "Real-time language translation breaking linguistic barriers for global knowledge"
    ],
    pointsAgainst: [
      "Over-reliance on AI may atrophy foundational problem-solving and writing skills",
      "Academic integrity and homework verification become difficult to monitor",
      "Digital divide: affluent students gain access to premium models while marginalized lack hardware",
      "AI hallucinations and bias in training data can propagate factual inaccuracies"
    ],
    examples: [
      "Khan Academy's Khanmigo tutoring assistant acting as a Socratic tutor rather than providing direct answers",
      "Universities reworking curricula toward oral examinations and in-class problem solving to counter generative essays"
    ],
    conclusionStrategy: "Advocate for AI as a cognitive amplifier and pedagogical co-pilot rather than an autonomous educator; balance technological tooling with human-led critical thinking."
  },
  {
    id: "gd-topic-02",
    title: "Will AI Replace Software Engineers or Augment Them?",
    category: "Employment & Tech Industry",
    openingApproach: "Acknowledge rapid advances in generative code models (GitHub Copilot, Devin) while grounding the discussion in the reality that engineering is 80% requirements, system design, and communication, and 20% syntax.",
    pointsFor: [
      "AI handles repetitive boilerplate, CRUD endpoints, and syntax generation with high speed",
      "Junior developers can upskill faster with interactive codebase explainers and instant documentation",
      "Enables smaller engineering teams to build complex, full-scale enterprise products",
      "Automates test generation, static linting, and vulnerability scanning"
    ],
    pointsAgainst: [
      "AI models struggle with novel domain logic, distributed edge cases, and high-level architectural trade-offs",
      "Generated code often contains subtle security vulnerabilities and subtle hallucinations",
      "Software engineering requires stakeholder negotiation and human empathy, which AI lacks",
      "Over-reliance may produce developers who cannot debug low-level core runtime faults"
    ],
    examples: [
      "High-level programming languages (C, Java) historically didn't eliminate programmers—they increased overall software demand exponentially",
      "Teams using AI coding assistants report 30-55% faster task completion but still require senior engineers for code review"
    ],
    conclusionStrategy: "Conclude that AI won't replace engineers, but engineers who skillfully wield AI tools will replace those who do not. Software engineering is shifting toward system architecture and verification."
  },
  {
    id: "gd-topic-03",
    title: "Remote Work vs Return to Office: Finding the Balance",
    category: "Workplace & Culture",
    openingApproach: "Highlight how the pandemic permanently disrupted the traditional 9-to-5 corporate paradigm, and frame the debate as flexibility and global talent access versus spontaneous collaboration and team culture.",
    pointsFor: [
      "Elimination of long commutes reduces employee burnout and improves work-life balance",
      "Access to global talent pools without geographical relocation constraints",
      "Substantial cost savings for companies on commercial real estate and utility overhead",
      "Higher uninterrupted focus time for deep programming and creative tasks"
    ],
    pointsAgainst: [
      "Spontaneous water-cooler innovation and cross-team serendipity are drastically diminished",
      "Onboarding and mentoring fresh graduates and junior engineers is harder asynchronously",
      "Blurred boundaries between professional and personal life can lead to chronic burnout",
      "Isolation and lack of human connection weaken organizational belonging and team cohesion"
    ],
    examples: [
      "GitLab operating as a fully remote enterprise with asynchronous documentation handbooks",
      "Hybrid models (e.g. 3 days office, 2 days remote) adopted by major tech companies to reconcile both benefits"
    ],
    conclusionStrategy: "Propose outcome-driven hybrid models with intentional office days dedicated to architecture whiteboard sessions, retrospectives, and social bonding, reserving remote days for deep execution."
  },
  {
    id: "gd-topic-04",
    title: "Social Media: Connectivity Catalyst or Mental Health Crisis?",
    category: "Mental Health & Media",
    openingApproach: "Acknowledge that while social platforms democratized news and global human connection, algorithmic engagement loops have engineered addictive feedback cycles affecting youth mental wellness.",
    pointsFor: [
      "Instantaneous global connectivity with friends, communities, and professional networks",
      "Democratization of information, citizen journalism, and independent commerce",
      "Platform for social justice movements and raising awareness on pressing global issues",
      "Micro-learning opportunities and dissemination of educational content"
    ],
    pointsAgainst: [
      "Algorithmic dopamine loops foster addiction, shortened attention spans, and insomnia",
      "Curated highlights create unrealistic lifestyle comparisons leading to anxiety and depression",
      "Echo chambers and rage-bait engagement models polarize societal discourse",
      "Spread of unverified misinformation and online harassment"
    ],
    examples: [
      "EU Digital Services Act holding algorithmic platforms accountable for addictive designs targeting minors",
      "Crowdfunding and disaster relief campaigns organizing through viral social networks during crises"
    ],
    conclusionStrategy: "Advocate for digital hygiene, transparent algorithmic governance, and platform accountability, emphasizing that technology should serve human flourishing rather than monetization of attention."
  },
  {
    id: "gd-topic-05",
    title: "Cybersecurity in the Age of Connected Everything (IoT)",
    category: "Information Security",
    openingApproach: "Frame the explosion of smart devices as expanding the attack surface into our physical environments—homes, hospitals, power grids, and connected vehicles.",
    pointsFor: [
      "Connected IoT drives industrial automation, remote patient monitoring, and smart city efficiency",
      "Automated sensor grids detect structural flaws, energy waste, and environmental anomalies early",
      "Increases economic productivity and convenience in everyday consumer lives"
    ],
    pointsAgainst: [
      "Cheap IoT hardware frequently ships with hardcoded credentials and zero firmware update mechanisms",
      "Compromised consumer devices are co-opted into massive botnets (e.g. Mirai) executing DDoS attacks",
      "Severe physical safety hazards when medical equipment, connected cars, or electrical grids are breached",
      "Intrusive data collection creates persistent surveillance risks in private living spaces"
    ],
    examples: [
      "The Mirai botnet crippling major internet DNS infrastructure using infected smart cameras and routers",
      "Zero-Trust requirements mandated by defense departments for any connected edge device"
    ],
    conclusionStrategy: "Recommend security-by-design standards: mandatory security certification for commercial IoT, automated patch distribution, and network segmentation isolating IoT devices from critical infrastructure."
  },
  {
    id: "gd-topic-06",
    title: "Climate Change: Technology Solutions vs Lifestyle Changes",
    category: "Environment & Sustainability",
    openingApproach: "Frame the climate crisis as requiring both supply-side technological breakthroughs and demand-side cultural and behavioral consumption shifts.",
    pointsFor: [
      "Renewable energy, nuclear fission/fusion, and green hydrogen provide scalable decarbonization",
      "Direct carbon capture and advanced battery chemistry directly address industrial emissions",
      "Precision agriculture and lab-grown proteins reduce land and water usage at scale"
    ],
    pointsAgainst: [
      "Technological optimism creates moral hazard, delaying urgent carbon reduction commitments",
      "Hyper-consumerism and infinite economic growth models on a finite planet remain unsustainable",
      "Developing nations bear disproportionate impacts while contributing historical minimums",
      "High costs and raw material extraction (lithium, cobalt) carry ecological consequences"
    ],
    examples: [
      "Costa Rica powering over 98% of its national grid from renewable energy for consecutive years",
      "Global circular economy regulations mandating right-to-repair to curb electronic waste"
    ],
    conclusionStrategy: "Synthesize that technology provides the scalable tools, but societal commitment to circular economy, sustainable lifestyle choices, and equitable policy provide the will to avert catastrophe."
  },
  {
    id: "gd-topic-07",
    title: "Startup vs MNC for Fresh Engineering Graduates",
    category: "Career & Corporate Strategy",
    openingApproach: "Establish that there is no universal right choice; the optimal decision depends entirely on an individual's risk tolerance, desire for breadth versus depth, and long-term career aspirations.",
    pointsFor: [
      "Startup Advantages: Rapid end-to-end ownership, steep learning curve, direct exposure to founders and business metrics, fast promotion cycles",
      "MNC Advantages: Structured training programs, mentorship from seasoned architects, brand equity on resume, work-life balance, competitive stability"
    ],
    pointsAgainst: [
      "Startup Disadvantages: High runway risk, lack of formal documentation, potential chaos and long hours, limited compensation stability",
      "MNC Disadvantages: Siloed roles working on narrow features, slower decision-making bureaucracy, feeling like a cog in a machine"
    ],
    examples: [
      "Engineers at early startups writing backend, DevOps, and frontend code within their first month",
      "Engineers at big tech learning enterprise-scale code review standards and distributed systems handling millions of QPS"
    ],
    conclusionStrategy: "Conclude by advising freshers to evaluate their personal priorities: choose an MNC for foundational software engineering rigor and stability, or a high-growth startup for accelerated ownership and entrepreneurial hustle."
  },
  {
    id: "gd-topic-08",
    title: "College Degrees vs Skill-Based Hiring in Tech",
    category: "Education & Hiring",
    openingApproach: "Address the rapid shift in tech recruitment from pedigree-based credentialing toward demonstrated technical competence, public portfolios, and problem-solving ability.",
    pointsFor: [
      "GitHub repositories, open-source contributions, and live demos prove actual ability far better than GPA",
      "Self-taught engineers and boot camp graduates often exhibit high hunger, agility, and modern framework fluency",
      "Democratizes upward socioeconomic mobility for talented individuals who cannot afford university tuition",
      "Tech stacks evolve faster than traditional university computer science curricula can update"
    ],
    pointsAgainst: [
      "University computer science degrees instill foundational rigor (DSA, OS, compilers, discrete mathematics)",
      "College provides soft skill development: teamwork, campus placements, diverse peer networks, and research exposure",
      "Without standardized degree filters, enterprise recruitment pipelines face massive screening volumes",
      "Accreditation ensures ethical education and structured evaluation standards"
    ],
    examples: [
      "Major tech giants (Google, Apple, IBM) officially dropping 4-year degree requirements for software roles",
      "Competitive programming platforms (LeetCode, Codeforces) and hackathons serving as direct recruitment funnels"
    ],
    conclusionStrategy: "Propose a hybrid hiring reality: while foundational computer science principles are timeless, employers should prioritize demonstrated practical capability and portfolio proof over college pedigree alone."
  },
  {
    id: "gd-topic-09",
    title: "Online Privacy vs National Security: The Encryption Dilemma",
    category: "Law & Cyber Ethics",
    openingApproach: "Frame the fundamental conflict between civil liberties and state security: should governments possess lawful backdoors to encrypted communications to thwart crime, or does any backdoor inevitably compromise security for all?",
    pointsFor: [
      "National Security: Law enforcement requires actionable intelligence to intercept terrorism, organized crime, and human trafficking",
      "Accountability: Tech conglomerates should not operate beyond sovereign legal jurisdictions"
    ],
    pointsAgainst: [
      "Mathematical Reality: There is no such thing as a backdoor only for 'the good guys'—any vulnerability will be exploited by hostile state actors and cybercriminals",
      "Civil Liberties: End-to-end encryption protects journalists, dissidents, banking transactions, and personal privacy",
      "Economic Trust: Global digital commerce relies fundamentally on unbroken cryptographic protocols"
    ],
    examples: [
      "The Apple vs FBI dispute over unlocking the San Bernardino shooter's iPhone",
      "Signal and WhatsApp upholding end-to-end encryption protocols globally despite government pushback"
    ],
    conclusionStrategy: "Conclude that cryptographic backdoors undermine the security architecture of the entire internet. Law enforcement must invest in targeted intelligence and endpoint analysis rather than compromising mathematical encryption standards."
  },
  {
    id: "gd-topic-10",
    title: "Electric Vehicles (EVs): Are They Truly Green?",
    category: "Automotive & Energy",
    openingApproach: "Examine EVs beyond tailpipe emissions, analyzing their full lifecycle environmental footprint from raw material mining and manufacturing to battery recycling and grid electricity generation.",
    pointsFor: [
      "Zero tailpipe emissions eliminate toxic nitrogen oxides and particulates from dense urban centers",
      "Electric motors are ~85-90% energy efficient compared to internal combustion engines (~20-25%)",
      "As electrical grids transition to renewables (solar/wind), existing EV fleets automatically become cleaner without modifying vehicles"
    ],
    pointsAgainst: [
      "Battery manufacturing requires lithium, cobalt, and nickel mining with severe ecological and humanitarian impacts",
      "In regions where power grids rely predominantly on coal, charging an EV still carries an indirect carbon burden",
      "Battery recycling infrastructure is currently nascent and capital-intensive",
      "Vehicle weight increases tire wear and roadway microplastic emissions"
    ],
    examples: [
      "Lifecycle carbon footprint studies showing EVs reach a carbon break-even point with gas cars within 15,000–30,000 km of driving",
      "Advances in Lithium Iron Phosphate (LFP) and sodium-ion batteries eliminating reliance on rare cobalt"
    ],
    conclusionStrategy: "Conclude that while EVs are not zero-impact, their lifecycle emissions are significantly lower than fossil-fuel vehicles. Sustainable success requires pairing EV adoption with green grid expansion and circular battery recycling."
  }
];

const commGroups = [
  // 1. Group Discussion Fundamentals
  {
    topic: "Group Discussion Fundamentals",
    prefix: "comm-gdf",
    items: [
      { q: "What is the primary evaluation objective of an interviewer in a Group Discussion?", opt: ["Assessing interpersonal collaboration, structured thought, and clear communication", "Counting how many times you interrupted others", "Testing who can shout the loudest to dominate the room", "Evaluating who writes the most notes during the discussion"], ans: 0, diff: "easy", exp: "A GD evaluates interpersonal collaboration, ability to articulate structured viewpoints, listening skills, and leadership in a group setting." },
      { q: "What is the recommended attitude during a placement group discussion?", opt: ["Collaborative and assertive", "Aggressive and domineering", "Completely passive and quiet", "Argumentative and dismissive"], ans: 0, diff: "easy", exp: "An assertive yet collaborative approach demonstrates leadership and team spirit without appearing hostile." },
      { q: "If you do not have deep knowledge about the given GD topic, what is the best strategy?", opt: ["Listen intently to initial speakers, analyze their points, and contribute a structured synthesis or fresh angle", "Remain completely silent throughout the entire discussion", "Make up fictional statistics to sound authoritative", "Interrupt the first speaker immediately and change the topic"], ans: 0, diff: "easy", exp: "Active listening allows you to gather context and contribute meaningfully by summarizing, structuring, or offering logical deductions." },
      { q: "What role does body language play in a physical or virtual Group Discussion?", opt: ["Open posture, steady eye contact, and nodding indicate engagement and confidence", "Slouching demonstrates that you are relaxed and confident", "Avoiding eye contact prevents confrontation with evaluators", "Crossing arms tightly projects authority and dominance"], ans: 0, diff: "easy", exp: "Open posture and natural eye contact signal confidence, professional respect, and attentiveness." },
      { q: "You notice the GD is degenerating into a chaotic fish market where multiple people are shouting. What is the best leadership action?", opt: ["Politely and firmly say: 'Friends, we are speaking over each other. Let us hear one speaker at a time so everyone's point is heard.'", "Shout louder than everyone else to establish command", "Complain directly to the evaluator that the group is undisciplined", "Put your head down and wait for time to expire"], ans: 0, diff: "medium", exp: "Moderating the group with a calm, constructive intervention demonstrates genuine leadership and emotional intelligence." },
      { q: "How long should an ideal single contribution in a GD last?", opt: ["30 to 45 seconds", "3 to 4 minutes", "5 to 10 seconds", "As long as you have breath"], ans: 0, diff: "medium", exp: "Crisp contributions of 30-45 seconds allow you to deliver a sharp point with reasoning while leaving room for healthy group dialogue." },
      { q: "In a GD, what does generating a 'consensus' mean?", opt: ["Working toward identifying shared viewpoints and balanced conclusions across diverse perspectives", "Forcing all participants to agree with your personal opinion", "Taking a majority vote like a political election", "Agreeing with the loudest speaker to avoid conflict"], ans: 0, diff: "medium", exp: "Consensus in GDs means synthesizing the core arguments of the group into a cohesive, balanced conclusion." },
      { q: "A fellow participant presents a factually incorrect claim during the GD. How should you address it?", opt: ["'That is an interesting viewpoint; however, recent industry data indicates that...' and state the correct fact politely", "'You are completely wrong and do not know what you are talking about.'", "Laugh loudly to discredit their argument in front of the evaluator", "Stay quiet and allow the evaluator to fail them"], ans: 0, diff: "medium", exp: "Respectful disagreement using data maintains professional decorum and shows emotional maturity." },
      { q: "What should you do if an introverted participant has not had an opportunity to speak?", opt: ["Invite them warmly: 'We have not heard from Rahul yet; Rahul, what are your thoughts on this aspect?'", "Keep speaking to fill the silence so the evaluator remains impressed with your fluency", "Tell the evaluator that Rahul is not participating", "Ignore them because competition is ruthless"], ans: 0, diff: "hard", exp: "Encouraging silent participants is one of the highest leadership qualities evaluated in placement GDs." },
      { q: "Which metric is NOT typically scored by corporate GD evaluators?", opt: ["Physical volume of voice and number of interruptions made", "Clarity of thought and logical structuring", "Active listening and openness to other viewpoints", "Knowledge depth and relevant real-world examples"], ans: 0, diff: "hard", exp: "Evaluators penalize interruptions and shouting; volume is not a substitute for substance." }
    ]
  },

  // 2. GD Opening & Closing
  {
    topic: "GD Opening & Closing",
    prefix: "comm-goc",
    items: [
      { q: "What is the primary benefit of initiating (opening) a Group Discussion?", opt: ["It gives you an early opportunity to set the context and framework for the topic", "It guarantees an automatic selection regardless of what you say later", "It allows you to finish your quota of speaking early so you can relax", "It stops other candidates from expressing their views"], ans: 0, diff: "easy", exp: "Initiating gives high visibility and sets the stage, provided the opening is meaningful and well-defined." },
      { q: "When is opening a GD dangerous or counter-productive?", opt: ["When you don't fully understand the topic and make vague, incorrect statements", "When you have strong statistics and a clear definition", "When you speak in grammatically correct English", "When you outline the discussion structure"], ans: 0, diff: "easy", exp: "Starting without solid knowledge leads to awkward stuttering, incorrect definitions, or flawed frameworks that harm your evaluation." },
      { q: "What constitutes a strong opening statement for a GD on 'Electric Vehicles in India'?", opt: ["A crisp definition of the EV transition, highlighting environmental benefits and infrastructure hurdles, followed by opening the floor", "Saying 'Hello everyone, EVs are good cars and I like them very much.'", "Speaking for 3 straight minutes without letting anyone else speak", "Asking the evaluator to explain the topic first"], ans: 0, diff: "easy", exp: "A strong opening defines scope, states core dimensions (pros and challenges), and invites collective discussion." },
      { q: "Who should summarize or conclude the Group Discussion?", opt: ["A candidate who actively listened, captured the group's diverse arguments, and presents an objective synthesis", "The candidate who spoke the most during the discussion", "The candidate who disagreed with everyone", "The first candidate who looks at their watch"], ans: 0, diff: "easy", exp: "A good conclusion must be an unbiased reflection of the collective arguments made during the discussion." },
      { q: "What should a strong GD conclusion NOT include?", opt: ["Introducing brand-new arguments that were never discussed by the group", "Summarizing the major points for and against", "Highlighting areas where the group found consensus", "Delivering a forward-looking balanced perspective"], ans: 0, diff: "medium", exp: "A conclusion must summarize existing arguments; introducing new points at the closing is a major tactical error." },
      { q: "If the evaluator suddenly announces: 'Time is up. Candidate 12, please conclude the discussion', and you are Candidate 12, what should you do?", opt: ["Briefly summarize: 'To conclude, our group discussed both sides... on one hand X, on the other hand Y, and we agreed that Z is the way forward.'", "Panic and say: 'Sir, I did not know I had to conclude.'", "Repeat your own personal opinion for two minutes", "Point out who spoke poorly during the round"], ans: 0, diff: "medium", exp: "A poised candidate synthesizes the main arguments of the room cleanly and presents a balanced summary." },
      { q: "What is an effective quote or hook to initiate a GD on 'Digital Privacy'?", opt: ["'As the adage goes, if you are not paying for the product, you are the product.'", "'Privacy is a secret thing.'", "'I think computers are very dangerous.'", "'My friend once told me a funny story about passwords.'"], ans: 0, diff: "medium", exp: "Using a relevant, thought-provoking industry maxim hooks attention and frames the debate with intellectual depth." },
      { q: "Two candidates attempt to start speaking at the exact same second to open the GD. What is the most poised response?", opt: ["Smile, make eye contact, and say: 'Please go ahead; I will follow up right after you.'", "Shout over them to prove you started a millisecond earlier", "Complain to the invigilator that they took your turn", "Go silent and refuse to participate for the rest of the GD"], ans: 0, diff: "medium", exp: "Yielding with grace showcases confidence, composure, and exceptional interpersonal maturity." },
      { q: "In a 10-minute GD, approximately when should the group naturally pivot toward conclusion and solutions?", opt: ["Around the 8th or 9th minute", "At the 2nd minute", "Never; the debate should end with an argument", "In the first 30 seconds"], ans: 0, diff: "hard", exp: "Allocating the final 1.5–2 minutes to solutions and synthesis ensures the discussion finishes on a constructive, mature note." },
      { q: "What is the difference between a 'Summary' and a 'Conclusion' in a Group Discussion?", opt: ["A summary recaps the arguments objectively; a conclusion highlights the synthesized consensus and path forward", "They are identical in every way", "A summary is your personal view; a conclusion is what others said", "A summary is done at the start; a conclusion at the end"], ans: 0, diff: "hard", exp: "A summary recaps the points raised; a conclusion extracts the synthesis, consensus, and actionable recommendations." }
    ]
  }
];

// Add Remaining Comm topics (3-10)
const extraComm = [
  // 3. GD Communication Skills
  {
    topic: "GD Communication Skills",
    prefix: "comm-gcs",
    items: [
      { q: "Which tone of voice is most effective in a professional GD?", opt: ["Audible, calm, and conversational", "Monotone and whispering", "Aggressively loud and booming", "Sarcastic and theatrical"], ans: 0, diff: "easy", exp: "A calm, well-modulated, audible voice conveys composure and authority." },
      { q: "What is the best way to structure an argument in a technical or business GD?", opt: ["PREP framework: Point, Reason, Example, Point", "Stating opinions without any facts or reasons", "Telling long personal anecdotes", "Quoting movie dialogues"], ans: 0, diff: "easy", exp: "The PREP formula (Point -> Reason -> Example -> Point) provides concise, memorable, and persuasive argumentation." },
      { q: "How should you transition into a discussion when someone finishes speaking?", opt: ["'Building upon what Ananya mentioned regarding cloud costs, another critical aspect is...'", "'That was boring, listen to me now.'", "'You are wrong, here is the truth.'", "'Okay, next topic please.'"], ans: 0, diff: "easy", exp: "Connecting to a peer's point before introducing your perspective demonstrates active listening and collaborative cohesion." },
      { q: "What should you do when you notice your English vocabulary is slipping during a sentence?", opt: ["Pause, take a breath, use simpler everyday words, and convey the core thought clearly", "Switch entirely to your regional language and yell", "Freeze and stop speaking midway through the thought", "Apologize repeatedly for poor grammar"], ans: 0, diff: "easy", exp: "Simple, grammatically clear English is far superior to complex vocabulary that breaks your train of thought." },
      { q: "Why is articulation and modulation important in group communication?", opt: ["It emphasizes key points and keeps listeners engaged without sounding monotonous", "It tricks the evaluator into thinking you are a native speaker", "It ensures nobody else can understand your strategy", "It helps you speak twice as fast as others"], ans: 0, diff: "medium", exp: "Voice modulation helps highlight critical insights and maintains the listener's attention." },
      { q: "What does 'paraphrasing' mean in a GD context?", opt: ["Briefly restating someone else's point in your own words before adding your perspective", "Copying someone's exact words and claiming them as your idea", "Translating a foreign word into English", "Writing notes on a piece of paper"], ans: 0, diff: "medium", exp: "Paraphrasing validates the previous speaker and demonstrates comprehension before extending the discussion." },
      { q: "When participating in a virtual GD over Zoom/Teams, where should you direct your gaze while speaking?", opt: ["Directly into the webcam lens to simulate eye contact with participants", "At your own thumbnail in the bottom corner", "Out the window to appear relaxed", "Down at your mobile phone"], ans: 0, diff: "medium", exp: "Looking into the camera lens creates the psychological perception of direct eye contact for remote evaluators." },
      { q: "How can you diplomatically interrupt someone who has been monopolizing the conversation for over 2 minutes?", opt: ["'Pardon the interruption, Arjun—you have raised a very valuable point on scalability; I’d love to quickly add how this impacts cost...'", "'Stop talking Arjun, you are speaking too much.'", "Clap your hands loudly until they stop", "Interrupt their microphone in the meeting settings"], ans: 0, diff: "medium", exp: "Polite validation combined with an assertive pivot gently reclaims the floor for the group without confrontation." },
      { q: "What is the danger of using technical jargon excessively in a general placement GD?", opt: ["It alienates non-technical participants and obscures the clarity of your core argument", "It makes you look too intelligent for the job", "Evaluators automatically deduct 50% marks for technical terms", "Jargon is prohibited by corporate laws"], ans: 0, diff: "hard", exp: "Effective communicators explain complex concepts in accessible terms; excessive jargon signals poor stakeholder empathy." },
      { q: "Which rhetorical device is most persuasive when discussing policy topics in GDs?", opt: ["Cause-and-effect reasoning supported by credible empirical precedents", "Emotional appeals and personal outrage", "Conspiracy theories found on internet forums", "Humorous roasting of government figures"], ans: 0, diff: "hard", exp: "Logical cause-and-effect with empirical precedents creates an intellectually bulletproof argument." }
    ]
  },

  // 4. GD Do's & Don'ts
  {
    topic: "GD Do's & Don'ts",
    prefix: "comm-dd",
    items: [
      { q: "Which of the following is a strict DON'T in a Group Discussion?", opt: ["Pointing fingers aggressively at other candidates while speaking", "Making notes of important points raised by peers", "Nodding when another participant makes a valid point", "Synthesizing two opposing viewpoints"], ans: 0, diff: "easy", exp: "Aggressive body language such as finger-pointing or table-thumping leads to severe negative marking." },
      { q: "Which of the following is a recommended DO in a Group Discussion?", opt: ["Demonstrate active listening through nodding and acknowledging peer contributions", "Interrupt every speaker after 5 seconds", "Speak continuously for the first 5 minutes to dominate the time", "Stare directly at the evaluator to seek approval"], ans: 0, diff: "easy", exp: "Active listening demonstrates team play, which is a core placement evaluation criterion." },
      { q: "Should you look at the evaluator while speaking in a GD?", opt: ["No, you should address and maintain eye contact with the fellow candidates", "Yes, you should exclusively look at the evaluator because they give the marks", "Yes, evaluators expect to be addressed directly as 'Sir/Madam'", "You should close your eyes to concentrate"], ans: 0, diff: "easy", exp: "A GD is an interaction among peers; addressing the evaluator turns it into a speech rather than a group dialogue." },
      { q: "Is it acceptable to change your stance during a Group Discussion if someone presents compelling evidence?", opt: ["Yes, acknowledging superior logic and evolving your perspective shows intellectual humility and maturity", "No, you must stubbornly defend your initial stance at all costs", "No, changing views is considered a sign of weakness and cowardice", "Only if the evaluator instructs you to switch"], ans: 0, diff: "easy", exp: "Intellectual humility and adaptability based on data are highly valued corporate leadership traits." },
      { q: "What should you avoid when citing statistics in a GD?", opt: ["Quoting fabricated numbers without attribution ('100% of people hate remote work')", "Citing known organizations like the World Bank, RBI, or Gartner", "Using approximate figures ('roughly 60% of the market')", "Explaining the significance of the metric"], ans: 0, diff: "medium", exp: "Fabricated or extreme statistics damage your credibility when evaluated by knowledgeable interviewers." },
      { q: "What is the best way to handle a topic you know nothing about?", opt: ["Allow others to establish the context, identify key themes, and contribute to logical analysis or process solutions", "Pretend you are an expert and invent false facts", "Walk out of the room immediately", "Argue that the topic is invalid and demand a new one"], ans: 0, diff: "medium", exp: "Strategic active listening allows you to understand the subject and add value through framework structuring." },
      { q: "Why is taking notes during a GD encouraged?", opt: ["It helps you remember names and specific points to reference and build upon later", "It keeps your hands busy so you don't fidget", "The evaluator grades the neatness of your handwriting", "It prevents you from having to look at other candidates"], ans: 0, diff: "medium", exp: "Noting down peer names and points enables personalized, cohesive rebuttals and synthesis." },
      { q: "When a participant is speaking, looking at your wristwatch or phone is viewed as:", opt: ["Disrespectful, disengaged, and unprofessional", "A sign of exceptional time management skills", "A demonstration of high productivity", "A power move that intimidates the speaker"], ans: 0, diff: "medium", exp: "Checking watches or phones conveys disinterest and lack of basic professional respect." },
      { q: "What should you do if the topic is an abstract one, like 'Black or White'?", opt: ["Deconstruct the metaphor (e.g. absolutism vs nuance, binary code vs human complexity, compliance vs innovation)", "Complain that the topic makes no sense", "Talk about black and white shirts you own", "Remain silent until someone brings up politics"], ans: 0, diff: "hard", exp: "Abstract topics test creative lateral thinking; mapping them to technological, philosophical, or business paradigms shows depth." },
      { q: "If you spoke 4 times for 30 seconds with high impact vs someone who spoke once for 4 minutes with rambling filler, who scores higher?", opt: ["The candidate with concise, high-impact contributions", "The candidate with the 4-minute monologue", "Both will score identical marks", "Neither will pass"], ans: 0, diff: "hard", exp: "Concise, frequent, high-substance contributions demonstrate precision, agility, and team collaboration." }
    ]
  },

  // 5. Leadership & Team Behaviour
  {
    topic: "Leadership & Team Behaviour",
    prefix: "comm-ltb",
    items: [
      { q: "In a collaborative corporate setting, what defines authentic leadership?", opt: ["Empowering teammates, clearing obstacles, and driving collective outcomes", "Ordering people around and blaming subordinates for failures", "Doing all the work alone to prove superiority", "Taking full credit for all team accomplishments"], ans: 0, diff: "easy", exp: "Servant leadership focuses on enabling team success, alignment, and collaborative problem-solving." },
      { q: "When your project team encounters an unexpected technical roadblock, the leader should first:", opt: ["Gather the team to conduct root-cause analysis and brainstorm solutions without assigning blame", "Send an angry email to the entire department", "Conceal the roadblock from management until deadline day", "Immediately resign from the project"], ans: 0, diff: "easy", exp: "Effective leaders maintain composure, focus on root cause, and foster psychological safety to solve problems." },
      { q: "What is the hallmark of high psychological safety in an engineering team?", opt: ["Team members openly share mistakes, challenge ideas, and ask questions without fear of ridicule", "Nobody ever disagrees with the manager's technical proposals", "Zero bugs are ever reported in production logs", "All decisions are made exclusively by the most senior architect"], ans: 0, diff: "easy", exp: "Psychological safety encourages vulnerability, transparent learning, and rapid innovation." },
      { q: "How should a software lead handle credit allocation after a major product milestone?", opt: ["Publicly acknowledge and praise specific team member contributions while shouldering responsibility for shortcomings", "Claim the entire architectural success as their personal genius", "Distribute praise only to their personal friends", "Refuse to celebrate because work is expected"], ans: 0, diff: "easy", exp: "Great leaders give credit away to their team and absorb responsibility during setbacks." },
      { q: "Two senior developers have a fundamental architectural disagreement regarding SQL vs NoSQL. As the lead, what is the best resolution approach?", opt: ["Facilitate a structured spike/proof-of-concept where both options are benchmarked against agreed product requirements", "Pick your favorite developer and tell the other to be quiet", "Flip a coin to determine the architecture", "Cancel the project entirely"], ans: 0, diff: "medium", exp: "Empirical benchmarking against objective business constraints depersonalizes technical debates." },
      { q: "What is 'servant leadership' in modern agile software development?", opt: ["The leader's primary role is removing impediments and serving the team's operational needs", "The leader expects team members to act as personal servants", "The team works without any leadership or direction", "The Scrum Master writes all the code for developers"], ans: 0, diff: "medium", exp: "Servant leadership flips traditional hierarchy: leaders support and empower autonomous teams." },
      { q: "When delegating tasks to a junior developer, a good mentor provides:", opt: ["Clear context on the 'why', expected deliverables, and available guidance while encouraging autonomous problem solving", "Zero instructions and complete radio silence", "Micro-management by typing on their keyboard every 10 minutes", "Tasks with impossible deadlines to test their mental endurance"], ans: 0, diff: "medium", exp: "Effective delegation balances clear expectations with autonomy and psychological support." },
      { q: "A sprint deadline is approaching and the team is behind schedule. What is the most constructive action?", opt: ["Collaborate with the Product Owner to de-scope lower-priority features while protecting quality", "Force the team to work 18-hour days over the weekend", "Silently commit broken, untested code to claim completion", "Blame the QA engineers for taking too long to test"], ans: 0, diff: "medium", exp: "De-scoping non-critical user stories preserves code quality, prevents burnout, and maintains predictability." },
      { q: "What is the 'Tuckman model' of team development?", opt: ["Forming, Storming, Norming, Performing, Adjourning", "Planning, Coding, Testing, Deploying, Monitoring", "Hiring, Training, Reviewing, Promoting, Retiring", "Discovering, Prototyping, Scaling, Monetizing, Exiting"], ans: 0, diff: "hard", exp: "Bruce Tuckman's model describes the psychological stages teams progress through to achieve peak performance." },
      { q: "In a blameless post-mortem after an outage, what is the core guiding philosophy?", opt: ["Failures are systemic vulnerabilities in processes and tooling, not individual moral shortcomings", "Identify which developer pushed the bad commit and revoke their commit access", "Require the responsible engineer to write an apology letter to the CEO", "Pretend the incident never occurred to protect company PR"], ans: 0, diff: "hard", exp: "Blameless post-mortems treat incidents as opportunities to harden automated safety guards and system architecture." }
    ]
  },

  // 6. Extempore
  {
    topic: "Extempore",
    prefix: "comm-ext",
    items: [
      { q: "What does an 'Extempore' round primarily evaluate in a placement drive?", opt: ["Spontaneous thinking, composure, structured delivery, and fluency under time pressure", "Your ability to memorize a 20-page prepared essay", "How many fancy vocabulary words you can string together", "Your theatrical acting performance"], ans: 0, diff: "easy", exp: "Extempore tests quick cognitive retrieval, emotional composure, and structured oral articulation with zero preparation." },
      { q: "You are given 1 minute to prepare for an extempore topic. How should you spend that minute?", opt: ["Structure 3 key points: a compelling hook/opening, 2-3 logical core pillars, and a forward-looking conclusion", "Panic and try to write out every single sentence word-for-word", "Ask the interviewer to change the topic to cricket", "Stare at the wall and wait for your turn"], ans: 0, diff: "easy", exp: "A 3-pillar outline (Beginning, Middle, End) anchors your impromptu speech and prevents mental rambling." },
      { q: "If you draw the extempore topic: 'Cloud Computing: The Virtual Sky', what is a great opening angle?", opt: ["Demystify the metaphor: 'The cloud is simply someone else's computer operating at planetary scale with elasticity.'", "'Clouds are made of water vapor in the sky.'", "'I don't know anything about weather forecasting.'", "'Computers are very fast nowadays.'"], ans: 0, diff: "easy", exp: "Grounding an abstract metaphor into technical and business reality immediately engages evaluators." },
      { q: "What should you do if you freeze for a few seconds during an extempore speech?", opt: ["Maintain composure, take a deep breath, say 'Excuse me', and smoothly transition to your next structured point", "Burst into tears and apologize repeatedly", "Sprint out of the interview room", "Start speaking gibberish to fill the sound"], ans: 0, diff: "easy", exp: "A deliberate, composed pause is perceived as thoughtful reflection; panicking exposes loss of emotional control." },
      { q: "What is an effective framework for organizing impromptu extempore speeches?", opt: ["Past - Present - Future framework", "Random stream-of-consciousness", "Only talking about your college life", "Repeating the topic title 15 times"], ans: 0, diff: "medium", exp: "The Past-Present-Future framework naturally structures historical context, current industry state, and future trajectory." },
      { q: "What is the recommended speaking duration for a standard placement extempore speech?", opt: ["1.5 to 2 minutes", "10 to 15 seconds", "10 to 12 minutes", "Until the interviewer cuts the microphone"], ans: 0, diff: "medium", exp: "A crisp, structured delivery of 90-120 seconds hits all evaluation criteria without diluting substance." },
      { q: "How should you conclude an extempore speech?", opt: ["Summarize the core takeaway in one memorable line, thank the panel, and step back with a smile", "Say 'Yeah, that's all I know, thanks bye.'", "Abruptly stop talking mid-sentence when the timer buzzes", "Ask the judges what marks they will give you"], ans: 0, diff: "medium", exp: "A definitive concluding takeaway delivered with gratitude leaves a polished, professional impression." },
      { q: "You are given an abstract topic: 'Zero'. How can you deliver a strong, multi-dimensional response?", opt: ["Discuss zero in mathematics (Aryabhata), computer science (binary 0 and index 0), and organizational culture (zero-defect mindset)", "Say zero is a circle and sit down", "Complain that zero has no value", "Talk about getting zero marks in a test"], ans: 0, diff: "medium", exp: "Multi-disciplinary mapping (history, computer science, management) showcases intellectual breadth." },
      { q: "What role does pacing (cadence) play during an impromptu speech?", opt: ["A steady, measured cadence gives your brain time to formulate the next sentence while projecting confidence", "Speaking as fast as humanly possible proves superior intelligence", "Speaking so slowly that there are 10-second gaps between words", "Alternating between shouting and whispering"], ans: 0, diff: "hard", exp: "A measured speaking pace (~120-140 words per minute) gives you cognitive runway to think ahead cleanly." },
      { q: "How should you handle controversial extempore topics (e.g., political or social debates)?", opt: ["Acknowledge multiple stakeholder perspectives, present objective arguments, and conclude with a balanced, constructive view", "Take an extreme, radical partisan stance and attack opponents", "Refuse to speak on grounds of personal sensitivity", "Claim that everyone who disagrees is evil"], ans: 0, diff: "hard", exp: "Diplomatic objectivity and nuanced balance demonstrate executive presence and professional detachment." }
    ]
  },

  // 7. Presentation Skills
  {
    topic: "Presentation Skills",
    prefix: "comm-prs",
    items: [
      { q: "What is the '10-20-30' rule of PowerPoint presentations popularized by Guy Kawasaki?", opt: ["10 slides, 20 minutes duration, minimum 30-point font size", "10 people in audience, 20 slides, 30 animations", "10 minutes, 20 slides, 30 graphics", "10 bullet points per slide, 20 words, 30 slides"], ans: 0, diff: "easy", exp: "The rule enforces brevity and visual legibility: no more than 10 slides, 20 minutes, and 30pt font minimum." },
      { q: "What is the primary purpose of slide visual aids in a technical presentation?", opt: ["To support and amplify the speaker's narrative with clear diagrams and key takeaways", "To act as a complete teleprompter for the speaker to read word-for-word", "To cram as much unreadable source code as possible onto the screen", "To show fancy flying transitions and sound effects"], ans: 0, diff: "easy", exp: "Slides exist to support the speaker's story visually, not to serve as a script to read aloud." },
      { q: "How should a speaker maintain engagement with a large audience during a presentation?", opt: ["Scan different sections of the room, make natural eye contact with individuals, and modulate vocal pitch", "Stare fixedly at the projection screen behind them", "Look exclusively at their laptop screen", "Close their eyes to recite memorized text"], ans: 0, diff: "easy", exp: "Triangulating eye contact across the room creates an inclusive, conversational connection with the audience." },
      { q: "When presenting your final-year engineering capstone project, what should the first slide establish?", opt: ["The core problem statement, why it matters, and who is affected", "The entire 500-line database schema", "Your resume and high school marks", "A list of apologies for incomplete features"], ans: 0, diff: "easy", exp: "Framing the real-world problem and its business/social significance hooks the audience before technical deep-dives." },
      { q: "What is the 'Rule of Thirds' when designing presentation slides?", opt: ["A visual composition principle placing focal content at intersecting grid points for maximum visual appeal", "Dividing every slide into exactly three paragraphs", "Giving three presentations every day", "Allowing only one-third of the audience to ask questions"], ans: 0, diff: "medium", exp: "The Rule of Thirds is a design principle ensuring balanced, visually engaging slide layouts." },
      { q: "An audience member asks a tough technical question during Q&A that you do not know the answer to. What is the best response?", opt: ["'That is a great edge case; we have not evaluated that specific benchmark yet, but I would be glad to investigate and follow up with you after.'", "'That question is stupid and irrelevant to my project.'", "Invent an answer with fabricated technical terms on the spot", "Ignore them and ask for the next question"], ans: 0, diff: "medium", exp: "Admitting boundaries of current knowledge while offering a professional follow-up displays honesty and integrity." },
      { q: "Why should bullet points on presentation slides be kept concise?", opt: ["Audience members cannot read dense text while simultaneously listening to the speaker", "PowerPoint crashes if you write more than 5 words", "Evaluators penalize slides with bullet points", "It is illegal under presentation copyright laws"], ans: 0, diff: "medium", exp: "Cognitive split-attention effect: people read faster than you speak, leading them to tune out your voice." },
      { q: "How should you transition smoothly between two slides in a presentation?", opt: ["Connect the conclusion of the current slide to the upcoming problem on the next before advancing", "Click next and say 'Okay, this slide says...'", "Ask the audience what they think the next slide will be", "Remain silent for 30 seconds after every click"], ans: 0, diff: "medium", exp: "Verbal transition bridges create a cohesive narrative flow rather than disjointed slide-by-slide reading." },
      { q: "What is the best way to present architecture diagrams to non-technical executive stakeholders?", opt: ["Start with a high-level conceptual flow showing user value before drilling into component specifics", "Show raw AWS infrastructure configuration JSON files", "Tell them architecture is too complicated for them to understand", "Skip the architecture entirely and show stock photos"], ans: 0, diff: "hard", exp: "Executives care about data flow, business value, security, and scalability rather than raw low-level code." },
      { q: "What is 'death by PowerPoint' and how is it prevented?", opt: ["Audience fatigue caused by text-heavy, monotonous slides; prevented with visual diagrams, stories, and brevity", "A computer virus that corrupts presentation files", "Running out of battery during a presentation", "Presenting without a laser pointer"], ans: 0, diff: "hard", exp: "Death by PowerPoint refers to cognitive overload from cluttered slides; remedied by visual storytelling." }
    ]
  },

  // 8. Active Listening
  {
    topic: "Active Listening",
    prefix: "comm-al",
    items: [
      { q: "What is the defining characteristic of 'Active Listening'?", opt: ["Listening with the intent to fully understand the speaker, rather than just waiting for your turn to reply", "Nodding continuously while checking social media on your phone", "Interrupting the speaker to complete their sentences for them", "Memorizing every word spoken to find logical fallacies"], ans: 0, diff: "easy", exp: "Active listening focuses completely on understanding the speaker's message, perspective, and underlying emotions." },
      { q: "Which non-verbal cue signals active listening during a one-on-one interview or team meeting?", opt: ["Maintaining attentive eye contact, leaning slightly forward, and occasional affirmative nodding", "Looking repeatedly at your watch or the door", "Slouching back with arms crossed over your chest", "Staring blankly at the ceiling"], ans: 0, diff: "easy", exp: "Open posture, gentle forward lean, and nodding communicate engagement and respect." },
      { q: "What is a verbal technique used in active listening to ensure mutual understanding?", opt: ["Reflective questioning and summarizing: 'So what you're saying is that the bottleneck occurs during authentication?'", "Telling the speaker that you are smarter than them", "Saying 'Yeah, yeah, hurry up'", "Changing the topic to something you prefer"], ans: 0, diff: "easy", exp: "Reflective questioning confirms alignment and shows the speaker their thoughts have been registered accurately." },
      { q: "In a sprint retrospective, a colleague expresses frustration about deployment delays. How does an active listener respond?", opt: ["'I hear your frustration with deployment pipeline friction; let's identify what CI steps are causing the slowdown.'", "'You complain too much, the pipeline works fine on my laptop.'", "'That's not my problem, talk to the DevOps engineer.'", "'Cheer up, everything will be fine.'"], ans: 0, diff: "easy", exp: "Empathic validation paired with constructive problem-solving demonstrates mature listening." },
      { q: "What is 'evaluative listening' as opposed to 'empathic listening'?", opt: ["Evaluative listening critically judges the validity and logic of arguments, while empathic listening seeks to understand emotional states", "They are identical terms with no distinction", "Evaluative listening is for children; empathic is for adults", "Empathic listening is used only in medical settings"], ans: 0, diff: "medium", exp: "Evaluative listening analyzes facts and evidence; empathic listening connects with feelings and motives." },
      { q: "Why is interrupting a speaker before they complete their thought destructive to communication?", opt: ["It signals that you value your own assumptions over the speaker's actual insight and creates defensiveness", "It makes the conversation move twice as fast", "It shows the interviewer that you have high energy", "It proves that you can predict the future"], ans: 0, diff: "medium", exp: "Premature interruptions break thought flow, introduce misunderstandings, and disrespect the speaker." },
      { q: "What is an 'open-ended question' used by active listeners to invite deeper collaboration?", opt: ["'What factors contributed to the server timeout during yesterday's stress test?'", "'Did the server crash? (Yes/No)'", "'Are you done speaking?'", "'Do you agree with me?'"], ans: 0, diff: "medium", exp: "Open-ended questions (starting with What, How, Why) invite expansive analysis and deeper insights." },
      { q: "What is the 'listening barrier' known as 'prejudgment'?", opt: ["Dismissing the speaker's ideas before they finish based on preexisting biases or stereotypes", "Listening to a speech before reading the written transcript", "Testing audio equipment before a conference call", "Taking notes during a lecture"], ans: 0, diff: "medium", exp: "Prejudgment closes the listener's mind to new data based on assumptions about the speaker's identity or role." },
      { q: "During a technical requirement gathering session, a client provides vague requirements. An active listener:", opt: ["Asks clarifying probing questions and maps user stories with concrete examples to eliminate ambiguity", "Builds whatever they feel like and complains about the client later", "Nods without asking questions and hopes for the best", "Tells the client they don't know what they are doing"], ans: 0, diff: "hard", exp: "Probing for clarity and documenting concrete examples transforms ambiguous client desires into technical specs." },
      { q: "In high-stakes technical negotiations, what does the technique of 'mirroring' achieve?", opt: ["Repeating the last 2-3 critical words of the speaker with an upward inflection to prompt deeper explanation without confrontation", "Imitating the speaker's clothes and voice", "Reflecting sunlight into the speaker's eyes", "Looking into a mirror while negotiating"], ans: 0, diff: "hard", exp: "Chris Voss's mirroring technique builds subconscious rapport and encourages the counterpart to expand on their thoughts." }
    ]
  },

  // 9. Professional Communication
  {
    topic: "Professional Communication",
    prefix: "comm-pc",
    items: [
      { q: "What is the cornerstone of professional communication in a software company?", opt: ["Clarity, brevity, contextual accuracy, and respect for the recipient's time", "Using complicated vocabulary to impress management", "Writing five-page essays for minor status updates", "Communicating solely through memes and emojis"], ans: 0, diff: "easy", exp: "Professional communication prioritizes actionable clarity, precision, and respectful brevity." },
      { q: "How should you deliver constructive feedback to a peer regarding poor code formatting?", opt: ["Focus on the code and standards: 'Let's ensure our modules adhere to our team's ESLint config to keep PRs clean.'", "Attack the individual: 'You write terrible, unreadable code.'", "Complain to the CTO behind their back", "Silently delete their code from the repository"], ans: 0, diff: "easy", exp: "Constructive feedback critiques the work against shared standards, never the person's character." },
      { q: "When working in an asynchronous distributed engineering team, how should you post a technical question on Slack/Teams?", opt: ["State the context, what you have tried, relevant logs/code snippets, and the specific question in a single message", "Post 'Hi' and wait for someone to reply before typing your question", "Direct message 10 different people individually with 'Help'", "Call senior engineers without warning on their personal phones"], ans: 0, diff: "easy", exp: "Avoiding the 'no-hello' antipattern by providing full context in the initial post enables efficient async problem solving." },
      { q: "What is the 7 Cs framework of effective communication?", opt: ["Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous", "Clever, Complicated, Casual, Cold, Critical, Cautious, Cyclic", "Coding, Compiling, Checking, Committing, Calling, Chatting, Closing", "None of the above"], ans: 0, diff: "easy", exp: "The classic 7 Cs framework guarantees high-quality, professional, and courteous transmission of information." },
      { q: "What is the best way to decline an unrealistic engineering feature deadline requested by sales?", opt: ["Present the technical estimates, explain the trade-offs on quality and technical debt, and offer viable scope alternatives", "Say 'No way, you people are crazy' and hang up", "Promise to finish it on time and secretly fail at the deadline", "Blame the engineering team for being too slow"], ans: 0, diff: "medium", exp: "Professional boundary management pairs realistic technical data with constructive alternatives." },
      { q: "In a daily standup meeting, your update should answer which three core questions?", opt: ["What did I complete yesterday? What will I work on today? Are there any blockers in my path?", "What did I have for dinner? What is my favorite movie? Who made mistakes yesterday?", "How much do I dislike our current codebase? Why is management wrong? When is lunch?", "Reciting every line of code written over the last 24 hours"], ans: 0, diff: "medium", exp: "The standard Scrum daily standup focuses on yesterday's progress, today's goal, and active blockers." },
      { q: "What is the recommended approach for writing an issue ticket or bug report in Jira/GitHub?", opt: ["Clear title, reproducible steps, expected vs actual behavior, environment details, and relevant stack trace", "Writing 'App is broken, please fix ASAP' without any logs", "Attaching a video of your entire desktop for 30 minutes", "Creating a ticket without any description"], ans: 0, diff: "medium", exp: "Actionable bug reports contain deterministic steps to reproduce, environment specifics, and log traces." },
      { q: "What does 'managing up' mean in professional corporate communication?", opt: ["Proactively keeping your manager informed of project progress, risks, and proposed solutions to make their job easier", "Telling your manager what to do in front of everyone", "Attempting to take your manager's position through political maneuvering", "Ignoring your manager's requests"], ans: 0, diff: "medium", exp: "Managing up is proactive alignment, anticipating management questions, and bringing solutions rather than just problems." },
      { q: "When communicating technical incidents to executive non-technical leadership, engineers must translate technical failures into:", opt: ["Business impact: user experience degradation, affected revenue streams, and remediation timeline", "Complex kernel panic assembly memory addresses", "Excuses explaining why the cloud provider is to blame", "Technical jargon that prevents scrutiny"], ans: 0, diff: "hard", exp: "Executives require visibility into business risk, customer impact, financial exposure, and recovery time." },
      { q: "What is the 'BLUF' (Bottom Line Up Front) communication technique originated by the military?", opt: ["Placing the core conclusion, recommendation, or action item at the very beginning of the document or message", "Writing the most confusing sentence first to stimulate curiosity", "Never telling anyone the conclusion until the end of the year", "Ending an email with a blunt criticism"], ans: 0, diff: "hard", exp: "BLUF puts the executive summary or decision request in the first sentence, respecting recipient time." }
    ]
  },

  // 10. Email & Workplace Communication
  {
    topic: "Email & Workplace Communication",
    prefix: "comm-ewc",
    items: [
      { q: "What makes an email subject line effective in a workplace context?", opt: ["Specific, actionable, and informative (e.g. '[Action Required] Review API Architecture Proposal by Friday')", "'Hey check this out'", "'Urgent!!!!!!!!'", "Leaving the subject line completely blank"], ans: 0, diff: "easy", exp: "Clear subject lines convey urgency, topic, and expected action, improving triage efficiency." },
      { q: "When should the 'Reply All' button be avoided?", opt: ["When your response is a simple 'Thank you' or only relevant to the original sender", "When the email is an all-hands announcement requiring everyone's attention", "When the email is an incident notification to all engineers", "Reply All should never be avoided"], ans: 0, diff: "easy", exp: "Using 'Reply All' for trivial acknowledgments clutters inboxes for hundreds of colleagues unnecessarily." },
      { q: "What is the function of the 'Bcc' (Blind Carbon Copy) field in business emails?", opt: ["To send an email to recipients while keeping their email addresses hidden from other recipients", "To send an email that deletes itself after 24 hours", "To make sure the recipient cannot reply to the email", "To send an encrypted cryptographic hash of the email"], ans: 0, diff: "easy", exp: "Bcc protects recipient privacy when broadcasting to large external mailing lists and prevents accidental 'Reply All' storms." },
      { q: "What is the recommended turnaround time for responding to internal workplace emails during business hours?", opt: ["Within 24 hours, or a brief acknowledgment if research is required", "Within 10 seconds, regardless of whether you are driving or coding", "After 2 weeks, so people stop asking questions", "Emails do not require any response"], ans: 0, diff: "easy", exp: "A 24-hour response (or quick receipt acknowledgment) represents professional etiquette and operational reliability." },
      { q: "You receive an angry, emotional email from a client criticizing your team's software release. What is the best course of action?", opt: ["Pause, do not respond immediately in anger, review facts objectively, and draft a calm, factual, solution-focused response", "Instantly reply in all-caps insulting their technical competence", "Forward the email to social media to publicly humiliate the client", "Block the client's email domain on the company mail server"], ans: 0, diff: "medium", exp: "Emotional detachment and responding calmly with facts and solutions defuses hostility professionally." },
      { q: "Which greeting and sign-off pairing is most appropriate for formal professional correspondence?", opt: ["'Dear Mr. Sharma,' ... 'Sincerely, [Your Name]'", "'Yo what's up dude,' ... 'Peace out'", "'Hey guys,' ... 'Yours eternally'", "'To whom it may concern,' ... 'Later'"], ans: 0, diff: "medium", exp: "'Dear [Name]' and 'Sincerely / Best regards' maintain standard professional respect." },
      { q: "Why should writing in ALL CAPS be avoided in workplace emails and Slack messages?", opt: ["It is interpreted across digital communication as shouting and aggression", "It consumes twice as much server network bandwidth", "Modern email clients reject emails written in capital letters", "It is considered grammatically correct only on weekends"], ans: 0, diff: "medium", exp: "All-caps text is universally perceived as shouting, hostility, or lack of emotional restraint." },
      { q: "How should attachments be handled in professional business emails?", opt: ["Reference the attachment in the body text and ensure file names are descriptive and formatted cleanly", "Attach an unnamed file called 'Untitled_final_v2_new.pdf' without mentioning it", "Send 50 individual high-resolution screenshots without compressing", "Paste raw binary files into the text body"], ans: 0, diff: "medium", exp: "Contextual references and clean file naming ('Q3_Financial_Performance_Report.pdf') ensure clarity." },
      { q: "What is a professional 'Out of Office' (OOO) auto-responder message?", opt: ["Specifies exact dates of absence, emergency contact details, and expected response turnaround upon return", "States 'I am on vacation, don't bother me'", "A blank email that bounces back", "An email warning people not to message you"], ans: 0, diff: "hard", exp: "An effective OOO auto-responder sets expectations by detailing dates away and point of contact for urgent escalations." },
      { q: "What legal consideration should software engineers remember when communicating on workplace channels (Slack/Email)?", opt: ["All corporate communication records are discoverable legal documents and company property", "Workplace messages are legally classified as private personal thoughts", "Engineers are legally exempt from corporate audit policies", "Slack messages are permanently deleted after 1 hour by law"], ans: 0, diff: "hard", exp: "All corporate communications can be audited or subpoenaed in litigation; professional decorum is mandatory." }
    ]
  }
];

// Append all comm questions
const commQuestions = [];
commGroups.concat(extraComm).forEach(group => {
  group.items.forEach((item, index) => {
    const qNum = String(index + 1).padStart(2, '0');
    // Check if ID already exists
    const qId = `${group.prefix}-${qNum}`;
    const exists = commQuestions.some(q => q.id === qId);
    if (!exists) {
      commQuestions.push({
        id: qId,
        category: "communication",
        topic: group.topic,
        difficulty: item.diff,
        question: item.q,
        options: item.opt,
        correctAnswer: item.ans,
        explanation: item.exp
      });
    }
  });
});

console.log(`Total Communication questions: ${commQuestions.length}`);

// Write communication.js
const commFileContent = `/**
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
    totalTopics: ${commTopics.length},
    topics: ${JSON.stringify(commTopics, null, 2)},
    practiceTopics: ${JSON.stringify(gdPracticeTopics, null, 2)},
    questions: ${JSON.stringify(commQuestions, null, 2)}
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['communication'] = commData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = commData;
  }
})();
`;

fs.writeFileSync(path.join(targetDir, 'communication.js'), commFileContent, 'utf8');
console.log('Successfully written communication.js!');


// =========================================================================
// 2. HR & BEHAVIORAL INTERVIEW
// =========================================================================
const hrQuestions = [
  {
    id: "hr-core-01",
    question: "Tell me about yourself.",
    whatInterviewerIsEvaluating: "Communication clarity, professional trajectory, ability to synthesize background concisely, and relevance of skills to the role.",
    goodAnswerStructure: "Present-Past-Future Model: 1) Present: Current role/education and primary technical passions. 2) Past: Significant projects, internships, or practical milestones that built your foundation. 3) Future: Why this company and role represent the ideal next step.",
    whatToAvoid: "Reciting your entire resume line-by-line, sharing irrelevant personal life stories from childhood, rambling for more than 2 minutes without structure, or displaying self-doubt.",
    exampleAnswerFramework: "'I am a final-year Computer Science student specializing in scalable backend engineering. Over the past two years, I've focused on distributed systems and cloud microservices—most notably architecting an open-source real-time event streaming platform that handles 10,000 events per second. During my recent internship at XYZ Tech, I optimized database queries to reduce API latency by 35%. I am energized by your company's focus on high-throughput distributed infrastructure, and I'm excited to bring my backend design and problem-solving skills to this engineering team.'"
  },
  {
    id: "hr-core-02",
    question: "Why should we hire you?",
    whatInterviewerIsEvaluating: "Self-awareness, understanding of job requirements, alignment of skills with company pain points, and confidence without arrogance.",
    goodAnswerStructure: "Value-Add Intersection: 1) Acknowledge the core challenge of the role. 2) Provide 2-3 specific technical and collaborative strengths directly addressing those needs. 3) Highlight cultural enthusiasm and fast learning curve.",
    whatToAvoid: "Generic cliches ('Because I am hardworking'), sounding desperate ('Because I need this job'), or making unsubstantiated claims without project evidence.",
    exampleAnswerFramework: "'You should hire me because I bridge the gap between strong algorithmic fundamentals and practical production-ready development. For example, in the job description you highlighted the need for engineers who understand both RESTful microservices and asynchronous queue architectures; in my capstone project, I built exactly that using Node.js, Redis, and RabbitMQ, cutting job processing latency in half. Beyond technical execution, I am a collaborative engineer who communicates clearly and embraces constructive code reviews. I can contribute to your production pipeline with minimal onboarding overhead.'"
  },
  {
    id: "hr-core-03",
    question: "Why do you want to join this company?",
    whatInterviewerIsEvaluating: "Genuine company research, alignment with product mission, cultural fit, and long-term interest rather than submitting indiscriminate mass applications.",
    goodAnswerStructure: "Mission-Product-Growth Trifecta: 1) Specific product or architectural engineering accomplishment by the company you admire. 2) Alignment with their corporate culture or engineering blogs. 3) How the company's technical scale fuels your career growth.",
    whatToAvoid: "Giving generic flattery that applies to any tech company ('You are a market leader and have great offices'), focusing solely on salary/perks, or revealing you don't know what the company actually builds.",
    exampleAnswerFramework: "'I have been following your engineering blog, particularly your recent post on migrating your payment infrastructure to event-driven serverless architectures. As an engineer passionate about distributed fault tolerance, solving challenges at your scale—processing millions of daily financial transactions—is the exact environment where I want to test and sharpen my skills. Furthermore, your open-source contributions and commitment to continuous learning align deeply with my personal engineering philosophy.'"
  },
  {
    id: "hr-core-04",
    question: "What are your greatest strengths?",
    whatInterviewerIsEvaluating: "Relevance of strengths to software engineering, self-awareness, and whether claims are substantiated by tangible project proof.",
    goodAnswerStructure: "Claim-Evidence-Impact Formula: State a clear core strength, back it up with a real technical project example, and describe the measurable positive impact.",
    whatToAvoid: "Listing 15 unrelated adjectives ('I am smart, punctual, honest, fast...'), choosing irrelevant traits, or sounding boastful without backing evidence.",
    exampleAnswerFramework: "'My greatest strength is deep analytical debugging and systematic root-cause analysis. When facing ambiguous production issues, I don't guess—I inspect logs, formulate testable hypotheses, and isolate variables. For instance, during our team's hackathon project, our server crashed intermittently under load; by instrumenting distributed tracing with OpenTelemetry, I isolated the issue to an unindexed database foreign key lock, reducing query timeouts to zero. My other strength is technical adaptability—I ramped up on Docker and Kubernetes within two weeks to automate our CI/CD pipeline.'"
  },
  {
    id: "hr-core-05",
    question: "What is your greatest weakness?",
    whatInterviewerIsEvaluating: "Honesty, self-awareness, emotional maturity, and whether you take active, proactive steps to improve upon shortcomings.",
    goodAnswerStructure: "Real Weakness + Active Remediation: 1) State a genuine professional weakness (not a fatal flaw). 2) Explain how it previously affected your work. 3) Detail the concrete systems/habits you have built to overcome it.",
    whatToAvoid: "Fake humblebrags ('I work too hard', 'I am too perfectionist'), disqualifying weaknesses ('I hate teamwork', 'I miss deadlines constantly'), or claiming you have zero weaknesses.",
    exampleAnswerFramework: "'Earlier in my engineering journey, I had a tendency to spend too much time attempting to solve complex technical blockers entirely on my own before reaching out for guidance, which occasionally delayed ticket progression. I recognized that while self-reliance is valuable, team velocity is paramount. To fix this, I adopted a strict 45-minute timebox rule: if I cannot make measurable progress on a bug after 45 minutes of systematic debugging and documentation research, I formulate a clear summary of what I've tried and consult a teammate. This has made my problem-solving much faster and boosted team collaboration.'"
  },
  {
    id: "hr-core-06",
    question: "Tell me about a challenging project and how you managed it.",
    whatInterviewerIsEvaluating: "Technical complexity, project ownership, problem decomposition, resilience under obstacles, and structured STAR storytelling.",
    goodAnswerStructure: "STAR Model: Situation (context/problem), Task (your specific role/responsibility), Action (the systematic engineering steps you executed), Result (measurable technical/business impact).",
    whatToAvoid: "Blaming team members for delays, giving a high-level summary without explaining your personal engineering contributions, or picking a trivial homework assignment.",
    exampleAnswerFramework: "'During my final year, our team built a collaborative code editor with real-time synchronization (Situation). My task was to implement the operational transformation algorithm so simultaneous keystrokes would merge deterministically without race conditions (Task). Initially, network latency caused document desynchronization under rapid concurrent edits. I researched conflict-free replicated data types (CRDTs), benchmarked Yjs vs custom WebSockets, and re-architected our state synchronization into an event-driven CRDT model with client-side caching (Action). As a result, the editor sustained 50 simultaneous users per document with under 15ms sync latency, and our project was selected as the top departmental capstone (Result).'"
  },
  {
    id: "hr-core-07",
    question: "Tell me about a time you failed.",
    whatInterviewerIsEvaluating: "Accountability, resilience, absence of defensiveness, and the ability to extract actionable lessons from setbacks.",
    goodAnswerStructure: "Accountability-Remediation-Growth: 1) Admit an actual technical or project mistake transparently. 2) Explain the immediate corrective action taken. 3) Highlight the preventative mechanisms put in place so it never happened again.",
    whatToAvoid: "Claiming you've never failed, blaming colleagues or external tools, or picking an catastrophic ethical violation.",
    exampleAnswerFramework: "'During my software engineering internship, I pushed a database migration script directly to our staging environment without running our local pre-flight rollback test first (Situation). The migration locked a core table, causing staging integration tests to fail for the entire QA team (Failure). I immediately notified my mentor, owned the mistake, and manually executed the rollback procedure to restore staging within 20 minutes (Action). To ensure this never happened again, I updated our CI pipeline to mandate an automated dry-run rollback check before any migration branch could be merged (Learning/Prevention). That taught me that automated safety rails are always superior to relying on manual developer discipline.'"
  },
  {
    id: "hr-core-08",
    question: "Tell me about a conflict in a team and how you handled it.",
    whatInterviewerIsEvaluating: "Conflict resolution skills, emotional intelligence, empathy, and putting project goals above personal ego.",
    goodAnswerStructure: "De-escalation to Objective Metrics: 1) Describe the professional disagreement (avoid personal animosity). 2) Explain how you communicated with empathy. 3) Detail the compromise or empirical benchmark used to resolve it.",
    whatToAvoid: "Depicting your teammate as malicious or incompetent, claiming you forced them to concede, or escalating to management unnecessarily.",
    exampleAnswerFramework: "'During a hackathon, my teammate and I had a strong disagreement regarding whether to build our backend with Python FastAPI or Go. He wanted Go for raw execution performance, while I advocated for FastAPI due to our tight 24-hour timeline and existing Python machine learning models (Disagreement). Rather than arguing opinions, I suggested a 30-minute timeboxed discussion where we listed our MVP requirements. We realized our bottleneck was ML inference latency, not HTTP routing speed, and FastAPI allowed us to integrate the AI models in 2 hours instead of 8 (De-escalation/Data). He agreed with the reasoning, and we successfully submitted the working MVP on time, winning second place.'"
  },
  {
    id: "hr-core-09",
    question: "Where do you see yourself in 5 years?",
    whatInterviewerIsEvaluating: "Ambition, career intentionality, realistic progression expectations, and whether your growth trajectory aligns with the company's path.",
    goodAnswerStructure: "Skill Depth to Architectural Leadership: 1) Near term (1-2 years): Master the codebase, achieve autonomous feature delivery, and earn team trust. 2) Mid term (3-5 years): Grow into a technical lead/architect responsible for system design, mentoring juniors, and driving cross-functional projects.",
    whatToAvoid: "Saying 'I want your job', revealing you plan to leave for graduate school or another industry in two years, or having zero concrete ambitions.",
    exampleAnswerFramework: "'Over the next two years, my goal is to deeply master your backend ecosystem, write resilient production code, and take complete end-to-end ownership of core service modules. Within five years, I see myself growing into a Senior Software Engineer and Technical Lead—spearheading architectural system design decisions, mentoring junior developers, and translating complex business requirements into scalable software architectures. Ultimately, I want to be recognized as a reliable technical anchor within this engineering organization.'"
  },
  {
    id: "hr-core-10",
    question: "Why should we select you over another candidate with similar technical qualifications?",
    whatInterviewerIsEvaluating: "Differentiating qualities, communication poise, culture add, and passion for the craft.",
    goodAnswerStructure: "The Complete Package: 1) Acknowledge that other candidates are talented. 2) Highlight your unique blend of technical competence, customer empathy, relentless ownership, and positive team energy.",
    whatToAvoid: "Belittling other candidates, sounding arrogant, or giving a purely transactional answer.",
    exampleAnswerFramework: "'While I respect that there are many capable candidates with similar academic credentials, my differentiator is my relentless sense of ownership and cross-functional empathy. I don't just write code to close a Jira ticket—I understand the end-user's pain point, document my architecture thoroughly, and write exhaustive automated tests so my teammates aren't called at 2 AM for regressions. When issues arise, I don't point fingers; I run toward the problem. That combination of engineering discipline, proactive communication, and genuine excitement for this product makes me an immediate culture add to your engineering team.'"
  }
];

// HR Situational / Behavioral MCQs (10 scenario questions)
const hrMCQs = [
  {
    id: "hr-mcq-01",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "easy",
    question: "You realize 2 hours before a major client demo that a critical bug has broken the primary checkout flow. What is the most professional response?",
    options: [
      "Immediately alert your team lead, provide a clear diagnosis of the bug, and propose a fallback script or rollback while working on a hotfix",
      "Conceal the bug and hope the client does not click the checkout button during the presentation",
      "Call in sick and leave the demo to your teammates without warning",
      "Blame the junior developer publicly in front of the client during the demo"
    ],
    correctAnswer: 0,
    explanation: "Proactive communication, transparent escalation, and proposing mitigating fallbacks reflect high professional ownership."
  },
  {
    id: "hr-mcq-02",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "easy",
    question: "During a code review, a senior engineer leaves critical comments on your pull request pointing out memory leaks in your algorithm. How should you react?",
    options: [
      "Thank the reviewer for catching the leak, ask clarifying questions if needed, and refactor the code to eliminate the leak",
      "Get defensive and argue that memory is cheap so leaks don't matter",
      "Delete your pull request and complain about the senior engineer to HR",
      "Ignore the comments and merge the code anyway because you have admin privileges"
    ],
    correctAnswer: 0,
    explanation: "Constructive code review feedback is an educational opportunity to harden code quality, not a personal attack."
  },
  {
    id: "hr-mcq-03",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "easy",
    question: "An interviewer asks you: 'What is your expected salary?' As a campus fresher, what is the best diplomatic response?",
    options: [
      "'I am focused on finding the right role to launch my career; I am confident the company offers competitive compensation aligned with industry standards for fresh graduates.'",
      "'I want at least double what you are offering to others.'",
      "'Whatever you want to give me, I am desperate.'",
      "'I will not answer until you tell me everyone else's salary.'"
    ],
    correctAnswer: 0,
    explanation: "Focusing on role fit and industry-standard competitiveness demonstrates professionalism without prematurely under-pricing or over-pricing yourself."
  },
  {
    id: "hr-mcq-04",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "easy",
    question: "When an interviewer asks: 'Do you have any questions for us?' at the end of the interview, what should you do?",
    options: [
      "Ask thoughtful questions about their engineering culture, technical challenges, or team roadmap",
      "Say 'No, I have no questions' and immediately get up to leave",
      "Ask 'Did I pass the interview and how much bonus do I get?'",
      "Ask what time everyone leaves the office on Fridays"
    ],
    correctAnswer: 0,
    explanation: "Asking intelligent questions about engineering culture, deployment pipelines, or team goals proves genuine interest and engagement."
  },
  {
    id: "hr-mcq-05",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "medium",
    question: "Your project manager assigns you a feature using a programming language you have never used before. How do you handle it?",
    options: [
      "Embrace the challenge, research language fundamentals, review existing team repositories for patterns, and estimate a realistic onboarding ramp-up",
      "Refuse the task and insist you only write code in languages you learned in college",
      "Pretend you are an expert and write uncompilable code",
      "Outsource the task to an external freelance forum"
    ],
    correctAnswer: 0,
    explanation: "Technical agility and willingness to learn new ecosystems are primary traits evaluated in software hires."
  },
  {
    id: "hr-mcq-06",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "medium",
    question: "A teammate takes credit during a company all-hands meeting for a caching architecture that you solely designed and implemented. What is the mature response?",
    options: [
      "Speak privately with the teammate after the meeting, express your concern calmly, and ensure future commit histories and documentation reflect accurate authorship",
      "Interrupt the all-hands meeting and call them a thief in front of executive management",
      "Sabotage their code repository in secret",
      "File an immediate lawsuit against the company"
    ],
    correctAnswer: 0,
    explanation: "Private, direct communication de-escalates conflict while establishing clear boundaries and verifiable documentation."
  },
  {
    id: "hr-mcq-07",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "medium",
    question: "You observe a senior colleague repeatedly making dismissive remarks to a new intern during technical design discussions. What is the most ethical action?",
    options: [
      "Support the intern by actively validating their ideas in the meeting, and discuss the pattern constructively with your engineering manager or mentor",
      "Join in with the senior colleague to gain their personal favor",
      "Ignore it completely because interns don't matter",
      "Post an anonymous rant on a public internet forum naming the colleague"
    ],
    correctAnswer: 0,
    explanation: "Fostering inclusive team environments by supporting marginalized peers and utilizing established leadership channels is ethical and effective."
  },
  {
    id: "hr-mcq-08",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "medium",
    question: "What is the primary reason interviewers ask behavioral questions like 'Tell me about a time you worked with a difficult person'?",
    options: [
      "To evaluate your interpersonal empathy, emotional regulation, and ability to separate personal irritation from professional objectives",
      "To hear juicy gossip about your college professors or past employers",
      "To see if you will criticize everyone you have ever worked with",
      "To test if you are a pushover who agrees with abusive behavior"
    ],
    correctAnswer: 0,
    explanation: "Interviewers evaluate self-regulation, empathy, and constructive de-escalation when working with challenging personalities."
  },
  {
    id: "hr-mcq-09",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "hard",
    question: "You accidentally drop a production database table due to a misconfigured script. Nobody saw you do it. What do you do?",
    options: [
      "Immediately report the incident to your lead and database administrator, explain what occurred transparently, and assist with point-in-time backup recovery",
      "Delete your command terminal logs and pretend a hacker did it",
      "Blame the cloud provider's availability zone outage",
      "Quietly close your laptop and walk away"
    ],
    correctAnswer: 0,
    explanation: "Integrity under crisis is the ultimate test of engineering ethics; immediate disclosure accelerates recovery and protects enterprise data."
  },
  {
    id: "hr-mcq-10",
    category: "hrBehavioral",
    topic: "HR & Behavioral Scenarios",
    difficulty: "hard",
    question: "Why is cultural fit/add equally important to raw technical algorithmic score in placement selections?",
    options: [
      "Because software engineering is a team sport; toxic or uncollaborative engineers drag down overall team velocity and retention regardless of individual coding speed",
      "Because companies prefer employees who have identical personal hobbies",
      "Because technical skills cannot be learned on the job",
      "It is not important; only raw coding speed matters in tech"
    ],
    correctAnswer: 0,
    explanation: "Collaboration, psychological safety, and communication velocity dictate long-term engineering organizational success."
  }
];

// Write hrBehavioral.js
const hrFileContent = `/**
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
    coreQuestions: ${JSON.stringify(hrQuestions, null, 2)},
    questions: ${JSON.stringify(hrMCQs, null, 2)}
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['hrBehavioral'] = hrData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = hrData;
  }
})();
`;

fs.writeFileSync(path.join(targetDir, 'hrBehavioral.js'), hrFileContent, 'utf8');
console.log('Successfully written hrBehavioral.js!');
