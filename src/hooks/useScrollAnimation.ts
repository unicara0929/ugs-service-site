"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * スクロールアニメーション設定
 * GA Technologies 新卒採用サイト準拠
 */
export const SCROLL_CONFIG = {
  threshold: 0.15, // 要素が15%見えたら発火
  staggerDelay: 100, // 階段式の間隔（ms）
  once: true, // 一度だけ発火
} as const;

/**
 * 基本のスクロール検出フック
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options?: { threshold?: number; once?: boolean }
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = SCROLL_CONFIG.threshold, once = SCROLL_CONFIG.once } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // reduced-motion チェック
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}

/**
 * 階段式アニメーション用フック
 * 複数の子要素を順番にアニメーション
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLElement>(
  options?: { threshold?: number; staggerDelay?: number }
) {
  const { ref: containerRef, isVisible } = useScrollAnimation<T>(options);
  const { staggerDelay = SCROLL_CONFIG.staggerDelay } = options || {};

  const getItemProps = useCallback(
    (index: number) => ({
      className: `stagger-item`,
      style: {
        transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
      } as React.CSSProperties,
    }),
    [isVisible, staggerDelay]
  );

  return {
    containerRef,
    isVisible,
    getItemProps,
    containerClass: `stagger-container ${isVisible ? "is-visible" : ""}`,
  };
}

/**
 * 個別要素のスクロールアニメーションフック
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  type: "reveal" | "slide-left" | "slide-right" | "scale" = "reveal",
  options?: { threshold?: number }
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);

  const classMap = {
    reveal: "scroll-reveal",
    "slide-left": "scroll-slide-left",
    "slide-right": "scroll-slide-right",
    scale: "scroll-scale",
  };

  return {
    ref,
    isVisible,
    className: `${classMap[type]} ${isVisible ? "is-visible" : ""}`,
  };
}

/**
 * パララックス効果フック（軽量版）
 */
export function useParallax<T extends HTMLElement = HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // reduced-motion チェック
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        setOffset((scrollProgress - 0.5) * speed * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset, style: { transform: `translateY(${offset}px)` } };
}

/**
 * カウントアップアニメーションフック
 */
export function useCountUp(
  targetValue: number,
  options?: { duration?: number; delay?: number }
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { duration = 2000, delay = 0 } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element || hasStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();

          setTimeout(() => {
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(targetValue * eased));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(targetValue);
              }
            };

            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetValue, duration, delay, hasStarted]);

  return { ref, count };
}
