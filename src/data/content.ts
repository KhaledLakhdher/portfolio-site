export const profile = {
  name: 'Khaled Lakhdher',
  roles: ['Computer Engineer', 'AI & Data Science', 'Full-Stack AI Developer'],
  tagline:
    'I build grounded conversational AI, RAG systems, and applied deep-learning products - from model to full-stack deployment.',
  summary:
    'Machine Learning engineer with a solid foundation in deep learning, computer vision, and natural language processing. Proficient in Python and TensorFlow, with hands-on experience building and deploying AI models. I like turning research-grade models into reliable, shippable products.',
  location: 'Sousse, Tunisia',
  email: 'ing.khaledlakhdher@gmail.com',
  phone: '+216 29 843 899',
  linkedin: 'https://www.linkedin.com/in/khaled-lakhdher',
  resumeEn: '/resume/Khaled_Lakhdher_CV_EN.pdf',
  resumeFr: '/resume/Khaled_Lakhdher_CV_FR.pdf',
  // Swap this for your own photo: drop a file in /public (e.g. avatar.jpg)
  // and set this to '/avatar.jpg'. Defaults to a coding illustration.
  avatar: '/avatar.svg',
}

export type Experience = {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    role: 'AI Engineer - Final-Year Project (PFE)',
    company: 'CTT - Carthage Training & Technologies',
    period: 'Feb 2026 - Jun 2026',
    location: 'Tunisia',
    bullets: [
      'Designed and developed Hotel Mind, a conversational hotel-booking assistant built on a grounded RAG architecture, connected to a real-time SOAP booking API.',
      'Delivered a containerized full-stack solution achieving nDCG@5 of 0.82, MRR@5 of 0.90, and a 100% success rate on a benchmark query set.',
      'Built a hallucination-mitigation layer that verifies every factual claim, ensuring the assistant never invents a price or a booking.',
    ],
    tags: ['RAG', 'LLMs', 'Agents', 'SOAP API', 'Docker', 'Information Retrieval'],
  },
  {
    role: 'AI Developer Intern',
    company: 'CTT - Carthage Training & Technologies',
    period: 'Jul 2025 - Sep 2025',
    location: 'Hammamet, Tunisia',
    bullets: [
      'Fine-tuned a Hugging Face NLP model to classify customer reviews by sentiment (positive, negative, neutral).',
      'Built a Django backend to manage customer data and automate export of results to Excel for reporting.',
      'Handled all preprocessing, training, and integration scripts in Python.',
    ],
    tags: ['NLP', 'Hugging Face', 'Django', 'Python'],
  },
]

export type Project = {
  title: string
  blurb: string
  bullets: string[]
  tags: string[]
  featured?: boolean
  github?: string
  demo?: string
  private?: boolean
}

export const projects: Project[] = [
  {
    title: 'Nexus AI - AI-Employee Management Platform',
    blurb:
      'A multi-tenant platform where LLM agents are governed like employees - scoped permissions, vector memory, orchestration, and per-agent cost tracking.',
    bullets: [
      'Built a multi-tenant full-stack platform (FastAPI, PostgreSQL/pgvector, Redis, Next.js, TypeScript) where LLM agents are governed like employees: scoped IAM-style permissions enforced at the tool-execution boundary, hierarchical vector memory with semantic recall, and a provider-agnostic model gateway (Anthropic / OpenRouter-Gemini) with per-agent cost tracking.',
      'Engineered a multi-agent orchestration engine over a Redis Streams message bus with real-time WebSocket monitoring and an append-only audit log, running live agents for a fraction of a cent per run.',
    ],
    tags: ['FastAPI', 'pgvector', 'Redis Streams', 'Next.js', 'Multi-Agent', 'WebSockets'],
    featured: true,
    github: 'https://github.com/KhaledLakhdher/startup',
  },
  {
    title: 'Steam Player Forecaster - Production MLOps Pipeline',
    blurb:
      'A production MLOps pipeline forecasting Steam player counts, with a versioned model registry, drift-triggered retraining, and live monitoring.',
    bullets: [
      'Engineered a reproducible ML lifecycle (scikit-learn, MLflow, FastAPI, Pandera, Docker): time-based training, a versioned model registry with @champion promotion, and a registry-backed prediction API with schema-validated inputs.',
      'Added production monitoring - PSI drift detection with an automated champion/challenger retraining loop (GitHub Actions) and a CI eval gate - plus a Streamlit dashboard and a scheduled collector that keeps the system live.',
    ],
    tags: ['MLOps', 'MLflow', 'FastAPI', 'scikit-learn', 'Docker', 'GitHub Actions', 'Streamlit'],
    featured: true,
    github: 'https://github.com/KhaledLakhdher/steam-player-mlops',
  },
  {
    title: 'CodeReview-Eval - Benchmarked LLM Code Reviewer',
    blurb:
      'An AI code reviewer with a reproducible evaluation harness that separates localization from diagnosis, showing single-score benchmarks overstate true LLM capability.',
    bullets: [
      'Built an AI code-review pipeline (Claude API, structured JSON findings) and a reproducible evaluation harness over the BugsInPy benchmark (500 real Python bugs with ground-truth fixes), scoring localization and diagnosis as separate metrics via an LLM-as-judge.',
      'Showed a single "bug-detection" score overstates true capability ~1.8× (78% localization vs 43% diagnosis), benchmarked 3 model tiers (Opus / Sonnet / Haiku), and shipped an interactive Streamlit demo and published results page.',
    ],
    tags: ['LLM-as-a-Judge', 'Benchmarking', 'Claude API', 'Evaluation', 'Streamlit', 'Python'],
    featured: true,
    github: 'https://github.com/KhaledLakhdher/coder_review',
  },
  {
    title: 'Hotel Mind - Grounded Booking Assistant',
    blurb:
      'A conversational hotel-booking assistant on a grounded RAG architecture, wired to a live SOAP reservation API.',
    bullets: [
      'Grounded RAG pipeline with retrieval scored at nDCG@5 0.82 / MRR@5 0.90.',
      'Hallucination-mitigation layer verifies every factual claim - no invented prices or bookings.',
      'Containerized full-stack delivery with a real-time booking backend.',
    ],
    tags: ['RAG', 'LLMs', 'Semantic Search', 'Docker', 'SOAP'],
    featured: true,
    private: true,
  },
  {
    title: 'Personalized Voice Assistant',
    blurb:
      'A personalized voice assistant combining speech-to-text, text-to-speech, and realistic voice cloning.',
    bullets: [
      'Fine-tuned Whisper (STT) and SpeechT5 (TTS) for a personalized voice pipeline.',
      'Realistic voice cloning via CSM-1B for natural, on-brand responses.',
      'Cut response time by 30% while improving engagement.',
    ],
    tags: ['ASR', 'TTS', 'Voice Cloning', 'Fine-tuning'],
    featured: true,
    private: true,
  },
  {
    title: 'AI Image Colorization & Code Generation',
    blurb:
      'A dual system: a GAN that colorizes grayscale images and a multi-agent pipeline that writes full-stack apps.',
    bullets: [
      'Trained a Pix2Pix GAN (U-Net / PatchGAN) for automatic image colorization.',
      'Multi-agent system (Planner / Architect / Coder) generates full-stack projects from a single prompt.',
      'Served through an interactive web app: Flask backend, HTML/CSS/JS frontend, APIs.',
    ],
    tags: ['GANs', 'Pix2Pix', 'Agents', 'Flask'],
    featured: true,
    private: true,
  },
]

