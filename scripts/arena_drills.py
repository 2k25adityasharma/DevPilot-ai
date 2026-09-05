# -*- coding: utf-8 -*-
"""
DevPilot-AI — 32 'Identify the Pattern' Training Arena Drills
Real-world problem scenarios testing pattern recognition skills across all 16 DSA categories.
"""

arena_drills = [
    {
        "id": "drill-01",
        "title": "Pair Sum in Sorted Inventory",
        "snippet": "Given a strictly increasing array of product prices and a budget K, determine if there exists any pair of distinct items whose prices sum up to exactly K in O(1) extra space.",
        "constraints": "prices.length <= 10^5, prices is sorted ascending, prices[i] >= 0",
        "options": ["Two Pointers", "Dynamic Programming", "Segment Tree", "Breadth First Search"],
        "correctIndex": 0,
        "explanation": "Because the array is sorted and requires O(1) auxiliary space, opposite-direction Two Pointers achieves O(N) time by starting at indices 0 and n-1 and converging based on current sum vs K.",
        "hint": "Sorted array + O(1) space limit is the quintessential signature of Two Pointers."
    },
    {
        "id": "drill-02",
        "title": "Longest Transmission with at Most 2 Glitches",
        "snippet": "A network monitor logs a binary packet stream. You want to find the maximum length of a contiguous subsegment that contains at most 2 corrupted packets (zeros).",
        "constraints": "packets.length <= 10^5, packets[i] in {0, 1}",
        "options": ["Monotonic Stack", "Sliding Window", "Trie", "Disjoint Set Union"],
        "correctIndex": 1,
        "explanation": "The problem asks for the longest contiguous subsegment satisfying a frequency condition (zeros <= 2). Dynamic Sliding Window (expanding right, shrinking left when zeros > 2) solves this in O(N) time.",
        "hint": "Contiguous subarray + at most K condition = Sliding Window."
    },
    {
        "id": "drill-03",
        "title": "Subarray Transaction Balancing",
        "snippet": "You are given a ledger of positive and negative transaction values. Count the total number of continuous periods where the net balance change was exactly zero.",
        "constraints": "nums.length <= 10^5, nums[i] can be negative, zero, or positive",
        "options": ["Prefix Sum + Hash Map", "Two Pointers", "Binary Search on Answer", "Greedy Interval Scheduling"],
        "correctIndex": 0,
        "explanation": "Because array elements can be negative, Two Pointers and Sliding Window fail due to loss of monotonicity. Storing prefix sums in a Hash Map allows O(1) lookup of how many times a target sum (prefixSum - target) appeared earlier.",
        "hint": "Subarray sum equals target with negative numbers strictly requires Prefix Sum + Hash Map."
    },
    {
        "id": "drill-04",
        "title": "Next Warmer Day Forecast",
        "snippet": "Given an array of daily temperatures, compute for each day how many days you would have to wait until a warmer temperature occurs. If no warmer day arrives, return 0.",
        "constraints": "temperatures.length <= 10^5, temperatures[i] <= 100",
        "options": ["Monotonic Stack", "Depth First Search", "Fenwick Tree", "Breadth First Search"],
        "correctIndex": 0,
        "explanation": "Finding the 'next greater element' or first element to the right satisfying a comparison is the textbook Monotonic Stack pattern. A decreasing stack of indices resolves each day in amortized O(1) time.",
        "hint": "Next greater / smaller element on the right/left screams Monotonic Stack."
    },
    {
        "id": "drill-05",
        "title": "Autonomous Factory Conveyor Capacity",
        "snippet": "A robotic system must ship N packages in order within D days. Find the minimum conveyor weight capacity needed so that all packages are transported in at most D days.",
        "constraints": "weights.length <= 5 * 10^4, 1 <= D <= weights.length",
        "options": ["Binary Search on Answer Space", "Two Pointers", "Backtracking", "Topological Sort"],
        "correctIndex": 0,
        "explanation": "The answer capacity lies in a monotonic range [max(weights), sum(weights)]. If capacity C is feasible, any capacity > C is also feasible. This monotonic boolean predicate enables Binary Search on the answer space in O(N log(sum - max)).",
        "hint": "Minimize the maximum capacity or find smallest threshold with a monotonic feasibility check = Binary Search on Answer."
    },
    {
        "id": "drill-06",
        "title": "Course Dependency Deadlock Detection",
        "snippet": "A university catalog gives total courses N and a list of prerequisites [A, B] meaning course B must be taken before A. Determine if it is possible for a student to finish all courses.",
        "constraints": "N <= 10^5, prerequisites.length <= 10^5",
        "options": ["Topological Sort / Cycle Detection", "Greedy Jump", "Sliding Window", "Segment Tree"],
        "correctIndex": 0,
        "explanation": "Prerequisites define a directed graph where courses are nodes and requirements are edges. If there exists a directed cycle, completion is impossible. Kahn's algorithm (BFS in-degrees) or DFS cycle detection resolves this in O(V + E).",
        "hint": "Prerequisites, order of dependencies, or directed cycle detection = Topological Sort / Graph BFS-DFS."
    },
    {
        "id": "drill-07",
        "title": "Minimum Cash Register Coins",
        "snippet": "Given an array of distinct coin denominations and an integer amount, compute the fewest number of coins needed to make up that amount, or return -1 if impossible.",
        "constraints": "coins.length <= 12, amount <= 10^4, coins[i] >= 1",
        "options": ["Dynamic Programming (Unbounded Knapsack)", "Greedy Coin Selection", "Two Pointers", "Binary Search"],
        "correctIndex": 0,
        "explanation": "Arbitrary coin systems lack the greedy matroid property (e.g., coins [1, 3, 4] for amount 6 yields greedy 4+1+1 = 3 coins, but optimal DP is 3+3 = 2 coins). 1D DP `dp[i] = min(dp[i], dp[i - c] + 1)` solves it in O(amount * coins).",
        "hint": "Fewest items to make exact target without greedy guarantees = DP Knapsack."
    },
    {
        "id": "drill-08",
        "title": "Live Video Stream Top K Viewers",
        "snippet": "In an unbounded real-time stream of viewer interaction counts, continuously maintain the top K most active viewer IDs at any point in time.",
        "constraints": "Stream length up to 10^7, K <= 10^4",
        "options": ["Min-Heap of Size K", "Quicksort on entire stream", "Prefix Sum Array", "Monotonic Stack"],
        "correctIndex": 0,
        "explanation": "Maintaining top K elements in an active or streaming dataset is solved using a Min-Heap of capacity K. When the heap exceeds K, ejecting the smallest element leaves the K largest in O(log K) per insertion.",
        "hint": "Top K elements in dynamic stream = Min-Heap of size K."
    },
    {
        "id": "drill-09",
        "title": "Meeting Room Overlap Auditor",
        "snippet": "Given a collection of meeting time intervals [start, end], find the minimum number of conference rooms required so that no two simultaneous meetings overlap.",
        "constraints": "intervals.length <= 10^5, 0 <= start < end <= 10^6",
        "options": ["Greedy Interval Sweep-line / Min-Heap", "Breadth First Search", "Backtracking", "Prefix Suffix Product"],
        "correctIndex": 0,
        "explanation": "Sort meetings by start time and use a Min-Heap storing end times (or two sorted arrays for start/end points). If the earliest ending meeting finishes before the next starts, reuse the room; otherwise allocate a new room.",
        "hint": "Interval scheduling, meeting rooms, or overlapping time spans = Interval Greedy / Sweep-line."
    },
    {
        "id": "drill-10",
        "title": "Autofill Search Prefix Suggestion",
        "snippet": "Design a search suggestion system that rapidly checks if any catalog product begins with a typed prefix string of length L, and returns up to 3 lexicographical matches.",
        "constraints": "words.length <= 2 * 10^4, total characters <= 2 * 10^5, prefix length <= 1000",
        "options": ["Trie (Prefix Tree)", "Segment Tree", "Monotonic Deque", "Topological Sort"],
        "correctIndex": 0,
        "explanation": "Trie stores characters along tree paths sharing common prefixes. Looking up a prefix of length L takes O(L) time regardless of the total number of words in the vocabulary.",
        "hint": "String prefix lookups, autocomplete, or startsWith queries = Trie."
    },
    {
        "id": "drill-11",
        "title": "Circular Buffer Sliding Maximum",
        "snippet": "You are given an integer array and a sliding window of fixed size K moving from left to right. Return the maximum value inside the window at each position in O(N) total time.",
        "constraints": "nums.length <= 10^5, 1 <= K <= nums.length",
        "options": ["Monotonic Deque", "Bubble Sort", "Binary Search Tree", "Backtracking"],
        "correctIndex": 0,
        "explanation": "A Monotonic Deque maintains indices of elements in non-increasing order. Elements that fall outside the window or are smaller than the incoming element are evicted, keeping the maximum always at the front in O(1) amortized time.",
        "hint": "Sliding window maximum or minimum in linear time = Monotonic Deque."
    },
    {
        "id": "drill-12",
        "title": "Memory Leak Single Unique Identifier",
        "snippet": "Every memory allocation block has an integer ID that appears twice, except for one orphan block that appears exactly once. Find this single ID in O(N) time and O(1) extra space.",
        "constraints": "nums.length <= 10^5, every element appears twice except one",
        "options": ["Bitwise XOR Manipulation", "Hash Set Lookup", "Sorting", "Counting Sort"],
        "correctIndex": 0,
        "explanation": "XOR of any number with itself is 0 (`A ^ A = 0`) and XOR with 0 is the number itself (`A ^ 0 = A`). XORing all numbers cancels duplicate pairs and leaves the solitary element in O(N) time and O(1) space.",
        "hint": "Pairs cancel out, find odd-one-out with O(1) space = Bitwise XOR."
    },
    {
        "id": "drill-13",
        "title": "Robotic Grid Shortest Escape Route",
        "snippet": "In an M x N grid containing obstacles (1s) and empty cells (0s), find the shortest number of steps from top-left (0,0) to bottom-right (M-1, N-1).",
        "constraints": "M, N <= 100, moves are 4-directional",
        "options": ["Breadth First Search (BFS)", "Depth First Search (DFS)", "Bitmask DP", "Quickselect"],
        "correctIndex": 0,
        "explanation": "For unweighted graphs or grids, Breadth First Search (BFS) explores uniformly level-by-level, guaranteeing that the first time the destination is reached, the shortest path distance is found.",
        "hint": "Shortest path in unweighted grid or minimum steps = BFS."
    },
    {
        "id": "drill-14",
        "title": "All Permutations of Assembly Components",
        "snippet": "Given a collection of distinct component IDs, generate all possible ordering configurations for assembling the final device.",
        "constraints": "nums.length <= 10, all elements distinct",
        "options": ["Backtracking / Recursion", "Sliding Window", "Monotonic Stack", "Dijkstra's Algorithm"],
        "correctIndex": 0,
        "explanation": "Generating all permutations or exhaustive combinatorial configurations requires exploring a state-space tree of size N!. Backtracking systematically builds candidate paths and backtracks when complete.",
        "hint": "Generate all permutations, combinations, or valid subsets = Backtracking."
    },
    {
        "id": "drill-15",
        "title": "Fast Dynamic Range Query with Point Updates",
        "snippet": "Maintain an array of size N where you must frequently perform two operations: update an element at index i, and calculate the sum of elements between indices [L, R] in O(log N) time.",
        "constraints": "N <= 10^5, number of queries <= 10^5",
        "options": ["Segment Tree / Fenwick Tree", "Prefix Sum Array", "Two Pointers", "Hash Map"],
        "correctIndex": 0,
        "explanation": "A static prefix sum array handles range sum queries in O(1), but updating takes O(N). A Segment Tree or Fenwick (Binary Indexed) Tree balances both point updates and range queries in O(log N) time.",
        "hint": "Point updates + range sum queries in O(log N) = Segment Tree or Fenwick Tree."
    },
    {
        "id": "drill-16",
        "title": "Linked List Memory Loop Auditor",
        "snippet": "Given the head of a singly linked list, determine if the list contains a reference cycle without modifying node values and using strictly O(1) auxiliary memory.",
        "constraints": "Number of nodes <= 10^5, space must be O(1)",
        "options": ["Floyd's Fast & Slow Pointers", "Hash Set of Visited Nodes", "Recursion", "Binary Search"],
        "correctIndex": 0,
        "explanation": "Floyd's Tortoise and Hare algorithm runs two pointers at speeds 1 and 2. If a cycle exists, the fast pointer will eventually lap and meet the slow pointer in O(N) time and O(1) space.",
        "hint": "Detect cycle in linked list with O(1) space = Fast & Slow Pointers (Tortoise & Hare)."
    },
    {
        "id": "drill-17",
        "title": "Verify Binary Search Tree Invariant",
        "snippet": "Given the root of a binary tree, determine whether every node's value is strictly greater than all values in its left subtree and strictly less than all values in its right subtree.",
        "constraints": "Nodes <= 10^4, node values fit in 32-bit signed integer",
        "options": ["In-Order DFS Traversal (or Range Bounds)", "Level-Order BFS", "Post-Order Monotonic Stack", "Kruskal's Algorithm"],
        "correctIndex": 0,
        "explanation": "An in-order traversal of a valid Binary Search Tree visits values in strictly monotonically increasing order. Alternatively, DFS validating that each node falls strictly within valid (minVal, maxVal) bounds verifies this in O(N) time.",
        "hint": "BST validity check = In-Order DFS is strictly increasing."
    },
    {
        "id": "drill-18",
        "title": "Island Perimeter and Cluster Counter",
        "snippet": "An M x N binary matrix represents an aerial map of land (1) and ocean (0). Count the number of disconnected islands formed by horizontally or vertically adjacent land cells.",
        "constraints": "M, N <= 300",
        "options": ["Connected Components via DFS / BFS", "Two Pointers", "Monotonic Stack", "Trie"],
        "correctIndex": 0,
        "explanation": "Each island is a connected component in a 4-directional grid graph. Iterating over the grid and launching a DFS/BFS whenever an unvisited '1' is encountered sinks or marks the island in O(M * N) time.",
        "hint": "Connected components or island counting in grid = DFS / BFS traversal."
    },
    {
        "id": "drill-19",
        "title": "Group Scrambled Anagram Strings",
        "snippet": "Given an array of strings, group all words that are anagrams of each other into separate buckets.",
        "constraints": "strs.length <= 10^4, strs[i].length <= 100",
        "options": ["Hash Map with Sorted Key / Character Frequency Tuple", "Sliding Window", "Monotonic Deque", "Topological Sort"],
        "correctIndex": 0,
        "explanation": "Two strings are anagrams if and only if their sorted forms (or character frequency count tuples) are identical. Using this canonical form as a Hash Map key groups anagrams in O(N * L log L) time.",
        "hint": "Group words by shared anagram property = Hash Map with sorted canonical key."
    },
    {
        "id": "drill-20",
        "title": "Optimal Substring Without Repeating Glyphs",
        "snippet": "Find the length of the longest continuous substring in a given string that does not contain any duplicate characters.",
        "constraints": "s.length <= 10^5, s consists of English letters, digits, symbols and spaces",
        "options": ["Variable-Size Sliding Window + Hash Map / Set", "Monotonic Stack", "Dynamic Programming with Bitmask", "Divide and Conquer"],
        "correctIndex": 0,
        "explanation": "Expand the right pointer while tracking the last seen index of each character. When a duplicate is seen within the current window, contract or jump the left pointer forward past the duplicate.",
        "hint": "Longest substring without duplicates = Variable-size Sliding Window with index map."
    },
    {
        "id": "drill-21",
        "title": "Contiguous Subarray with Maximum Product",
        "snippet": "Given an integer array that may contain positive numbers, zeros, and negative numbers, find the contiguous subarray that has the largest product.",
        "constraints": "nums.length <= 2 * 10^4, -10 <= nums[i] <= 10",
        "options": ["Dynamic Programming (Tracking Min and Max Product)", "Two Pointers", "Greedy Max Selection", "Segment Tree"],
        "correctIndex": 0,
        "explanation": "Because multiplying by a negative number can turn a very small minimum into a large maximum, Kadane's algorithm must be adapted to track both the current maximum product and current minimum product at each step.",
        "hint": "Maximum product with negative numbers = DP tracking both local min and local max."
    },
    {
        "id": "drill-22",
        "title": "Longest Increasing Chain of Metrics",
        "snippet": "Given an integer array, find the length of the longest strictly increasing subsequence (not necessarily contiguous).",
        "constraints": "nums.length <= 2500 for O(N^2) or up to 10^5 for O(N log N)",
        "options": ["Dynamic Programming with Binary Search (Patience Sorting)", "Two Pointers", "Sliding Window", "Monotonic Deque"],
        "correctIndex": 0,
        "explanation": "Subsequences do not have to be contiguous, rendering sliding window inapplicable. Longest Increasing Subsequence is solved using DP in O(N^2) or Patience Sorting with Binary Search (std::lower_bound) in O(N log N).",
        "hint": "Non-contiguous longest increasing subsequence = LIS DP / Patience Sorting."
    },
    {
        "id": "drill-23",
        "title": "Social Network Friend Circles Merger",
        "snippet": "Given N individuals and a series of dynamic friendship declarations `(u, v)`, support fast queries to determine whether two people are directly or transitively connected.",
        "constraints": "N <= 10^5, number of friendship declarations <= 2 * 10^5",
        "options": ["Disjoint Set Union (Union-Find with Path Compression)", "Monotonic Stack", "Trie", "Kadane's Algorithm"],
        "correctIndex": 0,
        "explanation": "Dynamic connectivity queries and merging connected components are the core purpose of Disjoint Set Union (DSU). With path compression and union-by-rank, each operation runs in nearly O(1) amortized time (alpha(N)).",
        "hint": "Dynamic connectivity, grouping disjoint sets, or cycle detection in undirected graph = Union-Find (DSU)."
    },
    {
        "id": "drill-24",
        "title": "Lowest Latency Network Routing",
        "snippet": "A server network has N nodes and directed cables with positive latency weights. Find the minimum time it takes for a signal sent from node K to reach all other nodes.",
        "constraints": "N <= 100, cables.length <= 6000, all edge weights > 0",
        "options": ["Dijkstra's Algorithm with Min-Priority Queue", "Breadth First Search", "Topological Sort", "Two Pointers"],
        "correctIndex": 0,
        "explanation": "Weighted directed graphs with non-negative edge costs require Dijkstra's algorithm. A Min-Heap greedily settles the shortest distance to each unvisited node in O((V + E) log V) time.",
        "hint": "Shortest path with positive weights = Dijkstra's algorithm with priority queue."
    },
    {
        "id": "drill-25",
        "title": "Minimum Operations to Connect Sticks",
        "snippet": "You have sticks of varying lengths. You can connect any two sticks of lengths X and Y at a cost of X + Y. Find the minimum total cost to connect all sticks into one.",
        "constraints": "sticks.length <= 10^4, sticks[i] <= 10^4",
        "options": ["Greedy with Min-Heap (Huffman Coding principle)", "Dynamic Programming", "Sliding Window", "Binary Search"],
        "correctIndex": 0,
        "explanation": "To minimize total cost, elements that are combined earliest contribute to more additions down the line. Greedily picking the two smallest sticks at each step using a Min-Heap minimizes total cost (identical to Huffman coding).",
        "hint": "Repeatedly combine two smallest elements = Min-Heap Greedy."
    },
    {
        "id": "drill-26",
        "title": "Check Syntactic Bracket Balance",
        "snippet": "Given a code string containing `(`, `)`, `{`, `}`, `[`, and `]`, verify whether all opening brackets are closed by the same type of brackets in the correct order.",
        "constraints": "s.length <= 10^5",
        "options": ["Stack (Last-In-First-Out)", "Queue (First-In-First-Out)", "Prefix Sum", "Two Pointers"],
        "correctIndex": 0,
        "explanation": "Bracket matching is inherently nested: the most recently opened bracket must be the first one closed. A LIFO Stack stores opening brackets and checks if top matches each incoming closing bracket.",
        "hint": "Nested delimiters, parentheses, or expression matching = Stack (LIFO)."
    },
    {
        "id": "drill-27",
        "title": "Evaluate Arithmetic in Reverse Polish Notation",
        "snippet": "Compute the numerical value of an arithmetic expression given in postfix notation tokens: `['2', '1', '+', '3', '*']`.",
        "constraints": "tokens.length <= 10^4, operators in {+, -, *, /}",
        "options": ["Stack Expression Evaluation", "Two Pointers", "Sliding Window", "Binary Search"],
        "correctIndex": 0,
        "explanation": "In Reverse Polish Notation, operands precede operators. Pushing numbers onto a stack and popping the two most recent operands when an operator is encountered evaluates the expression in linear time.",
        "hint": "Postfix / RPN evaluation = Stack."
    },
    {
        "id": "drill-28",
        "title": "Sort Colors with In-Place Linear Time",
        "snippet": "Given an array with N objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, in order 0, 1, 2.",
        "constraints": "nums.length <= 300, nums[i] in {0, 1, 2}, must be O(1) space and one pass",
        "options": ["Dutch National Flag (Three-Way Partition)", "Merge Sort", "Sliding Window", "Segment Tree"],
        "correctIndex": 0,
        "explanation": "Dijkstra's Dutch National Flag algorithm uses three pointers (low, mid, high) to partition the array into 0s on the left, 1s in the center, and 2s on the right in a single pass with O(1) space.",
        "hint": "Three-way partition in-place in one pass = Dutch National Flag."
    },
    {
        "id": "drill-29",
        "title": "Find Kth Largest Element Quickly",
        "snippet": "Find the K-th largest element in an unsorted array without fully sorting the entire array in O(N log N) time.",
        "constraints": "nums.length <= 10^5, average time must be O(N)",
        "options": ["Quickselect (Hoare's Selection) / Min-Heap", "Bubble Sort", "Two Pointers on unsorted array", "Sliding Window"],
        "correctIndex": 0,
        "explanation": "Quickselect partitions the array around a pivot like Quicksort, but only recurses into the side containing the K-th index, yielding an average time complexity of O(N) instead of O(N log N).",
        "hint": "Kth largest element in average linear time = Quickselect (or Min-Heap)."
    },
    {
        "id": "drill-30",
        "title": "Maximum Bitwise XOR Pair",
        "snippet": "Given an array of integers, find the maximum XOR result of any two numbers in the array in O(N) time.",
        "constraints": "nums.length <= 2 * 10^5, 0 <= nums[i] <= 2^31 - 1",
        "options": ["Bitwise Trie (Prefix Tree on Binary Bits)", "Kadane's Algorithm", "Monotonic Stack", "Topological Sort"],
        "correctIndex": 0,
        "explanation": "Store the binary representation (31 bits) of all numbers in a 0/1 Bitwise Trie. For each number, greedily traverse the opposite bit whenever available to maximize the resulting XOR in O(32 * N) = O(N) time.",
        "hint": "Maximum XOR of two numbers in linear time = Bitwise Trie."
    },
    {
        "id": "drill-31",
        "title": "Minimum Jump Distance to Reach Destination",
        "snippet": "You are given an integer array where each element represents your maximum jump length at that position. Return the minimum number of jumps to reach the last index.",
        "constraints": "nums.length <= 10^4, nums[i] >= 0, reachable",
        "options": ["Greedy BFS / Range Farthest Extension", "Monotonic Deque", "Binary Search", "Bitmask"],
        "correctIndex": 0,
        "explanation": "At each level, greedily track the farthest reachable index (`farthest = max(farthest, i + nums[i])`). When the current jump boundary is reached, increment the jump count and set the boundary to the farthest reachable index.",
        "hint": "Minimum jumps in Jump Game II = Greedy Range Extension (BFS-like levels)."
    },
    {
        "id": "drill-32",
        "title": "Find the Duplicate Number with Constraints",
        "snippet": "Given an array of N + 1 integers where each integer is between 1 and N inclusive. Exactly one number is repeated. Find the duplicate in O(1) extra space without modifying the array.",
        "constraints": "nums.length <= 10^5, nums[i] in [1, N], do not modify array, O(1) space",
        "options": ["Floyd's Cycle Finding (Array as Linked List)", "Hash Set", "Counting Sort", "Sliding Window"],
        "correctIndex": 0,
        "explanation": "Treat the array as a functional linked list where `index -> nums[index]`. Because values are in [1, N] and length is N + 1, a cycle must exist, and the entrance to the cycle is precisely the duplicate value. Floyd's Tortoise and Hare solves it in O(N) time and O(1) space.",
        "hint": "Find duplicate without modifying array and O(1) space = Floyd's Cycle Detection."
    }
]

if __name__ == '__main__':
    print(f"Arena drills count: {len(arena_drills)}")
