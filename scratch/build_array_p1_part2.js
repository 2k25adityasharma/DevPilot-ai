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

// 9. 3Sum Closest
add({
  id: "arr-tp-09",
  leetcodeNumber: 16,
  title: "3Sum Closest",
  difficulty: "Medium",
  category: "Array",
  categoryId: "array",
  pattern: "Sorting + Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Multi-Pointer Sum Search",
  leetcodeUrl: "https://leetcode.com/problems/3sum-closest/",
  problemUnderstanding: "Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume each input would have exactly one solution.",
  whyItMatters: "Demonstrates how two pointers can optimize an approximation problem over sorted intervals by tracking the minimum difference rather than exact zero.",
  patternExplanation: "Sorting nums lets us fix nums[i] and use two pointers (left and right) for the remaining pair. If current sum < target, incrementing left is the only way to increase the sum and potentially get closer. If current sum > target, decrementing right is the only way to decrease it.",
  recognitionSignals: [
    "Finding three elements whose sum minimizes |sum - target|",
    "Array can be sorted without violating problem requirements",
    "Return the sum itself, not the indices",
    "Requires reduction from cubic O(N^3) to quadratic O(N^2)"
  ],
  thoughtProcess: "A brute-force evaluation of all triplets takes O(N^3). By sorting the array first, we can iterate through each candidate index i, and use opposing two pointers left and right on the rest of the array. At each step, we update closestSum if abs(target - currentSum) < abs(target - closestSum). If currentSum is smaller than target, we need a larger value, so left advances; otherwise right decreases.",
  approach: [
    "1. Sort nums in non-decreasing order.",
    "2. Initialize closestSum with nums[0] + nums[1] + nums[2].",
    "3. Loop i from 0 to nums.length - 3.",
    "4. Set left = i + 1 and right = nums.length - 1.",
    "5. While left < right, calculate sum = nums[i] + nums[left] + nums[right].",
    "6. If sum == target, return target immediately (distance 0 is optimal).",
    "7. If abs(target - sum) < abs(target - closestSum), update closestSum = sum.",
    "8. If sum < target, advance left++. If sum > target, decrement right--.",
    "9. Return closestSum."
  ],
  algorithm: "sort(nums)\nclosest = nums[0] + nums[1] + nums[2]\nfor i in 0 to len(nums)-3:\n    left = i + 1, right = len(nums) - 1\n    while left < right:\n        sum = nums[i] + nums[left] + nums[right]\n        if abs(target - sum) < abs(target - closest): closest = sum\n        if sum < target: left += 1\n        else if sum > target: right -= 1\n        else: return target\nreturn closest",
  pseudocode: `function threeSumClosest(nums, target):
    sort(nums)
    closest = nums[0] + nums[1] + nums[2]
    n = length(nums)
    for i from 0 to n - 3:
        left = i + 1
        right = n - 1
        while left < right:
            sum = nums[i] + nums[left] + nums[right]
            if sum == target:
                return target
            if abs(target - sum) < abs(target - closest):
                closest = sum
            if sum < target:
                left = left + 1
            else:
                right = right - 1
    return closest`,
  walkthrough: {
    input: "nums = [-1, 2, 1, -4], target = 1",
    description: "Sorted nums: [-4, -1, 1, 2]",
    tableHeaders: ["i", "left", "right", "Triplet", "Sum", "|1 - Sum|", "closestSum", "Action"],
    tableRows: [
      ["0 (-4)", "1 (-1)", "3 (2)", "[-4, -1, 2]", "-3", "4", "-3", "Sum < 1 → left++"],
      ["0 (-4)", "2 (1)", "3 (2)", "[-4, 1, 2]", "-1", "2", "-1", "Sum < 1 → left++ (ends pair)"],
      ["1 (-1)", "2 (1)", "3 (2)", "[-1, 1, 2]", "2", "1", "2", "Sum > 1 → right-- (|1-2|=1 is closest)"]
    ]
  },
  edgeCases: [
    { case: "nums = [0, 0, 0], target = 1", expected: "0", explanation: "Only one triplet exists; sum is 0, difference is 1." },
    { case: "nums = [1, 1, 1], target = 3", expected: "3", explanation: "Exact match found on initial check." },
    { case: "nums = [-3, -2, -5, 3, -4], target = -1", expected: "-2", explanation: "Negative numbers with closest sum approaching target from below." }
  ],
  code: {
    python: `class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        closest = nums[0] + nums[1] + nums[2]
        n = len(nums)
        for i in range(n - 2):
            left, right = i + 1, n - 1
            while left < right:
                current_sum = nums[i] + nums[left] + nums[right]
                if current_sum == target:
                    return target
                if abs(target - current_sum) < abs(target - closest):
                    closest = current_sum
                if current_sum < target:
                    left += 1
                else:
                    right -= 1
        return closest`,
    cpp: `class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int closest = nums[0] + nums[1] + nums[2];
        int n = nums.size();
        for (int i = 0; i < n - 2; ++i) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == target) return target;
                if (abs(target - sum) < abs(target - closest)) {
                    closest = sum;
                }
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return closest;
    }
};`,
    java: `class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int closest = nums[0] + nums[1] + nums[2];
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == target) return target;
                if (Math.abs(target - sum) < Math.abs(target - closest)) {
                    closest = sum;
                }
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return closest;
    }
}`,
    javascript: `var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    let closest = nums[0] + nums[1] + nums[2];
    const n = nums.length;
    for (let i = 0; i < n - 2; i++) {
        let left = i + 1, right = n - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === target) return target;
            if (Math.abs(target - sum) < Math.abs(target - closest)) {
                closest = sum;
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return closest;
};`
  },
  codeExplanation: {
    python: [
      "Line 3: Sort nums ascending to enable monotonic pointer traversal.",
      "Line 4: Initialize closest with the sum of the first three numbers.",
      "Line 7-16: Loop i and converge two pointers; return immediately if current_sum == target, else update closest."
    ],
    cpp: [
      "Line 4: Sort vector nums.",
      "Line 5: Set initial closest sum.",
      "Line 7-19: Iterate outer index i with nested two-pointer scan, adjusting bounds based on sum comparison."
    ],
    java: [
      "Line 3: Arrays.sort(nums).",
      "Line 4: Set initial baseline sum.",
      "Line 7-19: Track minimal absolute distance with Math.abs()."
    ],
    javascript: [
      "Line 2: Numeric ascending sort.",
      "Line 3: Baseline initialization of closest.",
      "Line 6-18: Two-pointer convergence checking distance to target."
    ]
  },
  timeComplexity: "O(N^2)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Returning the distance abs(target - sum) instead of the actual sum.",
    "Initializing closest with 0, which gives wrong results when all triplets have positive or negative sums far from 0.",
    "Not stopping immediately when sum == target is encountered."
  ],
  takeaway: "Sorting plus two pointers allows finding the closest approximate triplet sum in O(N^2) time and O(1) space.",
  hints: [
    "Just like 3Sum, what happens if you sort the array and fix the first number?",
    "Use two pointers for the remaining pair to move closer to the target.",
    "If the sum is smaller than target, increment left; if greater, decrement right; track the closest sum seen."
  ]
});

