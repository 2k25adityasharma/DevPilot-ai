/**
 * Debugging Prompts Collection (11 Prompts)
 * Covers Runtime Errors, Stack Traces, Async Bugs, Database Locks, 500 Triage, CORS, Docker Crashes, and CSS Breaks.
 */
module.exports = [
  {
    id: 'debug-stack-trace-rca',
    title: 'Runtime Error & Stack Trace Root Cause Analysis (RCA)',
    category: 'Engineering',
    subcategory: 'Production Debugging',
    description: 'Deconstructs cryptic runtime error stack traces, unmasks minified source maps, and provides a defensive fix.',
    prompt: `Act as a Production Incident Commander and Senior Debugging Specialist. Perform a rigorous Root Cause Analysis (RCA) on this runtime error.

Stack Trace & Error Message:
{{STACK_TRACE}}

Associated Source Code:
{{CODE}}

Tasks:
1. Deconstruct the stack trace frame-by-frame:
   - Identify the exact origin line of the error.
   - Separate user code frames from third-party / node internal frames.
2. Root Cause: Explain the underlying mechanism that threw the exception (e.g. TypeError, null dereference, unhandled edge case).
3. Evidence & Reproduction: Provide the exact input or state condition that triggered the failure.
4. Minimal Surgical Fix: Provide the cleanest defensive fix without side effects.
5. Regression Risk & Test Case: Add a unit test reproducing the exact stack trace condition and verifying the fix.

Expected Output Format:
1. Root Cause Summary (50 words)
2. Stack Trace Frame Walkthrough
3. Corrective Code Diff (Before vs After)
4. Reproduction Unit Test Case
5. Defensive Invariant to Prevent Similar Bugs`,
    tags: ['debugging', 'stack-trace', 'rca', 'error-handling', 'production-debugging', 'troubleshooting'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{STACK_TRACE}}', '{{CODE}}'],
    expectedOutput: 'RCA summary + frame walkthrough + corrective code diff + unit test + defensive invariant'
  },
  {
    id: 'debug-async-unhandled-rejections',
    title: 'Async Unhandled Promise Rejection & Hanging Request Triage',
    category: 'Engineering',
    subcategory: 'Production Debugging',
    description: 'Diagnoses missing catch blocks, hanging un-resolved promises, and unhandled promise rejections that crash Node.js.',
    prompt: `Act as a Node.js Core and Async Diagnostics Engineer. Resolve this unhandled promise rejection or hanging asynchronous operation.

Code & Async Flow:
{{CODE}}

Error Log or Observed Hang:
{{ERROR_LOG}}

Tasks:
1. Trace the promise chain or async/await lifecycle:
   - Why was the rejection not caught by local try/catch blocks? (e.g. Fire-and-forget promise, event emitter callback, un-awaited async function).
   - If hanging: Why did the promise never settle? (Missing resolve/reject branch, un-acknowledged stream).
2. Explain how unhandled rejections trigger \`process.on('unhandledRejection')\` and why they terminate modern Node.js processes.
3. Rewrite the code using proper error boundaries, \`Promise.allSettled\`, or async error middleware.
4. Add global process-level crash safety handlers.

Expected Output Format:
1. Unhandled Rejection Mechanics Breakdown
2. Corrected Asynchronous Code
3. Process-Level Unhandled Rejection Safety Guard
4. Reproduction & Verification Test`,
    tags: ['debugging', 'async', 'promises', 'unhandled-rejection', 'nodejs', 'reliability'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{ERROR_LOG}}'],
    expectedOutput: 'Rejection mechanics breakdown + corrected async code + process safety guard + test case'
  },
  {
    id: 'debug-memory-leak-heap-snapshot',
    title: 'Heap Snapshot Memory Leak & Retained Size Investigator',
    category: 'Engineering',
    subcategory: 'Performance Optimization',
    description: 'Analyzes Chrome DevTools / Node.js heap snapshot comparisons, identifies retainer trees, and resolves runaway memory growth.',
    prompt: `Act as a V8 Garbage Collection and Memory Leak Specialist. Investigate this memory leak based on heap snapshot metrics.

Heap Snapshot Metrics / Profiler Findings:
{{HEAP_METRICS}}

Suspect Source Code:
{{CODE}}

Tasks:
1. Understand the Metrics:
   - Difference between Shallow Size (memory allocated to object itself) and Retained Size (memory freed if object is garbage collected).
   - Identify the "Distance" from GC Root.
2. Retainer Tree Analysis:
   - What root object is holding the reference? (Global window, closure context, active timer, detached DOM node).
3. Fix the Leak:
   - Nullify dangling references.
   - Clean up event listeners in teardown lifecycles.
   - Use \`WeakMap\` or \`WeakRef\` for caching.
4. Provide the before-and-after code and explain the GC reclamation proof.

Expected Output Format:
1. Retainer Tree Root Cause Diagram
2. Shallow vs Retained Size Explanation
3. Remediated Source Code
4. Chrome DevTools Heap Verification Procedure`,
    tags: ['debugging', 'memory-leak', 'heap-snapshot', 'v8', 'garbage-collection', 'performance'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{HEAP_METRICS}}', '{{CODE}}'],
    expectedOutput: 'Retainer tree diagram + shallow vs retained explanation + remediated code + heap verification steps'
  },
  {
    id: 'debug-database-lock-timeout',
    title: 'Database Lock Contention & Lock Wait Timeout Triage',
    category: 'Database',
    subcategory: 'Query Optimization',
    description: 'Diagnoses database lock wait timeouts (Error 1205 / 55P03), identifies blocking queries via pg_stat_activity, and resolves lock queues.',
    prompt: `Act as a Senior Database Administrator and PostgreSQL / MySQL Incident Responder. Triage this database lock timeout crisis in production.

Database Lock Alert / Error:
{{LOCK_ERROR}}

Active Queries / pg_stat_activity Output:
{{ACTIVE_QUERIES}}

Tasks:
1. Emergency Triage (P0 Incident):
   - Query to identify the blocking PID (Root Blocker) vs the blocked victim PIDs.
   - Safe command to terminate or cancel the blocking query (\`pg_cancel_backend\` vs \`pg_terminate_backend\`).
2. Root Cause Analysis:
   - Why did the query hold an exclusive lock for so long? (Long transaction doing network I/O, full table scan inside transaction, unindexed foreign key).
3. Architectural Prevention:
   - Lowering \`lock_timeout\` and \`idle_in_transaction_session_timeout\`.
   - Splitting large batch updates into chunks.
   - Using \`NOWAIT\` or \`SKIP LOCKED\` where appropriate.
4. Provide the complete SQL diagnostic scripts and application code fixes.

Expected Output Format:
1. Emergency Blocker Identification Query
2. Incident Triage Steps (Safe termination)
3. Architectural Root Cause & Prevention Rules
4. Application Transaction Code Fix`,
    tags: ['debugging', 'database', 'postgres', 'mysql', 'locks', 'incident-response'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{LOCK_ERROR}}', '{{ACTIVE_QUERIES}}'],
    expectedOutput: 'Blocker query + emergency termination command + root cause prevention + app transaction fix'
  },
  {
    id: 'debug-react-infinite-loop-render',
    title: 'React Infinite Loop: "Maximum Update Depth Exceeded" Triage',
    category: 'Development',
    subcategory: 'React',
    description: 'Diagnoses and fixes the classic React error "Maximum update depth exceeded" triggered by unconditional state updates during render.',
    prompt: `Act as a React Internals Specialist. Fix this critical React infinite render loop.

React Error & Stack Trace:
{{ERROR_MESSAGE}}

Component Code:
{{CODE}}

Tasks:
1. Pinpoint the trigger:
   - State setter invoked unconditionally during render: \`onClick={handleClick()}\` instead of \`onClick={() => handleClick()}\`.
   - \`useEffect\` updating state that is included in its own dependency array.
   - Derived state incorrectly stored in \`useState\` instead of calculated inline during render.
2. Explain the React Fiber reconciliation cycle and why it aborts after 50 consecutive loops to protect browser RAM.
3. Provide the clean, refactored component eliminating the infinite cycle.
4. Provide an ESLint rule / best practice to catch this during development.

Expected Output Format:
1. Render Loop Trigger Identification
2. Fiber Reconciliation Cycle Breakdown
3. Refactored Component Code
4. Prevention Guide`,
    tags: ['debugging', 'react', 'infinite-loop', 'maximum-update-depth', 'use-effect', 'state'],
    difficulty: 'Easy',
    useCase: 'Debugging',
    variables: ['{{ERROR_MESSAGE}}', '{{CODE}}'],
    expectedOutput: 'Loop trigger identification + Fiber cycle explanation + refactored component + prevention guide'
  },
  {
    id: 'debug-500-internal-server-triage',
    title: 'HTTP 500 Internal Server Error & 502/504 Gateway Triage',
    category: 'Engineering',
    subcategory: 'Production Debugging',
    description: 'Step-by-step incident triage for HTTP 500, 502 Bad Gateway, and 504 Gateway Timeout across Nginx, Node.js, and upstream services.',
    prompt: `Act as a Senior DevOps and Site Reliability Engineer (SRE). Triage and resolve this production HTTP error spike.

HTTP Error Status (500, 502, or 504):
{{STATUS_CODE}}

Server Logs / Nginx Access & Error Logs:
{{SERVER_LOGS}}

Tasks:
1. Decouple Error Origins:
   - 500 Internal Server Error: Unhandled application exception in Node.js/Python backend.
   - 502 Bad Gateway: Reverse proxy (Nginx) cannot connect to upstream (process crashed, OOM killed, wrong port/socket).
   - 504 Gateway Timeout: Upstream server took longer than proxy timeout (hanging DB query, synchronous loop).
2. Diagnostic Commands (Linux / Docker):
   - Check if process is alive: \`ps aux | grep node\`, \`docker ps\`, \`systemctl status\`.
   - Check memory / OOM kills: \`dmesg -T | grep -i oom\`.
   - Check listening ports & sockets: \`netstat -tlpn\`, \`curl -I localhost:5000\`.
3. Root Cause Analysis & Fix:
   - Provide the exact configuration or source code fix.
4. Add automated monitoring alerts to catch this within 60 seconds of occurrence.

Expected Output Format:
1. Error Origin Classification (500 vs 502 vs 504)
2. Linux Diagnostic Triage Commands
3. Root Cause Remediation Code / Config
4. Prometheus Alert Rule`,
    tags: ['debugging', '500-error', '502-bad-gateway', '504-timeout', 'nginx', 'devops', 'sre'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{STATUS_CODE}}', '{{SERVER_LOGS}}'],
    expectedOutput: 'Origin classification + Linux diagnostic commands + remediation code/config + Prometheus alert'
  },
  {
    id: 'debug-cors-preflight-failures',
    title: 'CORS Origin Mismatch & OPTIONS Preflight Failure Triage',
    category: 'Development',
    subcategory: 'Express.js',
    description: 'Resolves "No Access-Control-Allow-Origin header is present on the requested resource" across browsers, API gateways, and Express.',
    prompt: `Act as a Web Security and Browser Networking Specialist. Resolve this CORS (Cross-Origin Resource Sharing) failure.

Browser Console CORS Error:
{{CONSOLE_ERROR}}

Request Details (Origin, Method, Headers, Cookies):
{{REQUEST_DETAILS}}

Backend Server Framework / Config:
{{BACKEND_CONFIG}}

Tasks:
1. Explain the Same-Origin Policy (SOP) and why the browser blocked the response (not the server!).
2. Preflight Request (OPTIONS) Analysis:
   - Why was a preflight triggered? (Custom headers, non-simple method like PUT/DELETE/PATCH, JSON content-type).
   - What headers must the server return on OPTIONS? (\`Access-Control-Allow-Origin\`, \`Access-Control-Allow-Methods\`, \`Access-Control-Allow-Headers\`, \`Access-Control-Allow-Credentials\`).
3. Credentials & Wildcard Conflict:
   - Why \`Access-Control-Allow-Origin: *\` crashes when \`credentials: 'include'\` is set (cookie authentication).
4. Provide the exact backend configuration fix (Express CORS, Nginx, or Spring/FastAPI).

Expected Output Format:
1. SOP & Preflight Trigger Breakdown
2. Request/Response Header Trace
3. Corrected Backend CORS Configuration Code
4. Verification Curl Command Simulating Preflight OPTIONS`,
    tags: ['debugging', 'cors', 'preflight', 'options', 'security', 'browser-networking'],
    difficulty: 'Easy',
    useCase: 'Debugging',
    variables: ['{{CONSOLE_ERROR}}', '{{REQUEST_DETAILS}}', '{{BACKEND_CONFIG}}'],
    expectedOutput: 'SOP/preflight breakdown + header trace + corrected backend CORS config + curl test command'
  },
  {
    id: 'debug-css-layout-overflow-breaks',
    title: 'CSS Layout Break, Flexbox/Grid Overflow & Scrollbar Diagnostic',
    category: 'Development',
    subcategory: 'HTML/CSS',
    description: 'Diagnoses accidental horizontal page scrolling, shrinking flex items, broken grid layouts, and z-index stacking context bugs.',
    prompt: `Act as a CSS Master and Modern Layout Specialist. Diagnose and fix the broken layout in this HTML/CSS component.

HTML & CSS Code:
{{CODE}}

Visual Glitch / Bug (e.g. Unwanted horizontal scrollbar / Flex item collapsing / z-index not working):
{{VISUAL_GLITCH}}

Tasks:
1. Diagnose the Root Cause:
   - Accidental Horizontal Scrollbar: Unconstrained elements, 100vw including scrollbar width, negative margins, missing \`box-sizing: border-box\`.
   - Flexbox Shrink Bug: \`min-width: auto\` default preventing text truncation (fix: \`min-width: 0\`).
   - Stacking Context Bug: Why \`z-index: 9999\` fails when parent has \`opacity < 1\`, \`transform\`, or \`isolation: isolate\`.
2. Inspect the computed styles and container boundaries.
3. Provide the minimal, elegant CSS fix using modern CSS standards (Flexbox, Grid, container queries, logical properties).
4. Ensure responsive stability across mobile (375px), tablet (768px), and desktop (1440px).

Expected Output Format:
1. CSS Layout Engine Mechanics Breakdown
2. Minimal Surgical CSS Diff (Before vs After)
3. Responsive Verification Checklist
4. Complete Working Code`,
    tags: ['debugging', 'css', 'flexbox', 'grid', 'overflow', 'z-index', 'responsive'],
    difficulty: 'Easy',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{VISUAL_GLITCH}}'],
    expectedOutput: 'CSS layout engine breakdown + surgical CSS diff + responsive checklist + working code'
  },
  {
    id: 'debug-docker-container-crashloop',
    title: 'Docker Container CrashLoopBackOff & Exit Code Triage',
    category: 'DevOps / Cloud',
    subcategory: 'Docker',
    description: 'Triages Docker container unexpected terminations (Exit code 137 OOM, 139 segfault, 127 command not found, 1 application error).',
    prompt: `Act as a Container Infrastructure and Kubernetes SRE. Diagnose why this Docker container terminates unexpectedly or enters CrashLoopBackOff.

Container Logs:
{{CONTAINER_LOGS}}

Dockerfile & Compose Config:
{{DOCKERFILE_CONTENT}}

Container Exit Code:
{{EXIT_CODE}}

Tasks:
1. Exit Code Translation:
   - Exit 137: SIGKILL (128 + 9) -> Out of Memory (OOM Killer) by Linux kernel.
   - Exit 143: SIGTERM (128 + 15) -> Graceful shutdown deadline exceeded.
   - Exit 127: Command or executable not found (missing PATH or wrong shell).
   - Exit 1: General application crash (unhandled exception on startup).
2. Diagnostic commands:
   - \`docker logs --tail 100 [container_id]\`
   - \`docker inspect [container_id] --format='{{json .State}}'\`
   - Inspecting entrypoint and CMD execution.
3. Provide the exact Dockerfile or configuration remediation.
4. Add memory resource limits and healthcheck definitions to prevent silent failure.

Expected Output Format:
1. Exit Code Meaning & Root Cause Analysis
2. Container Inspection Commands
3. Corrected Dockerfile / docker-compose.yml
4. Resource Limits & Healthcheck Definition`,
    tags: ['debugging', 'docker', 'containers', 'crashloop', 'kubernetes', 'devops', 'oom'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{CONTAINER_LOGS}}', '{{DOCKERFILE_CONTENT}}', '{{EXIT_CODE}}'],
    expectedOutput: 'Exit code translation + inspection commands + corrected Dockerfile/compose + resource limits'
  },
  {
    id: 'debug-network-latency-packet-drop',
    title: 'Network Packet Drop, TCP Retransmission & Latency Triage',
    category: 'Core Computer Science',
    subcategory: 'Computer Networks',
    description: 'Diagnoses high round-trip latency, TCP retransmissions, MTU size blackholes, and dropped packets using ping, traceroute, and curl.',
    prompt: `Act as a Network Reliability Engineer (NRE). Investigate this high latency and packet loss issue between microservices.

Network Symptoms / Ping & Curl Metrics:
{{NETWORK_METRICS}}

Network Topology:
{{NETWORK_TOPOLOGY}}

Tasks:
1. Layer-by-Layer Network Triage:
   - Layer 3 (IP / ICMP): \`ping\` packet loss rate and RTT variance (jitter).
   - Layer 4 (TCP): Retransmission rate, TCP window size exhaustion, SYN-ACK delay.
   - Layer 7 (HTTP / TLS): Time to First Byte (TTFB), DNS lookup time, TLS handshake time via \`curl -w "@curl-format.txt"\`.
2. Path Diagnostics:
   - Running \`traceroute\` / \`mtr\` to find the specific congested hop or routing loop.
   - MTU / MSS issues: Packet fragmentation and Path MTU Discovery (PMTUD) blackholes.
3. Provide actionable remediation:
   - TCP Keep-Alive and connection pooling.
   - Adjusting socket buffer sizes (\`SO_RCVBUF\`, \`SO_SNDBUF\`).
   - Regional deployment closer to users.

Expected Output Format:
1. Latency Breakdown Matrix (DNS, TCP, TLS, TTFB)
2. Network Diagnostic CLI Toolkit (curl, mtr, tcpdump commands)
3. Root Cause Hop Identification
4. Socket & Connection Pooling Configuration Code`,
    tags: ['debugging', 'networking', 'latency', 'packet-loss', 'tcp', 'ttfb', 'mtr'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{NETWORK_METRICS}}', '{{NETWORK_TOPOLOGY}}'],
    expectedOutput: 'Latency breakdown matrix + CLI diagnostic commands + root cause hop + socket pooling code'
  },
  {
    id: 'debug-silent-logic-undefined-hunter',
    title: 'Silent Logic Bug & Falsy Value Misconception Hunter',
    category: 'Engineering',
    subcategory: 'Clean Code',
    description: 'Tracks down elusive silent logic bugs caused by falsy JavaScript comparisons (0, "", NaN, false) and operator precedence.',
    prompt: `Act as an Elite Bug Hunter and Code Detective. Find the subtle, silent logic error in this code that executes without crashing but produces wrong results.

Code:
{{CODE}}

Expected Behavior vs Actual Result:
{{SYMPTOMS}}

Tasks:
1. Identify the hidden logic bug:
   - Falsy value coercion: Using \`val || default\` where \`0\` or \`""\` or \`false\` are valid values (should use Nullish Coalescing \`??\`).
   - Equality bugs: Abstract equality (\`==\`) vs Strict equality (\`===\`).
   - Array reference comparison: \`[1] === [1]\` evaluating to false.
   - Mutating array during iteration.
   - Operator precedence: \`typeof x === 'object' && x !== null\` vs bitwise/ternary misplacements.
2. Step-by-step trace showing the exact condition where execution takes the wrong branch.
3. Provide the corrected code with strict type-safety.
4. Provide a regression test suite catching the subtle boundary values.

Expected Output Format:
1. Silent Bug Discovery & Line Reference
2. Falsy / Operator Precedence Mechanism Explanation
3. Refactored Code with Nullish Coalescing / Strict Checks
4. Comprehensive Boundary Value Unit Tests`,
    tags: ['debugging', 'clean-code', 'logic-bug', 'nullish-coalescing', 'type-coercion', 'javascript'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{SYMPTOMS}}'],
    expectedOutput: 'Silent bug identification + operator mechanics explanation + refactored code + boundary unit tests'
  }
];
