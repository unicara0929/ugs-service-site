"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="business" className="section section--gray overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-24 reveal-up ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="section-label">{label}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc mx-auto">{description}</p>
        </div>

        {/* Services - 階段式横スライド */}
        <div ref={gridRef} className="space-y-16 md:space-y-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const delay = index * 200; // 200ms間隔

            return (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible
                    ? "translateX(0)"
                    : isEven
                    ? "translateX(-120px)"
                    : "translateX(120px)",
                  transition: `opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1)`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {/* Image */}
                <div className={!isEven ? "lg:order-2" : ""}>
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
                      className={`absolute -z-10 w-full h-full top-6 ${
                        isEven ? "-right-6" : "-left-6"
                      } bg-gray-200 rounded-xl`}
                      style={{
                        opacity: gridVisible ? 1 : 0,
                        transform: gridVisible ? "scale(1)" : "scale(0.9)",
                        transition: `opacity 0.8s ease, transform 0.8s ease`,
                        transitionDelay: `${delay + 300}ms`,
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={!isEven ? "lg:order-1" : ""}>
                  {/* Large Number */}
                  <span
                    className="block text-8xl md:text-9xl font-black text-gray-100 leading-none mb-4"
                    style={{
                      opacity: gridVisible ? 1 : 0,
                      transform: gridVisible ? "translateY(0)" : "translateY(30px)",
                      transition: `opacity 0.6s ease, transform 0.6s ease`,
                      transitionDelay: `${delay + 200}ms`,
                    }}
                  >
                    {service.id}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight"
                    style={{
                      opacity: gridVisible ? 1 : 0,
                      transform: gridVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.6s ease, transform 0.6s ease`,
                      transitionDelay: `${delay + 300}ms`,
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-gray-600 leading-relaxed text-base md:text-lg mb-8"
                    style={{
                      opacity: gridVisible ? 1 : 0,
                      transform: gridVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.6s ease, transform 0.6s ease`,
                      transitionDelay: `${delay + 400}ms`,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Decorative Line */}
                  <div
                    className="h-1 bg-black origin-left"
                    style={{
                      width: gridVisible ? "64px" : "0px",
                      transition: `width 0.8s cubic-bezier(0.19, 1, 0.22, 1)`,
                      transitionDelay: `${delay + 500}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
