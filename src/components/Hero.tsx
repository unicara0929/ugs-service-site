"use client";

import Link from "next/link";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { HERO_DELAY } from "@/constants/animation";

type HeroProps = {
  catchCopy: string;
  subCopy: string;
  cta: {
    label: string;
    href: string;
  };
  scrollText: string;
};

/**
 * 文字を1文字ずつ分割してアニメーション用のspanで包む
 */
function AnimatedText({
  text,
  baseDelay,
  charDelay = 30,
  className = "",
}: {
  text: string;
  baseDelay: number;
  charDelay?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="hero-char"
          style={{
            animationDelay: `${baseDelay + index * charDelay}ms`,
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ catchCopy, subCopy, cta, scrollText }: HeroProps) {
  const { shouldAnimate, isReady } = useHeroAnimation();

  // SSR中は何も表示しない（チラつき防止）
  if (!isReady) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="opacity-0">Loading...</div>
      </section>
    );
  }

  const animationClass = shouldAnimate ? "" : "hero-no-animate";

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${animationClass}`}
    >
      {/* Background Gradient Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] ${
          shouldAnimate ? "hero-animate-bg" : ""
        }`}
      />

      {/* Background Orbs (Glow Effect) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl ${
            shouldAnimate ? "hero-animate-orb" : "opacity-20"
          }`}
          style={shouldAnimate ? { animationDelay: "0ms" } : undefined}
        />
        <div
          className={`absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl ${
            shouldAnimate ? "hero-animate-orb" : "opacity-20"
          }`}
          style={shouldAnimate ? { animationDelay: "200ms" } : undefined}
        />
        <div
          className={`absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/15 to-violet-500/15 rounded-full blur-3xl ${
            shouldAnimate ? "hero-animate-orb" : "opacity-15"
          }`}
          style={shouldAnimate ? { animationDelay: "400ms" } : undefined}
        />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 border border-white/10 ${
            shouldAnimate ? "hero-animate-shape" : "opacity-10 rotate-45"
          }`}
          style={shouldAnimate ? { animationDelay: "100ms" } : undefined}
        />
        <div
          className={`absolute bottom-40 right-20 w-24 h-24 border border-white/10 ${
            shouldAnimate ? "hero-animate-shape" : "opacity-10 rotate-45"
          }`}
          style={shouldAnimate ? { animationDelay: "200ms" } : undefined}
        />
        <div
          className={`absolute top-1/2 right-1/4 w-16 h-16 border border-white/5 ${
            shouldAnimate ? "hero-animate-shape" : "opacity-5 rotate-45"
          }`}
          style={shouldAnimate ? { animationDelay: "300ms" } : undefined}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-20 h-20 border border-white/8 ${
            shouldAnimate ? "hero-animate-shape" : "opacity-[0.08] rotate-45"
          }`}
          style={shouldAnimate ? { animationDelay: "150ms" } : undefined}
        />
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent ${
            shouldAnimate ? "hero-line" : "opacity-20"
          }`}
          style={shouldAnimate ? { animationDelay: "800ms" } : undefined}
        />
        <div
          className={`absolute bottom-1/3 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent ${
            shouldAnimate ? "hero-line" : "opacity-15"
          }`}
          style={
            shouldAnimate
              ? { animationDelay: "1000ms", transformOrigin: "right center" }
              : undefined
          }
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Catch Copy */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none mb-8">
          {catchCopy.split("\n").map((line, lineIndex) => (
            <span key={lineIndex} className="block" style={{ perspective: "1000px" }}>
              {shouldAnimate ? (
                <AnimatedText
                  text={line}
                  baseDelay={HERO_DELAY.MAIN_COPY + lineIndex * 100}
                  charDelay={35}
                />
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Sub Copy */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-white/80 mb-12 tracking-wide ${
            shouldAnimate ? "hero-animate-sub" : ""
          }`}
        >
          {subCopy}
        </p>

        {/* CTA Button */}
        <div className={shouldAnimate ? "hero-animate-cta" : ""}>
          <Link
            href={cta.href}
            className="group relative inline-block px-10 py-4 text-sm font-bold tracking-widest border-2 border-white text-white overflow-hidden transition-colors duration-300"
          >
            <span className="relative z-10 group-hover:text-[#1a1a2e] transition-colors duration-300">
              {cta.label}
            </span>
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
          shouldAnimate ? "hero-animate-scroll" : "opacity-60"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-white/60 scroll-indicator">
          <span className="text-xs tracking-[0.3em]">{scrollText}</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
