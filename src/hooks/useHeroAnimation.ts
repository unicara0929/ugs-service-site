"use client";

import { useEffect, useState, useCallback } from "react";
import { HERO_ANIMATION_CONFIG } from "@/constants/animation";

/**
 * ヒーローアニメーションの初回表示制御フック
 *
 * - 初回訪問時のみアニメーションを発火
 * - sessionStorageで訪問状態を管理
 * - reduced-motionの設定を尊重
 */
export function useHeroAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // アニメーション無効設定の場合
    if (!HERO_ANIMATION_CONFIG.ENABLED) {
      setShouldAnimate(false);
      setIsReady(true);
      return;
    }

    // reduced-motion チェック
    if (HERO_ANIMATION_CONFIG.RESPECT_REDUCED_MOTION) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        setShouldAnimate(false);
        setIsReady(true);
        return;
      }
    }

    // 初回のみ発火の設定
    if (HERO_ANIMATION_CONFIG.FIRST_VISIT_ONLY) {
      const hasPlayed = sessionStorage.getItem(
        HERO_ANIMATION_CONFIG.STORAGE_KEY
      );

      if (hasPlayed) {
        setShouldAnimate(false);
        setIsReady(true);
        return;
      }

      // 初回訪問としてマーク
      sessionStorage.setItem(HERO_ANIMATION_CONFIG.STORAGE_KEY, "true");
    }

    setShouldAnimate(true);
    setIsReady(true);
  }, []);

  /**
   * アニメーションを強制的にリプレイ
   */
  const replay = useCallback(() => {
    sessionStorage.removeItem(HERO_ANIMATION_CONFIG.STORAGE_KEY);
    setShouldAnimate(true);
  }, []);

  /**
   * アニメーション履歴をクリア
   */
  const reset = useCallback(() => {
    sessionStorage.removeItem(HERO_ANIMATION_CONFIG.STORAGE_KEY);
  }, []);

  return {
    /** アニメーションを実行すべきか */
    shouldAnimate,
    /** 判定が完了したか（SSR対策） */
    isReady,
    /** アニメーションを強制リプレイ */
    replay,
    /** 履歴をリセット */
    reset,
  };
}
