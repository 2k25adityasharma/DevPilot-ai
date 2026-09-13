// scripts/interviewPrep/buildCoreCS3.js
// Generates computerOrganization.js, softwareEngineering.js, and systemDesign.js

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../../js/data/interviewPrep');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function q(id, topic, difficulty, question, options, correctAnswer, explanation) {
  if (!Array.isArray(options) || options.length !== 4) {
    throw new Error(`Question ${id} must have 4 options`);
  }
  if (correctAnswer < 0 || correctAnswer > 3) {
    throw new Error(`Question ${id} invalid correct answer: ${correctAnswer}`);
  }
  if (!explanation || explanation.trim() === '') {
    throw new Error(`Question ${id} missing explanation`);
  }
  return { id, topic, difficulty, question, options, correctAnswer, explanation };
}

// ==========================================
// 11. COMPUTER ORGANIZATION & ARCHITECTURE
// 12 topics * 10 = 120 MCQs
// ==========================================
console.log('Generating Computer Organization & Architecture data...');
const coQuestions = [
  // 1. Number Systems & Binary Arithmetic
  q('co_ns_1', 'Number Systems & Binary Arithmetic', 'Easy',
    'What is the 2\'s complement representation of -9 in an 8-bit register?',
    ['11110110', '11110111', '10001001', '11111001'], 1,
    '9 in 8-bit binary is 00001001. 1\'s complement is 11110110. Adding 1 gives the 2\'s complement: 11110111.'),
  q('co_ns_2', 'Number Systems & Binary Arithmetic', 'Easy',
    'What is the range of signed integers that can be represented using n-bit 2\'s complement representation?',
    ['-2^(n-1) to 2^(n-1)', '-2^(n-1) to 2^(n-1) - 1', '-2^n to 2^n - 1', '-(2^(n-1) - 1) to 2^(n-1) - 1'], 1,
    'In n-bit 2\'s complement, negative numbers start at -2^(n-1) and positive numbers go up to 2^(n-1) - 1, providing an extra negative number compared to 1\'s complement without dual representation of zero.'),
  q('co_ns_3', 'Number Systems & Binary Arithmetic', 'Easy',
    'What is the hexadecimal equivalent of binary 110110101111?',
    ['DAF', 'DBF', 'D9F', 'CAF'], 0,
    'Group into 4-bit nibbles from right: 1101 (13 = D), 1010 (10 = A), 1111 (15 = F). Thus, 0xDAF.'),
  q('co_ns_4', 'Number Systems & Binary Arithmetic', 'Easy',
    'Which condition indicates an overflow during the addition of two signed 2\'s complement binary numbers?',
    ['Carry into the sign bit equals carry out of the sign bit', 'Carry into the sign bit does not equal carry out of the sign bit', 'The result is negative when adding a positive and a negative number', 'A carry out of 1 occurs from the MSB'], 1,
    'Signed overflow occurs when the carry into the Most Significant Bit (sign bit) does not match the carry out of the sign bit (i.e., C_in XOR C_out = 1).'),
  q('co_ns_5', 'Number Systems & Binary Arithmetic', 'Medium',
    'In the IEEE 754 single-precision (32-bit) floating-point standard, how are the 32 bits partitioned?',
    ['1 sign bit, 7 exponent bits, 24 mantissa bits', '1 sign bit, 8 exponent bits, 23 mantissa (fraction) bits', '1 sign bit, 11 exponent bits, 20 mantissa bits', '2 sign bits, 8 exponent bits, 22 mantissa bits'], 1,
    'IEEE 754 single-precision allocates: 1 bit for sign, 8 bits for biased exponent (bias = 127), and 23 bits for the normalized mantissa/significand (with an implicit leading 1).'),
  q('co_ns_6', 'Number Systems & Binary Arithmetic', 'Medium',
    'What is the excess/bias value used in IEEE 754 single-precision (8-bit exponent) floating point?',
    ['128', '127', '255', '63'], 1,
    'For single-precision IEEE 754 with an 8-bit exponent (k = 8), the bias is 2^(k-1) - 1 = 2^7 - 1 = 127.'),
  q('co_ns_7', 'Number Systems & Binary Arithmetic', 'Medium',
    'Booth\'s Multiplication Algorithm is primarily used to multiply signed binary numbers because:',
    ['It eliminates additions completely', 'It skips strings of consecutive 1s and 0s, speeding up signed multiplication', 'It only works with positive unsigned numbers', 'It requires half the number of hardware flip-flops'], 1,
    'Booth\'s algorithm treats contiguous blocks of 1s (like 01110) as 2^k - 2^m (e.g. +16 - 2), replacing multiple shift-adds with a single subtraction and single addition, optimizing signed multiplication.'),
  q('co_ns_8', 'Number Systems & Binary Arithmetic', 'Medium',
    'What is the representation of +0 and -0 in IEEE 754 single precision?',
    ['Both have all 32 bits set to zero', 'Both have exponent and fraction as 0, differentiated only by sign bit (0 for +0, 1 for -0)', 'Negative zero does not exist in IEEE 754', 'Exponent is 255 and fraction is 0'], 1,
    'IEEE 754 distinguishes +0 (sign = 0, exponent = 0, fraction = 0) and -0 (sign = 1, exponent = 0, fraction = 0), although numerical comparison treats them as equal.'),
  q('co_ns_9', 'Number Systems & Binary Arithmetic', 'Hard',
    'What happens when calculating the difference between two normalized IEEE 754 floating point numbers that are very close to each other?',
    ['Gradual underflow occurs', 'Catastrophic cancellation occurs, causing severe loss of significant digits', 'Overflow occurs, yielding Infinity', 'Division by zero trap is fired'], 1,
    'Catastrophic cancellation is a phenomenon in floating-point arithmetic where subtracting two nearly equal numbers cancels out the most significant digits, leaving only rounding noise in the remaining low-order bits.'),
  q('co_ns_10', 'Number Systems & Binary Arithmetic', 'Hard',
    'In an arithmetic logic unit, what is the maximum number of bits required to store the exact product of two n-bit signed integers?',
    ['n bits', '2n - 1 bits', '2n bits', 'n^2 bits'], 2,
    'Multiplying two n-bit integers can produce a result up to (-2^(n-1)) * (-2^(n-1)) = 2^(2n-2), which requires exactly 2n bits in the product register (e.g., multiplying two 32-bit registers requires 64 bits).'),

  // 2. Logic Gates & Boolean Algebra
  q('co_lg_1', 'Logic Gates & Boolean Algebra', 'Easy',
    'Which of the following gates are known as "Universal Gates"?',
    ['AND and OR', 'NAND and NOR', 'XOR and XNOR', 'NOT and AND'], 1,
    'NAND and NOR gates are universal gates because any combinational logic function (AND, OR, NOT, XOR) can be constructed using only NAND or only NOR gates.'),
  q('co_lg_2', 'Logic Gates & Boolean Algebra', 'Easy',
    'According to De Morgan\'s theorem, the expression (A . B)\' is equivalent to:',
    ['A\' . B\'', 'A\' + B\'', '(A + B)\'', 'A + B'], 1,
    'De Morgan\'s First Law states: (A . B)\' = A\' + B\'. The complement of a product is equal to the sum of the complements.'),
  q('co_lg_3', 'Logic Gates & Boolean Algebra', 'Easy',
    'What is the output of an XOR gate when both inputs are identical (both 0 or both 1)?',
    ['0', '1', 'High Impedance (Z)', 'Indeterminate'], 0,
    'An XOR (Exclusive OR) gate outputs 1 if and only if the inputs are different. When both inputs are identical (0 XOR 0 or 1 XOR 1), the output is 0.'),
  q('co_lg_4', 'Logic Gates & Boolean Algebra', 'Easy',
    'What is the Boolean simplification of A + A\'B?',
    ['A', 'B', 'A + B', 'A . B'], 2,
    'Using distributive law: A + A\'B = (A + A\')(A + B) = 1 . (A + B) = A + B.'),
  q('co_lg_5', 'Logic Gates & Boolean Algebra', 'Medium',
    'A Karnaugh Map (K-Map) groups adjacent minterms using Gray code ordering primarily because:',
    ['It allows decimal numbers to be directly grouped', 'Adjacent cells differ by exactly one bit, enabling simplification using X + X\' = 1', 'It minimizes the total propagation delay of the circuit', 'It avoids dynamic hazards in flip-flops'], 1,
    'Gray code guarantees that adjacent horizontal and vertical cells in a K-map differ by only one binary variable. When two adjacent cells are grouped, that single changing variable is eliminated.'),
  q('co_lg_6', 'Logic Gates & Boolean Algebra', 'Medium',
    'How many 2-input NAND gates are required to implement a 2-input XOR gate?',
    ['3', '4', '5', '6'], 1,
    'A 2-input XOR gate (A\'B + AB\') can be realized using exactly 4 NAND gates: Gate 1 computes (AB)\'. Gates 2 and 3 combine A with (AB)\' and B with (AB)\'. Gate 4 combines the outputs of Gates 2 and 3.'),
  q('co_lg_7', 'Logic Gates & Boolean Algebra', 'Medium',
    'What is a "Static 1-hazard" in combinational circuits?',
    ['An output is supposed to remain 0 but momentarily pulses to 1', 'An output is supposed to remain 1 but momentarily glitches to 0 due to unequal path delays', 'A clock signal has duty cycle distortion', 'A register loses its state due to leakage'], 1,
    'A static 1-hazard occurs when an output is expected to stay at logic 1 during an input transition, but due to propagation delay differences across parallel paths, the output temporarily glitches to 0.'),
  q('co_lg_8', 'Logic Gates & Boolean Algebra', 'Medium',
    'What is the dual of the Boolean expression A + B . C = (A + B) . (A + C)?',
    ['A . (B + C) = (A . B) + (A . C)', 'A\' + B\' . C\' = (A\' + B\') . (A\' + C\')', 'A . B + C = (A + B) . C', 'A + (B . C)\' = A\' . B . C'], 0,
    'To find the dual of any Boolean expression, replace all AND (.) operators with OR (+), replace all OR (+) with AND (.), and swap 0 and 1, leaving variable literals unchanged.'),
  q('co_lg_9', 'Logic Gates & Boolean Algebra', 'Hard',
    'In Quine-McCluskey tabular method for Boolean minimization, an "Essential Prime Implicant" is defined as:',
    ['A prime implicant that has the lowest hardware cost', 'A prime implicant that covers at least one minterm not covered by any other prime implicant', 'A minterm that can never be simplified', 'A prime implicant containing don\'t-care conditions only'], 1,
    'An Essential Prime Implicant (EPI) covers at least one minterm that is uniquely covered by this implicant alone. All EPIs MUST be included in the final minimal sum-of-products expression.'),
  q('co_lg_10', 'Logic Gates & Boolean Algebra', 'Hard',
    'How many distinct Boolean functions of n variables can be formed?',
    ['2^n', '2^(2^n)', 'n^2', '2^(n-1)'], 1,
    'For n Boolean variables, there are 2^n possible input combinations in the truth table. Each combination can produce either 0 or 1. Hence, total possible functions = 2^(2^n). For n=2, there are 2^(2^2) = 16 functions.'),

  // 3. Combinational Circuits
  q('co_cc_1', 'Combinational Circuits', 'Easy',
    'What are the Sum (S) and Carry (C) expressions for a Half Adder with inputs A and B?',
    ['S = A . B, C = A + B', 'S = A XOR B, C = A . B', 'S = A + B, C = A XOR B', 'S = A XNOR B, C = A . B'], 1,
    'A half adder adds two 1-bit inputs: Sum S = A XOR B, Carry C = A . B.'),
  q('co_cc_2', 'Combinational Circuits', 'Easy',
    'How many select lines are required for a 16-to-1 Multiplexer (MUX)?',
    ['2', '4', '8', '16'], 1,
    'For an N-to-1 multiplexer, 2^m = N, where m is the number of select lines. Since 2^4 = 16, exactly 4 select lines are required.'),
  q('co_cc_3', 'Combinational Circuits', 'Easy',
    'A 3-to-8 Decoder with active-high outputs will activate how many output lines for any valid 3-bit input code?',
    ['All 8 lines', 'Exactly 1 line', '3 lines', '4 lines'], 1,
    'A binary decoder activates exactly one unique output line corresponding to the decimal value of the binary input code.'),
  q('co_cc_4', 'Combinational Circuits', 'Easy',
    'What is the primary function of a Priority Encoder?',
    ['It divides clock frequency', 'If multiple inputs are asserted simultaneously, it generates the code for the input with the highest priority', 'It acts as an analog-to-digital converter', 'It stores 8 bits of data'], 1,
    'Unlike standard encoders where only one input is allowed active, a priority encoder accommodates multiple simultaneous active inputs and produces the output code corresponding to the highest-priority input.'),
  q('co_cc_5', 'Combinational Circuits', 'Medium',
    'How many 4-to-1 multiplexers are required to construct a 16-to-1 multiplexer without additional logic gates?',
    ['4', '5', '8', '16'], 1,
    'To build a 16:1 MUX using 4:1 MUXes: First stage uses 4 MUXes (taking 4 inputs each = 16 inputs). Second stage uses 1 MUX to select among the outputs of the 4 first-stage MUXes. Total = 4 + 1 = 5.'),
  q('co_cc_6', 'Combinational Circuits', 'Medium',
    'What is the key advantage of a Carry Lookahead Adder (CLA) over a Ripple Carry Adder (RCA)?',
    ['Lower gate count', 'Propagation delay is independent of the number of bits n because carry signals are generated in parallel', 'Uses less power', 'Operates asynchronously without clock lines'], 1,
    'In RCA, carry bits ripple sequentially through n stages yielding O(n) delay. In CLA, Carry Generate (G = A.B) and Carry Propagate (P = A XOR B) logic calculates all carries in parallel, reducing delay to O(1) or O(log n).'),
  q('co_cc_7', 'Combinational Circuits', 'Medium',
    'A Full Adder can be constructed using:',
    ['Two Half Adders and one OR gate', 'Two Half Adders and one AND gate', 'Two Half Subtractors and one NOT gate', 'One Half Adder and one OR gate'], 0,
    'A Full Adder consists of: First Half Adder computing (A XOR B) and (A.B); Second Half Adder adding Cin to (A XOR B); and an OR gate combining the two partial carry terms.'),
  q('co_cc_8', 'Combinational Circuits', 'Medium',
    'What circuit is commonly used to convert a 4-bit binary input to drive a 7-segment LED display?',
    ['4-to-16 Demultiplexer', 'BCD-to-7-Segment Decoder', '4-bit Barrel Shifter', 'Parity Checker'], 1,
    'A BCD-to-7-segment decoder takes a 4-bit BCD digit (0-9) and activates the corresponding segment lines (a through g) to render the numeric character on the display.'),
  q('co_cc_9', 'Combinational Circuits', 'Hard',
    'How many 2-to-4 decoders with enable inputs are required to construct a 4-to-16 decoder?',
    ['4 decoders', '5 decoders', '8 decoders', '16 decoders'], 1,
    'To build a 4:16 decoder: 4 decoders form the second stage (generating 16 output lines), and 1 decoder in the first stage decodes the upper 2 bits to drive the active-high Enable inputs of the 4 second-stage decoders. Total = 5.'),
  q('co_cc_10', 'Combinational Circuits', 'Hard',
    'What is the propagation delay of an 8-bit Carry Lookahead Adder implemented with 4-bit CLA blocks compared to a simple ripple carry adder?',
    ['CLA delay grows linearly with bit width O(n), same as RCA', 'CLA calculates carry terms in parallel stages, reducing delay from O(n) to O(log n)', 'CLA has higher latency than RCA for large word lengths', 'CLA eliminates all propagation delay completely'], 1,
    'By computing generate and propagate terms across hierarchical 4-bit lookahead generator blocks (block carry lookahead), carry computation is performed in logarithmic time O(log n) rather than linear time O(n).'),

  // 4. Sequential Circuits
  q('co_sc_1', 'Sequential Circuits', 'Easy',
    'What is the fundamental difference between combinational and sequential logic circuits?',
    ['Combinational circuits use clock signals, sequential do not', 'Sequential circuits contain memory elements and their outputs depend on past as well as current inputs', 'Combinational circuits contain feedback loops', 'Sequential circuits do not use logic gates'], 1,
    'Combinational circuit outputs depend solely on present inputs. Sequential circuits possess memory elements (latches/flip-flops) and feedback, so outputs depend on current inputs and past states.'),
  q('co_sc_2', 'Sequential Circuits', 'Easy',
    'What happens in an SR Flip-Flop when both S (Set) and R (Reset) inputs are set to 1 simultaneously?',
    ['Output toggles', 'Output remains in previous state', 'Invalid/Indeterminate state occurs', 'Output becomes high-impedance'], 2,
    'In an active-high SR flip-flop, setting S=1 and R=1 attempts to drive both Q and Q\' to 0 simultaneously, violating the complementary property and causing an indeterminate/forbidden condition.'),
  q('co_sc_3', 'Sequential Circuits', 'Easy',
    'Which flip-flop resolves the indeterminate condition of the SR flip-flop by toggling when both inputs are 1?',
    ['D Flip-Flop', 'T Flip-Flop', 'JK Flip-Flop', 'Master-Slave SR Flip-Flop'], 2,
    'The JK flip-flop eliminates the invalid state: when J=1 and K=1, the output toggles (Q_next = Q\') on each clock pulse.'),
  q('co_sc_4', 'Sequential Circuits', 'Easy',
    'A D (Data / Delay) Flip-Flop has its Next State Q(t+1) equal to:',
    ['Q(t)\'', 'D', 'D XOR Q(t)', '0 always'], 1,
    'The D flip-flop transfers the logic level present at its D input directly to the Q output upon the triggering clock edge (Q(t+1) = D).'),
  q('co_sc_5', 'Sequential Circuits', 'Medium',
    'What is the "Race Around Condition" in a level-triggered JK flip-flop and when does it occur?',
    ['When clock frequency is too low', 'When J=1, K=1, and clock pulse width (tp) is greater than flip-flop propagation delay (tpd), causing repeated toggling during a single pulse', 'When input setup time is violated', 'When both inputs are 0'], 1,
    'Race-around occurs in level-triggered JK flip-flops when J=K=1 and the clock stays high longer than the flip-flop propagation delay (tp > tpd). The output continuously oscillates between 0 and 1 before the clock goes low.'),
  q('co_sc_6', 'Sequential Circuits', 'Medium',
    'How does a Master-Slave JK Flip-Flop eliminate the race-around condition?',
    ['By increasing internal resistor values', 'By isolating input and output using two stages triggered on opposite clock edges (Master active on clock high, Slave active on clock edge/low)', 'By disallowing J=1 and K=1 inputs', 'By using asynchronous reset'], 1,
    'In a Master-Slave flip-flop, the Master stage captures input when Clock is high while the Slave is disabled. When Clock goes low, Master is isolated and the Slave transfers the state to output. Since output cannot loop back to master during slave update, racing is eliminated.'),
  q('co_sc_7', 'Sequential Circuits', 'Medium',
    'What is "Setup Time" (t_setup) of a flip-flop?',
    ['The time clock must remain high', 'The minimum time the data input must remain stable before the arrival of the active clock edge', 'The minimum time the data input must remain stable after the clock edge', 'The time taken by flip-flop output to change'], 1,
    'Setup time (t_setup) is the mandatory duration for which the data signal must remain constant and stable prior to the triggering clock edge to ensure reliable latching.'),
  q('co_sc_8', 'Sequential Circuits', 'Medium',
    'How many flip-flops are required to build a Mod-12 counter?',
    ['3', '4', '6', '12'], 1,
    'A counter with modulus M requires n flip-flops such that 2^(n-1) < M <= 2^n. For Mod-12: 2^3 = 8 < 12 <= 2^4 = 16. Hence, 4 flip-flops are required.'),
  q('co_sc_9', 'Sequential Circuits', 'Hard',
    'What is "Metastability" in digital sequential circuits?',
    ['A state where clock frequency exceeds 5 GHz', 'An indeterminate intermediate voltage level between 0 and 1 caused by setup or hold time violations, taking unpredictable time to resolve', 'Permanent physical gate breakdown caused by ESD', 'A condition where counter skips states'], 1,
    'Metastability occurs when asynchronous inputs violate setup or hold times. The flip-flop output enters an unstable equilibrium between logic 0 and 1, taking an unbounded and unpredictable duration to settle to a valid binary state.'),
  q('co_sc_10', 'Sequential Circuits', 'Hard',
    'In a Mealy state machine compared to a Moore state machine:',
    ['Mealy outputs depend only on the current state', 'Mealy outputs depend on both the current state and the current inputs, potentially requiring fewer states', 'Moore outputs respond faster to input changes than Mealy', 'Mealy machines cannot be implemented with D flip-flops'], 1,
    'In a Mealy machine, outputs are a function of (current state, current inputs), meaning output changes immediately with input changes, often requiring fewer states than a Moore machine whose outputs depend solely on the current state.'),

  // 5. Computer Architecture Types (Von Neumann vs Harvard, RISC vs CISC)
  q('co_arch_1', 'Computer Architecture Types', 'Easy',
    'What is the primary characteristic of the Von Neumann architecture?',
    ['Separate physical memory buses for instructions and data', 'Shared single memory and common bus for both instructions and data', 'No program counter register', 'Hardware-based floating point unit only'], 1,
    'In the Von Neumann architecture, both program instructions and application data share the same physical memory space and system bus, leading to the Von Neumann bottleneck.'),
  q('co_arch_2', 'Computer Architecture Types', 'Easy',
    'What is the key advantage of the Harvard architecture over Von Neumann?',
    ['Lower hardware cost', 'Simultaneous instruction fetch and data read/write due to separate physical buses and memories', 'Simpler compiler design', 'Elimination of cache memory'], 1,
    'Harvard architecture provides physically separate memory pathways for code and data, permitting simultaneous instruction fetching and data memory access without bus contention.'),
  q('co_arch_3', 'Computer Architecture Types', 'Easy',
    'Which of the following is a characteristic of RISC (Reduced Instruction Set Computer) processors?',
    ['Variable instruction length and complex addressing modes', 'Fixed-length instructions, load-store architecture, and single-cycle execution of simple instructions', 'Instructions perform arithmetic directly on memory operands', 'Microprogrammed control unit with dense microcode'], 1,
    'RISC design focuses on a small, highly optimized set of fixed-length instructions, load/store architecture (only LOAD/STORE access memory), and hardwired control for pipelining efficiency.'),
  q('co_arch_4', 'Computer Architecture Types', 'Easy',
    'Which processor architecture is typical of Intel x86 processors?',
    ['Pure RISC', 'CISC (Complex Instruction Set Computer) with internal RISC-like micro-ops', 'Pure Harvard without cache', 'VLIW only'], 1,
    'Intel x86 is historically CISC. Modern x86 processors maintain CISC ISA compatibility externally while hardware decoders translate CISC instructions into RISC-like micro-operations (uops) internally.'),
  q('co_arch_5', 'Computer Architecture Types', 'Medium',
    'What is the "Von Neumann Bottleneck"?',
    ['CPU arithmetic registers run too hot', 'System throughput is constrained because CPU execution speed far exceeds the throughput of the shared bus between CPU and memory', 'Hard disks are slower than RAM', 'Compilation takes longer than execution'], 1,
    'The Von Neumann bottleneck refers to the throughput limitation caused by the shared bus between CPU and memory. Since CPU processing speed grew much faster than bus bandwidth, the CPU continually starves waiting for instructions and data.'),
  q('co_arch_6', 'Computer Architecture Types', 'Medium',
    'In RISC architectures, why is "Load-Store Architecture" enforced?',
    ['To prevent memory from being upgraded', 'Arithmetic and logical instructions operate exclusively on registers, simplifying CPU datapath and pipelining', 'Because RISC processors have no data memory', 'To allow variable-length instructions'], 1,
    'In Load-Store architectures, ALU instructions cannot access RAM directly; they operate solely on CPU registers. Only explicit LOAD and STORE instructions touch memory, keeping instruction timing predictable for pipelining.'),
  q('co_arch_7', 'Computer Architecture Types', 'Medium',
    'What is the principle behind VLIW (Very Long Instruction Word) architecture?',
    ['The CPU dynamically reorders instructions at runtime using hardware schedulers', 'The compiler packs multiple independent operations into a single very long instruction word to be executed in parallel', 'Instructions are 8 bits wide to save ROM', 'Instructions are executed purely sequentially in one ALU'], 1,
    'VLIW shifts instruction-level parallelism (ILP) scheduling from runtime hardware logic to compile-time analysis. The compiler bundles multiple independent instructions into one large word that executes across parallel functional units.'),
  q('co_arch_8', 'Computer Architecture Types', 'Medium',
    'Where is the modified Harvard architecture most commonly used today?',
    ['Vintage mainframes only', 'Modern CPUs and DSPs, where separate L1 instruction and data caches provide Harvard separation while unified L2/L3 and main RAM provide Von Neumann unity', 'In mechanical calculators', 'Purely in quantum processors'], 1,
    'Modern processors (like ARM Cortex and Intel Core) use a modified Harvard architecture: split L1 Instruction and Data caches to achieve concurrent access, backed by unified L2/L3 caches and main RAM for program flexibility.'),
  q('co_arch_9', 'Computer Architecture Types', 'Hard',
    'According to Flynn\'s Taxonomy, modern multi-core CPUs with AVX/NEON vector extensions are best classified as:',
    ['SISD only', 'MIMD with internal SIMD processing units', 'MISD exclusively', 'SIMD only'], 1,
    'Modern multi-core processors are MIMD (Multiple Instruction, Multiple Data) systems because multiple independent cores run different instruction streams simultaneously, while each core features SIMD (Single Instruction, Multiple Data) vector units (AVX, NEON) for data parallelism.'),
  q('co_arch_10', 'Computer Architecture Types', 'Hard',
    'Why do CISC architectures typically have higher code density (smaller binary program size) than RISC?',
    ['CISC uses lossless compression on the binary', 'Single CISC instructions can encode complex multi-step operations and variable-length encodings, requiring fewer instructions per task', 'RISC compilers omit debug symbols', 'CISC registers are twice as large'], 1,
    'Because CISC instructions can perform memory access and arithmetic in a single instruction (e.g. `ADD [EAX], EBX`) and use variable instruction byte lengths, programs require fewer instructions and less memory storage than equivalent RISC code.'),

  // 6. Instruction Formats & Addressing Modes
  q('co_if_1', 'Instruction Formats & Addressing Modes', 'Easy',
    'In which addressing mode is the operand specified directly within the instruction itself?',
    ['Direct Addressing', 'Immediate Addressing', 'Register Indirect Addressing', 'Indexed Addressing'], 1,
    'In Immediate Addressing (e.g., `MOV R1, #25`), the operand data is part of the instruction itself, requiring no memory access to fetch the data.'),
  q('co_if_2', 'Instruction Formats & Addressing Modes', 'Easy',
    'In Direct (Absolute) Addressing mode, the address field of the instruction contains:',
    ['The actual data value', 'The effective memory address where the operand is located', 'A CPU register number holding the operand', 'An offset relative to the program counter'], 1,
    'In Direct Addressing mode, the instruction explicitly contains the effective memory address of the operand (e.g., `LOAD 2000H`).'),
  q('co_if_3', 'Instruction Formats & Addressing Modes', 'Easy',
    'What register holds the address of the next instruction to be fetched and executed?',
    ['Instruction Register (IR)', 'Program Counter (PC)', 'Memory Buffer Register (MBR)', 'Accumulator (ACC)'], 1,
    'The Program Counter (PC) stores the memory address of the next sequential instruction to be fetched from memory.'),
  q('co_if_4', 'Instruction Formats & Addressing Modes', 'Easy',
    'Which addressing mode is most useful for implementing position-independent code (PIC) and relative branching?',
    ['Base-Register Addressing', 'PC-Relative Addressing', 'Immediate Addressing', 'Direct Addressing'], 1,
    'PC-Relative addressing calculates the effective address as (PC + Offset). Because the branch target is specified relative to current instruction location, the code can be loaded anywhere in RAM without relinking.'),
  q('co_if_5', 'Instruction Formats & Addressing Modes', 'Medium',
    'In Register Indirect Addressing mode, how is the operand retrieved?',
    ['Directly from the instruction op-code', 'The instruction specifies a register that contains the memory address of the operand', 'The instruction points to a hard drive sector', 'The operand is stored in the program counter'], 1,
    'In Register Indirect addressing (e.g., `MOV A, @R0` or `MOV EAX, [EBX]`), the specified register holds a pointer (memory address) to the actual operand in RAM.'),
  q('co_if_6', 'Instruction Formats & Addressing Modes', 'Medium',
    'Which addressing mode is ideal for accessing elements of an array in a loop?',
    ['Immediate Addressing', 'Indexed Addressing / Base-Index Addressing', 'Direct Addressing', 'Implied Addressing'], 1,
    'Indexed addressing computes Effective Address = (Base Address + Index Register). Incrementing the index register in a loop sequentially steps through adjacent array elements cleanly.'),
  q('co_if_7', 'Instruction Formats & Addressing Modes', 'Medium',
    'How many memory accesses are required to fetch the operand in "Memory Indirect Addressing" mode?',
    ['0', '1', '2', '3'], 1, // Effective address fetch + data fetch = 2 memory accesses
    'Memory Indirect Addressing requires 2 memory accesses: first access reads the pointer (effective address) stored in memory, and second access reads the actual operand data from that effective address.'),
  q('co_if_8', 'Instruction Formats & Addressing Modes', 'Medium',
    'What is "Auto-increment" and "Auto-decrement" addressing primarily used for in instruction sets?',
    ['Floating-point conversions', 'Push and Pop stack operations, and linear buffer traversals', 'Virtual memory paging', 'DMA controller arbitration'], 1,
    'Auto-increment and auto-decrement automatically increment/decrement the pointer register before or after memory access, making them ideal for hardware stack operations (PUSH/POP) and string copy loops.'),
  q('co_if_9', 'Instruction Formats & Addressing Modes', 'Hard',
    'A CPU has a 32-bit instruction format with 3-address instructions. If there are 64 opcodes and 32 registers, how many bits remain for an immediate constant?',
    ['11 bits', '16 bits', '21 bits', '6 bits'], 0,
    'Opcode: 64 operations = 2^6 -> 6 bits. 3 register fields: each register from 32 registers needs log2(32) = 5 bits. If 2 are registers (10 bits) and 1 is immediate: 32 - (6 + 5 + 5 + 5) = 11 bits remaining.'),
  q('co_if_10', 'Instruction Formats & Addressing Modes', 'Hard',
    'What is the purpose of the "Expanding Opcode" technique in instruction set encoding?',
    ['To double register file size', 'To allow instructions of different formats (varying number of operands) to coexist within a fixed instruction word length', 'To increase clock frequency', 'To enable out-of-order execution'], 1,
    'Expanding opcode technique uses unused bit combinations of shorter opcode fields to escape into longer opcodes, allowing 3-address, 2-address, 1-address, and 0-address instructions to share a fixed-length instruction word.'),

  // 7. CPU Datapath, Control Unit & ALU
  q('co_dp_1', 'CPU Datapath, Control Unit & ALU', 'Easy',
    'What is the function of the Instruction Register (IR)?',
    ['It points to the next instruction address', 'It holds the instruction currently being decoded and executed', 'It stores the result of ALU operations', 'It handles DMA requests'], 1,
    'Once an instruction is fetched from memory, it is loaded into the Instruction Register (IR), where the Control Unit decodes its opcode and operands.'),
  q('co_dp_2', 'CPU Datapath, Control Unit & ALU', 'Easy',
    'What are the two primary types of Control Units used in CPU design?',
    ['Static and Dynamic', 'Hardwired and Microprogrammed', 'Synchronous and Asynchronous', 'RISC and CISC'], 1,
    'Control units are implemented either as Hardwired (fixed combinational logic gates and state machines, optimized for speed) or Microprogrammed (control signals stored in a microcode ROM).'),
  q('co_dp_3', 'CPU Datapath, Control Unit & ALU', 'Easy',
    'What register interfaces the CPU with the memory data bus during read and write operations?',
    ['MAR (Memory Address Register)', 'MBR (Memory Buffer Register) / MDR (Memory Data Register)', 'PC (Program Counter)', 'CIR (Current Instruction Register)'], 1,
    'The Memory Buffer Register (MBR) or Memory Data Register (MDR) holds the actual data or instruction word being read from or written to main memory via the data bus.'),
  q('co_dp_4', 'CPU Datapath, Control Unit & ALU', 'Easy',
    'Which register holds the memory address from which data is fetched or to which data is written?',
    ['MAR (Memory Address Register)', 'MDR (Memory Data Register)', 'Accumulator', 'Status Register'], 0,
    'The Memory Address Register (MAR) holds the physical address on the memory bus where the CPU wants to read or write.'),
  q('co_dp_5', 'CPU Datapath, Control Unit & ALU', 'Medium',
    'What is the main advantage of a Hardwired Control Unit over a Microprogrammed Control Unit?',
    ['Easier to modify and update instruction sets', 'Faster execution speed because signals are generated directly by logic gates without ROM lookup latency', 'Lower hardware gate count', 'Supports variable length microcode'], 1,
    'Hardwired control units generate control signals directly via combinational logic circuits (decoders and flip-flops), making them significantly faster than microprogrammed units that must fetch micro-instructions from control memory.'),
  q('co_dp_6', 'CPU Datapath, Control Unit & ALU', 'Medium',
    'What is the difference between Horizontal and Vertical Microcode in microprogrammed control units?',
    ['Horizontal is for 64-bit CPUs, vertical is for 32-bit CPUs', 'Horizontal has one control bit per hardware control line (wide, unencoded, faster); Vertical encodes control bits into fields, requiring decoders (narrower, compact)', 'Vertical uses flash memory, horizontal uses SRAM', 'Horizontal microcode cannot branch'], 1,
    'Horizontal microcode provides 1 bit per control signal without encoding (wide words, high parallelism, faster execution). Vertical microcode groups mutually exclusive signals into encoded bitfields (narrow words, requires decoders, saves control store memory).'),
  q('co_dp_7', 'CPU Datapath, Control Unit & ALU', 'Medium',
    'What role does the Status Register / Flags Register play in the CPU ALU datapath?',
    ['Stores temporary instruction bytes', 'Contains conditional status bits (Zero, Carry, Sign, Overflow, Parity) set by ALU operations for branch evaluations', 'Buffers keyboard scan codes', 'Controls system clock frequency'], 1,
    'The Status Register holds condition flags (Z=Zero, C=Carry, S=Sign, V=Overflow) reflecting the outcome of the most recent ALU computation, used by conditional jump/branch instructions.'),
  q('co_dp_8', 'CPU Datapath, Control Unit & ALU', 'Medium',
    'During the "Fetch" cycle of a basic instruction cycle, what micro-operations occur?',
    ['ALU calculates result and stores in register', 'MAR <- PC; MBR <- Memory[MAR]; PC <- PC + 4; IR <- MBR', 'IR <- MAR; MDR <- ACC; PC <- 0', 'Memory[MAR] <- MBR; PC <- PC - 1'], 1,
    'In Fetch: 1) MAR receives PC; 2) Memory read places instruction into MBR while PC is incremented; 3) Instruction is transferred from MBR to IR for decoding.'),
  q('co_dp_9', 'CPU Datapath, Control Unit & ALU', 'Hard',
    'In a single-bus CPU organization, why cannot two registers place their contents onto the internal bus simultaneously?',
    ['Bus arbitration chip will overheat', 'Bus contention / short circuit occurs, garbling data because only one source can drive a shared bus at a time', 'Memory clock will become desynchronized', 'ALU will produce an overflow flag'], 1,
    'A shared internal CPU bus allows only one tri-state buffer or register driver to assert signals at any given clock cycle. Multiple simultaneous assertions cause bus contention, electrical damage, and undefined logic levels.'),
  q('co_dp_10', 'CPU Datapath, Control Unit & ALU', 'Hard',
    'What is "Nanoprogramming" in computer control unit design?',
    ['Programming on microscopic quantum processors', 'A two-level control store architecture where micro-instructions point to nano-instructions to eliminate redundant control words and minimize total ROM size', 'Direct assembly in machine cycles', 'Microcode executed on GPU shaders'], 1,
    'Nanoprogramming employs two levels of control store: micro-instructions contain addresses into a smaller "nano-store" containing unique control signal patterns. This eliminates duplicate control words in CISC control memory.'),

  // 8. Pipelining & Pipeline Hazards
  q('co_pl_1', 'Pipelining & Pipeline Hazards', 'Easy',
    'What is the primary objective of Instruction Pipelining in modern CPUs?',
    ['To reduce the execution time (latency) of an individual instruction', 'To increase instruction execution throughput by overlapping the execution of multiple instructions', 'To reduce the physical silicon area of the CPU die', 'To eliminate the need for registers'], 1,
    'Pipelining does not decrease individual instruction latency; it dramatically increases instruction throughput (instructions completed per clock cycle) by executing different phases of multiple instructions in parallel.'),
  q('co_pl_2', 'Pipelining & Pipeline Hazards', 'Easy',
    'In an ideal k-stage linear pipeline without stalls or hazards, what is the theoretical maximum speedup over a non-pipelined processor?',
    ['k/2', 'k', 'k^2', '2^k'], 1,
    'Under ideal conditions with continuous instruction flow and zero pipeline stalls, an instruction completes every clock cycle, achieving a maximum theoretical speedup equal to the number of stages k.'),
  q('co_pl_3', 'Pipelining & Pipeline Hazards', 'Easy',
    'What are the three fundamental classes of pipeline hazards?',
    ['Cache, Memory, and Bus hazards', 'Structural, Data, and Control hazards', 'Arithmetic, Logic, and Floating-point hazards', 'Static, Dynamic, and Metastable hazards'], 1,
    'The 3 classic pipeline hazards are: Structural (hardware resource conflict), Data (data dependency between instructions), and Control (branching/jumping decisions altering execution flow).'),
  q('co_pl_4', 'Pipelining & Pipeline Hazards', 'Easy',
    'What is a "Pipeline Bubble" or "Stall"?',
    ['A hardware cooling failure', 'An idle cycle inserted into one or more pipeline stages to resolve a hazard before execution can proceed', 'An overflow in the ALU register', 'A branch instruction executed backwards'], 1,
    'A stall or bubble is a null operation (NOP) injected into the pipeline, holding back dependent instructions until hazard conditions clear and required data or resources become available.'),
  q('co_pl_5', 'Pipelining & Pipeline Hazards', 'Medium',
    'Which data hazard occurs when an instruction attempts to read a register before a preceding instruction writes to it?',
    ['RAW (Read-After-Write) / True Dependency', 'WAR (Write-After-Read) / Anti-Dependency', 'WAW (Write-After-Write) / Output Dependency', 'RAR (Read-After-Read)'], 0,
    'RAW (Read-After-Write) is a true data dependency where Instruction B requires data generated by Instruction A before A has committed the write.'),
  q('co_pl_6', 'Pipelining & Pipeline Hazards', 'Medium',
    'How does "Operand Forwarding" (Data Bypassing) alleviate RAW data hazards?',
    ['By executing instructions backwards', 'By routing the calculated result directly from an ALU execution stage to dependent instruction inputs without waiting for register write-back', 'By duplicating registers in memory', 'By stalling the clock for 4 cycles'], 1,
    'Operand forwarding detects data dependencies and routes the output from the ALU/MEM stage registers directly back to the ALU input multiplexers of the next cycle, eliminating stalls without waiting for the Write-Back stage.'),
  q('co_pl_7', 'Pipelining & Pipeline Hazards', 'Medium',
    'What is "Branch Prediction" used for in pipelined processors?',
    ['To predict CPU overheating', 'To guess whether a conditional branch will be taken or not before condition evaluation, avoiding pipeline flushes', 'To automatically fix compilation bugs', 'To predict RAM capacity requirements'], 1,
    'Branch prediction speculates on the target instruction stream of conditional branches so the instruction fetch unit continues loading instructions without stalling until branch resolution.'),
  q('co_pl_8', 'Pipelining & Pipeline Hazards', 'Medium',
    'What happens when a branch misprediction occurs in a deep pipeline?',
    ['The CPU halts permanently', 'All speculatively fetched and partially executed instructions in the pipeline must be flushed (squashed), discarding their results and causing latency penalty', 'Memory is corrupted', 'Operating system restarts'], 1,
    'When a branch was predicted incorrectly, all speculatively fetched instructions in flight must be discarded (flushed) and the pipeline refilled from the correct branch address, costing multiple wasted cycles.'),
  q('co_pl_9', 'Pipelining & Pipeline Hazards', 'Hard',
    'Tomasulo\'s Algorithm resolves WAR and WAW hazards dynamically by using:',
    ['D-latches and delay lines', 'Reservation Stations and Register Renaming via Common Data Bus (CDB)', 'Static compiler reordering only', 'Pure Harvard cache split'], 1,
    'Tomasulo\'s algorithm uses Reservation Stations at each functional unit and dynamic register renaming over a Common Data Bus (CDB) to eliminate WAR (anti-dependencies) and WAW (output dependencies) for out-of-order execution.'),
  q('co_pl_10', 'Pipelining & Pipeline Hazards', 'Hard',
    'In a 5-stage classic RISC pipeline (IF, ID, EX, MEM, WB) running at 2 GHz, a program has 20% branch instructions, of which 70% are taken. If branch decisions are resolved in EX stage (2 cycle penalty for taken branches without prediction), what is the average CPI assuming base CPI = 1?',
    ['1.0', '1.14', '1.28', '1.40'], 2,
    'Stall penalty occurs on taken branches: Fraction of taken branches = 20% * 70% = 0.14. Penalty per taken branch = 2 cycles. Average CPI = 1.0 + (0.14 * 2) = 1.28.'),

  // 9. Memory Hierarchy & Cache Memory
  q('co_cm_1', 'Memory Hierarchy & Cache Memory', 'Easy',
    'What is the primary reason for having a memory hierarchy in computer systems?',
    ['To make the computer physically lighter', 'To bridge the speed, cost, and capacity gap between fast but expensive CPU registers and slow but cheap secondary storage', 'To prevent viruses from spreading', 'To allow multiple operating systems to run concurrently'], 1,
    'Memory hierarchy balances speed, capacity, and cost: fast, small, expensive memories (SRAM cache) sit near the CPU, backed by larger, slower, cheaper storage (DRAM, SSDs).'),
  q('co_cm_2', 'Memory Hierarchy & Cache Memory', 'Easy',
    'What is the difference between Temporal Locality and Spatial Locality?',
    ['Temporal locality is locality in space, spatial is in time', 'Temporal: recently accessed data is likely to be accessed again soon; Spatial: data stored at nearby addresses is likely to be accessed soon', 'Both refer only to disk storage sectors', 'Temporal applies to registers, spatial applies to network'], 1,
    'Temporal locality: recently referenced memory locations are likely to be accessed again soon (e.g., loops). Spatial locality: memory locations near the recently accessed item are likely to be accessed soon (e.g., arrays).'),
  q('co_cm_3', 'Memory Hierarchy & Cache Memory', 'Easy',
    'What is a "Cache Hit" versus a "Cache Miss"?',
    ['Cache hit means cache is full, miss means cache is empty', 'Cache hit: requested memory word is found in cache; Cache miss: requested word is not found, requiring fetch from slower main RAM', 'Cache hit means data corrupted, miss means data intact', 'Hit refers to L1, miss refers to L2'], 1,
    'When the CPU searches cache for an address: a Hit occurs if the tag matches a valid line; a Miss occurs if absent, requiring retrieval from lower memory levels with miss penalty.'),
  q('co_cm_4', 'Memory Hierarchy & Cache Memory', 'Easy',
    'In Direct-Mapped Cache, how many cache block locations can a given memory block map to?',
    ['Any location in the entire cache', 'Exactly one specific cache block given by (Block Address mod Number of Cache Blocks)', 'Any block within a chosen set of 4 blocks', 'Two locations: odd and even'], 1,
    'In direct-mapped cache, each main memory block maps to exactly one predetermined line in cache: Index = (Block Address) mod (Total Cache Lines).'),
  q('co_cm_5', 'Memory Hierarchy & Cache Memory', 'Medium',
    'What are the three fields of a memory address in a Set-Associative Cache?',
    ['Opcode, Register, Offset', 'Tag, Set Index, and Word/Byte Offset', 'Virtual Page, Frame, Segment', 'Sector, Track, Cylinder'], 1,
    'In set-associative cache, the address is broken into: Set Index (selects the set), Tag (identifies the specific block within the set), and Byte/Word Offset (identifies the exact byte within the cache line block).'),
  q('co_cm_6', 'Memory Hierarchy & Cache Memory', 'Medium',
    'What is the difference between Write-Through and Write-Back cache write policies?',
    ['Write-through writes only to cache; Write-back writes to disk', 'Write-Through writes immediately to both cache and main memory; Write-Back writes only to cache and updates main memory only when the dirty block is evicted', 'Write-back is used for ROM, write-through for RAM', 'Write-through requires no valid bit'], 1,
    'Write-Through writes simultaneously to cache and main RAM (consistent but slower). Write-Back writes only to cache, setting a "dirty bit", and writes to RAM only when that block is replaced.'),
  q('co_cm_7', 'Memory Hierarchy & Cache Memory', 'Medium',
    'Which cache replacement policy evicts the block that has not been accessed for the longest period of time?',
    ['FIFO (First-In, First-Out)', 'LRU (Least Recently Used)', 'LFU (Least Frequently Used)', 'Random Replacement'], 1,
    'LRU (Least Recently Used) keeps track of block access recency and discards the block that has remained unreferenced for the longest time, leveraging temporal locality.'),
  q('co_cm_8', 'Memory Hierarchy & Cache Memory', 'Medium',
    'What are the "3 Cs" of cache misses?',
    ['Cost, Capacity, Collision', 'Compulsory (Cold), Capacity, and Conflict misses', 'Current, Cached, Continuous misses', 'CPU, Controller, Channel misses'], 1,
    'Mark Hill classified cache misses into 3 Cs: Compulsory (first access to block), Capacity (cache cannot hold all blocks needed), and Conflict (multiple blocks compete for the same set in direct or set-associative caches).'),
  q('co_cm_9', 'Memory Hierarchy & Cache Memory', 'Hard',
    'A system has a 64 KB 4-way set-associative cache with 64-byte block size and 32-bit physical addresses. How many bits are used for Tag, Set Index, and Block Offset?',
    ['Tag: 18 bits, Set Index: 8 bits, Block Offset: 6 bits', 'Tag: 20 bits, Set Index: 6 bits, Block Offset: 6 bits', 'Tag: 16 bits, Set Index: 10 bits, Block Offset: 6 bits', 'Tag: 12 bits, Set Index: 14 bits, Block Offset: 6 bits'], 0,
    'Block size = 64 bytes = 2^6 -> Block offset = 6 bits. Total blocks = 64 KB / 64 B = 1024 blocks. With 4-way associativity: Number of sets = 1024 / 4 = 256 sets = 2^8 -> Set Index = 8 bits. Tag bits = 32 - (8 + 6) = 18 bits.'),
  q('co_cm_10', 'Memory Hierarchy & Cache Memory', 'Hard',
    'If L1 cache hit time is 1 ns with 90% hit rate, L2 cache hit time is 5 ns with 80% hit rate, and main memory access time is 100 ns, what is the Average Memory Access Time (AMAT)?',
    ['2.0 ns', '3.4 ns', '5.2 ns', '7.0 ns'], 1,
    'AMAT = HitTime_L1 + MissRate_L1 * MissPenalty_L1. MissPenalty_L1 = HitTime_L2 + MissRate_L2 * MemoryAccessTime = 5 ns + (0.20 * 100 ns) = 5 + 20 = 25 ns. AMAT = 1 ns + (0.10 * 25 ns) = 1 + 2.5 = 3.5 ns (approx 3.4-3.5 ns).'),

  // 10. Virtual Memory, TLB & Page Tables
  q('co_vm_1', 'Virtual Memory, TLB & Page Tables', 'Easy',
    'What is the primary function of Virtual Memory in modern computer systems?',
    ['To double the CPU clock speed', 'To provide each process an illusion of a large, contiguous, isolated address space and protect processes from each other', 'To eliminate the need for hard disk storage', 'To run 32-bit applications on 16-bit hardware'], 1,
    'Virtual memory gives each process its own isolated virtual address space, translates addresses to physical RAM via page tables, protects memory, and allows execution of programs larger than physical RAM via paging.'),
  q('co_vm_2', 'Virtual Memory, TLB & Page Tables', 'Easy',
    'What hardware component translates Virtual Addresses to Physical Addresses at runtime?',
    ['ALU (Arithmetic Logic Unit)', 'MMU (Memory Management Unit)', 'DMA Controller', 'Interrupt Vector Table'], 1,
    'The Memory Management Unit (MMU) is the dedicated hardware module inside or adjacent to the CPU that translates virtual memory addresses into physical RAM addresses on every reference.'),
  q('co_vm_3', 'Virtual Memory, TLB & Page Tables', 'Easy',
    'What is a TLB (Translation Lookaside Buffer)?',
    ['A buffer for audio output', 'A high-speed associative hardware cache within the MMU that stores recent virtual-to-physical page address translations', 'A register that stores network packets', 'A backup hard disk partition'], 1,
    'The TLB is an associative cache inside the MMU that caches recent page table entries (Virtual Page Number to Physical Frame Number), avoiding slow page table walks in main memory.'),
  q('co_vm_4', 'Virtual Memory, TLB & Page Tables', 'Easy',
    'What event occurs when a CPU attempts to access a virtual page whose "Present / Valid" bit is 0 in the Page Table?',
    ['Segmentation Fault and immediate system reboot', 'Page Fault exception, triggering OS kernel to load the page from disk into RAM', 'Bus error', 'Arithmetic trap'], 1,
    'When the valid/present bit is 0, the page is not in physical RAM. A Page Fault exception is trapped to the OS, which retrieves the missing page from swap space into a physical frame and updates the page table.'),
  q('co_vm_5', 'Virtual Memory, TLB & Page Tables', 'Medium',
    'Why are Multi-level Page Tables (hierarchical paging) preferred over single-level page tables in 64-bit architectures?',
    ['They make translation faster than single-level tables', 'They avoid allocating huge continuous page tables for sparse address spaces by creating page sub-tables only for allocated regions', 'They eliminate TLB misses completely', 'They reduce physical RAM size'], 1,
    'A flat single-level page table for a 64-bit space would consume gigabytes or terabytes of RAM. Multi-level page tables break address spaces into a tree hierarchy; non-existent address ranges do not require sub-table allocation.'),
  q('co_vm_6', 'Virtual Memory, TLB & Page Tables', 'Medium',
    'In an Inverted Page Table:',
    ['Entries are indexed by virtual page numbers across all processes', 'There is one entry per physical frame in RAM rather than per virtual page, greatly saving memory table space', 'Disk swap space is indexed by PID', 'Virtual memory is completely disabled'], 1,
    'An inverted page table has exactly one entry per physical memory frame (indexed by frame number), tracking which process and virtual page occupies that frame, drastically reducing table overhead in large address systems.'),
  q('co_vm_7', 'Virtual Memory, TLB & Page Tables', 'Medium',
    'What is the purpose of the "Dirty Bit" (Modified Bit) in a page table entry?',
    ['To detect viruses in memory', 'To track whether the page has been modified since being loaded from disk, indicating if it must be written back to disk on replacement', 'To check if page is read-only', 'To prevent TLB flushing'], 1,
    'The dirty bit is set by hardware whenever a write operation touches the page. If dirty = 1 when the page is evicted, the OS must write it back to disk; if dirty = 0, the page can simply be overwritten without disk write overhead.'),
  q('co_vm_8', 'Virtual Memory, TLB & Page Tables', 'Medium',
    'What happens to the TLB during a process Context Switch if the TLB does not support ASID (Address Space Identifier) tags?',
    ['The TLB must be completely flushed (invalidated) to prevent the new process from accessing previous process addresses', 'The TLB content is saved to the hard disk', 'The TLB doubles its capacity', 'The TLB converts to L2 cache'], 0,
    'Without ASID tagging, virtual addresses from different processes overlap. Therefore, the OS must flush the entire TLB on every context switch so the new process does not access invalid or stale translations.'),
  q('co_vm_9', 'Virtual Memory, TLB & Page Tables', 'Hard',
    'Consider a virtual memory system with 32-bit virtual addresses, 4 KB page size, and 4-byte page table entries. How many levels are required for a hierarchical page table if each page table page must fit within exactly one 4 KB page?',
    ['1 level', '2 levels', '3 levels', '4 levels'], 1,
    'Page size = 4 KB = 2^12 bytes -> Offset = 12 bits. Virtual Page Number (VPN) = 32 - 12 = 20 bits (1,048,576 pages). One 4 KB page table page holds 4 KB / 4 B = 1024 = 2^10 entries (10 bits per level). Thus, 20 VPN bits / 10 bits per level = 2 levels.'),
  q('co_vm_10', 'Virtual Memory, TLB & Page Tables', 'Hard',
    'In a system with TLB access time of 10 ns, memory access time of 100 ns, and a two-level page table, what is the Effective Memory Access Time (EMAT) if TLB hit ratio is 95% (assuming no page faults)?',
    ['115 ns', '120 ns', '125 ns', '135 ns'], 1,
    'TLB Hit: TLB access + Memory data access = 10 + 100 = 110 ns. TLB Miss: TLB access + 2 page table memory accesses + 1 data memory access = 10 + 100 + 100 + 100 = 310 ns. EMAT = 0.95 * 110 + 0.05 * 310 = 104.5 + 15.5 = 120 ns.'),

  // 11. I/O Organization, Interrupts & DMA
  q('co_io_1', 'I/O Organization, Interrupts & DMA', 'Easy',
    'What is the primary difference between Programmed I/O and Interrupt-Driven I/O?',
    ['Programmed I/O uses DMA; Interrupt-driven does not', 'In Programmed I/O, the CPU repeatedly polls device status in a busy-wait loop; In Interrupt-Driven I/O, the device alerts the CPU via an interrupt signal when ready', 'Interrupt-driven I/O cannot transfer data', 'Programmed I/O is faster for all peripherals'], 1,
    'In programmed I/O, the CPU wastes cycles in a polling loop waiting for device readiness. Interrupt-driven I/O frees the CPU to execute other tasks until the device signals it with an interrupt.'),
  q('co_io_2', 'I/O Organization, Interrupts & DMA', 'Easy',
    'What is the primary function of a DMA (Direct Memory Access) Controller?',
    ['To execute CPU ALU instructions', 'To transfer blocks of data directly between I/O peripherals and main memory without continuous CPU intervention', 'To manage the processor cache replacement', 'To encrypt hard disk sectors'], 1,
    'DMA allows high-speed I/O devices (like network cards and NVMe drives) to transfer data directly to and from main RAM without routing every byte through CPU registers, freeing the CPU for compute tasks.'),
  q('co_io_3', 'I/O Organization, Interrupts & DMA', 'Easy',
    'What is the difference between Memory-Mapped I/O and Isolated (Port-Mapped) I/O?',
    ['Memory-mapped I/O is only for ROM', 'In Memory-Mapped I/O, I/O device registers share the same address space and instructions as main RAM; In Port-Mapped I/O, I/O devices have separate address spaces and special IN/OUT instructions', 'Isolated I/O uses no bus', 'Memory-mapped I/O cannot handle interrupts'], 1,
    'Memory-mapped I/O maps device registers into regular memory addresses, allowing standard memory instructions (`MOV`, `LDR`). Port-mapped (Isolated) I/O uses dedicated address space accessed via special instructions (e.g., `IN`, `OUT` in x86).'),
  q('co_io_4', 'I/O Organization, Interrupts & DMA', 'Easy',
    'What is an Interrupt Service Routine (ISR)?',
    ['A hardware timer chip', 'A specific software function/handler executed by the CPU in response to a hardware or software interrupt', 'A BIOS setting for overclocking', 'A DMA channel buffer'], 1,
    'An ISR (Interrupt Handler) is the kernel code executed when a specific interrupt triggers. The CPU saves its current context, executes the ISR, and restores the interrupted state.'),
  q('co_io_5', 'I/O Organization, Interrupts & DMA', 'Medium',
    'What is the purpose of an Interrupt Vector Table (IVT)?',
    ['To record CPU temperature readings', 'To map interrupt request numbers (IRQs) to the memory starting addresses of their corresponding Interrupt Service Routines', 'To store memory addresses of damaged hard disk sectors', 'To prioritize USB packets'], 1,
    'The Interrupt Vector Table is an array in memory containing pointers to ISRs. When an interrupt vector is received, the CPU indexes this table to locate and jump to the appropriate handler code.'),
  q('co_io_6', 'I/O Organization, Interrupts & DMA', 'Medium',
    'In "Cycle Stealing" DMA mode:',
    ['The DMA controller shuts down CPU power', 'The DMA controller takes control of the system bus for one bus cycle at a time during CPU memory idle cycles, interleaving with CPU execution', 'The CPU stops entirely until several megabytes are moved', 'Data is stolen from cache'], 1,
    'In cycle stealing DMA mode, the controller requests bus access for one bus transfer cycle at a time (stealing a cycle when the CPU does not need the bus), preventing the CPU from being locked out for long periods.'),
  q('co_io_7', 'I/O Organization, Interrupts & DMA', 'Medium',
    'What is "Daisy Chaining" used for in interrupt handling?',
    ['To connect hard drives in RAID', 'Hardware priority arbitration where an interrupt acknowledge signal is passed serially through devices until the highest-priority requesting device grabs it', 'Synchronizing CPU cores', 'Testing logic gates with shift registers'], 1,
    'Daisy chaining is a serial hardware priority resolution scheme: the CPU sends an Interrupt Acknowledge (INTA) signal along a chain of devices; the first device in the chain that requested an interrupt intercepts it and places its vector on the bus.'),
  q('co_io_8', 'I/O Organization, Interrupts & DMA', 'Medium',
    'What is a "Non-Maskable Interrupt" (NMI)?',
    ['An interrupt generated only by user-level software', 'A critical, high-priority hardware interrupt (such as parity error or power loss) that cannot be ignored or disabled by CPU interrupt mask flags', 'An interrupt that operates without an ISR', 'A low priority mouse click interrupt'], 1,
    'An NMI is an urgent hardware interrupt reserved for catastrophic events (hardware memory failure, bus parity errors, imminent power loss) that cannot be masked or disabled by software interrupt enable bits.'),
  q('co_io_9', 'I/O Organization, Interrupts & DMA', 'Hard',
    'What is the "Cache Coherency" problem that arises when using DMA in systems with CPU cache?',
    ['DMA controller overheats the L2 cache', 'DMA may modify main memory while the CPU holds stale copies in cache, or CPU may update cache without writing to RAM before DMA reads RAM', 'The hard disk sectors become misaligned with cache lines', 'DMA addresses cannot fit in cache tags'], 1,
    'DMA bypasses CPU cache. If DMA writes directly to main memory, CPU cache lines for those addresses become stale. Conversely, if CPU writes to cache (Write-Back) and DMA reads RAM before eviction, DMA reads outdated data.'),
  q('co_io_10', 'I/O Organization, Interrupts & DMA', 'Hard',
    'In a DMA transfer, what does the "Burst Mode" (Block Transfer Mode) do compared to Cycle Stealing?',
    ['Transfers single bytes with random delays', 'The DMA controller gains bus mastership and holds it continuously to transfer an entire block of data uninterrupted until complete', 'Transfers data without using clock signals', 'Transfers data exclusively through CPU registers'], 1,
    'In burst mode, once the DMA controller acquires the bus, it transfers the entire contiguous data block in a continuous high-speed stream while the CPU remains paused off the system bus until the transfer completes.'),

  // 12. Secondary Storage & RAID Levels
  q('co_ss_1', 'Secondary Storage & RAID Levels', 'Easy',
    'What does the acronym RAID stand for in computer storage systems?',
    ['Random Access Integrated Drive', 'Redundant Array of Independent (or Inexpensive) Disks', 'Rapid Access Interface Device', 'Relational Array for Internal Data'], 1,
    'RAID stands for Redundant Array of Independent (or Inexpensive) Disks, combining multiple physical hard drives into a single logical unit for redundancy, performance, or both.'),
  q('co_ss_2', 'Secondary Storage & RAID Levels', 'Easy',
    'Which RAID level provides striping without parity or redundancy, offering high speed but zero fault tolerance?',
    ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6'], 0,
    'RAID 0 (Disk Striping) splits data across multiple drives for higher read/write throughput. However, failure of any single drive results in complete data loss across the array.'),
  q('co_ss_3', 'Secondary Storage & RAID Levels', 'Easy',
    'Which RAID level provides simple disk mirroring (duplicate copy on each disk)?',
    ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'], 1,
    'RAID 1 (Disk Mirroring) writes identical data to two (or more) disks simultaneously, providing 100% redundancy with 50% total storage efficiency.'),
  q('co_ss_4', 'Secondary Storage & RAID Levels', 'Easy',
    'What is the minimum number of physical disks required to implement RAID 5?',
    ['1 disk', '2 disks', '3 disks', '5 disks'], 2,
    'RAID 5 uses block-level striping with distributed parity and requires at least 3 disks to operate. It can tolerate the complete failure of any 1 disk.'),
  q('co_ss_5', 'Secondary Storage & RAID Levels', 'Medium',
    'How does RAID 5 store parity information across disks?',
    ['All parity is stored on a single dedicated parity disk', 'Parity blocks are distributed evenly across all disks in a rotating pattern', 'Parity is stored in CPU L3 cache', 'No parity is used in RAID 5'], 1,
    'Unlike RAID 3 or 4 which concentrate parity on a single bottleneck disk, RAID 5 distributes parity blocks cyclically across all member disks, balancing write traffic.'),
  q('co_ss_6', 'Secondary Storage & RAID Levels', 'Medium',
    'What is the primary advantage of RAID 6 over RAID 5?',
    ['RAID 6 requires only 2 disks', 'RAID 6 uses dual distributed parity and can survive the simultaneous failure of any two disks', 'RAID 6 has no write penalty', 'RAID 6 uses mechanical tape instead of SSDs'], 1,
    'RAID 6 calculates two independent parity syndromes (e.g., XOR and Reed-Solomon) distributed across disks, requiring at least 4 disks and allowing survival of up to 2 concurrent drive failures.'),
  q('co_ss_7', 'Secondary Storage & RAID Levels', 'Medium',
    'What is RAID 10 (or RAID 1+0)?',
    ['A single drive running 10 partitions', 'A stripe of mirrors (nested RAID) combining RAID 1 mirroring for fault tolerance and RAID 0 striping for high I/O throughput', 'A 10-disk JBOD array', 'RAID level using 10 parity drives'], 1,
    'RAID 10 is a hybrid nested array combining mirroring (RAID 1) with striping (RAID 0). It requires a minimum of 4 disks, provides fast read/write performance, and survives single or non-paired drive failures.'),
  q('co_ss_8', 'Secondary Storage & RAID Levels', 'Medium',
    'What is the "Write Penalty" inherent in RAID 5 and RAID 6 architectures?',
    ['Hard drives spin backwards during writes', 'Every small random write requires reading existing data and parity, calculating new parity, and writing new data and parity (4 disk I/O operations for RAID 5)', 'Writes can only happen when the computer boots', 'SSD cells wear out 10 times faster'], 1,
    'In RAID 5, updating a single data block requires: 1) Read old data, 2) Read old parity, 3) Compute new parity = (old data XOR new data XOR old parity), 4) Write new data, 5) Write new parity (4 I/Os for 1 write).'),
  q('co_ss_9', 'Secondary Storage & RAID Levels', 'Hard',
    'If a storage system has four 2 TB drives configured in RAID 5, what is the usable data storage capacity of the array?',
    ['8 TB', '6 TB', '4 TB', '2 TB'], 1,
    'For N disks of capacity C in RAID 5, usable capacity is (N - 1) * C. Here: (4 - 1) * 2 TB = 3 * 2 TB = 6 TB usable capacity, with 2 TB equivalent dedicated to parity.'),
  q('co_ss_10', 'Secondary Storage & RAID Levels', 'Hard',
    'In Solid State Drives (SSDs), why is a "Flash Translation Layer" (FTL) and "Wear Leveling" essential?',
    ['To accelerate magnetic disk platters', 'Because NAND flash cells can only endure a finite number of Program/Erase (P/E) cycles, wear leveling distributes writes evenly across all blocks to prevent premature drive failure', 'To prevent bit rot in DRAM', 'To enable optical laser reading'], 1,
    'NAND flash memory degrades with each write/erase cycle. The FTL implements wear-leveling algorithms that distribute erase blocks uniformly across the entire physical drive, preventing hot spots and prolonging SSD lifespan.')
];

