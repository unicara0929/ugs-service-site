"use client";

import Image from "next/image";
import { useScrollReveal, useStaggerAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, className: headerClass } = useScrollReveal<HTMLDivElement>("fade-up");

  return (
    <section id="business" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 ${headerClass}`}>
          <span className="text-sm font-bold tracking-[0.3em] text-gray-400 block mb-4">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Services */}
        <div className="space-y-16 md:space-y-24">
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

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <div
        ref={imageRef}
        className={`${imageClass} ${!isEven ? "lg:order-2" : ""}`}
      >
        <div className="relative aspect-[3/2] img-zoom rounded-lg overflow-hidden shadow-xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={`${contentClass} ${!isEven ? "lg:order-1" : ""}`}
      >
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-6xl md:text-7xl font-black text-gray-200">
            {service.id}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
}
