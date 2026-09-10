const fs = require('fs');
const path = require('path');

const p1_problems = {
  "arr-tp-01": {
    id: "arr-tp-01",
    leetcodeNumber: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    categoryId: "array",
    pattern: "Hash Map / Complement Lookup",
    patternId: "array-two-pointers",
    subPattern: "Complement Lookup",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    problemUnderstanding: "Given an integer array nums and an integer target, find the exact two distinct indices whose values sum up to target. You may not use the same element twice.",
    whyItMatters: "Two Sum is the foundational interview problem illustrating time-space tradeoffs. It teaches how substituting a nested O(N^2) pairwise search with an O(1) hash map lookup dramatically improves runtime to linear O(N).",
    patternExplanation: "Although placed in array fundamentals, the optimal pattern is Complement Lookup via Hash Map. For any current element x, the required complement is uniquely determined as (target - x). By querying a hash map of previously visited values in O(1) average time, we find our pair in a single pass.",
    recognitionSignals: [
      "Finding two elements that satisfy a linear sum equation (A + B = Target)",
      "Indices must be returned from an unsorted collection without modifying order",
      "Need faster runtime than quadratic brute force O(N^2)",
      "The complement (target - current) can be computed in constant time"
    ],
    thoughtProcess: "A brute-force scan checks every pair (i, j) with two nested loops in O(N^2) time. We observe that for each element x, the partner we need is fixed: target - x. Instead of scanning the remaining array repeatedly, we store each visited number and its index in a hash map, converting the pair discovery into constant-time lookups.",
    approach: [
      "1. Initialize an empty hash map 'seen' mapping number value to its array index.",
      "2. Iterate through nums with index i from 0 to n - 1.",
      "3. Compute complement = target - nums[i].",
      "4. If complement exists in 'seen', return its stored index and current index i.",
      "5. Otherwise, record seen[nums[i]] = i and continue.",
      "6. If loop finishes with no match, return an empty array."
    ],
    algorithm: "seen = {}\nfor i in 0 to len(nums)-1:\n    comp = target - nums[i]\n    if comp in seen:\n        return [seen[comp], i]\n    seen[nums[i]] = i\nreturn []",
    pseudocode: `function twoSum(nums, target):
    seen = empty hash map
    for i from 0 to length(nums) - 1:
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i
    return []`,
    walkthrough: {
      input: "nums = [2, 7, 11, 15], target = 9",
      description: "Step-by-step lookup of complement in hash map:",
      tableHeaders: ["i", "nums[i]", "Complement (9 - nums[i])", "Seen Map", "Action"],
      tableRows: [
        ["0", "2", "7", "{}", "7 not in map → insert seen[2] = 0"],
        ["1", "7", "2", "{2: 0}", "2 in map! → match found at indices [0, 1]"]
      ]
    },
    edgeCases: [
      { case: "nums = [3, 3], target = 6", expected: "[0, 1]", explanation: "Duplicate values are correctly matched because complement 3 is found before second 3 overwrites the map." },
      { case: "nums = [-1, -2, -3, -4, -5], target = -8", expected: "[2, 4]", explanation: "Negative values are supported naturally via algebraic subtraction." },
      { case: "nums = [0, 4, 3, 0], target = 0", expected: "[0, 3]", explanation: "Zero complement matches zero without self-pairing." }
    ],
    code: {
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      javascript: `var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`
    },
    codeExplanation: {
      python: [
        "Line 3: Initialize dictionary 'seen' to store value-to-index associations.",
        "Line 4: Enumerate nums to access both index and value simultaneously.",
        "Line 5: Calculate the required counterpart 'complement = target - num'.",
        "Line 6-7: If counterpart exists in 'seen', return its stored index and current index i.",
        "Line 8: Store current number and index into seen for future lookups."
      ],
      cpp: [
        "Line 4: Declare unordered_map<int, int> seen for O(1) average hash lookups.",
        "Line 5: Loop through array with standard 0-indexed loop.",
        "Line 6: Compute complement = target - nums[i].",
        "Line 7-9: Check if complement exists; if found, return immediate index pair.",
        "Line 10: Insert current number and index into hash table."
      ],
      java: [
        "Line 3: Instantiate HashMap<Integer, Integer> seen.",
        "Line 4: Iterate through nums with index i.",
        "Line 5: Compute complement = target - nums[i].",
        "Line 6-8: If seen.containsKey(complement), return integer array with [seen.get(complement), i].",
        "Line 9: Put current value and index into map."
      ],
      javascript: [
        "Line 2: Instantiate new Map() for fast key-value retrieval.",
        "Line 3: For loop iterating across nums.",
        "Line 4: Compute complement = target - nums[i].",
        "Line 5-7: Query seen.has(complement); if present, return index pair array.",
        "Line 8: Set current element in map with seen.set(nums[i], i)."
      ]
    },
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    commonMistakes: [
      "Inserting nums[i] into the map BEFORE checking for the complement, which causes an element to pair with itself (e.g. target = 6, nums[0] = 3).",
      "Returning array values instead of original indices.",
      "Assuming array is sorted and applying two pointers without preserving original index mapping."
    ],
    takeaway: "When solving pair-sum queries, remember target - current. A hash map converts an O(N^2) pairwise search into an O(N) single-pass lookup.",
    hints: [
      "Instead of checking every pair with nested loops, consider what single value is needed to complete the target sum.",
      "For any number x, the only value that completes the sum is target - x.",
      "Can you store previously seen numbers in a hash map so you can check if target - x exists in O(1) time?"
    ]
  },

  "arr-tp-02": {
    id: "arr-tp-02",
    leetcodeNumber: 26,
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "Array",
    categoryId: "array",
    pattern: "Two Pointers",
    patternId: "array-two-pointers",
    subPattern: "Slow & Fast Runner",
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    problemUnderstanding: "Given an integer array nums sorted in non-decreasing order, remove duplicate elements in-place so that each unique element appears only once. Maintain the relative order of the elements and return the count of unique elements k.",
    whyItMatters: "Demonstrates in-place array mutation without extra memory allocation. It is the classic example of the Slow/Fast runner two-pointer technique.",
    patternExplanation: "Since the array is sorted, identical values are grouped contiguously. A fast pointer scans ahead discovering new values, while a slow pointer designates the write position for confirmed unique items.",
    recognitionSignals: [
      "Array is already sorted in non-decreasing order",
      "Requires in-place modification with O(1) extra space",
      "Contiguous duplicate elements must be compressed",
      "Relative order of unique elements must be maintained"
    ],
    thoughtProcess: "Creating a new array or hash set takes O(N) extra space, which violates the in-place constraint. Because the array is sorted, duplicates are strictly adjacent. We can maintain a write pointer 'slow' at the last unique element confirmed, and advance a 'fast' reader pointer. Whenever nums[fast] differs from nums[slow], we increment slow and write nums[fast] there.",
    approach: [
      "1. If nums is empty, return 0.",
      "2. Initialize slow pointer at index 0.",
      "3. Iterate fast pointer from index 1 to n - 1.",
      "4. Compare nums[fast] with nums[slow]. If nums[fast] != nums[slow], increment slow and set nums[slow] = nums[fast].",
      "5. Return slow + 1 as the total number of unique elements."
    ],
    algorithm: "if nums empty return 0\nslow = 0\nfor fast from 1 to len(nums)-1:\n    if nums[fast] != nums[slow]:\n        slow += 1\n        nums[slow] = nums[fast]\nreturn slow + 1",
    pseudocode: `function removeDuplicates(nums):
    if length(nums) == 0:
        return 0
    slow = 0
    for fast from 1 to length(nums) - 1:
        if nums[fast] != nums[slow]:
            slow = slow + 1
            nums[slow] = nums[fast]
    return slow + 1`,
    walkthrough: {
      input: "nums = [1, 1, 2]",
      description: "Slow/Fast pointer step progression:",
      tableHeaders: ["fast", "nums[fast]", "nums[slow]", "Condition (≠)", "slow", "Array State"],
      tableRows: [
        ["Initial", "-", "-", "-", "0", "[1, 1, 2]"],
        ["1", "1", "1", "False (duplicate)", "0", "[1, 1, 2]"],
        ["2", "2", "1", "True (unique found)", "1", "[1, 2, 2] (k = 2)"]
      ]
    },
    edgeCases: [
      { case: "nums = [1]", expected: "1", explanation: "Single element array has 1 unique element; fast loop does not execute." },
      { case: "nums = [1, 1, 1, 1]", expected: "1", explanation: "All elements duplicate; slow stays 0, returns 1." },
      { case: "nums = [1, 2, 3, 4]", expected: "4", explanation: "All distinct elements; every element moves slow forward by 1." }
    ],
    code: {
      python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        slow = 0
        for fast in range(1, len(nums)):
            if nums[fast] != nums[slow]:
                slow += 1
                nums[slow] = nums[fast]
        return slow + 1`,
      cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.size(); ++fast) {
            if (nums[fast] != nums[slow]) {
                nums[++slow] = nums[fast];
            }
        }
        return slow + 1;
    }
};`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) {
                nums[++slow] = nums[fast];
            }
        }
        return slow + 1;
    }
}`,
      javascript: `var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    let slow = 0;
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            nums[++slow] = nums[fast];
        }
    }
    return slow + 1;
};`
    },
    codeExplanation: {
      python: [
        "Line 3-4: Guard check for empty array.",
        "Line 5: Set write pointer 'slow' at index 0.",
        "Line 6-7: Fast pointer scans from index 1 forward, comparing with current unique tail.",
        "Line 8-9: When a new value is found, advance slow and overwrite nums[slow].",
        "Line 10: Return slow + 1 as count of unique items."
      ],
      cpp: [
        "Line 3: Guard clause for empty vector.",
        "Line 4: 'slow' tracks index of last written unique element.",
        "Line 5-8: 'fast' reads every element; when nums[fast] != nums[slow], pre-increment slow and overwrite.",
        "Line 9: Return slow + 1."
      ],
      java: [
        "Line 2: Guard against empty array.",
        "Line 3: Initialize slow write pointer.",
        "Line 4-7: Scan array with fast pointer, updating nums[++slow] on novelty.",
        "Line 8: Return slow + 1."
      ],
      javascript: [
        "Line 2: Guard for 0 length.",
        "Line 3: Let slow index start at 0.",
        "Line 4-7: For loop traversing fast from 1 to length - 1, rewriting novel elements.",
        "Line 8: Return slow + 1."
      ]
    },
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Using Array.splice() or vector::erase(), which introduces an O(N) shift per duplicate, leading to O(N^2) total runtime.",
      "Returning slow instead of slow + 1 (off-by-one error since slow is 0-indexed).",
      "Comparing nums[fast] with nums[fast - 1] without properly managing write index."
    ],
    takeaway: "For in-place duplicate removal in sorted sequences, maintain a slow write pointer and a fast read pointer.",
    hints: [
      "Notice the array is already sorted, meaning duplicates must be adjacent.",
      "Can one pointer track the boundary of unique elements while another scans forward?",
      "Whenever the scanning pointer sees an element different from the unique boundary, advance the boundary and copy."
    ]
  },

  "arr-tp-03": {
    id: "arr-tp-03",
    leetcodeNumber: 27,
    title: "Remove Element",
    difficulty: "Easy",
    category: "Array",
    categoryId: "array",
    pattern: "Two Pointers",
    patternId: "array-two-pointers",
    subPattern: "In-Place Overwrite",
    leetcodeUrl: "https://leetcode.com/problems/remove-element/",
    problemUnderstanding: "Given an integer array nums and an integer val, remove all occurrences of val in-place. The order of elements can be changed. Return the number of elements in nums which are not equal to val.",
    whyItMatters: "Tests clean in-place array filtering. It teaches pointer-based partitioning without relying on auxiliary buffers.",
    patternExplanation: "A slow write pointer 'k' keeps track of where the next non-val element should be placed. A fast reader iterates through nums, copying non-val elements to nums[k].",
    recognitionSignals: [
      "In-place removal of a specific target value",
      "Element order does not need to be strictly preserved",
      "Space complexity must be strictly O(1)",
      "Return the count k of remaining valid elements"
    ],
    thoughtProcess: "Deleting elements directly shifts subsequent elements left, costing O(N^2). Instead, we can overwrite unwanted values by maintaining a write index 'k'. Every time we encounter nums[i] != val, we assign nums[k] = nums[i] and increment k. Elements beyond k are ignored.",
    approach: [
      "1. Initialize pointer k = 0.",
      "2. Iterate i from 0 to nums.length - 1.",
      "3. If nums[i] != val, set nums[k] = nums[i] and increment k.",
      "4. Return k as the count of remaining elements."
    ],
    algorithm: "k = 0\nfor i from 0 to len(nums)-1:\n    if nums[i] != val:\n        nums[k] = nums[i]\n        k += 1\nreturn k",
    pseudocode: `function removeElement(nums, val):
    k = 0
    for i from 0 to length(nums) - 1:
        if nums[i] != val:
            nums[k] = nums[i]
            k = k + 1
    return k`,
    walkthrough: {
      input: "nums = [3, 2, 2, 3], val = 3",
      description: "Trace of in-place filtering with write pointer k:",
      tableHeaders: ["i", "nums[i]", "Condition (!= 3)", "k before", "k after", "nums after write"],
      tableRows: [
        ["0", "3", "False", "0", "0", "[3, 2, 2, 3]"],
        ["1", "2", "True", "0", "1", "[2, 2, 2, 3]"],
        ["2", "2", "True", "1", "2", "[2, 2, 2, 3]"],
        ["3", "3", "False", "2", "2", "[2, 2, 2, 3] (k = 2)"]
      ]
    },
    edgeCases: [
      { case: "nums = [], val = 0", expected: "0", explanation: "Empty array returns k = 0." },
      { case: "nums = [1, 1, 1], val = 1", expected: "0", explanation: "All elements match val; none are copied, k = 0." },
      { case: "nums = [1, 2, 3], val = 4", expected: "3", explanation: "Target val not found; all elements preserved, k = 3." }
    ],
    code: {
      python: `class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k`,
      cpp: `class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
};`,
      java: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[k++] = nums[i];
            }
        }
        return k;
    }
}`,
      javascript: `var removeElement = function(nums, val) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k++] = nums[i];
        }
    }
    return k;
};`
    },
    codeExplanation: {
      python: [
        "Line 3: Initialize write pointer k = 0.",
        "Line 4-6: Iterate through array; whenever element != val, copy to nums[k] and increment k.",
        "Line 7: Return k."
      ],
      cpp: [
        "Line 3: Initialize write pointer k to 0.",
        "Line 4-7: For each element not equal to val, write into nums[k++] directly.",
        "Line 8: Return count k."
      ],
      java: [
        "Line 3: Initialize integer counter k = 0.",
        "Line 4-7: Copy elements not equal to val to index k and increment.",
        "Line 8: Return k."
      ],
      javascript: [
        "Line 2: Initialize index k = 0.",
        "Line 3-6: Overwrite nums[k++] whenever nums[i] !== val.",
        "Line 7: Return k."
      ]
    },
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Using splice() inside loop without adjusting index, leading to skipped elements.",
      "Attempting to resize array rather than overwriting valid prefix.",
      "Returning index rather than total count of valid elements."
    ],
    takeaway: "Maintain a write pointer at the head of the array and copy valid elements forward in a single linear pass.",
    hints: [
      "You do not need to delete elements physically; you only need to ensure the first k elements contain non-val numbers.",
      "Can a write pointer track the next available slot for a non-val element?",
      "Iterate with a read pointer, and whenever the number is not val, write it at the write pointer."
    ]
  },

  "arr-tp-04": {
    id: "arr-tp-04",
    leetcodeNumber: 283,
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "Array",
    categoryId: "array",
    pattern: "Two Pointers",
    patternId: "array-two-pointers",
    subPattern: "In-Place Partitioning",
    leetcodeUrl: "https://leetcode.com/problems/move-zeroes/",
    problemUnderstanding: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place without making a copy of the array.",
    whyItMatters: "Standard array partitioning problem. Shows how to pack valid elements to the front while padding the suffix.",
    patternExplanation: "Use a two-pointer approach where insertPos tracks the location for the next non-zero element. Read through nums; whenever nums[i] != 0, assign nums[insertPos++] = nums[i]. Afterwards, fill from insertPos to end with 0s.",
    recognitionSignals: [
      "Moving specific values (zeroes) to one end of an array",
      "Relative order of other elements must remain stable",
      "Must be solved in-place with O(1) auxiliary space"
    ],
    thoughtProcess: "A naive approach collects non-zeroes in a new list, costing O(N) space. By scanning with a reader index and placing non-zeroes sequentially at an insertPos pointer, we compress all non-zeroes to the prefix in order. Finally, we set all indices from insertPos to n - 1 to zero.",
    approach: [
      "1. Initialize insertPos = 0.",
      "2. Loop through nums with index i from 0 to n - 1.",
      "3. If nums[i] != 0, write nums[insertPos++] = nums[i].",
      "4. After loop, fill all remaining positions from insertPos to n - 1 with 0."
    ],
    algorithm: "insertPos = 0\nfor i from 0 to len(nums)-1:\n    if nums[i] != 0:\n        nums[insertPos] = nums[i]\n        insertPos += 1\nwhile insertPos < len(nums):\n    nums[insertPos] = 0\n    insertPos += 1",
    pseudocode: `function moveZeroes(nums):
    insertPos = 0
    for i from 0 to length(nums) - 1:
        if nums[i] != 0:
            nums[insertPos] = nums[i]
            insertPos = insertPos + 1
    while insertPos < length(nums):
        nums[insertPos] = 0
        insertPos = insertPos + 1`,
    walkthrough: {
      input: "nums = [0, 1, 0, 3, 12]",
      description: "Compressing non-zeroes then padding with zeros:",
      tableHeaders: ["i", "nums[i]", "Action", "insertPos", "nums state"],
      tableRows: [
        ["0", "0", "Skip (is 0)", "0", "[0, 1, 0, 3, 12]"],
        ["1", "1", "nums[0] = 1", "1", "[1, 1, 0, 3, 12]"],
        ["2", "0", "Skip (is 0)", "1", "[1, 1, 0, 3, 12]"],
        ["3", "3", "nums[1] = 3", "2", "[1, 3, 0, 3, 12]"],
        ["4", "12", "nums[2] = 12", "3", "[1, 3, 12, 3, 12]"],
        ["Pad", "-", "Set nums[3..4] = 0", "5", "[1, 3, 12, 0, 0] ✓"]
      ]
    },
    edgeCases: [
      { case: "nums = [0]", expected: "[0]", explanation: "Single zero stays [0]." },
      { case: "nums = [1, 2, 3]", expected: "[1, 2, 3]", explanation: "No zeroes present; array unmodified." },
      { case: "nums = [0, 0, 0]", expected: "[0, 0, 0]", explanation: "All zeroes; remains all zeroes." }
    ],
    code: {
      python: `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        insert_pos = 0
        for num in nums:
            if num != 0:
                nums[insert_pos] = num
                insert_pos += 1
        while insert_pos < len(nums):
            nums[insert_pos] = 0
            insert_pos += 1`,
      cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] != 0) {
                nums[insertPos++] = nums[i];
            }
        }
        while (insertPos < nums.size()) {
            nums[insertPos++] = 0;
        }
    }
};`,
      java: `class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[insertPos++] = nums[i];
            }
        }
        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }
    }
}`,
      javascript: `var moveZeroes = function(nums) {
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos++] = nums[i];
        }
    }
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
};`
    },
    codeExplanation: {
      python: [
        "Line 3: insert_pos pointer marks the position where the next non-zero should land.",
        "Line 4-7: Traverse elements, moving non-zero elements into contiguous prefix slots.",
        "Line 8-10: Pad remaining suffix slots with zero."
      ],
      cpp: [
        "Line 4: insertPos tracks current write position.",
        "Line 5-8: Compact non-zeroes into the front of the vector.",
        "Line 9-11: Zero-fill the rest of the vector up to nums.size()."
      ],
      java: [
        "Line 3: Set insertPos = 0.",
        "Line 4-7: Write non-zero elements sequentially.",
        "Line 8-10: Set elements from insertPos to end to 0."
      ],
      javascript: [
        "Line 2: Track insert position with integer insertPos.",
        "Line 3-6: Overwrite prefix with non-zero values in original sequence.",
        "Line 7-9: Fill remaining slots with 0."
      ]
    },
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    commonMistakes: [
      "Swapping elements unnecessarily when reading elements that are already in place.",
      "Forgetting to zero-fill the tail of the array after compacting non-zeroes.",
      "Creating an auxiliary array, violating the in-place requirement."
    ],
    takeaway: "Pack non-zero values sequentially into the prefix of the array, then pad the suffix with zeroes.",
    hints: [
      "Can you first move all non-zero elements to the front of the array in order?",
      "Keep track of the index where the next non-zero should be placed.",
      "After copying all non-zeroes to the front, fill all remaining indices with zeroes."
    ]
  }
};

console.log("Loaded " + Object.keys(p1_problems).length + " problems in p1");
