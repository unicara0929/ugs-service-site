"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right, .stagger");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="slide-in-left">
            <div className="relative aspect-[4/3] img-zoom rounded-lg overflow-hidden">
              <Image
                src="/images/about-visual.jpg"
                alt="About UGS"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="slide-in-right">
            <span className="text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
              {label}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8">
              {title}
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-12">
              {description}
            </p>

            {/* Points */}
            <div className="stagger space-y-6">
              {points.map((point, index) => (
                <div key={index} className="border-l-4 border-black pl-6">
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
