/**
 * React Prompts Collection (11 Prompts)
 * Covers useEffect, Stale Closures, Custom Hooks, Re-renders, Context, Error Boundaries, RSC, and Security.
 */
module.exports = [
  {
    id: 'react-use-effect-dependency-audit',
    title: 'React useEffect Dependency Array & Stale Closure Audit',
    category: 'Development',
    subcategory: 'React',
    description: 'Diagnoses infinite loops, missing dependency warnings (eslint-plugin-react-hooks), and stale state in useEffect.',
    prompt: `Act as a React Core Specialist. Analyze this useEffect hook that is causing unexpected behavior or ESLint dependency warnings.

Component Code:
{{CODE}}

Problem / Symptom:
{{SYMPTOM}}

Tasks:
1. Explain WHY the missing or extra dependencies cause the bug (e.g. Infinite render loop vs Stale closure referencing initial props/state).
2. Detail how object and function references change on every render, triggering unwanted effect reruns.
3. Provide the idiomatic React fix:
   - Moving functions inside useEffect.
   - Using functional state updates: \`setCount(c => c + 1)\` to remove state from dependencies.
   - Using \`useCallback\` / \`useMemo\` appropriately.
   - Using \`useRef\` for mutable non-reactive values.
4. Provide the refactored component code adhering strictly to exhaustive-deps rules.

Expected Output Format:
1. Dependency Array & Closure Diagnosis
2. Object Reference Instability Analysis
3. Refactored Component Code
4. Verification Steps`,
    tags: ['react', 'use-effect', 'hooks', 'stale-closure', 'exhaustive-deps'],
    difficulty: 'Intermediate',
    useCase: 'Debugging',
    variables: ['{{CODE}}', '{{SYMPTOM}}'],
    expectedOutput: 'Dependency analysis + reference stability breakdown + refactored code + exhaustive-deps guarantee'
  },
  {
    id: 'react-re-render-optimization',
    title: 'React Re-render Audit: memo, useMemo & useCallback Tuning',
    category: 'Development',
    subcategory: 'React',
    description: 'Eliminates unnecessary component tree re-renders and audits premature or ineffective useMemo/useCallback usage.',
    prompt: `Act as a Senior React Performance Engineer. Profile and eliminate unnecessary re-renders in the following component hierarchy.

Component Hierarchy Code:
{{CODE}}

Profiler Findings:
{{PROFILER_NOTES}}

Tasks:
1. Identify the Render Trigger: What state or prop change caused the root or child components to re-render?
2. Audit existing \`useMemo\` and \`useCallback\` usages: Are they actually preventing re-renders, or are they overhead that gets broken by inline objects/callbacks?
3. Apply optimization strategies:
   - State Colocation: Moving state down to where it is used.
   - Component Composition: Passing children (\`props.children\`) to avoid re-rendering heavy subtrees.
   - \`React.memo\` with custom comparator where necessary.
4. Show before-and-after component code.
5. Provide a test demonstrating that child components remain untouched when unrelated parent state updates.

Expected Output Format:
1. Render Cascade Root Cause
2. useMemo/useCallback Effectiveness Audit
3. Refactored Component Architecture
4. Re-render Verification Test Case`,
    tags: ['react', 'performance', 're-renders', 'memoization', 'use-callback', 'use-memo'],
    difficulty: 'Advanced',
    useCase: 'Performance Optimization',
    variables: ['{{CODE}}', '{{PROFILER_NOTES}}'],
    expectedOutput: 'Render cascade root cause + memoization audit + refactored component tree + test verification'
  },
  {
    id: 'react-custom-hook-extraction',
    title: 'Custom Hook Extraction & Headless Logic Decoupling',
    category: 'Development',
    subcategory: 'React',
    description: 'Extracts complex stateful logic (fetching, pagination, debounce, window dimensions) into a clean, reusable custom hook.',
    prompt: `Act as a Senior React Architect. Extract the stateful business logic from this cluttered component into a clean, testable Custom Hook.

Cluttered Component Code:
{{CODE}}

Logic to Extract:
{{TARGET_LOGIC}}

Tasks:
1. Design the Custom Hook signature: parameters, return value object, and types.
2. Encapsulate all internal state, effects, and helper callbacks cleanly inside the hook.
3. Ensure proper cleanup routines on unmount (canceling in-flight requests, removing event listeners).
4. Refactor the original component to be a lean, presentation-only view consuming the hook.
5. Provide a unit test for the custom hook using \`@testing-library/react-hooks\` or \`renderHook\`.

Expected Output Format:
1. Custom Hook Implementation (useSomething.ts)
2. Lean Refactored Component Code
3. Hook API Contract Documentation
4. renderHook Unit Test File`,
    tags: ['react', 'custom-hooks', 'refactoring', 'clean-code', 'headless-ui'],
    difficulty: 'Intermediate',
    useCase: 'Code Refactoring',
    variables: ['{{CODE}}', '{{TARGET_LOGIC}}'],
    expectedOutput: 'Custom hook file + lean presentation component + hook contract + renderHook test'
  },
  {
    id: 'react-context-vs-zustand-audit',
    title: 'Global State Architecture: React Context vs Zustand / Redux',
    category: 'Development',
    subcategory: 'React',
    description: 'Fixes React Context performance pitfalls where updating one property forces every consumer component to re-render.',
    prompt: `Act as a React State Management Specialist. Audit our global state architecture and resolve the performance re-render problem.

Current Context Implementation:
{{CODE}}

Problem:
{{PROBLEM_DESCRIPTION}}

Tasks:
1. Explain why React Context is NOT a state management tool, but a dependency injection mechanism that invalidates all consumers on value change.
2. Provide 2 architectural solutions:
   - Solution A: Splitting Context into StateContext and DispatchContext + memoized selectors.
   - Solution B: Migrating to a lightweight external atomic store (e.g. Zustand) with fine-grained subscription selectors.
3. Compare both approaches on bundle size, boilerplate, and re-render performance.
4. Provide complete code for the recommended solution.

Expected Output Format:
1. Context Re-render Bottleneck Breakdown
2. Context Splitting vs External Store Comparison
3. Refactored State Architecture Code
4. Consumer Component Selector Usage`,
    tags: ['react', 'context-api', 'state-management', 'zustand', 'performance'],
    difficulty: 'Intermediate',
    useCase: 'Architecture Review',
    variables: ['{{CODE}}', '{{PROBLEM_DESCRIPTION}}'],
    expectedOutput: 'Context bottleneck analysis + architecture comparison + refactored store code + selector usage'
  },
  {
    id: 'react-form-state-architecture',
    title: 'React Form State: Controlled vs Uncontrolled vs React Hook Form',
    category: 'Development',
    subcategory: 'React',
    description: 'Architects complex multi-step forms with schema validation (Zod), error handling, and minimal re-renders per keystroke.',
    prompt: `Act as a Senior Frontend Engineer. Design a high-performance, robust form architecture for the following requirements.

Form Requirements & Fields:
{{FORM_REQUIREMENTS}}

Tasks:
1. Compare Controlled Components vs Uncontrolled Components vs React Hook Form (RHF) for this form complexity.
2. Implement the form using React Hook Form + Zod resolver schema validation:
   - Type-safe schema definition with custom validation rules.
   - Real-time field error feedback without re-rendering the entire form on every keystroke.
   - Dynamic array fields (e.g. adding/removing item lines).
   - Async submit handler with loading state and server-side validation error mapping.
3. Ensure accessible form inputs (aria-invalid, aria-describedby for error labels).
4. Provide complete, copy-paste ready code with TypeScript types.

Expected Output Format:
1. Zod Validation Schema
2. Form Component Implementation
3. Accessibility & Keyboard Navigation Annotations
4. Server Error Mapping Pattern`,
    tags: ['react', 'forms', 'react-hook-form', 'zod', 'validation', 'accessibility'],
    difficulty: 'Intermediate',
    useCase: 'Full Stack Development',
    variables: ['{{FORM_REQUIREMENTS}}'],
    expectedOutput: 'Zod schema + React Hook Form component + accessibility annotations + server error mapper'
  },
  {
    id: 'react-error-boundary-suspense',
    title: 'React Error Boundaries, Suspense & Graceful Degradation',
    category: 'Development',
    subcategory: 'React',
    description: 'Builds fault-tolerant component trees with Error Boundaries, Sentry error logging, and Suspense fallback skeletons.',
    prompt: `Act as a Staff Frontend Reliability Engineer. Implement robust error boundaries and suspense fallbacks for this component tree.

Component Tree:
{{CODE}}

Tasks:
1. Explain why JavaScript errors inside component rendering unmount the entire React root if uncaught.
2. Implement an idiomatic React Error Boundary class component:
   - \`static getDerivedStateFromError\` for fallback state.
   - \`componentDidCatch\` for external telemetry / error reporting (e.g. Sentry).
   - "Try Again" recovery button that resets boundary state and retries rendering.
3. Integrate React \`Suspense\` with a custom skeleton loader for asynchronous child fetching.
4. Demonstrate where boundaries should be placed (granular widget-level vs global page-level).
5. Provide complete, production-ready code.

Expected Output Format:
1. Error Cascade Mechanism Explanation
2. Reusable ErrorBoundary Component Code
3. Widget-Level Boundary Placement Pattern
4. Sentry Telemetry Hookup Example`,
    tags: ['react', 'error-boundary', 'suspense', 'reliability', 'error-handling'],
    difficulty: 'Intermediate',
    useCase: 'Clean Code',
    variables: ['{{CODE}}'],
    expectedOutput: 'Error cascade explanation + ErrorBoundary code + granular boundary pattern + telemetry hookup'
  },
  {
    id: 'react-composition-vs-prop-drilling',
    title: 'Component Composition: Eliminating Deep Prop Drilling',
    category: 'Development',
    subcategory: 'React',
    description: 'Refactors deeply nested prop drilling chains into clean component composition using children and compound component patterns.',
    prompt: `Act as a React Software Design Specialist. Refactor this deeply nested component hierarchy that suffers from severe prop drilling.

Current Code Hierarchy:
{{CODE}}

Prop Being Drilled:
{{DRILLED_PROPS}}

Tasks:
1. Trace the prop drilling chain across intermediate components that do not need the prop themselves.
2. Refactor using Component Composition (\`props.children\` / slotted props):
   - Lift the leaf component instantiation to the parent and pass it down as children.
   - Or apply the Compound Component Pattern (e.g. \`<Card><Card.Header /><Card.Body /></Card>\`).
3. Explain why composition improves performance and simplifies component interfaces.
4. Provide the clean, refactored component code.

Expected Output Format:
1. Prop Drilling Coupling Diagnosis
2. Refactored Compound / Composition Pattern Code
3. Clean Component Interface Comparison
4. Unit Testing Simplicity Benefit`,
    tags: ['react', 'prop-drilling', 'composition', 'clean-architecture', 'compound-components'],
    difficulty: 'Easy',
    useCase: 'Code Refactoring',
    variables: ['{{CODE}}', '{{DRILLED_PROPS}}'],
    expectedOutput: 'Prop drilling trace + compound component refactoring + clean interface comparison'
  },
  {
    id: 'react-server-vs-client-components',
    title: 'React Server Components (RSC) vs Client Components Architecture',
    category: 'Development',
    subcategory: 'React',
    description: 'Decouples Next.js / React 19 applications into optimized Server Components (zero bundle size) and Client Components (interactivity).',
    prompt: `Act as a Next.js and React Server Components Specialist. Review and refactor this component to take full advantage of React Server Components (RSC).

Current Component Code:
{{CODE}}

Tasks:
1. Identify what parts of this component belong on the Server:
   - Direct database / ORM queries.
   - Sensitive environment variables and secret tokens.
   - Large dependencies (markdown parsers, date libraries) that shouldn't inflate client bundle.
2. Identify what parts require \`'use client'\`:
   - Interactive hooks (\`useState\`, \`useEffect\`, \`useContext\`).
   - Browser APIs (\`window\`, \`localStorage\`, \`navigator\`).
   - Event handlers (\`onClick\`, \`onChange\`).
3. Refactor into an optimal split: Server Component fetching data + Client Component handling UI interactions.
4. Ensure zero waterfall fetching and explain the bundle size reduction.

Expected Output Format:
1. Server vs Client Responsibility Matrix
2. Server Component Code (Zero bundle footprint)
3. Client Component Code (Minimal interactivity island)
4. Bundle Size & Security Audit`,
    tags: ['react', 'nextjs', 'rsc', 'server-components', 'client-components', 'performance'],
    difficulty: 'Advanced',
    useCase: 'Architecture Review',
    variables: ['{{CODE}}'],
    expectedOutput: 'RSC responsibility matrix + Server Component code + Client Component code + bundle audit'
  },
  {
    id: 'react-accessibility-aria-audit',
    title: 'React Accessibility (a11y) & WCAG 2.1 AA Compliance Audit',
    category: 'Development',
    subcategory: 'React',
    description: 'Audits custom React UI components (modals, dropdowns, tabs) for keyboard navigation, focus traps, and screen reader ARIA roles.',
    prompt: `Act as a Web Accessibility (a11y) and WCAG 2.1 AA Compliance Auditor. Audit and fix accessibility barriers in this custom React component.

Custom Component Code:
{{CODE}}

Component Type:
{{COMPONENT_TYPE}}

Tasks:
1. Audit for WCAG 2.1 AA violations:
   - Missing keyboard navigation (Tab order, Enter/Space trigger, Escape to close).
   - Missing or incorrect ARIA roles, states, and properties (\`role="dialog"\`, \`aria-modal\`, \`aria-expanded\`, \`aria-labelledby\`).
   - Focus management: Lack of focus trap in modals or failure to restore focus on close.
   - Color contrast and visible focus indicators (\`:focus-visible\`).
2. Rewrite the component with full keyboard accessibility and screen-reader announcements.
3. Provide an automated testing snippet using \`jest-axe\` to verify compliance.

Expected Output Format:
1. WCAG Violation Checklist
2. Fully Accessible Component Code with Focus Trap
3. Keyboard Interaction Specification Table
4. jest-axe Automated Test Case`,
    tags: ['react', 'accessibility', 'a11y', 'wcag', 'aria', 'screen-readers'],
    difficulty: 'Intermediate',
    useCase: 'Code Review',
    variables: ['{{CODE}}', '{{COMPONENT_TYPE}}'],
    expectedOutput: 'WCAG violation checklist + fully accessible component code + keyboard spec + axe test'
  },
  {
    id: 'react-security-xss-audit',
    title: 'React Frontend Security & XSS Vulnerability Audit',
    category: 'Development',
    subcategory: 'React',
    description: 'Prevents Cross-Site Scripting (XSS) in React: audit dangerouslySetInnerHTML, malicious href javascript: protocols, and untrusted props.',
    prompt: `Act as a Web Application Security Engineer and Pentester. Audit this React component for Cross-Site Scripting (XSS) and client-side vulnerabilities.

Component Code:
{{CODE}}

Tasks:
1. Identify all vectors where untrusted user input enters the DOM:
   - \`dangerouslySetInnerHTML\` usage without sanitization.
   - Links with user-provided URLs: \`<a href={userUrl}>\` (vulnerable to \`javascript:alert(1)\`).
   - Markdown or HTML rendering from external APIs.
   - Insecure localStorage token handling vs HttpOnly cookies.
2. Demonstrate how an attacker could exploit these vectors.
3. Provide the secured remediation:
   - Integration of DOMPurify for HTML sanitization.
   - Safe URL protocol validation (whitelist http/https).
   - Secure external link attributes (\`rel="noopener noreferrer"\`).
4. Provide the hardened component code.

Expected Output Format:
1. Vulnerability & Attack Vector Analysis
2. Exploitation Proof of Concept
3. Hardened Production Code
4. Security Checklist for Pull Requests`,
    tags: ['react', 'security', 'xss', 'owasp', 'sanitization', 'dompurify'],
    difficulty: 'Advanced',
    useCase: 'Security Review',
    variables: ['{{CODE}}'],
    expectedOutput: 'Vulnerability audit + attack vector POC + hardened DOMPurify code + PR security checklist'
  },
  {
    id: 'react-state-normalization-entities',
    title: 'Normalized Entity State Architecture (IDs & Dictionaries)',
    category: 'Development',
    subcategory: 'React',
    description: 'Refactors deeply nested array state into a relational normalized structure (byId, allIds) for O(1) lookups and zero mutation bugs.',
    prompt: `Act as a Senior Frontend Architecture Specialist. Normalize the following nested state structure to prevent deep cloning and rendering bugs.

Current Nested State:
{{NESTED_STATE}}

Tasks:
1. Explain why deeply nested array state leads to difficult updates, O(N) searches, and accidental reference mutations in React.
2. Design a Normalized Entity Schema:
   - Dictionary of entities by ID: \`byId: { [id]: Entity }\`
   - Array of IDs for order preservation: \`allIds: string[]\`
   - Relational foreign keys for parent-child relations.
3. Provide CRUD action reducers / helper functions:
   - \`addEntity(item)\`
   - \`updateEntity(id, patch)\` - O(1) update!
   - \`deleteEntity(id)\`
4. Provide complete, type-safe implementation in TypeScript.

Expected Output Format:
1. Nested vs Normalized Architecture Comparison
2. Normalized State Type Definitions
3. O(1) CRUD Helper Functions
4. Example Usage in React State Hook`,
    tags: ['react', 'state-normalization', 'clean-code', 'architecture', 'redux'],
    difficulty: 'Intermediate',
    useCase: 'Architecture Review',
    variables: ['{{NESTED_STATE}}'],
    expectedOutput: 'Nested vs normalized comparison + normalized types + O(1) CRUD helpers + React hook example'
  }
];
