// js/data/interviewPrep/webDevelopment.js
// Complete Question Bank for Web Development (14 topics * 10 = 140 MCQs)

window.interviewPrepWebDev = {
  id: 'web_development',
  title: 'Web Development & Frontend Engineering',
  icon: 'web',
  description: 'Master HTML5 semantics, modern CSS, JavaScript core, Event Loop, React, Hooks, State Management, Performance, Security, APIs, WebSockets, PWAs, and TypeScript.',
  totalQuestions: 140,
  topics: [
    'HTML5 Semantics & Web Standards',
    'Modern CSS',
    'JavaScript Core Concepts',
    'Asynchronous JS',
    'DOM Manipulation & Browser Rendering',
    'React Core Concepts',
    'React Hooks',
    'State Management',
    'Web Performance & Optimization',
    'Web Security Fundamentals',
    'RESTful APIs & Fetch / Axios',
    'WebSockets & Real-time',
    'Progressive Web Apps & Service Workers',
    'TypeScript Fundamentals'
  ],
  questions: [
  {
    "id": "wd_h5_1",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Easy",
    "question": "Which HTML5 element should be used to encapsulate self-contained content that could be distributed independently?",
    "options": [
      "<section>",
      "<article>",
      "<aside>",
      "<div>"
    ],
    "correctAnswer": 1,
    "explanation": "The <article> element represents a self-contained composition in a document (e.g. blog post, news story) that is independently distributable or reusable."
  },
  {
    "id": "wd_h5_2",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Easy",
    "question": "What is the purpose of the HTML5 `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` tag?",
    "options": [
      "It defines page SEO keywords",
      "It instructs mobile browsers to render the page at screen width with a 1:1 scale rather than defaulting to desktop resolution",
      "It speeds up CSS downloading",
      "It enables WebGL acceleration"
    ],
    "correctAnswer": 1,
    "explanation": "The viewport meta tag controls layout on mobile browsers, ensuring the page matches screen width in device-independent pixels and sets initial zoom level to 1.0."
  },
  {
    "id": "wd_h5_3",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Easy",
    "question": "Which semantic tag is best suited for secondary content like a sidebar, callout box, or related links?",
    "options": [
      "<aside>",
      "<nav>",
      "<footer>",
      "<main>"
    ],
    "correctAnswer": 0,
    "explanation": "The <aside> element represents content indirectly related to the surrounding content, such as sidebars, pull quotes, or related link groups."
  },
  {
    "id": "wd_h5_4",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Easy",
    "question": "What does the `alt` attribute on an `<img>` tag provide?",
    "options": [
      "A tooltip shown on hover",
      "Alternative text for screen readers and search engines when the image fails to load",
      "The image file size in bytes",
      "A link to high-resolution version"
    ],
    "correctAnswer": 1,
    "explanation": "The alt attribute provides alternative text for accessibility (screen readers for visually impaired users) and displays fallback text if the image fails to load."
  },
  {
    "id": "wd_h5_5",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Medium",
    "question": "What is the difference between `localStorage` and `sessionStorage` in HTML5 Web Storage API?",
    "options": [
      "localStorage stores cookies; sessionStorage stores binary",
      "localStorage data persists across browser sessions indefinitely until cleared; sessionStorage data is purged when the browser tab/session closes",
      "sessionStorage persists across computer reboots; localStorage does not",
      "sessionStorage can store up to 10 GB; localStorage only 5 MB"
    ],
    "correctAnswer": 1,
    "explanation": "localStorage persists data without expiration across browser tabs and sessions. sessionStorage isolates data to the specific browser tab session and clears when the tab is closed."
  },
  {
    "id": "wd_h5_6",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Medium",
    "question": "What is the difference between HTML attributes and DOM properties?",
    "options": [
      "They are identical terms in JavaScript",
      "Attributes are defined in the HTML markup source text; Properties are runtime nodes and values on the live DOM tree object",
      "Attributes are dynamic; properties are static",
      "Properties can only be strings"
    ],
    "correctAnswer": 1,
    "explanation": "HTML attributes represent initial values parsed from HTML text markup. DOM properties represent live dynamic state in the browser DOM tree object."
  },
  {
    "id": "wd_h5_7",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Medium",
    "question": "What is the purpose of the `defer` attribute in a `<script>` tag?",
    "options": [
      "Executes the script synchronously, blocking HTML parsing",
      "Downloads the script asynchronously in parallel with HTML parsing, but delays execution until HTML parsing is completely finished",
      "Executes the script immediately as soon as downloaded, pausing parser",
      "Prevents script execution on mobile devices"
    ],
    "correctAnswer": 1,
    "explanation": "`defer` downloads the script in parallel without blocking the DOM parser and executes scripts strictly in document order after the DOM has been fully constructed."
  },
  {
    "id": "wd_h5_8",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Medium",
    "question": "What does the HTML5 `<canvas>` element provide that `<svg>` does not?",
    "options": [
      "Vector graphics that scale infinitely without pixelation",
      "Resolution-dependent immediate-mode pixel manipulation via JavaScript (suitable for fast raster 2D/3D games)",
      "DOM event handlers attached to individual drawn shapes",
      "XML serialization"
    ],
    "correctAnswer": 1,
    "explanation": "<canvas> is an immediate-mode raster drawing surface (pixels are drawn and forgotten, ideal for fast game rendering). <svg> is retained-mode vector graphics where every shape is a DOM node."
  },
  {
    "id": "wd_h5_9",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Hard",
    "question": "What is the Shadow DOM in the Web Components standard?",
    "options": [
      "A hidden browser cache for CSS stylesheets",
      "An encapsulated DOM tree attached to an element that is hidden and isolated from the main document DOM, preventing style and script leakage",
      "A technique for dark mode rendering",
      "A Web Worker thread for DOM manipulation"
    ],
    "correctAnswer": 1,
    "explanation": "Shadow DOM provides true DOM and CSS scoping encapsulation: elements, IDs, and styles inside the shadow root do not bleed out into the main document, and outer styles do not bleed in."
  },
  {
    "id": "wd_h5_10",
    "topic": "HTML5 Semantics & Web Standards",
    "difficulty": "Hard",
    "question": "What is the significance of the `rel=\"noopener noreferrer\"` attribute on external links (`target=\"_blank\"`)?",
    "options": [
      "It compresses network requests",
      "It prevents the opened window from accessing `window.opener` to redirect the parent page (reverse tabnabbing security vulnerability) and suppresses the Referer header",
      "It forces links to open in incognito mode",
      "It boosts Google PageRank ranking"
    ],
    "correctAnswer": 1,
    "explanation": "Without `noopener`, the target window can manipulate `window.opener.location` to phishing pages (reverse tabnabbing) and runs on the same process thread, degrading performance."
  },
  {
    "id": "wd_css_1",
    "topic": "Modern CSS",
    "difficulty": "Easy",
    "question": "Which CSS property enables a Flexbox layout on a container element?",
    "options": [
      "display: flex;",
      "flex-direction: row;",
      "align-items: center;",
      "float: flex;"
    ],
    "correctAnswer": 0,
    "explanation": "`display: flex` establishes a flex container, formatting its direct children as flex items."
  },
  {
    "id": "wd_css_2",
    "topic": "Modern CSS",
    "difficulty": "Easy",
    "question": "In CSS Flexbox, which property aligns flex items along the main axis?",
    "options": [
      "align-items",
      "justify-content",
      "align-content",
      "flex-basis"
    ],
    "correctAnswer": 1,
    "explanation": "`justify-content` defines how remaining space is distributed between and around flex items along the main axis (row or column)."
  },
  {
    "id": "wd_css_3",
    "topic": "Modern CSS",
    "difficulty": "Easy",
    "question": "How do you declare a CSS Custom Property (CSS Variable) scoped to the root document?",
    "options": [
      "$primary-color: #3b82f6;",
      ":root { --primary-color: #3b82f6; }",
      "@var primary-color = #3b82f6;",
      "html { let primary-color = #3b82f6; }"
    ],
    "correctAnswer": 1,
    "explanation": "CSS Custom Properties use the `--` prefix and are typically defined inside `:root { --var-name: value; }` for global document availability, accessed via `var(--var-name)`."
  },
  {
    "id": "wd_css_4",
    "topic": "Modern CSS",
    "difficulty": "Easy",
    "question": "What does `box-sizing: border-box;` do in CSS?",
    "options": [
      "Removes borders from all input fields",
      "Includes padding and border within the specified width and height of an element",
      "Excludes margins from the layout calculation",
      "Forces elements into a grid layout"
    ],
    "correctAnswer": 1,
    "explanation": "Under `box-sizing: border-box`, width and height apply to the total visible box including content, padding, and borders, preventing elements from expanding beyond their assigned dimensions."
  },
  {
    "id": "wd_css_5",
    "topic": "Modern CSS",
    "difficulty": "Medium",
    "question": "In CSS Grid, what does `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` achieve?",
    "options": [
      "Creates a fixed 4-column grid",
      "Creates a fully responsive grid that automatically fits as many 250px+ columns as space permits and stretches them equally without media queries",
      "Limits the grid to 250 rows",
      "Shrinks columns below 250px on mobile"
    ],
    "correctAnswer": 1,
    "explanation": "This classic CSS Grid pattern automatically generates flexible columns that wrap into new rows when the container narrows, scaling from 250px up to 1fr to fill available width without writing media queries."
  },
  {
    "id": "wd_css_6",
    "topic": "Modern CSS",
    "difficulty": "Medium",
    "question": "What is the difference between `opacity: 0`, `visibility: hidden`, and `display: none`?",
    "options": [
      "They are identical in all aspects",
      "`display: none` removes the element from document flow entirely; `visibility: hidden` hides content but preserves physical layout space; `opacity: 0` makes it transparent but preserves space and remains clickable",
      "`visibility: hidden` removes space from flow",
      "`opacity: 0` removes DOM nodes"
    ],
    "correctAnswer": 1,
    "explanation": "`display: none` detaches from the render tree (no space allocated). `visibility: hidden` hides rendering while preserving box layout space (unclickable). `opacity: 0` is visually transparent, retains space, and responds to click events."
  },
  {
    "id": "wd_css_7",
    "topic": "Modern CSS",
    "difficulty": "Medium",
    "question": "What is a \"BFC\" (Block Formatting Context) and how can it be created?",
    "options": [
      "A framework for CSS fonts",
      "An isolated box formatting region where child elements layout independently without margins collapsing outside; created via `overflow: hidden`, `display: flow-root`, etc.",
      "A 3D CSS transform context",
      "A media query breakpoint"
    ],
    "correctAnswer": 1,
    "explanation": "A Block Formatting Context isolates internal layouts from the outside: it prevents margin collapsing between parent and children, contains internal floats, and stops elements from overlapping external floats."
  },
  {
    "id": "wd_css_8",
    "topic": "Modern CSS",
    "difficulty": "Medium",
    "question": "What CSS properties trigger GPU hardware acceleration during animations?",
    "options": [
      "`top`, `left`, `width`, and `height`",
      "`transform` (translate3d, scale) and `opacity`",
      "`color`, `background-color`, and `border-color`",
      "`margin-top` and `padding-left`"
    ],
    "correctAnswer": 1,
    "explanation": "Animating `transform` and `opacity` bypasses the browser's Layout (Reflow) and Paint phases, allowing the GPU to composite layers directly at 60+ FPS without jank."
  },
  {
    "id": "wd_css_9",
    "topic": "Modern CSS",
    "difficulty": "Hard",
    "question": "How does CSS Specificity resolve when evaluating competing selectors?",
    "options": [
      "The selector with the most characters wins",
      "Evaluated by a 4-part specificity weight: Inline styles (1,0,0,0) > IDs (0,1,0,0) > Classes/Attributes/Pseudo-classes (0,0,1,0) > Elements/Pseudo-elements (0,0,0,1)",
      "The rule written first in the file wins",
      "Universal selector `*` overrides all classes"
    ],
    "correctAnswer": 1,
    "explanation": "Specificity is calculated in order of magnitude: Inline > IDs > Classes/Attributes/Pseudo-classes > Tag Elements. `!important` overrides normal specificity cascading."
  },
  {
    "id": "wd_css_10",
    "topic": "Modern CSS",
    "difficulty": "Hard",
    "question": "What are CSS Container Queries (`@container`) and how do they differ from Media Queries (`@media`)?",
    "options": [
      "Container queries only work in SVG containers",
      "Media queries respond to the global browser viewport dimensions; Container queries respond to the specific width/height of a parent container element, enabling truly modular responsive components",
      "Container queries style Docker containers",
      "Container queries replace CSS Flexbox completely"
    ],
    "correctAnswer": 1,
    "explanation": "Container Queries allow a component to inspect the dimensions of its immediate parent container rather than the overall browser window, allowing a component to render as a card in a sidebar and as a horizontal banner in the main area seamlessly."
  },
  {
    "id": "wd_js_1",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Easy",
    "question": "What is the difference between `var`, `let`, and `const` regarding scope?",
    "options": [
      "`var` is block-scoped; `let` and `const` are function-scoped",
      "`var` is function-scoped and hoisted with undefined; `let` and `const` are block-scoped and reside in the Temporal Dead Zone (TDZ) before declaration",
      "`const` can be reassigned freely",
      "`let` is global only"
    ],
    "correctAnswer": 1,
    "explanation": "`var` has function scope and hoists initialized to `undefined`. `let` and `const` are block-scoped (confined to `{}` blocks) and cannot be accessed before their declaration due to the Temporal Dead Zone."
  },
  {
    "id": "wd_js_2",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Easy",
    "question": "What is a \"Closure\" in JavaScript?",
    "options": [
      "A function that closes the browser window",
      "A function bundled together with references to its surrounding lexical environment, allowing inner functions to access outer variables even after the outer function has returned",
      "A syntax error closing a curly brace",
      "A method to terminate a while loop"
    ],
    "correctAnswer": 1,
    "explanation": "A closure gives an inner function access to its outer enclosing scope variables even after the outer function has executed and exited the call stack."
  },
  {
    "id": "wd_js_3",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Easy",
    "question": "What will `console.log(typeof NaN)` output in JavaScript?",
    "options": [
      "\"nan\"",
      "\"undefined\"",
      "\"number\"",
      "\"object\""
    ],
    "correctAnswer": 2,
    "explanation": "`NaN` stands for \"Not-a-Number\", but according to IEEE 754 floating-point specifications, its ECMAScript type is `\"number\"`."
  },
  {
    "id": "wd_js_4",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Easy",
    "question": "What is the difference between `==` (loose equality) and `===` (strict equality)?",
    "options": [
      "`==` compares memory references; `===` compares values",
      "`==` performs type coercion before comparison; `===` checks both value and type without coercion",
      "`===` is slower than `==`",
      "There is no difference in ES6"
    ],
    "correctAnswer": 1,
    "explanation": "`==` converts operands to a common type via abstract equality algorithms before comparison (e.g., `'5' == 5` is true). `===` checks both data type and value without coercion (`'5' === 5` is false)."
  },
  {
    "id": "wd_js_5",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Medium",
    "question": "What is the output of `console.log(1 + \"2\" + 3);` and `console.log(3 - \"1\");`?",
    "options": [
      "\"123\" and 2",
      "\"6\" and 2",
      "\"15\" and NaN",
      "6 and \"31\""
    ],
    "correctAnswer": 0,
    "explanation": "`+` with a string coerces operands to strings: `1 + \"2\"` -> `\"12\"`, `\"12\" + 3` -> `\"123\"`. The `-` operator only works mathematically, coercing `\"1\"` to number 1: `3 - 1` -> `2`."
  },
  {
    "id": "wd_js_6",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Medium",
    "question": "How does JavaScript handle the `this` keyword inside standard functions versus arrow functions?",
    "options": [
      "Arrow functions bind `this` to the DOM window always",
      "Standard functions define `this` dynamically based on how the function is invoked; Arrow functions retain the lexical `this` of their enclosing lexical scope and cannot be rebound via `call/apply/bind`",
      "Standard functions have no `this`",
      "Arrow functions create a new `this` on every call"
    ],
    "correctAnswer": 1,
    "explanation": "Standard functions have dynamic `this` bound at call-time. Arrow functions lack their own `this` binding; they capture `this` lexically from the surrounding scope at declaration time."
  },
  {
    "id": "wd_js_7",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Medium",
    "question": "What is the Temporal Dead Zone (TDZ)?",
    "options": [
      "A browser crash caused by infinite recursion",
      "The time span between entering a scope and the variable's declaration with `let` or `const`, during which accessing the variable throws a ReferenceError",
      "The delay before setTimeout runs",
      "A memory leak period in V8 engine"
    ],
    "correctAnswer": 1,
    "explanation": "Variables declared with `let` or `const` exist in TDZ from the start of the block until the execution reaches their declaration line. Accessing them inside TDZ throws `ReferenceError`."
  },
  {
    "id": "wd_js_8",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Medium",
    "question": "What is the output of the following classic loop?\n`for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }`",
    "options": [
      "0, 1, 2",
      "3, 3, 3",
      "undefined, undefined, undefined",
      "0, 0, 0"
    ],
    "correctAnswer": 1,
    "explanation": "Because `var` is function-scoped, a single shared `i` variable exists. By the time the event loop executes the macrotask callbacks, the loop has finished and `i` equals 3. Replacing `var` with `let` creates a new lexical binding per iteration (outputting 0, 1, 2)."
  },
  {
    "id": "wd_js_9",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Hard",
    "question": "How does Prototypal Inheritance work in JavaScript through `__proto__` and `prototype`?",
    "options": [
      "Objects inherit by copying all methods to their local memory",
      "Every JavaScript object has an internal `[[Prototype]]` link; when property lookup fails on an object, the engine traverses up the prototype chain until found or reaching `null`",
      "Prototypes are stored in HTML head tags",
      "Inheritance only works with ES6 classes"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript uses prototype delegation: objects link to prototype objects. Accessing `obj.prop` searches `obj`, then `obj.__proto__`, then `obj.__proto__.__proto__`, continuing up the chain to `Object.prototype`, and finally `null`."
  },
  {
    "id": "wd_js_10",
    "topic": "JavaScript Core Concepts",
    "difficulty": "Hard",
    "question": "What is the difference between shallow copy and deep copy, and what are the limitations of `JSON.parse(JSON.stringify(obj))` for deep cloning?",
    "options": [
      "Shallow copy creates a new object; deep copy does not",
      "Shallow copy duplicates top-level properties but copies references for nested objects; `JSON.parse(JSON.stringify())` fails to clone Functions, `undefined`, Symbols, Dates (converted to string), Maps/Sets, and throws on circular references",
      "JSON cloning works on all JavaScript types flawlessly",
      "Object.assign() creates a deep clone"
    ],
    "correctAnswer": 1,
    "explanation": "`JSON.parse(JSON.stringify(obj))` destroys non-JSON types (`undefined`, functions, symbols, BigInt) and crashes on circular graphs. Modern JavaScript provides `structuredClone()` for native deep cloning of complex objects."
  },
  {
    "id": "wd_async_1",
    "topic": "Asynchronous JS",
    "difficulty": "Easy",
    "question": "Is JavaScript single-threaded or multi-threaded in its main execution context?",
    "options": [
      "Multi-threaded with 8 worker threads by default",
      "Single-threaded: it has one call stack and executes one operation at a time on the main thread",
      "Hardware dependent",
      "Runs on multiple threads without locks"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript's runtime engine is fundamentally single-threaded with one call stack, delegating asynchronous I/O, timers, and network operations to browser Web APIs / Node C++ APIs."
  },
  {
    "id": "wd_async_2",
    "topic": "Asynchronous JS",
    "difficulty": "Easy",
    "question": "What are the three possible states of a JavaScript Promise?",
    "options": [
      "Starting, Running, Completed",
      "Pending, Fulfilled (Resolved), and Rejected",
      "Open, Processing, Closed",
      "Active, Paused, Terminated"
    ],
    "correctAnswer": 1,
    "explanation": "A Promise is an object representing eventual completion or failure of an asynchronous operation, existing in one of 3 states: Pending, Fulfilled (with a value), or Rejected (with a reason)."
  },
  {
    "id": "wd_async_3",
    "topic": "Asynchronous JS",
    "difficulty": "Easy",
    "question": "What does the `async` keyword placed before a function declaration guarantee?",
    "options": [
      "The function runs in a background Web Worker",
      "The function automatically returns a Promise, wrapping non-promise return values in `Promise.resolve()`",
      "The function executes synchronously without pausing",
      "The function cannot throw errors"
    ],
    "correctAnswer": 1,
    "explanation": "An `async function` always returns a Promise. Any return value is implicitly wrapped in `Promise.resolve(val)`, and any uncaught throw is wrapped in `Promise.reject(err)`."
  },
  {
    "id": "wd_async_4",
    "topic": "Asynchronous JS",
    "difficulty": "Easy",
    "question": "What method allows catching errors in a Promise chain?",
    "options": [
      ".finally()",
      ".catch()",
      ".onError()",
      ".except()"
    ],
    "correctAnswer": 1,
    "explanation": "The `.catch()` method registers a rejection handler callback for when the Promise rejects or an error is thrown in preceding `.then()` steps."
  },
  {
    "id": "wd_async_5",
    "topic": "Asynchronous JS",
    "difficulty": "Medium",
    "question": "In the JavaScript Event Loop, what is the execution priority between Microtasks and Macrotasks (Task Queue)?",
    "options": [
      "Macrotasks always execute before microtasks",
      "The entire Microtask queue (Promises, queueMicrotask, MutationObserver) is drained completely after the current task finishes and before the next Macrotask (setTimeout, setInterval, I/O) runs",
      "They are interleaved one by one",
      "Microtasks run only when the browser tab closes"
    ],
    "correctAnswer": 1,
    "explanation": "After each macrotask completes, the engine drains all jobs in the Microtask queue until empty before picking the next macrotask or rendering UI updates."
  },
  {
    "id": "wd_async_6",
    "topic": "Asynchronous JS",
    "difficulty": "Medium",
    "question": "What will be the exact order of console outputs?\n`console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`?",
    "options": [
      "1, 2, 3, 4",
      "1, 4, 3, 2",
      "1, 4, 2, 3",
      "4, 1, 3, 2"
    ],
    "correctAnswer": 1,
    "explanation": "1) Synchronous code runs: logs 1, registers setTimeout macrotask, registers Promise microtask, logs 4. 2) Call stack clears: drains microtasks -> logs 3. 3) Event loop picks next macrotask -> logs 2. Output: 1, 4, 3, 2."
  },
  {
    "id": "wd_async_7",
    "topic": "Asynchronous JS",
    "difficulty": "Medium",
    "question": "What is the difference between `Promise.all()` and `Promise.allSettled()`?",
    "options": [
      "They are identical in modern browsers",
      "`Promise.all` rejects immediately if any single promise rejects (short-circuit fail-fast); `Promise.allSettled` waits for all promises to settle regardless of rejection, returning an array of `{status, value/reason}` objects",
      "`Promise.allSettled` cannot handle rejections",
      "`Promise.all` ignores errors"
    ],
    "correctAnswer": 1,
    "explanation": "`Promise.all` fails fast on the first rejection. `Promise.allSettled` guarantees every input promise completes, providing a detailed status report for all operations."
  },
  {
    "id": "wd_async_8",
    "topic": "Asynchronous JS",
    "difficulty": "Medium",
    "question": "What happens when using `await` inside an async function?",
    "options": [
      "It freezes the entire operating system and browser window",
      "It pauses execution of the async function in a non-blocking manner until the Promise settles, yielding control back to the event loop",
      "It converts asynchronous code into multi-threaded assembly",
      "It throws an exception if execution takes > 100 ms"
    ],
    "correctAnswer": 1,
    "explanation": "`await` suspends only the calling async function execution context while the event loop continues processing other UI events and tasks. When the awaited promise settles, the remainder of the async function resumes as a microtask."
  },
  {
    "id": "wd_async_9",
    "topic": "Asynchronous JS",
    "difficulty": "Hard",
    "question": "What does `Promise.race()` do compared to `Promise.any()`?",
    "options": [
      "`Promise.race` settles with the outcome (fulfillment or rejection) of the very first promise that settles; `Promise.any` waits for the first promise to fulfill (ignoring rejections until all reject)",
      "They are identical",
      "`Promise.any` returns an array of all winners",
      "`Promise.race` runs only on multi-core CPUs"
    ],
    "correctAnswer": 0,
    "explanation": "`Promise.race` returns the outcome of the first settling promise (even if it rejects). `Promise.any` waits for the first successful (fulfilled) promise, rejecting only if all promises fail (with an `AggregateError`)."
  },
  {
    "id": "wd_async_10",
    "topic": "Asynchronous JS",
    "difficulty": "Hard",
    "question": "How can you prevent unhandled promise rejections in Node.js / modern browsers from crashing applications?",
    "options": [
      "By running code in try/catch without await",
      "By listening to the global `unhandledrejection` event on `window` (or `process.on(\"unhandledRejection\")` in Node) and ensuring all promises have `.catch()` or are wrapped in try/catch with await",
      "By disabling promises in package.json",
      "By using only callbacks"
    ],
    "correctAnswer": 1,
    "explanation": "Unhandled promise rejections trigger the `window.addEventListener(\"unhandledrejection\")` event in browsers and can terminate Node processes. Robust code uses global rejection hooks and local try/catch with `await`."
  },
  {
    "id": "wd_dom_1",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Easy",
    "question": "What is the DOM (Document Object Model)?",
    "options": [
      "A JavaScript compiler",
      "A programming interface for HTML and XML documents representing the page as a structured tree of nodes/objects that programs can manipulate",
      "A CSS layout framework",
      "A network socket for browsers"
    ],
    "correctAnswer": 1,
    "explanation": "The DOM is the object-oriented representation of the web page parsed into an in-memory tree hierarchy, enabling JavaScript to read and modify elements, attributes, and styles."
  },
  {
    "id": "wd_dom_2",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Easy",
    "question": "Which method is the modern standard for selecting the first DOM element matching a CSS selector string?",
    "options": [
      "document.getElementById()",
      "document.querySelector()",
      "document.getElementsByClassName()",
      "document.find()"
    ],
    "correctAnswer": 1,
    "explanation": "`document.querySelector('.my-class > span')` takes any valid CSS selector and returns the first matching element node (or null)."
  },
  {
    "id": "wd_dom_3",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Easy",
    "question": "What is the difference between Event Bubbling and Event Capturing (Trickling)?",
    "options": [
      "Bubbling travels from root down to target; Capturing travels target up to root",
      "Capturing travels from window down to the target element; Bubbling travels from the target element upwards to window",
      "Bubbling only works with mouse clicks",
      "Capturing requires jQuery"
    ],
    "correctAnswer": 1,
    "explanation": "When an event fires, it propagates through 3 phases: Capturing Phase (descending from Window down to target), Target Phase, and Bubbling Phase (ascending from target back up to Window)."
  },
  {
    "id": "wd_dom_4",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Easy",
    "question": "What does `event.stopPropagation()` do when called inside an event listener?",
    "options": [
      "Cancels the browser default action (e.g., form submit)",
      "Prevents the event from bubbling up or capturing further along the DOM hierarchy",
      "Deletes the DOM element",
      "Removes all other event listeners on the page"
    ],
    "correctAnswer": 1,
    "explanation": "`event.stopPropagation()` stops the event from traveling to ancestor (or descendant) nodes along the propagation chain, confining it to the current element."
  },
  {
    "id": "wd_dom_5",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Medium",
    "question": "What is \"Event Delegation\" and why is it recommended for dynamic lists?",
    "options": [
      "Attaching separate event listeners to every list item via loop",
      "Attaching a single event listener to a common parent element and using `event.target` to handle clicks on current and dynamically added children, saving memory",
      "Delegating DOM events to Web Workers",
      "Using timeouts to delay event handling"
    ],
    "correctAnswer": 1,
    "explanation": "Event delegation exploits bubbling: a single listener on `<ul>` handles clicks on all existing and future `<li>` children by inspecting `event.target`, saving memory overhead over thousands of separate handlers."
  },
  {
    "id": "wd_dom_6",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Medium",
    "question": "What is the difference between \"Reflow\" (Layout) and \"Repaint\" in browser rendering pipelines?",
    "options": [
      "Repaint recalculates element geometry; Reflow changes colors",
      "Reflow recalculates the physical position and geometry of elements (expensive); Repaint redraws pixels to screen when visual appearance changes without altering geometry (e.g. background-color)",
      "They are the exact same pipeline step",
      "Reflow only happens once on page load"
    ],
    "correctAnswer": 1,
    "explanation": "Reflow (Layout) determines size and position across the document tree. Repaint updates pixel colors. Reflow always triggers Repaint, making frequent Reflows the primary cause of browser UI lag."
  },
  {
    "id": "wd_dom_7",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Medium",
    "question": "How does a `DocumentFragment` optimize batch DOM insertions in JavaScript?",
    "options": [
      "By compiling HTML to WebAssembly",
      "It acts as an in-memory virtual container for DOM nodes; inserting children into the fragment causes zero reflows, and appending the fragment to document triggers only a single reflow",
      "It caches nodes in localStorage",
      "It compresses images automatically"
    ],
    "correctAnswer": 1,
    "explanation": "`document.createDocumentFragment()` creates a lightweight off-screen container. You append hundreds of elements to it in memory, and then insert the fragment into the live DOM once, triggering a single layout recalculation."
  },
  {
    "id": "wd_dom_8",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Medium",
    "question": "What is the difference between `element.innerHTML` and `element.textContent`?",
    "options": [
      "`innerHTML` is faster than `textContent`",
      "`innerHTML` parses and renders HTML tags, exposing potential XSS vulnerabilities; `textContent` treats content strictly as raw text without HTML parsing and is safer and faster",
      "`textContent` evaluates `<script>` tags",
      "`innerHTML` cannot change text"
    ],
    "correctAnswer": 1,
    "explanation": "`innerHTML` invokes the browser HTML parser to build elements, exposing injection risks if unsanitized user data is assigned. `textContent` sets raw text without HTML parsing, preventing XSS and avoiding parser overhead."
  },
  {
    "id": "wd_dom_9",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Hard",
    "question": "What is \"Layout Thrashing\" (Forced Synchronous Layout) and what causes it?",
    "options": [
      "Rapidly resizing browser window",
      "Interleaving DOM write operations with DOM read operations that query geometry (like `element.offsetWidth`), forcing the browser to recalculate layout synchronously in a tight loop",
      "Deleting all CSS stylesheets in JavaScript",
      "Running CSS animations without keyframes"
    ],
    "correctAnswer": 1,
    "explanation": "Browsers batch DOM writes lazily. If code modifies DOM (write) and immediately reads geometry like `offsetHeight` (read) in a loop, the browser is forced to flush layout synchronously on every step, degrading performance."
  },
  {
    "id": "wd_dom_10",
    "topic": "DOM Manipulation & Browser Rendering",
    "difficulty": "Hard",
    "question": "What is the Critical Rendering Path (CRP) in modern web browsers?",
    "options": [
      "The network path taken by fiber cables to data centers",
      "The sequence of steps the browser takes from receiving HTML/CSS/JS to painting pixels on screen: HTML -> DOM + CSS -> CSSOM -> Render Tree -> Layout -> Paint",
      "The path where JavaScript is compiled by V8",
      "The URL routing table in the browser address bar"
    ],
    "correctAnswer": 1,
    "explanation": "CRP is the rendering sequence: 1) Parse HTML to DOM; 2) Parse CSS to CSSOM; 3) Combine into Render Tree; 4) Compute geometry in Layout (Reflow); 5) Paint pixels into layers; 6) Composite layers to screen."
  },
  {
    "id": "wd_rc_1",
    "topic": "React Core Concepts",
    "difficulty": "Easy",
    "question": "What is JSX in React?",
    "options": [
      "A new JavaScript runtime engine",
      "A syntax extension for JavaScript that allows writing HTML-like markup directly inside JavaScript files, transpiled into React.createElement calls",
      "A CSS styling framework",
      "A database query language"
    ],
    "correctAnswer": 1,
    "explanation": "JSX produces React elements. Babel transpiles `<h1>Hello</h1>` into `React.createElement(\"h1\", null, \"Hello\")`."
  },
  {
    "id": "wd_rc_2",
    "topic": "React Core Concepts",
    "difficulty": "Easy",
    "question": "What is the fundamental difference between \"Props\" and \"State\" in React?",
    "options": [
      "Props can be mutated by child components; State is read-only",
      "Props are inputs passed from parent to child (read-only/immutable); State is private, mutable data managed internally within a component",
      "State is shared globally; Props are private",
      "Props only accept numbers"
    ],
    "correctAnswer": 1,
    "explanation": "Props flow unidirectionally downward from parents to children and are immutable to the receiver. State represents local component data that can change over time in response to user actions."
  },
  {
    "id": "wd_rc_3",
    "topic": "React Core Concepts",
    "difficulty": "Easy",
    "question": "What is the Virtual DOM and how does React use it?",
    "options": [
      "A copy of the DOM stored on the server",
      "A lightweight in-memory representation of the real DOM; React updates the virtual DOM, diffs it against previous state (Reconciliation), and computes minimal real DOM mutations",
      "A browser plugin for React",
      "A Web Worker DOM interface"
    ],
    "correctAnswer": 1,
    "explanation": "The Virtual DOM keeps UI state in memory. When state updates, React generates a new VDOM tree, runs a diffing algorithm against the old tree, and batches minimal real DOM updates."
  },
  {
    "id": "wd_rc_4",
    "topic": "React Core Concepts",
    "difficulty": "Easy",
    "question": "Why is the `key` prop required when rendering dynamic lists in React?",
    "options": [
      "To apply CSS styling",
      "To give elements a stable identity so React can identify which items changed, were added, or were removed during reconciliation, preventing re-rendering of the entire list",
      "To sort array elements alphabetically",
      "To assign HTML IDs to DOM nodes"
    ],
    "correctAnswer": 1,
    "explanation": "Keys help React identify which items have changed, been added, or removed. Using stable unique IDs (rather than array indexes) prevents state bugs in list items."
  },
  {
    "id": "wd_rc_5",
    "topic": "React Core Concepts",
    "difficulty": "Medium",
    "question": "What is \"Lifting State Up\" in React?",
    "options": [
      "Moving state variables to localStorage",
      "Moving shared state up to the closest common ancestor of components that need it, passing state down via props and update functions via callbacks",
      "Using Redux instead of React",
      "Elevating component z-index in CSS"
    ],
    "correctAnswer": 1,
    "explanation": "When multiple components need to reflect the same changing data, lifting shared state up to their closest common ancestor ensures a single source of truth."
  },
  {
    "id": "wd_rc_6",
    "topic": "React Core Concepts",
    "difficulty": "Medium",
    "question": "What is a \"Pure Component\" or `React.memo()`?",
    "options": [
      "A component without any HTML",
      "A higher-order component that skips re-rendering if the component's props have not changed (performing a shallow comparison of props)",
      "A component written in pure vanilla JavaScript",
      "A component without state"
    ],
    "correctAnswer": 1,
    "explanation": "`React.memo` wraps a functional component. If its new props are shallowly equal to its previous props, React reuses the last rendered result, skipping expensive re-render cycles."
  },
  {
    "id": "wd_rc_7",
    "topic": "React Core Concepts",
    "difficulty": "Medium",
    "question": "What is the difference between Controlled and Uncontrolled components in React forms?",
    "options": [
      "Controlled components are handled by Redux",
      "In a Controlled component, form input value is driven by React component state via `value` and `onChange`; in an Uncontrolled component, input data is handled by the DOM itself via `useRef`",
      "Uncontrolled components cannot have buttons",
      "Controlled components don't trigger re-renders"
    ],
    "correctAnswer": 1,
    "explanation": "Controlled inputs bind `value={state}` and update via `onChange={(e) => setState(e.target.value)}`. Uncontrolled inputs read values from the DOM directly using `ref.current.value`."
  },
  {
    "id": "wd_rc_8",
    "topic": "React Core Concepts",
    "difficulty": "Medium",
    "question": "What are React Portals (`ReactDOM.createPortal`) used for?",
    "options": [
      "Routing between different web pages",
      "Rendering children into a DOM node that exists outside the DOM hierarchy of the parent component (ideal for modals, tooltips, and dialogs)",
      "Communicating with backend WebSocket servers",
      "Transferring state between React and Vue"
    ],
    "correctAnswer": 1,
    "explanation": "Portals let you render a component (like a modal dialog or floating dropdown) into `document.body` or an overlay container while retaining normal React context and event bubbling behavior."
  },
  {
    "id": "wd_rc_9",
    "topic": "React Core Concepts",
    "difficulty": "Hard",
    "question": "What is React Fiber Architecture?",
    "options": [
      "A fiber-optic network connecting React servers",
      "A complete rewrite of React's reconciliation engine that introduces incremental rendering, allowing React to pause, abort, or prioritize work across frames to keep UI responsive",
      "A CSS styling engine replacing Sass",
      "A state management library"
    ],
    "correctAnswer": 1,
    "explanation": "React Fiber broke rendering work into small units of work (fibers). It enables concurrent features (transitions, Suspense) by allowing high-priority updates (typing, animations) to interrupt low-priority background renders."
  },
  {
    "id": "wd_rc_10",
    "topic": "React Core Concepts",
    "difficulty": "Hard",
    "question": "Why should you avoid using array index as a `key` in dynamic lists that can be sorted, filtered, or deleted?",
    "options": [
      "React throws a syntax error if index is used",
      "If items are reordered or deleted, indexes change, causing React to mismatch component state with wrong DOM nodes and causing severe UI rendering bugs",
      "Indexes consume too much browser RAM",
      "Indexes are not supported in ES6"
    ],
    "correctAnswer": 1,
    "explanation": "Using array index causes React to assume identity is tied to position. If item 0 is deleted, item 1 becomes index 0, and React incorrectly preserves the previous state (like input text or checkbox state) in the wrong item."
  },
  {
    "id": "wd_hk_1",
    "topic": "React Hooks",
    "difficulty": "Easy",
    "question": "What are the two fundamental Rules of Hooks in React?",
    "options": [
      "Hooks must be capitalized; Hooks can only be used in class components",
      "Only call Hooks at the top level (never inside loops, conditions, or nested functions); Only call Hooks from React function components or custom Hooks",
      "Hooks must be imported from npm; Hooks must return arrays",
      "Hooks cannot accept parameters"
    ],
    "correctAnswer": 1,
    "explanation": "Rules of Hooks: 1) Call Hooks only at the top level of function components (ensures call order remains identical across renders); 2) Call Hooks only from React functions or custom hooks."
  },
  {
    "id": "wd_hk_2",
    "topic": "React Hooks",
    "difficulty": "Easy",
    "question": "What does `useEffect` with an empty dependency array `[]` represent?",
    "options": [
      "The effect runs on every single re-render",
      "The effect runs exactly once after the initial component mount and never again",
      "The effect never runs",
      "The effect runs only when component unmounts"
    ],
    "correctAnswer": 1,
    "explanation": "An empty dependency array `[]` tells React that the effect does not depend on any props or state, so it executes once after initial render and its cleanup runs on unmount (equivalent to componentDidMount)."
  },
  {
    "id": "wd_hk_3",
    "topic": "React Hooks",
    "difficulty": "Easy",
    "question": "What hook is used to access and manipulate a mutable DOM element directly in functional components without re-rendering?",
    "options": [
      "useState",
      "useRef",
      "useEffect",
      "useMemo"
    ],
    "correctAnswer": 1,
    "explanation": "`useRef` returns a mutable object whose `.current` property persists across renders. Modifying `.current` does not trigger a component re-render."
  },
  {
    "id": "wd_hk_4",
    "topic": "React Hooks",
    "difficulty": "Easy",
    "question": "What is the primary difference between `useMemo` and `useCallback`?",
    "options": [
      "`useMemo` caches a calculated value; `useCallback` caches a function definition instance between renders",
      "`useCallback` caches numbers; `useMemo` caches strings",
      "`useMemo` runs asynchronously; `useCallback` runs synchronously",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "`useMemo(() => computeExpensiveValue(a, b), [a, b])` memoizes the resulting return value. `useCallback(fn, deps)` memoizes the callback function reference itself."
  },
  {
    "id": "wd_hk_5",
    "topic": "React Hooks",
    "difficulty": "Medium",
    "question": "How do you perform cleanup (like unsubscribing from a WebSocket or clearing a timer) inside `useEffect`?",
    "options": [
      "Call `useEffect.cleanup()`",
      "Return a cleanup function from the effect callback",
      "Pass null as the second argument",
      "Call `window.removeEventListener()` in render body"
    ],
    "correctAnswer": 1,
    "explanation": "If `useEffect` returns a function, React executes this cleanup function before running the effect again on subsequent renders and when the component unmounts."
  },
  {
    "id": "wd_hk_6",
    "topic": "React Hooks",
    "difficulty": "Medium",
    "question": "What is a Custom Hook in React and what naming convention must it follow?",
    "options": [
      "A class extending React.Hook",
      "A JavaScript function whose name starts with \"use\" (e.g. `useFetch`, `useAuth`) that can call other built-in React hooks to encapsulate and share reusable stateful logic",
      "A hook defined in node_modules only",
      "A component returning JSX"
    ],
    "correctAnswer": 1,
    "explanation": "Custom hooks are functions starting with `use` that compose existing hooks (`useState`, `useEffect`) to extract reusable stateful business logic cleanly without altering component hierarchy."
  },
  {
    "id": "wd_hk_7",
    "topic": "React Hooks",
    "difficulty": "Medium",
    "question": "What is `useReducer` and when is it preferred over `useState`?",
    "options": [
      "It is used to reduce bundle size",
      "An alternative to `useState` that accepts a `(state, action) => newState` reducer function; preferred when managing complex state transitions involving multiple sub-values or dependent actions",
      "It replaces Redux in all applications",
      "It is used only for class components"
    ],
    "correctAnswer": 1,
    "explanation": "`useReducer` provides predictable state management for complex state objects with multiple discrete transitions, mimicking Redux-style action dispatching within local components."
  },
  {
    "id": "wd_hk_8",
    "topic": "React Hooks",
    "difficulty": "Medium",
    "question": "What is the difference between `useEffect` and `useLayoutEffect`?",
    "options": [
      "`useEffect` is for layout; `useLayoutEffect` is for network calls",
      "`useLayoutEffect` fires synchronously after all DOM mutations but before the browser paints pixels to screen (ideal for measuring DOM layout); `useEffect` fires asynchronously after paint",
      "`useLayoutEffect` cannot have dependencies",
      "`useLayoutEffect` runs on the server"
    ],
    "correctAnswer": 1,
    "explanation": "`useLayoutEffect` runs synchronously immediately after DOM mutations, blocking browser paint so you can measure element geometry and mutate DOM without visual flickering."
  },
  {
    "id": "wd_hk_9",
    "topic": "React Hooks",
    "difficulty": "Hard",
    "question": "What is the \"Stale Closure\" problem in React hooks (e.g. inside `useEffect` or `useCallback`)?",
    "options": [
      "A memory leak in Chrome",
      "When an effect or callback captures variables from a past render because they were omitted from the dependency array, causing it to read outdated state or props",
      "When component state is stored in localStorage",
      "When a promise never resolves"
    ],
    "correctAnswer": 1,
    "explanation": "If a hook callback references variables from component scope without listing them in its dependency array, the closure retains stale values from the render in which it was created, causing buggy calculations."
  },
  {
    "id": "wd_hk_10",
    "topic": "React Hooks",
    "difficulty": "Hard",
    "question": "What is `useTransition` introduced in React 18 and what does `startTransition` do?",
    "options": [
      "It applies CSS transitions to buttons",
      "It allows marking UI updates as non-urgent transitions (e.g. filtering a long list), allowing urgent updates (like typing in an input) to interrupt the render and keep the UI responsive",
      "It transitions React apps to Next.js",
      "It manages page URL transitions"
    ],
    "correctAnswer": 1,
    "explanation": "`useTransition` enables concurrent React: wrapping state updates in `startTransition(() => setSearch(val))` marks them as low priority, letting React interrupt list rendering if the user types another keystroke."
  },
  {
    "id": "wd_sm_1",
    "topic": "State Management",
    "difficulty": "Easy",
    "question": "What is \"Prop Drilling\" in React applications?",
    "options": [
      "Drilling holes into CPU motherboard",
      "The process of passing props through multiple levels of intermediate components that do not need the data themselves, solely to reach a deeply nested child",
      "A technique for automated testing",
      "Binding props to HTML inputs"
    ],
    "correctAnswer": 1,
    "explanation": "Prop drilling occurs when data must travel through 5-10 layers of intermediary components that only act as pass-through pipes, cluttering code and hindering maintainability."
  },
  {
    "id": "wd_sm_2",
    "topic": "State Management",
    "difficulty": "Easy",
    "question": "Which built-in React feature resolves prop drilling for global theme or authenticated user data?",
    "options": [
      "React Context API (`createContext`, `useContext`)",
      "React Portals",
      "React Fragments",
      "Virtual DOM"
    ],
    "correctAnswer": 0,
    "explanation": "React Context allows values (theme, locale, current user) to be broadcast across the component tree without manually passing props down through every intermediate level."
  },
  {
    "id": "wd_sm_3",
    "topic": "State Management",
    "difficulty": "Easy",
    "question": "What are the three core principles of Redux?",
    "options": [
      "Speed, Security, Simplicity",
      "Single source of truth (one store), State is read-only (mutated only via actions), Changes are made with pure functions (reducers)",
      "Local state, global actions, async reducers",
      "Controllers, Models, Views"
    ],
    "correctAnswer": 1,
    "explanation": "Redux principles: 1) Single source of truth (one global store tree); 2) State is read-only (dispatched actions describe intent); 3) Changes are made with pure functions (reducers return new state)."
  },
  {
    "id": "wd_sm_4",
    "topic": "State Management",
    "difficulty": "Easy",
    "question": "What is a Redux \"Action\"?",
    "options": [
      "A function that mutates the database",
      "A plain JavaScript object representing an intention to change state, containing a mandatory `type` property and an optional `payload`",
      "A CSS animation trigger",
      "A Redux middleware plugin"
    ],
    "correctAnswer": 1,
    "explanation": "An action is a plain object like `{ type: \"cart/addItem\", payload: product }` dispatched to the Redux store to describe what happened."
  },
  {
    "id": "wd_sm_5",
    "topic": "State Management",
    "difficulty": "Medium",
    "question": "Why is Redux Toolkit (`@reduxjs/toolkit` / RTK) recommended over legacy Redux boilerplate?",
    "options": [
      "It converts React code to Vue",
      "It simplifies store setup, eliminates repetitive action creators/types with `createSlice`, and uses Immer internally to allow safe \"mutating\" syntax in reducers",
      "It removes the need for reducers",
      "It stores state in browser cookies"
    ],
    "correctAnswer": 1,
    "explanation": "RTK drastically reduces boilerplate: `createSlice` auto-generates action creators and types, includes Redux Thunk by default, and leverages Immer so you can write `state.count += 1` safely."
  },
  {
    "id": "wd_sm_6",
    "topic": "State Management",
    "difficulty": "Medium",
    "question": "What is the primary drawback of using React Context API for high-frequency state updates?",
    "options": [
      "Context API does not support numbers",
      "Every component that consumes the context (`useContext`) re-renders whenever the context value changes, causing performance degradation for high-frequency updates (e.g. cursor positions, inputs)",
      "Context only works in development mode",
      "Context cannot be used with hooks"
    ],
    "correctAnswer": 1,
    "explanation": "React Context lacks selector-based subscriptions: any change to the context value object triggers a re-render in every consuming component, causing lag if updated multiple times per second."
  },
  {
    "id": "wd_sm_7",
    "topic": "State Management",
    "difficulty": "Medium",
    "question": "How does Zustand simplify state management compared to Redux?",
    "options": [
      "It requires wrapping the entire app in 5 nested Providers",
      "It provides a lightweight, hook-based store created with `create()`, requires zero Context Providers, and supports fine-grained selector subscriptions to avoid unnecessary re-renders",
      "It stores state on remote cloud servers only",
      "It only works with class components"
    ],
    "correctAnswer": 1,
    "explanation": "Zustand creates stores via simple hooks (`const useStore = create(...)`), works without context provider boilerplate, and allows components to subscribe to small slices (`useStore(s => s.bears)`)."
  },
  {
    "id": "wd_sm_8",
    "topic": "State Management",
    "difficulty": "Medium",
    "question": "What is Redux Thunk used for in Redux architecture?",
    "options": [
      "Formatting Redux DevTools",
      "A middleware that allows writing action creators that return a function instead of an action, enabling asynchronous logic (API calls) before dispatching actions",
      "Encrypting local storage",
      "Compiling TypeScript types"
    ],
    "correctAnswer": 1,
    "explanation": "Redux Thunk is standard middleware allowing action creators to invert control: returning `(dispatch, getState) => { ... }` allows dispatching pending, success, or error actions asynchronously."
  },
  {
    "id": "wd_sm_9",
    "topic": "State Management",
    "difficulty": "Hard",
    "question": "What is the difference between Server State (e.g. React Query / TanStack Query, RTK Query) and Client State (Redux/Zustand)?",
    "options": [
      "Server state is stored in MySQL; client state in MongoDB",
      "Server State is remote, asynchronously fetched, shared, and requires caching, deduplication, and revalidation; Client State is purely local synchronous UI state (e.g. modal open, sidebar toggled)",
      "Client state cannot be serialized",
      "There is no difference"
    ],
    "correctAnswer": 1,
    "explanation": "TanStack Query/RTK Query treats remote data as cache: handling background refetching, stale-while-revalidate, deduplication, and loading/error states, freeing client state managers (Zustand/Redux) for purely local UI state."
  },
  {
    "id": "wd_sm_10",
    "topic": "State Management",
    "difficulty": "Hard",
    "question": "How does Immer library allow developers to write \"mutating\" code in immutable state updates?",
    "options": [
      "It changes JavaScript language specifications",
      "It uses JavaScript `Proxy` objects to record all modifications to a temporary \"draft\" state and automatically produces a brand new immutable state tree based on those recorded changes",
      "It freezes computer RAM",
      "It runs mutating code in C++"
    ],
    "correctAnswer": 1,
    "explanation": "Immer wraps state in a `Proxy` draft: you write `draft.todos[0].done = true`. Immer intercepts operations, leaves original state untouched, and constructs a structurally shared immutable copy with changes applied."
  },
  {
    "id": "wd_perf_1",
    "topic": "Web Performance & Optimization",
    "difficulty": "Easy",
    "question": "What is \"Code Splitting\" and how does dynamic `import()` help modern web apps?",
    "options": [
      "Splitting code into two different Git branches",
      "Breaking a single large JavaScript bundle into smaller chunks loaded on demand when a user navigates to a specific route/feature, drastically reducing initial load time",
      "Splitting HTML and CSS into separate files",
      "Writing code across two monitors"
    ],
    "correctAnswer": 1,
    "explanation": "Code splitting breaks monolithic bundles into smaller chunks loaded lazily on demand (`React.lazy(() => import(\"./HeavyComponent\"))`), shrinking initial JS payload and speeding up Time-to-Interactive."
  },
  {
    "id": "wd_perf_2",
    "topic": "Web Performance & Optimization",
    "difficulty": "Easy",
    "question": "What is \"Lazy Loading\" of images in modern HTML?",
    "options": [
      "Downloading images over 2G networks",
      "Deferring the loading of off-screen images until the user scrolls near them, natively enabled via `<img loading=\"lazy\">`",
      "Compressing images to 8-bit black and white",
      "Hiding images using CSS display:none"
    ],
    "correctAnswer": 1,
    "explanation": "`<img loading=\"lazy\">` tells the browser to defer loading the image asset until it approaches the viewport, saving network bandwidth and memory for off-screen media."
  },
  {
    "id": "wd_perf_3",
    "topic": "Web Performance & Optimization",
    "difficulty": "Easy",
    "question": "What are Google's \"Core Web Vitals\"?",
    "options": [
      "A list of Google employees",
      "A set of standardized metrics measuring real-world user experience: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)",
      "The temperature of Google data center servers",
      "A set of SEO keywords"
    ],
    "correctAnswer": 1,
    "explanation": "Core Web Vitals quantify real user experience: LCP measures loading performance; INP measures interactivity/responsiveness; CLS measures visual stability."
  },
  {
    "id": "wd_perf_4",
    "topic": "Web Performance & Optimization",
    "difficulty": "Easy",
    "question": "What does Cumulative Layout Shift (CLS) measure?",
    "options": [
      "The time taken to download CSS",
      "Visual stability: how much visible content unexpectedly shifts around on screen during page load (e.g. images loading without height/width attributes)",
      "The number of lines of JavaScript code",
      "The layout of database tables"
    ],
    "correctAnswer": 1,
    "explanation": "CLS measures unexpected layout movement while reading (e.g. ads or images popping in and pushing text down). Reserving aspect-ratio boxes prevents CLS."
  },
  {
    "id": "wd_perf_5",
    "topic": "Web Performance & Optimization",
    "difficulty": "Medium",
    "question": "What is the difference between \"Debouncing\" and \"Throttling\"?",
    "options": [
      "Debouncing is for mouse; throttling is for keyboard",
      "Debouncing delays execution until a specified quiet period passes without any new events (e.g. search autocomplete); Throttling limits execution to at most once every X milliseconds (e.g. scroll/resize)",
      "Throttling cancels all calls; debouncing executes all calls",
      "They are exact synonyms"
    ],
    "correctAnswer": 1,
    "explanation": "Debounce: waits until user stops triggering events for `t` ms before invoking. Throttle: guarantees function executes at most once every `t` ms during continuous event firing."
  },
  {
    "id": "wd_perf_6",
    "topic": "Web Performance & Optimization",
    "difficulty": "Medium",
    "question": "What does \"Tree Shaking\" do in modern bundlers (Webpack, Vite, Rollup)?",
    "options": [
      "Animates HTML tree nodes on scroll",
      "Dead code elimination: analyzes ES6 module `import`/`export` statements statically and removes unreferenced/unused exports from the final production bundle",
      "Refactors CSS class names to 2 letters",
      "Compresses images into WebP format"
    ],
    "correctAnswer": 1,
    "explanation": "Tree shaking relies on the static structure of ES6 imports. Bundlers trace dependency graphs and discard unused module exports, reducing final bundle size."
  },
  {
    "id": "wd_perf_7",
    "topic": "Web Performance & Optimization",
    "difficulty": "Medium",
    "question": "What is the difference between SSR (Server-Side Rendering) and SSG (Static Site Generation)?",
    "options": [
      "SSR uses PHP; SSG uses Python",
      "SSR renders HTML dynamically on the server upon each incoming user request; SSG pre-renders HTML pages at build time once and serves them instantly via CDN",
      "SSG cannot contain JavaScript",
      "SSR renders inside the user browser"
    ],
    "correctAnswer": 1,
    "explanation": "SSG pre-builds static HTML files at build time (blazing fast via CDN, ideal for blogs/docs). SSR generates HTML on the fly on each HTTP request (ideal for personalized, rapidly mutating dashboards)."
  },
  {
    "id": "wd_perf_8",
    "topic": "Web Performance & Optimization",
    "difficulty": "Medium",
    "question": "How does `content-visibility: auto;` improve rendering performance in modern CSS?",
    "options": [
      "Hides content from search engines",
      "Instructs the browser to skip rendering, layout, and painting of off-screen elements until they approach the viewport, drastically boosting initial page render speed on long pages",
      "Converts HTML to PDF",
      "Automatically translates text to French"
    ],
    "correctAnswer": 1,
    "explanation": "`content-visibility: auto` allows browsers to skip layout and painting for off-screen elements entirely until scrolled into view, delivering massive initial load performance gains on content-heavy pages."
  },
  {
    "id": "wd_perf_9",
    "topic": "Web Performance & Optimization",
    "difficulty": "Hard",
    "question": "What is the difference between `preload`, `prefetch`, and `preconnect` resource hints in `<link>` tags?",
    "options": [
      "They are identical attributes",
      "`preload` downloads critical resources needed for the current page immediately; `prefetch` downloads resources needed for future navigations during idle time; `preconnect` performs early DNS/TLS handshakes",
      "`prefetch` executes scripts immediately",
      "`preconnect` blocks page rendering"
    ],
    "correctAnswer": 1,
    "explanation": "`preload` fetches high-priority current page assets (fonts, hero images). `prefetch` fetches lower-priority assets likely needed in subsequent pages during idle time. `preconnect` resolves DNS and establishes TCP/TLS connections in advance."
  },
  {
    "id": "wd_perf_10",
    "topic": "Web Performance & Optimization",
    "difficulty": "Hard",
    "question": "What is Virtual Scrolling (List Virtualization) and why is it essential for rendering 10,000 items in a table?",
    "options": [
      "Using VR headsets to view web pages",
      "Only rendering the small subset of DOM nodes currently visible within the viewport window (plus a small buffer), recycling nodes as the user scrolls to keep DOM node count low",
      "Storing table rows in localStorage",
      "Paginating items on the backend server"
    ],
    "correctAnswer": 1,
    "explanation": "Rendering 10,000 real DOM nodes degrades browser memory and causes severe layout reflow lag. Virtual scrolling renders only 20-30 visible rows at any moment, repositioning them dynamically on scroll."
  },
  {
    "id": "wd_sec_1",
    "topic": "Web Security Fundamentals",
    "difficulty": "Easy",
    "question": "What is Cross-Site Scripting (XSS)?",
    "options": [
      "An attack on server hardware",
      "A vulnerability where malicious JavaScript is injected into trusted web applications and executed inside unsuspecting users' browsers",
      "Overloading servers with network requests",
      "Intercepting Wi-Fi traffic"
    ],
    "correctAnswer": 1,
    "explanation": "XSS occurs when an application includes untrusted, unsanitized user input in a web page without proper escaping, allowing attackers to execute arbitrary JavaScript in the victim's browser session."
  },
  {
    "id": "wd_sec_2",
    "topic": "Web Security Fundamentals",
    "difficulty": "Easy",
    "question": "What is Cross-Site Request Forgery (CSRF)?",
    "options": [
      "Stealing user password from database",
      "An attack that tricks an authenticated user into unwittingly executing unwanted actions (e.g. transferring money) on a web app where they are currently authenticated",
      "Injecting SQL statements into inputs",
      "Cracking SSL certificates"
    ],
    "correctAnswer": 1,
    "explanation": "CSRF tricks an authenticated user's browser into sending forged requests with their existing session cookies to a vulnerable site without their knowledge or consent."
  },
  {
    "id": "wd_sec_3",
    "topic": "Web Security Fundamentals",
    "difficulty": "Easy",
    "question": "What does the `HttpOnly` flag on a cookie prevent?",
    "options": [
      "Cookies from being sent over HTTPS",
      "Client-side scripts (JavaScript `document.cookie`) from accessing the cookie, protecting session tokens from XSS theft",
      "Cookies from expiring",
      "Cookies from being stored on hard drives"
    ],
    "correctAnswer": 1,
    "explanation": "Setting `HttpOnly` ensures that client-side JavaScript cannot read or modify the cookie via `document.cookie`, mitigating credential theft during XSS attacks."
  },
  {
    "id": "wd_sec_4",
    "topic": "Web Security Fundamentals",
    "difficulty": "Easy",
    "question": "What is CORS (Cross-Origin Resource Sharing)?",
    "options": [
      "A database replication protocol",
      "A browser security mechanism using HTTP headers to permit or restrict resources requested from a domain different from the domain serving the page",
      "An encryption algorithm replacing RSA",
      "A firewall hardware tool"
    ],
    "correctAnswer": 1,
    "explanation": "CORS is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, port) other than its own from which a browser should permit loading resources."
  },
  {
    "id": "wd_sec_5",
    "topic": "Web Security Fundamentals",
    "difficulty": "Medium",
    "question": "What does the `SameSite` cookie attribute do and what are its values?",
    "options": [
      "Sets cookie expiration date",
      "Controls whether cookies are sent with cross-site requests to mitigate CSRF attacks; values are `Strict`, `Lax` (default in modern browsers), and `None` (requires `Secure`)",
      "Restricts cookie to desktop browsers",
      "Encrypts cookie payload with AES"
    ],
    "correctAnswer": 1,
    "explanation": "`SameSite=Strict` blocks cookie on all cross-site requests. `SameSite=Lax` permits cookies only on top-level navigation GET requests. `SameSite=None` permits cross-site sending but requires the `Secure` HTTPS flag."
  },
  {
    "id": "wd_sec_6",
    "topic": "Web Security Fundamentals",
    "difficulty": "Medium",
    "question": "What is a Content Security Policy (CSP) and how is it delivered?",
    "options": [
      "A company privacy policy page",
      "An HTTP response header (`Content-Security-Policy`) allowing site operators to restrict the resources (scripts, styles, images) browsers are allowed to load and execute",
      "A terms of service agreement",
      "A password hashing algorithm"
    ],
    "correctAnswer": 1,
    "explanation": "CSP provides a powerful defense-in-depth against XSS by specifying trusted source domains and nonces for scripts, stylesheets, images, and fonts via HTTP headers."
  },
  {
    "id": "wd_sec_7",
    "topic": "Web Security Fundamentals",
    "difficulty": "Medium",
    "question": "How do Anti-CSRF Tokens protect against CSRF attacks?",
    "options": [
      "By encrypting all HTTP headers",
      "By requiring a secret, unpredictable, user-specific token generated by the server to be submitted with mutation requests (POST/PUT), which a cross-origin malicious site cannot read or forge",
      "By requiring users to solve a CAPTCHA on every click",
      "By disabling cookies entirely"
    ],
    "correctAnswer": 1,
    "explanation": "Because the attacker's site cannot read responses from the target domain due to Same-Origin Policy, it cannot obtain the secret anti-CSRF token to include in the forged request payload."
  },
  {
    "id": "wd_sec_8",
    "topic": "Web Security Fundamentals",
    "difficulty": "Medium",
    "question": "What is \"Clickjacking\" and what header prevents it?",
    "options": [
      "Automated clicking using Selenium bots",
      "An attack where an attacker overlays an invisible iframe of a target site over a decoy page to trick users into clicking buttons; prevented using `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`",
      "Hijacking mouse drivers",
      "Spamming advertisement clicks"
    ],
    "correctAnswer": 1,
    "explanation": "Clickjacking tricks users into clicking transparent iframe layers over decoy buttons. Setting `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'` forbids browsers from rendering the page inside any iframe."
  },
  {
    "id": "wd_sec_9",
    "topic": "Web Security Fundamentals",
    "difficulty": "Hard",
    "question": "What is a Preflight Request (OPTIONS) in CORS and when is it triggered?",
    "options": [
      "A request checking internet speed",
      "An initial HTTP OPTIONS request sent automatically by the browser for \"non-simple\" cross-origin requests (e.g. methods like PUT/DELETE or custom headers like Authorization) to check permissions before sending the actual request",
      "A DNS lookup test",
      "A ping request to CDN"
    ],
    "correctAnswer": 1,
    "explanation": "For requests modifying data or using non-standard headers (like `Authorization` or `Content-Type: application/json`), browsers send an automated `OPTIONS` preflight request to verify server CORS headers before executing the real call."
  },
  {
    "id": "wd_sec_10",
    "topic": "Web Security Fundamentals",
    "difficulty": "Hard",
    "question": "What is Subresource Integrity (SRI) in HTML?",
    "options": [
      "A feature verifying CPU integrity",
      "A security feature that enables browsers to verify that resources fetched from CDNs (scripts/styles) haven't been tampered with by checking their cryptographic hash (`integrity=\"sha384-...\"`)",
      "A database foreign key rule",
      "A Git commit signature check"
    ],
    "correctAnswer": 1,
    "explanation": "SRI ensures that if a third-party CDN is compromised and malicious code injected into an external library, the browser detects that the file hash does not match the `integrity` attribute and refuses to execute the script."
  },
  {
    "id": "wd_api_1",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Easy",
    "question": "Which HTTP method is traditionally used to replace an entire resource in RESTful API design?",
    "options": [
      "GET",
      "POST",
      "PUT",
      "PATCH"
    ],
    "correctAnswer": 2,
    "explanation": "In REST, `PUT` completely replaces the target resource with the request payload, whereas `PATCH` applies partial modifications."
  },
  {
    "id": "wd_api_2",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Easy",
    "question": "What is the primary difference between `fetch()` and `axios` regarding HTTP error status codes (e.g. 404, 500)?",
    "options": [
      "`fetch()` rejects the promise on 404; axios resolves",
      "`fetch()` resolves its promise even on HTTP 4xx/5xx errors (only rejecting on network failure); `axios` automatically rejects promises for status codes outside the 2xx range",
      "Both reject on 404",
      "Axios cannot handle 500 errors"
    ],
    "correctAnswer": 1,
    "explanation": "Native `fetch()` considers an HTTP 404 or 500 response a successful network round-trip and resolves the promise (requiring checking `response.ok`). Axios rejects the promise on any non-2xx response status."
  },
  {
    "id": "wd_api_3",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Easy",
    "question": "What does it mean for an HTTP method to be \"Idempotent\"?",
    "options": [
      "The method executes in zero milliseconds",
      "Making multiple identical requests has the exact same effect on server state as making a single request (e.g. GET, PUT, DELETE)",
      "The method cannot be cached",
      "The method requires password authentication"
    ],
    "correctAnswer": 1,
    "explanation": "An idempotent method guarantees that executing the request N times produces the identical server state as executing it once (e.g. `DELETE /items/5` leaves item 5 deleted regardless of how many times executed)."
  },
  {
    "id": "wd_api_4",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Easy",
    "question": "What HTTP status code represents \"201 Created\"?",
    "options": [
      "Success: request received but no content returned",
      "Success: request succeeded and led to the creation of a new resource",
      "Bad Request: invalid syntax",
      "Unauthorized"
    ],
    "correctAnswer": 1,
    "explanation": "HTTP 201 indicates the request succeeded and a new resource was created, typically returned by `POST` endpoints with a `Location` header."
  },
  {
    "id": "wd_api_5",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Medium",
    "question": "How can you cancel an in-flight `fetch()` request in modern JavaScript?",
    "options": [
      "Calling `window.stop()`",
      "Using an `AbortController` instance and passing its `signal` to the fetch options: `fetch(url, { signal: controller.signal })`",
      "Calling `fetch.cancel()`",
      "Deleting the promise variable"
    ],
    "correctAnswer": 1,
    "explanation": "`const controller = new AbortController(); fetch(url, { signal: controller.signal }); controller.abort();` cancels the network request cleanly and rejects the promise with an `AbortError`."
  },
  {
    "id": "wd_api_6",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Medium",
    "question": "What are Axios Interceptors used for?",
    "options": [
      "Blocking user clicks",
      "Intercepting and transforming requests or responses globally before they are handled by `then` or `catch` (e.g. automatically attaching JWT Bearer tokens or refreshing expired auth tokens)",
      "Encrypting cookies",
      "Filtering console logs"
    ],
    "correctAnswer": 1,
    "explanation": "Axios interceptors let you register global middleware for outgoing requests (attaching headers, logging) and incoming responses (handling 401 token refresh globally)."
  },
  {
    "id": "wd_api_7",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Medium",
    "question": "What is the difference between URI Parameters (Path params) and Query Parameters in RESTful routing?",
    "options": [
      "They are identical",
      "Path parameters identify a specific resource entity (e.g. `/users/123`); Query parameters filter, sort, or paginate that resource collection (e.g. `/users?role=admin&page=2`)",
      "Path parameters can only be strings",
      "Query parameters modify database schemas"
    ],
    "correctAnswer": 1,
    "explanation": "Path parameters are structural identifiers locating a distinct entity (`/books/{id}`). Query parameters are optional parameters that sort, filter, or paginate representations of a collection (`/books?genre=fiction`)."
  },
  {
    "id": "wd_api_8",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Medium",
    "question": "What is the purpose of the HTTP status code 422 Unprocessable Entity?",
    "options": [
      "Server is down",
      "The server understands the content type and syntax is correct, but was unable to process the contained instructions due to semantic/validation errors (e.g. email format invalid)",
      "User is not logged in",
      "Database connection failed"
    ],
    "correctAnswer": 1,
    "explanation": "HTTP 422 indicates semantic validation failure: the JSON syntax was perfectly well-formed, but business validations (e.g. age must be positive number) were violated."
  },
  {
    "id": "wd_api_9",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Hard",
    "question": "What is HATEOAS (Hypermedia As The Engine Of Application State) in REST maturity model (Richardson Level 3)?",
    "options": [
      "An automated testing framework",
      "A constraint where the API response provides hypermedia links guiding the client on what actions/transitions are dynamically available next from the current state",
      "A database indexing method",
      "A GraphQL query compiler"
    ],
    "correctAnswer": 1,
    "explanation": "Under HATEOAS, clients interact with network applications entirely through hypermedia provided dynamically by application servers (e.g. an order response includes links to cancel, pay, or track)."
  },
  {
    "id": "wd_api_10",
    "topic": "RESTful APIs & Fetch / Axios",
    "difficulty": "Hard",
    "question": "What is the difference between REST and GraphQL regarding over-fetching and under-fetching?",
    "options": [
      "REST is faster than GraphQL in all cases",
      "REST often returns fixed data schemas causing over-fetching (unneeded fields) or under-fetching (requiring N+1 requests); GraphQL allows clients to request exactly the fields needed in a single query",
      "GraphQL does not use HTTP",
      "REST does not support caching"
    ],
    "correctAnswer": 1,
    "explanation": "GraphQL solves REST over-fetching (downloading 50 fields when you only need a username) and under-fetching (needing 3 separate round-trips to get a user, their posts, and comments) by allowing client-specified query shapes."
  },
  {
    "id": "wd_ws_1",
    "topic": "WebSockets & Real-time",
    "difficulty": "Easy",
    "question": "What protocol scheme do secure WebSockets use?",
    "options": [
      "http://",
      "https://",
      "wss://",
      "tcp://"
    ],
    "correctAnswer": 2,
    "explanation": "Secure WebSockets encrypted over TLS use the `wss://` URI scheme (analogous to HTTPS). Unencrypted WebSockets use `ws://`."
  },
  {
    "id": "wd_ws_2",
    "topic": "WebSockets & Real-time",
    "difficulty": "Easy",
    "question": "How does a WebSocket connection begin?",
    "options": [
      "Directly over raw UDP sockets",
      "Through an HTTP GET request with an `Upgrade: websocket` header (the WebSocket Handshake)",
      "Through an SSH tunnel",
      "Using FTP"
    ],
    "correctAnswer": 1,
    "explanation": "WebSockets initiate via a standard HTTP handshake. The client sends `Connection: Upgrade` and `Upgrade: websocket`. If accepted, server returns `101 Switching Protocols` and connection switches to persistent bidirectional TCP."
  },
  {
    "id": "wd_ws_3",
    "topic": "WebSockets & Real-time",
    "difficulty": "Easy",
    "question": "What is the primary difference between WebSockets and Server-Sent Events (SSE)?",
    "options": [
      "WebSockets are unidirectional; SSE is bidirectional",
      "WebSockets provide full-duplex bidirectional communication; SSE provides unidirectional (server-to-client only) streaming over standard HTTP",
      "SSE requires custom browser plugins",
      "WebSockets cannot send text"
    ],
    "correctAnswer": 1,
    "explanation": "WebSockets allow both client and server to push messages at any time. SSE provides a simple, lightweight unidirectional pipe for servers to stream updates down to clients over HTTP."
  },
  {
    "id": "wd_ws_4",
    "topic": "WebSockets & Real-time",
    "difficulty": "Easy",
    "question": "Which native browser JavaScript API is used to create a WebSocket connection?",
    "options": [
      "navigator.connect()",
      "new WebSocket(\"wss://example.com/socket\")",
      "window.createSocket()",
      "document.openSocket()"
    ],
    "correctAnswer": 1,
    "explanation": "`const socket = new WebSocket(\"wss://example.com\"); socket.onmessage = (e) => { ... };` is the native browser API."
  },
  {
    "id": "wd_ws_5",
    "topic": "WebSockets & Real-time",
    "difficulty": "Medium",
    "question": "What is the purpose of WebSocket Ping and Pong frames (heartbeats)?",
    "options": [
      "To play retro video games",
      "To detect broken/dropped connections and keep intermediate proxy/NAT firewalls from closing idle TCP sockets",
      "To measure network bandwidth",
      "To encrypt message payloads"
    ],
    "correctAnswer": 1,
    "explanation": "Intermediate routers and cloud load balancers terminate idle connections after timeouts. Periodic Ping/Pong heartbeats prove connection liveness and prevent premature disconnection."
  },
  {
    "id": "wd_ws_6",
    "topic": "WebSockets & Real-time",
    "difficulty": "Medium",
    "question": "How does Socket.IO differ from raw native WebSockets?",
    "options": [
      "Socket.IO is written in C++",
      "Socket.IO is a library built on top of WebSockets that provides automatic fallback to HTTP long-polling, auto-reconnection, rooms/broadcasting, and packet buffering",
      "Native WebSockets cannot send JSON",
      "Socket.IO does not use TCP"
    ],
    "correctAnswer": 1,
    "explanation": "Native WebSockets are a transport protocol. Socket.IO is a real-time framework adding connection fallbacks, automatic reconnects, acknowledgments, and room abstractions."
  },
  {
    "id": "wd_ws_7",
    "topic": "WebSockets & Real-time",
    "difficulty": "Medium",
    "question": "What is WebRTC and what distinguishes it from WebSockets?",
    "options": [
      "WebRTC is for audio only",
      "WebRTC provides direct peer-to-peer (P2P) audio, video, and data streaming with ultra-low latency using UDP (SRTP/SCTP) without routing media through central servers",
      "WebSockets are faster than WebRTC",
      "WebRTC requires Flash player"
    ],
    "correctAnswer": 1,
    "explanation": "WebSockets route all traffic through a centralized server. WebRTC enables direct browser-to-browser peer-to-peer streaming for high-bandwidth real-time video, voice, and data with sub-second latency."
  },
  {
    "id": "wd_ws_8",
    "topic": "WebSockets & Real-time",
    "difficulty": "Medium",
    "question": "What happens when a client disconnects from a WebSocket unexpectedly (e.g. Wi-Fi drops)?",
    "options": [
      "The server immediately receives an HTTP 404",
      "The connection may remain half-open until a heartbeat ping times out or a write operation fails, triggering the `onclose` / `onerror` events",
      "The browser restarts",
      "The computer halts"
    ],
    "correctAnswer": 1,
    "explanation": "TCP connections can enter a \"half-open\" state when network links drop silently without TCP FIN packets. Only application-level heartbeat timeouts detect the failure and fire the close handler."
  },
  {
    "id": "wd_ws_9",
    "topic": "WebSockets & Real-time",
    "difficulty": "Hard",
    "question": "How do you scale a WebSocket application horizontally across multiple backend server instances?",
    "options": [
      "WebSockets cannot be scaled horizontally",
      "Use an API Gateway with sticky sessions / consistent hashing, and connect backend servers via a Pub/Sub message broker (e.g. Redis Pub/Sub or Kafka) to broadcast messages across nodes",
      "By buying faster CPU chips",
      "By using one giant monolithic server"
    ],
    "correctAnswer": 1,
    "explanation": "Because client A may connect to Server 1 and client B to Server 2, a shared Pub/Sub message bus (like Redis) synchronizes messages across all server nodes, while load balancers maintain persistent sticky TCP sessions."
  },
  {
    "id": "wd_ws_10",
    "topic": "WebSockets & Real-time",
    "difficulty": "Hard",
    "question": "What is the STUN / TURN server used for in WebRTC peer-to-peer connection establishment?",
    "options": [
      "STUN stores video files; TURN renders graphics",
      "STUN discovers the public IP and port of clients behind NAT/firewalls; TURN acts as a relay server when symmetric NAT blocks direct P2P connections",
      "STUN encrypts passwords; TURN compiles code",
      "STUN is a database; TURN is a cache"
    ],
    "correctAnswer": 1,
    "explanation": "STUN allows peers to discover their public IP/port behind NATs. If strict firewalls or symmetric NATs prevent direct P2P connections, TURN relays media streams between peers through an intermediate server."
  },
  {
    "id": "wd_pwa_1",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Easy",
    "question": "What is a Service Worker in modern web applications?",
    "options": [
      "A background employee at a web hosting company",
      "An event-driven background script registered by the browser that runs on a separate thread from the webpage, intercepting network requests and enabling offline caching and push notifications",
      "A database background job",
      "A CSS styling preprocessor"
    ],
    "correctAnswer": 1,
    "explanation": "A Service Worker is an event-driven worker running independently of the DOM thread, acting as a programmable network proxy between the web app, the browser cache, and the network."
  },
  {
    "id": "wd_pwa_2",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Easy",
    "question": "What file provides metadata (app name, icons, theme color, display mode) allowing a web app to be installed on a mobile home screen?",
    "options": [
      "package.json",
      "manifest.json (Web App Manifest)",
      "service-worker.js",
      "robots.txt"
    ],
    "correctAnswer": 1,
    "explanation": "The Web App Manifest (`manifest.json`) provides browsers with app metadata (name, icons, start_url, theme_color, `display: standalone`) required to prompt and install the PWA on device home screens."
  },
  {
    "id": "wd_pwa_3",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Easy",
    "question": "Why can Service Workers only run on secure origins (HTTPS or localhost)?",
    "options": [
      "Because HTTP cannot transfer JavaScript",
      "Because Service Workers have the power to intercept, modify, and forge all network requests and responses, making an unencrypted man-in-the-middle attack catastrophic",
      "Because browsers charge fees for HTTPS",
      "Because CSS requires HTTPS"
    ],
    "correctAnswer": 1,
    "explanation": "Because a Service Worker can intercept all network traffic and serve arbitrary responses, allowing it on unencrypted HTTP would expose users to devastating man-in-the-middle attacks."
  },
  {
    "id": "wd_pwa_4",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Easy",
    "question": "Can a Service Worker access the window DOM (`document.getElementById`) directly?",
    "options": [
      "Yes, without restrictions",
      "No, Service Workers run in a separate execution thread and have no direct access to the DOM or `window` object (communicating with pages via `postMessage`)",
      "Only in Chrome",
      "Only if the page is HTTPS"
    ],
    "correctAnswer": 1,
    "explanation": "Service Workers run off the main thread and lack access to the DOM, `window`, or `localStorage`. They communicate with pages via the `postMessage` API and utilize IndexedDB/Cache API."
  },
  {
    "id": "wd_pwa_5",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Medium",
    "question": "What are the core lifecycle events of a Service Worker?",
    "options": [
      "Download, Parse, Execute",
      "Register, Install, Activate, and Fetch / Message",
      "Create, Mount, Update, Unmount",
      "Init, Loop, Terminate"
    ],
    "correctAnswer": 1,
    "explanation": "The Service Worker lifecycle: 1) Register: page registers worker; 2) Install: precaches static assets (`install` event); 3) Activate: purges outdated caches (`activate` event); 4) Idle/Fetch: intercepts network traffic."
  },
  {
    "id": "wd_pwa_6",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Medium",
    "question": "What is the \"Cache First\" (Cache Falling Back to Network) caching strategy in Service Workers?",
    "options": [
      "Always fetch from network and ignore cache",
      "Check the Cache storage first: if found, return cached response immediately; if not found, fetch from network, update cache, and return response",
      "Fetch from network and cache in parallel",
      "Never store in cache"
    ],
    "correctAnswer": 1,
    "explanation": "Cache-First is ideal for static assets (fonts, images, CSS/JS): it responds instantaneously from cache and only makes network calls for missing resources."
  },
  {
    "id": "wd_pwa_7",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Medium",
    "question": "What is the \"Network First\" (Network Falling Back to Cache) caching strategy?",
    "options": [
      "Fetch from network; if online, return fresh data and update cache; if network fails (offline), fallback to cached response",
      "Always return cached data",
      "Download files before user clicks",
      "Delete cache after every request"
    ],
    "correctAnswer": 0,
    "explanation": "Network-First is ideal for rapidly changing data (user feeds, inventory): it attempts to get the freshest data online, falling back to cache when the device has lost connectivity."
  },
  {
    "id": "wd_pwa_8",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Medium",
    "question": "What is the \"Stale-While-Revalidate\" caching strategy?",
    "options": [
      "Delete stale cache immediately",
      "Return the cached response immediately for blazing fast UI response, while asynchronously fetching an updated version from network to update the cache for the next time",
      "Reject all stale requests",
      "Wait 10 seconds before caching"
    ],
    "correctAnswer": 1,
    "explanation": "Stale-While-Revalidate provides the best of both worlds: instant screen rendering from existing cache, while silently background-updating the cache with fresh network data for subsequent visits."
  },
  {
    "id": "wd_pwa_9",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Hard",
    "question": "What does `self.skipWaiting()` do inside a Service Worker `install` event handler?",
    "options": [
      "Skips running any unit tests",
      "Forces the newly installed Service Worker to activate immediately, bypassing the waiting state and replacing the older active worker without waiting for existing tabs to close",
      "Skips caching files",
      "Closes all browser tabs"
    ],
    "correctAnswer": 1,
    "explanation": "Normally, a newly updated worker stays in the `waiting` state until all open tabs using the old worker close. `self.skipWaiting()` forces immediate activation so updates take effect right away."
  },
  {
    "id": "wd_pwa_10",
    "topic": "Progressive Web Apps & Service Workers",
    "difficulty": "Hard",
    "question": "What is the \"Background Sync API\" in Progressive Web Apps?",
    "options": [
      "A method to sync files with Google Drive",
      "An API that allows a Service Worker to defer server synchronization tasks (e.g. sending a chat message or offline form submit) until the user has stable network connectivity, even if the user has navigated away or closed the app",
      "A CSS sync animation",
      "A tool for multi-monitor displays"
    ],
    "correctAnswer": 1,
    "explanation": "Background Sync queues user actions (like submitting a message or comment) while offline and delegates guaranteed delivery to the Service Worker once network connection is restored, even after the tab is closed."
  },
  {
    "id": "wd_ts_1",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Easy",
    "question": "What is TypeScript in relation to JavaScript?",
    "options": [
      "A complete replacement that doesn't run in browsers",
      "A strongly typed, syntactical superset of JavaScript that compiles down to plain JavaScript",
      "A backend framework for Node.js only",
      "A styling library for React"
    ],
    "correctAnswer": 1,
    "explanation": "TypeScript adds static type definitions on top of JavaScript. Any valid JavaScript is valid TypeScript, and TypeScript compiles to clean standard JavaScript."
  },
  {
    "id": "wd_ts_2",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Easy",
    "question": "What is the difference between `interface` and `type` alias in TypeScript?",
    "options": [
      "`type` can only be used for numbers",
      "Both can define object shapes; `interface` supports declaration merging (open for extension) and is tailored for OOP; `type` alias can define unions, primitives, tuples, and intersections",
      "`interface` is compiled into JavaScript classes; `type` is deleted",
      "They cannot be used together"
    ],
    "correctAnswer": 1,
    "explanation": "Interfaces can be merged and extended via `extends`. Type aliases are more versatile for complex types, unions (`type Status = \"idle\" | \"loading\"`), mapped types, and primitives."
  },
  {
    "id": "wd_ts_3",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Easy",
    "question": "What is the difference between `any` and `unknown` in TypeScript?",
    "options": [
      "They are exact synonyms",
      "`any` disables all type checking (bypassing the type system); `unknown` is type-safe because TypeScript forces you to perform type narrowing/checking before performing any operations on it",
      "`unknown` can only hold strings",
      "`any` throws runtime exceptions"
    ],
    "correctAnswer": 1,
    "explanation": "`any` opts out of type checking completely. `unknown` represents any value safely: you cannot call methods or properties on an `unknown` variable without first narrowing its type via `typeof`, `instanceof`, etc."
  },
  {
    "id": "wd_ts_4",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Easy",
    "question": "What does the `never` type represent in TypeScript?",
    "options": [
      "A type that can hold null",
      "The type of values that never occur (e.g., the return type of a function that always throws an exception or enters an infinite loop)",
      "A variable that has not been initialized",
      "A deprecated type in TypeScript 5"
    ],
    "correctAnswer": 1,
    "explanation": "`never` represents values that can never exist: functions that never return (always throw) or exhaustive branches in union switch checks."
  },
  {
    "id": "wd_ts_5",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Medium",
    "question": "What are Generics in TypeScript and why are they used?",
    "options": [
      "Classes generated automatically by AI",
      "A way to create reusable components/functions that can work over a variety of types rather than a single one, while preserving full type safety",
      "Types used only for numbers",
      "Generic error messages"
    ],
    "correctAnswer": 1,
    "explanation": "Generics (`function identity<T>(arg: T): T`) allow defining algorithms with type parameters, ensuring the compiler enforces relationships between inputs and outputs across diverse types."
  },
  {
    "id": "wd_ts_6",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Medium",
    "question": "What does the `keyof` operator do in TypeScript?",
    "options": [
      "Generates SSH keys",
      "Takes an object type and produces a string or numeric literal union of its keys (e.g. `keyof User` -> `\"id\" | \"name\" | \"email\"`)",
      "Extracts values of an array",
      "Checks if a key exists at runtime"
    ],
    "correctAnswer": 1,
    "explanation": "`keyof T` returns a union of the known, public property names of type `T`. It enables safe property access in functions like `function getProp<T, K extends keyof T>(obj: T, key: K)`."
  },
  {
    "id": "wd_ts_7",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Medium",
    "question": "What is a \"Type Guard\" in TypeScript?",
    "options": [
      "A security firewall in the IDE",
      "A runtime expression (like `typeof x === \"string\"`, `instanceof`, or custom `x is Type` predicate) that narrows down the type of a variable within a conditional block",
      "A compiler flag preventing any errors",
      "A private class constructor"
    ],
    "correctAnswer": 1,
    "explanation": "Type guards are runtime checks that inform the TypeScript compiler to narrow a union type to a more specific type within the guarded scope."
  },
  {
    "id": "wd_ts_8",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Medium",
    "question": "What does the `Partial<T>` utility type do in TypeScript?",
    "options": [
      "Deletes half of the properties in an object",
      "Constructs a type with all properties of `T` set to optional (`?`)",
      "Makes all properties read-only",
      "Extracts non-null properties"
    ],
    "correctAnswer": 1,
    "explanation": "`Partial<T>` transforms all properties in interface `T` into optional fields, commonly used for patch update payloads (`function update(user: Partial<User>)`)."
  },
  {
    "id": "wd_ts_9",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Hard",
    "question": "What is \"Discriminated Union\" (Tagged Union) in TypeScript?",
    "options": [
      "A union of classes with different constructors",
      "A pattern where every member type in a union shares a common literal property (the discriminant/tag, e.g. `kind: \"circle\" | \"square\"`), allowing TypeScript to narrow types automatically in switch statements",
      "A union that discriminates against any type",
      "An untyped JavaScript object"
    ],
    "correctAnswer": 1,
    "explanation": "A discriminated union features a common literal field across member types (e.g. `{ status: \"success\", data } | { status: \"error\", error }`). Checking `if (res.status === \"success\")` automatically narrows the type safely."
  },
  {
    "id": "wd_ts_10",
    "topic": "TypeScript Fundamentals",
    "difficulty": "Hard",
    "question": "What is the difference between `interface` declaration merging and type aliases?",
    "options": [
      "Type aliases merge automatically; interfaces throw errors",
      "Multiple `interface` declarations with the same name in the same scope automatically merge their property definitions into a single interface; `type` aliases with the same name throw a duplicate identifier error",
      "Declaration merging is only for CSS",
      "Interfaces cannot have methods"
    ],
    "correctAnswer": 1,
    "explanation": "If you declare `interface User { name: string; }` and later declare `interface User { age: number; }`, TypeScript merges them into `{ name: string; age: number; }`. Type aliases forbid re-declaration."
  }
]
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.interviewPrepWebDev;
}