const coContent = `// js/data/interviewPrep/computerOrganization.js
// Complete Question Bank for Computer Organization & Architecture (12 topics * 10 = 120 MCQs)

window.interviewPrepCO = {
  id: 'computer_organization',
  title: 'Computer Organization & Architecture',
  icon: 'memory',
  description: 'Master computer architecture, logic design, pipelining, cache memory, virtual memory, interrupts, and RAID.',
  totalQuestions: ${coQuestions.length},
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
  questions: ${JSON.stringify(coQuestions, null, 2)}
};
`;
fs.writeFileSync(path.join(outDir, 'computerOrganization.js'), coContent);
console.log(`Successfully generated computerOrganization.js (${coQuestions.length} questions across 12 topics)`);


// ==========================================
// 12. SOFTWARE ENGINEERING
// 14 topics * 10 = 140 MCQs
// ==========================================
console.log('Generating Software Engineering data...');
const seQuestions = [
  // 1. SDLC Models
  q('se_sdlc_1', 'SDLC Models', 'Easy',
    'Which SDLC model is characterized by sequential, non-overlapping phases where each phase must be completed before the next begins?',
    ['Spiral Model', 'Waterfall Model', 'Agile Model', 'RAD Model'], 1,
    'The Waterfall Model is a linear sequential model where phases (Requirements, Design, Implementation, Verification, Maintenance) cascade downwards without overlapping.'),
  q('se_sdlc_2', 'SDLC Models', 'Easy',
    'What is the primary strength of the Spiral Model in software engineering?',
    ['Simplicity and linear execution', 'Heavy emphasis on formal risk analysis and risk management at each iterative spiral loop', 'Elimination of documentation', 'Immediate delivery of production code in phase 1'], 1,
    'Proposed by Barry Boehm, the Spiral Model combines iterative prototyping with systematic risk analysis in four quadrants: Determine objectives, Identify and resolve risks, Development and testing, Plan next iteration.'),
  q('se_sdlc_3', 'SDLC Models', 'Easy',
    'What is the key advantage of the Prototyping Model?',
    ['Requires no customer interaction', 'Helps clarify ambiguous or incomplete requirements early by building an interactive mock/prototype for user feedback', 'Guarantees the lowest total development cost', 'Is strictly waterfall-based'], 1,
    'Prototyping involves building an early working demonstration of system features so stakeholders can explore, validate, and refine unclear requirements before full-scale engineering.'),
  q('se_sdlc_4', 'SDLC Models', 'Easy',
    'In the V-Model (Validation and Verification Model), what corresponds to the Unit Testing phase?',
    ['System Requirements Analysis', 'Component / Detailed Design', 'Architectural High-Level Design', 'Acceptance Testing'], 1,
    'In the V-Model, testing phases correspond symmetrically to development phases: Component/Detailed Design maps directly to Unit Testing, High-Level Design maps to Integration Testing, and System Requirements map to Acceptance Testing.'),
  q('se_sdlc_5', 'SDLC Models', 'Medium',
    'When is the Waterfall model most appropriate to adopt?',
    ['When requirements are unstable and changing rapidly', 'When requirements are well-understood, clearly defined, and stable with proven technology', 'For cutting-edge AI research projects', 'When rapid prototype demonstration is needed in 2 weeks'], 1,
    'Waterfall excels when requirements are crisp, comprehensive, and unlikely to change significantly, such as regulatory compliance software or defense infrastructure with fixed specifications.'),
  q('se_sdlc_6', 'SDLC Models', 'Medium',
    'What is the primary difference between Verification and Validation in software engineering?',
    ['Verification checks code syntax; Validation formats code', 'Verification: "Are we building the product right?" (conformance to specifications); Validation: "Are we building the right product?" (meeting user needs)', 'Verification is done by clients; Validation by developers', 'Verification is black-box; Validation is white-box'], 1,
    'Verification evaluates artifacts (reviews, inspections, unit tests) to verify they meet specified requirements. Validation tests the actual working system to validate that it satisfies real customer intent and operational needs.'),
  q('se_sdlc_7', 'SDLC Models', 'Medium',
    'What is the RAD (Rapid Application Development) model?',
    ['A model focused on writing assembly language', 'An adaptive development model focusing on rapid prototyping, component reuse, and short iterative cycles (typically 60-90 days)', 'A model without any testing phase', 'A waterfall variant with no customer involvement'], 1,
    'RAD prioritizes rapid iterative prototyping and visual component assembly over extensive upfront planning, enabling functional modules to be built and reviewed in fast 60 to 90-day timeboxes.'),
  q('se_sdlc_8', 'SDLC Models', 'Medium',
    'In the Spiral Model, what occurs in the "Risk Analysis" quadrant?',
    ['Developers write automated unit tests', 'Project risks (technical, cost, schedule) are identified, evaluated, and mitigated, often through prototyping or simulation', 'Code is deployed to cloud production servers', 'Customer writes the user manual'], 1,
    'The risk assessment quadrant evaluates technical feasibility, resource bottlenecks, and architectural uncertainties, creating benchmarks or prototypes to eliminate risks before progressing.'),
  q('se_sdlc_9', 'SDLC Models', 'Hard',
    'What is the fundamental limitation of the traditional Waterfall Model that led to the Agile revolution?',
    ['It produces too many working prototypes', 'Late integration and validation: working software is delivered only at the very end of the cycle, meaning major design flaws and requirement misalignments are discovered when change is most expensive', 'It cannot be used for enterprise projects', 'It lacks a formal documentation phase'], 1,
    'In Waterfall, working software only emerges near deployment. If requirements shift or architectural assumptions prove flawed, rework costs escalate exponentially because all prior phases assumed fixed baselines.'),
  q('se_sdlc_10', 'SDLC Models', 'Hard',
    'How does the Incremental Model differ from the Iterative Model in software engineering?',
    ['They are identical terms with no distinction', 'Incremental delivers the system in fully finished functional chunks (slice by slice); Iterative delivers the entire system in a rough draft initially and progressively refines all parts with each pass', 'Iterative delivers no working code until release', 'Incremental requires waterfall for every module'], 1,
    'Incremental development builds and delivers the software product piece by piece (adding new complete features each release). Iterative development refines the entire system iteratively, enhancing quality and depth of all components across iterations.'),

  // 2. Agile Methodology & Scrum Framework
  q('se_ag_1', 'Agile Methodology & Scrum Framework', 'Easy',
    'How many core values and principles are defined in the Agile Manifesto (2001)?',
    ['2 values, 5 principles', '4 values, 12 principles', '5 values, 10 principles', '3 values, 9 principles'], 1,
    'The Agile Manifesto establishes 4 core values (e.g., Individuals & interactions over processes & tools) and 12 guiding principles for iterative, customer-centric software delivery.'),
  q('se_ag_2', 'Agile Methodology & Scrum Framework', 'Easy',
    'What are the three official Scrum Roles defined in the Scrum Guide?',
    ['Project Manager, Tech Lead, Tester', 'Product Owner, Scrum Master, Developers (Development Team)', 'Architect, Business Analyst, QA Lead', 'Engineering Director, Product Manager, Scrum Master'], 1,
    'Scrum defines exactly 3 roles: the Product Owner (maximizes product value and manages backlog), the Scrum Master (serves team and enforces Scrum practices), and Developers (build increments).'),
  q('se_ag_3', 'Agile Methodology & Scrum Framework', 'Easy',
    'What is the standard time-box duration for a Daily Scrum (Stand-up) meeting?',
    ['15 minutes', '30 minutes', '45 minutes', '1 hour'], 0,
    'The Daily Scrum is strictly time-boxed to 15 minutes for the development team to inspect progress toward the Sprint Goal and adapt the daily plan.'),
  q('se_ag_4', 'Agile Methodology & Scrum Framework', 'Easy',
    'What is the primary purpose of a Sprint Retrospective in Scrum?',
    ['To demo finished user stories to clients', 'To inspect how the last sprint went with regards to individuals, processes, and tools, and identify concrete improvements for the next sprint', 'To assign story point estimates to backlog items', 'To deploy code to production'], 1,
    'The Sprint Retrospective occurs at the end of each Sprint for the team to reflect on team dynamics, workflows, and obstacles, establishing actionable experiments for continuous process improvement.'),
  q('se_ag_5', 'Agile Methodology & Scrum Framework', 'Medium',
    'What is the Definition of Done (DoD) in Scrum?',
    ['When the developer pushes code to GitHub', 'A formal, shared checklist of quality criteria that an increment must satisfy before it is considered releasable (e.g. tests passed, reviewed, documented)', 'When the Product Owner approves the sprint planning document', 'When 80% of sprint user stories are coded'], 1,
    'The Definition of Done is a comprehensive standard shared across the Scrum team ensuring transparency; an increment cannot be counted toward velocity or released unless it satisfies every DoD criterion.'),
  q('se_ag_6', 'Agile Methodology & Scrum Framework', 'Medium',
    'What is a "Sprint Burndown Chart" used for?',
    ['Tracking server CPU utilization', 'Graphically displaying the remaining work (in hours or story points) across sprint days to track progress toward the Sprint Goal', 'Calculating employee bonuses', 'Logging bug severity trends over a year'], 1,
    'A Sprint Burndown Chart plots remaining estimated effort against time (days in sprint). The trend line indicates whether the team is ahead, on track, or behind schedule to achieve the sprint commitment.'),
  q('se_ag_7', 'Agile Methodology & Scrum Framework', 'Medium',
    'What is the fundamental difference between Scrum and Kanban?',
    ['Scrum is for software; Kanban is only for manufacturing', 'Scrum uses fixed-length iterations (sprints) and cross-functional roles; Kanban is continuous flow with no required roles and limits Work In Progress (WIP)', 'Kanban has 4-week sprints', 'Scrum prohibits retrospectives'], 1,
    'Scrum relies on time-boxed sprints, specific events, and defined roles. Kanban operates on a continuous flow model without sprints, focusing on visualizing workflow and enforcing strict WIP (Work In Progress) limits.'),
  q('se_ag_8', 'Agile Methodology & Scrum Framework', 'Medium',
    'What does the "INVEST" acronym stand for in evaluating good Agile User Stories?',
    ['Integrated, Networked, Validated, Estimated, Scaled, Tested', 'Independent, Negotiable, Valuable, Estimable, Small, Testable', 'Iterative, Normalized, Verified, Efficient, Structured, Tracked', 'Immediate, Native, Visible, Explicit, Secure, Timely'], 1,
    'INVEST, coined by Bill Wake: Independent (not coupled), Negotiable (details discussed), Valuable (delivers user value), Estimable (sized properly), Small (fits in sprint), Testable (has acceptance criteria).'),
  q('se_ag_9', 'Agile Methodology & Scrum Framework', 'Hard',
    'What is "Velocity" in Scrum and how should it be used responsibly?',
    ['A metric to compare and rank different teams across an organization', 'The measure of work a specific team completes per sprint (in story points), used strictly as an internal capacity planning tool for future sprints', 'The clock speed of the CI/CD pipeline server', 'A KPI enforced by executive management to demand 20% increases each quarter'], 1,
    'Velocity is a localized measure of how much backlog effort a team delivers in a sprint. Because estimation is subjective and relative to each team, velocity should never be used to compare teams or set external quotas.'),
  q('se_ag_10', 'Agile Methodology & Scrum Framework', 'Hard',
    'What should happen if a Scrum team realizes mid-sprint that they cannot complete all committed backlog items?',
    ['The sprint duration is extended by one week', 'The developers negotiate with the Product Owner to remove or resize lower-priority items from the Sprint Backlog without compromising the overarching Sprint Goal', 'The Scrum Master cancels the sprint immediately', 'Developers skip unit testing to deliver all items on time'], 1,
    'Sprint duration is an inviolable timebox. If work exceeds capacity, the developers consult the Product Owner to remove or simplify scope while protecting quality standards and maintaining the primary Sprint Goal.'),

  // 3. Requirements Engineering & SRS
  q('se_re_1', 'Requirements Engineering & SRS', 'Easy',
    'What does SRS stand for in software engineering?',
    ['Software Regression Suite', 'Software Requirements Specification', 'System Recovery Service', 'Standard Routing System'], 1,
    'SRS stands for Software Requirements Specification, the official document outlining the complete expected behavior, features, and non-functional constraints of a software system.'),
  q('se_re_2', 'Requirements Engineering & SRS', 'Easy',
    'Which of the following is an example of a "Functional Requirement"?',
    ['The system must respond to user queries within 200 ms', 'The system shall allow users to reset their password via email verification link', 'The application must support 99.99% uptime', 'The codebase must be written in TypeScript'], 1,
    'Functional requirements describe specific behaviors, inputs, calculations, and services the system must execute (e.g. password reset). Speed, uptime, and language constraints are non-functional.'),
  q('se_re_3', 'Requirements Engineering & SRS', 'Easy',
    'Which of the following is an example of a "Non-Functional Requirement" (NFR)?',
    ['User can add products to a shopping cart', 'User can export reports to PDF format', 'System must support 10,000 concurrent users with latency under 1 second', 'Admin can deactivate user accounts'], 2,
    'Non-functional requirements specify quality attributes, system qualities, constraints, and performance targets (e.g., scalability, throughput, latency, security) rather than direct business logic functions.'),
  q('se_re_4', 'Requirements Engineering & SRS', 'Easy',
    'What is "Requirements Elicitation"?',
    ['Writing test automation scripts', 'The process of gathering, discovering, and uncovering requirements from stakeholders, users, and business documents', 'Deleting old bug reports', 'Compiling software requirements into binaries'], 1,
    'Elicitation is the initial phase of requirements engineering where analysts engage stakeholders through interviews, surveys, workshops, and observation to extract underlying needs.'),
  q('se_re_5', 'Requirements Engineering & SRS', 'Medium',
    'What standard IEEE document format historically governed the creation of Software Requirements Specifications?',
    ['IEEE 802.11', 'IEEE 829', 'IEEE 830 / ISO/IEC/IEEE 29148', 'IEEE 754'], 2,
    'IEEE 830 (superseded by ISO/IEC/IEEE 29148) provides the international standard guidelines and structure for writing comprehensive, high-quality SRS documents.'),
  q('se_re_6', 'Requirements Engineering & SRS', 'Medium',
    'What is a "Traceability Matrix" (RTM) in software engineering?',
    ['A diagram showing database foreign keys', 'A table that maps each user requirement to corresponding architectural design elements, code modules, and test cases to ensure complete coverage', 'A tool for tracking Git commit history', 'A network routing table'], 1,
    'A Requirements Traceability Matrix (RTM) traces requirements bidirectionally through architecture, code, and test cases, proving that all requirements are tested and no untraced features ("scope creep") were added.'),
  q('se_re_7', 'Requirements Engineering & SRS', 'Medium',
    'What is "Scope Creep" and how can it damage a software project?',
    ['Software code expanding due to compiler optimization', 'The uncontrolled, continuous addition of new features or requirements without corresponding adjustments to time, budget, or resources', 'Database disk space filling up with logs', 'Git branches diverging too far from main'], 1,
    'Scope creep occurs when new requirements are continuously accepted during development without formal change control, causing missed deadlines, budget overruns, and compromised software stability.'),
  q('se_re_8', 'Requirements Engineering & SRS', 'Medium',
    'In requirements analysis, what is the MoSCoW prioritization technique?',
    ['A Russian encryption algorithm', 'A framework classifying requirements into Must have, Should have, Could have, and Won\'t have (this time)', 'A model for estimating server cloud costs', 'A testing pyramid structure'], 1,
    'MoSCoW categorizes backlog items into: Must have (critical for release), Should have (important but workarounds exist), Could have (desirable if time permits), and Won\'t have (deferred to future releases).'),
  q('se_re_9', 'Requirements Engineering & SRS', 'Hard',
    'Which characteristic is essential for a requirement to be deemed "verifiable" or "testable"?',
    ['It must use words like "user-friendly" and "fast"', 'It must be stated in unambiguous, quantifiable, and measurable terms such that a pass/fail test can be executed', 'It must be approved by at least 10 executives', 'It must fit on a single line of text'], 1,
    'A verifiable requirement avoids subjective ambiguity (e.g., "the UI must be responsive") and specifies concrete measurable thresholds (e.g., "page initial load time must be < 1.5 seconds over 4G connections").'),
  q('se_re_10', 'Requirements Engineering & SRS', 'Hard',
    'What is the difference between User Requirements and System Requirements?',
    ['User requirements are written in Python; system requirements in C++', 'User requirements are high-level statements in natural language with diagrams for clients; System requirements set out detailed functional specifications and operational constraints for developers', 'System requirements are written by end users', 'There is no difference'], 1,
    'User requirements express client goals and business expectations in clear non-technical language. System requirements translate those goals into formal, detailed technical specifications used by engineers.'),

  // 4. Software Architecture Patterns
  q('se_arch_1', 'Software Architecture Patterns', 'Easy',
    'What is a "Monolithic Architecture"?',
    ['An architecture running on custom quantum computers', 'A software system where all components (UI, business logic, data access) are bundled, compiled, and executed as a single unified deployable unit', 'A system composed of hundreds of Docker containers', 'An event-driven architecture using Kafka'], 1,
    'A monolith packages all business features, data access routines, and controllers into one unified codebase and deployment artifact running on a shared process runtime.'),
  q('se_arch_2', 'Software Architecture Patterns', 'Easy',
    'What is the core premise of a Microservices Architecture?',
    ['Writing code in small fonts', 'Decomposing an application into a suite of small, independently deployable, loosely coupled services organized around business capabilities and communicating via lightweight protocols (e.g. REST/gRPC)', 'Deploying one single giant war file', 'Running all code in browser memory'], 1,
    'Microservices break an enterprise application into discrete independent services, each owning its domain and database, communicating via APIs or event brokers, deployable autonomously.'),
  q('se_arch_3', 'Software Architecture Patterns', 'Easy',
    'What are the typical layers in a standard 3-Tier Layered Architecture?',
    ['TCP, IP, Ethernet', 'Presentation Layer (UI), Business Logic Layer (Application), and Data Access / Persistence Layer (Database)', 'Frontend, Docker, Kubernetes', 'Client, Router, Firewall'], 1,
    'The 3-tier architecture organizes software into: Presentation (handles UI/views), Business Logic/Service (domain rules and processing), and Data Layer (database schemas and ORM persistence).'),
  q('se_arch_4', 'Software Architecture Patterns', 'Easy',
    'In MVC (Model-View-Controller) architecture, what is the role of the Controller?',
    ['To render HTML graphics to the screen', 'To store database records on disk', 'To act as an intermediary that accepts user input, manipulates the Model, and selects the View to display', 'To route network cables'], 2,
    'The Controller processes incoming HTTP/UI requests, invokes business logic on the Model, and selects the appropriate View to present the response back to the client.'),
  q('se_arch_5', 'Software Architecture Patterns', 'Medium',
    'What is an "Event-Driven Architecture" (EDA)?',
    ['An architecture where code executes only during company events', 'A pattern where decoupled components communicate asynchronously by producing, detecting, and consuming events or messages via a broker', 'A system where developers manually click buttons to trigger functions', 'A strictly synchronous architecture'], 1,
    'In EDA, state changes emit events to an event broker (like Kafka or RabbitMQ). Consumer services subscribe and react to events asynchronously, enabling high decoupling and scalability.'),
  q('se_arch_6', 'Software Architecture Patterns', 'Medium',
    'What is the primary trade-off of adopting Microservices over a Monolith?',
    ['Microservices have zero network latency', 'Microservices offer independent scalability and deployment flexibility, but introduce complex distributed system challenges (network failures, data consistency, distributed transactions, observability)', 'Microservices require no DevOps tooling', 'Monoliths cannot run on Linux servers'], 1,
    'Microservices decouple teams and enable independent deployments, but exchange in-process simplicity for distributed complexities: network latency, partial failures, distributed tracing, and eventual data consistency.'),
  q('se_arch_7', 'Software Architecture Patterns', 'Medium',
    'What is "Hexagonal Architecture" (Ports and Adapters Architecture)?',
    ['An architecture with 6 layers of database tables', 'A pattern that isolates core domain business logic from external dependencies (DB, UI, HTTP) through interfaces (Ports) and concrete implementations (Adapters)', 'A design pattern for rendering 3D graphics', 'A Kubernetes cluster topology'], 1,
    'Alistair Cockburn\'s Hexagonal architecture isolates business logic at the core. Outer technologies (databases, web frameworks, messaging) plug into the core via input/output Ports and Adapters, enabling easy testing and replacement.'),
  q('se_arch_8', 'Software Architecture Patterns', 'Medium',
    'What is CQRS (Command Query Responsibility Segregation)?',
    ['A database encryption protocol', 'An architectural pattern that separates operations that mutate data (Commands) from operations that read data (Queries), often using different models or databases for each', 'A Git branching strategy', 'A Scrum estimation method'], 1,
    'CQRS separates read and update operations. Commands handle business validation and state modification; Queries bypass complex domain models to fetch optimized view representations quickly.'),
  q('se_arch_9', 'Software Architecture Patterns', 'Hard',
    'In a distributed microservice architecture, how is the "Saga Pattern" used to manage transactions across services?',
    ['By using 2-phase commit (2PC) on all databases simultaneously', 'By orchestrating a sequence of local transactions where each step publishes an event; if a step fails, compensating transactions are executed to undo preceding changes', 'By locking all tables across all microservices until completion', 'By rolling back the Git repository'], 1,
    'Because distributed 2PC locks resources and hurts availability, the Saga pattern coordinates a series of local transactions. If a sub-transaction fails, the Saga executes predefined compensating transactions in reverse to preserve eventual consistency.'),
  q('se_arch_10', 'Software Architecture Patterns', 'Hard',
    'What is the "Strangler Fig Pattern" in software re-architecture?',
    ['A pattern that kills microservices when memory is exceeded', 'An incremental migration strategy where a legacy monolithic system is gradually replaced by intercepting calls and replacing functionality with microservices piece by piece until the monolith disappears', 'A security exploit that bypasses firewalls', 'A code obfuscation technique'], 1,
    'Martin Fowler\'s Strangler Fig pattern places a facade/API gateway in front of a legacy monolith, incrementally carving out bounded contexts into microservices until the legacy system is completely superseded and retired safely.'),

  // 5. UML Diagrams
  q('se_uml_1', 'UML Diagrams', 'Easy',
    'What does UML stand for in software engineering?',
    ['Unified Modeling Language', 'Universal Machine Language', 'Unified Markup Logic', 'Universal Module Linker'], 0,
    'UML stands for Unified Modeling Language, the standard visual modeling notation for specifying, visualizing, constructing, and documenting software system artifacts.'),
  q('se_uml_2', 'UML Diagrams', 'Easy',
    'Which UML diagram depicts the static structure of a system by showing classes, attributes, methods, and relationships?',
    ['Sequence Diagram', 'Use Case Diagram', 'Class Diagram', 'Activity Diagram'], 2,
    'A Class Diagram is a structural UML diagram modeling classes, interfaces, attributes, operations, and relationships (inheritance, association, aggregation, composition).'),
  q('se_uml_3', 'UML Diagrams', 'Easy',
    'What does an "Actor" represent in a UML Use Case Diagram?',
    ['A database table', 'An external entity (human user, external system, hardware device) that interacts with the system to achieve a goal', 'A software function or class method', 'A CPU processor thread'], 1,
    'In Use Case diagrams, an Actor represents an external entity (person, role, organization, or external service) initiating or receiving value from system use cases.'),
  q('se_uml_4', 'UML Diagrams', 'Easy',
    'In a UML Class Diagram, what does a filled solid diamond on an association line represent?',
    ['Aggregation (weak has-a)', 'Composition (strong has-a, where child cannot exist without parent)', 'Generalization (inheritance)', 'Interface implementation'], 1,
    'A solid black diamond denotes Composition: strong ownership where the component\'s lifecycle is bound to the container (e.g. Building and Rooms; if Building is destroyed, Rooms are destroyed). An empty diamond denotes Aggregation.'),
  q('se_uml_5', 'UML Diagrams', 'Medium',
    'What is the primary focus of a UML Sequence Diagram?',
    ['Showing database foreign key constraints', 'Visualizing interactions and message exchanges between objects or components arranged in time sequence', 'Showing physical server network deployment', 'Mapping state transitions of a variable'], 1,
    'A Sequence Diagram is an interaction diagram displaying objects along vertical lifelines and chronological message exchanges (synchronous calls, asynchronous signals, return values) horizontally over time.'),
  q('se_uml_6', 'UML Diagrams', 'Medium',
    'In a UML Use Case Diagram, what is the difference between "<<include>>" and "<<extend>>" relationships?',
    ['<<include>> is for classes; <<extend>> is for databases', '<<include>> means the base use case unconditionally and mandatory executes the included use case; <<extend>> adds optional behavior under specific extension point conditions', '<<include>> is optional; <<extend>> is mandatory', 'They are synonymous'], 1,
    '<<include>> signifies mandatory invocation (e.g., "Checkout" always includes "Authenticate"). <<extend>> represents optional or conditional behavior branching from the base use case (e.g., "Apply Promo Coupon" extends "Checkout").'),
  q('se_uml_7', 'UML Diagrams', 'Medium',
    'What is a UML State Machine (Statechart) Diagram best suited for modeling?',
    ['Data flow through a CI/CD pipeline', 'The lifecycle, dynamic states, events, and transitions of an individual object or entity (e.g., Order: Placed -> Paid -> Shipped -> Delivered)', 'Relational database foreign keys', 'Network IP routing'], 1,
    'State Machine diagrams model the discrete states an entity transitions through in response to internal or external events during its lifecycle.'),
  q('se_uml_8', 'UML Diagrams', 'Medium',
    'What does an open hollow triangle arrowhead at the end of a solid line denote in UML class diagrams?',
    ['Dependency', 'Generalization / Inheritance (Subclass points to Superclass)', 'Composition', 'Association'], 1,
    'An empty/hollow arrowhead on a solid line indicates Generalization (Inheritance). If the line is dashed with a hollow triangle, it represents Realization/Implementation of an Interface.'),
  q('se_uml_9', 'UML Diagrams', 'Hard',
    'What is the difference between a UML Activity Diagram and a BPMN (Business Process Model and Notation) Diagram?',
    ['Activity diagrams cannot show decisions', 'Activity diagrams model procedural workflow logic, concurrency, and operational steps within software; BPMN is tailored specifically for business workflows, message flows, and business participant collaboration', 'BPMN is only for hardware circuits', 'UML cannot model parallel execution'], 1,
    'UML Activity diagrams are designed for modeling computational control and object flows (concurrency with forks/joins). BPMN focuses on cross-organizational business process workflows, pools, swimlanes, and business messaging.'),
  q('se_uml_10', 'UML Diagrams', 'Hard',
    'What is a UML Deployment Diagram used for in enterprise architecture?',
    ['To track Git commit deployments', 'To model the physical or virtual execution architecture, mapping software artifacts (JARs, containers) onto hardware nodes (servers, cloud VMs, devices)', 'To design user interface buttons', 'To write database queries'], 1,
    'Deployment diagrams illustrate the physical infrastructure topology of a system, specifying how software artifacts (executables, binaries, microservice containers) map to hardware processing nodes, execution environments, and communication networks.'),

  // 6. Design Principles (SOLID, DRY, KISS, YAGNI)
  q('se_dp_1', 'Design Principles', 'Easy',
    'What does the "S" in SOLID design principles stand for?',
    ['Scalable Architecture Principle', 'Single Responsibility Principle (SRP)', 'System Reliability Principle', 'Software Reusability Principle'], 1,
    'SRP (Single Responsibility Principle) states: "A class should have one, and only one, reason to change", meaning it should encapsulate a single focused responsibility or business concern.'),
  q('se_dp_2', 'Design Principles', 'Easy',
    'What does the DRY principle stand for in software development?',
    ['Do Robust Yielding', 'Don\'t Repeat Yourself', 'Deploy Regularly Yourself', 'Design Reusable Yardsticks'], 1,
    'DRY (Don\'t Repeat Yourself) states that every piece of knowledge or business logic must have a single, unambiguous, authoritative representation within a system, eliminating duplicate implementations.'),
  q('se_dp_3', 'Design Principles', 'Easy',
    'What does the KISS principle advocate for in software engineering?',
    ['Keep It Simple, Stupid / Silly', 'Key Interface System Security', 'Keep Iterations Short and Swift', 'Know Internal System State'], 0,
    'KISS (Keep It Simple, Stupid) emphasizes that software systems work best when designs remain simple and straightforward, avoiding unnecessary abstractions and over-engineering.'),
  q('se_dp_4', 'Design Principles', 'Easy',
    'What does the YAGNI principle caution developers against?',
    ['Writing too many unit tests', 'Implementing features and speculative functionality before they are actually needed ("You Aren\'t Gonna Need It")', 'Using open-source libraries', 'Refactoring legacy code'], 1,
    'YAGNI ("You Aren\'t Gonna Need It") is an Extreme Programming principle advising developers never to write speculative code based on imagined future requirements until real use cases demand them.'),
  q('se_dp_5', 'Design Principles', 'Medium',
    'What is the Open/Closed Principle (OCP) in SOLID?',
    ['Databases should be open for reading and closed for writing', 'Software entities (classes, modules, functions) should be open for extension, but closed for modification', 'Source code should be open-source, but binaries closed-source', 'Ports should be open for incoming traffic only'], 1,
    'OCP states that system behavior should be extendable (via inheritance, polymorphism, or plugins) without modifying existing, tested source code.'),
  q('se_dp_6', 'Design Principles', 'Medium',
    'What does the Liskov Substitution Principle (LSP) require?',
    ['Every class must have a public constructor', 'Subtypes must be substitutable for their base types without altering the correctness or desirable properties of the program', 'Inheritance should replace composition in all cases', 'Methods must return void'], 1,
    'Formulated by Barbara Liskov, LSP requires that derived classes honor the contract and behavior expected of their base classes (preconditions cannot be strengthened, postconditions cannot be weakened).'),
  q('se_dp_7', 'Design Principles', 'Medium',
    'What does the Interface Segregation Principle (ISP) state?',
    ['A class should implement at least 10 interfaces', 'Clients should not be forced to depend upon interfaces they do not use (prefer small, client-specific interfaces over large, fat ones)', 'All interfaces must be kept private', 'Interfaces should never have method signatures'], 1,
    'ISP advocates breaking fat, bloated interfaces into focused, role-specific interfaces so implementing classes only need to implement methods relevant to their actual role.'),
  q('se_dp_8', 'Design Principles', 'Medium',
    'What does the Dependency Inversion Principle (DIP) mandate?',
    ['High-level modules should depend on low-level modules', 'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). Abstractions should not depend on details; details should depend on abstractions', 'Code should depend directly on SQL queries', 'Microservices should invert HTTP connections'], 1,
    'DIP decouples modules: high-level business policies should depend on abstract contracts rather than concrete low-level implementations, enabling dependency injection and test mockability.'),
  q('se_dp_9', 'Design Principles', 'Hard',
    'The classic "Square extends Rectangle" problem is a textbook violation of which SOLID principle and why?',
    ['SRP, because Square has two responsibilities', 'LSP (Liskov Substitution Principle), because setting Width and Height independently breaks Square\'s invariant that width must equal height, altering expected Rectangle behavior', 'DIP, because Square depends on a database', 'ISP, because Rectangle has too many interfaces'], 1,
    'A Square inheriting from Rectangle violates LSP. If a client expects a Rectangle and invokes `rect.setWidth(5)` followed by `rect.setHeight(10)`, an area of 50 is expected. Modifying a Square forces both dimensions to equal 10, breaking the caller\'s assumptions.'),
  q('se_dp_10', 'Design Principles', 'Hard',
    'How does the Law of Demeter (Principle of Least Knowledge) prevent tight coupling in object-oriented systems?',
    ['By preventing classes from having more than 5 methods', 'By dictating that a method should only call methods on its own object, its parameters, objects it creates, or its immediate component instances (avoiding chains like `a.getB().getC().doD()`)', 'By hiding database passwords in config files', 'By making all variables static'], 1,
    'The Law of Demeter advises: "Talk only to your immediate friends". Calling `order.getCustomer().getAddress().getCity()` couples `order` to deep internal structures of `Customer` and `Address`, making refactoring fragile.'),

  // 7. Software Testing Fundamentals
  q('se_tf_1', 'Software Testing Fundamentals', 'Easy',
    'What is the fundamental difference between White-Box Testing and Black-Box Testing?',
    ['White-box is done during daytime; black-box at night', 'White-Box tests internal logic, control flow, and code structure; Black-Box tests functionality against specifications without knowledge of internal code', 'White-box is for hardware; black-box is for software', 'Black-box testing has no inputs'], 1,
    'White-Box (structural) testing inspects source code, paths, branches, and statements. Black-Box (behavioral) testing evaluates software behavior purely against requirement specs without looking into internal code.'),
  q('se_tf_2', 'Software Testing Fundamentals', 'Easy',
    'What is Gray-Box Testing?',
    ['Testing outdated software versions', 'A testing approach combining knowledge of internal data structures/algorithms (partial white-box) with black-box behavioral test execution', 'Testing software on virtual machines', 'Automated testing run by AI bots'], 1,
    'Gray-Box testing blends black-box functional testing with partial awareness of underlying architectures, database schemas, or error logs to design more targeted test cases.'),
  q('se_tf_3', 'Software Testing Fundamentals', 'Easy',
    'In Black-Box testing, what is "Equivalence Partitioning"?',
    ['Dividing server CPU cores equally among tests', 'Dividing the input domain into partitions of equivalent data from which test cases are derived, assuming all values in a partition yield the same behavior', 'Sorting test cases alphabetically', 'Splitting unit tests into equal time slices'], 1,
    'Equivalence partitioning segments input values into valid and invalid classes. Testing one representative value from each class effectively covers the behavior of the entire partition, minimizing redundant tests.'),
  q('se_tf_4', 'Software Testing Fundamentals', 'Easy',
    'What is Boundary Value Analysis (BVA)?',
    ['Testing network perimeter firewalls', 'A testing technique focusing on values at the boundaries of equivalence partitions (e.g. min, min+1, nominal, max-1, max), where bugs cluster most frequently', 'Measuring hard drive sector boundaries', 'Testing code boundary markers in syntax'], 1,
    'Experience shows that the majority of software bugs occur at boundary edges (off-by-one errors). BVA rigorously tests minimum, just above minimum, nominal, just below maximum, and maximum values.'),
  q('se_tf_5', 'Software Testing Fundamentals', 'Medium',
    'What is the difference between Statement Coverage and Branch Coverage in White-Box testing?',
    ['They are completely equivalent metrics', 'Statement coverage measures whether every executable line was executed; Branch coverage verifies whether every decision outcome (both True and False branches of every condition) was exercised', 'Statement coverage requires 100% test success', 'Branch coverage only tests switch statements'], 1,
    'Statement coverage merely ensures every line runs at least once. Branch coverage is stricter, requiring that both the TRUE and FALSE outcomes of every logical decision branch are traversed by test suites.'),
  q('se_tf_6', 'Software Testing Fundamentals', 'Medium',
    'What is the distinction between an Error, a Fault (Bug), and a Failure?',
    ['They are interchangeable synonyms', 'An Error is a human mistake made by a programmer; a Fault/Bug is the flaw in the code caused by that error; a Failure is the observable incorrect behavior during software execution', 'A Failure causes an Error, which creates a Fault', 'Faults happen in production only'], 1,
    'Standard software engineering definitions: A human makes an Error (mental slip). This introduces a Fault / Bug (defect in code). When the faulty code executes in an operational environment, a system Failure occurs.'),
  q('se_tf_7', 'Software Testing Fundamentals', 'Medium',
    'What is "Mutation Testing" in software verification?',
    ['Testing software after changing operating systems', 'A technique where small deliberate bugs (mutants) are introduced into source code to evaluate if existing test suites detect and "kill" the mutants', 'Testing genetic AI algorithms', 'Running tests under fluctuating CPU voltages'], 1,
    'Mutation testing measures test suite quality: fault-injection tools insert minor modifications (mutations) into source code. If a test suite fails when a mutant is introduced, the mutant is "killed", proving test suite effectiveness.'),
  q('se_tf_8', 'Software Testing Fundamentals', 'Medium',
    'What is "Sanity Testing" versus "Smoke Testing"?',
    ['Smoke testing tests hardware; Sanity tests software', 'Smoke testing is a broad, shallow build-verification test to ensure the application is stable enough for deeper testing; Sanity testing is a focused test checking specific bug fixes or features', 'Sanity testing is automated; Smoke is always manual', 'There is no difference'], 1,
    'Smoke testing ("build acceptance test") verifies basic functionality broadly to reject broken builds immediately. Sanity testing is a targeted subset performed after a bug fix or minor build to quickly verify the fix works before running full regression.'),
  q('se_tf_9', 'Software Testing Fundamentals', 'Hard',
    'What is Modified Condition/Decision Coverage (MC/DC) and where is it mandated?',
    ['A metric that checks UI CSS styling', 'A rigorous white-box testing standard proving that each condition in a boolean decision independently affects the decision outcome, mandated in safety-critical systems (like DO-178C for avionics)', 'A metric measuring Scrum team story points', 'A black-box fuzz testing tool'], 1,
    'MC/DC requires showing that each condition in a complex boolean expression (e.g. `(A OR B) AND C`) can independently influence the overall outcome while holding all other conditions constant, required in safety-critical avionic and automotive software.'),
  q('se_tf_10', 'Software Testing Fundamentals', 'Hard',
    'Why is exhaustive software testing theoretically and practically impossible?',
    ['Because computers lack sufficient RAM', 'Due to combinatorial explosion of inputs, complex state permutations, execution timing, and path combinations that require astronomical numbers of test cases', 'Because modern programming languages prohibit more than 1000 unit tests', 'Because compilers eliminate edge cases'], 1,
    'Exhaustive testing (testing every possible input combination and execution path) is impossible because the input domain and state space of even simple programs are virtually infinite, necessitating risk-based sampling and partitioning.'),

  // 8. Testing Levels
  q('se_tl_1', 'Testing Levels', 'Easy',
    'What are the four recognized levels of software testing in ascending order?',
    ['System, Unit, Integration, Acceptance', 'Unit Testing, Integration Testing, System Testing, Acceptance Testing', 'Manual, Automated, Performance, Security', 'Alpha, Beta, Gamma, Delta'], 1,
    'The standard four testing levels proceed from small to large: 1) Unit Testing (individual methods/classes), 2) Integration Testing (module interactions), 3) System Testing (end-to-end complete system), 4) Acceptance Testing (user validation).'),
  q('se_tl_2', 'Testing Levels', 'Easy',
    'What is the primary focus of Unit Testing?',
    ['Validating end-to-end network latency', 'Testing individual isolated units, functions, or methods in isolation from external dependencies', 'Testing user checkout workflows', 'Testing database disaster recovery'], 1,
    'Unit testing isolates and tests the smallest verifiable pieces of source code (individual functions, methods, classes) using test doubles (mocks/stubs) to remove external environmental noise.'),
  q('se_tl_3', 'Testing Levels', 'Easy',
    'What is "Regression Testing"?',
    ['Testing software on older hardware versions', 'Re-running existing test suites after code changes or bug fixes to verify that previously working functionality has not been inadvertently broken', 'Testing software written in ancient languages', 'Testing before the requirements phase begins'], 1,
    'Regression testing ensures that new features, performance optimizations, or bug fixes do not introduce regressions (collateral damage or broken existing behaviors) into the codebase.'),
  q('se_tl_4', 'Testing Levels', 'Easy',
    'What is the difference between Alpha Testing and Beta Testing?',
    ['Alpha testing uses C++; Beta testing uses Java', 'Alpha testing is conducted by internal employees/developers in a controlled test environment; Beta testing is conducted by real external users in their actual production environments', 'Alpha is performed after release; Beta before coding', 'Beta testing requires source code access'], 1,
    'Alpha testing is internal acceptance testing simulated in-house. Beta testing releases the near-final product to a sample group of real external end users to capture real-world operational feedback and edge cases.'),
  q('se_tl_5', 'Testing Levels', 'Medium',
    'What is the difference between "Stubs" and "Drivers" in top-down vs bottom-up integration testing?',
    ['Stubs are hardware; Drivers are software', 'In Top-Down integration, Stubs simulate lower-level modules not yet written; in Bottom-Up integration, Drivers simulate higher-level calling modules to trigger the modules under test', 'Drivers simulate databases only', 'Stubs are used only in production'], 1,
    'Top-down integration builds high-level logic first, using Stubs (dummy modules) to mock incomplete lower-level dependencies. Bottom-up integration builds low-level components first, using Drivers to invoke and pass test data to them.'),
  q('se_tl_6', 'Testing Levels', 'Medium',
    'What is the primary purpose of End-to-End (E2E) System Testing?',
    ['To check code comments and formatting', 'To validate the complete, integrated software flow from the user interface down through APIs, background jobs, and databases simulating real user scenarios', 'To benchmark CPU instruction cycle times', 'To replace unit tests completely'], 1,
    'E2E testing treats the entire application stack as a whole, driving realistic user journeys (e.g. signup -> search -> checkout -> email notification) to ensure all subsystems cooperate properly.'),
  q('se_tl_7', 'Testing Levels', 'Medium',
    'What is the "Test Pyramid" concept proposed by Mike Cohn?',
    ['A structure where most tests should be manual tests', 'A recommended testing portfolio with a broad base of fast, cheap Unit Tests, a middle layer of Integration/Service Tests, and a small apex of slow, expensive UI/E2E Tests', 'A pyramid with 90% E2E tests at the bottom', 'A diagram showing developer salaries'], 1,
    'The Test Pyramid advocates investing heavily in fast, isolated, reliable Unit Tests at the base, moderate Integration tests in the middle, and minimal brittle, high-maintenance end-to-end UI tests at the top.'),
  q('se_tl_8', 'Testing Levels', 'Medium',
    'What is User Acceptance Testing (UAT)?',
    ['Testing whether developers accept the project architecture', 'The final phase where business stakeholders or clients validate that the completed software meets agreed business contracts and operational workflows before go-live', 'Unit testing user models in code', 'Testing website uptime with ping requests'], 1,
    'UAT is performed by real business users/clients against actual business criteria to formally sign off and authorize release into production.'),
  q('se_tl_9', 'Testing Levels', 'Hard',
    'What is "Contract Testing" in microservice architectures?',
    ['Testing software licensing agreements', 'A technique that verifies microservices communicate correctly by ensuring that provider services fulfill the explicit API expectations (contracts) defined by consumer services (e.g. using Pact)', 'Testing database connection strings', 'Verifying legal terms of service'], 1,
    'Consumer-Driven Contract Testing allows microservices teams to test API compatibility independently without spinning up complex, brittle end-to-end environments, by verifying API payloads against recorded JSON contracts.'),
  q('se_tl_10', 'Testing Levels', 'Hard',
    'What is "Chaos Engineering" in high-availability systems testing?',
    ['Developers writing code without rules', 'The discipline of deliberately injecting failures (e.g. killing servers, severing network links, adding latency) into production systems to test and prove resilience (e.g. Chaos Monkey)', 'Running tests with corrupted RAM', 'Randomly deleting production databases without backup'], 1,
    'Pioneered by Netflix, Chaos Engineering proactively introduces turbulent conditions (terminating instances, injecting latency) in production to identify weaknesses before they trigger real outages.'),

  // 9. Test Automation & TDD vs BDD
  q('se_tdd_1', 'Test Automation & TDD vs BDD', 'Easy',
    'What is the core cycle of Test-Driven Development (TDD)?',
    ['Code -> Test -> Deploy', 'Red (Write failing test) -> Green (Write minimal code to pass) -> Refactor (Clean up code)', 'Design -> Code -> Document', 'Plan -> Estimate -> Code'], 1,
    'The TDD cycle is: 1) Red: write a unit test that fails initially; 2) Green: implement the minimal code required to pass; 3) Refactor: eliminate duplication and clean design while keeping tests green.'),
  q('se_tdd_2', 'Test Automation & TDD vs BDD', 'Easy',
    'What is the primary syntax structure used to write BDD (Behavior-Driven Development) scenarios?',
    ['For / While / Do', 'Given (Initial context) -> When (Event/Action occurs) -> Then (Observable outcome expected)', 'Try / Catch / Finally', 'Input / Process / Output'], 1,
    'BDD scenarios use Gherkin syntax: "Given [context/precondition], When [action occurs], Then [expected outcome]".'),
  q('se_tdd_3', 'Test Automation & TDD vs BDD', 'Easy',
    'What popular tool is widely used to execute Gherkin-based BDD specifications?',
    ['Cucumber', 'Docker', 'Jenkins', 'Kubernetes'], 0,
    'Cucumber is the standard BDD framework that parses plain-text Gherkin specifications and executes matching automation glue code across languages.'),
  q('se_tdd_4', 'Test Automation & TDD vs BDD', 'Easy',
    'What is a "Mock" object in automated unit testing?',
    ['A joke class written for fun', 'A test double pre-programmed with expectations about which calls/methods it should receive and verified during test teardown', 'A copy of the production database', 'A broken unit test'], 1,
    'Mocks are test doubles that register expectations (which methods should be called, with what arguments, how many times) and fail the test if those expectations are violated.'),
  q('se_tdd_5', 'Test Automation & TDD vs BDD', 'Medium',
    'What is the difference between a "Stub" and a "Mock"?',
    ['Stubs are for C; Mocks are for Java', 'A Stub provides canned, predefined return data to calls made during the test; a Mock also verifies that specific expected method calls actually took place with specific parameters', 'Stubs are run in CI/CD; Mocks are manual', 'A Stub connects to real databases'], 1,
    'Stubs provide canned answers to calls made during testing without inspecting behavior. Mocks verify behavioral interactions, asserting that specific methods were invoked with specific parameters.'),
  q('se_tdd_6', 'Test Automation & TDD vs BDD', 'Medium',
    'What is the principal benefit of practicing TDD beyond bug reduction?',
    ['It eliminates the need for software architecture', 'It forces modular, loosely coupled, and highly testable design because code is written strictly to satisfy discrete testable interfaces', 'It makes code run twice as fast', 'It doubles compiler efficiency'], 1,
    'TDD is as much a design tool as a testing tool: writing tests first forces developers to think from the consumer\'s perspective, naturally producing modular, decoupled, and easily testable components.'),
  q('se_tdd_7', 'Test Automation & TDD vs BDD', 'Medium',
    'What is a "Flaky Test" in automated testing pipelines and why is it dangerous?',
    ['A test that tests floating-point numbers', 'A test that intermittently passes or fails without any code changes (due to timing, concurrency, or environmental issues), eroding developer trust in test suites', 'A test that takes less than 1 ms to run', 'A test written in a dynamic language'], 1,
    'Flaky tests yield non-deterministic results due to race conditions, network latency, or shared test state. They are dangerous because developers learn to ignore test failures, eventually letting real production bugs slip through.'),
  q('se_tdd_8', 'Test Automation & TDD vs BDD', 'Medium',
    'How does BDD improve collaboration between technical and non-technical stakeholders?',
    ['By teaching business analysts how to code C++', 'By expressing software requirements and acceptance criteria in plain, human-readable domain language (Given/When/Then) understandable by business, developers, and QA alike', 'By eliminating developers from the requirement process', 'By generating automated PowerPoint slides'], 1,
    'BDD bridges the communication gap by using natural ubiquitous language that business analysts, product owners, developers, and testers can review together, creating living executable documentation.'),
  q('se_tdd_9', 'Test Automation & TDD vs BDD', 'Hard',
    'In automated testing, what does the principle "Test Behavior, Not Implementation Details" mean?',
    ['Tests should only assert private variable values', 'Tests should verify the public inputs and observable outputs/side effects of a system rather than asserting internal private methods or variables, allowing internal refactoring without breaking tests', 'Tests should ignore edge cases', 'Tests should never use assertions'], 1,
    'Testing implementation details binds tests tightly to internal private mechanics; renaming an internal helper breaks the test even if the feature works. Testing observable behavior allows fearless code refactoring.'),
  q('se_tdd_10', 'Test Automation & TDD vs BDD', 'Hard',
    'What is "Property-Based Testing" (e.g. QuickCheck, Hypothesis)?',
    ['Testing CSS properties of HTML elements', 'A testing paradigm where developers specify universal invariants (properties) that must hold true, and the framework generates hundreds of randomized edge-case inputs to find counterexamples', 'Testing database schema properties only', 'Testing code ownership properties'], 1,
    'Unlike example-based tests with hand-picked inputs, property-based testing tests universal truths (e.g., `reverse(reverse(list)) == list`). The engine automatically throws hundreds of randomized edge cases (empty strings, huge numbers) to expose flaws.'),

  // 10. Software Maintenance, Refactoring & Technical Debt
  q('se_maint_1', 'Software Maintenance, Refactoring & Technical Debt', 'Easy',
    'What are the four classical categories of software maintenance?',
    ['Alpha, Beta, Release, Patch', 'Corrective, Adaptive, Perfective, and Preventive maintenance', 'Frontend, Backend, Database, Cloud', 'Static, Dynamic, Continuous, Discrete'], 1,
    'The 4 types of maintenance are: Corrective (fixing reported bugs), Adaptive (adapting to new environments/OS), Perfective (enhancing performance or features), and Preventive (refactoring to prevent future failures).'),
  q('se_maint_2', 'Software Maintenance, Refactoring & Technical Debt', 'Easy',
    'What is the definition of "Code Refactoring"?',
    ['Adding new features to a codebase', 'Restructuring existing computer code without changing its external observable behavior to improve internal non-functional attributes (readability, maintainability, simplicity)', 'Fixing critical security bugs in production', 'Rewriting code in another programming language'], 1,
    'Martin Fowler defines refactoring as the disciplined process of restructuring existing code, altering its internal structure without changing its external functional behavior, to make it easier to understand and maintain.'),
  q('se_maint_3', 'Software Maintenance, Refactoring & Technical Debt', 'Easy',
    'What does the term "Technical Debt" describe?',
    ['The monetary cost of software licenses', 'The implied future cost of additional rework and maintenance caused by choosing an easy, expedience-driven solution now instead of a better architectural approach', 'Outstanding invoices owed to cloud providers', 'The salary paid to developers'], 1,
    'Coined by Ward Cunningham, technical debt is a financial metaphor: taking shortcuts to ship faster incurs debt. Just like financial debt, it accumulates "interest" in the form of slowed future development until paid down via refactoring.'),
  q('se_maint_4', 'Software Maintenance, Refactoring & Technical Debt', 'Easy',
    'What is a "Code Smell"?',
    ['A physical odor from hot servers', 'A surface indication or symptom in source code that often indicates a deeper structural or design problem (e.g., Long Method, God Class, Duplicated Code)', 'A syntax error caught by a compiler', 'An expired SSL certificate'], 1,
    'A code smell is not an actual bug or syntax error; it is a recognizable architectural indicator in code suggesting decay or poor design that warrants refactoring before it breeds bugs.'),
  q('se_maint_5', 'Software Maintenance, Refactoring & Technical Debt', 'Medium',
    'Which software maintenance category historically accounts for the largest proportion of total lifecycle maintenance costs?',
    ['Corrective maintenance', 'Adaptive maintenance', 'Perfective maintenance (adding enhancements, optimizations, and requested changes)', 'Preventive maintenance'], 2,
    'Studies (e.g. Lientz & Swanson) show that Perfective maintenance accounts for over 50% of maintenance effort, as businesses continually seek new capabilities and performance enhancements for successful systems.'),
  q('se_maint_6', 'Software Maintenance, Refactoring & Technical Debt', 'Medium',
    'What is the "God Object" / "God Class" anti-pattern?',
    ['A class that never throws exceptions', 'A monolithic class that knows too much or does too much, centralizing system logic and violating the Single Responsibility Principle', 'A class that manages user authentication', 'A design pattern created for databases'], 1,
    'A God Class accumulates excessive fields, methods, and responsibilities, turning other classes into passive data holders and making the codebase tightly coupled and fragile to change.'),
  q('se_maint_7', 'Software Maintenance, Refactoring & Technical Debt', 'Medium',
    'What is "Lehman\'s First Law of Software Evolution" (Law of Continuing Change)?',
    ['Software should be rewritten every 2 years', 'An E-type software system must continually adapt to changes in its real-world operating environment, or it becomes progressively less satisfactory', 'All software bugs will be discovered in 5 years', 'Developers must change programming languages'], 1,
    'Manny Lehman\'s First Law states that real-world software must continually adapt to user expectations and evolving business environments, or it will inevitably decline into obsolescence.'),
  q('se_maint_8', 'Software Maintenance, Refactoring & Technical Debt', 'Medium',
    'What is "Spaghetti Code"?',
    ['Code written by Italian programmers', 'Unstructured, tangled source code with complex control flow, confusing jumps, and tight coupling, making maintenance extremely difficult', 'Optimized assembly code', 'Code formatting rules in Python'], 1,
    'Spaghetti code lacks architectural structure, featuring tangled control flows (like excessive GOTO statements, deeply nested conditionals, and circular dependencies) that resist modular reasoning.'),
  q('se_maint_9', 'Software Maintenance, Refactoring & Technical Debt', 'Hard',
    'What is "Software Rot" (Code Decay) and what causes it?',
    ['Physical degradation of hard drives over time', 'The slow deterioration of software performance and responsiveness over time caused by uncoordinated patches, changing operating environments, and accumulated technical debt', 'Compiler bitrot caused by cosmic rays', 'Deprecation of HTML standards'], 1,
    'Software does not physically decay, but "software rot" occurs when accumulated patches, shifting dependencies, unaligned architectural edits, and outdated libraries gradually degrade software stability and maintainability.'),
  q('se_maint_10', 'Software Maintenance, Refactoring & Technical Debt', 'Hard',
    'What is the "Boy Scout Rule" in software engineering maintenance?',
    ['Always wear a uniform during code reviews', 'Always leave the code cleaner than you found it (refactor small blemishes whenever touching a file)', 'Never change code written by senior developers', 'Always write tests in C++'], 1,
    'Popularized by Uncle Bob (Robert C. Martin), the Boy Scout Rule states: "Always check code in cleaner than when you checked it out." Gradual, steady micro-refactorings keep codebases healthy and prevent technical debt buildup.'),

  // 11. Software Metrics & Quality Assurance
  q('se_met_1', 'Software Metrics & Quality Assurance', 'Easy',
    'What does Cyclomatic Complexity measure in a software module?',
    ['The number of lines of code in a file', 'The number of linearly independent execution paths through a program\'s source code', 'The total memory consumed by variables', 'The compilation time in seconds'], 1,
    'Developed by Thomas McCabe, Cyclomatic Complexity measures the number of decision points (if/else, loops, switch cases) plus 1, indicating the minimum number of test cases required for full branch coverage.'),
  q('se_met_2', 'Software Metrics & Quality Assurance', 'Easy',
    'What is the mathematical formula for McCabe\'s Cyclomatic Complexity V(G) given a control flow graph with E edges, N nodes, and P connected components?',
    ['V(G) = E + N - P', 'V(G) = E - N + 2P', 'V(G) = N - E + P', 'V(G) = E * N / P'], 1,
    'In McCabe\'s graph theory formula: V(G) = E - N + 2P, where E is the number of edges, N is the number of nodes, and P is the number of connected components (usually P = 1 for a single method, yielding E - N + 2).'),
  q('se_met_3', 'Software Metrics & Quality Assurance', 'Easy',
    'What is "Defect Density" metric in software quality assurance?',
    ['The weight of computer bugs in grams', 'The number of confirmed defects identified in a software component divided by the size of that component (typically defects per KLOC - thousand lines of code)', 'The speed at which bugs are resolved', 'The number of QA engineers per developer'], 1,
    'Defect Density = (Total Defects Found) / (Size in KLOC or Function Points), providing a standardized metric to compare code quality across modules of varying sizes.'),
  q('se_met_4', 'Software Metrics & Quality Assurance', 'Easy',
    'What is the ideal relationship between Cohesion and Coupling in well-engineered software?',
    ['Low Cohesion and High Coupling', 'High Cohesion and Low Coupling', 'Low Cohesion and Low Coupling', 'High Cohesion and High Coupling'], 1,
    'High Cohesion (elements within a module belong together and execute a single focused purpose) combined with Low Coupling (minimal dependencies between different modules) is the hallmark of robust software architecture.'),
  q('se_met_5', 'Software Metrics & Quality Assurance', 'Medium',
    'In Object-Oriented metrics (Chidamber & Kemerer), what does CBO (Coupling Between Objects) measure?',
    ['The number of lines of comments in a class', 'The number of other classes to which a given class is coupled/dependent upon', 'The number of sub-classes inheriting from a class', 'The depth of the inheritance tree'], 1,
    'CBO counts the number of other classes to which a class is coupled. High CBO impedes modularity, reduces class reusability, and increases the likelihood that changes in one class will ripple to others.'),
  q('se_met_6', 'Software Metrics & Quality Assurance', 'Medium',
    'What does DIT (Depth of Inheritance Tree) measure and why is excessive DIT dangerous?',
    ['The number of folders in a directory', 'The maximum length from the class to the root class; excessively deep trees increase complexity, make understanding inherited methods difficult, and violate LSP', 'The number of hard disk partitions', 'The number of interfaces implemented'], 1,
    'DIT measures how many ancestor classes exist. Excessive DIT makes predicting class behavior difficult, complicates testing, and creates fragile base class hierarchies where superclass edits break deep subclasses.'),
  q('se_met_7', 'Software Metrics & Quality Assurance', 'Medium',
    'What do Halstead\'s Software Science metrics use as their fundamental building blocks?',
    ['CPU clock cycles and RAM cache lines', 'Counts of unique and total operators and operands present in source code', 'Story points and sprint velocity', 'Git pull request counts'], 1,
    'Maurice Halstead\'s metrics measure program length, vocabulary, volume, difficulty, and effort based on counts of distinct operators (n1), distinct operands (n2), total operators (N1), and total operands (N2).'),
  q('se_met_8', 'Software Metrics & Quality Assurance', 'Medium',
    'What does a Cyclomatic Complexity score above 20 generally indicate for a single function?',
    ['The code is well-structured and optimal', 'The function has high risk, complex branching logic, is hard to test, and should be refactored into smaller sub-methods', 'The function cannot be compiled', 'The function uses too many comments'], 1,
    'A cyclomatic complexity of 1-10 is considered low risk and simple. 11-20 is moderate risk. Values over 20 indicate high complexity and poor maintainability that should be refactored into smaller, modular functions.'),
  q('se_met_9', 'Software Metrics & Quality Assurance', 'Hard',
    'What is the Maintainability Index (MI) and what factors contribute to its calculation?',
    ['A metric tracking hard disk life expectancy', 'A composite metric (typically 0 to 100) computed from Halstead Volume, Cyclomatic Complexity, Lines of Code (LOC), and percentage of comment lines', 'A developer satisfaction rating', 'A network bandwidth ratio'], 1,
    'The Maintainability Index calculates a score from 0-100 indicating codebase maintainability, combining Halstead Volume (HV), Cyclomatic Complexity (CC), Lines of Code (LOC), and comment density.'),
  q('se_met_10', 'Software Metrics & Quality Assurance', 'Hard',
    'In Robert C. Martin\'s package metrics, what does the "Instability" (I) metric represent?',
    ['The probability of server crashes', 'The ratio of efferent coupling (outgoing dependencies) to total coupling: I = Ce / (Ca + Ce), where I=0 is maximally stable and I=1 is maximally instable', 'The number of memory leaks', 'The frequency of code deployments'], 1,
    'Instability I = Ce / (Ca + Ce), where Ca is afferent coupling (incoming dependencies) and Ce is efferent coupling (outgoing dependencies). A package with Ce=0 (I=0) is maximally stable because many depend on it and it depends on none.'),

  // 12. Software Project Estimation & Models
  q('se_est_1', 'Software Project Estimation & Models', 'Easy',
    'What does COCOMO stand for in software project estimation?',
    ['Continuous Code Monitoring Model', 'Constructive Cost Model', 'Coordinated Computing Module', 'Common Object Component Model'], 1,
    'COCOMO (Constructive Cost Model), formulated by Barry Boehm, is an algorithmic cost estimation model that predicts effort, cost, and schedule based on project size (KLOC).'),
  q('se_est_2', 'Software Project Estimation & Models', 'Easy',
    'What are the three project modes defined in Basic COCOMO?',
    ['Alpha, Beta, Production', 'Organic, Semi-Detached, and Embedded', 'Small, Medium, Enterprise', 'Waterfall, Agile, Hybrid'], 1,
    'Basic COCOMO defines 3 modes: Organic (small, familiar teams, relaxed constraints), Semi-Detached (intermediate team and requirements), and Embedded (tight hardware/software constraints and strict regulations).'),
  q('se_est_3', 'Software Project Estimation & Models', 'Easy',
    'What unit is commonly used to express development effort in software engineering estimation models?',
    ['Kilowatt-hours', 'Person-Months (or Man-Months)', 'Gigabytes per second', 'Lines of code per day'], 1,
    'Effort is traditionally measured in Person-Months (the effort of one person working productively for one month), calculated as Effort = a * (KLOC)^b.'),
  q('se_est_4', 'Software Project Estimation & Models', 'Easy',
    'What is "Planning Poker" in Agile estimation?',
    ['A card game played during company breaks', 'A consensus-based estimation technique using Fibonacci-like cards to estimate relative user story points without anchoring bias', 'A gambling software app', 'A method to estimate database table sizes'], 1,
    'Planning Poker uses playing cards with modified Fibonacci numbers (1, 2, 3, 5, 8, 13...). Team members reveal their estimates simultaneously, exposing divergent assumptions without anchoring to loud opinions.'),
  q('se_est_5', 'Software Project Estimation & Models', 'Medium',
    'What is the core premise of Function Point Analysis (FPA) compared to LOC-based estimation?',
    ['FPA counts the number of C++ functions in source code', 'FPA measures system size from the user perspective based on functional capabilities (inputs, outputs, inquiries, internal files, external interfaces) independent of programming language', 'FPA is only used for hardware projects', 'FPA estimates server RAM consumption'], 1,
    'Allan Albrecht developed Function Point Analysis to evaluate project size based on business functionality delivered to users (external inputs, external outputs, external inquiries, internal logical files, external interface files), avoiding programming language bias.'),
  q('se_est_6', 'Software Project Estimation & Models', 'Medium',
    'In COCOMO II, how does estimation differ from the original 1981 COCOMO model?',
    ['COCOMO II eliminates mathematical formulas', 'COCOMO II provides three tailored sub-models for modern development: Application Composition, Early Design, and Post-Architecture, supporting reusable components and object-oriented paradigms', 'COCOMO II is exclusively for waterfall projects', 'COCOMO II only measures cloud costs'], 1,
    'COCOMO II updates Boehm\'s original model to reflect modern practices (COTS software, rapid application generators, object-oriented design) with sub-models reflecting evolving detail throughout the lifecycle.'),
  q('se_est_7', 'Software Project Estimation & Models', 'Medium',
    'What is the "Cone of Uncertainty" in software estimation?',
    ['A weather forecasting radar for server rooms', 'A concept showing that early project estimates have high variance (up to 4x over or under), which narrows progressively as architectural research and development proceed', 'A visual representation of technical debt', 'A diagram of database indexes'], 1,
    'Steve McConnell\'s Cone of Uncertainty illustrates that at initial project inception, estimates can be off by a factor of 4x due to unknowns. As decisions are made and requirements solidify, variance shrinks toward 1.0x.'),
  q('se_est_8', 'Software Project Estimation & Models', 'Medium',
    'What is Parkinson\'s Law in the context of software project schedules?',
    ['Bugs multiply exponentially when developers sleep', '"Work expands so as to fill the time available for its completion"', 'Software will always exceed hardware memory', 'Refactoring increases project cost by 50%'], 1,
    'Parkinson\'s Law states: "Work expands so as to fill the time available for its completion." If a two-week task is allotted four weeks, developers will overcomplicate or delay it until the entire four weeks are consumed.'),
  q('se_est_9', 'Software Project Estimation & Models', 'Hard',
    'What is Brooks\' Law from "The Mythical Man-Month"?',
    ['Writing code in assembly doubles developer productivity', '"Adding manpower to a late software project makes it later"', 'Software estimates should always be multiplied by pi', 'A project manager can replace 5 programmers'], 1,
    'Fred Brooks observed that adding new people to an already delayed project creates an onboarding burden on existing senior developers and quadratically increases communication overhead (n*(n-1)/2 channels), delaying the project further.'),
  q('se_est_10', 'Software Project Estimation & Models', 'Hard',
    'In three-point PERT estimation, what is the formula used to calculate the Expected Duration (E)?',
    ['E = (Optimistic + Pessimistic) / 2', 'E = (Optimistic + 4 * Most_Likely + Pessimistic) / 6', 'E = (Optimistic + Most_Likely + Pessimistic) / 3', 'E = Most_Likely * 1.5'], 1,
    'PERT weighted average formula: E = (O + 4M + P) / 6, where O is optimistic estimate, M is most likely estimate, and P is pessimistic estimate, providing a realistic probability distribution.'),

  // 13. DevOps Culture, CI/CD & Release Management
  q('se_devops_1', 'DevOps Culture, CI/CD & Release Management', 'Easy',
    'What does the term "DevOps" primarily represent?',
    ['A specific brand of cloud server', 'A cultural and technical philosophy unifying Development (Dev) and IT Operations (Ops) to shorten the development lifecycle and deliver high-quality software continuously', 'A programming language replacing Python', 'A tool that automatically writes code'], 1,
    'DevOps is a collaborative culture, set of practices, and toolsets bridging developers and operations teams to automate and accelerate build, test, and release cycles safely.'),
  q('se_devops_2', 'DevOps Culture, CI/CD & Release Management', 'Easy',
    'What is Continuous Integration (CI)?',
    ['Merging all code once a year', 'A practice where developers frequently merge code changes into a central repository, triggering automated builds and tests on every commit to detect errors early', 'Running databases in the cloud', 'Continuous monitoring of employee work hours'], 1,
    'In CI, developers commit code frequently to a shared trunk. Every commit triggers an automated build and test pipeline, providing immediate feedback on whether the commit broke any existing functionality.'),
  q('se_devops_3', 'DevOps Culture, CI/CD & Release Management', 'Easy',
    'What is the difference between Continuous Delivery and Continuous Deployment?',
    ['Continuous Delivery is manual; Continuous Deployment is automated', 'In Continuous Delivery, every passing build is automatically packaged and staged so it is releasable to production at the click of a button; in Continuous Deployment, every passing build is deployed to production automatically without manual approval', 'They are exact synonyms', 'Continuous Delivery applies to mobile apps only'], 1,
    'Continuous Delivery ensures code is always in a deployable state and staging is automated, but requires a human business trigger to push to live production. Continuous Deployment deploys every validated build directly to production automatically.'),
  q('se_devops_4', 'DevOps Culture, CI/CD & Release Management', 'Easy',
    'What is "Infrastructure as Code" (IaC)?',
    ['Writing operating systems from scratch', 'Managing and provisioning computing infrastructure (servers, networks, load balancers) through machine-readable definition files rather than manual hardware configuration', 'Writing code inside computer BIOS', 'Printing source code on paper'], 1,
    'IaC (e.g. Terraform, Ansible, CloudFormation) treats server and network configuration as software code: version-controlled, testable, repeatable, and automated.'),
  q('se_devops_5', 'DevOps Culture, CI/CD & Release Management', 'Medium',
    'What is "Blue-Green Deployment"?',
    ['Deploying servers in ocean containers', 'A zero-downtime release technique using two identical production environments (Blue and Green): one serves live traffic while the new version is deployed and tested on the idle one, after which traffic is switched instantly via the router/load balancer', 'Deploying only during daylight hours', 'Color-coding server racks'], 1,
    'Blue-Green deployment runs two identical environments. While Blue serves live production traffic, the new release is deployed and verified on Green. Once verified, the load balancer switches traffic to Green. If an issue arises, immediate rollback to Blue is trivial.'),
  q('se_devops_6', 'DevOps Culture, CI/CD & Release Management', 'Medium',
    'What is a "Canary Deployment"?',
    ['Using birds to detect gas leaks in data centers', 'Rolling out a new software version to a small subset of real users (e.g. 5%) first, monitoring error rates and performance before gradually expanding traffic to the entire user base', 'Deploying exclusively to staging environments', 'Deploying code on developer laptops'], 1,
    'Named after coal mine canaries: Canary releases route a small fraction of real production traffic to the new version. Telemetry and error rates are compared against the stable baseline before rolling out to 100% of users.'),
  q('se_devops_7', 'DevOps Culture, CI/CD & Release Management', 'Medium',
    'What is the purpose of "Feature Toggles" (Feature Flags) in continuous delivery?',
    ['To turn off servers during maintenance', 'To enable or disable features at runtime in production via configuration without redeploying code, decoupling code deployment from feature release', 'To toggle dark mode in the IDE', 'To turn off unit tests in CI'], 1,
    'Feature flags allow developers to continuously merge and deploy incomplete or dark-launched features to production while keeping them dormant for end users until ready, mitigating deployment risk.'),
  q('se_devops_8', 'DevOps Culture, CI/CD & Release Management', 'Medium',
    'What are the four "DORA Metrics" used to measure high-performing engineering teams?',
    ['Lines of code, bugs logged, hours worked, coffee consumed', 'Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service (MTTR)', 'CPU usage, memory leaks, disk IO, network latency', 'Sprint velocity, story points, burndown rate, bug count'], 1,
    'DevOps Research and Assessment (DORA) identified 4 key performance metrics: Deployment Frequency (speed), Lead Time for Changes (speed), Change Failure Rate (stability), and Mean Time to Restore Service (stability).'),
  q('se_devops_9', 'DevOps Culture, CI/CD & Release Management', 'Hard',
    'What is "GitOps"?',
    ['Using Git exclusively through a GUI client', 'An operational framework where Git repositories serve as the single source of truth for declarative infrastructure and applications, using automated agents (e.g. ArgoCD) to reconcile desired and actual state', 'Hosting Git on private USB drives', 'A Git commit convention for bug fixes'], 1,
    'In GitOps, system state is defined declaratively in Git. Software agents (like ArgoCD or Flux) continuously monitor the Git repo and automatically sync Kubernetes clusters to match the Git state, preventing configuration drift.'),
  q('se_devops_10', 'DevOps Culture, CI/CD & Release Management', 'Hard',
    'What is the role of "Semantic Versioning" (SemVer: MAJOR.MINOR.PATCH) in release management?',
    ['To assign random numbers to builds', 'To convey breaking change intent: MAJOR increments for breaking API changes, MINOR for backwards-compatible new features, and PATCH for backwards-compatible bug fixes', 'To track developer employee IDs', 'To calculate software price tags'], 1,
    'SemVer (X.Y.Z) provides standard semantic meaning: MAJOR version increments break backwards compatibility; MINOR increments add backwards-compatible features; PATCH increments provide backwards-compatible bug fixes.'),

  // 14. Code Review Best Practices & Static Analysis
  q('se_cr_1', 'Code Review Best Practices & Static Analysis', 'Easy',
    'What is the primary objective of a peer Code Review?',
    ['To catch typos and format spaces manually', 'To identify defects, improve code quality, ensure adherence to architectural standards, and share knowledge across team members', 'To evaluate developer speed and assign grades', 'To replace automated unit testing'], 1,
    'Code reviews inspect proposed changes to catch bugs early, ensure maintainability and security, verify architectural alignment, and foster collective codebase ownership and mentorship.'),
  q('se_cr_2', 'Code Review Best Practices & Static Analysis', 'Easy',
    'What is "Static Code Analysis"?',
    ['Analyzing code performance while it runs on servers', 'Analyzing source code without executing it, checking for syntax violations, security vulnerabilities, anti-patterns, and style rules', 'Reviewing paper printouts of code', 'Measuring electrical voltages of CPU pins'], 1,
    'Static code analysis examines source code at rest (without runtime execution) using linters and AST analyzers (e.g. SonarQube, ESLint) to catch potential bugs, code smells, and security flaws automatically.'),
  q('se_cr_3', 'Code Review Best Practices & Static Analysis', 'Easy',
    'What is a "Linter"?',
    ['A compiler optimization flag', 'A static analysis tool that flags programming errors, bugs, stylistic errors, and suspicious constructs in source code (e.g. ESLint, Pylint)', 'A tool that compresses source files', 'A test runner for unit tests'], 1,
    'Linters parse code against predefined style guides and semantic rules, highlighting syntax problems, unreferenced variables, formatting inconsistencies, and common footguns before review.'),
  q('se_cr_4', 'Code Review Best Practices & Static Analysis', 'Easy',
    'What is considered best practice regarding Pull Request (PR) size for effective code reviews?',
    ['Submit 3,000 lines across 50 files so everything is in one review', 'Keep PRs small and focused (typically under 200-400 lines) so reviewers can thoroughly review without review fatigue', 'Never submit PRs; commit directly to main branch', 'Combine 5 unrelated bug fixes into one single PR'], 1,
    'Studies demonstrate that reviewer effectiveness plummets when inspecting changes over 400 lines of code. Small, atomic PRs receive higher quality scrutiny, faster turnaround, and pose lower deployment risk.'),
  q('se_cr_5', 'Code Review Best Practices & Static Analysis', 'Medium',
    'What is the difference between Static Analysis and Dynamic Analysis (e.g. Valgrind, Profilers)?',
    ['Static analysis runs in the cloud; Dynamic runs on laptops', 'Static analysis inspects code structure without execution; Dynamic analysis evaluates code behavior during execution, monitoring memory leaks, concurrency races, and runtime performance', 'Static analysis catches all memory leaks; Dynamic does not', 'Dynamic analysis checks syntax only'], 1,
    'Static analysis checks source files without running them (finding pattern flaws). Dynamic analysis runs instrumented binaries (finding runtime memory leaks, pointer bugs, lock contention, and cache thrashing).'),
  q('se_cr_6', 'Code Review Best Practices & Static Analysis', 'Medium',
    'What is "Fagan Inspection" in formal software engineering?',
    ['An automated GitHub Action bot', 'A formal, highly structured team review process involving defined roles (Moderator, Author, Reader, Tester) to systematically inspect documents or code line by line for defects', 'A technique for writing fast SQL queries', 'A unit testing library in C++'], 1,
    'Michael Fagan developed this structured inspection method with strict entrance/exit criteria, formal roles, and sequential steps (Planning, Overview, Preparation, Inspection Meeting, Rework, Follow-up).'),
  q('se_cr_7', 'Code Review Best Practices & Static Analysis', 'Medium',
    'What is a "SAST" (Static Application Security Testing) tool and how does it fit into CI/CD?',
    ['A tool that attacks servers from the internet', 'A security tool integrated into pipelines that analyzes source code for known security vulnerabilities (like SQL injection, XSS, insecure cryptography) before deployment', 'A firewall hardware appliance', 'An automated antivirus scanner for email'], 1,
    'SAST tools (e.g. Checkmarx, SonarQube, Snyk) scan repositories in the CI pipeline to uncover OWASP Top 10 vulnerabilities and hardcoded credentials before code is ever merged.'),
  q('se_cr_8', 'Code Review Best Practices & Static Analysis', 'Medium',
    'What is an "Egoless Programming" mindset in code reviews?',
    ['Writing code without declaring your name', 'Separating one\'s personal self-worth and ego from the code one writes, viewing review critiques objectively as opportunities to improve the collective product rather than personal attacks', 'Letting AI write all source code', 'Never reviewing peers\' code'], 1,
    'Gerald Weinberg\'s concept: "You are not your code." A healthy review culture requires accepting that software engineering is collaborative; finding a defect in code is a positive contribution, not an insult to the author.'),
  q('se_cr_9', 'Code Review Best Practices & Static Analysis', 'Hard',
    'What is "Bikeshedding" (Parkinson\'s Law of Triviality) in code reviews?',
    ['Building server sheds for developer bicycles', 'The tendency for reviewers to spend disproportionate time debating trivial, subjective details (like variable names or comma placement) while glossing over complex architectural decisions', 'Ignoring code reviews for 3 weeks', 'Automating styling using Prettier'], 1,
    'Bikeshedding occurs when reviewers focus passionately on trivial points anyone can have an opinion on (e.g., tabs vs spaces), while complex architectural flaws or concurrency race conditions pass without deep analysis.'),
  q('se_cr_10', 'Code Review Best Practices & Static Analysis', 'Hard',
    'How does automated formatting (e.g. Prettier, Black, Clang-Format) combined with git pre-commit hooks elevate code review quality?',
    ['It writes unit tests automatically', 'It eliminates all stylistic debates and bikeshedding from code reviews, letting human reviewers focus purely on architectural soundness, business logic, security, and performance', 'It doubles compiler execution speed', 'It prevents merge conflicts permanently'], 1,
    'By enforcing automated formatting via git pre-commit hooks, zero reviewer mental energy is wasted on formatting, indentation, or syntax nuances, preserving human scrutiny for architecture, logic correctness, and edge-case handling.')
];

