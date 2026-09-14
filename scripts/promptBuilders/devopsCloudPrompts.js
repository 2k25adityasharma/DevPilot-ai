/**
 * DevOps / Cloud Prompts Collection (11 Prompts)
 * Covers Git, Docker, Linux, Nginx, CI/CD, AWS, Kubernetes, and Blue-Green Deployments.
 */
module.exports = [
  {
    id: 'devops-git-rebase-conflict-rescuer',
    title: 'Git Interactive Rebase & Complex Merge Conflict Rescuer',
    category: 'DevOps / Cloud',
    subcategory: 'Git',
    description: 'Guides interactive rebase (git rebase -i), squashing commits, resolving three-way merge conflicts, and recovering with git reflog.',
    prompt: `Act as a Git Internals and Version Control Master. Help me resolve a complex rebase conflict and clean up my branch commit history.

Current Git State & Branches:
{{GIT_STATUS_AND_BRANCHES}}

Desired Objective (e.g. Squash 8 commits into 1, rebase on latest main, resolve conflicts):
{{OBJECTIVE}}

Tasks:
1. Explain the difference between \`git merge\` and \`git rebase\` (rewriting commit hash history vs creating a merge commit).
2. Step-by-Step Interactive Rebase Guide:
   - Command: \`git rebase -i main\`.
   - Actions explained: \`pick\`, \`squash\` (s), \`reword\` (r), \`fixup\` (f), \`drop\` (d).
3. Conflict Resolution Protocol:
   - Understanding conflict markers (\`<<<<<<< HEAD\`, \`=======\`, \`>>>>>>>\`).
   - Resolving and continuing (\`git add .\` -> \`git rebase --continue\`).
4. Disaster Recovery Safety Net:
   - How to abort safely if things go wrong: \`git rebase --abort\`.
   - Using \`git reflog\` to find the previous HEAD SHA and reset if commits are lost.
5. Provide the exact CLI command sequence.

Expected Output Format:
1. Safety Backup Command (creating rescue branch first)
2. Interactive Rebase Todo List Configuration
3. Conflict Resolution Commands
4. \`git reflog\` Disaster Recovery Instructions`,
    tags: ['devops', 'git', 'rebase', 'merge-conflicts', 'reflog', 'git-workflow'],
    difficulty: 'Intermediate',
    useCase: 'DevOps & Tools',
    variables: ['{{GIT_STATUS_AND_BRANCHES}}', '{{OBJECTIVE}}'],
    expectedOutput: 'Safety backup command + rebase todo list + conflict resolution steps + reflog recovery'
  },
  {
    id: 'devops-git-bisect-bug-hunt',
    title: 'Git Bisect: Binary Search to Pinpoint the Exact Regression Commit',
    category: 'DevOps / Cloud',
    subcategory: 'Git',
    description: 'Uses git bisect to binary search through hundreds of commits and find the exact commit that introduced a production regression.',
    prompt: `Act as a Software Reliability and Git Forensic Specialist. Walk me through using \`git bisect\` to isolate a regression bug in our repository.

Regression Symptom:
{{REGRESSION_SYMPTOM}}

Known Good Commit / Tag:
{{KNOWN_GOOD_COMMIT}}

Known Bad Commit (e.g. main/HEAD):
{{KNOWN_BAD_COMMIT}}

Tasks:
1. Explain how \`git bisect\` performs binary search across the commit graph in O(log N) tests.
2. Step-by-Step Manual Bisect Protocol:
   - \`git bisect start\`
   - \`git bisect bad [commit]\`
   - \`git bisect good [commit]\`
   - Testing each checkout and marking \`git bisect good\` or \`git bisect bad\`.
   - Concluding with \`git bisect reset\`.
3. Fully Automated Bisect with Test Script:
   - Writing a bash script that returns exit code 0 on pass and 1 on fail.
   - Running \`git bisect run ./test-script.sh\` to automatically pinpoint the culprit in 30 seconds.
4. Provide the complete shell command sequence and automation script.

Expected Output Format:
1. Binary Search Math (Number of steps for N commits)
2. Manual Bisect Workflow Walkthrough
3. Automated Bisect Script (\`run-test.sh\`)
4. Post-Identification Forensic Steps (Inspecting commit diff and author)`,
    tags: ['devops', 'git', 'git-bisect', 'debugging', 'regression', 'binary-search'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{REGRESSION_SYMPTOM}}', '{{KNOWN_GOOD_COMMIT}}', '{{KNOWN_BAD_COMMIT}}'],
    expectedOutput: 'Binary search math + manual bisect workflow + automated test script + forensic diff steps'
  },
  {
    id: 'devops-dockerfile-multistage-production',
    title: 'Multi-Stage Production Dockerfile Optimization (Security & Size)',
    category: 'DevOps / Cloud',
    subcategory: 'Docker',
    description: 'Compresses image sizes from 1.5GB down to 80MB using multi-stage builds, Alpine/Distroless bases, caching layers, and non-root users.',
    prompt: `Act as a Container Security and Docker Optimization Specialist. Transform this bloated, insecure Dockerfile into a lean production image.

Current Inefficient Dockerfile:
{{DOCKERFILE_CONTENT}}

Application Framework & Runtime:
{{APP_FRAMEWORK}}

Tasks:
1. Multi-Stage Build Architecture:
   - Stage 1 (Builder): Heavy dev dependencies, build tools, TypeScript compilation, node_modules.
   - Stage 2 (Runner): Minimal Alpine or Distroless base image containing ONLY compiled assets and production dependencies.
2. Layer Caching Optimization:
   - Copying \`package.json\` and lockfile BEFORE source code to maximize Docker cache hits.
3. Security Hardening:
   - Running as non-root user (\`USER node\` or \`USER 10001\`) to prevent container breakout exploits.
   - Eliminating build secrets and SSH keys from image layers.
   - Setting \`NODE_ENV=production\`.
4. Add clean \`.dockerignore\` file.
5. Provide complete, production-ready Dockerfile and before-and-after size comparison.

Expected Output Format:
1. Vulnerability & Size Audit of Original Image
2. Optimized Multi-Stage Dockerfile Code
3. Production .dockerignore File
4. Verification & Scan Commands (Docker Scout / Trivy)`,
    tags: ['devops', 'docker', 'dockerfile', 'multi-stage', 'security', 'containers', 'alpine'],
    difficulty: 'Intermediate',
    useCase: 'DevOps & Tools',
    variables: ['{{DOCKERFILE_CONTENT}}', '{{APP_FRAMEWORK}}'],
    expectedOutput: 'Size audit + multi-stage Dockerfile + .dockerignore + security vulnerability scan command'
  },
  {
    id: 'devops-docker-compose-production',
    title: 'Docker Compose Full-Stack Orchestration (API + DB + Redis)',
    category: 'DevOps / Cloud',
    subcategory: 'Docker',
    description: 'Orchestrates multi-container local and production stacks with healthcheck dependencies, named persistent volumes, and bridge networks.',
    prompt: `Act as a Cloud Infrastructure and Docker Compose Engineer. Build a robust \`docker-compose.yml\` orchestrating this full-stack environment.

Services Required (e.g. Node API, PostgreSQL, Redis, Nginx):
{{SERVICES_REQUIRED}}

Tasks:
1. Design Multi-Container Services:
   - API service building from local Dockerfile with hot-reloading for dev or optimized for prod.
   - Database service (PostgreSQL/MySQL) with persistent named volume mount.
   - Cache service (Redis) with memory limits.
2. Startup Dependency Management:
   - Using \`depends_on\` with \`condition: service_healthy\` (ensuring API only starts AFTER Postgres is fully ready to accept queries).
3. Networking & Security:
   - Custom bridge network isolating database from public host ports.
   - Environment variables using \`.env\` file.
4. Healthchecks:
   - Concrete healthcheck commands for each service (e.g. \`pg_isready\`, \`redis-cli ping\`).
5. Provide complete, tested \`docker-compose.yml\`.

Expected Output Format:
1. Service Topology Diagram
2. Production docker-compose.yml File
3. Sample .env Configuration Template
4. One-Command Startup & Teardown Cheatsheet`,
    tags: ['devops', 'docker', 'docker-compose', 'containers', 'full-stack', 'postgres', 'redis'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{SERVICES_REQUIRED}}'],
    expectedOutput: 'Service topology diagram + docker-compose.yml + .env template + startup cheatsheet'
  },
  {
    id: 'devops-linux-log-analysis-cli',
    title: 'Linux Log Analysis & Text Processing (grep, awk, sed, xargs)',
    category: 'DevOps / Cloud',
    subcategory: 'Linux',
    description: 'Analyzes multi-gigabyte production server logs using bash one-liners: finding top 10 offending IPs, error spikes, and slow endpoints.',
    prompt: `Act as a Senior Linux Systems Administrator and CLI Wizard. Formulate bash one-liner pipelines to extract critical telemetry from server logs.

Log Format Sample:
{{LOG_SAMPLE}}

Investigation Objective (e.g. Top 10 IP addresses causing 500 errors / Peak traffic hours):
{{INVESTIGATION_OBJECTIVE}}

Tasks:
1. Provide the optimized command pipeline using standard POSIX utilities:
   - \`grep\` / \`zgrep\` for pattern filtering.
   - \`awk\` for column extraction and arithmetic summing.
   - \`sed\` for string replacement and regex normalization.
   - \`sort\` and \`uniq -c\` for frequency aggregation.
2. Explain each flag and piping stage in plain English.
3. Optimize for performance on large files (10GB+): avoiding memory buffering, using \`LC_ALL=C\` for 10x faster sorting.
4. Show sample output generated by the command.

Expected Output Format:
1. Optimized Bash One-Liner Pipeline
2. Step-by-Step Pipe Stage Explanation
3. Performance Tuning Flags (LC_ALL=C, mmap)
4. Sample Output Analysis`,
    tags: ['devops', 'linux', 'bash', 'awk', 'grep', 'sed', 'log-analysis', 'cli'],
    difficulty: 'Intermediate',
    useCase: 'DevOps & Tools',
    variables: ['{{LOG_SAMPLE}}', '{{INVESTIGATION_OBJECTIVE}}'],
    expectedOutput: 'Bash pipeline + pipe stage explanation + performance flags + sample output'
  },
  {
    id: 'devops-nginx-reverse-proxy-ssl',
    title: 'Nginx Reverse Proxy: SSL Termination, WebSocket Proxy & Gzip',
    category: 'DevOps / Cloud',
    subcategory: 'Linux',
    description: 'Configures a production nginx.conf: SSL/TLS termination, HTTP/2, WebSocket upgrades, client IP header preservation, and rate limiting.',
    prompt: `Act as a Web Server and Nginx Traffic Engineer. Build a high-performance, secure \`nginx.conf\` configuration file.

Domain & Upstream Services:
{{DOMAIN_AND_UPSTREAM}}

Tasks:
1. HTTP to HTTPS Redirection (301 Permanent Redirect on port 80).
2. SSL/TLS 1.3 Hardening on port 443:
   - Modern ciphers, SSL session caching, and HSTS headers.
3. Upstream Proxying:
   - \`proxy_pass\` to upstream cluster with keepalive connections.
   - Preserving client identity headers: \`X-Real-IP\`, \`X-Forwarded-For\`, \`X-Forwarded-Proto\`.
4. WebSocket Support:
   - \`Upgrade\` and \`Connection "upgrade"\` headers for real-time traffic.
5. Performance:
   - Gzip and Brotli compression for text, json, and js MIME types.
   - Client request body size limits (\`client_max_body_size\`).
6. Provide complete \`nginx.conf\` ready for Certbot / Let's Encrypt.

Expected Output Format:
1. Traffic Architecture Flow Diagram
2. Production nginx.conf Configuration Code
3. SSL Verification & Test Commands (openssl / curl)
4. Nginx Reload & Syntax Check Command (\`nginx -t\`)`,
    tags: ['devops', 'nginx', 'ssl', 'reverse-proxy', 'websockets', 'linux', 'security'],
    difficulty: 'Intermediate',
    useCase: 'DevOps & Tools',
    variables: ['{{DOMAIN_AND_UPSTREAM}}'],
    expectedOutput: 'Traffic flow diagram + production nginx.conf + SSL verification commands + reload command'
  },
  {
    id: 'devops-github-actions-cicd-pipeline',
    title: 'GitHub Actions CI/CD Pipeline: Lint, Test, Docker & Deploy',
    category: 'DevOps / Cloud',
    subcategory: 'CI/CD',
    description: 'Builds an automated GitHub Actions workflow: parallel matrix testing, dependency caching, Docker image build/push, and staging deployment.',
    prompt: `Act as a CI/CD and DevOps Automation Architect. Build an automated, production-grade GitHub Actions workflow (\`.github/workflows/deploy.yml\`).

Repository Stack & Deployment Target:
{{STACK_AND_DEPLOY_TARGET}}

Tasks:
1. Workflow Triggers:
   - Pull Requests to \`main\`: Lint, Type-Check, and Run Tests.
   - Push to \`main\`: Build Docker image and Deploy to Staging/Production.
2. Speed Optimization:
   - Caching dependencies (\`actions/setup-node\` with npm/yarn cache).
   - Docker layer caching using GitHub Actions cache (\`type=gha\`).
3. Security & Secrets:
   - Zero hardcoded tokens (referencing \`\${{ secrets.DEPLOY_TOKEN }}\`).
   - Least-privilege permissions (\`permissions: contents: read\`).
4. Automated Notification:
   - Posting deployment status to Slack or PR comment.
5. Provide complete, copy-paste-ready YAML file.

Expected Output Format:
1. CI/CD Stage Pipeline Flowchart
2. Complete GitHub Actions YAML Workflow File
3. Secrets Configuration Checklist
4. Branch Protection Rule Recommendations`,
    tags: ['devops', 'github-actions', 'ci-cd', 'automation', 'docker', 'deployment'],
    difficulty: 'Intermediate',
    useCase: 'DevOps & Tools',
    variables: ['{{STACK_AND_DEPLOY_TARGET}}'],
    expectedOutput: 'Pipeline flowchart + GitHub Actions YAML + secrets checklist + branch protection rules'
  },
  {
    id: 'devops-kubernetes-pod-hpa-deployment',
    title: 'Kubernetes Deployment: Pods, Services, Ingress & HPA Autoscaling',
    category: 'DevOps / Cloud',
    subcategory: 'Deployment',
    description: 'Architects Kubernetes production manifests: Deployment with rolling updates, Horizontal Pod Autoscaler (HPA), and Resource Limits.',
    prompt: `Act as a Certified Kubernetes Administrator (CKA). Create complete, production-ready Kubernetes YAML manifests for this microservice.

Microservice Requirements & Traffic:
{{MICROSERVICE_SPECS}}

Tasks:
1. Deployment Manifest:
   - Container image, port definitions, and environment variables from Secret / ConfigMap.
   - CPU and Memory \`requests\` and \`limits\` (preventing noisy-neighbor CPU starvation and OOM kills).
   - Liveness Probe and Readiness Probe HTTP configurations.
   - Rolling Update Strategy: \`maxSurge: 25%\`, \`maxUnavailable: 0\` for zero-downtime deploys.
2. Service & Ingress Manifests:
   - ClusterIP Service routing traffic to pod selector labels.
   - Ingress resource with TLS annotations.
3. Horizontal Pod Autoscaler (HPA):
   - Scaling from min 3 replicas to max 20 replicas based on 70% CPU and 80% Memory utilization.
4. Provide complete multi-document YAML file.

Expected Output Format:
1. Kubernetes Architecture Topology
2. Complete k8s Manifests (Deployment, Service, Ingress, HPA)
3. kubectl Deploy & Verification Commands
4. Resource Sizing & Capacity Math`,
    tags: ['devops', 'kubernetes', 'k8s', 'deployment', 'hpa', 'autoscaling', 'cloud'],
    difficulty: 'Advanced',
    useCase: 'Deployment',
    variables: ['{{MICROSERVICE_SPECS}}'],
    expectedOutput: 'k8s topology + complete YAML manifests (Deploy, Service, Ingress, HPA) + kubectl commands'
  },
  {
    id: 'devops-blue-green-deployment-strategy',
    title: 'Zero-Downtime Deployment: Blue-Green vs Canary Releases',
    category: 'DevOps / Cloud',
    subcategory: 'Deployment',
    description: 'Designs zero-downtime release strategies: Blue-Green traffic flipping vs Canary percentage rollouts with automated rollback triggers.',
    prompt: `Act as a Release Engineering Architect. Design a zero-downtime deployment strategy for a mission-critical web service.

System Architecture & Database Schema:
{{SYSTEM_ARCHITECTURE}}

Deployment Strategy Choice (Blue-Green vs Canary):
{{STRATEGY_CHOICE}}

Tasks:
1. Comparison:
   - Blue-Green Deployment: Running identical Green environment; instant DNS/router switch; instant rollback capability; doubles infrastructure cost during deploy.
   - Canary Deployment: Routing 5% traffic to new version; monitoring error rate; incrementally increasing to 100%.
2. The Database Migration Challenge (Expand & Contract Pattern):
   - Why breaking database changes break Blue-Green deploys.
   - Three-phase schema evolution: Expand (add nullable column), Migrate data, Contract (drop old column after deploy).
3. Automated Rollback Trigger:
   - Monitoring HTTP 5xx error rate and p99 latency; automatic traffic rollback if thresholds are breached within 5 minutes.
4. Provide concrete Nginx or Kubernetes routing rules implementing the strategy.

Expected Output Format:
1. Release Strategy Architecture Diagram
2. Expand-Contract Database Migration Lifecycle
3. Automated Health Verification & Rollback Script
4. Traffic Flipping Configuration Snippet`,
    tags: ['devops', 'deployment', 'blue-green', 'canary', 'zero-downtime', 'database-migration'],
    difficulty: 'Advanced',
    useCase: 'Deployment',
    variables: ['{{SYSTEM_ARCHITECTURE}}', '{{STRATEGY_CHOICE}}'],
    expectedOutput: 'Release strategy diagram + Expand-Contract DB lifecycle + automated rollback script + traffic config'
  },
  {
    id: 'devops-aws-s3-cloudfront-hosting',
    title: 'AWS S3 & CloudFront Static Site Hosting with Origin Access Control',
    category: 'DevOps / Cloud',
    subcategory: 'AWS',
    description: 'Secures and accelerates static SPA hosting (React/Vue) on AWS S3, CloudFront global CDN, SSL certificate, and custom error page redirects.',
    prompt: `Act as an AWS Certified Solutions Architect. Design a secure, global static web hosting architecture using AWS S3 and CloudFront.

Website Domain & SPA Routing Needs:
{{DOMAIN_AND_SPA_DETAILS}}

Tasks:
1. S3 Bucket Hardening:
   - Block All Public Access enabled (bucket is completely private).
   - Origin Access Control (OAC) allowing ONLY CloudFront distribution to read objects.
2. CloudFront Global CDN Distribution:
   - Custom domain name with AWS Certificate Manager (ACM) SSL certificate.
   - HTTP to HTTPS redirect.
   - Gzip and Brotli compression enabled.
   - Cache-Control headers: Long TTL for hashed assets (js/css), zero-cache (\`no-cache\`) for \`index.html\`.
3. SPA Client-Side Routing Fix:
   - Custom Error Response (403 and 404 response mapped to \`/index.html\` with 200 OK status) allowing React Router / Vue Router to handle paths.
4. Provide AWS CLI commands or Terraform script.

Expected Output Format:
1. AWS Infrastructure Architecture Diagram
2. S3 Bucket Policy with CloudFront OAC
3. CloudFront Distribution Configuration
4. Terraform Manifest or AWS CLI Deployment Script`,
    tags: ['devops', 'aws', 's3', 'cloudfront', 'cdn', 'spa', 'cloud'],
    difficulty: 'Intermediate',
    useCase: 'Deployment',
    variables: ['{{DOMAIN_AND_SPA_DETAILS}}'],
    expectedOutput: 'AWS architecture diagram + S3 bucket policy with OAC + CloudFront config + Terraform script'
  },
  {
    id: 'devops-systemd-service-configuration',
    title: 'Linux Systemd Service Unit Configuration & Daemonizing',
    category: 'DevOps / Cloud',
    subcategory: 'Linux',
    description: 'Daemonizes Node.js or Python backend applications as persistent systemd services with auto-restart, logging, and security sandboxing.',
    prompt: `Act as a Linux System Administrator. Configure a robust systemd service unit to daemonize a backend application on Ubuntu / Debian / RHEL.

Application Runtime & Executable Path:
{{APP_DETAILS}}

Tasks:
1. Create \`/etc/systemd/system/myapp.service\`:
   - \`[Unit]\`: Description, after network.target dependency.
   - \`[Service]\`: User/Group (non-root), WorkingDirectory, ExecStart command, Environment variables file.
   - Auto-Restart Policy: \`Restart=always\`, \`RestartSec=5s\` on unexpected failure.
   - Security Sandboxing: \`NoNewPrivileges=true\`, \`ProtectSystem=full\`, \`PrivateTmp=true\`.
   - Logging: Capturing stdout and stderr to journald.
2. Systemd CLI Management Commands:
   - Reload daemon, start, stop, restart, enable on boot.
   - Inspecting real-time logs with \`journalctl -u myapp -f\`.
3. Provide complete, tested systemd unit file and management commands.

Expected Output Format:
1. Complete systemd Service Unit File (.service)
2. Security Hardening Directives Explanation
3. CLI Management Commands Cheatsheet
4. Journalctl Log Inspection Cheatsheet`,
    tags: ['devops', 'linux', 'systemd', 'daemons', 'sysadmin', 'ubuntu'],
    difficulty: 'Easy',
    useCase: 'DevOps & Tools',
    variables: ['{{APP_DETAILS}}'],
    expectedOutput: 'systemd service file + security directives explanation + CLI management cheatsheet + journalctl commands'
  }
];