// 10. 4Sum
add({
  id: "arr-tp-10",
  leetcodeNumber: 18,
  title: "4Sum",
  difficulty: "Medium",
  category: "Array",
  categoryId: "array",
  pattern: "Sorting + Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Multi-Pointer Sum Search",
  leetcodeUrl: "https://leetcode.com/problems/4sum/",
  problemUnderstanding: "Given an array nums of n integers, return an array of all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that the four indices are distinct and their sum equals target. The solution set must not contain duplicate quadruplets.",
  whyItMatters: "Generalizes the Two Sum / 3Sum pattern to K-Sum. It emphasizes handling 32-bit integer overflow in intermediate additions and hierarchical duplicate skipping.",
  patternExplanation: "Sort the array. Fix the first two elements with nested loops (i and j), and use two pointers (left and right) for the remaining two elements. This reduces O(N^4) brute force to O(N^3).",
  recognitionSignals: [
    "Finding four elements that sum to a target value",
    "Duplicate quadruplets are forbidden",
    "Large numbers in constraints that can overflow 32-bit signed integers during summation",
    "Extension of the 3Sum two-pointer technique"
  ],
  thoughtProcess: "A brute force check over four nested loops requires O(N^4) operations. By sorting the array, we fix nums[i] in the first loop and nums[j] in the second loop. The remaining problem is finding two numbers in nums[j+1...n-1] that sum to target - nums[i] - nums[j]. We solve this with two pointers in O(N) time, yielding O(N^3) overall.",
  approach: [
    "1. Sort nums in ascending order.",
    "2. Outer loop i from 0 to n - 4. Skip duplicates if i > 0 and nums[i] == nums[i - 1].",
    "3. Inner loop j from i + 1 to n - 3. Skip duplicates if j > i + 1 and nums[j] == nums[j - 1].",
    "4. Set left = j + 1 and right = n - 1.",
    "5. Compute 64-bit sum = (long long)nums[i] + nums[j] + nums[left] + nums[right].",
    "6. If sum == target, record quadruplet and skip adjacent duplicates for left and right.",
    "7. If sum < target, left++; if sum > target, right--.",
    "8. Return result list."
  ],
  algorithm: "sort(nums)\nfor i in 0 to n-4:\n    if i > 0 and nums[i] == nums[i-1]: continue\n    for j in i+1 to n-3:\n        if j > i+1 and nums[j] == nums[j-1]: continue\n        left = j + 1, right = n - 1\n        while left < right:\n            sum = nums[i] + nums[j] + nums[left] + nums[right]\n            if sum == target:\n                res.append([nums[i], nums[j], nums[left], nums[right]])\n                skip duplicates for left and right\n                left += 1; right -= 1\n            else if sum < target: left += 1\n            else: right -= 1\nreturn res",
  pseudocode: `function fourSum(nums, target):
    sort(nums)
    res = []
    n = length(nums)
    for i from 0 to n - 4:
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j from i + 1 to n - 3:
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            left = j + 1
            right = n - 1
            while left < right:
                sum = cast_to_long(nums[i]) + nums[j] + nums[left] + nums[right]
                if sum == target:
                    res.append([nums[i], nums[j], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]: left = left + 1
                    while left < right and nums[right] == nums[right - 1]: right = right - 1
                    left = left + 1
                    right = right - 1
                else if sum < target:
                    left = left + 1
                else:
                    right = right - 1
    return res`,
  walkthrough: {
    input: "nums = [1, 0, -1, 0, -2, 2], target = 0",
    description: "Sorted nums: [-2, -1, 0, 0, 1, 2]",
    tableHeaders: ["i", "j", "left", "right", "Quadruplet", "Sum", "Action"],
    tableRows: [
      ["0 (-2)", "1 (-1)", "2 (0)", "5 (2)", "[-2, -1, 0, 2]", "-1", "Sum < 0 → left++"],
      ["0 (-2)", "1 (-1)", "4 (1)", "5 (2)", "[-2, -1, 1, 2]", "0", "Match! Record [-2, -1, 1, 2]"],
      ["0 (-2)", "2 (0)", "3 (0)", "5 (2)", "[-2, 0, 0, 2]", "0", "Match! Record [-2, 0, 0, 2]"],
      ["1 (-1)", "2 (0)", "3 (0)", "4 (1)", "[-1, 0, 0, 1]", "0", "Match! Record [-1, 0, 0, 1]"]
    ]
  },
  edgeCases: [
    { case: "nums = [1000000000, 1000000000, 1000000000, 1000000000], target = -294967296", expected: "[]", explanation: "Sum exceeds 32-bit signed integer limits; 64-bit casting prevents incorrect overflow match." },
    { case: "nums = [2, 2, 2, 2, 2], target = 8", expected: "[[2, 2, 2, 2]]", explanation: "Multiple duplicates yield exactly one unique quadruplet." },
    { case: "nums = [1, 2, 3], target = 6", expected: "[]", explanation: "Fewer than 4 elements immediately returns empty array." }
  ],
  code: {
    python: `class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        res = []
        n = len(nums)
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                left, right = j + 1, n - 1
                while left < right:
                    total = nums[i] + nums[j] + nums[left] + nums[right]
                    if total == target:
                        res.append([nums[i], nums[j], nums[left], nums[right]])
                        while left < right and nums[left] == nums[left + 1]:
                            left += 1
                        while left < right and nums[right] == nums[right - 1]:
                            right -= 1
                        left += 1
                        right -= 1
                    elif total < target:
                        left += 1
                    else:
                        right -= 1
        return res`,
    cpp: `class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n - 3; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; ++j) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.push_back({nums[i], nums[j], nums[left], nums[right]});
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
};`,
    java: `class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
}`,
    javascript: `var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    const res = [];
    const n = nums.length;
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            let left = j + 1, right = n - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return res;
};`
  },
  codeExplanation: {
    python: [
      "Line 3: Sort nums ascending.",
      "Line 6-7: Skip duplicate fixed first element nums[i].",
      "Line 9-10: Skip duplicate fixed second element nums[j].",
      "Line 12-25: Two-pointer search for the remaining pair with duplicate elimination."
    ],
    cpp: [
      "Line 4: Sort vector nums.",
      "Line 7 & 10: Hierarchical duplicate skips for indices i and j.",
      "Line 13: Cast to 64-bit integer 'long long sum' to avoid 32-bit overflow.",
      "Line 14-22: Standard two-pointer inner scan inserting quadruplets."
    ],
    java: [
      "Line 3: Sort primitive array.",
      "Line 6 & 9: Skip duplicate values for outer loops.",
      "Line 12: Use long sum = (long) nums[i] + nums[j] + nums[left] + nums[right] for overflow safety.",
      "Line 13-22: Two-pointer convergence."
    ],
    javascript: [
      "Line 2: Numeric sort (a, b) => a - b.",
      "Line 6 & 9: Guard clauses preventing repeated quadruplet sets.",
      "Line 12-23: Two pointers finding matching pairs."
    ]
  },
  timeComplexity: "O(N^3)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "32-bit integer arithmetic overflow when adding four numbers whose sum exceeds INT_MAX or drops below INT_MIN.",
    "Only skipping duplicates for the outer loop i but forgetting to skip duplicates for j, leading to repeated quadruplets.",
    "Forgetting to advance both left and right after recording a match."
  ],
  takeaway: "By sorting and nesting loops, K-Sum problems reduce hierarchically to Two Sum in O(N^(K-1)) time.",
  hints: [
    "How can you extend the 3Sum strategy of fixing one number and using two pointers?",
    "Fix two numbers with two nested loops, then use two pointers for the remaining pair.",
    "Watch out for integer overflow when summing four large integers—use 64-bit integers."
  ]
});

