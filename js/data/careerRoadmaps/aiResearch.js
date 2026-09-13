/**
 * DevPilot-AI — Career Roadmap: AI Research Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const aiResearchRoadmap = {
  roleId: 'ai-research-engineer',
  roadmapId: 'aiResearch',
  title: 'AI Research Engineer',
  category: 'data-ai',
  description: 'Bridge foundational mathematics and cutting-edge artificial intelligence research: theoretical machine learning, novel neural architectures, paper replication, distributed multi-GPU training, and empirical research methodology.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Advanced linear algebra, multivariate calculus, probability theory, and optimization mathematics.',
      skills: [
        {
          id: 'res-advanced-math',
          title: 'Advanced Mathematics for Machine Learning Research',
          category: 'Mathematical Foundations',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: [],
          description: 'Master theoretical mathematics for AI research: spectral theorem, singular value decomposition (SVD), multivariate Taylor series, convex optimization, Lagrange multipliers, and information theory.',
          whatToLearn: [
            'Linear algebra theory: vector spaces, null spaces, inner product spaces, Singular Value Decomposition (SVD)',
            'Multivariate calculus: Jacobians, Hessians, positive semi-definite matrices, curvature of loss landscapes',
            'Optimization: convex analysis, Karush-Kuhn-Tucker (KKT) conditions, stochastic gradient descent convergence proofs',
            'Information theory: Shannon entropy, cross-entropy, Kullback-Leibler (KL) divergence, mutual information'
          ],
          whyItMatters: 'Reading and writing novel machine learning research papers requires fluent mathematical expression and rigorous analytical derivation.',
          productionUse: 'Formulating novel loss functions, proving optimization bounds, and analyzing mathematical representations in neural networks.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to check formal mathematical derivations and generate LaTeX equations; verify convergence proofs independently.',
          handsOnTask: 'Derive and prove the convergence rate of gradient descent on strongly convex functions with Lipschitz continuous gradients.',
          projectApplication: 'Provides the mathematical rigor for all research paper replications.',
          resources: [
            { title: 'Convex Optimization by Stephen Boyd', url: 'https://web.stanford.edu/~boyd/cvxbook/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'res-pytorch-internals',
          title: 'PyTorch Deep Learning Internals & CUDA Acceleration',
          category: 'Research Tooling',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['res-advanced-math'],
          description: 'Master PyTorch at the systems level: writing custom autograd Function classes with backward passes, GPU memory profiling, custom C++/CUDA extensions, and numerical stability.',
          whatToLearn: [
            'PyTorch autograd mechanics: constructing dynamic computational graphs, ctx.save_for_backward(), custom autograd.Function',
            'Numerical stability: log-sum-exp trick, preventing underflow/overflow in softmax and loss computations',
            'GPU memory profiling: torch.cuda.memory_allocated(), memory fragmentation, reducing peak activation memory',
            'Writing custom PyTorch C++ / CUDA operator extensions for novel mathematical kernels'
          ],
          whyItMatters: 'Research often introduces operations not natively available in standard libraries. Implementing custom forward and backward passes is a hallmark of a research engineer.',
          productionUse: 'Implementing novel activation functions, custom attention variants, and memory-efficient loss functions.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to generate boilerplate C++/CUDA kernel structures; mathematically verify custom backward gradient formulas.',
          handsOnTask: 'Implement a custom fused activation function in PyTorch with an analytical backward derivative pass and verify gradients with torch.autograd.gradcheck.',
          projectApplication: 'Used in custom neural architecture experiments.',
          resources: [
            { title: 'PyTorch Custom C++ and CUDA Extensions Guide', url: 'https://pytorch.org/tutorials/advanced/cpp_extension.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Generative modeling theory (VAEs, Diffusion), research literature reviews, and empirical methodology.',
      skills: [
        {
          id: 'res-paper-reading',
          title: 'Research Methodology, Paper Deconstruction & Reproducibility',
          category: 'Research Methodology',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['res-pytorch-internals'],
          description: 'Read, critique, and replicate landmark research: arXiv literature reviews, scientific sanity checks, ablation studies, seed variance, and the ML reproducibility checklist.',
          whatToLearn: [
            'How to read ML research papers efficiently (three-pass method: bird’s eye, understanding details, critical deconstruction)',
            'Designing controlled ablation studies: isolating the exact contribution of each architectural modification',
            'Reproducibility hygiene: fixing random seeds, reporting mean and standard deviation across multiple seeds, open science practices',
            'Writing comprehensive literature reviews mapping the lineage of an idea across ArXiv publications'
          ],
          whyItMatters: 'Up to 50% of published empirical AI papers fail independent replication. True research engineers distinguish real breakthroughs from statistical noise.',
          productionUse: 'Evaluating newly published papers to determine if claims warrant adoption in corporate AI pipelines.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to summarize dense paper sections and suggest related citation graphs; verify all empirical baseline numbers directly from raw tables.',
          handsOnTask: 'Select an influential ArXiv machine learning paper, critique its experimental design, and reproduce its primary synthetic benchmark result.',
          projectApplication: 'Direct preparation for the Landmark AI Paper Replication project.',
          resources: [
            { title: 'How to Read a Paper by S. Keshav', url: 'https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf', type: 'paper' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'res-generative-models',
          title: 'Generative Modeling: VAEs, GANs & Diffusion Models',
          category: 'Generative Modeling',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: ['res-paper-reading'],
          description: 'Master mathematical generative modeling: Variational Autoencoders (VAEs: ELBO bound, reparameterization trick), GANs (minimax game), and Diffusion Models (DDPM: forward noise process, score matching).',
          whatToLearn: [
            'Variational Autoencoders: latent variable models, Evidence Lower Bound (ELBO), KL divergence regularization, reparameterization trick',
            'Generative Adversarial Networks: zero-sum game theory, discriminator vs generator loss, mode collapse, Wasserstein GAN with gradient penalty',
            'Denoising Diffusion Probabilistic Models (DDPM): forward Gaussian noise schedule (q), reverse denoising trajectory (p_theta), score matching',
            'Evaluation metrics: Fréchet Inception Distance (FID), Inception Score (IS), and reconstruction loss'
          ],
          whyItMatters: 'Diffusion models and continuous latent space representations form the mathematical foundation of modern generative imaging and audio synthesis.',
          productionUse: 'Architecting image synthesis, audio generation, molecular drug discovery, and 3D asset generation models.',
          aiRelevance: 'Core',
          aiWorkflow: 'Trace mathematical derivations of the ELBO bound and DDPM reverse process; write PyTorch implementations independently.',
          handsOnTask: 'Implement a minimal Denoising Diffusion Probabilistic Model (DDPM) from scratch in PyTorch to generate synthetic handwritten digits or faces.',
          projectApplication: 'Core architecture for the Denoising Diffusion Probabilistic Model project.',
          resources: [
            { title: 'Understanding Diffusion Models: A Unified Perspective (Calvin Luo)', url: 'https://arxiv.org/abs/2208.11970', type: 'paper' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Distributed training across multi-GPU clusters, mixed precision, and large-scale model pretraining.',
      skills: [
        {
          id: 'res-distributed-training',
          title: 'Distributed Multi-GPU Training (DDP & FSDP)',
          category: 'Distributed Research Systems',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['res-pytorch-internals'],
          description: 'Scale neural network training across GPU clusters: DistributedDataParallel (DDP), Fully Sharded Data Parallel (FSDP), ZeRO memory stages (DeepSpeed), gradient accumulation, and mixed precision (FP16/BF16).',
          whatToLearn: [
            'Distributed paradigms: Data Parallelism (DDP) vs Model/Tensor Parallelism (Megatron-LM) vs Pipeline Parallelism',
            'PyTorch DistributedDataParallel (DDP): multi-processing, gradient all-reduce communication, process groups, NCCL backend',
            'Memory optimization: Automatic Mixed Precision (torch.cuda.amp with bfloat16/fp16), Gradient Checkpointing (activation recomputation)',
            'Fully Sharded Data Parallel (FSDP) and ZeRO (Zero Redundancy Optimizer) stages 1, 2, and 3 for training models larger than single GPU VRAM'
          ],
          whyItMatters: 'State-of-the-art AI research models cannot fit on a single GPU. Research engineers must orchestrate distributed training across multi-node clusters.',
          productionUse: 'Pretraining foundation models, scaling large vision transformers, and running massive parameter searches.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to generate launch scripts (torchrun); diagnose distributed deadlocks and inter-GPU communication latency directly.',
          handsOnTask: 'Set up an FSDP training script with torchrun that trains a 1-billion parameter Transformer across multiple GPUs with activation checkpointing.',
          projectApplication: 'Provides the distributed infrastructure for the Foundation Model Pretraining project.',
          resources: [
            { title: 'PyTorch FSDP Tutorial', url: 'https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'res-experiment-tracking',
          title: 'Experiment Tracking, Hyperparameter Sweeps & W&B',
          category: 'Research Tooling',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['res-distributed-training'],
          description: 'Manage empirical science: logging loss curves, gradient norms, and hyperparameter sweeps using Weights & Biases (W&B) or MLflow, and reproducible checkpointing.',
          whatToLearn: [
            'Weights & Biases (W&B) / MLflow integration: logging loss, learning rates, gradient norms, validation metrics',
            'Automated hyperparameter search sweeps: Bayesian optimization, Hyperband early stopping',
            'Checkpoint management: saving optimizer state, learning rate schedulers, and resuming training seamlessly',
            'Visualizing model representations: t-SNE / UMAP projections of latent embeddings in interactive dashboards'
          ],
          whyItMatters: 'Running dozens of parallel experiments without structured logging results in lost insights, irreproducible results, and wasted compute budgets.',
          productionUse: 'Tracking experimental progress across research lab clusters and team collaborations.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use W&B API to programmatically export and plot loss convergence comparisons across ablation branches.',
          handsOnTask: 'Configure a distributed experiment sweep with W&B that tests 20 hyperparameter configurations with automated early stopping of stagnant runs.',
          projectApplication: 'Tracks and visualizes all experiments across research deliverables.',
          resources: [
            { title: 'Weights & Biases Documentation', url: 'https://docs.wandb.ai/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Reinforcement Learning from Human Feedback (RLHF), DPO, and alignment research.',
      skills: [
        {
          id: 'res-rl-alignment',
          title: 'Reinforcement Learning & Alignment (PPO, DPO & KTO)',
          category: 'AI Alignment',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: ['res-distributed-training'],
          description: 'Master post-training alignment: Markov Decision Processes, Proximal Policy Optimization (PPO), Reward Modeling, Direct Preference Optimization (DPO), and Kahneman-Tversky Optimization (KTO).',
          whatToLearn: [
            'Reinforcement learning fundamentals: MDPs, policy gradients, advantage estimation (GAE), Actor-Critic models',
            'RLHF pipeline: Supervised Fine-Tuning (SFT) -> Reward Model training (Bradley-Terry preference model) -> PPO policy optimization',
            'Direct Preference Optimization (DPO): eliminating the reward model by mathematically reformulating the objective directly on paired preferences',
            'Modern alignment techniques: KTO (unpaired binary feedback), Odds Ratio Preference Optimization (ORPO)',
            'Evaluation of alignment: Win rates against reference models, length bias detection, and safety evaluations (AlpacaEval, MT-Bench)'
          ],
          whyItMatters: 'Raw pretraining produces models that babble internet text. Alignment algorithms transform raw base models into helpful, safe, coherent conversational assistants.',
          productionUse: 'Aligning foundation models, reducing toxicity, and steering model persona in commercial deployments.',
          aiRelevance: 'Core',
          aiWorkflow: 'Derive the mathematical relationship between the Bradley-Terry reward model and the closed-form DPO objective equation.',
          handsOnTask: 'Align an instruction-tuned language model on a preference dataset using Direct Preference Optimization (DPO) and evaluate win rate improvements.',
          projectApplication: 'Core alignment technique in the Preference Alignment & DPO Research project.',
          resources: [
            { title: 'Direct Preference Optimization Paper (Rafailov et al.)', url: 'https://arxiv.org/abs/2305.18290', type: 'paper' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'res-scaling-laws',
          title: 'Scaling Laws, Compute Budgets & Neural Architecture Search',
          category: 'Theoretical AI',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['res-rl-alignment'],
          description: 'Understand the empirical science of scaling: Chinchilla scaling laws, compute-optimal training tokens, FLOP counting, and emergent capabilities.',
          whatToLearn: [
            'Kaplan vs Chinchilla scaling laws: power-law relationships between parameters, tokens, and test loss (N, D, C)',
            'Compute-optimal training: balancing model parameter size (N) with training dataset token count (D) under fixed FLOP budget (C)',
            'FLOPs estimation: calculating floating-point operations per forward/backward pass (6 * N * D formula)',
            'Emergent abilities: evaluating whether model performance leaps are continuous metric artifacts or genuine phase transitions'
          ],
          whyItMatters: 'Deciding whether to train a 7B model on 3 trillion tokens vs a 13B model on 1 trillion tokens requires precise scaling law calculations.',
          productionUse: 'Planning multi-million dollar model training budgets and architectural configurations at AI research labs.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use Python scripts to fit power-law curves to loss checkpoints and predict asymptotic loss floors.',
          handsOnTask: 'Fit empirical scaling law power-law curves on a series of small-scale transformer pretraining runs and predict optimal token-to-parameter ratios.',
          projectApplication: 'Guides compute budgeting for the Foundation Model Pretraining project.',
          resources: [
            { title: 'Training Compute-Optimal Large Language Models (Chinchilla Paper)', url: 'https://arxiv.org/abs/2203.15556', type: 'paper' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Writing research papers, reproducible open-source releases, ArXiv preprints, and research interview preparation.',
      skills: [
        {
          id: 'res-paper-writing',
          title: 'Research Paper Authoring, LaTeX & Open Source Releases',
          category: 'Scientific Communication',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['res-scaling-laws'],
          description: 'Communicate scientific breakthroughs: Overleaf/LaTeX paper formatting, drafting clear methodology sections, high-resolution vector plots, releasing reproducible codebases, and ArXiv submission.',
          whatToLearn: [
            'LaTeX typesetting: Overleaf, NeurIPS / ICML / ICLR paper style guidelines and formatting templates',
            'Structuring a machine learning research paper: Abstract, Introduction, Related Work, Method, Experiments, Ablations, Conclusion',
            'Creating high-clarity vector diagrams and plots in PDF format (using Matplotlib / TikZ) with zero rasterization blur',
            'Packaging open-source research artifacts: clean GitHub repository with reproducibility Dockerfile and pretrained weights on Hugging Face'
          ],
          whyItMatters: 'Research is only impactful if other scientists can understand, verify, and build upon the work. Great scientific writing elevates engineering discoveries.',
          productionUse: 'Publishing conference submissions (NeurIPS, ICLR, ICML, CVPR, ACL) and publishing company research blogs.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to check grammar and citation consistency in LaTeX documents; author core scientific hypotheses and methodology directly.',
          handsOnTask: 'Format your capstone research paper in standard NeurIPS LaTeX template with vector plots, complete bibliography, and an open-source reproducibility script.',
          projectApplication: 'Produces the academic paper artifact for the Capstone Research project.',
          resources: [
            { title: 'NeurIPS Paper Submission Guidelines', url: 'https://neurips.cc/Conferences/2024/PaperInformation', type: 'guidelines' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'res-interview-prep',
          title: 'AI Research Interviews: Math Derivations & Paper Discussions',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['res-paper-writing'],
          description: 'Excel in research lab interviews: live mathematical derivations on whiteboards, deep paper discussions, defending experimental choices, and research research talks.',
          whatToLearn: [
            'Whiteboard math derivations: deriving backprop for attention layers, deriving the VAE ELBO, deriving DPO gradients',
            'Preparing a 45-minute technical research job talk presenting your capstone research project',
            'Defending experimental methodology against tough interrogation by research scientists',
            'Behavioral questions assessing research persistence through multi-month failed experiment cycles'
          ],
          whyItMatters: 'Research labs (OpenAI, DeepMind, Anthropic, Meta FAIR) hire engineers who combine deep mathematical intuition with world-class PyTorch systems implementation skills.',
          productionUse: 'Securing Research Engineer, Member of Technical Staff (MTS), and Applied Scientist positions.',
          aiRelevance: 'Core',
          aiWorkflow: 'Conduct mock whiteboard derivation drills with AI; practice explaining complex loss functions verbally.',
          handsOnTask: 'Deliver a recorded 30-minute technical research presentation on your replicated paper project and defend its methodology against simulated peer-review questions.',
          projectApplication: 'Prepares you directly for research lab interview panels.',
          resources: [
            { title: 'How to Give a Great Research Talk', url: 'https://www.cs.cmu.edu/~mws/talk.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'res-proj-1',
      title: 'Landmark AI Research Paper Replication & Ablation Study',
      difficulty: 'Beginner',
      estimatedTime: '4 weeks',
      objective: 'Select and independently replicate the core empirical findings of a landmark machine learning paper from scratch in PyTorch with rigorous ablation studies.',
      technologies: ['PyTorch', 'NumPy', 'Matplotlib', 'Weights & Biases', 'LaTeX'],
      skillsPracticed: ['Paper replication', 'Custom PyTorch architectures', 'Ablation study design', 'Reproducibility seeding', 'Scientific reporting'],
      requirements: [
        'Replicate a published paper (e.g., Vision Transformer ViT, ResNet, or LoRA) from mathematical equations without copying official code',
        'Run controlled ablation experiments systematically disabling key components (e.g., removing skip connections or positional encodings)',
        'Report mean, standard deviation, and p-values across 3 distinct random seeds',
        'Compare replicated performance against the original paper’s reported numbers and explain discrepancies'
      ],
      deliverables: [
        'Clean, reproducible GitHub repository with a single script to reproduce all figures',
        'Weights & Biases public dashboard tracking all training runs and ablations',
        '4-page conference-style PDF report in LaTeX documenting replication methodology'
      ],
      productionExpectations: [
        'Deterministic reproducible results verified via fixed seed initializations',
        'Zero undocumented training hacks or unstated hyperparameter modifications'
      ],
      aiIntegration: 'Use AI to generate LaTeX tables comparing paper baseline metrics with replication outputs.'
    },
    {
      id: 'res-proj-2',
      title: 'Denoising Diffusion Probabilistic Model (DDPM) from Scratch',
      difficulty: 'Intermediate',
      estimatedTime: '5-6 weeks',
      objective: 'Implement, train, and evaluate a Denoising Diffusion Probabilistic Model (DDPM) in pure PyTorch with U-Net architecture, noise scheduling, and FID evaluation.',
      technologies: ['PyTorch', 'U-Net', 'torchvision', 'CUDA', 'Weights & Biases', 'Torch-FID'],
      skillsPracticed: ['Diffusion mathematics', 'Custom U-Net architecture', 'Forward/reverse SDEs', 'FID score calculation', 'Mixed precision training'],
      requirements: [
        'Implement forward diffusion noise schedule (linear/cosine beta schedules) and analytical posterior sampling',
        'Build a U-Net architecture with sinusoidal time embeddings, residual blocks, and spatial self-attention layers',
        'Train model using mixed precision (bfloat16) on GPU to generate 32x32 or 64x64 synthetic images',
        'Evaluate generated image diversity and quality using Fréchet Inception Distance (FID) benchmark'
      ],
      deliverables: [
        'Documented PyTorch codebase with clear mathematical comments connecting code to DDPM paper equations',
        'Visualization animation showing the reverse diffusion denoising process from pure noise to clear images',
        'Benchmark report detailing FID score progression across training epochs'
      ],
      productionExpectations: [
        'Verified gradient stability without NaN values during reverse diffusion sampling',
        'Memory-efficient training with gradient accumulation and activation checkpointing'
      ],
      aiIntegration: 'Use AI to assist in deriving the analytical closed-form shortcut equation for sampling q(x_t | x_0) directly at arbitrary timestep t.'
    },
    {
      id: 'res-proj-3',
      title: 'Direct Preference Optimization (DPO) Alignment Research Pipeline',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Build an end-to-end alignment research pipeline: implement the DPO loss function, fine-tune an open-source LLM on preference data across multiple GPUs with FSDP, and evaluate win rates.',
      technologies: ['PyTorch', 'Hugging Face Transformers', 'FSDP', 'DPO Algorithm', 'Weights & Biases', 'AlpacaEval'],
      skillsPracticed: ['Mathematical derivation', 'Alignment research', 'Multi-GPU FSDP training', 'LLM-as-a-judge evaluation', 'Scientific paper writing'],
      requirements: [
        'Implement the Direct Preference Optimization (DPO) loss equation in PyTorch autograd from mathematical first principles',
        'Train an open-source language model across multi-GPU hardware using PyTorch FSDP and mixed precision',
        'Evaluate aligned model against SFT baseline using automated LLM-as-a-Judge (AlpacaEval / MT-Bench) to measure win rate',
        'Conduct ablation experiments testing the impact of the beta regularization temperature parameter on response length bias and reward hacking'
      ],
      deliverables: [
        'Fully reproducible multi-GPU training repository with clear execution scripts',
        'Weights & Biases public dashboard tracking implicit reward margins and policy loss',
        'Complete 8-page academic research paper written in LaTeX detailing the research findings and ablation analysis'
      ],
      productionExpectations: [
        'Zero reward hacking or degenerate repetitive output loops in aligned model generations',
        'Full mathematical alignment with original DPO theoretical derivations'
      ],
      aiIntegration: 'Use AI to generate synthetic adversarial evaluation prompts to stress-test aligned model guardrails.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Advanced mathematics for ML: Linear algebra (SVD, eigenvalues), calculus (Jacobians, Hessians), and optimization',
      'Information theory fundamentals: Entropy, Cross-Entropy, and KL Divergence',
      'PyTorch systems internals: custom autograd.Function passes and GPU memory profiling',
      'Scientific research methodology: hypothesis formulation, controlled ablation studies, seed variance',
      'Generative modeling mathematics: Variational Autoencoders (VAEs) and Diffusion Models (DDPM)',
      'Distributed multi-GPU training: DistributedDataParallel (DDP) and Fully Sharded Data Parallel (FSDP)',
      'Experiment tracking and hyperparameter sweeps with Weights & Biases or MLflow',
      'AI Alignment algorithms: Reinforcement Learning from Human Feedback (RLHF), PPO, and DPO',
      'Empirical scaling laws: Chinchilla compute-optimal allocation and FLOPs counting',
      'Scientific communication: LaTeX typesetting, Overleaf, and ArXiv preprint preparation'
    ],
    projects: [
      'Landmark AI research paper replication with controlled ablation studies and seed variance',
      'Denoising Diffusion Probabilistic Model (DDPM) implemented from mathematical equations in PyTorch',
      'Direct Preference Optimization (DPO) alignment pipeline with multi-GPU FSDP and academic paper',
      'All codebases released publicly with reproducible scripts and open Weights & Biases dashboards'
    ],
    csFundamentals: [
      'Distributed systems communication primitives: All-Reduce, Broadcast, Gather, Scatter over NCCL',
      'Hardware accelerator architecture: GPU streaming multiprocessors (SMs), tensor cores, high-bandwidth memory (HBM)',
      'Numerical analysis: floating point representations (FP32, FP16, BF16), underflow/overflow prevention',
      'Computational complexity: FLOPs analysis of attention mechanisms and transformer layers'
    ],
    tools: [
      'Deep learning frameworks: PyTorch and torchvision',
      'Distributed computing toolkits: PyTorch FSDP, DeepSpeed, torchrun',
      'Experiment tracking platforms: Weights & Biases (W&B) and MLflow',
      'Scientific document preparation: LaTeX, Overleaf, and BibTeX'
    ],
    deployment: [
      'Running distributed workloads across multi-GPU compute clusters (Slurm, RunPod, AWS EC2 p4d)',
      'Releasing pretrained and aligned model weights to Hugging Face Model Hub',
      'Publishing reproducible evaluation code on GitHub with pinned environments (pyproject.toml/Dockerfile)',
      'Submitting preprints to arXiv and open-access academic conferences'
    ],
    portfolio: [
      'Academic research portfolio featuring links to published ArXiv preprints and conference papers',
      'Public Weights & Biases dashboards demonstrating transparent experimental tracking',
      'In-depth technical research blog posts breaking down complex mathematical derivations',
      'Clean GitHub repositories featuring the ML Reproducibility Checklist badge'
    ],
    github: [
      'Public repositories with single-script reproduction commands (bash run_experiments.sh)',
      'Comprehensive READMEs with mathematical formulas, architecture diagrams, and result tables',
      'Clean commit history following Conventional Commits format',
      'Pretrained checkpoint download links hosted on Hugging Face or public cloud storage'
    ],
    resume: [
      'Single-page ATS-compliant AI Research Engineer resume in standard PDF format',
      'Bullet points highlighting novel contributions, ArXiv publications, and multi-GPU training scale',
      'Direct clickable links to papers, GitHub codebases, and LinkedIn profile',
      'Keywords matching AI research scientist, research engineer, and foundation model researcher roles'
    ],
    interviewReadiness: [
      'Mastery of live mathematical derivations on whiteboards (Attention backprop, ELBO, DPO)',
      'Ability to deliver a compelling 45-minute technical research talk on your capstone project',
      'Defending experimental methodology and ablation choices against rigorous peer interrogation',
      'Clear explanations of scaling laws, distributed training bottlenecks, and alignment trade-offs'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['aiResearch'] = aiResearchRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = aiResearchRoadmap;
}
