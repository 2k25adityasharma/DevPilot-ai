# DevPilot-AI Automated Test Suite

This directory contains automated testing and verification scripts for the DevPilot-AI Resume Analyzer and Scoring algorithms.

## Directory Structure

```text
tests/
├── README.md
└── resume/
    ├── testResumeAnalyzer.js    # Comprehensive 14-scenario test suite
    ├── testResumeScoring.js     # Controlled scoring benchmark (weak vs. strong resumes)
    └── testScoringLogic.js      # Reference vocabulary and scoring test harness
```

## Running the Tests

Ensure you have [Node.js](https://nodejs.org/) installed (v16 or newer). Run these commands from the project root:

### 1. Resume Analyzer Test Suite (14 Tests)
Validates document classification, confidence gating (rejecting certificates, transcripts, invoices, and random text), OCR handling, section parsing, consistency checking, and role fit estimations.
```bash
node tests/resume/testResumeAnalyzer.js
```

### 2. Resume Scoring Benchmark
Evaluates scoring accuracy against controlled weak (expected 25–40) and strong (expected 90–99) resumes across all 10 ATS scoring categories.
```bash
node tests/resume/testResumeScoring.js
```

### 3. Scoring Logic Harness
Loads scoring dictionaries (action verbs, weak verbs, vague phrases) and checks baseline parser import.
```bash
node tests/resume/testScoringLogic.js
```
