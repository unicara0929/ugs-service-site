"use client";

import { useEffect, useRef, useState } from "react";
import { useStaggerAnimation, useScrollReveal } from "@/hooks/useScrollAnimation";

type NumberItem = {
  value: string;
  unit: string;
  label: string;
};

type NumbersProps = {
  label: string;
  title: string;
  items: NumberItem[];
};

function AnimatedNumber({ value, unit }: { value: string; unit: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentValue = Math.floor(numericValue * easedProgress);
      setDisplayValue(currentValue.toString());

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-2xl md:text-3xl ml-1">{unit}</span>
    </span>
  );
}

export default function Numbers({ label, title, items }: NumbersProps) {
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("fade-up");
  const { containerRef, isVisible } = useStaggerAnimation<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 ${headerClass}`}>
          <span className="text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">
            {title}
          </h2>
        </div>

        {/* Numbers Grid */}
        <div
          ref={containerRef}
          className={`stagger-container grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`stagger-item stagger-delay-${index} text-center p-8 bg-white rounded-lg shadow-sm card-lift`}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2">
                <AnimatedNumber value={item.value} unit={item.unit} />
              </div>
              <p className="text-sm text-gray-500 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
