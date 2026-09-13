/**
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
    totalTopics: 10,
    topics: [
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
],
    questions: [
  {
    "id": "eng-rc-01",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "easy",
    "question": "Passage: 'Renewable energy adoption has accelerated globally due to dropping costs of photovoltaic cells and battery storage. However, grid integration and transmission intermittency remain substantial technological hurdles for distributed solar power.'\n\nQuestion: According to the passage, what is a primary catalyst for global renewable energy adoption?",
    "options": [
      "Dropping costs of photovoltaic cells and battery storage",
      "Complete resolution of transmission intermittency",
      "Decreased power demand in urban centers",
      "Government subsidies replacing all private investment"
    ],
    "correctAnswer": 0,
    "explanation": "The passage explicitly states that renewable energy adoption accelerated 'due to dropping costs of photovoltaic cells and battery storage'."
  },
  {
    "id": "eng-rc-02",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "easy",
    "question": "Passage: 'In software development, code refactoring improves internal code structure without altering external observable behavior. It reduces technical debt and elevates long-term developer velocity.'\n\nQuestion: What is the main outcome of refactoring according to the passage?",
    "options": [
      "Improving internal structure without altering external behavior",
      "Adding new functional user requirements",
      "Rewriting application logic in a faster language",
      "Automating end-to-end integration tests"
    ],
    "correctAnswer": 0,
    "explanation": "The text states refactoring 'improves internal code structure without altering external observable behavior'."
  },
  {
    "id": "eng-rc-03",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "easy",
    "question": "Passage: 'Microservices architecture decomposes monolithic applications into independently deployable units communicating over lightweight protocols. While this enhances modularity, it introduces operational complexity around distributed tracing.'\n\nQuestion: Which trade-off of microservices is highlighted?",
    "options": [
      "Increased operational complexity around distributed tracing",
      "Decreased code modularity and service isolation",
      "Inability to deploy services independently",
      "Higher hardware costs for running single-threaded servers"
    ],
    "correctAnswer": 0,
    "explanation": "The author notes that while modularity is enhanced, microservices 'introduce operational complexity around distributed tracing'."
  },
  {
    "id": "eng-rc-04",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "easy",
    "question": "Passage: 'Autonomous vehicles rely on sensor fusion—amalgamating data from LiDAR, radar, and optical cameras—to create a unified 3D spatial map of their surrounding environment.'\n\nQuestion: What is 'sensor fusion' in this context?",
    "options": [
      "Combining inputs from multiple sensor types for environmental mapping",
      "Manufacturing sensors using silicon fusion techniques",
      "Filtering out radar noise in favor of optical cameras only",
      "Using machine learning to reduce the number of sensors needed"
    ],
    "correctAnswer": 0,
    "explanation": "The passage explains sensor fusion as 'amalgamating data from LiDAR, radar, and optical cameras to create a unified 3D spatial map'."
  },
  {
    "id": "eng-rc-05",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "medium",
    "question": "Passage: 'The concept of psychological safety in engineering teams suggests that when developers feel confident that mistakes will not be punished, incident reporting increases while recurrence of critical failures decreases.'\n\nQuestion: What paradox does the passage articulate?",
    "options": [
      "Higher reporting of errors leads to fewer actual recurring critical failures",
      "Developers who make no mistakes have lower velocity",
      "Punishing mistakes reduces the total number of production bugs",
      "Strict guidelines improve team psychological comfort"
    ],
    "correctAnswer": 0,
    "explanation": "The passage highlights that when developers feel safe to report incidents freely without fear of punishment, the overall recurrence of critical failures actually declines."
  },
  {
    "id": "eng-rc-06",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "medium",
    "question": "Passage: 'Open-source software has evolved from ideological altruism into a cornerstone of enterprise infrastructure. Major tech corporations now actively fund foundational open-source repositories to mitigate single-vendor lock-in and foster collaborative innovation.'\n\nQuestion: Why do corporations fund open source according to the passage?",
    "options": [
      "To avoid single-vendor lock-in and cultivate collaborative innovation",
      "Purely out of ideological and non-profit motivations",
      "To eliminate the need for in-house software engineers",
      "Because proprietary development has been outlawed in cloud computing"
    ],
    "correctAnswer": 0,
    "explanation": "The passage specifies enterprise funding occurs 'to mitigate single-vendor lock-in and foster collaborative innovation'."
  },
  {
    "id": "eng-rc-07",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "medium",
    "question": "Passage: 'Algorithmic bias often stems not from malicious engineering intent, but from historical inequities mirrored in training datasets. When past hiring decisions disfavored certain demographic groups, machine learning models trained on that data inevitably internalize and propagate those discriminatory patterns.'\n\nQuestion: What is the primary cause of algorithmic bias identified by the author?",
    "options": [
      "Historical inequities embedded in training datasets",
      "Deliberate discrimination by machine learning engineers",
      "Hardware limitations in computing deep neural networks",
      "A lack of computing power during the training phase"
    ],
    "correctAnswer": 0,
    "explanation": "The text explains bias arises from 'historical inequities mirrored in training datasets' which models internalize."
  },
  {
    "id": "eng-rc-08",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "medium",
    "question": "Passage: 'Zero-Trust Architecture operates on the principle of 'never trust, always verify'. Rather than assuming everything behind the corporate firewall is secure, it mandates mutual authentication and least-privilege access for every transaction across network perimeters.'\n\nQuestion: How does Zero-Trust redefine traditional perimeter defense?",
    "options": [
      "It treats all internal requests with continuous verification rather than implicit trust",
      "It eliminates all firewalls and relies solely on passwords",
      "It assumes internal corporate networks are inherently safe",
      "It grants unrestricted access to users who successfully log in once"
    ],
    "correctAnswer": 0,
    "explanation": "Zero-Trust rejects implicit trust inside firewalls and enforces continuous verification and least privilege for every access."
  },
  {
    "id": "eng-rc-09",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "hard",
    "question": "Passage: 'Epistemological humility in empirical science recognizes that empirical hypotheses can only be falsified, never definitively proven in an absolute deductive sense. As Karl Popper argued, a million confirming observations cannot prove a universal hypothesis, yet a single robust counterexample can refute it.'\n\nQuestion: What is the philosophical implication of Popper's falsification criterion?",
    "options": [
      "Scientific truth remains provisional and open to empirical refutation",
      "All empirical hypotheses are essentially invalid and untestable",
      "Deductive mathematics is inferior to experimental physics",
      "A single confirming experiment proves a universal law beyond doubt"
    ],
    "correctAnswer": 0,
    "explanation": "Because an empirical hypothesis cannot be definitively proven but can be refuted by a single counterexample, scientific knowledge remains provisional."
  },
  {
    "id": "eng-rc-10",
    "category": "english",
    "topic": "Reading Comprehension",
    "difficulty": "hard",
    "question": "Passage: 'The Jevons Paradox asserts that technological progress that increases the efficiency with which a resource is used tends to increase (rather than decrease) the overall rate of consumption of that resource, because cheaper utility stimulates disproportionately higher aggregate demand.'\n\nQuestion: What counterintuitive phenomenon does the Jevons Paradox explain?",
    "options": [
      "Efficiency gains can lead to higher aggregate resource consumption",
      "Conserving resources always lowers industrial productivity",
      "Increased prices cause higher consumer demand for commodities",
      "Technological advancements always reduce ecological footprints"
    ],
    "correctAnswer": 0,
    "explanation": "The paradox demonstrates that increased efficiency lowers the unit cost of using a resource, driving higher aggregate demand and overall consumption."
  },
  {
    "id": "eng-grm-01",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "easy",
    "question": "Neither the manager nor the employees _____ present at the meeting yesterday.",
    "options": [
      "were",
      "was",
      "is",
      "are"
    ],
    "correctAnswer": 0,
    "explanation": "In 'Neither... nor' constructions, the verb agrees with the closer subject. 'Employees' is plural, and the time is past, so 'were' is correct."
  },
  {
    "id": "eng-grm-02",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "easy",
    "question": "The committee _____ divided in their opinions regarding the budget proposal.",
    "options": [
      "were",
      "was",
      "has",
      "is"
    ],
    "correctAnswer": 0,
    "explanation": "When a collective noun like 'committee' acts as individual members with divergent opinions (indicated by 'their opinions'), it takes a plural verb ('were')."
  },
  {
    "id": "eng-grm-03",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "easy",
    "question": "He has been working on this project _____ last Monday.",
    "options": [
      "since",
      "for",
      "from",
      "by"
    ],
    "correctAnswer": 0,
    "explanation": "'Since' is used to denote a specific starting point in time (last Monday) with present perfect continuous tense."
  },
  {
    "id": "eng-grm-04",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "easy",
    "question": "Bread and butter _____ his favorite breakfast.",
    "options": [
      "is",
      "are",
      "were",
      "have been"
    ],
    "correctAnswer": 0,
    "explanation": "When two singular nouns together express a single composite idea or unit (bread and butter as a meal), they take a singular verb ('is')."
  },
  {
    "id": "eng-grm-05",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "medium",
    "question": "If I _____ you, I would have accepted the job offer without hesitation.",
    "options": [
      "were",
      "was",
      "am",
      "had been"
    ],
    "correctAnswer": 0,
    "explanation": "In hypothetical/subjunctive conditional clauses contrary to fact ('If I were you'), the subjunctive 'were' is grammatically standard regardless of subject pronoun."
  },
  {
    "id": "eng-grm-06",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "medium",
    "question": "Hardly had the meeting started _____ the fire alarm went off.",
    "options": [
      "when",
      "than",
      "then",
      "after"
    ],
    "correctAnswer": 0,
    "explanation": "'Hardly had... when' is the correct correlative conjunction pair. ('No sooner had... than' is used with 'than')."
  },
  {
    "id": "eng-grm-07",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "medium",
    "question": "Each of the candidates _____ submitted their portfolio before the deadline.",
    "options": [
      "has",
      "have",
      "are",
      "were"
    ],
    "correctAnswer": 0,
    "explanation": "'Each of the [plural noun]' takes a singular verb. Therefore, 'has' is grammatically correct."
  },
  {
    "id": "eng-grm-08",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "medium",
    "question": "She is one of the few engineers who _____ developed real-time distributed kernels.",
    "options": [
      "have",
      "has",
      "is",
      "was"
    ],
    "correctAnswer": 0,
    "explanation": "In 'one of the [plural noun] who...', the relative pronoun 'who' refers to the plural antecedent 'engineers', thus taking a plural verb 'have'."
  },
  {
    "id": "eng-grm-09",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "hard",
    "question": "By the time the system architect arrives tomorrow, the development team _____ deploying the release candidate.",
    "options": [
      "will have finished",
      "will finish",
      "has finished",
      "finished"
    ],
    "correctAnswer": 0,
    "explanation": "'By the time + present tense clause' referring to the future requires Future Perfect tense ('will have finished') to indicate an action completed prior to another future event."
  },
  {
    "id": "eng-grm-10",
    "category": "english",
    "topic": "Grammar",
    "difficulty": "hard",
    "question": "The CEO insisted that the audit report _____ submitted by Friday afternoon.",
    "options": [
      "be",
      "is",
      "was",
      "will be"
    ],
    "correctAnswer": 0,
    "explanation": "Verbs of demand or insistence (insist, demand, recommend, request) require the subjunctive mood base form of the verb without 'to' ('be submitted')."
  },
  {
    "id": "eng-sc-01",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "easy",
    "question": "Choose the correct sentence: \n'One of my friend are a software architect.'",
    "options": [
      "One of my friends is a software architect.",
      "One of my friends are a software architect.",
      "One of my friend is a software architect.",
      "One of my friend have been a software architect."
    ],
    "correctAnswer": 0,
    "explanation": "'One of' is followed by a plural noun ('friends') and a singular verb ('is')."
  },
  {
    "id": "eng-sc-02",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "easy",
    "question": "Correct the underlined phrase: 'He is superior *than* all his colleagues in problem solving.'",
    "options": [
      "superior to",
      "more superior than",
      "superior over",
      "superior from"
    ],
    "correctAnswer": 0,
    "explanation": "Adjectives ending in -ior (superior, inferior, senior, junior, prior) take the preposition 'to', never 'than'."
  },
  {
    "id": "eng-sc-03",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "easy",
    "question": "Identify the correct version: 'She did not knew the answer to the coding problem.'",
    "options": [
      "She did not know the answer to the coding problem.",
      "She did not known the answer to the coding problem.",
      "She do not knew the answer to the coding problem.",
      "She had not knew the answer to the coding problem."
    ],
    "correctAnswer": 0,
    "explanation": "The auxiliary verb 'did' is followed by the base/infinitive form of the main verb ('know')."
  },
  {
    "id": "eng-sc-04",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "easy",
    "question": "Choose the correct sentence: \n'I prefer tea *than* coffee.'",
    "options": [
      "I prefer tea to coffee.",
      "I prefer tea more than coffee.",
      "I prefer tea over coffee than milk.",
      "I prefer tea against coffee."
    ],
    "correctAnswer": 0,
    "explanation": "The verb 'prefer' takes the preposition 'to' when comparing two nouns."
  },
  {
    "id": "eng-sc-05",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "medium",
    "question": "Correct the sentence: 'Being a rainy day, we decided to postpone the team outing.'",
    "options": [
      "It being a rainy day, we decided to postpone the team outing.",
      "Being that it was a rainy day, we decided to postpone the team outing.",
      "As a rainy day, we decided to postpone the team outing.",
      "Having a rainy day, we decided to postpone the team outing."
    ],
    "correctAnswer": 0,
    "explanation": "'Being a rainy day' creates a dangling participle modifying 'we'. Adding the dummy pronoun 'It' ('It being a rainy day') provides the correct absolute construction."
  },
  {
    "id": "eng-sc-06",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "medium",
    "question": "Choose the grammatically correct comparative sentence:",
    "options": [
      "The population of Tokyo is greater than that of London.",
      "The population of Tokyo is greater than London.",
      "The population of Tokyo is more great than London.",
      "The population of Tokyo is greater from London."
    ],
    "correctAnswer": 0,
    "explanation": "Comparisons must be parallel. Comparing 'population' directly to 'London' is faulty; it must be compared to 'that of London'."
  },
  {
    "id": "eng-sc-07",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "medium",
    "question": "Correct the sentence: 'Neither the database server nor the application instances *was* affected by the blackout.'",
    "options": [
      "Neither the database server nor the application instances were affected by the blackout.",
      "Neither the database server nor the application instances was affected by the blackout.",
      "Neither the database server or the application instances were affected by the blackout.",
      "Both the database server nor the application instances was affected by the blackout."
    ],
    "correctAnswer": 0,
    "explanation": "With 'neither... nor', the verb agrees with the closer subject 'application instances' (plural), so 'were' is correct."
  },
  {
    "id": "eng-sc-08",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "medium",
    "question": "Choose the sentence with correct parallel structure:",
    "options": [
      "The senior developer enjoys designing architectures, writing clean code, and mentoring junior engineers.",
      "The senior developer enjoys designing architectures, to write clean code, and mentoring junior engineers.",
      "The senior developer enjoys to design architectures, writing clean code, and mentors junior engineers.",
      "The senior developer enjoys designing architectures, write clean code, and to mentor junior engineers."
    ],
    "correctAnswer": 0,
    "explanation": "Parallelism requires consistent grammatical structures in lists: 'designing...', 'writing...', 'and mentoring...' (all gerunds)."
  },
  {
    "id": "eng-sc-09",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "hard",
    "question": "Correct the sentence: 'Scarcely had the build completed *than* the automated test suite failed.'",
    "options": [
      "Scarcely had the build completed when the automated test suite failed.",
      "Scarcely had the build completed then the automated test suite failed.",
      "Scarcely did the build completed when the automated test suite failed.",
      "Scarcely had the build completed than the automated test suite failed."
    ],
    "correctAnswer": 0,
    "explanation": "'Scarcely' pairs correlatively with 'when', not 'than'. ('Than' is paired with 'No sooner')."
  },
  {
    "id": "eng-sc-10",
    "category": "english",
    "topic": "Sentence Correction",
    "difficulty": "hard",
    "question": "Choose the correct sentence regarding conditional past subjunctive:",
    "options": [
      "Had the engineer audited the memory leaks earlier, the application would not have crashed in production.",
      "If the engineer audited the memory leaks earlier, the application would not have crashed in production.",
      "Had the engineer audited the memory leaks earlier, the application will not have crashed in production.",
      "If the engineer would have audited the memory leaks earlier, the application had not crashed in production."
    ],
    "correctAnswer": 0,
    "explanation": "Inverted third conditional structure: 'Had + subject + past participle, subject + would have + past participle' is the standard, precise grammatical formulation."
  },
  {
    "id": "eng-ed-01",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "easy",
    "question": "Find the error part: 'The team (A) / are working (B) / on the module (C) / since two months (D).'",
    "options": [
      "(D) since two months",
      "(A) The team",
      "(B) are working",
      "(C) on the module"
    ],
    "correctAnswer": 0,
    "explanation": "For a duration of time ('two months'), the preposition 'for' should be used instead of 'since'. Correct phrase: 'for two months'."
  },
  {
    "id": "eng-ed-02",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "easy",
    "question": "Find the error part: 'She did not (A) / passed the exam (B) / despite preparing (C) / diligently (D).'",
    "options": [
      "(B) passed the exam",
      "(A) She did not",
      "(C) despite preparing",
      "(D) diligently"
    ],
    "correctAnswer": 0,
    "explanation": "After 'did not', the main verb must be in base form: 'pass', not 'passed'."
  },
  {
    "id": "eng-ed-03",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "easy",
    "question": "Find the error part: 'He has (A) / visited the museum (B) / yesterday (C) / with his friends (D).'",
    "options": [
      "(A) He has",
      "(B) visited the museum",
      "(C) yesterday",
      "(D) with his friends"
    ],
    "correctAnswer": 0,
    "explanation": "Specific past time markers like 'yesterday' take Simple Past ('He visited'), not Present Perfect ('He has visited')."
  },
  {
    "id": "eng-ed-04",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "easy",
    "question": "Find the error part: 'I am looking forward (A) / to meet you (B) / at the conference (C) / next week (D).'",
    "options": [
      "(B) to meet you",
      "(A) I am looking forward",
      "(C) at the conference",
      "(D) next week"
    ],
    "correctAnswer": 0,
    "explanation": "The phrase 'look forward to' is followed by a gerund (-ing form). Correct: 'to meeting you'."
  },
  {
    "id": "eng-ed-05",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "medium",
    "question": "Find the error part: 'Although he worked hard (A) / but he could not (B) / achieve the desired (C) / throughput target (D).'",
    "options": [
      "(B) but he could not",
      "(A) Although he worked hard",
      "(C) achieve the desired",
      "(D) throughput target"
    ],
    "correctAnswer": 0,
    "explanation": "'Although' and 'but' are redundant conjunctions when used together in the same clause relationship. Remove 'but'."
  },
  {
    "id": "eng-ed-06",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "medium",
    "question": "Find the error part: 'Unless you do not (A) / write clean unit tests, (B) / your pull request (C) / will not be merged (D).'",
    "options": [
      "(A) Unless you do not",
      "(B) write clean unit tests,",
      "(C) your pull request",
      "(D) will not be merged"
    ],
    "correctAnswer": 0,
    "explanation": "'Unless' inherently contains a negative meaning ('if not'). Using 'do not' creates an erroneous double negative. Correct: 'Unless you write'."
  },
  {
    "id": "eng-ed-07",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "medium",
    "question": "Find the error part: 'The quality of these (A) / newly manufactured (B) / microprocessors are (C) / remarkably superior (D).'",
    "options": [
      "(C) microprocessors are",
      "(A) The quality of these",
      "(B) newly manufactured",
      "(D) remarkably superior"
    ],
    "correctAnswer": 0,
    "explanation": "The subject is 'The quality' (singular), not 'microprocessors'. Therefore, the verb must be 'is', not 'are'."
  },
  {
    "id": "eng-ed-08",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "medium",
    "question": "Find the error part: 'He told to me (A) / that the deployment (B) / had succeeded (C) / without downtime (D).'",
    "options": [
      "(A) He told to me",
      "(B) that the deployment",
      "(C) had succeeded",
      "(D) without downtime"
    ],
    "correctAnswer": 0,
    "explanation": "The verb 'tell' is a transitive verb that takes a direct object without preposition 'to'. Correct: 'He told me'."
  },
  {
    "id": "eng-ed-09",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "hard",
    "question": "Find the error part: 'Not only the technical lead (A) / but also the developers (B) / was commended (C) / for resolving the zero-day vulnerability (D).'",
    "options": [
      "(C) was commended",
      "(A) Not only the technical lead",
      "(B) but also the developers",
      "(D) for resolving the zero-day vulnerability"
    ],
    "correctAnswer": 0,
    "explanation": "With 'Not only... but also', the verb agrees with the closer subject. 'The developers' is plural, so it requires 'were commended'."
  },
  {
    "id": "eng-ed-10",
    "category": "english",
    "topic": "Error Detection",
    "difficulty": "hard",
    "question": "Find the error part: 'No sooner did the CEO (A) / made the announcement (B) / than the stock price (C) / surged by ten percent (D).'",
    "options": [
      "(B) made the announcement",
      "(A) No sooner did the CEO",
      "(C) than the stock price",
      "(D) surged by ten percent"
    ],
    "correctAnswer": 0,
    "explanation": "After auxiliary 'did', the verb must remain in base form 'make', not past tense 'made'. Correct: 'make the announcement'."
  },
  {
    "id": "eng-voc-01",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "easy",
    "question": "What is the meaning of the word 'EPHEMERAL'?",
    "options": [
      "Short-lived or lasting for a very short time",
      "Everlasting and eternal",
      "Extremely fragile or brittle",
      "Complicated and intricate"
    ],
    "correctAnswer": 0,
    "explanation": "Ephemeral means lasting for a very brief period (transitory, fleeting)."
  },
  {
    "id": "eng-voc-02",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "easy",
    "question": "What does 'UBIQUITOUS' mean?",
    "options": [
      "Present or existing everywhere simultaneously",
      "Rare and scarce",
      "Extremely powerful",
      "Concealed from view"
    ],
    "correctAnswer": 0,
    "explanation": "Ubiquitous means omnipresent or found everywhere (e.g. smartphones are ubiquitous)."
  },
  {
    "id": "eng-voc-03",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "easy",
    "question": "Choose the word that means 'to make something less severe or painful':",
    "options": [
      "Mitigate",
      "Aggravate",
      "Exacerbate",
      "Prolong"
    ],
    "correctAnswer": 0,
    "explanation": "Mitigate means to make less severe, serious, or painful."
  },
  {
    "id": "eng-voc-04",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "easy",
    "question": "What is the meaning of 'PRAGMATIC'?",
    "options": [
      "Dealing with things sensibly and realistically",
      "Theoretical and abstract",
      "Impulsive and reckless",
      "Overly pessimistic"
    ],
    "correctAnswer": 0,
    "explanation": "Pragmatic means practical, grounded in facts and tangible outcomes rather than theory."
  },
  {
    "id": "eng-voc-05",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "medium",
    "question": "What does the word 'METICULOUS' describe?",
    "options": [
      "Showing great attention to detail and precision",
      "Careless and hurried",
      "Arrogant and unyielding",
      "Tolerant of ambiguity"
    ],
    "correctAnswer": 0,
    "explanation": "Meticulous means taking or showing extreme care about minute details; thorough."
  },
  {
    "id": "eng-voc-06",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "medium",
    "question": "What is the definition of 'COGNIZANT'?",
    "options": [
      "Having knowledge or being aware of something",
      "Ignorant or oblivious",
      "Reluctant to participate",
      "Unable to comprehend"
    ],
    "correctAnswer": 0,
    "explanation": "Cognizant means having awareness, realization, or knowledge of something."
  },
  {
    "id": "eng-voc-07",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "medium",
    "question": "Choose the word that describes 'unwilling to change one's opinion or course of action':",
    "options": [
      "Intransigent",
      "Malleable",
      "Compliant",
      "Vacillating"
    ],
    "correctAnswer": 0,
    "explanation": "Intransigent means stubborn, refusing to agree or compromise; inflexible."
  },
  {
    "id": "eng-voc-08",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "medium",
    "question": "What is the meaning of 'ANACHRONISTIC'?",
    "options": [
      "Belonging to a period other than that in which it exists",
      "Occurring simultaneously in modern times",
      "Rapidly changing over hours",
      "Scientifically unverifiable"
    ],
    "correctAnswer": 0,
    "explanation": "Anachronistic means out of its proper chronological or historical time."
  },
  {
    "id": "eng-voc-09",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "hard",
    "question": "What does 'PERFUNCTORY' mean in a professional context?",
    "options": [
      "Carried out with minimal effort or routine care",
      "Thorough and exhaustive",
      "Innovative and original",
      "Highly prioritized"
    ],
    "correctAnswer": 0,
    "explanation": "Perfunctory means performed merely as a routine duty; hasty and superficial."
  },
  {
    "id": "eng-voc-10",
    "category": "english",
    "topic": "Vocabulary",
    "difficulty": "hard",
    "question": "What does 'SYCOPHANT' mean?",
    "options": [
      "A person who flatters someone important for personal gain",
      "A fierce and independent critic",
      "A pioneer of scientific discovery",
      "A skeptical investigator"
    ],
    "correctAnswer": 0,
    "explanation": "A sycophant is a servile flatterer who acts obsequiously toward someone powerful to gain advantage."
  },
  {
    "id": "eng-sa-01",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "question": "Find the SYNONYM of 'CANDID':",
    "options": [
      "Frank",
      "Deceptive",
      "Secretive",
      "Shy"
    ],
    "correctAnswer": 0,
    "explanation": "Candid means straightforward, open, and frank."
  },
  {
    "id": "eng-sa-02",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "question": "Find the ANTONYM of 'AFFLUENT':",
    "options": [
      "Impoverished",
      "Wealthy",
      "Prosperous",
      "Abundant"
    ],
    "correctAnswer": 0,
    "explanation": "Affluent means rich or wealthy; its opposite is impoverished or poor."
  },
  {
    "id": "eng-sa-03",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "question": "Find the SYNONYM of 'LUCID':",
    "options": [
      "Clear and easily understood",
      "Murky",
      "Confusing",
      "Opaque"
    ],
    "correctAnswer": 0,
    "explanation": "Lucid means expressed clearly; easy to understand."
  },
  {
    "id": "eng-sa-04",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "easy",
    "question": "Find the ANTONYM of 'DILIGENT':",
    "options": [
      "Lazy",
      "Hardworking",
      "Persistent",
      "Attentive"
    ],
    "correctAnswer": 0,
    "explanation": "Diligent means hardworking and conscientious; its antonym is lazy or negligent."
  },
  {
    "id": "eng-sa-05",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "question": "Find the SYNONYM of 'INNOVATIVE':",
    "options": [
      "Novel",
      "Traditional",
      "Stagnant",
      "Repetitive"
    ],
    "correctAnswer": 0,
    "explanation": "Innovative means featuring new methods; original, novel, and creative."
  },
  {
    "id": "eng-sa-06",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "question": "Find the ANTONYM of 'DORMANT':",
    "options": [
      "Active",
      "Latent",
      "Sleeping",
      "Passive"
    ],
    "correctAnswer": 0,
    "explanation": "Dormant means inactive or asleep; its antonym is active or energetic."
  },
  {
    "id": "eng-sa-07",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "question": "Find the SYNONYM of 'RESILIENT':",
    "options": [
      "Adaptable and hardy",
      "Rigid",
      "Fragile",
      "Vulnerable"
    ],
    "correctAnswer": 0,
    "explanation": "Resilient means able to withstand or recover quickly from difficult conditions."
  },
  {
    "id": "eng-sa-08",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "medium",
    "question": "Find the ANTONYM of 'GREGARIOUS':",
    "options": [
      "Solitary",
      "Sociable",
      "Outgoing",
      "Friendly"
    ],
    "correctAnswer": 0,
    "explanation": "Gregarious means fond of company and sociable; its opposite is solitary or introverted."
  },
  {
    "id": "eng-sa-09",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "question": "Find the SYNONYM of 'OBFUSCATE':",
    "options": [
      "Confuse or obscure",
      "Clarify",
      "Illuminate",
      "Simplify"
    ],
    "correctAnswer": 0,
    "explanation": "To obfuscate means to deliberately make something obscure, unclear, or confusing."
  },
  {
    "id": "eng-sa-10",
    "category": "english",
    "topic": "Synonyms & Antonyms",
    "difficulty": "hard",
    "question": "Find the ANTONYM of 'FASTIDIOUS':",
    "options": [
      "Careless",
      "Meticulous",
      "Punctilious",
      "Demanding"
    ],
    "correctAnswer": 0,
    "explanation": "Fastidious means very attentive to and concerned about accuracy and detail; its opposite is careless or sloppy."
  },
  {
    "id": "eng-fib-01",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "easy",
    "question": "The company's profits increased _____ 25% this quarter.",
    "options": [
      "by",
      "with",
      "at",
      "from"
    ],
    "correctAnswer": 0,
    "explanation": "'Increased by [percentage]' is the correct standard prepositional phrase."
  },
  {
    "id": "eng-fib-02",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "easy",
    "question": "She has an aptitude _____ mathematical computations.",
    "options": [
      "for",
      "in",
      "at",
      "with"
    ],
    "correctAnswer": 0,
    "explanation": "The noun 'aptitude' takes the preposition 'for' (an aptitude for music/math)."
  },
  {
    "id": "eng-fib-03",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "easy",
    "question": "He was prevented _____ entering the data center without clearance.",
    "options": [
      "from",
      "to",
      "against",
      "at"
    ],
    "correctAnswer": 0,
    "explanation": "'Prevent' is followed by 'from + gerund' (prevented from entering)."
  },
  {
    "id": "eng-fib-04",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "easy",
    "question": "The microservice is compliant _____ international security standards.",
    "options": [
      "with",
      "to",
      "by",
      "for"
    ],
    "correctAnswer": 0,
    "explanation": "The adjective 'compliant' takes the preposition 'with'."
  },
  {
    "id": "eng-fib-05",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "medium",
    "question": "The committee was astonished _____ the speed of algorithmic execution.",
    "options": [
      "at",
      "with",
      "for",
      "in"
    ],
    "correctAnswer": 0,
    "explanation": "'Astonished' typically takes 'at' or 'by' when referring to an event or quality."
  },
  {
    "id": "eng-fib-06",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "medium",
    "question": "He insisted _____ reviewing the code before merging the branch.",
    "options": [
      "on",
      "in",
      "to",
      "for"
    ],
    "correctAnswer": 0,
    "explanation": "'Insist' takes the preposition 'on' followed by a gerund ('insisted on reviewing')."
  },
  {
    "id": "eng-fib-07",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "medium",
    "question": "The new architecture is superior _____ the legacy monolithic codebase.",
    "options": [
      "to",
      "than",
      "over",
      "from"
    ],
    "correctAnswer": 0,
    "explanation": "'Superior' takes 'to', not 'than'."
  },
  {
    "id": "eng-fib-08",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "medium",
    "question": "The lead engineer congratulated the team _____ their successful deployment.",
    "options": [
      "on",
      "for",
      "with",
      "about"
    ],
    "correctAnswer": 0,
    "explanation": "'Congratulate [someone] on [an achievement]' is the standard collocation."
  },
  {
    "id": "eng-fib-09",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "hard",
    "question": "The discrepancy between the two balance sheets is too subtle to be detected _____ the naked eye.",
    "options": [
      "with",
      "by",
      "from",
      "at"
    ],
    "correctAnswer": 0,
    "explanation": "'Detected with the naked eye' (or 'by the naked eye') is standard; 'with the naked eye' indicates the instrument."
  },
  {
    "id": "eng-fib-10",
    "category": "english",
    "topic": "Fill in the Blanks",
    "difficulty": "hard",
    "question": "His argument was so _____ that even the most skeptical reviewers agreed.",
    "options": [
      "cogent",
      "redundant",
      "fallacious",
      "ambiguous"
    ],
    "correctAnswer": 0,
    "explanation": "'Cogent' means clear, logical, and convincing."
  },
  {
    "id": "eng-pj-01",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "easy",
    "question": "Arrange the sentences into a coherent paragraph:\n(A) This data is then fed into machine learning pipelines.\n(B) Modern web platforms collect vast streams of user interaction events.\n(C) Consequently, user recommendations become personalized in real time.\n(D) These models extract meaningful behavioral patterns.",
    "options": [
      "B - A - D - C",
      "A - B - C - D",
      "B - C - A - D",
      "C - D - B - A"
    ],
    "correctAnswer": 0,
    "explanation": "B introduces the topic (collecting events). A describes feeding this data. D describes models extracting patterns. C concludes with the consequence."
  },
  {
    "id": "eng-pj-02",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "easy",
    "question": "Arrange in logical order:\n(1) Software testing identifies discrepancies between actual and expected results.\n(2) When bugs are detected, tickets are filed in issue trackers.\n(3) Developers then isolate the root cause and apply bug fixes.\n(4) Finally, regression testing verifies that existing features remain intact.",
    "options": [
      "1 - 2 - 3 - 4",
      "2 - 1 - 4 - 3",
      "1 - 3 - 2 - 4",
      "4 - 1 - 2 - 3"
    ],
    "correctAnswer": 0,
    "explanation": "Logical bug triage workflow: identification (1) -> logging (2) -> fixing (3) -> regression verification (4)."
  },
  {
    "id": "eng-pj-03",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "easy",
    "question": "Reorder to form a proper narrative:\n(P) He graduated with honors in computer science.\n(Q) Soon after, he joined an early-stage artificial intelligence startup.\n(R) As a child, Rahul was fascinated by robotics.\n(S) There, he spearheaded the core neural search team.",
    "options": [
      "R - P - Q - S",
      "P - Q - R - S",
      "R - Q - P - S",
      "Q - S - R - P"
    ],
    "correctAnswer": 0,
    "explanation": "Chronological sequence: Childhood interest (R) -> College graduation (P) -> Joining startup (Q) -> Leading team there (S)."
  },
  {
    "id": "eng-pj-04",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "easy",
    "question": "Order the sentences:\n(A) Continuous integration automatically triggers builds on code push.\n(B) If tests fail, alerts notify the author immediately.\n(C) This enables rapid remediation of software regressions.\n(D) Unit and integration tests run in containerized environments.",
    "options": [
      "A - D - B - C",
      "A - B - D - C",
      "D - A - B - C",
      "B - C - A - D"
    ],
    "correctAnswer": 0,
    "explanation": "CI triggers (A) -> tests execute in containers (D) -> alerts trigger on failure (B) -> regressions remediated rapidly (C)."
  },
  {
    "id": "eng-pj-05",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "medium",
    "question": "Arrange logically:\n(1) Cloud computing transformed corporate infrastructure procurement.\n(2) Previously, enterprises spent months purchasing and racking physical servers.\n(3) Today, elastic compute instances can be provisioned in seconds via API calls.\n(4) This agility drastically lowered the capital barrier for technological startups.",
    "options": [
      "1 - 2 - 3 - 4",
      "2 - 1 - 3 - 4",
      "1 - 3 - 2 - 4",
      "4 - 1 - 2 - 3"
    ],
    "correctAnswer": 0,
    "explanation": "1 states the main thesis. 2 contrasts with past procurement. 3 shows modern API provisioning. 4 summarizes the economic outcome."
  },
  {
    "id": "eng-pj-06",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "medium",
    "question": "Form a coherent paragraph:\n(A) Furthermore, caching layers like Redis mitigate backend load.\n(B) Web performance optimization involves both frontend and backend strategies.\n(C) On the client side, asset minification and tree shaking reduce bundle size.\n(D) Together, these techniques deliver sub-second page rendering.",
    "options": [
      "B - C - A - D",
      "B - A - C - D",
      "C - A - B - D",
      "D - B - C - A"
    ],
    "correctAnswer": 0,
    "explanation": "B introduces the dual strategy. C details client side. A details backend caching ('Furthermore'). D synthesizes the outcome ('Together')."
  },
  {
    "id": "eng-pj-07",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "medium",
    "question": "Arrange the sentences:\n(P) High latency in financial trading can cost millions in slippage.\n(Q) Therefore, quantitative firms invest heavily in kernel-bypass networking.\n(R) By circumventing the operating system network stack, packets reach userspace in nanoseconds.\n(S) In high-frequency trading, execution speed is paramount.",
    "options": [
      "S - P - Q - R",
      "P - S - Q - R",
      "S - Q - R - P",
      "Q - R - S - P"
    ],
    "correctAnswer": 0,
    "explanation": "S introduces execution speed. P explains latency cost. Q explains investment in kernel-bypass. R explains how it achieves nanosecond latency."
  },
  {
    "id": "eng-pj-08",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "medium",
    "question": "Order the sentences logically:\n(A) Overfitting occurs when a model memorizes training noise rather than generalizable signals.\n(B) Consequently, it performs exceptionally on training benchmarks but fails in production.\n(C) Machine learning models must generalize well to unseen real-world data.\n(D) Regularization techniques such as L1/L2 and dropout are deployed to constrain complexity.",
    "options": [
      "C - A - B - D",
      "A - B - C - D",
      "C - B - A - D",
      "D - C - A - B"
    ],
    "correctAnswer": 0,
    "explanation": "C establishes generalization goal. A defines overfitting. B describes the consequence. D offers solutions (regularization)."
  },
  {
    "id": "eng-pj-09",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "hard",
    "question": "Arrange the sentences:\n(1) The CAP theorem states that a distributed data store can simultaneously provide only two of three guarantees.\n(2) In the presence of a network partition, a system must choose between consistency and availability.\n(3) Network partitions in distributed environments are inevitable due to hardware or routing failures.\n(4) Therefore, distributed database architects must make explicit trade-offs based on business SLAs.",
    "options": [
      "1 - 3 - 2 - 4",
      "1 - 2 - 3 - 4",
      "3 - 1 - 2 - 4",
      "2 - 1 - 3 - 4"
    ],
    "correctAnswer": 0,
    "explanation": "1 introduces CAP theorem. 3 states partitions are inevitable. 2 explains the forced choice during partitions. 4 concludes with architectural trade-offs."
  },
  {
    "id": "eng-pj-10",
    "category": "english",
    "topic": "Para Jumbles",
    "difficulty": "hard",
    "question": "Arrange into a logical sequence:\n(A) As transistors approached atomic limits, Dennard scaling broke down.\n(B) For decades, Moore's law drove exponential increases in processor clock speeds.\n(C) To sustain performance growth, chipmakers pivoted to multi-core architectures and parallelism.\n(D) This cessation of clock speed growth ended the free lunch for single-threaded software.",
    "options": [
      "B - A - D - C",
      "B - C - A - D",
      "A - D - B - C",
      "B - A - C - D"
    ],
    "correctAnswer": 0,
    "explanation": "B introduces Moore's law era. A explains breakdown of Dennard scaling. D states the impact on single threads. C shows the industry pivot to multi-core."
  },
  {
    "id": "eng-scmp-01",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "easy",
    "question": "Despite facing severe supply chain disruptions, the team managed to _____ the software release on schedule.",
    "options": [
      "deliver",
      "relinquish",
      "fabricate",
      "postpone"
    ],
    "correctAnswer": 0,
    "explanation": "'Despite' indicates contrast with disruption, so delivering on schedule fits logically."
  },
  {
    "id": "eng-scmp-02",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "easy",
    "question": "Because of his extensive domain experience, his suggestions were regarded with great _____ by senior management.",
    "options": [
      "deference",
      "skepticism",
      "indifference",
      "contempt"
    ],
    "correctAnswer": 0,
    "explanation": "'Deference' means respectful submission or yield to the judgment of another."
  },
  {
    "id": "eng-scmp-03",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "easy",
    "question": "The architecture was designed to be _____, allowing new microservices to be added without impacting existing workloads.",
    "options": [
      "extensible",
      "monolithic",
      "volatile",
      "obsolete"
    ],
    "correctAnswer": 0,
    "explanation": "'Extensible' describes a system capable of being extended with new features."
  },
  {
    "id": "eng-scmp-04",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "easy",
    "question": "The engineer provided a _____ explanation that clarified the bug in simple terms for non-technical stakeholders.",
    "options": [
      "lucid",
      "convoluted",
      "pedantic",
      "cryptic"
    ],
    "correctAnswer": 0,
    "explanation": "'Lucid' means clear and easily understood."
  },
  {
    "id": "eng-scmp-05",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "medium",
    "question": "Although the prototype was functional, its user interface was deemed too _____ for non-technical users.",
    "options": [
      "cumbersome",
      "intuitive",
      "aesthetic",
      "seamless"
    ],
    "correctAnswer": 0,
    "explanation": "'Although' contrasts functionality with difficulty, making 'cumbersome' (clunky/burdensome) the right choice."
  },
  {
    "id": "eng-scmp-06",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "medium",
    "question": "The distributed consensus algorithm guarantees that all nodes converge to a _____ state despite network delays.",
    "options": [
      "consistent",
      "random",
      "fragmented",
      "volatile"
    ],
    "correctAnswer": 0,
    "explanation": "Consensus algorithms ensure nodes reach a consistent, unified state."
  },
  {
    "id": "eng-scmp-07",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "medium",
    "question": "Her remarks during the post-mortem were so _____ that they eliminated ambiguity and identified the exact line of failed code.",
    "options": [
      "incisive",
      "equivocal",
      "superficial",
      "circumlocutory"
    ],
    "correctAnswer": 0,
    "explanation": "'Incisive' means clear, sharp, penetrating, and acute."
  },
  {
    "id": "eng-scmp-08",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "medium",
    "question": "Faced with conflicting telemetry data, the incident response team chose to act with extreme _____, verifying every server log before restarting the cluster.",
    "options": [
      "circumspection",
      "recklessness",
      "levity",
      "complacency"
    ],
    "correctAnswer": 0,
    "explanation": "'Circumspection' means watchful and discreet caution; prudence."
  },
  {
    "id": "eng-scmp-09",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "hard",
    "question": "Far from being a _____ phenomenon, cloud adoption has proven to be an irreversible paradigm shift in enterprise computing.",
    "options": [
      "transitory",
      "permanent",
      "monumental",
      "vital"
    ],
    "correctAnswer": 0,
    "explanation": "'Far from being [transitory/short-lived]' contrasts with 'irreversible paradigm shift'."
  },
  {
    "id": "eng-scmp-10",
    "category": "english",
    "topic": "Sentence Completion",
    "difficulty": "hard",
    "question": "The researcher's claims were initially dismissed as _____, but subsequent empirical experiments verified their groundbreaking accuracy.",
    "options": [
      "spurious",
      "irrefutable",
      "axiomatic",
      "canonical"
    ],
    "correctAnswer": 0,
    "explanation": "'Spurious' means false or not genuine; contrasts with later verification of accuracy."
  },
  {
    "id": "eng-clz-01",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "easy",
    "question": "Passage fill: 'Good communication is (1)_____ in software engineering because engineers must articulate technical trade-offs clearly.'\n\nChoose the best fit for (1):",
    "options": [
      "indispensable",
      "dispensable",
      "superfluous",
      "optional"
    ],
    "correctAnswer": 0,
    "explanation": "'Indispensable' (essential, absolutely necessary) fits the sentence context."
  },
  {
    "id": "eng-clz-02",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "easy",
    "question": "Passage fill: 'Version control systems allow developers to (2)_____ changes across different branches concurrently.'\n\nChoose the best fit for (2):",
    "options": [
      "synchronize",
      "annihilate",
      "discard",
      "prohibit"
    ],
    "correctAnswer": 0,
    "explanation": "'Synchronize' correctly describes aligning changes across branches."
  },
  {
    "id": "eng-clz-03",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "easy",
    "question": "Passage fill: 'A resilient system must be able to (3)_____ hardware failures gracefully without dropping user requests.'\n\nChoose the best fit for (3):",
    "options": [
      "tolerate",
      "generate",
      "exacerbate",
      "magnify"
    ],
    "correctAnswer": 0,
    "explanation": "Fault-tolerant systems 'tolerate' hardware failures gracefully."
  },
  {
    "id": "eng-clz-04",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "easy",
    "question": "Passage fill: 'Cybersecurity protocols mandate that sensitive data must be (4)_____ both at rest and in transit.'\n\nChoose the best fit for (4):",
    "options": [
      "encrypted",
      "exposed",
      "deleted",
      "broadcast"
    ],
    "correctAnswer": 0,
    "explanation": "Sensitive data must be encrypted to ensure confidentiality."
  },
  {
    "id": "eng-clz-05",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "medium",
    "question": "Passage fill: 'Agile methodologies emphasize (5)_____ development cycles to incorporate user feedback continuously.'\n\nChoose the best fit for (5):",
    "options": [
      "iterative",
      "stagnant",
      "retroactive",
      "dogmatic"
    ],
    "correctAnswer": 0,
    "explanation": "Agile relies on 'iterative' sprints and cycles."
  },
  {
    "id": "eng-clz-06",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "medium",
    "question": "Passage fill: 'To avoid vendor lock-in, modern enterprises (6)_____ multi-cloud or hybrid deployment strategies.'\n\nChoose the best fit for (6):",
    "options": [
      "adopt",
      "abandon",
      "penalize",
      "dismantle"
    ],
    "correctAnswer": 0,
    "explanation": "Enterprises 'adopt' multi-cloud strategies to mitigate risk."
  },
  {
    "id": "eng-clz-07",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "medium",
    "question": "Passage fill: 'Code reviews are not meant to criticize authors, but to (7)_____ overall code maintainability and reliability.'\n\nChoose the best fit for (7):",
    "options": [
      "enhance",
      "diminish",
      "undermine",
      "compromise"
    ],
    "correctAnswer": 0,
    "explanation": "Code reviews aim to 'enhance' software quality."
  },
  {
    "id": "eng-clz-08",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "medium",
    "question": "Passage fill: 'High database latency can severely (8)_____ user experience during peak shopping flash sales.'\n\nChoose the best fit for (8):",
    "options": [
      "degrade",
      "accelerate",
      "augment",
      "bolster"
    ],
    "correctAnswer": 0,
    "explanation": "Latency 'degrades' or impairs user experience."
  },
  {
    "id": "eng-clz-09",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "hard",
    "question": "Passage fill: 'Ethical considerations must be an (9)_____ part of machine learning algorithm deployment.'\n\nChoose the best fit for (9):",
    "options": [
      "integral",
      "arbitrary",
      "extraneous",
      "accidental"
    ],
    "correctAnswer": 0,
    "explanation": "'Integral' means necessary to make a whole complete; essential."
  },
  {
    "id": "eng-clz-10",
    "category": "english",
    "topic": "Cloze Test",
    "difficulty": "hard",
    "question": "Passage fill: 'When designing real-time systems, engineers must ensure that latency anomalies are (10)_____ mitigated.'\n\nChoose the best fit for (10):",
    "options": [
      "proactively",
      "reluctantly",
      "inadvertently",
      "spasmodically"
    ],
    "correctAnswer": 0,
    "explanation": "'Proactively' means taking preventative action in anticipation of future issues."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['english'] = englishData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = englishData;
  }
})();
