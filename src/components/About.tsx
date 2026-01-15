"use client";

import Image from "next/image";
import { useStaggerAnimation, useScrollReveal } from "@/hooks/useScrollAnimation";

type Point = {
  title: string;
  description: string;
};

type AboutProps = {
  label: string;
  title: string;
  description: string;
  points: Point[];
};

export default function About({ label, title, description, points }: AboutProps) {
  const { containerRef, isVisible: isContentVisible } = useStaggerAnimation<HTMLDivElement>();
  const { ref: imageRef, className: imageClass } = useScrollReveal<HTMLDivElement>("slide-left");

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div ref={imageRef} className={imageClass}>
            <div className="relative aspect-[4/3] img-zoom rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/about-visual.jpg"
                alt="About UGS"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div
            ref={containerRef}
            className={`stagger-container ${isContentVisible ? "is-visible" : ""}`}
          >
            <span className="stagger-item stagger-delay-0 text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
              {label}
            </span>
            <h2 className="stagger-item stagger-delay-1 text-3xl md:text-4xl lg:text-5xl font-black mb-8">
              {title}
            </h2>
            <div className="stagger-item stagger-delay-2 section-divider mb-8" />
            <p className="stagger-item stagger-delay-3 text-gray-600 leading-relaxed whitespace-pre-line mb-12">
              {description}
            </p>

            {/* Points */}
            <div className="space-y-6">
              {points.map((point, index) => (
                <div
                  key={index}
                  className={`stagger-item stagger-delay-${index + 4} border-l-4 border-black pl-6`}
                >
                  <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
