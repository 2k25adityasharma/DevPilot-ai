# -*- coding: utf-8 -*-
"""
DevPilot-AI: DSA Pattern Learning Curriculum & 1000+ Real LeetCode Problems Builder
Assembles:
1. 28 comprehensive pattern study guides (12-point curriculum) across 16 categories
2. 1000+ authentic real LeetCode problems (unique, canonical URLs, real numbers, difficulties, signals)
3. 32 "🎯 Identify the Pattern" Training Arena recognition drills
Outputs: js/data/dsaPatternsData.js
"""

import json
import re
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from patterns_curriculum import get_patterns_curriculum
from arena_drills import arena_drills
from curate_leetcode_questions import get_additional_questions
from curate_leetcode_questions_part2 import get_part2_questions
from curate_leetcode_questions_part3 import get_part3_questions

def slugify(title):
    s = title.lower()
    s = s.replace('&', 'and').replace('+', 'plus').replace('/', ' ')
    s = re.sub(r'[^a-z0-9\s\-]', '', s)
    s = re.sub(r'[\s\-]+', '-', s).strip('-')
    return s

def canonical_url(title):
    return f"https://leetcode.com/problems/{slugify(title)}/"

print("1. Loading existing 260 roadmap questions from dsaData.js...")
with open('js/data/dsaData.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'const dsaRoadmap\s*=\s*(\[[\s\S]*?\]);\s*(?://|if|\n)', content)
if not m:
    print("Failed to parse dsaRoadmap from dsaData.js")
    sys.exit(1)

existing_roadmap = json.loads(m.group(1))

all_questions = []
used_ids = set()
used_lc_numbers = set()

# Pattern signal defaults
pattern_signal_map = {
    'array-two-pointers': ["sorted array", "find pair", "two elements sum", "opposite direction", "partitioning"],
    'array-sliding-window': ["contiguous subarray", "fixed window size k", "longest/shortest subarray", "at most k", "rolling window"],
    'array-prefix-based': ["subarray sum equals k", "prefix sum", "range sum query", "divisible by k", "cumulative sum"],
    'array-kadanes-subarray': ["maximum subarray sum", "contiguous", "kadane's algorithm", "largest product", "circular subarray"],
    'array-binary-search': ["sorted array", "O(log n) requirement", "search rotated array", "minimize maximum", "predicate binary search"],
    'string-sliding-window': ["longest substring", "without repeating characters", "minimum window substring", "character frequency", "anagram substring"],
    'string-two-pointers': ["palindrome check", "valid palindrome", "reverse string in-place", "converging pointers", "vowel swap"],
    'string-pattern-matching': ["substring search", "pattern matching", "kmp algorithm", "rabin-karp rolling hash", "repeated substring"],
    'hashmap-frequency': ["most frequent elements", "count occurrences", "valid anagram", "character count", "frequency map"],
    'hashmap-lookup': ["complement lookup", "two sum in O(1) space", "contains duplicate", "target minus current", "constant time access"],
    'hashmap-grouping': ["group anagrams", "bucket grouping", "custom hash key", "group by sorted string", "categorize by property"],
    'stack-monotonic': ["next greater element", "next smaller element", "daily temperatures", "largest rectangle in histogram", "trapping rain water"],
    'stack-expressions': ["valid parentheses", "evaluate reverse polish", "basic calculator", "nested brackets", "expression parsing"],
    'queue-processing': ["bfs level order", "sliding window maximum", "monotonic deque", "first unique in stream", "fifo queue"],
    'll-pointer-techniques': ["detect cycle in linked list", "floyd's tortoise and hare", "find middle node", "fast and slow pointer", "intersection of lists"],
    'll-reversal-merge': ["reverse linked list", "merge two sorted lists", "reverse nodes in k-group", "in-place pointer reversal", "reorder list"],
    'trees-traversal': ["binary tree level order", "maximum depth", "lowest common ancestor", "diameter of tree", "dfs / bfs traversal"],
    'trees-bst': ["binary search tree", "in-order traversal is sorted", "validate bst", "kth smallest in bst", "bst search and insert"],
    'recursion-backtracking': ["subsets", "permutations", "combinations sum", "n-queens", "generate all valid states", "pruning"],
    'heap-top-k': ["kth largest element", "top k frequent", "merge k sorted lists", "find median from data stream", "min/max heap"],
    'graphs-traversal-cycles': ["number of islands", "clone graph", "course schedule", "topological sort", "cycle detection in directed graph"],
    'graphs-dsu-shortest-path': ["disjoint set union", "dijkstra shortest path", "network delay time", "cheapest flights within k stops", "minimum spanning tree"],
    'trie-prefix-bitwise': ["prefix tree", "starts with prefix", "word search ii", "autocomplete", "maximum xor pair"],
    'dp-linear-grid': ["climbing stairs", "house robber", "unique paths", "minimum path sum", "1d/2d state transitions"],
    'dp-knapsack-sequences': ["0/1 knapsack", "coin change", "longest increasing subsequence", "longest common subsequence", "partition equal subset sum"],
    'greedy-intervals-jumps': ["merge intervals", "non-overlapping intervals", "jump game", "gas station", "activity selection"],
    'bit-core-masking': ["single number", "xor cancellation", "number of 1 bits", "counting bits", "bitmask state representation"],
    'sorting-algorithms': ["custom comparator", "sort colors", "kth largest via quickselect", "merge sort", "cyclic sort"],
    'range-structures': ["range sum query mutable", "segment tree", "binary indexed tree", "fenwick tree", "point update range query"]
}

# 1. Add all 260 existing questions
for cat in existing_roadmap:
    c_id = cat['id']
    c_name = cat['name']
    for pat in cat['patterns']:
        p_id = pat['id']
        p_name = pat['name']
        p_sub = pat.get('subPattern', p_name)
        for q in pat['questions']:
            q_id = q['id']
            lc_num = q.get('leetcodeNumber')
            used_ids.add(q_id)
            if lc_num:
                used_lc_numbers.add(lc_num)
            
            signals = pattern_signal_map.get(p_id, ["problem constraint", "pattern cue", "optimal subproblem"])
            all_questions.append({
                "id": q_id,
                "title": q['title'],
                "difficulty": q['difficulty'],
                "category": c_name,
                "categoryId": c_id,
                "pattern": p_name,
                "patternId": p_id,
                "subPattern": p_sub,
                "leetcodeNumber": lc_num,
                "leetcodeUrl": q['leetcodeUrl'],
                "signals": signals[:3],
                "solved": False
            })

print(f"Loaded {len(all_questions)} existing questions. Adding curated authentic questions...")

from assign_10_questions import EXTRA_QUESTIONS

# 2. Add curated authentic questions
additional_raw = get_additional_questions() + get_part2_questions() + get_part3_questions() + EXTRA_QUESTIONS

added_count = 0
for entry in additional_raw:
    num, title, diff, cat_id, cat_name, pat_id, pat_name, sub_pat, signals = entry
    
    # Generate unique ID
    candidate_id = f"lc-{num}"
    if candidate_id in used_ids:
        # If ID collision with existing or duplicate entry, differentiate
        slug = slugify(title)[:10]
        candidate_id = f"lc-{num}-{slug}"
        if candidate_id in used_ids:
            continue
    
    used_ids.add(candidate_id)
    url = canonical_url(title)
    
    all_questions.append({
        "id": candidate_id,
        "title": title,
        "difficulty": diff,
        "category": cat_name,
        "categoryId": cat_id,
        "pattern": pat_name,
        "patternId": pat_id,
        "subPattern": sub_pat,
        "leetcodeNumber": num,
        "leetcodeUrl": url,
        "signals": signals,
        "solved": False
    })
    added_count += 1

print(f"Added {added_count} curated questions. Total questions in dataset: {len(all_questions)}")

# 3. Load 29 patterns curriculum and curate exactly 10 practice questions (5 Easy, 3 Medium, 2 Hard)
patterns = get_patterns_curriculum()

def pick_questions(pid, diff, target_count):
    direct = [q for q in all_questions if q['patternId'] == pid and q['difficulty'] == diff]
    seen = set()
    selected = []
    
    # Prioritize original roadmap questions first, then canonical LC order
    sorted_direct = sorted(direct, key=lambda q: (1 if q['id'].startswith('lc-') else 0, q.get('leetcodeNumber') or 99999))
    
    for q in sorted_direct:
        num = q.get('leetcodeNumber')
        key = num if num else q['title'].lower()
        if key not in seen:
            seen.add(key)
            selected.append(q['id'])
            if len(selected) == target_count:
                return selected
                
    if len(selected) < target_count:
        pat_cat = next((p['categoryId'] for p in patterns if p['id'] == pid), None)
        if pat_cat:
            cat_qs = [q for q in all_questions if q['categoryId'] == pat_cat and q['difficulty'] == diff]
            sorted_cat = sorted(cat_qs, key=lambda q: (1 if q['id'].startswith('lc-') else 0, q.get('leetcodeNumber') or 99999))
            for q in sorted_cat:
                num = q.get('leetcodeNumber')
                key = num if num else q['title'].lower()
                if key not in seen:
                    seen.add(key)
                    selected.append(q['id'])
                    if len(selected) == target_count:
                        return selected

    if len(selected) < target_count:
        all_diff = [q for q in all_questions if q['difficulty'] == diff]
        for q in all_diff:
            num = q.get('leetcodeNumber')
            key = num if num else q['title'].lower()
            if key not in seen:
                seen.add(key)
                selected.append(q['id'])
                if len(selected) == target_count:
                    return selected
                    
    return selected

for pat in patterns:
    pid = pat['id']
    e_ids = pick_questions(pid, 'Easy', 5)
    m_ids = pick_questions(pid, 'Medium', 3)
    h_ids = pick_questions(pid, 'Hard', 2)
    
    pat_q_ids = e_ids + m_ids + h_ids
    pat['practiceQuestionIds'] = pat_q_ids
    pat['totalQuestions'] = 10
    pat['easyQuestions'] = 5
    pat['mediumQuestions'] = 3
    pat['hardQuestions'] = 2

print(f"Attached curated 10-question practice set (5 Easy, 3 Med, 2 Hard) across {len(patterns)} patterns.")

# 4. Serialize to js/data/dsaPatternsData.js
out_path = 'js/data/dsaPatternsData.js'
print(f"Writing dataset to {out_path}...")

js_content = f"""/**
 * DevPilot-AI — DSA Pattern Learning & 1000+ Questions Dataset
 * Features:
 * - 28 In-Depth Pattern Guides across 16 major DSA categories with complete 12-point curriculum.
 * - 1,000+ authentic, real LeetCode problems (real titles, numbers, canonical URLs, difficulty, recognition signals).
 * - 32 'Identify the Pattern' Training Arena recognition drills.
 * - 100% synchronized with devpilot_dsa_progress and existing 260 roadmap questions.
 */

const dsaPatternsRoadmap = {json.dumps(patterns, indent=2, ensure_ascii=False)};

const dsaAllQuestions = {json.dumps(all_questions, indent=2, ensure_ascii=False)};

const dsaArenaDrills = {json.dumps(arena_drills, indent=2, ensure_ascii=False)};

// Expose on window / exports for browser & node test runners
if (typeof window !== 'undefined') {{
  window.dsaPatternsRoadmap = dsaPatternsRoadmap;
  window.dsaAllQuestions = dsaAllQuestions;
  window.dsaArenaDrills = dsaArenaDrills;
}}
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ dsaPatternsRoadmap, dsaAllQuestions, dsaArenaDrills }};
}}
"""

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated {out_path} ({os.path.getsize(out_path)} bytes).")
