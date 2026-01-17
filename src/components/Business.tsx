"use client";

import Image from "next/image";
import { useScrollReveal, useParallax } from "@/hooks/useScrollAnimation";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type BusinessProps = {
  label: string;
  title: string;
  description: string;
  services: Service[];
};

export default function Business({ label, title, description, services }: BusinessProps) {
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("reveal");

  return (
    <section id="business" className="py-24 md:py-32 lg:py-40 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 md:mb-24 ${headerClass}`}>
          <span className="block text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Services */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => (
            <ServiceItem key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const isEven = index % 2 === 0;
  const { ref: imageRef, className: imageClass } = useScrollReveal<HTMLDivElement>(
    isEven ? "slide-left" : "slide-right"
  );
  const { ref: contentRef, className: contentClass } = useScrollReveal<HTMLDivElement>(
    isEven ? "slide-right" : "slide-left"
  );
  const { ref: parallaxRef, style: parallaxStyle } = useParallax<HTMLDivElement>(0.3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      {/* Image */}
      <div
        ref={imageRef}
        className={`${imageClass} ${!isEven ? "lg:order-2" : ""}`}
      >
        <div className="relative">
          <div className="relative aspect-[3/2] rounded-xl overflow-hidden img-zoom shadow-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Decorative elements */}
          <div
            ref={parallaxRef}
            style={parallaxStyle}
            className={`absolute -z-10 w-full h-full top-6 ${isEven ? "-right-6" : "-left-6"} bg-gray-200 rounded-xl`}
          />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={`${contentClass} ${!isEven ? "lg:order-1" : ""}`}
      >
        {/* Number */}
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-7xl md:text-8xl lg:text-9xl font-black text-gray-100 leading-none">
            {service.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          {service.description}
        </p>

        {/* Decorative line */}
        <div className="mt-8 w-16 h-1 bg-black" />
      </div>
    </div>
  );
}
