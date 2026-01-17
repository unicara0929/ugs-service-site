"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * スクロールアニメーション設定
 */
const CONFIG = {
  threshold: 0.2,
  rootMargin: "0px 0px -80px 0px",
} as const;

/**
 * 基本のスクロール検出フック
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // reduced-motion チェック
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: CONFIG.threshold, rootMargin: CONFIG.rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/**
 * 複数のアニメーションタイプに対応したフック
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  type: "up" | "fade" | "left" | "right" | "scale" = "up"
) {
  const { ref, isVisible } = useScrollAnimation<T>();

  const classMap = {
    up: "reveal-up",
    fade: "reveal-fade",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  };

  return {
    ref,
    className: `${classMap[type]} ${isVisible ? "is-visible" : ""}`,
  };
}

/**
 * Stagger（階段式）アニメーション用フック
 */
export function useStagger<T extends HTMLElement = HTMLElement>() {
  const { ref, isVisible } = useScrollAnimation<T>();

  return {
    ref,
    containerClass: `stagger-container ${isVisible ? "is-visible" : ""}`,
    itemClass: "stagger-item",
  };
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

              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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

/**
 * 後方互換性のためのエイリアス
 */
export const useScrollReveal = useReveal;
export const useStaggerAnimation = useStagger;
