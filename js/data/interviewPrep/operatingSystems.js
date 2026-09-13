/**
 * DevPilot-AI — Operating Systems Question Bank
 * 150 authentic placement/interview MCQs across 15 topics.
 */

(function () {
  'use strict';

  const operatingSystemsData = {
    category: "operatingSystems",
    title: "Operating Systems",
    description: "Process lifecycle, threads, CPU scheduling algorithms, synchronization, deadlocks, paging, and system calls.",
    icon: "memory",
    totalTopics: 15,
    topics: [
  "OS Fundamentals",
  "Processes",
  "Threads",
  "Process Scheduling",
  "CPU Scheduling Algorithms",
  "Synchronization",
  "Mutex & Semaphore",
  "Deadlocks",
  "Memory Management",
  "Paging",
  "Segmentation",
  "Virtual Memory",
  "Page Replacement",
  "File Systems",
  "System Calls"
],
    questions: [
  {
    "id": "os-fnd-01",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "easy",
    "question": "What is the primary role of an Operating System?",
    "options": [
      "An intermediary between user applications and computer hardware that manages hardware resources (CPU, memory, I/O) efficiently",
      "To design web pages",
      "To manufacture microchips",
      "To run antivirus scans"
    ],
    "correctAnswer": 0,
    "explanation": "The OS acts as a resource allocator and control program managing hardware and virtualizing resources."
  },
  {
    "id": "os-fnd-02",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "easy",
    "question": "What is the difference between User Mode and Kernel Mode in modern CPU architectures (Dual-Mode Operation)?",
    "options": [
      "Kernel Mode has unrestricted access to hardware instructions and memory; User Mode executes with restricted CPU privileges to prevent system crashes",
      "User Mode runs faster than Kernel Mode",
      "Kernel Mode is for Linux; User Mode is for Windows",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Dual-mode hardware rings isolate unprivileged user processes from privileged operating system kernel operations."
  },
  {
    "id": "os-fnd-03",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "easy",
    "question": "How does a process transition from User Mode to Kernel Mode?",
    "options": [
      "Via a System Call, hardware interrupt, or CPU exception/trap",
      "By changing file permissions with chmod",
      "By allocating memory with malloc",
      "By pressing Ctrl+Alt+Del"
    ],
    "correctAnswer": 0,
    "explanation": "Traps and interrupts trigger controlled hardware mode switches into predefined kernel vector handlers."
  },
  {
    "id": "os-fnd-04",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "easy",
    "question": "What is a 'Monolithic Kernel' (e.g. Linux)?",
    "options": [
      "An OS architecture where all core services (VFS, scheduler, memory management, device drivers) run in the same single address space in Kernel Mode",
      "A kernel that has no drivers",
      "A kernel built on a single computer chip",
      "A kernel with only one process"
    ],
    "correctAnswer": 0,
    "explanation": "Monolithic kernels execute all OS services within kernel space for maximum performance and communication velocity."
  },
  {
    "id": "os-fnd-05",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "medium",
    "question": "What is a 'Microkernel' (e.g. Mach, seL4)?",
    "options": [
      "A minimal kernel architecture providing only basic IPC, virtual memory, and scheduling in kernel mode, moving drivers and file systems to user-space servers",
      "A tiny kernel for smartwatches",
      "A kernel that cannot run multiple processes",
      "A kernel with no scheduler"
    ],
    "correctAnswer": 0,
    "explanation": "Microkernels prioritize fault isolation and modularity by running peripheral services in unprivileged user space."
  },
  {
    "id": "os-fnd-06",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "medium",
    "question": "What is a 'Hardware Interrupt'?",
    "options": [
      "An asynchronous electrical signal sent by physical hardware devices (keyboard, disk, NIC) to the CPU demanding immediate processing",
      "A user clicking cancel",
      "A power outage",
      "A syntax error in code"
    ],
    "correctAnswer": 0,
    "explanation": "Hardware interrupts alert the CPU to I/O events, pausing current execution to invoke Interrupt Service Routines (ISRs)."
  },
  {
    "id": "os-fnd-07",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "medium",
    "question": "What is an Interrupt Vector Table (IVT)?",
    "options": [
      "An array of memory addresses pointing to specific Interrupt Service Routines (ISRs) indexed by interrupt type",
      "A table of user passwords",
      "A list of CPU clock speeds",
      "A table of hard drive sectors"
    ],
    "correctAnswer": 0,
    "explanation": "The IVT maps hardware/software interrupt numbers directly to their corresponding kernel handler routines."
  },
  {
    "id": "os-fnd-08",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "medium",
    "question": "What is 'Spooling' (Simultaneous Peripheral Operations On-Line) in OS concepts?",
    "options": [
      "Buffering I/O data in temporary storage (e.g. print spooler) so devices operating at different speeds can process data asynchronously",
      "Spinning a hard drive disk",
      "Connecting network cables",
      "A thread synchronization algorithm"
    ],
    "correctAnswer": 0,
    "explanation": "Spooling decouples high-speed CPU execution from slow peripheral output devices like printers."
  },
  {
    "id": "os-fnd-09",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "hard",
    "question": "What is Direct Memory Access (DMA) and why is it important?",
    "options": [
      "Hardware feature allowing high-speed I/O devices to transfer data directly to/from RAM without routing through the CPU, freeing CPU cycles",
      "Directly modifying CPU registers",
      "Allocating memory without the OS",
      "Bypassing the BIOS"
    ],
    "correctAnswer": 0,
    "explanation": "DMA controllers offload bulk data transfers (e.g. disk to RAM), interrupting the CPU only when the transfer completes."
  },
  {
    "id": "os-fnd-10",
    "category": "operatingSystems",
    "topic": "OS Fundamentals",
    "difficulty": "hard",
    "question": "What is the role of the Bootloader (e.g. GRUB) during the computer startup sequence?",
    "options": [
      "Loaded by BIOS/UEFI from the Master Boot Record / EFI partition; initializes hardware and loads the OS kernel into memory",
      "Formats the hard drive",
      "Installs antivirus updates",
      "Checks user passwords"
    ],
    "correctAnswer": 0,
    "explanation": "The bootloader bridges firmware initialization to OS kernel execution, transferring control to kernel start routines."
  },
  {
    "id": "os-prc-01",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "easy",
    "question": "What is the definition of a 'Process' in an Operating System?",
    "options": [
      "A program in active execution, including its program counter, registers, call stack, and memory space",
      "A program file stored on the hard drive",
      "A compiler error",
      "A CPU clock cycle"
    ],
    "correctAnswer": 0,
    "explanation": "A passive program on disk becomes an active process when loaded into virtual memory with execution state."
  },
  {
    "id": "os-prc-02",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "easy",
    "question": "What is a Process Control Block (PCB)?",
    "options": [
      "A kernel data structure containing all metadata about a process: PID, state, CPU registers, scheduling priority, and open files",
      "A physical chip on the motherboard",
      "A list of running threads in user space",
      "A hardware cache"
    ],
    "correctAnswer": 0,
    "explanation": "The PCB encapsulates complete process execution context required to pause and resume the process during context switching."
  },
  {
    "id": "os-prc-03",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "easy",
    "question": "What are the standard 5 states of a process lifecycle?",
    "options": [
      "New -> Ready -> Running -> Waiting (Blocked) -> Terminated",
      "Created -> Working -> Sleeping -> Paused -> Deleted",
      "Draft -> Active -> Stagnant -> Stalled -> Closed",
      "Compile -> Link -> Load -> Run -> Exit"
    ],
    "correctAnswer": 0,
    "explanation": "Processes transition: New (created) -> Ready (waiting for CPU) -> Running (on CPU) -> Waiting (for I/O) -> Terminated."
  },
  {
    "id": "os-prc-04",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "easy",
    "question": "What is a 'Zombie Process' in Linux/Unix?",
    "options": [
      "A process that has completed execution (called exit), but still occupies an entry in the process table because its parent has not read its exit status via wait()",
      "A computer virus process",
      "A process that runs forever",
      "A process that cannot be killed by root"
    ],
    "correctAnswer": 0,
    "explanation": "Zombies retain a minimal PCB entry holding exit code until the parent reaps them via wait()."
  },
  {
    "id": "os-prc-05",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "medium",
    "question": "What is an 'Orphan Process'?",
    "options": [
      "A running process whose parent process has terminated before it; it is adopted by systemd/init (PID 1)",
      "A process that has no CPU",
      "A process with no code",
      "A process that has been deleted"
    ],
    "correctAnswer": 0,
    "explanation": "When a parent exits prematurely, init/systemd inherits the orphan and reaps it upon termination."
  },
  {
    "id": "os-prc-06",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "medium",
    "question": "What is 'Context Switching'?",
    "options": [
      "The procedure of saving the execution state (registers, PC, stack pointer) of the currently running process and restoring the state of another process to CPU",
      "Switching between keyboard and mouse",
      "Changing user accounts in Windows",
      "Changing screen resolution"
    ],
    "correctAnswer": 0,
    "explanation": "Context switching enables multi-tasking by swapping process state in and out of CPU registers."
  },
  {
    "id": "os-prc-07",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "medium",
    "question": "Why is context switching between different processes considered computationally expensive?",
    "options": [
      "Requires saving/restoring CPU registers, switching memory page tables, and invalidating CPU caches (TLB flushing)",
      "Because it requires downloading files",
      "Because the CPU turns off for a millisecond",
      "Because memory is erased"
    ],
    "correctAnswer": 0,
    "explanation": "Process context switches flush Translation Lookaside Buffers (TLB) and disrupt cache locality."
  },
  {
    "id": "os-prc-08",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "medium",
    "question": "What system call creates a new child process in Unix/Linux by duplicating the calling process?",
    "options": [
      "fork()",
      "create()",
      "spawn()",
      "exec()"
    ],
    "correctAnswer": 0,
    "explanation": "fork() creates an identical child process; it returns 0 to the child and the child's PID to the parent."
  },
  {
    "id": "os-prc-09",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "hard",
    "question": "What is the 'Copy-on-Write' (COW) optimization used during fork()?",
    "options": [
      "Parent and child initially share the exact same physical memory pages read-only; physical pages are only duplicated when one process attempts to write/modify",
      "Copying code onto paper",
      "Encrypting memory pages",
      "Copying files to the hard drive on save"
    ],
    "correctAnswer": 0,
    "explanation": "COW makes fork() instantaneous by sharing read-only pages until a write triggers an on-demand copy."
  },
  {
    "id": "os-prc-10",
    "category": "operatingSystems",
    "topic": "Processes",
    "difficulty": "hard",
    "question": "What does the exec() family of system calls do to an existing process?",
    "options": [
      "Replaces the current process image, memory address space, and code with a brand-new executable program",
      "Executes the process twice",
      "Creates a thread",
      "Terminates the operating system"
    ],
    "correctAnswer": 0,
    "explanation": "execve() overwrites the caller's text, data, heap, and stack segments with the new program binary."
  },
  {
    "id": "os-thd-01",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "easy",
    "question": "What is a Thread in an operating system?",
    "options": [
      "The smallest basic unit of CPU execution (a lightweight process) within a process, sharing memory and resources with sibling threads",
      "A physical cable connecting servers",
      "A background cron job",
      "An encryption algorithm"
    ],
    "correctAnswer": 0,
    "explanation": "Threads are lightweight execution units within a parent process that share heap, code, and global resources."
  },
  {
    "id": "os-thd-02",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "easy",
    "question": "What resources are SHARED among threads belonging to the same process?",
    "options": [
      "Code (Text) segment, Data segment, Heap memory, and Open file descriptors",
      "CPU registers and Program Counter",
      "Stack memory space",
      "Nothing is shared"
    ],
    "correctAnswer": 0,
    "explanation": "All threads in a process share address space, heap, and open handles, enabling fast inter-thread communication."
  },
  {
    "id": "os-thd-03",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "easy",
    "question": "What resources are UNIQUE (private) to each individual thread?",
    "options": [
      "Program Counter (PC), CPU Register set, and its own Call Stack",
      "Heap memory",
      "Global variables",
      "Open file descriptors"
    ],
    "correctAnswer": 0,
    "explanation": "Each thread must have its own stack (for local variables and function calls), PC, and registers to execute independently."
  },
  {
    "id": "os-thd-04",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "easy",
    "question": "Why is a Context Switch between threads of the same process faster than between two different processes?",
    "options": [
      "Thread switching does not require changing virtual memory address spaces or flushing the Translation Lookaside Buffer (TLB)",
      "Threads run on faster CPU cores",
      "Threads do not use registers",
      "Threads bypass the operating system"
    ],
    "correctAnswer": 0,
    "explanation": "Because threads share page tables, switching threads avoids TLB cache invalidation and memory mapping overhead."
  },
  {
    "id": "os-thd-05",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "medium",
    "question": "What is the difference between User-Level Threads (ULT) and Kernel-Level Threads (KLT)?",
    "options": [
      "ULTs are managed by a user-space library without kernel awareness; KLTs are managed directly by the OS kernel and can execute on multiple cores simultaneously",
      "ULTs are for Linux; KLTs are for Windows",
      "KLTs cannot access memory",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "ULTs offer fast switching but block the whole process if one thread blocks; KLTs support true multi-core parallel scheduling."
  },
  {
    "id": "os-thd-06",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "medium",
    "question": "What is a 'Race Condition' in multi-threaded programming?",
    "options": [
      "A flaw where the output or state depends unpredictably on the uncontrollable execution timing and order of concurrent threads accessing shared mutable state",
      "Threads competing for network speed",
      "A benchmark test measuring thread speed",
      "When two threads terminate at the same time"
    ],
    "correctAnswer": 0,
    "explanation": "Race conditions occur when unsynchronized threads interleave reads and writes to shared memory concurrently."
  },
  {
    "id": "os-thd-07",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "medium",
    "question": "What is the Multi-threading Model known as 'One-to-One' (used in Linux and Windows)?",
    "options": [
      "Each user-level thread maps directly to one kernel-level thread, allowing true parallel execution on multi-core processors",
      "One process can only have one thread",
      "One CPU core runs one thread per day",
      "One thread can only call one function"
    ],
    "correctAnswer": 0,
    "explanation": "Modern OSes use 1:1 mapping so the kernel scheduler can distribute user threads across all hardware CPU cores."
  },
  {
    "id": "os-thd-08",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "medium",
    "question": "What is 'Thread Pool' and why is it preferred over spawning new threads per request?",
    "options": [
      "A pre-allocated pool of worker threads that reuse threads for incoming tasks, avoiding the CPU and memory overhead of constant thread creation/destruction",
      "A swimming pool for developers",
      "A database of thread names",
      "A hardware cache on the motherboard"
    ],
    "correctAnswer": 0,
    "explanation": "Thread pools cap maximum concurrency and eliminate repeated thread allocation/destruction latency."
  },
  {
    "id": "os-thd-09",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "hard",
    "question": "What is the Global Interpreter Lock (GIL) in CPython?",
    "options": [
      "A mutex that prevents multiple native threads from executing Python bytecode simultaneously, restricting a Python process to a single CPU core",
      "A security lock protecting Python from viruses",
      "A hardware lock on Intel CPUs",
      "A compiler optimization"
    ],
    "correctAnswer": 0,
    "explanation": "CPython's GIL serializes thread execution to protect memory management (reference counting), limiting multi-core CPU parallelism."
  },
  {
    "id": "os-thd-10",
    "category": "operatingSystems",
    "topic": "Threads",
    "difficulty": "hard",
    "question": "What is 'False Sharing' in multi-threaded architectures?",
    "options": [
      "When threads on different CPU cores modify independent variables that happen to reside on the same CPU cache line, causing costly cache coherence invalidations",
      "Sharing incorrect passwords",
      "A race condition in printing text",
      "Sharing memory between virtual machines"
    ],
    "correctAnswer": 0,
    "explanation": "Even with independent variables, sharing a 64-byte cache line causes CPU cores to bounce cache line ownership, crippling throughput."
  },
  {
    "id": "os-sch-01",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "easy",
    "question": "What is the primary role of the CPU Scheduler (Short-Term Scheduler)?",
    "options": [
      "Selects an available process from the Ready queue and assigns the CPU to it for execution",
      "Loads programs from hard drive into RAM",
      "Shuts down idle servers",
      "Manages database connections"
    ],
    "correctAnswer": 0,
    "explanation": "The short-term scheduler (dispatcher) executes frequently (every few milliseconds) allocating CPU time."
  },
  {
    "id": "os-sch-02",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "easy",
    "question": "What is the role of the Long-Term Scheduler (Job Scheduler)?",
    "options": [
      "Controls the degree of multiprogramming by selecting which submitted jobs are admitted into memory (Ready queue)",
      "Allocates CPU registers",
      "Manages long-term backups",
      "Runs once a year"
    ],
    "correctAnswer": 0,
    "explanation": "The long-term scheduler regulates system load by deciding how many processes reside in RAM."
  },
  {
    "id": "os-sch-03",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "easy",
    "question": "What is the difference between Preemptive and Non-Preemptive scheduling?",
    "options": [
      "Preemptive scheduling allows the OS to interrupt a running process to allocate CPU to another; Non-Preemptive lets the process hold the CPU until it yields or terminates",
      "Preemptive is for batch systems only",
      "Non-preemptive is faster on all CPUs",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Preemption enforces time slices and priority interrupts; non-preemptive requires processes to voluntarily release CPU."
  },
  {
    "id": "os-sch-04",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "easy",
    "question": "What is 'Turnaround Time' in scheduling metrics?",
    "options": [
      "The total time interval from process submission to its complete termination (Turnaround = Completion Time - Arrival Time)",
      "The time spent waiting in the ready queue",
      "The time taken to boot the OS",
      "The time taken to write to disk"
    ],
    "correctAnswer": 0,
    "explanation": "Turnaround Time measures end-to-end duration: Waiting Time + Execution (Burst) Time."
  },
  {
    "id": "os-sch-05",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "medium",
    "question": "What is 'Waiting Time' in scheduling metrics?",
    "options": [
      "The total cumulative time a process spends waiting in the Ready queue ready to execute",
      "The time taken to download files",
      "The time spent sleeping",
      "The time taken by the user to type input"
    ],
    "correctAnswer": 0,
    "explanation": "Waiting Time = Turnaround Time - Burst Time; measures how long a process sat idle waiting for CPU access."
  },
  {
    "id": "os-sch-06",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "medium",
    "question": "What is 'Response Time' in interactive operating systems?",
    "options": [
      "The time from process arrival/submission until the first response or execution output is produced",
      "The total time to complete the job",
      "The time taken to restart the computer",
      "The internet ping latency"
    ],
    "correctAnswer": 0,
    "explanation": "Response time measures responsiveness in GUI and interactive systems (first reaction time)."
  },
  {
    "id": "os-sch-07",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "medium",
    "question": "What is the Dispatcher's role in process scheduling?",
    "options": [
      "The module that gives control of the CPU to the process selected by the short-term scheduler, performing context switch and mode switch",
      "The program that deletes old files",
      "The program that compiles code",
      "The hardware bus controller"
    ],
    "correctAnswer": 0,
    "explanation": "The dispatcher performs the low-level mechanics: saving context, switching to user mode, and jumping to the program counter."
  },
  {
    "id": "os-sch-08",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "medium",
    "question": "What is 'Dispatch Latency'?",
    "options": [
      "The time required by the dispatcher to stop one process and start another running process",
      "The time taken to send a network packet",
      "The delay in mouse clicks",
      "The time to format a hard drive"
    ],
    "correctAnswer": 0,
    "explanation": "Dispatch latency is the pure operating system overhead incurred during every context switch."
  },
  {
    "id": "os-sch-09",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "hard",
    "question": "What is 'CPU-Bound' vs 'I/O-Bound' processes?",
    "options": [
      "CPU-bound processes spend most of their time performing intensive computation; I/O-bound processes spend most of their time waiting for I/O requests",
      "CPU-bound processes use no memory",
      "I/O-bound processes cannot use the CPU",
      "They are identical"
    ],
    "correctAnswer": 0,
    "explanation": "Good schedulers interleave CPU-bound and I/O-bound processes to keep both processors and I/O devices fully utilized."
  },
  {
    "id": "os-sch-10",
    "category": "operatingSystems",
    "topic": "Process Scheduling",
    "difficulty": "hard",
    "question": "What is 'Starvation' (Indefinite Blocking) in priority scheduling and how is it solved?",
    "options": [
      "Low-priority processes wait indefinitely because high-priority processes monopolize the CPU; solved by 'Aging' (gradually increasing priority over time)",
      "When a computer runs out of electricity",
      "When hard drives run out of sectors",
      "When RAM is 100% full"
    ],
    "correctAnswer": 0,
    "explanation": "Aging solves starvation by incrementing a process's priority the longer it waits in the Ready queue."
  },
  {
    "id": "os-alg-01",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "easy",
    "question": "How does the First-Come, First-Served (FCFS) scheduling algorithm operate?",
    "options": [
      "Processes are allocated the CPU in the strict order of their arrival in the Ready queue (FIFO)",
      "Processes are sorted by shortest execution time",
      "Processes with highest priority run first",
      "The OS picks processes randomly"
    ],
    "correctAnswer": 0,
    "explanation": "FCFS executes processes strictly by arrival order; it is non-preemptive and simple to implement."
  },
  {
    "id": "os-alg-02",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "easy",
    "question": "What is the 'Convoy Effect' in FCFS scheduling?",
    "options": [
      "Short I/O-bound processes get stuck waiting behind a long, heavy CPU-bound process, resulting in poor device utilization and high average waiting time",
      "Processes driving in a line",
      "A network routing loop",
      "A memory leak in FIFO queues"
    ],
    "correctAnswer": 0,
    "explanation": "Convoy effect mirrors slow trucks on a single-lane road: small processes stall behind massive CPU bursts."
  },
  {
    "id": "os-alg-03",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "easy",
    "question": "Which non-preemptive scheduling algorithm is mathematically proven to produce the minimum average waiting time for a given set of processes?",
    "options": [
      "Shortest Job First (SJF)",
      "First-Come First-Served (FCFS)",
      "Round Robin (RR)",
      "Priority Scheduling"
    ],
    "correctAnswer": 0,
    "explanation": "SJF schedules the shortest burst time first, minimizing cumulative queue wait times mathematically."
  },
  {
    "id": "os-alg-04",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "easy",
    "question": "What is the preemptive version of Shortest Job First (SJF) called?",
    "options": [
      "Shortest Remaining Time First (SRTF)",
      "Round Robin",
      "Priority Preemption",
      "Multilevel Queue"
    ],
    "correctAnswer": 0,
    "explanation": "SRTF preempts the currently executing process if a newly arriving process has a shorter remaining burst time."
  },
  {
    "id": "os-alg-05",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "medium",
    "question": "How does the Round Robin (RR) scheduling algorithm work?",
    "options": [
      "Each process is assigned a fixed small time slice (time quantum); when it expires, the process is preempted and moved to the back of the Ready queue",
      "Processes run in reverse alphabetical order",
      "Processes are scheduled by priority lottery",
      "The CPU switches processes every 10 seconds"
    ],
    "correctAnswer": 0,
    "explanation": "Round Robin provides fair, cyclic time-shared access optimal for interactive environments."
  },
  {
    "id": "os-alg-06",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "medium",
    "question": "What happens in Round Robin scheduling if the time quantum is set exceptionally LARGE (approaching infinity)?",
    "options": [
      "It degenerates into First-Come First-Served (FCFS) scheduling",
      "It becomes Shortest Job First",
      "The system crashes with stack overflow",
      "Context switching overhead increases 100x"
    ],
    "correctAnswer": 0,
    "explanation": "If the quantum exceeds all process burst lengths, processes finish without preemption, mirroring FCFS."
  },
  {
    "id": "os-alg-07",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "medium",
    "question": "What happens in Round Robin scheduling if the time quantum is set exceptionally SMALL (e.g. 1 microsecond)?",
    "options": [
      "Context switching overhead dominates CPU time (thrashing), drastically reducing useful throughput",
      "The system runs at infinite speed",
      "Waiting time becomes zero",
      "CPU utilization reaches 100%"
    ],
    "correctAnswer": 0,
    "explanation": "Excessively tiny quanta waste most CPU cycles swapping register states rather than executing user instructions."
  },
  {
    "id": "os-alg-08",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "hard",
    "question": "What is a 'Multilevel Feedback Queue' (MLFQ) scheduler?",
    "options": [
      "Multiple priority queues where processes dynamically move between queues based on their past execution behavior (e.g. CPU-bound processes drop in priority)",
      "A queue with multiple hard drives",
      "A queue that gives feedback to developers",
      "A single FIFO queue with threads"
    ],
    "correctAnswer": 0,
    "explanation": "MLFQ prioritizes short interactive jobs while penalizing long compute-bound jobs without requiring ahead-of-time burst knowledge."
  },
  {
    "id": "os-alg-09",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "hard",
    "question": "What is the Completely Fair Scheduler (CFS) used in the modern Linux kernel?",
    "options": [
      "A scheduler using a red-black tree to track 'vruntime' (virtual runtime), always picking the task that has received the least CPU time",
      "A scheduler based on simple Round Robin",
      "A scheduler that gives root 100% CPU",
      "A random lottery scheduler"
    ],
    "correctAnswer": 0,
    "explanation": "CFS models an ideal multi-tasking CPU on hardware by balancing vruntime using self-balancing red-black trees in O(log N)."
  },
  {
    "id": "os-alg-10",
    "category": "operatingSystems",
    "topic": "CPU Scheduling Algorithms",
    "difficulty": "hard",
    "question": "Given: P1 (burst 10), P2 (burst 4), P3 (burst 2) arriving at time 0. Under SJF (non-preemptive), what is the average waiting time?",
    "options": [
      "(0 + 2 + 6) / 3 = 8 / 3 = 2.67",
      "5.33",
      "7.0",
      "4.0"
    ],
    "correctAnswer": 0,
    "explanation": "Execution order: P3 (runs 0-2, wait=0), P2 (runs 2-6, wait=2), P1 (runs 6-16, wait=6). Avg wait = (0 + 2 + 6) / 3 = 2.67."
  },
  {
    "id": "os-syn-01",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "easy",
    "question": "What is the 'Critical Section' in concurrent programming?",
    "options": [
      "A segment of code accessing shared resources (variables, memory, hardware) that must not be executed concurrently by more than one process at a time",
      "The main() function of an operating system",
      "The memory sector where the kernel resides",
      "A dangerous hardware failure"
    ],
    "correctAnswer": 0,
    "explanation": "Critical sections mutate shared state; concurrent entry produces race conditions."
  },
  {
    "id": "os-syn-02",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "easy",
    "question": "What are the three essential requirements to solve the Critical Section Problem?",
    "options": [
      "Mutual Exclusion, Progress, and Bounded Waiting",
      "Speed, Accuracy, and Redundancy",
      "Atomicity, Consistency, and Durability",
      "Locking, Unlocking, and Aborting"
    ],
    "correctAnswer": 0,
    "explanation": "Solutions must ensure only one process enters (Mutual Exclusion), decisions aren't stalled (Progress), and wait time is bounded."
  },
  {
    "id": "os-syn-03",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "easy",
    "question": "What does 'Mutual Exclusion' guarantee in process synchronization?",
    "options": [
      "If process P is executing in its critical section, no other process is allowed to execute in their critical section simultaneously",
      "All processes finish at the same time",
      "Processes share all variables equally",
      "Processes cannot be interrupted"
    ],
    "correctAnswer": 0,
    "explanation": "Mutual exclusion guarantees exclusive single-party access to shared critical resources."
  },
  {
    "id": "os-syn-04",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "easy",
    "question": "What is 'Bounded Waiting' in synchronization criteria?",
    "options": [
      "There must be a limit on the number of times other processes are allowed to enter their critical sections after a process has requested entry",
      "Waiting for at most 10 seconds",
      "Waiting on a bounded array",
      "Pausing a thread indefinitely"
    ],
    "correctAnswer": 0,
    "explanation": "Bounded waiting prevents starvation by guaranteeing that an interested process will eventually gain access."
  },
  {
    "id": "os-syn-05",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "medium",
    "question": "What is Peterson's Algorithm in synchronization theory?",
    "options": [
      "A classic software-based synchronization algorithm that achieves mutual exclusion for two processes using shared turn and flag variables",
      "An algorithm for sorting files",
      "A network routing algorithm",
      "An encryption algorithm"
    ],
    "correctAnswer": 0,
    "explanation": "Peterson's solution provides a verified two-process mutual exclusion proof satisfying all three synchronization criteria."
  },
  {
    "id": "os-syn-06",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "medium",
    "question": "What is an atomic CPU hardware instruction like 'Test-and-Set' or 'Compare-and-Swap' (CAS)?",
    "options": [
      "An indivisible, non-interruptible hardware instruction that reads, tests, and modifies a memory location in a single atomic clock cycle",
      "An instruction that tests if the CPU is hot",
      "An instruction that runs in kernel mode only",
      "A compiler macro"
    ],
    "correctAnswer": 0,
    "explanation": "Atomic hardware primitives (like CAS) form the foundation upon which lock-free data structures and OS mutexes are built."
  },
  {
    "id": "os-syn-07",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "medium",
    "question": "What is 'Spinlock' and what is its primary drawback?",
    "options": [
      "A lock where a thread repeatedly polls/loops in a busy-wait checking for lock availability; wastes CPU cycles while waiting",
      "A lock that spins the hard drive",
      "A lock that causes crashes",
      "A lock used for sorting"
    ],
    "correctAnswer": 0,
    "explanation": "Spinlocks avoid context switch latency but consume 100% CPU core capacity during busy-waiting."
  },
  {
    "id": "os-syn-08",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "medium",
    "question": "When is a Spinlock preferable over a sleeping Mutex?",
    "options": [
      "In multi-core systems where the critical section is extremely short, and the cost of busy-waiting is less than the overhead of two context switches",
      "On single-core processors",
      "When critical sections take 10 seconds",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "If the lock is held for mere nanoseconds, spinning avoids the expensive sleep/wake context switch latency."
  },
  {
    "id": "os-syn-09",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "hard",
    "question": "What is the 'Producer-Consumer' (Bounded-Buffer) problem?",
    "options": [
      "A classic synchronization problem where a producer generates data into a fixed-size buffer and a consumer consumes it without buffer overflow or underflow",
      "A manufacturing supply chain software",
      "A database query problem",
      "A compiler optimization error"
    ],
    "correctAnswer": 0,
    "explanation": "Requires coordinating empty, full, and mutex semaphores so producers sleep when full and consumers sleep when empty."
  },
  {
    "id": "os-syn-10",
    "category": "operatingSystems",
    "topic": "Synchronization",
    "difficulty": "hard",
    "question": "What is the 'Dining Philosophers' problem designed to illustrate?",
    "options": [
      "Deadlock and resource starvation challenges when concurrent processes compete for multiple shared non-shareable resources (chopsticks)",
      "Table manners in software companies",
      "An ancient Greek algorithm",
      "A memory allocation problem in C"
    ],
    "correctAnswer": 0,
    "explanation": "Edsger Dijkstra formulated the Dining Philosophers problem to demonstrate deadlock emergence from circular wait conditions."
  },
  {
    "id": "os-sem-01",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "easy",
    "question": "What is a Mutex (Mutual Exclusion Object)?",
    "options": [
      "A locking mechanism with ownership semantics: only the thread that locked (acquired) the mutex is allowed to unlock (release) it",
      "A semaphore with value 10",
      "A thread scheduler",
      "A shared memory variable"
    ],
    "correctAnswer": 0,
    "explanation": "Mutexes enforce strict ownership; the acquiring thread is the sole entity authorized to release the lock."
  },
  {
    "id": "os-sem-02",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "easy",
    "question": "What is a Semaphore in operating systems?",
    "options": [
      "A synchronization integer variable accessed exclusively through two standard atomic operations: wait() [P] and signal() [V]",
      "A network flag",
      "A file permission system",
      "A hardware switch on servers"
    ],
    "correctAnswer": 0,
    "explanation": "Dijkstra's semaphore maintains an integer counter tracking available shared resource units."
  },
  {
    "id": "os-sem-03",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "easy",
    "question": "What does the atomic 'wait()' (or P / sem_wait) operation do on a semaphore S?",
    "options": [
      "Decrements S; if S becomes negative (or was 0), the calling process blocks until S is incremented by a signal()",
      "Increments S by 1",
      "Multiplies S by 2",
      "Deletes the semaphore"
    ],
    "correctAnswer": 0,
    "explanation": "wait() decrements the resource count and blocks if no resource units are currently available."
  },
  {
    "id": "os-sem-04",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "easy",
    "question": "What does the atomic 'signal()' (or V / sem_post) operation do on a semaphore S?",
    "options": [
      "Increments S; if any processes were blocked waiting on S, one is unblocked and moved to Ready state",
      "Decrements S",
      "Terminates the calling process",
      "Locks the database"
    ],
    "correctAnswer": 0,
    "explanation": "signal() releases a resource unit and wakes up an awaiting blocked thread."
  },
  {
    "id": "os-sem-05",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "medium",
    "question": "What is the fundamental difference between a Mutex and a Binary Semaphore?",
    "options": [
      "A Mutex has ownership (only the locker can unlock); a Binary Semaphore has no ownership and can be signaled by any thread (signaling mechanism)",
      "A Mutex can take any integer value",
      "A Binary Semaphore is faster in all compilers",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Mutexes protect shared state via ownership; semaphores coordinate inter-thread execution signaling."
  },
  {
    "id": "os-sem-06",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "medium",
    "question": "What is a 'Counting Semaphore' used for?",
    "options": [
      "Controlling access to a finite pool of identical shared resource units (initialized to count N)",
      "Counting the number of lines of code",
      "Counting CPU clock cycles",
      "Timing loop execution"
    ],
    "correctAnswer": 0,
    "explanation": "Counting semaphores manage finite resource pools (e.g. database connection pool initialized to 10 connections)."
  },
  {
    "id": "os-sem-07",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "medium",
    "question": "What is 'Priority Inversion' in real-time operating systems?",
    "options": [
      "A high-priority task is blocked waiting for a resource held by a low-priority task, while medium-priority tasks preempt the low-priority task, indirectly starving the high-priority task",
      "Reversing priority numbers in code",
      "When a low-priority process runs first",
      "A scheduler crash"
    ],
    "correctAnswer": 0,
    "explanation": "Infamous Mars Pathfinder incident: medium tasks preempted a low task holding a mutex needed by a high task."
  },
  {
    "id": "os-sem-08",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "medium",
    "question": "How does the 'Priority Inheritance Protocol' resolve Priority Inversion?",
    "options": [
      "The low-priority task holding the shared lock temporarily inherits the highest priority of any task waiting on that lock until it releases it",
      "By killing the low-priority task",
      "By disabling all interrupts",
      "By running all tasks at priority 0"
    ],
    "correctAnswer": 0,
    "explanation": "Priority inheritance boosts the lock holder's priority, preventing medium tasks from preempting it until release."
  },
  {
    "id": "os-sem-09",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "hard",
    "question": "What is a 'Monitor' in high-level languages like Java?",
    "options": [
      "A synchronization construct encapsulating shared variables and procedures, allowing only one thread to be active inside the monitor at any given time (synchronized methods)",
      "A computer display screen",
      "An antivirus monitoring tool",
      "A performance profiler"
    ],
    "correctAnswer": 0,
    "explanation": "Monitors bundle mutual exclusion and condition variables (wait/notify) into clean language-level abstractions."
  },
  {
    "id": "os-sem-10",
    "category": "operatingSystems",
    "topic": "Mutex & Semaphore",
    "difficulty": "hard",
    "question": "What are Condition Variables (wait(), notify(), notifyAll()) used for inside monitors?",
    "options": [
      "Allowing a thread to atomically release the monitor lock and sleep until another thread signals that a specific condition has become true",
      "Checking if statements in C",
      "Setting screen brightness",
      "Monitoring memory leaks"
    ],
    "correctAnswer": 0,
    "explanation": "Condition variables provide inter-thread signaling inside locks, avoiding inefficient busy-waiting polling."
  },
  {
    "id": "os-dlk-01",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "What is a Deadlock in an Operating System?",
    "options": [
      "A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process in the set",
      "A computer that cannot boot",
      "A locked screen saver",
      "A process that consumes 100% CPU"
    ],
    "correctAnswer": 0,
    "explanation": "Deadlock occurs when processes enter permanent mutual waiting for non-shareable resources held by each other."
  },
  {
    "id": "os-dlk-02",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "What are the Four Coffman Conditions that MUST hold simultaneously for a deadlock to occur?",
    "options": [
      "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      "Read, Write, Execute, Delete",
      "Atomicity, Consistency, Isolation, Durability",
      "New, Ready, Running, Terminated"
    ],
    "correctAnswer": 0,
    "explanation": "Coffman's 4 conditions are necessary and sufficient: breaking any one condition prevents deadlocks."
  },
  {
    "id": "os-dlk-03",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "What does the 'Hold and Wait' condition mean in deadlock theory?",
    "options": [
      "A process is holding at least one resource and is actively waiting to acquire additional resources held by other processes",
      "A user holding down the power button",
      "A thread sleeping for 5 seconds",
      "Holding a file in temporary cache"
    ],
    "correctAnswer": 0,
    "explanation": "Hold-and-wait means processes retain existing allocations while requesting new contended allocations."
  },
  {
    "id": "os-dlk-04",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "What does the 'No Preemption' condition mean?",
    "options": [
      "Resources cannot be forcibly confiscated from a process; they can only be released voluntarily by the holding process after task completion",
      "Processes cannot be killed by administrators",
      "The CPU scheduler has no priority",
      "A thread cannot be paused"
    ],
    "correctAnswer": 0,
    "explanation": "Non-preemption prevents the operating system from seizing held resources to break contention."
  },
  {
    "id": "os-dlk-05",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "easy",
    "question": "What does the 'Circular Wait' condition mean?",
    "options": [
      "A closed chain of processes P0, P1... Pn exists such that P0 waits for a resource held by P1, P1 waits for P2... and Pn waits for P0",
      "A while loop that never ends",
      "A circular linked list in memory",
      "A round robin scheduling queue"
    ],
    "correctAnswer": 0,
    "explanation": "Circular wait represents the closed cyclic dependency graph forming the deadlock."
  },
  {
    "id": "os-dlk-06",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "How can the 'Circular Wait' condition be prevented system-wide?",
    "options": [
      "Impose a strict global numerical ordering on all resource types and require processes to request resources only in strictly increasing order",
      "Eliminate all mutual exclusion locks",
      "Restart the OS every hour",
      "Never allow more than 1 process to run"
    ],
    "correctAnswer": 0,
    "explanation": "Havender's resource ordering theorem proves that strictly increasing request orderings mathematically preclude cycles."
  },
  {
    "id": "os-dlk-07",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "What is the 'Ostrich Algorithm' used by general-purpose operating systems (like Linux and Windows) for deadlocks?",
    "options": [
      "Stick your head in the sand: ignore deadlocks under the assumption that they occur rarely and the cost of prevention is too high",
      "Run away from deadlocks",
      "An algorithm designed in Australia",
      "A fast bird sorting algorithm"
    ],
    "correctAnswer": 0,
    "explanation": "General-purpose OSes favor performance and convenience over heavy deadlock prevention, relying on manual user/admin reboot."
  },
  {
    "id": "os-dlk-08",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "medium",
    "question": "What is Dijkstra's 'Banker's Algorithm' used for?",
    "options": [
      "Deadlock Avoidance: tests for safety before granting resource allocations to guarantee the system never transitions into an unsafe state",
      "Calculating compound interest in banks",
      "Managing banking databases",
      "A secure encryption cipher"
    ],
    "correctAnswer": 0,
    "explanation": "The Banker's algorithm checks if a safe execution sequence exists across maximum demand matrices before allocating."
  },
  {
    "id": "os-dlk-09",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "hard",
    "question": "What is a 'Safe State' in deadlock avoidance?",
    "options": [
      "A state where there exists at least one sequence <P1, P2... Pn> such that each process can satisfy its maximum resource needs and complete safely",
      "A state where the computer is turned off",
      "A state where no locks exist",
      "A backup state on disk"
    ],
    "correctAnswer": 0,
    "explanation": "A safe state guarantees that all processes can eventually complete without entering deadlock."
  },
  {
    "id": "os-dlk-10",
    "category": "operatingSystems",
    "topic": "Deadlocks",
    "difficulty": "hard",
    "question": "In a Resource Allocation Graph (RAG), does the presence of a cycle guarantee a deadlock?",
    "options": [
      "If every resource type has only a SINGLE instance, a cycle guarantees deadlock; if resources have MULTIPLE instances, a cycle indicates potential deadlock but not certainty",
      "Yes, cycles always guarantee deadlock in all cases",
      "No, cycles have nothing to do with deadlocks",
      "Only on single-core systems"
    ],
    "correctAnswer": 0,
    "explanation": "With multi-instance resources, a cycle is necessary but not sufficient (other instances outside the cycle can resolve it)."
  },
  {
    "id": "os-mm-01",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "easy",
    "question": "What is the primary function of the Memory Management Unit (MMU) hardware chip?",
    "options": [
      "Translates virtual (logical) memory addresses generated by the CPU into physical addresses in physical RAM chips",
      "Cools down the RAM chips",
      "Deletes temporary files",
      "Controls keyboard input"
    ],
    "correctAnswer": 0,
    "explanation": "The MMU hardware intercepts CPU memory references and translates virtual addresses using page tables."
  },
  {
    "id": "os-mm-02",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "easy",
    "question": "What is the difference between Logical (Virtual) Address and Physical Address?",
    "options": [
      "Logical address is generated by the CPU during program execution; Physical address is the actual hardware address pin location in RAM chips",
      "Logical address is for disk; Physical address is for RAM",
      "There is no difference",
      "Physical addresses are generated by the compiler"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual addresses isolate processes from physical memory layouts, providing contiguous abstraction over fragmented RAM."
  },
  {
    "id": "os-mm-03",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "easy",
    "question": "What is 'Internal Fragmentation'?",
    "options": [
      "Unused wasted memory space inside an allocated fixed-size block or page (e.g. allocating a 4KB page for a 1KB process)",
      "Memory wasted outside partitions",
      "A corrupted hard drive sector",
      "A memory leak in a loop"
    ],
    "correctAnswer": 0,
    "explanation": "Internal fragmentation occurs when allocated blocks are larger than requested payloads."
  },
  {
    "id": "os-mm-04",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "easy",
    "question": "What is 'External Fragmentation'?",
    "options": [
      "Total memory space exists to satisfy a request, but it is fragmented into non-contiguous small holes, so no single contiguous block fits",
      "Wasted memory inside a page",
      "RAM plugged outside the computer",
      "Memory leaked to the internet"
    ],
    "correctAnswer": 0,
    "explanation": "External fragmentation occurs in contiguous variable-partition allocation as processes enter and exit."
  },
  {
    "id": "os-mm-05",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "easy",
    "question": "How is External Fragmentation eliminated in modern operating systems?",
    "options": [
      "By using Paging (non-contiguous memory allocation) or Compaction",
      "By turning off virtual memory",
      "By rebooting every hour",
      "By using only 1 process"
    ],
    "correctAnswer": 0,
    "explanation": "Paging divides physical memory into fixed frames, allowing non-contiguous allocation and eliminating external fragmentation."
  },
  {
    "id": "os-mm-06",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "medium",
    "question": "What are the three common dynamic memory allocation placement strategies for contiguous partitions?",
    "options": [
      "First-Fit, Best-Fit, and Worst-Fit",
      "Top-Fit, Bottom-Fit, and Middle-Fit",
      "Fast-Fit, Slow-Fit, and Fair-Fit",
      "Linear-Fit, Binary-Fit, and Quick-Fit"
    ],
    "correctAnswer": 0,
    "explanation": "First-Fit allocates the first hole that is big enough; Best-Fit finds the smallest adequate hole; Worst-Fit picks the largest."
  },
  {
    "id": "os-mm-07",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "medium",
    "question": "What is 'Swapping' in memory management?",
    "options": [
      "Moving an entire process temporarily from RAM to secondary backing storage (swap partition/pagefile) to free RAM for active processes",
      "Swapping two variables in code",
      "Exchanging CPU cores between processes",
      "Replacing a RAM stick"
    ],
    "correctAnswer": 0,
    "explanation": "Swapping rolls idle processes out to disk to regulate the degree of multiprogramming."
  },
  {
    "id": "os-mm-08",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "medium",
    "question": "What is 'Dynamic Loading'?",
    "options": [
      "Routines/functions are loaded into memory only when they are called during execution, conserving RAM space",
      "Loading web pages dynamically with AJAX",
      "Overclocking RAM dynamically",
      "Compiling code while typing"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic loading keeps infrequently used error handlers or modules on disk until invoked."
  },
  {
    "id": "os-mm-09",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "hard",
    "question": "What is 'Overlays' used in legacy memory-constrained computing?",
    "options": [
      "Allowing a program to be larger than physical memory by manually keeping in memory only the instructions and data needed at a given time",
      "Displaying HUD graphics over a game",
      "Virtual reality goggles",
      "A compiler optimization"
    ],
    "correctAnswer": 0,
    "explanation": "Before virtual memory, developers designed manual overlay structures to swap code modules in and out of fixed memory buffers."
  },
  {
    "id": "os-mm-10",
    "category": "operatingSystems",
    "topic": "Memory Management",
    "difficulty": "hard",
    "question": "What is the 'Buddy System' memory allocation algorithm?",
    "options": [
      "An allocation technique that partitions memory into power-of-two block sizes and coalesces adjacent freed buddy blocks back into larger blocks",
      "Two developers coding together",
      "A backup server system",
      "A file compression algorithm"
    ],
    "correctAnswer": 0,
    "explanation": "The Buddy allocator splits and merges 2^K blocks quickly using bitwise address arithmetic, balancing internal fragmentation and speed."
  },
  {
    "id": "os-pag-01",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "easy",
    "question": "What is Paging in operating systems?",
    "options": [
      "A memory management scheme that stores process memory in fixed-size blocks called Pages, mapped to physical memory blocks called Frames",
      "Reading a book page by page",
      "Scrolling down a web page",
      "Splitting code across files"
    ],
    "correctAnswer": 0,
    "explanation": "Paging divides logical memory into Pages and physical memory into identical Frames, enabling non-contiguous allocation."
  },
  {
    "id": "os-pag-02",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "easy",
    "question": "What is the difference between a 'Page' and a 'Frame'?",
    "options": [
      "A Page is a fixed-size block of logical (virtual) memory; a Frame is a fixed-size block of physical hardware RAM",
      "A Page is on disk, a Frame is on CPU",
      "Frames are twice as large as Pages",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Pages and Frames are identical in byte size (commonly 4KB); pages belong to virtual space, frames to physical RAM."
  },
  {
    "id": "os-pag-03",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "easy",
    "question": "What is a 'Page Table'?",
    "options": [
      "A per-process kernel data structure that maps each logical page number to its corresponding physical frame number in RAM",
      "A table in an SQL database",
      "A list of book pages",
      "A hardware bus register"
    ],
    "correctAnswer": 0,
    "explanation": "The page table maintains the mapping between process virtual pages and physical frame addresses."
  },
  {
    "id": "os-pag-04",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "easy",
    "question": "How is a virtual memory address partitioned in a standard paging architecture?",
    "options": [
      "Into a Page Number (p) and a Page Offset (d)",
      "Into a Row and a Column",
      "Into an X and Y coordinate",
      "Into an IP and Port"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual address = (Page Number << Offset Bits) | Offset; the page number indexes the page table."
  },
  {
    "id": "os-pag-05",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "medium",
    "question": "If page size is 4KB (2^12 bytes), how many bits of a virtual address are used for the Offset (d)?",
    "options": [
      "12 bits",
      "4 bits",
      "16 bits",
      "32 bits"
    ],
    "correctAnswer": 0,
    "explanation": "4KB = 4096 bytes = 2^12 bytes. Therefore, 12 bits are required to address every individual byte within a 4KB page."
  },
  {
    "id": "os-pag-06",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "medium",
    "question": "What is the Translation Lookaside Buffer (TLB)?",
    "options": [
      "A high-speed associative hardware cache on the CPU chip that stores recent virtual-to-physical page translations to avoid page table lookups in RAM",
      "A temporary file buffer on disk",
      "A keyboard buffer",
      "An operating system log"
    ],
    "correctAnswer": 0,
    "explanation": "The TLB caches page-to-frame translations; a TLB hit resolves addresses in sub-nanosecond CPU clock cycles."
  },
  {
    "id": "os-pag-07",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "medium",
    "question": "What is a 'TLB Miss'?",
    "options": [
      "When the requested page number is not found in the TLB cache, forcing the hardware page table walker to fetch the translation from RAM",
      "A broken CPU chip",
      "A syntax error in assembly",
      "When virtual memory is disabled"
    ],
    "correctAnswer": 0,
    "explanation": "On a TLB miss, the MMU accesses the page table in memory, incurring an Effective Access Time penalty."
  },
  {
    "id": "os-pag-08",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "medium",
    "question": "What is a 'Multi-Level Page Table' (Hierarchical Paging)?",
    "options": [
      "Paging the page table itself (e.g. 4-level paging in x86-64) to avoid allocating enormous contiguous page tables in physical RAM for sparse address spaces",
      "A table with multiple columns",
      "A database table with indexes",
      "A hardware cache on the motherboard"
    ],
    "correctAnswer": 0,
    "explanation": "64-bit systems use 4 or 5-level page tables, dynamically allocating only the sub-tables currently mapped."
  },
  {
    "id": "os-pag-09",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "hard",
    "question": "What is an 'Inverted Page Table'?",
    "options": [
      "A global page table that has one entry per physical frame in RAM rather than per logical page, indexing by (PID, Page Number)",
      "A page table written backwards",
      "A page table stored on disk",
      "A page table for upside-down text"
    ],
    "correctAnswer": 0,
    "explanation": "Inverted page tables bound page table memory to physical RAM size, using hashing to resolve lookups."
  },
  {
    "id": "os-pag-10",
    "category": "operatingSystems",
    "topic": "Paging",
    "difficulty": "hard",
    "question": "What is the Effective Access Time (EAT) formula given TLB hit ratio α, TLB lookup time t, and main memory access time m?",
    "options": [
      "EAT = α * (t + m) + (1 - α) * (t + 2m)",
      "EAT = α * t + m",
      "EAT = 2m / α",
      "EAT = t + m"
    ],
    "correctAnswer": 0,
    "explanation": "On hit: t + m (TLB + 1 RAM access). On miss: t + m (page table lookup) + m (actual data fetch) = t + 2m."
  },
  {
    "id": "os-seg-01",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "easy",
    "question": "What is Segmentation in memory management?",
    "options": [
      "A memory management scheme that supports the programmer's view of memory by dividing it into variable-sized logical segments (Code, Stack, Heap, Data)",
      "Dividing memory into fixed 4KB blocks",
      "Splitting an array into two halves",
      "Formatting a hard drive"
    ],
    "correctAnswer": 0,
    "explanation": "Segmentation divides address space into variable-length semantic units reflecting program modules (main, functions, stack)."
  },
  {
    "id": "os-seg-02",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "easy",
    "question": "How is a logical address specified in a segmented memory architecture?",
    "options": [
      "A two-tuple: <Segment Number, Offset>",
      "A single 32-bit integer",
      "A row and column",
      "An IP address"
    ],
    "correctAnswer": 0,
    "explanation": "Logical addresses designate the segment number and the displacement offset within that segment."
  },
  {
    "id": "os-seg-03",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "easy",
    "question": "What is a 'Segment Table'?",
    "options": [
      "A table mapping each segment number to its physical base address in memory and its segment limit (length)",
      "A table of user passwords",
      "A hardware bus controller",
      "A list of open files"
    ],
    "correctAnswer": 0,
    "explanation": "Each entry contains Base (starting physical memory address) and Limit (length of the segment)."
  },
  {
    "id": "os-seg-04",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "easy",
    "question": "What happens if a process requests an offset that is greater than or equal to the segment limit (offset >= limit)?",
    "options": [
      "A hardware trap is generated: Segmentation Fault (addressing out of bounds)",
      "The limit is automatically increased",
      "The offset wraps around to 0",
      "A warning is logged and execution continues"
    ],
    "correctAnswer": 0,
    "explanation": "The MMU checks if offset < limit; exceeding the boundary triggers a segmentation trap."
  },
  {
    "id": "os-seg-05",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "medium",
    "question": "What is the primary difference between Paging and Segmentation?",
    "options": [
      "Paging uses fixed-size blocks invisible to the programmer (no external fragmentation); Segmentation uses variable-size logical blocks matching code structure (suffers from external fragmentation)",
      "Paging suffers from external fragmentation; segmentation does not",
      "Paging is only for 16-bit systems",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Paging is physical and fixed-size; segmentation is logical, variable-size, and prone to external fragmentation."
  },
  {
    "id": "os-seg-06",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "medium",
    "question": "What is 'Paged Segmentation' (Segmented Paging)?",
    "options": [
      "A hybrid approach where logical memory is divided into semantic segments, and each segment is internally divided into fixed-size pages",
      "A combination of hard drives and tapes",
      "Printing pages of code",
      "A compiler error"
    ],
    "correctAnswer": 0,
    "explanation": "Paged segmentation combines logical modularity with the non-contiguous, external-fragmentation-free benefits of paging."
  },
  {
    "id": "os-seg-07",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "medium",
    "question": "How does segmentation facilitate memory protection and sharing?",
    "options": [
      "Different segments can have distinct protection bits (e.g. Code is Read-Only/Execute, Stack is Read/Write) and can be shared across processes",
      "By encrypting all segments",
      "By isolating the CPU",
      "By turning off virtual memory"
    ],
    "correctAnswer": 0,
    "explanation": "Because segments correspond to logical modules (shared libraries), sharing and access flags map naturally to segments."
  },
  {
    "id": "os-seg-08",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "medium",
    "question": "What type of fragmentation can occur in pure Segmentation without paging?",
    "options": [
      "External Fragmentation (free memory fragmented into small non-contiguous gaps between variable-sized segments)",
      "Internal Fragmentation only",
      "Zero fragmentation",
      "Database fragmentation"
    ],
    "correctAnswer": 0,
    "explanation": "Variable segment lengths lead to external fragmentation as segments are allocated and deallocated."
  },
  {
    "id": "os-seg-09",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "hard",
    "question": "In the Intel x86 architecture, what are the primary segment registers?",
    "options": [
      "CS (Code Segment), DS (Data Segment), SS (Stack Segment), ES, FS, GS",
      "R1, R2, R3, R4",
      "PC, IR, MAR, MBR",
      "EAX, EBX, ECX, EDX"
    ],
    "correctAnswer": 0,
    "explanation": "x86 legacy architecture uses CS, DS, SS, ES, FS, and GS segment registers for address translation."
  },
  {
    "id": "os-seg-10",
    "category": "operatingSystems",
    "topic": "Segmentation",
    "difficulty": "hard",
    "question": "Why did modern 64-bit operating systems (Linux/Windows x86-64) largely deprecate pure segmentation in favor of flat paging?",
    "options": [
      "x86-64 long mode enforces a flat 64-bit address space (base=0, limit=unlimited for CS/DS/SS), relying on hardware page tables for protection",
      "Segmentation was proven mathematically impossible",
      "Processors cannot execute segments",
      "Because hard drives became too fast"
    ],
    "correctAnswer": 0,
    "explanation": "Hardware-level multi-level paging provides superior protection and memory virtualization without segmentation overhead."
  },
  {
    "id": "os-vm-01",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "easy",
    "question": "What is Virtual Memory in an Operating System?",
    "options": [
      "A technique that allows the execution of processes that are not completely in physical memory, abstracting main memory into an extremely large, uniform storage array",
      "RAM downloaded from the internet",
      "A virtual reality simulation",
      "A backup battery for RAM"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual memory decouples user logical address space from physical RAM, allowing programs larger than physical memory to execute."
  },
  {
    "id": "os-vm-02",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "easy",
    "question": "What is 'Demand Paging'?",
    "options": [
      "Pages are loaded into physical RAM only when they are actually demanded (referenced) during program execution, rather than pre-loading the entire binary",
      "Demanding more RAM from the user",
      "Paging without a page table",
      "Writing pages to disk every second"
    ],
    "correctAnswer": 0,
    "explanation": "Demand paging loads pages lazily, saving physical memory and accelerating process startup times."
  },
  {
    "id": "os-vm-03",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "easy",
    "question": "What is a 'Page Fault'?",
    "options": [
      "A hardware interrupt/trap raised by the MMU when a program accesses a virtual page marked 'invalid' (not currently loaded in physical RAM)",
      "A broken page on the hard drive",
      "A syntax error in code",
      "When a page table is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "A page fault signals that the referenced page resides in secondary backing swap storage and must be paged in."
  },
  {
    "id": "os-vm-04",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "medium",
    "question": "What are the sequential steps taken by the OS to service a Page Fault?",
    "options": [
      "1. Trap to OS -> 2. Save registers -> 3. Locate page on disk -> 4. Read page into free frame -> 5. Update page table (valid bit) -> 6. Restart interrupted instruction",
      "1. Terminate process -> 2. Reboot OS",
      "1. Delete page -> 2. Allocate heap",
      "1. Clear RAM -> 2. Run garbage collection"
    ],
    "correctAnswer": 0,
    "explanation": "The OS kernel handles page faults transparently: reads from backing store, updates the page table, and re-executes the faulting instruction."
  },
  {
    "id": "os-vm-05",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "medium",
    "question": "What is the 'Valid-Invalid Bit' in a page table entry?",
    "options": [
      "A status bit indicating whether the page is currently loaded in physical RAM ('valid') or resides on disk/unmapped ('invalid')",
      "Checks if the process has expired",
      "Checks if data is encrypted",
      "A parity check bit"
    ],
    "correctAnswer": 0,
    "explanation": "The valid bit indicates whether the page is resident in physical memory; accessing an invalid entry triggers a page fault."
  },
  {
    "id": "os-vm-06",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "medium",
    "question": "What is 'Thrashing' in an operating system?",
    "options": [
      "A catastrophic state where the system spends more time servicing page faults and swapping pages in/out of disk than executing useful user instructions",
      "Deleting files rapidly",
      "Overclocking the CPU",
      "A hardware fan failure"
    ],
    "correctAnswer": 0,
    "explanation": "Thrashing occurs when active processes exceed physical RAM, causing continuous page faulting and collapsing throughput."
  },
  {
    "id": "os-vm-07",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "medium",
    "question": "How can the operating system eliminate or prevent Thrashing?",
    "options": [
      "Using the Working Set Model or Page-Fault Frequency (PFF) strategy to suspend/swap out low-priority processes when demand exceeds frames",
      "By buying more monitors",
      "By turning off the page table",
      "By disabling all interrupts"
    ],
    "correctAnswer": 0,
    "explanation": "The Working Set Model monitors process locality; if total working set exceeds available frames, processes are swapped out."
  },
  {
    "id": "os-vm-08",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "hard",
    "question": "What is the 'Working Set Model' of a process?",
    "options": [
      "The set of pages referenced by a process during the most recent working-set time window Δ, approximating its current locality of reference",
      "The list of employees working on code",
      "The files open in an IDE",
      "A database transaction batch"
    ],
    "correctAnswer": 0,
    "explanation": "Peter Denning's working set model dynamically sizes memory allocation to match temporal and spatial locality."
  },
  {
    "id": "os-vm-09",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "hard",
    "question": "What is the 'Dirty Bit' (Modified Bit) in a page table entry used for?",
    "options": [
      "Indicates whether a page has been modified in memory since being loaded, avoiding redundant disk writes if the page was only read",
      "Flags viruses in memory",
      "Marks deleted pages",
      "Indicates memory hardware errors"
    ],
    "correctAnswer": 0,
    "explanation": "If the dirty bit is 0, the frame can be evicted immediately without writing back to disk, halving page replacement cost."
  },
  {
    "id": "os-vm-10",
    "category": "operatingSystems",
    "topic": "Virtual Memory",
    "difficulty": "hard",
    "question": "What is 'Memory-Mapped File I/O' (e.g. mmap() in POSIX)?",
    "options": [
      "Mapping a disk file directly into the process's virtual address space, allowing file reads and writes to be performed via direct memory pointer access rather than read()/write() system calls",
      "Printing file names to screen",
      "Converting files to image maps",
      "Storing files on GPU memory"
    ],
    "correctAnswer": 0,
    "explanation": "mmap() treats file I/O as virtual memory accesses, leveraging page cache and demand paging for high-performance I/O."
  },
  {
    "id": "os-rep-01",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "easy",
    "question": "What is the primary goal of a Page Replacement Algorithm?",
    "options": [
      "To select which resident frame to evict to disk when a new page must be brought into a full physical memory, minimizing total page faults",
      "To replace broken RAM sticks",
      "To format the hard drive",
      "To sort virtual pages alphabetically"
    ],
    "correctAnswer": 0,
    "explanation": "Page replacement algorithms minimize disk I/O by predicting which pages are least likely to be needed soon."
  },
  {
    "id": "os-rep-02",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "easy",
    "question": "How does the First-In, First-Out (FIFO) page replacement algorithm operate?",
    "options": [
      "Evicts the oldest page that was loaded into memory first, regardless of how recently it was accessed",
      "Evicts the newest page",
      "Evicts the smallest page",
      "Evicts pages randomly"
    ],
    "correctAnswer": 0,
    "explanation": "FIFO maintains a queue of frames, evicting the oldest resident page upon a page fault."
  },
  {
    "id": "os-rep-03",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "easy",
    "question": "What is 'Belady's Anomaly'?",
    "options": [
      "A counterintuitive phenomenon in FIFO page replacement where increasing the number of allocated physical frames leads to an INCREASE in the number of page faults",
      "A memory leak in Russian computers",
      "An algorithm that never faults",
      "A hardware CPU bug"
    ],
    "correctAnswer": 0,
    "explanation": "Discovered by László Bélády, FIFO can suffer more faults with more memory because it lacks the 'stack property'."
  },
  {
    "id": "os-rep-04",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "easy",
    "question": "What is the Optimal Page Replacement Algorithm (OPT / MIN / Clairvoyant algorithm)?",
    "options": [
      "Replaces the page that will not be used for the longest period of time in the future; serves as a theoretical benchmark for evaluation",
      "Replaces pages with the lowest numbers",
      "Replaces pages immediately after use",
      "An algorithm that never misses"
    ],
    "correctAnswer": 0,
    "explanation": "OPT is mathematically optimal, but impossible to implement in practice because it requires future knowledge of reference strings."
  },
  {
    "id": "os-rep-05",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "medium",
    "question": "How does the Least Recently Used (LRU) page replacement algorithm work?",
    "options": [
      "Evicts the page that has not been referenced/accessed for the longest period of time in the past (approximating OPT using past behavior)",
      "Evicts the newest page",
      "Evicts pages with the fewest bytes",
      "Evicts pages randomly"
    ],
    "correctAnswer": 0,
    "explanation": "LRU leverages temporal locality: pages unused recently are least likely to be referenced in the near future."
  },
  {
    "id": "os-rep-06",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "medium",
    "question": "Does the Least Recently Used (LRU) algorithm suffer from Belady's Anomaly?",
    "options": [
      "No, LRU belongs to the class of 'Stack Algorithms' which are mathematically immune to Belady's Anomaly",
      "Yes, LRU suffers from it worse than FIFO",
      "Only on multi-core systems",
      "Only if memory is odd-numbered"
    ],
    "correctAnswer": 0,
    "explanation": "Stack algorithms guarantee that the set of pages resident with n frames is a strict subset of pages resident with n+1 frames."
  },
  {
    "id": "os-rep-07",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "medium",
    "question": "How is pure LRU typically implemented in hardware/software, and why is it expensive?",
    "options": [
      "Using hardware counters (timestamps) per memory reference or maintaining a doubly-linked stack updated on every memory read/write",
      "Using an array of strings",
      "Using a while loop",
      "Pure LRU has zero overhead"
    ],
    "correctAnswer": 0,
    "explanation": "Updating timestamps or relocating list nodes on every single memory instruction creates prohibitive hardware and CPU overhead."
  },
  {
    "id": "os-rep-08",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "medium",
    "question": "What is the 'Clock Algorithm' (Second-Chance Algorithm) in page replacement?",
    "options": [
      "An efficient approximation of LRU that uses a circular queue and a Reference Bit (0 or 1) inspected by a rotating clock hand pointer",
      "An algorithm that replaces pages at midnight",
      "An algorithm that times CPU clock ticks",
      "A digital clock display in OS"
    ],
    "correctAnswer": 0,
    "explanation": "Clock checks the reference bit: if 1, clears it to 0 and gives a second chance; if 0, selects that page for immediate eviction."
  },
  {
    "id": "os-rep-09",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "hard",
    "question": "Given the reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 empty frames under FIFO. How many page faults occur?",
    "options": [
      "9 page faults",
      "10 page faults",
      "8 page faults",
      "7 page faults"
    ],
    "correctAnswer": 0,
    "explanation": "Tracing the 12 references across 3 frames under FIFO yields exactly 9 page faults."
  },
  {
    "id": "os-rep-10",
    "category": "operatingSystems",
    "topic": "Page Replacement",
    "difficulty": "hard",
    "question": "What is the LFU (Least Frequently Used) page replacement algorithm and what is its main drawback?",
    "options": [
      "Evicts the page with the smallest reference count; drawback is that pages heavily used during initialization retain high counts and linger even when obsolete",
      "Evicts the fastest page",
      "Never evicts any page",
      "Causes computer overheating"
    ],
    "correctAnswer": 0,
    "explanation": "LFU counts frequency; past initialization bursts distort counts, requiring decaying/aging mechanisms to work properly."
  },
  {
    "id": "os-fs-01",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "easy",
    "question": "What is an 'Inode' (Index Node) in Unix/Linux file systems (e.g. ext4)?",
    "options": [
      "A data structure storing all metadata about a file (permissions, size, owner, timestamps, block pointers) EXCEPT its file name and file content",
      "A node in an internet router",
      "A hardware sector on a hard drive",
      "A user account identifier"
    ],
    "correctAnswer": 0,
    "explanation": "Inodes store complete file metadata and data block pointers; directory entries map file names to inode numbers."
  },
  {
    "id": "os-fs-02",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "easy",
    "question": "Where is a file's actual name stored in a Unix/Linux file system?",
    "options": [
      "In the directory file entry, which maps the string file name to its corresponding Inode number",
      "Inside the Inode itself",
      "Inside the file's first byte",
      "In the BIOS firmware"
    ],
    "correctAnswer": 0,
    "explanation": "A directory is simply a special file containing a lookup list of (file_name, inode_number) pairs."
  },
  {
    "id": "os-fs-03",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "easy",
    "question": "What is the difference between a 'Hard Link' and a 'Soft Link' (Symbolic Link / Symlink)?",
    "options": [
      "A hard link is a direct directory pointer to an existing Inode (shares the same inode); a symlink is a separate file containing a path string to another file",
      "Hard links work across different file systems; symlinks do not",
      "Deleting the original file breaks hard links",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Hard links share the same inode number and reference count; symlinks are independent pointer files with unique inodes."
  },
  {
    "id": "os-fs-04",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "easy",
    "question": "What is the Master Boot Record (MBR) or GUID Partition Table (GPT)?",
    "options": [
      "A dedicated sector at the beginning of a storage drive containing partition tables and bootstrap code to launch the OS",
      "A file containing operating system passwords",
      "A backup copy of user files",
      "A database of internet domains"
    ],
    "correctAnswer": 0,
    "explanation": "Partition tables (MBR/GPT) partition physical disks into logical drives and direct firmware to active boot partitions."
  },
  {
    "id": "os-fs-05",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "medium",
    "question": "What is 'Journaling' in modern file systems (ext4, NTFS, XFS)?",
    "options": [
      "Writing file system mutations to a circular log (journal) before committing them to main disk storage, enabling fast crash recovery without full fsck scans",
      "Keeping a personal diary on the computer",
      "Logging user search queries",
      "Compressing text files"
    ],
    "correctAnswer": 0,
    "explanation": "Journaling guarantees metadata consistency after sudden crashes by replaying or rolling back unfinished log entries."
  },
  {
    "id": "os-fs-06",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "medium",
    "question": "What is the difference between Contiguous Allocation, Linked Allocation, and Indexed Allocation for files?",
    "options": [
      "Contiguous stores files in consecutive blocks (fast, external fragmentation); Linked links blocks via pointers (slow random access); Indexed uses an index block of pointers (fast random access, no external fragmentation)",
      "Linked is always best for large databases",
      "Contiguous allocation requires no disk space",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Indexed allocation (used in UNIX inodes with direct/indirect blocks) enables fast random seeking without external fragmentation."
  },
  {
    "id": "os-fs-07",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "medium",
    "question": "What are Direct and Indirect block pointers in a classic Unix Inode?",
    "options": [
      "Direct pointers point straight to data blocks; Indirect pointers point to blocks containing additional block pointers (supporting large multi-gigabyte files)",
      "Direct pointers are for SSDs, indirect are for HDDs",
      "Indirect pointers are encrypted",
      "Pointers that cannot be modified"
    ],
    "correctAnswer": 0,
    "explanation": "Inodes contain direct pointers (first ~48KB), single indirect, double indirect, and triple indirect pointers for scalable sizing."
  },
  {
    "id": "os-fs-08",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "medium",
    "question": "What is the Virtual File System (VFS) in the Linux kernel?",
    "options": [
      "An abstraction layer providing a unified standard API (open, read, write) allowing applications to access heterogeneous file systems (ext4, NFS, FAT32) transparently",
      "A file system stored in virtual reality",
      "A tool for mounting ISO files",
      "A backup cloud storage tool"
    ],
    "correctAnswer": 0,
    "explanation": "VFS defines standard object models (superblock, inode, dentry, file), decoupling system calls from concrete file system drivers."
  },
  {
    "id": "os-fs-09",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "hard",
    "question": "What is the purpose of the 'dentry' (Directory Entry) cache in Linux VFS?",
    "options": [
      "Caches path name resolutions (e.g. /home/user/doc.txt) in memory to avoid repeated disk reads during hierarchical path lookups",
      "Deletes empty folders automatically",
      "Encrypts directory names",
      "Formats USB drives"
    ],
    "correctAnswer": 0,
    "explanation": "Dentry cache accelerates path traversal by caching string-to-inode lookups in fast RAM."
  },
  {
    "id": "os-fs-10",
    "category": "operatingSystems",
    "topic": "File Systems",
    "difficulty": "hard",
    "question": "What is 'Copy-on-Write' in advanced file systems like ZFS and Btrfs?",
    "options": [
      "Modifications never overwrite existing data blocks in place; new data is written to empty blocks and metadata pointers are updated atomically, enabling instant snapshots",
      "Copying files over Wi-Fi",
      "A printing protocol",
      "A security vulnerability"
    ],
    "correctAnswer": 0,
    "explanation": "CoW file systems provide instantaneous, zero-cost snapshots and prevent silent corruption by writing to new blocks."
  },
  {
    "id": "os-sys-01",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "easy",
    "question": "What is a System Call in an Operating System?",
    "options": [
      "The programmatic programmatic interface by which a user-space application requests services from the operating system kernel",
      "A phone call made via software",
      "A network ping request",
      "A hardware interrupt from a keyboard"
    ],
    "correctAnswer": 0,
    "explanation": "System calls provide controlled gateways crossing user-kernel privilege boundaries to perform hardware I/O and process actions."
  },
  {
    "id": "os-sys-02",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "easy",
    "question": "Which of the following functions in C is a standard POSIX System Call, rather than a pure C library function?",
    "options": [
      "read() (system call: requests kernel to read bytes from file descriptor)",
      "strlen() (pure user-space string calculation)",
      "sqrt() (math library)",
      "printf() (C library wrapper around write() system call)"
    ],
    "correctAnswer": 0,
    "explanation": "read(), write(), open(), and close() are direct POSIX system calls; printf() is a buffered libc wrapper around write()."
  },
  {
    "id": "os-sys-03",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "easy",
    "question": "What return value does fork() produce in the child process upon success in Unix/Linux?",
    "options": [
      "0",
      "The parent's PID",
      "A positive integer",
      "-1"
    ],
    "correctAnswer": 0,
    "explanation": "fork() returns 0 to the newly created child process, and returns the child's positive PID to the parent process."
  },
  {
    "id": "os-sys-04",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "easy",
    "question": "What does the wait() system call do when called by a parent process?",
    "options": [
      "Suspends execution of the parent process until one of its child processes terminates and collects its exit status",
      "Pauses execution for 5 seconds",
      "Waits for keyboard input",
      "Waits for internet connection"
    ],
    "correctAnswer": 0,
    "explanation": "wait() reaps terminated children, retrieving exit codes and releasing their zombie entries from the kernel process table."
  },
  {
    "id": "os-sys-05",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "medium",
    "question": "What does the pipe() system call create in Unix/Linux?",
    "options": [
      "A unidirectional Inter-Process Communication (IPC) channel with two file descriptors: one for reading and one for writing",
      "A plumbing simulation game",
      "A network socket to a remote server",
      "A shared global variable"
    ],
    "correctAnswer": 0,
    "explanation": "pipe(int fd[2]) allocates a kernel buffer where fd[0] reads bytes written to fd[1] (FIFO stream)."
  },
  {
    "id": "os-sys-06",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "medium",
    "question": "What is the difference between a Named Pipe (FIFO) and an Anonymous Pipe created by pipe()?",
    "options": [
      "Anonymous pipes exist only in memory between related processes; Named pipes have an explicit file path on disk (mkfifo) and can communicate unrelated processes",
      "Named pipes are slower by 100x",
      "Anonymous pipes have names",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Named pipes exist in the file system namespace, allowing independent unrelated processes to open them as bidirectional FIFOs."
  },
  {
    "id": "os-sys-07",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "medium",
    "question": "What does the kill() system call do in Unix/Linux?",
    "options": [
      "Sends a specified POSIX signal (such as SIGTERM, SIGKILL, SIGINT) to a target process or process group",
      "Permanently deletes the executable file from disk",
      "Turns off the computer immediately",
      "Deletes all open windows"
    ],
    "correctAnswer": 0,
    "explanation": "Despite its name, kill(pid, sig) is a signal dispatching mechanism; it can send termination, pause, or custom signals."
  },
  {
    "id": "os-sys-08",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "medium",
    "question": "What is the difference between SIGTERM (signal 15) and SIGKILL (signal 9)?",
    "options": [
      "SIGTERM can be caught, handled, or ignored by a process for graceful cleanup; SIGKILL cannot be caught or ignored and terminates the process immediately at kernel level",
      "SIGTERM is for terminals; SIGKILL is for servers",
      "SIGKILL can be caught by developers",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "SIGTERM requests graceful shutdown; SIGKILL cannot be intercepted by user code and forces immediate kernel termination."
  },
  {
    "id": "os-sys-09",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "hard",
    "question": "What does the mmap() system call do?",
    "options": [
      "Maps files or anonymous memory devices directly into the process's virtual memory address space",
      "Displays a geographic GPS map",
      "Compresses memory pages",
      "Allocates memory on the network"
    ],
    "correctAnswer": 0,
    "explanation": "mmap() creates memory-mapped files and is used internally by malloc/glibc for large dynamic memory allocations."
  },
  {
    "id": "os-sys-10",
    "category": "operatingSystems",
    "topic": "System Calls",
    "difficulty": "hard",
    "question": "What is the difference between synchronous and asynchronous I/O system calls (e.g. standard read() vs io_uring / aio_read())?",
    "options": [
      "Synchronous I/O blocks the calling thread until data transfer completes; Asynchronous I/O returns immediately and notifies the process upon completion via events/callbacks",
      "Asynchronous I/O is for text files only",
      "Synchronous I/O is faster in all cases",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Asynchronous I/O (like Linux io_uring) eliminates thread blocking by offloading submission and completion to ring buffers."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['operatingSystems'] = operatingSystemsData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = operatingSystemsData;
  }
})();
