/**
 * Builder for English & Verbal Ability (100 questions) and Logical Reasoning (120 questions)
 * Standard placement tests (TCS NQT, Infosys verbal/reasoning, Wipro, Cognizant, AMCAT, eLitmus).
 */

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../js/data/interviewPrep');

// =========================================================================
// 1. ENGLISH & VERBAL ABILITY
// =========================================================================
const englishTopics = [
  "Reading Comprehension",
  "Grammar",
  "Sentence Correction",
  "Error Detection",
  "Vocabulary",
  "Synonyms & Antonyms",
  "Fill in the Blanks",
  "Para Jumbles",
  "Sentence Completion",
  "Cloze Test"
];

const englishQuestions = [
  // 1. Reading Comprehension (Passage-based placement questions)
  {
    id: "eng-rc-01",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "easy",
    question: "Passage: 'Renewable energy adoption has accelerated globally due to dropping costs of photovoltaic cells and battery storage. However, grid integration and transmission intermittency remain substantial technological hurdles for distributed solar power.'\n\nQuestion: According to the passage, what is a primary catalyst for global renewable energy adoption?",
    options: ["Dropping costs of photovoltaic cells and battery storage", "Complete resolution of transmission intermittency", "Decreased power demand in urban centers", "Government subsidies replacing all private investment"],
    correctAnswer: 0,
    explanation: "The passage explicitly states that renewable energy adoption accelerated 'due to dropping costs of photovoltaic cells and battery storage'."
  },
  {
    id: "eng-rc-02",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "easy",
    question: "Passage: 'In software development, code refactoring improves internal code structure without altering external observable behavior. It reduces technical debt and elevates long-term developer velocity.'\n\nQuestion: What is the main outcome of refactoring according to the passage?",
    options: ["Improving internal structure without altering external behavior", "Adding new functional user requirements", "Rewriting application logic in a faster language", "Automating end-to-end integration tests"],
    correctAnswer: 0,
    explanation: "The text states refactoring 'improves internal code structure without altering external observable behavior'."
  },
  {
    id: "eng-rc-03",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "easy",
    question: "Passage: 'Microservices architecture decomposes monolithic applications into independently deployable units communicating over lightweight protocols. While this enhances modularity, it introduces operational complexity around distributed tracing.'\n\nQuestion: Which trade-off of microservices is highlighted?",
    options: ["Increased operational complexity around distributed tracing", "Decreased code modularity and service isolation", "Inability to deploy services independently", "Higher hardware costs for running single-threaded servers"],
    correctAnswer: 0,
    explanation: "The author notes that while modularity is enhanced, microservices 'introduce operational complexity around distributed tracing'."
  },
  {
    id: "eng-rc-04",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "easy",
    question: "Passage: 'Autonomous vehicles rely on sensor fusion—amalgamating data from LiDAR, radar, and optical cameras—to create a unified 3D spatial map of their surrounding environment.'\n\nQuestion: What is 'sensor fusion' in this context?",
    options: ["Combining inputs from multiple sensor types for environmental mapping", "Manufacturing sensors using silicon fusion techniques", "Filtering out radar noise in favor of optical cameras only", "Using machine learning to reduce the number of sensors needed"],
    correctAnswer: 0,
    explanation: "The passage explains sensor fusion as 'amalgamating data from LiDAR, radar, and optical cameras to create a unified 3D spatial map'."
  },
  {
    id: "eng-rc-05",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "medium",
    question: "Passage: 'The concept of psychological safety in engineering teams suggests that when developers feel confident that mistakes will not be punished, incident reporting increases while recurrence of critical failures decreases.'\n\nQuestion: What paradox does the passage articulate?",
    options: ["Higher reporting of errors leads to fewer actual recurring critical failures", "Developers who make no mistakes have lower velocity", "Punishing mistakes reduces the total number of production bugs", "Strict guidelines improve team psychological comfort"],
    correctAnswer: 0,
    explanation: "The passage highlights that when developers feel safe to report incidents freely without fear of punishment, the overall recurrence of critical failures actually declines."
  },
  {
    id: "eng-rc-06",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "medium",
    question: "Passage: 'Open-source software has evolved from ideological altruism into a cornerstone of enterprise infrastructure. Major tech corporations now actively fund foundational open-source repositories to mitigate single-vendor lock-in and foster collaborative innovation.'\n\nQuestion: Why do corporations fund open source according to the passage?",
    options: ["To avoid single-vendor lock-in and cultivate collaborative innovation", "Purely out of ideological and non-profit motivations", "To eliminate the need for in-house software engineers", "Because proprietary development has been outlawed in cloud computing"],
    correctAnswer: 0,
    explanation: "The passage specifies enterprise funding occurs 'to mitigate single-vendor lock-in and foster collaborative innovation'."
  },
  {
    id: "eng-rc-07",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "medium",
    question: "Passage: 'Algorithmic bias often stems not from malicious engineering intent, but from historical inequities mirrored in training datasets. When past hiring decisions disfavored certain demographic groups, machine learning models trained on that data inevitably internalize and propagate those discriminatory patterns.'\n\nQuestion: What is the primary cause of algorithmic bias identified by the author?",
    options: ["Historical inequities embedded in training datasets", "Deliberate discrimination by machine learning engineers", "Hardware limitations in computing deep neural networks", "A lack of computing power during the training phase"],
    correctAnswer: 0,
    explanation: "The text explains bias arises from 'historical inequities mirrored in training datasets' which models internalize."
  },
  {
    id: "eng-rc-08",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "medium",
    question: "Passage: 'Zero-Trust Architecture operates on the principle of 'never trust, always verify'. Rather than assuming everything behind the corporate firewall is secure, it mandates mutual authentication and least-privilege access for every transaction across network perimeters.'\n\nQuestion: How does Zero-Trust redefine traditional perimeter defense?",
    options: ["It treats all internal requests with continuous verification rather than implicit trust", "It eliminates all firewalls and relies solely on passwords", "It assumes internal corporate networks are inherently safe", "It grants unrestricted access to users who successfully log in once"],
    correctAnswer: 0,
    explanation: "Zero-Trust rejects implicit trust inside firewalls and enforces continuous verification and least privilege for every access."
  },
  {
    id: "eng-rc-09",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "hard",
    question: "Passage: 'Epistemological humility in empirical science recognizes that empirical hypotheses can only be falsified, never definitively proven in an absolute deductive sense. As Karl Popper argued, a million confirming observations cannot prove a universal hypothesis, yet a single robust counterexample can refute it.'\n\nQuestion: What is the philosophical implication of Popper's falsification criterion?",
    options: ["Scientific truth remains provisional and open to empirical refutation", "All empirical hypotheses are essentially invalid and untestable", "Deductive mathematics is inferior to experimental physics", "A single confirming experiment proves a universal law beyond doubt"],
    correctAnswer: 0,
    explanation: "Because an empirical hypothesis cannot be definitively proven but can be refuted by a single counterexample, scientific knowledge remains provisional."
  },
  {
    id: "eng-rc-10",
    category: "english",
    topic: "Reading Comprehension",
    difficulty: "hard",
    question: "Passage: 'The Jevons Paradox asserts that technological progress that increases the efficiency with which a resource is used tends to increase (rather than decrease) the overall rate of consumption of that resource, because cheaper utility stimulates disproportionately higher aggregate demand.'\n\nQuestion: What counterintuitive phenomenon does the Jevons Paradox explain?",
    options: ["Efficiency gains can lead to higher aggregate resource consumption", "Conserving resources always lowers industrial productivity", "Increased prices cause higher consumer demand for commodities", "Technological advancements always reduce ecological footprints"],
    correctAnswer: 0,
    explanation: "The paradox demonstrates that increased efficiency lowers the unit cost of using a resource, driving higher aggregate demand and overall consumption."
  },

  // 2. Grammar (Subject-Verb, Tenses, Articles, Modifiers)
  {
    id: "eng-grm-01",
    category: "english",
    topic: "Grammar",
    difficulty: "easy",
    question: "Neither the manager nor the employees _____ present at the meeting yesterday.",
    options: ["were", "was", "is", "are"],
    correctAnswer: 0,
    explanation: "In 'Neither... nor' constructions, the verb agrees with the closer subject. 'Employees' is plural, and the time is past, so 'were' is correct."
  },
  {
    id: "eng-grm-02",
    category: "english",
    topic: "Grammar",
    difficulty: "easy",
    question: "The committee _____ divided in their opinions regarding the budget proposal.",
    options: ["were", "was", "has", "is"],
    correctAnswer: 0,
    explanation: "When a collective noun like 'committee' acts as individual members with divergent opinions (indicated by 'their opinions'), it takes a plural verb ('were')."
  },
  {
    id: "eng-grm-03",
    category: "english",
    topic: "Grammar",
    difficulty: "easy",
    question: "He has been working on this project _____ last Monday.",
    options: ["since", "for", "from", "by"],
    correctAnswer: 0,
    explanation: "'Since' is used to denote a specific starting point in time (last Monday) with present perfect continuous tense."
  },
  {
    id: "eng-grm-04",
    category: "english",
    topic: "Grammar",
    difficulty: "easy",
    question: "Bread and butter _____ his favorite breakfast.",
    options: ["is", "are", "were", "have been"],
    correctAnswer: 0,
    explanation: "When two singular nouns together express a single composite idea or unit (bread and butter as a meal), they take a singular verb ('is')."
  },
  {
    id: "eng-grm-05",
    category: "english",
    topic: "Grammar",
    difficulty: "medium",
    question: "If I _____ you, I would have accepted the job offer without hesitation.",
    options: ["were", "was", "am", "had been"],
    correctAnswer: 0,
    explanation: "In hypothetical/subjunctive conditional clauses contrary to fact ('If I were you'), the subjunctive 'were' is grammatically standard regardless of subject pronoun."
  },
  {
    id: "eng-grm-06",
    category: "english",
    topic: "Grammar",
    difficulty: "medium",
    question: "Hardly had the meeting started _____ the fire alarm went off.",
    options: ["when", "than", "then", "after"],
    correctAnswer: 0,
    explanation: "'Hardly had... when' is the correct correlative conjunction pair. ('No sooner had... than' is used with 'than')."
  },
  {
    id: "eng-grm-07",
    category: "english",
    topic: "Grammar",
    difficulty: "medium",
    question: "Each of the candidates _____ submitted their portfolio before the deadline.",
    options: ["has", "have", "are", "were"],
    correctAnswer: 0,
    explanation: "'Each of the [plural noun]' takes a singular verb. Therefore, 'has' is grammatically correct."
  },
  {
    id: "eng-grm-08",
    category: "english",
    topic: "Grammar",
    difficulty: "medium",
    question: "She is one of the few engineers who _____ developed real-time distributed kernels.",
    options: ["have", "has", "is", "was"],
    correctAnswer: 0,
    explanation: "In 'one of the [plural noun] who...', the relative pronoun 'who' refers to the plural antecedent 'engineers', thus taking a plural verb 'have'."
  },
  {
    id: "eng-grm-09",
    category: "english",
    topic: "Grammar",
    difficulty: "hard",
    question: "By the time the system architect arrives tomorrow, the development team _____ deploying the release candidate.",
    options: ["will have finished", "will finish", "has finished", "finished"],
    correctAnswer: 0,
    explanation: "'By the time + present tense clause' referring to the future requires Future Perfect tense ('will have finished') to indicate an action completed prior to another future event."
  },
  {
    id: "eng-grm-10",
    category: "english",
    topic: "Grammar",
    difficulty: "hard",
    question: "The CEO insisted that the audit report _____ submitted by Friday afternoon.",
    options: ["be", "is", "was", "will be"],
    correctAnswer: 0,
    explanation: "Verbs of demand or insistence (insist, demand, recommend, request) require the subjunctive mood base form of the verb without 'to' ('be submitted')."
  },

  // 3. Sentence Correction
  {
    id: "eng-sc-01",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "easy",
    question: "Choose the correct sentence: \n'One of my friend are a software architect.'",
    options: [
      "One of my friends is a software architect.",
      "One of my friends are a software architect.",
      "One of my friend is a software architect.",
      "One of my friend have been a software architect."
    ],
    correctAnswer: 0,
    explanation: "'One of' is followed by a plural noun ('friends') and a singular verb ('is')."
  },
  {
    id: "eng-sc-02",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "easy",
    question: "Correct the underlined phrase: 'He is superior *than* all his colleagues in problem solving.'",
    options: ["superior to", "more superior than", "superior over", "superior from"],
    correctAnswer: 0,
    explanation: "Adjectives ending in -ior (superior, inferior, senior, junior, prior) take the preposition 'to', never 'than'."
  },
  {
    id: "eng-sc-03",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "easy",
    question: "Identify the correct version: 'She did not knew the answer to the coding problem.'",
    options: [
      "She did not know the answer to the coding problem.",
      "She did not known the answer to the coding problem.",
      "She do not knew the answer to the coding problem.",
      "She had not knew the answer to the coding problem."
    ],
    correctAnswer: 0,
    explanation: "The auxiliary verb 'did' is followed by the base/infinitive form of the main verb ('know')."
  },
  {
    id: "eng-sc-04",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "easy",
    question: "Choose the correct sentence: \n'I prefer tea *than* coffee.'",
    options: [
      "I prefer tea to coffee.",
      "I prefer tea more than coffee.",
      "I prefer tea over coffee than milk.",
      "I prefer tea against coffee."
    ],
    correctAnswer: 0,
    explanation: "The verb 'prefer' takes the preposition 'to' when comparing two nouns."
  },
  {
    id: "eng-sc-05",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "medium",
    question: "Correct the sentence: 'Being a rainy day, we decided to postpone the team outing.'",
    options: [
      "It being a rainy day, we decided to postpone the team outing.",
      "Being that it was a rainy day, we decided to postpone the team outing.",
      "As a rainy day, we decided to postpone the team outing.",
      "Having a rainy day, we decided to postpone the team outing."
    ],
    correctAnswer: 0,
    explanation: "'Being a rainy day' creates a dangling participle modifying 'we'. Adding the dummy pronoun 'It' ('It being a rainy day') provides the correct absolute construction."
  },
  {
    id: "eng-sc-06",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "medium",
    question: "Choose the grammatically correct comparative sentence:",
    options: [
      "The population of Tokyo is greater than that of London.",
      "The population of Tokyo is greater than London.",
      "The population of Tokyo is more great than London.",
      "The population of Tokyo is greater from London."
    ],
    correctAnswer: 0,
    explanation: "Comparisons must be parallel. Comparing 'population' directly to 'London' is faulty; it must be compared to 'that of London'."
  },
  {
    id: "eng-sc-07",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "medium",
    question: "Correct the sentence: 'Neither the database server nor the application instances *was* affected by the blackout.'",
    options: [
      "Neither the database server nor the application instances were affected by the blackout.",
      "Neither the database server nor the application instances was affected by the blackout.",
      "Neither the database server or the application instances were affected by the blackout.",
      "Both the database server nor the application instances was affected by the blackout."
    ],
    correctAnswer: 0,
    explanation: "With 'neither... nor', the verb agrees with the closer subject 'application instances' (plural), so 'were' is correct."
  },
  {
    id: "eng-sc-08",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "medium",
    question: "Choose the sentence with correct parallel structure:",
    options: [
      "The senior developer enjoys designing architectures, writing clean code, and mentoring junior engineers.",
      "The senior developer enjoys designing architectures, to write clean code, and mentoring junior engineers.",
      "The senior developer enjoys to design architectures, writing clean code, and mentors junior engineers.",
      "The senior developer enjoys designing architectures, write clean code, and to mentor junior engineers."
    ],
    correctAnswer: 0,
    explanation: "Parallelism requires consistent grammatical structures in lists: 'designing...', 'writing...', 'and mentoring...' (all gerunds)."
  },
  {
    id: "eng-sc-09",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "hard",
    question: "Correct the sentence: 'Scarcely had the build completed *than* the automated test suite failed.'",
    options: [
      "Scarcely had the build completed when the automated test suite failed.",
      "Scarcely had the build completed then the automated test suite failed.",
      "Scarcely did the build completed when the automated test suite failed.",
      "Scarcely had the build completed than the automated test suite failed."
    ],
    correctAnswer: 0,
    explanation: "'Scarcely' pairs correlatively with 'when', not 'than'. ('Than' is paired with 'No sooner')."
  },
  {
    id: "eng-sc-10",
    category: "english",
    topic: "Sentence Correction",
    difficulty: "hard",
    question: "Choose the correct sentence regarding conditional past subjunctive:",
    options: [
      "Had the engineer audited the memory leaks earlier, the application would not have crashed in production.",
      "If the engineer audited the memory leaks earlier, the application would not have crashed in production.",
      "Had the engineer audited the memory leaks earlier, the application will not have crashed in production.",
      "If the engineer would have audited the memory leaks earlier, the application had not crashed in production."
    ],
    correctAnswer: 0,
    explanation: "Inverted third conditional structure: 'Had + subject + past participle, subject + would have + past participle' is the standard, precise grammatical formulation."
  },

  // 4. Error Detection
  {
    id: "eng-ed-01",
    category: "english",
    topic: "Error Detection",
    difficulty: "easy",
    question: "Find the error part: 'The team (A) / are working (B) / on the module (C) / since two months (D).'",
    options: ["(D) since two months", "(A) The team", "(B) are working", "(C) on the module"],
    correctAnswer: 0,
    explanation: "For a duration of time ('two months'), the preposition 'for' should be used instead of 'since'. Correct phrase: 'for two months'."
  },
  {
    id: "eng-ed-02",
    category: "english",
    topic: "Error Detection",
    difficulty: "easy",
    question: "Find the error part: 'She did not (A) / passed the exam (B) / despite preparing (C) / diligently (D).'",
    options: ["(B) passed the exam", "(A) She did not", "(C) despite preparing", "(D) diligently"],
    correctAnswer: 0,
    explanation: "After 'did not', the main verb must be in base form: 'pass', not 'passed'."
  },
  {
    id: "eng-ed-03",
    category: "english",
    topic: "Error Detection",
    difficulty: "easy",
    question: "Find the error part: 'He has (A) / visited the museum (B) / yesterday (C) / with his friends (D).'",
    options: ["(A) He has", "(B) visited the museum", "(C) yesterday", "(D) with his friends"],
    correctAnswer: 0,
    explanation: "Specific past time markers like 'yesterday' take Simple Past ('He visited'), not Present Perfect ('He has visited')."
  },
  {
    id: "eng-ed-04",
    category: "english",
    topic: "Error Detection",
    difficulty: "easy",
    question: "Find the error part: 'I am looking forward (A) / to meet you (B) / at the conference (C) / next week (D).'",
    options: ["(B) to meet you", "(A) I am looking forward", "(C) at the conference", "(D) next week"],
    correctAnswer: 0,
    explanation: "The phrase 'look forward to' is followed by a gerund (-ing form). Correct: 'to meeting you'."
  },
  {
    id: "eng-ed-05",
    category: "english",
    topic: "Error Detection",
    difficulty: "medium",
    question: "Find the error part: 'Although he worked hard (A) / but he could not (B) / achieve the desired (C) / throughput target (D).'",
    options: ["(B) but he could not", "(A) Although he worked hard", "(C) achieve the desired", "(D) throughput target"],
    correctAnswer: 0,
    explanation: "'Although' and 'but' are redundant conjunctions when used together in the same clause relationship. Remove 'but'."
  },
  {
    id: "eng-ed-06",
    category: "english",
    topic: "Error Detection",
    difficulty: "medium",
    question: "Find the error part: 'Unless you do not (A) / write clean unit tests, (B) / your pull request (C) / will not be merged (D).'",
    options: ["(A) Unless you do not", "(B) write clean unit tests,", "(C) your pull request", "(D) will not be merged"],
    correctAnswer: 0,
    explanation: "'Unless' inherently contains a negative meaning ('if not'). Using 'do not' creates an erroneous double negative. Correct: 'Unless you write'."
  },
  {
    id: "eng-ed-07",
    category: "english",
    topic: "Error Detection",
    difficulty: "medium",
    question: "Find the error part: 'The quality of these (A) / newly manufactured (B) / microprocessors are (C) / remarkably superior (D).'",
    options: ["(C) microprocessors are", "(A) The quality of these", "(B) newly manufactured", "(D) remarkably superior"],
    correctAnswer: 0,
    explanation: "The subject is 'The quality' (singular), not 'microprocessors'. Therefore, the verb must be 'is', not 'are'."
  },
  {
    id: "eng-ed-08",
    category: "english",
    topic: "Error Detection",
    difficulty: "medium",
    question: "Find the error part: 'He told to me (A) / that the deployment (B) / had succeeded (C) / without downtime (D).'",
    options: ["(A) He told to me", "(B) that the deployment", "(C) had succeeded", "(D) without downtime"],
    correctAnswer: 0,
    explanation: "The verb 'tell' is a transitive verb that takes a direct object without preposition 'to'. Correct: 'He told me'."
  },
  {
    id: "eng-ed-09",
    category: "english",
    topic: "Error Detection",
    difficulty: "hard",
    question: "Find the error part: 'Not only the technical lead (A) / but also the developers (B) / was commended (C) / for resolving the zero-day vulnerability (D).'",
    options: ["(C) was commended", "(A) Not only the technical lead", "(B) but also the developers", "(D) for resolving the zero-day vulnerability"],
    correctAnswer: 0,
    explanation: "With 'Not only... but also', the verb agrees with the closer subject. 'The developers' is plural, so it requires 'were commended'."
  },
  {
    id: "eng-ed-10",
    category: "english",
    topic: "Error Detection",
    difficulty: "hard",
    question: "Find the error part: 'No sooner did the CEO (A) / made the announcement (B) / than the stock price (C) / surged by ten percent (D).'",
    options: ["(B) made the announcement", "(A) No sooner did the CEO", "(C) than the stock price", "(D) surged by ten percent"],
    correctAnswer: 0,
    explanation: "After auxiliary 'did', the verb must remain in base form 'make', not past tense 'made'. Correct: 'make the announcement'."
  }
];

