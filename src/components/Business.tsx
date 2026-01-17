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
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="business"
      className="section section--gray overflow-hidden"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* 左側: 縦書きタイトル */}
          <div className="lg:w-24 flex-shrink-0">
            <div
              className="lg:sticky lg:top-32 flex lg:flex-col items-center lg:items-start gap-6"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0)" : "translateY(60px)",
                transition: "opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
            >
              {/* ラベル（横書き） */}
              <span
                className="section-label lg:mb-4"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transition: "opacity 0.8s ease",
                  transitionDelay: "0.2s",
                }}
              >
                {label}
              </span>

              {/* 縦書きタイトル */}
              <h2
                className="hidden lg:block text-4xl xl:text-5xl font-black leading-none"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  letterSpacing: "0.1em",
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1)",
                  transitionDelay: "0.3s",
                }}
              >
                {title}
              </h2>

              {/* モバイル用横書きタイトル */}
              <h2 className="lg:hidden section-title">{title}</h2>

              {/* 縦ライン */}
              <div
                className="hidden lg:block w-px bg-black origin-top"
                style={{
                  height: sectionVisible ? "80px" : "0px",
                  transition: "height 1s cubic-bezier(0.19, 1, 0.22, 1)",
                  transitionDelay: "0.5s",
                }}
              />
            </div>
          </div>

          {/* 右側: サービス一覧 */}
          <div className="flex-1">
            {/* 説明文 */}
            <p
              className="section-desc mb-16 max-w-xl"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
                transitionDelay: "0.4s",
              }}
            >
              {description}
            </p>

            {/* サービスカード */}
            <div className="space-y-20 md:space-y-32">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const isEven = index % 2 === 0;
  const delay = 0;

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0) translateY(0)"
          : isEven
          ? "translateX(-80px) translateY(40px)"
          : "translateX(80px) translateY(40px)",
        transition: "opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* 3D立体ボックス - 右斜め下から左斜め上へ */}
      <div
        className="absolute -z-10 hidden md:block"
        style={{
          top: isEven ? "40px" : "60px",
          right: isEven ? "-40px" : "auto",
          left: isEven ? "auto" : "-40px",
          width: "200px",
          height: "200px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateX(0) translateY(0) rotateX(-15deg) rotateY(15deg)"
            : "translateX(60px) translateY(60px) rotateX(-15deg) rotateY(15deg)",
          transition: "opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)",
          transitionDelay: "0.2s",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* ボックス前面 */}
        <div
          className="absolute inset-0 border-2 border-gray-300 bg-white/50"
          style={{
            transform: "translateZ(20px)",
          }}
        />
        {/* ボックス右面 */}
        <div
          className="absolute top-0 right-0 w-5 h-full bg-gray-200 origin-left"
          style={{
            transform: "rotateY(90deg) translateZ(180px)",
          }}
        />
        {/* ボックス底面 */}
        <div
          className="absolute bottom-0 left-0 w-full h-5 bg-gray-300 origin-top"
          style={{
            transform: "rotateX(-90deg) translateZ(180px)",
          }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
        {/* 画像 */}
        <div className={!isEven ? "lg:order-2" : ""}>
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.95)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              transitionDelay: "0.1s",
            }}
          >
            <div className="card-img aspect-[3/2] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* テキスト */}
        <div className={!isEven ? "lg:order-1" : ""}>
          {/* 番号 */}
          <span
            className="block text-8xl md:text-9xl font-black text-gray-100 leading-none mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              transitionDelay: "0.2s",
            }}
          >
            {service.id}
          </span>

          {/* タイトル */}
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              transitionDelay: "0.3s",
            }}
          >
            {service.title}
          </h3>

          {/* 説明 */}
          <p
            className="text-gray-600 leading-relaxed text-base md:text-lg mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              transitionDelay: "0.4s",
            }}
          >
            {service.description}
          </p>

          {/* 装飾ライン */}
          <div
            className="h-1 bg-black origin-left"
            style={{
              width: isVisible ? "64px" : "0px",
              transition: "width 1s cubic-bezier(0.19, 1, 0.22, 1)",
              transitionDelay: "0.5s",
            }}
          />
        </div>
      </div>
    </div>
  );
}
