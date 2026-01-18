import React from 'react';

const WorkExperience = ({ experiences }) => {
    const defaultExperiences = [
        {
            id: 1,
            title: 'Senior Full Stack Developer',
            company: 'Tech Innovation Co.',
            period: '2023 - Present',
            description: 'Leading development of enterprise web applications.',
            highlights: ['Led team of 5 developers', 'Improved performance by 40%']
        },
        {
            id: 2,
            title: 'Full Stack Developer',
            company: 'Digital Solutions Ltd.',
            period: '2021 - 2023',
            description: 'Developed and maintained multiple client projects.',
            highlights: ['Built 10+ production apps', 'Mentored junior developers']
        }
    ];

    const data = experiences || defaultExperiences;

    return (
        <div className="w-full space-y-4">
            <h2 className="
        text-xs 
        sm:text-sm 
        uppercase 
        tracking-[0.2em]
        text-purple-400/80
        mb-4 sm:mb-5
        flex items-center justify-center gap-2
        font-semibold
      ">
                <span className="text-base">💼</span>
                Work Experience
            </h2>

            <div className="relative">
                {/* Timeline line with gradient */}
                <div className="
          absolute 
          left-[11px] sm:left-[13px]
          top-4 
          bottom-4 
          w-[2px]
          bg-gradient-to-b from-purple-400 via-pink-500 to-violet-600
          rounded-full
        " />

                {/* Experience items */}
                <div className="space-y-5 sm:space-y-6">
                    {data.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="
                relative 
                pl-8 sm:pl-10
                animate-slide-in-right opacity-0
              "
                            style={{
                                animationDelay: `${0.2 + index * 0.15}s`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            {/* Timeline dot with pulse */}
                            <div className="
                absolute 
                left-0
                top-2
                w-6 h-6 sm:w-7 sm:h-7
                flex items-center justify-center
              ">
                                <div className="
                  absolute inset-0
                  bg-purple-500/30
                  rounded-full
                  animate-ping
                " style={{ animationDuration: '2s' }} />
                                <div className="
                  relative
                  w-4 h-4 sm:w-5 sm:h-5
                  bg-gradient-to-br from-purple-400 to-pink-500
                  border-2 border-gray-900
                  rounded-full
                  shadow-[0_0_15px_rgba(168,85,247,0.5)]
                  z-10
                " />
                            </div>

                            {/* Content card */}
                            <div className="
                group
                relative
                bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                hover:from-white/[0.12] hover:to-white/[0.05]
                border border-purple-500/20
                hover:border-purple-400/40
                rounded-2xl
                p-4 sm:p-5
                transition-all duration-400
                hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)]
                hover:translate-x-1
                hover:-translate-y-0.5
                backdrop-blur-sm
                overflow-hidden
              ">
                                {/* Shine effect */}
                                <div className="
                  absolute inset-0 
                  bg-gradient-to-r from-transparent via-white/5 to-transparent
                  translate-x-[-200%]
                  group-hover:translate-x-[200%]
                  transition-transform duration-1000
                " />

                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                    <h3 className="
                    text-sm sm:text-base
                    font-bold 
                    text-white
                    group-hover:text-purple-100
                    transition-colors
                  ">
                                        {exp.title}
                                    </h3>
                                    <span className="
                    text-[10px] sm:text-xs
                    px-3 py-1
                    bg-gradient-to-r from-purple-600/40 to-pink-600/40
                    text-purple-200
                    rounded-full
                    font-medium
                    w-fit
                    border border-purple-500/20
                  ">
                                        {exp.period}
                                    </span>
                                </div>

                                {/* Company */}
                                <p className="
                  text-xs sm:text-sm
                  text-purple-300
                  font-semibold
                  mb-2
                  flex items-center gap-1.5
                ">
                                    <span className="text-pink-400">🏢</span>
                                    {exp.company}
                                </p>

                                {/* Description */}
                                <p className="
                  text-[11px] sm:text-xs
                  text-gray-400
                  leading-relaxed
                  mb-3
                ">
                                    {exp.description}
                                </p>

                                {/* Highlights */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.highlights.map((highlight, i) => (
                                        <span
                                            key={i}
                                            className="
                        text-[9px] sm:text-[10px]
                        px-2.5 py-1
                        bg-purple-950/60
                        text-purple-300/90
                        rounded-full
                        border border-purple-700/30
                        flex items-center gap-1
                        font-medium
                      "
                                        >
                                            <span className="text-emerald-400">✓</span>
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkExperience;
