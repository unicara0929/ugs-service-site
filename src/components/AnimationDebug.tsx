"use client";

import { useState, useEffect } from "react";
import { HERO_ANIMATION_CONFIG } from "@/constants/animation";

/**
 * アニメーションデバッグパネル
 *
 * 開発時のみ表示。アニメーションの再生・リセットが可能。
 * 本番環境では非表示。
 */
export default function AnimationDebug() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // 開発環境のみ表示
    if (process.env.NODE_ENV !== "development") return;

    const played = sessionStorage.getItem(HERO_ANIMATION_CONFIG.STORAGE_KEY);
    setHasPlayed(!!played);
    setIsVisible(true);
  }, []);

  const handleReplay = () => {
    sessionStorage.removeItem(HERO_ANIMATION_CONFIG.STORAGE_KEY);
    window.location.reload();
  };

  const handleSkipNext = () => {
    sessionStorage.setItem(HERO_ANIMATION_CONFIG.STORAGE_KEY, "true");
    setHasPlayed(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white p-4 rounded-lg shadow-xl text-xs font-mono">
      <div className="mb-2 text-gray-400">🎬 Animation Debug</div>

      <div className="mb-3 space-y-1">
        <div>
          Status:{" "}
          <span className={hasPlayed ? "text-yellow-400" : "text-green-400"}>
            {hasPlayed ? "Played" : "Will play"}
          </span>
        </div>
        <div>
          Config:{" "}
          <span className="text-blue-400">
            {HERO_ANIMATION_CONFIG.FIRST_VISIT_ONLY ? "First visit only" : "Always"}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleReplay}
          className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-white transition-colors"
        >
          ▶ Replay
        </button>
        <button
          onClick={handleSkipNext}
          className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-white transition-colors"
        >
          Skip next
        </button>
      </div>
    </div>
  );
}
