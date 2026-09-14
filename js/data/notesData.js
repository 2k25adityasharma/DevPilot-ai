/**
 * DevPilot-AI - Developer Notes Data Vault & Category System
 * Static structured dataset providing full computer science & software engineering roadmap coverage.
 */

const NOTE_CATEGORIES = [
  {
    id: 'dsa',
    name: 'DSA & Problem Solving',
    shortName: 'DSA',
    colorClass: 'tag-dsa',
    subcategories: [
      'Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window',
      'Prefix Sum', 'Binary Search', 'Sorting', 'Linked List', 'Stack',
      'Queue', 'Deque', 'Recursion', 'Backtracking', 'Trees', 'BST',
      'Heap / Priority Queue', 'Graphs', 'Greedy', 'Dynamic Programming',
      'Bit Manipulation', 'Trie', 'Disjoint Set Union', 'Intervals',
      'Monotonic Stack', 'Advanced Patterns'
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    shortName: 'C++',
    colorClass: 'tag-cpp',
    subcategories: [
      'STL', 'vector', 'string', 'map', 'unordered_map', 'set', 'multiset',
      'queue', 'priority_queue', 'stack', 'deque', 'algorithms', 'iterators',
      'pair', 'sorting', 'lambda', 'references', 'pointers', 'memory', 'OOP in C++'
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    shortName: 'JavaScript',
    colorClass: 'tag-javascript',
    subcategories: [
      'Variables', 'Scope', 'Hoisting', 'Temporal Dead Zone', 'Execution Context',
      'Call Stack', 'Event Loop', 'Microtasks', 'Macrotasks', 'Closures', 'this',
      'call/apply/bind', 'Prototypes', 'Classes', 'Objects', 'Arrays', 'Functions',
      'Arrow Functions', 'Promises', 'async/await', 'Fetch API', 'DOM', 'Events',
      'Event Delegation', 'Modules', 'Error Handling', 'ES6+', 'Memory / Garbage Collection'
    ]
  },
  {
    id: 'webdev',
    name: 'Web Development',
    shortName: 'Web Dev',
    colorClass: 'tag-webdev',
    subcategories: [
      'HTML', 'CSS', 'Responsive Design', 'Flexbox', 'Grid', 'DOM', 'Browser',
      'HTTP', 'REST API', 'Authentication', 'Authorization', 'Forms', 'Accessibility', 'Performance'
    ]
  },
  {
    id: 'react',
    name: 'React',
    shortName: 'React',
    colorClass: 'tag-react',
    subcategories: [
      'Components', 'JSX', 'Props', 'State', 'Hooks', 'useState', 'useEffect',
      'useMemo', 'useCallback', 'useRef', 'Context', 'Routing', 'Forms',
      'API Integration', 'Performance', 'Component Architecture'
    ]
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    shortName: 'Node.js',
    colorClass: 'tag-nodejs',
    subcategories: [
      'Node Runtime', 'npm', 'Modules', 'Express', 'Middleware', 'REST APIs',
      'Routing', 'Controllers', 'Authentication', 'JWT', 'Cookies', 'Validation',
      'Error Handling', 'File Upload', 'APIs', 'Security'
    ]
  },
  {
    id: 'backend',
    name: 'Backend Development',
    shortName: 'Backend',
    colorClass: 'tag-backend',
    subcategories: [
      'Architecture', 'REST APIs', 'GraphQL', 'Microservices', 'Authentication',
      'Caching', 'Databases', 'Message Queues', 'Rate Limiting', 'Logging', 'Security', 'Scalability'
    ]
  },
  {
    id: 'sql',
    name: 'SQL',
    shortName: 'SQL',
    colorClass: 'tag-sql',
    subcategories: [
      'SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'DISTINCT', 'INSERT',
      'UPDATE', 'DELETE', 'JOINs', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'FULL JOIN', 'SELF JOIN', 'Subqueries', 'CTE', 'Window Functions',
      'Aggregate Functions', 'CASE', 'Constraints', 'Primary Key', 'Foreign Key',
      'Indexes', 'Views', 'Transactions'
    ]
  },
  {
    id: 'dbms',
    name: 'DBMS',
    shortName: 'DBMS',
    colorClass: 'tag-dbms',
    subcategories: [
      'DBMS Fundamentals', 'ER Model', 'Keys', 'Normalization', '1NF', '2NF',
      '3NF', 'BCNF', 'Functional Dependencies', 'Transactions', 'ACID',
      'Concurrency Control', 'Locks', 'Deadlocks', 'Serializability',
      'Indexing', 'B-Trees', 'Hash Indexing', 'Query Processing', 'Query Optimization',
      'Recovery', 'Database Architecture'
    ]
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    shortName: 'PostgreSQL',
    colorClass: 'tag-postgresql',
    subcategories: [
      'PostgreSQL Basics', 'Data Types', 'Tables', 'Constraints', 'Joins',
      'Indexes', 'Transactions', 'Views', 'Functions', 'Procedures', 'CTE',
      'Window Functions', 'EXPLAIN', 'Query Optimization'
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    shortName: 'OS',
    colorClass: 'tag-os',
    subcategories: [
      'Processes', 'Threads', 'Process Scheduling', 'CPU Scheduling',
      'Context Switching', 'IPC', 'Synchronization', 'Mutex', 'Semaphore',
      'Deadlock', 'Memory Management', 'Paging', 'Segmentation', 'Virtual Memory',
      'Page Replacement', 'File Systems', 'System Calls'
    ]
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    shortName: 'CN',
    colorClass: 'tag-cn',
    subcategories: [
      'OSI Model', 'TCP/IP', 'IP Addressing', 'IPv4', 'IPv6', 'TCP', 'UDP',
      'HTTP', 'HTTPS', 'DNS', 'DHCP', 'ARP', 'Routing', 'Switching',
      'Ports', 'Sockets', 'Network Security'
    ]
  },
  {
    id: 'oop',
    name: 'OOP',
    shortName: 'OOP',
    colorClass: 'tag-oop',
    subcategories: [
      'Class', 'Object', 'Encapsulation', 'Abstraction', 'Inheritance',
      'Polymorphism', 'Constructor', 'Destructor', 'Overloading', 'Overriding',
      'Virtual Functions', 'Interfaces', 'Composition', 'Aggregation', 'SOLID Principles'
    ]
  },
  {
    id: 'system-design',
    name: 'System Design',
    shortName: 'System Design',
    colorClass: 'tag-system-design',
    subcategories: [
      'Scalability', 'Load Balancing', 'Caching', 'Database Scaling', 'Replication',
      'Sharding', 'CDN', 'Message Queues', 'Rate Limiting', 'CAP Theorem',
      'Consistency', 'Availability', 'Fault Tolerance', 'Distributed Systems',
      'Microservices', 'Monolith', 'API Gateway', 'Authentication', 'Observability', 'High Availability'
    ]
  },
  {
    id: 'cs-fundamentals',
    name: 'Computer Science Fundamentals',
    shortName: 'CS Fundamentals',
    colorClass: 'tag-cs-fundamentals',
    subcategories: [
      'Data Representation', 'Number Systems', 'Boolean Algebra', 'Compilers',
      'Memory Architecture', 'Instruction Set', 'Basics'
    ]
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    shortName: 'Aptitude',
    colorClass: 'tag-aptitude',
    subcategories: [
      'Number System', 'HCF & LCM', 'Percentages', 'Profit & Loss',
      'Simple Interest', 'Compound Interest', 'Ratio & Proportion', 'Average',
      'Time & Work', 'Pipes & Cisterns', 'Time Speed Distance', 'Boats & Streams',
      'Problems on Ages', 'Mixtures & Allegations', 'Partnership', 'Permutation',
      'Combination', 'Probability', 'Data Interpretation', 'Simplification',
      'Algebra', 'Geometry', 'Logical Reasoning', 'Series', 'Coding-Decoding',
      'Blood Relations', 'Directions', 'Syllogism', 'Seating Arrangement', 'Puzzles'
    ]
  },
  {
    id: 'english',
    name: 'English / Communication',
    shortName: 'English',
    colorClass: 'tag-english',
    subcategories: [
      'Grammar', 'Tenses', 'Articles', 'Prepositions', 'Subject-Verb Agreement',
      'Vocabulary', 'Synonyms', 'Antonyms', 'Sentence Correction',
      'Reading Comprehension', 'Error Detection', 'Para Jumbles',
      'Interview English', 'Self Introduction', 'HR Questions', 'Group Discussion'
    ]
  },
  {
    id: 'aiml',
    name: 'AI / ML',
    shortName: 'AI / ML',
    colorClass: 'tag-aiml',
    subcategories: [
      'Python for AI', 'NumPy', 'Pandas', 'Data Cleaning', 'Statistics',
      'Probability', 'Linear Algebra Basics', 'Machine Learning', 'Supervised Learning',
      'Unsupervised Learning', 'Regression', 'Classification', 'Clustering',
      'Feature Engineering', 'Model Evaluation', 'Neural Networks', 'Deep Learning',
      'NLP', 'Generative AI', 'LLMs', 'RAG', 'Embeddings', 'Vector Databases'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    shortName: 'Python',
    colorClass: 'tag-python',
    subcategories: [
      'Syntax', 'Data Types', 'Lists', 'Tuples', 'Sets', 'Dictionaries',
      'Functions', 'OOP', 'Modules', 'Exceptions', 'File Handling',
      'NumPy', 'Pandas', 'FastAPI'
    ]
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    shortName: 'Git / GitHub',
    colorClass: 'tag-git',
    subcategories: [
      'Git Basics', 'init', 'clone', 'add', 'commit', 'push', 'pull',
      'branch', 'merge', 'rebase', 'stash', 'reset', 'revert', 'cherry-pick',
      'GitHub', 'Pull Requests', 'Issues', 'Actions'
    ]
  },
  {
    id: 'linux',
    name: 'Linux',
    shortName: 'Linux',
    colorClass: 'tag-linux',
    subcategories: [
      'Filesystem', 'pwd', 'ls', 'cd', 'mkdir', 'rm', 'cp', 'mv', 'cat',
      'grep', 'find', 'chmod', 'chown', 'processes', 'networking', 'shell scripting'
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    shortName: 'Docker',
    colorClass: 'tag-docker',
    subcategories: [
      'Images', 'Containers', 'Dockerfile', 'Volumes', 'Networks',
      'Docker Compose', 'Containerization'
    ]
  },
  {
    id: 'cloud',
    name: 'AWS / Cloud',
    shortName: 'AWS / Cloud',
    colorClass: 'tag-cloud',
    subcategories: [
      'EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Lambda', 'CloudFront',
      'Route 53', 'Load Balancing', 'Auto Scaling', 'Cloud Fundamentals'
    ]
  },
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    shortName: 'Interview Prep',
    colorClass: 'tag-interview-prep',
    subcategories: [
      'DSA Interview Questions', 'C++ Questions', 'JavaScript Questions',
      'DBMS Questions', 'OS Questions', 'CN Questions', 'OOP Questions',
      'SQL Questions', 'System Design Questions', 'HR Questions',
      'Project Questions', 'Resume Questions'
    ]
  },
  {
    id: 'resume',
    name: 'Resume / Career',
    shortName: 'Resume / Career',
    colorClass: 'tag-resume',
    subcategories: [
      'ATS Formatting', 'Action Verbs', 'Work Experience', 'Project Bullet Points',
      'LinkedIn Optimization', 'Portfolio', 'Cold Outreach', 'Offer Negotiation'
    ]
  },
  {
    id: 'projects',
    name: 'Projects',
    shortName: 'Projects',
    colorClass: 'tag-projects',
    subcategories: [
      'Full-Stack Project Architecture', 'API Design', 'Deployment',
      'Database Schema Design', 'README Documentation', 'Demo Preparation'
    ]
  },
  {
    id: 'general',
    name: 'General Concepts',
    shortName: 'General',
    colorClass: 'tag-general',
    subcategories: [
      'Agile/Scrum', 'Version Control', 'Code Review', 'Design Patterns',
      'CI/CD', 'Debugging', 'Clean Code'
    ]
  }
];

const DEFAULT_NOTES = [
  // -------------------------------------------------------------
  // PRESERVED ORIGINAL NOTES (Enriched with exact schema & categories)
  // -------------------------------------------------------------
  {
    id: 'n1',
    title: 'Sliding Window & Two Pointer Patterns',
    category: 'DSA & Problem Solving',
    subcategory: 'Sliding Window',
    tags: ['dsa', 'arrays', 'sliding-window', 'two-pointer', 'leetcode'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-25',
    content: `### Concept
Sliding Window is an algorithmic technique that converts nested iteration O(n²) into linear time O(n) by maintaining a contiguous subsegment [left, right] over an array or string.

### Why it exists
Checking all contiguous subarrays requires generating n*(n+1)/2 windows. By reusing computations of overlapping windows and incrementally shifting pointers, we process each element at most twice (once added by right, once removed by left).

### How it works
1. Fixed Window: right advances to expand to size K. Once size == K, calculate window metric, then remove element at left and increment left.
2. Dynamic Window: right expands window to satisfy or test a constraint. If window condition is violated, shrink from left until valid again.

### Syntax / Implementation (Dynamic Window Example)
\`\`\`cpp
int minSubArrayLen(int target, vector<int>& nums) {
    int left = 0, sum = 0, minLen = INT_MAX;
    for (int right = 0; right < nums.size(); right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}
\`\`\`

### Edge Cases
- Empty array or target unreachable.
- Negative numbers: Standard sliding window requires monotonicity. If negative numbers exist, use Prefix Sum + Hash Map instead.
- Single element arrays.

### Common Mistakes
- Off-by-one errors calculating window size (length is always right - left + 1).
- Resetting left to right instead of incrementally incrementing left.

### Time & Space Complexity
- Time Complexity: O(n) since both left and right pointers traverse at most n steps.
- Space Complexity: O(1) auxiliary space (or O(k) for frequency maps).

### Interview Traps & Questions
- Q: "Can sliding window find maximum subarray sum with negative values?" -> A: No, monotonicity is broken; use Kadane's algorithm (DP).
- Standard Problems: LeetCode #3 (Longest Substring Without Repeating Characters), #76 (Minimum Window Substring), #209 (Minimum Size Subarray Sum).

### QUICK REVISION
- Operates on contiguous subarray/substring problems.
- Expand 'right' to include elements; shrink 'left' when window invariants break.
- Window length = right - left + 1.
- Guarantees O(n) time when elements are non-negative / monotonic.`
  },
  {
    id: 'n2',
    title: 'React Concurrent Mode & Transitions',
    category: 'React',
    subcategory: 'Performance',
    tags: ['react', 'concurrent-mode', 'useTransition', 'performance', 'frontend'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-08-22',
    content: `### Concept
React 18 Concurrent Rendering allows React to interrupt, pause, resume, or abandon render passes to keep the main thread responsive to urgent user inputs (typing, clicking) while executing expensive UI re-renders.

### Why it exists
Before React 18, rendering was synchronous and blocking. A heavy state update would freeze the browser UI, resulting in input lag and dropped animation frames.

### How it works
Updates are divided into:
1. Urgent updates: Direct user interactions (typing in an input field, hover effects).
2. Transition updates: Non-urgent state transitions (filtering a massive table, switching tabs).
\`useTransition()\` provides an \`isPending\` boolean and a \`startTransition\` wrapper.

### Syntax & Example
\`\`\`jsx
import { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [listQuery, setListQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // Urgent: immediately update input value
    setQuery(e.target.value);
    
    // Non-urgent: deferred heavy list filter
    startTransition(() => {
      setListQuery(e.target.value);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <span className="spinner">Filtering...</span>}
      <ExpensiveList filter={listQuery} />
    </div>
  );
}
\`\`\`

### Common Mistakes
- Wrapping controlled input values directly inside \`startTransition\`, which causes noticeable typing lag.
- Using transitions for asynchronous network requests instead of React Suspense or TanStack Query.

### QUICK REVISION
- useTransition splits updates into urgent (immediate) vs transition (interruptible).
- Returns [isPending, startTransition].
- Prevents UI freezing during complex render recalculations.`
  },
  {
    id: 'n3',
    title: 'CAP Theorem & Distributed Consensus',
    category: 'System Design',
    subcategory: 'CAP Theorem',
    tags: ['system-design', 'distributed-systems', 'cap-theorem', 'databases', 'consensus'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-08-19',
    content: `### Concept
The CAP Theorem (Brewer's Theorem) states that any distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance.

### What the Three Guarantees Mean
1. Consistency (C): Every read receives the most recent write or an error (Linearizability).
2. Availability (A): Every non-failing node returns a non-error response for every request, without guarantee of latest data.
3. Partition Tolerance (P): The system continues to operate despite arbitrary message loss or network delay between nodes.

### Why Partition Tolerance (P) Is Inevitable
In physical networks, dropped packets, fiber cuts, and latency spikes happen. Because P cannot be avoided in real distributed environments, the real-world trade-off is CP vs AP:
- CP Systems: Sacrifice availability when partition occurs. Nodes reject writes to preserve exact consistency (e.g., ZooKeeper, Google Spanner, HBase).
- AP Systems: Sacrifice strict consistency. Nodes accept writes and reads on both sides of partition, causing divergence resolved later via eventual consistency (e.g., Cassandra, DynamoDB, CouchDB).

### Edge Cases & Nuance: PACELC Theorem
CAP only explains behavior during network partitions (P). The PACELC theorem expands it:
- If Partition (P), choose Availability (A) or Consistency (C).
- Else (E), choose Latency (L) or Consistency (C).
Example: MongoDB is PC/EC (prefers consistency in both cases). DynamoDB is PA/EL.

### Interview Questions
- Q: "Can a system be CA?" -> A: Only on a single machine or network with 100% infallible zero-latency connection. In real distributed networks, CA is a myth.
- Q: "How does Raft handle network partitions?" -> A: Leader requires quorum (> N/2). The minority partition cannot form a quorum and rejects client writes.

### QUICK REVISION
- Distributed networks must tolerate partitions (P is mandatory).
- CP: Consistency first -> rejects requests if quorum is lost.
- AP: Availability first -> returns stale data to remain accessible.
- PACELC extends CAP to normal non-partition latency tradeoffs.`
  },
  {
    id: 'n4',
    title: 'JavaScript Event Loop & Microtasks',
    category: 'JavaScript',
    subcategory: 'Event Loop',
    tags: ['javascript', 'event-loop', 'microtasks', 'macrotasks', 'v8', 'async'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-15',
    content: `### Concept
JavaScript is single-threaded with a non-blocking concurrency model powered by the Event Loop. It coordinates the Call Stack, Web APIs, Microtask Queue, and Macrotask (Callback) Queue.

### Execution Order Priority
1. Call Stack (Synchronous code executes until completely empty).
2. Microtask Queue (Drained completely before ANY macrotask or UI render).
   - Microtasks: \`Promise.then/catch/finally\`, \`queueMicrotask()\`, \`MutationObserver\`, \`process.nextTick\` (Node).
3. Render Queue (Browser renders frame updates if needed).
4. Macrotask Queue (One macrotask is dequeued and executed).
   - Macrotasks: \`setTimeout\`, \`setInterval\`, \`setImmediate\`, I/O, UI clicks/keyboard events.

### Example & Output Trace
\`\`\`javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
}).then(() => {
  console.log('4');
});

console.log('5');

// Output:
// 1
// 5
// 3
// 4
// 2
\`\`\`

### Why This Output Happens
1. '1' and '5' log synchronously on the Call Stack.
2. \`setTimeout\` callback is scheduled in the Macrotask Queue.
3. First Promise handler is queued in Microtask Queue.
4. Call stack empties. Event Loop inspects Microtask Queue: runs callback ('3'), which enqueues next \`.then\` ('4').
5. Microtask queue drains completely ('4' logs).
6. Only after microtask queue is empty does the Event Loop take the macrotask ('2').

### Common Interview Traps
- Infinite microtask loops (\`function loop() { Promise.resolve().then(loop); }\`) will starve the Call Stack and freeze the browser completely, preventing \`setTimeout\` and UI clicks from ever running.

### QUICK REVISION
- Call Stack runs sync code to completion.
- Microtasks (Promises) ALWAYS run immediately after current stack and drain completely.
- Macrotasks (setTimeout, I/O) run one at a time after microtasks drain.
- Microtasks starve macrotasks if continuously scheduled.`
  },
  {
    id: 'n5',
    title: 'Binary Tree Traversal: Iterative Morris Traversal',
    category: 'DSA & Problem Solving',
    subcategory: 'Trees',
    tags: ['dsa', 'trees', 'binary-tree', 'morris-traversal', 'inorder', 'algorithms'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-08-10',
    content: `### Concept
Morris Traversal is a binary tree traversal algorithm that achieves Inorder and Preorder traversals with O(N) time complexity and true O(1) auxiliary space without using recursion or an explicit stack.

### Why it exists
Standard recursive traversal requires O(H) call stack space. Iterative traversal with a stack requires O(H) memory. Morris traversal eliminates memory allocation by creating temporary threaded links in the tree's NULL right pointers.

### How it works (Inorder)
1. Initialize \`curr = root\`.
2. While \`curr != null\`:
   - If \`curr->left == null\`: visit \`curr\`, move \`curr = curr->right\`.
   - Else: find predecessor (rightmost node in \`curr->left\` subtree).
     - If \`pred->right == null\`: create thread (\`pred->right = curr\`), move \`curr = curr->left\`.
     - If \`pred->right == curr\`: break thread (\`pred->right = null\`), visit \`curr\`, move \`curr = curr->right\`.

### C++ Implementation
\`\`\`cpp
vector<int> morrisInorder(TreeNode* root) {
    vector<int> res;
    TreeNode* curr = root;
    while (curr) {
        if (!curr->left) {
            res.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* pred = curr->left;
            while (pred->right && pred->right != curr) {
                pred = pred->right;
            }
            if (!pred->right) {
                pred->right = curr; // Thread established
                curr = curr->left;
            } else {
                pred->right = nullptr; // Thread removed
                res.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return res;
}
\`\`\`

### Complexity
- Time Complexity: O(N) amortized because each edge is traversed at most 3 times.
- Space Complexity: O(1) auxiliary space (no stack, no recursion).

### QUICK REVISION
- Connects predecessor's null right pointer to current node.
- If thread doesn't exist: create thread and move left.
- If thread already exists: destroy thread, record current, move right.
- Gives O(N) time and strictly O(1) extra space.`
  },
  {
    id: 'n6',
    title: 'Database Indexing: B-Trees vs LSM Trees',
    category: 'DBMS',
    subcategory: 'Indexing',
    tags: ['dbms', 'indexing', 'b-trees', 'lsm-trees', 'storage-engines', 'interview'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-08-05',
    content: `### Concept
B-Trees and Log-Structured Merge-trees (LSM Trees) are the two fundamental storage engine data structures powering modern relational and NoSQL databases.

### Core Comparison
| Metric | B-Trees (PostgreSQL, MySQL InnoDB) | LSM Trees (Cassandra, RocksDB, Scylla) |
|---|---|---|
| Primary Strength | Blazing fast random reads O(log N) | Ultra high-throughput sequential writes |
| Write Pattern | In-place overwrite on disk pages (4KB-16KB) | Append-only sequential writes to MemTable + WAL |
| Read Latency | Predictable single/dual disk page seek | Multi-level SSTable lookup (optimized with Bloom filters) |
| Space Amplification | Page fragmentation / unfilled pages (~30-50% overhead) | Compaction cleans dead tombstones periodically |

### How LSM Trees Work
1. Incoming write appends to Write-Ahead Log (WAL) on disk for durability.
2. Data inserted into in-memory sorted skip list (\`MemTable\`).
3. When MemTable reaches threshold (e.g. 64MB), it freezes and flushes sequentially to disk as an immutable \`SSTable\` (Sorted String Table).
4. Background compaction merges overlapping SSTables and discards overwritten rows or tombstones.

### Interview Questions
- Q: "Why do LSM trees achieve 10x higher write speed than B-trees on spinning disks & NVMe?" -> A: Sequential I/O vs random I/O. B-Trees rewrite random 16KB disk blocks for small updates. LSM trees convert all writes into sequential sequential append operations.
- Q: "How do LSM trees avoid slow reads?" -> A: Bloom filters in RAM verify whether a key definitely does NOT exist in an SSTable before performing disk seeks.

### QUICK REVISION
- B-Trees: In-place page updates; best for read-heavy OLTP databases.
- LSM Trees: Append-only MemTable + immutable SSTables + Compaction; best for write-heavy systems.
- Bloom filters guard LSM reads against unnecessary disk I/O.`
  },

  // -------------------------------------------------------------
  // DSA & PROBLEM SOLVING STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_dsa_binary_search',
    title: 'Binary Search: Boundaries & Monotonic Predicates',
    category: 'DSA & Problem Solving',
    subcategory: 'Binary Search',
    tags: ['dsa', 'binary-search', 'monotonicity', 'algorithms', 'leetcode'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-09-01',
    content: `### Concept
Binary Search finds the boundary where a condition changes from False to True across a monotonic search space in O(log N) time.

### Recognition Signals
- Array is sorted or rotated sorted.
- Problem asks for "minimum of maximums" or "maximum of minimums".
- A monotonic predicate \`check(mid)\` exists where if \`mid\` is feasible, all values > \`mid\` (or < \`mid\`) are also feasible.

### Standard Template (First True Boundary)
\`\`\`cpp
int binarySearchBoundary(int low, int high) {
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // avoids integer overflow
        if (isValid(mid)) {
            ans = mid;
            high = mid - 1; // look for smaller valid answer on left
        } else {
            low = mid + 1;  // expand right
        }
    }
    return ans;
}
\`\`\`

### Edge Cases
- Integer overflow with \`(low + high) / 2\` -> always use \`low + (high - low) / 2\`.
- Infinite loop when search bounds do not shrink.
- Target smaller than minimum or larger than maximum.

### Common LeetCode Variations
- Search in Rotated Sorted Array (#33)
- Find Minimum in Rotated Sorted Array (#153)
- Koko Eating Bananas (#875)
- Capacity To Ship Packages Within D Days (#1011)

### QUICK REVISION
- Monotonicity is the ONLY requirement, not just sorted arrays.
- Use \`low + (high - low) / 2\` to prevent overflow.
- Maintain invariant: shrinks search space strictly on every iteration.`
  },
  {
    id: 'seed_dsa_prefix_sum',
    title: 'Prefix Sum & Subarray Sum Equals K',
    category: 'DSA & Problem Solving',
    subcategory: 'Prefix Sum',
    tags: ['dsa', 'prefix-sum', 'hashing', 'arrays', 'leetcode'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-28',
    content: `### Concept
Prefix Sum precalculates cumulative sums \`prefix[i] = prefix[i-1] + nums[i]\` allowing any range sum query \`sum(L...R)\` to be evaluated in O(1) time as \`prefix[R] - prefix[L-1]\`.

### Why Hashing with Prefix Sum is Powerful
When searching for subarrays summing to K (even with negative numbers where sliding window fails), we use the relation:
\`prefix[j] - prefix[i] = K\`  ===>  \`prefix[i] = prefix[j] - K\`
We store frequencies of observed prefix sums in an unordered_map.

### C++ Optimal Solution (LeetCode #560)
\`\`\`cpp
int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixFreq;
    prefixFreq[0] = 1; // base case: sum of 0 appears before array starts
    int currSum = 0, count = 0;
    
    for (int num : nums) {
        currSum += num;
        if (prefixFreq.count(currSum - k)) {
            count += prefixFreq[currSum - k];
        }
        prefixFreq[currSum]++;
    }
    return count;
}
\`\`\`

### Common Mistakes
- Forgetting the base case \`prefixFreq[0] = 1\`. Without this, subarrays starting at index 0 will not be counted.

### QUICK REVISION
- Range sum in O(1): prefix[R] - prefix[L - 1].
- For sum == K with negative numbers: use map<prefixSum, count>.
- Always initialize prefixFreq[0] = 1.`
  },
  {
    id: 'seed_dsa_monotonic_stack',
    title: 'Monotonic Stack: Next Greater Element & Histogram',
    category: 'DSA & Problem Solving',
    subcategory: 'Monotonic Stack',
    tags: ['dsa', 'stack', 'monotonic-stack', 'arrays', 'leetcode'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-08-20',
    content: `### Concept
A Monotonic Stack maintains elements in strictly increasing or decreasing order. It solves "Next Greater Element", "Next Smaller Element", and "Largest Rectangle in Histogram" in linear O(N) time.

### How it works
Iterate through the array. While the current element breaks the monotonic invariant compared to the element at \`stack.top()\`, pop the top element and resolve its answer.

### Syntax (Next Greater Element)
\`\`\`cpp
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st; // stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            res[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return res;
}
\`\`\`

### QUICK REVISION
- Store indices in the stack, not just values.
- Decreasing stack finds Next Greater Element.
- Each element is pushed and popped at most once -> O(N) time.`
  },

  // -------------------------------------------------------------
  // C++ STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_cpp_stl_map',
    title: 'std::map vs std::unordered_map: Internal Mechanics & Tradeoffs',
    category: 'C++',
    subcategory: 'map',
    tags: ['cpp', 'stl', 'map', 'unordered_map', 'hash-table', 'red-black-tree'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-18',
    content: `### Concept
C++ offers two primary associative associative map containers: \`std::map\` (ordered, Self-Balancing Red-Black Tree) and \`std::unordered_map\` (unordered, Hash Table with chaining).

### Comparison Matrix
| Feature | std::map | std::unordered_map |
|---|---|---|
| Underlying Structure | Red-Black Tree | Hash Table (Buckets + Linked Lists) |
| Search / Insert / Delete | O(log N) guaranteed | O(1) average, O(N) worst case (hash collision attack) |
| Ordering | Strictly sorted by \`std::less<Key>\` | Arbitrary bucket order |
| Iterator Invalidation | Node pointers never invalidate on insert/erase | Rehashing invalidates all iterators |
| Custom Types | Requires \`operator<\` | Requires \`std::hash<Key>\` and \`operator==\` |

### Why Worst Case Happens in std::unordered_map
If an attacker crafts inputs causing identical hash values, all keys fall into a single bucket. This degrades lookup to O(N), causing Time Limit Exceeded (TLE) on competitive programming platforms (e.g. Codeforces).
Fix: Use a custom splitmix64 anti-hash-collision functor.

### Example Usage
\`\`\`cpp
// map: maintains sorted keys
std::map<int, string> ordered;
ordered[3] = "three"; ordered[1] = "one";
// Iteration yields: 1: "one", 3: "three"

// unordered_map: O(1) average lookup
std::unordered_map<string, int> freq;
freq.reserve(1024); // avoids premature rehashing
freq["apple"]++;
\`\`\`

### QUICK REVISION
- Use std::map when sorted iteration or lower_bound/upper_bound is required.
- Use std::unordered_map for maximum lookup speed O(1).
- std::map has zero risk of hash collision degradation.`
  },
  {
    id: 'seed_cpp_vector',
    title: 'std::vector Internal Growth & Memory Amortization',
    category: 'C++',
    subcategory: 'vector',
    tags: ['cpp', 'vector', 'stl', 'memory', 'performance'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-08-16',
    content: `### Concept
\`std::vector\` is a dynamically resizing contiguous array. It provides O(1) random access and O(1) amortized insertion at the back.

### Growth Mechanics & Amortization
- \`size()\`: current number of active elements.
- \`capacity()\`: number of elements allocated before next reallocation.
When \`size() == capacity()\`, \`push_back()\` performs:
1. Allocates new buffer of size \`capacity * 2\` (GCC/Clang) or \`capacity * 1.5\` (MSVC).
2. Move-constructs existing elements to new memory.
3. Destroys old buffer.
Because reallocations occur exponentially rarely, copying N elements costs 2N total operations over time = O(1) amortized per push.

### Performance Tip: reserve() vs resize()
- \`vec.reserve(1000)\`: allocates memory for 1000 items, \`size()\` remains 0. Prevents reallocations!
- \`vec.resize(1000)\`: allocates AND value-initializes 1000 items, \`size()\` becomes 1000.

### QUICK REVISION
- Contiguous in memory -> maximum CPU cache-locality.
- Growth factor: 2x (GCC) or 1.5x (MSVC).
- Always use \`reserve()\` if size is known in advance.`
  },

  // -------------------------------------------------------------
  // JAVASCRIPT STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_js_closures',
    title: 'JavaScript Closures & Lexical Scope Environment',
    category: 'JavaScript',
    subcategory: 'Closures',
    tags: ['javascript', 'closures', 'lexical-scope', 'memory', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-14',
    content: `### Concept
A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures give inner functions access to outer function variables even after the outer function has finished executing.

### How it works under the hood
When a function is defined, it receives an internal \`[[Scopes]]\` property referencing its parent Execution Context's Lexical Environment. Even when the outer execution context is popped off the Call Stack, heap memory references retain variables captured by the closure.

### Classic Interview Example: Private Counter
\`\`\`javascript
function createCounter() {
  let count = 0; // Private state
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    get() { return count; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // undefined (encapsulated)
\`\`\`

### Famous Interview Trap: var in Loops
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3 (because 'var' is function-scoped to single memory cell)

// Fix using let (block scoped per iteration closure):
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 0, 1, 2
\`\`\`

### QUICK REVISION
- Functions retain access to their outer lexical environment even after parent returns.
- Enables data privacy, memoization, currying, and callbacks.
- Be mindful of memory leaks when holding large closures unnecessarily.`
  },
  {
    id: 'seed_js_this_keyword',
    title: 'The "this" Keyword, Call, Apply, Bind & Arrow Functions',
    category: 'JavaScript',
    subcategory: 'this',
    tags: ['javascript', 'this', 'bind', 'call', 'arrow-functions'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-12',
    content: `### Concept
In JavaScript, \`this\` is not determined by where a function is declared, but by HOW the function is invoked at runtime (with the exception of arrow functions).

### 4 Rules of 'this' Binding (in order of priority):
1. \`new\` Binding: \`const o = new Fn()\` -> \`this\` points to newly instantiated object.
2. Explicit Binding: \`fn.call(obj, arg1)\`, \`fn.apply(obj, [args])\`, \`fn.bind(obj)\` -> \`this\` explicitly set to \`obj\`.
3. Implicit Binding: \`obj.fn()\` -> \`this\` points to object on left of dot (\`obj\`).
4. Default Binding: standalone invocation \`fn()\` -> \`window\` in non-strict mode, \`undefined\` in \`'use strict'\`.

### Arrow Functions Rule
Arrow functions do NOT have their own \`this\`. They lexically inherit \`this\` from their enclosing lexical context at creation time and cannot be overridden by \`.bind()\`, \`.call()\`, or \`.apply()\`.

### QUICK REVISION
- Standard function: 'this' depends on invocation call-site.
- Arrow function: 'this' is lexically bound from declaration scope.
- Precedence: new > bind/call/apply > obj.method() > default (undefined).`
  },

  // -------------------------------------------------------------
  // SQL STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_sql_joins',
    title: 'SQL JOINs: Inner, Left, Right, Full & Self Joins',
    category: 'SQL',
    subcategory: 'JOINs',
    tags: ['sql', 'joins', 'inner-join', 'left-join', 'rdbms', 'queries'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-08-09',
    content: `### Concept
SQL JOIN clauses combine rows from two or more tables based on a related column between them.

### Types of JOINs
1. INNER JOIN: Returns only rows where match exists in BOTH tables.
2. LEFT (OUTER) JOIN: Returns all rows from left table, and matching rows from right (fills right columns with NULL if no match).
3. RIGHT (OUTER) JOIN: Returns all rows from right table, and matching rows from left table.
4. FULL (OUTER) JOIN: Returns rows when there is a match in either table (NULL on either side where match missing).
5. SELF JOIN: Table joined with itself, essential for hierarchical data (e.g. Employee and Manager in same table).

### Syntax & Example (Self Join)
\`\`\`sql
-- Find employee name alongside their manager's name
SELECT 
    e.employee_id,
    e.name AS employee_name,
    m.name AS manager_name
FROM employees e
LEFT JOIN employees m 
    ON e.manager_id = m.employee_id;
\`\`\`

### Common Interview Trap: WHERE vs ON in LEFT JOIN
\`\`\`sql
-- Trap: Putting right table filter in WHERE turns LEFT JOIN into INNER JOIN!
SELECT e.name, d.dept_name 
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id
WHERE d.location = 'NYC'; -- Filters out NULLs!

-- Correct: Place condition inside ON clause:
SELECT e.name, d.dept_name 
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id AND d.location = 'NYC';
\`\`\`

### QUICK REVISION
- INNER JOIN: Intersection only.
- LEFT JOIN: All Left + matched Right (NULL for un-matched).
- Filtering right table in WHERE clause converts LEFT JOIN into INNER JOIN.`
  },
  {
    id: 'seed_sql_window_functions',
    title: 'SQL Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK() & OVER()',
    category: 'SQL',
    subcategory: 'Window Functions',
    tags: ['sql', 'window-functions', 'rank', 'dense-rank', 'analytics', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-07',
    content: `### Concept
Window functions perform calculations across a set of table rows related to the current row without collapsing rows like GROUP BY does.

### Key Ranking Functions Comparison
- \`ROW_NUMBER()\`: Assigns sequential unique integers (1, 2, 3, 4...).
- \`RANK()\`: Assigns same rank to ties, skips subsequent numbers (1, 2, 2, 4...).
- \`DENSE_RANK()\`: Assigns same rank to ties, never skips numbers (1, 2, 2, 3...).

### Classic Interview Problem: Nth Highest Salary
\`\`\`sql
WITH RankedSalaries AS (
    SELECT 
        employee_id, 
        salary, 
        department_id,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_num
    FROM employees
)
SELECT department_id, employee_id, salary
FROM RankedSalaries
WHERE rank_num = 2; -- Finds 2nd highest salary per department
\`\`\`

### QUICK REVISION
- Window functions retain individual row identities.
- PARTITION BY divides data into subsets.
- Use DENSE_RANK() for Nth highest queries to handle salary ties cleanly.`
  },

  // -------------------------------------------------------------
  // DBMS STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_dbms_normalization',
    title: 'Database Normalization: 1NF, 2NF, 3NF, BCNF & Anomalies',
    category: 'DBMS',
    subcategory: 'Normalization',
    tags: ['dbms', 'normalization', '3nf', 'bcnf', 'functional-dependencies', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-04',
    content: `### Concept
Normalization is the process of organizing relational database schemas to minimize data redundancy and prevent Insertion, Update, and Deletion Anomalies.

### Normal Forms Hierarchy
1. 1NF (First Normal Form):
   - All attribute values must be atomic (no multi-valued lists or arrays).
   - Each record must be uniquely identifiable (Primary Key exists).
2. 2NF (Second Normal Form):
   - Must be in 1NF.
   - No Partial Dependency: All non-key attributes must depend on the ENTIRE composite primary key, not a subset.
3. 3NF (Third Normal Form):
   - Must be in 2NF.
   - No Transitive Dependency: Non-key attributes must not depend on other non-key attributes (\`X -> Y\` where neither is candidate key).
4. BCNF (Boyce-Codd Normal Form):
   - Stricter version of 3NF.
   - In every functional dependency \`X -> Y\`, \`X\` must be a Super Key.

### Three Anomalies Normalization Eliminates
- Insertion Anomaly: Cannot insert a department without creating a fake employee.
- Deletion Anomaly: Deleting the last employee in a department deletes all records of that department's existence.
- Update Anomaly: Changing a student's address requires updating 50 duplicate rows; missing one creates inconsistent data.

### QUICK REVISION
- 1NF: Atomic values, unique rows.
- 2NF: No partial dependencies (relevant for composite keys).
- 3NF: No transitive dependencies (A -> B -> C).
- BCNF: Determinant of every dependency must be a super key.`
  },
  {
    id: 'seed_dbms_acid',
    title: 'ACID Properties in Database Transactions',
    category: 'DBMS',
    subcategory: 'ACID',
    tags: ['dbms', 'acid', 'transactions', 'concurrency', 'wal'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-08-02',
    content: `### Concept
ACID is a set of four guarantees that ensure database transactions are processed reliably, even during power failures, crashes, or concurrent execution.

### The 4 ACID Properties
1. Atomicity: "All or nothing". Either the entire transaction commits or it is completely rolled back. Implemented via Write-Ahead Logging (WAL) and Undo Logs.
2. Consistency: Database moves from one valid state to another valid state, preserving all schema constraints, foreign keys, and triggers.
3. Isolation: Concurrent transactions execute without interfering with one another. Implemented via concurrency control (2-Phase Locking, MVCC).
4. Durability: Once committed, updates persist permanently on non-volatile storage, surviving crashes. Implemented via WAL Redo Logs and checkpointing.

### Transaction Isolation Levels
1. Read Uncommitted (Dirty Reads possible).
2. Read Committed (Non-repeatable reads possible).
3. Repeatable Read (Default in MySQL InnoDB; Phantom reads prevented via Next-Key Locking).
4. Serializable (Strict serial execution, highest isolation, lowest throughput).

### QUICK REVISION
- Atomicity: All or nothing (Undo log / WAL).
- Consistency: Constraint validity maintained.
- Isolation: Concurrent safety (MVCC / 2PL).
- Durability: Survives server failure (Redo log / WAL).`
  },

  // -------------------------------------------------------------
  // OPERATING SYSTEMS STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_os_process_thread',
    title: 'Process vs Thread: Memory Architecture & Context Switching',
    category: 'Operating Systems',
    subcategory: 'Processes',
    tags: ['os', 'processes', 'threads', 'context-switching', 'concurrency', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-30',
    content: `### Concept
A Process is an executing instance of a program with its own isolated virtual address space. A Thread (Lightweight Process) is the basic unit of CPU scheduling executing within a process.

### Memory Layout Comparison
- Shared across threads in same process: Code Segment (Text), Data Segment, Heap, Open File Descriptors, Signals.
- Unique per thread: Stack (local variables), Registers (Program Counter, Stack Pointer), Thread ID (TID), Thread-Local Storage.

### Context Switching Cost
- Process Context Switch: Heavy. Requires flushing CPU Translation Lookaside Buffer (TLB), swapping Page Table Base Register (CR3), saving process control block (PCB).
- Thread Context Switch: Lightweight. Preserves virtual address space and TLB cache lines; only saves registers and switch stack pointer.

### QUICK REVISION
- Process: Independent memory space; expensive creation and context switch.
- Thread: Shares heap & code space; independent stack & registers; fast context switch.
- Communication: Processes need IPC (pipes, sockets, shared memory); Threads communicate via shared heap variables (require mutexes).`
  },
  {
    id: 'seed_os_deadlock',
    title: 'Deadlock: 4 Coffman Conditions & Banker\'s Algorithm',
    category: 'Operating Systems',
    subcategory: 'Deadlock',
    tags: ['os', 'deadlock', 'concurrency', 'bankers-algorithm', 'synchronization'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-28',
    content: `### Concept
A Deadlock occurs when two or more processes are permanently blocked because each holds a resource the other needs, and neither can proceed.

### 4 Necessary Coffman Conditions
All four must hold simultaneously for a deadlock to occur:
1. Mutual Exclusion: At least one resource is held in non-shareable mode.
2. Hold and Wait: A process holds resources while requesting new ones.
3. No Preemption: Resources cannot be forcibly seized; only voluntarily released.
4. Circular Wait: A closed chain of processes exists: P0 waits for P1, P1 waits for P2... Pn waits for P0.

### Prevention Strategy
Break any one of the four conditions:
- Break Circular Wait: Impose a global strict ordering on all resource IDs. Processes may only acquire resource R_j if \`ID(R_j) > ID(R_i)\`.

### QUICK REVISION
- Deadlock requires all 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.
- Breaking Circular Wait via resource hierarchy ordering is the most common prevention technique.
- Banker's algorithm ensures resource allocation stays in a safe state.`
  },

  // -------------------------------------------------------------
  // COMPUTER NETWORKS STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_cn_tcp_udp',
    title: 'TCP vs UDP: Header Structure, Handshake & Reliability',
    category: 'Computer Networks',
    subcategory: 'TCP',
    tags: ['cn', 'tcp', 'udp', 'networking', 'osi-model', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-25',
    content: `### Concept
TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are the two core Transport Layer protocols in the Internet Protocol Suite.

### Technical Comparison
| Attribute | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented (3-way handshake) | Connectionless (no session state) |
| Reliability | Guaranteed delivery (ACKs, Retransmission) | Unreliable best-effort (packets can be dropped/reordered) |
| Flow & Congestion Control | Yes (Sliding window, Slow Start, AIMD) | None (transmits as fast as application feeds) |
| Overhead | 20-60 byte header | 8 byte header |
| Use Cases | Web (HTTP/1.1, HTTP/2), Email (SMTP), SSH, File transfer | DNS, Video streaming, Voice/VoIP, Gaming, QUIC (HTTP/3) |

### TCP 3-Way Handshake
1. Client -> Server: \`SYN\` (seq = x)
2. Server -> Client: \`SYN-ACK\` (seq = y, ack = x + 1)
3. Client -> Server: \`ACK\` (ack = y + 1)

### TCP 4-Way Teardown
1. Client -> Server: \`FIN\`
2. Server -> Client: \`ACK\` (Client enters FIN_WAIT_2)
3. Server -> Client: \`FIN\` (when server finishes transmitting)
4. Client -> Server: \`ACK\` (Client enters TIME_WAIT for 2*MSL to ensure ACK reached server)

### QUICK REVISION
- TCP: Reliable, ordered, stream-oriented, heavy 20-byte header, flow & congestion controlled.
- UDP: Lightweight 8-byte header, connectionless, zero latency handshake, packets may drop.
- HTTP/3 builds on UDP using QUIC to eliminate head-of-line blocking.`
  },
  {
    id: 'seed_cn_osi_model',
    title: 'OSI 7-Layer Model vs TCP/IP Protocol Architecture',
    category: 'Computer Networks',
    subcategory: 'OSI Model',
    tags: ['cn', 'osi-model', 'tcp-ip', 'networking', 'protocols'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-07-22',
    content: `### Concept
The Open Systems Interconnection (OSI) model standardizes network communication into 7 modular layers from physical transmission up to user applications.

### 7 Layers Mnemonic: "Please Do Not Throw Sausage Pizza Away"
1. Physical: Bits on wire/fiber/radio (Ethernet cable, repeaters, hubs).
2. Data Link: Frames, MAC addressing, error detection (Switches, ARP).
3. Network: Packets, IP addressing, routing path selection (Routers, IPv4, IPv6, ICMP).
4. Transport: Segments/Datagrams, Port addressing, reliability (TCP, UDP).
5. Session: Sessions, token management, synchronization (RPC, NetBIOS).
6. Presentation: Formatting, encryption, compression (TLS/SSL, JSON, JPEG).
7. Application: User-facing application protocols (HTTP, DNS, SSH, FTP).

### QUICK REVISION
- Layer 2 (Data Link) uses MAC addresses and operates with Frames.
- Layer 3 (Network) uses IP addresses and operates with Packets.
- Layer 4 (Transport) uses Ports and operates with Segments/Datagrams.`
  },

  // -------------------------------------------------------------
  // OOP STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_oop_solid',
    title: 'SOLID Principles of Object-Oriented Software Design',
    category: 'OOP',
    subcategory: 'SOLID Principles',
    tags: ['oop', 'solid', 'design-principles', 'architecture', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-20',
    content: `### Concept
SOLID is an acronym for 5 foundational software design principles introduced by Robert C. Martin to make systems maintainable, extensible, and robust.

### The 5 Principles
1. S - Single Responsibility Principle (SRP): A class should have only ONE reason to change. Separate business logic from logging, persistence, or presentation.
2. O - Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification. Use interfaces and abstract classes instead of \`if/else\` type checks.
3. L - Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without breaking program correctness. (e.g. Classic Square inheriting from Rectangle breaks width/height expectations).
4. I - Interface Segregation Principle (ISP): Clients should not be forced to depend upon interfaces they do not use. Prefer many small specific interfaces over one bloated interface.
5. D - Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).

### QUICK REVISION
- SRP: One job per class.
- OCP: Add new features by adding classes, not modifying existing tested code.
- LSP: Derived class must honor base class contract.
- ISP: Lean client-specific interfaces.
- DIP: Depend on abstractions, not concrete implementations.`
  },
  {
    id: 'seed_oop_polymorphism',
    title: 'Polymorphism: Compile-Time vs Runtime (Virtual Table & vptr)',
    category: 'OOP',
    subcategory: 'Polymorphism',
    tags: ['oop', 'polymorphism', 'vtable', 'virtual-functions', 'cpp'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-07-18',
    content: `### Concept
Polymorphism ("many forms") allows one interface to control access to a general class of actions.

### Two Types of Polymorphism
1. Compile-Time (Static) Polymorphism: Resolved at compile time.
   - Function Overloading (same name, different parameter types/count).
   - Operator Overloading.
   - Templates / Generics.
2. Runtime (Dynamic) Polymorphism: Resolved during program execution via virtual function dispatch.

### How Dynamic Polymorphism Works: VTable & vptr
- When a class declares a \`virtual\` function, the compiler creates a \`vtable\` (Virtual Method Table) containing pointers to virtual functions for that class.
- Every instance of the class receives a hidden pointer (\`vptr\`) pointing to its class's vtable.
- Calling \`basePtr->draw()\` dereferences \`basePtr->vptr\` and jumps to the derived method at runtime.

### QUICK REVISION
- Static: Function overloading & templates (zero runtime cost).
- Dynamic: Virtual functions resolved via vtable and vptr lookup.
- Virtual destructors are mandatory in base classes with virtual methods to prevent memory leaks.`
  },

  // -------------------------------------------------------------
  // SYSTEM DESIGN STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_sys_load_balancer',
    title: 'Load Balancing: Layer 4 vs Layer 7 & Algorithms',
    category: 'System Design',
    subcategory: 'Load Balancing',
    tags: ['system-design', 'load-balancing', 'l4-l7', 'scalability', 'nginx'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-15',
    content: `### Concept
A Load Balancer distributes incoming network traffic across multiple backend application servers to ensure high availability, fault tolerance, and optimal resource utilization.

### Layer 4 vs Layer 7 Load Balancing
- Layer 4 (Transport Layer): Routes traffic based on IP address and TCP/UDP ports without decrypting or inspecting application payload. Extremely fast, lower CPU overhead (e.g. AWS NLB, HAProxy).
- Layer 7 (Application Layer): Inspects HTTP headers, cookies, URL paths, and JSON payloads. Enables intelligent routing (e.g. /api/users to UserService, /api/videos to VideoService), SSL termination, and rate limiting (e.g. NGINX, AWS ALB, Envoy).

### Routing Algorithms
- Round Robin / Weighted Round Robin.
- Least Connections / Weighted Least Connections.
- IP Hash / Consistent Hashing (ensures user requests map to same backend for caching).

### QUICK REVISION
- L4: Routes on IP:Port; faster, cannot inspect HTTP.
- L7: Inspects HTTP path, headers, cookies; supports smart routing and SSL termination.
- Load balancers also perform continuous health checks to reroute traffic from failing nodes.`
  },
  {
    id: 'seed_sys_caching',
    title: 'Caching Strategies: Cache-Aside, Write-Through & Eviction Policies',
    category: 'System Design',
    subcategory: 'Caching',
    tags: ['system-design', 'caching', 'redis', 'memcached', 'lru'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-12',
    content: `### Concept
Caching stores copies of frequently accessed data in ultra-fast in-memory storage (e.g., Redis, Memcached) to eliminate slow database queries and disk I/O.

### Caching Strategies
1. Cache-Aside (Lazy Loading):
   - Application checks cache. If hit, return data.
   - If miss, fetch from DB, populate cache, return.
   - Pro: Only requested data is cached. Con: Cache miss penalty on cold reads.
2. Write-Through:
   - Data is written to cache AND database simultaneously in a single transaction.
   - Pro: Cache is never stale. Con: Higher write latency.
3. Write-Back (Write-Behind):
   - Data is written immediately to cache; asynchronous background worker updates DB later.
   - Pro: Ultra-fast writes. Con: Risk of data loss if cache crashes before flush.

### Eviction Policies
- LRU (Least Recently Used): Discards least recently accessed items (implemented with Hash Map + Doubly Linked List).
- LFU (Least Frequently Used): Discards items with lowest access frequency.
- TTL (Time-To-Live): Automatically expires items after specified duration.

### QUICK REVISION
- Cache-aside: Read from cache, fallback to DB on miss.
- Write-through: Writes update cache & DB simultaneously.
- Use TTLs and LRU eviction to prevent stale data and out-of-memory errors.`
  },

  // -------------------------------------------------------------
  // APTITUDE STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_apt_profit_loss',
    title: 'Profit, Loss & Discount: Core Formulas and Shortcuts',
    category: 'Aptitude',
    subcategory: 'Profit & Loss',
    tags: ['aptitude', 'profit-loss', 'percentages', 'placement', 'math'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-07-10',
    content: `### Concept
Profit and Loss calculations measure the financial outcome when goods are purchased at Cost Price (CP) and sold at Selling Price (SP).

### Core Formulas
- Profit = SP - CP (when SP > CP)
- Loss = CP - SP (when CP > SP)
- Profit % = (Profit / CP) * 100
- Loss % = (Loss / CP) * 100
- Marked Price (MP) & Discount: Discount % = (Discount / MP) * 100
- SP with Discount: SP = MP * (1 - Discount%/100)

### Essential Shortcut Techniques
1. Fractional Equivalents:
   - 20% = 1/5 (if profit is 20%, SP is 6/5 of CP).
   - 25% = 1/4 (SP is 5/4 of CP).
   - 16.66% = 1/6 (SP is 7/6 of CP).
2. Two Successive Discounts A% and B%:
   - Net Discount = A + B - (A * B) / 100

### Practice Example
- Problem: An item marked at $800 is sold with two successive discounts of 20% and 10%. Find the final selling price.
- Calculation: Net discount = 20 + 10 - (200/100) = 28%.
- Final SP = 800 * (1 - 0.28) = 800 * 0.72 = $576.

### QUICK REVISION
- Profit% and Loss% are ALWAYS calculated over Cost Price (CP), never Selling Price.
- Discount is ALWAYS calculated over Marked Price (MP).
- Successive discounts: Net = A + B - (AB/100).`
  },
  {
    id: 'seed_apt_time_work',
    title: 'Time & Work: LCM Method & Efficiency Ratio Technique',
    category: 'Aptitude',
    subcategory: 'Time & Work',
    tags: ['aptitude', 'time-and-work', 'lcm-method', 'placement', 'math'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-07-08',
    content: `### Concept
Time & Work problems evaluate the time required for individuals or teams with varying efficiencies to complete a task.

### The Superior LCM Technique
Never calculate with fractions (1/A + 1/B). Instead:
1. Total Work = LCM of individual times.
2. Individual Efficiency (Units/Day) = Total Work / Individual Days.
3. Combined Days = Total Work / Sum of Efficiencies.

### Step-by-Step Example
- Problem: Person A can complete a work in 12 days. Person B can complete it in 18 days. If they work together, how many days will it take?
- Step 1: Total Work = LCM(12, 18) = 36 units.
- Step 2: Efficiency of A = 36 / 12 = 3 units/day.
- Step 3: Efficiency of B = 36 / 18 = 2 units/day.
- Step 4: Combined Efficiency = 3 + 2 = 5 units/day.
- Step 5: Total Days = 36 / 5 = 7.2 days.

### QUICK REVISION
- Total Work = LCM of times.
- Daily output = Work / Time.
- Work done = Efficiency * Time.`
  },

  // -------------------------------------------------------------
  // INTERVIEW PREPARATION STARTER NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_interview_tell_me_about_yourself',
    title: 'Behavioral: "Tell Me About Yourself" (The Present-Past-Future Framework)',
    category: 'Interview Preparation',
    subcategory: 'HR Questions',
    tags: ['interview', 'hr-questions', 'behavioral', 'elevator-pitch', 'career'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-07-05',
    content: `### Concept
"Tell me about yourself" is the opening question in nearly every technical interview. It sets the tone, demonstrates communication clarity, and directs the interviewer to topics you excel at.

### The Winning Formula: Present -> Past -> Future (90-120 seconds max)
1. Present (30 sec): Current role, key technical stack, and your most impressive recent technical accomplishment.
2. Past (40 sec): How you grew your engineering foundation, notable previous projects, internships, or open-source work.
3. Future (30 sec): Why this specific role and company align with your career roadmap and what technical value you will deliver.

### Example Script
"I'm a full-stack software engineer with a strong focus on high-performance web systems and data structures. Currently, I've been building DevPilot AI, an end-to-end developer productivity workspace featuring ATS resume parsing, intelligent DSA roadmaps, and full-stack technical knowledge vaults.

Previously, I honed my fundamentals building distributed backend services with Node.js and PostgreSQL, focusing on database indexing, caching strategies, and REST API design.

I'm passionate about engineering scalable, resilient systems, and I was drawn to your team because of your recent work scaling real-time distributed microservices."

### Common Mistakes
- Reciting your resume chronologically from high school.
- Rambling about personal hobbies unrelated to engineering.
- Talking for longer than 2.5 minutes without checking in.

### QUICK REVISION
- Follow Present -> Past -> Future.
- Keep response between 90 and 120 seconds.
- Highlight 1-2 major technical wins that invite follow-up questions.`
  },
  {
    id: 'seed_interview_explain_project',
    title: 'Technical Project Deep Dive: The STAR-T Architecture Framework',
    category: 'Interview Preparation',
    subcategory: 'Project Questions',
    tags: ['interview', 'project-questions', 'star-method', 'architecture', 'system-design'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-07-02',
    content: `### Concept
Interviewers ask "Walk me through your most complex project" to evaluate architectural thinking, trade-off analysis, and technical ownership.

### The STAR-T Framework
1. Situation: Business problem or technical motivation.
2. Task: Your exact responsibility and deliverables.
3. Action: Deep technical implementation details, architectural choices, and trade-offs made.
4. Result: Quantitative metrics (e.g., "Reduced response latency by 45%", "Achieved 99.4% parsing accuracy").
5. Trade-off (The differentiator): What alternative did you reject and why?

### Common Technical Traps
- Using "We did X" instead of clarifying YOUR specific contribution.
- Saying "There were no challenges": Real engineers explain bottlenecks, race conditions, or memory leaks they diagnosed and resolved.

### QUICK REVISION
- Structure responses using Situation, Task, Action, Result, and Trade-off.
- Always include concrete quantitative metrics.
- Be prepared to draw your database schema and architecture on a whiteboard.`
  },

  // -------------------------------------------------------------
  // SUPPORTING ROADMAP NOTES: LINUX, DOCKER, CLOUD, PYTHON, GIT
  // -------------------------------------------------------------
  {
    id: 'seed_linux_permissions',
    title: 'Linux File Permissions: chmod, chown & Octal Notation',
    category: 'Linux',
    subcategory: 'chmod',
    tags: ['linux', 'permissions', 'chmod', 'chown', 'security', 'devops'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-06-28',
    content: `### Concept
Linux enforces security through a 3-tier permission model: User (Owner), Group, and Others across Read (r), Write (w), and Execute (x) privileges.

### Octal Values
- Read (r) = 4
- Write (w) = 2
- Execute (x) = 1
Summing values yields permission integer (e.g. rwx = 4+2+1 = 7, r-x = 4+0+1 = 5).

### Common Examples
\`\`\`bash
chmod 755 script.sh # Owner: rwx (7), Group: r-x (5), Others: r-x (5)
chmod 600 id_rsa    # Owner: rw- (6), Group: none (0), Others: none (0) - SSH Key
chown user:group file.txt # Change file ownership
\`\`\`

### QUICK REVISION
- Permissions: User / Group / Others.
- 4 = Read, 2 = Write, 1 = Execute.
- 755: executable by all, writable only by owner. 600: private sensitive file.`
  },
  {
    id: 'seed_docker_architecture',
    title: 'Docker Core Architecture: Images, Containers, Layers & UnionFS',
    category: 'Docker',
    subcategory: 'Containers',
    tags: ['docker', 'containers', 'devops', 'images', 'virtualization'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-25',
    content: `### Concept
Docker provides OS-level virtualization to package applications and their dependencies into portable, isolated containers sharing the host OS kernel via Linux namespaces and cgroups.

### Image vs Container
- Image: Immutable, read-only snapshot constructed from layered instructions in a \`Dockerfile\`.
- Container: Running instance of an image with a thin, writable container layer on top (Copy-on-Write via UnionFS).

### Key Docker Commands
\`\`\`bash
docker build -t myapp:latest .
docker run -d -p 8080:80 --name my-app myapp:latest
docker exec -it my-app /bin/sh
docker-compose up -d
\`\`\`

### QUICK REVISION
- Containers share the host kernel (unlike VMs which require full guest OS hypervisors).
- Images are immutable stacked layers; containers add a writable Copy-on-Write top layer.`
  },
  {
    id: 'seed_python_generators',
    title: 'Python Generators, Iterators & Memory Efficiency',
    category: 'Python',
    subcategory: 'Functions',
    tags: ['python', 'generators', 'iterators', 'yield', 'performance'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-20',
    content: `### Concept
Generators are lazy iterators created using the \`yield\` statement. Instead of calculating and storing an entire list in RAM, a generator computes values on-the-fly one element at a time.

### Syntax & Example
\`\`\`python
# Returns generator object: O(1) memory consumption
def read_large_file(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

for line in read_large_file('huge_log.txt'):
    process(line)
\`\`\`

### QUICK REVISION
- \`yield\` pauses function execution and saves its internal state.
- Generators evaluate lazily -> allows processing gigabyte datasets in O(1) memory.`
  },
  {
    id: 'seed_git_rebase_merge',
    title: 'Git Rebase vs Git Merge: History Linearity & Safety',
    category: 'Git & GitHub',
    subcategory: 'merge',
    tags: ['git', 'github', 'version-control', 'rebase', 'merge'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-15',
    content: `### Concept
Both \`git merge\` and \`git rebase\` integrate changes from one branch into another, but they produce completely different commit histories.

### Comparison
- \`git merge\`: Preserves exact chronological branch history and creates an explicit 3-way merge commit. Safe, non-destructive, but can clutter log graphs.
- \`git rebase\`: Re-writes history by replaying your local commits on top of the target branch, producing a clean, perfectly linear commit history.

### The Golden Rule of Rebasing
NEVER rebase commits that exist outside your local repository on public/shared branches! Rewriting shared history forces team members into divergent trees.

### QUICK REVISION
- Merge: Non-destructive, creates merge commit, preserves history.
- Rebase: Linear history, rewrites commit hashes. Never rebase shared public branches.`
  },

  // -------------------------------------------------------------
  // ADDITIONAL DSA ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_dsa_linked_list_cycle',
    title: 'Linked List: Floyd\'s Cycle Detection (Tortoise and Hare)',
    category: 'DSA & Problem Solving',
    subcategory: 'Linked List',
    tags: ['dsa', 'linked-list', 'two-pointers', 'cycle-detection', 'leetcode'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-12',
    content: `### Concept
Floyd's Cycle-Finding Algorithm detects loops in a linked list using two pointers moving at different speeds: slow (1 step) and fast (2 steps).

### Why it works
If a cycle exists of length C, the distance between fast and slow decreases by 1 on every step. They must meet inside the loop within O(N) steps. To find the cycle entry point: reset \`slow = head\`, keep \`fast\` at meeting point, and advance both 1 step at a time until they collide.

### Implementation
\`\`\`cpp
ListNode *detectCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow; // Cycle start node
        }
    }
    return nullptr;
}
\`\`\`

### QUICK REVISION
- Slow moves 1 step; Fast moves 2 steps.
- Meeting confirms cycle exists in O(N) time and O(1) space.
- Reset slow to head and move both 1 step to locate cycle entry point.`
  },
  {
    id: 'seed_dsa_heap_top_k',
    title: 'Heap / Priority Queue: Top K Frequent Elements Pattern',
    category: 'DSA & Problem Solving',
    subcategory: 'Heap / Priority Queue',
    tags: ['dsa', 'heap', 'priority-queue', 'top-k', 'leetcode'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-10',
    content: `### Concept
Finding Top K elements using a Min-Heap maintains only K elements at any time, reducing time complexity from O(N log N) full sorting down to O(N log K).

### Min-Heap vs Max-Heap Rule of Thumb
- To find Top K Largest/Frequent: Use Min-Heap of size K (pop smallest when size > K).
- To find Top K Smallest: Use Max-Heap of size K.

### C++ Snippet
\`\`\`cpp
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;
    
    // min-heap storing {count, val}
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    for (auto& [val, count] : freq) {
        pq.push({count, val});
        if (pq.size() > k) pq.pop();
    }
    vector<int> res;
    while (!pq.empty()) {
        res.push_back(pq.top().second);
        pq.pop();
    }
    return res;
}
\`\`\`

### QUICK REVISION
- Min-heap of size K finds K largest elements in O(N log K).
- Evicts the smallest candidate when capacity exceeds K.
- Bucket sort alternative achieves O(N) if count is bounded by array length.`
  },
  {
    id: 'seed_dsa_graph_bfs_dfs',
    title: 'Graph Fundamentals: BFS vs DFS & Cycle Detection',
    category: 'DSA & Problem Solving',
    subcategory: 'Graphs',
    tags: ['dsa', 'graphs', 'bfs', 'dfs', 'topological-sort', 'leetcode'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-08',
    content: `### Concept
Breadth-First Search (BFS) explores level-by-level using a Queue (guarantees shortest path in unweighted graphs). Depth-First Search (DFS) explores as deep as possible using recursion or a Stack.

### Cycle Detection
- Undirected Graph: In DFS, if neighbor is visited and neighbor != parent, cycle detected.
- Directed Graph: Requires 3 states (0 = unvisited, 1 = visiting/in current recursion call stack, 2 = visited). If we reach a node with state 1, a back-edge (cycle) exists.

### QUICK REVISION
- BFS: Shortest path in unweighted graphs; uses Queue.
- DFS: Exhaustive search / connected components; uses recursion.
- Directed cycle detection requires 3-state tracking to detect back-edges.`
  },
  {
    id: 'seed_dsa_dp_knapsack',
    title: 'Dynamic Programming: 0/1 Knapsack & Space Optimization',
    category: 'DSA & Problem Solving',
    subcategory: 'Dynamic Programming',
    tags: ['dsa', 'dp', 'knapsack', 'memoization', 'algorithms'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-06-05',
    content: `### Concept
0/1 Knapsack maximizes total value of items placed into a bag of capacity W where each item can be chosen at most once.

### Recurrence Relation
\`dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])\` (if wt[i-1] <= w).

### 1D Array Space Optimization
\`\`\`cpp
int knapSack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        // Iterate backwards from W down to wt[i] to avoid using same item twice!
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}
\`\`\`

### QUICK REVISION
- 0/1 Knapsack: Iterate backwards in 1D array to prevent using same item multiple times.
- Unbounded Knapsack (Coin Change): Iterate forwards.
- Time Complexity: O(N * W); Space Complexity: O(W).`
  },

  // -------------------------------------------------------------
  // ADDITIONAL C++ ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_cpp_set_multiset',
    title: 'std::set vs std::multiset: Red-Black Trees & Duplicates',
    category: 'C++',
    subcategory: 'set',
    tags: ['cpp', 'stl', 'set', 'multiset', 'red-black-tree'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-06-02',
    content: `### Concept
\`std::set\` stores unique keys in strictly sorted order. \`std::multiset\` permits duplicate keys while maintaining sorted order using Self-Balancing Red-Black Trees.

### Trap with multiset::erase()
\`\`\`cpp
std::multiset<int> ms = {5, 5, 5, 10};
ms.erase(5); // TRAP: Deletes ALL occurrences of 5!

// To erase ONLY ONE occurrence:
auto it = ms.find(5); // returns iterator to one instance
if (it != ms.end()) ms.erase(it);
\`\`\`

### QUICK REVISION
- Both guarantee O(log N) insert, find, and erase.
- set requires unique keys; multiset allows duplicates.
- ms.erase(val) deletes all copies; ms.erase(ms.find(val)) deletes only one.`
  },
  {
    id: 'seed_cpp_priority_queue',
    title: 'std::priority_queue: Max-Heap, Min-Heap & Custom Comparators',
    category: 'C++',
    subcategory: 'priority_queue',
    tags: ['cpp', 'stl', 'priority-queue', 'heap', 'comparator'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-05-30',
    content: `### Concept
\`std::priority_queue\` is a container adaptor providing O(1) lookup of the highest-priority element and O(log N) insertion and deletion.

### Syntax
\`\`\`cpp
// Default: Max-Heap
priority_queue<int> maxH;

// Min-Heap (std::greater)
priority_queue<int, vector<int>, greater<int>> minH;

// Custom Comparator with struct
struct ComparePairs {
    bool operator()(const pair<int,int>& a, const pair<int,int>& b) {
        return a.first > b.first; // Min-heap based on first element
    }
};
priority_queue<pair<int,int>, vector<pair<int,int>>, ComparePairs> customPQ;
\`\`\`

### QUICK REVISION
- Default is Max-Heap (std::less).
- Use std::greater for Min-Heap.
- pq.top() inspects root; pq.pop() removes root.`
  },

  // -------------------------------------------------------------
  // ADDITIONAL JAVASCRIPT ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_js_hoisting_tdz',
    title: 'Hoisting, Temporal Dead Zone (TDZ) & Execution Context',
    category: 'JavaScript',
    subcategory: 'Hoisting',
    tags: ['javascript', 'hoisting', 'tdz', 'scope', 'v8', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-05-25',
    content: `### Concept
Hoisting is JavaScript's compilation phase behavior where variable and function declarations are put into memory before any code execution occurs.

### var vs let/const
- \`var\`: Hoisted and initialized with \`undefined\`. Accessing before assignment returns \`undefined\`.
- \`let\` / \`const\`: Hoisted into memory but NOT initialized. Accessing them before their declaration line throws \`ReferenceError: Cannot access variable before initialization\`.
- Temporal Dead Zone (TDZ): The time period between entering scope and variable declaration line.

### QUICK REVISION
- Function declarations are hoisted with their complete definitions.
- Function expressions (const fn = () => {}) behave like let/const (TDZ applies).
- TDZ prevents silent bugs from accessing uninitialized variables.`
  },
  {
    id: 'seed_js_event_delegation',
    title: 'DOM Event Propagation: Capturing, Bubbling & Event Delegation',
    category: 'JavaScript',
    subcategory: 'Event Delegation',
    tags: ['javascript', 'dom', 'events', 'bubbling', 'event-delegation'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-05-20',
    content: `### Concept
Event Delegation leverages Event Bubbling to attach a single event listener to a parent element instead of hundreds of listeners to individual child nodes.

### 3 Phases of Event Flow
1. Capturing Phase: Event travels down from \`window\` to target element.
2. Target Phase: Event reaches destination element.
3. Bubbling Phase: Event bubbles upward from target back up to \`window\` (default).

### Code Example
\`\`\`javascript
document.getElementById('parent-list').addEventListener('click', (e) => {
  const item = e.target.closest('li.todo-item');
  if (item) {
    console.log('Clicked todo item:', item.dataset.id);
  }
});
\`\`\`

### QUICK REVISION
- Event Bubbling: Events travel up the DOM tree from child to parent.
- Event Delegation saves memory and automatically handles dynamically inserted elements.
- e.target is the element clicked; e.currentTarget is the element with the event listener.`
  },

  // -------------------------------------------------------------
  // ADDITIONAL SQL & DBMS ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_sql_groupby_having',
    title: 'GROUP BY vs HAVING vs WHERE: Execution Order in SQL',
    category: 'SQL',
    subcategory: 'GROUP BY',
    tags: ['sql', 'groupby', 'having', 'aggregate-functions', 'queries'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-05-15',
    content: `### Concept
Understanding the logical execution order of SQL statements prevents common query syntax and aggregation errors.

### Logical SQL Processing Order
1. FROM & JOIN
2. WHERE (filters individual raw rows before grouping)
3. GROUP BY (aggregates rows into groups)
4. HAVING (filters aggregated groups)
5. SELECT (evaluates projections & window functions)
6. DISTINCT
7. ORDER BY
8. LIMIT / OFFSET

### Key Rule
- \`WHERE\` CANNOT filter aggregate functions (e.g. \`WHERE COUNT(*) > 5\` is illegal).
- \`HAVING\` is designed specifically to filter aggregated results.

### QUICK REVISION
- WHERE filters rows before aggregation.
- HAVING filters groups after aggregation.
- ORDER BY runs after SELECT.`
  },
  {
    id: 'seed_dbms_keys',
    title: 'Keys in DBMS: Super Key, Candidate Key, Primary Key & Foreign Key',
    category: 'DBMS',
    subcategory: 'Keys',
    tags: ['dbms', 'keys', 'primary-key', 'foreign-key', 'rdbms'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-05-10',
    content: `### Concept
Keys are attributes or sets of attributes used to uniquely identify records within a table and establish relationships across tables.

### Types of Keys
- Super Key: Any set of attributes that uniquely identifies a row (may contain redundant attributes).
- Candidate Key: A minimal Super Key with zero redundant attributes.
- Primary Key: The chosen Candidate Key selected by the database designer (must be UNIQUE and NOT NULL).
- Alternate Key: Candidate Keys not chosen as the Primary Key.
- Foreign Key: An attribute matching the Primary Key of another table, enforcing Referential Integrity.

### QUICK REVISION
- Super Key: Unique identifier (can have extra columns).
- Candidate Key: Minimal super key.
- Primary Key: Single designated candidate key (no nulls allowed).
- Foreign Key: Enforces referential integrity between tables.`
  },

  // -------------------------------------------------------------
  // ADDITIONAL OS & CN ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_os_mutex_semaphore',
    title: 'Process Synchronization: Mutex vs Binary Semaphore vs Counting Semaphore',
    category: 'Operating Systems',
    subcategory: 'Synchronization',
    tags: ['os', 'synchronization', 'mutex', 'semaphore', 'concurrency', 'interview'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-05-05',
    content: `### Concept
Mutexes and Semaphores are synchronization primitives used to control concurrent access to shared critical sections.

### Technical Differences
- Mutex (Mutual Exclusion Object): Locking mechanism. Has ownership: only the thread that acquired the mutex can unlock it.
- Binary Semaphore: Signaling mechanism with count 0 or 1. Any thread can signal (post) and wake another thread (wait).
- Counting Semaphore: Controls access to finite pool of N identical resources (e.g. database connection pool).

### QUICK REVISION
- Mutex = Lock with ownership (owner must unlock).
- Semaphore = Signaling mechanism without ownership (any thread can signal).
- Counting semaphore manages pools of N identical resources.`
  },
  {
    id: 'seed_cn_http_https',
    title: 'HTTP vs HTTPS: SSL/TLS Handshake & Symmetric Encryption',
    category: 'Computer Networks',
    subcategory: 'HTTPS',
    tags: ['cn', 'http', 'https', 'ssl', 'tls', 'security', 'cryptography'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-04-30',
    content: `### Concept
HTTPS (HTTP Secure) encrypts HTTP traffic over port 443 using TLS (Transport Layer Security) to ensure Confidentiality, Integrity, and Authentication.

### TLS 1.3 Handshake (1-RTT)
1. ClientHello: Sends supported cipher suites + client random + key share.
2. ServerHello: Selects cipher suite + server certificate + server key share. Both derive master symmetric session key using Diffie-Hellman.
3. Encrypted Traffic Begins: Fast symmetric encryption (AES-GCM or ChaCha20) encrypts all subsequent application data.

### QUICK REVISION
- HTTP transmits plaintext on port 80 (vulnerable to man-in-the-middle).
- HTTPS uses asymmetric cryptography during handshake to exchange symmetric session key.
- Bulk data is encrypted with fast symmetric keys (AES-GCM).`
  },

  // -------------------------------------------------------------
  // ADDITIONAL OOP & SYSTEM DESIGN ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_oop_four_pillars',
    title: 'The Four Pillars of OOP: Encapsulation, Abstraction, Inheritance, Polymorphism',
    category: 'OOP',
    subcategory: 'Class',
    tags: ['oop', 'four-pillars', 'abstraction', 'encapsulation', 'inheritance', 'interview'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-04-25',
    content: `### Concept
Object-Oriented Programming models software as interacting objects encapsulating data and behavior.

### The 4 Pillars
1. Encapsulation: Bundling data and methods that operate on that data within a single unit, hiding internal representation (using private/protected access modifiers).
2. Abstraction: Hiding implementation details and exposing only essential interfaces (using abstract classes and interfaces).
3. Inheritance: Reusing and extending existing class behavior in derived classes ("is-a" relationship).
4. Polymorphism: Ability of different objects to respond to the same message in unique ways (compile-time vs runtime).

### QUICK REVISION
- Encapsulation: Protects internal state.
- Abstraction: Simplifies interface.
- Inheritance: Code reuse.
- Polymorphism: Dynamic method dispatch.`
  },
  {
    id: 'seed_sys_replication_sharding',
    title: 'Database Scaling: Replication (Master-Slave) vs Sharding (Horizontal Partitioning)',
    category: 'System Design',
    subcategory: 'Database Scaling',
    tags: ['system-design', 'replication', 'sharding', 'databases', 'scaling'],
    difficulty: 'Hard',
    isInterviewImportant: true,
    date: '2026-04-20',
    content: `### Concept
As traffic and data size outgrow a single database server, systems scale using Replication (for read throughput and fault tolerance) and Sharding (for storage and write throughput).

### Master-Slave Replication
- 1 Master (handles all writes) + N Read Replicas (handle reads).
- Challenge: Replication lag can cause stale reads immediately after writes.

### Sharding (Horizontal Partitioning)
- Splitting large table rows across separate physical database nodes based on a \`Shard Key\` (e.g. hash(user_id) % num_shards).
- Challenge: Cross-shard joins are extremely slow; re-sharding requires consistent hashing.

### QUICK REVISION
- Replication scales read traffic and adds redundancy.
- Sharding scales storage and write traffic by splitting data across machines.
- Choosing an even, non-skewed Shard Key is critical to avoid hotspot shards.`
  },
  {
    id: 'seed_sys_rate_limiting',
    title: 'Rate Limiting Algorithms: Token Bucket, Leaky Bucket & Sliding Window',
    category: 'System Design',
    subcategory: 'Rate Limiting',
    tags: ['system-design', 'rate-limiting', 'token-bucket', 'redis', 'api-gateway'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-04-15',
    content: `### Concept
Rate limiters protect APIs from DDoS attacks, brute-force requests, and resource exhaustion by capping requests per client over time.

### Core Algorithms
1. Token Bucket: Tokens added to bucket at fixed rate R up to capacity C. Requests consume 1 token. Allows bursts of traffic up to C. (Used by AWS, Stripe).
2. Leaky Bucket: Requests enter FIFO queue and leak out at constant rate. Smooths bursts into uniform flow.
3. Sliding Window Log: Stores request timestamps in Redis Sorted Set (\`ZREMRANGEBYSCORE\`). Most accurate, higher memory.
4. Sliding Window Counter: Combines previous window counter and current window progress. Low memory and high accuracy.

### QUICK REVISION
- Token Bucket allows controlled bursts; simple to implement in Redis.
- Leaky Bucket enforces constant output rate.
- Sliding Window Counter offers best balance of accuracy and memory efficiency.`
  },

  // -------------------------------------------------------------
  // ADDITIONAL APTITUDE & INTERVIEW ROADMAP NOTES
  // -------------------------------------------------------------
  {
    id: 'seed_apt_percentages',
    title: 'Percentages: Net Successive Percentage Change & Base Shifting',
    category: 'Aptitude',
    subcategory: 'Percentages',
    tags: ['aptitude', 'percentages', 'math', 'placement', 'shortcuts'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-04-10',
    content: `### Concept
Mastering percentage shortcuts eliminates time-consuming division during placement aptitude exams.

### Successive Percentage Formula
If a value increases by A% and then by B%:
\`Net % Change = A + B + (A * B) / 100\`
- If decreasing, treat value as negative (e.g. discount).

### Base Inversion Trick
If salary of A is 25% (1/4) more than B, then salary of B is what % less than A?
- Rule: If A is \`1/x\` more, B is \`1/(x + 1)\` less.
- Since 25% = 1/4 more, B is 1/(4 + 1) = 1/5 = 20% less!

### QUICK REVISION
- Successive changes: Net = A + B + (AB / 100).
- If +1/N more, then -1/(N+1) less.`
  },
  {
    id: 'seed_apt_time_speed_distance',
    title: 'Time, Speed & Distance: Relative Speed, Trains & Boats',
    category: 'Aptitude',
    subcategory: 'Time Speed Distance',
    tags: ['aptitude', 'time-speed-distance', 'relative-speed', 'math', 'placement'],
    difficulty: 'Easy',
    isInterviewImportant: true,
    date: '2026-04-05',
    content: `### Concept
Core relations governing moving bodies, relative motion, and river currents.

### Formulas
- Speed = Distance / Time
- Conversion: \`1 km/h = 5/18 m/s\`; \`1 m/s = 18/5 km/h\`
- Relative Speed:
  - Opposite directions: \`S_rel = S1 + S2\`
  - Same direction: \`S_rel = |S1 - S2|\`
- Boats & Streams:
  - Downstream speed = \`u + v\` (boat + stream)
  - Upstream speed = \`u - v\`
  - Speed of boat in still water = \`(Downstream + Upstream) / 2\`

### QUICK REVISION
- Multiply by 5/18 to convert km/h to m/s.
- Opposite direction speeds ADD; same direction speeds SUBTRACT.
- Train crossing platform: Distance = Length of Train + Length of Platform.`
  },
  {
    id: 'seed_interview_why_tech',
    title: 'Architectural Justification: "Why Did You Choose This Tech Stack?"',
    category: 'Interview Preparation',
    subcategory: 'Technology Questions',
    tags: ['interview', 'tech-stack', 'system-design', 'trade-offs'],
    difficulty: 'Medium',
    isInterviewImportant: true,
    date: '2026-03-30',
    content: `### Concept
Never answer "Because it's popular" or "Because it was easy". Senior engineers justify technologies based on business constraints, concurrency needs, latency requirements, and developer velocity.

### The 3-Point Answer Blueprint
1. Workload Fit: Why the technology matches your read/write ratio or latency goals.
2. Trade-off Acknowledgment: The downside you accepted and how you mitigated it.
3. Alternative Evaluated: The tool you deliberately rejected.

### Example: "Why PostgreSQL over MongoDB?"
"We chose PostgreSQL because our core domain required strong relational consistency, foreign key integrity, and ACID transactions across user payments and profiles. While MongoDB offered flexible schemas, our schema was well-defined, and PostgreSQL's JSONB support gave us semi-structured document storage when needed without giving up relational constraints."

### QUICK REVISION
- Highlight workload fit (I/O, latency, scale).
- State the explicit trade-off you accepted.
- Mention the alternative you rejected.`
  }
];

// Helper utilities for category lookups
function getCategoryById(id) {
  return NOTE_CATEGORIES.find(c => c.id === id || c.name.toLowerCase() === id.toLowerCase()) || null;
}

function getCategoryByName(name) {
  if (!name) return null;
  const n = name.trim().toLowerCase();
  return NOTE_CATEGORIES.find(c => c.name.toLowerCase() === n || c.shortName.toLowerCase() === n || c.id === n) || null;
}

function getSubcategoriesForCategory(catName) {
  const cat = getCategoryByName(catName);
  return cat ? cat.subcategories : ['General'];
}

function getCategoryColorClass(catName) {
  const cat = getCategoryByName(catName);
  return cat ? cat.colorClass : 'tag-general';
}

function getCategoryShortName(catName) {
  const cat = getCategoryByName(catName);
  return cat ? cat.shortName : (catName || 'General');
}

// Export for browser and Node.js environment
if (typeof window !== 'undefined') {
  window.NOTE_CATEGORIES = NOTE_CATEGORIES;
  window.DEFAULT_NOTES = DEFAULT_NOTES;
  window.getCategoryById = getCategoryById;
  window.getCategoryByName = getCategoryByName;
  window.getSubcategoriesForCategory = getSubcategoriesForCategory;
  window.getCategoryColorClass = getCategoryColorClass;
  window.getCategoryShortName = getCategoryShortName;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NOTE_CATEGORIES,
    DEFAULT_NOTES,
    getCategoryById,
    getCategoryByName,
    getSubcategoriesForCategory,
    getCategoryColorClass,
    getCategoryShortName
  };
}
