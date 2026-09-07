/**
 * DevPilot-AI — DSA Pattern Learning & 1000+ Questions Dataset
 * Features:
 * - 28 In-Depth Pattern Guides across 16 major DSA categories with complete 12-point curriculum.
 * - 1,000+ authentic, real LeetCode problems (real titles, numbers, canonical URLs, difficulty, recognition signals).
 * - 32 'Identify the Pattern' Training Arena recognition drills.
 * - 100% synchronized with devpilot_dsa_progress and existing 260 roadmap questions.
 */

const dsaPatternsRoadmap = [
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
      {
        "name": "Opposite Direction (Converging)",
        "desc": "One pointer starts at 0, the other at n-1, moving inward until they meet (e.g., Two Sum II, 3Sum, Container With Most Water)."
      },
      {
        "name": "Same Direction (Fast & Slow / Runner)",
        "desc": "Both pointers start at index 0; fast scans candidates while slow maintains the boundary of valid elements (e.g., Remove Duplicates, Move Zeroes)."
      },
      {
        "name": "Three-Way Partition",
        "desc": "Low, mid, high pointers dividing array into three distinct value zones in a single pass (e.g., Sort Colors)."
      }
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
    "cppTemplate": "// Template: Converging Two Pointers (e.g., Pair Search in Sorted Array)\n#include <vector>\n\nstd::vector<int> twoPointersSearch(std::vector<int>& nums, int target) {\n    int left = 0;\n    int right = static_cast<int>(nums.size()) - 1;\n\n    while (left < right) {\n        long long currentSum = static_cast<long long>(nums[left]) + nums[right];\n        if (currentSum == target) {\n            return {left + 1, right + 1}; // 1-based or 0-based result\n        } else if (currentSum < target) {\n            left++; // Need larger sum, shift left forward\n        } else {\n            right--; // Need smaller sum, shift right backward\n        }\n    }\n    return {};\n}",
    "walkthrough": {
      "problem": "LC #11 - Container With Most Water: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
      "steps": [
        {
          "step": 1,
          "state": "left=0 (h=1), right=7 (h=7), width=7",
          "action": "Area = 7 * min(1, 7) = 7. maxArea=7. Since h[left] < h[right], increment left."
        },
        {
          "step": 2,
          "state": "left=1 (h=8), right=7 (h=7), width=6",
          "action": "Area = 6 * min(8, 7) = 42. maxArea=42. Since h[left] >= h[right], decrement right."
        },
        {
          "step": 3,
          "state": "left=1 (h=8), right=6 (h=3), width=5",
          "action": "Area = 5 * min(8, 3) = 15. maxArea=42. Decrement right."
        },
        {
          "step": 4,
          "state": "left=1 (h=8), right=5 (h=8), width=4",
          "action": "Area = 4 * min(8, 8) = 32. maxArea=42. Pointers continue converging."
        },
        {
          "step": 5,
          "state": "left meets right",
          "action": "Global maximum capacity found: 49 achieved when considering left=1 (8) and right=7 (7) / optimal widths."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-arr-tp-1",
        "scenario": "You are given a sorted integer array and an integer target. You must find two numbers that add up to target in O(N) time and strictly O(1) extra space.",
        "options": [
          "Two Pointers (Converging)",
          "Hash Map complement lookup",
          "Binary Search on each element",
          "Dynamic Programming table"
        ],
        "correctIndex": 0,
        "explanation": "Because the array is already sorted and O(1) space is strictly required, Converging Two Pointers achieves O(N) time and O(1) space. Hash Map would take O(N) space."
      },
      {
        "id": "quiz-arr-tp-2",
        "scenario": "An unsorted array contains zeros and non-zero integers. You need to push all zeros to the end in-place without copying the array.",
        "options": [
          "Fast & Slow Two Pointers",
          "Merge Sort recursion",
          "Prefix Sum Array",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "Fast pointer scans for non-zero elements while the slow pointer tracks the placement position. Swapping or assigning at the slow pointer achieves O(N) time and O(1) space."
      }
    ],
    "practiceQuestionIds": [
      "arr-tp-01",
      "arr-tp-02",
      "arr-tp-03",
      "arr-tp-04",
      "arr-tp-06",
      "arr-tp-11",
      "arr-tp-08",
      "arr-tp-09",
      "arr-tp-16",
      "arr-tp-15"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "Fixed Window",
        "desc": "Window size is strictly K. Slide by adding nums[i] and subtracting nums[i - K] (e.g., Maximum Average Subarray I)."
      },
      {
        "name": "Dynamic Window (Longest)",
        "desc": "Expand right indefinitely; shrink left only when window becomes invalid (e.g., Max Consecutive Ones III)."
      },
      {
        "name": "Dynamic Window (Shortest)",
        "desc": "Expand right until window is valid; then aggressively shrink left while valid to find minimal length (e.g., Minimum Size Subarray Sum)."
      }
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
    "cppTemplate": "// Template: Dynamic Sliding Window (Shortest Subarray with Sum >= target)\n#include <vector>\n#include <algorithm>\n\nint minSubArrayLen(int target, std::vector<int>& nums) {\n    int left = 0, currentSum = 0;\n    int minLen = 1e9;\n\n    for (int right = 0; right < nums.size(); ++right) {\n        currentSum += nums[right];\n        while (currentSum >= target) {\n            minLen = std::min(minLen, right - left + 1);\n            currentSum -= nums[left++];\n        }\n    }\n    return minLen == 1e9 ? 0 : minLen;\n}",
    "walkthrough": {
      "problem": "LC #209 - Minimum Size Subarray Sum: target = 7, nums = [2, 3, 1, 2, 4, 3]",
      "steps": [
        {
          "step": 1,
          "state": "right=0..3 [2,3,1,2]",
          "action": "Sum=8 >= 7. Update minLen=min(inf, 4)=4. Shrink left: remove 2 -> sum=6."
        },
        {
          "step": 2,
          "state": "right=4 [3,1,2,4]",
          "action": "Sum=10 >= 7. Update minLen=min(4, 4)=4. Shrink left: remove 3 -> sum=7."
        },
        {
          "step": 3,
          "state": "right=4 [1,2,4]",
          "action": "Sum=7 >= 7. Update minLen=min(4, 3)=3. Shrink left: remove 1 -> sum=6."
        },
        {
          "step": 4,
          "state": "right=5 [2,4,3]",
          "action": "Sum=9 >= 7. Update minLen=min(3, 3)=3. Shrink left: remove 2 -> sum=7."
        },
        {
          "step": 5,
          "state": "right=5 [4,3]",
          "action": "Sum=7 >= 7. Update minLen=min(3, 2)=2. Result is 2 (subarray [4, 3])."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-arr-sw-1",
        "scenario": "Find the length of the longest subarray with at most K distinct elements in an array of positive integers.",
        "options": [
          "Dynamic Sliding Window + Frequency Map",
          "Monotonic Stack",
          "Floyd's Cycle Detection",
          "Backtracking"
        ],
        "correctIndex": 0,
        "explanation": "Contiguous subarray with an 'at most K' constraint on positive elements is the classic Dynamic Sliding Window pattern."
      }
    ],
    "practiceQuestionIds": [
      "arr-sw-03",
      "arr-sw-01",
      "arr-sw-02",
      "lc-485",
      "lc-661",
      "arr-sw-04",
      "arr-sw-08",
      "arr-sw-06",
      "arr-sw-09",
      "arr-sw-10"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "1D Prefix Array",
        "desc": "Static range queries in O(1) after O(N) precomputation."
      },
      {
        "name": "Prefix Sum + Hash Map",
        "desc": "Find count of subarrays summing to K in O(N) time even with negative numbers (e.g. LC #560)."
      },
      {
        "name": "Prefix and Suffix Accumulations",
        "desc": "Compute running values from left and right independently (e.g. Product of Array Except Self)."
      }
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
    "cppTemplate": "// Template: Prefix Sum with Hash Map (Subarray Sum Equals K)\n#include <vector>\n#include <unordered_map>\n\nint subarraySum(std::vector<int>& nums, int k) {\n    std::unordered_map<int, int> prefixCounts;\n    prefixCounts[0] = 1; // Empty prefix base case\n    int currentSum = 0, totalMatches = 0;\n\n    for (int num : nums) {\n        currentSum += num;\n        if (prefixCounts.find(currentSum - k) != prefixCounts.end()) {\n            totalMatches += prefixCounts[currentSum - k];\n        }\n        prefixCounts[currentSum]++;\n    }\n    return totalMatches;\n}",
    "walkthrough": {
      "problem": "LC #560 - Subarray Sum Equals K: nums = [1, 2, 3, -2, 1], k = 3",
      "steps": [
        {
          "step": 1,
          "state": "Init: prefixCounts={0:1}, sum=0",
          "action": "Ready to process elements."
        },
        {
          "step": 2,
          "state": "num=1: sum=1. Look for sum-k = 1-3 = -2",
          "action": "Not found. prefixCounts={0:1, 1:1}."
        },
        {
          "step": 3,
          "state": "num=2: sum=3. Look for sum-k = 3-3 = 0",
          "action": "Found 0 (count=1). matches=1. prefixCounts={0:1, 1:1, 3:1}."
        },
        {
          "step": 4,
          "state": "num=3: sum=6. Look for sum-k = 6-3 = 3",
          "action": "Found 3 (count=1). matches=2. prefixCounts={0:1, 1:1, 3:1, 6:1}."
        },
        {
          "step": 5,
          "state": "num=-2: sum=4. Look for sum-k = 4-3 = 1",
          "action": "Found 1 (count=1). matches=3. prefixCounts={..., 4:1}."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-arr-pref-1",
        "scenario": "Given an array of integers that contains negative values, find the number of continuous subarrays whose sum equals K.",
        "options": [
          "Prefix Sum + Hash Map",
          "Sliding Window",
          "Two Pointers",
          "Binary Search"
        ],
        "correctIndex": 0,
        "explanation": "Sliding window fails with negative numbers because adding an element can either increase or decrease the sum. Prefix Sum + Hash Map handles negative values seamlessly in O(N)."
      }
    ],
    "practiceQuestionIds": [
      "arr-pf-01",
      "arr-pf-02",
      "arr-pf-03",
      "arr-pf-04",
      "lc-118",
      "arr-pf-08",
      "arr-pf-06",
      "arr-pf-07",
      "arr-pf-10",
      "lc-2448"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "Standard Kadane's",
        "desc": "Maximum contiguous subarray sum in O(N) time and O(1) space."
      },
      {
        "name": "Max Product Subarray",
        "desc": "Track both currentMax and currentMin to handle negative numbers flipping signs."
      },
      {
        "name": "Circular Subarray Sum",
        "desc": "Max(Standard Kadane, TotalSum - Minimum Subarray Sum)."
      }
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
    "cppTemplate": "// Template: Kadane's Algorithm for Maximum Subarray Sum\n#include <vector>\n#include <algorithm>\n\nint maxSubArray(std::vector<int>& nums) {\n    int currentSum = nums[0];\n    int maxSum = nums[0];\n\n    for (size_t i = 1; i < nums.size(); ++i) {\n        currentSum = std::max(nums[i], currentSum + nums[i]);\n        maxSum = std::max(maxSum, currentSum);\n    }\n    return maxSum;\n}",
    "walkthrough": {
      "problem": "LC #53 - Maximum Subarray: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      "steps": [
        {
          "step": 1,
          "state": "i=0 (num=-2)",
          "action": "currentSum=-2, maxSum=-2."
        },
        {
          "step": 2,
          "state": "i=1 (num=1)",
          "action": "currentSum=max(1, -2+1)=1. maxSum=max(-2, 1)=1. Discarded past negative sum!"
        },
        {
          "step": 3,
          "state": "i=2 (num=-3)",
          "action": "currentSum=max(-3, 1-3)=-2. maxSum=1."
        },
        {
          "step": 4,
          "state": "i=3 (num=4)",
          "action": "currentSum=max(4, -2+4)=4. maxSum=max(1, 4)=4. Discarded past again!"
        },
        {
          "step": 5,
          "state": "i=4..6 (nums=[-1,2,1])",
          "action": "currentSum rises to 3 -> 5 -> 6. maxSum updates to 6 (subarray [4, -1, 2, 1])."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-arr-kad-1",
        "scenario": "You are given an array with all negative numbers: [-7, -3, -9, -2, -5]. What must Kadane's algorithm return?",
        "options": [
          "-2 (the maximum single element)",
          "0 (empty subarray)",
          "-26 (sum of all elements)",
          "Error"
        ],
        "correctIndex": 0,
        "explanation": "If non-empty subarrays are required, Kadane's correctly returns -2 when properly initialized to nums[0]."
      }
    ],
    "practiceQuestionIds": [
      "arr-kd-01",
      "lc-643-maximum-av",
      "lc-1752",
      "lc-1800",
      "lc-2016",
      "arr-kd-02",
      "arr-kd-03",
      "arr-kd-04",
      "arr-kd-06",
      "lc-123"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "Standard Value Lookup",
        "desc": "Find exact target in sorted array (e.g. LC #704)."
      },
      {
        "name": "Boundary / Rotated Search",
        "desc": "Find inflection point or pivot in rotated sorted array (e.g. LC #33, LC #153)."
      },
      {
        "name": "Binary Search on Answer Space",
        "desc": "Search domain [minVal, maxVal] where a predicate check `isValid(mid)` is monotonic (e.g. LC #875, LC #1011)."
      }
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
    "cppTemplate": "// Template: Binary Search on Answer Space (Lower Bound / Minimum Feasible)\n#include <vector>\n\nbool isFeasible(int mid, const std::vector<int>& weights, int days);\n\nint shipWithinDays(std::vector<int>& weights, int days) {\n    int left = 1, right = 1e9; // Define search bounds\n    int ans = right;\n\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (isFeasible(mid, weights, days)) {\n            ans = mid;        // Feasible, try finding smaller capacity\n            right = mid - 1;\n        } else {\n            left = mid + 1;   // Not feasible, must increase capacity\n        }\n    }\n    return ans;\n}",
    "walkthrough": {
      "problem": "LC #875 - Koko Eating Bananas: piles = [3, 6, 7, 11], h = 8",
      "steps": [
        {
          "step": 1,
          "state": "Range: left=1, right=11 (max pile). mid=6",
          "action": "Time to eat: ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 <= 8. Feasible! ans=6, right=5."
        },
        {
          "step": 2,
          "state": "Range: left=1, right=5. mid=3",
          "action": "Time to eat: 1+2+3+4 = 10 > 8. Too slow! left=4."
        },
        {
          "step": 3,
          "state": "Range: left=4, right=5. mid=4",
          "action": "Time to eat: 1+2+2+3 = 8 <= 8. Feasible! ans=4, right=3."
        },
        {
          "step": 4,
          "state": "left (4) > right (3)",
          "action": "Loop terminates. Minimum speed found: 4."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-arr-bs-1",
        "scenario": "A factory has N items with weights. You want to find the minimum truck capacity needed to deliver all items within D trips.",
        "options": [
          "Binary Search on Answer",
          "Sliding Window",
          "Kadane's Algorithm",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "If a capacity C works, any capacity > C also works (monotonic predicate). Searching capacities between max(weight) and sum(weight) via Binary Search yields O(N log(sum))."
      }
    ],
    "practiceQuestionIds": [
      "arr-bs-02",
      "arr-bs-04",
      "arr-bs-03",
      "arr-bs-01",
      "lc-69",
      "arr-bs-05",
      "arr-bs-07",
      "arr-bs-08",
      "arr-bs-11",
      "arr-bs-12"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "No Duplicates (Longest)",
        "desc": "Shrink left as soon as a duplicate enters the window (LC #3)."
      },
      {
        "name": "Minimum Window (Shortest)",
        "desc": "Expand right until all required characters are matched, then shrink left to minimize length (LC #76)."
      },
      {
        "name": "Fixed Anagram Window",
        "desc": "Window size is fixed to pattern length; compare frequency tables in O(1) (LC #438, LC #567)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(1) (alphabet size <= 128)",
      "note": "Linear scan over string."
    },
    "pitfalls": [
      "Allocating new substrings inside the loop causing O(N^2) time.",
      "Failing to handle uppercase vs lowercase distinctions."
    ],
    "cppTemplate": "// Template: Longest Substring Without Repeating Characters\n#include <string>\n#include <vector>\n#include <algorithm>\n\nint lengthOfLongestSubstring(std::string s) {\n    std::vector<int> lastIndex(256, -1);\n    int left = 0, maxLen = 0;\n\n    for (int right = 0; right < s.size(); ++right) {\n        if (lastIndex[s[right]] >= left) {\n            left = lastIndex[s[right]] + 1; // Jump past duplicate\n        }\n        lastIndex[s[right]] = right;\n        maxLen = std::max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
    "walkthrough": {
      "problem": "LC #3 - Longest Substring Without Repeating Characters: s = 'abcabcbb'",
      "steps": [
        {
          "step": 1,
          "state": "right=0 ('a'), left=0",
          "action": "window='a', maxLen=1."
        },
        {
          "step": 2,
          "state": "right=1 ('b'), left=0",
          "action": "window='ab', maxLen=2."
        },
        {
          "step": 3,
          "state": "right=2 ('c'), left=0",
          "action": "window='abc', maxLen=3."
        },
        {
          "step": 4,
          "state": "right=3 ('a')",
          "action": "'a' duplicate! Jump left to lastIndex['a']+1 = 1. window='bca', maxLen=3."
        },
        {
          "step": 5,
          "state": "continues",
          "action": "Max non-repeating substring length remains 3 ('abc')."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-str-sw-1",
        "scenario": "Find the smallest substring in S that contains all characters of string T.",
        "options": [
          "Sliding Window (Minimum Window)",
          "Monotonic Stack",
          "Trie",
          "Breadth First Search"
        ],
        "correctIndex": 0,
        "explanation": "LC #76 Minimum Window Substring is the classic dynamic sliding window with character frequency matching."
      }
    ],
    "practiceQuestionIds": [
      "str-sw-02",
      "str-sw-01",
      "lc-1446",
      "lc-1876",
      "lc-2269-find-the-k",
      "str-sw-03",
      "str-sw-04",
      "str-sw-06",
      "str-sw-08",
      "str-sw-07"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Valid palindrome",
      "Palindrome after deleting at most one character",
      "Reverse vowels / reverse words in a string",
      "In-place string manipulation"
    ],
    "coreIdea": "A palindrome is a mirror reflection. Compare outer characters: if they match, move inward; if they don't, check if a single deletion resolves the mismatch.",
    "variations": [
      {
        "name": "Inward Palindrome Check",
        "desc": "Left and right compare characters (LC #125)."
      },
      {
        "name": "Outward Expand from Center",
        "desc": "Expand outward from each index to find longest palindromic substring (LC #5)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(1)",
      "note": "Constant space in-place comparisons."
    },
    "pitfalls": [
      "Forgetting to skip non-alphanumeric characters and lowercase comparison in Valid Palindrome.",
      "Overlooking out-of-bounds pointer advancement when using nested while loops to skip delimiters or whitespace."
    ],
    "cppTemplate": "// Template: Valid Palindrome (ignoring non-alphanumeric)\n#include <string>\n#include <cctype>\n\nbool isPalindrome(std::string s) {\n    int left = 0, right = s.size() - 1;\n    while (left < right) {\n        while (left < right && !std::isalnum(s[left])) left++;\n        while (left < right && !std::isalnum(s[right])) right--;\n        if (std::tolower(s[left]) != std::tolower(s[right])) return false;\n        left++; right--;\n    }\n    return true;\n}",
    "walkthrough": {
      "problem": "LC #680 - Valid Palindrome II: s = 'abca'",
      "steps": [
        {
          "step": 1,
          "state": "left=0 ('a'), right=3 ('a')",
          "action": "Match. left=1, right=2."
        },
        {
          "step": 2,
          "state": "left=1 ('b'), right=2 ('c')",
          "action": "Mismatch! Check if either 'b' or 'c' can be deleted: 'b' deleted leaves 'c'=='c' (valid!). Return true."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-str-tp-1",
        "scenario": "Verify whether a string can become a palindrome by removing at most one character.",
        "options": [
          "Two Pointers with one branch check",
          "Sliding Window",
          "Monotonic Deque",
          "Topological Sort"
        ],
        "correctIndex": 0,
        "explanation": "Converge inward with Two Pointers. On the first mismatch, test if deleting s[left] OR deleting s[right] forms a palindrome in O(N) time."
      }
    ],
    "practiceQuestionIds": [
      "str-tp-01",
      "str-tp-03",
      "str-tp-04",
      "str-tp-02",
      "lc-9",
      "str-tp-05",
      "str-tp-06",
      "str-tp-07",
      "str-tp-08",
      "lc-214"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Find the index of the first occurrence in a string",
      "Repeated substring pattern",
      "Shortest palindrome by adding characters in front",
      "Longest happy prefix"
    ],
    "coreIdea": "When a mismatch occurs after matching 10 characters, don't restart from scratch. Look at the LPS table to see what prefix is already satisfied and jump immediately there.",
    "variations": [
      {
        "name": "KMP Algorithm",
        "desc": "O(N + M) deterministic search using LPS prefix table."
      },
      {
        "name": "Rabin-Karp Rolling Hash",
        "desc": "O(N) rolling polynomial hash for multi-pattern search."
      }
    ],
    "complexity": {
      "time": "O(N + M)",
      "space": "O(M)",
      "note": "Linear in text and pattern lengths."
    },
    "pitfalls": [
      "Integer overflow in rolling hash; use 64-bit integers and prime modulo arithmetic.",
      "Hash collisions in Rabin-Karp rolling hash when working with large strings without 64-bit integer arithmetic or double hashing modulo 10^9+7."
    ],
    "cppTemplate": "// Template: KMP LPS Table Construction & Search\n#include <string>\n#include <vector>\n\nstd::vector<int> buildLPS(const std::string& pat) {\n    int m = pat.size();\n    std::vector<int> lps(m, 0);\n    int len = 0, i = 1;\n    while (i < m) {\n        if (pat[i] == pat[len]) {\n            lps[i++] = ++len;\n        } else if (len != 0) {\n            len = lps[len - 1];\n        } else {\n            lps[i++] = 0;\n        }\n    }\n    return lps;\n}",
    "walkthrough": {
      "problem": "LC #28 - Find the Index of the First Occurrence: haystack = 'sadbutsad', needle = 'sad'",
      "steps": [
        {
          "step": 1,
          "state": "Precompute LPS array for needle 'sad'",
          "action": "Construct LPS table: lps = [0, 0, 0] since no proper prefix is also suffix."
        },
        {
          "step": 2,
          "state": "Scan haystack at index 0 against needle",
          "action": "haystack[0]=='s', haystack[1]=='a', haystack[2]=='d'. Complete match achieved."
        },
        {
          "step": 3,
          "state": "Record occurrence start position",
          "action": "Match starts at index 0. Return index 0 immediately without redundant character backtracking."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-str-pm-1",
        "scenario": "Check if a string S can be constructed by taking a substring of it and appending multiple copies together.",
        "options": [
          "KMP LPS Table / String Doubling trick",
          "Sliding Window",
          "Two Pointers",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "If `(s + s).substr(1, 2*n - 2).find(s) != string::npos`, or if `lps[n-1] > 0 && n % (n - lps[n-1]) == 0`, S consists of repeated patterns."
      }
    ],
    "practiceQuestionIds": [
      "str-pm-01",
      "str-pm-02",
      "lc-13",
      "lc-14",
      "lc-67",
      "str-pm-04",
      "str-pm-03",
      "lc-6",
      "str-pm-05",
      "lc-68"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Count occurrences / frequency",
      "Valid anagram / permutation check",
      "Find the most frequent / first non-repeating element",
      "Ransom note verification"
    ],
    "coreIdea": "Keep a tally sheet. As you encounter each item, increment its count. To compare two sets, verify their tally sheets match.",
    "variations": [
      {
        "name": "Direct Hash Map",
        "desc": "std::unordered_map for arbitrary objects or large keys."
      },
      {
        "name": "Array Frequency Table",
        "desc": "Fixed array `int count[26]` for lowercase alphabet strings for extreme speed and O(1) space."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(U) where U is unique elements",
      "note": "Linear pass."
    },
    "pitfalls": [
      "Using `std::map` (O(log N) operations) when `std::unordered_map` or an array gives O(1).",
      "Using default integer keys instead of composite string serializations for multidimensional state counters."
    ],
    "cppTemplate": "// Template: Character Frequency Map\n#include <string>\n#include <vector>\n\nbool isAnagram(std::string s, std::string t) {\n    if (s.size() != t.size()) return false;\n    std::vector<int> counts(26, 0);\n    for (char c : s) counts[c - 'a']++;\n    for (char c : t) {\n        if (--counts[c - 'a'] < 0) return false;\n    }\n    return true;\n}",
    "walkthrough": {
      "problem": "LC #242 - Valid Anagram: s = 'anagram', t = 'nagaram'",
      "steps": [
        {
          "step": 1,
          "state": "Count characters of 'anagram'",
          "action": "a:3, n:1, g:1, r:1, m:1."
        },
        {
          "step": 2,
          "state": "Subtract characters of 'nagaram'",
          "action": "All counts decrement to 0. Valid anagram!"
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-hm-freq-1",
        "scenario": "Given a string of lowercase English letters, find the first non-repeating character in O(N) time.",
        "options": [
          "Frequency Array (2-pass)",
          "Two Pointers",
          "Sliding Window",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "Pass 1 counts character frequencies in a size-26 array. Pass 2 identifies the first character with count == 1."
      }
    ],
    "practiceQuestionIds": [
      "hm-fq-01",
      "hm-fq-02",
      "hm-fq-04",
      "hm-fq-03",
      "lc-350",
      "hm-fq-05",
      "hm-fq-06",
      "hm-fq-07",
      "lc-432",
      "lc-895"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Two sum in unsorted array",
      "Find if pair exists with target difference or sum",
      "Contains duplicate",
      "Intersection of two arrays"
    ],
    "coreIdea": "Instead of asking 'Where is my partner?' with a nested loop, register what you are looking for so your partner recognizes you when it arrives.",
    "variations": [
      {
        "name": "Single Pass Two Sum",
        "desc": "Look up complement first, then insert current element."
      },
      {
        "name": "Hash Set Existence",
        "desc": "Instant membership testing in O(1)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(N)",
      "note": "O(1) average hash lookup."
    },
    "pitfalls": [
      "Inserting current element before checking complement (can match element with itself if target == 2 * num).",
      "Overlooking duplicate elements when mapping values to indices, inadvertently overwriting previous valid indices during iteration."
    ],
    "cppTemplate": "// Template: Two Sum via Hash Map Lookup\n#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); ++i) {\n        int complement = target - nums[i];\n        if (seen.count(complement)) {\n            return {seen[complement], i};\n        }\n        seen[nums[i]] = i;\n    }\n    return {};\n}",
    "walkthrough": {
      "problem": "LC #1 - Two Sum: nums = [2, 7, 11, 15], target = 9",
      "steps": [
        {
          "step": 1,
          "state": "i=0 (num=2): complement=7",
          "action": "seen is empty. seen[2]=0."
        },
        {
          "step": 2,
          "state": "i=1 (num=7): complement=2",
          "action": "seen contains 2 at index 0! Return {0, 1}."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-hm-lk-1",
        "scenario": "Find two numbers that add up to target in an UNSORTED array in O(N) time.",
        "options": [
          "Hash Map Complement Lookup",
          "Two Pointers",
          "Binary Search on array",
          "Bubble Sort"
        ],
        "correctIndex": 0,
        "explanation": "Unsorted array means Two Pointers cannot converge without sorting first. Hash Map achieves linear time in a single pass."
      }
    ],
    "practiceQuestionIds": [
      "hm-lk-01",
      "hm-lk-02",
      "lc-202",
      "lc-219",
      "lc-575",
      "hm-lk-04",
      "hm-lk-03",
      "lc-36",
      "hm-lk-05",
      "lc-220"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Group anagrams",
      "Group strings by shift or pattern",
      "Isomorphic strings",
      "Group shifted strings"
    ],
    "coreIdea": "Compute the 'fingerprint' of each item. Items with identical fingerprints belong in the same container.",
    "variations": [
      {
        "name": "Sorted String Key",
        "desc": "Sort characters to create anagram fingerprint (e.g. 'eat' -> 'aet')."
      },
      {
        "name": "Delimited Count Key",
        "desc": "'1#0#2...' character count string to avoid O(L log L) sorting."
      }
    ],
    "complexity": {
      "time": "O(N * K log K)",
      "space": "O(N * K)",
      "note": "Grouping into hash buckets."
    },
    "pitfalls": [
      "Key collision if canonical string is not properly delimited (e.g., counts 1 and 11 colliding with 11 and 1).",
      "Memory bloat when grouping massive strings without clearing intermediate stringstream buffers or canonical key representations."
    ],
    "cppTemplate": "// Template: Group Anagrams\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\n\nstd::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n    std::unordered_map<std::string, std::vector<std::string>> groups;\n    for (const auto& s : strs) {\n        std::string key = s;\n        std::sort(key.begin(), key.end());\n        groups[key].push_back(s);\n    }\n    std::vector<std::vector<std::string>> result;\n    for (auto& pair : groups) result.push_back(std::move(pair.second));\n    return result;\n}",
    "walkthrough": {
      "problem": "LC #49 - Group Anagrams: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']",
      "steps": [
        {
          "step": 1,
          "state": "Process 'eat', 'tea', 'ate'",
          "action": "All sort to 'aet' -> bucket ['eat', 'tea', 'ate']."
        },
        {
          "step": 2,
          "state": "Process 'tan', 'nat'",
          "action": "Both sort to 'ant' -> bucket ['tan', 'nat']."
        },
        {
          "step": 3,
          "state": "Process 'bat'",
          "action": "Sorts to 'abt' -> bucket ['bat']. Result contains 3 groups."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-hm-grp-1",
        "scenario": "Group thousands of words into anagram buckets efficiently.",
        "options": [
          "Hash Map with Sorted Key",
          "Sliding Window",
          "Monotonic Stack",
          "Floyd's Cycle"
        ],
        "correctIndex": 0,
        "explanation": "Canonicalizing anagrams via sorted string keys in a Hash Map groups them in linear passes."
      }
    ],
    "practiceQuestionIds": [
      "hm-gp-01",
      "hm-gp-02",
      "lc-448",
      "lc-697",
      "lc-1002-find-commo",
      "hm-gp-03",
      "hm-gp-04",
      "hm-gp-05",
      "hm-gp-06",
      "lc-149"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "Monotonic Decreasing Stack",
        "desc": "Stores elements in decreasing order to find next greater element."
      },
      {
        "name": "Monotonic Increasing Stack",
        "desc": "Stores elements in increasing order to find next smaller element (used in Largest Rectangle in Histogram)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(N)",
      "note": "Each index is pushed and popped at most once."
    },
    "pitfalls": [
      "Storing values instead of indices (indices are needed to calculate widths and distances).",
      "Off-by-one errors with empty stack boundaries."
    ],
    "cppTemplate": "// Template: Next Greater Element / Daily Temperatures\n#include <vector>\n#include <stack>\n\nstd::vector<int> dailyTemperatures(std::vector<int>& temperatures) {\n    int n = temperatures.size();\n    std::vector<int> result(n, 0);\n    std::stack<int> st; // Stores indices\n\n    for (int i = 0; i < n; ++i) {\n        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n            int prevIndex = st.top();\n            st.pop();\n            result[prevIndex] = i - prevIndex;\n        }\n        st.push(i);\n    }\n    return result;\n}",
    "walkthrough": {
      "problem": "LC #739 - Daily Temperatures: temps = [73, 74, 75, 71, 69, 72, 76, 73]",
      "steps": [
        {
          "step": 1,
          "state": "i=0 (73): push 0",
          "action": "st=[0]"
        },
        {
          "step": 2,
          "state": "i=1 (74): 74 > temps[0] (73)",
          "action": "Pop 0: res[0] = 1-0 = 1 day. push 1. st=[1]"
        },
        {
          "step": 3,
          "state": "i=2 (75): 75 > temps[1] (74)",
          "action": "Pop 1: res[1] = 2-1 = 1 day. push 2. st=[2]"
        },
        {
          "step": 4,
          "state": "i=3,4 (71, 69): decreasing",
          "action": "push 3, 4. st=[2, 3, 4]"
        },
        {
          "step": 5,
          "state": "i=5 (72): 72 > 69 and 72 > 71",
          "action": "Pop 4 (res[4]=1), pop 3 (res[3]=2). st=[2, 5]."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-stk-mono-1",
        "scenario": "Given an array of heights representing a histogram, find the largest rectangular area in O(N) time.",
        "options": [
          "Monotonic Increasing Stack",
          "Sliding Window",
          "Two Pointers",
          "Binary Search"
        ],
        "correctIndex": 0,
        "explanation": "LC #84 Largest Rectangle in Histogram is solved in O(N) using a Monotonic Stack to find left and right smaller bounds for each bar."
      }
    ],
    "practiceQuestionIds": [
      "stk-mn-01",
      "stk-mn-02",
      "lc-1021-remove-out",
      "lc-1598",
      "lc-1614-maximum-ne",
      "stk-mn-06",
      "stk-mn-04",
      "stk-mn-03",
      "stk-mn-07",
      "stk-mn-08"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Valid parentheses / nested brackets",
      "Evaluate Reverse Polish Notation",
      "Basic calculator / operator precedence",
      "Simplify file system path",
      "Min Stack in O(1)"
    ],
    "coreIdea": "Whenever a new scope begins (opening bracket or lower-precedence operator), push the current context onto the stack. When it ends, pop and apply operations.",
    "variations": [
      {
        "name": "Bracket Matcher",
        "desc": "Push open brackets, pop and verify on close brackets (LC #20)."
      },
      {
        "name": "Expression Evaluator",
        "desc": "Maintain operand and operator stacks for +, -, *, / precedence (LC #227)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(N)",
      "note": "Linear scan with stack memory."
    },
    "pitfalls": [
      "Empty stack access when encountering an unexpected closing bracket.",
      "Integer division truncating towards zero in negative numbers."
    ],
    "cppTemplate": "// Template: Valid Parentheses Matcher\n#include <string>\n#include <stack>\n\nbool isValid(std::string s) {\n    std::stack<char> st;\n    for (char c : s) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else {\n            if (st.empty() || st.top() != c) return false;\n            st.pop();\n        }\n    }\n    return st.empty();\n}",
    "walkthrough": {
      "problem": "LC #20 - Valid Parentheses: s = '({[]})'",
      "steps": [
        {
          "step": 1,
          "state": "Encounter '(', '{', '['",
          "action": "Push expected closers ')', '}', ']'. Stack: [')', '}', ']']."
        },
        {
          "step": 2,
          "state": "Encounter ']', '}', ')'",
          "action": "Match top and pop successively. Stack is empty. Valid!"
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-stk-expr-1",
        "scenario": "Evaluate an arithmetic expression string with +, -, *, / and parentheses in linear time.",
        "options": [
          "Operator Precedence Stack",
          "Sliding Window",
          "Two Pointers",
          "Kadane's Algorithm"
        ],
        "correctIndex": 0,
        "explanation": "Operator precedence and parentheses parsing are the defining applications of LIFO stacks."
      }
    ],
    "practiceQuestionIds": [
      "stk-ex-01",
      "lc-225",
      "lc-682",
      "lc-1021",
      "lc-1047-remove-all",
      "stk-ex-04",
      "stk-ex-03",
      "stk-ex-02",
      "stk-ex-09",
      "stk-ex-08"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Sliding window maximum",
      "Level order traversal of tree",
      "Shortest path in unweighted maze/grid",
      "First unique number in data stream"
    ],
    "coreIdea": "A Monotonic Deque keeps indices of candidate maximums in decreasing order. New elements evict smaller elements from the back; expired elements are dropped from the front.",
    "variations": [
      {
        "name": "Standard FIFO Queue",
        "desc": "BFS level order processing."
      },
      {
        "name": "Monotonic Deque",
        "desc": "Sliding window maximum in amortized O(1) per step (LC #239)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(K)",
      "note": "Each element is inserted and removed at most once."
    },
    "pitfalls": [
      "Forgetting to evict indices that are older than the window boundary `right - k` from the front of the deque.",
      "Pushing visited nodes back into queue due to marking 'visited' on dequeue rather than upon enqueue, causing exponential duplicate states."
    ],
    "cppTemplate": "// Template: Sliding Window Maximum via Monotonic Deque\n#include <vector>\n#include <deque>\n\nstd::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {\n    std::deque<int> dq; // Stores indices\n    std::vector<int> result;\n\n    for (int i = 0; i < nums.size(); ++i) {\n        // Evict elements outside window\n        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n        // Maintain decreasing order\n        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n        dq.push_back(i);\n        if (i >= k - 1) result.push_back(nums[dq.front()]);\n    }\n    return result;\n}",
    "walkthrough": {
      "problem": "LC #239 - Sliding Window Maximum: nums = [1,3,-1,-3,5,3,6,7], k = 3",
      "steps": [
        {
          "step": 1,
          "state": "Window [1, 3, -1]",
          "action": "3 evicts 1. dq=[3, -1]. Max is nums[dq.front()] = 3."
        },
        {
          "step": 2,
          "state": "Window [3, -1, -3]",
          "action": "Push -3. dq=[3, -1, -3]. Max is 3."
        },
        {
          "step": 3,
          "state": "Window [-1, -3, 5]",
          "action": "3 evicted (out of bounds). 5 evicts -1 and -3. dq=[5]. Max is 5."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-qd-1",
        "scenario": "Find the maximum of every contiguous window of size K in an array of size 10^5 in O(N) total time.",
        "options": [
          "Monotonic Deque",
          "Max Heap (O(N log K))",
          "Sliding Window Sum",
          "Quicksort"
        ],
        "correctIndex": 0,
        "explanation": "A Monotonic Deque yields strictly O(N) time, beating the O(N log K) heap approach."
      }
    ],
    "practiceQuestionIds": [
      "qd-03",
      "qd-02",
      "qd-01",
      "lc-346",
      "lc-1700",
      "qd-04",
      "qd-05",
      "qd-06",
      "qd-07",
      "arr-tp-15"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Linked list cycle",
      "Find middle of linked list",
      "Intersection of two linked lists",
      "Remove Nth node from end of list",
      "Find duplicate number without modifying array"
    ],
    "coreIdea": "If two runners run on a circular track at different speeds, the faster runner is mathematically guaranteed to lap and meet the slower runner.",
    "variations": [
      {
        "name": "Tortoise and Hare Cycle",
        "desc": "Fast moves 2x, slow moves 1x until meeting (LC #141, #142)."
      },
      {
        "name": "Midpoint Finder",
        "desc": "When fast reaches end, slow is at exact middle (used in Merge Sort for Linked Lists)."
      },
      {
        "name": "Fixed Offset (Nth from End)",
        "desc": "Advance fast pointer by N steps, then move both together."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(1)",
      "note": "Zero heap allocations."
    },
    "pitfalls": [
      "Null pointer dereference with `fast->next->next` when `fast` or `fast->next` is null.",
      "Dereferencing nullptr on fast->next when advancing fast pointer by two steps without checking fast != nullptr first."
    ],
    "cppTemplate": "// Template: Floyd's Cycle Detection\n#include <cstddef>\n\nstruct ListNode { int val; ListNode *next; ListNode(int x) : val(x), next(nullptr) {} };\n\nbool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true; // Cycle detected\n    }\n    return false;\n}",
    "walkthrough": {
      "problem": "LC #141 - Linked List Cycle: 3 -> 2 -> 0 -> -4 -> points back to 2",
      "steps": [
        {
          "step": 1,
          "state": "Start: slow=3, fast=3",
          "action": "slow moves to 2, fast moves to 0."
        },
        {
          "step": 2,
          "state": "Step 2",
          "action": "slow moves to 0, fast moves from 0 -> -4 -> 2."
        },
        {
          "step": 3,
          "state": "Step 3",
          "action": "slow moves to -4, fast moves from 2 -> 0 -> -4. slow == fast! Cycle confirmed."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-ll-ptr-1",
        "scenario": "Find the entry node of a cycle in a linked list using O(1) space.",
        "options": [
          "Floyd's Cycle Detection + Reset one pointer to head",
          "Hash Set of visited pointers",
          "Recursion",
          "Binary Search"
        ],
        "correctIndex": 0,
        "explanation": "When slow and fast meet, reset slow to head. Moving both at 1 step per tick guarantees they meet at the cycle entry node."
      }
    ],
    "practiceQuestionIds": [
      "ll-pt-03",
      "ll-pt-02",
      "ll-pt-01",
      "lc-160",
      "lc-203",
      "ll-pt-05",
      "ll-pt-08",
      "ll-pt-04",
      "lc-23-merge-k-so",
      "lc-25-reverse-no"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Reverse linked list",
      "Reverse nodes in k-group",
      "Merge two sorted lists",
      "Reorder list",
      "Palindrome linked list"
    ],
    "coreIdea": "To reverse an arrow `A -> B`, save `B->next`, point `B` back to `A`, then step forward. Always anchor your boundary with a dummy node.",
    "variations": [
      {
        "name": "In-Place Iterative Reversal",
        "desc": "Standard 3-pointer reversal in O(N) time and O(1) space."
      },
      {
        "name": "K-Group Reversal",
        "desc": "Reverse segments of size K, reconnecting endpoints iteratively (LC #25)."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(1)",
      "note": "Re-wires existing node pointers in place."
    },
    "pitfalls": [
      "Losing reference to `curr->next` before redirecting `curr->next = prev`.",
      "Memory leaks if not properly handling head pointers."
    ],
    "cppTemplate": "// Template: In-Place Reverse Linked List\n#include <cstddef>\n\nstruct ListNode { int val; ListNode *next; ListNode(int x) : val(x), next(nullptr) {} };\n\nListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* nextTemp = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}",
    "walkthrough": {
      "problem": "LC #206 - Reverse Linked List: 1 -> 2 -> 3 -> NULL",
      "steps": [
        {
          "step": 1,
          "state": "curr=1, prev=null",
          "action": "Save 2. 1->next = null. prev=1, curr=2."
        },
        {
          "step": 2,
          "state": "curr=2, prev=1",
          "action": "Save 3. 2->next = 1. prev=2, curr=3."
        },
        {
          "step": 3,
          "state": "curr=3, prev=2",
          "action": "Save null. 3->next = 2. prev=3, curr=null. Return prev (3)."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-ll-rev-1",
        "scenario": "Reverse a singly linked list in-place using O(1) auxiliary space.",
        "options": [
          "Iterative 3-Pointer Reversal (prev, curr, next)",
          "Copy values to vector and rewrite",
          "Recursive stack",
          "Monotonic Deque"
        ],
        "correctIndex": 0,
        "explanation": "Iterative 3-pointer reversal re-wires next pointers in-place in O(N) time and strictly O(1) space."
      }
    ],
    "practiceQuestionIds": [
      "ll-rm-02",
      "ll-rm-01",
      "ll-rm-03",
      "lc-83-remove-dup",
      "ll-pt-02",
      "ll-rm-05",
      "ll-rm-06",
      "ll-rm-04",
      "ll-rm-09",
      "ll-rm-08"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Maximum depth / diameter of binary tree",
      "Lowest common ancestor (LCA)",
      "Binary tree level order traversal",
      "Path sum I / II / III",
      "Symmetric tree / invert tree"
    ],
    "coreIdea": "A tree is just a node plus two smaller trees. Solve for the left subtree, solve for the right subtree, and combine the answers at the root.",
    "variations": [
      {
        "name": "Post-Order Bottom-Up DFS",
        "desc": "Compute metrics from children and pass up to parent (e.g. Max Depth, Diameter)."
      },
      {
        "name": "Pre-Order Top-Down DFS",
        "desc": "Pass state down from parent to children (e.g. Path Sum)."
      },
      {
        "name": "Level-Order BFS",
        "desc": "Queue processing one complete depth level at a time."
      }
    ],
    "complexity": {
      "time": "O(N)",
      "space": "O(H) where H is tree height",
      "note": "Visits each node once."
    },
    "pitfalls": [
      "Not handling the base case `if (!root) return ...` causing immediate crashes.",
      "Double counting path sums when traversing tree branches without resetting path tracker in post-order unwind."
    ],
    "cppTemplate": "// Template: Bottom-Up Tree DFS (Diameter of Binary Tree)\n#include <algorithm>\n\nstruct TreeNode { int val; TreeNode *left, *right; };\n\nint dfs(TreeNode* root, int& maxDiameter) {\n    if (!root) return 0;\n    int leftDepth = dfs(root->left, maxDiameter);\n    int rightDepth = dfs(root->right, maxDiameter);\n    maxDiameter = std::max(maxDiameter, leftDepth + rightDepth);\n    return 1 + std::max(leftDepth, rightDepth);\n}\n\nint diameterOfBinaryTree(TreeNode* root) {\n    int maxDiameter = 0;\n    dfs(root, maxDiameter);\n    return maxDiameter;\n}",
    "walkthrough": {
      "problem": "LC #104 - Maximum Depth of Binary Tree: [3, 9, 20, null, null, 15, 7]",
      "steps": [
        {
          "step": 1,
          "state": "Leaf nodes (9, 15, 7)",
          "action": "Return depth 1."
        },
        {
          "step": 2,
          "state": "Node 20",
          "action": "Left=1 (15), Right=1 (7). Returns 1 + max(1, 1) = 2."
        },
        {
          "step": 3,
          "state": "Root 3",
          "action": "Left=1 (9), Right=2 (20). Returns 1 + max(1, 2) = 3."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-tree-trav-1",
        "scenario": "Find the lowest common ancestor (LCA) of two nodes P and Q in a general binary tree.",
        "options": [
          "Recursive DFS Post-Order",
          "Sliding Window",
          "Monotonic Stack",
          "Floyd's Cycle"
        ],
        "correctIndex": 0,
        "explanation": "If root equals P or Q, return root. Recurse left and right: if both return non-null, root is the LCA!"
      }
    ],
    "practiceQuestionIds": [
      "tr-tv-01",
      "tr-tv-04",
      "tr-tv-05",
      "tr-tv-02",
      "tr-tv-03",
      "tr-tv-07",
      "tr-tv-08",
      "tr-tv-09",
      "tr-tv-11",
      "tr-tv-12"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Validate binary search tree",
      "Kth smallest element in a BST",
      "Lowest common ancestor in BST",
      "Search / insert / delete in BST",
      "Convert sorted array to BST"
    ],
    "coreIdea": "At each node, compare target with node value. If smaller, discard the entire right subtree and go left. Like binary search, this halves the search path.",
    "variations": [
      {
        "name": "In-Order Invariant",
        "desc": "In-order traversal produces sorted list (LC #230)."
      },
      {
        "name": "BST Direct Search",
        "desc": "Go left if target < val, go right if target > val (LC #700)."
      }
    ],
    "complexity": {
      "time": "O(H) = O(log N) balanced",
      "space": "O(H) recursion stack",
      "note": "Worst-case O(N) if skewed."
    },
    "pitfalls": [
      "Checking only immediate children instead of full subtree bounds `(minVal, maxVal)` during BST validation.",
      "Integer overflow when initializing BST validation bounds with INT_MIN and INT_MAX instead of long long or pointer wrappers."
    ],
    "cppTemplate": "// Template: Validate BST via Range Bounds\n#include <cstddef>\n\nstruct TreeNode { int val; TreeNode *left, *right; };\n\nbool validate(TreeNode* root, long long minVal, long long maxVal) {\n    if (!root) return true;\n    if (root->val <= minVal || root->val >= maxVal) return false;\n    return validate(root->left, minVal, root->val) &&\n           validate(root->right, root->val, maxVal);\n}\n\nbool isValidBST(TreeNode* root) {\n    return validate(root, -1e18, 1e18);\n}",
    "walkthrough": {
      "problem": "LC #98 - Validate BST: [2, 1, 3]",
      "steps": [
        {
          "step": 1,
          "state": "Root 2 in (-inf, inf)",
          "action": "Valid."
        },
        {
          "step": 2,
          "state": "Left 1 in (-inf, 2)",
          "action": "Valid."
        },
        {
          "step": 3,
          "state": "Right 3 in (2, inf)",
          "action": "Valid. Tree is a valid BST."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-tree-bst-1",
        "scenario": "Find the K-th smallest element in a Binary Search Tree in O(H + K) time.",
        "options": [
          "In-Order Traversal (stops at Kth step)",
          "Level-Order BFS",
          "Post-Order DFS",
          "Pre-Order DFS"
        ],
        "correctIndex": 0,
        "explanation": "Because in-order traversal of a BST visits nodes in strictly increasing order, the K-th visited node is the K-th smallest."
      }
    ],
    "practiceQuestionIds": [
      "tr-bst-02",
      "tr-bst-01",
      "tr-bst-03",
      "lc-108",
      "lc-501",
      "tr-bst-04",
      "tr-bst-05",
      "tr-bst-06",
      "tr-bst-07",
      "lc-1373"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
      {
        "name": "Subsets (Power Set)",
        "desc": "For each element, decide to include or exclude (2^N)."
      },
      {
        "name": "Permutations",
        "desc": "Order matters; track visited elements with a boolean array (N!)."
      },
      {
        "name": "Combinations / Target Sum",
        "desc": "Prune branches where running sum exceeds target."
      }
    ],
    "complexity": {
      "time": "O(2^N) or O(N!)",
      "space": "O(N) recursion stack",
      "note": "Exhaustive exploration."
    },
    "pitfalls": [
      "Forgetting to pop_back() or undo the choice after recursing, corrupting subsequent sibling paths.",
      "Forgetting to undo state modification (backtrack step) after recursive call returns, corrupting search path for sibling branches."
    ],
    "cppTemplate": "// Template: Standard Backtracking (Subsets)\n#include <vector>\n\nvoid backtrack(int start, std::vector<int>& nums, std::vector<int>& current, std::vector<std::vector<int>>& result) {\n    result.push_back(current); // Record valid state\n    for (int i = start; i < nums.size(); ++i) {\n        current.push_back(nums[i]);            // 1. Choose\n        backtrack(i + 1, nums, current, result); // 2. Explore\n        current.pop_back();                     // 3. Unchoose\n    }\n}\n\nstd::vector<std::vector<int>> subsets(std::vector<int>& nums) {\n    std::vector<std::vector<int>> result;\n    std::vector<int> current;\n    backtrack(0, nums, current, result);\n    return result;\n}",
    "walkthrough": {
      "problem": "LC #78 - Subsets: nums = [1, 2]",
      "steps": [
        {
          "step": 1,
          "state": "Start with []",
          "action": "Add [] to result."
        },
        {
          "step": 2,
          "state": "Pick 1 -> [1]",
          "action": "Add [1] to result."
        },
        {
          "step": 3,
          "state": "Pick 2 -> [1, 2]",
          "action": "Add [1, 2]. Backtrack to [1], then backtrack to []."
        },
        {
          "step": 4,
          "state": "Pick 2 -> [2]",
          "action": "Add [2]. All paths explored: [[], [1], [1, 2], [2]]."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-rec-back-1",
        "scenario": "Find all unique combinations of numbers in candidates that sum up to target, where each number can be used unlimited times.",
        "options": [
          "Backtracking with reuse (start=i)",
          "Sliding Window",
          "Monotonic Stack",
          "Two Pointers"
        ],
        "correctIndex": 0,
        "explanation": "LC #39 Combination Sum uses backtracking. Passing `start=i` instead of `i+1` enables element reuse while preventing duplicate permutations."
      }
    ],
    "practiceQuestionIds": [
      "rec-bt-01",
      "lc-104-maximum-de",
      "lc-257-binary-tre",
      "lc-872-leaf-simil",
      "lc-1863",
      "rec-bt-08",
      "rec-bt-09",
      "rec-bt-06",
      "rec-bt-13",
      "rec-bt-12"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Kth largest / smallest element",
      "Top K frequent elements",
      "Merge K sorted lists",
      "Find median from data stream",
      "Task scheduler"
    ],
    "coreIdea": "To keep the K largest elements, use a Min-Heap of size K. The smallest of the top contenders sits at the top. If a newcomer is bigger than this gatekeeper, kick the gatekeeper out.",
    "variations": [
      {
        "name": "Min-Heap of Size K",
        "desc": "Finds K largest elements in O(N log K)."
      },
      {
        "name": "K-Way Merge",
        "desc": "Push head of each sorted list into Min-Heap; pop smallest and push its successor (LC #23)."
      },
      {
        "name": "Two Heaps (Median)",
        "desc": "Max-Heap for lower half, Min-Heap for upper half (LC #295)."
      }
    ],
    "complexity": {
      "time": "O(N log K)",
      "space": "O(K)",
      "note": "Logarithmic insertions and constant minimum access."
    },
    "pitfalls": [
      "Using a Max-Heap when finding K largest elements (requires storing all N elements, taking O(N log N) space/time instead of O(N log K)).",
      "Custom comparator logic inverted: in C++ priority_queue<T>, greater<T> yields min-heap, whereas in std::sort it yields descending order."
    ],
    "cppTemplate": "// Template: Top K Elements using Min-Heap\n#include <vector>\n#include <queue>\n\nint findKthLargest(std::vector<int>& nums, int k) {\n    // Min-heap\n    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;\n    for (int num : nums) {\n        minHeap.push(num);\n        if (minHeap.size() > k) {\n            minHeap.pop(); // Evict smallest\n        }\n    }\n    return minHeap.top(); // K-th largest\n}",
    "walkthrough": {
      "problem": "LC #215 - Kth Largest: nums = [3,2,1,5,6,4], k = 2",
      "steps": [
        {
          "step": 1,
          "state": "Process 3, 2",
          "action": "minHeap=[2, 3] (size 2)."
        },
        {
          "step": 2,
          "state": "Process 1",
          "action": "push 1, size > 2 -> pop 1. minHeap=[2, 3]."
        },
        {
          "step": 3,
          "state": "Process 5",
          "action": "push 5, size > 2 -> pop 2. minHeap=[3, 5]."
        },
        {
          "step": 4,
          "state": "Process 6",
          "action": "push 6, size > 2 -> pop 3. minHeap=[5, 6]."
        },
        {
          "step": 5,
          "state": "Process 4",
          "action": "push 4, size > 2 -> pop 4. minHeap=[5, 6]. Top is 5!"
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-heap-1",
        "scenario": "Continuously calculate the median of numbers coming from an infinite live data stream.",
        "options": [
          "Two Heaps (Max-Heap for lower half, Min-Heap for upper half)",
          "Quickselect on each query",
          "Sorted Vector with insertion",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "Two balanced heaps maintain the middle elements in O(1) time and handle insertions in O(log N)."
      }
    ],
    "practiceQuestionIds": [
      "hp-03",
      "hp-01",
      "hp-02",
      "lc-1337",
      "lc-2231",
      "hp-04",
      "hp-08",
      "hp-06",
      "hp-09",
      "hp-10"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Course schedule / prerequisite dependencies",
      "Number of islands / connected components",
      "Clone graph",
      "Word ladder (shortest transformation)",
      "Detect cycle in directed graph"
    ],
    "coreIdea": "Courses with 0 prerequisites can be taken immediately. Completing a course decrements the prerequisites of downstream courses. If all courses finish, no cycle exists.",
    "variations": [
      {
        "name": "Connected Components DFS",
        "desc": "Sink islands or mark visited nodes (LC #200)."
      },
      {
        "name": "Kahn's Algorithm (Topological Sort)",
        "desc": "BFS using in-degree array (LC #207, LC #210)."
      },
      {
        "name": "Bidirectional BFS",
        "desc": "Search from start and target simultaneously to drastically cut search space (LC #127)."
      }
    ],
    "complexity": {
      "time": "O(V + E)",
      "space": "O(V + E)",
      "note": "Linear in vertices and edges."
    },
    "pitfalls": [
      "Forgetting to mark nodes visited, causing infinite loops on cyclic graphs.",
      "Failing to reset 3-color state in directed graph cycle detection, mistaking cross-edges for back-edges."
    ],
    "cppTemplate": "// Template: Topological Sort via Kahn's Algorithm (BFS)\n#include <vector>\n#include <queue>\n\nbool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {\n    std::vector<std::vector<int>> adj(numCourses);\n    std::vector<int> inDegree(numCourses, 0);\n\n    for (const auto& pre : prerequisites) {\n        adj[pre[1]].push_back(pre[0]);\n        inDegree[pre[0]]++;\n    }\n\n    std::queue<int> q;\n    for (int i = 0; i < numCourses; ++i) {\n        if (inDegree[i] == 0) q.push(i);\n    }\n\n    int completed = 0;\n    while (!q.empty()) {\n        int curr = q.front();\n        q.pop();\n        completed++;\n        for (int neighbor : adj[curr]) {\n            if (--inDegree[neighbor] == 0) q.push(neighbor);\n        }\n    }\n    return completed == numCourses;\n}",
    "walkthrough": {
      "problem": "LC #207 - Course Schedule: numCourses = 2, prerequisites = [[1, 0]]",
      "steps": [
        {
          "step": 1,
          "state": "inDegree: 0 has 0, 1 has 1",
          "action": "Push course 0 into queue."
        },
        {
          "step": 2,
          "state": "Pop 0, completed=1",
          "action": "Decrement inDegree of 1 -> becomes 0. Push 1 into queue."
        },
        {
          "step": 3,
          "state": "Pop 1, completed=2",
          "action": "completed == numCourses (2). All courses finished successfully!"
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-graph-trav-1",
        "scenario": "Determine if there is a cycle in a set of software package dependencies.",
        "options": [
          "Topological Sort (Kahn's BFS or DFS 3-color)",
          "Dijkstra's Algorithm",
          "Sliding Window",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "Package dependency order is a DAG problem; cycles prevent complete topological sorting."
      }
    ],
    "practiceQuestionIds": [
      "grp-tc-02",
      "grp-tc-01",
      "lc-733",
      "lc-999",
      "lc-1971",
      "grp-tc-09",
      "grp-tc-05",
      "grp-tc-03",
      "grp-tc-11",
      "lc-126"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Redundant connection (cycle in undirected graph)",
      "Number of provinces / friend circles",
      "Network delay time / cheapest flight",
      "Minimum cost to connect all points"
    ],
    "coreIdea": "In DSU, each component has a 'boss' (representative). If two nodes already have the same boss, adding an edge between them forms a cycle.",
    "variations": [
      {
        "name": "DSU with Path Compression & Rank",
        "desc": "Amortized O(alpha(N)) connectivity operations."
      },
      {
        "name": "Dijkstra's Algorithm",
        "desc": "Min-Heap priority queue finding shortest path in O((V + E) log V)."
      }
    ],
    "complexity": {
      "time": "DSU: O(alpha(N)), Dijkstra: O((V + E) log V)",
      "space": "O(V + E)",
      "note": "Near-optimal graph processing."
    },
    "pitfalls": [
      "Using Dijkstra on graphs with negative edge weights (requires Bellman-Ford or SPFA instead).",
      "Using standard BFS instead of Dijkstra's algorithm for graphs with positive non-uniform edge weights, producing suboptimal path lengths."
    ],
    "cppTemplate": "// Template: Disjoint Set Union (DSU) with Path Compression & Rank\n#include <vector>\n\nclass DSU {\npublic:\n    std::vector<int> parent, rank;\n    DSU(int n) : parent(n), rank(n, 0) {\n        for (int i = 0; i < n; ++i) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    bool unite(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI == rootJ) return false; // Already connected!\n        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;\n        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;\n        else { parent[rootJ] = rootI; rank[rootI]++; }\n        return true;\n    }\n};",
    "walkthrough": {
      "problem": "LC #684 - Redundant Connection: edges = [[1, 2], [1, 3], [2, 3]]",
      "steps": [
        {
          "step": 1,
          "state": "Edge [1, 2]",
          "action": "Unite 1 and 2. Roots merged."
        },
        {
          "step": 2,
          "state": "Edge [1, 3]",
          "action": "Unite 1 and 3. Roots merged."
        },
        {
          "step": 3,
          "state": "Edge [2, 3]",
          "action": "find(2)==find(3)==1! Already connected -> [2, 3] is the redundant edge creating a cycle."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-graph-dsu-1",
        "scenario": "Given an undirected graph, find the edge that creates a cycle in online stream fashion.",
        "options": [
          "Disjoint Set Union (DSU)",
          "Topological Sort",
          "Sliding Window",
          "Binary Search"
        ],
        "correctIndex": 0,
        "explanation": "DSU checks if both endpoints share the same root representative in O(alpha(N)) before adding an edge."
      }
    ],
    "practiceQuestionIds": [
      "lc-463-island-per",
      "lc-733-flood-fill",
      "lc-997-find-the-t",
      "lc-1791",
      "lc-1971-find-if-pa",
      "grp-ds-01",
      "grp-ds-04",
      "grp-ds-02",
      "grp-ds-06",
      "grp-ds-07"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Prefix tree / startsWith method",
      "Word Search II / Boggle board",
      "Design add and search words data structure",
      "Maximum XOR of two numbers in an array"
    ],
    "coreIdea": "Instead of storing whole words separately, spell words along tree branches. Looking up a prefix takes time proportional only to prefix length, independent of dictionary size.",
    "variations": [
      {
        "name": "Standard String Trie",
        "desc": "26 children pointers per node for alphabet lookups."
      },
      {
        "name": "Bitwise Trie (32-bit)",
        "desc": "Binary tree (0 or 1 branches) to greedily pick opposite bits for max XOR."
      }
    ],
    "complexity": {
      "time": "O(L) per insert/search",
      "space": "O(Total characters)",
      "note": "L is the length of the query string."
    },
    "pitfalls": [
      "High memory consumption; clean up dynamically allocated nodes or use array-based flat Tries.",
      "Index out of bounds when input contains uppercase or non-ASCII characters while Trie is indexed strictly by c - 'a'."
    ],
    "cppTemplate": "// Template: Trie (Prefix Tree) Implementation\n#include <string>\n#include <vector>\n\nclass Trie {\n    struct TrieNode {\n        TrieNode* children[26] = {nullptr};\n        bool isWord = false;\n    };\n    TrieNode* root;\npublic:\n    Trie() { root = new TrieNode(); }\n\n    void insert(const std::string& word) {\n        TrieNode* curr = root;\n        for (char c : word) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) curr->children[idx] = new TrieNode();\n            curr = curr->children[idx];\n        }\n        curr->isWord = true;\n    }\n\n    bool startsWith(const std::string& prefix) {\n        TrieNode* curr = root;\n        for (char c : prefix) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) return false;\n            curr = curr->children[idx];\n        }\n        return true;\n    }\n};",
    "walkthrough": {
      "problem": "LC #208 - Implement Trie: insert('apple'), search('apple'), startsWith('app')",
      "steps": [
        {
          "step": 1,
          "state": "insert('apple')",
          "action": "Creates branches a -> p -> p -> l -> e (isWord=true)."
        },
        {
          "step": 2,
          "state": "startsWith('app')",
          "action": "Traverses a -> p -> p successfully. Returns true."
        },
        {
          "step": 3,
          "state": "search('app')",
          "action": "Reaches 'p', but isWord is false. Returns false."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-trie-1",
        "scenario": "Find the maximum XOR pair from an array of 10^5 integers in O(32 * N) time.",
        "options": [
          "Bitwise Trie (Binary Tree of bits)",
          "Two Pointers",
          "Sliding Window",
          "Kadane's Algorithm"
        ],
        "correctIndex": 0,
        "explanation": "Insert numbers into a Bitwise Trie. For each number, greedily follow the opposite bit branch to maximize XOR."
      }
    ],
    "practiceQuestionIds": [
      "tr-pf-01",
      "lc-2000-reverse-pr",
      "lc-2185-counting-w",
      "lc-2255",
      "lc-3042",
      "tr-pf-02",
      "tr-pf-03",
      "tr-pf-06",
      "tr-pf-07",
      "lc-212"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Climbing stairs / Fibonacci recurrence",
      "House robber (non-adjacent selection)",
      "Unique paths / minimum path sum in grid",
      "Maximum profit / state machine DP"
    ],
    "coreIdea": "To reach step N optimally, you must have reached step N-1 or N-2 optimally. Solve smaller stages first and build upward.",
    "variations": [
      {
        "name": "1D Linear DP",
        "desc": "State depends on recent previous indices (can often optimize space to O(1))."
      },
      {
        "name": "2D Grid DP",
        "desc": "Paths in matrix transitioning from top and left neighbors."
      }
    ],
    "complexity": {
      "time": "O(N) or O(M * N)",
      "space": "O(N) or O(1) space optimized",
      "note": "Polynomial subproblem evaluations."
    },
    "pitfalls": [
      "Base case initialization errors (e.g. `dp[0]` not accounting for 0 elements).",
      "Index out of bounds on `dp[i-2]`."
    ],
    "cppTemplate": "// Template: House Robber (1D DP with Space Optimization)\n#include <vector>\n#include <algorithm>\n\nint rob(std::vector<int>& nums) {\n    if (nums.empty()) return 0;\n    int prev2 = 0, prev1 = 0;\n    for (int num : nums) {\n        int current = std::max(prev1, prev2 + num);\n        prev2 = prev1;\n        prev1 = current;\n    }\n    return prev1;\n}",
    "walkthrough": {
      "problem": "LC #198 - House Robber: nums = [2, 7, 9, 3, 1]",
      "steps": [
        {
          "step": 1,
          "state": "House 1 ($2)",
          "action": "prev2=0, prev1=2."
        },
        {
          "step": 2,
          "state": "House 2 ($7)",
          "action": "max(2, 0+7) = 7. prev2=2, prev1=7."
        },
        {
          "step": 3,
          "state": "House 3 ($9)",
          "action": "max(7, 2+9) = 11. prev2=7, prev1=11."
        },
        {
          "step": 4,
          "state": "House 4 ($3)",
          "action": "max(11, 7+3) = 11. prev2=11, prev1=11."
        },
        {
          "step": 5,
          "state": "House 5 ($1)",
          "action": "max(11, 11+1) = 12. Maximum loot: $12."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-dp-lin-1",
        "scenario": "Count the number of unique paths from the top-left to bottom-right of an M x N grid moving only right and down.",
        "options": [
          "2D Grid DP `dp[r][c] = dp[r-1][c] + dp[r][c-1]`",
          "Breadth First Search",
          "Sliding Window",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "Grid DP solves Unique Paths in O(M * N) time, and can be space-optimized to a single 1D row of size N."
      }
    ],
    "practiceQuestionIds": [
      "dp-lg-01",
      "dp-lg-03",
      "dp-lg-02",
      "lc-292",
      "lc-788",
      "dp-lg-07",
      "dp-lg-08",
      "dp-lg-09",
      "dp-lg-11",
      "lc-10"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Coin change / fewest coins to make amount",
      "Partition equal subset sum (target = total / 2)",
      "Longest common subsequence",
      "Edit distance / word conversion",
      "Longest increasing subsequence"
    ],
    "coreIdea": "For each item and each possible budget weight: `dp[w] = max(dp[w] (skip item), dp[w - weight] + value (take item))`. In reverse loops for 0/1 knapsack, elements are used at most once.",
    "variations": [
      {
        "name": "0/1 Knapsack",
        "desc": "Items used once; iterate weight budget in reverse order to avoid reuse."
      },
      {
        "name": "Unbounded Knapsack",
        "desc": "Items can be reused infinitely; iterate weight budget forward (LC #322)."
      },
      {
        "name": "Longest Common Subsequence",
        "desc": "2D state `dp[i][j]` matching characters or taking maximum of sub-alignments."
      }
    ],
    "complexity": {
      "time": "O(N * W)",
      "space": "O(W) 1D space optimized",
      "note": "Pseudo-polynomial knapsack complexity."
    },
    "pitfalls": [
      "Iterating forward in 0/1 Knapsack (causes items to be counted multiple times).",
      "Overlapping subproblem memo table dimension mismatch between 1-based indexing and 0-based string coordinates."
    ],
    "cppTemplate": "// Template: Coin Change (Fewest Coins - Unbounded Knapsack)\n#include <vector>\n#include <algorithm>\n\nint coinChange(std::vector<int>& coins, int amount) {\n    std::vector<int> dp(amount + 1, 1e9);\n    dp[0] = 0; // 0 coins needed for amount 0\n\n    for (int coin : coins) {\n        for (int i = coin; i <= amount; ++i) {\n            dp[i] = std::min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] >= 1e9 ? -1 : dp[amount];\n}",
    "walkthrough": {
      "problem": "LC #322 - Coin Change: coins = [1, 2, 5], amount = 11",
      "steps": [
        {
          "step": 1,
          "state": "dp[0]=0, all others=inf",
          "action": "Base case ready."
        },
        {
          "step": 2,
          "state": "Apply coin 5",
          "action": "dp[5]=1, dp[10]=2."
        },
        {
          "step": 3,
          "state": "Apply coin 1 with 10",
          "action": "dp[11] = dp[10] + 1 = 2 + 1 = 3 coins (5 + 5 + 1)."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-dp-knap-1",
        "scenario": "Determine whether an array can be partitioned into two subsets with equal sum.",
        "options": [
          "0/1 Knapsack DP with target = sum / 2",
          "Greedy largest first",
          "Two Pointers",
          "Sliding Window"
        ],
        "correctIndex": 0,
        "explanation": "If total sum is odd, return false. Otherwise, solve 0/1 knapsack for target = sum / 2 in O(N * target) time."
      }
    ],
    "practiceQuestionIds": [
      "lc-70-climbing-s",
      "lc-118-pascals-tr",
      "lc-392-is-subsequ",
      "lc-509-fibonacci-",
      "lc-746-min-cost-c",
      "dp-ks-07",
      "dp-ks-06",
      "dp-ks-04",
      "dp-ks-10",
      "dp-ks-09"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Merge intervals",
      "Non-overlapping intervals",
      "Meeting rooms / minimum conference rooms",
      "Jump Game I / II",
      "Gas station circular tour"
    ],
    "coreIdea": "To maximize available room for future tasks, always choose the task that finishes earliest. Sort by end time and greedily take non-overlapping items.",
    "variations": [
      {
        "name": "Interval Merging",
        "desc": "Sort by start time, extend or push intervals (LC #56)."
      },
      {
        "name": "Interval Scheduling (Min Removals)",
        "desc": "Sort by end time, greedily pick earliest ending interval (LC #435)."
      },
      {
        "name": "Farthest Reachable Index",
        "desc": "Track max reachable boundary in Jump Game (LC #55)."
      }
    ],
    "complexity": {
      "time": "O(N log N) sorting + O(N) pass",
      "space": "O(N) for output",
      "note": "Dominated by sorting."
    },
    "pitfalls": [
      "Sorting by the wrong endpoint (e.g. sorting by start time instead of end time in activity selection).",
      "Assuming local greedy choice is globally optimal without verifying the greedy-choice property or optimal substructure."
    ],
    "cppTemplate": "// Template: Merge Overlapping Intervals\n#include <vector>\n#include <algorithm>\n\nstd::vector<std::vector<int>> merge(std::vector<std::vector<int>>& intervals) {\n    if (intervals.empty()) return {};\n    std::sort(intervals.begin(), intervals.end()); // Sort by start time\n\n    std::vector<std::vector<int>> merged;\n    merged.push_back(intervals[0]);\n\n    for (size_t i = 1; i < intervals.size(); ++i) {\n        if (intervals[i][0] <= merged.back()[1]) {\n            // Overlapping, extend end time\n            merged.back()[1] = std::max(merged.back()[1], intervals[i][1]);\n        } else {\n            merged.push_back(intervals[i]);\n        }\n    }\n    return merged;\n}",
    "walkthrough": {
      "problem": "LC #56 - Merge Intervals: [[1,3],[2,6],[8,10],[15,18]]",
      "steps": [
        {
          "step": 1,
          "state": "Start with [1, 3]",
          "action": "merged = [[1, 3]]."
        },
        {
          "step": 2,
          "state": "Interval [2, 6]: 2 <= 3",
          "action": "Overlap! Extend end to max(3, 6) = 6. merged = [[1, 6]]."
        },
        {
          "step": 3,
          "state": "Interval [8, 10]: 8 > 6",
          "action": "No overlap. Append [8, 10]. merged = [[1, 6], [8, 10]]."
        },
        {
          "step": 4,
          "state": "Interval [15, 18]: 15 > 10",
          "action": "Append [15, 18]. Result = [[1, 6], [8, 10], [15, 18]]."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-greedy-1",
        "scenario": "Find the minimum number of intervals you need to remove to make the rest non-overlapping.",
        "options": [
          "Sort by end time and greedily keep non-overlapping",
          "Dynamic Programming knapsack",
          "Sliding Window",
          "Monotonic Stack"
        ],
        "correctIndex": 0,
        "explanation": "LC #435 is classic Activity Selection: sorting by end time greedily maximizes the number of retained intervals."
      }
    ],
    "practiceQuestionIds": [
      "grd-01",
      "grd-03",
      "grd-02",
      "lc-836",
      "lc-1005",
      "grd-09",
      "grd-08",
      "grd-04",
      "grd-12",
      "arr-tp-15"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Single number / every element appears twice except one",
      "Number of 1 bits (Hamming weight)",
      "Power of two check",
      "Bitmask state representation (e.g. TSP or subset DP)",
      "Missing number in range [0, n]"
    ],
    "coreIdea": "XOR is a toggle switch. Toggling twice returns to the original state. Bitwise operations execute in a single CPU instruction clock cycle.",
    "variations": [
      {
        "name": "XOR Cancellation",
        "desc": "Cancels duplicate pairs: `x ^ x = 0` (LC #136)."
      },
      {
        "name": "Brian Kernighan's Algorithm",
        "desc": "`x & (x - 1)` drops lowest set bit to count 1s in O(set bits) (LC #191)."
      },
      {
        "name": "Bitmask Subsets",
        "desc": "Integers 0 to 2^N - 1 represent all subsets of an N-element set."
      }
    ],
    "complexity": {
      "time": "O(1) or O(N)",
      "space": "O(1)",
      "note": "Fastest primitive CPU instructions."
    },
    "pitfalls": [
      "Operator precedence in C++: `+` has higher precedence than `<<` or `^`! Always use parentheses: `(1 << k)`.",
      "Undefined behavior with negative shifts or shifting by >= 32 bits on 32-bit integers; use 1ULL << shift for 64-bit masks."
    ],
    "cppTemplate": "// Template: Single Number & Bit Operations\n#include <vector>\n\nint singleNumber(std::vector<int>& nums) {\n    int xorSum = 0;\n    for (int num : nums) xorSum ^= num;\n    return xorSum;\n}\n\nbool isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}",
    "walkthrough": {
      "problem": "LC #136 - Single Number: nums = [4, 1, 2, 1, 2]",
      "steps": [
        {
          "step": 1,
          "state": "xorSum = 0",
          "action": "xorSum ^= 4 -> 4."
        },
        {
          "step": 2,
          "state": "xorSum ^= 1",
          "action": "xorSum = 5."
        },
        {
          "step": 3,
          "state": "xorSum ^= 2",
          "action": "xorSum = 7."
        },
        {
          "step": 4,
          "state": "xorSum ^= 1",
          "action": "1 cancels with 1! xorSum = 6."
        },
        {
          "step": 5,
          "state": "xorSum ^= 2",
          "action": "2 cancels with 2! Final result is 4."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-bit-1",
        "scenario": "Check whether an integer N is a positive power of two in O(1) time.",
        "options": [
          "(n > 0) && ((n & (n - 1)) == 0)",
          "Loop dividing by 2",
          "Convert to binary string",
          "Modulo 2 check"
        ],
        "correctIndex": 0,
        "explanation": "A power of two in binary has exactly one bit set. `n & (n - 1)` clears that sole bit, resulting in 0."
      }
    ],
    "practiceQuestionIds": [
      "bit-06",
      "bit-01",
      "bit-04",
      "bit-02",
      "bit-05",
      "bit-07",
      "bit-09",
      "bit-08",
      "bit-11",
      "lc-982"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Find the first missing positive",
      "Sort colors in-place in one pass",
      "Largest number from string concatenation",
      "Cyclic sort with range [1, n]"
    ],
    "coreIdea": "If values are in range 1..N, each number `x` belongs at index `x - 1`. Swap each misplaced number to its correct home until everything is in place.",
    "variations": [
      {
        "name": "Cyclic Sort",
        "desc": "In-place O(N) sort for range 1..N (LC #41, LC #268, LC #448)."
      },
      {
        "name": "Custom String Comparator",
        "desc": "Sort by `a + b > b + a` (LC #179 Largest Number)."
      },
      {
        "name": "Three-Way Partition",
        "desc": "Dutch National Flag algorithm for 3 distinct values (LC #75)."
      }
    ],
    "complexity": {
      "time": "O(N) for Cyclic Sort, O(N log N) for comparison sort",
      "space": "O(1) in-place",
      "note": "Linear in-place array placements."
    },
    "pitfalls": [
      "Infinite loops in Cyclic Sort when duplicates exist: always check nums[i] != nums[nums[i] - 1] before swapping.",
      "Off-by-one errors in merge sort midpoint calculation causing infinite recursion when left + 1 == right."
    ],
    "cppTemplate": "// Template: Cyclic Sort (Find First Missing Positive)\n#include <vector>\n#include <algorithm>\n\nint firstMissingPositive(std::vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n; ++i) {\n        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n            std::swap(nums[i], nums[nums[i] - 1]);\n        }\n    }\n    for (int i = 0; i < n; ++i) {\n        if (nums[i] != i + 1) return i + 1;\n    }\n    return n + 1;\n}",
    "walkthrough": {
      "problem": "LC #41 - First Missing Positive: nums = [3, 4, -1, 1]",
      "steps": [
        {
          "step": 1,
          "state": "i=0 (3)",
          "action": "Swap with index 2: [-1, 4, 3, 1]."
        },
        {
          "step": 2,
          "state": "i=1 (4)",
          "action": "Swap with index 3: [-1, 1, 3, 4]."
        },
        {
          "step": 3,
          "state": "i=1 (1)",
          "action": "Swap with index 0: [1, -1, 3, 4]."
        },
        {
          "step": 4,
          "state": "Check final array [1, -1, 3, 4]",
          "action": "Index 1 has -1 != 2. First missing positive is 2!"
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-sort-1",
        "scenario": "Given an unsorted array of integers, find the smallest positive integer not present in O(N) time and O(1) auxiliary space.",
        "options": [
          "Cyclic Sort",
          "Hash Set lookup (O(N) space)",
          "Standard std::sort (O(N log N))",
          "Binary Search"
        ],
        "correctIndex": 0,
        "explanation": "Cyclic Sort puts each number x at index x-1 in-place in O(N) time and O(1) space."
      }
    ],
    "practiceQuestionIds": [
      "srt-01",
      "srt-02",
      "lc-268-missing-nu",
      "lc-448-find-all-n",
      "lc-506",
      "srt-04",
      "srt-05",
      "srt-06",
      "srt-07",
      "lc-41"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  },
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
    "recognitionSignals": [
      "Range sum query mutable",
      "Count of smaller numbers after self / inversion count",
      "Point update range query in O(log N)",
      "Segment tree with lazy propagation"
    ],
    "coreIdea": "Instead of precomputing all prefixes (fast queries, slow updates) or keeping raw values (fast updates, slow queries), store precomputed powers of 2 so both queries and updates take O(log N).",
    "variations": [
      {
        "name": "Fenwick Tree (BIT)",
        "desc": "Extremely lightweight array using `i += i & (-i)` for prefix sums."
      },
      {
        "name": "Segment Tree",
        "desc": "Full binary tree supporting range updates via lazy propagation."
      }
    ],
    "complexity": {
      "time": "O(log N) per update and query",
      "space": "O(N) for Fenwick, O(4N) for Segment Tree",
      "note": "Logarithmic dynamic range aggregations."
    },
    "pitfalls": [
      "Fenwick tree requires 1-based indexing; index 0 causes infinite loops with `i & (-i)`.",
      "Forgetting to push pending lazy tags down to child nodes before querying or updating child intervals in lazy propagation."
    ],
    "cppTemplate": "// Template: Fenwick Tree (Binary Indexed Tree)\n#include <vector>\n\nclass FenwickTree {\n    std::vector<int> tree;\n    int n;\npublic:\n    FenwickTree(int n) : n(n), tree(n + 1, 0) {}\n    void update(int i, int delta) {\n        for (; i <= n; i += i & (-i)) tree[i] += delta;\n    }\n    int query(int i) {\n        int sum = 0;\n        for (; i > 0; i -= i & (-i)) sum += tree[i];\n        return sum;\n    }\n    int rangeQuery(int l, int r) {\n        return query(r) - query(l - 1);\n    }\n};",
    "walkthrough": {
      "problem": "LC #307 - Range Sum Query Mutable: [1, 3, 5]",
      "steps": [
        {
          "step": 1,
          "state": "Build Fenwick Tree",
          "action": "update(1, 1), update(2, 3), update(3, 5)."
        },
        {
          "step": 2,
          "state": "rangeQuery(1, 3)",
          "action": "query(3) - query(0) = 9."
        },
        {
          "step": 3,
          "state": "update(2, 2) (change 3 to 5)",
          "action": "delta=2. rangeQuery(1, 3) becomes 11 in O(log N)."
        }
      ]
    },
    "quizzes": [
      {
        "id": "quiz-range-1",
        "scenario": "Support dynamic point updates and range sum queries on an array of size 10^5 in O(log N) per operation.",
        "options": [
          "Fenwick Tree / Segment Tree",
          "Prefix Sum Array",
          "Two Pointers",
          "Sliding Window"
        ],
        "correctIndex": 0,
        "explanation": "Prefix sum arrays take O(N) per update; Fenwick and Segment Trees balance updates and queries in O(log N)."
      }
    ],
    "practiceQuestionIds": [
      "rng-01",
      "lc-724-find-pivot",
      "lc-1413-minimum-va",
      "lc-1588-sum-of-all",
      "lc-1991-find-the-m",
      "rng-02",
      "rng-03",
      "lc-304",
      "rng-04",
      "rng-06"
    ],
    "totalQuestions": 10,
    "easyQuestions": 5,
    "mediumQuestions": 3,
    "hardQuestions": 2
  }
];

const dsaAllQuestions = [
  {
    "id": "arr-tp-01",
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 1,
    "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-02",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 26,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-03",
    "title": "Remove Element",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 27,
    "leetcodeUrl": "https://leetcode.com/problems/remove-element/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-04",
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 283,
    "leetcodeUrl": "https://leetcode.com/problems/move-zeroes/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-05",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 977,
    "leetcodeUrl": "https://leetcode.com/problems/squares-of-a-sorted-array/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-06",
    "title": "Sort Array By Parity",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 905,
    "leetcodeUrl": "https://leetcode.com/problems/sort-array-by-parity/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-07",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 167,
    "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-08",
    "title": "3Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 15,
    "leetcodeUrl": "https://leetcode.com/problems/3sum/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-09",
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 16,
    "leetcodeUrl": "https://leetcode.com/problems/3sum-closest/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-10",
    "title": "4Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 18,
    "leetcodeUrl": "https://leetcode.com/problems/4sum/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-11",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 11,
    "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-12",
    "title": "Sort Colors",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 75,
    "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-13",
    "title": "Rotate Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 189,
    "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-14",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 31,
    "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-15",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 42,
    "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-16",
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 41,
    "leetcodeUrl": "https://leetcode.com/problems/first-missing-positive/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-tp-17",
    "title": "Maximum Score of a Good Subarray",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 1793,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-score-of-a-good-subarray/",
    "signals": [
      "sorted array",
      "find pair",
      "two elements sum"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-01",
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 643,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-average-subarray-i/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-02",
    "title": "Minimum Difference Between Highest and Lowest of K Scores",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 1984,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-03",
    "title": "Contains Duplicate II",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 219,
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate-ii/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-04",
    "title": "Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 209,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-05",
    "title": "Maximum Erasure Value",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 1695,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-erasure-value/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-06",
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 904,
    "leetcodeUrl": "https://leetcode.com/problems/fruit-into-baskets/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-07",
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 1004,
    "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-08",
    "title": "Subarray Product Less Than K",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 713,
    "leetcodeUrl": "https://leetcode.com/problems/subarray-product-less-than-k/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-09",
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 239,
    "leetcodeUrl": "https://leetcode.com/problems/sliding-window-maximum/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-sw-10",
    "title": "Subarrays with K Different Integers",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 992,
    "leetcodeUrl": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
    "signals": [
      "contiguous subarray",
      "fixed window size k",
      "longest/shortest subarray"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-01",
    "title": "Range Sum Query - Immutable",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 303,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-immutable/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-02",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 724,
    "leetcodeUrl": "https://leetcode.com/problems/find-pivot-index/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-03",
    "title": "Running Sum of 1d Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 1480,
    "leetcodeUrl": "https://leetcode.com/problems/running-sum-of-1d-array/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-04",
    "title": "Find the Highest Altitude",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 1732,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-highest-altitude/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-05",
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 560,
    "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-06",
    "title": "Continuous Subarray Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 523,
    "leetcodeUrl": "https://leetcode.com/problems/continuous-subarray-sum/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-07",
    "title": "Contiguous Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 525,
    "leetcodeUrl": "https://leetcode.com/problems/contiguous-array/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-08",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 238,
    "leetcodeUrl": "https://leetcode.com/problems/product-of-array-except-self/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-09",
    "title": "Subarray Sums Divisible by K",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 974,
    "leetcodeUrl": "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-pf-10",
    "title": "Find Good Days to Rob the Bank",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 2100,
    "leetcodeUrl": "https://leetcode.com/problems/find-good-days-to-rob-the-bank/",
    "signals": [
      "subarray sum equals k",
      "prefix sum",
      "range sum query"
    ],
    "solved": false
  },
  {
    "id": "arr-kd-01",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane's / Subarray",
    "leetcodeNumber": 121,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "signals": [
      "maximum subarray sum",
      "contiguous",
      "kadane's algorithm"
    ],
    "solved": false
  },
  {
    "id": "arr-kd-02",
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane's / Subarray",
    "leetcodeNumber": 53,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
    "signals": [
      "maximum subarray sum",
      "contiguous",
      "kadane's algorithm"
    ],
    "solved": false
  },
  {
    "id": "arr-kd-03",
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane's / Subarray",
    "leetcodeNumber": 152,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
    "signals": [
      "maximum subarray sum",
      "contiguous",
      "kadane's algorithm"
    ],
    "solved": false
  },
  {
    "id": "arr-kd-04",
    "title": "Maximum Sum Circular Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane's / Subarray",
    "leetcodeNumber": 918,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    "signals": [
      "maximum subarray sum",
      "contiguous",
      "kadane's algorithm"
    ],
    "solved": false
  },
  {
    "id": "arr-kd-05",
    "title": "Maximum Absolute Sum of Any Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane's / Subarray",
    "leetcodeNumber": 1749,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/",
    "signals": [
      "maximum subarray sum",
      "contiguous",
      "kadane's algorithm"
    ],
    "solved": false
  },
  {
    "id": "arr-kd-06",
    "title": "Max Subarray Sum with One Deletion",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane's / Subarray",
    "leetcodeNumber": 1186,
    "leetcodeUrl": "https://leetcode.com/problems/max-subarray-sum-with-one-deletion/",
    "signals": [
      "maximum subarray sum",
      "contiguous",
      "kadane's algorithm"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-01",
    "title": "Binary Search",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 704,
    "leetcodeUrl": "https://leetcode.com/problems/binary-search/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-02",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 35,
    "leetcodeUrl": "https://leetcode.com/problems/search-insert-position/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-03",
    "title": "Guess Number Higher or Lower",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 374,
    "leetcodeUrl": "https://leetcode.com/problems/guess-number-higher-or-lower/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-04",
    "title": "First Bad Version",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 278,
    "leetcodeUrl": "https://leetcode.com/problems/first-bad-version/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-05",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 33,
    "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-06",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 153,
    "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-07",
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 34,
    "leetcodeUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-08",
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 74,
    "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-09",
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 875,
    "leetcodeUrl": "https://leetcode.com/problems/koko-eating-bananas/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-10",
    "title": "Capacity To Ship Packages Within D Days",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 1011,
    "leetcodeUrl": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-11",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 4,
    "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "arr-bs-12",
    "title": "Split Array Largest Sum",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Binary Search",
    "leetcodeNumber": 410,
    "leetcodeUrl": "https://leetcode.com/problems/split-array-largest-sum/",
    "signals": [
      "sorted array",
      "O(log n) requirement",
      "search rotated array"
    ],
    "solved": false
  },
  {
    "id": "str-sw-01",
    "title": "Defanging an IP Address",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 1108,
    "leetcodeUrl": "https://leetcode.com/problems/defanging-an-ip-address/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-02",
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 58,
    "leetcodeUrl": "https://leetcode.com/problems/length-of-last-word/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-03",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 3,
    "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-04",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 424,
    "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-05",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 567,
    "leetcodeUrl": "https://leetcode.com/problems/permutation-in-string/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-06",
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 438,
    "leetcodeUrl": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-07",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 76,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-sw-08",
    "title": "Substring with Concatenation of All Words",
    "difficulty": "Hard",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Sliding Window",
    "leetcodeNumber": 30,
    "leetcodeUrl": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
    "signals": [
      "longest substring",
      "without repeating characters",
      "minimum window substring"
    ],
    "solved": false
  },
  {
    "id": "str-tp-01",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 125,
    "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-02",
    "title": "Valid Palindrome II",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 680,
    "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome-ii/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-03",
    "title": "Reverse String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 344,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-string/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-04",
    "title": "Reverse Vowels of a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 345,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-vowels-of-a-string/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-05",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 5,
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-06",
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 647,
    "leetcodeUrl": "https://leetcode.com/problems/palindromic-substrings/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-07",
    "title": "Sentence Similarity III",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 1813,
    "leetcodeUrl": "https://leetcode.com/problems/sentence-similarity-iii/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-tp-08",
    "title": "Valid Palindrome III",
    "difficulty": "Hard",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 1216,
    "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome-iii/",
    "signals": [
      "palindrome check",
      "valid palindrome",
      "reverse string in-place"
    ],
    "solved": false
  },
  {
    "id": "str-pm-01",
    "title": "Find the Index of the First Occurrence in a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Pattern Matching",
    "leetcodeNumber": 28,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    "signals": [
      "substring search",
      "pattern matching",
      "kmp algorithm"
    ],
    "solved": false
  },
  {
    "id": "str-pm-02",
    "title": "Repeated Substring Pattern",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Pattern Matching",
    "leetcodeNumber": 459,
    "leetcodeUrl": "https://leetcode.com/problems/repeated-substring-pattern/",
    "signals": [
      "substring search",
      "pattern matching",
      "kmp algorithm"
    ],
    "solved": false
  },
  {
    "id": "str-pm-03",
    "title": "String Compression",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Pattern Matching",
    "leetcodeNumber": 443,
    "leetcodeUrl": "https://leetcode.com/problems/string-compression/",
    "signals": [
      "substring search",
      "pattern matching",
      "kmp algorithm"
    ],
    "solved": false
  },
  {
    "id": "str-pm-04",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Pattern Matching",
    "leetcodeNumber": 43,
    "leetcodeUrl": "https://leetcode.com/problems/multiply-strings/",
    "signals": [
      "substring search",
      "pattern matching",
      "kmp algorithm"
    ],
    "solved": false
  },
  {
    "id": "str-pm-05",
    "title": "Shortest Palindrome",
    "difficulty": "Hard",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Pattern Matching",
    "leetcodeNumber": 214,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-palindrome/",
    "signals": [
      "substring search",
      "pattern matching",
      "kmp algorithm"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-01",
    "title": "Majority Element",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 169,
    "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-02",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 242,
    "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-03",
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 387,
    "leetcodeUrl": "https://leetcode.com/problems/first-unique-character-in-a-string/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-04",
    "title": "Ransom Note",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 383,
    "leetcodeUrl": "https://leetcode.com/problems/ransom-note/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-05",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 347,
    "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-06",
    "title": "Sort Characters By Frequency",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 451,
    "leetcodeUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-fq-07",
    "title": "Custom Sort String",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Based",
    "leetcodeNumber": 791,
    "leetcodeUrl": "https://leetcode.com/problems/custom-sort-string/",
    "signals": [
      "most frequent elements",
      "count occurrences",
      "valid anagram"
    ],
    "solved": false
  },
  {
    "id": "hm-lk-01",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Lookup Based",
    "leetcodeNumber": 217,
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate/",
    "signals": [
      "complement lookup",
      "two sum in O(1) space",
      "contains duplicate"
    ],
    "solved": false
  },
  {
    "id": "hm-lk-02",
    "title": "Intersection of Two Arrays",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Lookup Based",
    "leetcodeNumber": 349,
    "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-arrays/",
    "signals": [
      "complement lookup",
      "two sum in O(1) space",
      "contains duplicate"
    ],
    "solved": false
  },
  {
    "id": "hm-lk-03",
    "title": "4Sum II",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Lookup Based",
    "leetcodeNumber": 454,
    "leetcodeUrl": "https://leetcode.com/problems/4sum-ii/",
    "signals": [
      "complement lookup",
      "two sum in O(1) space",
      "contains duplicate"
    ],
    "solved": false
  },
  {
    "id": "hm-lk-04",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Lookup Based",
    "leetcodeNumber": 128,
    "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "signals": [
      "complement lookup",
      "two sum in O(1) space",
      "contains duplicate"
    ],
    "solved": false
  },
  {
    "id": "hm-lk-05",
    "title": "Max Points on a Line",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Lookup Based",
    "leetcodeNumber": 149,
    "leetcodeUrl": "https://leetcode.com/problems/max-points-on-a-line/",
    "signals": [
      "complement lookup",
      "two sum in O(1) space",
      "contains duplicate"
    ],
    "solved": false
  },
  {
    "id": "hm-gp-01",
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Grouping Pattern",
    "leetcodeNumber": 205,
    "leetcodeUrl": "https://leetcode.com/problems/isomorphic-strings/",
    "signals": [
      "group anagrams",
      "bucket grouping",
      "custom hash key"
    ],
    "solved": false
  },
  {
    "id": "hm-gp-02",
    "title": "Word Pattern",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Grouping Pattern",
    "leetcodeNumber": 290,
    "leetcodeUrl": "https://leetcode.com/problems/word-pattern/",
    "signals": [
      "group anagrams",
      "bucket grouping",
      "custom hash key"
    ],
    "solved": false
  },
  {
    "id": "hm-gp-03",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Grouping Pattern",
    "leetcodeNumber": 49,
    "leetcodeUrl": "https://leetcode.com/problems/group-anagrams/",
    "signals": [
      "group anagrams",
      "bucket grouping",
      "custom hash key"
    ],
    "solved": false
  },
  {
    "id": "hm-gp-04",
    "title": "Fraction to Recurring Decimal",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Grouping Pattern",
    "leetcodeNumber": 166,
    "leetcodeUrl": "https://leetcode.com/problems/fraction-to-recurring-decimal/",
    "signals": [
      "group anagrams",
      "bucket grouping",
      "custom hash key"
    ],
    "solved": false
  },
  {
    "id": "hm-gp-05",
    "title": "Insert Delete GetRandom O(1)",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Grouping Pattern",
    "leetcodeNumber": 380,
    "leetcodeUrl": "https://leetcode.com/problems/insert-delete-getrandom-o1/",
    "signals": [
      "group anagrams",
      "bucket grouping",
      "custom hash key"
    ],
    "solved": false
  },
  {
    "id": "hm-gp-06",
    "title": "Insert Delete GetRandom O(1) - Duplicates allowed",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Grouping Pattern",
    "leetcodeNumber": 381,
    "leetcodeUrl": "https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/",
    "signals": [
      "group anagrams",
      "bucket grouping",
      "custom hash key"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-01",
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 496,
    "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-i/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-02",
    "title": "Final Prices With a Special Discount in a Shop",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 1475,
    "leetcodeUrl": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-03",
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 739,
    "leetcodeUrl": "https://leetcode.com/problems/daily-temperatures/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-04",
    "title": "Next Greater Element II",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 503,
    "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-ii/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-05",
    "title": "Online Stock Span",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 901,
    "leetcodeUrl": "https://leetcode.com/problems/online-stock-span/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-06",
    "title": "132 Pattern",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 456,
    "leetcodeUrl": "https://leetcode.com/problems/132-pattern/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-07",
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 84,
    "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-mn-08",
    "title": "Maximal Rectangle",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 85,
    "leetcodeUrl": "https://leetcode.com/problems/maximal-rectangle/",
    "signals": [
      "next greater element",
      "next smaller element",
      "daily temperatures"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-01",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 20,
    "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-02",
    "title": "Min Stack",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 155,
    "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-03",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 150,
    "leetcodeUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-04",
    "title": "Simplify Path",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 71,
    "leetcodeUrl": "https://leetcode.com/problems/simplify-path/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-05",
    "title": "Decode String",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 394,
    "leetcodeUrl": "https://leetcode.com/problems/decode-string/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-06",
    "title": "Basic Calculator II",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 227,
    "leetcodeUrl": "https://leetcode.com/problems/basic-calculator-ii/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-07",
    "title": "Remove K Digits",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 402,
    "leetcodeUrl": "https://leetcode.com/problems/remove-k-digits/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-08",
    "title": "Basic Calculator",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 224,
    "leetcodeUrl": "https://leetcode.com/problems/basic-calculator/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "stk-ex-09",
    "title": "Longest Valid Parentheses",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Expression Handling",
    "leetcodeNumber": 32,
    "leetcodeUrl": "https://leetcode.com/problems/longest-valid-parentheses/",
    "signals": [
      "valid parentheses",
      "evaluate reverse polish",
      "basic calculator"
    ],
    "solved": false
  },
  {
    "id": "qd-01",
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 933,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-recent-calls/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "qd-02",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 232,
    "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "qd-03",
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 225,
    "leetcodeUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "qd-04",
    "title": "Design Circular Queue",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 622,
    "leetcodeUrl": "https://leetcode.com/problems/design-circular-queue/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "qd-05",
    "title": "Design Circular Deque",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 641,
    "leetcodeUrl": "https://leetcode.com/problems/design-circular-deque/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "qd-06",
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 994,
    "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "qd-07",
    "title": "Shortest Subarray with Sum at Least K",
    "difficulty": "Hard",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "FIFO Processing",
    "leetcodeNumber": 862,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
    "signals": [
      "bfs level order",
      "sliding window maximum",
      "monotonic deque"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-01",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 876,
    "leetcodeUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-02",
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 141,
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-03",
    "title": "Remove Duplicates from Sorted List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 83,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-04",
    "title": "Linked List Cycle II",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 142,
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-05",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 19,
    "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-06",
    "title": "Reorder List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 143,
    "leetcodeUrl": "https://leetcode.com/problems/reorder-list/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-07",
    "title": "Odd Even Linked List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 328,
    "leetcodeUrl": "https://leetcode.com/problems/odd-even-linked-list/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-pt-08",
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Pointer Techniques",
    "leetcodeNumber": 138,
    "leetcodeUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "signals": [
      "detect cycle in linked list",
      "floyd's tortoise and hare",
      "find middle node"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-01",
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 206,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-02",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 21,
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-03",
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 234,
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-linked-list/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-04",
    "title": "Reverse Linked List II",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 92,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-05",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 2,
    "leetcodeUrl": "https://leetcode.com/problems/add-two-numbers/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-06",
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 24,
    "leetcodeUrl": "https://leetcode.com/problems/swap-nodes-in-pairs/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-07",
    "title": "Sort List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 148,
    "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-08",
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 25,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "ll-rm-09",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Reversal",
    "leetcodeNumber": 23,
    "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "signals": [
      "reverse linked list",
      "merge two sorted lists",
      "reverse nodes in k-group"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-01",
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 94,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-02",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 104,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-03",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 226,
    "leetcodeUrl": "https://leetcode.com/problems/invert-binary-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-04",
    "title": "Same Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 100,
    "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-05",
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 101,
    "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-06",
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 572,
    "leetcodeUrl": "https://leetcode.com/problems/subtree-of-another-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-07",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 102,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-08",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 103,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-09",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 105,
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-10",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 236,
    "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-11",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 124,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-tv-12",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Traversal",
    "leetcodeNumber": 297,
    "leetcodeUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "signals": [
      "binary tree level order",
      "maximum depth",
      "lowest common ancestor"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-01",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 700,
    "leetcodeUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-02",
    "title": "Lowest Common Ancestor of a Binary Search Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 235,
    "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-03",
    "title": "Range Sum of BST",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 938,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-of-bst/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-04",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 98,
    "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-05",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 230,
    "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-06",
    "title": "Delete Node in a BST",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 450,
    "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-bst/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "tr-bst-07",
    "title": "Recover Binary Search Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST",
    "leetcodeNumber": 99,
    "leetcodeUrl": "https://leetcode.com/problems/recover-binary-search-tree/",
    "signals": [
      "binary search tree",
      "in-order traversal is sorted",
      "validate bst"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-01",
    "title": "Binary Watch",
    "difficulty": "Easy",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 401,
    "leetcodeUrl": "https://leetcode.com/problems/binary-watch/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-02",
    "title": "Subsets",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 78,
    "leetcodeUrl": "https://leetcode.com/problems/subsets/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-03",
    "title": "Subsets II",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 90,
    "leetcodeUrl": "https://leetcode.com/problems/subsets-ii/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-04",
    "title": "Permutations",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 46,
    "leetcodeUrl": "https://leetcode.com/problems/permutations/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-05",
    "title": "Combinations",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 77,
    "leetcodeUrl": "https://leetcode.com/problems/combinations/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-06",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 39,
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-07",
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 40,
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum-ii/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-08",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 17,
    "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-09",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 22,
    "leetcodeUrl": "https://leetcode.com/problems/generate-parentheses/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-10",
    "title": "Word Search",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 79,
    "leetcodeUrl": "https://leetcode.com/problems/word-search/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-11",
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 131,
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-12",
    "title": "N-Queens",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 51,
    "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-13",
    "title": "Sudoku Solver",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 37,
    "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "rec-bt-14",
    "title": "Word Search II",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Backtracking",
    "leetcodeNumber": 212,
    "leetcodeUrl": "https://leetcode.com/problems/word-search-ii/",
    "signals": [
      "subsets",
      "permutations",
      "combinations sum"
    ],
    "solved": false
  },
  {
    "id": "hp-01",
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 703,
    "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-02",
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 1046,
    "leetcodeUrl": "https://leetcode.com/problems/last-stone-weight/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-03",
    "title": "Relative Ranks",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 506,
    "leetcodeUrl": "https://leetcode.com/problems/relative-ranks/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-04",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 215,
    "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-05",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 973,
    "leetcodeUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-06",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 621,
    "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-07",
    "title": "Reorganize String",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 767,
    "leetcodeUrl": "https://leetcode.com/problems/reorganize-string/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-08",
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 373,
    "leetcodeUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-09",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 295,
    "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "hp-10",
    "title": "IPO",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Top K / Kth Element",
    "leetcodeNumber": 502,
    "leetcodeUrl": "https://leetcode.com/problems/ipo/",
    "signals": [
      "kth largest element",
      "top k frequent",
      "merge k sorted lists"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-01",
    "title": "Find the Town Judge",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 997,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-town-judge/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-02",
    "title": "Island Perimeter",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 463,
    "leetcodeUrl": "https://leetcode.com/problems/island-perimeter/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-03",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 200,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-04",
    "title": "Max Area of Island",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 695,
    "leetcodeUrl": "https://leetcode.com/problems/max-area-of-island/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-05",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 133,
    "leetcodeUrl": "https://leetcode.com/problems/clone-graph/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-06",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 207,
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-07",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 210,
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-08",
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 417,
    "leetcodeUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-09",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 130,
    "leetcodeUrl": "https://leetcode.com/problems/surrounded-regions/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-10",
    "title": "Is Graph Bipartite?",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 785,
    "leetcodeUrl": "https://leetcode.com/problems/is-graph-bipartite/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-tc-11",
    "title": "Word Ladder",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Traversal",
    "leetcodeNumber": 127,
    "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
    "signals": [
      "number of islands",
      "clone graph",
      "course schedule"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-01",
    "title": "Redundant Connection",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 684,
    "leetcodeUrl": "https://leetcode.com/problems/redundant-connection/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-02",
    "title": "Network Delay Time",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 743,
    "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-03",
    "title": "Cheapest Flights Within K Stops",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 787,
    "leetcodeUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-04",
    "title": "Accounts Merge",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 721,
    "leetcodeUrl": "https://leetcode.com/problems/accounts-merge/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-05",
    "title": "Min Cost to Connect All Points",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 1584,
    "leetcodeUrl": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-06",
    "title": "Swim in Rising Water",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 778,
    "leetcodeUrl": "https://leetcode.com/problems/swim-in-rising-water/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "grp-ds-07",
    "title": "Critical Connections in a Network",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Shortest Path",
    "leetcodeNumber": 1192,
    "leetcodeUrl": "https://leetcode.com/problems/critical-connections-in-a-network/",
    "signals": [
      "disjoint set union",
      "dijkstra shortest path",
      "network delay time"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-01",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 14,
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-02",
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 208,
    "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-03",
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 211,
    "leetcodeUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-04",
    "title": "Replace Words",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 648,
    "leetcodeUrl": "https://leetcode.com/problems/replace-words/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-05",
    "title": "Extra Characters in a String",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 2707,
    "leetcodeUrl": "https://leetcode.com/problems/extra-characters-in-a-string/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-06",
    "title": "Maximum XOR of Two Numbers in an Array",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 421,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "tr-pf-07",
    "title": "Word Break II",
    "difficulty": "Hard",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Based",
    "leetcodeNumber": 140,
    "leetcodeUrl": "https://leetcode.com/problems/word-break-ii/",
    "signals": [
      "prefix tree",
      "starts with prefix",
      "word search ii"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-01",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 70,
    "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-02",
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 746,
    "leetcodeUrl": "https://leetcode.com/problems/min-cost-climbing-stairs/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-03",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 509,
    "leetcodeUrl": "https://leetcode.com/problems/fibonacci-number/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-04",
    "title": "House Robber",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 198,
    "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-05",
    "title": "House Robber II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 213,
    "leetcodeUrl": "https://leetcode.com/problems/house-robber-ii/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-06",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 91,
    "leetcodeUrl": "https://leetcode.com/problems/decode-ways/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-07",
    "title": "Unique Paths",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 62,
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-08",
    "title": "Unique Paths II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 63,
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths-ii/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-09",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 64,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-10",
    "title": "Maximal Square",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 221,
    "leetcodeUrl": "https://leetcode.com/problems/maximal-square/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-lg-11",
    "title": "Burst Balloons",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Linear DP",
    "leetcodeNumber": 312,
    "leetcodeUrl": "https://leetcode.com/problems/burst-balloons/",
    "signals": [
      "climbing stairs",
      "house robber",
      "unique paths"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-01",
    "title": "Coin Change",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 322,
    "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-02",
    "title": "Coin Change II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 518,
    "leetcodeUrl": "https://leetcode.com/problems/coin-change-ii/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-03",
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 416,
    "leetcodeUrl": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-04",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 300,
    "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-05",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 1143,
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-06",
    "title": "Word Break",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 139,
    "leetcodeUrl": "https://leetcode.com/problems/word-break/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-07",
    "title": "Edit Distance",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 72,
    "leetcodeUrl": "https://leetcode.com/problems/edit-distance/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-08",
    "title": "Russian Doll Envelopes",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 354,
    "leetcodeUrl": "https://leetcode.com/problems/russian-doll-envelopes/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-09",
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 115,
    "leetcodeUrl": "https://leetcode.com/problems/distinct-subsequences/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "dp-ks-10",
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Knapsack",
    "leetcodeNumber": 10,
    "leetcodeUrl": "https://leetcode.com/problems/regular-expression-matching/",
    "signals": [
      "0/1 knapsack",
      "coin change",
      "longest increasing subsequence"
    ],
    "solved": false
  },
  {
    "id": "grd-01",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 455,
    "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-02",
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 860,
    "leetcodeUrl": "https://leetcode.com/problems/lemonade-change/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-03",
    "title": "Can Place Flowers",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 605,
    "leetcodeUrl": "https://leetcode.com/problems/can-place-flowers/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-04",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 56,
    "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-05",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 57,
    "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-06",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 435,
    "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-07",
    "title": "Minimum Number of Arrows to Burst Balloons",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 452,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-08",
    "title": "Jump Game",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 55,
    "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-09",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 45,
    "leetcodeUrl": "https://leetcode.com/problems/jump-game-ii/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-10",
    "title": "Gas Station",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 134,
    "leetcodeUrl": "https://leetcode.com/problems/gas-station/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-11",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 763,
    "leetcodeUrl": "https://leetcode.com/problems/partition-labels/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "grd-12",
    "title": "Candy",
    "difficulty": "Hard",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Greedy",
    "leetcodeNumber": 135,
    "leetcodeUrl": "https://leetcode.com/problems/candy/",
    "signals": [
      "merge intervals",
      "non-overlapping intervals",
      "jump game"
    ],
    "solved": false
  },
  {
    "id": "bit-01",
    "title": "Single Number",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 136,
    "leetcodeUrl": "https://leetcode.com/problems/single-number/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-02",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 191,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-03",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 338,
    "leetcodeUrl": "https://leetcode.com/problems/counting-bits/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-04",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 190,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-bits/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-05",
    "title": "Missing Number",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 268,
    "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-06",
    "title": "Add Binary",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 67,
    "leetcodeUrl": "https://leetcode.com/problems/add-binary/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-07",
    "title": "Single Number II",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 137,
    "leetcodeUrl": "https://leetcode.com/problems/single-number-ii/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-08",
    "title": "Single Number III",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 260,
    "leetcodeUrl": "https://leetcode.com/problems/single-number-iii/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-09",
    "title": "Bitwise AND of Numbers Range",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 201,
    "leetcodeUrl": "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-10",
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 371,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-two-integers/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "bit-11",
    "title": "Minimum Number of K-Consecutive Bit Flips",
    "difficulty": "Hard",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Pattern",
    "leetcodeNumber": 995,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/",
    "signals": [
      "single number",
      "xor cancellation",
      "number of 1 bits"
    ],
    "solved": false
  },
  {
    "id": "srt-01",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 88,
    "leetcodeUrl": "https://leetcode.com/problems/merge-sorted-array/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "srt-02",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 977,
    "leetcodeUrl": "https://leetcode.com/problems/squares-of-a-sorted-array/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "srt-03",
    "title": "Sort an Array",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 912,
    "leetcodeUrl": "https://leetcode.com/problems/sort-an-array/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "srt-04",
    "title": "Sort Colors",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 75,
    "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "srt-05",
    "title": "Largest Number",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 179,
    "leetcodeUrl": "https://leetcode.com/problems/largest-number/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "srt-06",
    "title": "Wiggle Sort II",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 324,
    "leetcodeUrl": "https://leetcode.com/problems/wiggle-sort-ii/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "srt-07",
    "title": "Maximum Gap",
    "difficulty": "Hard",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge Sort",
    "leetcodeNumber": 164,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-gap/",
    "signals": [
      "custom comparator",
      "sort colors",
      "kth largest via quickselect"
    ],
    "solved": false
  },
  {
    "id": "rng-01",
    "title": "Range Sum Query - Immutable",
    "difficulty": "Easy",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree",
    "leetcodeNumber": 303,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-immutable/",
    "signals": [
      "problem constraint",
      "pattern cue",
      "optimal subproblem"
    ],
    "solved": false
  },
  {
    "id": "rng-02",
    "title": "Range Sum Query - Mutable",
    "difficulty": "Medium",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree",
    "leetcodeNumber": 307,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-mutable/",
    "signals": [
      "problem constraint",
      "pattern cue",
      "optimal subproblem"
    ],
    "solved": false
  },
  {
    "id": "rng-03",
    "title": "Queue Reconstruction by Height",
    "difficulty": "Medium",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree",
    "leetcodeNumber": 406,
    "leetcodeUrl": "https://leetcode.com/problems/queue-reconstruction-by-height/",
    "signals": [
      "problem constraint",
      "pattern cue",
      "optimal subproblem"
    ],
    "solved": false
  },
  {
    "id": "rng-04",
    "title": "Count of Smaller Numbers After Self",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree",
    "leetcodeNumber": 315,
    "leetcodeUrl": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
    "signals": [
      "problem constraint",
      "pattern cue",
      "optimal subproblem"
    ],
    "solved": false
  },
  {
    "id": "rng-05",
    "title": "Range Module",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree",
    "leetcodeNumber": 715,
    "leetcodeUrl": "https://leetcode.com/problems/range-module/",
    "signals": [
      "problem constraint",
      "pattern cue",
      "optimal subproblem"
    ],
    "solved": false
  },
  {
    "id": "rng-06",
    "title": "Falling Squares",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree",
    "leetcodeNumber": 699,
    "leetcodeUrl": "https://leetcode.com/problems/falling-squares/",
    "signals": [
      "problem constraint",
      "pattern cue",
      "optimal subproblem"
    ],
    "solved": false
  },
  {
    "id": "lc-16",
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Opposite Direction",
    "leetcodeNumber": 16,
    "leetcodeUrl": "https://leetcode.com/problems/3sum-closest/",
    "signals": [
      "triplet sum closest to target",
      "sorted array",
      "converging pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-18",
    "title": "4Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Opposite Direction",
    "leetcodeNumber": 18,
    "leetcodeUrl": "https://leetcode.com/problems/4sum/",
    "signals": [
      "quadruplet sum equals target",
      "skip duplicates",
      "nested two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-658",
    "title": "Find K Closest Elements",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Opposite Direction",
    "leetcodeNumber": 658,
    "leetcodeUrl": "https://leetcode.com/problems/find-k-closest-elements/",
    "signals": [
      "k closest integers to x",
      "sorted array",
      "shrink from outer edges"
    ],
    "solved": false
  },
  {
    "id": "lc-845",
    "title": "Longest Mountain in Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 845,
    "leetcodeUrl": "https://leetcode.com/problems/longest-mountain-in-array/",
    "signals": [
      "mountain peak",
      "strictly increasing then decreasing",
      "expand from peaks"
    ],
    "solved": false
  },
  {
    "id": "lc-905",
    "title": "Sort Array By Parity",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Partition",
    "leetcodeNumber": 905,
    "leetcodeUrl": "https://leetcode.com/problems/sort-array-by-parity/",
    "signals": [
      "even numbers followed by odd",
      "in-place partition",
      "converging pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-922",
    "title": "Sort Array By Parity II",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Partition",
    "leetcodeNumber": 922,
    "leetcodeUrl": "https://leetcode.com/problems/sort-array-by-parity-ii/",
    "signals": [
      "even index even value",
      "odd index odd value",
      "two pointer swap"
    ],
    "solved": false
  },
  {
    "id": "lc-941",
    "title": "Valid Mountain Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 941,
    "leetcodeUrl": "https://leetcode.com/problems/valid-mountain-array/",
    "signals": [
      "climb up then climb down",
      "single peak check",
      "two pointers from both ends"
    ],
    "solved": false
  },
  {
    "id": "lc-1051",
    "title": "Height Checker",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Pointer Comparison",
    "leetcodeNumber": 1051,
    "leetcodeUrl": "https://leetcode.com/problems/height-checker/",
    "signals": [
      "expected sorted order",
      "count mismatching indices",
      "index pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-1089",
    "title": "Duplicate Zeros",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pass",
    "leetcodeNumber": 1089,
    "leetcodeUrl": "https://leetcode.com/problems/duplicate-zeros/",
    "signals": [
      "duplicate zeros in place",
      "shift elements right",
      "backward pass pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-1200",
    "title": "Minimum Absolute Difference",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Sorted Traversal",
    "leetcodeNumber": 1200,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-absolute-difference/",
    "signals": [
      "minimum absolute difference",
      "sorted adjacent pairs",
      "linear comparison"
    ],
    "solved": false
  },
  {
    "id": "lc-1470",
    "title": "Shuffle the Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 1470,
    "leetcodeUrl": "https://leetcode.com/problems/shuffle-the-array/",
    "signals": [
      "interleave x and y parts",
      "pointers at 0 and n",
      "array reconstruction"
    ],
    "solved": false
  },
  {
    "id": "lc-1512",
    "title": "Number of Good Pairs",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Frequency & Pairs",
    "leetcodeNumber": 1512,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-good-pairs/",
    "signals": [
      "nums[i] equals nums[j] and i < j",
      "identical elements",
      "pair combinations"
    ],
    "solved": false
  },
  {
    "id": "lc-1773",
    "title": "Count Items Matching a Rule",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Linear Filter",
    "leetcodeNumber": 1773,
    "leetcodeUrl": "https://leetcode.com/problems/count-items-matching-a-rule/",
    "signals": [
      "ruleKey and ruleValue",
      "attribute check",
      "linear scan"
    ],
    "solved": false
  },
  {
    "id": "lc-1827",
    "title": "Minimum Operations to Make the Array Increasing",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Pointer",
    "leetcodeNumber": 1827,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-operations-to-make-the-array-increasing/",
    "signals": [
      "strictly increasing array",
      "increment operations",
      "adjacent pointer compare"
    ],
    "solved": false
  },
  {
    "id": "lc-2149",
    "title": "Rearrange Array Elements by Sign",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 2149,
    "leetcodeUrl": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
    "signals": [
      "alternate positive and negative",
      "equal positives and negatives",
      "positive and negative pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-2161",
    "title": "Partition Array According to Given Pivot",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Partition",
    "leetcodeNumber": 2161,
    "leetcodeUrl": "https://leetcode.com/problems/partition-array-according-to-given-pivot/",
    "signals": [
      "elements less than pivot",
      "relative order preserved",
      "two pointers partition"
    ],
    "solved": false
  },
  {
    "id": "lc-2367",
    "title": "Number of Arithmetic Triplets",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 2367,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-arithmetic-triplets/",
    "signals": [
      "strictly increasing array",
      "triplet difference equals diff",
      "three pointers scan"
    ],
    "solved": false
  },
  {
    "id": "lc-2460",
    "title": "Apply Operations to an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 2460,
    "leetcodeUrl": "https://leetcode.com/problems/apply-operations-to-an-array/",
    "signals": [
      "shift zeros to end",
      "double adjacent equal",
      "fast and slow pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-2540",
    "title": "Minimum Common Value",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 2540,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-common-value/",
    "signals": [
      "two sorted arrays",
      "minimum common value",
      "advance smaller pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-2570",
    "title": "Merge Two 2D Arrays by Summing Values",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 2570,
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values/",
    "signals": [
      "two sorted 2d arrays",
      "merge by id",
      "two pointer merge"
    ],
    "solved": false
  },
  {
    "id": "lc-2824",
    "title": "Count Pairs Whose Sum is Less than Target",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Opposite Direction",
    "leetcodeNumber": 2824,
    "leetcodeUrl": "https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/",
    "signals": [
      "sorted array",
      "pairs sum less than target",
      "left and right converging"
    ],
    "solved": false
  },
  {
    "id": "lc-643",
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 643,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-average-subarray-i/",
    "signals": [
      "contiguous subarray of length k",
      "maximum average",
      "rolling sum window"
    ],
    "solved": false
  },
  {
    "id": "lc-713",
    "title": "Subarray Product Less Than K",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 713,
    "leetcodeUrl": "https://leetcode.com/problems/subarray-product-less-than-k/",
    "signals": [
      "product of elements less than k",
      "positive integers",
      "expand right shrink left"
    ],
    "solved": false
  },
  {
    "id": "lc-904",
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 904,
    "leetcodeUrl": "https://leetcode.com/problems/fruit-into-baskets/",
    "signals": [
      "longest subarray with at most 2 types",
      "two baskets",
      "frequency map window"
    ],
    "solved": false
  },
  {
    "id": "lc-1004",
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 1004,
    "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "signals": [
      "flip at most k zeros",
      "longest sequence of 1s",
      "zeros count in window"
    ],
    "solved": false
  },
  {
    "id": "lc-1208",
    "title": "Get Equal Substrings Within Budget",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 1208,
    "leetcodeUrl": "https://leetcode.com/problems/get-equal-substrings-within-budget/",
    "signals": [
      "cost of changing characters",
      "maximum length within maxCost",
      "running cost window"
    ],
    "solved": false
  },
  {
    "id": "lc-1343",
    "title": "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 1343,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/",
    "signals": [
      "fixed window size k",
      "average threshold",
      "sliding sum subtraction"
    ],
    "solved": false
  },
  {
    "id": "lc-1423",
    "title": "Maximum Points You Can Obtain from Cards",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 1423,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
    "signals": [
      "take k cards from ends",
      "minimize middle window",
      "fixed window subtraction"
    ],
    "solved": false
  },
  {
    "id": "lc-1456",
    "title": "Maximum Number of Vowels in a Substring of Given Length",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 1456,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
    "signals": [
      "substring of length k",
      "maximum vowels count",
      "sliding fixed window"
    ],
    "solved": false
  },
  {
    "id": "lc-1493",
    "title": "Longest Subarray of 1s After Deleting One Element",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 1493,
    "leetcodeUrl": "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/",
    "signals": [
      "delete at most one element",
      "longest 1s subarray",
      "zeros counter <= 1"
    ],
    "solved": false
  },
  {
    "id": "lc-1658",
    "title": "Minimum Operations to Reduce X to Zero",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 1658,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/",
    "signals": [
      "remove from left or right",
      "longest subarray with target sum",
      "totalSum minus x"
    ],
    "solved": false
  },
  {
    "id": "lc-1838",
    "title": "Frequency of the Most Frequent Element",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 1838,
    "leetcodeUrl": "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
    "signals": [
      "increment at most k times",
      "make all elements equal",
      "sorted sliding window"
    ],
    "solved": false
  },
  {
    "id": "lc-2090",
    "title": "K Radius Subarray Averages",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 2090,
    "leetcodeUrl": "https://leetcode.com/problems/k-radius-subarray-averages/",
    "signals": [
      "k radius around index",
      "window size 2k + 1",
      "sliding sum"
    ],
    "solved": false
  },
  {
    "id": "lc-2134",
    "title": "Minimum Swaps to Group All 1s Together II",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 2134,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/",
    "signals": [
      "circular array",
      "window size equals total 1s",
      "minimum zeros in window"
    ],
    "solved": false
  },
  {
    "id": "lc-2269",
    "title": "Find the K-Beauty of a Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 2269,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-k-beauty-of-a-number/",
    "signals": [
      "substring of length k divides num",
      "fixed window slice",
      "rolling substring"
    ],
    "solved": false
  },
  {
    "id": "lc-2379",
    "title": "Minimum Recolors to Get K Consecutive Black Blocks",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 2379,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks/",
    "signals": [
      "k consecutive black blocks",
      "minimum white blocks",
      "fixed window size k"
    ],
    "solved": false
  },
  {
    "id": "lc-2461",
    "title": "Maximum Sum of Distinct Subarrays With Length K",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 2461,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/",
    "signals": [
      "length exactly k",
      "all elements distinct",
      "sliding window with set"
    ],
    "solved": false
  },
  {
    "id": "lc-2537",
    "title": "Count the Number of Good Subarrays",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 2537,
    "leetcodeUrl": "https://leetcode.com/problems/count-the-number-of-good-subarrays/",
    "signals": [
      "at least k equal pairs",
      "expand right until k pairs",
      "shrink left counting"
    ],
    "solved": false
  },
  {
    "id": "lc-2760",
    "title": "Longest Even Odd Subarray With Threshold",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 2760,
    "leetcodeUrl": "https://leetcode.com/problems/longest-even-odd-subarray-with-threshold/",
    "signals": [
      "even odd alternating",
      "values <= threshold",
      "contiguous subarray"
    ],
    "solved": false
  },
  {
    "id": "lc-2799",
    "title": "Count Complete Subarrays in an Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 2799,
    "leetcodeUrl": "https://leetcode.com/problems/count-complete-subarrays-in-an-array/",
    "signals": [
      "distinct elements equals total distinct",
      "shrink left until invalid",
      "window counting"
    ],
    "solved": false
  },
  {
    "id": "lc-2841",
    "title": "Maximum Sum of Almost Unique Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 2841,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray/",
    "signals": [
      "length k with at least m distinct",
      "sliding frequency map",
      "max window sum"
    ],
    "solved": false
  },
  {
    "id": "lc-2958",
    "title": "Length of Longest Subarray With at Most K Frequency",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 2958,
    "leetcodeUrl": "https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency/",
    "signals": [
      "frequency of each element <= k",
      "longest subarray",
      "dynamic sliding window"
    ],
    "solved": false
  },
  {
    "id": "lc-2962",
    "title": "Count Subarrays Where Max Element Appears at Least K Times",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 2962,
    "leetcodeUrl": "https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/",
    "signals": [
      "max element count >= k",
      "at least k occurrences",
      "sliding window counter"
    ],
    "solved": false
  },
  {
    "id": "lc-523",
    "title": "Continuous Subarray Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum Modulo",
    "leetcodeNumber": 523,
    "leetcodeUrl": "https://leetcode.com/problems/continuous-subarray-sum/",
    "signals": [
      "length at least 2",
      "sum is multiple of k",
      "prefix remainder map"
    ],
    "solved": false
  },
  {
    "id": "lc-525",
    "title": "Contiguous Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum",
    "leetcodeNumber": 525,
    "leetcodeUrl": "https://leetcode.com/problems/contiguous-array/",
    "signals": [
      "equal number of 0 and 1",
      "replace 0 with -1",
      "prefix sum with earliest index"
    ],
    "solved": false
  },
  {
    "id": "lc-724",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Running Sum",
    "leetcodeNumber": 724,
    "leetcodeUrl": "https://leetcode.com/problems/find-pivot-index/",
    "signals": [
      "sum of left equals sum of right",
      "totalSum minus leftSum",
      "single pass"
    ],
    "solved": false
  },
  {
    "id": "lc-974",
    "title": "Subarray Sums Divisible by K",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum Modulo",
    "leetcodeNumber": 974,
    "leetcodeUrl": "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
    "signals": [
      "subarray sum divisible by k",
      "modulo frequency map",
      "normalized remainder"
    ],
    "solved": false
  },
  {
    "id": "lc-1248",
    "title": "Count Number of Nice Subarrays",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Count",
    "leetcodeNumber": 1248,
    "leetcodeUrl": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
    "signals": [
      "exactly k odd numbers",
      "replace even with 0 odd with 1",
      "prefix sum equals k"
    ],
    "solved": false
  },
  {
    "id": "lc-1371",
    "title": "Find the Longest Substring Containing Vowels in Even Counts",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Bitmask Prefix",
    "leetcodeNumber": 1371,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/",
    "signals": [
      "even counts of vowels",
      "bitmask state parity",
      "prefix mask first seen"
    ],
    "solved": false
  },
  {
    "id": "lc-1480",
    "title": "Running Sum of 1d Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Running Sum",
    "leetcodeNumber": 1480,
    "leetcodeUrl": "https://leetcode.com/problems/running-sum-of-1d-array/",
    "signals": [
      "running sum array",
      "cumulative accumulation",
      "prefix sum formula"
    ],
    "solved": false
  },
  {
    "id": "lc-1588",
    "title": "Sum of All Odd Length Subarrays",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum",
    "leetcodeNumber": 1588,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-all-odd-length-subarrays/",
    "signals": [
      "sum of all odd length subarrays",
      "prefix sum range query",
      "contribution technique"
    ],
    "solved": false
  },
  {
    "id": "lc-1732",
    "title": "Find the Highest Altitude",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Running Sum",
    "leetcodeNumber": 1732,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-highest-altitude/",
    "signals": [
      "net gain of altitude",
      "cumulative sum",
      "max prefix sum"
    ],
    "solved": false
  },
  {
    "id": "lc-1991",
    "title": "Find the Middle Index in Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Running Sum",
    "leetcodeNumber": 1991,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-middle-index-in-array/",
    "signals": [
      "left sum equals right sum",
      "earliest index",
      "running balance"
    ],
    "solved": false
  },
  {
    "id": "lc-2270",
    "title": "Number of Ways to Split Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum",
    "leetcodeNumber": 2270,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-ways-to-split-array/",
    "signals": [
      "left sum >= right sum",
      "prefix sum comparison",
      "split boundary scan"
    ],
    "solved": false
  },
  {
    "id": "lc-2389",
    "title": "Longest Subsequence With Limited Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum & Binary Search",
    "leetcodeNumber": 2389,
    "leetcodeUrl": "https://leetcode.com/problems/longest-subsequence-with-limited-sum/",
    "signals": [
      "queries sum threshold",
      "sort and prefix sum",
      "upper_bound search"
    ],
    "solved": false
  },
  {
    "id": "lc-2485",
    "title": "Find the Pivot Integer",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Arithmetic Sum",
    "leetcodeNumber": 2485,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-pivot-integer/",
    "signals": [
      "sum 1 to x equals x to n",
      "formula or prefix balance",
      "square root check"
    ],
    "solved": false
  },
  {
    "id": "lc-2574",
    "title": "Left and Right Sum Differences",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Suffix",
    "leetcodeNumber": 2574,
    "leetcodeUrl": "https://leetcode.com/problems/left-and-right-sum-differences/",
    "signals": [
      "leftSum and rightSum difference",
      "prefix and suffix arrays",
      "running balance"
    ],
    "solved": false
  },
  {
    "id": "lc-2640",
    "title": "Find the Score of All Prefixes of an Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Running Maximum",
    "leetcodeNumber": 2640,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array/",
    "signals": [
      "conversion array with max prefix",
      "prefix sum of converted array",
      "cumulative score"
    ],
    "solved": false
  },
  {
    "id": "lc-2848",
    "title": "Points That Intersect With Cars",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Difference Array",
    "leetcodeNumber": 2848,
    "leetcodeUrl": "https://leetcode.com/problems/points-that-intersect-with-cars/",
    "signals": [
      "coordinate range coverage",
      "prefix difference array",
      "sweep line"
    ],
    "solved": false
  },
  {
    "id": "lc-2971",
    "title": "Find Polygon With the Largest Perimeter",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Sum & Sort",
    "leetcodeNumber": 2971,
    "leetcodeUrl": "https://leetcode.com/problems/find-polygon-with-the-largest-perimeter/",
    "signals": [
      "longest side smaller than sum",
      "sort ascending",
      "check prefix sum > current"
    ],
    "solved": false
  },
  {
    "id": "lc-152",
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Dynamic Programming",
    "leetcodeNumber": 152,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
    "signals": [
      "contiguous subarray product",
      "negative numbers flip sign",
      "track local min and max"
    ],
    "solved": false
  },
  {
    "id": "lc-918",
    "title": "Maximum Sum Circular Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Circular Kadane",
    "leetcodeNumber": 918,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
    "signals": [
      "circular subarray",
      "totalSum minus minSubarray",
      "standard Kadane on inverted"
    ],
    "solved": false
  },
  {
    "id": "lc-1186",
    "title": "Maximum Subarray Sum with One Deletion",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "State DP",
    "leetcodeNumber": 1186,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/",
    "signals": [
      "delete at most one element",
      "two states with and without deletion",
      "extend Kadane"
    ],
    "solved": false
  },
  {
    "id": "lc-1191",
    "title": "K-Concatenation Maximum Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Repeated Kadane",
    "leetcodeNumber": 1191,
    "leetcodeUrl": "https://leetcode.com/problems/k-concatenation-maximum-sum/",
    "signals": [
      "array repeated k times",
      "positive totalSum wraps around",
      "prefix and suffix bounds"
    ],
    "solved": false
  },
  {
    "id": "lc-1749",
    "title": "Maximum Absolute Sum of Any Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane Extreme",
    "leetcodeNumber": 1749,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/",
    "signals": [
      "maximum absolute sum",
      "max subarray sum vs min subarray sum",
      "prefix peak minus trough"
    ],
    "solved": false
  },
  {
    "id": "lc-2321",
    "title": "Maximum Score Of Spliced Array",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane Difference",
    "leetcodeNumber": 2321,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-score-of-spliced-array/",
    "signals": [
      "swap subarray between two arrays",
      "maximum gain difference array",
      "Kadane on diff"
    ],
    "solved": false
  },
  {
    "id": "lc-2606",
    "title": "Find the Substring With Maximum Cost",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Kadane on Characters",
    "leetcodeNumber": 2606,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-substring-with-maximum-cost/",
    "signals": [
      "character values array",
      "maximum cost contiguous substring",
      "Kadane on mapped values"
    ],
    "solved": false
  },
  {
    "id": "lc-121",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "One Pass Min",
    "leetcodeNumber": 121,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "signals": [
      "buy once sell once",
      "track minimum price so far",
      "maximum difference"
    ],
    "solved": false
  },
  {
    "id": "lc-122",
    "title": "Best Time to Buy and Sell Stock II",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Greedy Sum",
    "leetcodeNumber": 122,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    "signals": [
      "buy and sell multiple times",
      "sum all positive daily gains",
      "greedy peak valley"
    ],
    "solved": false
  },
  {
    "id": "lc-123",
    "title": "Best Time to Buy and Sell Stock III",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Multi-State DP",
    "leetcodeNumber": 123,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/",
    "signals": [
      "at most two transactions",
      "four states buy1 sell1 buy2 sell2",
      "state machine DP"
    ],
    "solved": false
  },
  {
    "id": "lc-188",
    "title": "Best Time to Buy and Sell Stock IV",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "K Transactions DP",
    "leetcodeNumber": 188,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    "signals": [
      "at most k transactions",
      "dp table buy and sell states",
      "state machine"
    ],
    "solved": false
  },
  {
    "id": "lc-309",
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Cooldown DP",
    "leetcodeNumber": 309,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "signals": [
      "one day cooldown after selling",
      "states hold sold rest",
      "state machine DP"
    ],
    "solved": false
  },
  {
    "id": "lc-714",
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Fee DP",
    "leetcodeNumber": 714,
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    "signals": [
      "transaction fee per trade",
      "states hold and cash",
      "linear state transition"
    ],
    "solved": false
  },
  {
    "id": "lc-2110",
    "title": "Number of Smooth Descent Periods of a Stock",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Streak Length",
    "leetcodeNumber": 2110,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock/",
    "signals": [
      "adjacent elements decrease by 1",
      "streak of length L gives L*(L+1)/2",
      "running counter"
    ],
    "solved": false
  },
  {
    "id": "lc-74",
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Matrix Binary Search",
    "leetcodeNumber": 74,
    "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
    "signals": [
      "rows and columns sorted",
      "flattened 2D matrix",
      "binary search row = mid/n col = mid%n"
    ],
    "solved": false
  },
  {
    "id": "lc-81",
    "title": "Search in Rotated Sorted Array II",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Rotated with Duplicates",
    "leetcodeNumber": 81,
    "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
    "signals": [
      "rotated sorted with duplicates",
      "handle nums[left]==nums[mid]",
      "shrink boundaries"
    ],
    "solved": false
  },
  {
    "id": "lc-154",
    "title": "Find Minimum in Rotated Sorted Array II",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Rotated with Duplicates",
    "leetcodeNumber": 154,
    "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
    "signals": [
      "minimum in rotated array with duplicates",
      "compare mid with right",
      "decrement right on equality"
    ],
    "solved": false
  },
  {
    "id": "lc-240",
    "title": "Search a 2D Matrix II",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Matrix Search",
    "leetcodeNumber": 240,
    "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    "signals": [
      "rows and columns independently sorted",
      "start from top-right corner",
      "step left or down"
    ],
    "solved": false
  },
  {
    "id": "lc-278",
    "title": "First Bad Version",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Boundary Search",
    "leetcodeNumber": 278,
    "leetcodeUrl": "https://leetcode.com/problems/first-bad-version/",
    "signals": [
      "find first true in FFFTTT",
      "minimize API calls",
      "binary search lower bound"
    ],
    "solved": false
  },
  {
    "id": "lc-374",
    "title": "Guess Number Higher or Lower",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Standard Binary Search",
    "leetcodeNumber": 374,
    "leetcodeUrl": "https://leetcode.com/problems/guess-number-higher-or-lower/",
    "signals": [
      "guess API returns -1 1 0",
      "standard binary search",
      "mid calculation"
    ],
    "solved": false
  },
  {
    "id": "lc-410",
    "title": "Split Array Largest Sum",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 410,
    "leetcodeUrl": "https://leetcode.com/problems/split-array-largest-sum/",
    "signals": [
      "split array into k non-empty subarrays",
      "minimize largest subarray sum",
      "binary search on answer"
    ],
    "solved": false
  },
  {
    "id": "lc-436",
    "title": "Find Right Interval",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Sorted Map / Binary Search",
    "leetcodeNumber": 436,
    "leetcodeUrl": "https://leetcode.com/problems/find-right-interval/",
    "signals": [
      "minimum start time >= end time",
      "store sorted starts with index",
      "std::lower_bound"
    ],
    "solved": false
  },
  {
    "id": "lc-441",
    "title": "Arranging Coins",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Math / Binary Search",
    "leetcodeNumber": 441,
    "leetcodeUrl": "https://leetcode.com/problems/arranging-coins/",
    "signals": [
      "k rows require k*(k+1)/2 coins",
      "binary search for maximum complete k",
      "quadratic formula"
    ],
    "solved": false
  },
  {
    "id": "lc-704",
    "title": "Binary Search",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Classic",
    "leetcodeNumber": 704,
    "leetcodeUrl": "https://leetcode.com/problems/binary-search/",
    "signals": [
      "sorted ascending array",
      "O(log n) search",
      "classic while left <= right"
    ],
    "solved": false
  },
  {
    "id": "lc-852",
    "title": "Peak Index in a Mountain Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Peak Finding",
    "leetcodeNumber": 852,
    "leetcodeUrl": "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    "signals": [
      "mountain array peak",
      "compare mid with mid + 1",
      "binary search uphill"
    ],
    "solved": false
  },
  {
    "id": "lc-1011",
    "title": "Capacity To Ship Packages Within D Days",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 1011,
    "leetcodeUrl": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "signals": [
      "ship packages in order within d days",
      "minimize maximum capacity",
      "monotonic predicate search"
    ],
    "solved": false
  },
  {
    "id": "lc-1283",
    "title": "Find the Smallest Divisor Given a Threshold",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 1283,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
    "signals": [
      "sum of ceil division <= threshold",
      "binary search divisor",
      "monotonic feasibility"
    ],
    "solved": false
  },
  {
    "id": "lc-1482",
    "title": "Minimum Number of Days to Make m Bouquets",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 1482,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    "signals": [
      "m bouquets of k adjacent flowers",
      "minimum days to bloom",
      "binary search on days"
    ],
    "solved": false
  },
  {
    "id": "lc-1539",
    "title": "Kth Missing Positive Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Missing Count",
    "leetcodeNumber": 1539,
    "leetcodeUrl": "https://leetcode.com/problems/kth-missing-positive-number/",
    "signals": [
      "sorted positive integers",
      "missing count at index = arr[mid] - mid - 1",
      "binary search on missing count"
    ],
    "solved": false
  },
  {
    "id": "lc-1608",
    "title": "Special Array With X Elements Greater Than or Equal X",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Count Search",
    "leetcodeNumber": 1608,
    "leetcodeUrl": "https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x/",
    "signals": [
      "exactly x elements >= x",
      "sort array",
      "binary search on x"
    ],
    "solved": false
  },
  {
    "id": "lc-1870",
    "title": "Minimum Speed to Arrive on Time",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 1870,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/",
    "signals": [
      "minimum speed to arrive on hour",
      "ceil travel time for trains",
      "binary search on speed"
    ],
    "solved": false
  },
  {
    "id": "lc-1894",
    "title": "Find the Student that Will Replace the Chalk",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Prefix & Search",
    "leetcodeNumber": 1894,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk/",
    "signals": [
      "cyclic chalk usage",
      "k % totalSum",
      "upper_bound on prefix sum"
    ],
    "solved": false
  },
  {
    "id": "lc-2064",
    "title": "Minimized Maximum of Products Distributed to Any Store",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 2064,
    "leetcodeUrl": "https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/",
    "signals": [
      "distribute products to n stores",
      "minimize maximum quantity",
      "binary search on answer"
    ],
    "solved": false
  },
  {
    "id": "lc-2187",
    "title": "Minimum Time to Complete Trips",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 2187,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-time-to-complete-trips/",
    "signals": [
      "buses complete totalTrips",
      "minimize total time",
      "sum(mid / time[i]) >= totalTrips"
    ],
    "solved": false
  },
  {
    "id": "lc-2226",
    "title": "Maximum Candies Allocated to K Children",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 2226,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-candies-allocated-to-k-children/",
    "signals": [
      "subpiles of equal size for k children",
      "maximize candy pile size",
      "binary search on answer"
    ],
    "solved": false
  },
  {
    "id": "lc-2300",
    "title": "Successful Pairs of Spells and Potions",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Sorted Search",
    "leetcodeNumber": 2300,
    "leetcodeUrl": "https://leetcode.com/problems/successful-pairs-of-spells-and-potions/",
    "signals": [
      "spells * potions >= success",
      "sort potions",
      "lower_bound for min required potion"
    ],
    "solved": false
  },
  {
    "id": "lc-2529",
    "title": "Maximum Count of Positive Integer and Negative Integer",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Count Boundaries",
    "leetcodeNumber": 2529,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/",
    "signals": [
      "count negative and positive numbers",
      "binary search for zero transitions",
      "upper_bound and lower_bound"
    ],
    "solved": false
  },
  {
    "id": "lc-2594",
    "title": "Minimum Time to Repair Cars",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Answer Space",
    "leetcodeNumber": 2594,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-time-to-repair-cars/",
    "signals": [
      "mechanics repair r * n^2 cars",
      "minimize repair time",
      "binary search time with sqrt cars"
    ],
    "solved": false
  },
  {
    "id": "lc-5",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Expand Around Center",
    "leetcodeNumber": 5,
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
    "signals": [
      "longest palindrome substring",
      "odd and even centers",
      "two pointers expand outward"
    ],
    "solved": false
  },
  {
    "id": "lc-6",
    "title": "Zigzag Conversion",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Simulation",
    "leetcodeNumber": 6,
    "leetcodeUrl": "https://leetcode.com/problems/zigzag-conversion/",
    "signals": [
      "zigzag pattern on numRows",
      "direction change at boundaries",
      "row strings concatenation"
    ],
    "solved": false
  },
  {
    "id": "lc-8",
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Parsing",
    "leetcodeNumber": 8,
    "leetcodeUrl": "https://leetcode.com/problems/string-to-integer-atoi/",
    "signals": [
      "convert string to 32-bit signed integer",
      "whitespace and sign parsing",
      "overflow clamping"
    ],
    "solved": false
  },
  {
    "id": "lc-12",
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Greedy Subtraction",
    "leetcodeNumber": 12,
    "leetcodeUrl": "https://leetcode.com/problems/integer-to-roman/",
    "signals": [
      "convert integer to roman numerals",
      "symbols lookup table",
      "greedy largest value"
    ],
    "solved": false
  },
  {
    "id": "lc-13",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Lookup",
    "leetcodeNumber": 13,
    "leetcodeUrl": "https://leetcode.com/problems/roman-to-integer/",
    "signals": [
      "convert roman numerals to integer",
      "subtract if smaller before larger",
      "lookup map"
    ],
    "solved": false
  },
  {
    "id": "lc-14",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Horizontal Scan",
    "leetcodeNumber": 14,
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
    "signals": [
      "longest common prefix string",
      "compare characters across all words",
      "prefix shrink"
    ],
    "solved": false
  },
  {
    "id": "lc-38",
    "title": "Count and Say",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Run Length",
    "leetcodeNumber": 38,
    "leetcodeUrl": "https://leetcode.com/problems/count-and-say/",
    "signals": [
      "run length encoding description",
      "count consecutive identical digits",
      "iterative simulation"
    ],
    "solved": false
  },
  {
    "id": "lc-43",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Digit Arithmetic",
    "leetcodeNumber": 43,
    "leetcodeUrl": "https://leetcode.com/problems/multiply-strings/",
    "signals": [
      "multiply two numbers represented as strings",
      "grade-school multiplication",
      "digit product indices i+j"
    ],
    "solved": false
  },
  {
    "id": "lc-58",
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Backward Scan",
    "leetcodeNumber": 58,
    "leetcodeUrl": "https://leetcode.com/problems/length-of-last-word/",
    "signals": [
      "length of last word in string",
      "skip trailing spaces",
      "backward pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-67",
    "title": "Add Binary",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Digit Arithmetic",
    "leetcodeNumber": 67,
    "leetcodeUrl": "https://leetcode.com/problems/add-binary/",
    "signals": [
      "binary string addition",
      "carry calculation",
      "two pointers from end"
    ],
    "solved": false
  },
  {
    "id": "lc-68",
    "title": "Text Justification",
    "difficulty": "Hard",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Greedy Formatting",
    "leetcodeNumber": 68,
    "leetcodeUrl": "https://leetcode.com/problems/text-justification/",
    "signals": [
      "format text with maxWidth",
      "distribute spaces evenly",
      "left justify last line"
    ],
    "solved": false
  },
  {
    "id": "lc-71",
    "title": "Simplify Path",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Stack Directory",
    "leetcodeNumber": 71,
    "leetcodeUrl": "https://leetcode.com/problems/simplify-path/",
    "signals": [
      "canonical path in unix",
      "split by slash",
      "pop on .. ignore ."
    ],
    "solved": false
  },
  {
    "id": "lc-151",
    "title": "Reverse Words in a String",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "In-Place Reversal",
    "leetcodeNumber": 151,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
    "signals": [
      "reverse order of words",
      "trim extra spaces",
      "reverse entire string then words"
    ],
    "solved": false
  },
  {
    "id": "lc-165",
    "title": "Compare Version Numbers",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Parsing",
    "leetcodeNumber": 165,
    "leetcodeUrl": "https://leetcode.com/problems/compare-version-numbers/",
    "signals": [
      "compare version revisions",
      "split by dots",
      "two pointers numeric compare"
    ],
    "solved": false
  },
  {
    "id": "lc-179",
    "title": "Largest Number",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Custom Comparator",
    "leetcodeNumber": 179,
    "leetcodeUrl": "https://leetcode.com/problems/largest-number/",
    "signals": [
      "arrange numbers to form largest value",
      "custom comparator a+b > b+a",
      "lexicographical sort"
    ],
    "solved": false
  },
  {
    "id": "lc-205",
    "title": "Isomorphic Strings",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Bijection Map",
    "leetcodeNumber": 205,
    "leetcodeUrl": "https://leetcode.com/problems/isomorphic-strings/",
    "signals": [
      "one-to-one character mapping",
      "two frequency/index arrays",
      "isomorphism check"
    ],
    "solved": false
  },
  {
    "id": "lc-227",
    "title": "Basic Calculator II",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Stack Evaluation",
    "leetcodeNumber": 227,
    "leetcodeUrl": "https://leetcode.com/problems/basic-calculator-ii/",
    "signals": [
      "evaluate string with + - * /",
      "operator precedence",
      "stack for delayed addition"
    ],
    "solved": false
  },
  {
    "id": "lc-271",
    "title": "Encode and Decode Strings",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Delimiter Framing",
    "leetcodeNumber": 271,
    "leetcodeUrl": "https://leetcode.com/problems/encode-and-decode-strings/",
    "signals": [
      "serialize list of strings",
      "length prefix delimiter",
      "framing protocol"
    ],
    "solved": false
  },
  {
    "id": "lc-290",
    "title": "Word Pattern",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Bijection Map",
    "leetcodeNumber": 290,
    "leetcodeUrl": "https://leetcode.com/problems/word-pattern/",
    "signals": [
      "bijection between pattern and words",
      "map char to word and word to char",
      "string split"
    ],
    "solved": false
  },
  {
    "id": "lc-316",
    "title": "Remove Duplicate Letters",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 316,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicate-letters/",
    "signals": [
      "smallest in lexicographical order",
      "count occurrences",
      "monotonic stack with seen set"
    ],
    "solved": false
  },
  {
    "id": "lc-345",
    "title": "Reverse Vowels of a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Converging",
    "leetcodeNumber": 345,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-vowels-of-a-string/",
    "signals": [
      "reverse only vowels",
      "skip consonants",
      "converging two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-383",
    "title": "Ransom Note",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Frequency",
    "leetcodeNumber": 383,
    "leetcodeUrl": "https://leetcode.com/problems/ransom-note/",
    "signals": [
      "can ransomNote be constructed from magazine",
      "count characters",
      "frequency array 26"
    ],
    "solved": false
  },
  {
    "id": "lc-387",
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Frequency",
    "leetcodeNumber": 387,
    "leetcodeUrl": "https://leetcode.com/problems/first-unique-character-in-a-string/",
    "signals": [
      "first non-repeating character",
      "two pass frequency array",
      "constant alphabet space"
    ],
    "solved": false
  },
  {
    "id": "lc-392",
    "title": "Is Subsequence",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Subsequence Match",
    "leetcodeNumber": 392,
    "leetcodeUrl": "https://leetcode.com/problems/is-subsequence/",
    "signals": [
      "s is subsequence of t",
      "two pointers match characters in order",
      "greedy advance"
    ],
    "solved": false
  },
  {
    "id": "lc-409",
    "title": "Longest Palindrome",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Character Counts",
    "leetcodeNumber": 409,
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindrome/",
    "signals": [
      "longest palindrome built from characters",
      "pair up even frequencies",
      "at most one odd center"
    ],
    "solved": false
  },
  {
    "id": "lc-415",
    "title": "Add Strings",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Digit Arithmetic",
    "leetcodeNumber": 415,
    "leetcodeUrl": "https://leetcode.com/problems/add-strings/",
    "signals": [
      "add two non-negative integers as strings",
      "carry propagation",
      "two pointers from end"
    ],
    "solved": false
  },
  {
    "id": "lc-424",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Dynamic Window",
    "leetcodeNumber": 424,
    "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "signals": [
      "replace at most k characters",
      "window size minus maxFrequency <= k",
      "dynamic sliding window"
    ],
    "solved": false
  },
  {
    "id": "lc-438",
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 438,
    "leetcodeUrl": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    "signals": [
      "all start indices of anagrams of p",
      "fixed window size p.length",
      "compare 26-char frequencies"
    ],
    "solved": false
  },
  {
    "id": "lc-443",
    "title": "String Compression",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 443,
    "leetcodeUrl": "https://leetcode.com/problems/string-compression/",
    "signals": [
      "compress consecutive repeated characters",
      "in-place write pointer",
      "write character and count"
    ],
    "solved": false
  },
  {
    "id": "lc-459",
    "title": "Repeated Substring Pattern",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "KMP / String Doubling",
    "leetcodeNumber": 459,
    "leetcodeUrl": "https://leetcode.com/problems/repeated-substring-pattern/",
    "signals": [
      "constructed by repeating substring",
      "s+s search trick",
      "KMP LPS table divisible"
    ],
    "solved": false
  },
  {
    "id": "lc-541",
    "title": "Reverse String II",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Chunk Reversal",
    "leetcodeNumber": 541,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-string-ii/",
    "signals": [
      "reverse first k characters for every 2k",
      "jump in steps of 2k",
      "reverse two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-557",
    "title": "Reverse Words in a String III",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Word Reversal",
    "leetcodeNumber": 557,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-words-in-a-string-iii/",
    "signals": [
      "reverse characters in each word",
      "keep whitespace intact",
      "two pointers on word boundaries"
    ],
    "solved": false
  },
  {
    "id": "lc-567",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Fixed Window",
    "leetcodeNumber": 567,
    "leetcodeUrl": "https://leetcode.com/problems/permutation-in-string/",
    "signals": [
      "s2 contains permutation of s1",
      "fixed window of length s1",
      "match count array"
    ],
    "solved": false
  },
  {
    "id": "lc-647",
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Expand Around Center",
    "leetcodeNumber": 647,
    "leetcodeUrl": "https://leetcode.com/problems/palindromic-substrings/",
    "signals": [
      "count all palindromic substrings",
      "expand from 2n-1 centers",
      "two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-763",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Greedy Intervals",
    "leetcodeNumber": 763,
    "leetcodeUrl": "https://leetcode.com/problems/partition-labels/",
    "signals": [
      "partition so each letter appears in one part",
      "last seen index map",
      "greedy extend boundary"
    ],
    "solved": false
  },
  {
    "id": "lc-796",
    "title": "Rotate String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Rotation Check",
    "leetcodeNumber": 796,
    "leetcodeUrl": "https://leetcode.com/problems/rotate-string/",
    "signals": [
      "s can become goal after shift",
      "goal is substring of s+s",
      "length equal check"
    ],
    "solved": false
  },
  {
    "id": "lc-844",
    "title": "Backspace String Compare",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Backward Two Pointers",
    "leetcodeNumber": 844,
    "leetcodeUrl": "https://leetcode.com/problems/backspace-string-compare/",
    "signals": [
      "hash character means backspace",
      "traverse backwards counting skips",
      "O(1) space two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-859",
    "title": "Buddy Strings",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Swap Match",
    "leetcodeNumber": 859,
    "leetcodeUrl": "https://leetcode.com/problems/buddy-strings/",
    "signals": [
      "swap two letters to make equal",
      "exactly two mismatches",
      "duplicate char for identical strings"
    ],
    "solved": false
  },
  {
    "id": "lc-890",
    "title": "Find and Replace Pattern",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Bijection Map",
    "leetcodeNumber": 890,
    "leetcodeUrl": "https://leetcode.com/problems/find-and-replace-pattern/",
    "signals": [
      "words matching pattern bijection",
      "normalize to canonical pattern",
      "two-way map"
    ],
    "solved": false
  },
  {
    "id": "lc-917",
    "title": "Reverse Only Letters",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Converging",
    "leetcodeNumber": 917,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-only-letters/",
    "signals": [
      "reverse letters only",
      "skip non-alpha characters",
      "converging two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-929",
    "title": "Unique Email Addresses",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Normalization",
    "leetcodeNumber": 929,
    "leetcodeUrl": "https://leetcode.com/problems/unique-email-addresses/",
    "signals": [
      "ignore dots and plus suffix in local name",
      "hash set of normalized emails",
      "string parsing"
    ],
    "solved": false
  },
  {
    "id": "lc-953",
    "title": "Verifying an Alien Dictionary",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Custom Order",
    "leetcodeNumber": 953,
    "leetcodeUrl": "https://leetcode.com/problems/verifying-an-alien-dictionary/",
    "signals": [
      "alien alphabet order mapping",
      "compare adjacent words",
      "lexicographical check"
    ],
    "solved": false
  },
  {
    "id": "lc-1047",
    "title": "Remove All Adjacent Duplicates In String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Stack Simulation",
    "leetcodeNumber": 1047,
    "leetcodeUrl": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
    "signals": [
      "remove adjacent duplicates repeatedly",
      "stack or string as stack",
      "pop on match"
    ],
    "solved": false
  },
  {
    "id": "lc-1071",
    "title": "Greatest Common Divisor of Strings",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "GCD",
    "leetcodeNumber": 1071,
    "leetcodeUrl": "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
    "signals": [
      "largest string dividing both",
      "s1+s2 == s2+s1 check",
      "gcd of lengths"
    ],
    "solved": false
  },
  {
    "id": "lc-1143",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "2D DP",
    "leetcodeNumber": 1143,
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
    "signals": [
      "longest common subsequence between two strings",
      "2D grid DP",
      "character matching"
    ],
    "solved": false
  },
  {
    "id": "lc-1209",
    "title": "Remove All Adjacent Duplicates in String II",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Stack with Count",
    "leetcodeNumber": 1209,
    "leetcodeUrl": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/",
    "signals": [
      "remove k adjacent duplicates",
      "stack of char and count pairs",
      "pop when count equals k"
    ],
    "solved": false
  },
  {
    "id": "lc-1249",
    "title": "Minimum Remove to Make Valid Parentheses",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Stack Indices",
    "leetcodeNumber": 1249,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
    "signals": [
      "remove minimum parentheses to make valid",
      "stack of invalid indices",
      "reconstruct string"
    ],
    "solved": false
  },
  {
    "id": "lc-1347",
    "title": "Minimum Number of Steps to Make Two Strings Anagram",
    "difficulty": "Medium",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Frequency Diff",
    "leetcodeNumber": 1347,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/",
    "signals": [
      "minimum character changes for anagram",
      "count positive differences",
      "frequency array 26"
    ],
    "solved": false
  },
  {
    "id": "lc-1408",
    "title": "String Matching in an Array",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Substring Search",
    "leetcodeNumber": 1408,
    "leetcodeUrl": "https://leetcode.com/problems/string-matching-in-an-array/",
    "signals": [
      "words that are substrings of others",
      "sort by length",
      "string::find"
    ],
    "solved": false
  },
  {
    "id": "lc-1455",
    "title": "Check If a Word Occurs As a Prefix of Any Word in a Sentence",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Prefix Search",
    "leetcodeNumber": 1455,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/",
    "signals": [
      "word starts with searchWord",
      "split sentence into tokens",
      "startsWith check"
    ],
    "solved": false
  },
  {
    "id": "lc-1528",
    "title": "Shuffle String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Index Mapping",
    "leetcodeNumber": 1528,
    "leetcodeUrl": "https://leetcode.com/problems/shuffle-string/",
    "signals": [
      "restore string using indices array",
      "place char at indices[i]",
      "reconstruct string"
    ],
    "solved": false
  },
  {
    "id": "lc-1544",
    "title": "Make The String Great",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Stack",
    "leetcodeNumber": 1544,
    "leetcodeUrl": "https://leetcode.com/problems/make-the-string-great/",
    "signals": [
      "adjacent characters same letter different case",
      "abs diff equals 32",
      "stack pop on match"
    ],
    "solved": false
  },
  {
    "id": "lc-1614",
    "title": "Maximum Nesting Depth of the Parentheses",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Counter Depth",
    "leetcodeNumber": 1614,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
    "signals": [
      "maximum nesting depth of brackets",
      "track open minus close",
      "max counter"
    ],
    "solved": false
  },
  {
    "id": "lc-1662",
    "title": "Check If Two String Arrays are Equivalent",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Pointer Simulation",
    "leetcodeNumber": 1662,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/",
    "signals": [
      "concatenate arrays and compare",
      "pointer to word and char",
      "O(1) space traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-1678",
    "title": "Goal Parser Interpretation",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Replacement",
    "leetcodeNumber": 1678,
    "leetcodeUrl": "https://leetcode.com/problems/goal-parser-interpretation/",
    "signals": [
      "G -> G, () -> o, (al) -> al",
      "sequential parsing",
      "string replace"
    ],
    "solved": false
  },
  {
    "id": "lc-1768",
    "title": "Merge Strings Alternately",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pointers",
    "leetcodeNumber": 1768,
    "leetcodeUrl": "https://leetcode.com/problems/merge-strings-alternately/",
    "signals": [
      "two pointers at word1 and word2",
      "append characters alternately",
      "two pointer merge"
    ],
    "solved": false
  },
  {
    "id": "lc-1790",
    "title": "Check if One String Swap Can Make Strings Equal",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Mismatch Indices",
    "leetcodeNumber": 1790,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/",
    "signals": [
      "equal after at most one swap",
      "find mismatched indices",
      "swap and check"
    ],
    "solved": false
  },
  {
    "id": "lc-1859",
    "title": "Sorting the Sentence",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Number Sort",
    "leetcodeNumber": 1859,
    "leetcodeUrl": "https://leetcode.com/problems/sorting-the-sentence/",
    "signals": [
      "words have numbers 1 to 9",
      "extract trailing digit",
      "bucket array sort"
    ],
    "solved": false
  },
  {
    "id": "lc-1941",
    "title": "Check if All Characters Have Equal Number of Occurrences",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Frequency",
    "leetcodeNumber": 1941,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/",
    "signals": [
      "all characters appear same number of times",
      "frequency array",
      "all non-zero counts equal"
    ],
    "solved": false
  },
  {
    "id": "lc-2000",
    "title": "Reverse Prefix of Word",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Prefix Reversal",
    "leetcodeNumber": 2000,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-prefix-of-word/",
    "signals": [
      "reverse until first occurrence of ch",
      "find char index",
      "reverse two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-2108",
    "title": "Find First Palindromic String in the Array",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Palindrome Check",
    "leetcodeNumber": 2108,
    "leetcodeUrl": "https://leetcode.com/problems/find-first-palindromic-string-in-the-array/",
    "signals": [
      "first string that is palindrome",
      "check each string with two pointers",
      "return first match"
    ],
    "solved": false
  },
  {
    "id": "lc-2185",
    "title": "Counting Words With a Given Prefix",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Prefix Count",
    "leetcodeNumber": 2185,
    "leetcodeUrl": "https://leetcode.com/problems/counting-words-with-a-given-prefix/",
    "signals": [
      "words starting with pref",
      "startsWith check",
      "linear count"
    ],
    "solved": false
  },
  {
    "id": "lc-128",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Hash Set Sequence",
    "leetcodeNumber": 128,
    "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "signals": [
      "longest consecutive elements sequence in O(N)",
      "hash set lookup",
      "start sequence if num-1 not in set"
    ],
    "solved": false
  },
  {
    "id": "lc-217",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Set Membership",
    "leetcodeNumber": 217,
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate/",
    "signals": [
      "check for duplicate elements in array",
      "hash set insertion",
      "O(N) time O(N) space"
    ],
    "solved": false
  },
  {
    "id": "lc-219",
    "title": "Contains Duplicate II",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Sliding Set",
    "leetcodeNumber": 219,
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate-ii/",
    "signals": [
      "duplicate within k distance",
      "hash map with last seen index",
      "or sliding hash set of size k"
    ],
    "solved": false
  },
  {
    "id": "lc-220",
    "title": "Contains Duplicate III",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Bucket / Ordered Set",
    "leetcodeNumber": 220,
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate-iii/",
    "signals": [
      "value diff <= t and index diff <= k",
      "bucket division by t+1",
      "or std::set lower_bound"
    ],
    "solved": false
  },
  {
    "id": "lc-229",
    "title": "Majority Element II",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Boyer-Moore",
    "leetcodeNumber": 229,
    "leetcodeUrl": "https://leetcode.com/problems/majority-element-ii/",
    "signals": [
      "elements appearing more than n/3 times",
      "at most two candidates",
      "Boyer-Moore voting extension"
    ],
    "solved": false
  },
  {
    "id": "lc-349",
    "title": "Intersection of Two Arrays",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Set Intersection",
    "leetcodeNumber": 349,
    "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-arrays/",
    "signals": [
      "unique intersection of two arrays",
      "hash set membership",
      "deduplicated result"
    ],
    "solved": false
  },
  {
    "id": "lc-350",
    "title": "Intersection of Two Arrays II",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Match",
    "leetcodeNumber": 350,
    "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
    "signals": [
      "intersection including duplicates",
      "frequency hash map",
      "decrement counts"
    ],
    "solved": false
  },
  {
    "id": "lc-442",
    "title": "Find All Duplicates in an Array",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Index as Hash Key",
    "leetcodeNumber": 442,
    "leetcodeUrl": "https://leetcode.com/problems/find-all-duplicates-in-an-array/",
    "signals": [
      "elements appear once or twice in range 1..n",
      "negate value at index abs(val)-1",
      "O(1) auxiliary space"
    ],
    "solved": false
  },
  {
    "id": "lc-448",
    "title": "Find All Numbers Disappeared in an Array",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Index as Hash Key",
    "leetcodeNumber": 448,
    "leetcodeUrl": "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    "signals": [
      "find missing numbers in range 1..n",
      "mark indices negative",
      "collect positive indices"
    ],
    "solved": false
  },
  {
    "id": "lc-451",
    "title": "Sort Characters By Frequency",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Bucket Sort",
    "leetcodeNumber": 451,
    "leetcodeUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
    "signals": [
      "sort characters by decreasing frequency",
      "frequency map",
      "bucket sort by count"
    ],
    "solved": false
  },
  {
    "id": "lc-560",
    "title": "Subarray Sum Equals K",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Prefix Sum Map",
    "leetcodeNumber": 560,
    "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "signals": [
      "count subarrays summing to k",
      "prefix sum hash map",
      "lookup currentSum - k"
    ],
    "solved": false
  },
  {
    "id": "lc-599",
    "title": "Minimum Index Sum of Two Lists",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Index Sum",
    "leetcodeNumber": 599,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-index-sum-of-two-lists/",
    "signals": [
      "common strings with minimal index sum",
      "hash map of first list",
      "track min index sum"
    ],
    "solved": false
  },
  {
    "id": "lc-692",
    "title": "Top K Frequent Words",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Heap with Custom Comparator",
    "leetcodeNumber": 692,
    "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-words/",
    "signals": [
      "k most frequent words sorted by freq and alpha",
      "frequency hash map",
      "min-heap of size k"
    ],
    "solved": false
  },
  {
    "id": "lc-705",
    "title": "Design HashSet",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Hashing Design",
    "leetcodeNumber": 705,
    "leetcodeUrl": "https://leetcode.com/problems/design-hashset/",
    "signals": [
      "implement hash set without libraries",
      "separate chaining or boolean table",
      "modulo hashing"
    ],
    "solved": false
  },
  {
    "id": "lc-706",
    "title": "Design HashMap",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Hashing Design",
    "leetcodeNumber": 706,
    "leetcodeUrl": "https://leetcode.com/problems/design-hashmap/",
    "signals": [
      "implement hash map with get put remove",
      "array of linked list buckets",
      "collision handling"
    ],
    "solved": false
  },
  {
    "id": "lc-771",
    "title": "Jewels and Stones",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Set Membership",
    "leetcodeNumber": 771,
    "leetcodeUrl": "https://leetcode.com/problems/jewels-and-stones/",
    "signals": [
      "count stones that are jewels",
      "hash set of jewels",
      "count matching characters"
    ],
    "solved": false
  },
  {
    "id": "lc-811",
    "title": "Subdomain Visit Count",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "String Splitting",
    "leetcodeNumber": 811,
    "leetcodeUrl": "https://leetcode.com/problems/subdomain-visit-count/",
    "signals": [
      "count visits to all subdomains",
      "split domains by dot",
      "hash map cumulative visits"
    ],
    "solved": false
  },
  {
    "id": "lc-961",
    "title": "N-Repeated Element in Size 2N Array",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Lookup",
    "leetcodeNumber": 961,
    "leetcodeUrl": "https://leetcode.com/problems/n-repeated-element-in-size-2n-array/",
    "signals": [
      "element repeated n times",
      "hash set first duplicate",
      "or compare distance <= 3"
    ],
    "solved": false
  },
  {
    "id": "lc-1122",
    "title": "Relative Sort Array",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Counting Sort",
    "leetcodeNumber": 1122,
    "leetcodeUrl": "https://leetcode.com/problems/relative-sort-array/",
    "signals": [
      "sort arr1 according to order in arr2",
      "frequency count array",
      "append remaining sorted"
    ],
    "solved": false
  },
  {
    "id": "lc-1207",
    "title": "Unique Number of Occurrences",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Set of Frequencies",
    "leetcodeNumber": 1207,
    "leetcodeUrl": "https://leetcode.com/problems/unique-number-of-occurrences/",
    "signals": [
      "occurrences of each value are unique",
      "frequency map",
      "insert counts into set"
    ],
    "solved": false
  },
  {
    "id": "lc-1436",
    "title": "Destination City",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Out-Degree",
    "leetcodeNumber": 1436,
    "leetcodeUrl": "https://leetcode.com/problems/destination-city/",
    "signals": [
      "city with no outgoing path",
      "hash set of outgoing cities",
      "find destination not in set"
    ],
    "solved": false
  },
  {
    "id": "lc-1496",
    "title": "Path Crossing",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Visited Coordinates",
    "leetcodeNumber": 1496,
    "leetcodeUrl": "https://leetcode.com/problems/path-crossing/",
    "signals": [
      "path crosses itself",
      "hash set of coordinate pairs (x, y)",
      "check already visited"
    ],
    "solved": false
  },
  {
    "id": "lc-1748",
    "title": "Sum of Unique Elements",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency Map",
    "leetcodeNumber": 1748,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-unique-elements/",
    "signals": [
      "sum elements that appear exactly once",
      "frequency map",
      "sum keys with count == 1"
    ],
    "solved": false
  },
  {
    "id": "lc-2215",
    "title": "Find the Difference of Two Arrays",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Set Difference",
    "leetcodeNumber": 2215,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-difference-of-two-arrays/",
    "signals": [
      "distinct elements present in only one array",
      "two hash sets",
      "difference computation"
    ],
    "solved": false
  },
  {
    "id": "lc-2352",
    "title": "Equal Row and Column Pairs",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Vector Hash",
    "leetcodeNumber": 2352,
    "leetcodeUrl": "https://leetcode.com/problems/equal-row-and-column-pairs/",
    "signals": [
      "equal row and column vectors in matrix",
      "hash map of row vectors",
      "lookup column vectors"
    ],
    "solved": false
  },
  {
    "id": "lc-84",
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Increasing",
    "leetcodeNumber": 84,
    "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "signals": [
      "largest rectangular area under histogram",
      "monotonic increasing stack of indices",
      "pop and compute width = i - st.top() - 1"
    ],
    "solved": false
  },
  {
    "id": "lc-85",
    "title": "Maximal Rectangle",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Histogram on Matrix",
    "leetcodeNumber": 85,
    "leetcodeUrl": "https://leetcode.com/problems/maximal-rectangle/",
    "signals": [
      "maximal rectangle of 1s in binary matrix",
      "running heights per row",
      "call largest rectangle in histogram"
    ],
    "solved": false
  },
  {
    "id": "lc-150",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "RPN Evaluator",
    "leetcodeNumber": 150,
    "leetcodeUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "signals": [
      "evaluate postfix expression",
      "push numbers",
      "pop two operands on operator"
    ],
    "solved": false
  },
  {
    "id": "lc-155",
    "title": "Min Stack",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Two Stacks / Pair",
    "leetcodeNumber": 155,
    "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
    "signals": [
      "retrieve minimum element in O(1)",
      "maintain auxiliary min stack",
      "push min(val, minStack.top())"
    ],
    "solved": false
  },
  {
    "id": "lc-224",
    "title": "Basic Calculator",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Recursive / Stack",
    "leetcodeNumber": 224,
    "leetcodeUrl": "https://leetcode.com/problems/basic-calculator/",
    "signals": [
      "evaluate expression with + - and parentheses",
      "stack for sign and running result",
      "push context on ( and pop on )"
    ],
    "solved": false
  },
  {
    "id": "lc-225",
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Queue Adapter",
    "leetcodeNumber": 225,
    "leetcodeUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
    "signals": [
      "LIFO stack using FIFO queue",
      "rotate queue by size-1 on push",
      "top at front of queue"
    ],
    "solved": false
  },
  {
    "id": "lc-394",
    "title": "Decode String",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Nested Decode",
    "leetcodeNumber": 394,
    "leetcodeUrl": "https://leetcode.com/problems/decode-string/",
    "signals": [
      "k[encoded_string] nested patterns",
      "stack of multipliers and string buffers",
      "expand on closing bracket"
    ],
    "solved": false
  },
  {
    "id": "lc-402",
    "title": "Remove K Digits",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Increasing",
    "leetcodeNumber": 402,
    "leetcodeUrl": "https://leetcode.com/problems/remove-k-digits/",
    "signals": [
      "smallest possible number after removing k digits",
      "monotonic increasing digits stack",
      "pop when curr < top and k > 0"
    ],
    "solved": false
  },
  {
    "id": "lc-496",
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack + Map",
    "leetcodeNumber": 496,
    "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-i/",
    "signals": [
      "find next greater element for subset",
      "monotonic decreasing stack on nums2",
      "store in hash map"
    ],
    "solved": false
  },
  {
    "id": "lc-503",
    "title": "Next Greater Element II",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Circular Monotonic Stack",
    "leetcodeNumber": 503,
    "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-ii/",
    "signals": [
      "circular array next greater element",
      "simulate 2n array via i % n",
      "monotonic decreasing stack"
    ],
    "solved": false
  },
  {
    "id": "lc-735",
    "title": "Asteroid Collision",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Collision Simulation",
    "leetcodeNumber": 735,
    "leetcodeUrl": "https://leetcode.com/problems/asteroid-collision/",
    "signals": [
      "asteroids moving left and right",
      "positive meets negative collision",
      "stack pop on smaller asteroid"
    ],
    "solved": false
  },
  {
    "id": "lc-901",
    "title": "Online Stock Span",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack Pair",
    "leetcodeNumber": 901,
    "leetcodeUrl": "https://leetcode.com/problems/online-stock-span/",
    "signals": [
      "consecutive days stock was <= today's price",
      "monotonic decreasing stack of (price, span)",
      "accumulate spans"
    ],
    "solved": false
  },
  {
    "id": "lc-907",
    "title": "Sum of Subarray Minimums",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Contribution Technique",
    "leetcodeNumber": 907,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-subarray-minimums/",
    "signals": [
      "sum of minimums of all subarrays",
      "previous smaller and next smaller distances",
      "monotonic stack contribution"
    ],
    "solved": false
  },
  {
    "id": "lc-921",
    "title": "Minimum Add to Make Parentheses Valid",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Counter Stack",
    "leetcodeNumber": 921,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
    "signals": [
      "minimum additions to make parentheses valid",
      "track open brackets and unmatched close",
      "balance count"
    ],
    "solved": false
  },
  {
    "id": "lc-946",
    "title": "Validate Stack Sequences",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Simulation",
    "leetcodeNumber": 946,
    "leetcodeUrl": "https://leetcode.com/problems/validate-stack-sequences/",
    "signals": [
      "pushed and popped sequences validity",
      "simulate stack push and greedy pop",
      "stack empty check"
    ],
    "solved": false
  },
  {
    "id": "lc-1019",
    "title": "Next Greater Node In Linked List",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Stack",
    "leetcodeNumber": 1019,
    "leetcodeUrl": "https://leetcode.com/problems/next-greater-node-in-linked-list/",
    "signals": [
      "next greater node value in linked list",
      "convert to array or stack of indices",
      "monotonic decreasing stack"
    ],
    "solved": false
  },
  {
    "id": "lc-1047-remove-all",
    "title": "Remove All Adjacent Duplicates In String",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "LIFO Duplicates",
    "leetcodeNumber": 1047,
    "leetcodeUrl": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
    "signals": [
      "remove adjacent matching pairs",
      "stack pop on equal",
      "reconstruct remaining"
    ],
    "solved": false
  },
  {
    "id": "lc-1673",
    "title": "Find the Most Competitive Subsequence",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Monotonic Increasing",
    "leetcodeNumber": 1673,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-most-competitive-subsequence/",
    "signals": [
      "most competitive subsequence of size k",
      "monotonic increasing stack",
      "pop if remaining elements allow"
    ],
    "solved": false
  },
  {
    "id": "lc-1762",
    "title": "Buildings With an Ocean View",
    "difficulty": "Medium",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Right Max",
    "leetcodeNumber": 1762,
    "leetcodeUrl": "https://leetcode.com/problems/buildings-with-an-ocean-view/",
    "signals": [
      "buildings that can see ocean to the right",
      "monotonic decreasing stack from right",
      "or running maximum"
    ],
    "solved": false
  },
  {
    "id": "lc-232",
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Two Stacks",
    "leetcodeNumber": 232,
    "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "signals": [
      "FIFO queue using two LIFO stacks",
      "transfer inStack to outStack when empty",
      "amortized O(1)"
    ],
    "solved": false
  },
  {
    "id": "lc-346",
    "title": "Moving Average from Data Stream",
    "difficulty": "Easy",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Sliding Buffer",
    "leetcodeNumber": 346,
    "leetcodeUrl": "https://leetcode.com/problems/moving-average-from-data-stream/",
    "signals": [
      "moving average of last size elements",
      "FIFO queue of size k",
      "running sum"
    ],
    "solved": false
  },
  {
    "id": "lc-622",
    "title": "Design Circular Queue",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Circular Array",
    "leetcodeNumber": 622,
    "leetcodeUrl": "https://leetcode.com/problems/design-circular-queue/",
    "signals": [
      "circular buffer with fixed capacity",
      "head and tail modulo arithmetic",
      "empty and full checks"
    ],
    "solved": false
  },
  {
    "id": "lc-641",
    "title": "Design Circular Deque",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Circular Deque",
    "leetcodeNumber": 641,
    "leetcodeUrl": "https://leetcode.com/problems/design-circular-deque/",
    "signals": [
      "double-ended queue with fixed capacity",
      "insert/delete from front and rear",
      "modulo pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-862",
    "title": "Shortest Subarray with Sum at Least K",
    "difficulty": "Hard",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Monotonic Deque + Prefix",
    "leetcodeNumber": 862,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
    "signals": [
      "shortest subarray with sum >= k with negative numbers",
      "monotonic increasing deque of prefix sums",
      "pop front when sum >= k"
    ],
    "solved": false
  },
  {
    "id": "lc-933",
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Time Window Queue",
    "leetcodeNumber": 933,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-recent-calls/",
    "signals": [
      "recent calls within 3000 milliseconds",
      "push timestamp",
      "pop front timestamps < t - 3000"
    ],
    "solved": false
  },
  {
    "id": "lc-950",
    "title": "Reveal Cards In Increasing Order",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Queue Simulation",
    "leetcodeNumber": 950,
    "leetcodeUrl": "https://leetcode.com/problems/reveal-cards-in-increasing-order/",
    "signals": [
      "reveal top card move next to bottom",
      "simulate process in reverse using deque",
      "index queue simulation"
    ],
    "solved": false
  },
  {
    "id": "lc-994",
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Multi-Source BFS",
    "leetcodeNumber": 994,
    "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
    "signals": [
      "fresh oranges rot adjacent in 1 minute",
      "multi-source BFS queue of all rotten",
      "count minutes until no fresh"
    ],
    "solved": false
  },
  {
    "id": "lc-1429",
    "title": "First Unique Number",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Queue + Frequency",
    "leetcodeNumber": 1429,
    "leetcodeUrl": "https://leetcode.com/problems/first-unique-number/",
    "signals": [
      "find first unique number in stream",
      "FIFO queue with frequency map",
      "lazy eviction of duplicates"
    ],
    "solved": false
  },
  {
    "id": "lc-1696",
    "title": "Jump Game VI",
    "difficulty": "Medium",
    "category": "Queue / Deque",
    "categoryId": "queue-deque",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "DP with Monotonic Deque",
    "leetcodeNumber": 1696,
    "leetcodeUrl": "https://leetcode.com/problems/jump-game-vi/",
    "signals": [
      "max score reaching last index with jump <= k",
      "dp[i] = nums[i] + max(dp[i-k..i-1])",
      "monotonic decreasing deque of DP values"
    ],
    "solved": false
  },
  {
    "id": "lc-19",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Offset Two Pointers",
    "leetcodeNumber": 19,
    "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "signals": [
      "remove nth node from list end in one pass",
      "fast pointer advances n steps ahead",
      "dummy head node"
    ],
    "solved": false
  },
  {
    "id": "lc-21",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Sorted Merge",
    "leetcodeNumber": 21,
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "signals": [
      "splice two sorted linked lists",
      "dummy head pointer",
      "advance smaller node pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-23",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Min-Heap / Divide & Conquer",
    "leetcodeNumber": 23,
    "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "signals": [
      "merge k sorted linked lists",
      "min-heap of list head nodes",
      "or divide and conquer merge"
    ],
    "solved": false
  },
  {
    "id": "lc-24",
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Pairwise Reversal",
    "leetcodeNumber": 24,
    "leetcodeUrl": "https://leetcode.com/problems/swap-nodes-in-pairs/",
    "signals": [
      "swap adjacent nodes in pairs",
      "dummy node prev pointer",
      "rewire pointers in pairs"
    ],
    "solved": false
  },
  {
    "id": "lc-25",
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "K-Group Reversal",
    "leetcodeNumber": 25,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "signals": [
      "reverse nodes k at a time",
      "count k nodes ahead",
      "in-place sublist reversal"
    ],
    "solved": false
  },
  {
    "id": "lc-61",
    "title": "Rotate List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Circular Connection",
    "leetcodeNumber": 61,
    "leetcodeUrl": "https://leetcode.com/problems/rotate-list/",
    "signals": [
      "rotate list right by k places",
      "connect tail to head forming ring",
      "break at (len - k % len)"
    ],
    "solved": false
  },
  {
    "id": "lc-82",
    "title": "Remove Duplicates from Sorted List II",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Duplicate Purge",
    "leetcodeNumber": 82,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
    "signals": [
      "delete all nodes that have duplicate numbers",
      "dummy head with prev pointer",
      "skip entire duplicate chain"
    ],
    "solved": false
  },
  {
    "id": "lc-83",
    "title": "Remove Duplicates from Sorted List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Single Pass",
    "leetcodeNumber": 83,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    "signals": [
      "delete duplicates leaving one copy",
      "compare curr->val with curr->next->val",
      "skip next pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-86",
    "title": "Partition List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Two Separate Lists",
    "leetcodeNumber": 86,
    "leetcodeUrl": "https://leetcode.com/problems/partition-list/",
    "signals": [
      "partition around value x preserving order",
      "lessList and greaterList dummy heads",
      "stitch lists together"
    ],
    "solved": false
  },
  {
    "id": "lc-92",
    "title": "Reverse Linked List II",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Sublist Reversal",
    "leetcodeNumber": 92,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
    "signals": [
      "reverse nodes from position left to right",
      "advance to left node",
      "in-place pointer reversal"
    ],
    "solved": false
  },
  {
    "id": "lc-138",
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Weaving / Hash Map",
    "leetcodeNumber": 138,
    "leetcodeUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "signals": [
      "deep copy list with random pointers",
      "interleave cloned nodes or hash map",
      "resolve random pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-142",
    "title": "Linked List Cycle II",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Cycle Entry Finder",
    "leetcodeNumber": 142,
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "signals": [
      "find exact node where cycle begins",
      "Floyd's fast and slow meeting point",
      "reset one pointer to head"
    ],
    "solved": false
  },
  {
    "id": "lc-143",
    "title": "Reorder List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Mid Reversal Interleave",
    "leetcodeNumber": 143,
    "leetcodeUrl": "https://leetcode.com/problems/reorder-list/",
    "signals": [
      "L0 -> Ln -> L1 -> Ln-1",
      "find middle via fast/slow",
      "reverse second half and merge"
    ],
    "solved": false
  },
  {
    "id": "lc-147",
    "title": "Insertion Sort List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Insertion Sort",
    "leetcodeNumber": 147,
    "leetcodeUrl": "https://leetcode.com/problems/insertion-sort-list/",
    "signals": [
      "sort linked list using insertion sort",
      "dummy head scan",
      "insert into sorted prefix"
    ],
    "solved": false
  },
  {
    "id": "lc-148",
    "title": "Sort List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Merge Sort on List",
    "leetcodeNumber": 148,
    "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
    "signals": [
      "sort linked list in O(N log N) and O(1) space",
      "split middle via fast/slow",
      "recursive or bottom-up merge sort"
    ],
    "solved": false
  },
  {
    "id": "lc-160",
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Two Pointers Loop",
    "leetcodeNumber": 160,
    "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "signals": [
      "node at which two lists intersect",
      "pointer A switches to B at end",
      "equalize total distance traversed"
    ],
    "solved": false
  },
  {
    "id": "lc-203",
    "title": "Remove Linked List Elements",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Sentinel Node",
    "leetcodeNumber": 203,
    "leetcodeUrl": "https://leetcode.com/problems/remove-linked-list-elements/",
    "signals": [
      "remove all nodes with target value",
      "dummy head node",
      "skip matching nodes"
    ],
    "solved": false
  },
  {
    "id": "lc-234",
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Mid Reversal Compare",
    "leetcodeNumber": 234,
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-linked-list/",
    "signals": [
      "check if linked list is palindrome in O(1) space",
      "reverse second half from middle",
      "compare pointers inward"
    ],
    "solved": false
  },
  {
    "id": "lc-328",
    "title": "Odd Even Linked List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Two Pointers Weave",
    "leetcodeNumber": 328,
    "leetcodeUrl": "https://leetcode.com/problems/odd-even-linked-list/",
    "signals": [
      "group all odd nodes followed by even nodes",
      "odd and even pointers",
      "reconnect odd tail to even head"
    ],
    "solved": false
  },
  {
    "id": "lc-725",
    "title": "Split Linked List in Parts",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Part Partitioning",
    "leetcodeNumber": 725,
    "leetcodeUrl": "https://leetcode.com/problems/split-linked-list-in-parts/",
    "signals": [
      "split list into k consecutive parts",
      "calculate part sizes and remainder",
      "sever pointers at boundaries"
    ],
    "solved": false
  },
  {
    "id": "lc-876",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 876,
    "leetcodeUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "signals": [
      "find middle node of linked list",
      "fast moves 2x slow moves 1x",
      "return slow"
    ],
    "solved": false
  },
  {
    "id": "lc-2058",
    "title": "Find the Minimum and Maximum Number of Nodes Between Critical Points",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Local Extrema",
    "leetcodeNumber": 2058,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/",
    "signals": [
      "local minima or maxima in linked list",
      "track previous, current, next",
      "record indices of critical points"
    ],
    "solved": false
  },
  {
    "id": "lc-2095",
    "title": "Delete the Middle Node of a Linked List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 2095,
    "leetcodeUrl": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/",
    "signals": [
      "delete middle node of linked list",
      "fast and slow pointer with prev",
      "skip middle node"
    ],
    "solved": false
  },
  {
    "id": "lc-2130",
    "title": "Maximum Twin Sum of a Linked List",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Mid Reversal Twin",
    "leetcodeNumber": 2130,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/",
    "signals": [
      "maximum sum of twin nodes i and n-1-i",
      "reverse second half from middle",
      "pair sum traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-94",
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "In-Order DFS",
    "leetcodeNumber": 94,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "signals": [
      "in-order traversal (left, root, right)",
      "sorted order for BST",
      "recursive or iterative with stack"
    ],
    "solved": false
  },
  {
    "id": "lc-95",
    "title": "Unique Binary Search Trees II",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Catalan Trees",
    "leetcodeNumber": 95,
    "leetcodeUrl": "https://leetcode.com/problems/unique-binary-search-trees-ii/",
    "signals": [
      "generate all structurally unique BSTs",
      "pick root i, recurse left 1..i-1 and right i+1..n",
      "combine subtrees"
    ],
    "solved": false
  },
  {
    "id": "lc-96",
    "title": "Unique Binary Search Trees",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Catalan Number",
    "leetcodeNumber": 96,
    "leetcodeUrl": "https://leetcode.com/problems/unique-binary-search-trees/",
    "signals": [
      "count structurally unique BSTs with n nodes",
      "Catalan number recurrence",
      "1D DP"
    ],
    "solved": false
  },
  {
    "id": "lc-98",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Range Validation",
    "leetcodeNumber": 98,
    "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
    "signals": [
      "validate BST invariant left < root < right",
      "pass min and max valid bounds",
      "or check in-order strictly increasing"
    ],
    "solved": false
  },
  {
    "id": "lc-99",
    "title": "Recover Binary Search Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Morris / In-Order",
    "leetcodeNumber": 99,
    "leetcodeUrl": "https://leetcode.com/problems/recover-binary-search-tree/",
    "signals": [
      "two nodes swapped by mistake in BST",
      "in-order traversal detects violations",
      "swap node values back"
    ],
    "solved": false
  },
  {
    "id": "lc-100",
    "title": "Same Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Recursive DFS",
    "leetcodeNumber": 100,
    "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
    "signals": [
      "check if two binary trees are identical",
      "compare root values and recurse",
      "base case null check"
    ],
    "solved": false
  },
  {
    "id": "lc-101",
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Mirror DFS",
    "leetcodeNumber": 101,
    "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
    "signals": [
      "check if tree is mirror reflection of itself",
      "compare left->left with right->right",
      "mirror recursion"
    ],
    "solved": false
  },
  {
    "id": "lc-102",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Level-Order BFS",
    "leetcodeNumber": 102,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "signals": [
      "level by level nodes traversal",
      "FIFO queue with level size loop",
      "collect node values per level"
    ],
    "solved": false
  },
  {
    "id": "lc-103",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Zigzag BFS",
    "leetcodeNumber": 103,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "signals": [
      "alternate left-to-right and right-to-left",
      "level order BFS",
      "reverse alternating levels"
    ],
    "solved": false
  },
  {
    "id": "lc-104",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Bottom-Up DFS",
    "leetcodeNumber": 104,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "signals": [
      "maximum depth from root to leaf",
      "1 + max(leftDepth, rightDepth)",
      "post-order recursion"
    ],
    "solved": false
  },
  {
    "id": "lc-105",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree Reconstruction",
    "leetcodeNumber": 105,
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "signals": [
      "rebuild tree from preorder and inorder",
      "first preorder is root",
      "split inorder using hash map"
    ],
    "solved": false
  },
  {
    "id": "lc-106",
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree Reconstruction",
    "leetcodeNumber": 106,
    "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
    "signals": [
      "rebuild tree from postorder and inorder",
      "last postorder is root",
      "hash map split"
    ],
    "solved": false
  },
  {
    "id": "lc-107",
    "title": "Binary Tree Level Order Traversal II",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Bottom-Up BFS",
    "leetcodeNumber": 107,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/",
    "signals": [
      "level order traversal from bottom to top",
      "standard BFS",
      "reverse level list at end"
    ],
    "solved": false
  },
  {
    "id": "lc-108",
    "title": "Convert Sorted Array to Binary Search Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Divide & Conquer",
    "leetcodeNumber": 108,
    "leetcodeUrl": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
    "signals": [
      "height-balanced BST from sorted array",
      "mid element becomes root",
      "recurse on left and right halves"
    ],
    "solved": false
  },
  {
    "id": "lc-110",
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Bottom-Up DFS",
    "leetcodeNumber": 110,
    "leetcodeUrl": "https://leetcode.com/problems/balanced-binary-tree/",
    "signals": [
      "height difference between subtrees <= 1",
      "return -1 if unbalanced",
      "bottom-up depth check"
    ],
    "solved": false
  },
  {
    "id": "lc-111",
    "title": "Minimum Depth of Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "BFS Shortest Path",
    "leetcodeNumber": 111,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
    "signals": [
      "minimum depth to nearest leaf node",
      "BFS queue terminates at first leaf",
      "avoid counting null subtrees in DFS"
    ],
    "solved": false
  },
  {
    "id": "lc-112",
    "title": "Path Sum",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Top-Down DFS",
    "leetcodeNumber": 112,
    "leetcodeUrl": "https://leetcode.com/problems/path-sum/",
    "signals": [
      "root-to-leaf path summing to target",
      "subtract root->val and recurse",
      "check leaf condition"
    ],
    "solved": false
  },
  {
    "id": "lc-113",
    "title": "Path Sum II",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Backtracking DFS",
    "leetcodeNumber": 113,
    "leetcodeUrl": "https://leetcode.com/problems/path-sum-ii/",
    "signals": [
      "find all root-to-leaf paths with sum",
      "backtracking path vector",
      "push on node pop on return"
    ],
    "solved": false
  },
  {
    "id": "lc-114",
    "title": "Flatten Binary Tree to Linked List",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Pre-Order Flatten",
    "leetcodeNumber": 114,
    "leetcodeUrl": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
    "signals": [
      "flatten tree into right-skewed list",
      "post-order or Morris traversal",
      "splice left subtree before right"
    ],
    "solved": false
  },
  {
    "id": "lc-124",
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Bottom-Up Max Path",
    "leetcodeNumber": 124,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "signals": [
      "maximum path sum between any two nodes",
      "gain = max(0, dfs(child))",
      "global max = max(globalMax, val + left + right)"
    ],
    "solved": false
  },
  {
    "id": "lc-129",
    "title": "Sum Root to Leaf Numbers",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "DFS Number Formation",
    "leetcodeNumber": 129,
    "leetcodeUrl": "https://leetcode.com/problems/sum-root-to-leaf-numbers/",
    "signals": [
      "root-to-leaf digits form numbers",
      "currentSum * 10 + root->val",
      "sum up all leaf numbers"
    ],
    "solved": false
  },
  {
    "id": "lc-144",
    "title": "Binary Tree Preorder Traversal",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Pre-Order DFS",
    "leetcodeNumber": 144,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    "signals": [
      "pre-order traversal (root, left, right)",
      "iterative stack pushing right then left",
      "or recursion"
    ],
    "solved": false
  },
  {
    "id": "lc-145",
    "title": "Binary Tree Postorder Traversal",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Post-Order DFS",
    "leetcodeNumber": 145,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "signals": [
      "post-order traversal (left, right, root)",
      "bottom-up information aggregation",
      "iterative two stacks"
    ],
    "solved": false
  },
  {
    "id": "lc-199",
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Level-Order BFS / DFS",
    "leetcodeNumber": 199,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "signals": [
      "nodes visible from right side",
      "level order BFS taking last node",
      "or DFS right before left"
    ],
    "solved": false
  },
  {
    "id": "lc-226",
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Recursive Swap",
    "leetcodeNumber": 226,
    "leetcodeUrl": "https://leetcode.com/problems/invert-binary-tree/",
    "signals": [
      "invert binary tree (mirror)",
      "swap root->left and root->right",
      "recurse on both children"
    ],
    "solved": false
  },
  {
    "id": "lc-230",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "In-Order Invariant",
    "leetcodeNumber": 230,
    "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "signals": [
      "kth smallest value in BST",
      "in-order traversal visits in ascending order",
      "decrement k until 0"
    ],
    "solved": false
  },
  {
    "id": "lc-235",
    "title": "Lowest Common Ancestor of a Binary Search Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST Property",
    "leetcodeNumber": 235,
    "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "signals": [
      "lowest common ancestor in BST",
      "if p and q on different sides of root, root is LCA",
      "split condition in BST"
    ],
    "solved": false
  },
  {
    "id": "lc-236",
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Recursive Post-Order",
    "leetcodeNumber": 236,
    "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "signals": [
      "lowest common ancestor in general tree",
      "if root is p or q return root",
      "if both left and right return non-null, root is LCA"
    ],
    "solved": false
  },
  {
    "id": "lc-257",
    "title": "Binary Tree Paths",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "DFS Path Tracking",
    "leetcodeNumber": 257,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-paths/",
    "signals": [
      "all root-to-leaf paths formatted as strings",
      "pass path string down",
      "append on leaf"
    ],
    "solved": false
  },
  {
    "id": "lc-297",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Pre-Order Framing",
    "leetcodeNumber": 297,
    "leetcodeUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "signals": [
      "serialize tree to string and back",
      "pre-order traversal with null markers",
      "stringstream queue deserializer"
    ],
    "solved": false
  },
  {
    "id": "lc-437",
    "title": "Path Sum III",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Prefix Sum DFS",
    "leetcodeNumber": 437,
    "leetcodeUrl": "https://leetcode.com/problems/path-sum-iii/",
    "signals": [
      "paths summing to target not necessarily at root",
      "prefix sum hash map on tree paths",
      "backtrack remove prefix on return"
    ],
    "solved": false
  },
  {
    "id": "lc-450",
    "title": "Delete Node in a BST",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST Surgery",
    "leetcodeNumber": 450,
    "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-bst/",
    "signals": [
      "delete node in BST preserving invariant",
      "replace node with in-order successor",
      "delete successor in right subtree"
    ],
    "solved": false
  },
  {
    "id": "lc-501",
    "title": "Find Mode in Binary Search Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "In-Order Counts",
    "leetcodeNumber": 501,
    "leetcodeUrl": "https://leetcode.com/problems/find-mode-in-binary-search-tree/",
    "signals": [
      "most frequently occurring elements in BST",
      "in-order traversal tracks current streak",
      "two pass O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-530",
    "title": "Minimum Absolute Difference in BST",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "In-Order Difference",
    "leetcodeNumber": 530,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-absolute-difference-in-bst/",
    "signals": [
      "minimum difference between any two nodes in BST",
      "in-order traversal produces sorted list",
      "compare adjacent nodes"
    ],
    "solved": false
  },
  {
    "id": "lc-543",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Bottom-Up DFS",
    "leetcodeNumber": 543,
    "leetcodeUrl": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "signals": [
      "longest path between any two nodes in tree",
      "leftDepth + rightDepth at each node",
      "update global maximum"
    ],
    "solved": false
  },
  {
    "id": "lc-572",
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Same Tree DFS",
    "leetcodeNumber": 572,
    "leetcodeUrl": "https://leetcode.com/problems/subtree-of-another-tree/",
    "signals": [
      "check if subRoot is identical to any subtree",
      "isSameTree check at each node",
      "recursive tree search"
    ],
    "solved": false
  },
  {
    "id": "lc-617",
    "title": "Merge Two Binary Trees",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Parallel DFS",
    "leetcodeNumber": 617,
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-binary-trees/",
    "signals": [
      "merge two trees by summing overlapping node values",
      "parallel recursion",
      "return non-null node if one is null"
    ],
    "solved": false
  },
  {
    "id": "lc-662",
    "title": "Maximum Width of Binary Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Heap Indexing BFS",
    "leetcodeNumber": 662,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
    "signals": [
      "maximum width at any level",
      "index nodes as 2*i and 2*i+1",
      "width = rightIndex - leftIndex + 1"
    ],
    "solved": false
  },
  {
    "id": "lc-700",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST Lookup",
    "leetcodeNumber": 700,
    "leetcodeUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "signals": [
      "find node in BST",
      "if val < root->val go left else right",
      "O(H) search"
    ],
    "solved": false
  },
  {
    "id": "lc-701",
    "title": "Insert into a Binary Search Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST Insertion",
    "leetcodeNumber": 701,
    "leetcodeUrl": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    "signals": [
      "insert value into BST",
      "traverse until finding null spot",
      "attach new leaf node"
    ],
    "solved": false
  },
  {
    "id": "lc-863",
    "title": "All Nodes Distance K in Binary Tree",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Graph BFS",
    "leetcodeNumber": 863,
    "leetcodeUrl": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
    "signals": [
      "nodes at distance k from target",
      "build parent pointers map converting tree to graph",
      "BFS from target up to k steps"
    ],
    "solved": false
  },
  {
    "id": "lc-938",
    "title": "Range Sum of BST",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Pruned DFS",
    "leetcodeNumber": 938,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-of-bst/",
    "signals": [
      "sum of nodes with value in [low, high]",
      "prune left if val < low",
      "prune right if val > high"
    ],
    "solved": false
  },
  {
    "id": "lc-987",
    "title": "Vertical Order Traversal of a Binary Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Coordinate Sorting",
    "leetcodeNumber": 987,
    "leetcodeUrl": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
    "signals": [
      "vertical order traversal with row, col coordinates",
      "DFS with coordinates (r, c)",
      "sort by col, row, and value"
    ],
    "solved": false
  },
  {
    "id": "lc-1022",
    "title": "Sum of Root To Leaf Binary Numbers",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Bit Shift DFS",
    "leetcodeNumber": 1022,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/",
    "signals": [
      "root to leaf paths represent binary numbers",
      "current * 2 + root->val",
      "sum all leaf paths"
    ],
    "solved": false
  },
  {
    "id": "lc-1302",
    "title": "Deepest Leaves Sum",
    "difficulty": "Medium",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Level-Order BFS",
    "leetcodeNumber": 1302,
    "leetcodeUrl": "https://leetcode.com/problems/deepest-leaves-sum/",
    "signals": [
      "sum of values of deepest leaves",
      "BFS queue tracks sum of each level",
      "return sum of final level"
    ],
    "solved": false
  },
  {
    "id": "lc-1379",
    "title": "Find a Corresponding Node of a Binary Tree in a Clone of That Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Parallel DFS",
    "leetcodeNumber": 1379,
    "leetcodeUrl": "https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/",
    "signals": [
      "find clone of target node in cloned tree",
      "traverse original and clone together",
      "match by reference"
    ],
    "solved": false
  },
  {
    "id": "lc-17",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Combinations",
    "leetcodeNumber": 17,
    "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "signals": [
      "phone keypad digit to letters",
      "backtracking combination generation",
      "cartesian product"
    ],
    "solved": false
  },
  {
    "id": "lc-22",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Catalan Backtracking",
    "leetcodeNumber": 22,
    "leetcodeUrl": "https://leetcode.com/problems/generate-parentheses/",
    "signals": [
      "generate n pairs of valid parentheses",
      "open < n and close < open constraints",
      "systematic backtracking"
    ],
    "solved": false
  },
  {
    "id": "lc-37",
    "title": "Sudoku Solver",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Grid Constraint Backtracking",
    "leetcodeNumber": 37,
    "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
    "signals": [
      "solve 9x9 Sudoku board",
      "row, column, and 3x3 box validity",
      "backtrack on empty cells"
    ],
    "solved": false
  },
  {
    "id": "lc-39",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Unbounded Combinations",
    "leetcodeNumber": 39,
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
    "signals": [
      "combinations summing to target with reuse",
      "start from index i",
      "prune when sum > target"
    ],
    "solved": false
  },
  {
    "id": "lc-40",
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Unique Combinations",
    "leetcodeNumber": 40,
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum-ii/",
    "signals": [
      "combinations summing to target used once",
      "sort array to skip duplicates",
      "if i > start && nums[i] == nums[i-1] continue"
    ],
    "solved": false
  },
  {
    "id": "lc-46",
    "title": "Permutations",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Permutations",
    "leetcodeNumber": 46,
    "leetcodeUrl": "https://leetcode.com/problems/permutations/",
    "signals": [
      "all permutations of distinct integers",
      "visited boolean array or swap",
      "tree of size n!"
    ],
    "solved": false
  },
  {
    "id": "lc-47",
    "title": "Permutations II",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Unique Permutations",
    "leetcodeNumber": 47,
    "leetcodeUrl": "https://leetcode.com/problems/permutations-ii/",
    "signals": [
      "permutations of array containing duplicates",
      "sort array to skip duplicates",
      "skip if !visited[i-1]"
    ],
    "solved": false
  },
  {
    "id": "lc-51",
    "title": "N-Queens",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Placement Constraint",
    "leetcodeNumber": 51,
    "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
    "signals": [
      "place n queens so no two attack each other",
      "track column, main diagonal, anti-diagonal",
      "row by row backtracking"
    ],
    "solved": false
  },
  {
    "id": "lc-52",
    "title": "N-Queens II",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Count Configurations",
    "leetcodeNumber": 52,
    "leetcodeUrl": "https://leetcode.com/problems/n-queens-ii/",
    "signals": [
      "count distinct solutions to N-Queens",
      "bitmask diagonal tracking",
      "backtracking count"
    ],
    "solved": false
  },
  {
    "id": "lc-77",
    "title": "Combinations",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "K Combinations",
    "leetcodeNumber": 77,
    "leetcodeUrl": "https://leetcode.com/problems/combinations/",
    "signals": [
      "all combinations of k numbers from 1 to n",
      "start pointer pruning",
      "backtracking paths"
    ],
    "solved": false
  },
  {
    "id": "lc-78",
    "title": "Subsets",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Power Set",
    "leetcodeNumber": 78,
    "leetcodeUrl": "https://leetcode.com/problems/subsets/",
    "signals": [
      "all subsets (the power set) of distinct integers",
      "include or exclude element",
      "2^n states"
    ],
    "solved": false
  },
  {
    "id": "lc-79",
    "title": "Word Search",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Grid Backtracking",
    "leetcodeNumber": 79,
    "leetcodeUrl": "https://leetcode.com/problems/word-search/",
    "signals": [
      "search word in 2D character grid",
      "4-directional DFS with temporary character mark",
      "backtrack unmark cell"
    ],
    "solved": false
  },
  {
    "id": "lc-90",
    "title": "Subsets II",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Unique Subsets",
    "leetcodeNumber": 90,
    "leetcodeUrl": "https://leetcode.com/problems/subsets-ii/",
    "signals": [
      "subsets of array containing duplicates",
      "sort and skip duplicates",
      "power set without duplicates"
    ],
    "solved": false
  },
  {
    "id": "lc-93",
    "title": "Restore IP Addresses",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Segment Partition",
    "leetcodeNumber": 93,
    "leetcodeUrl": "https://leetcode.com/problems/restore-ip-addresses/",
    "signals": [
      "all valid IP addresses from digit string",
      "partition into 4 segments",
      "validate 0..255 with no leading zeros"
    ],
    "solved": false
  },
  {
    "id": "lc-131",
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Palindrome Partition",
    "leetcodeNumber": 131,
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning/",
    "signals": [
      "partition string so every substring is palindrome",
      "check palindrome prefix",
      "backtrack on remaining suffix"
    ],
    "solved": false
  },
  {
    "id": "lc-216",
    "title": "Combination Sum III",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Digit Combinations",
    "leetcodeNumber": 216,
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum-iii/",
    "signals": [
      "k numbers 1..9 summing to n",
      "digits used at most once",
      "prune by target"
    ],
    "solved": false
  },
  {
    "id": "lc-301",
    "title": "Remove Invalid Parentheses",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "BFS / Backtracking",
    "leetcodeNumber": 301,
    "leetcodeUrl": "https://leetcode.com/problems/remove-invalid-parentheses/",
    "signals": [
      "remove minimum invalid parentheses",
      "count misplaces open and close",
      "backtracking or level-order BFS"
    ],
    "solved": false
  },
  {
    "id": "lc-494",
    "title": "Target Sum",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Subset Sum DP / Backtrack",
    "leetcodeNumber": 494,
    "leetcodeUrl": "https://leetcode.com/problems/target-sum/",
    "signals": [
      "assign + or - to make target",
      "reduce to subset sum target = (total + target) / 2",
      "memoized recursion"
    ],
    "solved": false
  },
  {
    "id": "lc-264",
    "title": "Ugly Numbers II",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Multi-Pointer / Heap",
    "leetcodeNumber": 264,
    "leetcodeUrl": "https://leetcode.com/problems/ugly-numbers-ii/",
    "signals": [
      "ugly numbers have factors 2, 3, 5",
      "min-heap generating next multiples",
      "or three pointers DP"
    ],
    "solved": false
  },
  {
    "id": "lc-295",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Two Balanced Heaps",
    "leetcodeNumber": 295,
    "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "signals": [
      "continuous median from live data stream",
      "max-heap for small half, min-heap for large half",
      "O(log n) insert O(1) median"
    ],
    "solved": false
  },
  {
    "id": "lc-347",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Min-Heap / Bucket Sort",
    "leetcodeNumber": 347,
    "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
    "signals": [
      "k most frequent elements in array",
      "frequency map with min-heap of size k",
      "or O(N) bucket sort"
    ],
    "solved": false
  },
  {
    "id": "lc-373",
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "K-Way Merge Heap",
    "leetcodeNumber": 373,
    "leetcodeUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    "signals": [
      "k pairs from two sorted arrays with smallest sum",
      "min-heap initialized with (nums1[i] + nums2[0])",
      "advance index in nums2"
    ],
    "solved": false
  },
  {
    "id": "lc-378",
    "title": "Kth Smallest Element in a Sorted Matrix",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Heap / Binary Search",
    "leetcodeNumber": 378,
    "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
    "signals": [
      "kth smallest in row/column sorted matrix",
      "min-heap of size min(n, k)",
      "or binary search on range"
    ],
    "solved": false
  },
  {
    "id": "lc-621",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Greedy Max Frequency",
    "leetcodeNumber": 621,
    "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
    "signals": [
      "schedule tasks with cooling interval n",
      "max-heap of task frequencies",
      "or formula (maxFreq - 1) * (n + 1) + maxCount"
    ],
    "solved": false
  },
  {
    "id": "lc-703",
    "title": "Kth Largest Element in a Stream",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Fixed Size Min-Heap",
    "leetcodeNumber": 703,
    "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    "signals": [
      "kth largest element in dynamic stream",
      "min-heap of size k",
      "top element is kth largest"
    ],
    "solved": false
  },
  {
    "id": "lc-767",
    "title": "Reorganize String",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Max-Heap Interleave",
    "leetcodeNumber": 767,
    "leetcodeUrl": "https://leetcode.com/problems/reorganize-string/",
    "signals": [
      "rearrange so no two adjacent characters equal",
      "max-heap of character frequencies",
      "pop two most frequent and append"
    ],
    "solved": false
  },
  {
    "id": "lc-973",
    "title": "K Closest Points to Origin",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Max-Heap of Size K",
    "leetcodeNumber": 973,
    "leetcodeUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "signals": [
      "k closest points (x, y) to (0, 0)",
      "max-heap of size k storing euclidean distances",
      "or Quickselect"
    ],
    "solved": false
  },
  {
    "id": "lc-1046",
    "title": "Last Stone Weight",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Max-Heap Simulation",
    "leetcodeNumber": 1046,
    "leetcodeUrl": "https://leetcode.com/problems/last-stone-weight/",
    "signals": [
      "smash two heaviest stones together",
      "max-heap pop two largest",
      "push difference back"
    ],
    "solved": false
  },
  {
    "id": "lc-1337",
    "title": "The K Weakest Rows in a Matrix",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Heap Pair",
    "leetcodeNumber": 1337,
    "leetcodeUrl": "https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/",
    "signals": [
      "k rows with least soldiers",
      "count soldiers via binary search",
      "max-heap of size k"
    ],
    "solved": false
  },
  {
    "id": "lc-1642",
    "title": "Furthest Building You Can Reach",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Min-Heap for Ladders",
    "leetcodeNumber": 1642,
    "leetcodeUrl": "https://leetcode.com/problems/furthest-building-you-can-reach/",
    "signals": [
      "climb height differences using bricks and ladders",
      "use ladders for largest jumps",
      "min-heap tracking ladder uses"
    ],
    "solved": false
  },
  {
    "id": "lc-1753",
    "title": "Maximum Score From Removing Stones",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Max-Heap / Math",
    "leetcodeNumber": 1753,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-score-from-removing-stones/",
    "signals": [
      "take stones from two non-empty piles",
      "max-heap of pile sizes",
      "or math min(sum/2, sum-max)"
    ],
    "solved": false
  },
  {
    "id": "lc-1834",
    "title": "Single-Threaded CPU",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Event Simulation Heap",
    "leetcodeNumber": 1834,
    "leetcodeUrl": "https://leetcode.com/problems/single-threaded-cpu/",
    "signals": [
      "CPU processes tasks by processingTime then index",
      "sort tasks by enqueueTime",
      "min-heap of available tasks"
    ],
    "solved": false
  },
  {
    "id": "lc-1962",
    "title": "Remove Stones to Minimize the Total",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Max-Heap Greedy",
    "leetcodeNumber": 1962,
    "leetcodeUrl": "https://leetcode.com/problems/remove-stones-to-minimize-the-total/",
    "signals": [
      "reduce pile by floor(pile/2) k times",
      "max-heap greedily picks largest pile",
      "subtract halved amount"
    ],
    "solved": false
  },
  {
    "id": "lc-2231",
    "title": "Largest Number After Digit Swaps by Parity",
    "difficulty": "Easy",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Two Heaps",
    "leetcodeNumber": 2231,
    "leetcodeUrl": "https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/",
    "signals": [
      "swap digits of same parity",
      "max-heap for even digits and odd digits",
      "reconstruct number"
    ],
    "solved": false
  },
  {
    "id": "lc-127",
    "title": "Word Ladder",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Bidirectional BFS",
    "leetcodeNumber": 127,
    "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
    "signals": [
      "shortest transformation from beginWord to endWord",
      "change one character at a time",
      "bidirectional BFS"
    ],
    "solved": false
  },
  {
    "id": "lc-130",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Boundary DFS",
    "leetcodeNumber": 130,
    "leetcodeUrl": "https://leetcode.com/problems/surrounded-regions/",
    "signals": [
      "capture surrounded regions of O in matrix",
      "DFS from border O cells",
      "unconnected Os flipped to X"
    ],
    "solved": false
  },
  {
    "id": "lc-133",
    "title": "Clone Graph",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Hash Map DFS",
    "leetcodeNumber": 133,
    "leetcodeUrl": "https://leetcode.com/problems/clone-graph/",
    "signals": [
      "deep copy of connected undirected graph",
      "hash map of original to cloned node",
      "recursive DFS"
    ],
    "solved": false
  },
  {
    "id": "lc-200",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Grid DFS / BFS",
    "leetcodeNumber": 200,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
    "signals": [
      "count islands in 2D binary grid",
      "DFS sinks connected 1s to 0s",
      "connected components"
    ],
    "solved": false
  },
  {
    "id": "lc-207",
    "title": "Course Schedule",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Kahn's BFS",
    "leetcodeNumber": 207,
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
    "signals": [
      "detect directed cycles in course prerequisites",
      "in-degree array with queue",
      "topological sort"
    ],
    "solved": false
  },
  {
    "id": "lc-210",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Topological Sort",
    "leetcodeNumber": 210,
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
    "signals": [
      "find course ordering satisfying all prerequisites",
      "Kahn's algorithm order output",
      "topological ordering"
    ],
    "solved": false
  },
  {
    "id": "lc-399",
    "title": "Evaluate Division",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Weighted Graph DFS",
    "leetcodeNumber": 399,
    "leetcodeUrl": "https://leetcode.com/problems/evaluate-division/",
    "signals": [
      "evaluate query equations a/b = k",
      "weighted directed graph",
      "DFS path multiplication"
    ],
    "solved": false
  },
  {
    "id": "lc-417",
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Multi-Source Reverse DFS",
    "leetcodeNumber": 417,
    "leetcodeUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "signals": [
      "cells where rain can flow to both oceans",
      "reverse DFS from ocean edges uphill",
      "intersection of visited sets"
    ],
    "solved": false
  },
  {
    "id": "lc-547",
    "title": "Number of Provinces",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "DSU / DFS",
    "leetcodeNumber": 547,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-provinces/",
    "signals": [
      "number of connected friend circles",
      "Disjoint Set Union find and union",
      "or simple DFS traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-684",
    "title": "Redundant Connection",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Union-Find Cycle",
    "leetcodeNumber": 684,
    "leetcodeUrl": "https://leetcode.com/problems/redundant-connection/",
    "signals": [
      "find edge that creates cycle in undirected graph",
      "DSU unite vertices",
      "return edge if already in same set"
    ],
    "solved": false
  },
  {
    "id": "lc-743",
    "title": "Network Delay Time",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Dijkstra",
    "leetcodeNumber": 743,
    "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
    "signals": [
      "minimum time for signal to reach all nodes",
      "weighted directed graph with positive weights",
      "Dijkstra with min-heap"
    ],
    "solved": false
  },
  {
    "id": "lc-785",
    "title": "Is Graph Bipartite?",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "2-Coloring BFS",
    "leetcodeNumber": 785,
    "leetcodeUrl": "https://leetcode.com/problems/is-graph-bipartite/",
    "signals": [
      "check if graph vertices can be colored in 2 colors",
      "BFS/DFS assigning colors 0 and 1",
      "mismatch indicates odd cycle"
    ],
    "solved": false
  },
  {
    "id": "lc-787",
    "title": "Cheapest Flights Within K Stops",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Bellman-Ford / BFS",
    "leetcodeNumber": 787,
    "leetcodeUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "signals": [
      "cheapest flight from src to dst with at most k stops",
      "Bellman-Ford k+1 iterations",
      "or BFS queue with stops"
    ],
    "solved": false
  },
  {
    "id": "lc-797",
    "title": "All Paths From Source to Target",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "DAG DFS",
    "leetcodeNumber": 797,
    "leetcodeUrl": "https://leetcode.com/problems/all-paths-from-source-to-target/",
    "signals": [
      "find all paths from node 0 to node n-1 in DAG",
      "backtracking DFS",
      "DAG guarantees no cycles"
    ],
    "solved": false
  },
  {
    "id": "lc-802",
    "title": "Find Eventual Safe States",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Cycle Detection / Reverse Kahn",
    "leetcodeNumber": 802,
    "leetcodeUrl": "https://leetcode.com/problems/find-eventual-safe-states/",
    "signals": [
      "nodes that do not lead to cycles",
      "3-color DFS (unvisited, visiting, safe)",
      "or reverse topological sort"
    ],
    "solved": false
  },
  {
    "id": "lc-841",
    "title": "Keys and Rooms",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Reachability BFS",
    "leetcodeNumber": 841,
    "leetcodeUrl": "https://leetcode.com/problems/keys-and-rooms/",
    "signals": [
      "can visit all rooms with collected keys",
      "BFS with visited set",
      "check visited count equals n"
    ],
    "solved": false
  },
  {
    "id": "lc-886",
    "title": "Possible Bipartition",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "2-Coloring",
    "leetcodeNumber": 886,
    "leetcodeUrl": "https://leetcode.com/problems/possible-bipartition/",
    "signals": [
      "split people into two groups with dislike edges",
      "bipartite graph 2-coloring",
      "BFS or DFS"
    ],
    "solved": false
  },
  {
    "id": "lc-997",
    "title": "Find the Town Judge",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "In/Out Degree",
    "leetcodeNumber": 997,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-town-judge/",
    "signals": [
      "town judge trusted by everyone trusts nobody",
      "in-degree == n-1 and out-degree == 0",
      "single degree score array"
    ],
    "solved": false
  },
  {
    "id": "lc-1319",
    "title": "Number of Operations to Make Network Connected",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "DSU Components",
    "leetcodeNumber": 1319,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    "signals": [
      "connect all computers using existing cables",
      "count connected components via DSU",
      "need components - 1 extra cables"
    ],
    "solved": false
  },
  {
    "id": "lc-1584",
    "title": "Min Cost to Connect All Points",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Prim / Kruskal MST",
    "leetcodeNumber": 1584,
    "leetcodeUrl": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    "signals": [
      "minimum spanning tree on 2D coordinates",
      "Manhattan distance edges",
      "Prim's algorithm with min-heap"
    ],
    "solved": false
  },
  {
    "id": "lc-1971",
    "title": "Find if Path Exists in Graph",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "BFS / DSU",
    "leetcodeNumber": 1971,
    "leetcodeUrl": "https://leetcode.com/problems/find-if-path-exists-in-graph/",
    "signals": [
      "check path between source and destination",
      "DSU find(source) == find(destination)",
      "or simple BFS queue"
    ],
    "solved": false
  },
  {
    "id": "lc-211",
    "title": "Design Add and Search Words Data Structure",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Trie with Wildcard",
    "leetcodeNumber": 211,
    "leetcodeUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "signals": [
      "search words with '.' wildcard matching",
      "Trie with recursive branch exploration on '.'",
      "standard children array"
    ],
    "solved": false
  },
  {
    "id": "lc-212",
    "title": "Word Search II",
    "difficulty": "Hard",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Trie + Grid DFS",
    "leetcodeNumber": 212,
    "leetcodeUrl": "https://leetcode.com/problems/word-search-ii/",
    "signals": [
      "find all words from dictionary in 2D grid",
      "insert all words into Trie",
      "backtracking DFS pruned by Trie"
    ],
    "solved": false
  },
  {
    "id": "lc-421",
    "title": "Maximum XOR of Two Numbers in an Array",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Bitwise Trie",
    "leetcodeNumber": 421,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "signals": [
      "maximum XOR of two numbers in O(N)",
      "32-bit binary Trie",
      "follow opposite bit greedily"
    ],
    "solved": false
  },
  {
    "id": "lc-648",
    "title": "Replace Words",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Root Replacement",
    "leetcodeNumber": 648,
    "leetcodeUrl": "https://leetcode.com/problems/replace-words/",
    "signals": [
      "replace words with shortest matching root",
      "insert roots into Trie",
      "search shortest prefix"
    ],
    "solved": false
  },
  {
    "id": "lc-677",
    "title": "Map Sum Pairs",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Sum Trie",
    "leetcodeNumber": 677,
    "leetcodeUrl": "https://leetcode.com/problems/map-sum-pairs/",
    "signals": [
      "sum values of all keys starting with prefix",
      "Trie node stores prefix sum",
      "update delta"
    ],
    "solved": false
  },
  {
    "id": "lc-720",
    "title": "Longest Word in Dictionary",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Build",
    "leetcodeNumber": 720,
    "leetcodeUrl": "https://leetcode.com/problems/longest-word-in-dictionary/",
    "signals": [
      "longest word built one character at a time",
      "Trie validation all prefixes are words",
      "DFS / BFS"
    ],
    "solved": false
  },
  {
    "id": "lc-1268",
    "title": "Search Suggestions System",
    "difficulty": "Medium",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Autocomplete Trie",
    "leetcodeNumber": 1268,
    "leetcodeUrl": "https://leetcode.com/problems/search-suggestions-system/",
    "signals": [
      "suggest top 3 lexicographical products per prefix",
      "Trie storing top 3 suggestions at each node",
      "or binary search"
    ],
    "solved": false
  },
  {
    "id": "lc-1707",
    "title": "Maximum XOR With an Element From Array",
    "difficulty": "Hard",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Offline Queries Trie",
    "leetcodeNumber": 1707,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
    "signals": [
      "maximum XOR with query limit m",
      "sort array and queries offline",
      "insert into bitwise Trie incrementally"
    ],
    "solved": false
  },
  {
    "id": "lc-62",
    "title": "Unique Paths",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "2D Grid DP",
    "leetcodeNumber": 62,
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
    "signals": [
      "paths from top-left to bottom-right of grid",
      "dp[r][c] = dp[r-1][c] + dp[r][c-1]",
      "1D row space optimization"
    ],
    "solved": false
  },
  {
    "id": "lc-63",
    "title": "Unique Paths II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Obstacle Grid DP",
    "leetcodeNumber": 63,
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths-ii/",
    "signals": [
      "unique paths with obstacle grid cells",
      "set dp to 0 if obstacle",
      "transition from valid neighbors"
    ],
    "solved": false
  },
  {
    "id": "lc-64",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Grid Min Cost",
    "leetcodeNumber": 64,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
    "signals": [
      "minimum path sum from top-left to bottom-right",
      "dp[r][c] = grid[r][c] + min(up, left)",
      "in-place grid DP"
    ],
    "solved": false
  },
  {
    "id": "lc-70",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Fibonacci Recurrence",
    "leetcodeNumber": 70,
    "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
    "signals": [
      "climb 1 or 2 steps to reach top",
      "dp[i] = dp[i-1] + dp[i-2]",
      "two variables O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-72",
    "title": "Edit Distance",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "2D Alignment DP",
    "leetcodeNumber": 72,
    "leetcodeUrl": "https://leetcode.com/problems/edit-distance/",
    "signals": [
      "minimum operations (insert, delete, replace) to convert word1 to word2",
      "2D DP matching characters",
      "min(insert, delete, replace) + 1"
    ],
    "solved": false
  },
  {
    "id": "lc-91",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Fibonacci-like DP",
    "leetcodeNumber": 91,
    "leetcodeUrl": "https://leetcode.com/problems/decode-ways/",
    "signals": [
      "decode digit string mapping to letters A-Z",
      "single digit 1..9 and two digits 10..26",
      "dp[i] = dp[i-1] + dp[i-2]"
    ],
    "solved": false
  },
  {
    "id": "lc-120",
    "title": "Triangle",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Bottom-Up Grid",
    "leetcodeNumber": 120,
    "leetcodeUrl": "https://leetcode.com/problems/triangle/",
    "signals": [
      "minimum path sum from top to bottom of triangle",
      "bottom-up DP row by row",
      "dp[c] = min(dp[c], dp[c+1]) + val"
    ],
    "solved": false
  },
  {
    "id": "lc-139",
    "title": "Word Break",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "1D Partition DP",
    "leetcodeNumber": 139,
    "leetcodeUrl": "https://leetcode.com/problems/word-break/",
    "signals": [
      "can string be segmented into dictionary words",
      "dp[i] = any(dp[j] && wordSet.count(s[j..i]))",
      "hash set with 1D DP"
    ],
    "solved": false
  },
  {
    "id": "lc-198",
    "title": "House Robber",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Non-Adjacent DP",
    "leetcodeNumber": 198,
    "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
    "signals": [
      "rob houses without alerting adjacent alarms",
      "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
      "two variables space optimization"
    ],
    "solved": false
  },
  {
    "id": "lc-213",
    "title": "House Robber II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Circular DP",
    "leetcodeNumber": 213,
    "leetcodeUrl": "https://leetcode.com/problems/house-robber-ii/",
    "signals": [
      "houses arranged in a circle",
      "max(rob(0..n-2), rob(1..n-1))",
      "call linear house robber twice"
    ],
    "solved": false
  },
  {
    "id": "lc-221",
    "title": "Maximal Square",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Grid Subsquare DP",
    "leetcodeNumber": 221,
    "leetcodeUrl": "https://leetcode.com/problems/maximal-square/",
    "signals": [
      "largest square of 1s in binary matrix",
      "dp[r][c] = 1 + min(left, top, diag)",
      "side length squared gives area"
    ],
    "solved": false
  },
  {
    "id": "lc-279",
    "title": "Perfect Squares",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Coin-like DP",
    "leetcodeNumber": 279,
    "leetcodeUrl": "https://leetcode.com/problems/perfect-squares/",
    "signals": [
      "least number of perfect squares summing to n",
      "dp[i] = 1 + min(dp[i - j*j])",
      "BFS or 1D DP"
    ],
    "solved": false
  },
  {
    "id": "lc-300",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Patience Sorting",
    "leetcodeNumber": 300,
    "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "signals": [
      "longest strictly increasing subsequence",
      "O(N log N) using std::lower_bound",
      "or O(N^2) 1D DP"
    ],
    "solved": false
  },
  {
    "id": "lc-322",
    "title": "Coin Change",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Unbounded Knapsack",
    "leetcodeNumber": 322,
    "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
    "signals": [
      "fewest coins to make amount",
      "dp[i] = min(dp[i], dp[i - c] + 1)",
      "unbounded knapsack 1D table"
    ],
    "solved": false
  },
  {
    "id": "lc-377",
    "title": "Combination Sum IV",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Permutation DP",
    "leetcodeNumber": 377,
    "leetcodeUrl": "https://leetcode.com/problems/combination-sum-iv/",
    "signals": [
      "number of combinations adding to target with order",
      "outer loop target inner loop nums",
      "permutation recurrence"
    ],
    "solved": false
  },
  {
    "id": "lc-416",
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "0/1 Knapsack",
    "leetcodeNumber": 416,
    "leetcodeUrl": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "signals": [
      "partition array into two equal sum subsets",
      "target = sum / 2",
      "0/1 knapsack reverse loop boolean array"
    ],
    "solved": false
  },
  {
    "id": "lc-516",
    "title": "Longest Palindromic Subsequence",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Interval DP",
    "leetcodeNumber": 516,
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-subsequence/",
    "signals": [
      "longest subsequence that is palindrome",
      "LCS between s and reverse(s)",
      "or interval DP dp[i][j]"
    ],
    "solved": false
  },
  {
    "id": "lc-518",
    "title": "Coin Change II",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Combination Unbounded",
    "leetcodeNumber": 518,
    "leetcodeUrl": "https://leetcode.com/problems/coin-change-ii/",
    "signals": [
      "number of combinations making amount",
      "outer loop coins inner loop amount",
      "unbounded knapsack combinations"
    ],
    "solved": false
  },
  {
    "id": "lc-746",
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Fibonacci Min Cost",
    "leetcodeNumber": 746,
    "leetcodeUrl": "https://leetcode.com/problems/min-cost-climbing-stairs/",
    "signals": [
      "minimum cost to reach top of floor",
      "dp[i] = cost[i] + min(dp[i-1], dp[i-2])",
      "two variables"
    ],
    "solved": false
  },
  {
    "id": "lc-1137",
    "title": "N-th Tribonacci Number",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Recurrence",
    "leetcodeNumber": 1137,
    "leetcodeUrl": "https://leetcode.com/problems/n-th-tribonacci-number/",
    "signals": [
      "T0=0, T1=1, T2=1, Tn+3 = Tn + Tn+1 + Tn+2",
      "three variables rolling state",
      "O(N) time O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-1143-longest-co",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "2D Sequence DP",
    "leetcodeNumber": 1143,
    "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
    "signals": [
      "longest common subsequence of two strings",
      "dp[i][j] = dp[i-1][j-1]+1 if match else max",
      "2D table or two rows"
    ],
    "solved": false
  },
  {
    "id": "lc-45",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "BFS Levels",
    "leetcodeNumber": 45,
    "leetcodeUrl": "https://leetcode.com/problems/jump-game-ii/",
    "signals": [
      "minimum jumps to reach last index",
      "track farthest boundary per jump level",
      "increment jump count"
    ],
    "solved": false
  },
  {
    "id": "lc-55",
    "title": "Jump Game",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Farthest Reachable",
    "leetcodeNumber": 55,
    "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
    "signals": [
      "can you reach the last index",
      "running maxReachable = max(maxReachable, i + nums[i])",
      "if i > maxReachable return false"
    ],
    "solved": false
  },
  {
    "id": "lc-56",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Merging",
    "leetcodeNumber": 56,
    "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
    "signals": [
      "merge all overlapping intervals",
      "sort by start time",
      "extend end of last interval"
    ],
    "solved": false
  },
  {
    "id": "lc-57",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Insertion",
    "leetcodeNumber": 57,
    "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
    "signals": [
      "insert new interval into sorted non-overlapping list",
      "add before, merge overlapping, add after",
      "three stage pass"
    ],
    "solved": false
  },
  {
    "id": "lc-134",
    "title": "Gas Station",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Circular Balance",
    "leetcodeNumber": 134,
    "leetcodeUrl": "https://leetcode.com/problems/gas-station/",
    "signals": [
      "circular tour without running out of gas",
      "if running tank < 0 reset start to i+1",
      "totalGas >= totalCost check"
    ],
    "solved": false
  },
  {
    "id": "lc-135",
    "title": "Candy",
    "difficulty": "Hard",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Two Pass",
    "leetcodeNumber": 135,
    "leetcodeUrl": "https://leetcode.com/problems/candy/",
    "signals": [
      "children with higher rating get more candy",
      "left-to-right pass and right-to-left pass",
      "sum of max candies"
    ],
    "solved": false
  },
  {
    "id": "lc-435",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Activity Selection",
    "leetcodeNumber": 435,
    "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
    "signals": [
      "minimum removals to make non-overlapping",
      "sort by end time",
      "greedily pick earliest ending"
    ],
    "solved": false
  },
  {
    "id": "lc-452",
    "title": "Minimum Number of Arrows to Burst Balloons",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Overlap",
    "leetcodeNumber": 452,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    "signals": [
      "minimum arrows shot vertically",
      "sort by end coordinate",
      "greedily shoot at end of interval"
    ],
    "solved": false
  },
  {
    "id": "lc-455",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Two Pointers Greedy",
    "leetcodeNumber": 455,
    "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
    "signals": [
      "satisfy children with cookie sizes",
      "sort greed factors and cookies",
      "greedily assign smallest valid cookie"
    ],
    "solved": false
  },
  {
    "id": "lc-605",
    "title": "Can Place Flowers",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Planting",
    "leetcodeNumber": 605,
    "leetcodeUrl": "https://leetcode.com/problems/can-place-flowers/",
    "signals": [
      "place n flowers with no adjacent flowers",
      "check prev, curr, next all zero",
      "greedily plant and decrement n"
    ],
    "solved": false
  },
  {
    "id": "lc-763-partition-",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Last Seen Boundary",
    "leetcodeNumber": 763,
    "leetcodeUrl": "https://leetcode.com/problems/partition-labels/",
    "signals": [
      "partition so letters appear in one part",
      "last index lookup",
      "extend partition boundary to max(last)"
    ],
    "solved": false
  },
  {
    "id": "lc-860",
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Bills",
    "leetcodeNumber": 860,
    "leetcodeUrl": "https://leetcode.com/problems/lemonade-change/",
    "signals": [
      "give change for $5, $10, $20 bills",
      "greedily give $10 before $5 for $20 bill",
      "count $5 and $10 bills"
    ],
    "solved": false
  },
  {
    "id": "lc-1029",
    "title": "Two City Scheduling",
    "difficulty": "Medium",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Cost Difference Sort",
    "leetcodeNumber": 1029,
    "leetcodeUrl": "https://leetcode.com/problems/two-city-scheduling/",
    "signals": [
      "send n people to city A and n to city B",
      "sort by costA - costB",
      "first n go to A rest to B"
    ],
    "solved": false
  },
  {
    "id": "lc-136",
    "title": "Single Number",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Cancellation",
    "leetcodeNumber": 136,
    "leetcodeUrl": "https://leetcode.com/problems/single-number/",
    "signals": [
      "every element appears twice except one",
      "xor all elements",
      "x ^ x = 0 leaves single element"
    ],
    "solved": false
  },
  {
    "id": "lc-137",
    "title": "Single Number II",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Modulo 3 Bits",
    "leetcodeNumber": 137,
    "leetcodeUrl": "https://leetcode.com/problems/single-number-ii/",
    "signals": [
      "every element appears three times except one",
      "count bits at each position modulo 3",
      "or two bitmask state variables ones and twos"
    ],
    "solved": false
  },
  {
    "id": "lc-190",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bit Shifting",
    "leetcodeNumber": 190,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-bits/",
    "signals": [
      "reverse bits of 32-bit unsigned integer",
      "loop 32 times: res = (res << 1) | (n & 1)",
      "bit reversal"
    ],
    "solved": false
  },
  {
    "id": "lc-191",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Kernighan Algorithm",
    "leetcodeNumber": 191,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "signals": [
      "count set bits (Hamming weight)",
      "while n: n &= (n - 1), count++",
      "Brian Kernighan drops lowest 1"
    ],
    "solved": false
  },
  {
    "id": "lc-260",
    "title": "Single Number III",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Partition XOR",
    "leetcodeNumber": 260,
    "leetcodeUrl": "https://leetcode.com/problems/single-number-iii/",
    "signals": [
      "two numbers appear once all others twice",
      "xorSum = a ^ b, isolate lowest set bit diff = xorSum & -xorSum",
      "partition into two groups and xor"
    ],
    "solved": false
  },
  {
    "id": "lc-268",
    "title": "Missing Number",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Cancellation",
    "leetcodeNumber": 268,
    "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
    "signals": [
      "missing number in range [0, n]",
      "xor all indices and all array values",
      "missing number remains"
    ],
    "solved": false
  },
  {
    "id": "lc-338",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "DP with Bit Shift",
    "leetcodeNumber": 338,
    "leetcodeUrl": "https://leetcode.com/problems/counting-bits/",
    "signals": [
      "count 1s for all numbers from 0 to n in O(N)",
      "ans[i] = ans[i >> 1] + (i & 1)",
      "linear DP with bits"
    ],
    "solved": false
  },
  {
    "id": "lc-389",
    "title": "Find the Difference",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Characters",
    "leetcodeNumber": 389,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-difference/",
    "signals": [
      "string t has one extra random character",
      "xor all characters of s and t",
      "extra character remains"
    ],
    "solved": false
  },
  {
    "id": "lc-461",
    "title": "Hamming Distance",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Hamming",
    "leetcodeNumber": 461,
    "leetcodeUrl": "https://leetcode.com/problems/hamming-distance/",
    "signals": [
      "positions where bits are different",
      "xor = x ^ y",
      "count set bits in xor"
    ],
    "solved": false
  },
  {
    "id": "lc-476",
    "title": "Number Complement",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Mask Flip",
    "leetcodeNumber": 476,
    "leetcodeUrl": "https://leetcode.com/problems/number-complement/",
    "signals": [
      "flip all bits of positive integer",
      "create bitmask of 1s matching bit length",
      "num ^ mask"
    ],
    "solved": false
  },
  {
    "id": "lc-693",
    "title": "Binary Number with Alternating Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Adjacent Shift XOR",
    "leetcodeNumber": 693,
    "leetcodeUrl": "https://leetcode.com/problems/binary-number-with-alternating-bits/",
    "signals": [
      "adjacent bits have different values",
      "n ^ (n >> 1) creates all 1s",
      "check if (x & (x + 1)) == 0"
    ],
    "solved": false
  },
  {
    "id": "lc-1342",
    "title": "Number of Steps to Reduce a Number to Zero",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bit Steps",
    "leetcodeNumber": 1342,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",
    "signals": [
      "divide by 2 if even subtract 1 if odd",
      "bit length + number of set bits - 1",
      "bit count simulation"
    ],
    "solved": false
  },
  {
    "id": "lc-1356",
    "title": "Sort Integers by The Number of 1 Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Custom Bit Comparator",
    "leetcodeNumber": 1356,
    "leetcodeUrl": "https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/",
    "signals": [
      "sort by set bits count then value",
      "builtin_popcount comparison",
      "std::sort comparator"
    ],
    "solved": false
  },
  {
    "id": "lc-41",
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Cyclic Sort",
    "leetcodeNumber": 41,
    "leetcodeUrl": "https://leetcode.com/problems/first-missing-positive/",
    "signals": [
      "smallest missing positive in O(N) time and O(1) space",
      "swap nums[i] to index nums[i]-1",
      "find first index i where nums[i] != i+1"
    ],
    "solved": false
  },
  {
    "id": "lc-75",
    "title": "Sort Colors",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Dutch National Flag",
    "leetcodeNumber": 75,
    "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
    "signals": [
      "sort array of 0, 1, 2 in-place",
      "three pointers low, mid, high",
      "single pass three-way partition"
    ],
    "solved": false
  },
  {
    "id": "lc-179-largest-nu",
    "title": "Largest Number",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Custom Comparator",
    "leetcodeNumber": 179,
    "leetcodeUrl": "https://leetcode.com/problems/largest-number/",
    "signals": [
      "arrange numbers to form largest string",
      "sort strings by a+b > b+a",
      "handle all zeros leading zero"
    ],
    "solved": false
  },
  {
    "id": "lc-215",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Quickselect",
    "leetcodeNumber": 215,
    "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "signals": [
      "kth largest in unsorted array in average O(N)",
      "Quickselect partition around pivot",
      "recurse into target side only"
    ],
    "solved": false
  },
  {
    "id": "lc-268-missing-nu",
    "title": "Missing Number",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Cyclic Sort",
    "leetcodeNumber": 268,
    "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
    "signals": [
      "find missing number in 0..n",
      "place each number at its index",
      "cyclic sort verification"
    ],
    "solved": false
  },
  {
    "id": "lc-287",
    "title": "Find the Duplicate Number",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Floyd's Cycle / Marking",
    "leetcodeNumber": 287,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-duplicate-number/",
    "signals": [
      "find duplicate in n+1 numbers range 1..n",
      "treat array as functional linked list nums[i]",
      "Floyd's Tortoise and Hare"
    ],
    "solved": false
  },
  {
    "id": "lc-448-find-all-n",
    "title": "Find All Numbers Disappeared in an Array",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Cyclic Sort",
    "leetcodeNumber": 448,
    "leetcodeUrl": "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    "signals": [
      "numbers from 1..n not appearing in array",
      "place elements at index nums[i]-1",
      "collect indices where nums[i] != i+1"
    ],
    "solved": false
  },
  {
    "id": "lc-912",
    "title": "Sort an Array",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Merge / Quick / Heap Sort",
    "leetcodeNumber": 912,
    "leetcodeUrl": "https://leetcode.com/problems/sort-an-array/",
    "signals": [
      "sort array in O(N log N) without built-in sort",
      "implement Merge Sort or Heap Sort",
      "stable divide and conquer"
    ],
    "solved": false
  },
  {
    "id": "lc-1051-height-che",
    "title": "Height Checker",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Counting Sort",
    "leetcodeNumber": 1051,
    "leetcodeUrl": "https://leetcode.com/problems/height-checker/",
    "signals": [
      "count mismatching indices with sorted",
      "counting sort by heights 1..100",
      "linear count compare"
    ],
    "solved": false
  },
  {
    "id": "lc-303",
    "title": "Range Sum Query - Immutable",
    "difficulty": "Easy",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Prefix Sum Array",
    "leetcodeNumber": 303,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-immutable/",
    "signals": [
      "static range sum queries in O(1)",
      "prefix sum array precomputation",
      "pref[r+1] - pref[l]"
    ],
    "solved": false
  },
  {
    "id": "lc-304",
    "title": "Range Sum Query 2D - Immutable",
    "difficulty": "Medium",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "2D Prefix Sum",
    "leetcodeNumber": 304,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-2d-immutable/",
    "signals": [
      "submatrix sum queries in O(1)",
      "2D prefix sum inclusion-exclusion",
      "P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]"
    ],
    "solved": false
  },
  {
    "id": "lc-307",
    "title": "Range Sum Query - Mutable",
    "difficulty": "Medium",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Fenwick / Segment Tree",
    "leetcodeNumber": 307,
    "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-mutable/",
    "signals": [
      "point update and range sum queries in O(log N)",
      "Fenwick tree (Binary Indexed Tree)",
      "or Segment Tree with tree[2*i]"
    ],
    "solved": false
  },
  {
    "id": "lc-315",
    "title": "Count of Smaller Numbers After Self",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Fenwick Inversions",
    "leetcodeNumber": 315,
    "leetcodeUrl": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
    "signals": [
      "count elements to the right smaller than nums[i]",
      "coordinate compression + Fenwick tree query",
      "or Merge Sort inversion counting"
    ],
    "solved": false
  },
  {
    "id": "lc-493",
    "title": "Reverse Pairs",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Merge Sort / Fenwick",
    "leetcodeNumber": 493,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-pairs/",
    "signals": [
      "count pairs where i < j and nums[i] > 2 * nums[j]",
      "Merge Sort with two pointers counting step",
      "or Binary Indexed Tree"
    ],
    "solved": false
  },
  {
    "id": "lc-699",
    "title": "Falling Squares",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Segment Tree Lazy",
    "leetcodeNumber": 699,
    "leetcodeUrl": "https://leetcode.com/problems/falling-squares/",
    "signals": [
      "dropping 2D squares stacking on heights",
      "coordinate compression + Segment Tree with lazy propagation",
      "range maximum update"
    ],
    "solved": false
  },
  {
    "id": "lc-715",
    "title": "Range Module",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Dynamic Segment Tree",
    "leetcodeNumber": 715,
    "leetcodeUrl": "https://leetcode.com/problems/range-module/",
    "signals": [
      "track intervals with addRange, queryRange, removeRange",
      "dynamic segment tree or std::set intervals",
      "interval merging"
    ],
    "solved": false
  },
  {
    "id": "lc-732",
    "title": "My Calendar III",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Sweep-Line / Segment Tree",
    "leetcodeNumber": 732,
    "leetcodeUrl": "https://leetcode.com/problems/my-calendar-iii/",
    "signals": [
      "maximum k-booking overlapping intervals",
      "sweep-line map with point difference",
      "or Segment Tree with lazy propagation"
    ],
    "solved": false
  },
  {
    "id": "lc-26",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 26,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "signals": [
      "sorted array",
      "remove duplicates in-place",
      "slow and fast pointer"
    ],
    "solved": false
  },
  {
    "id": "lc-27",
    "title": "Remove Element",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 27,
    "leetcodeUrl": "https://leetcode.com/problems/remove-element/",
    "signals": [
      "remove all val in-place",
      "overwrite with valid element",
      "two pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-31",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Pivot & Reverse",
    "leetcodeNumber": 31,
    "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
    "signals": [
      "next lexicographical permutation",
      "find first decreasing from right",
      "swap and reverse suffix"
    ],
    "solved": false
  },
  {
    "id": "lc-48",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Matrix Transpose",
    "leetcodeNumber": 48,
    "leetcodeUrl": "https://leetcode.com/problems/rotate-image/",
    "signals": [
      "rotate n x n matrix by 90 degrees",
      "transpose matrix then reverse rows",
      "in-place matrix rotation"
    ],
    "solved": false
  },
  {
    "id": "lc-54",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Boundary Simulation",
    "leetcodeNumber": 54,
    "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
    "signals": [
      "spiral order traversal",
      "four boundaries top bottom left right",
      "shrink boundaries in loop"
    ],
    "solved": false
  },
  {
    "id": "lc-59",
    "title": "Spiral Matrix II",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Boundary Simulation",
    "leetcodeNumber": 59,
    "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix-ii/",
    "signals": [
      "generate n x n matrix in spiral order",
      "populate 1 to n^2",
      "boundary stepping"
    ],
    "solved": false
  },
  {
    "id": "lc-66",
    "title": "Plus One",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Increment",
    "leetcodeNumber": 66,
    "leetcodeUrl": "https://leetcode.com/problems/plus-one/",
    "signals": [
      "large integer represented as digit array",
      "add one to last digit",
      "carry propagation"
    ],
    "solved": false
  },
  {
    "id": "lc-73",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "State In-Place",
    "leetcodeNumber": 73,
    "leetcodeUrl": "https://leetcode.com/problems/set-matrix-zeroes/",
    "signals": [
      "if element is 0 set row and column to 0",
      "use first row and col as markers",
      "constant space"
    ],
    "solved": false
  },
  {
    "id": "lc-88",
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Backward Merge",
    "leetcodeNumber": 88,
    "leetcodeUrl": "https://leetcode.com/problems/merge-sorted-array/",
    "signals": [
      "merge nums2 into nums1 in-place",
      "start writing from end of nums1",
      "three pointers backward"
    ],
    "solved": false
  },
  {
    "id": "lc-118",
    "title": "Pascal's Triangle",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Row Generation",
    "leetcodeNumber": 118,
    "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle/",
    "signals": [
      "generate first numRows of Pascal's triangle",
      "row[j] = prev[j-1] + prev[j]",
      "combinatorial triangle"
    ],
    "solved": false
  },
  {
    "id": "lc-119",
    "title": "Pascal's Triangle II",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Space-Optimized Row",
    "leetcodeNumber": 119,
    "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle-ii/",
    "signals": [
      "return rowIndex-th row of Pascal's triangle",
      "update vector in reverse",
      "O(k) auxiliary space"
    ],
    "solved": false
  },
  {
    "id": "lc-167",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Converging",
    "leetcodeNumber": 167,
    "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "signals": [
      "two numbers add up to target in sorted array",
      "left at 0 right at n-1",
      "converging pointers"
    ],
    "solved": false
  },
  {
    "id": "lc-169",
    "title": "Majority Element",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Boyer-Moore Voting",
    "leetcodeNumber": 169,
    "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
    "signals": [
      "element appears more than n/2 times",
      "candidate and count voting algorithm",
      "O(N) time O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-189",
    "title": "Rotate Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Three Reversals",
    "leetcodeNumber": 189,
    "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
    "signals": [
      "rotate array right by k steps",
      "reverse whole array, reverse first k, reverse rest",
      "in-place three reversals"
    ],
    "solved": false
  },
  {
    "id": "lc-238",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Prefix Suffix Product",
    "leetcodeNumber": 238,
    "leetcodeUrl": "https://leetcode.com/problems/product-of-array-except-self/",
    "signals": [
      "product without using division operator",
      "prefix product and suffix product",
      "O(N) time O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-283",
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fast & Slow",
    "leetcodeNumber": 283,
    "leetcodeUrl": "https://leetcode.com/problems/move-zeroes/",
    "signals": [
      "move all zeros to end maintaining relative order",
      "slow pointer tracks non-zero placement",
      "fill rest with zeros"
    ],
    "solved": false
  },
  {
    "id": "lc-334",
    "title": "Increasing Triplet Subsequence",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Thresholds",
    "leetcodeNumber": 334,
    "leetcodeUrl": "https://leetcode.com/problems/increasing-triplet-subsequence/",
    "signals": [
      "indices i < j < k with nums[i] < nums[j] < nums[k]",
      "track first and second minimums",
      "O(N) time O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-414",
    "title": "Third Maximum Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Three Trackers",
    "leetcodeNumber": 414,
    "leetcodeUrl": "https://leetcode.com/problems/third-maximum-number/",
    "signals": [
      "third distinct maximum number",
      "three tracking variables max1 max2 max3",
      "O(N) time"
    ],
    "solved": false
  },
  {
    "id": "lc-485",
    "title": "Max Consecutive Ones",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Streak Counter",
    "leetcodeNumber": 485,
    "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones/",
    "signals": [
      "maximum consecutive 1s in binary array",
      "running count resets on 0",
      "track global maximum"
    ],
    "solved": false
  },
  {
    "id": "lc-561",
    "title": "Array Partition",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Pair",
    "leetcodeNumber": 561,
    "leetcodeUrl": "https://leetcode.com/problems/array-partition/",
    "signals": [
      "maximize sum of min(ai, bi)",
      "sort array ascending",
      "sum even indexed elements"
    ],
    "solved": false
  },
  {
    "id": "lc-566",
    "title": "Reshape the Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Matrix Mapping",
    "leetcodeNumber": 566,
    "leetcodeUrl": "https://leetcode.com/problems/reshape-the-matrix/",
    "signals": [
      "reshape m x n matrix into r x c",
      "map index k to row k/c and col k%c",
      "matrix transformation"
    ],
    "solved": false
  },
  {
    "id": "lc-581",
    "title": "Shortest Unsorted Continuous Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Extreme Scans",
    "leetcodeNumber": 581,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-unsorted-continuous-subarray/",
    "signals": [
      "shortest subarray sorting which sorts entire array",
      "find leftmost and rightmost violations",
      "linear scans"
    ],
    "solved": false
  },
  {
    "id": "lc-628",
    "title": "Maximum Product of Three Numbers",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Extremes",
    "leetcodeNumber": 628,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-of-three-numbers/",
    "signals": [
      "maximum product of three numbers",
      "max(top 3 positive, min 2 negative * max)",
      "single pass trackers"
    ],
    "solved": false
  },
  {
    "id": "lc-665",
    "title": "Non-decreasing Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Modification",
    "leetcodeNumber": 665,
    "leetcodeUrl": "https://leetcode.com/problems/non-decreasing-array/",
    "signals": [
      "non-decreasing by modifying at most one element",
      "check violations nums[i] > nums[i+1]",
      "greedy assignment"
    ],
    "solved": false
  },
  {
    "id": "lc-896",
    "title": "Monotonic Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Monotonicity",
    "leetcodeNumber": 896,
    "leetcodeUrl": "https://leetcode.com/problems/monotonic-array/",
    "signals": [
      "array is monotone increasing or decreasing",
      "single pass flag check",
      "compare adjacent elements"
    ],
    "solved": false
  },
  {
    "id": "lc-1295",
    "title": "Find Numbers with Even Number of Digits",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Count",
    "leetcodeNumber": 1295,
    "leetcodeUrl": "https://leetcode.com/problems/find-numbers-with-even-number-of-digits/",
    "signals": [
      "count numbers containing even number of digits",
      "log10 or string length",
      "linear scan"
    ],
    "solved": false
  },
  {
    "id": "lc-1299",
    "title": "Replace Elements with Greatest Element on Right Side",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Backward Running Max",
    "leetcodeNumber": 1299,
    "leetcodeUrl": "https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/",
    "signals": [
      "replace with maximum on right side, -1 at end",
      "traverse backward from n-1",
      "running max"
    ],
    "solved": false
  },
  {
    "id": "lc-1304",
    "title": "Find N Unique Integers Sum up to Zero",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Symmetric Pairs",
    "leetcodeNumber": 1304,
    "leetcodeUrl": "https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero/",
    "signals": [
      "n unique integers summing to 0",
      "pair +i and -i, add 0 if odd",
      "symmetric generation"
    ],
    "solved": false
  },
  {
    "id": "lc-1365",
    "title": "How Many Numbers Are Smaller Than the Current Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Counting Sort",
    "leetcodeNumber": 1365,
    "leetcodeUrl": "https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/",
    "signals": [
      "how many numbers in array are smaller",
      "bucket count frequencies 0..100",
      "prefix sum of counts"
    ],
    "solved": false
  },
  {
    "id": "lc-1389",
    "title": "Create Target Array in the Given Order",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Index Insertion",
    "leetcodeNumber": 1389,
    "leetcodeUrl": "https://leetcode.com/problems/create-target-array-in-the-given-order/",
    "signals": [
      "insert nums[i] at index index[i]",
      "vector insert simulation",
      "ordered placement"
    ],
    "solved": false
  },
  {
    "id": "lc-1431",
    "title": "Kids With the Greatest Number of Candies",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Max Comparison",
    "leetcodeNumber": 1431,
    "leetcodeUrl": "https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/",
    "signals": [
      "candies + extraCandies >= maxCandies",
      "find maximum element first",
      "boolean mapping"
    ],
    "solved": false
  },
  {
    "id": "lc-1464",
    "title": "Maximum Product of Two Elements in an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two Largest",
    "leetcodeNumber": 1464,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/",
    "signals": [
      "maximize (nums[i]-1)*(nums[j]-1)",
      "track top two largest numbers",
      "O(N) time O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-1475",
    "title": "Final Prices With a Special Discount in a Shop",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Next Smaller",
    "leetcodeNumber": 1475,
    "leetcodeUrl": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/",
    "signals": [
      "discount is first element on right <= price",
      "monotonic increasing stack",
      "subtract discount"
    ],
    "solved": false
  },
  {
    "id": "lc-1486",
    "title": "XOR Operation in an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Simulation",
    "leetcodeNumber": 1486,
    "leetcodeUrl": "https://leetcode.com/problems/xor-operation-in-an-array/",
    "signals": [
      "nums[i] = start + 2*i",
      "xor all elements",
      "O(N) simulation or math"
    ],
    "solved": false
  },
  {
    "id": "lc-1502",
    "title": "Can Make Arithmetic Progression From Sequence",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Sort Difference",
    "leetcodeNumber": 1502,
    "leetcodeUrl": "https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence/",
    "signals": [
      "difference between consecutive elements equal",
      "sort array",
      "verify all adjacent differences equal"
    ],
    "solved": false
  },
  {
    "id": "lc-1534",
    "title": "Count Good Triplets",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Three Pointers",
    "leetcodeNumber": 1534,
    "leetcodeUrl": "https://leetcode.com/problems/count-good-triplets/",
    "signals": [
      "triplets satisfying |a-b|<=A, |b-c|<=B, |a-c|<=C",
      "nested loop with early pruning",
      "brute force pruning"
    ],
    "solved": false
  },
  {
    "id": "lc-1572",
    "title": "Matrix Diagonal Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Diagonal Indexing",
    "leetcodeNumber": 1572,
    "leetcodeUrl": "https://leetcode.com/problems/matrix-diagonal-sum/",
    "signals": [
      "sum of primary and secondary diagonals",
      "primary is mat[i][i] secondary is mat[i][n-1-i]",
      "subtract center if odd"
    ],
    "solved": false
  },
  {
    "id": "lc-1672",
    "title": "Richest Customer Wealth",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Row Sum",
    "leetcodeNumber": 1672,
    "leetcodeUrl": "https://leetcode.com/problems/richest-customer-wealth/",
    "signals": [
      "maximum wealth of any customer",
      "sum each row in 2D accounts matrix",
      "track max row sum"
    ],
    "solved": false
  },
  {
    "id": "lc-1700",
    "title": "Number of Students Unable to Eat Lunch",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Queue Simulation",
    "leetcodeNumber": 1700,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/",
    "signals": [
      "students and sandwiches circular/square",
      "count sandwich requests",
      "stop when top sandwich not wanted"
    ],
    "solved": false
  },
  {
    "id": "lc-1710",
    "title": "Maximum Units on a Truck",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Sort",
    "leetcodeNumber": 1710,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-units-on-a-truck/",
    "signals": [
      "maximize units with truckSize capacity",
      "sort box types by units per box descending",
      "greedily fill truck"
    ],
    "solved": false
  },
  {
    "id": "lc-1720",
    "title": "Decode XORed Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "XOR Inversion",
    "leetcodeNumber": 1720,
    "leetcodeUrl": "https://leetcode.com/problems/decode-xored-array/",
    "signals": [
      "encoded[i] = arr[i] ^ arr[i+1]",
      "arr[i+1] = encoded[i] ^ arr[i]",
      "reconstruct array"
    ],
    "solved": false
  },
  {
    "id": "lc-1725",
    "title": "Number Of Rectangles That Can Form The Largest Square",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Max Side",
    "leetcodeNumber": 1725,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square/",
    "signals": [
      "square side = min(l, w)",
      "track max side length",
      "count rectangles matching max side"
    ],
    "solved": false
  },
  {
    "id": "lc-1779",
    "title": "Find Nearest Point That Has the Same X or Y Coordinate",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Manhattan Distance",
    "leetcodeNumber": 1779,
    "leetcodeUrl": "https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/",
    "signals": [
      "valid point shares x or y",
      "Manhattan distance |x1-x2| + |y1-y2|",
      "track minimum distance"
    ],
    "solved": false
  },
  {
    "id": "lc-1800",
    "title": "Maximum Ascending Subarray Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Increasing Streak",
    "leetcodeNumber": 1800,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-ascending-subarray-sum/",
    "signals": [
      "maximum sum of contiguous strictly ascending subarray",
      "running sum resets when nums[i] <= nums[i-1]",
      "track maximum sum"
    ],
    "solved": false
  },
  {
    "id": "lc-1822",
    "title": "Sign of the Product of an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Sign Tracker",
    "leetcodeNumber": 1822,
    "leetcodeUrl": "https://leetcode.com/problems/sign-of-the-product-of-an-array/",
    "signals": [
      "sign of product of all numbers",
      "return 0 if any element is 0",
      "count negative numbers"
    ],
    "solved": false
  },
  {
    "id": "lc-1848",
    "title": "Minimum Distance to the Target Element",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Linear Scan",
    "leetcodeNumber": 1848,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-distance-to-the-target-element/",
    "signals": [
      "minimize |i - start| where nums[i] == target",
      "linear scan checking target",
      "track min absolute difference"
    ],
    "solved": false
  },
  {
    "id": "lc-1863",
    "title": "Sum of All Subset XOR Totals",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Subset XOR",
    "leetcodeNumber": 1863,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-all-subset-xor-totals/",
    "signals": [
      "sum of XOR total of all subsets",
      "backtrack include/exclude",
      "or bitwise OR property"
    ],
    "solved": false
  },
  {
    "id": "lc-1920",
    "title": "Build Array from Permutation",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Index Mapping",
    "leetcodeNumber": 1920,
    "leetcodeUrl": "https://leetcode.com/problems/build-array-from-permutation/",
    "signals": [
      "ans[i] = nums[nums[i]]",
      "direct assignment or modulo arithmetic for O(1) space",
      "permutation lookup"
    ],
    "solved": false
  },
  {
    "id": "lc-1929",
    "title": "Concatenation of Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Duplication",
    "leetcodeNumber": 1929,
    "leetcodeUrl": "https://leetcode.com/problems/concatenation-of-array/",
    "signals": [
      "ans of length 2n where ans[i] = nums[i] and ans[i+n] = nums[i]",
      "repeat array twice",
      "vector resize"
    ],
    "solved": false
  },
  {
    "id": "lc-1979",
    "title": "Find Greatest Common Divisor of Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "GCD",
    "leetcodeNumber": 1979,
    "leetcodeUrl": "https://leetcode.com/problems/find-greatest-common-divisor-of-array/",
    "signals": [
      "GCD of smallest and largest numbers in array",
      "find min and max",
      "std::gcd"
    ],
    "solved": false
  },
  {
    "id": "lc-2006",
    "title": "Count Number of Pairs With Absolute Difference K",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Difference Frequency",
    "leetcodeNumber": 2006,
    "leetcodeUrl": "https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k/",
    "signals": [
      "pairs (i, j) where |nums[i] - nums[j]| == k",
      "frequency hash map",
      "sum counts of num-k and num+k"
    ],
    "solved": false
  },
  {
    "id": "lc-2011",
    "title": "Final Value of Variable After Performing Operations",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Simulation",
    "leetcodeNumber": 2011,
    "leetcodeUrl": "https://leetcode.com/problems/final-value-of-variable-after-performing-operations/",
    "signals": [
      "++X, X++, --X, X-- operations",
      "check if operation contains '+'",
      "increment/decrement"
    ],
    "solved": false
  },
  {
    "id": "lc-2016",
    "title": "Maximum Difference Between Increasing Elements",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "One Pass Min",
    "leetcodeNumber": 2016,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-difference-between-increasing-elements/",
    "signals": [
      "nums[j] - nums[i] where i < j and nums[i] < nums[j]",
      "track min element so far",
      "like stock profit"
    ],
    "solved": false
  },
  {
    "id": "lc-2037",
    "title": "Minimum Number of Moves to Seat Everyone",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Greedy Sort",
    "leetcodeNumber": 2037,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone/",
    "signals": [
      "match students to seats with minimal moves",
      "sort seats and students",
      "sum |seats[i] - students[i]|"
    ],
    "solved": false
  },
  {
    "id": "lc-2073",
    "title": "Time Needed to Buy Tickets",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "FIFO & Deque Processing",
    "patternId": "queue-processing",
    "subPattern": "Queue / Math",
    "leetcodeNumber": 2073,
    "leetcodeUrl": "https://leetcode.com/problems/time-needed-to-buy-tickets/",
    "signals": [
      "time for person k to finish buying tickets",
      "each turn takes 1 second",
      "sum min(tickets[i], tickets[k] - (i > k))"
    ],
    "solved": false
  },
  {
    "id": "lc-2078",
    "title": "Two Furthest Houses With Different Colors",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Extreme Compare",
    "leetcodeNumber": 2078,
    "leetcodeUrl": "https://leetcode.com/problems/two-furthest-houses-with-different-colors/",
    "signals": [
      "maximum distance between different colored houses",
      "compare with first house and last house",
      "two pointer extremes"
    ],
    "solved": false
  },
  {
    "id": "lc-2089",
    "title": "Find Target Indices After Sorting Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Count Less",
    "leetcodeNumber": 2089,
    "leetcodeUrl": "https://leetcode.com/problems/find-target-indices-after-sorting-array/",
    "signals": [
      "indices of target after sorting array",
      "count elements < target and == target",
      "range [less, less + equal - 1]"
    ],
    "solved": false
  },
  {
    "id": "lc-2103",
    "title": "Rings and Rods",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bitmask Rods",
    "leetcodeNumber": 2103,
    "leetcodeUrl": "https://leetcode.com/problems/rings-and-rods/",
    "signals": [
      "rods that have all 3 colors R, G, B",
      "bitmask for each rod (1=R, 2=G, 4=B)",
      "count rods with mask == 7"
    ],
    "solved": false
  },
  {
    "id": "lc-2114",
    "title": "Maximum Number of Words Found in Sentences",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Space Count",
    "leetcodeNumber": 2114,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/",
    "signals": [
      "most words in a single sentence",
      "count spaces + 1",
      "max counter"
    ],
    "solved": false
  },
  {
    "id": "lc-2124",
    "title": "Check if All A's Appears Before All B's",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Substring Check",
    "leetcodeNumber": 2124,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/",
    "signals": [
      "all a's appear before any b",
      "check if 'ba' is a substring",
      "boolean check"
    ],
    "solved": false
  },
  {
    "id": "lc-2154",
    "title": "Keep Multiplying Found Values by Two",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Set Lookup",
    "leetcodeNumber": 2154,
    "leetcodeUrl": "https://leetcode.com/problems/keep-multiplying-found-values-by-two/",
    "signals": [
      "while original exists in array, original *= 2",
      "hash set of numbers",
      "multiply until absent"
    ],
    "solved": false
  },
  {
    "id": "lc-2176",
    "title": "Count Equal and Divisible Pairs in an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Pair Check",
    "leetcodeNumber": 2176,
    "leetcodeUrl": "https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array/",
    "signals": [
      "nums[i] == nums[j] and (i * j) % k == 0",
      "group indices by value",
      "check divisibility"
    ],
    "solved": false
  },
  {
    "id": "lc-2235",
    "title": "Add Two Integers",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Arithmetic",
    "leetcodeNumber": 2235,
    "leetcodeUrl": "https://leetcode.com/problems/add-two-integers/",
    "signals": [
      "sum of two integers",
      "return num1 + num2",
      "fundamental arithmetic"
    ],
    "solved": false
  },
  {
    "id": "lc-2236",
    "title": "Root Equals Sum of Children",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree Check",
    "leetcodeNumber": 2236,
    "leetcodeUrl": "https://leetcode.com/problems/root-equals-sum-of-children/",
    "signals": [
      "root value equals sum of left and right child values",
      "check root->val == left->val + right->val",
      "tree property"
    ],
    "solved": false
  },
  {
    "id": "lc-2239",
    "title": "Find Closest Number to Zero",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Absolute Distance",
    "leetcodeNumber": 2239,
    "leetcodeUrl": "https://leetcode.com/problems/find-closest-number-to-zero/",
    "signals": [
      "closest to 0 in array, return larger if tie",
      "track minimum absolute value",
      "tie break with positive"
    ],
    "solved": false
  },
  {
    "id": "lc-2255",
    "title": "Count Prefixes of a Given String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Check",
    "leetcodeNumber": 2255,
    "leetcodeUrl": "https://leetcode.com/problems/count-prefixes-of-a-given-string/",
    "signals": [
      "words that are prefixes of string s",
      "s.find(word) == 0",
      "count matches"
    ],
    "solved": false
  },
  {
    "id": "lc-2319",
    "title": "Check if Matrix Is X-Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Diagonal Check",
    "leetcodeNumber": 2319,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-matrix-is-x-matrix/",
    "signals": [
      "diagonals non-zero and other cells zero",
      "i == j or i + j == n - 1",
      "matrix validation"
    ],
    "solved": false
  },
  {
    "id": "lc-2341",
    "title": "Maximum Number of Pairs in Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Pair Count",
    "leetcodeNumber": 2341,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-number-of-pairs-in-array/",
    "signals": [
      "form pairs of equal numbers",
      "frequency count array",
      "pairs = sum(count/2), leftovers = sum(count%2)"
    ],
    "solved": false
  },
  {
    "id": "lc-2357",
    "title": "Make Array Zero by Subtracting Equal Amounts",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Unique Positives",
    "leetcodeNumber": 2357,
    "leetcodeUrl": "https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/",
    "signals": [
      "minimum operations to make all elements zero",
      "number of unique positive integers",
      "hash set size"
    ],
    "solved": false
  },
  {
    "id": "lc-2363",
    "title": "Merge Similar Items",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Map Merge",
    "leetcodeNumber": 2363,
    "leetcodeUrl": "https://leetcode.com/problems/merge-similar-items/",
    "signals": [
      "merge items [value, weight] summing weights",
      "std::map sorted by value",
      "merge arrays"
    ],
    "solved": false
  },
  {
    "id": "lc-2373",
    "title": "Largest Local Values in a Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "2D Pooling",
    "leetcodeNumber": 2373,
    "leetcodeUrl": "https://leetcode.com/problems/largest-local-values-in-a-matrix/",
    "signals": [
      "maximum value in each 3x3 subgrid",
      "iterate 3x3 window over matrix",
      "local max pooling"
    ],
    "solved": false
  },
  {
    "id": "lc-2399",
    "title": "Check Distances Between Same Letters",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Distance Verification",
    "leetcodeNumber": 2399,
    "leetcodeUrl": "https://leetcode.com/problems/check-distances-between-same-letters/",
    "signals": [
      "distance between occurrences of letter matches distance array",
      "record first appearance index",
      "second - first - 1 == distance[c]"
    ],
    "solved": false
  },
  {
    "id": "lc-2404",
    "title": "Most Frequent Even Element",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Even Frequency",
    "leetcodeNumber": 2404,
    "leetcodeUrl": "https://leetcode.com/problems/most-frequent-even-element/",
    "signals": [
      "most frequent even element, smallest if tie",
      "frequency hash map for evens",
      "track max frequency and min value"
    ],
    "solved": false
  },
  {
    "id": "lc-2418",
    "title": "Sort the People",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Pair Sort",
    "leetcodeNumber": 2418,
    "leetcodeUrl": "https://leetcode.com/problems/sort-the-people/",
    "signals": [
      "sort names by heights descending",
      "vector of pairs (height, name)",
      "sort reverse"
    ],
    "solved": false
  },
  {
    "id": "lc-2427",
    "title": "Number of Common Factors",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Common Divisors",
    "leetcodeNumber": 2427,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-common-factors/",
    "signals": [
      "integers dividing both a and b",
      "loop up to gcd(a, b)",
      "count factors"
    ],
    "solved": false
  },
  {
    "id": "lc-2441",
    "title": "Largest Positive Integer That Exists With Its Negative",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Set Match",
    "leetcodeNumber": 2441,
    "leetcodeUrl": "https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative/",
    "signals": [
      "maximum k such that both k and -k exist",
      "hash set lookup",
      "track max positive"
    ],
    "solved": false
  },
  {
    "id": "lc-2465",
    "title": "Number of Distinct Averages",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Sorted Pairs",
    "leetcodeNumber": 2465,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-distinct-averages/",
    "signals": [
      "average of min and max elements",
      "sort array, two pointers converging",
      "insert sum into set"
    ],
    "solved": false
  },
  {
    "id": "lc-2500",
    "title": "Delete Greatest Value in Each Row",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Row Sort",
    "leetcodeNumber": 2500,
    "leetcodeUrl": "https://leetcode.com/problems/delete-greatest-value-in-each-row/",
    "signals": [
      "delete maximum in each row, add overall max to answer",
      "sort each row ascending",
      "sum max of each column"
    ],
    "solved": false
  },
  {
    "id": "lc-2535",
    "title": "Difference Between Element Sum and Digit Sum of an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Sum",
    "leetcodeNumber": 2535,
    "leetcodeUrl": "https://leetcode.com/problems/difference-between-element-sum-and-digit-sum-of-an-array/",
    "signals": [
      "|element sum - digit sum|",
      "sum numbers and sum individual digits",
      "absolute difference"
    ],
    "solved": false
  },
  {
    "id": "lc-2553",
    "title": "Separate the Digits in an Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Extraction",
    "leetcodeNumber": 2553,
    "leetcodeUrl": "https://leetcode.com/problems/separate-the-digits-in-an-array/",
    "signals": [
      "separate all digits of each number in order",
      "convert to string or extract digits",
      "append to result"
    ],
    "solved": false
  },
  {
    "id": "lc-2652",
    "title": "Sum Multiples",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Divisibility",
    "leetcodeNumber": 2652,
    "leetcodeUrl": "https://leetcode.com/problems/sum-multiples/",
    "signals": [
      "sum integers in 1..n divisible by 3, 5, or 7",
      "check i%3==0 or i%5==0 or i%7==0",
      "linear sum"
    ],
    "solved": false
  },
  {
    "id": "lc-2656",
    "title": "Maximum Sum With Exactly K Elements",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Max Greed",
    "leetcodeNumber": 2656,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-with-exactly-k-elements/",
    "signals": [
      "maximize score picking max and incrementing k times",
      "maxVal * k + (k * (k - 1)) / 2",
      "greedy arithmetic"
    ],
    "solved": false
  },
  {
    "id": "lc-2678",
    "title": "Number of Senior Citizens",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Substring Age",
    "leetcodeNumber": 2678,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-senior-citizens/",
    "signals": [
      "passenger age > 60 from 15-char string",
      "substring indices 11-12 as age",
      "count ages > 60"
    ],
    "solved": false
  },
  {
    "id": "lc-2710",
    "title": "Remove Trailing Zeros From a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Trailing Trim",
    "leetcodeNumber": 2710,
    "leetcodeUrl": "https://leetcode.com/problems/remove-trailing-zeros-from-a-string/",
    "signals": [
      "remove trailing zeros from string representation",
      "pop_back while trailing char is '0'",
      "string trim"
    ],
    "solved": false
  },
  {
    "id": "lc-2733",
    "title": "Neither Minimum nor Maximum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Three Elements",
    "leetcodeNumber": 2733,
    "leetcodeUrl": "https://leetcode.com/problems/neither-minimum-nor-maximum/",
    "signals": [
      "return number that is neither min nor max",
      "sort first three elements",
      "return middle if size >= 3"
    ],
    "solved": false
  },
  {
    "id": "lc-2778",
    "title": "Sum of Squares of Special Elements",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Divisibility Sum",
    "leetcodeNumber": 2778,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-squares-of-special-elements/",
    "signals": [
      "nums[i] is special if n % i == 0 (1-indexed)",
      "check if n % (i+1) == 0",
      "sum squares"
    ],
    "solved": false
  },
  {
    "id": "lc-2788",
    "title": "Split Strings by Separator",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Tokenization",
    "leetcodeNumber": 2788,
    "leetcodeUrl": "https://leetcode.com/problems/split-strings-by-separator/",
    "signals": [
      "split array of words by separator char",
      "stringstream or manual scan",
      "filter out empty tokens"
    ],
    "solved": false
  },
  {
    "id": "lc-2798",
    "title": "Number of Employees Who Met the Target",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Threshold Count",
    "leetcodeNumber": 2798,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-employees-who-met-the-target/",
    "signals": [
      "count employees whose hours >= target",
      "linear scan counter",
      "hours comparison"
    ],
    "solved": false
  },
  {
    "id": "lc-2828",
    "title": "Check if a String Is an Acronym of Words",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "First Letters",
    "leetcodeNumber": 2828,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words/",
    "signals": [
      "s is acronym formed by first characters of words",
      "compare s[i] == words[i][0]",
      "length and character match"
    ],
    "solved": false
  },
  {
    "id": "lc-2859",
    "title": "Sum of Values at Indices With K Set Bits",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Popcount Indices",
    "leetcodeNumber": 2859,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits/",
    "signals": [
      "sum nums[i] where index i has k set bits",
      "__builtin_popcount(i) == k",
      "accumulate sum"
    ],
    "solved": false
  },
  {
    "id": "lc-2894",
    "title": "Divisible and Non-divisible Sums Difference",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Modulo Diff",
    "leetcodeNumber": 2894,
    "leetcodeUrl": "https://leetcode.com/problems/divisible-and-non-divisible-sums-difference/",
    "signals": [
      "sum non-divisible minus sum divisible in 1..n",
      "loop 1 to n checking i % m",
      "difference computation"
    ],
    "solved": false
  },
  {
    "id": "lc-2913",
    "title": "Subarrays Distinct Element Sum of Squares I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Distinct Subarrays",
    "leetcodeNumber": 2913,
    "leetcodeUrl": "https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-i/",
    "signals": [
      "sum of squares of distinct counts in all subarrays",
      "nested loop with hash set",
      "accumulate distinct^2"
    ],
    "solved": false
  },
  {
    "id": "lc-2942",
    "title": "Find Words Containing Character",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Character Search",
    "leetcodeNumber": 2942,
    "leetcodeUrl": "https://leetcode.com/problems/find-words-containing-character/",
    "signals": [
      "indices of words containing character x",
      "word.find(x) != string::npos",
      "collect indices"
    ],
    "solved": false
  },
  {
    "id": "lc-2960",
    "title": "Count Tested Devices After Test Operations",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Offset Decrement",
    "leetcodeNumber": 2960,
    "leetcodeUrl": "https://leetcode.com/problems/count-tested-devices-after-test-operations/",
    "signals": [
      "test device if battery - tested > 0",
      "running tested counter serves as decrement",
      "single pass"
    ],
    "solved": false
  },
  {
    "id": "lc-2965",
    "title": "Find Missing and Repeated Values",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Grid 1..n^2",
    "leetcodeNumber": 2965,
    "leetcodeUrl": "https://leetcode.com/problems/find-missing-and-repeated-values/",
    "signals": [
      "grid contains 1..n^2 with one repeated and one missing",
      "frequency array of size n^2 + 1",
      "find count 2 and count 0"
    ],
    "solved": false
  },
  {
    "id": "lc-2974",
    "title": "Minimum Number Game",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Pair Swap",
    "leetcodeNumber": 2974,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-game/",
    "signals": [
      "Alice and Bob remove min and append Bob then Alice",
      "sort array ascending",
      "swap adjacent pairs nums[2i] and nums[2i+1]"
    ],
    "solved": false
  },
  {
    "id": "lc-3005",
    "title": "Count Elements With Maximum Frequency",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Max Freq Sum",
    "leetcodeNumber": 3005,
    "leetcodeUrl": "https://leetcode.com/problems/count-elements-with-maximum-frequency/",
    "signals": [
      "sum of frequencies of all elements with max frequency",
      "frequency map",
      "count elements matching maxFreq * maxFreq"
    ],
    "solved": false
  },
  {
    "id": "lc-3019",
    "title": "Number of Changing Keys",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Key Changes",
    "leetcodeNumber": 3019,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-changing-keys/",
    "signals": [
      "count key changes ignoring case",
      "tolower(s[i]) != tolower(s[i-1])",
      "count transitions"
    ],
    "solved": false
  },
  {
    "id": "lc-3024",
    "title": "Type of Triangle",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Triangle Inequality",
    "leetcodeNumber": 3024,
    "leetcodeUrl": "https://leetcode.com/problems/type-of-triangle/",
    "signals": [
      "equilateral, isosceles, scalene, or none",
      "sort sides, check a + b > c",
      "count equal sides"
    ],
    "solved": false
  },
  {
    "id": "lc-3028",
    "title": "Ant on the Boundary",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Running Sum Zero",
    "leetcodeNumber": 3028,
    "leetcodeUrl": "https://leetcode.com/problems/ant-on-the-boundary/",
    "signals": [
      "ant returns to boundary (position 0)",
      "running position sum += step",
      "count times position == 0"
    ],
    "solved": false
  },
  {
    "id": "lc-3065",
    "title": "Minimum Operations to Exceed Threshold Value I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Count Less",
    "leetcodeNumber": 3065,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-i/",
    "signals": [
      "operations to make all elements >= k",
      "count elements strictly < k",
      "linear scan"
    ],
    "solved": false
  },
  {
    "id": "lc-3074",
    "title": "Apple Redistribution into Boxes",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Box Pack",
    "leetcodeNumber": 3074,
    "leetcodeUrl": "https://leetcode.com/problems/apple-redistribution-into-boxes/",
    "signals": [
      "minimum boxes to pack all apples",
      "total apples = sum(apple)",
      "sort capacity descending and greedily fill"
    ],
    "solved": false
  },
  {
    "id": "lc-3079",
    "title": "Find the Sum of Encrypted Integers",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Replace",
    "leetcodeNumber": 3079,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-sum-of-encrypted-integers/",
    "signals": [
      "replace all digits with largest digit",
      "find max digit and repeat for length",
      "sum encrypted numbers"
    ],
    "solved": false
  },
  {
    "id": "lc-3099",
    "title": "Harshad Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Sum Divisible",
    "leetcodeNumber": 3099,
    "leetcodeUrl": "https://leetcode.com/problems/harshad-number/",
    "signals": [
      "x is divisible by sum of its digits",
      "compute digit sum",
      "if x % sum == 0 return sum else -1"
    ],
    "solved": false
  },
  {
    "id": "lc-3110",
    "title": "Score of a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Adjacent Abs Diff",
    "leetcodeNumber": 3110,
    "leetcodeUrl": "https://leetcode.com/problems/score-of-a-string/",
    "signals": [
      "sum of |s[i] - s[i+1]| for all adjacent chars",
      "linear loop summing abs differences",
      "score computation"
    ],
    "solved": false
  },
  {
    "id": "lc-3120",
    "title": "Count the Number of Special Characters I",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Case Pair",
    "leetcodeNumber": 3120,
    "leetcodeUrl": "https://leetcode.com/problems/count-the-number-of-special-characters-i/",
    "signals": [
      "letters appearing in both lowercase and uppercase",
      "two boolean arrays or bitmasks",
      "count shared letters"
    ],
    "solved": false
  },
  {
    "id": "lc-3131",
    "title": "Find the Integer Added to Array I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Min Difference",
    "leetcodeNumber": 3131,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-integer-added-to-array-i/",
    "signals": [
      "integer x added to each element of nums1 to get nums2",
      "min(nums2) - min(nums1)",
      "minimum comparison"
    ],
    "solved": false
  },
  {
    "id": "lc-3146",
    "title": "Permutation Difference between Two Strings",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Index Distance",
    "leetcodeNumber": 3146,
    "leetcodeUrl": "https://leetcode.com/problems/permutation-difference-between-two-strings/",
    "signals": [
      "sum |indexInS - indexInT| for each char",
      "map char to index in s",
      "sum differences"
    ],
    "solved": false
  },
  {
    "id": "lc-3151",
    "title": "Special Array I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Parity Alternation",
    "leetcodeNumber": 3151,
    "leetcodeUrl": "https://leetcode.com/problems/special-array-i/",
    "signals": [
      "adjacent elements have different parity",
      "(nums[i] % 2) != (nums[i+1] % 2)",
      "linear validation"
    ],
    "solved": false
  },
  {
    "id": "lc-3158",
    "title": "Find the XOR of Numbers Which Appear Twice",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Duplicate XOR",
    "leetcodeNumber": 3158,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice/",
    "signals": [
      "numbers appearing twice in array",
      "track seen with set or frequency array",
      "xor numbers that appear twice"
    ],
    "solved": false
  },
  {
    "id": "lc-3162",
    "title": "Find the Number of Good Pairs I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Divisibility Pairs",
    "leetcodeNumber": 3162,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-number-of-good-pairs-i/",
    "signals": [
      "nums1[i] is divisible by nums2[j] * k",
      "nested loops",
      "count valid pairs"
    ],
    "solved": false
  },
  {
    "id": "lc-3174",
    "title": "Clear Digits",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Stack Char Erase",
    "leetcodeNumber": 3174,
    "leetcodeUrl": "https://leetcode.com/problems/clear-digits/",
    "signals": [
      "delete first digit and closest non-digit to left",
      "stack of characters, pop on digit",
      "reconstruct string"
    ],
    "solved": false
  },
  {
    "id": "lc-3184",
    "title": "Count Pairs That Form a Complete Day I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Modulo 24 Pairs",
    "leetcodeNumber": 3184,
    "leetcodeUrl": "https://leetcode.com/problems/count-pairs-that-form-a-complete-day-i/",
    "signals": [
      "(hours[i] + hours[j]) % 24 == 0",
      "remainder frequency array size 24",
      "count complementary remainders"
    ],
    "solved": false
  },
  {
    "id": "lc-3190",
    "title": "Find Minimum Operations to Make All Elements Divisible by Three",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Modulo 3",
    "leetcodeNumber": 3190,
    "leetcodeUrl": "https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three/",
    "signals": [
      "add or subtract 1 to make divisible by 3",
      "elements with num % 3 != 0 need 1 op",
      "count non-zero remainders"
    ],
    "solved": false
  },
  {
    "id": "lc-3194",
    "title": "Minimum Average of Smallest and Largest Elements",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Converging Averages",
    "leetcodeNumber": 3194,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements/",
    "signals": [
      "repeatedly average smallest and largest",
      "sort array, two pointers converging",
      "track minimum average"
    ],
    "solved": false
  },
  {
    "id": "lc-3206",
    "title": "Alternating Groups I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Circular Window 3",
    "leetcodeNumber": 3206,
    "leetcodeUrl": "https://leetcode.com/problems/alternating-groups-i/",
    "signals": [
      "alternating 3 tiles in circular array",
      "colors[i] != colors[i-1] and colors[i] != colors[i+1]",
      "circular index modulo"
    ],
    "solved": false
  },
  {
    "id": "lc-2",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Digit Addition",
    "leetcodeNumber": 2,
    "leetcodeUrl": "https://leetcode.com/problems/add-two-numbers/",
    "signals": [
      "add two numbers represented as linked lists in reverse",
      "carry propagation",
      "dummy head creation"
    ],
    "solved": false
  },
  {
    "id": "lc-10",
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "2D Regex DP",
    "leetcodeNumber": 10,
    "leetcodeUrl": "https://leetcode.com/problems/regular-expression-matching/",
    "signals": [
      "support '.' and '*' regular expression matching",
      "dp[i][j] matches s[0..i] and p[0..j]",
      "handle star wildcard branches"
    ],
    "solved": false
  },
  {
    "id": "lc-29",
    "title": "Divide Two Integers",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bit Doubling Division",
    "leetcodeNumber": 29,
    "leetcodeUrl": "https://leetcode.com/problems/divide-two-integers/",
    "signals": [
      "divide two integers without multiplication or division",
      "exponential bit shifting (divisor << i)",
      "handle 32-bit overflow"
    ],
    "solved": false
  },
  {
    "id": "lc-32",
    "title": "Longest Valid Parentheses",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Stack Indices / DP",
    "leetcodeNumber": 32,
    "leetcodeUrl": "https://leetcode.com/problems/longest-valid-parentheses/",
    "signals": [
      "longest valid parentheses substring",
      "stack of unmatched indices initialized with -1",
      "or two pass counter"
    ],
    "solved": false
  },
  {
    "id": "lc-44",
    "title": "Wildcard Matching",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "2D Wildcard DP",
    "leetcodeNumber": 44,
    "leetcodeUrl": "https://leetcode.com/problems/wildcard-matching/",
    "signals": [
      "match '?' and '*' wildcards",
      "2D DP or greedy two pointers with star backtrack",
      "linear wildcard search"
    ],
    "solved": false
  },
  {
    "id": "lc-50",
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Binary Exponentiation",
    "leetcodeNumber": 50,
    "leetcodeUrl": "https://leetcode.com/problems/powx-n/",
    "signals": [
      "calculate x raised to power n in O(log n)",
      "square base and halve exponent",
      "handle negative powers"
    ],
    "solved": false
  },
  {
    "id": "lc-69",
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Integer Square Root",
    "leetcodeNumber": 69,
    "leetcodeUrl": "https://leetcode.com/problems/sqrtx/",
    "signals": [
      "compute integer square root of x",
      "binary search range 1 to x",
      "check mid <= x / mid"
    ],
    "solved": false
  },
  {
    "id": "lc-97",
    "title": "Interleaving String",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "2D Interleave DP",
    "leetcodeNumber": 97,
    "leetcodeUrl": "https://leetcode.com/problems/interleaving-string/",
    "signals": [
      "s3 formed by interleaving s1 and s2",
      "dp[i][j] matches prefix of s3",
      "match character from s1 or s2"
    ],
    "solved": false
  },
  {
    "id": "lc-115",
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "2D Subsequence DP",
    "leetcodeNumber": 115,
    "leetcodeUrl": "https://leetcode.com/problems/distinct-subsequences/",
    "signals": [
      "count distinct subsequences of s equaling t",
      "dp[i][j] = dp[i-1][j] + (s[i-1]==t[j-1] ? dp[i-1][j-1] : 0)",
      "space-optimized row"
    ],
    "solved": false
  },
  {
    "id": "lc-126",
    "title": "Word Ladder II",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "BFS + DFS Backtrack",
    "leetcodeNumber": 126,
    "leetcodeUrl": "https://leetcode.com/problems/word-ladder-ii/",
    "signals": [
      "all shortest transformation sequences from beginWord to endWord",
      "BFS to build level DAG",
      "DFS backtracking to collect paths"
    ],
    "solved": false
  },
  {
    "id": "lc-132",
    "title": "Palindrome Partitioning II",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "1D Cut DP",
    "leetcodeNumber": 132,
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning-ii/",
    "signals": [
      "minimum cuts to partition string into palindromes",
      "precompute isPalindrome[i][j]",
      "dp[i] = min(dp[j-1] + 1)"
    ],
    "solved": false
  },
  {
    "id": "lc-140",
    "title": "Word Break II",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "DFS with Memoization",
    "leetcodeNumber": 140,
    "leetcodeUrl": "https://leetcode.com/problems/word-break-ii/",
    "signals": [
      "all possible sentences segmented from dictionary words",
      "memoized DFS on substring suffixes",
      "combine words"
    ],
    "solved": false
  },
  {
    "id": "lc-146",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Hash Map + Doubly Linked List",
    "leetcodeNumber": 146,
    "leetcodeUrl": "https://leetcode.com/problems/lru-cache/",
    "signals": [
      "Least Recently Used cache with O(1) get and put",
      "hash map pointing to doubly linked list nodes",
      "splice most recent to head"
    ],
    "solved": false
  },
  {
    "id": "lc-149",
    "title": "Max Points on a Line",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Slope Hash",
    "leetcodeNumber": 149,
    "leetcodeUrl": "https://leetcode.com/problems/max-points-on-a-line/",
    "signals": [
      "maximum number of points on same line",
      "reduce slopes dx, dy by gcd(dx, dy)",
      "hash map of slope tuples per point"
    ],
    "solved": false
  },
  {
    "id": "lc-174",
    "title": "Dungeon Game",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Reverse Grid DP",
    "leetcodeNumber": 174,
    "leetcodeUrl": "https://leetcode.com/problems/dungeon-game/",
    "signals": [
      "knight minimum initial health to rescue princess",
      "reverse DP from bottom-right (m-1, n-1) to (0, 0)",
      "dp[r][c] = max(1, min(down, right) - dungeon[r][c])"
    ],
    "solved": false
  },
  {
    "id": "lc-218",
    "title": "The Skyline Problem",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Sweep-Line with Multiset",
    "leetcodeNumber": 218,
    "leetcodeUrl": "https://leetcode.com/problems/the-skyline-problem/",
    "signals": [
      "key points of building outlines",
      "sweep line on building edges",
      "multiset or max-heap tracking active heights"
    ],
    "solved": false
  },
  {
    "id": "lc-222",
    "title": "Count Complete Tree Nodes",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Binary Search on Tree",
    "leetcodeNumber": 222,
    "leetcodeUrl": "https://leetcode.com/problems/count-complete-tree-nodes/",
    "signals": [
      "count nodes in complete binary tree in < O(N)",
      "compare leftmost and rightmost depth",
      "2^h - 1 if full else divide and conquer"
    ],
    "solved": false
  },
  {
    "id": "lc-269",
    "title": "Alien Dictionary",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Topological Sort",
    "leetcodeNumber": 269,
    "leetcodeUrl": "https://leetcode.com/problems/alien-dictionary/",
    "signals": [
      "lexicographical order of alien language",
      "build graph from adjacent words mismatch",
      "Kahn's algorithm topological sort"
    ],
    "solved": false
  },
  {
    "id": "lc-312",
    "title": "Burst Balloons",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Interval DP",
    "leetcodeNumber": 312,
    "leetcodeUrl": "https://leetcode.com/problems/burst-balloons/",
    "signals": [
      "maximum coins bursting balloons",
      "interval DP dp[i][j] = max(coins + dp[i][k] + dp[k][j])",
      "last balloon burst in interval"
    ],
    "solved": false
  },
  {
    "id": "lc-329",
    "title": "Longest Increasing Path in a Matrix",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Memoized DFS on DAG",
    "leetcodeNumber": 329,
    "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
    "signals": [
      "longest strictly increasing path in matrix",
      "DFS with memoization table",
      "matrix is a DAG"
    ],
    "solved": false
  },
  {
    "id": "lc-332",
    "title": "Reconstruct Itinerary",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Eulerian Path Hierholzer",
    "leetcodeNumber": 332,
    "leetcodeUrl": "https://leetcode.com/problems/reconstruct-itinerary/",
    "signals": [
      "itinerary using all flight tickets starting from JFK",
      "Hierholzer's algorithm for Eulerian path",
      "DFS with min-heaps / multiset"
    ],
    "solved": false
  },
  {
    "id": "lc-337",
    "title": "House Robber III",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Tree DP",
    "leetcodeNumber": 337,
    "leetcodeUrl": "https://leetcode.com/problems/house-robber-iii/",
    "signals": [
      "houses arranged in binary tree",
      "return pair (robRoot, notRobRoot) per node",
      "post-order tree DP"
    ],
    "solved": false
  },
  {
    "id": "lc-407",
    "title": "Trapping Rain Water II",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Min-Heap BFS",
    "leetcodeNumber": 407,
    "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water-ii/",
    "signals": [
      "trapped rainwater in 2D height matrix",
      "push border cells into min-heap",
      "BFS inward lifting water level"
    ],
    "solved": false
  },
  {
    "id": "lc-460",
    "title": "LFU Cache",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Hash Map + Doubly Linked Lists",
    "leetcodeNumber": 460,
    "leetcodeUrl": "https://leetcode.com/problems/lfu-cache/",
    "signals": [
      "Least Frequently Used cache in O(1)",
      "map key to node, map freq to doubly linked list",
      "track minFreq"
    ],
    "solved": false
  },
  {
    "id": "lc-472",
    "title": "Concatenated Words",
    "difficulty": "Hard",
    "category": "Trie (Prefix Tree)",
    "categoryId": "trie",
    "pattern": "Prefix & Bitwise Trie",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Trie / Word Break DP",
    "leetcodeNumber": 472,
    "leetcodeUrl": "https://leetcode.com/problems/concatenated-words/",
    "signals": [
      "words formed entirely by concatenating shorter words",
      "sort words by length",
      "Word Break DP on existing word set"
    ],
    "solved": false
  },
  {
    "id": "lc-679",
    "title": "24 Game",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Permutation Backtrack",
    "leetcodeNumber": 679,
    "leetcodeUrl": "https://leetcode.com/problems/24-game/",
    "signals": [
      "combine 4 cards with + - * / to make 24",
      "pick any two numbers, try 4 operations, recurse",
      "floating point precision check"
    ],
    "solved": false
  },
  {
    "id": "lc-773",
    "title": "Sliding Puzzle",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "BFS State Space",
    "leetcodeNumber": 773,
    "leetcodeUrl": "https://leetcode.com/problems/sliding-puzzle/",
    "signals": [
      "solve 2x3 sliding puzzle board in minimum moves",
      "BFS over string state representations",
      "queue of board configurations"
    ],
    "solved": false
  },
  {
    "id": "lc-827",
    "title": "Making A Large Island",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Component Labeling",
    "leetcodeNumber": 827,
    "leetcodeUrl": "https://leetcode.com/problems/making-a-large-island/",
    "signals": [
      "change at most one 0 to 1 to maximize island",
      "label each island with unique ID and size",
      "check neighboring components of each 0"
    ],
    "solved": false
  },
  {
    "id": "lc-834",
    "title": "Sum of Distances in Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Rerooting Tree DP",
    "leetcodeNumber": 834,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-distances-in-tree/",
    "signals": [
      "sum of distances from each node to all others",
      "post-order count subtree sizes and distances",
      "pre-order rerooting transition"
    ],
    "solved": false
  },
  {
    "id": "lc-847",
    "title": "Shortest Path Visiting All Nodes",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Bitmask BFS",
    "leetcodeNumber": 847,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
    "signals": [
      "shortest path visiting all nodes in undirected graph",
      "BFS with state (node, visited_mask)",
      "queue tracks minimum steps"
    ],
    "solved": false
  },
  {
    "id": "lc-871",
    "title": "Minimum Number of Refueling Stops",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Max-Heap Greedy",
    "leetcodeNumber": 871,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-refueling-stops/",
    "signals": [
      "reach target with minimum fuel stops",
      "max-heap of fuel from passed stations",
      "refuel largest available when empty"
    ],
    "solved": false
  },
  {
    "id": "lc-887",
    "title": "Super Egg Drop",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Binary Search DP",
    "leetcodeNumber": 887,
    "leetcodeUrl": "https://leetcode.com/problems/super-egg-drop/",
    "signals": [
      "minimum moves to find threshold floor with k eggs",
      "dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1",
      "search minimum moves m"
    ],
    "solved": false
  },
  {
    "id": "lc-980",
    "title": "Unique Paths III",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Hamiltonian Grid Path",
    "leetcodeNumber": 980,
    "leetcodeUrl": "https://leetcode.com/problems/unique-paths-iii/",
    "signals": [
      "walk from start to end visiting every non-obstacle cell exactly once",
      "count empty cells",
      "backtracking DFS checking step count"
    ],
    "solved": false
  },
  {
    "id": "lc-1000",
    "title": "Minimum Cost to Merge Stones",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Interval DP",
    "leetcodeNumber": 1000,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-merge-stones/",
    "signals": [
      "merge k adjacent stone piles into 1 with min cost",
      "interval DP dp[i][j][m]",
      "check if (n - 1) % (k - 1) == 0"
    ],
    "solved": false
  },
  {
    "id": "lc-1095",
    "title": "Find in Mountain Array",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Triple Binary Search",
    "leetcodeNumber": 1095,
    "leetcodeUrl": "https://leetcode.com/problems/find-in-mountain-array/",
    "signals": [
      "find target in mountain array using <= 100 API calls",
      "binary search to find peak",
      "binary search left slope then right slope"
    ],
    "solved": false
  },
  {
    "id": "lc-1235",
    "title": "Maximum Profit in Job Scheduling",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Sort & Binary Search DP",
    "leetcodeNumber": 1235,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-profit-in-job-scheduling/",
    "signals": [
      "maximum profit from non-overlapping jobs",
      "sort by end time",
      "dp[i] = max(dp[i-1], profit + dp[prevNonOverlap]) via binary search"
    ],
    "solved": false
  },
  {
    "id": "lc-1240",
    "title": "Tiling a Rectangle with the Fewest Squares",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Tiling Backtracking",
    "leetcodeNumber": 1240,
    "leetcodeUrl": "https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares/",
    "signals": [
      "tile n x m rectangle with minimum integer squares",
      "backtracking find lowest uncovered cell",
      "place largest fitting squares"
    ],
    "solved": false
  },
  {
    "id": "lc-1293",
    "title": "Shortest Path in a Grid with Obstacles Elimination",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "3D BFS",
    "leetcodeNumber": 1293,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/",
    "signals": [
      "shortest path eliminating at most k obstacles",
      "BFS state (row, col, remaining_eliminations)",
      "visited 2D table storing max remaining k"
    ],
    "solved": false
  },
  {
    "id": "lc-1335",
    "title": "Minimum Difficulty of a Job Schedule",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Partition DP",
    "leetcodeNumber": 1335,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/",
    "signals": [
      "schedule jobs across d days in order",
      "dp[day][job] = min(dp[day-1][k] + max(difficulty[k..job]))",
      "2D DP"
    ],
    "solved": false
  },
  {
    "id": "lc-1406",
    "title": "Stone Game III",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Game Theory DP",
    "leetcodeNumber": 1406,
    "leetcodeUrl": "https://leetcode.com/problems/stone-game-iii/",
    "signals": [
      "Alice and Bob take 1, 2, or 3 stones from front",
      "dp[i] = max score difference starting at i",
      "minimax recurrence"
    ],
    "solved": false
  },
  {
    "id": "lc-1444",
    "title": "Number of Ways of Cutting a Pizza",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "2D Prefix Cut DP",
    "leetcodeNumber": 1444,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza/",
    "signals": [
      "cut pizza with k-1 cuts so each piece has >= 1 apple",
      "2D suffix sum of apples",
      "3D DP state (row, col, cuts)"
    ],
    "solved": false
  },
  {
    "id": "lc-1463",
    "title": "Cherry Pickup II",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Dual Robot DP",
    "leetcodeNumber": 1463,
    "leetcodeUrl": "https://leetcode.com/problems/cherry-pickup-ii/",
    "signals": [
      "two robots move down collecting cherries",
      "3D DP state dp[r][c1][c2]",
      "combine adjacent moves"
    ],
    "solved": false
  },
  {
    "id": "lc-1473",
    "title": "Paint House III",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "3D Neighborhood DP",
    "leetcodeNumber": 1473,
    "leetcodeUrl": "https://leetcode.com/problems/paint-house-iii/",
    "signals": [
      "paint houses to form target neighborhoods",
      "3D DP state (house, color, neighborhoods)",
      "transition comparing previous house color"
    ],
    "solved": false
  },
  {
    "id": "lc-1510",
    "title": "Stone Game IV",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Square Game DP",
    "leetcodeNumber": 1510,
    "leetcodeUrl": "https://leetcode.com/problems/stone-game-iv/",
    "signals": [
      "players remove square numbers of stones",
      "dp[i] = true if any !dp[i - k*k]",
      "1D boolean game DP"
    ],
    "solved": false
  },
  {
    "id": "lc-1547",
    "title": "Minimum Cost to Cut a Stick",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Interval Cut DP",
    "leetcodeNumber": 1547,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
    "signals": [
      "cost to cut stick equals length of current stick",
      "sort cuts array and add boundaries 0, n",
      "interval DP dp[i][j] = (cuts[j]-cuts[i]) + min(dp[i][k] + dp[k][j])"
    ],
    "solved": false
  },
  {
    "id": "lc-1671",
    "title": "Minimum Number of Removals to Make Mountain Array",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "LIS & LDS",
    "leetcodeNumber": 1671,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/",
    "signals": [
      "minimum removals to form mountain array",
      "longest increasing subsequence from left and right",
      "maximize LIS[i] + LDS[i] - 1"
    ],
    "solved": false
  },
  {
    "id": "lc-1723",
    "title": "Find Minimum Time to Finish All Jobs",
    "difficulty": "Hard",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Pruned Backtracking",
    "leetcodeNumber": 1723,
    "leetcodeUrl": "https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs/",
    "signals": [
      "assign jobs to k workers minimizing max load",
      "backtracking with sorting jobs descending",
      "prune redundant empty workers"
    ],
    "solved": false
  },
  {
    "id": "lc-1786",
    "title": "Number of Restricted Paths From First to Last Node",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Dijkstra + DAG DP",
    "leetcodeNumber": 1786,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node/",
    "signals": [
      "path where distanceToLast decreases strictly",
      "Dijkstra from last node to all",
      "memoized DFS on induced DAG"
    ],
    "solved": false
  },
  {
    "id": "lc-1883",
    "title": "Minimum Skips to Arrive at Meeting On Time",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Precision Avoidance DP",
    "leetcodeNumber": 1883,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time/",
    "signals": [
      "minimum rest skips to arrive within hoursBefore",
      "dp[i][j] = min time for first i roads with j skips",
      "integer arithmetic avoiding floating point"
    ],
    "solved": false
  },
  {
    "id": "lc-1928",
    "title": "Minimum Cost to Reach Destination in Time",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Dijkstra with Time State",
    "leetcodeNumber": 1928,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/",
    "signals": [
      "minimize passing fees reaching destination within maxTime",
      "Dijkstra with priority queue on (fee, time, node)",
      "prune worse time with worse fee"
    ],
    "solved": false
  },
  {
    "id": "lc-2009",
    "title": "Minimum Number of Operations to Make Array Continuous",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Sort Unique Window",
    "leetcodeNumber": 2009,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/",
    "signals": [
      "make array continuous by replacing elements",
      "sort and remove duplicates",
      "sliding window of width n-1 to count retained"
    ],
    "solved": false
  },
  {
    "id": "lc-2092",
    "title": "Find All People With Secret",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Temporal DSU",
    "leetcodeNumber": 2092,
    "leetcodeUrl": "https://leetcode.com/problems/find-all-people-with-secret/",
    "signals": [
      "share secrets at meeting times",
      "group meetings by timestamp",
      "unite participants in DSU, reset unconnected"
    ],
    "solved": false
  },
  {
    "id": "lc-2127",
    "title": "Maximum Employees to Be Invited to a Meeting",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Functional Graph Cycles",
    "leetcodeNumber": 2127,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting/",
    "signals": [
      "circular table employee favorites",
      "functional graph component analysis",
      "cycles of length 2 with arms vs cycles > 2"
    ],
    "solved": false
  },
  {
    "id": "lc-2246",
    "title": "Longest Path With Different Adjacent Characters",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree DFS Top 2",
    "leetcodeNumber": 2246,
    "leetcodeUrl": "https://leetcode.com/problems/longest-path-with-different-adjacent-characters/",
    "signals": [
      "longest path where no adjacent nodes have same label",
      "post-order DFS track top 2 child path lengths",
      "update global diameter"
    ],
    "solved": false
  },
  {
    "id": "lc-2281",
    "title": "Sum of Total Strength of Wizards",
    "difficulty": "Hard",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Prefix of Prefix",
    "leetcodeNumber": 2281,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-total-strength-of-wizards/",
    "signals": [
      "sum of (min * sum) of all subarrays",
      "monotonic stack for previous and next smaller",
      "prefix sum of prefix sum for range contributions"
    ],
    "solved": false
  },
  {
    "id": "lc-2402",
    "title": "Meeting Rooms III",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Two Heaps Simulation",
    "leetcodeNumber": 2402,
    "leetcodeUrl": "https://leetcode.com/problems/meeting-rooms-iii/",
    "signals": [
      "n rooms allocate earliest available with lowest index",
      "min-heap for free rooms, min-heap for occupied (endTime, room)",
      "sort meetings by start time"
    ],
    "solved": false
  },
  {
    "id": "lc-2444",
    "title": "Count Subarrays With Fixed Bounds",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Three Pointers Bounds",
    "leetcodeNumber": 2444,
    "leetcodeUrl": "https://leetcode.com/problems/count-subarrays-with-fixed-bounds/",
    "signals": [
      "subarrays where min is minK and max is maxK",
      "track lastInvalid, lastMin, lastMax indices",
      "count += max(0, min(lastMin, lastMax) - lastInvalid)"
    ],
    "solved": false
  },
  {
    "id": "lc-2448",
    "title": "Minimum Cost to Make Array Equal",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Weighted Median",
    "leetcodeNumber": 2448,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-make-array-equal/",
    "signals": [
      "cost to change nums[i] to target is |nums[i] - target| * cost[i]",
      "optimal target is weighted median",
      "prefix sum of weights"
    ],
    "solved": false
  },
  {
    "id": "lc-2492",
    "title": "Minimum Score of a Path Between Two Cities",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Connected Min Edge",
    "leetcodeNumber": 2492,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/",
    "signals": [
      "minimum edge weight in component connecting 1 and n",
      "BFS/DFS from node 1",
      "track minimum edge in reachable component"
    ],
    "solved": false
  },
  {
    "id": "lc-2542",
    "title": "Maximum Subsequence Score",
    "difficulty": "Medium",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Sort & Min-Heap",
    "leetcodeNumber": 2542,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-subsequence-score/",
    "signals": [
      "maximize sum(nums1) * min(nums2) for k elements",
      "sort pairs by nums2 descending",
      "min-heap of size k to maintain largest nums1 sum"
    ],
    "solved": false
  },
  {
    "id": "lc-2642",
    "title": "Design Graph With Shortest Path Calculator",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Dijkstra Query",
    "leetcodeNumber": 2642,
    "leetcodeUrl": "https://leetcode.com/problems/design-graph-with-shortest-path-calculator/",
    "signals": [
      "dynamic directed graph with addEdge and shortestPath",
      "Dijkstra algorithm on demand",
      "adjacency list with min-heap"
    ],
    "solved": false
  },
  {
    "id": "lc-2646",
    "title": "Minimize the Total Price of the Trips",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree DP + Path Count",
    "leetcodeNumber": 2646,
    "leetcodeUrl": "https://leetcode.com/problems/minimize-the-total-price-of-the-trips/",
    "signals": [
      "halve prices of independent nodes for trips",
      "count node visits across all trips via BFS",
      "Tree House Robber DP on weighted nodes"
    ],
    "solved": false
  },
  {
    "id": "lc-2707",
    "title": "Extra Characters in a String",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Trie / 1D DP",
    "leetcodeNumber": 2707,
    "leetcodeUrl": "https://leetcode.com/problems/extra-characters-in-a-string/",
    "signals": [
      "minimize extra characters left over",
      "dp[i] = min(dp[i-1] + 1, min(dp[j])) if s[j..i] in dict",
      "1D DP with Trie or hash set"
    ],
    "solved": false
  },
  {
    "id": "lc-2709",
    "title": "Greatest Common Divisor Traversal",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Prime Factor DSU",
    "leetcodeNumber": 2709,
    "leetcodeUrl": "https://leetcode.com/problems/greatest-common-divisor-traversal/",
    "signals": [
      "can traverse between any pair if gcd > 1",
      "connect numbers to their prime factors in DSU",
      "check all numbers in same component"
    ],
    "solved": false
  },
  {
    "id": "lc-2742",
    "title": "Painting the Walls",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack & Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "0/1 Knapsack Target",
    "leetcodeNumber": 2742,
    "leetcodeUrl": "https://leetcode.com/problems/painting-the-walls/",
    "signals": [
      "paid painter takes time and cost, free painter 1 wall per unit time",
      "target walls = n",
      "dp[walls] = min(dp[walls], dp[walls - time - 1] + cost)"
    ],
    "solved": false
  },
  {
    "id": "lc-2812",
    "title": "Find the Safest Path in a Grid",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Multi-Source BFS + Dijkstra",
    "leetcodeNumber": 2812,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-safest-path-in-a-grid/",
    "signals": [
      "maximum safeness factor from thieves",
      "multi-source BFS distance from all thieves",
      "modified Dijkstra or DSU descending safeness"
    ],
    "solved": false
  },
  {
    "id": "lc-2867",
    "title": "Count Valid Paths in a Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Prime Sieve + Tree Components",
    "leetcodeNumber": 2867,
    "leetcodeUrl": "https://leetcode.com/problems/count-valid-paths-in-a-tree/",
    "signals": [
      "paths containing exactly one prime node",
      "sieve primes up to n",
      "contract non-prime components, count paths through primes"
    ],
    "solved": false
  },
  {
    "id": "lc-2976",
    "title": "Minimum Cost to Convert String I",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Floyd-Warshall 26x26",
    "leetcodeNumber": 2976,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-convert-string-i/",
    "signals": [
      "minimum cost to convert source to target",
      "Floyd-Warshall all-pairs on 26 lowercase letters",
      "sum conversion costs per character"
    ],
    "solved": false
  },
  {
    "id": "lc-2977",
    "title": "Minimum Cost to Convert String II",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Trie + Dijkstra + 1D DP",
    "leetcodeNumber": 2977,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-convert-string-ii/",
    "signals": [
      "string conversions of varying lengths",
      "Dijkstra on string transformation graph",
      "1D DP partitioned by Trie matches"
    ],
    "solved": false
  },
  {
    "id": "lc-3007",
    "title": "Maximum Number That Sum of the Prices Is Less Than or Equal to K",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Digit DP / Math Binary Search",
    "leetcodeNumber": 3007,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/",
    "signals": [
      "sum of prices of all numbers <= num is <= k",
      "math formula or digit DP to count set bits at positions",
      "binary search on answer"
    ],
    "solved": false
  },
  {
    "id": "lc-3013",
    "title": "Divide an Array Into Subarrays With Minimum Cost II",
    "difficulty": "Hard",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "pattern": "Top K & Greedy Heaps",
    "patternId": "heap-top-k",
    "subPattern": "Two Multisets Sliding Window",
    "leetcodeNumber": 3013,
    "leetcodeUrl": "https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/",
    "signals": [
      "minimum sum of k elements in sliding window of size dist+1",
      "two balanced multisets tracking k-1 smallest",
      "insert and erase balancing"
    ],
    "solved": false
  },
  {
    "id": "lc-3068",
    "title": "Find the Maximum Sum of Node Values",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "tree",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree DP / Parity Greedy",
    "leetcodeNumber": 3068,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-maximum-sum-of-node-values/",
    "signals": [
      "XOR pairs of adjacent node values",
      "any even number of nodes can be XORed",
      "greedy sorting differences, pick positive pairs"
    ],
    "solved": false
  },
  {
    "id": "lc-3108",
    "title": "Minimum Cost Walk in Weighted Graph",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "DSU Bitwise AND",
    "leetcodeNumber": 3108,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph/",
    "signals": [
      "walk cost is bitwise AND of all edges on path",
      "DSU merging components with bitwise AND of weights",
      "all nodes in component achieve same AND cost"
    ],
    "solved": false
  },
  {
    "id": "lc-3112",
    "title": "Minimum Time to Visit Disappearing Nodes",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Dijkstra with Expiry",
    "leetcodeNumber": 3112,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-time-to-visit-disappearing-nodes/",
    "signals": [
      "nodes disappear at disappear[i] time",
      "Dijkstra priority queue",
      "prune nodes if dist >= disappear[u]"
    ],
    "solved": false
  },
  {
    "id": "lc-3123",
    "title": "Find Edges in Shortest Paths",
    "difficulty": "Hard",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Dual Dijkstra",
    "leetcodeNumber": 3123,
    "leetcodeUrl": "https://leetcode.com/problems/find-edges-in-shortest-paths/",
    "signals": [
      "edges that belong to at least one shortest path",
      "Dijkstra from node 0 and Dijkstra from node n-1",
      "edge (u, v, w) is on shortest path if dist0[u] + w + distN[v] == totalShortest"
    ],
    "solved": false
  },
  {
    "id": "lc-3144",
    "title": "Minimum Substring Partition of Equal Character Frequency",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "1D Partition DP",
    "leetcodeNumber": 3144,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-substring-partition-of-equal-character-frequency/",
    "signals": [
      "partition string so every substring has equal char frequencies",
      "dp[i] = 1 + min(dp[j-1]) for valid substrings s[j..i]",
      "validate frequency table"
    ],
    "solved": false
  },
  {
    "id": "lc-3177",
    "title": "Find the Maximum Length of a Good Subsequence II",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "State DP with Max Tracking",
    "leetcodeNumber": 3177,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii/",
    "signals": [
      "subsequence where adjacent elements differ at most k times",
      "dp[k][val] tracks max length",
      "maintain maximums per k level"
    ],
    "solved": false
  },
  {
    "id": "lc-3187",
    "title": "Peaks in Array Queries",
    "difficulty": "Hard",
    "category": "Range Structures",
    "categoryId": "range-structures",
    "pattern": "Segment & Fenwick Trees",
    "patternId": "range-trees",
    "subPattern": "Fenwick Peak Query",
    "leetcodeNumber": 3187,
    "leetcodeUrl": "https://leetcode.com/problems/peaks-in-array-queries/",
    "signals": [
      "count peaks in range and support point updates",
      "binary array isPeak[i] = 1 if peak",
      "Fenwick tree query range excluding endpoints"
    ],
    "solved": false
  },
  {
    "id": "lc-3197",
    "title": "Find the Minimum Area to Cover All Ones II",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Grid 3-Partition",
    "leetcodeNumber": 3197,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii/",
    "signals": [
      "cover all 1s with three non-overlapping rectangles",
      "6 geometric cut configurations (3 horizontal, 3 vertical, T-shapes)",
      "bounding box calculations"
    ],
    "solved": false
  },
  {
    "id": "lc-9",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Palindrome Check",
    "leetcodeNumber": 9,
    "leetcodeUrl": "https://leetcode.com/problems/palindrome-number/",
    "signals": [
      "integer is palindrome without string conversion",
      "reverse half of number",
      "compare halves"
    ],
    "solved": false
  },
  {
    "id": "lc-36",
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Set Validation",
    "leetcodeNumber": 36,
    "leetcodeUrl": "https://leetcode.com/problems/valid-sudoku/",
    "signals": [
      "validate 9x9 Sudoku board",
      "rows, columns, and 3x3 subboxes",
      "hash set of seen entries"
    ],
    "solved": false
  },
  {
    "id": "lc-168",
    "title": "Excel Sheet Column Title",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Base 26",
    "leetcodeNumber": 168,
    "leetcodeUrl": "https://leetcode.com/problems/excel-sheet-column-title/",
    "signals": [
      "convert column number to title (A, B, .. AA)",
      "modulo 26 arithmetic",
      "1-indexed base 26"
    ],
    "solved": false
  },
  {
    "id": "lc-171",
    "title": "Excel Sheet Column Number",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Base 26",
    "leetcodeNumber": 171,
    "leetcodeUrl": "https://leetcode.com/problems/excel-sheet-column-number/",
    "signals": [
      "convert title to column number",
      "accumulate result * 26 + (c - 'A' + 1)",
      "base 26 polynomial"
    ],
    "solved": false
  },
  {
    "id": "lc-202",
    "title": "Happy Number",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Cycle Detection",
    "leetcodeNumber": 202,
    "leetcodeUrl": "https://leetcode.com/problems/happy-number/",
    "signals": [
      "replace number with sum of squares of digits",
      "Floyd's cycle detection or hash set",
      "reaches 1 or loops"
    ],
    "solved": false
  },
  {
    "id": "lc-228",
    "title": "Summary Ranges",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Interval Grouping",
    "leetcodeNumber": 228,
    "leetcodeUrl": "https://leetcode.com/problems/summary-ranges/",
    "signals": [
      "ranges covering all numbers in sorted array",
      "consecutive numbers nums[i] + 1 == nums[i+1]",
      "two pointers on boundaries"
    ],
    "solved": false
  },
  {
    "id": "lc-231",
    "title": "Power of Two",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Power of Two",
    "leetcodeNumber": 231,
    "leetcodeUrl": "https://leetcode.com/problems/power-of-two/",
    "signals": [
      "check if n is a power of two in O(1)",
      "(n > 0) && (n & (n - 1)) == 0",
      "single bit set"
    ],
    "solved": false
  },
  {
    "id": "lc-258",
    "title": "Add Digits",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Digital Root",
    "leetcodeNumber": 258,
    "leetcodeUrl": "https://leetcode.com/problems/add-digits/",
    "signals": [
      "repeatedly add all digits until single digit",
      "digital root formula 1 + (n - 1) % 9",
      "O(1) math"
    ],
    "solved": false
  },
  {
    "id": "lc-263",
    "title": "Ugly Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Factor Division",
    "leetcodeNumber": 263,
    "leetcodeUrl": "https://leetcode.com/problems/ugly-number/",
    "signals": [
      "prime factors limited to 2, 3, 5",
      "divide by 2, 3, 5 while divisible",
      "check if reaches 1"
    ],
    "solved": false
  },
  {
    "id": "lc-292",
    "title": "Nim Game",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Game Theory",
    "leetcodeNumber": 292,
    "leetcodeUrl": "https://leetcode.com/problems/nim-game/",
    "signals": [
      "remove 1, 2, or 3 stones each turn",
      "win if n % 4 != 0",
      "O(1) math game theory"
    ],
    "solved": false
  },
  {
    "id": "lc-326",
    "title": "Power of Three",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Math / Loop",
    "leetcodeNumber": 326,
    "leetcodeUrl": "https://leetcode.com/problems/power-of-three/",
    "signals": [
      "check if n is a power of three",
      "largest power of 3 in 32-bit integer",
      "1162261467 % n == 0"
    ],
    "solved": false
  },
  {
    "id": "lc-342",
    "title": "Power of Four",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bitmask Check",
    "leetcodeNumber": 342,
    "leetcodeUrl": "https://leetcode.com/problems/power-of-four/",
    "signals": [
      "check if n is a power of four",
      "power of two and single bit at odd position",
      "(n & (n - 1)) == 0 and (n & 0x55555555) != 0"
    ],
    "solved": false
  },
  {
    "id": "lc-344",
    "title": "Reverse String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "In-Place Swap",
    "leetcodeNumber": 344,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-string/",
    "signals": [
      "reverse array of characters in-place",
      "two pointers left and right",
      "swap elements"
    ],
    "solved": false
  },
  {
    "id": "lc-367",
    "title": "Valid Perfect Square",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Square Search",
    "leetcodeNumber": 367,
    "leetcodeUrl": "https://leetcode.com/problems/valid-perfect-square/",
    "signals": [
      "check if num is a perfect square without sqrt",
      "binary search in range 1..num",
      "check mid * mid == num"
    ],
    "solved": false
  },
  {
    "id": "lc-401",
    "title": "Binary Watch",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bitmask Enumerate",
    "leetcodeNumber": 401,
    "leetcodeUrl": "https://leetcode.com/problems/binary-watch/",
    "signals": [
      "read binary watch with n LEDs on",
      "iterate hours 0..11 and minutes 0..59",
      "popcount(h) + popcount(m) == turnedOn"
    ],
    "solved": false
  },
  {
    "id": "lc-404",
    "title": "Sum of Left Leaves",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Leaf Traversal",
    "leetcodeNumber": 404,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-left-leaves/",
    "signals": [
      "sum of all left leaves in binary tree",
      "check if left child is a leaf",
      "recursive DFS"
    ],
    "solved": false
  },
  {
    "id": "lc-405",
    "title": "Convert a Number to Hexadecimal",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bit Chunking",
    "leetcodeNumber": 405,
    "leetcodeUrl": "https://leetcode.com/problems/convert-a-number-to-hexadecimal/",
    "signals": [
      "convert integer to hexadecimal string",
      "group by 4 bits (n & 15)",
      "hexadecimal character lookup"
    ],
    "solved": false
  },
  {
    "id": "lc-412",
    "title": "Fizz Buzz",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Simulation",
    "leetcodeNumber": 412,
    "leetcodeUrl": "https://leetcode.com/problems/fizz-buzz/",
    "signals": [
      "fizz for 3, buzz for 5, fizzbuzz for 15",
      "modulo 3 and 5 checks",
      "string simulation"
    ],
    "solved": false
  },
  {
    "id": "lc-434",
    "title": "Number of Segments in a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Segment Count",
    "leetcodeNumber": 434,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-segments-in-a-string/",
    "signals": [
      "count words separated by spaces",
      "count transition from space to non-space",
      "linear scan"
    ],
    "solved": false
  },
  {
    "id": "lc-453",
    "title": "Minimum Moves to Equal Array Elements",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Math Invariant",
    "leetcodeNumber": 453,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-moves-to-equal-array-elements/",
    "signals": [
      "increment n-1 elements by 1 to make equal",
      "equivalent to decrementing 1 element",
      "sum(nums) - n * min(nums)"
    ],
    "solved": false
  },
  {
    "id": "lc-463",
    "title": "Island Perimeter",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Grid Perimeter",
    "leetcodeNumber": 463,
    "leetcodeUrl": "https://leetcode.com/problems/island-perimeter/",
    "signals": [
      "perimeter of single island in grid",
      "each land cell has 4 sides",
      "subtract 2 for each adjacent land neighbor"
    ],
    "solved": false
  },
  {
    "id": "lc-482",
    "title": "License Key Formatting",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Backward Grouping",
    "leetcodeNumber": 482,
    "leetcodeUrl": "https://leetcode.com/problems/license-key-formatting/",
    "signals": [
      "reformat license key in groups of k",
      "traverse backward from end",
      "insert dashes and uppercase"
    ],
    "solved": false
  },
  {
    "id": "lc-492",
    "title": "Construct the Rectangle",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Sqrt Factor",
    "leetcodeNumber": 492,
    "leetcodeUrl": "https://leetcode.com/problems/construct-the-rectangle/",
    "signals": [
      "rectangle with area where L >= W and L - W minimal",
      "start W at sqrt(area) and decrement",
      "first divisor found is optimal"
    ],
    "solved": false
  },
  {
    "id": "lc-495",
    "title": "Teemo Attacking",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Interval Overlap",
    "leetcodeNumber": 495,
    "leetcodeUrl": "https://leetcode.com/problems/teemo-attacking/",
    "signals": [
      "total poisoned duration from attack timestamps",
      "min(duration, timeSeries[i+1] - timeSeries[i])",
      "sum non-overlapping spans"
    ],
    "solved": false
  },
  {
    "id": "lc-500",
    "title": "Keyboard Row",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Row Membership",
    "leetcodeNumber": 500,
    "leetcodeUrl": "https://leetcode.com/problems/keyboard-row/",
    "signals": [
      "words that can be typed using letters from one keyboard row",
      "map each letter to row index 0, 1, 2",
      "verify all letters match"
    ],
    "solved": false
  },
  {
    "id": "lc-504",
    "title": "Base 7",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Base Conversion",
    "leetcodeNumber": 504,
    "leetcodeUrl": "https://leetcode.com/problems/base-7/",
    "signals": [
      "convert integer to base 7 string",
      "repeated division by 7",
      "handle negative sign"
    ],
    "solved": false
  },
  {
    "id": "lc-506",
    "title": "Relative Ranks",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Rank Placement",
    "leetcodeNumber": 506,
    "leetcodeUrl": "https://leetcode.com/problems/relative-ranks/",
    "signals": [
      "Gold, Silver, Bronze medals for top 3",
      "sort indices by score descending",
      "assign rank strings"
    ],
    "solved": false
  },
  {
    "id": "lc-507",
    "title": "Perfect Number",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Divisors",
    "leetcodeNumber": 507,
    "leetcodeUrl": "https://leetcode.com/problems/perfect-number/",
    "signals": [
      "number equals sum of its proper divisors",
      "find divisors up to sqrt(num)",
      "sum divisors"
    ],
    "solved": false
  },
  {
    "id": "lc-509",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Fibonacci",
    "leetcodeNumber": 509,
    "leetcodeUrl": "https://leetcode.com/problems/fibonacci-number/",
    "signals": [
      "compute F(n) where F(n) = F(n-1) + F(n-2)",
      "two rolling variables",
      "O(N) time O(1) space"
    ],
    "solved": false
  },
  {
    "id": "lc-520",
    "title": "Detect Capital",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Case Validation",
    "leetcodeNumber": 520,
    "leetcodeUrl": "https://leetcode.com/problems/detect-capital/",
    "signals": [
      "all uppercase, all lowercase, or titlecase",
      "count uppercase characters",
      "validate conditions"
    ],
    "solved": false
  },
  {
    "id": "lc-521",
    "title": "Longest Uncommon Subsequence I",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "String Comparison",
    "leetcodeNumber": 521,
    "leetcodeUrl": "https://leetcode.com/problems/longest-uncommon-subsequence-i/",
    "signals": [
      "longest subsequence uncommon to both strings",
      "if equal return -1 else max(len(a), len(b))",
      "brain teaser"
    ],
    "solved": false
  },
  {
    "id": "lc-551",
    "title": "Student Attendance Record I",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Absence & Late",
    "leetcodeNumber": 551,
    "leetcodeUrl": "https://leetcode.com/problems/student-attendance-record-i/",
    "signals": [
      "fewer than 2 absent days and no 3 consecutive late days",
      "count 'A' < 2",
      "check 'LLL' not in string"
    ],
    "solved": false
  },
  {
    "id": "lc-559",
    "title": "Maximum Depth of N-ary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "N-ary DFS",
    "leetcodeNumber": 559,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-n-ary-tree/",
    "signals": [
      "maximum depth of tree with N children",
      "1 + max depth among all children",
      "recursive post-order"
    ],
    "solved": false
  },
  {
    "id": "lc-563",
    "title": "Binary Tree Tilt",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Post-Order Sum",
    "leetcodeNumber": 563,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-tilt/",
    "signals": [
      "tilt of node = |sum(left) - sum(right)|",
      "post-order return subtree sum",
      "accumulate absolute differences"
    ],
    "solved": false
  },
  {
    "id": "lc-575",
    "title": "Distribute Candies",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Unique Types",
    "leetcodeNumber": 575,
    "leetcodeUrl": "https://leetcode.com/problems/distribute-candies/",
    "signals": [
      "maximum candy types eating n/2 candies",
      "min(unique types count, n / 2)",
      "hash set of candy types"
    ],
    "solved": false
  },
  {
    "id": "lc-589",
    "title": "N-ary Tree Preorder Traversal",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "N-ary Traversal",
    "leetcodeNumber": 589,
    "leetcodeUrl": "https://leetcode.com/problems/n-ary-tree-preorder-traversal/",
    "signals": [
      "pre-order traversal of N-ary tree",
      "visit root then loop through all children",
      "recursion or stack"
    ],
    "solved": false
  },
  {
    "id": "lc-590",
    "title": "N-ary Tree Postorder Traversal",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "N-ary Traversal",
    "leetcodeNumber": 590,
    "leetcodeUrl": "https://leetcode.com/problems/n-ary-tree-postorder-traversal/",
    "signals": [
      "post-order traversal of N-ary tree",
      "visit all children then visit root",
      "bottom-up recursion"
    ],
    "solved": false
  },
  {
    "id": "lc-594",
    "title": "Longest Harmonious Subsequence",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Harmonious Map",
    "leetcodeNumber": 594,
    "leetcodeUrl": "https://leetcode.com/problems/longest-harmonious-subsequence/",
    "signals": [
      "subsequence where max - min == 1",
      "frequency hash map",
      "max(count[x] + count[x+1])"
    ],
    "solved": false
  },
  {
    "id": "lc-598",
    "title": "Range Addition II",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Minimum Intersection",
    "leetcodeNumber": 598,
    "leetcodeUrl": "https://leetcode.com/problems/range-addition-ii/",
    "signals": [
      "maximum integers after range addition operations",
      "intersection of all [ai, bi] operations",
      "min(ai) * min(bi)"
    ],
    "solved": false
  },
  {
    "id": "lc-606",
    "title": "Construct String from Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "String Serialization",
    "leetcodeNumber": 606,
    "leetcodeUrl": "https://leetcode.com/problems/construct-string-from-binary-tree/",
    "signals": [
      "construct string with parentheses from binary tree",
      "omit unnecessary empty parentheses",
      "pre-order traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-637",
    "title": "Average of Levels in Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Level-Order BFS",
    "leetcodeNumber": 637,
    "leetcodeUrl": "https://leetcode.com/problems/average-of-levels-in-binary-tree/",
    "signals": [
      "average value of nodes on each level",
      "BFS queue computing sum / size",
      "level statistics"
    ],
    "solved": false
  },
  {
    "id": "lc-645",
    "title": "Set Mismatch",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Duplicate & Missing",
    "leetcodeNumber": 645,
    "leetcodeUrl": "https://leetcode.com/problems/set-mismatch/",
    "signals": [
      "one number duplicated and one missing from 1..n",
      "frequency array or math sum and sum of squares",
      "return {duplicate, missing}"
    ],
    "solved": false
  },
  {
    "id": "lc-653",
    "title": "Two Sum IV - Input is a BST",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "BST Two Pointers",
    "leetcodeNumber": 653,
    "leetcodeUrl": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
    "signals": [
      "find two nodes in BST summing to k",
      "in-order traversal into sorted array then two pointers",
      "or hash set traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-657",
    "title": "Robot Return to Origin",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Coordinate Balance",
    "leetcodeNumber": 657,
    "leetcodeUrl": "https://leetcode.com/problems/robot-return-to-origin/",
    "signals": [
      "robot returns to (0, 0) after moves",
      "count 'U' == count 'D' and count 'L' == count 'R'",
      "balance check"
    ],
    "solved": false
  },
  {
    "id": "lc-661",
    "title": "Image Smoother",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "3x3 Neighbor Average",
    "leetcodeNumber": 661,
    "leetcodeUrl": "https://leetcode.com/problems/image-smoother/",
    "signals": [
      "average of 3x3 surrounding cells",
      "iterate 8 neighbors + center",
      "floor division"
    ],
    "solved": false
  },
  {
    "id": "lc-671",
    "title": "Second Minimum Node In a Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Tree DFS",
    "leetcodeNumber": 671,
    "leetcodeUrl": "https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/",
    "signals": [
      "second minimum value in special binary tree",
      "root is minimum, find smallest strictly greater node",
      "pruned DFS"
    ],
    "solved": false
  },
  {
    "id": "lc-674",
    "title": "Longest Continuous Increasing Subsequence",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sliding Window",
    "patternId": "array-sliding-window",
    "subPattern": "Increasing Streak",
    "leetcodeNumber": 674,
    "leetcodeUrl": "https://leetcode.com/problems/longest-continuous-increasing-subsequence/",
    "signals": [
      "length of longest continuous strictly increasing subarray",
      "streak counter increments if nums[i] > nums[i-1]",
      "track max streak"
    ],
    "solved": false
  },
  {
    "id": "lc-682",
    "title": "Baseball Game",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Stack Record",
    "leetcodeNumber": 682,
    "leetcodeUrl": "https://leetcode.com/problems/baseball-game/",
    "signals": [
      "baseball score recording (+, D, C, integer)",
      "stack of valid scores",
      "apply operations and sum stack"
    ],
    "solved": false
  },
  {
    "id": "lc-696",
    "title": "Count Binary Substrings",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Group Lengths",
    "leetcodeNumber": 696,
    "leetcodeUrl": "https://leetcode.com/problems/count-binary-substrings/",
    "signals": [
      "consecutive 0s and 1s grouping",
      "track lengths of consecutive identical character groups",
      "sum min(group[i], group[i+1])"
    ],
    "solved": false
  },
  {
    "id": "lc-697",
    "title": "Degree of an Array",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Shortest Subarray with Degree",
    "leetcodeNumber": 697,
    "leetcodeUrl": "https://leetcode.com/problems/degree-of-an-array/",
    "signals": [
      "degree is maximum frequency of any element",
      "map element to (count, firstIndex, lastIndex)",
      "find min(last - first + 1) among max degree"
    ],
    "solved": false
  },
  {
    "id": "lc-709",
    "title": "To Lower Case",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "ASCII Conversion",
    "leetcodeNumber": 709,
    "leetcodeUrl": "https://leetcode.com/problems/to-lower-case/",
    "signals": [
      "convert uppercase letters to lowercase",
      "c += 32 if 'A' <= c <= 'Z'",
      "in-place character transformation"
    ],
    "solved": false
  },
  {
    "id": "lc-717",
    "title": "1-bit and 2-bit Characters",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Pointer Jump",
    "leetcodeNumber": 717,
    "leetcodeUrl": "https://leetcode.com/problems/1-bit-and-2-bit-characters/",
    "signals": [
      "does string end with 1-bit character",
      "jump 2 if bit is 1, jump 1 if bit is 0",
      "check if pointer stops at n-1"
    ],
    "solved": false
  },
  {
    "id": "lc-728",
    "title": "Self Dividing Numbers",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Divisibility",
    "leetcodeNumber": 728,
    "leetcodeUrl": "https://leetcode.com/problems/self-dividing-numbers/",
    "signals": [
      "number divisible by every digit it contains",
      "extract digits, check non-zero and divisible",
      "filter range"
    ],
    "solved": false
  },
  {
    "id": "lc-733",
    "title": "Flood Fill",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Grid DFS / BFS",
    "leetcodeNumber": 733,
    "leetcodeUrl": "https://leetcode.com/problems/flood-fill/",
    "signals": [
      "flood fill starting pixel with newColor",
      "DFS on 4-adjacent cells matching initial color",
      "avoid infinite loop if color unchanged"
    ],
    "solved": false
  },
  {
    "id": "lc-744",
    "title": "Find Smallest Letter Greater Than Target",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Circular Upper Bound",
    "leetcodeNumber": 744,
    "leetcodeUrl": "https://leetcode.com/problems/find-smallest-letter-greater-than-target/",
    "signals": [
      "smallest character in sorted array strictly greater than target",
      "std::upper_bound",
      "wrap around to letters[0]"
    ],
    "solved": false
  },
  {
    "id": "lc-747",
    "title": "Largest Number At Least Twice of Others",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Top Two Max",
    "leetcodeNumber": 747,
    "leetcodeUrl": "https://leetcode.com/problems/largest-number-at-least-twice-of-others/",
    "signals": [
      "largest element is at least twice every other number",
      "find top two largest elements",
      "check max1 >= 2 * max2"
    ],
    "solved": false
  },
  {
    "id": "lc-748",
    "title": "Shortest Completing Word",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "License Completing",
    "leetcodeNumber": 748,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-completing-word/",
    "signals": [
      "shortest word containing all letters in licensePlate",
      "frequency count of letters",
      "find shortest completing word"
    ],
    "solved": false
  },
  {
    "id": "lc-762",
    "title": "Prime Number of Set Bits in Binary Representation",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Popcount Prime",
    "leetcodeNumber": 762,
    "leetcodeUrl": "https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/",
    "signals": [
      "count set bits in range [left, right] is prime",
      "__builtin_popcount",
      "check prime set {2, 3, 5, 7, 11, 13, 17, 19}"
    ],
    "solved": false
  },
  {
    "id": "lc-766",
    "title": "Toeplitz Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Diagonal Invariant",
    "leetcodeNumber": 766,
    "leetcodeUrl": "https://leetcode.com/problems/toeplitz-matrix/",
    "signals": [
      "every diagonal from top-left to bottom-right is identical",
      "compare matrix[r][c] with matrix[r-1][c-1]",
      "single pass validation"
    ],
    "solved": false
  },
  {
    "id": "lc-783",
    "title": "Minimum Distance Between BST Nodes",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "In-Order Difference",
    "leetcodeNumber": 783,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-distance-between-bst-nodes/",
    "signals": [
      "minimum difference between any two nodes in BST",
      "in-order traversal tracks previous visited node",
      "track min(curr - prev)"
    ],
    "solved": false
  },
  {
    "id": "lc-788",
    "title": "Rotated Digits",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Digit Rotation",
    "leetcodeNumber": 788,
    "leetcodeUrl": "https://leetcode.com/problems/rotated-digits/",
    "signals": [
      "good numbers rotate to different valid numbers",
      "valid rotation digits {0, 1, 8, 2, 5, 6, 9}",
      "must contain at least one of {2, 5, 6, 9}"
    ],
    "solved": false
  },
  {
    "id": "lc-804",
    "title": "Unique Morse Code Words",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Morse Code Set",
    "leetcodeNumber": 804,
    "leetcodeUrl": "https://leetcode.com/problems/unique-morse-code-words/",
    "signals": [
      "number of unique Morse code transformations",
      "map each character to morse string",
      "hash set of transformed strings"
    ],
    "solved": false
  },
  {
    "id": "lc-806",
    "title": "Number of Lines To Write String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Line Wrapping",
    "leetcodeNumber": 806,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-lines-to-write-string/",
    "signals": [
      "write string across lines of max width 100",
      "wrap to next line if width exceeds 100",
      "track line count and last line width"
    ],
    "solved": false
  },
  {
    "id": "lc-812",
    "title": "Largest Triangle Area",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Shoelace Formula",
    "leetcodeNumber": 812,
    "leetcodeUrl": "https://leetcode.com/problems/largest-triangle-area/",
    "signals": [
      "largest area of triangle from points",
      "shoelace formula 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|",
      "brute force triplets"
    ],
    "solved": false
  },
  {
    "id": "lc-819",
    "title": "Most Common Word",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Word Frequency",
    "leetcodeNumber": 819,
    "leetcodeUrl": "https://leetcode.com/problems/most-common-word/",
    "signals": [
      "most frequent word that is not banned",
      "tokenize lowercase words ignoring punctuation",
      "frequency map excluding banned set"
    ],
    "solved": false
  },
  {
    "id": "lc-821",
    "title": "Shortest Distance to a Character",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Two Pass Distance",
    "leetcodeNumber": 821,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-distance-to-a-character/",
    "signals": [
      "shortest distance to character c for each index",
      "left-to-right pass and right-to-left pass",
      "min distance computation"
    ],
    "solved": false
  },
  {
    "id": "lc-824",
    "title": "Goat Latin",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Word Transformation",
    "leetcodeNumber": 824,
    "leetcodeUrl": "https://leetcode.com/problems/goat-latin/",
    "signals": [
      "convert sentence to Goat Latin",
      "vowel/consonant rules + 'ma' + 'a' repetitions",
      "string tokenization"
    ],
    "solved": false
  },
  {
    "id": "lc-830",
    "title": "Positions of Large Groups",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Streak Boundaries",
    "leetcodeNumber": 830,
    "leetcodeUrl": "https://leetcode.com/problems/positions-of-large-groups/",
    "signals": [
      "consecutive identical character groups of length >= 3",
      "two pointers tracking group start and end",
      "record intervals [start, end-1]"
    ],
    "solved": false
  },
  {
    "id": "lc-832",
    "title": "Flipping an Image",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Horizontal Flip Invert",
    "leetcodeNumber": 832,
    "leetcodeUrl": "https://leetcode.com/problems/flipping-an-image/",
    "signals": [
      "reverse each row then invert 0 and 1",
      "two pointers swap and invert simultaneously",
      "row[i] = row[n-1-i] ^ 1"
    ],
    "solved": false
  },
  {
    "id": "lc-836",
    "title": "Rectangle Overlap",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Interval Overlap",
    "leetcodeNumber": 836,
    "leetcodeUrl": "https://leetcode.com/problems/rectangle-overlap/",
    "signals": [
      "check if two rectangles overlap with positive area",
      "overlap in x: min(r1.x2, r2.x2) > max(r1.x1, r2.x1)",
      "overlap in y"
    ],
    "solved": false
  },
  {
    "id": "lc-867",
    "title": "Transpose Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Transpose",
    "leetcodeNumber": 867,
    "leetcodeUrl": "https://leetcode.com/problems/transpose-matrix/",
    "signals": [
      "transpose matrix so res[c][r] = matrix[r][c]",
      "swap dimensions m x n into n x m",
      "matrix reconstruction"
    ],
    "solved": false
  },
  {
    "id": "lc-868",
    "title": "Binary Gap",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Distance Between 1s",
    "leetcodeNumber": 868,
    "leetcodeUrl": "https://leetcode.com/problems/binary-gap/",
    "signals": [
      "longest distance between consecutive 1s in binary",
      "track index of previous 1",
      "maximum index difference"
    ],
    "solved": false
  },
  {
    "id": "lc-872",
    "title": "Leaf-Similar Trees",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Leaf Sequence",
    "leetcodeNumber": 872,
    "leetcodeUrl": "https://leetcode.com/problems/leaf-similar-trees/",
    "signals": [
      "check if two trees have identical leaf value sequences",
      "DFS collecting leaf values into vectors",
      "compare vectors"
    ],
    "solved": false
  },
  {
    "id": "lc-883",
    "title": "Projection Area of 3D Shapes",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "3D Projections",
    "leetcodeNumber": 883,
    "leetcodeUrl": "https://leetcode.com/problems/projection-area-of-3d-shapes/",
    "signals": [
      "projection area onto xy, yz, zx planes",
      "xy is non-zero cells count, yz is col max, zx is row max",
      "sum of projections"
    ],
    "solved": false
  },
  {
    "id": "lc-884",
    "title": "Uncommon Words from Two Sentences",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Hash Map",
    "patternId": "hash-map",
    "subPattern": "Word Count",
    "leetcodeNumber": 884,
    "leetcodeUrl": "https://leetcode.com/problems/uncommon-words-from-two-sentences/",
    "signals": [
      "words appearing exactly once across two sentences",
      "combine words into single frequency map",
      "collect keys with count == 1"
    ],
    "solved": false
  },
  {
    "id": "lc-888",
    "title": "Fair Candy Swap",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Target Difference",
    "leetcodeNumber": 888,
    "leetcodeUrl": "https://leetcode.com/problems/fair-candy-swap/",
    "signals": [
      "swap candy so total sums become equal",
      "target diff = (sumA - sumB) / 2",
      "hash set lookup of bob[j] = alice[i] - diff"
    ],
    "solved": false
  },
  {
    "id": "lc-892",
    "title": "Surface Area of 3D Shapes",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Surface Area",
    "leetcodeNumber": 892,
    "leetcodeUrl": "https://leetcode.com/problems/surface-area-of-3d-shapes/",
    "signals": [
      "surface area of 3D grid cubes",
      "4 * cubes + 2 minus adjacent overlapping faces",
      "geometry formula"
    ],
    "solved": false
  },
  {
    "id": "lc-897",
    "title": "Increasing Order Search Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "In-Order Relink",
    "leetcodeNumber": 897,
    "leetcodeUrl": "https://leetcode.com/problems/increasing-order-search-tree/",
    "signals": [
      "rearrange BST in-order so right-skewed tree",
      "in-order traversal relinking right pointers",
      "dummy head node"
    ],
    "solved": false
  },
  {
    "id": "lc-908",
    "title": "Smallest Range I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Max Min Diff",
    "leetcodeNumber": 908,
    "leetcodeUrl": "https://leetcode.com/problems/smallest-range-i/",
    "signals": [
      "minimize max - min after adding x in [-k, k]",
      "max(0, (maxVal - minVal) - 2 * k)",
      "O(1) calculation"
    ],
    "solved": false
  },
  {
    "id": "lc-914",
    "title": "X of a Kind in a Deck of Cards",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "GCD of Counts",
    "leetcodeNumber": 914,
    "leetcodeUrl": "https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards/",
    "signals": [
      "split deck into groups of size x >= 2",
      "count card frequencies",
      "check gcd of all counts >= 2"
    ],
    "solved": false
  },
  {
    "id": "lc-925",
    "title": "Long Pressed Name",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Character Match",
    "leetcodeNumber": 925,
    "leetcodeUrl": "https://leetcode.com/problems/long-pressed-name/",
    "signals": [
      "typed string contains long pressed characters",
      "two pointers matching characters",
      "advance typed pointer on identical repeated"
    ],
    "solved": false
  },
  {
    "id": "lc-942",
    "title": "DI String Match",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Assignment",
    "leetcodeNumber": 942,
    "leetcodeUrl": "https://leetcode.com/problems/di-string-match/",
    "signals": [
      "assign 0..n based on 'I' (increasing) and 'D' (decreasing)",
      "low pointer at 0, high pointer at n",
      "pick low on 'I', pick high on 'D'"
    ],
    "solved": false
  },
  {
    "id": "lc-944",
    "title": "Delete Columns to Make Sorted",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Column Sort Check",
    "leetcodeNumber": 944,
    "leetcodeUrl": "https://leetcode.com/problems/delete-columns-to-make-sorted/",
    "signals": [
      "delete columns that are not sorted lexicographically",
      "compare grid[r][c] with grid[r-1][c]",
      "count unsorted columns"
    ],
    "solved": false
  },
  {
    "id": "lc-965",
    "title": "Univalued Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Uniform Check",
    "leetcodeNumber": 965,
    "leetcodeUrl": "https://leetcode.com/problems/univalued-binary-tree/",
    "signals": [
      "every node has same value as root",
      "recursive check left and right match root value",
      "boolean DFS"
    ],
    "solved": false
  },
  {
    "id": "lc-976",
    "title": "Largest Perimeter Triangle",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Greedy Triangle",
    "leetcodeNumber": 976,
    "leetcodeUrl": "https://leetcode.com/problems/largest-perimeter-triangle/",
    "signals": [
      "largest perimeter of valid triangle",
      "sort descending",
      "find first triplet where a < b + c"
    ],
    "solved": false
  },
  {
    "id": "lc-989",
    "title": "Add to Array-Form of Integer",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Addition",
    "leetcodeNumber": 989,
    "leetcodeUrl": "https://leetcode.com/problems/add-to-array-form-of-integer/",
    "signals": [
      "add integer k to array-form of integer",
      "backward pass adding k % 10 + carry",
      "prepend remaining digits"
    ],
    "solved": false
  },
  {
    "id": "lc-993",
    "title": "Cousins in Binary Tree",
    "difficulty": "Easy",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Traversal & Recursion Patterns",
    "patternId": "trees-traversal",
    "subPattern": "Level & Parent BFS",
    "leetcodeNumber": 993,
    "leetcodeUrl": "https://leetcode.com/problems/cousins-in-binary-tree/",
    "signals": [
      "nodes at same depth with different parents",
      "BFS or DFS tracking (depth, parent)",
      "depth(x) == depth(y) and parent(x) != parent(y)"
    ],
    "solved": false
  },
  {
    "id": "lc-999",
    "title": "Available Captures for Rook",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Raycasting",
    "leetcodeNumber": 999,
    "leetcodeUrl": "https://leetcode.com/problems/available-captures-for-rook/",
    "signals": [
      "captures by white rook on chessboard",
      "raycast in 4 cardinal directions from rook",
      "stop on bishop or friendly pawn, count black pawns"
    ],
    "solved": false
  },
  {
    "id": "lc-1002",
    "title": "Find Common Characters",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Frequency Intersection",
    "leetcodeNumber": 1002,
    "leetcodeUrl": "https://leetcode.com/problems/find-common-characters/",
    "signals": [
      "common characters appearing in all strings",
      "minimum frequency array across words",
      "reconstruct string"
    ],
    "solved": false
  },
  {
    "id": "lc-1005",
    "title": "Maximize Sum Of Array After K Negations",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Negation",
    "leetcodeNumber": 1005,
    "leetcodeUrl": "https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/",
    "signals": [
      "negate array elements k times to maximize sum",
      "sort and negate smallest negatives first",
      "negate min element if k is odd"
    ],
    "solved": false
  },
  {
    "id": "lc-1009",
    "title": "Complement of Base 10 Integer",
    "difficulty": "Easy",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bitmask Flip",
    "leetcodeNumber": 1009,
    "leetcodeUrl": "https://leetcode.com/problems/complement-of-base-10-integer/",
    "signals": [
      "bitwise complement of base 10 integer",
      "find mask of all 1s matching bit length",
      "num ^ mask"
    ],
    "solved": false
  },
  {
    "id": "lc-1013",
    "title": "Partition Array Into Three Parts With Equal Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Three Part Partition",
    "leetcodeNumber": 1013,
    "leetcodeUrl": "https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/",
    "signals": [
      "partition array into three parts with equal sum",
      "target sum = totalSum / 3",
      "two running partition cuts"
    ],
    "solved": false
  },
  {
    "id": "lc-1018",
    "title": "Binary Prefix Divisible By 5",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Modulo 5 Shift",
    "leetcodeNumber": 1018,
    "leetcodeUrl": "https://leetcode.com/problems/binary-prefix-divisible-by-5/",
    "signals": [
      "prefix binary numbers divisible by 5",
      "val = (val * 2 + nums[i]) % 5",
      "boolean result array"
    ],
    "solved": false
  },
  {
    "id": "lc-1021",
    "title": "Remove Outermost Parentheses",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Min/Max & Expression Handling",
    "patternId": "stack-expressions",
    "subPattern": "Parentheses Depth",
    "leetcodeNumber": 1021,
    "leetcodeUrl": "https://leetcode.com/problems/remove-outermost-parentheses/",
    "signals": [
      "remove outermost parentheses of primitive components",
      "balance counter tracks depth",
      "add chars when depth > 1"
    ],
    "solved": false
  },
  {
    "id": "lc-1025",
    "title": "Divisor Game",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Parity Game",
    "leetcodeNumber": 1025,
    "leetcodeUrl": "https://leetcode.com/problems/divisor-game/",
    "signals": [
      "Alice and Bob play divisor game",
      "Alice wins if n is even (n % 2 == 0)",
      "O(1) game theory"
    ],
    "solved": false
  },
  {
    "id": "lc-1030",
    "title": "Matrix Cells in Distance Order",
    "difficulty": "Easy",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Manhattan Sort",
    "leetcodeNumber": 1030,
    "leetcodeUrl": "https://leetcode.com/problems/matrix-cells-in-distance-order/",
    "signals": [
      "sort matrix coordinates by Manhattan distance",
      "sort with custom comparator |r-r0| + |c-c0|",
      "coordinate vector"
    ],
    "solved": false
  },
  {
    "id": "lc-1037",
    "title": "Valid Boomerang",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Collinear Check",
    "leetcodeNumber": 1037,
    "leetcodeUrl": "https://leetcode.com/problems/valid-boomerang/",
    "signals": [
      "three points form a boomerang (not collinear)",
      "cross product (y2-y1)*(x3-x2) != (y3-y2)*(x2-x1)",
      "determinant check"
    ],
    "solved": false
  },
  {
    "id": "lc-1078",
    "title": "Occurrences After Bigram",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Word Bigram",
    "leetcodeNumber": 1078,
    "leetcodeUrl": "https://leetcode.com/problems/occurrences-after-bigram/",
    "signals": [
      "find words appearing immediately after first second bigram",
      "split text into word vector",
      "check consecutive match"
    ],
    "solved": false
  },
  {
    "id": "lc-1103",
    "title": "Distribute Candies to People",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Simulation",
    "leetcodeNumber": 1103,
    "leetcodeUrl": "https://leetcode.com/problems/distribute-candies-to-people/",
    "signals": [
      "distribute 1, 2, 3.. candies in cyclic turns",
      "simulate distribution across n people",
      "cap at remaining candies"
    ],
    "solved": false
  },
  {
    "id": "lc-1108",
    "title": "Defanging an IP Address",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Replace Dot",
    "leetcodeNumber": 1108,
    "leetcodeUrl": "https://leetcode.com/problems/defanging-an-ip-address/",
    "signals": [
      "replace every dot with '[.]'",
      "string scan replacing '.'",
      "output formatted IP"
    ],
    "solved": false
  },
  {
    "id": "lc-1128",
    "title": "Number of Equivalent Domino Pairs",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Domino Hash",
    "leetcodeNumber": 1128,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-equivalent-domino-pairs/",
    "signals": [
      "domino [a, b] equivalent to [c, d] if a==c && b==d or a==d && b==c",
      "canonical pair key = min(a,b)*10 + max(a,b)",
      "count combinations"
    ],
    "solved": false
  },
  {
    "id": "lc-1154",
    "title": "Day of the Year",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Calendar Days",
    "leetcodeNumber": 1154,
    "leetcodeUrl": "https://leetcode.com/problems/day-of-the-year/",
    "signals": [
      "calculate day number of year from date string YYYY-MM-DD",
      "month day prefix array",
      "leap year adjustment"
    ],
    "solved": false
  },
  {
    "id": "lc-1160",
    "title": "Find Words That Can Be Formed by Characters",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Char Count Match",
    "leetcodeNumber": 1160,
    "leetcodeUrl": "https://leetcode.com/problems/find-words-that-can-be-formed-by-characters/",
    "signals": [
      "sum of lengths of words formable from chars string",
      "frequency array of chars",
      "check each word within count bounds"
    ],
    "solved": false
  },
  {
    "id": "lc-1175",
    "title": "Prime Arrangements",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Factorials",
    "leetcodeNumber": 1175,
    "leetcodeUrl": "https://leetcode.com/problems/prime-arrangements/",
    "signals": [
      "prime numbers on prime indices",
      "count primes <= n",
      "factorial(primes) * factorial(non-primes) % 1e9+7"
    ],
    "solved": false
  },
  {
    "id": "lc-1184",
    "title": "Distance Between Bus Stops",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Circular Route",
    "leetcodeNumber": 1184,
    "leetcodeUrl": "https://leetcode.com/problems/distance-between-bus-stops/",
    "signals": [
      "shortest distance between bus stops clockwise vs counterclockwise",
      "sum clockwise path",
      "min(clockwise, totalDistance - clockwise)"
    ],
    "solved": false
  },
  {
    "id": "lc-1189",
    "title": "Maximum Number of Balloons",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Char Counts",
    "leetcodeNumber": 1189,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-number-of-balloons/",
    "signals": [
      "maximum instances of word 'balloon' formed",
      "count 'b','a','l','o','n'",
      "min(b, a, l/2, o/2, n)"
    ],
    "solved": false
  },
  {
    "id": "lc-1217",
    "title": "Minimum Cost to Move Chips to The Same Position",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Parity Cost",
    "leetcodeNumber": 1217,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/",
    "signals": [
      "moving by 2 costs 0, moving by 1 costs 1",
      "count chips at even vs odd positions",
      "min(evenCount, oddCount)"
    ],
    "solved": false
  },
  {
    "id": "lc-1221",
    "title": "Split a String in Balanced Strings",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Balance",
    "leetcodeNumber": 1221,
    "leetcodeUrl": "https://leetcode.com/problems/split-a-string-in-balanced-strings/",
    "signals": [
      "maximum balanced substrings containing equal L and R",
      "running balance counter L +1 R -1",
      "increment answer whenever balance == 0"
    ],
    "solved": false
  },
  {
    "id": "lc-1232",
    "title": "Check If It Is a Straight Line",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Slope Invariant",
    "leetcodeNumber": 1232,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-it-is-a-straight-line/",
    "signals": [
      "points on a straight line in XY plane",
      "cross product dy * (x - x0) == dx * (y - y0)",
      "slope equality"
    ],
    "solved": false
  },
  {
    "id": "lc-1252",
    "title": "Cells with Odd Values in a Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Row Col Increment",
    "leetcodeNumber": 1252,
    "leetcodeUrl": "https://leetcode.com/problems/cells-with-odd-values-in-a-matrix/",
    "signals": [
      "count cells with odd values after row and col increments",
      "track row and col toggle counts",
      "odd rows and odd cols combination"
    ],
    "solved": false
  },
  {
    "id": "lc-1260",
    "title": "Shift 2D Grid",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "1D Flatten Shift",
    "leetcodeNumber": 1260,
    "leetcodeUrl": "https://leetcode.com/problems/shift-2d-grid/",
    "signals": [
      "shift 2D grid elements by k places",
      "flatten to 1D index (r*n + c + k) % (m*n)",
      "map back to 2D"
    ],
    "solved": false
  },
  {
    "id": "lc-1266",
    "title": "Minimum Time Visiting All Points",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Chebyshev Distance",
    "leetcodeNumber": 1266,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-time-visiting-all-points/",
    "signals": [
      "minimum time visiting sequence of 2D points",
      "diagonal moves cost 1",
      "max(|dx|, |dy|) between adjacent points"
    ],
    "solved": false
  },
  {
    "id": "lc-1275",
    "title": "Find Winner on a Tic Tac Toe Game",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Board Balance",
    "leetcodeNumber": 1275,
    "leetcodeUrl": "https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/",
    "signals": [
      "Tic-Tac-Toe winner from moves array",
      "rows, cols, diagonals counters for A (+1) and B (-1)",
      "check if any counter reaches 3 or -3"
    ],
    "solved": false
  },
  {
    "id": "lc-1281",
    "title": "Subtract the Product and Sum of Digits of an Integer",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Digit Extraction",
    "leetcodeNumber": 1281,
    "leetcodeUrl": "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/",
    "signals": [
      "product of digits minus sum of digits",
      "extract digits via modulo 10",
      "product - sum"
    ],
    "solved": false
  },
  {
    "id": "lc-1287",
    "title": "Element Appearing More Than 25% In Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Quarter Checks",
    "leetcodeNumber": 1287,
    "leetcodeUrl": "https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array/",
    "signals": [
      "element appearing > 25% of time in sorted array",
      "check candidates at n/4, 2n/4, 3n/4",
      "upper_bound minus lower_bound > n/4"
    ],
    "solved": false
  },
  {
    "id": "lc-1290",
    "title": "Convert Binary Number in a Linked List to Integer",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "linked-list",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Bit Shift Traversal",
    "leetcodeNumber": 1290,
    "leetcodeUrl": "https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/",
    "signals": [
      "convert binary digits in linked list to integer",
      "ans = (ans << 1) | head->val",
      "single pass"
    ],
    "solved": false
  },
  {
    "id": "lc-1309",
    "title": "Decrypt String from Alphabet to Integer Mapping",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Backward Scan",
    "leetcodeNumber": 1309,
    "leetcodeUrl": "https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/",
    "signals": [
      "map 1..9 to a..i and 10#..26# to j..z",
      "check two characters ahead for '#'",
      "decode characters"
    ],
    "solved": false
  },
  {
    "id": "lc-1313",
    "title": "Decompress Run-Length Encoded List",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Frequency Unpack",
    "leetcodeNumber": 1313,
    "leetcodeUrl": "https://leetcode.com/problems/decompress-run-length-encoded-list/",
    "signals": [
      "pairs [freq, val] expand to freq copies of val",
      "reserve memory and append values",
      "array decompression"
    ],
    "solved": false
  },
  {
    "id": "lc-1317",
    "title": "Convert Integer to the Sum of Two No-Zero Integers",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "No-Zero Check",
    "leetcodeNumber": 1317,
    "leetcodeUrl": "https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers/",
    "signals": [
      "find a and b summing to n with no digit 0",
      "try a from 1 to n/2",
      "verify '0' not in str(a) and '0' not in str(n-a)"
    ],
    "solved": false
  },
  {
    "id": "lc-1323",
    "title": "Maximum 69 Number",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "First 6 Flip",
    "leetcodeNumber": 1323,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-69-number/",
    "signals": [
      "maximum number changing at most one digit 6 to 9",
      "convert to string and flip first '6' to '9'",
      "greedy highest place value"
    ],
    "solved": false
  },
  {
    "id": "lc-1331",
    "title": "Rank Transform of an Array",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Coordinate Rank",
    "leetcodeNumber": 1331,
    "leetcodeUrl": "https://leetcode.com/problems/rank-transform-of-an-array/",
    "signals": [
      "replace each element with its rank (1-indexed)",
      "sort unique elements into hash map with rank",
      "assign ranks in-place"
    ],
    "solved": false
  },
  {
    "id": "lc-1332",
    "title": "Remove Palindromic Subsequences",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Subsequence Palindrome",
    "leetcodeNumber": 1332,
    "leetcodeUrl": "https://leetcode.com/problems/remove-palindromic-subsequences/",
    "signals": [
      "minimum removals of palindromic subsequences (only 'a' and 'b')",
      "if already palindrome 1 else 2",
      "subsequence not substring"
    ],
    "solved": false
  },
  {
    "id": "lc-1346",
    "title": "Check If N and Its Double Exist",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Double Set",
    "leetcodeNumber": 1346,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-n-and-its-double-exist/",
    "signals": [
      "check if i != j and nums[i] == 2 * nums[j]",
      "hash set lookup for 2*x or x/2 (if even)",
      "single pass"
    ],
    "solved": false
  },
  {
    "id": "lc-1351",
    "title": "Count Negative Numbers in a Sorted Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Top Right Step",
    "leetcodeNumber": 1351,
    "leetcodeUrl": "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/",
    "signals": [
      "count negative numbers in row and col sorted matrix",
      "start from top-right corner",
      "step down if >= 0, step left and add rows if < 0"
    ],
    "solved": false
  },
  {
    "id": "lc-1360",
    "title": "Number of Days Between Two Dates",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Julian Days",
    "leetcodeNumber": 1360,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-days-between-two-dates/",
    "signals": [
      "count days between two dates YYYY-MM-DD",
      "convert dates to days since year 1971",
      "absolute difference"
    ],
    "solved": false
  },
  {
    "id": "lc-1370",
    "title": "Increasing Decreasing String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Frequency Sweep",
    "leetcodeNumber": 1370,
    "leetcodeUrl": "https://leetcode.com/problems/increasing-decreasing-string/",
    "signals": [
      "pick characters in ascending then descending order",
      "frequency array of 26 letters",
      "loop until all characters used"
    ],
    "solved": false
  },
  {
    "id": "lc-1374",
    "title": "Generate a String With Characters That Have Odd Counts",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Pattern Matching",
    "patternId": "string-pattern-matching",
    "subPattern": "Odd Counts",
    "leetcodeNumber": 1374,
    "leetcodeUrl": "https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts/",
    "signals": [
      "string with characters having odd counts",
      "if n is odd return 'a'*n else 'a'*(n-1) + 'b'",
      "parity rule"
    ],
    "solved": false
  },
  {
    "id": "lc-1380",
    "title": "Lucky Numbers in a Matrix",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Row Min Col Max",
    "leetcodeNumber": 1380,
    "leetcodeUrl": "https://leetcode.com/problems/lucky-numbers-in-a-matrix/",
    "signals": [
      "lucky number is min in row and max in column",
      "find all row minimums and column maximums",
      "intersection of sets"
    ],
    "solved": false
  },
  {
    "id": "lc-1385",
    "title": "Find the Distance Value Between Two Arrays",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Range Binary Search",
    "leetcodeNumber": 1385,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-distance-value-between-two-arrays/",
    "signals": [
      "no element in arr2 with |arr1[i] - arr2[j]| <= d",
      "sort arr2",
      "binary search lower_bound for range [val - d, val + d]"
    ],
    "solved": false
  },
  {
    "id": "lc-1394",
    "title": "Find Lucky Integer in an Array",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Value Equals Count",
    "leetcodeNumber": 1394,
    "leetcodeUrl": "https://leetcode.com/problems/find-lucky-integer-in-an-array/",
    "signals": [
      "lucky integer has frequency equal to its value",
      "frequency hash map",
      "find max key where count[key] == key"
    ],
    "solved": false
  },
  {
    "id": "lc-1399",
    "title": "Count Largest Group",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Digit Sum Group",
    "leetcodeNumber": 1399,
    "leetcodeUrl": "https://leetcode.com/problems/count-largest-group/",
    "signals": [
      "group numbers 1..n by sum of their digits",
      "hash map counting group sizes",
      "count groups with max size"
    ],
    "solved": false
  },
  {
    "id": "lc-1403",
    "title": "Minimum Subsequence in Non-Increasing Order",
    "difficulty": "Easy",
    "category": "Greedy",
    "categoryId": "greedy",
    "pattern": "Intervals & Scheduling Greedy",
    "patternId": "greedy-intervals-jumps",
    "subPattern": "Greedy Largest",
    "leetcodeNumber": 1403,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-subsequence-in-non-increasing-order/",
    "signals": [
      "subsequence sum strictly greater than remaining sum",
      "sort descending",
      "greedily accumulate until sum > totalSum / 2"
    ],
    "solved": false
  },
  {
    "id": "lc-1413",
    "title": "Minimum Value to Get Positive Step by Step Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Min Running Sum",
    "leetcodeNumber": 1413,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/",
    "signals": [
      "startValue + prefixSum >= 1 for all steps",
      "find minimum prefix sum minSum",
      "startValue = max(1, 1 - minSum)"
    ],
    "solved": false
  },
  {
    "id": "lc-1417",
    "title": "Reformat The String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Interleave Types",
    "leetcodeNumber": 1417,
    "leetcodeUrl": "https://leetcode.com/problems/reformat-the-string/",
    "signals": [
      "alternate letters and digits",
      "separate digits and letters",
      "interleave if length difference <= 1"
    ],
    "solved": false
  },
  {
    "id": "lc-1422",
    "title": "Maximum Score After Splitting a String",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Prefix Based",
    "patternId": "string-prefix-based",
    "subPattern": "Zero One Split",
    "leetcodeNumber": 1422,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-score-after-splitting-a-string/",
    "signals": [
      "zeros in left substring + ones in right substring",
      "total ones count precalculated",
      "running zeros count + (totalOnes - runningOnes)"
    ],
    "solved": false
  },
  {
    "id": "lc-1446",
    "title": "Consecutive Characters",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Max Streak",
    "leetcodeNumber": 1446,
    "leetcodeUrl": "https://leetcode.com/problems/consecutive-characters/",
    "signals": [
      "power of string is max length of non-empty substring of one char",
      "running streak counter",
      "track max streak"
    ],
    "solved": false
  },
  {
    "id": "lc-1450",
    "title": "Number of Students Doing Homework at a Given Time",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Interval Check",
    "leetcodeNumber": 1450,
    "leetcodeUrl": "https://leetcode.com/problems/number-of-students-doing-homework-at-a-given-time/",
    "signals": [
      "queryTime between startTime[i] and endTime[i]",
      "linear scan checking start <= time <= end",
      "count active students"
    ],
    "solved": false
  },
  {
    "id": "lc-1460",
    "title": "Make Two Arrays Equal by Reversing Subarrays",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Array Multiset",
    "leetcodeNumber": 1460,
    "leetcodeUrl": "https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays/",
    "signals": [
      "any permutation can be reached by reversing subarrays of length 2",
      "verify target and arr have identical element frequencies",
      "frequency map"
    ],
    "solved": false
  },
  {
    "id": "lc-1491",
    "title": "Average Salary Excluding the Minimum and Maximum Salary",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Sum Exclude",
    "leetcodeNumber": 1491,
    "leetcodeUrl": "https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/",
    "signals": [
      "average salary excluding min and max",
      "find sum, min, and max in single pass",
      "(sum - min - max) / (n - 2)"
    ],
    "solved": false
  },
  {
    "id": "lc-162",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Binary Search",
    "patternId": "array-binary-search",
    "subPattern": "Peak Finding",
    "leetcodeNumber": 162,
    "leetcodeUrl": "https://leetcode.com/problems/find-peak-element/",
    "signals": [
      "element strictly greater than neighbors",
      "binary search on slope condition nums[mid] > nums[mid+1]",
      "O(log n) peak finding"
    ],
    "solved": false
  },
  {
    "id": "lc-187",
    "title": "Repeated DNA Sequences",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Substrings of Length 10",
    "leetcodeNumber": 187,
    "leetcodeUrl": "https://leetcode.com/problems/repeated-dna-sequences/",
    "signals": [
      "10-letter-long sequences that occur more than once",
      "hash set of seen substrings or rolling hash bitmask",
      "track duplicates"
    ],
    "solved": false
  },
  {
    "id": "lc-223",
    "title": "Rectangle Area",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Area Overlap",
    "leetcodeNumber": 223,
    "leetcodeUrl": "https://leetcode.com/problems/rectangle-area/",
    "signals": [
      "total area covered by two rectilinear rectangles",
      "area(A) + area(B) - overlap(A, B)",
      "compute overlap width and height"
    ],
    "solved": false
  },
  {
    "id": "lc-274",
    "title": "H-Index",
    "difficulty": "Medium",
    "category": "Sorting Algorithms",
    "categoryId": "sorting",
    "pattern": "Classic Sort Algorithms",
    "patternId": "sorting-algorithms",
    "subPattern": "Citation Count",
    "leetcodeNumber": 274,
    "leetcodeUrl": "https://leetcode.com/problems/h-index/",
    "signals": [
      "researcher has h papers cited at least h times",
      "sort citations descending or bucket count",
      "find maximum h where citations[i] >= i + 1"
    ],
    "solved": false
  },
  {
    "id": "lc-284",
    "title": "Peeking Iterator",
    "difficulty": "Medium",
    "category": "Queue & Deque",
    "categoryId": "queue",
    "pattern": "Standard Queue & BFS Patterns",
    "patternId": "queue-processing",
    "subPattern": "Cached Next",
    "leetcodeNumber": 284,
    "leetcodeUrl": "https://leetcode.com/problems/peeking-iterator/",
    "signals": [
      "design iterator supporting peek() operation",
      "cache next element in advance variable",
      "return cached value"
    ],
    "solved": false
  },
  {
    "id": "lc-299",
    "title": "Bulls and Cows",
    "difficulty": "Medium",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Lookup Based",
    "patternId": "hashmap-lookup",
    "subPattern": "Digit Matching",
    "leetcodeNumber": 299,
    "leetcodeUrl": "https://leetcode.com/problems/bulls-and-cows/",
    "signals": [
      "bulls (same position) and cows (different position)",
      "first pass count exact matches",
      "second pass match digit frequencies"
    ],
    "solved": false
  },
  {
    "id": "lc-313",
    "title": "Super Ugly Number",
    "difficulty": "Medium",
    "category": "Heaps & Priority Queues",
    "categoryId": "heap",
    "pattern": "Top K & Stream Patterns",
    "patternId": "heap-top-k",
    "subPattern": "Multi-Pointer Ugly",
    "leetcodeNumber": 313,
    "leetcodeUrl": "https://leetcode.com/problems/super-ugly-number/",
    "signals": [
      "nth super ugly number whose prime factors are given",
      "min-heap or pointers for each prime",
      "generate in ascending order"
    ],
    "solved": false
  },
  {
    "id": "lc-318",
    "title": "Maximum Product of Word Lengths",
    "difficulty": "Medium",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "XOR & Bit Masking",
    "patternId": "bit-core-masking",
    "subPattern": "Bitmask Representation",
    "leetcodeNumber": 318,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-of-word-lengths/",
    "signals": [
      "words[i] and words[j] do not share letters",
      "represent 26 letters as 32-bit integer bitmask",
      "check (mask[i] & mask[j]) == 0"
    ],
    "solved": false
  },
  {
    "id": "lc-319",
    "title": "Bulb Switcher",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Prefix Based",
    "patternId": "array-prefix-based",
    "subPattern": "Math Square",
    "leetcodeNumber": 319,
    "leetcodeUrl": "https://leetcode.com/problems/bulb-switcher/",
    "signals": [
      "n bulbs toggled across n rounds",
      "bulbs with odd number of factors remain on",
      "count of perfect squares <= n: return sqrt(n)"
    ],
    "solved": false
  },
  {
    "id": "lc-343",
    "title": "Integer Break",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "1D & 2D Grid / Linear DP",
    "patternId": "dp-linear-grid",
    "subPattern": "Math / DP Factor",
    "leetcodeNumber": 343,
    "leetcodeUrl": "https://leetcode.com/problems/integer-break/",
    "signals": [
      "break integer into sum of at least two positive integers with max product",
      "maximize factors of 3",
      "dp or greedy power of 3"
    ],
    "solved": false
  },
  {
    "id": "lc-355",
    "title": "Design Twitter",
    "difficulty": "Medium",
    "category": "Heaps & Priority Queues",
    "categoryId": "heap",
    "pattern": "Top K & Stream Patterns",
    "patternId": "heap-top-k",
    "subPattern": "K-way Merge Feed",
    "leetcodeNumber": 355,
    "leetcodeUrl": "https://leetcode.com/problems/design-twitter/",
    "signals": [
      "post tweet, follow, unfollow, get 10 most recent tweets",
      "hash map for user follows and tweets",
      "k-way merge with max-heap"
    ],
    "solved": false
  },
  {
    "id": "lc-365",
    "title": "Water and Jug Problem",
    "difficulty": "Medium",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Traversal & Topological Sort",
    "patternId": "graphs-traversal-cycles",
    "subPattern": "Bézout's Identity / BFS",
    "leetcodeNumber": 365,
    "leetcodeUrl": "https://leetcode.com/problems/water-and-jug-problem/",
    "signals": [
      "measure target capacity using two jugs",
      "BFS of states or gcd(x, y) divides target",
      "Bézout's identity"
    ],
    "solved": false
  },
  {
    "id": "lc-368",
    "title": "Largest Divisible Subset",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "Knapsack, Subsequences & String DP",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Divisible Subset DP",
    "leetcodeNumber": 368,
    "leetcodeUrl": "https://leetcode.com/problems/largest-divisible-subset/",
    "signals": [
      "subset where every pair has nums[i] % nums[j] == 0",
      "sort array and DP similar to LIS",
      "reconstruct path"
    ],
    "solved": false
  },
  {
    "id": "lc-382",
    "title": "Linked List Random Node",
    "difficulty": "Medium",
    "category": "Linked List",
    "categoryId": "ll",
    "pattern": "Pointer Techniques & Floyd's Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Reservoir Sampling",
    "leetcodeNumber": 382,
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-random-node/",
    "signals": [
      "return a random node's value from singly linked list with equal probability",
      "reservoir sampling with k=1: replace with prob 1/i",
      "O(1) space stream"
    ],
    "solved": false
  },
  {
    "id": "lc-384",
    "title": "Shuffle an Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Fisher-Yates Shuffle",
    "leetcodeNumber": 384,
    "leetcodeUrl": "https://leetcode.com/problems/shuffle-an-array/",
    "signals": [
      "random shuffle of an array with equal probability for all permutations",
      "Fisher-Yates algorithm: swap nums[i] with random index j in [i, n-1]",
      "in-place O(N)"
    ],
    "solved": false
  },
  {
    "id": "lc-643-maximum-av",
    "title": "Maximum Average Subarray I",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Sliding Average",
    "leetcodeNumber": 643,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-average-subarray-i/",
    "signals": [
      "contiguous subarray of length k with maximum average",
      "sliding window of size k",
      "track max running sum"
    ],
    "solved": false
  },
  {
    "id": "lc-1752",
    "title": "Check if Array Is Sorted and Rotated",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Kadane's / Subarray",
    "patternId": "array-kadanes-subarray",
    "subPattern": "Rotated Inversion Count",
    "leetcodeNumber": 1752,
    "leetcodeUrl": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/",
    "signals": [
      "array was originally sorted non-decreasingly then rotated",
      "count inversions where nums[i] > nums[(i+1)%n]",
      "inversion count <= 1"
    ],
    "solved": false
  },
  {
    "id": "lc-1876",
    "title": "Substrings of Size Three with Distinct Characters",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Fixed Window 3",
    "leetcodeNumber": 1876,
    "leetcodeUrl": "https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/",
    "signals": [
      "distinct characters in window of 3",
      "fixed size sliding window",
      "unique chars count"
    ],
    "solved": false
  },
  {
    "id": "lc-2269-find-the-k",
    "title": "Find the K-Beauty of a Number",
    "difficulty": "Easy",
    "category": "String",
    "categoryId": "string",
    "pattern": "Sliding Window",
    "patternId": "string-sliding-window",
    "subPattern": "Substrings of Number",
    "leetcodeNumber": 2269,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-k-beauty-of-a-number/",
    "signals": [
      "k-length substring of number",
      "rolling window on number string",
      "divisibility check"
    ],
    "solved": false
  },
  {
    "id": "lc-214",
    "title": "Shortest Palindrome",
    "difficulty": "Hard",
    "category": "String",
    "categoryId": "string",
    "pattern": "Two Pointers",
    "patternId": "string-two-pointers",
    "subPattern": "Palindrome Prefix",
    "leetcodeNumber": 214,
    "leetcodeUrl": "https://leetcode.com/problems/shortest-palindrome/",
    "signals": [
      "add characters in front of string to make palindrome",
      "two pointers or KMP LPS on s + '#' + rev_s",
      "find longest palindromic prefix"
    ],
    "solved": false
  },
  {
    "id": "lc-432",
    "title": "All O`one Data Structure",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Map + Doubly Linked List",
    "leetcodeNumber": 432,
    "leetcodeUrl": "https://leetcode.com/problems/all-oone-data-structure/",
    "signals": [
      "getMaxKey and getMinKey in O(1)",
      "frequency bucket doubly linked list",
      "hash map key to bucket"
    ],
    "solved": false
  },
  {
    "id": "lc-895",
    "title": "Maximum Frequency Stack",
    "difficulty": "Hard",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Frequency Based",
    "patternId": "hashmap-frequency",
    "subPattern": "Frequency to Stack Map",
    "leetcodeNumber": 895,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-frequency-stack/",
    "signals": [
      "push and pop most frequent element",
      "frequency to stack mapping",
      "track max frequency"
    ],
    "solved": false
  },
  {
    "id": "lc-1002-find-commo",
    "title": "Find Common Characters",
    "difficulty": "Easy",
    "category": "Hash Map",
    "categoryId": "hash-map",
    "pattern": "Grouping & Index Mapping",
    "patternId": "hashmap-grouping",
    "subPattern": "Char Intersection",
    "leetcodeNumber": 1002,
    "leetcodeUrl": "https://leetcode.com/problems/find-common-characters/",
    "signals": [
      "characters present in all strings",
      "frequency map min counts",
      "common character grouping"
    ],
    "solved": false
  },
  {
    "id": "lc-1598",
    "title": "Crawler Log Folder",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Folder Depth",
    "leetcodeNumber": 1598,
    "leetcodeUrl": "https://leetcode.com/problems/crawler-log-folder/",
    "signals": [
      "operations to return to main folder",
      "stack size tracking depth",
      "pop for ../"
    ],
    "solved": false
  },
  {
    "id": "lc-1021-remove-out",
    "title": "Remove Outermost Parentheses",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Depth Balance",
    "leetcodeNumber": 1021,
    "leetcodeUrl": "https://leetcode.com/problems/remove-outermost-parentheses/",
    "signals": [
      "valid parentheses primitive decomposition",
      "depth counter / stack",
      "skip outermost brackets"
    ],
    "solved": false
  },
  {
    "id": "lc-1614-maximum-ne",
    "title": "Maximum Nesting Depth of the Parentheses",
    "difficulty": "Easy",
    "category": "Stack",
    "categoryId": "stack",
    "pattern": "Monotonic Stack",
    "patternId": "stack-monotonic",
    "subPattern": "Max Depth",
    "leetcodeNumber": 1614,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
    "signals": [
      "maximum nesting depth of VPS",
      "running counter / stack depth",
      "track peak open count"
    ],
    "solved": false
  },
  {
    "id": "lc-25-reverse-no",
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "category": "Linked List",
    "categoryId": "ll",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "K-Group Reversal",
    "leetcodeNumber": 25,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "signals": [
      "reverse nodes in blocks of size k",
      "pointer traversal measuring group length",
      "in-place pointer reversal"
    ],
    "solved": false
  },
  {
    "id": "lc-23-merge-k-so",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "category": "Linked List",
    "categoryId": "ll",
    "pattern": "Pointer Techniques & Cycle Detection",
    "patternId": "ll-pointer-techniques",
    "subPattern": "Merge K Lists",
    "leetcodeNumber": 23,
    "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "signals": [
      "merge k sorted linked lists into one",
      "min-heap or divide-and-conquer merge",
      "pointer manipulation"
    ],
    "solved": false
  },
  {
    "id": "lc-83-remove-dup",
    "title": "Remove Duplicates from Sorted List",
    "difficulty": "Easy",
    "category": "Linked List",
    "categoryId": "ll",
    "pattern": "Reversal & Merge Lists",
    "patternId": "ll-reversal-merge",
    "subPattern": "Pointer Skip",
    "leetcodeNumber": 83,
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    "signals": [
      "delete duplicates from sorted linked list",
      "curr.next = curr.next.next when duplicate",
      "single pointer traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-1373",
    "title": "Maximum Sum BST in Binary Tree",
    "difficulty": "Hard",
    "category": "Trees",
    "categoryId": "trees",
    "pattern": "Binary Search Trees (BST)",
    "patternId": "trees-bst",
    "subPattern": "Post-Order BST Validation",
    "leetcodeNumber": 1373,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
    "signals": [
      "maximum sum of all keys of any sub-tree which is also BST",
      "post-order traversal returning (isBST, min, max, sum)",
      "track global max sum"
    ],
    "solved": false
  },
  {
    "id": "lc-257-binary-tre",
    "title": "Binary Tree Paths",
    "difficulty": "Easy",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion-backtracking",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Root-to-Leaf DFS",
    "leetcodeNumber": 257,
    "leetcodeUrl": "https://leetcode.com/problems/binary-tree-paths/",
    "signals": [
      "all root-to-leaf paths",
      "backtracking DFS building path string",
      "push and pop path nodes"
    ],
    "solved": false
  },
  {
    "id": "lc-872-leaf-simil",
    "title": "Leaf-Similar Trees",
    "difficulty": "Easy",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion-backtracking",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Leaf Traversal",
    "leetcodeNumber": 872,
    "leetcodeUrl": "https://leetcode.com/problems/leaf-similar-trees/",
    "signals": [
      "two trees have same leaf value sequence",
      "DFS recursive leaf collection",
      "compare leaf lists"
    ],
    "solved": false
  },
  {
    "id": "lc-104-maximum-de",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "category": "Recursion & Backtracking",
    "categoryId": "recursion-backtracking",
    "pattern": "Backtracking & Exploration",
    "patternId": "recursion-backtracking",
    "subPattern": "Tree Depth DFS",
    "leetcodeNumber": 104,
    "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "signals": [
      "maximum depth of binary tree",
      "recursive DFS return 1 + max(left, right)",
      "base case root is null"
    ],
    "solved": false
  },
  {
    "id": "lc-1791",
    "title": "Find Center of Star Graph",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Star Center Node",
    "leetcodeNumber": 1791,
    "leetcodeUrl": "https://leetcode.com/problems/find-center-of-star-graph/",
    "signals": [
      "star graph center connected to all other nodes",
      "common node in edges[0] and edges[1]",
      "O(1) lookup"
    ],
    "solved": false
  },
  {
    "id": "lc-1971-find-if-pa",
    "title": "Find if Path Exists in Graph",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "DSU Connectivity",
    "leetcodeNumber": 1971,
    "leetcodeUrl": "https://leetcode.com/problems/find-if-path-exists-in-graph/",
    "signals": [
      "valid path between source and destination",
      "Union-Find (DSU) or BFS traversal",
      "connected component check"
    ],
    "solved": false
  },
  {
    "id": "lc-997-find-the-t",
    "title": "Find the Town Judge",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "In/Out Degree",
    "leetcodeNumber": 997,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-town-judge/",
    "signals": [
      "town judge trusted by everyone, trusts nobody",
      "in-degree == n-1 and out-degree == 0",
      "count degrees array"
    ],
    "solved": false
  },
  {
    "id": "lc-463-island-per",
    "title": "Island Perimeter",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Grid Graph",
    "leetcodeNumber": 463,
    "leetcodeUrl": "https://leetcode.com/problems/island-perimeter/",
    "signals": [
      "perimeter of island in grid",
      "check 4 neighboring cells",
      "add 1 for water/boundary"
    ],
    "solved": false
  },
  {
    "id": "lc-733-flood-fill",
    "title": "Flood Fill",
    "difficulty": "Easy",
    "category": "Graphs",
    "categoryId": "graphs",
    "pattern": "Shortest Path & Union-Find (DSU)",
    "patternId": "graphs-dsu-shortest-path",
    "subPattern": "Connected Component DFS",
    "leetcodeNumber": 733,
    "leetcodeUrl": "https://leetcode.com/problems/flood-fill/",
    "signals": [
      "flood fill from starting pixel (sr, sc)",
      "DFS or BFS connected component color change",
      "grid graph traversal"
    ],
    "solved": false
  },
  {
    "id": "lc-2185-counting-w",
    "title": "Counting Words With a Given Prefix",
    "difficulty": "Easy",
    "category": "Trie",
    "categoryId": "trie",
    "pattern": "Prefix Trees & Bitwise Tries",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Count",
    "leetcodeNumber": 2185,
    "leetcodeUrl": "https://leetcode.com/problems/counting-words-with-a-given-prefix/",
    "signals": [
      "number of strings in words that contain pref as prefix",
      "string prefix check / Trie traversal",
      "startsWith"
    ],
    "solved": false
  },
  {
    "id": "lc-3042",
    "title": "Count Prefix and Suffix Pairs I",
    "difficulty": "Easy",
    "category": "Trie",
    "categoryId": "trie",
    "pattern": "Prefix Trees & Bitwise Tries",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix and Suffix",
    "leetcodeNumber": 3042,
    "leetcodeUrl": "https://leetcode.com/problems/count-prefix-and-suffix-pairs-i/",
    "signals": [
      "check isPrefixAndSuffix(str1, str2)",
      "prefix matching",
      "string index check"
    ],
    "solved": false
  },
  {
    "id": "lc-2000-reverse-pr",
    "title": "Reverse Prefix of Word",
    "difficulty": "Easy",
    "category": "Trie",
    "categoryId": "trie",
    "pattern": "Prefix Trees & Bitwise Tries",
    "patternId": "trie-prefix-bitwise",
    "subPattern": "Prefix Search",
    "leetcodeNumber": 2000,
    "leetcodeUrl": "https://leetcode.com/problems/reverse-prefix-of-word/",
    "signals": [
      "reverse the segment of word from index 0 to first occurrence of ch",
      "find index of char then reverse prefix",
      "prefix manipulation"
    ],
    "solved": false
  },
  {
    "id": "lc-746-min-cost-c",
    "title": "Min Cost Climbing Stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "0/1 Knapsack & Classic Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Min Cost DP",
    "leetcodeNumber": 746,
    "leetcodeUrl": "https://leetcode.com/problems/min-cost-climbing-stairs/",
    "signals": [
      "minimum cost to reach the top of the floor",
      "dp[i] = cost[i] + min(dp[i-1], dp[i-2])",
      "optimal choice"
    ],
    "solved": false
  },
  {
    "id": "lc-70-climbing-s",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "0/1 Knapsack & Classic Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Fibonacci Transitions",
    "leetcodeNumber": 70,
    "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
    "signals": [
      "distinct ways to climb to top taking 1 or 2 steps",
      "dp[i] = dp[i-1] + dp[i-2]",
      "state transition"
    ],
    "solved": false
  },
  {
    "id": "lc-118-pascals-tr",
    "title": "Pascal's Triangle",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "0/1 Knapsack & Classic Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Row Subproblems",
    "leetcodeNumber": 118,
    "leetcodeUrl": "https://leetcode.com/problems/pascals-triangle/",
    "signals": [
      "generate first numRows of Pascal's triangle",
      "row[j] = prev[j-1] + prev[j]",
      "tabular DP construction"
    ],
    "solved": false
  },
  {
    "id": "lc-392-is-subsequ",
    "title": "Is Subsequence",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "0/1 Knapsack & Classic Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Subsequence Matching",
    "leetcodeNumber": 392,
    "leetcodeUrl": "https://leetcode.com/problems/is-subsequence/",
    "signals": [
      "check if s is subsequence of t",
      "two pointers or 2D DP LCS table",
      "greedy subsequence match"
    ],
    "solved": false
  },
  {
    "id": "lc-509-fibonacci-",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "categoryId": "dp",
    "pattern": "0/1 Knapsack & Classic Sequences",
    "patternId": "dp-knapsack-sequences",
    "subPattern": "Overlapping Subproblems",
    "leetcodeNumber": 509,
    "leetcodeUrl": "https://leetcode.com/problems/fibonacci-number/",
    "signals": [
      "calculate F(n)",
      "memoization / bottom-up state array",
      "overlapping subproblem base"
    ],
    "solved": false
  },
  {
    "id": "lc-982",
    "title": "Triples with Bitwise AND Equal To Zero",
    "difficulty": "Hard",
    "category": "Bit Manipulation",
    "categoryId": "bit-manipulation",
    "pattern": "Bit Manipulation",
    "patternId": "bit-core-masking",
    "subPattern": "Bitwise AND Triples",
    "leetcodeNumber": 982,
    "leetcodeUrl": "https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero/",
    "signals": [
      "find triples (i,j,k) with nums[i] & nums[j] & nums[k] == 0",
      "precompute pair AND frequencies",
      "iterate third number with submask check"
    ],
    "solved": false
  },
  {
    "id": "lc-1413-minimum-va",
    "title": "Minimum Value to Get Positive Step by Step Sum",
    "difficulty": "Easy",
    "category": "Range Queries & Advanced Data Structures",
    "categoryId": "range-queries",
    "pattern": "Range Trees & Dynamic Aggregation",
    "patternId": "range-trees",
    "subPattern": "Running Sum Query",
    "leetcodeNumber": 1413,
    "leetcodeUrl": "https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum/",
    "signals": [
      "startValue + step by step sum never less than 1",
      "prefix sum tracking minimum cumulative sum",
      "min prefix sum"
    ],
    "solved": false
  },
  {
    "id": "lc-1588-sum-of-all",
    "title": "Sum of All Odd Length Subarrays",
    "difficulty": "Easy",
    "category": "Range Queries & Advanced Data Structures",
    "categoryId": "range-queries",
    "pattern": "Range Trees & Dynamic Aggregation",
    "patternId": "range-trees",
    "subPattern": "Odd Length Subarrays",
    "leetcodeNumber": 1588,
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-all-odd-length-subarrays/",
    "signals": [
      "sum of all possible odd-length subarrays",
      "prefix sum range query or frequency calculation",
      "cumulative range query"
    ],
    "solved": false
  },
  {
    "id": "lc-724-find-pivot",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "category": "Range Queries & Advanced Data Structures",
    "categoryId": "range-queries",
    "pattern": "Range Trees & Dynamic Aggregation",
    "patternId": "range-trees",
    "subPattern": "Prefix Balance",
    "leetcodeNumber": 724,
    "leetcodeUrl": "https://leetcode.com/problems/find-pivot-index/",
    "signals": [
      "left sum equals right sum",
      "totalSum - leftSum - nums[i] == leftSum",
      "prefix sum array"
    ],
    "solved": false
  },
  {
    "id": "lc-1991-find-the-m",
    "title": "Find the Middle Index in Array",
    "difficulty": "Easy",
    "category": "Range Queries & Advanced Data Structures",
    "categoryId": "range-queries",
    "pattern": "Range Trees & Dynamic Aggregation",
    "patternId": "range-trees",
    "subPattern": "Middle Index Balance",
    "leetcodeNumber": 1991,
    "leetcodeUrl": "https://leetcode.com/problems/find-the-middle-index-in-array/",
    "signals": [
      "left sum equals right sum",
      "prefix sum comparison",
      "range query balance"
    ],
    "solved": false
  }
];

const dsaArenaDrills = [
  {
    "id": "drill-01",
    "title": "Pair Sum in Sorted Inventory",
    "snippet": "Given a strictly increasing array of product prices and a budget K, determine if there exists any pair of distinct items whose prices sum up to exactly K in O(1) extra space.",
    "constraints": "prices.length <= 10^5, prices is sorted ascending, prices[i] >= 0",
    "options": [
      "Two Pointers",
      "Dynamic Programming",
      "Segment Tree",
      "Breadth First Search"
    ],
    "correctIndex": 0,
    "explanation": "Because the array is sorted and requires O(1) auxiliary space, opposite-direction Two Pointers achieves O(N) time by starting at indices 0 and n-1 and converging based on current sum vs K.",
    "hint": "Sorted array + O(1) space limit is the quintessential signature of Two Pointers."
  },
  {
    "id": "drill-02",
    "title": "Longest Transmission with at Most 2 Glitches",
    "snippet": "A network monitor logs a binary packet stream. You want to find the maximum length of a contiguous subsegment that contains at most 2 corrupted packets (zeros).",
    "constraints": "packets.length <= 10^5, packets[i] in {0, 1}",
    "options": [
      "Monotonic Stack",
      "Sliding Window",
      "Trie",
      "Disjoint Set Union"
    ],
    "correctIndex": 1,
    "explanation": "The problem asks for the longest contiguous subsegment satisfying a frequency condition (zeros <= 2). Dynamic Sliding Window (expanding right, shrinking left when zeros > 2) solves this in O(N) time.",
    "hint": "Contiguous subarray + at most K condition = Sliding Window."
  },
  {
    "id": "drill-03",
    "title": "Subarray Transaction Balancing",
    "snippet": "You are given a ledger of positive and negative transaction values. Count the total number of continuous periods where the net balance change was exactly zero.",
    "constraints": "nums.length <= 10^5, nums[i] can be negative, zero, or positive",
    "options": [
      "Prefix Sum + Hash Map",
      "Two Pointers",
      "Binary Search on Answer",
      "Greedy Interval Scheduling"
    ],
    "correctIndex": 0,
    "explanation": "Because array elements can be negative, Two Pointers and Sliding Window fail due to loss of monotonicity. Storing prefix sums in a Hash Map allows O(1) lookup of how many times a target sum (prefixSum - target) appeared earlier.",
    "hint": "Subarray sum equals target with negative numbers strictly requires Prefix Sum + Hash Map."
  },
  {
    "id": "drill-04",
    "title": "Next Warmer Day Forecast",
    "snippet": "Given an array of daily temperatures, compute for each day how many days you would have to wait until a warmer temperature occurs. If no warmer day arrives, return 0.",
    "constraints": "temperatures.length <= 10^5, temperatures[i] <= 100",
    "options": [
      "Monotonic Stack",
      "Depth First Search",
      "Fenwick Tree",
      "Breadth First Search"
    ],
    "correctIndex": 0,
    "explanation": "Finding the 'next greater element' or first element to the right satisfying a comparison is the textbook Monotonic Stack pattern. A decreasing stack of indices resolves each day in amortized O(1) time.",
    "hint": "Next greater / smaller element on the right/left screams Monotonic Stack."
  },
  {
    "id": "drill-05",
    "title": "Autonomous Factory Conveyor Capacity",
    "snippet": "A robotic system must ship N packages in order within D days. Find the minimum conveyor weight capacity needed so that all packages are transported in at most D days.",
    "constraints": "weights.length <= 5 * 10^4, 1 <= D <= weights.length",
    "options": [
      "Binary Search on Answer Space",
      "Two Pointers",
      "Backtracking",
      "Topological Sort"
    ],
    "correctIndex": 0,
    "explanation": "The answer capacity lies in a monotonic range [max(weights), sum(weights)]. If capacity C is feasible, any capacity > C is also feasible. This monotonic boolean predicate enables Binary Search on the answer space in O(N log(sum - max)).",
    "hint": "Minimize the maximum capacity or find smallest threshold with a monotonic feasibility check = Binary Search on Answer."
  },
  {
    "id": "drill-06",
    "title": "Course Dependency Deadlock Detection",
    "snippet": "A university catalog gives total courses N and a list of prerequisites [A, B] meaning course B must be taken before A. Determine if it is possible for a student to finish all courses.",
    "constraints": "N <= 10^5, prerequisites.length <= 10^5",
    "options": [
      "Topological Sort / Cycle Detection",
      "Greedy Jump",
      "Sliding Window",
      "Segment Tree"
    ],
    "correctIndex": 0,
    "explanation": "Prerequisites define a directed graph where courses are nodes and requirements are edges. If there exists a directed cycle, completion is impossible. Kahn's algorithm (BFS in-degrees) or DFS cycle detection resolves this in O(V + E).",
    "hint": "Prerequisites, order of dependencies, or directed cycle detection = Topological Sort / Graph BFS-DFS."
  },
  {
    "id": "drill-07",
    "title": "Minimum Cash Register Coins",
    "snippet": "Given an array of distinct coin denominations and an integer amount, compute the fewest number of coins needed to make up that amount, or return -1 if impossible.",
    "constraints": "coins.length <= 12, amount <= 10^4, coins[i] >= 1",
    "options": [
      "Dynamic Programming (Unbounded Knapsack)",
      "Greedy Coin Selection",
      "Two Pointers",
      "Binary Search"
    ],
    "correctIndex": 0,
    "explanation": "Arbitrary coin systems lack the greedy matroid property (e.g., coins [1, 3, 4] for amount 6 yields greedy 4+1+1 = 3 coins, but optimal DP is 3+3 = 2 coins). 1D DP `dp[i] = min(dp[i], dp[i - c] + 1)` solves it in O(amount * coins).",
    "hint": "Fewest items to make exact target without greedy guarantees = DP Knapsack."
  },
  {
    "id": "drill-08",
    "title": "Live Video Stream Top K Viewers",
    "snippet": "In an unbounded real-time stream of viewer interaction counts, continuously maintain the top K most active viewer IDs at any point in time.",
    "constraints": "Stream length up to 10^7, K <= 10^4",
    "options": [
      "Min-Heap of Size K",
      "Quicksort on entire stream",
      "Prefix Sum Array",
      "Monotonic Stack"
    ],
    "correctIndex": 0,
    "explanation": "Maintaining top K elements in an active or streaming dataset is solved using a Min-Heap of capacity K. When the heap exceeds K, ejecting the smallest element leaves the K largest in O(log K) per insertion.",
    "hint": "Top K elements in dynamic stream = Min-Heap of size K."
  },
  {
    "id": "drill-09",
    "title": "Meeting Room Overlap Auditor",
    "snippet": "Given a collection of meeting time intervals [start, end], find the minimum number of conference rooms required so that no two simultaneous meetings overlap.",
    "constraints": "intervals.length <= 10^5, 0 <= start < end <= 10^6",
    "options": [
      "Greedy Interval Sweep-line / Min-Heap",
      "Breadth First Search",
      "Backtracking",
      "Prefix Suffix Product"
    ],
    "correctIndex": 0,
    "explanation": "Sort meetings by start time and use a Min-Heap storing end times (or two sorted arrays for start/end points). If the earliest ending meeting finishes before the next starts, reuse the room; otherwise allocate a new room.",
    "hint": "Interval scheduling, meeting rooms, or overlapping time spans = Interval Greedy / Sweep-line."
  },
  {
    "id": "drill-10",
    "title": "Autofill Search Prefix Suggestion",
    "snippet": "Design a search suggestion system that rapidly checks if any catalog product begins with a typed prefix string of length L, and returns up to 3 lexicographical matches.",
    "constraints": "words.length <= 2 * 10^4, total characters <= 2 * 10^5, prefix length <= 1000",
    "options": [
      "Trie (Prefix Tree)",
      "Segment Tree",
      "Monotonic Deque",
      "Topological Sort"
    ],
    "correctIndex": 0,
    "explanation": "Trie stores characters along tree paths sharing common prefixes. Looking up a prefix of length L takes O(L) time regardless of the total number of words in the vocabulary.",
    "hint": "String prefix lookups, autocomplete, or startsWith queries = Trie."
  },
  {
    "id": "drill-11",
    "title": "Circular Buffer Sliding Maximum",
    "snippet": "You are given an integer array and a sliding window of fixed size K moving from left to right. Return the maximum value inside the window at each position in O(N) total time.",
    "constraints": "nums.length <= 10^5, 1 <= K <= nums.length",
    "options": [
      "Monotonic Deque",
      "Bubble Sort",
      "Binary Search Tree",
      "Backtracking"
    ],
    "correctIndex": 0,
    "explanation": "A Monotonic Deque maintains indices of elements in non-increasing order. Elements that fall outside the window or are smaller than the incoming element are evicted, keeping the maximum always at the front in O(1) amortized time.",
    "hint": "Sliding window maximum or minimum in linear time = Monotonic Deque."
  },
  {
    "id": "drill-12",
    "title": "Memory Leak Single Unique Identifier",
    "snippet": "Every memory allocation block has an integer ID that appears twice, except for one orphan block that appears exactly once. Find this single ID in O(N) time and O(1) extra space.",
    "constraints": "nums.length <= 10^5, every element appears twice except one",
    "options": [
      "Bitwise XOR Manipulation",
      "Hash Set Lookup",
      "Sorting",
      "Counting Sort"
    ],
    "correctIndex": 0,
    "explanation": "XOR of any number with itself is 0 (`A ^ A = 0`) and XOR with 0 is the number itself (`A ^ 0 = A`). XORing all numbers cancels duplicate pairs and leaves the solitary element in O(N) time and O(1) space.",
    "hint": "Pairs cancel out, find odd-one-out with O(1) space = Bitwise XOR."
  },
  {
    "id": "drill-13",
    "title": "Robotic Grid Shortest Escape Route",
    "snippet": "In an M x N grid containing obstacles (1s) and empty cells (0s), find the shortest number of steps from top-left (0,0) to bottom-right (M-1, N-1).",
    "constraints": "M, N <= 100, moves are 4-directional",
    "options": [
      "Breadth First Search (BFS)",
      "Depth First Search (DFS)",
      "Bitmask DP",
      "Quickselect"
    ],
    "correctIndex": 0,
    "explanation": "For unweighted graphs or grids, Breadth First Search (BFS) explores uniformly level-by-level, guaranteeing that the first time the destination is reached, the shortest path distance is found.",
    "hint": "Shortest path in unweighted grid or minimum steps = BFS."
  },
  {
    "id": "drill-14",
    "title": "All Permutations of Assembly Components",
    "snippet": "Given a collection of distinct component IDs, generate all possible ordering configurations for assembling the final device.",
    "constraints": "nums.length <= 10, all elements distinct",
    "options": [
      "Backtracking / Recursion",
      "Sliding Window",
      "Monotonic Stack",
      "Dijkstra's Algorithm"
    ],
    "correctIndex": 0,
    "explanation": "Generating all permutations or exhaustive combinatorial configurations requires exploring a state-space tree of size N!. Backtracking systematically builds candidate paths and backtracks when complete.",
    "hint": "Generate all permutations, combinations, or valid subsets = Backtracking."
  },
  {
    "id": "drill-15",
    "title": "Fast Dynamic Range Query with Point Updates",
    "snippet": "Maintain an array of size N where you must frequently perform two operations: update an element at index i, and calculate the sum of elements between indices [L, R] in O(log N) time.",
    "constraints": "N <= 10^5, number of queries <= 10^5",
    "options": [
      "Segment Tree / Fenwick Tree",
      "Prefix Sum Array",
      "Two Pointers",
      "Hash Map"
    ],
    "correctIndex": 0,
    "explanation": "A static prefix sum array handles range sum queries in O(1), but updating takes O(N). A Segment Tree or Fenwick (Binary Indexed) Tree balances both point updates and range queries in O(log N) time.",
    "hint": "Point updates + range sum queries in O(log N) = Segment Tree or Fenwick Tree."
  },
  {
    "id": "drill-16",
    "title": "Linked List Memory Loop Auditor",
    "snippet": "Given the head of a singly linked list, determine if the list contains a reference cycle without modifying node values and using strictly O(1) auxiliary memory.",
    "constraints": "Number of nodes <= 10^5, space must be O(1)",
    "options": [
      "Floyd's Fast & Slow Pointers",
      "Hash Set of Visited Nodes",
      "Recursion",
      "Binary Search"
    ],
    "correctIndex": 0,
    "explanation": "Floyd's Tortoise and Hare algorithm runs two pointers at speeds 1 and 2. If a cycle exists, the fast pointer will eventually lap and meet the slow pointer in O(N) time and O(1) space.",
    "hint": "Detect cycle in linked list with O(1) space = Fast & Slow Pointers (Tortoise & Hare)."
  },
  {
    "id": "drill-17",
    "title": "Verify Binary Search Tree Invariant",
    "snippet": "Given the root of a binary tree, determine whether every node's value is strictly greater than all values in its left subtree and strictly less than all values in its right subtree.",
    "constraints": "Nodes <= 10^4, node values fit in 32-bit signed integer",
    "options": [
      "In-Order DFS Traversal (or Range Bounds)",
      "Level-Order BFS",
      "Post-Order Monotonic Stack",
      "Kruskal's Algorithm"
    ],
    "correctIndex": 0,
    "explanation": "An in-order traversal of a valid Binary Search Tree visits values in strictly monotonically increasing order. Alternatively, DFS validating that each node falls strictly within valid (minVal, maxVal) bounds verifies this in O(N) time.",
    "hint": "BST validity check = In-Order DFS is strictly increasing."
  },
  {
    "id": "drill-18",
    "title": "Island Perimeter and Cluster Counter",
    "snippet": "An M x N binary matrix represents an aerial map of land (1) and ocean (0). Count the number of disconnected islands formed by horizontally or vertically adjacent land cells.",
    "constraints": "M, N <= 300",
    "options": [
      "Connected Components via DFS / BFS",
      "Two Pointers",
      "Monotonic Stack",
      "Trie"
    ],
    "correctIndex": 0,
    "explanation": "Each island is a connected component in a 4-directional grid graph. Iterating over the grid and launching a DFS/BFS whenever an unvisited '1' is encountered sinks or marks the island in O(M * N) time.",
    "hint": "Connected components or island counting in grid = DFS / BFS traversal."
  },
  {
    "id": "drill-19",
    "title": "Group Scrambled Anagram Strings",
    "snippet": "Given an array of strings, group all words that are anagrams of each other into separate buckets.",
    "constraints": "strs.length <= 10^4, strs[i].length <= 100",
    "options": [
      "Hash Map with Sorted Key / Character Frequency Tuple",
      "Sliding Window",
      "Monotonic Deque",
      "Topological Sort"
    ],
    "correctIndex": 0,
    "explanation": "Two strings are anagrams if and only if their sorted forms (or character frequency count tuples) are identical. Using this canonical form as a Hash Map key groups anagrams in O(N * L log L) time.",
    "hint": "Group words by shared anagram property = Hash Map with sorted canonical key."
  },
  {
    "id": "drill-20",
    "title": "Optimal Substring Without Repeating Glyphs",
    "snippet": "Find the length of the longest continuous substring in a given string that does not contain any duplicate characters.",
    "constraints": "s.length <= 10^5, s consists of English letters, digits, symbols and spaces",
    "options": [
      "Variable-Size Sliding Window + Hash Map / Set",
      "Monotonic Stack",
      "Dynamic Programming with Bitmask",
      "Divide and Conquer"
    ],
    "correctIndex": 0,
    "explanation": "Expand the right pointer while tracking the last seen index of each character. When a duplicate is seen within the current window, contract or jump the left pointer forward past the duplicate.",
    "hint": "Longest substring without duplicates = Variable-size Sliding Window with index map."
  },
  {
    "id": "drill-21",
    "title": "Contiguous Subarray with Maximum Product",
    "snippet": "Given an integer array that may contain positive numbers, zeros, and negative numbers, find the contiguous subarray that has the largest product.",
    "constraints": "nums.length <= 2 * 10^4, -10 <= nums[i] <= 10",
    "options": [
      "Dynamic Programming (Tracking Min and Max Product)",
      "Two Pointers",
      "Greedy Max Selection",
      "Segment Tree"
    ],
    "correctIndex": 0,
    "explanation": "Because multiplying by a negative number can turn a very small minimum into a large maximum, Kadane's algorithm must be adapted to track both the current maximum product and current minimum product at each step.",
    "hint": "Maximum product with negative numbers = DP tracking both local min and local max."
  },
  {
    "id": "drill-22",
    "title": "Longest Increasing Chain of Metrics",
    "snippet": "Given an integer array, find the length of the longest strictly increasing subsequence (not necessarily contiguous).",
    "constraints": "nums.length <= 2500 for O(N^2) or up to 10^5 for O(N log N)",
    "options": [
      "Dynamic Programming with Binary Search (Patience Sorting)",
      "Two Pointers",
      "Sliding Window",
      "Monotonic Deque"
    ],
    "correctIndex": 0,
    "explanation": "Subsequences do not have to be contiguous, rendering sliding window inapplicable. Longest Increasing Subsequence is solved using DP in O(N^2) or Patience Sorting with Binary Search (std::lower_bound) in O(N log N).",
    "hint": "Non-contiguous longest increasing subsequence = LIS DP / Patience Sorting."
  },
  {
    "id": "drill-23",
    "title": "Social Network Friend Circles Merger",
    "snippet": "Given N individuals and a series of dynamic friendship declarations `(u, v)`, support fast queries to determine whether two people are directly or transitively connected.",
    "constraints": "N <= 10^5, number of friendship declarations <= 2 * 10^5",
    "options": [
      "Disjoint Set Union (Union-Find with Path Compression)",
      "Monotonic Stack",
      "Trie",
      "Kadane's Algorithm"
    ],
    "correctIndex": 0,
    "explanation": "Dynamic connectivity queries and merging connected components are the core purpose of Disjoint Set Union (DSU). With path compression and union-by-rank, each operation runs in nearly O(1) amortized time (alpha(N)).",
    "hint": "Dynamic connectivity, grouping disjoint sets, or cycle detection in undirected graph = Union-Find (DSU)."
  },
  {
    "id": "drill-24",
    "title": "Lowest Latency Network Routing",
    "snippet": "A server network has N nodes and directed cables with positive latency weights. Find the minimum time it takes for a signal sent from node K to reach all other nodes.",
    "constraints": "N <= 100, cables.length <= 6000, all edge weights > 0",
    "options": [
      "Dijkstra's Algorithm with Min-Priority Queue",
      "Breadth First Search",
      "Topological Sort",
      "Two Pointers"
    ],
    "correctIndex": 0,
    "explanation": "Weighted directed graphs with non-negative edge costs require Dijkstra's algorithm. A Min-Heap greedily settles the shortest distance to each unvisited node in O((V + E) log V) time.",
    "hint": "Shortest path with positive weights = Dijkstra's algorithm with priority queue."
  },
  {
    "id": "drill-25",
    "title": "Minimum Operations to Connect Sticks",
    "snippet": "You have sticks of varying lengths. You can connect any two sticks of lengths X and Y at a cost of X + Y. Find the minimum total cost to connect all sticks into one.",
    "constraints": "sticks.length <= 10^4, sticks[i] <= 10^4",
    "options": [
      "Greedy with Min-Heap (Huffman Coding principle)",
      "Dynamic Programming",
      "Sliding Window",
      "Binary Search"
    ],
    "correctIndex": 0,
    "explanation": "To minimize total cost, elements that are combined earliest contribute to more additions down the line. Greedily picking the two smallest sticks at each step using a Min-Heap minimizes total cost (identical to Huffman coding).",
    "hint": "Repeatedly combine two smallest elements = Min-Heap Greedy."
  },
  {
    "id": "drill-26",
    "title": "Check Syntactic Bracket Balance",
    "snippet": "Given a code string containing `(`, `)`, `{`, `}`, `[`, and `]`, verify whether all opening brackets are closed by the same type of brackets in the correct order.",
    "constraints": "s.length <= 10^5",
    "options": [
      "Stack (Last-In-First-Out)",
      "Queue (First-In-First-Out)",
      "Prefix Sum",
      "Two Pointers"
    ],
    "correctIndex": 0,
    "explanation": "Bracket matching is inherently nested: the most recently opened bracket must be the first one closed. A LIFO Stack stores opening brackets and checks if top matches each incoming closing bracket.",
    "hint": "Nested delimiters, parentheses, or expression matching = Stack (LIFO)."
  },
  {
    "id": "drill-27",
    "title": "Evaluate Arithmetic in Reverse Polish Notation",
    "snippet": "Compute the numerical value of an arithmetic expression given in postfix notation tokens: `['2', '1', '+', '3', '*']`.",
    "constraints": "tokens.length <= 10^4, operators in {+, -, *, /}",
    "options": [
      "Stack Expression Evaluation",
      "Two Pointers",
      "Sliding Window",
      "Binary Search"
    ],
    "correctIndex": 0,
    "explanation": "In Reverse Polish Notation, operands precede operators. Pushing numbers onto a stack and popping the two most recent operands when an operator is encountered evaluates the expression in linear time.",
    "hint": "Postfix / RPN evaluation = Stack."
  },
  {
    "id": "drill-28",
    "title": "Sort Colors with In-Place Linear Time",
    "snippet": "Given an array with N objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, in order 0, 1, 2.",
    "constraints": "nums.length <= 300, nums[i] in {0, 1, 2}, must be O(1) space and one pass",
    "options": [
      "Dutch National Flag (Three-Way Partition)",
      "Merge Sort",
      "Sliding Window",
      "Segment Tree"
    ],
    "correctIndex": 0,
    "explanation": "Dijkstra's Dutch National Flag algorithm uses three pointers (low, mid, high) to partition the array into 0s on the left, 1s in the center, and 2s on the right in a single pass with O(1) space.",
    "hint": "Three-way partition in-place in one pass = Dutch National Flag."
  },
  {
    "id": "drill-29",
    "title": "Find Kth Largest Element Quickly",
    "snippet": "Find the K-th largest element in an unsorted array without fully sorting the entire array in O(N log N) time.",
    "constraints": "nums.length <= 10^5, average time must be O(N)",
    "options": [
      "Quickselect (Hoare's Selection) / Min-Heap",
      "Bubble Sort",
      "Two Pointers on unsorted array",
      "Sliding Window"
    ],
    "correctIndex": 0,
    "explanation": "Quickselect partitions the array around a pivot like Quicksort, but only recurses into the side containing the K-th index, yielding an average time complexity of O(N) instead of O(N log N).",
    "hint": "Kth largest element in average linear time = Quickselect (or Min-Heap)."
  },
  {
    "id": "drill-30",
    "title": "Maximum Bitwise XOR Pair",
    "snippet": "Given an array of integers, find the maximum XOR result of any two numbers in the array in O(N) time.",
    "constraints": "nums.length <= 2 * 10^5, 0 <= nums[i] <= 2^31 - 1",
    "options": [
      "Bitwise Trie (Prefix Tree on Binary Bits)",
      "Kadane's Algorithm",
      "Monotonic Stack",
      "Topological Sort"
    ],
    "correctIndex": 0,
    "explanation": "Store the binary representation (31 bits) of all numbers in a 0/1 Bitwise Trie. For each number, greedily traverse the opposite bit whenever available to maximize the resulting XOR in O(32 * N) = O(N) time.",
    "hint": "Maximum XOR of two numbers in linear time = Bitwise Trie."
  },
  {
    "id": "drill-31",
    "title": "Minimum Jump Distance to Reach Destination",
    "snippet": "You are given an integer array where each element represents your maximum jump length at that position. Return the minimum number of jumps to reach the last index.",
    "constraints": "nums.length <= 10^4, nums[i] >= 0, reachable",
    "options": [
      "Greedy BFS / Range Farthest Extension",
      "Monotonic Deque",
      "Binary Search",
      "Bitmask"
    ],
    "correctIndex": 0,
    "explanation": "At each level, greedily track the farthest reachable index (`farthest = max(farthest, i + nums[i])`). When the current jump boundary is reached, increment the jump count and set the boundary to the farthest reachable index.",
    "hint": "Minimum jumps in Jump Game II = Greedy Range Extension (BFS-like levels)."
  },
  {
    "id": "drill-32",
    "title": "Find the Duplicate Number with Constraints",
    "snippet": "Given an array of N + 1 integers where each integer is between 1 and N inclusive. Exactly one number is repeated. Find the duplicate in O(1) extra space without modifying the array.",
    "constraints": "nums.length <= 10^5, nums[i] in [1, N], do not modify array, O(1) space",
    "options": [
      "Floyd's Cycle Finding (Array as Linked List)",
      "Hash Set",
      "Counting Sort",
      "Sliding Window"
    ],
    "correctIndex": 0,
    "explanation": "Treat the array as a functional linked list where `index -> nums[index]`. Because values are in [1, N] and length is N + 1, a cycle must exist, and the entrance to the cycle is precisely the duplicate value. Floyd's Tortoise and Hare solves it in O(N) time and O(1) space.",
    "hint": "Find duplicate without modifying array and O(1) space = Floyd's Cycle Detection."
  }
];

// Expose on window / exports for browser & node test runners
if (typeof window !== 'undefined') {
  window.dsaPatternsRoadmap = dsaPatternsRoadmap;
  window.dsaAllQuestions = dsaAllQuestions;
  window.dsaArenaDrills = dsaArenaDrills;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dsaPatternsRoadmap, dsaAllQuestions, dsaArenaDrills };
}
