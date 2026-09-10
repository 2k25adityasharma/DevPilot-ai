const fs = require('fs');
const path = require('path');

const arrayJsPath = path.join(__dirname, '../js/data/dsa/explanations/array.js');
let existing = {};
try {
  existing = require(arrayJsPath);
} catch (e) {
  console.error("Failed to load existing array.js:", e);
}

function add(p) {
  existing[p.id] = p;
}

// 12. Sort Colors
add({
  id: "arr-tp-12",
  leetcodeNumber: 75,
  title: "Sort Colors",
  difficulty: "Medium",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Dutch National Flag 3-Way Partitioning",
  leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
  problemUnderstanding: "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, in the order 0, 1, 2. You must not use the library's sort function, and solve it in a single pass with O(1) extra memory.",
  whyItMatters: "The canonical 3-way partitioning problem formulated by Edsger Dijkstra. Crucial for QuickSort 3-way partition optimization when many duplicate keys exist.",
  patternExplanation: "Three pointers (low, mid, high) partition the array into four zones: [0...low-1] are 0s, [low...mid-1] are 1s, [mid...high] are unexamined elements, and [high+1...n-1] are 2s. By swapping nums[mid] to low or high, we sort in a single pass.",
  recognitionSignals: [
    "Sorting an array with strictly three distinct values/categories",
    "In-place sorting required in a single linear pass",
    "Auxiliary space must be strictly O(1)",
    "Dijkstra's Dutch National Flag partition"
  ],
  thoughtProcess: "A two-pass counting sort counts occurrences of 0, 1, 2 then overwrites nums, but requires two passes. To achieve a true single-pass O(N) solution with O(1) space, we maintain three pointers: low (next slot for 0), mid (current element examined), and high (next slot for 2). When nums[mid] is 0, swap with low and advance both; when 1, advance mid; when 2, swap with high and decrement high (without advancing mid, since the swapped element is unexamined).",
  approach: [
    "1. Initialize low = 0, mid = 0, and high = nums.length - 1.",
    "2. While mid <= high, inspect nums[mid].",
    "3. If nums[mid] == 0: swap(nums[low], nums[mid]), increment low++ and mid++.",
    "4. If nums[mid] == 1: increment mid++ (already in middle zone).",
    "5. If nums[mid] == 2: swap(nums[mid], nums[high]), decrement high-- (do not increment mid).",
    "6. Loop terminates when mid passes high."
  ],
  algorithm: "low = 0, mid = 0, high = n - 1\nwhile mid <= high:\n    if nums[mid] == 0:\n        swap(nums[low], nums[mid])\n        low += 1; mid += 1\n    elif nums[mid] == 1:\n        mid += 1\n    else:\n        swap(nums[mid], nums[high])\n        high -= 1",
  pseudocode: `function sortColors(nums):
    low = 0
    mid = 0
    high = length(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            swap(nums[low], nums[mid])
            low = low + 1
            mid = mid + 1
        else if nums[mid] == 1:
            mid = mid + 1
        else:
            swap(nums[mid], nums[high])
            high = high - 1`,
  walkthrough: {
    input: "nums = [2, 0, 2, 1, 1, 0]",
    description: "Dutch National Flag 3-pointer partition:",
    tableHeaders: ["low", "mid", "high", "nums[mid]", "Action", "nums state"],
    tableRows: [
      ["0", "0", "5", "2", "Swap mid and high, high--", "[0, 0, 2, 1, 1, 2]"],
      ["0", "0", "4", "0", "Swap low and mid, low++, mid++", "[0, 0, 2, 1, 1, 2]"],
      ["1", "1", "4", "0", "Swap low and mid, low++, mid++", "[0, 0, 2, 1, 1, 2]"],
      ["2", "2", "4", "2", "Swap mid and high, high--", "[0, 0, 1, 1, 2, 2]"],
      ["2", "2", "3", "1", "mid++", "[0, 0, 1, 1, 2, 2]"],
      ["2", "3", "3", "1", "mid++", "[0, 0, 1, 1, 2, 2]"],
      ["2", "4", "3", "-", "mid > high → terminate", "[0, 0, 1, 1, 2, 2] ✓"]
    ]
  },
  edgeCases: [
    { case: "nums = [1]", expected: "[1]", explanation: "Single element array; mid == high == 0, mid++ exits." },
    { case: "nums = [2, 0, 1]", expected: "[0, 1, 2]", explanation: "All three distinct elements in reverse order." },
    { case: "nums = [0, 0, 0]", expected: "[0, 0, 0]", explanation: "All identical elements handled gracefully without invalid swaps." }
  ],
  code: {
    python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`,
    cpp: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low++], nums[mid++]);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high--]);
            }
        }
    }
};`,
    java: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int tmp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = tmp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int tmp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = tmp;
                high--;
            }
        }
    }
}`,
    javascript: `var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            const tmp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = tmp;
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            const tmp = nums[mid];
            nums[mid] = nums[high];
            nums[high] = tmp;
            high--;
        }
    }
};`
  },
  codeExplanation: {
    python: [
      "Line 3: Initialize low, mid, and high pointers representing the boundaries of 0s, 1s, and 2s.",
      "Line 4-13: In a single while mid <= high pass, swap 0s to the left and 2s to the right.",
      "Line 11-13: When swapping nums[mid] with nums[high], do NOT increment mid because the swapped element is unexamined."
    ],
    cpp: [
      "Line 4: Declare low = 0, mid = 0, and high = nums.size() - 1.",
      "Line 5: Loop condition mid <= high.",
      "Line 6-12: 3-way partition using std::swap, keeping 1s in the center."
    ],
    java: [
      "Line 3: Set partition boundaries low, mid, and high.",
      "Line 4-19: Conditional swapping according to current color value at mid.",
      "Line 18: Decrement high after placing 2 into suffix."
    ],
    javascript: [
      "Line 2: Pointers low, mid, high.",
      "Line 3-18: Linear traversal swapping 0s to low and 2s to high.",
      "Line 17: high-- without mid++."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Incrementing mid after swapping with high, which misses evaluating the element brought from index high.",
    "Using two passes (counting sort) when an in-place single pass is specifically requested.",
    "Using mid < high instead of mid <= high, leaving the final element at index high unsorted."
  ],
  takeaway: "The Dutch National Flag algorithm partitions 3 categories in a single pass using three pointers (low, mid, high).",
  hints: [
    "Could you use three pointers to divide the array into four regions: 0s, 1s, unexamined, and 2s?",
    "Let low track the boundary of 0s, high track the boundary of 2s, and mid scan elements in between.",
    "Be careful: when swapping with high, do not advance mid, because the element swapped from the back has not been inspected yet."
  ]
});

// 13. Rotate Array
add({
  id: "arr-tp-13",
  leetcodeNumber: 189,
  title: "Rotate Array",
  difficulty: "Medium",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Three-Step Reversal Algorithm",
  leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
  problemUnderstanding: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Solve it in-place using O(1) auxiliary space.",
  whyItMatters: "A masterclass in geometric block transformations. Teaches the famous 3-step array reversal technique used in memory management and string manipulations.",
  patternExplanation: "Rotating right by k moves the last k elements to the front and the first n - k elements to the back. Reversing the entire array places the elements in their general correct halves, but inverted. Reversing each half individually restores their internal order in O(N) time and O(1) space.",
  recognitionSignals: [
    "Cyclic shift or rotation of array elements by k positions",
    "Requirement of strictly O(1) extra space (in-place)",
    "k can be larger than array length (requires k = k % n)",
    "Preserve relative element order within each shifted section"
  ],
  thoughtProcess: "A naive shift by 1 repeated k times takes O(k * N) time, which causes Time Limit Exceeded for large k. Using an auxiliary array costs O(N) space. We observe that reverse(nums) flips all elements. The last k elements are now at the front [0...k-1] (in reverse order), and the first n - k elements are at the back [k...n-1] (in reverse order). Reversing these two subarrays individually restores correct relative order.",
  approach: [
    "1. Calculate effective rotation k = k % nums.length.",
    "2. If k == 0, return immediately.",
    "3. Reverse the entire array nums[0...n-1].",
    "4. Reverse the first k elements nums[0...k-1].",
    "5. Reverse the remaining n - k elements nums[k...n-1]."
  ],
  algorithm: "k = k % n\nreverse(nums, 0, n - 1)\nreverse(nums, 0, k - 1)\nreverse(nums, k, n - 1)",
  pseudocode: `function rotate(nums, k):
    n = length(nums)
    k = k % n
    reverse(nums, 0, n - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, n - 1)

