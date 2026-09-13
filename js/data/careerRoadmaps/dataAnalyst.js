/**
 * DevPilot-AI — Career Roadmap: Data Analyst
 * Complete 5-level dependency path, practical skill tasks, progressive projects, and job-ready checklist.
 */

const dataAnalystRoadmap = {
  roleId: 'data-analyst',
  roadmapId: 'dataAnalyst',
  title: 'Data Analyst',
  category: 'data-ai',
  description: 'Transform raw data into business intelligence: advanced SQL querying, data cleaning with Python/Pandas, interactive BI dashboards (Power BI / Tableau), statistical analysis, and A/B experimentation.',
  levels: [
    {
      levelNum: 1,
      name: 'Foundation',
      description: 'Advanced spreadsheets, business statistics, relational databases, and SQL querying foundations.',
      skills: [
        {
          id: 'da-spreadsheets',
          title: 'Advanced Spreadsheets & Business Modeling (Excel / Sheets)',
          category: 'Data Fundamentals',
          level: 'Level 1: Foundation',
          order: 1,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: [],
          description: 'Master advanced spreadsheet analysis: XLOOKUP/INDEX-MATCH, Pivot Tables, conditional formulas, dynamic arrays, data validation, and financial modeling.',
          whatToLearn: [
            'Lookup functions: XLOOKUP, INDEX & MATCH, FILTER, SORT, UNIQUE dynamic arrays',
            'Logical and conditional functions: IF, IFS, SUMIFS, COUNTIFS, AVERAGEIFS',
            'Pivot Tables & Pivot Charts: slicers, calculated fields, group by date, running totals',
            'Data cleaning techniques: text-to-columns, TRIM, CLEAN, removing duplicates, text functions (CONCAT, TEXTSPLIT)',
            'Financial and business modeling: What-If Analysis, Goal Seek, scenario manager, and cohort tables'
          ],
          whyItMatters: 'Spreadsheets remain the most ubiquitous business intelligence tool in companies worldwide for quick ad-hoc analysis and executive reporting.',
          productionUse: 'Financial forecasting, marketing campaign ROI analysis, and executive ad-hoc data requests.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to generate complex nested spreadsheet formulas; verify cell references and edge-case blank rows manually.',
          handsOnTask: 'Build a dynamic 3-statement financial model and customer cohort retention spreadsheet with automated Pivot Table dashboards.',
          projectApplication: 'Provides exploratory analysis techniques used in all business analysis projects.',
          resources: [
            { title: 'Microsoft Excel Official Documentation', url: 'https://support.microsoft.com/en-us/excel', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'da-sql-core',
          title: 'SQL Querying, Aggregations & Joins',
          category: 'Databases & Querying',
          level: 'Level 1: Foundation',
          order: 2,
          difficulty: 'Beginner',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['da-spreadsheets'],
          description: 'Master Structured Query Language (SQL): SELECT, WHERE filtering, GROUP BY aggregations, multi-table JOINs, subqueries, and date/time manipulation.',
          whatToLearn: [
            'Basic querying: SELECT, DISTINCT, WHERE, ORDER BY, LIMIT, operators (LIKE, IN, BETWEEN, IS NULL)',
            'Aggregate functions: COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING filter clauses',
            'Multi-table joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, and self-joins',
            'Subqueries: correlated subqueries, scalar subqueries, and subqueries in WHERE/FROM clauses',
            'Date and string functions: DATE_TRUNC, EXTRACT, DATEADD, DATEDIFF, CONCAT, COALESCE'
          ],
          whyItMatters: 'SQL is the universal language of business data. Every analyst must query relational data warehouses independently without relying on engineering tickets.',
          productionUse: 'Extracting data from PostgreSQL, Snowflake, BigQuery, and Redshift data warehouses.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft SQL queries from natural language questions; verify join conditions and row count changes manually.',
          handsOnTask: 'Write a series of SQL queries on a real 100,000-row retail sales dataset to identify top revenue-generating customers and churn rates.',
          projectApplication: 'Core data extraction method for the Executive Business Intelligence Dashboard project.',
          resources: [
            { title: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'tutorial' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 2,
      name: 'Core',
      description: 'Advanced SQL window functions, statistical analysis, and Python data manipulation with Pandas.',
      skills: [
        {
          id: 'da-advanced-sql',
          title: 'Advanced SQL: Window Functions & Common Table Expressions (CTEs)',
          category: 'Databases & Querying',
          level: 'Level 2: Core',
          order: 3,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['da-sql-core'],
          description: 'Master enterprise SQL analysis: Common Table Expressions (WITH CTEs), window functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, NTILE), and running totals.',
          whatToLearn: [
            'Common Table Expressions (WITH clauses) and recursive CTEs for hierarchical organizational trees',
            'Window functions: OVER (PARTITION BY ... ORDER BY ...)',
            'Ranking functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(4) quartiles',
            'Value window functions: LEAD() and LAG() for calculating period-over-period growth rates',
            'Running totals and moving averages: SUM() OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)',
            'Query optimization basics: index usage, partition pruning, and avoiding unnecessary cross joins'
          ],
          whyItMatters: 'Window functions enable advanced time-series analysis, retention cohorts, and ranking without cumbersome self-joins.',
          productionUse: 'Calculating Monthly Recurring Revenue (MRR), Customer Churn, Daily Active Users (DAU), and User LTV.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to debug window frame syntax (ROWS vs RANGE); verify boundary partition values carefully.',
          handsOnTask: 'Write an advanced SQL script calculating 7-day rolling revenue averages and month-over-month customer retention cohorts using CTEs and window functions.',
          projectApplication: 'Drives the analytical queries behind the Customer Churn & Cohort Analysis project.',
          resources: [
            { title: 'PostgreSQL Window Functions Documentation', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'da-python-pandas',
          title: 'Python for Data Analysis: NumPy, Pandas & Data Cleaning',
          category: 'Data Programming',
          level: 'Level 2: Core',
          order: 4,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['da-sql-core'],
          description: 'Wrangle and clean large messy datasets with Python: Jupyter Notebooks, NumPy arrays, Pandas DataFrames, handling missing data, and date-time operations.',
          whatToLearn: [
            'Jupyter Notebook and Google Colab development workflows for reproducible analysis',
            'NumPy array operations: vectorization, broadcasting, math functions, and boolean masking',
            'Pandas DataFrames: reading CSV, JSON, Parquet, Excel; indexing (.loc, .iloc), filtering, sorting',
            'Data cleaning: identifying missing data (isna, dropna, fillna), data type conversions (astype), deduplication',
            'Data transformation: groupby, agg, pivot_table, melt, merge, concat, string operations (.str)',
            'Handling dates and times in Pandas: pd.to_datetime, dt.month, resample, and rolling windows'
          ],
          whyItMatters: 'SQL is limited when dealing with messy unstructured formats or complex mathematical transforms. Python provides limitless data wrangling power.',
          productionUse: 'Automating recurring ETL scripts, cleaning messy customer survey data, and transforming raw logs.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate Pandas lambda expressions and regex data cleaning rules; verify dataframe shape and summary statistics before and after.',
          handsOnTask: 'Clean and transform a messy real-world dataset with corrupted dates, missing values, and inconsistent currency strings into a clean analytical dataset.',
          projectApplication: 'Provides data wrangling and transformation across all intermediate analysis projects.',
          resources: [
            { title: 'Python for Data Analysis by Wes McKinney', url: 'https://wesmckinney.com/book/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 3,
      name: 'Intermediate',
      description: 'Data visualization, Business Intelligence tools (Power BI / Tableau), and exploratory data analysis.',
      skills: [
        {
          id: 'da-bi-dashboards',
          title: 'Business Intelligence Dashboards: Power BI / Tableau',
          category: 'Business Intelligence',
          level: 'Level 3: Intermediate',
          order: 5,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['da-advanced-sql'],
          description: 'Build enterprise BI dashboards in Power BI or Tableau: star schema data modeling, DAX measures (CALCULATE, FILTER, RELATED), interactive drill-downs, and executive KPIs.',
          whatToLearn: [
            'Data modeling for BI: Star Schema vs Snowflake Schema, fact tables vs dimension tables, relationship cardinalities (1-to-many)',
            'Power BI DAX (Data Analysis Expressions): CALCULATE, FILTER, ALL, RELATED, time intelligence (TOTALYTD, SAMEPERIODLASTYEAR)',
            'Tableau: dimensions vs measures, discrete vs continuous, calculated fields, Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE)',
            'Dashboard design best practices: visual hierarchy, color theory, eliminating clutter, interactive slicers and tooltips',
            'Publishing and scheduling automated data refreshes in Power BI Service / Tableau Cloud'
          ],
          whyItMatters: 'Executives and stakeholders consume insights through dashboards, not raw code. A well-designed dashboard drives strategic corporate decisions.',
          productionUse: 'Executive KPI tracking, sales performance dashboards, marketing attribution monitors, and operations metrics.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to draft complex DAX formulas and suggest optimal chart types based on metric cardinality.',
          handsOnTask: 'Build an executive Sales & Operations Power BI/Tableau dashboard featuring star schema data modeling, dynamic date filters, and YoY KPI cards.',
          projectApplication: 'Core deliverable for the Executive Business Intelligence Dashboard project.',
          resources: [
            { title: 'Microsoft Power BI Documentation', url: 'https://learn.microsoft.com/en-us/power-bi/', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'da-visualization-storytelling',
          title: 'Data Visualization (Matplotlib, Seaborn) & Storytelling',
          category: 'Data Visualization',
          level: 'Level 3: Intermediate',
          order: 6,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2-3 weeks',
          prerequisites: ['da-python-pandas'],
          description: 'Communicate visual insights effectively: Matplotlib, Seaborn, choosing the right chart type, chart hygiene, and narrative data storytelling for executives.',
          whatToLearn: [
            'Chart selection rules: Distribution (histograms, box plots, KDE), Relationship (scatter, bubble), Comparison (bar, column), Composition (stacked bar, treemap)',
            'Matplotlib architecture: Figure, Axes, subplots, tick formatting, annotations, and export styling',
            'Seaborn statistical plots: pairplot, boxplot, violinplot, heatmap with correlation matrices',
            'Data storytelling principles: Cole Nussbaumer Knaflic’s "Storytelling with Data" (decluttering, focusing attention, narrative arc)',
            'Presenting insights to non-technical stakeholders: framing insights in terms of revenue, cost, risk, and actionable recommendations'
          ],
          whyItMatters: 'Data without a clear story is ignored. Analysts who can translate complex data into compelling visual narratives gain leadership trust.',
          productionUse: 'Creating quarterly business reviews (QBRs), investor presentation slide decks, and analytical deep-dive reports.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate boilerplate Matplotlib styling configurations; write the strategic business takeaway narrative yourself.',
          handsOnTask: 'Create an analytical presentation slide deck with customized Seaborn visualizations analyzing why a SaaS product experienced a 12% drop in user conversion.',
          projectApplication: 'Produces the presentation deck for the Customer Churn & Cohort Analysis project.',
          resources: [
            { title: 'Storytelling with Data by Cole Nussbaumer Knaflic', url: 'https://www.storytellingwithdata.com/', type: 'book' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 4,
      name: 'Advanced',
      description: 'Applied business statistics, hypothesis testing, A/B experimentation, and predictive modeling basics.',
      skills: [
        {
          id: 'da-ab-testing-stats',
          title: 'Applied Statistics & A/B Experimentation Analysis',
          category: 'Statistics & Experimentation',
          level: 'Level 4: Advanced',
          order: 7,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3-4 weeks',
          prerequisites: ['da-visualization-storytelling'],
          description: 'Design and evaluate scientific business experiments: hypothesis testing, p-values, t-tests, chi-squared tests, sample size calculation, statistical power, and guardrail metrics.',
          whatToLearn: [
            'Descriptive statistics: Mean, Median, Mode, Variance, Standard Deviation, Interquartile Range (IQR), Skewness',
            'Probability distributions: Normal distribution, Binomial distribution, Central Limit Theorem (CLT)',
            'Hypothesis testing framework: Null hypothesis (H0) vs Alternative hypothesis (H1), Type I error (alpha) vs Type II error (beta)',
            'Statistical tests: Two-sample t-test, Mann-Whitney U test (non-parametric), Chi-Square test for independence',
            'A/B testing design: minimum detectable effect (MDE), sample size calculation, statistical power (80%), significance level (5%)',
            'Common experimentation pitfalls: p-hacking, peeking problem, novelty effects, Simpson’s paradox, and multiple comparisons problem'
          ],
          whyItMatters: 'Leading tech companies (Netflix, Amazon, Meta) make product decisions via A/B experimentation. Flawed statistics lead to shipping features that harm revenue.',
          productionUse: 'Evaluating new feature rollouts, checkout flow redesigns, pricing tier experiments, and marketing landing pages.',
          aiRelevance: 'Moderate',
          aiWorkflow: 'Use AI to compute required sample size formulas in Python; interpret p-values and business significance with rigorous human judgment.',
          handsOnTask: 'Analyze a real e-commerce A/B test dataset in Python, conduct two-sample hypothesis tests, evaluate statistical power, and produce a launch recommendation report.',
          projectApplication: 'Core methodology for the E-Commerce A/B Experimentation & Conversion Analysis project.',
          resources: [
            { title: 'Trustworthy Online Controlled Experiments (Kohavi et al.)', url: 'https://experimentguide.com/', type: 'book' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'da-predictive-scikit',
          title: 'Predictive Analytics & Machine Learning Basics (scikit-learn)',
          category: 'Predictive Modeling',
          level: 'Level 4: Advanced',
          order: 8,
          difficulty: 'Intermediate',
          importance: 'Essential',
          estimatedTime: '2-3 weeks',
          prerequisites: ['da-ab-testing-stats'],
          description: 'Build predictive baseline models: Linear Regression for revenue forecasting, Logistic Regression for churn prediction, Decision Trees, and model evaluation metrics.',
          whatToLearn: [
            'Supervised learning basics: features (X) vs target variable (y), train/test split, cross-validation',
            'Regression models: Simple & Multiple Linear Regression, R-squared, Mean Squared Error (MSE), feature coefficients',
            'Classification models: Logistic Regression, Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC curve',
            'Tree-based models: Decision Trees for interpretable business rules',
            'Feature engineering: one-hot encoding categorical variables, handling outliers, and scaling features with StandardScaler'
          ],
          whyItMatters: 'Modern data analysts are expected to go beyond descriptive "what happened" reporting to predictive "what will happen" forecasting.',
          productionUse: 'Predicting customer lifetime value (LTV), forecasting quarterly sales, and scoring leads for sales teams.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to generate baseline scikit-learn training pipelines; evaluate feature importance and model bias manually.',
          handsOnTask: 'Build a customer churn prediction model in Python using Logistic Regression that identifies the top 5 behavioral indicators of user cancellations.',
          projectApplication: 'Adds predictive scoring capabilities to the Customer Churn project.',
          resources: [
            { title: 'scikit-learn Getting Started', url: 'https://scikit-learn.org/stable/getting_started.html', type: 'documentation' }
          ],
          completionStatus: 'not-started'
        }
      ]
    },
    {
      levelNum: 5,
      name: 'Job Ready',
      description: 'Analytics portfolio case studies, SQL technical interview preparation, business sense case interviews, and resume optimization.',
      skills: [
        {
          id: 'da-interview-sql-cases',
          title: 'Data Analyst Interviews: Advanced SQL & Business Case Studies',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 9,
          difficulty: 'Advanced',
          importance: 'Core',
          estimatedTime: '3 weeks',
          prerequisites: ['da-ab-testing-stats'],
          description: 'Master data analyst interviews: live SQL whiteboard tests, metric investigation case studies (e.g., "Why did Uber rides drop 10% in Chicago?"), and behavioral storytelling.',
          whatToLearn: [
            'Live SQL coding interview practice: window functions, self-joins, retention tables under 30-minute time limits',
            'Product & Business sense framework: metric decomposition (Revenue = Users * Conversion * Order Value)',
            'Investigating metric anomalies: internal vs external factors, segmenting by platform/geography/channel, logging/data pipeline bugs',
            'Behavioral interviews using STAR: communicating analytical pushback against executive assumptions with data'
          ],
          whyItMatters: 'Analyst interview loops test both hard SQL proficiency and your structured business intuition to solve ambiguous open-ended problems.',
          productionUse: 'Interviewing for data analyst, product analyst, and business intelligence engineer roles.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI as an interactive mock interviewer to pose metric drop investigation case studies and critique your diagnostic structure.',
          handsOnTask: 'Complete 10 timed SQL coding challenges on StrataScratch/LeetCode and write a structured diagnostic response to a simulated 15% DAU metric drop.',
          projectApplication: 'Prepares you directly for top tech company analytics interview loops.',
          resources: [
            { title: 'StrataScratch SQL Interview Questions', url: 'https://www.stratascratch.com/', type: 'practice' }
          ],
          completionStatus: 'not-started'
        },
        {
          id: 'da-portfolio-resume',
          title: 'Data Analyst Portfolio, GitHub & ATS-Optimized Resume',
          category: 'Career Readiness',
          level: 'Level 5: Job Ready',
          order: 10,
          difficulty: 'Intermediate',
          importance: 'Core',
          estimatedTime: '2 weeks',
          prerequisites: ['da-interview-sql-cases'],
          description: 'Publish interactive Tableau/Power BI portfolios, write polished GitHub project READMEs with executive business summaries, and craft a quantifiable ATS resume.',
          whatToLearn: [
            'Packaging analytics projects: business problem, data extraction, methodology, findings, and actionable recommendations',
            'Publishing public interactive dashboard links via Tableau Public or Power BI Service',
            'Writing quantifiable resume bullets using the Google XYZ formula (e.g., "Identified $120K in wasted ad spend by building...")',
            'GitHub repository hygiene: committing clean Jupyter Notebooks with markdown explanations and rendered charts'
          ],
          whyItMatters: 'Hiring managers review dozens of analyst resumes. A candidate with public dashboard links and measurable business impact stands out immediately.',
          productionUse: 'Attracting recruiter inbound leads and securing interviews.',
          aiRelevance: 'High',
          aiWorkflow: 'Use AI to tailor resume bullet points to specific job descriptions; ensure all stated metrics represent honest project outcomes.',
          handsOnTask: 'Publish an interactive dashboard on Tableau Public or Power BI with a companion GitHub repository featuring a one-page executive summary.',
          projectApplication: 'Packages your complete analytical portfolio for hiring teams.',
          resources: [
            { title: 'Tableau Public Gallery', url: 'https://public.tableau.com/en-us/gallery', type: 'showcase' }
          ],
          completionStatus: 'not-started'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'da-proj-1',
      title: 'Executive Sales & Operations Business Intelligence Dashboard',
      difficulty: 'Beginner',
      estimatedTime: '3 weeks',
      objective: 'Build an interactive multi-page Power BI or Tableau dashboard modeling enterprise sales transactions with star schema modeling and YoY KPI cards.',
      technologies: ['Power BI / Tableau', 'SQL (PostgreSQL)', 'Excel', 'Star Schema', 'DAX / Calculated Fields'],
      skillsPracticed: ['Data modeling', 'Fact vs dimension tables', 'DAX time intelligence', 'Interactive filtering', 'Executive KPI design'],
      requirements: [
        'Star schema data model with 1 fact table (Sales) and 4 dimension tables (Customers, Products, Geography, Calendar)',
        'Executive summary page with dynamic KPI cards: Total Revenue, Gross Margin %, Total Orders, and Average Order Value (AOV)',
        'Month-over-month (MoM) and Year-over-Year (YoY) revenue comparison charts with date slicers',
        'Customer segmentation breakdown highlighting top 20% high-value accounts'
      ],
      deliverables: [
        'Interactive dashboard published on Tableau Public or Power BI Service',
        'SQL script file containing data preparation and validation queries',
        'Executive one-page PDF summary highlighting key business findings'
      ],
      productionExpectations: [
        'Zero broken relationships or circular dependencies in the data model',
        'Intuitive UI with consistent corporate color palette and accessible contrast'
      ],
      aiIntegration: 'Use AI to generate mock transactional retail sales records with seasonal trends.'
    },
    {
      id: 'da-proj-2',
      title: 'SaaS Customer Churn & Cohort Retention Analysis',
      difficulty: 'Intermediate',
      estimatedTime: '4 weeks',
      objective: 'Conduct an in-depth customer retention and churn analysis using advanced SQL window functions, Python Pandas, and Seaborn heatmaps.',
      technologies: ['Python (Pandas, NumPy)', 'PostgreSQL (Window Functions, CTEs)', 'Seaborn / Matplotlib', 'Jupyter Notebook'],
      skillsPracticed: ['Cohort analysis', 'Window functions', 'Data cleaning', 'Heatmap visualization', 'Predictive churn modeling'],
      requirements: [
        'Advanced SQL queries calculating monthly cohort retention rates over a 12-month period using CTEs and window functions',
        'Pandas data pipeline cleaning customer usage logs, identifying login frequency drop-offs and subscription cancellations',
        'Seaborn triangular cohort retention heatmap displaying retention percentages over time',
        'Logistic Regression model identifying the top 3 behavioral indicators that precede customer cancellations'
      ],
      deliverables: [
        'Documented Jupyter Notebook with annotated code and high-resolution chart exports',
        'SQL query script producing the cohort retention matrix',
        'Slide deck presentation with strategic recommendations to reduce churn by 5%'
      ],
      productionExpectations: [
        'Clean, reproducible Python code adhering to PEP 8 standards',
        'Clear separation of data preparation from statistical modeling'
      ],
      aiIntegration: 'Use AI to assist with matrix reshaping (pivot_table/melt) for cohort triangle generation.'
    },
    {
      id: 'da-proj-3',
      title: 'E-Commerce A/B Experimentation & Conversion Optimization Analysis',
      difficulty: 'Production',
      estimatedTime: '5 weeks',
      objective: 'Design, evaluate, and present the results of an e-commerce checkout redesign A/B experiment using rigorous hypothesis testing and power analysis.',
      technologies: ['Python (SciPy, Statsmodels)', 'SQL', 'A/B Testing Frameworks', 'Seaborn', 'PowerPoint / Slide Deck'],
      skillsPracticed: ['Hypothesis testing', 'Sample size estimation', 'Two-sample t-test', 'Chi-Square test', 'Business decision modeling'],
      requirements: [
        'Sample size determination based on baseline conversion rate (3.5%), Minimum Detectable Effect (MDE 10%), 80% power, 5% alpha',
        'Data integrity checks: verifying 50/50 Sample Ratio Mismatch (SRM) using a Chi-Square goodness-of-fit test',
        'Statistical hypothesis testing on Primary Metric (Conversion Rate) and Guardrail Metric (Average Order Value)',
        'Segmented analysis evaluating performance across mobile vs desktop and new vs returning visitors to detect Simpson’s Paradox'
      ],
      deliverables: [
        'Comprehensive analytical report detailing methodology, p-values, confidence intervals, and conclusion',
        'Clean Jupyter Notebook with complete SciPy statistical test executions',
        'Executive presentation slide deck with a clear Go/No-Go launch recommendation and expected annualized revenue impact'
      ],
      productionExpectations: [
        'Mathematically sound statistical conclusions without p-hacking or premature peeking bias',
        'Actionable business recommendations grounded in financial revenue projections'
      ],
      aiIntegration: 'Use AI to generate synthetic A/B test event logs with controlled conversion lift and noise.'
    }
  ],
  checklist: {
    technicalSkills: [
      'Advanced spreadsheet modeling (Excel/Sheets: XLOOKUP, Pivot Tables, SUMIFS)',
      'SQL fluency: aggregations, multi-table joins, subqueries, and date manipulation',
      'Advanced SQL: Window Functions (ROW_NUMBER, RANK, LEAD, LAG) and CTEs',
      'Python data manipulation with Pandas, NumPy, and Jupyter Notebooks',
      'Data cleaning: handling missing values, type conversions, and deduplication',
      'Business Intelligence dashboards in Power BI or Tableau with Star Schema modeling',
      'Data visualization principles with Matplotlib, Seaborn, and storytelling hygiene',
      'Applied business statistics: Normal distribution, Central Limit Theorem, hypothesis testing',
      'A/B testing experimentation: sample size calculation, p-values, t-tests, and SRM detection',
      'Predictive analytics basics: Linear & Logistic Regression with scikit-learn'
    ],
    projects: [
      'Executive Sales & Operations dashboard in Power BI or Tableau with star schema',
      'SaaS customer churn and cohort retention analysis with SQL window functions and Python',
      'E-commerce A/B experiment evaluation with hypothesis testing and launch recommendation',
      'All projects documented on GitHub with public interactive dashboard links'
    ],
    csFundamentals: [
      'Relational database architecture: tables, rows, primary/foreign keys, indexing',
      'Data warehousing concepts: OLAP vs OLTP, Star Schema, Fact vs Dimension tables',
      'Basic algorithmic complexity: understanding query execution time on large datasets',
      'Statistical theory: sampling distributions, confidence intervals, probability'
    ],
    tools: [
      'Relational database query tools: DBeaver, pgAdmin, BigQuery / Snowflake consoles',
      'BI platforms: Power BI Desktop / Service or Tableau Public / Desktop',
      'Python data environment: Jupyter Notebooks, VS Code, Google Colab',
      'Git version control for sharing reproducible analytical scripts and notebooks'
    ],
    deployment: [
      'Publishing interactive dashboards to Tableau Public or Power BI Service',
      'Configuring scheduled automated data refreshes from underlying database sources',
      'Exporting clean presentation slide decks and executive PDF summary briefs',
      'Hosting reproducible Jupyter Notebooks on GitHub with clean rendered outputs'
    ],
    portfolio: [
      'Online analytics portfolio showcasing interactive dashboard links and case studies',
      'Clear business context provided for each project: Problem, Approach, Insights, Impact',
      'Executive-ready presentation slide decks accompanying each technical repository',
      'Clean visualization design adhering to data storytelling best practices'
    ],
    github: [
      'Public GitHub repositories with clean, well-commented SQL scripts and Python code',
      'Comprehensive READMEs with dashboard screenshots and key finding summaries',
      'Clean directory structure separating raw data, processed scripts, and slide presentations',
      'Clean commit history following Conventional Commits format'
    ],
    resume: [
      'Single-page ATS-optimized Data Analyst resume in PDF format',
      'Quantifiable bullet points highlighting business revenue impact, cost savings, and process automation',
      'Targeted analytics keywords matching current job postings (SQL, Power BI, Tableau, Python, A/B Testing)',
      'Direct links to Tableau Public profile, GitHub repositories, and LinkedIn'
    ],
    interviewReadiness: [
      'Ability to solve live complex SQL whiteboard queries under 30-minute time constraints',
      'Structured approach to product and business metric drop case study questions',
      'Clear articulation of A/B testing principles, p-values, and statistical power to business stakeholders',
      'Polished STAR stories demonstrating analytical problem-solving and cross-functional influence'
    ]
  }
};

if (typeof window !== 'undefined') {
  window.careerRoadmapsRegistry = window.careerRoadmapsRegistry || {};
  window.careerRoadmapsRegistry['dataAnalyst'] = dataAnalystRoadmap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dataAnalystRoadmap;
}
