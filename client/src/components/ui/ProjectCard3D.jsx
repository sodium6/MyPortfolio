import React, { useRef, useState, useCallback } from 'react';
import { ArrowUpRight, ShieldCheck, Brain } from 'lucide-react';

/**
 * ProjectCard3D
 * Clean, Spacious Executive Engineering Card:
 * - Uncluttered, elegant spacing for effortless readability
 * - Interactive cursor spotlight & perspective physics tilt
 * - High-contrast typography & clean category pill
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

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
    setSpotlightPos({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const isEnterprise = project.category === 'enterprise';

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transform ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.015] to-black/95 backdrop-blur-2xl border border-white/10 hover:border-white/35 shadow-[0_8px_30px_rgb(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)] cursor-pointer overflow-hidden select-none p-7 sm:p-8 md:p-9 transition-all duration-300 min-h-[340px]"
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`
        }}
      />

      {/* Luxury Border Glow Tracker on Hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 rounded-2xl"
        style={{
          opacity: spotlightPos.opacity * 0.7,
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.18), transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Top subtle ambient border light accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* CARD HEADER & METADATA */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Tag */}
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md border font-medium transition-all duration-200 group-hover:bg-white/15 ${
              isEnterprise
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-white/[0.08] text-white/95 border-white/20'
            }`}>
              {isEnterprise ? (
                <ShieldCheck className="w-3.5 h-3.5 text-white/90" />
              ) : (
                <Brain className="w-3.5 h-3.5 text-white/90" />
              )}
              <span>{isEnterprise ? 'Enterprise' : 'AI / ML'}</span>
            </span>

            {/* Period */}
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/8 group-hover:border-white/15 transition-colors">
              {project.period}
            </span>
          </div>

          {/* Inspect Icon Pill */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50 group-hover:text-white transition-colors">
            <span className="hidden sm:inline transition-opacity duration-200">Case Study</span>
            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-white group-hover:text-black border border-white/15 group-hover:border-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </div>
        </div>

        {/* Company Context */}
        <div className="text-[11px] font-mono uppercase tracking-wider text-white/45 mb-1.5 group-hover:text-white/60 transition-colors">
          {project.company}
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug tracking-tight group-hover:translate-x-0.5 transition-transform duration-200">
          {project.name}
        </h3>

        {/* Role */}
        <div className="text-xs font-medium text-white/70 mb-5 flex items-center gap-2">
          <span className="group-hover:text-white/90 transition-colors">{project.role}</span>
        </div>

        {/* Clean, Readable Description with Spacious Typography */}
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 font-light line-clamp-4 group-hover:text-white/90 transition-colors">
          {project.shortDesc}
        </p>
      </div>

      {/* CARD FOOTER: TECH STACK & CTA */}
      <div className="relative z-10 pt-4 border-t border-white/10 group-hover:border-white/20 flex items-center justify-between gap-2 transition-colors">
        <div className="flex flex-wrap items-center gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.09] text-white/80 hover:text-white border border-white/10 hover:border-white/25 font-mono transition-all duration-200"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.02] text-white/45 border border-white/5 font-mono">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <span className="text-xs text-white/50 font-mono group-hover:text-white transition-colors flex-shrink-0 flex items-center gap-1">
          <span>Details</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
        </span>
      </div>
    </article>
  );
};

export default ProjectCard3D;
