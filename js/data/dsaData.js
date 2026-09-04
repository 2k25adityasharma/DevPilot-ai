/**
 * DevPilot-AI — Curated DSA Pattern Roadmap Dataset
 * Complete hierarchy covering 16 major DSA patterns with authentic LeetCode problems,
 * direct canonical URLs, official problem numbers, and tiered difficulty ratings.
 */

const dsaRoadmap = [
  {
    "id": "array",
    "name": "Array",
    "icon": "data_array",
    "color": "#6366F1",
    "description": "Foundational contiguous memory operations, two pointers, sliding windows, prefix sums, and binary search.",
    "patterns": [
      {
        "id": "array-two-pointers",
        "name": "Two Pointers",
        "subPattern": "Two Pointers",
        "category": "Array",
        "description": "Pointers converging from ends or moving at different speeds across sorted or partitioned arrays.",
        "questions": [
          {
            "id": "arr-tp-01",
            "title": "Two Sum",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 1,
            "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
            "solved": false
          },
          {
            "id": "arr-tp-02",
            "title": "Remove Duplicates from Sorted Array",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 26,
            "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
            "solved": false
          },
          {
            "id": "arr-tp-03",
            "title": "Remove Element",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 27,
            "leetcodeUrl": "https://leetcode.com/problems/remove-element/",
            "solved": false
          },
          {
            "id": "arr-tp-04",
            "title": "Move Zeroes",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 283,
            "leetcodeUrl": "https://leetcode.com/problems/move-zeroes/",
            "solved": false
          },
          {
            "id": "arr-tp-05",
            "title": "Squares of a Sorted Array",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 977,
            "leetcodeUrl": "https://leetcode.com/problems/squares-of-a-sorted-array/",
            "solved": false
          },
          {
            "id": "arr-tp-06",
            "title": "Sort Array By Parity",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 905,
            "leetcodeUrl": "https://leetcode.com/problems/sort-array-by-parity/",
            "solved": false
          },
          {
            "id": "arr-tp-07",
            "title": "Two Sum II - Input Array Is Sorted",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 167,
            "leetcodeUrl": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
            "solved": false
          },
          {
            "id": "arr-tp-08",
            "title": "3Sum",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 15,
            "leetcodeUrl": "https://leetcode.com/problems/3sum/",
            "solved": false
          },
          {
            "id": "arr-tp-09",
            "title": "3Sum Closest",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 16,
            "leetcodeUrl": "https://leetcode.com/problems/3sum-closest/",
            "solved": false
          },
          {
            "id": "arr-tp-10",
            "title": "4Sum",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 18,
            "leetcodeUrl": "https://leetcode.com/problems/4sum/",
            "solved": false
          },
          {
            "id": "arr-tp-11",
            "title": "Container With Most Water",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 11,
            "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
            "solved": false
          },
          {
            "id": "arr-tp-12",
            "title": "Sort Colors",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 75,
            "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
            "solved": false
          },
          {
            "id": "arr-tp-13",
            "title": "Rotate Array",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 189,
            "leetcodeUrl": "https://leetcode.com/problems/rotate-array/",
            "solved": false
          },
          {
            "id": "arr-tp-14",
            "title": "Next Permutation",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 31,
            "leetcodeUrl": "https://leetcode.com/problems/next-permutation/",
            "solved": false
          },
          {
            "id": "arr-tp-15",
            "title": "Trapping Rain Water",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 42,
            "leetcodeUrl": "https://leetcode.com/problems/trapping-rain-water/",
            "solved": false
          },
          {
            "id": "arr-tp-16",
            "title": "First Missing Positive",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 41,
            "leetcodeUrl": "https://leetcode.com/problems/first-missing-positive/",
            "solved": false
          },
          {
            "id": "arr-tp-17",
            "title": "Maximum Score of a Good Subarray",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 1793,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-score-of-a-good-subarray/",
            "solved": false
          }
        ]
      },
      {
        "id": "array-sliding-window",
        "name": "Sliding Window",
        "subPattern": "Sliding Window",
        "category": "Array",
        "description": "Dynamic or fixed sub-segment expanding and contracting to optimize range computations.",
        "questions": [
          {
            "id": "arr-sw-01",
            "title": "Maximum Average Subarray I",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 643,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-average-subarray-i/",
            "solved": false
          },
          {
            "id": "arr-sw-02",
            "title": "Minimum Difference Between Highest and Lowest of K Scores",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 1984,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/",
            "solved": false
          },
          {
            "id": "arr-sw-03",
            "title": "Contains Duplicate II",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 219,
            "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate-ii/",
            "solved": false
          },
          {
            "id": "arr-sw-04",
            "title": "Minimum Size Subarray Sum",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 209,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-size-subarray-sum/",
            "solved": false
          },
          {
            "id": "arr-sw-05",
            "title": "Maximum Erasure Value",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 1695,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-erasure-value/",
            "solved": false
          },
          {
            "id": "arr-sw-06",
            "title": "Fruit Into Baskets",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 904,
            "leetcodeUrl": "https://leetcode.com/problems/fruit-into-baskets/",
            "solved": false
          },
          {
            "id": "arr-sw-07",
            "title": "Max Consecutive Ones III",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 1004,
            "leetcodeUrl": "https://leetcode.com/problems/max-consecutive-ones-iii/",
            "solved": false
          },
          {
            "id": "arr-sw-08",
            "title": "Subarray Product Less Than K",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 713,
            "leetcodeUrl": "https://leetcode.com/problems/subarray-product-less-than-k/",
            "solved": false
          },
          {
            "id": "arr-sw-09",
            "title": "Sliding Window Maximum",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 239,
            "leetcodeUrl": "https://leetcode.com/problems/sliding-window-maximum/",
            "solved": false
          },
          {
            "id": "arr-sw-10",
            "title": "Subarrays with K Different Integers",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 992,
            "leetcodeUrl": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
            "solved": false
          }
        ]
      },
      {
        "id": "array-prefix-based",
        "name": "Prefix Based",
        "subPattern": "Prefix Based",
        "category": "Array",
        "description": "Precomputed cumulative arrays enabling O(1) range queries and subarray sum lookups.",
        "questions": [
          {
            "id": "arr-pf-01",
            "title": "Range Sum Query - Immutable",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 303,
            "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-immutable/",
            "solved": false
          },
          {
            "id": "arr-pf-02",
            "title": "Find Pivot Index",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 724,
            "leetcodeUrl": "https://leetcode.com/problems/find-pivot-index/",
            "solved": false
          },
          {
            "id": "arr-pf-03",
            "title": "Running Sum of 1d Array",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 1480,
            "leetcodeUrl": "https://leetcode.com/problems/running-sum-of-1d-array/",
            "solved": false
          },
          {
            "id": "arr-pf-04",
            "title": "Find the Highest Altitude",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 1732,
            "leetcodeUrl": "https://leetcode.com/problems/find-the-highest-altitude/",
            "solved": false
          },
          {
            "id": "arr-pf-05",
            "title": "Subarray Sum Equals K",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 560,
            "leetcodeUrl": "https://leetcode.com/problems/subarray-sum-equals-k/",
            "solved": false
          },
          {
            "id": "arr-pf-06",
            "title": "Continuous Subarray Sum",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 523,
            "leetcodeUrl": "https://leetcode.com/problems/continuous-subarray-sum/",
            "solved": false
          },
          {
            "id": "arr-pf-07",
            "title": "Contiguous Array",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 525,
            "leetcodeUrl": "https://leetcode.com/problems/contiguous-array/",
            "solved": false
          },
          {
            "id": "arr-pf-08",
            "title": "Product of Array Except Self",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 238,
            "leetcodeUrl": "https://leetcode.com/problems/product-of-array-except-self/",
            "solved": false
          },
          {
            "id": "arr-pf-09",
            "title": "Subarray Sums Divisible by K",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 974,
            "leetcodeUrl": "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
            "solved": false
          },
          {
            "id": "arr-pf-10",
            "title": "Find Good Days to Rob the Bank",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 2100,
            "leetcodeUrl": "https://leetcode.com/problems/find-good-days-to-rob-the-bank/",
            "solved": false
          }
        ]
      },
      {
        "id": "array-kadanes-subarray",
        "name": "Kadane's / Subarray",
        "subPattern": "Kadane's / Subarray",
        "category": "Array",
        "description": "Optimal subvector tracking via local vs global accumulation and reset thresholds.",
        "questions": [
          {
            "id": "arr-kd-01",
            "title": "Best Time to Buy and Sell Stock",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Kadane's / Subarray",
            "leetcodeNumber": 121,
            "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            "solved": false
          },
          {
            "id": "arr-kd-02",
            "title": "Maximum Subarray",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Kadane's / Subarray",
            "leetcodeNumber": 53,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
            "solved": false
          },
          {
            "id": "arr-kd-03",
            "title": "Maximum Product Subarray",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Kadane's / Subarray",
            "leetcodeNumber": 152,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
            "solved": false
          },
          {
            "id": "arr-kd-04",
            "title": "Maximum Sum Circular Subarray",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Kadane's / Subarray",
            "leetcodeNumber": 918,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-sum-circular-subarray/",
            "solved": false
          },
          {
            "id": "arr-kd-05",
            "title": "Maximum Absolute Sum of Any Subarray",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Kadane's / Subarray",
            "leetcodeNumber": 1749,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/",
            "solved": false
          },
          {
            "id": "arr-kd-06",
            "title": "Max Subarray Sum with One Deletion",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Kadane's / Subarray",
            "leetcodeNumber": 1186,
            "leetcodeUrl": "https://leetcode.com/problems/max-subarray-sum-with-one-deletion/",
            "solved": false
          }
        ]
      },
      {
        "id": "array-binary-search",
        "name": "Binary Search",
        "subPattern": "Binary Search",
        "category": "Array",
        "description": "Logarithmic halving across sorted arrays, rotated domains, and monotonic answer spaces.",
        "questions": [
          {
            "id": "arr-bs-01",
            "title": "Binary Search",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 704,
            "leetcodeUrl": "https://leetcode.com/problems/binary-search/",
            "solved": false
          },
          {
            "id": "arr-bs-02",
            "title": "Search Insert Position",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 35,
            "leetcodeUrl": "https://leetcode.com/problems/search-insert-position/",
            "solved": false
          },
          {
            "id": "arr-bs-03",
            "title": "Guess Number Higher or Lower",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 374,
            "leetcodeUrl": "https://leetcode.com/problems/guess-number-higher-or-lower/",
            "solved": false
          },
          {
            "id": "arr-bs-04",
            "title": "First Bad Version",
            "difficulty": "Easy",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 278,
            "leetcodeUrl": "https://leetcode.com/problems/first-bad-version/",
            "solved": false
          },
          {
            "id": "arr-bs-05",
            "title": "Search in Rotated Sorted Array",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 33,
            "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            "solved": false
          },
          {
            "id": "arr-bs-06",
            "title": "Find Minimum in Rotated Sorted Array",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 153,
            "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            "solved": false
          },
          {
            "id": "arr-bs-07",
            "title": "Find First and Last Position of Element in Sorted Array",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 34,
            "leetcodeUrl": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            "solved": false
          },
          {
            "id": "arr-bs-08",
            "title": "Search a 2D Matrix",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 74,
            "leetcodeUrl": "https://leetcode.com/problems/search-a-2d-matrix/",
            "solved": false
          },
          {
            "id": "arr-bs-09",
            "title": "Koko Eating Bananas",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 875,
            "leetcodeUrl": "https://leetcode.com/problems/koko-eating-bananas/",
            "solved": false
          },
          {
            "id": "arr-bs-10",
            "title": "Capacity To Ship Packages Within D Days",
            "difficulty": "Medium",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 1011,
            "leetcodeUrl": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
            "solved": false
          },
          {
            "id": "arr-bs-11",
            "title": "Median of Two Sorted Arrays",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 4,
            "leetcodeUrl": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            "solved": false
          },
          {
            "id": "arr-bs-12",
            "title": "Split Array Largest Sum",
            "difficulty": "Hard",
            "pattern": "Array",
            "subPattern": "Binary Search",
            "leetcodeNumber": 410,
            "leetcodeUrl": "https://leetcode.com/problems/split-array-largest-sum/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "string",
    "name": "String",
    "icon": "text_fields",
    "color": "#EC4899",
    "description": "Character sequence processing, sliding windows, palindromes, and pattern matching.",
    "patterns": [
      {
        "id": "string-sliding-window",
        "name": "Sliding Window",
        "subPattern": "Sliding Window",
        "category": "String",
        "description": "Maintaining character frequencies and substrings dynamically.",
        "questions": [
          {
            "id": "str-sw-01",
            "title": "Defanging an IP Address",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 1108,
            "leetcodeUrl": "https://leetcode.com/problems/defanging-an-ip-address/",
            "solved": false
          },
          {
            "id": "str-sw-02",
            "title": "Length of Last Word",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 58,
            "leetcodeUrl": "https://leetcode.com/problems/length-of-last-word/",
            "solved": false
          },
          {
            "id": "str-sw-03",
            "title": "Longest Substring Without Repeating Characters",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 3,
            "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            "solved": false
          },
          {
            "id": "str-sw-04",
            "title": "Longest Repeating Character Replacement",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 424,
            "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
            "solved": false
          },
          {
            "id": "str-sw-05",
            "title": "Permutation in String",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 567,
            "leetcodeUrl": "https://leetcode.com/problems/permutation-in-string/",
            "solved": false
          },
          {
            "id": "str-sw-06",
            "title": "Find All Anagrams in a String",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 438,
            "leetcodeUrl": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
            "solved": false
          },
          {
            "id": "str-sw-07",
            "title": "Minimum Window Substring",
            "difficulty": "Hard",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 76,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
            "solved": false
          },
          {
            "id": "str-sw-08",
            "title": "Substring with Concatenation of All Words",
            "difficulty": "Hard",
            "pattern": "String",
            "subPattern": "Sliding Window",
            "leetcodeNumber": 30,
            "leetcodeUrl": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
            "solved": false
          }
        ]
      },
      {
        "id": "string-two-pointers",
        "name": "Two Pointers",
        "subPattern": "Two Pointers",
        "category": "String",
        "description": "Checking symmetry, reversal, and outward expansion around palindrome centers.",
        "questions": [
          {
            "id": "str-tp-01",
            "title": "Valid Palindrome",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 125,
            "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome/",
            "solved": false
          },
          {
            "id": "str-tp-02",
            "title": "Valid Palindrome II",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 680,
            "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome-ii/",
            "solved": false
          },
          {
            "id": "str-tp-03",
            "title": "Reverse String",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 344,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-string/",
            "solved": false
          },
          {
            "id": "str-tp-04",
            "title": "Reverse Vowels of a String",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 345,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-vowels-of-a-string/",
            "solved": false
          },
          {
            "id": "str-tp-05",
            "title": "Longest Palindromic Substring",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 5,
            "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
            "solved": false
          },
          {
            "id": "str-tp-06",
            "title": "Palindromic Substrings",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 647,
            "leetcodeUrl": "https://leetcode.com/problems/palindromic-substrings/",
            "solved": false
          },
          {
            "id": "str-tp-07",
            "title": "Sentence Similarity III",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 1813,
            "leetcodeUrl": "https://leetcode.com/problems/sentence-similarity-iii/",
            "solved": false
          },
          {
            "id": "str-tp-08",
            "title": "Valid Palindrome III",
            "difficulty": "Hard",
            "pattern": "String",
            "subPattern": "Two Pointers",
            "leetcodeNumber": 1216,
            "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome-iii/",
            "solved": false
          }
        ]
      },
      {
        "id": "string-pattern-matching",
        "name": "Pattern Matching",
        "subPattern": "Pattern Matching",
        "category": "String",
        "description": "Finding occurrences of subpatterns via Rabin-Karp, KMP, or rolling hashes.",
        "questions": [
          {
            "id": "str-pm-01",
            "title": "Find the Index of the First Occurrence in a String",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Pattern Matching",
            "leetcodeNumber": 28,
            "leetcodeUrl": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
            "solved": false
          },
          {
            "id": "str-pm-02",
            "title": "Repeated Substring Pattern",
            "difficulty": "Easy",
            "pattern": "String",
            "subPattern": "Pattern Matching",
            "leetcodeNumber": 459,
            "leetcodeUrl": "https://leetcode.com/problems/repeated-substring-pattern/",
            "solved": false
          },
          {
            "id": "str-pm-03",
            "title": "String Compression",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Pattern Matching",
            "leetcodeNumber": 443,
            "leetcodeUrl": "https://leetcode.com/problems/string-compression/",
            "solved": false
          },
          {
            "id": "str-pm-04",
            "title": "Multiply Strings",
            "difficulty": "Medium",
            "pattern": "String",
            "subPattern": "Pattern Matching",
            "leetcodeNumber": 43,
            "leetcodeUrl": "https://leetcode.com/problems/multiply-strings/",
            "solved": false
          },
          {
            "id": "str-pm-05",
            "title": "Shortest Palindrome",
            "difficulty": "Hard",
            "pattern": "String",
            "subPattern": "Pattern Matching",
            "leetcodeNumber": 214,
            "leetcodeUrl": "https://leetcode.com/problems/shortest-palindrome/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "hash-map",
    "name": "Hash Map",
    "icon": "dataset",
    "color": "#8B5CF6",
    "description": "Constant-time O(1) frequency tables, key-value mappings, and set-based uniqueness.",
    "patterns": [
      {
        "id": "hashmap-frequency",
        "name": "Frequency Based",
        "subPattern": "Frequency Based",
        "category": "Hash Map",
        "description": "Counting occurrences to verify anagrams, majorities, and frequency distributions.",
        "questions": [
          {
            "id": "hm-fq-01",
            "title": "Majority Element",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 169,
            "leetcodeUrl": "https://leetcode.com/problems/majority-element/",
            "solved": false
          },
          {
            "id": "hm-fq-02",
            "title": "Valid Anagram",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 242,
            "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
            "solved": false
          },
          {
            "id": "hm-fq-03",
            "title": "First Unique Character in a String",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 387,
            "leetcodeUrl": "https://leetcode.com/problems/first-unique-character-in-a-string/",
            "solved": false
          },
          {
            "id": "hm-fq-04",
            "title": "Ransom Note",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 383,
            "leetcodeUrl": "https://leetcode.com/problems/ransom-note/",
            "solved": false
          },
          {
            "id": "hm-fq-05",
            "title": "Top K Frequent Elements",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 347,
            "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
            "solved": false
          },
          {
            "id": "hm-fq-06",
            "title": "Sort Characters By Frequency",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 451,
            "leetcodeUrl": "https://leetcode.com/problems/sort-characters-by-frequency/",
            "solved": false
          },
          {
            "id": "hm-fq-07",
            "title": "Custom Sort String",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Frequency Based",
            "leetcodeNumber": 791,
            "leetcodeUrl": "https://leetcode.com/problems/custom-sort-string/",
            "solved": false
          }
        ]
      },
      {
        "id": "hashmap-lookup",
        "name": "Lookup Based",
        "subPattern": "Lookup Based",
        "category": "Hash Map",
        "description": "Trading memory for constant-time complement and presence queries.",
        "questions": [
          {
            "id": "hm-lk-01",
            "title": "Contains Duplicate",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Lookup Based",
            "leetcodeNumber": 217,
            "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate/",
            "solved": false
          },
          {
            "id": "hm-lk-02",
            "title": "Intersection of Two Arrays",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Lookup Based",
            "leetcodeNumber": 349,
            "leetcodeUrl": "https://leetcode.com/problems/intersection-of-two-arrays/",
            "solved": false
          },
          {
            "id": "hm-lk-03",
            "title": "4Sum II",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Lookup Based",
            "leetcodeNumber": 454,
            "leetcodeUrl": "https://leetcode.com/problems/4sum-ii/",
            "solved": false
          },
          {
            "id": "hm-lk-04",
            "title": "Longest Consecutive Sequence",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Lookup Based",
            "leetcodeNumber": 128,
            "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
            "solved": false
          },
          {
            "id": "hm-lk-05",
            "title": "Max Points on a Line",
            "difficulty": "Hard",
            "pattern": "Hash Map",
            "subPattern": "Lookup Based",
            "leetcodeNumber": 149,
            "leetcodeUrl": "https://leetcode.com/problems/max-points-on-a-line/",
            "solved": false
          }
        ]
      },
      {
        "id": "hashmap-grouping",
        "name": "Grouping & Index Mapping",
        "subPattern": "Grouping Pattern",
        "category": "Hash Map",
        "description": "Normalizing keys to bucket similar items or map 1-to-1 bijection relationships.",
        "questions": [
          {
            "id": "hm-gp-01",
            "title": "Isomorphic Strings",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Grouping Pattern",
            "leetcodeNumber": 205,
            "leetcodeUrl": "https://leetcode.com/problems/isomorphic-strings/",
            "solved": false
          },
          {
            "id": "hm-gp-02",
            "title": "Word Pattern",
            "difficulty": "Easy",
            "pattern": "Hash Map",
            "subPattern": "Grouping Pattern",
            "leetcodeNumber": 290,
            "leetcodeUrl": "https://leetcode.com/problems/word-pattern/",
            "solved": false
          },
          {
            "id": "hm-gp-03",
            "title": "Group Anagrams",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Grouping Pattern",
            "leetcodeNumber": 49,
            "leetcodeUrl": "https://leetcode.com/problems/group-anagrams/",
            "solved": false
          },
          {
            "id": "hm-gp-04",
            "title": "Fraction to Recurring Decimal",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Grouping Pattern",
            "leetcodeNumber": 166,
            "leetcodeUrl": "https://leetcode.com/problems/fraction-to-recurring-decimal/",
            "solved": false
          },
          {
            "id": "hm-gp-05",
            "title": "Insert Delete GetRandom O(1)",
            "difficulty": "Medium",
            "pattern": "Hash Map",
            "subPattern": "Grouping Pattern",
            "leetcodeNumber": 380,
            "leetcodeUrl": "https://leetcode.com/problems/insert-delete-getrandom-o1/",
            "solved": false
          },
          {
            "id": "hm-gp-06",
            "title": "Insert Delete GetRandom O(1) - Duplicates allowed",
            "difficulty": "Hard",
            "pattern": "Hash Map",
            "subPattern": "Grouping Pattern",
            "leetcodeNumber": 381,
            "leetcodeUrl": "https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "stack",
    "name": "Stack",
    "icon": "layers",
    "color": "#3B82F6",
    "description": "LIFO evaluations, monotonic decreasing/increasing sequences, and bracket/expression parsing.",
    "patterns": [
      {
        "id": "stack-monotonic",
        "name": "Monotonic Stack",
        "subPattern": "Monotonic Stack",
        "category": "Stack",
        "description": "Preserving ordered sequences to solve nearest greater/smaller and histogram spans in O(N).",
        "questions": [
          {
            "id": "stk-mn-01",
            "title": "Next Greater Element I",
            "difficulty": "Easy",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 496,
            "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-i/",
            "solved": false
          },
          {
            "id": "stk-mn-02",
            "title": "Final Prices With a Special Discount in a Shop",
            "difficulty": "Easy",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 1475,
            "leetcodeUrl": "https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/",
            "solved": false
          },
          {
            "id": "stk-mn-03",
            "title": "Daily Temperatures",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 739,
            "leetcodeUrl": "https://leetcode.com/problems/daily-temperatures/",
            "solved": false
          },
          {
            "id": "stk-mn-04",
            "title": "Next Greater Element II",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 503,
            "leetcodeUrl": "https://leetcode.com/problems/next-greater-element-ii/",
            "solved": false
          },
          {
            "id": "stk-mn-05",
            "title": "Online Stock Span",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 901,
            "leetcodeUrl": "https://leetcode.com/problems/online-stock-span/",
            "solved": false
          },
          {
            "id": "stk-mn-06",
            "title": "132 Pattern",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 456,
            "leetcodeUrl": "https://leetcode.com/problems/132-pattern/",
            "solved": false
          },
          {
            "id": "stk-mn-07",
            "title": "Largest Rectangle in Histogram",
            "difficulty": "Hard",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 84,
            "leetcodeUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            "solved": false
          },
          {
            "id": "stk-mn-08",
            "title": "Maximal Rectangle",
            "difficulty": "Hard",
            "pattern": "Stack",
            "subPattern": "Monotonic Stack",
            "leetcodeNumber": 85,
            "leetcodeUrl": "https://leetcode.com/problems/maximal-rectangle/",
            "solved": false
          }
        ]
      },
      {
        "id": "stack-expressions",
        "name": "Min/Max & Expression Handling",
        "subPattern": "Expression Handling",
        "category": "Stack",
        "description": "Parentheses validation, operator precedence evaluation, and O(1) state caching.",
        "questions": [
          {
            "id": "stk-ex-01",
            "title": "Valid Parentheses",
            "difficulty": "Easy",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 20,
            "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
            "solved": false
          },
          {
            "id": "stk-ex-02",
            "title": "Min Stack",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 155,
            "leetcodeUrl": "https://leetcode.com/problems/min-stack/",
            "solved": false
          },
          {
            "id": "stk-ex-03",
            "title": "Evaluate Reverse Polish Notation",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 150,
            "leetcodeUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
            "solved": false
          },
          {
            "id": "stk-ex-04",
            "title": "Simplify Path",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 71,
            "leetcodeUrl": "https://leetcode.com/problems/simplify-path/",
            "solved": false
          },
          {
            "id": "stk-ex-05",
            "title": "Decode String",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 394,
            "leetcodeUrl": "https://leetcode.com/problems/decode-string/",
            "solved": false
          },
          {
            "id": "stk-ex-06",
            "title": "Basic Calculator II",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 227,
            "leetcodeUrl": "https://leetcode.com/problems/basic-calculator-ii/",
            "solved": false
          },
          {
            "id": "stk-ex-07",
            "title": "Remove K Digits",
            "difficulty": "Medium",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 402,
            "leetcodeUrl": "https://leetcode.com/problems/remove-k-digits/",
            "solved": false
          },
          {
            "id": "stk-ex-08",
            "title": "Basic Calculator",
            "difficulty": "Hard",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 224,
            "leetcodeUrl": "https://leetcode.com/problems/basic-calculator/",
            "solved": false
          },
          {
            "id": "stk-ex-09",
            "title": "Longest Valid Parentheses",
            "difficulty": "Hard",
            "pattern": "Stack",
            "subPattern": "Expression Handling",
            "leetcodeNumber": 32,
            "leetcodeUrl": "https://leetcode.com/problems/longest-valid-parentheses/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "queue-deque",
    "name": "Queue / Deque",
    "icon": "queue",
    "color": "#06B6D4",
    "description": "FIFO pipelines, level-by-level breadth exploration, and double-ended monotonic windows.",
    "patterns": [
      {
        "id": "queue-processing",
        "name": "FIFO & Deque Processing",
        "subPattern": "FIFO Processing",
        "category": "Queue / Deque",
        "description": "Buffer tracking, circular queue design, and monotonic deque range maxima.",
        "questions": [
          {
            "id": "qd-01",
            "title": "Number of Recent Calls",
            "difficulty": "Easy",
            "pattern": "Queue / Deque",
            "subPattern": "FIFO Processing",
            "leetcodeNumber": 933,
            "leetcodeUrl": "https://leetcode.com/problems/number-of-recent-calls/",
            "solved": false
          },
          {
            "id": "qd-02",
            "title": "Implement Queue using Stacks",
            "difficulty": "Easy",
            "pattern": "Queue / Deque",
            "subPattern": "FIFO Processing",
            "leetcodeNumber": 232,
            "leetcodeUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
            "solved": false
          },
          {
            "id": "qd-03",
            "title": "Implement Stack using Queues",
            "difficulty": "Easy",
            "pattern": "Queue / Deque",
            "subPattern": "FIFO Processing",
            "leetcodeNumber": 225,
            "leetcodeUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
            "solved": false
          },
          {
            "id": "qd-04",
            "title": "Design Circular Queue",
            "difficulty": "Medium",
            "pattern": "Queue / Deque",
            "subPattern": "Circular Queue Pattern",
            "leetcodeNumber": 622,
            "leetcodeUrl": "https://leetcode.com/problems/design-circular-queue/",
            "solved": false
          },
          {
            "id": "qd-05",
            "title": "Design Circular Deque",
            "difficulty": "Medium",
            "pattern": "Queue / Deque",
            "subPattern": "Deque Based",
            "leetcodeNumber": 641,
            "leetcodeUrl": "https://leetcode.com/problems/design-circular-deque/",
            "solved": false
          },
          {
            "id": "qd-06",
            "title": "Rotting Oranges",
            "difficulty": "Medium",
            "pattern": "Queue / Deque",
            "subPattern": "Level-wise Processing",
            "leetcodeNumber": 994,
            "leetcodeUrl": "https://leetcode.com/problems/rotting-oranges/",
            "solved": false
          },
          {
            "id": "qd-07",
            "title": "Shortest Subarray with Sum at Least K",
            "difficulty": "Hard",
            "pattern": "Queue / Deque",
            "subPattern": "Deque Based",
            "leetcodeNumber": 862,
            "leetcodeUrl": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "linked-list",
    "name": "Linked List",
    "icon": "link",
    "color": "#10B981",
    "description": "Node manipulation, fast & slow pointers, reversal, and multi-list merging.",
    "patterns": [
      {
        "id": "ll-pointer-techniques",
        "name": "Pointer Techniques & Cycle Detection",
        "subPattern": "Pointer Techniques",
        "category": "Linked List",
        "description": "Floyd's cycle-finding algorithm and two-pointer equidistant offsets.",
        "questions": [
          {
            "id": "ll-pt-01",
            "title": "Middle of the Linked List",
            "difficulty": "Easy",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 876,
            "leetcodeUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
            "solved": false
          },
          {
            "id": "ll-pt-02",
            "title": "Linked List Cycle",
            "difficulty": "Easy",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 141,
            "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
            "solved": false
          },
          {
            "id": "ll-pt-03",
            "title": "Remove Duplicates from Sorted List",
            "difficulty": "Easy",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 83,
            "leetcodeUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
            "solved": false
          },
          {
            "id": "ll-pt-04",
            "title": "Linked List Cycle II",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 142,
            "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
            "solved": false
          },
          {
            "id": "ll-pt-05",
            "title": "Remove Nth Node From End of List",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 19,
            "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            "solved": false
          },
          {
            "id": "ll-pt-06",
            "title": "Reorder List",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 143,
            "leetcodeUrl": "https://leetcode.com/problems/reorder-list/",
            "solved": false
          },
          {
            "id": "ll-pt-07",
            "title": "Odd Even Linked List",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 328,
            "leetcodeUrl": "https://leetcode.com/problems/odd-even-linked-list/",
            "solved": false
          },
          {
            "id": "ll-pt-08",
            "title": "Copy List with Random Pointer",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Pointer Techniques",
            "leetcodeNumber": 138,
            "leetcodeUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
            "solved": false
          }
        ]
      },
      {
        "id": "ll-reversal-merge",
        "name": "Reversal & Merge Lists",
        "subPattern": "Reversal",
        "category": "Linked List",
        "description": "Iterative/recursive pointer swaps, subsegment inversions, and k-way merging.",
        "questions": [
          {
            "id": "ll-rm-01",
            "title": "Reverse Linked List",
            "difficulty": "Easy",
            "pattern": "Linked List",
            "subPattern": "Reversal",
            "leetcodeNumber": 206,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
            "solved": false
          },
          {
            "id": "ll-rm-02",
            "title": "Merge Two Sorted Lists",
            "difficulty": "Easy",
            "pattern": "Linked List",
            "subPattern": "Merge Lists",
            "leetcodeNumber": 21,
            "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
            "solved": false
          },
          {
            "id": "ll-rm-03",
            "title": "Palindrome Linked List",
            "difficulty": "Easy",
            "pattern": "Linked List",
            "subPattern": "Reversal",
            "leetcodeNumber": 234,
            "leetcodeUrl": "https://leetcode.com/problems/palindrome-linked-list/",
            "solved": false
          },
          {
            "id": "ll-rm-04",
            "title": "Reverse Linked List II",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Reversal",
            "leetcodeNumber": 92,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
            "solved": false
          },
          {
            "id": "ll-rm-05",
            "title": "Add Two Numbers",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Merge Lists",
            "leetcodeNumber": 2,
            "leetcodeUrl": "https://leetcode.com/problems/add-two-numbers/",
            "solved": false
          },
          {
            "id": "ll-rm-06",
            "title": "Swap Nodes in Pairs",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Reversal",
            "leetcodeNumber": 24,
            "leetcodeUrl": "https://leetcode.com/problems/swap-nodes-in-pairs/",
            "solved": false
          },
          {
            "id": "ll-rm-07",
            "title": "Sort List",
            "difficulty": "Medium",
            "pattern": "Linked List",
            "subPattern": "Merge Lists",
            "leetcodeNumber": 148,
            "leetcodeUrl": "https://leetcode.com/problems/sort-list/",
            "solved": false
          },
          {
            "id": "ll-rm-08",
            "title": "Reverse Nodes in k-Group",
            "difficulty": "Hard",
            "pattern": "Linked List",
            "subPattern": "Reversal",
            "leetcodeNumber": 25,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            "solved": false
          },
          {
            "id": "ll-rm-09",
            "title": "Merge k Sorted Lists",
            "difficulty": "Hard",
            "pattern": "Linked List",
            "subPattern": "Merge Lists",
            "leetcodeNumber": 23,
            "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "trees",
    "name": "Trees",
    "icon": "account_tree",
    "color": "#059669",
    "description": "Hierarchical traversals (Pre/In/Post/Level), tree recursion, path evaluations, and BST search properties.",
    "patterns": [
      {
        "id": "trees-traversal",
        "name": "Traversal & Recursion Patterns",
        "subPattern": "Traversal",
        "category": "Trees",
        "description": "DFS depth exploration and BFS level order queue patterns.",
        "questions": [
          {
            "id": "tr-tv-01",
            "title": "Binary Tree Inorder Traversal",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "Traversal",
            "leetcodeNumber": 94,
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            "solved": false
          },
          {
            "id": "tr-tv-02",
            "title": "Maximum Depth of Binary Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 104,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            "solved": false
          },
          {
            "id": "tr-tv-03",
            "title": "Invert Binary Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 226,
            "leetcodeUrl": "https://leetcode.com/problems/invert-binary-tree/",
            "solved": false
          },
          {
            "id": "tr-tv-04",
            "title": "Same Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 100,
            "leetcodeUrl": "https://leetcode.com/problems/same-tree/",
            "solved": false
          },
          {
            "id": "tr-tv-05",
            "title": "Symmetric Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 101,
            "leetcodeUrl": "https://leetcode.com/problems/symmetric-tree/",
            "solved": false
          },
          {
            "id": "tr-tv-06",
            "title": "Subtree of Another Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 572,
            "leetcodeUrl": "https://leetcode.com/problems/subtree-of-another-tree/",
            "solved": false
          },
          {
            "id": "tr-tv-07",
            "title": "Binary Tree Level Order Traversal",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "Traversal",
            "leetcodeNumber": 102,
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            "solved": false
          },
          {
            "id": "tr-tv-08",
            "title": "Binary Tree Zigzag Level Order Traversal",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "Traversal",
            "leetcodeNumber": 103,
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
            "solved": false
          },
          {
            "id": "tr-tv-09",
            "title": "Construct Binary Tree from Preorder and Inorder Traversal",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 105,
            "leetcodeUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            "solved": false
          },
          {
            "id": "tr-tv-10",
            "title": "Lowest Common Ancestor of a Binary Tree",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "Recursion Patterns",
            "leetcodeNumber": 236,
            "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            "solved": false
          },
          {
            "id": "tr-tv-11",
            "title": "Binary Tree Maximum Path Sum",
            "difficulty": "Hard",
            "pattern": "Trees",
            "subPattern": "Path Based",
            "leetcodeNumber": 124,
            "leetcodeUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            "solved": false
          },
          {
            "id": "tr-tv-12",
            "title": "Serialize and Deserialize Binary Tree",
            "difficulty": "Hard",
            "pattern": "Trees",
            "subPattern": "Traversal",
            "leetcodeNumber": 297,
            "leetcodeUrl": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            "solved": false
          }
        ]
      },
      {
        "id": "trees-bst",
        "name": "Binary Search Trees (BST)",
        "subPattern": "BST",
        "category": "Trees",
        "description": "Exploiting sorted left < root < right invariants for fast search and validation.",
        "questions": [
          {
            "id": "tr-bst-01",
            "title": "Search in a Binary Search Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 700,
            "leetcodeUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            "solved": false
          },
          {
            "id": "tr-bst-02",
            "title": "Lowest Common Ancestor of a Binary Search Tree",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 235,
            "leetcodeUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            "solved": false
          },
          {
            "id": "tr-bst-03",
            "title": "Range Sum of BST",
            "difficulty": "Easy",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 938,
            "leetcodeUrl": "https://leetcode.com/problems/range-sum-of-bst/",
            "solved": false
          },
          {
            "id": "tr-bst-04",
            "title": "Validate Binary Search Tree",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 98,
            "leetcodeUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
            "solved": false
          },
          {
            "id": "tr-bst-05",
            "title": "Kth Smallest Element in a BST",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 230,
            "leetcodeUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
            "solved": false
          },
          {
            "id": "tr-bst-06",
            "title": "Delete Node in a BST",
            "difficulty": "Medium",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 450,
            "leetcodeUrl": "https://leetcode.com/problems/delete-node-in-a-bst/",
            "solved": false
          },
          {
            "id": "tr-bst-07",
            "title": "Recover Binary Search Tree",
            "difficulty": "Hard",
            "pattern": "Trees",
            "subPattern": "BST",
            "leetcodeNumber": 99,
            "leetcodeUrl": "https://leetcode.com/problems/recover-binary-search-tree/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "recursion",
    "name": "Recursion & Backtracking",
    "icon": "replay",
    "color": "#D97706",
    "description": "Decision-tree search, state exploration, choice reversion, and divide & conquer subproblems.",
    "patterns": [
      {
        "id": "recursion-backtracking",
        "name": "Backtracking & Exploration",
        "subPattern": "Backtracking",
        "category": "Recursion",
        "description": "Constructing combinations, permutations, and subsets while pruning invalid branches.",
        "questions": [
          {
            "id": "rec-bt-01",
            "title": "Binary Watch",
            "difficulty": "Easy",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 401,
            "leetcodeUrl": "https://leetcode.com/problems/binary-watch/",
            "solved": false
          },
          {
            "id": "rec-bt-02",
            "title": "Subsets",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 78,
            "leetcodeUrl": "https://leetcode.com/problems/subsets/",
            "solved": false
          },
          {
            "id": "rec-bt-03",
            "title": "Subsets II",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Pruning / State Tracking",
            "leetcodeNumber": 90,
            "leetcodeUrl": "https://leetcode.com/problems/subsets-ii/",
            "solved": false
          },
          {
            "id": "rec-bt-04",
            "title": "Permutations",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 46,
            "leetcodeUrl": "https://leetcode.com/problems/permutations/",
            "solved": false
          },
          {
            "id": "rec-bt-05",
            "title": "Combinations",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 77,
            "leetcodeUrl": "https://leetcode.com/problems/combinations/",
            "solved": false
          },
          {
            "id": "rec-bt-06",
            "title": "Combination Sum",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 39,
            "leetcodeUrl": "https://leetcode.com/problems/combination-sum/",
            "solved": false
          },
          {
            "id": "rec-bt-07",
            "title": "Combination Sum II",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Pruning / State Tracking",
            "leetcodeNumber": 40,
            "leetcodeUrl": "https://leetcode.com/problems/combination-sum-ii/",
            "solved": false
          },
          {
            "id": "rec-bt-08",
            "title": "Letter Combinations of a Phone Number",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Exploration",
            "leetcodeNumber": 17,
            "leetcodeUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
            "solved": false
          },
          {
            "id": "rec-bt-09",
            "title": "Generate Parentheses",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 22,
            "leetcodeUrl": "https://leetcode.com/problems/generate-parentheses/",
            "solved": false
          },
          {
            "id": "rec-bt-10",
            "title": "Word Search",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Exploration",
            "leetcodeNumber": 79,
            "leetcodeUrl": "https://leetcode.com/problems/word-search/",
            "solved": false
          },
          {
            "id": "rec-bt-11",
            "title": "Palindrome Partitioning",
            "difficulty": "Medium",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 131,
            "leetcodeUrl": "https://leetcode.com/problems/palindrome-partitioning/",
            "solved": false
          },
          {
            "id": "rec-bt-12",
            "title": "N-Queens",
            "difficulty": "Hard",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 51,
            "leetcodeUrl": "https://leetcode.com/problems/n-queens/",
            "solved": false
          },
          {
            "id": "rec-bt-13",
            "title": "Sudoku Solver",
            "difficulty": "Hard",
            "pattern": "Recursion",
            "subPattern": "Backtracking",
            "leetcodeNumber": 37,
            "leetcodeUrl": "https://leetcode.com/problems/sudoku-solver/",
            "solved": false
          },
          {
            "id": "rec-bt-14",
            "title": "Word Search II",
            "difficulty": "Hard",
            "pattern": "Recursion",
            "subPattern": "Exploration",
            "leetcodeNumber": 212,
            "leetcodeUrl": "https://leetcode.com/problems/word-search-ii/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "heap",
    "name": "Heap / Priority Queue",
    "icon": "vertical_align_top",
    "color": "#EA580C",
    "description": "Min/Max heaps for dynamically tracking top elements, running medians, and greedy orderings.",
    "patterns": [
      {
        "id": "heap-top-k",
        "name": "Top K & Greedy Heaps",
        "subPattern": "Top K / Kth Element",
        "category": "Heap",
        "description": "Bounded size priority queues for O(N log K) extreme value retrieval.",
        "questions": [
          {
            "id": "hp-01",
            "title": "Kth Largest Element in a Stream",
            "difficulty": "Easy",
            "pattern": "Heap",
            "subPattern": "Top K / Kth Element",
            "leetcodeNumber": 703,
            "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
            "solved": false
          },
          {
            "id": "hp-02",
            "title": "Last Stone Weight",
            "difficulty": "Easy",
            "pattern": "Heap",
            "subPattern": "Greedy + Heap",
            "leetcodeNumber": 1046,
            "leetcodeUrl": "https://leetcode.com/problems/last-stone-weight/",
            "solved": false
          },
          {
            "id": "hp-03",
            "title": "Relative Ranks",
            "difficulty": "Easy",
            "pattern": "Heap",
            "subPattern": "Top K / Kth Element",
            "leetcodeNumber": 506,
            "leetcodeUrl": "https://leetcode.com/problems/relative-ranks/",
            "solved": false
          },
          {
            "id": "hp-04",
            "title": "Kth Largest Element in an Array",
            "difficulty": "Medium",
            "pattern": "Heap",
            "subPattern": "Top K / Kth Element",
            "leetcodeNumber": 215,
            "leetcodeUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            "solved": false
          },
          {
            "id": "hp-05",
            "title": "K Closest Points to Origin",
            "difficulty": "Medium",
            "pattern": "Heap",
            "subPattern": "Top K / Kth Element",
            "leetcodeNumber": 973,
            "leetcodeUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
            "solved": false
          },
          {
            "id": "hp-06",
            "title": "Task Scheduler",
            "difficulty": "Medium",
            "pattern": "Heap",
            "subPattern": "Greedy + Heap",
            "leetcodeNumber": 621,
            "leetcodeUrl": "https://leetcode.com/problems/task-scheduler/",
            "solved": false
          },
          {
            "id": "hp-07",
            "title": "Reorganize String",
            "difficulty": "Medium",
            "pattern": "Heap",
            "subPattern": "Greedy + Heap",
            "leetcodeNumber": 767,
            "leetcodeUrl": "https://leetcode.com/problems/reorganize-string/",
            "solved": false
          },
          {
            "id": "hp-08",
            "title": "Find K Pairs with Smallest Sums",
            "difficulty": "Medium",
            "pattern": "Heap",
            "subPattern": "K-way Merge",
            "leetcodeNumber": 373,
            "leetcodeUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
            "solved": false
          },
          {
            "id": "hp-09",
            "title": "Find Median from Data Stream",
            "difficulty": "Hard",
            "pattern": "Heap",
            "subPattern": "Top K / Kth Element",
            "leetcodeNumber": 295,
            "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
            "solved": false
          },
          {
            "id": "hp-10",
            "title": "IPO",
            "difficulty": "Hard",
            "pattern": "Heap",
            "subPattern": "Greedy + Heap",
            "leetcodeNumber": 502,
            "leetcodeUrl": "https://leetcode.com/problems/ipo/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "graphs",
    "name": "Graphs",
    "icon": "hub",
    "color": "#2563EB",
    "description": "Vertex-edge networks, BFS shortest paths, DFS components, topological ordering, and disjoint set unions.",
    "patterns": [
      {
        "id": "graphs-traversal-cycles",
        "name": "Traversal & Topological Sort",
        "subPattern": "Traversal",
        "category": "Graphs",
        "description": "Grid/adjacency list DFS/BFS, connected components, and Kahn's algorithm for DAGs.",
        "questions": [
          {
            "id": "grp-tc-01",
            "title": "Find the Town Judge",
            "difficulty": "Easy",
            "pattern": "Graphs",
            "subPattern": "Traversal",
            "leetcodeNumber": 997,
            "leetcodeUrl": "https://leetcode.com/problems/find-the-town-judge/",
            "solved": false
          },
          {
            "id": "grp-tc-02",
            "title": "Island Perimeter",
            "difficulty": "Easy",
            "pattern": "Graphs",
            "subPattern": "Traversal",
            "leetcodeNumber": 463,
            "leetcodeUrl": "https://leetcode.com/problems/island-perimeter/",
            "solved": false
          },
          {
            "id": "grp-tc-03",
            "title": "Number of Islands",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Traversal",
            "leetcodeNumber": 200,
            "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
            "solved": false
          },
          {
            "id": "grp-tc-04",
            "title": "Max Area of Island",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Traversal",
            "leetcodeNumber": 695,
            "leetcodeUrl": "https://leetcode.com/problems/max-area-of-island/",
            "solved": false
          },
          {
            "id": "grp-tc-05",
            "title": "Clone Graph",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Traversal",
            "leetcodeNumber": 133,
            "leetcodeUrl": "https://leetcode.com/problems/clone-graph/",
            "solved": false
          },
          {
            "id": "grp-tc-06",
            "title": "Course Schedule",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Cycle Detection",
            "leetcodeNumber": 207,
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
            "solved": false
          },
          {
            "id": "grp-tc-07",
            "title": "Course Schedule II",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Topological Sort",
            "leetcodeNumber": 210,
            "leetcodeUrl": "https://leetcode.com/problems/course-schedule-ii/",
            "solved": false
          },
          {
            "id": "grp-tc-08",
            "title": "Pacific Atlantic Water Flow",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Multi-source BFS",
            "leetcodeNumber": 417,
            "leetcodeUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
            "solved": false
          },
          {
            "id": "grp-tc-09",
            "title": "Surrounded Regions",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Traversal",
            "leetcodeNumber": 130,
            "leetcodeUrl": "https://leetcode.com/problems/surrounded-regions/",
            "solved": false
          },
          {
            "id": "grp-tc-10",
            "title": "Is Graph Bipartite?",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Bipartite / Multi-source BFS",
            "leetcodeNumber": 785,
            "leetcodeUrl": "https://leetcode.com/problems/is-graph-bipartite/",
            "solved": false
          },
          {
            "id": "grp-tc-11",
            "title": "Word Ladder",
            "difficulty": "Hard",
            "pattern": "Graphs",
            "subPattern": "Shortest Path",
            "leetcodeNumber": 127,
            "leetcodeUrl": "https://leetcode.com/problems/word-ladder/",
            "solved": false
          }
        ]
      },
      {
        "id": "graphs-dsu-shortest-path",
        "name": "Shortest Path & Union-Find (DSU)",
        "subPattern": "Shortest Path",
        "category": "Graphs",
        "description": "Dijkstra's greedy pathing, Bellman-Ford, Kruskal's MST, and Disjoint Set Unions.",
        "questions": [
          {
            "id": "grp-ds-01",
            "title": "Redundant Connection",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Union-Find / DSU",
            "leetcodeNumber": 684,
            "leetcodeUrl": "https://leetcode.com/problems/redundant-connection/",
            "solved": false
          },
          {
            "id": "grp-ds-02",
            "title": "Network Delay Time",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Shortest Path",
            "leetcodeNumber": 743,
            "leetcodeUrl": "https://leetcode.com/problems/network-delay-time/",
            "solved": false
          },
          {
            "id": "grp-ds-03",
            "title": "Cheapest Flights Within K Stops",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Shortest Path",
            "leetcodeNumber": 787,
            "leetcodeUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            "solved": false
          },
          {
            "id": "grp-ds-04",
            "title": "Accounts Merge",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Union-Find / DSU",
            "leetcodeNumber": 721,
            "leetcodeUrl": "https://leetcode.com/problems/accounts-merge/",
            "solved": false
          },
          {
            "id": "grp-ds-05",
            "title": "Min Cost to Connect All Points",
            "difficulty": "Medium",
            "pattern": "Graphs",
            "subPattern": "Spanning Tree",
            "leetcodeNumber": 1584,
            "leetcodeUrl": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
            "solved": false
          },
          {
            "id": "grp-ds-06",
            "title": "Swim in Rising Water",
            "difficulty": "Hard",
            "pattern": "Graphs",
            "subPattern": "Shortest Path",
            "leetcodeNumber": 778,
            "leetcodeUrl": "https://leetcode.com/problems/swim-in-rising-water/",
            "solved": false
          },
          {
            "id": "grp-ds-07",
            "title": "Critical Connections in a Network",
            "difficulty": "Hard",
            "pattern": "Graphs",
            "subPattern": "Spanning Tree",
            "leetcodeNumber": 1192,
            "leetcodeUrl": "https://leetcode.com/problems/critical-connections-in-a-network/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "trie",
    "name": "Trie (Prefix Tree)",
    "icon": "schema",
    "color": "#7C3AED",
    "description": "Tree structure storing dynamic sets of strings or bit sequences for prefix matching in O(L).",
    "patterns": [
      {
        "id": "trie-prefix-bitwise",
        "name": "Prefix & Bitwise Trie",
        "subPattern": "Prefix Based",
        "category": "Trie",
        "description": "Dictionary retrieval, prefix auto-completion, and bitwise maximum XOR queries.",
        "questions": [
          {
            "id": "tr-pf-01",
            "title": "Longest Common Prefix",
            "difficulty": "Easy",
            "pattern": "Trie",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 14,
            "leetcodeUrl": "https://leetcode.com/problems/longest-common-prefix/",
            "solved": false
          },
          {
            "id": "tr-pf-02",
            "title": "Implement Trie (Prefix Tree)",
            "difficulty": "Medium",
            "pattern": "Trie",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 208,
            "leetcodeUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
            "solved": false
          },
          {
            "id": "tr-pf-03",
            "title": "Design Add and Search Words Data Structure",
            "difficulty": "Medium",
            "pattern": "Trie",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 211,
            "leetcodeUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
            "solved": false
          },
          {
            "id": "tr-pf-04",
            "title": "Replace Words",
            "difficulty": "Medium",
            "pattern": "Trie",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 648,
            "leetcodeUrl": "https://leetcode.com/problems/replace-words/",
            "solved": false
          },
          {
            "id": "tr-pf-05",
            "title": "Extra Characters in a String",
            "difficulty": "Medium",
            "pattern": "Trie",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 2707,
            "leetcodeUrl": "https://leetcode.com/problems/extra-characters-in-a-string/",
            "solved": false
          },
          {
            "id": "tr-pf-06",
            "title": "Maximum XOR of Two Numbers in an Array",
            "difficulty": "Medium",
            "pattern": "Trie",
            "subPattern": "Bitwise Trie",
            "leetcodeNumber": 421,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            "solved": false
          },
          {
            "id": "tr-pf-07",
            "title": "Word Break II",
            "difficulty": "Hard",
            "pattern": "Trie",
            "subPattern": "Prefix Based",
            "leetcodeNumber": 140,
            "leetcodeUrl": "https://leetcode.com/problems/word-break-ii/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "dp",
    "name": "Dynamic Programming",
    "icon": "auto_awesome_motion",
    "color": "#4F46E5",
    "description": "Optimal substructure and overlapping subproblems via memoization and bottom-up tabulation.",
    "patterns": [
      {
        "id": "dp-linear-grid",
        "name": "1D & 2D Grid / Linear DP",
        "subPattern": "Linear DP",
        "category": "Dynamic Programming",
        "description": "Optimal decisions with recurrence relations over sequences and 2D coordinate matrices.",
        "questions": [
          {
            "id": "dp-lg-01",
            "title": "Climbing Stairs",
            "difficulty": "Easy",
            "pattern": "Dynamic Programming",
            "subPattern": "1D",
            "leetcodeNumber": 70,
            "leetcodeUrl": "https://leetcode.com/problems/climbing-stairs/",
            "solved": false
          },
          {
            "id": "dp-lg-02",
            "title": "Min Cost Climbing Stairs",
            "difficulty": "Easy",
            "pattern": "Dynamic Programming",
            "subPattern": "1D",
            "leetcodeNumber": 746,
            "leetcodeUrl": "https://leetcode.com/problems/min-cost-climbing-stairs/",
            "solved": false
          },
          {
            "id": "dp-lg-03",
            "title": "Fibonacci Number",
            "difficulty": "Easy",
            "pattern": "Dynamic Programming",
            "subPattern": "1D",
            "leetcodeNumber": 509,
            "leetcodeUrl": "https://leetcode.com/problems/fibonacci-number/",
            "solved": false
          },
          {
            "id": "dp-lg-04",
            "title": "House Robber",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Linear DP",
            "leetcodeNumber": 198,
            "leetcodeUrl": "https://leetcode.com/problems/house-robber/",
            "solved": false
          },
          {
            "id": "dp-lg-05",
            "title": "House Robber II",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Linear DP",
            "leetcodeNumber": 213,
            "leetcodeUrl": "https://leetcode.com/problems/house-robber-ii/",
            "solved": false
          },
          {
            "id": "dp-lg-06",
            "title": "Decode Ways",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Decision DP",
            "leetcodeNumber": 91,
            "leetcodeUrl": "https://leetcode.com/problems/decode-ways/",
            "solved": false
          },
          {
            "id": "dp-lg-07",
            "title": "Unique Paths",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Grid DP",
            "leetcodeNumber": 62,
            "leetcodeUrl": "https://leetcode.com/problems/unique-paths/",
            "solved": false
          },
          {
            "id": "dp-lg-08",
            "title": "Unique Paths II",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Grid DP",
            "leetcodeNumber": 63,
            "leetcodeUrl": "https://leetcode.com/problems/unique-paths-ii/",
            "solved": false
          },
          {
            "id": "dp-lg-09",
            "title": "Minimum Path Sum",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Grid DP",
            "leetcodeNumber": 64,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-path-sum/",
            "solved": false
          },
          {
            "id": "dp-lg-10",
            "title": "Maximal Square",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Grid DP",
            "leetcodeNumber": 221,
            "leetcodeUrl": "https://leetcode.com/problems/maximal-square/",
            "solved": false
          },
          {
            "id": "dp-lg-11",
            "title": "Burst Balloons",
            "difficulty": "Hard",
            "pattern": "Dynamic Programming",
            "subPattern": "Interval DP",
            "leetcodeNumber": 312,
            "leetcodeUrl": "https://leetcode.com/problems/burst-balloons/",
            "solved": false
          }
        ]
      },
      {
        "id": "dp-knapsack-sequences",
        "name": "Knapsack & Sequences",
        "subPattern": "Knapsack",
        "category": "Dynamic Programming",
        "description": "0/1 and unbounded item selections, subset sums, and longest subsequence alignments.",
        "questions": [
          {
            "id": "dp-ks-01",
            "title": "Coin Change",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Knapsack",
            "leetcodeNumber": 322,
            "leetcodeUrl": "https://leetcode.com/problems/coin-change/",
            "solved": false
          },
          {
            "id": "dp-ks-02",
            "title": "Coin Change II",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Knapsack",
            "leetcodeNumber": 518,
            "leetcodeUrl": "https://leetcode.com/problems/coin-change-ii/",
            "solved": false
          },
          {
            "id": "dp-ks-03",
            "title": "Partition Equal Subset Sum",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Knapsack",
            "leetcodeNumber": 416,
            "leetcodeUrl": "https://leetcode.com/problems/partition-equal-subset-sum/",
            "solved": false
          },
          {
            "id": "dp-ks-04",
            "title": "Longest Increasing Subsequence",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Sequence DP",
            "leetcodeNumber": 300,
            "leetcodeUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
            "solved": false
          },
          {
            "id": "dp-ks-05",
            "title": "Longest Common Subsequence",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Sequence DP",
            "leetcodeNumber": 1143,
            "leetcodeUrl": "https://leetcode.com/problems/longest-common-subsequence/",
            "solved": false
          },
          {
            "id": "dp-ks-06",
            "title": "Word Break",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Decision DP",
            "leetcodeNumber": 139,
            "leetcodeUrl": "https://leetcode.com/problems/word-break/",
            "solved": false
          },
          {
            "id": "dp-ks-07",
            "title": "Edit Distance",
            "difficulty": "Medium",
            "pattern": "Dynamic Programming",
            "subPattern": "Sequence DP",
            "leetcodeNumber": 72,
            "leetcodeUrl": "https://leetcode.com/problems/edit-distance/",
            "solved": false
          },
          {
            "id": "dp-ks-08",
            "title": "Russian Doll Envelopes",
            "difficulty": "Hard",
            "pattern": "Dynamic Programming",
            "subPattern": "Sequence DP",
            "leetcodeNumber": 354,
            "leetcodeUrl": "https://leetcode.com/problems/russian-doll-envelopes/",
            "solved": false
          },
          {
            "id": "dp-ks-09",
            "title": "Distinct Subsequences",
            "difficulty": "Hard",
            "pattern": "Dynamic Programming",
            "subPattern": "Sequence DP",
            "leetcodeNumber": 115,
            "leetcodeUrl": "https://leetcode.com/problems/distinct-subsequences/",
            "solved": false
          },
          {
            "id": "dp-ks-10",
            "title": "Regular Expression Matching",
            "difficulty": "Hard",
            "pattern": "Dynamic Programming",
            "subPattern": "Sequence DP",
            "leetcodeNumber": 10,
            "leetcodeUrl": "https://leetcode.com/problems/regular-expression-matching/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "greedy",
    "name": "Greedy",
    "icon": "trending_up",
    "color": "#0284C7",
    "description": "Locally optimal choices at each step yielding provably global optimal outcomes.",
    "patterns": [
      {
        "id": "greedy-intervals-jumps",
        "name": "Intervals & Scheduling Greedy",
        "subPattern": "Interval Greedy",
        "category": "Greedy",
        "description": "Sorting endpoints for interval overlap minimization, scheduling, and forward reachability.",
        "questions": [
          {
            "id": "grd-01",
            "title": "Assign Cookies",
            "difficulty": "Easy",
            "pattern": "Greedy",
            "subPattern": "Resource Allocation",
            "leetcodeNumber": 455,
            "leetcodeUrl": "https://leetcode.com/problems/assign-cookies/",
            "solved": false
          },
          {
            "id": "grd-02",
            "title": "Lemonade Change",
            "difficulty": "Easy",
            "pattern": "Greedy",
            "subPattern": "Scheduling Greedy",
            "leetcodeNumber": 860,
            "leetcodeUrl": "https://leetcode.com/problems/lemonade-change/",
            "solved": false
          },
          {
            "id": "grd-03",
            "title": "Can Place Flowers",
            "difficulty": "Easy",
            "pattern": "Greedy",
            "subPattern": "Resource Allocation",
            "leetcodeNumber": 605,
            "leetcodeUrl": "https://leetcode.com/problems/can-place-flowers/",
            "solved": false
          },
          {
            "id": "grd-04",
            "title": "Merge Intervals",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Interval Greedy",
            "leetcodeNumber": 56,
            "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
            "solved": false
          },
          {
            "id": "grd-05",
            "title": "Insert Interval",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Interval Greedy",
            "leetcodeNumber": 57,
            "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
            "solved": false
          },
          {
            "id": "grd-06",
            "title": "Non-overlapping Intervals",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Interval Greedy",
            "leetcodeNumber": 435,
            "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
            "solved": false
          },
          {
            "id": "grd-07",
            "title": "Minimum Number of Arrows to Burst Balloons",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Interval Greedy",
            "leetcodeNumber": 452,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
            "solved": false
          },
          {
            "id": "grd-08",
            "title": "Jump Game",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Jump Game Pattern",
            "leetcodeNumber": 55,
            "leetcodeUrl": "https://leetcode.com/problems/jump-game/",
            "solved": false
          },
          {
            "id": "grd-09",
            "title": "Jump Game II",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Jump Game Pattern",
            "leetcodeNumber": 45,
            "leetcodeUrl": "https://leetcode.com/problems/jump-game-ii/",
            "solved": false
          },
          {
            "id": "grd-10",
            "title": "Gas Station",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Resource Allocation",
            "leetcodeNumber": 134,
            "leetcodeUrl": "https://leetcode.com/problems/gas-station/",
            "solved": false
          },
          {
            "id": "grd-11",
            "title": "Partition Labels",
            "difficulty": "Medium",
            "pattern": "Greedy",
            "subPattern": "Scheduling Greedy",
            "leetcodeNumber": 763,
            "leetcodeUrl": "https://leetcode.com/problems/partition-labels/",
            "solved": false
          },
          {
            "id": "grd-12",
            "title": "Candy",
            "difficulty": "Hard",
            "pattern": "Greedy",
            "subPattern": "Resource Allocation",
            "leetcodeNumber": 135,
            "leetcodeUrl": "https://leetcode.com/problems/candy/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "bit-manipulation",
    "name": "Bit Manipulation",
    "icon": "memory",
    "color": "#64748B",
    "description": "Bitwise boolean logic, XOR properties, masks, bit shifts, and set representations.",
    "patterns": [
      {
        "id": "bit-core-masking",
        "name": "XOR & Bit Masking",
        "subPattern": "XOR Pattern",
        "category": "Bit Manipulation",
        "description": "Harnessing a ^ a = 0 and binary bitflags for constant-space tracking.",
        "questions": [
          {
            "id": "bit-01",
            "title": "Single Number",
            "difficulty": "Easy",
            "pattern": "Bit Manipulation",
            "subPattern": "XOR Pattern",
            "leetcodeNumber": 136,
            "leetcodeUrl": "https://leetcode.com/problems/single-number/",
            "solved": false
          },
          {
            "id": "bit-02",
            "title": "Number of 1 Bits",
            "difficulty": "Easy",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Checks",
            "leetcodeNumber": 191,
            "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
            "solved": false
          },
          {
            "id": "bit-03",
            "title": "Counting Bits",
            "difficulty": "Easy",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Checks",
            "leetcodeNumber": 338,
            "leetcodeUrl": "https://leetcode.com/problems/counting-bits/",
            "solved": false
          },
          {
            "id": "bit-04",
            "title": "Reverse Bits",
            "difficulty": "Easy",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Checks",
            "leetcodeNumber": 190,
            "leetcodeUrl": "https://leetcode.com/problems/reverse-bits/",
            "solved": false
          },
          {
            "id": "bit-05",
            "title": "Missing Number",
            "difficulty": "Easy",
            "pattern": "Bit Manipulation",
            "subPattern": "XOR Pattern",
            "leetcodeNumber": 268,
            "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
            "solved": false
          },
          {
            "id": "bit-06",
            "title": "Add Binary",
            "difficulty": "Easy",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Checks",
            "leetcodeNumber": 67,
            "leetcodeUrl": "https://leetcode.com/problems/add-binary/",
            "solved": false
          },
          {
            "id": "bit-07",
            "title": "Single Number II",
            "difficulty": "Medium",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Masking",
            "leetcodeNumber": 137,
            "leetcodeUrl": "https://leetcode.com/problems/single-number-ii/",
            "solved": false
          },
          {
            "id": "bit-08",
            "title": "Single Number III",
            "difficulty": "Medium",
            "pattern": "Bit Manipulation",
            "subPattern": "XOR Pattern",
            "leetcodeNumber": 260,
            "leetcodeUrl": "https://leetcode.com/problems/single-number-iii/",
            "solved": false
          },
          {
            "id": "bit-09",
            "title": "Bitwise AND of Numbers Range",
            "difficulty": "Medium",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Checks",
            "leetcodeNumber": 201,
            "leetcodeUrl": "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
            "solved": false
          },
          {
            "id": "bit-10",
            "title": "Sum of Two Integers",
            "difficulty": "Medium",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Checks",
            "leetcodeNumber": 371,
            "leetcodeUrl": "https://leetcode.com/problems/sum-of-two-integers/",
            "solved": false
          },
          {
            "id": "bit-11",
            "title": "Minimum Number of K-Consecutive Bit Flips",
            "difficulty": "Hard",
            "pattern": "Bit Manipulation",
            "subPattern": "Bit Masking",
            "leetcodeNumber": 995,
            "leetcodeUrl": "https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "sorting",
    "name": "Sorting Algorithms",
    "icon": "sort",
    "color": "#0D9488",
    "description": "Comparison-based and distribution sorts, partitioning, and customized comparator orderings.",
    "patterns": [
      {
        "id": "sorting-algorithms",
        "name": "Classic Sort Algorithms",
        "subPattern": "Merge Sort",
        "category": "Sorting Algorithms",
        "description": "Divide & conquer mergesort, quicksort partitioning, and non-comparison buckets.",
        "questions": [
          {
            "id": "srt-01",
            "title": "Merge Sorted Array",
            "difficulty": "Easy",
            "pattern": "Sorting Algorithms",
            "subPattern": "Merge Sort",
            "leetcodeNumber": 88,
            "leetcodeUrl": "https://leetcode.com/problems/merge-sorted-array/",
            "solved": false
          },
          {
            "id": "srt-02",
            "title": "Squares of a Sorted Array",
            "difficulty": "Easy",
            "pattern": "Sorting Algorithms",
            "subPattern": "Counting Sort",
            "leetcodeNumber": 977,
            "leetcodeUrl": "https://leetcode.com/problems/squares-of-a-sorted-array/",
            "solved": false
          },
          {
            "id": "srt-03",
            "title": "Sort an Array",
            "difficulty": "Medium",
            "pattern": "Sorting Algorithms",
            "subPattern": "Quick Sort",
            "leetcodeNumber": 912,
            "leetcodeUrl": "https://leetcode.com/problems/sort-an-array/",
            "solved": false
          },
          {
            "id": "srt-04",
            "title": "Sort Colors",
            "difficulty": "Medium",
            "pattern": "Sorting Algorithms",
            "subPattern": "Counting Sort",
            "leetcodeNumber": 75,
            "leetcodeUrl": "https://leetcode.com/problems/sort-colors/",
            "solved": false
          },
          {
            "id": "srt-05",
            "title": "Largest Number",
            "difficulty": "Medium",
            "pattern": "Sorting Algorithms",
            "subPattern": "Insertion Sort",
            "leetcodeNumber": 179,
            "leetcodeUrl": "https://leetcode.com/problems/largest-number/",
            "solved": false
          },
          {
            "id": "srt-06",
            "title": "Wiggle Sort II",
            "difficulty": "Medium",
            "pattern": "Sorting Algorithms",
            "subPattern": "Bucket Sort",
            "leetcodeNumber": 324,
            "leetcodeUrl": "https://leetcode.com/problems/wiggle-sort-ii/",
            "solved": false
          },
          {
            "id": "srt-07",
            "title": "Maximum Gap",
            "difficulty": "Hard",
            "pattern": "Sorting Algorithms",
            "subPattern": "Bucket Sort",
            "leetcodeNumber": 164,
            "leetcodeUrl": "https://leetcode.com/problems/maximum-gap/",
            "solved": false
          }
        ]
      }
    ]
  },
  {
    "id": "range-structures",
    "name": "Range Structures",
    "icon": "stacked_bar_chart",
    "color": "#4338CA",
    "description": "Segment Trees, Lazy Propagation, and Binary Indexed (Fenwick) Trees for logarithmic dynamic ranges.",
    "patterns": [
      {
        "id": "range-trees",
        "name": "Segment & Fenwick Trees",
        "subPattern": "Segment Tree",
        "category": "Range Structures",
        "description": "Point/range updates and range aggregations in O(log N).",
        "questions": [
          {
            "id": "rng-01",
            "title": "Range Sum Query - Immutable",
            "difficulty": "Easy",
            "pattern": "Range Structures",
            "subPattern": "Fenwick Tree",
            "leetcodeNumber": 303,
            "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-immutable/",
            "solved": false
          },
          {
            "id": "rng-02",
            "title": "Range Sum Query - Mutable",
            "difficulty": "Medium",
            "pattern": "Range Structures",
            "subPattern": "Segment Tree",
            "leetcodeNumber": 307,
            "leetcodeUrl": "https://leetcode.com/problems/range-sum-query-mutable/",
            "solved": false
          },
          {
            "id": "rng-03",
            "title": "Queue Reconstruction by Height",
            "difficulty": "Medium",
            "pattern": "Range Structures",
            "subPattern": "Fenwick Tree",
            "leetcodeNumber": 406,
            "leetcodeUrl": "https://leetcode.com/problems/queue-reconstruction-by-height/",
            "solved": false
          },
          {
            "id": "rng-04",
            "title": "Count of Smaller Numbers After Self",
            "difficulty": "Hard",
            "pattern": "Range Structures",
            "subPattern": "Fenwick Tree",
            "leetcodeNumber": 315,
            "leetcodeUrl": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
            "solved": false
          },
          {
            "id": "rng-05",
            "title": "Range Module",
            "difficulty": "Hard",
            "pattern": "Range Structures",
            "subPattern": "Segment Tree",
            "leetcodeNumber": 715,
            "leetcodeUrl": "https://leetcode.com/problems/range-module/",
            "solved": false
          },
          {
            "id": "rng-06",
            "title": "Falling Squares",
            "difficulty": "Hard",
            "pattern": "Range Structures",
            "subPattern": "Segment Tree",
            "leetcodeNumber": 699,
            "leetcodeUrl": "https://leetcode.com/problems/falling-squares/",
            "solved": false
          }
        ]
      }
    ]
  }
];

// Expose on window / exports for browser & node test runners
if (typeof window !== 'undefined') {
  window.dsaRoadmap = dsaRoadmap;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dsaRoadmap };
}
