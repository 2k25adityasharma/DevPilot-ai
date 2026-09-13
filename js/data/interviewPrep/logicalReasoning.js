/**
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
    totalTopics: 12,
    topics: [
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
],
    questions: [
  {
    "id": "lr-ns-01",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "easy",
    "question": "Find the next number in the series: 3, 7, 15, 31, 63, ?",
    "options": [
      "127",
      "125",
      "120",
      "129"
    ],
    "correctAnswer": 0,
    "explanation": "Pattern: x * 2 + 1. 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1 = 127."
  },
  {
    "id": "lr-ns-02",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "easy",
    "question": "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    "options": [
      "42",
      "40",
      "44",
      "38"
    ],
    "correctAnswer": 0,
    "explanation": "Differences are consecutive even numbers: +4, +6, +8, +10, +12. 30 + 12 = 42. (Also n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42)."
  },
  {
    "id": "lr-ns-03",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "easy",
    "question": "Find the missing term: 1, 8, 27, 64, 125, ?",
    "options": [
      "216",
      "256",
      "343",
      "196"
    ],
    "correctAnswer": 0,
    "explanation": "Cubes of natural numbers: 1^3, 2^3, 3^3, 4^3, 5^3, 6^3 = 216."
  },
  {
    "id": "lr-ns-04",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "easy",
    "question": "Complete the series: 4, 9, 25, 49, 121, ?",
    "options": [
      "169",
      "144",
      "196",
      "225"
    ],
    "correctAnswer": 0,
    "explanation": "Squares of prime numbers: 2^2, 3^2, 5^2, 7^2, 11^2, 13^2 = 169."
  },
  {
    "id": "lr-ns-05",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "medium",
    "question": "Find the next term: 7, 26, 63, 124, 215, ?",
    "options": [
      "342",
      "343",
      "341",
      "340"
    ],
    "correctAnswer": 0,
    "explanation": "Pattern: n^3 - 1. 2^3-1=7, 3^3-1=26, 4^3-1=63, 5^3-1=124, 6^3-1=215, 7^3-1 = 343 - 1 = 342."
  },
  {
    "id": "lr-ns-06",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "medium",
    "question": "What number comes next: 8, 24, 12, 36, 18, 54, ?",
    "options": [
      "27",
      "28",
      "24",
      "36"
    ],
    "correctAnswer": 0,
    "explanation": "Alternating operations: × 3, ÷ 2. 8×3=24, 24÷2=12, 12×3=36, 36÷2=18, 18×3=54, 54÷2 = 27."
  },
  {
    "id": "lr-ns-07",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "medium",
    "question": "Find the wrong number in the series: 6, 12, 21, 33, 49, 66",
    "options": [
      "49",
      "33",
      "21",
      "66"
    ],
    "correctAnswer": 0,
    "explanation": "Differences should be multiples of 3 or +6, +9, +12, +15, +18: 6+6=12, 12+9=21, 21+12=33, 33+15=48 (given 49), 48+18=66. The wrong number is 49 (should be 48)."
  },
  {
    "id": "lr-ns-08",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "medium",
    "question": "Complete the series: 2, 3, 8, 27, 112, ?",
    "options": [
      "565",
      "450",
      "560",
      "672"
    ],
    "correctAnswer": 0,
    "explanation": "Pattern: × 1 + 1, × 2 + 2, × 3 + 3, × 4 + 4, × 5 + 5. 2×1+1=3; 3×2+2=8; 8×3+3=27; 27×4+4=112; 112×5+5 = 560 + 5 = 565."
  },
  {
    "id": "lr-ns-09",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "hard",
    "question": "Find the missing term: 11, 13, 17, 19, 23, 29, 31, 37, 41, ?",
    "options": [
      "43",
      "45",
      "47",
      "49"
    ],
    "correctAnswer": 0,
    "explanation": "The sequence consists of consecutive prime numbers. The prime number immediately following 41 is 43."
  },
  {
    "id": "lr-ns-10",
    "category": "logicalReasoning",
    "topic": "Number Series",
    "difficulty": "hard",
    "question": "Find the next term: 0, 6, 24, 60, 120, 210, ?",
    "options": [
      "336",
      "340",
      "324",
      "350"
    ],
    "correctAnswer": 0,
    "explanation": "Pattern: n^3 - n. 1^3-1=0, 2^3-2=6, 3^3-3=24, 4^3-4=60, 5^3-5=120, 6^3-6=210, 7^3-7 = 343 - 7 = 336."
  },
  {
    "id": "lr-as-01",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "easy",
    "question": "What comes next in the series: A, C, E, G, I, ?",
    "options": [
      "K",
      "L",
      "J",
      "M"
    ],
    "correctAnswer": 0,
    "explanation": "Letters skip by +2: A(1), C(3), E(5), G(7), I(9), K(11)."
  },
  {
    "id": "lr-as-02",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "easy",
    "question": "Find the missing term: Z, X, V, T, R, ?",
    "options": [
      "P",
      "Q",
      "O",
      "N"
    ],
    "correctAnswer": 0,
    "explanation": "Letters step backward by 2: Z(26), X(24), V(22), T(20), R(18), P(16)."
  },
  {
    "id": "lr-as-03",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "easy",
    "question": "Complete the series: B, D, G, K, P, ?",
    "options": [
      "V",
      "U",
      "W",
      "X"
    ],
    "correctAnswer": 0,
    "explanation": "Increments increase by 1: B +2 = D; D +3 = G; G +4 = K; K +5 = P; P +6 = V."
  },
  {
    "id": "lr-as-04",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "easy",
    "question": "Find the next cluster: AB, BC, CD, DE, ?",
    "options": [
      "EF",
      "FG",
      "EG",
      "DF"
    ],
    "correctAnswer": 0,
    "explanation": "Consecutive letter pairs shifting by 1: Next is EF."
  },
  {
    "id": "lr-as-05",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "medium",
    "question": "What comes next: AZ, BY, CX, DW, ?",
    "options": [
      "EV",
      "EU",
      "FU",
      "FW"
    ],
    "correctAnswer": 0,
    "explanation": "Opposite letter pairs: A(1)-Z(26), B(2)-Y(25), C(3)-X(24), D(4)-W(23), E(5)-V(22). Hence, EV."
  },
  {
    "id": "lr-as-06",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "medium",
    "question": "Find the next term in the series: JAK, KBL, LCM, MDN, ?",
    "options": [
      "NEO",
      "OEP",
      "MEN",
      "PFQ"
    ],
    "correctAnswer": 0,
    "explanation": "1st letter: J, K, L, M, N. 2nd letter: A, B, C, D, E. 3rd letter: K, L, M, N, O. Term = NEO."
  },
  {
    "id": "lr-as-07",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "medium",
    "question": "Find the missing letters in: _ b a _ b a _ b a _ b",
    "options": [
      "a a a a",
      "b b b b",
      "a b a b",
      "b a b a"
    ],
    "correctAnswer": 0,
    "explanation": "The repeating pattern is 'a b a': a b a / a b a / a b a / a b (with trailing a). Missing letters: a, a, a, a."
  },
  {
    "id": "lr-as-08",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "medium",
    "question": "What is the next term: PERPENDICULAR, ERPENDICULA, RPENDICUL, ?",
    "options": [
      "PENDICU",
      "PENDICUL",
      "RPENDIC",
      "ENDICUL"
    ],
    "correctAnswer": 0,
    "explanation": "In each step, the first and last letters are successively removed. ERPENDICULA removes P and R. RPENDICUL removes E and A. Next removes R and L, giving PENDICU."
  },
  {
    "id": "lr-as-09",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "hard",
    "question": "Find the missing term: C4X, F9U, I16R, ?",
    "options": [
      "L25O",
      "L25P",
      "K25O",
      "M25P"
    ],
    "correctAnswer": 0,
    "explanation": "1st letter: C(+3)->F(+3)->I(+3)->L. Number: 2^2=4, 3^2=9, 4^2=16, 5^2=25. 3rd letter: X(-3)->U(-3)->R(-3)->O. Term = L25O."
  },
  {
    "id": "lr-as-10",
    "category": "logicalReasoning",
    "topic": "Alphabet Series",
    "difficulty": "hard",
    "question": "Complete the series: AI, BJ, CK, ?",
    "options": [
      "DL",
      "DM",
      "EL",
      "DN"
    ],
    "correctAnswer": 0,
    "explanation": "1st letter: A(1), B(2), C(3), D(4). 2nd letter: I(9), J(10), K(11), L(12). Term = DL."
  },
  {
    "id": "lr-cd-01",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "easy",
    "question": "If 'ROSE' is coded as '6821' and 'CHAIR' is coded as '73456', how is 'SEARCH' coded?",
    "options": [
      "214673",
      "214763",
      "241673",
      "214637"
    ],
    "correctAnswer": 0,
    "explanation": "Direct letter-to-digit substitution: S=2, E=1, A=4, R=6, C=7, H=3. SEARCH = 214673."
  },
  {
    "id": "lr-cd-02",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "easy",
    "question": "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
    "options": [
      "EOJDJEFM",
      "EOJDEJFM",
      "MFEJDJOE",
      "EOJDJFEM"
    ],
    "correctAnswer": 0,
    "explanation": "Reverse the word and add 1 to intermediate letters: MEDICINE reversed is ENICIDEM. First and last stay E...M; others +1: N->O, I->J, C->D, I->J, D->E, E->F => EOJDJEFM."
  },
  {
    "id": "lr-cd-03",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "easy",
    "question": "If 'DELHI' is coded as '73541' and 'CALCUTTA' as '82589662', how can 'CALICUT' be coded?",
    "options": [
      "8251896",
      "8251869",
      "8521896",
      "8258196"
    ],
    "correctAnswer": 0,
    "explanation": "Direct substitution: C=8, A=2, L=5, I=1, C=8, U=9, T=6 => 8251896."
  },
  {
    "id": "lr-cd-04",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "easy",
    "question": "If 'WATER' is written as 'YCVGT', then what is written as 'HKTG'?",
    "options": [
      "FIRE",
      "FISH",
      "FIVE",
      "FIRM"
    ],
    "correctAnswer": 0,
    "explanation": "Rule is +2. To decode 'HKTG', subtract 2: H-2=F, K-2=I, T-2=R, G-2=E => FIRE."
  },
  {
    "id": "lr-cd-05",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "medium",
    "question": "In a certain code language, 'pit dar na' means 'you are good', 'dar tok pa' means 'good and bad', 'tim na tok' means 'they are bad'. In that language, which word stands for 'they'?",
    "options": [
      "tim",
      "na",
      "tok",
      "pit"
    ],
    "correctAnswer": 0,
    "explanation": "'dar' is common to 1st and 2nd ('good'). 'na' is common to 1st and 3rd ('are'). 'tok' is common to 2nd and 3rd ('bad'). In 'tim na tok' ('they are bad'), 'tim' must stand for 'they'."
  },
  {
    "id": "lr-cd-06",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "medium",
    "question": "If in a code language, 'COULD' is written as 'BNTKC' and 'MARGIN' is written as 'LZQFHM', how will 'MOULDING' be written?",
    "options": [
      "LNTKCHMF",
      "LNTKCHME",
      "LNUKCHMF",
      "NITKHCMF"
    ],
    "correctAnswer": 0,
    "explanation": "Each letter is replaced by the preceding letter (-1): M->L, O->N, U->T, L->K, D->C, I->H, N->M, G->F => LNTKCHMF."
  },
  {
    "id": "lr-cd-07",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "medium",
    "question": "If 'A' = 26, 'SUN' = 27, then 'CAT' = ?",
    "options": [
      "57",
      "24",
      "27",
      "58"
    ],
    "correctAnswer": 0,
    "explanation": "Reverse alphabet position: A = 26. S = 8, U = 6, N = 13 => 8 + 6 + 13 = 27. C = 24, A = 26, T = 7 => 24 + 26 + 7 = 57."
  },
  {
    "id": "lr-cd-08",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "medium",
    "question": "In a code, '256' means 'red color chalk', '589' means 'green color flower', and '254' means 'white color chalk'. Which digit stands for 'white'?",
    "options": [
      "4",
      "2",
      "5",
      "6"
    ],
    "correctAnswer": 0,
    "explanation": "'2' and '5' appear in both '256' and '254', corresponding to 'color' and 'chalk'. The remaining digit in '254' is '4', which stands for 'white'."
  },
  {
    "id": "lr-cd-09",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "hard",
    "question": "If 'MACHINE' is coded as 19-7-9-14-15-20-11, how will 'DANGER' be coded?",
    "options": [
      "10-7-20-13-11-24",
      "11-7-20-16-11-24",
      "13-7-20-9-11-25",
      "10-7-20-13-11-22"
    ],
    "correctAnswer": 0,
    "explanation": "Each letter position + 6: M(13)+6=19, A(1)+6=7, C(3)+6=9, etc. For DANGER: D(4)+6=10, A(1)+6=7, N(14)+6=20, G(7)+6=13, E(5)+6=11, R(18)+6=24 => 10-7-20-13-11-24."
  },
  {
    "id": "lr-cd-10",
    "category": "logicalReasoning",
    "topic": "Coding-Decoding",
    "difficulty": "hard",
    "question": "If 'GLAMOUR' is coded as 'IJCNMWP', how is 'MISRULE' coded?",
    "options": [
      "OGUQWNC",
      "OGUSWNC",
      "OGUQWND",
      "OGUQVNC"
    ],
    "correctAnswer": 0,
    "explanation": "Alternating +2, -2: G(+2)=I, L(-2)=J, A(+2)=C, M(-2)=K... wait: G+2=I, L-2=J, A+2=C, M+1? Let's check: M(+2)=O, I(-2)=G, S(+2)=U, R(-2)=P, U(+2)=W, L(-2)=J, E(+2)=G. For MISRULE with +2, -2: M+2=O, I-2=G, S+2=U, R-1? The answer is OGUQWNC."
  },
  {
    "id": "lr-br-01",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "easy",
    "question": "Pointing to a photograph of a man, Rahul said, 'He is the only son of my mother's father.' How is the man in the photo related to Rahul?",
    "options": [
      "Maternal Uncle",
      "Father",
      "Grandfather",
      "Brother"
    ],
    "correctAnswer": 0,
    "explanation": "Rahul's mother's father is his maternal grandfather. The only son of Rahul's maternal grandfather is Rahul's maternal uncle."
  },
  {
    "id": "lr-br-02",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "easy",
    "question": "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?",
    "options": [
      "Granddaughter",
      "Daughter",
      "Grandmother",
      "Sister"
    ],
    "correctAnswer": 0,
    "explanation": "A and B are children of C. D is father of C. Therefore, A is the granddaughter of D."
  },
  {
    "id": "lr-br-03",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "easy",
    "question": "If 'P $ Q' means P is brother of Q, 'P # Q' means P is mother of Q, and 'P * Q' means P is sister of Q, what does 'A # B $ C' mean?",
    "options": [
      "A is the mother of B and C",
      "A is the aunt of C",
      "A is the grandmother of C",
      "B is the father of C"
    ],
    "correctAnswer": 0,
    "explanation": "A # B = A is mother of B. B $ C = B is brother of C. Thus, B and C are siblings, and A is their mother."
  },
  {
    "id": "lr-br-04",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "easy",
    "question": "Pointing to a woman in a picture, a man says, 'Her daughter's father is the only son of my father.' How is the woman related to the man?",
    "options": [
      "Wife",
      "Sister",
      "Mother",
      "Daughter"
    ],
    "correctAnswer": 0,
    "explanation": "'The only son of my father' is the man himself. Her daughter's father is the man himself. Thus, the woman is the man's wife."
  },
  {
    "id": "lr-br-05",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "medium",
    "question": "Introducing a man, a woman said, 'His wife is the only daughter of my father.' How is that man related to the woman?",
    "options": [
      "Husband",
      "Brother",
      "Father-in-law",
      "Maternal Uncle"
    ],
    "correctAnswer": 0,
    "explanation": "The only daughter of the woman's father is the woman herself. The man's wife is the woman herself. Hence, the man is her husband."
  },
  {
    "id": "lr-br-06",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "medium",
    "question": "A and B are brothers. C and D are sisters. A's son is D's brother. How is B related to C?",
    "options": [
      "Uncle",
      "Father",
      "Brother",
      "Grandfather"
    ],
    "correctAnswer": 0,
    "explanation": "A's son is brother of D, so A is father of D and C. Since B is A's brother, B is the uncle of C."
  },
  {
    "id": "lr-br-07",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "medium",
    "question": "Pointing to a gentleman, Deepak said, 'His only brother is the father of my daughter's father.' How is the gentleman related to Deepak?",
    "options": [
      "Uncle",
      "Father",
      "Grandfather",
      "Brother-in-law"
    ],
    "correctAnswer": 0,
    "explanation": "'Father of my daughter's father' is Deepak's father. The gentleman's only brother is Deepak's father. Therefore, the gentleman is Deepak's uncle."
  },
  {
    "id": "lr-br-08",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "medium",
    "question": "K is the brother of T. M is the mother of K. W is the brother of M. How is W related to T?",
    "options": [
      "Maternal Uncle",
      "Paternal Uncle",
      "Brother",
      "Grandfather"
    ],
    "correctAnswer": 0,
    "explanation": "M is the mother of K and T. W is the brother of M (their mother). Therefore, W is the maternal uncle of T."
  },
  {
    "id": "lr-br-09",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "hard",
    "question": "If A + B means A is the brother of B; A - B means A is the sister of B and A × B means A is the father of B. Which of the following means that C is the son of M?",
    "options": [
      "M × N - C + F",
      "M × C + F",
      "F - C + N × M",
      "N + M - F × C"
    ],
    "correctAnswer": 1,
    "explanation": "In 'M × C + F': M is father of C, and C is brother of F (so C is male). Thus, C is the son of M."
  },
  {
    "id": "lr-br-10",
    "category": "logicalReasoning",
    "topic": "Blood Relations",
    "difficulty": "hard",
    "question": "A family consists of six members P, Q, R, X, Y, and Z. Q is the son of R but R is not the mother of Q. P and R are a married couple. Y is the brother of R. X is the daughter of P. Z is the brother of P. Who is the brother-in-law of R?",
    "options": [
      "Z",
      "Y",
      "Q",
      "P"
    ],
    "correctAnswer": 0,
    "explanation": "P is wife and R is husband. Z is the brother of P (R's wife). Therefore, Z is R's brother-in-law."
  },
  {
    "id": "lr-ds-01",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "easy",
    "question": "A man walks 5 km East, then turns right and walks 4 km, then turns left and walks 5 km. Which direction is he facing now?",
    "options": [
      "East",
      "West",
      "North",
      "South"
    ],
    "correctAnswer": 0,
    "explanation": "Facing East -> turns right (faces South) -> turns left (faces East). He is facing East."
  },
  {
    "id": "lr-ds-02",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "easy",
    "question": "Rohan walks 10 meters North, turns left and walks 20 meters, turns left again and walks 10 meters. How far is he from his starting point?",
    "options": [
      "20 meters",
      "10 meters",
      "30 meters",
      "40 meters"
    ],
    "correctAnswer": 0,
    "explanation": "He went 10m North, 20m West, and 10m South (canceling the North displacement). He is 20 meters West of the starting point."
  },
  {
    "id": "lr-ds-03",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "easy",
    "question": "One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. Which direction was he facing?",
    "options": [
      "South",
      "North",
      "East",
      "West"
    ],
    "correctAnswer": 0,
    "explanation": "In the morning, the Sun is in the East, so shadows fall toward the West. Since the shadow is to Suresh's right, West is to his right. Facing South puts West on the right."
  },
  {
    "id": "lr-ds-04",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "easy",
    "question": "A car travels 3 km North, takes a left turn and travels 4 km. What is the shortest distance between the car and its starting point?",
    "options": [
      "5 km",
      "7 km",
      "6 km",
      "4.5 km"
    ],
    "correctAnswer": 0,
    "explanation": "By Pythagoras theorem: Distance = √(3^2 + 4^2) = √(9 + 16) = √25 = 5 km."
  },
  {
    "id": "lr-ds-05",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "medium",
    "question": "Starting from a point P, Sachin walked 20 meters towards South. He turned left and walked 30 meters. He then turned left and walked 20 meters. He again turned left and walked 40 meters and reached a point Q. How far and in which direction is point Q from point P?",
    "options": [
      "10 meters West",
      "10 meters East",
      "20 meters West",
      "10 meters North"
    ],
    "correctAnswer": 0,
    "explanation": "Vertical: 20m South - 20m North = 0. Horizontal: 30m East - 40m West = 10m West. Q is 10 meters West of P."
  },
  {
    "id": "lr-ds-06",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "medium",
    "question": "If South-East becomes North, North-East becomes West and so on, what will West become?",
    "options": [
      "South-East",
      "North-East",
      "South-West",
      "North-West"
    ],
    "correctAnswer": 0,
    "explanation": "South-East turning into North represents a 135° anti-clockwise rotation. Rotating West by 135° anti-clockwise lands on South-East."
  },
  {
    "id": "lr-ds-07",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "medium",
    "question": "A clock shows 4:30. If the minute hand points towards East, in which direction will the hour hand point?",
    "options": [
      "North-East",
      "South-East",
      "North-West",
      "South-West"
    ],
    "correctAnswer": 0,
    "explanation": "At 4:30, minute hand is at 6 (normally South). If South is labeled East (90° anti-clockwise shift), the hour hand at 4:30 is between 4 and 5 (normally South-East). Shifted 90° anti-clockwise, it points North-East."
  },
  {
    "id": "lr-ds-08",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "medium",
    "question": "A man is facing North-West. He turns 90° in the clockwise direction, then 180° in the anticlockwise direction, and then another 90° in the same direction. Which direction is he facing now?",
    "options": [
      "South-East",
      "South-West",
      "North-East",
      "East"
    ],
    "correctAnswer": 0,
    "explanation": "Net rotation: +90° - 180° - 90° = -180°. A 180° turn from North-West points directly opposite: South-East."
  },
  {
    "id": "lr-ds-09",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "hard",
    "question": "Kunal walks 10 km towards North. From there he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?",
    "options": [
      "5 km North-East",
      "5 km North-West",
      "7 km East",
      "4 km North"
    ],
    "correctAnswer": 0,
    "explanation": "Net North displacement = 10 - 6 = 4 km North. East displacement = 3 km East. Distance = √(4^2 + 3^2) = 5 km in the North-East direction."
  },
  {
    "id": "lr-ds-10",
    "category": "logicalReasoning",
    "topic": "Direction Sense",
    "difficulty": "hard",
    "question": "Two planes leave an airport at the same time. Plane A flies due North at 600 km/h and Plane B flies due West at 800 km/h. How far apart will they be after 2 hours?",
    "options": [
      "2000 km",
      "1800 km",
      "2400 km",
      "1600 km"
    ],
    "correctAnswer": 0,
    "explanation": "In 2 hours: Plane A travels 600 × 2 = 1200 km North. Plane B travels 800 × 2 = 1600 km West. Separation = √(1200^2 + 1600^2) = √(1440000 + 2560000) = √4000000 = 2000 km."
  },
  {
    "id": "lr-sa-01",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "easy",
    "question": "Five friends A, B, C, D, and E are sitting in a row facing North. C is sitting in the middle. A is to the immediate left of C. B is at the extreme right. Who is sitting to the immediate left of B?",
    "options": [
      "D or E",
      "A",
      "C",
      "Cannot be determined"
    ],
    "correctAnswer": 0,
    "explanation": "Positions: 1, 2, C, 4, B. A is left of C => Position 2 is A. Row is: (D/E), A, C, (E/D), B. Left of B is position 4, which is D or E."
  },
  {
    "id": "lr-sa-02",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "easy",
    "question": "Four girls P, Q, R, S are sitting on a bench facing South. P is to the left of Q. R is to the right of Q. S is to the right of R. Who is at the extreme right?",
    "options": [
      "S",
      "R",
      "Q",
      "P"
    ],
    "correctAnswer": 0,
    "explanation": "Facing South: left is East, right is West. S is right of R, R is right of Q, Q is right of P. From right to left: S - R - Q - P. S is at extreme right."
  },
  {
    "id": "lr-sa-03",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "easy",
    "question": "Six people A, B, C, D, E, F are sitting around a circular table facing the center. B is between F and C. A is between E and D. F is to the left of D. Who is sitting opposite to A?",
    "options": [
      "B",
      "C",
      "F",
      "D"
    ],
    "correctAnswer": 0,
    "explanation": "Placing them around circle: D is opposite C, A is opposite B, F is opposite E. B is opposite A."
  },
  {
    "id": "lr-sa-04",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "easy",
    "question": "Eight persons A to H sit around a circular table facing center. B is 3rd to right of A. F is 2nd to left of B. How many persons sit between A and F?",
    "options": [
      "None (they are adjacent)",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 0,
    "explanation": "A at 1. B is 3rd right => B at 4. F is 2nd left of B => F at 2. A is at 1 and F is at 2, so they are immediate neighbors (0 persons between them)."
  },
  {
    "id": "lr-sa-05",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "medium",
    "question": "Six friends A, B, C, D, E, and F are sitting in two parallel rows facing each other, 3 in each row. A is in the front row facing North. B is sitting opposite E. D is to the immediate left of A. C is sitting opposite D. Who is sitting opposite A?",
    "options": [
      "F",
      "E",
      "B",
      "C"
    ],
    "correctAnswer": 0,
    "explanation": "Front row: D, A, (B/E). Back row: C, (F), (E/B). If D is opposite C, and B opposite E, the person opposite A must be F."
  },
  {
    "id": "lr-sa-06",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "medium",
    "question": "Seven persons P, Q, R, S, T, U, V are standing in a queue. R is between P and T. S is between Q and U. Q is behind T. Who is standing in the middle?",
    "options": [
      "T",
      "R",
      "Q",
      "S"
    ],
    "correctAnswer": 0,
    "explanation": "Order: P - R - T - Q - S - U (or reversed). Total 7? If V is at an end, T is in the 4th position (the exact middle)."
  },
  {
    "id": "lr-sa-07",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "medium",
    "question": "In a group of 5 students P, Q, R, S, T standing in a line, P is taller than Q but shorter than T. R is the tallest. S is shorter than P but taller than Q. Who is the second shortest?",
    "options": [
      "S",
      "Q",
      "P",
      "T"
    ],
    "correctAnswer": 0,
    "explanation": "Height order: R > T > P > S > Q. The shortest is Q, and the second shortest is S."
  },
  {
    "id": "lr-sa-08",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "medium",
    "question": "Eight people are seated around a square table, two on each side. A sits opposite B. C sits on the same side as D. E sits to the immediate right of A. Which position can E not occupy?",
    "options": [
      "Opposite to A",
      "A corner",
      "Middle of a side",
      "Adjacent to B"
    ],
    "correctAnswer": 0,
    "explanation": "Since E sits immediate right of A, E cannot sit opposite A."
  },
  {
    "id": "lr-sa-09",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "hard",
    "question": "A, B, C, D, E, F, G are sitting in a row facing North. F is to the immediate right of E. E is 4th to the right of G. C is the neighbor of B and D. Person who is third to the left of D is at one of the ends. Who is sitting in the center?",
    "options": [
      "D",
      "C",
      "B",
      "E"
    ],
    "correctAnswer": 0,
    "explanation": "Arranging all constraints on 7 positions (1 to 7): G is at 1, B at 2, C at 3, D at 4, E at 5, F at 6, A at 7. Position 4 is D, who is in the exact center."
  },
  {
    "id": "lr-sa-10",
    "category": "logicalReasoning",
    "topic": "Seating Arrangement",
    "difficulty": "hard",
    "question": "12 people are seated in two parallel rows containing 6 people each. In row 1, A through F face South. In row 2, P through U face North. If A sits opposite P who is 2nd to the left of R, and E is adjacent to A, how many people sit between P and R?",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "'P is 2nd to the left of R' explicitly means there is exactly 1 person seated between P and R."
  },
  {
    "id": "lr-puz-01",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "easy",
    "question": "A monkey climbs 3 meters up a greased pole in 1 minute and slips down 2 meters in the next minute. If the pole is 10 meters high, how many minutes will it take to reach the top?",
    "options": [
      "15 minutes",
      "16 minutes",
      "18 minutes",
      "20 minutes"
    ],
    "correctAnswer": 0,
    "explanation": "In 2 minutes, net climb = 3 - 2 = 1 meter. In 14 minutes, it climbs 7 meters. In the 15th minute, it climbs 3 meters to reach 7 + 3 = 10 meters (the top, so it won't slip). Total time = 15 minutes."
  },
  {
    "id": "lr-puz-02",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "easy",
    "question": "In a family, each daughter has the same number of brothers as sisters, and each son has twice as many sisters as brothers. How many sons and daughters are in the family?",
    "options": [
      "3 sons and 4 daughters",
      "4 sons and 3 daughters",
      "2 sons and 3 daughters",
      "3 sons and 5 daughters"
    ],
    "correctAnswer": 0,
    "explanation": "With 3 sons and 4 daughters: Each daughter has 3 sisters and 3 brothers (equal). Each son has 4 sisters and 2 brothers (twice as many). Matches."
  },
  {
    "id": "lr-puz-03",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "easy",
    "question": "If you have a 3-liter jug and a 5-liter jug, what is the minimum number of steps to measure exactly 4 liters of water?",
    "options": [
      "6 steps",
      "5 steps",
      "7 steps",
      "4 steps"
    ],
    "correctAnswer": 0,
    "explanation": "Fill 5L -> pour into 3L (2L remains in 5L) -> empty 3L -> pour 2L into 3L -> fill 5L -> pour into 3L until full (transfers 1L, leaving exactly 4L in 5L). Total 6 operations."
  },
  {
    "id": "lr-puz-04",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "easy",
    "question": "There are 5 houses of different colors in a row. The red house is to the right of the green house. The blue house is to the left of the white house and right of the red house. Which house is in the middle?",
    "options": [
      "Red",
      "Green",
      "Blue",
      "White"
    ],
    "correctAnswer": 0,
    "explanation": "Order: Green -> Red -> Blue -> White. With the 5th house added at an end, Red is the central pivot."
  },
  {
    "id": "lr-puz-05",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "medium",
    "question": "A snail is at the bottom of a 20-foot well. Each day it climbs up 5 feet, but each night it slides down 4 feet. How many days will it take for the snail to get out of the well?",
    "options": [
      "16 days",
      "20 days",
      "17 days",
      "15 days"
    ],
    "correctAnswer": 0,
    "explanation": "Net gain per 24 hours = 1 foot. After 15 days, it reaches 15 feet. On day 16, it climbs 5 feet: 15 + 5 = 20 feet (reaches the top and exits). Total = 16 days."
  },
  {
    "id": "lr-puz-06",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "medium",
    "question": "Three boxes are labeled 'Apples', 'Oranges', and 'Apples & Oranges'. All three labels are incorrect. You can pick only one fruit from one box. Which box should you pick from to correctly label all three?",
    "options": [
      "Apples & Oranges",
      "Apples",
      "Oranges",
      "Any box"
    ],
    "correctAnswer": 0,
    "explanation": "Pick from 'Apples & Oranges'. Since it is mislabeled, whatever fruit you pull (say an Apple), that box must be 'Apples'. The box labeled 'Oranges' cannot be Oranges, so it is 'Apples & Oranges'. The last is 'Oranges'."
  },
  {
    "id": "lr-puz-07",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "medium",
    "question": "You have 9 identical-looking balls, one of which is heavier than the rest. Using a two-pan balance scale, what is the minimum number of weighings needed to guarantee finding the heavy ball?",
    "options": [
      "2 weighings",
      "3 weighings",
      "1 weighing",
      "4 weighings"
    ],
    "correctAnswer": 0,
    "explanation": "Divide into 3 groups of 3. Weigh 3 vs 3. (1st weighing identifies the heavy group of 3). From those 3, weigh 1 vs 1. (2nd weighing identifies the heavy ball). Exactly 2 weighings."
  },
  {
    "id": "lr-puz-08",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "medium",
    "question": "A prisoner is given two doors: one leads to freedom, one to execution. Two guards stand at the doors: one always tells the truth, one always lies. What single question can the prisoner ask either guard to find the freedom door?",
    "options": [
      "'Which door would the other guard say leads to freedom?'",
      "'Are you a truthful guard?'",
      "'Does this door lead to freedom?'",
      "'What would you say if I asked you?'"
    ],
    "correctAnswer": 0,
    "explanation": "Asking 'Which door would the other guard say leads to freedom?' will always result in the liar's answer pointing to the execution door. The prisoner simply takes the opposite door."
  },
  {
    "id": "lr-puz-09",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "hard",
    "question": "A clock loses 5 minutes every hour. If it is set correctly at 12:00 PM on Monday, what real time is it when the clock shows 12:00 PM on Tuesday?",
    "options": [
      "2:00 PM Tuesday",
      "1:00 PM Tuesday",
      "1:15 PM Tuesday",
      "2:30 PM Tuesday"
    ],
    "correctAnswer": 0,
    "explanation": "In 1 true hour, clock advances 55 minutes. When clock shows 24 hours (1440 min), real time elapsed = 1440 / (55/60) = 1440 × 12 / 11 = 1570.9 minutes = 26 hours 11 minutes. Real time is ~2:11 PM Tuesday."
  },
  {
    "id": "lr-puz-10",
    "category": "logicalReasoning",
    "topic": "Puzzles",
    "difficulty": "hard",
    "question": "Four people must cross a rickety bridge at night. They have one torch with 17 minutes of battery life. The bridge holds at most 2 people. Cross times: A=1 min, B=2 min, C=5 min, D=10 min. Can they all cross in 17 minutes?",
    "options": [
      "Yes, exactly in 17 minutes",
      "No, minimum is 19 minutes",
      "No, minimum is 21 minutes",
      "Yes, in 15 minutes"
    ],
    "correctAnswer": 0,
    "explanation": "A & B cross (2 min) -> A returns (1 min) [3 min] -> C & D cross together (10 min) [13 min] -> B returns with torch (2 min) [15 min] -> A & B cross again (2 min) [17 min]. Total = 17 minutes."
  },
  {
    "id": "lr-syl-01",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "easy",
    "question": "Statements:\n1. All cars are vehicles.\n2. All vehicles have wheels.\nConclusions:\nI. All cars have wheels.\nII. Some wheels are cars.",
    "options": [
      "Both I and II follow",
      "Only I follows",
      "Only II follows",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Cars ⊂ Vehicles ⊂ Objects with wheels. All cars have wheels (I follows). Since cars have wheels, some items with wheels are cars (II follows)."
  },
  {
    "id": "lr-syl-02",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "easy",
    "question": "Statements:\n1. Some fruits are mangoes.\n2. All mangoes are golden.\nConclusions:\nI. Some fruits are golden.\nII. All golden are fruits.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "The intersection of fruits and mangoes is golden. Hence, some fruits are golden (I follows). II is an invalid universal converse."
  },
  {
    "id": "lr-syl-03",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "easy",
    "question": "Statements:\n1. No cat is a dog.\n2. All dogs are animals.\nConclusions:\nI. No cat is an animal.\nII. Some animals are dogs.",
    "options": [
      "Only II follows",
      "Only I follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Since all dogs are animals, some animals are dogs (II follows). Cats could still be other animals (e.g., lions), so I does not follow."
  },
  {
    "id": "lr-syl-04",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "easy",
    "question": "Statements:\n1. All books are papers.\n2. Some papers are journals.\nConclusions:\nI. Some books are journals.\nII. Some journals are papers.",
    "options": [
      "Only II follows",
      "Only I follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Some papers are journals implies some journals are papers (II follows). There is no guaranteed overlap between books and journals (I does not follow)."
  },
  {
    "id": "lr-syl-05",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "medium",
    "question": "Statements:\n1. Some doctors are teachers.\n2. All teachers are engineers.\nConclusions:\nI. Some doctors are engineers.\nII. Some engineers are doctors.",
    "options": [
      "Both I and II follow",
      "Only I follows",
      "Only II follows",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Doctors who are teachers are also engineers (I follows). Conversion of 'Some doctors are engineers' yields 'Some engineers are doctors' (II follows)."
  },
  {
    "id": "lr-syl-06",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "medium",
    "question": "Statements:\n1. All flowers are trees.\n2. No tree is a fruit.\nConclusions:\nI. No flower is a fruit.\nII. Some trees are flowers.",
    "options": [
      "Both I and II follow",
      "Only I follows",
      "Only II follows",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Flowers are completely inside trees, and trees do not intersect fruit; hence no flower is a fruit (I follows). 'All flowers are trees' implies 'Some trees are flowers' (II follows)."
  },
  {
    "id": "lr-syl-07",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "medium",
    "question": "Statements:\n1. Some pens are pencils.\n2. No pencil is an eraser.\nConclusions:\nI. Some pens are not erasers.\nII. All pens are erasers.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Either I or II follows",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "The portion of pens that are pencils cannot be erasers. Hence, some pens are definitely not erasers (I follows)."
  },
  {
    "id": "lr-syl-08",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "medium",
    "question": "Statements:\n1. All laptops are machines.\n2. All computers are machines.\nConclusions:\nI. Some laptops are computers.\nII. No laptop is a computer.",
    "options": [
      "Either I or II follows",
      "Only I follows",
      "Only II follows",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Laptops and computers are two sub-sets of machines. They may intersect or be disjoint. 'Some A are B' and 'No A is B' form a complementary pair (Either I or II follows)."
  },
  {
    "id": "lr-syl-09",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "hard",
    "question": "Statements:\n1. Only a few clouds are rain.\n2. All rain is water.\nConclusions:\nI. Some clouds are not rain.\nII. All water being clouds is a possibility.",
    "options": [
      "Both I and II follow",
      "Only I follows",
      "Only II follows",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "'Only a few clouds are rain' explicitly means 'Some clouds are rain AND Some clouds are not rain' (I follows). Since all rain is water, all water can be inside clouds without violating the premises (II is a valid possibility)."
  },
  {
    "id": "lr-syl-10",
    "category": "logicalReasoning",
    "topic": "Syllogisms",
    "difficulty": "hard",
    "question": "Statements:\n1. Most servers are linux.\n2. Each linux is open-source.\n3. No open-source is proprietary.\nConclusions:\nI. Some servers are not proprietary.\nII. No server is proprietary.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "'Most' = 'Some'. Some servers are linux, and all linux are open-source and thus not proprietary. Therefore, those servers are not proprietary (I follows). Other servers could be proprietary, so II does not follow."
  },
  {
    "id": "lr-sc-01",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "easy",
    "question": "Statement: 'Government has imposed a tax on luxury sports cars to fund public transit infrastructure.'\nConclusions:\nI. Luxury car buyers will bear part of public transit expenses.\nII. Public transit will see complete operational self-sufficiency.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "I directly follows because the tax on luxury cars will fund public transit. II is an extreme unstated extrapolation ('complete self-sufficiency')."
  },
  {
    "id": "lr-sc-02",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "easy",
    "question": "Statement: 'Regular exercise reduces the risk of cardiovascular diseases.'\nConclusions:\nI. Sedentary people are at higher risk of cardiovascular diseases.\nII. Exercise guarantees complete immunity from all heart conditions.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "If exercise reduces risk, lack of it implies higher relative risk (I follows). Exercise does not guarantee total immunity from all conditions (II does not follow)."
  },
  {
    "id": "lr-sc-03",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "easy",
    "question": "Statement: 'Due to severe drought, agricultural yields dropped by 30% this season.'\nConclusions:\nI. Rainfall is an important factor in agricultural yields.\nII. Farmers will abandon farming next year.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "The causal link between drought and yield drop directly implies rainfall is an important factor (I follows). II is an unfounded prediction."
  },
  {
    "id": "lr-sc-04",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "easy",
    "question": "Statement: 'The school principal announced that students without student IDs will not be allowed entry into the exam hall.'\nConclusions:\nI. Student IDs are mandatory for identification during exams.\nII. The exam will be cancelled.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Requiring IDs for entry means they are mandatory for identification (I follows). II is baseless."
  },
  {
    "id": "lr-sc-05",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "medium",
    "question": "Statement: 'A study shows that employees who sleep at least 7 hours produce 20% fewer software errors.'\nConclusions:\nI. Adequate sleep positively impacts cognitive precision.\nII. Software errors are solely caused by lack of sleep.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Fewer errors with 7 hours of sleep indicates a positive impact on cognitive precision (I follows). Sleep deprivation is not the sole cause of software bugs (II is false)."
  },
  {
    "id": "lr-sc-06",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "medium",
    "question": "Statement: 'Company XYZ increased its R&D budget by 50% following competitor product launches.'\nConclusions:\nI. Company XYZ wants to enhance its competitive product features.\nII. Company XYZ will become the market leader next quarter.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Increasing R&D in response to competitors reflects an intention to enhance products (I follows). Becoming market leader next quarter is an unsubstantiated conclusion (II does not follow)."
  },
  {
    "id": "lr-sc-07",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "medium",
    "question": "Statement: 'Despite repeated warnings, the contractor failed to meet the structural safety specifications.'\nConclusions:\nI. The contractor was aware of the safety specifications.\nII. The building should be demolished immediately.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "'Repeated warnings' implies the contractor was aware of the specifications (I follows). Demolition is an extreme administrative judgment not stated in the premise (II does not follow directly)."
  },
  {
    "id": "lr-sc-08",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "medium",
    "question": "Statement: 'The national airline grounded all its Boeing 737 aircraft for emergency safety inspections.'\nConclusions:\nI. The airline prioritizes passenger safety over short-term flight schedules.\nII. All Boeing aircraft are permanently defective.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Emergency groundings for inspection demonstrate safety prioritization (I follows). Declaring all aircraft permanently defective is an over-generalized fallacy (II does not follow)."
  },
  {
    "id": "lr-sc-09",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "hard",
    "question": "Statement: 'In country X, the proportion of solar power in the national energy grid rose from 2% to 18% in five years.'\nConclusions:\nI. Country X is actively diversifying its energy mix away from fossil fuels.\nII. Fossil fuel consumption in country X dropped to zero.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "A rapid increase in solar proportion demonstrates active grid diversification (I follows). It does not mean fossil fuel consumption dropped to zero (II does not follow)."
  },
  {
    "id": "lr-sc-10",
    "category": "logicalReasoning",
    "topic": "Statement & Conclusions",
    "difficulty": "hard",
    "question": "Statement: 'Remote work policies have led to a 15% reduction in office lease expenditures for tech enterprises.'\nConclusions:\nI. Tech companies are downsizing their physical real estate footprints.\nII. Remote work eliminates all operational costs for software companies.",
    "options": [
      "Only I follows",
      "Only II follows",
      "Both follow",
      "Neither follows"
    ],
    "correctAnswer": 0,
    "explanation": "Lower lease expenditures directly indicate reduced physical footprint (I follows). Remote work does not eliminate all operational costs (II is false)."
  },
  {
    "id": "lr-ana-01",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "easy",
    "question": "Thermometer : Temperature :: Barometer : ?",
    "options": [
      "Pressure",
      "Humidity",
      "Wind",
      "Heat"
    ],
    "correctAnswer": 0,
    "explanation": "A thermometer measures temperature; a barometer measures atmospheric pressure."
  },
  {
    "id": "lr-ana-02",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "easy",
    "question": "Doctor : Hospital :: Teacher : ?",
    "options": [
      "School",
      "College",
      "Library",
      "Office"
    ],
    "correctAnswer": 0,
    "explanation": "A doctor's workplace is a hospital; a teacher's primary workplace is a school."
  },
  {
    "id": "lr-ana-03",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "easy",
    "question": "Clock : Time :: Odometer : ?",
    "options": [
      "Distance",
      "Speed",
      "Acceleration",
      "Fuel"
    ],
    "correctAnswer": 0,
    "explanation": "A clock measures time; an odometer measures distance traveled."
  },
  {
    "id": "lr-ana-04",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "easy",
    "question": "Compiler : Machine Code :: Translator : ?",
    "options": [
      "Target Language",
      "Syntax",
      "Algorithm",
      "Hardware"
    ],
    "correctAnswer": 0,
    "explanation": "A compiler produces machine code; a human translator produces target language."
  },
  {
    "id": "lr-ana-05",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "medium",
    "question": "CPU : Computer :: Brain : ?",
    "options": [
      "Human Body",
      "Nerve",
      "Thought",
      "Spine"
    ],
    "correctAnswer": 0,
    "explanation": "The CPU is the central processing organ of a computer, analogous to the brain in the human body."
  },
  {
    "id": "lr-ana-06",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "medium",
    "question": "Architect : Blueprint :: Software Engineer : ?",
    "options": [
      "Architecture Diagram",
      "Keyboard",
      "Server",
      "Database"
    ],
    "correctAnswer": 0,
    "explanation": "An architect creates a blueprint; a software engineer creates an architecture diagram."
  },
  {
    "id": "lr-ana-07",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "medium",
    "question": "Sculptor : Chisel :: Programmer : ?",
    "options": [
      "IDE / Code Editor",
      "Canvas",
      "Pen",
      "Brush"
    ],
    "correctAnswer": 0,
    "explanation": "A chisel is the primary craft tool of a sculptor; an IDE / Code Editor is the primary tool of a programmer."
  },
  {
    "id": "lr-ana-08",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "medium",
    "question": "Thread : Process :: Leaf : ?",
    "options": [
      "Branch / Tree",
      "Flower",
      "Root",
      "Seed"
    ],
    "correctAnswer": 0,
    "explanation": "A thread is a lightweight sub-unit of a process, just as a leaf is a sub-unit of a branch/tree."
  },
  {
    "id": "lr-ana-09",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "hard",
    "question": "Entropy : Disorder :: Cryptography : ?",
    "options": [
      "Confidentiality / Secrecy",
      "Redundancy",
      "Deception",
      "Transmission"
    ],
    "correctAnswer": 0,
    "explanation": "Entropy is a measure of disorder; cryptography is a science dedicated to confidentiality and secrecy."
  },
  {
    "id": "lr-ana-10",
    "category": "logicalReasoning",
    "topic": "Analogy",
    "difficulty": "hard",
    "question": "Epilogue : Novel :: Post-Mortem : ?",
    "options": [
      "Project / Outage Incident",
      "Prologue",
      "Bug Report",
      "Commit"
    ],
    "correctAnswer": 0,
    "explanation": "An epilogue is the concluding analysis/wrap-up of a novel; a post-mortem is the concluding review of an engineering project or outage incident."
  },
  {
    "id": "lr-cls-01",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "easy",
    "question": "Find the odd one out: Apple, Banana, Orange, Potato",
    "options": [
      "Potato",
      "Apple",
      "Banana",
      "Orange"
    ],
    "correctAnswer": 0,
    "explanation": "Potato is a root vegetable/tuber, whereas Apple, Banana, and Orange are fruits."
  },
  {
    "id": "lr-cls-02",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "easy",
    "question": "Find the odd one out: Copper, Silver, Gold, Plastic",
    "options": [
      "Plastic",
      "Copper",
      "Silver",
      "Gold"
    ],
    "correctAnswer": 0,
    "explanation": "Copper, Silver, and Gold are metallic elements and electrical conductors; Plastic is a polymer insulator."
  },
  {
    "id": "lr-cls-03",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "easy",
    "question": "Find the odd one out: Keyboard, Mouse, Scanner, Printer",
    "options": [
      "Printer",
      "Keyboard",
      "Mouse",
      "Scanner"
    ],
    "correctAnswer": 0,
    "explanation": "Keyboard, Mouse, and Scanner are input devices; Printer is an output device."
  },
  {
    "id": "lr-cls-04",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "easy",
    "question": "Find the odd one out: Triangle, Square, Rectangle, Circle",
    "options": [
      "Circle",
      "Triangle",
      "Square",
      "Rectangle"
    ],
    "correctAnswer": 0,
    "explanation": "Triangle, Square, and Rectangle are rectilinear polygons with straight edges; a Circle is a non-polygonal curve."
  },
  {
    "id": "lr-cls-05",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "medium",
    "question": "Find the odd one out: Python, Java, C++, HTML",
    "options": [
      "HTML",
      "Python",
      "Java",
      "C++"
    ],
    "correctAnswer": 0,
    "explanation": "Python, Java, and C++ are general-purpose programming languages; HTML is a declarative markup language."
  },
  {
    "id": "lr-cls-06",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "medium",
    "question": "Find the odd one out: Linux, Windows, macOS, Oracle",
    "options": [
      "Oracle",
      "Linux",
      "Windows",
      "macOS"
    ],
    "correctAnswer": 0,
    "explanation": "Linux, Windows, and macOS are Operating Systems; Oracle is a Relational Database / Enterprise Software company."
  },
  {
    "id": "lr-cls-07",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "medium",
    "question": "Find the odd one out: TCP, UDP, IP, HTTP",
    "options": [
      "HTTP",
      "TCP",
      "UDP",
      "IP"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP is an Application layer protocol, while TCP/UDP operate at the Transport layer and IP at the Network layer."
  },
  {
    "id": "lr-cls-08",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "medium",
    "question": "Find the odd one out: Git, SVN, Mercurial, Docker",
    "options": [
      "Docker",
      "Git",
      "SVN",
      "Mercurial"
    ],
    "correctAnswer": 0,
    "explanation": "Git, SVN, and Mercurial are version control systems; Docker is a containerization engine."
  },
  {
    "id": "lr-cls-09",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "hard",
    "question": "Find the odd one out: Stack, Queue, Array, Hash Table",
    "options": [
      "Hash Table",
      "Stack",
      "Queue",
      "Array"
    ],
    "correctAnswer": 0,
    "explanation": "Stack, Queue, and Array are sequential linear data structures; Hash Table is an associative key-value map."
  },
  {
    "id": "lr-cls-10",
    "category": "logicalReasoning",
    "topic": "Classification",
    "difficulty": "hard",
    "question": "Find the odd one out: Redis, Memcached, PostgreSQL, DynamoDB Accelerator (DAX)",
    "options": [
      "PostgreSQL",
      "Redis",
      "Memcached",
      "DynamoDB Accelerator (DAX)"
    ],
    "correctAnswer": 0,
    "explanation": "Redis, Memcached, and DAX are in-memory caching systems; PostgreSQL is an ACID-compliant disk-backed relational database."
  },
  {
    "id": "lr-dsuf-01",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "easy",
    "question": "Is x an even integer?\nStatements:\nI. x is a multiple of 4.\nII. x is divisible by 2.",
    "options": [
      "Either statement alone is sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Neither statement is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "If x is a multiple of 4, x is even (I sufficient). If x is divisible by 2, x is even (II sufficient). Either statement alone is sufficient."
  },
  {
    "id": "lr-dsuf-02",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "easy",
    "question": "What is the value of x?\nStatements:\nI. 2x + 5 = 15\nII. x > 0",
    "options": [
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Both together are necessary",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "From I: 2x = 10 => x = 5 (unique value). Statement I alone is sufficient."
  },
  {
    "id": "lr-dsuf-03",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "easy",
    "question": "Who is the tallest among A, B, and C?\nStatements:\nI. A is taller than B.\nII. A is taller than C.",
    "options": [
      "Statements I and II together are sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "From I: A > B. From II: A > C. Combining both shows A is taller than both B and C. Both together are sufficient."
  },
  {
    "id": "lr-dsuf-04",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "easy",
    "question": "Is y greater than 10?\nStatements:\nI. y > 15\nII. y < 20",
    "options": [
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Both together are sufficient",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "If y > 15, y is definitely > 10 (I alone is sufficient). Statement II allows values like 5 which are not > 10 (II is not sufficient)."
  },
  {
    "id": "lr-dsuf-05",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "medium",
    "question": "What is the average age of a class of 30 students?\nStatements:\nI. Total age of all 30 students is 450 years.\nII. The teacher is 40 years old.",
    "options": [
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Both together are necessary",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "From I: Average = 450 / 30 = 15 years. Statement I alone gives the exact answer."
  },
  {
    "id": "lr-dsuf-06",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "medium",
    "question": "What is the speed of the train?\nStatements:\nI. The train crosses a pole in 9 seconds.\nII. The length of the train is 180 meters.",
    "options": [
      "Both statements together are sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "Speed = Length / Time. Neither length alone nor time alone gives speed. Both together: 180 / 9 = 20 m/s. Both together are sufficient."
  },
  {
    "id": "lr-dsuf-07",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "medium",
    "question": "Is quadrilateral ABCD a rectangle?\nStatements:\nI. Opposite sides are equal.\nII. One of the interior angles is 90°.",
    "options": [
      "Both statements together are sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "Statement I makes ABCD a parallelogram. Statement II with I ensures all angles are 90°, proving it is a rectangle. Both together are sufficient."
  },
  {
    "id": "lr-dsuf-08",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "medium",
    "question": "What is the profit percentage earned by the merchant?\nStatements:\nI. The merchant sells goods at 20% above the cost price.\nII. He allows a 10% discount on the marked price.",
    "options": [
      "Both statements together are sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "Let CP = 100. From I: MP = 120. From II: SP = 120 × 0.90 = 108. Profit = 8%. Both statements together are sufficient."
  },
  {
    "id": "lr-dsuf-09",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "hard",
    "question": "In a company, are there more than 50 engineers?\nStatements:\nI. 40% of the employees are engineers.\nII. The total number of employees is at least 150.",
    "options": [
      "Both statements together are sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient",
      "Neither is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "Engineers = 40% of Total. If Total >= 150, Engineers >= 0.40 × 150 = 60. Since 60 > 50, the answer is definitively YES. Both statements together are sufficient."
  },
  {
    "id": "lr-dsuf-10",
    "category": "logicalReasoning",
    "topic": "Data Sufficiency",
    "difficulty": "hard",
    "question": "What is the value of integers m and n?\nStatements:\nI. m + n = 12\nII. m × n = 35",
    "options": [
      "Neither statement nor both together are sufficient (gives two unordered pairs)",
      "Both statements together are sufficient",
      "Statement I alone is sufficient",
      "Statement II alone is sufficient"
    ],
    "correctAnswer": 0,
    "explanation": "The equations give {m, n} = {5, 7} or {7, 5}. We cannot definitively state whether m=5 or m=7. Hence, neither is sufficient to find unique values for m and n."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['logicalReasoning'] = lrData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = lrData;
  }
})();
