"use client";

import Link from "next/link";
import { useReveal, useStagger } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, className: headerClass } = useReveal<HTMLDivElement>("up");
  const { ref: positionsRef, containerClass, itemClass } = useStagger<HTMLDivElement>();
  const { ref: ctaRef, className: ctaClass } = useReveal<HTMLDivElement>("up");

  return (
    <section id="recruit" className="section">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className={`text-center mb-16 ${headerClass}`}>
            <span className="section-label">{label}</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-desc mx-auto">{description}</p>
          </div>

          {/* Positions */}
          <div ref={positionsRef} className={`space-y-4 mb-12 ${containerClass}`}>
            {positions.map((position, index) => (
              <Link
                key={index}
                href={position.href}
                className={`${itemClass} card group block`}
              >
                <div className="flex items-center justify-between p-6 md:p-8 bg-gray-50 rounded-lg transition-all duration-500 group-hover:bg-black group-hover:text-white">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold mb-1">
                      {position.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                      {position.description}
                    </p>
                  </div>
                  <div className="ml-6 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className={`text-center ${ctaClass}`}>
            <Link href={cta.href} className="btn btn--primary">
              <span>{cta.label}</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
