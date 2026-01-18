import React, { useState } from 'react';

const profileData = {
    name: 'Veeranuth Sukluea',
    title: 'AI Engineer',
    phone: '063-7810-956',
    email: 'veeranuth.dev@outlook.co.th',
    github: 'https://github.com/sodium6',
    location: 'Nonthaburi, Thailand',
    about: 'Passionate about AI, focusing on Large Language Models (LLMs) and their applications in creating innovative solutions.',

    education: {
        degree: 'B.Sc. Computer Science',
        university: 'Suan Dusit University',
        year: '2025',
        gpa: '3.83'
    },

    projects: [
        {
            name: 'AI-Powered Procurement Strategy Support System',
            year: '2025-26',
            shortDesc: 'AI-driven procurement strategy support system with Hybrid RAG and ML models.',
            fullDesc: 'Designed and developed an AI-driven procurement strategy support system, including ISO/IEC 29110 documentation, a web application, Hybrid RAG–based knowledge retrieval and chatbot, machine learning models for purchase demand prediction, and deployment to a production server.',
            role: 'Full Stack Developer & AI Engineer',
            highlights: [
                'Built Hybrid RAG system for intelligent document retrieval',
                'Developed AI chatbot for procurement queries',
                'Implemented ML models for demand prediction',
                'Created ISO/IEC 29110 compliant documentation',
                'Deployed to production server'
            ],
            tech: ['RAG', 'LLM', 'Machine Learning', 'Chatbot', 'React', 'Node.js', 'PostgreSQL']
        },
        {
            name: 'Thai-link.net Website',
            year: '2025',
            shortDesc: 'Full Stack web platform for Thai entrepreneurs.',
            fullDesc: 'Contributed as a Full Stack Developer to the development of Thai-link.net, implementing frontend and backend features and deploying the system to a production environment to support Thai entrepreneurs through news and promotional content.',
            role: 'Full Stack Developer',
            highlights: [
                'Implemented responsive frontend with React',
                'Built RESTful API backend with Node.js',
                'Integrated content management system',
                'Deployed to production environment',
                'Optimized for performance and SEO'
            ],
            tech: ['React', 'Node.js', 'Full Stack', 'Production', 'REST API']
        },
        {
            name: 'RAG Product Search System',
            year: '2025',
            shortDesc: 'AI-powered product search using RAG architecture.',
            fullDesc: 'Developed a RAG application integrating Supabase (PostgreSQL/pgvector) for data/vector storage, BAAI/bge-m3 for embeddings, and gemma3:1b (Ollama) as the LLM, all connected via a FastAPI backend.',
            role: 'AI Developer',
            highlights: [
                'Implemented vector search with pgvector',
                'Integrated BAAI/bge-m3 embeddings model',
                'Set up Ollama with gemma3:1b LLM',
                'Built FastAPI backend for API endpoints',
                'Achieved fast and accurate product search'
            ],
            tech: ['RAG', 'FastAPI', 'Supabase', 'pgvector', 'Ollama', 'Python']
        },
        {
            name: 'Air Writing & Alphabet Recognition',
            year: '2024-25',
            shortDesc: 'CNN-based handwritten alphabet recognition achieving 97% accuracy.',
            fullDesc: 'Collected and preprocessed image data for model training. Developed and optimized CNN models (VGG16 & MobileNetV2), achieving 97% accuracy in handwritten alphabet recognition.',
            role: 'ML Engineer',
            highlights: [
                'Collected and preprocessed image datasets',
                'Trained VGG16 model for recognition',
                'Optimized MobileNetV2 for mobile deployment',
                'Achieved 97% recognition accuracy',
                'Implemented real-time prediction'
            ],
            tech: ['CNN', 'VGG16', 'MobileNetV2', 'Computer Vision', 'TensorFlow', 'OpenCV']
        },
        {
            name: 'Emotional Face Detection',
            year: '2023',
            shortDesc: 'Deep learning system for facial emotion detection.',
            fullDesc: 'Led team to collect and preprocess image datasets for model training. Trained and fine-tuned deep learning models to improve accuracy. Developed a Flask-based backend for image emotion detection.',
            role: 'Team Lead & ML Engineer',
            highlights: [
                'Led a team of developers',
                'Collected and labeled emotion datasets',
                'Trained deep learning models for emotion detection',
                'Built Flask API for real-time inference',
                'Managed project workflow and coordination'
            ],
            tech: ['Deep Learning', 'Flask', 'Team Lead', 'OpenCV', 'TensorFlow', 'Python']
        },
    ],

    skills: ['Python', 'React', 'Node.js', 'FastAPI', 'Flask', 'PostgreSQL', 'LLM', 'RAG', 'CNN', 'Huggingface', 'Docker', 'Git']
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-900/30">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-xl transition-all z-10"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="p-6 sm:p-8 pb-0">
                    <span className="inline-block text-sm px-4 py-1.5 bg-purple-500/20 text-purple-300 rounded-full mb-4">
                        {project.year}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 pr-10">
                        {project.name}
                    </h2>
                    <p className="text-purple-400 text-lg font-medium mb-4">
                        {project.role}
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 pt-4">
                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Description</h3>
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                            {project.fullDesc}
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Key Highlights</h3>
                        <ul className="space-y-2">
                            {project.highlights.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="text-purple-400 mt-1">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span key={t} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl text-sm font-medium">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 sm:p-8 pt-0">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-medium transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Index = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Gradient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 min-h-screen px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24">
                <div className="w-full max-w-7xl mx-auto">

                    {/* Main Card */}
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl">

                        {/* === Header - Horizontal on Desktop === */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16 mb-10 sm:mb-12 md:mb-14 lg:mb-16">

                            {/* Left: Avatar + Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 md:gap-8 lg:flex-1 mb-8 sm:mb-10 lg:mb-0">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40" />
                                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full p-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
                                        <img
                                            src="/image.jpg"
                                            alt={profileData.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="text-center sm:text-left flex-1">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                                        {profileData.name}
                                    </h1>
                                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-purple-400 font-medium mb-3 sm:mb-4">
                                        {profileData.title}
                                    </p>
                                    <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto sm:mx-0">
                                        {profileData.about}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Contact */}
                            <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto lg:w-64 xl:w-72">
                                <a href={`mailto:${profileData.email}`} className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-purple-500 hover:bg-purple-400 rounded-full text-white text-base sm:text-lg md:text-xl font-medium transition-all hover:scale-105 text-center shadow-lg shadow-purple-500/20">
                                    ✉️ Email Me
                                </a>
                                <a href={`tel:${profileData.phone}`} className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 text-base sm:text-lg md:text-xl transition-all hover:scale-105 text-center">
                                    📱 {profileData.phone}
                                </a>

                                <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full text-white text-base sm:text-lg md:text-xl font-medium transition-all hover:scale-105 text-center">
                                    💻 GitHub
                                </a>
                                <a
                                    href="/Veeranuth Sukluea.pdf"
                                    download="Veeranuth_Sukluea_CV.pdf"
                                    className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full text-white text-base sm:text-lg md:text-xl font-medium transition-all hover:scale-105 text-center shadow-lg shadow-purple-500/30"
                                >
                                    📄 Download CV
                                </a>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10 sm:mb-12 md:mb-14 lg:mb-16" />

                        {/* === Education & Skills Row on Desktop === */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-12 md:mb-14 lg:mb-16">

                            {/* Education */}
                            <div>
                                <h2 className="text-sm sm:text-base uppercase tracking-[0.2em] text-gray-500 mb-4 sm:mb-5 md:mb-6">🎓 Education</h2>
                                <div className="p-5 sm:p-6 md:p-7 lg:p-8 bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl hover:border-white/10 transition-all">
                                    <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-1.5 sm:mb-2">{profileData.education.degree}</p>
                                    <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">{profileData.education.university}</p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium">GPA {profileData.education.gpa}</span>
                                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 text-gray-400 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg">{profileData.education.year}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="text-sm sm:text-base uppercase tracking-[0.2em] text-gray-500 mb-4 sm:mb-5 md:mb-6">⚡ Skills</h2>
                                <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                                    {profileData.skills.map((skill) => (
                                        <span key={skill} className="px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 bg-white/5 border border-white/5 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg text-gray-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10 sm:mb-12 md:mb-14 lg:mb-16" />

                        {/* === Projects === */}
                        <div>
                            <h2 className="text-sm sm:text-base uppercase tracking-[0.2em] text-gray-500 mb-5 sm:mb-6 md:mb-7 lg:mb-8">🚀 Projects <span className="text-purple-400 text-xs normal-case">(Click for details)</span></h2>

                            {/* Projects Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
                                {profileData.projects.map((project, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedProject(project)}
                                        className="p-5 sm:p-6 md:p-7 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 rounded-xl sm:rounded-2xl transition-all group cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
                                    >
                                        {/* Year Badge */}
                                        <span className="inline-block text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 text-purple-300 rounded-full mb-3 sm:mb-4">{project.year}</span>

                                        {/* Title */}
                                        <h3 className="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-semibold text-white leading-tight mb-2.5 sm:mb-3 group-hover:text-purple-200 transition-colors min-h-[3rem] sm:min-h-[3.5rem]">{project.name}</h3>

                                        {/* Short Description */}
                                        <p className="text-gray-400 text-base sm:text-lg md:text-[18px] leading-relaxed mb-4 sm:mb-5 line-clamp-2">
                                            {project.shortDesc}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                                            {project.tech.slice(0, 3).map((t) => (
                                                <span key={t} className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-950/50 text-purple-300/80 rounded-md sm:rounded-lg border border-purple-500/10">
                                                    {t}
                                                </span>
                                            ))}
                                            {project.tech.length > 3 && (
                                                <span className="text-sm sm:text-base px-3 py-1.5 bg-purple-950/50 text-purple-300/80 rounded-md sm:rounded-lg border border-purple-500/10">
                                                    +{project.tech.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* View Details */}
                                        <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                                            <span className="text-sm font-medium">View Details</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mt-8 sm:mt-10 md:mt-12">
                        © 2026 Veeranuth Sukluea
                    </p>

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