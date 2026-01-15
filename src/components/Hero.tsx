"use client";

import Link from "next/link";

type HeroProps = {
  catchCopy: string;
  subCopy: string;
  cta: {
    label: string;
    href: string;
  };
  scrollText: string;
};

export default function Hero({ catchCopy, subCopy, cta, scrollText }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
      {/* Background Pattern - delay: 0ms */}
      <div className="absolute inset-0 opacity-10 hero-animate-bg hero-delay-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Geometric Shapes - delay: 200ms */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rotate-45 hero-animate-shape hero-delay-1" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/10 rotate-12 hero-animate-shape hero-delay-1" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-white/5 rotate-45 hero-animate-shape hero-delay-1" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Catch Copy - delay: 400ms */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none mb-8 hero-animate-text hero-delay-2">
          {catchCopy.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Sub Copy - delay: 600ms */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 tracking-wide hero-animate-text hero-delay-3">
          {subCopy}
        </p>

        {/* CTA Button - delay: 800ms */}
        <div className="hero-animate-text hero-delay-4">
          <Link
            href={cta.href}
            className="inline-block px-10 py-4 text-sm font-bold tracking-widest border-2 border-white text-white hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
          >
            {cta.label}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - delay: 1400ms */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-animate-fade hero-delay-5">
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
