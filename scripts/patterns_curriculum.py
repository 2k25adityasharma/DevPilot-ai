# -*- coding: utf-8 -*-
"""
DevPilot-AI — Comprehensive 28 Patterns Curriculum (12-Point Learning Framework)
Covers all 28 patterns across 16 major DSA categories:
What is it, When to use, Recognition signals, Core idea, Variations,
Complexity, Pitfalls, C++ template, Walkthrough trace, and Quizzes.
"""

def get_patterns_curriculum():
    patterns = [
        # 1. Array - Two Pointers
        {
            "id": "array-two-pointers",
            "name": "Two Pointers",
            "categoryId": "array",
            "categoryName": "Array",
            "icon": "data_array",
            "color": "#6366F1",
            "oneLiner": "Traversing sorted or partitioned arrays with two synchronized or converging pointers to avoid quadratic iterations.",
            "whatIsIt": "Two Pointers is a technique where two distinct index variables traverse a linear data structure simultaneously. By moving pointers based on mathematical comparisons (e.g., sum vs target) or partitioned state, it reduces O(N^2) brute-force searches down to O(N) linear scans without extra memory.",
            "whenToUse": "Use when the array is sorted (or can be sorted), when you need to find pairs or triplets meeting a target condition, when removing elements in-place, or when checking symmetry (palindromes). Key constraint clue: N <= 10^5 with O(1) auxiliary space required.",
            "recognitionSignals": [
                "Sorted array or sorted sequence given",
                "Find two numbers that sum/multiply to a target",
                "Remove elements or duplicates in-place (O(1) memory)",
                "Container with maximum area / trapped rainwater",
                "Partitioning elements around a pivot (Dutch National Flag)",
                "Reverse array or reverse words in-place"
            ],
            "coreIdea": "Imagine closing the jaws of a caliper. If the current value is too small, advance the left jaw to pick a larger value; if too large, move the right jaw to decrease. Because the data is monotonic, every move eliminates impossible candidates without backtracking.",
            "variations": [
                {"name": "Opposite Direction (Converging)", "desc": "One pointer starts at 0, the other at n-1, moving inward until they meet (e.g., Two Sum II, 3Sum, Container With Most Water)."},
                {"name": "Same Direction (Fast & Slow / Runner)", "desc": "Both pointers start at index 0; fast scans candidates while slow maintains the boundary of valid elements (e.g., Remove Duplicates, Move Zeroes)."},
                {"name": "Three-Way Partition", "desc": "Low, mid, high pointers dividing array into three distinct value zones in a single pass (e.g., Sort Colors)."}
            ],
            "complexity": {
                "time": "O(N)",
                "space": "O(1)",
                "note": "Each element is visited by at most one pointer once; no auxiliary data structures allocated."
            },
            "pitfalls": [
                "Forgetting that input array MUST be sorted for converging pointers to work.",
                "Using `while (left <= right)` when pointers must remain strictly distinct (`left < right`).",
                "Off-by-one errors when skipping duplicates in 3Sum/4Sum.",
                "Integer overflow during `nums[left] + nums[right]` check with extreme 32-bit values."
            ],
            "cppTemplate": """// Template: Converging Two Pointers (e.g., Pair Search in Sorted Array)
#include <vector>

std::vector<int> twoPointersSearch(std::vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left < right) {
        long long currentSum = static_cast<long long>(nums[left]) + nums[right];
        if (currentSum == target) {
            return {left + 1, right + 1}; // 1-based or 0-based result
        } else if (currentSum < target) {
            left++; // Need larger sum, shift left forward
        } else {
            right--; // Need smaller sum, shift right backward
        }
    }
    return {};
}""",
            "walkthrough": {
                "problem": "LC #11 - Container With Most Water: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
                "steps": [
                    {"step": 1, "state": "left=0 (h=1), right=7 (h=7), width=7", "action": "Area = 7 * min(1, 7) = 7. maxArea=7. Since h[left] < h[right], increment left."},
                    {"step": 2, "state": "left=1 (h=8), right=7 (h=7), width=6", "action": "Area = 6 * min(8, 7) = 42. maxArea=42. Since h[left] >= h[right], decrement right."},
                    {"step": 3, "state": "left=1 (h=8), right=6 (h=3), width=5", "action": "Area = 5 * min(8, 3) = 15. maxArea=42. Decrement right."},
                    {"step": 4, "state": "left=1 (h=8), right=5 (h=8), width=4", "action": "Area = 4 * min(8, 8) = 32. maxArea=42. Pointers continue converging."},
                    {"step": 5, "state": "left meets right", "action": "Global maximum capacity found: 49 achieved when considering left=1 (8) and right=7 (7) / optimal widths."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-arr-tp-1",
                    "scenario": "You are given a sorted integer array and an integer target. You must find two numbers that add up to target in O(N) time and strictly O(1) extra space.",
                    "options": ["Two Pointers (Converging)", "Hash Map complement lookup", "Binary Search on each element", "Dynamic Programming table"],
                    "correctIndex": 0,
                    "explanation": "Because the array is already sorted and O(1) space is strictly required, Converging Two Pointers achieves O(N) time and O(1) space. Hash Map would take O(N) space."
                },
                {
                    "id": "quiz-arr-tp-2",
                    "scenario": "An unsorted array contains zeros and non-zero integers. You need to push all zeros to the end in-place without copying the array.",
                    "options": ["Fast & Slow Two Pointers", "Merge Sort recursion", "Prefix Sum Array", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "Fast pointer scans for non-zero elements while the slow pointer tracks the placement position. Swapping or assigning at the slow pointer achieves O(N) time and O(1) space."
                }
            ]
        },

        # 2. Array - Sliding Window
        {
            "id": "array-sliding-window",
            "name": "Sliding Window",
            "categoryId": "array",
            "categoryName": "Array",
            "icon": "data_array",
            "color": "#6366F1",
            "oneLiner": "Expanding and contracting a contiguous subarray boundary to compute optimal subsegment metrics in O(N).",
            "whatIsIt": "Sliding Window maintains a contiguous subsegment [left, right] across an array or string. By expanding the right endpoint to include new elements and contracting the left endpoint when a constraint is broken, it maintains running metrics in O(1) per step rather than recomputing the entire window.",
            "whenToUse": "Use when the problem mentions contiguous subarrays/substrings, min/max length with a constraint (e.g. sum >= S, at most K distinct elements), or a fixed window size K. Crucial precondition: elements must allow monotonic window behavior (typically non-negative integers).",
            "recognitionSignals": [
                "Contiguous subarray or substring",
                "Longest / shortest subarray satisfying a threshold condition",
                "Fixed window size of K elements (e.g. maximum average)",
                "At most K distinct elements or at most K replacements allowed",
                "Non-negative numbers with cumulative target sum"
            ],
            "coreIdea": "Think of an expanding and contracting rubber band. Expand the right end to explore as much as possible until the condition is violated; then contract the left end until the condition becomes valid again. Every element enters and leaves the window at most once.",
            "variations": [
                {"name": "Fixed Window", "desc": "Window size is strictly K. Slide by adding nums[i] and subtracting nums[i - K] (e.g., Maximum Average Subarray I)."},
                {"name": "Dynamic Window (Longest)", "desc": "Expand right indefinitely; shrink left only when window becomes invalid (e.g., Max Consecutive Ones III)."},
                {"name": "Dynamic Window (Shortest)", "desc": "Expand right until window is valid; then aggressively shrink left while valid to find minimal length (e.g., Minimum Size Subarray Sum)."}
            ],
            "complexity": {
                "time": "O(N)",
                "space": "O(1) to O(K)",
                "note": "Each index enters and exits the window at most once, yielding amortized 2N operations."
            },
            "pitfalls": [
                "Applying sliding window to arrays with negative numbers (breaks monotonicity; use Prefix Sum + Hash Map instead).",
                "Updating answer at wrong point (e.g. before shrinking in shortest window problems).",
                "Off-by-one error when calculating window size: size is `(right - left + 1)`, not `(right - left)`."
            ],
            "cppTemplate": """// Template: Dynamic Sliding Window (Shortest Subarray with Sum >= target)
#include <vector>
#include <algorithm>

int minSubArrayLen(int target, std::vector<int>& nums) {
    int left = 0, currentSum = 0;
    int minLen = 1e9;

    for (int right = 0; right < nums.size(); ++right) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = std::min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen == 1e9 ? 0 : minLen;
}""",
            "walkthrough": {
                "problem": "LC #209 - Minimum Size Subarray Sum: target = 7, nums = [2, 3, 1, 2, 4, 3]",
                "steps": [
                    {"step": 1, "state": "right=0..3 [2,3,1,2]", "action": "Sum=8 >= 7. Update minLen=min(inf, 4)=4. Shrink left: remove 2 -> sum=6."},
                    {"step": 2, "state": "right=4 [3,1,2,4]", "action": "Sum=10 >= 7. Update minLen=min(4, 4)=4. Shrink left: remove 3 -> sum=7."},
                    {"step": 3, "state": "right=4 [1,2,4]", "action": "Sum=7 >= 7. Update minLen=min(4, 3)=3. Shrink left: remove 1 -> sum=6."},
                    {"step": 4, "state": "right=5 [2,4,3]", "action": "Sum=9 >= 7. Update minLen=min(3, 3)=3. Shrink left: remove 2 -> sum=7."},
                    {"step": 5, "state": "right=5 [4,3]", "action": "Sum=7 >= 7. Update minLen=min(3, 2)=2. Result is 2 (subarray [4, 3])."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-arr-sw-1",
                    "scenario": "Find the length of the longest subarray with at most K distinct elements in an array of positive integers.",
                    "options": ["Dynamic Sliding Window + Frequency Map", "Monotonic Stack", "Floyd's Cycle Detection", "Backtracking"],
                    "correctIndex": 0,
                    "explanation": "Contiguous subarray with an 'at most K' constraint on positive elements is the classic Dynamic Sliding Window pattern."
                }
            ]
        },

        # 3. Array - Prefix Based
        {
            "id": "array-prefix-based",
            "name": "Prefix Based",
            "categoryId": "array",
            "categoryName": "Array",
            "icon": "data_array",
            "color": "#6366F1",
            "oneLiner": "Precomputing cumulative metrics so any range query [L, R] evaluates in O(1) time.",
            "whatIsIt": "Prefix Sum precalculates the cumulative accumulation of elements from the start of the array to each index `i`. By utilizing the algebraic property `Sum(L, R) = Prefix[R] - Prefix[L - 1]`, range questions become constant-time calculations.",
            "whenToUse": "Use when you need to answer multiple range sum queries, count subarrays summing to target K (especially when negative numbers exist!), or calculate prefix/suffix products without division.",
            "recognitionSignals": [
                "Range sum queries (multiple queries on static array)",
                "Subarray sum equals K (especially with negative numbers)",
                "Subarrays with sum divisible by K",
                "Balance of 0s and 1s (replace 0 with -1 and find sum 0)",
                "Product of array except self"
            ],
            "coreIdea": "If you know how much distance you covered by milestone A, and how much by milestone B, the distance between A and B is simply Total(B) - Total(A). By tracking past prefix totals in a Hash Map, you can instantly find if any prior milestone yields the target difference.",
            "variations": [
                {"name": "1D Prefix Array", "desc": "Static range queries in O(1) after O(N) precomputation."},
                {"name": "Prefix Sum + Hash Map", "desc": "Find count of subarrays summing to K in O(N) time even with negative numbers (e.g. LC #560)."},
                {"name": "Prefix and Suffix Accumulations", "desc": "Compute running values from left and right independently (e.g. Product of Array Except Self)."}
            ],
            "complexity": {
                "time": "O(N) precomputation, O(1) query",
                "space": "O(N) or O(1) auxiliary",
                "note": "Prefix sum allows constant-time subarray evaluations."
            },
            "pitfalls": [
                "Forgetting to initialize the hash map with `{0: 1}` for the empty prefix.",
                "Off-by-one errors when using 0-indexed prefix arrays (a 1-indexed prefix array of size N+1 prevents bounds checking).",
                "Modulo arithmetic in 'divisible by K' problems: negative remainder must be normalized via `((rem % k) + k) % k`."
            ],
            "cppTemplate": """// Template: Prefix Sum with Hash Map (Subarray Sum Equals K)
#include <vector>
#include <unordered_map>

int subarraySum(std::vector<int>& nums, int k) {
    std::unordered_map<int, int> prefixCounts;
    prefixCounts[0] = 1; // Empty prefix base case
    int currentSum = 0, totalMatches = 0;

    for (int num : nums) {
        currentSum += num;
        if (prefixCounts.find(currentSum - k) != prefixCounts.end()) {
            totalMatches += prefixCounts[currentSum - k];
        }
        prefixCounts[currentSum]++;
    }
    return totalMatches;
}""",
            "walkthrough": {
                "problem": "LC #560 - Subarray Sum Equals K: nums = [1, 2, 3, -2, 1], k = 3",
                "steps": [
                    {"step": 1, "state": "Init: prefixCounts={0:1}, sum=0", "action": "Ready to process elements."},
                    {"step": 2, "state": "num=1: sum=1. Look for sum-k = 1-3 = -2", "action": "Not found. prefixCounts={0:1, 1:1}."},
                    {"step": 3, "state": "num=2: sum=3. Look for sum-k = 3-3 = 0", "action": "Found 0 (count=1). matches=1. prefixCounts={0:1, 1:1, 3:1}."},
                    {"step": 4, "state": "num=3: sum=6. Look for sum-k = 6-3 = 3", "action": "Found 3 (count=1). matches=2. prefixCounts={0:1, 1:1, 3:1, 6:1}."},
                    {"step": 5, "state": "num=-2: sum=4. Look for sum-k = 4-3 = 1", "action": "Found 1 (count=1). matches=3. prefixCounts={..., 4:1}."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-arr-pref-1",
                    "scenario": "Given an array of integers that contains negative values, find the number of continuous subarrays whose sum equals K.",
                    "options": ["Prefix Sum + Hash Map", "Sliding Window", "Two Pointers", "Binary Search"],
                    "correctIndex": 0,
                    "explanation": "Sliding window fails with negative numbers because adding an element can either increase or decrease the sum. Prefix Sum + Hash Map handles negative values seamlessly in O(N)."
                }
            ]
        },

        # 4. Array - Kadane's / Subarray
        {
            "id": "array-kadanes-subarray",
            "name": "Kadane's / Subarray",
            "categoryId": "array",
            "categoryName": "Array",
            "icon": "data_array",
            "color": "#6366F1",
            "oneLiner": "Deciding at each index whether to extend an ongoing subarray or start fresh from the current element.",
            "whatIsIt": "Kadane's algorithm is an optimal dynamic programming technique for contiguous subarray optimization (such as maximum sum). At each index `i`, it determines whether adding the current number to the existing subarray sum is better than abandoning past elements and starting a new subarray at `nums[i]`.",
            "whenToUse": "Use whenever you need to find a maximum or minimum contiguous subarray sum or product in linear time.",
            "recognitionSignals": [
                "Maximum subarray sum / contiguous sum",
                "Maximum product subarray",
                "Circular array maximum sum",
                "Subarray with one deletion or at most K modifications"
            ],
            "coreIdea": "At every step, ask: 'Is my past baggage dragging me down?' If `current_sum + nums[i] < nums[i]` (i.e. `current_sum < 0`), discard the past and restart your streak at `nums[i]`.",
            "variations": [
                {"name": "Standard Kadane's", "desc": "Maximum contiguous subarray sum in O(N) time and O(1) space."},
                {"name": "Max Product Subarray", "desc": "Track both currentMax and currentMin to handle negative numbers flipping signs."},
                {"name": "Circular Subarray Sum", "desc": "Max(Standard Kadane, TotalSum - Minimum Subarray Sum)."}
            ],
            "complexity": {
                "time": "O(N)",
                "space": "O(1)",
                "note": "Single pass through the array with two tracking variables."
            },
            "pitfalls": [
                "Initializing `maxSoFar = 0` instead of `nums[0]`, which fails when all elements are negative (e.g. `[-5, -2, -8]`).",
                "In Maximum Product Subarray, forgetting to swap `currentMax` and `currentMin` when multiplying by a negative number.",
                "In Circular Subarray, edge case where all numbers are negative causes `totalSum - minSum == 0`."
            ],
            "cppTemplate": """// Template: Kadane's Algorithm for Maximum Subarray Sum
#include <vector>
#include <algorithm>

int maxSubArray(std::vector<int>& nums) {
    int currentSum = nums[0];
    int maxSum = nums[0];

    for (size_t i = 1; i < nums.size(); ++i) {
        currentSum = std::max(nums[i], currentSum + nums[i]);
        maxSum = std::max(maxSum, currentSum);
    }
    return maxSum;
}""",
            "walkthrough": {
                "problem": "LC #53 - Maximum Subarray: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
                "steps": [
                    {"step": 1, "state": "i=0 (num=-2)", "action": "currentSum=-2, maxSum=-2."},
                    {"step": 2, "state": "i=1 (num=1)", "action": "currentSum=max(1, -2+1)=1. maxSum=max(-2, 1)=1. Discarded past negative sum!"},
                    {"step": 3, "state": "i=2 (num=-3)", "action": "currentSum=max(-3, 1-3)=-2. maxSum=1."},
                    {"step": 4, "state": "i=3 (num=4)", "action": "currentSum=max(4, -2+4)=4. maxSum=max(1, 4)=4. Discarded past again!"},
                    {"step": 5, "state": "i=4..6 (nums=[-1,2,1])", "action": "currentSum rises to 3 -> 5 -> 6. maxSum updates to 6 (subarray [4, -1, 2, 1])."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-arr-kad-1",
                    "scenario": "You are given an array with all negative numbers: [-7, -3, -9, -2, -5]. What must Kadane's algorithm return?",
                    "options": ["-2 (the maximum single element)", "0 (empty subarray)", "-26 (sum of all elements)", "Error"],
                    "correctIndex": 0,
                    "explanation": "If non-empty subarrays are required, Kadane's correctly returns -2 when properly initialized to nums[0]."
                }
            ]
        },

        # 5. Array - Binary Search
        {
            "id": "array-binary-search",
            "name": "Binary Search",
            "categoryId": "array",
            "categoryName": "Array",
            "icon": "data_array",
            "color": "#6366F1",
            "oneLiner": "Halving the search space in logarithmic time by evaluating a monotonic condition.",
            "whatIsIt": "Binary Search divides a search interval in half at each step. Beyond finding elements in a sorted array, it solves optimization problems by binary searching on the answer space whenever a condition `canAchieve(X)` is monotonic (e.g., FFFTTT or TTTFFF).",
            "whenToUse": "Use when the array is sorted, rotated sorted, or when asked to find the 'minimum capacity / speed / time' where larger values are always valid (Binary Search on Answer).",
            "recognitionSignals": [
                "Sorted array or matrix given with O(log n) time requirement",
                "Search in rotated sorted array",
                "Find minimum in rotated sorted array / peak element",
                "Find minimum X such that condition is satisfied (Binary Search on Answer)",
                "Koko eating bananas / Capacity to ship packages in D days"
            ],
            "coreIdea": "If you know a middle point is too small, everything to its left is also too small. Discard the entire left half with one comparison. This reduces 1,000,000 possibilities down to ~20 checks.",
            "variations": [
                {"name": "Standard Value Lookup", "desc": "Find exact target in sorted array (e.g. LC #704)."},
                {"name": "Boundary / Rotated Search", "desc": "Find inflection point or pivot in rotated sorted array (e.g. LC #33, LC #153)."},
                {"name": "Binary Search on Answer Space", "desc": "Search domain [minVal, maxVal] where a predicate check `isValid(mid)` is monotonic (e.g. LC #875, LC #1011)."}
            ],
            "complexity": {
                "time": "O(log N)",
                "space": "O(1)",
                "note": "Search range halves with each check."
            },
            "pitfalls": [
                "Integer overflow in `(left + right) / 2`; use `left + (right - left) / 2`.",
                "Infinite loop with `left <= right` vs `left < right` when adjusting bounds.",
                "In rotated arrays with duplicates (LC #81), worst-case degrades to O(N) when `nums[left] == nums[mid] == nums[right]`."
            ],
            "cppTemplate": """// Template: Binary Search on Answer Space (Lower Bound / Minimum Feasible)
#include <vector>

bool isFeasible(int mid, const std::vector<int>& weights, int days);

int shipWithinDays(std::vector<int>& weights, int days) {
    int left = 1, right = 1e9; // Define search bounds
    int ans = right;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (isFeasible(mid, weights, days)) {
            ans = mid;        // Feasible, try finding smaller capacity
            right = mid - 1;
        } else {
            left = mid + 1;   // Not feasible, must increase capacity
        }
    }
    return ans;
}""",
            "walkthrough": {
                "problem": "LC #875 - Koko Eating Bananas: piles = [3, 6, 7, 11], h = 8",
                "steps": [
                    {"step": 1, "state": "Range: left=1, right=11 (max pile). mid=6", "action": "Time to eat: ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 <= 8. Feasible! ans=6, right=5."},
                    {"step": 2, "state": "Range: left=1, right=5. mid=3", "action": "Time to eat: 1+2+3+4 = 10 > 8. Too slow! left=4."},
                    {"step": 3, "state": "Range: left=4, right=5. mid=4", "action": "Time to eat: 1+2+2+3 = 8 <= 8. Feasible! ans=4, right=3."},
                    {"step": 4, "state": "left (4) > right (3)", "action": "Loop terminates. Minimum speed found: 4."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-arr-bs-1",
                    "scenario": "A factory has N items with weights. You want to find the minimum truck capacity needed to deliver all items within D trips.",
                    "options": ["Binary Search on Answer", "Sliding Window", "Kadane's Algorithm", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "If a capacity C works, any capacity > C also works (monotonic predicate). Searching capacities between max(weight) and sum(weight) via Binary Search yields O(N log(sum))."
                }
            ]
        },

        # 6. String - Sliding Window
        {
            "id": "string-sliding-window",
            "name": "Sliding Window",
            "categoryId": "string",
            "categoryName": "String",
            "icon": "text_fields",
            "color": "#EC4899",
            "oneLiner": "Finding longest, shortest, or matching substrings by sliding boundaries over character frequencies.",
            "whatIsIt": "String Sliding Window tracks character frequencies inside a dynamic substring. By maintaining a match count or duplicate check, it finds optimal substrings in O(N) without slicing new strings.",
            "whenToUse": "Use for substring problems requiring no repeated characters, minimum window containing all target characters, or finding all anagrams in a string.",
            "recognitionSignals": [
                "Longest substring without repeating characters",
                "Minimum window substring containing all characters of T",
                "Find all anagrams in a string / permutation in string",
                "Longest substring with at most K distinct characters"
            ],
            "coreIdea": "Keep a frequency map of the current window. Expand the right edge to swallow characters until a condition is met (or violated), then shrink from the left to optimize.",
            "variations": [
                {"name": "No Duplicates (Longest)", "desc": "Shrink left as soon as a duplicate enters the window (LC #3)."},
                {"name": "Minimum Window (Shortest)", "desc": "Expand right until all required characters are matched, then shrink left to minimize length (LC #76)."},
                {"name": "Fixed Anagram Window", "desc": "Window size is fixed to pattern length; compare frequency tables in O(1) (LC #438, LC #567)."}
            ],
            "complexity": {"time": "O(N)", "space": "O(1) (alphabet size <= 128)", "note": "Linear scan over string."},
            "pitfalls": ["Allocating new substrings inside the loop causing O(N^2) time.", "Failing to handle uppercase vs lowercase distinctions."],
            "cppTemplate": """// Template: Longest Substring Without Repeating Characters
#include <string>
#include <vector>
#include <algorithm>

int lengthOfLongestSubstring(std::string s) {
    std::vector<int> lastIndex(256, -1);
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); ++right) {
        if (lastIndex[s[right]] >= left) {
            left = lastIndex[s[right]] + 1; // Jump past duplicate
        }
        lastIndex[s[right]] = right;
        maxLen = std::max(maxLen, right - left + 1);
    }
    return maxLen;
}""",
            "walkthrough": {
                "problem": "LC #3 - Longest Substring Without Repeating Characters: s = 'abcabcbb'",
                "steps": [
                    {"step": 1, "state": "right=0 ('a'), left=0", "action": "window='a', maxLen=1."},
                    {"step": 2, "state": "right=1 ('b'), left=0", "action": "window='ab', maxLen=2."},
                    {"step": 3, "state": "right=2 ('c'), left=0", "action": "window='abc', maxLen=3."},
                    {"step": 4, "state": "right=3 ('a')", "action": "'a' duplicate! Jump left to lastIndex['a']+1 = 1. window='bca', maxLen=3."},
                    {"step": 5, "state": "continues", "action": "Max non-repeating substring length remains 3 ('abc')."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-str-sw-1",
                    "scenario": "Find the smallest substring in S that contains all characters of string T.",
                    "options": ["Sliding Window (Minimum Window)", "Monotonic Stack", "Trie", "Breadth First Search"],
                    "correctIndex": 0,
                    "explanation": "LC #76 Minimum Window Substring is the classic dynamic sliding window with character frequency matching."
                }
            ]
        },

        # 7. String - Two Pointers
        {
            "id": "string-two-pointers",
            "name": "Two Pointers",
            "categoryId": "string",
            "categoryName": "String",
            "icon": "text_fields",
            "color": "#EC4899",
            "oneLiner": "Symmetric and in-place string processing from opposite ends.",
            "whatIsIt": "Two pointers moving inward from both ends of a string to verify palindromes, perform in-place character swaps, or reverse words without auxiliary arrays.",
            "whenToUse": "Use for palindrome validation (with or without character deletions), reversing vowels, or tokenizing words in place.",
            "recognitionSignals": ["Valid palindrome", "Palindrome after deleting at most one character", "Reverse vowels / reverse words in a string", "In-place string manipulation"],
            "coreIdea": "A palindrome is a mirror reflection. Compare outer characters: if they match, move inward; if they don't, check if a single deletion resolves the mismatch.",
            "variations": [{"name": "Inward Palindrome Check", "desc": "Left and right compare characters (LC #125)."}, {"name": "Outward Expand from Center", "desc": "Expand outward from each index to find longest palindromic substring (LC #5)."}],
            "complexity": {"time": "O(N)", "space": "O(1)", "note": "Constant space in-place comparisons."},
            "pitfalls": ["Forgetting to skip non-alphanumeric characters and lowercase comparison in Valid Palindrome.", "Overlooking out-of-bounds pointer advancement when using nested while loops to skip delimiters or whitespace."],
            "cppTemplate": """// Template: Valid Palindrome (ignoring non-alphanumeric)
#include <string>
#include <cctype>

bool isPalindrome(std::string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        while (left < right && !std::isalnum(s[left])) left++;
        while (left < right && !std::isalnum(s[right])) right--;
        if (std::tolower(s[left]) != std::tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}""",
            "walkthrough": {
                "problem": "LC #680 - Valid Palindrome II: s = 'abca'",
                "steps": [
                    {"step": 1, "state": "left=0 ('a'), right=3 ('a')", "action": "Match. left=1, right=2."},
                    {"step": 2, "state": "left=1 ('b'), right=2 ('c')", "action": "Mismatch! Check if either 'b' or 'c' can be deleted: 'b' deleted leaves 'c'=='c' (valid!). Return true."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-str-tp-1",
                    "scenario": "Verify whether a string can become a palindrome by removing at most one character.",
                    "options": ["Two Pointers with one branch check", "Sliding Window", "Monotonic Deque", "Topological Sort"],
                    "correctIndex": 0,
                    "explanation": "Converge inward with Two Pointers. On the first mismatch, test if deleting s[left] OR deleting s[right] forms a palindrome in O(N) time."
                }
            ]
        },

        # 8. String - Pattern Matching
        {
            "id": "string-pattern-matching",
            "name": "Pattern Matching",
            "categoryId": "string",
            "categoryName": "String",
            "icon": "text_fields",
            "color": "#EC4899",
            "oneLiner": "Searching for substring patterns in linear time using preprocessing tables (KMP) or rolling hashes (Rabin-Karp).",
            "whatIsIt": "Pattern matching algorithms eliminate quadratic O(N * M) string searches. KMP precomputes the Longest Proper Prefix which is also Suffix (LPS array) to skip re-evaluating matched characters.",
            "whenToUse": "Use when finding the index of the first occurrence of a pattern, repeated substring patterns, or rolling hash string comparisons.",
            "recognitionSignals": ["Find the index of the first occurrence in a string", "Repeated substring pattern", "Shortest palindrome by adding characters in front", "Longest happy prefix"],
            "coreIdea": "When a mismatch occurs after matching 10 characters, don't restart from scratch. Look at the LPS table to see what prefix is already satisfied and jump immediately there.",
            "variations": [{"name": "KMP Algorithm", "desc": "O(N + M) deterministic search using LPS prefix table."}, {"name": "Rabin-Karp Rolling Hash", "desc": "O(N) rolling polynomial hash for multi-pattern search."}],
            "complexity": {"time": "O(N + M)", "space": "O(M)", "note": "Linear in text and pattern lengths."},
            "pitfalls": ["Integer overflow in rolling hash; use 64-bit integers and prime modulo arithmetic.", "Hash collisions in Rabin-Karp rolling hash when working with large strings without 64-bit integer arithmetic or double hashing modulo 10^9+7."],
            "cppTemplate": """// Template: KMP LPS Table Construction & Search
#include <string>
#include <vector>

std::vector<int> buildLPS(const std::string& pat) {
    int m = pat.size();
    std::vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            lps[i++] = ++len;
        } else if (len != 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}""",
            "walkthrough": {
                "problem": "LC #28 - Find the Index of the First Occurrence: haystack = 'sadbutsad', needle = 'sad'",
                "steps": [
                    {"step": 1, "state": "Precompute LPS array for needle 'sad'", "action": "Construct LPS table: lps = [0, 0, 0] since no proper prefix is also suffix."},
                    {"step": 2, "state": "Scan haystack at index 0 against needle", "action": "haystack[0]=='s', haystack[1]=='a', haystack[2]=='d'. Complete match achieved."},
                    {"step": 3, "state": "Record occurrence start position", "action": "Match starts at index 0. Return index 0 immediately without redundant character backtracking."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-str-pm-1",
                    "scenario": "Check if a string S can be constructed by taking a substring of it and appending multiple copies together.",
                    "options": ["KMP LPS Table / String Doubling trick", "Sliding Window", "Two Pointers", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "If `(s + s).substr(1, 2*n - 2).find(s) != string::npos`, or if `lps[n-1] > 0 && n % (n - lps[n-1]) == 0`, S consists of repeated patterns."
                }
            ]
        },

        # 9. Hash Map - Frequency Based
        {
            "id": "hashmap-frequency",
            "name": "Frequency Based",
            "categoryId": "hash-map",
            "categoryName": "Hash Map",
            "icon": "dataset",
            "color": "#8B5CF6",
            "oneLiner": "Counting occurrences of items to identify duplicates, anagrams, and majority elements.",
            "whatIsIt": "A hash map or frequency array stores elements as keys and their counts as values. This transforms counting questions into O(1) average-time lookups.",
            "whenToUse": "Use when you need to know which elements appear most frequently, whether two strings have matching character distributions (anagrams), or to find the majority element.",
            "recognitionSignals": ["Count occurrences / frequency", "Valid anagram / permutation check", "Find the most frequent / first non-repeating element", "Ransom note verification"],
            "coreIdea": "Keep a tally sheet. As you encounter each item, increment its count. To compare two sets, verify their tally sheets match.",
            "variations": [{"name": "Direct Hash Map", "desc": "std::unordered_map for arbitrary objects or large keys."}, {"name": "Array Frequency Table", "desc": "Fixed array `int count[26]` for lowercase alphabet strings for extreme speed and O(1) space."}],
            "complexity": {"time": "O(N)", "space": "O(U) where U is unique elements", "note": "Linear pass."},
            "pitfalls": ["Using `std::map` (O(log N) operations) when `std::unordered_map` or an array gives O(1).", "Using default integer keys instead of composite string serializations for multidimensional state counters."],
            "cppTemplate": """// Template: Character Frequency Map
#include <string>
#include <vector>

bool isAnagram(std::string s, std::string t) {
    if (s.size() != t.size()) return false;
    std::vector<int> counts(26, 0);
    for (char c : s) counts[c - 'a']++;
    for (char c : t) {
        if (--counts[c - 'a'] < 0) return false;
    }
    return true;
}""",
            "walkthrough": {
                "problem": "LC #242 - Valid Anagram: s = 'anagram', t = 'nagaram'",
                "steps": [
                    {"step": 1, "state": "Count characters of 'anagram'", "action": "a:3, n:1, g:1, r:1, m:1."},
                    {"step": 2, "state": "Subtract characters of 'nagaram'", "action": "All counts decrement to 0. Valid anagram!"}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-hm-freq-1",
                    "scenario": "Given a string of lowercase English letters, find the first non-repeating character in O(N) time.",
                    "options": ["Frequency Array (2-pass)", "Two Pointers", "Sliding Window", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "Pass 1 counts character frequencies in a size-26 array. Pass 2 identifies the first character with count == 1."
                }
            ]
        },

        # 10. Hash Map - Lookup Based
        {
            "id": "hashmap-lookup",
            "name": "Lookup Based",
            "categoryId": "hash-map",
            "categoryName": "Hash Map",
            "icon": "dataset",
            "color": "#8B5CF6",
            "oneLiner": "Querying past elements in O(1) time by storing target complements as keys.",
            "whatIsIt": "Stores elements encountered so far in a hash map or hash set. When processing a new element `x`, it checks if its mathematical partner `target - x` was already registered.",
            "whenToUse": "Use when finding pairs with a target sum in an UNSORTED array, detecting duplicates in a stream, or checking set membership in O(1).",
            "recognitionSignals": ["Two sum in unsorted array", "Find if pair exists with target difference or sum", "Contains duplicate", "Intersection of two arrays"],
            "coreIdea": "Instead of asking 'Where is my partner?' with a nested loop, register what you are looking for so your partner recognizes you when it arrives.",
            "variations": [{"name": "Single Pass Two Sum", "desc": "Look up complement first, then insert current element."}, {"name": "Hash Set Existence", "desc": "Instant membership testing in O(1)."}],
            "complexity": {"time": "O(N)", "space": "O(N)", "note": "O(1) average hash lookup."},
            "pitfalls": ["Inserting current element before checking complement (can match element with itself if target == 2 * num).", "Overlooking duplicate elements when mapping values to indices, inadvertently overwriting previous valid indices during iteration."],
            "cppTemplate": """// Template: Two Sum via Hash Map Lookup
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}""",
            "walkthrough": {
                "problem": "LC #1 - Two Sum: nums = [2, 7, 11, 15], target = 9",
                "steps": [
                    {"step": 1, "state": "i=0 (num=2): complement=7", "action": "seen is empty. seen[2]=0."},
                    {"step": 2, "state": "i=1 (num=7): complement=2", "action": "seen contains 2 at index 0! Return {0, 1}."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-hm-lk-1",
                    "scenario": "Find two numbers that add up to target in an UNSORTED array in O(N) time.",
                    "options": ["Hash Map Complement Lookup", "Two Pointers", "Binary Search on array", "Bubble Sort"],
                    "correctIndex": 0,
                    "explanation": "Unsorted array means Two Pointers cannot converge without sorting first. Hash Map achieves linear time in a single pass."
                }
            ]
        },

        # 11. Hash Map - Grouping Pattern
        {
            "id": "hashmap-grouping",
            "name": "Grouping & Index Mapping",
            "categoryId": "hash-map",
            "categoryName": "Hash Map",
            "icon": "dataset",
            "color": "#8B5CF6",
            "oneLiner": "Categorizing items into buckets using a canonicalized hash key.",
            "whatIsIt": "Transforms each item into a canonical representation (e.g., sorting a word's letters or formatting coordinates) and maps that key to a list of matching items.",
            "whenToUse": "Use when grouping words by anagrams, grouping coordinates by slope or line, or building inverted indices.",
            "recognitionSignals": ["Group anagrams", "Group strings by shift or pattern", "Isomorphic strings", "Group shifted strings"],
            "coreIdea": "Compute the 'fingerprint' of each item. Items with identical fingerprints belong in the same container.",
            "variations": [{"name": "Sorted String Key", "desc": "Sort characters to create anagram fingerprint (e.g. 'eat' -> 'aet')."}, {"name": "Delimited Count Key", "desc": "'1#0#2...' character count string to avoid O(L log L) sorting."}],
            "complexity": {"time": "O(N * K log K)", "space": "O(N * K)", "note": "Grouping into hash buckets."},
            "pitfalls": ["Key collision if canonical string is not properly delimited (e.g., counts 1 and 11 colliding with 11 and 1).", "Memory bloat when grouping massive strings without clearing intermediate stringstream buffers or canonical key representations."],
            "cppTemplate": """// Template: Group Anagrams
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
    std::unordered_map<std::string, std::vector<std::string>> groups;
    for (const auto& s : strs) {
        std::string key = s;
        std::sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    std::vector<std::vector<std::string>> result;
    for (auto& pair : groups) result.push_back(std::move(pair.second));
    return result;
}""",
            "walkthrough": {
                "problem": "LC #49 - Group Anagrams: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']",
                "steps": [
                    {"step": 1, "state": "Process 'eat', 'tea', 'ate'", "action": "All sort to 'aet' -> bucket ['eat', 'tea', 'ate']."},
                    {"step": 2, "state": "Process 'tan', 'nat'", "action": "Both sort to 'ant' -> bucket ['tan', 'nat']."},
                    {"step": 3, "state": "Process 'bat'", "action": "Sorts to 'abt' -> bucket ['bat']. Result contains 3 groups."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-hm-grp-1",
                    "scenario": "Group thousands of words into anagram buckets efficiently.",
                    "options": ["Hash Map with Sorted Key", "Sliding Window", "Monotonic Stack", "Floyd's Cycle"],
                    "correctIndex": 0,
                    "explanation": "Canonicalizing anagrams via sorted string keys in a Hash Map groups them in linear passes."
                }
            ]
        },

        # 12. Stack - Monotonic Stack
        {
            "id": "stack-monotonic",
            "name": "Monotonic Stack",
            "categoryId": "stack",
            "categoryName": "Stack",
            "icon": "layers",
            "color": "#3B82F6",
            "oneLiner": "Maintaining elements in strictly increasing or decreasing order to resolve next/previous greater/smaller queries in O(N).",
            "whatIsIt": "A stack where elements are kept strictly sorted. When a new element violates the order, smaller (or larger) elements are popped and resolved. Every element is pushed and popped at most once.",
            "whenToUse": "Use whenever you need to find the 'next greater element', 'previous smaller element', compute maximum rectangular area in a histogram, or trap rainwater.",
            "recognitionSignals": [
                "Next greater / next smaller element",
                "Daily temperatures / days until warmer",
                "Largest rectangle in histogram",
                "Trapping rain water",
                "Online stock span"
            ],
            "coreIdea": "Think of a line of people waiting. A taller newcomer blocks the view of shorter people behind them. Those shorter people can now be popped and marked because this newcomer is their 'next greater'.",
            "variations": [
                {"name": "Monotonic Decreasing Stack", "desc": "Stores elements in decreasing order to find next greater element."},
                {"name": "Monotonic Increasing Stack", "desc": "Stores elements in increasing order to find next smaller element (used in Largest Rectangle in Histogram)."}
            ],
            "complexity": {"time": "O(N)", "space": "O(N)", "note": "Each index is pushed and popped at most once."},
            "pitfalls": ["Storing values instead of indices (indices are needed to calculate widths and distances).", "Off-by-one errors with empty stack boundaries."],
            "cppTemplate": """// Template: Next Greater Element / Daily Temperatures
#include <vector>
#include <stack>

std::vector<int> dailyTemperatures(std::vector<int>& temperatures) {
    int n = temperatures.size();
    std::vector<int> result(n, 0);
    std::stack<int> st; // Stores indices

    for (int i = 0; i < n; ++i) {
        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
            int prevIndex = st.top();
            st.pop();
            result[prevIndex] = i - prevIndex;
        }
        st.push(i);
    }
    return result;
}""",
            "walkthrough": {
                "problem": "LC #739 - Daily Temperatures: temps = [73, 74, 75, 71, 69, 72, 76, 73]",
                "steps": [
                    {"step": 1, "state": "i=0 (73): push 0", "action": "st=[0]"},
                    {"step": 2, "state": "i=1 (74): 74 > temps[0] (73)", "action": "Pop 0: res[0] = 1-0 = 1 day. push 1. st=[1]"},
                    {"step": 3, "state": "i=2 (75): 75 > temps[1] (74)", "action": "Pop 1: res[1] = 2-1 = 1 day. push 2. st=[2]"},
                    {"step": 4, "state": "i=3,4 (71, 69): decreasing", "action": "push 3, 4. st=[2, 3, 4]"},
                    {"step": 5, "state": "i=5 (72): 72 > 69 and 72 > 71", "action": "Pop 4 (res[4]=1), pop 3 (res[3]=2). st=[2, 5]."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-stk-mono-1",
                    "scenario": "Given an array of heights representing a histogram, find the largest rectangular area in O(N) time.",
                    "options": ["Monotonic Increasing Stack", "Sliding Window", "Two Pointers", "Binary Search"],
                    "correctIndex": 0,
                    "explanation": "LC #84 Largest Rectangle in Histogram is solved in O(N) using a Monotonic Stack to find left and right smaller bounds for each bar."
                }
            ]
        },

        # 13. Stack - Expression Handling
        {
            "id": "stack-expressions",
            "name": "Min/Max & Expression Handling",
            "categoryId": "stack",
            "categoryName": "Stack",
            "icon": "layers",
            "color": "#3B82F6",
            "oneLiner": "Evaluating nested parentheses, operator precedence, and tracking instant minimums.",
            "whatIsIt": "Leverages the Last-In-First-Out (LIFO) property of stacks to manage hierarchical scopes, nested brackets, and arithmetic operator precedence.",
            "whenToUse": "Use for validating matching parentheses, evaluating Reverse Polish Notation (RPN), building a basic calculator with operator precedence, or designing a MinStack.",
            "recognitionSignals": ["Valid parentheses / nested brackets", "Evaluate Reverse Polish Notation", "Basic calculator / operator precedence", "Simplify file system path", "Min Stack in O(1)"],
            "coreIdea": "Whenever a new scope begins (opening bracket or lower-precedence operator), push the current context onto the stack. When it ends, pop and apply operations.",
            "variations": [{"name": "Bracket Matcher", "desc": "Push open brackets, pop and verify on close brackets (LC #20)."}, {"name": "Expression Evaluator", "desc": "Maintain operand and operator stacks for +, -, *, / precedence (LC #227)."}],
            "complexity": {"time": "O(N)", "space": "O(N)", "note": "Linear scan with stack memory."},
            "pitfalls": ["Empty stack access when encountering an unexpected closing bracket.", "Integer division truncating towards zero in negative numbers."],
            "cppTemplate": """// Template: Valid Parentheses Matcher
#include <string>
#include <stack>

bool isValid(std::string s) {
    std::stack<char> st;
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
}""",
            "walkthrough": {
                "problem": "LC #20 - Valid Parentheses: s = '({[]})'",
                "steps": [
                    {"step": 1, "state": "Encounter '(', '{', '['", "action": "Push expected closers ')', '}', ']'. Stack: [')', '}', ']']."},
                    {"step": 2, "state": "Encounter ']', '}', ')'", "action": "Match top and pop successively. Stack is empty. Valid!"}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-stk-expr-1",
                    "scenario": "Evaluate an arithmetic expression string with +, -, *, / and parentheses in linear time.",
                    "options": ["Operator Precedence Stack", "Sliding Window", "Two Pointers", "Kadane's Algorithm"],
                    "correctIndex": 0,
                    "explanation": "Operator precedence and parentheses parsing are the defining applications of LIFO stacks."
                }
            ]
        },

        # 14. Queue / Deque
        {
            "id": "queue-processing",
            "name": "FIFO & Deque Processing",
            "categoryId": "queue-deque",
            "categoryName": "Queue / Deque",
            "icon": "queue",
            "color": "#06B6D4",
            "oneLiner": "Level-order state exploration with FIFO queues and extreme boundary tracking with double-ended deques.",
            "whatIsIt": "A FIFO queue processes items in the exact order they arrive, making it the fundamental engine for BFS level-order traversal. A Deque allows push and pop from both ends, enabling monotonic sliding maximums in O(N).",
            "whenToUse": "Use for BFS level-order traversal, shortest paths in unweighted graphs, sliding window maximums, and rate limiting buffers.",
            "recognitionSignals": ["Sliding window maximum", "Level order traversal of tree", "Shortest path in unweighted maze/grid", "First unique number in data stream"],
            "coreIdea": "A Monotonic Deque keeps indices of candidate maximums in decreasing order. New elements evict smaller elements from the back; expired elements are dropped from the front.",
            "variations": [{"name": "Standard FIFO Queue", "desc": "BFS level order processing."}, {"name": "Monotonic Deque", "desc": "Sliding window maximum in amortized O(1) per step (LC #239)."}],
            "complexity": {"time": "O(N)", "space": "O(K)", "note": "Each element is inserted and removed at most once."},
            "pitfalls": ["Forgetting to evict indices that are older than the window boundary `right - k` from the front of the deque.", "Pushing visited nodes back into queue due to marking 'visited' on dequeue rather than upon enqueue, causing exponential duplicate states."],
            "cppTemplate": """// Template: Sliding Window Maximum via Monotonic Deque
#include <vector>
#include <deque>

std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
    std::deque<int> dq; // Stores indices
    std::vector<int> result;

    for (int i = 0; i < nums.size(); ++i) {
        // Evict elements outside window
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        // Maintain decreasing order
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}""",
            "walkthrough": {
                "problem": "LC #239 - Sliding Window Maximum: nums = [1,3,-1,-3,5,3,6,7], k = 3",
                "steps": [
                    {"step": 1, "state": "Window [1, 3, -1]", "action": "3 evicts 1. dq=[3, -1]. Max is nums[dq.front()] = 3."},
                    {"step": 2, "state": "Window [3, -1, -3]", "action": "Push -3. dq=[3, -1, -3]. Max is 3."},
                    {"step": 3, "state": "Window [-1, -3, 5]", "action": "3 evicted (out of bounds). 5 evicts -1 and -3. dq=[5]. Max is 5."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-qd-1",
                    "scenario": "Find the maximum of every contiguous window of size K in an array of size 10^5 in O(N) total time.",
                    "options": ["Monotonic Deque", "Max Heap (O(N log K))", "Sliding Window Sum", "Quicksort"],
                    "correctIndex": 0,
                    "explanation": "A Monotonic Deque yields strictly O(N) time, beating the O(N log K) heap approach."
                }
            ]
        },

        # 15. Linked List - Pointer Techniques
        {
            "id": "ll-pointer-techniques",
            "name": "Pointer Techniques & Cycle Detection",
            "categoryId": "linked-list",
            "categoryName": "Linked List",
            "icon": "link",
            "color": "#10B981",
            "oneLiner": "Detecting cycles, finding midpoints, and intersecting lists using multi-speed pointer traversal.",
            "whatIsIt": "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) uses a slow pointer moving 1 step and a fast pointer moving 2 steps. It detects loops and finds list midpoints in O(N) time and O(1) memory.",
            "whenToUse": "Use when checking if a linked list has a cycle, finding the start of a cycle, finding the middle node, or finding the intersection of two linked lists.",
            "recognitionSignals": ["Linked list cycle", "Find middle of linked list", "Intersection of two linked lists", "Remove Nth node from end of list", "Find duplicate number without modifying array"],
            "coreIdea": "If two runners run on a circular track at different speeds, the faster runner is mathematically guaranteed to lap and meet the slower runner.",
            "variations": [{"name": "Tortoise and Hare Cycle", "desc": "Fast moves 2x, slow moves 1x until meeting (LC #141, #142)."}, {"name": "Midpoint Finder", "desc": "When fast reaches end, slow is at exact middle (used in Merge Sort for Linked Lists)."}, {"name": "Fixed Offset (Nth from End)", "desc": "Advance fast pointer by N steps, then move both together."}],
            "complexity": {"time": "O(N)", "space": "O(1)", "note": "Zero heap allocations."},
            "pitfalls": ["Null pointer dereference with `fast->next->next` when `fast` or `fast->next` is null.", "Dereferencing nullptr on fast->next when advancing fast pointer by two steps without checking fast != nullptr first."],
            "cppTemplate": """// Template: Floyd's Cycle Detection
#include <cstddef>

struct ListNode { int val; ListNode *next; ListNode(int x) : val(x), next(nullptr) {} };

bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // Cycle detected
    }
    return false;
}""",
            "walkthrough": {
                "problem": "LC #141 - Linked List Cycle: 3 -> 2 -> 0 -> -4 -> points back to 2",
                "steps": [
                    {"step": 1, "state": "Start: slow=3, fast=3", "action": "slow moves to 2, fast moves to 0."},
                    {"step": 2, "state": "Step 2", "action": "slow moves to 0, fast moves from 0 -> -4 -> 2."},
                    {"step": 3, "state": "Step 3", "action": "slow moves to -4, fast moves from 2 -> 0 -> -4. slow == fast! Cycle confirmed."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-ll-ptr-1",
                    "scenario": "Find the entry node of a cycle in a linked list using O(1) space.",
                    "options": ["Floyd's Cycle Detection + Reset one pointer to head", "Hash Set of visited pointers", "Recursion", "Binary Search"],
                    "correctIndex": 0,
                    "explanation": "When slow and fast meet, reset slow to head. Moving both at 1 step per tick guarantees they meet at the cycle entry node."
                }
            ]
        },

        # 16. Linked List - Reversal & Merge
        {
            "id": "ll-reversal-merge",
            "name": "Reversal & Merge Lists",
            "categoryId": "linked-list",
            "categoryName": "Linked List",
            "icon": "link",
            "color": "#10B981",
            "oneLiner": "Inverting pointer directions and splicing multiple lists without node reallocations.",
            "whatIsIt": "Manipulates node pointers in-place by maintaining `prev`, `curr`, and `next` pointers to reverse sublists, or by stitching sorted lists using a dummy head.",
            "whenToUse": "Use when reversing an entire list, reversing in K-groups, reordering lists (interleaving front and back), or merging sorted lists.",
            "recognitionSignals": ["Reverse linked list", "Reverse nodes in k-group", "Merge two sorted lists", "Reorder list", "Palindrome linked list"],
            "coreIdea": "To reverse an arrow `A -> B`, save `B->next`, point `B` back to `A`, then step forward. Always anchor your boundary with a dummy node.",
            "variations": [{"name": "In-Place Iterative Reversal", "desc": "Standard 3-pointer reversal in O(N) time and O(1) space."}, {"name": "K-Group Reversal", "desc": "Reverse segments of size K, reconnecting endpoints iteratively (LC #25)."}],
            "complexity": {"time": "O(N)", "space": "O(1)", "note": "Re-wires existing node pointers in place."},
            "pitfalls": ["Losing reference to `curr->next` before redirecting `curr->next = prev`.", "Memory leaks if not properly handling head pointers."],
            "cppTemplate": """// Template: In-Place Reverse Linked List
#include <cstddef>

struct ListNode { int val; ListNode *next; ListNode(int x) : val(x), next(nullptr) {} };

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}""",
            "walkthrough": {
                "problem": "LC #206 - Reverse Linked List: 1 -> 2 -> 3 -> NULL",
                "steps": [
                    {"step": 1, "state": "curr=1, prev=null", "action": "Save 2. 1->next = null. prev=1, curr=2."},
                    {"step": 2, "state": "curr=2, prev=1", "action": "Save 3. 2->next = 1. prev=2, curr=3."},
                    {"step": 3, "state": "curr=3, prev=2", "action": "Save null. 3->next = 2. prev=3, curr=null. Return prev (3)."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-ll-rev-1",
                    "scenario": "Reverse a singly linked list in-place using O(1) auxiliary space.",
                    "options": ["Iterative 3-Pointer Reversal (prev, curr, next)", "Copy values to vector and rewrite", "Recursive stack", "Monotonic Deque"],
                    "correctIndex": 0,
                    "explanation": "Iterative 3-pointer reversal re-wires next pointers in-place in O(N) time and strictly O(1) space."
                }
            ]
        },

        # 17. Trees - Traversal & Recursion
        {
            "id": "trees-traversal",
            "name": "Traversal & Recursion Patterns",
            "categoryId": "trees",
            "categoryName": "Trees",
            "icon": "account_tree",
            "color": "#059669",
            "oneLiner": "Decomposing tree structures into recursive subproblems (DFS) or level-by-level frontiers (BFS).",
            "whatIsIt": "Tree traversal explores hierarchical nodes using Depth-First Search (Pre-order, In-order, Post-order) for depth/path properties, or Breadth-First Search (Queue) for level-order metrics.",
            "whenToUse": "Use for computing max depth, diameter, path sum, lowest common ancestor, subtree checks, or level-by-level views.",
            "recognitionSignals": ["Maximum depth / diameter of binary tree", "Lowest common ancestor (LCA)", "Binary tree level order traversal", "Path sum I / II / III", "Symmetric tree / invert tree"],
            "coreIdea": "A tree is just a node plus two smaller trees. Solve for the left subtree, solve for the right subtree, and combine the answers at the root.",
            "variations": [
                {"name": "Post-Order Bottom-Up DFS", "desc": "Compute metrics from children and pass up to parent (e.g. Max Depth, Diameter)."},
                {"name": "Pre-Order Top-Down DFS", "desc": "Pass state down from parent to children (e.g. Path Sum)."},
                {"name": "Level-Order BFS", "desc": "Queue processing one complete depth level at a time."}
            ],
            "complexity": {"time": "O(N)", "space": "O(H) where H is tree height", "note": "Visits each node once."},
            "pitfalls": ["Not handling the base case `if (!root) return ...` causing immediate crashes.", "Double counting path sums when traversing tree branches without resetting path tracker in post-order unwind."],
            "cppTemplate": """// Template: Bottom-Up Tree DFS (Diameter of Binary Tree)
#include <algorithm>

struct TreeNode { int val; TreeNode *left, *right; };

int dfs(TreeNode* root, int& maxDiameter) {
    if (!root) return 0;
    int leftDepth = dfs(root->left, maxDiameter);
    int rightDepth = dfs(root->right, maxDiameter);
    maxDiameter = std::max(maxDiameter, leftDepth + rightDepth);
    return 1 + std::max(leftDepth, rightDepth);
}

int diameterOfBinaryTree(TreeNode* root) {
    int maxDiameter = 0;
    dfs(root, maxDiameter);
    return maxDiameter;
}""",
            "walkthrough": {
                "problem": "LC #104 - Maximum Depth of Binary Tree: [3, 9, 20, null, null, 15, 7]",
                "steps": [
                    {"step": 1, "state": "Leaf nodes (9, 15, 7)", "action": "Return depth 1."},
                    {"step": 2, "state": "Node 20", "action": "Left=1 (15), Right=1 (7). Returns 1 + max(1, 1) = 2."},
                    {"step": 3, "state": "Root 3", "action": "Left=1 (9), Right=2 (20). Returns 1 + max(1, 2) = 3."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-tree-trav-1",
                    "scenario": "Find the lowest common ancestor (LCA) of two nodes P and Q in a general binary tree.",
                    "options": ["Recursive DFS Post-Order", "Sliding Window", "Monotonic Stack", "Floyd's Cycle"],
                    "correctIndex": 0,
                    "explanation": "If root equals P or Q, return root. Recurse left and right: if both return non-null, root is the LCA!"
                }
            ]
        },

        # 18. Trees - Binary Search Trees
        {
            "id": "trees-bst",
            "name": "Binary Search Trees (BST)",
            "categoryId": "trees",
            "categoryName": "Trees",
            "icon": "account_tree",
            "color": "#059669",
            "oneLiner": "Leveraging the sorted invariant where left < root < right to achieve O(H) searches and sorted in-order sequences.",
            "whatIsIt": "A Binary Search Tree guarantees that all values in the left subtree are strictly smaller than the root, and all in the right subtree are strictly larger. In-order traversal visits nodes in strictly sorted ascending order.",
            "whenToUse": "Use when searching, inserting, or validating nodes in O(log N) average time, or finding the K-th smallest element.",
            "recognitionSignals": ["Validate binary search tree", "Kth smallest element in a BST", "Lowest common ancestor in BST", "Search / insert / delete in BST", "Convert sorted array to BST"],
            "coreIdea": "At each node, compare target with node value. If smaller, discard the entire right subtree and go left. Like binary search, this halves the search path.",
            "variations": [{"name": "In-Order Invariant", "desc": "In-order traversal produces sorted list (LC #230)."}, {"name": "BST Direct Search", "desc": "Go left if target < val, go right if target > val (LC #700)."}],
            "complexity": {"time": "O(H) = O(log N) balanced", "space": "O(H) recursion stack", "note": "Worst-case O(N) if skewed."},
            "pitfalls": ["Checking only immediate children instead of full subtree bounds `(minVal, maxVal)` during BST validation.", "Integer overflow when initializing BST validation bounds with INT_MIN and INT_MAX instead of long long or pointer wrappers."],
            "cppTemplate": """// Template: Validate BST via Range Bounds
#include <cstddef>

struct TreeNode { int val; TreeNode *left, *right; };

bool validate(TreeNode* root, long long minVal, long long maxVal) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return validate(root->left, minVal, root->val) &&
           validate(root->right, root->val, maxVal);
}

bool isValidBST(TreeNode* root) {
    return validate(root, -1e18, 1e18);
}""",
            "walkthrough": {
                "problem": "LC #98 - Validate BST: [2, 1, 3]",
                "steps": [
                    {"step": 1, "state": "Root 2 in (-inf, inf)", "action": "Valid."},
                    {"step": 2, "state": "Left 1 in (-inf, 2)", "action": "Valid."},
                    {"step": 3, "state": "Right 3 in (2, inf)", "action": "Valid. Tree is a valid BST."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-tree-bst-1",
                    "scenario": "Find the K-th smallest element in a Binary Search Tree in O(H + K) time.",
                    "options": ["In-Order Traversal (stops at Kth step)", "Level-Order BFS", "Post-Order DFS", "Pre-Order DFS"],
                    "correctIndex": 0,
                    "explanation": "Because in-order traversal of a BST visits nodes in strictly increasing order, the K-th visited node is the K-th smallest."
                }
            ]
        },

        # 19. Recursion & Backtracking
        {
            "id": "recursion-backtracking",
            "name": "Backtracking & Exploration",
            "categoryId": "recursion",
            "categoryName": "Recursion & Backtracking",
            "icon": "replay",
            "color": "#D97706",
            "oneLiner": "Building solutions incrementally and undoing invalid choices to systematically explore all valid configurations.",
            "whatIsIt": "Backtracking is an exhaustive search algorithm that builds candidate paths piece by piece. When a path violates problem constraints, it 'backtracks' (undoes the last choice) and tries the next alternative.",
            "whenToUse": "Use when asked to generate ALL possible combinations, permutations, subsets, partitionings, or solve constraint puzzles like N-Queens and Sudoku.",
            "recognitionSignals": [
                "Generate all subsets / combinations / permutations",
                "Combination sum with target",
                "N-Queens / Sudoku solver",
                "Word Search in a grid",
                "Palindrome partitioning"
            ],
            "coreIdea": "Choose -> Explore -> Unchoose. Make a choice, recurse down the decision tree, and when returning, undo the choice so the next branch starts with a clean slate.",
            "variations": [
                {"name": "Subsets (Power Set)", "desc": "For each element, decide to include or exclude (2^N)."},
                {"name": "Permutations", "desc": "Order matters; track visited elements with a boolean array (N!)."},
                {"name": "Combinations / Target Sum", "desc": "Prune branches where running sum exceeds target."}
            ],
            "complexity": {"time": "O(2^N) or O(N!)", "space": "O(N) recursion stack", "note": "Exhaustive exploration."},
            "pitfalls": ["Forgetting to pop_back() or undo the choice after recursing, corrupting subsequent sibling paths.", "Forgetting to undo state modification (backtrack step) after recursive call returns, corrupting search path for sibling branches."],
            "cppTemplate": """// Template: Standard Backtracking (Subsets)
#include <vector>

void backtrack(int start, std::vector<int>& nums, std::vector<int>& current, std::vector<std::vector<int>>& result) {
    result.push_back(current); // Record valid state
    for (int i = start; i < nums.size(); ++i) {
        current.push_back(nums[i]);            // 1. Choose
        backtrack(i + 1, nums, current, result); // 2. Explore
        current.pop_back();                     // 3. Unchoose
    }
}

std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> current;
    backtrack(0, nums, current, result);
    return result;
}""",
            "walkthrough": {
                "problem": "LC #78 - Subsets: nums = [1, 2]",
                "steps": [
                    {"step": 1, "state": "Start with []", "action": "Add [] to result."},
                    {"step": 2, "state": "Pick 1 -> [1]", "action": "Add [1] to result."},
                    {"step": 3, "state": "Pick 2 -> [1, 2]", "action": "Add [1, 2]. Backtrack to [1], then backtrack to []."},
                    {"step": 4, "state": "Pick 2 -> [2]", "action": "Add [2]. All paths explored: [[], [1], [1, 2], [2]]."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-rec-back-1",
                    "scenario": "Find all unique combinations of numbers in candidates that sum up to target, where each number can be used unlimited times.",
                    "options": ["Backtracking with reuse (start=i)", "Sliding Window", "Monotonic Stack", "Two Pointers"],
                    "correctIndex": 0,
                    "explanation": "LC #39 Combination Sum uses backtracking. Passing `start=i` instead of `i+1` enables element reuse while preventing duplicate permutations."
                }
            ]
        },

        # 20. Heap / Priority Queue
        {
            "id": "heap-top-k",
            "name": "Top K & Greedy Heaps",
            "categoryId": "heap",
            "categoryName": "Heap / Priority Queue",
            "icon": "vertical_align_top",
            "color": "#EA580C",
            "oneLiner": "Maintaining instant access to extremes (min or max) in O(log K) insertion time.",
            "whatIsIt": "A binary heap maintains the smallest (Min-Heap) or largest (Max-Heap) element at the root in O(1) time. By capping a Min-Heap at size K, you keep the K largest elements in O(N log K) time without sorting the entire array.",
            "whenToUse": "Use when asked for the K largest/smallest elements, top K frequent items, merging K sorted lists, or tracking running medians from data streams.",
            "recognitionSignals": ["Kth largest / smallest element", "Top K frequent elements", "Merge K sorted lists", "Find median from data stream", "Task scheduler"],
            "coreIdea": "To keep the K largest elements, use a Min-Heap of size K. The smallest of the top contenders sits at the top. If a newcomer is bigger than this gatekeeper, kick the gatekeeper out.",
            "variations": [
                {"name": "Min-Heap of Size K", "desc": "Finds K largest elements in O(N log K)."},
                {"name": "K-Way Merge", "desc": "Push head of each sorted list into Min-Heap; pop smallest and push its successor (LC #23)."},
                {"name": "Two Heaps (Median)", "desc": "Max-Heap for lower half, Min-Heap for upper half (LC #295)."}
            ],
            "complexity": {"time": "O(N log K)", "space": "O(K)", "note": "Logarithmic insertions and constant minimum access."},
            "pitfalls": ["Using a Max-Heap when finding K largest elements (requires storing all N elements, taking O(N log N) space/time instead of O(N log K)).", "Custom comparator logic inverted: in C++ priority_queue<T>, greater<T> yields min-heap, whereas in std::sort it yields descending order."],
            "cppTemplate": """// Template: Top K Elements using Min-Heap
#include <vector>
#include <queue>

int findKthLargest(std::vector<int>& nums, int k) {
    // Min-heap
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop(); // Evict smallest
        }
    }
    return minHeap.top(); // K-th largest
}""",
            "walkthrough": {
                "problem": "LC #215 - Kth Largest: nums = [3,2,1,5,6,4], k = 2",
                "steps": [
                    {"step": 1, "state": "Process 3, 2", "action": "minHeap=[2, 3] (size 2)."},
                    {"step": 2, "state": "Process 1", "action": "push 1, size > 2 -> pop 1. minHeap=[2, 3]."},
                    {"step": 3, "state": "Process 5", "action": "push 5, size > 2 -> pop 2. minHeap=[3, 5]."},
                    {"step": 4, "state": "Process 6", "action": "push 6, size > 2 -> pop 3. minHeap=[5, 6]."},
                    {"step": 5, "state": "Process 4", "action": "push 4, size > 2 -> pop 4. minHeap=[5, 6]. Top is 5!"}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-heap-1",
                    "scenario": "Continuously calculate the median of numbers coming from an infinite live data stream.",
                    "options": ["Two Heaps (Max-Heap for lower half, Min-Heap for upper half)", "Quickselect on each query", "Sorted Vector with insertion", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "Two balanced heaps maintain the middle elements in O(1) time and handle insertions in O(log N)."
                }
            ]
        },

        # 21. Graphs - Traversal & Cycles
        {
            "id": "graphs-traversal-cycles",
            "name": "Traversal & Topological Sort",
            "categoryId": "graphs",
            "categoryName": "Graphs",
            "icon": "hub",
            "color": "#2563EB",
            "oneLiner": "Exploring connected networks and determining dependency execution order.",
            "whatIsIt": "Graph BFS/DFS traverses nodes and edges while tracking visited states. Kahn's Algorithm (Topological Sort) resolves linear ordering of directed acyclic graphs (DAGs) using in-degrees.",
            "whenToUse": "Use for counting connected components (islands), detecting cycles in directed/undirected graphs, course prerequisite ordering, or word ladders.",
            "recognitionSignals": ["Course schedule / prerequisite dependencies", "Number of islands / connected components", "Clone graph", "Word ladder (shortest transformation)", "Detect cycle in directed graph"],
            "coreIdea": "Courses with 0 prerequisites can be taken immediately. Completing a course decrements the prerequisites of downstream courses. If all courses finish, no cycle exists.",
            "variations": [
                {"name": "Connected Components DFS", "desc": "Sink islands or mark visited nodes (LC #200)."},
                {"name": "Kahn's Algorithm (Topological Sort)", "desc": "BFS using in-degree array (LC #207, LC #210)."},
                {"name": "Bidirectional BFS", "desc": "Search from start and target simultaneously to drastically cut search space (LC #127)."}
            ],
            "complexity": {"time": "O(V + E)", "space": "O(V + E)", "note": "Linear in vertices and edges."},
            "pitfalls": ["Forgetting to mark nodes visited, causing infinite loops on cyclic graphs.", "Failing to reset 3-color state in directed graph cycle detection, mistaking cross-edges for back-edges."],
            "cppTemplate": """// Template: Topological Sort via Kahn's Algorithm (BFS)
#include <vector>
#include <queue>

bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
    std::vector<std::vector<int>> adj(numCourses);
    std::vector<int> inDegree(numCourses, 0);

    for (const auto& pre : prerequisites) {
        adj[pre[1]].push_back(pre[0]);
        inDegree[pre[0]]++;
    }

    std::queue<int> q;
    for (int i = 0; i < numCourses; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }

    int completed = 0;
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        completed++;
        for (int neighbor : adj[curr]) {
            if (--inDegree[neighbor] == 0) q.push(neighbor);
        }
    }
    return completed == numCourses;
}""",
            "walkthrough": {
                "problem": "LC #207 - Course Schedule: numCourses = 2, prerequisites = [[1, 0]]",
                "steps": [
                    {"step": 1, "state": "inDegree: 0 has 0, 1 has 1", "action": "Push course 0 into queue."},
                    {"step": 2, "state": "Pop 0, completed=1", "action": "Decrement inDegree of 1 -> becomes 0. Push 1 into queue."},
                    {"step": 3, "state": "Pop 1, completed=2", "action": "completed == numCourses (2). All courses finished successfully!"}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-graph-trav-1",
                    "scenario": "Determine if there is a cycle in a set of software package dependencies.",
                    "options": ["Topological Sort (Kahn's BFS or DFS 3-color)", "Dijkstra's Algorithm", "Sliding Window", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "Package dependency order is a DAG problem; cycles prevent complete topological sorting."
                }
            ]
        },

        # 22. Graphs - DSU & Shortest Path
        {
            "id": "graphs-dsu-shortest-path",
            "name": "Shortest Path & Union-Find (DSU)",
            "categoryId": "graphs",
            "categoryName": "Graphs",
            "icon": "hub",
            "color": "#2563EB",
            "oneLiner": "Dynamic connectivity checks with Disjoint Set Union and weighted shortest paths with Dijkstra.",
            "whatIsIt": "Disjoint Set Union (DSU) partitions elements into disjoint sets with near O(1) `find` and `union` operations. Dijkstra's Algorithm finds the shortest path in non-negative weighted graphs using a priority queue.",
            "whenToUse": "Use DSU for dynamic connectivity, Kruskal's Minimum Spanning Tree, and cycle detection in undirected graphs. Use Dijkstra for shortest paths with positive edge weights.",
            "recognitionSignals": ["Redundant connection (cycle in undirected graph)", "Number of provinces / friend circles", "Network delay time / cheapest flight", "Minimum cost to connect all points"],
            "coreIdea": "In DSU, each component has a 'boss' (representative). If two nodes already have the same boss, adding an edge between them forms a cycle.",
            "variations": [
                {"name": "DSU with Path Compression & Rank", "desc": "Amortized O(alpha(N)) connectivity operations."},
                {"name": "Dijkstra's Algorithm", "desc": "Min-Heap priority queue finding shortest path in O((V + E) log V)."}
            ],
            "complexity": {"time": "DSU: O(alpha(N)), Dijkstra: O((V + E) log V)", "space": "O(V + E)", "note": "Near-optimal graph processing."},
            "pitfalls": ["Using Dijkstra on graphs with negative edge weights (requires Bellman-Ford or SPFA instead).", "Using standard BFS instead of Dijkstra's algorithm for graphs with positive non-uniform edge weights, producing suboptimal path lengths."],
            "cppTemplate": """// Template: Disjoint Set Union (DSU) with Path Compression & Rank
#include <vector>

class DSU {
public:
    std::vector<int> parent, rank;
    DSU(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; ++i) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false; // Already connected!
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
};""",
            "walkthrough": {
                "problem": "LC #684 - Redundant Connection: edges = [[1, 2], [1, 3], [2, 3]]",
                "steps": [
                    {"step": 1, "state": "Edge [1, 2]", "action": "Unite 1 and 2. Roots merged."},
                    {"step": 2, "state": "Edge [1, 3]", "action": "Unite 1 and 3. Roots merged."},
                    {"step": 3, "state": "Edge [2, 3]", "action": "find(2)==find(3)==1! Already connected -> [2, 3] is the redundant edge creating a cycle."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-graph-dsu-1",
                    "scenario": "Given an undirected graph, find the edge that creates a cycle in online stream fashion.",
                    "options": ["Disjoint Set Union (DSU)", "Topological Sort", "Sliding Window", "Binary Search"],
                    "correctIndex": 0,
                    "explanation": "DSU checks if both endpoints share the same root representative in O(alpha(N)) before adding an edge."
                }
            ]
        },

        # 23. Trie
        {
            "id": "trie-prefix-bitwise",
            "name": "Prefix & Bitwise Trie",
            "categoryId": "trie",
            "categoryName": "Trie (Prefix Tree)",
            "icon": "schema",
            "color": "#7C3AED",
            "oneLiner": "Tree of character branches enabling O(L) prefix lookups and bitwise maximum XOR calculations.",
            "whatIsIt": "A Trie (Prefix Tree) organizes strings such that words sharing common prefixes share the same initial tree branches. A Bitwise Trie stores binary bit representations (0/1) for maximum XOR queries.",
            "whenToUse": "Use when implementing autocomplete, searching for words with wildcard matching, prefix verification, or finding maximum XOR pairs.",
            "recognitionSignals": ["Prefix tree / startsWith method", "Word Search II / Boggle board", "Design add and search words data structure", "Maximum XOR of two numbers in an array"],
            "coreIdea": "Instead of storing whole words separately, spell words along tree branches. Looking up a prefix takes time proportional only to prefix length, independent of dictionary size.",
            "variations": [
                {"name": "Standard String Trie", "desc": "26 children pointers per node for alphabet lookups."},
                {"name": "Bitwise Trie (32-bit)", "desc": "Binary tree (0 or 1 branches) to greedily pick opposite bits for max XOR."}
            ],
            "complexity": {"time": "O(L) per insert/search", "space": "O(Total characters)", "note": "L is the length of the query string."},
            "pitfalls": ["High memory consumption; clean up dynamically allocated nodes or use array-based flat Tries.", "Index out of bounds when input contains uppercase or non-ASCII characters while Trie is indexed strictly by c - 'a'."],
            "cppTemplate": """// Template: Trie (Prefix Tree) Implementation
#include <string>
#include <vector>

class Trie {
    struct TrieNode {
        TrieNode* children[26] = {nullptr};
        bool isWord = false;
    };
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(const std::string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) curr->children[idx] = new TrieNode();
            curr = curr->children[idx];
        }
        curr->isWord = true;
    }

    bool startsWith(const std::string& prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};""",
            "walkthrough": {
                "problem": "LC #208 - Implement Trie: insert('apple'), search('apple'), startsWith('app')",
                "steps": [
                    {"step": 1, "state": "insert('apple')", "action": "Creates branches a -> p -> p -> l -> e (isWord=true)."},
                    {"step": 2, "state": "startsWith('app')", "action": "Traverses a -> p -> p successfully. Returns true."},
                    {"step": 3, "state": "search('app')", "action": "Reaches 'p', but isWord is false. Returns false."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-trie-1",
                    "scenario": "Find the maximum XOR pair from an array of 10^5 integers in O(32 * N) time.",
                    "options": ["Bitwise Trie (Binary Tree of bits)", "Two Pointers", "Sliding Window", "Kadane's Algorithm"],
                    "correctIndex": 0,
                    "explanation": "Insert numbers into a Bitwise Trie. For each number, greedily follow the opposite bit branch to maximize XOR."
                }
            ]
        },

        # 24. DP - Linear & Grid
        {
            "id": "dp-linear-grid",
            "name": "1D & 2D Grid / Linear DP",
            "categoryId": "dp",
            "categoryName": "Dynamic Programming",
            "icon": "auto_awesome_motion",
            "color": "#4F46E5",
            "oneLiner": "Breaking problems into sequential overlapping subproblems across linear states or grid coordinates.",
            "whatIsIt": "Dynamic Programming avoids recomputing subproblems by storing results in a table (memoization or tabulation). Linear DP transitions between 1D states (`dp[i] = dp[i-1] + dp[i-2]`), while Grid DP transitions between adjacent cells (`dp[r][c] = dp[r-1][c] + dp[r][c-1]`).",
            "whenToUse": "Use when finding the minimum/maximum cost, counting total paths, or determining reachability with overlapping choices.",
            "recognitionSignals": ["Climbing stairs / Fibonacci recurrence", "House robber (non-adjacent selection)", "Unique paths / minimum path sum in grid", "Maximum profit / state machine DP"],
            "coreIdea": "To reach step N optimally, you must have reached step N-1 or N-2 optimally. Solve smaller stages first and build upward.",
            "variations": [
                {"name": "1D Linear DP", "desc": "State depends on recent previous indices (can often optimize space to O(1))."},
                {"name": "2D Grid DP", "desc": "Paths in matrix transitioning from top and left neighbors."}
            ],
            "complexity": {"time": "O(N) or O(M * N)", "space": "O(N) or O(1) space optimized", "note": "Polynomial subproblem evaluations."},
            "pitfalls": ["Base case initialization errors (e.g. `dp[0]` not accounting for 0 elements).", "Index out of bounds on `dp[i-2]`."],
            "cppTemplate": """// Template: House Robber (1D DP with Space Optimization)
#include <vector>
#include <algorithm>

int rob(std::vector<int>& nums) {
    if (nums.empty()) return 0;
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int current = std::max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}""",
            "walkthrough": {
                "problem": "LC #198 - House Robber: nums = [2, 7, 9, 3, 1]",
                "steps": [
                    {"step": 1, "state": "House 1 ($2)", "action": "prev2=0, prev1=2."},
                    {"step": 2, "state": "House 2 ($7)", "action": "max(2, 0+7) = 7. prev2=2, prev1=7."},
                    {"step": 3, "state": "House 3 ($9)", "action": "max(7, 2+9) = 11. prev2=7, prev1=11."},
                    {"step": 4, "state": "House 4 ($3)", "action": "max(11, 7+3) = 11. prev2=11, prev1=11."},
                    {"step": 5, "state": "House 5 ($1)", "action": "max(11, 11+1) = 12. Maximum loot: $12."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-dp-lin-1",
                    "scenario": "Count the number of unique paths from the top-left to bottom-right of an M x N grid moving only right and down.",
                    "options": ["2D Grid DP `dp[r][c] = dp[r-1][c] + dp[r][c-1]`", "Breadth First Search", "Sliding Window", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "Grid DP solves Unique Paths in O(M * N) time, and can be space-optimized to a single 1D row of size N."
                }
            ]
        },

        # 25. DP - Knapsack & Sequences
        {
            "id": "dp-knapsack-sequences",
            "name": "Knapsack & Sequences",
            "categoryId": "dp",
            "categoryName": "Dynamic Programming",
            "icon": "auto_awesome_motion",
            "color": "#4F46E5",
            "oneLiner": "Choosing optimal subsets under weight constraints or finding longest common subsequences.",
            "whatIsIt": "Knapsack DP decides whether to include or exclude items under a budget constraint (0/1 Knapsack allows 1 copy; Unbounded Knapsack allows infinite copies). Sequence DP matches character alignments across two strings (LCS, Edit Distance).",
            "whenToUse": "Use for Coin Change, Partition Equal Subset Sum, Longest Common Subsequence, Edit Distance, or Longest Increasing Subsequence.",
            "recognitionSignals": ["Coin change / fewest coins to make amount", "Partition equal subset sum (target = total / 2)", "Longest common subsequence", "Edit distance / word conversion", "Longest increasing subsequence"],
            "coreIdea": "For each item and each possible budget weight: `dp[w] = max(dp[w] (skip item), dp[w - weight] + value (take item))`. In reverse loops for 0/1 knapsack, elements are used at most once.",
            "variations": [
                {"name": "0/1 Knapsack", "desc": "Items used once; iterate weight budget in reverse order to avoid reuse."},
                {"name": "Unbounded Knapsack", "desc": "Items can be reused infinitely; iterate weight budget forward (LC #322)."},
                {"name": "Longest Common Subsequence", "desc": "2D state `dp[i][j]` matching characters or taking maximum of sub-alignments."}
            ],
            "complexity": {"time": "O(N * W)", "space": "O(W) 1D space optimized", "note": "Pseudo-polynomial knapsack complexity."},
            "pitfalls": ["Iterating forward in 0/1 Knapsack (causes items to be counted multiple times).", "Overlapping subproblem memo table dimension mismatch between 1-based indexing and 0-based string coordinates."],
            "cppTemplate": """// Template: Coin Change (Fewest Coins - Unbounded Knapsack)
#include <vector>
#include <algorithm>

int coinChange(std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, 1e9);
    dp[0] = 0; // 0 coins needed for amount 0

    for (int coin : coins) {
        for (int i = coin; i <= amount; ++i) {
            dp[i] = std::min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] >= 1e9 ? -1 : dp[amount];
}""",
            "walkthrough": {
                "problem": "LC #322 - Coin Change: coins = [1, 2, 5], amount = 11",
                "steps": [
                    {"step": 1, "state": "dp[0]=0, all others=inf", "action": "Base case ready."},
                    {"step": 2, "state": "Apply coin 5", "action": "dp[5]=1, dp[10]=2."},
                    {"step": 3, "state": "Apply coin 1 with 10", "action": "dp[11] = dp[10] + 1 = 2 + 1 = 3 coins (5 + 5 + 1)."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-dp-knap-1",
                    "scenario": "Determine whether an array can be partitioned into two subsets with equal sum.",
                    "options": ["0/1 Knapsack DP with target = sum / 2", "Greedy largest first", "Two Pointers", "Sliding Window"],
                    "correctIndex": 0,
                    "explanation": "If total sum is odd, return false. Otherwise, solve 0/1 knapsack for target = sum / 2 in O(N * target) time."
                }
            ]
        },

        # 26. Greedy
        {
            "id": "greedy-intervals-jumps",
            "name": "Intervals & Scheduling Greedy",
            "categoryId": "greedy",
            "categoryName": "Greedy",
            "icon": "trending_up",
            "color": "#0284C7",
            "oneLiner": "Making the locally optimal choice at each step to reach a global optimum.",
            "whatIsIt": "Greedy algorithms make the best immediate choice without backtracking. For intervals, sorting by start or end time enables linear sweep-line decisions for merging or non-overlapping scheduling.",
            "whenToUse": "Use when intervals need to be merged, when selecting maximum non-overlapping activities, or when determining reachability in Jump Game.",
            "recognitionSignals": ["Merge intervals", "Non-overlapping intervals", "Meeting rooms / minimum conference rooms", "Jump Game I / II", "Gas station circular tour"],
            "coreIdea": "To maximize available room for future tasks, always choose the task that finishes earliest. Sort by end time and greedily take non-overlapping items.",
            "variations": [
                {"name": "Interval Merging", "desc": "Sort by start time, extend or push intervals (LC #56)."},
                {"name": "Interval Scheduling (Min Removals)", "desc": "Sort by end time, greedily pick earliest ending interval (LC #435)."},
                {"name": "Farthest Reachable Index", "desc": "Track max reachable boundary in Jump Game (LC #55)."}
            ],
            "complexity": {"time": "O(N log N) sorting + O(N) pass", "space": "O(N) for output", "note": "Dominated by sorting."},
            "pitfalls": ["Sorting by the wrong endpoint (e.g. sorting by start time instead of end time in activity selection).", "Assuming local greedy choice is globally optimal without verifying the greedy-choice property or optimal substructure."],
            "cppTemplate": """// Template: Merge Overlapping Intervals
#include <vector>
#include <algorithm>

std::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {
    if (intervals.empty()) return {};
    std::sort(intervals.begin(), intervals.end()); // Sort by start time

    std::vector<std::vector<int>> merged;
    merged.push_back(intervals[0]);

    for (size_t i = 1; i < intervals.size(); ++i) {
        if (intervals[i][0] <= merged.back()[1]) {
            // Overlapping, extend end time
            merged.back()[1] = std::max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}""",
            "walkthrough": {
                "problem": "LC #56 - Merge Intervals: [[1,3],[2,6],[8,10],[15,18]]",
                "steps": [
                    {"step": 1, "state": "Start with [1, 3]", "action": "merged = [[1, 3]]."},
                    {"step": 2, "state": "Interval [2, 6]: 2 <= 3", "action": "Overlap! Extend end to max(3, 6) = 6. merged = [[1, 6]]."},
                    {"step": 3, "state": "Interval [8, 10]: 8 > 6", "action": "No overlap. Append [8, 10]. merged = [[1, 6], [8, 10]]."},
                    {"step": 4, "state": "Interval [15, 18]: 15 > 10", "action": "Append [15, 18]. Result = [[1, 6], [8, 10], [15, 18]]."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-greedy-1",
                    "scenario": "Find the minimum number of intervals you need to remove to make the rest non-overlapping.",
                    "options": ["Sort by end time and greedily keep non-overlapping", "Dynamic Programming knapsack", "Sliding Window", "Monotonic Stack"],
                    "correctIndex": 0,
                    "explanation": "LC #435 is classic Activity Selection: sorting by end time greedily maximizes the number of retained intervals."
                }
            ]
        },

        # 27. Bit Manipulation
        {
            "id": "bit-core-masking",
            "name": "XOR & Bit Masking",
            "categoryId": "bit-manipulation",
            "categoryName": "Bit Manipulation",
            "icon": "memory",
            "color": "#64748B",
            "oneLiner": "Harnessing binary logic operations (XOR, AND, OR, bit shifts) for lightning-fast constant-time state operations.",
            "whatIsIt": "Bit manipulation works directly on numbers' binary representation. Notable properties: `x ^ x = 0`, `x ^ 0 = x`, and `x & (x - 1)` clears the lowest set bit in O(1).",
            "whenToUse": "Use when looking for single numbers among pairs, counting set bits, checking powers of two, or representing small sets (<= 30 elements) as integer bitmasks.",
            "recognitionSignals": ["Single number / every element appears twice except one", "Number of 1 bits (Hamming weight)", "Power of two check", "Bitmask state representation (e.g. TSP or subset DP)", "Missing number in range [0, n]"],
            "coreIdea": "XOR is a toggle switch. Toggling twice returns to the original state. Bitwise operations execute in a single CPU instruction clock cycle.",
            "variations": [
                {"name": "XOR Cancellation", "desc": "Cancels duplicate pairs: `x ^ x = 0` (LC #136)."},
                {"name": "Brian Kernighan's Algorithm", "desc": "`x & (x - 1)` drops lowest set bit to count 1s in O(set bits) (LC #191)."},
                {"name": "Bitmask Subsets", "desc": "Integers 0 to 2^N - 1 represent all subsets of an N-element set."}
            ],
            "complexity": {"time": "O(1) or O(N)", "space": "O(1)", "note": "Fastest primitive CPU instructions."},
            "pitfalls": ["Operator precedence in C++: `+` has higher precedence than `<<` or `^`! Always use parentheses: `(1 << k)`.", "Undefined behavior with negative shifts or shifting by >= 32 bits on 32-bit integers; use 1ULL << shift for 64-bit masks."],
            "cppTemplate": """// Template: Single Number & Bit Operations
#include <vector>

int singleNumber(std::vector<int>& nums) {
    int xorSum = 0;
    for (int num : nums) xorSum ^= num;
    return xorSum;
}

bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}""",
            "walkthrough": {
                "problem": "LC #136 - Single Number: nums = [4, 1, 2, 1, 2]",
                "steps": [
                    {"step": 1, "state": "xorSum = 0", "action": "xorSum ^= 4 -> 4."},
                    {"step": 2, "state": "xorSum ^= 1", "action": "xorSum = 5."},
                    {"step": 3, "state": "xorSum ^= 2", "action": "xorSum = 7."},
                    {"step": 4, "state": "xorSum ^= 1", "action": "1 cancels with 1! xorSum = 6."},
                    {"step": 5, "state": "xorSum ^= 2", "action": "2 cancels with 2! Final result is 4."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-bit-1",
                    "scenario": "Check whether an integer N is a positive power of two in O(1) time.",
                    "options": ["(n > 0) && ((n & (n - 1)) == 0)", "Loop dividing by 2", "Convert to binary string", "Modulo 2 check"],
                    "correctIndex": 0,
                    "explanation": "A power of two in binary has exactly one bit set. `n & (n - 1)` clears that sole bit, resulting in 0."
                }
            ]
        },

        # 28. Sorting Algorithms
        {
            "id": "sorting-algorithms",
            "name": "Classic Sort Algorithms",
            "categoryId": "sorting",
            "categoryName": "Sorting Algorithms",
            "icon": "sort",
            "color": "#0D9488",
            "oneLiner": "Ordering elements to unlock binary search, two-pointer scanning, and O(N) cyclic placement.",
            "whatIsIt": "Sorting organizes data into monotonic order. Beyond general comparison sorts (MergeSort, QuickSort in O(N log N)), specialized sorts like Cyclic Sort place numbers 1..N into their matching indices in O(N) time.",
            "whenToUse": "Use when finding missing numbers in range [1, N], sorting 0,1,2 colors in-place, or custom ordering with comparators (e.g. Largest Number).",
            "recognitionSignals": ["Find the first missing positive", "Sort colors in-place in one pass", "Largest number from string concatenation", "Cyclic sort with range [1, n]"],
            "coreIdea": "If values are in range 1..N, each number `x` belongs at index `x - 1`. Swap each misplaced number to its correct home until everything is in place.",
            "variations": [
                {"name": "Cyclic Sort", "desc": "In-place O(N) sort for range 1..N (LC #41, LC #268, LC #448)."},
                {"name": "Custom String Comparator", "desc": "Sort by `a + b > b + a` (LC #179 Largest Number)."},
                {"name": "Three-Way Partition", "desc": "Dutch National Flag algorithm for 3 distinct values (LC #75)."}
            ],
            "complexity": {"time": "O(N) for Cyclic Sort, O(N log N) for comparison sort", "space": "O(1) in-place", "note": "Linear in-place array placements."},
            "pitfalls": ["Infinite loops in Cyclic Sort when duplicates exist: always check nums[i] != nums[nums[i] - 1] before swapping.", "Off-by-one errors in merge sort midpoint calculation causing infinite recursion when left + 1 == right."],
            "cppTemplate": """// Template: Cyclic Sort (Find First Missing Positive)
#include <vector>
#include <algorithm>

int firstMissingPositive(std::vector<int>& nums) {
    int n = nums.size();
    for (int i = 0; i < n; ++i) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            std::swap(nums[i], nums[nums[i] - 1]);
        }
    }
    for (int i = 0; i < n; ++i) {
        if (nums[i] != i + 1) return i + 1;
    }
    return n + 1;
}""",
            "walkthrough": {
                "problem": "LC #41 - First Missing Positive: nums = [3, 4, -1, 1]",
                "steps": [
                    {"step": 1, "state": "i=0 (3)", "action": "Swap with index 2: [-1, 4, 3, 1]."},
                    {"step": 2, "state": "i=1 (4)", "action": "Swap with index 3: [-1, 1, 3, 4]."},
                    {"step": 3, "state": "i=1 (1)", "action": "Swap with index 0: [1, -1, 3, 4]."},
                    {"step": 4, "state": "Check final array [1, -1, 3, 4]", "action": "Index 1 has -1 != 2. First missing positive is 2!"}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-sort-1",
                    "scenario": "Given an unsorted array of integers, find the smallest positive integer not present in O(N) time and O(1) auxiliary space.",
                    "options": ["Cyclic Sort", "Hash Set lookup (O(N) space)", "Standard std::sort (O(N log N))", "Binary Search"],
                    "correctIndex": 0,
                    "explanation": "Cyclic Sort puts each number x at index x-1 in-place in O(N) time and O(1) space."
                }
            ]
        },

        # 29. Range Structures
        {
            "id": "range-trees",
            "name": "Segment & Fenwick Trees",
            "categoryId": "range-structures",
            "categoryName": "Range Structures",
            "icon": "stacked_bar_chart",
            "color": "#4338CA",
            "oneLiner": "Balancing point updates and range queries in O(log N) time via binary index decomposition.",
            "whatIsIt": "A Segment Tree or Fenwick Tree (Binary Indexed Tree) maintains associative range aggregations (sum, min, max, gcd) while supporting dynamic updates in O(log N) time.",
            "whenToUse": "Use when an array is mutable (frequent updates) and you must answer range sum/min/max queries, or count inversions in an array.",
            "recognitionSignals": ["Range sum query mutable", "Count of smaller numbers after self / inversion count", "Point update range query in O(log N)", "Segment tree with lazy propagation"],
            "coreIdea": "Instead of precomputing all prefixes (fast queries, slow updates) or keeping raw values (fast updates, slow queries), store precomputed powers of 2 so both queries and updates take O(log N).",
            "variations": [
                {"name": "Fenwick Tree (BIT)", "desc": "Extremely lightweight array using `i += i & (-i)` for prefix sums."},
                {"name": "Segment Tree", "desc": "Full binary tree supporting range updates via lazy propagation."}
            ],
            "complexity": {"time": "O(log N) per update and query", "space": "O(N) for Fenwick, O(4N) for Segment Tree", "note": "Logarithmic dynamic range aggregations."},
            "pitfalls": ["Fenwick tree requires 1-based indexing; index 0 causes infinite loops with `i & (-i)`.", "Forgetting to push pending lazy tags down to child nodes before querying or updating child intervals in lazy propagation."],
            "cppTemplate": """// Template: Fenwick Tree (Binary Indexed Tree)
#include <vector>

class FenwickTree {
    std::vector<int> tree;
    int n;
public:
    FenwickTree(int n) : n(n), tree(n + 1, 0) {}
    void update(int i, int delta) {
        for (; i <= n; i += i & (-i)) tree[i] += delta;
    }
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i)) sum += tree[i];
        return sum;
    }
    int rangeQuery(int l, int r) {
        return query(r) - query(l - 1);
    }
};""",
            "walkthrough": {
                "problem": "LC #307 - Range Sum Query Mutable: [1, 3, 5]",
                "steps": [
                    {"step": 1, "state": "Build Fenwick Tree", "action": "update(1, 1), update(2, 3), update(3, 5)."},
                    {"step": 2, "state": "rangeQuery(1, 3)", "action": "query(3) - query(0) = 9."},
                    {"step": 3, "state": "update(2, 2) (change 3 to 5)", "action": "delta=2. rangeQuery(1, 3) becomes 11 in O(log N)."}
                ]
            },
            "quizzes": [
                {
                    "id": "quiz-range-1",
                    "scenario": "Support dynamic point updates and range sum queries on an array of size 10^5 in O(log N) per operation.",
                    "options": ["Fenwick Tree / Segment Tree", "Prefix Sum Array", "Two Pointers", "Sliding Window"],
                    "correctIndex": 0,
                    "explanation": "Prefix sum arrays take O(N) per update; Fenwick and Segment Trees balance updates and queries in O(log N)."
                }
            ]
        }
    ]
    return patterns

if __name__ == '__main__':
    curriculum = get_patterns_curriculum()
    print(f"Curriculum patterns defined: {len(curriculum)}")
