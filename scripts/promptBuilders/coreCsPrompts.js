/**
 * Core Computer Science Prompts Collection (11 Prompts)
 * Covers OOP, OS (Processes, Threads, Deadlocks, Memory), and Computer Networks (OSI, TCP, DNS, HTTP/3, WebSockets).
 */
module.exports = [
  {
    id: 'cs-process-vs-thread-deep-dive',
    title: 'Process vs Thread: Memory Layout, Context Switching & IPC',
    category: 'Core Computer Science',
    subcategory: 'Operating Systems',
    description: 'Deconstructs the precise distinction between Processes and Threads: address spaces, PCB/TCB, context switch overhead, and IPC mechanisms.',
    prompt: `Act as an Operating Systems Professor and Systems Programming Interviewer. Deliver a masterclass explanation and interview defense on Process vs Thread.

Context / Scenario:
{{SCENARIO_OR_QUESTION}}

Tasks:
1. Architectural Memory Layout:
   - Diagram what is shared between threads of the same process (Code segment, Data segment, BSS, Heap, Open file descriptors, Sockets).
   - Diagram what is private to each individual thread (Stack, Thread Local Storage, Registers, Program Counter, TCB).
2. Context Switching Cost:
   - What happens during a Process Context Switch (flushing TLB, switching page directory / CR3 register in x86, cache misses).
   - What happens during a Thread Context Switch (register swap, stack pointer swap; TLB remains hot).
3. Inter-Process Communication (IPC):
   - Pipes, Named Pipes (FIFOs), Shared Memory, Message Queues, Unix Domain Sockets.
4. Five-Tier Explanation Framework:
   - Simple Explanation (ELI5 analogy).
   - Technical Deep-Dive (Kernel data structures: task_struct in Linux).
   - Real-World Production Example (Node.js single-thread worker threads vs Python multiprocessing vs Chrome multi-process tabs).
   - Ideal Interview Answer (compact 90-second answer).
   - 3 Tough Follow-Up Questions an interviewer might ask.

Expected Output Format:
Structured 5-Tier Masterclass document with ASCII memory diagrams and interview answers.`,
    tags: ['core-cs', 'operating-systems', 'processes', 'threads', 'context-switch', 'ipc', 'interview-prep'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{SCENARIO_OR_QUESTION}}'],
    expectedOutput: '5-tier masterclass + memory layout diagram + context switch breakdown + IPC comparison + interview answer'
  },
  {
    id: 'cs-deadlock-coffman-prevention',
    title: 'Deadlock: The 4 Coffman Conditions & Prevention Strategies',
    category: 'Core Computer Science',
    subcategory: 'Operating Systems',
    description: 'Analyzes deadlocks through Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait, and details prevention and avoidance algorithms.',
    prompt: `Act as a Concurrency and OS Specialist. Break down Deadlocks, the Coffman conditions, and concrete prevention strategies.

Scenario or Concurrency Problem:
{{DEADLOCK_SCENARIO}}

Tasks:
1. Explain the 4 Coffman Conditions (all 4 must hold simultaneously for a deadlock to exist):
   - Mutual Exclusion
   - Hold and Wait
   - No Preemption
   - Circular Wait
2. How to break each condition programmatically:
   - Breaking Circular Wait: Strict global ordering of resource acquisition (sorting lock IDs).
   - Breaking Hold and Wait: Atomic acquisition of all locks (all-or-nothing with tryLock).
   - Breaking No Preemption: Preempting resource or timed timeout rollbacks.
   - Breaking Mutual Exclusion: Lock-free atomic data structures (CAS, compare-and-swap).
3. Deadlock Avoidance: Banker's Algorithm (Safe vs Unsafe states).
4. Deadlock Detection: Resource Allocation Graphs (RAG) and cycle finding.
5. Provide code demonstrating a deadlocked pattern and its resolved lock-ordered version.

Expected Output Format:
1. Coffman Conditions Breakdown
2. Prevention Strategies Matrix
3. Code Before vs After (Lock Ordering Fix)
4. Interview Model Answer`,
    tags: ['core-cs', 'os', 'deadlocks', 'coffman-conditions', 'concurrency', 'multithreading'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{DEADLOCK_SCENARIO}}'],
    expectedOutput: 'Coffman conditions breakdown + prevention matrix + code before/after + interview answer'
  },
  {
    id: 'cs-mutex-semaphore-synchronization',
    title: 'Mutex vs Semaphore vs Spinlock Concurrency Primitives',
    category: 'Core Computer Science',
    subcategory: 'Operating Systems',
    description: 'Demystifies synchronization primitives: binary semaphore vs mutex (ownership & priority inversion), counting semaphore, and spinlocks.',
    prompt: `Act as a Systems Programming and OS Concurrency Engineer. Compare and contrast synchronization primitives with precision.

Topic: Mutex vs Binary Semaphore vs Counting Semaphore vs Spinlock.

Specific Code / Concurrency Problem:
{{CONCURRENCY_PROBLEM}}

Tasks:
1. Critical Distinctions:
   - Ownership: Why a Mutex can ONLY be unlocked by the thread that locked it, whereas a Semaphore can be signaled/posted by ANY thread.
   - Priority Inversion: How Priority Inheritance Protocols solve priority inversion with Mutexes, but fail with Semaphores.
   - Spinlock vs Mutex: When busy-waiting on CPU (spin) is faster than kernel context-switching a sleeping thread.
2. Classical Producer-Consumer Problem:
   - Demonstrate solution using 1 Mutex + 2 Counting Semaphores (emptyCount, fullCount).
3. Five-Tier Explanation:
   - ELI5 Metaphor (Single toilet key vs Parking lot counter).
   - Technical Engine Mechanics.
   - Real-World Use Cases.
   - Model Interview Answer.
   - 3 Follow-up Questions.

Expected Output Format:
1. Technical Comparison Table (Mutex vs Semaphore vs Spinlock)
2. Producer-Consumer Implementation Code
3. Priority Inversion Deep-Dive
4. Model Interview Answer`,
    tags: ['core-cs', 'os', 'mutex', 'semaphore', 'spinlock', 'concurrency', 'synchronization'],
    difficulty: 'Intermediate',
    useCase: 'Interview Preparation',
    variables: ['{{CONCURRENCY_PROBLEM}}'],
    expectedOutput: 'Comparison table + producer-consumer code + priority inversion deep-dive + model interview answer'
  },
  {
    id: 'cs-virtual-memory-paging-tlb',
    title: 'Virtual Memory, Paging, TLB & Page Faults Architecture',
    category: 'Core Computer Science',
    subcategory: 'Operating Systems',
    description: 'Explains how the MMU translates virtual addresses to physical RAM: Page Tables, TLB hits/misses, Page Fault handling, and Thrashing.',
    prompt: `Act as a Computer Architecture and OS Kernel Specialist. Explain the end-to-end journey of an address translation through Virtual Memory.

Question / Problem:
{{QUESTION_OR_TOPIC}}

Tasks:
1. Virtual Memory Fundamentals: Why do modern operating systems provide virtual address spaces instead of direct physical RAM addressing (protection, fragmentation, isolation)?
2. Address Translation Walk (MMU):
   - Virtual Address format: Page Number + Offset.
   - Translation Lookaside Buffer (TLB): What happens on TLB Hit vs TLB Miss.
   - Multi-Level Page Tables: Why 64-bit systems require 4 or 5-level page tables to save RAM.
3. Anatomy of a Page Fault:
   - Step-by-step kernel sequence from CPU trap to disk swap-in to resume instruction.
4. Thrashing & Page Replacement:
   - What causes Thrashing (Working Set size > Physical RAM).
   - Page replacement algorithms: LRU vs Clock / Second-Chance vs FIFO.
5. Provide a model interview answer suitable for a Systems / Backend Engineering role.

Expected Output Format:
1. Architectural Memory Journey Diagram
2. Step-by-Step Page Fault Lifecyle (1 to 7 steps)
3. Multi-Level Page Table Math Example
4. Model Technical Interview Answer`,
    tags: ['core-cs', 'os', 'virtual-memory', 'paging', 'tlb', 'page-faults', 'memory-management'],
    difficulty: 'Advanced',
    useCase: 'Interview Preparation',
    variables: ['{{QUESTION_OR_TOPIC}}'],
    expectedOutput: 'Memory journey diagram + page fault lifecycle + page table math + model interview answer'
  },
  {
    id: 'cs-cpu-scheduling-algorithms',
    title: 'CPU Scheduling Algorithms: FCFS, Round Robin, Priority & MLFQ',
    category: 'Core Computer Science',
    subcategory: 'Operating Systems',
    description: 'Compares CPU scheduling algorithms: calculating Turnaround Time and Waiting Time for FCFS, SJF, Round Robin, and Linux CFS (Completely Fair Scheduler).',
    prompt: `Act as an Operating Systems Professor. Analyze CPU scheduling algorithms and calculate performance metrics for this workload.

Process Workload (Arrival times & Burst times):
{{PROCESS_BURST_TIMES}}

Tasks:
1. Compare Scheduling Algorithms:
   - FCFS (First-Come, First-Served) - Convoy effect.
   - SJF / SRTF (Shortest Job First / Shortest Remaining Time First) - Starvation risk.
   - Round Robin (RR) - Time quantum tuning (too large -> FCFS; too small -> context switch thrashing).
   - Multi-Level Feedback Queue (MLFQ) - Dynamic priority aging.
   - Linux CFS (Completely Fair Scheduler) - Red-black tree and vruntime.
2. Draw a Gantt Chart for the specified workload under Round Robin and calculate:
   - Turnaround Time per process and average.
   - Waiting Time per process and average.
3. Provide an elite interview response explaining the trade-offs of CPU-bound vs I/O-bound scheduling.

Expected Output Format:
1. Gantt Chart Visualization
2. Turnaround & Waiting Time Math Calculation Table
3. Scheduling Algorithm Trade-Off Matrix
4. Modern Linux CFS (vruntime) Insight`,
    tags: ['core-cs', 'os', 'cpu-scheduling', 'round-robin', 'turnaround-time', 'gantt-chart'],
    difficulty: 'Intermediate',
    useCase: 'Interview Preparation',
    variables: ['{{PROCESS_BURST_TIMES}}'],
    expectedOutput: 'Gantt chart + calculation table + scheduling matrix + Linux CFS vruntime insight'
  },
  {
    id: 'cs-osi-vs-tcpip-model',
    title: 'OSI 7-Layer vs TCP/IP Protocol Suite & Packet Encapsulation',
    category: 'Core Computer Science',
    subcategory: 'Computer Networks',
    description: 'Walks through every layer of the network stack from Application (HTTP) down to Physical bits, detailing packet encapsulation and headers.',
    prompt: `Act as a Senior Network Architect. Provide an exhaustive, interview-grade breakdown of the OSI 7-Layer Model versus the TCP/IP Protocol Suite.

Question Context:
{{QUESTION_OR_SCENARIO}}

Tasks:
1. Side-by-Side Comparison:
   - Map each OSI layer (Application, Presentation, Session, Transport, Network, Data Link, Physical) to the 4/5-layer TCP/IP Model.
2. Packet Encapsulation & Decapsulation (PDU Journey):
   - Trace a user clicking a button in a browser: Data -> Segment (TCP header with ports) -> Packet (IP header with IP addresses) -> Frame (Ethernet header with MAC addresses) -> Bits (Physical wire/radio).
3. Hardware Mapping:
   - Which device operates at which layer? (Layer 7 Load Balancers, Layer 4 Proxies, Layer 3 Routers, Layer 2 Switches, Layer 1 Hubs/Cables).
4. Five-Tier Explanation:
   - ELI5 Postal Service Analogy.
   - Technical Packet Headers Deep-Dive.
   - Real-World Production Example (Why Wireshark shows encapsulated frames).
   - Model Interview Answer.
   - 3 Follow-Up Curveball Questions.

Expected Output Format:
1. Layer Mapping Matrix Table
2. Packet Encapsulation Diagram (Headers Added at Each Stage)
3. Layer Hardware & Protocol Catalog
4. Model Interview Answer`,
    tags: ['core-cs', 'computer-networks', 'osi-model', 'tcp-ip', 'networking', 'encapsulation'],
    difficulty: 'Beginner',
    useCase: 'Interview Preparation',
    variables: ['{{QUESTION_OR_SCENARIO}}'],
    expectedOutput: 'Layer mapping matrix + encapsulation diagram + hardware catalog + model interview answer'
  },
  {
    id: 'cs-tcp-handshake-flow-congestion',
    title: 'TCP 3-Way Handshake, Flow Control, AIMD & 4-Way Teardown',
    category: 'Core Computer Science',
    subcategory: 'Computer Networks',
    description: 'Explains reliable transport mechanics: SYN-SYN/ACK-ACK handshake, sequence/ack numbers, Sliding Window flow control, and TCP Congestion Control (AIMD).',
    prompt: `Act as a Transport Layer Protocol Engineer. Deliver an in-depth technical analysis of TCP connection lifecycles and reliability mechanics.

Question / Problem:
{{TOPIC_OR_SCENARIO}}

Tasks:
1. Connection Establishment (3-Way Handshake):
   - Step 1: SYN (Seq=X).
   - Step 2: SYN-ACK (Seq=Y, Ack=X+1).
   - Step 3: ACK (Seq=X+1, Ack=Y+1).
   - Why 3 steps instead of 2? (Preventing old delayed duplicate connections).
   - SYN Flood attacks & SYN Cookies defense.
2. Reliability & Flow Control:
   - Sliding Window Protocol: Receiver Window (rwnd) advertising buffer capacity.
3. Congestion Control:
   - Slow Start, Congestion Avoidance (AIMD - Additive Increase Multiplicative Decrease), Fast Retransmit (3 duplicate ACKs), Fast Recovery.
4. Connection Termination (4-Way Handshake):
   - FIN -> ACK -> FIN -> ACK.
   - Why the \`TIME_WAIT\` state (2*MSL) is essential (draining delayed packets and ensuring final ACK was received).
5. Model Interview Answer.

Expected Output Format:
1. 3-Way Handshake Diagram with Sequence Numbers
2. Flow Control vs Congestion Control Distinction
3. 4-Way Teardown & TIME_WAIT Explanation
4. 90-Second Interview Pitch`,
    tags: ['core-cs', 'tcp', 'networking', 'handshake', 'congestion-control', 'time-wait'],
    difficulty: 'Advanced',
    useCase: 'Interview Preparation',
    variables: ['{{TOPIC_OR_SCENARIO}}'],
    expectedOutput: 'Handshake diagram + flow/congestion control distinction + teardown analysis + model interview answer'
  },
  {
    id: 'cs-dns-resolution-walkthrough',
    title: 'What Happens When You Type a URL in a Browser: DNS to Render',
    category: 'Core Computer Science',
    subcategory: 'Computer Networks',
    description: 'The canonical software engineering interview question: step-by-step trace from browser keystroke to DNS resolution, TCP handshake, TLS 1.3, HTTP/2, and DOM parsing.',
    prompt: `Act as a Senior FAANG Engineering Interviewer. Provide the definitive, exhaustive answer to: "What happens when you type https://www.google.com in a browser and press Enter?"

Detail Level:
{{TARGET_DEPTH}}

Tasks:
1. Keystroke & Browser Prep:
   - HSTS preload check, URL parsing, browser cache inspection.
2. DNS Resolution Walk:
   - Browser DNS Cache -> OS Cache (hosts file / DNS client) -> Local DNS Resolver (ISP/Router) -> Root Nameservers (.) -> TLD Nameservers (.com) -> Authoritative Nameservers.
   - Record types (A, AAAA, CNAME).
3. Transport & Security Handshake:
   - ARP resolution for local gateway MAC address.
   - TCP 3-Way Handshake.
   - TLS 1.3 Handshake (ClientHello, Key Share, ServerHello, encrypted extensions, session resumption).
4. HTTP Request & Server Processing:
   - HTTP GET request sent over TLS tunnel.
   - Load balancer / Reverse Proxy (Nginx) terminating TLS and routing to web server.
5. Browser Rendering Engine Pipeline:
   - Critical Rendering Path: HTML parsing -> DOM tree -> CSSOM tree -> Render Tree -> Layout (Reflow) -> Paint -> Compositing.
6. Summary / 2-minute elevator pitch for an interview.

Expected Output Format:
Chronological 6-phase journey with protocols labeled at every hop + concise 2-minute interview summary.`,
    tags: ['core-cs', 'dns', 'networking', 'url-to-browser', 'interview-prep', 'critical-rendering-path'],
    difficulty: 'Interview',
    useCase: 'Interview Preparation',
    variables: ['{{TARGET_DEPTH}}'],
    expectedOutput: 'Chronological 6-phase journey from DNS to render + protocols breakdown + 2-minute interview summary'
  },
  {
    id: 'cs-http-evolution-http3-quic',
    title: 'HTTP Evolution: HTTP/1.1 vs HTTP/2 (Multiplexing) vs HTTP/3 (QUIC)',
    category: 'Core Computer Science',
    subcategory: 'Computer Networks',
    description: 'Traces the evolution of web protocols: Head-of-Line blocking in HTTP/1.1, binary framing in HTTP/2, and UDP-based QUIC in HTTP/3.',
    prompt: `Act as a Web Protocols and Performance Specialist. Contrast HTTP/1.1, HTTP/2, and HTTP/3.

Discussion Context:
{{CONTEXT}}

Tasks:
1. HTTP/1.1 Limitations:
   - Head-of-Line (HoL) Blocking at the application layer.
   - Domain sharding and browser 6-connection limits per host.
   - Heavy uncompressed plaintext headers.
2. HTTP/2 Innovations & Remaining Flaw:
   - Binary Framing Layer.
   - Multiplexing: Multiple bi-directional streams over a single TCP connection.
   - HPACK header compression.
   - Server Push.
   - TCP-Level Head-of-Line Blocking: A single dropped packet stalls ALL multiplexed streams!
3. HTTP/3 with QUIC (Quick UDP Internet Connections):
   - Why QUIC is built on UDP instead of TCP.
   - Independent streams (packet loss on stream A does not stall stream B).
   - 0-RTT Connection Establishment (combining transport and TLS 1.3 handshakes).
   - Connection Migration (surviving IP changes from Wi-Fi to Cellular).
4. Side-by-side comparison table and interview answer.

Expected Output Format:
1. Protocol Evolution Timeline
2. Head-of-Line Blocking Mechanics Comparison
3. Technical Scorecard Table (Transport, Framing, Encryption, Handshake RTT)
4. Model Interview Answer`,
    tags: ['core-cs', 'http', 'http2', 'http3', 'quic', 'networking', 'performance'],
    difficulty: 'Intermediate',
    useCase: 'Interview Preparation',
    variables: ['{{CONTEXT}}'],
    expectedOutput: 'Protocol timeline + HoL blocking comparison + technical scorecard + model interview answer'
  },
  {
    id: 'cs-realtime-websockets-vs-sse',
    title: 'Real-Time Web: WebSockets vs Server-Sent Events (SSE) vs Polling',
    category: 'Core Computer Science',
    subcategory: 'Computer Networks',
    description: 'Selects the right real-time architecture: bidirectional full-duplex WebSockets vs unidirectional HTTP-native Server-Sent Events vs Short/Long Polling.',
    prompt: `Act as a Real-Time Systems Architect. Compare and select the optimal real-time communication protocol for this application.

Application Use Case:
{{APPLICATION_USE_CASE}}

Tasks:
1. Protocol Mechanics Breakdown:
   - Short Polling: Periodic HTTP requests (high overhead, server flooding).
   - Long Polling: Server holds connection open until data arrives (connection churn).
   - Server-Sent Events (SSE): Unidirectional server-to-client streaming over standard HTTP/2 (automatic reconnects, simple text protocol, proxy-friendly).
   - WebSockets: Full-duplex bidirectional TCP stream initiated via HTTP Upgrade handshake (low latency, custom binary/text frames, stateful connections).
2. Evaluation Criteria:
   - Directionality (Is client-to-server traffic frequent?).
   - Connection statefulness and load balancing difficulty.
   - Firewall and corporate proxy compatibility.
   - Mobile battery and reconnection resilience.
3. Final Architecture Recommendation with code snippets (client and server).

Expected Output Format:
1. Protocol Comparison Matrix
2. Architectural Trade-offs & Decision Logic
3. Server-Sent Events Implementation Snippet
4. WebSocket Implementation Snippet`,
    tags: ['core-cs', 'websockets', 'sse', 'realtime', 'networking', 'system-design'],
    difficulty: 'Intermediate',
    useCase: 'Architecture Review',
    variables: ['{{APPLICATION_USE_CASE}}'],
    expectedOutput: 'Comparison matrix + trade-off decision logic + SSE code snippet + WebSocket code snippet'
  },
  {
    id: 'cs-oop-solid-design-patterns',
    title: 'OOP 4 Pillars, SOLID Principles & Design Patterns Framework',
    category: 'Core Computer Science',
    subcategory: 'OOP',
    description: 'Synthesizes Encapsulation, Inheritance, Polymorphism, Abstraction, and SOLID principles with real-world design pattern implementations.',
    prompt: `Act as an Object-Oriented Software Design Specialist and Interviewer. Deliver a rigorous technical breakdown of OOP principles and design patterns.

Target Concept or Question:
{{OOP_CONCEPT_OR_QUESTION}}

Tasks:
1. The 4 Pillars of OOP:
   - Encapsulation: Data hiding and access modifiers.
   - Abstraction: Hiding implementation complexity behind contracts.
   - Inheritance: Code reuse ("is-a" relationship) and why Composition is preferred over Inheritance.
   - Polymorphism: Compile-time (method overloading / templates) vs Runtime (Virtual Tables / dynamic dispatch).
2. The 5 SOLID Principles:
   - Single Responsibility (SRP)
   - Open/Closed (OCP)
   - Liskov Substitution (LSP)
   - Interface Segregation (ISP)
   - Dependency Inversion (DIP)
3. Canonical Design Pattern Implementation:
   - Provide clean code demonstrating a matching pattern (Factory, Singleton, Observer, Strategy, or Decorator) in {{PREFERRED_LANGUAGE}}.
4. Model interview answer explaining how you apply these in daily production engineering.

Expected Output Format:
1. 4 Pillars Mechanics & VTable Explanation
2. SOLID Principles with Code Counter-Examples
3. Design Pattern Implementation in {{PREFERRED_LANGUAGE}}
4. Model Interview Pitch`,
    tags: ['core-cs', 'oop', 'solid', 'design-patterns', 'polymorphism', 'inheritance'],
    difficulty: 'Intermediate',
    useCase: 'Interview Preparation',
    variables: ['{{OOP_CONCEPT_OR_QUESTION}}', '{{PREFERRED_LANGUAGE}}'],
    expectedOutput: '4 pillars with VTable mechanics + SOLID counter-examples + design pattern code + interview pitch'
  }
];