export type SkillGroup = { label: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    label: 'Programming Languages',
    items: ['Python', 'Java', 'C', 'SQL', 'JavaScript', 'TypeScript', 'React.js', 'React Native', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    label: 'AI Libraries & Frameworks',
    items: ['Transformers', 'PyTorch', 'TensorFlow', 'Keras', 'Hugging Face', 'Hugging Face Hub', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    label: 'Frameworks & Tools',
    items: ['Gradio', 'Streamlit', 'Flask', 'Django', 'Zeep', 'LangSmith', 'Pydantic', 'Docker Compose', 'Nginx', 'Postman', 'Git', 'GitHub'],
  },
  {
    label: 'Concepts & Technologies',
    items: [
      'AI Agents',
      'Agentic AI',
      'Tool-Calling',
      'Prompt Engineering',
      'LLM Evaluation',
      'Benchmarking',
      'LLM-as-a-Judge',
      'LLMs',
      'NLP',
      'ASR',
      'GANs',
      'Vector Databases',
      'Semantic Search',
      'Embeddings',
      'Information Retrieval',
      'Deep Learning',
      'API Development',
      'NoSQL',
      'Cloud Computing',
    ],
  },
]

export type Certification = { name: string; issuer: string; date: string }

export const certifications: Certification[] = [
  { name: 'Fundamentals of Deep Learning', issuer: 'NVIDIA', date: 'Nov 2022' },
  { name: 'Building Transformer-Based NLP Applications', issuer: 'NVIDIA', date: 'Dec 2025' },
  { name: 'Applications of AI for Predictive Maintenance', issuer: 'NVIDIA', date: 'Oct 2025' },
  { name: 'CCNA 1: Introduction to Networks', issuer: 'Cisco Networking Academy', date: 'Mar 2024' },
  { name: 'CCNA 2: Switching, Routing & Wireless Essentials', issuer: 'Cisco Networking Academy', date: 'Mar 2024' },
]

export type Education = { degree: string; school: string; period: string; location: string }

export const education: Education[] = [
  {
    degree: 'Computer Engineering - AI & Data Science',
    school: 'EPI - International Polytechnic School',
    period: '2023 - 2026',
    location: 'Sousse, Tunisia',
  },
  {
    degree: 'Preparatory Cycle',
    school: 'EPI - Private International Polytechnic School',
    period: '2021 - 2023',
    location: 'Sousse, Tunisia',
  },
]

export const languages = [
  { language: 'French', level: 'DELF B2' },
  { language: 'English', level: 'TOEIC 825/990' },
  { language: 'Arabic', level: 'Native' },
]

export const stats = [
  { value: '30%', label: 'Faster voice-assistant responses' },
  { value: '4', label: 'AI projects shipped end-to-end' },
  { value: '5', label: 'Professional certifications' },
  { value: '2026', label: 'AI & Data Science graduate' },
]
