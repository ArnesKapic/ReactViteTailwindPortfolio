/**
 * StarBackground
 * --------------
 * A purely-decorative, GPU-friendly cosmic background with:
 *  • twinkling stars scattered across the viewport
 *  • diagonal meteors that spawn anywhere on screen
 *  • a tilted, floating laptop SVG (CS “</>” mark) at bottom-right
 *
 * Additionial Touches:
 *  • reduced-motion (lowered animation intensity)
 *  • AnimationFrame resize debounce
 *  • stable callbacks with useCallback
 *  • comprehensive comments for maintainability
 */

import { useEffect, useState, useCallback, memo } from "react";

// Config Knobs

/** More = denser starfield. Stars ~= (vw * vh) / STAR_DENSITY */
const STAR_DENSITY = 7_000;

/** Number of concurrent meteors visible on screen */
const METEOR_COUNT = 4;

/** Animation timing ranges (in seconds) */
const STAR_TWINKLE_MIN = 2;
const STAR_TWINKLE_MAX = 6;
const METEOR_SPEED_MIN = 3;
const METEOR_SPEED_MAX = 6;

// HELPERS

/** A tiny helper for random floats in [min, max) */
const rand = (min, max) => Math.random() * (max - min) + min;

/** A tiny clamp for safety [lo, hi] */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const StarBackgroundComponent = () => {
  // Stars + meteors are precomputed and then animated via CSS
  const [stars, setStars] = useState([]);   // [{id,size,x%,y%,opacity,animationDuration}]
  const [meteors, setMeteors] = useState([]); // [{id,size,x%,y%,delay,animationDuration}]

  // Detect reduced motion for accessibility and tone down animations if requested
  const prefersReducedMotion = typeof window !== "undefined"
    ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
    : false;

  /**
   * Build a starfield sized to the viewport.
   * Positions & sizes are in percentages / pixels so CSS can animate cheaply.
   */
  const generateStars = useCallback(() => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / STAR_DENSITY
    );

    const newStars = Array.from({ length: numberOfStars }, (_, i) => ({
      id: i,
      size: rand(1, 4),                   // px
      x: rand(0, 100),                    // %
      y: rand(0, 100),                    // %
      opacity: rand(0.5, 1),              // 0.5–1 (soft twinkle)
      animationDuration: prefersReducedMotion
        ? STAR_TWINKLE_MAX               // slower/softer twinkle
        : rand(STAR_TWINKLE_MIN, STAR_TWINKLE_MAX),
    }));

    setStars(newStars);
  }, [prefersReducedMotion]);

  /**
   * Seed a handful of meteors that animate via CSS.
   * We randomize their spawn X/Y across the whole viewport.
   */
  const generateMeteors = useCallback(() => {
    const newMeteors = Array.from({ length: METEOR_COUNT }, (_, i) => {
      const duration = prefersReducedMotion
        ? METEOR_SPEED_MAX                // slower when reduced motion is on
        : rand(METEOR_SPEED_MIN, METEOR_SPEED_MAX);

      return {
        id: i,
        size: rand(1, 3),                 // a “thickness” scaler for the streak
        x: rand(0, 100),                  // %
        y: rand(0, 100),                  // %
        animationDuration: duration,      // s
        delay: -rand(0, duration),        // negative delays start mid-cycle for variety
      };
    });

    setMeteors(newMeteors);
  }, [prefersReducedMotion]);

  /**
   * Initial paint + responsive starfield on resize.
   * Resize is debounced with rAF to avoid thrashing layout.
   */
  useEffect(() => {
    generateStars();
    generateMeteors();

    let rafId = 0;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        generateStars(); // reflow star grid to new viewport size
      });
    };

    // passive listener = scrolling performance friendly; stars don't prevent default
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [generateStars, generateMeteors]);

  // Render
  
  return (
    /**
     * Full-viewport, non-interactive canvas for the background.
     * pointer-events-none ensures it never blocks real UI.
     */
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* === Earth (bottom-left) — slow spin, soft atmosphere === */}
      <div className="absolute bottom-[-10vmin] left-[-10vmin] w-[clamp(240px,28vmin,420px)] opacity-90">
        <svg viewBox="0 0 512 512" className="drop-shadow-[0_0_24px_rgba(56,189,248,0.25)] animate-[spin_120s_linear_infinite]">
          <defs>
            <radialGradient id="atmo" cx="50%" cy="50%" r="55%">
              <stop offset="80%" stopColor="rgba(59,130,246,0)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.25)" />
            </radialGradient>
            <radialGradient id="ocean" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4fb6ff" />
              <stop offset="70%" stopColor="#1f6fe5" />
              <stop offset="100%" stopColor="#0b2a67" />
            </radialGradient>
          </defs>
          <circle cx="256" cy="256" r="256" fill="url(#atmo)" opacity="0.45" />
          <circle cx="256" cy="256" r="230" fill="url(#ocean)" />
          <g fill="#34d399" opacity="0.9">
            {/* stylized landmasses */}
            <path d="M140 160c25-20 55-18 70-5 12 9 8 28-10 36-20 9-28 26-18 40 6 10 2 22-8 28-16 10-40-4-42-28-2-24 0-50 8-71z" />
            <path d="M180 260c18-8 36-2 42 10 8 16-2 30-16 36-12 4-16 14-10 24 6 12-2 22-16 22-14 0-28-14-28-28 0-24 10-46 28-64z" />
            <path d="M290 180c16-10 44-6 60 8 12 12 4 26-10 30-14 6-20 18-14 28 6 10-2 22-14 28-18 12-52-2-50-26 2-20 14-48 38-68z" />
            <path d="M330 230c28-12 62 0 76 14 10 10 0 22-12 24-12 4-20 10-22 20-2 12-16 22-32 20-18-2-32-16-30-34 2-14 8-30 20-44z" />
            <path d="M370 340c16-4 36 8 34 20-2 12-22 18-36 14-10-2-14-10-8-16 2-4 6-12 10-18z" />
            <circle cx="400" cy="180" r="8" />
            <circle cx="220" cy="360" r="6" />
          </g>
        </svg>
      </div>

      {/* === Neptune (top-center) — gentle rings hints === */}
      <div className="absolute top-[-12vmin] left-1/2 -translate-x-1/2 w-[clamp(160px,22vmin,300px)] opacity-90">
        <svg viewBox="0 0 512 512" className="drop-shadow-[0_0_24px_rgba(96,165,250,0.35)] animate-[spin_180s_linear_infinite]">
          <defs>
            <radialGradient id="neptuneBody" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <radialGradient id="neptuneAtmo" cx="50%" cy="50%" r="55%">
              <stop offset="80%" stopColor="rgba(96,165,250,0)" />
              <stop offset="100%" stopColor="rgba(96,165,250,0.35)" />
            </radialGradient>
          </defs>
          <circle cx="256" cy="256" r="256" fill="url(#neptuneAtmo)" opacity="0.4" />
          <circle cx="256" cy="256" r="200" fill="url(#neptuneBody)" />
          <g opacity="0.25" fill="white">
            <ellipse cx="256" cy="230" rx="160" ry="14" />
            <ellipse cx="256" cy="270" rx="170" ry="10" />
          </g>
        </svg>
      </div>

      {/* === Saturn (top-right) — front/back rings with light fog distortion === */}
      <div className="absolute top-[5vmin] right-[2vmin] w-[clamp(210px,24vmin,360px)] opacity-95">
        <svg viewBox="0 0 512 512" className="drop-shadow-[0_0_24px_rgba(250,204,21,0.18)]">
          <defs>
            <radialGradient id="saturnBody" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ffe9a8" />
              <stop offset="55%" stopColor="#f2c97b" />
              <stop offset="100%" stopColor="#caa45f" />
            </radialGradient>
            <filter id="saturnFog" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2" />
            </filter>
            <linearGradient id="ringStroke" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="20%" stopColor="rgba(240,225,160,0.28)" />
              <stop offset="50%" stopColor="rgba(250,204,21,0.55)" />
              <stop offset="80%" stopColor="rgba(240,225,160,0.28)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
            </linearGradient>
            <filter id="ringBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.7" />
            </filter>
            <clipPath id="ringFrontClip">
              <rect x="-260" y="0" width="520" height="260" transform="translate(256,256) rotate(-20)" />
            </clipPath>
            <radialGradient id="saturnShade" cx="50%" cy="58%" r="60%">
              <stop offset="60%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
            </radialGradient>
          </defs>

          {/* back rings */}
          <g transform="translate(256,256) rotate(-20)" filter="url(#ringBlur)" opacity="0.9">
            <ellipse cx="0" cy="0" rx="200" ry="58" fill="none" stroke="url(#ringStroke)" strokeWidth="14" />
            <ellipse cx="0" cy="0" rx="174" ry="50" fill="none" stroke="url(#ringStroke)" strokeWidth="8" opacity="0.85" />
            <ellipse cx="0" cy="0" rx="150" ry="42" fill="none" stroke="url(#ringStroke)" strokeWidth="5" opacity="0.75" />
          </g>

          {/* planet body + subtle bands */}
          <g className="origin-center animate-[spin_160s_linear_infinite]">
            <circle cx="256" cy="256" r="132" fill="url(#saturnBody)" />
            <circle cx="256" cy="256" r="132" fill="url(#saturnShade)" />
            <g filter="url(#saturnFog)" opacity="0.22">
              <ellipse cx="256" cy="246" rx="126" ry="16" fill="#fff" />
              <ellipse cx="256" cy="266" rx="128" ry="12" fill="#fff" />
              <ellipse cx="256" cy="286" rx="122" ry="9" fill="#fff" />
            </g>
          </g>

          {/* front rings (clipped over the front half) */}
          <g clipPath="url(#ringFrontClip)">
            <g transform="translate(256,256) rotate(-20)" filter="url(#ringBlur)">
              <ellipse cx="0" cy="0" rx="200" ry="58" fill="none" stroke="url(#ringStroke)" strokeWidth="14" />
              <ellipse cx="0" cy="0" rx="174" ry="50" fill="none" stroke="url(#ringStroke)" strokeWidth="8" opacity="0.85" />
              <ellipse cx="0" cy="0" rx="150" ry="42" fill="none" stroke="url(#ringStroke)" strokeWidth="5" opacity="0.75" />
            </g>
          </g>
        </svg>
      </div>

      {/* === Floating Laptop (bottom-right, larger, tilted, background) === */}
      <div
        className="absolute bottom-[1.25vmin] right-[1.25vmin] -z-10
                   w-[clamp(240px,28vmin,420px)] opacity-90 -rotate-12
                   pointer-events-none drop-shadow-[0_10px_28px_rgba(59,130,246,0.30)] animate-floatY"
      >
        <svg viewBox="0 0 512 384" className="w-full h-auto">
          <defs>
            {/* laptop finishes */}
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            {/* Glow painted onto an inset rounded-rect so it never bleeds or clips */}
            <radialGradient id="screenGlow" gradientUnits="objectBoundingBox" cx="50%" cy="50%" r="60%"
              gradientTransform="matrix(1 0 0 0.72 0 0.14)">
              <stop offset="0%" stopColor="rgba(147,197,253,0.38)" />
              <stop offset="100%" stopColor="rgba(147,197,253,0)" />
            </radialGradient>
            <linearGradient id="kbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
          </defs>

          {/* Lid / screen frame */}
          <g transform="translate(56,20)">
            {/* Outer bezel/frame (400×240) */}
            <rect x="0" y="0" width="400" height="240" rx="14" fill="url(#bodyGrad)" />

            {/* Blue screen (fits inside bezel) */}
            <rect x="16" y="16" width="368" height="208" rx="10" fill="url(#screenGrad)" />

            {/* Inset screen glow (344×184) to avoid touching edges */}
            <rect x="28" y="28" width="344" height="184" rx="8" fill="url(#screenGlow)"
                  className="animate-screenGlow" />

            {/* Centered “</>” icon (center of screen is 200,120 in this group’s coords) */}
            <g transform="translate(200,120)" fill="#e5e7eb" opacity="0.9">
              {/* left angle */}
              <path d="M-40 -6 L-64 8 L-40 22" stroke="#e5e7eb" strokeWidth="8"
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* right angle */}
              <path d="M40 -6 L64 8 L40 22" stroke="#e5e7eb" strokeWidth="8"
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* dot */}
              <rect x="-10" y="0" width="20" height="16" rx="2" />
            </g>
          </g>

          {/* Hinge, width matches bezel for a parallel look */}
          <rect x="56" y="260" width="400" height="10" rx="5" fill="#1f2937" />

          {/* Keyboard deck — same width as bezel to stay visually parallel */}
          <g transform="translate(56,270)">
            <rect x="0" y="0" width="400" height="84" rx="12" fill="url(#kbGrad)" />
            {/* Trackpad (centered horizontally) */}
            <rect x="168" y="44" width="64" height="28" rx="6" fill="#9ca3af" opacity="0.65" />
            {/* Three subtle key rows for texture */}
            <g fill="#d1d5db" opacity="0.85">
              <rect x="20" y="14" width="360" height="8" rx="4" />
              <rect x="20" y="28" width="360" height="8" rx="4" />
              <rect x="20" y="42" width="360" height="8" rx="4" />
            </g>
          </g>

          {/* Soft drop shadow under the chassis */}
          <ellipse cx="256" cy="360" rx="180" ry="18" fill="rgba(0,0,0,0.25)" />
        </svg>
      </div>

      {/* === Stars — many small divs positioned via inline style for GPU-friendly anims === */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${clamp(s.size, 1, 4)}px`,
            height: `${clamp(s.size, 1, 4)}px`,
            left: `${clamp(s.x, 0, 100)}%`,
            top: `${clamp(s.y, 0, 100)}%`,
            opacity: clamp(s.opacity, 0.25, 1),
            animationDuration: `${s.animationDuration}s`,
          }}
        />
      ))}

      {/* === Meteors — thin divs animated diagonally by the CSS keyframes .animate-meteor === */}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor animate-meteor"
          style={{
            width: `${m.size * 50}px`,       // streak length
            height: `${m.size * 2}px`,       // streak thickness
            left: `${clamp(m.x, 0, 100)}%`,
            top: `${clamp(m.y, 0, 100)}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export const StarBackground = memo(StarBackgroundComponent);
export default StarBackground;