function reverse(nums, start, end):
    while start < end:
        swap(nums[start], nums[end])
        start = start + 1
        end = end - 1`,
  walkthrough: {
    input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
    description: "Three-step reversal sequence:",
    tableHeaders: ["Step", "Action", "Interval", "Resulting Array"],
    tableRows: [
      ["Initial", "None", "-", "[1, 2, 3, 4, 5, 6, 7]"],
      ["Step 1", "Reverse entire array", "[0, 6]", "[7, 6, 5, 4, 3, 2, 1]"],
      ["Step 2", "Reverse first k elements", "[0, 2]", "[5, 6, 7, 4, 3, 2, 1]"],
      ["Step 3", "Reverse remaining n - k", "[3, 6]", "[5, 6, 7, 1, 2, 3, 4] ✓"]
    ]
  },
  edgeCases: [
    { case: "nums = [1, 2], k = 3", expected: "[2, 1]", explanation: "k = 3 % 2 = 1, equivalent to rotating by 1." },
    { case: "nums = [1], k = 100", expected: "[1]", explanation: "Single element array with large k returns [1] unchanged." },
    { case: "nums = [1, 2, 3], k = 0", expected: "[1, 2, 3]", explanation: "k = 0 requires no rotations." }
  ],
  code: {
    python: `class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        n = len(nums)
        k %= n
        
        def reverse(start: int, end: int) -> None:
            while start < end:
                nums[start], nums[end] = nums[end], nums[start]
                start += 1
                end -= 1
                
        reverse(0, n - 1)
        reverse(0, k - 1)
        reverse(k, n - 1)`,
    cpp: `class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};`,
    java: `class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }
    
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }
}`,
    javascript: `var rotate = function(nums, k) {
    const n = nums.length;
    k %= n;
    
    function reverse(start, end) {
        while (start < end) {
            const tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }
    
    reverse(0, n - 1);
    reverse(0, k - 1);
    reverse(k, n - 1);
};`
  },
  codeExplanation: {
    python: [
      "Line 4: Normalize k using modulo: k %= n.",
      "Line 6-10: In-place two-pointer helper 'reverse(start, end)'.",
      "Line 12-14: Execute 3-step reversal: reverse all, reverse first k, reverse remaining n - k."
    ],
    cpp: [
      "Line 4: Calculate k %= n.",
      "Line 5: std::reverse(nums.begin(), nums.end()) reverses whole vector.",
      "Line 6: std::reverse first k elements [0...k-1].",
      "Line 7: std::reverse suffix [k...n-1]."
    ],
    java: [
      "Line 4: Modulo operator handles rotations larger than array length.",
      "Line 5-7: Sequential three-part reversal calls.",
      "Line 10-17: Private reverse helper function swapping endpoints inward."
    ],
    javascript: [
      "Line 3: Wrap k within array bounds with modulo.",
      "Line 5-13: In-place reverse helper swapping opposing indices.",
      "Line 15-17: Three reversal invocations completing rotation."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Forgetting k %= n, which causes out-of-bounds indexing or redundant computations when k > n.",
    "Using splice and unshift in JavaScript, which allocates memory and creates O(N^2) time complexity.",
    "Reversing the segments in wrong order or with incorrect boundary indices."
  ],
  takeaway: "Rotating an array by k in O(1) space is solved by 3 reversals: reverse all, reverse first k, reverse the rest.",
  hints: [
    "What happens when k is larger than the length of the array? Use k = k % n.",
    "If you reverse the entire array, where do the elements that need to be at the front end up?",
    "Notice that reversing the whole array brings the correct elements to the front and back, but each section is reversed internally."
  ]
});

// 14. Next Permutation
add({
  id: "arr-tp-14",
  leetcodeNumber: 31,
  title: "Next Permutation",
  difficulty: "Medium",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Single-Pass Lexicographical Scan & Suffix Reversal",
  leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
  problemUnderstanding: "A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Rearrange nums into the lexicographically next greater permutation of numbers. If such arrangement is not possible, rearrange it as the lowest possible order (i.e., sorted in ascending order). Must be in-place.",
  whyItMatters: "A fundamental algorithmic interview challenge testing deep understanding of lexicographical ordering, digit transitions, and suffix manipulation.",
  patternExplanation: "To make the number minimally larger, find the rightmost index i where nums[i] < nums[i + 1] (the pivot). Then find the smallest element to the right of i that is strictly greater than nums[i], swap them, and reverse the suffix from i + 1 to end to minimize it.",
  recognitionSignals: [
    "Find the next lexicographical sequence in-place",
    "Requires strictly linear O(N) runtime and O(1) extra space",
    "Suffix following the pivot is strictly decreasing",
    "Direct algorithm behind C++ std::next_permutation"
  ],
  thoughtProcess: "A strictly decreasing sequence (e.g. 5, 4, 3, 2, 1) is already at its lexicographically maximal permutation. To increase value minimally, we scan backwards to find the first element nums[i] that is smaller than its right neighbor nums[i + 1]. Then scan backwards from the end to find the smallest number nums[j] > nums[i]. Swap nums[i] and nums[j]. Because the suffix after i is still descending, reversing it makes it ascending (minimal possible value).",
  approach: [
    "1. Find rightmost pivot index i such that nums[i] < nums[i + 1] (scan backwards from n - 2).",
    "2. If such i exists (array is not entirely descending):",
    "   a. Find rightmost index j such that nums[j] > nums[i] (scan backwards from n - 1).",
    "   b. Swap nums[i] and nums[j].",
    "3. Reverse the subarray nums[i + 1...n - 1] to make the suffix minimal.",
    "4. If no pivot exists (entire array was descending), reverse the entire array."
  ],
  algorithm: "i = n - 2\nwhile i >= 0 and nums[i] >= nums[i + 1]: i -= 1\nif i >= 0:\n    j = n - 1\n    while nums[j] <= nums[i]: j -= 1\n    swap(nums[i], nums[j])\nreverse(nums, i + 1, n - 1)",
  pseudocode: `function nextPermutation(nums):
    n = length(nums)
    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i = i - 1
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j = j - 1
        swap(nums[i], nums[j])
    reverse(nums, i + 1, n - 1)`,
  walkthrough: {
    input: "nums = [1, 2, 3, 5, 4, 2]",
    description: "Finding pivot, swapping successor, and reversing suffix:",
    tableHeaders: ["Step", "i", "nums[i]", "j", "nums[j]", "Action", "nums state"],
    tableRows: [
      ["Find pivot", "2", "3", "-", "-", "nums[2]=3 < nums[3]=5 (pivot at 2)", "[1, 2, 3, 5, 4, 2]"],
      ["Find successor", "2", "3", "4", "4", "nums[4]=4 > nums[2]=3", "[1, 2, 3, 5, 4, 2]"],
      ["Swap", "2", "4", "4", "3", "swap(nums[2], nums[4])", "[1, 2, 4, 5, 3, 2]"],
      ["Reverse suffix", "-", "-", "-", "-", "Reverse nums[3..5] ([5, 3, 2] → [2, 3, 5])", "[1, 2, 4, 2, 3, 5] ✓"]
    ]
  },
  edgeCases: [
    { case: "nums = [3, 2, 1]", expected: "[1, 2, 3]", explanation: "Maximum permutation wraps around to lowest permutation." },
    { case: "nums = [1, 1, 5]", expected: "[1, 5, 1]", explanation: "Duplicates handled properly with strict comparison." },
    { case: "nums = [1]", expected: "[1]", explanation: "Single element remains unchanged." }
  ],
  code: {
    python: `class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
            
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
            
        left, right = i + 1, n - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1`,
    cpp: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};`,
    java: `class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
        }
        reverse(nums, i + 1, n - 1);
    }
    
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }
}`,
    javascript: `var nextPermutation = function(nums) {
    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        const tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    let left = i + 1, right = n - 1;
    while (left < right) {
        const tmp = nums[left];
        nums[left] = nums[right];
        nums[right] = tmp;
        left++;
        right--;
    }
};`
  },
  codeExplanation: {
    python: [
      "Line 4-6: Scan backwards to identify the first descending pivot nums[i] < nums[i + 1].",
      "Line 8-12: If pivot found, scan from end to locate the next greater element nums[j] and swap.",
      "Line 14-18: Reverse the suffix from i + 1 to end to convert descending sequence to ascending."
    ],
    cpp: [
      "Line 5-7: Backward scan locating pivot index i.",
      "Line 8-14: Locate successor index j and swap with pivot.",
      "Line 15: std::reverse suffix starting at i + 1."
    ],
    java: [
      "Line 5-7: Find first index from right where nums[i] < nums[i + 1].",
      "Line 8-16: Swap with rightmost element larger than nums[i].",
      "Line 17: Reverse suffix from i + 1 to end."
    ],
    javascript: [
      "Line 3-6: Locate inversion point i.",
      "Line 7-15: Swap with smallest greater element to its right.",
      "Line 16-23: Two-pointer reverse on suffix."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Using > instead of >= when scanning backwards for pivot, which fails on duplicate values.",
    "Sorting the suffix instead of reversing it (sorting takes O(N log N) while reversing takes O(N) because the suffix is guaranteed descending).",
    "Forgetting to reverse the entire array when the input is fully descending (e.g. [3, 2, 1])."
  ],
  takeaway: "Find rightmost dip nums[i] < nums[i+1], swap with rightmost larger element, and reverse suffix after i.",
  hints: [
    "A decreasing sequence cannot be increased further. Where does the decreasing suffix start when scanning from the right?",
    "Find the first element from the right that breaks the decreasing pattern (call it index i).",
    "Swap it with the next larger number to its right, then reverse everything to the right of i."
  ]
});

