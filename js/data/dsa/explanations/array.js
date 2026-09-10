/**
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

  const arrayExplanations = {
  "arr-tp-01": {
    "id": "arr-tp-01",
    "leetcodeNumber": 1,
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Hash Map / Complement Lookup",
    "patternId": "array-two-pointers",
    "subPattern": "Complement Lookup",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
    "problemUnderstanding": "Given an integer array nums and an integer target, find the exact two distinct indices whose values sum up to target. You may not use the same element twice.",
    "whyItMatters": "Two Sum is the foundational interview problem illustrating time-space tradeoffs. It teaches how substituting a nested O(N^2) pairwise search with an O(1) hash map lookup dramatically improves runtime to linear O(N).",
    "patternExplanation": "Although placed in array fundamentals, the optimal pattern is Complement Lookup via Hash Map. For any current element x, the required complement is uniquely determined as (target - x). By querying a hash map of previously visited values in O(1) average time, we find our pair in a single pass.",
    "recognitionSignals": [
      "Finding two elements that satisfy a linear sum equation (A + B = Target)",
      "Indices must be returned from an unsorted collection without modifying order",
      "Need faster runtime than quadratic brute force O(N^2)",
      "The complement (target - current) can be computed in constant time"
    ],
    "thoughtProcess": "A brute-force scan checks every pair (i, j) with two nested loops in O(N^2) time. We observe that for each element x, the partner we need is fixed: target - x. Instead of scanning the remaining array repeatedly, we store each visited number and its index in a hash map, converting the pair discovery into constant-time lookups.",
    "approach": [
      "1. Initialize an empty hash map 'seen' mapping number value to its array index.",
      "2. Iterate through nums with index i from 0 to n - 1.",
      "3. Compute complement = target - nums[i].",
      "4. If complement exists in 'seen', return its stored index and current index i.",
      "5. Otherwise, record seen[nums[i]] = i and continue.",
      "6. If loop finishes with no match, return an empty array."
    ],
    "algorithm": "seen = {}\nfor i in 0 to len(nums)-1:\n    comp = target - nums[i]\n    if comp in seen:\n        return [seen[comp], i]\n    seen[nums[i]] = i\nreturn []",
    "pseudocode": "function twoSum(nums, target):\n    seen = empty hash map\n    for i from 0 to length(nums) - 1:\n        complement = target - nums[i]\n        if complement in seen:\n            return [seen[complement], i]\n        seen[nums[i]] = i\n    return []",
    "walkthrough": {
      "input": "nums = [2, 7, 11, 15], target = 9",
      "description": "Step-by-step lookup of complement in hash map:",
      "tableHeaders": [
        "i",
        "nums[i]",
        "Complement (9 - nums[i])",
        "Seen Map",
        "Action"
      ],
      "tableRows": [
        [
          "0",
          "2",
          "7",
          "{}",
          "7 not in map → insert seen[2] = 0"
        ],
        [
          "1",
          "7",
          "2",
          "{2: 0}",
          "2 in map! → match found at indices [0, 1]"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [3, 3], target = 6",
        "expected": "[0, 1]",
        "explanation": "Duplicate values are correctly matched because complement 3 is found before second 3 overwrites the map."
      },
      {
        "case": "nums = [-1, -2, -3, -4, -5], target = -8",
        "expected": "[2, 4]",
        "explanation": "Negative values are supported naturally via algebraic subtraction."
      },
      {
        "case": "nums = [0, 4, 3, 0], target = 0",
        "expected": "[0, 3]",
        "explanation": "Zero complement matches zero without self-pairing."
      }
    ],
    "code": {
      "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in seen:\n                return [seen[complement], i]\n            seen[num] = i\n        return []",
      "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (seen.find(complement) != seen.end()) {\n                return {seen[complement], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) {\n                return new int[] { seen.get(complement), i };\n            }\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}",
      "javascript": "var twoSum = function(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (seen.has(complement)) {\n            return [seen.get(complement), i];\n        }\n        seen.set(nums[i], i);\n    }\n    return [];\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Initialize dictionary 'seen' to store value-to-index associations.",
        "Line 4: Enumerate nums to access both index and value simultaneously.",
        "Line 5: Calculate the required counterpart 'complement = target - num'.",
        "Line 6-7: If counterpart exists in 'seen', return its stored index and current index i.",
        "Line 8: Store current number and index into seen for future lookups."
      ],
      "cpp": [
        "Line 4: Declare unordered_map<int, int> seen for O(1) average hash lookups.",
        "Line 5: Loop through array with standard 0-indexed loop.",
        "Line 6: Compute complement = target - nums[i].",
        "Line 7-9: Check if complement exists; if found, return immediate index pair.",
        "Line 10: Insert current number and index into hash table."
      ],
      "java": [
        "Line 3: Instantiate HashMap<Integer, Integer> seen.",
        "Line 4: Iterate through nums with index i.",
        "Line 5: Compute complement = target - nums[i].",
        "Line 6-8: If seen.containsKey(complement), return integer array with [seen.get(complement), i].",
        "Line 9: Put current value and index into map."
      ],
      "javascript": [
        "Line 2: Instantiate new Map() for fast key-value retrieval.",
        "Line 3: For loop iterating across nums.",
        "Line 4: Compute complement = target - nums[i].",
        "Line 5-7: Query seen.has(complement); if present, return index pair array.",
        "Line 8: Set current element in map with seen.set(nums[i], i)."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "commonMistakes": [
      "Inserting nums[i] into the map BEFORE checking for the complement, which causes an element to pair with itself (e.g. target = 6, nums[0] = 3).",
      "Returning array values instead of original indices.",
      "Assuming array is sorted and applying two pointers without preserving original index mapping."
    ],
    "takeaway": "When solving pair-sum queries, remember target - current. A hash map converts an O(N^2) pairwise search into an O(N) single-pass lookup.",
    "hints": [
      "Instead of checking every pair with nested loops, consider what single value is needed to complete the target sum.",
      "For any number x, the only value that completes the sum is target - x.",
      "Can you store previously seen numbers in a hash map so you can check if target - x exists in O(1) time?"
    ]
  },
  "arr-tp-02": {
    "id": "arr-tp-02",
    "leetcodeNumber": 26,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Slow & Fast Runner",
    "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "problemUnderstanding": "Given an integer array nums sorted in non-decreasing order, remove duplicate elements in-place so that each unique element appears only once. Maintain the relative order of the elements and return the count of unique elements k.",
    "whyItMatters": "Demonstrates in-place array mutation without extra memory allocation. It is the classic example of the Slow/Fast runner two-pointer technique.",
    "patternExplanation": "Since the array is sorted, identical values are grouped contiguously. A fast pointer scans ahead discovering new values, while a slow pointer designates the write position for confirmed unique items.",
    "recognitionSignals": [
      "Array is already sorted in non-decreasing order",
      "Requires in-place modification with O(1) extra space",
      "Contiguous duplicate elements must be compressed",
      "Relative order of unique elements must be maintained"
    ],
    "thoughtProcess": "Creating a new array or hash set takes O(N) extra space, which violates the in-place constraint. Because the array is sorted, duplicates are strictly adjacent. We can maintain a write pointer 'slow' at the last unique element confirmed, and advance a 'fast' reader pointer. Whenever nums[fast] differs from nums[slow], we increment slow and write nums[fast] there.",
    "approach": [
      "1. If nums is empty, return 0.",
      "2. Initialize slow pointer at index 0.",
      "3. Iterate fast pointer from index 1 to n - 1.",
      "4. Compare nums[fast] with nums[slow]. If nums[fast] != nums[slow], increment slow and set nums[slow] = nums[fast].",
      "5. Return slow + 1 as the total number of unique elements."
    ],
    "algorithm": "if nums empty return 0\nslow = 0\nfor fast from 1 to len(nums)-1:\n    if nums[fast] != nums[slow]:\n        slow += 1\n        nums[slow] = nums[fast]\nreturn slow + 1",
    "pseudocode": "function removeDuplicates(nums):\n    if length(nums) == 0:\n        return 0\n    slow = 0\n    for fast from 1 to length(nums) - 1:\n        if nums[fast] != nums[slow]:\n            slow = slow + 1\n            nums[slow] = nums[fast]\n    return slow + 1",
    "walkthrough": {
      "input": "nums = [1, 1, 2]",
      "description": "Slow/Fast pointer step progression:",
      "tableHeaders": [
        "fast",
        "nums[fast]",
        "nums[slow]",
        "Condition (≠)",
        "slow",
        "Array State"
      ],
      "tableRows": [
        [
          "Initial",
          "-",
          "-",
          "-",
          "0",
          "[1, 1, 2]"
        ],
        [
          "1",
          "1",
          "1",
          "False (duplicate)",
          "0",
          "[1, 1, 2]"
        ],
        [
          "2",
          "2",
          "1",
          "True (unique found)",
          "1",
          "[1, 2, 2] (k = 2)"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [1]",
        "expected": "1",
        "explanation": "Single element array has 1 unique element; fast loop does not execute."
      },
      {
        "case": "nums = [1, 1, 1, 1]",
        "expected": "1",
        "explanation": "All elements duplicate; slow stays 0, returns 1."
      },
      {
        "case": "nums = [1, 2, 3, 4]",
        "expected": "4",
        "explanation": "All distinct elements; every element moves slow forward by 1."
      }
    ],
    "code": {
      "python": "class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        if not nums:\n            return 0\n        slow = 0\n        for fast in range(1, len(nums)):\n            if nums[fast] != nums[slow]:\n                slow += 1\n                nums[slow] = nums[fast]\n        return slow + 1",
      "cpp": "class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        int slow = 0;\n        for (int fast = 1; fast < nums.size(); ++fast) {\n            if (nums[fast] != nums[slow]) {\n                nums[++slow] = nums[fast];\n            }\n        }\n        return slow + 1;\n    }\n};",
      "java": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        if (nums.length == 0) return 0;\n        int slow = 0;\n        for (int fast = 1; fast < nums.length; fast++) {\n            if (nums[fast] != nums[slow]) {\n                nums[++slow] = nums[fast];\n            }\n        }\n        return slow + 1;\n    }\n}",
      "javascript": "var removeDuplicates = function(nums) {\n    if (nums.length === 0) return 0;\n    let slow = 0;\n    for (let fast = 1; fast < nums.length; fast++) {\n        if (nums[fast] !== nums[slow]) {\n            nums[++slow] = nums[fast];\n        }\n    }\n    return slow + 1;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3-4: Guard check for empty array.",
        "Line 5: Set write pointer 'slow' at index 0.",
        "Line 6-7: Fast pointer scans from index 1 forward, comparing with current unique tail.",
        "Line 8-9: When a new value is found, advance slow and overwrite nums[slow].",
        "Line 10: Return slow + 1 as count of unique items."
      ],
      "cpp": [
        "Line 3: Guard clause for empty vector.",
        "Line 4: 'slow' tracks index of last written unique element.",
        "Line 5-8: 'fast' reads every element; when nums[fast] != nums[slow], pre-increment slow and overwrite.",
        "Line 9: Return slow + 1."
      ],
      "java": [
        "Line 2: Guard against empty array.",
        "Line 3: Initialize slow write pointer.",
        "Line 4-7: Scan array with fast pointer, updating nums[++slow] on novelty.",
        "Line 8: Return slow + 1."
      ],
      "javascript": [
        "Line 2: Guard for 0 length.",
        "Line 3: Let slow index start at 0.",
        "Line 4-7: For loop traversing fast from 1 to length - 1, rewriting novel elements.",
        "Line 8: Return slow + 1."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Using Array.splice() or vector::erase(), which introduces an O(N) shift per duplicate, leading to O(N^2) total runtime.",
      "Returning slow instead of slow + 1 (off-by-one error since slow is 0-indexed).",
      "Comparing nums[fast] with nums[fast - 1] without properly managing write index."
    ],
    "takeaway": "For in-place duplicate removal in sorted sequences, maintain a slow write pointer and a fast read pointer.",
    "hints": [
      "Notice the array is already sorted, meaning duplicates must be adjacent.",
      "Can one pointer track the boundary of unique elements while another scans forward?",
      "Whenever the scanning pointer sees an element different from the unique boundary, advance the boundary and copy."
    ]
  },
  "arr-tp-03": {
    "id": "arr-tp-03",
    "leetcodeNumber": 27,
    "title": "Remove Element",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "In-Place Overwrite",
    "leetcodeUrl": "https://leetcode.com/problems/remove-element/",
    "problemUnderstanding": "Given an integer array nums and an integer val, remove all occurrences of val in-place. The order of elements can be changed. Return the number of elements in nums which are not equal to val.",
    "whyItMatters": "Tests clean in-place array filtering. It teaches pointer-based partitioning without relying on auxiliary buffers.",
    "patternExplanation": "A slow write pointer 'k' keeps track of where the next non-val element should be placed. A fast reader iterates through nums, copying non-val elements to nums[k].",
    "recognitionSignals": [
      "In-place removal of a specific target value",
      "Element order does not need to be strictly preserved",
      "Space complexity must be strictly O(1)",
      "Return the count k of remaining valid elements"
    ],
    "thoughtProcess": "Deleting elements directly shifts subsequent elements left, costing O(N^2). Instead, we can overwrite unwanted values by maintaining a write index 'k'. Every time we encounter nums[i] != val, we assign nums[k] = nums[i] and increment k. Elements beyond k are ignored.",
    "approach": [
      "1. Initialize pointer k = 0.",
      "2. Iterate i from 0 to nums.length - 1.",
      "3. If nums[i] != val, set nums[k] = nums[i] and increment k.",
      "4. Return k as the count of remaining elements."
    ],
    "algorithm": "k = 0\nfor i from 0 to len(nums)-1:\n    if nums[i] != val:\n        nums[k] = nums[i]\n        k += 1\nreturn k",
    "pseudocode": "function removeElement(nums, val):\n    k = 0\n    for i from 0 to length(nums) - 1:\n        if nums[i] != val:\n            nums[k] = nums[i]\n            k = k + 1\n    return k",
    "walkthrough": {
      "input": "nums = [3, 2, 2, 3], val = 3",
      "description": "Trace of in-place filtering with write pointer k:",
      "tableHeaders": [
        "i",
        "nums[i]",
        "Condition (!= 3)",
        "k before",
        "k after",
        "nums after write"
      ],
      "tableRows": [
        [
          "0",
          "3",
          "False",
          "0",
          "0",
          "[3, 2, 2, 3]"
        ],
        [
          "1",
          "2",
          "True",
          "0",
          "1",
          "[2, 2, 2, 3]"
        ],
        [
          "2",
          "2",
          "True",
          "1",
          "2",
          "[2, 2, 2, 3]"
        ],
        [
          "3",
          "3",
          "False",
          "2",
          "2",
          "[2, 2, 2, 3] (k = 2)"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [], val = 0",
        "expected": "0",
        "explanation": "Empty array returns k = 0."
      },
      {
        "case": "nums = [1, 1, 1], val = 1",
        "expected": "0",
        "explanation": "All elements match val; none are copied, k = 0."
      },
      {
        "case": "nums = [1, 2, 3], val = 4",
        "expected": "3",
        "explanation": "Target val not found; all elements preserved, k = 3."
      }
    ],
    "code": {
      "python": "class Solution:\n    def removeElement(self, nums: List[int], val: int) -> int:\n        k = 0\n        for i in range(len(nums)):\n            if nums[i] != val:\n                nums[k] = nums[i]\n                k += 1\n        return k",
      "cpp": "class Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        int k = 0;\n        for (int i = 0; i < nums.size(); ++i) {\n            if (nums[i] != val) {\n                nums[k++] = nums[i];\n            }\n        }\n        return k;\n    }\n};",
      "java": "class Solution {\n    public int removeElement(int[] nums, int val) {\n        int k = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != val) {\n                nums[k++] = nums[i];\n            }\n        }\n        return k;\n    }\n}",
      "javascript": "var removeElement = function(nums, val) {\n    let k = 0;\n    for (let i = 0; i < nums.length; i++) {\n        if (nums[i] !== val) {\n            nums[k++] = nums[i];\n        }\n    }\n    return k;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Initialize write pointer k = 0.",
        "Line 4-6: Iterate through array; whenever element != val, copy to nums[k] and increment k.",
        "Line 7: Return k."
      ],
      "cpp": [
        "Line 3: Initialize write pointer k to 0.",
        "Line 4-7: For each element not equal to val, write into nums[k++] directly.",
        "Line 8: Return count k."
      ],
      "java": [
        "Line 3: Initialize integer counter k = 0.",
        "Line 4-7: Copy elements not equal to val to index k and increment.",
        "Line 8: Return k."
      ],
      "javascript": [
        "Line 2: Initialize index k = 0.",
        "Line 3-6: Overwrite nums[k++] whenever nums[i] !== val.",
        "Line 7: Return k."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Using splice() inside loop without adjusting index, leading to skipped elements.",
      "Attempting to resize array rather than overwriting valid prefix.",
      "Returning index rather than total count of valid elements."
    ],
    "takeaway": "Maintain a write pointer at the head of the array and copy valid elements forward in a single linear pass.",
    "hints": [
      "You do not need to delete elements physically; you only need to ensure the first k elements contain non-val numbers.",
      "Can a write pointer track the next available slot for a non-val element?",
      "Iterate with a read pointer, and whenever the number is not val, write it at the write pointer."
    ]
  },
  "arr-tp-04": {
    "id": "arr-tp-04",
    "leetcodeNumber": 283,
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "In-Place Partitioning",
    "leetcodeUrl": "https://leetcode.com/problems/move-zeroes/",
    "problemUnderstanding": "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.",
    "whyItMatters": "Standard array partitioning problem. Shows how to pack valid elements to the front while padding the suffix.",
    "patternExplanation": "Use a two-pointer approach where insertPos tracks the location for the next non-zero element. Read through nums; whenever nums[i] != 0, assign nums[insertPos++] = nums[i]. Afterwards, fill from insertPos to end with 0s.",
    "recognitionSignals": [
      "Moving specific values (zeroes) to one end of an array",
      "Relative order of other elements must remain stable",
      "Must be solved in-place with O(1) auxiliary space"
    ],
    "thoughtProcess": "A naive approach collects non-zeroes in a new list, costing O(N) space. By scanning with a reader index and placing non-zeroes sequentially at an insertPos pointer, we compress all non-zeroes to the prefix in order. Finally, we set all indices from insertPos to n - 1 to zero.",
    "approach": [
      "1. Initialize insertPos = 0.",
      "2. Loop through nums with index i from 0 to n - 1.",
      "3. If nums[i] != 0, write nums[insertPos++] = nums[i].",
      "4. After loop, fill all remaining positions from insertPos to n - 1 with 0."
    ],
    "algorithm": "insertPos = 0\nfor i from 0 to len(nums)-1:\n    if nums[i] != 0:\n        nums[insertPos] = nums[i]\n        insertPos += 1\nwhile insertPos < len(nums):\n    nums[insertPos] = 0\n    insertPos += 1",
    "pseudocode": "function moveZeroes(nums):\n    insertPos = 0\n    for i from 0 to length(nums) - 1:\n        if nums[i] != 0:\n            nums[insertPos] = nums[i]\n            insertPos = insertPos + 1\n    while insertPos < length(nums):\n        nums[insertPos] = 0\n        insertPos = insertPos + 1",
    "walkthrough": {
      "input": "nums = [0, 1, 0, 3, 12]",
      "description": "Compressing non-zeroes then padding with zeros:",
      "tableHeaders": [
        "i",
        "nums[i]",
        "Action",
        "insertPos",
        "nums state"
      ],
      "tableRows": [
        [
          "0",
          "0",
          "Skip (is 0)",
          "0",
          "[0, 1, 0, 3, 12]"
        ],
        [
          "1",
          "1",
          "nums[0] = 1",
          "1",
          "[1, 1, 0, 3, 12]"
        ],
        [
          "2",
          "0",
          "Skip (is 0)",
          "1",
          "[1, 1, 0, 3, 12]"
        ],
        [
          "3",
          "3",
          "nums[1] = 3",
          "2",
          "[1, 3, 0, 3, 12]"
        ],
        [
          "4",
          "12",
          "nums[2] = 12",
          "3",
          "[1, 3, 12, 3, 12]"
        ],
        [
          "Pad",
          "-",
          "Set nums[3..4] = 0",
          "5",
          "[1, 3, 12, 0, 0] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [0]",
        "expected": "[0]",
        "explanation": "Single zero stays [0]."
      },
      {
        "case": "nums = [1, 2, 3]",
        "expected": "[1, 2, 3]",
        "explanation": "No zeroes present; array unmodified."
      },
      {
        "case": "nums = [0, 0, 0]",
        "expected": "[0, 0, 0]",
        "explanation": "All zeroes; remains all zeroes."
      }
    ],
    "code": {
      "python": "class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        insert_pos = 0\n        for num in nums:\n            if num != 0:\n                nums[insert_pos] = num\n                insert_pos += 1\n        while insert_pos < len(nums):\n            nums[insert_pos] = 0\n            insert_pos += 1",
      "cpp": "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int insertPos = 0;\n        for (int i = 0; i < nums.size(); ++i) {\n            if (nums[i] != 0) {\n                nums[insertPos++] = nums[i];\n            }\n        }\n        while (insertPos < nums.size()) {\n            nums[insertPos++] = 0;\n        }\n    }\n};",
      "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        int insertPos = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != 0) {\n                nums[insertPos++] = nums[i];\n            }\n        }\n        while (insertPos < nums.length) {\n            nums[insertPos++] = 0;\n        }\n    }\n}",
      "javascript": "var moveZeroes = function(nums) {\n    let insertPos = 0;\n    for (let i = 0; i < nums.length; i++) {\n        if (nums[i] !== 0) {\n            nums[insertPos++] = nums[i];\n        }\n    }\n    while (insertPos < nums.length) {\n        nums[insertPos++] = 0;\n    }\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: insert_pos pointer marks the position where the next non-zero should land.",
        "Line 4-7: Traverse elements, moving non-zero elements into contiguous prefix slots.",
        "Line 8-10: Pad remaining suffix slots with zero."
      ],
      "cpp": [
        "Line 4: insertPos tracks current write position.",
        "Line 5-8: Compact non-zeroes into the front of the vector.",
        "Line 9-11: Zero-fill the rest of the vector up to nums.size()."
      ],
      "java": [
        "Line 3: Set insertPos = 0.",
        "Line 4-7: Write non-zero elements sequentially.",
        "Line 8-10: Set elements from insertPos to end to 0."
      ],
      "javascript": [
        "Line 2: Track insert position with integer insertPos.",
        "Line 3-6: Overwrite prefix with non-zero values in original sequence.",
        "Line 7-9: Fill remaining slots with 0."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Swapping elements unnecessarily when reading elements that are already in place.",
      "Forgetting to zero-fill the tail of the array after compacting non-zeroes.",
      "Creating an auxiliary array, violating the in-place requirement."
    ],
    "takeaway": "Pack non-zero values sequentially into the prefix of the array, then pad the suffix with zeroes.",
    "hints": [
      "Can you first move all non-zero elements to the front of the array in order?",
      "Keep track of the index where the next non-zero should be placed.",
      "After copying all non-zeroes to the front, fill all remaining indices with zeroes."
    ]
  },
  "arr-tp-05": {
    "id": "arr-tp-05",
    "leetcodeNumber": 977,
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Opposing Ends Convergence",
    "leetcodeUrl": "https://leetcode.com/problems/squares-of-a-sorted-array/",
    "problemUnderstanding": "Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    "whyItMatters": "Demonstrates how two pointers converging from both outer ends can construct an ordered output in O(N) time without calling sort() which would cost O(N log N).",
    "patternExplanation": "Negative numbers with large absolute values produce the largest squares at the left end, while large positive numbers produce the largest squares at the right end. The largest squares always originate from either left or right outer boundary.",
    "recognitionSignals": [
      "Input array is already sorted and includes negative numbers",
      "Squaring breaks monotonicity in the middle (parabolic function)",
      "Largest values exist at the extreme outer ends",
      "Requires strictly linear O(N) time"
    ],
    "thoughtProcess": "Squaring each number then sorting takes O(N log N). Because nums is sorted, the largest squares MUST be at either the left extreme (most negative) or right extreme (most positive). By comparing nums[left]^2 with nums[right]^2, we place the larger value at the end of our result array and move inward.",
    "approach": [
      "1. Create a result array of size n, and set pointer idx = n - 1.",
      "2. Initialize left = 0 and right = n - 1.",
      "3. While left <= right, compute leftSq = nums[left] * nums[left] and rightSq = nums[right] * nums[right].",
      "4. If leftSq > rightSq, put leftSq in res[idx--] and advance left++.",
      "5. Otherwise, put rightSq in res[idx--] and advance right--.",
      "6. Return res."
    ],
    "algorithm": "res = array of size n\nleft = 0, right = n - 1, idx = n - 1\nwhile left <= right:\n    if nums[left]^2 > nums[right]^2:\n        res[idx] = nums[left]^2\n        left += 1\n    else:\n        res[idx] = nums[right]^2\n        right -= 1\n    idx -= 1\nreturn res",
    "pseudocode": "function sortedSquares(nums):\n    n = length(nums)\n    res = array of size n\n    left = 0\n    right = n - 1\n    idx = n - 1\n    while left <= right:\n        leftSq = nums[left] * nums[left]\n        rightSq = nums[right] * nums[right]\n        if leftSq > rightSq:\n            res[idx] = leftSq\n            left = left + 1\n        else:\n            res[idx] = rightSq\n            right = right - 1\n        idx = idx - 1\n    return res",
    "walkthrough": {
      "input": "nums = [-4, -1, 0, 3, 10]",
      "description": "Opposing two pointers filling result backwards:",
      "tableHeaders": [
        "left",
        "right",
        "nums[left]²",
        "nums[right]²",
        "Chosen",
        "idx",
        "res state"
      ],
      "tableRows": [
        [
          "0 (-4)",
          "4 (10)",
          "16",
          "100",
          "100 from right",
          "4",
          "[_, _, _, _, 100]"
        ],
        [
          "0 (-4)",
          "3 (3)",
          "16",
          "9",
          "16 from left",
          "3",
          "[_, _, _, 16, 100]"
        ],
        [
          "1 (-1)",
          "3 (3)",
          "1",
          "9",
          "9 from right",
          "2",
          "[_, _, 9, 16, 100]"
        ],
        [
          "1 (-1)",
          "2 (0)",
          "1",
          "0",
          "1 from left",
          "1",
          "[_, 1, 9, 16, 100]"
        ],
        [
          "2 (0)",
          "2 (0)",
          "0",
          "0",
          "0",
          "0",
          "[0, 1, 9, 16, 100] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [-5, -3, -1]",
        "expected": "[1, 9, 25]",
        "explanation": "All negative inputs are reversed in magnitude."
      },
      {
        "case": "nums = [1, 2, 3]",
        "expected": "[1, 4, 9]",
        "explanation": "All non-negative inputs preserve order naturally."
      },
      {
        "case": "nums = [-2, 0, 2]",
        "expected": "[0, 4, 4]",
        "explanation": "Symmetric elements yield duplicate squares handled correctly."
      }
    ],
    "code": {
      "python": "class Solution:\n    def sortedSquares(self, nums: List[int]) -> List[int]:\n        n = len(nums)\n        res = [0] * n\n        left, right = 0, n - 1\n        idx = n - 1\n        while left <= right:\n            left_sq = nums[left] * nums[left]\n            right_sq = nums[right] * nums[right]\n            if left_sq > right_sq:\n                res[idx] = left_sq\n                left += 1\n            else:\n                res[idx] = right_sq\n                right -= 1\n            idx -= 1\n        return res",
      "cpp": "class Solution {\npublic:\n    vector<int> sortedSquares(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n);\n        int left = 0, right = n - 1, idx = n - 1;\n        while (left <= right) {\n            int leftSq = nums[left] * nums[left];\n            int rightSq = nums[right] * nums[right];\n            if (leftSq > rightSq) {\n                res[idx--] = leftSq;\n                left++;\n            } else {\n                res[idx--] = rightSq;\n                right--;\n            }\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public int[] sortedSquares(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int left = 0, right = n - 1, idx = n - 1;\n        while (left <= right) {\n            int leftSq = nums[left] * nums[left];\n            int rightSq = nums[right] * nums[right];\n            if (leftSq > rightSq) {\n                res[idx--] = leftSq;\n                left++;\n            } else {\n                res[idx--] = rightSq;\n                right--;\n            }\n        }\n        return res;\n    }\n}",
      "javascript": "var sortedSquares = function(nums) {\n    const n = nums.length;\n    const res = new Array(n);\n    let left = 0, right = n - 1, idx = n - 1;\n    while (left <= right) {\n        const leftSq = nums[left] * nums[left];\n        const rightSq = nums[right] * nums[right];\n        if (leftSq > rightSq) {\n            res[idx--] = leftSq;\n            left++;\n        } else {\n            res[idx--] = rightSq;\n            right--;\n        }\n    }\n    return res;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3-4: Allocate output list 'res' of length n, set left and right pointers at opposite ends.",
        "Line 5: Set write index 'idx = n - 1' to place largest values at the back.",
        "Line 6-15: Compare squares of ends; place larger square at res[idx] and advance the corresponding pointer."
      ],
      "cpp": [
        "Line 4: Allocate vector<int> res(n).",
        "Line 5: Pointers left at 0, right at n - 1, and idx at n - 1.",
        "Line 6-15: While left <= right, compare squared endpoints, placing maximum into res[idx--]."
      ],
      "java": [
        "Line 3: Allocate int array of length n.",
        "Line 4: Maintain opposing boundaries left and right.",
        "Line 5-13: Fill result from back to front in descending order of squared magnitudes."
      ],
      "javascript": [
        "Line 3: Instantiate fixed-length array.",
        "Line 4: Set boundary pointers left = 0, right = n - 1.",
        "Line 5-13: Compare squares, filling res from the tail."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "commonMistakes": [
      "Squaring then calling Array.sort(), which runs in O(N log N) instead of the required linear O(N).",
      "Filling result array from front (index 0) instead of the back, creating a reverse sorted array.",
      "Using left < right instead of left <= right, accidentally skipping the middle element."
    ],
    "takeaway": "When values at extreme boundaries are the largest candidates, use two pointers converging inward to build sorted output backwards.",
    "hints": [
      "Where are the largest squares located in a sorted array containing negative numbers?",
      "The largest squares must be at either the extreme left or extreme right.",
      "Can you compare the squares of the two ends and fill the result array backwards from index n - 1?"
    ]
  },
  "arr-tp-06": {
    "id": "arr-tp-06",
    "leetcodeNumber": 905,
    "title": "Sort Array By Parity",
    "difficulty": "Easy",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Two-Way Partitioning",
    "leetcodeUrl": "https://leetcode.com/problems/sort-array-by-parity/",
    "problemUnderstanding": "Given an integer array nums, move all the even integers to the beginning of the array followed by all the odd integers. Return any array that satisfies this condition.",
    "whyItMatters": "Introduces two-way array partitioning using two converging pointers, the foundational mechanism behind QuickSort partition logic.",
    "patternExplanation": "A left pointer seeks odd numbers from the front, while a right pointer seeks even numbers from the back. When both find misplaced numbers, swapping them places both into their correct parity zones in O(1) time.",
    "recognitionSignals": [
      "Partitioning elements into two disjoint categories (even vs odd)",
      "Relative order within each group does not need to be preserved",
      "Requires in-place modification with O(1) extra space"
    ],
    "thoughtProcess": "A naive approach collects evens and odds in two separate lists and concatenates them, costing O(N) auxiliary space. With two pointers at opposite ends, left moves forward past evens, and right moves backward past odds. When left points to an odd and right points to an even, swapping them resolves both positions simultaneously.",
    "approach": [
      "1. Initialize left = 0 and right = nums.length - 1.",
      "2. While left < right, check if nums[left] is odd and nums[right] is even.",
      "3. If so, swap(nums[left], nums[right]).",
      "4. If nums[left] is even, increment left++.",
      "5. If nums[right] is odd, decrement right--.",
      "6. Return nums."
    ],
    "algorithm": "left = 0, right = n - 1\nwhile left < right:\n    if nums[left] % 2 > nums[right] % 2:\n        swap(nums[left], nums[right])\n    if nums[left] % 2 == 0: left += 1\n    if nums[right] % 2 == 1: right -= 1\nreturn nums",
    "pseudocode": "function sortArrayByParity(nums):\n    left = 0\n    right = length(nums) - 1\n    while left < right:\n        if (nums[left] % 2) > (nums[right] % 2):\n            swap(nums[left], nums[right])\n        if nums[left] % 2 == 0:\n            left = left + 1\n        if nums[right] % 2 == 1:\n            right = right - 1\n    return nums",
    "walkthrough": {
      "input": "nums = [3, 1, 2, 4]",
      "description": "Opposing two pointers swapping misaligned parity items:",
      "tableHeaders": [
        "left",
        "right",
        "nums[left]",
        "nums[right]",
        "Action",
        "nums state"
      ],
      "tableRows": [
        [
          "0",
          "3",
          "3 (odd)",
          "4 (even)",
          "Swap 3 and 4",
          "[4, 1, 2, 3]"
        ],
        [
          "0",
          "3",
          "4 (even)",
          "3 (odd)",
          "left++, right--",
          "[4, 1, 2, 3]"
        ],
        [
          "1",
          "2",
          "1 (odd)",
          "2 (even)",
          "Swap 1 and 2",
          "[4, 2, 1, 3]"
        ],
        [
          "1",
          "2",
          "2 (even)",
          "1 (odd)",
          "left++, right-- (left > right)",
          "[4, 2, 1, 3] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [0]",
        "expected": "[0]",
        "explanation": "Single element; loop does not execute."
      },
      {
        "case": "nums = [2, 4, 6]",
        "expected": "[2, 4, 6]",
        "explanation": "Already all evens; pointers adjust without swapping."
      },
      {
        "case": "nums = [1, 3, 5]",
        "expected": "[1, 3, 5]",
        "explanation": "Already all odds; pointers adjust without swapping."
      }
    ],
    "code": {
      "python": "class Solution:\n    def sortArrayByParity(self, nums: List[int]) -> List[int]:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            if nums[left] % 2 > nums[right] % 2:\n                nums[left], nums[right] = nums[right], nums[left]\n            if nums[left] % 2 == 0:\n                left += 1\n            if nums[right] % 2 == 1:\n                right -= 1\n        return nums",
      "cpp": "class Solution {\npublic:\n    vector<int> sortArrayByParity(vector<int>& nums) {\n        int left = 0, right = nums.size() - 1;\n        while (left < right) {\n            if (nums[left] % 2 > nums[right] % 2) {\n                swap(nums[left], nums[right]);\n            }\n            if (nums[left] % 2 == 0) left++;\n            if (nums[right] % 2 == 1) right--;\n        }\n        return nums;\n    }\n};",
      "java": "class Solution {\n    public int[] sortArrayByParity(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            if (nums[left] % 2 > nums[right] % 2) {\n                int tmp = nums[left];\n                nums[left] = nums[right];\n                nums[right] = tmp;\n            }\n            if (nums[left] % 2 == 0) left++;\n            if (nums[right] % 2 == 1) right--;\n        }\n        return nums;\n    }\n}",
      "javascript": "var sortArrayByParity = function(nums) {\n    let left = 0, right = nums.length - 1;\n    while (left < right) {\n        if (nums[left] % 2 > nums[right] % 2) {\n            const tmp = nums[left];\n            nums[left] = nums[right];\n            nums[right] = tmp;\n        }\n        if (nums[left] % 2 === 0) left++;\n        if (nums[right] % 2 === 1) right--;\n    }\n    return nums;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Set left at index 0 and right at len(nums) - 1.",
        "Line 4-5: Compare parity: if left is odd (1) and right is even (0), swap elements in-place.",
        "Line 6-9: Advance left if even; decrement right if odd.",
        "Line 10: Return modified list."
      ],
      "cpp": [
        "Line 4: Declare bounds left = 0 and right = nums.size() - 1.",
        "Line 5-8: If parity comparison detects inverted order, swap.",
        "Line 9-10: Move pointers inward when their current positions satisfy conditions.",
        "Line 12: Return vector."
      ],
      "java": [
        "Line 3: Initialize left and right bounds.",
        "Line 4-12: In-place two-way swap loop without allocating auxiliary array.",
        "Line 13: Return nums."
      ],
      "javascript": [
        "Line 2: Left and right pointers at opposite edges.",
        "Line 3-11: Swap odd on left with even on right, then shrink bounds.",
        "Line 12: Return array."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Allocating an auxiliary array, which doubles memory consumption.",
      "Forgetting to increment left or decrement right when elements are already in the right partition, causing an infinite loop.",
      "Checking negative numbers with % without taking absolute value (not an issue here since nums[i] >= 0 per problem constraints, but good practice)."
    ],
    "takeaway": "Converging two pointers enable O(1) space two-way partitioning by swapping inverted elements across boundaries.",
    "hints": [
      "Could you have one pointer starting at the beginning and one at the end?",
      "The left pointer wants to find odd numbers; the right pointer wants to find even numbers.",
      "When both pointers find misplaced elements, swap them and advance both pointers."
    ]
  },
  "arr-tp-07": {
    "id": "arr-tp-07",
    "leetcodeNumber": 167,
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Opposing Ends on Sorted Array",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "problemUnderstanding": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return their 1-based indices [index1, index2]. Space must be strictly O(1).",
    "whyItMatters": "Demonstrates how sorting eliminates the need for hash map auxiliary memory, reducing space complexity from O(N) to O(1) using opposing two pointers.",
    "patternExplanation": "Because the array is monotonically non-decreasing, if numbers[left] + numbers[right] < target, the only way to increase the sum is incrementing left. If the sum > target, the only way to decrease it is decrementing right.",
    "recognitionSignals": [
      "Finding two numbers that sum to a target value",
      "The input array is explicitly GUARANTEED to be sorted",
      "Constraint mandates strictly O(1) auxiliary space (no hash map)",
      "Output indices are 1-based"
    ],
    "thoughtProcess": "In unsorted Two Sum, we used a hash map for O(1) lookup because numbers were arbitrary. Here, the array is already sorted. We place left at index 0 (minimum value) and right at n - 1 (maximum value). If their sum is too small, no other partner for 'left' can reach target with a smaller right, so left must advance. This guarantees linear convergence without memory allocation.",
    "approach": [
      "1. Initialize left = 0 and right = numbers.length - 1.",
      "2. While left < right, calculate sum = numbers[left] + numbers[right].",
      "3. If sum == target, return [left + 1, right + 1] (1-indexed).",
      "4. If sum < target, advance left++ to increase sum.",
      "5. If sum > target, decrement right-- to decrease sum."
    ],
    "algorithm": "left = 0, right = len(nums) - 1\nwhile left < right:\n    sum = nums[left] + nums[right]\n    if sum == target: return [left + 1, right + 1]\n    else if sum < target: left += 1\n    else: right -= 1\nreturn []",
    "pseudocode": "function twoSumSorted(numbers, target):\n    left = 0\n    right = length(numbers) - 1\n    while left < right:\n        sum = numbers[left] + numbers[right]\n        if sum == target:\n            return [left + 1, right + 1]\n        else if sum < target:\n            left = left + 1\n        else:\n            right = right - 1\n    return []",
    "walkthrough": {
      "input": "numbers = [2, 7, 11, 15], target = 9",
      "description": "Opposing two-pointer convergence:",
      "tableHeaders": [
        "left",
        "right",
        "numbers[left]",
        "numbers[right]",
        "Sum",
        "Comparison",
        "Action"
      ],
      "tableRows": [
        [
          "0",
          "3",
          "2",
          "15",
          "17",
          "17 > 9",
          "Too large → right--"
        ],
        [
          "0",
          "2",
          "2",
          "11",
          "13",
          "13 > 9",
          "Too large → right--"
        ],
        [
          "0",
          "1",
          "2",
          "7",
          "9",
          "9 == 9",
          "Match found → return [1, 2] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "numbers = [2, 3, 4], target = 6",
        "expected": "[1, 3]",
        "explanation": "Extreme outer pair forms target sum directly."
      },
      {
        "case": "numbers = [-1, 0], target = -1",
        "expected": "[1, 2]",
        "explanation": "Negative numbers work seamlessly without special casing."
      },
      {
        "case": "numbers = [5, 25, 75], target = 100",
        "expected": "[2, 3]",
        "explanation": "Large values with asymmetric intervals converge accurately."
      }
    ],
    "code": {
      "python": "class Solution:\n    def twoSum(self, numbers: List[int], target: int) -> List[int]:\n        left, right = 0, len(numbers) - 1\n        while left < right:\n            current_sum = numbers[left] + numbers[right]\n            if current_sum == target:\n                return [left + 1, right + 1]\n            elif current_sum < target:\n                left += 1\n            else:\n                right -= 1\n        return []",
      "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int left = 0, right = numbers.size() - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) {\n                return {left + 1, right + 1};\n            } else if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return {};\n    }\n};",
      "java": "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        int left = 0, right = numbers.length - 1;\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) {\n                return new int[] { left + 1, right + 1 };\n            } else if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return new int[0];\n    }\n}",
      "javascript": "var twoSum = function(numbers, target) {\n    let left = 0, right = numbers.length - 1;\n    while (left < right) {\n        const sum = numbers[left] + numbers[right];\n        if (sum === target) {\n            return [left + 1, right + 1];\n        } else if (sum < target) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return [];\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Set opposing pointers at 0 and len(numbers) - 1.",
        "Line 4: Loop while left < right.",
        "Line 5-7: If current_sum matches target, return 1-based indices [left + 1, right + 1].",
        "Line 8-11: Adjust left or right pointer monotonically based on comparison."
      ],
      "cpp": [
        "Line 4: Declare left and right bounds.",
        "Line 5: Opposing pointer while loop.",
        "Line 6-12: Compare sum to target; return {left + 1, right + 1} upon match."
      ],
      "java": [
        "Line 3: Initialize left = 0, right = numbers.length - 1.",
        "Line 4-12: Binary decision loop modifying sum towards target.",
        "Line 13: Return empty array fallback."
      ],
      "javascript": [
        "Line 2: Left and right index markers.",
        "Line 3-10: Sum comparison adjusting outer bounds.",
        "Line 11: Return empty array."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Returning 0-indexed values instead of 1-indexed (e.g. returning [0, 1] instead of [1, 2]).",
      "Using a hash map, which passes the time limit but wastes O(N) memory when O(1) is expected.",
      "Using left <= right, which could allow pairing an element with itself."
    ],
    "takeaway": "When an array is sorted, two pointers converging from both ends can find target pair sums in O(N) time and O(1) space.",
    "hints": [
      "How can you take advantage of the fact that the array is already sorted?",
      "If you sum the smallest and largest numbers, what does it mean if the sum is too small or too large?",
      "If the sum is too small, advance the left pointer; if too large, move the right pointer backward."
    ]
  },
  "arr-tp-08": {
    "id": "arr-tp-08",
    "leetcodeNumber": 15,
    "title": "3Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sorting + Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Multi-Pointer Sum Search",
    "leetcodeUrl": "https://leetcode.com/problems/3sum/",
    "problemUnderstanding": "Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The output must not contain duplicate triplets.",
    "whyItMatters": "The canonical problem for reducing a cubic O(N^3) search to quadratic O(N^2) by sorting and fixing one element, and mastering duplicate elimination.",
    "patternExplanation": "After sorting nums, fix the first element nums[i]. The problem reduces to finding two numbers in nums[i+1...n-1] that sum to -nums[i], which is Two Sum II solvable with two pointers in O(N) time.",
    "recognitionSignals": [
      "Finding three elements that sum to a constant (0 or target)",
      "Strict requirement that result triplets must be unique (no duplicates)",
      "Input array is unsorted and can contain multiple identical numbers",
      "Time complexity must be reduced from O(N^3) brute force"
    ],
    "thoughtProcess": "A brute force triple loop runs in O(N^3) and requires an expensive hash set of sorted tuples to eliminate duplicates. By sorting nums first in O(N log N), duplicate values become adjacent. We fix each element nums[i] and run two pointers (left = i + 1, right = n - 1). Whenever a triplet is recorded, we skip identical adjacent numbers for all three pointers to ensure uniqueness in O(N^2) total time.",
    "approach": [
      "1. Sort nums in ascending order.",
      "2. Loop i from 0 to nums.length - 1. If i > 0 and nums[i] == nums[i - 1], continue to prevent duplicate triplets.",
      "3. If nums[i] > 0, break early because all remaining elements are positive, making a sum of 0 impossible.",
      "4. Set left = i + 1 and right = nums.length - 1.",
      "5. While left < right, calculate sum = nums[i] + nums[left] + nums[right].",
      "6. If sum == 0, append triplet to result. Advance left and right past duplicate values.",
      "7. If sum < 0, advance left++. If sum > 0, decrement right--.",
      "8. Return result list."
    ],
    "algorithm": "sort(nums)\nfor i in 0 to len(nums)-1:\n    if i > 0 and nums[i] == nums[i-1]: continue\n    if nums[i] > 0: break\n    left = i + 1, right = len(nums) - 1\n    while left < right:\n        sum = nums[i] + nums[left] + nums[right]\n        if sum == 0:\n            res.append([nums[i], nums[left], nums[right]])\n            while left < right and nums[left] == nums[left+1]: left += 1\n            while left < right and nums[right] == nums[right-1]: right -= 1\n            left += 1; right -= 1\n        elif sum < 0: left += 1\n        else: right -= 1\nreturn res",
    "pseudocode": "function threeSum(nums):\n    sort(nums)\n    res = []\n    n = length(nums)\n    for i from 0 to n - 1:\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        if nums[i] > 0:\n            break\n        left = i + 1\n        right = n - 1\n        while left < right:\n            sum = nums[i] + nums[left] + nums[right]\n            if sum == 0:\n                res.append([nums[i], nums[left], nums[right]])\n                while left < right and nums[left] == nums[left + 1]:\n                    left = left + 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right = right - 1\n                left = left + 1\n                right = right - 1\n            else if sum < 0:\n                left = left + 1\n            else:\n                right = right - 1\n    return res",
    "walkthrough": {
      "input": "nums = [-1, 0, 1, 2, -1, -4]",
      "description": "Sorted: [-4, -1, -1, 0, 1, 2]",
      "tableHeaders": [
        "i (fixed)",
        "nums[i]",
        "left",
        "right",
        "Sum",
        "Action"
      ],
      "tableRows": [
        [
          "0",
          "-4",
          "1 (-1)",
          "5 (2)",
          "-3",
          "Sum < 0 → left++ (no triplets with -4)"
        ],
        [
          "1",
          "-1",
          "2 (-1)",
          "5 (2)",
          "0",
          "Match! [-1, -1, 2] recorded. left++, right--"
        ],
        [
          "1",
          "-1",
          "3 (0)",
          "4 (1)",
          "0",
          "Match! [-1, 0, 1] recorded. left++, right--"
        ],
        [
          "2",
          "-1",
          "-",
          "-",
          "-",
          "Duplicate nums[2] == nums[1] → skip"
        ],
        [
          "3",
          "0",
          "4 (1)",
          "5 (2)",
          "3",
          "nums[3] > 0 or right exhausted → finish"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [0, 0, 0]",
        "expected": "[[0, 0, 0]]",
        "explanation": "All zeroes produce exactly one valid zero triplet with duplicates skipped."
      },
      {
        "case": "nums = [0, 1, 1]",
        "expected": "[]",
        "explanation": "No triplet sums to 0."
      },
      {
        "case": "nums = [-2, 0, 1, 1, 2]",
        "expected": "[[-2, 0, 2], [-2, 1, 1]]",
        "explanation": "Multiple distinct triplets with duplicated values in input."
      }
    ],
    "code": {
      "python": "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        nums.sort()\n        res = []\n        n = len(nums)\n        for i in range(n):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            if nums[i] > 0:\n                break\n            left, right = i + 1, n - 1\n            while left < right:\n                total = nums[i] + nums[left] + nums[right]\n                if total == 0:\n                    res.append([nums[i], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    left += 1\n                    right -= 1\n                elif total < 0:\n                    left += 1\n                else:\n                    right -= 1\n        return res",
      "cpp": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        int n = nums.size();\n        for (int i = 0; i < n; ++i) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            if (nums[i] > 0) break;\n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[left], nums[right]});\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            if (nums[i] > 0) break;\n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n}",
      "javascript": "var threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    const n = nums.length;\n    for (let i = 0; i < n; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        if (nums[i] > 0) break;\n        let left = i + 1, right = n - 1;\n        while (left < right) {\n            const sum = nums[i] + nums[left] + nums[right];\n            if (sum === 0) {\n                res.push([nums[i], nums[left], nums[right]]);\n                while (left < right && nums[left] === nums[left + 1]) left++;\n                while (left < right && nums[right] === nums[right - 1]) right--;\n                left++;\n                right--;\n            } else if (sum < 0) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return res;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Sort array ascending so two pointers and duplicate skipping can be used.",
        "Line 6-7: Skip duplicate values of nums[i] to avoid repeated triplets.",
        "Line 8-9: Break early if nums[i] > 0, as three positive numbers cannot sum to zero.",
        "Line 10-23: Two pointers scanning remaining suffix, skipping internal duplicates upon finding match."
      ],
      "cpp": [
        "Line 4: Sort vector nums.",
        "Line 7: Deduplicate primary index i using if (i > 0 && nums[i] == nums[i - 1]).",
        "Line 8: Prune branches when nums[i] exceeds 0.",
        "Line 9-22: Standard two-pointer inner scan updating res with matching triplets."
      ],
      "java": [
        "Line 3: Arrays.sort(nums).",
        "Line 6: Skip repeated base values.",
        "Line 9-21: Advance left/right pointers while skipping identical elements upon match.",
        "Line 24: Return res."
      ],
      "javascript": [
        "Line 2: Numeric sort using (a, b) => a - b.",
        "Line 6: Guard against duplicate fixed elements.",
        "Line 9-21: Two-pointer pair matching with duplicate skips."
      ]
    },
    "timeComplexity": "O(N^2)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Using a hash set of lists to eliminate duplicates, which consumes heavy O(N^2) memory and slows down execution.",
      "Forgetting to skip duplicates for left and right after recording a valid triplet.",
      "Not using numeric comparator in Javascript nums.sort(), resulting in lexicographical string sorting."
    ],
    "takeaway": "Sorting reduces 3Sum to N instances of Two Sum II; skipping identical adjacent elements eliminates duplicate triplets without extra memory.",
    "hints": [
      "If you sort the array, can you fix one number and turn this into Two Sum II?",
      "For each fixed number nums[i], find two numbers in the remaining array that sum to -nums[i].",
      "How can you avoid duplicate triplets without using a hash set? Look at adjacent identical elements."
    ]
  },
  "arr-tp-09": {
    "id": "arr-tp-09",
    "leetcodeNumber": 16,
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sorting + Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Multi-Pointer Sum Search",
    "leetcodeUrl": "https://leetcode.com/problems/3sum-closest/",
    "problemUnderstanding": "Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume each input would have exactly one solution.",
    "whyItMatters": "Demonstrates how two pointers can optimize an approximation problem over sorted intervals by tracking the minimum difference rather than exact zero.",
    "patternExplanation": "Sorting nums lets us fix nums[i] and use two pointers (left and right) for the remaining pair. If current sum < target, incrementing left is the only way to increase the sum and potentially get closer. If current sum > target, decrementing right is the only way to decrease it.",
    "recognitionSignals": [
      "Finding three elements whose sum minimizes |sum - target|",
      "Array can be sorted without violating problem requirements",
      "Return the sum itself, not the indices",
      "Requires reduction from cubic O(N^3) to quadratic O(N^2)"
    ],
    "thoughtProcess": "A brute-force evaluation of all triplets takes O(N^3). By sorting the array first, we can iterate through each candidate index i, and use opposing two pointers left and right on the rest of the array. At each step, we update closestSum if abs(target - currentSum) < abs(target - closestSum). If currentSum is smaller than target, we need a larger value, so left advances; otherwise right decreases.",
    "approach": [
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
    "algorithm": "sort(nums)\nclosest = nums[0] + nums[1] + nums[2]\nfor i in 0 to len(nums)-3:\n    left = i + 1, right = len(nums) - 1\n    while left < right:\n        sum = nums[i] + nums[left] + nums[right]\n        if abs(target - sum) < abs(target - closest): closest = sum\n        if sum < target: left += 1\n        else if sum > target: right -= 1\n        else: return target\nreturn closest",
    "pseudocode": "function threeSumClosest(nums, target):\n    sort(nums)\n    closest = nums[0] + nums[1] + nums[2]\n    n = length(nums)\n    for i from 0 to n - 3:\n        left = i + 1\n        right = n - 1\n        while left < right:\n            sum = nums[i] + nums[left] + nums[right]\n            if sum == target:\n                return target\n            if abs(target - sum) < abs(target - closest):\n                closest = sum\n            if sum < target:\n                left = left + 1\n            else:\n                right = right - 1\n    return closest",
    "walkthrough": {
      "input": "nums = [-1, 2, 1, -4], target = 1",
      "description": "Sorted nums: [-4, -1, 1, 2]",
      "tableHeaders": [
        "i",
        "left",
        "right",
        "Triplet",
        "Sum",
        "|1 - Sum|",
        "closestSum",
        "Action"
      ],
      "tableRows": [
        [
          "0 (-4)",
          "1 (-1)",
          "3 (2)",
          "[-4, -1, 2]",
          "-3",
          "4",
          "-3",
          "Sum < 1 → left++"
        ],
        [
          "0 (-4)",
          "2 (1)",
          "3 (2)",
          "[-4, 1, 2]",
          "-1",
          "2",
          "-1",
          "Sum < 1 → left++ (ends pair)"
        ],
        [
          "1 (-1)",
          "2 (1)",
          "3 (2)",
          "[-1, 1, 2]",
          "2",
          "1",
          "2",
          "Sum > 1 → right-- (|1-2|=1 is closest)"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [0, 0, 0], target = 1",
        "expected": "0",
        "explanation": "Only one triplet exists; sum is 0, difference is 1."
      },
      {
        "case": "nums = [1, 1, 1], target = 3",
        "expected": "3",
        "explanation": "Exact match found on initial check."
      },
      {
        "case": "nums = [-3, -2, -5, 3, -4], target = -1",
        "expected": "-2",
        "explanation": "Negative numbers with closest sum approaching target from below."
      }
    ],
    "code": {
      "python": "class Solution:\n    def threeSumClosest(self, nums: List[int], target: int) -> int:\n        nums.sort()\n        closest = nums[0] + nums[1] + nums[2]\n        n = len(nums)\n        for i in range(n - 2):\n            left, right = i + 1, n - 1\n            while left < right:\n                current_sum = nums[i] + nums[left] + nums[right]\n                if current_sum == target:\n                    return target\n                if abs(target - current_sum) < abs(target - closest):\n                    closest = current_sum\n                if current_sum < target:\n                    left += 1\n                else:\n                    right -= 1\n        return closest",
      "cpp": "class Solution {\npublic:\n    int threeSumClosest(vector<int>& nums, int target) {\n        sort(nums.begin(), nums.end());\n        int closest = nums[0] + nums[1] + nums[2];\n        int n = nums.size();\n        for (int i = 0; i < n - 2; ++i) {\n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == target) return target;\n                if (abs(target - sum) < abs(target - closest)) {\n                    closest = sum;\n                }\n                if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return closest;\n    }\n};",
      "java": "class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        Arrays.sort(nums);\n        int closest = nums[0] + nums[1] + nums[2];\n        int n = nums.length;\n        for (int i = 0; i < n - 2; i++) {\n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == target) return target;\n                if (Math.abs(target - sum) < Math.abs(target - closest)) {\n                    closest = sum;\n                }\n                if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return closest;\n    }\n}",
      "javascript": "var threeSumClosest = function(nums, target) {\n    nums.sort((a, b) => a - b);\n    let closest = nums[0] + nums[1] + nums[2];\n    const n = nums.length;\n    for (let i = 0; i < n - 2; i++) {\n        let left = i + 1, right = n - 1;\n        while (left < right) {\n            const sum = nums[i] + nums[left] + nums[right];\n            if (sum === target) return target;\n            if (Math.abs(target - sum) < Math.abs(target - closest)) {\n                closest = sum;\n            }\n            if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return closest;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Sort nums ascending to enable monotonic pointer traversal.",
        "Line 4: Initialize closest with the sum of the first three numbers.",
        "Line 7-16: Loop i and converge two pointers; return immediately if current_sum == target, else update closest."
      ],
      "cpp": [
        "Line 4: Sort vector nums.",
        "Line 5: Set initial closest sum.",
        "Line 7-19: Iterate outer index i with nested two-pointer scan, adjusting bounds based on sum comparison."
      ],
      "java": [
        "Line 3: Arrays.sort(nums).",
        "Line 4: Set initial baseline sum.",
        "Line 7-19: Track minimal absolute distance with Math.abs()."
      ],
      "javascript": [
        "Line 2: Numeric ascending sort.",
        "Line 3: Baseline initialization of closest.",
        "Line 6-18: Two-pointer convergence checking distance to target."
      ]
    },
    "timeComplexity": "O(N^2)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Returning the distance abs(target - sum) instead of the actual sum.",
      "Initializing closest with 0, which gives wrong results when all triplets have positive or negative sums far from 0.",
      "Not stopping immediately when sum == target is encountered."
    ],
    "takeaway": "Sorting plus two pointers allows finding the closest approximate triplet sum in O(N^2) time and O(1) space.",
    "hints": [
      "Just like 3Sum, what happens if you sort the array and fix the first number?",
      "Use two pointers for the remaining pair to move closer to the target.",
      "If the sum is smaller than target, increment left; if greater, decrement right; track the closest sum seen."
    ]
  },
  "arr-tp-10": {
    "id": "arr-tp-10",
    "leetcodeNumber": 18,
    "title": "4Sum",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Sorting + Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Multi-Pointer Sum Search",
    "leetcodeUrl": "https://leetcode.com/problems/4sum/",
    "problemUnderstanding": "Given an array nums of n integers, return an array of all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that the four indices are distinct and their sum equals target. The solution set must not contain duplicate quadruplets.",
    "whyItMatters": "Generalizes the Two Sum / 3Sum pattern to K-Sum. It emphasizes handling 32-bit integer overflow in intermediate additions and hierarchical duplicate skipping.",
    "patternExplanation": "Sort the array. Fix the first two elements with nested loops (i and j), and use two pointers (left and right) for the remaining two elements. This reduces O(N^4) brute force to O(N^3).",
    "recognitionSignals": [
      "Finding four elements that sum to a target value",
      "Duplicate quadruplets are forbidden",
      "Large numbers in constraints that can overflow 32-bit signed integers during summation",
      "Extension of the 3Sum two-pointer technique"
    ],
    "thoughtProcess": "A brute force check over four nested loops requires O(N^4) operations. By sorting the array, we fix nums[i] in the first loop and nums[j] in the second loop. The remaining problem is finding two numbers in nums[j+1...n-1] that sum to target - nums[i] - nums[j]. We solve this with two pointers in O(N) time, yielding O(N^3) overall.",
    "approach": [
      "1. Sort nums in ascending order.",
      "2. Outer loop i from 0 to n - 4. Skip duplicates if i > 0 and nums[i] == nums[i - 1].",
      "3. Inner loop j from i + 1 to n - 3. Skip duplicates if j > i + 1 and nums[j] == nums[j - 1].",
      "4. Set left = j + 1 and right = n - 1.",
      "5. Compute 64-bit sum = (long long)nums[i] + nums[j] + nums[left] + nums[right].",
      "6. If sum == target, record quadruplet and skip adjacent duplicates for left and right.",
      "7. If sum < target, left++; if sum > target, right--.",
      "8. Return result list."
    ],
    "algorithm": "sort(nums)\nfor i in 0 to n-4:\n    if i > 0 and nums[i] == nums[i-1]: continue\n    for j in i+1 to n-3:\n        if j > i+1 and nums[j] == nums[j-1]: continue\n        left = j + 1, right = n - 1\n        while left < right:\n            sum = nums[i] + nums[j] + nums[left] + nums[right]\n            if sum == target:\n                res.append([nums[i], nums[j], nums[left], nums[right]])\n                skip duplicates for left and right\n                left += 1; right -= 1\n            else if sum < target: left += 1\n            else: right -= 1\nreturn res",
    "pseudocode": "function fourSum(nums, target):\n    sort(nums)\n    res = []\n    n = length(nums)\n    for i from 0 to n - 4:\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        for j from i + 1 to n - 3:\n            if j > i + 1 and nums[j] == nums[j - 1]:\n                continue\n            left = j + 1\n            right = n - 1\n            while left < right:\n                sum = cast_to_long(nums[i]) + nums[j] + nums[left] + nums[right]\n                if sum == target:\n                    res.append([nums[i], nums[j], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left + 1]: left = left + 1\n                    while left < right and nums[right] == nums[right - 1]: right = right - 1\n                    left = left + 1\n                    right = right - 1\n                else if sum < target:\n                    left = left + 1\n                else:\n                    right = right - 1\n    return res",
    "walkthrough": {
      "input": "nums = [1, 0, -1, 0, -2, 2], target = 0",
      "description": "Sorted nums: [-2, -1, 0, 0, 1, 2]",
      "tableHeaders": [
        "i",
        "j",
        "left",
        "right",
        "Quadruplet",
        "Sum",
        "Action"
      ],
      "tableRows": [
        [
          "0 (-2)",
          "1 (-1)",
          "2 (0)",
          "5 (2)",
          "[-2, -1, 0, 2]",
          "-1",
          "Sum < 0 → left++"
        ],
        [
          "0 (-2)",
          "1 (-1)",
          "4 (1)",
          "5 (2)",
          "[-2, -1, 1, 2]",
          "0",
          "Match! Record [-2, -1, 1, 2]"
        ],
        [
          "0 (-2)",
          "2 (0)",
          "3 (0)",
          "5 (2)",
          "[-2, 0, 0, 2]",
          "0",
          "Match! Record [-2, 0, 0, 2]"
        ],
        [
          "1 (-1)",
          "2 (0)",
          "3 (0)",
          "4 (1)",
          "[-1, 0, 0, 1]",
          "0",
          "Match! Record [-1, 0, 0, 1]"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [1000000000, 1000000000, 1000000000, 1000000000], target = -294967296",
        "expected": "[]",
        "explanation": "Sum exceeds 32-bit signed integer limits; 64-bit casting prevents incorrect overflow match."
      },
      {
        "case": "nums = [2, 2, 2, 2, 2], target = 8",
        "expected": "[[2, 2, 2, 2]]",
        "explanation": "Multiple duplicates yield exactly one unique quadruplet."
      },
      {
        "case": "nums = [1, 2, 3], target = 6",
        "expected": "[]",
        "explanation": "Fewer than 4 elements immediately returns empty array."
      }
    ],
    "code": {
      "python": "class Solution:\n    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:\n        nums.sort()\n        res = []\n        n = len(nums)\n        for i in range(n - 3):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            for j in range(i + 1, n - 2):\n                if j > i + 1 and nums[j] == nums[j - 1]:\n                    continue\n                left, right = j + 1, n - 1\n                while left < right:\n                    total = nums[i] + nums[j] + nums[left] + nums[right]\n                    if total == target:\n                        res.append([nums[i], nums[j], nums[left], nums[right]])\n                        while left < right and nums[left] == nums[left + 1]:\n                            left += 1\n                        while left < right and nums[right] == nums[right - 1]:\n                            right -= 1\n                        left += 1\n                        right -= 1\n                    elif total < target:\n                        left += 1\n                    else:\n                        right -= 1\n        return res",
      "cpp": "class Solution {\npublic:\n    vector<vector<int>> fourSum(vector<int>& nums, int target) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        int n = nums.size();\n        for (int i = 0; i < n - 3; ++i) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            for (int j = i + 1; j < n - 2; ++j) {\n                if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n                int left = j + 1, right = n - 1;\n                while (left < right) {\n                    long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];\n                    if (sum == target) {\n                        res.push_back({nums[i], nums[j], nums[left], nums[right]});\n                        while (left < right && nums[left] == nums[left + 1]) left++;\n                        while (left < right && nums[right] == nums[right - 1]) right--;\n                        left++;\n                        right--;\n                    } else if (sum < target) {\n                        left++;\n                    } else {\n                        right--;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n};",
      "java": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        int n = nums.length;\n        for (int i = 0; i < n - 3; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            for (int j = i + 1; j < n - 2; j++) {\n                if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n                int left = j + 1, right = n - 1;\n                while (left < right) {\n                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];\n                    if (sum == target) {\n                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));\n                        while (left < right && nums[left] == nums[left + 1]) left++;\n                        while (left < right && nums[right] == nums[right - 1]) right--;\n                        left++;\n                        right--;\n                    } else if (sum < target) {\n                        left++;\n                    } else {\n                        right--;\n                    }\n                }\n            }\n        }\n        return res;\n    }\n}",
      "javascript": "var fourSum = function(nums, target) {\n    nums.sort((a, b) => a - b);\n    const res = [];\n    const n = nums.length;\n    for (let i = 0; i < n - 3; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        for (let j = i + 1; j < n - 2; j++) {\n            if (j > i + 1 && nums[j] === nums[j - 1]) continue;\n            let left = j + 1, right = n - 1;\n            while (left < right) {\n                const sum = nums[i] + nums[j] + nums[left] + nums[right];\n                if (sum === target) {\n                    res.push([nums[i], nums[j], nums[left], nums[right]]);\n                    while (left < right && nums[left] === nums[left + 1]) left++;\n                    while (left < right && nums[right] === nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < target) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n    }\n    return res;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Sort nums ascending.",
        "Line 6-7: Skip duplicate fixed first element nums[i].",
        "Line 9-10: Skip duplicate fixed second element nums[j].",
        "Line 12-25: Two-pointer search for the remaining pair with duplicate elimination."
      ],
      "cpp": [
        "Line 4: Sort vector nums.",
        "Line 7 & 10: Hierarchical duplicate skips for indices i and j.",
        "Line 13: Cast to 64-bit integer 'long long sum' to avoid 32-bit overflow.",
        "Line 14-22: Standard two-pointer inner scan inserting quadruplets."
      ],
      "java": [
        "Line 3: Sort primitive array.",
        "Line 6 & 9: Skip duplicate values for outer loops.",
        "Line 12: Use long sum = (long) nums[i] + nums[j] + nums[left] + nums[right] for overflow safety.",
        "Line 13-22: Two-pointer convergence."
      ],
      "javascript": [
        "Line 2: Numeric sort (a, b) => a - b.",
        "Line 6 & 9: Guard clauses preventing repeated quadruplet sets.",
        "Line 12-23: Two pointers finding matching pairs."
      ]
    },
    "timeComplexity": "O(N^3)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "32-bit integer arithmetic overflow when adding four numbers whose sum exceeds INT_MAX or drops below INT_MIN.",
      "Only skipping duplicates for the outer loop i but forgetting to skip duplicates for j, leading to repeated quadruplets.",
      "Forgetting to advance both left and right after recording a match."
    ],
    "takeaway": "By sorting and nesting loops, K-Sum problems reduce hierarchically to Two Sum in O(N^(K-1)) time.",
    "hints": [
      "How can you extend the 3Sum strategy of fixing one number and using two pointers?",
      "Fix two numbers with two nested loops, then use two pointers for the remaining pair.",
      "Watch out for integer overflow when summing four large integers—use 64-bit integers."
    ]
  },
  "arr-tp-11": {
    "id": "arr-tp-11",
    "leetcodeNumber": 11,
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Boundary Shrinking",
    "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
    "problemUnderstanding": "Given an integer array height of length n where each element represents a vertical line of height height[i], find two lines that together with the x-axis form a container that stores the most water. Return the maximum amount of water a container can store.",
    "whyItMatters": "Classic demonstration of a greedy two-pointer strategy. Proves that shrinking the shorter boundary can never miss an optimal solution.",
    "patternExplanation": "Area = min(height[left], height[right]) * (right - left). Since moving either pointer inward decreases the width (right - left), the only possibility of finding a larger area is increasing the bottleneck min(height[left], height[right]). Therefore, we must greedily advance the shorter line.",
    "recognitionSignals": [
      "Finding an optimal pair maximizing an area or volume calculation",
      "Formula is bounded by min(A, B) * distance(A, B)",
      "Width is maximized at the extreme outer ends",
      "Linear O(N) runtime required, eliminating O(N^2) pair checks"
    ],
    "thoughtProcess": "A brute force check tests all O(N^2) pairs of lines. We observe that starting with left = 0 and right = n - 1 gives maximum possible width. The area is constrained by the shorter of the two lines. Moving the taller line inward only reduces width while the height cannot exceed the current shorter line, so the area is strictly smaller. Thus, the only move that could improve area is advancing the shorter line.",
    "approach": [
      "1. Initialize left = 0, right = height.length - 1, and maxWater = 0.",
      "2. While left < right, calculate current width w = right - left.",
      "3. Determine height bottleneck h = min(height[left], height[right]).",
      "4. Update maxWater = max(maxWater, w * h).",
      "5. If height[left] < height[right], advance left++.",
      "6. Otherwise, decrement right--.",
      "7. Return maxWater."
    ],
    "algorithm": "left = 0, right = n - 1, maxWater = 0\nwhile left < right:\n    w = right - left\n    h = min(height[left], height[right])\n    maxWater = max(maxWater, w * h)\n    if height[left] < height[right]: left += 1\n    else: right -= 1\nreturn maxWater",
    "pseudocode": "function maxArea(height):\n    left = 0\n    right = length(height) - 1\n    maxWater = 0\n    while left < right:\n        w = right - left\n        h = min(height[left], height[right])\n        maxWater = max(maxWater, w * h)\n        if height[left] < height[right]:\n            left = left + 1\n        else:\n            right = right - 1\n    return maxWater",
    "walkthrough": {
      "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
      "description": "Greedy shrinkage of shorter boundary:",
      "tableHeaders": [
        "left",
        "right",
        "height[left]",
        "height[right]",
        "Width",
        "Area",
        "Action"
      ],
      "tableRows": [
        [
          "0",
          "8",
          "1",
          "7",
          "8",
          "min(1,7)*8 = 8",
          "height[0] < height[8] → left++"
        ],
        [
          "1",
          "8",
          "8",
          "7",
          "7",
          "min(8,7)*7 = 49",
          "height[8] < height[1] → right--"
        ],
        [
          "1",
          "7",
          "8",
          "3",
          "6",
          "min(8,3)*6 = 18",
          "height[7] < height[1] → right--"
        ],
        [
          "1",
          "6",
          "8",
          "8",
          "5",
          "min(8,8)*5 = 40",
          "height[6] <= height[1] → right--"
        ],
        [
          "...",
          "...",
          "...",
          "...",
          "...",
          "...",
          "Maximum area remains 49 ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "height = [1, 1]",
        "expected": "1",
        "explanation": "Smallest valid input (n = 2) with equal heights: 1 * 1 = 1."
      },
      {
        "case": "height = [4, 3, 2, 1, 4]",
        "expected": "16",
        "explanation": "Tall lines at outer boundaries give optimal area: 4 * 4 = 16."
      },
      {
        "case": "height = [1, 2, 1]",
        "expected": "2",
        "explanation": "Short array with peak in middle: min(1, 1)*2 = 2 or min(2, 1)*1 = 1."
      }
    ],
    "code": {
      "python": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_water = 0\n        while left < right:\n            w = right - left\n            h = min(height[left], height[right])\n            max_water = max(max_water, w * h)\n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        return max_water",
      "cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int w = right - left;\n            int h = min(height[left], height[right]);\n            maxWater = max(maxWater, w * h);\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxWater;\n    }\n};",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int w = right - left;\n            int h = Math.min(height[left], height[right]);\n            maxWater = Math.max(maxWater, w * h);\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxWater;\n    }\n}",
      "javascript": "var maxArea = function(height) {\n    let left = 0, right = height.length - 1;\n    let maxWater = 0;\n    while (left < right) {\n        const w = right - left;\n        const h = Math.min(height[left], height[right]);\n        maxWater = Math.max(maxWater, w * h);\n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return maxWater;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Set left pointer at 0 and right pointer at len(height) - 1.",
        "Line 4: Track max_water initialized to 0.",
        "Line 5-8: Calculate rectangle bounded by min height, updating maximum.",
        "Line 9-12: Greedily advance the pointer with smaller height inward."
      ],
      "cpp": [
        "Line 4: Set outer endpoints left = 0 and right = height.size() - 1.",
        "Line 5: maxWater tracks optimal capacity.",
        "Line 6-15: Shrink inward by advancing whichever side is shorter."
      ],
      "java": [
        "Line 3: Boundary pointers left and right.",
        "Line 5-14: Area calculation using Math.min and Math.max.",
        "Line 15: Return maxWater."
      ],
      "javascript": [
        "Line 2: Outer pointers left and right.",
        "Line 4-13: Inward greedy movement discarding shorter barrier.",
        "Line 14: Return maxWater."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Moving the taller line instead of the shorter line, which guarantees a smaller area.",
      "Attempting to sort the heights, which destroys the original x-axis coordinate positions.",
      "Using left <= right, which calculates 0 area when left == right and does unnecessary work."
    ],
    "takeaway": "The container area is bounded by the shorter line; to find a larger area with smaller width, you must replace the shorter line.",
    "hints": [
      "Start with the widest possible container using the first and last lines.",
      "The area is limited by the shorter of the two lines.",
      "If you move the taller line inward, the width decreases and the height cannot increase—so you must move the shorter line."
    ]
  },
  "arr-tp-12": {
    "id": "arr-tp-12",
    "leetcodeNumber": 75,
    "title": "Sort Colors",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Dutch National Flag 3-Way Partitioning",
    "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
    "problemUnderstanding": "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent, in the order 0, 1, 2. You must not use the library's sort function, and solve it in a single pass with O(1) extra memory.",
    "whyItMatters": "The canonical 3-way partitioning problem formulated by Edsger Dijkstra. Crucial for QuickSort 3-way partition optimization when many duplicate keys exist.",
    "patternExplanation": "Three pointers (low, mid, high) partition the array into four zones: [0...low-1] are 0s, [low...mid-1] are 1s, [mid...high] are unexamined elements, and [high+1...n-1] are 2s. By swapping nums[mid] to low or high, we sort in a single pass.",
    "recognitionSignals": [
      "Sorting an array with strictly three distinct values/categories",
      "In-place sorting required in a single linear pass",
      "Auxiliary space must be strictly O(1)",
      "Dijkstra's Dutch National Flag partition"
    ],
    "thoughtProcess": "A two-pass counting sort counts occurrences of 0, 1, 2 then overwrites nums, but requires two passes. To achieve a true single-pass O(N) solution with O(1) space, we maintain three pointers: low (next slot for 0), mid (current element examined), and high (next slot for 2). When nums[mid] is 0, swap with low and advance both; when 1, advance mid; when 2, swap with high and decrement high (without advancing mid, since the swapped element is unexamined).",
    "approach": [
      "1. Initialize low = 0, mid = 0, and high = nums.length - 1.",
      "2. While mid <= high, inspect nums[mid].",
      "3. If nums[mid] == 0: swap(nums[low], nums[mid]), increment low++ and mid++.",
      "4. If nums[mid] == 1: increment mid++ (already in middle zone).",
      "5. If nums[mid] == 2: swap(nums[mid], nums[high]), decrement high-- (do not increment mid).",
      "6. Loop terminates when mid passes high."
    ],
    "algorithm": "low = 0, mid = 0, high = n - 1\nwhile mid <= high:\n    if nums[mid] == 0:\n        swap(nums[low], nums[mid])\n        low += 1; mid += 1\n    elif nums[mid] == 1:\n        mid += 1\n    else:\n        swap(nums[mid], nums[high])\n        high -= 1",
    "pseudocode": "function sortColors(nums):\n    low = 0\n    mid = 0\n    high = length(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            swap(nums[low], nums[mid])\n            low = low + 1\n            mid = mid + 1\n        else if nums[mid] == 1:\n            mid = mid + 1\n        else:\n            swap(nums[mid], nums[high])\n            high = high - 1",
    "walkthrough": {
      "input": "nums = [2, 0, 2, 1, 1, 0]",
      "description": "Dutch National Flag 3-pointer partition:",
      "tableHeaders": [
        "low",
        "mid",
        "high",
        "nums[mid]",
        "Action",
        "nums state"
      ],
      "tableRows": [
        [
          "0",
          "0",
          "5",
          "2",
          "Swap mid and high, high--",
          "[0, 0, 2, 1, 1, 2]"
        ],
        [
          "0",
          "0",
          "4",
          "0",
          "Swap low and mid, low++, mid++",
          "[0, 0, 2, 1, 1, 2]"
        ],
        [
          "1",
          "1",
          "4",
          "0",
          "Swap low and mid, low++, mid++",
          "[0, 0, 2, 1, 1, 2]"
        ],
        [
          "2",
          "2",
          "4",
          "2",
          "Swap mid and high, high--",
          "[0, 0, 1, 1, 2, 2]"
        ],
        [
          "2",
          "2",
          "3",
          "1",
          "mid++",
          "[0, 0, 1, 1, 2, 2]"
        ],
        [
          "2",
          "3",
          "3",
          "1",
          "mid++",
          "[0, 0, 1, 1, 2, 2]"
        ],
        [
          "2",
          "4",
          "3",
          "-",
          "mid > high → terminate",
          "[0, 0, 1, 1, 2, 2] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [1]",
        "expected": "[1]",
        "explanation": "Single element array; mid == high == 0, mid++ exits."
      },
      {
        "case": "nums = [2, 0, 1]",
        "expected": "[0, 1, 2]",
        "explanation": "All three distinct elements in reverse order."
      },
      {
        "case": "nums = [0, 0, 0]",
        "expected": "[0, 0, 0]",
        "explanation": "All identical elements handled gracefully without invalid swaps."
      }
    ],
    "code": {
      "python": "class Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        low, mid, high = 0, 0, len(nums) - 1\n        while mid <= high:\n            if nums[mid] == 0:\n                nums[low], nums[mid] = nums[mid], nums[low]\n                low += 1\n                mid += 1\n            elif nums[mid] == 1:\n                mid += 1\n            else:\n                nums[mid], nums[high] = nums[high], nums[mid]\n                high -= 1",
      "cpp": "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int low = 0, mid = 0, high = nums.size() - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                swap(nums[low++], nums[mid++]);\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                swap(nums[mid], nums[high--]);\n            }\n        }\n    }\n};",
      "java": "class Solution {\n    public void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                int tmp = nums[low];\n                nums[low] = nums[mid];\n                nums[mid] = tmp;\n                low++;\n                mid++;\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                int tmp = nums[mid];\n                nums[mid] = nums[high];\n                nums[high] = tmp;\n                high--;\n            }\n        }\n    }\n}",
      "javascript": "var sortColors = function(nums) {\n    let low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] === 0) {\n            const tmp = nums[low];\n            nums[low] = nums[mid];\n            nums[mid] = tmp;\n            low++;\n            mid++;\n        } else if (nums[mid] === 1) {\n            mid++;\n        } else {\n            const tmp = nums[mid];\n            nums[mid] = nums[high];\n            nums[high] = tmp;\n            high--;\n        }\n    }\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Initialize low, mid, and high pointers representing the boundaries of 0s, 1s, and 2s.",
        "Line 4-13: In a single while mid <= high pass, swap 0s to the left and 2s to the right.",
        "Line 11-13: When swapping nums[mid] with nums[high], do NOT increment mid because the swapped element is unexamined."
      ],
      "cpp": [
        "Line 4: Declare low = 0, mid = 0, and high = nums.size() - 1.",
        "Line 5: Loop condition mid <= high.",
        "Line 6-12: 3-way partition using std::swap, keeping 1s in the center."
      ],
      "java": [
        "Line 3: Set partition boundaries low, mid, and high.",
        "Line 4-19: Conditional swapping according to current color value at mid.",
        "Line 18: Decrement high after placing 2 into suffix."
      ],
      "javascript": [
        "Line 2: Pointers low, mid, high.",
        "Line 3-18: Linear traversal swapping 0s to low and 2s to high.",
        "Line 17: high-- without mid++."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Incrementing mid after swapping with high, which misses evaluating the element brought from index high.",
      "Using two passes (counting sort) when an in-place single pass is specifically requested.",
      "Using mid < high instead of mid <= high, leaving the final element at index high unsorted."
    ],
    "takeaway": "The Dutch National Flag algorithm partitions 3 categories in a single pass using three pointers (low, mid, high).",
    "hints": [
      "Could you use three pointers to divide the array into four regions: 0s, 1s, unexamined, and 2s?",
      "Let low track the boundary of 0s, high track the boundary of 2s, and mid scan elements in between.",
      "Be careful: when swapping with high, do not advance mid, because the element swapped from the back has not been inspected yet."
    ]
  },
  "arr-tp-13": {
    "id": "arr-tp-13",
    "leetcodeNumber": 189,
    "title": "Rotate Array",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Three-Step Reversal Algorithm",
    "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
    "problemUnderstanding": "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Solve it in-place using O(1) auxiliary space.",
    "whyItMatters": "A masterclass in geometric block transformations. Teaches the famous 3-step array reversal technique used in memory management and string manipulations.",
    "patternExplanation": "Rotating right by k moves the last k elements to the front and the first n - k elements to the back. Reversing the entire array places the elements in their general correct halves, but inverted. Reversing each half individually restores their internal order in O(N) time and O(1) space.",
    "recognitionSignals": [
      "Cyclic shift or rotation of array elements by k positions",
      "Requirement of strictly O(1) extra space (in-place)",
      "k can be larger than array length (requires k = k % n)",
      "Preserve relative element order within each shifted section"
    ],
    "thoughtProcess": "A naive shift by 1 repeated k times takes O(k * N) time, which causes Time Limit Exceeded for large k. Using an auxiliary array costs O(N) space. We observe that reverse(nums) flips all elements. The last k elements are now at the front [0...k-1] (in reverse order), and the first n - k elements are at the back [k...n-1] (in reverse order). Reversing these two subarrays individually restores correct relative order.",
    "approach": [
      "1. Calculate effective rotation k = k % nums.length.",
      "2. If k == 0, return immediately.",
      "3. Reverse the entire array nums[0...n-1].",
      "4. Reverse the first k elements nums[0...k-1].",
      "5. Reverse the remaining n - k elements nums[k...n-1]."
    ],
    "algorithm": "k = k % n\nreverse(nums, 0, n - 1)\nreverse(nums, 0, k - 1)\nreverse(nums, k, n - 1)",
    "pseudocode": "function rotate(nums, k):\n    n = length(nums)\n    k = k % n\n    reverse(nums, 0, n - 1)\n    reverse(nums, 0, k - 1)\n    reverse(nums, k, n - 1)\n\nfunction reverse(nums, start, end):\n    while start < end:\n        swap(nums[start], nums[end])\n        start = start + 1\n        end = end - 1",
    "walkthrough": {
      "input": "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
      "description": "Three-step reversal sequence:",
      "tableHeaders": [
        "Step",
        "Action",
        "Interval",
        "Resulting Array"
      ],
      "tableRows": [
        [
          "Initial",
          "None",
          "-",
          "[1, 2, 3, 4, 5, 6, 7]"
        ],
        [
          "Step 1",
          "Reverse entire array",
          "[0, 6]",
          "[7, 6, 5, 4, 3, 2, 1]"
        ],
        [
          "Step 2",
          "Reverse first k elements",
          "[0, 2]",
          "[5, 6, 7, 4, 3, 2, 1]"
        ],
        [
          "Step 3",
          "Reverse remaining n - k",
          "[3, 6]",
          "[5, 6, 7, 1, 2, 3, 4] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [1, 2], k = 3",
        "expected": "[2, 1]",
        "explanation": "k = 3 % 2 = 1, equivalent to rotating by 1."
      },
      {
        "case": "nums = [1], k = 100",
        "expected": "[1]",
        "explanation": "Single element array with large k returns [1] unchanged."
      },
      {
        "case": "nums = [1, 2, 3], k = 0",
        "expected": "[1, 2, 3]",
        "explanation": "k = 0 requires no rotations."
      }
    ],
    "code": {
      "python": "class Solution:\n    def rotate(self, nums: List[int], k: int) -> None:\n        n = len(nums)\n        k %= n\n        \n        def reverse(start: int, end: int) -> None:\n            while start < end:\n                nums[start], nums[end] = nums[end], nums[start]\n                start += 1\n                end -= 1\n                \n        reverse(0, n - 1)\n        reverse(0, k - 1)\n        reverse(k, n - 1)",
      "cpp": "class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        int n = nums.size();\n        k %= n;\n        reverse(nums.begin(), nums.end());\n        reverse(nums.begin(), nums.begin() + k);\n        reverse(nums.begin() + k, nums.end());\n    }\n};",
      "java": "class Solution {\n    public void rotate(int[] nums, int k) {\n        int n = nums.length;\n        k %= n;\n        reverse(nums, 0, n - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, n - 1);\n    }\n    \n    private void reverse(int[] nums, int start, int end) {\n        while (start < end) {\n            int tmp = nums[start];\n            nums[start] = nums[end];\n            nums[end] = tmp;\n            start++;\n            end--;\n        }\n    }\n}",
      "javascript": "var rotate = function(nums, k) {\n    const n = nums.length;\n    k %= n;\n    \n    function reverse(start, end) {\n        while (start < end) {\n            const tmp = nums[start];\n            nums[start] = nums[end];\n            nums[end] = tmp;\n            start++;\n            end--;\n        }\n    }\n    \n    reverse(0, n - 1);\n    reverse(0, k - 1);\n    reverse(k, n - 1);\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 4: Normalize k using modulo: k %= n.",
        "Line 6-10: In-place two-pointer helper 'reverse(start, end)'.",
        "Line 12-14: Execute 3-step reversal: reverse all, reverse first k, reverse remaining n - k."
      ],
      "cpp": [
        "Line 4: Calculate k %= n.",
        "Line 5: std::reverse(nums.begin(), nums.end()) reverses whole vector.",
        "Line 6: std::reverse first k elements [0...k-1].",
        "Line 7: std::reverse suffix [k...n-1]."
      ],
      "java": [
        "Line 4: Modulo operator handles rotations larger than array length.",
        "Line 5-7: Sequential three-part reversal calls.",
        "Line 10-17: Private reverse helper function swapping endpoints inward."
      ],
      "javascript": [
        "Line 3: Wrap k within array bounds with modulo.",
        "Line 5-13: In-place reverse helper swapping opposing indices.",
        "Line 15-17: Three reversal invocations completing rotation."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Forgetting k %= n, which causes out-of-bounds indexing or redundant computations when k > n.",
      "Using splice and unshift in JavaScript, which allocates memory and creates O(N^2) time complexity.",
      "Reversing the segments in wrong order or with incorrect boundary indices."
    ],
    "takeaway": "Rotating an array by k in O(1) space is solved by 3 reversals: reverse all, reverse first k, reverse the rest.",
    "hints": [
      "What happens when k is larger than the length of the array? Use k = k % n.",
      "If you reverse the entire array, where do the elements that need to be at the front end up?",
      "Notice that reversing the whole array brings the correct elements to the front and back, but each section is reversed internally."
    ]
  },
  "arr-tp-14": {
    "id": "arr-tp-14",
    "leetcodeNumber": 31,
    "title": "Next Permutation",
    "difficulty": "Medium",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Single-Pass Lexicographical Scan & Suffix Reversal",
    "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
    "problemUnderstanding": "A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Rearrange nums into the lexicographically next greater permutation of numbers. If such arrangement is not possible, rearrange it as the lowest possible order (i.e., sorted in ascending order). Must be in-place.",
    "whyItMatters": "A fundamental algorithmic interview challenge testing deep understanding of lexicographical ordering, digit transitions, and suffix manipulation.",
    "patternExplanation": "To make the number minimally larger, find the rightmost index i where nums[i] < nums[i + 1] (the pivot). Then find the smallest element to the right of i that is strictly greater than nums[i], swap them, and reverse the suffix from i + 1 to end to minimize it.",
    "recognitionSignals": [
      "Find the next lexicographical sequence in-place",
      "Requires strictly linear O(N) runtime and O(1) extra space",
      "Suffix following the pivot is strictly decreasing",
      "Direct algorithm behind C++ std::next_permutation"
    ],
    "thoughtProcess": "A strictly decreasing sequence (e.g. 5, 4, 3, 2, 1) is already at its lexicographically maximal permutation. To increase value minimally, we scan backwards to find the first element nums[i] that is smaller than its right neighbor nums[i + 1]. Then scan backwards from the end to find the smallest number nums[j] > nums[i]. Swap nums[i] and nums[j]. Because the suffix after i is still descending, reversing it makes it ascending (minimal possible value).",
    "approach": [
      "1. Find rightmost pivot index i such that nums[i] < nums[i + 1] (scan backwards from n - 2).",
      "2. If such i exists (array is not entirely descending):",
      "   a. Find rightmost index j such that nums[j] > nums[i] (scan backwards from n - 1).",
      "   b. Swap nums[i] and nums[j].",
      "3. Reverse the subarray nums[i + 1...n - 1] to make the suffix minimal.",
      "4. If no pivot exists (entire array was descending), reverse the entire array."
    ],
    "algorithm": "i = n - 2\nwhile i >= 0 and nums[i] >= nums[i + 1]: i -= 1\nif i >= 0:\n    j = n - 1\n    while nums[j] <= nums[i]: j -= 1\n    swap(nums[i], nums[j])\nreverse(nums, i + 1, n - 1)",
    "pseudocode": "function nextPermutation(nums):\n    n = length(nums)\n    i = n - 2\n    while i >= 0 and nums[i] >= nums[i + 1]:\n        i = i - 1\n    if i >= 0:\n        j = n - 1\n        while nums[j] <= nums[i]:\n            j = j - 1\n        swap(nums[i], nums[j])\n    reverse(nums, i + 1, n - 1)",
    "walkthrough": {
      "input": "nums = [1, 2, 3, 5, 4, 2]",
      "description": "Finding pivot, swapping successor, and reversing suffix:",
      "tableHeaders": [
        "Step",
        "i",
        "nums[i]",
        "j",
        "nums[j]",
        "Action",
        "nums state"
      ],
      "tableRows": [
        [
          "Find pivot",
          "2",
          "3",
          "-",
          "-",
          "nums[2]=3 < nums[3]=5 (pivot at 2)",
          "[1, 2, 3, 5, 4, 2]"
        ],
        [
          "Find successor",
          "2",
          "3",
          "4",
          "4",
          "nums[4]=4 > nums[2]=3",
          "[1, 2, 3, 5, 4, 2]"
        ],
        [
          "Swap",
          "2",
          "4",
          "4",
          "3",
          "swap(nums[2], nums[4])",
          "[1, 2, 4, 5, 3, 2]"
        ],
        [
          "Reverse suffix",
          "-",
          "-",
          "-",
          "-",
          "Reverse nums[3..5] ([5, 3, 2] → [2, 3, 5])",
          "[1, 2, 4, 2, 3, 5] ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [3, 2, 1]",
        "expected": "[1, 2, 3]",
        "explanation": "Maximum permutation wraps around to lowest permutation."
      },
      {
        "case": "nums = [1, 1, 5]",
        "expected": "[1, 5, 1]",
        "explanation": "Duplicates handled properly with strict comparison."
      },
      {
        "case": "nums = [1]",
        "expected": "[1]",
        "explanation": "Single element remains unchanged."
      }
    ],
    "code": {
      "python": "class Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        n = len(nums)\n        i = n - 2\n        while i >= 0 and nums[i] >= nums[i + 1]:\n            i -= 1\n            \n        if i >= 0:\n            j = n - 1\n            while nums[j] <= nums[i]:\n                j -= 1\n            nums[i], nums[j] = nums[j], nums[i]\n            \n        left, right = i + 1, n - 1\n        while left < right:\n            nums[left], nums[right] = nums[right], nums[left]\n            left += 1\n            right -= 1",
      "cpp": "class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        int n = nums.size();\n        int i = n - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) {\n            i--;\n        }\n        if (i >= 0) {\n            int j = n - 1;\n            while (nums[j] <= nums[i]) {\n                j--;\n            }\n            swap(nums[i], nums[j]);\n        }\n        reverse(nums.begin() + i + 1, nums.end());\n    }\n};",
      "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        int n = nums.length;\n        int i = n - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) {\n            i--;\n        }\n        if (i >= 0) {\n            int j = n - 1;\n            while (nums[j] <= nums[i]) {\n                j--;\n            }\n            int tmp = nums[i];\n            nums[i] = nums[j];\n            nums[j] = tmp;\n        }\n        reverse(nums, i + 1, n - 1);\n    }\n    \n    private void reverse(int[] nums, int start, int end) {\n        while (start < end) {\n            int tmp = nums[start];\n            nums[start] = nums[end];\n            nums[end] = tmp;\n            start++;\n            end--;\n        }\n    }\n}",
      "javascript": "var nextPermutation = function(nums) {\n    const n = nums.length;\n    let i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) {\n        i--;\n    }\n    if (i >= 0) {\n        let j = n - 1;\n        while (nums[j] <= nums[i]) {\n            j--;\n        }\n        const tmp = nums[i];\n        nums[i] = nums[j];\n        nums[j] = tmp;\n    }\n    let left = i + 1, right = n - 1;\n    while (left < right) {\n        const tmp = nums[left];\n        nums[left] = nums[right];\n        nums[right] = tmp;\n        left++;\n        right--;\n    }\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 4-6: Scan backwards to identify the first descending pivot nums[i] < nums[i + 1].",
        "Line 8-12: If pivot found, scan from end to locate the next greater element nums[j] and swap.",
        "Line 14-18: Reverse the suffix from i + 1 to end to convert descending sequence to ascending."
      ],
      "cpp": [
        "Line 5-7: Backward scan locating pivot index i.",
        "Line 8-14: Locate successor index j and swap with pivot.",
        "Line 15: std::reverse suffix starting at i + 1."
      ],
      "java": [
        "Line 5-7: Find first index from right where nums[i] < nums[i + 1].",
        "Line 8-16: Swap with rightmost element larger than nums[i].",
        "Line 17: Reverse suffix from i + 1 to end."
      ],
      "javascript": [
        "Line 3-6: Locate inversion point i.",
        "Line 7-15: Swap with smallest greater element to its right.",
        "Line 16-23: Two-pointer reverse on suffix."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Using > instead of >= when scanning backwards for pivot, which fails on duplicate values.",
      "Sorting the suffix instead of reversing it (sorting takes O(N log N) while reversing takes O(N) because the suffix is guaranteed descending).",
      "Forgetting to reverse the entire array when the input is fully descending (e.g. [3, 2, 1])."
    ],
    "takeaway": "Find rightmost dip nums[i] < nums[i+1], swap with rightmost larger element, and reverse suffix after i.",
    "hints": [
      "A decreasing sequence cannot be increased further. Where does the decreasing suffix start when scanning from the right?",
      "Find the first element from the right that breaks the decreasing pattern (call it index i).",
      "Swap it with the next larger number to its right, then reverse everything to the right of i."
    ]
  },
  "arr-tp-15": {
    "id": "arr-tp-15",
    "leetcodeNumber": 42,
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Dual Boundary Max Tracking",
    "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
    "problemUnderstanding": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "whyItMatters": "Top-tier interview question demonstrating how dynamic boundaries eliminate O(N) auxiliary arrays, achieving O(N) time and O(1) space.",
    "patternExplanation": "Water trapped above bar i is determined by min(leftMax, rightMax) - height[i]. With two pointers at opposite ends, if height[left] <= height[right], we know leftMax is the true bottleneck regardless of unseen bars, allowing us to compute water at left immediately.",
    "recognitionSignals": [
      "Elevation map or histogram trapping water/fluid",
      "Volume bounded by min(leftMax, rightMax) minus bar height",
      "Opposite ends form exterior container boundaries",
      "O(1) auxiliary space optimization over prefix/suffix arrays"
    ],
    "thoughtProcess": "Prefix/suffix max arrays solve this in O(N) space. We can optimize to O(1) space using two pointers left and right. Maintain leftMax and rightMax. If height[left] <= height[right], then leftMax <= rightMax is guaranteed to hold because height[left] is bounded by height[right] <= rightMax. Thus, water at left is determined solely by leftMax - height[left], and we can advance left.",
    "approach": [
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
    "algorithm": "left = 0, right = n - 1\nleftMax = 0, rightMax = 0, trapped = 0\nwhile left < right:\n    if height[left] <= height[right]:\n        if height[left] >= leftMax: leftMax = height[left]\n        else: trapped += leftMax - height[left]\n        left += 1\n    else:\n        if height[right] >= rightMax: rightMax = height[right]\n        else: trapped += rightMax - height[right]\n        right -= 1\nreturn trapped",
    "pseudocode": "function trap(height):\n    left = 0\n    right = length(height) - 1\n    leftMax = 0\n    rightMax = 0\n    trapped = 0\n    while left < right:\n        if height[left] <= height[right]:\n            if height[left] >= leftMax:\n                leftMax = height[left]\n            else:\n                trapped = trapped + (leftMax - height[left])\n            left = left + 1\n        else:\n            if height[right] >= rightMax:\n                rightMax = height[right]\n            else:\n                trapped = trapped + (rightMax - height[right])\n            right = right - 1\n    return trapped",
    "walkthrough": {
      "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
      "description": "Two-pointer dual maximum water trapping:",
      "tableHeaders": [
        "left",
        "right",
        "h[left]",
        "h[right]",
        "leftMax",
        "rightMax",
        "Water Added",
        "trapped"
      ],
      "tableRows": [
        [
          "0",
          "11",
          "0",
          "1",
          "0",
          "0",
          "leftMax = 0",
          "0"
        ],
        [
          "1",
          "11",
          "1",
          "1",
          "1",
          "0",
          "leftMax = 1",
          "0"
        ],
        [
          "2",
          "11",
          "0",
          "1",
          "1",
          "0",
          "1 - 0 = 1",
          "1"
        ],
        [
          "3",
          "11",
          "2",
          "1",
          "2",
          "0",
          "h[left]>h[right] → right switch",
          "1"
        ],
        [
          "3",
          "11",
          "2",
          "1",
          "2",
          "1",
          "rightMax = 1",
          "1"
        ],
        [
          "3",
          "10",
          "2",
          "2",
          "2",
          "2",
          "rightMax = 2",
          "1"
        ],
        [
          "...",
          "...",
          "...",
          "...",
          "...",
          "...",
          "...",
          "Total = 6 ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "height = [3, 0, 2, 0, 4]",
        "expected": "7",
        "explanation": "Water trapped between interior bars: (3-0)+(3-2)+(3-0) = 3 + 1 + 3 = 7."
      },
      {
        "case": "height = [1, 2, 3, 4, 5]",
        "expected": "0",
        "explanation": "Strictly increasing slope cannot trap any water."
      },
      {
        "case": "height = [2, 0, 2]",
        "expected": "2",
        "explanation": "Single valley: min(2, 2) - 0 = 2."
      }
    ],
    "code": {
      "python": "class Solution:\n    def trap(self, height: List[int]) -> int:\n        left, right = 0, len(height) - 1\n        left_max, right_max = 0, 0\n        trapped = 0\n        \n        while left < right:\n            if height[left] <= height[right]:\n                if height[left] >= left_max:\n                    left_max = height[left]\n                else:\n                    trapped += left_max - height[left]\n                left += 1\n            else:\n                if height[right] >= right_max:\n                    right_max = height[right]\n                else:\n                    trapped += right_max - height[right]\n                right -= 1\n                \n        return trapped",
      "cpp": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int leftMax = 0, rightMax = 0;\n        int trapped = 0;\n        \n        while (left < right) {\n            if (height[left] <= height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    trapped += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    trapped += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n        return trapped;\n    }\n};",
      "java": "class Solution {\n    public int trap(int[] height) {\n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0;\n        int trapped = 0;\n        \n        while (left < right) {\n            if (height[left] <= height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    trapped += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    trapped += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n        return trapped;\n    }\n}",
      "javascript": "var trap = function(height) {\n    let left = 0, right = height.length - 1;\n    let leftMax = 0, rightMax = 0;\n    let trapped = 0;\n    \n    while (left < right) {\n        if (height[left] <= height[right]) {\n            if (height[left] >= leftMax) {\n                leftMax = height[left];\n            } else {\n                trapped += leftMax - height[left];\n            }\n            left++;\n        } else {\n            if (height[right] >= rightMax) {\n                rightMax = height[right];\n            } else {\n                trapped += rightMax - height[right];\n            }\n            right--;\n        }\n    }\n    return trapped;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Outer pointers left = 0 and right = len(height) - 1.",
        "Line 4: Track running left_max and right_max.",
        "Line 7-19: Advance whichever side is smaller, guaranteeing that the bottleneck is known without seeing other bars."
      ],
      "cpp": [
        "Line 4: Pointers at extremities.",
        "Line 5-6: Track max heights seen from left and right.",
        "Line 8-24: Add trapped water using the guaranteed bottleneck boundary, moving pointers inward."
      ],
      "java": [
        "Line 3: Initialize endpoints.",
        "Line 4-5: Track max bounds.",
        "Line 7-23: Compute water column-by-column in O(1) space."
      ],
      "javascript": [
        "Line 2: Pointers at edges.",
        "Line 3-4: Running boundaries.",
        "Line 6-22: Linear convergence aggregating trapped water."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Using two separate O(N) arrays (prefixMax and suffixMax), which consumes O(N) extra space when O(1) is expected in top interviews.",
      "Updating trapped water using the wrong boundary (e.g. rightMax when advancing left).",
      "Adding water when height[left] is greater than leftMax (negative water)."
    ],
    "takeaway": "Water height is decided by the shorter boundary; advancing the smaller side allows computing trapped water in O(1) space.",
    "hints": [
      "At any position i, how much water can be trapped? Exactly min(max_left, max_right) - height[i].",
      "Can you maintain running max_left and max_right with two pointers from both ends?",
      "If height[left] < height[right], you know for certain that max_left < max_right, so water at left depends only on max_left."
    ]
  },
  "arr-tp-16": {
    "id": "arr-tp-16",
    "leetcodeNumber": 41,
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Cycle Sort / In-Place Index Mapping",
    "leetcodeUrl": "https://leetcode.com/problems/first-missing-positive/",
    "problemUnderstanding": "Given an unsorted integer array nums, return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(N) time and uses O(1) auxiliary space.",
    "whyItMatters": "Pinnacle in-place array manipulation. Shows how the array itself can be repurposed as its own hash set by placing each number x at index x - 1.",
    "patternExplanation": "For an array of length n, the smallest missing positive integer MUST be in the range [1, n + 1]. We can use Cycle Sort to place every number x in 1 <= x <= n at its correct index x - 1. A second linear scan identifies the first index where nums[i] != i + 1.",
    "recognitionSignals": [
      "Smallest missing positive integer in an unsorted array",
      "Strict O(N) runtime constraint",
      "Strict O(1) auxiliary space constraint (hash set forbidden)",
      "Pigeonhole principle: answer is strictly bounded in [1, n + 1]"
    ],
    "thoughtProcess": "Using a hash set takes O(N) space. Sorting takes O(N log N) time. The key observation is that an array of size n can at most hold all numbers from 1 to n. If all numbers 1 to n are present, the answer is n + 1. Otherwise, the answer is the first missing integer in [1, n]. We place each valid number nums[i] into its home index nums[i] - 1 by swapping. Each swap places at least one number in its permanent position, taking O(N) total swaps.",
    "approach": [
      "1. Traverse nums with index i from 0 to n - 1.",
      "2. While nums[i] is positive (1 <= nums[i] <= n) and not already at its correct position (nums[nums[i] - 1] != nums[i]):",
      "   - Swap nums[i] with nums[nums[i] - 1].",
      "3. After cycle sort, scan nums from index 0 to n - 1.",
      "4. If nums[i] != i + 1, return i + 1 immediately.",
      "5. If all indices match, return n + 1."
    ],
    "algorithm": "for i in 0 to n - 1:\n    while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n        swap(nums[i], nums[nums[i] - 1])\nfor i in 0 to n - 1:\n    if nums[i] != i + 1: return i + 1\nreturn n + 1",
    "pseudocode": "function firstMissingPositive(nums):\n    n = length(nums)\n    for i from 0 to n - 1:\n        while nums[i] > 0 and nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            targetIdx = nums[i] - 1\n            swap(nums[i], nums[targetIdx])\n    for i from 0 to n - 1:\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1",
    "walkthrough": {
      "input": "nums = [3, 4, -1, 1]",
      "description": "Cycle sort placing x at index x - 1:",
      "tableHeaders": [
        "i",
        "nums[i]",
        "Target Index (nums[i] - 1)",
        "Action",
        "nums state"
      ],
      "tableRows": [
        [
          "0",
          "3",
          "2",
          "Swap nums[0] and nums[2]",
          "[-1, 4, 3, 1]"
        ],
        [
          "0",
          "-1",
          "-",
          "Out of range (< 1) → advance i",
          "[-1, 4, 3, 1]"
        ],
        [
          "1",
          "4",
          "3",
          "Swap nums[1] and nums[3]",
          "[-1, 1, 3, 4]"
        ],
        [
          "1",
          "1",
          "0",
          "Swap nums[1] and nums[0]",
          "[1, -1, 3, 4]"
        ],
        [
          "1",
          "-1",
          "-",
          "Out of range → advance i",
          "[1, -1, 3, 4]"
        ],
        [
          "Scan",
          "-",
          "-",
          "Index 1 has value -1 != 2",
          "Return 2 ✓"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [1, 2, 0]",
        "expected": "3",
        "explanation": "Numbers 1 and 2 are present; first missing positive is 3."
      },
      {
        "case": "nums = [7, 8, 9, 11, 12]",
        "expected": "1",
        "explanation": "No values in [1, 5] are present; returns 1 immediately."
      },
      {
        "case": "nums = [1, 1]",
        "expected": "2",
        "explanation": "Duplicates do not trigger infinite swap loop because nums[nums[i] - 1] != nums[i] check handles identity."
      }
    ],
    "code": {
      "python": "class Solution:\n    def firstMissingPositive(self, nums: List[int]) -> int:\n        n = len(nums)\n        for i in range(n):\n            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n                correct_idx = nums[i] - 1\n                nums[i], nums[correct_idx] = nums[correct_idx], nums[i]\n                \n        for i in range(n):\n            if nums[i] != i + 1:\n                return i + 1\n                \n        return n + 1",
      "cpp": "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; ++i) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                swap(nums[i], nums[nums[i] - 1]);\n            }\n        }\n        for (int i = 0; i < n; ++i) {\n            if (nums[i] != i + 1) {\n                return i + 1;\n            }\n        }\n        return n + 1;\n    }\n};",
      "java": "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                int correctIdx = nums[i] - 1;\n                int tmp = nums[i];\n                nums[i] = nums[correctIdx];\n                nums[correctIdx] = tmp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            if (nums[i] != i + 1) {\n                return i + 1;\n            }\n        }\n        return n + 1;\n    }\n}",
      "javascript": "var firstMissingPositive = function(nums) {\n    const n = nums.length;\n    for (let i = 0; i < n; i++) {\n        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {\n            const correctIdx = nums[i] - 1;\n            const tmp = nums[i];\n            nums[i] = nums[correctIdx];\n            nums[correctIdx] = tmp;\n        }\n    }\n    for (let i = 0; i < n; i++) {\n        if (nums[i] !== i + 1) {\n            return i + 1;\n        }\n    }\n    return n + 1;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 4-7: Cycle sort loop: swap nums[i] with target location nums[i] - 1 while within range.",
        "Line 9-11: Scan for the first index where value is not index + 1.",
        "Line 13: If all [1...n] match, return n + 1."
      ],
      "cpp": [
        "Line 5-7: In-place cycle swapping using std::swap.",
        "Line 9-13: Linear verification pass returning first missing positive.",
        "Line 14: Fallback return n + 1."
      ],
      "java": [
        "Line 4-10: Swap elements to home indices.",
        "Line 11-15: Find index discrepancy.",
        "Line 16: Return n + 1."
      ],
      "javascript": [
        "Line 3-9: In-place bucket/cycle placement.",
        "Line 10-14: Search for mismatched index.",
        "Line 15: Return n + 1."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Using an 'if' instead of 'while' when swapping, which fails to place newly swapped numbers at their correct positions.",
      "Checking nums[i] != i + 1 instead of nums[nums[i] - 1] != nums[i], causing infinite loops on duplicate numbers (e.g. [1, 1]).",
      "Index out of bounds when accessing nums[nums[i] - 1] without checking 1 <= nums[i] <= n first."
    ],
    "takeaway": "By using cycle sort to place each number x at index x - 1, we turn the input array into an in-place hash map.",
    "hints": [
      "For an array of length n, what is the maximum possible value the first missing positive could be? (At most n + 1).",
      "Can you use the array itself as a hash table by placing value x at index x - 1?",
      "Use a while loop with swapping to put each number in [1, n] at its correct index, then find the first mismatch."
    ]
  },
  "arr-tp-17": {
    "id": "arr-tp-17",
    "leetcodeNumber": 1793,
    "title": "Maximum Score of a Good Subarray",
    "difficulty": "Hard",
    "category": "Array",
    "categoryId": "array",
    "pattern": "Two Pointers",
    "patternId": "array-two-pointers",
    "subPattern": "Greedy Outward Expansion",
    "leetcodeUrl": "https://leetcode.com/problems/maximum-score-of-a-good-subarray/",
    "problemUnderstanding": "You are given an array of integers nums (0-indexed) and an integer k. The score of a subarray (i, j) is min(nums[i...j]) * (j - i + 1). A good subarray is one where i <= k <= j. Return the maximum possible score of a good subarray.",
    "whyItMatters": "Demonstrates greedy two-pointer expansion outward from a fixed seed index, avoiding O(N) monotonic stack overhead.",
    "patternExplanation": "Start at index k with left = k and right = k. To maximize min(nums[left...right]) * (right - left + 1), at each step expand the pointer that points to the larger adjacent element. This greedily preserves the highest possible minimum value as width grows.",
    "recognitionSignals": [
      "Subarray must include a specific anchor index k (i <= k <= j)",
      "Score function involves min(subarray) * length",
      "Requires optimization from O(N^2) brute force to linear O(N)"
    ],
    "thoughtProcess": "A brute force expansion checking all subarrays containing k takes O(N^2). We can start with a 1-element window at index k (score = nums[k]). At each step, we expand either left or right. To maximize min(subarray), we look at nums[left - 1] and nums[right + 1]. Expanding into the larger adjacent value is always optimal because expanding into the smaller value strictly degrades or limits the minimum sooner.",
    "approach": [
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
    "algorithm": "left = k, right = k, curMin = nums[k], maxScore = nums[k]\nwhile left > 0 or right < n - 1:\n    if left == 0: right += 1\n    elif right == n - 1: left -= 1\n    elif nums[left - 1] < nums[right + 1]: right += 1\n    else: left -= 1\n    curMin = min(curMin, nums[left], nums[right])\n    maxScore = max(maxScore, curMin * (right - left + 1))\nreturn maxScore",
    "pseudocode": "function maximumScore(nums, k):\n    n = length(nums)\n    left = k\n    right = k\n    curMin = nums[k]\n    maxScore = nums[k]\n    while left > 0 or right < n - 1:\n        if left == 0:\n            right = right + 1\n        else if right == n - 1:\n            left = left - 1\n        else if nums[left - 1] < nums[right + 1]:\n            right = right + 1\n        else:\n            left = left - 1\n        curMin = min(curMin, nums[left], nums[right])\n        maxScore = max(maxScore, curMin * (right - left + 1))\n    return maxScore",
    "walkthrough": {
      "input": "nums = [1, 4, 3, 7, 4, 5], k = 3",
      "description": "Greedy outward expansion from anchor k = 3 (nums[3] = 7):",
      "tableHeaders": [
        "left",
        "right",
        "left neighbor",
        "right neighbor",
        "Expanded",
        "curMin",
        "Length",
        "Score"
      ],
      "tableRows": [
        [
          "3",
          "3",
          "3 (idx 2)",
          "4 (idx 4)",
          "Initial at k",
          "7",
          "1",
          "7 * 1 = 7"
        ],
        [
          "3",
          "4",
          "3 (idx 2)",
          "5 (idx 5)",
          "right++ (4 > 3)",
          "4",
          "2",
          "4 * 2 = 8"
        ],
        [
          "3",
          "5",
          "3 (idx 2)",
          "None",
          "right++ (5 > 3)",
          "4",
          "3",
          "4 * 3 = 12"
        ],
        [
          "2",
          "5",
          "4 (idx 1)",
          "None",
          "left--",
          "3",
          "4",
          "3 * 4 = 12"
        ],
        [
          "1",
          "5",
          "1 (idx 0)",
          "None",
          "left--",
          "3",
          "5",
          "3 * 5 = 15 ✓"
        ],
        [
          "0",
          "5",
          "None",
          "None",
          "left--",
          "1",
          "6",
          "1 * 6 = 6"
        ]
      ]
    },
    "edgeCases": [
      {
        "case": "nums = [5, 5, 4, 5, 4, 1, 1, 1], k = 0",
        "expected": "20",
        "explanation": "k is at index 0; expands only to the right."
      },
      {
        "case": "nums = [65535], k = 0",
        "expected": "65535",
        "explanation": "Single element array returns nums[0]."
      },
      {
        "case": "nums = [1, 1, 1, 1], k = 2",
        "expected": "4",
        "explanation": "Equal values expand smoothly across entire array."
      }
    ],
    "code": {
      "python": "class Solution:\n    def maximumScore(self, nums: List[int], k: int) -> int:\n        n = len(nums)\n        left = right = k\n        cur_min = nums[k]\n        max_score = nums[k]\n        \n        while left > 0 or right < n - 1:\n            if left == 0:\n                right += 1\n            elif right == n - 1:\n                left -= 1\n            elif nums[left - 1] < nums[right + 1]:\n                right += 1\n            else:\n                left -= 1\n            cur_min = min(cur_min, nums[left], nums[right])\n            max_score = max(max_score, cur_min * (right - left + 1))\n            \n        return max_score",
      "cpp": "class Solution {\npublic:\n    int maximumScore(vector<int>& nums, int k) {\n        int n = nums.size();\n        int left = k, right = k;\n        int curMin = nums[k];\n        int maxScore = nums[k];\n        \n        while (left > 0 || right < n - 1) {\n            if (left == 0) {\n                right++;\n            } else if (right == n - 1) {\n                left--;\n            } else if (nums[left - 1] < nums[right + 1]) {\n                right++;\n            } else {\n                left--;\n            }\n            curMin = min({curMin, nums[left], nums[right]});\n            maxScore = max(maxScore, curMin * (right - left + 1));\n        }\n        return maxScore;\n    }\n};",
      "java": "class Solution {\n    public int maximumScore(int[] nums, int k) {\n        int n = nums.length;\n        int left = k, right = k;\n        int curMin = nums[k];\n        int maxScore = nums[k];\n        \n        while (left > 0 || right < n - 1) {\n            if (left == 0) {\n                right++;\n            } else if (right == n - 1) {\n                left--;\n            } else if (nums[left - 1] < nums[right + 1]) {\n                right++;\n            } else {\n                left--;\n            }\n            curMin = Math.min(curMin, Math.min(nums[left], nums[right]));\n            maxScore = Math.max(maxScore, curMin * (right - left + 1));\n        }\n        return maxScore;\n    }\n}",
      "javascript": "var maximumScore = function(nums, k) {\n    const n = nums.length;\n    let left = k, right = k;\n    let curMin = nums[k];\n    let maxScore = nums[k];\n    \n    while (left > 0 || right < n - 1) {\n        if (left === 0) {\n            right++;\n        } else if (right === n - 1) {\n            left--;\n        } else if (nums[left - 1] < nums[right + 1]) {\n            right++;\n        } else {\n            left--;\n        }\n        curMin = Math.min(curMin, nums[left], nums[right]);\n        maxScore = Math.max(maxScore, curMin * (right - left + 1));\n    }\n    return maxScore;\n};"
    },
    "codeExplanation": {
      "python": [
        "Line 3: Set anchor pointers left = k and right = k.",
        "Line 7-16: Greedily expand outward into whichever neighbor is larger.",
        "Line 17-18: Update running minimum and score = cur_min * length."
      ],
      "cpp": [
        "Line 4-6: Anchor at index k.",
        "Line 9-19: Compare adjacent boundary values and step outward.",
        "Line 20-21: Update curMin and maxScore."
      ],
      "java": [
        "Line 3-6: Setup anchor pointers and base values.",
        "Line 8-20: Greedy outward traversal checking left and right neighbors.",
        "Line 21: Return maxScore."
      ],
      "javascript": [
        "Line 3-5: Start with window containing single element nums[k].",
        "Line 7-18: Expand towards larger neighbor, tracking product score."
      ]
    },
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "commonMistakes": [
      "Expanding towards the smaller neighbor, which needlessly degrades the minimum value prematurely.",
      "Not handling boundary conditions when one pointer hits index 0 or n - 1.",
      "Using a monotonic stack which requires O(N) auxiliary space, when two pointers achieves O(1) space."
    ],
    "takeaway": "Greedily expand outward from index k into the larger adjacent neighbor to maintain the highest possible minimum value.",
    "hints": [
      "Start with the smallest valid subarray: the single element at index k.",
      "At each step, you can expand either left or right. Which direction should you choose?",
      "Always expand towards the larger adjacent element to keep the minimum as large as possible."
    ]
  }
};

  if (typeof root.DsaProblemDatabase.registerBatch === 'function') {
    root.DsaProblemDatabase.registerBatch(arrayExplanations);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = arrayExplanations;
  }
})();
