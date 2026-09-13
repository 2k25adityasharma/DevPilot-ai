// scripts/interviewPrep/buildTechTracks1.js
// Generates webDevelopment.js (14 topics * 10 = 140 MCQs) and git.js (10 topics * 10 = 100 MCQs)

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../../js/data/interviewPrep');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function q(id, topic, difficulty, question, options, correctAnswer, explanation) {
  if (!Array.isArray(options) || options.length !== 4) throw new Error(`Question ${id} must have 4 options`);
  if (correctAnswer < 0 || correctAnswer > 3) throw new Error(`Question ${id} invalid correct answer`);
  if (!explanation || !explanation.trim()) throw new Error(`Question ${id} missing explanation`);
  return { id, topic, difficulty, question, options, correctAnswer, explanation };
}

// 14. WEB DEVELOPMENT (14 topics * 10 = 140 questions)
console.log('Generating Web Development questions...');
const webQuestions = [
  // 1. HTML5 Semantics & Web Standards
  q('wd_h5_1', 'HTML5 Semantics & Web Standards', 'Easy',
    'Which HTML5 element should be used to encapsulate self-contained content that could be distributed independently (such as a blog post or news story)?',
    ['<section>', '<article>', '<aside>', '<div>'], 1,
    'The <article> element represents a complete, self-contained composition in a document (e.g. blog post, news story, forum post) that is independently distributable or reusable.'),
  q('wd_h5_2', 'HTML5 Semantics & Web Standards', 'Easy',
    'What is the purpose of the HTML5 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tag?',
    ['It defines page SEO keywords', 'It instructs mobile browsers to render the page at screen width with a 1:1 scale rather than defaulting to desktop resolution', 'It speeds up CSS downloading', 'It enables WebGL acceleration'], 1,
    'The viewport meta tag controls layout on mobile browsers, ensuring the page matches screen-width in device-independent pixels and sets the initial zoom level to 1.0.'),
  q('wd_h5_3', 'HTML5 Semantics & Web Standards', 'Easy',
    'Which semantic tag is best suited for secondary content like a sidebar, callout box, or related links?',
    ['<aside>', '<nav>', '<footer>', '<main>'], 0,
    'The <aside> element represents a portion of a document whose content is only indirectly related to the main content (such as sidebars, pull quotes, or related links).'),
  q('wd_h5_4', 'HTML5 Semantics & Web Standards', 'Easy',
    'What does the `alt` attribute on an `<img>` tag provide?',
    ['A tooltip shown on hover', 'Alternative text for screen readers and search engines when the image fails to load', 'The image file size in bytes', 'A link to high-resolution version'], 1,
    'The alt attribute provides alternative text for accessibility (screen readers for visually impaired users) and displays fallback text if the image file cannot be rendered.'),
  q('wd_h5_5', 'HTML5 Semantics & Web Standards', 'Medium',
    'What is the difference between `localStorage` and `sessionStorage` in HTML5 Web Storage API?',
    ['localStorage stores cookies; sessionStorage stores binary', 'localStorage data persists across browser sessions indefinitely until explicitly cleared; sessionStorage data is purged when the browser tab/session closes', 'sessionStorage persists across computer reboots; localStorage does not', 'sessionStorage can store up to 10 GB; localStorage only 5 MB'], 1,
    'localStorage persists data without expiration across browser tabs and sessions. sessionStorage isolates data to the specific browser tab session and is cleared upon tab closure.'),
  q('wd_h5_6', 'HTML5 Semantics & Web Standards', 'Medium',
    'What is the difference between HTML attributes and DOM properties?',
    ['They are identical terms in JavaScript', 'Attributes are defined in the HTML markup source text; Properties are runtime nodes and values on the live DOM tree object', 'Attributes are dynamic; properties are static', 'Properties can only be strings'], 1,
    'HTML attributes (e.g. `value="foo"`) represent initial values parsed from HTML text. DOM properties (e.g. `input.value`) represent live dynamic state in the browser DOM tree.'),
  q('wd_h5_7', 'HTML5 Semantics & Web Standards', 'Medium',
    'What is the purpose of the `defer` attribute in a `<script>` tag?',
    ['Executes the script synchronously, blocking HTML parsing', 'Downloads the script asynchronously in parallel with HTML parsing, but delays execution until HTML parsing is completely finished', 'Executes the script immediately as soon as downloaded, pausing parser', 'Prevents script execution on mobile devices'], 1,
    '`defer` downloads the script in parallel without blocking the DOM parser and executes scripts strictly in document order after the DOM has been fully constructed (just before DOMContentLoaded).'),
  q('wd_h5_8', 'HTML5 Semantics & Web Standards', 'Medium',
    'What does the HTML5 `<canvas>` element provide that `<svg>` does not?',
    ['Vector graphics that scale infinitely without pixelation', 'Resolution-dependent immediate-mode pixel manipulation via JavaScript (suitable for fast raster 2D/3D games)', 'DOM event handlers attached to individual drawn shapes', 'XML serialization'], 1,
    '<canvas> is an immediate-mode raster drawing surface (pixels are drawn and forgotten, ideal for fast game rendering). <svg> is retained-mode vector graphics where every shape is a DOM node.'),
  q('wd_h5_9', 'HTML5 Semantics & Web Standards', 'Hard',
    'What is the Shadow DOM in the Web Components standard?',
    ['A hidden browser cache for CSS stylesheets', 'An encapsulated DOM tree attached to an element that is hidden and isolated from the main document DOM, preventing style and script leakage', 'A technique for dark mode rendering', 'A Web Worker thread for DOM manipulation'], 1,
    'Shadow DOM provides true DOM and CSS scoping encapsulation: elements, IDs, and styles inside the shadow root do not bleed out into the main document, and outer styles do not bleed in.'),
  q('wd_h5_10', 'HTML5 Semantics & Web Standards', 'Hard',
    'What is the significance of the `rel="noopener noreferrer"` attribute on external links (`target="_blank"`)?',
    ['It compresses network requests', 'It prevents the opened window from accessing `window.opener` to redirect the parent page (reverse tabnabbing security vulnerability) and suppresses the Referer header', 'It forces links to open in incognito mode', 'It boosts Google PageRank ranking'], 1,
    'Without `noopener`, the target window can manipulate `window.opener.location` to phishing pages (reverse tabnabbing) and runs on the same process thread, degrading performance.'),

  // 2. Modern CSS (Flexbox, Grid, Custom Properties, Animations)
  q('wd_css_1', 'Modern CSS', 'Easy',
    'Which CSS property enables a Flexbox layout on a container element?',
    ['display: flex;', 'flex-direction: row;', 'align-items: center;', 'float: flex;'], 0,
    '`display: flex` establishes a flex container, formatting its direct children as flex items.'),
  q('wd_css_2', 'Modern CSS', 'Easy',
    'In CSS Flexbox, which property aligns flex items along the main axis?',
    ['align-items', 'justify-content', 'align-content', 'flex-basis'], 1,
    '`justify-content` defines how remaining space is distributed between and around flex items along the main axis (row or column).'),
  q('wd_css_3', 'Modern CSS', 'Easy',
    'How do you declare a CSS Custom Property (CSS Variable) scoped to the root document?',
    ['$primary-color: #3b82f6;', ':root { --primary-color: #3b82f6; }', '@var primary-color = #3b82f6;', 'html { let primary-color = #3b82f6; }'], 1,
    'CSS Custom Properties use the `--` prefix and are typically defined inside `:root { --var-name: value; }` for global document availability, accessed via `var(--var-name)`.'),
  q('wd_css_4', 'Modern CSS', 'Easy',
    'What does `box-sizing: border-box;` do in CSS?',
    ['Removes borders from all input fields', 'Includes padding and border within the specified width and height of an element', 'Excludes margins from the layout calculation', 'Forces elements into a grid layout'], 1,
    'Under `box-sizing: border-box`, width and height apply to the total visible box including content, padding, and borders, preventing elements from expanding beyond their assigned dimensions.'),
  q('wd_css_5', 'Modern CSS', 'Medium',
    'In CSS Grid, what does `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` achieve?',
    ['Creates a fixed 4-column grid', 'Creates a fully responsive grid that automatically fits as many 250px+ columns as space permits and stretches them equally without media queries', 'Limits the grid to 250 rows', 'Shrinks columns below 250px on mobile'], 1,
    'This classic CSS Grid pattern automatically generates flexible columns that wrap into new rows when the container narrows, scaling from 250px up to 1fr to fill available width without writing media queries.'),
  q('wd_css_6', 'Modern CSS', 'Medium',
    'What is the difference between `opacity: 0`, `visibility: hidden`, and `display: none`?',
    ['They are identical in all aspects', '`display: none` removes the element from document flow entirely; `visibility: hidden` hides content but preserves physical layout space; `opacity: 0` makes it transparent but preserves space and remains clickable', '`visibility: hidden` removes space from flow', '`opacity: 0` removes DOM nodes'], 1,
    '`display: none` detaches from the render tree (no space allocated). `visibility: hidden` hides rendering while preserving box layout space (unclickable). `opacity: 0` is visually transparent, retains space, and responds to click events.'),
  q('wd_css_7', 'Modern CSS', 'Medium',
    'What is a "BFC" (Block Formatting Context) and how can it be created?',
    ['A framework for CSS fonts', 'An isolated box formatting region where child elements layout independently without margins collapsing outside; created via `overflow: hidden`, `display: flow-root`, etc.', 'A 3D CSS transform context', 'A media query breakpoint'], 1,
    'A Block Formatting Context isolates internal layouts from the outside: it prevents margin collapsing between parent and children, contains internal floats, and stops elements from overlapping external floats.'),
  q('wd_css_8', 'Modern CSS', 'Medium',
    'What CSS properties trigger GPU hardware acceleration during animations?',
    ['`top`, `left`, `width`, and `height`', '`transform` (translate3d, scale) and `opacity`', '`color`, `background-color`, and `border-color`', '`margin-top` and `padding-left`'], 1,
    'Animating `transform` and `opacity` bypasses the browser\'s Layout (Reflow) and Paint phases, allowing the GPU to composite layers directly at 60+ FPS without jank.'),
  q('wd_css_9', 'Modern CSS', 'Hard',
    'How does CSS Specificity resolve when evaluating competing selectors?',
    ['The selector with the most characters wins', 'Evaluated by a 4-part specificity weight: Inline styles (1,0,0,0) > IDs (0,1,0,0) > Classes/Attributes/Pseudo-classes (0,0,1,0) > Elements/Pseudo-elements (0,0,0,1)', 'The rule written first in the file wins', 'Universal selector `*` overrides all classes'], 1,
    'Specificity is calculated in order of magnitude: Inline > IDs > Classes/Attributes/Pseudo-classes > Tag Elements. `!important` overrides normal specificity cascading.'),
  q('wd_css_10', 'Modern CSS', 'Hard',
    'What are CSS Container Queries (`@container`) and how do they differ from Media Queries (`@media`)?',
    ['Container queries only work in SVG containers', 'Media queries respond to the global browser viewport dimensions; Container queries respond to the specific width/height of a parent container element, enabling truly modular responsive components', 'Container queries style Docker containers', 'Container queries replace CSS Flexbox completely'], 1,
    'Container Queries allow a component to inspect the dimensions of its immediate parent container rather than the overall browser window, allowing a component to render as a card in a sidebar and as a horizontal banner in the main area seamlessly.'),

  // 3. JavaScript Core Concepts (Scope, Closures, Hoisting)
  q('wd_js_1', 'JavaScript Core Concepts', 'Easy',
    'What is the difference between `var`, `let`, and `const` regarding scope?',
    ['`var` is block-scoped; `let` and `const` are function-scoped', '`var` is function-scoped and hoisted with undefined; `let` and `const` are block-scoped and reside in the Temporal Dead Zone (TDZ) before declaration', '`const` can be reassigned freely', '`let` is global only'], 1,
    '`var` has function scope and hoists initialized to `undefined`. `let` and `const` are block-scoped (confined to `{}` blocks) and cannot be accessed before their declaration due to the Temporal Dead Zone.'),
  q('wd_js_2', 'JavaScript Core Concepts', 'Easy',
    'What is a "Closure" in JavaScript?',
    ['A function that closes the browser window', 'A function bundled together with references to its surrounding lexical environment, allowing inner functions to access outer variables even after the outer function has returned', 'A syntax error closing a curly brace', 'A method to terminate a while loop'], 1,
    'A closure gives an inner function access to its outer enclosing scope variables even after the outer function has executed and exited the call stack.'),
  q('wd_js_3', 'JavaScript Core Concepts', 'Easy',
    'What will `console.log(typeof NaN)` output in JavaScript?',
    ['"nan"', '"undefined"', '"number"', '"object"'], 2,
    '`NaN` stands for "Not-a-Number", but according to IEEE 754 floating-point specifications, its ECMAScript type is `"number"`.'),
  q('wd_js_4', 'JavaScript Core Concepts', 'Easy',
    'What is the difference between `==` (loose equality) and `===` (strict equality)?',
    ['`==` compares memory references; `===` compares values', '`==` performs type coercion before comparison; `===` checks both value and type without coercion', '`===` is slower than `==`', 'There is no difference in ES6'], 1,
    '`==` converts operands to a common type via abstract equality algorithms before comparison (e.g., `\'5\' == 5` is true). `===` checks both data type and value without coercion (`\'5\' === 5` is false).'),
  q('wd_js_5', 'JavaScript Core Concepts', 'Medium',
    'What is the output of `console.log(1 + "2" + 3);` and `console.log(3 - "1");`?',
    ['"123" and 2', '"6" and 2', '"15" and NaN', '6 and "31"'], 0,
    '`+` with a string coerces operands to strings: `1 + "2"` -> `"12"`, `"12" + 3` -> `"123"`. The `-` operator only works mathematically, coercing `"1"` to number 1: `3 - 1` -> `2`.'),
  q('wd_js_6', 'JavaScript Core Concepts', 'Medium',
    'How does JavaScript handle the `this` keyword inside standard functions versus arrow functions?',
    ['Arrow functions bind `this` to the DOM window always', 'Standard functions define `this` dynamically based on how the function is invoked; Arrow functions retain the lexical `this` of their enclosing lexical scope and cannot be rebound via `call/apply/bind`', 'Standard functions have no `this`', 'Arrow functions create a new `this` on every call'], 1,
    'Standard functions have dynamic `this` bound at call-time (call/apply/bind or object method invocation). Arrow functions lack their own `this` binding; they capture `this` lexically from the surrounding scope at declaration time.'),
  q('wd_js_7', 'JavaScript Core Concepts', 'Medium',
    'What is the Temporal Dead Zone (TDZ)?',
    ['A browser crash caused by infinite recursion', 'The time span between entering a scope and the variable\'s declaration with `let` or `const`, during which accessing the variable throws a ReferenceError', 'The delay before setTimeout runs', 'A memory leak period in V8 engine'], 1,
    'Variables declared with `let` or `const` exist in TDZ from the start of the block until the execution reaches their declaration line. Accessing them inside TDZ throws `ReferenceError`.'),
  q('wd_js_8', 'JavaScript Core Concepts', 'Medium',
    'What is the output of the following classic loop?\n`for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }`',
    ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined', '0, 0, 0'], 1,
    'Because `var` is function-scoped, a single shared `i` variable exists. By the time the event loop executes the macrotask callbacks, the loop has finished and `i` equals 3. Replacing `var` with `let` creates a new lexical binding per iteration (outputting 0, 1, 2).'),
  q('wd_js_9', 'JavaScript Core Concepts', 'Hard',
    'How does Prototypal Inheritance work in JavaScript through `__proto__` and `prototype`?',
    ['Objects inherit by copying all methods to their local memory', 'Every JavaScript object has an internal `[[Prototype]]` link; when property lookup fails on an object, the engine traverses up the prototype chain until found or reaching `null`', 'Prototypes are stored in HTML head tags', 'Inheritance only works with ES6 classes'], 1,
    'JavaScript uses prototype delegation: objects link to prototype objects. Accessing `obj.prop` searches `obj`, then `obj.__proto__`, then `obj.__proto__.__proto__`, continuing up the chain to `Object.prototype`, and finally `null`.'),
  q('wd_js_10', 'JavaScript Core Concepts', 'Hard',
    'What is the difference between shallow copy and deep copy, and what are the limitations of `JSON.parse(JSON.stringify(obj))` for deep cloning?',
    ['Shallow copy creates a new object; deep copy does not', 'Shallow copy duplicates top-level properties but copies references for nested objects; `JSON.parse(JSON.stringify())` fails to clone Functions, `undefined`, Symbols, Dates (converted to string), Maps/Sets, and throws on circular references', 'JSON cloning works on all JavaScript types flawlessly', 'Object.assign() creates a deep clone'], 1,
    '`JSON.parse(JSON.stringify(obj))` destroys non-JSON types (`undefined`, functions, symbols, BigInt) and crashes on circular graphs. Modern JavaScript provides `structuredClone()` for native deep cloning of complex objects.'),

  // 4. Asynchronous JS (Event Loop, Promises, Async/Await)
  q('wd_async_1', 'Asynchronous JS', 'Easy',
    'Is JavaScript single-threaded or multi-threaded in its main execution context?',
    ['Multi-threaded with 8 worker threads by default', 'Single-threaded: it has one call stack and executes one operation at a time on the main thread', 'Hardware dependent', 'Runs on multiple threads without locks'], 1,
    'JavaScript\'s runtime engine is fundamentally single-threaded with one call stack, delegating asynchronous I/O, timers, and network operations to browser Web APIs / Node C++ APIs.'),
  q('wd_async_2', 'Asynchronous JS', 'Easy',
    'What are the three possible states of a JavaScript Promise?',
    ['Starting, Running, Completed', 'Pending, Fulfilled (Resolved), and Rejected', 'Open, Processing, Closed', 'Active, Paused, Terminated'], 1,
    'A Promise is an object representing eventual completion or failure of an asynchronous operation, existing in one of 3 states: Pending, Fulfilled (with a value), or Rejected (with a reason).'),
  q('wd_async_3', 'Asynchronous JS', 'Easy',
    'What does the `async` keyword placed before a function declaration guarantee?',
    ['The function runs in a background Web Worker', 'The function automatically returns a Promise, wrapping non-promise return values in `Promise.resolve()`', 'The function executes synchronously without pausing', 'The function cannot throw errors'], 1,
    'An `async function` always returns a Promise. Any return value is implicitly wrapped in `Promise.resolve(val)`, and any uncaught throw is wrapped in `Promise.reject(err)`.'),
  q('wd_async_4', 'Asynchronous JS', 'Easy',
    'What method allows catching errors in a Promise chain?',
    ['.finally()', '.catch()', '.onError()', '.except()'], 1,
    'The `.catch()` method registers a rejection handler callback for when the Promise rejects or an error is thrown in preceding `.then()` steps.'),
  q('wd_async_5', 'Asynchronous JS', 'Medium',
    'In the JavaScript Event Loop, what is the execution priority between Microtasks and Macrotasks (Task Queue)?',
    ['Macrotasks always execute before microtasks', 'The entire Microtask queue (Promises, queueMicrotask, MutationObserver) is drained completely after the current task finishes and before the next Macrotask (setTimeout, setInterval, I/O) runs', 'They are interleaved one by one', 'Microtasks run only when the browser tab closes'], 1,
    'After each macrotask completes, the engine drains all jobs in the Microtask queue until empty before picking the next macrotask or rendering UI updates.'),
  q('wd_async_6', 'Asynchronous JS', 'Medium',
    'What will be the exact order of console outputs?\n`console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);`?',
    ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '4, 1, 3, 2'], 1,
    '1) Synchronous code runs: logs 1, registers setTimeout macrotask, registers Promise microtask, logs 4. 2) Call stack clears: drains microtasks -> logs 3. 3) Event loop picks next macrotask -> logs 2. Output: 1, 4, 3, 2.'),
  q('wd_async_7', 'Asynchronous JS', 'Medium',
    'What is the difference between `Promise.all()` and `Promise.allSettled()`?',
    ['They are identical in modern browsers', '`Promise.all` rejects immediately if any single promise rejects (short-circuit fail-fast); `Promise.allSettled` waits for all promises to settle regardless of rejection, returning an array of `{status, value/reason}` objects', '`Promise.allSettled` cannot handle rejections', '`Promise.all` ignores errors'], 1,
    '`Promise.all` fails fast on the first rejection. `Promise.allSettled` guarantees every input promise completes, providing a detailed status report for all operations.'),
  q('wd_async_8', 'Asynchronous JS', 'Medium',
    'What happens when using `await` inside an async function?',
    ['It freezes the entire operating system and browser window', 'It pauses execution of the async function in a non-blocking manner until the Promise settles, yielding control back to the event loop', 'It converts asynchronous code into multi-threaded assembly', 'It throws an exception if execution takes > 100 ms'], 1,
    '`await` suspends only the calling async function execution context while the event loop continues processing other UI events and tasks. When the awaited promise settles, the remainder of the async function resumes as a microtask.'),
  q('wd_async_9', 'Asynchronous JS', 'Hard',
    'What does `Promise.race()` do compared to `Promise.any()`?',
    ['`Promise.race` settles with the outcome (fulfillment or rejection) of the very first promise that settles; `Promise.any` waits for the first promise to fulfill (ignoring rejections until all reject)', 'They are identical', '`Promise.any` returns an array of all winners', '`Promise.race` runs only on multi-core CPUs'], 0,
    '`Promise.race` returns the outcome of the first settling promise (even if it rejects). `Promise.any` waits for the first successful (fulfilled) promise, rejecting only if all promises fail (with an `AggregateError`).'),
  q('wd_async_10', 'Asynchronous JS', 'Hard',
    'How can you prevent unhandled promise rejections in Node.js / modern browsers from crashing applications?',
    ['By running code in try/catch without await', 'By listening to the global `unhandledrejection` event on `window` (or `process.on("unhandledRejection")` in Node) and ensuring all promises have `.catch()` or are wrapped in try/catch with await', 'By disabling promises in package.json', 'By using only callbacks'], 1,
    'Unhandled promise rejections trigger the `window.addEventListener("unhandledrejection")` event in browsers and can terminate Node processes. Robust code uses global rejection hooks and local try/catch with `await`.'),

  // 5. DOM Manipulation & Browser Rendering Engine
  q('wd_dom_1', 'DOM Manipulation & Browser Rendering', 'Easy',
    'What is the DOM (Document Object Model)?',
    ['A JavaScript compiler', 'A programming interface for HTML and XML documents representing the page as a structured tree of nodes/objects that programs can manipulate', 'A CSS layout framework', 'A network socket for browsers'], 1,
    'The DOM is the object-oriented representation of the web page parsed into an in-memory tree hierarchy, enabling JavaScript to read and modify elements, attributes, and styles.'),
  q('wd_dom_2', 'DOM Manipulation & Browser Rendering', 'Easy',
    'Which method is the modern standard for selecting the first DOM element matching a CSS selector string?',
    ['document.getElementById()', 'document.querySelector()', 'document.getElementsByClassName()', 'document.find()'], 1,
    '`document.querySelector(\'.my-class > span\')` takes any valid CSS selector and returns the first matching element node (or null).'),
  q('wd_dom_3', 'DOM Manipulation & Browser Rendering', 'Easy',
    'What is the difference between Event Bubbling and Event Capturing (Trickling)?',
    ['Bubbling travels from root down to target; Capturing travels target up to root', 'Capturing travels from window down to the target element; Bubbling travels from the target element upwards to window', 'Bubbling only works with mouse clicks', 'Capturing requires jQuery'], 1,
    'When an event fires, it propagates through 3 phases: Capturing Phase (descending from Window down to target), Target Phase, and Bubbling Phase (ascending from target back up to Window).'),
  q('wd_dom_4', 'DOM Manipulation & Browser Rendering', 'Easy',
    'What does `event.stopPropagation()` do when called inside an event listener?',
    ['Cancels the browser default action (e.g., form submit)', 'Prevents the event from bubbling up or capturing further along the DOM hierarchy', 'Deletes the DOM element', 'Removes all other event listeners on the page'], 1,
    '`event.stopPropagation()` stops the event from traveling to ancestor (or descendant) nodes along the propagation chain, confining it to the current element.'),
  q('wd_dom_5', 'DOM Manipulation & Browser Rendering', 'Medium',
    'What is "Event Delegation" and why is it recommended for dynamic lists?',
    ['Attaching separate event listeners to every list item via loop', 'Attaching a single event listener to a common parent element and using `event.target` to handle clicks on current and dynamically added children, saving memory', 'Delegating DOM events to Web Workers', 'Using timeouts to delay event handling'], 1,
    'Event delegation exploits bubbling: a single listener on `<ul>` handles clicks on all existing and future `<li>` children by inspecting `event.target`, saving memory overhead over thousands of separate handlers.'),
  q('wd_dom_6', 'DOM Manipulation & Browser Rendering', 'Medium',
    'What is the difference between "Reflow" (Layout) and "Repaint" in browser rendering pipelines?',
    ['Repaint recalculates element geometry; Reflow changes colors', 'Reflow recalculates the physical position and geometry of elements (expensive); Repaint redraws pixels to screen when visual appearance changes without altering geometry (e.g. background-color)', 'They are the exact same pipeline step', 'Reflow only happens once on page load'], 1,
    'Reflow (Layout) determines size and position across the document tree. Repaint updates pixel colors. Reflow always triggers Repaint, making frequent Reflows the primary cause of browser UI lag.'),
  q('wd_dom_7', 'DOM Manipulation & Browser Rendering', 'Medium',
    'How does a `DocumentFragment` optimize batch DOM insertions in JavaScript?',
    ['By compiling HTML to WebAssembly', 'It acts as an in-memory virtual container for DOM nodes; inserting children into the fragment causes zero reflows, and appending the fragment to document triggers only a single reflow', 'It caches nodes in localStorage', 'It compresses images automatically'], 1,
    '`document.createDocumentFragment()` creates a lightweight off-screen container. You append hundreds of elements to it in memory, and then insert the fragment into the live DOM once, triggering a single layout recalculation.'),
  q('wd_dom_8', 'DOM Manipulation & Browser Rendering', 'Medium',
    'What is the difference between `element.innerHTML` and `element.textContent`?',
    ['`innerHTML` is faster than `textContent`', '`innerHTML` parses and renders HTML tags, exposing potential XSS vulnerabilities; `textContent` treats content strictly as raw text without HTML parsing and is safer and faster', '`textContent` evaluates `<script>` tags', '`innerHTML` cannot change text'], 1,
    '`innerHTML` invokes the browser HTML parser to build elements, exposing injection risks if unsanitized user data is assigned. `textContent` sets raw text without HTML parsing, preventing XSS and avoiding parser overhead.'),
  q('wd_dom_9', 'DOM Manipulation & Browser Rendering', 'Hard',
    'What is "Layout Thrashing" (Forced Synchronous Layout) and what causes it?',
    ['Rapidly resizing browser window', 'Interleaving DOM write operations with DOM read operations that query geometry (like `element.offsetWidth`), forcing the browser to recalculate layout synchronously in a tight loop', 'Deleting all CSS stylesheets in JavaScript', 'Running CSS animations without keyframes'], 1,
    'Browsers batch DOM writes lazily. If code modifies DOM (write) and immediately reads geometry like `offsetHeight` (read) in a loop, the browser is forced to flush layout synchronously on every step, degrading performance.'),
  q('wd_dom_10', 'DOM Manipulation & Browser Rendering', 'Hard',
    'What is the Critical Rendering Path (CRP) in modern web browsers?',
    ['The network path taken by fiber cables to data centers', 'The sequence of steps the browser takes from receiving HTML/CSS/JS to painting pixels on screen: HTML -> DOM + CSS -> CSSOM -> Render Tree -> Layout -> Paint', 'The path where JavaScript is compiled by V8', 'The URL routing table in the browser address bar'], 1,
    'CRP is the rendering sequence: 1) Parse HTML to DOM; 2) Parse CSS to CSSOM; 3) Combine into Render Tree; 4) Compute geometry in Layout (Reflow); 5) Paint pixels into layers; 6) Composite layers to screen.')
];