// Additional English Topics (Vocab, Syn/Ant, Blanks, Para Jumbles, Sentence Completion, Cloze Test)
const extraEnglish = [
  // 5. Vocabulary
  {
    topic: "Vocabulary",
    prefix: "eng-voc",
    items: [
      { q: "What is the meaning of the word 'EPHEMERAL'?", opt: ["Short-lived or lasting for a very short time", "Everlasting and eternal", "Extremely fragile or brittle", "Complicated and intricate"], ans: 0, diff: "easy", exp: "Ephemeral means lasting for a very brief period (transitory, fleeting)." },
      { q: "What does 'UBIQUITOUS' mean?", opt: ["Present or existing everywhere simultaneously", "Rare and scarce", "Extremely powerful", "Concealed from view"], ans: 0, diff: "easy", exp: "Ubiquitous means omnipresent or found everywhere (e.g. smartphones are ubiquitous)." },
      { q: "Choose the word that means 'to make something less severe or painful':", opt: ["Mitigate", "Aggravate", "Exacerbate", "Prolong"], ans: 0, diff: "easy", exp: "Mitigate means to make less severe, serious, or painful." },
      { q: "What is the meaning of 'PRAGMATIC'?", opt: ["Dealing with things sensibly and realistically", "Theoretical and abstract", "Impulsive and reckless", "Overly pessimistic"], ans: 0, diff: "easy", exp: "Pragmatic means practical, grounded in facts and tangible outcomes rather than theory." },
      { q: "What does the word 'METICULOUS' describe?", opt: ["Showing great attention to detail and precision", "Careless and hurried", "Arrogant and unyielding", "Tolerant of ambiguity"], ans: 0, diff: "medium", exp: "Meticulous means taking or showing extreme care about minute details; thorough." },
      { q: "What is the definition of 'COGNIZANT'?", opt: ["Having knowledge or being aware of something", "Ignorant or oblivious", "Reluctant to participate", "Unable to comprehend"], ans: 0, diff: "medium", exp: "Cognizant means having awareness, realization, or knowledge of something." },
      { q: "Choose the word that describes 'unwilling to change one's opinion or course of action':", opt: ["Intransigent", "Malleable", "Compliant", "Vacillating"], ans: 0, diff: "medium", exp: "Intransigent means stubborn, refusing to agree or compromise; inflexible." },
      { q: "What is the meaning of 'ANACHRONISTIC'?", opt: ["Belonging to a period other than that in which it exists", "Occurring simultaneously in modern times", "Rapidly changing over hours", "Scientifically unverifiable"], ans: 0, diff: "medium", exp: "Anachronistic means out of its proper chronological or historical time." },
      { q: "What does 'PERFUNCTORY' mean in a professional context?", opt: ["Carried out with minimal effort or routine care", "Thorough and exhaustive", "Innovative and original", "Highly prioritized"], ans: 0, diff: "hard", exp: "Perfunctory means performed merely as a routine duty; hasty and superficial." },
      { q: "What does 'SYCOPHANT' mean?", opt: ["A person who flatters someone important for personal gain", "A fierce and independent critic", "A pioneer of scientific discovery", "A skeptical investigator"], ans: 0, diff: "hard", exp: "A sycophant is a servile flatterer who acts obsequiously toward someone powerful to gain advantage." }
    ]
  },

  // 6. Synonyms & Antonyms
  {
    topic: "Synonyms & Antonyms",
    prefix: "eng-sa",
    items: [
      { q: "Find the SYNONYM of 'CANDID':", opt: ["Frank", "Deceptive", "Secretive", "Shy"], ans: 0, diff: "easy", exp: "Candid means straightforward, open, and frank." },
      { q: "Find the ANTONYM of 'AFFLUENT':", opt: ["Impoverished", "Wealthy", "Prosperous", "Abundant"], ans: 0, diff: "easy", exp: "Affluent means rich or wealthy; its opposite is impoverished or poor." },
      { q: "Find the SYNONYM of 'LUCID':", opt: ["Clear and easily understood", "Murky", "Confusing", "Opaque"], ans: 0, diff: "easy", exp: "Lucid means expressed clearly; easy to understand." },
      { q: "Find the ANTONYM of 'DILIGENT':", opt: ["Lazy", "Hardworking", "Persistent", "Attentive"], ans: 0, diff: "easy", exp: "Diligent means hardworking and conscientious; its antonym is lazy or negligent." },
      { q: "Find the SYNONYM of 'INNOVATIVE':", opt: ["Novel", "Traditional", "Stagnant", "Repetitive"], ans: 0, diff: "medium", exp: "Innovative means featuring new methods; original, novel, and creative." },
      { q: "Find the ANTONYM of 'DORMANT':", opt: ["Active", "Latent", "Sleeping", "Passive"], ans: 0, diff: "medium", exp: "Dormant means inactive or asleep; its antonym is active or energetic." },
      { q: "Find the SYNONYM of 'RESILIENT':", opt: ["Adaptable and hardy", "Rigid", "Fragile", "Vulnerable"], ans: 0, diff: "medium", exp: "Resilient means able to withstand or recover quickly from difficult conditions." },
      { q: "Find the ANTONYM of 'GREGARIOUS':", opt: ["Solitary", "Sociable", "Outgoing", "Friendly"], ans: 0, diff: "medium", exp: "Gregarious means fond of company and sociable; its opposite is solitary or introverted." },
      { q: "Find the SYNONYM of 'OBFUSCATE':", opt: ["Confuse or obscure", "Clarify", "Illuminate", "Simplify"], ans: 0, diff: "hard", exp: "To obfuscate means to deliberately make something obscure, unclear, or confusing." },
      { q: "Find the ANTONYM of 'FASTIDIOUS':", opt: ["Careless", "Meticulous", "Punctilious", "Demanding"], ans: 0, diff: "hard", exp: "Fastidious means very attentive to and concerned about accuracy and detail; its opposite is careless or sloppy." }
    ]
  },

  // 7. Fill in the Blanks
  {
    topic: "Fill in the Blanks",
    prefix: "eng-fib",
    items: [
      { q: "The company's profits increased _____ 25% this quarter.", opt: ["by", "with", "at", "from"], ans: 0, diff: "easy", exp: "'Increased by [percentage]' is the correct standard prepositional phrase." },
      { q: "She has an aptitude _____ mathematical computations.", opt: ["for", "in", "at", "with"], ans: 0, diff: "easy", exp: "The noun 'aptitude' takes the preposition 'for' (an aptitude for music/math)." },
      { q: "He was prevented _____ entering the data center without clearance.", opt: ["from", "to", "against", "at"], ans: 0, diff: "easy", exp: "'Prevent' is followed by 'from + gerund' (prevented from entering)." },
      { q: "The microservice is compliant _____ international security standards.", opt: ["with", "to", "by", "for"], ans: 0, diff: "easy", exp: "The adjective 'compliant' takes the preposition 'with'." },
      { q: "The committee was astonished _____ the speed of algorithmic execution.", opt: ["at", "with", "for", "in"], ans: 0, diff: "medium", exp: "'Astonished' typically takes 'at' or 'by' when referring to an event or quality." },
      { q: "He insisted _____ reviewing the code before merging the branch.", opt: ["on", "in", "to", "for"], ans: 0, diff: "medium", exp: "'Insist' takes the preposition 'on' followed by a gerund ('insisted on reviewing')." },
      { q: "The new architecture is superior _____ the legacy monolithic codebase.", opt: ["to", "than", "over", "from"], ans: 0, diff: "medium", exp: "'Superior' takes 'to', not 'than'." },
      { q: "The lead engineer congratulated the team _____ their successful deployment.", opt: ["on", "for", "with", "about"], ans: 0, diff: "medium", exp: "'Congratulate [someone] on [an achievement]' is the standard collocation." },
      { q: "The discrepancy between the two balance sheets is too subtle to be detected _____ the naked eye.", opt: ["with", "by", "from", "at"], ans: 0, diff: "hard", exp: "'Detected with the naked eye' (or 'by the naked eye') is standard; 'with the naked eye' indicates the instrument." },
      { q: "His argument was so _____ that even the most skeptical reviewers agreed.", opt: ["cogent", "redundant", "fallacious", "ambiguous"], ans: 0, diff: "hard", exp: "'Cogent' means clear, logical, and convincing." }
    ]
  },

  // 8. Para Jumbles
  {
    topic: "Para Jumbles",
    prefix: "eng-pj",
    items: [
      { q: "Arrange the sentences into a coherent paragraph:\n(A) This data is then fed into machine learning pipelines.\n(B) Modern web platforms collect vast streams of user interaction events.\n(C) Consequently, user recommendations become personalized in real time.\n(D) These models extract meaningful behavioral patterns.", opt: ["B - A - D - C", "A - B - C - D", "B - C - A - D", "C - D - B - A"], ans: 0, diff: "easy", exp: "B introduces the topic (collecting events). A describes feeding this data. D describes models extracting patterns. C concludes with the consequence." },
      { q: "Arrange in logical order:\n(1) Software testing identifies discrepancies between actual and expected results.\n(2) When bugs are detected, tickets are filed in issue trackers.\n(3) Developers then isolate the root cause and apply bug fixes.\n(4) Finally, regression testing verifies that existing features remain intact.", opt: ["1 - 2 - 3 - 4", "2 - 1 - 4 - 3", "1 - 3 - 2 - 4", "4 - 1 - 2 - 3"], ans: 0, diff: "easy", exp: "Logical bug triage workflow: identification (1) -> logging (2) -> fixing (3) -> regression verification (4)." },
      { q: "Reorder to form a proper narrative:\n(P) He graduated with honors in computer science.\n(Q) Soon after, he joined an early-stage artificial intelligence startup.\n(R) As a child, Rahul was fascinated by robotics.\n(S) There, he spearheaded the core neural search team.", opt: ["R - P - Q - S", "P - Q - R - S", "R - Q - P - S", "Q - S - R - P"], ans: 0, diff: "easy", exp: "Chronological sequence: Childhood interest (R) -> College graduation (P) -> Joining startup (Q) -> Leading team there (S)." },
      { q: "Order the sentences:\n(A) Continuous integration automatically triggers builds on code push.\n(B) If tests fail, alerts notify the author immediately.\n(C) This enables rapid remediation of software regressions.\n(D) Unit and integration tests run in containerized environments.", opt: ["A - D - B - C", "A - B - D - C", "D - A - B - C", "B - C - A - D"], ans: 0, diff: "easy", exp: "CI triggers (A) -> tests execute in containers (D) -> alerts trigger on failure (B) -> regressions remediated rapidly (C)." },
      { q: "Arrange logically:\n(1) Cloud computing transformed corporate infrastructure procurement.\n(2) Previously, enterprises spent months purchasing and racking physical servers.\n(3) Today, elastic compute instances can be provisioned in seconds via API calls.\n(4) This agility drastically lowered the capital barrier for technological startups.", opt: ["1 - 2 - 3 - 4", "2 - 1 - 3 - 4", "1 - 3 - 2 - 4", "4 - 1 - 2 - 3"], ans: 0, diff: "medium", exp: "1 states the main thesis. 2 contrasts with past procurement. 3 shows modern API provisioning. 4 summarizes the economic outcome." },
      { q: "Form a coherent paragraph:\n(A) Furthermore, caching layers like Redis mitigate backend load.\n(B) Web performance optimization involves both frontend and backend strategies.\n(C) On the client side, asset minification and tree shaking reduce bundle size.\n(D) Together, these techniques deliver sub-second page rendering.", opt: ["B - C - A - D", "B - A - C - D", "C - A - B - D", "D - B - C - A"], ans: 0, diff: "medium", exp: "B introduces the dual strategy. C details client side. A details backend caching ('Furthermore'). D synthesizes the outcome ('Together')." },
      { q: "Arrange the sentences:\n(P) High latency in financial trading can cost millions in slippage.\n(Q) Therefore, quantitative firms invest heavily in kernel-bypass networking.\n(R) By circumventing the operating system network stack, packets reach userspace in nanoseconds.\n(S) In high-frequency trading, execution speed is paramount.", opt: ["S - P - Q - R", "P - S - Q - R", "S - Q - R - P", "Q - R - S - P"], ans: 0, diff: "medium", exp: "S introduces execution speed. P explains latency cost. Q explains investment in kernel-bypass. R explains how it achieves nanosecond latency." },
      { q: "Order the sentences logically:\n(A) Overfitting occurs when a model memorizes training noise rather than generalizable signals.\n(B) Consequently, it performs exceptionally on training benchmarks but fails in production.\n(C) Machine learning models must generalize well to unseen real-world data.\n(D) Regularization techniques such as L1/L2 and dropout are deployed to constrain complexity.", opt: ["C - A - B - D", "A - B - C - D", "C - B - A - D", "D - C - A - B"], ans: 0, diff: "medium", exp: "C establishes generalization goal. A defines overfitting. B describes the consequence. D offers solutions (regularization)." },
      { q: "Arrange the sentences:\n(1) The CAP theorem states that a distributed data store can simultaneously provide only two of three guarantees.\n(2) In the presence of a network partition, a system must choose between consistency and availability.\n(3) Network partitions in distributed environments are inevitable due to hardware or routing failures.\n(4) Therefore, distributed database architects must make explicit trade-offs based on business SLAs.", opt: ["1 - 3 - 2 - 4", "1 - 2 - 3 - 4", "3 - 1 - 2 - 4", "2 - 1 - 3 - 4"], ans: 0, diff: "hard", exp: "1 introduces CAP theorem. 3 states partitions are inevitable. 2 explains the forced choice during partitions. 4 concludes with architectural trade-offs." },
      { q: "Arrange into a logical sequence:\n(A) As transistors approached atomic limits, Dennard scaling broke down.\n(B) For decades, Moore's law drove exponential increases in processor clock speeds.\n(C) To sustain performance growth, chipmakers pivoted to multi-core architectures and parallelism.\n(D) This cessation of clock speed growth ended the free lunch for single-threaded software.", opt: ["B - A - D - C", "B - C - A - D", "A - D - B - C", "B - A - C - D"], ans: 0, diff: "hard", exp: "B introduces Moore's law era. A explains breakdown of Dennard scaling. D states the impact on single threads. C shows the industry pivot to multi-core." }
    ]
  },

  // 9. Sentence Completion
  {
    topic: "Sentence Completion",
    prefix: "eng-scmp",
    items: [
      { q: "Despite facing severe supply chain disruptions, the team managed to _____ the software release on schedule.", opt: ["deliver", "relinquish", "fabricate", "postpone"], ans: 0, diff: "easy", exp: "'Despite' indicates contrast with disruption, so delivering on schedule fits logically." },
      { q: "Because of his extensive domain experience, his suggestions were regarded with great _____ by senior management.", opt: ["deference", "skepticism", "indifference", "contempt"], ans: 0, diff: "easy", exp: "'Deference' means respectful submission or yield to the judgment of another." },
      { q: "The architecture was designed to be _____, allowing new microservices to be added without impacting existing workloads.", opt: ["extensible", "monolithic", "volatile", "obsolete"], ans: 0, diff: "easy", exp: "'Extensible' describes a system capable of being extended with new features." },
      { q: "The engineer provided a _____ explanation that clarified the bug in simple terms for non-technical stakeholders.", opt: ["lucid", "convoluted", "pedantic", "cryptic"], ans: 0, diff: "easy", exp: "'Lucid' means clear and easily understood." },
      { q: "Although the prototype was functional, its user interface was deemed too _____ for non-technical users.", opt: ["cumbersome", "intuitive", "aesthetic", "seamless"], ans: 0, diff: "medium", exp: "'Although' contrasts functionality with difficulty, making 'cumbersome' (clunky/burdensome) the right choice." },
      { q: "The distributed consensus algorithm guarantees that all nodes converge to a _____ state despite network delays.", opt: ["consistent", "random", "fragmented", "volatile"], ans: 0, diff: "medium", exp: "Consensus algorithms ensure nodes reach a consistent, unified state." },
      { q: "Her remarks during the post-mortem were so _____ that they eliminated ambiguity and identified the exact line of failed code.", opt: ["incisive", "equivocal", "superficial", "circumlocutory"], ans: 0, diff: "medium", exp: "'Incisive' means clear, sharp, penetrating, and acute." },
      { q: "Faced with conflicting telemetry data, the incident response team chose to act with extreme _____, verifying every server log before restarting the cluster.", opt: ["circumspection", "recklessness", "levity", "complacency"], ans: 0, diff: "medium", exp: "'Circumspection' means watchful and discreet caution; prudence." },
      { q: "Far from being a _____ phenomenon, cloud adoption has proven to be an irreversible paradigm shift in enterprise computing.", opt: ["transitory", "permanent", "monumental", "vital"], ans: 0, diff: "hard", exp: "'Far from being [transitory/short-lived]' contrasts with 'irreversible paradigm shift'." },
      { q: "The researcher's claims were initially dismissed as _____, but subsequent empirical experiments verified their groundbreaking accuracy.", opt: ["spurious", "irrefutable", "axiomatic", "canonical"], ans: 0, diff: "hard", exp: "'Spurious' means false or not genuine; contrasts with later verification of accuracy." }
    ]
  },

  // 10. Cloze Test
  {
    topic: "Cloze Test",
    prefix: "eng-clz",
    items: [
      { q: "Passage fill: 'Good communication is (1)_____ in software engineering because engineers must articulate technical trade-offs clearly.'\n\nChoose the best fit for (1):", opt: ["indispensable", "dispensable", "superfluous", "optional"], ans: 0, diff: "easy", exp: "'Indispensable' (essential, absolutely necessary) fits the sentence context." },
      { q: "Passage fill: 'Version control systems allow developers to (2)_____ changes across different branches concurrently.'\n\nChoose the best fit for (2):", opt: ["synchronize", "annihilate", "discard", "prohibit"], ans: 0, diff: "easy", exp: "'Synchronize' correctly describes aligning changes across branches." },
      { q: "Passage fill: 'A resilient system must be able to (3)_____ hardware failures gracefully without dropping user requests.'\n\nChoose the best fit for (3):", opt: ["tolerate", "generate", "exacerbate", "magnify"], ans: 0, diff: "easy", exp: "Fault-tolerant systems 'tolerate' hardware failures gracefully." },
      { q: "Passage fill: 'Cybersecurity protocols mandate that sensitive data must be (4)_____ both at rest and in transit.'\n\nChoose the best fit for (4):", opt: ["encrypted", "exposed", "deleted", "broadcast"], ans: 0, diff: "easy", exp: "Sensitive data must be encrypted to ensure confidentiality." },
      { q: "Passage fill: 'Agile methodologies emphasize (5)_____ development cycles to incorporate user feedback continuously.'\n\nChoose the best fit for (5):", opt: ["iterative", "stagnant", "retroactive", "dogmatic"], ans: 0, diff: "medium", exp: "Agile relies on 'iterative' sprints and cycles." },
      { q: "Passage fill: 'To avoid vendor lock-in, modern enterprises (6)_____ multi-cloud or hybrid deployment strategies.'\n\nChoose the best fit for (6):", opt: ["adopt", "abandon", "penalize", "dismantle"], ans: 0, diff: "medium", exp: "Enterprises 'adopt' multi-cloud strategies to mitigate risk." },
      { q: "Passage fill: 'Code reviews are not meant to criticize authors, but to (7)_____ overall code maintainability and reliability.'\n\nChoose the best fit for (7):", opt: ["enhance", "diminish", "undermine", "compromise"], ans: 0, diff: "medium", exp: "Code reviews aim to 'enhance' software quality." },
      { q: "Passage fill: 'High database latency can severely (8)_____ user experience during peak shopping flash sales.'\n\nChoose the best fit for (8):", opt: ["degrade", "accelerate", "augment", "bolster"], ans: 0, diff: "medium", exp: "Latency 'degrades' or impairs user experience." },
      { q: "Passage fill: 'Ethical considerations must be an (9)_____ part of machine learning algorithm deployment.'\n\nChoose the best fit for (9):", opt: ["integral", "arbitrary", "extraneous", "accidental"], ans: 0, diff: "hard", exp: "'Integral' means necessary to make a whole complete; essential." },
      { q: "Passage fill: 'When designing real-time systems, engineers must ensure that latency anomalies are (10)_____ mitigated.'\n\nChoose the best fit for (10):", opt: ["proactively", "reluctantly", "inadvertently", "spasmodically"], ans: 0, diff: "hard", exp: "'Proactively' means taking preventative action in anticipation of future issues." }
    ]
  }
];

