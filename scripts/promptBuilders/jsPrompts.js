/**
 * JavaScript Prompts Collection (15 Prompts)
 * Covers Event Loop, Async/Await, Closures, this binding, Memory Leaks, DOM, ES6+, and Architecture.
 */
module.exports = [
  {
    id: 'js-event-loop-analyzer',
    title: 'JavaScript Event Loop & Microtask/Macrotask Execution Order',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Explains the exact execution order between Call Stack, Promise microtasks, queueMicrotask, setTimeout, and requestAnimationFrame.',
    prompt: `Act as a V8 JavaScript Engine Specialist and Senior Web Architect. Analyze the following code snippet and explain the exact runtime execution sequence.

Code Snippet:
{{CODE}}

Tasks:
1. Predict the exact console output order with zero ambiguity.
2. Step-by-step breakdown:
   - Call Stack synchronous execution.
   - Microtask Queue (Promises, queueMicrotask, MutationObserver).
   - Task/Macrotask Queue (setTimeout, setInterval, setImmediate, I/O).
   - Render / Animation frame timing (requestAnimationFrame).
3. Explain WHY microtasks are prioritized over macrotasks after the call stack clears.
4. Highlight any potential starvation risks (e.g. infinite microtask recursion blocking the UI).

Expected Output Format:
1. Exact Console Output Sequence
2. Step-by-Step Call Stack & Queue Trace
3. V8 Event Loop Mechanics Explanation
4. Common Misconceptions & Gotchas`,
    tags: ['javascript', 'event-loop', 'microtasks', 'macrotasks', 'v8', 'async'],
    difficulty: 'Intermediate',
    useCase: 'Learning & Explanation',
    variables: ['{{CODE}}'],
    expectedOutput: 'Exact output sequence + queue trace table + V8 event loop mechanics explanation'
  },
  {
    id: 'js-async-await-race-condition',
    title: 'Async/Await Race Condition & Stale Response Elimination',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Eliminates out-of-order API response bugs where slower early requests overwrite newer user requests.',
    prompt: `Act as a Staff Frontend Engineer. I have an asynchronous function where rapid user triggers cause race conditions (e.g. searching, tab switching, or filtering).

Problematic Code:
{{CODE}}

Symptoms / Bug:
{{BUG_SYMPTOM}}

Tasks:
1. Diagnose why out-of-order network responses overwrite newer user state.
2. Provide 3 distinct production solutions:
   - Solution A: AbortController cancellation of previous in-flight requests.
   - Solution B: Monotonically increasing request ID / sequence counter check.
   - Solution C: Debounced trigger with cancellation.
3. Compare the trade-offs of all 3 approaches (network bandwidth vs UI complexity).
4. Provide the complete refactored implementation using the best approach for this scenario.

Expected Output Format:
1. Race Condition Root Cause Trace
2. 3 Solution Patterns Comparison
3. Refactored Production Code
4. Automated Test Case Simulating Out-of-Order Responses`,
    tags: ['javascript', 'async', 'race-condition', 'abort-controller', 'promises'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{BUG_SYMPTOM}}'],
    expectedOutput: 'Race condition diagnostic + 3 solution patterns + production code + test simulation'
  },
  {
    id: 'js-memory-leak-detector',
    title: 'JavaScript Memory Leak & Retained Object Analyzer',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Pinpoints memory leaks caused by lingering event listeners, detached DOM nodes, closures holding parent scopes, and global caches.',
    prompt: `Act as a Senior Chrome DevTools & Memory Profiling Expert. Analyze the following JavaScript code for memory leaks and uncontrolled heap growth.

Suspect Code / Component:
{{CODE}}

Observed Behavior:
{{MEMORY_GROWTH_SYMPTOM}}

Tasks:
1. Identify all retained object paths preventing Garbage Collection:
   - Forgotten event listeners / observers (ResizeObserver, MutationObserver).
   - Accidental global variables.
   - Closures enclosing large parent scope references.
   - Detached DOM elements kept in JavaScript array/object references.
   - Uncleared intervals and timeouts.
2. Explain the V8 Garbage Collector (Mark & Sweep / Orinoco) mechanics causing the leak.
3. Rewrite the code with explicit cleanup lifecycles, WeakMap/WeakSet where applicable, and teardown routines.
4. Provide step-by-step Chrome DevTools Memory Heap Snapshot inspection steps to verify the fix.

Expected Output Format:
1. Leaking Reference Identification
2. V8 Retainer Tree Analysis
3. Remediated Code with Teardown Hooks
4. Heap Snapshot Verification Guide`,
    tags: ['javascript', 'memory-leak', 'garbage-collection', 'performance', 'devtools'],
    difficulty: 'Advanced',
    useCase: 'Performance Optimization',
    variables: ['{{CODE}}', '{{MEMORY_GROWTH_SYMPTOM}}'],
    expectedOutput: 'Retained path analysis + GC mechanics + remediated code + heap snapshot verification'
  },
  {
    id: 'js-closures-stale-state',
    title: 'Closures, Lexical Scope & Stale State Diagnostic',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Diagnoses why asynchronous callbacks or event handlers capture old variable snapshots instead of live state.',
    prompt: `Act as a JavaScript Core Architect. I am encountering a stale closure bug where my callback references obsolete data.

Code:
{{CODE}}

Current Behavior vs Expected:
{{BEHAVIOR}}

Tasks:
1. Explain the lexical scope and closure creation mechanics at the exact moment the function was instantiated.
2. Why is the captured variable frozen in time despite subsequent updates in the outer scope?
3. Provide the idiomatic solution:
   - For Vanilla JS: Using mutable ref wrappers or parameter passing.
   - For React (if applicable): Using useRef or functional state updater (prev => ...).
4. Provide the corrected code with before-and-after comparison.
5. Create a minimal reproduction illustrating the fix.

Expected Output Format:
1. Lexical Scope Breakdown
2. Stale Closure Root Cause
3. Before vs After Code Comparison
4. Production-Ready Fix`,
    tags: ['javascript', 'closures', 'lexical-scope', 'stale-state', 'react'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{BEHAVIOR}}'],
    expectedOutput: 'Lexical scope analysis + stale closure root cause + before/after code + production fix'
  },
  {
    id: 'js-this-binding-context',
    title: '`this` Binding Context & Arrow Function Mechanics',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Resolves unexpected `undefined` or global window `this` bindings across class methods, callbacks, and DOM listeners.',
    prompt: `Act as a JavaScript Language Specialist. Diagnose and fix the broken \`this\` context binding in the following code.

Code:
{{CODE}}

Error / Symptom:
{{ERROR_SYMPTOM}}

Tasks:
1. Trace the 4 rules of JavaScript \`this\` binding (Default, Implicit, Explicit call/apply/bind, and new keyword) on this code.
2. Explain why the execution context lost its receiver (e.g. passing method as callback detaches receiver).
3. Compare 3 ways to fix it:
   - Explicit \`.bind(this)\` in constructor.
   - Class field arrow functions (lexical \`this\`).
   - Wrapping call in inline arrow function.
4. Explain performance and memory implications of arrow methods on prototypes vs instance properties.
5. Provide the recommended corrected implementation.

Expected Output Format:
1. Context Loss Diagnosis
2. 4-Rule Binding Evaluation
3. Prototype vs Instance Trade-offs
4. Corrected Implementation Code`,
    tags: ['javascript', 'this-binding', 'arrow-functions', 'context', 'oop'],
    difficulty: 'Easy',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{ERROR_SYMPTOM}}'],
    expectedOutput: 'Context loss diagnostic + 4-rule evaluation + prototype trade-offs + corrected code'
  },
  {
    id: 'js-prototype-inheritance-classes',
    title: 'Prototypes, Prototype Chain & ES6 Class Transpilation',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Explains prototype delegation, __proto__, Object.create, and what ES6 `class`, `super`, and `extends` do under the hood.',
    prompt: `Act as an ECMAScript Standards Committee Contributor. Explain the prototypal inheritance model and resolve the prototype bug in this code.

Code:
{{CODE}}

Objective:
{{OBJECTIVE}}

Tasks:
1. Diagram the Prototype Chain for the given objects/classes up to Object.prototype.
2. Explain property lookup delegation: what happens when a property is read vs written.
3. Compare ES6 \`class\` syntax with classical functional prototypes:
   - What does \`extends\` and \`super()\` compile into in ES5?
   - How does \`Object.setPrototypeOf\` or \`Object.create\` establish the chain?
4. Fix any broken prototype linkages, constructor shadowing, or shared reference mutations.
5. Provide clean, modern code implementing the desired inheritance model.

Expected Output Format:
1. ASCII Prototype Chain Diagram
2. Delegation Lookup Trace
3. Corrected Modern Implementation
4. ES5 Transpilation Insight`,
    tags: ['javascript', 'prototypes', 'inheritance', 'classes', 'es6'],
    difficulty: 'Intermediate',
    useCase: 'Learning & Explanation',
    variables: ['{{CODE}}', '{{OBJECTIVE}}'],
    expectedOutput: 'Prototype chain diagram + lookup delegation mechanics + corrected code + transpilation notes'
  },
  {
    id: 'js-event-delegation-bugs',
    title: 'DOM Event Delegation with closest() & Dynamic Elements',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Fixes event delegation issues where clicking nested SVGs or child spans inside dynamic buttons fails matching logic.',
    prompt: `Act as a Senior Frontend DOM Engineer. Fix the broken event delegation implementation in this code.

DOM Structure & Event Handler:
{{CODE}}

Failing Interaction:
{{FAILING_INTERACTION}}

Tasks:
1. Explain Event Bubbling and Capturing phases.
2. Diagnose why \`event.target.matches()\` or \`event.target.id\` fails when clicking inner text, spans, or SVGs inside the button.
3. Rewrite the handler using \`event.target.closest(selector)\` with container boundary checks (\`container.contains()\`).
4. Ensure dynamic elements added asynchronously via fetch are handled seamlessly without re-attaching listeners.
5. Provide complete, bulletproof vanilla JavaScript code.

Expected Output Format:
1. Bubbling & Target Mismatch Diagnostic
2. Idiomatic \`closest()\` Pattern Implementation
3. Edge Case Handling (Clicks on borders, nested icons)
4. Full Executable Script`,
    tags: ['javascript', 'dom', 'event-delegation', 'closest', 'events'],
    difficulty: 'Easy',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{FAILING_INTERACTION}}'],
    expectedOutput: 'Target mismatch diagnostic + closest() pattern code + edge cases + full script'
  },
  {
    id: 'js-fetch-abort-timeout-retry',
    title: 'Resilient Fetch API: AbortController, Timeout & Exponential Backoff',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Builds an enterprise-ready HTTP wrapper with automated timeout cancellation, exponential backoff jitter, and HTTP error parsing.',
    prompt: `Act as a Principal Web Architect. Build a bulletproof, production-grade HTTP client wrapper around the native \`fetch\` API.

Requirements & Needs:
{{REQUIREMENTS}}

Tasks:
1. Build \`async function fetchClient(url, options = {}, timeoutMs = 8000, maxRetries = 3)\`.
2. Features to implement:
   - Configurable timeout using native \`AbortController\` (must cancel pending TCP socket).
   - Retry logic with Exponential Backoff + Jitter for 5xx server errors and network drops (never retry 4xx user errors).
   - Automatic HTTP error throwing for non-ok status codes (\`!response.ok\`) with parsed error body.
   - Clean up timeouts in \`finally\` blocks to prevent memory leaks in Node/browsers.
   - Support for custom request cancellation from the outside caller.
3. Provide unit tests with mocked \`fetch\` verifying: timeout trigger, retry succession, and 400 rejection.

Expected Output Format:
1. Production HTTP Client Code
2. TypeScript Type Definitions
3. Exponential Backoff Formula Explanation
4. Mock Unit Tests`,
    tags: ['javascript', 'fetch', 'abort-controller', 'retry', 'exponential-backoff', 'http'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{REQUIREMENTS}}'],
    expectedOutput: 'Production fetch wrapper + AbortController timeout + exponential backoff + test suite'
  },
  {
    id: 'js-promise-concurrency-all-settled',
    title: 'Promise Concurrency: Promise.all vs allSettled vs Bottleneck Pool',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Architects parallel async batching: prevents fast-fail cascade with allSettled and implements a concurrency-limited worker pool.',
    prompt: `Act as a Senior Performance Engineer. We need to process a large batch of asynchronous operations concurrently without crashing the server or exhausting browser connection limits.

Task List / API Operation:
{{OPERATIONS_DESCRIPTION}}

Tasks:
1. Explain why \`Promise.all()\` is dangerous for batch jobs with potential single-point failures (fast-fail behavior).
2. Compare \`Promise.all()\` vs \`Promise.allSettled()\` with typed results filtering (\`fulfilled\` vs \`rejected\`).
3. Build a Concurrency-Limited Batch Pool:
   - Takes array of tasks and concurrency limit \`limit\` (e.g. 5 concurrent requests at a time).
   - Dynamically pulls the next task as soon as any active task finishes.
   - Returns all results in original input order.
4. Add rate-limit delay / throttle between batches.
5. Provide complete, dependency-free JavaScript code.

Expected Output Format:
1. Failure Modes Analysis
2. Concurrency Pool Implementation (\`pLimit\` equivalent without external dependencies)
3. Usage Example Processing 100 Tasks with Concurrency of 5
4. Error Handling & Partial Success Aggregation`,
    tags: ['javascript', 'promises', 'concurrency', 'promise-all', 'rate-limiting'],
    difficulty: 'Advanced',
    useCase: 'Performance Optimization',
    variables: ['{{OPERATIONS_DESCRIPTION}}'],
    expectedOutput: 'Failure modes audit + dependency-free concurrency pool code + usage example + error aggregation'
  },
  {
    id: 'js-object-destructuring-transforms',
    title: 'Modern ES6+ Object Transformations, Destructuring & Invariants',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Mastery over nested destructuring with fallback defaults, property renaming, Object.fromEntries, and immutable state updates.',
    prompt: `Act as a JavaScript Functional Programming Specialist. Transform and normalize the following complex nested data structure cleanly without mutations.

Input Data Structure:
{{INPUT_DATA}}

Desired Output Target:
{{DESIRED_TARGET}}

Tasks:
1. Write an idiomatic transformation pipeline using modern ES6+:
   - Nested destructuring with aliases and fallback defaults.
   - Rest/Spread operations (\`...rest\`) for shallow copies.
   - \`Object.entries()\` and \`Object.fromEntries()\` for dictionary filtering/mapping.
2. Ensure 100% immutability: original inputs must never be modified.
3. Handle missing, null, or undefined keys gracefully without throwing \`TypeError: Cannot read properties of undefined\`.
4. Provide clean, readable code and explain each transformation step.

Expected Output Format:
1. Transformation Function Implementation
2. Step-by-Step Pipeline Explanation
3. Edge Case Handling (Null inputs, empty objects)
4. Verification Test Assertion`,
    tags: ['javascript', 'destructuring', 'objects', 'immutability', 'functional-programming'],
    difficulty: 'Easy',
    useCase: 'Code Refactoring',
    variables: ['{{INPUT_DATA}}', '{{DESIRED_TARGET}}'],
    expectedOutput: 'Transformation pipeline + immutability guarantee + null safety + verification assertions'
  },
  {
    id: 'js-functional-array-pipelines',
    title: 'Functional Array Pipelines: map, filter, reduce Optimization',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Refactors chained multi-pass array iterations into clean, high-performance single-pass reductions or transducers.',
    prompt: `Act as a High-Performance JavaScript Engineer. Optimize the following array manipulation pipeline.

Current Pipeline Code:
{{CODE}}

Data Volume:
{{DATA_VOLUME}}

Tasks:
1. Analyze the performance cost of multiple intermediate arrays created by chaining \`.filter().map().filter().reduce()\`.
2. Rewrite into an optimal single-pass reduction (\`reduce\`) or composed loop that visits each item exactly once.
3. Compare readability vs memory allocation overhead for large datasets (100k+ records).
4. Preserve pure functional determinism without global side effects.
5. Provide benchmark metrics comparison.

Expected Output Format:
1. Intermediate Allocation Audit
2. Optimized Single-Pass Implementation
3. Readability vs Performance Trade-Off Breakdown
4. Benchmarking Snippet (performance.now())`,
    tags: ['javascript', 'arrays', 'map', 'filter', 'reduce', 'performance'],
    difficulty: 'Intermediate',
    useCase: 'Performance Optimization',
    variables: ['{{CODE}}', '{{DATA_VOLUME}}'],
    expectedOutput: 'Intermediate allocation analysis + single-pass reduce code + trade-off breakdown + benchmark'
  },
  {
    id: 'js-dom-layout-thrashing-reflow',
    title: 'DOM Reflow, Repaint & Layout Thrashing Elimination',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Eliminates 60fps frame drops and layout thrashing caused by interleaved DOM reads (offsetHeight) and writes (style.top).',
    prompt: `Act as a Web Performance Guru. Diagnose and eliminate layout thrashing in this animation / DOM update script.

Script:
{{CODE}}

Tasks:
1. Identify the Interleaved DOM Reads & Writes (Forced Synchronous Layout):
   - Highlight properties that invalidate layout (e.g. \`offsetWidth\`, \`scrollTop\`, \`getBoundingClientRect\`).
2. Explain what the browser render pipeline (Recalculate Style -> Layout -> Paint -> Composite) does on each read/write cycle.
3. Refactor the code using:
   - Batching Reads first, then Batching Writes.
   - \`requestAnimationFrame\` (rAF) scheduling.
   - \`DocumentFragment\` or CSS transforms (transform: translate3d) for GPU-accelerated compositing.
4. Show before-and-after Performance Timeline traces.

Expected Output Format:
1. Forced Layout Thrashing Points
2. Browser Rendering Engine Breakdown
3. Refactored GPU-Accelerated Implementation
4. FPS & Performance Verification`,
    tags: ['javascript', 'dom', 'performance', 'layout-thrashing', 'reflow', 'animation'],
    difficulty: 'Advanced',
    useCase: 'Performance Optimization',
    variables: ['{{CODE}}'],
    expectedOutput: 'Layout thrashing points + browser pipeline mechanics + refactored rAF code + FPS verification'
  },
  {
    id: 'js-deep-clone-circular',
    title: 'Deep Clone with Circular Reference & Special Type Handling',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Builds a robust deep-clone utility handling nested structures, circular loops, Dates, RegExps, Sets, and Maps.',
    prompt: `Act as a Senior JavaScript Algorithms Engineer. Build a robust deep clone utility.

Requirements & Edge Cases:
{{EDGE_CASES}}

Tasks:
1. Explain why \`JSON.parse(JSON.stringify(obj))\` fails catastrophically on Dates, undefined, functions, BigInts, NaN, and Circular References.
2. Evaluate modern \`structuredClone()\`: What are its capabilities, browser support, and remaining limitations?
3. Implement a fallback \`deepClone(value, hash = new WeakMap())\` that handles:
   - Primitives and null/undefined.
   - Circular references using \`WeakMap\` caching.
   - Special objects: Date, RegExp, Map, Set.
   - Prototype and own enumerable property preservation.
4. Provide comprehensive unit tests proving circular references do not cause infinite recursion stack overflow.

Expected Output Format:
1. JSON Serialization Flaws Table
2. structuredClone Assessment
3. Bulletproof deepClone Implementation
4. Circular Reference Test Cases`,
    tags: ['javascript', 'deep-clone', 'circular-reference', 'weakmap', 'structured-clone'],
    difficulty: 'Intermediate',
    useCase: 'Code Refactoring',
    variables: ['{{EDGE_CASES}}'],
    expectedOutput: 'JSON flaws comparison + structuredClone audit + WeakMap deepClone code + circular tests'
  },
  {
    id: 'js-web-worker-cpu-offload',
    title: 'Web Workers: Offloading Heavy Computations from UI Thread',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Keeps the browser UI responsive at 60fps by offloading heavy data processing or cryptography to a dedicated Web Worker thread.',
    prompt: `Act as a High-Performance Frontend Architect. Offload the following CPU-intensive task to a Web Worker to prevent UI thread freezing.

Heavy Computation Function:
{{HEAVY_FUNCTION}}

Tasks:
1. Explain why JavaScript is single-threaded on the main execution thread and how long tasks (>50ms) trigger "Page Unresponsive" warnings.
2. Implement a complete Web Worker solution:
   - Main thread controller (spawning worker, sending payload via \`postMessage\`, listening to \`onmessage\`, error handling).
   - Worker script (listening to \`onmessage\`, processing data in background, transferring results).
   - Support for Transferable Objects (ArrayBuffer) to avoid structured clone serialization overhead.
   - Promise wrapper: Expose an async function \`runWorkerTask(payload): Promise<Result>\`.
3. Worker termination & lifecycle cleanup on component unmount.

Expected Output Format:
1. Main Thread vs Worker Architecture
2. Web Worker Script Code (worker.js)
3. Main Thread Promise Client Wrapper
4. Transferable Objects Performance Note`,
    tags: ['javascript', 'web-workers', 'multithreading', 'performance', 'ui-thread'],
    difficulty: 'Advanced',
    useCase: 'Performance Optimization',
    variables: ['{{HEAVY_FUNCTION}}'],
    expectedOutput: 'Worker architecture + worker script + main thread client wrapper + transferable objects pattern'
  },
  {
    id: 'js-clean-architecture-modules',
    title: 'Clean JavaScript Architecture: Decoupled Modules & Dependency Injection',
    category: 'Development',
    subcategory: 'JavaScript',
    description: 'Refactors messy spaghetti JavaScript code into clean layers (API, Repository, Service, UI Controller) with Dependency Injection.',
    prompt: `Act as a Principal Software Architect. Refactor this unstructured JavaScript file into a clean, modular architecture.

Current Spaghetti Code:
{{CODE}}

Tasks:
1. Separate concerns into clean architectural layers:
   - Data / API Layer (fetching, serialization).
   - Domain / Service Layer (pure business rules, validation).
   - Presentation / Controller Layer (DOM event listeners, UI rendering).
2. Implement Dependency Injection (pass API client to service, pass service to controller) for 100% testability.
3. Remove all global state and magic strings.
4. Provide the refactored ES Modules structure with export/import conventions.
5. Provide a unit test demonstrating how to test the service layer with a mocked API layer.

Expected Output Format:
1. Architectural Separation Plan
2. Refactored Modular Code
3. Dependency Injection Pattern Demonstration
4. Unit Test with Mocked Dependencies`,
    tags: ['javascript', 'clean-code', 'architecture', 'dependency-injection', 'modular'],
    difficulty: 'Intermediate',
    useCase: 'Code Refactoring',
    variables: ['{{CODE}}'],
    expectedOutput: 'Layered architecture plan + refactored modular code + DI pattern + mocked unit test'
  }
];
