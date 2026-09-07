# -*- coding: utf-8 -*-
"""
Script to curate exactly 5 Easy, 3 Medium, 2 Hard questions for each of the 29 patterns.
Generates clean mapping and verifies coverage.
"""
import json
import re

# Additional authentic questions to add to dataset if not present
EXTRA_AUTHENTIC_QUESTIONS = [
    # LC 1876
    (1876, "Substrings of Size Three with Distinct Characters", "Easy", "string", "String", "string-sliding-window", "Sliding Window", "Fixed Window 3", ["distinct characters in window of 3", "fixed size sliding window", "unique chars count"]),
    # LC 2269
    (2269, "Find the K-Beauty of a Number", "Easy", "string", "String", "string-sliding-window", "Sliding Window", "Substrings of Number", ["k-length substring of number", "rolling window on number string", "divisibility check"]),
    # LC 432
    (432, "All O`one Data Structure", "Hard", "hash-map", "Hash Map", "hashmap-frequency", "Frequency Based", "Map + Doubly Linked List", ["getMaxKey and getMinKey in O(1)", "frequency bucket doubly linked list", "hash map key to bucket"]),
    # LC 895
    (895, "Maximum Frequency Stack", "Hard", "hash-map", "Hash Map", "hashmap-frequency", "Frequency Based", "Frequency to Stack Map", ["push and pop most frequent element", "frequency to stack mapping", "track max frequency"]),
    # LC 1002
    (1002, "Find Common Characters", "Easy", "hash-map", "Hash Map", "hashmap-grouping", "Grouping & Index Mapping", "Char Intersection", ["characters present in all strings", "frequency map min counts", "common character grouping"]),
    # LC 1598
    (1598, "Crawler Log Folder", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Folder Depth", ["operations to return to main folder", "stack size tracking depth", "pop for ../"]),
    # LC 1021
    (1021, "Remove Outermost Parentheses", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Depth Balance", ["valid parentheses primitive decomposition", "depth counter / stack", "skip outermost brackets"]),
    # LC 1614
    (1614, "Maximum Nesting Depth of the Parentheses", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Max Depth", ["maximum nesting depth of VPS", "running counter / stack depth", "track peak open count"]),
    # LC 1373
    (1373, "Maximum Sum BST in Binary Tree", "Hard", "trees", "Trees", "trees-bst", "Binary Search Trees (BST)", "Post-Order BST Validation", ["maximum sum of all keys of any sub-tree which is also BST", "post-order traversal returning (isBST, min, max, sum)", "track global max sum"]),
    # LC 1791
    (1791, "Find Center of Star Graph", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Star Center Node", ["star graph center connected to all other nodes", "common node in edges[0] and edges[1]", "O(1) lookup"]),
    # LC 3042
    (3042, "Count Prefix and Suffix Pairs I", "Easy", "trie", "Trie", "trie-prefix-bitwise", "Prefix Trees & Bitwise Tries", "Prefix and Suffix", ["check isPrefixAndSuffix(str1, str2)", "prefix matching", "string index check"]),
    # LC 982
    (982, "Triples with Bitwise AND Equal To Zero", "Hard", "bit-manipulation", "Bit Manipulation", "bit-core-masking", "Bit Manipulation", "Bitwise AND Triples", ["find triples (i,j,k) with nums[i] & nums[j] & nums[k] == 0", "precompute pair AND frequencies", "iterate third number with submask check"])
]

print(f"Loaded {len(EXTRA_AUTHENTIC_QUESTIONS)} extra authentic candidates.")
