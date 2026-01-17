"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal, useStaggerAnimation } from "@/hooks/useScrollAnimation";

type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

type EventsProps = {
  label: string;
  title: string;
  description: string;
  list: Event[];
};

export default function Events({ label, title, description, list }: EventsProps) {
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("reveal");
  const { containerRef, containerClass } = useStaggerAnimation<HTMLDivElement>({ staggerDelay: 100 });

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 md:mb-20 ${headerClass}`}>
          <span className="block text-xs md:text-sm font-bold tracking-[0.3em] text-gray-500 mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Events Grid */}
        <div
          ref={containerRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${containerClass}`}
        >
          {list.map((event, index) => (
            <Link
              key={event.id}
              href="#"
              className="stagger-item group block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="card-hover bg-gray-900 rounded-xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video img-zoom">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium">
                    {event.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-gray-300 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
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
      </div>
    </section>
  );
}
