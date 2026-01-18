const ProfileCard = ({ profile }) => {
    const data = profile || {};

    const getInitials = (name) => {
        if (!name) return 'JD';
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl glass rounded-3xl p-6 sm:p-8 md:p-10 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
        >
            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-8">
                {/* Avatar */}
                <div className="relative mb-6 group">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse-glow" />
                    {/* Ring */}
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                            {data.avatar ? (
                                <img src={data.avatar} alt={data.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-3xl sm:text-4xl font-bold text-gradient">{getInitials(data.name)}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {data.name || 'John Doe'}
                </h1>

                {/* Title */}
                <p className="text-lg sm:text-xl text-purple-300 font-medium mb-1">
                    {data.title || 'Developer'}
                </p>

                {/* Tagline */}
                <p className="text-sm text-gray-400 italic">
                    {data.tagline || ''}
                </p>
            </div>

            {/* Bio */}
            <p className="text-center text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                {data.bio || ''}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <span className="text-purple-400">✦</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>

            {/* Skills */}
            <div className="mb-8">
                <h2 className="text-center text-xs uppercase tracking-widest text-purple-400 mb-4 font-semibold">
                    ⚡ Tech Stack
                </h2>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {(data.skills || []).map((skill, i) => (
                        <span
                            key={skill.name}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-900/40 border border-purple-500/30 rounded-full text-xs sm:text-sm text-purple-200 font-medium hover:bg-purple-800/50 hover:border-purple-400/50 hover:scale-105 transition-all cursor-default flex items-center gap-1.5"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <span>{skill.icon}</span>
                            <span>{skill.name}</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
                <span className="text-pink-400">✦</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
            </div>

            {/* Work Experience */}
            <div className="mb-8">
                <h2 className="text-center text-xs uppercase tracking-widest text-purple-400 mb-5 font-semibold">
                    💼 Experience
                </h2>
                <div className="space-y-4">
                    {(data.experiences || []).map((exp, i) => (
                        <div
                            key={exp.id}
                            className="relative pl-6 border-l-2 border-purple-500/40 hover:border-purple-400 transition-colors"
                        >
                            {/* Dot */}
                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-purple-500" />

                            {/* Content */}
                            <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all hover:translate-x-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                    <h3 className="text-sm sm:text-base font-semibold text-white">{exp.title}</h3>
                                    <span className="text-xs px-2 py-0.5 bg-purple-600/30 text-purple-300 rounded-full w-fit">{exp.period}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-purple-300 mb-2">🏢 {exp.company}</p>
                                <p className="text-xs text-gray-400 mb-3">{exp.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {(exp.highlights || []).map((h, j) => (
                                        <span key={j} className="text-[10px] sm:text-xs px-2 py-0.5 bg-purple-950/60 text-purple-300/80 rounded-full border border-purple-700/30">
                                            ✓ {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <span className="text-purple-400">✦</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>

            {/* Contact */}
            <div className="mb-6">
                <h2 className="text-center text-xs uppercase tracking-widest text-purple-400 mb-5 font-semibold">
                    🔗 Connect
                </h2>

                {/* Social Buttons */}
                <div className="flex justify-center gap-3 sm:gap-4 mb-4">
                    {[
                        { href: data.contacts?.github, icon: '📁', label: 'GitHub', color: 'gray' },
                        { href: data.contacts?.linkedin, icon: '💼', label: 'LinkedIn', color: 'blue' },
                        { href: `mailto:${data.contacts?.email}`, icon: '✉️', label: 'Email', color: 'purple' },
                        { href: `tel:${data.contacts?.phone?.replace(/\s/g, '')}`, icon: '📱', label: 'Phone', color: 'green' },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/5 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-400 rounded-xl text-xl sm:text-2xl transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                            title={item.label}
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

                {/* Email & Location */}
                <div className="text-center space-y-2">
                    <a href={`mailto:${data.contacts?.email}`} className="block text-sm text-purple-300 hover:text-purple-200 transition-colors">
                        {data.contacts?.email}
                    </a>
                    <p className="text-xs text-gray-500">📍 {data.contacts?.location}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500">
                    Made with <span className="text-pink-500">❤️</span> • © 2026
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;
