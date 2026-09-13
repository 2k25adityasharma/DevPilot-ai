/**
 * DevPilot-AI — Career Roadmap: MLOps Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const mlopsRoadmap = {
  roleId: 'mlops-engineer',
  roadmapId: 'mlops',
  title: 'MLOps Engineer',
  category: 'data-ai',
  description: 'Bridge machine learning and production operations: automated training pipelines, model registries (MLflow), continuous integration for ML (CML), containerized model serving, feature stores, and drift monitoring (Evidently AI).',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Linux systems, Docker containerization for ML, Git version control, and Python packaging.',
      skills: [
        {
          id: 'mlo-docker-linux',
          title: 'Linux Systems & Docker for Machine Learning Environments',
          category: 'Infrastructure Basics',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: [],
          description: 'Master containerized ML environments: Linux process and memory management, writing reproducible Dockerfiles, NVIDIA Container Toolkit for GPU pass-through, and multi-stage builds.',
          whatToLearn: [
            'Linux systems for ML: monitoring CPU/GPU utilization (nvidia-smi, htop), disk I/O, process management',
            'Docker for ML: base images (nvidia/cuda, python:3.11-slim), dependency pinning with Poetry/Pipenv',
            'NVIDIA Container Toolkit: enabling hardware GPU access inside Docker containers (--gpus all)',
            'Multi-stage Docker builds to minimize final runtime container image size and attack surface',
            'Docker Compose for local multi-service orchestration (API + Model Server + Redis)'
          ],
          whyItMatters: 'Machine learning models fail in production when training and inference environments have conflicting CUDA, C++, or Python library versions. Containers guarantee reproducibility.',
          productionUse: 'Standard deployment and training execution unit across all enterprise MLOps platforms.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft multi-stage Dockerfiles; verify GPU driver compatibility and CUDA runtime versions manually.',
          handsOnTask: 'Create a lightweight, reproducible Docker container for a PyTorch/XGBoost inference service with GPU pass-through and health check endpoints.',
          projectApplication: 'Containerizes all training pipelines and model servers in subsequent projects.',
          resources: [
            { title: 'NVIDIA Container Toolkit Documentation', url: 'https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mlo-data-versioning-dvc',
          title: 'Data & Model Artifact Versioning with DVC',
          category: 'Artifact Management',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['mlo-docker-linux'],
          description: 'Version large datasets and model binaries alongside code: Data Version Control (DVC), remote storage backends (AWS S3, GCS), Git integration, and data pipelines (dvc.yaml).',
          whatToLearn: [
            'Why Git fails on big data: repository bloat, file size limits, and non-diffable binary artifacts',
            'DVC architecture: tracking large files (.dvc pointer files committed to Git, raw data stored in S3/GCS)',
            'DVC pipelines: defining stages, dependencies, and outputs in dvc.yaml for reproducible multi-step runs',
            'DVC data versioning: checking out exact historical dataset versions matching specific model experiments',
            'Integrating DVC into team Git workflows (git checkout automatically syncing dvc pull)'
          ],
          whyItMatters: 'To audit or debug a production model, engineers must be able to reproduce the exact dataset version it was trained on 6 months ago.',
          productionUse: 'Tracking terabyte-scale training datasets, feature tables, and serialized model weights in S3 buckets.',
          aiRelevance: 'Low',
          aiWorkflow: 'Use DVC CLI commands directly to track datasets and push pointer hashes to remote storage.',
          handsOnTask: 'Initialize a DVC repository connected to an AWS S3 bucket, track a 1GB dataset, run a multi-stage dvc.yaml pipeline, and verify data checkout on a new branch.',
          projectApplication: 'Manages dataset versioning for the Automated Continuous Training Pipeline project.',
          resources: [
            { title: 'DVC (Data Version Control) Documentation', url: 'https://dvc.org/doc', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Experiment tracking with MLflow, model registries, and continuous integration for machine learning (CML).',
      skills: [
        {
          id: 'mlo-mlflow-registry',
          title: 'Experiment Tracking & Model Registry with MLflow',
          category: 'Experiment Tracking',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mlo-data-versioning-dvc'],
          description: 'Master central ML lifecycle management: MLflow Tracking (parameters, metrics, artifacts), MLflow Model Registry (staging, production, archived stages), and autologging.',
          whatToLearn: [
            'MLflow Tracking Server: backend store (PostgreSQL) + artifact store (AWS S3) architecture',
            'Logging experiments: mlflow.log_params, mlflow.log_metrics across epochs, and logging model artifacts',
            'Autologging integrations with scikit-learn, XGBoost, LightGBM, and PyTorch',
            'MLflow Model Registry: registering models, semantic versioning, model stages (Staging, Production, Archived)',
            'Model promotion workflows: automated promotion gates based on metric thresholds'
          ],
          whyItMatters: 'Without an experiment tracker, teams lose track of which hyperparameter combination produced which model artifact and fail compliance audits.',
          productionUse: 'Standard tracking and governance layer for enterprise machine learning teams.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate MLflow callback integration scripts for custom training frameworks.',
          handsOnTask: 'Deploy an MLflow tracking server backed by PostgreSQL and S3, run 15 model training experiments, and programmatically promote the best model to Production.',
          projectApplication: 'Provides the model tracking and registry backbone for the Continuous ML Training Platform.',
          resources: [
            { title: 'MLflow Official Documentation', url: 'https://mlflow.org/docs/latest/index.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mlo-cicd-cml',
          title: 'CI/CD for Machine Learning (Continuous Machine Learning - CML)',
          category: 'CI/CD for ML',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['mlo-mlflow-registry'],
          description: 'Automate model verification in pull requests: GitHub Actions for ML, iterative CML (Continuous Machine Learning), automated evaluation reports, and PR metric comments.',
          whatToLearn: [
            'GitHub Actions workflows tailored for ML: trigger on PR, self-hosted GPU runners, secret management',
            'Continuous Machine Learning (CML) by Iterative: automatically generating visual diff reports on PRs',
            'Automated regression testing: evaluating model candidate against current production baseline on holdout datasets',
            'Pull request governance: posting automated comparison tables (F1-score, latency, memory) directly into PR comments'
          ],
          whyItMatters: 'Code review is not enough for machine learning. Engineers must review model performance diffs before code changes can be merged into production.',
          productionUse: 'Enforcing quality gates before deploying new model versions to production inference fleets.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate GitHub Actions workflow YAML for running evaluation benchmarks in headless CI environments.',
          handsOnTask: 'Create a GitHub Actions workflow that trains a candidate model, compares its metrics against the production model, and comments a Markdown evaluation report on the PR.',
          projectApplication: 'Provides automated CI/CD validation for all progressive MLOps projects.',
          resources: [
            { title: 'CML (Continuous Machine Learning) by Iterative', url: 'https://cml.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Production model serving, high-throughput inference engines (Triton / TorchServe), and Feature Stores (Feast).',
      skills: [
        {
          id: 'mlo-model-serving',
          title: 'High-Throughput Model Serving: Triton, TorchServe & FastAPI',
          category: 'Model Serving',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mlo-cicd-cml'],
          description: 'Deploy models at scale: NVIDIA Triton Inference Server, TorchServe, FastAPI async microservices, dynamic batching, model concurrency, and ONNX Runtime.',
          whatToLearn: [
            'Model serving patterns: Embedded in API vs Dedicated Model Microservice vs Asynchronous Worker Queue',
            'NVIDIA Triton Inference Server: model repository layout, dynamic batching, concurrent model execution, gRPC vs HTTP',
            'ONNX Runtime: accelerating inference speeds by converting PyTorch/XGBoost models to optimized graph execution',
            'Dynamic batching: combining incoming requests into batches within a short time window (e.g., 5ms) to maximize GPU utilization',
            'Health checks and metrics: exposing Prometheus metrics (/metrics) for request latency, batch size, and GPU VRAM'
          ],
          whyItMatters: 'Naive Flask/FastAPI wrappers waste expensive GPU capacity. Optimized model servers (Triton/TorchServe) increase throughput by 4x to 10x.',
          productionUse: 'Serving real-time recommendations, fraud scoring, and computer vision classification at scale.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Triton config.pbtxt model configuration files; benchmark throughput using perf_analyzer directly on target GPUs.',
          handsOnTask: 'Deploy an ONNX-optimized model on NVIDIA Triton Inference Server with dynamic batching, achieving 2,000 queries/second under 20ms latency.',
          projectApplication: 'Provides the serving infrastructure for the High-Throughput Production Model Serving Platform.',
          resources: [
            { title: 'NVIDIA Triton Inference Server Guide', url: 'https://github.com/triton-inference-server/server', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mlo-feature-stores-feast',
          title: 'Feature Stores: Feast for Offline & Online Features',
          category: 'Feature Management',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['mlo-model-serving'],
          description: 'Standardize feature sharing across training and inference: Feast open-source feature store, offline store (BigQuery/Postgres), online store (Redis), point-in-time joins, and preventing train-serve skew.',
          whatToLearn: [
            'Train-Serve Skew: why features computed differently in training vs real-time serving degrade production model performance',
            'Feast architecture: Feature Definitions, Entities, Feature Views, Batch Sources, and Stream Sources',
            'Dual storage paradigm: Offline store (PostgreSQL/Snowflake/BigQuery for historical training) vs Online store (Redis for sub-10ms lookup)',
            'Point-in-time correctness ("Time Travel joins"): ensuring historical training datasets do not leak future feature values',
            'Materialization: synchronizing updated features from the offline store to the online Redis store on a scheduled cadence'
          ],
          whyItMatters: 'Feature stores eliminate duplicated feature engineering pipelines across data science and engineering teams, preventing catastrophic train-serve skew.',
          productionUse: 'Serving live features (e.g., user transaction count in the last 10 minutes) to fraud and recommendation models.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft Feast YAML feature definitions and query schemas; verify historical point-in-time joins with unit tests.',
          handsOnTask: 'Set up Feast with PostgreSQL as offline store and Redis as online store, generate point-in-time training data, and query live features in under 5ms.',
          projectApplication: 'Powers real-time feature retrieval for the Enterprise Fraud Detection MLOps Platform.',
          resources: [
            { title: 'Feast (Feature Store) Documentation', url: 'https://docs.feast.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Model monitoring, data drift detection with Evidently AI, automated retraining, and pipeline orchestration.',
      skills: [
        {
          id: 'mlo-monitoring-drift',
          title: 'Model Monitoring, Data Drift & Evidently AI',
          category: 'Observability & Drift',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mlo-feature-stores-feast'],
          description: 'Detect degradation in live models: Data Drift (Kolmogorov-Smirnov test, Population Stability Index), Concept Drift, Evidently AI reports, Prometheus metrics, and automated retraining triggers.',
          whatToLearn: [
            'Types of production drift: Data Drift (covariate shift), Concept Drift (relationship shift), Prior Probability shift',
            'Statistical drift detection tests: Kolmogorov-Smirnov (KS) test, Wasserstein Distance, Population Stability Index (PSI)',
            'Evidently AI framework: generating automated visual HTML drift reports and test suites for production prediction logs',
            'Prometheus & Grafana monitoring: tracking model prediction distributions, input feature drift scores, and latency percentiles',
            'Automated alerting and retraining loops: triggering Airflow/Kubeflow pipelines when feature drift crosses statistical thresholds'
          ],
          whyItMatters: 'All machine learning models degrade over time as real-world customer behavior changes. Without drift monitoring, models silently fail.',
          productionUse: 'Monitoring production models in finance, e-commerce, and logistics to guarantee sustained accuracy.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate baseline configuration templates for Evidently AI test suites; audit statistical drift thresholds manually.',
          handsOnTask: 'Build a production monitoring service with Evidently AI that analyzes incoming prediction logs, detects feature drift, and exports metrics to Prometheus.',
          projectApplication: 'Provides continuous monitoring for the End-to-End Enterprise MLOps Platform project.',
          resources: [
            { title: 'Evidently AI Documentation', url: 'https://docs.evidentlyai.com/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mlo-orchestration-pipelines',
          title: 'ML Pipeline Orchestration with Kubeflow / Prefect / Airflow',
          category: 'ML Pipelines',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['mlo-monitoring-drift'],
          description: 'Automate end-to-end ML workflows: Kubeflow Pipelines (KFP) on Kubernetes, Prefect / Airflow DAGs, reproducible pipeline components, model validation, and automated deployment.',
          whatToLearn: [
            'ML workflow orchestration vs standard data orchestration: tracking model artifacts, training parameters, and hardware requirements',
            'Kubeflow Pipelines (KFP): containerized pipeline components, pipeline DAG definition, artifact passing between steps',
            'Automated retraining pipeline lifecycle: Ingest Data -> Validate Data -> Preprocess -> Train -> Evaluate -> Gate -> Register -> Deploy',
            'Continuous deployment strategies: Blue/Green deployments, Canary releases, and A/B traffic splitting for new model versions'
          ],
          whyItMatters: 'Automated retraining pipelines close the loop, enabling models to adapt continuously to fresh data without human engineering intervention.',
          productionUse: 'Running daily model retraining and zero-downtime canary updates across enterprise Kubernetes clusters.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Kubeflow component function decorators and pipeline DAG configurations.',
          handsOnTask: 'Build a complete automated retraining pipeline with Prefect/Kubeflow that triggers upon drift alerts, retrains the model, and validates it against production.',
          projectApplication: 'Core orchestration engine for the End-to-End Enterprise MLOps Platform.',
          resources: [
            { title: 'Kubeflow Pipelines Documentation', url: 'https://www.kubeflow.org/docs/components/pipelines/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Production Kubernetes deployment, MLOps system design interviews, and hiring portfolio.',
      skills: [
        {
          id: 'mlo-kubernetes-deployment',
          title: 'Kubernetes for Machine Learning & Cloud Deployment',
          category: 'Production Infrastructure',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mlo-orchestration-pipelines'],
          description: 'Scale ML workloads on Kubernetes (EKS / GKE): Deployments, Services, Horizontal Pod Autoscaling (HPA) based on request load, GPU node pools, and KServe.',
          whatToLearn: [
            'Kubernetes primitives for ML: Pods, Deployments, Services, ConfigMaps, Secrets, PersistentVolumeClaims',
            'GPU scheduling on Kubernetes: resource requests/limits (nvidia.com/gpu: 1), node selectors, tolerations',
            'Autoscaling: Horizontal Pod Autoscaler (HPA) scaling inference pods automatically based on CPU/concurrency metrics',
            'KServe (KFServing): serverless model inferencing on Kubernetes with automated scale-to-zero and canary rollouts'
          ],
          whyItMatters: 'Enterprise machine learning runs on Kubernetes clusters. MLOps engineers must manage cluster resources and auto-scale model instances reliably.',
          productionUse: 'Deploying high-availability model serving fleets across cloud infrastructure.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft Kubernetes YAML deployment manifests and HPA autoscaling policies; verify resource requests and limits manually.',
          handsOnTask: 'Deploy a containerized model inference service to a Kubernetes cluster with an HPA autoscaler that scales from 1 to 5 pods under simulated traffic spikes.',
          projectApplication: 'Hosts the production serving tier for the Capstone MLOps Platform.',
          resources: [
            { title: 'KServe Documentation', url: 'https://kserve.github.io/website/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mlo-portfolio-interview',
          title: 'MLOps System Design Interviews & Portfolio Showcase',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['mlo-kubernetes-deployment'],
          description: 'Excel in MLOps technical interviews: MLOps System Design (real-time feature pipelines, canary model deployments, drift recovery), and presenting reproducible GitHub repositories.',
          whatToLearn: [
            'MLOps System Design interview rounds: designing an End-to-End Fraud Detection MLOps Platform or Recommender System Deployment',
            'Explaining key architectural tradeoffs: batch vs real-time feature computation, online vs offline inference, shadow deployment vs canary',
            'Documenting MLOps repositories: architecture diagrams showing data, training, registry, serving, and monitoring layers',
            'Writing impact-driven resume bullet points highlighting deployment automation, latency reductions, and infrastructure cost savings'
          ],
          whyItMatters: 'MLOps engineers are highly valued because they bridge data science and DevOps. Demonstrating complete end-to-end pipelines wins senior offers.',
          productionUse: 'Securing MLOps Engineer, Machine Learning Infrastructure Engineer, and Platform Engineer roles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to simulate MLOps system design questions focusing on zero-downtime model rollback and feature store consistency.',
          handsOnTask: 'Publish your capstone MLOps platform repository with an end-to-end architecture diagram, automated CI/CD pipeline, and Grafana monitoring dashboard.',
          projectApplication: 'Presents your complete MLOps engineering portfolio to hiring managers.',
          resources: [
            { title: 'Made With ML (Goku Mohandas)', url: 'https://madewithml.com/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'mlo-proj-1',
      title: 'Automated CI/CD Model Training & Registry Pipeline with MLflow',
      difficulty: 'Beginner',
      estimatedTime: '3-4 weeks',
      objective: 'Build an automated model training and tracking pipeline using DVC for dataset versioning, MLflow for experiment tracking, and GitHub Actions for automated PR evaluation.',
      technologies: ['Python', 'scikit-learn / XGBoost', 'MLflow', 'DVC', 'GitHub Actions', 'Docker'],
      skillsPracticed: ['DVC data versioning', 'MLflow experiment tracking', 'Model registry', 'CI/CD pull request automation', 'Docker containerization'],
      requirements: [
        'Version training dataset with DVC connected to an AWS S3 or MinIO remote storage bucket',
        'MLflow experiment tracking logging hyperparameters, ROC-AUC metrics, and model artifacts across training runs',
        'Model registry promotion: automatically registering models and promoting to Staging if validation metric exceeds threshold',
        'GitHub Actions workflow that runs automated evaluation tests on new PRs and comments an evaluation report'
      ],
      deliverables: [
        'Complete GitHub repository with passing CI/CD workflow badges',
        'Public MLflow tracking server setup with recorded experiment runs',
        'Technical write-up detailing model versioning and registry governance'
      ],
      productionExpectations: [
        '100% reproducible training runs using pinned DVC dataset hashes',
        'Automated PR test verification preventing degraded model regressions'
      ],
      aiIntegration: 'Use AI to generate sample GitHub Actions workflow YAML for running DVC data pulls.'
    },
    {
      id: 'mlo-proj-2',
      title: 'High-Throughput Model Serving with Triton, ONNX & Feast Feature Store',
      difficulty: 'Intermediate',
      estimatedTime: '5 weeks',
      objective: 'Develop a low-latency model serving platform with NVIDIA Triton / ONNX Runtime, Feast feature store for online feature retrieval, and Docker Compose.',
      technologies: ['NVIDIA Triton Inference Server', 'ONNX Runtime', 'Feast Feature Store', 'Redis', 'PostgreSQL', 'FastAPI'],
      skillsPracticed: ['Model optimization with ONNX', 'Triton dynamic batching', 'Feast feature store', 'Redis online serving', 'Benchmark load testing'],
      requirements: [
        'Convert PyTorch / XGBoost trained models to optimized ONNX Runtime graphs',
        'Deploy model on NVIDIA Triton Inference Server with dynamic batching configured to maximize throughput',
        'Integrate Feast feature store retrieving online features from Redis with sub-5ms lookup latency',
        'Execute load testing with k6 or Triton perf_analyzer proving sustained 1,500 requests/sec with p95 < 25ms'
      ],
      deliverables: [
        'Multi-container Docker Compose environment (Triton + Feast + Redis + Postgres + Gateway)',
        'Triton perf_analyzer benchmark report documenting latency curves under load',
        'Comprehensive documentation detailing model repository structure and feature view definitions'
      ],
      productionExpectations: [
        'Zero train-serve feature skew through unified Feast feature definitions',
        'Stable GPU VRAM utilization without memory leaks during extended load testing'
      ],
      aiIntegration: 'Use AI to generate synthetic client traffic loads and validate Triton config.pbtxt syntax.'
    },
    {
      id: 'mlo-proj-3',
      title: 'End-to-End Enterprise MLOps Platform with Drift Monitoring & Automated Retraining',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise MLOps platform featuring live model serving on Kubernetes, real-time drift monitoring with Evidently AI, Prometheus metrics, and automated retraining pipelines.',
      technologies: ['Kubernetes (K3s / Minikube)', 'Evidently AI', 'Prefect / Airflow', 'MLflow', 'Prometheus & Grafana', 'FastAPI'],
      skillsPracticed: ['Kubernetes ML deployment', 'Data & concept drift detection', 'Automated retraining loops', 'Prometheus metrics', 'Canary rollouts'],
      requirements: [
        'Containerized model serving service deployed on Kubernetes with Horizontal Pod Autoscaler (HPA)',
        'Evidently AI monitoring service continuously inspecting production request logs for feature and prediction drift',
        'Prometheus exporter streaming drift scores and latency percentiles into a Grafana monitoring dashboard',
        'Automated retraining pipeline (Prefect/Airflow) triggered automatically when Kolmogorov-Smirnov drift test flags significant covariate shift',
        'Canary deployment strategy routing 10% of live traffic to newly retrained models before full production promotion'
      ],
      deliverables: [
        'Complete Kubernetes manifest repository with Helm charts and automated deployment scripts',
        'Live Grafana dashboard visualizing request throughput, p99 latency, and real-time feature drift scores',
        'Comprehensive architecture RFC document detailing the closed-loop automated retraining lifecycle'
      ],
      productionExpectations: [
        'Zero-downtime rolling updates during model version transitions',
        'Automated rollback to previous model checkpoint if canary error rate exceeds 1%'
      ],
      aiIntegration: 'Use AI to generate synthetic feature drift scenarios simulating sudden shifts in consumer behavior.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Linux systems administration and Docker containerization with NVIDIA GPU support',
      'Data and artifact versioning with DVC (Data Version Control) and cloud storage',
      'Experiment tracking, model metrics, and model registries with MLflow',
      'Continuous Machine Learning (CML) and automated evaluation in GitHub Actions CI/CD',
      'High-throughput model serving with NVIDIA Triton Inference Server, ONNX Runtime, and FastAPI',
      'Feature stores (Feast): managing offline data sources and low-latency Redis online serving',
      'Model observability and data drift detection using Evidently AI, KS tests, and PSI',
      'ML pipeline orchestration using Kubeflow Pipelines, Prefect, or Apache Airflow',
      'Container orchestration on Kubernetes: Pods, Services, HPA autoscaling, and GPU scheduling',
      'Deployment strategies: Blue/Green, Canary releases, and automated model rollback gates'
    ],
    projects: [
      'Automated CI/CD model training and registry pipeline with MLflow and DVC',
      'High-throughput model serving platform with Triton, ONNX, and Feast feature store',
      'End-to-end enterprise MLOps platform with drift monitoring, Grafana, and automated retraining',
      'All projects containerized with Docker and reproducible via single-command deployment'
    ],
    csFundamentals: [
      'Distributed systems principles: horizontal scaling, load balancing, consensus',
      'Statistical testing for drift: Kolmogorov-Smirnov, Population Stability Index (PSI), Wasserstein distance',
      'Hardware accelerator architecture: GPU memory hierarchy, host-to-device transfers, dynamic batching',
      'Software engineering best practices: semantic versioning, CI/CD gates, immutable infrastructure'
    ],
    tools: [
      'Experiment and registry tools: MLflow and Weights & Biases',
      'Data versioning tools: DVC (Data Version Control)',
      'Serving and inference tools: NVIDIA Triton, TorchServe, ONNX Runtime, FastAPI',
      'Orchestration and monitoring: Prefect, Kubeflow, Evidently AI, Prometheus, Grafana'
    ],
    deployment: [
      'Deploying containerized inference workloads to Kubernetes clusters with HPA',
      'Managing cloud object storage (AWS S3, Google Cloud Storage) for models and data',
      'Configuring automated GitHub Actions CI/CD pipelines executing model evaluations',
      'Managing Prometheus alerting rules and Grafana dashboard visualizations'
    ],
    portfolio: [
      'MLOps engineering portfolio featuring comprehensive system architecture flowcharts',
      'In-depth case studies detailing model latency benchmarks, drift detection, and automated retraining',
      'Live Grafana dashboard screenshots showcasing production model monitoring',
      'Clear documentation explaining business ROI, downtime prevention, and compute cost optimization'
    ],
    github: [
      'Public GitHub repositories with clean docker-compose.yml and Kubernetes manifests',
      'Comprehensive READMEs with architecture diagrams and sample benchmark outputs',
      'Automated CI testing badges verifying linting, unit tests, and model evaluations',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-compliant MLOps Engineer resume in PDF format',
      'Bullet points highlighting platform scale: QPS served, latency reduction, automated retraining frequency',
      'Direct links to GitHub repositories, architecture diagrams, and LinkedIn profile',
      'Targeted keywords matching MLOps engineer, machine learning platform engineer, and AI infrastructure roles'
    ],
    interviewReadiness: [
      'Fluency in MLOps System Design whiteboard interviews (Fraud Platform, Recommender Deployment)',
      'Deep understanding of train-serve skew, dynamic batching, and model quantization impacts',
      'Ability to design closed-loop automated retraining and canary deployment architectures',
      'Structured STAR stories detailing past model regressions, infrastructure outages, and scaling wins'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['mlops'] = mlopsRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = mlopsRoadmap;
}
