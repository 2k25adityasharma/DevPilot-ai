/**
 * DevPilot-AI — Career Roadmap: AI Engineer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const aiEngineerRoadmap = {
  roleId: 'ai-engineer',
  roadmapId: 'aiEngineer',
  title: 'AI Engineer',
  category: 'data-ai',
  description: 'Bridge foundational machine learning with cutting-edge artificial intelligence systems: PyTorch deep learning, Transformer architectures, Foundation Model APIs, Retrieval-Augmented Generation (RAG), vector databases, and scalable inference deployment.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Mathematics for deep learning, PyTorch fundamentals, tensors, backpropagation, and neural network basics.',
      skills: [
        {
          id: 'ai-pytorch-tensors',
          title: 'PyTorch Fundamentals, Tensors & Autograd',
          category: 'Deep Learning Core',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master deep learning tensors: multidimensional PyTorch tensors, GPU acceleration with CUDA, automatic differentiation (autograd), and building custom training loops.',
          whatToLearn: [
            'PyTorch tensor basics: shapes, dimensions, indexing, slicing, reshaping, squeezing, unsqueezing',
            'Hardware acceleration: moving tensors between CPU and GPU (tensor.to("cuda") or MPS on Mac)',
            'Automatic differentiation with torch.autograd: computational graphs, tensor.backward(), and gradient accumulation',
            'Building neural networks with torch.nn: nn.Module, nn.Linear, activation functions (ReLU, GELU, Sigmoid)',
            'Standard training loop lifecycle: forward pass, loss calculation (nn.CrossEntropyLoss), loss.backward(), optimizer.step(), optimizer.zero_grad()'
          ],
          whyItMatters: 'PyTorch is the undisputed primary research and production deep learning framework worldwide. Mastery of tensors and backprop is mandatory for all AI work.',
          productionUse: 'Training custom neural networks, fine-tuning pretrained models, and optimizing tensor computations.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to explain tensor broadcasting shape mismatches and generate synthetic dataset loaders.',
          handsOnTask: 'Build a multi-layer perceptron (MLP) from scratch in pure PyTorch that trains on the Fashion-MNIST dataset and achieves 88%+ test accuracy.',
          projectApplication: 'Provides the deep learning engine for the Multimodal Visual Classifier project.',
          resources: [
            { title: 'Deep Learning with PyTorch (Official Tutorials)', url: 'https://pytorch.org/tutorials/', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ai-dl-foundations',
          title: 'Deep Learning Foundations: CNNs, RNNs & Regularization',
          category: 'Neural Architectures',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['ai-pytorch-tensors'],
          description: 'Master foundational neural architectures: Convolutional Neural Networks (CNNs: convolutions, pooling, stride), Recurrent Neural Networks (RNNs, LSTMs), Dropout, and Batch Normalization.',
          whatToLearn: [
            'Convolutional operations: kernel filters, padding, stride, receptive fields, and MaxPool2d',
            'CNN architectures: LeNet, ResNet (residual skip connections to prevent vanishing gradients)',
            'Sequence modeling: Recurrent Neural Networks (RNNs), Long Short-Term Memory (LSTM), and Gated Recurrent Units (GRU)',
            'Regularization techniques: Dropout, Weight Decay (L2 regularization), Batch Normalization, and Layer Normalization',
            'Transfer learning: loading pretrained torchvision models (ResNet-50) and fine-tuning classification heads'
          ],
          whyItMatters: 'Understanding feature maps, spatial representations, and sequential memory provides the essential intuition needed to comprehend modern Transformers.',
          productionUse: 'Computer vision classification, feature embedding extraction, and sequential time-series modeling.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to generate boilerplate dataset augmentation pipelines (torchvision transforms); monitor training vs validation loss curves manually to spot overfitting.',
          handsOnTask: 'Fine-tune a pretrained ResNet model on a custom medical image dataset using data augmentation, learning rate scheduling, and early stopping.',
          projectApplication: 'Core architecture for the Multimodal Visual Classifier project.',
          resources: [
            { title: 'CS231n: Deep Learning for Computer Vision (Stanford)', url: 'https://cs231n.github.io/', type: 'course' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'The Transformer architecture, self-attention mechanisms, Hugging Face Transformers, and text tokenization.',
      skills: [
        {
          id: 'ai-transformers-attention',
          title: 'The Transformer Architecture & Self-Attention Mechanisms',
          category: 'Modern Architectures',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: ['ai-dl-foundations'],
          description: 'Deconstruct the paper "Attention Is All You Need": Scaled Dot-Product Attention, Multi-Head Attention, Query/Key/Value vectors, positional encodings, and Encoder-Decoder architectures.',
          whatToLearn: [
            'Why Attention replaced RNNs: parallelization, eliminating vanishing gradients across long context windows',
            'Scaled Dot-Product Attention formula: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V',
            'Multi-Head Attention: splitting projection subspaces to capture diverse relationship types',
            'Positional encodings: sinusoidal positional encodings vs modern Rotary Positional Embeddings (RoPE)',
            'Architectural variants: Encoder-only (BERT), Decoder-only (GPT, Llama), and Encoder-Decoder (T5)'
          ],
          whyItMatters: 'The Transformer is the foundational architectural backbone powering all modern Large Language Models, vision transformers (ViT), and multimodal AI systems.',
          productionUse: 'Underpins every modern generative AI model (GPT-4, Claude, Gemini, Llama 3, Mistral).',
          aiRelevance: 'Core',
          aiWorkflow: 'Step through attention matrix calculations line-by-line in Python; use AI to help visualize attention weight heatmaps between tokens.',
          handsOnTask: 'Implement a minimal Scaled Dot-Product and Multi-Head Attention layer in pure PyTorch and verify its tensor dimensions against dummy inputs.',
          projectApplication: 'Provides the deep theoretical understanding needed for fine-tuning and deploying LLM systems.',
          resources: [
            { title: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'guide' },
            { title: 'Attention Is All You Need (Original Paper)', url: 'https://arxiv.org/abs/1706.03762', type: 'paper' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ai-huggingface-tokenizers',
          title: 'Hugging Face Ecosystem, Tokenizers & Model Hub',
          category: 'AI Tooling',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['ai-transformers-attention'],
          description: 'Master the open-source AI standard: Hugging Face Transformers, tokenizers (Byte-Pair Encoding, WordPiece), Datasets library, Pipelines, and model quantization (bitsandbytes).',
          whatToLearn: [
            'Hugging Face Transformers library: AutoModel, AutoTokenizer, AutoConfig, and pipeline abstraction',
            'Tokenization mechanics: Byte-Pair Encoding (BPE), SentencePiece, special tokens (<bos>, <eos>, <pad>), and vocabulary truncation',
            'Hugging Face Datasets: streaming large datasets, map/filter operations, and dataset caching',
            'Model quantization: 8-bit and 4-bit quantization (bitsandbytes, AWQ, GGUF) for running large models on consumer GPUs',
            'Generating text with generation strategies: Greedy search, Beam search, Temperature, Top-K, Top-P (nucleus) sampling'
          ],
          whyItMatters: 'Hugging Face is the standard operating environment for open-source AI engineering. Every AI engineer must be fluent in its APIs.',
          productionUse: 'Loading open-source foundation models (Llama 3, Mistral), tokenizing inputs, and executing inference pipelines.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to generate sample dataset mapping functions; inspect tokenizer outputs to prevent subtle padding and truncation bugs.',
          handsOnTask: 'Build a document semantic classifier using a pretrained Hugging Face Transformer and evaluate the latency difference between 16-bit and 4-bit quantized inference.',
          projectApplication: 'Core library used across all intermediate and capstone AI projects.',
          resources: [
            { title: 'Hugging Face NLP Course (Official)', url: 'https://huggingface.co/learn/nlp-course', type: 'course' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Foundation model APIs, prompt engineering, structured outputs, and embeddings.',
      skills: [
        {
          id: 'ai-llm-apis-structured',
          title: 'Foundation Model APIs, Prompt Engineering & Structured Outputs',
          category: 'Generative AI',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['ai-huggingface-tokenizers'],
          description: 'Build production software on LLM APIs (OpenAI, Anthropic, Gemini): system prompts, few-shot prompting, chain-of-thought, function calling, tool use, and strict JSON structured outputs with Pydantic.',
          whatToLearn: [
            'Commercial LLM APIs: OpenAI SDK, Anthropic Messages API, Google GenAI SDK, unified gateways (LiteLLM)',
            'Prompt engineering patterns: Persona adoption, Few-Shot prompting, Chain-of-Thought (CoT), self-consistency',
            'Guaranteed structured outputs: JSON mode, Pydantic schema validation, and OpenAI Structured Outputs (json_schema)',
            'Function calling & tool use: defining tool JSON schemas, executing client functions, and passing returns back to the model',
            'Cost and token management: token counting (tiktoken), context window limits, prompt caching (Anthropic Prompt Caching), and streaming responses'
          ],
          whyItMatters: 'Enterprise software requires deterministic structured data, not loose chat responses. Mastering tool use and structured JSON outputs makes LLMs reliable.',
          productionUse: 'Building customer support agents, automated document extraction pipelines, and code generation tools.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use LLM APIs directly to build robust client applications; always validate LLM outputs against strict Pydantic schemas before persisting.',
          handsOnTask: 'Build an automated resume-to-database parser that extracts contact info, experience, and skills into strict Pydantic models with 100% schema guarantee.',
          projectApplication: 'Powers the structured extraction layer in the Enterprise RAG Platform.',
          resources: [
            { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', type: 'guide' },
            { title: 'Anthropic Interactive Prompt Engineering Tutorial', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ai-embeddings-vector-db',
          title: 'Vector Embeddings, Semantic Search & Vector Databases',
          category: 'Vector Search',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['ai-llm-apis-structured'],
          description: 'Master dense vector representations and vector search: text embeddings (OpenAI text-embedding-3, BGE, Cohere), distance metrics (Cosine, Dot Product, Euclidean), and vector databases (Pinecone, Qdrant, Chroma, pgvector).',
          whatToLearn: [
            'Embedding intuition: mapping semantic concepts into high-dimensional geometric vector space',
            'Similarity metrics: Cosine Similarity, Dot Product, Euclidean (L2) distance',
            'Approximate Nearest Neighbor (ANN) indexing algorithms: HNSW (Hierarchical Navigable Small World), IVF (Inverted File Index)',
            'Vector databases: pgvector (PostgreSQL), Chroma (embedded), Pinecone (cloud managed), and Qdrant (self-hosted)',
            'Vector metadata filtering: combining semantic search with relational SQL filters (hybrid filtering)'
          ],
          whyItMatters: 'Keyword search fails when users search for conceptual meanings rather than exact words. Vector embeddings unlock semantic search across millions of documents.',
          productionUse: 'Powering semantic product search, recommendation engines, and context retrieval in RAG systems.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use vector embedding APIs to index documents; evaluate retrieval quality using precision-at-k and mean reciprocal rank (MRR).',
          handsOnTask: 'Build a semantic document search engine using pgvector that indexes 10,000 technical articles and allows hybrid search by topic and date.',
          projectApplication: 'Provides the vector search database layer for the Production RAG Platform.',
          resources: [
            { title: 'Pinecone Learning Center: What is a Vector Database?', url: 'https://www.pinecone.io/learn/vector-database/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Retrieval-Augmented Generation (RAG), chunking strategies, rerankers, agents, and RAG evaluation with Ragas.',
      skills: [
        {
          id: 'ai-advanced-rag',
          title: 'Advanced Retrieval-Augmented Generation (RAG) Architectures',
          category: 'RAG Systems',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['ai-embeddings-vector-db'],
          description: 'Engineer production RAG systems: intelligent document chunking (semantic, sliding window), Hybrid Search (BM25 + Dense vectors), Cross-Encoder Reranking (Cohere), and query transformations.',
          whatToLearn: [
            'Document ingestion & parsing: parsing PDFs, markdown, tables, and handling layout structure (Unstructured, LlamaParse)',
            'Chunking strategies: recursive character splitting, semantic chunking, and parent-document retrieval',
            'Hybrid Search: combining sparse keyword search (BM25) with dense vector search using Reciprocal Rank Fusion (RRF)',
            'Reranking: using Cross-Encoder models (Cohere Rerank, BGE-Reranker) to score and filter top-k retrieved contexts',
            'Query transformations: Query Rewriting, Multi-Query Expansion, and Hypothetical Document Embeddings (HyDE)',
            'Citation attribution: forcing the LLM to output verbatim inline citations referencing exact retrieved chunks'
          ],
          whyItMatters: 'Naive RAG retrieves irrelevant or incomplete context, causing LLM hallucinations. Advanced RAG is mandatory for production enterprise search.',
          productionUse: 'Enterprise internal knowledge search, automated customer support, and legal contract analysis.',
          aiRelevance: 'Core',
          aiWorkflow: 'Build robust multi-stage RAG pipelines; evaluate context relevance and answer faithfulness using automated test benchmarks.',
          handsOnTask: 'Build an Advanced RAG system over a 500-page complex PDF manual featuring hybrid BM25+vector search, Cohere reranking, and inline source citations.',
          projectApplication: 'Core architecture for the Enterprise Knowledge Base RAG Assistant project.',
          resources: [
            { title: 'LlamaIndex Advanced RAG Guide', url: 'https://docs.llamaindex.ai/en/stable/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ai-eval-guardrails',
          title: 'AI Evaluation (Ragas), Hallucination Detection & Guardrails',
          category: 'Evaluation & Safety',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['ai-advanced-rag'],
          description: 'Measure and secure AI systems: automated evaluation with Ragas (Faithfulness, Answer Relevance, Context Recall), LLM-as-a-judge, prompt injection defense, and Guardrails (NeMo / Llama Guard).',
          whatToLearn: [
            'RAG evaluation metrics with Ragas: Faithfulness (hallucination detection), Answer Relevance, Context Precision, Context Recall',
            'LLM-as-a-Judge methodology: building automated scoring rubrics with pairwise comparison and calibration',
            'Security vulnerabilities: Direct prompt injection, indirect prompt injection via retrieved web data, jailbreaks, data exfiltration',
            'Input & output guardrails: NeMo Guardrails, Llama Guard, and regex moderation filters to block harmful queries and toxic outputs',
            'Observability and tracing: Langfuse / Arize Phoenix for tracking cost, latency, and user feedback traces'
          ],
          whyItMatters: 'Without automated evaluation, any change to a prompt or chunking strategy risks quietly degrading answer quality in production.',
          productionUse: 'Continuous CI/CD quality regression testing for generative AI applications before releasing updates.',
          aiRelevance: 'Core',
          aiWorkflow: 'Implement automated Ragas evaluation test suites that run against a synthetic ground-truth question-answer benchmark on every PR.',
          handsOnTask: 'Create an automated evaluation pipeline using Ragas that benchmarks a RAG system across 50 test cases and alerts if faithfulness drops below 0.90.',
          projectApplication: 'Provides automated quality verification for the Enterprise RAG Platform.',
          resources: [
            { title: 'Ragas Official Documentation', url: 'https://docs.ragas.io/', type: 'documentation' },
            { title: 'OWASP Top 10 for LLM Applications', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', type: 'security' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Fine-tuning with LoRA/QLoRA, production inference serving with vLLM, and AI engineering technical interviews.',
      skills: [
        {
          id: 'ai-finetuning-peft',
          title: 'Parameter-Efficient Fine-Tuning (LoRA / QLoRA) & vLLM Serving',
          category: 'Model Specialization & Serving',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['ai-eval-guardrails'],
          description: 'Specialize and deploy open-source models: Parameter-Efficient Fine-Tuning (PEFT), Low-Rank Adaptation (LoRA / QLoRA), SFT with TRL/Unsloth, and high-throughput serving with vLLM (PagedAttention).',
          whatToLearn: [
            'When to fine-tune vs when to use RAG: style/format specialization vs external knowledge retrieval',
            'LoRA (Low-Rank Adaptation) math: freezing base weights and training low-rank decomposition matrices (A and B)',
            'QLoRA: 4-bit NormalFloat (NF4) quantization enabling 70B model fine-tuning on consumer GPU hardware',
            'Supervised Fine-Tuning (SFT) workflows using Hugging Face TRL (SFTTrainer) and Unsloth',
            'High-throughput serving engines: vLLM, PagedAttention (eliminating KV cache memory fragmentation), continuous batching'
          ],
          whyItMatters: 'Fine-tuning allows companies to embed proprietary terminology and output formats into compact open-source models, dramatically reducing API costs.',
          productionUse: 'Deploying self-hosted private LLM clusters that serve internal enterprise queries with zero data sharing.',
          aiRelevance: 'Core',
          aiWorkflow: 'Prepare high-quality instruction-tuning JSONL datasets; evaluate test set perplexity and task accuracy before merging adapter weights.',
          handsOnTask: 'Fine-tune a Llama-3-8B model using QLoRA on a specialized medical or legal dataset and deploy it for high-throughput inference using vLLM.',
          projectApplication: 'Powers the self-hosted specialized model in the Autonomous AI Agent & Fine-Tuned Copilot project.',
          resources: [
            { title: 'Hugging Face PEFT Documentation', url: 'https://huggingface.co/docs/peft/index', type: 'documentation' },
            { title: 'vLLM Official Documentation', url: 'https://docs.vllm.ai/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'ai-portfolio-interview',
          title: 'AI Engineering Portfolio, System Design & Interviews',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['ai-finetuning-peft'],
          description: 'Package production AI applications: live deployed web applications, architecture case studies detailing latency/cost optimization, AI System Design interview preparation, and an ATS resume.',
          whatToLearn: [
            'AI System Design interview loops: designing GitHub Copilot, ChatGPT for Enterprise, or Multimodal Customer Service Agent',
            'Latency & cost optimization trade-offs: streaming vs batching, prompt caching, small vs large model routing',
            'Demonstrating live AI projects: building clean web frontends (Next.js / Streamlit) connected to live LLM backends with streaming text',
            'Writing quantifiable AI engineering resume bullets highlighting latency reductions, hallucination reduction metrics, and API cost savings'
          ],
          whyItMatters: 'The AI engineering market rewards developers who can demonstrate working production software with measurable evaluation metrics over prompt hype.',
          productionUse: 'Securing AI Engineer, Applied ML Engineer, and GenAI Developer positions.',
          aiRelevance: 'Core',
          aiWorkflow: 'Use AI to simulate technical interview rounds on vector search indexing, RAG failure modes, and PagedAttention mechanics.',
          handsOnTask: 'Publish your capstone AI application with a live web interface, automated evaluation test reports, and an architecture decision record.',
          projectApplication: 'Presents your complete AI engineering portfolio to tech leaders and hiring teams.',
          resources: [
            { title: 'Chip Huyen: Building LLM Applications for Production', url: 'https://huyenchip.com/2023/04/11/llm-engineering.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'ai-proj-1',
      title: 'Multimodal Visual Defect Classifier with PyTorch & Transfer Learning',
      difficulty: 'Beginner',
      estimatedTime: '3-4 weeks',
      objective: 'Build, train, and evaluate a deep learning image classification model in PyTorch using transfer learning, custom data augmentation, and Grad-CAM visual explanations.',
      technologies: ['PyTorch', 'torchvision', 'NumPy', 'Matplotlib', 'Streamlit', 'OpenCV'],
      skillsPracticed: ['Tensor manipulation', 'Transfer learning (ResNet)', 'Data augmentation', 'Evaluation metrics', 'Grad-CAM interpretability'],
      requirements: [
        'Custom PyTorch Dataset and DataLoader handling image loading and real-time data augmentations',
        'Transfer learning fine-tuning of a pretrained ResNet-50 / ConvNeXt model on a manufacturing defect image dataset',
        'Evaluation reporting accuracy, precision, recall, and a normalized Confusion Matrix',
        'Grad-CAM (Gradient-weighted Class Activation Mapping) visualization highlighting the exact pixels triggering the defect prediction'
      ],
      deliverables: [
        'Documented PyTorch training repository with clean training curves',
        'Streamlit web demo allowing users to upload an image and view real-time defect classification and Grad-CAM heatmap',
        'Model weights exported and saved in PyTorch format'
      ],
      productionExpectations: [
        'Over 92% validation accuracy with verified convergence and no severe overfitting',
        'Clean modular code separating model definition, dataset loading, and training loop'
      ],
      aiIntegration: 'Use AI to assist in setting up Grad-CAM backward hook registration logic.'
    },
    {
      id: 'ai-proj-2',
      title: 'Enterprise Knowledge Base RAG Assistant with Hybrid Search & Ragas',
      difficulty: 'Intermediate',
      estimatedTime: '5-6 weeks',
      objective: 'Develop an enterprise-grade Retrieval-Augmented Generation (RAG) platform with document parsing, hybrid search (BM25 + pgvector), Cohere reranking, and automated Ragas evaluation.',
      technologies: ['Python', 'OpenAI / Claude API', 'pgvector (PostgreSQL)', 'LlamaIndex / LangChain', 'Cohere Rerank', 'Ragas', 'FastAPI'],
      skillsPracticed: ['Document chunking', 'Hybrid search (BM25 + vectors)', 'Reranking models', 'Ragas automated evaluation', 'Inline citation attribution'],
      requirements: [
        'Ingest multi-page PDF documents and parse structured text, tables, and headers',
        'Hybrid retrieval combining sparse BM25 keyword matching and dense vector embeddings using Reciprocal Rank Fusion (RRF)',
        'Cross-Encoder reranker filtering the top 20 candidate chunks down to the 5 most relevant context snippets',
        'Strict inline citation requirements forcing the LLM to provide verifiable source quotes for every factual assertion',
        'Automated Ragas evaluation test suite verifying faithfulness score > 0.90 and answer relevance > 0.85 across 30 test questions'
      ],
      deliverables: [
        'Containerized FastAPI backend serving streaming chat completions over WebSockets or Server-Sent Events',
        'Automated test execution report displaying Ragas evaluation score benchmarks',
        'Architecture documentation detailing the multi-stage retrieval and reranking pipeline'
      ],
      productionExpectations: [
        'Zero hallucinated answers through strict prompt guardrails when information is absent from context',
        'Sub-2 second time-to-first-token response streaming'
      ],
      aiIntegration: 'Use AI to generate synthetic ground-truth question-answer pairs for Ragas automated benchmark testing.'
    },
    {
      id: 'ai-proj-3',
      title: 'Autonomous Multi-Tool AI Agent & Fine-Tuned Copilot Platform',
      difficulty: 'Production',
      estimatedTime: '7-8 weeks',
      objective: 'Architect an enterprise autonomous AI agent platform with tool calling (SQL execution, web search, code runner), memory persistence, QLoRA fine-tuning, and vLLM serving.',
      technologies: ['Python', 'FastAPI', 'Next.js 14', 'vLLM', 'QLoRA / PEFT', 'Langfuse', 'Docker'],
      skillsPracticed: ['Agentic tool use', 'QLoRA fine-tuning', 'vLLM PagedAttention deployment', 'Prompt injection guardrails', 'Observability tracing'],
      requirements: [
        'Autonomous agent workflow executing multi-step task decomposition with dynamic tool execution (SQL database query, calculator, API search)',
        'Fine-tuned open-source model (Llama-3-8B) using QLoRA on domain-specific enterprise instructions to produce strict output formats',
        'High-throughput model serving deployment using vLLM with PagedAttention and continuous batching',
        'Production guardrails protecting against prompt injection attacks and exfiltration of sensitive data',
        'Full observability tracing using Langfuse to monitor token costs, tool call success rates, and user satisfaction ratings'
      ],
      deliverables: [
        'Live deployed full-stack application with Next.js streaming frontend and FastAPI backend',
        'Fine-tuning training log report showing adapter convergence and validation loss',
        'Comprehensive architecture RFC document detailing agent safety limits and loop termination conditions'
      ],
      productionExpectations: [
        'Strict recursion depth limits preventing infinite agent loops',
        'Graceful tool error handling allowing the agent to self-correct when API tools fail'
      ],
      aiIntegration: 'Integrate the fine-tuned model directly into the multi-agent workflow to serve as a fast local tool caller.'
    }
  ],
  checklist: {
    technicalSkills: [
      'PyTorch deep learning: tensors, GPU acceleration (CUDA), autograd, and custom training loops',
      'Neural network architectures: CNNs, ResNets, RNNs, LSTMs, and Layer Normalization',
      'The Transformer Architecture: Self-Attention mechanisms, Multi-Head Attention, and RoPE',
      'Hugging Face ecosystem: Transformers, Tokenizers (BPE), Datasets, and quantization (bitsandbytes)',
      'Foundation model APIs (OpenAI, Anthropic, Gemini): streaming, token management, and structured JSON outputs',
      'Vector embeddings and semantic search with vector databases (pgvector, Pinecone, Chroma, Qdrant)',
      'Advanced RAG: semantic chunking, Hybrid Search (BM25 + dense vectors), and Cross-Encoder rerankers',
      'AI evaluation and safety: Ragas metrics (Faithfulness, Relevance), LLM-as-a-judge, and guardrails',
      'Parameter-Efficient Fine-Tuning (PEFT) with LoRA and QLoRA on open-source foundation models',
      'High-throughput model serving with vLLM, PagedAttention, and containerized FastAPI endpoints'
    ],
    projects: [
      'Multimodal visual defect classifier in PyTorch with transfer learning and Grad-CAM',
      'Enterprise knowledge base RAG assistant with hybrid search, rerankers, and Ragas evaluation',
      'Autonomous multi-tool AI agent platform with QLoRA fine-tuning and vLLM serving',
      'All projects deployed with live web interfaces and public reproducible codebases'
    ],
    csFundamentals: [
      'Linear algebra: vectors, matrices, dot products, vector spaces, and cosine distance',
      'Calculus and optimization: partial derivatives, chain rule, gradient descent, and loss surfaces',
      'Probability theory: distributions, maximum likelihood estimation, and entropy',
      'Distributed systems basics: GPU memory constraints, KV cache sizing, and parallel inference'
    ],
    tools: [
      'Deep learning frameworks: PyTorch and torchvision',
      'AI libraries: Hugging Face Transformers, LlamaIndex, LangChain, LiteLLM',
      'Evaluation and observability platforms: Ragas, Langfuse, Arize Phoenix',
      'Model serving engines: vLLM, Ollama, and FastAPI'
    ],
    deployment: [
      'Deploying containerized AI inference microservices to GPU cloud instances (RunPod, Lambda, AWS EC2)',
      'Serving live interactive web frontends on Vercel or Hugging Face Spaces',
      'Automated CI/CD pipelines executing model regression tests on push',
      'Secure API key management and token consumption budget rate limiters'
    ],
    portfolio: [
      'AI engineering portfolio showcasing live deployed streaming applications',
      'In-depth architectural case studies detailing RAG retrieval strategies and evaluation metrics',
      'Clean demonstration videos showcasing agent tool calling and real-time inference',
      'Transparent documentation highlighting latency benchmarks and cost per query'
    ],
    github: [
      'Public GitHub repositories with clean documentation and one-command Docker setups',
      'Clear requirements.txt / pyproject.toml specifying exact dependency versions',
      'Clean commit history following Conventional Commits format',
      'Automated CI badges showing passing test suites and linting checks'
    ],
    resume: [
      'Single-page ATS-compliant AI Engineer resume in PDF format',
      'Bullet points highlighting quantifiable AI metrics: latency reduction, Ragas faithfulness scores, API cost savings',
      'Direct links to live web demos, GitHub repositories, and LinkedIn profile',
      'Targeted keywords matching AI engineer, generative AI developer, and LLM engineer openings'
    ],
    interviewReadiness: [
      'Mastery of Transformer mathematical mechanics and Attention calculation derivations',
      'Fluency in AI System Design whiteboard interviews (Enterprise RAG, Autonomous Copilot, Semantic Search)',
      'Ability to explain trade-offs: RAG vs Fine-Tuning, dense vs sparse search, model quantization impacts',
      'Structured STAR behavioral stories communicating AI project delivery and model hallucination debugging'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['aiEngineer'] = aiEngineerRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = aiEngineerRoadmap;
}
