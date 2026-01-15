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
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("fade-up");
  const { containerRef, isVisible } = useStaggerAnimation<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 ${headerClass}`}>
          <span className="text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Events Grid */}
        <div
          ref={containerRef}
          className={`stagger-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {list.map((event, index) => (
            <Link
              key={event.id}
              href="#"
              className={`stagger-item stagger-delay-${index} group block`}
            >
              <div className="card-lift bg-gray-900 rounded-lg overflow-hidden">
                <div className="relative aspect-video img-zoom">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-gray-400 mb-2">
                    {event.date}
                  </p>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-gray-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    <span>詳細を見る</span>
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
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
