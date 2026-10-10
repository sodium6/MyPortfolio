import React, { useState, useEffect, useMemo } from 'react';
import ContributionSkyline from '@/components/ui/contribution-skyline';
import ThreeGlassRefractionHero from '@/components/ui/ThreeGlassRefractionHero';
import ModalHologramCanvas from '@/components/ui/ModalHologramCanvas';
import ProjectCard3D from '@/components/ui/ProjectCard3D';
import SubtleTechBackground from '@/components/ui/SubtleTechBackground';
import NeuralSphereCanvas from '@/components/ui/NeuralSphereCanvas';
import {
  Brain,
  Cpu,
  Layers,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Terminal,
  X,
  Search,
  Zap,
  Box,
  Network,
  Server,
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Check,
  Download,
  Award
} from 'lucide-react';

// GitHub SVG Icon
const GitHubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const profileData = {
  name: 'Veeranuth Sukluea',
  title: 'AI & FULL STACK ENGINEER',
  phone: '063-7810-956',
  email: 'veeranuth.dev@outlook.co.th',
  github: 'https://github.com/sodium6',
  location: 'Bangkok / Nonthaburi, Thailand',
  about: 'AI enthusiast and software engineer specializing in Generative AI, Large Language Models (LLMs), Machine Learning, and High-Performance Full Stack Systems. Dedicated to transforming state-of-the-art AI research and distributed architectures into production-ready platforms that deliver measurable business impact.',

  // All 9 projects strictly matching PROJECT_USECASES.md, with image slots ready for screenshots
  projects: [
    {
      id: 'procurement-strategy',
      name: 'AI Strategic Procurement Platform',
      company: 'BEATRIX CO., LTD.',
      category: 'enterprise',
      period: '2025–2026',
      role: 'AI & Full Stack Developer',
      image: '', // Place screenshot at /projects/procurement-strategy.png
      metrics: 'Pareto 80/20 • Kraljic Matrix • RAG Advisor',
      architecture: 'Next.js 14 + Go 1.22 Core (Clean Architecture) + FastAPI Python + PostgreSQL / Supabase',
      shortDesc: 'AI-powered strategic procurement engine with Pareto ABC spend analysis, Kraljic matrix plotting, 16-cell action directives, and literature-grounded RAG advisor.',
      fullDesc: 'Designed and engineered an enterprise-grade AI Strategic Procurement Platform. Features Clean Architecture separation between a high-throughput Go core engine and a specialized Python FastAPI AI service. Built end-to-end capabilities from Pareto ABC spend classification to dual strategic matrices, SRM 9-level roadmap, and a document-grounded RAG advisor for negotiation decision support.',
      highlights: [
        'Pareto Spend Analysis (ABC Classification): Analyzed spend distribution and categorized inventory according to the 80/20 rule to focus on high-impact items.',
        'Strategic Sourcing Matrices: Calculated and plotted Kraljic Matrix (Supply Positioning) paired with Supplier Preferencing Matrix (Core, Develop, Exploit, Nuisance).',
        '16-Cell Action Directives & SRM Roadmap: Formulated strategic directives across 16 matrix sectors with a 9-Level SRM Transition Roadmap to strengthen supplier relationships.',
        'AI Strategic Advisor (RAG Grounded on Literature): Implemented Retrieval-Augmented Generation retrieving procurement textbooks and literature to advise on supplier negotiations and risk mitigation.'
      ],
      tech: ['Next.js 14', 'Go 1.22', 'FastAPI', 'PostgreSQL', 'Supabase', 'RAG', 'Kraljic Matrix', 'Pareto ABC', 'Clean Architecture', 'Gemini API']
    },
    {
      id: 'pea-hackathon',
      name: 'PEA-Hackathon: Procurement Intelligence Platform (AIPP)',
      company: 'BEATRIX CO., LTD. / PEA Hackathon',
      category: 'enterprise',
      period: '2026',
      role: 'AI & Full Stack Developer',
      image: '', // Place screenshot at /projects/pea-hackathon.png
      metrics: '14 Regional Zones • 24-Mo ARIMAX Forecast • LME Commodities',
      architecture: 'Next.js + NestJS + FastAPI (Python) + PostgreSQL + Prisma + Docker',
      shortDesc: 'Procurement intelligence platform across 14 zones with Z-score anomaly detection, 24-month ARIMAX forecasting with LME commodity markets, and multi-factor Buy-Signal engine.',
      fullDesc: 'Built an end-to-end AI procurement intelligence platform across 14 regional areas. Detects procurement anomalies using statistical thresholds, forecasts 24 months of demand/price using 4 machine learning models linked to global London Metal Exchange (LME) commodities, and scores buy signals through an automated multi-factor engine.',
      highlights: [
        'Demand Anomaly Detection: Detected procurement anomalies across 14 regional zones using Z-score (|Z| > 2), coupled with a Human-in-the-loop (Human Gate) interface for officer verification.',
        'Auto-ML Price & Demand Forecasting: Compared 4 models (Linear, ARIMA, ARIMAX, Holt-Winters) to forecast prices 24 months ahead, integrating exogenous global market indices (LME Copper & Aluminium) based on material composition (TR, CB, IN, MT).',
        'Buy Signal Decision Engine: Engineered a multi-factor decision engine (URGENT / BUY / WAIT / MONITOR) scoring Price (30%), Inventory/Stock (30%), Supplier Capacity (20%), and Deadline (20%), synthesized by an LLM executive summary.'
      ],
      tech: ['Next.js', 'NestJS', 'FastAPI', 'ARIMAX', 'scikit-learn', 'statsmodels', 'yfinance', 'PostgreSQL', 'Prisma', 'Docker']
    },
    {
      id: 'e-bidding',
      name: 'E-Bidding System',
      company: 'BEATRIX CO., LTD.',
      category: 'enterprise',
      period: '2025–2026',
      role: 'Full Stack Developer & UX/UI System Designer',
      image: '', // Place screenshot at /projects/e-bidding.png
      metrics: 'ISO/IEC 29110 Certified • Sealed Envelopes • Multi-Tier Approval',
      architecture: 'Next.js + NestJS + TypeScript + PostgreSQL + Azure AD SSO + Playwright',
      shortDesc: 'ISO/IEC 29110-certified enterprise bidding lifecycle system with sealed/unsealed envelopes, surrogate bidding, and multi-level approval workflows.',
      fullDesc: 'Developed a comprehensive enterprise procurement and bidding platform certified under ISO/IEC 29110 software development standards. Covers the entire sourcing lifecycle from project creation and RFP/RFQ events to strict sealed-envelope bid evaluations, surrogate bidding under control, and multi-tiered board approval workflows.',
      highlights: [
        'End-to-End Bidding Lifecycle: Manages Sourcing Projects, Event Bidding (RFP/RFQ), and dynamic TOR pricing templates with custom commercial terms (Credit Terms, Warranty, Retention, Penalties).',
        'Sealed & Unsealed Envelope Rules: Implemented tamper-proof sealed envelope rules hiding bid prices strictly until the designated opening event to ensure regulatory transparency.',
        'Surrogate Bidding & Participant Portal: Built a supplier submission portal with surrogate bidding capabilities allowing authorized procurement officers to submit bids on behalf of suppliers under strict audit logging.',
        'Multi-Level Approval Workflow: Designed a sequential approval hierarchy (Secretary verification → Board review and sign-off) with automated executive memo attachments.'
      ],
      tech: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Azure AD SSO', 'Playwright', 'ISO/IEC 29110']
    },
    {
      id: 'pimmz-club',
      name: 'PImmz.Club',
      company: 'BEATRIX CO., LTD.',
      category: 'enterprise',
      period: '2025–2026',
      role: 'Full Stack & Performance Optimization Engineer',
      image: '', // Place screenshot at /projects/pimmz-club.png
      metrics: 'Enterprise Purchasing Club • Smart Connect SSO • Tiered Membership',
      architecture: 'Node.js (Cluster Mode) + Express.js + MySQL 8.0 + In-Memory Caching',
      shortDesc: 'Corporate purchasing club and news distribution platform with multi-core clustering, SWR in-memory caching, and Smart Connect Single Sign-On (SSO).',
      fullDesc: 'Architected and developed a corporate purchasing club and news distribution platform supporting concurrent users. Implemented Node.js multi-core clustering, stale-while-revalidate in-memory caching, Smart Connect SSO authentication, and tiered membership privileges for professional purchasers.',
      highlights: [
        'Enterprise Purchasing Club: Built an end-to-end corporate purchasing club and media platform with specialized catalog access and news publishing.',
        'High-Concurrency Architecture: Implemented Node.js Multi-core Cluster and Stale-While-Revalidate In-Memory Caching to reduce database workload.',
        'Database Optimization: Eliminated N+1 query bottlenecks through B-Tree composite indexing and optimized relational query plans.',
        'Enterprise Integration: Integrated Smart Connect Single Sign-On (SSO) and tiered membership privileges for professional purchasers.'
      ],
      tech: ['Node.js (Cluster)', 'Express.js', 'MySQL 8.0', 'In-Memory Caching', 'SSO', 'GitHub Actions']
    },
    {
      id: 'amc-training',
      name: 'AMC Training Center',
      company: 'BEATRIX CO., LTD.',
      category: 'enterprise',
      period: '2025–2026',
      role: 'Full Stack Developer & UI Designer',
      image: '', // Place screenshot at /projects/amc-training.png
      metrics: 'Corporate & Individual Dual Portal • Bento UI • Excel Export',
      architecture: 'React (Vite) + Node.js (Express) + RESTful API',
      shortDesc: 'Modern EdTech platform with Skooldio/Bento Grid UI, corporate & individual dual registrations, payment slip auditing, lecturer PDF hub, and Excel export.',
      fullDesc: 'Developed a comprehensive EdTech platform for professional seminars and workforce upskilling. Built modern Bento Grid and frosted glass UI aesthetics, dual registration paths for corporations and individuals, PDPA compliance consent, lecturer profiles with PDF CV viewing, and a full-featured admin management back-office.',
      highlights: [
        'Modern EdTech Portal: Designed an intuitive educational portal inspired by Skooldio and Bento Grid aesthetics with smooth frosted glass visual hierarchy.',
        'Corporate & Individual Registration: Built dual registration workflows for legal entities (with coordinator/participant manifests) and individuals, complete with payment slip upload and PDPA compliance.',
        'Knowledge & Lecturer Hub: Implemented lecturer directory with embedded PDF resumes, academic article repositories, and a community discussion exchange.',
        'Admin Back-Office Dashboard: Developed a KPI management console to administer public/in-house courses, audit payment slips, and export attendee rosters as structured Excel (.xlsx) spreadsheets.'
      ],
      tech: ['React (Vite)', 'Node.js (Express)', 'Bento UI', 'Frosted Glass', 'Excel Export', 'PDPA', 'Tailwind CSS']
    },
    {
      id: 'restaurant-rec',
      name: 'Restaurant Recommendation & Reservation System',
      company: 'AI & Full Stack Monorepo',
      category: 'aiml',
      period: '2025–2026',
      role: 'Machine Learning & Full Stack Developer',
      image: '', // Place screenshot at /projects/restaurant-rec.png
      metrics: 'Hybrid CF + Content Blend • pgvector Search • Thai LLM Reasoning',
      architecture: 'Monorepo (React Vite + Node.js Express + Python FastAPI + pgvector)',
      shortDesc: 'Hybrid ML recommendation engine (User-based CF + Content-based) with pgvector semantic similarity and OpenRouter LLM for Thai explainability.',
      fullDesc: 'Engineered an end-to-end intelligent restaurant recommendation and reservation platform. Evaluated User-Based Collaborative Filtering (Cosine Similarity) against Content-Based Filtering, creating a Hybrid Weighted Blend model. Integrated PostgreSQL + pgvector for semantic search and OpenRouter LLM to explain recommendations in conversational Thai.',
      highlights: [
        'Machine Learning Recommendation Engine: Developed and evaluated User-Based Collaborative Filtering (Cosine Similarity), Content-Based Filtering (Embeddings & Cuisine One-Hot), and a Hybrid Weighted Blend Model.',
        'Statistical Evaluation & Cold-Start Strategy: Benchmarked accuracy with Precision@K, Recall@K, and F1@K metrics, with automatic fallback chain to a popularity model for cold starts.',
        'Vector Search & AI Explainability: Integrated PostgreSQL with pgvector for lightning-fast embedding similarity lookups, combined with OpenRouter LLMs to generate real-time Thai explanations ("ทำไมถึงแนะนำร้านนี้").'
      ],
      tech: ['FastAPI', 'Python', 'scikit-learn', 'pandas', 'PostgreSQL', 'pgvector', 'OpenRouter LLM', 'React (Vite)', 'Express.js']
    },
    {
      id: 'rag-product-search',
      name: 'Mini Project : RAG (AI Product Search System)',
      company: 'Generative AI & Semantic Search',
      category: 'aiml',
      period: '2025',
      role: 'AI / RAG Developer',
      image: '', // Place screenshot at /projects/rag-product-search.png
      metrics: 'BAAI/bge-m3 Embeddings • Local gemma3:1b SLM • FastAPI Gateway',
      architecture: 'Supabase (pgvector) + BAAI/bge-m3 + gemma3:1b (Ollama) + FastAPI',
      shortDesc: 'Hybrid semantic search RAG application utilizing Supabase pgvector, BAAI/bge-m3 embeddings, and local gemma3:1b via Ollama with FastAPI.',
      fullDesc: 'Engineered a specialized Retrieval-Augmented Generation (RAG) system for intelligent product discovery. Built hybrid keyword-plus-vector search with dense BAAI/bge-m3 embeddings and paired with a local small language model (gemma3:1b via Ollama) to summarize catalog specifications with low latency.',
      highlights: [
        'Hybrid Vector & Keyword Search: Architected an intelligent product search pipeline combining vector similarity and keyword filtering inside Supabase (PostgreSQL with pgvector).',
        'Dense Embeddings & Local SLM: Utilized BAAI/bge-m3 for dense vector representations and integrated local gemma3:1b (Ollama) to interpret ambiguous user queries and summarize product features.',
        'FastAPI Production Gateway: Deployed high-throughput asynchronous REST API endpoints via FastAPI for sub-second query responses.'
      ],
      tech: ['RAG', 'Supabase', 'pgvector', 'BAAI/bge-m3', 'gemma3:1b (Ollama)', 'FastAPI', 'Python']
    },
    {
      id: 'air-writing',
      name: 'Air Writing & Alphabet Recognition',
      company: 'Computer Vision & Deep Learning',
      category: 'aiml',
      period: '2024–2025',
      role: 'Computer Vision & Deep Learning Engineer',
      image: '', // Place screenshot at /projects/air-writing.png
      metrics: '97% Character Accuracy • MediaPipe Real-Time • VGG16/MobileNet',
      architecture: 'OpenCV + MediaPipe + CNN (VGG16 / MobileNetV2) + Python',
      shortDesc: 'Real-time hand landmark tracking and deep learning CNN character recognition achieving 97% accuracy in air-written alphabet classification.',
      fullDesc: 'Developed a real-time computer vision system that captures hand gestures in the air and converts trajectories into classified alphabet characters. Used MediaPipe and OpenCV for real-time fingertip tracking and benchmarked CNN architectures (VGG16 vs. MobileNetV2) for high accuracy and mobile inference.',
      highlights: [
        'Real-Time Hand Landmark Tracking: Engineered real-time gesture and finger coordinate tracking using OpenCV and MediaPipe hands framework.',
        'Dual Architecture Benchmarking: Trained and compared convolutional neural networks (VGG16 for maximum feature depth vs. MobileNetV2 for lightweight device optimization).',
        'High Classification Accuracy: Achieved a validated 97% Accuracy in recognizing handwritten air-drawn alphabet characters.'
      ],
      tech: ['CNN', 'VGG16', 'MobileNetV2', 'OpenCV', 'MediaPipe', 'Deep Learning', 'Python']
    },
    {
      id: 'emotion-detection',
      name: 'Emotional Face Detection',
      company: 'Deep Learning & Team Leadership',
      category: 'aiml',
      period: '2023',
      role: 'Team Lead & Deep Learning Engineer',
      image: '', // Place screenshot at /projects/emotion-detection.png
      metrics: 'Multi-Class Emotion CNN • Flask REST • Agile Sprint Leadership',
      architecture: 'Deep Learning CNN + Flask Backend + OpenCV + Python',
      shortDesc: 'Facial emotion detection system with custom dataset preprocessing, fine-tuned CNN model, and real-time inference Flask backend led by sprint leadership.',
      fullDesc: 'Led a software engineering team in developing a multi-class facial emotion classification pipeline. Managed data collection, preprocessing, and augmentation pipelines to balance classes, fine-tuned deep learning CNN models, and built a Flask REST API for real-time video stream inferences.',
      highlights: [
        'Team Leadership & Agile Execution: Directed team workflow, defined task distributions, and managed sprint delivery across dataset curation and modeling.',
        'Data Preprocessing & Augmentation: Collected and cleaned multi-class facial expression datasets, applying data augmentation techniques to resolve class imbalances.',
        'Model Fine-Tuning & Serving: Fine-tuned deep learning neural network layers to boost classification precision and deployed a Flask REST server for real-time image inference.'
      ],
      tech: ['Deep Learning', 'Flask', 'Team Leadership', 'OpenCV', 'CNN', 'Python']
    }
  ],

  skillCategories: [
    {
      title: 'AI, LLM & RAG Systems',
      icon: Brain,
      skills: ['Retrieval-Augmented Generation (RAG)', 'LLM Orchestration', 'Vector Embeddings (bge-m3)', 'pgvector', 'OpenRouter / Gemini / Claude', 'Ollama (Local SLM/LLM)', 'Prompt Engineering']
    },
    {
      title: 'Machine Learning & Time Series',
      icon: TrendingUp,
      skills: ['Collaborative Filtering (CF)', 'Content-Based Filtering', 'Hybrid Recommender', 'ARIMAX Time Series', 'Anomaly Detection (|Z| > 2)', 'scikit-learn', 'statsmodels', 'Precision / Recall / F1@K']
    },
    {
      title: 'Computer Vision & Deep Learning',
      icon: Cpu,
      skills: ['OpenCV', 'MediaPipe Hand Tracking', 'Convolutional Neural Networks (CNN)', 'VGG16', 'MobileNetV2', 'Data Preprocessing & Augmentation', 'Real-time Video Inference']
    },
    {
      title: 'Backend & High-Concurrency Systems',
      icon: Server,
      skills: ['Go 1.22 (Clean Architecture)', 'Python (FastAPI)', 'NestJS', 'Node.js (Cluster Mode)', 'Express.js', 'In-Memory Caching (SWR)', 'PostgreSQL / MySQL 8.0', 'RESTful API Design']
    },
    {
      title: 'Frontend & 3D Web Graphics',
      icon: Layers,
      skills: ['Next.js 14', 'React 19 / Vite', 'Three.js (3D WebGL)', 'TypeScript / JavaScript', 'Tailwind CSS', 'Glassmorphism & Bento Grid UI', 'Interactive Canvas Graphics']
    },
    {
      title: 'DevOps, Standards & QA',
      icon: ShieldCheck,
      skills: ['ISO/IEC 29110 Standard', 'Grafana k6 Load Testing', 'Docker & Containerization', 'Playwright E2E Testing', 'Azure AD SSO', 'GitHub Actions CI/CD', 'Prisma ORM']
    }
  ]
};