const seContent = `// js/data/interviewPrep/softwareEngineering.js
// Complete Question Bank for Software Engineering (14 topics * 10 = 140 MCQs)

window.interviewPrepSE = {
  id: 'software_engineering',
  title: 'Software Engineering',
  icon: 'engineering',
  description: 'Master SDLC models, Agile/Scrum, requirements engineering, UML, SOLID principles, testing, and DevOps.',
  totalQuestions: ${seQuestions.length},
  topics: [
    'SDLC Models',
    'Agile Methodology & Scrum Framework',
    'Requirements Engineering & SRS',
    'Software Architecture Patterns',
    'UML Diagrams',
    'Design Principles',
    'Software Testing Fundamentals',
    'Testing Levels',
    'Test Automation & TDD vs BDD',
    'Software Maintenance, Refactoring & Technical Debt',
    'Software Metrics & Quality Assurance',
    'Software Project Estimation & Models',
    'DevOps Culture, CI/CD & Release Management',
    'Code Review Best Practices & Static Analysis'
  ],
  questions: ${JSON.stringify(seQuestions, null, 2)}
};
`;
fs.writeFileSync(path.join(outDir, 'softwareEngineering.js'), seContent);
console.log(`Successfully generated softwareEngineering.js (${seQuestions.length} questions across 14 topics)`);


