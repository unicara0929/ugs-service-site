/**
 * ヒーローセクション 初回表示アニメーション設定
 *
 * 調整方法:
 * - duration: アニメーションの長さ（ms）
 * - easing: イージング関数
 * - delays: 各要素の表示開始タイミング（ms）
 */

export const HERO_ANIMATION = {
  // アニメーション時間（ms）
  duration: {
    fast: 600,
    normal: 800,
    slow: 1000,
  },

  // イージング（上品で自然な減速）
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // easeOutQuint

  // 各要素の遅延時間（ms）
  delays: {
    background: 0,        // 背景
    shapes: 200,          // 装飾図形
    catchCopy: 400,       // メインキャッチコピー
    subCopy: 600,         // サブコピー
    cta: 800,             // CTAボタン
    scrollIndicator: 1400, // スクロールインジケーター
  },

  // スライド距離（px）
  slideDistance: 60,
} as const;

// CSS変数として出力するためのヘルパー
export const getAnimationStyle = (delay: number) => ({
  animationDelay: `${delay}ms`,
});
