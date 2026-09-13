/**
 * DevPilot-AI — SQL (Structured Query Language) Question Bank
 * 150 authentic placement/interview MCQs across 15 topics.
 */

(function () {
  'use strict';

  const sqlData = {
    category: "sql",
    title: "SQL (Structured Query Language)",
    description: "Query writing, joins, subqueries, CTEs, window functions, indexing, optimization, and PostgreSQL standard operations.",
    icon: "storage",
    totalTopics: 15,
    topics: [
  "SELECT",
  "WHERE",
  "ORDER BY",
  "GROUP BY",
  "HAVING",
  "Aggregate Functions",
  "JOINs",
  "Subqueries",
  "CTEs",
  "Window Functions",
  "CASE",
  "INSERT / UPDATE / DELETE",
  "Constraints",
  "Indexes",
  "Transactions"
],
    questions: [
  {
    "id": "sql-sel-01",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "easy",
    "question": "Given: employees(id, name, department, salary)\nWhich query selects unique department names from the employees table?",
    "options": [
      "SELECT DISTINCT department FROM employees;",
      "SELECT UNIQUE department FROM employees;",
      "SELECT DIFFERENT department FROM employees;",
      "SELECT department FROM employees GROUP ALL;"
    ],
    "correctAnswer": 0,
    "explanation": "SELECT DISTINCT removes duplicate rows from the result set."
  },
  {
    "id": "sql-sel-02",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "easy",
    "question": "Given: products(id, title, price)\nWhich SQL query displays the title renamed as 'product_name' and price with 18% tax added as 'total_price'?",
    "options": [
      "SELECT title AS product_name, price * 1.18 AS total_price FROM products;",
      "SELECT title TO product_name, price * 1.18 TO total_price FROM products;",
      "SELECT product_name = title, total_price = price * 1.18 FROM products;",
      "SELECT title (product_name), price * 1.18 (total_price) FROM products;"
    ],
    "correctAnswer": 0,
    "explanation": "The AS keyword provides column aliasing and expression projection."
  },
  {
    "id": "sql-sel-03",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "easy",
    "question": "What is the standard SQL syntax to retrieve only the first 5 records from a PostgreSQL table 'logs'?",
    "options": [
      "SELECT * FROM logs LIMIT 5;",
      "SELECT TOP 5 * FROM logs;",
      "SELECT * FROM logs FETCH FIRST ROW;",
      "SELECT FIRST 5 * FROM logs;"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL, MySQL, and SQLite use LIMIT N at the end of the query (SQL Server uses SELECT TOP N)."
  },
  {
    "id": "sql-sel-04",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "easy",
    "question": "What does 'SELECT NULL = NULL;' evaluate to in standard three-valued SQL logic?",
    "options": [
      "NULL (Unknown)",
      "TRUE",
      "FALSE",
      "Syntax Error"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL three-valued logic, comparisons with NULL evaluate to NULL/Unknown; 'IS NULL' must be used instead."
  },
  {
    "id": "sql-sel-05",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "medium",
    "question": "Given: students(id, first_name, last_name)\nWhich PostgreSQL query concatenates first and last name separated by a space?",
    "options": [
      "SELECT first_name || ' ' || last_name AS full_name FROM students;",
      "SELECT CONCAT_PLUS(first_name, last_name) FROM students;",
      "SELECT first_name + ' ' + last_name FROM students;",
      "SELECT first_name & ' ' & last_name FROM students;"
    ],
    "correctAnswer": 0,
    "explanation": "The standard SQL and PostgreSQL string concatenation operator is '||' (or CONCAT() function)."
  },
  {
    "id": "sql-sel-06",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "medium",
    "question": "Given: employees(id, name, commission_pct)\nWhich query returns 0.0 if commission_pct is NULL, otherwise returns commission_pct?",
    "options": [
      "SELECT COALESCE(commission_pct, 0.0) FROM employees;",
      "SELECT NULLIF(commission_pct, 0.0) FROM employees;",
      "SELECT IFNULL_ZERO(commission_pct) FROM employees;",
      "SELECT ISNULL(commission_pct) FROM employees;"
    ],
    "correctAnswer": 0,
    "explanation": "COALESCE(val1, val2, ...) returns the first non-null argument in the list."
  },
  {
    "id": "sql-sel-07",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "medium",
    "question": "What does 'SELECT NULLIF(salary, 0) FROM employees;' return when salary is 0?",
    "options": [
      "NULL",
      "0",
      "True",
      "An exception"
    ],
    "correctAnswer": 0,
    "explanation": "NULLIF(a, b) returns NULL if a = b; otherwise it returns a (frequently used to prevent division-by-zero)."
  },
  {
    "id": "sql-sel-08",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "medium",
    "question": "In PostgreSQL, what does 'SELECT * FROM users OFFSET 20 LIMIT 10;' accomplish?",
    "options": [
      "Skips the first 20 records and returns the subsequent 10 records (page 3 of pagination)",
      "Returns 20 records starting from row 10",
      "Limits query execution to 20 milliseconds",
      "Returns rows with ID between 10 and 20"
    ],
    "correctAnswer": 0,
    "explanation": "OFFSET skips rows and LIMIT restricts the result set size for pagination."
  },
  {
    "id": "sql-sel-09",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "hard",
    "question": "What is the result of 'SELECT COUNT(*), COUNT(bonus) FROM staff;' if staff has 10 rows and 3 have NULL bonus?",
    "options": [
      "COUNT(*) = 10, COUNT(bonus) = 7",
      "COUNT(*) = 10, COUNT(bonus) = 10",
      "COUNT(*) = 7, COUNT(bonus) = 7",
      "COUNT(*) = 10, COUNT(bonus) = 3"
    ],
    "correctAnswer": 0,
    "explanation": "COUNT(*) counts all rows; COUNT(column_name) counts only rows where column_name IS NOT NULL."
  },
  {
    "id": "sql-sel-10",
    "category": "sql",
    "topic": "SELECT",
    "difficulty": "hard",
    "question": "In PostgreSQL, what does 'SELECT DISTINCT ON (department_id) id, name, salary FROM employees ORDER BY department_id, salary DESC;' return?",
    "options": [
      "The single employee with the highest salary for each distinct department",
      "An error because DISTINCT cannot have ON",
      "All employees sorted by department",
      "The average salary per department"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL's DISTINCT ON (expr) retains only the first row of each group based on the specified ORDER BY."
  },
  {
    "id": "sql-whr-01",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "easy",
    "question": "Given: employees(id, name, salary)\nWhich query correctly finds all employees earning between $50,000 and $80,000 inclusive?",
    "options": [
      "SELECT * FROM employees WHERE salary BETWEEN 50000 AND 80000;",
      "SELECT * FROM employees WHERE salary IN (50000, 80000);",
      "SELECT * FROM employees WHERE salary >= 50000 OR salary <= 80000;",
      "SELECT * FROM employees WHERE salary WITHIN (50000, 80000);"
    ],
    "correctAnswer": 0,
    "explanation": "The BETWEEN operator is inclusive of both endpoints (equivalent to salary >= 50000 AND salary <= 80000)."
  },
  {
    "id": "sql-whr-02",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "easy",
    "question": "Given: customers(id, name, email)\nWhich query finds customers whose email address is not recorded (contains NULL)?",
    "options": [
      "SELECT * FROM customers WHERE email IS NULL;",
      "SELECT * FROM customers WHERE email = NULL;",
      "SELECT * FROM customers WHERE email == NULL;",
      "SELECT * FROM customers WHERE email IS EMPTY;"
    ],
    "correctAnswer": 0,
    "explanation": "NULL cannot be checked with '=' because NULL = NULL is unknown; 'IS NULL' is required."
  },
  {
    "id": "sql-whr-03",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "easy",
    "question": "Given: products(id, title)\nWhich query finds all products whose title starts with the letter 'P'?",
    "options": [
      "SELECT * FROM products WHERE title LIKE 'P%';",
      "SELECT * FROM products WHERE title LIKE '%P';",
      "SELECT * FROM products WHERE title LIKE '_P%';",
      "SELECT * FROM products WHERE title = 'P*';"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL LIKE patterns, '%' matches zero or more characters; 'P%' matches anything beginning with 'P'."
  },
  {
    "id": "sql-whr-04",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "easy",
    "question": "Given: students(id, name, grade)\nWhich query returns students with grade 'A', 'B', or 'C'?",
    "options": [
      "SELECT * FROM students WHERE grade IN ('A', 'B', 'C');",
      "SELECT * FROM students WHERE grade = 'A' AND grade = 'B';",
      "SELECT * FROM students WHERE grade BETWEEN 'A' OR 'C';",
      "SELECT * FROM students WHERE grade MATCH ('A', 'B', 'C');"
    ],
    "correctAnswer": 0,
    "explanation": "The IN operator checks whether a value matches any item in a comma-separated literal list."
  },
  {
    "id": "sql-whr-05",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "medium",
    "question": "What does the wildcard underscore (_) represent in an SQL LIKE clause?",
    "options": [
      "Exactly one single character",
      "Zero or more characters",
      "Any numeric digit",
      "An optional space"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL LIKE pattern matching, '_' represents a wildcard matching exactly one single character."
  },
  {
    "id": "sql-whr-06",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "medium",
    "question": "In PostgreSQL, which operator performs case-insensitive regex pattern matching?",
    "options": [
      "~*",
      "~",
      "LIKE",
      "=="
    ],
    "correctAnswer": 0,
    "explanation": "In PostgreSQL, '~' matches regex case-sensitively; '~*' matches regex case-insensitively (ILIKE for simple patterns)."
  },
  {
    "id": "sql-whr-07",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "medium",
    "question": "Given: staff(id, name, dept_id, status)\nWhat does the query return?\nSELECT * FROM staff WHERE dept_id = 5 OR status = 'Active' AND dept_id = 3;",
    "options": [
      "All staff in dept 5, PLUS staff who are Active and in dept 3 (because AND has higher precedence than OR)",
      "Staff who are in dept 5 or Active, and also in dept 3",
      "Only staff in dept 3",
      "A syntax error"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL operator precedence, AND takes precedence over OR: evaluated as (dept_id = 5) OR (status = 'Active' AND dept_id = 3)."
  },
  {
    "id": "sql-whr-08",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "medium",
    "question": "How can you escape a literal percent sign '%' in an SQL LIKE query searching for '20% off'?",
    "options": [
      "WHERE description LIKE '%20\\% off%' ESCAPE '\\';",
      "WHERE description LIKE '%20%% off%';",
      "WHERE description = '20% off';",
      "WHERE description CONTAINS '20%'"
    ],
    "correctAnswer": 0,
    "explanation": "The ESCAPE clause defines an escape character (typically '\\') to treat '%' as a literal character."
  },
  {
    "id": "sql-whr-09",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "hard",
    "question": "Given: employees(id, salary)\nWhy does 'WHERE salary = NULL' return zero rows even if there are rows with NULL salary?",
    "options": [
      "Because comparisons with NULL evaluate to UNKNOWN, and WHERE clauses filter out rows that do not evaluate to TRUE",
      "Because NULL is converted to 0",
      "Because salary is an integer",
      "Because WHERE cannot filter NULLs"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE requires a boolean TRUE; UNKNOWN evaluates to falsey for filtering purposes."
  },
  {
    "id": "sql-whr-10",
    "category": "sql",
    "topic": "WHERE",
    "difficulty": "hard",
    "question": "What is the difference between 'WHERE NOT (age > 18)' and 'WHERE age <= 18' when age contains NULL values?",
    "options": [
      "Both evaluate to UNKNOWN for NULL values and exclude them, producing identical results",
      "'WHERE NOT' includes NULL values",
      "'WHERE age <= 18' includes NULL values",
      "One throws an exception"
    ],
    "correctAnswer": 0,
    "explanation": "Both evaluate to UNKNOWN when age is NULL and are filtered out by the WHERE clause."
  },
  {
    "id": "sql-ord-01",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "easy",
    "question": "What is the default sort direction in an SQL ORDER BY clause if neither ASC nor DESC is specified?",
    "options": [
      "ASC (Ascending)",
      "DESC (Descending)",
      "Random order",
      "Primary key order"
    ],
    "correctAnswer": 0,
    "explanation": "ORDER BY defaults to ASC (ascending order, from smallest to largest)."
  },
  {
    "id": "sql-ord-02",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "easy",
    "question": "Given: employees(id, name, department_id, salary)\nWhich query sorts employees by department_id ascending, and within each department by salary descending?",
    "options": [
      "SELECT * FROM employees ORDER BY department_id ASC, salary DESC;",
      "SELECT * FROM employees ORDER BY department_id, salary;",
      "SELECT * FROM employees SORT BY department_id ASC, salary DESC;",
      "SELECT * FROM employees ORDER BY department_id AND salary DESC;"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple columns are separated by commas; each column can have its own sort direction specifier."
  },
  {
    "id": "sql-ord-03",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "easy",
    "question": "In PostgreSQL, how can you control whether NULL values appear at the beginning or end of a sorted result set?",
    "options": [
      "Using 'ORDER BY column_name NULLS FIRST' or 'NULLS LAST'",
      "Using 'ORDER BY NULL(column_name)'",
      "Using 'SORT NULLS TOP'",
      "NULLs cannot be controlled"
    ],
    "correctAnswer": 0,
    "explanation": "SQL standard and PostgreSQL support explicit 'NULLS FIRST' and 'NULLS LAST' directives."
  },
  {
    "id": "sql-ord-04",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "easy",
    "question": "What does 'ORDER BY 2 DESC;' mean in an SQL query: SELECT id, salary, name FROM employees ORDER BY 2 DESC;?",
    "options": [
      "Sorts the output by the second column in the SELECT list (salary) in descending order",
      "Sorts by the number 2",
      "Divides salary by 2",
      "Returns only 2 rows"
    ],
    "correctAnswer": 0,
    "explanation": "Positional ordering references the ordinal position of columns in the SELECT clause (position 2 is salary)."
  },
  {
    "id": "sql-ord-05",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "medium",
    "question": "By default in PostgreSQL ASC sorting, where are NULL values placed?",
    "options": [
      "At the very end (NULLS LAST)",
      "At the very beginning (NULLS FIRST)",
      "Randomly distributed",
      "Filtered out automatically"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL defaults ASC sorting to NULLS LAST (and DESC sorting to NULLS FIRST)."
  },
  {
    "id": "sql-ord-06",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "medium",
    "question": "Can you sort query results by a calculated expression that is NOT in the SELECT list?",
    "options": [
      "Yes (e.g. SELECT name FROM employees ORDER BY salary * bonus_pct DESC;)",
      "No, sorted columns must strictly appear in SELECT",
      "Only if using GROUP BY",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "Standard SQL permits ORDER BY on any valid table expression or column, even if unprojected in SELECT."
  },
  {
    "id": "sql-ord-07",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "medium",
    "question": "How can you achieve custom sorting (e.g. status order 'Critical', 'High', 'Medium', 'Low') in standard SQL?",
    "options": [
      "Using a CASE expression in ORDER BY: ORDER BY CASE status WHEN 'Critical' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 ELSE 4 END",
      "Using ORDER BY status CUSTOM ('Critical', 'High', 'Medium', 'Low')",
      "Using ORDER BY status DESC",
      "Using a GROUP BY clause"
    ],
    "correctAnswer": 0,
    "explanation": "A CASE statement in the ORDER BY clause maps categorical values to integer priorities for custom sorting."
  },
  {
    "id": "sql-ord-08",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "medium",
    "question": "Why is relying on table insertion order without an explicit ORDER BY considered dangerous in SQL?",
    "options": [
      "Relational tables are unordered sets; without an explicit ORDER BY, the engine provides zero guarantee of deterministic row sequence",
      "The database reverses row order every night",
      "Insertion order is always deleted after 100 rows",
      "It causes an index corruption"
    ],
    "correctAnswer": 0,
    "explanation": "Relational theory treats tables as unordered multisets; row order is only guaranteed with an explicit ORDER BY."
  },
  {
    "id": "sql-ord-09",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "hard",
    "question": "How does the presence of an ORDER BY clause affect query execution performance on large unindexed tables?",
    "options": [
      "Forces an in-memory or external disk merge sort (Sort node in execution plan), incurring high CPU and temporary disk I/O",
      "Speeds up execution by 50%",
      "Eliminates all table locks",
      "Has zero impact on performance"
    ],
    "correctAnswer": 0,
    "explanation": "Without a matching B-Tree index providing pre-sorted order, the database must buffer and sort rows in work_mem or disk."
  },
  {
    "id": "sql-ord-10",
    "category": "sql",
    "topic": "ORDER BY",
    "difficulty": "hard",
    "question": "In PostgreSQL, how do you sort strings according to a specific language collation (e.g. German)?",
    "options": [
      "ORDER BY name COLLATE \"de_DE\"",
      "ORDER BY LANGUAGE 'German'(name)",
      "SET LANGUAGE German; ORDER BY name;",
      "ORDER BY GERMAN(name)"
    ],
    "correctAnswer": 0,
    "explanation": "The COLLATE clause specifies linguistic collation rules for alphabetical string comparison and sorting."
  },
  {
    "id": "sql-grp-01",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "easy",
    "question": "Given: employees(id, name, department_id, salary)\nWhich query counts the number of employees in each department?",
    "options": [
      "SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;",
      "SELECT department_id, COUNT(*) FROM employees;",
      "SELECT department_id, SUM(id) FROM employees GROUP BY department_id;",
      "SELECT department_id FROM employees GROUP ALL;"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY partitions rows into summary groups based on department_id, and COUNT(*) aggregates each partition."
  },
  {
    "id": "sql-grp-02",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "easy",
    "question": "What rule governs columns listed in the SELECT clause when a GROUP BY clause is present?",
    "options": [
      "Every column in the SELECT clause must either be an aggregated expression or appear in the GROUP BY clause",
      "All columns in the table must be listed",
      "No numbers can be selected",
      "Columns must be sorted alphabetically"
    ],
    "correctAnswer": 0,
    "explanation": "Non-aggregated columns must be part of the GROUP BY grouping key to prevent ambiguous multi-row value selection."
  },
  {
    "id": "sql-grp-03",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "easy",
    "question": "Given: sales(id, region, product, amount)\nWhich query finds total revenue per region and product combination?",
    "options": [
      "SELECT region, product, SUM(amount) FROM sales GROUP BY region, product;",
      "SELECT region, product, TOTAL(amount) FROM sales GROUP BY region;",
      "SELECT region, product, SUM(amount) FROM sales;",
      "SELECT region + product, SUM(amount) FROM sales;"
    ],
    "correctAnswer": 0,
    "explanation": "Grouping by multiple columns produces composite groups for each unique (region, product) pair."
  },
  {
    "id": "sql-grp-04",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "easy",
    "question": "What happens to NULL values in columns specified in a GROUP BY clause?",
    "options": [
      "All NULL values are grouped together into a single summary group",
      "NULL values are excluded from the output",
      "Each NULL becomes its own separate group",
      "A runtime error is thrown"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL GROUP BY, all NULLs are treated as identical and collected into a single group."
  },
  {
    "id": "sql-grp-05",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "medium",
    "question": "Given: orders(customer_id, order_date, total)\nWhich query finds the date of the first order placed by each customer?",
    "options": [
      "SELECT customer_id, MIN(order_date) FROM orders GROUP BY customer_id;",
      "SELECT customer_id, FIRST(order_date) FROM orders GROUP BY customer_id;",
      "SELECT customer_id, order_date FROM orders WHERE order_date = MIN(order_date);",
      "SELECT customer_id, START(order_date) FROM orders;"
    ],
    "correctAnswer": 0,
    "explanation": "MIN(order_date) combined with GROUP BY customer_id computes the earliest order timestamp per customer."
  },
  {
    "id": "sql-grp-06",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "medium",
    "question": "What is the logical order of query execution for: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY?",
    "options": [
      "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
      "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
      "FROM -> GROUP BY -> WHERE -> HAVING -> SELECT -> ORDER BY",
      "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> ORDER BY"
    ],
    "correctAnswer": 0,
    "explanation": "Tables are retrieved (FROM), filtered (WHERE), grouped (GROUP BY), group-filtered (HAVING), projected (SELECT), and sorted (ORDER BY)."
  },
  {
    "id": "sql-grp-07",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "medium",
    "question": "What is the difference between WHERE and GROUP BY filters?",
    "options": [
      "WHERE filters individual rows BEFORE grouping; GROUP BY aggregates the surviving rows into groups",
      "WHERE operates on groups; GROUP BY operates on rows",
      "They are identical filters",
      "WHERE can only be used on primary keys"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE eliminates raw tuples prior to aggregation; HAVING filters groups after aggregation."
  },
  {
    "id": "sql-grp-08",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "hard",
    "question": "In PostgreSQL, what does the 'GROUP BY ROLLUP (year, quarter, month)' extension generate?",
    "options": [
      "Hierarchical subtotal aggregations: (year, quarter, month), (year, quarter), (year), and a grand total ()",
      "A rolling average across months",
      "A pie chart summary",
      "Deletes redundant rows"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP generates progressive hierarchical subtotals suitable for financial OLAP reporting."
  },
  {
    "id": "sql-grp-09",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "hard",
    "question": "What does 'GROUP BY CUBE (region, product)' generate?",
    "options": [
      "All 2^N possible multidimensional grouping combinations of region and product (including cross-tab subtotals and grand total)",
      "A 3D graphical database cube",
      "Cubes the numeric values in each row",
      "Partitions data into exactly 3 chunks"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE computes aggregate subtotals across all permutations of the grouping columns."
  },
  {
    "id": "sql-grp-10",
    "category": "sql",
    "topic": "GROUP BY",
    "difficulty": "hard",
    "question": "What does 'GROUP BY GROUPING SETS ((department_id), (job_title))' accomplish?",
    "options": [
      "Computes aggregations for department_id separately and job_title separately in a single query pass without a full Cartesian CUBE",
      "Groups departments into sets of 10",
      "A syntax error in SQL",
      "Orders tables into sets"
    ],
    "correctAnswer": 0,
    "explanation": "GROUPING SETS allows selective multi-group aggregations without computing unwanted cross-products."
  },
  {
    "id": "sql-hav-01",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "easy",
    "question": "What is the primary difference between the WHERE clause and the HAVING clause in SQL?",
    "options": [
      "WHERE filters individual rows before aggregation; HAVING filters aggregated groups after GROUP BY",
      "WHERE is used for numbers; HAVING is used for strings",
      "HAVING is faster than WHERE",
      "There is no functional difference"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING operates on aggregated group summaries (e.g. HAVING COUNT(*) > 5), which WHERE cannot do."
  },
  {
    "id": "sql-hav-02",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "easy",
    "question": "Given: employees(id, name, department_id, salary)\nWhich query finds departments with more than 5 employees?",
    "options": [
      "SELECT department_id, COUNT(*) FROM employees GROUP BY department_id HAVING COUNT(*) > 5;",
      "SELECT department_id, COUNT(*) FROM employees WHERE COUNT(*) > 5 GROUP BY department_id;",
      "SELECT department_id FROM employees HAVING COUNT(*) > 5;",
      "SELECT department_id FROM employees WHERE employees > 5;"
    ],
    "correctAnswer": 0,
    "explanation": "Filtering on an aggregate like COUNT(*) requires the HAVING clause placed after GROUP BY."
  },
  {
    "id": "sql-hav-03",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "easy",
    "question": "Can a query use BOTH a WHERE clause and a HAVING clause simultaneously?",
    "options": [
      "Yes, WHERE filters raw rows first, then GROUP BY groups them, and HAVING filters the resulting groups",
      "No, SQL syntax permits only one filter clause per query",
      "Only if subqueries are used",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE and HAVING complement each other at different phases of query execution."
  },
  {
    "id": "sql-hav-04",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "easy",
    "question": "Given: sales(id, sales_rep, amount)\nWhich query finds sales reps whose total sales exceed $100,000?",
    "options": [
      "SELECT sales_rep, SUM(amount) FROM sales GROUP BY sales_rep HAVING SUM(amount) > 100000;",
      "SELECT sales_rep, SUM(amount) FROM sales WHERE SUM(amount) > 100000 GROUP BY sales_rep;",
      "SELECT sales_rep FROM sales HAVING amount > 100000;",
      "SELECT sales_rep, TOTAL(amount) > 100000 FROM sales;"
    ],
    "correctAnswer": 0,
    "explanation": "Aggregate filtering on SUM(amount) must reside in the HAVING clause."
  },
  {
    "id": "sql-hav-05",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "medium",
    "question": "Why will this query cause an error?\nSELECT department_id, AVG(salary) FROM employees WHERE AVG(salary) > 50000 GROUP BY department_id;",
    "options": [
      "Aggregate functions like AVG() cannot appear in the WHERE clause; it must be written as HAVING AVG(salary) > 50000",
      "AVG is not a valid SQL function",
      "department_id cannot be selected",
      "salary cannot be averaged"
    ],
    "correctAnswer": 0,
    "explanation": "The WHERE clause filters individual rows before groups or aggregate values are computed."
  },
  {
    "id": "sql-hav-06",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "medium",
    "question": "Can the HAVING clause be used without a GROUP BY clause in SQL?",
    "options": [
      "Yes, the entire table is treated as a single implicit group (e.g. SELECT AVG(salary) FROM emp HAVING AVG(salary) > 50000;)",
      "No, HAVING strictly requires an explicit GROUP BY",
      "Only if ORDER BY is present",
      "Only in SQLite"
    ],
    "correctAnswer": 0,
    "explanation": "Without GROUP BY, HAVING treats the entire table as one aggregate group and returns 0 or 1 row."
  },
  {
    "id": "sql-hav-07",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "medium",
    "question": "Given: orders(order_id, customer_id, order_date, status, total)\nWhich query finds customers who placed at least 3 completed orders in 2023?",
    "options": [
      "SELECT customer_id, COUNT(*) FROM orders WHERE status = 'Completed' AND order_date >= '2023-01-01' AND order_date < '2024-01-01' GROUP BY customer_id HAVING COUNT(*) >= 3;",
      "SELECT customer_id FROM orders HAVING status = 'Completed' AND COUNT(*) >= 3;",
      "SELECT customer_id, COUNT(*) FROM orders WHERE COUNT(*) >= 3 GROUP BY customer_id;",
      "SELECT customer_id FROM orders WHERE date = 2023 GROUP BY customer_id HAVING 3;"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE filters the year and completed status; HAVING filters customer groups with COUNT >= 3."
  },
  {
    "id": "sql-hav-08",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "medium",
    "question": "Can you reference a column in the HAVING clause that is NOT listed in the SELECT list?",
    "options": [
      "Yes, as long as it is an aggregate function or listed in the GROUP BY clause",
      "No, every column in HAVING must appear in SELECT",
      "Only in Oracle",
      "Only if it is a primary key"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING can evaluate aggregate expressions regardless of whether they are projected in the final SELECT list."
  },
  {
    "id": "sql-hav-09",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "hard",
    "question": "What is the performance drawback of writing non-aggregate filters in HAVING instead of WHERE (e.g. HAVING department_id = 10)?",
    "options": [
      "Rows that could have been discarded early by index scans in WHERE are unnecessarily processed and grouped before being discarded in HAVING",
      "HAVING crashes the server on non-aggregates",
      "It produces incorrect mathematical results",
      "There is zero performance difference"
    ],
    "correctAnswer": 0,
    "explanation": "Filtering in WHERE reduces row volume prior to expensive grouping and sorting operations."
  },
  {
    "id": "sql-hav-10",
    "category": "sql",
    "topic": "HAVING",
    "difficulty": "hard",
    "question": "Which query correctly finds products that have been ordered by more than 10 distinct customers?",
    "options": [
      "SELECT product_id, COUNT(DISTINCT customer_id) FROM order_items GROUP BY product_id HAVING COUNT(DISTINCT customer_id) > 10;",
      "SELECT product_id FROM order_items WHERE DISTINCT customer_id > 10 GROUP BY product_id;",
      "SELECT product_id, UNIQUE(customer_id) FROM order_items GROUP BY product_id HAVING COUNT > 10;",
      "SELECT product_id FROM order_items HAVING customer_id > 10;"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING COUNT(DISTINCT customer_id) > 10 counts unique customers per product."
  },
  {
    "id": "sql-agg-01",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "easy",
    "question": "What are the five standard ANSI SQL aggregate functions?",
    "options": [
      "COUNT, SUM, AVG, MIN, MAX",
      "TOTAL, MEAN, FIRST, LAST, COUNT",
      "ADD, SUBTRACT, MULTIPLY, DIVIDE, MOD",
      "SELECT, INSERT, UPDATE, DELETE, DROP"
    ],
    "correctAnswer": 0,
    "explanation": "The five core ANSI SQL aggregates are COUNT, SUM, AVG, MIN, and MAX."
  },
  {
    "id": "sql-agg-02",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "easy",
    "question": "How do aggregate functions (like SUM, AVG, MIN, MAX) handle NULL values in a column?",
    "options": [
      "They automatically ignore/skip NULL values in their computation",
      "They treat NULL as 0",
      "They return NULL immediately for the entire calculation",
      "They throw an exception"
    ],
    "correctAnswer": 0,
    "explanation": "Aggregate functions ignore NULL values (except COUNT(*), which counts all rows)."
  },
  {
    "id": "sql-agg-03",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "easy",
    "question": "What is the result of 'SELECT AVG(score) FROM tests;' if scores are 10, 20, and NULL?",
    "options": [
      "15 (because (10 + 20) / 2 = 15)",
      "10 (because (10 + 20 + 0) / 3 = 10)",
      "NULL",
      "30"
    ],
    "correctAnswer": 0,
    "explanation": "AVG ignores NULL in both numerator and denominator: (10 + 20) / 2 = 15."
  },
  {
    "id": "sql-agg-04",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "easy",
    "question": "What is the result of 'SELECT SUM(amount) FROM transactions WHERE 1 = 0;' on an empty result set?",
    "options": [
      "NULL",
      "0",
      "An error",
      "Undefined"
    ],
    "correctAnswer": 0,
    "explanation": "SUM on an empty set yields NULL; use COALESCE(SUM(amount), 0) if 0 is required."
  },
  {
    "id": "sql-agg-05",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "medium",
    "question": "How can you compute the number of unique cities from a 'customers' table?",
    "options": [
      "SELECT COUNT(DISTINCT city) FROM customers;",
      "SELECT DISTINCT COUNT(city) FROM customers;",
      "SELECT UNIQUE COUNT(city) FROM customers;",
      "SELECT COUNT(UNIQUE city) FROM customers;"
    ],
    "correctAnswer": 0,
    "explanation": "COUNT(DISTINCT column) tallies only unique, non-null values."
  },
  {
    "id": "sql-agg-06",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "medium",
    "question": "What does the STRING_AGG(name, ', ') function do in PostgreSQL (equivalent to GROUP_CONCAT in MySQL)?",
    "options": [
      "Concatenates string values from a group into a single string separated by the specified delimiter",
      "Counts string characters",
      "Splits strings into rows",
      "Encrypts strings"
    ],
    "correctAnswer": 0,
    "explanation": "STRING_AGG (or GROUP_CONCAT) collapses multiple string rows in a group into a delimited list."
  },
  {
    "id": "sql-agg-07",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "medium",
    "question": "What is the difference between COUNT(1) and COUNT(*) in modern query optimizers?",
    "options": [
      "Zero functional or performance difference; both instruct the optimizer to count the number of rows",
      "COUNT(1) is 10 times faster",
      "COUNT(*) only counts columns with stars",
      "COUNT(1) ignores null rows"
    ],
    "correctAnswer": 0,
    "explanation": "Modern SQL optimizers recognize COUNT(1) and COUNT(*) as identical row count operations."
  },
  {
    "id": "sql-agg-08",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "medium",
    "question": "In PostgreSQL, how do you compute the population standard deviation of a column 'response_time'?",
    "options": [
      "SELECT STDDEV_POP(response_time) FROM metrics;",
      "SELECT STDEV(response_time) FROM metrics;",
      "SELECT DEV(response_time) FROM metrics;",
      "SELECT VARIANCE_SQRT(response_time) FROM metrics;"
    ],
    "correctAnswer": 0,
    "explanation": "STDDEV_POP computes population standard deviation; STDDEV_SAMP computes sample standard deviation."
  },
  {
    "id": "sql-agg-09",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "hard",
    "question": "How can you perform conditional aggregation in SQL (e.g. count only completed orders) without a WHERE clause filtering the entire query?",
    "options": [
      "SELECT COUNT(CASE WHEN status = 'Completed' THEN 1 END) FROM orders; (or COUNT(*) FILTER (WHERE status = 'Completed') in PostgreSQL)",
      "Using IF COUNT()",
      "Using GROUP FILTER",
      "It is impossible without WHERE"
    ],
    "correctAnswer": 0,
    "explanation": "CASE statements inside aggregates (or PostgreSQL's FILTER clause) allow selective conditional aggregation."
  },
  {
    "id": "sql-agg-10",
    "category": "sql",
    "topic": "Aggregate Functions",
    "difficulty": "hard",
    "question": "What does 'SELECT BOOL_AND(is_active) FROM users;' return in PostgreSQL?",
    "options": [
      "TRUE if every single user is active, otherwise FALSE (logical AND across all rows)",
      "The count of boolean columns",
      "Converts strings to booleans",
      "A syntax error"
    ],
    "correctAnswer": 0,
    "explanation": "BOOL_AND and BOOL_OR perform aggregate boolean reduction across rows in PostgreSQL."
  },
  {
    "id": "sql-joi-01",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "easy",
    "question": "What is an INNER JOIN in relational SQL?",
    "options": [
      "Returns only rows that have matching values in both joined tables based on the join condition",
      "Returns all rows from both tables regardless of match",
      "Returns only unmatched rows",
      "Deletes non-matching rows"
    ],
    "correctAnswer": 0,
    "explanation": "INNER JOIN produces the intersection: rows where the join predicate evaluates to true for both tables."
  },
  {
    "id": "sql-joi-02",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "easy",
    "question": "What does a LEFT (OUTER) JOIN return?",
    "options": [
      "All rows from the left table, and the matched rows from the right table; unmatched right-side columns are filled with NULL",
      "All rows from the right table only",
      "Only rows that match in both tables",
      "Only rows from the left table that have no matches"
    ],
    "correctAnswer": 0,
    "explanation": "LEFT JOIN preserves every record from the left table, padding missing right-table columns with NULLs."
  },
  {
    "id": "sql-joi-03",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "easy",
    "question": "What does a FULL OUTER JOIN return?",
    "options": [
      "All rows when there is a match in either left or right table, padding non-matching sides with NULL",
      "The cartesian product without nulls",
      "An inner join followed by a group by",
      "Only rows that have identical primary keys"
    ],
    "correctAnswer": 0,
    "explanation": "FULL OUTER JOIN unions both tables, keeping all records from both sides and filling missing matches with NULL."
  },
  {
    "id": "sql-joi-04",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "easy",
    "question": "What is a CROSS JOIN?",
    "options": [
      "Produces the Cartesian product of two tables, pairing every row of table A with every row of table B (rows = N * M)",
      "Joins tables in an X shape",
      "Joins tables across different databases",
      "An inner join on primary keys"
    ],
    "correctAnswer": 0,
    "explanation": "CROSS JOIN pairs every tuple of A with every tuple of B without a predicate, resulting in N * M rows."
  },
  {
    "id": "sql-joi-05",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "medium",
    "question": "Given: employees(id, name, manager_id)\nWhich join query displays each employee along with their manager's name from the same table?",
    "options": [
      "SELECT e.name AS emp, m.name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.id; (Self Join)",
      "SELECT name, manager_id FROM employees CROSS JOIN employees;",
      "SELECT * FROM employees INNER JOIN managers;",
      "SELECT e.name, m.name FROM employees e, employees m;"
    ],
    "correctAnswer": 0,
    "explanation": "A Self Join joins a table to itself using distinct aliases (e.g. 'e' for employee and 'm' for manager)."
  },
  {
    "id": "sql-joi-06",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "medium",
    "question": "Given: users(id, name) and orders(id, user_id, amount)\nWhich query finds users who have NEVER placed an order?",
    "options": [
      "SELECT u.name FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL;",
      "SELECT u.name FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.amount = 0;",
      "SELECT u.name FROM users u RIGHT JOIN orders o ON u.id = o.user_id;",
      "SELECT u.name FROM users u WHERE orders = NULL;"
    ],
    "correctAnswer": 0,
    "explanation": "A LEFT JOIN followed by 'WHERE right_table.id IS NULL' (Anti-Join pattern) finds unmatched records."
  },
  {
    "id": "sql-joi-07",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "medium",
    "question": "What is the difference between joining on 'ON' vs filtering in 'WHERE' in a LEFT JOIN?",
    "options": [
      "Predicates in 'ON' determine match linkage before null padding; predicates in 'WHERE' filter the padded result set after the join",
      "There is no difference",
      "'ON' is for numbers; 'WHERE' is for strings",
      "'WHERE' executes before 'ON'"
    ],
    "correctAnswer": 0,
    "explanation": "Filtering right table columns in WHERE can accidentally convert a LEFT JOIN into an INNER JOIN by discarding NULLs."
  },
  {
    "id": "sql-joi-08",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "medium",
    "question": "What is a NATURAL JOIN in SQL and why is it dangerous in production code?",
    "options": [
      "Automatically joins tables on all columns sharing identical names; dangerous because adding a column (like 'created_at') silently alters join behavior",
      "Joins using organic algorithms",
      "Joins without indexes",
      "A join that runs only in nature reserves"
    ],
    "correctAnswer": 0,
    "explanation": "NATURAL JOIN implicitly binds all matching column names; schema changes can break queries silently."
  },
  {
    "id": "sql-joi-09",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "hard",
    "question": "What are the three primary physical join algorithms implemented by relational query engines?",
    "options": [
      "Nested Loop Join, Hash Join, and Merge Sort Join",
      "Binary Join, Linear Join, and Quick Join",
      "Left Join, Right Join, and Full Join",
      "Primary Join, Secondary Join, and Foreign Join"
    ],
    "correctAnswer": 0,
    "explanation": "Engines choose between Nested Loop (small sets), Hash Join (large unsorted sets), and Merge Join (pre-sorted inputs)."
  },
  {
    "id": "sql-joi-10",
    "category": "sql",
    "topic": "JOINs",
    "difficulty": "hard",
    "question": "What is a Lateral Join (LEFT JOIN LATERAL in PostgreSQL / CROSS APPLY in SQL Server)?",
    "options": [
      "Allows an inline subquery in the FROM/JOIN clause to reference columns from preceding tables in the join sequence per row",
      "A join on sideways tables",
      "A join across two network routers",
      "A join that deletes duplicate columns"
    ],
    "correctAnswer": 0,
    "explanation": "LATERAL functions like a for-each loop in SQL, evaluating subqueries dynamically for each outer table row."
  },
  {
    "id": "sql-sub-01",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "easy",
    "question": "Given: employees(id, name, department_id, salary)\nWhich query returns the second-highest salary using a subquery?",
    "options": [
      "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
      "SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;",
      "SELECT MAX(salary) FROM employees WHERE salary = SECOND;",
      "SELECT SECOND(salary) FROM employees;"
    ],
    "correctAnswer": 0,
    "explanation": "The subquery retrieves the absolute max salary; the outer query finds the maximum salary strictly less than that."
  },
  {
    "id": "sql-sub-02",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "easy",
    "question": "What is a 'Scalar Subquery'?",
    "options": [
      "A subquery that returns exactly one single value (one row and one column)",
      "A subquery that returns a list of tables",
      "A subquery with floating point numbers",
      "A subquery that runs on multiple threads"
    ],
    "correctAnswer": 0,
    "explanation": "Scalar subqueries evaluate to a single atomic value and can be placed wherever an expression or literal is valid."
  },
  {
    "id": "sql-sub-03",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "easy",
    "question": "What is a 'Correlated Subquery'?",
    "options": [
      "A subquery that references columns from the outer query, requiring it to be evaluated repeatedly for each candidate row of the outer query",
      "A subquery that runs only on correlated servers",
      "A subquery with two SELECT statements",
      "A subquery that has no WHERE clause"
    ],
    "correctAnswer": 0,
    "explanation": "Correlated subqueries depend on outer row values, executing once per outer row (unless optimized to joins)."
  },
  {
    "id": "sql-sub-04",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "easy",
    "question": "Given: employees(id, name, salary)\nWhich query finds all employees who earn more than the company average salary?",
    "options": [
      "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
      "SELECT * FROM employees WHERE salary > AVG(salary);",
      "SELECT * FROM employees HAVING salary > AVG(salary);",
      "SELECT * FROM employees WHERE salary > ALL;"
    ],
    "correctAnswer": 0,
    "explanation": "The subquery computes the company-wide average salary once, and the outer WHERE compares each employee's salary."
  },
  {
    "id": "sql-sub-05",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "medium",
    "question": "What does the 'EXISTS' operator test in SQL?",
    "options": [
      "Tests for the existence of any rows returned by the subquery (returns TRUE as soon as at least one row is found)",
      "Checks if a table exists in the schema",
      "Checks if a database is online",
      "Checks if a column is not null"
    ],
    "correctAnswer": 0,
    "explanation": "EXISTS short-circuits to TRUE upon encountering the first matching tuple, making it highly efficient."
  },
  {
    "id": "sql-sub-06",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "medium",
    "question": "What is the difference between 'IN' and 'EXISTS' when subquery results contain NULL values?",
    "options": [
      "'NOT IN' returns FALSE or UNKNOWN if ANY row returned by the subquery is NULL; 'NOT EXISTS' handles NULLs safely",
      "'IN' crashes on nulls",
      "'EXISTS' cannot be used with subqueries",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "NOT IN fails unintuitively if the subquery contains a NULL value; NOT EXISTS evaluates boolean existence safely."
  },
  {
    "id": "sql-sub-07",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "medium",
    "question": "Given: employees(id, name, department_id, salary)\nWhich query finds employees who earn more than the average salary of their own department?",
    "options": [
      "SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(d.salary) FROM employees d WHERE d.department_id = e.department_id);",
      "SELECT name FROM employees WHERE salary > AVG(salary) GROUP BY department_id;",
      "SELECT name FROM employees GROUP BY department_id HAVING salary > AVG(salary);",
      "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    ],
    "correctAnswer": 0,
    "explanation": "A correlated subquery filters inner average computation by d.department_id = e.department_id."
  },
  {
    "id": "sql-sub-08",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "medium",
    "question": "What do the 'ANY' and 'ALL' operators do when paired with comparison operators (e.g. > ALL (subquery))?",
    "options": [
      "'> ALL' means greater than the maximum value in the subquery; '> ANY' means greater than at least one value (the minimum)",
      "'> ALL' returns all columns",
      "'> ANY' means equality",
      "They are syntax errors"
    ],
    "correctAnswer": 0,
    "explanation": "x > ALL (set) requires x > max(set); x > ANY (set) requires x > min(set)."
  },
  {
    "id": "sql-sub-09",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "hard",
    "question": "Can a subquery be placed in the FROM clause (Derived Table)?",
    "options": [
      "Yes, and standard SQL mandates assigning an alias to the derived table (e.g. FROM (SELECT ...) AS sub)",
      "No, FROM only accepts physical table names",
      "Only in MySQL",
      "Only if it returns a single row"
    ],
    "correctAnswer": 0,
    "explanation": "Subqueries in FROM create temporary in-memory derived tables that require an explicit table alias."
  },
  {
    "id": "sql-sub-10",
    "category": "sql",
    "topic": "Subqueries",
    "difficulty": "hard",
    "question": "What is 'Subquery Unnesting' (or Flattening) performed by the query optimizer?",
    "options": [
      "The optimizer transforms an uncorrelated or correlated subquery into an equivalent JOIN to enable hash or merge join optimizations",
      "Deleting subqueries from SQL text",
      "Converting subqueries into views",
      "Splitting subqueries into multiple transactions"
    ],
    "correctAnswer": 0,
    "explanation": "Optimizers rewrite subqueries into joins to allow flexible join reordering and index scan paths."
  },
  {
    "id": "sql-cte-01",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "easy",
    "question": "What does 'CTE' stand for in SQL?",
    "options": [
      "Common Table Expression",
      "Centralized Table Entity",
      "Compiled Transaction Engine",
      "Column Type Extension"
    ],
    "correctAnswer": 0,
    "explanation": "A Common Table Expression (CTE) is a named temporary result set defined using the WITH clause."
  },
  {
    "id": "sql-cte-02",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "easy",
    "question": "What keyword is used to declare a Common Table Expression?",
    "options": [
      "WITH",
      "CTE",
      "AS TEMPORARY",
      "LET"
    ],
    "correctAnswer": 0,
    "explanation": "CTEs are initiated with the WITH keyword: WITH cte_name AS (SELECT ...)."
  },
  {
    "id": "sql-cte-03",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "easy",
    "question": "What is a primary readability benefit of using CTEs over deeply nested subqueries?",
    "options": [
      "They break complex multi-step queries into modular, sequential, named blocks read from top to bottom",
      "They make queries run 10x faster automatically",
      "They eliminate the need for primary keys",
      "They allow queries without WHERE clauses"
    ],
    "correctAnswer": 0,
    "explanation": "CTEs replace confusing nested subqueries with clean, self-documenting linear logic."
  },
  {
    "id": "sql-cte-04",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "easy",
    "question": "Can you define multiple CTEs in a single query?",
    "options": [
      "Yes, separated by commas following a single WITH keyword (WITH cte1 AS (...), cte2 AS (...))",
      "No, each CTE requires its own WITH statement",
      "At most two CTEs",
      "Only in stored procedures"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple CTEs can be chained sequentially with commas, referencing preceding CTEs."
  },
  {
    "id": "sql-cte-05",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "medium",
    "question": "What is a 'Recursive CTE' in SQL?",
    "options": [
      "A CTE that references itself to traverse hierarchical or graph-structured data (e.g. org charts, bill of materials, graph paths)",
      "A CTE that runs in an infinite loop until aborted",
      "A CTE with two SELECT statements",
      "A CTE that calls a stored procedure"
    ],
    "correctAnswer": 0,
    "explanation": "WITH RECURSIVE combines an anchor member, UNION ALL, and a recursive member referencing the CTE name."
  },
  {
    "id": "sql-cte-06",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "medium",
    "question": "What are the two mandatory query components combined by UNION ALL in a Recursive CTE?",
    "options": [
      "Anchor Member (base query) and Recursive Member (iterative step with terminating condition)",
      "SELECT and UPDATE",
      "WHERE and HAVING",
      "GROUP BY and ORDER BY"
    ],
    "correctAnswer": 0,
    "explanation": "The anchor query establishes initial state; the recursive step executes repeatedly until returning zero rows."
  },
  {
    "id": "sql-cte-07",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "medium",
    "question": "In PostgreSQL 12+, what does 'WITH cte AS MATERIALIZED (...)' do?",
    "options": [
      "Forces PostgreSQL to execute the CTE independently and write the result into an internal temporary buffer, preventing inlining",
      "Writes the CTE to permanent disk storage",
      "Encrypts the CTE result",
      "Makes the CTE accessible across all user sessions"
    ],
    "correctAnswer": 0,
    "explanation": "MATERIALIZED forces independent execution barrier; NOT MATERIALIZED allows the planner to inline the CTE."
  },
  {
    "id": "sql-cte-08",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "medium",
    "question": "Can a CTE be used with INSERT, UPDATE, or DELETE statements in PostgreSQL?",
    "options": [
      "Yes, PostgreSQL supports Data-Modifying CTEs (e.g. WITH moved_rows AS (DELETE ... RETURNING *) INSERT ...)",
      "No, CTEs only support SELECT statements",
      "Only with INSERT, not DELETE",
      "Only in MySQL 8"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL permits modifying data inside CTEs and streaming returned rows into another operation."
  },
  {
    "id": "sql-cte-09",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "hard",
    "question": "Which of the following is a classic real-world use case for a Recursive CTE?",
    "options": [
      "Traversing an organizational chart hierarchy of employees and their reporting managers to any depth",
      "Calculating 2 + 2",
      "Creating a new database user",
      "Dropping a foreign key"
    ],
    "correctAnswer": 0,
    "explanation": "Recursive CTEs elegantly query tree and graph structures like manager-subordinate hierarchies."
  },
  {
    "id": "sql-cte-10",
    "category": "sql",
    "topic": "CTEs",
    "difficulty": "hard",
    "question": "What safeguard should be implemented in Recursive CTEs to prevent infinite loops from cyclic graph references?",
    "options": [
      "Tracking visited node IDs in an array (e.g. WHERE NOT node_id = ANY(path)) or limiting depth recursion",
      "Disabling foreign keys",
      "Setting work_mem to 0",
      "Running as read-only"
    ],
    "correctAnswer": 0,
    "explanation": "Cyclic graphs cause infinite recursion; tracking visited node paths breaks circular traversals."
  },
  {
    "id": "sql-win-01",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "easy",
    "question": "What is the primary difference between an Aggregate Function (with GROUP BY) and a Window Function (with OVER)?",
    "options": [
      "Aggregate functions collapse rows into a single summary row per group; Window functions calculate across a window of rows while preserving individual row identity",
      "Window functions can only be used on Windows OS",
      "Aggregate functions are faster",
      "Window functions delete duplicate rows"
    ],
    "correctAnswer": 0,
    "explanation": "Window functions calculate running totals or ranks across partitions without collapsing the original rows."
  },
  {
    "id": "sql-win-02",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "easy",
    "question": "What mandatory clause identifies a Window Function in SQL?",
    "options": [
      "OVER()",
      "WINDOW()",
      "PARTITION()",
      "APPLY()"
    ],
    "correctAnswer": 0,
    "explanation": "The OVER clause specifies the window partitioning, ordering, and framing specifications."
  },
  {
    "id": "sql-win-03",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "easy",
    "question": "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() when ties occur (e.g. two employees with salary 5000)?",
    "options": [
      "ROW_NUMBER assigns distinct sequential numbers (1, 2, 3); RANK leaves gaps after ties (1, 2, 2, 4); DENSE_RANK leaves NO gaps (1, 2, 2, 3)",
      "DENSE_RANK leaves gaps; RANK does not",
      "ROW_NUMBER cannot handle ties",
      "They produce identical numbers"
    ],
    "correctAnswer": 0,
    "explanation": "RANK skips ranks after ties (1, 2, 2, 4); DENSE_RANK never skips ranks (1, 2, 2, 3); ROW_NUMBER is strictly unique."
  },
  {
    "id": "sql-win-04",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "easy",
    "question": "Given: employees(id, name, department_id, salary)\nWhich query assigns ranks to employees within their respective departments based on salary descending?",
    "options": [
      "SELECT name, department_id, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees;",
      "SELECT name, DENSE_RANK(salary) FROM employees GROUP BY department_id;",
      "SELECT name, RANK() FROM employees ORDER BY salary;",
      "SELECT name, WINDOW(salary) FROM employees;"
    ],
    "correctAnswer": 0,
    "explanation": "PARTITION BY resets the window per department, and ORDER BY ranks salaries descending within each partition."
  },
  {
    "id": "sql-win-05",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "medium",
    "question": "What does the LEAD(column, offset) window function do?",
    "options": [
      "Accesses data from a subsequent (following) row at a given physical offset within the window partition without self-joins",
      "Returns the leading team member",
      "Converts strings to uppercase",
      "Finds the maximum value in a table"
    ],
    "correctAnswer": 0,
    "explanation": "LEAD looks forward N rows in the window partition; LAG looks backward N rows."
  },
  {
    "id": "sql-win-06",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "medium",
    "question": "What does the LAG(column, offset) window function do?",
    "options": [
      "Accesses data from a previous (prior) row at a specified physical offset within the window partition",
      "Measures network latency lag",
      "Slows down query execution",
      "Deletes previous rows"
    ],
    "correctAnswer": 0,
    "explanation": "LAG retrieves values from preceding rows, commonly used to compute period-over-period growth differences."
  },
  {
    "id": "sql-win-07",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "medium",
    "question": "Given: sales(id, day, amount)\nWhat does this query compute?\nSELECT day, amount, SUM(amount) OVER (ORDER BY day) AS running_total FROM sales;",
    "options": [
      "A running cumulative total of sales amount day by day",
      "The sum of all days",
      "The total amount divided by day",
      "An error because PARTITION BY is missing"
    ],
    "correctAnswer": 0,
    "explanation": "When ORDER BY is present without an explicit frame, the default window frame computes a running cumulative sum."
  },
  {
    "id": "sql-win-08",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "medium",
    "question": "What does NTILE(4) OVER (ORDER BY salary DESC) do on a table of 100 employees?",
    "options": [
      "Divides the employees into 4 equal quartiles (buckets 1 through 4) of 25 employees each based on salary ranking",
      "Multiplies salary by 4",
      "Returns only 4 rows",
      "Finds the 4th highest salary"
    ],
    "correctAnswer": 0,
    "explanation": "NTILE(n) divides ordered rows into n as-equal-as-possible statistical quantiles/buckets."
  },
  {
    "id": "sql-win-09",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "hard",
    "question": "What is the default window frame in SQL when an ORDER BY clause is specified inside OVER()?",
    "options": [
      "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
      "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
      "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
      "No frame"
    ],
    "correctAnswer": 0,
    "explanation": "The default frame includes all rows from the start of the partition up to the current row's peers."
  },
  {
    "id": "sql-win-10",
    "category": "sql",
    "topic": "Window Functions",
    "difficulty": "hard",
    "question": "Can a Window Function appear directly inside a WHERE or HAVING clause?",
    "options": [
      "No, window functions execute after WHERE and HAVING; to filter on window outputs, wrap in a CTE or subquery",
      "Yes, in modern SQL",
      "Only inside HAVING",
      "Only in PostgreSQL"
    ],
    "correctAnswer": 0,
    "explanation": "Window functions evaluate during projection; filtering on their output requires a subquery or CTE wrapper."
  },
  {
    "id": "sql-cse-01",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "easy",
    "question": "What is the correct syntax for a conditional CASE statement in SQL?",
    "options": [
      "CASE WHEN condition THEN result ELSE default_result END",
      "IF condition THEN result ELSE default_result FI",
      "SWITCH condition CASE result DEFAULT END",
      "CONDITIONAL(condition, result, default)"
    ],
    "correctAnswer": 0,
    "explanation": "SQL CASE statements follow: CASE WHEN condition THEN result [ELSE default] END."
  },
  {
    "id": "sql-cse-02",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "easy",
    "question": "What does a CASE statement return if no WHEN condition matches and the ELSE clause is omitted?",
    "options": [
      "NULL",
      "0",
      "An error",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL, omitting ELSE causes unmatched CASE evaluations to return NULL."
  },
  {
    "id": "sql-cse-03",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "easy",
    "question": "Given: employees(id, name, salary)\nWhich query labels employees earning over 80000 as 'High', over 50000 as 'Mid', and all others as 'Entry'?",
    "options": [
      "SELECT name, CASE WHEN salary > 80000 THEN 'High' WHEN salary > 50000 THEN 'Mid' ELSE 'Entry' END AS salary_tier FROM employees;",
      "SELECT name, IF salary > 80000 'High' ELSE 'Entry' FROM employees;",
      "SELECT name, SWITCH(salary) FROM employees;",
      "SELECT name, DECODE(salary, 80000, 'High') FROM employees;"
    ],
    "correctAnswer": 0,
    "explanation": "CASE evaluates conditions sequentially, returning the first matching THEN expression."
  },
  {
    "id": "sql-cse-04",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "easy",
    "question": "What is the difference between a Simple CASE and a Searched CASE in SQL?",
    "options": [
      "Simple CASE compares a single expression for equality (CASE expr WHEN v1 THEN r1); Searched CASE evaluates boolean conditions (CASE WHEN cond1 THEN r1)",
      "Simple CASE is faster in all compilers",
      "Searched CASE can only search strings",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Simple CASE checks exact equality against a target operand; Searched CASE evaluates arbitrary boolean predicates."
  },
  {
    "id": "sql-cse-05",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "medium",
    "question": "How can you use a CASE expression inside an UPDATE statement to give a 10% raise to department 1 and a 5% raise to department 2 in a single query?",
    "options": [
      "UPDATE employees SET salary = salary * CASE WHEN dept_id = 1 THEN 1.10 WHEN dept_id = 2 THEN 1.05 ELSE 1.00 END;",
      "UPDATE employees SET salary = IF dept=1 THEN 1.10;",
      "CASE UPDATE employees ...",
      "It cannot be done in a single query"
    ],
    "correctAnswer": 0,
    "explanation": "CASE statements inside SET allow dynamic, multi-condition mass updates in a single statement."
  },
  {
    "id": "sql-cse-06",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "medium",
    "question": "How can you prevent division by zero in an SQL query calculating 'SELECT revenue / orders;' using CASE?",
    "options": [
      "SELECT CASE WHEN orders = 0 THEN 0 ELSE revenue / orders END FROM metrics;",
      "SELECT revenue / orders WHERE orders != 0;",
      "SET ZERO_DIVIDE = OFF;",
      "SELECT SAFE_DIVIDE(revenue, orders);"
    ],
    "correctAnswer": 0,
    "explanation": "CASE guards against zero denominators by branching before division execution."
  },
  {
    "id": "sql-cse-07",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "medium",
    "question": "Can a CASE expression be used inside an aggregate function (e.g. SUM or COUNT)?",
    "options": [
      "Yes (e.g. SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END))",
      "No, aggregates only accept column names",
      "Only in Oracle",
      "Only if grouped by primary key"
    ],
    "correctAnswer": 0,
    "explanation": "Embedding CASE inside aggregates is the standard method for selective pivot aggregations."
  },
  {
    "id": "sql-cse-08",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "medium",
    "question": "What is the Oracle-specific legacy function equivalent to a simple CASE statement?",
    "options": [
      "DECODE()",
      "NVL()",
      "IF()",
      "TRANSLATE()"
    ],
    "correctAnswer": 0,
    "explanation": "Oracle's DECODE(expr, search, result, default) provides procedural equality branching."
  },
  {
    "id": "sql-cse-09",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "hard",
    "question": "How does the evaluation order of WHEN clauses in a CASE expression work?",
    "options": [
      "Short-circuit sequential evaluation: the first condition that evaluates to TRUE is returned, and remaining branches are skipped",
      "All branches are evaluated and averaged",
      "The last branch always wins",
      "Random order"
    ],
    "correctAnswer": 0,
    "explanation": "SQL engines evaluate WHEN clauses sequentially from top to bottom, halting on the first match."
  },
  {
    "id": "sql-cse-10",
    "category": "sql",
    "topic": "CASE",
    "difficulty": "hard",
    "question": "What data type rule applies to all THEN and ELSE return expressions in a single CASE statement?",
    "options": [
      "All return expressions must be of compatible, coercible data types (the entire CASE expression resolves to a single unified type)",
      "They can return any random data type per row",
      "They must all be integers",
      "They must all be strings"
    ],
    "correctAnswer": 0,
    "explanation": "A CASE expression resolves to a single static column data type, requiring consistent return types."
  },
  {
    "id": "sql-dml-01",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "easy",
    "question": "What happens if you execute an UPDATE statement without a WHERE clause (e.g. UPDATE employees SET salary = 50000;)?",
    "options": [
      "Every single row in the entire employees table is updated to have salary = 50000",
      "The database throws a syntax error",
      "Only the first row is updated",
      "No rows are updated"
    ],
    "correctAnswer": 0,
    "explanation": "Without a WHERE clause filter, DML update commands apply unconditionally to every record in the table."
  },
  {
    "id": "sql-dml-02",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "easy",
    "question": "What happens if you execute 'DELETE FROM users;' without a WHERE clause?",
    "options": [
      "Deletes all rows from the users table while preserving the table schema structure",
      "Drops the entire table including its schema",
      "Throws a warning and deletes nothing",
      "Deletes only the user who typed it"
    ],
    "correctAnswer": 0,
    "explanation": "DELETE without WHERE removes all row records, leaving table structure, indexes, and constraints intact."
  },
  {
    "id": "sql-dml-03",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "easy",
    "question": "What is the difference between 'DELETE FROM table_name;' and 'TRUNCATE TABLE table_name;'?",
    "options": [
      "DELETE removes rows one-by-one and logs each deletion in transaction logs (can have WHERE); TRUNCATE deallocates data pages quickly as a DDL operation and cannot use WHERE",
      "DELETE is faster than TRUNCATE",
      "TRUNCATE deletes the table schema",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "TRUNCATE deallocates data pages via DDL with minimal logging, bypassing row triggers and executing much faster."
  },
  {
    "id": "sql-dml-04",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "easy",
    "question": "What is the standard SQL syntax to insert multiple rows in a single INSERT statement?",
    "options": [
      "INSERT INTO table_name (c1, c2) VALUES (v1, v2), (v3, v4), (v5, v6);",
      "INSERT MULTI INTO table_name ...",
      "INSERT (v1, v2) AND (v3, v4);",
      "INSERT INTO table_name BATCH ..."
    ],
    "correctAnswer": 0,
    "explanation": "Comma-separated tuple lists in VALUES allow high-performance multi-row batch inserts."
  },
  {
    "id": "sql-dml-05",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "medium",
    "question": "In PostgreSQL, how do you return the auto-generated ID of an inserted row immediately?",
    "options": [
      "Append 'RETURNING id' to the INSERT statement",
      "Call LAST_INSERT_ID()",
      "Query SELECT MAX(id)",
      "Read the database log"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL's RETURNING clause streams back projected columns of affected rows instantaneously."
  },
  {
    "id": "sql-dml-06",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "medium",
    "question": "What is an 'Upsert' and how is it implemented in modern PostgreSQL (9.5+)?",
    "options": [
      "INSERT INTO ... ON CONFLICT (id) DO UPDATE SET ... (inserts if absent, updates if key conflict)",
      "MERGE ONLY",
      "UPDATE OR INSERT",
      "REPLACE INTO"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL uses 'ON CONFLICT (target) DO UPDATE / DO NOTHING' for atomic upsert operations."
  },
  {
    "id": "sql-dml-07",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "medium",
    "question": "What does 'INSERT INTO target_table SELECT * FROM source_table;' do?",
    "options": [
      "Copies all matching records from source_table and inserts them directly into target_table",
      "Creates a symbolic link between tables",
      "Deletes source_table",
      "Creates a view"
    ],
    "correctAnswer": 0,
    "explanation": "INSERT INTO ... SELECT populates tables directly from query result sets."
  },
  {
    "id": "sql-dml-08",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "medium",
    "question": "Can you use subqueries inside an UPDATE statement in SQL?",
    "options": [
      "Yes (e.g. UPDATE employees SET salary = salary * 1.10 WHERE department_id IN (SELECT id FROM depts WHERE budget > 1000000);)",
      "No, subqueries are restricted to SELECT",
      "Only with JOINs",
      "Only in stored procedures"
    ],
    "correctAnswer": 0,
    "explanation": "Subqueries in WHERE or SET clauses allow complex conditional mutations."
  },
  {
    "id": "sql-dml-09",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "hard",
    "question": "What is the danger of executing 'TRUNCATE' on a table referenced by foreign keys?",
    "options": [
      "The operation will fail and be rejected if active foreign key constraints reference the table from another table",
      "It corrupts the database",
      "It deletes all databases on the server",
      "It bypasses the operating system"
    ],
    "correctAnswer": 0,
    "explanation": "Relational engines reject TRUNCATE if external foreign keys reference the target table (unless CASCADE is specified)."
  },
  {
    "id": "sql-dml-10",
    "category": "sql",
    "topic": "INSERT / UPDATE / DELETE",
    "difficulty": "hard",
    "question": "What is the SQL standard MERGE statement (supported in PostgreSQL 15+, Oracle, SQL Server)?",
    "options": [
      "A single deterministic statement that joins a target table with a source and executes INSERT, UPDATE, or DELETE based on match conditions",
      "A command that merges two database servers",
      "A tool for merging Git branches",
      "An index merging utility"
    ],
    "correctAnswer": 0,
    "explanation": "MERGE synchronizes two tables in one pass with WHEN MATCHED / WHEN NOT MATCHED logic."
  },
  {
    "id": "sql-cst-01",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "easy",
    "question": "What does a UNIQUE constraint enforce on an SQL table column?",
    "options": [
      "All non-null values in the column must be distinct and unique across all rows",
      "The column cannot contain NULLs",
      "The column must be an integer",
      "The column is encrypted"
    ],
    "correctAnswer": 0,
    "explanation": "UNIQUE prohibits duplicate non-null entries; unlike PRIMARY KEY, it permits NULL values (often multiple in SQL standard)."
  },
  {
    "id": "sql-cst-02",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "easy",
    "question": "What does a CHECK constraint do in an SQL table definition?",
    "options": [
      "Enforces a boolean condition that every row's value must satisfy (e.g. CHECK (age >= 18 AND salary > 0))",
      "Checks if user has paid for database license",
      "Checks spelling of column names",
      "Checks network cable connection"
    ],
    "correctAnswer": 0,
    "explanation": "CHECK constraints validate domain integrity by rejecting rows where the boolean condition evaluates to FALSE."
  },
  {
    "id": "sql-cst-03",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "easy",
    "question": "What does a NOT NULL constraint guarantee?",
    "options": [
      "The column cannot accept or store a NULL value; an explicit valid value must be provided",
      "The column cannot store zero",
      "The column cannot store empty strings",
      "The column must be positive"
    ],
    "correctAnswer": 0,
    "explanation": "NOT NULL prevents missing or unassigned values from being stored."
  },
  {
    "id": "sql-cst-04",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "easy",
    "question": "What is the function of the DEFAULT constraint in SQL?",
    "options": [
      "Provides a pre-defined fallback value for a column if no value is specified during an INSERT",
      "Restores the table to default settings",
      "Formats text to lowercase",
      "Deletes default users"
    ],
    "correctAnswer": 0,
    "explanation": "DEFAULT populates columns automatically when omitted in INSERT statements (e.g. created_at DEFAULT NOW())."
  },
  {
    "id": "sql-cst-05",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "medium",
    "question": "How can you add a foreign key constraint to an existing table using ALTER TABLE?",
    "options": [
      "ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);",
      "ALTER TABLE orders INSERT FOREIGN KEY ...",
      "ALTER TABLE orders SET FOREIGN KEY ...",
      "ADD CONSTRAINT fk_user TO orders;"
    ],
    "correctAnswer": 0,
    "explanation": "ALTER TABLE table_name ADD CONSTRAINT name FOREIGN KEY (col) REFERENCES parent(col)."
  },
  {
    "id": "sql-cst-06",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "medium",
    "question": "Can a table have multiple UNIQUE constraints?",
    "options": [
      "Yes, a table can have multiple distinct UNIQUE constraints across different columns",
      "No, at most one per table",
      "Only if it has no primary key",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "Tables are limited to one PRIMARY KEY, but may have multiple UNIQUE constraints."
  },
  {
    "id": "sql-cst-07",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "medium",
    "question": "What is the difference between a Column-level constraint and a Table-level constraint?",
    "options": [
      "Column-level constraints are declared directly on a single column definition; Table-level constraints are declared at the end of the schema and can span multiple columns (composite constraints)",
      "Column-level constraints run faster",
      "Table-level constraints require administrative privileges",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Composite constraints (spanning multiple columns, like PRIMARY KEY (a, b)) must be declared at the table level."
  },
  {
    "id": "sql-cst-08",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "medium",
    "question": "What happens if you try to add a NOT NULL constraint to an existing column that already contains NULL values?",
    "options": [
      "The database engine rejects the ALTER command with an error until existing NULL values are updated",
      "All NULL values are converted to 0",
      "All rows with NULL are deleted",
      "The constraint is added anyway"
    ],
    "correctAnswer": 0,
    "explanation": "Engines validate existing rows before attaching constraints; violating rows cause the ALTER TABLE to fail."
  },
  {
    "id": "sql-cst-09",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "hard",
    "question": "In PostgreSQL, what is a 'DEFERRABLE INITIALLY DEFERRED' constraint?",
    "options": [
      "Constraint checks are delayed until the end of the transaction (COMMIT time) rather than evaluated immediately after each statement",
      "A constraint that is disabled forever",
      "A constraint that runs on a background thread",
      "A temporary constraint"
    ],
    "correctAnswer": 0,
    "explanation": "Deferred constraints permit intermediate violations during complex multi-table inserts, verifying consistency at COMMIT."
  },
  {
    "id": "sql-cst-10",
    "category": "sql",
    "topic": "Constraints",
    "difficulty": "hard",
    "question": "What is an 'Exclusion Constraint' in PostgreSQL (CREATE TABLE ... EXCLUDE USING gist (...))?",
    "options": [
      "Enforces generalized uniqueness across complex operators (e.g. preventing overlapping booking time ranges: tsrange && tsrange)",
      "Excludes users from logging in",
      "Excludes specific rows from backups",
      "Deletes old rows automatically"
    ],
    "correctAnswer": 0,
    "explanation": "Exclusion constraints generalize UNIQUE using GiST indexes to prohibit overlapping ranges or geometric collisions."
  },
  {
    "id": "sql-idx-01",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "easy",
    "question": "What is the SQL syntax to create a standard B-Tree index on the 'email' column of the 'users' table?",
    "options": [
      "CREATE INDEX idx_users_email ON users(email);",
      "ADD INDEX ON users(email);",
      "CREATE BTREE ON users(email);",
      "MAKE INDEX FOR users.email;"
    ],
    "correctAnswer": 0,
    "explanation": "CREATE INDEX index_name ON table_name (column_name) is the standard SQL syntax."
  },
  {
    "id": "sql-idx-02",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "easy",
    "question": "What command removes an existing index named 'idx_users_email'?",
    "options": [
      "DROP INDEX idx_users_email;",
      "DELETE INDEX idx_users_email;",
      "REMOVE INDEX idx_users_email;",
      "ALTER TABLE users REMOVE INDEX;"
    ],
    "correctAnswer": 0,
    "explanation": "Indexes are dropped using the DROP INDEX index_name command."
  },
  {
    "id": "sql-idx-03",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "easy",
    "question": "What does the 'EXPLAIN' command prefix do when prepended to an SQL query?",
    "options": [
      "Displays the query execution plan generated by the database optimizer without or before executing the query",
      "Explains the query in English text",
      "Translates the query to Python",
      "Tests query syntax only"
    ],
    "correctAnswer": 0,
    "explanation": "EXPLAIN displays the optimizer's estimated execution plan (Index Scan, Seq Scan, Cost, Rows)."
  },
  {
    "id": "sql-idx-04",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "easy",
    "question": "What is the difference between 'EXPLAIN' and 'EXPLAIN ANALYZE' in PostgreSQL?",
    "options": [
      "EXPLAIN shows optimizer estimates; EXPLAIN ANALYZE actually executes the query and reports real runtime elapsed times and buffer counts",
      "EXPLAIN ANALYZE runs in the cloud",
      "EXPLAIN ANALYZE optimizes the query automatically",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "EXPLAIN ANALYZE runs the query to measure actual timing and row counts alongside optimizer estimates."
  },
  {
    "id": "sql-idx-05",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "medium",
    "question": "What is a 'Partial Index' (Filtered Index) in PostgreSQL?",
    "options": [
      "An index built over a subset of a table specified by a WHERE clause (e.g. CREATE INDEX ON orders(user_id) WHERE status = 'Active';)",
      "An index that only indexes half of a column's text",
      "An index that is half-built",
      "A corrupted index"
    ],
    "correctAnswer": 0,
    "explanation": "Partial indexes reduce index size and maintenance overhead by indexing only relevant rows (e.g. active records)."
  },
  {
    "id": "sql-idx-06",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "medium",
    "question": "What is a 'GIN' (Generalized Inverted Index) commonly used for in PostgreSQL?",
    "options": [
      "Indexing composite items such as JSONB documents, full-text search documents, and arrays",
      "Indexing integer primary keys",
      "Indexing floating point numbers",
      "Indexing date ranges"
    ],
    "correctAnswer": 0,
    "explanation": "GIN indexes map elements (words, array items, JSON keys) to the rows containing them, powering full-text search."
  },
  {
    "id": "sql-idx-07",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "medium",
    "question": "What is a 'BRIN' (Block Range Index) in PostgreSQL and when is it used?",
    "options": [
      "Stores min/max values for ranges of physical disk pages; extremely small and fast for massive tables sorted in physical insertion order (e.g. time-series data)",
      "A binary search index",
      "A hash index for strings",
      "A memory-only index"
    ],
    "correctAnswer": 0,
    "explanation": "BRIN indexes take negligible disk space (kilobytes for gigabyte tables) for naturally correlated append-only data."
  },
  {
    "id": "sql-idx-08",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "medium",
    "question": "Why might a query optimizer choose a sequential Full Table Scan even when a valid index exists on the filtered column?",
    "options": [
      "When the filter is not selective enough (e.g. matches >20% of rows), sequential disk I/O is faster than random index page reads",
      "Because the optimizer is broken",
      "Because indexes are only used on weekends",
      "Because the table is locked"
    ],
    "correctAnswer": 0,
    "explanation": "Cost-based optimizers recognize that random I/O from index lookups is slower than sequential reads when fetching high proportions of rows."
  },
  {
    "id": "sql-idx-09",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "hard",
    "question": "How can you create an index in production PostgreSQL without locking writes to the table?",
    "options": [
      "CREATE INDEX CONCURRENTLY idx_name ON table_name(col);",
      "CREATE INDEX ASYNC idx_name ON table_name(col);",
      "SET LOCK_LEVEL = ZERO; CREATE INDEX ...",
      "It cannot be done in production"
    ],
    "correctAnswer": 0,
    "explanation": "CONCURRENTLY builds the index through two scans without acquiring exclusive write locks, avoiding production downtime."
  },
  {
    "id": "sql-idx-10",
    "category": "sql",
    "topic": "Indexes",
    "difficulty": "hard",
    "question": "What is 'Index Fragmentation' and what command reorganizes/rebuilds an index in PostgreSQL?",
    "options": [
      "Page underutilization caused by frequent deletes/updates; resolved using REINDEX TABLE table_name (or pg_repack)",
      "Corrupted index bits",
      "Splitting an index across multiple servers",
      "A bug in SQL syntax"
    ],
    "correctAnswer": 0,
    "explanation": "REINDEX rebuilds bloated B-Tree index structures from scratch, restoring optimal page packing."
  },
  {
    "id": "sql-trx-01",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What SQL command initiates an explicit transaction in PostgreSQL?",
    "options": [
      "BEGIN (or START TRANSACTION)",
      "INIT TRANSACTION",
      "CREATE TRANSACTION",
      "OPEN TRANSACTION"
    ],
    "correctAnswer": 0,
    "explanation": "Transactions are explicitly started using 'BEGIN;' (or 'START TRANSACTION;')."
  },
  {
    "id": "sql-trx-02",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What command sets the transaction isolation level for the current transaction in SQL?",
    "options": [
      "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
      "CONFIG ISOLATION = SERIALIZABLE;",
      "ALTER TRANSACTION SET LEVEL SERIALIZABLE;",
      "ISOLATION = 4;"
    ],
    "correctAnswer": 0,
    "explanation": "The standard SQL syntax is SET TRANSACTION ISOLATION LEVEL <level>."
  },
  {
    "id": "sql-trx-03",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What is the purpose of the 'SELECT ... FOR UPDATE' statement in PostgreSQL/MySQL?",
    "options": [
      "Acquires an Exclusive Row-Level Lock on the selected rows, preventing concurrent transactions from modifying them until COMMIT",
      "Updates the rows immediately to NULL",
      "Selects rows for deletion",
      "A syntax error"
    ],
    "correctAnswer": 0,
    "explanation": "SELECT FOR UPDATE enforces pessimistic concurrency locking to prevent race conditions during read-modify-write workflows."
  },
  {
    "id": "sql-trx-04",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "easy",
    "question": "What does 'SELECT ... FOR UPDATE SKIP LOCKED' do in modern queue architectures?",
    "options": [
      "Locks and returns available unlocked rows while skipping rows currently locked by other concurrent workers",
      "Skips table locks entirely",
      "Unlocks all locked rows",
      "A query that never runs"
    ],
    "correctAnswer": 0,
    "explanation": "SKIP LOCKED enables high-throughput concurrent worker queues directly inside SQL without contention."
  },
  {
    "id": "sql-trx-05",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "What is an 'Autonomous Transaction' in relational databases (supported in Oracle)?",
    "options": [
      "An independent transaction executed within the context of a parent transaction that can commit or rollback without affecting the parent",
      "A transaction driven by AI",
      "A transaction that runs without a database",
      "A transaction executed on self-driving cars"
    ],
    "correctAnswer": 0,
    "explanation": "Autonomous transactions commit independently (commonly used for writing audit logs even when the parent rolls back)."
  },
  {
    "id": "sql-trx-06",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "What happens if a client application connection disconnects abruptly while an explicit transaction is open?",
    "options": [
      "The database server automatically aborts the transaction and executes a full ROLLBACK",
      "The transaction is automatically committed",
      "The database freezes until the client reconnects",
      "The data is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "Server abort detection automatically rolls back uncommitted active transactions to protect consistency."
  },
  {
    "id": "sql-trx-07",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "In PostgreSQL, what happens to subsequent queries within a transaction block after one query throws an error?",
    "options": [
      "The transaction enters an aborted state; all subsequent statements fail with 'current transaction is aborted' until ROLLBACK (or rollback to savepoint)",
      "Subsequent queries continue normally",
      "The error is ignored",
      "The database shuts down"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL enforces strict transactional integrity; any statement error invalidates the transaction until ROLLBACK/SAVEPOINT."
  },
  {
    "id": "sql-trx-08",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "medium",
    "question": "How can you implement a retry loop in application code for 'Serialization Failure' errors (SQLSTATE 40001)?",
    "options": [
      "Catch the serialization failure exception and replay the entire transaction from the beginning with exponential backoff",
      "Ignore the exception and proceed",
      "Change database passwords",
      "Restart the operating system"
    ],
    "correctAnswer": 0,
    "explanation": "Serializable isolation and OCC expect occasional serialization collisions; standard protocol requires replaying the transaction."
  },
  {
    "id": "sql-trx-09",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "hard",
    "question": "What does 'Two-Phase Commit' (2PC) guarantee in distributed database architectures?",
    "options": [
      "Atomic commitment across multiple independent distributed database nodes: Phase 1 (Prepare/Vote) and Phase 2 (Commit/Abort)",
      "Committing twice for double durability",
      "A transaction that takes 2 seconds",
      "Running transactions on two CPU cores"
    ],
    "correctAnswer": 0,
    "explanation": "2PC coordinates distributed nodes to ensure all nodes commit together or all abort together."
  },
  {
    "id": "sql-trx-10",
    "category": "sql",
    "topic": "Transactions",
    "difficulty": "hard",
    "question": "What is a 'Phantom Read' and under which SQL isolation level can it occur in standard ANSI SQL?",
    "options": [
      "When a transaction queries a range of rows and sees new rows inserted by another committed transaction; prevented by SERIALIZABLE",
      "Reading data that does not exist",
      "Reading encrypted data",
      "Reading cached data"
    ],
    "correctAnswer": 0,
    "explanation": "Phantom reads occur under Read Committed and Repeatable Read (in standard spec); eliminated under SERIALIZABLE."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['sql'] = sqlData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = sqlData;
  }
})();
