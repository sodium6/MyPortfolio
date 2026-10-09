import React, { useState, useEffect, useMemo } from 'react';
import ContributionSkyline from '@/components/ui/contribution-skyline';
import ThreeHeroCanvas from '@/components/ui/ThreeHeroCanvas';
import ModalHologramCanvas from '@/components/ui/ModalHologramCanvas';
import ProjectCard3D from '@/components/ui/ProjectCard3D';
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
    Sparkles
} from 'lucide-react';

// GitHub SVG Icon
const GitHubIcon = ({ className = 'w-5 h-5' }) => (
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

    // All 9 projects strictly matching PROJECT_USECASES.md
    projects: [
        {
            id: 'procurement-strategy',
            name: 'AI Strategic Procurement Platform',
            company: 'BEATRIX CO., LTD.',
            category: 'enterprise',
            period: '2025–2026',
            role: 'AI & Full Stack Developer',
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
            metrics: '1,700x Speedup • 100% Pass @ 1,000 VUs • < 1.60ms Latency',
            architecture: 'Node.js (Cluster Mode) + Express.js + MySQL 8.0 + In-Memory Caching',
            shortDesc: 'Ultra-high concurrency purchasing club & media platform optimized with multi-core clustering, SWR in-memory caching, and B-tree indexes yielding 1,700x speedup.',
            fullDesc: 'Architected and optimized a high-traffic purchasing club and news distribution platform supporting 1,000–10,000 concurrent users. Implemented Node.js multi-core clustering, stale-while-revalidate in-memory caching, and targeted database indexing to eliminate query bottlenecks under intense concurrency.',
            highlights: [
                'High-Concurrency Architecture: Scaled to 1,000–10,000 concurrent users using Node.js Multi-core Cluster and Stale-While-Revalidate In-Memory Caching, slashing database workload by over 95%.',
                'Database Index Optimization: Eliminated N+1 query bottlenecks through B-Tree composite indexing and optimized single LEFT JOIN execution plans.',
                'Performance Benchmark (Grafana k6): Achieved a 1,700x speedup (News API latency reduced from 2,726.35 ms to 1.60 ms), 0% failure rate under 1,000 Virtual Users (100% pass rate), with all endpoints beating the < 350 ms SLA.',
                'Enterprise Integration: Integrated Smart Connect Single Sign-On (SSO) and tiered membership privileges for professional purchasers.'
            ],
            tech: ['Node.js (Cluster)', 'Express.js', 'MySQL 8.0', 'In-Memory Caching', 'Grafana k6', 'GitHub Actions', 'SSO']
        },
        {
            id: 'amc-training',
            name: 'AMC Training Center',
            company: 'BEATRIX CO., LTD.',
            category: 'enterprise',
            period: '2025–2026',
            role: 'Full Stack Developer & UI Designer',
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
            color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
            skills: ['Retrieval-Augmented Generation (RAG)', 'LLM Orchestration', 'Vector Embeddings (bge-m3)', 'pgvector', 'OpenRouter / Gemini / Claude', 'Ollama (Local SLM/LLM)', 'Prompt Engineering']
        },
        {
            title: 'Machine Learning & Time Series',
            icon: TrendingUp,
            color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
            skills: ['Collaborative Filtering (CF)', 'Content-Based Filtering', 'Hybrid Recommender', 'ARIMAX Time Series', 'Anomaly Detection (|Z| > 2)', 'scikit-learn', 'statsmodels', 'Precision / Recall / F1@K']
        },
        {
            title: 'Computer Vision & Deep Learning',
            icon: Cpu,
            color: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
            skills: ['OpenCV', 'MediaPipe Hand Tracking', 'Convolutional Neural Networks (CNN)', 'VGG16', 'MobileNetV2', 'Data Preprocessing & Augmentation', 'Real-time Video Inference']
        },
        {
            title: 'Backend & High-Concurrency Systems',
            icon: Server,
            color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
            skills: ['Go 1.22 (Clean Architecture)', 'Python (FastAPI)', 'NestJS', 'Node.js (Cluster Mode)', 'Express.js', 'In-Memory Caching (SWR)', 'PostgreSQL / MySQL 8.0', 'RESTful API Design']
        },
        {
            title: 'Frontend & 3D Web Graphics',
            icon: Layers,
            color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
            skills: ['Next.js 14', 'React 19 / Vite', 'Three.js (3D WebGL)', 'TypeScript / JavaScript', 'Tailwind CSS', 'Glassmorphism & Bento Grid UI', 'Interactive Canvas Graphics']
        },
        {
            title: 'DevOps, Standards & QA',
            icon: ShieldCheck,
            color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
            skills: ['ISO/IEC 29110 Standard', 'Grafana k6 Load Testing', 'Docker & Containerization', 'Playwright E2E Testing', 'Azure AD SSO', 'GitHub Actions CI/CD', 'Prisma ORM']
        }
    ]
};

