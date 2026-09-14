/**
 * AI / ML Prompts Collection (11 Prompts)
 * Covers ML Pipelines, Data Preprocessing, Prompt Engineering, RAG, Vector Databases, and FastAPI Serving.
 */
module.exports = [
  {
    id: 'ai-ml-metric-selection-formulation',
    title: 'Machine Learning Problem Formulation & Metric Selection',
    category: 'AI / ML',
    subcategory: 'Machine Learning',
    description: 'Translates raw business problems into ML tasks (Regression, Classification, Ranking) and selects non-misleading evaluation metrics (PR-AUC vs ROC-AUC).',
    prompt: `Act as a Principal Machine Learning Scientist. Formulate an end-to-end ML strategy for this business problem.

Business Problem & Objective:
{{BUSINESS_PROBLEM}}

Data Characteristics (Imbalance ratio, sample size, feature types):
{{DATA_CHARACTERISTICS}}

Tasks:
1. Problem Formulation:
   - Frame as Supervised, Unsupervised, or Self-Supervised task.
   - Classification vs Regression vs Ranking vs Anomaly Detection.
2. Metric Selection & Justification:
   - Why Accuracy is misleading for imbalanced datasets (e.g. 99% accuracy predicting non-fraud when 1% is fraud).
   - Precision (minimizing false positives) vs Recall (minimizing false negatives).
   - F1-Score, PR-AUC (Precision-Recall Curve) vs ROC-AUC selection rationale.
3. Baseline Model: Propose a simple heuristic or logistic regression baseline before deep learning.
4. Evaluation Protocol: Stratified K-Fold Cross Validation vs Time-Series Rolling Window split.

Expected Output Format:
1. ML Problem Formulation Card
2. Evaluation Metric Matrix & Business Trade-offs
3. Baseline Model Proposal
4. Cross-Validation Protocol Specification`,
    tags: ['ai-ml', 'machine-learning', 'metrics', 'classification', 'data-science', 'pr-auc'],
    difficulty: 'Intermediate',
    useCase: 'Architecture Review',
    variables: ['{{BUSINESS_PROBLEM}}', '{{DATA_CHARACTERISTICS}}'],
    expectedOutput: 'ML problem formulation card + metric selection matrix + baseline proposal + CV protocol'
  },
  {
    id: 'ai-ml-data-preprocessing-pipeline',
    title: 'Data Preprocessing & Feature Engineering Pipeline (Pandas & Sklearn)',
    category: 'AI / ML',
    subcategory: 'Data Analysis',
    description: 'Builds an end-to-end data cleaning and transformation pipeline: missing value imputation, outlier handling, categorical encoding, and scaling.',
    prompt: `Act as a Senior Data Scientist. Build an automated data preprocessing and feature engineering pipeline using Python, Pandas, and Scikit-Learn.

Dataset Description & Raw Columns:
{{DATASET_DESCRIPTION}}

Tasks:
1. Missing Value Strategy:
   - Numerical: Median / KNN Imputation.
   - Categorical: Mode / Missing indicator flag.
2. Categorical Encoding:
   - One-Hot Encoding (low cardinality) vs Target Encoding / Frequency Encoding (high cardinality).
3. Numerical Transformations & Scaling:
   - Handling skewed distributions (Log transform / Box-Cox).
   - RobustScaler vs StandardScaler vs MinMaxScaler.
4. Outlier Detection: IQR (Interquartile Range) clipping vs Isolation Forest.
5. Encapsulate into an idiomatic \`sklearn.pipeline.Pipeline\` with \`ColumnTransformer\` to prevent data leakage.

Expected Output Format:
1. Preprocessing Strategy Architecture
2. Python Scikit-Learn ColumnTransformer Code
3. Data Leakage Prevention Checkpoints
4. Verification Script Output`,
    tags: ['ai-ml', 'data-science', 'preprocessing', 'feature-engineering', 'pandas', 'scikit-learn'],
    difficulty: 'Intermediate',
    useCase: 'Code Refactoring',
    variables: ['{{DATASET_DESCRIPTION}}'],
    expectedOutput: 'Preprocessing architecture + ColumnTransformer code + leakage prevention checkpoints + verification script'
  },
  {
    id: 'ai-ml-data-leakage-audit',
    title: 'Train-Test Data Leakage Audit & Cross-Validation Diagnostic',
    category: 'AI / ML',
    subcategory: 'ML Preprocessing',
    description: 'Diagnoses unrealistically high model performance (99.9% accuracy) caused by target leakage, future feature leakage, or pre-split scaling.',
    prompt: `Act as a Machine Learning Validation and Ethics Auditor. Audit this ML training pipeline for subtle Data Leakage flaws.

Model Training Code:
{{CODE}}

Suspicious Results (e.g. 99.8% test accuracy, but fails in production):
{{RESULTS}}

Tasks:
1. Identify Data Leakage Vectors:
   - Pre-split transformation leakage: Fitting scalers, encoders, or imputers on the entire dataset prior to \`train_test_split\`.
   - Target Leakage: Features inadvertently proxying the target variable (e.g. including refund date when predicting return likelihood).
   - Temporal / Time-Series Leakage: Using future information to predict past events (random train-test split on time-series instead of temporal cut).
   - Duplicate / Group Leakage: Multiple records from the same user across train and test sets (requires \`GroupKFold\`).
2. Provide the corrected, leak-free pipeline using \`Pipeline(steps=[...])\` ensuring fit occurs ONLY on training folds.
3. Show before-and-after realistic performance expectations.

Expected Output Format:
1. Leakage Vector Audit Findings
2. Mechanism of Production Failure Explanation
3. Corrected Leak-Free Training Pipeline Code
4. Group / Time-Series Splitting Verification`,
    tags: ['ai-ml', 'machine-learning', 'data-leakage', 'cross-validation', 'scikit-learn', 'debugging'],
    difficulty: 'Advanced',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{RESULTS}}'],
    expectedOutput: 'Leakage vector audit + production failure explanation + leak-free pipeline code + splitting verification'
  },
  {
    id: 'ai-ml-overfitting-underfitting-tuning',
    title: 'Bias-Variance Trade-Off: Overfitting vs Underfitting Diagnostic',
    category: 'AI / ML',
    subcategory: 'Machine Learning',
    description: 'Diagnoses learning curves: high bias (underfitting) vs high variance (overfitting) and applies regularization, pruning, or model capacity.',
    prompt: `Act as a Machine Learning Tuning Specialist. Diagnose and resolve the overfitting or underfitting problem in this model.

Training vs Validation Curves / Metrics:
{{TRAIN_VAL_METRICS}}

Model Architecture & Hyperparameters:
{{MODEL_SETUP}}

Tasks:
1. Diagnose Bias vs Variance:
   - High Bias (Underfitting): Low training score + low validation score (model is too simple to capture patterns).
   - High Variance (Overfitting): High training score (99%) + low validation score (75%) (model memorized noise).
2. Systematic Remedies:
   - For Overfitting: Regularization (L1 Lasso, L2 Ridge, Dropout), reducing tree depth (max_depth), early stopping, data augmentation, feature pruning.
   - For Underfitting: Increasing model capacity, adding polynomial/interaction features, decreasing regularization, training longer.
3. Provide hyperparameter tuning script using Optuna or GridSearchCV.
4. Deliver the remediated model code with optimal regularization.

Expected Output Format:
1. Learning Curve Diagnostic Analysis
2. Remediation Strategy Roadmap
3. Optuna / GridSearchCV Hyperparameter Search Code
4. Final Regularized Model Configuration`,
    tags: ['ai-ml', 'overfitting', 'underfitting', 'bias-variance', 'hyperparameters', 'optuna'],
    difficulty: 'Intermediate',
    useCase: 'Performance Optimization',
    variables: ['{{TRAIN_VAL_METRICS}}', '{{MODEL_SETUP}}'],
    expectedOutput: 'Learning curve diagnostic + remediation roadmap + Optuna tuning script + regularized model config'
  },
  {
    id: 'ai-ml-prompt-engineering-optimizer',
    title: 'System Prompt Engineering & Meta-Prompt Optimizer',
    category: 'AI / ML',
    subcategory: 'Prompt Engineering',
    description: 'Rewrites weak, vague prompts into high-performance, deterministic system prompts using XML tagging, few-shot examples, and output contracts.',
    prompt: `Act as a Principal Prompt Engineer and LLM Alignment Specialist. Rewrite and optimize this basic prompt for maximum reliability and deterministic output.

Original Vague Prompt:
{{ORIGINAL_PROMPT}}

Target Model & Desired Output Format:
{{TARGET_MODEL_AND_FORMAT}}

Tasks:
1. Analyze the weaknesses of the original prompt (ambiguity, lack of negative constraints, risk of hallucination).
2. Engineer the optimized prompt using gold-standard techniques:
   - Clear Persona & Role definition.
   - Context & Background framing.
   - Explicit step-by-step reasoning instructions (Chain of Thought).
   - Strict Input/Output Boundaries using structured XML tags (\`<context>\`, \`<instructions>\`, \`<input>\`, \`<output>\`).
   - Negative Constraints ("What NOT to do").
   - 2 High-Quality Few-Shot Examples demonstrating input-to-output mapping.
   - Fallback instruction for edge cases / unknown inputs ("If uncertain, output...").
3. Provide the final, production-ready system prompt ready for integration.

Expected Output Format:
1. Prompt Flaws Deconstruction
2. Advanced Prompt Engineering Strategy
3. Production-Ready Engineered Prompt (with XML tags and few-shots)
4. Evaluation Test Prompts to Validate Edge Cases`,
    tags: ['ai-ml', 'prompt-engineering', 'llm', 'system-prompts', 'few-shot', 'meta-prompting'],
    difficulty: 'Intermediate',
    useCase: 'Prompt Engineering',
    variables: ['{{ORIGINAL_PROMPT}}', '{{TARGET_MODEL_AND_FORMAT}}'],
    expectedOutput: 'Prompt flaws audit + engineering strategy + production prompt with XML/few-shots + validation test inputs'
  },
  {
    id: 'ai-ml-rag-architecture-chunking',
    title: 'RAG Architecture: Document Chunking, Overlap & Vector Search',
    category: 'AI / ML',
    subcategory: 'RAG',
    description: 'Architects an enterprise Retrieval-Augmented Generation (RAG) pipeline: recursive character chunking, semantic overlap, and hybrid search.',
    prompt: `Act as a RAG (Retrieval-Augmented Generation) Systems Architect. Design a production-grade RAG pipeline for this document repository.

Document Corpus Description (Length, formats, domain):
{{CORPUS_DESCRIPTION}}

Target User Queries:
{{USER_QUERIES}}

Tasks:
1. Chunking Strategy:
   - Compare Fixed-size chunking vs Recursive Character chunking vs Semantic / Markdown header chunking.
   - Optimize Chunk Size (e.g. 512 tokens) and Chunk Overlap (e.g. 10% / 50 tokens) to preserve context across boundaries without duplication.
2. Embedding Model Selection:
   - Dimension size, context window, and language performance (e.g. OpenAI text-embedding-3-small vs HuggingFace BGE / E5).
3. Retrieval & Re-ranking:
   - Hybrid Search: Combining Dense Semantic Vector Search + Sparse Lexical Keyword Search (BM25) via Reciprocal Rank Fusion (RRF).
   - Cross-Encoder Re-ranker (Cohere / BGE-Reranker) on top 20 retrieved chunks.
4. Context Injection & Hallucination Guardrails:
   - Strict prompt template demanding citations and rejecting queries when context is insufficient.
5. Provide complete Python code using LangChain, LlamaIndex, or vanilla SDK.

Expected Output Format:
1. RAG Architecture Diagram & Data Flow
2. Chunking Parameter Justification
3. Hybrid Search & Re-Ranking Pipeline Code (Python)
4. Context-Augmented System Prompt with Strict Citation Guard`,
    tags: ['ai-ml', 'rag', 'embeddings', 'chunking', 'vector-search', 'hybrid-search', 'llm'],
    difficulty: 'Advanced',
    useCase: 'Architecture Review',
    variables: ['{{CORPUS_DESCRIPTION}}', '{{USER_QUERIES}}'],
    expectedOutput: 'RAG pipeline diagram + chunking math + hybrid search code + citation system prompt'
  },
  {
    id: 'ai-ml-vector-database-indexing',
    title: 'Vector Database Indexing: HNSW vs IVF-Flat vs Cosine Distance',
    category: 'AI / ML',
    subcategory: 'RAG',
    description: 'Evaluates vector database indexes (HNSW, IVFFlat, Annoy) and distance metrics (Cosine vs Dot Product vs L2 Euclidean) for latency vs recall.',
    prompt: `Act as a Vector Search and Information Retrieval Specialist. Design the vector indexing strategy for our high-scale embedding store.

Vector Dimension, Scale & Latency SLAs:
{{VECTOR_SCALE_AND_SLAS}}

Tasks:
1. Approximate Nearest Neighbors (ANN) Index Algorithms:
   - Flat / Exact Search (100% recall, O(N) linear time, too slow for >1M vectors).
   - IVFFlat (Inverted File Index): Clustering space into Voronoi cells (fast build, lower RAM, sensitive to nprobe).
   - HNSW (Hierarchical Navigable Small World): Multi-layer proximity graph (gold standard for sub-10ms queries, high build time and RAM).
2. Distance Metric Selection:
   - Cosine Similarity vs Dot Product (Inner Product) vs Euclidean Distance (L2). Explain why normalized vectors make Dot Product equivalent to Cosine at 3x speed.
3. Database Selection:
   - Dedicated (Pinecone, Qdrant, Weaviate, Milvus) vs Extension (pgvector in PostgreSQL). When is pgvector sufficient?
4. Provide pgvector DDL schema and HNSW index creation statement with parameter tuning (m=16, ef_construction=64).

Expected Output Format:
1. ANN Algorithm Comparison Matrix (Recall, Latency, Index Build Time, RAM)
2. Distance Metric Mathematical Proof
3. pgvector / Qdrant DDL & Index Tuning Code
4. Hardware Sizing & RAM Calculation Formula`,
    tags: ['ai-ml', 'vector-database', 'hnsw', 'embeddings', 'pgvector', 'qdrant', 'pinecone'],
    difficulty: 'Advanced',
    useCase: 'Architecture Review',
    variables: ['{{VECTOR_SCALE_AND_SLAS}}'],
    expectedOutput: 'ANN comparison matrix + distance metric proof + pgvector HNSW DDL + RAM sizing math'
  },
  {
    id: 'ai-ml-openai-function-calling',
    title: 'LLM Function Calling & Strict JSON Structured Output',
    category: 'AI / ML',
    subcategory: 'AI Integration',
    description: 'Implements OpenAI / Anthropic Function Calling with JSON Schema validation to reliably trigger tools and extract structured data.',
    prompt: `Act as a Senior AI Applications Engineer. Build a robust tool-calling integration where an LLM calls backend functions and returns strict structured JSON.

Tools to Expose to LLM:
{{TOOLS_DESCRIPTION}}

Desired Structured Output:
{{OUTPUT_SCHEMA}}

Tasks:
1. Define the Function Tools Schema using JSON Schema (types, required fields, enum constraints, field descriptions).
2. Implement the Orchestration Loop:
   - Send prompt + tools to API.
   - Detect when model returns \`tool_calls\`.
   - Safely execute the local function with validated arguments.
   - Return the tool output back to the conversation thread.
   - Extract the final response in strict JSON mode (\`response_format: { type: "json_object" }\` or Pydantic).
3. Handle Hallucinated Tool Arguments:
   - Validate incoming arguments against a Pydantic model and send validation errors back to the model for self-correction.
4. Provide complete, runnable Python code.

Expected Output Format:
1. Tool Definition JSON Schema
2. Multi-Turn Function Execution Loop Code
3. Pydantic Argument Validator
4. Self-Correction on Error Handler`,
    tags: ['ai-ml', 'function-calling', 'tools', 'openai', 'llm-agents', 'json-schema'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{TOOLS_DESCRIPTION}}', '{{OUTPUT_SCHEMA}}'],
    expectedOutput: 'JSON schema tool definition + multi-turn execution loop + Pydantic validation + self-correction handler'
  },
  {
    id: 'ai-ml-fastapi-model-serving',
    title: 'FastAPI Production ML Model Serving Endpoint with Pydantic',
    category: 'AI / ML',
    subcategory: 'FastAPI',
    description: 'Builds a high-throughput async FastAPI inference service: model preloading in lifespan, request validation, batch prediction, and healthchecks.',
    prompt: `Act as an MLOps and High-Performance Python Backend Engineer. Build a production-grade FastAPI microservice serving a machine learning model.

Model Type & Input Features:
{{MODEL_DETAILS}}

Tasks:
1. High-Performance Architecture:
   - Use FastAPI \`lifespan\` context manager to load the model into memory once on startup (never reload per request).
   - Async endpoint with offloading CPU-bound \`model.predict()\` to threadpool (\`run_in_threadpool\`) so the event loop is never blocked.
2. Request & Response Validation:
   - Pydantic models with field constraints, descriptions, and examples.
3. Batch Inference Support:
   - Accept single item or batch array of items for vectorized scoring.
4. Production Observability:
   - Inference latency tracking header (\`X-Inference-Time-Ms\`).
   - Liveness/readiness health check verifying model is warm in RAM.
5. Provide complete, copy-paste ready Python code.

Expected Output Format:
1. FastAPI Production Inference Service Code (main.py)
2. Pydantic Request & Response Schemas
3. Threadpool Concurrency Proof
4. Dockerfile & Gunicorn/Uvicorn Command`,
    tags: ['ai-ml', 'fastapi', 'mlops', 'model-serving', 'python', 'pydantic', 'async'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{MODEL_DETAILS}}'],
    expectedOutput: 'FastAPI service code + Pydantic schemas + threadpool concurrency pattern + Dockerfile command'
  },
  {
    id: 'ai-ml-shap-model-explainability',
    title: 'Model Explainability: Feature Importance, SHAP & LIME',
    category: 'AI / ML',
    subcategory: 'Data Analysis',
    description: 'Explains black-box machine learning predictions using SHAP (Shapley Additive Explanations) and feature attribution waterfalls.',
    prompt: `Act as an AI Ethics and Explainable AI (XAI) Specialist. Implement model explainability using SHAP for this trained model.

Model Type & Dataset:
{{MODEL_AND_DATASET}}

Tasks:
1. Theory of Shapley Values:
   - Game theory origin: Fairly distributing the "payout" (prediction divergence from base value) among "players" (features).
2. SHAP Implementation:
   - TreeExplainer for Tree-based models (XGBoost, Random Forest, LightGBM) or KernelExplainer for black-box models.
   - Calculate global feature importance (Summary plot).
   - Calculate local individual prediction attribution (Waterfall / Force plot).
3. Translate mathematical SHAP values into plain-English business reasons (e.g. for loan denial or churn prevention).
4. Provide complete Python code.

Expected Output Format:
1. Shapley Values Conceptual Primer
2. Python SHAP Explainer Pipeline Code
3. Global vs Local Interpretability Visualizations
4. Plain-English Business Translation Template`,
    tags: ['ai-ml', 'shap', 'xai', 'explainability', 'feature-importance', 'data-science'],
    difficulty: 'Intermediate',
    useCase: 'Data Analysis',
    variables: ['{{MODEL_AND_DATASET}}'],
    expectedOutput: 'Shapley values primer + Python SHAP pipeline code + interpretability visualizations + business template'
  },
  {
    id: 'ai-ml-llm-rag-hallucination-evaluator',
    title: 'RAG Hallucination & Faithfulness Evaluation Framework',
    category: 'AI / ML',
    subcategory: 'RAG',
    description: 'Builds an automated evaluation harness (Ragas / TruLens style) scoring Faithfulness, Answer Relevance, and Context Precision.',
    prompt: `Act as an LLM Evaluation (Evals) and Quality Assurance Architect. Build an automated evaluation harness to test our RAG system against hallucinations.

RAG System Description & Golden Test Dataset:
{{RAG_SYSTEM_DETAILS}}

Tasks:
1. Core Evaluation Triad (Ragas Metrics):
   - Faithfulness: Is the generated answer grounded strictly in the retrieved context? (Detecting hallucinations).
   - Answer Relevance: Does the answer directly address the user query without rambling?
   - Context Precision / Recall: Did the retrieval engine fetch the relevant chunks without noisy distractors?
2. Automated LLM-as-a-Judge Pipeline:
   - Design structured evaluation prompts that grade each metric on a 1-5 scale with justification.
3. Regression CI/CD Integration:
   - Script that runs the test suite across 50 golden queries and fails if Faithfulness drops below 90%.
4. Provide complete Python evaluation script.

Expected Output Format:
1. RAG Triad Evaluation Methodology
2. LLM-as-a-Judge Evaluation Prompts
3. Automated Evaluation Pipeline Code (Python)
4. CI/CD Threshold Assertion Script`,
    tags: ['ai-ml', 'rag', 'evals', 'hallucination', 'llm-as-a-judge', 'testing'],
    difficulty: 'Advanced',
    useCase: 'Testing',
    variables: ['{{RAG_SYSTEM_DETAILS}}'],
    expectedOutput: 'Evaluation methodology + LLM-as-a-judge prompts + automated pipeline code + CI/CD assertions'
  }
];
