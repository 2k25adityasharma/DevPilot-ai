// js/data/interviewPrep/systemDesign.js
// Complete Question Bank & Case Studies for System Design
// 20 High-Yield MCQs + 10 Complete End-to-End System Design Case Studies

window.interviewPrepSystemDesign = {
  id: 'system_design',
  title: 'System Design',
  icon: 'schema',
  description: 'Master architectural scaling, caching, databases, load balancers, messaging, and 10 production case studies.',
  totalQuestions: 20,
  topics: [
    'System Design Fundamentals'
  ],
  questions: [
  {
    "id": "sd_mcq_1",
    "topic": "System Design Fundamentals",
    "difficulty": "Easy",
    "question": "What is the difference between Vertical Scaling (Scale Up) and Horizontal Scaling (Scale Out)?",
    "options": [
      "Vertical adds more servers; Horizontal adds RAM to one server",
      "Vertical adds more power (CPU, RAM, NVMe) to an existing single machine; Horizontal adds more machines to a distributed cluster",
      "Horizontal scaling is only for databases",
      "Vertical scaling has no physical limit"
    ],
    "correctAnswer": 1,
    "explanation": "Vertical scaling upgrades hardware resources of a single server (constrained by hardware limits and creates single point of failure). Horizontal scaling distributes load across multiple machines in a network, providing high availability and near-infinite scale."
  },
  {
    "id": "sd_mcq_2",
    "topic": "System Design Fundamentals",
    "difficulty": "Easy",
    "question": "What does the CAP Theorem state regarding distributed data stores?",
    "options": [
      "A system can achieve Consistency, Availability, and Performance simultaneously",
      "A distributed system can guarantee at most two out of three properties simultaneously: Consistency, Availability, and Partition Tolerance",
      "Network partitions can be avoided with fiber optics",
      "All databases must be ACID compliant"
    ],
    "correctAnswer": 1,
    "explanation": "Eric Brewer's CAP theorem proves that in the presence of an inevitable network partition (P), a distributed system must choose between Consistency (C - all nodes see identical data simultaneously) or Availability (A - every non-failing node returns a non-error response)."
  },
  {
    "id": "sd_mcq_3",
    "topic": "System Design Fundamentals",
    "difficulty": "Easy",
    "question": "What is a Load Balancer and at which OSI layers does it typically operate?",
    "options": [
      "A database query optimizer running at Layer 2",
      "A device or software distributing incoming network traffic across multiple backend servers, operating primarily at Layer 4 (Transport - TCP/UDP) or Layer 7 (Application - HTTP/HTTPS)",
      "A hardware firewall operating only at Layer 1",
      "A cache replacement mechanism"
    ],
    "correctAnswer": 1,
    "explanation": "Load balancers distribute user requests across server pools. L4 load balancers make routing decisions based on IP address and TCP/UDP ports. L7 load balancers inspect application data (HTTP headers, URLs, cookies) for content-based routing."
  },
  {
    "id": "sd_mcq_4",
    "topic": "System Design Fundamentals",
    "difficulty": "Easy",
    "question": "What is the primary difference between SQL (Relational) and NoSQL databases in system design?",
    "options": [
      "SQL databases cannot store text",
      "SQL databases have structured schemas, ACID transactions, and support relational joins; NoSQL databases offer flexible schemas, horizontal scaling, and optimize for specific data models (key-value, document, column, graph)",
      "NoSQL databases do not support clustering",
      "SQL is always faster for massive distributed reads"
    ],
    "correctAnswer": 1,
    "explanation": "SQL databases (PostgreSQL, MySQL) excel at complex relational queries and strong ACID guarantees. NoSQL databases (MongoDB, Cassandra, DynamoDB) trade relational joins for schema flexibility, horizontal partitioning, and high-throughput distributed operations."
  },
  {
    "id": "sd_mcq_5",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is the \"Cache-Aside\" (Lazy Loading) caching pattern?",
    "options": [
      "The cache automatically writes to the database in the background",
      "The application first checks the cache for data; if found (hit), returns it; if absent (miss), loads from database, writes it to cache, and returns it",
      "The database writes directly to the cache on every insert",
      "Cache entries never expire"
    ],
    "correctAnswer": 1,
    "explanation": "In Cache-Aside: Application checks cache -> On miss, reads from database -> Populates cache with retrieved data -> Returns data. Only requested data is cached, avoiding memory bloat for unaccessed records."
  },
  {
    "id": "sd_mcq_6",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What problem does \"Consistent Hashing\" solve in distributed caching and database sharding?",
    "options": [
      "It encrypts user passwords across nodes",
      "When nodes are added or removed from a cluster, it ensures that only K/N keys need to be remapped on average (where K is keys and N is servers), preventing mass cache invalidation",
      "It forces all cache queries to run synchronously",
      "It guarantees zero latency on queries"
    ],
    "correctAnswer": 1,
    "explanation": "Traditional hash mod N (`hash(key) % N`) causes almost all keys to be reshuffled whenever a server joins or leaves. Consistent hashing maps keys and servers onto a circular ring (hash ring), minimizing data movement when nodes scale."
  },
  {
    "id": "sd_mcq_7",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is the difference between Write-Through and Write-Back caching strategies?",
    "options": [
      "Write-through is for hard drives; write-back is for RAM",
      "Write-Through writes synchronously to both cache and backing DB before confirming success; Write-Back writes immediately to cache and acknowledges, writing to DB asynchronously in batches",
      "Write-back guarantees zero risk of data loss on crash",
      "Write-through has the lowest write latency"
    ],
    "correctAnswer": 1,
    "explanation": "Write-Through ensures strong data consistency and durability at the cost of higher write latency. Write-Back offers ultra-fast write latency but risks data loss if the cache server crashes before flushing dirty pages to the database."
  },
  {
    "id": "sd_mcq_8",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What does the PACELC Theorem add to the traditional CAP Theorem?",
    "options": [
      "It includes cloud pricing into architectural analysis",
      "It states that IF there is a partition (P), trade off Availability (A) and Consistency (C); ELSE (E), trade off Latency (L) and Consistency (C)",
      "It replaces network partitions with fiber cables",
      "It proves all systems can be both available and consistent"
    ],
    "correctAnswer": 1,
    "explanation": "Daniel Abadi's PACELC theorem extends CAP: Even when the system runs normally without partitions (Else), there is an unavoidable fundamental trade-off between Latency (L) and Consistency (C) across distributed replicas."
  },
  {
    "id": "sd_mcq_9",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is Database Sharding (Horizontal Partitioning)?",
    "options": [
      "Duplicating an entire database onto 10 servers",
      "Splitting a large database table into smaller separate database instances (shards) across servers based on a shard key (e.g. user_id mod 10)",
      "Backing up a database to tape storage",
      "Converting SQL tables to JSON files"
    ],
    "correctAnswer": 1,
    "explanation": "Sharding distributes table rows across multiple independent physical database nodes based on a partition key (shard key), overcoming the CPU, RAM, and disk storage boundaries of single-server databases."
  },
  {
    "id": "sd_mcq_10",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is the \"Thundering Herd Problem\" (Cache Stampede) and how is it mitigated?",
    "options": [
      "A network virus overloading switches",
      "When a popular cached item expires, hundreds of concurrent requests experience a cache miss simultaneously and hammer the database; mitigated using mutex locks (probabilistic early expiration or singleflight)",
      "Database disk failure during heavy traffic",
      "Too many developers deploying code simultaneously"
    ],
    "correctAnswer": 1,
    "explanation": "Cache stampede occurs when a high-traffic cache key expires, causing massive concurrent queries to hit the database at once. It is prevented using distributed mutex locks, cache warming, or probabilistic early background recomputation (XFetch)."
  },
  {
    "id": "sd_mcq_11",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "How does a \"Token Bucket\" rate limiter work?",
    "options": [
      "It measures the number of open TCP sockets",
      "Tokens are continuously added to a bucket at a fixed rate up to a max capacity; each incoming request consumes a token; if bucket is empty, request is dropped or throttled",
      "It logs every request timestamp in an unbounded array",
      "It resets request counters at the beginning of each hour"
    ],
    "correctAnswer": 1,
    "explanation": "The Token Bucket algorithm adds tokens at a constant rate `r` up to capacity `b`. It accommodates temporary bursts of traffic (up to `b` requests instantly) while maintaining an average rate constraint."
  },
  {
    "id": "sd_mcq_12",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is the difference between Polling, Long Polling, WebSockets, and Server-Sent Events (SSE)?",
    "options": [
      "They are identical protocols",
      "Polling periodically queries the server; Long Polling holds HTTP connection open until data arrives; WebSockets provide full-duplex bi-directional TCP communication; SSE provides mono-directional server-to-client streaming over HTTP",
      "WebSockets can only send plain text",
      "SSE requires opening a new TCP connection per event"
    ],
    "correctAnswer": 1,
    "explanation": "Polling wastes HTTP requests. Long Polling reduces latency by holding requests open until an update occurs. WebSockets establish persistent, full-duplex, low-overhead communication. SSE offers lightweight, unidirectional server-to-client streaming over HTTP."
  },
  {
    "id": "sd_mcq_13",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is a Content Delivery Network (CDN) and what traffic is best served by it?",
    "options": [
      "A database clustering software",
      "A geographically distributed network of proxy edge servers that cache static assets (images, videos, CSS/JS, HTML) close to users, reducing latency and offloading origin servers",
      "A private fiber optic cable connecting data centers",
      "A software load balancer for microservices"
    ],
    "correctAnswer": 1,
    "explanation": "CDNs place edge caching servers in points of presence (PoPs) worldwide. Serving static and cacheable dynamic media from local edge caches reduces origin server load and minimizes round-trip latency for global users."
  },
  {
    "id": "sd_mcq_14",
    "topic": "System Design Fundamentals",
    "difficulty": "Medium",
    "question": "What is a \"Circuit Breaker\" pattern in microservices?",
    "options": [
      "An electrical fuse in data center racks",
      "A design pattern that monitors external calls; if failures cross a threshold, it trips open to fail fast immediately without calling the unhealthy dependency, giving it time to recover before testing with half-open requests",
      "A firewall rule blocking DDoS attacks",
      "A database transaction rollback"
    ],
    "correctAnswer": 1,
    "explanation": "Michael Nygard's Circuit Breaker wraps risky calls. In Closed state, requests pass through. If errors exceed a threshold, it switches to Open (failing fast immediately without overloading the downstream service). After a timeout, Half-Open lets limited requests through to verify recovery."
  },
  {
    "id": "sd_mcq_15",
    "topic": "System Design Fundamentals",
    "difficulty": "Hard",
    "question": "What is the difference between Message Queues (RabbitMQ) and Distributed Event Logs (Apache Kafka)?",
    "options": [
      "RabbitMQ is for databases; Kafka is for caches",
      "RabbitMQ is a smart-broker/dumb-consumer message queue that tracks message consumption and removes messages upon ACK; Kafka is an append-only distributed commit log where consumers manage their own offset and messages persist long-term",
      "Kafka cannot scale horizontally",
      "RabbitMQ stores messages forever on disk"
    ],
    "correctAnswer": 1,
    "explanation": "RabbitMQ distributes discrete work tasks to workers, deleting messages after acknowledgment. Kafka is a partitioned distributed event log: messages are immutable, stored for days/weeks, and multiple consumer groups independently replay or read streams at their own pace."
  },
  {
    "id": "sd_mcq_16",
    "topic": "System Design Fundamentals",
    "difficulty": "Hard",
    "question": "What is a \"Bloom Filter\" and why is it used in high-scale distributed systems?",
    "options": [
      "A graphical image filter in UI rendering",
      "A space-efficient probabilistic data structure used to test set membership, returning either \"definitely not in set\" or \"probably in set\" with zero false negatives",
      "A sorting algorithm for distributed arrays",
      "A cryptographic hashing function for passwords"
    ],
    "correctAnswer": 1,
    "explanation": "Bloom filters use bit arrays and multiple hash functions. They answer membership queries in O(k) time and negligible RAM. If it returns False, the item is guaranteed absent (avoiding expensive disk/network lookups). It has a small tunable false positive rate, but never false negatives."
  },
  {
    "id": "sd_mcq_17",
    "topic": "System Design Fundamentals",
    "difficulty": "Hard",
    "question": "How does Cassandra achieve high write throughput and what is LSM-Tree (Log-Structured Merge-Tree)?",
    "options": [
      "By writing directly to random sectors on spinning disks",
      "By appending writes sequentially to an in-memory Memtable and Commit Log, then flushing immutable SSTables to disk and merging them via background compaction",
      "By locking the entire database during inserts",
      "By eliminating all write replication"
    ],
    "correctAnswer": 1,
    "explanation": "LSM-Trees turn slow random disk writes into fast sequential writes: writes go to an in-memory Memtable and sequential WAL. When full, Memtable flushes as an immutable SSTable file. Background compaction merges SSTables, eliminating dead versions."
  },
  {
    "id": "sd_mcq_18",
    "topic": "System Design Fundamentals",
    "difficulty": "Hard",
    "question": "What is the difference between \"Strong Consistency\" and \"Eventual Consistency\"?",
    "options": [
      "Strong consistency means data is encrypted; Eventual means unencrypted",
      "Strong Consistency guarantees all subsequent reads across all replicas return the latest write immediately; Eventual Consistency guarantees that if no new updates occur, all replicas will eventually converge to identical state",
      "Eventual consistency never updates secondary replicas",
      "Strong consistency requires no network connections"
    ],
    "correctAnswer": 1,
    "explanation": "Strong consistency (CP) requires cross-node synchronization before confirming writes, incurring higher latency. Eventual consistency (AP) confirms writes locally and propagates updates asynchronously, offering high availability and low latency at the expense of temporary stale reads."
  },
  {
    "id": "sd_mcq_19",
    "topic": "System Design Fundamentals",
    "difficulty": "Hard",
    "question": "In designing a distributed ID generator (e.g. Twitter Snowflake), why is relying on database auto-increment IDs inadequate?",
    "options": [
      "Database IDs only go up to 100",
      "Single database auto-increment creates a single point of failure and write bottleneck, while multiple databases with offsets become messy to scale horizontally and don't provide k-sorted ordering across distributed nodes",
      "Database IDs cannot be stored in 64-bit integers",
      "Auto-increment IDs cannot be indexed"
    ],
    "correctAnswer": 1,
    "explanation": "At scale, a single DB auto-increment cannot handle hundreds of thousands of IDs/sec. Snowflake generates 64-bit globally unique, roughly time-sorted IDs autonomously without coordination using: Epoch Timestamp + Machine/DataCenter ID + Sequence Number."
  },
  {
    "id": "sd_mcq_20",
    "topic": "System Design Fundamentals",
    "difficulty": "Hard",
    "question": "What is \"Write-Behind\" (Write-Back) caching failure mode and how do modern systems protect against data loss?",
    "options": [
      "Cache writes are rejected if RAM is full",
      "Because data is acknowledged to the client before being written to persistent storage, a node crash can lose data; modern systems use battery-backed RAM, NVMe write-ahead logging (WAL), or replicated cache nodes",
      "The database crashes whenever cache is updated",
      "Clients must retry every write twice"
    ],
    "correctAnswer": 1,
    "explanation": "Write-Behind caches acknowledge writes before committing to disk. If the cache machine loses power, dirty uncommitted updates are lost. Systems mitigate this using redundant replicated cache clusters (Redis Sentinel/Cluster) and persistent fast append logs on NVMe."
  }
],
  caseStudies: [
  {
    "id": "sd_case_1",
    "title": "Design a Scalable URL Shortener (TinyURL)",
    "problemStatement": "Design a web service that takes long URLs and generates unique, short aliases (e.g., tinyurl.com/xyz123) that redirect users to original URLs upon click.",
    "functionalRequirements": [
      "Given a long URL, generate a unique, short URL alias.",
      "When accessing the short URL, redirect users with HTTP 301/302 to the original destination.",
      "Users can optionally specify a custom alias (e.g., tinyurl.com/my-portfolio).",
      "Links expire after a default or user-configured TTL."
    ],
    "nonFunctionalRequirements": [
      "High availability (99.99% uptime) - redirection must never fail.",
      "Low latency redirection (< 20 ms).",
      "Short URLs should be compact and not guessable.",
      "System is heavily read-heavy (100:1 read-to-write ratio)."
    ],
    "scaleAndEstimations": [
      "Write throughput: 500 million new URLs generated per month (~200 writes/sec).",
      "Read throughput: 50 billion redirections per month (~20,000 reads/sec peak).",
      "Storage: 500M * 500 bytes = 250 GB/month -> ~15 TB for 5 years.",
      "Cache memory: 20% of hot URLs generate 80% of daily read traffic -> ~30 GB RAM for Redis cache."
    ],
    "coreComponents": [
      "API Gateway / Load Balancer: Distributes traffic and handles rate limiting.",
      "Shortening Service: Generates short keys using Base62 encoding on unique IDs.",
      "Key Generation Service (KGS): Pre-generates random unique Base62 keys in advance and stores them in DB/memory to eliminate runtime collisions.",
      "Distributed Cache (Redis): Caches Top 20% active URLs for sub-millisecond redirection.",
      "Relational / NoSQL Database (PostgreSQL / DynamoDB): Stores mapping: hash_key (PK), original_url, user_id, created_at, expires_at."
    ],
    "dataSchema": "Table: url_mapping\n- id: BIGINT PRIMARY KEY\n- short_key: VARCHAR(7) UNIQUE INDEX (Base62)\n- original_url: VARCHAR(2048) NOT NULL\n- user_id: BIGINT (nullable)\n- created_at: TIMESTAMP\n- expires_at: TIMESTAMP INDEX",
    "apiDesign": [
      "POST /api/v1/shorten { \"long_url\": \"https://...\", \"custom_alias\": \"optional\", \"ttl_days\": 30 } -> Returns { \"short_url\": \"https://tiny.url/aB3x9Q\" }",
      "GET /{short_key} -> Returns HTTP 301 (Permanent Redirect) or HTTP 302 (Temporary Redirect if tracking analytics) with Location header."
    ],
    "stepByStepArchitecture": [
      "1. User submits long URL via Web/Mobile client.",
      "2. API Gateway validates request, performs rate limiting, and forwards to Shortening Service.",
      "3. Shortening Service fetches an unused 7-character Base62 key from the Key Generation Service (pre-loaded in memory buffers).",
      "4. Mapping is inserted into database and written to Redis cache with TTL.",
      "5. For redirection: Incoming GET request hits Load Balancer -> checks Redis cache first -> on hit returns 301/302 immediately -> on miss queries database, warms cache, and redirects."
    ],
    "cachingAndDbStrategy": "Base62 encoding of 7 characters provides 62^7 = 3.5 trillion unique URLs. Use Redis LRU cache holding 20% most active URLs. Use DynamoDB or partitioned PostgreSQL sharded by hash(short_key) % N.",
    "failureModesAndBottlenecks": [
      "KGS failure: Prevent single point of failure by running redundant KGS instances with distinct key range allocations.",
      "Cache stampede on viral URLs: Use Redis singleflight/mutex locking when refreshing cold keys.",
      "Database bottleneck: Reads are completely absorbed by Redis and read replicas."
    ],
    "keyInterviewQuestions": [
      "Why use HTTP 301 vs HTTP 302 redirect? (301 caches in browser, reducing our server load; 302 forces browser to query server every time, allowing accurate click analytics).",
      "How to handle collisions if using MD5/SHA256 hashing? (Base62 encoding of a counter/KGS avoids collisions altogether).",
      "How to clean up expired links? (Lazy deletion on access combined with periodic background batch sweeping during off-peak hours)."
    ]
  },
  {
    "id": "sd_case_2",
    "title": "Design a Distributed Rate Limiter",
    "problemStatement": "Design a high-throughput, low-latency distributed rate limiter to protect backend APIs from abuse, credential stuffing, scraping, and DDoS attacks.",
    "functionalRequirements": [
      "Throttle incoming requests that exceed allowed quotas (e.g. 100 requests per minute per user/IP).",
      "Return standard HTTP 429 Too Many Requests status code with Retry-After header.",
      "Support configurable rules across different tiers, endpoints, and client identifiers (user_id, IP, API key)."
    ],
    "nonFunctionalRequirements": [
      "Ultra-low latency: must add less than 2-3 milliseconds overhead to each API request.",
      "High accuracy without race conditions across distributed cluster nodes.",
      "High availability: rate limiter failure should fail-open rather than blocking legitimate business traffic."
    ],
    "scaleAndEstimations": [
      "Scale: 1 million requests/second across all global services.",
      "Memory: 50 million active users * 50 bytes per tracking record = 2.5 GB RAM in Redis cluster."
    ],
    "coreComponents": [
      "API Gateway Middleware: Intercepts requests before reaching backend microservices.",
      "Distributed Cache (Redis Cluster): Tracks token counts and timestamps in-memory.",
      "Rules Configuration Service: Stores rate limiting rules in database and syncs to gateway cache.",
      "Redis Lua Scripts: Executes atomic check-and-decrement operations in a single round-trip without race conditions."
    ],
    "dataSchema": "Redis Key Format: rate:{client_id}:{endpoint}:{window_id}\nValue: Hash { \"tokens\": 42, \"last_updated\": 1726000000 }",
    "apiDesign": [
      "Middleware response on allowed: HTTP headers X-RateLimit-Limit: 100, X-RateLimit-Remaining: 41, X-RateLimit-Reset: 1726000060",
      "Middleware response on limit exceeded: HTTP 429 Too Many Requests with header Retry-After: 25"
    ],
    "stepByStepArchitecture": [
      "1. Client request arrives at API Gateway.",
      "2. Gateway identifies client identifier (JWT user_id, API key, or IP).",
      "3. Gateway evaluates rules for the specific route (e.g., /api/checkout vs /api/search).",
      "4. Gateway calls Redis Cluster executing an atomic Lua script implementing Token Bucket or Sliding Window Log.",
      "5. If tokens available, request proceeds to backend service. If quota exceeded, Gateway returns HTTP 429 immediately."
    ],
    "cachingAndDbStrategy": "Sliding Window Counter using Redis Sorted Sets (ZSET) or Token Bucket via Redis Hashes. Execute all logic in Redis Lua script to guarantee atomicity and avoid distributed race conditions.",
    "failureModesAndBottlenecks": [
      "Redis cluster outage: Fallback to local in-memory gateway token bucket or Fail-Open mode to avoid catastrophic total outage.",
      "Clock synchronization drift: Use Redis server time rather than gateway local system time.",
      "Network latency between Gateway and Redis: Co-locate Redis nodes in the same VPC/availability zone as Gateway instances."
    ],
    "keyInterviewQuestions": [
      "Token Bucket vs Sliding Window: When to use which? (Token bucket is memory-efficient and allows bursts; sliding window prevents burst attacks at window boundaries).",
      "How to handle concurrency race conditions? (Use Redis Lua scripts which execute single-threaded atomically inside Redis engine).",
      "How to scale globally? (Use local regional rate limiters with asynchronous synchronization, or consistent hashing to route client IDs to designated regional Redis nodes)."
    ]
  },
  {
    "id": "sd_case_3",
    "title": "Design a Real-Time Chat System (WhatsApp / Slack)",
    "problemStatement": "Design a distributed messaging system supporting real-time 1-on-1 and group chat, message persistence, online presence status, and push notifications.",
    "functionalRequirements": [
      "Send and receive real-time 1-on-1 and group text messages.",
      "Message delivery receipts: Sent (1 check), Delivered (2 checks), Read (2 blue checks).",
      "User online presence indicator (Online, Last Seen).",
      "Offline message queuing and push notifications for mobile clients."
    ],
    "nonFunctionalRequirements": [
      "Ultra-low latency message delivery (< 100 ms).",
      "Zero message loss: messages must be durably persisted.",
      "End-to-end encryption for 1-on-1 chats.",
      "Scalable to 500 million daily active users."
    ],
    "scaleAndEstimations": [
      "500M DAU * 40 messages/day = 20 billion messages/day (~230,000 messages/sec average, 1M/sec peak).",
      "Storage: 20B * 100 bytes = 2 TB/day -> ~730 TB/year. Requires distributed NoSQL (Cassandra / ScyllaDB)."
    ],
    "coreComponents": [
      "WebSocket Gateway Servers: Maintains persistent bidirectional TCP connections with active mobile/web clients.",
      "Connection Manager / Session Registry: Distributed Redis/ZooKeeper cluster tracking which user is connected to which WebSocket server.",
      "Chat Microservice: Handles message routing, group fan-out, and validation.",
      "Presence Service: Tracks online/offline status using periodic heartbeat pings.",
      "Message Store (Cassandra): High-throughput append-only distributed database for message history.",
      "Push Notification Service (APNs / FCM): Wakes up offline recipient devices."
    ],
    "dataSchema": "Table: messages (Cassandra)\n- chat_id: UUID (Partition Key)\n- message_id: TIMEUUID (Clustering Key, ASC)\n- sender_id: UUID\n- content: TEXT\n- status: TINYINT (1=sent, 2=delivered, 3=read)\n- created_at: TIMESTAMP",
    "apiDesign": [
      "WebSocket Event: send_message { \"to\": \"user_123\", \"client_msg_id\": \"uuid\", \"content\": \"Hello!\" }",
      "WebSocket Event: ack_message { \"message_id\": \"uuid\", \"status\": \"read\" }",
      "REST API: GET /api/v1/chats/{chat_id}/messages?cursor=msg_id&limit=50"
    ],
    "stepByStepArchitecture": [
      "1. User A connects to WebSocket Gateway; Session Registry records (User A -> Gateway Server 4).",
      "2. User A sends message to User B.",
      "3. Gateway 4 receives message, generates snowflake message_id, and asynchronously writes to Cassandra.",
      "4. Chat Service checks Session Registry for User B.",
      "5. If User B is online on Gateway Server 9: message is forwarded to Server 9 and pushed down User B's WebSocket.",
      "6. If User B is offline: message is queued and Push Notification Service triggers Apple APNs/Google FCM.",
      "7. User B receives message -> sends delivery ACK back -> routed to User A to render double checks."
    ],
    "cachingAndDbStrategy": "Cassandra is chosen because chat is write-heavy and queries fetch chronological slices (`WHERE chat_id = ? ORDER BY message_id`). Redis caches active chat sessions and recent messages.",
    "failureModesAndBottlenecks": [
      "WebSocket server crashes: Clients automatically reconnect to another gateway; heartbeat presence detects disconnection after 30 seconds.",
      "Group message fan-out for huge groups (1,000+ members): Use message queues (Kafka) and fan-out on read or batch delivery rather than individual WebSocket pushes.",
      "Split-brain presence status: Use Redis with short TTL; user presence expires automatically if heartbeats fail."
    ],
    "keyInterviewQuestions": [
      "Why WebSockets over HTTP polling? (Maintains persistent bidirectional connection with minimal framing overhead and instant server-to-client push).",
      "How to maintain message ordering across mobile devices? (Use server-generated TimeUUID / Snowflake IDs rather than device clocks).",
      "How to handle large group chats efficiently? (Store one message in the group table, rather than cloning the message into every user's individual inbox)."
    ]
  },
  {
    "id": "sd_case_4",
    "title": "Design Distributed Cloud Storage (Google Drive / Dropbox)",
    "problemStatement": "Design a distributed cloud file storage and synchronization service allowing users to upload, download, and synchronize files across multiple devices.",
    "functionalRequirements": [
      "Upload, update, download, and delete files.",
      "Automatic file synchronization across all connected devices.",
      "File version history (revert to previous versions).",
      "Share files and folders with other users with read/write permissions."
    ],
    "nonFunctionalRequirements": [
      "Data durability: 99.999999999% (11 9s) durability (zero data loss).",
      "Fast sync: Chunking and delta sync (upload only modified blocks, not entire 1 GB files).",
      "Bandwidth optimization with client-side compression and deduplication."
    ],
    "scaleAndEstimations": [
      "50M daily active users uploading on average 2 files/day = 100M uploads/day.",
      "Average file size: 1 MB -> 100 TB new storage/day. Requires scalable Object Storage (Amazon S3 / Ceph)."
    ],
    "coreComponents": [
      "Block Service: Splits large files into 4 MB chunks, hashes chunks (SHA-256), and uploads/downloads chunks to Object Storage.",
      "Object Storage (S3 / Blob): Stores encrypted binary file chunks.",
      "Metadata Service: Stores file hierarchies, directories, file-to-chunk mappings, and version metadata in relational database.",
      "Synchronization Service: Uses long-polling or WebSockets to notify client daemons when file changes are committed.",
      "Client Daemon: Monitors local directory changes, chunks files, computes hashes, and uploads deltas."
    ],
    "dataSchema": "Table: file_metadata (PostgreSQL)\n- file_id: UUID PRIMARY KEY\n- user_id: UUID\n- file_name: VARCHAR(255)\n- version: INT\n- is_deleted: BOOLEAN\n\nTable: file_chunks\n- file_id: UUID\n- chunk_index: INT\n- chunk_hash: VARCHAR(64) (SHA-256)\n- PRIMARY KEY (file_id, chunk_index)",
    "apiDesign": [
      "POST /api/v1/files/upload-session -> Initializes chunked upload session.",
      "PUT /api/v1/chunks/{chunk_hash} -> Uploads 4 MB chunk (skips if hash already exists in global deduplication table).",
      "POST /api/v1/files/commit -> Commits file version with ordered array of chunk hashes."
    ],
    "stepByStepArchitecture": [
      "1. Client edits a 100 MB file. Local client daemon splits file into 4 MB chunks.",
      "2. Client computes SHA-256 hash for each chunk and queries Metadata Service.",
      "3. Server checks global chunk store: if chunk hash exists, mark as present (Deduplication - saves bandwidth).",
      "4. Client uploads only new/modified chunks directly to Object Storage via pre-signed S3 URLs.",
      "5. Client commits new version to Metadata Service.",
      "6. Sync Service pushes update notifications to user's other devices via WebSockets, which download modified chunks and reassemble the file."
    ],
    "cachingAndDbStrategy": "Chunk-level deduplication: multiple users uploading the same movie/installer share the same physical chunk in S3. Metadata stored in partitioned PostgreSQL with Redis cache for directory trees.",
    "failureModesAndBottlenecks": [
      "Upload interrupted mid-file: Resumable chunked uploads guarantee only failed 4 MB chunks are retried, not the full file.",
      "Concurrent edits on two devices: Conflict resolution creates a \"conflicted copy\" (e.g., file_conflict_date.txt) similar to Dropbox.",
      "High metadata write contention: Shard metadata database by `user_id`."
    ],
    "keyInterviewQuestions": [
      "Why chunk files into 4 MB blocks? (Enables delta-sync, parallel chunk uploads, resumability on network failure, and deduplication).",
      "How to achieve 99.999999999% durability? (S3 cross-region erasure coding and triple replication across separate physical availability zones).",
      "How does delta sync work? (Rsync algorithm or chunk hash diffing detects exactly which blocks changed)."
    ]
  },
  {
    "id": "sd_case_5",
    "title": "Design a Scalable Notification System",
    "problemStatement": "Design a centralized, multi-channel notification engine capable of sending billions of push notifications, SMS messages, and transactional emails reliably.",
    "functionalRequirements": [
      "Send notifications across 3 channels: Mobile Push (iOS APNs, Android FCM), SMS (Twilio), and Email (SendGrid/SES).",
      "Support priority queues (critical 2FA OTPs delivered instantly vs marketing digests delivered in batches).",
      "User preference management (opt-out of marketing, quiet hours, channel selection).",
      "Deduplication and rate limiting (prevent sending identical notification twice within 5 minutes)."
    ],
    "nonFunctionalRequirements": [
      "High throughput: Handle peak bursts of 10 million notifications/minute (breaking news, flash sales).",
      "Reliability: No lost transactional notifications (at-least-once delivery).",
      "Extensibility: Easy to plug in new notification channels."
    ],
    "scaleAndEstimations": [
      "100 million notifications per day (~1,200/sec average, 50,000/sec burst during flash events)."
    ],
    "coreComponents": [
      "Notification API Gateway: Ingests notification requests from internal microservices (Order, Auth, Marketing).",
      "Template Engine: Renders personalized notification copy with dynamic user variables.",
      "User Preference & Device Registry: Stores user notification settings and device push tokens.",
      "Message Queues (Kafka / RabbitMQ): Decouples ingestion from delivery with dedicated queues per channel (push, email, sms) and priority (high, low).",
      "Notification Workers: Consumer services pulling from queues and calling external third-party gateways (APNs, FCM, Twilio, SendGrid)."
    ],
    "dataSchema": "Table: notifications\n- id: UUID PRIMARY KEY\n- user_id: UUID INDEX\n- channel: ENUM('PUSH', 'EMAIL', 'SMS')\n- template_id: VARCHAR(50)\n- status: ENUM('QUEUED', 'SENT', 'FAILED', 'DELIVERED')\n- retry_count: INT\n- created_at: TIMESTAMP",
    "apiDesign": [
      "POST /api/v1/notifications/send { \"user_id\": \"u123\", \"type\": \"ORDER_DISPATCHED\", \"priority\": \"HIGH\", \"channels\": [\"PUSH\", \"SMS\"], \"params\": { \"order_no\": \"9921\" } }"
    ],
    "stepByStepArchitecture": [
      "1. Order Service calls Notification API to trigger order dispatch notification.",
      "2. API validates schema and checks Redis deduplication key `dedup:{user_id}:{type}:{hash}`.",
      "3. User Preference Service checks if user disabled SMS (if disabled, drops SMS channel).",
      "4. Notification Service pushes message into Kafka topics: `push-notifications-high` and `sms-notifications-high`.",
      "5. Push Workers consume event, fetch device token, and invoke Apple APNs/Google FCM.",
      "6. If external gateway fails with 5xx, worker pushes message to Dead Letter Queue (DLQ) with exponential backoff retry."
    ],
    "cachingAndDbStrategy": "Redis caches device tokens and rate-limiting counters. Kafka partitions queues by `user_id` to ensure chronological delivery per user while scaling workers horizontally.",
    "failureModesAndBottlenecks": [
      "Third-party provider outage (Twilio down): Automatically failover to backup SMS provider (e.g. Sinch/AWS SNS) via Circuit Breaker.",
      "Worker crash mid-delivery: At-least-once delivery semantics in Kafka with idempotent notification IDs on client devices prevent duplicate display.",
      "Massive flash notification storms: Rate-limit non-critical bulk campaigns to prioritize transactional OTPs."
    ],
    "keyInterviewQuestions": [
      "How to avoid sending duplicate notifications? (Client generates idempotent notification_id stored in Redis cache for 10 minutes).",
      "How to respect user quiet hours across time zones? (Store user IANA timezone in profile; queue holds marketing messages until 9:00 AM local user time).",
      "How to monitor delivery failures? (Track delivery callbacks from APNs/Twilio in analytics database, alerting on abnormal failure spikes)."
    ]
  },
  {
    "id": "sd_case_6",
    "title": "Design a Distributed Web Crawler & URL Preview Service",
    "problemStatement": "Design a web crawler and link preview generator (like Slack/WhatsApp URL previews) that fetches web pages, parses metadata (OpenGraph/HTML), and indexes content at web scale.",
    "functionalRequirements": [
      "Given a URL, crawl the page and extract title, description, OpenGraph image, and text summary.",
      "Cache preview metadata so subsequent requests return instantly.",
      "Web crawler must discover and queue new URLs found in links recursively.",
      "Respect `robots.txt` rules and crawl rate limits per domain."
    ],
    "nonFunctionalRequirements": [
      "Politeness: Never overwhelm any single host server (crawl delay).",
      "Robustness: Handle dead links, spider traps, circular redirects, and malformed HTML gracefully.",
      "Scalability: Capable of processing hundreds of millions of URLs."
    ],
    "scaleAndEstimations": [
      "Scale: 1 billion web pages crawled per month (~400 pages/second).",
      "Storage: 1B * 100 KB metadata/text = 100 TB storage/month."
    ],
    "coreComponents": [
      "URL Frontier (Crawl Queue): Prioritizes URLs to crawl and enforces domain politeness.",
      "DNS Resolver Cache: Fast local DNS caching to prevent DNS lookup bottlenecks.",
      "HTML Fetcher & Parser: Downloads web pages over HTTP and extracts OpenGraph tags and links.",
      "Duplicate Eliminator (Bloom Filter): Checks whether URL has already been visited.",
      "Content Storage (S3 / Document DB): Stores raw HTML, extracted preview JSON, and inverted index."
    ],
    "dataSchema": "Table: url_preview_cache (Redis / MongoDB)\n- url_hash: VARCHAR(64) PRIMARY KEY\n- canonical_url: VARCHAR(2048)\n- title: VARCHAR(255)\n- description: TEXT\n- image_url: VARCHAR(2048)\n- fetched_at: TIMESTAMP",
    "apiDesign": [
      "GET /api/v1/preview?url=https://github.com -> Returns { \"title\": \"GitHub: Let's build from here\", \"image\": \"https://.../og.png\", \"description\": \"...\" }"
    ],
    "stepByStepArchitecture": [
      "1. User posts a URL in chat.",
      "2. Link Preview Service checks Redis cache: on hit returns JSON preview in 5 ms.",
      "3. On miss: checks Bloom Filter to verify URL validity, fetches `robots.txt`, and enqueues to URL Frontier.",
      "4. Frontier uses two-level queue: Priority Queue (page rank) and Politeness Queue (one sub-queue per domain with delay timer).",
      "5. Fetcher worker downloads page with 5-second timeout, parses OpenGraph `<meta property=\"og:...\">` tags.",
      "6. Preview data is stored in Redis cache and returned to chat client via WebSocket."
    ],
    "cachingAndDbStrategy": "Redis LRU cache with 7-day TTL for previews. Bloom filter with 1 billion capacity (1.2 GB RAM) prevents crawling identical URLs twice.",
    "failureModesAndBottlenecks": [
      "Spider traps (infinite URL loops like /calendar/next/next/next): Enforce maximum URL path depth (e.g. 10 levels) and maximum pages per domain.",
      "Slow servers hanging connections: Enforce strict connection timeout (3s) and read timeout (5s).",
      "Heavy dynamic JavaScript pages: Use lightweight headless browser pool (Puppeteer) only when basic HTML lacks OpenGraph tags."
    ],
    "keyInterviewQuestions": [
      "How does the URL Frontier enforce politeness? (Hash host domain -> separate host queue with timer delay between requests to same domain).",
      "How to detect duplicate content across different URLs? (Compute SimHash or MinHash on parsed text to detect near-duplicate pages).",
      "How to handle robots.txt efficiently? (Cache parsed robots.txt rules in memory per domain for 24 hours)."
    ]
  },
  {
    "id": "sd_case_7",
    "title": "Design a Video Streaming Platform (YouTube / Netflix)",
    "problemStatement": "Design a global video streaming platform supporting high-definition video upload, asynchronous transcoding into multiple resolutions, and adaptive bitrate streaming.",
    "functionalRequirements": [
      "Users can upload video files (MP4, MKV, AVI).",
      "Videos are transcoded into multiple formats and resolutions (1080p, 720p, 480p, 360p) with adaptive bitrate streaming (HLS/DASH).",
      "Users can search, view video metadata, and stream videos smoothly without buffering.",
      "Track video view counts and basic analytics."
    ],
    "nonFunctionalRequirements": [
      "Ultra-fast, smooth video playback with minimal startup latency and zero buffering.",
      "High video availability and fault tolerance.",
      "Global distribution via CDN edge servers."
    ],
    "scaleAndEstimations": [
      "500 hours of video uploaded every minute (~720,000 hours/day).",
      "1 billion hours of video watched per day.",
      "Storage: 500 hrs/min * 60 min * 1 GB/hr = 30 TB raw video/min -> multi-petabyte scale per month."
    ],
    "coreComponents": [
      "Upload Service: Handles resumable chunked video uploads directly to Blob Storage (S3).",
      "Transcoding Pipeline: Distributed worker cluster (FFmpeg on Kubernetes) converting raw video into HLS chunks (.ts segments and .m3u8 playlists).",
      "Video Asset Storage (Blob Store): Stores transcoded video chunks across resolutions.",
      "Global CDN (Cloudflare / Fastly / CloudFront): Caches video chunks at network edges near users.",
      "Metadata & User Database (PostgreSQL & Elasticsearch): Stores titles, tags, user channels, and powers search.",
      "Analytics Service (Kafka + ClickHouse): Records video views, watch time, and drops."
    ],
    "dataSchema": "Table: videos\n- video_id: UUID PRIMARY KEY\n- uploader_id: UUID INDEX\n- title: VARCHAR(255)\n- status: ENUM('UPLOADING', 'PROCESSING', 'READY', 'FAILED')\n- master_playlist_url: VARCHAR(1024)\n- view_count: BIGINT\n- duration_seconds: INT",
    "apiDesign": [
      "POST /api/v1/videos/upload-session -> Returns pre-signed multi-part S3 upload URLs.",
      "GET /api/v1/videos/{video_id}/master.m3u8 -> Fetches HLS master manifest file for adaptive streaming."
    ],
    "stepByStepArchitecture": [
      "1. Creator uploads raw video file via chunked multipart upload directly to temporary S3 bucket.",
      "2. S3 emits `ObjectCreated` event to Kafka queue `video-transcode-jobs`.",
      "3. Transcoding workers pick up job, split video into 4-second chunks, transcode into 1080p, 720p, 480p, and generate `.m3u8` playlists.",
      "4. Transcoded files are saved in public video storage bucket.",
      "5. When a viewer clicks play, the video player fetches `master.m3u8` from CDN.",
      "6. Player measures current client network bandwidth: dynamically requests 1080p chunks on fast Wi-Fi, drops to 480p seamlessly if cellular network slows down (Adaptive Bitrate Streaming)."
    ],
    "cachingAndDbStrategy": "CDN caches popular video chunks at edge servers (95%+ CDN cache hit ratio for popular videos). Long-tail unpopular videos are fetched from origin S3 on demand.",
    "failureModesAndBottlenecks": [
      "Transcoding backlog during peak upload hours: Scale transcoding worker pods dynamically based on Kafka queue lag.",
      "Accurate view count counting under millions of concurrent hits: Buffer view increments in Redis HyperLogLog / Kafka before flushing aggregate counts to PostgreSQL in 10-second batches.",
      "Copyright violation detection: Run audio/video fingerprinting (ContentID) during transcoding."
    ],
    "keyInterviewQuestions": [
      "What is Adaptive Bitrate Streaming (HLS/DASH)? (Video is chunked into 4-6 second segments encoded at multiple bitrates; client player monitors network throughput and switches bitrates dynamically without interrupting playback).",
      "Why upload directly to S3 instead of API servers? (Prevents API server network interface saturation; S3 handles high-throughput multipart uploads natively).",
      "How to optimize storage costs for old, unwatched videos? (Move videos unwatched for 90 days to Amazon S3 Infrequent Access or Glacier)."
    ]
  },
  {
    "id": "sd_case_8",
    "title": "Design a Ride Booking Service (Uber / Lyft)",
    "problemStatement": "Design a location-based real-time ride booking platform connecting riders with nearby drivers, providing live ETA tracking, pricing, and ride dispatch.",
    "functionalRequirements": [
      "Riders can see nearby available drivers in real time on a map.",
      "Riders request a ride from pickup to destination; system finds and dispatches the closest suitable driver.",
      "Drivers can accept or reject ride requests.",
      "Live GPS location tracking of driver car movement during ride."
    ],
    "nonFunctionalRequirements": [
      "Ultra-low latency geospatial search (< 50 ms to locate nearby drivers).",
      "High availability: match dispatching must never drop confirmed rides.",
      "Consistent pricing and ride state transitions."
    ],
    "scaleAndEstimations": [
      "Scale: 10 million active riders and 1 million active drivers.",
      "Driver GPS pings: 1M drivers * 1 ping/4 seconds = 250,000 location updates/sec.",
      "Write throughput on location service: 250K writes/sec. Requires specialized in-memory geospatial store (Redis Geo / H3 / S2)."
    ],
    "coreComponents": [
      "Location Ingestion Service: Ingests 250K GPS pings/sec from driver mobile apps.",
      "Geospatial Store (Redis Geo / QuadTree / Uber H3): Indexes driver coordinates by hexagonal geographic cells (H3 index).",
      "Trip Management Service: Manages trip state machine (REQUESTED -> DRIVER_ASSIGNED -> IN_PROGRESS -> COMPLETED).",
      "Matching & Dispatch Engine: Evaluates nearby drivers using Dijkstra/routing algorithms, sends ride offer to driver with 15s timeout.",
      "Notification Service: WebSockets/Push to alert riders and drivers of trip updates."
    ],
    "dataSchema": "Table: trips (PostgreSQL)\n- trip_id: UUID PRIMARY KEY\n- rider_id: UUID\n- driver_id: UUID (nullable)\n- pickup_lat: DOUBLE, pickup_lng: DOUBLE\n- drop_lat: DOUBLE, drop_lng: DOUBLE\n- status: VARCHAR(30) INDEX\n- fare: DECIMAL(10, 2)\n- created_at: TIMESTAMP",
    "apiDesign": [
      "POST /api/v1/rides/request { \"pickup\": { \"lat\": 37.77, \"lng\": -122.41 }, \"drop\": { \"lat\": 37.79, \"lng\": -122.40 } } -> Returns { \"trip_id\": \"uuid\", \"fare\": 24.50 }",
      "WebSocket: driver_location_update { \"driver_id\": \"d123\", \"lat\": 37.774, \"lng\": -122.419, \"bearing\": 90 }"
    ],
    "stepByStepArchitecture": [
      "1. Driver app broadcasts GPS coordinates every 4 seconds over WebSocket to Location Service.",
      "2. Location Service updates Redis Geo index (GEOADD drivers_available lng lat driver_id) and H3 hexagon cell.",
      "3. Rider requests ride: API creates Trip in state `REQUESTED`.",
      "4. Dispatch Engine queries Redis for drivers within 3 km radius (`GEORADIUS`), filters drivers by rating and vehicle type.",
      "5. Dispatches ride offer to closest driver via WebSocket with 15-second countdown timer.",
      "6. Driver accepts: Trip state -> `DRIVER_ASSIGNED`. Other drivers are released. Rider WebSocket receives driver live location and ETA."
    ],
    "cachingAndDbStrategy": "Uber uses H3 (hexagonal hierarchical spatial index). Earth is divided into nested hexagonal cells. Finding neighbors is a simple O(1) cell lookup. Drivers broadcast to Redis; historical trips stored in PostgreSQL/Cassandra.",
    "failureModesAndBottlenecks": [
      "Driver rejects or times out: Dispatcher immediately forwards offer to the next closest driver in queue.",
      "High write contention on driver location: Do not write every 4-second ping to disk; keep active positions purely in Redis RAM and flush to DB only on trip start/end.",
      "Two drivers accept the same ride: Distributed lock (Redis Redlock) on `trip_id` guarantees exactly one driver is assigned."
    ],
    "keyInterviewQuestions": [
      "Why use Hexagons (H3) over Squares or Geohashes? (All adjacent neighbors in a hexagonal grid are equidistant, eliminating edge distortions present in square grids).",
      "How to calculate dynamic surge pricing? (Compare demand [open ride requests in H3 cell] vs supply [available drivers in H3 cell] every 30 seconds).",
      "How to maintain driver location history? (Stream GPS points to Kafka -> Apache Flink filters jitter -> writes trip route to Cassandra for receipt rendering)."
    ]
  },
  {
    "id": "sd_case_9",
    "title": "Design a Social Media News Feed (Twitter / Facebook Feed)",
    "problemStatement": "Design a social media news feed system supporting posting text/media, following users, and generating a personalized, reverse-chronological home feed.",
    "functionalRequirements": [
      "Users can publish posts (text, images, video links).",
      "Users can follow other users.",
      "Users can view their Home Feed containing recent posts from followed users ordered chronologically or by ranking score.",
      "Infinite scroll feed pagination."
    ],
    "nonFunctionalRequirements": [
      "Feed generation latency must be under 200 milliseconds.",
      "High availability: feed reading should never fail.",
      "Fast posting: publishing a post should acknowledge in < 500 ms."
    ],
    "scaleAndEstimations": [
      "300 million daily active users.",
      "50,000 new posts/second peak.",
      "Feed reads: 500,000 feed requests/second (10:1 read-to-write ratio)."
    ],
    "coreComponents": [
      "Post Service: Ingests new posts and stores in relational/document DB.",
      "Social Graph Service: Manages follower/following relationships (Neo4j or PostgreSQL).",
      "Feed Generation Service: Implements Fan-out on Write and Fan-out on Read.",
      "Feed Cache (Redis Cluster): Stores pre-computed home timeline arrays of post IDs for active users.",
      "Media Service: Uploads and optimizes photos/videos to S3 and CDN."
    ],
    "dataSchema": "Table: posts (PostgreSQL / Cassandra)\n- post_id: BIGINT PRIMARY KEY (Snowflake)\n- author_id: UUID INDEX\n- content: TEXT\n- media_urls: TEXT[]\n- created_at: TIMESTAMP\n\nRedis Feed Key: user:feed:{user_id} -> ZSET (Score: timestamp, Member: post_id)",
    "apiDesign": [
      "POST /api/v1/posts { \"content\": \"Hello World!\" } -> Returns { \"post_id\": 18293819283 }",
      "GET /api/v1/feed?cursor=post_id&limit=20 -> Returns array of hydrated Post objects."
    ],
    "stepByStepArchitecture": [
      "1. User publishes post -> Post Service writes post to database.",
      "2. Post Service emits event to Kafka `new-post-events`.",
      "3. Feed Worker consumes event and queries Social Graph for author's followers.",
      "4. For standard users: Fan-out on Write (Push Model): Worker pushes the new `post_id` into the Redis ZSET feed of every follower (capped at 800 items per user).",
      "5. For celebrity users (e.g. 50M followers like Elon Musk): Fan-out on Read (Pull Model): Do not push to 50M Redis feeds! Instead, merge celebrity posts at read time.",
      "6. When client loads feed: reads top 20 `post_id`s from Redis ZSET -> hydrates content from Post Cache -> returns in < 50 ms."
    ],
    "cachingAndDbStrategy": "Hybrid Fan-out Model: Push for regular users (fast reads); Pull for celebrities (avoids write amplification). Redis ZSET stores `post_id`s sorted by timestamp; post details cached in Redis hashes.",
    "failureModesAndBottlenecks": [
      "Celebrity post causes fan-out storm: Push model would take minutes to update 50M caches; hybrid model completely avoids this bottleneck.",
      "Inactive users wasting RAM: Do not pre-compute feeds for users who haven't logged in for 14 days.",
      "Cache miss: If Redis feed is empty, rebuild feed dynamically by querying posts of followed users from database."
    ],
    "keyInterviewQuestions": [
      "Fan-out on Write vs Fan-out on Read trade-off? (Write: fast reads O(1), slow writes for users with many followers. Read: fast writes O(1), slow reads O(N) merging multiple timelines).",
      "How to paginate feeds smoothly? (Use cursor-based pagination with `post_id` or timestamp; offset-based pagination breaks when new posts are inserted).",
      "How does ranking work? (Feed ranker ML models re-sort candidate posts from Redis based on affinity, post age, engagement probability, and content type)."
    ]
  },
  {
    "id": "sd_case_10",
    "title": "Design a Food Delivery & Real-Time Tracking Platform (DoorDash / Swiggy)",
    "problemStatement": "Design an on-demand food delivery platform supporting restaurant menu search, order placement, restaurant dispatch, delivery partner assignment, and real-time order tracking.",
    "functionalRequirements": [
      "Search restaurants and browse menus with live item availability.",
      "Add items to cart, apply discounts, and complete checkout with payment.",
      "Restaurant portal receives order, confirms, and updates preparation status.",
      "Delivery partner matching: assign nearby delivery driver upon order readiness.",
      "Live GPS map tracking of delivery partner from restaurant to customer door."
    ],
    "nonFunctionalRequirements": [
      "High transactional consistency: prevent double-charging or ordering sold-out items.",
      "Real-time updates (< 2 second latency on driver movement on map).",
      "High availability during lunch and dinner order spikes (5x surge traffic)."
    ],
    "scaleAndEstimations": [
      "5 million orders per day across 200,000 restaurants and 500,000 delivery partners.",
      "Peak order volume: 2,000 orders/second during 8:00 PM dinner peak."
    ],
    "coreComponents": [
      "Restaurant & Menu Service: Stores restaurant profiles, menus, and inventory (PostgreSQL + Redis).",
      "Order & Payment Service: Manages order checkout lifecycle with ACID transactions.",
      "Driver Assignment Engine: Evaluates available delivery partners near the restaurant when order is ready.",
      "Real-time Tracking Service: Ingests driver location pings and pushes updates to customer UI via WebSockets.",
      "Notification Service: Sends SMS, push notifications to restaurant and customer."
    ],
    "dataSchema": "Table: orders (PostgreSQL)\n- order_id: UUID PRIMARY KEY\n- customer_id: UUID\n- restaurant_id: UUID\n- driver_id: UUID (nullable)\n- total_amount: DECIMAL(10, 2)\n- status: ENUM('PLACED', 'ACCEPTED', 'PREPARING', 'PICKED_UP', 'DELIVERED', 'CANCELLED')\n- created_at: TIMESTAMP",
    "apiDesign": [
      "POST /api/v1/orders/checkout { \"restaurant_id\": \"r1\", \"items\": [{\"item_id\": \"i1\", \"qty\": 2}], \"payment_token\": \"tok_123\" }",
      "POST /api/v1/restaurant/orders/{order_id}/accept",
      "WebSocket: customer_order_live_tracking { \"order_id\": \"uuid\" }"
    ],
    "stepByStepArchitecture": [
      "1. Customer checks out cart: Order Service initiates ACID transaction in PostgreSQL to deduct inventory and charge payment via Stripe.",
      "2. Order state -> `PLACED`. Event published to Kafka topic `orders-placed`.",
      "3. Restaurant tablet receives push notification; restaurant clicks Accept -> state -> `PREPARING` with estimated prep time (e.g. 25 mins).",
      "4. 10 minutes before food is ready, Assignment Engine calculates ETA and identifies nearby delivery partners using Geospatial Redis.",
      "5. Driver accepts delivery offer -> state -> `DRIVER_ASSIGNED`.",
      "6. Driver picks up food -> state -> `PICKED_UP`. Customer app connects to WebSocket tracking server receiving driver GPS coordinates until delivery is marked `DELIVERED`."
    ],
    "cachingAndDbStrategy": "PostgreSQL handles orders and payments with strict row-level locking for inventory. Redis caches menus and driver real-time locations. Elasticsearch powers restaurant and dish search.",
    "failureModesAndBottlenecks": [
      "Restaurant rejects order: Automatic immediate payment refund initiated via payment gateway webhook.",
      "No delivery partner available: Assignment engine expands search radius progressively; if still unavailable, customer notified with apology voucher.",
      "Dinner rush database overload: Read replicas handle menu browsing; connection pooling (PgBouncer) protects write master."
    ],
    "keyInterviewQuestions": [
      "How to handle item inventory race conditions when 10 users order the last burger? (Use SQL atomic decrement: `UPDATE items SET stock = stock - 1 WHERE item_id = ? AND stock > 0` or distributed Redis lock).",
      "When should the delivery driver be dispatched? (Not immediately when order is placed! Dispatch when food prep is ~80% complete so driver does not wait idly at restaurant).",
      "How to optimize delivery routes if driver carries multiple orders? (Vehicle Routing Problem [VRP] algorithms / Traveling Salesperson Problem [TSP] heuristics running on dispatch workers)."
    ]
  }
]
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.interviewPrepSystemDesign;
}
