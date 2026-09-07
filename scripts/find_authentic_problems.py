# -*- coding: utf-8 -*-
import json
import re

with open('js/data/dsaPatternsData.js', 'r', encoding='utf-8') as f:
    content = f.read()

existing_nums = set(int(x) for x in re.findall(r'"leetcodeNumber":\s*(\d+)', content))
print(f"Total existing questions: {len(existing_nums)}")

# Check candidate problems by pattern
candidates = {
    # 1. array-kadanes-subarray: needs 1 Easy
    'array-kadanes-subarray': [
        (1800, "Maximum Ascending Subarray Sum", "Easy", "array", "Array", "array-kadanes-subarray", "Kadane's / Subarray", "Ascending Subarray Sum", ["maximum sum of contiguous strictly increasing subarray", "reset sum when nums[i] <= nums[i-1]", "track max running sum"])
    ],
    # 2. string-sliding-window: needs 2 Easy
    'string-sliding-window': [
        (1876, "Substrings of Size Three with Distinct Characters", "Easy", "string", "String", "string-sliding-window", "Sliding Window", "Fixed Window 3", ["good substring of length 3 with distinct chars", "sliding window of size 3", "check uniqueness in window"]),
        (2379, "Minimum Recolors to Get K Consecutive Black Blocks", "Easy", "string", "String", "string-sliding-window", "Sliding Window", "Recoloring Window", ["minimum operations to get k consecutive black blocks", "sliding window of size k counting white blocks", "track minimum white blocks in window"])
    ],
    # 3. string-two-pointers: needs 1 Hard
    'string-two-pointers': [
        (214, "Shortest Palindrome", "Hard", "string", "String", "string-two-pointers", "Two Pointers", "Palindrome Prefix", ["add characters in front of string to make palindrome", "two pointers or KMP LPS on s + '#' + rev_s", "find longest palindromic prefix"])
    ],
    # 4. hashmap-frequency: needs 2 Hard
    'hashmap-frequency': [
        (432, "All O`one Data Structure", "Hard", "hash-map", "Hash Map", "hashmap-frequency", "Frequency Based", "Map + Doubly Linked List", ["inc, dec, getMaxKey, getMinKey in O(1)", "hash map of keys to doubly linked list buckets", "frequency list"]),
        (895, "Maximum Frequency Stack", "Hard", "hash-map", "Hash Map", "hashmap-frequency", "Frequency Based", "Frequency to Stack Map", ["pop the most frequent element", "hash map of frequency to stack", "track max frequency"])
    ],
    # 5. hashmap-grouping: needs 1 Easy
    'hashmap-grouping': [
        (1160, "Find Words That Can Be Formed by Characters", "Easy", "hash-map", "Hash Map", "hashmap-grouping", "Grouping & Index Mapping", "Char Subset Count", ["words formed by characters from string", "frequency count character grouping", "check count subset"])
    ],
    # 6. stack-monotonic: needs 1 Easy
    'stack-monotonic': [
        (1598, "Crawler Log Folder", "Easy", "stack", "Stack", "stack-monotonic", "Monotonic Stack", "Folder Depth Stack", ["minimum operations to return to main folder", "stack tracking directory depth", "ignore './', pop for '../'"])
    ],
    # 7. ll-pointer-techniques: needs 2 Hard
    'll-pointer-techniques': [
        (138, "Copy List with Random Pointer", "Medium", "ll", "Linked List", "ll-pointer-techniques", "Pointer Techniques & Cycle Detection", "Interwoven Nodes", ["deep copy list with random pointer", "interweave copied nodes then separate in O(1) space", "two pointers pass"]),
        (432, "All O`one Data Structure", "Hard", "ll", "Linked List", "ll-pointer-techniques", "Pointer Techniques & Cycle Detection", "Pointer List", ["dummy head and tail node pointers", "O(1) insertion and deletion", "bidirectional pointer manipulation"]),
        (25, "Reverse Nodes in k-Group", "Hard", "ll", "Linked List", "ll-pointer-techniques", "Pointer Techniques & Cycle Detection", "K-Group Reversal", ["reverse nodes in blocks of size k", "pointer traversal measuring group length", "in-place pointer reversal"])
    ],
    # 8. ll-reversal-merge: needs 1 Easy
    'll-reversal-merge': [
        (1290, "Convert Binary Number in a Linked List to Integer", "Easy", "ll", "Linked List", "ll-reversal-merge", "Reversal & Merge Lists", "Bit Shift Accumulate", ["linked list representing binary number", "pointer traversal bit shift (ans << 1) | val", "binary conversion"])
    ],
    # 9. trees-bst: needs 1 Hard
    'trees-bst': [
        (315, "Count of Smaller Numbers After Self", "Hard", "trees", "Trees", "trees-bst", "Binary Search Trees (BST)", "BST Insert Count", ["counts of smaller elements to the right", "BST insertion with subtree size or Fenwick Tree", "track left subtree counts"])
    ],
    # 10. recursion-backtracking: needs 3 Easy
    'recursion-backtracking': [
        (257, "Binary Tree Paths", "Easy", "recursion-backtracking", "Recursion & Backtracking", "recursion-backtracking", "Backtracking & Exploration", "Root-to-Leaf DFS", ["all root-to-leaf paths", "backtracking DFS building path string", "push and pop path nodes"]),
        (872, "Leaf-Similar Trees", "Easy", "recursion-backtracking", "Recursion & Backtracking", "recursion-backtracking", "Backtracking & Exploration", "Leaf Traversal", ["two trees have same leaf value sequence", "DFS recursive leaf collection", "compare leaf lists"]),
        (501, "Find Mode in Binary Search Tree", "Easy", "recursion-backtracking", "Recursion & Backtracking", "recursion-backtracking", "Backtracking & Exploration", "In-Order State", ["most frequently occurred elements in BST", "in-order recursive DFS tracking streak", "two pass O(1) space"])
    ],
    # 11. graphs-dsu-shortest-path: needs 5 Easy
    'graphs-dsu-shortest-path': [
        (1791, "Find Center of Star Graph", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Edge Intersection", ["star graph where center connected to all", "node appearing in first two edges", "O(1) graph check"]),
        (1971, "Find if Path Exists in Graph", "Easy", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "DSU Connectivity", ["valid path between source and destination", "Union-Find (DSU) or BFS traversal", "connected component check"]),
        (133, "Clone Graph", "Medium", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Graph Copy", ["deep copy connected undirected graph", "DFS or BFS with hash map", "clone nodes and edges"]),
        (1042, "Flower Planting With No Adjacent", "Medium", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Greedy Coloring", ["4 garden colors with no adjacent matching", "degree <= 3 guarantees 4 colors sufficient", "greedy graph coloring"]),
        (1557, "Minimum Number of Vertices to Reach All Nodes", "Medium", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "Zero In-Degree", ["vertices that can reach all nodes in DAG", "all nodes with in-degree 0 must be included", "count in-degrees"]),
        (886, "Possible Bipartition", "Medium", "graphs", "Graphs", "graphs-dsu-shortest-path", "Shortest Path & Union-Find (DSU)", "DSU 2-Coloring", ["split into 2 groups without conflict", "Union-Find with 2*n elements or BFS 2-coloring", "bipartite check"])
    ]
}

for pid, qlist in candidates.items():
    available = [q for q in qlist if q[0] not in existing_nums]
    already = [q for q in qlist if q[0] in existing_nums]
    print(f"{pid}: available={len(available)}, already in={len(already)}")