// Expansive Bento Project Modal Component
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
                className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity cursor-pointer"
                onClick={onClose}
            />

            {/* Expansive Modal Card (max-w-5xl / 6xl, spacious 2-column bento) */}
            <div className="relative w-full max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0b0b16]/95 backdrop-blur-2xl border border-purple-500/30 rounded-3xl sm:rounded-[32px] shadow-2xl shadow-purple-950/60 z-10 p-6 sm:p-8 md:p-10 animate-modal-enter flex flex-col">
                {/* Glowing Top Gradient Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-t-3xl" />

                {/* Close Button Header */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-400/40 rounded-full text-white transition-all hover:rotate-90 hover:scale-110 z-20 cursor-pointer shadow-lg"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Modal Header: Category, Period, Company, Metrics & Titles */}
                <div className="pr-12 mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3.5">
                        {/* Period Pill */}
                        <span className="text-xs px-3.5 py-1 bg-white/5 text-gray-200 rounded-full font-mono font-medium border border-white/10">
                            {project.period}
                        </span>

                        {/* Category Pill */}
                        <span
                            className={`text-xs px-3.5 py-1 rounded-full font-mono font-semibold border flex items-center gap-1.5 ${
                                isEnterprise
                                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                    : 'bg-pink-500/10 text-pink-300 border-pink-500/30'
                            }`}
                        >
                            {isEnterprise ? <ShieldCheck className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
                            <span>{isEnterprise ? 'Enterprise & Production' : 'AI, ML & Deep Learning'}</span>
                        </span>

                        {/* Company Pill */}
                        <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full font-mono font-medium border border-purple-500/20">
                            {project.company}
                        </span>

                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                        {project.name}
                    </h2>
                    <p className="text-purple-400 text-sm sm:text-base md:text-lg font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        <span>{project.role}</span>
                    </p>
                </div>

                {/* 2-Column Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                    {/* Left Column (Main Specs, Architecture, Overview, Use Cases) - 7 cols */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* 1. System Architecture Banner */}
                        {project.architecture && (
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-black/60 border border-purple-500/25 shadow-lg">
                                <div className="text-xs uppercase font-mono tracking-wider text-purple-300 font-semibold mb-2 flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-purple-400" />
                                    <span>System Architecture & Core Engine</span>
                                </div>
                                <p className="text-sm sm:text-base font-mono text-gray-100 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/5">
                                    {project.architecture}
                                </p>
                            </div>
                        )}

                        {/* 2. Project Overview */}
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-400" />
                                <span>Project Overview & Scope</span>
                            </h3>
                            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                {project.fullDesc || project.shortDesc}
                            </p>
                        </div>

                        {/* 3. Key Use Cases & Verified Features */}
                        {project.highlights && project.highlights.length > 0 && (
                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3.5 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span>Key Use Cases & Implemented Features</span>
                                </h3>
                                <div className="space-y-3">
                                    {project.highlights.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 text-gray-300 text-sm sm:text-base bg-black/30 hover:bg-black/50 p-3.5 rounded-xl border border-white/5 hover:border-purple-500/20 transition-all"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0 border border-emerald-500/30">
                                                ✓
                                            </span>
                                            <span className="leading-relaxed text-gray-200">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Interactive 3D Core, Tech Stack, Metadata) - 5 cols */}
                    <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                        {/* 1. Interactive 3D System Pipeline Visualizer */}
                        <div>
                            <ModalHologramCanvas project={project} />
                        </div>

                        {/* 2. Technologies & Standards Matrix */}
                        {project.tech && (
                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex-1">
                                <h3 className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-cyan-400" />
                                    <span>Technologies & Standards</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 border border-purple-500/30 hover:border-purple-400/60 rounded-xl text-xs sm:text-sm font-mono font-medium transition-colors"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 3. Quick Metadata / System Specs Summary Card */}
                        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-gray-400">
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <span className="text-gray-500">Domain Classification</span>
                                <span className="text-gray-200 font-medium">{isEnterprise ? 'Enterprise Mission-Critical' : 'AI / Machine Learning R&D'}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-white/5">
                                <span className="text-gray-500">Execution Timeline</span>
                                <span className="text-purple-300 font-medium">{project.period}</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-500">Deployment Status</span>
                                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Production Verified
                                </span>
                            </div>
                        </div>

                        {/* Close Action Button */}
                        <button
                            onClick={onClose}
                            className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl text-white font-medium transition-all shadow-lg shadow-purple-600/30 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.01]"
                        >
                            <span>Back to Portfolio Overview</span>
                            <span>✕</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Index = () => {
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
                console.warn('Could not load live GitHub contributions, falling back to simulated skyline:', err);
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
        <div className="min-h-screen bg-[#07070d] text-gray-100 selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[200px]" />
                <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[200px]" />
                {/* Cyber Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Main Content Layout */}
            <main className="relative z-10 min-h-screen px-4 py-6 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16">
                <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-14">

                    {/* === 1. HERO SECTION: Seamless 3D Atmosphere + Profile === */}
                    <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl overflow-hidden min-h-[460px] flex items-center">
                        {/* Glow accent line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 z-10" />

                        {/* Seamless Three.js 3D WebGL Canvas Layer (Border-free, blends naturally with hero) */}
                        <div className="absolute inset-0 pointer-events-auto z-0 overflow-hidden">
                            <ThreeHeroCanvas />
                        </div>

                        {/* Foreground Content */}
                        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
                            {/* Left Column: Avatar & Profile Info (7 cols on desktop to give generous room on the right) */}
                            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pointer-events-auto">
                                {/* Avatar with Glowing Rings */}
                                <div className="relative flex-shrink-0 group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
                                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-2xl">
                                        <img
                                            src="/image.jpg"
                                            alt={profileData.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-emerald-500 border-2 border-[#07070d] w-5 h-5 rounded-full" title="Available for opportunities" />
                                </div>

                                {/* Text Info */}
                                <div className="text-center sm:text-left flex-1">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                        <span>{profileData.title}</span>
                                    </div>

                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight tracking-tight">
                                        {profileData.name}
                                    </h1>

                                    <p className="text-gray-400 text-sm mb-4 flex items-center justify-center sm:justify-start gap-2">
                                        <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                        <span>{profileData.location}</span>
                                    </p>

                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                                        {profileData.about}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                        <a
                                            href={`mailto:${profileData.email}`}
                                            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-white text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-purple-600/30 flex items-center gap-2"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span>Email Me</span>
                                        </a>

                                        <a
                                            href={`tel:${profileData.phone}`}
                                            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                                        >
                                            <Phone className="w-4 h-4 text-cyan-400" />
                                            <span>{profileData.phone}</span>
                                        </a>

                                        <a
                                            href={profileData.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
                                        >
                                            <GitHubIcon className="w-4 h-4" />
                                            <span>GitHub</span>
                                        </a>

                                        <a
                                            href="/Veeranuth_Sukluea_CV.pdf"
                                            download="Veeranuth_Sukluea_CV.pdf"
                                            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl text-white text-sm font-medium transition-all hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center gap-2"
                                        >
                                            <FileText className="w-4 h-4" />
                                            <span>Download CV</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Interaction Zone & Subtle 3D indicator (5 cols on desktop) */}
                            <div className="hidden lg:flex lg:col-span-5 h-full min-h-[300px] flex-col justify-end items-end pointer-events-none p-2">
                                <div className="text-[11px] font-mono text-gray-400/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-auto">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span>Interactive 3D WebGL (Drag to orbit)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === 2. PROJECTS FILTER & SEARCH BAR === */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => setFilterCategory('all')}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                                    filterCategory === 'all'
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                All Systems ({profileData.projects.length})
                            </button>
                            <button
                                onClick={() => setFilterCategory('enterprise')}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                                    filterCategory === 'enterprise'
                                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Enterprise & Production ({enterpriseCount})</span>
                            </button>
                            <button
                                onClick={() => setFilterCategory('aiml')}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                                    filterCategory === 'aiml'
                                        ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Brain className="w-3.5 h-3.5" />
                                <span>AI, ML & Deep Learning ({aimlCount})</span>
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search stack, ML model, keyword..."
                                className="w-full pl-10 pr-8 py-2 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* === 3. PROJECTS SHOWCASE GRID (According to PROJECT_USECASES.md) === */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                <Box className="w-5 h-5 text-purple-400" />
                                <span>Projects & Architecture Portfolio</span>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                                    {filteredProjects.length} systems
                                </span>
                            </h2>
                            <span className="text-xs text-gray-500 hidden sm:inline">
                                Click any card to inspect architecture, use cases & benchmarks
                            </span>
                        </div>

                        {filteredProjects.length === 0 ? (
                            <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-gray-400">
                                <p className="text-base mb-2">No projects matching your search filter "{searchQuery}".</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                                >
                                    Reset filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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

                    {/* === 4. TECHNICAL SKILLS MATRIX (BENTO GRID) === */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-amber-400" />
                                    <span>Technical Skills & Engineering Competencies</span>
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">
                                    Full spectrum capabilities spanning Generative AI, Machine Learning, Systems Architecture & Production Standards
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profileData.skillCategories.map((cat, idx) => {
                                const IconComponent = cat.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white/[0.02] border border-white/5 hover:border-purple-500/20 rounded-2xl p-5 sm:p-6 transition-all hover:bg-white/[0.04]"
                                    >
                                        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/5">
                                            <div className={`p-2 rounded-xl border ${cat.color}`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-sm font-semibold text-white">
                                                {cat.title}
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {cat.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2.5 py-1 bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/30 rounded-lg text-xs text-gray-300 hover:text-white transition-all cursor-default"
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

                    {/* === 5. GITHUB SKYLINE 3D ACTIVITY === */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                    <Network className="w-5 h-5 text-purple-400" />
                                    <span>GitHub Activity & 3D Skyline</span>
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Isometric 3D timeline & heat map of software engineering commits
                                </p>
                            </div>
                            <a
                                href={profileData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs sm:text-sm text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-1 font-mono"
                            >
                                <span>github.com/sodium6</span>
                                <span>↗</span>
                            </a>
                        </div>

                        <div className="w-full">
                            {loadingGit ? (
                                <div className="h-64 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-2xl text-gray-400">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                        <span>Loading GitHub activity for @sodium6...</span>
                                    </div>
                                </div>
                            ) : (
                                <ContributionSkyline
                                    data={gitContributions || undefined}
                                    palette="grape"
                                    defaultView="3d"
                                    heightScale={1.1}
                                    title={
                                        <span>
                                            GitHub activity for <strong className="font-semibold text-purple-300">@sodium6</strong> in the last year
                                        </span>
                                    }
                                    className="!bg-[#0c0c14] !border-white/10 !text-gray-100 shadow-xl"
                                />
                            )}
                        </div>
                    </div>

                    {/* === 6. FOOTER === */}
                    <footer className="pt-6 pb-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                        <div className="flex items-center gap-2">
                            <span>© 2026 {profileData.name}</span>
                            <span>•</span>
                            <span className="text-purple-400 font-medium">AI & Full Stack Engineer</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                GitHub
                            </a>
                            <a href={`mailto:${profileData.email}`} className="hover:text-gray-300 transition-colors">
                                Email
                            </a>
                            <a href="/Veeranuth_Sukluea_CV.pdf" download className="text-purple-400 hover:text-purple-300 transition-colors">
                                Download CV
                            </a>
                        </div>
                    </footer>

                </div>
            </main>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default Index;