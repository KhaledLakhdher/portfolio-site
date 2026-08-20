# LinkedIn Profile Content — copy/paste reference

Drafted to match the portfolio CV's voice and metrics. LinkedIn field limits noted
so nothing gets cut off when you paste.

---

## Headline (max 220 characters)

```
AI & Data Engineer | LLM & RAG Systems, Multi-Agent Platforms, MLOps | Python · FastAPI · SQL · Docker
```
(104 characters — plenty of room if you want to add "Open to opportunities" at the end.)

---

## About (max 2,600 characters)

```
I am an AI & Data Science Engineer with a strong software engineering background
and hands-on experience building end-to-end AI systems, from data processing and
model development to backend integration and deployment.

My work focuses on practical AI applications, especially Large Language Models,
RAG-based systems, multi-agent platforms, and MLOps. I enjoy transforming
research ideas and messy data into usable, reliable, and scalable solutions that
solve real-world problems.

I have worked on projects involving grounded conversational AI assistants,
multi-agent orchestration platforms, LLM evaluation and benchmarking, production
ML pipelines with automated monitoring, and NLP-based sentiment analysis. These
experiences helped me develop a strong understanding of both the technical side
of AI models and the engineering required to turn them into complete,
dependable products.

Core skills:
- Machine Learning & Deep Learning: PyTorch, TensorFlow, Scikit-learn, Hugging Face
- Generative AI: LLMs, RAG pipelines, embeddings, vector databases, AI agents
- Backend & APIs: FastAPI, Django, REST APIs, Python
- Data & MLOps: Pandas, NumPy, SQL, PostgreSQL, Docker, MLflow
- Full-stack development: React, Next.js, TypeScript, deployment workflows

What I bring is the ability to build more than just models: I can design
complete AI solutions, evaluate their performance rigorously, integrate them
into applications, and deliver clean, production-oriented systems.

I am currently seeking opportunities in Artificial Intelligence, Machine
Learning, Data Science, Data Engineering, or Software Engineering, where I can
contribute to impactful projects and continue growing as an engineer.

Portfolio (with a live AI assistant grounded in my background): khaled-lakhdher-portfolio.vercel.app
Email: ing.khaledlakhdher@gmail.com
```

---

## Experience #1

**Title:** AI Engineer
**Company:** CTT — Carthage Training & Technologies
**Dates:** Feb 2026 – Present
**Location:** Tunisia
**Note:** Started as a final-year project (PFE); converted to a full-time contract after graduation. On LinkedIn, check "I currently work here" so it shows as ongoing.

```
Designed and built Hotel Mind, a multilingual, multi-agent hotel search and
booking assistant: 9 LangChain/LangGraph agents call 32+ tools across 10 real
SOAP endpoints for live hotel, room, and pricing data.

• Grounded every answer in live tool output rather than model memory, so the
  assistant never invents a price, a room, or a booking.
• Built a hybrid booking flow: AI-driven search hands off to a guest-detail
  form and a sandboxed SOAP reservation, on a full-stack FastAPI + Next.js
  app with LangSmith tracing.

Stack: LangChain, LangGraph, Multi-Agent, FastAPI, Next.js, SOAP
```

---

## Experience #2

**Title:** Artificial Intelligence Developer Intern
**Company:** CTT — Carthage Training & Technologies
**Dates:** Jul 2025 – Sep 2025
**Location:** Hammamet, Tunisia

```
• Fine-tuned a Hugging Face NLP model to classify customer reviews into three
  sentiment classes, improving accuracy by 25% over the baseline.
• Built a Django backend to manage customer data and automate export of
  analysis results to Excel for reporting.
• Owned the end-to-end Python pipeline for preprocessing, training, and
  integration.

Stack: NLP, Hugging Face, Django, Python
```

---

## Featured / Projects section

Add these as LinkedIn "Projects" entries (Profile → Add section → Projects).
Link the GitHub repo where you have one public.

**1. Nexus AI — Artificial Intelligence Employee Management Platform**
```
A multi-tenant platform where LLM agents are governed like employees: scoped
IAM-style permissions enforced at the tool-execution boundary, hierarchical
vector memory with semantic recall, multi-agent orchestration over a Redis
Streams message bus, real-time WebSocket monitoring, and a provider-agnostic
model gateway (Anthropic, OpenRouter, Gemini) with per-agent cost tracking.

Stack: FastAPI, PostgreSQL/pgvector, Redis Streams, Next.js, TypeScript
GitHub: https://github.com/KhaledLakhdher/startup
```

