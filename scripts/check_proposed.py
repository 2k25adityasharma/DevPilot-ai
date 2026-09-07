# -*- coding: utf-8 -*-
import json
import re

with open('js/data/dsaData.js', 'r', encoding='utf-8') as f:
    content = f.read()

orig_nums = set(int(x) for x in re.findall(r'"leetcodeNumber":\s*(\d+)', content))

check_nums = [1800, 2269, 68, 1160, 1475, 23, 25, 1290, 99, 257, 872, 938, 1971, 997, 733, 463, 14, 2185, 2255, 70, 746, 118, 119, 392, 847, 303, 2011]
in_orig = [n for n in check_nums if n in orig_nums]
print('In original 260:', in_orig)