// Expansive Monochrome Luxury Project Modal
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isEnterprise = project.category === 'enterprise';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-8 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto bg-[#050508]/98 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl z-10 p-6 sm:p-8 md:p-10 animate-modal-enter flex flex-col">
        {/* White Accent Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/40 rounded-t-3xl" />

        {/* Close Button Header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/15 hover:border-white/40 rounded-full text-white transition-all hover:rotate-90 hover:scale-105 z-20 cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-12 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="text-xs px-3.5 py-1 bg-white/5 text-white/90 rounded-md font-mono border border-white/10">
              {project.period}
            </span>
            <span className="text-xs px-3.5 py-1 rounded-md font-mono font-semibold border bg-white/10 text-white border-white/20 flex items-center gap-1.5">
              {isEnterprise ? <ShieldCheck className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
              <span>{isEnterprise ? 'Enterprise & Production' : 'AI, ML & Deep Learning'}</span>
            </span>
            <span className="text-xs px-3 py-1 bg-white/5 text-white/70 rounded-md font-mono border border-white/10">
              {project.company}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            {project.name}
          </h2>
          <p className="text-white/75 text-sm sm:text-base font-medium flex items-center gap-2 mb-4">
            <span>{project.role}</span>
          </p>

          {/* Key CV Metric in Modal */}
          {project.metrics && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/20 text-xs sm:text-sm font-mono text-white">
              <span className="text-white/60 uppercase tracking-wider text-[11px]">Key Metric & Impact:</span>
              <span className="font-semibold text-white">{project.metrics}</span>
            </div>
          )}
        </div>

        {/* 2-Column Bento Modal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Left Column: Specs, Architecture, Overview, Use Cases */}
          <div className="lg:col-span-7 space-y-6">
            {/* System Architecture */}
            {project.architecture && (
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/15 shadow-lg">
                <div className="text-xs uppercase font-mono tracking-wider text-white/80 font-semibold mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-white" />
                  <span>System Architecture & Core Engine</span>
                </div>
                <p className="text-sm sm:text-base font-mono text-white/90 leading-relaxed bg-black/60 p-3.5 rounded-xl border border-white/10">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Overview */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-white/80" />
                <span>Project Overview & Scope</span>
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {project.fullDesc || project.shortDesc}
              </p>
            </div>

            {/* Verified Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-3.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Key Use Cases & Implemented Features</span>
                </h3>
                <div className="space-y-3">
                  {project.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-white/80 text-sm sm:text-base bg-black/40 hover:bg-black/60 p-3.5 rounded-xl border border-white/10 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0 border border-white/20">
                        ✓
                      </span>
                      <span className="leading-relaxed text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive 3D Pipeline, Stack, Specs */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div>
              <ModalHologramCanvas project={project} />
            </div>

            {/* Technologies */}
            {project.tech && (
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex-1">
                <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white/80" />
                  <span>Technologies & Standards</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/90 border border-white/15 rounded-xl text-xs sm:text-sm font-mono font-medium transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Summary */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs font-mono text-white/60">

              <div className="flex justify-between items-center py-1">
                <span>Execution Timeline</span>
                <span className="text-white/90 font-medium">{project.period}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-white hover:bg-white/90 text-black font-semibold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.01]"
            >
              <span>Back to Overview</span>
              <span>✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'enterprise' | 'aiml'
  const [searchQuery, setSearchQuery] = useState('');
  const [gitContributions, setGitContributions] = useState(null);
  const [loadingGit, setLoadingGit] = useState(true);

  // Fetch live GitHub contributions
  useEffect(() => {
    let isMounted = true;
    fetch('https://github-contributions-api.jogruber.de/v4/sodium6?y=last')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && Array.isArray(data.contributions)) {
          setGitContributions(data.contributions);
        }
      })
      .catch((err) => {
        console.warn('Could not load live GitHub contributions, falling back:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingGit(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return profileData.projects.filter((p) => {
      const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.shortDesc.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query) ||
        p.tech.some((t) => t.toLowerCase().includes(query)) ||
        (p.architecture && p.architecture.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery]);

  const enterpriseCount = profileData.projects.filter((p) => p.category === 'enterprise').length;
  const aimlCount = profileData.projects.filter((p) => p.category === 'aiml').length;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* === 1. HERO SECTION: Fullscreen 3D Glass Refraction Hero === */}
      <ThreeGlassRefractionHero
        projectCount="09"
        onExploreClick={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* === 2. ABOUT & CV PROFILE EDITORIAL SECTION === */}
        {/* Full-Bleed Architectural Editorial Section */}
        <section
          id="about"
          className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-14 lg:px-20 bg-black overflow-hidden select-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const spotlight = e.currentTarget.querySelector('.about-spotlight');
            if (spotlight) {
              spotlight.style.left = `${x - 225}px`;
              spotlight.style.top = `${y - 225}px`;
              spotlight.style.opacity = '1';
            }
          }}
          onMouseLeave={(e) => {
            const spotlight = e.currentTarget.querySelector('.about-spotlight');
            if (spotlight) spotlight.style.opacity = '0';
          }}
        >
          {/* Architectural SVG Grid across the entire section */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-full-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="rgba(255,255,255,0.035)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-full-grid)" />
            <line x1="0" y1="18%" x2="100%" y2="18%" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="0" y1="82%" x2="100%" y2="82%" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <circle cx="20%" cy="18%" r="2" fill="white" opacity="0.35" />
            <circle cx="80%" cy="18%" r="2" fill="white" opacity="0.35" />
            <circle cx="20%" cy="82%" r="2" fill="white" opacity="0.35" />
            <circle cx="80%" cy="82%" r="2" fill="white" opacity="0.35" />
          </svg>

          {/* 4 Technical Corner Elements matching the reference image */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 pointer-events-none">
            <div className="absolute top-1 left-1 w-2 h-2 bg-white/40" />
          </div>
          <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 pointer-events-none">
            <div className="absolute top-1 right-1 w-2 h-2 bg-white/40" />
          </div>
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 pointer-events-none">
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/40" />
          </div>
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 pointer-events-none">
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/40" />
          </div>

          {/* Floating detail elements */}
          <div className="floating-element absolute top-[28%] left-[12%] w-1.5 h-1.5 rounded-full bg-white/20 pointer-events-none" />
          <div className="floating-element absolute top-[62%] right-[14%] w-1.5 h-1.5 rounded-full bg-white/20 pointer-events-none" />
          <div className="floating-element absolute top-[38%] right-[10%] w-1 h-1 rounded-full bg-white/30 pointer-events-none" />
          <div className="floating-element absolute top-[75%] left-[15%] w-1 h-1 rounded-full bg-white/30 pointer-events-none" />

          {/* Interactive Mouse Gradient Light */}
          <div
            className="about-spotlight pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-3xl transition-opacity duration-500 ease-out opacity-0 z-0"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
            }}
          />

          {/* Main Editorial Presentation Content */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">

            {/* Top Tagline with Gradient Line */}
            <div className="flex flex-col items-center mb-10 sm:mb-12">
              <span className="text-xs sm:text-sm font-mono font-light uppercase tracking-[0.25em] text-white/60">
                Artificial Intelligence &amp; Full Stack Engineer
              </span>
              <div
                className="mt-4 w-20 h-px opacity-40"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6), transparent)',
                }}
              />
            </div>

            {/* Main Monumental Headline */}
            <div className="relative mb-6 sm:mb-8">
              {/* Left/Right Tick Lines like in the reference image */}
              <div
                className="hidden md:block absolute -left-12 sm:-left-16 top-1/2 w-8 h-px opacity-30"
                style={{ background: 'white' }}
              />
              <div
                className="hidden md:block absolute -right-12 sm:-right-16 top-1/2 w-8 h-px opacity-30"
                style={{ background: 'white' }}
              />

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-white leading-[1.15]">
                Transforming Cutting-Edge <span className="font-bold text-white">AI</span>
                <br className="hidden sm:inline" /> into <span className="font-bold text-white">Production Scale.</span>
              </h2>
            </div>

            {/* Subhead / Bio Description with subtle underline like reference image */}
            <div className="max-w-3xl mx-auto mb-12 sm:mb-14">
              <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-white/70 font-sans">
                {profileData.about}
              </p>
              <div
                className="mt-6 w-full max-w-2xl mx-auto h-px opacity-25"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent)',
                }}
              />
            </div>

            {/* Profile Identity - Unboxed & Seamless (NO CARD BOX / NO BORDER) */}
            <div className="flex flex-col items-center mb-10 sm:mb-12">
              <div className="relative group/avatar mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-50 blur-sm group-hover/avatar:opacity-100 transition-opacity duration-500" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border border-white/25 bg-black overflow-hidden shadow-2xl">
                  <img
                    src="/image.jpg"
                    alt={profileData.name}
                    className="w-full h-full rounded-full object-cover transition-transform duration-700 group-hover/avatar:scale-105"
                  />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {profileData.name}
              </h3>
              <div className="text-xs font-mono text-white/60 tracking-wider uppercase mt-1">
                AI &amp; Full Stack Engineer
              </div>
              <div className="text-xs font-mono text-white/50 flex items-center gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 text-white/60" />
                <span>{profileData.location}</span>
              </div>
            </div>

            {/* Action Buttons: Clean Monochrome Theme */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
              <a
                href="/Veeranuth_Sukluea_CV.pdf"
                download="Veeranuth_Sukluea_CV.pdf"
                className="px-6 py-3 bg-white text-black hover:bg-white/90 rounded-lg text-xs sm:text-sm font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.2)] active:scale-95 font-mono cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Full CV (PDF)</span>
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="px-5 py-3 bg-white/[0.04] hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/50 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-md active:scale-95 font-mono cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white/[0.04] hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/50 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-md active:scale-95 font-mono cursor-pointer"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={`tel:${profileData.phone}`}
                className="px-5 py-3 bg-white/[0.04] hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/50 rounded-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 font-mono backdrop-blur-md active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{profileData.phone}</span>
              </a>
            </div>

            {/* Bottom Micro-Caption like in the reference image */}
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-6">
              * REAL-TIME AI INFERENCE, HIGH-CONCURRENCY ARCHITECTURE, ISO/IEC 29110 QUALITY STANDARDS.
            </div>

            {/* Bottom 3-Dot Minimal Indicator from the reference image */}
            <div className="flex justify-center space-x-3 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

          </div>
        </section>

        {/* === 3. SELECTED WORKS (CLEAN 3x3 EXECUTIVE DOSSIER) === */}
        <section id="projects" className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-14 bg-black">
          {/* Subtle Technical Ambient Background (Fine grid, micro data-nodes & cursor spotlight) */}
          <SubtleTechBackground variant="projects" />

          <div className="relative z-10 max-w-[1520px] mx-auto space-y-10">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-white/50 block mb-2 font-mono">
                  Verified Engineering Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Selected Works
                </h2>
                <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl font-light">
                  Clean, production-grade architectures matching CV deliverables and measurable business outcomes.
                </p>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white/[0.04] border border-white/10">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${filterCategory === 'all'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-white/70 hover:text-white'
                      }`}
                  >
                    All Works ({profileData.projects.length})
                  </button>
                  <button
                    onClick={() => setFilterCategory('enterprise')}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${filterCategory === 'enterprise'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-white/70 hover:text-white'
                      }`}
                  >
                    <span>Enterprise ({enterpriseCount})</span>
                  </button>
                  <button
                    onClick={() => setFilterCategory('aiml')}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${filterCategory === 'aiml'
                      ? 'bg-white text-black font-semibold shadow'
                      : 'text-white/70 hover:text-white'
                      }`}
                  >
                    <span>AI/ML ({aimlCount})</span>
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stack, model..."
                    className="pl-8 pr-7 py-1.5 bg-white/[0.04] border border-white/10 focus:border-white/40 rounded-lg text-xs font-mono text-white placeholder-white/40 focus:outline-none transition-all w-full sm:w-48"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 2-COLUMN CLEAN PROJECT GRID (1 COLUMN ON MOBILE/TABLET, SPACIOUS & EASY TO READ) */}
            {filteredProjects.length === 0 ? (
              <div className="p-16 text-center rounded-2xl bg-white/[0.02] border border-white/10 text-white/50">
                <p className="text-base mb-2">No projects matching your search filter "{searchQuery}".</p>
                <button
                  onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                  className="text-xs text-white hover:underline font-mono"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard3D
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* === 4. TECHNICAL SKILLS MATRIX === */}
        <section id="skills" className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-14 bg-black">
          {/* Subtle Technical Ambient Background */}
          <SubtleTechBackground variant="skills" />

          <div className="relative z-10 max-w-[1520px] mx-auto space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-white/50 block mb-2 font-mono">
                Competencies & Tooling
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Engineering Stack
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-2 font-light">
                Full-spectrum technical stack spanning Generative AI, machine learning algorithms, high-concurrency engines & production standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.skillCategories.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/[0.02] border border-white/12 hover:border-white/30 rounded-2xl p-6 transition-all hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                      <div className="p-2 rounded-lg border border-white/20 bg-white/5 text-white">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        {cat.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-white/[0.04] hover:bg-white/10 border border-white/10 rounded-md text-xs font-mono text-white/80 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === 5. GITHUB ACTIVITY & 3D SKYLINE (MONOCHROME PALETTE) === */}
        <section id="github" className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-14 bg-black">
          <div className="max-w-[1520px] mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-white/50 block mb-2 font-mono">
                  Code Contributions
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  GitHub Skyline
                </h2>
                <p className="text-white/60 text-sm mt-1 font-light">
                  Isometric 3D timeline & commit frequency analysis.
                </p>
              </div>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>github.com/sodium6</span>
                <span>↗</span>
              </a>
            </div>

            <div className="w-full">
              {loadingGit ? (
                <div className="h-64 flex items-center justify-center bg-white/[0.02] border border-white/10 rounded-2xl text-white/50">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Loading GitHub activity for @sodium6...</span>
                  </div>
                </div>
              ) : (
                <ContributionSkyline
                  data={gitContributions || undefined}
                  palette="mono"
                  defaultView="3d"
                  heightScale={1.1}
                  title={
                    <span className="font-mono text-xs text-white/80">
                      GitHub commit matrix for <strong className="font-semibold text-white">@sodium6</strong>
                    </span>
                  }
                  className="!bg-black !border-white/15 !text-white shadow-2xl"
                />
              )}
            </div>
          </div>
        </section>

        {/* === 6. CONTACT & CONNECT SECTION (BORDERLESS EDITORIAL REDESIGN) === */}
        <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-14 bg-black overflow-hidden">
          {/* Subtle ambient spotlight in background */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.025] blur-[140px] rounded-full" />

          {/* 3D Geodesic Constellation Globe (Enlarged slightly & shifted right behind cards) */}
          <div className="pointer-events-none absolute right-[-6%] sm:right-[-4%] md:right-[-2%] lg:right-[0%] xl:right-[1%] top-[-20px] sm:top-[-60px] md:top-[-80px] w-[500px] sm:w-[650px] md:w-[780px] lg:w-[920px] xl:w-[1020px] h-[500px] sm:h-[650px] md:h-[780px] lg:h-[920px] xl:h-[1020px] z-0 overflow-visible opacity-85">
            <NeuralSphereCanvas />
          </div>

          <div className="relative z-10 max-w-[1520px] mx-auto space-y-12">
            {/* Header */}
            <div className="max-w-2xl lg:max-w-3xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
                Ready to Build Next-Generation <span className="text-white">AI Systems?</span>
              </h2>

              <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Whether you are architecting distributed microservices, developing high-throughput RAG pipelines, or looking for a passionate AI &amp; Full Stack engineer — feel free to reach out anytime.
              </p>
            </div>

            {/* 4 Action Cards Grid (Sitting in front of the 3D Globe with glass backdrop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Email */}
              <a
                href={`mailto:${profileData.email}`}
                className="group relative p-6 rounded-2xl bg-black/40 backdrop-blur-md hover:bg-white/[0.06] border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[160px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/25 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-1">Direct Email</div>
                  <div className="text-sm font-semibold text-white truncate">{profileData.email}</div>
                  <div className="text-xs font-mono text-white/50 group-hover:text-white transition-colors mt-2">
                    Send Email ↗
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${profileData.phone}`}
                className="group relative p-6 rounded-2xl bg-black/40 backdrop-blur-md hover:bg-white/[0.06] border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[160px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/25 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-1">Phone & Mobile</div>
                  <div className="text-sm font-semibold text-white font-mono">{profileData.phone}</div>
                  <div className="text-xs font-mono text-white/50 group-hover:text-white transition-colors mt-2">
                    Direct Call ↗
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl bg-black/40 backdrop-blur-md hover:bg-white/[0.06] border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[160px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-white/25 transition-all">
                    <GitHubIcon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-1">GitHub Repos</div>
                  <div className="text-sm font-semibold text-white">github.com/sodium6</div>
                  <div className="text-xs font-mono text-white/50 group-hover:text-white transition-colors mt-2">
                    Open Profile ↗
                  </div>
                </div>
              </a>

              {/* CV Download (Primary Inverted Action Card) */}
              <a
                href="/Veeranuth_Sukluea_CV.pdf"
                download="Veeranuth_Sukluea_CV.pdf"
                className="group relative p-6 rounded-2xl bg-white text-black hover:bg-white/90 border border-white transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[160px] shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-105 transition-all">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 text-black font-semibold">
                    PDF DOC
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-black/60 mb-1">Curriculum Vitae</div>
                  <div className="text-base font-bold text-black leading-tight">Download CV (PDF)</div>
                  <div className="text-xs font-mono text-black/75 group-hover:text-black transition-colors mt-2 font-medium flex items-center gap-1">
                    <span>Get Resume File</span>
                    <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* === 7. SITE FOOTER === */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <footer className="py-12 px-4 sm:px-8 md:px-12 lg:px-20 bg-black flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4 font-mono">
          <div>
            © 2026 {profileData.name} • AI & Full Stack Engineer
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Selected Works
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Skills
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="/Veeranuth_Sukluea_CV.pdf" download className="hover:text-white transition-colors">
              Download CV
            </a>
          </div>
        </footer>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default HomePage;