// 11. Container With Most Water
add({
  id: "arr-tp-11",
  leetcodeNumber: 11,
  title: "Container With Most Water",
  difficulty: "Medium",
  category: "Array",
  categoryId: "array",
  pattern: "Two Pointers",
  patternId: "array-two-pointers",
  subPattern: "Greedy Boundary Shrinking",
  leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
  problemUnderstanding: "Given an integer array height of length n where each element represents a vertical line of height height[i], find two lines that together with the x-axis form a container that stores the most water. Return the maximum amount of water a container can store.",
  whyItMatters: "Classic demonstration of a greedy two-pointer strategy. Proves that shrinking the shorter boundary can never miss an optimal solution.",
  patternExplanation: "Area = min(height[left], height[right]) * (right - left). Since moving either pointer inward decreases the width (right - left), the only possibility of finding a larger area is increasing the bottleneck min(height[left], height[right]). Therefore, we must greedily advance the shorter line.",
  recognitionSignals: [
    "Finding an optimal pair maximizing an area or volume calculation",
    "Formula is bounded by min(A, B) * distance(A, B)",
    "Width is maximized at the extreme outer ends",
    "Linear O(N) runtime required, eliminating O(N^2) pair checks"
  ],
  thoughtProcess: "A brute force check tests all O(N^2) pairs of lines. We observe that starting with left = 0 and right = n - 1 gives maximum possible width. The area is constrained by the shorter of the two lines. Moving the taller line inward only reduces width while the height cannot exceed the current shorter line, so the area is strictly smaller. Thus, the only move that could improve area is advancing the shorter line.",
  approach: [
    "1. Initialize left = 0, right = height.length - 1, and maxWater = 0.",
    "2. While left < right, calculate current width w = right - left.",
    "3. Determine height bottleneck h = min(height[left], height[right]).",
    "4. Update maxWater = max(maxWater, w * h).",
    "5. If height[left] < height[right], advance left++.",
    "6. Otherwise, decrement right--.",
    "7. Return maxWater."
  ],
  algorithm: "left = 0, right = n - 1, maxWater = 0\nwhile left < right:\n    w = right - left\n    h = min(height[left], height[right])\n    maxWater = max(maxWater, w * h)\n    if height[left] < height[right]: left += 1\n    else: right -= 1\nreturn maxWater",
  pseudocode: `function maxArea(height):
    left = 0
    right = length(height) - 1
    maxWater = 0
    while left < right:
        w = right - left
        h = min(height[left], height[right])
        maxWater = max(maxWater, w * h)
        if height[left] < height[right]:
            left = left + 1
        else:
            right = right - 1
    return maxWater`,
  walkthrough: {
    input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
    description: "Greedy shrinkage of shorter boundary:",
    tableHeaders: ["left", "right", "height[left]", "height[right]", "Width", "Area", "Action"],
    tableRows: [
      ["0", "8", "1", "7", "8", "min(1,7)*8 = 8", "height[0] < height[8] → left++"],
      ["1", "8", "8", "7", "7", "min(8,7)*7 = 49", "height[8] < height[1] → right--"],
      ["1", "7", "8", "3", "6", "min(8,3)*6 = 18", "height[7] < height[1] → right--"],
      ["1", "6", "8", "8", "5", "min(8,8)*5 = 40", "height[6] <= height[1] → right--"],
      ["...", "...", "...", "...", "...", "...", "Maximum area remains 49 ✓"]
    ]
  },
  edgeCases: [
    { case: "height = [1, 1]", expected: "1", explanation: "Smallest valid input (n = 2) with equal heights: 1 * 1 = 1." },
    { case: "height = [4, 3, 2, 1, 4]", expected: "16", explanation: "Tall lines at outer boundaries give optimal area: 4 * 4 = 16." },
    { case: "height = [1, 2, 1]", expected: "2", explanation: "Short array with peak in middle: min(1, 1)*2 = 2 or min(2, 1)*1 = 1." }
  ],
  code: {
    python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_water = 0
        while left < right:
            w = right - left
            h = min(height[left], height[right])
            max_water = max(max_water, w * h)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_water`,
    cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxWater = 0;
        while (left < right) {
            int w = right - left;
            int h = min(height[left], height[right]);
            maxWater = max(maxWater, w * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
};`,
    java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        while (left < right) {
            int w = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, w * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
}`,
    javascript: `var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    while (left < right) {
        const w = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, w * h);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
};`
  },
  codeExplanation: {
    python: [
      "Line 3: Set left pointer at 0 and right pointer at len(height) - 1.",
      "Line 4: Track max_water initialized to 0.",
      "Line 5-8: Calculate rectangle bounded by min height, updating maximum.",
      "Line 9-12: Greedily advance the pointer with smaller height inward."
    ],
    cpp: [
      "Line 4: Set outer endpoints left = 0 and right = height.size() - 1.",
      "Line 5: maxWater tracks optimal capacity.",
      "Line 6-15: Shrink inward by advancing whichever side is shorter."
    ],
    java: [
      "Line 3: Boundary pointers left and right.",
      "Line 5-14: Area calculation using Math.min and Math.max.",
      "Line 15: Return maxWater."
    ],
    javascript: [
      "Line 2: Outer pointers left and right.",
      "Line 4-13: Inward greedy movement discarding shorter barrier.",
      "Line 14: Return maxWater."
    ]
  },
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  commonMistakes: [
    "Moving the taller line instead of the shorter line, which guarantees a smaller area.",
    "Attempting to sort the heights, which destroys the original x-axis coordinate positions.",
    "Using left <= right, which calculates 0 area when left == right and does unnecessary work."
  ],
  takeaway: "The container area is bounded by the shorter line; to find a larger area with smaller width, you must replace the shorter line.",
  hints: [
    "Start with the widest possible container using the first and last lines.",
    "The area is limited by the shorter of the two lines.",
    "If you move the taller line inward, the width decreases and the height cannot increase—so you must move the shorter line."
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
