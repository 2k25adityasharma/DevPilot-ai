/**
 * DevPilot-AI — Programming & Coding Fundamentals Question Bank
 * 140 authentic placement/interview MCQs across 14 topics.
 */

(function () {
  'use strict';

  const programmingData = {
    category: "programming",
    title: "Programming & Coding Fundamentals",
    description: "Core programming constructs, memory layout, pointers, recursion, data structures, complexity, and problem solving.",
    icon: "terminal",
    totalTopics: 14,
    topics: [
  "Programming Basics",
  "Variables & Data Types",
  "Operators",
  "Conditions",
  "Loops",
  "Functions",
  "Recursion",
  "Arrays",
  "Strings",
  "Pointers & References",
  "Complexity Analysis",
  "Basic Data Structures",
  "Debugging",
  "Problem-Solving Approach"
],
    questions: [
  {
    "id": "prog-bsc-01",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "easy",
    "question": "What is the primary difference between an interpreter and a compiler?",
    "options": [
      "A compiler translates the entire source code into machine code before execution, while an interpreter translates and executes line-by-line",
      "An interpreter produces faster binary execution than a compiler",
      "A compiler runs only on Linux, while an interpreter runs on Windows",
      "There is no functional difference"
    ],
    "correctAnswer": 0,
    "explanation": "Compilers generate ahead-of-time (AOT) machine code (e.g., C/C++), whereas interpreters evaluate code on-the-fly line-by-line (e.g., standard Python/Ruby)."
  },
  {
    "id": "prog-bsc-02",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "easy",
    "question": "In the memory layout of a C/C++ or compiled process, where are local function variables allocated?",
    "options": [
      "Stack segment",
      "Heap segment",
      "BSS segment",
      "Data segment"
    ],
    "correctAnswer": 0,
    "explanation": "Local function variables and activation records/stack frames are allocated on the Stack segment with automatic cleanup on function return."
  },
  {
    "id": "prog-bsc-03",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "easy",
    "question": "Where does dynamically allocated memory (e.g., malloc in C, new in C++/Java) reside?",
    "options": [
      "Heap segment",
      "Stack segment",
      "Code / Text segment",
      "Read-Only Data segment"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic memory allocated at runtime via malloc/new is managed on the Heap."
  },
  {
    "id": "prog-bsc-04",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "easy",
    "question": "What causes a 'Segmentation Fault' (core dumped) in compiled languages?",
    "options": [
      "Attempting to read or write to an invalid, unallocated, or restricted memory address",
      "A syntax error in a loop statement",
      "Dividing an integer by a non-zero float",
      "Using too many comments in source code"
    ],
    "correctAnswer": 0,
    "explanation": "A segmentation fault is a hardware-initiated fault triggered by the MMU when a program accesses unmapped virtual memory."
  },
  {
    "id": "prog-bsc-05",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "medium",
    "question": "What is the purpose of the linker in a C/C++ compilation pipeline?",
    "options": [
      "Combines compiled object files and libraries, resolving external function symbols and addresses into an executable",
      "Translates high-level code into assembly code",
      "Compresses source code into a zip archive",
      "Formats code indentation"
    ],
    "correctAnswer": 0,
    "explanation": "The linker (e.g., ld, lld) merges object files (.o/.obj) and resolves symbolic references into a single binary."
  },
  {
    "id": "prog-bsc-06",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "medium",
    "question": "What is the function of the Preprocessor in C/C++?",
    "options": [
      "Handles directives beginning with '#' such as macro expansion, header file inclusion, and conditional compilation before parsing",
      "Executes the main() function",
      "Optimizes machine registers",
      "Cleans up memory leaks on program exit"
    ],
    "correctAnswer": 0,
    "explanation": "The preprocessor executes text replacements (e.g. #include, #define, #ifdef) prior to lexical analysis and compilation."
  },
  {
    "id": "prog-bsc-07",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "medium",
    "question": "What is the difference between static linking and dynamic linking?",
    "options": [
      "Static linking bundles library code directly into the executable binary, while dynamic linking loads shared libraries (.so/.dll) into memory at runtime",
      "Dynamic linking makes the executable file size larger",
      "Static linking allows libraries to be updated without recompilation",
      "Dynamic linking eliminates the need for an operating system"
    ],
    "correctAnswer": 0,
    "explanation": "Static binaries are self-contained but larger; dynamic binaries share library code in memory across multiple running processes."
  },
  {
    "id": "prog-bsc-08",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "medium",
    "question": "What is a 'memory leak' in software development?",
    "options": [
      "Allocated heap memory that is no longer needed but never freed, gradually consuming available system RAM",
      "A damaged RAM hardware chip that loses electrical charge",
      "Writing data past the boundary of an allocated array",
      "A syntax error in variable declaration"
    ],
    "correctAnswer": 0,
    "explanation": "Memory leaks occur when references to allocated heap blocks are dropped without deallocation, causing memory exhaustion over time."
  },
  {
    "id": "prog-bsc-09",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "hard",
    "question": "In Java/C#, what is the primary role of the Garbage Collector (GC)?",
    "options": [
      "Automatically identifies and reclaims heap memory occupied by unreachable objects that are no longer referenced",
      "Deletes old files from the hard drive",
      "Terminates infinite loops automatically",
      "Compiles bytecode directly into assembly"
    ],
    "correctAnswer": 0,
    "explanation": "The Garbage Collector uses graph reachability (tracing algorithms like mark-and-sweep) to reclaim unreferenced heap memory."
  },
  {
    "id": "prog-bsc-10",
    "category": "programming",
    "topic": "Programming Basics",
    "difficulty": "hard",
    "question": "What does 'Undefined Behavior' (UB) signify in the C/C++ language specifications?",
    "options": [
      "The language standard imposes no requirements; the compiler may optimize assuming UB never occurs, resulting in unpredictable runtime consequences",
      "The compiler must throw a syntax error and abort",
      "The operating system safely terminates the program with code 0",
      "The variable automatically initializes to NULL"
    ],
    "correctAnswer": 0,
    "explanation": "Undefined Behavior allows compilers to make aggressive optimization assumptions, which can cause erratic crashes or security exploits if violated."
  },
  {
    "id": "prog-vdt-01",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "easy",
    "question": "What is the size of a standard 'int' data type on most modern 32-bit and 64-bit systems in C/C++?",
    "options": [
      "4 bytes (32 bits)",
      "2 bytes (16 bits)",
      "8 bytes (64 bits)",
      "1 byte (8 bits)"
    ],
    "correctAnswer": 0,
    "explanation": "Under LP64/LLP64 data models, 'int' is standard 4 bytes (32 bits), spanning from -2,147,483,648 to 2,147,483,647."
  },
  {
    "id": "prog-vdt-02",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "easy",
    "question": "In Java, what is the default value of an uninitialized instance variable of type 'boolean'?",
    "options": [
      "false",
      "true",
      "null",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "In Java, boolean instance/class fields default to false (whereas local variables must be explicitly initialized)."
  },
  {
    "id": "prog-vdt-03",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "easy",
    "question": "What happens during integer overflow in a 32-bit signed integer when adding 1 to INT_MAX (2,147,483,647)?",
    "options": [
      "It wraps around to INT_MIN (-2,147,483,648) under standard 2's complement representation",
      "It raises a hardware CPU exception and terminates",
      "It becomes infinity (INF)",
      "It converts to a floating point double"
    ],
    "correctAnswer": 0,
    "explanation": "In 2's complement representation, adding 1 to 0111...1111 yields 1000...0000, which is INT_MIN (-2,147,483,648)."
  },
  {
    "id": "prog-vdt-04",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "easy",
    "question": "Which data type is best suited for storing monetary currency values without floating-point rounding errors?",
    "options": [
      "BigDecimal (or integer cents)",
      "float",
      "double",
      "short"
    ],
    "correctAnswer": 0,
    "explanation": "Binary floating-point types (float/double) cannot precisely represent decimal fractions like 0.1, causing accumulated rounding errors; BigDecimal or integer cents are mandatory."
  },
  {
    "id": "prog-vdt-05",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "medium",
    "question": "What is the difference between 'strongly typed' and 'weakly typed' languages?",
    "options": [
      "Strongly typed languages prevent implicit conversions between incompatible types (e.g. Python), while weakly typed permit implicit coercion (e.g. JS adding number to string)",
      "Strongly typed languages do not allow variables to change values",
      "Weakly typed languages do not have integers",
      "Strongly typed languages cannot be compiled"
    ],
    "correctAnswer": 0,
    "explanation": "Strong typing rejects implicit conversions that violate type safety; weak typing coerces types automatically (e.g., '5' + 2 = '52')."
  },
  {
    "id": "prog-vdt-06",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "medium",
    "question": "In JavaScript, what does 'typeof NaN' evaluate to?",
    "options": [
      "'number'",
      "'NaN'",
      "'undefined'",
      "'object'"
    ],
    "correctAnswer": 0,
    "explanation": "In the IEEE 754 floating-point specification and JavaScript, NaN (Not-a-Number) is formally a numeric data type representing an undefined computational result."
  },
  {
    "id": "prog-vdt-07",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "medium",
    "question": "What does the 'const' keyword guarantee in C++ when applied to a pointer: 'int * const ptr = &x;'?",
    "options": [
      "The pointer itself is constant and cannot point to another address, but the value of x can be modified",
      "The integer value pointed to is constant and cannot be modified",
      "Both the pointer and the integer value are immutable",
      "The pointer is stored in read-only ROM"
    ],
    "correctAnswer": 0,
    "explanation": "'int * const ptr' is a constant pointer to a mutable int. (In contrast, 'const int * ptr' is a pointer to a constant int)."
  },
  {
    "id": "prog-vdt-08",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "medium",
    "question": "What is 'variable shadowing' in programming?",
    "options": [
      "When a variable declared within an inner scope has the same identifier as a variable in an outer scope, masking the outer variable",
      "When a variable is deleted by the garbage collector",
      "When two pointers reference the same memory address",
      "Declaring a variable without a data type"
    ],
    "correctAnswer": 0,
    "explanation": "Shadowing occurs when an inner scope identifier temporarily hides the visibility of an identical identifier in the outer scope."
  },
  {
    "id": "prog-vdt-09",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "hard",
    "question": "What is the purpose of the 'volatile' qualifier in C/C++?",
    "options": [
      "Instructs the compiler not to optimize or cache variable reads into CPU registers, because its value may change asynchronously (e.g. hardware interrupt or multi-threading)",
      "Makes the variable thread-safe automatically",
      "Allocates the variable in volatile cache L1",
      "Ensures the variable cannot be changed"
    ],
    "correctAnswer": 0,
    "explanation": "'volatile' forces the compiler to re-fetch the variable from memory on every read, preventing dead-code elimination or register caching."
  },
  {
    "id": "prog-vdt-10",
    "category": "programming",
    "topic": "Variables & Data Types",
    "difficulty": "hard",
    "question": "In C++, what is the difference between 'nullptr' and 'NULL'?",
    "options": [
      "nullptr is a type-safe pointer literal of type std::nullptr_t that avoids ambiguous overload resolutions with integer 0, whereas NULL is an integer macro (0)",
      "nullptr uses 8 bytes while NULL uses 4 bytes",
      "NULL can only be used in C++20",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "'nullptr' prevents subtle bugs where NULL implicitly converts to integer 0 in function overloading."
  },
  {
    "id": "prog-opr-01",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "easy",
    "question": "What is the difference between '++i' (pre-increment) and 'i++' (post-increment)?",
    "options": [
      "Pre-increment increments the value and returns the updated value; post-increment returns the original value before incrementing",
      "Pre-increment adds 2, post-increment adds 1",
      "Post-increment is faster in all compilers",
      "There is no functional difference"
    ],
    "correctAnswer": 0,
    "explanation": "++i increments first and evaluates to the new value; i++ evaluates to current value and increments subsequently."
  },
  {
    "id": "prog-opr-02",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "easy",
    "question": "What does the bitwise XOR operator (^) return when operating on two identical bits (1 ^ 1 or 0 ^ 0)?",
    "options": [
      "0",
      "1",
      "Undefined",
      "-1"
    ],
    "correctAnswer": 0,
    "explanation": "XOR returns 1 if and only if the bits are different; identical bits evaluate to 0."
  },
  {
    "id": "prog-opr-03",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "easy",
    "question": "In C/Java/JS, what is short-circuit evaluation in logical expressions?",
    "options": [
      "Evaluation stops as soon as the outcome is determined (e.g. in 'A && B', if A is false, B is never evaluated)",
      "The processor skips electrical circuits on false conditions",
      "A syntax error that halts the compiler",
      "Evaluating right-to-left instead of left-to-right"
    ],
    "correctAnswer": 0,
    "explanation": "In 'false && func()', func() is never executed because the entire expression is guaranteed false."
  },
  {
    "id": "prog-opr-04",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "easy",
    "question": "What is the result of the bitwise expression 'x << 1' for a positive integer x?",
    "options": [
      "x multiplied by 2 (x * 2)",
      "x divided by 2 (x / 2)",
      "x squared (x^2)",
      "x plus 1"
    ],
    "correctAnswer": 0,
    "explanation": "Shifting bits left by 1 position multiplies an integer by 2^1 = 2."
  },
  {
    "id": "prog-opr-05",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "medium",
    "question": "What does the ternary operator 'condition ? expr1 : expr2' do?",
    "options": [
      "Evaluates expr1 if condition is true, otherwise evaluates expr2",
      "Executes expr1 and expr2 simultaneously",
      "Throws an error if condition is false",
      "Defines a three-dimensional array"
    ],
    "correctAnswer": 0,
    "explanation": "The ternary conditional operator is a compact inline replacement for simple if-else expressions."
  },
  {
    "id": "prog-opr-06",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "medium",
    "question": "How can you check whether an integer n is a power of 2 using bitwise operators?",
    "options": [
      "(n > 0) && ((n & (n - 1)) == 0)",
      "(n | (n - 1)) == 0",
      "(n ^ (n + 1)) == 0",
      "n % 2 == 0"
    ],
    "correctAnswer": 0,
    "explanation": "A power of 2 has exactly one binary '1' bit. Subtracting 1 flips all bits after that bit. Thus, n & (n - 1) clears that single bit to 0."
  },
  {
    "id": "prog-opr-07",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "medium",
    "question": "In JavaScript, what is the difference between '==' and '==='?",
    "options": [
      "'==' performs type coercion before comparison; '===' checks both value and strict type equality without coercion",
      "'===' is used only for strings",
      "'==' is faster than '==='",
      "'===' checks memory pointer reference while '==' checks value"
    ],
    "correctAnswer": 0,
    "explanation": "The strict equality operator (===) does not allow type coercion (e.g. '5' === 5 is false, but '5' == 5 is true)."
  },
  {
    "id": "prog-opr-08",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "medium",
    "question": "What is the associativity of the assignment operator (=) in C, C++, and Java?",
    "options": [
      "Right-to-left (e.g., a = b = c assigns c to b, then b to a)",
      "Left-to-right",
      "Non-associative",
      "Depends on variable type"
    ],
    "correctAnswer": 0,
    "explanation": "Assignment operators are right-associative, allowing chained assignments like a = b = c = 10."
  },
  {
    "id": "prog-opr-09",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "hard",
    "question": "What is the result of shifting a signed negative integer using the arithmetic right shift (>>) vs logical right shift (>>> in Java)?",
    "options": [
      ">> preserves the sign bit by shifting in 1s (sign extension); >>> shifts in 0s regardless of sign",
      ">> is for floats, >>> is for integers",
      ">>> causes an arithmetic exception for negative values",
      "They yield identical bit patterns"
    ],
    "correctAnswer": 0,
    "explanation": "Arithmetic shift (>>) preserves sign; logical shift (>>>) fills leading positions with zeroes, turning negative numbers positive."
  },
  {
    "id": "prog-opr-10",
    "category": "programming",
    "topic": "Operators",
    "difficulty": "hard",
    "question": "In C/C++, why is evaluating 'i = i++ + ++i' considered dangerous?",
    "options": [
      "It modifies a scalar object multiple times between sequence points (in C++11, unsequenced side effects), resulting in Undefined Behavior",
      "It always produces 0",
      "It causes a compiler stack overflow",
      "It is syntactically invalid"
    ],
    "correctAnswer": 0,
    "explanation": "Modifying and reading a variable without sequencing guarantees undefined behavior across different compiler versions."
  },
  {
    "id": "prog-cnd-01",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "easy",
    "question": "What happens if you omit the 'break' statement in a 'switch-case' block in C/C++/Java?",
    "options": [
      "Execution falls through into the subsequent case blocks until a break or the end of switch is encountered",
      "The program throws a compile-time syntax error",
      "The switch block terminates immediately",
      "The code enters an infinite loop"
    ],
    "correctAnswer": 0,
    "explanation": "Without a break statement, control falls through into subsequent case statements regardless of their conditions."
  },
  {
    "id": "prog-cnd-02",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "easy",
    "question": "Which data types are traditionally allowed as expressions in a standard C 'switch' statement?",
    "options": [
      "Integral types (int, char, enum)",
      "float and double",
      "struct and unions",
      "Pointers only"
    ],
    "correctAnswer": 0,
    "explanation": "In standard C, switch expressions must evaluate to integral types (int, char, enum)."
  },
  {
    "id": "prog-cnd-03",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "easy",
    "question": "What is a 'dangling else' problem in programming language grammar?",
    "options": [
      "Ambiguity in nested if-else statements regarding which 'if' an 'else' belongs to without explicit braces",
      "An else statement with an empty block",
      "Writing else before if",
      "A missing semicolon after else"
    ],
    "correctAnswer": 0,
    "explanation": "The dangling else problem occurs when nested if statements lack braces, resolved in most languages by pairing else with the nearest preceding unmatched if."
  },
  {
    "id": "prog-cnd-04",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "easy",
    "question": "In Python, which of the following values is considered 'truthy' in a boolean condition?",
    "options": [
      "[-1] (a list containing -1)",
      "0",
      "None",
      "'' (empty string)"
    ],
    "correctAnswer": 0,
    "explanation": "Non-empty collections, even containing negative numbers or zero, evaluate to True in Python."
  },
  {
    "id": "prog-cnd-05",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "medium",
    "question": "Why is comparing two floating-point numbers directly with 'if (a == b)' generally discouraged?",
    "options": [
      "Rounding and precision limitations in IEEE 754 representations can make mathematically equal calculations slightly unequal",
      "It causes a compilation failure",
      "Floating point equality takes O(N) CPU cycles",
      "Variables are converted to integers automatically"
    ],
    "correctAnswer": 0,
    "explanation": "Floating-point comparisons should check if |a - b| < epsilon to accommodate precision drift."
  },
  {
    "id": "prog-cnd-06",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "medium",
    "question": "What does the 'default' case do in a switch statement?",
    "options": [
      "Executes when none of the explicit case values match the evaluated switch expression",
      "Executes first before any case",
      "Terminates the program immediately",
      "Resets all variables to zero"
    ],
    "correctAnswer": 0,
    "explanation": "The default case acts as a fallback handler when no other case condition matches."
  },
  {
    "id": "prog-cnd-07",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "medium",
    "question": "What is 'branch prediction' performed by modern CPU architectures?",
    "options": [
      "Hardware optimization that guesses the outcome of a conditional branch (taken vs not taken) to keep execution pipelines full",
      "Software linting that checks if statements",
      "A compiler error when if statements are too deep",
      "Memory allocation for switch statements"
    ],
    "correctAnswer": 0,
    "explanation": "Branch predictors guess whether conditional jumps will be taken to prevent costly CPU pipeline stalls."
  },
  {
    "id": "prog-cnd-08",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "medium",
    "question": "What is an 'early return' guard clause pattern in clean code architecture?",
    "options": [
      "Validating error conditions at the top of a function and returning immediately, avoiding deeply nested if-else blocks",
      "Returning from a function before it is called",
      "A compiler optimization that deletes loops",
      "Skipping unit tests in production"
    ],
    "correctAnswer": 0,
    "explanation": "Guard clauses flatten nested logic by handling failure/edge cases early, keeping the happy path linear and clean."
  },
  {
    "id": "prog-cnd-09",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "hard",
    "question": "In Java 7 and newer, which reference type was added to support switch statements?",
    "options": [
      "String",
      "Object",
      "List",
      "HashMap"
    ],
    "correctAnswer": 0,
    "explanation": "Java 7 introduced support for String in switch statements, compiling it using string hashCodes and equals checks."
  },
  {
    "id": "prog-cnd-10",
    "category": "programming",
    "topic": "Conditions",
    "difficulty": "hard",
    "question": "What is a 'Jump Table' used by compilers when optimizing dense switch-case statements?",
    "options": [
      "An array of code pointers indexed directly by the switch value, enabling O(1) branch dispatch instead of sequential comparisons",
      "A linked list of case statements",
      "A hardware cache on the CPU",
      "A recursive function call stack"
    ],
    "correctAnswer": 0,
    "explanation": "When cases are dense, compilers generate jump tables to achieve constant-time O(1) multi-way branching."
  },
  {
    "id": "prog-lop-01",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "easy",
    "question": "What is the fundamental difference between a 'while' loop and a 'do-while' loop?",
    "options": [
      "A while loop checks condition before execution; a do-while loop executes the body at least once before checking condition",
      "A do-while loop cannot use break statements",
      "A while loop cannot run infinitely",
      "do-while loops only run on arrays"
    ],
    "correctAnswer": 0,
    "explanation": "do-while is an exit-controlled loop; the body executes at least once regardless of initial condition."
  },
  {
    "id": "prog-lop-02",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "easy",
    "question": "What does the 'continue' statement do when executed inside a loop body?",
    "options": [
      "Skips the remainder of the current iteration and jumps immediately to the loop's next iteration evaluation",
      "Terminates the entire loop permanently",
      "Restarts the loop from index 0",
      "Pauses execution for 1 second"
    ],
    "correctAnswer": 0,
    "explanation": "'continue' skips the rest of the current iteration and advances directly to condition/step update."
  },
  {
    "id": "prog-lop-03",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "easy",
    "question": "What is an 'infinite loop'?",
    "options": [
      "A loop whose terminating condition is never met or evaluated to false, causing indefinite execution",
      "A loop that executes 1,000,000 times",
      "A loop with multiple variables",
      "A loop written inside a constructor"
    ],
    "correctAnswer": 0,
    "explanation": "Infinite loops run perpetually until interrupted externally or by hardware/resource limits."
  },
  {
    "id": "prog-lop-04",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "easy",
    "question": "In a standard 'for (init; condition; update)' loop, when does the 'update' expression execute?",
    "options": [
      "At the end of each iteration, immediately before the next condition check",
      "At the very beginning of the loop",
      "Before the loop body executes",
      "Only when the loop terminates"
    ],
    "correctAnswer": 0,
    "explanation": "The update step (e.g. i++) runs after the body finishes, immediately prior to re-evaluating the condition."
  },
  {
    "id": "prog-lop-05",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "medium",
    "question": "What is 'loop unrolling' performed by optimizing compilers?",
    "options": [
      "Replicating the loop body multiple times to decrease loop control overhead (condition checks, increments) and enhance instruction-level parallelism",
      "Converting a for loop into a while loop",
      "Replacing a loop with a recursive function",
      "Deleting empty loops from binary"
    ],
    "correctAnswer": 0,
    "explanation": "Loop unrolling trades larger binary code size for faster execution by reducing branching overhead."
  },
  {
    "id": "prog-lop-06",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "medium",
    "question": "What is the time complexity of two nested loops where the outer runs N times and inner runs M times?",
    "options": [
      "O(N * M)",
      "O(N + M)",
      "O(N^2)",
      "O(log(N * M))"
    ],
    "correctAnswer": 0,
    "explanation": "For each of the N outer iterations, the inner loop executes M times, resulting in N * M total operations."
  },
  {
    "id": "prog-lop-07",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "medium",
    "question": "What is a 'labeled break' in Java and JavaScript?",
    "options": [
      "Allows breaking out of an outer nested loop directly from within an inner loop",
      "A break statement that logs text to the console",
      "A break statement that only works on switch statements",
      "A syntax error in modern languages"
    ],
    "correctAnswer": 0,
    "explanation": "Labeled breaks (e.g., 'break outerLoop;') terminate the specified enclosing outer loop directly."
  },
  {
    "id": "prog-lop-08",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "medium",
    "question": "What is an 'off-by-one' error in loop iteration?",
    "options": [
      "A logic error where a loop iterates one time too many or one time too few (e.g. using '<=' instead of '<' on zero-indexed arrays)",
      "A loop that increments by 2 instead of 1",
      "An error caused by division by 1",
      "A variable initialized to 1 instead of 0"
    ],
    "correctAnswer": 0,
    "explanation": "Off-by-one errors frequently cause out-of-bounds array access by incorrectly handling boundary indices."
  },
  {
    "id": "prog-lop-09",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "hard",
    "question": "What is 'loop invariant' in formal program verification?",
    "options": [
      "A logical condition that is true before the loop starts and remains true after every iteration of the loop body",
      "A variable that cannot be changed inside a loop",
      "A loop that has no body",
      "A compiler error when loops are nested"
    ],
    "correctAnswer": 0,
    "explanation": "A loop invariant proves the mathematical correctness of an algorithm by remaining invariant throughout loop execution."
  },
  {
    "id": "prog-lop-10",
    "category": "programming",
    "topic": "Loops",
    "difficulty": "hard",
    "question": "How can loop execution order impact performance in matrix multiplication or 2D array traversal in C/C++?",
    "options": [
      "Iterating row-by-row utilizes spatial locality and CPU cache lines, whereas column-by-column causes frequent cache misses (row-major order)",
      "Column-by-column is always faster due to register alignment",
      "Compilers convert all 2D loops into hash maps",
      "Memory traversal order has zero impact on CPU performance"
    ],
    "correctAnswer": 0,
    "explanation": "C/C++ stores 2D arrays in row-major order; traversing rows sequentially maximizes CPU cache hits."
  },
  {
    "id": "prog-fnc-01",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "easy",
    "question": "What is the difference between 'pass by value' and 'pass by reference'?",
    "options": [
      "Pass by value passes a copy of the argument; pass by reference passes the memory address/reference allowing modification of the original variable",
      "Pass by value is only for objects, pass by reference is for primitives",
      "Pass by reference creates a clone of the memory stack",
      "There is no difference in compiled code"
    ],
    "correctAnswer": 0,
    "explanation": "Pass-by-value copies data; pass-by-reference shares memory identity, enabling direct in-place modifications."
  },
  {
    "id": "prog-fnc-02",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "easy",
    "question": "What is a function 'stack frame' or 'activation record'?",
    "options": [
      "A block of stack memory allocated for a function call containing its parameters, local variables, and return address",
      "A graphics rendering frame",
      "A global dictionary storing function names",
      "A CPU register containing assembly code"
    ],
    "correctAnswer": 0,
    "explanation": "Each function invocation pushes a stack frame storing arguments, locals, and the caller's return pointer."
  },
  {
    "id": "prog-fnc-03",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "easy",
    "question": "What is a 'pure function' in functional programming?",
    "options": [
      "A function that always returns the same output for the same inputs and produces zero observable side effects (no mutation of external state)",
      "A function that has no parameters",
      "A function written without any loops",
      "A function that only uses primitive types"
    ],
    "correctAnswer": 0,
    "explanation": "Pure functions are deterministic and side-effect free, facilitating easy caching, memoization, and testing."
  },
  {
    "id": "prog-fnc-04",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "easy",
    "question": "What is the 'return type' of a function that returns nothing in C, C++, and Java?",
    "options": [
      "void",
      "null",
      "undefined",
      "empty"
    ],
    "correctAnswer": 0,
    "explanation": "The 'void' keyword indicates that a function performs operations without returning a value."
  },
  {
    "id": "prog-fnc-05",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "medium",
    "question": "What is an 'inline function' in C++ (using the 'inline' keyword)?",
    "options": [
      "A suggestion to the compiler to substitute the function body directly at the call site to eliminate function call overhead",
      "A function written on a single line of code",
      "A function that can only be called from inside a loop",
      "A function that executes inside the database engine"
    ],
    "correctAnswer": 0,
    "explanation": "Inlining eliminates stack frame push/pop overhead for small, frequently invoked helper functions."
  },
  {
    "id": "prog-fnc-06",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "medium",
    "question": "What is a 'callback function'?",
    "options": [
      "A function passed as an argument to another function, intended to be invoked ('called back') after an operation completes",
      "A function that calls itself recursively",
      "A function that cannot take arguments",
      "A function that returns a boolean value"
    ],
    "correctAnswer": 0,
    "explanation": "Callbacks are widely used for asynchronous event handling and higher-order functional patterns."
  },
  {
    "id": "prog-fnc-07",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "medium",
    "question": "What is a 'closure' in languages like JavaScript or Python?",
    "options": [
      "A function bundled together with references to its surrounding lexical state (variables in its lexical scope even after the outer function has returned)",
      "A function that closes network connections automatically",
      "A function marked with the private keyword",
      "A function that terminates the execution thread"
    ],
    "correctAnswer": 0,
    "explanation": "Closures give functions persistent access to outer enclosing scope variables even after outer execution finishes."
  },
  {
    "id": "prog-fnc-08",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "medium",
    "question": "What is 'function overloading'?",
    "options": [
      "Defining multiple functions in the same scope with the identical name but different parameter signatures (types or counts)",
      "Writing a function with too many lines of code",
      "A function that calls another function infinitely",
      "Calling a function with invalid arguments"
    ],
    "correctAnswer": 0,
    "explanation": "Overloading allows intuitive polymorphism where the compiler selects the implementation matching argument types."
  },
  {
    "id": "prog-fnc-09",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "hard",
    "question": "What is 'tail call optimization' (TCO)?",
    "options": [
      "A compiler optimization where a recursive call in the tail position reuses the current stack frame, preventing stack overflow and achieving O(1) stack space",
      "Deleting parameters from recursive calls",
      "Moving functions to the end of a file",
      "Executing recursive calls on a background thread"
    ],
    "correctAnswer": 0,
    "explanation": "TCO overwrites the current stack frame when the recursive call is the final action, enabling unbounded recursion without stack overflow."
  },
  {
    "id": "prog-fnc-10",
    "category": "programming",
    "topic": "Functions",
    "difficulty": "hard",
    "question": "What is the difference between a function pointer in C and a lambda expression with captures in C++11?",
    "options": [
      "A function pointer can only store addresses of static/free functions without state; a capturing lambda is an anonymous functor object capable of enclosing state",
      "Function pointers cannot be passed to other functions",
      "Lambdas are slower than function pointers in all cases",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Capturing lambdas generate full callable closure objects carrying state, whereas C function pointers are raw code addresses."
  },
  {
    "id": "prog-rec-01",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "easy",
    "question": "What is the mandatory component of every valid recursive function to prevent infinite recursion?",
    "options": [
      "Base case (terminating condition)",
      "A while loop",
      "A global variable",
      "A dynamic array"
    ],
    "correctAnswer": 0,
    "explanation": "The base case halts recursive descent and prevents endless stack frame allocation."
  },
  {
    "id": "prog-rec-02",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "easy",
    "question": "What runtime error occurs if a recursive function lacks a valid base case?",
    "options": [
      "Stack Overflow (Call stack exhaustion)",
      "Out of Disk Space",
      "Null Pointer Exception",
      "Arithmetic Overflow"
    ],
    "correctAnswer": 0,
    "explanation": "Each recursive call consumes stack frame memory; unbound recursion exhausts the thread stack, triggering a Stack Overflow."
  },
  {
    "id": "prog-rec-03",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "easy",
    "question": "What is the time complexity of the naive recursive Fibonacci algorithm: fib(n) = fib(n-1) + fib(n-2)?",
    "options": [
      "O(2^n)",
      "O(n)",
      "O(n^2)",
      "O(log n)"
    ],
    "correctAnswer": 0,
    "explanation": "Each call branches into two sub-calls, generating an exponential recursion tree of height n with ~2^n operations."
  },
  {
    "id": "prog-rec-04",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "easy",
    "question": "In recursion, what is the 'call stack'?",
    "options": [
      "A stack data structure maintained by the runtime environment to track active function calls, arguments, and return addresses",
      "A heap allocation mechanism",
      "A list of syntax errors",
      "A CPU hardware register"
    ],
    "correctAnswer": 0,
    "explanation": "The call stack manages the LIFO execution sequence of function activations and their local environments."
  },
  {
    "id": "prog-rec-05",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "medium",
    "question": "What is 'tail recursion'?",
    "options": [
      "A recursive function where the recursive call is the very last operation executed before returning, with no pending computations",
      "A recursive function that calls itself twice",
      "A recursion that runs in reverse order",
      "A recursive call executed inside a loop"
    ],
    "correctAnswer": 0,
    "explanation": "In tail recursion, the return value of the recursive call is directly returned without post-processing (e.g. return tailRec(n-1, acc*n))."
  },
  {
    "id": "prog-rec-06",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "medium",
    "question": "How can the exponential time complexity of naive recursive Fibonacci be reduced to O(n)?",
    "options": [
      "Memoization (caching results of overlapping subproblems in an array or map)",
      "Running it on a multi-core processor",
      "Removing the base case",
      "Converting all variables to floats"
    ],
    "correctAnswer": 0,
    "explanation": "Memoization stores intermediate solutions, ensuring each unique subproblem is computed exactly once."
  },
  {
    "id": "prog-rec-07",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "medium",
    "question": "Which algorithmic paradigm heavily relies on recursion to break problems into independent sub-problems, solve them, and combine results?",
    "options": [
      "Divide and Conquer (e.g. Merge Sort, Quick Sort)",
      "Greedy Approach",
      "Linear Search",
      "Brute Force Enumeration"
    ],
    "correctAnswer": 0,
    "explanation": "Divide and Conquer decomposes problems into recursive sub-problems and merges their solutions."
  },
  {
    "id": "prog-rec-08",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "medium",
    "question": "What is the maximum recursion depth typically supported by the default Python runtime before raising a RecursionError?",
    "options": [
      "1000",
      "100",
      "100,000",
      "Unlimited"
    ],
    "correctAnswer": 0,
    "explanation": "Python's default recursion limit is 1000 (configurable via sys.setrecursionlimit) to guard against C stack overflow."
  },
  {
    "id": "prog-rec-09",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "hard",
    "question": "What is 'indirect recursion' (or mutual recursion)?",
    "options": [
      "When function A calls function B, and function B in turn calls function A",
      "A function that calls itself through a pointer",
      "A loop that simulates recursion",
      "Recursion that has two base cases"
    ],
    "correctAnswer": 0,
    "explanation": "Mutual or indirect recursion involves two or more functions calling each other in a cyclic sequence."
  },
  {
    "id": "prog-rec-10",
    "category": "programming",
    "topic": "Recursion",
    "difficulty": "hard",
    "question": "How does the Master Theorem solve recurrence relations of the form T(n) = a*T(n/b) + f(n)?",
    "options": [
      "Compares the asymptotic growth of f(n) against n^(log_b(a)) across three distinct cases",
      "Computes the derivative of f(n)",
      "Solves the matrix determinant of a and b",
      "Converts the relation into a quadratic formula"
    ],
    "correctAnswer": 0,
    "explanation": "The Master Theorem evaluates divide-and-conquer recurrences by comparing f(n) against the watershed function n^(log_b(a))."
  },
  {
    "id": "prog-arr-01",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "easy",
    "question": "Why do arrays provide O(1) constant-time access to elements by index?",
    "options": [
      "Array elements are stored in contiguous memory locations, allowing direct calculation: address = base + (index * element_size)",
      "Arrays use hash maps internally",
      "The CPU searches all elements simultaneously",
      "Arrays store pre-computed pointers"
    ],
    "correctAnswer": 0,
    "explanation": "Contiguous memory layout enables instantaneous memory address computation via offset arithmetic in O(1)."
  },
  {
    "id": "prog-arr-02",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "easy",
    "question": "What is the time complexity of inserting an element at the beginning (index 0) of an array of size n?",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "All existing n elements must be shifted one position to the right to make space, requiring O(n) operations."
  },
  {
    "id": "prog-arr-03",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "easy",
    "question": "What is the index of the last element in an array containing n elements in a zero-indexed programming language?",
    "options": [
      "n - 1",
      "n",
      "n + 1",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "In zero-based indexing, valid element indices span from 0 to n - 1."
  },
  {
    "id": "prog-arr-04",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "easy",
    "question": "What is a 'dynamic array' (e.g. std::vector in C++, ArrayList in Java, list in Python)?",
    "options": [
      "An array that automatically resizes by allocating a larger contiguous memory block when capacity is reached",
      "An array that changes its data type at runtime",
      "An array stored in CPU registers",
      "A linked list with array syntax"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic arrays wrap a fixed-size array, doubling capacity when full to provide amortized O(1) appending."
  },
  {
    "id": "prog-arr-05",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "medium",
    "question": "What is the amortized time complexity of appending an element to the end of a dynamic array?",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Although occasional doubling resizing takes O(n), it happens infrequently enough that the amortized cost per append is O(1)."
  },
  {
    "id": "prog-arr-06",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "medium",
    "question": "What is a 'Jagged Array'?",
    "options": [
      "A multi-dimensional array where member rows can have different lengths (an array of arrays)",
      "An array with sorted negative numbers",
      "An array that throws an error on access",
      "A single-dimensional array with gaps"
    ],
    "correctAnswer": 0,
    "explanation": "A jagged array is an array whose elements are themselves arrays of varying dimensions."
  },
  {
    "id": "prog-arr-07",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "medium",
    "question": "What is the 'two-pointer technique' commonly used in array algorithms?",
    "options": [
      "Using two index variables (e.g., left and right) traversing inward or in tandem to solve search/pair problems in O(n)",
      "Using pointers to pointers in C",
      "A pointer that points to two memory addresses",
      "Storing arrays in two different RAM chips"
    ],
    "correctAnswer": 0,
    "explanation": "Two-pointer strategies reduce nested O(n^2) pair searches to linear O(n) passes over sorted arrays."
  },
  {
    "id": "prog-arr-08",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "medium",
    "question": "In 2D arrays, what is the difference between 'row-major' and 'column-major' order?",
    "options": [
      "Row-major stores all elements of a row contiguously before the next row; column-major stores columns contiguously",
      "Row-major is for C/C++, while column-major is for Fortran and MATLAB",
      "Both A and B are correct",
      "Row-major uses more memory"
    ],
    "correctAnswer": 2,
    "explanation": "C/C++/Java use row-major order; Fortran and MATLAB use column-major order."
  },
  {
    "id": "prog-arr-09",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "hard",
    "question": "What is the Kadane's algorithm used for on an array of numbers?",
    "options": [
      "Finding the maximum sum contiguous subarray in O(n) time and O(1) space",
      "Sorting the array in O(n log n)",
      "Finding the median of two arrays",
      "Detecting duplicates in an array"
    ],
    "correctAnswer": 0,
    "explanation": "Kadane's algorithm computes the maximum subarray sum in a single linear pass by tracking current and global max."
  },
  {
    "id": "prog-arr-10",
    "category": "programming",
    "topic": "Arrays",
    "difficulty": "hard",
    "question": "What is the 'Dutch National Flag' algorithm designed to do on an array?",
    "options": [
      "Sort an array of three distinct values (e.g. 0s, 1s, and 2s) in a single linear pass using three pointers in O(n) time and O(1) space",
      "Check if an array forms a palindrome",
      "Compute the convex hull of 2D points",
      "Compress an array using Huffman coding"
    ],
    "correctAnswer": 0,
    "explanation": "Dijkstra's Dutch National Flag algorithm partitions arrays of 3 categories in O(n) with low, mid, and high pointers."
  },
  {
    "id": "prog-str-01",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "easy",
    "question": "What distinguishes a C-style string from a regular character array in C?",
    "options": [
      "A C-style string is terminated by a null character ('\\0')",
      "A C-style string is stored on the heap",
      "A C-style string has a length property",
      "A C-style string cannot contain spaces"
    ],
    "correctAnswer": 0,
    "explanation": "In C, strings are null-terminated character sequences; the '\\0' byte marks the end of the string."
  },
  {
    "id": "prog-str-02",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "easy",
    "question": "In Java and Python, why are strings designed to be 'immutable'?",
    "options": [
      "Security (safe sharing in classloaders/networks), thread safety (no synchronization needed), and hash code caching for HashMaps",
      "To save hard drive space",
      "Because processors cannot modify letters",
      "To make concatenation faster"
    ],
    "correctAnswer": 0,
    "explanation": "Immutability guarantees thread safety, prevents unauthorized mutations, and allows safe hash caching."
  },
  {
    "id": "prog-str-03",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "easy",
    "question": "What is the time complexity of computing the length of a null-terminated string using strlen() in C?",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "strlen() traverses character by character from the start pointer until it encounters '\\0', taking linear O(n) time."
  },
  {
    "id": "prog-str-04",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "easy",
    "question": "What is a 'palindrome' string?",
    "options": [
      "A string that reads the same forwards and backwards (e.g. 'racecar')",
      "A string with only vowels",
      "A string sorted in alphabetical order",
      "An encrypted cryptographic string"
    ],
    "correctAnswer": 0,
    "explanation": "Palindromes are strings identical to their reversed sequence."
  },
  {
    "id": "prog-str-05",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "medium",
    "question": "In Java, what class should be used instead of String when performing intensive string concatenations in a loop?",
    "options": [
      "StringBuilder (or StringBuffer for thread safety)",
      "char[]",
      "StringConcat",
      "ArrayList<Character>"
    ],
    "correctAnswer": 0,
    "explanation": "Concatenating immutable Strings in a loop copies the buffer repeatedly in O(n^2); StringBuilder appends in O(1) amortized."
  },
  {
    "id": "prog-str-06",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "medium",
    "question": "What are two strings called if one is a rearrangement of the exact letters of the other (e.g., 'listen' and 'silent')?",
    "options": [
      "Anagrams",
      "Homophones",
      "Palindromes",
      "Substrings"
    ],
    "correctAnswer": 0,
    "explanation": "Anagrams contain identical characters with the exact same frequencies in a different permutation."
  },
  {
    "id": "prog-str-07",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "medium",
    "question": "What is the 'String Interning' optimization performed by the JVM and Python runtimes?",
    "options": [
      "Storing only one copy of each distinct literal string in an internal string pool to conserve memory and allow fast reference equality checks",
      "Translating strings into foreign languages",
      "Encrypting strings in RAM",
      "Deleting unused strings after 1 minute"
    ],
    "correctAnswer": 0,
    "explanation": "String interning deduplicates string constants in a string pool, allowing '==' pointer comparisons to succeed."
  },
  {
    "id": "prog-str-08",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "hard",
    "question": "What is the Knuth-Morris-Pratt (KMP) string matching algorithm's time complexity for finding a pattern of length m in text of length n?",
    "options": [
      "O(n + m)",
      "O(n * m)",
      "O(n^2)",
      "O(log(n + m))"
    ],
    "correctAnswer": 0,
    "explanation": "KMP uses an auxiliary Longest Prefix Suffix (LPS) array to avoid backtracking, searching in linear O(n + m) time."
  },
  {
    "id": "prog-str-09",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "hard",
    "question": "What is a Trie (Prefix Tree) data structure optimal for?",
    "options": [
      "Fast retrieval, autocompletion, and prefix matching of strings in O(L) time where L is word length",
      "Sorting integers in descending order",
      "Finding shortest path in graphs",
      "Evaluating mathematical polynomials"
    ],
    "correctAnswer": 0,
    "explanation": "Tries store characters at tree nodes along edges, enabling O(length) search independent of dictionary size."
  },
  {
    "id": "prog-str-10",
    "category": "programming",
    "topic": "Strings",
    "difficulty": "hard",
    "question": "What is the difference between a 'substring' and a 'subsequence' of a string?",
    "options": [
      "A substring must be contiguous characters; a subsequence can have gaps between characters as long as relative order is preserved",
      "A subsequence must be contiguous; a substring has gaps",
      "They are mathematically identical terms",
      "A substring cannot contain vowels"
    ],
    "correctAnswer": 0,
    "explanation": "In 'abcde', 'bcd' is a substring and subsequence; 'ace' is a subsequence but NOT a substring."
  },
  {
    "id": "prog-ptr-01",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "easy",
    "question": "What does a pointer variable store in C/C++?",
    "options": [
      "The memory address of another variable",
      "The numeric value of an integer",
      "A copy of an object",
      "The name of a function as text"
    ],
    "correctAnswer": 0,
    "explanation": "A pointer is a variable whose value is the direct virtual memory address of another variable or resource."
  },
  {
    "id": "prog-ptr-02",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "easy",
    "question": "What operator is used to obtain the memory address of a variable in C/C++?",
    "options": [
      "& (Address-of operator)",
      "* (Dereference operator)",
      "-> (Arrow operator)",
      "# (Preprocessor)"
    ],
    "correctAnswer": 0,
    "explanation": "The ampersand '&' returns the memory location address of its operand."
  },
  {
    "id": "prog-ptr-03",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "easy",
    "question": "What is a 'null pointer'?",
    "options": [
      "A pointer that points to no valid memory location (evaluates to 0 or nullptr)",
      "A pointer that has been deleted by antivirus",
      "A pointer that points to the CPU cache",
      "A pointer with an odd-numbered address"
    ],
    "correctAnswer": 0,
    "explanation": "A null pointer explicitly references no object or memory, signaling absence of data."
  },
  {
    "id": "prog-ptr-04",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "easy",
    "question": "What happens when you dereference a null pointer in C/C++?",
    "options": [
      "Segmentation fault / Crash (reading from address 0x0)",
      "Returns integer 0 safely",
      "The computer restarts immediately",
      "A warning is logged and execution continues"
    ],
    "correctAnswer": 0,
    "explanation": "Address 0x0 is protected by operating system page tables; attempting to read or write triggers an immediate segfault."
  },
  {
    "id": "prog-ptr-05",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "medium",
    "question": "What is a 'dangling pointer'?",
    "options": [
      "A pointer pointing to a memory location that has already been deallocated/freed",
      "A pointer pointing to a null address",
      "A pointer declared inside a struct",
      "A pointer that has two names"
    ],
    "correctAnswer": 0,
    "explanation": "Dangling pointers point to released memory; dereferencing them causes undefined behavior or memory corruption."
  },
  {
    "id": "prog-ptr-06",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "medium",
    "question": "What is pointer arithmetic: if 'int *ptr = 1000' and sizeof(int) is 4, what is the value of 'ptr + 1'?",
    "options": [
      "1004",
      "1001",
      "1000",
      "1008"
    ],
    "correctAnswer": 0,
    "explanation": "Pointer arithmetic scales by the size of the referenced data type: 1000 + (1 * 4) = 1004."
  },
  {
    "id": "prog-ptr-07",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "medium",
    "question": "In C++, what is the fundamental difference between a reference (int &ref) and a pointer (int *ptr)?",
    "options": [
      "A reference cannot be null, must be initialized upon declaration, and cannot be reseated to refer to another object",
      "A reference uses 16 bytes while a pointer uses 4 bytes",
      "A pointer cannot point to objects",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "References are immutable aliases that guarantee non-nullness and cannot be rebound."
  },
  {
    "id": "prog-ptr-08",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "medium",
    "question": "What is a 'void pointer' (void *) in C?",
    "options": [
      "A generic pointer that can point to any data type without type-specific information, but cannot be directly dereferenced without casting",
      "A pointer that points to nothing",
      "A function that returns void",
      "A pointer that cannot be stored in an array"
    ],
    "correctAnswer": 0,
    "explanation": "void* represents generic raw memory addresses (as used by malloc/free) and requires casting to dereference."
  },
  {
    "id": "prog-ptr-09",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "hard",
    "question": "What is a 'smart pointer' in modern C++ (C++11 and beyond)?",
    "options": [
      "A template class (std::unique_ptr, std::shared_ptr) that wraps raw pointers and automates memory deallocation via RAII",
      "An AI-powered pointer that writes code",
      "A pointer that compresses data",
      "A pointer that runs in kernel mode"
    ],
    "correctAnswer": 0,
    "explanation": "Smart pointers manage object lifecycles using RAII, freeing memory automatically when ownership goes out of scope."
  },
  {
    "id": "prog-ptr-10",
    "category": "programming",
    "topic": "Pointers & References",
    "difficulty": "hard",
    "question": "What is the difference between 'std::unique_ptr' and 'std::shared_ptr' in C++?",
    "options": [
      "unique_ptr represents exclusive ownership (cannot be copied, only moved); shared_ptr uses reference counting for shared ownership",
      "unique_ptr is slower than shared_ptr",
      "shared_ptr cannot be used with custom classes",
      "unique_ptr automatically creates threads"
    ],
    "correctAnswer": 0,
    "explanation": "unique_ptr enforces single ownership with zero runtime overhead; shared_ptr tracks multiple owners via atomic reference count."
  },
  {
    "id": "prog-cpx-01",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "easy",
    "question": "What does Big-O notation (O) represent in algorithm analysis?",
    "options": [
      "The asymptotic upper bound on the worst-case growth rate of an algorithm as input size increases",
      "The exact execution time in milliseconds",
      "The minimum number of lines of code",
      "The best-case execution performance"
    ],
    "correctAnswer": 0,
    "explanation": "Big-O provides an asymptotic upper bound, guaranteeing the algorithm will grow no faster than f(n)."
  },
  {
    "id": "prog-cpx-02",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "easy",
    "question": "What is the time complexity of searching for an element in an unsorted array of size n?",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "In the worst case, linear search must inspect all n elements, yielding O(n) time."
  },
  {
    "id": "prog-cpx-03",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "easy",
    "question": "What is the time complexity of Binary Search on a sorted array of size n?",
    "options": [
      "O(log n)",
      "O(n)",
      "O(1)",
      "O(n log n)"
    ],
    "correctAnswer": 0,
    "explanation": "Binary search halves the remaining search space at every comparison: n, n/2, n/4... taking O(log n) steps."
  },
  {
    "id": "prog-cpx-04",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "easy",
    "question": "Which of the following time complexities represents the fastest growth rate (slowest algorithm)?",
    "options": [
      "O(2^n)",
      "O(n^3)",
      "O(n log n)",
      "O(n!)"
    ],
    "correctAnswer": 3,
    "explanation": "Factorial complexity O(n!) grows faster than exponential O(2^n), making it practically intractable for n > 20."
  },
  {
    "id": "prog-cpx-05",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "medium",
    "question": "What is the best, average, and worst-case time complexity of Quick Sort?",
    "options": [
      "Best: O(n log n), Average: O(n log n), Worst: O(n^2)",
      "Best: O(n), Average: O(n log n), Worst: O(n log n)",
      "Best: O(1), Average: O(n), Worst: O(n^2)",
      "Best: O(n^2), Average: O(n^2), Worst: O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Quick Sort is O(n log n) on average, but degrades to O(n^2) when partitions are unbalanced (e.g. sorted array with first element as pivot)."
  },
  {
    "id": "prog-cpx-06",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "medium",
    "question": "What is the space complexity of an iterative algorithm that only uses three scalar integer variables regardless of input size n?",
    "options": [
      "O(1) (Constant space)",
      "O(n)",
      "O(log n)",
      "O(3n)"
    ],
    "correctAnswer": 0,
    "explanation": "When additional memory allocated does not scale with input size n, the auxiliary space complexity is O(1)."
  },
  {
    "id": "prog-cpx-07",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "medium",
    "question": "What is the difference between Big-O (O), Big-Omega (Ω), and Big-Theta (Θ) notations?",
    "options": [
      "Big-O is asymptotic upper bound; Big-Omega is lower bound; Big-Theta is tight bound (both upper and lower)",
      "Big-O is for time; Big-Omega is for space",
      "Big-Theta is only for recursive algorithms",
      "They are interchangeable synonyms"
    ],
    "correctAnswer": 0,
    "explanation": "O defines the upper ceiling, Ω defines the lower floor, and Θ defines an exact tight asymptotic bound."
  },
  {
    "id": "prog-cpx-08",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "medium",
    "question": "What is 'amortized complexity' in algorithm analysis?",
    "options": [
      "The average time taken per operation over a worst-case sequence of operations (e.g. dynamic array resize)",
      "The best-case runtime on Monday mornings",
      "The financial cost of running algorithms in the cloud",
      "The compile-time duration"
    ],
    "correctAnswer": 0,
    "explanation": "Amortized analysis averages occasional expensive operations across a long sequence of inexpensive operations."
  },
  {
    "id": "prog-cpx-09",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "hard",
    "question": "What is the time complexity of building a Binary Heap from an unordered array of n elements using the bottom-up heapify approach?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(log n)"
    ],
    "correctAnswer": 0,
    "explanation": "Bottom-up build_heap sums (n / 2^(h+1)) * O(h), which forms a convergent geometric series bounded by O(n), not O(n log n)."
  },
  {
    "id": "prog-cpx-10",
    "category": "programming",
    "topic": "Complexity Analysis",
    "difficulty": "hard",
    "question": "What does the Complexity Class 'NP-Complete' signify?",
    "options": [
      "Problems whose solutions can be verified in polynomial time (NP) and to which any other NP problem can be reduced in polynomial time",
      "Problems that cannot be solved by any computer",
      "Problems with non-polynomial space",
      "Problems that run in negative time"
    ],
    "correctAnswer": 0,
    "explanation": "NP-Complete problems represent the hardest problems in NP; finding a polynomial-time solution for one would solve all problems in NP."
  },
  {
    "id": "prog-bds-01",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "easy",
    "question": "Which data structure follows the Last-In, First-Out (LIFO) access principle?",
    "options": [
      "Stack",
      "Queue",
      "Binary Search Tree",
      "Linked List"
    ],
    "correctAnswer": 0,
    "explanation": "A Stack inserts (push) and removes (pop) elements from the top, adhering to LIFO order."
  },
  {
    "id": "prog-bds-02",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "easy",
    "question": "Which data structure follows the First-In, First-Out (FIFO) principle?",
    "options": [
      "Queue",
      "Stack",
      "Priority Queue",
      "Hash Map"
    ],
    "correctAnswer": 0,
    "explanation": "A Queue inserts at the rear (enqueue) and removes from the front (dequeue) in FIFO order."
  },
  {
    "id": "prog-bds-03",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "easy",
    "question": "What is the primary advantage of a Singly Linked List over an Array?",
    "options": [
      "Dynamic size and O(1) insertions/deletions at the head without memory shifting",
      "Faster random indexing access",
      "Uses less memory per element",
      "Cache-friendly memory locality"
    ],
    "correctAnswer": 0,
    "explanation": "Linked lists allocate nodes on-demand anywhere in the heap, allowing O(1) pointer updates without shifting elements."
  },
  {
    "id": "prog-bds-04",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "easy",
    "question": "What is the worst-case time complexity of searching for a key in a standard Hash Table with poor hash distribution?",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n log n)"
    ],
    "correctAnswer": 0,
    "explanation": "When all keys collide into the same bucket chain, search degrades to a linear linked-list traversal taking O(n)."
  },
  {
    "id": "prog-bds-05",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "medium",
    "question": "How is a Circular Queue implemented in an array to distinguish between empty and full states?",
    "options": [
      "Using (rear + 1) % capacity == front for full, and rear == front for empty",
      "Setting all elements to 0",
      "Adding a second array",
      "Using a pointer to the middle"
    ],
    "correctAnswer": 0,
    "explanation": "Modular arithmetic wraps pointers around array ends, reserving one slot or using a counter to distinguish full from empty."
  },
  {
    "id": "prog-bds-06",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "medium",
    "question": "What is the time complexity of inserting an element into a Binary Search Tree (BST) of height h?",
    "options": [
      "O(h)",
      "O(1)",
      "O(n log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "BST insertion descends one level per step, taking O(h) time (which is O(log n) when balanced, but O(n) if skewed)."
  },
  {
    "id": "prog-bds-07",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "medium",
    "question": "What is a 'Priority Queue' typically backed by for efficient implementation?",
    "options": [
      "Binary Heap (Min-Heap or Max-Heap)",
      "Unsorted Linked List",
      "Circular Buffer",
      "Stack"
    ],
    "correctAnswer": 0,
    "explanation": "Binary heaps provide O(log n) insertions and O(1) access (O(log n) removal) to the highest-priority element."
  },
  {
    "id": "prog-bds-08",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "medium",
    "question": "What is a 'Doubly Linked List'?",
    "options": [
      "A linked list where each node contains pointers to both its next node and its previous node",
      "A linked list with twice as many elements",
      "A linked list stored in two different arrays",
      "A circular list without a head"
    ],
    "correctAnswer": 0,
    "explanation": "Doubly linked lists enable bidirectional traversal and O(1) node deletion given a direct pointer to that node."
  },
  {
    "id": "prog-bds-09",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "hard",
    "question": "How is collision resolution handled in Hash Tables using 'Open Addressing' with Linear Probing?",
    "options": [
      "When a collision occurs, check the next sequential index (hash + 1) % table_size until an empty slot is found",
      "Store colliding keys in a separate binary tree",
      "Delete the existing key",
      "Double the hash function"
    ],
    "correctAnswer": 0,
    "explanation": "Linear probing searches adjacent array slots linearly upon collisions, avoiding external node allocations."
  },
  {
    "id": "prog-bds-10",
    "category": "programming",
    "topic": "Basic Data Structures",
    "difficulty": "hard",
    "question": "What data structure is optimal for implementing an LRU (Least Recently Used) Cache with O(1) get and put operations?",
    "options": [
      "Hash Map paired with a Doubly Linked List",
      "Binary Search Tree",
      "Single Array with shift",
      "Priority Queue"
    ],
    "correctAnswer": 0,
    "explanation": "The Hash Map provides O(1) key lookup, and the Doubly Linked List provides O(1) node detachment and relocation to the head."
  },
  {
    "id": "prog-dbg-01",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "easy",
    "question": "What is a 'breakpoint' in an IDE or debugger (e.g. GDB, VS Code)?",
    "options": [
      "An intentional stopping point in the program where execution pauses to allow inspection of variables and call stack",
      "A place where code is broken and won't compile",
      "A command that restarts the computer",
      "A line of code that formats indentation"
    ],
    "correctAnswer": 0,
    "explanation": "Breakpoints halt execution on target lines so developers can evaluate state, memory, and flow."
  },
  {
    "id": "prog-dbg-02",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "easy",
    "question": "What does 'stepping over' (Step Over) a line mean during interactive debugging?",
    "options": [
      "Executes the current line of code (including any function calls) and pauses at the immediate next line in the current function",
      "Skips the line without running it",
      "Jumps inside the called function",
      "Terminates the program immediately"
    ],
    "correctAnswer": 0,
    "explanation": "Step Over runs the current line as a unit and pauses on the next statement without descending into child functions."
  },
  {
    "id": "prog-dbg-03",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "easy",
    "question": "What does 'stepping into' (Step Into) a function call mean?",
    "options": [
      "Transfers debugger execution into the first line of the invoked function to debug its internal logic",
      "Skips the function completely",
      "Deletes the function from source code",
      "Executes the function in the cloud"
    ],
    "correctAnswer": 0,
    "explanation": "Step Into moves the execution cursor inside the called function body."
  },
  {
    "id": "prog-dbg-04",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "easy",
    "question": "What is a 'Stack Trace' produced during an uncaught runtime exception?",
    "options": [
      "A report showing the active stack frames and line numbers of function calls that led up to the exception point",
      "A log of memory heap allocations",
      "A list of CPU instructions",
      "A list of syntax errors found by the compiler"
    ],
    "correctAnswer": 0,
    "explanation": "A stack trace reveals the hierarchical invocation path leading directly to the crashing line of code."
  },
  {
    "id": "prog-dbg-05",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "medium",
    "question": "What is 'rubber duck debugging'?",
    "options": [
      "Explaining your code line-by-line in plain language to an inanimate object to force structured thinking and expose flawed assumptions",
      "Using automated AI bots to rewrite code",
      "Testing code underwater",
      "Running unit tests with toy data"
    ],
    "correctAnswer": 0,
    "explanation": "Articulating logic out loud forces cognitive clarification, frequently revealing the bug without outside assistance."
  },
  {
    "id": "prog-dbg-06",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "medium",
    "question": "What tool is commonly used in Linux C/C++ environments to detect memory leaks and invalid memory accesses?",
    "options": [
      "Valgrind (Memcheck)",
      "Grep",
      "Vim",
      "Tar"
    ],
    "correctAnswer": 0,
    "explanation": "Valgrind's Memcheck tool tracks heap allocations and flags uninitialized reads, buffer overflows, and memory leaks."
  },
  {
    "id": "prog-dbg-07",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "medium",
    "question": "What is a 'Heisenbug' in software engineering?",
    "options": [
      "A bug that disappears or alters its behavior when someone attempts to isolate or debug it (often timing/concurrency related)",
      "A bug caused by radioactive decay in hardware",
      "A syntax error in quantum computing",
      "A bug that only affects German computers"
    ],
    "correctAnswer": 0,
    "explanation": "Heisenbugs change behavior when observed because debuggers, print statements, or profilers alter thread timings."
  },
  {
    "id": "prog-dbg-08",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "medium",
    "question": "What is the purpose of an 'assertion' (assert statement) in production code?",
    "options": [
      "Sanity-checks assumptions that must be true; aborts or logs immediately if an impossible invariant is violated",
      "Formats output strings",
      "Increases loop speed",
      "Prevents memory fragmentation"
    ],
    "correctAnswer": 0,
    "explanation": "Assertions catch internal logic invariants early during testing; in release builds, they are often compiled out."
  },
  {
    "id": "prog-dbg-09",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "hard",
    "question": "What is a 'Core Dump' file generated after a fatal application crash on Unix/Linux?",
    "options": [
      "A snapshot of the program's virtual memory, registers, and execution state at the exact moment of failure for post-mortem analysis",
      "A backup of all source code files",
      "A compressed system installer",
      "A garbage collection log"
    ],
    "correctAnswer": 0,
    "explanation": "Developers load core dumps into debuggers (gdb ./app core) to inspect the exact memory state at the point of crash."
  },
  {
    "id": "prog-dbg-10",
    "category": "programming",
    "topic": "Debugging",
    "difficulty": "hard",
    "question": "What is 'binary search debugging' (e.g., git bisect)?",
    "options": [
      "Systematically testing the middle commit between a known good commit and bad commit to find the exact regression commit in O(log N) tests",
      "Debugging binary assembly files with a hex editor",
      "Searching for variables in binary trees",
      "Writing unit tests using base-2 numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Git bisect uses binary search over commit history to pinpoint the precise commit that introduced a defect."
  },
  {
    "id": "prog-psa-01",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "easy",
    "question": "What should be the very first step when an interviewer presents an algorithmic coding problem?",
    "options": [
      "Clarify requirements, input/output formats, constraints, and edge cases before writing any code",
      "Immediately start typing code on the whiteboard",
      "Ask the interviewer to give you the answer",
      "Memorize the question and stay silent for 15 minutes"
    ],
    "correctAnswer": 0,
    "explanation": "Clarifying constraints (e.g. array bounds, negative numbers, duplicates) prevents building the wrong solution."
  },
  {
    "id": "prog-psa-02",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "easy",
    "question": "What is the recommended approach to explain your technical thought process during an interview?",
    "options": [
      "Think out loud: communicate your intuition, discuss brute force trade-offs, and explain how you optimize toward an efficient solution",
      "Write code in total silence and only speak when finished",
      "Argue with the interviewer if they offer a hint",
      "Pretend you have solved this exact problem 100 times"
    ],
    "correctAnswer": 0,
    "explanation": "Interviewers evaluate problem decomposition, technical communication, and receptivity to feedback."
  },
  {
    "id": "prog-psa-03",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "easy",
    "question": "What is a 'brute-force approach' and why should it be mentioned first?",
    "options": [
      "The most straightforward, naive solution; establishes a working baseline before optimizing time/space complexity",
      "A solution that hacks the server",
      "Writing code with multiple errors",
      "An illegal algorithmic approach"
    ],
    "correctAnswer": 0,
    "explanation": "Stating the brute-force baseline proves you understand the problem and sets the stage for complexity optimization."
  },
  {
    "id": "prog-psa-04",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "easy",
    "question": "Which of the following represents a critical 'edge case' to test when writing an array algorithm?",
    "options": [
      "Empty array (size 0), single-element array, all duplicate elements, and negative values",
      "An array with normal distinct positive numbers",
      "An array printed in blue color",
      "An array loaded from a file"
    ],
    "correctAnswer": 0,
    "explanation": "Boundary inputs (empty, single element, extreme duplicates, negatives) frequently expose off-by-one and null pointer bugs."
  },
  {
    "id": "prog-psa-05",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "medium",
    "question": "What does 'dry-running' your code on a sample input mean?",
    "options": [
      "Manually tracing the code line-by-line with sample values on paper or whiteboard before running it to verify logic and pointer states",
      "Running the code without electricity",
      "Deleting comments from code",
      "Compiling code without optimization"
    ],
    "correctAnswer": 0,
    "explanation": "Dry-running verifies index boundaries, condition branches, and variable mutations against edge cases manually."
  },
  {
    "id": "prog-psa-06",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "medium",
    "question": "What is the 'Space-Time Tradeoff' in algorithmic problem solving?",
    "options": [
      "Using additional auxiliary memory (e.g. Hash Map) to reduce execution time complexity (e.g. from O(n^2) to O(n))",
      "Compressing code to take less hard drive space",
      "Writing code faster to save developer time",
      "Running algorithms on faster hardware"
    ],
    "correctAnswer": 0,
    "explanation": "Storing precomputed intermediate data in memory allows algorithms to bypass redundant repetitive computations."
  },
  {
    "id": "prog-psa-07",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "medium",
    "question": "When an interviewer gives you a hint during a coding session, how should you respond?",
    "options": [
      "Acknowledge the hint, integrate the insight into your mental model out loud, and explain how it alters your approach",
      "Ignore the hint and continue with your original approach",
      "Take offense and claim you knew it all along",
      "Ask the interviewer to write the code for you"
    ],
    "correctAnswer": 0,
    "explanation": "Interviewers use hints to evaluate coachability, collaborative teamwork, and intellectual agility."
  },
  {
    "id": "prog-psa-08",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "medium",
    "question": "What is the 'sliding window' pattern optimal for?",
    "options": [
      "Finding the optimal contiguous subarray or substring of fixed or variable size in linear O(n) time instead of O(n^2)",
      "Rendering GUI window components on screen",
      "Splitting an array into two halves",
      "Sorting integers in descending order"
    ],
    "correctAnswer": 0,
    "explanation": "Sliding window expands and contracts boundary pointers, eliminating redundant internal recalculations."
  },
  {
    "id": "prog-psa-09",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "hard",
    "question": "What strategy is recommended when you are completely stuck on a complex coding problem?",
    "options": [
      "Simplify the problem: solve for a smaller sub-case (e.g. n=3), identify repeating mathematical patterns, and build up inductively",
      "Give up immediately and end the interview",
      "Repeat the problem statement louder and louder",
      "Guess random library functions"
    ],
    "correctAnswer": 0,
    "explanation": "Solving a scaled-down concrete instance uncovers structural patterns that extrapolate to the general solution."
  },
  {
    "id": "prog-psa-10",
    "category": "programming",
    "topic": "Problem-Solving Approach",
    "difficulty": "hard",
    "question": "Before telling the interviewer you are 'done' writing your code, you must always:",
    "options": [
      "Walk through the implementation with an edge-case test trace, check off-by-one errors, and state the final Big-O time and space complexity",
      "Close your laptop screen",
      "Ask if you got the job",
      "Erase the whiteboard"
    ],
    "correctAnswer": 0,
    "explanation": "Self-verification proves engineering rigor, attention to quality, and confidence in your deliverable."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['programming'] = programmingData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = programmingData;
  }
})();