// ==========================================
// 13. SYSTEM DESIGN
// 20 High-Yield MCQs + 10 Complete System Design Case Studies
// ==========================================
console.log('Generating System Design data...');
const sdQuestions = [
  q('sd_mcq_1', 'System Design Fundamentals', 'Easy',
    'What is the difference between Vertical Scaling (Scale Up) and Horizontal Scaling (Scale Out)?',
    ['Vertical adds more servers; Horizontal adds RAM to one server', 'Vertical adds more power (CPU, RAM, NVMe) to an existing single machine; Horizontal adds more machines to a distributed cluster', 'Horizontal scaling is only for databases', 'Vertical scaling has no physical limit'], 1,
    'Vertical scaling upgrades hardware resources of a single server (constrained by hardware limits and creates single point of failure). Horizontal scaling distributes load across multiple machines in a network, providing high availability and near-infinite scale.'),
  q('sd_mcq_2', 'System Design Fundamentals', 'Easy',
    'What does the CAP Theorem state regarding distributed data stores?',
    ['A system can achieve Consistency, Availability, and Performance simultaneously', 'A distributed system can guarantee at most two out of three properties simultaneously: Consistency, Availability, and Partition Tolerance', 'Network partitions can be avoided with fiber optics', 'All databases must be ACID compliant'], 1,
    'Eric Brewer\'s CAP theorem proves that in the presence of an inevitable network partition (P), a distributed system must choose between Consistency (C - all nodes see identical data simultaneously) or Availability (A - every non-failing node returns a non-error response).'),
  q('sd_mcq_3', 'System Design Fundamentals', 'Easy',
    'What is a Load Balancer and at which OSI layers does it typically operate?',
    ['A database query optimizer running at Layer 2', 'A device or software distributing incoming network traffic across multiple backend servers, operating primarily at Layer 4 (Transport - TCP/UDP) or Layer 7 (Application - HTTP/HTTPS)', 'A hardware firewall operating only at Layer 1', 'A cache replacement mechanism'], 1,
    'Load balancers distribute user requests across server pools. L4 load balancers make routing decisions based on IP address and TCP/UDP ports. L7 load balancers inspect application data (HTTP headers, URLs, cookies) for content-based routing.'),
  q('sd_mcq_4', 'System Design Fundamentals', 'Easy',
    'What is the primary difference between SQL (Relational) and NoSQL databases in system design?',
    ['SQL databases cannot store text', 'SQL databases have structured schemas, ACID transactions, and support relational joins; NoSQL databases offer flexible schemas, horizontal scaling, and optimize for specific data models (key-value, document, column, graph)', 'NoSQL databases do not support clustering', 'SQL is always faster for massive distributed reads'], 1,
    'SQL databases (PostgreSQL, MySQL) excel at complex relational queries and strong ACID guarantees. NoSQL databases (MongoDB, Cassandra, DynamoDB) trade relational joins for schema flexibility, horizontal partitioning, and high-throughput distributed operations.'),
  q('sd_mcq_5', 'System Design Fundamentals', 'Medium',
    'What is the "Cache-Aside" (Lazy Loading) caching pattern?',
    ['The cache automatically writes to the database in the background', 'The application first checks the cache for data; if found (hit), returns it; if absent (miss), loads from database, writes it to cache, and returns it', 'The database writes directly to the cache on every insert', 'Cache entries never expire'], 1,
    'In Cache-Aside: Application checks cache -> On miss, reads from database -> Populates cache with retrieved data -> Returns data. Only requested data is cached, avoiding memory bloat for unaccessed records.'),
  q('sd_mcq_6', 'System Design Fundamentals', 'Medium',
    'What problem does "Consistent Hashing" solve in distributed caching and database sharding?',
    ['It encrypts user passwords across nodes', 'When nodes are added or removed from a cluster, it ensures that only K/N keys need to be remapped on average (where K is keys and N is servers), preventing mass cache invalidation', 'It forces all cache queries to run synchronously', 'It guarantees zero latency on queries'], 1,
    'Traditional hash mod N (`hash(key) % N`) causes almost all keys to be reshuffled whenever a server joins or leaves. Consistent hashing maps keys and servers onto a circular ring (hash ring), minimizing data movement when nodes scale.'),
  q('sd_mcq_7', 'System Design Fundamentals', 'Medium',
    'What is the difference between Write-Through and Write-Back caching strategies?',
    ['Write-through is for hard drives; write-back is for RAM', 'Write-Through writes synchronously to both cache and backing DB before confirming success; Write-Back writes immediately to cache and acknowledges, writing to DB asynchronously in batches', 'Write-back guarantees zero risk of data loss on crash', 'Write-through has the lowest write latency'], 1,
    'Write-Through ensures strong data consistency and durability at the cost of higher write latency. Write-Back offers ultra-fast write latency but risks data loss if the cache server crashes before flushing dirty pages to the database.'),
  q('sd_mcq_8', 'System Design Fundamentals', 'Medium',
    'What does the PACELC Theorem add to the traditional CAP Theorem?',
    ['It includes cloud pricing into architectural analysis', 'It states that IF there is a partition (P), trade off Availability (A) and Consistency (C); ELSE (E), trade off Latency (L) and Consistency (C)', 'It replaces network partitions with fiber cables', 'It proves all systems can be both available and consistent'], 1,
    'Daniel Abadi\'s PACELC theorem extends CAP: Even when the system runs normally without partitions (Else), there is an unavoidable fundamental trade-off between Latency (L) and Consistency (C) across distributed replicas.'),
  q('sd_mcq_9', 'System Design Fundamentals', 'Medium',
    'What is Database Sharding (Horizontal Partitioning)?',
    ['Duplicating an entire database onto 10 servers', 'Splitting a large database table into smaller separate database instances (shards) across servers based on a shard key (e.g. user_id mod 10)', 'Backing up a database to tape storage', 'Converting SQL tables to JSON files'], 1,
    'Sharding distributes table rows across multiple independent physical database nodes based on a partition key (shard key), overcoming the CPU, RAM, and disk storage boundaries of single-server databases.'),
  q('sd_mcq_10', 'System Design Fundamentals', 'Medium',
    'What is the "Thundering Herd Problem" (Cache Stampede) and how is it mitigated?',
    ['A network virus overloading switches', 'When a popular cached item expires, hundreds of concurrent requests experience a cache miss simultaneously and hammer the database; mitigated using mutex locks (probabilistic early expiration or singleflight)', 'Database disk failure during heavy traffic', 'Too many developers deploying code simultaneously'], 1,
    'Cache stampede occurs when a high-traffic cache key expires, causing massive concurrent queries to hit the database at once. It is prevented using distributed mutex locks, cache warming, or probabilistic early background recomputation (XFetch).'),
  q('sd_mcq_11', 'System Design Fundamentals', 'Medium',
    'How does a "Token Bucket" rate limiter work?',
    ['It measures the number of open TCP sockets', 'Tokens are continuously added to a bucket at a fixed rate up to a max capacity; each incoming request consumes a token; if bucket is empty, request is dropped or throttled', 'It logs every request timestamp in an unbounded array', 'It resets request counters at the beginning of each hour'], 1,
    'The Token Bucket algorithm adds tokens at a constant rate `r` up to capacity `b`. It accommodates temporary bursts of traffic (up to `b` requests instantly) while maintaining an average rate constraint.'),
  q('sd_mcq_12', 'System Design Fundamentals', 'Medium',
    'What is the difference between Polling, Long Polling, WebSockets, and Server-Sent Events (SSE)?',
    ['They are identical protocols', 'Polling periodically queries the server; Long Polling holds HTTP connection open until data arrives; WebSockets provide full-duplex bi-directional TCP communication; SSE provides mono-directional server-to-client streaming over HTTP', 'WebSockets can only send plain text', 'SSE requires opening a new TCP connection per event'], 1,
    'Polling wastes HTTP requests. Long Polling reduces latency by holding requests open until an update occurs. WebSockets establish persistent, full-duplex, low-overhead communication. SSE offers lightweight, unidirectional server-to-client streaming over HTTP.'),
  q('sd_mcq_13', 'System Design Fundamentals', 'Medium',
    'What is a Content Delivery Network (CDN) and what traffic is best served by it?',
    ['A database clustering software', 'A geographically distributed network of proxy edge servers that cache static assets (images, videos, CSS/JS, HTML) close to users, reducing latency and offloading origin servers', 'A private fiber optic cable connecting data centers', 'A software load balancer for microservices'], 1,
    'CDNs place edge caching servers in points of presence (PoPs) worldwide. Serving static and cacheable dynamic media from local edge caches reduces origin server load and minimizes round-trip latency for global users.'),
  q('sd_mcq_14', 'System Design Fundamentals', 'Medium',
    'What is a "Circuit Breaker" pattern in microservices?',
    ['An electrical fuse in data center racks', 'A design pattern that monitors external calls; if failures cross a threshold, it trips open to fail fast immediately without calling the unhealthy dependency, giving it time to recover before testing with half-open requests', 'A firewall rule blocking DDoS attacks', 'A database transaction rollback'], 1,
    'Michael Nygard\'s Circuit Breaker wraps risky calls. In Closed state, requests pass through. If errors exceed a threshold, it switches to Open (failing fast immediately without overloading the downstream service). After a timeout, Half-Open lets limited requests through to verify recovery.'),
  q('sd_mcq_15', 'System Design Fundamentals', 'Hard',
    'What is the difference between Message Queues (RabbitMQ) and Distributed Event Logs (Apache Kafka)?',
    ['RabbitMQ is for databases; Kafka is for caches', 'RabbitMQ is a smart-broker/dumb-consumer message queue that tracks message consumption and removes messages upon ACK; Kafka is an append-only distributed commit log where consumers manage their own offset and messages persist long-term', 'Kafka cannot scale horizontally', 'RabbitMQ stores messages forever on disk'], 1,
    'RabbitMQ distributes discrete work tasks to workers, deleting messages after acknowledgment. Kafka is a partitioned distributed event log: messages are immutable, stored for days/weeks, and multiple consumer groups independently replay or read streams at their own pace.'),
  q('sd_mcq_16', 'System Design Fundamentals', 'Hard',
    'What is a "Bloom Filter" and why is it used in high-scale distributed systems?',
    ['A graphical image filter in UI rendering', 'A space-efficient probabilistic data structure used to test set membership, returning either "definitely not in set" or "probably in set" with zero false negatives', 'A sorting algorithm for distributed arrays', 'A cryptographic hashing function for passwords'], 1,
    'Bloom filters use bit arrays and multiple hash functions. They answer membership queries in O(k) time and negligible RAM. If it returns False, the item is guaranteed absent (avoiding expensive disk/network lookups). It has a small tunable false positive rate, but never false negatives.'),
  q('sd_mcq_17', 'System Design Fundamentals', 'Hard',
    'How does Cassandra achieve high write throughput and what is LSM-Tree (Log-Structured Merge-Tree)?',
    ['By writing directly to random sectors on spinning disks', 'By appending writes sequentially to an in-memory Memtable and Commit Log, then flushing immutable SSTables to disk and merging them via background compaction', 'By locking the entire database during inserts', 'By eliminating all write replication'], 1,
    'LSM-Trees turn slow random disk writes into fast sequential writes: writes go to an in-memory Memtable and sequential WAL. When full, Memtable flushes as an immutable SSTable file. Background compaction merges SSTables, eliminating dead versions.'),
  q('sd_mcq_18', 'System Design Fundamentals', 'Hard',
    'What is the difference between "Strong Consistency" and "Eventual Consistency"?',
    ['Strong consistency means data is encrypted; Eventual means unencrypted', 'Strong Consistency guarantees all subsequent reads across all replicas return the latest write immediately; Eventual Consistency guarantees that if no new updates occur, all replicas will eventually converge to identical state', 'Eventual consistency never updates secondary replicas', 'Strong consistency requires no network connections'], 1,
    'Strong consistency (CP) requires cross-node synchronization before confirming writes, incurring higher latency. Eventual consistency (AP) confirms writes locally and propagates updates asynchronously, offering high availability and low latency at the expense of temporary stale reads.'),
  q('sd_mcq_19', 'System Design Fundamentals', 'Hard',
    'In designing a distributed ID generator (e.g. Twitter Snowflake), why is relying on database auto-increment IDs inadequate?',
    ['Database IDs only go up to 100', 'Single database auto-increment creates a single point of failure and write bottleneck, while multiple databases with offsets become messy to scale horizontally and don\'t provide k-sorted ordering across distributed nodes', 'Database IDs cannot be stored in 64-bit integers', 'Auto-increment IDs cannot be indexed'], 1,
    'At scale, a single DB auto-increment cannot handle hundreds of thousands of IDs/sec. Snowflake generates 64-bit globally unique, roughly time-sorted IDs autonomously without coordination using: Epoch Timestamp + Machine/DataCenter ID + Sequence Number.'),
  q('sd_mcq_20', 'System Design Fundamentals', 'Hard',
    'What is "Write-Behind" (Write-Back) caching failure mode and how do modern systems protect against data loss?',
    ['Cache writes are rejected if RAM is full', 'Because data is acknowledged to the client before being written to persistent storage, a node crash can lose data; modern systems use battery-backed RAM, NVMe write-ahead logging (WAL), or replicated cache nodes', 'The database crashes whenever cache is updated', 'Clients must retry every write twice'], 1,
    'Write-Behind caches acknowledge writes before committing to disk. If the cache machine loses power, dirty uncommitted updates are lost. Systems mitigate this using redundant replicated cache clusters (Redis Sentinel/Cluster) and persistent fast append logs on NVMe.')
];