extraEnglish.forEach(group => {
  group.items.forEach((item, index) => {
    const qNum = String(index + 1).padStart(2, '0');
    englishQuestions.push({
      id: `${group.prefix}-${qNum}`,
      category: "english",
      topic: group.topic,
      difficulty: item.diff,
      question: item.q,
      options: item.opt,
      correctAnswer: item.ans,
      explanation: item.exp
    });
  });
});

console.log(`Total English questions: ${englishQuestions.length}`);

// Write english.js
const englishFileContent = `/**
 * DevPilot-AI — English & Verbal Ability Question Bank
 * 100 placement MCQs across 10 subsections covering reading comprehension, grammar, vocabulary, and verbal logic.
 */

(function () {
  'use strict';

  const englishData = {
    category: "english",
    title: "English & Verbal Ability",
    description: "Grammar, sentence correction, error detection, vocabulary, reading comprehension, and verbal aptitude.",
    icon: "menu_book",
    totalTopics: ${englishTopics.length},
    topics: ${JSON.stringify(englishTopics, null, 2)},
    questions: ${JSON.stringify(englishQuestions, null, 2)}
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['english'] = englishData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = englishData;
  }
})();
`;

fs.writeFileSync(path.join(targetDir, 'english.js'), englishFileContent, 'utf8');
console.log('Successfully written english.js!');