// 15. Trapping Rain Water
add({
  id: "arr-tp-15",
  leetcodeNumber: 42,
  title: "Trapping Rain Water",
  difficulty: "Hard",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Dual Boundary Max Tracking",
  leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
  problemUnderstanding: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
  whyItMatters: "Top-tier interview question demonstrating how dynamic boundaries eliminate O(N) auxiliary arrays, achieving O(N) time and O(1) space.",
  patternExplanation: "Water trapped above bar i is determined by min(leftMax, rightMax) - height[i]. With two pointers at opposite ends, if height[left] <= height[right], we know leftMax is the true bottleneck regardless of unseen bars, allowing us to compute water at left immediately.",
  recognitionSignals: [
    "Elevation map or histogram trapping water/fluid",
    "Volume bounded by min(leftMax, rightMax) minus bar height",
    "Opposite ends form exterior container boundaries",
    "O(1) auxiliary space optimization over prefix/suffix arrays"
  ],
  thoughtProcess: "Prefix/suffix max arrays solve this in O(N) space. We can optimize to O(1) space using two pointers left and right. Maintain leftMax and rightMax. If height[left] <= height[right], then leftMax <= rightMax is guaranteed to hold because height[left] is bounded by height[right] <= rightMax. Thus, water at left is determined solely by leftMax - height[left], and we can advance left.",
  approach: [
    "1. Initialize left = 0, right = height.length - 1.",
    "2. Initialize leftMax = 0, rightMax = 0, trapped = 0.",
    "3. While left < right:",
    "   a. If height[left] <= height[right]:",
    "      - If height[left] >= leftMax: update leftMax = height[left].",
    "      - Else: trapped += leftMax - height[left].",
    "      - Increment left++.",
    "   b. Else:",
    "      - If height[right] >= rightMax: update rightMax = height[right].",
    "      - Else: trapped += rightMax - height[right].",
    "      - Decrement right--.",
    "4. Return trapped."
  ],
  algorithm: "left = 0, right = n - 1\nleftMax = 0, rightMax = 0, trapped = 0\nwhile left < right:\n    if height[left] <= height[right]:\n        if height[left] >= leftMax: leftMax = height[left]\n        else: trapped += leftMax - height[left]\n        left += 1\n    else:\n        if height[right] >= rightMax: rightMax = height[right]\n        else: trapped += rightMax - height[right]\n        right -= 1\nreturn trapped",
  pseudocode: `function trap(height):
    left = 0
    right = length(height) - 1
    leftMax = 0
    rightMax = 0
    trapped = 0
    while left < right:
        if height[left] <= height[right]:
            if height[left] >= leftMax:
                leftMax = height[left]
            else:
                trapped = trapped + (leftMax - height[left])
            left = left + 1
        else:
            if height[right] >= rightMax:
                rightMax = height[right]
            else:
                trapped = trapped + (rightMax - height[right])
            right = right - 1
    return trapped`,
  walkthrough: {
    input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
    description: "Two-pointer dual maximum water trapping:",
    tableHeaders: ["left", "right", "h[left]", "h[right]", "leftMax", "rightMax", "Water Added", "trapped"],
    tableRows: [
      ["0", "11", "0", "1", "0", "0", "leftMax = 0", "0"],
      ["1", "11", "1", "1", "1", "0", "leftMax = 1", "0"],
      ["2", "11", "0", "1", "1", "0", "1 - 0 = 1", "1"],
      ["3", "11", "2", "1", "2", "0", "h[left]>h[right] → right switch", "1"],
      ["3", "11", "2", "1", "2", "1", "rightMax = 1", "1"],
      ["3", "10", "2", "2", "2", "2", "rightMax = 2", "1"],
      ["...", "...", "...", "...", "...", "...", "...", "Total = 6 ✓"]
    ]
  },
  edgeCases: [
    { case: "height = [3, 0, 2, 0, 4]", expected: "7", explanation: "Water trapped between interior bars: (3-0)+(3-2)+(3-0) = 3 + 1 + 3 = 7." },
    { case: "height = [1, 2, 3, 4, 5]", expected: "0", explanation: "Strictly increasing slope cannot trap any water." },
    { case: "height = [2, 0, 2]", expected: "2", explanation: "Single valley: min(2, 2) - 0 = 2." }
  ],
  code: {
    python: `class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        left_max, right_max = 0, 0
        trapped = 0
        
        while left < right:
            if height[left] <= height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    trapped += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    trapped += right_max - height[right]
                right -= 1
                
        return trapped`,
    cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int trapped = 0;
        
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    trapped += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    trapped += rightMax - height[right];
                }
                right--;
            }
        }
        return trapped;
    }
};`,
    java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int trapped = 0;
        
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    trapped += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    trapped += rightMax - height[right];
                }
                right--;
            }
        }
        return trapped;
    }
}`,
    javascript: `var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let trapped = 0;
    
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                trapped += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                trapped += rightMax - height[right];
            }
            right--;
        }
    }
    return trapped;
};`
  },
  codeExplanation: {
    python: [
      "Line 3: Outer pointers left = 0 and right = len(height) - 1.",
      "Line 4: Track running left_max and right_max.",
      "Line 7-19: Advance whichever side is smaller, guaranteeing that the bottleneck is known without seeing other bars."
    ],
    cpp: [
      "Line 4: Pointers at extremities.",
      "Line 5-6: Track max heights seen from left and right.",
      "Line 8-24: Add trapped water using the guaranteed bottleneck boundary, moving pointers inward."
    ],
    java: [
      "Line 3: Initialize endpoints.",
      "Line 4-5: Track max bounds.",
      "Line 7-23: Compute water column-by-column in O(1) space."
    ],
    javascript: [
      "Line 2: Pointers at edges.",
      "Line 3-4: Running boundaries.",
      "Line 6-22: Linear convergence aggregating trapped water."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Using two separate O(N) arrays (prefixMax and suffixMax), which consumes O(N) extra space when O(1) is expected in top interviews.",
    "Updating trapped water using the wrong boundary (e.g. rightMax when advancing left).",
    "Adding water when height[left] is greater than leftMax (negative water)."
  ],
  takeaway: "Water height is decided by the shorter boundary; advancing the smaller side allows computing trapped water in O(1) space.",
  hints: [
    "At any position i, how much water can be trapped? Exactly min(max_left, max_right) - height[i].",
    "Can you maintain running max_left and max_right with two pointers from both ends?",
    "If height[left] < height[right], you know for certain that max_left < max_right, so water at left depends only on max_left."
  ]
});

