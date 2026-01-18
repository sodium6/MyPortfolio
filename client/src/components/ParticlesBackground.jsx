import { useEffect, useState } from 'react';

const ParticlesBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const arr = [];
        for (let i = 0; i < 25; i++) {
            arr.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 15 + 10,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.4 + 0.1,
            });
        }
        setParticles(arr);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px] animate-float" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[120px] animate-float" style={{ animationDelay: '-2.5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-600/10 blur-[80px]" />

            {/* Particles */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-purple-400"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        animation: `float ${p.duration}s ease-in-out infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.6) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
};

export default ParticlesBackground;
