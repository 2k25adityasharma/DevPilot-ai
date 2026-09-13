// js/data/interviewPrep/aiMl.js
// Complete Question Bank for AI & Machine Learning Fundamentals (15 topics * 10 = 150 MCQs)

window.interviewPrepAiMl = {
  id: 'ai_machine_learning',
  title: 'Artificial Intelligence & Machine Learning',
  icon: 'neurology',
  description: 'Master AI/ML paradigms, supervised & unsupervised learning, reinforcement learning, evaluation metrics, neural networks, optimizers, CNNs, RNNs, Transformers, NLP, LLMs, and MLOps.',
  totalQuestions: 150,
  topics: [
    'AI vs ML vs Deep Learning',
    'Supervised Learning',
    'Unsupervised Learning',
    'Reinforcement Learning',
    'Model Evaluation Metrics',
    'Bias-Variance & Overfitting',
    'Regularization Techniques',
    'Neural Networks Fundamentals',
    'Optimization Algorithms',
    'CNNs & Computer Vision',
    'RNNs & Sequence Modeling',
    'Transformer & Self-Attention',
    'NLP Fundamentals',
    'LLMs & Generative AI',
    'Ethical AI & MLOps'
  ],
  questions: [
  {
    "id": "aiml_fnd_1",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Easy",
    "question": "What is the hierarchical relationship between AI, Machine Learning, and Deep Learning?",
    "options": [
      "They are three completely unrelated disciplines",
      "AI is the broad umbrella concept; Machine Learning is a subset of AI; Deep Learning is a specialized subset of Machine Learning using multi-layered neural networks",
      "Deep Learning encompasses AI; AI is a subset of ML",
      "Machine Learning is hardware; Deep Learning is software"
    ],
    "correctAnswer": 1,
    "explanation": "AI is the overarching field of creating intelligent machines. ML is the subset of AI focused on learning patterns from data without explicit programming. Deep Learning is the subfield of ML employing deep artificial neural networks."
  },
  {
    "id": "aiml_fnd_2",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Easy",
    "question": "What distinguishes Machine Learning from traditional rule-based programming?",
    "options": [
      "ML requires no computers",
      "In traditional programming, humans write explicit rules and input data to produce answers; in ML, the algorithm is fed data and answers to learn the underlying rules/patterns automatically",
      "Traditional programming is always faster than ML",
      "ML can only process numbers under 100"
    ],
    "correctAnswer": 1,
    "explanation": "Traditional programming takes Data + Rules -> Answers. Machine Learning takes Data + Answers -> Learned Rules (statistical models)."
  },
  {
    "id": "aiml_fnd_3",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Easy",
    "question": "What are the three primary paradigms of Machine Learning?",
    "options": [
      "Frontend, Backend, Database",
      "Supervised Learning, Unsupervised Learning, and Reinforcement Learning",
      "Static, Dynamic, Continuous",
      "Linear, Quadratic, Exponential"
    ],
    "correctAnswer": 1,
    "explanation": "The 3 classic ML paradigms: Supervised (learning with labeled data), Unsupervised (discovering hidden patterns in unlabeled data), and Reinforcement (learning optimal actions via trial-and-error rewards)."
  },
  {
    "id": "aiml_fnd_4",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Easy",
    "question": "What is \"Narrow AI\" (Weak AI) versus \"General AI\" (AGI)?",
    "options": [
      "Narrow AI is for smartphones; General AI is for supercomputers",
      "Narrow AI is designed to perform a specific dedicated task (e.g. chess, image recognition); General AI possesses human-like generalized intelligence capable of learning any intellectual task",
      "Narrow AI has fewer lines of code",
      "General AI has already been achieved by calculators"
    ],
    "correctAnswer": 1,
    "explanation": "All existing AI today (ChatGPT, AlphaFold, Siri, self-driving cars) is Narrow AI focused on specific domains. Artificial General Intelligence (AGI) remains theoretical: machines capable of autonomous cross-domain human-level cognitive reasoning."
  },
  {
    "id": "aiml_fnd_5",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Medium",
    "question": "What is the primary advantage of Deep Learning over classical ML (like Random Forest or SVM) when dealing with raw unstructured data (images, audio, text)?",
    "options": [
      "Deep learning requires zero training data",
      "Deep learning performs automated hierarchical feature representation learning directly from raw data, eliminating tedious manual domain feature engineering",
      "Deep learning models are always explainable and transparent",
      "Deep learning runs without GPUs"
    ],
    "correctAnswer": 1,
    "explanation": "Classical ML requires domain experts to manually engineer and extract features. Deep learning networks automatically learn hierarchical representations (edges -> shapes -> object parts -> whole objects) from raw pixel/token inputs."
  },
  {
    "id": "aiml_fnd_6",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Medium",
    "question": "What is the Turing Test and what was its historical significance?",
    "options": [
      "A benchmark for CPU clock frequency",
      "A test proposed by Alan Turing where a human evaluator engages in a blind text conversation with a machine and another human; if evaluator cannot reliably tell machine from human, the machine exhibits intelligence",
      "A test proving mathematical theorems",
      "A benchmark for cryptographic encryption"
    ],
    "correctAnswer": 1,
    "explanation": "Alan Turing's 1950 \"Imitation Game\" proposed assessing machine intelligence operationally: if a computer's verbal responses are indistinguishable from a human's, it can be said to think."
  },
  {
    "id": "aiml_fnd_7",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Medium",
    "question": "What is \"Feature Engineering\" in classical machine learning?",
    "options": [
      "Designing computer hardware features",
      "The process of selecting, transforming, and creating domain-specific mathematical variables/features from raw data to improve ML model accuracy and performance",
      "Writing automated unit tests for AI models",
      "Creating user interfaces for AI products"
    ],
    "correctAnswer": 1,
    "explanation": "Feature engineering transforms raw observations (dates, text, categorical records) into informative representations (one-hot encoding, normalization, aggregations) that best expose underlying patterns to ML algorithms."
  },
  {
    "id": "aiml_fnd_8",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Medium",
    "question": "What is the \"Curse of Dimensionality\" in machine learning?",
    "options": [
      "A theoretical bug in Python compilers",
      "As the number of input features (dimensions) increases, the volume of the feature space grows exponentially, making data points extremely sparse and distances between points indistinguishable",
      "When an AI model runs out of hard drive storage",
      "When matrices become non-invertible"
    ],
    "correctAnswer": 1,
    "explanation": "In high-dimensional spaces, data points become exponentially isolated. Distance metrics (Euclidean) lose discriminatory power, requiring exponentially more training samples to avoid severe overfitting."
  },
  {
    "id": "aiml_fnd_9",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Hard",
    "question": "What is Moravec's Paradox in Artificial Intelligence?",
    "options": [
      "Computers cannot multiply large numbers",
      "Contrary to traditional expectations, high-level reasoning and abstract logic (chess, calculus) require relatively little computational effort, whereas low-level sensorimotor skills (walking, visual perception, object grasping) require enormous computational resources",
      "AI models learn faster when written in C",
      "Neural networks fail on floating point inputs"
    ],
    "correctAnswer": 1,
    "explanation": "Hans Moravec observed: it is comparatively easy to make computers exhibit adult-level performance on intelligence tests or playing checkers, but difficult to give them the motor and perceptual skills of a one-year-old child."
  },
  {
    "id": "aiml_fnd_10",
    "topic": "AI vs ML vs Deep Learning",
    "difficulty": "Hard",
    "question": "What is the \"No Free Lunch\" Theorem for machine learning?",
    "options": [
      "AI researchers must pay for lunch",
      "No single machine learning algorithm is universally superior to all other algorithms across every conceivable problem; every algorithm makes inductive assumptions that excel on some datasets and fail on others",
      "All ML models require cloud subscriptions",
      "Unsupervised learning is always cheaper than supervised"
    ],
    "correctAnswer": 1,
    "explanation": "Wolpert and Macready proved: averaged across all possible data distributions, every classification algorithm has the same expected error rate. Algorithm success depends on how well its inductive biases align with the specific problem distribution."
  },
  {
    "id": "aiml_sl_1",
    "topic": "Supervised Learning",
    "difficulty": "Easy",
    "question": "What is the fundamental difference between Regression and Classification in supervised learning?",
    "options": [
      "Regression uses neural networks; classification uses trees",
      "Regression predicts continuous numerical values (e.g. house prices); Classification predicts discrete categorical labels (e.g. spam or not spam)",
      "Regression is unsupervised; classification is supervised",
      "Classification cannot predict probabilities"
    ],
    "correctAnswer": 1,
    "explanation": "Regression targets continuous real-valued outputs (quantities, prices, temperatures). Classification targets discrete categorical class labels (binary or multi-class)."
  },
  {
    "id": "aiml_sl_2",
    "topic": "Supervised Learning",
    "difficulty": "Easy",
    "question": "What is the mathematical hypothesis function of simple Linear Regression?",
    "options": [
      "y = mx^2 + c",
      "y = w * x + b (or y = β0 + β1*x)",
      "y = 1 / (1 + e^-x)",
      "y = log(x)"
    ],
    "correctAnswer": 1,
    "explanation": "Simple linear regression models the relationship between independent feature x and dependent target y as a straight line: y = w*x + b, where w is weight (slope) and b is bias (intercept)."
  },
  {
    "id": "aiml_sl_3",
    "topic": "Supervised Learning",
    "difficulty": "Easy",
    "question": "What function does Logistic Regression use to map real-valued predictions into probabilities between 0 and 1?",
    "options": [
      "ReLU function",
      "Sigmoid / Logistic function: σ(z) = 1 / (1 + e^-z)",
      "Linear function",
      "Step function"
    ],
    "correctAnswer": 1,
    "explanation": "The Sigmoid function maps any real-valued number (-∞ to +∞) into an S-shaped curve between 0 and 1, interpreting output as the probability of the positive class."
  },
  {
    "id": "aiml_sl_4",
    "topic": "Supervised Learning",
    "difficulty": "Easy",
    "question": "How does a K-Nearest Neighbors (KNN) algorithm classify a new query data point?",
    "options": [
      "By training a deep neural network",
      "By computing the distance to all training samples, identifying the K closest points, and assigning the majority class among those K neighbors",
      "By drawing a decision boundary line with gradient descent",
      "By clustering data into K groups using centroids"
    ],
    "correctAnswer": 1,
    "explanation": "KNN is a non-parametric, lazy learning algorithm: at query time, it computes distances (Euclidean/Manhattan) to all points in memory and votes the majority label of the nearest K points."
  },
  {
    "id": "aiml_sl_5",
    "topic": "Supervised Learning",
    "difficulty": "Medium",
    "question": "What is the role of the \"Margin\" and \"Support Vectors\" in Support Vector Machines (SVM)?",
    "options": [
      "Support vectors are computer RAM units",
      "SVM seeks the optimal hyperplane that maximizes the margin (perpendicular distance) between the boundary and the closest data points of opposing classes (which are the Support Vectors)",
      "Margins define the training learning rate",
      "Support vectors are weights that equal zero"
    ],
    "correctAnswer": 1,
    "explanation": "SVM finds the separating hyperplane with the maximum margin. The critical training instances lying directly on the margin boundary that dictate the hyperplane position are called Support Vectors."
  },
  {
    "id": "aiml_sl_6",
    "topic": "Supervised Learning",
    "difficulty": "Medium",
    "question": "What criteria are commonly used to evaluate splits in Decision Tree algorithms (e.g. CART, ID3)?",
    "options": [
      "Accuracy and Loss",
      "Gini Impurity, Information Gain (Entropy reduction), and Variance Reduction",
      "Euclidean Distance and Cosine Similarity",
      "Gradient and Hessian"
    ],
    "correctAnswer": 1,
    "explanation": "Decision trees choose split points that maximize purity: CART uses Gini Impurity; ID3/C4.5 uses Information Gain based on Shannon Entropy; regression trees use variance reduction."
  },
  {
    "id": "aiml_sl_7",
    "topic": "Supervised Learning",
    "difficulty": "Medium",
    "question": "What is the \"Kernel Trick\" in Support Vector Machines?",
    "options": [
      "A cheat code to speed up SVM training",
      "Implicitly mapping non-linearly separable data into a higher-dimensional space using a kernel function (e.g. RBF, Polynomial) where a linear hyperplane can separate the classes, without computing explicit high-dimensional coordinates",
      "Running SVM on GPU kernels",
      "Deleting outliers from data"
    ],
    "correctAnswer": 1,
    "explanation": "The kernel trick replaces costly high-dimensional dot products with equivalent kernel functions (like Gaussian RBF: `K(x, y) = exp(-γ||x-y||^2)`), enabling non-linear boundaries efficiently."
  },
  {
    "id": "aiml_sl_8",
    "topic": "Supervised Learning",
    "difficulty": "Medium",
    "question": "What is the difference between \"Bagging\" (e.g. Random Forest) and \"Boosting\" (e.g. XGBoost, LightGBM)?",
    "options": [
      "Bagging is for regression; boosting for classification",
      "Bagging trains multiple independent base models in parallel on bootstrap subsets and averages them (reduces variance); Boosting trains models sequentially, where each new model focuses on correcting errors of prior models (reduces bias)",
      "Boosting trains models in parallel; bagging sequentially",
      "Random Forest uses deep neural networks"
    ],
    "correctAnswer": 1,
    "explanation": "Bagging (Bootstrap Aggregation) trains trees in parallel on random data slices, reducing variance. Boosting trains trees sequentially where each successive tree fits pseudo-residuals of previous trees, reducing bias and variance."
  },
  {
    "id": "aiml_sl_9",
    "topic": "Supervised Learning",
    "difficulty": "Hard",
    "question": "Why is Ordinary Least Squares (OLS) sensitive to Multicollinearity in multiple linear regression?",
    "options": [
      "It causes computer overheating",
      "When predictor features are highly linearly correlated, the matrix (X^T * X) becomes nearly singular (non-invertible), causing coefficient estimates to become unstable with huge standard errors",
      "It converts regression to classification",
      "It forces all weights to zero"
    ],
    "correctAnswer": 1,
    "explanation": "When features are collinear, `(X^T * X)^-1` cannot be computed accurately. Small fluctuations in data cause massive swings in coefficient magnitudes and signs, destroying model interpretability."
  },
  {
    "id": "aiml_sl_10",
    "topic": "Supervised Learning",
    "difficulty": "Hard",
    "question": "What is the \"Out-of-Bag\" (OOB) error in Random Forest and how does it replace cross-validation?",
    "options": [
      "An error thrown when RAM runs out",
      "Because each tree is trained on a bootstrap sample (~63.2% of data), the remaining ~36.8% unselected samples (OOB data) act as an internal validation set, providing an unbiased validation score without explicit cross-validation",
      "A metric measuring leaf node depth",
      "An error thrown when trees diverge"
    ],
    "correctAnswer": 1,
    "explanation": "Sampling with replacement leaves approximately (1 - 1/e) ≈ 36.8% of training samples out of each tree's dataset. Evaluating trees on their respective out-of-bag samples provides an accurate, built-in validation metric."
  },
  {
    "id": "aiml_ul_1",
    "topic": "Unsupervised Learning",
    "difficulty": "Easy",
    "question": "What is the defining characteristic of Unsupervised Learning?",
    "options": [
      "Algorithms are trained without computers",
      "Algorithms are provided input data without any target labels or ground truth outcomes, discovering inherent patterns, groupings, or representations autonomously",
      "Algorithms require continuous human intervention",
      "Models only predict true or false"
    ],
    "correctAnswer": 1,
    "explanation": "In unsupervised learning, datasets contain features X with no corresponding target labels Y. The objective is to discover underlying structures, cluster memberships, or low-dimensional manifolds."
  },
  {
    "id": "aiml_ul_2",
    "topic": "Unsupervised Learning",
    "difficulty": "Easy",
    "question": "What does the K-Means clustering algorithm do?",
    "options": [
      "Classifies images using neural networks",
      "Partitions N observations into K distinct clusters such that each observation belongs to the cluster with the nearest mean (centroid)",
      "Sorts numbers in ascending order",
      "Removes null values from datasets"
    ],
    "correctAnswer": 1,
    "explanation": "K-Means iteratively partitions data into K non-overlapping clusters by minimizing the within-cluster sum of squares (WCSS) distance between points and their assigned cluster centroid."
  },
  {
    "id": "aiml_ul_3",
    "topic": "Unsupervised Learning",
    "difficulty": "Easy",
    "question": "What is Principal Component Analysis (PCA) primarily used for?",
    "options": [
      "Predicting stock market trends",
      "Dimensionality reduction: transforming correlated high-dimensional features into a smaller set of orthogonal, uncorrelated variables (principal components) preserving maximum variance",
      "Clustering customer segments",
      "Training deep neural networks"
    ],
    "correctAnswer": 1,
    "explanation": "PCA projects high-dimensional data onto orthogonal axes of maximum variance, shrinking feature count for compression, noise reduction, and 2D/3D visualization while minimizing information loss."
  },
  {
    "id": "aiml_ul_4",
    "topic": "Unsupervised Learning",
    "difficulty": "Easy",
    "question": "What is the \"Elbow Method\" used for in K-Means clustering?",
    "options": [
      "To measure developer elbow strain",
      "To determine the optimal number of clusters K by plotting Within-Cluster Sum of Squares (Inertia) against K and locating the inflection point (\"elbow\")",
      "To detect outlier data points",
      "To initialize centroids randomly"
    ],
    "correctAnswer": 1,
    "explanation": "As K increases, WCSS naturally decreases. The \"elbow\" marks the point of diminishing returns where adding further clusters yields negligible reduction in WCSS, indicating a natural cluster count."
  },
  {
    "id": "aiml_ul_5",
    "topic": "Unsupervised Learning",
    "difficulty": "Medium",
    "question": "What is the difference between Agglomerative and Divisive Hierarchical Clustering?",
    "options": [
      "Agglomerative is for numbers; Divisive for text",
      "Agglomerative is bottom-up (each point starts in its own cluster and merges sequentially); Divisive is top-down (all points start in one giant cluster and split recursively)",
      "Divisive requires K to be set; Agglomerative does not",
      "They produce identical trees without math"
    ],
    "correctAnswer": 1,
    "explanation": "Agglomerative clustering merges closest pairs of clusters bottom-up into a dendrogram. Divisive clustering splits the entire dataset top-down iteratively until singletons remain."
  },
  {
    "id": "aiml_ul_6",
    "topic": "Unsupervised Learning",
    "difficulty": "Medium",
    "question": "What is a \"Dendrogram\" in hierarchical clustering?",
    "options": [
      "A diagram of computer file systems",
      "A tree-like diagram that illustrates the arrangement and sequence of cluster merges or splits and the distance between clusters at each step",
      "A neural network architecture",
      "A scatter plot of principal components"
    ],
    "correctAnswer": 1,
    "explanation": "A dendrogram visually represents the hierarchical clustering tree. Cutting the dendrogram horizontally at a chosen vertical height/distance determines the number of clusters."
  },
  {
    "id": "aiml_ul_7",
    "topic": "Unsupervised Learning",
    "difficulty": "Medium",
    "question": "How does DBSCAN (Density-Based Spatial Clustering of Applications with Noise) differ from K-Means?",
    "options": [
      "DBSCAN requires defining K in advance",
      "DBSCAN identifies clusters of arbitrary non-spherical shapes based on density (min points within epsilon radius) and automatically labels sparse outliers as noise, requiring no predefined K",
      "K-Means can detect arbitrary shapes; DBSCAN cannot",
      "DBSCAN only works on 1-dimensional data"
    ],
    "correctAnswer": 1,
    "explanation": "K-Means assumes spherical clusters and assigns every point (including outliers) to a centroid. DBSCAN groups contiguous dense regions, handles arbitrary irregular shapes, and marks isolated points as noise."
  },
  {
    "id": "aiml_ul_8",
    "topic": "Unsupervised Learning",
    "difficulty": "Medium",
    "question": "What is the \"Silhouette Score\" in clustering evaluation and what is its range?",
    "options": [
      "A metric from 0 to 100 measuring CPU temperature",
      "A metric ranging from -1 to +1 measuring how similar an object is to its own cluster (cohesion) compared to neighboring clusters (separation); closer to +1 indicates well-clustered points",
      "A metric measuring hard drive storage",
      "A metric measuring regression line slope"
    ],
    "correctAnswer": 1,
    "explanation": "Silhouette Score `s = (b - a) / max(a, b)`: `a` is mean intra-cluster distance, `b` is mean nearest-cluster distance. +1 indicates ideal clustering, 0 indicates overlapping clusters, and negative indicates misassigned samples."
  },
  {
    "id": "aiml_ul_9",
    "topic": "Unsupervised Learning",
    "difficulty": "Hard",
    "question": "In PCA, what mathematical entities represent the directions of maximum variance and the amount of variance explained?",
    "options": [
      "Gradient and Learning rate",
      "Eigenvectors of the feature covariance matrix represent directions; their corresponding Eigenvalues represent the amount of variance explained along each axis",
      "Weights and Biases of neural networks",
      "Mean and Standard Deviation of labels"
    ],
    "correctAnswer": 1,
    "explanation": "Eigen decomposition (or SVD) of the data covariance matrix yields Eigenvectors (which form the principal component loading axes) and Eigenvalues (proportional to variance captured along each respective eigenvector)."
  },
  {
    "id": "aiml_ul_10",
    "topic": "Unsupervised Learning",
    "difficulty": "Hard",
    "question": "What is t-SNE (t-Distributed Stochastic Neighbor Embedding) and why is it preferred over PCA for visualizing complex non-linear data in 2D?",
    "options": [
      "t-SNE is faster than PCA on 10 million rows",
      "PCA preserves only global linear variance; t-SNE is a non-linear probabilistic technique that preserves local pairwise neighborhoods, revealing intricate non-linear clusters and manifolds in 2D/3D",
      "t-SNE can be used for feature engineering in regression",
      "PCA converts non-linear data to linear automatically"
    ],
    "correctAnswer": 1,
    "explanation": "t-SNE converts Euclidean distances into conditional probabilities in high- and low-dimensional spaces, minimizing Kullback-Leibler divergence. It clusters similar points closely, making it state-of-the-art for visual exploratory analysis."
  },
  {
    "id": "aiml_rl_1",
    "topic": "Reinforcement Learning",
    "difficulty": "Easy",
    "question": "What are the core components in the standard Reinforcement Learning framework?",
    "options": [
      "Input, Hidden Layer, Output",
      "Agent, Environment, State, Action, and Reward",
      "Dataset, Testset, Hyperparameters",
      "Optimizer, Loss, Activation"
    ],
    "correctAnswer": 1,
    "explanation": "In RL, an autonomous Agent interacts with an Environment: observing current State `s`, taking Action `a`, receiving scalar Reward `r`, and transitioning to new State `s'."
  },
  {
    "id": "aiml_rl_2",
    "topic": "Reinforcement Learning",
    "difficulty": "Easy",
    "question": "What is the primary objective of an agent in Reinforcement Learning?",
    "options": [
      "To minimize the number of actions taken",
      "To maximize the cumulative discounted reward (return) earned over time",
      "To predict labels with 100% classification accuracy",
      "To memorize all states in RAM"
    ],
    "correctAnswer": 1,
    "explanation": "The agent learns an optimal Policy `π` that maximizes the expected cumulative discounted future reward: `G_t = ∑ (γ^k * R_{t+k+1})`."
  },
  {
    "id": "aiml_rl_3",
    "topic": "Reinforcement Learning",
    "difficulty": "Easy",
    "question": "What does the Discount Factor (γ - gamma, between 0 and 1) represent in RL?",
    "options": [
      "The discount percentage on cloud computing bills",
      "The importance of future rewards relative to immediate rewards (γ=0 considers only immediate rewards; γ near 1 values distant future rewards)",
      "The probability of taking a random action",
      "The learning rate of the neural network"
    ],
    "correctAnswer": 1,
    "explanation": "The discount factor γ weighs future rewards. If γ=0, the agent is short-sighted (myopic), valuing only instant gratification; as γ approaches 1, it becomes far-sighted, planning long-term strategy."
  },
  {
    "id": "aiml_rl_4",
    "topic": "Reinforcement Learning",
    "difficulty": "Easy",
    "question": "What is a \"Policy\" (π) in Reinforcement Learning?",
    "options": [
      "A privacy terms document",
      "The mapping or strategy that the agent uses to determine which action to select given a particular state (π(a|s))",
      "The rule book written by developers",
      "The total score achieved in a game"
    ],
    "correctAnswer": 1,
    "explanation": "A policy defines the agent's behavior: deterministic `a = π(s)` or stochastic `π(a|s) = P(A=a | S=s)`, specifying the action to execute in any given state."
  },
  {
    "id": "aiml_rl_5",
    "topic": "Reinforcement Learning",
    "difficulty": "Medium",
    "question": "What is the \"Exploration vs Exploitation\" dilemma in Reinforcement Learning?",
    "options": [
      "Choosing between CPU and GPU hardware",
      "The fundamental trade-off between trying new, unfamiliar actions to discover potentially higher rewards (Exploration) versus choosing known actions that currently yield the highest known reward (Exploitation)",
      "Choosing between supervised and unsupervised learning",
      "Deciding whether to save or delete models"
    ],
    "correctAnswer": 1,
    "explanation": "Exploit: use current knowledge to harvest known rewards. Explore: risk sub-optimal actions to discover better global strategies. Balancing both is the central challenge in RL."
  },
  {
    "id": "aiml_rl_6",
    "topic": "Reinforcement Learning",
    "difficulty": "Medium",
    "question": "How does the ε-greedy (epsilon-greedy) strategy balance exploration and exploitation?",
    "options": [
      "It stops training when errors drop below epsilon",
      "With probability (1 - ε), the agent selects the best-known greedy action (exploits); with probability ε, it selects a completely random action (explores)",
      "It sets all neural network weights to epsilon",
      "It runs epsilon parallel environments"
    ],
    "correctAnswer": 1,
    "explanation": "In ε-greedy: a coin flip with probability ε chooses a random action (exploration), while probability (1 - ε) picks `argmax Q(s, a)` (exploitation), often decaying ε gradually over training."
  },
  {
    "id": "aiml_rl_7",
    "topic": "Reinforcement Learning",
    "difficulty": "Medium",
    "question": "What is a Markov Decision Process (MDP) and what is the \"Markov Property\"?",
    "options": [
      "A process for encrypting model weights",
      "The Markov Property states that the future state depends strictly on the current state and action, independent of the past history of states (\"the future is independent of the past given the present\")",
      "A model for parallel processing",
      "A database query language"
    ],
    "correctAnswer": 1,
    "explanation": "An MDP formalizes RL environments. The Markov Property asserts `P(s_{t+1} | s_t, a_t, s_{t-1}, ... s_0) = P(s_{t+1} | s_t, a_t)`: the current state encapsulates all relevant history."
  },
  {
    "id": "aiml_rl_8",
    "topic": "Reinforcement Learning",
    "difficulty": "Medium",
    "question": "What is the Bellman Equation in Reinforcement Learning?",
    "options": [
      "An equation calculating gradient descent step size",
      "A recursive relationship expressing the value of a state (or state-action pair) as the immediate reward plus the discounted expected value of the successor state",
      "An equation calculating neural network training time",
      "An algorithm for matrix inversion"
    ],
    "correctAnswer": 1,
    "explanation": "Bellman Equation decomposes the value function into: `V(s) = R(s) + γ * ∑ P(s'|s,a) * V(s')`. It is the foundational recursive equation underlying dynamic programming and Q-learning."
  },
  {
    "id": "aiml_rl_9",
    "topic": "Reinforcement Learning",
    "difficulty": "Hard",
    "question": "What is Q-Learning and why is it classified as an \"Off-Policy, Model-Free\" algorithm?",
    "options": [
      "It requires a full physics simulation model of the environment",
      "Model-Free: it learns optimal action values directly from experience without needing an explicit transition probability model; Off-Policy: it learns the optimal policy Q* while following an exploratory policy (like ε-greedy)",
      "It only works with quadratic equations",
      "It cannot handle rewards greater than 1"
    ],
    "correctAnswer": 1,
    "explanation": "Model-Free means it doesn't model environment transition physics `P(s'|s,a)`. Off-policy means its update `Q(s,a) += α [r + γ max_a' Q(s',a') - Q(s,a)]` uses the greedy `max` action rather than the action actually taken."
  },
  {
    "id": "aiml_rl_10",
    "topic": "Reinforcement Learning",
    "difficulty": "Hard",
    "question": "What breakthrough did Deep Q-Networks (DQN - DeepMind 2015) introduce to stabilize Q-learning with deep neural networks?",
    "options": [
      "Replacing Python with assembly language",
      "Experience Replay (sampling random past transitions from a buffer to break temporal correlation) and a separate Target Network (updated periodically to stabilize Q-value targets)",
      "Eliminating all activation functions",
      "Using 1,000 GPUs simultaneously"
    ],
    "correctAnswer": 1,
    "explanation": "Standard Q-learning diverges with neural networks due to correlated samples and moving target values. DQN fixed this with: 1) Replay Buffer (decorrelates training data), and 2) Frozen Target Network (stabilizes Bellman targets)."
  },
  {
    "id": "aiml_ev_1",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Easy",
    "question": "What are the four components of a Binary Classification Confusion Matrix?",
    "options": [
      "Alpha, Beta, Gamma, Delta",
      "True Positives (TP), False Positives (FP), True Negatives (TN), and False Negatives (FN)",
      "Mean, Median, Mode, Variance",
      "Precision, Recall, F1, Loss"
    ],
    "correctAnswer": 1,
    "explanation": "The confusion matrix records: TP (correctly predicted positive), TN (correctly predicted negative), FP (Type I error - false alarm), and FN (Type II error - missed detection)."
  },
  {
    "id": "aiml_ev_2",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Easy",
    "question": "What is the formula for Classification Accuracy?",
    "options": [
      "(TP + FP) / (TN + FN)",
      "(TP + TN) / (TP + TN + FP + FN)",
      "TP / (TP + FP)",
      "TP / (TP + FN)"
    ],
    "correctAnswer": 1,
    "explanation": "Accuracy is the ratio of correct predictions to total cases: `(TP + TN) / Total`. It can be misleading in imbalanced datasets."
  },
  {
    "id": "aiml_ev_3",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Easy",
    "question": "What is the definition of \"Precision\" (Positive Predictive Value)?",
    "options": [
      "Out of all actual positive cases, how many were detected",
      "Out of all instances the model predicted as positive, what fraction was actually positive: TP / (TP + FP)",
      "The percentage of true negatives",
      "The total number of correct predictions"
    ],
    "correctAnswer": 1,
    "explanation": "Precision answers: \"When the model predicts positive, how often is it right?\" Formula: `TP / (TP + FP)`. Critical when False Positives are costly (e.g. spam detection)."
  },
  {
    "id": "aiml_ev_4",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Easy",
    "question": "What is the definition of \"Recall\" (Sensitivity / True Positive Rate)?",
    "options": [
      "Out of all instances predicted positive, how many were right",
      "Out of all actual ground-truth positive cases, what fraction was correctly identified: TP / (TP + FN)",
      "The fraction of false alarms",
      "The ratio of FP to TN"
    ],
    "correctAnswer": 1,
    "explanation": "Recall answers: \"Did the model catch all positive cases?\" Formula: `TP / (TP + FN)`. Critical when False Negatives are catastrophic (e.g. cancer diagnosis)."
  },
  {
    "id": "aiml_ev_5",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Medium",
    "question": "Why is Accuracy a misleading metric on severely imbalanced datasets (e.g. 99% negative, 1% fraudulent transactions)?",
    "options": [
      "Calculators cannot divide percentages",
      "A naive model that predicts \"Not Fraud\" for every single transaction achieves 99% accuracy while having a disastrous 0% recall on detecting real fraud",
      "Accuracy can only evaluate balanced datasets",
      "Accuracy cannot be computed on integers"
    ],
    "correctAnswer": 1,
    "explanation": "Accuracy Paradox: in highly skewed datasets, predicting the majority class exclusively produces deceptive near-100% accuracy while failing the core business objective."
  },
  {
    "id": "aiml_ev_6",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Medium",
    "question": "What is the F1-Score and why is it computed as the Harmonic Mean of Precision and Recall instead of Arithmetic Mean?",
    "options": [
      "It is the average of accuracy and loss",
      "F1-Score is `2 * (Precision * Recall) / (Precision + Recall)`; the harmonic mean penalizes extreme disparities heavily, ensuring a high score only if both precision and recall are strong",
      "Arithmetic mean cannot handle decimal numbers",
      "Harmonic mean runs faster on GPUs"
    ],
    "correctAnswer": 1,
    "explanation": "If a model has Precision=1.0 and Recall=0.0, the arithmetic mean is 0.5 (misleading), but the harmonic mean (F1) is 0.0, punishing models that sacrifice one metric completely."
  },
  {
    "id": "aiml_ev_7",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Medium",
    "question": "What does the ROC (Receiver Operating Characteristic) curve plot, and what does AUC (Area Under Curve) signify?",
    "options": [
      "Plots Accuracy vs Loss",
      "Plots True Positive Rate (Recall) vs False Positive Rate (1 - Specificity) across all classification thresholds; AUC measures discrimination capability (1.0 = perfect, 0.5 = random guess)",
      "Plots Training time vs Dataset size",
      "Plots Precision vs Learning rate"
    ],
    "correctAnswer": 1,
    "explanation": "The ROC curve illustrates diagnostic ability across all probability cutoffs. AUC-ROC quantifies the probability that the model ranks a random positive example higher than a random negative example."
  },
  {
    "id": "aiml_ev_8",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Medium",
    "question": "What is the difference between Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE) in regression?",
    "options": [
      "MAE is only for neural networks",
      "MAE averages absolute residuals equally; RMSE squares residuals before averaging and square-rooting, penalizing large outlier errors much more severely than MAE",
      "RMSE is always smaller than MAE",
      "MAE can be negative"
    ],
    "correctAnswer": 1,
    "explanation": "Because RMSE squares differences `(y - y_hat)^2`, large prediction errors disproportionately inflate RMSE, making it sensitive to outliers. MAE treats all linear error magnitudes uniformly."
  },
  {
    "id": "aiml_ev_9",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Hard",
    "question": "What does the Coefficient of Determination (R² Score) measure in regression?",
    "options": [
      "The correlation coefficient squared without meaning",
      "The proportion of variance in the dependent variable that is explained by the independent features in the model (1.0 = perfect prediction, 0.0 = baseline mean model, negative = worse than mean)",
      "The percentage of correct predictions",
      "The slope of the regression line"
    ],
    "correctAnswer": 1,
    "explanation": "`R² = 1 - (SS_res / SS_tot)`. An R² of 0.85 means 85% of target variability is explained by model inputs. A negative R² indicates the model performs worse than simply predicting the mean target value."
  },
  {
    "id": "aiml_ev_10",
    "topic": "Model Evaluation Metrics",
    "difficulty": "Hard",
    "question": "When should you evaluate models using Precision-Recall (PR) AUC instead of ROC-AUC?",
    "options": [
      "When features are continuous numbers",
      "When dealing with heavily imbalanced datasets where the positive minority class is rare, because ROC-AUC is artificially inflated by high True Negatives, whereas PR-AUC focuses on minority class performance",
      "When running on mobile devices",
      "When target variable is continuous"
    ],
    "correctAnswer": 1,
    "explanation": "In severe class imbalance (e.g. 1 positive in 10,000), huge TNs keep FPR tiny, producing an artificially optimistic ROC-AUC curve. The PR Curve ignores TNs, directly exposing precision drops on rare positives."
  },
  {
    "id": "aiml_bv_1",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Easy",
    "question": "What is \"Overfitting\" in machine learning?",
    "options": [
      "When the training algorithm takes too long to run",
      "When a model learns the training data and noise too closely, performing exceptionally well on training data but failing to generalize to unseen test data",
      "When a model has too few parameters to capture patterns",
      "When data points have missing values"
    ],
    "correctAnswer": 1,
    "explanation": "Overfitting happens when a model memorizes noise and idiosyncrasies in training data (high training accuracy, poor validation/test generalization)."
  },
  {
    "id": "aiml_bv_2",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Easy",
    "question": "What is \"Underfitting\"?",
    "options": [
      "When a model performs poorly on both training data and testing data because it is too simple to capture underlying data relationships",
      "When a model achieves 100% test accuracy",
      "When a dataset is stored in lowercase",
      "When training runs on too few CPU cores"
    ],
    "correctAnswer": 0,
    "explanation": "Underfitting occurs when a model lacks capacity (e.g. fitting a straight line to a complex sine wave), failing to learn underlying structures in both train and test sets."
  },
  {
    "id": "aiml_bv_3",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Easy",
    "question": "What is the Bias-Variance Tradeoff?",
    "options": [
      "Trading accuracy for training speed",
      "The tension where simple models have high bias (underfitting) and low variance, while complex models have low bias and high variance (overfitting); total error is minimized at an optimal intermediate complexity",
      "Trading cloud costs for RAM",
      "Balancing dataset size with image resolution"
    ],
    "correctAnswer": 1,
    "explanation": "Expected prediction error decomposes into: `Bias^2 + Variance + Irreducible Error`. Reducing bias typically increases variance and vice versa; machine learning seeks the sweet spot minimizing combined error."
  },
  {
    "id": "aiml_bv_4",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Easy",
    "question": "What is K-Fold Cross-Validation?",
    "options": [
      "Multiplying dataset size by K",
      "Splitting dataset into K equal folds, training on K-1 folds and validating on the remaining fold, repeating K times so every sample is used for validation exactly once",
      "Running K neural networks at once",
      "Deleting K corrupted rows"
    ],
    "correctAnswer": 1,
    "explanation": "K-Fold cross-validation provides an unbiased estimate of model generalization performance across the entire dataset without wasting data on a single fixed train/test split."
  },
  {
    "id": "aiml_bv_5",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Medium",
    "question": "Which of the following techniques helps reduce Overfitting in machine learning models?",
    "options": [
      "Adding more complex polynomial features",
      "Regularization (L1/L2), pruning decision trees, dropout in neural networks, and acquiring more training data",
      "Removing validation datasets",
      "Increasing training epochs to infinity"
    ],
    "correctAnswer": 1,
    "explanation": "Overfitting remedies: simplify model architecture, apply regularization penalties, apply dropout, prune trees, use early stopping, and augment or collect more training samples."
  },
  {
    "id": "aiml_bv_6",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Medium",
    "question": "What is \"Data Leakage\" and why is it dangerous?",
    "options": [
      "Hard drives leaking oil",
      "When information from outside the training dataset (such as target labels or test-set statistics) inadvertently influences model training, yielding unrealistically optimistic test scores that fail in production",
      "Data leaking onto the internet",
      "A memory leak in Python"
    ],
    "correctAnswer": 1,
    "explanation": "Data leakage occurs when target-correlated information or test set distributions (e.g. scaling features using the full dataset mean before train/test splitting) bleed into training."
  },
  {
    "id": "aiml_bv_7",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Medium",
    "question": "What is \"Stratified K-Fold\" cross-validation and when is it required?",
    "options": [
      "Cross-validation on rock layers",
      "A variation of K-Fold where each fold preserves the exact percentage/proportion of each target class as present in the complete dataset, essential for imbalanced classification",
      "K-Fold with continuous targets only",
      "Cross-validation running on multiple servers"
    ],
    "correctAnswer": 1,
    "explanation": "Stratified K-Fold guarantees that rare minority classes (e.g. 2% positive cases) are distributed proportionally across all K folds, preventing folds with zero positive instances."
  },
  {
    "id": "aiml_bv_8",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Medium",
    "question": "What does a high training loss and a high validation loss indicate about a model?",
    "options": [
      "High Variance (Overfitting)",
      "High Bias (Underfitting)",
      "Optimal generalized model",
      "Data Leakage"
    ],
    "correctAnswer": 1,
    "explanation": "When both training and validation losses remain stubbornly high, the model lacks representational capacity to fit the underlying data patterns (High Bias / Underfitting)."
  },
  {
    "id": "aiml_bv_9",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Hard",
    "question": "What does a low training loss accompanied by a rapidly diverging high validation loss indicate on a learning curve?",
    "options": [
      "The model is underfitting",
      "The model is overfitting: it is continuing to memorize training set noise while losing generalization capability on unseen data",
      "The learning rate is too small",
      "The model has converged to global optimum"
    ],
    "correctAnswer": 1,
    "explanation": "Divergence between train and validation loss curves is the textbook symptom of overfitting: the network continues to drive training loss toward zero by memorizing training examples, while validation error climbs."
  },
  {
    "id": "aiml_bv_10",
    "topic": "Bias-Variance & Overfitting",
    "difficulty": "Hard",
    "question": "What is the \"Double Descent\" phenomenon discovered in modern deep neural networks?",
    "options": [
      "Loss dropping twice in one epoch",
      "As model capacity increases beyond the classical interpolation threshold (where training error reaches zero), test error surprisingly decreases again instead of worsening, defying traditional bias-variance intuition",
      "A bug in gradient descent",
      "When two GPUs train simultaneously"
    ],
    "correctAnswer": 1,
    "explanation": "Modern overparameterized deep networks exhibit Double Descent: test error peaks at the interpolation threshold (classical overfitting) but subsequently descends as capacity expands further, due to implicit regularization of gradient descent."
  },
  {
    "id": "aiml_reg_1",
    "topic": "Regularization Techniques",
    "difficulty": "Easy",
    "question": "What is the primary purpose of Regularization in machine learning?",
    "options": [
      "To make algorithms run faster",
      "To penalize model complexity and prevent overfitting by discouraging excessively large weight values",
      "To clean null values in datasets",
      "To convert regression to classification"
    ],
    "correctAnswer": 1,
    "explanation": "Regularization adds a penalty term to the loss function based on model parameters, discouraging complex or extreme weights to encourage simpler, generalized models."
  },
  {
    "id": "aiml_reg_2",
    "topic": "Regularization Techniques",
    "difficulty": "Easy",
    "question": "What penalty does L1 Regularization (Lasso) add to the loss function?",
    "options": [
      "Sum of squared weights (∑ w_i^2)",
      "Sum of the absolute values of weights: λ * ∑ |w_i|",
      "Product of weights",
      "Sum of square roots of weights"
    ],
    "correctAnswer": 1,
    "explanation": "L1 (Lasso) adds the sum of absolute values of weights `λ * ∑|w_i|` to the cost function, driving non-essential feature weights strictly to zero."
  },
  {
    "id": "aiml_reg_3",
    "topic": "Regularization Techniques",
    "difficulty": "Easy",
    "question": "What penalty does L2 Regularization (Ridge / Weight Decay) add to the loss function?",
    "options": [
      "Sum of absolute values of weights",
      "Sum of squared values of weights: (λ/2) * ∑ w_i^2",
      "Maximum weight value",
      "Inverse of weights"
    ],
    "correctAnswer": 1,
    "explanation": "L2 (Ridge) adds the sum of squared weights `(λ/2) * ∑ w_i^2` to the loss, shrinking weights smoothly toward zero without setting them exactly to zero."
  },
  {
    "id": "aiml_reg_4",
    "topic": "Regularization Techniques",
    "difficulty": "Easy",
    "question": "What unique property makes L1 Regularization (Lasso) useful for Feature Selection?",
    "options": [
      "It creates new polynomial features",
      "It drives less important feature weights exactly to zero, producing sparse models where unneeded features are completely eliminated",
      "It doubles the learning rate",
      "It groups features into K clusters"
    ],
    "correctAnswer": 1,
    "explanation": "Due to its geometric diamond-shaped constraint boundaries, L1 induces sparsity: coefficients for irrelevant features are driven to absolute zero, acting as automated feature selection."
  },
  {
    "id": "aiml_reg_5",
    "topic": "Regularization Techniques",
    "difficulty": "Medium",
    "question": "What is \"Elastic Net\" regularization?",
    "options": [
      "A neural network that stretches with data",
      "A linear combination of both L1 (Lasso) and L2 (Ridge) penalties, balancing feature selection with stability for correlated features",
      "A regularizer for elastic databases",
      "A deep learning activation function"
    ],
    "correctAnswer": 1,
    "explanation": "Elastic Net combines L1 and L2 penalties: `Loss + λ1 * ∑|w| + λ2 * ∑w^2`. It overcomes Lasso's limitation of picking only one arbitrary feature among highly correlated variables."
  },
  {
    "id": "aiml_reg_6",
    "topic": "Regularization Techniques",
    "difficulty": "Medium",
    "question": "How does \"Dropout\" regularize Deep Neural Networks during training?",
    "options": [
      "By dropping corrupted data rows",
      "By randomly setting a fraction `p` of neuron activations to zero during each forward training pass, forcing the network to learn robust redundant representations without co-adapting",
      "By dropping slow GPU threads",
      "By deleting layers from the network"
    ],
    "correctAnswer": 1,
    "explanation": "Proposed by Hinton, Dropout randomly deactivates neurons during training with probability `p`. This prevents neurons from co-adapting, functioning like an ensemble of thinned sub-networks."
  },
  {
    "id": "aiml_reg_7",
    "topic": "Regularization Techniques",
    "difficulty": "Medium",
    "question": "What must be done to Dropout layers during model Inference / Testing?",
    "options": [
      "Keep dropout active with 50% probability",
      "Deactivate Dropout (all neurons active) and scale weights/outputs by (1 - p) (or use Inverted Dropout during training so no scaling is needed at test time)",
      "Delete the dropout layer from memory",
      "Set all weights to zero"
    ],
    "correctAnswer": 1,
    "explanation": "At test time, dropout is turned OFF to utilize the full deterministic network. Modern frameworks implement Inverted Dropout during training (scaling by `1/(1-p)`) so test-time inference requires zero adjustments."
  },
  {
    "id": "aiml_reg_8",
    "topic": "Regularization Techniques",
    "difficulty": "Medium",
    "question": "What is \"Early Stopping\" in neural network training?",
    "options": [
      "Stopping training when the developer wants lunch",
      "Monitoring validation loss after each epoch and halting training when validation loss stops improving for a specified patience window, preventing the model from overfitting",
      "Halting training after 1 epoch",
      "Terminating when loss reaches exactly 0"
    ],
    "correctAnswer": 1,
    "explanation": "Early stopping acts as a regularizer: it saves the model checkpoint with the lowest validation loss and terminates training when validation loss degrades over `N` consecutive epochs."
  },
  {
    "id": "aiml_reg_9",
    "topic": "Regularization Techniques",
    "difficulty": "Hard",
    "question": "How does \"Data Augmentation\" (e.g. image flips, crops, color jittering) act as a regularizer?",
    "options": [
      "By shrinking the neural network layers",
      "By artificially expanding the training dataset with label-preserving randomized transformations, exposing the network to diverse variations and reducing its ability to memorize exact training instances",
      "By deleting blurry images",
      "By converting images to grayscale"
    ],
    "correctAnswer": 1,
    "explanation": "Data augmentation injects realistic domain variations directly into inputs, effectively broadening the training distribution so the network cannot memorize individual pixels, curbing overfitting."
  },
  {
    "id": "aiml_reg_10",
    "topic": "Regularization Techniques",
    "difficulty": "Hard",
    "question": "Why does Batch Normalization exhibit an implicit regularizing effect on deep neural networks?",
    "options": [
      "It adds L1 penalty to weights",
      "Because mini-batch statistics (mean and variance) fluctuate randomly between batches, this stochastic noise added to activations acts similarly to dropout, reducing overfitting",
      "It eliminates all learning rates",
      "It zeroes out small weights"
    ],
    "correctAnswer": 1,
    "explanation": "Batch Normalization computes mean and variance over stochastic mini-batches rather than the whole dataset. The small random noise introduced into hidden activations prevents extreme reliance on any single neuron."
  },
  {
    "id": "aiml_nn_1",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Easy",
    "question": "What was the historical \"Perceptron\" introduced by Frank Rosenblatt?",
    "options": [
      "A digital camera",
      "The simplest artificial neuron model: computes a linear combination of inputs with weights, adds a bias, and passes the sum through a step activation function",
      "A multi-layer recurrent network",
      "An analog computer monitor"
    ],
    "correctAnswer": 1,
    "explanation": "The Perceptron computes `f(x) = step(w^T * x + b)`. It can separate linearly separable classes (AND, OR) but famously failed on non-linear problems like XOR."
  },
  {
    "id": "aiml_nn_2",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Easy",
    "question": "Why did the single-layer Perceptron famously fail to solve the XOR (Exclusive OR) problem (Minsky & Papert 1969)?",
    "options": [
      "Because XOR produces letters instead of numbers",
      "Because XOR is not linearly separable (its truth table cannot be separated by a single straight line in 2D space), requiring multi-layer networks with non-linear activations",
      "Because computers were too slow",
      "Because Perceptrons cannot handle zeros"
    ],
    "correctAnswer": 1,
    "explanation": "XOR outputs 1 for (0,1) and (1,0), and 0 for (0,0) and (1,1). No single linear decision boundary can separate these points, exposing the limitation of single-layer perceptrons."
  },
  {
    "id": "aiml_nn_3",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Easy",
    "question": "What is the formula for the ReLU (Rectified Linear Unit) activation function?",
    "options": [
      "f(x) = 1 / (1 + e^-x)",
      "f(x) = max(0, x)",
      "f(x) = tanh(x)",
      "f(x) = x^2"
    ],
    "correctAnswer": 1,
    "explanation": "ReLU is defined as `f(x) = max(0, x)`: it outputs x for positive values and 0 for negative values. It is computationally fast and mitigates vanishing gradients."
  },
  {
    "id": "aiml_nn_4",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Easy",
    "question": "What is \"Forward Propagation\" in a neural network?",
    "options": [
      "Passing gradients backwards from output to input",
      "Passing input data forward through successive layers (linear transformations + non-linear activations) to compute final network predictions",
      "Moving weights between CPU cores",
      "Saving weights to disk"
    ],
    "correctAnswer": 1,
    "explanation": "Forward propagation feeds inputs through successive hidden layers `z = Wx + b; a = σ(z)` until the output layer computes final predictions and the loss function evaluates error against ground truth."
  },
  {
    "id": "aiml_nn_5",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Medium",
    "question": "What is \"Backpropagation\" and what mathematical rule is its foundation?",
    "options": [
      "Multiplying matrices randomly",
      "An algorithm that computes the gradient of the loss function with respect to every weight in the network by applying the calculus Chain Rule backwards from the output layer to input layer",
      "Solving linear equations with Gaussian elimination",
      "Inverting the weight matrix"
    ],
    "correctAnswer": 1,
    "explanation": "Backpropagation applies the calculus Chain Rule repeatedly backwards through layers: `∂L/∂W = (∂L/∂a) * (∂a/∂z) * (∂z/∂W)`, efficiently propagating error gradients to update weights via gradient descent."
  },
  {
    "id": "aiml_nn_6",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Medium",
    "question": "What is the \"Vanishing Gradient Problem\" in deep networks using Sigmoid or Tanh activations?",
    "options": [
      "Gradients becoming larger than infinity",
      "The derivatives of Sigmoid/Tanh saturate near 0 for large positive or negative inputs; multiplying these small fractions across deep layers causes gradients to shrink exponentially toward zero, halting learning in early layers",
      "Gradients disappearing from RAM",
      "Loss function becoming negative"
    ],
    "correctAnswer": 1,
    "explanation": "Sigmoid's maximum derivative is 0.25. In deep networks, multiplying numbers <= 0.25 across 10 layers shrinks gradients to virtually zero (`0.25^10 ≈ 10^-6`), preventing early layers from updating weights."
  },
  {
    "id": "aiml_nn_7",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Medium",
    "question": "What is the \"Dying ReLU\" problem and how do Leaky ReLU or ELU fix it?",
    "options": [
      "ReLU neurons overheating the GPU",
      "If a large gradient updates weights such that a neuron outputs negative values for all inputs, its gradient becomes permanently 0, rendering the neuron permanently inactive (\"dead\"); Leaky ReLU provides a small slope (e.g. 0.01x) for negative inputs",
      "ReLU deleting training data",
      "Neurons losing memory"
    ],
    "correctAnswer": 1,
    "explanation": "When a ReLU neuron gets stuck in the negative regime, its derivative is always 0, so it never updates again. Leaky ReLU `f(x) = max(0.01x, x)` provides a slight gradient for negative values, reviving dead neurons."
  },
  {
    "id": "aiml_nn_8",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Medium",
    "question": "What does the Softmax activation function do in the final layer of a multi-class neural network?",
    "options": [
      "Converts numbers to integers",
      "Converts an unnormalized vector of real-valued logits into a probability distribution where each value is between 0 and 1 and all values sum up to exactly 1.0",
      "Applies L2 regularization",
      "Sorts predictions in ascending order"
    ],
    "correctAnswer": 1,
    "explanation": "Softmax computes `e^(z_i) / ∑ e^(z_j)`. It normalizes raw logit outputs into mutually exclusive probabilities across all candidate classes that sum to 1.0."
  },
  {
    "id": "aiml_nn_9",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Hard",
    "question": "Why must neural network weights be initialized randomly (e.g. Xavier/Glorot or He Initialization) rather than initializing all weights to zero?",
    "options": [
      "Zero initialization crashes the computer power supply",
      "If all weights start at zero, all neurons in a layer compute identical outputs and receive identical gradients during backpropagation (symmetry), failing to learn distinct features",
      "Zero weights cause division by zero in loss",
      "Weights must always be positive numbers"
    ],
    "correctAnswer": 1,
    "explanation": "Zero initialization causes \"Symmetry\": every hidden unit computes the exact same activation and receives identical weight updates, functioning as a single neuron regardless of layer width. Random initialization breaks symmetry."
  },
  {
    "id": "aiml_nn_10",
    "topic": "Neural Networks Fundamentals",
    "difficulty": "Hard",
    "question": "What is the difference between Xavier (Glorot) Initialization and He (Kaiming) Initialization?",
    "options": [
      "Xavier is for GPUs; He is for CPUs",
      "Xavier is designed for symmetric activations like Tanh/Sigmoid (variance = 2 / (n_in + n_out)); He initialization is specifically calibrated for non-linear ReLU activations (variance = 2 / n_in) to prevent exploding/vanishing signal variance",
      "Xavier initializes weights to zero; He does not",
      "They are exact synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "Kaiming He showed that because ReLU zeroes out half of the activations on average, Xavier variance is too small, causing signal decay in deep ReLU networks. He initialization doubles the variance to `2 / n_in`."
  },
  {
    "id": "aiml_opt_1",
    "topic": "Optimization Algorithms",
    "difficulty": "Easy",
    "question": "What is the role of an Optimizer in training machine learning and deep learning models?",
    "options": [
      "To compile Python code to machine code",
      "To iteratively adjust and update model weights and biases in the direction that minimizes the loss function",
      "To clean corrupted rows in CSV files",
      "To design the user interface"
    ],
    "correctAnswer": 1,
    "explanation": "Optimizers (SGD, Adam) use gradients calculated during backpropagation to update parameters: `W_new = W_old - learning_rate * ∇Loss`."
  },
  {
    "id": "aiml_opt_2",
    "topic": "Optimization Algorithms",
    "difficulty": "Easy",
    "question": "What happens if the Learning Rate (α) is set too high versus too low?",
    "options": [
      "Too high runs on CPU; too low runs on GPU",
      "Too high causes oscillations and can diverge away from the minimum; too low results in agonizingly slow training progress and getting trapped in sub-optimal local minima",
      "Too high causes underfitting; too low causes overfitting",
      "Learning rate does not affect training"
    ],
    "correctAnswer": 1,
    "explanation": "An excessively large learning rate overshoots the minimum and diverges. An overly small learning rate crawls slowly, risking training stagnation or timeout."
  },
  {
    "id": "aiml_opt_3",
    "topic": "Optimization Algorithms",
    "difficulty": "Easy",
    "question": "What is the difference between Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-Batch Gradient Descent?",
    "options": [
      "They use different programming languages",
      "Batch uses the entire dataset per update (slow, smooth); SGD uses 1 sample per update (fast, noisy); Mini-batch uses small subsets (e.g. 32-256 samples), balancing speed and stable vectorization",
      "Mini-batch uses no gradients",
      "SGD only works on linear regression"
    ],
    "correctAnswer": 1,
    "explanation": "Batch GD computes gradients across all N samples (memory intensive). Pure SGD updates weights per individual sample (high variance). Mini-Batch GD evaluates batches (32-512) leveraging GPU parallel SIMD matrix acceleration."
  },
  {
    "id": "aiml_opt_4",
    "topic": "Optimization Algorithms",
    "difficulty": "Easy",
    "question": "What does \"Momentum\" do in Gradient Descent optimization?",
    "options": [
      "Increases the computer fan speed",
      "Accelerates gradient vectors in the relevant direction and dampens oscillations by adding a fraction of the previous step's velocity vector to the current update",
      "Stops training when loss is 0",
      "Multiplies weights by 2"
    ],
    "correctAnswer": 1,
    "explanation": "Momentum mimics a heavy ball rolling down a hill: `v_t = β * v_{t-1} + α * ∇L`. It accumulates speed along consistent downhill gradients while cancelling out lateral oscillations in ravines."
  },
  {
    "id": "aiml_opt_5",
    "topic": "Optimization Algorithms",
    "difficulty": "Medium",
    "question": "What is the Adam (Adaptive Moment Estimation) optimizer and why is it so widely used?",
    "options": [
      "An AI created by OpenAI",
      "An adaptive optimization algorithm that combines the advantages of Momentum (exponential moving average of past gradients) and RMSprop (adaptive learning rates per parameter based on squared gradients)",
      "A loss function for images",
      "An activation function replacing ReLU"
    ],
    "correctAnswer": 1,
    "explanation": "Adam computes individual adaptive learning rates for each parameter by tracking both first moments (mean / momentum) and second moments (uncentered variance / RMSprop), providing robust convergence across deep learning tasks."
  },
  {
    "id": "aiml_opt_6",
    "topic": "Optimization Algorithms",
    "difficulty": "Medium",
    "question": "What is \"Learning Rate Scheduling\" (e.g. Cosine Annealing, Step Decay)?",
    "options": [
      "Setting the alarm clock for training sessions",
      "Dynamically decreasing the learning rate over the course of training according to a schedule, allowing fast initial progress followed by fine-grained convergence near the loss minimum",
      "Increasing learning rate to infinity",
      "Scheduling jobs in Kubernetes"
    ],
    "correctAnswer": 1,
    "explanation": "Starting with a higher learning rate navigates broad loss valleys quickly. Annealing the learning rate down over time enables the optimizer to settle into narrow, sharp minima without overshooting."
  },
  {
    "id": "aiml_opt_7",
    "topic": "Optimization Algorithms",
    "difficulty": "Medium",
    "question": "What is \"Weight Decay\" in AdamW versus traditional L2 regularization in standard Adam?",
    "options": [
      "Decomposition of hard drives",
      "In AdamW, weight decay is decoupled from the gradient updates and subtracted directly from weights, fixing an issue in standard Adam where L2 regularization was warped by adaptive momentum scalers",
      "Weight decay deletes 10% of weights",
      "AdamW is an older version of Adam"
    ],
    "correctAnswer": 1,
    "explanation": "Loshchilov & Hutter showed that in standard Adam, L2 penalty interacts incorrectly with adaptive gradient scaling. AdamW decouples weight decay, providing true L2 regularization and superior generalization in Transformers."
  },
  {
    "id": "aiml_opt_8",
    "topic": "Optimization Algorithms",
    "difficulty": "Medium",
    "question": "What is \"Gradient Clipping\" and what problem does it solve?",
    "options": [
      "Cropping pictures in computer vision",
      "Clamping gradients to a maximum threshold (norm or value) when they exceed a limit, preventing \"Exploding Gradients\" from destabilizing deep networks (especially RNNs)",
      "Deleting small weights",
      "Stopping training after 10 epochs"
    ],
    "correctAnswer": 1,
    "explanation": "When backpropagating through deep unrolled networks or RNNs, gradients can multiply exponentially into NaNs (Exploding Gradients). Gradient clipping rescales gradients if `||g|| > threshold`, preserving direction while capping magnitude."
  },
  {
    "id": "aiml_opt_9",
    "topic": "Optimization Algorithms",
    "difficulty": "Hard",
    "question": "Why are \"Saddle Points\" a bigger challenge than local minima in high-dimensional loss landscapes of deep neural networks?",
    "options": [
      "Saddle points do not exist in math",
      "In thousands of dimensions, true local minima (where all eigenvalues are positive) are exceedingly rare; saddle points (where gradients are zero but some directions slope up and others slope down) are ubiquitous and slow down standard optimizers",
      "Saddle points cause GPU memory leaks",
      "Saddle points have infinite slope"
    ],
    "correctAnswer": 1,
    "explanation": "In high dimensions, the probability of all orthogonal directions curving upwards simultaneously is vanishingly small. Instead, zero-gradient saddle points dominate, causing standard gradient descent to stall unless momentum/noise escapes them."
  },
  {
    "id": "aiml_opt_10",
    "topic": "Optimization Algorithms",
    "difficulty": "Hard",
    "question": "What is the role of a \"Learning Rate Warmup\" phase in modern Transformer training?",
    "options": [
      "Warming up the physical GPU chips with electric current",
      "Starting with a very small learning rate and ramping it up linearly over the first few thousand steps before decaying, preventing unstable early gradients from destabilizing uninitialized layer norms and attention weights",
      "Running unit tests before training",
      "Checking dataset integrity"
    ],
    "correctAnswer": 1,
    "explanation": "In early training, weights are random and gradients are noisy. A large initial step can prematurely push weights into poor landscape regions. Warmup gives the adaptive optimizer time to calibrate statistics before taking large steps."
  },
  {
    "id": "aiml_cnn_1",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Easy",
    "question": "Why are standard Multi-Layer Perceptrons (MLPs) unsuitable for processing high-resolution images compared to CNNs?",
    "options": [
      "MLPs cannot multiply numbers",
      "MLPs treat every pixel as an independent feature with full connectivity, causing an astronomical explosion of parameters and completely ignoring 2D spatial locality",
      "MLPs can only process black and white images",
      "MLPs require quantum processors"
    ],
    "correctAnswer": 1,
    "explanation": "A 1000x1000 RGB image has 3 million inputs. Connecting to a hidden layer of 1,000 neurons requires 3 billion weights in an MLP. CNNs solve this via local receptive fields, weight sharing, and spatial translation equivariance."
  },
  {
    "id": "aiml_cnn_2",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Easy",
    "question": "What does a Convolutional Kernel (Filter) do when sliding across an input feature map?",
    "options": [
      "Deletes every second pixel",
      "Computes element-wise dot products between the filter weights and the overlapping local input patch, summing them up with a bias to produce a 2D activation feature map",
      "Compresses the image into a JPEG",
      "Resizes the image to 32x32"
    ],
    "correctAnswer": 1,
    "explanation": "A convolution slides a small matrix of learnable weights (e.g. 3x3) across the image, computing dot products to detect specific visual features (edges, textures) anywhere in the input."
  },
  {
    "id": "aiml_cnn_3",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Easy",
    "question": "What is the primary function of a \"Pooling Layer\" (e.g. Max Pooling) in a CNN?",
    "options": [
      "To normalize RGB values to 1.0",
      "To downsample spatial dimensions (height and width), reducing computational parameters and providing slight spatial translation invariance",
      "To increase image resolution",
      "To connect to the database"
    ],
    "correctAnswer": 1,
    "explanation": "Pooling layers (e.g. 2x2 Max Pooling with stride 2) halve height and width, extracting dominant features while reducing feature map dimensions and preventing overfitting."
  },
  {
    "id": "aiml_cnn_4",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Easy",
    "question": "What is the difference between \"Valid Padding\" and \"Same Padding\" in convolutional operations?",
    "options": [
      "Valid padding is for photos; same padding is for text",
      "Valid padding applies zero padding (output shrinks); Same padding pads the input border with zeros so that the output spatial dimensions match the input dimensions",
      "Same padding deletes the border pixels",
      "They are exact synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "Valid padding adds no padding: `Output = (Input - Filter + 1) / Stride`. Same padding adds enough zero-padding along borders so the spatial output size matches the input size."
  },
  {
    "id": "aiml_cnn_5",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Medium",
    "question": "What architectural innovation did ResNet (Deep Residual Learning - 2015) introduce to train networks over 100 layers deep?",
    "options": [
      "Using 8K resolution images",
      "Skip / Residual Connections (identity shortcuts that add the input `x` directly to the residual mapping `F(x) + x`), allowing gradients to flow unimpeded directly through deep layers during backpropagation",
      "Removing all activation functions",
      "Replacing GPUs with TPUs"
    ],
    "correctAnswer": 1,
    "explanation": "He et al. introduced Skip Connections: instead of forcing layers to learn `H(x)`, they learn residual `F(x) = H(x) - x`. If layers are redundant, weights easily decay to 0 while identity `x` passes through without vanishing gradients."
  },
  {
    "id": "aiml_cnn_6",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Medium",
    "question": "What is the difference between Object Detection and Semantic Segmentation in computer vision?",
    "options": [
      "Object detection is for video; segmentation is for audio",
      "Object Detection predicts bounding boxes and class labels for individual objects; Semantic Segmentation classifies every individual pixel in the image into a semantic class category",
      "Semantic segmentation does not use deep learning",
      "Object detection operates in 3D only"
    ],
    "correctAnswer": 1,
    "explanation": "Object detection identifies \"where\" and \"what\" via rectangular bounding boxes (e.g. YOLO). Semantic segmentation predicts pixel-level class masks (e.g. U-Net, labeling every road or sky pixel)."
  },
  {
    "id": "aiml_cnn_7",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Medium",
    "question": "What does \"Translation Invariance\" mean in CNN feature extraction?",
    "options": [
      "The ability to translate text from English to French",
      "The property where a feature detector activates identically whether a cat appears in the top-left, center, or bottom-right corner of the image",
      "The image does not change file size",
      "The camera does not move"
    ],
    "correctAnswer": 1,
    "explanation": "Because convolution weights are shared across all spatial positions, a filter trained to detect an eye or wheel will detect it anywhere it appears in the visual field."
  },
  {
    "id": "aiml_cnn_8",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Medium",
    "question": "What is \"Transfer Learning\" in Computer Vision (e.g. using ImageNet pre-trained models)?",
    "options": [
      "Transferring model weights via USB drive",
      "Taking a deep network pre-trained on a massive dataset (like ImageNet with 1.4M images) and fine-tuning its learned feature representations on a smaller specialized target dataset",
      "Moving code from PyTorch to TensorFlow",
      "Transferring images between cloud buckets"
    ],
    "correctAnswer": 1,
    "explanation": "Early layers of deep CNNs learn universal visual primitives (edges, textures, shapes). Reusing these pre-trained weights allows training high-accuracy vision models with only hundreds of domain images."
  },
  {
    "id": "aiml_cnn_9",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Hard",
    "question": "What is a \"1x1 Convolution\" (Network in Network / Inception) used for?",
    "options": [
      "It is a pointless operation that does nothing",
      "Cross-channel pooling and dimensionality reduction: it reduces or expands the number of feature channels (depth) without altering spatial height and width, drastically cutting compute",
      "Detecting 1-pixel errors",
      "Replacing all 3x3 filters"
    ],
    "correctAnswer": 1,
    "explanation": "A 1x1 convolution computes linear combinations across all channels at each spatial pixel location, allowing networks to compress 256 channels down to 64 channels before expensive 3x3 or 5x5 spatial convolutions."
  },
  {
    "id": "aiml_cnn_10",
    "topic": "CNNs & Computer Vision",
    "difficulty": "Hard",
    "question": "What is the core breakthrough of the YOLO (You Only Look Once) object detection architecture compared to two-stage detectors (like Faster R-CNN)?",
    "options": [
      "YOLO uses decision trees instead of neural networks",
      "YOLO reframes object detection as a single regression problem from image pixels directly to bounding box coordinates and class probabilities in a single forward pass, achieving real-time 60+ FPS speeds",
      "YOLO looks at images twice",
      "Faster R-CNN has zero latency"
    ],
    "correctAnswer": 1,
    "explanation": "Two-stage detectors generate region proposals first, then classify each. YOLO divides the image into a grid and predicts all bounding boxes and class probabilities simultaneously in one single forward inference pass."
  },
  {
    "id": "aiml_rnn_1",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Easy",
    "question": "What is the primary distinguishing characteristic of Recurrent Neural Networks (RNNs)?",
    "options": [
      "They only process image pixels",
      "They maintain an internal hidden state (memory) that loops back into the network, allowing information to persist across sequential input steps over time",
      "They have no weights or biases",
      "They only run backwards"
    ],
    "correctAnswer": 1,
    "explanation": "RNNs are designed for sequential data (time series, text, audio). The hidden state `h_t = f(W_hh * h_{t-1} + W_xh * x_t)` acts as memory carrying context from previous steps."
  },
  {
    "id": "aiml_rnn_2",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Easy",
    "question": "Why do Vanilla RNNs struggle with capturing long-term dependencies in long text sequences?",
    "options": [
      "Because computers run out of clock cycles",
      "Due to vanishing and exploding gradients when backpropagating through time (BPTT) over dozens of sequential steps, causing gradients from early tokens to vanish completely",
      "Because RNNs cannot read words",
      "Because text has too many letters"
    ],
    "correctAnswer": 1,
    "explanation": "Backpropagation Through Time (BPTT) repeatedly multiplies the recurrent weight matrix `W_hh`. If its eigenvalues are < 1, gradients decay exponentially to 0, leaving the network blind to distant historical context."
  },
  {
    "id": "aiml_rnn_3",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Easy",
    "question": "What does LSTM stand for and who designed it to solve vanishing gradients?",
    "options": [
      "Linear State Transmission Module",
      "Long Short-Term Memory, designed by Hochreiter & Schmidhuber (1997)",
      "Low Speed Translation Machine",
      "Logical Sequence Transformer Model"
    ],
    "correctAnswer": 1,
    "explanation": "LSTM (Long Short-Term Memory) introduced gated memory cells and an additive constant error carousel to overcome the vanishing gradient problem in sequence modeling."
  },
  {
    "id": "aiml_rnn_4",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Easy",
    "question": "What are the three core Gates in a standard LSTM cell?",
    "options": [
      "Start Gate, Pause Gate, End Gate",
      "Forget Gate, Input Gate, and Output Gate",
      "AND Gate, OR Gate, NOT Gate",
      "Alpha Gate, Beta Gate, Delta Gate"
    ],
    "correctAnswer": 1,
    "explanation": "An LSTM cell controls information flow using: 1) Forget Gate (what to discard from cell state), 2) Input Gate (what new info to store in cell state), and 3) Output Gate (what to output to hidden state)."
  },
  {
    "id": "aiml_rnn_5",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Medium",
    "question": "What is the \"Cell State\" (C_t) in an LSTM often described as?",
    "options": [
      "A temporary scratchpad that resets on each token",
      "The memory conveyor belt that runs straight down the entire chain with only minor linear interactions, allowing gradients to flow over long sequences without vanishing",
      "An external hard drive connection",
      "The final output classification probability"
    ],
    "correctAnswer": 1,
    "explanation": "The cell state acts as an internal highway: information flows down the chain with purely additive modifications, enabling error gradients to backpropagate across hundreds of time steps without decaying."
  },
  {
    "id": "aiml_rnn_6",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Medium",
    "question": "How does a GRU (Gated Recurrent Unit) simplify the LSTM architecture?",
    "options": [
      "By removing all gates",
      "By merging the Cell State and Hidden State, and replacing the 3 gates with 2 gates: Reset Gate and Update Gate, reducing parameters and computational cost while achieving comparable performance",
      "By using only feedforward layers",
      "By running without non-linear activations"
    ],
    "correctAnswer": 1,
    "explanation": "Introduced by Cho et al., the GRU eliminates the separate cell state, combining forget and input gates into a single Update Gate, yielding faster training with fewer parameters than LSTM."
  },
  {
    "id": "aiml_rnn_7",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Medium",
    "question": "What is a \"Bidirectional RNN\" (BiRNN)?",
    "options": [
      "An RNN that trains during both day and night",
      "A network combining two independent RNN layers: one processing the sequence forward from start to end, and another processing backward from end to start, capturing both past and future context for each token",
      "An RNN running on two GPUs",
      "An RNN that predicts two words at once"
    ],
    "correctAnswer": 1,
    "explanation": "In tasks like translation or Named Entity Recognition, context from both preceding and succeeding words matters. A BiRNN concatenates forward hidden state `h_forward` and backward hidden state `h_backward`."
  },
  {
    "id": "aiml_rnn_8",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Medium",
    "question": "What is \"Teacher Forcing\" in training recurrent sequence-to-sequence models?",
    "options": [
      "Hiring an external human teacher to grade models",
      "Feeding the ground-truth target token from the training dataset as the input to the decoder at step `t+1`, rather than feeding the model's own generated prediction from step `t`",
      "Forcing the learning rate to stay constant",
      "Stopping training when the loss reaches 0"
    ],
    "correctAnswer": 1,
    "explanation": "Teacher forcing stabilizes and accelerates decoder training: instead of compounding early prediction mistakes down the chain, the ground-truth sequence is fed directly to guide next-token predictions."
  },
  {
    "id": "aiml_rnn_9",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Hard",
    "question": "What was the primary architectural bottleneck of the traditional Seq2Seq Encoder-Decoder model before the Attention mechanism?",
    "options": [
      "The encoder was too slow to run on GPUs",
      "The entire variable-length input sequence was compressed into a single fixed-size context vector, creating an information bottleneck where details of long sentences were lost",
      "The decoder could only output numbers",
      "The model could not handle nouns"
    ],
    "correctAnswer": 1,
    "explanation": "In classic Seq2Seq (Sutskever et al.), the final encoder hidden state was a fixed-length bottleneck vector. As sentences exceeded 20 words, representation quality deteriorated catastrophically."
  },
  {
    "id": "aiml_rnn_10",
    "topic": "RNNs & Sequence Modeling",
    "difficulty": "Hard",
    "question": "Why can RNNs and LSTMs NOT be parallelized across sequence steps during training, unlike Transformers?",
    "options": [
      "Because RNN code is written in Python",
      "Because the computation of step `t` strictly requires the output hidden state `h_{t-1}` from the previous step, enforcing sequential execution that cannot exploit GPU parallelization across time",
      "Because GPUs only support 2D arrays",
      "Because sequence lengths are unpredictable"
    ],
    "correctAnswer": 1,
    "explanation": "RNNs have inherently sequential temporal dependencies: you cannot compute token 50 before token 49 finishes. Transformers eliminate recurrent recurrence entirely, enabling massive simultaneous GPU parallelization over all tokens."
  },
  {
    "id": "aiml_tf_1",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Easy",
    "question": "What is the seminal 2017 research paper by Vaswani et al. that introduced the Transformer architecture?",
    "options": [
      "\"Deep Residual Learning for Image Recognition\"",
      "\"Attention Is All You Need\"",
      "\"Language Models are Few-Shot Learners\"",
      "\"Mastering the Game of Go\""
    ],
    "correctAnswer": 1,
    "explanation": "Google researchers published \"Attention Is All You Need\" at NeurIPS 2017, introducing the Transformer and replacing recurrence with self-attention."
  },
  {
    "id": "aiml_tf_2",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Easy",
    "question": "What are the three vectors created by linear projections for each input token in Scaled Dot-Product Attention?",
    "options": [
      "Alpha, Beta, Gamma",
      "Query (Q), Key (K), and Value (V)",
      "Weights, Biases, Gradients",
      "Input, Hidden, Output"
    ],
    "correctAnswer": 1,
    "explanation": "In self-attention, each token representation is projected into three distinct spaces: Query (what the token is searching for), Key (what the token contains), and Value (the actual content representation)."
  },
  {
    "id": "aiml_tf_3",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Easy",
    "question": "What is the exact mathematical formula for Scaled Dot-Product Attention?",
    "options": [
      "Attention(Q, K, V) = Q * K * V",
      "Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V",
      "Attention(Q, K, V) = sigmoid(Q + K + V)",
      "Attention(Q, K, V) = ReLU(Q * K) / V"
    ],
    "correctAnswer": 1,
    "explanation": "Scaled dot-product attention computes compatibility between queries and keys, scales by `1/sqrt(d_k)` to prevent softmax saturation, applies softmax, and computes a weighted sum of values `V`."
  },
  {
    "id": "aiml_tf_4",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Easy",
    "question": "Why does the attention formula divide by `sqrt(d_k)` (square root of the key dimension)?",
    "options": [
      "To convert numbers to integers",
      "For large dimensions `d_k`, dot products grow large in magnitude, pushing softmax into regions with extremely small gradients; scaling by `sqrt(d_k)` keeps gradients stable",
      "To reduce training time by half",
      "To normalize token lengths"
    ],
    "correctAnswer": 1,
    "explanation": "When `d_k` is large, the variance of the dot product is `d_k`. Dividing by `sqrt(d_k)` restores unit variance, preventing the softmax function from saturating into regions with vanishing gradients."
  },
  {
    "id": "aiml_tf_5",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Medium",
    "question": "Why do Transformers require \"Positional Encodings\" added to token embeddings?",
    "options": [
      "To encrypt token identities",
      "Because self-attention operations are permutation-equivariant (they process all tokens simultaneously with zero inherent awareness of word order or sequence position)",
      "To increase vocabulary size",
      "To distinguish nouns from verbs"
    ],
    "correctAnswer": 1,
    "explanation": "Unlike RNNs which process words step-by-step, self-attention treats inputs as an unordered set of tokens. Positional encodings (sinusoidal or learned) inject word order information into embeddings."
  },
  {
    "id": "aiml_tf_6",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Medium",
    "question": "What is \"Multi-Head Attention\" and what is its advantage over single-head attention?",
    "options": [
      "Running attention on multiple computers",
      "Projecting Q, K, V into multiple representation subspaces in parallel, allowing the model to jointly attend to information from different representation aspects (e.g. grammar, semantics, reference) simultaneously",
      "Running 8 different language models at once",
      "Using 8 separate GPUs"
    ],
    "correctAnswer": 1,
    "explanation": "Multi-head attention splits the embedding dimension into `h` parallel heads. Each head specializes in capturing different linguistic relationships (e.g. subject-verb agreement vs coreference resolution)."
  },
  {
    "id": "aiml_tf_7",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Medium",
    "question": "What does \"Causal Masking\" (Masked Self-Attention) do in autoregressive Transformer Decoders (like GPT)?",
    "options": [
      "Hides user passwords in the prompt",
      "Sets attention scores to -infinity for future tokens (`j > i`), preventing current tokens from attending to upcoming future words during autoregressive text generation",
      "Masks 15% of words randomly",
      "Deletes empty spaces in text"
    ],
    "correctAnswer": 1,
    "explanation": "In generative decoders (GPT), causal masking ensures the prediction for token `i` depends strictly on known preceding tokens `0 ... i`, preventing the model from \"cheating\" by peeking at future tokens."
  },
  {
    "id": "aiml_tf_8",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Medium",
    "question": "What is the computational complexity of standard Full Self-Attention with respect to sequence length N?",
    "options": [
      "O(N)",
      "O(N^2) (Quadratic in sequence length)",
      "O(log N)",
      "O(N^3)"
    ],
    "correctAnswer": 1,
    "explanation": "Computing the NxN attention matrix requires evaluating dot products between every pair of tokens, scaling quadratically in compute and memory `O(N^2)`, which creates a bottleneck for very long contexts."
  },
  {
    "id": "aiml_tf_9",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Hard",
    "question": "What is the difference between \"Pre-LayerNorm\" and \"Post-LayerNorm\" in Transformer blocks and why do modern LLMs prefer Pre-LayerNorm?",
    "options": [
      "Pre-LayerNorm is only for vision",
      "Post-LN normalizes after the residual addition (unstable, requires warmup); Pre-LN applies LayerNorm before self-attention and MLP blocks inside the residual branch, allowing smooth gradient flow and stable training without warmup",
      "Pre-LN removes all layer norms",
      "Post-LN is faster on CPUs"
    ],
    "correctAnswer": 1,
    "explanation": "In original Transformers (Post-LN), gradients pass through LayerNorm, making deep training unstable. Modern architectures (Llama, GPT-3) use Pre-LN, creating an unimpeded identity residual pathway for gradients."
  },
  {
    "id": "aiml_tf_10",
    "topic": "Transformer & Self-Attention",
    "difficulty": "Hard",
    "question": "What is FlashAttention (Dao et al.) and how does it accelerate Transformer training without changing attention mathematically?",
    "options": [
      "It quantizes weights to 4 bits",
      "An IO-aware exact attention algorithm that tiles the computation into GPU High-Bandwidth Memory (HBM) and fast SRAM blocks using online softmax, eliminating slow intermediate reading/writing of the NxN attention matrix",
      "An approximation of attention using FFT",
      "A tool for compressing prompts"
    ],
    "correctAnswer": 1,
    "explanation": "FlashAttention recognizes that GPU memory bandwidth is the real bottleneck. By tiling Q, K, V blocks in fast on-chip SRAM and computing softmax incrementally, it avoids materializing the giant NxN matrix in HBM, speeding up training 2-4x."
  },
  {
    "id": "aiml_nlp_1",
    "topic": "NLP Fundamentals",
    "difficulty": "Easy",
    "question": "What is \"Tokenization\" in Natural Language Processing?",
    "options": [
      "Converting words into audio sounds",
      "The process of splitting raw text strings into discrete units (tokens) such as words, subwords, or characters to be converted into numerical IDs",
      "Translating text to another language",
      "Encrypting text with AES"
    ],
    "correctAnswer": 1,
    "explanation": "Tokenization breaks continuous strings into discrete token chunks (e.g. using Byte-Pair Encoding or WordPiece) that map to integer IDs in a vocabulary dictionary."
  },
  {
    "id": "aiml_nlp_2",
    "topic": "NLP Fundamentals",
    "difficulty": "Easy",
    "question": "What is Byte-Pair Encoding (BPE) tokenization?",
    "options": [
      "Compressing text into zip files",
      "A subword tokenization algorithm that iteratively merges the most frequently occurring adjacent pairs of bytes/characters, balancing vocabulary size and out-of-vocabulary (OOV) words",
      "A binary encryption protocol",
      "A spelling correction tool"
    ],
    "correctAnswer": 1,
    "explanation": "BPE starts with individual characters and merges common pairs (e.g. \"l\" + \"o\" -> \"lo\" -> \"low\"). Common words stay whole, while rare words break into meaningful subwords, eliminating OOV issues."
  },
  {
    "id": "aiml_nlp_3",
    "topic": "NLP Fundamentals",
    "difficulty": "Easy",
    "question": "What is a \"Word Embedding\" (e.g. Word2Vec, GloVe)?",
    "options": [
      "A dictionary definition of a word",
      "A dense, continuous low-dimensional vector representation of words where semantically similar words map to nearby geometric points in vector space",
      "An HTML tag for embedding text",
      "A list of synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "Word embeddings map words to dense vectors (e.g. 300 dimensions). Semantic relationships are preserved geometrically (e.g. `vector(\"King\") - vector(\"Man\") + vector(\"Woman\") ≈ vector(\"Queen\")`)."
  },
  {
    "id": "aiml_nlp_4",
    "topic": "NLP Fundamentals",
    "difficulty": "Easy",
    "question": "What are the two training architectures introduced in Word2Vec (Mikolov et al. 2013)?",
    "options": [
      "Alpha and Beta",
      "Continuous Bag of Words (CBOW - predicts target word from context) and Skip-gram (predicts context words from target word)",
      "Supervised and Unsupervised",
      "Encoder and Decoder"
    ],
    "correctAnswer": 1,
    "explanation": "Word2Vec has two models: CBOW predicts the center word given surrounding context words. Skip-Gram uses the center word to predict its neighboring context words."
  },
  {
    "id": "aiml_nlp_5",
    "topic": "NLP Fundamentals",
    "difficulty": "Medium",
    "question": "What is the fundamental architectural difference between BERT and GPT?",
    "options": [
      "BERT is written in C; GPT in Python",
      "BERT is an Encoder-only bidirectional model trained with Masked Language Modeling (ideal for classification and understanding); GPT is a Decoder-only autoregressive causal model trained to predict next tokens (ideal for generation)",
      "BERT cannot process English",
      "GPT does not use Transformers"
    ],
    "correctAnswer": 1,
    "explanation": "BERT reads bidirectional context simultaneously (left and right) to understand text. GPT uses unidirectional causal masking to generate coherent text sequentially from left to right."
  },
  {
    "id": "aiml_nlp_6",
    "topic": "NLP Fundamentals",
    "difficulty": "Medium",
    "question": "What is \"Cosine Similarity\" and why is it preferred over Euclidean distance for comparing text embeddings?",
    "options": [
      "Cosine similarity is faster on Intel CPUs",
      "Cosine similarity measures the cosine of the angle between two vectors, capturing orientation/semantic alignment independent of vector magnitude (document length)",
      "Euclidean distance cannot handle negative numbers",
      "Cosine similarity only works on 2D vectors"
    ],
    "correctAnswer": 1,
    "explanation": "`Cosine_Sim = (A · B) / (||A|| * ||B||)`. It evaluates semantic direction: long and short documents covering the identical topic point in the same direction, which Euclidean distance would misjudge based on word count."
  },
  {
    "id": "aiml_nlp_7",
    "topic": "NLP Fundamentals",
    "difficulty": "Medium",
    "question": "What was the training objective of BERT's Masked Language Model (MLM)?",
    "options": [
      "Translating English to Spanish",
      "Randomly masking 15% of input tokens with a `[MASK]` token and training the deep bidirectional encoder to predict the original identity of the masked words based on left and right context",
      "Predicting the sentiment of sentences",
      "Sorting sentences in chronological order"
    ],
    "correctAnswer": 1,
    "explanation": "MLM randomly replaces words with `[MASK]`. Because the model can look at all other tokens in the sentence simultaneously, it learns deep contextual bidirectional representations."
  },
  {
    "id": "aiml_nlp_8",
    "topic": "NLP Fundamentals",
    "difficulty": "Medium",
    "question": "What is TF-IDF (Term Frequency - Inverse Document Frequency)?",
    "options": [
      "A deep learning library",
      "A statistical numerical statistic intended to reflect how important a word is to a document in a collection: high for words frequent in one document but rare across the entire corpus",
      "A tokenization algorithm for LLMs",
      "A GPU driver for NLP"
    ],
    "correctAnswer": 1,
    "explanation": "TF measures how often a word appears in a text. IDF penalizes universally common words (\"the\", \"is\"). The product highlights words that characterize specific documents."
  },
  {
    "id": "aiml_nlp_9",
    "topic": "NLP Fundamentals",
    "difficulty": "Hard",
    "question": "What is \"Cross-Attention\" in sequence-to-sequence Transformers (e.g. translation)?",
    "options": [
      "Attention between two different GPUs",
      "An attention layer where Queries come from the previous decoder layer, while Keys and Values come from the final output representations of the Encoder",
      "Attention that crosses between languages without words",
      "A masked self-attention layer"
    ],
    "correctAnswer": 1,
    "explanation": "In encoder-decoder Transformers, Cross-Attention allows the decoder generating translated words to query the source sentence representations produced by the encoder."
  },
  {
    "id": "aiml_nlp_10",
    "topic": "NLP Fundamentals",
    "difficulty": "Hard",
    "question": "What are Contextual Word Embeddings (ELMo, BERT) compared to Static Word Embeddings (Word2Vec, GloVe)?",
    "options": [
      "Contextual embeddings are stored in cloud databases",
      "Static embeddings assign a single fixed vector per word regardless of context (the word \"apple\" has the same vector in \"eating an apple\" and \"Apple stock\"); Contextual embeddings generate dynamic representations based on surrounding context",
      "Static embeddings require Transformers",
      "Contextual embeddings cannot handle numbers"
    ],
    "correctAnswer": 1,
    "explanation": "Word2Vec gives polysemous words (\"bank\" of a river vs \"bank\" for money) the exact same vector. Contextual models dynamically compute representations based on sentence context."
  },
  {
    "id": "aiml_llm_1",
    "topic": "LLMs & Generative AI",
    "difficulty": "Easy",
    "question": "What does LLM stand for in modern AI?",
    "options": [
      "Low-Latency Machine",
      "Large Language Model",
      "Linear Logic Matrix",
      "Logical Learning Mechanism"
    ],
    "correctAnswer": 1,
    "explanation": "LLM stands for Large Language Model: deep learning models with billions of parameters trained on vast corpora of text (e.g. GPT-4, Llama 3, Gemini)."
  },
  {
    "id": "aiml_llm_2",
    "topic": "LLMs & Generative AI",
    "difficulty": "Easy",
    "question": "What is \"Prompt Engineering\"?",
    "options": [
      "Designing computer hardware for AI",
      "The craft of formulating, structuring, and optimizing natural language inputs and instructions to guide generative AI models to produce desired, accurate outputs",
      "Writing Python code to train models",
      "Debugging neural network gradients"
    ],
    "correctAnswer": 1,
    "explanation": "Prompt engineering designs effective prompts (system prompts, role assignment, few-shot examples, chain-of-thought) to steer LLM responses accurately without changing weights."
  },
  {
    "id": "aiml_llm_3",
    "topic": "LLMs & Generative AI",
    "difficulty": "Easy",
    "question": "What is RAG (Retrieval-Augmented Generation)?",
    "options": [
      "An image generation algorithm",
      "An architecture that retrieves relevant authoritative documents from an external knowledge base/vector database and feeds them into the LLM context prompt to generate grounded, accurate responses",
      "A technique for training models without data",
      "A method to compress LLMs into small files"
    ],
    "correctAnswer": 1,
    "explanation": "RAG grounds LLMs on external private or up-to-date data: 1) Query retrieves top-K chunks from vector DB; 2) Chunks are injected into prompt; 3) LLM generates hallucination-free answers citing sources."
  },
  {
    "id": "aiml_llm_4",
    "topic": "LLMs & Generative AI",
    "difficulty": "Easy",
    "question": "What does the \"Temperature\" parameter control during LLM text generation?",
    "options": [
      "The physical temperature of the server rack",
      "The randomness and creativity of next-token sampling (temperature near 0 produces deterministic, focused outputs; higher temperature produces diverse, creative outputs)",
      "The speed of text generation",
      "The maximum context window length"
    ],
    "correctAnswer": 1,
    "explanation": "Temperature scales logits before softmax: `P(x) = softmax(logits / T)`. Low T sharpens probability peaks (deterministic). High T flattens the distribution, encouraging creative word choices."
  },
  {
    "id": "aiml_llm_5",
    "topic": "LLMs & Generative AI",
    "difficulty": "Medium",
    "question": "What is \"Hallucination\" in Large Language Models?",
    "options": [
      "A user experiencing visual glitches",
      "When an LLM confidently generates information that is factually incorrect, nonsensical, or ungrounded in real-world facts or provided source material",
      "When an LLM runs out of GPU memory",
      "When training loss reaches negative values"
    ],
    "correctAnswer": 1,
    "explanation": "Hallucinations occur because LLMs are statistical next-token predictors optimizing plausibility rather than ground truth, producing plausible-sounding factual errors."
  },
  {
    "id": "aiml_llm_6",
    "topic": "LLMs & Generative AI",
    "difficulty": "Medium",
    "question": "What is \"Few-Shot Prompting\" compared to \"Zero-Shot Prompting\"?",
    "options": [
      "Shooting pictures with cameras",
      "Zero-shot asks the model to perform a task with instructions only; Few-shot provides a few demonstration input-output example pairs in the prompt before the final question to guide formatting and logic",
      "Few-shot trains the model weights",
      "Zero-shot uses zero parameters"
    ],
    "correctAnswer": 1,
    "explanation": "In-context learning: Few-shot prompting provides 2-5 explicit demonstration examples directly in the prompt text, conditioning the LLM to mirror the desired style and logic without fine-tuning."
  },
  {
    "id": "aiml_llm_7",
    "topic": "LLMs & Generative AI",
    "difficulty": "Medium",
    "question": "What is LoRA (Low-Rank Adaptation) in parameter-efficient fine-tuning (PEFT)?",
    "options": [
      "A low-cost cloud provider",
      "A technique that freezes pre-trained model weights and injects trainable rank-decomposition matrices (A and B) into attention layers, reducing trainable parameters by 99% while matching full fine-tuning performance",
      "A tool for quantizing models to 8 bits",
      "A prompt engineering template"
    ],
    "correctAnswer": 1,
    "explanation": "LoRA decomposes weight updates `ΔW = B * A` (where rank `r << d`). Training a 70B parameter model with LoRA requires tuning only a few megabytes of adapter weights instead of hundreds of gigabytes."
  },
  {
    "id": "aiml_llm_8",
    "topic": "LLMs & Generative AI",
    "difficulty": "Medium",
    "question": "What is RLHF (Reinforcement Learning from Human Feedback) in LLM alignment (e.g. InstructGPT / ChatGPT)?",
    "options": [
      "Paying humans to write code",
      "A 3-step alignment process: 1) Supervised fine-tuning, 2) Training a Reward Model on human preference comparisons, 3) Optimizing the policy LLM against the reward model using PPO (Proximal Policy Optimization)",
      "Testing models with automated unit tests",
      "A tool that deletes toxic words"
    ],
    "correctAnswer": 1,
    "explanation": "RLHF aligns raw base models with human intent (Helpful, Honest, Harmless) by training a Reward Model on human pair-wise rankings, then using RL (PPO) to maximize the reward score."
  },
  {
    "id": "aiml_llm_9",
    "topic": "LLMs & Generative AI",
    "difficulty": "Hard",
    "question": "What is \"Chain-of-Thought\" (CoT) prompting (Wei et al. 2022) and why does it improve multi-step reasoning?",
    "options": [
      "Prompting models with chains of text files",
      "Encouraging the LLM to output explicit intermediate reasoning steps before arriving at the final answer (\"Let's think step by step\"), allocating more computation tokens to complex logical reasoning",
      "Connecting multiple LLMs in a loop",
      "Using recursive prompt templates"
    ],
    "correctAnswer": 1,
    "explanation": "Because Transformers generate one token at a time, forcing the model to verbalize intermediate reasoning steps (\"Chain of Thought\") effectively allows it to spend more forward-pass compute exploring logical inferences before answering."
  },
  {
    "id": "aiml_llm_10",
    "topic": "LLMs & Generative AI",
    "difficulty": "Hard",
    "question": "What is Model Quantization (e.g. 4-bit / 8-bit quantization like AWQ, GPTQ, GGUF)?",
    "options": [
      "Rounding numbers to the nearest integer",
      "Converting model weights and activations from high-precision floating point (FP32/FP16) into lower-precision integers (INT8/INT4), slashing GPU memory requirements by 50-75% with minimal accuracy loss",
      "Deleting 4 out of every 8 layers",
      "Splitting models across 4 GPUs"
    ],
    "correctAnswer": 1,
    "explanation": "Quantization maps continuous 16-bit floats to compact 4-bit/8-bit integers. This allows a 70B parameter model (needing ~140 GB VRAM in FP16) to fit comfortably onto consumer GPUs (~35-40 GB in 4-bit) with near-lossless accuracy."
  },
  {
    "id": "aiml_mlops_1",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Easy",
    "question": "What does MLOps stand for and what is its goal?",
    "options": [
      "Machine Learning Operations: applying DevOps principles (CI/CD, versioning, monitoring) to automate the deployment, monitoring, and lifecycle management of machine learning models in production",
      "Machine Language Optimizers",
      "Microservice Load Operations",
      "Model Loss Optimizers"
    ],
    "correctAnswer": 0,
    "explanation": "MLOps unifies machine learning system development (ML) and system operations (Ops) to standardize continuous integration, deployment, versioning, and monitoring of ML models reliably."
  },
  {
    "id": "aiml_mlops_2",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Easy",
    "question": "What is \"Algorithmic Bias\" in artificial intelligence systems?",
    "options": [
      "A compiler error in Python",
      "Systematic and repeatable errors in computer systems that create unfair outcomes, such as privileging one arbitrary group of users over others (often reflecting historical prejudices present in training data)",
      "A model with high bias and low variance",
      "A preference for GPU hardware"
    ],
    "correctAnswer": 1,
    "explanation": "AI models mirror the data they are fed: if training data contains historical societal biases or underrepresents specific demographics, the model amplifies those disparities in loan approvals, hiring, or facial recognition."
  },
  {
    "id": "aiml_mlops_3",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Easy",
    "question": "What is \"Concept Drift\" in production machine learning systems?",
    "options": [
      "A drift car simulation game",
      "When the statistical properties of the target variable change over time in unforeseen ways, degrading model prediction accuracy in production (e.g. consumer buying habits changing after an economic crisis)",
      "A memory leak in production servers",
      "When developers change the model architecture"
    ],
    "correctAnswer": 1,
    "explanation": "Concept drift occurs when the underlying relationship between inputs X and target Y evolves over time (`P(Y|X)` changes), requiring automated monitoring and model retraining."
  },
  {
    "id": "aiml_mlops_4",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Easy",
    "question": "What is a \"Vector Database\" (e.g. Pinecone, Weaviate, Milvus, Chroma)?",
    "options": [
      "A database that stores 2D vector graphics",
      "A specialized database engineered to index, store, and query high-dimensional vector embeddings using Approximate Nearest Neighbor (ANN) search algorithms (like HNSW)",
      "A database for math teachers",
      "A database running on vector GPUs"
    ],
    "correctAnswer": 1,
    "explanation": "Vector databases store embedding representations of text/images, supporting ultra-fast sub-millisecond similarity queries across millions of vectors using algorithms like Hierarchical Navigable Small World (HNSW)."
  },
  {
    "id": "aiml_mlops_5",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Medium",
    "question": "What is ONNX (Open Neural Network Exchange)?",
    "options": [
      "A cryptocurrency for AI",
      "An open, vendor-neutral ecosystem format that allows AI models to be exported from one framework (PyTorch, TensorFlow) and deployed seamlessly across heterogeneous runtimes and hardware (ONNX Runtime)",
      "A programming language replacing C++",
      "A cloud hosting service for models"
    ],
    "correctAnswer": 1,
    "explanation": "ONNX provides a universal intermediate representation for neural network graphs, enabling seamless cross-platform deployment (e.g. train in PyTorch, deploy optimized C++ inference on edge hardware)."
  },
  {
    "id": "aiml_mlops_6",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Medium",
    "question": "What is \"Data Drift\" (Covariate Shift) compared to Concept Drift?",
    "options": [
      "Data drift changes target definitions",
      "Data Drift occurs when the statistical distribution of input features `P(X)` changes over time while the conditional probability `P(Y|X)` remains the same (e.g. new user demographics entering the app)",
      "Data drift means data was deleted",
      "They are exact synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "In Covariate Shift / Data Drift, input feature distributions shift (`P(X)` changes), but the underlying relationship to the target stays constant. Monitoring distributions via Kolmogorov-Smirnov tests detects data drift."
  },
  {
    "id": "aiml_mlops_7",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Medium",
    "question": "What is a \"Model Registry\" (e.g. MLflow Model Registry)?",
    "options": [
      "A list of developer names",
      "A centralized repository providing collaborative model lifecycle management, versioning, stage transitions (Staging -> Production -> Archived), and lineage tracking for production models",
      "A government database of AI patents",
      "A tool that compiles Python to C"
    ],
    "correctAnswer": 1,
    "explanation": "A Model Registry tracks trained model artifacts, hyperparameters, metrics, and versions, providing formal promotion workflows and auditing before deploying models to live endpoints."
  },
  {
    "id": "aiml_mlops_8",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Medium",
    "question": "What is \"Shadow Deployment\" (Dark Launch) for ML models in production?",
    "options": [
      "Deploying models at night",
      "Deploying a new model candidate alongside the existing production model; incoming live traffic is duplicated and sent to both, but only the active model's predictions are returned to users while the shadow model is monitored for accuracy/latency",
      "Deploying an encrypted model",
      "Deploying models without internet access"
    ],
    "correctAnswer": 1,
    "explanation": "Shadow deployments test new models on real production traffic with zero user risk: predictions are logged and benchmarked against ground truth without impacting the customer experience."
  },
  {
    "id": "aiml_mlops_9",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Hard",
    "question": "What are SHAP (SHapley Additive exPlanations) and LIME used for in Explainable AI (XAI)?",
    "options": [
      "To accelerate GPU matrix multiplication",
      "Model-agnostic interpretability tools that explain the output of complex black-box machine learning models by quantifying the positive or negative contribution of each feature to a specific prediction",
      "To compress deep neural networks",
      "To generate synthetic training data"
    ],
    "correctAnswer": 1,
    "explanation": "SHAP (rooted in cooperative game theory) and LIME approximate local decision boundaries, calculating exactly how much each feature (e.g. income +$500, credit score -20) shifted the model's prediction away from base value."
  },
  {
    "id": "aiml_mlops_10",
    "topic": "Ethical AI & MLOps",
    "difficulty": "Hard",
    "question": "What is a \"Prompt Injection\" security attack against LLM applications and how is it mitigated?",
    "options": [
      "Injecting physical cables into the server",
      "An attack where an adversary crafts malicious inputs that override or manipulate the system prompt and security guardrails of the LLM (e.g. \"Ignore previous instructions and do X\"); mitigated using input sanitization, dual LLM verifiers, and structured function calling",
      "Injecting SQL statements into databases",
      "Cracking LLM encryption keys"
    ],
    "correctAnswer": 1,
    "explanation": "Prompt injection exploits the lack of separation between code (instructions) and data (user input) in LLMs. Attackers trick the model into breaking guardrails, exfiltrating system prompts or taking unauthorized actions."
  }
]
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.interviewPrepAiMl;
}