// 10 Detailed Case Studies
const sdCaseStudies = [
  {
    id: 'sd_case_1',
    title: 'Design a Scalable URL Shortener (TinyURL)',
    problemStatement: 'Design a web service that takes long URLs and generates unique, short aliases (e.g., tinyurl.com/xyz123) that redirect users to original URLs upon click.',
    functionalRequirements: [
      'Given a long URL, generate a unique, short URL alias.',
      'When accessing the short URL, redirect users with HTTP 301/302 to the original destination.',
      'Users can optionally specify a custom alias (e.g., tinyurl.com/my-portfolio).',
      'Links expire after a default or user-configured TTL.'
    ],
    nonFunctionalRequirements: [
      'High availability (99.99% uptime) - redirection must never fail.',
      'Low latency redirection (< 20 ms).',
      'Short URLs should be compact and not guessable.',
      'System is heavily read-heavy (100:1 read-to-write ratio).'
    ],
    scaleAndEstimations: [
      'Write throughput: 500 million new URLs generated per month (~200 writes/sec).',
      'Read throughput: 50 billion redirections per month (~20,000 reads/sec peak).',
      'Storage: 500M * 500 bytes = 250 GB/month -> ~15 TB for 5 years.',
      'Cache memory: 20% of hot URLs generate 80% of daily read traffic -> ~30 GB RAM for Redis cache.'
    ],
    coreComponents: [
      'API Gateway / Load Balancer: Distributes traffic and handles rate limiting.',
      'Shortening Service: Generates short keys using Base62 encoding on unique IDs.',
      'Key Generation Service (KGS): Pre-generates random unique Base62 keys in advance and stores them in DB/memory to eliminate runtime collisions.',
      'Distributed Cache (Redis): Caches Top 20% active URLs for sub-millisecond redirection.',
      'Relational / NoSQL Database (PostgreSQL / DynamoDB): Stores mapping: hash_key (PK), original_url, user_id, created_at, expires_at.'
    ],
    dataSchema: `Table: url_mapping
- id: BIGINT PRIMARY KEY
- short_key: VARCHAR(7) UNIQUE INDEX (Base62)
- original_url: VARCHAR(2048) NOT NULL
- user_id: BIGINT (nullable)
- created_at: TIMESTAMP
- expires_at: TIMESTAMP INDEX`,
    apiDesign: [
      'POST /api/v1/shorten { "long_url": "https://...", "custom_alias": "optional", "ttl_days": 30 } -> Returns { "short_url": "https://tiny.url/aB3x9Q" }',
      'GET /{short_key} -> Returns HTTP 301 (Permanent Redirect) or HTTP 302 (Temporary Redirect if tracking analytics) with Location header.'
    ],
    stepByStepArchitecture: [
      '1. User submits long URL via Web/Mobile client.',
      '2. API Gateway validates request, performs rate limiting, and forwards to Shortening Service.',
      '3. Shortening Service fetches an unused 7-character Base62 key from the Key Generation Service (pre-loaded in memory buffers).',
      '4. Mapping is inserted into database and written to Redis cache with TTL.',
      '5. For redirection: Incoming GET request hits Load Balancer -> checks Redis cache first -> on hit returns 301/302 immediately -> on miss queries database, warms cache, and redirects.'
    ],
    cachingAndDbStrategy: 'Base62 encoding of 7 characters provides 62^7 = 3.5 trillion unique URLs. Use Redis LRU cache holding 20% most active URLs. Use DynamoDB or partitioned PostgreSQL sharded by hash(short_key) % N.',
    failureModesAndBottlenecks: [
      'KGS failure: Prevent single point of failure by running redundant KGS instances with distinct key range allocations.',
      'Cache stampede on viral URLs: Use Redis singleflight/mutex locking when refreshing cold keys.',
      'Database bottleneck: Reads are completely absorbed by Redis and read replicas.'
    ],
    keyInterviewQuestions: [
      'Why use HTTP 301 vs HTTP 302 redirect? (301 caches in browser, reducing our server load; 302 forces browser to query server every time, allowing accurate click analytics).',
      'How to handle collisions if using MD5/SHA256 hashing? (Base62 encoding of a counter/KGS avoids collisions altogether).',
      'How to clean up expired links? (Lazy deletion on access combined with periodic background batch sweeping during off-peak hours).'
    ]
  },
  {
    id: 'sd_case_2',
    title: 'Design a Distributed Rate Limiter',
    problemStatement: 'Design a high-throughput, low-latency distributed rate limiter to protect backend APIs from abuse, credential stuffing, scraping, and DDoS attacks.',
    functionalRequirements: [
      'Throttle incoming requests that exceed allowed quotas (e.g. 100 requests per minute per user/IP).',
      'Return standard HTTP 429 Too Many Requests status code with Retry-After header.',
      'Support configurable rules across different tiers, endpoints, and client identifiers (user_id, IP, API key).'
    ],
    nonFunctionalRequirements: [
      'Ultra-low latency: must add less than 2-3 milliseconds overhead to each API request.',
      'High accuracy without race conditions across distributed cluster nodes.',
      'High availability: rate limiter failure should fail-open rather than blocking legitimate business traffic.'
    ],
    scaleAndEstimations: [
      'Scale: 1 million requests/second across all global services.',
      'Memory: 50 million active users * 50 bytes per tracking record = 2.5 GB RAM in Redis cluster.'
    ],
    coreComponents: [
      'API Gateway Middleware: Intercepts requests before reaching backend microservices.',
      'Distributed Cache (Redis Cluster): Tracks token counts and timestamps in-memory.',
      'Rules Configuration Service: Stores rate limiting rules in database and syncs to gateway cache.',
      'Redis Lua Scripts: Executes atomic check-and-decrement operations in a single round-trip without race conditions.'
    ],
    dataSchema: `Redis Key Format: rate:{client_id}:{endpoint}:{window_id}
Value: Hash { "tokens": 42, "last_updated": 1726000000 }`,
    apiDesign: [
      'Middleware response on allowed: HTTP headers X-RateLimit-Limit: 100, X-RateLimit-Remaining: 41, X-RateLimit-Reset: 1726000060',
      'Middleware response on limit exceeded: HTTP 429 Too Many Requests with header Retry-After: 25'
    ],
    stepByStepArchitecture: [
      '1. Client request arrives at API Gateway.',
      '2. Gateway identifies client identifier (JWT user_id, API key, or IP).',
      '3. Gateway evaluates rules for the specific route (e.g., /api/checkout vs /api/search).',
      '4. Gateway calls Redis Cluster executing an atomic Lua script implementing Token Bucket or Sliding Window Log.',
      '5. If tokens available, request proceeds to backend service. If quota exceeded, Gateway returns HTTP 429 immediately.'
    ],
    cachingAndDbStrategy: 'Sliding Window Counter using Redis Sorted Sets (ZSET) or Token Bucket via Redis Hashes. Execute all logic in Redis Lua script to guarantee atomicity and avoid distributed race conditions.',
    failureModesAndBottlenecks: [
      'Redis cluster outage: Fallback to local in-memory gateway token bucket or Fail-Open mode to avoid catastrophic total outage.',
      'Clock synchronization drift: Use Redis server time rather than gateway local system time.',
      'Network latency between Gateway and Redis: Co-locate Redis nodes in the same VPC/availability zone as Gateway instances.'
    ],
    keyInterviewQuestions: [
      'Token Bucket vs Sliding Window: When to use which? (Token bucket is memory-efficient and allows bursts; sliding window prevents burst attacks at window boundaries).',
      'How to handle concurrency race conditions? (Use Redis Lua scripts which execute single-threaded atomically inside Redis engine).',
      'How to scale globally? (Use local regional rate limiters with asynchronous synchronization, or consistent hashing to route client IDs to designated regional Redis nodes).'
    ]
  },
  {
    id: 'sd_case_3',
    title: 'Design a Real-Time Chat System (WhatsApp / Slack)',
    problemStatement: 'Design a distributed messaging system supporting real-time 1-on-1 and group chat, message persistence, online presence status, and push notifications.',
    functionalRequirements: [
      'Send and receive real-time 1-on-1 and group text messages.',
      'Message delivery receipts: Sent (1 check), Delivered (2 checks), Read (2 blue checks).',
      'User online presence indicator (Online, Last Seen).',
      'Offline message queuing and push notifications for mobile clients.'
    ],
    nonFunctionalRequirements: [
      'Ultra-low latency message delivery (< 100 ms).',
      'Zero message loss: messages must be durably persisted.',
      'End-to-end encryption for 1-on-1 chats.',
      'Scalable to 500 million daily active users.'
    ],
    scaleAndEstimations: [
      '500M DAU * 40 messages/day = 20 billion messages/day (~230,000 messages/sec average, 1M/sec peak).',
      'Storage: 20B * 100 bytes = 2 TB/day -> ~730 TB/year. Requires distributed NoSQL (Cassandra / ScyllaDB).'
    ],
    coreComponents: [
      'WebSocket Gateway Servers: Maintains persistent bidirectional TCP connections with active mobile/web clients.',
      'Connection Manager / Session Registry: Distributed Redis/ZooKeeper cluster tracking which user is connected to which WebSocket server.',
      'Chat Microservice: Handles message routing, group fan-out, and validation.',
      'Presence Service: Tracks online/offline status using periodic heartbeat pings.',
      'Message Store (Cassandra): High-throughput append-only distributed database for message history.',
      'Push Notification Service (APNs / FCM): Wakes up offline recipient devices.'
    ],
    dataSchema: `Table: messages (Cassandra)
- chat_id: UUID (Partition Key)
- message_id: TIMEUUID (Clustering Key, ASC)
- sender_id: UUID
- content: TEXT
- status: TINYINT (1=sent, 2=delivered, 3=read)
- created_at: TIMESTAMP`,
    apiDesign: [
      'WebSocket Event: send_message { "to": "user_123", "client_msg_id": "uuid", "content": "Hello!" }',
      'WebSocket Event: ack_message { "message_id": "uuid", "status": "read" }',
      'REST API: GET /api/v1/chats/{chat_id}/messages?cursor=msg_id&limit=50'
    ],
    stepByStepArchitecture: [
      '1. User A connects to WebSocket Gateway; Session Registry records (User A -> Gateway Server 4).',
      '2. User A sends message to User B.',
      '3. Gateway 4 receives message, generates snowflake message_id, and asynchronously writes to Cassandra.',
      '4. Chat Service checks Session Registry for User B.',
      '5. If User B is online on Gateway Server 9: message is forwarded to Server 9 and pushed down User B\'s WebSocket.',
      '6. If User B is offline: message is queued and Push Notification Service triggers Apple APNs/Google FCM.',
      '7. User B receives message -> sends delivery ACK back -> routed to User A to render double checks.'
    ],
    cachingAndDbStrategy: 'Cassandra is chosen because chat is write-heavy and queries fetch chronological slices (`WHERE chat_id = ? ORDER BY message_id`). Redis caches active chat sessions and recent messages.',
    failureModesAndBottlenecks: [
      'WebSocket server crashes: Clients automatically reconnect to another gateway; heartbeat presence detects disconnection after 30 seconds.',
      'Group message fan-out for huge groups (1,000+ members): Use message queues (Kafka) and fan-out on read or batch delivery rather than individual WebSocket pushes.',
      'Split-brain presence status: Use Redis with short TTL; user presence expires automatically if heartbeats fail.'
    ],
    keyInterviewQuestions: [
      'Why WebSockets over HTTP polling? (Maintains persistent bidirectional connection with minimal framing overhead and instant server-to-client push).',
      'How to maintain message ordering across mobile devices? (Use server-generated TimeUUID / Snowflake IDs rather than device clocks).',
      'How to handle large group chats efficiently? (Store one message in the group table, rather than cloning the message into every user\'s individual inbox).'
    ]
  },
  {
    id: 'sd_case_4',
    title: 'Design Distributed Cloud Storage (Google Drive / Dropbox)',
    problemStatement: 'Design a distributed cloud file storage and synchronization service allowing users to upload, download, and synchronize files across multiple devices.',
    functionalRequirements: [
      'Upload, update, download, and delete files.',
      'Automatic file synchronization across all connected devices.',
      'File version history (revert to previous versions).',
      'Share files and folders with other users with read/write permissions.'
    ],
    nonFunctionalRequirements: [
      'Data durability: 99.999999999% (11 9s) durability (zero data loss).',
      'Fast sync: Chunking and delta sync (upload only modified blocks, not entire 1 GB files).',
      'Bandwidth optimization with client-side compression and deduplication.'
    ],
    scaleAndEstimations: [
      '50M daily active users uploading on average 2 files/day = 100M uploads/day.',
      'Average file size: 1 MB -> 100 TB new storage/day. Requires scalable Object Storage (Amazon S3 / Ceph).'
    ],
    coreComponents: [
      'Block Service: Splits large files into 4 MB chunks, hashes chunks (SHA-256), and uploads/downloads chunks to Object Storage.',
      'Object Storage (S3 / Blob): Stores encrypted binary file chunks.',
      'Metadata Service: Stores file hierarchies, directories, file-to-chunk mappings, and version metadata in relational database.',
      'Synchronization Service: Uses long-polling or WebSockets to notify client daemons when file changes are committed.',
      'Client Daemon: Monitors local directory changes, chunks files, computes hashes, and uploads deltas.'
    ],
    dataSchema: `Table: file_metadata (PostgreSQL)
- file_id: UUID PRIMARY KEY
- user_id: UUID
- file_name: VARCHAR(255)
- version: INT
- is_deleted: BOOLEAN

Table: file_chunks
- file_id: UUID
- chunk_index: INT
- chunk_hash: VARCHAR(64) (SHA-256)
- PRIMARY KEY (file_id, chunk_index)`,
    apiDesign: [
      'POST /api/v1/files/upload-session -> Initializes chunked upload session.',
      'PUT /api/v1/chunks/{chunk_hash} -> Uploads 4 MB chunk (skips if hash already exists in global deduplication table).',
      'POST /api/v1/files/commit -> Commits file version with ordered array of chunk hashes.'
    ],
    stepByStepArchitecture: [
      '1. Client edits a 100 MB file. Local client daemon splits file into 4 MB chunks.',
      '2. Client computes SHA-256 hash for each chunk and queries Metadata Service.',
      '3. Server checks global chunk store: if chunk hash exists, mark as present (Deduplication - saves bandwidth).',
      '4. Client uploads only new/modified chunks directly to Object Storage via pre-signed S3 URLs.',
      '5. Client commits new version to Metadata Service.',
      '6. Sync Service pushes update notifications to user\'s other devices via WebSockets, which download modified chunks and reassemble the file.'
    ],
    cachingAndDbStrategy: 'Chunk-level deduplication: multiple users uploading the same movie/installer share the same physical chunk in S3. Metadata stored in partitioned PostgreSQL with Redis cache for directory trees.',
    failureModesAndBottlenecks: [
      'Upload interrupted mid-file: Resumable chunked uploads guarantee only failed 4 MB chunks are retried, not the full file.',
      'Concurrent edits on two devices: Conflict resolution creates a "conflicted copy" (e.g., file_conflict_date.txt) similar to Dropbox.',
      'High metadata write contention: Shard metadata database by `user_id`.'
    ],
    keyInterviewQuestions: [
      'Why chunk files into 4 MB blocks? (Enables delta-sync, parallel chunk uploads, resumability on network failure, and deduplication).',
      'How to achieve 99.999999999% durability? (S3 cross-region erasure coding and triple replication across separate physical availability zones).',
      'How does delta sync work? (Rsync algorithm or chunk hash diffing detects exactly which blocks changed).'
    ]
  },
  {
    id: 'sd_case_5',
    title: 'Design a Scalable Notification System',
    problemStatement: 'Design a centralized, multi-channel notification engine capable of sending billions of push notifications, SMS messages, and transactional emails reliably.',
    functionalRequirements: [
      'Send notifications across 3 channels: Mobile Push (iOS APNs, Android FCM), SMS (Twilio), and Email (SendGrid/SES).',
      'Support priority queues (critical 2FA OTPs delivered instantly vs marketing digests delivered in batches).',
      'User preference management (opt-out of marketing, quiet hours, channel selection).',
      'Deduplication and rate limiting (prevent sending identical notification twice within 5 minutes).'
    ],
    nonFunctionalRequirements: [
      'High throughput: Handle peak bursts of 10 million notifications/minute (breaking news, flash sales).',
      'Reliability: No lost transactional notifications (at-least-once delivery).',
      'Extensibility: Easy to plug in new notification channels.'
    ],
    scaleAndEstimations: [
      '100 million notifications per day (~1,200/sec average, 50,000/sec burst during flash events).'
    ],
    coreComponents: [
      'Notification API Gateway: Ingests notification requests from internal microservices (Order, Auth, Marketing).',
      'Template Engine: Renders personalized notification copy with dynamic user variables.',
      'User Preference & Device Registry: Stores user notification settings and device push tokens.',
      'Message Queues (Kafka / RabbitMQ): Decouples ingestion from delivery with dedicated queues per channel (push, email, sms) and priority (high, low).',
      'Notification Workers: Consumer services pulling from queues and calling external third-party gateways (APNs, FCM, Twilio, SendGrid).'
    ],
    dataSchema: `Table: notifications
- id: UUID PRIMARY KEY
- user_id: UUID INDEX
- channel: ENUM('PUSH', 'EMAIL', 'SMS')
- template_id: VARCHAR(50)
- status: ENUM('QUEUED', 'SENT', 'FAILED', 'DELIVERED')
- retry_count: INT
- created_at: TIMESTAMP`,
    apiDesign: [
      'POST /api/v1/notifications/send { "user_id": "u123", "type": "ORDER_DISPATCHED", "priority": "HIGH", "channels": ["PUSH", "SMS"], "params": { "order_no": "9921" } }'
    ],
    stepByStepArchitecture: [
      '1. Order Service calls Notification API to trigger order dispatch notification.',
      '2. API validates schema and checks Redis deduplication key `dedup:{user_id}:{type}:{hash}`.',
      '3. User Preference Service checks if user disabled SMS (if disabled, drops SMS channel).',
      '4. Notification Service pushes message into Kafka topics: `push-notifications-high` and `sms-notifications-high`.',
      '5. Push Workers consume event, fetch device token, and invoke Apple APNs/Google FCM.',
      '6. If external gateway fails with 5xx, worker pushes message to Dead Letter Queue (DLQ) with exponential backoff retry.'
    ],
    cachingAndDbStrategy: 'Redis caches device tokens and rate-limiting counters. Kafka partitions queues by `user_id` to ensure chronological delivery per user while scaling workers horizontally.',
    failureModesAndBottlenecks: [
      'Third-party provider outage (Twilio down): Automatically failover to backup SMS provider (e.g. Sinch/AWS SNS) via Circuit Breaker.',
      'Worker crash mid-delivery: At-least-once delivery semantics in Kafka with idempotent notification IDs on client devices prevent duplicate display.',
      'Massive flash notification storms: Rate-limit non-critical bulk campaigns to prioritize transactional OTPs.'
    ],
    keyInterviewQuestions: [
      'How to avoid sending duplicate notifications? (Client generates idempotent notification_id stored in Redis cache for 10 minutes).',
      'How to respect user quiet hours across time zones? (Store user IANA timezone in profile; queue holds marketing messages until 9:00 AM local user time).',
      'How to monitor delivery failures? (Track delivery callbacks from APNs/Twilio in analytics database, alerting on abnormal failure spikes).'
    ]
  },
  {
    id: 'sd_case_6',
    title: 'Design a Distributed Web Crawler & URL Preview Service',
    problemStatement: 'Design a web crawler and link preview generator (like Slack/WhatsApp URL previews) that fetches web pages, parses metadata (OpenGraph/HTML), and indexes content at web scale.',
    functionalRequirements: [
      'Given a URL, crawl the page and extract title, description, OpenGraph image, and text summary.',
      'Cache preview metadata so subsequent requests return instantly.',
      'Web crawler must discover and queue new URLs found in links recursively.',
      'Respect `robots.txt` rules and crawl rate limits per domain.'
    ],
    nonFunctionalRequirements: [
      'Politeness: Never overwhelm any single host server (crawl delay).',
      'Robustness: Handle dead links, spider traps, circular redirects, and malformed HTML gracefully.',
      'Scalability: Capable of processing hundreds of millions of URLs.'
    ],
    scaleAndEstimations: [
      'Scale: 1 billion web pages crawled per month (~400 pages/second).',
      'Storage: 1B * 100 KB metadata/text = 100 TB storage/month.'
    ],
    coreComponents: [
      'URL Frontier (Crawl Queue): Prioritizes URLs to crawl and enforces domain politeness.',
      'DNS Resolver Cache: Fast local DNS caching to prevent DNS lookup bottlenecks.',
      'HTML Fetcher & Parser: Downloads web pages over HTTP and extracts OpenGraph tags and links.',
      'Duplicate Eliminator (Bloom Filter): Checks whether URL has already been visited.',
      'Content Storage (S3 / Document DB): Stores raw HTML, extracted preview JSON, and inverted index.'
    ],
    dataSchema: `Table: url_preview_cache (Redis / MongoDB)
- url_hash: VARCHAR(64) PRIMARY KEY
- canonical_url: VARCHAR(2048)
- title: VARCHAR(255)
- description: TEXT
- image_url: VARCHAR(2048)
- fetched_at: TIMESTAMP`,
    apiDesign: [
      'GET /api/v1/preview?url=https://github.com -> Returns { "title": "GitHub: Let\'s build from here", "image": "https://.../og.png", "description": "..." }'
    ],
    stepByStepArchitecture: [
      '1. User posts a URL in chat.',
      '2. Link Preview Service checks Redis cache: on hit returns JSON preview in 5 ms.',
      '3. On miss: checks Bloom Filter to verify URL validity, fetches `robots.txt`, and enqueues to URL Frontier.',
      '4. Frontier uses two-level queue: Priority Queue (page rank) and Politeness Queue (one sub-queue per domain with delay timer).',
      '5. Fetcher worker downloads page with 5-second timeout, parses OpenGraph `<meta property="og:...">` tags.',
      '6. Preview data is stored in Redis cache and returned to chat client via WebSocket.'
    ],
    cachingAndDbStrategy: 'Redis LRU cache with 7-day TTL for previews. Bloom filter with 1 billion capacity (1.2 GB RAM) prevents crawling identical URLs twice.',
    failureModesAndBottlenecks: [
      'Spider traps (infinite URL loops like /calendar/next/next/next): Enforce maximum URL path depth (e.g. 10 levels) and maximum pages per domain.',
      'Slow servers hanging connections: Enforce strict connection timeout (3s) and read timeout (5s).',
      'Heavy dynamic JavaScript pages: Use lightweight headless browser pool (Puppeteer) only when basic HTML lacks OpenGraph tags.'
    ],
    keyInterviewQuestions: [
      'How does the URL Frontier enforce politeness? (Hash host domain -> separate host queue with timer delay between requests to same domain).',
      'How to detect duplicate content across different URLs? (Compute SimHash or MinHash on parsed text to detect near-duplicate pages).',
      'How to handle robots.txt efficiently? (Cache parsed robots.txt rules in memory per domain for 24 hours).'
    ]
  },
  {
    id: 'sd_case_7',
    title: 'Design a Video Streaming Platform (YouTube / Netflix)',
    problemStatement: 'Design a global video streaming platform supporting high-definition video upload, asynchronous transcoding into multiple resolutions, and adaptive bitrate streaming.',
    functionalRequirements: [
      'Users can upload video files (MP4, MKV, AVI).',
      'Videos are transcoded into multiple formats and resolutions (1080p, 720p, 480p, 360p) with adaptive bitrate streaming (HLS/DASH).',
      'Users can search, view video metadata, and stream videos smoothly without buffering.',
      'Track video view counts and basic analytics.'
    ],
    nonFunctionalRequirements: [
      'Ultra-fast, smooth video playback with minimal startup latency and zero buffering.',
      'High video availability and fault tolerance.',
      'Global distribution via CDN edge servers.'
    ],
    scaleAndEstimations: [
      '500 hours of video uploaded every minute (~720,000 hours/day).',
      '1 billion hours of video watched per day.',
      'Storage: 500 hrs/min * 60 min * 1 GB/hr = 30 TB raw video/min -> multi-petabyte scale per month.'
    ],
    coreComponents: [
      'Upload Service: Handles resumable chunked video uploads directly to Blob Storage (S3).',
      'Transcoding Pipeline: Distributed worker cluster (FFmpeg on Kubernetes) converting raw video into HLS chunks (.ts segments and .m3u8 playlists).',
      'Video Asset Storage (Blob Store): Stores transcoded video chunks across resolutions.',
      'Global CDN (Cloudflare / Fastly / CloudFront): Caches video chunks at network edges near users.',
      'Metadata & User Database (PostgreSQL & Elasticsearch): Stores titles, tags, user channels, and powers search.',
      'Analytics Service (Kafka + ClickHouse): Records video views, watch time, and drops.'
    ],
    dataSchema: `Table: videos
- video_id: UUID PRIMARY KEY
- uploader_id: UUID INDEX
- title: VARCHAR(255)
- status: ENUM('UPLOADING', 'PROCESSING', 'READY', 'FAILED')
- master_playlist_url: VARCHAR(1024)
- view_count: BIGINT
- duration_seconds: INT`,
    apiDesign: [
      'POST /api/v1/videos/upload-session -> Returns pre-signed multi-part S3 upload URLs.',
      'GET /api/v1/videos/{video_id}/master.m3u8 -> Fetches HLS master manifest file for adaptive streaming.'
    ],
    stepByStepArchitecture: [
      '1. Creator uploads raw video file via chunked multipart upload directly to temporary S3 bucket.',
      '2. S3 emits `ObjectCreated` event to Kafka queue `video-transcode-jobs`.',
      '3. Transcoding workers pick up job, split video into 4-second chunks, transcode into 1080p, 720p, 480p, and generate `.m3u8` playlists.',
      '4. Transcoded files are saved in public video storage bucket.',
      '5. When a viewer clicks play, the video player fetches `master.m3u8` from CDN.',
      '6. Player measures current client network bandwidth: dynamically requests 1080p chunks on fast Wi-Fi, drops to 480p seamlessly if cellular network slows down (Adaptive Bitrate Streaming).'
    ],
    cachingAndDbStrategy: 'CDN caches popular video chunks at edge servers (95%+ CDN cache hit ratio for popular videos). Long-tail unpopular videos are fetched from origin S3 on demand.',
    failureModesAndBottlenecks: [
      'Transcoding backlog during peak upload hours: Scale transcoding worker pods dynamically based on Kafka queue lag.',
      'Accurate view count counting under millions of concurrent hits: Buffer view increments in Redis HyperLogLog / Kafka before flushing aggregate counts to PostgreSQL in 10-second batches.',
      'Copyright violation detection: Run audio/video fingerprinting (ContentID) during transcoding.'
    ],
    keyInterviewQuestions: [
      'What is Adaptive Bitrate Streaming (HLS/DASH)? (Video is chunked into 4-6 second segments encoded at multiple bitrates; client player monitors network throughput and switches bitrates dynamically without interrupting playback).',
      'Why upload directly to S3 instead of API servers? (Prevents API server network interface saturation; S3 handles high-throughput multipart uploads natively).',
      'How to optimize storage costs for old, unwatched videos? (Move videos unwatched for 90 days to Amazon S3 Infrequent Access or Glacier).'
    ]
  },
  {
    id: 'sd_case_8',
    title: 'Design a Ride Booking Service (Uber / Lyft)',
    problemStatement: 'Design a location-based real-time ride booking platform connecting riders with nearby drivers, providing live ETA tracking, pricing, and ride dispatch.',
    functionalRequirements: [
      'Riders can see nearby available drivers in real time on a map.',
      'Riders request a ride from pickup to destination; system finds and dispatches the closest suitable driver.',
      'Drivers can accept or reject ride requests.',
      'Live GPS location tracking of driver car movement during ride.'
    ],
    nonFunctionalRequirements: [
      'Ultra-low latency geospatial search (< 50 ms to locate nearby drivers).',
      'High availability: match dispatching must never drop confirmed rides.',
      'Consistent pricing and ride state transitions.'
    ],
    scaleAndEstimations: [
      'Scale: 10 million active riders and 1 million active drivers.',
      'Driver GPS pings: 1M drivers * 1 ping/4 seconds = 250,000 location updates/sec.',
      'Write throughput on location service: 250K writes/sec. Requires specialized in-memory geospatial store (Redis Geo / H3 / S2).'
    ],
    coreComponents: [
      'Location Ingestion Service: Ingests 250K GPS pings/sec from driver mobile apps.',
      'Geospatial Store (Redis Geo / QuadTree / Uber H3): Indexes driver coordinates by hexagonal geographic cells (H3 index).',
      'Trip Management Service: Manages trip state machine (REQUESTED -> DRIVER_ASSIGNED -> IN_PROGRESS -> COMPLETED).',
      'Matching & Dispatch Engine: Evaluates nearby drivers using Dijkstra/routing algorithms, sends ride offer to driver with 15s timeout.',
      'Notification Service: WebSockets/Push to alert riders and drivers of trip updates.'
    ],
    dataSchema: `Table: trips (PostgreSQL)
- trip_id: UUID PRIMARY KEY
- rider_id: UUID
- driver_id: UUID (nullable)
- pickup_lat: DOUBLE, pickup_lng: DOUBLE
- drop_lat: DOUBLE, drop_lng: DOUBLE
- status: VARCHAR(30) INDEX
- fare: DECIMAL(10, 2)
- created_at: TIMESTAMP`,
    apiDesign: [
      'POST /api/v1/rides/request { "pickup": { "lat": 37.77, "lng": -122.41 }, "drop": { "lat": 37.79, "lng": -122.40 } } -> Returns { "trip_id": "uuid", "fare": 24.50 }',
      'WebSocket: driver_location_update { "driver_id": "d123", "lat": 37.774, "lng": -122.419, "bearing": 90 }'
    ],
    stepByStepArchitecture: [
      '1. Driver app broadcasts GPS coordinates every 4 seconds over WebSocket to Location Service.',
      '2. Location Service updates Redis Geo index (GEOADD drivers_available lng lat driver_id) and H3 hexagon cell.',
      '3. Rider requests ride: API creates Trip in state `REQUESTED`.',
      '4. Dispatch Engine queries Redis for drivers within 3 km radius (`GEORADIUS`), filters drivers by rating and vehicle type.',
      '5. Dispatches ride offer to closest driver via WebSocket with 15-second countdown timer.',
      '6. Driver accepts: Trip state -> `DRIVER_ASSIGNED`. Other drivers are released. Rider WebSocket receives driver live location and ETA.'
    ],
    cachingAndDbStrategy: 'Uber uses H3 (hexagonal hierarchical spatial index). Earth is divided into nested hexagonal cells. Finding neighbors is a simple O(1) cell lookup. Drivers broadcast to Redis; historical trips stored in PostgreSQL/Cassandra.',
    failureModesAndBottlenecks: [
      'Driver rejects or times out: Dispatcher immediately forwards offer to the next closest driver in queue.',
      'High write contention on driver location: Do not write every 4-second ping to disk; keep active positions purely in Redis RAM and flush to DB only on trip start/end.',
      'Two drivers accept the same ride: Distributed lock (Redis Redlock) on `trip_id` guarantees exactly one driver is assigned.'
    ],
    keyInterviewQuestions: [
      'Why use Hexagons (H3) over Squares or Geohashes? (All adjacent neighbors in a hexagonal grid are equidistant, eliminating edge distortions present in square grids).',
      'How to calculate dynamic surge pricing? (Compare demand [open ride requests in H3 cell] vs supply [available drivers in H3 cell] every 30 seconds).',
      'How to maintain driver location history? (Stream GPS points to Kafka -> Apache Flink filters jitter -> writes trip route to Cassandra for receipt rendering).'
    ]
  },
  {
    id: 'sd_case_9',
    title: 'Design a Social Media News Feed (Twitter / Facebook Feed)',
    problemStatement: 'Design a social media news feed system supporting posting text/media, following users, and generating a personalized, reverse-chronological home feed.',
    functionalRequirements: [
      'Users can publish posts (text, images, video links).',
      'Users can follow other users.',
      'Users can view their Home Feed containing recent posts from followed users ordered chronologically or by ranking score.',
      'Infinite scroll feed pagination.'
    ],
    nonFunctionalRequirements: [
      'Feed generation latency must be under 200 milliseconds.',
      'High availability: feed reading should never fail.',
      'Fast posting: publishing a post should acknowledge in < 500 ms.'
    ],
    scaleAndEstimations: [
      '300 million daily active users.',
      '50,000 new posts/second peak.',
      'Feed reads: 500,000 feed requests/second (10:1 read-to-write ratio).'
    ],
    coreComponents: [
      'Post Service: Ingests new posts and stores in relational/document DB.',
      'Social Graph Service: Manages follower/following relationships (Neo4j or PostgreSQL).',
      'Feed Generation Service: Implements Fan-out on Write and Fan-out on Read.',
      'Feed Cache (Redis Cluster): Stores pre-computed home timeline arrays of post IDs for active users.',
      'Media Service: Uploads and optimizes photos/videos to S3 and CDN.'
    ],
    dataSchema: `Table: posts (PostgreSQL / Cassandra)
- post_id: BIGINT PRIMARY KEY (Snowflake)
- author_id: UUID INDEX
- content: TEXT
- media_urls: TEXT[]
- created_at: TIMESTAMP

Redis Feed Key: user:feed:{user_id} -> ZSET (Score: timestamp, Member: post_id)`,
    apiDesign: [
      'POST /api/v1/posts { "content": "Hello World!" } -> Returns { "post_id": 18293819283 }',
      'GET /api/v1/feed?cursor=post_id&limit=20 -> Returns array of hydrated Post objects.'
    ],
    stepByStepArchitecture: [
      '1. User publishes post -> Post Service writes post to database.',
      '2. Post Service emits event to Kafka `new-post-events`.',
      '3. Feed Worker consumes event and queries Social Graph for author\'s followers.',
      '4. For standard users: Fan-out on Write (Push Model): Worker pushes the new `post_id` into the Redis ZSET feed of every follower (capped at 800 items per user).',
      '5. For celebrity users (e.g. 50M followers like Elon Musk): Fan-out on Read (Pull Model): Do not push to 50M Redis feeds! Instead, merge celebrity posts at read time.',
      '6. When client loads feed: reads top 20 `post_id`s from Redis ZSET -> hydrates content from Post Cache -> returns in < 50 ms.'
    ],
    cachingAndDbStrategy: 'Hybrid Fan-out Model: Push for regular users (fast reads); Pull for celebrities (avoids write amplification). Redis ZSET stores `post_id`s sorted by timestamp; post details cached in Redis hashes.',
    failureModesAndBottlenecks: [
      'Celebrity post causes fan-out storm: Push model would take minutes to update 50M caches; hybrid model completely avoids this bottleneck.',
      'Inactive users wasting RAM: Do not pre-compute feeds for users who haven\'t logged in for 14 days.',
      'Cache miss: If Redis feed is empty, rebuild feed dynamically by querying posts of followed users from database.'
    ],
    keyInterviewQuestions: [
      'Fan-out on Write vs Fan-out on Read trade-off? (Write: fast reads O(1), slow writes for users with many followers. Read: fast writes O(1), slow reads O(N) merging multiple timelines).',
      'How to paginate feeds smoothly? (Use cursor-based pagination with `post_id` or timestamp; offset-based pagination breaks when new posts are inserted).',
      'How does ranking work? (Feed ranker ML models re-sort candidate posts from Redis based on affinity, post age, engagement probability, and content type).'
    ]
  },
  {
    id: 'sd_case_10',
    title: 'Design a Food Delivery & Real-Time Tracking Platform (DoorDash / Swiggy)',
    problemStatement: 'Design an on-demand food delivery platform supporting restaurant menu search, order placement, restaurant dispatch, delivery partner assignment, and real-time order tracking.',
    functionalRequirements: [
      'Search restaurants and browse menus with live item availability.',
      'Add items to cart, apply discounts, and complete checkout with payment.',
      'Restaurant portal receives order, confirms, and updates preparation status.',
      'Delivery partner matching: assign nearby delivery driver upon order readiness.',
      'Live GPS map tracking of delivery partner from restaurant to customer door.'
    ],
    nonFunctionalRequirements: [
      'High transactional consistency: prevent double-charging or ordering sold-out items.',
      'Real-time updates (< 2 second latency on driver movement on map).',
      'High availability during lunch and dinner order spikes (5x surge traffic).'
    ],
    scaleAndEstimations: [
      '5 million orders per day across 200,000 restaurants and 500,000 delivery partners.',
      'Peak order volume: 2,000 orders/second during 8:00 PM dinner peak.'
    ],
    coreComponents: [
      'Restaurant & Menu Service: Stores restaurant profiles, menus, and inventory (PostgreSQL + Redis).',
      'Order & Payment Service: Manages order checkout lifecycle with ACID transactions.',
      'Driver Assignment Engine: Evaluates available delivery partners near the restaurant when order is ready.',
      'Real-time Tracking Service: Ingests driver location pings and pushes updates to customer UI via WebSockets.',
      'Notification Service: Sends SMS, push notifications to restaurant and customer.'
    ],
    dataSchema: `Table: orders (PostgreSQL)
- order_id: UUID PRIMARY KEY
- customer_id: UUID
- restaurant_id: UUID
- driver_id: UUID (nullable)
- total_amount: DECIMAL(10, 2)
- status: ENUM('PLACED', 'ACCEPTED', 'PREPARING', 'PICKED_UP', 'DELIVERED', 'CANCELLED')
- created_at: TIMESTAMP`,
    apiDesign: [
      'POST /api/v1/orders/checkout { "restaurant_id": "r1", "items": [{"item_id": "i1", "qty": 2}], "payment_token": "tok_123" }',
      'POST /api/v1/restaurant/orders/{order_id}/accept',
      'WebSocket: customer_order_live_tracking { "order_id": "uuid" }'
    ],
    stepByStepArchitecture: [
      '1. Customer checks out cart: Order Service initiates ACID transaction in PostgreSQL to deduct inventory and charge payment via Stripe.',
      '2. Order state -> `PLACED`. Event published to Kafka topic `orders-placed`.',
      '3. Restaurant tablet receives push notification; restaurant clicks Accept -> state -> `PREPARING` with estimated prep time (e.g. 25 mins).',
      '4. 10 minutes before food is ready, Assignment Engine calculates ETA and identifies nearby delivery partners using Geospatial Redis.',
      '5. Driver accepts delivery offer -> state -> `DRIVER_ASSIGNED`.',
      '6. Driver picks up food -> state -> `PICKED_UP`. Customer app connects to WebSocket tracking server receiving driver GPS coordinates until delivery is marked `DELIVERED`.'
    ],
    cachingAndDbStrategy: 'PostgreSQL handles orders and payments with strict row-level locking for inventory. Redis caches menus and driver real-time locations. Elasticsearch powers restaurant and dish search.',
    failureModesAndBottlenecks: [
      'Restaurant rejects order: Automatic immediate payment refund initiated via payment gateway webhook.',
      'No delivery partner available: Assignment engine expands search radius progressively; if still unavailable, customer notified with apology voucher.',
      'Dinner rush database overload: Read replicas handle menu browsing; connection pooling (PgBouncer) protects write master.'
    ],
    keyInterviewQuestions: [
      'How to handle item inventory race conditions when 10 users order the last burger? (Use SQL atomic decrement: `UPDATE items SET stock = stock - 1 WHERE item_id = ? AND stock > 0` or distributed Redis lock).',
      'When should the delivery driver be dispatched? (Not immediately when order is placed! Dispatch when food prep is ~80% complete so driver does not wait idly at restaurant).',
      'How to optimize delivery routes if driver carries multiple orders? (Vehicle Routing Problem [VRP] algorithms / Traveling Salesperson Problem [TSP] heuristics running on dispatch workers).'
    ]
  }
];

const sdContent = `// js/data/interviewPrep/systemDesign.js
// Complete Question Bank & Case Studies for System Design
// 20 High-Yield MCQs + 10 Complete End-to-End System Design Case Studies

window.interviewPrepSystemDesign = {
  id: 'system_design',
  title: 'System Design',
  icon: 'schema',
  description: 'Master architectural scaling, caching, databases, load balancers, messaging, and 10 production case studies.',
  totalQuestions: ${sdQuestions.length},
  topics: [
    'System Design Fundamentals'
  ],
  questions: ${JSON.stringify(sdQuestions, null, 2)},
  caseStudies: ${JSON.stringify(sdCaseStudies, null, 2)}
};
`;
fs.writeFileSync(path.join(outDir, 'systemDesign.js'), sdContent);
console.log(`Successfully generated systemDesign.js (${sdQuestions.length} MCQs + ${sdCaseStudies.length} Case Studies)`);