// 16. First Missing Positive
add({
  id: "arr-tp-16",
  leetcodeNumber: 41,
  title: "First Missing Positive",
  difficulty: "Hard",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Cycle Sort / In-Place Index Mapping",
  leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
  problemUnderstanding: "Given an unsorted integer array nums, return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(N) time and uses O(1) auxiliary space.",
  whyItMatters: "Pinnacle in-place array manipulation. Shows how the array itself can be repurposed as its own hash set by placing each number x at index x - 1.",
  patternExplanation: "For an array of length n, the smallest missing positive integer MUST be in the range [1, n + 1]. We can use Cycle Sort to place every number x in 1 <= x <= n at its correct index x - 1. A second linear scan identifies the first index where nums[i] != i + 1.",
  recognitionSignals: [
    "Smallest missing positive integer in an unsorted array",
    "Strict O(N) runtime constraint",
    "Strict O(1) auxiliary space constraint (hash set forbidden)",
    "Pigeonhole principle: answer is strictly bounded in [1, n + 1]"
  ],
  thoughtProcess: "Using a hash set takes O(N) space. Sorting takes O(N log N) time. The key observation is that an array of size n can at most hold all numbers from 1 to n. If all numbers 1 to n are present, the answer is n + 1. Otherwise, the answer is the first missing integer in [1, n]. We place each valid number nums[i] into its home index nums[i] - 1 by swapping. Each swap places at least one number in its permanent position, taking O(N) total swaps.",
  approach: [
    "1. Traverse nums with index i from 0 to n - 1.",
    "2. While nums[i] is positive (1 <= nums[i] <= n) and not already at its correct position (nums[nums[i] - 1] != nums[i]):",
    "   - Swap nums[i] with nums[nums[i] - 1].",
    "3. After cycle sort, scan nums from index 0 to n - 1.",
    "4. If nums[i] != i + 1, return i + 1 immediately.",
    "5. If all indices match, return n + 1."
  ],
  algorithm: "for i in 0 to n - 1:\n    while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n        swap(nums[i], nums[nums[i] - 1])\nfor i in 0 to n - 1:\n    if nums[i] != i + 1: return i + 1\nreturn n + 1",
  pseudocode: `function firstMissingPositive(nums):
    n = length(nums)
    for i from 0 to n - 1:
        while nums[i] > 0 and nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            targetIdx = nums[i] - 1
            swap(nums[i], nums[targetIdx])
    for i from 0 to n - 1:
        if nums[i] != i + 1:
            return i + 1
    return n + 1`,
  walkthrough: {
    input: "nums = [3, 4, -1, 1]",
    description: "Cycle sort placing x at index x - 1:",
    tableHeaders: ["i", "nums[i]", "Target Index (nums[i] - 1)", "Action", "nums state"],
    tableRows: [
      ["0", "3", "2", "Swap nums[0] and nums[2]", "[-1, 4, 3, 1]"],
      ["0", "-1", "-", "Out of range (< 1) → advance i", "[-1, 4, 3, 1]"],
      ["1", "4", "3", "Swap nums[1] and nums[3]", "[-1, 1, 3, 4]"],
      ["1", "1", "0", "Swap nums[1] and nums[0]", "[1, -1, 3, 4]"],
      ["1", "-1", "-", "Out of range → advance i", "[1, -1, 3, 4]"],
      ["Scan", "-", "-", "Index 1 has value -1 != 2", "Return 2 ✓"]
    ]
  },
  edgeCases: [
    { case: "nums = [1, 2, 0]", expected: "3", explanation: "Numbers 1 and 2 are present; first missing positive is 3." },
    { case: "nums = [7, 8, 9, 11, 12]", expected: "1", explanation: "No values in [1, 5] are present; returns 1 immediately." },
    { case: "nums = [1, 1]", expected: "2", explanation: "Duplicates do not trigger infinite swap loop because nums[nums[i] - 1] != nums[i] check handles identity." }
  ],
  code: {
    python: `class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                correct_idx = nums[i] - 1
                nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
                
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
                
        return n + 1`,
    cpp: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; ++i) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
};`,
    java: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int correctIdx = nums[i] - 1;
                int tmp = nums[i];
                nums[i] = nums[correctIdx];
                nums[correctIdx] = tmp;
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
}`,
    javascript: `var firstMissingPositive = function(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const correctIdx = nums[i] - 1;
            const tmp = nums[i];
            nums[i] = nums[correctIdx];
            nums[correctIdx] = tmp;
        }
    }
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    return n + 1;
};`
  },
  codeExplanation: {
    python: [
      "Line 4-7: Cycle sort loop: swap nums[i] with target location nums[i] - 1 while within range.",
      "Line 9-11: Scan for the first index where value is not index + 1.",
      "Line 13: If all [1...n] match, return n + 1."
    ],
    cpp: [
      "Line 5-7: In-place cycle swapping using std::swap.",
      "Line 9-13: Linear verification pass returning first missing positive.",
      "Line 14: Fallback return n + 1."
    ],
    java: [
      "Line 4-10: Swap elements to home indices.",
      "Line 11-15: Find index discrepancy.",
      "Line 16: Return n + 1."
    ],
    javascript: [
      "Line 3-9: In-place bucket/cycle placement.",
      "Line 10-14: Search for mismatched index.",
      "Line 15: Return n + 1."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Using an 'if' instead of 'while' when swapping, which fails to place newly swapped numbers at their correct positions.",
    "Checking nums[i] != i + 1 instead of nums[nums[i] - 1] != nums[i], causing infinite loops on duplicate numbers (e.g. [1, 1]).",
    "Index out of bounds when accessing nums[nums[i] - 1] without checking 1 <= nums[i] <= n first."
  ],
  takeaway: "By using cycle sort to place each number x at index x - 1, we turn the input array into an in-place hash map.",
  hints: [
    "For an array of length n, what is the maximum possible value the first missing positive could be? (At most n + 1).",
    "Can you use the array itself as a hash table by placing value x at index x - 1?",
    "Use a while loop with swapping to put each number in [1, n] at its correct index, then find the first mismatch."
  ]
});

