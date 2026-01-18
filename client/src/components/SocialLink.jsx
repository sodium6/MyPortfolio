import React from 'react';

const SocialLink = ({ href, icon, label, color = 'purple' }) => {
    const colorMap = {
        purple: {
            hover: 'group-hover:bg-purple-600',
            glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]',
            ring: 'group-hover:ring-purple-500/50'
        },
        pink: {
            hover: 'group-hover:bg-pink-600',
            glow: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]',
            ring: 'group-hover:ring-pink-500/50'
        },
        blue: {
            hover: 'group-hover:bg-blue-600',
            glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]',
            ring: 'group-hover:ring-blue-500/50'
        },
        green: {
            hover: 'group-hover:bg-emerald-600',
            glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]',
            ring: 'group-hover:ring-emerald-500/50'
        },
        gray: {
            hover: 'group-hover:bg-gray-600',
            glow: 'group-hover:shadow-[0_0_30px_rgba(107,114,128,0.5)]',
            ring: 'group-hover:ring-gray-500/50'
        },
    };

    const colors = colorMap[color] || colorMap.purple;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`
        group
        relative
        w-12 h-12 
        sm:w-14 sm:h-14
        flex items-center justify-center
        bg-white/5
        backdrop-blur-sm
        border border-purple-500/20
        rounded-2xl
        text-purple-300
        transition-all duration-400 ease-out
        hover:scale-110
        hover:border-transparent
        hover:text-white
        hover:rotate-3
        ring-2 ring-transparent
        ${colors.hover}
        ${colors.glow}
        ${colors.ring}
        active:scale-95
      `}
        >
            {/* Background glow */}
            <div className={`
        absolute inset-0 
        rounded-2xl
        opacity-0 
        group-hover:opacity-100
        transition-opacity duration-300
        ${colors.hover}
        blur-xl
      `} />

            <span className="
        relative z-10
        text-xl sm:text-2xl 
        transition-all duration-300 
        group-hover:scale-110
        group-hover:drop-shadow-lg
      ">
                {icon}
            </span>

            {/* Tooltip */}
            <span className="
        absolute -bottom-10 left-1/2 -translate-x-1/2
        px-3 py-1.5
        bg-gray-900/95
        backdrop-blur-sm
        text-xs text-white
        font-medium
        rounded-lg
        opacity-0 group-hover:opacity-100
        translate-y-2 group-hover:translate-y-0
        transition-all duration-300
        whitespace-nowrap
        pointer-events-none
        z-20
        border border-gray-700/50
        shadow-xl
      ">
                {label}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 border-l border-t border-gray-700/50 rotate-45" />
            </span>
        </a>
    );
};

export default SocialLink;
