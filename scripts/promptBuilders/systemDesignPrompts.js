/**
 * System Design Prompts Collection (12 Prompts)
 * Covers URL Shortener, Chat, YouTube, Instagram Feed, Rate Limiter, Cache, Uber, Stripe, and Master Interview Framework.
 */
module.exports = [
  {
    id: 'sys-design-interview-master-template',
    title: 'System Design Interview: 45-Minute Master Blueprint',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'The definitive 7-step FAANG framework for driving a 45-minute High-Level System Design interview from ambiguity to deep dives.',
    prompt: `Act as a Staff Principal Architect at Meta/Google and System Design Interviewer. Conduct a complete 45-minute system design interview session for:

Target System:
{{SYSTEM_NAME}}

Expected Scale:
{{SCALE_METRICS}}

Structure the design strictly following this 7-step framework:
1. Requirements & Scope Clarification (5 mins):
   - Functional Requirements (top 3-4 features).
   - Non-Functional Requirements (Availability, Latency SLAs, Durability, Consistency model).
2. Back-of-the-Envelope Capacity Estimations (5 mins):
   - Daily Active Users (DAU), Read/Write QPS (Queries Per Second), Storage per year, Bandwidth ingress/egress.
3. API Design (5 mins):
   - Core REST / gRPC endpoint definitions with payload schemas and idempotency headers.
4. Data Modeling & Database Selection (5 mins):
   - Relational vs NoSQL choice. Schema entities, primary keys, foreign keys, and indexes.
5. High-Level Architecture Diagram (10 mins):
   - Client -> DNS / CDN -> Load Balancers (L4 vs L7) -> API Gateway -> Microservices -> Cache Layer -> Database -> Async Message Queues (Kafka).
6. Deep-Dive Bottlenecks & Edge Cases (10 mins):
   - Single points of failure (SPOF), partition tolerance, hot partitions / celebrity problem, cache stampede mitigation.
7. Trade-offs & Summary (5 mins):
   - CAP theorem compromises, operational complexity, and monitoring/alerting.

Expected Output Format:
Comprehensive, structured System Design Document with ASCII component architecture diagram and mathematical capacity derivation.`,
    tags: ['system-design', 'architecture', 'scalability', 'interview-prep', 'hld', 'faang'],
    difficulty: 'Interview',
    useCase: 'System Design',
    variables: ['{{SYSTEM_NAME}}', '{{SCALE_METRICS}}'],
    expectedOutput: 'Complete 7-step HLD document with capacity math, API contracts, schema, ASCII architecture, and deep dives'
  },
  {
    id: 'sys-design-url-shortener',
    title: 'Design a High-Scale URL Shortener (TinyURL / Bitly)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Designs a globally distributed URL shortener handling 100M new URLs/month: Base62 encoding, Key Generation Service (KGS), 301 vs 302 redirects, and caching.',
    prompt: `Act as a Principal Cloud Architect. Deliver an end-to-end High-Level System Design for a scalable URL shortener service (like TinyURL or Bitly).

Scale & Constraints:
{{SCALE_AND_CONSTRAINTS}}

Tasks:
1. Functional Requirements:
   - Given a long URL, generate a short alias (e.g. 7 characters).
   - Given a short alias, redirect the user to original long URL in <10ms.
   - Custom aliases and optional URL expiration.
2. Capacity Estimation:
   - 100M URLs generated per month -> QPS write, QPS read (100:1 read-to-write ratio).
   - Storage calculation for 5 years retention.
3. Core Hash / Shortening Algorithm:
   - MD5 / SHA-256 truncation vs Base62 Encoding ([a-z, A-Z, 0-9] = 62^7 = 3.5 trillion URLs).
   - Collision resolution: Key Generation Service (KGS) pre-generating unique random keys to eliminate database collision checks.
4. Redirection Status Code:
   - 301 Permanent Redirect (Browser caches, reduces server load, but loses analytics) vs 302 Found (Every request hits server for click analytics).
5. Architecture & Caching:
   - Redis cluster caching top 20% URLs (80/20 Pareto rule).
   - Relational DB (PostgreSQL) vs NoSQL (Cassandra/DynamoDB) justification.

Expected Output Format:
1. Capacity Estimation Math
2. Base62 & KGS Architecture Design
3. 301 vs 302 Trade-off Analysis
4. End-to-End System Architecture Diagram
5. Database Schema & Indexing`,
    tags: ['system-design', 'tinyurl', 'url-shortener', 'base62', 'caching', 'redis'],
    difficulty: 'Intermediate',
    useCase: 'System Design',
    variables: ['{{SCALE_AND_CONSTRAINTS}}'],
    expectedOutput: 'Capacity math + Base62/KGS design + 301 vs 302 comparison + architecture diagram + DB schema'
  },
  {
    id: 'sys-design-realtime-chat',
    title: 'Design a Real-Time Scalable Chat App (WhatsApp / Slack)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects a real-time messaging platform: persistent WebSocket gateways, message fan-out via Kafka, presence servers, and message delivery receipts.',
    prompt: `Act as a Distributed Systems Specialist. Design a real-time 1-on-1 and group chat system capable of handling 500 million active users.

Requirements & Scale:
{{CHAT_REQUIREMENTS}}

Tasks:
1. Network & Protocol Layer:
   - Persistent WebSocket connections vs HTTP long-polling.
   - Connection Gateway Servers: Managing millions of concurrent idle TCP/WebSocket connections.
2. Message Delivery Lifecycle:
   - User A sends message -> Gateway -> Message Service -> Kafka Partition -> Target Gateway -> User B.
   - Message Delivery Status Receipts: Sent (1 check), Delivered (2 checks), Read (blue checks).
3. Offline Messaging:
   - Storing undelivered messages in a queue and pushing via APNs / FCM push notifications when user is offline.
4. Presence Service:
   - Tracking online/offline status using heartbeat pings in Redis with TTL expiration.
5. Group Chat Fan-Out:
   - Small groups (fan-out on write to all participant queues).
   - Large channels (fan-out on read).
6. Data Store Selection:
   - Cassandra / HBase for high-write chat history vs PostgreSQL for user profiles.

Expected Output Format:
1. Message Delivery Sequence Diagram
2. WebSocket Gateway Cluster Architecture
3. Presence Service Architecture
4. Database Schema (Messages, Conversations, Participants)
5. Group Chat Scaling Strategy`,
    tags: ['system-design', 'chat', 'websockets', 'kafka', 'cassandra', 'whatsapp', 'slack'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{CHAT_REQUIREMENTS}}'],
    expectedOutput: 'Message sequence diagram + WebSocket gateway cluster + presence service + DB schema + group chat scaling'
  },
  {
    id: 'sys-design-video-streaming',
    title: 'Design a Video Streaming Platform (YouTube / Netflix)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects video ingestion, chunking, adaptive bitrate transcoding (HLS/DASH), geo-distributed CDN caching, and recommendation feeds.',
    prompt: `Act as a Media Infrastructure and Cloud Systems Architect. Design a video upload, transcoding, and global streaming architecture like YouTube or Netflix.

Scale & Requirements:
{{STREAMING_REQUIREMENTS}}

Tasks:
1. Video Ingestion Pipeline:
   - Chunked / Resumable multi-part upload to Object Storage (AWS S3).
   - Message queue triggering asynchronous video transcoding.
2. Transcoding & Adaptive Bitrate Streaming:
   - Encoding into multiple resolutions (1080p, 720p, 480p, 360p) and formats (H.264, VP9, AV1).
   - Chunking video into 4-6 second segments using HLS (.m3u8 index) and MPEG-DASH.
   - Client dynamically switching bitrates based on available bandwidth.
3. Content Delivery Network (CDN):
   - Edge CDN caching strategy (caching initial chunks for instant video start).
   - Geo-distributed Edge caching and cache purge policies.
4. Metadata & View Count Architecture:
   - High-throughput video metadata queries.
   - Distributed view count aggregation using Redis and Kafka to prevent database write bottlenecks.

Expected Output Format:
1. Ingestion & Transcoding Pipeline Diagram
2. Adaptive Bitrate (HLS/DASH) Architecture
3. CDN Caching & Edge Optimization
4. View Count Write-Aggregation Architecture`,
    tags: ['system-design', 'youtube', 'netflix', 'streaming', 'cdn', 'hls', 'video-processing'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{STREAMING_REQUIREMENTS}}'],
    expectedOutput: 'Ingestion pipeline diagram + HLS/DASH architecture + CDN caching + view count aggregation'
  },
  {
    id: 'sys-design-news-feed-social',
    title: 'Design a Social Media News Feed (Instagram / Twitter)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Designs social media activity feeds: Fan-out on Write vs Fan-out on Read, solving the Celebrity / Hotspot problem, and chronological vs ranked feeds.',
    prompt: `Act as a Principal Distributed Systems Engineer. Design a scalable social news feed system like Twitter or Instagram.

Scale & Traffic Assumptions:
{{FEED_SCALE}}

Tasks:
1. Feed Generation Paradigms:
   - Push Model (Fan-out on Write): Writing new post to all followers' feed caches immediately. (Fast reads, expensive writes).
   - Pull Model (Fan-out on Read): Querying all followed users upon request and merging. (Fast writes, slow reads).
2. The Celebrity / Influencer Problem:
   - Why Fan-out on Write collapses when a user with 50M followers posts.
   - Hybrid Architecture: Push for standard users, Pull for celebrities + dynamic merging in cache.
3. Feed Storage & Cache Structure:
   - Redis Sorted Sets (\`ZADD\`) storing post IDs indexed by timestamp for O(log N) pagination.
4. Feed Ranking Pipeline:
   - Chronological feed vs Machine Learning ranking service pipeline.

Expected Output Format:
1. Fan-out on Write vs Read Comparison Matrix
2. Celebrity Problem Hybrid Architecture Diagram
3. Redis Sorted Set Feed Cache Design
4. News Feed Generation Flowchart`,
    tags: ['system-design', 'news-feed', 'twitter', 'instagram', 'fan-out', 'redis-sorted-sets'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{FEED_SCALE}}'],
    expectedOutput: 'Fan-out comparison matrix + celebrity hybrid architecture + Redis sorted set design + flow diagram'
  },
  {
    id: 'sys-design-distributed-rate-limiter',
    title: 'Design an Enterprise Distributed Rate Limiter',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects a high-throughput distributed rate limiter: Token Bucket algorithm, Redis Lua script atomicity, and sliding window counter.',
    prompt: `Act as an Infrastructure Security Architect. Design a globally distributed rate-limiting service protecting downstream microservices.

Requirements & Scale:
{{RATE_LIMITER_SPECS}}

Tasks:
1. Algorithm Evaluation:
   - Token Bucket vs Leaky Bucket vs Fixed Window Counter vs Sliding Window Log vs Sliding Window Counter.
   - Justify selecting Token Bucket or Sliding Window Counter for production.
2. High-Concurrency Distributed Architecture:
   - Why naive \`GET -> increment -> SET\` in Redis causes race conditions under concurrent requests.
   - Atomic evaluation using Redis Lua Scripts.
3. Architecture Placement:
   - Client-side vs API Gateway (Kong, Envoy) vs Dedicated Microservice.
4. Handling Failures & Edge Cases:
   - What happens when the Redis rate limiter cluster fails? (Fail-open vs Fail-closed policy).
   - Multi-datacenter synchronization and local in-memory caching with batch sync.
5. Provide the exact Redis Lua script implementing the Token Bucket algorithm.

Expected Output Format:
1. Rate Limiting Algorithm Comparison Table
2. Distributed Architecture Diagram with Redis Cluster
3. Production Redis Lua Script (Atomic Token Bucket)
4. Fail-Open / Fail-Closed Strategy & Metrics`,
    tags: ['system-design', 'rate-limiter', 'redis', 'lua', 'token-bucket', 'security'],
    difficulty: 'Intermediate',
    useCase: 'System Design',
    variables: ['{{RATE_LIMITER_SPECS}}'],
    expectedOutput: 'Algorithm comparison table + Redis cluster architecture + atomic Lua script + failure policies'
  },
  {
    id: 'sys-design-distributed-cache',
    title: 'Design a Distributed In-Memory Cache (Redis / Memcached)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects an in-memory key-value cache: Consistent Hashing with virtual nodes, cache invalidation strategies, and thundering herd mitigation.',
    prompt: `Act as a Senior Infrastructure Engineer. Design a distributed in-memory caching system like Redis or Memcached.

Cache Scale & Access Patterns:
{{CACHE_SCALE_AND_PATTERNS}}

Tasks:
1. Node Partitioning & Routing:
   - Why modular hashing (\`hash(key) % N\`) triggers massive cache invalidation when servers are added/removed.
   - Implement Consistent Hashing Ring with Virtual Nodes to ensure uniform key distribution and minimal re-hashing on node changes.
2. Eviction Policies:
   - LRU (Least Recently Used), LFU (Least Frequently Used), and FIFO. Detail data structures for O(1) LRU (Hash Map + Doubly Linked List).
3. Cache Writing Strategies:
   - Cache-Aside (Lazy Loading).
   - Write-Through.
   - Write-Behind (Write-Back).
4. Cache Pitfalls & Mitigations:
   - Cache Stampede / Thundering Herd: Mutex locking on cache miss or probabilistic early expiration (XFetch).
   - Cache Penetration: Caching null values or using Bloom Filters.
   - Cache Avalanche: Adding random TTL jitter.

Expected Output Format:
1. Consistent Hashing Ring with Virtual Nodes Diagram
2. O(1) LRU Cache Data Structure Architecture
3. Writing Strategies Comparison Matrix
4. Cache Stampede & Avalanche Defense Blueprint`,
    tags: ['system-design', 'distributed-cache', 'redis', 'consistent-hashing', 'lru', 'caching'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{CACHE_SCALE_AND_PATTERNS}}'],
    expectedOutput: 'Consistent hashing ring diagram + O(1) LRU architecture + writing strategies + stampede defense'
  },
  {
    id: 'sys-design-ridesharing-uber',
    title: 'Design a Ride-Sharing Matching Platform (Uber / Lyft)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Designs real-time geospatial ride matching: QuadTree vs Google S2 / Uber H3 geospatial indexing, location ingestion, and trip dispatching.',
    prompt: `Act as a Staff Systems Architect. Design a real-time ride-matching platform like Uber or Lyft.

Scale & Requirements:
{{RIDESHARING_REQUIREMENTS}}

Tasks:
1. Geospatial Data Ingestion:
   - Drivers streaming GPS coordinates every 3-5 seconds via WebSockets.
   - Managing millions of location updates per second without overwhelming the database.
2. Geospatial Indexing:
   - Compare Geo-hashing, QuadTrees, Google S2 Cells, and Uber H3 hexagonal hierarchical spatial index.
   - In-memory geospatial index in Redis (GEOADD, GEORADIUS) for sub-millisecond location queries.
3. Driver-Rider Matching Engine:
   - Finding top N closest available drivers within radius R.
   - Dispatch workflow, driver acceptance timeout, and optimistic locking to prevent double-booking.
4. Dynamic Surge Pricing:
   - Aggregating demand (rider requests) vs supply (available drivers) per geospatial cell in real-time.

Expected Output Format:
1. Geospatial Indexing Comparison (QuadTree vs H3 vs S2)
2. GPS Location Ingestion Pipeline Diagram
3. Driver Matching & Dispatch Flowchart
4. Surge Pricing Calculation Architecture`,
    tags: ['system-design', 'uber', 'lyft', 'geospatial', 'redis', 'quadtree', 'h3'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{RIDESHARING_REQUIREMENTS}}'],
    expectedOutput: 'Geospatial indexing comparison + GPS ingestion pipeline + matching flowchart + surge pricing architecture'
  },
  {
    id: 'sys-design-payment-gateway-stripe',
    title: 'Design an Idempotent Payment Processing Gateway (Stripe)',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects payment processing with zero double-charging guarantees: idempotency keys, two-phase commits, double-entry ledgers, and webhooks.',
    prompt: `Act as a Fintech and Payment Systems Architect. Design a high-reliability, zero-loss payment gateway like Stripe.

Payment Workflow & Compliance:
{{PAYMENT_WORKFLOW}}

Tasks:
1. Zero Double-Charging Guarantee:
   - Idempotency Keys: Client generates UUID sent in \`Idempotency-Key\` header.
   - Database uniqueness constraint and atomic distributed lock during processing.
2. Double-Entry Bookkeeping Ledger:
   - Every financial transaction must be recorded as balanced Debits and Credits (\`Debit Total == Credit Total\`).
   - Immutability: Ledger records are append-only; mistakes are corrected via reversal entries, never updates or deletes.
3. Distributed State Machine & Retries:
   - Handling timeout during acquirer network call (Did the bank charge the user or not?).
   - Reconciliation jobs and asynchronous webhooks with exponential backoff and HMAC-SHA256 signatures.
4. Data Security:
   - PCI-DSS tokenization (sensitive credit card numbers never touch core application servers).

Expected Output Format:
1. Idempotency Key Processing Lifecycle Flowchart
2. Double-Entry Ledger Schema & Sample Journal Entries
3. Payment State Machine Diagram
4. Webhook Delivery & Signature Verification Architecture`,
    tags: ['system-design', 'fintech', 'payments', 'stripe', 'idempotency', 'ledger', 'acid'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{PAYMENT_WORKFLOW}}'],
    expectedOutput: 'Idempotency lifecycle flowchart + double-entry ledger schema + state machine + webhook architecture'
  },
  {
    id: 'sys-design-web-crawler-scale',
    title: 'Design a Distributed Web Crawler at Scale',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects a distributed web crawler: URL Frontier priority queue, Bloom filters for deduplication, robots.txt compliance, and worker politeness.',
    prompt: `Act as a Search Engine Infrastructure Architect. Design a distributed web crawler that crawls 1 billion pages per month.

Scale & Target:
{{CRAWLER_REQUIREMENTS}}

Tasks:
1. Crawling Pipeline:
   - URL Frontier: Priority Queues managing crawling priority (PageRank) and Politeness (per-host rate-limiting).
   - Fetcher & HTML Parser.
   - Content Extraction and Duplicate Document Elimination (SimHash / MinHash).
2. URL Deduplication:
   - Checking whether a discovered URL has already been visited.
   - Memory calculation: Why storing 1 billion URLs in a Hash Set is too large for RAM.
   - Bloom Filters: Memory-efficient probabilistic membership testing.
3. Politeness & Robots.txt:
   - Obeying \`robots.txt\` crawl-delay and disallow paths.
   - Caching parsed \`robots.txt\` per domain.
4. Fault Tolerance:
   - Handling dead links, spider traps (infinite calendar loops), and unresponsive servers.

Expected Output Format:
1. End-to-End Crawler Pipeline Architecture Diagram
2. URL Frontier (Priority & Politeness Queues) Design
3. Bloom Filter Sizing & False Positive Math
4. Spider Trap Detection Strategy`,
    tags: ['system-design', 'web-crawler', 'bloom-filter', 'distributed-systems', 'search-engine'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{CRAWLER_REQUIREMENTS}}'],
    expectedOutput: 'Crawler pipeline diagram + URL frontier design + Bloom filter math + spider trap defense'
  },
  {
    id: 'sys-design-notification-service',
    title: 'Design a Multi-Channel Notification Platform',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Architects a notification hub supporting Email, SMS, and Mobile Push: user preference matrices, rate limits, templating, and provider failover.',
    prompt: `Act as a Cloud Messaging Architect. Design a unified notification delivery service supporting millions of alerts per minute.

Channels & Requirements:
{{NOTIFICATION_REQUIREMENTS}}

Tasks:
1. Multi-Channel Dispatch:
   - Unified API endpoint: \`POST /api/v1/notifications\`.
   - Channels: Email (SendGrid/SES), SMS (Twilio), Push (APNs/FCM), In-App WebSockets.
2. User Notification Preferences:
   - Opt-in/opt-out matrix per topic and channel (e.g. Email for invoices, Push for messages, No SMS).
   - Quiet hours and time-zone aware delivery windows.
3. Priority Queuing & Rate Limiting:
   - Priority queues: High-priority (OTP verification codes) vs Low-priority (marketing newsletters).
   - User-level rate limiting: Prevent spamming a user with 50 notifications in 10 minutes.
4. Third-Party Provider Failover & Idempotency:
   - Automatic failover if primary SMS provider experiences downtime.
   - Deduplication keys to prevent sending duplicate notifications on retry.

Expected Output Format:
1. Notification Platform Architecture Diagram
2. Priority Queue & Worker Scheduling Flow
3. User Preference Schema & Filter Logic
4. Provider Failover & Deduplication Strategy`,
    tags: ['system-design', 'notifications', 'push-notifications', 'queues', 'kafka', 'messaging'],
    difficulty: 'Intermediate',
    useCase: 'System Design',
    variables: ['{{NOTIFICATION_REQUIREMENTS}}'],
    expectedOutput: 'Platform architecture diagram + priority queue worker flow + user preference schema + failover strategy'
  },
  {
    id: 'sys-design-ecommerce-flash-sale',
    title: 'Design an E-Commerce Flash Sale & Inventory System',
    category: 'Engineering',
    subcategory: 'System Design',
    description: 'Prevents overselling under extreme traffic spikes: Redis atomic pre-decrement, message queue order buffering, and database optimistic locks.',
    prompt: `Act as an E-Commerce High-Concurrency Architect. Design a Flash Sale system selling 10,000 limited-stock items to 1 million concurrent buyers.

Sale Specifications:
{{FLASH_SALE_SPECS}}

Tasks:
1. The Overselling Problem:
   - Why traditional relational database transactions (\`UPDATE stock = stock - 1\`) cause lock contention and database crashes under 100k requests/sec.
2. Three-Tier Inventory Architecture:
   - Tier 1: Static Edge CDN caching flash sale landing page and asset bundles.
   - Tier 2: In-Memory Redis inventory pre-decrement using atomic Lua scripts (\`stock = DECR(item_key); if stock < 0 then INCR(item_key) return nil\`).
   - Tier 3: Async Order Queue (Kafka / RabbitMQ) decoupling order placement from payment processing.
3. Inventory Reservation & Expiration:
   - Holding inventory for 10 minutes while user completes checkout.
   - Releasing inventory back to stock if payment times out using delayed queues or Redis key expiration.
4. Bot Mitigation:
   - Dynamic CAPTCHA triggers, rate limiting, and URL token encryption until sale starts.

Expected Output Format:
1. High-Concurrency Flash Sale Flowchart
2. Atomic Redis Inventory Lua Script
3. Inventory Reservation & Expiration Lifecycle
4. Database Fallback & Concurrency Safeguards`,
    tags: ['system-design', 'flash-sale', 'e-commerce', 'redis', 'inventory', 'concurrency', 'queues'],
    difficulty: 'Advanced',
    useCase: 'System Design',
    variables: ['{{FLASH_SALE_SPECS}}'],
    expectedOutput: 'Flash sale flowchart + atomic Redis Lua script + reservation lifecycle + database safeguards'
  }
];
