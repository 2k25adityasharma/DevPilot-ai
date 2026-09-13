/**
 * DevPilot-AI — Career Roadmap: Data Scientist
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const dataScientistRoadmap = {
  roleId: 'data-scientist',
  roadmapId: 'dataScientist',
  title: 'Data Scientist',
  category: 'data-ai',
  description: 'Extract statistical insights and build predictive machine learning models: Exploratory Data Analysis (EDA), feature engineering, scikit-learn, XGBoost, model interpretation (SHAP), and production API deployment.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Python data science stack (NumPy, Pandas), exploratory analysis, probability, and linear algebra.',
      skills: [
        {
          id: 'ds-python-math',
          title: 'Python for Data Science & Linear Algebra / Calculus',
          category: 'Mathematical Foundations',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master mathematics for machine learning: matrix operations, eigenvalues/eigenvectors, partial derivatives, gradient descent optimization, NumPy vectorization, and Pandas.',
          whatToLearn: [
            'Linear algebra: vectors, matrices, matrix multiplication, dot products, transposes, inverses, determinants',
            'Eigenvalues and Eigenvectors and their intuitive role in Principal Component Analysis (PCA)',
            'Calculus for ML: derivatives, partial derivatives, chain rule, and the gradient vector',
            'Optimization: Gradient Descent algorithm (learning rate, local minima, convex vs non-convex loss surfaces)',
            'NumPy vectorization and broadcasting for high-speed mathematical matrix computations'
          ],
          whyItMatters: 'Machine learning algorithms are mathematical optimization equations. Without calculus and linear algebra, model tuning is pure guesswork.',
          productionUse: 'Understanding loss function convergence, implementing custom loss metrics, and debugging training instability.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to visualize multi-dimensional gradient descent trajectories; verify matrix multiplication dimensions manually.',
          handsOnTask: 'Implement Linear Regression from scratch using only NumPy arrays and gradient descent optimization without scikit-learn.',
          projectApplication: 'Provides the mathematical engine for all predictive modeling projects.',
          resources: [
            { title: 'Mathematics for Machine Learning by Deisenroth et al.', url: 'https://mml-book.github.io/', type: 'book' },
            { title: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'video' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ds-stats-prob',
          title: 'Probability & Inferential Statistics for Data Science',
          category: 'Statistics Foundations',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['ds-python-math'],
          description: 'Master probability and statistical inference: random variables, probability distributions, Bayes’ Theorem, confidence intervals, and hypothesis testing.',
          whatToLearn: [
            'Probability theory: conditional probability, independence, Bayes’ Theorem, Law of Total Probability',
            'Probability distributions: Normal (Gaussian), Binomial, Poisson, Exponential, Student’s t-distribution',
            'Descriptive statistics: Mean, median, standard deviation, variance, skewness, kurtosis, IQR',
            'Central Limit Theorem (CLT) and its role in real-world sampling distributions',
            'Hypothesis testing: Null vs Alternative hypotheses, p-values, Type I/II errors, z-tests, t-tests, ANOVA, Chi-Square tests'
          ],
          whyItMatters: 'Data science is the discipline of making valid inferences from noisy data. Solid statistical footing prevents false discoveries and confirmation bias.',
          productionUse: 'Validating model significance, analyzing feature distributions, and conducting scientific product experiments.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate sample statistical distributions in SciPy; verify degrees of freedom and p-value interpretations independently.',
          handsOnTask: 'Conduct a rigorous statistical distribution analysis and hypothesis test on a healthcare dataset to verify if a treatment difference is statistically significant.',
          projectApplication: 'Forms the scientific foundation for the Predictive Healthcare Risk Analysis project.',
          resources: [
            { title: 'OpenIntro Statistics', url: 'https://www.openintro.org/book/os/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Exploratory Data Analysis (EDA), data cleaning, feature engineering, and advanced SQL.',
      skills: [
        {
          id: 'ds-eda-visualization',
          title: 'Exploratory Data Analysis (EDA) & Data Visualization',
          category: 'Data Exploration',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['ds-stats-prob'],
          description: 'Explore and profile datasets: univariate, bivariate, and multivariate analysis, correlation matrices, outlier detection, and visualization with Seaborn / Matplotlib / Plotly.',
          whatToLearn: [
            'Systematic EDA workflow: inspecting shapes, missing data patterns, data types, and cardinality',
            'Univariate analysis: histograms, KDE plots, box plots for distribution and skewness inspection',
            'Bivariate analysis: scatter plots, correlation heatmaps (Pearson vs Spearman rank correlation)',
            'Outlier detection and treatment: Z-score method, IQR method, Winsorization, and domain clipping',
            'Interactive visualizations with Plotly for exploratory stakeholder presentations'
          ],
          whyItMatters: '"Garbage in, garbage out." High-performing machine learning models come from deep exploration of the data, not blindly tweaking hyperparameter dials.',
          productionUse: 'Discovering data leakage, unearthing hidden biases, and identifying high-leverage predictive signals.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate comprehensive EDA profiling templates; manually scrutinize unexpected correlations for data leakage.',
          handsOnTask: 'Conduct a thorough EDA on a credit card transaction dataset, identifying anomalous spending distributions and visualizing fraud correlations.',
          projectApplication: 'Mandatory first phase of all machine learning portfolio projects.',
          resources: [
            { title: 'Seaborn Official Documentation', url: 'https://seaborn.pydata.org/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ds-feature-engineering',
          title: 'Feature Engineering, Preprocessing & Data Leakage Prevention',
          category: 'Feature Engineering',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['ds-eda-visualization'],
          description: 'Transform raw data into predictive signals: scaling, one-hot/target encoding, handling missing data, polynomial features, dimensionality reduction (PCA), and strict data leakage avoidance.',
          whatToLearn: [
            'Categorical encoding: One-Hot Encoding, Ordinal Encoding, Target Encoding (with out-of-fold regularization)',
            'Numerical transformations: StandardScaler, MinMaxScaler, RobustScaler, Log transforms for skewed features',
            'Imputation strategies: median/mode imputation, KNN imputation, IterativeImputer (MICE)',
            'Feature creation: interaction terms, ratio features, date/time cyclical encodings (sin/cos of hour/month)',
            'Dimensionality reduction: Principal Component Analysis (PCA) and t-SNE for high-dimensional feature spaces',
            'Data Leakage: preventing test set contamination by strictly fitting transformers only on training splits'
          ],
          whyItMatters: 'Feature engineering is the single biggest factor separating mediocre machine learning models from competition-winning, production-grade systems.',
          productionUse: 'Building preprocessing pipelines that transform raw database records into clean model input tensors.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to brainstorm creative feature combinations based on domain context; always audit scikit-learn Pipeline objects to ensure zero data leakage.',
          handsOnTask: 'Build a leak-free scikit-learn ColumnTransformer pipeline incorporating target encoding, imputation, and cyclical time features.',
          projectApplication: 'Provides the feature pipeline for the Customer Churn & Lifetime Value Prediction project.',
          resources: [
            { title: 'Feature Engineering for Machine Learning by Alice Zheng', url: 'https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Supervised and unsupervised machine learning algorithms, model evaluation metrics, and cross-validation.',
      skills: [
        {
          id: 'ds-supervised-learning',
          title: 'Supervised Learning: Regression, Classification & Ensembles',
          category: 'Machine Learning',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: ['ds-feature-engineering'],
          description: 'Master core ML algorithms with scikit-learn and gradient boosting: Linear/Ridge/Lasso Regression, Logistic Regression, Random Forests, XGBoost, LightGBM, and CatBoost.',
          whatToLearn: [
            'Linear Models: Ordinary Least Squares, Ridge (L2 regularization), Lasso (L1 feature selection), ElasticNet',
            'Classification algorithms: Logistic Regression, Support Vector Machines (SVM), k-Nearest Neighbors (KNN), Naive Bayes',
            'Tree-based algorithms: Decision Trees (Gini impurity vs entropy, pruning, max depth)',
            'Ensemble methods: Bagging (Random Forests) vs Boosting (AdaBoost, Gradient Boosting, XGBoost, LightGBM, CatBoost)',
            'Hyperparameter optimization: GridSearchCV, RandomizedSearchCV, and Bayesian optimization with Optuna'
          ],
          whyItMatters: 'Gradient boosted decision trees (XGBoost/LightGBM) represent the state of the art for tabular data in the commercial world.',
          productionUse: 'Credit scoring, customer churn prediction, pricing algorithms, recommendation ranking, and demand forecasting.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to write Optuna hyperparameter search study scripts; evaluate convergence curves and test set stability manually.',
          handsOnTask: 'Train and compare 5 distinct classification models (including XGBoost and Random Forest) on a customer churn dataset, tuning hyperparameters with Optuna.',
          projectApplication: 'Core machine learning engine for the Customer Churn & LTV Prediction project.',
          resources: [
            { title: 'scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'documentation' },
            { title: 'XGBoost Official Documentation', url: 'https://xgboost.readthedocs.io/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ds-model-evaluation',
          title: 'Model Evaluation, Validation Strategies & Class Imbalance',
          category: 'Model Evaluation',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['ds-supervised-learning'],
          description: 'Evaluate models with scientific rigor: K-Fold cross-validation, precision-recall tradeoffs, ROC-AUC, classification under severe imbalance (SMOTE), and business cost matrices.',
          whatToLearn: [
            'Cross-validation schemes: K-Fold, Stratified K-Fold (for classification), TimeSeriesSplit (for temporal data)',
            'Regression evaluation: Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), Mean Absolute Percentage Error (MAPE), R2',
            'Classification evaluation: Precision, Recall, F1-Score, PR-AUC, ROC-AUC curve, Confusion Matrix analysis',
            'Handling severe class imbalance (e.g., 0.1% fraud rate): SMOTE, random undersampling, class weights (scale_pos_weight)',
            'Threshold tuning: adjusting decision thresholds (default 0.5) to optimize business cost-benefit payoff matrices'
          ],
          whyItMatters: 'Accuracy is a useless metric on imbalanced real-world datasets. A model that predicts "not fraud" 99.9% of the time has 99.9% accuracy but zero business utility.',
          productionUse: 'Calibrating fraud detection models, clinical diagnosis predictors, and spam classifiers to minimize costly false negatives.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate precision-recall curve plotting scripts; select the final operating threshold based on real business unit economics.',
          handsOnTask: 'Build a fraud detection pipeline on a 99.8% imbalanced dataset, optimize PR-AUC, and tune the classification decision threshold to maximize dollar savings.',
          projectApplication: 'Evaluates the Credit Card Fraud Detection model with financial cost matrices.',
          resources: [
            { title: 'Google Machine Learning Crash Course: Classification', url: 'https://developers.google.com/machine-learning/crash-course/classification', type: 'course' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Model interpretability (SHAP / LIME), unsupervised clustering, and production ML model deployment.',
      skills: [
        {
          id: 'ds-interpretability-shap',
          title: 'Model Explainability & Interpretability (SHAP & LIME)',
          category: 'Model Explainability',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['ds-model-evaluation'],
          description: 'Demystify black-box machine learning models: Shapley values (SHAP: TreeSHAP, summary plots, force plots), LIME local explanations, and partial dependence plots (PDP).',
          whatToLearn: [
            'Why interpretability matters: regulatory compliance (GDPR Right to Explanation, Equal Credit Opportunity Act), debugging bias',
            'Global vs Local interpretability methods',
            'Shapley additive explanations (SHAP): cooperative game theory origins, mathematical foundations',
            'TreeSHAP: summary beeswarm plots, feature importance ranking, dependence plots, individual waterfall force plots',
            'Local Interpretable Model-agnostic Explanations (LIME) for explaining individual row predictions',
            'Partial Dependence Plots (PDP) and Individual Conditional Expectation (ICE) plots'
          ],
          whyItMatters: 'Regulated industries (finance, healthcare) cannot deploy black-box models without legally defensible explanations for every prediction.',
          productionUse: 'Explaining loan rejections, clinical risk assessments, and auditing models for demographic bias.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate SHAP explanation visualizations; write the narrative business explanation for executive stakeholders.',
          handsOnTask: 'Compute global and local TreeSHAP explanations for a gradient-boosted loan approval model, producing an individualized rejection explanation for 3 customers.',
          projectApplication: 'Provides transparent decision explainability for the Credit Card Fraud Detection project.',
          resources: [
            { title: 'Interpretable Machine Learning by Christoph Molnar', url: 'https://christophm.github.io/interpretable-ml-book/', type: 'book' },
            { title: 'SHAP Official Documentation', url: 'https://shap.readthedocs.io/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ds-model-deployment-api',
          title: 'ML Model Packaging, Serialization & FastAPI Serving',
          category: 'Model Deployment',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['ds-interpretability-shap'],
          description: 'Deploy trained models to production: joblib/ONNX serialization, building REST API inference endpoints with FastAPI, Docker containerization, and input schema validation with Pydantic.',
          whatToLearn: [
            'Model artifact persistence: joblib, pickle security hazards, ONNX (Open Neural Network Exchange) format',
            'FastAPI inference architecture: loading models in memory on startup (@app.on_event("startup")), Pydantic input schemas',
            'Preprocessing inside inference pipelines: ensuring training and production inference share exact transformation steps',
            'Containerizing ML services with Docker for reproducible deployment across cloud environments',
            'Batch prediction vs Real-time online prediction architectures and latency considerations'
          ],
          whyItMatters: 'A machine learning model locked inside a Jupyter Notebook generates zero business value. Data scientists must deploy models to live APIs.',
          productionUse: 'Serving live predictions to frontend apps, mobile apps, and microservice architectures.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to scaffold FastAPI route handlers and Pydantic inference request schemas.',
          handsOnTask: 'Package a trained XGBoost model into an ONNX/joblib pipeline and deploy it behind a containerized FastAPI endpoint with input validation and automated Swagger docs.',
          projectApplication: 'Serves real-time predictions for the Capstone End-to-End Machine Learning System.',
          resources: [
            { title: 'FastAPI Machine Learning Deployment Guide', url: 'https://fastapi.tiangolo.com/tutorial/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'End-to-end portfolio projects, machine learning case interviews, and data science technical screening prep.',
      skills: [
        {
          id: 'ds-interview-cases',
          title: 'Data Science Interviews: ML Case Studies & Technical Coding',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['ds-model-deployment-api'],
          description: 'Master data science interviews: live Python/SQL algorithmic coding, mathematical ML theory questions (bias-variance tradeoff, regularization), and open-ended Machine Learning System Design case studies.',
          whatToLearn: [
            'Core ML theory deep dives: Bias-Variance tradeoff, derivation of logistic loss, regularization penalties (L1 vs L2 geometry)',
            'ML System Design interviews: Designing a Recommendation Feed (YouTube/TikTok), Fraud Detection Pipeline, Search Ranking',
            'Live coding interviews: Pandas data wrangling and scikit-learn pipeline construction under timed 45-minute sessions',
            'Behavioral interviews using STAR: communicating data science failure stories, model drift, and navigating stakeholder misalignment'
          ],
          whyItMatters: 'Data science interview loops test theoretical depth, coding fluency, and the ability to connect statistical metrics to commercial revenue.',
          productionUse: 'Excelling in technical screens and hiring committee reviews at top tech companies.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive technical interviewer to drill mathematical derivations and pose ML system design trade-offs.',
          handsOnTask: 'Complete 5 comprehensive mock Machine Learning System Design interviews covering metric selection, data labeling, model training, and online evaluation.',
          projectApplication: 'Direct preparation for data scientist technical interview loops.',
          resources: [
            { title: 'Machine Learning System Design Interview by Ali Aminian', url: 'https://www.amazon.com/Machine-Learning-System-Design-Interview/dp/1736049119', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ds-portfolio-resume',
          title: 'Data Science Portfolio, Case Studies & Quantifiable Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['ds-interview-cases'],
          description: 'Publish complete data science case studies: business problem framing, EDA insights, model evaluation metrics, interactive demo deployments (Streamlit/Gradio), and an ATS resume.',
          whatToLearn: [
            'Structuring technical case studies: Executive Summary, Business Problem, EDA, Modeling Approach, Results, Business Impact',
            'Building interactive live demos using Streamlit or Gradio deployed on Hugging Face Spaces',
            'Writing quantifiable data science resume bullets: highlighting metric gains, cost reductions, and business decision impact',
            'GitHub repository hygiene: clean notebook outputs, requirements.txt, and setup instructions'
          ],
          whyItMatters: 'A working, clickable Streamlit demonstration with quantifiable business metrics provides undeniable proof of technical value to recruiters.',
          productionUse: 'Securing interview calls from hiring managers and recruiters.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to audit resume bullets against data science job postings; verify all metrics reflect genuine analytical work.',
          handsOnTask: 'Build and deploy an interactive Streamlit demonstration app allowing users to input hypothetical customer profiles and receive real-time churn predictions with SHAP charts.',
          projectApplication: 'Packages your complete data science portfolio for public presentation.',
          resources: [
            { title: 'Streamlit Official Documentation', url: 'https://docs.streamlit.io/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'ds-proj-1',
      title: 'Predictive Real Estate Valuation & Feature Engineering Engine',
      difficulty: 'Beginner',
      estimatedTime: '3-4 weeks',
      objective: 'Build an end-to-end regression model predicting housing prices with rigorous feature engineering, outlier detection, and scikit-learn pipelines.',
      technologies: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib / Seaborn', 'Jupyter Notebook'],
      skillsPracticed: ['Exploratory data analysis', 'Log transformations', 'Categorical target encoding', 'Ridge/Lasso regression', 'Cross-validation'],
      requirements: [
        'Comprehensive EDA identifying skewed price distributions and applying log-normal transformations',
        'Feature engineering pipeline: geographic distance features, property age, total square footage, and neighborhood encodings',
        'Training and comparing Linear Regression, Ridge, Lasso, and Random Forest regressors',
        'Cross-validation evaluation using Root Mean Squared Error (RMSE) and R-squared metrics'
      ],
      deliverables: [
        'Clean Jupyter Notebook with markdown documentation and publication-ready charts',
        'Saved scikit-learn Pipeline object ready for inference',
        'Technical write-up explaining which features had the highest positive impact on house valuation'
      ],
      productionExpectations: [
        'Strict zero-leakage pipeline using scikit-learn Pipeline and ColumnTransformer',
        'All transformations reproducible on unseen test data splits'
      ],
      aiIntegration: 'Use AI to assist in formulating domain-specific feature interactions (e.g., bathroom-to-bedroom ratios).'
    },
    {
      id: 'ds-proj-2',
      title: 'Credit Card Fraud Detection with Severe Imbalance & SHAP',
      difficulty: 'Intermediate',
      estimatedTime: '5 weeks',
      objective: 'Develop a high-precision fraud detection classification model on a heavily imbalanced dataset (99.8% non-fraud), incorporating SMOTE, PR-AUC tuning, and SHAP explainability.',
      technologies: ['Python', 'XGBoost', 'LightGBM', 'scikit-learn', 'SHAP', 'Imbalanced-Learn'],
      skillsPracticed: ['Class imbalance handling', 'PR-AUC optimization', 'Cost-sensitive learning', 'TreeSHAP explainability', 'Threshold tuning'],
      requirements: [
        'Address 99.8% class imbalance using cost-sensitive learning (scale_pos_weight) and SMOTE oversampling',
        'Evaluate models using Precision-Recall Area Under Curve (PR-AUC) and F1-Score rather than deceptive accuracy',
        'Optimize classification threshold based on a business cost matrix ($50 cost per false positive investigation vs $500 loss per false negative fraud)',
        'Compute global and local TreeSHAP explanations demonstrating exactly why specific transactions were flagged as fraud'
      ],
      deliverables: [
        'Documented Jupyter Notebook with complete model comparison charts and PR curves',
        'SHAP summary beeswarm and waterfall visualization exports',
        'Executive summary brief quantifying the estimated net financial savings of deploying the model'
      ],
      productionExpectations: [
        'Zero data leakage during oversampling (SMOTE applied strictly within training cross-validation folds)',
        'Fully transparent model decision explanations suitable for compliance audits'
      ],
      aiIntegration: 'Use AI to draft business financial payoff equations based on false positive investigation operational costs.'
    },
    {
      id: 'ds-proj-3',
      title: 'Production Customer Churn & LTV Platform with Streamlit & FastAPI',
      difficulty: 'Production',
      estimatedTime: '6-7 weeks',
      objective: 'Architect an end-to-end production machine learning system predicting SaaS customer churn and lifetime value, packaged with a FastAPI inference backend and an interactive Streamlit UI.',
      technologies: ['Python', 'XGBoost', 'scikit-learn', 'FastAPI', 'Streamlit', 'Docker', 'SHAP'],
      skillsPracticed: ['End-to-end ML pipeline', 'FastAPI model serving', 'Docker containerization', 'Interactive Streamlit UI', 'Live SHAP explanations'],
      requirements: [
        'Trained XGBoost classification pipeline predicting churn probability alongside a regression model predicting expected Customer Lifetime Value (LTV)',
        'Containerized FastAPI REST service serving low-latency (<50ms) inference with Pydantic payload validation',
        'Interactive Streamlit web application allowing customer success agents to adjust customer attributes and see real-time churn risk changes',
        'Integrated SHAP waterfall plot in the Streamlit UI displaying the top 3 positive and negative factors driving that customer’s churn score'
      ],
      deliverables: [
        'Live deployed Streamlit application on Hugging Face Spaces or Streamlit Community Cloud',
        'Containerized FastAPI microservice with Dockerfile and automated Swagger docs',
        'Public GitHub repository with comprehensive README, setup instructions, and architecture diagrams'
      ],
      productionExpectations: [
        'Under 50ms inference response time for single-user prediction requests',
        'Clean separation between model training pipelines, backend API serving, and frontend UI'
      ],
      aiIntegration: 'Use AI to generate synthetic customer usage histories with realistic churn triggers.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Python data science stack: NumPy vectorization, Pandas DataFrames, and Jupyter Notebooks',
      'Mathematics for ML: Linear algebra (matrices, eigenvalues), calculus, and gradient descent',
      'Inferential statistics: probability distributions, Central Limit Theorem, and hypothesis testing',
      'Exploratory Data Analysis (EDA) and visualization with Matplotlib, Seaborn, and Plotly',
      'Feature engineering: scaling, encoding, missing value imputation, and avoiding data leakage',
      'Supervised learning: Linear/Logistic Regression, Random Forests, XGBoost, LightGBM',
      'Model evaluation: Cross-validation, Precision-Recall AUC, ROC-AUC, and threshold calibration',
      'Handling severe class imbalance: SMOTE, class weights, and business cost matrices',
      'Model explainability: Shapley values (SHAP: TreeSHAP, summary plots) and LIME',
      'Model deployment: packaging pipelines with joblib/ONNX, FastAPI, and Docker'
    ],
    projects: [
      'Predictive housing valuation model with scikit-learn pipelines and feature engineering',
      'Credit card fraud detection on imbalanced data with PR-AUC optimization and SHAP explainability',
      'Production customer churn and LTV platform with containerized FastAPI and Streamlit UI',
      'All projects documented on GitHub with interactive web demonstrations'
    ],
    csFundamentals: [
      'Mathematical algorithmic complexity: Big-O analysis of training and inference times',
      'Optimization theory: convex vs non-convex functions, learning rates, gradient descent variants',
      'Data structures applied to machine learning: decision tree graphs, KD-trees for KNN',
      'Client-server architecture for serving machine learning models over HTTP REST APIs'
    ],
    tools: [
      'Data science libraries: scikit-learn, XGBoost, LightGBM, Pandas, NumPy, SciPy',
      'Model explainability tools: SHAP and LIME',
      'Interactive prototyping tools: Jupyter Notebooks, Streamlit, Gradio',
      'Deployment and versioning tools: Docker, FastAPI, Git, GitHub'
    ],
    deployment: [
      'Deploying interactive Streamlit or Gradio applications to cloud platforms (Hugging Face Spaces)',
      'Building Docker containers for model inference APIs and deploying to cloud hosts',
      'Managing serialized model artifacts with joblib or ONNX runtimes',
      'Configuring automated GitHub Actions to test data preprocessing functions'
    ],
    portfolio: [
      'Online data science portfolio showcasing live interactive Streamlit demonstrations',
      'In-depth case study write-ups detailing the business problem, methodology, and ROI',
      'Clean visualization design adhering to data storytelling best practices',
      'Public GitHub repositories with clean, reproducible Jupyter Notebooks'
    ],
    github: [
      'Well-structured GitHub repositories with clean requirements.txt and setup commands',
      'Comprehensive READMEs with architecture diagrams and high-resolution chart exports',
      'Clean commit history following Conventional Commits format',
      'Visible badges showing reproducible test execution and code quality'
    ],
    resume: [
      'Single-page ATS-compliant Data Scientist resume in PDF format',
      'Bullet points highlighting quantifiable business metrics: accuracy improvements, revenue saved, model inference latency',
      'Direct links to live Streamlit demos, GitHub repositories, and LinkedIn profile',
      'Targeted keywords matching data scientist, machine learning scientist, and predictive analytics roles'
    ],
    interviewReadiness: [
      'Mastery of machine learning theoretical derivations (logistic loss, bias-variance tradeoff, regularization)',
      'Fluency in live Pandas data manipulation and scikit-learn pipeline coding under 45-minute limits',
      'Structured approach to open-ended Machine Learning System Design case study questions',
      'Clear articulation of model interpretability, fairness, and ethical data science considerations'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['dataScientist'] = dataScientistRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dataScientistRoadmap;
}
