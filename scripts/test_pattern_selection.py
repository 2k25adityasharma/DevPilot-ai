# -*- coding: utf-8 -*-
import json
import re

with open('js/data/dsaPatternsData.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'const dsaPatternsRoadmap\s*=\s*(\[[\s\S]*?\]);\s*const dsaAllQuestions', content)
patterns = json.loads(m.group(1))

m_q = re.search(r'const dsaAllQuestions\s*=\s*(\[[\s\S]*?\]);\s*const dsaArenaDrills', content)
all_questions = json.loads(m_q.group(1))

# Check available questions per pattern
pat_map = {p['id']: p for p in patterns}
pat_qs = {p['id']: {'Easy': [], 'Medium': [], 'Hard': []} for p in patterns}

for q in all_questions:
    pid = q.get('patternId')
    if pid in pat_qs:
        pat_qs[pid][q['difficulty']].append(q)

for pid, d in pat_qs.items():
    print(f"{pid:28}: Easy={len(d['Easy']):2}, Med={len(d['Medium']):2}, Hard={len(d['Hard']):2}")
