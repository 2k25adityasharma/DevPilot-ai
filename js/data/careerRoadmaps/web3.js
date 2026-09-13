/**
 * DevPilot-AI — Career Roadmap: Web3 Developer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const web3Roadmap = {
  roleId: 'web3-developer',
  roadmapId: 'web3',
  title: 'Web3 Developer',
  category: 'development',
  description: 'Develop decentralized applications (dApps) and secure smart contracts on EVM-compatible blockchains: Solidity, Foundry, smart contract security, tokens, and web3 frontend integration.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Blockchain architecture, cryptography, Ethereum Virtual Machine (EVM), and wallet fundamentals.',
      skills: [
        {
          id: 'w3-crypto-foundations',
          title: 'Blockchain Architecture & Cryptographic Primitives',
          category: 'Blockchain Fundamentals',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: [],
          description: 'Master decentralized ledger mechanics: cryptographic hashing (Keccak-256), public-key cryptography (ECDSA), digital signatures, consensus algorithms (PoS), and peer-to-peer networks.',
          whatToLearn: [
            'Distributed ledger architecture: blocks, chains, Merkle trees, and state roots',
            'Cryptography: SHA-256, Keccak-256 hash functions, asymmetric key pairs (private vs public keys)',
            'Elliptic Curve Digital Signature Algorithm (ECDSA, secp256k1) and transaction signing',
            'Consensus mechanisms: Proof of Stake (PoS), validators, slashing, and finality',
            'Wallets: hierarchical deterministic (HD) wallets, BIP-39 seed phrases, and address generation'
          ],
          whyItMatters: 'Smart contracts handle irreversible financial assets. Without deep understanding of cryptographic signatures and immutability, developers introduce catastrophic security vulnerabilities.',
          productionUse: 'Underlying network foundation for all smart contracts, transactions, and decentralized protocols.',
          aiRelevance: 'Low',
          aiWorkflow: 'Learn cryptographic primitives through standard academic and documentation sources; never trust AI-generated crypto implementations.',
          handsOnTask: 'Write a script in Node.js/Python that generates an Ethereum address from a random private key using secp256k1 and Keccak-256.',
          projectApplication: 'Provides the cryptographic foundation for all decentralized application projects.',
          resources: [
            { title: 'Mastering Ethereum by Andreas Antonopoulos', url: 'https://github.com/ethereumbook/ethereumbook', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'w3-evm-gas',
          title: 'Ethereum Virtual Machine (EVM), Transactions & Gas Economics',
          category: 'EVM Architecture',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['w3-crypto-foundations'],
          description: 'Understand EVM execution: opcodes, stack, memory vs storage layout, transaction structure, nonces, and gas fee dynamics (EIP-1559).',
          whatToLearn: [
            'EVM architecture: stack-based machine, 256-bit word size, program counter, and bytecode',
            'Data locations: storage (persistent and expensive) vs memory (temporary) vs calldata (read-only)',
            'Transaction structure: nonce, gas limit, maxFeePerGas, priority fee, to, value, data, v/r/s signatures',
            'Gas mechanics: EIP-1559 base fee, priority fee, opcode execution costs (SSTORE vs SLOAD)',
            'Ethereum node interaction via JSON-RPC methods (eth_call, eth_sendRawTransaction, eth_getBalance)'
          ],
          whyItMatters: 'Gas optimization is a primary engineering concern in smart contract development; poorly optimized code makes contracts prohibitively expensive to interact with.',
          productionUse: 'Estimating transaction costs, auditing bytecode execution, and designing cost-effective contract logic.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to break down EVM opcode traces and calculate theoretical gas costs of data structures.',
          handsOnTask: 'Query a live Ethereum testnet node using raw JSON-RPC calls via curl to decode a transaction receipt and calculate gas used.',
          projectApplication: 'Guides gas-optimized contract writing across all smart contract deliverables.',
          resources: [
            { title: 'Ethereum Official EVM Documentation', url: 'https://ethereum.org/en/developers/docs/evm/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Solidity programming language, development toolchains (Foundry / Hardhat), and unit testing.',
      skills: [
        {
          id: 'w3-solidity-core',
          title: 'Solidity Smart Contract Programming',
          category: 'Smart Contracts',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['w3-evm-gas'],
          description: 'Master Solidity language syntax: state variables, functions (view, pure, payable), visibility modifiers, mappings, structs, events, and custom errors.',
          whatToLearn: [
            'Data types: uint256, int, bool, address, address payable, bytes, string',
            'Mappings (mapping(address => uint256)), structs, dynamic arrays, and storage layout slots',
            'Function visibility: public, external, internal, private, and view vs pure vs payable',
            'Modifiers (onlyOwner), require vs revert with custom errors (revert InsufficientBalance())',
            'Events and logging: indexed topics and off-chain indexing',
            'Contract inheritance, abstract contracts, interfaces (IERC20), and library usage'
          ],
          whyItMatters: 'Solidity is the standard programming language for the vast majority of decentralized finance, governance, and token protocols.',
          productionUse: 'Authoring decentralized protocols, automated market makers, and token ecosystems.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate boilerplate Solidity functions, but manually inspect all visibility modifiers and state update sequences.',
          handsOnTask: 'Build a decentralized crowd-funding smart contract with contribution milestones, deadlines, and automated refunds upon failed campaigns.',
          projectApplication: 'Core language used for all smart contracts in the Decentralized Escrow and Staking projects.',
          resources: [
            { title: 'Solidity Official Documentation', url: 'https://docs.soliditylang.org/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'w3-foundry-testing',
          title: 'Smart Contract Tooling with Foundry & Property-Based Testing',
          category: 'Developer Tools',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['w3-solidity-core'],
          description: 'Master modern smart contract development with Foundry (forge, cast, anvil): writing tests in pure Solidity, fuzz testing, and deployment scripts.',
          whatToLearn: [
            'Foundry toolchain: forge (build/test), cast (CLI contract interactions), anvil (local testnet)',
            'Writing unit tests in Solidity with forge-std (assertEq, assertTrue, vm.expectRevert)',
            'Cheatcodes (vm.prank, vm.deal, vm.warp, vm.roll) for simulating arbitrary sender addresses and block timestamps',
            'Fuzz testing: running randomized inputs to identify arithmetic edge cases and overflow conditions',
            'Writing automated deployment scripts and verifying contracts on Etherscan via forge create'
          ],
          whyItMatters: 'Foundry has become the modern industry standard for Ethereum development due to lightning-fast Rust compilation and native Solidity testing.',
          productionUse: 'Professional smart contract development, automated CI testing, and deployment verification.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate property-based fuzz test scenarios and simulate adversarial inputs.',
          handsOnTask: 'Write a comprehensive Foundry test suite with 100% branch coverage and fuzz testing for the Crowdfunding smart contract.',
          projectApplication: 'Provides the testing and deployment harness for all smart contract projects.',
          resources: [
            { title: 'Foundry Book (Official)', url: 'https://book.getfoundry.sh/', type: 'handbook' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Token standards (ERC-20, ERC-721, ERC-1155), OpenZeppelin libraries, and web3 frontend integration.',
      skills: [
        {
          id: 'w3-tokens-openzeppelin',
          title: 'Token Standards (ERC-20, ERC-721, ERC-1155) & OpenZeppelin',
          category: 'Token Standards',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['w3-foundry-testing'],
          description: 'Implement industry standard tokens using OpenZeppelin: fungible tokens (ERC-20), non-fungible tokens (ERC-721), multi-tokens (ERC-1155), and soulbound tokens.',
          whatToLearn: [
            'ERC-20 Standard: totalSupply, balanceOf, transfer, approve, transferFrom, allowance, and decimals',
            'ERC-721 Standard: ownerOf, safeTransferFrom, tokenURI, and IPFS decentralized metadata storage',
            'ERC-1155 Multi-Token standard: batch transfers and gas-efficient gaming item systems',
            'OpenZeppelin contracts: Ownable, Pausable, ReentrancyGuard, and AccessControl roles',
            'ERC-20 Permit (EIP-2612) for gasless token approvals using off-chain cryptographic signatures'
          ],
          whyItMatters: 'Standardized interfaces allow tokens and smart contracts to interoperate seamlessly across exchanges, wallets, and DeFi protocols.',
          productionUse: 'Deploying governance tokens, utility tokens, NFT collections, and gaming digital assets.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use OpenZeppelin Wizard and AI to draft standard token contracts; never modify core audited token internals without formal verification.',
          handsOnTask: 'Deploy an ERC-20 utility token and an ERC-721 NFT collection with IPFS metadata, whitelist Merkle proofs, and royalty enforcement (ERC-2981).',
          projectApplication: 'Provides the asset contracts for the Decentralized Token Staking & Governance platform.',
          resources: [
            { title: 'OpenZeppelin Contracts Documentation', url: 'https://docs.openzeppelin.com/contracts/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'w3-frontend-wagmi',
          title: 'Web3 Frontend Integration (viem, wagmi & React)',
          category: 'Frontend Integration',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['w3-tokens-openzeppelin'],
          description: 'Connect modern web frontends to blockchains: viem, wagmi hooks, RainbowKit wallet connection modal, ABI parsing, and transaction lifecycle handling.',
          whatToLearn: [
            'Wallet connection: RainbowKit / Web3Modal supporting MetaMask, Coinbase Wallet, WalletConnect',
            'viem: lightweight, type-safe Ethereum client library for contract calls and balance reading',
            'wagmi React hooks: useAccount, useConnect, useReadContract, useWriteContract, useWaitForTransactionReceipt',
            'Parsing Contract ABIs (Application Binary Interface) for type-safe contract interaction',
            'Handling transaction lifecycles: user signature request, pending mempool state, confirmations, and failure toast alerts'
          ],
          whyItMatters: 'Smart contracts are useless to regular users without an intuitive, responsive web interface that communicates wallet states clearly.',
          productionUse: 'Building decentralized application (dApp) frontends for DeFi protocols, NFT marketplaces, and DAOs.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate React UI components for wallet connection modals and contract balance cards.',
          handsOnTask: 'Build a responsive React dApp that connects to user wallets, reads live ERC-20 token balances, and allows one-click token staking with live confirmation alerts.',
          projectApplication: 'Builds the user interface for the Decentralized Escrow and Staking projects.',
          resources: [
            { title: 'wagmi Documentation', url: 'https://wagmi.sh/', type: 'documentation' },
            { title: 'viem Documentation', url: 'https://viem.sh/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Smart contract security, auditing, reentrancy attacks, upgradeable contracts, and DeFi primitives.',
      skills: [
        {
          id: 'w3-security-auditing',
          title: 'Smart Contract Security, Reentrancy & Vulnerability Auditing',
          category: 'Security & Auditing',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['w3-tokens-openzeppelin'],
          description: 'Master smart contract security: Reentrancy attacks, Checks-Effects-Interactions (CEI) pattern, flash loan attack vectors, front-running (MEV), and auditing tools (Slither).',
          whatToLearn: [
            'Classic vulnerabilities: Reentrancy (The DAO hack), integer overflow/underflow, tx.origin authentication bugs',
            'Checks-Effects-Interactions (CEI) pattern and ReentrancyGuard implementation',
            'Front-running and Maximal Extractable Value (MEV): sandwich attacks, slippage limits, and private mempools',
            'Static analysis tools: running Slither and Mythril to catch automated security code smells',
            'Flash loan attack mechanics: oracle price manipulation and TWAP (Time-Weighted Average Price) defenses'
          ],
          whyItMatters: 'A single bug in a deployed smart contract cannot be patched post-deployment and often results in millions of dollars drained irreversibly.',
          productionUse: 'Conducting internal security audits, writing bug bounty submissions, and hardening production DeFi protocols.',
          aiRelevance: 'Low',
          aiWorkflow: 'Use AI to assist in spotting common audit patterns, but perform manual line-by-line verification of state transitions and external calls.',
          handsOnTask: 'Identify and exploit a deliberately vulnerable smart contract in a local Foundry capture-the-flag (CTF) environment, then patch it using the CEI pattern.',
          projectApplication: 'Security-hardens the Production DeFi Automated Market Maker protocol.',
          resources: [
            { title: 'Secureum Security Pitfalls Guide', url: 'https://secureum.substack.com/', type: 'guide' },
            { title: 'Damn Vulnerable DeFi CTF', url: 'https://www.damnvulnerabledefi.xyz/', type: 'ctf' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'w3-defi-primitives',
          title: 'DeFi Primitives: AMMs, Staking & Upgradeable Contracts',
          category: 'DeFi Architecture',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['w3-security-auditing'],
          description: 'Build core Decentralized Finance mechanisms: Constant Product Automated Market Makers (x * y = k, Uniswap v2), staking reward algorithms, and Proxy upgradeability patterns.',
          whatToLearn: [
            'Automated Market Maker (AMM) math: Constant Product Formula (x * y = k), liquidity pools, LP tokens, and impermanent loss',
            'Synthetix-style staking reward distribution algorithm for gas-efficient continuous reward distribution',
            'Proxy patterns for contract upgradeability: Transparent Proxy vs UUPS (Universal Upgradeable Proxy Standard) and storage collisions',
            'Oracles: integrating Chainlink Price Feeds for secure, tamper-proof real-world asset pricing'
          ],
          whyItMatters: 'DeFi accounts for the largest volume of economic activity and engineering demand in the blockchain industry.',
          productionUse: 'Designing decentralized exchanges, lending markets, yield farming vaults, and synthetic asset protocols.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to model mathematical bonding curves and compute expected swap outputs with fee calculations.',
          handsOnTask: 'Build a decentralized constant-product AMM swap contract from scratch supporting liquidity addition, removals, and 0.3% trading fee distribution.',
          projectApplication: 'Core smart contract for the Production Decentralized Exchange (DEX) & AMM project.',
          resources: [
            { title: 'Uniswap v2 Core Whitepaper', url: 'https://uniswap.org/whitepaper.pdf', type: 'whitepaper' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Testnet protocol deployment, Etherscan contract verification, Web3 portfolio showcase, and smart contract interview prep.',
      skills: [
        {
          id: 'w3-deploy-indexing',
          title: 'Testnet Protocol Deployment & Subgraph Indexing (The Graph)',
          category: 'Deployment & Indexing',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['w3-defi-primitives'],
          description: 'Deploy full protocols to Sepolia/Arbitrum testnets, verify on Etherscan, build custom Subgraphs with The Graph for GraphQL event indexing, and configure multi-sig governance (Safe).',
          whatToLearn: [
            'Testnet deployment: Sepolia, Base, or Arbitrum Sepolia using Foundry script pipelines',
            'Automated source code verification on block explorers (Etherscan, Basescan)',
            'Indexing blockchain events with The Graph: schema definition, AssemblyScript mapping handlers, and GraphQL querying',
            'Multi-signature governance: setting up a Safe (formerly Gnosis Safe) multi-sig wallet as contract owner'
          ],
          whyItMatters: 'Directly querying blockchain nodes for complex historical data is slow and expensive. Subgraphs provide fast, relational GraphQL queries for dApp frontends.',
          productionUse: 'Powering high-speed analytics dashboards, transaction histories, and protocol statistics in production dApps.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft Subgraph GraphQL schemas and entity relationship models from smart contract events.',
          handsOnTask: 'Deploy a protocol to an Ethereum testnet and deploy a custom Subgraph that indexes all swap and liquidity events into a queryable GraphQL API.',
          projectApplication: 'Deploys and indexes the Capstone Decentralized Finance Protocol.',
          resources: [
            { title: 'The Graph Documentation', url: 'https://thegraph.com/docs/en/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'w3-portfolio-interview',
          title: 'Web3 Engineering Portfolio, Auditing Write-ups & Interviews',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['w3-deploy-indexing'],
          description: 'Package verified smart contracts into a public portfolio, write security audit write-ups, prepare for live Solidity coding interviews, and optimize an ATS resume.',
          whatToLearn: [
            'Creating an engineering portfolio highlighting verified testnet contracts, test coverage reports, and architecture diagrams',
            'Writing smart contract security audit case studies explaining potential vulnerabilities and formal patches',
            'Live Solidity coding interview preparation: implementing reentrancy-safe escrow, token vesting schedules, and staking algorithms',
            'Explaining EVM internals, gas optimization tradeoffs, and decentralized governance models clearly to interviewers'
          ],
          whyItMatters: 'Web3 protocols hire developers who can prove rigorous testing standards, verifiable deployment history, and uncompromising security hygiene.',
          productionUse: 'Securing smart contract engineer, protocol engineer, and Web3 full-stack developer roles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to mock technical interview questions on EVM storage slots and assembly Yul opcodes.',
          handsOnTask: 'Write a comprehensive security audit report of your capstone protocol detailing threat models, gas optimizations, and invariant test results.',
          projectApplication: 'Presents your complete smart contract engineering portfolio to Web3 protocol hiring leads.',
          resources: [
            { title: 'Web3 Security Interview Questions (GitHub)', url: 'https://github.com/transmissions11/solmate', type: 'code' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'w3-proj-1',
      title: 'Decentralized Multi-Sig Escrow Smart Contract & dApp',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build a decentralized escrow smart contract with buyer, seller, and arbiter roles, automated dispute resolution, and a React frontend.',
      technologies: ['Solidity', 'Foundry', 'React', 'wagmi', 'viem', 'Tailwind CSS'],
      skillsPracticed: ['Solidity modifiers', 'Event emissions', 'Foundry unit tests', 'Wallet connection', 'Contract write transactions'],
      requirements: [
        'Buyer deposits funds into escrow locked until physical goods or services are delivered',
        'Seller requests payout upon completion; buyer confirms release to transfer funds',
        'Designated third-party arbiter can resolve disputes and refund buyer or release to seller',
        'React frontend displaying active escrow contracts with live status updates'
      ],
      deliverables: [
        'Deployed contract on Sepolia testnet with verified Etherscan source code',
        'Comprehensive Foundry test suite covering all dispute and refund states',
        'Live dApp frontend connected to user MetaMask/WalletConnect wallets'
      ],
      productionExpectations: [
        'Zero reentrancy vulnerabilities using Checks-Effects-Interactions pattern',
        '100% branch test coverage across all escrow release and refund branches'
      ],
      aiIntegration: 'Use AI to generate mock transaction testing scenarios and verify error event emissions.'
    },
    {
      id: 'w3-proj-2',
      title: 'ERC-20 Staking Protocol & Yield Farming Vault',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Develop an automated token staking contract with continuous reward distribution, lockup tiers, and a live web3 analytics dashboard.',
      technologies: ['Solidity', 'Foundry', 'OpenZeppelin', 'Next.js 14', 'wagmi', 'Tailwind CSS'],
      skillsPracticed: ['Token standards', 'Staking mathematical formulas', 'OpenZeppelin ReentrancyGuard', 'dApp state management', 'Fuzz testing'],
      requirements: [
        'Custom ERC-20 utility token and staking rewards distribution contract',
        'Synthetix-style proportional reward distribution calculated dynamically per block',
        'Lockup period multipliers: staking for 30, 90, or 180 days grants bonus reward weight',
        'Foundry invariant tests verifying total rewards paid never exceed total rewards deposited'
      ],
      deliverables: [
        'Verified contracts deployed to Arbitrum Sepolia or Base Sepolia testnet',
        'Next.js web3 frontend displaying personal staked balance, accrued rewards, and one-click claim',
        'Foundry test report with property-based fuzz tests'
      ],
      productionExpectations: [
        'Gas-optimized math preventing loops over stakers during reward calculations',
        'Safe token transfers utilizing OpenZeppelin SafeERC20 to prevent non-reverting token transfer exploits'
      ],
      aiIntegration: 'Use AI to verify the precision math of token reward division to avoid rounding down to zero.'
    },
    {
      id: 'w3-proj-3',
      title: 'Production Automated Market Maker (AMM) DEX & Subgraph',
      difficulty: 'Production',
      estimatedTime: '7 weeks',
      objective: 'Architect a production decentralized exchange with constant-product liquidity pools (x * y = k), LP token minting, The Graph indexing, and a full swap interface.',
      technologies: ['Solidity', 'Foundry', 'The Graph (GraphQL)', 'Next.js 14', 'wagmi / viem', 'Chainlink Oracles'],
      skillsPracticed: ['AMM math', 'Liquidity pool engineering', 'Flash loan defense', 'GraphQL event indexing', 'Slippage calculation'],
      requirements: [
        'Factory contract deploying individual pair contracts for arbitrary ERC-20 token pairs',
        'Constant product invariant (x * y = k) token swaps with 0.3% protocol liquidity provider fee',
        'Liquidity provider token (LP) minting and burning proportional to pool contributions',
        'Custom Subgraph on The Graph indexing all swaps, pool reserves, and historical trading volume',
        'Next.js swap interface with live price impact, slippage tolerance settings, and liquidity management'
      ],
      deliverables: [
        'Verified contracts deployed on Ethereum testnet with full documentation',
        'Production Subgraph published on The Graph decentralized network with public GraphQL playground',
        'Comprehensive security audit report documenting threat model and invariant proofs'
      ],
      productionExpectations: [
        'Strict slippage protection (minAmountOut) preventing front-running and MEV sandwich exploitation',
        'Full compatibility with standard ERC-20 tokens including fee-on-transfer and rebasing tokens'
      ],
      aiIntegration: 'Use AI to simulate extreme price volatility swap scenarios and audit LP token dilution invariants.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Cryptographic fundamentals: Keccak-256, public/private keys, and ECDSA digital signatures',
      'Ethereum Virtual Machine (EVM) architecture, storage slots, and gas economics',
      'Solidity programming: data structures, modifiers, inheritance, and custom errors',
      'Smart contract development with Foundry (forge, cast, anvil, cheatcodes)',
      'Property-based fuzz testing and invariant testing for smart contracts',
      'Token standards: ERC-20, ERC-721, ERC-1155, and OpenZeppelin libraries',
      'Smart contract security: Reentrancy prevention, Checks-Effects-Interactions, and Slither audits',
      'Web3 frontend integration with viem, wagmi, RainbowKit, and React',
      'DeFi mechanics: Constant Product AMMs, staking mathematical models, and Chainlink Oracles',
      'Event indexing with The Graph and querying decentralized Subgraphs via GraphQL'
    ],
    projects: [
      'Decentralized multi-sig escrow smart contract with dispute arbiter and React dApp',
      'ERC-20 token staking protocol with proportional block rewards and fuzz testing',
      'Production Constant Product AMM DEX with custom Subgraph indexing and swap UI',
      'All contracts deployed on public Ethereum testnets with verified Etherscan source code'
    ],
    csFundamentals: [
      'Distributed ledger theory: consensus mechanisms (PoS), state machines, Merkle trees',
      'Asymmetric cryptography, digital signatures, and hash collision resistance',
      'Virtual machine execution models: stack machines, bytecode, opcodes, memory layout',
      'Financial algorithms: automated market maker bonding curves and compound interest calculations'
    ],
    tools: [
      'Foundry development framework (forge, cast, anvil)',
      'Blockchain explorers: Etherscan, Blockscout, and Basescan',
      'Wallet tooling: MetaMask, Rabby, and testnet faucets',
      'Static analysis and security audit tools: Slither and Mythril'
    ],
    deployment: [
      'Deploying smart contracts to Sepolia, Base, and Arbitrum testnets via Foundry scripts',
      'Automated source code verification on Etherscan and block explorers',
      'Deploying and syncing decentralized Subgraphs on The Graph Studio',
      'Configuring multi-signature governance wallets (Safe) for protocol ownership'
    ],
    portfolio: [
      'Clean Web3 developer portfolio linking to live dApp deployments and verified contracts',
      'In-depth security audit write-ups and threat model documentation for each project',
      'Architecture diagrams illustrating contract relationships, token flows, and external oracles',
      'Public GitHub repositories with passing test coverage and fuzz test outputs'
    ],
    github: [
      'Public GitHub repositories with clear setup instructions (forge build, forge test)',
      '100% test passing status badges and gas optimization snapshot reports',
      'Clean commit history following Conventional Commits format',
      'Detailed READMEs with contract addresses and deployed testnet links'
    ],
    resume: [
      'Clean, single-page ATS-optimized Web3 / smart contract developer resume in PDF format',
      'Bullet points highlighting smart contract security, gas optimizations, and deployed protocols',
      'Direct links to verified Etherscan contracts, GitHub repositories, and live dApps',
      'Keywords matching Solidity developer, smart contract engineer, and Web3 full-stack roles'
    ],
    interviewReadiness: [
      'Fluency in live Solidity coding rounds under timed constraints (Escrow, Vesting, Staking)',
      'Deep understanding of EVM storage layout, memory vs storage, and opcode costs',
      'Ability to explain historical DeFi hacks (The DAO, Cream Finance, Euler) and prevention measures',
      'Structured explanations of gas optimization techniques and compiler settings'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['web3'] = web3Roadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = web3Roadmap;
}
