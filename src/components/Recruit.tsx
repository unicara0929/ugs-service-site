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
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("reveal");
  const { containerRef, containerClass } = useStaggerAnimation<HTMLDivElement>({ staggerDelay: 100 });
  const { ref: ctaRef, className: ctaClass } = useScrollReveal<HTMLDivElement>("reveal");

  return (
    <section id="recruit" className="py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 md:mb-20 ${headerClass}`}>
          <span className="block text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Positions */}
        <div
          ref={containerRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 ${containerClass}`}
        >
          {positions.map((position, index) => (
            <Link
              key={index}
              href={position.href}
              className="stagger-item group block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full p-8 md:p-10 bg-gray-50 rounded-xl transition-all duration-500 group-hover:bg-black group-hover:shadow-2xl card-hover">
                {/* Number */}
                <div className="absolute top-6 right-6 text-5xl md:text-6xl font-black text-gray-100 group-hover:text-white/10 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-500">
                    {position.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-500 mb-6">
                    {position.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium group-hover:text-white transition-colors duration-500">
                    <span>詳細を見る</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className={`text-center ${ctaClass}`}>
          <Link
            href={cta.href}
            className="btn-primary inline-flex group"
          >
            <span>{cta.label}</span>
            <svg
              className="arrow w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
