"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal, useStagger } from "@/hooks/useScrollAnimation";

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
    <span ref={ref} className="number">
      {displayValue}
      <span className="number-unit">{unit}</span>
    </span>
  );
}

export default function Numbers({ label, title, items }: NumbersProps) {
  const { ref: headerRef, className: headerClass } = useReveal<HTMLDivElement>("up");
  const { ref: gridRef, containerClass, itemClass } = useStagger<HTMLDivElement>();

  return (
    <section className="section section--gray">
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 md:mb-20 ${headerClass}`}>
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        {/* Numbers Grid */}
        <div ref={gridRef} className={`grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 ${containerClass}`}>
          {items.map((item, index) => (
            <div key={index} className={`${itemClass} group`}>
              <div className="card relative p-6 md:p-8 lg:p-10 bg-white rounded-xl text-center">
                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="absolute inset-0 border-r-2 border-t-2 border-black rounded-tr-xl" />
                </div>

                {/* Number */}
                <div className="mb-3">
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
