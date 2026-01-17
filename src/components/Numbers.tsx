"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal, useStaggerAnimation } from "@/hooks/useScrollAnimation";

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

function AnimatedNumber({ value, unit, delay = 0 }: { value: string; unit: string; delay?: number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();

          const numericValue = parseInt(value);
          if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
          }

          setTimeout(() => {
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentValue = Math.floor(numericValue * eased);
              setDisplayValue(currentValue.toString());

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, delay, hasStarted]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      <span className="text-xl md:text-2xl lg:text-3xl ml-1 font-medium">{unit}</span>
    </span>
  );
}

export default function Numbers({ label, title, items }: NumbersProps) {
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("reveal");
  const { containerRef, containerClass } = useStaggerAnimation<HTMLDivElement>({ staggerDelay: 80 });

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 md:mb-20 ${headerClass}`}>
          <span className="block text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">
            {title}
          </h2>
        </div>

        {/* Numbers Grid */}
        <div ref={containerRef} className={`grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 ${containerClass}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="stagger-item group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative p-6 md:p-8 lg:p-10 bg-white rounded-xl shadow-sm card-hover text-center">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="absolute inset-0 border-r-2 border-t-2 border-black rounded-tr-xl" />
                </div>

                {/* Number */}
                <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tight">
                  <AnimatedNumber value={item.value} unit={item.unit} delay={index * 100} />
                </div>

                {/* Label */}
                <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