const gitQuestions = [
  // 15. GIT & VERSION CONTROL (10 topics * 10 = 100 questions)
  // 1. Git Architecture & Object Model
  q('git_arch_1', 'Git Architecture & Object Model', 'Easy',
    'What are the four fundamental object types stored inside the `.git/objects` directory?',
    ['File, Folder, Branch, Tag', 'Blob, Tree, Commit, and Annotated Tag', 'Head, Index, Remote, Config', 'Delta, Patch, Stash, Pack'], 1,
    'Git\'s object database stores 4 core primitives addressed by SHA-1/SHA-256 hashes: Blob (file contents), Tree (directory listing and filenames), Commit (metadata and root tree pointer), and Tag.'),
  q('git_arch_2', 'Git Architecture & Object Model', 'Easy',
    'What does a Git "Blob" object store?',
    ['File metadata, filename, and permissions', 'Pure file content/data without its filename, directory location, or metadata', 'The Git commit message', 'The commit author email'], 1,
    'A Git Blob (Binary Large Object) stores raw file data only. Filenames, directory hierarchies, and file permissions are stored separately in Tree objects.'),
  q('git_arch_3', 'Git Architecture & Object Model', 'Easy',
    'What does the `.git/HEAD` file contain?',
    ['The entire repository source code', 'A reference pointer to the currently checked-out branch or commit (e.g. `ref: refs/heads/main`)', 'The list of deleted files', 'The SSH public key'], 1,
    '`.git/HEAD` points to the branch currently checked out in the working directory (e.g., `ref: refs/heads/main`), or points directly to a commit hash in "detached HEAD" state.'),
  q('git_arch_4', 'Git Architecture & Object Model', 'Easy',
    'What are the Three Trees / Three States of Git?',
    ['Alpha, Beta, Production', 'Working Directory, Staging Area (Index), and Git Repository (.git history)', 'Local, Staging, Cloud', 'Master, Main, Origin'], 1,
    'The 3 states: 1) Working Directory (local files on disk), 2) Staging Area / Index (prepared snapshot in `.git/index`), and 3) Repository / Commit History (committed object database).'),
  q('git_arch_5', 'Git Architecture & Object Model', 'Medium',
    'How does Git uniquely identify objects and verify integrity?',
    ['Sequential integer IDs generated by an auto-increment counter', 'Cryptographic hashing (SHA-1 / SHA-256) of object type, size, and content, creating a content-addressable storage system (Merkle Tree)', 'File modification timestamps', 'Random UUID strings'], 1,
    'Git is a content-addressable filesystem: every object is addressed by the SHA hash of its content. If even 1 byte changes, its hash changes, forming an immutable Merkle Directed Acyclic Graph (DAG).'),
  q('git_arch_6', 'Git Architecture & Object Model', 'Medium',
    'What is a "Detached HEAD" state in Git?',
    ['A fatal error indicating repository corruption', 'A state where HEAD points directly to a specific commit hash rather than a named local branch reference', 'When the remote repository is unreachable', 'When a Git branch is renamed'], 1,
    'In detached HEAD state, HEAD points directly to a specific commit. Any new commits made in this state will not belong to any branch and risk being garbage collected once HEAD is switched away.'),
  q('git_arch_7', 'Git Architecture & Object Model', 'Medium',
    'What is the difference between a Lightweight Tag and an Annotated Tag in Git?',
    ['Lightweight tags can only be created on GitHub', 'A lightweight tag is simply a pointer/bookmark to a commit; an annotated tag is stored as a full Git object containing tagger name, email, date, and GPG signature', 'Annotated tags cannot be deleted', 'Lightweight tags cannot be pushed'], 1,
    'Lightweight tags (`git tag v1.0`) are mere pointers to commits. Annotated tags (`git tag -a v1.0 -m "release"`) create a standalone Git object with author, timestamp, message, and signature verification.'),
  q('git_arch_8', 'Git Architecture & Object Model', 'Medium',
    'What does `git gc` (Garbage Collection) do?',
    ['Deletes uncommitted changes in your working tree', 'Identifies and cleans up unreachable dangling objects, and packs loose objects into efficient compressed `.pack` files with delta compression', 'Removes node_modules folder', 'Deletes all closed branches'], 1,
    '`git gc` packs loose object files into packfiles, generates pack indexes, prunes unreachable/orphan commits older than expiry windows, and optimizes repository disk space.'),
  q('git_arch_9', 'Git Architecture & Object Model', 'Hard',
    'What is a "Packfile" and "Delta Compression" in Git?',
    ['A ZIP file generated for downloading code', 'A mechanism where Git stores full files and subsequent versions as compact byte-level diffs (deltas) against similar files packed into a single binary file (.pack)', 'A tarball for Docker', 'A technique for compressing Git commit messages'], 1,
    'To optimize disk space, Git runs pack generation: it groups similar blobs (revisions of the same file) and stores one full blob plus a series of directed delta diffs in a `.pack` file indexed by `.idx`.'),
  q('git_arch_10', 'Git Architecture & Object Model', 'Hard',
    'How does Git\'s Index (`.git/index`) enable staged commits without writing directly to tree objects until commit time?',
    ['It is an SQLite database storing JSON diffs', 'The Index is a binary file containing a sorted list of file paths, file permissions, timestamps, and corresponding blob SHA-1 hashes representing the proposed next commit state', 'It uploads files directly to GitHub cloud', 'It stores changes in RAM only'], 1,
    'The index is a binary cache mapping file paths to blob SHAs and stat cache info. When you `git add`, blobs are written to `.git/objects` and the index references them. `git commit` simply writes Tree objects directly from this pre-computed index.')
];

