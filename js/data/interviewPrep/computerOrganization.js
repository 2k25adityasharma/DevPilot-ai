// js/data/interviewPrep/computerOrganization.js
// Complete Question Bank for Computer Organization & Architecture (12 topics * 10 = 120 MCQs)

window.interviewPrepCO = {
  id: 'computer_organization',
  title: 'Computer Organization & Architecture',
  icon: 'memory',
  description: 'Master computer architecture, logic design, pipelining, cache memory, virtual memory, interrupts, and RAID.',
  totalQuestions: 120,
  topics: [
    'Number Systems & Binary Arithmetic',
    'Logic Gates & Boolean Algebra',
    'Combinational Circuits',
    'Sequential Circuits',
    'Computer Architecture Types',
    'Instruction Formats & Addressing Modes',
    'CPU Datapath, Control Unit & ALU',
    'Pipelining & Pipeline Hazards',
    'Memory Hierarchy & Cache Memory',
    'Virtual Memory, TLB & Page Tables',
    'I/O Organization, Interrupts & DMA',
    'Secondary Storage & RAID Levels'
  ],
  questions: [
  {
    "id": "co_ns_1",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Easy",
    "question": "What is the 2's complement representation of -9 in an 8-bit register?",
    "options": [
      "11110110",
      "11110111",
      "10001001",
      "11111001"
    ],
    "correctAnswer": 1,
    "explanation": "9 in 8-bit binary is 00001001. 1's complement is 11110110. Adding 1 gives the 2's complement: 11110111."
  },
  {
    "id": "co_ns_2",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Easy",
    "question": "What is the range of signed integers that can be represented using n-bit 2's complement representation?",
    "options": [
      "-2^(n-1) to 2^(n-1)",
      "-2^(n-1) to 2^(n-1) - 1",
      "-2^n to 2^n - 1",
      "-(2^(n-1) - 1) to 2^(n-1) - 1"
    ],
    "correctAnswer": 1,
    "explanation": "In n-bit 2's complement, negative numbers start at -2^(n-1) and positive numbers go up to 2^(n-1) - 1, providing an extra negative number compared to 1's complement without dual representation of zero."
  },
  {
    "id": "co_ns_3",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Easy",
    "question": "What is the hexadecimal equivalent of binary 110110101111?",
    "options": [
      "DAF",
      "DBF",
      "D9F",
      "CAF"
    ],
    "correctAnswer": 0,
    "explanation": "Group into 4-bit nibbles from right: 1101 (13 = D), 1010 (10 = A), 1111 (15 = F). Thus, 0xDAF."
  },
  {
    "id": "co_ns_4",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Easy",
    "question": "Which condition indicates an overflow during the addition of two signed 2's complement binary numbers?",
    "options": [
      "Carry into the sign bit equals carry out of the sign bit",
      "Carry into the sign bit does not equal carry out of the sign bit",
      "The result is negative when adding a positive and a negative number",
      "A carry out of 1 occurs from the MSB"
    ],
    "correctAnswer": 1,
    "explanation": "Signed overflow occurs when the carry into the Most Significant Bit (sign bit) does not match the carry out of the sign bit (i.e., C_in XOR C_out = 1)."
  },
  {
    "id": "co_ns_5",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Medium",
    "question": "In the IEEE 754 single-precision (32-bit) floating-point standard, how are the 32 bits partitioned?",
    "options": [
      "1 sign bit, 7 exponent bits, 24 mantissa bits",
      "1 sign bit, 8 exponent bits, 23 mantissa (fraction) bits",
      "1 sign bit, 11 exponent bits, 20 mantissa bits",
      "2 sign bits, 8 exponent bits, 22 mantissa bits"
    ],
    "correctAnswer": 1,
    "explanation": "IEEE 754 single-precision allocates: 1 bit for sign, 8 bits for biased exponent (bias = 127), and 23 bits for the normalized mantissa/significand (with an implicit leading 1)."
  },
  {
    "id": "co_ns_6",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Medium",
    "question": "What is the excess/bias value used in IEEE 754 single-precision (8-bit exponent) floating point?",
    "options": [
      "128",
      "127",
      "255",
      "63"
    ],
    "correctAnswer": 1,
    "explanation": "For single-precision IEEE 754 with an 8-bit exponent (k = 8), the bias is 2^(k-1) - 1 = 2^7 - 1 = 127."
  },
  {
    "id": "co_ns_7",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Medium",
    "question": "Booth's Multiplication Algorithm is primarily used to multiply signed binary numbers because:",
    "options": [
      "It eliminates additions completely",
      "It skips strings of consecutive 1s and 0s, speeding up signed multiplication",
      "It only works with positive unsigned numbers",
      "It requires half the number of hardware flip-flops"
    ],
    "correctAnswer": 1,
    "explanation": "Booth's algorithm treats contiguous blocks of 1s (like 01110) as 2^k - 2^m (e.g. +16 - 2), replacing multiple shift-adds with a single subtraction and single addition, optimizing signed multiplication."
  },
  {
    "id": "co_ns_8",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Medium",
    "question": "What is the representation of +0 and -0 in IEEE 754 single precision?",
    "options": [
      "Both have all 32 bits set to zero",
      "Both have exponent and fraction as 0, differentiated only by sign bit (0 for +0, 1 for -0)",
      "Negative zero does not exist in IEEE 754",
      "Exponent is 255 and fraction is 0"
    ],
    "correctAnswer": 1,
    "explanation": "IEEE 754 distinguishes +0 (sign = 0, exponent = 0, fraction = 0) and -0 (sign = 1, exponent = 0, fraction = 0), although numerical comparison treats them as equal."
  },
  {
    "id": "co_ns_9",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Hard",
    "question": "What happens when calculating the difference between two normalized IEEE 754 floating point numbers that are very close to each other?",
    "options": [
      "Gradual underflow occurs",
      "Catastrophic cancellation occurs, causing severe loss of significant digits",
      "Overflow occurs, yielding Infinity",
      "Division by zero trap is fired"
    ],
    "correctAnswer": 1,
    "explanation": "Catastrophic cancellation is a phenomenon in floating-point arithmetic where subtracting two nearly equal numbers cancels out the most significant digits, leaving only rounding noise in the remaining low-order bits."
  },
  {
    "id": "co_ns_10",
    "topic": "Number Systems & Binary Arithmetic",
    "difficulty": "Hard",
    "question": "In an arithmetic logic unit, what is the maximum number of bits required to store the exact product of two n-bit signed integers?",
    "options": [
      "n bits",
      "2n - 1 bits",
      "2n bits",
      "n^2 bits"
    ],
    "correctAnswer": 2,
    "explanation": "Multiplying two n-bit integers can produce a result up to (-2^(n-1)) * (-2^(n-1)) = 2^(2n-2), which requires exactly 2n bits in the product register (e.g., multiplying two 32-bit registers requires 64 bits)."
  },
  {
    "id": "co_lg_1",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Easy",
    "question": "Which of the following gates are known as \"Universal Gates\"?",
    "options": [
      "AND and OR",
      "NAND and NOR",
      "XOR and XNOR",
      "NOT and AND"
    ],
    "correctAnswer": 1,
    "explanation": "NAND and NOR gates are universal gates because any combinational logic function (AND, OR, NOT, XOR) can be constructed using only NAND or only NOR gates."
  },
  {
    "id": "co_lg_2",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Easy",
    "question": "According to De Morgan's theorem, the expression (A . B)' is equivalent to:",
    "options": [
      "A' . B'",
      "A' + B'",
      "(A + B)'",
      "A + B"
    ],
    "correctAnswer": 1,
    "explanation": "De Morgan's First Law states: (A . B)' = A' + B'. The complement of a product is equal to the sum of the complements."
  },
  {
    "id": "co_lg_3",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Easy",
    "question": "What is the output of an XOR gate when both inputs are identical (both 0 or both 1)?",
    "options": [
      "0",
      "1",
      "High Impedance (Z)",
      "Indeterminate"
    ],
    "correctAnswer": 0,
    "explanation": "An XOR (Exclusive OR) gate outputs 1 if and only if the inputs are different. When both inputs are identical (0 XOR 0 or 1 XOR 1), the output is 0."
  },
  {
    "id": "co_lg_4",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Easy",
    "question": "What is the Boolean simplification of A + A'B?",
    "options": [
      "A",
      "B",
      "A + B",
      "A . B"
    ],
    "correctAnswer": 2,
    "explanation": "Using distributive law: A + A'B = (A + A')(A + B) = 1 . (A + B) = A + B."
  },
  {
    "id": "co_lg_5",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Medium",
    "question": "A Karnaugh Map (K-Map) groups adjacent minterms using Gray code ordering primarily because:",
    "options": [
      "It allows decimal numbers to be directly grouped",
      "Adjacent cells differ by exactly one bit, enabling simplification using X + X' = 1",
      "It minimizes the total propagation delay of the circuit",
      "It avoids dynamic hazards in flip-flops"
    ],
    "correctAnswer": 1,
    "explanation": "Gray code guarantees that adjacent horizontal and vertical cells in a K-map differ by only one binary variable. When two adjacent cells are grouped, that single changing variable is eliminated."
  },
  {
    "id": "co_lg_6",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Medium",
    "question": "How many 2-input NAND gates are required to implement a 2-input XOR gate?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correctAnswer": 1,
    "explanation": "A 2-input XOR gate (A'B + AB') can be realized using exactly 4 NAND gates: Gate 1 computes (AB)'. Gates 2 and 3 combine A with (AB)' and B with (AB)'. Gate 4 combines the outputs of Gates 2 and 3."
  },
  {
    "id": "co_lg_7",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Medium",
    "question": "What is a \"Static 1-hazard\" in combinational circuits?",
    "options": [
      "An output is supposed to remain 0 but momentarily pulses to 1",
      "An output is supposed to remain 1 but momentarily glitches to 0 due to unequal path delays",
      "A clock signal has duty cycle distortion",
      "A register loses its state due to leakage"
    ],
    "correctAnswer": 1,
    "explanation": "A static 1-hazard occurs when an output is expected to stay at logic 1 during an input transition, but due to propagation delay differences across parallel paths, the output temporarily glitches to 0."
  },
  {
    "id": "co_lg_8",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Medium",
    "question": "What is the dual of the Boolean expression A + B . C = (A + B) . (A + C)?",
    "options": [
      "A . (B + C) = (A . B) + (A . C)",
      "A' + B' . C' = (A' + B') . (A' + C')",
      "A . B + C = (A + B) . C",
      "A + (B . C)' = A' . B . C"
    ],
    "correctAnswer": 0,
    "explanation": "To find the dual of any Boolean expression, replace all AND (.) operators with OR (+), replace all OR (+) with AND (.), and swap 0 and 1, leaving variable literals unchanged."
  },
  {
    "id": "co_lg_9",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Hard",
    "question": "In Quine-McCluskey tabular method for Boolean minimization, an \"Essential Prime Implicant\" is defined as:",
    "options": [
      "A prime implicant that has the lowest hardware cost",
      "A prime implicant that covers at least one minterm not covered by any other prime implicant",
      "A minterm that can never be simplified",
      "A prime implicant containing don't-care conditions only"
    ],
    "correctAnswer": 1,
    "explanation": "An Essential Prime Implicant (EPI) covers at least one minterm that is uniquely covered by this implicant alone. All EPIs MUST be included in the final minimal sum-of-products expression."
  },
  {
    "id": "co_lg_10",
    "topic": "Logic Gates & Boolean Algebra",
    "difficulty": "Hard",
    "question": "How many distinct Boolean functions of n variables can be formed?",
    "options": [
      "2^n",
      "2^(2^n)",
      "n^2",
      "2^(n-1)"
    ],
    "correctAnswer": 1,
    "explanation": "For n Boolean variables, there are 2^n possible input combinations in the truth table. Each combination can produce either 0 or 1. Hence, total possible functions = 2^(2^n). For n=2, there are 2^(2^2) = 16 functions."
  },
  {
    "id": "co_cc_1",
    "topic": "Combinational Circuits",
    "difficulty": "Easy",
    "question": "What are the Sum (S) and Carry (C) expressions for a Half Adder with inputs A and B?",
    "options": [
      "S = A . B, C = A + B",
      "S = A XOR B, C = A . B",
      "S = A + B, C = A XOR B",
      "S = A XNOR B, C = A . B"
    ],
    "correctAnswer": 1,
    "explanation": "A half adder adds two 1-bit inputs: Sum S = A XOR B, Carry C = A . B."
  },
  {
    "id": "co_cc_2",
    "topic": "Combinational Circuits",
    "difficulty": "Easy",
    "question": "How many select lines are required for a 16-to-1 Multiplexer (MUX)?",
    "options": [
      "2",
      "4",
      "8",
      "16"
    ],
    "correctAnswer": 1,
    "explanation": "For an N-to-1 multiplexer, 2^m = N, where m is the number of select lines. Since 2^4 = 16, exactly 4 select lines are required."
  },
  {
    "id": "co_cc_3",
    "topic": "Combinational Circuits",
    "difficulty": "Easy",
    "question": "A 3-to-8 Decoder with active-high outputs will activate how many output lines for any valid 3-bit input code?",
    "options": [
      "All 8 lines",
      "Exactly 1 line",
      "3 lines",
      "4 lines"
    ],
    "correctAnswer": 1,
    "explanation": "A binary decoder activates exactly one unique output line corresponding to the decimal value of the binary input code."
  },
  {
    "id": "co_cc_4",
    "topic": "Combinational Circuits",
    "difficulty": "Easy",
    "question": "What is the primary function of a Priority Encoder?",
    "options": [
      "It divides clock frequency",
      "If multiple inputs are asserted simultaneously, it generates the code for the input with the highest priority",
      "It acts as an analog-to-digital converter",
      "It stores 8 bits of data"
    ],
    "correctAnswer": 1,
    "explanation": "Unlike standard encoders where only one input is allowed active, a priority encoder accommodates multiple simultaneous active inputs and produces the output code corresponding to the highest-priority input."
  },
  {
    "id": "co_cc_5",
    "topic": "Combinational Circuits",
    "difficulty": "Medium",
    "question": "How many 4-to-1 multiplexers are required to construct a 16-to-1 multiplexer without additional logic gates?",
    "options": [
      "4",
      "5",
      "8",
      "16"
    ],
    "correctAnswer": 1,
    "explanation": "To build a 16:1 MUX using 4:1 MUXes: First stage uses 4 MUXes (taking 4 inputs each = 16 inputs). Second stage uses 1 MUX to select among the outputs of the 4 first-stage MUXes. Total = 4 + 1 = 5."
  },
  {
    "id": "co_cc_6",
    "topic": "Combinational Circuits",
    "difficulty": "Medium",
    "question": "What is the key advantage of a Carry Lookahead Adder (CLA) over a Ripple Carry Adder (RCA)?",
    "options": [
      "Lower gate count",
      "Propagation delay is independent of the number of bits n because carry signals are generated in parallel",
      "Uses less power",
      "Operates asynchronously without clock lines"
    ],
    "correctAnswer": 1,
    "explanation": "In RCA, carry bits ripple sequentially through n stages yielding O(n) delay. In CLA, Carry Generate (G = A.B) and Carry Propagate (P = A XOR B) logic calculates all carries in parallel, reducing delay to O(1) or O(log n)."
  },
  {
    "id": "co_cc_7",
    "topic": "Combinational Circuits",
    "difficulty": "Medium",
    "question": "A Full Adder can be constructed using:",
    "options": [
      "Two Half Adders and one OR gate",
      "Two Half Adders and one AND gate",
      "Two Half Subtractors and one NOT gate",
      "One Half Adder and one OR gate"
    ],
    "correctAnswer": 0,
    "explanation": "A Full Adder consists of: First Half Adder computing (A XOR B) and (A.B); Second Half Adder adding Cin to (A XOR B); and an OR gate combining the two partial carry terms."
  },
  {
    "id": "co_cc_8",
    "topic": "Combinational Circuits",
    "difficulty": "Medium",
    "question": "What circuit is commonly used to convert a 4-bit binary input to drive a 7-segment LED display?",
    "options": [
      "4-to-16 Demultiplexer",
      "BCD-to-7-Segment Decoder",
      "4-bit Barrel Shifter",
      "Parity Checker"
    ],
    "correctAnswer": 1,
    "explanation": "A BCD-to-7-segment decoder takes a 4-bit BCD digit (0-9) and activates the corresponding segment lines (a through g) to render the numeric character on the display."
  },
  {
    "id": "co_cc_9",
    "topic": "Combinational Circuits",
    "difficulty": "Hard",
    "question": "How many 2-to-4 decoders with enable inputs are required to construct a 4-to-16 decoder?",
    "options": [
      "4 decoders",
      "5 decoders",
      "8 decoders",
      "16 decoders"
    ],
    "correctAnswer": 1,
    "explanation": "To build a 4:16 decoder: 4 decoders form the second stage (generating 16 output lines), and 1 decoder in the first stage decodes the upper 2 bits to drive the active-high Enable inputs of the 4 second-stage decoders. Total = 5."
  },
  {
    "id": "co_cc_10",
    "topic": "Combinational Circuits",
    "difficulty": "Hard",
    "question": "What is the propagation delay of an 8-bit Carry Lookahead Adder implemented with 4-bit CLA blocks compared to a simple ripple carry adder?",
    "options": [
      "CLA delay grows linearly with bit width O(n), same as RCA",
      "CLA calculates carry terms in parallel stages, reducing delay from O(n) to O(log n)",
      "CLA has higher latency than RCA for large word lengths",
      "CLA eliminates all propagation delay completely"
    ],
    "correctAnswer": 1,
    "explanation": "By computing generate and propagate terms across hierarchical 4-bit lookahead generator blocks (block carry lookahead), carry computation is performed in logarithmic time O(log n) rather than linear time O(n)."
  },
  {
    "id": "co_sc_1",
    "topic": "Sequential Circuits",
    "difficulty": "Easy",
    "question": "What is the fundamental difference between combinational and sequential logic circuits?",
    "options": [
      "Combinational circuits use clock signals, sequential do not",
      "Sequential circuits contain memory elements and their outputs depend on past as well as current inputs",
      "Combinational circuits contain feedback loops",
      "Sequential circuits do not use logic gates"
    ],
    "correctAnswer": 1,
    "explanation": "Combinational circuit outputs depend solely on present inputs. Sequential circuits possess memory elements (latches/flip-flops) and feedback, so outputs depend on current inputs and past states."
  },
  {
    "id": "co_sc_2",
    "topic": "Sequential Circuits",
    "difficulty": "Easy",
    "question": "What happens in an SR Flip-Flop when both S (Set) and R (Reset) inputs are set to 1 simultaneously?",
    "options": [
      "Output toggles",
      "Output remains in previous state",
      "Invalid/Indeterminate state occurs",
      "Output becomes high-impedance"
    ],
    "correctAnswer": 2,
    "explanation": "In an active-high SR flip-flop, setting S=1 and R=1 attempts to drive both Q and Q' to 0 simultaneously, violating the complementary property and causing an indeterminate/forbidden condition."
  },
  {
    "id": "co_sc_3",
    "topic": "Sequential Circuits",
    "difficulty": "Easy",
    "question": "Which flip-flop resolves the indeterminate condition of the SR flip-flop by toggling when both inputs are 1?",
    "options": [
      "D Flip-Flop",
      "T Flip-Flop",
      "JK Flip-Flop",
      "Master-Slave SR Flip-Flop"
    ],
    "correctAnswer": 2,
    "explanation": "The JK flip-flop eliminates the invalid state: when J=1 and K=1, the output toggles (Q_next = Q') on each clock pulse."
  },
  {
    "id": "co_sc_4",
    "topic": "Sequential Circuits",
    "difficulty": "Easy",
    "question": "A D (Data / Delay) Flip-Flop has its Next State Q(t+1) equal to:",
    "options": [
      "Q(t)'",
      "D",
      "D XOR Q(t)",
      "0 always"
    ],
    "correctAnswer": 1,
    "explanation": "The D flip-flop transfers the logic level present at its D input directly to the Q output upon the triggering clock edge (Q(t+1) = D)."
  },
  {
    "id": "co_sc_5",
    "topic": "Sequential Circuits",
    "difficulty": "Medium",
    "question": "What is the \"Race Around Condition\" in a level-triggered JK flip-flop and when does it occur?",
    "options": [
      "When clock frequency is too low",
      "When J=1, K=1, and clock pulse width (tp) is greater than flip-flop propagation delay (tpd), causing repeated toggling during a single pulse",
      "When input setup time is violated",
      "When both inputs are 0"
    ],
    "correctAnswer": 1,
    "explanation": "Race-around occurs in level-triggered JK flip-flops when J=K=1 and the clock stays high longer than the flip-flop propagation delay (tp > tpd). The output continuously oscillates between 0 and 1 before the clock goes low."
  },
  {
    "id": "co_sc_6",
    "topic": "Sequential Circuits",
    "difficulty": "Medium",
    "question": "How does a Master-Slave JK Flip-Flop eliminate the race-around condition?",
    "options": [
      "By increasing internal resistor values",
      "By isolating input and output using two stages triggered on opposite clock edges (Master active on clock high, Slave active on clock edge/low)",
      "By disallowing J=1 and K=1 inputs",
      "By using asynchronous reset"
    ],
    "correctAnswer": 1,
    "explanation": "In a Master-Slave flip-flop, the Master stage captures input when Clock is high while the Slave is disabled. When Clock goes low, Master is isolated and the Slave transfers the state to output. Since output cannot loop back to master during slave update, racing is eliminated."
  },
  {
    "id": "co_sc_7",
    "topic": "Sequential Circuits",
    "difficulty": "Medium",
    "question": "What is \"Setup Time\" (t_setup) of a flip-flop?",
    "options": [
      "The time clock must remain high",
      "The minimum time the data input must remain stable before the arrival of the active clock edge",
      "The minimum time the data input must remain stable after the clock edge",
      "The time taken by flip-flop output to change"
    ],
    "correctAnswer": 1,
    "explanation": "Setup time (t_setup) is the mandatory duration for which the data signal must remain constant and stable prior to the triggering clock edge to ensure reliable latching."
  },
  {
    "id": "co_sc_8",
    "topic": "Sequential Circuits",
    "difficulty": "Medium",
    "question": "How many flip-flops are required to build a Mod-12 counter?",
    "options": [
      "3",
      "4",
      "6",
      "12"
    ],
    "correctAnswer": 1,
    "explanation": "A counter with modulus M requires n flip-flops such that 2^(n-1) < M <= 2^n. For Mod-12: 2^3 = 8 < 12 <= 2^4 = 16. Hence, 4 flip-flops are required."
  },
  {
    "id": "co_sc_9",
    "topic": "Sequential Circuits",
    "difficulty": "Hard",
    "question": "What is \"Metastability\" in digital sequential circuits?",
    "options": [
      "A state where clock frequency exceeds 5 GHz",
      "An indeterminate intermediate voltage level between 0 and 1 caused by setup or hold time violations, taking unpredictable time to resolve",
      "Permanent physical gate breakdown caused by ESD",
      "A condition where counter skips states"
    ],
    "correctAnswer": 1,
    "explanation": "Metastability occurs when asynchronous inputs violate setup or hold times. The flip-flop output enters an unstable equilibrium between logic 0 and 1, taking an unbounded and unpredictable duration to settle to a valid binary state."
  },
  {
    "id": "co_sc_10",
    "topic": "Sequential Circuits",
    "difficulty": "Hard",
    "question": "In a Mealy state machine compared to a Moore state machine:",
    "options": [
      "Mealy outputs depend only on the current state",
      "Mealy outputs depend on both the current state and the current inputs, potentially requiring fewer states",
      "Moore outputs respond faster to input changes than Mealy",
      "Mealy machines cannot be implemented with D flip-flops"
    ],
    "correctAnswer": 1,
    "explanation": "In a Mealy machine, outputs are a function of (current state, current inputs), meaning output changes immediately with input changes, often requiring fewer states than a Moore machine whose outputs depend solely on the current state."
  },
  {
    "id": "co_arch_1",
    "topic": "Computer Architecture Types",
    "difficulty": "Easy",
    "question": "What is the primary characteristic of the Von Neumann architecture?",
    "options": [
      "Separate physical memory buses for instructions and data",
      "Shared single memory and common bus for both instructions and data",
      "No program counter register",
      "Hardware-based floating point unit only"
    ],
    "correctAnswer": 1,
    "explanation": "In the Von Neumann architecture, both program instructions and application data share the same physical memory space and system bus, leading to the Von Neumann bottleneck."
  },
  {
    "id": "co_arch_2",
    "topic": "Computer Architecture Types",
    "difficulty": "Easy",
    "question": "What is the key advantage of the Harvard architecture over Von Neumann?",
    "options": [
      "Lower hardware cost",
      "Simultaneous instruction fetch and data read/write due to separate physical buses and memories",
      "Simpler compiler design",
      "Elimination of cache memory"
    ],
    "correctAnswer": 1,
    "explanation": "Harvard architecture provides physically separate memory pathways for code and data, permitting simultaneous instruction fetching and data memory access without bus contention."
  },
  {
    "id": "co_arch_3",
    "topic": "Computer Architecture Types",
    "difficulty": "Easy",
    "question": "Which of the following is a characteristic of RISC (Reduced Instruction Set Computer) processors?",
    "options": [
      "Variable instruction length and complex addressing modes",
      "Fixed-length instructions, load-store architecture, and single-cycle execution of simple instructions",
      "Instructions perform arithmetic directly on memory operands",
      "Microprogrammed control unit with dense microcode"
    ],
    "correctAnswer": 1,
    "explanation": "RISC design focuses on a small, highly optimized set of fixed-length instructions, load/store architecture (only LOAD/STORE access memory), and hardwired control for pipelining efficiency."
  },
  {
    "id": "co_arch_4",
    "topic": "Computer Architecture Types",
    "difficulty": "Easy",
    "question": "Which processor architecture is typical of Intel x86 processors?",
    "options": [
      "Pure RISC",
      "CISC (Complex Instruction Set Computer) with internal RISC-like micro-ops",
      "Pure Harvard without cache",
      "VLIW only"
    ],
    "correctAnswer": 1,
    "explanation": "Intel x86 is historically CISC. Modern x86 processors maintain CISC ISA compatibility externally while hardware decoders translate CISC instructions into RISC-like micro-operations (uops) internally."
  },
  {
    "id": "co_arch_5",
    "topic": "Computer Architecture Types",
    "difficulty": "Medium",
    "question": "What is the \"Von Neumann Bottleneck\"?",
    "options": [
      "CPU arithmetic registers run too hot",
      "System throughput is constrained because CPU execution speed far exceeds the throughput of the shared bus between CPU and memory",
      "Hard disks are slower than RAM",
      "Compilation takes longer than execution"
    ],
    "correctAnswer": 1,
    "explanation": "The Von Neumann bottleneck refers to the throughput limitation caused by the shared bus between CPU and memory. Since CPU processing speed grew much faster than bus bandwidth, the CPU continually starves waiting for instructions and data."
  },
  {
    "id": "co_arch_6",
    "topic": "Computer Architecture Types",
    "difficulty": "Medium",
    "question": "In RISC architectures, why is \"Load-Store Architecture\" enforced?",
    "options": [
      "To prevent memory from being upgraded",
      "Arithmetic and logical instructions operate exclusively on registers, simplifying CPU datapath and pipelining",
      "Because RISC processors have no data memory",
      "To allow variable-length instructions"
    ],
    "correctAnswer": 1,
    "explanation": "In Load-Store architectures, ALU instructions cannot access RAM directly; they operate solely on CPU registers. Only explicit LOAD and STORE instructions touch memory, keeping instruction timing predictable for pipelining."
  },
  {
    "id": "co_arch_7",
    "topic": "Computer Architecture Types",
    "difficulty": "Medium",
    "question": "What is the principle behind VLIW (Very Long Instruction Word) architecture?",
    "options": [
      "The CPU dynamically reorders instructions at runtime using hardware schedulers",
      "The compiler packs multiple independent operations into a single very long instruction word to be executed in parallel",
      "Instructions are 8 bits wide to save ROM",
      "Instructions are executed purely sequentially in one ALU"
    ],
    "correctAnswer": 1,
    "explanation": "VLIW shifts instruction-level parallelism (ILP) scheduling from runtime hardware logic to compile-time analysis. The compiler bundles multiple independent instructions into one large word that executes across parallel functional units."
  },
  {
    "id": "co_arch_8",
    "topic": "Computer Architecture Types",
    "difficulty": "Medium",
    "question": "Where is the modified Harvard architecture most commonly used today?",
    "options": [
      "Vintage mainframes only",
      "Modern CPUs and DSPs, where separate L1 instruction and data caches provide Harvard separation while unified L2/L3 and main RAM provide Von Neumann unity",
      "In mechanical calculators",
      "Purely in quantum processors"
    ],
    "correctAnswer": 1,
    "explanation": "Modern processors (like ARM Cortex and Intel Core) use a modified Harvard architecture: split L1 Instruction and Data caches to achieve concurrent access, backed by unified L2/L3 caches and main RAM for program flexibility."
  },
  {
    "id": "co_arch_9",
    "topic": "Computer Architecture Types",
    "difficulty": "Hard",
    "question": "According to Flynn's Taxonomy, modern multi-core CPUs with AVX/NEON vector extensions are best classified as:",
    "options": [
      "SISD only",
      "MIMD with internal SIMD processing units",
      "MISD exclusively",
      "SIMD only"
    ],
    "correctAnswer": 1,
    "explanation": "Modern multi-core processors are MIMD (Multiple Instruction, Multiple Data) systems because multiple independent cores run different instruction streams simultaneously, while each core features SIMD (Single Instruction, Multiple Data) vector units (AVX, NEON) for data parallelism."
  },
  {
    "id": "co_arch_10",
    "topic": "Computer Architecture Types",
    "difficulty": "Hard",
    "question": "Why do CISC architectures typically have higher code density (smaller binary program size) than RISC?",
    "options": [
      "CISC uses lossless compression on the binary",
      "Single CISC instructions can encode complex multi-step operations and variable-length encodings, requiring fewer instructions per task",
      "RISC compilers omit debug symbols",
      "CISC registers are twice as large"
    ],
    "correctAnswer": 1,
    "explanation": "Because CISC instructions can perform memory access and arithmetic in a single instruction (e.g. `ADD [EAX], EBX`) and use variable instruction byte lengths, programs require fewer instructions and less memory storage than equivalent RISC code."
  },
  {
    "id": "co_if_1",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Easy",
    "question": "In which addressing mode is the operand specified directly within the instruction itself?",
    "options": [
      "Direct Addressing",
      "Immediate Addressing",
      "Register Indirect Addressing",
      "Indexed Addressing"
    ],
    "correctAnswer": 1,
    "explanation": "In Immediate Addressing (e.g., `MOV R1, #25`), the operand data is part of the instruction itself, requiring no memory access to fetch the data."
  },
  {
    "id": "co_if_2",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Easy",
    "question": "In Direct (Absolute) Addressing mode, the address field of the instruction contains:",
    "options": [
      "The actual data value",
      "The effective memory address where the operand is located",
      "A CPU register number holding the operand",
      "An offset relative to the program counter"
    ],
    "correctAnswer": 1,
    "explanation": "In Direct Addressing mode, the instruction explicitly contains the effective memory address of the operand (e.g., `LOAD 2000H`)."
  },
  {
    "id": "co_if_3",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Easy",
    "question": "What register holds the address of the next instruction to be fetched and executed?",
    "options": [
      "Instruction Register (IR)",
      "Program Counter (PC)",
      "Memory Buffer Register (MBR)",
      "Accumulator (ACC)"
    ],
    "correctAnswer": 1,
    "explanation": "The Program Counter (PC) stores the memory address of the next sequential instruction to be fetched from memory."
  },
  {
    "id": "co_if_4",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Easy",
    "question": "Which addressing mode is most useful for implementing position-independent code (PIC) and relative branching?",
    "options": [
      "Base-Register Addressing",
      "PC-Relative Addressing",
      "Immediate Addressing",
      "Direct Addressing"
    ],
    "correctAnswer": 1,
    "explanation": "PC-Relative addressing calculates the effective address as (PC + Offset). Because the branch target is specified relative to current instruction location, the code can be loaded anywhere in RAM without relinking."
  },
  {
    "id": "co_if_5",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Medium",
    "question": "In Register Indirect Addressing mode, how is the operand retrieved?",
    "options": [
      "Directly from the instruction op-code",
      "The instruction specifies a register that contains the memory address of the operand",
      "The instruction points to a hard drive sector",
      "The operand is stored in the program counter"
    ],
    "correctAnswer": 1,
    "explanation": "In Register Indirect addressing (e.g., `MOV A, @R0` or `MOV EAX, [EBX]`), the specified register holds a pointer (memory address) to the actual operand in RAM."
  },
  {
    "id": "co_if_6",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Medium",
    "question": "Which addressing mode is ideal for accessing elements of an array in a loop?",
    "options": [
      "Immediate Addressing",
      "Indexed Addressing / Base-Index Addressing",
      "Direct Addressing",
      "Implied Addressing"
    ],
    "correctAnswer": 1,
    "explanation": "Indexed addressing computes Effective Address = (Base Address + Index Register). Incrementing the index register in a loop sequentially steps through adjacent array elements cleanly."
  },
  {
    "id": "co_if_7",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Medium",
    "question": "How many memory accesses are required to fetch the operand in \"Memory Indirect Addressing\" mode?",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Memory Indirect Addressing requires 2 memory accesses: first access reads the pointer (effective address) stored in memory, and second access reads the actual operand data from that effective address."
  },
  {
    "id": "co_if_8",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Medium",
    "question": "What is \"Auto-increment\" and \"Auto-decrement\" addressing primarily used for in instruction sets?",
    "options": [
      "Floating-point conversions",
      "Push and Pop stack operations, and linear buffer traversals",
      "Virtual memory paging",
      "DMA controller arbitration"
    ],
    "correctAnswer": 1,
    "explanation": "Auto-increment and auto-decrement automatically increment/decrement the pointer register before or after memory access, making them ideal for hardware stack operations (PUSH/POP) and string copy loops."
  },
  {
    "id": "co_if_9",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Hard",
    "question": "A CPU has a 32-bit instruction format with 3-address instructions. If there are 64 opcodes and 32 registers, how many bits remain for an immediate constant?",
    "options": [
      "11 bits",
      "16 bits",
      "21 bits",
      "6 bits"
    ],
    "correctAnswer": 0,
    "explanation": "Opcode: 64 operations = 2^6 -> 6 bits. 3 register fields: each register from 32 registers needs log2(32) = 5 bits. If 2 are registers (10 bits) and 1 is immediate: 32 - (6 + 5 + 5 + 5) = 11 bits remaining."
  },
  {
    "id": "co_if_10",
    "topic": "Instruction Formats & Addressing Modes",
    "difficulty": "Hard",
    "question": "What is the purpose of the \"Expanding Opcode\" technique in instruction set encoding?",
    "options": [
      "To double register file size",
      "To allow instructions of different formats (varying number of operands) to coexist within a fixed instruction word length",
      "To increase clock frequency",
      "To enable out-of-order execution"
    ],
    "correctAnswer": 1,
    "explanation": "Expanding opcode technique uses unused bit combinations of shorter opcode fields to escape into longer opcodes, allowing 3-address, 2-address, 1-address, and 0-address instructions to share a fixed-length instruction word."
  },
  {
    "id": "co_dp_1",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Easy",
    "question": "What is the function of the Instruction Register (IR)?",
    "options": [
      "It points to the next instruction address",
      "It holds the instruction currently being decoded and executed",
      "It stores the result of ALU operations",
      "It handles DMA requests"
    ],
    "correctAnswer": 1,
    "explanation": "Once an instruction is fetched from memory, it is loaded into the Instruction Register (IR), where the Control Unit decodes its opcode and operands."
  },
  {
    "id": "co_dp_2",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Easy",
    "question": "What are the two primary types of Control Units used in CPU design?",
    "options": [
      "Static and Dynamic",
      "Hardwired and Microprogrammed",
      "Synchronous and Asynchronous",
      "RISC and CISC"
    ],
    "correctAnswer": 1,
    "explanation": "Control units are implemented either as Hardwired (fixed combinational logic gates and state machines, optimized for speed) or Microprogrammed (control signals stored in a microcode ROM)."
  },
  {
    "id": "co_dp_3",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Easy",
    "question": "What register interfaces the CPU with the memory data bus during read and write operations?",
    "options": [
      "MAR (Memory Address Register)",
      "MBR (Memory Buffer Register) / MDR (Memory Data Register)",
      "PC (Program Counter)",
      "CIR (Current Instruction Register)"
    ],
    "correctAnswer": 1,
    "explanation": "The Memory Buffer Register (MBR) or Memory Data Register (MDR) holds the actual data or instruction word being read from or written to main memory via the data bus."
  },
  {
    "id": "co_dp_4",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Easy",
    "question": "Which register holds the memory address from which data is fetched or to which data is written?",
    "options": [
      "MAR (Memory Address Register)",
      "MDR (Memory Data Register)",
      "Accumulator",
      "Status Register"
    ],
    "correctAnswer": 0,
    "explanation": "The Memory Address Register (MAR) holds the physical address on the memory bus where the CPU wants to read or write."
  },
  {
    "id": "co_dp_5",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Medium",
    "question": "What is the main advantage of a Hardwired Control Unit over a Microprogrammed Control Unit?",
    "options": [
      "Easier to modify and update instruction sets",
      "Faster execution speed because signals are generated directly by logic gates without ROM lookup latency",
      "Lower hardware gate count",
      "Supports variable length microcode"
    ],
    "correctAnswer": 1,
    "explanation": "Hardwired control units generate control signals directly via combinational logic circuits (decoders and flip-flops), making them significantly faster than microprogrammed units that must fetch micro-instructions from control memory."
  },
  {
    "id": "co_dp_6",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Medium",
    "question": "What is the difference between Horizontal and Vertical Microcode in microprogrammed control units?",
    "options": [
      "Horizontal is for 64-bit CPUs, vertical is for 32-bit CPUs",
      "Horizontal has one control bit per hardware control line (wide, unencoded, faster); Vertical encodes control bits into fields, requiring decoders (narrower, compact)",
      "Vertical uses flash memory, horizontal uses SRAM",
      "Horizontal microcode cannot branch"
    ],
    "correctAnswer": 1,
    "explanation": "Horizontal microcode provides 1 bit per control signal without encoding (wide words, high parallelism, faster execution). Vertical microcode groups mutually exclusive signals into encoded bitfields (narrow words, requires decoders, saves control store memory)."
  },
  {
    "id": "co_dp_7",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Medium",
    "question": "What role does the Status Register / Flags Register play in the CPU ALU datapath?",
    "options": [
      "Stores temporary instruction bytes",
      "Contains conditional status bits (Zero, Carry, Sign, Overflow, Parity) set by ALU operations for branch evaluations",
      "Buffers keyboard scan codes",
      "Controls system clock frequency"
    ],
    "correctAnswer": 1,
    "explanation": "The Status Register holds condition flags (Z=Zero, C=Carry, S=Sign, V=Overflow) reflecting the outcome of the most recent ALU computation, used by conditional jump/branch instructions."
  },
  {
    "id": "co_dp_8",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Medium",
    "question": "During the \"Fetch\" cycle of a basic instruction cycle, what micro-operations occur?",
    "options": [
      "ALU calculates result and stores in register",
      "MAR <- PC; MBR <- Memory[MAR]; PC <- PC + 4; IR <- MBR",
      "IR <- MAR; MDR <- ACC; PC <- 0",
      "Memory[MAR] <- MBR; PC <- PC - 1"
    ],
    "correctAnswer": 1,
    "explanation": "In Fetch: 1) MAR receives PC; 2) Memory read places instruction into MBR while PC is incremented; 3) Instruction is transferred from MBR to IR for decoding."
  },
  {
    "id": "co_dp_9",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Hard",
    "question": "In a single-bus CPU organization, why cannot two registers place their contents onto the internal bus simultaneously?",
    "options": [
      "Bus arbitration chip will overheat",
      "Bus contention / short circuit occurs, garbling data because only one source can drive a shared bus at a time",
      "Memory clock will become desynchronized",
      "ALU will produce an overflow flag"
    ],
    "correctAnswer": 1,
    "explanation": "A shared internal CPU bus allows only one tri-state buffer or register driver to assert signals at any given clock cycle. Multiple simultaneous assertions cause bus contention, electrical damage, and undefined logic levels."
  },
  {
    "id": "co_dp_10",
    "topic": "CPU Datapath, Control Unit & ALU",
    "difficulty": "Hard",
    "question": "What is \"Nanoprogramming\" in computer control unit design?",
    "options": [
      "Programming on microscopic quantum processors",
      "A two-level control store architecture where micro-instructions point to nano-instructions to eliminate redundant control words and minimize total ROM size",
      "Direct assembly in machine cycles",
      "Microcode executed on GPU shaders"
    ],
    "correctAnswer": 1,
    "explanation": "Nanoprogramming employs two levels of control store: micro-instructions contain addresses into a smaller \"nano-store\" containing unique control signal patterns. This eliminates duplicate control words in CISC control memory."
  },
  {
    "id": "co_pl_1",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Easy",
    "question": "What is the primary objective of Instruction Pipelining in modern CPUs?",
    "options": [
      "To reduce the execution time (latency) of an individual instruction",
      "To increase instruction execution throughput by overlapping the execution of multiple instructions",
      "To reduce the physical silicon area of the CPU die",
      "To eliminate the need for registers"
    ],
    "correctAnswer": 1,
    "explanation": "Pipelining does not decrease individual instruction latency; it dramatically increases instruction throughput (instructions completed per clock cycle) by executing different phases of multiple instructions in parallel."
  },
  {
    "id": "co_pl_2",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Easy",
    "question": "In an ideal k-stage linear pipeline without stalls or hazards, what is the theoretical maximum speedup over a non-pipelined processor?",
    "options": [
      "k/2",
      "k",
      "k^2",
      "2^k"
    ],
    "correctAnswer": 1,
    "explanation": "Under ideal conditions with continuous instruction flow and zero pipeline stalls, an instruction completes every clock cycle, achieving a maximum theoretical speedup equal to the number of stages k."
  },
  {
    "id": "co_pl_3",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Easy",
    "question": "What are the three fundamental classes of pipeline hazards?",
    "options": [
      "Cache, Memory, and Bus hazards",
      "Structural, Data, and Control hazards",
      "Arithmetic, Logic, and Floating-point hazards",
      "Static, Dynamic, and Metastable hazards"
    ],
    "correctAnswer": 1,
    "explanation": "The 3 classic pipeline hazards are: Structural (hardware resource conflict), Data (data dependency between instructions), and Control (branching/jumping decisions altering execution flow)."
  },
  {
    "id": "co_pl_4",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Easy",
    "question": "What is a \"Pipeline Bubble\" or \"Stall\"?",
    "options": [
      "A hardware cooling failure",
      "An idle cycle inserted into one or more pipeline stages to resolve a hazard before execution can proceed",
      "An overflow in the ALU register",
      "A branch instruction executed backwards"
    ],
    "correctAnswer": 1,
    "explanation": "A stall or bubble is a null operation (NOP) injected into the pipeline, holding back dependent instructions until hazard conditions clear and required data or resources become available."
  },
  {
    "id": "co_pl_5",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Medium",
    "question": "Which data hazard occurs when an instruction attempts to read a register before a preceding instruction writes to it?",
    "options": [
      "RAW (Read-After-Write) / True Dependency",
      "WAR (Write-After-Read) / Anti-Dependency",
      "WAW (Write-After-Write) / Output Dependency",
      "RAR (Read-After-Read)"
    ],
    "correctAnswer": 0,
    "explanation": "RAW (Read-After-Write) is a true data dependency where Instruction B requires data generated by Instruction A before A has committed the write."
  },
  {
    "id": "co_pl_6",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Medium",
    "question": "How does \"Operand Forwarding\" (Data Bypassing) alleviate RAW data hazards?",
    "options": [
      "By executing instructions backwards",
      "By routing the calculated result directly from an ALU execution stage to dependent instruction inputs without waiting for register write-back",
      "By duplicating registers in memory",
      "By stalling the clock for 4 cycles"
    ],
    "correctAnswer": 1,
    "explanation": "Operand forwarding detects data dependencies and routes the output from the ALU/MEM stage registers directly back to the ALU input multiplexers of the next cycle, eliminating stalls without waiting for the Write-Back stage."
  },
  {
    "id": "co_pl_7",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Medium",
    "question": "What is \"Branch Prediction\" used for in pipelined processors?",
    "options": [
      "To predict CPU overheating",
      "To guess whether a conditional branch will be taken or not before condition evaluation, avoiding pipeline flushes",
      "To automatically fix compilation bugs",
      "To predict RAM capacity requirements"
    ],
    "correctAnswer": 1,
    "explanation": "Branch prediction speculates on the target instruction stream of conditional branches so the instruction fetch unit continues loading instructions without stalling until branch resolution."
  },
  {
    "id": "co_pl_8",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Medium",
    "question": "What happens when a branch misprediction occurs in a deep pipeline?",
    "options": [
      "The CPU halts permanently",
      "All speculatively fetched and partially executed instructions in the pipeline must be flushed (squashed), discarding their results and causing latency penalty",
      "Memory is corrupted",
      "Operating system restarts"
    ],
    "correctAnswer": 1,
    "explanation": "When a branch was predicted incorrectly, all speculatively fetched instructions in flight must be discarded (flushed) and the pipeline refilled from the correct branch address, costing multiple wasted cycles."
  },
  {
    "id": "co_pl_9",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Hard",
    "question": "Tomasulo's Algorithm resolves WAR and WAW hazards dynamically by using:",
    "options": [
      "D-latches and delay lines",
      "Reservation Stations and Register Renaming via Common Data Bus (CDB)",
      "Static compiler reordering only",
      "Pure Harvard cache split"
    ],
    "correctAnswer": 1,
    "explanation": "Tomasulo's algorithm uses Reservation Stations at each functional unit and dynamic register renaming over a Common Data Bus (CDB) to eliminate WAR (anti-dependencies) and WAW (output dependencies) for out-of-order execution."
  },
  {
    "id": "co_pl_10",
    "topic": "Pipelining & Pipeline Hazards",
    "difficulty": "Hard",
    "question": "In a 5-stage classic RISC pipeline (IF, ID, EX, MEM, WB) running at 2 GHz, a program has 20% branch instructions, of which 70% are taken. If branch decisions are resolved in EX stage (2 cycle penalty for taken branches without prediction), what is the average CPI assuming base CPI = 1?",
    "options": [
      "1.0",
      "1.14",
      "1.28",
      "1.40"
    ],
    "correctAnswer": 2,
    "explanation": "Stall penalty occurs on taken branches: Fraction of taken branches = 20% * 70% = 0.14. Penalty per taken branch = 2 cycles. Average CPI = 1.0 + (0.14 * 2) = 1.28."
  },
  {
    "id": "co_cm_1",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Easy",
    "question": "What is the primary reason for having a memory hierarchy in computer systems?",
    "options": [
      "To make the computer physically lighter",
      "To bridge the speed, cost, and capacity gap between fast but expensive CPU registers and slow but cheap secondary storage",
      "To prevent viruses from spreading",
      "To allow multiple operating systems to run concurrently"
    ],
    "correctAnswer": 1,
    "explanation": "Memory hierarchy balances speed, capacity, and cost: fast, small, expensive memories (SRAM cache) sit near the CPU, backed by larger, slower, cheaper storage (DRAM, SSDs)."
  },
  {
    "id": "co_cm_2",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Easy",
    "question": "What is the difference between Temporal Locality and Spatial Locality?",
    "options": [
      "Temporal locality is locality in space, spatial is in time",
      "Temporal: recently accessed data is likely to be accessed again soon; Spatial: data stored at nearby addresses is likely to be accessed soon",
      "Both refer only to disk storage sectors",
      "Temporal applies to registers, spatial applies to network"
    ],
    "correctAnswer": 1,
    "explanation": "Temporal locality: recently referenced memory locations are likely to be accessed again soon (e.g., loops). Spatial locality: memory locations near the recently accessed item are likely to be accessed soon (e.g., arrays)."
  },
  {
    "id": "co_cm_3",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Easy",
    "question": "What is a \"Cache Hit\" versus a \"Cache Miss\"?",
    "options": [
      "Cache hit means cache is full, miss means cache is empty",
      "Cache hit: requested memory word is found in cache; Cache miss: requested word is not found, requiring fetch from slower main RAM",
      "Cache hit means data corrupted, miss means data intact",
      "Hit refers to L1, miss refers to L2"
    ],
    "correctAnswer": 1,
    "explanation": "When the CPU searches cache for an address: a Hit occurs if the tag matches a valid line; a Miss occurs if absent, requiring retrieval from lower memory levels with miss penalty."
  },
  {
    "id": "co_cm_4",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Easy",
    "question": "In Direct-Mapped Cache, how many cache block locations can a given memory block map to?",
    "options": [
      "Any location in the entire cache",
      "Exactly one specific cache block given by (Block Address mod Number of Cache Blocks)",
      "Any block within a chosen set of 4 blocks",
      "Two locations: odd and even"
    ],
    "correctAnswer": 1,
    "explanation": "In direct-mapped cache, each main memory block maps to exactly one predetermined line in cache: Index = (Block Address) mod (Total Cache Lines)."
  },
  {
    "id": "co_cm_5",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Medium",
    "question": "What are the three fields of a memory address in a Set-Associative Cache?",
    "options": [
      "Opcode, Register, Offset",
      "Tag, Set Index, and Word/Byte Offset",
      "Virtual Page, Frame, Segment",
      "Sector, Track, Cylinder"
    ],
    "correctAnswer": 1,
    "explanation": "In set-associative cache, the address is broken into: Set Index (selects the set), Tag (identifies the specific block within the set), and Byte/Word Offset (identifies the exact byte within the cache line block)."
  },
  {
    "id": "co_cm_6",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Medium",
    "question": "What is the difference between Write-Through and Write-Back cache write policies?",
    "options": [
      "Write-through writes only to cache; Write-back writes to disk",
      "Write-Through writes immediately to both cache and main memory; Write-Back writes only to cache and updates main memory only when the dirty block is evicted",
      "Write-back is used for ROM, write-through for RAM",
      "Write-through requires no valid bit"
    ],
    "correctAnswer": 1,
    "explanation": "Write-Through writes simultaneously to cache and main RAM (consistent but slower). Write-Back writes only to cache, setting a \"dirty bit\", and writes to RAM only when that block is replaced."
  },
  {
    "id": "co_cm_7",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Medium",
    "question": "Which cache replacement policy evicts the block that has not been accessed for the longest period of time?",
    "options": [
      "FIFO (First-In, First-Out)",
      "LRU (Least Recently Used)",
      "LFU (Least Frequently Used)",
      "Random Replacement"
    ],
    "correctAnswer": 1,
    "explanation": "LRU (Least Recently Used) keeps track of block access recency and discards the block that has remained unreferenced for the longest time, leveraging temporal locality."
  },
  {
    "id": "co_cm_8",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Medium",
    "question": "What are the \"3 Cs\" of cache misses?",
    "options": [
      "Cost, Capacity, Collision",
      "Compulsory (Cold), Capacity, and Conflict misses",
      "Current, Cached, Continuous misses",
      "CPU, Controller, Channel misses"
    ],
    "correctAnswer": 1,
    "explanation": "Mark Hill classified cache misses into 3 Cs: Compulsory (first access to block), Capacity (cache cannot hold all blocks needed), and Conflict (multiple blocks compete for the same set in direct or set-associative caches)."
  },
  {
    "id": "co_cm_9",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Hard",
    "question": "A system has a 64 KB 4-way set-associative cache with 64-byte block size and 32-bit physical addresses. How many bits are used for Tag, Set Index, and Block Offset?",
    "options": [
      "Tag: 18 bits, Set Index: 8 bits, Block Offset: 6 bits",
      "Tag: 20 bits, Set Index: 6 bits, Block Offset: 6 bits",
      "Tag: 16 bits, Set Index: 10 bits, Block Offset: 6 bits",
      "Tag: 12 bits, Set Index: 14 bits, Block Offset: 6 bits"
    ],
    "correctAnswer": 0,
    "explanation": "Block size = 64 bytes = 2^6 -> Block offset = 6 bits. Total blocks = 64 KB / 64 B = 1024 blocks. With 4-way associativity: Number of sets = 1024 / 4 = 256 sets = 2^8 -> Set Index = 8 bits. Tag bits = 32 - (8 + 6) = 18 bits."
  },
  {
    "id": "co_cm_10",
    "topic": "Memory Hierarchy & Cache Memory",
    "difficulty": "Hard",
    "question": "If L1 cache hit time is 1 ns with 90% hit rate, L2 cache hit time is 5 ns with 80% hit rate, and main memory access time is 100 ns, what is the Average Memory Access Time (AMAT)?",
    "options": [
      "2.0 ns",
      "3.4 ns",
      "5.2 ns",
      "7.0 ns"
    ],
    "correctAnswer": 1,
    "explanation": "AMAT = HitTime_L1 + MissRate_L1 * MissPenalty_L1. MissPenalty_L1 = HitTime_L2 + MissRate_L2 * MemoryAccessTime = 5 ns + (0.20 * 100 ns) = 5 + 20 = 25 ns. AMAT = 1 ns + (0.10 * 25 ns) = 1 + 2.5 = 3.5 ns (approx 3.4-3.5 ns)."
  },
  {
    "id": "co_vm_1",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Easy",
    "question": "What is the primary function of Virtual Memory in modern computer systems?",
    "options": [
      "To double the CPU clock speed",
      "To provide each process an illusion of a large, contiguous, isolated address space and protect processes from each other",
      "To eliminate the need for hard disk storage",
      "To run 32-bit applications on 16-bit hardware"
    ],
    "correctAnswer": 1,
    "explanation": "Virtual memory gives each process its own isolated virtual address space, translates addresses to physical RAM via page tables, protects memory, and allows execution of programs larger than physical RAM via paging."
  },
  {
    "id": "co_vm_2",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Easy",
    "question": "What hardware component translates Virtual Addresses to Physical Addresses at runtime?",
    "options": [
      "ALU (Arithmetic Logic Unit)",
      "MMU (Memory Management Unit)",
      "DMA Controller",
      "Interrupt Vector Table"
    ],
    "correctAnswer": 1,
    "explanation": "The Memory Management Unit (MMU) is the dedicated hardware module inside or adjacent to the CPU that translates virtual memory addresses into physical RAM addresses on every reference."
  },
  {
    "id": "co_vm_3",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Easy",
    "question": "What is a TLB (Translation Lookaside Buffer)?",
    "options": [
      "A buffer for audio output",
      "A high-speed associative hardware cache within the MMU that stores recent virtual-to-physical page address translations",
      "A register that stores network packets",
      "A backup hard disk partition"
    ],
    "correctAnswer": 1,
    "explanation": "The TLB is an associative cache inside the MMU that caches recent page table entries (Virtual Page Number to Physical Frame Number), avoiding slow page table walks in main memory."
  },
  {
    "id": "co_vm_4",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Easy",
    "question": "What event occurs when a CPU attempts to access a virtual page whose \"Present / Valid\" bit is 0 in the Page Table?",
    "options": [
      "Segmentation Fault and immediate system reboot",
      "Page Fault exception, triggering OS kernel to load the page from disk into RAM",
      "Bus error",
      "Arithmetic trap"
    ],
    "correctAnswer": 1,
    "explanation": "When the valid/present bit is 0, the page is not in physical RAM. A Page Fault exception is trapped to the OS, which retrieves the missing page from swap space into a physical frame and updates the page table."
  },
  {
    "id": "co_vm_5",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Medium",
    "question": "Why are Multi-level Page Tables (hierarchical paging) preferred over single-level page tables in 64-bit architectures?",
    "options": [
      "They make translation faster than single-level tables",
      "They avoid allocating huge continuous page tables for sparse address spaces by creating page sub-tables only for allocated regions",
      "They eliminate TLB misses completely",
      "They reduce physical RAM size"
    ],
    "correctAnswer": 1,
    "explanation": "A flat single-level page table for a 64-bit space would consume gigabytes or terabytes of RAM. Multi-level page tables break address spaces into a tree hierarchy; non-existent address ranges do not require sub-table allocation."
  },
  {
    "id": "co_vm_6",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Medium",
    "question": "In an Inverted Page Table:",
    "options": [
      "Entries are indexed by virtual page numbers across all processes",
      "There is one entry per physical frame in RAM rather than per virtual page, greatly saving memory table space",
      "Disk swap space is indexed by PID",
      "Virtual memory is completely disabled"
    ],
    "correctAnswer": 1,
    "explanation": "An inverted page table has exactly one entry per physical memory frame (indexed by frame number), tracking which process and virtual page occupies that frame, drastically reducing table overhead in large address systems."
  },
  {
    "id": "co_vm_7",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Medium",
    "question": "What is the purpose of the \"Dirty Bit\" (Modified Bit) in a page table entry?",
    "options": [
      "To detect viruses in memory",
      "To track whether the page has been modified since being loaded from disk, indicating if it must be written back to disk on replacement",
      "To check if page is read-only",
      "To prevent TLB flushing"
    ],
    "correctAnswer": 1,
    "explanation": "The dirty bit is set by hardware whenever a write operation touches the page. If dirty = 1 when the page is evicted, the OS must write it back to disk; if dirty = 0, the page can simply be overwritten without disk write overhead."
  },
  {
    "id": "co_vm_8",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Medium",
    "question": "What happens to the TLB during a process Context Switch if the TLB does not support ASID (Address Space Identifier) tags?",
    "options": [
      "The TLB must be completely flushed (invalidated) to prevent the new process from accessing previous process addresses",
      "The TLB content is saved to the hard disk",
      "The TLB doubles its capacity",
      "The TLB converts to L2 cache"
    ],
    "correctAnswer": 0,
    "explanation": "Without ASID tagging, virtual addresses from different processes overlap. Therefore, the OS must flush the entire TLB on every context switch so the new process does not access invalid or stale translations."
  },
  {
    "id": "co_vm_9",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Hard",
    "question": "Consider a virtual memory system with 32-bit virtual addresses, 4 KB page size, and 4-byte page table entries. How many levels are required for a hierarchical page table if each page table page must fit within exactly one 4 KB page?",
    "options": [
      "1 level",
      "2 levels",
      "3 levels",
      "4 levels"
    ],
    "correctAnswer": 1,
    "explanation": "Page size = 4 KB = 2^12 bytes -> Offset = 12 bits. Virtual Page Number (VPN) = 32 - 12 = 20 bits (1,048,576 pages). One 4 KB page table page holds 4 KB / 4 B = 1024 = 2^10 entries (10 bits per level). Thus, 20 VPN bits / 10 bits per level = 2 levels."
  },
  {
    "id": "co_vm_10",
    "topic": "Virtual Memory, TLB & Page Tables",
    "difficulty": "Hard",
    "question": "In a system with TLB access time of 10 ns, memory access time of 100 ns, and a two-level page table, what is the Effective Memory Access Time (EMAT) if TLB hit ratio is 95% (assuming no page faults)?",
    "options": [
      "115 ns",
      "120 ns",
      "125 ns",
      "135 ns"
    ],
    "correctAnswer": 1,
    "explanation": "TLB Hit: TLB access + Memory data access = 10 + 100 = 110 ns. TLB Miss: TLB access + 2 page table memory accesses + 1 data memory access = 10 + 100 + 100 + 100 = 310 ns. EMAT = 0.95 * 110 + 0.05 * 310 = 104.5 + 15.5 = 120 ns."
  },
  {
    "id": "co_io_1",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Easy",
    "question": "What is the primary difference between Programmed I/O and Interrupt-Driven I/O?",
    "options": [
      "Programmed I/O uses DMA; Interrupt-driven does not",
      "In Programmed I/O, the CPU repeatedly polls device status in a busy-wait loop; In Interrupt-Driven I/O, the device alerts the CPU via an interrupt signal when ready",
      "Interrupt-driven I/O cannot transfer data",
      "Programmed I/O is faster for all peripherals"
    ],
    "correctAnswer": 1,
    "explanation": "In programmed I/O, the CPU wastes cycles in a polling loop waiting for device readiness. Interrupt-driven I/O frees the CPU to execute other tasks until the device signals it with an interrupt."
  },
  {
    "id": "co_io_2",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Easy",
    "question": "What is the primary function of a DMA (Direct Memory Access) Controller?",
    "options": [
      "To execute CPU ALU instructions",
      "To transfer blocks of data directly between I/O peripherals and main memory without continuous CPU intervention",
      "To manage the processor cache replacement",
      "To encrypt hard disk sectors"
    ],
    "correctAnswer": 1,
    "explanation": "DMA allows high-speed I/O devices (like network cards and NVMe drives) to transfer data directly to and from main RAM without routing every byte through CPU registers, freeing the CPU for compute tasks."
  },
  {
    "id": "co_io_3",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Easy",
    "question": "What is the difference between Memory-Mapped I/O and Isolated (Port-Mapped) I/O?",
    "options": [
      "Memory-mapped I/O is only for ROM",
      "In Memory-Mapped I/O, I/O device registers share the same address space and instructions as main RAM; In Port-Mapped I/O, I/O devices have separate address spaces and special IN/OUT instructions",
      "Isolated I/O uses no bus",
      "Memory-mapped I/O cannot handle interrupts"
    ],
    "correctAnswer": 1,
    "explanation": "Memory-mapped I/O maps device registers into regular memory addresses, allowing standard memory instructions (`MOV`, `LDR`). Port-mapped (Isolated) I/O uses dedicated address space accessed via special instructions (e.g., `IN`, `OUT` in x86)."
  },
  {
    "id": "co_io_4",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Easy",
    "question": "What is an Interrupt Service Routine (ISR)?",
    "options": [
      "A hardware timer chip",
      "A specific software function/handler executed by the CPU in response to a hardware or software interrupt",
      "A BIOS setting for overclocking",
      "A DMA channel buffer"
    ],
    "correctAnswer": 1,
    "explanation": "An ISR (Interrupt Handler) is the kernel code executed when a specific interrupt triggers. The CPU saves its current context, executes the ISR, and restores the interrupted state."
  },
  {
    "id": "co_io_5",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Medium",
    "question": "What is the purpose of an Interrupt Vector Table (IVT)?",
    "options": [
      "To record CPU temperature readings",
      "To map interrupt request numbers (IRQs) to the memory starting addresses of their corresponding Interrupt Service Routines",
      "To store memory addresses of damaged hard disk sectors",
      "To prioritize USB packets"
    ],
    "correctAnswer": 1,
    "explanation": "The Interrupt Vector Table is an array in memory containing pointers to ISRs. When an interrupt vector is received, the CPU indexes this table to locate and jump to the appropriate handler code."
  },
  {
    "id": "co_io_6",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Medium",
    "question": "In \"Cycle Stealing\" DMA mode:",
    "options": [
      "The DMA controller shuts down CPU power",
      "The DMA controller takes control of the system bus for one bus cycle at a time during CPU memory idle cycles, interleaving with CPU execution",
      "The CPU stops entirely until several megabytes are moved",
      "Data is stolen from cache"
    ],
    "correctAnswer": 1,
    "explanation": "In cycle stealing DMA mode, the controller requests bus access for one bus transfer cycle at a time (stealing a cycle when the CPU does not need the bus), preventing the CPU from being locked out for long periods."
  },
  {
    "id": "co_io_7",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Medium",
    "question": "What is \"Daisy Chaining\" used for in interrupt handling?",
    "options": [
      "To connect hard drives in RAID",
      "Hardware priority arbitration where an interrupt acknowledge signal is passed serially through devices until the highest-priority requesting device grabs it",
      "Synchronizing CPU cores",
      "Testing logic gates with shift registers"
    ],
    "correctAnswer": 1,
    "explanation": "Daisy chaining is a serial hardware priority resolution scheme: the CPU sends an Interrupt Acknowledge (INTA) signal along a chain of devices; the first device in the chain that requested an interrupt intercepts it and places its vector on the bus."
  },
  {
    "id": "co_io_8",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Medium",
    "question": "What is a \"Non-Maskable Interrupt\" (NMI)?",
    "options": [
      "An interrupt generated only by user-level software",
      "A critical, high-priority hardware interrupt (such as parity error or power loss) that cannot be ignored or disabled by CPU interrupt mask flags",
      "An interrupt that operates without an ISR",
      "A low priority mouse click interrupt"
    ],
    "correctAnswer": 1,
    "explanation": "An NMI is an urgent hardware interrupt reserved for catastrophic events (hardware memory failure, bus parity errors, imminent power loss) that cannot be masked or disabled by software interrupt enable bits."
  },
  {
    "id": "co_io_9",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Hard",
    "question": "What is the \"Cache Coherency\" problem that arises when using DMA in systems with CPU cache?",
    "options": [
      "DMA controller overheats the L2 cache",
      "DMA may modify main memory while the CPU holds stale copies in cache, or CPU may update cache without writing to RAM before DMA reads RAM",
      "The hard disk sectors become misaligned with cache lines",
      "DMA addresses cannot fit in cache tags"
    ],
    "correctAnswer": 1,
    "explanation": "DMA bypasses CPU cache. If DMA writes directly to main memory, CPU cache lines for those addresses become stale. Conversely, if CPU writes to cache (Write-Back) and DMA reads RAM before eviction, DMA reads outdated data."
  },
  {
    "id": "co_io_10",
    "topic": "I/O Organization, Interrupts & DMA",
    "difficulty": "Hard",
    "question": "In a DMA transfer, what does the \"Burst Mode\" (Block Transfer Mode) do compared to Cycle Stealing?",
    "options": [
      "Transfers single bytes with random delays",
      "The DMA controller gains bus mastership and holds it continuously to transfer an entire block of data uninterrupted until complete",
      "Transfers data without using clock signals",
      "Transfers data exclusively through CPU registers"
    ],
    "correctAnswer": 1,
    "explanation": "In burst mode, once the DMA controller acquires the bus, it transfers the entire contiguous data block in a continuous high-speed stream while the CPU remains paused off the system bus until the transfer completes."
  },
  {
    "id": "co_ss_1",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Easy",
    "question": "What does the acronym RAID stand for in computer storage systems?",
    "options": [
      "Random Access Integrated Drive",
      "Redundant Array of Independent (or Inexpensive) Disks",
      "Rapid Access Interface Device",
      "Relational Array for Internal Data"
    ],
    "correctAnswer": 1,
    "explanation": "RAID stands for Redundant Array of Independent (or Inexpensive) Disks, combining multiple physical hard drives into a single logical unit for redundancy, performance, or both."
  },
  {
    "id": "co_ss_2",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Easy",
    "question": "Which RAID level provides striping without parity or redundancy, offering high speed but zero fault tolerance?",
    "options": [
      "RAID 0",
      "RAID 1",
      "RAID 5",
      "RAID 6"
    ],
    "correctAnswer": 0,
    "explanation": "RAID 0 (Disk Striping) splits data across multiple drives for higher read/write throughput. However, failure of any single drive results in complete data loss across the array."
  },
  {
    "id": "co_ss_3",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Easy",
    "question": "Which RAID level provides simple disk mirroring (duplicate copy on each disk)?",
    "options": [
      "RAID 0",
      "RAID 1",
      "RAID 5",
      "RAID 10"
    ],
    "correctAnswer": 1,
    "explanation": "RAID 1 (Disk Mirroring) writes identical data to two (or more) disks simultaneously, providing 100% redundancy with 50% total storage efficiency."
  },
  {
    "id": "co_ss_4",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Easy",
    "question": "What is the minimum number of physical disks required to implement RAID 5?",
    "options": [
      "1 disk",
      "2 disks",
      "3 disks",
      "5 disks"
    ],
    "correctAnswer": 2,
    "explanation": "RAID 5 uses block-level striping with distributed parity and requires at least 3 disks to operate. It can tolerate the complete failure of any 1 disk."
  },
  {
    "id": "co_ss_5",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Medium",
    "question": "How does RAID 5 store parity information across disks?",
    "options": [
      "All parity is stored on a single dedicated parity disk",
      "Parity blocks are distributed evenly across all disks in a rotating pattern",
      "Parity is stored in CPU L3 cache",
      "No parity is used in RAID 5"
    ],
    "correctAnswer": 1,
    "explanation": "Unlike RAID 3 or 4 which concentrate parity on a single bottleneck disk, RAID 5 distributes parity blocks cyclically across all member disks, balancing write traffic."
  },
  {
    "id": "co_ss_6",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Medium",
    "question": "What is the primary advantage of RAID 6 over RAID 5?",
    "options": [
      "RAID 6 requires only 2 disks",
      "RAID 6 uses dual distributed parity and can survive the simultaneous failure of any two disks",
      "RAID 6 has no write penalty",
      "RAID 6 uses mechanical tape instead of SSDs"
    ],
    "correctAnswer": 1,
    "explanation": "RAID 6 calculates two independent parity syndromes (e.g., XOR and Reed-Solomon) distributed across disks, requiring at least 4 disks and allowing survival of up to 2 concurrent drive failures."
  },
  {
    "id": "co_ss_7",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Medium",
    "question": "What is RAID 10 (or RAID 1+0)?",
    "options": [
      "A single drive running 10 partitions",
      "A stripe of mirrors (nested RAID) combining RAID 1 mirroring for fault tolerance and RAID 0 striping for high I/O throughput",
      "A 10-disk JBOD array",
      "RAID level using 10 parity drives"
    ],
    "correctAnswer": 1,
    "explanation": "RAID 10 is a hybrid nested array combining mirroring (RAID 1) with striping (RAID 0). It requires a minimum of 4 disks, provides fast read/write performance, and survives single or non-paired drive failures."
  },
  {
    "id": "co_ss_8",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Medium",
    "question": "What is the \"Write Penalty\" inherent in RAID 5 and RAID 6 architectures?",
    "options": [
      "Hard drives spin backwards during writes",
      "Every small random write requires reading existing data and parity, calculating new parity, and writing new data and parity (4 disk I/O operations for RAID 5)",
      "Writes can only happen when the computer boots",
      "SSD cells wear out 10 times faster"
    ],
    "correctAnswer": 1,
    "explanation": "In RAID 5, updating a single data block requires: 1) Read old data, 2) Read old parity, 3) Compute new parity = (old data XOR new data XOR old parity), 4) Write new data, 5) Write new parity (4 I/Os for 1 write)."
  },
  {
    "id": "co_ss_9",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Hard",
    "question": "If a storage system has four 2 TB drives configured in RAID 5, what is the usable data storage capacity of the array?",
    "options": [
      "8 TB",
      "6 TB",
      "4 TB",
      "2 TB"
    ],
    "correctAnswer": 1,
    "explanation": "For N disks of capacity C in RAID 5, usable capacity is (N - 1) * C. Here: (4 - 1) * 2 TB = 3 * 2 TB = 6 TB usable capacity, with 2 TB equivalent dedicated to parity."
  },
  {
    "id": "co_ss_10",
    "topic": "Secondary Storage & RAID Levels",
    "difficulty": "Hard",
    "question": "In Solid State Drives (SSDs), why is a \"Flash Translation Layer\" (FTL) and \"Wear Leveling\" essential?",
    "options": [
      "To accelerate magnetic disk platters",
      "Because NAND flash cells can only endure a finite number of Program/Erase (P/E) cycles, wear leveling distributes writes evenly across all blocks to prevent premature drive failure",
      "To prevent bit rot in DRAM",
      "To enable optical laser reading"
    ],
    "correctAnswer": 1,
    "explanation": "NAND flash memory degrades with each write/erase cycle. The FTL implements wear-leveling algorithms that distribute erase blocks uniformly across the entire physical drive, preventing hot spots and prolonging SSD lifespan."
  }
]
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.interviewPrepCO;
}
