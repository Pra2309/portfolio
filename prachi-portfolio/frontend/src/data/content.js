export const personal = {
  name: "Prachi Singh",
  first: "Prachi",
  brand: "prachi.brew",
  titles: ["AI Engineer", "Software Engineer", "Agentic AI Builder"],
  location: "Pune, Maharashtra, India",
  city: "Pune, India",
  availability: "Open to opportunities worldwide · Available for relocation",
  positioning:
    "I build intelligent applications, production-grade backend systems, and AI-powered workflows that solve real-world problems.",
  heroSub: ["I build AI.", "I engineer software.", "I make ideas work."],
  heroIntro:
    "Software Engineer at Xoriant, working at the intersection of backend engineering and applied AI. Interested in building intelligent systems, agentic workflows and technology that makes a real difference.",
  email: "singh.prachi2309@gmail.com",
  linkedin: "https://www.linkedin.com/in/prachi-singh23/",
  github: "https://github.com/Pra2309",
  instagram: "https://www.instagram.com/prachikepanne",
  // Set to "/resume.pdf" after dropping the file in /public. While null, "Download resume" prints the recruiter view as a PDF.
  resumeUrl: "/Prachi_Singh_Resume.pdf",
};

export const about = {
  paragraphs: [
    "I'm a Software Engineer at Xoriant, working on enterprise backend systems and applied AI solutions. My work spans building REST APIs, data quality services, monitoring frameworks and production GenAI applications.",
    "Over time, I've developed a strong interest in Generative AI, RAG systems, agentic workflows and multi-agent architectures. Outside my professional work, I enjoy experimenting with new technologies and building practical AI projects.",
    "I like understanding how things work under the hood, solving engineering problems and turning ideas into working products.",
  ],
  availability:
    "Currently based in India. Open to exciting opportunities across the globe and willing to relocate.",
  journey: [
    { year: "2020 – 2024", label: "B.E. Computer Engineering, graduated with 8.9 CGPA", place: "MMIT, Pune" },
    { year: "2023", label: "first internship, writing Python", place: "InternPe · remote" },
    { year: "2023", label: "learned to read data properly", place: "Kalpa Power" },
    { year: "2024", label: "shipped full-stack MERN + a chatbot prototype", place: "Mobiloitte" },
    { year: "2024", label: "published RecogniPro research", place: "IJCRT" },
    { year: "2024 →", label: "backend + applied AI for Citi", place: "Xoriant" },
  ],
};

export const impact = [
  { value: 40, suffix: "%", label: "less manual data validation", desc: "CLI-integrated Data Quality services and YAML-based validation automation.", source: "Xoriant · Data Quality services" },
  { value: 35, suffix: "%", label: "less redundant cloud storage", desc: "Ansible-driven file retention and lifecycle cleanup with a 60-day policy.", source: "Xoriant · Ansible retention" },
  { value: 20, suffix: "%", label: "better data accuracy", desc: "Automated YAML-based data validation replacing manual checks.", source: "Xoriant · YAML validation" },
  { value: 20, prefix: "15–", suffix: "%", label: "faster SQL queries", desc: "Query optimisation behind enterprise analytics and reporting APIs.", source: "Xoriant · Digital Analytics Framework" },
  { value: 15, suffix: "+", label: "REST APIs & API contracts", desc: "Designed and developed for enterprise analytics and digital reporting workflows.", source: "Xoriant · Analytics & reporting" },
];

export const aiImpact = [
  { value: "1", label: "production RAG support bot shipped", source: "GenAI SDK Support Bot · Gemini, Vertex AI, FAISS" },
  { value: "5", label: "specialized agents collaborating via A2A + MCP", source: "Multi-Agent Creative Studio" },
  { value: "4", label: "LLM workflows: parsing, matching, questions, evaluation", source: "X-Hire · Xoriant" },
  { value: "Top 5", label: "Xoriant ExcellAIrate AI Competition", source: "plus POC recognition for the SDK bot" },
];

