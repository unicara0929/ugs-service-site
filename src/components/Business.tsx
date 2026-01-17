"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, className: headerClass } = useReveal<HTMLDivElement>("up");

  return (
    <section id="business" className="section section--gray">
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-16 md:mb-24 ${headerClass}`}>
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc mx-auto">{description}</p>
        </div>

        {/* Services */}
        <div className="space-y-24 md:space-y-32">
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
  const { ref: imageRef, className: imageClass } = useReveal<HTMLDivElement>(isEven ? "left" : "right");
  const { ref: contentRef, className: contentClass } = useReveal<HTMLDivElement>(isEven ? "right" : "left");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Image */}
      <div
        ref={imageRef}
        className={`${imageClass} ${!isEven ? "lg:order-2" : ""}`}
      >
        <div className="relative">
          <div className="card-img aspect-[3/2] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Decorative Background */}
          <div
            className={`absolute -z-10 w-full h-full top-6 ${isEven ? "-right-6" : "-left-6"} bg-gray-200 rounded-xl`}
          />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={`${contentClass} ${!isEven ? "lg:order-1" : ""}`}
      >
        {/* Large Number */}
        <span className="block text-8xl md:text-9xl font-black text-gray-100 leading-none mb-4">
          {service.id}
        </span>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
          {service.description}
        </p>

        {/* Decorative Line */}
        <div className="w-16 h-1 bg-black" />
      </div>
    </div>
  );
}
