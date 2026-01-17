"use client";

import Image from "next/image";
import Link from "next/link";
import { useStaggerAnimation, useScrollReveal } from "@/hooks/useScrollAnimation";

type Member = {
  id: string;
  name: string;
  role: string;
  year: string;
  summary: string;
  image: string;
};

type StoriesProps = {
  label: string;
  title: string;
  description: string;
  members: Member[];
};

export default function Stories({ label, title, description, members }: StoriesProps) {
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("reveal");
  const { containerRef, containerClass } = useStaggerAnimation<HTMLDivElement>({ staggerDelay: 120 });

  const displayMembers = members.slice(0, 3);

  return (
    <section id="stories" className="py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Text Content */}
          <div ref={headerRef} className={`lg:col-span-4 flex flex-col justify-center ${headerClass}`}>
            {/* Label */}
            <span className="block text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 mb-4">
              {label}
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {description}
            </p>

            {/* Button */}
            <div>
              <Link
                href="/stories"
                className="btn-primary group"
              >
                <span>VIEW ALL</span>
                <svg
                  className="arrow w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Member Cards */}
          <div className="lg:col-span-8">
            <div ref={containerRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${containerClass}`}>
              {displayMembers.map((member, index) => (
                <Link
                  key={member.id}
                  href={`/story/${member.id}`}
                  className="stagger-item group block"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="card-hover bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* Image */}
                    <div className="relative aspect-[3/4] img-zoom">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2.5 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                            {member.role}
                          </span>
                          <span className="px-2.5 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                            {member.year}
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>

                        {/* Summary */}
                        <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                          {member.summary}
                        </p>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="p-4 flex items-center justify-between text-sm font-medium bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <span>READ MORE</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
