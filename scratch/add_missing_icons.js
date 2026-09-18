const fs = require('fs');
let code = fs.readFileSync('js/core/icons.js', 'utf8');
const iconDataMatch = code.match(/var ICON_DATA\s*=\s*(\{[\s\S]*?\});/);
const ICON_DATA = JSON.parse(iconDataMatch[1]);

ICON_DATA['expand_less'] = '<path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/>';
ICON_DATA['visibility_off'] = '<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-5 35-7.5t37-2.5q89 0 151 62t62 150q0 19-2.5 37t-6.5 37ZM480-260q-121 0-222.5-65.5T102-500q30-61 76.5-109T282-687l-60-60q-63 42-113.5 98T40-500q58 134 176 217t264 83q67 0 130-19t118-54l-64-64q-47 22-99 31t-105 7Zm294-76 60 60q64-42 114.5-98T920-500q-58-134-176-217t-264-83q-67 0-130 19t-118 54l64 64q47-22 99-31t105-7q121 0 222.5 65.5T858-500q-30 61-76.5 109T774-336ZM813-61 560-314q-19 7-39 10.5t-41 3.5q-89 0-151-62t-62-150q0-21 3.5-41t10.5-39L61-813l43-43 752 752-43 43Zm-415-415Zm143 143Z"/>';

const sortedKeys = Object.keys(ICON_DATA).sort();
const sortedData = {};
sortedKeys.forEach(k => { sortedData[k] = ICON_DATA[k]; });

code = code.replace(/var ICON_DATA\s*=\s*(\{[\s\S]*?\});/, 'var ICON_DATA = ' + JSON.stringify(sortedData) + ';');
fs.writeFileSync('js/core/icons.js', code, 'utf8');
console.log('Updated ICON_DATA with expand_less and visibility_off. Total icons:', Object.keys(sortedData).length);