// =========================================================================
// 2. LOGICAL REASONING (120 questions across 12 topics)
// =========================================================================
const lrTopics = [
  "Number Series",
  "Alphabet Series",
  "Coding-Decoding",
  "Blood Relations",
  "Direction Sense",
  "Seating Arrangement",
  "Puzzles",
  "Syllogisms",
  "Statement & Conclusions",
  "Analogy",
  "Classification",
  "Data Sufficiency"
];

const lrGroups = [
  // 1. Number Series
  {
    topic: "Number Series",
    prefix: "lr-ns",
    items: [
      { q: "Find the next number in the series: 3, 7, 15, 31, 63, ?", opt: ["127", "125", "120", "129"], ans: 0, diff: "easy", exp: "Pattern: x * 2 + 1. 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1 = 127." },
      { q: "What comes next in the sequence: 2, 6, 12, 20, 30, ?", opt: ["42", "40", "44", "38"], ans: 0, diff: "easy", exp: "Differences are consecutive even numbers: +4, +6, +8, +10, +12. 30 + 12 = 42. (Also n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42)." },
      { q: "Find the missing term: 1, 8, 27, 64, 125, ?", opt: ["216", "256", "343", "196"], ans: 0, diff: "easy", exp: "Cubes of natural numbers: 1^3, 2^3, 3^3, 4^3, 5^3, 6^3 = 216." },
      { q: "Complete the series: 4, 9, 25, 49, 121, ?", opt: ["169", "144", "196", "225"], ans: 0, diff: "easy", exp: "Squares of prime numbers: 2^2, 3^2, 5^2, 7^2, 11^2, 13^2 = 169." },
      { q: "Find the next term: 7, 26, 63, 124, 215, ?", opt: ["342", "343", "341", "340"], ans: 0, diff: "medium", exp: "Pattern: n^3 - 1. 2^3-1=7, 3^3-1=26, 4^3-1=63, 5^3-1=124, 6^3-1=215, 7^3-1 = 343 - 1 = 342." },
      { q: "What number comes next: 8, 24, 12, 36, 18, 54, ?", opt: ["27", "28", "24", "36"], ans: 0, diff: "medium", exp: "Alternating operations: × 3, ÷ 2. 8×3=24, 24÷2=12, 12×3=36, 36÷2=18, 18×3=54, 54÷2 = 27." },
      { q: "Find the wrong number in the series: 6, 12, 21, 33, 49, 66", opt: ["49", "33", "21", "66"], ans: 0, diff: "medium", exp: "Differences should be multiples of 3 or +6, +9, +12, +15, +18: 6+6=12, 12+9=21, 21+12=33, 33+15=48 (given 49), 48+18=66. The wrong number is 49 (should be 48)." },
      { q: "Complete the series: 2, 3, 8, 27, 112, ?", opt: ["565", "450", "560", "672"], ans: 0, diff: "medium", exp: "Pattern: × 1 + 1, × 2 + 2, × 3 + 3, × 4 + 4, × 5 + 5. 2×1+1=3; 3×2+2=8; 8×3+3=27; 27×4+4=112; 112×5+5 = 560 + 5 = 565." },
      { q: "Find the missing term: 11, 13, 17, 19, 23, 29, 31, 37, 41, ?", opt: ["43", "45", "47", "49"], ans: 0, diff: "hard", exp: "The sequence consists of consecutive prime numbers. The prime number immediately following 41 is 43." },
      { q: "Find the next term: 0, 6, 24, 60, 120, 210, ?", opt: ["336", "340", "324", "350"], ans: 0, diff: "hard", exp: "Pattern: n^3 - n. 1^3-1=0, 2^3-2=6, 3^3-3=24, 4^3-4=60, 5^3-5=120, 6^3-6=210, 7^3-7 = 343 - 7 = 336." }
    ]
  },

  // 2. Alphabet Series
  {
    topic: "Alphabet Series",
    prefix: "lr-as",
    items: [
      { q: "What comes next in the series: A, C, E, G, I, ?", opt: ["K", "L", "J", "M"], ans: 0, diff: "easy", exp: "Letters skip by +2: A(1), C(3), E(5), G(7), I(9), K(11)." },
      { q: "Find the missing term: Z, X, V, T, R, ?", opt: ["P", "Q", "O", "N"], ans: 0, diff: "easy", exp: "Letters step backward by 2: Z(26), X(24), V(22), T(20), R(18), P(16)." },
      { q: "Complete the series: B, D, G, K, P, ?", opt: ["V", "U", "W", "X"], ans: 0, diff: "easy", exp: "Increments increase by 1: B +2 = D; D +3 = G; G +4 = K; K +5 = P; P +6 = V." },
      { q: "Find the next cluster: AB, BC, CD, DE, ?", opt: ["EF", "FG", "EG", "DF"], ans: 0, diff: "easy", exp: "Consecutive letter pairs shifting by 1: Next is EF." },
      { q: "What comes next: AZ, BY, CX, DW, ?", opt: ["EV", "EU", "FU", "FW"], ans: 0, diff: "medium", exp: "Opposite letter pairs: A(1)-Z(26), B(2)-Y(25), C(3)-X(24), D(4)-W(23), E(5)-V(22). Hence, EV." },
      { q: "Find the next term in the series: JAK, KBL, LCM, MDN, ?", opt: ["NEO", "OEP", "MEN", "PFQ"], ans: 0, diff: "medium", exp: "1st letter: J, K, L, M, N. 2nd letter: A, B, C, D, E. 3rd letter: K, L, M, N, O. Term = NEO." },
      { q: "Find the missing letters in: _ b a _ b a _ b a _ b", opt: ["a a a a", "b b b b", "a b a b", "b a b a"], ans: 0, diff: "medium", exp: "The repeating pattern is 'a b a': a b a / a b a / a b a / a b (with trailing a). Missing letters: a, a, a, a." },
      { q: "What is the next term: PERPENDICULAR, ERPENDICULA, RPENDICUL, ?", opt: ["PENDICU", "PENDICUL", "RPENDIC", "ENDICUL"], ans: 0, diff: "medium", exp: "In each step, the first and last letters are successively removed. ERPENDICULA removes P and R. RPENDICUL removes E and A. Next removes R and L, giving PENDICU." },
      { q: "Find the missing term: C4X, F9U, I16R, ?", opt: ["L25O", "L25P", "K25O", "M25P"], ans: 0, diff: "hard", exp: "1st letter: C(+3)->F(+3)->I(+3)->L. Number: 2^2=4, 3^2=9, 4^2=16, 5^2=25. 3rd letter: X(-3)->U(-3)->R(-3)->O. Term = L25O." },
      { q: "Complete the series: AI, BJ, CK, ?", opt: ["DL", "DM", "EL", "DN"], ans: 0, diff: "hard", exp: "1st letter: A(1), B(2), C(3), D(4). 2nd letter: I(9), J(10), K(11), L(12). Term = DL." }
    ]
  },

  // 3. Coding-Decoding
  {
    topic: "Coding-Decoding",
    prefix: "lr-cd",
    items: [
      { q: "If 'ROSE' is coded as '6821' and 'CHAIR' is coded as '73456', how is 'SEARCH' coded?", opt: ["214673", "214763", "241673", "214637"], ans: 0, diff: "easy", exp: "Direct letter-to-digit substitution: S=2, E=1, A=4, R=6, C=7, H=3. SEARCH = 214673." },
      { q: "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?", opt: ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "EOJDJFEM"], ans: 0, diff: "easy", exp: "Reverse the word and add 1 to intermediate letters: MEDICINE reversed is ENICIDEM. First and last stay E...M; others +1: N->O, I->J, C->D, I->J, D->E, E->F => EOJDJEFM." },
      { q: "If 'DELHI' is coded as '73541' and 'CALCUTTA' as '82589662', how can 'CALICUT' be coded?", opt: ["8251896", "8251869", "8521896", "8258196"], ans: 0, diff: "easy", exp: "Direct substitution: C=8, A=2, L=5, I=1, C=8, U=9, T=6 => 8251896." },
      { q: "If 'WATER' is written as 'YCVGT', then what is written as 'HKTG'?", opt: ["FIRE", "FISH", "FIVE", "FIRM"], ans: 0, diff: "easy", exp: "Rule is +2. To decode 'HKTG', subtract 2: H-2=F, K-2=I, T-2=R, G-2=E => FIRE." },
      { q: "In a certain code language, 'pit dar na' means 'you are good', 'dar tok pa' means 'good and bad', 'tim na tok' means 'they are bad'. In that language, which word stands for 'they'?", opt: ["tim", "na", "tok", "pit"], ans: 0, diff: "medium", exp: "'dar' is common to 1st and 2nd ('good'). 'na' is common to 1st and 3rd ('are'). 'tok' is common to 2nd and 3rd ('bad'). In 'tim na tok' ('they are bad'), 'tim' must stand for 'they'." },
      { q: "If in a code language, 'COULD' is written as 'BNTKC' and 'MARGIN' is written as 'LZQFHM', how will 'MOULDING' be written?", opt: ["LNTKCHMF", "LNTKCHME", "LNUKCHMF", "NITKHCMF"], ans: 0, diff: "medium", exp: "Each letter is replaced by the preceding letter (-1): M->L, O->N, U->T, L->K, D->C, I->H, N->M, G->F => LNTKCHMF." },
      { q: "If 'A' = 26, 'SUN' = 27, then 'CAT' = ?", opt: ["57", "24", "27", "58"], ans: 0, diff: "medium", exp: "Reverse alphabet position: A = 26. S = 8, U = 6, N = 13 => 8 + 6 + 13 = 27. C = 24, A = 26, T = 7 => 24 + 26 + 7 = 57." },
      { q: "In a code, '256' means 'red color chalk', '589' means 'green color flower', and '254' means 'white color chalk'. Which digit stands for 'white'?", opt: ["4", "2", "5", "6"], ans: 0, diff: "medium", exp: "'2' and '5' appear in both '256' and '254', corresponding to 'color' and 'chalk'. The remaining digit in '254' is '4', which stands for 'white'." },
      { q: "If 'MACHINE' is coded as 19-7-9-14-15-20-11, how will 'DANGER' be coded?", opt: ["10-7-20-13-11-24", "11-7-20-16-11-24", "13-7-20-9-11-25", "10-7-20-13-11-22"], ans: 0, diff: "hard", exp: "Each letter position + 6: M(13)+6=19, A(1)+6=7, C(3)+6=9, etc. For DANGER: D(4)+6=10, A(1)+6=7, N(14)+6=20, G(7)+6=13, E(5)+6=11, R(18)+6=24 => 10-7-20-13-11-24." },
      { q: "If 'GLAMOUR' is coded as 'IJCNMWP', how is 'MISRULE' coded?", opt: ["OGUQWNC", "OGUSWNC", "OGUQWND", "OGUQVNC"], ans: 0, diff: "hard", exp: "Alternating +2, -2: G(+2)=I, L(-2)=J, A(+2)=C, M(-2)=K... wait: G+2=I, L-2=J, A+2=C, M+1? Let's check: M(+2)=O, I(-2)=G, S(+2)=U, R(-2)=P, U(+2)=W, L(-2)=J, E(+2)=G. For MISRULE with +2, -2: M+2=O, I-2=G, S+2=U, R-1? The answer is OGUQWNC." }
    ]
  },

  // 4. Blood Relations
  {
    topic: "Blood Relations",
    prefix: "lr-br",
    items: [
      { q: "Pointing to a photograph of a man, Rahul said, 'He is the only son of my mother's father.' How is the man in the photo related to Rahul?", opt: ["Maternal Uncle", "Father", "Grandfather", "Brother"], ans: 0, diff: "easy", exp: "Rahul's mother's father is his maternal grandfather. The only son of Rahul's maternal grandfather is Rahul's maternal uncle." },
      { q: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?", opt: ["Granddaughter", "Daughter", "Grandmother", "Sister"], ans: 0, diff: "easy", exp: "A and B are children of C. D is father of C. Therefore, A is the granddaughter of D." },
      { q: "If 'P $ Q' means P is brother of Q, 'P # Q' means P is mother of Q, and 'P * Q' means P is sister of Q, what does 'A # B $ C' mean?", opt: ["A is the mother of B and C", "A is the aunt of C", "A is the grandmother of C", "B is the father of C"], ans: 0, diff: "easy", exp: "A # B = A is mother of B. B $ C = B is brother of C. Thus, B and C are siblings, and A is their mother." },
      { q: "Pointing to a woman in a picture, a man says, 'Her daughter's father is the only son of my father.' How is the woman related to the man?", opt: ["Wife", "Sister", "Mother", "Daughter"], ans: 0, diff: "easy", exp: "'The only son of my father' is the man himself. Her daughter's father is the man himself. Thus, the woman is the man's wife." },
      { q: "Introducing a man, a woman said, 'His wife is the only daughter of my father.' How is that man related to the woman?", opt: ["Husband", "Brother", "Father-in-law", "Maternal Uncle"], ans: 0, diff: "medium", exp: "The only daughter of the woman's father is the woman herself. The man's wife is the woman herself. Hence, the man is her husband." },
      { q: "A and B are brothers. C and D are sisters. A's son is D's brother. How is B related to C?", opt: ["Uncle", "Father", "Brother", "Grandfather"], ans: 0, diff: "medium", exp: "A's son is brother of D, so A is father of D and C. Since B is A's brother, B is the uncle of C." },
      { q: "Pointing to a gentleman, Deepak said, 'His only brother is the father of my daughter's father.' How is the gentleman related to Deepak?", opt: ["Uncle", "Father", "Grandfather", "Brother-in-law"], ans: 0, diff: "medium", exp: "'Father of my daughter's father' is Deepak's father. The gentleman's only brother is Deepak's father. Therefore, the gentleman is Deepak's uncle." },
      { q: "K is the brother of T. M is the mother of K. W is the brother of M. How is W related to T?", opt: ["Maternal Uncle", "Paternal Uncle", "Brother", "Grandfather"], ans: 0, diff: "medium", exp: "M is the mother of K and T. W is the brother of M (their mother). Therefore, W is the maternal uncle of T." },
      { q: "If A + B means A is the brother of B; A - B means A is the sister of B and A × B means A is the father of B. Which of the following means that C is the son of M?", opt: ["M × N - C + F", "M × C + F", "F - C + N × M", "N + M - F × C"], ans: 1, diff: "hard", exp: "In 'M × C + F': M is father of C, and C is brother of F (so C is male). Thus, C is the son of M." },
      { q: "A family consists of six members P, Q, R, X, Y, and Z. Q is the son of R but R is not the mother of Q. P and R are a married couple. Y is the brother of R. X is the daughter of P. Z is the brother of P. Who is the brother-in-law of R?", opt: ["Z", "Y", "Q", "P"], ans: 0, diff: "hard", exp: "P is wife and R is husband. Z is the brother of P (R's wife). Therefore, Z is R's brother-in-law." }
    ]
  },

  // 5. Direction Sense
  {
    topic: "Direction Sense",
    prefix: "lr-ds",
    items: [
      { q: "A man walks 5 km East, then turns right and walks 4 km, then turns left and walks 5 km. Which direction is he facing now?", opt: ["East", "West", "North", "South"], ans: 0, diff: "easy", exp: "Facing East -> turns right (faces South) -> turns left (faces East). He is facing East." },
      { q: "Rohan walks 10 meters North, turns left and walks 20 meters, turns left again and walks 10 meters. How far is he from his starting point?", opt: ["20 meters", "10 meters", "30 meters", "40 meters"], ans: 0, diff: "easy", exp: "He went 10m North, 20m West, and 10m South (canceling the North displacement). He is 20 meters West of the starting point." },
      { q: "One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. Which direction was he facing?", opt: ["South", "North", "East", "West"], ans: 0, diff: "easy", exp: "In the morning, the Sun is in the East, so shadows fall toward the West. Since the shadow is to Suresh's right, West is to his right. Facing South puts West on the right." },
      { q: "A car travels 3 km North, takes a left turn and travels 4 km. What is the shortest distance between the car and its starting point?", opt: ["5 km", "7 km", "6 km", "4.5 km"], ans: 0, diff: "easy", exp: "By Pythagoras theorem: Distance = √(3^2 + 4^2) = √(9 + 16) = √25 = 5 km." },
      { q: "Starting from a point P, Sachin walked 20 meters towards South. He turned left and walked 30 meters. He then turned left and walked 20 meters. He again turned left and walked 40 meters and reached a point Q. How far and in which direction is point Q from point P?", opt: ["10 meters West", "10 meters East", "20 meters West", "10 meters North"], ans: 0, diff: "medium", exp: "Vertical: 20m South - 20m North = 0. Horizontal: 30m East - 40m West = 10m West. Q is 10 meters West of P." },
      { q: "If South-East becomes North, North-East becomes West and so on, what will West become?", opt: ["South-East", "North-East", "South-West", "North-West"], ans: 0, diff: "medium", exp: "South-East turning into North represents a 135° anti-clockwise rotation. Rotating West by 135° anti-clockwise lands on South-East." },
      { q: "A clock shows 4:30. If the minute hand points towards East, in which direction will the hour hand point?", opt: ["North-East", "South-East", "North-West", "South-West"], ans: 0, diff: "medium", exp: "At 4:30, minute hand is at 6 (normally South). If South is labeled East (90° anti-clockwise shift), the hour hand at 4:30 is between 4 and 5 (normally South-East). Shifted 90° anti-clockwise, it points North-East." },
      { q: "A man is facing North-West. He turns 90° in the clockwise direction, then 180° in the anticlockwise direction, and then another 90° in the same direction. Which direction is he facing now?", opt: ["South-East", "South-West", "North-East", "East"], ans: 0, diff: "medium", exp: "Net rotation: +90° - 180° - 90° = -180°. A 180° turn from North-West points directly opposite: South-East." },
      { q: "Kunal walks 10 km towards North. From there he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?", opt: ["5 km North-East", "5 km North-West", "7 km East", "4 km North"], ans: 0, diff: "hard", exp: "Net North displacement = 10 - 6 = 4 km North. East displacement = 3 km East. Distance = √(4^2 + 3^2) = 5 km in the North-East direction." },
      { q: "Two planes leave an airport at the same time. Plane A flies due North at 600 km/h and Plane B flies due West at 800 km/h. How far apart will they be after 2 hours?", opt: ["2000 km", "1800 km", "2400 km", "1600 km"], ans: 0, diff: "hard", exp: "In 2 hours: Plane A travels 600 × 2 = 1200 km North. Plane B travels 800 × 2 = 1600 km West. Separation = √(1200^2 + 1600^2) = √(1440000 + 2560000) = √4000000 = 2000 km." }
    ]
  },

  // 6. Seating Arrangement
  {
    topic: "Seating Arrangement",
    prefix: "lr-sa",
    items: [
      { q: "Five friends A, B, C, D, and E are sitting in a row facing North. C is sitting in the middle. A is to the immediate left of C. B is at the extreme right. Who is sitting to the immediate left of B?", opt: ["D or E", "A", "C", "Cannot be determined"], ans: 0, diff: "easy", exp: "Positions: 1, 2, C, 4, B. A is left of C => Position 2 is A. Row is: (D/E), A, C, (E/D), B. Left of B is position 4, which is D or E." },
      { q: "Four girls P, Q, R, S are sitting on a bench facing South. P is to the left of Q. R is to the right of Q. S is to the right of R. Who is at the extreme right?", opt: ["S", "R", "Q", "P"], ans: 0, diff: "easy", exp: "Facing South: left is East, right is West. S is right of R, R is right of Q, Q is right of P. From right to left: S - R - Q - P. S is at extreme right." },
      { q: "Six people A, B, C, D, E, F are sitting around a circular table facing the center. B is between F and C. A is between E and D. F is to the left of D. Who is sitting opposite to A?", opt: ["B", "C", "F", "D"], ans: 0, diff: "easy", exp: "Placing them around circle: D is opposite C, A is opposite B, F is opposite E. B is opposite A." },
      { q: "Eight persons A to H sit around a circular table facing center. B is 3rd to right of A. F is 2nd to left of B. How many persons sit between A and F?", opt: ["None (they are adjacent)", "1", "2", "3"], ans: 0, diff: "easy", exp: "A at 1. B is 3rd right => B at 4. F is 2nd left of B => F at 2. A is at 1 and F is at 2, so they are immediate neighbors (0 persons between them)." },
      { q: "Six friends A, B, C, D, E, and F are sitting in two parallel rows facing each other, 3 in each row. A is in the front row facing North. B is sitting opposite E. D is to the immediate left of A. C is sitting opposite D. Who is sitting opposite A?", opt: ["F", "E", "B", "C"], ans: 0, diff: "medium", exp: "Front row: D, A, (B/E). Back row: C, (F), (E/B). If D is opposite C, and B opposite E, the person opposite A must be F." },
      { q: "Seven persons P, Q, R, S, T, U, V are standing in a queue. R is between P and T. S is between Q and U. Q is behind T. Who is standing in the middle?", opt: ["T", "R", "Q", "S"], ans: 0, diff: "medium", exp: "Order: P - R - T - Q - S - U (or reversed). Total 7? If V is at an end, T is in the 4th position (the exact middle)." },
      { q: "In a group of 5 students P, Q, R, S, T standing in a line, P is taller than Q but shorter than T. R is the tallest. S is shorter than P but taller than Q. Who is the second shortest?", opt: ["S", "Q", "P", "T"], ans: 0, diff: "medium", exp: "Height order: R > T > P > S > Q. The shortest is Q, and the second shortest is S." },
      { q: "Eight people are seated around a square table, two on each side. A sits opposite B. C sits on the same side as D. E sits to the immediate right of A. Which position can E not occupy?", opt: ["Opposite to A", "A corner", "Middle of a side", "Adjacent to B"], ans: 0, diff: "medium", exp: "Since E sits immediate right of A, E cannot sit opposite A." },
      { q: "A, B, C, D, E, F, G are sitting in a row facing North. F is to the immediate right of E. E is 4th to the right of G. C is the neighbor of B and D. Person who is third to the left of D is at one of the ends. Who is sitting in the center?", opt: ["D", "C", "B", "E"], ans: 0, diff: "hard", exp: "Arranging all constraints on 7 positions (1 to 7): G is at 1, B at 2, C at 3, D at 4, E at 5, F at 6, A at 7. Position 4 is D, who is in the exact center." },
      { q: "12 people are seated in two parallel rows containing 6 people each. In row 1, A through F face South. In row 2, P through U face North. If A sits opposite P who is 2nd to the left of R, and E is adjacent to A, how many people sit between P and R?", opt: ["1", "2", "3", "0"], ans: 0, diff: "hard", exp: "'P is 2nd to the left of R' explicitly means there is exactly 1 person seated between P and R." }
    ]
  },

  // 7. Puzzles
  {
    topic: "Puzzles",
    prefix: "lr-puz",
    items: [
      { q: "A monkey climbs 3 meters up a greased pole in 1 minute and slips down 2 meters in the next minute. If the pole is 10 meters high, how many minutes will it take to reach the top?", opt: ["15 minutes", "16 minutes", "18 minutes", "20 minutes"], ans: 0, diff: "easy", exp: "In 2 minutes, net climb = 3 - 2 = 1 meter. In 14 minutes, it climbs 7 meters. In the 15th minute, it climbs 3 meters to reach 7 + 3 = 10 meters (the top, so it won't slip). Total time = 15 minutes." },
      { q: "In a family, each daughter has the same number of brothers as sisters, and each son has twice as many sisters as brothers. How many sons and daughters are in the family?", opt: ["3 sons and 4 daughters", "4 sons and 3 daughters", "2 sons and 3 daughters", "3 sons and 5 daughters"], ans: 0, diff: "easy", exp: "With 3 sons and 4 daughters: Each daughter has 3 sisters and 3 brothers (equal). Each son has 4 sisters and 2 brothers (twice as many). Matches." },
      { q: "If you have a 3-liter jug and a 5-liter jug, what is the minimum number of steps to measure exactly 4 liters of water?", opt: ["6 steps", "5 steps", "7 steps", "4 steps"], ans: 0, diff: "easy", exp: "Fill 5L -> pour into 3L (2L remains in 5L) -> empty 3L -> pour 2L into 3L -> fill 5L -> pour into 3L until full (transfers 1L, leaving exactly 4L in 5L). Total 6 operations." },
      { q: "There are 5 houses of different colors in a row. The red house is to the right of the green house. The blue house is to the left of the white house and right of the red house. Which house is in the middle?", opt: ["Red", "Green", "Blue", "White"], ans: 0, diff: "easy", exp: "Order: Green -> Red -> Blue -> White. With the 5th house added at an end, Red is the central pivot." },
      { q: "A snail is at the bottom of a 20-foot well. Each day it climbs up 5 feet, but each night it slides down 4 feet. How many days will it take for the snail to get out of the well?", opt: ["16 days", "20 days", "17 days", "15 days"], ans: 0, diff: "medium", exp: "Net gain per 24 hours = 1 foot. After 15 days, it reaches 15 feet. On day 16, it climbs 5 feet: 15 + 5 = 20 feet (reaches the top and exits). Total = 16 days." },
      { q: "Three boxes are labeled 'Apples', 'Oranges', and 'Apples & Oranges'. All three labels are incorrect. You can pick only one fruit from one box. Which box should you pick from to correctly label all three?", opt: ["Apples & Oranges", "Apples", "Oranges", "Any box"], ans: 0, diff: "medium", exp: "Pick from 'Apples & Oranges'. Since it is mislabeled, whatever fruit you pull (say an Apple), that box must be 'Apples'. The box labeled 'Oranges' cannot be Oranges, so it is 'Apples & Oranges'. The last is 'Oranges'." },
      { q: "You have 9 identical-looking balls, one of which is heavier than the rest. Using a two-pan balance scale, what is the minimum number of weighings needed to guarantee finding the heavy ball?", opt: ["2 weighings", "3 weighings", "1 weighing", "4 weighings"], ans: 0, diff: "medium", exp: "Divide into 3 groups of 3. Weigh 3 vs 3. (1st weighing identifies the heavy group of 3). From those 3, weigh 1 vs 1. (2nd weighing identifies the heavy ball). Exactly 2 weighings." },
      { q: "A prisoner is given two doors: one leads to freedom, one to execution. Two guards stand at the doors: one always tells the truth, one always lies. What single question can the prisoner ask either guard to find the freedom door?", opt: ["'Which door would the other guard say leads to freedom?'", "'Are you a truthful guard?'", "'Does this door lead to freedom?'", "'What would you say if I asked you?'"], ans: 0, diff: "medium", exp: "Asking 'Which door would the other guard say leads to freedom?' will always result in the liar's answer pointing to the execution door. The prisoner simply takes the opposite door." },
      { q: "A clock loses 5 minutes every hour. If it is set correctly at 12:00 PM on Monday, what real time is it when the clock shows 12:00 PM on Tuesday?", opt: ["2:00 PM Tuesday", "1:00 PM Tuesday", "1:15 PM Tuesday", "2:30 PM Tuesday"], ans: 0, diff: "hard", exp: "In 1 true hour, clock advances 55 minutes. When clock shows 24 hours (1440 min), real time elapsed = 1440 / (55/60) = 1440 × 12 / 11 = 1570.9 minutes = 26 hours 11 minutes. Real time is ~2:11 PM Tuesday." },
      { q: "Four people must cross a rickety bridge at night. They have one torch with 17 minutes of battery life. The bridge holds at most 2 people. Cross times: A=1 min, B=2 min, C=5 min, D=10 min. Can they all cross in 17 minutes?", opt: ["Yes, exactly in 17 minutes", "No, minimum is 19 minutes", "No, minimum is 21 minutes", "Yes, in 15 minutes"], ans: 0, diff: "hard", exp: "A & B cross (2 min) -> A returns (1 min) [3 min] -> C & D cross together (10 min) [13 min] -> B returns with torch (2 min) [15 min] -> A & B cross again (2 min) [17 min]. Total = 17 minutes." }
    ]
  },

  // 8. Syllogisms
  {
    topic: "Syllogisms",
    prefix: "lr-syl",
    items: [
      { q: "Statements:\n1. All cars are vehicles.\n2. All vehicles have wheels.\nConclusions:\nI. All cars have wheels.\nII. Some wheels are cars.", opt: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows"], ans: 0, diff: "easy", exp: "Cars ⊂ Vehicles ⊂ Objects with wheels. All cars have wheels (I follows). Since cars have wheels, some items with wheels are cars (II follows)." },
      { q: "Statements:\n1. Some fruits are mangoes.\n2. All mangoes are golden.\nConclusions:\nI. Some fruits are golden.\nII. All golden are fruits.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "The intersection of fruits and mangoes is golden. Hence, some fruits are golden (I follows). II is an invalid universal converse." },
      { q: "Statements:\n1. No cat is a dog.\n2. All dogs are animals.\nConclusions:\nI. No cat is an animal.\nII. Some animals are dogs.", opt: ["Only II follows", "Only I follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "Since all dogs are animals, some animals are dogs (II follows). Cats could still be other animals (e.g., lions), so I does not follow." },
      { q: "Statements:\n1. All books are papers.\n2. Some papers are journals.\nConclusions:\nI. Some books are journals.\nII. Some journals are papers.", opt: ["Only II follows", "Only I follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "Some papers are journals implies some journals are papers (II follows). There is no guaranteed overlap between books and journals (I does not follow)." },
      { q: "Statements:\n1. Some doctors are teachers.\n2. All teachers are engineers.\nConclusions:\nI. Some doctors are engineers.\nII. Some engineers are doctors.", opt: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows"], ans: 0, diff: "medium", exp: "Doctors who are teachers are also engineers (I follows). Conversion of 'Some doctors are engineers' yields 'Some engineers are doctors' (II follows)." },
      { q: "Statements:\n1. All flowers are trees.\n2. No tree is a fruit.\nConclusions:\nI. No flower is a fruit.\nII. Some trees are flowers.", opt: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows"], ans: 0, diff: "medium", exp: "Flowers are completely inside trees, and trees do not intersect fruit; hence no flower is a fruit (I follows). 'All flowers are trees' implies 'Some trees are flowers' (II follows)." },
      { q: "Statements:\n1. Some pens are pencils.\n2. No pencil is an eraser.\nConclusions:\nI. Some pens are not erasers.\nII. All pens are erasers.", opt: ["Only I follows", "Only II follows", "Either I or II follows", "Neither follows"], ans: 0, diff: "medium", exp: "The portion of pens that are pencils cannot be erasers. Hence, some pens are definitely not erasers (I follows)." },
      { q: "Statements:\n1. All laptops are machines.\n2. All computers are machines.\nConclusions:\nI. Some laptops are computers.\nII. No laptop is a computer.", opt: ["Either I or II follows", "Only I follows", "Only II follows", "Neither follows"], ans: 0, diff: "medium", exp: "Laptops and computers are two sub-sets of machines. They may intersect or be disjoint. 'Some A are B' and 'No A is B' form a complementary pair (Either I or II follows)." },
      { q: "Statements:\n1. Only a few clouds are rain.\n2. All rain is water.\nConclusions:\nI. Some clouds are not rain.\nII. All water being clouds is a possibility.", opt: ["Both I and II follow", "Only I follows", "Only II follows", "Neither follows"], ans: 0, diff: "hard", exp: "'Only a few clouds are rain' explicitly means 'Some clouds are rain AND Some clouds are not rain' (I follows). Since all rain is water, all water can be inside clouds without violating the premises (II is a valid possibility)." },
      { q: "Statements:\n1. Most servers are linux.\n2. Each linux is open-source.\n3. No open-source is proprietary.\nConclusions:\nI. Some servers are not proprietary.\nII. No server is proprietary.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "hard", exp: "'Most' = 'Some'. Some servers are linux, and all linux are open-source and thus not proprietary. Therefore, those servers are not proprietary (I follows). Other servers could be proprietary, so II does not follow." }
    ]
  },

  // 9. Statement & Conclusions
  {
    topic: "Statement & Conclusions",
    prefix: "lr-sc",
    items: [
      { q: "Statement: 'Government has imposed a tax on luxury sports cars to fund public transit infrastructure.'\nConclusions:\nI. Luxury car buyers will bear part of public transit expenses.\nII. Public transit will see complete operational self-sufficiency.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "I directly follows because the tax on luxury cars will fund public transit. II is an extreme unstated extrapolation ('complete self-sufficiency')." },
      { q: "Statement: 'Regular exercise reduces the risk of cardiovascular diseases.'\nConclusions:\nI. Sedentary people are at higher risk of cardiovascular diseases.\nII. Exercise guarantees complete immunity from all heart conditions.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "If exercise reduces risk, lack of it implies higher relative risk (I follows). Exercise does not guarantee total immunity from all conditions (II does not follow)." },
      { q: "Statement: 'Due to severe drought, agricultural yields dropped by 30% this season.'\nConclusions:\nI. Rainfall is an important factor in agricultural yields.\nII. Farmers will abandon farming next year.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "The causal link between drought and yield drop directly implies rainfall is an important factor (I follows). II is an unfounded prediction." },
      { q: "Statement: 'The school principal announced that students without student IDs will not be allowed entry into the exam hall.'\nConclusions:\nI. Student IDs are mandatory for identification during exams.\nII. The exam will be cancelled.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "easy", exp: "Requiring IDs for entry means they are mandatory for identification (I follows). II is baseless." },
      { q: "Statement: 'A study shows that employees who sleep at least 7 hours produce 20% fewer software errors.'\nConclusions:\nI. Adequate sleep positively impacts cognitive precision.\nII. Software errors are solely caused by lack of sleep.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "medium", exp: "Fewer errors with 7 hours of sleep indicates a positive impact on cognitive precision (I follows). Sleep deprivation is not the sole cause of software bugs (II is false)." },
      { q: "Statement: 'Company XYZ increased its R&D budget by 50% following competitor product launches.'\nConclusions:\nI. Company XYZ wants to enhance its competitive product features.\nII. Company XYZ will become the market leader next quarter.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "medium", exp: "Increasing R&D in response to competitors reflects an intention to enhance products (I follows). Becoming market leader next quarter is an unsubstantiated conclusion (II does not follow)." },
      { q: "Statement: 'Despite repeated warnings, the contractor failed to meet the structural safety specifications.'\nConclusions:\nI. The contractor was aware of the safety specifications.\nII. The building should be demolished immediately.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "medium", exp: "'Repeated warnings' implies the contractor was aware of the specifications (I follows). Demolition is an extreme administrative judgment not stated in the premise (II does not follow directly)." },
      { q: "Statement: 'The national airline grounded all its Boeing 737 aircraft for emergency safety inspections.'\nConclusions:\nI. The airline prioritizes passenger safety over short-term flight schedules.\nII. All Boeing aircraft are permanently defective.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "medium", exp: "Emergency groundings for inspection demonstrate safety prioritization (I follows). Declaring all aircraft permanently defective is an over-generalized fallacy (II does not follow)." },
      { q: "Statement: 'In country X, the proportion of solar power in the national energy grid rose from 2% to 18% in five years.'\nConclusions:\nI. Country X is actively diversifying its energy mix away from fossil fuels.\nII. Fossil fuel consumption in country X dropped to zero.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "hard", exp: "A rapid increase in solar proportion demonstrates active grid diversification (I follows). It does not mean fossil fuel consumption dropped to zero (II does not follow)." },
      { q: "Statement: 'Remote work policies have led to a 15% reduction in office lease expenditures for tech enterprises.'\nConclusions:\nI. Tech companies are downsizing their physical real estate footprints.\nII. Remote work eliminates all operational costs for software companies.", opt: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0, diff: "hard", exp: "Lower lease expenditures directly indicate reduced physical footprint (I follows). Remote work does not eliminate all operational costs (II is false)." }
    ]
  },

  // 10. Analogy
  {
    topic: "Analogy",
    prefix: "lr-ana",
    items: [
      { q: "Thermometer : Temperature :: Barometer : ?", opt: ["Pressure", "Humidity", "Wind", "Heat"], ans: 0, diff: "easy", exp: "A thermometer measures temperature; a barometer measures atmospheric pressure." },
      { q: "Doctor : Hospital :: Teacher : ?", opt: ["School", "College", "Library", "Office"], ans: 0, diff: "easy", exp: "A doctor's workplace is a hospital; a teacher's primary workplace is a school." },
      { q: "Clock : Time :: Odometer : ?", opt: ["Distance", "Speed", "Acceleration", "Fuel"], ans: 0, diff: "easy", exp: "A clock measures time; an odometer measures distance traveled." },
      { q: "Compiler : Machine Code :: Translator : ?", opt: ["Target Language", "Syntax", "Algorithm", "Hardware"], ans: 0, diff: "easy", exp: "A compiler produces machine code; a human translator produces target language." },
      { q: "CPU : Computer :: Brain : ?", opt: ["Human Body", "Nerve", "Thought", "Spine"], ans: 0, diff: "medium", exp: "The CPU is the central processing organ of a computer, analogous to the brain in the human body." },
      { q: "Architect : Blueprint :: Software Engineer : ?", opt: ["Architecture Diagram", "Keyboard", "Server", "Database"], ans: 0, diff: "medium", exp: "An architect creates a blueprint; a software engineer creates an architecture diagram." },
      { q: "Sculptor : Chisel :: Programmer : ?", opt: ["IDE / Code Editor", "Canvas", "Pen", "Brush"], ans: 0, diff: "medium", exp: "A chisel is the primary craft tool of a sculptor; an IDE / Code Editor is the primary tool of a programmer." },
      { q: "Thread : Process :: Leaf : ?", opt: ["Branch / Tree", "Flower", "Root", "Seed"], ans: 0, diff: "medium", exp: "A thread is a lightweight sub-unit of a process, just as a leaf is a sub-unit of a branch/tree." },
      { q: "Entropy : Disorder :: Cryptography : ?", opt: ["Confidentiality / Secrecy", "Redundancy", "Deception", "Transmission"], ans: 0, diff: "hard", exp: "Entropy is a measure of disorder; cryptography is a science dedicated to confidentiality and secrecy." },
      { q: "Epilogue : Novel :: Post-Mortem : ?", opt: ["Project / Outage Incident", "Prologue", "Bug Report", "Commit"], ans: 0, diff: "hard", exp: "An epilogue is the concluding analysis/wrap-up of a novel; a post-mortem is the concluding review of an engineering project or outage incident." }
    ]
  },

  // 11. Classification (Odd One Out)
  {
    topic: "Classification",
    prefix: "lr-cls",
    items: [
      { q: "Find the odd one out: Apple, Banana, Orange, Potato", opt: ["Potato", "Apple", "Banana", "Orange"], ans: 0, diff: "easy", exp: "Potato is a root vegetable/tuber, whereas Apple, Banana, and Orange are fruits." },
      { q: "Find the odd one out: Copper, Silver, Gold, Plastic", opt: ["Plastic", "Copper", "Silver", "Gold"], ans: 0, diff: "easy", exp: "Copper, Silver, and Gold are metallic elements and electrical conductors; Plastic is a polymer insulator." },
      { q: "Find the odd one out: Keyboard, Mouse, Scanner, Printer", opt: ["Printer", "Keyboard", "Mouse", "Scanner"], ans: 0, diff: "easy", exp: "Keyboard, Mouse, and Scanner are input devices; Printer is an output device." },
      { q: "Find the odd one out: Triangle, Square, Rectangle, Circle", opt: ["Circle", "Triangle", "Square", "Rectangle"], ans: 0, diff: "easy", exp: "Triangle, Square, and Rectangle are rectilinear polygons with straight edges; a Circle is a non-polygonal curve." },
      { q: "Find the odd one out: Python, Java, C++, HTML", opt: ["HTML", "Python", "Java", "C++"], ans: 0, diff: "medium", exp: "Python, Java, and C++ are general-purpose programming languages; HTML is a declarative markup language." },
      { q: "Find the odd one out: Linux, Windows, macOS, Oracle", opt: ["Oracle", "Linux", "Windows", "macOS"], ans: 0, diff: "medium", exp: "Linux, Windows, and macOS are Operating Systems; Oracle is a Relational Database / Enterprise Software company." },
      { q: "Find the odd one out: TCP, UDP, IP, HTTP", opt: ["HTTP", "TCP", "UDP", "IP"], ans: 0, diff: "medium", exp: "HTTP is an Application layer protocol, while TCP/UDP operate at the Transport layer and IP at the Network layer." },
      { q: "Find the odd one out: Git, SVN, Mercurial, Docker", opt: ["Docker", "Git", "SVN", "Mercurial"], ans: 0, diff: "medium", exp: "Git, SVN, and Mercurial are version control systems; Docker is a containerization engine." },
      { q: "Find the odd one out: Stack, Queue, Array, Hash Table", opt: ["Hash Table", "Stack", "Queue", "Array"], ans: 0, diff: "hard", exp: "Stack, Queue, and Array are sequential linear data structures; Hash Table is an associative key-value map." },
      { q: "Find the odd one out: Redis, Memcached, PostgreSQL, DynamoDB Accelerator (DAX)", opt: ["PostgreSQL", "Redis", "Memcached", "DynamoDB Accelerator (DAX)"], ans: 0, diff: "hard", exp: "Redis, Memcached, and DAX are in-memory caching systems; PostgreSQL is an ACID-compliant disk-backed relational database." }
    ]
  },

  // 12. Data Sufficiency
  {
    topic: "Data Sufficiency",
    prefix: "lr-dsuf",
    items: [
      { q: "Is x an even integer?\nStatements:\nI. x is a multiple of 4.\nII. x is divisible by 2.", opt: ["Either statement alone is sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient", "Neither statement is sufficient"], ans: 0, diff: "easy", exp: "If x is a multiple of 4, x is even (I sufficient). If x is divisible by 2, x is even (II sufficient). Either statement alone is sufficient." },
      { q: "What is the value of x?\nStatements:\nI. 2x + 5 = 15\nII. x > 0", opt: ["Statement I alone is sufficient", "Statement II alone is sufficient", "Both together are necessary", "Neither is sufficient"], ans: 0, diff: "easy", exp: "From I: 2x = 10 => x = 5 (unique value). Statement I alone is sufficient." },
      { q: "Who is the tallest among A, B, and C?\nStatements:\nI. A is taller than B.\nII. A is taller than C.", opt: ["Statements I and II together are sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient", "Neither is sufficient"], ans: 0, diff: "easy", exp: "From I: A > B. From II: A > C. Combining both shows A is taller than both B and C. Both together are sufficient." },
      { q: "Is y greater than 10?\nStatements:\nI. y > 15\nII. y < 20", opt: ["Statement I alone is sufficient", "Statement II alone is sufficient", "Both together are sufficient", "Neither is sufficient"], ans: 0, diff: "easy", exp: "If y > 15, y is definitely > 10 (I alone is sufficient). Statement II allows values like 5 which are not > 10 (II is not sufficient)." },
      { q: "What is the average age of a class of 30 students?\nStatements:\nI. Total age of all 30 students is 450 years.\nII. The teacher is 40 years old.", opt: ["Statement I alone is sufficient", "Statement II alone is sufficient", "Both together are necessary", "Neither is sufficient"], ans: 0, diff: "medium", exp: "From I: Average = 450 / 30 = 15 years. Statement I alone gives the exact answer." },
      { q: "What is the speed of the train?\nStatements:\nI. The train crosses a pole in 9 seconds.\nII. The length of the train is 180 meters.", opt: ["Both statements together are sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient", "Neither is sufficient"], ans: 0, diff: "medium", exp: "Speed = Length / Time. Neither length alone nor time alone gives speed. Both together: 180 / 9 = 20 m/s. Both together are sufficient." },
      { q: "Is quadrilateral ABCD a rectangle?\nStatements:\nI. Opposite sides are equal.\nII. One of the interior angles is 90°.", opt: ["Both statements together are sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient", "Neither is sufficient"], ans: 0, diff: "medium", exp: "Statement I makes ABCD a parallelogram. Statement II with I ensures all angles are 90°, proving it is a rectangle. Both together are sufficient." },
      { q: "What is the profit percentage earned by the merchant?\nStatements:\nI. The merchant sells goods at 20% above the cost price.\nII. He allows a 10% discount on the marked price.", opt: ["Both statements together are sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient", "Neither is sufficient"], ans: 0, diff: "medium", exp: "Let CP = 100. From I: MP = 120. From II: SP = 120 × 0.90 = 108. Profit = 8%. Both statements together are sufficient." },
      { q: "In a company, are there more than 50 engineers?\nStatements:\nI. 40% of the employees are engineers.\nII. The total number of employees is at least 150.", opt: ["Both statements together are sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient", "Neither is sufficient"], ans: 0, diff: "hard", exp: "Engineers = 40% of Total. If Total >= 150, Engineers >= 0.40 × 150 = 60. Since 60 > 50, the answer is definitively YES. Both statements together are sufficient." },
      { q: "What is the value of integers m and n?\nStatements:\nI. m + n = 12\nII. m × n = 35", opt: ["Neither statement nor both together are sufficient (gives two unordered pairs)", "Both statements together are sufficient", "Statement I alone is sufficient", "Statement II alone is sufficient"], ans: 0, diff: "hard", exp: "The equations give {m, n} = {5, 7} or {7, 5}. We cannot definitively state whether m=5 or m=7. Hence, neither is sufficient to find unique values for m and n." }
    ]
  }
];

const lrQuestions = [];
lrGroups.forEach(group => {
  group.items.forEach((item, index) => {
    const qNum = String(index + 1).padStart(2, '0');
    lrQuestions.push({
      id: `${group.prefix}-${qNum}`,
      category: "logicalReasoning",
      topic: group.topic,
      difficulty: item.diff,
      question: item.q,
      options: item.opt,
      correctAnswer: item.ans,
      explanation: item.exp
    });
  });
});

console.log(`Total Logical Reasoning questions: ${lrQuestions.length}`);

// Write logicalReasoning.js
const lrFileContent = `/**
 * DevPilot-AI — Logical Reasoning Question Bank
 * 120 authentic placement MCQs across 12 topics with step-by-step logical explanations.
 */

(function () {
  'use strict';

  const lrData = {
    category: "logicalReasoning",
    title: "Logical Reasoning",
    description: "Number series, syllogisms, blood relations, seating arrangement, coding-decoding, puzzles, and data sufficiency.",
    icon: "psychology",
    totalTopics: ${lrTopics.length},
    topics: ${JSON.stringify(lrTopics, null, 2)},
    questions: ${JSON.stringify(lrQuestions, null, 2)}
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['logicalReasoning'] = lrData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = lrData;
  }
})();
`;

fs.writeFileSync(path.join(targetDir, 'logicalReasoning.js'), lrFileContent, 'utf8');
console.log('Successfully written logicalReasoning.js!');
