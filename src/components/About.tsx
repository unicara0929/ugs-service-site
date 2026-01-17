"use client";

import Image from "next/image";
import { useScrollReveal, useStaggerAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref: imageRef, className: imageClass } = useScrollReveal<HTMLDivElement>("slide-left");
  const { containerRef, isVisible, containerClass } = useStaggerAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image with Parallax effect */}
          <div ref={imageRef} className={imageClass}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden img-zoom shadow-2xl">
                <Image
                  src="/images/about-visual.jpg"
                  alt="About UGS"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 border-2 border-black/10 rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg -z-10" />
            </div>
          </div>

          {/* Right: Content */}
          <div ref={containerRef} className={containerClass}>
            {/* Label */}
            <span className="stagger-item block text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 mb-4">
              {label}
            </span>

            {/* Title */}
            <h2 className="stagger-item text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              {title}
            </h2>

            {/* Divider */}
            <div className="stagger-item section-divider" />

            {/* Description */}
            <p className="stagger-item text-gray-600 leading-relaxed whitespace-pre-line mb-10 md:mb-12">
              {description}
            </p>

            {/* Points */}
            <div className="space-y-6">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="stagger-item group"
                  style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                >
                  <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-md">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-black text-white text-sm font-bold rounded">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-gray-900 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-sm text-gray-600">{point.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
