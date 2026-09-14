/**
 * DevPilot-AI - Code Snippet Vault Data
 * Static structured dataset containing real, copy-paste-ready, production & DSA code snippets.
 */

const SNIPPET_CATEGORIES = [
  {
    name: 'DSA',
    subcategories: [
      'Arrays', 'Strings', 'Vectors', 'Two Pointers', 'Sliding Window',
      'Prefix Sum', 'Hashing', 'Stack', 'Queue', 'Linked List',
      'Binary Tree', 'BST', 'Heap / Priority Queue', 'Graph',
      'Recursion', 'Backtracking', 'Greedy', 'Dynamic Programming',
      'Bit Manipulation', 'Sorting', 'Searching'
    ]
  },
  {
    name: 'Web Development',
    subcategories: [
      'DOM', 'Events', 'Fetch API', 'Promises', 'Async/Await',
      'LocalStorage', 'SessionStorage', 'Form Validation',
      'Debounce', 'Throttle', 'API Calls', 'Error Handling'
    ]
  },
  {
    name: 'Backend',
    subcategories: [
      'Node.js', 'Express.js', 'REST API', 'Middleware',
      'Authentication', 'JWT', 'File Upload', 'Environment Variables'
    ]
  },
  {
    name: 'Database',
    subcategories: [
      'SQL', 'PostgreSQL', 'MongoDB', 'Transactions', 'Indexing'
    ]
  },
  {
    name: 'Computer Science',
    subcategories: [
      'OOP', 'System Design', 'OS', 'DBMS', 'Computer Networks'
    ]
  },
  {
    name: 'Git / Dev Tools',
    subcategories: [
      'Git', 'GitHub', 'Linux', 'Docker'
    ]
  },
  {
    name: 'Python / AI',
    subcategories: [
      'Python Basics', 'NumPy', 'Pandas', 'FastAPI', 'ML Preprocessing'
    ]
  },
  {
    name: 'HTML/CSS',
    subcategories: [
      'Flexbox', 'Grid', 'Responsive Layout', 'UI Components', 'Animations'
    ]
  }
];

