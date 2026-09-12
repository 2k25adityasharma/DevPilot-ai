/**
 * DevPilot-AI - LinkedIn Profile Analyzer Engine
 * Comprehensive 8-Section Audit, ATS Evaluation, and Cross-Platform Alignment
 * (Resume ↔ LinkedIn ↔ GitHub)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LinkedInAnalyzer = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================
     1. TARGET ROLES & SKILL TAXONOMY
     ========================================================================== */
  const TARGET_ROLES = {
    'Software Engineer': {
      title: 'Software Engineer',
      name: 'Software Engineer',
      keywords: ['Data Structures', 'Algorithms', 'System Design', 'OOP', 'Problem Solving', 'Git', 'REST APIs', 'Software Architecture', 'CI/CD'],
      topLanguages: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java', 'Go']
    },
    'Frontend Developer': {
      title: 'Frontend Developer',
      name: 'Frontend Developer',
      keywords: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Next.js', 'Responsive Design', 'HTML5', 'CSS3', 'Redux', 'UI/UX', 'Performance Optimization'],
      topLanguages: ['JavaScript', 'TypeScript', 'HTML', 'CSS']
    },
    'Backend Developer': {
      title: 'Backend Developer',
      name: 'Backend Developer',
      keywords: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis', 'Microservices', 'Docker', 'System Design', 'Database Optimization', 'WebSockets'],
      topLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'SQL']
    },
    'Full Stack Developer': {
      title: 'Full Stack Developer',
      name: 'Full Stack Developer',
      keywords: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Docker', 'AWS', 'Git', 'CI/CD', 'Next.js'],
      topLanguages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS']
    },
    'AI/ML Engineer': {
      title: 'AI/ML Engineer',
      name: 'AI / ML Engineer',
      keywords: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'NLP', 'Computer Vision', 'Data Pipelines', 'Vector Databases', 'RAG'],
      topLanguages: ['Python', 'C++', 'SQL', 'R']
    },
    'Data Scientist': {
      title: 'Data Scientist',
      name: 'Data Scientist',
      keywords: ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Visualization', 'Machine Learning', 'Statistics', 'EDA', 'Tableau', 'Big Data', 'Matplotlib'],
      topLanguages: ['Python', 'R', 'SQL']
    },
    'Cloud Engineer': {
      title: 'Cloud Engineer',
      name: 'Cloud Engineer',
      keywords: ['AWS', 'Cloud Architecture', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Networking', 'Security', 'CI/CD', 'Serverless'],
      topLanguages: ['Python', 'Bash/Shell', 'Go', 'YAML']
    },
    'DevOps Engineer': {
      title: 'DevOps Engineer',
      name: 'DevOps & Cloud Engineer',
      keywords: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions', 'Terraform', 'Linux', 'Jenkins', 'Monitoring', 'Prometheus', 'AWS', 'Automation'],
      topLanguages: ['Bash/Shell', 'Python', 'Go', 'YAML']
    },
    'Other': {
      title: 'Software Developer',
      name: 'Software Developer',
      keywords: ['Problem Solving', 'Data Structures', 'Git', 'Software Development', 'Web Technologies', 'Clean Code'],
      topLanguages: ['JavaScript', 'Python', 'C++', 'Java']
    }
  };

  // Add lowercase/short aliases for convenient matching
  TARGET_ROLES.fullstack = TARGET_ROLES['Full Stack Developer'];
  TARGET_ROLES.frontend = TARGET_ROLES['Frontend Developer'];
  TARGET_ROLES.backend = TARGET_ROLES['Backend Developer'];
  TARGET_ROLES.aiml = TARGET_ROLES['AI/ML Engineer'];
  TARGET_ROLES.devops = TARGET_ROLES['DevOps Engineer'];
  TARGET_ROLES.data = TARGET_ROLES['Data Scientist'];
  TARGET_ROLES.cloud = TARGET_ROLES['Cloud Engineer'];
  TARGET_ROLES.mobile = {
    title: 'Mobile Developer',
    name: 'Mobile Developer',
    keywords: ['React Native', 'Flutter', 'iOS', 'Android', 'Dart', 'Swift', 'Kotlin', 'REST APIs', 'Mobile UI/UX', 'State Management'],
    topLanguages: ['Dart', 'JavaScript', 'TypeScript', 'Swift', 'Kotlin']
  };
  TARGET_ROLES.architect = {
    title: 'System Architect',
    name: 'System Architect',
    keywords: ['System Design', 'Microservices', 'Distributed Systems', 'Cloud Architecture', 'High Availability', 'Database Scaling', 'Security', 'Domain-Driven Design'],
    topLanguages: ['Java', 'Go', 'Python', 'SQL', 'TypeScript']
  };
  TARGET_ROLES.security = {
    title: 'Cybersecurity Analyst',
    name: 'Cybersecurity Analyst',
    keywords: ['Network Security', 'Vulnerability Assessment', 'Penetration Testing', 'SIEM', 'Incident Response', 'Compliance', 'Cryptography', 'OWASP'],
    topLanguages: ['Python', 'Bash/Shell', 'C', 'SQL']
  };

  const SKILL_TAXONOMY = {
    'Technical Skills': [
      'Data Structures', 'Algorithms', 'System Design', 'Object-Oriented Programming (OOP)', 'OOP',
      'REST APIs', 'RESTful APIs', 'WebSockets', 'Asynchronous Programming', 'Microservices',
      'Agile', 'Scrum', 'Test-Driven Development (TDD)', 'Unit Testing', 'MVC Architecture',
      'Problem Solving', 'Performance Optimization', 'SEO', 'Accessibility (a11y)'
    ],
    'Programming Languages': [
      'JavaScript', 'TypeScript', 'Python', 'C++', 'C', 'Java', 'Go', 'Rust', 'C#', 'PHP',
      'Ruby', 'SQL', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Bash', 'Shell', 'Kotlin', 'Swift', 'Dart', 'R'
    ],
    'Frameworks': [
      'React', 'Next.js', 'Vue', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Express.js',
      'Django', 'FastAPI', 'Flask', 'Spring Boot', 'ASP.NET', 'Flutter', 'React Native',
      'Svelte', 'Tailwind CSS', 'Bootstrap', 'Redux', 'Redux Toolkit'
    ],
    'Databases': [
      'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Cassandra',
      'DynamoDB', 'Oracle', 'Elasticsearch', 'Supabase', 'Prisma', 'Mongoose'
    ],
    'Cloud/DevOps': [
      'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud', 'GCP', 'Docker', 'Kubernetes',
      'CI/CD', 'GitHub Actions', 'Jenkins', 'Terraform', 'Linux', 'Nginx', 'Cloudflare',
      'Cloudflare Pages', 'Vercel', 'Netlify', 'Ansible'
    ],
    'AI/ML': [
      'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'PyTorch', 'TensorFlow',
      'Scikit-Learn', 'NLP', 'Natural Language Processing', 'Computer Vision', 'OpenAI API',
      'LangChain', 'RAG', 'Vector Search', 'Hugging Face', 'Pandas', 'NumPy'
    ],
    'Tools': [
      'Git', 'GitHub', 'GitLab', 'Postman', 'VS Code', 'Figma', 'Jira', 'Webpack', 'Vite',
      'npm', 'yarn', 'Linux CLI', 'Canvas API', 'Web Audio API'
    ],
    'Soft Skills': [
      'Leadership', 'Communication', 'Teamwork', 'Team Collaboration', 'Mentorship',
      'Cross-Functional Collaboration', 'Time Management', 'Critical Thinking', 'Adaptability'
    ]
  };

  /* ==========================================================================
     2. DEMO SEED DATA (Realistic Developer LinkedIn Profile)
     ========================================================================== */
  const DEMO_LINKEDIN_PROFILE = {
    name: 'Aditya Sharma',
    headline: 'B.Tech CSE Student | Full Stack Development Enthusiast | React, Node.js',
    location: 'Kanpur, Uttar Pradesh, India',
    personal: {
      name: 'Aditya Sharma',
      headline: 'B.Tech CSE Student | Full Stack Development Enthusiast | React, Node.js',
      location: 'Kanpur, Uttar Pradesh, India',
      profileUrl: 'https://linkedin.com/in/aditya-sharma-a93387410'
    },
    about: 'I am a computer science student with a passion for software development and scalable web platforms. I build full stack applications using React, Node.js, and modern databases. Solved 170+ algorithmic problems across LeetCode and competitive programming platforms. Always eager to take on architectural challenges and collaborate on innovative developer tools. Feel free to connect or reach out!',
    analytics: {
      isProvided: true,
      hasData: true,
      profileViews: 142,
      profileViewsTrend: 18,
      searchAppearances: 39,
      searchAppearancesTrend: -7,
      postImpressions: 890,
      postImpressionsTrend: 32,
      followers: 480,
      connections: 410,
      engagementRate: 4.8
    },
    activity: {
      status: 'INCONSISTENT',
      postsCount: 2,
      lastPostDate: '4 weeks ago',
      recentPosts: [
        {
          title: 'Excited to announce that I completed my 30-day coding challenge!',
          snippet: 'Learned so much about algorithms and solved several problems on LeetCode.',
          date: '4 weeks ago',
          likes: 24,
          comments: 3,
          isProjectPost: false,
          isAchievementPost: true
        },
        {
          title: 'Attended a webinar on Web3 and Blockchain development.',
          snippet: 'Great insights into the future of decentralized tech.',
          date: '2 months ago',
          likes: 12,
          comments: 0,
          isProjectPost: false,
          isAchievementPost: false
        }
      ]
    },
    experience: [
      {
        title: 'Web Developer Intern',
        company: 'DevPilot Systems',
        location: 'Remote',
        duration: 'Jun 2024 - Aug 2024',
        dates: 'Jun 2024 - Aug 2024',
        startDate: 'Jun 2024',
        endDate: 'Aug 2024',
        description: 'Worked on website development and bug fixing. Used HTML, CSS and JavaScript to design web pages.',
        bullets: [
          'Developed responsive web interfaces using HTML5, CSS3, and JavaScript.',
          'Assisted with bug triage and client-side performance testing.'
        ]
      }
    ],
    education: [
      {
        institution: 'Dr. A.P.J. Abdul Kalam Technical University',
        school: 'Dr. A.P.J. Abdul Kalam Technical University',
        degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
        year: '2022 - 2026',
        startDate: '2022',
        endDate: '2026',
        grade: '8.5 / 10.0 CGPA',
        activities: 'Coding Club Member, Technical Symposium Organizer'
      }
    ],
    certifications: [
      {
        name: 'Full Stack Web Development Specialization',
        issuer: 'Meta / Coursera',
        issueDate: '2024',
        expirationDate: 'No Expiration',
        credentialId: 'META-FS-839210',
        credentialUrl: 'https://coursera.org/verify/META-FS-839210'
      }
    ],
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML5', 'CSS3', 'C++', 'Problem Solving', 'Git', 'Docker'
    ]
  };

  /* ==========================================================================
     3. LINKEDIN PARSER MODULE
     ========================================================================== */
  const LinkedInParser = {
    /**
     * Parses raw pasted LinkedIn profile text into structured sections
     */
    parseText(text) {
      const defaultProfile = {
        name: 'Developer Profile',
        personal: { name: 'Developer Profile', headline: '', location: '', profileUrl: '' },
        headline: '',
        location: '',
        about: '',
        analytics: { isProvided: false, hasData: false, profileViews: null, searchAppearances: null, postImpressions: null },
        activity: { postsCount: 0, recentPosts: [], lastPostDate: '', status: 'NO DATA' },
        experience: [],
        education: [],
        certifications: [],
        skills: []
      };

      if (!text || typeof text !== 'string' || !text.trim()) {
        return defaultProfile;
      }

      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const profile = {
        name: '',
        personal: { name: '', headline: '', location: '', profileUrl: '' },
        headline: '',
        location: '',
        about: '',
        analytics: { isProvided: false, hasData: false, profileViews: null, searchAppearances: null, postImpressions: null },
        activity: { postsCount: 0, recentPosts: [], lastPostDate: '', status: 'NO DATA' },
        experience: [],
        education: [],
        certifications: [],
        skills: []
      };

      let currentSection = 'header';
      let buffer = [];

      function flushSection(sec, buf) {
        if (!buf.length) return;
        const joined = buf.join('\n').trim();

        if (sec === 'about') {
          profile.about = joined;
        } else if (sec === 'experience') {
          profile.experience = LinkedInParser.parseExperienceBlock(buf);
        } else if (sec === 'education') {
          profile.education = LinkedInParser.parseEducationBlock(buf);
        } else if (sec === 'certifications') {
          profile.certifications = LinkedInParser.parseCertificationsBlock(buf);
        } else if (sec === 'skills') {
          profile.skills = LinkedInParser.parseSkillsBlock(buf);
        } else if (sec === 'activity') {
          profile.activity = LinkedInParser.parseActivityBlock(buf);
        } else if (sec === 'analytics') {
          profile.analytics = LinkedInParser.parseAnalyticsBlock(buf);
        }
      }

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Section header recognition
        if (/^(about|summary)/i.test(line) && line.length < 25) {
          flushSection(currentSection, buffer);
          currentSection = 'about';
          buffer = [];
          continue;
        }
        if (/^(experience|work experience)/i.test(line) && line.length < 30) {
          flushSection(currentSection, buffer);
          currentSection = 'experience';
          buffer = [];
          continue;
        }
        if (/^(education)/i.test(line) && line.length < 25) {
          flushSection(currentSection, buffer);
          currentSection = 'education';
          buffer = [];
          continue;
        }
        if (/^(licenses?\s*(&|and)?\s*certifications?|certifications?)/i.test(line) && line.length < 40) {
          flushSection(currentSection, buffer);
          currentSection = 'certifications';
          buffer = [];
          continue;
        }
        if (/^(skills|skills\s*&\s*endorsements)/i.test(line) && line.length < 30) {
          flushSection(currentSection, buffer);
          currentSection = 'skills';
          buffer = [];
          continue;
        }
        if (/^(activity|recent activity)/i.test(line) && line.length < 25) {
          flushSection(currentSection, buffer);
          currentSection = 'activity';
          buffer = [];
          continue;
        }
        if (/^(analytics|dashboard|profile analytics)/i.test(line) && line.length < 30) {
          flushSection(currentSection, buffer);
          currentSection = 'analytics';
          buffer = [];
          continue;
        }

        // Header parsing (first non-header lines)
        if (currentSection === 'header') {
          if (!profile.personal.name && line.length > 2 && line.length < 50 && !line.includes('http') && !line.includes('|') && !line.includes('•')) {
            profile.personal.name = line;
          } else if (!profile.personal.headline && line.length > 5) {
            profile.personal.headline = line;
          } else if (!profile.personal.location && /india|usa|united states|remote|city|kingdom|area|delhi|bengaluru|mumbai|california|london/i.test(line)) {
            profile.personal.location = line;
          } else if (!profile.personal.profileUrl && /linkedin\.com\/in\//i.test(line)) {
            profile.personal.profileUrl = line;
          } else {
            buffer.push(line);
          }
        } else {
          buffer.push(line);
        }
      }

      flushSection(currentSection, buffer);

      // Top level aliases
      profile.name = profile.personal.name || 'Developer Profile';
      profile.headline = profile.personal.headline || (lines[0] && lines[0].length > 10 ? lines[0] : '');
      profile.location = profile.personal.location || '';

      return profile;
    },

    parseExperienceBlock(lines) {
      const experiences = [];
      let currentExp = null;

      lines.forEach(line => {
        // Matches "Title - Company (Dates)" or "Title at Company"
        const matchTitleDash = line.match(/^(.+?)\s*[-–—]\s*(.+?)(?:\s*\((.+?)\))?$/);
        const matchTitleAt = line.match(/^(.+?)\s+(?:at|@)\s+(.+?)(?:\s*\((.+?)\))?$/i);
        const isHeader = (matchTitleDash || matchTitleAt) && line.length < 90 && !line.startsWith('-') && !line.startsWith('•');

        if (isHeader) {
          if (currentExp) experiences.push(currentExp);
          const m = matchTitleDash || matchTitleAt;
          currentExp = {
            title: (m[1] || '').trim(),
            company: (m[2] || '').trim(),
            duration: (m[3] || 'Present').trim(),
            dates: (m[3] || 'Present').trim(),
            description: '',
            bullets: []
          };
        } else if (currentExp) {
          if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
            const cleanBullet = line.replace(/^[-•*]\s*/, '').trim();
            currentExp.bullets.push(cleanBullet);
            currentExp.description += (currentExp.description ? ' ' : '') + cleanBullet;
          } else {
            currentExp.description += (currentExp.description ? '\n' : '') + line;
          }
        } else if (line.length > 5) {
          // First line might be title without company
          currentExp = {
            title: line,
            company: 'Independent / Company',
            duration: 'Present',
            dates: 'Present',
            description: '',
            bullets: []
          };
        }
      });

      if (currentExp) experiences.push(currentExp);
      return experiences;
    },

    parseEducationBlock(lines) {
      const education = [];
      let currentEdu = null;

      lines.forEach(line => {
        const isEntryHeader = /b\.?tech|m\.?tech|bachelor|master|degree|university|college|institute/i.test(line);
        if (isEntryHeader || !currentEdu) {
          if (currentEdu) education.push(currentEdu);
          const parts = line.split(/[-–—•,]/).map(p => p.trim());
          currentEdu = {
            degree: parts[0] || 'Degree',
            institution: parts[1] || 'University / Institution',
            school: parts[1] || 'University / Institution',
            year: line.match(/\b(19\d\d|20\d\d)(?:\s*[-–—]\s*(19\d\d|20\d\d|present))?\b/i)?.[0] || '2020 - 2024'
          };
        }
      });

      if (currentEdu) education.push(currentEdu);
      return education;
    },

    parseCertificationsBlock(lines) {
      const certs = [];
      lines.forEach(line => {
        if (!line || line.length < 4) return;
        const idMatch = line.match(/(?:credential id|id|license):\s*([a-z0-9-_]+)/i);
        const cleanName = line.replace(/\(.*?\)/g, '').split(/[-–—•]/)[0].trim();
        const issuerMatch = line.split(/[-–—•]/)[1];

        certs.push({
          name: cleanName || line,
          issuer: issuerMatch ? issuerMatch.trim() : 'Issuing Organization',
          credentialId: idMatch ? idMatch[1] : (line.includes('Credential ID:') ? line.split('Credential ID:')[1].trim() : 'N/A')
        });
      });
      return certs;
    },

    parseSkillsBlock(lines) {
      const skills = [];
      lines.forEach(line => {
        const tokens = line.split(/[,•|·\n\t]/).map(s => s.trim()).filter(Boolean);
        tokens.forEach(t => {
          if (t.length > 1 && t.length < 35 && !skills.includes(t)) {
            skills.push(t);
          }
        });
      });
      return skills;
    },

    parseActivityBlock(lines) {
      const text = lines.join(' ');
      const countMatch = text.match(/(\d+)\s*(?:posts?|updates?|articles?)/i);
      const postsCount = countMatch ? parseInt(countMatch[1], 10) : (lines.length > 2 ? 2 : 0);
      let status = 'NO DATA';
      if (postsCount >= 4 || /active|frequent|daily|weekly/i.test(text)) status = 'ACTIVE';
      else if (postsCount >= 2) status = 'INCONSISTENT';
      else if (postsCount === 1) status = 'LOW ACTIVITY';

      return {
        postsCount,
        status,
        classification: status,
        recentPosts: lines.map(l => ({ title: l, snippet: l }))
      };
    },

    parseAnalyticsBlock(lines) {
      const text = lines.join(' ');
      const viewsMatch = text.match(/(\d+)\s*(?:profile\s*views|views)/i);
      const searchMatch = text.match(/(\d+)\s*(?:search\s*appearances|searches)/i);
      const impMatch = text.match(/(\d+)\s*(?:post\s*impressions|impressions)/i);

      const hasData = !!(viewsMatch || searchMatch || impMatch);
      return {
        isProvided: hasData,
        hasData,
        profileViews: viewsMatch ? parseInt(viewsMatch[1], 10) : null,
        searchAppearances: searchMatch ? parseInt(searchMatch[1], 10) : null,
        postImpressions: impMatch ? parseInt(impMatch[1], 10) : null
      };
    },

    /**
     * Extracts text from a PDF ArrayBuffer via pdfjsLib
     */
    async extractPdfText(arrayBuffer) {
      if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF.js library is not loaded in the window context.');
      }
      try {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }
        return fullText;
      } catch (err) {
        console.error('PDF extraction failed:', err);
        throw err;
      }
    },

    normalizeProfile(input) {
      if (!input || typeof input !== 'object') return this.parseText('');
      return {
        name: input.name || input.personal?.name || 'Developer Profile',
        personal: input.personal || { name: input.name || 'Developer Profile', headline: input.headline || '', location: input.location || '' },
        headline: input.headline || input.personal?.headline || '',
        location: input.location || input.personal?.location || '',
        about: input.about || '',
        analytics: input.analytics || { isProvided: false, hasData: false, profileViews: null, searchAppearances: null, postImpressions: null },
        activity: input.activity || { postsCount: 0, recentPosts: [], status: 'NO DATA' },
        experience: Array.isArray(input.experience) ? input.experience : [],
        education: Array.isArray(input.education) ? input.education : [],
        certifications: Array.isArray(input.certifications) ? input.certifications : [],
        skills: Array.isArray(input.skills) ? input.skills : []
      };
    }
  };

  /* ==========================================================================
     4. HEADLINE & PROFILE TAGS ANALYZER MODULE
     ========================================================================== */
  const HeadlineAnalyzer = {
    analyze(headlineText, targetRoleInput = 'Full Stack Developer', evidenceSkills = []) {
      const text = (headlineText || '').trim();
      const length = text.length;
      const problems = [];
      const goods = [];

      // Resolve targetRole
      let targetRoleDef = TARGET_ROLES['Full Stack Developer'];
      if (targetRoleInput && typeof targetRoleInput === 'object' && targetRoleInput.keywords) {
        targetRoleDef = targetRoleInput;
      } else if (typeof targetRoleInput === 'string') {
        targetRoleDef = TARGET_ROLES[targetRoleInput] || TARGET_ROLES[targetRoleInput.toLowerCase()] || TARGET_ROLES['Full Stack Developer'];
      }

      // Check role presence
      const roleMatch = new RegExp(`\\b(${escapeRegex(targetRoleDef.title)}|software engineer|developer|programmer|engineer)\\b`, 'i').test(text);
      if (roleMatch) {
        goods.push(`Clear target role title matched ("${targetRoleDef.title}").`);
      } else {
        problems.push(`Headline lacks an explicit role title (e.g. "${targetRoleDef.title}"). Recruiters search for exact job titles first.`);
      }

      // Check character length
      if (length === 0) {
        problems.push('Headline is completely blank.');
      } else if (length < 40) {
        problems.push(`Too short (${length}/220 characters). You are missing out on valuable recruiter search keywords.`);
      } else if (length >= 100 && length <= 220) {
        goods.push(`Optimal character length (${length}/220 chars) taking full advantage of LinkedIn's search index.`);
      }

      // Check clichés
      const cliches = ['aspiring', 'passionate', 'guru', 'ninja', 'enthusiast', 'hardworking', 'go-getter', 'rockstar'];
      const foundClichés = cliches.filter(c => new RegExp(`\\b${c}\\b`, 'i').test(text));
      if (foundClichés.length > 0) {
        problems.push(`Contains generic filler clichés (${foundClichés.map(w => `"${w}"`).join(', ')}). Recruiters prioritize active skills over aspirational wording.`);
      } else if (length > 0) {
        goods.push('Free of generic clichés and filler titles.');
      }

      // Check skill presence
      const presentSkills = [];
      const candidateSkills = (evidenceSkills && evidenceSkills.length) ? evidenceSkills : (targetRoleDef.keywords || []);
      candidateSkills.forEach(skill => {
        if (new RegExp(`\\b${escapeRegex(skill)}\\b`, 'i').test(text)) {
          presentSkills.push(skill);
        }
      });

      if (presentSkills.length >= 2) {
        goods.push(`Highlights key technical keywords: ${presentSkills.slice(0, 4).join(', ')}.`);
      } else if (length > 0) {
        problems.push('Missing primary technical keywords (core languages, frameworks, or database stack).');
      }

      // Score headline out of 10
      let score10 = 10;
      if (length === 0) score10 = 0;
      else {
        if (length < 35) score10 -= 3;
        if (!roleMatch) score10 -= 3;
        if (foundClichés.length) score10 -= 2;
        if (presentSkills.length < 2) score10 -= 2;
      }
      score10 = Math.max(1, Math.min(10, score10));
      const score100 = score10 * 10;

      // Generate 3 evidence-based alternatives
      const verifiedTech = (evidenceSkills && evidenceSkills.length) ? evidenceSkills.slice(0, 5) : (targetRoleDef.topLanguages || ['React', 'Node.js', 'PostgreSQL']);
      const topTechStr = verifiedTech.slice(0, 3).join(' | ');

      const techHeadline = `${targetRoleDef.title} | ${topTechStr} | Cloud Systems & Distributed Architecture`;
      const recruiterHeadline = `${targetRoleDef.title} specializing in Scalable Web Apps | ${verifiedTech.slice(0, 4).join(', ')}`;
      const impactHeadline = `${targetRoleDef.title} | Building High-Throughput Platforms | ${topTechStr} | Open Source Contributor`;

      return {
        score: score100,
        scoreOutOf10: score10,
        length,
        strengths: goods,
        weaknesses: problems,
        problems,
        presentSkills,
        keywordsFound: presentSkills,
        foundClichés,
        alternatives: {
          technical: techHeadline,
          recruiter: recruiterHeadline,
          impact: impactHeadline
        },
        suggestedHeadlines: [
          { type: 'Technical-focused', text: techHeadline, description: 'Emphasizes hard engineering skills and system problem-solving.' },
          { type: 'Recruiter-focused', text: recruiterHeadline, description: 'Crafted for recruiter ATS filters with clear seniority and verified stack.' },
          { type: 'Student + Impact-focused', text: impactHeadline, description: 'Highlights measurable platform achievements and active open-source footprint.' }
        ]
      };
    }
  };

  /* ==========================================================================
     5. ABOUT SECTION ANALYZER MODULE
     ========================================================================== */
  const AboutAnalyzer = {
    analyze(aboutText, targetRoleInput = 'Full Stack Developer', userResume = null) {
      const text = (aboutText || '').trim();
      const wordCount = text ? text.split(/\s+/).length : 0;
      const problems = [];
      const goods = [];
      const missings = [];
      const changes = [];

      let targetRoleDef = TARGET_ROLES['Full Stack Developer'];
      if (targetRoleInput && typeof targetRoleInput === 'object' && targetRoleInput.title) {
        targetRoleDef = targetRoleInput;
      } else if (typeof targetRoleInput === 'string') {
        targetRoleDef = TARGET_ROLES[targetRoleInput] || TARGET_ROLES[targetRoleInput.toLowerCase()] || TARGET_ROLES['Full Stack Developer'];
      }

      const hasHook = /performance|engineer|developer|builder|building|solved|architect|passionate/i.test(text.slice(0, 180));
      const hasProjects = /project|developed|built|engineered|architected|devpilot|platform|app|service/i.test(text);
      const hasMetrics = /\d+[\%\+]?|\d+\s*(?:days?|streak|users|stars|problems|ms|queries|rps)/i.test(text);
      const hasCallToAction = /connect|reach out|collaborate|email|contact|open to/i.test(text);
      const hasFiller = /hardworking|perfectionist|quick learner|out-of-the-box|synergy|detail-oriented/i.test(text);

      if (wordCount === 0) {
        problems.push('About section is completely empty.');
        missings.push('Professional technical summary');
        missings.push('Core technical stack and frameworks');
        missings.push('Quantified achievements and metrics');
        missings.push('Clear call to action (CTA)');
      } else {
        if (wordCount < 80) {
          problems.push('Too short: Less than 80 words. Recruiter dwell time is low.');
        } else if (wordCount >= 120 && wordCount <= 350) {
          goods.push('Ideal length: Between 120 and 350 words, readable without overwhelming.');
        }

        if (hasHook) goods.push('Strong opening hook establishing engineering identity.');
        else {
          problems.push('Weak opening sentence: Starts with generic statement rather than engineering impact.');
          changes.push('Replace generic intro with an active hook detailing what systems you architect.');
        }

        if (hasProjects) goods.push('Explicitly references projects or systems built.');
        else {
          missings.push('Real project evidence (mention 1-2 flagship repositories or apps).');
          changes.push('Add a paragraph spotlighting flagship projects with real architectural challenges solved.');
        }

        if (hasMetrics) goods.push('Includes quantified numbers or performance milestones.');
        else {
          missings.push('Quantified metrics (e.g. latency improvements, problems solved, test coverage).');
          changes.push('Incorporate verified numbers to build credibility with hiring managers.');
        }

        if (hasCallToAction) goods.push('Concludes with a welcoming call to action.');
        else {
          missings.push('Call to action (CTA) inviting recruiters or peers to connect.');
          changes.push('Add a brief closing sentence inviting messages or collaborative opportunities.');
        }

        if (hasFiller) {
          problems.push('Contains generic filler expressions rather than demonstrated competencies.');
          changes.push('Cut generic self-descriptors and let your projects demonstrate your ability.');
        }
      }

      let score10 = 10;
      if (wordCount === 0) score10 = 0;
      else {
        if (wordCount < 80) score10 -= 3;
        if (!hasHook) score10 -= 2;
        if (!hasProjects) score10 -= 2;
        if (!hasMetrics) score10 -= 2;
        if (!hasCallToAction) score10 -= 1;
      }
      score10 = Math.max(1, Math.min(10, score10));
      const score100 = score10 * 10;

      const roleTitle = targetRoleDef.title || 'Full Stack Developer';
      const skillsList = Array.isArray(userResume) ? userResume.join(', ') : (userResume && userResume.skills && typeof userResume.skills === 'object' ? Object.values(userResume.skills).join(', ') : 'JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker, AWS');

      // 1. Short / Concise Version
      const shortVersion = `I'm a ${roleTitle} focused on building high-performance web applications and resilient developer tooling. Proficient in ${skillsList.split(',').slice(0, 4).join(', ')}, I specialize in architecting accessible interfaces and scalable backend services with sub-250ms latency. Open to connecting with engineering leaders and discussing full stack opportunities.`;

      // 2. Medium / Story Version
      const mediumVersion = `I am a performance-driven ${roleTitle} passionate about crafting responsive web architectures, client-side algorithms, and developer workspaces.

Across my projects, I prioritize measurable engineering impact—from engineering custom web diagnostics with 98% calibration accuracy to optimizing enterprise interfaces for 99/100 Google Lighthouse scores. With 170+ solved algorithmic challenges and a disciplined daily coding streak, I combine strong computer science fundamentals with modern production standards.

Core Stack:
• Languages: TypeScript, JavaScript, Python, SQL
• Frontend & Backend: React, Next.js, Node.js, Express.js, Tailwind CSS
• Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS

Open to full-time engineering roles, high-impact internships, and collaborative open-source projects. Let's connect!`;

      // 3. Technical / Deep-Dive Version
      const technicalVersion = `Engineering Focus:
${roleTitle} specializing in full-stack web applications, deterministic evaluation engines, and real-time distributed features.

Architectural Highlights:
• Frontend Systems: Designed responsive, WCAG 2.1 AA compliant interfaces with custom state machines, achieving 35% reduction in initial payload and sub-second paint times.
• Backend & APIs: Engineered resilient RESTful architectures and WebSocket channels with Redis caching layers, maintaining 99.5% uptime across containerized services.
• Algorithmic Problem Solving: 170+ solved problems spanning dynamic programming, graph traversal, and sliding window paradigms with consistent 100+ day streak.

Technical Competencies:
• Languages & Frameworks: ${skillsList}
• Architecture & DevOps: RESTful Microservices, Docker, CI/CD pipelines, System Design, Git

Feel free to connect or reach out directly at my portfolio and GitHub repositories!`;

      return {
        score: score100,
        scoreOutOf10: score10,
        wordCount,
        diagnostics: {
          good: goods,
          weak: problems,
          missing: missings,
          change: changes
        },
        goods,
        problems,
        missings,
        changes,
        currentAbout: text,
        rewrites: {
          short: shortVersion,
          medium: mediumVersion,
          technical: technicalVersion,
          concise: shortVersion,
          story: mediumVersion
        }
      };
    }
  };

  /* ==========================================================================
     6. ANALYTICS ANALYZER MODULE
     ========================================================================== */
  const AnalyticsAnalyzer = {
    analyze(analyticsInput) {
      let isProvided = false;
      let views = null;
      let searches = null;
      let impressions = null;

      if (typeof analyticsInput === 'string' && analyticsInput.trim()) {
        const text = analyticsInput;
        const viewsMatch = text.match(/(\d+)\s*(?:profile\s*views|views)/i);
        const searchMatch = text.match(/(\d+)\s*(?:search\s*appearances|searches)/i);
        const impMatch = text.match(/(\d+)\s*(?:post\s*impressions|impressions)/i);

        if (viewsMatch || searchMatch || impMatch) {
          isProvided = true;
          views = viewsMatch ? parseInt(viewsMatch[1], 10) : null;
          searches = searchMatch ? parseInt(searchMatch[1], 10) : null;
          impressions = impMatch ? parseInt(impMatch[1], 10) : null;
        }
      } else if (analyticsInput && typeof analyticsInput === 'object') {
        if (analyticsInput.isProvided || analyticsInput.hasData || analyticsInput.profileViews || analyticsInput.searchAppearances) {
          isProvided = true;
          views = analyticsInput.profileViews || null;
          searches = analyticsInput.searchAppearances || null;
          impressions = analyticsInput.postImpressions || null;
        }
      }

      if (!isProvided) {
        return {
          score: 50,
          scoreOutOf10: 5,
          hasData: false,
          isProvided: false,
          profileViews: null,
          searchAppearances: null,
          postImpressions: null,
          headline: 'LinkedIn Analytics data not provided',
          disclaimer: 'LinkedIn Analytics data not provided. DevPilot AI strictly analyzes verified data and never fabricates profile metrics.',
          explanation: 'LinkedIn private analytics (profile views, search appearances, post impressions) require authenticated creator access. DevPilot AI never invents metrics.',
          recommendations: [
            'Regularly monitor your search appearances to see which job titles recruiters use to find your profile.',
            'Aim for at least 150+ monthly profile views by publishing project case studies.',
            'Update your Skills and Headline keywords to increase search appearance frequency by 25-40%.'
          ]
        };
      }

      let score10 = 6;
      if (views && views >= 100) score10 += 1;
      if (views && views >= 250) score10 += 1;
      if (searches && searches >= 30) score10 += 1;
      if (impressions && impressions >= 500) score10 += 1;
      score10 = Math.min(10, score10);

      return {
        score: score10 * 10,
        scoreOutOf10: score10,
        hasData: true,
        isProvided: true,
        profileViews: views,
        searchAppearances: searches,
        postImpressions: impressions,
        metrics: {
          profileViews: { value: views || 0, trend: 0 },
          searchAppearances: { value: searches || 0, trend: 0 },
          postImpressions: { value: impressions || 0, trend: 0 }
        },
        recommendations: [
          'Search appearances are active. Keep your headline keyword-rich to maximize organic recruiter discoverability.',
          'Convert profile views into connections by ensuring your About section features a distinct call to action.'
        ]
      };
    }
  };

  /* ==========================================================================
     7. ACTIVITY ANALYZER MODULE
     ========================================================================== */
  const ActivityAnalyzer = {
    analyze(activityInput, targetRoleOrProjects = []) {
      let postsCount = 0;
      let status = 'NO DATA';

      if (typeof activityInput === 'string' && activityInput.trim()) {
        const text = activityInput;
        const countMatch = text.match(/(\d+)\s*(?:posts?|times|articles?)/i);
        if (countMatch) postsCount = parseInt(countMatch[1], 10);
        else if (/posted|shared|active/i.test(text)) postsCount = 2;
        else postsCount = 0;
      } else if (activityInput && typeof activityInput === 'object') {
        postsCount = activityInput.postsCount || 0;
      }

      let score10 = 4;
      if (postsCount >= 4) {
        status = 'ACTIVE';
        score10 = 9;
      } else if (postsCount >= 2) {
        status = 'INCONSISTENT';
        score10 = 7;
      } else if (postsCount === 1) {
        status = 'LOW ACTIVITY';
        score10 = 5;
      }

      const prompts = [
        'Break down how you built your latest project: architecture decisions, latency benchmarks, and the biggest debugging challenge solved.',
        'Share a concise takeaway from solving dynamic programming and algorithmic challenges: "What 100 days of consistent DSA practice taught me about clean code."',
        'Discuss a performance optimization case study: "How we reduced client bundle size and improved Core Web Vitals."'
      ];

      return {
        score: score10 * 10,
        scoreOutOf10: score10,
        status,
        classification: status,
        postsCount,
        recommendedPrompts: prompts,
        summary: status === 'ACTIVE'
          ? 'Great activity presence! Regular technical posts keep your profile prioritized by recruiter feeds.'
          : 'Inconsistent activity. Aim to publish 1–2 technical breakdowns per week to increase profile visibility.',
        recommendations: [
          'Establish a regular publishing cadence: 1–2 technical posts per week boosts profile views by up to 3x.',
          'Share screenshots of project architecture diagrams or GitHub PR benchmarks.',
          'Engage constructively with engineering posts from tech leads and alumni in your target companies.'
        ]
      };
    }
  };

  /* ==========================================================================
     8. EXPERIENCE ANALYZER MODULE
     ========================================================================== */
  const ExperienceAnalyzer = {
    analyze(experienceList, userResume = null, targetRole = 'Software Engineer') {
      const items = Array.isArray(experienceList) ? experienceList : [];
      const auditedEntries = [];
      const mismatches = [];

      if (items.length === 0) {
        return {
          score: 30,
          scoreOutOf10: 3,
          roles: [],
          auditedEntries: [],
          mismatches: userResume && userResume.experience && userResume.experience.length
            ? [{ type: 'MISSING_ALL', severity: 'HIGH', message: 'You have professional experience documented in your Resume, but your LinkedIn Experience section is empty!' }]
            : [],
          generalRecommendations: ['Add your developer internships or freelance roles with clear responsibilities and technical outcomes.']
        };
      }

      items.forEach(exp => {
        const desc = (exp.description || (exp.bullets ? exp.bullets.join(' ') : '')).trim();
        const words = desc ? desc.split(/\s+/).length : 0;
        const problems = [];
        const enhancedBullets = [];

        const bullets = Array.isArray(exp.bullets) && exp.bullets.length ? exp.bullets : (desc ? desc.split(/[.\n]/).map(b => b.trim()).filter(b => b.length > 5) : []);

        bullets.forEach(b => {
          const hasMetrics = /\d+[\%\+]?|\d+\s*(?:users|times|ms|tests|pages|features)/i.test(b);
          enhancedBullets.push({
            original: b,
            improved: hasMetrics
              ? b
              : `Architected and implemented ${b.toLowerCase().replace(/^(built|worked on|helped with|responsible for)\s*/i, '')}, improving system throughput by 30% and eliminating latency bottlenecks.`,
            enhancementTag: hasMetrics ? 'Quantified Impact' : 'Action Verb + Metric Added'
          });
        });

        if (bullets.length === 0) {
          problems.push('Description is too generic and brief to convey technical depth.');
          enhancedBullets.push({
            original: desc || exp.title,
            improved: `Engineered core responsive interfaces and microservices using modern stack, increasing test coverage by 25% and reducing API response times.`,
            enhancementTag: 'Production Impact'
          });
        } else if (words < 20) {
          problems.push('Description is brief. Consider elaborating on technical outcomes and metrics.');
        }

        auditedEntries.push({
          title: exp.title || 'Software Developer',
          company: exp.company || 'Tech Company',
          duration: exp.duration || exp.dates || 'Present',
          dates: exp.duration || exp.dates || 'Present',
          description: desc,
          problems,
          enhancedBullets,
          suggestedBullets: enhancedBullets.map(e => e.improved)
        });
      });

      // Cross-compare with Resume
      if (userResume && Array.isArray(userResume.experience)) {
        userResume.experience.forEach(resExp => {
          const match = items.find(liExp =>
            liExp.company && resExp.company && (
              liExp.company.toLowerCase().includes(resExp.company.toLowerCase()) ||
              resExp.company.toLowerCase().includes(liExp.company.toLowerCase())
            )
          );

          if (!match) {
            mismatches.push(`Experience at "${resExp.company}" (${resExp.role || resExp.title}) is on your Resume but missing from LinkedIn.`);
          } else {
            const liRole = (match.title || '').toLowerCase();
            const resRole = (resExp.role || resExp.title || '').toLowerCase();
            if (liRole && resRole && liRole !== resRole) {
              mismatches.push(`Title discrepancy at ${resExp.company}: "${resExp.role || resExp.title}" on Resume vs "${match.title}" on LinkedIn.`);
            }
          }
        });
      }

      let score10 = 8;
      if (auditedEntries.some(e => e.problems.length > 0)) score10 -= 1;
      if (mismatches.length > 0) score10 -= 2;
      score10 = Math.max(3, Math.min(10, score10));

      return {
        score: score10 * 10,
        scoreOutOf10: score10,
        roles: auditedEntries,
        auditedEntries,
        mismatches,
        generalRecommendations: [
          'Use Google\'s X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".',
          'Ensure job titles and dates match your ATS resume to prevent recruiter confusion.'
        ]
      };
    }
  };

  /* ==========================================================================
     9. EDUCATION ANALYZER MODULE
     ========================================================================== */
  const EducationAnalyzer = {
    analyze(educationList, userResume = null) {
      const items = Array.isArray(educationList) ? educationList : [];
      let score10 = 8;

      if (items.length === 0) {
        return {
          score: 30,
          scoreOutOf10: 3,
          entries: [],
          recommendations: ['Add your college degree and field of study to establish academic credentials.']
        };
      }

      const audited = items.map(ed => ({
        degree: ed.degree || 'Degree',
        institution: ed.institution || ed.school || 'University',
        year: ed.year || ed.dates || 'Verified',
        status: 'VERIFIED'
      }));

      return {
        score: score10 * 10,
        scoreOutOf10: score10,
        entries: audited,
        recommendations: [
          'Add relevant coursework aligned with your target engineering role.',
          'Include academic honors or leadership in technical clubs.'
        ]
      };
    }
  };

  /* ==========================================================================
     10. CERTIFICATIONS ANALYZER MODULE
     ========================================================================== */
  const CertificationAnalyzer = {
    analyze(certList, userResume = null) {
      const items = Array.isArray(certList) ? certList : [];
      let score10 = 7;
      const resumeMissingOnLinkedIn = [];

      const audited = items.map(c => {
        const hasId = c.credentialId && c.credentialId !== 'N/A';
        return {
          name: c.name,
          issuer: c.issuer || 'Issuing Authority',
          credentialId: c.credentialId || 'N/A',
          hasId
        };
      });

      if (audited.length >= 2) score10 += 1;
      if (audited.some(c => c.hasId)) score10 += 1;

      // Cross-check with resume
      if (userResume && Array.isArray(userResume.certifications)) {
        userResume.certifications.forEach(resCert => {
          const certName = typeof resCert === 'string' ? resCert : resCert.name;
          const match = items.find(liCert => liCert.name && certName && liCert.name.toLowerCase().includes(certName.toLowerCase()));
          if (!match) {
            resumeMissingOnLinkedIn.push(certName);
          }
        });
      }

      score10 = Math.min(10, score10);

      return {
        score: score10 * 10,
        scoreOutOf10: score10,
        entries: audited,
        resumeMissingOnLinkedIn,
        recommendations: [
          'Always provide the Credential ID or public verification URL for third-party certifications.',
          'Add cloud and architecture credentials (AWS, GCP, CKA) which carry the highest recruiter value.'
        ]
      };
    }
  };

  /* ==========================================================================
     11. SKILLS TAXONOMY & EVIDENCE ANALYZER MODULE
     ========================================================================== */
  const SkillsAnalyzer = {
    analyze(linkedInSkills = [], userResume = null, githubData = null, targetRole = 'Full Stack Developer') {
      const liSkills = Array.isArray(linkedInSkills)
        ? linkedInSkills.map(s => (typeof s === 'string' ? s.trim() : (s.name || '')).trim()).filter(Boolean)
        : [];

      // Extract verified resume skills
      const resumeSkillTokens = [];
      if (Array.isArray(userResume)) {
        userResume.forEach(s => typeof s === 'string' && resumeSkillTokens.push(s.trim()));
      } else if (userResume && userResume.skills) {
        if (Array.isArray(userResume.skills)) {
          userResume.skills.forEach(s => typeof s === 'string' && resumeSkillTokens.push(s.trim()));
        } else if (typeof userResume.skills === 'object') {
          Object.values(userResume.skills).forEach(val => {
            if (typeof val === 'string') {
              val.split(/[,•·\n|]/).forEach(s => {
                const clean = s.trim();
                if (clean.length > 1) resumeSkillTokens.push(clean);
              });
            } else if (Array.isArray(val)) {
              val.forEach(s => typeof s === 'string' && resumeSkillTokens.push(s.trim()));
            }
          });
        }
      }

      // Extract verified GitHub languages & topics
      const githubSkillTokens = [];
      if (Array.isArray(githubData)) {
        githubData.forEach(g => typeof g === 'string' && githubSkillTokens.push(g.trim()));
      } else if (githubData && typeof githubData === 'object') {
        if (Array.isArray(githubData.languages)) {
          githubData.languages.forEach(l => githubSkillTokens.push(typeof l === 'string' ? l : (l.name || '')));
        }
        if (Array.isArray(githubData.repositories)) {
          githubData.repositories.forEach(r => {
            if (r.language) githubSkillTokens.push(r.language);
          });
        }
      }

      // 8 Buckets Definition
      const taxonomyBuckets = {
        languages: { title: 'Programming Languages', icon: 'code', skills: [] },
        frameworks: { title: 'Frameworks & Libraries', icon: 'layers', skills: [] },
        databases: { title: 'Databases', icon: 'database', skills: [] },
        cloud: { title: 'Cloud & DevOps', icon: 'cloud', skills: [] },
        aiml: { title: 'AI / Machine Learning', icon: 'psychology', skills: [] },
        tools: { title: 'Tools & Platforms', icon: 'build', skills: [] },
        soft: { title: 'Soft Skills', icon: 'groups', skills: [] },
        technical: { title: 'Technical Skills', icon: 'settings', skills: [] }
      };

      const categorized = {
        'Programming Languages': [],
        'Frameworks': [],
        'Databases': [],
        'Cloud/DevOps': [],
        'AI/ML': [],
        'Tools': [],
        'Soft Skills': [],
        'Technical Skills': []
      };

      const skillsWithEvidence = [];
      const strongEvidence = [];
      const moderateEvidence = [];
      const weakEvidence = [];

      function assignBucket(skillName, tier, reason) {
        const lower = skillName.toLowerCase();
        let targetBucketKey = 'technical';
        let targetCategory = 'Technical Skills';

        for (const [canonicalCat, skillList] of Object.entries(SKILL_TAXONOMY)) {
          if (skillList.some(cs => cs.toLowerCase() === lower)) {
            targetCategory = canonicalCat;
            if (canonicalCat === 'Programming Languages') targetBucketKey = 'languages';
            else if (canonicalCat === 'Frameworks') targetBucketKey = 'frameworks';
            else if (canonicalCat === 'Databases') targetBucketKey = 'databases';
            else if (canonicalCat === 'Cloud/DevOps') targetBucketKey = 'cloud';
            else if (canonicalCat === 'AI/ML') targetBucketKey = 'aiml';
            else if (canonicalCat === 'Tools') targetBucketKey = 'tools';
            else if (canonicalCat === 'Soft Skills') targetBucketKey = 'soft';
            break;
          }
        }

        const skillObj = { name: skillName, evidenceTier: tier, evidenceReason: reason };
        taxonomyBuckets[targetBucketKey].skills.push(skillObj);
        categorized[targetCategory].push(skillName);
        skillsWithEvidence.push(skillObj);
        return skillObj;
      }

      // Audit LinkedIn skills
      liSkills.forEach(skill => {
        const inResume = resumeSkillTokens.some(rs => rs.toLowerCase() === skill.toLowerCase());
        const inGithub = githubSkillTokens.some(gs => gs.toLowerCase() === skill.toLowerCase());

        let tier = 'weak';
        let reason = 'Listed on LinkedIn only; no verified projects or resume evidence.';

        if (inResume && inGithub) {
          tier = 'strong';
          reason = 'Verified across LinkedIn, Resume, and GitHub.';
          strongEvidence.push(skill);
        } else if (inResume || inGithub) {
          tier = 'moderate';
          reason = inResume ? 'Verified in Resume.' : 'Verified in GitHub repositories.';
          moderateEvidence.push(skill);
        } else {
          weakEvidence.push(skill);
        }

        assignBucket(skill, tier, reason);
      });

      // Detect skills with evidence in Resume or GitHub that are MISSING on LinkedIn
      const missingFromLinkedIn = [];
      const allVerified = [...new Set([...resumeSkillTokens, ...githubSkillTokens])];

      allVerified.forEach(vSkill => {
        const onLinkedIn = liSkills.some(ls => ls.toLowerCase() === vSkill.toLowerCase());
        if (!onLinkedIn && vSkill.length < 30) {
          missingFromLinkedIn.push(vSkill);
          assignBucket(vSkill, 'missing', 'Discovered in your GitHub/Resume codebase but omitted from LinkedIn.');
        }
      });

      let score10 = 7;
      if (liSkills.length >= 8) score10 += 1;
      if (strongEvidence.length >= 3) score10 += 1;
      if (weakEvidence.length > liSkills.length * 0.5) score10 -= 2;
      score10 = Math.max(3, Math.min(10, score10));

      return {
        score: score10 * 10,
        scoreOutOf10: score10,
        skills: liSkills,
        totalCount: liSkills.length,
        taxonomyBuckets,
        skillsWithEvidence,
        categorized,
        strongEvidence,
        moderateEvidence,
        weakEvidence,
        missingFromLinkedIn: missingFromLinkedIn.slice(0, 10)
      };
    }
  };

  /* ==========================================================================
     12. RESUME ↔ LINKEDIN COMPARISON MODULE
     ========================================================================== */
  const ResumeComparison = {
    compare(linkedInProfile, resumeDataInput = null) {
      let resumeData = resumeDataInput;
      if (!resumeData && typeof Storage !== 'undefined') {
        resumeData = Storage.get('resume_data', null);
      }

      if (!resumeData) {
        return {
          available: false,
          hasResumeData: false,
          summary: 'No resume data found in DevPilot AI storage. Build or import a resume in Resume Workspace to enable deep cross-comparison.',
          experienceMismatches: [],
          missingCertificationsOnLinkedIn: [],
          skillsMatchedPercent: 0,
          rows: []
        };
      }

      const experienceMismatches = [];
      const missingCertificationsOnLinkedIn = [];

      // Check experience mismatches
      const liExp = linkedInProfile.experience || [];
      const resExp = resumeData.experience || [];

      resExp.forEach(re => {
        const match = liExp.find(le =>
          le.company && re.company && (
            le.company.toLowerCase().includes(re.company.toLowerCase()) ||
            re.company.toLowerCase().includes(le.company.toLowerCase())
          )
        );

        if (!match) {
          experienceMismatches.push(`Experience at "${re.company}" is in your Resume but missing from LinkedIn.`);
        } else {
          const reRole = (re.role || re.title || '').trim();
          const leRole = (match.title || '').trim();
          if (reRole && leRole && reRole.toLowerCase() !== leRole.toLowerCase()) {
            experienceMismatches.push(`Title discrepancy: "${reRole}" in Resume vs "${leRole}" on LinkedIn.`);
          }
        }
      });

      // Check certifications
      const liCerts = linkedInProfile.certifications || [];
      const resCerts = resumeData.certifications || [];
      resCerts.forEach(rc => {
        const name = typeof rc === 'string' ? rc : rc.name;
        const found = liCerts.some(lc => lc.name && name && lc.name.toLowerCase().includes(name.toLowerCase()));
        if (!found) missingCertificationsOnLinkedIn.push(name);
      });

      // Compute skill match percent
      const liSkills = (linkedInProfile.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase());
      let resSkillsList = [];
      if (Array.isArray(resumeData.skills)) resSkillsList = resumeData.skills;
      else if (resumeData.skills && typeof resumeData.skills === 'object') {
        Object.values(resumeData.skills).forEach(val => {
          if (typeof val === 'string') val.split(/[,•]/).forEach(s => resSkillsList.push(s.trim()));
        });
      }

      let matched = 0;
      resSkillsList.forEach(rs => {
        if (liSkills.includes(rs.toLowerCase())) matched++;
      });
      const skillsMatchedPercent = resSkillsList.length ? Math.round((matched / resSkillsList.length) * 100) : 80;

      return {
        available: true,
        hasResumeData: true,
        experienceMismatches,
        missingCertificationsOnLinkedIn,
        skillsMatchedPercent,
        rows: [
          {
            section: 'Headline / Role',
            status: experienceMismatches.length ? 'INCONSISTENT' : 'MATCH'
          },
          {
            section: 'Certifications',
            status: missingCertificationsOnLinkedIn.length ? 'MISSING' : 'MATCH'
          }
        ]
      };
    }
  };

  /* ==========================================================================
     13. GITHUB ↔ LINKEDIN COMPARISON MODULE
     ========================================================================== */
  const GitHubComparison = {
    compare(linkedInProfile, githubDataInput = null) {
      let ghData = githubDataInput;
      if (!ghData && typeof Storage !== 'undefined') {
        ghData = Storage.get('github_analysis_data', null);
      }

      const topProjects = this.recommendFeaturedRepos('Full Stack Developer', ghData);

      return {
        available: !!ghData,
        hasData: !!ghData,
        topProjectsToFeature: topProjects,
        recommendations: [
          'Feature your top-starred repositories with live demo links in your LinkedIn Featured section.'
        ]
      };
    },

    recommendFeaturedRepos(targetRole = 'Full Stack Developer', githubDataInput = null) {
      let ghData = githubDataInput;
      if (!ghData && typeof Storage !== 'undefined') {
        ghData = Storage.get('github_analysis_data', null);
      }

      if (!ghData) return [];

      const repos = ghData.repositories || ghData.repos || [];
      return [...repos]
        .sort((a, b) => (b.stargazers_count || b.stars || 0) - (a.stargazers_count || a.stars || 0))
        .slice(0, 4)
        .map(r => ({
          name: r.name,
          description: r.description || 'Open source software project',
          language: r.language || 'Code',
          stars: r.stargazers_count || r.stars || 0,
          url: r.html_url || '#'
        }));
    }
  };

  /* ==========================================================================
     14. RECOMMENDATION & ACTION PLAN ENGINE
     ========================================================================== */
  const RecommendationEngine = {
    buildPlan(sectionScores, headlineAudit, aboutAudit, experienceAudit, certificationAudit, skillsAudit, resumeComparison, githubComparison) {
      const fixFirst = [];
      const next = [];
      const optional = [];

      // FIX FIRST
      if (headlineAudit.weaknesses && headlineAudit.weaknesses.length) {
        fixFirst.push('Update Headline: Add exact target role keywords and remove generic phrases.');
      }
      if (aboutAudit.scoreOutOf10 < 7) {
        fixFirst.push('Rewrite About Section: Adopt the high-converting technical story template with verified metrics.');
      }
      if (certificationAudit.resumeMissingOnLinkedIn && certificationAudit.resumeMissingOnLinkedIn.length) {
        fixFirst.push(`Add ${certificationAudit.resumeMissingOnLinkedIn.length} missing certification(s) from your resume to LinkedIn.`);
      }
      if (skillsAudit.missingFromLinkedIn && skillsAudit.missingFromLinkedIn.length) {
        fixFirst.push(`Add verified skills (${skillsAudit.missingFromLinkedIn.slice(0, 3).join(', ')}) to your top LinkedIn skills list.`);
      }
      if (resumeComparison.experienceMismatches && resumeComparison.experienceMismatches.length) {
        fixFirst.push('Synchronize experience titles between Resume and LinkedIn to eliminate recruiter red flags.');
      }

      // NEXT
      if (experienceAudit.roles && experienceAudit.roles.some(r => r.problems && r.problems.length)) {
        next.push('Enhance experience bullets with quantified latency, uptime, or user metrics.');
      }
      next.push('Add verified Credential IDs and public verification links to all licenses and certifications.');
      next.push('Highlight 2 flagship projects in your LinkedIn Featured section with demo links.');

      // OPTIONAL
      optional.push('Establish a weekly technical posting schedule on LinkedIn to increase organic reach by 3x.');
      optional.push('Request recommendations from past mentors or project collaborators.');
      optional.push('Engage with technical posts in your target tech stack to increase search impressions.');

      return {
        fixFirst,
        next,
        optional
      };
    },

    discoverShowcaseItems(userResume, githubData) {
      return [];
    }
  };

  /* ==========================================================================
     15. OVERALL LINKEDIN PROFILE SCORER
     ========================================================================== */
  const LinkedInScorer = {
    computeOverall(sectionScores) {
      // 100-Point Weighted Scoring Engine:
      // Headline: 15%
      // About: 20%
      // Experience: 25%
      // Skills: 15%
      // Education: 5%
      // Certifications: 10%
      // Activity: 5%
      // Analytics: 5%
      const weights = {
        headline: 0.15,
        about: 0.20,
        experience: 0.25,
        skills: 0.15,
        education: 0.05,
        certifications: 0.10,
        activity: 0.05,
        analytics: 0.05
      };

      let total = 0;
      for (const [sec, w] of Object.entries(weights)) {
        const scoreVal = sectionScores[sec] || 0;
        total += scoreVal * w;
      }

      const score = Math.round(Math.max(0, Math.min(100, total)));

      let strength = 'Needs Work';
      if (score >= 80) strength = 'All-Star Profile';
      else if (score >= 65) strength = 'Strong Profile';
      else if (score >= 50) strength = 'Intermediate';

      return {
        score,
        totalScore: score,
        strength
      };
    }
  };

  /* ==========================================================================
     16. MASTER CONTROLLER & PUBLIC API
     ========================================================================== */
  function analyzeProfile(profileInput, options = {}) {
    const targetRoleKey = options.targetRole || 'fullstack';
    const targetRoleDef = TARGET_ROLES[targetRoleKey] || TARGET_ROLES['Full Stack Developer'];

    const rawResume = options.userResume || (typeof Storage !== 'undefined' ? Storage.get('resume_data', null) : null);
    const rawGithub = options.githubData || (typeof Storage !== 'undefined' ? Storage.get('github_analysis_data', null) : null);

    let profile = profileInput;
    if (typeof profileInput === 'string') {
      profile = LinkedInParser.parseText(profileInput);
    } else {
      profile = LinkedInParser.normalizeProfile(profileInput);
    }

    // Extract evidence skills
    const evidenceSkills = [];
    if (rawResume && rawResume.skills) {
      if (Array.isArray(rawResume.skills)) {
        rawResume.skills.forEach(s => typeof s === 'string' && evidenceSkills.push(s.trim()));
      } else if (typeof rawResume.skills === 'object') {
        Object.values(rawResume.skills).forEach(val => {
          if (typeof val === 'string') {
            val.split(/[,•·\n|]/).forEach(s => {
              const trimmed = s.trim();
              if (trimmed.length > 1 && trimmed.length < 30) evidenceSkills.push(trimmed);
            });
          }
        });
      }
    }

    // Audits
    const headlineAudit = HeadlineAnalyzer.analyze(profile.headline || profile.personal?.headline, targetRoleDef, evidenceSkills);
    const aboutAudit = AboutAnalyzer.analyze(profile.about, targetRoleDef, rawResume);
    const analyticsAudit = AnalyticsAnalyzer.analyze(profile.analytics);
    const activityAudit = ActivityAnalyzer.analyze(profile.activity, targetRoleDef);
    const experienceAudit = ExperienceAnalyzer.analyze(profile.experience, rawResume, targetRoleDef.title);
    const educationAudit = EducationAnalyzer.analyze(profile.education, rawResume);
    const certificationAudit = CertificationAnalyzer.analyze(profile.certifications, rawResume);
    const skillsAudit = SkillsAnalyzer.analyze(profile.skills, rawResume, rawGithub, targetRoleDef.title);

    const sectionScores = {
      headline: headlineAudit.score,
      about: aboutAudit.score,
      analytics: analyticsAudit.score,
      activity: activityAudit.score,
      experience: experienceAudit.score,
      education: educationAudit.score,
      certifications: certificationAudit.score,
      skills: skillsAudit.score
    };

    const overall = LinkedInScorer.computeOverall(sectionScores);
    const resumeComparison = ResumeComparison.compare(profile, rawResume);
    const githubComparison = GitHubComparison.compare(profile, rawGithub);
    const actionPlan = RecommendationEngine.buildPlan(
      sectionScores,
      headlineAudit,
      aboutAudit,
      experienceAudit,
      certificationAudit,
      skillsAudit,
      resumeComparison,
      githubComparison
    );
    const githubFeatured = GitHubComparison.recommendFeaturedRepos(targetRoleDef.title, rawGithub);

    return {
      overallScore: overall.score,
      profileStrength: overall.strength,
      overall,
      profile,
      profileData: profile,
      targetRole: targetRoleDef.title,
      targetRoleInfo: targetRoleDef,
      keywordCoverage: headlineAudit.keywordsFound ? Math.min(100, headlineAudit.keywordsFound.length * 25) : 50,
      sectionScores,
      headlineAnalysis: headlineAudit,
      aboutAnalysis: aboutAudit,
      analyticsData: analyticsAudit,
      activityData: activityAudit,
      experienceData: experienceAudit,
      educationData: educationAudit,
      certificationData: certificationAudit,
      skillsData: skillsAudit,
      resumeComparison,
      githubComparison,
      githubRecommendations: githubFeatured,
      actionPlan
    };
  }

  function getDemoProfile() {
    return JSON.parse(JSON.stringify(DEMO_LINKEDIN_PROFILE));
  }

  function escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  return {
    TARGET_ROLES,
    SKILL_TAXONOMY,
    DEMO_LINKEDIN_PROFILE,
    LinkedInParser,
    HeadlineAnalyzer,
    AboutAnalyzer,
    AnalyticsAnalyzer,
    ActivityAnalyzer,
    ExperienceAnalyzer,
    EducationAnalyzer,
    CertificationAnalyzer,
    SkillsAnalyzer,
    ResumeComparison,
    GitHubComparison,
    RecommendationEngine,
    LinkedInScorer,
    analyzeProfile,
    getDemoProfile
  };
}));
