"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal, useStagger } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, className: headerClass } = useReveal<HTMLDivElement>("up");
  const { ref: gridRef, containerClass, itemClass } = useStagger<HTMLDivElement>();

  return (
    <section className="section section--dark">
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 ${headerClass}`}>
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc mx-auto">{description}</p>
        </div>

        {/* Events Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${containerClass}`}
        >
          {list.map((event) => (
            <Link
              key={event.id}
              href="#"
              className={`${itemClass} card group`}
            >
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {/* Image */}
                <div className="card-img relative aspect-video">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs font-medium text-gray-400 mb-2">
                    {event.date}
                  </p>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-gray-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    <span>詳細を見る</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
      </div>
    </section>
  );
}
