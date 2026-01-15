"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * スクロールアニメーション設定
 *
 * 調整ポイント:
 * - threshold: トリガー位置（0.4 = 画面の40%に入ったら発火）
 * - staggerDelay: 階段式の間隔（80ms = 0.08秒）
 * - once: 一度だけ発火するか
 */
export const SCROLL_ANIMATION_CONFIG = {
  /** トリガー位置（0〜1、0.4 = 画面の40%位置） */
  threshold: 0.4,
  /** 階段式アニメーションの間隔（ms） */
  staggerDelay: 80,
  /** 一度だけ発火（false = 毎回発火） */
  once: true,
  /** reduced-motion を尊重 */
  respectReducedMotion: true,
} as const;

/**
 * セクション全体のスクロールアニメーションフック
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation();
 * return <section ref={ref} className={isVisible ? 'animate' : ''}>...</section>
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options?: Partial<typeof SCROLL_ANIMATION_CONFIG>
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const config = { ...SCROLL_ANIMATION_CONFIG, ...options };

  useEffect(() => {
    // reduced-motion チェック
    if (config.respectReducedMotion) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (config.once) {
              observer.unobserve(entry.target);
            }
          } else if (!config.once) {
            setIsVisible(false);
          }
        });
      },
      { threshold: config.threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [config.once, config.respectReducedMotion, config.threshold]);

  return { ref, isVisible };
}

/**
 * 複数要素の階段式アニメーションフック
 *
 * @example
 * const { containerRef, getItemProps } = useStaggerAnimation();
 * return (
 *   <div ref={containerRef}>
 *     <div {...getItemProps(0)}>Item 1</div>
 *     <div {...getItemProps(1)}>Item 2</div>
 *   </div>
 * )
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLElement>(
  options?: Partial<typeof SCROLL_ANIMATION_CONFIG>
) {
  const { ref: containerRef, isVisible } = useScrollAnimation<T>(options);
  const config = { ...SCROLL_ANIMATION_CONFIG, ...options };

  const getItemProps = useCallback(
    (index: number) => ({
      className: `scroll-animate-item ${isVisible ? "is-visible" : ""}`,
      style: {
        transitionDelay: isVisible ? `${index * config.staggerDelay}ms` : "0ms",
      } as React.CSSProperties,
    }),
    [isVisible, config.staggerDelay]
  );

  const getItemClass = useCallback(
    (index: number) =>
      `scroll-animate-item ${isVisible ? "is-visible" : ""} stagger-index-${index}`,
    [isVisible]
  );

  return {
    containerRef,
    isVisible,
    getItemProps,
    getItemClass,
  };
}

/**
 * 個別要素のスクロールアニメーションフック
 *
 * @example
 * const { ref, className } = useScrollReveal('fade-up');
 * return <div ref={ref} className={className}>...</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  animationType: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale" = "fade-up",
  options?: Partial<typeof SCROLL_ANIMATION_CONFIG>
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);

  const className = `scroll-${animationType} ${isVisible ? "is-visible" : ""}`;

  return { ref, isVisible, className };
}
