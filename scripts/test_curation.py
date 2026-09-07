# -*- coding: utf-8 -*-
import json
import re
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from patterns_curriculum import get_patterns_curriculum
from arena_drills import arena_drills
from curate_leetcode_questions import get_additional_questions
from curate_leetcode_questions_part2 import get_part2_questions
from curate_leetcode_questions_part3 import get_part3_questions
from assign_10_questions import EXTRA_QUESTIONS

def slugify(title):
    s = title.lower()
    s = s.replace('&', 'and').replace('+', 'plus').replace('/', ' ')
    s = re.sub(r'[^a-z0-9\s\-]', '', s)
    s = re.sub(r'[\s\-]+', '-', s).strip('-')
    return s

def canonical_url(title):
    return f"https://leetcode.com/problems/{slugify(title)}/"

with open('js/data/dsaData.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'const dsaRoadmap\s*=\s*(\[[\s\S]*?\]);\s*(?://|if|\n)', content)
existing_roadmap = json.loads(m.group(1))

all_questions = []
used_ids = set()

# 1. Existing 260 questions
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
                "signals": ["problem constraint", "pattern cue", "optimal subproblem"],
                "solved": False
            })

# 2. Curated questions part 1, 2, 3 + EXTRA_QUESTIONS
all_raw = get_additional_questions() + get_part2_questions() + get_part3_questions() + EXTRA_QUESTIONS

for entry in all_raw:
    num, title, diff, cat_id, cat_name, pat_id, pat_name, sub_pat, signals = entry
    candidate_id = f"lc-{num}"
    if candidate_id in used_ids:
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

print(f"Total questions available: {len(all_questions)}")

patterns = get_patterns_curriculum()

# Now for each pattern, select exactly 5 Easy, 3 Med, 2 Hard
q_by_id = {q['id']: q for q in all_questions}

# Helper to pick N questions of difficulty diff for a pattern
def pick_questions(pid, diff, target_count):
    # 1. First priority: questions directly mapped to this pattern
    direct = [q for q in all_questions if q['patternId'] == pid and q['difficulty'] == diff]
    
    # Deduplicate by leetcode number and clean title
    seen = set()
    selected = []
    
    # Prioritize original roadmap questions (non lc- prefix) first
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
        # Check by category if needed
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
        # Fallback to any questions in the whole dataset matching diff
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

results = []
all_ok = True

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
    
    is_valid = len(e_ids) == 5 and len(m_ids) == 3 and len(h_ids) == 2 and len(pat_q_ids) == 10 and len(set(pat_q_ids)) == 10
    if not is_valid:
        all_ok = False
        print(f"FAILED {pid}: E={len(e_ids)}, M={len(m_ids)}, H={len(h_ids)}, total={len(pat_q_ids)}, unique={len(set(pat_q_ids))}")
    else:
        results.append((pid, pat['name'], [q_by_id[qid]['title'] for qid in pat_q_ids]))

print(f"Curated 10 questions for all {len(patterns)} patterns! All valid: {all_ok}")
if all_ok:
    print("Sample pattern: ", results[0][0], results[0][1])
    for i, title in enumerate(results[0][2]):
        diff = "Easy" if i < 5 else ("Medium" if i < 8 else "Hard")
        print(f"  [{diff}] {title}")
