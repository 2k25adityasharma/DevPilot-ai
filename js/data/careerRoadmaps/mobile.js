/**
 * DevPilot-AI — Career Roadmap: Mobile Developer
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const mobileRoadmap = {
  roleId: 'mobile-developer',
  roadmapId: 'mobile',
  title: 'Mobile Developer',
  category: 'development',
  description: 'Engineer high-performance cross-platform or native mobile applications for iOS and Android: reactive UI, native device APIs, offline synchronization, and app store deployment.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Mobile runtime concepts, TypeScript/Dart/Kotlin basics, layout fundamentals, and version control.',
      skills: [
        {
          id: 'mob-lang-core',
          title: 'Mobile Programming Foundations (TypeScript / Dart / Kotlin)',
          category: 'Programming Languages',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: [],
          description: 'Master core programming for mobile engineering: object-oriented patterns, strict static typing, asynchronous streams/futures, and memory lifecycle.',
          whatToLearn: [
            'Language fundamentals: variables, primitive types, collections (Lists, Maps, Sets)',
            'Object-oriented principles: classes, interfaces, inheritance, mixins, and abstraction',
            'Asynchronous programming: Futures/Promises, async/await, streams, and error handling',
            'Functional programming paradigms: immutability, mapping, filtering, and closures'
          ],
          whyItMatters: 'Mobile devices operate under battery and RAM constraints. Clean asynchronous programming prevents application ANR (Application Not Responding) crashes.',
          productionUse: 'Core language for writing business logic, state machines, and network calls in mobile applications.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate mock data structures and algorithm helper utilities; verify type correctness.',
          handsOnTask: 'Build an asynchronous currency converter and expense calculation utility with full type safety.',
          projectApplication: 'Serves as the programming foundation for all mobile app projects.',
          resources: [
            { title: 'React Native Getting Started', url: 'https://reactnative.dev/docs/getting-started', type: 'documentation' },
            { title: 'Flutter Documentation', url: 'https://docs.flutter.dev/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mob-ui-layout',
          title: 'Mobile UI Layout, Flexbox & Responsive Screens',
          category: 'Mobile UI',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['mob-lang-core'],
          description: 'Master mobile screen rendering: Flexbox layout, screen density/scaling (dp/pt), safe area insets, touch gestures, and accessibility.',
          whatToLearn: [
            'Mobile Flexbox layout: flexDirection (column default), justifyContent, alignItems, flexWrap',
            'Handling screen safe areas: notches, dynamic islands, home indicator bars, and orientation changes',
            'Platform-adaptive UI: iOS Human Interface Guidelines vs Android Material Design 3 guidelines',
            'Touch handling: TouchableOpacity, Pressable, gesture recognizers, and touch target sizes (min 48x48dp)'
          ],
          whyItMatters: 'Mobile apps must look pixel-perfect across thousands of distinct device dimensions, notch styles, and aspect ratios.',
          productionUse: 'Structuring mobile screens, navigation headers, lists, and modal drawers.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft responsive style sheets for common screen layouts; manually verify touch targets on real devices.',
          handsOnTask: 'Build an adaptive profile and settings screen that handles iOS dynamic islands and Android system bars smoothly.',
          projectApplication: 'Provides the layout foundation for the Fitness Tracking Mobile App.',
          resources: [
            { title: 'Material Design 3', url: 'https://m3.material.io/', type: 'design' },
            { title: 'Apple Human Interface Guidelines', url: 'https://developer.apple.com/design/human-interface-guidelines/', type: 'design' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Mobile navigation stacks, state management, REST API integration, and user authentication.',
      skills: [
        {
          id: 'mob-nav-routing',
          title: 'Mobile Navigation (Stack, Tabs & Drawers)',
          category: 'Navigation',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['mob-ui-layout'],
          description: 'Implement seamless mobile navigation using React Navigation / GoRouter: stack navigators, bottom tab bars, drawer menus, deep linking, and transition animations.',
          whatToLearn: [
            'Navigation hierarchies: Native Stack Navigator, Bottom Tab Navigator, Drawer Navigator',
            'Passing parameters between screens and handling type-safe route parameters',
            'Deep linking configuration (scheme:// and universal links) to open specific screens from external URLs',
            'Navigation lifecycle events: focus, blur, screen transition animations, and back button handling'
          ],
          whyItMatters: 'Flawless navigation is critical to mobile user experience. Memory leaks occur when navigation stacks are poorly managed.',
          productionUse: 'Orchestrating multi-screen consumer and enterprise mobile applications.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate boilerplate navigation route configs and type declarations.',
          handsOnTask: 'Build a multi-screen e-commerce mobile app with a bottom tab bar, nested product detail stacks, and deep link support.',
          projectApplication: 'Provides the navigation skeleton for all progressive mobile projects.',
          resources: [
            { title: 'React Navigation Documentation', url: 'https://reactnavigation.org/docs/getting-started/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mob-state-network',
          title: 'Mobile State Management & Network Layer',
          category: 'Data & State',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mob-nav-routing'],
          description: 'Manage app state and network communication: Zustand / Bloc / Redux, TanStack Query, offline caching, request retries, and JWT auth tokens.',
          whatToLearn: [
            'Global state management for mobile: lightweight stores (Zustand) vs reactive streams (Bloc)',
            'Server data synchronization with TanStack Query: caching, background re-fetching, and optimistic updates',
            'Axios / Fetch interceptors for automatic JWT access token attachment and refresh token renewal',
            'Handling intermittent connectivity: detecting network status (NetInfo) and queuing mutations'
          ],
          whyItMatters: 'Mobile networks are unreliable. Apps that crash or freeze when entering elevators or tunnels get uninstalled immediately.',
          productionUse: 'Synchronizing client state with backend cloud services reliably across mobile networks.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate mock API endpoints and simulate network latency and connection timeouts.',
          handsOnTask: 'Build a weather app with network status detection, automatic offline data caching, and pull-to-refresh data reloading.',
          projectApplication: 'Provides data fetching and state management for the Offline-First E-Commerce Mobile App.',
          resources: [
            { title: 'TanStack Query for Mobile', url: 'https://tanstack.com/query/latest', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Native device APIs, local persistence with SQLite/MMKV, push notifications, and background tasks.',
      skills: [
        {
          id: 'mob-native-apis',
          title: 'Native Device APIs & Hardware Sensors',
          category: 'Native Integration',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mob-state-network'],
          description: 'Interface with device hardware: camera capture, photo library, geolocation, accelerometer/gyroscope sensors, haptic feedback, and biometric auth (FaceID/Fingerprint).',
          whatToLearn: [
            'Device permission lifecycles (iOS Info.plist & Android AndroidManifest.xml permissions)',
            'Camera & media: image capture, barcode/QR scanning, video playback, and photo library access',
            'Location services: foreground vs background GPS tracking, geofencing, and location accuracy settings',
            'Biometric authentication: Face ID / Touch ID / Android BiometricPrompt for secure login',
            'Haptic feedback and sound effects for enhanced tactile user experience'
          ],
          whyItMatters: 'Leveraging native hardware capabilities transforms a web wrapper into a truly engaging, native-feeling mobile experience.',
          productionUse: 'Building fitness trackers, banking apps with biometric auth, and delivery apps with GPS tracking.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate platform permission strings and boilerplate sensor listeners.',
          handsOnTask: 'Build a fitness walk tracker that records GPS location coordinates, calculates distance traveled, and provides haptic milestones.',
          projectApplication: 'Core feature set for the Fitness & Activity Tracker Mobile App.',
          resources: [
            { title: 'Expo Device APIs', url: 'https://docs.expo.dev/versions/latest/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mob-offline-storage',
          title: 'Local Storage, SQLite & Offline Synchronization',
          category: 'Storage & Offline',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['mob-native-apis'],
          description: 'Master fast local persistence: MMKV for key-value pairs, SQLite / WatermelonDB for relational data, and bidirectional offline-first sync engines.',
          whatToLearn: [
            'High-speed key-value storage: react-native-mmkv (10x faster than AsyncStorage)',
            'Embedded relational databases: SQLite / WatermelonDB for local multi-thousand record querying',
            'Offline sync patterns: local-first mutations, syncing queue, and conflict resolution (last-write-wins vs server-wins)',
            'Secure storage: iOS Keychain and Android EncryptedSharedPreferences for authentication tokens'
          ],
          whyItMatters: 'Users expect mobile apps to work instantly, even when completely offline on flights or in subway tunnels.',
          productionUse: 'Notes apps, field service tools, mobile CRM, and high-speed offline data catalogs.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to model offline conflict resolution scenarios and generate SQLite schema migrations.',
          handsOnTask: 'Build an offline-first task and note app that allows complete offline editing and seamlessly syncs to a backend when connectivity resumes.',
          projectApplication: 'Powers the local data engine of the Offline-First E-Commerce Mobile App.',
          resources: [
            { title: 'WatermelonDB Guide', url: 'https://watermelondb.dev/docs', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Performance optimization, memory management, push notifications, and automated mobile testing.',
      skills: [
        {
          id: 'mob-performance-lists',
          title: 'Mobile Performance, List Virtualization & Memory Profiling',
          category: 'Performance',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['mob-offline-storage'],
          description: 'Achieve smooth 60/120 FPS animations: FlatList / FlashList optimization, Hermes JS engine profiling, memory leak detection, and startup time optimization.',
          whatToLearn: [
            'High-performance list rendering: FlashList / FlatList windowing, keyExtractor, and getItemLayout',
            'Image caching and optimization: FastImage, memory caching, and thumbnail pre-fetching',
            'JavaScript thread vs UI native thread: offloading animations to the native thread with Reanimated',
            'Profiling with Flipper / Android Studio Profiler / Xcode Instruments: detecting memory leaks and dropped frames',
            'Optimizing app launch time (Time to Interactive) and reducing app binary (.apk/.ipa) bundle size'
          ],
          whyItMatters: 'Janky, lagging apps with dropped animation frames get terrible app store ratings and high uninstallation rates.',
          productionUse: 'Scaling social media infinite feeds, marketplace product catalogs, and high-frequency real-time apps.',
          aiRelevance: 'Low',
          aiWorkflow: 'Profile performance manually with Xcode Instruments and Android Profiler; AI cannot measure real frame rates on physical hardware.',
          handsOnTask: 'Optimize an unoptimized list of 10,000 items with images to maintain a consistent 60 FPS scroll rate without memory spikes.',
          projectApplication: 'Ensures the Capstone Mobile App maintains 60+ FPS on mid-range mobile hardware.',
          resources: [
            { title: 'Shopify FlashList Documentation', url: 'https://shopify.github.io/flash-list/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mob-push-notifications',
          title: 'Push Notifications (APNs & FCM) & Deep Linking',
          category: 'User Engagement',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Advanced',
          importance: 'Essential',
          estimatedTime: '2 weeks',
          prerequisites: ['mob-performance-lists'],
          description: 'Implement remote and local push notifications: Apple Push Notification service (APNs), Firebase Cloud Messaging (FCM), notification badges, and actionable notifications.',
          whatToLearn: [
            'Push notification architecture: APNs certificates/keys, FCM project setup, device push tokens',
            'Foreground, background, and killed app state notification handling',
            'Notification actions and rich interactive media attachments',
            'Routing from notification clicks to specific deep-linked screens with payload data'
          ],
          whyItMatters: 'Push notifications are the primary retention and engagement engine for consumer mobile applications.',
          productionUse: 'Order status updates, messaging chat alerts, breaking news, and transactional security alerts.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate server-side notification payload JSON formats for APNs and FCM.',
          handsOnTask: 'Set up remote push notifications with FCM that route users to a specific order detail screen when tapped.',
          projectApplication: 'Integrated into the Production Food Delivery & Tracking Mobile App.',
          resources: [
            { title: 'Firebase Cloud Messaging (FCM) Docs', url: 'https://firebase.google.com/docs/cloud-messaging', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'App Store & Google Play publishing, Fastlane CI/CD, mobile security, and technical interview preparation.',
      skills: [
        {
          id: 'mob-cicd-publishing',
          title: 'App Store & Google Play Deployment with Fastlane',
          category: 'Mobile DevOps',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['mob-push-notifications'],
          description: 'Master mobile app release automation: Fastlane pipelines, Apple developer certificates/provisioning profiles, Android keystores, TestFlight beta distribution, and app store compliance.',
          whatToLearn: [
            'iOS code signing: certificates, provisioning profiles, App Store Connect setup, and TestFlight builds',
            'Android code signing: release keystores, Android App Bundle (AAB), Google Play Console tracks',
            'Fastlane automation: automated screenshot capture, building binaries, and uploading to test tracks',
            'Over-The-Air (OTA) updates with Expo EAS Update / CodePush for instant bug fixes without full store review',
            'App Store Review Guidelines and Privacy Nutrition Labels compliance'
          ],
          whyItMatters: 'Manual mobile builds are slow, error-prone, and painful. Automated CI/CD with Fastlane enables one-click release deployments.',
          productionUse: 'Deploying commercial mobile apps to millions of users across Apple App Store and Google Play Store.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate Fastlane Fastfile lane configurations; audit provisioning profiles manually.',
          handsOnTask: 'Configure a Fastlane pipeline that automatically builds an Android AAB and iOS build and deploys to TestFlight/Internal Testing.',
          projectApplication: 'Deploys the Capstone Mobile App to public app store testing tracks.',
          resources: [
            { title: 'Fastlane Documentation', url: 'https://docs.fastlane.tools/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'mob-interview-portfolio',
          title: 'Mobile Developer Portfolio, Code Demos & Interviews',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['mob-cicd-publishing'],
          description: 'Package mobile projects with live video screen recordings, TestFlight demo access, mobile system design interview practice, and an ATS-tailored resume.',
          whatToLearn: [
            'Mobile System Design interview rounds: designing Instagram Feed, Uber Driver App, or WhatsApp offline chat',
            'Explaining mobile architectural patterns: MVC, MVVM, Clean Architecture, and Unidirectional Data Flow',
            'Creating compelling mobile portfolio demos: high-resolution screen capture videos, TestFlight links, and architecture diagrams',
            'Crafting resume bullets highlighting app performance, crash-free rates (99.8%+), and store download metrics'
          ],
          whyItMatters: 'Proving you can ship polished, crash-free mobile apps with demonstrable store links distinguishes you from typical web applicants.',
          productionUse: 'Interviewing for mobile engineering roles at product tech companies.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to simulate mobile system design questions focusing on battery consumption and offline data sync.',
          handsOnTask: 'Produce a 2-minute video walkthrough of your capstone app demonstrating offline sync, push notifications, and 60 FPS scrolling.',
          projectApplication: 'Showcases your mobile engineering capabilities to hiring managers.',
          resources: [
            { title: 'Mobile System Design Guide', url: 'https://github.com/weeeBox/mobile-system-design', type: 'guide' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'mob-proj-1',
      title: 'Personal Fitness & Activity Tracker Mobile App',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Develop a mobile fitness tracking app featuring custom UI, device sensor integration, local storage, and statistics visualization.',
      technologies: ['React Native / Flutter', 'TypeScript / Dart', 'Zustand / Provider', 'AsyncStorage / MMKV', 'Reanimated'],
      skillsPracticed: ['Mobile UI layout', 'Device step counter / accelerometer', 'Local storage', 'Charts and stats', 'Dark mode'],
      requirements: [
        'Daily step count, active minutes, and calorie burn dashboard with progress rings',
        'Workout logging with exercise types, sets, reps, and timestamp records',
        'Interactive weekly and monthly activity charts',
        'Clean light and dark mode support adapting to system theme'
      ],
      deliverables: [
        'Working mobile application running smoothly on iOS and Android simulators',
        'GitHub repository with screen recording demonstration GIFs',
        'Clean component structure with strict type annotations'
      ],
      productionExpectations: [
        'Smooth 60 FPS transitions between screens',
        'Graceful handling of device orientation and safe area insets'
      ],
      aiIntegration: 'Use AI to generate workout dataset recommendations and calculate calorie burn estimates.'
    },
    {
      id: 'mob-proj-2',
      title: 'Offline-First E-Commerce & Marketplace App',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 weeks',
      objective: 'Build an offline-first mobile shopping application with product catalogs, shopping cart, SQLite local cache, and biometric authentication.',
      technologies: ['React Native / Flutter', 'TypeScript / Dart', 'SQLite / WatermelonDB', 'TanStack Query', 'Biometrics API', 'Stripe Mobile SDK'],
      skillsPracticed: ['Offline-first sync', 'SQLite database', 'Biometric login', 'Payment integration', 'List virtualization'],
      requirements: [
        'Product browsing with high-performance virtualized lists (FlashList)',
        'Complete offline functionality allowing users to browse cached products and add to cart while offline',
        'Biometric Face ID / Fingerprint login to authenticate existing users',
        'Checkout flow integrated with Stripe mobile payment sheet'
      ],
      deliverables: [
        'Runnable iOS and Android builds with sample catalog data',
        'Documentation explaining the offline database synchronization strategy',
        'Test suite verifying cart calculations and offline state persistence'
      ],
      productionExpectations: [
        'Zero frame drops when scrolling through 500+ product catalogs with images',
        'Instantaneous cart updates with optimistic local database writes'
      ],
      aiIntegration: 'Use AI to generate realistic product mock datasets and simulate network dropouts.'
    },
    {
      id: 'mob-proj-3',
      title: 'Production Real-Time Food Delivery & Tracking App',
      difficulty: 'Production',
      estimatedTime: '6 weeks',
      objective: 'Architect an enterprise food delivery application featuring live courier GPS tracking, WebSockets, push notifications, and automated Fastlane deployment.',
      technologies: ['React Native / Flutter', 'TypeScript / Dart', 'Google Maps SDK', 'WebSockets', 'Firebase FCM', 'Fastlane', 'GitHub Actions'],
      skillsPracticed: ['Real-time GPS mapping', 'Push notifications', 'WebSocket synchronization', 'Fastlane CI/CD', 'App store release'],
      requirements: [
        'Live interactive map displaying restaurant locations, delivery route polylines, and real-time courier icon movement',
        'Real-time order status timeline updated via WebSockets (Placed, Preparing, On the way, Delivered)',
        'Push notifications sent at key delivery milestones with deep links to the live tracking screen',
        'Automated Fastlane deployment pipeline uploading builds to TestFlight / Google Play Internal Testing'
      ],
      deliverables: [
        'Live TestFlight and Google Play Internal beta release links',
        'GitHub repository with complete Fastlane configuration and passing CI/CD pipeline',
        'Architecture documentation detailing real-time map rendering and battery optimization'
      ],
      productionExpectations: [
        'Battery-optimized location tracking using significant motion changes rather than continuous GPS polling',
        '99.5%+ crash-free session rate across diverse test devices'
      ],
      aiIntegration: 'Implement an AI-powered smart dish recommendation engine based on user order history.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Mobile programming language proficiency (TypeScript / Dart / Kotlin)',
      'Cross-platform mobile framework mastery (React Native or Flutter)',
      'Mobile Flexbox layout, safe areas, responsive scaling, and platform guidelines',
      'Navigation architectures: Native Stacks, Bottom Tabs, and Deep Linking',
      'Mobile state management and remote data synchronization (TanStack Query)',
      'Native device APIs: Camera, Geolocation, Biometrics, and Haptics',
      'High-speed local storage: MMKV and embedded SQLite / WatermelonDB',
      'Performance profiling: 60 FPS list virtualization, Hermes profiling, memory leak detection',
      'Remote push notifications via APNs and Firebase Cloud Messaging (FCM)',
      'Automated build and release pipelines with Fastlane and app store publishing'
    ],
    projects: [
      'Fitness and activity tracker mobile app with sensor integration and charts',
      'Offline-first e-commerce app with SQLite cache and biometric auth',
      'Real-time food delivery app with live GPS mapping, WebSockets, and push alerts',
      'All projects demonstrated via video walkthroughs and test track release builds'
    ],
    csFundamentals: [
      'Mobile operating system lifecycles (Foreground, Background, Suspended, Killed)',
      'Memory management and garbage collection on resource-constrained devices',
      'Network protocols on mobile: cellular latency, offline caching, and retry strategies',
      'Core data structures and algorithms applied to mobile UI and state transitions'
    ],
    tools: [
      'Xcode and Android Studio development, emulation, and profiling suites',
      'Fastlane automation CLI for code signing and beta distribution',
      'Git version control and pull request workflows',
      'Performance profiling tools: React Native DevTools, Flipper, Android Studio Profiler'
    ],
    deployment: [
      'Apple Developer Program: certificates, provisioning profiles, App Store Connect, TestFlight',
      'Google Play Console: keystores, Android App Bundles (AAB), and release tracks',
      'Automated GitHub Actions CI/CD building mobile binaries via Fastlane',
      'Over-The-Air (OTA) update configuration for instant production hotfixes'
    ],
    portfolio: [
      'Mobile engineering portfolio featuring high-resolution app demonstration videos',
      'Live TestFlight public links or downloadable demo APKs for recruiters',
      'In-depth mobile architecture case studies highlighting offline sync and performance',
      'Clean documentation with mobile system architecture diagrams'
    ],
    github: [
      'Public GitHub repositories with clear setup commands and simulator run instructions',
      'Comprehensive README files with feature GIF walkthroughs and tech stack badges',
      'Clean commit history following Conventional Commits format',
      'Visible automated CI build status badges on pull requests'
    ],
    resume: [
      'Clean, single-page ATS-optimized mobile developer resume in standard PDF format',
      'Bullet points highlighting app performance (FPS), crash-free rates, and store metrics',
      'Targeted mobile keywords matching current iOS/Android/React Native job openings',
      'Direct links to GitHub, portfolio videos, and live store / TestFlight builds'
    ],
    interviewReadiness: [
      'Fluency in Mobile System Design interview scenarios (Chat App, News Feed, Uber Driver)',
      'Deep understanding of native bridging, threads (JS vs UI thread), and memory leaks',
      'Mastery of mobile offline synchronization and conflict resolution strategies',
      'Structured behavioral interview answers using the STAR method'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['mobile'] = mobileRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = mobileRoadmap;
}
