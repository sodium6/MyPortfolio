import React, { useRef, useState, useCallback } from 'react';
import { Cpu, ArrowUpRight, Sparkles, ShieldCheck, Brain } from 'lucide-react';

/**
 * ProjectCard3D
 * Interactive 3D Perspective Card with dynamic cursor spotlight,
 * subtle physics tilt, and zero-overflow layout.
 */
const ProjectCard3D = ({ project, onSelect }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('');
    const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (-8 to 8 deg)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`);
        setSpotlightPos({ x, y, opacity: 1 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
        setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    }, []);

    const isEnterprise = project.category === 'enterprise';

    return (
        <div
            ref={cardRef}
            onClick={() => onSelect(project)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition: transform ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#0b0b16]/80 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-950/50 cursor-pointer overflow-hidden group select-none transition-colors duration-300"
        >
            {/* Dynamic Cursor Spotlight Overlay */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                    opacity: spotlightPos.opacity,
                    background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${
                        isEnterprise ? 'rgba(6, 182, 212, 0.15)' : 'rgba(168, 85, 247, 0.18)'
                    }, transparent 70%)`
                }}
            />

            {/* Glowing Corner Accents */}
            <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none ${
                    isEnterprise ? 'bg-cyan-500' : 'bg-purple-500'
                }`}
            />

            {/* TOP HALF: Header, Titles, Architecture & Overview */}
            <div className="relative z-10 flex-1 flex flex-col">
                {/* 1. Meta Tags Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {/* Period Pill */}
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 border border-white/10 font-medium">
                            {project.period}
                        </span>

                        {/* Category Pill */}
                        <span
                            className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 ${
                                isEnterprise
                                    ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                    : 'bg-pink-500/10 text-pink-300 border-pink-500/30'
                            }`}
                        >
                            {isEnterprise ? <ShieldCheck className="w-3 h-3" /> : <Brain className="w-3 h-3" />}
                            <span>{isEnterprise ? 'Enterprise' : 'AI / ML'}</span>
                        </span>
                    </div>

                    {/* View Details Action Link */}
                    <div className="flex items-center gap-1 text-xs font-medium text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
                        <span className="hidden sm:inline">Inspect</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                </div>


                {/* 3. Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors mb-1.5 leading-snug">
                    {project.name}
                </h3>

                {/* 4. Role & Subtitle */}
                <div className="text-xs font-semibold text-purple-400 mb-3.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{project.role}</span>
                </div>

                {/* 5. System Architecture Snippet (Robust Single-Line Truncation - Bug Free!) */}
                {project.architecture && (
                    <div
                        className="mb-4 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-[11px] font-mono text-gray-300 flex items-center gap-2 overflow-hidden shadow-inner group/arch hover:border-purple-500/30 transition-colors"
                        title={project.architecture}
                    >
                        <Cpu className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        <span className="truncate whitespace-nowrap overflow-hidden text-gray-300 block flex-1 font-mono">
                            {project.architecture}
                        </span>
                    </div>
                )}

                {/* 6. Short Description (Guaranteed clean 3-line max with proper overflow protection) */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 overflow-hidden flex-1">
                    {project.shortDesc}
                </p>
            </div>

            {/* BOTTOM HALF: Tech Stack Pills Footer */}
            <div className="relative z-10 pt-3.5 border-t border-white/5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                        <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 bg-white/5 text-purple-200/90 rounded-md border border-white/5 font-mono group-hover:border-purple-500/20 transition-colors"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="text-[11px] px-2 py-0.5 bg-white/5 text-gray-400 rounded-md border border-white/5 font-mono">
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>

                <span className="text-[11px] text-gray-500 font-mono group-hover:text-purple-400 transition-colors flex-shrink-0 hidden xs:inline">
                    Details →
                </span>
            </div>
        </div>
    );
};

export default ProjectCard3D;
