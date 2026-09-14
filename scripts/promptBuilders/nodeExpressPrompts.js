/**
 * Node.js & Express Prompts Collection (11 Prompts)
 * Covers REST API, Middleware, JWT Auth, RBAC, Security, Validation, Rate Limiting, and Reliability.
 */
module.exports = [
  {
    id: 'node-controller-service-separation',
    title: 'Express REST API: Clean Controller-Service-Repository Architecture',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Refactors bloated Express route files into clean architectural layers: Routers, Controllers, Services, and Repositories.',
    prompt: `Act as a Staff Backend Engineer. Refactor this cluttered Express.js route handler into a clean, maintainable 3-tier architecture.

Current Route Handler:
{{CODE}}

Tasks:
1. Separate concerns into 3 distinct layers:
   - Route & Controller Layer: HTTP concerns only (extracting params/body, invoking service, sending HTTP status code 200/201/400).
   - Service Layer: Pure business logic, authorization checks, and orchestrations (zero \`req\`/\`res\` objects).
   - Repository / Model Layer: Database queries and data persistence.
2. Ensure asynchronous error handling is clean and bubbles errors to the centralized error middleware.
3. Provide the refactored files with proper modular exports and imports.
4. Demonstrate how this separation enables easy unit testing of business logic without mocking Express \`req\` and \`res\`.

Expected Output Format:
1. Architectural Layer Directory Structure
2. Controller Implementation
3. Service Implementation (Pure Business Logic)
4. Route Definition
5. Unit Test for Service Layer`,
    tags: ['nodejs', 'express', 'rest-api', 'clean-architecture', 'backend'],
    difficulty: 'Intermediate',
    useCase: 'Code Refactoring',
    variables: ['{{CODE}}'],
    expectedOutput: 'Layer directory structure + Controller + Service + Route + Unit test'
  },
  {
    id: 'node-global-error-middleware',
    title: 'Express Centralized Error Handling & AppError Hierarchy',
    category: 'Development',
    subcategory: 'Express.js',
    description: 'Builds an enterprise error handling pipeline: custom AppError class, async wrapper (express-async-errors), and production error masking.',
    prompt: `Act as a Principal Backend Architect. Build an enterprise-grade error handling system for an Express.js production API.

Current Error Handling (or lack thereof):
{{CURRENT_ERROR_SETUP}}

Tasks:
1. Design a custom \`AppError\` class extending native \`Error\`:
   - \`statusCode\` (e.g. 400, 401, 403, 404, 500).
   - \`status\` ('fail' for 4xx, 'error' for 5xx).
   - \`isOperational\` flag (distinguishing expected operational errors from unknown programmer bugs).
2. Create an \`asyncHandler\` wrapper or configure async error handling so unhandled promise rejections don't hang requests or crash the process.
3. Build the 4-argument Global Error Middleware \`(err, req, res, next)\`:
   - Development Mode: Return full error stack trace, original error object, and details.
   - Production Mode: Mask unhandled 500 errors ("Something went wrong") while safely returning operational error messages.
   - Specific Handler: Handle Mongoose CastError, Duplicate Key (11000), and JWT expiration errors gracefully.
4. Provide complete, copy-paste-ready code.

Expected Output Format:
1. Custom AppError Class Code
2. asyncHandler Utility
3. Global Error Middleware Implementation
4. Example Route Demonstration`,
    tags: ['nodejs', 'express', 'error-handling', 'middleware', 'production-readiness'],
    difficulty: 'Intermediate',
    useCase: 'Clean Code',
    variables: ['{{CURRENT_ERROR_SETUP}}'],
    expectedOutput: 'AppError class + asyncHandler utility + production error middleware + route example'
  },
  {
    id: 'node-jwt-auth-refresh-tokens',
    title: 'JWT Authentication & Refresh Token Rotation with HttpOnly Cookies',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Implements secure JWT authentication: short-lived access tokens, refresh token rotation in HttpOnly cookies, and revocation.',
    prompt: `Act as a Senior Application Security Engineer. Design a complete, secure JWT authentication system in Node.js and Express.

Requirements:
{{AUTH_REQUIREMENTS}}

Tasks:
1. Architectural Security Blueprint:
   - Short-lived Access Token (15 min) passed in Authorization header or secure cookie.
   - Long-lived Refresh Token (7 days) stored strictly in an \`HttpOnly\`, \`Secure\`, \`SameSite=Strict\` cookie (preventing XSS access).
   - Refresh Token Rotation: Generating a new refresh token on every refresh and revoking the old one (preventing replay attacks).
2. Implement:
   - \`authenticateToken\` middleware verifying the Access Token and attaching \`req.user\`.
   - \`/login\` controller generating both tokens.
   - \`/refresh-token\` controller handling token rotation and database revocation checks.
   - \`/logout\` controller clearing cookies and invalidating tokens.
3. Provide complete, production-ready code.

Expected Output Format:
1. JWT Token Strategy & Security Diagram
2. Authentication Middleware Code
3. Login & Token Refresh Controller Code
4. Cookie Security Flags Configuration`,
    tags: ['nodejs', 'jwt', 'authentication', 'cookies', 'security', 'express'],
    difficulty: 'Advanced',
    useCase: 'Security Review',
    variables: ['{{AUTH_REQUIREMENTS}}'],
    expectedOutput: 'Security blueprint + auth middleware + token refresh rotation code + cookie flags'
  },
  {
    id: 'node-rbac-authorization-middleware',
    title: 'Role-Based Access Control (RBAC) & Permission Middleware',
    category: 'Development',
    subcategory: 'Express.js',
    description: 'Enforces fine-grained permissions and role authorization (Admin, Manager, User) on Express routes.',
    prompt: `Act as a Backend Security Specialist. Implement a flexible Role-Based Access Control (RBAC) and permission system for Express.js.

Roles & Resource Permissions:
{{ROLES_AND_PERMISSIONS}}

Tasks:
1. Design an authorization middleware factory: \`authorize(...allowedRoles)\` or \`requirePermission(permission)\`.
2. Ensure the middleware checks \`req.user\` (populated by authentication) and returns a clean 403 Forbidden with a clear reason if unauthorized.
3. Handle hierarchical roles (e.g. SuperAdmin inherits Admin which inherits User).
4. Support resource-level ownership checks (e.g., a user can edit their OWN profile, but an Admin can edit ANY profile).
5. Provide complete, tested middleware code.

Expected Output Format:
1. Role & Permission Matrix Definition
2. Authorization Middleware Implementation
3. Resource Ownership Guard Pattern
4. Example Express Route Bindings`,
    tags: ['nodejs', 'express', 'rbac', 'authorization', 'security', 'middleware'],
    difficulty: 'Intermediate',
    useCase: 'Security Review',
    variables: ['{{ROLES_AND_PERMISSIONS}}'],
    expectedOutput: 'Role matrix + authorize middleware + resource ownership guard + route bindings'
  },
  {
    id: 'node-cors-helmet-security-hardening',
    title: 'Express Security Hardening: Helmet, Strict CORS & Body Limits',
    category: 'Development',
    subcategory: 'Express.js',
    description: 'Hardens Express APIs against common web vulnerabilities: strict origin CORS, CSP headers via Helmet, and payload size limiting.',
    prompt: `Act as an OWASP Security Auditor and Penetration Tester. Harden this Express application against common web attacks.

Current Express App Configuration:
{{CODE}}

Tasks:
1. Configure \`cors\` with a dynamic whitelist supporting local development and multiple production domains with credentials support.
2. Configure \`helmet\` with appropriate Content Security Policy (CSP), Cross-Origin Resource Policy, and HSTS headers.
3. Mitigate Denial of Service (DoS) body flood attacks by configuring \`express.json({ limit: '10kb' })\`.
4. Add HTTP Parameter Pollution (hpp) and NoSQL injection protection.
5. Provide the complete hardened Express setup file.

Expected Output Format:
1. Vulnerability Risk Checklist (CORS wildcard dangers, missing security headers)
2. Production Hardened Express Configuration Code
3. Security Headers Verification Guide (curl commands)`,
    tags: ['nodejs', 'express', 'security', 'helmet', 'cors', 'owasp'],
    difficulty: 'Intermediate',
    useCase: 'Security Review',
    variables: ['{{CODE}}'],
    expectedOutput: 'Security checklist + hardened Express config code + curl verification commands'
  },
  {
    id: 'node-request-validation-zod',
    title: 'Type-Safe Request Validation with Zod Middleware',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Builds a reusable Express middleware validating req.body, req.query, and req.params against Zod schemas before hitting controllers.',
    prompt: `Act as a Senior TypeScript Backend Developer. Build a reusable request validation middleware for Express using Zod.

Requirements / Target Endpoints:
{{ENDPOINTS_OR_SCHEMAS}}

Tasks:
1. Build a generic validation middleware \`validate(schema: AnyZodObject)\` that validates \`req.body\`, \`req.query\`, and \`req.params\`.
2. Format validation failures into a clean, human-readable 400 Bad Request error payload listing specific field paths and messages.
3. Automatically strip unknown fields to prevent mass assignment vulnerabilities.
4. Ensure TypeScript types infer directly from the Zod schema into the Express request handler.
5. Provide complete code with sample schemas (e.g. User registration, pagination query).

Expected Output Format:
1. Reusable Validation Middleware Code
2. Clean 400 Error Response Shape
3. Sample Zod Schemas
4. Controller Handler with Inferred Types`,
    tags: ['nodejs', 'express', 'zod', 'validation', 'typescript', 'api'],
    difficulty: 'Easy',
    useCase: 'Clean Code',
    variables: ['{{ENDPOINTS_OR_SCHEMAS}}'],
    expectedOutput: 'Validation middleware code + formatted 400 error shape + sample schemas + inferred controller'
  },
  {
    id: 'node-rate-limiting-ddos-protection',
    title: 'Express Rate Limiting & Brute-Force Protection with Redis',
    category: 'Development',
    subcategory: 'Express.js',
    description: 'Implements sliding-window rate limiting for public endpoints and strict login attempt throttling backed by Redis.',
    prompt: `Act as a Senior Backend Systems Engineer. Implement distributed rate limiting and brute-force protection in Express.

API Traffic & Attack Surface:
{{TRAFFIC_AND_ENDPOINTS}}

Tasks:
1. Design multi-tier rate limits:
   - General API rate limit (e.g. 100 requests per 15 minutes per IP).
   - Strict Auth rate limit (e.g. 5 failed login attempts per 15 minutes per account/IP).
2. Implement using \`express-rate-limit\` with Redis store (\`rate-limit-redis\`) for distributed multi-instance deployment.
3. Configure standard rate limit HTTP headers (\`RateLimit-Limit\`, \`RateLimit-Remaining\`, \`RateLimit-Reset\`, \`Retry-After\`).
4. Return a structured 429 Too Many Requests response.
5. Provide complete code and Redis connection setup.

Expected Output Format:
1. Rate Limiting Strategy Matrix
2. Redis Rate Limiter Implementation Code
3. Route-Level Attachment Examples
4. Testing Rate Limits with ab / autocannon`,
    tags: ['nodejs', 'express', 'rate-limiting', 'redis', 'security', 'ddos'],
    difficulty: 'Intermediate',
    useCase: 'Security Review',
    variables: ['{{TRAFFIC_AND_ENDPOINTS}}'],
    expectedOutput: 'Strategy matrix + Redis rate limiter code + route attachments + autocannon test command'
  },
  {
    id: 'node-stream-file-upload-multer',
    title: 'Streaming File Upload with Multer / Busboy & Cloud Storage',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Handles multi-gigabyte file uploads efficiently using streams to prevent server RAM exhaustion and crashes.',
    prompt: `Act as a High-Performance Backend Architect. Implement streaming file uploads in Node.js and Express without buffering files in RAM.

Upload Requirements (File types, max size, destination):
{{UPLOAD_REQUIREMENTS}}

Tasks:
1. Explain why buffering multipart file uploads in server RAM crashes Node.js processes under concurrent uploads.
2. Implement streaming upload using Multer (memoryStorage vs diskStorage) or Busboy direct streaming to cloud storage (e.g. AWS S3).
3. Validate:
   - Magic byte MIME type verification (preventing disguised malicious executables).
   - Max file size limits strictly enforced at the stream level.
   - Filename sanitization to prevent directory traversal attacks (\`../../etc/passwd\`).
4. Handle client disconnection mid-stream and clean up orphan temporary files.
5. Provide complete, production-ready code.

Expected Output Format:
1. Memory Exhaustion Risk Analysis
2. Streaming Upload Middleware Code
3. Magic Byte Security Validator
4. Cleanup on Error / Disconnect Handler`,
    tags: ['nodejs', 'multer', 'file-upload', 'streaming', 'security', 's3'],
    difficulty: 'Advanced',
    useCase: 'Full Stack Development',
    variables: ['{{UPLOAD_REQUIREMENTS}}'],
    expectedOutput: 'Memory exhaustion audit + streaming upload code + magic byte validator + cleanup handler'
  },
  {
    id: 'node-mongoose-connection-pooling-schema',
    title: 'MongoDB Mongoose Production Setup: Pooling, Indexing & Hooks',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Configures robust Mongoose connections with connection pooling, retry logic, compound indexing, and pre-save hooks.',
    prompt: `Act as a Database and Backend Specialist. Design a production-grade MongoDB Mongoose connection and schema architecture.

Domain Entity Requirements:
{{ENTITY_REQUIREMENTS}}

Tasks:
1. Resilient Connection Setup:
   - Connection pooling (\`maxPoolSize: 20\`, \`minPoolSize: 5\`).
   - Auto-reconnect with exponential backoff and timeout parameters (\`serverSelectionTimeoutMS\`).
   - Logging connection events (connected, error, disconnected).
2. Schema Design:
   - Strict field validations, custom regex, and default values.
   - Password hashing pre-save hook (ensuring \`isModified('password')\` check).
   - Indexes: Single-field, compound, and sparse/unique indexes.
   - Virtual properties and JSON transform removing sensitive fields (\`password\`, \`__v\`).
3. Provide complete, modular code.

Expected Output Format:
1. Mongoose Connection Manager File
2. Production Schema & Model Implementation
3. Indexing Performance Rationale
4. Querying Example with Lean Optimization (\`.lean()\`)`,
    tags: ['nodejs', 'mongodb', 'mongoose', 'database', 'connection-pooling'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{ENTITY_REQUIREMENTS}}'],
    expectedOutput: 'Connection manager file + production schema with hooks + indexing rationale + lean query'
  },
  {
    id: 'node-graceful-shutdown-healthcheck',
    title: 'Graceful Shutdown & Kubernetes Healthcheck Endpoints',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Implements graceful shutdown on SIGTERM/SIGINT, draining active HTTP connections, and exposes liveness/readiness probes.',
    prompt: `Act as a DevOps and Backend Reliability Engineer. Implement graceful shutdown and health check probes for an Express production service.

App Stack (Database, Cache, Background workers):
{{APP_STACK}}

Tasks:
1. Implement Kubernetes / Container Health Endpoints:
   - \`/health/live\` (Liveness Probe: Is the Node process responsive?).
   - \`/health/ready\` (Readiness Probe: Can the service talk to DB and Redis?).
2. Implement Graceful Shutdown on \`SIGTERM\` and \`SIGINT\`:
   - Stop accepting new incoming HTTP connections (\`server.close()\`).
   - Allow in-flight requests a grace period (e.g. 15 seconds) to complete.
   - Safely close database connections (MongoDB / Postgres pool) and Redis clients.
   - Force kill if shutdown exceeds deadline.
3. Provide complete, copy-paste-ready code.

Expected Output Format:
1. Container Lifecycle State Machine
2. Liveness & Readiness Endpoints Code
3. Graceful Shutdown Signal Handler Implementation
4. Docker / Kubernetes Manifest Probe Example`,
    tags: ['nodejs', 'express', 'devops', 'kubernetes', 'graceful-shutdown', 'reliability'],
    difficulty: 'Intermediate',
    useCase: 'Production Readiness',
    variables: ['{{APP_STACK}}'],
    expectedOutput: 'Lifecycle state machine + liveness/readiness probes + graceful shutdown code + k8s probe config'
  },
  {
    id: 'node-env-validation-zod',
    title: 'Fail-Fast Environment Variable Validation with Zod',
    category: 'Development',
    subcategory: 'Node.js',
    description: 'Prevents silent production failures by validating all process.env configuration variables on startup with strict Zod types.',
    prompt: `Act as a Senior Backend Infrastructure Engineer. Implement a fail-fast environment variable validation module for Node.js using Zod.

Expected Environment Variables:
{{ENV_VARIABLES_LIST}}

Tasks:
1. Build a type-safe \`config/env.ts\` module using Zod.
2. Validate:
   - \`NODE_ENV\` (restricted to 'development', 'test', 'production').
   - \`PORT\` (coerced number between 1024 and 65535).
   - Database URLs, Secret keys (minimum 32-character length), and external API keys.
3. Fail-Fast Mechanism: If any variable is missing or malformed, format a clear terminal error banner and exit the process immediately (\`process.exit(1)\`).
4. Export a strongly typed, immutable configuration object with full IDE autocomplete.
5. Provide complete code.

Expected Output Format:
1. Zod Environment Schema Implementation
2. Fail-Fast Startup Handler
3. Clean Terminal Error Formatting
4. Typed Config Usage Example in Express App`,
    tags: ['nodejs', 'env', 'zod', 'configuration', 'devops', 'fail-fast'],
    difficulty: 'Easy',
    useCase: 'Clean Code',
    variables: ['{{ENV_VARIABLES_LIST}}'],
    expectedOutput: 'Zod env schema + fail-fast startup handler + terminal error banner + typed config usage'
  },
  {
    id: 'fullstack-feature-architecture',
    title: 'End-to-End Full Stack Feature Architecture & Data Flow',
    category: 'Development',
    subcategory: 'Full Stack Development',
    description: 'Designs a complete vertical slice: React UI state, API client with shared TypeScript types, Express route/controller, and PostgreSQL migration.',
    prompt: `Act as a Principal Full-Stack Architect. Design the complete vertical slice implementation for this new application feature.

Feature Requirements:
{{FEATURE_REQUIREMENTS}}

Tech Stack:
{{TECH_STACK}}

Tasks:
1. Data Model & Database Migration:
   - DDL schema changes (PostgreSQL / MySQL) with foreign keys, indexes, and constraints.
2. Backend API Endpoint:
   - Route definition, Zod request validator, controller handler, and database service method.
   - Standard HTTP response status codes and error scenarios (400, 401, 404, 500).
3. Shared Contract & Type Safety:
   - TypeScript interfaces shared between frontend and backend.
4. Frontend Client & UI State:
   - API client function calling the endpoint.
   - React component handling loading, error, and optimistic UI update states.
5. End-to-End Verification Checklist.

Expected Output Format:
1. End-to-End Data Flow Diagram (Client -> API -> DB)
2. Database DDL Migration Script
3. Express Backend Controller & Route Code
4. React Frontend Component & State Hook Code
5. Shared TypeScript Interface Definitions`,
    tags: ['full-stack', 'react', 'nodejs', 'express', 'postgresql', 'typescript', 'architecture'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{FEATURE_REQUIREMENTS}}', '{{TECH_STACK}}'],
    expectedOutput: 'Data flow diagram + DB migration + Express controller + React component + shared types'
  },
  {
    id: 'fullstack-auth-session-sync',
    title: 'Full-Stack Auth: Frontend Session Sync & Backend JWT Cookies',
    category: 'Development',
    subcategory: 'Full Stack Development',
    description: 'Coordinates seamless authentication across React SPA and Express: silent refresh, Axios interceptors, and protected routes.',
    prompt: `Act as a Full-Stack Security and Authentication Specialist. Build an integrated frontend + backend authentication flow.

Frontend Framework (React / Next.js):
{{FRONTEND_FRAMEWORK}}

Backend Framework (Express.js):
{{BACKEND_FRAMEWORK}}

Tasks:
1. Backend Token Management:
   - Access token in memory / short-lived cookie.
   - Refresh token in HttpOnly, Secure, SameSite cookie with rotation.
2. Frontend Axios / Fetch Interceptors:
   - Attaching Bearer tokens automatically to outbound requests.
   - Catching 401 Unauthorized responses, pausing pending requests, calling silent \`/refresh-token\`, and retrying original requests without logging out the user.
3. Protected Route Guards:
   - React ProtectedRoute wrapper component checking session state and redirecting unauthorized visitors to \`/login\` with \`from\` redirect state.
4. Provide complete, working code for both frontend and backend.

Expected Output Format:
1. Auth Handshake Sequence Diagram
2. Express Token Refresh Endpoint Code
3. Frontend Axios Interceptor Client Code
4. React ProtectedRoute Component Code`,
    tags: ['full-stack', 'auth', 'jwt', 'react', 'express', 'cookies', 'security'],
    difficulty: 'Advanced',
    useCase: 'Full Stack Development',
    variables: ['{{FRONTEND_FRAMEWORK}}', '{{BACKEND_FRAMEWORK}}'],
    expectedOutput: 'Auth sequence diagram + Express refresh endpoint + Axios interceptor + React route guard'
  }
];
