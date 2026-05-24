// ============================================
// PORTFOLIO DATA - Edit this file to update your portfolio
// ============================================

const PORTFOLIO = {

    // --- Personal Info ---
    name: 'Gokul S P',
    firstName: 'Gokul',
    lastName: 'S P',
    title: 'Software Engineer',
    email: 'gokulprem098@gmail.com',
    location: 'Chennai, India',
    linkedin: 'https://www.linkedin.com/in/gokul-prem',
    linkedinDisplay: 'linkedin.com/in/gokul-prem',

    // --- Hero Section ---
    hero: {
        greeting: "Hello, I'm",
        description: 'I build <strong>marketplace features that drive revenue</strong> at ACV and previously built an <strong>analytics system from scratch</strong> at Kissflow. I don\'t just write features — I design the systems behind them.',
        typingPhrases: [
            'Full-Stack Engineer',
            'Data Pipeline Architect',
            'Tech Writer & Educator',
            'Polyglot Developer',
        ],
        stats: [
            { value: 5, suffix: '+', label: 'Years Experience' },
            { value: 2, suffix: '',  label: 'Awards Won' },
            { value: 20, suffix: '+', label: 'Technologies' },
        ],
    },

    // --- About Section ---
    about: {
        paragraphs: [
            `I started at <strong>Kissflow</strong> as an associate engineer — fixing bugs, writing tests, learning the codebase. Within two years, I was the one they trusted to <em>design and build their entire analytics system from scratch</em>: the reporting module, the data pipeline, the Spark jobs, all of it. That experience shaped how I think about software — not just writing code, but owning a system end-to-end.`,
            `Outside work, I run <em>Unbox the Black Box</em> — a tech blog where I break down complex concepts into clear explanations, because teaching is how I truly understand things. I'm also deep into <em>AI-assisted development</em>, building custom workflows and tools that help me ship faster and think clearer.`,
        ],
        yearsExperience: '5+ Years',
    },

    // --- Skills Section ---
    skills: [
        {
            title: 'Languages & Frameworks',
            icon: 'layers',
            tags: [
                { name: 'Python', level: 'expert' },
                { name: 'Java', level: 'advanced' },
                { name: 'C#', level: 'advanced' },
                { name: 'SQL', level: 'expert' },
                { name: 'FastAPI', level: 'advanced' },
                { name: 'Flask', level: 'advanced' },
                { name: 'Vue.js', level: 'advanced' },
                { name: 'REST APIs', level: 'advanced' },
            ],
        },
        {
            title: 'Data Engineering',
            icon: 'activity',
            tags: [
                { name: 'Spark', level: 'expert' },
                { name: 'Snowflake', level: 'expert' },
                { name: 'Snowpark', level: 'advanced' },
                { name: 'Dataflow', level: 'advanced' },
                { name: 'ETL Pipelines', level: 'advanced' },
            ],
        },
        {
            title: 'Cloud & DevOps',
            icon: 'cloud',
            tags: [
                { name: 'GCP', level: 'expert' },
                { name: 'Docker', level: 'advanced' },
                { name: 'Kubernetes', level: 'advanced' },
                { name: 'PubSub', level: 'advanced' },
                { name: 'Kafka', level: 'advanced' },
                { name: 'GCS', level: 'intermediate' },
            ],
        },
        {
            title: 'Databases & Tools',
            icon: 'database',
            tags: [
                { name: 'MongoDB', level: 'expert' },
                { name: 'Redis', level: 'advanced' },
                { name: 'ChangeStream', level: 'advanced' },
                { name: 'Git & GitHub', level: 'intermediate' },
                { name: 'Pytest', level: 'intermediate' },
                { name: 'Postman', level: 'intermediate' },
                { name: 'JMeter', level: 'intermediate' },
            ],
        },
        {
            title: 'AI & Developer Productivity',
            icon: 'bulb',
            tags: [
                { name: 'Claude / Claude Code', level: 'expert' },
                { name: 'GitHub Copilot', level: 'advanced' },
                { name: 'AI Agents', level: 'advanced' },
                { name: 'MCP (Model Context Protocol)', level: 'advanced' },
                { name: 'Local MCP Servers', level: 'intermediate' },
            ],
        },
    ],

    philosophyQuotes: [
        'I\'d rather spend a week understanding the problem than write code that solves the wrong thing. The best systems I\'ve built started with <strong>a blank whiteboard</strong>, not a blank editor.',
        'Writing isn\'t separate from engineering — it\'s part of it. If I can\'t <strong>explain it clearly</strong>, I probably don\'t understand it well enough to build it right.',
    ],

    // --- Experience Section ---
    experience: [
        {
            role: 'Software Engineer II',
            company: 'ACV',
            date: 'Sep 2025 - Present',
            projects: [
                {
                    title: 'Marketplace - Offers & Negotiations',
                    points: [
                        'Building revenue-driving features on the <strong>Marketplace</strong> product — offers, negotiations, and buyer workflows',
                        'Collaborating across <strong>multiple microservices</strong> to deliver features spanning the full offer lifecycle',
                        'Owning end-to-end feature delivery from <strong>design review to production</strong>, reducing release cycle time across teams',
                    ],
                },
            ],
            tags: ['Python', 'FastAPI', 'Vue.js', 'Java', 'C#', 'Kafka', 'Claude', 'MCP'],
        },
        {
            role: 'Senior Software Engineer',
            company: 'Kissflow, Chennai',
            date: 'Oct 2024 - Aug 2025',
            projects: [
                {
                    title: 'Data Pipeline Optimization',
                    points: [
                        'Re-architected the data pipeline with <strong>Snowpark</strong>, <strong>GCP</strong>, and <strong>Dataflow</strong>, reducing OLTP-to-OLAP sync time and infrastructure costs',
                        'Benchmarked and resolved performance bottlenecks using <strong>JMeter</strong> load testing',
                        'Evaluated and selected optimal tech stack for each pipeline stage based on throughput and cost requirements',
                        'Led migration of legacy batch jobs to <strong>event-driven architecture</strong> with PubSub for near real-time processing',
                    ],
                },
            ],
            tags: ['Snowpark', 'GCP', 'Dataflow', 'PubSub', 'Snowflake', 'SQL', 'JMeter'],
        },
        {
            role: 'Software Engineer',
            company: 'Kissflow, Chennai',
            date: 'Dec 2023 - Oct 2024',
            projects: [
                {
                    title: 'Analytics System - Built from Scratch',
                    points: [
                        'Designed and built the <strong>entire analytics system from zero</strong> — reporting module with filters, charts, pivot tables, and tabular views',
                        'Developed <strong>Spark batch processing jobs</strong> and real-time data pipeline for seamless OLTP-OLAP synchronization',
                        'Architected with <strong>SOLID principles</strong>, HLD/LLD documentation, and scalable system design patterns',
                        'Owned the full lifecycle — from <strong>requirement gathering</strong> to deployment, monitoring, and iteration',
                    ],
                },
            ],
            tags: ['PubSub', 'Spark', 'Snowflake', 'SQL', 'SOLID', 'System Design'],
        },
        {
            role: 'Associate Software Engineer',
            company: 'Kissflow, Chennai',
            date: 'July 2021 - Dec 2023',
            projects: [
                {
                    title: 'Case Management System',
                    points: [
                        'Built <strong>reactions</strong> and <strong>watcher</strong> features for the case tracking system, improving team collaboration and ticket visibility',
                        'Refactored core modules for better <strong>performance and maintainability</strong>, reducing technical debt',
                        'Established comprehensive <strong>test coverage with Pytest</strong>, catching regressions before production',
                        'Implemented <strong>MongoDB ChangeStreams</strong> and <strong>Redis caching</strong> for real-time data sync and faster API responses',
                    ],
                },
            ],
            tags: ['Flask', 'GCS', 'Docker', 'K8s', 'Pytest', 'MongoDB', 'Redis', 'Design Patterns'],
        },
    ],

    // --- Education Section ---
    education: {
        degree: 'B.E. in Electronics and Communication Engineering',
        school: 'Anna University - Government College of Engineering, Thanjavur',
        date: 'July 2017 - July 2021',
        project: {
            badge: 'Final Year Project',
            title: 'Automated Bio-Bubble Control Systems (COVID-19)',
            description: 'Built a system to secure workplaces with biosecure bubbles, virtually enforcing COVID-19 protocols without human intervention. Applied in offices, banks, and colleges.',
            tags: ['Python', 'Django', 'HTML/CSS', 'Raspberry Pi', 'IoT'],
        },
    },

    // --- Awards Section ---
    awards: [
        {
            title: 'Best Young Talent',
            event: 'Kissflow Altius 2022',
            icon: 'medal',
            description: 'Recognized for outstanding performance and exceptional contributions as a young professional at Kissflow.',
        },
        {
            title: 'Engineering RockStar',
            event: 'Kissflow Altius 2023',
            icon: 'star',
            description: 'Awarded for engineering excellence and driving impactful solutions in data pipeline optimization and analytics systems.',
        },
    ],

    // --- Writing Section ---
    writing: {
        tagline: 'I write to understand things deeply — then share what I learn so others don\'t have to struggle the same way.',
        blog: {
            name: 'Unbox the Black Box',
            url: 'https://gokulsp98.github.io/unbox-the-black-box',
            github: 'https://github.com/gokulsp98/unbox-the-black-box',
            description: 'A tech blog that turns complex concepts into clear, visual explanations — from confusion to clarity.',
        },
    },

    // --- Contact Section ---
    contact: {
        heading: "Get in",
        headingAccent: 'touch.',
        subtitle: "Whether it's a role, a collaboration, or just a conversation about tech — I'm always open to connecting.",
        formAccessKey: 'YOUR_ACCESS_KEY', // Replace with your Web3Forms access key
    },

};
