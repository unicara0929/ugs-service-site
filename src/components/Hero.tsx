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
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // ページ読み込み後にアニメーション開始
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const lines = catchCopy.split("\n");

  return (
    <section className="hero">
      {/* Background Layer */}
      <div className={`hero-bg ${isActive ? "active" : ""}`}>
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f1419 100%)",
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className={`hero-orb hero-orb--1 ${isActive ? "active" : ""}`} />
      <div className={`hero-orb hero-orb--2 ${isActive ? "active" : ""}`} />
      <div className={`hero-orb hero-orb--3 ${isActive ? "active" : ""}`} />

      {/* Grid Pattern */}
      <div className={`hero-grid ${isActive ? "active" : ""}`} />

      {/* Main Content */}
      <div className="hero-content">
        {/* Main Catch Copy */}
        <h1 className="hero-title">
          {lines.map((line, index) => (
            <span key={index} className="hero-title-line">
              <span className={`hero-title-text ${isActive ? "active" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Sub Copy */}
        <p className={`hero-subtitle ${isActive ? "active" : ""}`}>
          {subCopy}
        </p>

        {/* CTA Button */}
        <div className={`hero-cta ${isActive ? "active" : ""}`}>
          <Link href={cta.href} className="hero-cta-btn">
            <span>{cta.label}</span>
            <svg
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
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`hero-scroll ${isActive ? "active" : ""}`}>
        <span className="hero-scroll-text">{scrollText}</span>
        <div className="hero-scroll-line" />
      </div>

      {/* Corner Decorations */}
      <div
        className="absolute top-8 left-8 md:top-16 md:left-16 w-8 h-8 md:w-12 md:h-12 border-l border-t border-white/20"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 1s ease",
          transitionDelay: "2s",
        }}
      />
      <div
        className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-8 h-8 md:w-12 md:h-12 border-r border-b border-white/20"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 1s ease",
          transitionDelay: "2.2s",
        }}
      />
    </section>
  );
}