export const experience = [
  {
    id: "xoriant",
    type: "full-time",
    company: "Xoriant",
    role: "Software Engineer",
    period: "Sep 2024 – Present",
    location: "Pune, India",
    client: "Citi Bank",
    summary: "Enterprise banking systems, backend engineering, analytics frameworks and applied AI solutions.",
    highlights: ["15+ REST APIs for enterprise analytics", "CLI data-quality services across Dev / UAT / Prod", "production RAG support bot on Gemini + Vertex AI"],
    details: [
      "Designed and developed 15+ REST APIs and API contracts for enterprise analytics and digital reporting workflows, optimizing SQL queries to improve query performance by 15–20%.",
      "Developed CLI-integrated Data Quality services that allow developers to retrieve validation configurations and results and execute or rerun checks across Development, UAT and Production environments, reducing manual validation effort by 40%.",
      "Automated YAML-based data validation, reducing manual effort by 40% and improving data accuracy by 20%.",
      "Designed and developed an end-to-end ClickHouse Monitoring API layer covering infrastructure health, performance monitoring, production-to-COB data parity and batch-processing data health.",
      "Implemented file retention and lifecycle cleanup using Ansible, enforcing a 60-day retention policy and reducing redundant cloud storage consumption by 35%.",
      "Engineered and deployed a production RAG-based GenAI SDK Support Bot using Python, Gemini, Vertex AI and FAISS, with document ingestion, chunking, embeddings and semantic retrieval for SDK documentation and API specifications.",
      "Built backend services and LLM-powered workflows for X-Hire, a GenAI-powered hiring platform supporting resume parsing, candidate matching, interview question generation and candidate evaluation.",
      "Evaluated LLM-generated responses and refined prompt instructions, retrieval context and tool invocation behaviour to improve relevance and reliability.",
    ],
  },
  {
    id: "mobiloitte",
    type: "internship",
    company: "Mobiloitte Technologies Pvt. Ltd.",
    role: "Software Engineer Intern",
    period: "Feb 2024 – Jul 2024",
    location: "Pune, India",
    summary: "Full-stack MERN development, UI/UX prototyping and a conversational chatbot prototype.",
    highlights: ["full-stack MERN web app", "payment app UI/UX workflows"],
    details: [
      "Developed a full-stack web application using the MERN stack.",
      "Contributed to responsive frontend interfaces and backend functionality.",
      "Designed end-to-end UI/UX workflows and prototypes for a payment application.",
      "Developed a chatbot prototype for conversational interactions.",
    ],
  },
  {
    id: "kalpa",
    type: "internship",
    company: "Kalpa Power",
    role: "Data Analyst Intern",
    period: "Nov 2023 – Jan 2024",
    location: "",
    summary: "Data analysis and analytical work, exploring and interpreting datasets.",
    highlights: ["data analysis & analytical work"],
    details: ["Worked on data analysis and analytical tasks as a Data Analyst Intern."],
  },
  {
    id: "internpe",
    type: "internship",
    company: "InternPe",
    role: "Python Intern",
    period: "Mar 2023 – Apr 2023",
    location: "Remote",
    summary: "Python development internship.",
    highlights: ["python development"],
    details: ["Worked on Python development as part of a remote internship."],
  },
];

export const projectTabs = [
  { id: "featured", label: "Featured" },
  { id: "ai", label: "AI & Agentic Systems" },
  { id: "backend", label: "Backend Engineering" },
  { id: "enterprise", label: "Enterprise Projects" },
];

