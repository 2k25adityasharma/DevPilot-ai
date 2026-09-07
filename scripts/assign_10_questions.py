# -*- coding: utf-8 -*-
"""
Curates exactly 5 Easy, 3 Medium, 2 Hard questions for all 29 patterns.
"""
import json
import os
import re

# Additional authentic questions to ensure every pattern has plenty of E/M/H
EXTRA_QUESTIONS = [
    # array-kadanes-subarray (needs Easy)
    (643, "Maximum Average Subarray I", "Easy", "array", "Array", "array-kadanes-subarray", "Kadane's / Subarray", "Sliding Average", ["contiguous subarray of length k with maximum average", "sliding window of size k", "track max running sum"]),
    (1752, "Check if Array Is Sorted and Rotated", "Easy", "array", "Array", "array-kadanes-subarray", "Kadane's / Subarray", "Rotated Inversion Count", ["array was originally sorted non-decreasingly then rotated", "count inversions where nums[i] > nums[(i+1)%n]", "inversion count <= 1"]),
    
    # string-sliding-window (needs Easy)
    (1876, "Substrings of Size Three with Distinct Characters", "Easy", "string", "String", "string-sliding-window", "Sliding Window", "Fixed Window 3", ["distinct characters in window of 3", "fixed size sliding window", "unique chars count"]),
    (2269, "Find the K-Beauty of a Number", "Easy", "string", "String", "string-sliding-window", "Sliding Window", "Substrings of Number", ["k-length substring of number", "rolling window on number string", "divisibility check"]),
    
    # string-two-pointers (needs Hard)
    (214, "Shortest Palindrome", "Hard", "string", "String", "string-two-pointers", "Two Pointers", "Palindrome Prefix", ["add characters in front of string to make palindrome", "two pointers or KMP LPS on s + '#' + rev_s", "find longest palindromic prefix"]),
    
    # hashmap-frequency (needs Hard)
    (432, "All O`one Data Structure", "Hard", "hash-map", "Hash Map", "hashmap-frequency", "Frequency Based", "Map + Doubly Linked List", ["getMaxKey and getMinKey in O(1)", "frequency bucket doubly linked list", "hash map key to bucket"]),
    (895, "Maximum Frequency Stack", "Hard", "hash-map", "Hash Map", "hashmap-frequency", "Frequency Based", "Frequency to Stack Map", ["push and pop most frequent element", "frequency to stack mapping", "track max frequency"]),
    
    # hashmap-grouping (needs Easy)
    (1002, "Find Common Characters", "Easy", "hash-map", "Hash Map", "hashmap-grouping", "Grouping & Index Mapping", "Char Intersection", ["characters present in all strings", "frequency map min counts", "common character grouping"]),
    
    # stack-monotonic (needs Easy)
    (1598, "Crawler Log Folder", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Folder Depth", ["operations to return to main folder", "stack size tracking depth", "pop for ../"]),
    (1021, "Remove Outermost Parentheses", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Depth Balance", ["valid parentheses primitive decomposition", "depth counter / stack", "skip outermost brackets"]),
    (1614, "Maximum Nesting Depth of the Parentheses", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Max Depth", ["maximum nesting depth of VPS", "running counter / stack depth", "track peak open count"]),
    
    # ll-pointer-techniques (needs Hard)
    (25, "Reverse Nodes in k-Group", "Hard", "ll", "Linked List", "ll-pointer-techniques", "Pointer Techniques & Cycle Detection", "K-Group Reversal", ["reverse nodes in blocks of size k", "pointer traversal measuring group length", "in-place pointer reversal"]),
    (23, "Merge k Sorted Lists", "Hard", "ll", "Linked List", "ll-pointer-techniques", "Pointer Techniques & Cycle Detection", "Merge K Lists", ["merge k sorted linked lists into one", "min-heap or divide-and-conquer merge", "pointer manipulation"]),
    
    # ll-reversal-merge (needs Easy)
    (83, "Remove Duplicates from Sorted List", "Easy", "ll", "Linked List", "ll-reversal-merge", "Reversal & Merge Lists", "Pointer Skip", ["delete duplicates from sorted linked list", "curr.next = curr.next.next when duplicate", "single pointer traversal"]),
    
    # trees-bst (needs Hard)
    (1373, "Maximum Sum BST in Binary Tree", "Hard", "trees", "Trees", "trees-bst", "Binary Search Trees (BST)", "Post-Order BST Validation", ["maximum sum of all keys of any sub-tree which is also BST", "post-order traversal returning (isBST, min, max, sum)", "track global max sum"]),
    
    # recursion-backtracking (needs Easy)
    (257, "Binary Tree Paths", "Easy", "recursion-backtracking", "Recursion & Backtracking", "recursion-backtracking", "Backtracking & Exploration", "Root-to-Leaf DFS", ["all root-to-leaf paths", "backtracking DFS building path string", "push and pop path nodes"]),
    (872, "Leaf-Similar Trees", "Easy", "recursion-backtracking", "Recursion & Backtracking", "recursion-backtracking", "Backtracking & Exploration", "Leaf Traversal", ["two trees have same leaf value sequence", "DFS recursive leaf collection", "compare leaf lists"]),
    (104, "Maximum Depth of Binary Tree", "Easy", "recursion-backtracking", "Recursion & Backtracking", "recursion-backtracking", "Backtracking & Exploration", "Tree Depth DFS", ["maximum depth of binary tree", "recursive DFS return 1 + max(left, right)", "base case root is null"]),
    
    # graphs-dsu-shortest-path (needs Easy)
    (1791, "Find Center of Star Graph", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Star Center Node", ["star graph center connected to all other nodes", "common node in edges[0] and edges[1]", "O(1) lookup"]),
    (1971, "Find if Path Exists in Graph", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "DSU Connectivity", ["valid path between source and destination", "Union-Find (DSU) or BFS traversal", "connected component check"]),
    (997, "Find the Town Judge", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "In/Out Degree", ["town judge trusted by everyone, trusts nobody", "in-degree == n-1 and out-degree == 0", "count degrees array"]),
    (463, "Island Perimeter", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Grid Graph", ["perimeter of island in grid", "check 4 neighboring cells", "add 1 for water/boundary"]),
    (733, "Flood Fill", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Connected Component DFS", ["flood fill from starting pixel (sr, sc)", "DFS or BFS connected component color change", "grid graph traversal"]),
    
    # trie-prefix-bitwise (needs Easy)
    (2185, "Counting Words With a Given Prefix", "Easy", "trie", "Trie", "trie-prefix-bitwise", "Prefix Trees & Bitwise Tries", "Prefix Count", ["number of strings in words that contain pref as prefix", "string prefix check / Trie traversal", "startsWith"]),
    (3042, "Count Prefix and Suffix Pairs I", "Easy", "trie", "Trie", "trie-prefix-bitwise", "Prefix Trees & Bitwise Tries", "Prefix and Suffix", ["check isPrefixAndSuffix(str1, str2)", "prefix matching", "string index check"]),
    (2000, "Reverse Prefix of Word", "Easy", "trie", "Trie", "trie-prefix-bitwise", "Prefix Trees & Bitwise Tries", "Prefix Search", ["reverse the segment of word from index 0 to first occurrence of ch", "find index of char then reverse prefix", "prefix manipulation"]),
    
    # dp-knapsack-sequences (needs Easy)
    (746, "Min Cost Climbing Stairs", "Easy", "dp", "Dynamic Programming", "dp-knapsack-sequences", "0/1 Knapsack & Classic Sequences", "Min Cost DP", ["minimum cost to reach the top of the floor", "dp[i] = cost[i] + min(dp[i-1], dp[i-2])", "optimal choice"]),
    (70, "Climbing Stairs", "Easy", "dp", "Dynamic Programming", "dp-knapsack-sequences", "0/1 Knapsack & Classic Sequences", "Fibonacci Transitions", ["distinct ways to climb to top taking 1 or 2 steps", "dp[i] = dp[i-1] + dp[i-2]", "state transition"]),
    (118, "Pascal's Triangle", "Easy", "dp", "Dynamic Programming", "dp-knapsack-sequences", "0/1 Knapsack & Classic Sequences", "Row Subproblems", ["generate first numRows of Pascal's triangle", "row[j] = prev[j-1] + prev[j]", "tabular DP construction"]),
    (392, "Is Subsequence", "Easy", "dp", "Dynamic Programming", "dp-knapsack-sequences", "0/1 Knapsack & Classic Sequences", "Subsequence Matching", ["check if s is subsequence of t", "two pointers or 2D DP LCS table", "greedy subsequence match"]),
    (509, "Fibonacci Number", "Easy", "dp", "Dynamic Programming", "dp-knapsack-sequences", "0/1 Knapsack & Classic Sequences", "Overlapping Subproblems", ["calculate F(n)", "memoization / bottom-up state array", "overlapping subproblem base"]),
    
    # bit-core-masking (needs Hard)
    (982, "Triples with Bitwise AND Equal To Zero", "Hard", "bit-manipulation", "Bit Manipulation", "bit-core-masking", "Bit Manipulation", "Bitwise AND Triples", ["find triples (i,j,k) with nums[i] & nums[j] & nums[k] == 0", "precompute pair AND frequencies", "iterate third number with submask check"]),
    
    # range-trees (needs Easy)
    (1413, "Minimum Value to Get Positive Step by Step Sum", "Easy", "range-queries", "Range Queries & Advanced Data Structures", "range-trees", "Range Trees & Dynamic Aggregation", "Running Sum Query", ["startValue + step by step sum never less than 1", "prefix sum tracking minimum cumulative sum", "min prefix sum"]),
    (1588, "Sum of All Odd Length Subarrays", "Easy", "range-queries", "Range Queries & Advanced Data Structures", "range-trees", "Range Trees & Dynamic Aggregation", "Odd Length Subarrays", ["sum of all possible odd-length subarrays", "prefix sum range query or frequency calculation", "cumulative range query"]),
    (724, "Find Pivot Index", "Easy", "range-queries", "Range Queries & Advanced Data Structures", "range-trees", "Range Trees & Dynamic Aggregation", "Prefix Balance", ["left sum equals right sum", "totalSum - leftSum - nums[i] == leftSum", "prefix sum array"]),
    (1991, "Find the Middle Index in Array", "Easy", "range-queries", "Range Queries & Advanced Data Structures", "range-trees", "Range Trees & Dynamic Aggregation", "Middle Index Balance", ["left sum equals right sum", "prefix sum comparison", "range query balance"])
]

print(f"Loaded {len(EXTRA_QUESTIONS)} extra questions.")
