"use client";

import Image from "next/image";
import { useReveal, useStagger } from "@/hooks/useScrollAnimation";

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
  const { ref: imageRef, className: imageClass } = useReveal<HTMLDivElement>("left");
  const { ref: contentRef, containerClass, itemClass } = useStagger<HTMLDivElement>();

  return (
    <section id="about" className="section">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className={imageClass}>
            <div className="relative">
              <div className="card-img aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-visual.jpg"
                  alt="About"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 border border-gray-200 rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg -z-10" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className={containerClass}>
            <span className={`${itemClass} section-label`}>{label}</span>
            <h2 className={`${itemClass} section-title`}>{title}</h2>
            <div className={`${itemClass} w-16 h-0.5 bg-black mb-8`} />
            <p className={`${itemClass} section-desc whitespace-pre-line mb-12`}>
              {description}
            </p>

            {/* Points */}
            <div className="space-y-6">
              {points.map((point, index) => (
                <div
                  key={index}
                  className={`${itemClass} group flex items-start gap-5 p-6 bg-gray-50 rounded-lg transition-all duration-500 hover:bg-gray-100 hover:shadow-lg`}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-black text-white text-sm font-bold rounded">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{point.description}</p>
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