export const projects = [
  {
    id: "creative-studio", num: "01", file: "multi-agent-creative-studio", title: "Multi-Agent Creative Studio", category: "Agentic AI",
    tabs: ["featured", "ai"], kind: "personal",
    stack: ["Google ADK", "Gemini", "MCP", "A2A", "Python", "Cloud Run", "GCP"],
    desc: "A distributed multi-agent system that transforms natural-language prompts into structured content campaigns through collaborating specialized agents.",
    points: [
      "Built five specialized agents for audience research, copy generation, visual ideation, quality review and project planning.",
      "Implemented Agent-to-Agent (A2A) communication and Model Context Protocol (MCP) integrations for external tools.",
      "Deployed agents as independent Cloud Run microservices.",
    ],
  },
  {
    id: "text-to-sql", num: "02", file: "ai-text-to-sql", title: "AI Text-to-SQL", category: "Generative AI / RAG",
    tabs: ["featured", "ai", "backend"], kind: "personal",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "RAG", "ChromaDB", "OpenRouter"],
    desc: "A natural-language-to-SQL application that enables users to query relational databases using plain English.",
    points: [
      "Implemented schema-aware RAG to retrieve relevant database context for SQL generation.",
      "Developed query validation, execution and result explanation workflows.",
      "Built FastAPI backend services for database interactions.",
    ],
  },
  {
    id: "job-matcher", num: "03", file: "ai-resume-job-matcher", title: "AI Resume Job Matcher", category: "AI Automation",
    tabs: ["ai"], kind: "personal",
    stack: ["Python", "Streamlit", "Firecrawl", "Pydantic", "Supabase", "Discord Webhooks"],
    desc: "An automated job discovery and matching application that identifies relevant job opportunities using resume-based matching.",
    points: [
      "Built a scheduled job discovery pipeline using Firecrawl and LLM-based resume-to-job matching.",
      "Implemented structured extraction and validation using Pydantic.",
      "Added relevance-based job evaluation and notification workflows.",
    ],
  },
  {
    id: "analytics-framework", num: "04", file: "digital-analytics-framework", title: "Digital Analytics Framework", category: "Enterprise Backend Engineering",
    tabs: ["featured", "backend", "enterprise"], kind: "enterprise",
    stack: ["Java", "Spring Boot", "SQL", "ClickHouse", "REST APIs"],
    desc: "A centralized, tool-agnostic digital analytics and reporting framework designed to support enterprise digital metrics and reporting workflows.",
    points: [
      "Designed and developed 15+ REST APIs and API contracts supporting analytics, reporting and data workflows.",
      "Developed reporting and data quality services to streamline retrieval and validation of enterprise analytics data.",
      "Optimized SQL queries, improving query performance by 15–20%.",
    ],
  },
  {
    id: "clickhouse-monitoring", num: "05", file: "clickhouse-monitoring-apis", title: "ClickHouse Monitoring APIs", category: "Enterprise Backend / Data Monitoring",
    tabs: ["backend", "enterprise"], kind: "enterprise",
    stack: ["Java", "Spring Boot", "ClickHouse", "SQL", "REST APIs"],
    desc: "An API-driven monitoring framework for batch-processing pipelines and enterprise ClickHouse environments.",
    points: [
      "Designed and delivered monitoring APIs covering infrastructure health, performance and data health.",
      "Implemented production-to-COB parity and data freshness checks.",
      "Replaced repetitive manual SQL-based monitoring activities with structured API-driven checks.",
    ],
  },
  {
    id: "sdk-bot", num: "06", file: "genai-sdk-support-bot", title: "GenAI SDK Support Bot", category: "Production Generative AI / RAG",
    tabs: ["featured", "ai", "enterprise"], kind: "enterprise",
    stack: ["Python", "Gemini", "Vertex AI", "FAISS", "Embeddings", "Semantic Search"],
    desc: "A production RAG-based support bot that helps developers retrieve SDK documentation and API specifications using natural-language queries.",
    points: [
      "Implemented document ingestion, chunking, vector embeddings and semantic retrieval.",
      "Enabled retrieval of API documentation, request parameters, headers and payload structures.",
      "Improved developer access to technical integration guidelines and implementation information.",
    ],
  },
  {
    id: "x-hire", num: "07", file: "x-hire", title: "X-Hire", category: "Enterprise Generative AI",
    tabs: ["ai", "enterprise"], kind: "enterprise",
    stack: ["Python", "LLM Integration", "Backend Engineering"],
    desc: "A GenAI-powered recruitment platform supporting AI-assisted hiring workflows.",
    points: [
      "Developed backend services and LLM-powered workflows.",
      "Supported resume parsing and candidate matching.",
      "Integrated interview question generation and candidate evaluation capabilities.",
    ],
  },
];