// 17. Maximum Score of a Good Subarray
add({
  id: "arr-tp-17",
  leetcodeNumber: 1793,
  title: "Maximum Score of a Good Subarray",
  difficulty: "Hard",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Greedy Outward Expansion",
  leetcodeUrl: "https://leetcode.com/problems/maximum-score-of-a-good-subarray/",
  problemUnderstanding: "You are given an array of integers nums (0-indexed) and an integer k. The score of a subarray (i, j) is min(nums[i...j]) * (j - i + 1). A good subarray is one where i <= k <= j. Return the maximum possible score of a good subarray.",
  whyItMatters: "Demonstrates greedy two-pointer expansion outward from a fixed seed index, avoiding O(N) monotonic stack overhead.",
  patternExplanation: "Start at index k with left = k and right = k. To maximize min(nums[left...right]) * (right - left + 1), at each step expand the pointer that points to the larger adjacent element. This greedily preserves the highest possible minimum value as width grows.",
  recognitionSignals: [
    "Subarray must include a specific anchor index k (i <= k <= j)",
    "Score function involves min(subarray) * length",
    "Requires optimization from O(N^2) brute force to linear O(N)"
  ],
  thoughtProcess: "A brute force expansion checking all subarrays containing k takes O(N^2). We can start with a 1-element window at index k (score = nums[k]). At each step, we expand either left or right. To maximize min(subarray), we look at nums[left - 1] and nums[right + 1]. Expanding into the larger adjacent value is always optimal because expanding into the smaller value strictly degrades or limits the minimum sooner.",
  approach: [
    "1. Initialize left = k, right = k, curMin = nums[k], and maxScore = nums[k].",
    "2. While left > 0 or right < n - 1:",
    "   a. If left == 0, expand right++.",
    "   b. Else if right == n - 1, expand left--.",
    "   c. Else if nums[left - 1] < nums[right + 1], expand right++.",
    "   d. Else expand left--.",
    "   e. Update curMin = min({curMin, nums[left], nums[right]}).",
    "   f. Update maxScore = max(maxScore, curMin * (right - left + 1)).",
    "3. Return maxScore."
  ],
  algorithm: "left = k, right = k, curMin = nums[k], maxScore = nums[k]\nwhile left > 0 or right < n - 1:\n    if left == 0: right += 1\n    elif right == n - 1: left -= 1\n    elif nums[left - 1] < nums[right + 1]: right += 1\n    else: left -= 1\n    curMin = min(curMin, nums[left], nums[right])\n    maxScore = max(maxScore, curMin * (right - left + 1))\nreturn maxScore",
  pseudocode: `function maximumScore(nums, k):
    n = length(nums)
    left = k
    right = k
    curMin = nums[k]
    maxScore = nums[k]
    while left > 0 or right < n - 1:
        if left == 0:
            right = right + 1
        else if right == n - 1:
            left = left - 1
        else if nums[left - 1] < nums[right + 1]:
            right = right + 1
        else:
            left = left - 1
        curMin = min(curMin, nums[left], nums[right])
        maxScore = max(maxScore, curMin * (right - left + 1))
    return maxScore`,
  walkthrough: {
    input: "nums = [1, 4, 3, 7, 4, 5], k = 3",
    description: "Greedy outward expansion from anchor k = 3 (nums[3] = 7):",
    tableHeaders: ["left", "right", "left neighbor", "right neighbor", "Expanded", "curMin", "Length", "Score"],
    tableRows: [
      ["3", "3", "3 (idx 2)", "4 (idx 4)", "Initial at k", "7", "1", "7 * 1 = 7"],
      ["3", "4", "3 (idx 2)", "5 (idx 5)", "right++ (4 > 3)", "4", "2", "4 * 2 = 8"],
      ["3", "5", "3 (idx 2)", "None", "right++ (5 > 3)", "4", "3", "4 * 3 = 12"],
      ["2", "5", "4 (idx 1)", "None", "left--", "3", "4", "3 * 4 = 12"],
      ["1", "5", "1 (idx 0)", "None", "left--", "3", "5", "3 * 5 = 15 ✓"],
      ["0", "5", "None", "None", "left--", "1", "6", "1 * 6 = 6"]
    ]
  },
  edgeCases: [
    { case: "nums = [5, 5, 4, 5, 4, 1, 1, 1], k = 0", expected: "20", explanation: "k is at index 0; expands only to the right." },
    { case: "nums = [65535], k = 0", expected: "65535", explanation: "Single element array returns nums[0]." },
    { case: "nums = [1, 1, 1, 1], k = 2", expected: "4", explanation: "Equal values expand smoothly across entire array." }
  ],
  code: {
    python: `class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        n = len(nums)
        left = right = k
        cur_min = nums[k]
        max_score = nums[k]
        
        while left > 0 or right < n - 1:
            if left == 0:
                right += 1
            elif right == n - 1:
                left -= 1
            elif nums[left - 1] < nums[right + 1]:
                right += 1
            else:
                left -= 1
            cur_min = min(cur_min, nums[left], nums[right])
            max_score = max(max_score, cur_min * (right - left + 1))
            
        return max_score`,
    cpp: `class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size();
        int left = k, right = k;
        int curMin = nums[k];
        int maxScore = nums[k];
        
        while (left > 0 || right < n - 1) {
            if (left == 0) {
                right++;
            } else if (right == n - 1) {
                left--;
            } else if (nums[left - 1] < nums[right + 1]) {
                right++;
            } else {
                left--;
            }
            curMin = min({curMin, nums[left], nums[right]});
            maxScore = max(maxScore, curMin * (right - left + 1));
        }
        return maxScore;
    }
};`,
    java: `class Solution {
    public int maximumScore(int[] nums, int k) {
        int n = nums.length;
        int left = k, right = k;
        int curMin = nums[k];
        int maxScore = nums[k];
        
        while (left > 0 || right < n - 1) {
            if (left == 0) {
                right++;
            } else if (right == n - 1) {
                left--;
            } else if (nums[left - 1] < nums[right + 1]) {
                right++;
            } else {
                left--;
            }
            curMin = Math.min(curMin, Math.min(nums[left], nums[right]));
            maxScore = Math.max(maxScore, curMin * (right - left + 1));
        }
        return maxScore;
    }
}`,
    javascript: `var maximumScore = function(nums, k) {
    const n = nums.length;
    let left = k, right = k;
    let curMin = nums[k];
    let maxScore = nums[k];
    
    while (left > 0 || right < n - 1) {
        if (left === 0) {
            right++;
        } else if (right === n - 1) {
            left--;
        } else if (nums[left - 1] < nums[right + 1]) {
            right++;
        } else {
            left--;
        }
        curMin = Math.min(curMin, nums[left], nums[right]);
        maxScore = Math.max(maxScore, curMin * (right - left + 1));
    }
    return maxScore;
};`
  },
  codeExplanation: {
    python: [
      "Line 3: Set anchor pointers left = k and right = k.",
      "Line 7-16: Greedily expand outward into whichever neighbor is larger.",
      "Line 17-18: Update running minimum and score = cur_min * length."
    ],
    cpp: [
      "Line 4-6: Anchor at index k.",
      "Line 9-19: Compare adjacent boundary values and step outward.",
      "Line 20-21: Update curMin and maxScore."
    ],
    java: [
      "Line 3-6: Setup anchor pointers and base values.",
      "Line 8-20: Greedy outward traversal checking left and right neighbors.",
      "Line 21: Return maxScore."
    ],
    javascript: [
      "Line 3-5: Start with window containing single element nums[k].",
      "Line 7-18: Expand towards larger neighbor, tracking product score."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Expanding towards the smaller neighbor, which needlessly degrades the minimum value prematurely.",
    "Not handling boundary conditions when one pointer hits index 0 or n - 1.",
    "Using a monotonic stack which requires O(N) auxiliary space, when two pointers achieves O(1) space."
  ],
  takeaway: "Greedily expand outward from index k into the larger adjacent neighbor to maintain the highest possible minimum value.",
  hints: [
    "Start with the smallest valid subarray: the single element at index k.",
    "At each step, you can expand either left or right. Which direction should you choose?",
    "Always expand towards the larger adjacent element to keep the minimum as large as possible."
  ]
});

// Write to array.js
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
console.log("Updated array.js! Total registered problems: " + Object.keys(existing).length);
