"use client";

import { useState, useEffect } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // ページ読み込み完了後にアニメーション開始
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const lines = catchCopy.split("\n");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0f1419] ${
          isLoaded ? "hero-bg-animate" : "opacity-0"
        }`}
      />

      {/* Ambient Light / Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Orb - Blue */}
        <div
          className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full hero-orb hero-orb-1 ${
            isLoaded ? "opacity-20" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
            transition: "opacity 1.5s ease",
            transitionDelay: "0.3s",
          }}
        />
        {/* Secondary Orb - Cyan */}
        <div
          className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full hero-orb hero-orb-2 ${
            isLoaded ? "opacity-15" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)",
            filter: "blur(50px)",
            transition: "opacity 1.5s ease",
            transitionDelay: "0.5s",
          }}
        />
        {/* Tertiary Orb - Purple */}
        <div
          className={`absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full hero-orb hero-orb-3 ${
            isLoaded ? "opacity-10" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
            transition: "opacity 1.5s ease",
            transitionDelay: "0.7s",
          }}
        />
      </div>

      {/* Geometric Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 ${isLoaded ? "opacity-[0.03]" : "opacity-0"}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            transition: "opacity 2s ease",
            transitionDelay: "1s",
          }}
        />

        {/* Decorative Lines */}
        <div
          className={`hero-line absolute top-1/3 left-0 w-1/4 h-px bg-white`}
          style={{ opacity: isLoaded ? undefined : 0 }}
        />
        <div
          className={`hero-line absolute bottom-1/3 right-0 w-1/5 h-px bg-white`}
          style={{
            opacity: isLoaded ? undefined : 0,
            animationDelay: "1.4s",
            transformOrigin: "right center",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Catch Copy */}
        <h1 className="mb-8">
          {lines.map((line, index) => (
            <span
              key={index}
              className={`block text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tight leading-[0.9] ${
                isLoaded ? `hero-text-animate hero-text-line-${index + 1}` : "opacity-0"
              }`}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Sub Copy */}
        <p
          className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-10 md:mb-14 tracking-wider ${
            isLoaded ? "hero-sub-animate" : "opacity-0"
          }`}
        >
          {subCopy}
        </p>

        {/* CTA Button */}
        <div className={isLoaded ? "hero-cta-animate" : "opacity-0"}>
          <Link
            href={cta.href}
            className="group relative inline-flex items-center gap-3 px-10 py-4 md:px-14 md:py-5 border-2 border-white text-white text-sm md:text-base font-bold tracking-[0.2em] overflow-hidden transition-colors duration-500"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              {cta.label}
            </span>
            <svg
              className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 ${
          isLoaded ? "hero-scroll-animate" : "opacity-0"
        }`}
      >
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/50 uppercase">
          {scrollText}
        </span>
        <div className="w-px h-12 md:h-16 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 md:top-24 md:left-24 pointer-events-none">
        <div
          className={`w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-white/20 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 1s ease", transitionDelay: "1.8s" }}
        />
      </div>
      <div className="absolute bottom-8 right-8 md:bottom-24 md:right-24 pointer-events-none">
        <div
          className={`w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-white/20 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 1s ease", transitionDelay: "1.9s" }}
        />
      </div>
    </section>
  );
}