const SNIPPETS_DATA = [
  // =============================================================
  // PRESERVED ORIGINAL SNIPPETS (Enriched with full schema)
  // =============================================================
  {
    id: 's1',
    title: 'Robust Debounce with Cancellation',
    category: 'Web Development',
    subcategory: 'Debounce',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Delays function execution until after a designated wait time has elapsed since the last time it was invoked.',
    code: `function debounce(fn, waitMs) {
  let timerId;
  const debounced = function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), waitMs);
  };
  debounced.cancel = () => clearTimeout(timerId);
  return debounced;
}`,
    explanation: 'Maintains an enclosed timerId reference. Each new invocation cancels the existing pending timeout and registers a fresh one. A cancel() method is exposed for component teardown or unmount lifecycles.',
    complexity: { time: 'O(1) per call', space: 'O(1) memory overhead' },
    useCases: 'Search bar auto-complete, window resize recalculations, autosave draft typing.',
    commonMistakes: 'Re-creating the debounce wrapper inside a component render cycle (must be memoized via useCallback or stored in a ref).',
    tags: ['debounce', 'timing', 'performance', 'events', 'javascript', 'frontend']
  },
  {
    id: 's2',
    title: 'Fast I/O Template for Competitive Programming',
    category: 'DSA',
    subcategory: 'Arrays',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Unsyncs C++ standard streams with C stdio and unties cin from cout for ultra-fast input processing.',
    code: `#include <bits/stdc++.h>
using namespace std;

void fastIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
}

int main() {
    fastIO();
    // Your algorithm logic here
    return 0;
}`,
    explanation: 'By default, cin/cout are synchronized with C stdio buffers (scanf/printf) and cin flushes cout before reading. Unsyncing with sync_with_stdio(false) and untying cin allows buffered stream reads matching C-speed.',
    complexity: { time: 'O(1) setup', space: 'O(1)' },
    useCases: 'LeetCode, Codeforces, competitive programming problems with 10^5+ inputs.',
    commonMistakes: 'Using printf/scanf together with cin/cout after un-syncing causes interleaved, corrupted I/O.',
    tags: ['cpp', 'fast-io', 'competitive-programming', 'dsa', 'template']
  },
  {
    id: 's3',
    title: 'Modern CSS Glassmorphism Card',
    category: 'HTML/CSS',
    subcategory: 'UI Components',
    language: 'HTML/CSS',
    langClass: 'lang-html',
    difficulty: 'Easy',
    description: 'Sleek frosted-glass background card effect using backdrop-filter and subtle semi-transparent borders.',
    code: `.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}`,
    explanation: 'Uses backdrop-filter to blur whatever content is physically rendered behind this container. Uses a semi-transparent RGBA fill and high-contrast highlight border to achieve modern depth.',
    complexity: { time: 'GPU accelerated', space: 'N/A' },
    useCases: 'Modern landing page cards, navigation bars, modal dialog backgrounds.',
    commonMistakes: 'Forgetting -webkit-backdrop-filter which breaks rendering in Safari.',
    tags: ['css', 'glassmorphism', 'card', 'styling', 'ui', 'modern']
  },
  {
    id: 's4',
    title: 'LRU Cache with OrderedDict',
    category: 'Computer Science',
    subcategory: 'System Design',
    language: 'Python',
    langClass: 'lang-python',
    difficulty: 'Medium',
    description: 'Python implementation of a fixed-size Least Recently Used (LRU) cache with O(1) read/write performance.',
    code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    explanation: 'OrderedDict combines an internal hash map with a doubly linked list. move_to_end marks an accessed key as most recently used. popitem(last=False) evicts the oldest item from the front in O(1).',
    complexity: { time: 'O(1) get, O(1) put', space: 'O(capacity)' },
    useCases: 'LeetCode #146, caching expensive API queries, in-memory buffer eviction.',
    commonMistakes: 'Forgetting to move existing keys to the end when updating values in put().',
    tags: ['python', 'lru-cache', 'system-design', 'data-structures', 'leetcode']
  },
  {
    id: 's5',
    title: 'Async Retry with Exponential Backoff',
    category: 'Web Development',
    subcategory: 'Async/Await',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Retries a promise-returning asynchronous operation multiple times with increasing delay intervals.',
    code: `async function fetchWithRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(r => setTimeout(r, delay));
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
}`,
    explanation: 'Wraps an async function invocation in a try/catch. Upon failure, pauses execution using an awaited Promise timer that doubles in duration on each successive retry attempt.',
    complexity: { time: 'O(retries * delay)', space: 'O(retries) recursion stack' },
    useCases: 'Network resilience, third-party webhook dispatching, database reconnection.',
    commonMistakes: 'Retrying on 4xx client errors (e.g. 401 Unauthorized or 404 Not Found) which will never succeed regardless of retries.',
    tags: ['async', 'retry', 'exponential-backoff', 'promises', 'javascript', 'network']
  },
  {
    id: 's6',
    title: 'Dijkstra Shortest Path with Min-Heap',
    category: 'DSA',
    subcategory: 'Graph',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Hard',
    description: 'Finds single-source shortest paths in a non-negative weighted graph in O((V + E) log V).',
    code: `vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    vector<int> dist(V, 1e9);
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
    explanation: 'Maintains shortest tentative distances in vector dist. Min-heap extracts node u with lowest distance. If popped distance is stale (d > dist[u]), it skips to avoid redundant relaxations.',
    complexity: { time: 'O((V + E) log V)', space: 'O(V + E)' },
    useCases: 'GPS navigation, routing protocols (OSPF), network packet routing, LeetCode #743.',
    commonMistakes: 'Failing to skip stale pairs with "if (d > dist[u]) continue", causing TLE on dense graphs.',
    tags: ['dsa', 'cpp', 'graph', 'dijkstra', 'shortest-path', 'priority-queue']
  },

  // =============================================================
  // C++ DSA SNIPPETS (Arrays, Strings, STL, Search, Trees, DP)
  // =============================================================
  {
    id: 'cpp_arr_lower_upper_bound',
    title: 'Binary Search: std::lower_bound & std::upper_bound',
    category: 'DSA',
    subcategory: 'Searching',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Finds first element >= val (lower_bound) and first element > val (upper_bound) in a sorted range in O(log N).',
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 4, 4, 4, 6, 8};
    
    // First element >= 4 (index 2)
    auto lb = lower_bound(nums.begin(), nums.end(), 4);
    int lb_idx = distance(nums.begin(), lb);
    
    // First element > 4 (index 5)
    auto ub = upper_bound(nums.begin(), nums.end(), 4);
    int ub_idx = distance(nums.begin(), ub);
    
    // Frequency of 4: ub - lb = 5 - 2 = 3
    int count = ub - lb;
    cout << "Index >= 4: " << lb_idx << ", Count of 4s: " << count << endl;
    return 0;
}`,
    explanation: 'Runs binary search over a sorted random-access range. lower_bound returns iterator to first item >= target. upper_bound returns iterator to first item > target. Subtracting iterators gives total occurrences.',
    complexity: { time: 'O(log N)', space: 'O(1)' },
    useCases: 'Counting element frequencies in sorted arrays, interval overlap queries, finding insertion positions.',
    commonMistakes: 'Calling std::lower_bound on std::set or std::map instead of member s.lower_bound()! The generic version takes O(N) on non-random-access iterators.',
    tags: ['cpp', 'stl', 'binary-search', 'lower_bound', 'upper_bound', 'dsa']
  },
  {
    id: 'cpp_arr_erase_remove',
    title: 'Remove-Erase Idiom for std::vector',
    category: 'DSA',
    subcategory: 'Vectors',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Correctly removes all occurrences of a value or elements matching a predicate from a vector in O(N).',
    code: `#include <vector>
#include <algorithm>
using namespace std;

void removeValue(vector<int>& v, int val) {
    // 1. Remove all instances of specific value
    v.erase(remove(v.begin(), v.end(), val), v.end());
}

void removeOddNumbers(vector<int>& v) {
    // 2. Remove matching predicate with lambda
    v.erase(remove_if(v.begin(), v.end(), [](int x) {
        return x % 2 != 0;
    }), v.end());
}`,
    explanation: 'std::remove does NOT actually shrink the vector size; it shifts non-matching elements forward and returns an iterator to the new logical end. Calling vec.erase(newEnd, vec.end()) deallocates the trailing elements.',
    complexity: { time: 'O(N) single pass', space: 'O(1)' },
    useCases: 'In-place filtering of arrays, removing duplicate or tombstone items.',
    commonMistakes: 'Calling only std::remove() without vec.erase(), leaving duplicate trailing garbage values at the end of the vector.',
    tags: ['cpp', 'vector', 'stl', 'remove-erase', 'clean-code']
  },
  {
    id: 'cpp_arr_unique_sort',
    title: 'Vector Dedup: std::unique and Coordinate Compression',
    category: 'DSA',
    subcategory: 'Arrays',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Sorts and removes all duplicates from a vector, essential for coordinate compression.',
    code: `#include <vector>
#include <algorithm>
using namespace std;

void coordinateCompress(vector<int>& coords) {
    // 1. Sort elements
    sort(coords.begin(), coords.end());
    
    // 2. Erase adjacent duplicates
    coords.erase(unique(coords.begin(), coords.end()), coords.end());
}

// Query 0-indexed rank of any value in O(log N)
int getCompressedIndex(const vector<int>& coords, int val) {
    return lower_bound(coords.begin(), coords.end(), val) - coords.begin();
}`,
    explanation: 'std::unique moves unique consecutive elements to front. When preceded by std::sort, it leaves only unique elements. Combined with lower_bound, this compresses large values [10^9] down to compact indices [0...N].',
    complexity: { time: 'O(N log N)', space: 'O(1)' },
    useCases: 'Fenwick tree/Segment tree queries over huge coordinate ranges, discrete event simulation.',
    commonMistakes: 'Running std::unique on an unsorted vector; it only removes adjacent duplicates!',
    tags: ['cpp', 'vector', 'unique', 'coordinate-compression', 'stl']
  },
  {
    id: 'cpp_sort_custom_comparator',
    title: 'Custom Sort with Lambda Comparators',
    category: 'DSA',
    subcategory: 'Sorting',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Sorts complex objects, pairs, or intervals using strict weak ordering lambda functions.',
    code: `#include <vector>
#include <algorithm>
using namespace std;

struct Interval {
    int start, end;
};

void sortIntervals(vector<Interval>& intervals) {
    // Sort by start ascending; tie-break by end descending
    sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b) {
        if (a.start != b.start) {
            return a.start < b.start;
        }
        return a.end > b.end;
    });
}`,
    explanation: 'C++ sorting requires a Strict Weak Ordering comparator: if a == b, cmp(a, b) must return false. Never use <= or >= in std::sort comparators or it causes undefined behavior (segmentation fault).',
    complexity: { time: 'O(N log N)', space: 'O(log N)' },
    useCases: 'Interval scheduling (LeetCode #56, #435), multi-attribute rank sorting.',
    commonMistakes: 'Using <= instead of < in comparator. When elements are equal, returning true violates strict weak ordering and crashes std::sort.',
    tags: ['cpp', 'sorting', 'lambda', 'comparator', 'intervals']
  },
  {
    id: 'cpp_str_tokenize',
    title: 'String Tokenization with stringstream',
    category: 'DSA',
    subcategory: 'Strings',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Splits a delimiter-separated string into individual word tokens using stringstream.',
    code: `#include <string>
#include <vector>
#include <sstream>
using namespace std;

// Split by space/whitespace
vector<string> splitWhitespace(const string& s) {
    vector<string> tokens;
    stringstream ss(s);
    string word;
    while (ss >> word) {
        tokens.push_back(word);
    }
    return tokens;
}

// Split by custom delimiter (e.g., comma)
vector<string> splitByDelimiter(const string& s, char delim) {
    vector<string> tokens;
    stringstream ss(s);
    string token;
    while (getline(ss, token, delim)) {
        tokens.push_back(token);
    }
    return tokens;
}`,
    explanation: 'stringstream treats a string as an I/O stream. The extraction operator >> automatically consumes whitespace. std::getline extracts tokens up to a designated delimiter char.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCases: 'Parsing CSV data, tokenizing sentence words, LeetCode #151 (Reverse Words in a String).',
    commonMistakes: 'Missing consecutive delimiters in getline produces empty string tokens which may need filtering.',
    tags: ['cpp', 'string', 'split', 'stringstream', 'tokenization']
  },
  {
    id: 'cpp_monotonic_stack_nge',
    title: 'Next Greater Element (Monotonic Decreasing Stack)',
    category: 'DSA',
    subcategory: 'Stack',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Finds the next strictly greater element for every index in an array in linear O(N) time.',
    code: `#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElement(const vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st; // Stores indices of unresolved elements
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}`,
    explanation: 'The stack maintains indices of elements waiting for a greater number. When encountering a number larger than stack.top(), the top is popped and resolved. Each index is pushed and popped at most once.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCases: 'Daily Temperatures (LeetCode #739), Online Stock Span, Largest Rectangle in Histogram.',
    commonMistakes: 'Storing values instead of indices in the stack, making it impossible to assign the result to the correct array position.',
    tags: ['cpp', 'stack', 'monotonic-stack', 'next-greater-element', 'dsa']
  },
  {
    id: 'cpp_tree_lca_bst',
    title: 'Lowest Common Ancestor in Binary Search Tree',
    category: 'DSA',
    subcategory: 'BST',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Finds the lowest common ancestor of two nodes in a BST in O(H) time using BST ordering.',
    code: `struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    TreeNode* curr = root;
    while (curr) {
        if (p->val < curr->val && q->val < curr->val) {
            curr = curr->left; // Both targets lie in left subtree
        } else if (p->val > curr->val && q->val > curr->val) {
            curr = curr->right; // Both targets lie in right subtree
        } else {
            return curr; // Split point or matching node is LCA
        }
    }
    return nullptr;
}`,
    explanation: 'In a BST, if both targets are strictly smaller than root, the LCA must be in left subtree. If both are greater, it is in right subtree. The first node where p and q diverge (or match) is the LCA.',
    complexity: { time: 'O(H) where H is tree height', space: 'O(1) iterative' },
    useCases: 'LeetCode #235, hierarchical taxonomy search, ancestor queries in ordered trees.',
    commonMistakes: 'Using generic binary tree recursive traversal when BST ordering guarantees O(1) space iterative traversal.',
    tags: ['cpp', 'trees', 'bst', 'lca', 'algorithms']
  },
  {
    id: 'cpp_graph_topo_sort_kahns',
    title: 'Topological Sort: Kahn\'s Algorithm (BFS In-Degree)',
    category: 'DSA',
    subcategory: 'Graph',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Linear ordering of vertices in a Directed Acyclic Graph (DAG) and cycle detection via in-degrees.',
    code: `#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> inDegree(V, 0);
    for (int u = 0; u < V; u++) {
        for (int v : adj[u]) inDegree[v]++;
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> topoOrder;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topoOrder.push_back(u);
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) q.push(v);
        }
    }
    
    // If order size != V, a cycle exists!
    if (topoOrder.size() != V) return {};
    return topoOrder;
}`,
    explanation: 'Nodes with in-degree 0 have no prerequisites and are safe to process first. Removing a node decrements its neighbors in-degrees. If any vertices remain unprocessed, a cycle is present.',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    useCases: 'Course Schedule (LeetCode #207, #210), build dependency systems, task scheduling.',
    commonMistakes: 'Forgetting to check if topoOrder.size() == V to verify the graph was truly acyclic.',
    tags: ['cpp', 'graph', 'topological-sort', 'kahns-algorithm', 'bfs']
  },
  {
    id: 'cpp_dp_longest_increasing_subseq',
    title: 'Longest Increasing Subsequence in O(N log N)',
    category: 'DSA',
    subcategory: 'Dynamic Programming',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Hard',
    description: 'Finds length of the longest strictly increasing subsequence using binary search (patience sorting).',
    code: `#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails; // tails[i] stores smallest tail of all increasing subsequences of length i+1
    
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x); // x extends the longest subsequence found so far
        } else {
            *it = x; // Replace with smaller candidate to optimize future extensions
        }
    }
    return tails.size();
}`,
    explanation: 'Maintains tails array where tails[k] holds the smallest end element of an increasing subsequence of length k+1. For each number, lower_bound finds where it fits. If it exceeds all, length increments.',
    complexity: { time: 'O(N log N)', space: 'O(N)' },
    useCases: 'LeetCode #300, Russian Doll Envelopes, Longest Substring variants.',
    commonMistakes: 'Assuming the tails array represents the actual LIS elements; it only preserves optimal tail boundaries for length calculation.',
    tags: ['cpp', 'dp', 'lis', 'binary-search', 'algorithms']
  },
  {
    id: 'cpp_bit_manipulation_hacks',
    title: 'Bit Manipulation Essential Hacks',
    category: 'DSA',
    subcategory: 'Bit Manipulation',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Common bit manipulation one-liners: power of 2, clear lowest set bit, count set bits.',
    code: `#include <iostream>
using namespace std;

// Check if N is a power of 2 (positive numbers)
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Clear the lowest set bit (turn 0110 -> 0100)
int clearLowestSetBit(int n) {
    return n & (n - 1);
}

// Extract the lowest set bit (0110 -> 0010)
int getLowestSetBit(int n) {
    return n & (-n);
}

// Count number of set bits (Brian Kernighan's or GCC builtin)
int countSetBits(unsigned int n) {
    // Builtin: return __builtin_popcount(n);
    int count = 0;
    while (n > 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`,
    explanation: 'Subtracting 1 flips all bits from the rightmost set bit downwards. ANDing n with n-1 clears that lowest set bit. Negating -n in two\'s complement leaves only the lowest set bit isolated.',
    complexity: { time: 'O(1) or O(set bits)', space: 'O(1)' },
    useCases: 'Subsets generation, LeetCode #191, single number finding, bitmask DP.',
    commonMistakes: 'Forgetting parenthesis around bitwise expressions: if (n & 1 == 0) evaluates == before & due to operator precedence!',
    tags: ['cpp', 'bit-manipulation', 'math', 'tricks', 'dsa']
  },

  // =============================================================
  // JAVASCRIPT SNIPPETS (Array methods, Objects, Async, DOM)
  // =============================================================
  {
    id: 'js_throttle_utility',
    title: 'Throttle Function Implementation',
    category: 'Web Development',
    subcategory: 'Throttle',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Ensures a callback is invoked at most once per specified time interval.',
    code: `function throttle(fn, limitMs) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limitMs);
    }
  };
}`,
    explanation: 'Enforces an execution lock (inThrottle). When called, it executes the target function immediately and sets a timer to release the lock after limitMs has elapsed.',
    complexity: { time: 'O(1) check', space: 'O(1)' },
    useCases: 'Infinite scroll detection, scroll progress bars, mouse drag movements.',
    commonMistakes: 'Confusing throttle with debounce: Throttle guarantees regular periodic calls; Debounce postpones calls until silence.',
    tags: ['throttle', 'timing', 'performance', 'javascript', 'frontend']
  },
  {
    id: 'js_deep_clone',
    title: 'Deep Clone with structuredClone & Fallback',
    category: 'Web Development',
    subcategory: 'JavaScript Basics',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Easy',
    description: 'Creates a true deep copy of nested objects, arrays, and dates without prototype references.',
    code: `function deepClone(obj) {
  // Modern native standard (Node 17+, Chrome 98+)
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  
  // Robust recursive fallback handling circular references
  const seen = new WeakMap();
  function clone(val) {
    if (val === null || typeof val !== 'object') return val;
    if (val instanceof Date) return new Date(val.getTime());
    if (val instanceof RegExp) return new RegExp(val);
    if (seen.has(val)) return seen.get(val);

    const copy = Array.isArray(val) ? [] : {};
    seen.set(val, copy);
    for (const key of Object.keys(val)) {
      copy[key] = clone(val[key]);
    }
    return copy;
  }
  return clone(obj);
}`,
    explanation: 'Modern browsers provide native structuredClone(). The recursive fallback handles nested objects and arrays while using a WeakMap to guard against circular references.',
    complexity: { time: 'O(N) where N is total node count', space: 'O(N)' },
    useCases: 'State immutability in React/Redux, cloning configuration objects.',
    commonMistakes: 'Using JSON.parse(JSON.stringify(obj)) which drops undefined, functions, Symbols, and corrupts Date objects into strings.',
    tags: ['javascript', 'clone', 'deep-copy', 'objects', 'utilities']
  },
  {
    id: 'js_promise_all_settled',
    title: 'Safe Parallel Execution with Promise.allSettled',
    category: 'Web Development',
    subcategory: 'Promises',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Waits for all promises to resolve or reject without aborting early on the first failure.',
    code: `async function fetchMultipleServices(urls) {
  const promises = urls.map(url => 
    fetch(url).then(res => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return res.json();
    })
  );

  const results = await Promise.allSettled(promises);
  
  const fulfilled = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
    
  const rejected = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason);

  return { fulfilled, rejected };
}`,
    explanation: 'Unlike Promise.all which short-circuits on the first error, Promise.allSettled guarantees that every promise runs to completion and provides an array of {status, value/reason} descriptors.',
    complexity: { time: 'O(max promise duration)', space: 'O(N)' },
    useCases: 'Fetching independent dashboard widgets, batch email dispatching, multi-source telemetry.',
    commonMistakes: 'Using Promise.all for independent requests where one failed call ruins all successful data.',
    tags: ['javascript', 'promises', 'async', 'allSettled', 'error-handling']
  },
  {
    id: 'js_dom_observer',
    title: 'IntersectionObserver for Lazy Loading & Infinite Scroll',
    category: 'Web Development',
    subcategory: 'DOM',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Efficiently detects when elements enter or exit the browser viewport without scroll event lag.',
    code: `function setupLazyImages() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Swap data-src to real src
        img.classList.add('loaded');
        obs.unobserve(img); // Stop observing once loaded
      }
    });
  }, {
    rootMargin: '200px 0px', // Preload 200px before scrolling into view
    threshold: 0.01
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
}`,
    explanation: 'IntersectionObserver runs asynchronously off the main thread, avoiding expensive layout thrashing caused by traditional scroll listeners and getBoundingClientRect() calls.',
    complexity: { time: 'O(1) per threshold hit', space: 'O(observed elements)' },
    useCases: 'Image lazy loading, infinite scroll list feeds, impression tracking analytics.',
    commonMistakes: 'Forgetting to unobserve() elements after loading, resulting in memory leaks over long sessions.',
    tags: ['javascript', 'dom', 'intersection-observer', 'lazy-loading', 'performance']
  },

  // =============================================================
  // BACKEND / NODE.JS & EXPRESS SNIPPETS
  // =============================================================
  {
    id: 'be_express_jwt_middleware',
    title: 'Express.js JWT Authentication Middleware',
    category: 'Backend',
    subcategory: 'Authentication',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Verifies Bearer JWT tokens in request headers and attaches decoded user payload to req.user.',
    code: `const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Header format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Token is invalid or expired' });
    }
    req.user = decodedUser;
    next();
  });
}

module.exports = authenticateToken;`,
    explanation: 'Extracts the Bearer token from HTTP Authorization header. Validates cryptographic signature with secret key. If valid, attaches payload to req.user and passes control to the next route handler.',
    complexity: { time: 'O(1) cryptographic verify', space: 'O(1)' },
    useCases: 'Protecting private REST API endpoints, role-based access control (RBAC).',
    commonMistakes: 'Storing sensitive passwords in JWT payload (JWT payload is Base64 readable, not encrypted).',
    tags: ['node', 'express', 'jwt', 'auth', 'middleware', 'backend']
  },
  {
    id: 'be_express_global_error',
    title: 'Express Global Error Handling Middleware',
    category: 'Backend',
    subcategory: 'Error Handling',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Easy',
    description: 'Centralized 4-argument error handling middleware for Express applications.',
    code: `// Must have exactly 4 arguments (err, req, res, next)
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(\`[\${new Date().toISOString()}] \${req.method} \${req.url} - Error:\`, err.stack);

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
}

module.exports = errorHandler;`,
    explanation: 'Express distinguishes error middleware by arity: having 4 arguments (err, req, res, next) designates it as the catch-all error sink. Placing it at the bottom of the middleware stack intercepts all next(err) dispatches.',
    complexity: { time: 'O(1)', space: 'O(1)' },
    useCases: 'Standardizing error responses, hiding production stack traces, API reliability.',
    commonMistakes: 'Omitting the fourth "next" argument; Express will treat it as standard middleware instead of error handling.',
    tags: ['express', 'error-handling', 'node', 'backend', 'clean-code']
  },

  // =============================================================
  // DATABASE / SQL SNIPPETS
  // =============================================================
  {
    id: 'sql_cte_recursive',
    title: 'SQL Recursive CTE: Organizational Hierarchy',
    category: 'Database',
    subcategory: 'SQL',
    language: 'SQL',
    langClass: 'lang-sql',
    difficulty: 'Hard',
    description: 'Traverses hierarchical manager-employee relationships using a Recursive Common Table Expression.',
    code: `WITH RECURSIVE OrgHierarchy AS (
    -- Anchor member: find top-level CEO (manager_id is NULL)
    SELECT 
        employee_id,
        name,
        manager_id,
        1 AS depth
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive member: join employees under current hierarchy level
    SELECT 
        e.employee_id,
        e.name,
        e.manager_id,
        oh.depth + 1 AS depth
    FROM employees e
    INNER JOIN OrgHierarchy oh ON e.manager_id = oh.employee_id
)
SELECT * FROM OrgHierarchy ORDER BY depth, employee_id;`,
    explanation: 'Starts with an Anchor query (base cases). The Recursive query iteratively joins against the CTE itself until no further child rows match. depth tracks hierarchy levels.',
    complexity: { time: 'O(V + E)', space: 'O(depth)' },
    useCases: 'Organizational charts, category-subcategory trees, bill-of-materials traversal.',
    commonMistakes: 'Missing termination condition or circular manager references, which leads to infinite loops.',
    tags: ['sql', 'cte', 'recursive', 'hierarchy', 'postgres', 'database']
  },
  {
    id: 'sql_transactions_acid',
    title: 'PostgreSQL Transaction with Row-Level Locking',
    category: 'Database',
    subcategory: 'PostgreSQL',
    language: 'SQL',
    langClass: 'lang-sql',
    difficulty: 'Medium',
    description: 'Safely transfers funds between accounts using atomic transactions and SELECT ... FOR UPDATE.',
    code: `BEGIN;

-- Lock the source account row to prevent race conditions
SELECT balance FROM accounts 
WHERE account_id = 101 
FOR UPDATE;

-- Deduct from sender
UPDATE accounts 
SET balance = balance - 250.00 
WHERE account_id = 101 AND balance >= 250.00;

-- Add to recipient
UPDATE accounts 
SET balance = balance + 250.00 
WHERE account_id = 202;

-- If all queries succeed, commit permanently
COMMIT;

-- In case of application failure:
-- ROLLBACK;`,
    explanation: 'FOR UPDATE places an exclusive row-level lock on account 101 until the transaction completes, preventing concurrent reads from acting on stale balance data (double-spend problem).',
    complexity: { time: 'O(1) indexed write', space: 'O(1)' },
    useCases: 'Payment processing, inventory reservation, high-concurrency wallet transfers.',
    commonMistakes: 'Acquiring locks in varying order across transactions (e.g., A locks 1 then 2; B locks 2 then 1) causes Deadlocks.',
    tags: ['sql', 'postgres', 'transactions', 'acid', 'locking', 'concurrency']
  },

  // =============================================================
  // COMPUTER SCIENCE / OOP & SYSTEM DESIGN SNIPPETS
  // =============================================================
  {
    id: 'cs_singleton_pattern',
    title: 'Thread-Safe Singleton Pattern (Meyer\'s Singleton)',
    category: 'Computer Science',
    subcategory: 'OOP',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Thread-safe, lazy-initialized Singleton pattern in C++11 with zero mutex overhead.',
    code: `class DatabasePool {
public:
    // Delete copy constructor and assignment operator
    DatabasePool(const DatabasePool&) = delete;
    DatabasePool& operator=(const DatabasePool&) = delete;

    // Thread-safe static accessor
    static DatabasePool& getInstance() {
        // C++11 guarantees local static variable initialization is thread-safe!
        static DatabasePool instance;
        return instance;
    }

    void executeQuery(const std::string& query) {
        // Run database operation
    }

private:
    // Private constructor guarantees instantiation only through getInstance()
    DatabasePool() {
        // Establish connections
    }
};`,
    explanation: 'C++11 standard mandates that concurrent execution shall wait for completion of initialization of a function-local static variable. This eliminates double-checked locking and manual mutex locks.',
    complexity: { time: 'O(1) access', space: 'O(1)' },
    useCases: 'Connection pools, logger instances, hardware device controllers.',
    commonMistakes: 'Overusing singletons which tightly couples code and complicates automated unit test mocking.',
    tags: ['cpp', 'oop', 'design-patterns', 'singleton', 'concurrency']
  },
  {
    id: 'cs_token_bucket_rate_limiter',
    title: 'Token Bucket Rate Limiter Algorithm',
    category: 'Computer Science',
    subcategory: 'System Design',
    language: 'Python',
    langClass: 'lang-python',
    difficulty: 'Hard',
    description: 'High-performance token bucket algorithm for API throttling supporting traffic bursts.',
    code: `import time

class TokenBucketRateLimiter:
    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = capacity
        self.refill_rate = refill_rate_per_sec
        self.tokens = capacity
        self.last_refill_time = time.time()

    def allow_request(self, tokens_needed: int = 1) -> bool:
        now = time.time()
        # Calculate tokens accrued since last check
        elapsed = now - self.last_refill_time
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill_time = now

        if self.tokens >= tokens_needed:
            self.tokens -= tokens_needed
            return True
        return False`,
    explanation: 'Instead of running a background timer, it calculates token accumulation on-demand using elapsed time delta. If tokens exist, it decrements and allows the request; otherwise it rejects.',
    complexity: { time: 'O(1) check', space: 'O(1)' },
    useCases: 'API Gateways (Kong, Envoy), AWS API Gateway rate limiting, LeetCode system design.',
    commonMistakes: 'Using a dedicated thread/timer for refilling tokens instead of lazy time delta math.',
    tags: ['python', 'system-design', 'rate-limiter', 'token-bucket', 'algorithms']
  },

  // =============================================================
  // PYTHON / AI & DATA UTILITIES
  // =============================================================
  {
    id: 'py_pandas_data_cleaning',
    title: 'Pandas Common Data Cleaning & Aggregation Pipeline',
    category: 'Python / AI',
    subcategory: 'Pandas',
    language: 'Python',
    langClass: 'lang-python',
    difficulty: 'Easy',
    description: 'Fills missing values, handles data types, removes duplicates, and performs grouped aggregations.',
    code: `import pandas as pd

def clean_sales_data(df: pd.DataFrame) -> pd.DataFrame:
    # 1. Drop duplicates
    df = df.drop_duplicates(subset=['order_id'])
    
    # 2. Impute missing values
    df['quantity'] = df['quantity'].fillna(0).astype(int)
    df['price'] = df['price'].fillna(df['price'].median())
    
    # 3. Create derived feature
    df['total_revenue'] = df['quantity'] * df['price']
    
    # 4. Group by category and aggregate
    summary = df.groupby('category').agg(
        total_sales=('total_revenue', 'sum'),
        average_order_value=('total_revenue', 'mean'),
        order_count=('order_id', 'count')
    ).reset_index()
    
    return summary`,
    explanation: 'Demonstrates idiomatic vectorized Pandas operations for cleaning and grouped analytics without slow Python loops.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCases: 'Feature engineering pipelines, ETL data processing, ML model ingestion.',
    commonMistakes: 'Iterating through DataFrame rows with iterrows(); vectorized methods are 100x faster.',
    tags: ['python', 'pandas', 'data-science', 'ai', 'data-cleaning']
  },
  {
    id: 'py_fastapi_rest_template',
    title: 'FastAPI Production Endpoint with Pydantic Validation',
    category: 'Python / AI',
    subcategory: 'FastAPI',
    language: 'Python',
    langClass: 'lang-python',
    difficulty: 'Easy',
    description: 'FastAPI REST endpoint with automatic OpenAPI documentation, schema validation, and error responses.',
    code: `from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI(title="DevPilot Inference Service")

class PredictionRequest(BaseModel):
    features: list[float] = Field(..., min_items=1, description="List of normalized feature floats")
    model_version: Optional[str] = "v1.0"

class PredictionResponse(BaseModel):
    prediction: float
    confidence: float

@app.post("/predict", response_model=PredictionResponse, status_code=status.HTTP_200_OK)
async def predict(payload: PredictionRequest):
    if len(payload.features) != 4:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, 
            detail="Expected exactly 4 features for model input."
        )
    # Perform mock ML model prediction
    pred_score = sum(payload.features) / len(payload.features)
    return PredictionResponse(prediction=pred_score, confidence=0.98)`,
    explanation: 'Uses Pydantic models for request body typing and JSON validation. FastAPI generates Swagger UI docs automatically and provides asynchronous request handling.',
    complexity: { time: 'O(1) parsing', space: 'O(1)' },
    useCases: 'ML model deployment, microservices, high-speed Python APIs.',
    commonMistakes: 'Blocking the async event loop with synchronous I/O or heavy CPU-bound code (use background tasks or run_in_executor).',
    tags: ['python', 'fastapi', 'rest-api', 'ai', 'pydantic']
  },

  // =============================================================
  // GIT / DEV TOOLS (Git, Linux, Docker)
  // =============================================================
  {
    id: 'dev_docker_multistage',
    title: 'Multi-Stage Dockerfile for Node.js Production',
    category: 'Git / Dev Tools',
    subcategory: 'Docker',
    language: 'Docker',
    langClass: 'lang-docker',
    difficulty: 'Medium',
    description: 'Builds a lean production container image by discarding build dependencies and compiler toolchains.',
    code: `# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Run as unprivileged non-root user for security
USER node
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]`,
    explanation: 'Multi-stage builds use separate FROM directives. Compilers and devDependencies stay in the builder image, keeping the final production image lightweight (<150MB) and secure.',
    complexity: { time: 'Build cache accelerated', space: 'Minimal image footprint' },
    useCases: 'Containerizing Node.js, Next.js, and Express apps for Kubernetes or cloud deployment.',
    commonMistakes: 'Running containers as the root user; always use USER node or unprivileged service accounts.',
    tags: ['docker', 'devops', 'nodejs', 'containers', 'security']
  },
  {
    id: 'dev_git_rescue_commands',
    title: 'Essential Git Rescue & Undo Commands',
    category: 'Git / Dev Tools',
    subcategory: 'Git',
    language: 'Bash',
    langClass: 'lang-bash',
    difficulty: 'Easy',
    description: 'Battle-tested Git commands to undo commits, recover deleted branches, and clean up branches.',
    code: `# 1. Undo last commit but keep your changes in working directory
git reset --soft HEAD~1

# 2. Undo commit and discard all changes (DANGER: destroys work!)
git reset --hard HEAD~1

# 3. Discard uncommitted changes to a specific file
git checkout -- path/to/file.js
# Or with modern Git:
git restore path/to/file.js

# 4. View commit history including deleted commits (The Time Machine)
git reflog

# 5. Recover an accidentally deleted branch
git checkout -b recovered-branch <commit-hash-from-reflog>

# 6. Change last commit message
git commit --amend -m "New descriptive message"`,
    explanation: 'git reflog records every movement of HEAD, enabling recovery of orphaned commits or branches even after hard resets.',
    complexity: { time: 'O(1)', space: 'O(1)' },
    useCases: 'Fixing wrong commit messages, un-committing files added by mistake, recovering lost work.',
    commonMistakes: 'Running git reset --hard on public/shared branches without coordinating with your team.',
    tags: ['git', 'version-control', 'devops', 'cli', 'troubleshooting']
  },

  // =============================================================
  // ADDITIONAL DSA C++ ROADMAP SNIPPETS
  // =============================================================
  {
    id: 'cpp_arr_accumulate_minmax',
    title: 'STL Algorithms: min_element, max_element & accumulate',
    category: 'DSA',
    subcategory: 'Arrays',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Finds minimum, maximum, and array sum in a single line using std::min_element and std::accumulate.',
    code: `#include <vector>
#include <numeric>
#include <algorithm>
#include <iostream>
using namespace std;

void arrayStatistics(const vector<int>& nums) {
    if (nums.empty()) return;

    // 1. Min and Max elements (returns iterators)
    auto minIt = min_element(nums.begin(), nums.end());
    auto maxIt = max_element(nums.begin(), nums.end());
    int minVal = *minIt;
    int maxVal = *maxIt;

    // 2. Sum elements (accumulate takes initial sum as 3rd param)
    // Use 0LL for 64-bit integers to prevent 32-bit integer overflow!
    long long totalSum = accumulate(nums.begin(), nums.end(), 0LL);

    cout << "Min: " << minVal << " Max: " << maxVal << " Sum: " << totalSum << endl;
}`,
    explanation: 'min_element and max_element return iterators to the first minimum/maximum element in O(N). accumulate in <numeric> computes the sum from left to right using the type of the initial value.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCases: 'Quick array profiling, calculating averages, bounds checking.',
    commonMistakes: 'Passing integer literal 0 instead of 0LL to accumulate when summing 32-bit ints that might exceed INT_MAX, causing silent integer overflow.',
    tags: ['cpp', 'stl', 'accumulate', 'min_element', 'max_element', 'arrays']
  },
  {
    id: 'cpp_str_palindrome_check',
    title: 'Valid Palindrome with Alphanumeric Filtering',
    category: 'DSA',
    subcategory: 'Strings',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Checks if a string is a palindrome considering only alphanumeric characters and ignoring case in O(N).',
    code: `#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;

        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
    explanation: 'Two pointers move inwards towards the center. isalnum() checks alphanumeric validity. tolower() normalizes case comparison. Avoids copying or allocating auxiliary memory.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCases: 'LeetCode #125 (Valid Palindrome), input sanitation, DNA sequence analysis.',
    commonMistakes: 'Forgetting inner while loops need left < right boundary checks, causing out-of-bounds pointer reads.',
    tags: ['cpp', 'strings', 'two-pointers', 'palindrome', 'leetcode']
  },
  {
    id: 'cpp_hashing_frequency',
    title: 'Frequency Counting with std::unordered_map',
    category: 'DSA',
    subcategory: 'Hashing',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Counts frequencies of array elements and iterates key-value pairs in average O(N) time.',
    code: `#include <vector>
#include <unordered_map>
#include <iostream>
using namespace std;

void countFrequencies(const vector<int>& nums) {
    unordered_map<int, int> freq;
    freq.reserve(nums.size()); // Avoid premature hash table rehashing

    for (int x : nums) {
        freq[x]++;
    }

    // Modern structured binding iteration (C++17)
    for (const auto& [element, count] : freq) {
        cout << "Element " << element << " appears " << count << " times" << endl;
    }
}`,
    explanation: 'operator[] inserts a default-initialized 0 if the key does not exist and increments the value. freq.reserve() pre-allocates bucket capacity for maximum throughput.',
    complexity: { time: 'O(N) average', space: 'O(U) where U is unique elements' },
    useCases: 'Majority Element (LeetCode #169), Two Sum (#1), anagram verification.',
    commonMistakes: 'Using operator[] on const unordered_map; it modifies the map by inserting missing keys! Use .find() or .count() for read-only inspection.',
    tags: ['cpp', 'hashing', 'unordered_map', 'frequency', 'dsa']
  },
  {
    id: 'cpp_stack_valid_parentheses',
    title: 'Valid Parentheses String Matching with Stack',
    category: 'DSA',
    subcategory: 'Stack',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Validates that brackets (), {}, [] close in the correct corresponding order.',
    code: `#include <string>
#include <stack>
using namespace std;

bool isValidParentheses(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
    explanation: 'Instead of storing opening brackets, push the EXPECTED closing bracket directly onto the stack. When encountering a closing bracket, simply check st.top() == c. The string is valid if the stack ends completely empty.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCases: 'LeetCode #20 (Valid Parentheses), compiler syntax checkers, expression evaluators.',
    commonMistakes: 'Forgetting st.empty() before st.top() causes undefined behavior/crash when a closing bracket appears first.',
    tags: ['cpp', 'stack', 'parentheses', 'leetcode', 'dsa']
  },
  {
    id: 'cpp_queue_sliding_window_max',
    title: 'Sliding Window Maximum with Monotonic Deque',
    category: 'DSA',
    subcategory: 'Queue',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Hard',
    description: 'Finds maximum element in every sliding window of size K in strictly linear O(N) time.',
    code: `#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // Stores indices in decreasing order of values
    vector<int> result;

    for (int i = 0; i < nums.size(); i++) {
        // 1. Remove indices outside the current window [i - k + 1, i]
        if (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }

        // 2. Remove smaller elements from back (they can never be max)
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }

        dq.push_back(i);

        // 3. Record window max once first window of size k is formed
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,
    explanation: 'Maintains a monotonic decreasing deque storing indices. The front of the deque always holds the index of the maximum element in the current window.',
    complexity: { time: 'O(N) amortized', space: 'O(K)' },
    useCases: 'LeetCode #239, streaming signal maximum, dynamic range filter.',
    commonMistakes: 'Storing values instead of indices in deque, making it impossible to check if the front element expired out of the sliding window.',
    tags: ['cpp', 'deque', 'monotonic-queue', 'sliding-window', 'leetcode']
  },
  {
    id: 'cpp_linkedlist_reverse',
    title: 'Reverse Singly Linked List (In-Place 3-Pointer)',
    category: 'DSA',
    subcategory: 'Linked List',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Easy',
    description: 'Reverses a singly linked list in-place in O(N) time and O(1) space.',
    code: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr;
    ListNode *curr = head;
    
    while (curr) {
        ListNode *nextTemp = curr->next; // Save next pointer
        curr->next = prev;              // Reverse link
        prev = curr;                    // Advance prev
        curr = nextTemp;                // Advance curr
    }
    return prev; // prev is the new head
}`,
    explanation: 'Uses 3 pointers (prev, curr, nextTemp). Overwrites curr->next to point backwards to prev, then slides the window forward.',
    complexity: { time: 'O(N)', space: 'O(1)' },
    useCases: 'LeetCode #206, Palindrome Linked List, Reverse Nodes in K-Group.',
    commonMistakes: 'Forgetting to save curr->next before modifying it, severing the rest of the list.',
    tags: ['cpp', 'linked-list', 'pointers', 'leetcode', 'dsa']
  },
  {
    id: 'cpp_tree_level_order_bfs',
    title: 'Binary Tree Level Order Traversal (BFS)',
    category: 'DSA',
    subcategory: 'Binary Tree',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Traverses a binary tree level by level using a queue, grouping nodes by depth.',
    code: `#include <vector>
#include <queue>
using namespace std;

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size(); // Freeze count of nodes in current level
        vector<int> currentLevel;

        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);

            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(currentLevel);
    }
    return result;
}`,
    explanation: 'Freezing int levelSize = q.size() at the beginning of the while loop ensures exactly one level is dequeued and processed per batch.',
    complexity: { time: 'O(N)', space: 'O(W) where W is maximum tree width' },
    useCases: 'LeetCode #102, Right Side View (#199), Zigzag Traversal (#103).',
    commonMistakes: 'Evaluating i < q.size() directly inside the for loop condition; q.size() changes dynamically as child nodes are pushed!',
    tags: ['cpp', 'trees', 'bfs', 'queue', 'level-order', 'dsa']
  },
  {
    id: 'cpp_backtracking_subsets',
    title: 'Backtracking Template: Generate All Subsets (Power Set)',
    category: 'DSA',
    subcategory: 'Backtracking',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Generates all 2^N unique subsets using the canonical Choose-Explore-Unchoose backtracking pattern.',
    code: `#include <vector>
using namespace std;

void backtrack(int start, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current); // Record state

    for (int i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);            // 1. Choose
        backtrack(i + 1, nums, current, result); // 2. Explore
        current.pop_back();                     // 3. Unchoose (Backtrack)
    }
}

vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(0, nums, current, result);
    return result;
}`,
    explanation: 'Explores decisions by choosing an element, recursing down with i + 1, and popping the element to restore state for parallel branches.',
    complexity: { time: 'O(N * 2^N)', space: 'O(N) recursion stack' },
    useCases: 'LeetCode #78 (Subsets), Combinations (#77), Combination Sum (#39).',
    commonMistakes: 'Calling backtrack with start + 1 instead of i + 1, resulting in duplicate element reuse.',
    tags: ['cpp', 'backtracking', 'recursion', 'subsets', 'power-set']
  },
  {
    id: 'cpp_search_on_answer',
    title: 'Binary Search on Answer (Predicate Monotonicity)',
    category: 'DSA',
    subcategory: 'Searching',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Finds minimum feasible capacity or speed where a monotonic validation function check(mid) is satisfied.',
    code: `#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool canComplete(const vector<int>& piles, int speed, int maxHours) {
    long long totalHours = 0;
    for (int pile : piles) {
        totalHours += (pile + speed - 1) / speed; // Ceiling division
    }
    return totalHours <= maxHours;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int low = 1, high = *max_element(piles.begin(), piles.end());
    int ans = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canComplete(piles, mid, h)) {
            ans = mid;        // Feasible, try to find smaller valid speed
            high = mid - 1;
        } else {
            low = mid + 1;     // Not feasible, must increase speed
        }
    }
    return ans;
}`,
    explanation: 'When answer feasibility exhibits monotonicity (e.g. if speed S works, any speed > S also works), binary search finds the optimal boundary in O(N log(max)).',
    complexity: { time: 'O(N log(max_val))', space: 'O(1)' },
    useCases: 'Koko Eating Bananas (LeetCode #875), Capacity to Ship Packages (#1011), Split Array Largest Sum (#410).',
    commonMistakes: 'Using integer division pile / speed instead of ceiling division (pile + speed - 1) / speed.',
    tags: ['cpp', 'binary-search', 'search-on-answer', 'greedy', 'leetcode']
  },

  // =============================================================
  // JAVASCRIPT & WEB DEV EXPANDED SNIPPETS
  // =============================================================
  {
    id: 'js_array_map_filter_reduce',
    title: 'Functional Array Pipeline: map, filter & reduce',
    category: 'Web Development',
    subcategory: 'JavaScript Basics',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Easy',
    description: 'Idiomatic data transformations using modern functional array chains.',
    code: `const transactions = [
  { id: 1, type: 'credit', amount: 150, category: 'sales' },
  { id: 2, type: 'debit',  amount: 40,  category: 'office' },
  { id: 3, type: 'credit', amount: 200, category: 'sales' },
  { id: 4, type: 'debit',  amount: 15,  category: 'coffee' }
];

// Calculate total sales revenue
const totalSales = transactions
  .filter(t => t.type === 'credit' && t.category === 'sales')
  .map(t => t.amount)
  .reduce((acc, curr) => acc + curr, 0);

console.log('Total sales:', totalSales); // 350`,
    explanation: 'filter extracts relevant records, map projects values, and reduce aggregates into a single cumulative total starting from initial value 0.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCases: 'Dashboard metric calculations, data normalization, e-commerce cart totals.',
    commonMistakes: 'Omitting the initial value parameter in reduce(); if the array is empty, reduce throws TypeError.',
    tags: ['javascript', 'arrays', 'map', 'filter', 'reduce', 'functional']
  },
  {
    id: 'js_localstorage_ttl',
    title: 'LocalStorage with Expiration Time-To-Live (TTL)',
    category: 'Web Development',
    subcategory: 'LocalStorage',
    language: 'JavaScript',
    langClass: 'lang-js',
    difficulty: 'Medium',
    description: 'Wrapper around localStorage that stores items with millisecond TTL and auto-invalidates expired data.',
    code: `const StorageWithExpiry = {
  setItem(key, value, ttlMs) {
    const item = {
      value: value,
      expiry: Date.now() + ttlMs
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  getItem(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const item = JSON.parse(raw);
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key); // Evict expired item
        return null;
      }
      return item.value;
    } catch (e) {
      return null;
    }
  }
};`,
    explanation: 'Wraps the payload with an expiry timestamp. On retrieval, checks current timestamp against stored expiry. If expired, deletes item and returns null.',
    complexity: { time: 'O(1)', space: 'O(1)' },
    useCases: 'Caching API responses locally, session state invalidation, auth token refresh timers.',
    commonMistakes: 'Assuming localStorage handles expiration natively (it stores strings permanently until explicit clear).',
    tags: ['javascript', 'localstorage', 'caching', 'ttl', 'browser']
  },

  // =============================================================
  // PYTHON / AI EXPANDED SNIPPETS
  // =============================================================
  {
    id: 'py_collections_counter_defaultdict',
    title: 'Python Collections: Counter and defaultdict',
    category: 'Python / AI',
    subcategory: 'Python Basics',
    language: 'Python',
    langClass: 'lang-python',
    difficulty: 'Easy',
    description: 'Eliminates KeyError exceptions and provides automatic frequency counting.',
    code: `from collections import Counter, defaultdict

# 1. Automatic frequency counting
words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
counts = Counter(words)
print(counts.most_common(2)) # [('apple', 3), ('banana', 2)]

# 2. Grouping with defaultdict(list)
anagrams = defaultdict(list)
for word in ["eat", "tea", "tan", "ate", "nat", "bat"]:
    key = "".join(sorted(word))
    anagrams[key].append(word)

print(list(anagrams.values()))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]`,
    explanation: 'Counter automatically counts hashable items. defaultdict initializes values with a factory function (e.g. list, int) on first access, eliminating "if key not in dict" boilerplate.',
    complexity: { time: 'O(N)', space: 'O(N)' },
    useCases: 'Group Anagrams (LeetCode #49), Top K Frequent Words (#692), adjacency list graph construction.',
    commonMistakes: 'Accessing keys in a defaultdict unintentionally creates those keys in the dictionary.',
    tags: ['python', 'collections', 'counter', 'defaultdict', 'dsa']
  },
  {
    id: 'py_heapq_k_largest',
    title: 'Python heapq: Min-Heap and Max-Heap Operations',
    category: 'Python / AI',
    subcategory: 'Python Basics',
    language: 'Python',
    langClass: 'lang-python',
    difficulty: 'Easy',
    description: 'Priority queue operations using Python\'s built-in heapq module.',
    code: `import heapq

nums = [7, 10, 4, 3, 20, 15]

# 1. Heapify in-place in O(N)
heapq.heapify(nums) # nums is now a Min-Heap

# 2. Push & Pop in O(log N)
heapq.heappush(nums, 2)
min_elem = heapq.heappop(nums) # Returns 2

# 3. K largest elements in O(N log K)
k_largest = heapq.nlargest(3, [7, 10, 4, 3, 20, 15]) # [20, 15, 10]

# 4. Max-Heap trick: multiply values by -1
max_heap = [-x for x in [7, 10, 4, 3, 20, 15]]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap) # Returns 20`,
    explanation: 'heapq implements a binary heap over standard Python lists. Python only natively supports Min-Heaps; invert values with -x to simulate a Max-Heap.',
    complexity: { time: 'heapify: O(N), heappop/push: O(log N)', space: 'O(1) in-place' },
    useCases: 'Kth Largest Element in an Array (LeetCode #215), Merge K Sorted Lists (#23).',
    commonMistakes: 'Expecting heapq.heappop() on a list without calling heapq.heapify() first.',
    tags: ['python', 'heapq', 'priority-queue', 'min-heap', 'dsa']
  },

  // =============================================================
  // HTML/CSS SNIPPETS
  // =============================================================
  {
    id: 'css_modern_center',
    title: 'Modern CSS Centering: Flexbox vs Grid',
    category: 'HTML/CSS',
    subcategory: 'Flexbox',
    language: 'HTML/CSS',
    langClass: 'lang-html',
    difficulty: 'Easy',
    description: 'Cleanest modern one-line solutions to center content horizontally and vertically.',
    code: `/* Option 1: Modern CSS Grid (One-liner!) */
.center-with-grid {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

/* Option 2: Flexbox Standard */
.center-with-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
    explanation: 'place-items: center in CSS Grid centers child elements in both directions in a single declaration without transforms or margins.',
    complexity: { time: 'Browser rendered', space: 'N/A' },
    useCases: 'Auth login cards, modal windows, hero banners.',
    commonMistakes: 'Forgetting min-height on parent container; elements will center only within their intrinsic content height.',
    tags: ['css', 'centering', 'flexbox', 'grid', 'layout']
  },
  {
    id: 'css_responsive_autofit_grid',
    title: 'Responsive Card Grid without Media Queries',
    category: 'HTML/CSS',
    subcategory: 'Grid',
    language: 'HTML/CSS',
    langClass: 'lang-html',
    difficulty: 'Easy',
    description: 'Auto-wrapping fluid grid that scales from 1 column on mobile to 4+ columns on desktop automatically.',
    code: `.responsive-card-grid {
  display: grid;
  /* Auto-fits cards of min 280px width, expanding to fill remaining fractional space */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}`,
    explanation: 'auto-fit collapses empty tracks and stretches existing cards with 1fr. minmax(280px, 1fr) guarantees cards never shrink below 280px on narrow screens.',
    complexity: { time: 'Browser fluid reflow', space: 'N/A' },
    useCases: 'Product catalogs, dashboard widgets, blog post card grids.',
    commonMistakes: 'Using auto-fill instead of auto-fit, which leaves awkward empty spaces if there are few items.',
    tags: ['css', 'grid', 'responsive', 'cards', 'layout']
  },

  // =============================================================
  // SQL / DATABASE EXPANDED SNIPPETS
  // =============================================================
  {
    id: 'sql_window_functions_ranking',
    title: 'SQL Window Functions: ROW_NUMBER, RANK & DENSE_RANK',
    category: 'Database',
    subcategory: 'SQL',
    language: 'SQL',
    langClass: 'lang-sql',
    difficulty: 'Medium',
    description: 'Ranks rows within partitions to solve Nth highest queries and deduplication.',
    code: `SELECT 
    employee_id,
    department_id,
    salary,
    -- Sequential unique integers (1, 2, 3, 4)
    ROW_NUMBER() OVER(PARTITION BY department_id ORDER BY salary DESC) AS row_num,
    -- Gaps on ties (1, 2, 2, 4)
    RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) AS rank_val,
    -- No gaps on ties (1, 2, 2, 3)
    DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) AS dense_rank_val
FROM employees;`,
    explanation: 'PARTITION BY resets the counter for each department. DENSE_RANK guarantees consecutive numbers across ties, making it ideal for "Second Highest Salary" queries.',
    complexity: { time: 'O(N log N) sort', space: 'O(N)' },
    useCases: 'Finding top N products per category, salary rankings, removing duplicate records.',
    commonMistakes: 'Using RANK() when DENSE_RANK() was required; RANK() skips numbers after ties (1, 2, 2, 4), which can return empty sets on WHERE rank = 3.',
    tags: ['sql', 'window-functions', 'rank', 'dense-rank', 'analytics']
  },

  // =============================================================
  // OOP & SYSTEM DESIGN EXPANDED SNIPPETS
  // =============================================================
  {
    id: 'cs_oop_polymorphism_cpp',
    title: 'C++ Virtual Functions & Abstract Interfaces',
    category: 'Computer Science',
    subcategory: 'OOP',
    language: 'C++',
    langClass: 'lang-cpp',
    difficulty: 'Medium',
    description: 'Defines an abstract interface with pure virtual functions and demonstrates dynamic dispatch.',
    code: `#include <iostream>
#include <memory>
using namespace std;

// Abstract Base Class (Interface)
class PaymentGateway {
public:
    virtual ~PaymentGateway() = default; // Mandatory virtual destructor!
    virtual bool processPayment(double amount) = 0; // Pure virtual function
};

class StripeGateway : public PaymentGateway {
public:
    bool processPayment(double amount) override {
        cout << "Charging $" << amount << " via Stripe API" << endl;
        return true;
    }
};

int main() {
    unique_ptr<PaymentGateway> payment = make_unique<StripeGateway>();
    payment->processPayment(99.99); // Resolves at runtime via VTable
    return 0;
}`,
    explanation: 'PaymentGateway contains a pure virtual function (= 0), making it an abstract interface. Derived classes must override processPayment(). Virtual destructor ensures clean object destruction via base pointers.',
    complexity: { time: 'O(1) vtable lookup', space: '8 bytes vptr per object' },
    useCases: 'Plugin architectures, dependency inversion, clean architecture service abstractions.',
    commonMistakes: 'Forgetting virtual destructor in base class; deleting a derived class through a base pointer causes undefined behavior and memory leaks.',
    tags: ['cpp', 'oop', 'polymorphism', 'interfaces', 'virtual-functions']
  },
  {
    id: 'cs_pagination_cursor',
    title: 'Cursor-Based Pagination vs Offset Pagination',
    category: 'Computer Science',
    subcategory: 'System Design',
    language: 'SQL',
    langClass: 'lang-sql',
    difficulty: 'Medium',
    description: 'High-scale pagination using indexed cursor filters instead of slow OFFSET scanning.',
    code: `-- Slow: OFFSET scans and discards 100,000 rows (O(N) performance degradation)
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 20 OFFSET 100000;

-- Fast: Cursor/Keyset Pagination (O(log N) indexed B-Tree seek)
SELECT * FROM posts 
WHERE (created_at, id) < ('2026-09-01 12:00:00', 4920)
ORDER BY created_at DESC, id DESC 
LIMIT 20;`,
    explanation: 'OFFSET requires the database to read, sort, and throw away all preceding rows. Cursor pagination uses the last seen row values as an indexed WHERE predicate, jumping directly to the next page in O(log N).',
    complexity: { time: 'O(log N) indexed seek', space: 'O(1)' },
    useCases: 'Social media infinite feeds, Twitter/Reddit APIs, real-time activity streams.',
    commonMistakes: 'Omitting a unique tie-breaker (like id) in cursor sorting; duplicate timestamps will skip records.',
    tags: ['system-design', 'sql', 'pagination', 'performance', 'database']
  },
  {
    id: "cpp_vector_essential_methods",
    title: "C++ std::vector Complete Cheatsheet & Memory Management",
    category: "DSA",
    subcategory: "Vectors",
    language: "C++",
    langClass: "lang-cpp",
    difficulty: "Easy",
    description: "Essential vector operations: reserve, emplace_back, erase, insert, and capacity management.",
    code: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> vec;\n    // 1. Pre-allocate capacity to prevent multiple reallocations\n    vec.reserve(100); \n\n    // 2. Efficient in-place construction\n    vec.emplace_back(10);\n    vec.emplace_back(20);\n    vec.emplace_back(30);\n\n    // 3. Inserting at specific iterator position (O(N) operation)\n    vec.insert(vec.begin() + 1, 15); // [10, 15, 20, 30]\n\n    // 4. Erase single element or range (O(N) shifts)\n    vec.erase(vec.begin() + 1); // removes 15 -> [10, 20, 30]\n\n    // 5. Shrink capacity to fit actual size\n    vec.shrink_to_fit();\n\n    // 6. Direct element access vs bounds-checked access\n    int fastVal = vec[0];       // O(1) - unchecked\n    int safeVal = vec.at(0);    // O(1) - throws std::out_of_range\n\n    std::cout << \"Size: \" << vec.size() << \", Capacity: \" << vec.capacity() << \"\\n\";\n    return 0;\n}",
    explanation: "Demonstrates optimal vector usage. vec.reserve() prevents expensive exponential reallocations and buffer copies. emplace_back() forwards arguments directly to the constructor in-place, eliminating temporary object copies.",
    complexity: { time: "O(1) amortized push/pop; O(N) insert/erase", space: "O(N) contiguous memory" },
    useCases: "Dynamic arrays, competitive programming buffers, general-purpose sequential collections.",
    commonMistakes: "Calling insert() or erase() inside loops causing O(N^2) quadratic copies; use remove_if or reserve ahead of time.",
    tags: ["cpp","vector","stl","memory-management","arrays"]
  },
  {
    id: "cpp_string_conversion",
    title: "Safe String to Number & Number to String Conversions",
    category: "DSA",
    subcategory: "Strings",
    language: "C++",
    langClass: "lang-cpp",
    difficulty: "Easy",
    description: "Converting between std::string, int, double, and long long using stoi, to_string, and stringstream with exception handling.",
    code: "#include <iostream>\n#include <string>\n#include <sstream>\n#include <stdexcept>\n\nvoid convertExamples() {\n    // 1. Number to String\n    int num = 42;\n    double pi = 3.14159;\n    std::string strNum = std::to_string(num);\n    std::string strPi = std::to_string(pi);\n\n    // 2. String to Int with Exception Safety\n    std::string validStr = \"12345\";\n    try {\n        int parsed = std::stoi(validStr);\n        long long bigParsed = std::stoll(\"9876543210123\");\n        double floatParsed = std::stod(\"3.14159265\");\n        std::cout << \"Parsed: \" << parsed << \", \" << bigParsed << \", \" << floatParsed << \"\\n\";\n    } catch (const std::invalid_argument& e) {\n        std::cerr << \"Invalid conversion string: \" << e.what() << \"\\n\";\n    } catch (const std::out_of_range& e) {\n        std::cerr << \"Number out of range for type: \" << e.what() << \"\\n\";\n    }\n\n    // 3. Stringstream for mixed format conversion\n    std::stringstream ss;\n    ss << \"Score: \" << 98 << \" / \" << 100;\n    std::string summary = ss.str();\n}",
    explanation: "std::stoi / std::stod can throw std::invalid_argument or std::out_of_range on malformed inputs or overflow. Wrapping conversions in try-catch ensures production-grade robustness.",
    complexity: { time: "O(L) where L is string length", space: "O(L) for output string" },
    useCases: "Parsing user inputs, reading CSV/JSON payloads, formatting logs and error banners.",
    commonMistakes: "Using legacy atoi() which provides no error signaling and silently returns 0 on invalid input.",
    tags: ["cpp","string","stoi","conversion","parsing"]
  },
  {
    id: "cpp_pair_tuple_sorting",
    title: "Custom Sorting on std::pair and std::tuple Collections",
    category: "DSA",
    subcategory: "Sorting",
    language: "C++",
    langClass: "lang-cpp",
    difficulty: "Medium",
    description: "Sorting coordinates and weighted records using primary, secondary, and tie-breaking criteria with lambda comparators.",
    code: "#include <iostream>\n#include <vector>\n#include <tuple>\n#include <algorithm>\n\nstruct Event {\n    int start, end, weight;\n};\n\nint main() {\n    // Sorting vector of pairs: first asc, second desc on tie\n    std::vector<std::pair<int, int>> intervals = {{1, 4}, {2, 5}, {1, 9}, {3, 7}};\n\n    std::sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {\n        if (a.first != b.first) return a.first < b.first; // Ascending by start\n        return a.second > b.second;                      // Descending by end\n    });\n\n    // Sorting vector of tuples: std::tie comparison\n    std::vector<std::tuple<int, std::string, double>> students = {\n        {101, \"Alice\", 3.9},\n        {102, \"Bob\", 3.7},\n        {103, \"Charlie\", 3.9}\n    };\n\n    // Sort by GPA desc, then by student ID asc\n    std::sort(students.begin(), students.end(), [](const auto& a, const auto& b) {\n        if (std::get<2>(a) != std::get<2>(b)) {\n            return std::get<2>(a) > std::get<2>(b);\n        }\n        return std::get<0>(a) < std::get<0>(b);\n    });\n\n    return 0;\n}",
    explanation: "By default, std::pair and std::tuple use lexicographical comparison. Using a custom lambda allows flexible priority ordering (e.g. interval scheduling, greedy deadline sorting).",
    complexity: { time: "O(N log N)", space: "O(log N) stack space for IntroSort" },
    useCases: "Interval scheduling, meeting room allocation, coordinate compression, leaderboards.",
    commonMistakes: "Writing non-strict weak ordering (using <= instead of < in comparator causes undefined behavior and segmentation faults in std::sort).",
    tags: ["cpp","pair","tuple","sorting","lambda","intervals"]
  },
  {
    id: "dsa_two_pointers_3sum",
    title: "3Sum: Triplet Sum to Zero (Two-Pointer Technique)",
    category: "DSA",
    subcategory: "Two Pointers",
    language: "C++",
    langClass: "lang-cpp",
    difficulty: "Medium",
    description: "Finds all unique triplets [nums[i], nums[j], nums[k]] such that their sum equals zero in O(N^2) time.",
    code: "#include <vector>\n#include <algorithm>\n\nstd::vector<std::vector<int>> threeSum(std::vector<int>& nums) {\n    std::vector<std::vector<int>> result;\n    std::sort(nums.begin(), nums.end());\n    int n = nums.size();\n\n    for (int i = 0; i < n - 2; ++i) {\n        // Skip duplicate base elements\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        if (nums[i] > 0) break; // Smallest number is positive -> sum cannot be 0\n\n        int left = i + 1, right = n - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum === 0) {\n                result.push_back({nums[i], nums[left], nums[right]});\n                // Skip duplicates on left and right\n                while (left < right && nums[left] == nums[left + 1]) left++;\n                while (left < right && nums[right] == nums[right - 1]) right--;\n                left++;\n                right--;\n            } else if (sum < 0) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return result;\n}",
    explanation: "Sorting the array enables the two-pointer technique. By fixing the first element and using left/right pointers for the remaining pair, complexity drops from O(N^3) brute force to O(N^2). Skipping identical adjacent numbers eliminates duplicate triplets without requiring a set.",
    complexity: { time: "O(N^2)", space: "O(1) auxiliary space (excluding result)" },
    useCases: "Sum zero combinations, k-sum problems, collision detection, triplet balancing.",
    commonMistakes: "Forgetting to advance both pointers after finding a triplet, causing an infinite loop.",
    tags: ["dsa","two-pointers","arrays","3sum","sorting"]
  },
  {
    id: "dsa_knapsack_01",
    title: "0/1 Knapsack Problem: Memoization & 1D Space Optimization",
    category: "DSA",
    subcategory: "Dynamic Programming",
    language: "C++",
    langClass: "lang-cpp",
    difficulty: "Medium",
    description: "Classic dynamic programming solution maximizing value within weight capacity W using a single 1D rolling array.",
    code: "#include <vector>\n#include <algorithm>\n#include <iostream>\n\nint knapsack01(int W, const std::vector<int>& weights, const std::vector<int>& values) {\n    int n = weights.size();\n    // 1D DP table representing max value for each capacity up to W\n    std::vector<int> dp(W + 1, 0);\n\n    for (int i = 0; i < n; ++i) {\n        // Traverse backwards from W down to weights[i] to prevent using item i multiple times\n        for (int w = W; w >= weights[i]; --w) {\n            dp[w] = std::max(dp[w], dp[w - weights[i]] + values[i]);\n        }\n    }\n\n    return dp[W];\n}\n\nint main() {\n    std::vector<int> values = {60, 100, 120};\n    std::vector<int> weights = {10, 20, 30};\n    int capacity = 50;\n\n    std::cout << \"Max Knapsack Value: \" << knapsack01(capacity, weights, values) << \"\\n\"; // 220\n    return 0;\n}",
    explanation: "Standard 2D DP dp[i][w] requires O(N*W) space. By iterating backward from capacity W down to weight[i], we can compress the state into a single 1D array of size W+1, ensuring earlier states are not overwritten prematurely.",
    complexity: { time: "O(N * W)", space: "O(W) space optimized" },
    useCases: "Resource allocation, portfolio optimization, subset sum partition, bin packing.",
    commonMistakes: "Iterating forward (w from weight[i] to W); forward iteration allows an item to be selected multiple times, turning it into Unbounded Knapsack.",
    tags: ["dsa","dp","knapsack","space-optimization","algorithms"]
  },
  {
    id: "js_event_delegation",
    title: "Robust Event Delegation with Element.closest()",
    category: "Web Development",
    subcategory: "Events",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Easy",
    description: "Attaching a single event listener to a parent container to efficiently handle events for all current and future child elements.",
    code: "function setupEventDelegation(containerSelector, itemSelector, actionHandler) {\n  const container = document.querySelector(containerSelector);\n  if (!container) return;\n\n  container.addEventListener('click', (event) => {\n    // Finds the closest ancestor matching the selector, or the target itself\n    const targetItem = event.target.closest(itemSelector);\n\n    // If click happened outside a matching element or container itself, ignore\n    if (!targetItem || !container.contains(targetItem)) return;\n\n    // Extract payload from data attributes\n    const itemId = targetItem.dataset.id;\n    const action = targetItem.dataset.action;\n\n    actionHandler({ id: itemId, action, element: targetItem, event });\n  });\n}\n\n// Usage Example:\nsetupEventDelegation('#todo-list', '.btn-action', ({ id, action }) => {\n  if (action === 'delete') console.log('Delete item:', id);\n  if (action === 'complete') console.log('Complete item:', id);\n});",
    explanation: "Instead of binding hundreds of event listeners to individual list items, event delegation leverages DOM event bubbling. Element.closest() cleanly handles clicks on nested elements (like icons or spans inside buttons).",
    complexity: { time: "O(D) where D is DOM depth of clicked element", space: "O(1) memory overhead" },
    useCases: "Dynamic lists, comment threads, tables with thousands of rows, interactive dashboards.",
    commonMistakes: "Using event.target.matches() directly; this fails if the user clicks an icon or text node nested inside the target button.",
    tags: ["javascript","dom","events","event-delegation","performance"]
  },
  {
    id: "js_fetch_abort_controller",
    title: "Fetch API with Configurable Timeout & Cancellation",
    category: "Web Development",
    subcategory: "Fetch API",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Production HTTP client wrapper supporting automatic timeout aborting, error handling, and manual cancellation signals.",
    code: "async function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {\n  const controller = new AbortController();\n  const { signal } = controller;\n\n  // Merge custom signal if supplied by caller\n  const timer = setTimeout(() => controller.abort(new Error('Request timed out')), timeoutMs);\n\n  try {\n    const response = await fetch(url, {\n      ...options,\n      signal: options.signal || signal,\n      headers: {\n        'Content-Type': 'application/json',\n        ...options.headers\n      }\n    });\n\n    if (!response.ok) {\n      const errorBody = await response.json().catch(() => ({}));\n      throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);\n    }\n\n    return await response.json();\n  } catch (error) {\n    if (error.name === 'AbortError') {\n      console.warn(`Fetch aborted for ${url}`);\n    }\n    throw error;\n  } finally {\n    clearTimeout(timer);\n  }\n}",
    explanation: "Standard fetch() does not have a built-in timeout and will hang indefinitely on unacknowledged TCP sockets. AbortController coupled with setTimeout guarantees request cleanup and resource release.",
    complexity: { time: "O(1) network initiation", space: "O(1)" },
    useCases: "API clients, auto-completes canceling previous in-flight keystroke queries, microservice integrations.",
    commonMistakes: "Forgetting to call clearTimeout(timer) in a finally block, which keeps the Node or browser event loop alive needlessly.",
    tags: ["fetch","async","abort-controller","http","javascript"]
  },
  {
    id: "js_object_transformations",
    title: "Modern Object Operations: Destructuring, Renaming & Dynamic Mapping",
    category: "Web Development",
    subcategory: "Async/Await",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Easy",
    description: "Patterns for deep destructuring with default fallbacks, key renaming, object filtering, and Object.fromEntries.",
    code: "const userProfile = {\n  id: 'usr_99',\n  personal: { firstName: 'Ada', lastName: 'Lovelace' },\n  roles: ['admin', 'developer'],\n  meta: { views: 420, draft: false, archived: null }\n};\n\n// 1. Nested destructuring with aliases and defaults\nconst {\n  id: userId,\n  personal: { firstName, lastName, age = 36 },\n  roles: [primaryRole, ...otherRoles]\n} = userProfile;\n\n// 2. Filter object entries: remove null/undefined values\nconst cleanMeta = Object.fromEntries(\n  Object.entries(userProfile.meta).filter(([_, value]) => value !== null)\n);\n\n// 3. Transform values while preserving keys\nconst multipliedScores = Object.fromEntries(\n  Object.entries({ math: 80, science: 90 }).map(([subject, score]) => [subject, score * 1.1])\n);\n\n// 4. Safe conditional property merging\nconst includeAnalytics = true;\nconst requestConfig = {\n  url: '/api/v1/data',\n  ...(includeAnalytics && { trackingId: 'TRK-9811' })\n};",
    explanation: "Object.entries() paired with Array methods and Object.fromEntries() provides an idiomatic, functional approach to filtering and mapping key-value objects without mutating originals.",
    complexity: { time: "O(K) where K is number of keys", space: "O(K) for new object" },
    useCases: "Payload sanitization, form field state normalization, immutable state updates.",
    commonMistakes: "Destructuring deeply nested properties when an intermediate parent object can be undefined, triggering a TypeError.",
    tags: ["javascript","destructuring","objects","functional-programming"]
  },
  {
    id: "web_form_validation_purejs",
    title: "Pure JavaScript Real-Time Form Validation Engine",
    category: "Web Development",
    subcategory: "Form Validation",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Validates email format, password strength requirements, and confirmed password matching with visual error feedback.",
    code: "const FormValidator = {\n  rules: {\n    email: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val) || 'Enter a valid email address.',\n    password: (val) => (val && val.length >= 8) || 'Password must be at least 8 characters.',\n    confirmPassword: (val, allVals) => val === allVals.password || 'Passwords do not match.'\n  },\n\n  validateField(fieldName, value, formValues) {\n    const validator = this.rules[fieldName];\n    if (!validator) return { valid: true, error: '' };\n\n    const result = validator(value, formValues);\n    return typeof result === 'string' ? { valid: false, error: result } : { valid: true, error: '' };\n  },\n\n  attach(formElement, onSubmit) {\n    const inputs = formElement.querySelectorAll('input[name]');\n\n    inputs.forEach(input => {\n      input.addEventListener('input', () => {\n        const values = Object.fromEntries(new FormData(formElement));\n        const res = this.validateField(input.name, input.value, values);\n        \n        let errorEl = input.parentElement.querySelector('.form-error-msg');\n        if (!res.valid) {\n          input.classList.add('border-red-500');\n          if (errorEl) errorEl.textContent = res.error;\n        } else {\n          input.classList.remove('border-red-500');\n          if (errorEl) errorEl.textContent = '';\n        }\n      });\n    });\n  }\n};",
    explanation: "Decouples validation logic from rendering. Each field rule returns true or a human-readable error string. Real-time input listening provides instant user feedback before submission.",
    complexity: { time: "O(1) regex check per keystroke", space: "O(1)" },
    useCases: "Signup/login flows, checkout validation, settings and user profile forms.",
    commonMistakes: "Validating only on submit instead of on blur/input, leading to frustrating user experiences when multiple errors appear simultaneously.",
    tags: ["forms","validation","javascript","ui","frontend"]
  },
  {
    id: "web_theme_switcher",
    title: "Dark / Light Theme Switcher with System Preference Sync",
    category: "Web Development",
    subcategory: "LocalStorage",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Easy",
    description: "Synchronizes dark/light mode with CSS variables, localStorage persistence, and OS prefers-color-scheme media query.",
    code: "const ThemeManager = {\n  STORAGE_KEY: 'devpilot_color_theme',\n\n  init() {\n    const saved = localStorage.getItem(this.STORAGE_KEY);\n    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n    const initialTheme = saved || (prefersDark ? 'dark' : 'light');\n    \n    this.applyTheme(initialTheme);\n\n    // Listen for OS system theme changes\n    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {\n      if (!localStorage.getItem(this.STORAGE_KEY)) {\n        this.applyTheme(e.matches ? 'dark' : 'light');\n      }\n    });\n  },\n\n  applyTheme(theme) {\n    document.documentElement.setAttribute('data-theme', theme);\n    document.documentElement.classList.toggle('dark', theme === 'dark');\n    localStorage.setItem(this.STORAGE_KEY, theme);\n  },\n\n  toggle() {\n    const current = document.documentElement.getAttribute('data-theme') || 'dark';\n    const next = current === 'dark' ? 'light' : 'dark';\n    this.applyTheme(next);\n    return next;\n  }\n};\n\n// Initialize on script load\nThemeManager.init();",
    explanation: "Reads existing preference from localStorage, falls back to the system media query match, and sets both data-theme attribute and CSS class for maximum framework compatibility (Tailwind & vanilla CSS).",
    complexity: { time: "O(1)", space: "O(1)" },
    useCases: "Theme customization, dark mode toggle buttons, accessibility settings.",
    commonMistakes: "Applying theme inside DOMContentLoaded, causing visible Flash of Unstyled Content (FOUC). Theme script should be placed in head.",
    tags: ["theme","dark-mode","localstorage","css","javascript"]
  },
  {
    id: "web_clipboard_helper",
    title: "Universal Clipboard Copy Helper with Legacy Fallback",
    category: "Web Development",
    subcategory: "LocalStorage",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Easy",
    description: "Copies text to system clipboard using modern Clipboard API with textarea execCommand fallback for non-HTTPS or legacy browsers.",
    code: "async function copyToClipboard(text) {\n  if (!text) return false;\n\n  // 1. Try modern asynchronous Clipboard API (requires secure origin)\n  if (navigator.clipboard && window.isSecureContext) {\n    try {\n      await navigator.clipboard.writeText(text);\n      return true;\n    } catch (err) {\n      console.warn('Clipboard API failed, trying fallback...', err);\n    }\n  }\n\n  // 2. Legacy fallback using hidden textarea and execCommand('copy')\n  const textarea = document.createElement('textarea');\n  textarea.value = text;\n  textarea.style.position = 'fixed';\n  textarea.style.top = '-9999px';\n  textarea.style.left = '-9999px';\n  textarea.setAttribute('readonly', '');\n  document.body.appendChild(textarea);\n\n  textarea.select();\n  textarea.setSelectionRange(0, 99999); // Mobile compatibility\n\n  let success = false;\n  try {\n    success = document.execCommand('copy');\n  } catch (err) {\n    console.error('Legacy copy failed', err);\n  } finally {\n    document.body.removeChild(textarea);\n  }\n\n  return success;\n}",
    explanation: "Safely branches between navigator.clipboard (fast, secure) and a zero-visual-impact textarea element fallback, guaranteeing high reliability across mobile webviews, iframes, and local HTTP development.",
    complexity: { time: "O(1)", space: "O(1)" },
    useCases: "Code snippet copy buttons, share URL generators, referral code triggers.",
    commonMistakes: "Relying exclusively on navigator.clipboard without checking window.isSecureContext, which fails on non-localhost HTTP test domains.",
    tags: ["clipboard","copy","utilities","javascript","browser"]
  },
  {
    id: "be_express_crud_routes",
    title: "Express.js Complete RESTful API CRUD Controller & Router",
    category: "Backend",
    subcategory: "REST API",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Full production-ready CRUD endpoints (List, Get, Create, Update, Delete) with standard HTTP status codes and pagination.",
    code: "const express = require('express');\nconst router = express.Router();\n\n// Mock in-memory repository (or Mongoose/Prisma model)\nlet items = [\n  { id: '1', title: 'First Task', completed: false }\n];\n\n// GET /api/items - List with pagination\nrouter.get('/', (req, res) => {\n  const page = parseInt(req.query.page, 10) || 1;\n  const limit = parseInt(req.query.limit, 10) || 10;\n  const startIndex = (page - 1) * limit;\n\n  const results = items.slice(startIndex, startIndex + limit);\n  res.status(200).json({ page, total: items.length, data: results });\n});\n\n// GET /api/items/:id - Retrieve single\nrouter.get('/:id', (req, res) => {\n  const item = items.find(i => i.id === req.params.id);\n  if (!item) return res.status(404).json({ error: 'Item not found' });\n  res.status(200).json({ data: item });\n});\n\n// POST /api/items - Create item\nrouter.post('/', (req, res) => {\n  const { title } = req.body;\n  if (!title || title.trim().length === 0) {\n    return res.status(400).json({ error: 'Title is required' });\n  }\n\n  const newItem = { id: String(Date.now()), title: title.trim(), completed: false };\n  items.push(newItem);\n  res.status(201).json({ data: newItem });\n});\n\n// PUT /api/items/:id - Update item\nrouter.put('/:id', (req, res) => {\n  const item = items.find(i => i.id === req.params.id);\n  if (!item) return res.status(404).json({ error: 'Item not found' });\n\n  if (req.body.title !== undefined) item.title = req.body.title.trim();\n  if (req.body.completed !== undefined) item.completed = Boolean(req.body.completed);\n\n  res.status(200).json({ data: item });\n});\n\n// DELETE /api/items/:id - Remove item\nrouter.delete('/:id', (req, res) => {\n  const index = items.findIndex(i => i.id === req.params.id);\n  if (index === -1) return res.status(404).json({ error: 'Item not found' });\n\n  items.splice(index, 1);\n  res.status(204).send(); // 204 No Content\n});\n\nmodule.exports = router;",
    explanation: "Adheres strictly to REST conventions: 200 for successful queries, 201 for resource creation, 204 for deletion, 400 for bad payloads, and 404 for missing resources.",
    complexity: { time: "O(1) to O(N)", space: "O(1) auxiliary" },
    useCases: "Building scalable backend APIs for mobile apps and single page web applications.",
    commonMistakes: "Returning status 200 on errors with an error message inside JSON body, breaking standard API contract.",
    tags: ["express","rest-api","crud","backend","nodejs"]
  },
  {
    id: "be_mongoose_schema_connect",
    title: "MongoDB Mongoose Connection, Schema Validation & Pre-Save Hooks",
    category: "Backend",
    subcategory: "Node.js",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Resilient MongoDB connection with auto-reconnect, schema constraints, bcrypt password hashing pre-save hook, and virtuals.",
    code: "const mongoose = require('mongoose');\nconst bcrypt = require('bcryptjs');\n\n// 1. Resilient Database Connection\nasync function connectDB(mongoUri) {\n  try {\n    await mongoose.connect(mongoUri, {\n      maxPoolSize: 10,\n      serverSelectionTimeoutMS: 5000\n    });\n    console.log('MongoDB connected successfully');\n  } catch (err) {\n    console.error('MongoDB connection error:', err.message);\n    process.exit(1);\n  }\n}\n\n// 2. Comprehensive Schema Definition\nconst UserSchema = new mongoose.Schema({\n  username: {\n    type: String,\n    required: [true, 'Username is required'],\n    unique: true,\n    trim: true,\n    minlength: 3\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    lowercase: true,\n    match: [/^\\S+@\\S+\\.\\S+$/, 'Invalid email address']\n  },\n  password: {\n    type: String,\n    required: true,\n    minlength: 8,\n    select: false // Never return password hash in queries by default\n  }\n}, { timestamps: true });\n\n// 3. Pre-Save Middleware Hook for Password Hashing\nUserSchema.pre('save', async function() {\n  if (!this.isModified('password')) return;\n  const salt = await bcrypt.genSalt(10);\n  this.password = await bcrypt.hash(this.password, salt);\n});\n\nmodule.exports = { connectDB, User: mongoose.model('User', UserSchema) };",
    explanation: "Uses connection pooling (maxPoolSize), prevents password leaks with select: false, and safely automates password hashing using mongoose pre-save lifecycle hooks.",
    complexity: { time: "O(1) connection setup, O(2^cost) bcrypt salt generation", space: "O(1)" },
    useCases: "User authentication models, SaaS user management, MongoDB application backends.",
    commonMistakes: "Re-hashing already hashed password on subsequent document saves; must check this.isModified(\"password\").",
    tags: ["mongodb","mongoose","backend","database","auth"]
  },
  {
    id: "be_cors_helmet_security",
    title: "Production Express Security Middleware: Helmet, CORS & Rate Limiting",
    category: "Backend",
    subcategory: "Middleware",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Securing an Express application with Content Security Policy, strict origin CORS, and basic IP rate limiting.",
    code: "const express = require('express');\nconst helmet = require('helmet');\nconst cors = require('cors');\n\nconst app = express();\n\n// 1. Secure HTTP Headers via Helmet\napp.use(helmet({\n  contentSecurityPolicy: false, // Customize per frontend needs\n  crossOriginResourcePolicy: { policy: \"cross-origin\" }\n}));\n\n// 2. Strict Whitelist CORS Configuration\nconst allowedOrigins = ['https://devpilot.ai', 'http://localhost:3000'];\n\nconst corsOptions = {\n  origin: function (origin, callback) {\n    // Allow non-browser agents (origin === undefined) or matching origins\n    if (!origin || allowedOrigins.includes(origin)) {\n      callback(null, true);\n    } else {\n      callback(new Error('Blocked by CORS policy'));\n    }\n  },\n  credentials: true,\n  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],\n  allowedHeaders: ['Content-Type', 'Authorization']\n};\n\napp.use(cors(corsOptions));\napp.use(express.json({ limit: '10kb' })); // Mitigate body flood attacks",
    explanation: "Helmet sets essential security headers (X-Frame-Options, Strict-Transport-Security, X-Content-Type-Options) mitigating clickjacking and MIME sniffing. CORS configuration restricts cross-origin resource access strictly to authorized domains.",
    complexity: { time: "O(1) per request", space: "O(1)" },
    useCases: "Hardening public REST APIs, safeguarding production microservices.",
    commonMistakes: "Setting cors({ origin: \"*\" }) when credentials (cookies or Authorization headers) are enabled, which browsers reject.",
    tags: ["express","security","cors","helmet","middleware"]
  },
  {
    id: "sql_ddl_create_table",
    title: "SQL DDL: Create Table with Comprehensive Constraints & Foreign Keys",
    category: "Database",
    subcategory: "SQL",
    language: "SQL",
    langClass: "lang-sql",
    difficulty: "Easy",
    description: "Production table creation schema with PRIMARY KEY, FOREIGN KEY ON DELETE CASCADE, CHECK constraints, and indexes.",
    code: "-- Drop tables if existing (in reverse dependency order)\nDROP TABLE IF EXISTS orders;\nDROP TABLE IF EXISTS customers;\n\n-- 1. Parent Table\nCREATE TABLE customers (\n    customer_id SERIAL PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    age INT CHECK (age >= 18 AND age <= 120),\n    is_active BOOLEAN DEFAULT TRUE,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n\n-- 2. Child Table with Relational Integrity\nCREATE TABLE orders (\n    order_id SERIAL PRIMARY KEY,\n    customer_id INT NOT NULL,\n    order_total NUMERIC(10, 2) CHECK (order_total >= 0),\n    order_status VARCHAR(20) DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED')),\n    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    \n    -- Foreign Key Constraint with Cascade Deletion\n    CONSTRAINT fk_customer\n        FOREIGN KEY (customer_id) \n        REFERENCES customers(customer_id) \n        ON DELETE CASCADE\n        ON UPDATE CASCADE\n);\n\n-- Index foreign key column for fast joins\nCREATE INDEX idx_orders_customer_id ON orders(customer_id);",
    explanation: "Uses CHECK constraints to enforce business rules at the storage engine level. ON DELETE CASCADE ensures referential integrity when parent customer rows are deleted.",
    complexity: { time: "O(1) DDL table registration", space: "O(1)" },
    useCases: "Database migrations, e-commerce schema design, relational data modeling.",
    commonMistakes: "Forgetting to index foreign key columns in child tables, leading to full table scans during joins and cascade deletions.",
    tags: ["sql","database","ddl","constraints","foreign-keys"]
  },
  {
    id: "sql_joins_comprehensive",
    title: "SQL Joins Master Reference: INNER, LEFT, RIGHT, FULL & SELF JOIN",
    category: "Database",
    subcategory: "SQL",
    language: "SQL",
    langClass: "lang-sql",
    difficulty: "Medium",
    description: "Clear queries demonstrating each relational join type with practical query patterns.",
    code: "-- 1. INNER JOIN: Returns only records with matching keys in BOTH tables\nSELECT u.id, u.name, o.order_id, o.amount\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- 2. LEFT JOIN: Returns ALL records from left table, and matching records from right (NULL if no match)\nSELECT u.name, o.order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n\n-- 3. Find Users WITHOUT Any Orders (Anti-Join Pattern)\nSELECT u.name\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.order_id IS NULL;\n\n-- 4. FULL OUTER JOIN: Returns all records when there is a match in either left or right table\nSELECT d.dept_name, e.employee_name\nFROM departments d\nFULL OUTER JOIN employees e ON d.dept_id = e.dept_id;\n\n-- 5. SELF JOIN: Join a table to itself (e.g., Employee -> Manager hierarchy)\nSELECT \n    e.name AS employee,\n    m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;",
    explanation: "Joins are the backbone of relational database queries. Using LEFT JOIN with a NULL predicate is the canonical, efficient way to find orphans or non-matching records.",
    complexity: { time: "O(N + M) with Hash/Merge Join; O(N log M) with Nested Index Loop", space: "O(M) temporary hash table" },
    useCases: "Reporting, data aggregation across entities, hierarchical tree queries.",
    commonMistakes: "Placing conditions on the right table in the WHERE clause instead of the ON clause, inadvertently converting a LEFT JOIN into an INNER JOIN.",
    tags: ["sql","database","joins","left-join","inner-join"]
  },
  {
    id: "db_mongo_aggregation_pipeline",
    title: "MongoDB Aggregation Pipeline: Filtering, Grouping & Joins ($lookup)",
    category: "Database",
    subcategory: "MongoDB",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Hard",
    description: "Multi-stage aggregation pipeline calculating category sales, sorting, formatting fields, and joining related collections.",
    code: "// Run on database: db.orders.aggregate([...])\ndb.orders.aggregate([\n  // Stage 1: Filter completed orders within target date range\n  {\n    $match: {\n      status: 'completed',\n      createdAt: { $gte: new Date('2026-01-01') }\n    }\n  },\n\n  // Stage 2: Deconstruct items array into individual documents\n  {\n    $unwind: '$items'\n  },\n\n  // Stage 3: Group by item category and compute metrics\n  {\n    $group: {\n      _id: '$items.category',\n      totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },\n      totalUnitsSold: { $sum: '$items.quantity' },\n      orderCount: { $addToSet: '$_id' }\n    }\n  },\n\n  // Stage 4: Lookup category details from another collection\n  {\n    $lookup: {\n      from: 'categories',\n      localField: '_id',\n      foreignField: 'slug',\n      as: 'categoryDetails'\n    }\n  },\n\n  // Stage 5: Project clean output shape\n  {\n    $project: {\n      category: '$_id',\n      categoryName: { $arrayElemAt: ['$categoryDetails.name', 0] },\n      totalRevenue: { $round: ['$totalRevenue', 2] },\n      totalUnitsSold: 1,\n      uniqueOrders: { $size: '$orderCount' }\n    }\n  },\n\n  // Stage 6: Sort by revenue descending\n  {\n    $sort: { totalRevenue: -1 }\n  }\n]);",
    explanation: "Aggregation pipelines execute data transformations in memory in sequential stages. Placing $match as the first stage enables index utilization and reduces the working set for subsequent stages.",
    complexity: { time: "O(N log N) dominated by sort or un-indexed lookup", space: "O(N) working memory (100MB limit without allowDiskUse)" },
    useCases: "Analytics dashboards, revenue reporting, metric summaries, complex joins in NoSQL.",
    commonMistakes: "Placing $match after $unwind, which explodes the number of documents before filtering and severely degrades performance.",
    tags: ["mongodb","aggregation","database","nosql","lookup"]
  },
  {
    id: "cs_oop_es6_classes",
    title: "OOP in JavaScript: Encapsulation, Inheritance & Polymorphism",
    category: "Computer Science",
    subcategory: "OOP",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Modern ES6+ class architecture featuring private fields (#), getters/setters, super calls, and method overriding.",
    code: "// Base Class\nclass BankAccount {\n  // Private field: cannot be accessed or modified outside class scope\n  #balance = 0;\n  #accountNumber;\n\n  constructor(accountNumber, initialDeposit = 0) {\n    this.#accountNumber = accountNumber;\n    if (initialDeposit > 0) this.#balance = initialDeposit;\n  }\n\n  // Encapsulated getter\n  get balance() {\n    return this.#balance;\n  }\n\n  deposit(amount) {\n    if (amount <= 0) throw new Error('Deposit must be positive');\n    this.#balance += amount;\n    return this.#balance;\n  }\n\n  withdraw(amount) {\n    if (amount > this.#balance) throw new Error('Insufficient funds');\n    this.#balance -= amount;\n    return this.#balance;\n  }\n\n  // Virtual method meant to be overridden (Polymorphism)\n  calculateMonthlyFee() {\n    return 5.00;\n  }\n}\n\n// Derived Class demonstrating Inheritance\nclass PremiumAccount extends BankAccount {\n  constructor(accountNumber, initialDeposit, tier = 'Gold') {\n    super(accountNumber, initialDeposit);\n    this.tier = tier;\n  }\n\n  // Polymorphic override\n  calculateMonthlyFee() {\n    return this.tier === 'Platinum' ? 0.00 : 2.50;\n  }\n}\n\nconst myAcc = new PremiumAccount('ACC-1002', 500, 'Platinum');\nconsole.log(myAcc.balance); // 500\nconsole.log(myAcc.calculateMonthlyFee()); // 0 (Polymorphic call)",
    explanation: "Private class fields (#) provide hard encapsulation guaranteed by the JavaScript V8 engine. Subclasses extend parent classes via extends and call the parent constructor with super().",
    complexity: { time: "O(1) method invocations via prototype chain", space: "O(1) memory overhead" },
    useCases: "Domain modeling, payment processors, game state engines, enterprise SDKs.",
    commonMistakes: "Trying to access private fields via this[\"#balance\"] using bracket notation; private identifiers cannot be dynamically computed.",
    tags: ["oop","javascript","classes","inheritance","encapsulation"]
  },
  {
    id: "cs_factory_pattern",
    title: "Factory Design Pattern: Decoupled Object Instantiation",
    category: "Computer Science",
    subcategory: "System Design",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Easy",
    description: "Creates notification providers dynamically based on channel type without exposing instantiation logic to the client.",
    code: "// Interface contracts\nclass EmailNotifier {\n  send(message, recipient) {\n    return `[EMAIL] To ${recipient}: ${message}`;\n  }\n}\n\nclass SmsNotifier {\n  send(message, recipient) {\n    return `[SMS] To ${recipient}: ${message.substring(0, 160)}`;\n  }\n}\n\nclass SlackNotifier {\n  constructor(webhookUrl) {\n    this.webhookUrl = webhookUrl;\n  }\n  send(message, channel) {\n    return `[SLACK] Posting to ${channel} via ${this.webhookUrl}: ${message}`;\n  }\n}\n\n// Factory\nclass NotificationFactory {\n  static create(type, config = {}) {\n    switch (type.toLowerCase()) {\n      case 'email':\n        return new EmailNotifier();\n      case 'sms':\n        return new SmsNotifier();\n      case 'slack':\n        return new SlackNotifier(config.webhookUrl || 'https://hooks.slack.com/default');\n      default:\n        throw new Error(`Unsupported notification channel: ${type}`);\n    }\n  }\n}\n\n// Client usage\nconst notifier = NotificationFactory.create('slack', { webhookUrl: 'https://hooks.slack.com/team-alerts' });\nconsole.log(notifier.send('Deploy finished!', '#ops'));",
    explanation: "The Factory Pattern promotes Loose Coupling and adheres to the Open-Closed Principle. The caller specifies the desired type via a string parameter without coupling to the specific concrete class constructor.",
    complexity: { time: "O(1)", space: "O(1)" },
    useCases: "Payment gateway selection, logging drivers (Winston, Pino), database connectors.",
    commonMistakes: "Over-engineering simple object creations with factories when a direct new expression or plain object is sufficient.",
    tags: ["design-patterns","system-design","factory-pattern","oop","javascript"]
  },
  {
    id: "cs_thread_mutex_sync",
    title: "Thread-Safe Blocking Queue: std::mutex & std::condition_variable",
    category: "Computer Science",
    subcategory: "OS",
    language: "C++",
    langClass: "lang-cpp",
    difficulty: "Hard",
    description: "Classic Producer-Consumer thread synchronization queue using RAII locks and condition variables in C++.",
    code: "#include <iostream>\n#include <queue>\n#include <mutex>\n#include <condition_variable>\n#include <thread>\n\ntemplate <typename T>\nclass ThreadSafeQueue {\nprivate:\n    std::queue<T> q;\n    mutable std::mutex mtx;\n    std::condition_variable cv;\n\npublic:\n    void push(T val) {\n        {\n            std::lock_guard<std::mutex> lock(mtx);\n            q.push(std::move(val));\n        }\n        cv.notify_one(); // Wake up one waiting consumer thread\n    }\n\n    T pop() {\n        std::unique_lock<std::mutex> lock(mtx);\n        // Wait until queue is non-empty; protects against spurious wakeups\n        cv.wait(lock, [this]() { return !q.empty(); });\n\n        T val = std::move(q.front());\n        q.pop();\n        return val;\n    }\n};\n\nint main() {\n    ThreadSafeQueue<int> taskQueue;\n\n    std::thread producer([&]() {\n        for (int i = 1; i <= 5; ++i) {\n            taskQueue.push(i);\n            std::this_thread::sleep_for(std::chrono::milliseconds(50));\n        }\n    });\n\n    std::thread consumer([&]() {\n        for (int i = 1; i <= 5; ++i) {\n            int task = taskQueue.pop();\n            std::cout << \"Processed task: \" << task << \"\\n\";\n        }\n    });\n\n    producer.join();\n    consumer.join();\n    return 0;\n}",
    explanation: "Guards against race conditions using std::mutex. cv.wait() atomically unlocks the mutex and puts the consumer to sleep until notified, avoiding busy-waiting and CPU spin.",
    complexity: { time: "O(1) enqueue/dequeue", space: "O(N) buffered elements" },
    useCases: "Thread pools, background worker task queues, real-time audio/video processing pipelines.",
    commonMistakes: "Calling cv.wait() without a predicate lambda, leaving the code vulnerable to spurious wakeups and crashing on empty queue access.",
    tags: ["concurrency","multithreading","mutex","cpp","os"]
  },
  {
    id: "cs_tcp_socket_server",
    title: "Raw TCP Socket Server & Client Protocol Handler",
    category: "Computer Science",
    subcategory: "Computer Networks",
    language: "JavaScript",
    langClass: "lang-js",
    difficulty: "Medium",
    description: "Low-level TCP stream server with connection lifecycle handling, buffer framing, and client echo.",
    code: "const net = require('net');\n\nconst PORT = 7070;\n\n// Create TCP Echo Server\nconst server = net.createServer((socket) => {\n  const clientAddr = `${socket.remoteAddress}:${socket.remotePort}`;\n  console.log(`Client connected from ${clientAddr}`);\n\n  socket.setEncoding('utf8');\n\n  // Handle incoming data buffer packets\n  socket.on('data', (data) => {\n    console.log(`Received [${clientAddr}]: ${data.trim()}`);\n    // Echo back with protocol newline\n    socket.write(`ACK: ${data}`);\n  });\n\n  socket.on('end', () => {\n    console.log(`Client disconnected: ${clientAddr}`);\n  });\n\n  socket.on('error', (err) => {\n    console.error(`Socket error on ${clientAddr}:`, err.message);\n  });\n});\n\nserver.listen(PORT, '127.0.0.1', () => {\n  console.log(`TCP server listening on port ${PORT}`);\n});",
    explanation: "Uses Node.js core net module for Layer 4 Transport layer TCP streaming. Manages raw byte buffers without HTTP overhead, suitable for custom binary/game protocols.",
    complexity: { time: "O(1) event-driven multiplexing via epoll/libuv", space: "O(1) per socket buffer" },
    useCases: "IoT sensors, gaming backend networks, custom telemetry collectors, microservice RPC.",
    commonMistakes: "Assuming a single socket.on(\"data\") event corresponds to exactly one application message (TCP is a continuous byte stream, requiring explicit message framing or length delimiters).",
    tags: ["networking","tcp","sockets","nodejs","computer-networks"]
  },
  {
    id: "dev_docker_compose_fullstack",
    title: "Production Docker Compose: Node.js API + PostgreSQL + Redis",
    category: "Git / Dev Tools",
    subcategory: "Docker",
    language: "Docker",
    langClass: "lang-docker",
    difficulty: "Medium",
    description: "Multi-container orchestration setup featuring health checks, named volumes for persistent data, and isolated bridge networking.",
    code: "version: '3.8'\n\nservices:\n  # 1. API Application Service\n  api:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    container_name: devpilot_api\n    restart: unless-stopped\n    ports:\n      - \"5000:5000\"\n    environment:\n      - NODE_ENV=production\n      - DATABASE_URL=postgres://devuser:secretpass@postgres:5432/devpilot_db\n      - REDIS_URL=redis://redis:6379\n    depends_on:\n      postgres:\n        condition: service_healthy\n      redis:\n        condition: service_started\n    networks:\n      - app-network\n\n  # 2. Relational Database\n  postgres:\n    image: postgres:16-alpine\n    container_name: devpilot_postgres\n    restart: always\n    environment:\n      POSTGRES_USER: devuser\n      POSTGRES_PASSWORD: secretpass\n      POSTGRES_DB: devpilot_db\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U devuser -d devpilot_db\"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n    networks:\n      - app-network\n\n  # 3. In-Memory Cache\n  redis:\n    image: redis:7-alpine\n    container_name: devpilot_redis\n    restart: always\n    volumes:\n      - redis_data:/data\n    networks:\n      - app-network\n\nnetworks:\n  app-network:\n    driver: bridge\n\nvolumes:\n  postgres_data:\n  redis_data:",
    explanation: "Orchestrates interconnected containers with dependency conditions (service_healthy). Named volumes ensure database state persists across container rebuilds.",
    complexity: { time: "O(1) service startup", space: "Isolated container namespaces" },
    useCases: "Local development identical to production, CI/CD pipeline automation, staging deployments.",
    commonMistakes: "Not using named volumes for databases, leading to complete data loss upon docker compose down.",
    tags: ["docker","docker-compose","devops","postgres","redis"]
  },
  {
    id: "dev_nginx_reverse_proxy",
    title: "Nginx Reverse Proxy with SSL Termination & WebSocket Support",
    category: "Git / Dev Tools",
    subcategory: "Linux",
    language: "Bash",
    langClass: "lang-bash",
    difficulty: "Medium",
    description: "High-performance nginx.conf configuration routing traffic, terminating HTTPS, and forwarding client headers to an upstream Node app.",
    code: "upstream app_servers {\n    server 127.0.0.1:5000;\n    keepalive 32;\n}\n\n# Redirect HTTP to HTTPS\nserver {\n    listen 80;\n    server_name api.devpilot.ai;\n    return 301 https://$host$request_uri;\n}\n\n# Secure HTTPS Server\nserver {\n    listen 443 ssl http2;\n    server_name api.devpilot.ai;\n\n    ssl_certificate /etc/letsencrypt/live/api.devpilot.ai/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/api.devpilot.ai/privkey.pem;\n    ssl_protocols TLSv1.2 TLSv1.3;\n    ssl_ciphers HIGH:!aNULL:!MD5;\n\n    # Gzip Compression\n    gzip on;\n    gzip_types text/plain application/json text/css application/javascript;\n\n    location / {\n        proxy_pass http://app_servers;\n        proxy_http_version 1.1;\n\n        # WebSocket support\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \"upgrade\";\n\n        # Preserve original client IP and Host\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n\n        proxy_connect_timeout 60s;\n        proxy_read_timeout 60s;\n    }\n}",
    explanation: "Acts as the public perimeter gateway. Nginx absorbs TLS handshakes, compresses responses on the fly, and proxies clean HTTP/1.1 traffic to the internal Node.js cluster.",
    complexity: { time: "O(1) async non-blocking event loop", space: "O(1) per connection" },
    useCases: "Load balancing, production web hosting, SSL certificate management with Let's Encrypt.",
    commonMistakes: "Omitting proxy_set_header X-Forwarded-Proto, which causes upstream applications to assume insecure HTTP and break OAuth redirects.",
    tags: ["nginx","devops","reverse-proxy","ssl","linux"]
  },
  {
    id: "py_list_dict_comprehension",
    title: "Python Comprehensions & Advanced Dictionary Sorting",
    category: "Python / AI",
    subcategory: "Python Basics",
    language: "Python",
    langClass: "lang-py",
    difficulty: "Easy",
    description: "Idiomatic list and dictionary comprehensions with conditional filtering and multi-key dictionary sorting.",
    code: "# 1. List Comprehension with if-else filtering\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens_squared = [x**2 for x in numbers if x % 2 == 0]\nparity_labels = [\"EVEN\" if x % 2 == 0 else \"ODD\" for x in numbers]\n\n# 2. Dictionary Comprehension (Inverting key-values)\noriginal_map = {\"a\": 1, \"b\": 2, \"c\": 3}\ninverted_map = {val: key for key, val in original_map.items()}\n\n# 3. Sorting Dictionaries by Value (Descending)\ninventory = {\"apples\": 45, \"bananas\": 12, \"cherries\": 88, \"dates\": 29}\nsorted_by_val = dict(sorted(inventory.items(), key=lambda item: item[1], reverse=True))\n# Result: {'cherries': 88, 'apples': 45, 'dates': 29, 'bananas': 12}\n\n# 4. Sorting complex list of dicts by multiple criteria\nemployees = [\n    {\"name\": \"Alice\", \"dept\": \"Engineering\", \"salary\": 120000},\n    {\"name\": \"Bob\", \"dept\": \"Engineering\", \"salary\": 95000},\n    {\"name\": \"Charlie\", \"dept\": \"Sales\", \"salary\": 110000}\n]\n# Sort by dept asc, then salary desc\nemployees.sort(key=lambda e: (e[\"dept\"], -e[\"salary\"]))",
    explanation: "Comprehensions are evaluated in optimized C-level loops in CPython, outperforming manual for-loops and append() calls while preserving concise readability.",
    complexity: { time: "O(N) for comprehensions; O(N log N) for Timsort", space: "O(N) allocated collection" },
    useCases: "Data preprocessing, transforming API response dictionaries, rank ordering.",
    commonMistakes: "Nesting more than two comprehension loops, which quickly degrades code readability.",
    tags: ["python","comprehensions","sorting","dictionaries","clean-code"]
  },
  {
    id: "py_file_json_handling",
    title: "Python Safe File I/O & JSON Serialization with Context Managers",
    category: "Python / AI",
    subcategory: "Python Basics",
    language: "Python",
    langClass: "lang-py",
    difficulty: "Easy",
    description: "Reading, parsing, modifying, and safely writing JSON files with automatic file closure and atomic backup handling.",
    code: "import json\nfrom pathlib import Path\n\ndef process_config(filepath: str):\n    path = Path(filepath)\n\n    # 1. Safe Reading with context manager\n    if not path.exists():\n        raise FileNotFoundError(f\"Configuration file {filepath} not found.\")\n\n    with open(path, mode=\"r\", encoding=\"utf-8\") as f:\n        data = json.load(f)\n\n    # 2. Mutate configuration\n    data[\"last_updated\"] = \"2026-09-14T10:00:00Z\"\n    data[\"version\"] = data.get(\"version\", 1) + 1\n\n    # 3. Safe Writing with indentation and UTF-8 guarantee\n    temp_path = path.with_suffix(\".tmp\")\n    with open(temp_path, mode=\"w\", encoding=\"utf-8\") as f:\n        json.dump(data, f, indent=2, ensure_ascii=False)\n\n    # Atomic rename replaces original file safely\n    temp_path.replace(path)\n    return data",
    explanation: "The with statement acts as a context manager that guarantees file descriptor closure even when runtime exceptions occur. Writing to a temp file before renaming prevents partial file corruption.",
    complexity: { time: "O(F) where F is file byte size", space: "O(F) buffer" },
    useCases: "Reading configuration files, logging metrics, caching pipeline outputs.",
    commonMistakes: "Omitting encoding=\"utf-8\" in open(), which defaults to platform-specific encoding (e.g. cp1252 on Windows) and corrupts international characters.",
    tags: ["python","json","file-handling","io","context-manager"]
  },
  {
    id: "py_numpy_array_ops",
    title: "NumPy Vectorized Operations, Broadcasting & Boolean Masking",
    category: "Python / AI",
    subcategory: "NumPy",
    language: "Python",
    langClass: "lang-py",
    difficulty: "Easy",
    description: "High-performance matrix mathematics: vectorized arithmetic, 2D broadcasting, matrix dot products, and conditional masking.",
    code: "import numpy as np\n\n# 1. Array creation & Reshaping\narr = np.arange(1, 10).reshape(3, 3) # 3x3 matrix from 1 to 9\n\n# 2. Vectorized element-wise math (C-speed, no python loops)\nsquared = arr ** 2\nnormalized = (arr - np.mean(arr)) / np.std(arr)\n\n# 3. Broadcasting: add 1D row vector (1x3) to 2D matrix (3x3)\nrow_vector = np.array([10, 20, 30])\nbroadcasted_sum = arr + row_vector\n\n# 4. Matrix Multiplication\nA = np.random.randn(3, 2)\nB = np.random.randn(2, 4)\nproduct = A @ B  # Resulting shape: (3, 4)\n\n# 5. Boolean Indexing & Masking\ndata = np.array([12, -4, 25, -9, 30, 0, 18])\npositive_mask = data > 0\nfiltered_data = data[positive_mask] # array([12, 25, 30, 18])\n\n# Conditional replacement in-place\ndata[data < 0] = 0 # Replaces all negatives with zero",
    explanation: "NumPy executes calculations in contiguous C memory blocks using SIMD CPU instructions. Vectorized operations run 50x to 100x faster than standard Python loops.",
    complexity: { time: "O(N) vectorized C execution; O(N^2.8) for matrix product", space: "O(N) memory allocation" },
    useCases: "Machine learning feature pipelines, scientific data analysis, physics simulations.",
    commonMistakes: "Using Python for-loops to iterate over NumPy arrays item-by-item, discarding the vectorization performance benefits.",
    tags: ["numpy","python","data-science","vectorization","ai"]
  },
  {
    id: "py_sklearn_classification",
    title: "Scikit-Learn Classification Pipeline: train_test_split & Model Evaluation",
    category: "Python / AI",
    subcategory: "ML Preprocessing",
    language: "Python",
    langClass: "lang-py",
    difficulty: "Medium",
    description: "End-to-end machine learning workflow: dataset splitting, feature scaling, RandomForest training, and metric evaluation.",
    code: "import numpy as np\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, accuracy_score\n\n# 1. Synthesize binary classification dataset\nX, y = make_classification(n_samples=1000, n_features=10, random_state=42)\n\n# 2. Stratified train-test split (80/20)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# 3. Standardize features (Fit ONLY on training set to prevent data leakage)\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\n\n# 4. Instantiate & train model\nmodel = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)\nmodel.fit(X_train_scaled, y_train)\n\n# 5. Predict & Evaluate\ny_pred = model.predict(X_test_scaled)\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.4f}\")\nprint(classification_report(y_test, y_pred))",
    explanation: "Demonstrates gold-standard ML data preparation. Fitting the scaler strictly on X_train before transforming X_test guarantees no target or statistical leakage into test evaluation.",
    complexity: { time: "O(M * N * log N) for M trees", space: "O(M * N)" },
    useCases: "Churn prediction, credit risk scoring, fraud detection, tabular data modeling.",
    commonMistakes: "Fitting scaler.fit_transform(X) on the entire dataset prior to splitting, which leaks test distribution information into the model.",
    tags: ["machine-learning","sklearn","scikit-learn","classification","python"]
  },
  {
    id: "py_pytorch_tensor_nn",
    title: "PyTorch: Tensors, Autograd & 2-Layer Neural Network Forward Pass",
    category: "Python / AI",
    subcategory: "ML Preprocessing",
    language: "Python",
    langClass: "lang-py",
    difficulty: "Hard",
    description: "Basic PyTorch neural network module with autograd backward pass, Adam optimizer step, and GPU/CPU device dispatch.",
    code: "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\n# 1. Device agnostic setup (GPU acceleration if available)\ndevice = torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\")\n\n# 2. Define custom neural network module\nclass SimpleClassifier(nn.Module):\n    def __init__(self, input_dim, hidden_dim, output_dim):\n        super(SimpleClassifier, self).__init__()\n        self.fc1 = nn.Linear(input_dim, hidden_dim)\n        self.relu = nn.ReLU()\n        self.fc2 = nn.Linear(hidden_dim, output_dim)\n\n    def forward(self, x):\n        out = self.fc1(x)\n        out = self.relu(out)\n        out = self.fc2(out)\n        return out\n\n# 3. Model, Loss Function, and Optimizer\nmodel = SimpleClassifier(input_dim=8, hidden_dim=16, output_dim=2).to(device)\ncriterion = nn.CrossEntropyLoss()\noptimizer = optim.Adam(model.parameters(), lr=0.001)\n\n# 4. Forward and Backward Training Step\ninputs = torch.randn(32, 8).to(device)  # Batch of 32 samples\nlabels = torch.randint(0, 2, (32,)).to(device)\n\noptimizer.zero_grad()           # Reset existing gradients\noutputs = model(inputs)         # Forward pass\nloss = criterion(outputs, labels) # Calculate loss\nloss.backward()                 # Compute gradients via Autograd\noptimizer.step()                # Update weights\n\nprint(f\"Batch Loss: {loss.item():.4f}\")",
    explanation: "Inheriting from nn.Module registers layer parameters automatically. optimizer.zero_grad() is required before loss.backward() because PyTorch accumulates gradients by default across iterations.",
    complexity: { time: "O(B * H) where B is batch size and H is hidden dimension", space: "O(Parameters)" },
    useCases: "Deep learning classification, representation learning, embedding networks.",
    commonMistakes: "Forgetting optimizer.zero_grad(), leading to accumulated gradient explosions across consecutive mini-batches.",
    tags: ["pytorch","deep-learning","neural-networks","tensors","python"]
  }
];

// Helper functions for snippets lookup and recommendations
function getSnippetById(id) {
  return SNIPPETS_DATA.find(s => s.id === id) || null;
}

function getRelatedSnippets(currentSnippet, limit = 4) {
  if (!currentSnippet) return [];
  
  return SNIPPETS_DATA
    .filter(s => s.id !== currentSnippet.id)
    .map(s => {
      let score = 0;
      // Matching subcategory is strongest signal
      if (s.subcategory === currentSnippet.subcategory) score += 5;
      // Matching category
      if (s.category === currentSnippet.category) score += 3;
      // Matching language
      if (s.language === currentSnippet.language) score += 2;
      // Matching tags
      if (Array.isArray(s.tags) && Array.isArray(currentSnippet.tags)) {
        const overlap = s.tags.filter(t => currentSnippet.tags.includes(t)).length;
        score += overlap * 2;
      }
      return { snippet: s, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.snippet);
}

// Export for browser and Node.js
if (typeof window !== 'undefined') {
  window.SNIPPET_CATEGORIES = SNIPPET_CATEGORIES;
  window.SNIPPETS_DATA = SNIPPETS_DATA;
  window.getSnippetById = getSnippetById;
  window.getRelatedSnippets = getRelatedSnippets;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SNIPPET_CATEGORIES,
    SNIPPETS_DATA,
    getSnippetById,
    getRelatedSnippets
  };
}