**2. Steam Player Forecaster — Production MLOps Pipeline**
```
A production MLOps pipeline forecasting Steam player counts: a reproducible ML
lifecycle (scikit-learn, MLflow, FastAPI, Pandera, Docker) with time-based
training, a versioned model registry with @champion promotion, and a
registry-backed prediction API with schema-validated inputs. Production
monitoring includes PSI drift detection with an automated champion/challenger
retraining loop (GitHub Actions), a CI eval gate, and a live Streamlit dashboard.

Stack: MLOps, MLflow, FastAPI, scikit-learn, Docker, GitHub Actions, Streamlit
GitHub: https://github.com/KhaledLakhdher/steam-player-mlops
```

**3. CodeReview Evaluation — Benchmarked LLM Code Reviewer**
```
An AI code-review pipeline (Claude API, structured JSON findings) with a
reproducible evaluation harness over the BugsInPy benchmark (500 real Python
bugs with ground-truth fixes), scoring localization and diagnosis as separate
metrics via an LLM-as-judge. Found that a single "bug-detection" score
overstates true capability by ~1.8x (78% localization vs. 43% diagnosis) across
3 model tiers (Opus / Sonnet / Haiku), with a live Streamlit demo.

Stack: LLM-as-a-Judge, Benchmarking, Claude API, Evaluation, Streamlit, Python
GitHub: https://github.com/KhaledLakhdher/coder_review
```

**4. Hotel Mind — Multi-Agent Travel Assistant**
```
A multilingual, multi-agent hotel search and booking assistant grounded
entirely in live SOAP data: 9 LangChain/LangGraph agents, 32+ tools, 10 real
endpoints, and a hybrid flow that hands guest details to a real form before a
sandboxed reservation.

Stack: LangChain, LangGraph, Multi-Agent, FastAPI, Next.js, SOAP
```

**5. Personalized Voice Assistant**
```
A personalized voice assistant combining speech-to-text, text-to-speech, and
realistic voice cloning: fine-tuned Whisper (STT) and SpeechT5 (TTS), with
voice cloning via CSM-1B, cutting response time by 30%.

Stack: ASR, TTS, Voice Cloning, Fine-tuning
```

**6. DecisionFlow — AI Business Analyst**
```
Upload a spreadsheet, get a data warehouse: cleaning, a star schema,
forecasts, and an analyst you can ask questions. Engineered a multi-tenant
analytics platform (FastAPI, PostgreSQL, DuckDB, Polars, Redis, Next.js,
TypeScript) carrying an uploaded CSV through a raw → clean → star pipeline,
with tenant isolation enforced by PostgreSQL row-level security rather than
application checks. The analytics layer infers foreign keys from value
containment, runs Holt-Winters forecasting, MAD anomaly detection, and RFM
churn scoring, fronted by a Gemini narrative layer whose generated SQL clears
a three-layer sandbox and refuses rather than guesses when the data can't
support an answer.

Stack: FastAPI, DuckDB, PostgreSQL, RLS, Polars, Gemini, scikit-learn,
Next.js, Playwright
GitHub: https://github.com/KhaledLakhdher/DecisionFlow
```

---

## Skills to add (search: Profile → Add skill)

Add these in order of priority — recruiters and LinkedIn's search both index this list:

```
RAG (Retrieval-Augmented Generation)
Large Language Models (LLM)
AI Agents
Prompt Engineering
LLM Evaluation
Python
FastAPI
SQL
PostgreSQL
Docker
Machine Learning
Deep Learning
Natural Language Processing (NLP)
PyTorch
TensorFlow
Hugging Face
Django
React.js
TypeScript
MLOps
```

---

## Certifications (Profile → Add section → Licenses & certifications)

```
1. Fundamentals of Deep Learning — NVIDIA — Nov 2022
2. Building Transformer-Based Natural Language Processing Applications — NVIDIA — Dec 2025
3. Applications of AI for Predictive Maintenance — NVIDIA — Oct 2025
```

---

## Education

```
EPI — International Polytechnic School, Sousse, Tunisia
Computer Engineering — AI & Data Science Specialization
2023 – 2026

EPI — Private International Polytechnic School, Sousse, Tunisia
Preparatory Cycle
2021 – 2023
```

---

## Contact info section

```
Website: https://khaled-lakhdher-portfolio.vercel.app
Email: ing.khaledlakhdher@gmail.com
Phone: +216 29 843 899
```
