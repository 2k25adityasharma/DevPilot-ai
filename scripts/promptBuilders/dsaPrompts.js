/**
 * DSA & Interview Prompt Collection (18 Prompts)
 * Covers LeetCode Hints, No-Spoiler Mentorship Levels 1-5, Patterns, Complexity, and Debugging.
 */
module.exports = [
  // No-Spoiler Mentorship System: Levels 1 - 5
  {
    id: 'dsa-no-spoiler-level1',
    title: 'DSA No-Spoiler Mentor: Level 1 Concept Hint',
    category: 'DSA & Interview',
    subcategory: 'No-Spoiler Mentorship',
    description: 'Provides only a conceptual nudge or mental model without revealing the algorithmic pattern or any code.',
    prompt: `Act as an expert DSA Coach and Socratic Interviewer. My goal is to build deep problem-solving intuition without having the answer spoiled.

Problem Statement:
{{PROBLEM_DESCRIPTION}}

My Current Thoughts / Approach:
{{MY_ATTEMPT_OR_THOUGHTS}}

Rules:
- DO NOT reveal the algorithm name (e.g. do not say "use Sliding Window" or "use Monotonic Stack").
- DO NOT write any pseudocode or code.
- DO NOT provide the optimal time complexity yet.
- Ask me 2 to 3 targeted guiding questions about the input properties, constraints, or invariants that will trigger the "Aha!" moment.
- Highlight any hidden assumption I might be making in my current thoughts.

Expected Output Format:
1. Socratic Observation on My Attempt
2. Conceptual Guiding Questions (2-3 questions)
3. One Invariant to Think About (e.g., "What happens as the right boundary expands?")`,
    tags: ['dsa', 'leetcode', 'hints', 'no-spoiler', 'interview-prep', 'socratic'],
    difficulty: 'Beginner',
    useCase: 'Learning & Hints',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{MY_ATTEMPT_OR_THOUGHTS}}'],
    expectedOutput: 'Socratic observation + 2-3 guiding questions + invariant hint (zero spoilers or code)'
  },
  {
    id: 'dsa-no-spoiler-level2',
    title: 'DSA No-Spoiler Mentor: Level 2 Pattern Hint',
    category: 'DSA & Interview',
    subcategory: 'No-Spoiler Mentorship',
    description: 'Reveals the algorithmic category and explains why the problem constraints mathematically point to this pattern.',
    prompt: `Act as a Senior DSA Coach. I understand the basic problem statement, but I need guidance on which algorithmic pattern fits best.

Problem & Constraints:
{{PROBLEM_AND_CONSTRAINTS}}

My Analysis So Far:
{{MY_ANALYSIS}}

Tasks:
1. Reveal the matching algorithmic pattern (e.g. Two Pointers, Monotonic Stack, Sliding Window, Prefix Sum + Hashing, TopoSort, DP).
2. Justify WHY this pattern applies by analyzing the problem constraints (e.g. N <= 10^5 implies O(N) or O(N log N)).
3. Identify the core data structure needed and its role (e.g. "We need a Deque to maintain maximums in a sliding window").
4. State the condition when elements enter or leave the data structure.
5. DO NOT provide pseudocode or the full solution yet.

Expected Output Format:
1. Algorithmic Pattern Name
2. Constraint & Big-O Deduction
3. Core Data Structure & Its Invariant
4. Transition / Window Shift Rule`,
    tags: ['dsa', 'pattern-recognition', 'leetcode', 'no-spoiler', 'hints'],
    difficulty: 'Intermediate',
    useCase: 'Learning & Hints',
    variables: ['{{PROBLEM_AND_CONSTRAINTS}}', '{{MY_ANALYSIS}}'],
    expectedOutput: 'Pattern name + constraint deduction + data structure invariant + shift condition'
  },
  {
    id: 'dsa-no-spoiler-level3',
    title: 'DSA No-Spoiler Mentor: Level 3 Approach & Algorithm Blueprint',
    category: 'DSA & Interview',
    subcategory: 'No-Spoiler Mentorship',
    description: 'Outlines the high-level step-by-step algorithm blueprint and invariants without giving away concrete code.',
    prompt: `Act as a Technical Interview Mentor. I know the pattern for this problem, but I need the step-by-step algorithmic blueprint to implement it myself.

Problem & Pattern:
{{PROBLEM_AND_CHOSEN_PATTERN}}

Tasks:
1. Formulate the state invariants (what must remain true before and after each loop iteration).
2. Provide a clear 4-to-6 step textual algorithm blueprint (plain English, no code syntax).
3. Specify the exact base cases and termination criteria.
4. Detail how to handle edge conditions (e.g., negative values, duplicates, empty bounds).
5. State the target Time and Auxiliary Space complexities.

Constraints:
- Do NOT write C++, Java, or Python syntax. Keep it strictly conceptual blueprint format.

Expected Output Format:
1. Invariants to Maintain
2. Step-by-Step Algorithmic Logic
3. Termination & Boundary Rules
4. Complexity Target`,
    tags: ['dsa', 'approach', 'blueprint', 'leetcode', 'algorithms'],
    difficulty: 'Intermediate',
    useCase: 'Learning & Hints',
    variables: ['{{PROBLEM_AND_CHOSEN_PATTERN}}'],
    expectedOutput: 'Step-by-step plain English algorithm blueprint + loop invariants + boundary rules'
  },
  {
    id: 'dsa-no-spoiler-level4',
    title: 'DSA No-Spoiler Mentor: Level 4 Pseudocode & Invariant Contract',
    category: 'DSA & Interview',
    subcategory: 'No-Spoiler Mentorship',
    description: 'Provides structured language-agnostic pseudocode with loop conditions and state updates.',
    prompt: `Act as a Staff Algorithm Specialist. I need structured, language-agnostic pseudocode for the following algorithm.

Algorithm Objective & Constraints:
{{ALGORITHM_OBJECTIVE}}

Tasks:
1. Write clean, indented pseudocode (using FUNCTION, FOR, WHILE, IF/ELSE, RETURN).
2. Clearly declare pointer initialization and state variables.
3. Annotate the loop invariants with comments.
4. Show exact condition when pointers advance or data structures pop.
5. Explicitly handle return value for edge cases (e.g., target not found -> return -1).

Expected Output Format:
1. State Variables Definition
2. Structured Pseudocode
3. Loop Invariant Comments
4. Complexity Proof`,
    tags: ['dsa', 'pseudocode', 'leetcode', 'algorithms', 'structure'],
    difficulty: 'Intermediate',
    useCase: 'Learning & Hints',
    variables: ['{{ALGORITHM_OBJECTIVE}}'],
    expectedOutput: 'Structured language-agnostic pseudocode + invariant annotations + complexity proof'
  },
  {
    id: 'dsa-no-spoiler-level5',
    title: 'DSA Master: Level 5 Production-Grade Solution & Proof',
    category: 'DSA & Interview',
    subcategory: 'No-Spoiler Mentorship',
    description: 'Generates the optimal, production-ready implementation in your preferred language with line-by-line comments and proof of correctness.',
    prompt: `Act as a Principal Competitive Programmer and FAANG Interviewer. Provide the optimal production-grade solution for this problem.

Problem Details:
{{PROBLEM_DETAILS}}

Target Language:
{{PROGRAMMING_LANGUAGE}}

Tasks:
1. Deliver the mathematically optimal solution in {{PROGRAMMING_LANGUAGE}} with clean variable names, const-correctness, and comprehensive comments.
2. Provide formal mathematical proof of correctness (Loop Invariant / Greedy Choice Property / Optimal Substructure).
3. State exact Time Complexity and Auxiliary Space Complexity with derivation.
4. Detail all edge cases handled (e.g. INT_MIN / INT_MAX overflow, empty collections, single items, duplicate elements).
5. Add 3 canonical test cases with dry-run trace table.

Expected Output Format:
1. Optimal Implementation Code
2. Mathematical Correctness Proof
3. Big-O Complexity Breakdown
4. Edge Case Handling Rationale
5. Trace Table Example`,
    tags: ['dsa', 'solution', 'leetcode', 'production-code', 'complexity'],
    difficulty: 'Advanced',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DETAILS}}', '{{PROGRAMMING_LANGUAGE}}'],
    expectedOutput: 'Production-ready optimal code + correctness proof + complexity derivation + dry-run table'
  },

  // Problem Analysis & Strategy
  {
    id: 'dsa-problem-clarification',
    title: 'LeetCode Problem Deconstruction & Clarifying Questions',
    category: 'DSA & Interview',
    subcategory: 'Interview Questions',
    description: 'Analyzes a raw problem statement, generates 5 essential interview clarifying questions, and identifies hidden constraints.',
    prompt: `Act as a FAANG Interview Candidate and Senior Engineer. I am looking at a new algorithm problem statement.

Problem Statement:
{{PROBLEM_STATEMENT}}

Tasks:
1. Summarize the core problem in 2 clear sentences.
2. List 5 high-impact clarifying questions an elite candidate must ask the interviewer before writing code (e.g., input size, mutation rules, space limits, duplicate handling, negative values).
3. Identify the implicit constraints (e.g., what does N <= 10^5 tell us about Big-O?).
4. Provide 3 custom test cases:
   - Typical case
   - Tricky boundary case
   - Maximum scale stress test

Expected Output Format:
1. 2-Sentence Problem Essence
2. 5 Critical Clarifying Questions
3. Constraint Deduction Matrix
4. 3 Curated Edge Cases with Expected Outputs`,
    tags: ['dsa', 'interview-prep', 'clarifying-questions', 'leetcode', 'problem-solving'],
    difficulty: 'Beginner',
    useCase: 'Interview Preparation',
    variables: ['{{PROBLEM_STATEMENT}}'],
    expectedOutput: 'Problem summary + 5 clarifying interview questions + constraint deduction + edge cases'
  },
  {
    id: 'dsa-brute-to-optimal',
    title: 'Brute Force to Optimal Algorithm Evolution',
    category: 'DSA & Interview',
    subcategory: 'Complexity Analysis',
    description: 'Takes a naive O(N^2) or O(2^N) brute-force solution and systematically evolves it into an optimal O(N) or O(N log N) solution.',
    prompt: `Act as a Computer Science Professor and Algorithms Specialist. Analyze my brute-force solution and walk through the systematic transformation into an optimal solution.

Problem:
{{PROBLEM_DESCRIPTION}}

My Brute-Force Code:
{{BRUTE_FORCE_CODE}}

Tasks:
1. Calculate the exact Time and Space complexity of the brute force solution.
2. Pinpoint the "Redundant Work" or "Repeated Calculation" that brute force performs.
3. Show how caching, precomputation (Prefix Sum), sorting, or auxiliary data structures eliminate the redundant work.
4. Step-by-step refactoring:
   - Step A: Naive approach (O(N^2) or O(2^N))
   - Step B: Intermediate optimization (e.g. O(N log N))
   - Step C: Optimal linear/log-linear approach (O(N))
5. Provide the final optimal code with comparison table.

Expected Output Format:
1. Brute Force Complexity & Flaw
2. Redundant Work Analysis
3. Evolution Steps (A -> B -> C)
4. Final Optimal Code
5. Side-by-Side Complexity Comparison Table`,
    tags: ['dsa', 'optimization', 'brute-force', 'complexity', 'refactoring'],
    difficulty: 'Intermediate',
    useCase: 'Optimization',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{BRUTE_FORCE_CODE}}'],
    expectedOutput: 'Redundant work analysis + evolutionary optimization steps + optimal code + comparison table'
  },
  {
    id: 'dsa-dry-run-tracer',
    title: 'Algorithm Execution Dry Run & State Table Tracer',
    category: 'DSA & Interview',
    subcategory: 'DSA Debugging',
    description: 'Performs an exhaustive step-by-step trace of variables, pointers, and memory state on a specific test input.',
    prompt: `Act as a Precise Execution Engine and DSA Tutor. Dry-run the following algorithm on the provided test case.

Algorithm Code:
{{CODE}}

Test Case Input:
{{TEST_INPUT}}

Tasks:
1. Trace every iteration of loops and recursive calls.
2. Output a Markdown State Table showing:
   - Step / Iteration Number
   - Active Pointer / Index positions
   - Data structure state (Stack / Queue / Array / Hash Map snapshot)
   - Condition evaluations (True / False)
   - Variable modifications
3. Explain why the return value matches or fails the expected output.
4. If an off-by-one or boundary violation happens, pinpoint the exact line and iteration.

Expected Output Format:
1. Markdown Variable Trace Table
2. State Evolution Commentary
3. Final Return Value & Correctness Check`,
    tags: ['dsa', 'dry-run', 'trace', 'debugging', 'pointers'],
    difficulty: 'Easy',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{TEST_INPUT}}'],
    expectedOutput: 'Step-by-step markdown trace table + variable states per iteration + return verification'
  },
  {
    id: 'dsa-debug-wrong-answer',
    title: 'DSA Wrong Answer & Off-By-One Bug Diagnostic',
    category: 'DSA & Interview',
    subcategory: 'DSA Debugging',
    description: 'Diagnoses why a LeetCode submission failed on a specific hidden test case, identifying off-by-one errors and integer overflows.',
    prompt: `Act as a Senior Competitive Programmer. My LeetCode/DSA submission failed on a test case (Wrong Answer or Runtime Error).

Problem Description:
{{PROBLEM_DESCRIPTION}}

My Code:
{{CODE}}

Failing Test Input:
{{FAILING_INPUT}}

Expected Output:
{{EXPECTED_OUTPUT}}

Actual Output:
{{ACTUAL_OUTPUT}}

Tasks:
1. Trace the exact line of code where the state diverges from the expected behavior on this input.
2. Classify the bug category (e.g. Off-by-one boundary, Integer overflow, Unhandled empty state, Stale pointer, Comparator strict-weak ordering violation).
3. Explain WHY the bug triggered specifically on this input.
4. Provide the minimal surgical fix (highlighting before vs after lines).
5. List 2 other corner cases that could have exposed the same vulnerability.

Expected Output Format:
1. Divergence Point & Bug Category
2. Root Cause Mechanics
3. Minimal Code Diff (Before vs After)
4. Corrected Full Code
5. Additional Corner Cases to Guard Against`,
    tags: ['dsa', 'debugging', 'wrong-answer', 'leetcode', 'off-by-one'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{CODE}}', '{{FAILING_INPUT}}', '{{EXPECTED_OUTPUT}}', '{{ACTUAL_OUTPUT}}'],
    expectedOutput: 'Bug classification + divergence point + minimal diff + corrected code + corner cases'
  },
  {
    id: 'dsa-dp-state-formulation',
    title: 'Dynamic Programming State & Recurrence Relation Formulator',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Systematically guides the derivation of DP state representation, recurrence relations, base cases, and space optimization.',
    prompt: `Act as a Dynamic Programming Expert. Help me break down this complex problem into a clean DP recurrence relation.

Problem Description:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Identify whether this problem exhibits Optimal Substructure and Overlapping Subproblems.
2. State Formulation:
   - What does \`dp[i]\` or \`dp[i][j]\` represent in plain English?
   - What are the state dimensions and why are they necessary?
3. Transition / Recurrence Relation:
   - Express the mathematical formula connecting current state to prior states.
   - Explain the choice at each step (e.g. Take vs Skip, Min vs Max).
4. Base Cases:
   - Identify the boundary initialization values (e.g., dp[0] = 0, dp[0][0] = 1).
5. Evaluation Order:
   - Bottom-up topological ordering (iterative loop directions).
6. Space Optimization:
   - Can the 2D DP table be compressed into a 1D rolling array? Show how and specify loop direction (e.g., backward for 0/1 knapsack).
7. Full working code in {{PREFERRED_LANGUAGE}}.

Expected Output Format:
1. DP State Definition
2. Mathematical Recurrence Relation
3. Base Cases & Edge Cases
4. Space-Optimized Implementation
5. Time & Space Complexity`,
    tags: ['dsa', 'dynamic-programming', 'dp', 'algorithms', 'recurrence'],
    difficulty: 'Advanced',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{PREFERRED_LANGUAGE}}'],
    expectedOutput: 'State definition + mathematical recurrence + base cases + space optimization + clean code'
  },
  {
    id: 'dsa-sliding-window-template',
    title: 'Sliding Window Pattern: Fixed vs Dynamic Window Formulator',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Guides the implementation of Fixed-size or Dynamic-size sliding window algorithms with state tracking.',
    prompt: `Act as a FAANG Coding Interviewer. Design a robust Sliding Window solution for the following problem.

Problem Description:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Classify the window type: Fixed-size (length K) vs Dynamic-size (shrink when condition violated / expand to find minimum).
2. Define the Window Invariant: What condition must be maintained inside [left, right]?
3. State Tracking Data Structure: What tracks window state (Hash Map frequency counter, sum integer, Monotonic Deque)?
4. Formulate the loop structure:
   - Expansion step (right pointer loop)
   - Contraction step (while loop condition for left pointer)
   - Answer recording step (record before or after shrinking?)
5. Provide clean, production-ready code with comments highlighting pointer movements.
6. Verify against edge cases (e.g. window size > array length, all duplicate characters, empty array).

Expected Output Format:
1. Window Classification & Invariant
2. Left/Right Pointer Contraction Rules
3. Production Code Implementation
4. Time O(N) & Space O(K) Complexity Derivation`,
    tags: ['dsa', 'sliding-window', 'two-pointers', 'arrays', 'strings'],
    difficulty: 'Intermediate',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DESCRIPTION}}'],
    expectedOutput: 'Window classification + invariant condition + pointer contraction rule + O(N) code'
  },
  {
    id: 'dsa-two-pointers-technique',
    title: 'Two Pointers: Collision vs Parallel Fast/Slow Pattern Guide',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Determines whether opposite-end collision or fast/slow pointer cycle detection is appropriate and produces optimal code.',
    prompt: `Act as an Algorithms Specialist. Formulate the optimal Two Pointers strategy for this problem.

Problem Description:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Categorize the pointer strategy:
   - Converging / Collision pointers (left = 0, right = n-1 moving inward on sorted data).
   - Fast and Slow pointers (Tortoise & Hare for cycle detection or linked list midpoint).
   - Parallel read/write pointers (in-place array deduplication/partitioning).
2. State the invariant condition that guarantees no candidate pairs are missed.
3. Detail how duplicate values are skipped to prevent redundant combinations (e.g. 3Sum pattern).
4. Provide optimal code in {{LANGUAGE}} with defensive checks.
5. Prove why the time complexity is strictly O(N) or O(N log N) if sorting is required.

Expected Output Format:
1. Strategy Categorization & Invariant Proof
2. Duplicate Skipping Logic
3. Optimal Implementation
4. Complexity Analysis`,
    tags: ['dsa', 'two-pointers', 'fast-slow', 'arrays', 'leetcode'],
    difficulty: 'Easy',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{LANGUAGE}}'],
    expectedOutput: 'Pointer strategy categorization + invariant proof + duplicate skip logic + O(N) code'
  },
  {
    id: 'dsa-monotonic-stack-guide',
    title: 'Monotonic Stack & Deque Pattern Formulator',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Solves Next Greater Element, Daily Temperatures, or Histogram problems using monotonic stacks.',
    prompt: `Act as a Competitive Programming Master. Guide me through designing a Monotonic Stack or Monotonic Deque solution for this problem.

Problem Description:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Determine the monotonicity requirement: Monotonically Increasing vs Monotonically Decreasing.
2. Element storage choice: Store raw values or array indices? (Explain why storing indices is almost always superior).
3. Traversal direction: Traverse from left-to-right (0 to n-1) or right-to-left (n-1 down to 0)?
4. Eviction Condition: What is the exact \`while (!stack.empty() && ...)\` comparison that pops elements?
5. What does an element's pop signify (e.g. finding its Next Greater Element or determining rectangle boundary)?
6. Provide clean, well-commented code in {{PREFERRED_LANGUAGE}} with O(N) amortized time proof.

Expected Output Format:
1. Monotonicity Choice (Increasing vs Decreasing)
2. Index vs Value Strategy
3. Eviction Rule & Pop Semantics
4. Complete O(N) Implementation Code
5. Amortized O(1) Per Element Push/Pop Proof`,
    tags: ['dsa', 'monotonic-stack', 'stack', 'queue', 'next-greater-element'],
    difficulty: 'Intermediate',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{PREFERRED_LANGUAGE}}'],
    expectedOutput: 'Monotonicity choice + eviction condition + index strategy + O(N) implementation code'
  },
  {
    id: 'dsa-binary-search-on-answer',
    title: 'Binary Search on Answer (Predicate Monotonicity)',
    category: 'DSA & Interview',
    subcategory: 'Competitive Programming',
    description: 'Identifies problems solvable by binary searching the answer space using a monotonic predicate function (e.g., Koko Eating Bananas, Capacity To Ship Packages).',
    prompt: `Act as a Senior Competitive Programming Coach. Formulate a "Binary Search on Answer" solution for this problem.

Problem Description:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Prove the Monotonicity Condition: Show that if condition F(mid) is feasible, all values >= mid (or <= mid) are also feasible.
2. Define the Search Space:
   - What is \`low\` (minimum possible answer)?
   - What is \`high\` (maximum theoretical answer)?
3. Design the Feasibility Function \`isValid(candidate, ...)\`:
   - What does it calculate?
   - What is its Time Complexity (must be O(N))?
4. Write the Binary Search boundary template:
   - Prevent infinite loops: \`while (low <= high)\` vs \`while (low < high)\`.
   - Middle element overflow protection: \`mid = low + (high - low) / 2\`.
   - Update rules: \`high = mid - 1\` vs \`low = mid + 1\`.
5. Provide complete code in {{LANGUAGE}} with O(N * log(Range)) complexity derivation.

Expected Output Format:
1. Monotonicity Proof
2. Search Bounds (Low, High)
3. Feasibility Function Logic
4. Robust Binary Search Implementation
5. Complexity Proof`,
    tags: ['dsa', 'binary-search', 'binary-search-on-answer', 'predicate', 'competitive-programming'],
    difficulty: 'Advanced',
    useCase: 'Competitive Programming',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{LANGUAGE}}'],
    expectedOutput: 'Monotonicity proof + search bounds + isValid predicate + complete binary search code'
  },
  {
    id: 'dsa-tree-traversal-mastery',
    title: 'Binary Tree & BST: Iterative Traversal & Invariants',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Designs recursion-safe, iterative tree solutions (BFS Level Order, DFS Pre/In/Post Order, LCA, BST Validation).',
    prompt: `Act as an Algorithms Specialist. Formulate the optimal tree traversal or BST validation solution for this problem.

Problem Details:
{{PROBLEM_DETAILS}}

Tasks:
1. Traversal Strategy: Iterative BFS (Queue) vs Iterative DFS (Stack) vs Recursive.
2. For BST problems: Formulate the range invariant \`(min_val < node.val < max_val)\` to prevent false positives with local checks.
3. Base Cases & Null Pointers: Guarantee zero segmentation faults or null reference errors on empty trees or single leaves.
4. If BFS level-order: How is the level boundary maintained (e.g. \`int levelSize = queue.size()\` snapshot)?
5. Provide production code in {{LANGUAGE}} with Time O(N) and Auxiliary Space O(H) (height of tree).

Expected Output Format:
1. Strategy Rationale & Invariant
2. Stack/Queue State Lifecycle
3. Complete Implementation Code
4. Edge Case Validation (Skewed Tree, Empty Root)`,
    tags: ['dsa', 'trees', 'bst', 'bfs', 'dfs', 'level-order'],
    difficulty: 'Intermediate',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DETAILS}}', '{{LANGUAGE}}'],
    expectedOutput: 'Traversal strategy + BST range invariants + iterative queue/stack code + complexity'
  },
  {
    id: 'dsa-graph-bfs-dfs-dijkstra',
    title: 'Graph Traversal & Shortest Path: BFS, DFS, TopoSort, Dijkstra',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Selects the right graph algorithm (BFS for unweighted, Dijkstra for weighted, Kahn for DAG cycle/topo, DFS for components).',
    prompt: `Act as a Graph Theory and Algorithms Specialist. Formulate the optimal graph solution for the following problem.

Problem Statement & Graph Type:
{{PROBLEM_STATEMENT}}

Tasks:
1. Graph Modeling:
   - Directed vs Undirected, Weighted vs Unweighted, Cyclic vs DAG.
   - Adjacency List representation structure.
2. Algorithm Selection & Justification:
   - Unweighted shortest path -> BFS O(V + E)
   - Weighted non-negative shortest path -> Dijkstra with Min-Heap O((V + E) log V)
   - Dependency ordering / cycle detection -> Kahn's In-Degree BFS or DFS coloring
   - Connected components / islands -> DFS / BFS / Disjoint Set Union (Union-Find)
3. Visited state management: Avoid infinite cycles in cyclic graphs.
4. Provide complete, clean implementation in {{LANGUAGE}}.
5. Trace on a disconnected or cyclic edge case.

Expected Output Format:
1. Graph Classification & Adjacency Representation
2. Algorithm Selection Justification
3. Complete Implementation Code
4. Visited / Cycle Detection Mechanics
5. Time O(V + E) & Space O(V + E) Proof`,
    tags: ['dsa', 'graphs', 'bfs', 'dfs', 'dijkstra', 'topological-sort'],
    difficulty: 'Advanced',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_STATEMENT}}', '{{LANGUAGE}}'],
    expectedOutput: 'Graph classification + algorithm justification + adjacency list code + cycle handling'
  },
  {
    id: 'dsa-backtracking-template',
    title: 'Backtracking & Pruning Template: Subsets, Permutations & Combinations',
    category: 'DSA & Interview',
    subcategory: 'DSA Practice',
    description: 'Systematic backtracking framework with decision trees, state rollbacks, and branch pruning for subsets and permutations.',
    prompt: `Act as a Senior Algorithms Tutor. Formulate a structured Backtracking solution with optimal branch pruning for this problem.

Problem Description:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Visualize the Decision Tree:
   - What represents a Decision at depth D?
   - What are the Choices available at this node?
   - What are the Constraints / Pruning conditions that allow discarding an entire branch early?
2. Backtracking Template Application:
   - Choose: Modify path state.
   - Explore: Recursive call to depth + 1.
   - Unchoose: Rollback state (pop from path / restore boolean visited flag).
3. Deduplication Strategy: If input has duplicates, how do we sort and skip identical elements at the same tree depth?
4. Base Case: When is a valid combination added to the global result?
5. Complete, well-structured code in {{LANGUAGE}} with complexity derivation.

Expected Output Format:
1. Decision Tree & Choice Space
2. Pruning Condition Formulation
3. Deduplication Invariant
4. Complete Backtracking Implementation Code
5. State Rollback Walkthrough`,
    tags: ['dsa', 'backtracking', 'recursion', 'pruning', 'permutations', 'subsets'],
    difficulty: 'Intermediate',
    useCase: 'DSA Practice',
    variables: ['{{PROBLEM_DESCRIPTION}}', '{{LANGUAGE}}'],
    expectedOutput: 'Decision tree analysis + pruning rules + deduplication skip + complete backtracking code'
  },
  {
    id: 'dsa-mock-technical-interview',
    title: 'FAANG Mock Coding Interviewer Simulation',
    category: 'DSA & Interview',
    subcategory: 'Interview Questions',
    description: 'Simulates a real 45-minute FAANG technical interview: presents problem, probes thought process, gives hints, and evaluates communication.',
    prompt: `Act as a Staff Software Engineer at Google conducting a 45-minute technical coding interview.

Problem for Today's Session:
{{PROBLEM_NAME_OR_TOPIC}}

Rules of Engagement:
1. Start by presenting the problem statement clearly with input constraints and a small example.
2. Ask me how I plan to approach the problem before writing any code. Wait for my response.
3. When I share my approach:
   - If it's brute-force, validate it and politely ask: "Can we do better in time or space?"
   - If I'm stuck, provide a subtle Level 1 concept hint.
   - Do NOT write the code for me.
4. When I provide code:
   - Review my code for readability, edge cases, and off-by-one errors.
   - Ask me to walk through a test case manually.
   - Ask me to state and prove the Time and Space complexity.
5. Conclude with a constructive scoring rubric:
   - Problem Solving & Intuition (1-5)
   - Code Quality & Cleanliness (1-5)
   - Communication & Thought Process (1-5)
   - Verification & Edge Cases (1-5)

Begin now by welcoming me to the interview and presenting the problem.`,
    tags: ['mock-interview', 'faang', 'google', 'interview-prep', 'dsa', 'coding-interview'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{PROBLEM_NAME_OR_TOPIC}}'],
    expectedOutput: 'Interactive interview simulation: problem presentation + probing questions + scoring rubric'
  }
];
