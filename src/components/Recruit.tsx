"use client";

import Link from "next/link";
import { useScrollReveal, useStaggerAnimation } from "@/hooks/useScrollAnimation";

type Position = {
  title: string;
  description: string;
  href: string;
};

type RecruitProps = {
  label: string;
  title: string;
  description: string;
  positions: Position[];
  cta: {
    label: string;
    href: string;
  };
};

export default function Recruit({ label, title, description, positions, cta }: RecruitProps) {
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("fade-up");
  const { containerRef, isVisible } = useStaggerAnimation<HTMLDivElement>();
  const { ref: ctaRef, className: ctaClass } = useScrollReveal<HTMLDivElement>("fade-up");

  return (
    <section id="recruit" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 ${headerClass}`}>
          <span className="text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Positions */}
        <div
          ref={containerRef}
          className={`stagger-container grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {positions.map((position, index) => (
            <Link
              key={index}
              href={position.href}
              className={`stagger-item stagger-delay-${index} group block p-8 bg-gray-50 rounded-lg hover:bg-black hover:text-white transition-all duration-300 card-lift`}
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                {position.title}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                {position.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium">
                <span>詳細を見る</span>
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className={`text-center ${ctaClass}`}>
          <Link
            href={cta.href}
            className="btn-lift inline-flex items-center gap-2 px-12 py-4 text-sm font-bold tracking-widest bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {cta.label}
            <svg
              className="btn-arrow w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
