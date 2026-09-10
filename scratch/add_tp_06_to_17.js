const fs = require('fs');
const path = require('path');

const batch = [
  // 6. Sort Array By Parity
  {
    id: "arr-tp-06",
    leetcodeNumber: 905,
    title: "Sort Array By Parity",
    difficulty: "Easy",
    category: "Array",
    categoryId: "array",
    pattern: "Two Pointers",
    patternId: "array-two-pointers",
    subPattern: "Two-Way Partitioning",
    leetcodeUrl: "https://leetcode.com/problems/sort-array-by-parity/",
    problemUnderstanding: "Given an integer array nums, move all the even integers to the beginning of the array followed by all the odd integers. Return any array that satisfies this condition.",
    whyItMatters: "Introduces two-way array partitioning using two converging pointers, the foundational mechanism behind QuickSort partition logic.",
    patternExplanation: "A left pointer seeks odd numbers from the front, while a right pointer seeks even numbers from the back. When both find misplaced numbers, swapping them places both into their correct parity zones in O(1) time.",
    recognitionSignals: [
      "Partitioning elements into two disjoint categories (even vs odd)",
      "Relative order within each group does not need to be preserved",
      "Requires in-place modification with O(1) extra space"
    ],
    thoughtProcess: "A naive approach collects evens and odds in two separate lists and concatenates them, costing O(N) auxiliary space. With two pointers at opposite ends, left moves forward past evens, and right moves backward past odds. When left points to an odd and right points to an even, swapping them resolves both positions simultaneously.",
    approach: [
      "1. Initialize left = 0 and right = nums.length - 1.",
      "2. While left < right, check if nums[left] is odd and nums[right] is even.",
      "3. If so, swap(nums[left], nums[right]).",
      "4. If nums[left] is even, increment left++.",
      "5. If nums[right] is odd, decrement right--.",
      "6. Return nums."
    ],
    algorithm: "left = 0, right = n - 1\nwhile left < right:\n    if nums[left] % 2 > nums[right] % 2:\n        swap(nums[left], nums[right])\n    if nums[left] % 2 == 0: left += 1\n    if nums[right] % 2 == 1: right -= 1\nreturn nums",
    pseudocode: `function sortArrayByParity(nums):
    left = 0
    right = length(nums) - 1
    while left < right:
        if (nums[left] % 2) > (nums[right] % 2):
            swap(nums[left], nums[right])
        if nums[left] % 2 == 0:
            left = left + 1
        if nums[right] % 2 == 1:
            right = right - 1
    return nums`,
    walkthrough: {
      input: "nums = [3, 1, 2, 4]",
      description: "Opposing two pointers swapping misaligned parity items:",
      tableHeaders: ["left", "right", "nums[left]", "nums[right]", "Action", "nums state"],
      tableRows: [
        ["0", "3", "3 (odd)", "4 (even)", "Swap 3 and 4", "[4, 1, 2, 3]"],
        ["0", "3", "4 (even)", "3 (odd)", "left++, right--", "[4, 1, 2, 3]"],
        ["1", "2", "1 (odd)", "2 (even)", "Swap 1 and 2", "[4, 2, 1, 3]"],
        ["1", "2", "2 (even)", "1 (odd)", "left++, right-- (left > right)", "[4, 2, 1, 3] ✓"]
      ]
    },
    edgeCases: [
      { case: "nums = [0]", expected: "[0]", explanation: "Single element; loop does not execute." },
      { case: "nums = [2, 4, 6]", expected: "[2, 4, 6]", explanation: "Already all evens; pointers adjust without swapping." },
      { case: "nums = [1, 3, 5]", expected: "[1, 3, 5]", explanation: "Already all odds; pointers adjust without swapping." }
    ],
    code: {
      python: `class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        left, right = 0, len(nums) - 1
        while left < right:
            if nums[left] % 2 > nums[right] % 2:
                nums[left], nums[right] = nums[right], nums[left]
            if nums[left] % 2 == 0:
                left += 1
            if nums[right] % 2 == 1:
                right -= 1
        return nums`,
      cpp: `class Solution {
public:
    vector<int> sortArrayByParity(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            if (nums[left] % 2 > nums[right] % 2) {
                swap(nums[left], nums[right]);
            }
            if (nums[left] % 2 == 0) left++;
            if (nums[right] % 2 == 1) right--;
        }
        return nums;
    }
};`,
      java: `class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            if (nums[left] % 2 > nums[right] % 2) {
                int tmp = nums[left];
                nums[left] = nums[right];
                nums[right] = tmp;
            }
            if (nums[left] % 2 == 0) left++;
            if (nums[right] % 2 == 1) right--;
        }
        return nums;
    }
}`,
      javascript: `var sortArrayByParity = function(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        if (nums[left] % 2 > nums[right] % 2) {
            const tmp = nums[left];
            nums[left] = nums[right];
            nums[right] = tmp;
        }
        if (nums[left] % 2 === 0) left++;
        if (nums[right] % 2 === 1) right--;
    }
    return nums;
};`
    },
    codeExplanation: {
      python: [
        "Line 3: Set left at index 0 and right at len(nums) - 1.",
        "Line 4-5: Compare parity: if left is odd (1) and right is even (0), swap elements in-place.",
        "Line 6-9: Advance left if even; decrement right if odd.",
        "Line 10: Return modified list."
      ],
      cpp: [
        "Line 4: Declare bounds left = 0 and right = nums.size() - 1.",
        "Line 5-8: If parity comparison detects inverted order, swap.",
        "Line 9-10: Move pointers inward when their current positions satisfy conditions.",
        "Line 12: Return vector."
      ],
      java: [
        "Line 3: Initialize left and right bounds.",
        "Line 4-12: In-place two-way swap loop without allocating auxiliary array.",
        "Line 13: Return nums."
      ],
      javascript: [
        "Line 2: Left and right pointers at opposite edges.",
        "Line 3-11: Swap odd on left with even on right, then shrink bounds.",
        "Line 12: Return array."
      ]
    },
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Allocating an auxiliary array, which doubles memory consumption.",
      "Forgetting to increment left or decrement right when elements are already in the right partition, causing an infinite loop.",
      "Checking negative numbers with % without taking absolute value (not an issue here since nums[i] >= 0 per problem constraints, but good practice)."
    ],
    takeaway: "Converging two pointers enable O(1) space two-way partitioning by swapping inverted elements across boundaries.",
    hints: [
      "Could you have one pointer starting at the beginning and one at the end?",
      "The left pointer wants to find odd numbers; the right pointer wants to find even numbers.",
      "When both pointers find misplaced elements, swap them and advance both pointers."
    ]
  },

  // 7. Two Sum II - Input Array Is Sorted
  {
    id: "arr-tp-07",
    leetcodeNumber: 167,
    title: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    category: "Array",
    categoryId: "array",
    pattern: "Two Pointers",
    patternId: "array-two-pointers",
    subPattern: "Opposing Ends on Sorted Array",
    leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    problemUnderstanding: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return their 1-based indices [index1, index2]. Space must be strictly O(1).",
    whyItMatters: "Demonstrates how sorting eliminates the need for hash map auxiliary memory, reducing space complexity from O(N) to O(1) using opposing two pointers.",
    patternExplanation: "Because the array is monotonically non-decreasing, if numbers[left] + numbers[right] < target, the only way to increase the sum is incrementing left. If the sum > target, the only way to decrease it is decrementing right.",
    recognitionSignals: [
      "Finding two numbers that sum to a target value",
      "The input array is explicitly GUARANTEED to be sorted",
      "Constraint mandates strictly O(1) auxiliary space (no hash map)",
      "Output indices are 1-based"
    ],
    thoughtProcess: "In unsorted Two Sum, we used a hash map for O(1) lookup because numbers were arbitrary. Here, the array is already sorted. We place left at index 0 (minimum value) and right at n - 1 (maximum value). If their sum is too small, no other partner for 'left' can reach target with a smaller right, so left must advance. This guarantees linear convergence without memory allocation.",
    approach: [
      "1. Initialize left = 0 and right = numbers.length - 1.",
      "2. While left < right, calculate sum = numbers[left] + numbers[right].",
      "3. If sum == target, return [left + 1, right + 1] (1-indexed).",
      "4. If sum < target, advance left++ to increase sum.",
      "5. If sum > target, decrement right-- to decrease sum."
    ],
    algorithm: "left = 0, right = len(nums) - 1\nwhile left < right:\n    sum = nums[left] + nums[right]\n    if sum == target: return [left + 1, right + 1]\n    else if sum < target: left += 1\n    else: right -= 1\nreturn []",
    pseudocode: `function twoSumSorted(numbers, target):
    left = 0
    right = length(numbers) - 1
    while left < right:
        sum = numbers[left] + numbers[right]
        if sum == target:
            return [left + 1, right + 1]
        else if sum < target:
            left = left + 1
        else:
            right = right - 1
    return []`,
    walkthrough: {
      input: "numbers = [2, 7, 11, 15], target = 9",
      description: "Opposing two-pointer convergence:",
      tableHeaders: ["left", "right", "numbers[left]", "numbers[right]", "Sum", "Comparison", "Action"],
      tableRows: [
        ["0", "3", "2", "15", "17", "17 > 9", "Too large → right--"],
        ["0", "2", "2", "11", "13", "13 > 9", "Too large → right--"],
        ["0", "1", "2", "7", "9", "9 == 9", "Match found → return [1, 2] ✓"]
      ]
    },
    edgeCases: [
      { case: "numbers = [2, 3, 4], target = 6", expected: "[1, 3]", explanation: "Extreme outer pair forms target sum directly." },
      { case: "numbers = [-1, 0], target = -1", expected: "[1, 2]", explanation: "Negative numbers work seamlessly without special casing." },
      { case: "numbers = [5, 25, 75], target = 100", expected: "[2, 3]", explanation: "Large values with asymmetric intervals converge accurately." }
    ],
    code: {
      python: `class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            current_sum = numbers[left] + numbers[right]
            if current_sum == target:
                return [left + 1, right + 1]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
        return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return {left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[] { left + 1, right + 1 };
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[0];
    }
}`,
      javascript: `var twoSum = function(numbers, target) {
    let left = 0, right = numbers.length - 1;
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
};`
    },
    codeExplanation: {
      python: [
        "Line 3: Set opposing pointers at 0 and len(numbers) - 1.",
        "Line 4: Loop while left < right.",
        "Line 5-7: If current_sum matches target, return 1-based indices [left + 1, right + 1].",
        "Line 8-11: Adjust left or right pointer monotonically based on comparison."
      ],
      cpp: [
        "Line 4: Declare left and right bounds.",
        "Line 5: Opposing pointer while loop.",
        "Line 6-12: Compare sum to target; return {left + 1, right + 1} upon match."
      ],
      java: [
        "Line 3: Initialize left = 0, right = numbers.length - 1.",
        "Line 4-12: Binary decision loop modifying sum towards target.",
        "Line 13: Return empty array fallback."
      ],
      javascript: [
        "Line 2: Left and right index markers.",
        "Line 3-10: Sum comparison adjusting outer bounds.",
        "Line 11: Return empty array."
      ]
    },
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Returning 0-indexed values instead of 1-indexed (e.g. returning [0, 1] instead of [1, 2]).",
      "Using a hash map, which passes the time limit but wastes O(N) memory when O(1) is expected.",
      "Using left <= right, which could allow pairing an element with itself."
    ],
    takeaway: "When an array is sorted, two pointers converging from both ends can find target pair sums in O(N) time and O(1) space.",
    hints: [
      "How can you take advantage of the fact that the array is already sorted?",
      "If you sum the smallest and largest numbers, what does it mean if the sum is too small or too large?",
      "If the sum is too small, advance the left pointer; if too large, move the right pointer backward."
    ]
  }
];

// Load existing array.js content
const arrayJsPath = path.join(__dirname, '../js/data/dsa/explanations/array.js');
let existing = {};
if (fs.existsSync(arrayJsPath)) {
  const content = fs.readFileSync(arrayJsPath, 'utf8');
  // eval to extract
  const sandbox = {};
  const vm = require('vm');
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox);
  if (sandbox.arrayExplanations) {
    existing = sandbox.arrayExplanations;
  }
}

batch.forEach(item => {
  existing[item.id] = item;
});

const outContent = `/**
 * DevPilot-AI — Category 01: Array Problem Explanations
 * Comprehensive 15-Section Pedagogical Explanations
 * 100% LeetCode Submission Pasteable
 */

(function () {
  'use strict';

  const root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
  if (!root.DsaProblemDatabase) {
    root.DsaProblemDatabase = {};
  }

  const arrayExplanations = ${JSON.stringify(existing, null, 2)};

  if (typeof root.DsaProblemDatabase.registerBatch === 'function') {
    root.DsaProblemDatabase.registerBatch(arrayExplanations);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = arrayExplanations;
  }
})();
`;

fs.writeFileSync(arrayJsPath, outContent, 'utf8');
console.log("Updated array.js! Total problems: " + Object.keys(existing).length);
