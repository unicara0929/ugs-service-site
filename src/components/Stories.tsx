"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // IntersectionObserver でスクロール検知
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            entry.target.classList.add("is-visible");
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // 表示するメンバー（最大3人）
  const displayMembers = members.slice(0, 3);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white overflow-hidden stagger-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Label - delay: 0 */}
            <span className="stagger-item stagger-delay-0 text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
              {label}
            </span>

            {/* Title - delay: 1 */}
            <h2 className="stagger-item stagger-delay-1 text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              {title}
            </h2>

            {/* Description - delay: 2 */}
            <p className="stagger-item stagger-delay-2 text-gray-600 leading-relaxed mb-8">
              {description}
            </p>

            {/* Button - delay: 3 */}
            <div className="stagger-item stagger-delay-3">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
              >
                VIEW ALL
                <svg
                  className="w-4 h-4"
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
              </Link>
            </div>
          </div>

          {/* Right Column: Member Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayMembers.map((member, index) => (
                <Link
                  key={member.id}
                  href={`/story/${member.id}`}
                  className={`stagger-item stagger-delay-${index + 4} block group`}
                >
                  <div className="card-hover bg-white rounded-lg overflow-hidden shadow-lg">
                    {/* Image */}
                    <div className="relative aspect-[3/4] img-zoom">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded">
                            {member.role}
                          </span>
                          <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded">
                            {member.year}
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>

                        {/* Summary */}
                        <p className="text-xs text-white/80 line-clamp-2">
                          {member.summary}
                        </p>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="p-4 flex items-center justify-between text-sm font-medium bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <span>READ MORE</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