// Write webDevelopment.js
const webContent = `// js/data/interviewPrep/webDevelopment.js
// Complete Question Bank for Web Development (HTML5, CSS3, Core JS, Asynchronous JS, DOM)

window.interviewPrepWebDev = {
  id: 'web_development',
  title: 'Web Development & Frontend Engineering',
  icon: 'web',
  description: 'Master HTML5 semantics, modern CSS (Flexbox/Grid), JavaScript core, Event Loop, Promises, and DOM manipulation.',
  totalQuestions: ${webQuestions.length},
  topics: [
    'HTML5 Semantics & Web Standards',
    'Modern CSS',
    'JavaScript Core Concepts',
    'Asynchronous JS',
    'DOM Manipulation & Browser Rendering'
  ],
  questions: ${JSON.stringify(webQuestions, null, 2)}
};
`;
fs.writeFileSync(path.join(outDir, 'webDevelopment.js'), webContent);
console.log(`Successfully generated webDevelopment.js (${webQuestions.length} questions)`);

// Write git.js
const gitContent = `// js/data/interviewPrep/git.js
// Complete Question Bank for Git & Version Control Systems

window.interviewPrepGit = {
  id: 'git_version_control',
  title: 'Git & Version Control',
  icon: 'source_environment',
  description: 'Master Git internal architecture, branching, merging vs rebasing, conflict resolution, stashing, and collaborative workflows.',
  totalQuestions: ${gitQuestions.length},
  topics: [
    'Git Architecture & Object Model'
  ],
  questions: ${JSON.stringify(gitQuestions, null, 2)}
};
`;
fs.writeFileSync(path.join(outDir, 'git.js'), gitContent);
console.log(`Successfully generated git.js (${gitQuestions.length} questions)`);
