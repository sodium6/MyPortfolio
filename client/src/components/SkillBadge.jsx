import React from 'react';

const SkillBadge = ({ skill, icon }) => {
    return (
        <div className="group relative">
            {/* Glow effect on hover */}
            <div className="
        absolute inset-0 
        bg-gradient-to-r from-purple-600/50 to-pink-600/50 
        rounded-full 
        blur-md
        opacity-0
        group-hover:opacity-60
        transition-opacity duration-300
      " />

            <div className="
        relative
        px-4 py-2 
        sm:px-5 sm:py-2.5
        bg-gradient-to-br from-purple-900/60 to-purple-800/40
        border border-purple-500/30 
        rounded-full
        text-xs sm:text-sm
        font-semibold
        text-purple-100
        transition-all duration-300 ease-out
        hover:border-purple-400/60
        hover:scale-110
        hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
        cursor-default
        flex items-center gap-2
        backdrop-blur-sm
      ">
                {icon && (
                    <span className="
            text-sm sm:text-base
            transition-transform duration-300 
            group-hover:scale-125
            group-hover:rotate-12
          ">
                        {icon}
                    </span>
                )}
                <span className="group-hover:text-white transition-colors">{skill}</span>
            </div>
        </div>
    );
};

export default SkillBadge;