export const publication = {
  title: "RecogniPro: Recognition And Construction Of Forensic Facial Sketches",
  authors: ["Prachi Singh", "Abhishek Jadhav", "Devika Wagh", "Samruddhi Takawale", "Nisar S. Shaikh"],
  journal: "International Journal of Creative Research Thoughts (IJCRT)",
  volume: "Volume 12, Issue 3",
  date: "March 2024",
  pages: "c44–c51",
  paperId: "IJCRT2403257",
  summary:
    "Research exploring deep learning and computer vision techniques for matching hand-drawn forensic facial sketches with digital facial images to support identification workflows.",
  readUrl: "https://ijcrt.org/viewpaperforall.php?paper=IJCRT2403257",
  pdfUrl: "https://ijcrt.org/papers/IJCRT2403257.pdf",
};

export const skills = [
  { id: "programming", label: "Programming", items: ["Python", "Java", "SQL"] },
  { id: "genai", label: "AI & Generative AI", items: ["LLM Integration", "Generative AI", "RAG", "Embeddings", "Vector Search", "Semantic Search", "Prompt Engineering", "Context Engineering", "LLM Evaluation", "Tool Calling", "Agentic AI", "Multi-Agent Systems"] },
  { id: "frameworks", label: "AI Frameworks & Protocols", items: ["Google ADK", "LangGraph", "LangChain", "LlamaIndex", "MCP", "A2A"] },
  { id: "backend", label: "Backend Engineering", items: ["FastAPI", "Spring Boot", "REST APIs", "Microservices", "API Integrations"] },
  { id: "databases", label: "Databases", items: ["PostgreSQL", "Oracle SQL", "MS SQL", "ClickHouse", "ChromaDB", "Supabase", "FAISS"] },
  { id: "cloud", label: "Cloud & DevOps", items: ["Google Cloud Platform", "Vertex AI", "Cloud Run", "Docker", "Ansible", "CI/CD", "Git"] },
  { id: "automation", label: "Automation", items: ["n8n", "Zapier"] },
  { id: "ai-dev", label: "AI-Assisted Development", items: ["Claude Code", "Claude", "Cursor", "GitHub Copilot"] },
];

export const education = {
  school: "Marathwada Mitra Mandal's Institute of Technology",
  degree: "Bachelor of Engineering in Computer Engineering",
  period: "Aug 2020 – Jun 2024",
  cgpa: "8.9/10",
  location: "Pune, India",
};

export const certifications = [
  { name: "Oracle Certified Professional, Generative AI", issuer: "Oracle" },
  { name: "Oracle Certified Associate, Java SE 8 Programmer", issuer: "Oracle" },
  { name: "Claude Certified Architect Foundations", issuer: "Anthropic" },
  { name: "Responsible AI: Applying AI Principles with Google Cloud", issuer: "Google Cloud" },
  { name: "Hugging Face Agents Course", issuer: "Hugging Face" },
];

export const achievements = [
  { name: "Xor Learner Award", note: "CCB Onboarding Development Project" },
  { name: "Top 5", note: "Xoriant ExcellAIrate AI Competition" },
  { name: "POC recognition", note: "GenAI SDK Support Bot" },
];

export const twinPrompts = [
  "What does Prachi work on?",
  "Tell me about her AI projects.",
  "What's her backend engineering experience?",
  "What makes her a good fit for an AI Engineer role?",
  "Is she open to relocation?",
  "Tell me about her research.",
  "What does she enjoy outside work?",
];

export const marqueeWords = [
  "agentic workflows", "rag systems", "multi-agent architectures", "rest apis that hold up",
  "data quality at scale", "llm evaluation", "cloud run microservices", "turning ideas into working products",
];
