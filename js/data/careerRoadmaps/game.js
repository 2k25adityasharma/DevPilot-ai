/**
 * DevPilot-AI — Career Roadmap: Game Developer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const gameRoadmap = {
  roleId: 'game-developer',
  roadmapId: 'game',
  title: 'Game Developer',
  category: 'development',
  description: 'Design and program interactive games and real-time graphics applications: game physics, 3D linear algebra, game engines (Unity / Unreal), shaders, and multiplayer networking.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Game programming languages (C++ / C#), 3D mathematics, linear algebra, and game loops.',
      skills: [
        {
          id: 'game-lang-core',
          title: 'Game Programming Foundations (C++ / C#)',
          category: 'Programming Languages',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: [],
          description: 'Master systems programming for games in C++ or C#: memory allocation, pointers/references, data-oriented design, OOP, and cash-friendly data layouts.',
          whatToLearn: [
            'Language syntax: types, structs, classes, memory layout, stack vs heap allocation',
            'Pointers, smart pointers (unique_ptr, shared_ptr), manual memory management, and avoiding memory leaks',
            'Object-Oriented Programming: inheritance, composition, polymorphism, and virtual function overhead',
            'Data structures: arrays, linked lists, hash tables, spatial grids, and cache locality'
          ],
          whyItMatters: 'Games demand deterministic performance and strict 60/120 FPS frame rate budgets. Memory mismanagement causes game freezes and stuttering.',
          productionUse: 'Engine programming, gameplay mechanics, entity logic, and game systems.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to explain compiler optimization flags or generate basic math utility classes; verify memory safety manually.',
          handsOnTask: 'Build a 2D grid-based arcade game (like Snake or Asteroids) from scratch in C++ using SDL2 or Raylib.',
          projectApplication: 'Serves as the programming foundation for all subsequent game projects.',
          resources: [
            { title: 'Learn C++ Guide', url: 'https://www.learncpp.com/', type: 'tutorial' },
            { title: 'Raylib Official', url: 'https://www.raylib.com/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'game-math-physics',
          title: 'Game Mathematics & 3D Linear Algebra',
          category: 'Mathematics',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['game-lang-core'],
          description: 'Master game math: vectors (2D/3D), dot products, cross products, transformation matrices, quaternions for rotation, and trigonometry.',
          whatToLearn: [
            'Vector operations: magnitude, normalization, addition, scalar multiplication, distance calculations',
            'Dot product: field of view (FOV), lighting angles, and projecting vectors',
            'Cross product: calculating surface normals and orthogonal vectors in 3D space',
            'Matrices: affine transformations (translation, rotation, scaling) and coordinate spaces (local, world, view, screen)',
            'Quaternions: representation of 3D rotations, avoiding gimbal lock, and spherical linear interpolation (Slerp)'
          ],
          whyItMatters: 'Every character movement, camera rotation, collision response, and particle effect relies on vector mathematics.',
          productionUse: 'Camera controllers, projectile trajectories, procedural animation, and physics calculations.',
          aiRelevance: 'Low',
          aiWorkflow: 'Work through vector math proofs and coordinate transforms manually; AI frequently confuses rotation conventions.',
          handsOnTask: 'Write a 3D software camera math library implementing view and projection matrices with quaternion rotation without engine dependencies.',
          projectApplication: 'Used continuously across custom character controllers and gameplay mechanics.',
          resources: [
            { title: '3D Math Primer for Graphics and Game Development', url: 'https://gamemath.com/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Game engines (Unity / Unreal), entity component systems, physics engines, and animation state machines.',
      skills: [
        {
          id: 'game-engine-ecs',
          title: 'Game Engine Architecture (Unity / Unreal) & ECS',
          category: 'Game Engines',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '4 weeks',
          prerequisites: ['game-math-physics'],
          description: 'Master industry game engines: scene graphs, game loop lifecycles (Update, FixedUpdate, LateUpdate), Entity Component Systems (ECS), and prefabs/blueprints.',
          whatToLearn: [
            'Engine architecture: Unity (C# / GameObjects / DOTS) or Unreal Engine (C++ / Blueprints / UObjects)',
            'Game loop lifecycle: Initialization, physics step (FixedUpdate), input/gameplay step (Update), rendering',
            'Entity Component System (ECS) pattern vs traditional deep inheritance hierarchies',
            'Asset management: importing 3D meshes, textures, materials, prefabs, and scene organization'
          ],
          whyItMatters: 'Game engines provide the rendering, physics, and tooling foundation for professional commercial game production.',
          productionUse: 'Developing 2D and 3D indie, mobile, PC, and console games.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to scaffold gameplay state machine logic and syntax checks for engine API calls.',
          handsOnTask: 'Build a complete 3D third-person platformer with custom character controller, jump physics, and moving platforms in Unity/Unreal.',
          projectApplication: 'Provides the engine scaffold for the 3D Action-Adventure Platformer project.',
          resources: [
            { title: 'Unity Learn Platform', url: 'https://learn.unity.com/', type: 'tutorial' },
            { title: 'Unreal Engine Documentation', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'game-physics-collision',
          title: 'Collision Detection, Rigidbody Physics & Audio Systems',
          category: 'Physics & Audio',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['game-engine-ecs'],
          description: 'Implement realistic physics and spatial audio: colliders (Box, Sphere, Capsule, Mesh), raycasting, gravity, restitution, friction, and FMOD/Wwise spatial sound.',
          whatToLearn: [
            'Collision detection primitives: AABB (Axis-Aligned Bounding Box), OBB, Sphere-Sphere, and Raycast intersections',
            'Physics engines (PhysX / Chaos): Rigidbodies, mass, velocity, acceleration, forces, impulse, and torque',
            'Collision resolution: trigger volumes vs physical collision responses, bounce, and friction coefficients',
            'Spatial 3D audio: sound attenuation curves, Doppler effect, environmental reverb, and audio mixer snapshots'
          ],
          whyItMatters: 'Satisfying game feel (kinesthetics) depends directly on responsive collision feedback and rich spatial audio cues.',
          productionUse: 'Vehicle physics, gun recoil, character jump arcs, and environmental acoustic simulation.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate mathematical ray-plane intersection algorithms and audio trigger sequences.',
          handsOnTask: 'Build a physics-based pinball or billiards simulation with realistic ball bounces, angular friction, and responsive sound effects.',
          projectApplication: 'Powers combat hitboxes and physics in the 3D Action-Adventure project.',
          resources: [
            { title: 'Real-Time Collision Detection by Christer Ericson', url: 'https://realtimecollisiondetection.net/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Shaders and rendering pipelines, graphics programming, particle systems, and AI behavior trees.',
      skills: [
        {
          id: 'game-shaders-graphics',
          title: 'Shaders & Real-Time Graphics Rendering (HLSL / GLSL)',
          category: 'Graphics Programming',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['game-engine-ecs'],
          description: 'Master graphics pipelines: vertex shaders, fragment/pixel shaders, lighting models (Phong/Blinn-Phong vs PBR), post-processing effects, and Shader Graph.',
          whatToLearn: [
            'Graphics rendering pipeline: Vertex specification, vertex shader, rasterization, fragment shader, blending',
            'Shader languages: HLSL (DirectX) / GLSL (OpenGL/Vulkan) or visual Shader Graph nodes',
            'Lighting models: Ambient, Diffuse, Specular (Phong/Blinn-Phong) and Physically Based Rendering (PBR: Albedo, Metallic, Roughness, Normal maps)',
            'Post-processing effects: Bloom, Depth of Field, Color Grading, Ambient Occlusion (SSAO), and vignette'
          ],
          whyItMatters: 'Shaders determine the entire visual identity and artistic style of a game, from realistic lighting to custom stylized cel-shading.',
          productionUse: 'Writing visual effects, water simulations, stylized anime outlines, and screen-space post-processing.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft math formulas for procedural noise (Perlin, Simplex) and shader color ramps.',
          handsOnTask: 'Write a custom toon/cel-shading shader with dynamic specular highlights, rim lighting, and outer silhouette outlines.',
          projectApplication: 'Provides the visual aesthetic and lighting for the Stylized Roguelike Dungeon Crawler.',
          resources: [
            { title: 'The Book of Shaders', url: 'https://thebookofshaders.com/', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'game-ai-behavior',
          title: 'Game AI: Behavior Trees, NavMesh & Pathfinding',
          category: 'Game AI',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['game-engine-ecs'],
          description: 'Engineer responsive game AI: A* pathfinding algorithm, navigation meshes (NavMesh), Finite State Machines (FSM), Behavior Trees, and sensory perception.',
          whatToLearn: [
            'Pathfinding: Dijkstra’s algorithm, A* heuristic pathfinding on grids and navigation meshes (NavMesh)',
            'AI architectures: Finite State Machines (Patrol, Chase, Attack) vs hierarchical Behavior Trees (Selectors, Sequences, Decorators)',
            'Steering behaviors: seek, flee, arrive, wander, obstacle avoidance, and flocking (Boids algorithm)',
            'Sensory systems: sight cones (dot product raycasts), hearing radius, and suspicious state meters'
          ],
          whyItMatters: 'Engaging, believable enemy AI creates tension, tactical challenge, and immersion for players.',
          productionUse: 'Enemy combat behaviors, friendly companion pathfinding, crowd simulations, and boss attack patterns.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to outline Behavior Tree branch logic and enemy decision trees for specific combat roles.',
          handsOnTask: 'Build an AI stealth infiltration encounter where guards patrol, investigate sounds, and coordinate flanking attacks using Behavior Trees.',
          projectApplication: 'Drives all enemy intelligence in the Stylized Roguelike Dungeon Crawler.',
          resources: [
            { title: 'Game AI Pro: Collected Wisdom of Game AI Professionals', url: 'http://www.gameaipro.com/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Multiplayer networking, state synchronization, client-side prediction, and GPU/CPU performance profiling.',
      skills: [
        {
          id: 'game-multiplayer-net',
          title: 'Multiplayer Networking & State Synchronization',
          category: 'Multiplayer',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['game-ai-behavior'],
          description: 'Build networked multiplayer games: UDP sockets, client-server architecture, client-side prediction, server reconciliation, lag compensation, and interpolation.',
          whatToLearn: [
            'Network protocols: TCP reliability vs UDP speed and packet loss handling',
            'Multiplayer topologies: Peer-to-Peer vs Dedicated Authoritative Server architecture',
            'Latency mitigation: Client-Side Prediction for instant input response, Server Reconciliation to correct desyncs',
            'Entity interpolation and extrapolation to render smooth motion under packet delay and jitter',
            'Lag compensation and rollback netcode basics for hit registration in fast-paced combat'
          ],
          whyItMatters: 'Multiplayer online games dominate the games industry. Without lag compensation and prediction, multiplayer feels unplayable.',
          productionUse: 'Co-op games, battle royales, MMOs, and competitive esports titles.',
          aiRelevance: 'Low',
          aiWorkflow: 'Networked state synchronization is notoriously delicate; test real latency scenarios with artificial packet loss simulators.',
          handsOnTask: 'Build an authoritative dedicated server multiplayer arena shooter prototype with client-side prediction and server reconciliation.',
          projectApplication: 'Powers the networking foundation for the Multiplayer Arena Combat Game.',
          resources: [
            { title: 'Fast-Paced Multiplayer (Gabriel Gambetta)', url: 'https://www.gabrielgambetta.com/client-server-game-architecture.html', type: 'guide' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'game-profiling-perf',
          title: 'Game Profiling, Memory Optimization & Draw Calls',
          category: 'Performance',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['game-shaders-graphics'],
          description: 'Achieve stable 60/120 FPS: draw call batching, GPU/CPU bottleneck identification, garbage collection optimization, Level of Detail (LOD), and occlusion culling.',
          whatToLearn: [
            'Identifying bottlenecks: CPU-bound (game logic, physics) vs GPU-bound (fill rate, overdraw, vertex count)',
            'Draw calls and batching: Static Batching, Dynamic Batching, GPU Instancing',
            'Occlusion culling, frustum culling, and Level of Detail (LOD) group transitions',
            'Memory management: object pooling to eliminate garbage collection (GC) allocation spikes during gameplay',
            'Using engine profilers (Unity Profiler / Unreal Unreal Insights / RenderDoc) to dissect frame render times'
          ],
          whyItMatters: 'Players immediately abandon games that drop frames during intense combat or thermal throttle mobile devices.',
          productionUse: 'Optimizing games to pass console certification (Sony PlayStation, Microsoft Xbox, Nintendo Switch) and mobile store standards.',
          aiRelevance: 'Low',
          aiWorkflow: 'Profile directly on target hardware using RenderDoc and engine profilers; AI cannot diagnose GPU fill rate stalls.',
          handsOnTask: 'Take an unoptimized scene rendering 3,000 unbatched objects and optimize it using GPU instancing and object pooling to increase FPS by 300%.',
          projectApplication: 'Guarantees the Capstone Game maintains solid 60+ FPS on target hardware.',
          resources: [
            { title: 'RenderDoc Graphics Debugger', url: 'https://renderdoc.org/', type: 'tool' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Full game publishing on Steam/Itch.io, gameplay programming portfolio, and technical game development interview preparation.',
      skills: [
        {
          id: 'game-publishing-steam',
          title: 'Game Publishing, Build Pipelines & Steamworks SDK',
          category: 'Publishing & Release',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['game-multiplayer-net', 'game-profiling-perf'],
          description: 'Ship complete games: Steamworks integration (achievements, cloud saves, leaderboards), build automation, platform packaging, and store asset preparation.',
          whatToLearn: [
            'Steamworks SDK integration: achievements, cloud saves, rich presence, and overlay support',
            'Automated build pipelines using engine CLI commands for Windows, Mac, and Linux builds',
            'Game balance testing, telemetry data collection, and bug tracking integration',
            'Creating compelling store assets: playable demo builds, gameplay trailers, screenshots, and system requirement specs'
          ],
          whyItMatters: 'A playable, published game on Steam or Itch.io proves you can take a complex software project from zero to a finished commercial release.',
          productionUse: 'Releasing commercial indie games and shipping updates to live games.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate achievement description text and draft playtesting questionnaires.',
          handsOnTask: 'Integrate the Steamworks SDK into a game build, configure 10 functional Steam achievements, and publish a playable demo build on Itch.io.',
          projectApplication: 'Deploys the Capstone Game to public game stores.',
          resources: [
            { title: 'Steamworks Documentation', url: 'https://partner.steamgames.com/doc/home', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'game-portfolio-interview',
          title: 'Game Developer Portfolio, Showreel & Technical Interviews',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['game-publishing-steam'],
          description: 'Package your games into a video showreel, write technical post-mortems, prepare for 3D math and C++ coding interviews, and tailor an ATS-optimized game developer resume.',
          whatToLearn: [
            'Creating a 90-second gameplay engineering showreel highlighting physics, AI, and graphics features',
            'Writing technical engineering breakdowns: detailing algorithms, performance optimizations, and architecture diagrams',
            'Game programming interview technical rounds: 3D vector math questions, memory management, data structures, and C++ pointers',
            'Behavioral interview stories addressing crunch, scope management, and cross-discipline collaboration with artists and designers'
          ],
          whyItMatters: 'Studios hire gameplay and engine programmers based on playable demos, clean C++ code samples, and solid 3D math fluency.',
          productionUse: 'Securing game developer positions at AAA studios, AA indie teams, and simulation companies.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to quiz yourself on vector math interview problems and C++ memory layout mechanics.',
          handsOnTask: 'Assemble a 90-second gameplay engineering showreel with annotations explaining your technical contributions and code samples.',
          projectApplication: 'Presents your game development portfolio to studio technical directors and hiring leads.',
          resources: [
            { title: 'Game Industry Career Guide', url: 'https://www.gameindustrycareerguide.com/', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'game-proj-1',
      title: '3D Action-Adventure Third-Person Platformer',
      difficulty: 'Beginner',
      estimatedTime: '3-4 weeks',
      objective: 'Build a 3D third-person platformer game featuring custom character physics, jump mechanics, collectible items, and particle effects.',
      technologies: ['Unity / Unreal Engine', 'C# / C++', 'Cinemachine / SpringArm', 'Shader Graph', 'Particle System'],
      skillsPracticed: ['Character controllers', '3D vector math', 'Collision detection', 'Camera collision avoidance', 'Audio triggers'],
      requirements: [
        'Fluid character movement with ground check, variable jump heights, and double jump mechanics',
        'Orbiting third-person camera with smooth collision clipping prevention',
        'Moving platforms, hazards, and collectible items with UI score updates',
        'Sound effects and dynamic background music transitions'
      ],
      deliverables: [
        'Playable standalone Windows/Mac executable build and Itch.io web build',
        'Clean GitHub repository with documented C#/C++ scripts',
        'Short gameplay video demo showcasing mechanics'
      ],
      productionExpectations: [
        'Stable 60 FPS across all platforming gameplay sections',
        'Zero character clipping through level geometry or falling through platforms'
      ],
      aiIntegration: 'Use AI to generate level layout ideas and assist with camera spring math formulas.'
    },
    {
      id: 'game-proj-2',
      title: 'Stylized Roguelike Dungeon Crawler with Enemy AI',
      difficulty: 'Intermediate',
      estimatedTime: '5-6 weeks',
      objective: 'Develop a top-down action roguelike with custom cel-shading shaders, Behavior Tree enemy AI, procedural dungeon generation, and combat mechanics.',
      technologies: ['Unity / Unreal Engine', 'C# / C++', 'Behavior Trees / NavMesh', 'HLSL / Shader Graph', 'Post-Processing'],
      skillsPracticed: ['Custom cel-shading', 'Behavior Tree AI', 'A* pathfinding', 'Object pooling', 'Procedural generation'],
      requirements: [
        'Procedurally generated dungeon rooms connected by hallways with locked doors and keys',
        'Custom cel-shading shader with dynamic outline detection and stylized lighting',
        '3 distinct enemy types powered by Behavior Trees (Melee Chaser, Ranged Archer, Elite Brute with charge attacks)',
        'Object pooled projectile system to eliminate garbage collection spikes during combat'
      ],
      deliverables: [
        'Playable build uploaded to Itch.io with full keyboard/mouse and gamepad support',
        'Technical write-up detailing the procedural generation algorithm and AI architecture',
        'Profiler capture report verifying zero garbage collection allocations during combat'
      ],
      productionExpectations: [
        'Consistent 60+ FPS during intense combat with 30+ simultaneous active enemies',
        'Fluid gamepad input integration with customizable keybindings'
      ],
      aiIntegration: 'Use AI to draft procedural dungeon generation layout rules and enemy stat balance tables.'
    },
    {
      id: 'game-proj-3',
      title: 'Multiplayer Arena Combat Game with Authoritative Server',
      difficulty: 'Production',
      estimatedTime: '8 weeks',
      objective: 'Architect a fast-paced networked multiplayer combat game with client-side prediction, server reconciliation, Steamworks integration, and dedicated server builds.',
      technologies: ['Unity / Unreal Engine', 'C# / C++', 'Netcode for GameObjects / Unreal Replication', 'UDP / Sockets', 'Steamworks SDK'],
      skillsPracticed: ['Network replication', 'Client-side prediction', 'Server reconciliation', 'Dedicated servers', 'Steamworks SDK'],
      requirements: [
        'Dedicated authoritative server architecture supporting 4-8 concurrent players per match',
        'Client-side prediction and server reconciliation for zero perceived local input lag',
        'Hitscan and projectile weapon hit registration with server validation',
        'Steamworks integration for matchmaking lobbies, friend invites, and achievements'
      ],
      deliverables: [
        'Published game build on Steam / Itch.io with functioning dedicated server binaries',
        'Architecture RFC document detailing the network state replication model and bandwidth optimization',
        '90-second technical showreel video showcasing multiplayer combat and netcode features'
      ],
      productionExpectations: [
        'Playable under 150ms latency with minimal visible jitter or rubber-banding',
        'Strict server-side validation preventing client-side speed hacking or unauthorized health manipulation'
      ],
      aiIntegration: 'Use AI to generate mock network packet delay test scenarios and write achievement trigger scripts.'
    }
  ],
  checklist: {
    technicalSkills: [
      'C++ or C# systems programming fluency with clean memory management',
      '3D Mathematics: Vectors, Dot/Cross Products, Matrices, and Quaternions',
      'Game engine proficiency (Unity or Unreal Engine)',
      'Collision detection algorithms and Rigidbody physics simulation',
      'Shader programming with HLSL / GLSL and PBR materials',
      'Game AI: Navigation Meshes, A* Pathfinding, and Behavior Trees',
      'Multiplayer networking: UDP, Client-Side Prediction, and Server Reconciliation',
      'Game profiling with RenderDoc, engine profilers, and draw call optimization',
      'Steamworks SDK integration: achievements, cloud saves, and matchmaking',
      'Object pooling and zero-allocation gameplay coding practices'
    ],
    projects: [
      '3D third-person platformer with custom character controller and jump physics',
      'Stylized roguelike dungeon crawler with cel-shading and Behavior Tree AI',
      'Authoritative multiplayer arena combat game with client-side prediction',
      'All projects demonstrated via playable builds on Steam or Itch.io'
    ],
    csFundamentals: [
      'CPU cache lines, spatial data locality, and Data-Oriented Design (DOD)',
      'Data structures: Spatial Partitioning (Octrees, BVH, Grids), Heaps, Graphs',
      'Linear algebra and trigonometry applied to real-time 3D simulation',
      'Network protocols: UDP socket packet serialization and latency mitigation'
    ],
    tools: [
      'Game engines: Unity or Unreal Engine development environments',
      'IDE tools: Visual Studio, JetBrains Rider, or Xcode',
      'Graphics and performance debuggers: RenderDoc, Unity Profiler, Unreal Insights',
      'Version control: Git with Git LFS (Large File Storage) for textures and meshes'
    ],
    deployment: [
      'Building standalone game executables for Windows, Mac, and Linux',
      'Steamworks partner dashboard configuration, depots, and release branches',
      'Itch.io automated deployments using the Butler CLI tool',
      'Dedicated server deployment on cloud virtual machines (AWS EC2 / DigitalOcean)'
    ],
    portfolio: [
      'High-impact 90-second gameplay engineering showreel with annotations',
      'Playable game builds hosted on Steam or Itch.io with direct download links',
      'In-depth technical breakdown articles explaining custom shaders, netcode, or AI',
      'Clean portfolio website displaying gameplay GIFs, architecture diagrams, and playable web builds'
    ],
    github: [
      'Clean GitHub repositories for game code samples with comprehensive READMEs',
      'Git LFS configured properly for binary game assets',
      'Code samples demonstrating clean architecture, OOP/ECS patterns, and memory safety',
      'Clear instructions for opening, compiling, and running projects in the engine'
    ],
    resume: [
      'Clean, single-page ATS-compliant game developer resume in PDF format',
      'Bullet points highlighting engine technical achievements, framerate targets, and store releases',
      'Direct links to your showreel video, Steam/Itch.io store pages, and GitHub profile',
      'Keywords matching gameplay programmer, engine programmer, or graphics developer roles'
    ],
    interviewReadiness: [
      'Mastery of 3D math interview questions (calculating FOV, reflection vectors, quaternion rotations)',
      'Fluency in C++ memory management, virtual function tables, smart pointers, and data structures',
      'Ability to explain multiplayer netcode architecture (client prediction, reconciliation, lag compensation)',
      'Structured behavioral interview answers communicating team collaboration with artists and designers'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['game'] = gameRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameRoadmap;
}
