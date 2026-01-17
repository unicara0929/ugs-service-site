"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal, useStagger } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, className: headerClass } = useReveal<HTMLDivElement>("up");
  const { ref: gridRef, containerClass, itemClass } = useStagger<HTMLDivElement>();

  const displayMembers = members.slice(0, 3);

  return (
    <section id="stories" className="section">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header */}
          <div ref={headerRef} className={`lg:col-span-4 ${headerClass}`}>
            <span className="section-label">{label}</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-desc mb-8">{description}</p>
            <Link href="/stories" className="btn btn--primary">
              <span>VIEW ALL</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: Cards */}
          <div className="lg:col-span-8">
            <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${containerClass}`}>
              {displayMembers.map((member) => (
                <Link
                  key={member.id}
                  href={`/story/${member.id}`}
                  className={`${itemClass} card group`}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* Image */}
                    <div className="card-img relative aspect-[3/4]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2.5 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                            {member.role}
                          </span>
                          <span className="px-2.5 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                            {member.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                        <p className="text-xs text-white/80 line-clamp-2">{member.summary}</p>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="p-4 flex items-center justify-between text-sm font-medium bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <span>READ MORE</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
