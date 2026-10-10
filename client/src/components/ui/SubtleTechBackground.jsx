import React, { useRef, useEffect } from 'react';

/**
 * SubtleTechBackground
 * Ultra-lightweight, delicate ambient background animation matching the dark monochrome
 * high-tech engineering aesthetic.
 *
 * Visual Components:
 * 1. Faint technical blueprint grid with subtle crosshair marks (+)
 * 2. Drifting micro data-nodes & neural connection lines (ultra-low opacity, 0.04 - 0.25)
 * 3. Soft ambient light aura that breathes slowly
 * 4. Smooth interactive cursor spotlight that gently illuminates the grid
 * 5. Auto-sleep when off-screen via IntersectionObserver (0% CPU/GPU overhead)
 */
const SubtleTechBackground = ({
  variant = 'projects', // 'projects' | 'skills'
  className = ''
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Particle nodes configuration (clean, minimalist, sparse)
    const particleCount = variant === 'skills' ? 28 : 22;
    const particles = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.2 + 0.6,
          baseAlpha: Math.random() * 0.2 + 0.08,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
    };

    // Grid & Crosshair configuration
    const gridSize = 60;
    const crosshairs = [];

    const initCrosshairs = () => {
      crosshairs.length = 0;
      for (let x = gridSize * 2; x < width - gridSize; x += gridSize * 3) {
        for (let y = gridSize * 2; y < height - gridSize; y += gridSize * 3) {
          if ((Math.floor(x / gridSize) + Math.floor(y / gridSize)) % 2 === 0) {
            crosshairs.push({ x, y });
          }
        }
      }
    };

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth || 1200;
      height = container.clientHeight || 800;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
      initCrosshairs();
    };

    resize();

    // Mouse tracking with smooth lerp
    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parentElem = container.parentElement || container;
    parentElem.addEventListener('mousemove', handleMouseMove, { passive: true });
    parentElem.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let isVisible = true;
    let animId = null;
    let time = 0;

    const render = () => {
      if (!isVisible) return;
      time += 0.015;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // --- 1. Subtle Ambient Drifting Glow Aura ---
      const auraX = width * 0.5 + Math.sin(time * 0.3) * (width * 0.2);
      const auraY = height * 0.5 + Math.cos(time * 0.25) * (height * 0.15);
      const auraRadius = Math.max(width, height) * 0.45;

      const auraGradient = ctx.createRadialGradient(
        auraX,
        auraY,
        0,
        auraX,
        auraY,
        auraRadius
      );
      // Tint based on variant: subtle white/silver or hint of cyber violet
      if (variant === 'skills') {
        auraGradient.addColorStop(0, 'rgba(168, 85, 247, 0.035)');
        auraGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        auraGradient.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
        auraGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.015)');
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      // --- 2. Interactive Cursor Spotlight ---
      if (mouse.active) {
        const spotRadius = 280;
        const spotGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotRadius
        );
        spotGradient.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
        spotGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.012)');
        spotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // --- 3. Faint Tech Crosshairs (+) ---
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      for (let i = 0; i < crosshairs.length; i++) {
        const ch = crosshairs[i];
        if (ch.x < width && ch.y < height) {
          ctx.beginPath();
          ctx.moveTo(ch.x - 3, ch.y);
          ctx.lineTo(ch.x + 3, ch.y);
          ctx.moveTo(ch.x, ch.y - 3);
          ctx.lineTo(ch.x, ch.y + 3);
          ctx.stroke();
        }
      }

      // --- 4. Micro Data-Nodes & Delicate Neural Links ---
      const maxDist = 130;

      // Draw delicate connection lines between nearby particles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.055;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Gentle breathing pulse
        const currentAlpha =
          p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.06;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.03, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    // --- IntersectionObserver for optimal battery & performance ---
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            render();
          }
        } else {
          isVisible = false;
          if (animId) cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.02 }
    );

    observer.observe(container);
    render();

    // --- ResizeObserver ---
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      parentElem.removeEventListener('mousemove', handleMouseMove);
      parentElem.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)'
      }}
      aria-hidden="true"
    >
      {/* Super-fine architectural dot/line grid overlay (ultra-subtle 3% opacity) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`subtle-grid-${variant}`}
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#subtle-grid-${variant})`} />
      </svg>

      {/* Dynamic Canvas for floating data-nodes, links, and ambient spotlight */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default SubtleTechBackground;
