const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../js/data/interviewPrep');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log("Interview prep data generator initialized");
